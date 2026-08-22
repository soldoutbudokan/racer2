// What the kerbs cost, and whether the collision kerb is the drawn kerb.
//
//   node scripts/kerbprobe.mjs [trackId ...]
//
// Three things, per circuit:
//   1. Budget — physics bodies and kerb collision boxes, and how much of the
//      lap is kerbed. Bodies matter because the world uses NaiveBroadphase.
//   2. Agreement — at samples along the kerbed runs, drops a cannon ray onto
//      the collision slabs and a three ray onto the drawn kerb mesh at the same
//      x/z, and reports the difference. Expect roughly -5..+15 mm, and know why
//      before reading anything into it: each slab is flat-topped at the drawn
//      top's mean height plus the rib crest, while the kerb it stands for falls
//      13 mm outward across that band and ripples 11 mm along it. What would be
//      a real fault is the physics sitting well BELOW the drawn kerb, which is
//      a hole a wheel drops through — that is how the centreline-arc sizing bug
//      showed up (-90 mm at every third metre of kerb, on the outside of every
//      corner).
//   3. Effect — puts a car on the racing line with its outside wheels over the
//      kerb line and reports what the suspension sees.
import { chromium } from 'playwright-core';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

function findChrome() {
  if (process.env.CHROME_EXE && existsSync(process.env.CHROME_EXE)) return process.env.CHROME_EXE;
  const out = execSync(
    'find /opt/pw-browsers ~/.cache/puppeteer/chrome /root/.cache/puppeteer/chrome -maxdepth 3 -name chrome -type f 2>/dev/null | head -1',
    { shell: '/bin/bash' }).toString().trim();
  if (out && existsSync(out)) return out;
  throw new Error('No Chrome binary found — set CHROME_EXE');
}

const ONLY = process.argv.slice(2);
const browser = await chromium.launch({
  executablePath: findChrome(), headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 640, height: 480 } });
const errs = [];
page.on('pageerror', (e) => errs.push(e.message));
page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
await page.goto('http://localhost:5173/', { waitUntil: 'load' });
await page.waitForFunction(() => !!window.__ctx, { timeout: 20000 });
await page.waitForSelector('button.mode[data-mode="time-trial"]');
await page.evaluate(() => document.querySelector('button.mode[data-mode="time-trial"]').click());
await page.waitForTimeout(800);
await page.evaluate(() => { window.__ctx.mode = null; });

const ids = await page.evaluate(() => window.__trackIds);
for (const id of ids) {
  if (ONLY.length && !ONLY.includes(id)) continue;
  const r = await page.evaluate(async (tid) => {
    const THREE = window.__THREE;
    // Track rebuild is menu-time only, but it is already ~1.8 s and this adds
    // ~1500 cannon Boxes to it, so it is worth a number. Median of 3.
    const times = [];
    for (let k = 0; k < 3; k++) {
      const t0 = performance.now();
      await window.__rebuildTrackById(tid);
      times.push(performance.now() - t0);
    }
    times.sort((a, b) => a - b);
    const rebuildMs = Math.round(times[1]);
    const ctx = window.__ctx;
    const t = ctx.track;
    const world = ctx.world;
    // cannon is not on window; every class the probe needs is reachable from
    // the live world and vehicle.
    const Vec3 = world.gravity.constructor;
    const RaycastResult = ctx.cars[0].car.vehicle.wheelInfos[0].raycastResult.constructor;
    // A car parked anywhere near a sample reads as 0.96 m of "kerb". Hide the
    // cars from the ray the way RaycastVehicle hides its own chassis.
    const carBodies = ctx.cars.map((c) => c.car.body);
    const wasResponsive = carBodies.map((b) => b.collisionResponse);
    carBodies.forEach((b) => { b.collisionResponse = false; });
    const n = t.frames.length;
    const active = t.kerbActive || [];
    const kerbFrames = active.filter(Boolean).length;

    // ---- 2. collision vs drawn kerb ----
    const meshes = [];
    t.group.traverse((o) => { if (o.name === 'kerb') meshes.push(o); });
    const rc = THREE ? new THREE.Raycaster() : null;
    const down = THREE ? new THREE.Vector3(0, -1, 0) : null;
    const deltas = [];
    let sampled = 0, missPhys = 0, missMesh = 0;
    const worst = [];
    for (let i = 0; rc && meshes.length && i < n; i++) {
      if (!active[i]) continue;
      // Skip the frames next to a run end: both the mesh and the slabs ramp
      // there, and they ramp on different grids.
      if (!active[(i + 4) % n] || !active[(i - 4 + n) % n]) continue;
      if (i % 7) continue;
      for (const side of [+1, -1]) {
        for (const lat of [t.kerbWidth * 0.42, t.kerbWidth * 0.66]) {
          const off = side * (t.width / 2 + lat);
          const f = t.frames[i];
          const x = f.pos.x + f.left.x * off;
          const z = f.pos.z + f.left.z * off;
          sampled++;
          const res = new RaycastResult();
          world.rayTest(new Vec3(x, 3, z), new Vec3(x, -1, z), res);
          const physY = res.hasHit ? res.hitPointWorld.y : null;
          rc.set(new THREE.Vector3(x, 3, z), down);
          const hits = rc.intersectObjects(meshes, false);
          const meshY = hits.length ? hits[0].point.y : null;
          if (physY === null) { missPhys++; continue; }
          if (meshY === null) { missMesh++; continue; }
          deltas.push(physY - meshY);
          worst.push({ i, side, lat, physY, meshY, d: physY - meshY,
            shapes: res.body ? res.body.shapes.length : 0 });
        }
      }
    }
    carBodies.forEach((b, i) => { b.collisionResponse = wasResponsive[i]; });
    deltas.sort((a, b) => a - b);
    const mean = deltas.reduce((s, v) => s + v, 0) / Math.max(1, deltas.length);

    return {
      id: tid,
      bodies: world.bodies.length,
      kerbShapes: t.kerbShapes, rebuildMs,
      lapM: Math.round(t.length),
      kerbPct: Math.round(100 * kerbFrames / n),
      sampled, missPhys, missMesh,
      dMin: deltas[0], dMax: deltas[deltas.length - 1], dMean: mean,
      dAbsMax: Math.max(...deltas.map(Math.abs)),
      kerbWidth: t.kerbWidth,
      worst: worst.sort((a, b) => a.d - b.d).slice(0, 3).concat(
        worst.sort((a, b) => b.d - a.d).slice(0, 3)).map((w) =>
        `f${w.i}/${w.side > 0 ? 'L' : 'R'}@${w.lat} phys ${w.physY.toFixed(3)} mesh ${w.meshY.toFixed(3)} (${w.shapes} shapes)`),
    };
  }, id);
  console.log(
    `${r.id.padEnd(10)} bodies ${String(r.bodies).padStart(4)}  kerbBoxes ${String(r.kerbShapes).padStart(4)}` +
    `  lap ${String(r.lapM).padStart(4)}m  kerbed ${String(r.kerbPct).padStart(2)}%  rebuild ${String(r.rebuildMs).padStart(4)}ms` +
    `  samples ${r.sampled} (physMiss ${r.missPhys}, meshMiss ${r.missMesh})` +
    `  phys−mesh mm: mean ${(r.dMean * 1000).toFixed(1)} min ${(r.dMin * 1000).toFixed(1)} max ${(r.dMax * 1000).toFixed(1)}`);
  if (r.worst && (r.dMin < -0.015 || r.dMax > 0.015)) console.log('   outliers: ' + r.worst.join(' | '));
}

// ---- 3. what a wheel over the line feels ----
const drive = await page.evaluate(() => {
  const ctx = window.__ctx;
  const t = ctx.track;
  const me = ctx.cars[0].car;
  const world = ctx.world;
  const n = t.frames.length;
  const active = t.kerbActive || [];
  // A frame well inside a kerbed run.
  let idx = -1;
  for (let i = 0; i < n; i++) {
    if (active[i] && active[(i + 10) % n] && active[(i - 10 + n) % n]) { idx = i; break; }
  }
  if (idx < 0) return { ok: false };
  const f = t.frames[idx];
  const yaw = Math.atan2(f.tan.x, f.tan.z);
  const out = [];
  const dt = 1 / 120;
  for (const lat of [0, t.width / 2 - 0.2, t.width / 2 + 0.9]) {
    // Place the car with its centreline `lat` from the road centre, on the
    // side the kerb is on, and let it settle.
    const p = { x: f.pos.x + f.left.x * lat, y: 1.2, z: f.pos.z + f.left.z * lat };
    me.reset(p, yaw);
    for (let i = 0; i < 240; i++) {
      me.applyControls({ throttle: 0, brake: 0, steer: 0, handbrake: false }, dt, ['road', 'road', 'road', 'road']);
      world.step(dt);
    }
    const wis = me.vehicle.wheelInfos;
    const ground = wis.map((w) => (w.raycastResult.body ? w.raycastResult.hitPointWorld.y : null));
    // Body roll = how far the car's own lateral axis has tipped out of
    // horizontal. Taking it off the quaternion with a yaw/pitch/roll formula
    // reads the yaw instead on a Y-up world, which is how an upright car on
    // `alpine` first reported 180° of roll.
    const right = new (world.gravity.constructor)(1, 0, 0);
    me.body.quaternion.vmult(right, right);
    const roll = Math.asin(Math.max(-1, Math.min(1, right.y)));
    out.push({
      lat: +lat.toFixed(2),
      chassisY: +me.body.position.y.toFixed(4),
      rollDeg: +(roll * 180 / Math.PI).toFixed(2),
      ground: ground.map((g) => (g === null ? 'none' : g.toFixed(3))).join(' '),
    });
  }
  return { ok: true, idx, rows: out };
});
if (drive.ok) {
  console.log(`\nsettled on a kerbed corner (frame ${drive.idx}):`);
  for (const r of drive.rows) {
    console.log(`  centreline offset ${String(r.lat).padStart(5)} m   chassis y ${r.chassisY}` +
      `   roll ${String(r.rollDeg).padStart(6)}°   wheel ground y [${r.ground}]`);
  }
}

// ---- 4. running wide over a kerb at speed ----
// The question a 10.5 cm step raises is not whether it is felt but whether it
// is survivable: a stiff spring and a hard edge can turn a kerb into a ramp.
const strike = await page.evaluate(() => {
  const ctx = window.__ctx;
  const t = ctx.track;
  const me = ctx.cars[0].car;
  const world = ctx.world;
  const n = t.frames.length;
  const active = t.kerbActive || [];
  const Vec3 = world.gravity.constructor;
  let idx = -1;
  for (let i = 0; i < n; i++) {
    if (active[i] && active[(i + 14) % n] && active[(i - 6 + n) % n]) { idx = i; break; }
  }
  if (idx < 0) return { idx, rows: [] };
  const f = t.frames[idx];
  const dt = 1 / 120;
  const rows = [];
  for (const kmh of [90, 150, 220]) {
    // Start just inside the white line, aimed 6° out at the kerb.
    const lat = t.width / 2 - 1.2;
    const yaw = Math.atan2(f.tan.x, f.tan.z) - 6 * Math.PI / 180;
    me.reset({ x: f.pos.x + f.left.x * lat, y: 0.72, z: f.pos.z + f.left.z * lat }, yaw);
    me.body.velocity.set(Math.sin(yaw) * kmh / 3.6, 0, Math.cos(yaw) * kmh / 3.6);
    let maxY = -9, maxRoll = 0, airFrames = 0, minContacts = 4, nan = false;
    for (let i = 0; i < 2.5 * 120; i++) {
      me.applyControls({ throttle: 0.4, brake: 0, steer: 0, handbrake: false }, dt,
        ['kerb', 'kerb', 'kerb', 'kerb']);
      world.step(dt);
      const wis = me.vehicle.wheelInfos;
      const contacts = wis.filter((w) => w.raycastResult.body).length;
      if (contacts < minContacts) minContacts = contacts;
      if (contacts < 4) airFrames++;
      const right = new Vec3(1, 0, 0);
      me.body.quaternion.vmult(right, right);
      const roll = Math.abs(Math.asin(Math.max(-1, Math.min(1, right.y))) * 180 / Math.PI);
      if (roll > maxRoll) maxRoll = roll;
      if (me.body.position.y > maxY) maxY = me.body.position.y;
      if (!Number.isFinite(me.body.position.y)) { nan = true; break; }
    }
    rows.push({
      kmh, nan,
      maxChassisY: +maxY.toFixed(3),
      maxRollDeg: +maxRoll.toFixed(2),
      minContacts,
      airFrames,
    });
  }
  return { idx, rows };
});
console.log(`\nrunning wide onto the kerb at 6° (frame ${strike.idx}), 2.5 s each:`);
for (const r of strike.rows) {
  console.log(`  ${String(r.kmh).padStart(3)} km/h   peak chassis y ${r.maxChassisY}` +
    `   peak roll ${String(r.maxRollDeg).padStart(5)}°   wheels down ≥ ${r.minContacts}` +
    `   frames with a wheel up ${r.airFrames}${r.nan ? '   NaN!' : ''}`);
}

// ---- shots: same car, mid-road and over the kerb ----
const PREFIX = process.env.KERB_SHOTS;
if (PREFIX) {
  await page.setViewportSize({ width: 1100, height: 800 });
  // The resize does not resize the composer's render targets until something
  // renders, so throw one frame away first — otherwise the first shot comes
  // out black (ROUTINE.md 2026-08-17, airshadow.mjs).
  await page.evaluate(() => window.__ctx.composer.render());
  for (const [name, lat] of [['midroad', 0], ['onkerb', null]]) {
    await page.evaluate(({ lat }) => {
      const ctx = window.__ctx;
      const t = ctx.track;
      const me = ctx.cars[0].car;
      const n = t.frames.length;
      const active = t.kerbActive || [];
      let idx = -1;
      for (let i = 0; i < n; i++) {
        if (active[i] && active[(i + 10) % n] && active[(i - 10 + n) % n]) { idx = i; break; }
      }
      const f = t.frames[idx];
      const off = lat === null ? t.width / 2 - 0.2 : lat;
      const yaw = Math.atan2(f.tan.x, f.tan.z);
      me.reset({ x: f.pos.x + f.left.x * off, y: 1.2, z: f.pos.z + f.left.z * off }, yaw);
      for (let i = 0; i < 240; i++) {
        me.applyControls({ throttle: 0, brake: 0, steer: 0, handbrake: false }, 1 / 120,
          ['road', 'road', 'road', 'road']);
        ctx.world.step(1 / 120);
      }
      me.update(1 / 60);
      // Low rear-three-quarter, from outside the kerb, so the wheel-to-kerb
      // relationship is the subject.
      const p = me.body.position;
      ctx.camera.position.set(
        p.x - f.tan.x * 7 + f.left.x * 5.5, p.y + 1.15, p.z - f.tan.z * 7 + f.left.z * 5.5);
      ctx.camera.lookAt(p.x + f.left.x * 0.6, p.y - 0.25, p.z + f.left.z * 0.6);
      ctx.composer.render();
    }, { lat });
    await page.screenshot({ path: `${PREFIX}-${name}.png` });
  }
  console.log(`\nshots: ${PREFIX}-midroad.png, ${PREFIX}-onkerb.png`);
}

if (errs.length) console.log('\nCONSOLE ERRORS:\n' + errs.join('\n'));
await browser.close();
