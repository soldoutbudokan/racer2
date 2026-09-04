// Deterministic driving-model test: freeze the render loop and step the
// physics directly so render speed can't skew sim time. Verifies the
// realistic driving model: acceleration through the gears, a drag-limited
// top speed, braking distances, cornering that sheds speed, grass penalty,
// and that the AI can still lap the circuit.
//
// Chrome binary resolution: $CHROME_EXE, then puppeteer's cache, then the
// old mac playwright path.
import { chromium } from 'playwright-core';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

function findChrome() {
  if (process.env.CHROME_EXE && existsSync(process.env.CHROME_EXE)) return process.env.CHROME_EXE;
  try {
    const out = execSync(
      'find ~/.cache/puppeteer/chrome /root/.cache/puppeteer/chrome -maxdepth 3 -name chrome -type f 2>/dev/null | head -1',
      { shell: '/bin/bash' }).toString().trim();
    if (out && existsSync(out)) return out;
  } catch { /* fall through */ }
  const mac = process.env.HOME + '/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
  if (existsSync(mac)) return mac;
  throw new Error('No Chrome binary found — set CHROME_EXE');
}

const b = await chromium.launch({
  executablePath: findChrome(), headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'],
});
const page = await b.newPage({ viewport: { width: 640, height: 480 } });
const errs = [];
page.on('pageerror', (e) => errs.push(e.message));
page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
await page.goto('http://localhost:5173/', { waitUntil: 'load' });
await page.waitForFunction(() => !!window.__ctx, { timeout: 20000 });

let pass = 0, fail = 0;
const ck = (n, ok, d = '') => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${d ? '  — ' + d : ''}`); ok ? pass++ : fail++; };

async function startMode(mode) {
  await page.waitForSelector(`button.mode[data-mode="${mode}"]`, { state: 'attached' });
  await page.evaluate((m) => document.querySelector(`button.mode[data-mode="${m}"]`).click(), mode);
  await page.waitForTimeout(600);
  await page.evaluate(() => { window.__ctx.mode = null; }); // stop rAF from stepping
}

// ---------- Single-car driving model ----------
await startMode('time-trial');
const dm = await page.evaluate(() => {
  const ctx = window.__ctx;
  const world = ctx.world;
  const me = ctx.cars[0].car;
  const ROAD = ['road', 'road', 'road', 'road'];
  const GRASS = ['grass', 'grass', 'grass', 'grass'];
  const dt = 1 / 120;
  const speed = () => Math.hypot(me.body.velocity.x, me.body.velocity.z) * 3.6;
  const yawOf = () => { const q = me.body.quaternion; return Math.atan2(2 * (q.x * q.z + q.w * q.y), 1 - 2 * (q.x * q.x + q.y * q.y)); };
  const drive = (ctrl, steps, surf = ROAD) => {
    for (let i = 0; i < steps; i++) {
      me.applyControls(ctrl, dt, surf);
      world.step(dt);
    }
  };

  // Teleport to open ground so straight-line runs don't meet the armco.
  const tp = (x, z, yaw = 0) => {
    me.reset({ x, y: 1.0, z }, yaw);
    drive({ throttle: 0, brake: 0, steer: 0, handbrake: false }, 90);
  };

  // 1. settle
  tp(1500, -1800);
  const contacts = me.vehicle.wheelInfos.filter((w) => w.isInContact).length;
  const settleY = me.body.position.y;
  // Stance: the painted shell is a rigid child of the sprung chassis, so it
  // lines up with the wheels at exactly one suspension compression. Measure the
  // settled hub height in chassis space and compare it with where the body
  // group was actually dropped (see src/stance.js).
  const wis = me.vehicle.wheelInfos;
  const hubLocalY = wis.reduce(
    (s, w) => s + (w.chassisConnectionPointLocal.y - w.suspensionLength), 0) / wis.length;
  const bodyDrop = me.visual.root.children.find((c) => c.type === 'Group').position.y;

  // 2. acceleration: 8 s flat out
  const p0 = { x: me.body.position.x, z: me.body.position.z };
  drive({ throttle: 1, brake: 0, steer: 0, handbrake: false }, 8 * 120);
  const accel8s = speed();
  const accelDist = Math.hypot(me.body.position.x - p0.x, me.body.position.z - p0.z);
  const gearAt8s = me.telemetry.gearLabel;

  // 3. top speed: keep going 32 more seconds
  drive({ throttle: 1, brake: 0, steer: 0, handbrake: false }, 32 * 120);
  const vmax = speed();

  // 4. braking from speed: full brake to <5 km/h
  tp(-1500, -1800);
  drive({ throttle: 1, brake: 0, steer: 0, handbrake: false }, 9 * 120);
  const vBrake = speed();
  const bp = { x: me.body.position.x, z: me.body.position.z };
  let brakeSteps = 0;
  while (speed() > 5 && brakeSteps < 12 * 120) {
    drive({ throttle: 0, brake: 1, steer: 0, handbrake: false }, 1);
    brakeSteps++;
  }
  const brakeDist = Math.hypot(me.body.position.x - bp.x, me.body.position.z - bp.z);
  const brakeDecel = (vBrake / 3.6) ** 2 / (2 * Math.max(1, brakeDist));

  // 5. cornering sheds speed: ~150 km/h, full lock, no throttle, 3 s
  tp(1500, 0);
  drive({ throttle: 1, brake: 0, steer: 0, handbrake: false }, 8 * 120);
  const cornerEntry = speed();
  const yaw0 = yawOf();
  drive({ throttle: 0, brake: 0, steer: 1, handbrake: false }, 3 * 120);
  const cornerExit = speed();
  let dyaw = Math.abs(yawOf() - yaw0); if (dyaw > Math.PI) dyaw = 2 * Math.PI - dyaw;
  const cornerLoss = cornerEntry - cornerExit;

  // 6. cornering hard cuts acceleration (friction circle): full throttle for
  // 4 s straight vs. 4 s at full lock, from the same entry speed.
  tp(-1500, -300);
  drive({ throttle: 1, brake: 0, steer: 0, handbrake: false }, 6 * 120);
  const sEntry = speed();
  drive({ throttle: 1, brake: 0, steer: 0, handbrake: false }, 4 * 120);
  const straightGain = speed() - sEntry;
  tp(-1500, 600);
  drive({ throttle: 1, brake: 0, steer: 0, handbrake: false }, 6 * 120);
  const pwrEntry = speed();
  drive({ throttle: 1, brake: 0, steer: 1, handbrake: false }, 4 * 120);
  const pwrExit = speed();
  const cornerGain = pwrExit - pwrEntry;

  // 7. grass penalty: coast from ~110 km/h on grass vs road
  const accelTo = (kmh) => {
    let guard = 0;
    while (speed() < kmh && guard++ < 20 * 120) {
      drive({ throttle: 1, brake: 0, steer: 0, handbrake: false }, 1);
    }
  };
  tp(0, -1800);
  accelTo(110);
  const g0 = speed();
  drive({ throttle: 0, brake: 0, steer: 0, handbrake: false }, 4 * 120, GRASS);
  const grassLoss = g0 - speed();
  tp(300, -1800);
  accelTo(110);
  const r0 = speed();
  drive({ throttle: 0, brake: 0, steer: 0, handbrake: false }, 4 * 120, ROAD);
  const roadLoss = r0 - speed();

  // 8. reverse works
  tp(600, -1800);
  drive({ throttle: 0, brake: 1, steer: 0, handbrake: false }, 3 * 120);
  const revSpeed = (() => { const q = me.body.quaternion; const fx = 2 * (q.x * q.z + q.w * q.y); const fz = 1 - 2 * (q.x * q.x + q.y * q.y); const v = me.body.velocity; return v.x * fx + v.z * fz; })();

  // 9. Standing-start wheelspin: flooring it from rest spins the rears, so the
  //    engine flares far past the RPM road speed implies — the flywheel is a
  //    real state, not a readout of how fast the car is going.
  tp(900, -1800);
  let launchMaxRpm = 0, launchMaxSlip = 0;
  for (let i = 0; i < 2.0 * 120; i++) {
    drive({ throttle: 1, brake: 0, steer: 0, handbrake: false }, 1);
    const rpm = me.telemetry.rpm, sl = me.telemetry.slip;
    if (rpm > launchMaxRpm) launchMaxRpm = rpm;
    if (sl > launchMaxSlip) launchMaxSlip = sl;
  }

  // 10. With grip in hand (steady cruise in a tall gear) the clutch is locked,
  //     so the flywheel tracks road speed — slip ≈ 0, no phantom RPM drift.
  tp(-900, -1800);
  drive({ throttle: 1, brake: 0, steer: 0, handbrake: false }, 12 * 120);
  drive({ throttle: 0.3, brake: 0, steer: 0, handbrake: false }, 3 * 120);
  const cruiseSlip = Math.abs(me.telemetry.slip);
  const cruiseRpm = me.telemetry.rpm;

  // 11. Weight transfer: hard braking pitches load onto the front axle. This is
  //     the dynamic load the per-wheel grip model now reads.
  tp(1200, -1800);
  drive({ throttle: 1, brake: 0, steer: 0, handbrake: false }, 7 * 120);
  let frontLoad = 0, rearLoad = 0;
  for (let i = 0; i < 0.5 * 120; i++) {
    drive({ throttle: 0, brake: 1, steer: 0, handbrake: false }, 1);
    const wi = me.vehicle.wheelInfos;
    frontLoad += wi[0].suspensionForce + wi[1].suspensionForce;
    rearLoad += wi[2].suspensionForce + wi[3].suspensionForce;
  }

  return {
    launchMaxRpm: +launchMaxRpm.toFixed(0), launchMaxSlip: +launchMaxSlip.toFixed(2),
    cruiseSlip: +cruiseSlip.toFixed(3), cruiseRpm: +cruiseRpm.toFixed(0),
    frontLoad: +frontLoad.toFixed(0), rearLoad: +rearLoad.toFixed(0),
    contacts, settleY: +settleY.toFixed(2),
    hubLocalY: +hubLocalY.toFixed(4), bodyDrop: +bodyDrop.toFixed(4),
    accel8s: +accel8s.toFixed(1), accelDist: +accelDist.toFixed(0), gearAt8s,
    vmax: +vmax.toFixed(1),
    vBrake: +vBrake.toFixed(1), brakeDist: +brakeDist.toFixed(1), brakeDecel: +brakeDecel.toFixed(2),
    cornerEntry: +cornerEntry.toFixed(1), cornerExit: +cornerExit.toFixed(1),
    cornerLoss: +cornerLoss.toFixed(1), cornerYawDeg: +(dyaw * 180 / Math.PI).toFixed(0),
    straightGain: +straightGain.toFixed(1), cornerGain: +cornerGain.toFixed(1),
    pwrEntry: +pwrEntry.toFixed(1), pwrExit: +pwrExit.toFixed(1),
    grassLoss: +grassLoss.toFixed(1), roadLoss: +roadLoss.toFixed(1),
    revSpeed: +revSpeed.toFixed(2),
  };
});
console.log('driving-model:', JSON.stringify(dm));
ck('car settles on its wheels', dm.contacts === 4 && dm.settleY > 0.3 && dm.settleY < 1.6, `contacts=${dm.contacts} y=${dm.settleY}`);
ck('painted shell sits at the settled ride height, not the droop pose',
  Math.abs(dm.bodyDrop - dm.hubLocalY) < 0.01,
  `body dropped ${dm.bodyDrop} vs settled hub ${dm.hubLocalY} (chassis space)`);
ck('accelerates hard through the gears', dm.accel8s > 140 && dm.accelDist > 180, `${dm.accel8s} km/h in 8s over ${dm.accelDist} m (gear ${dm.gearAt8s})`);
ck('drag-limited top speed 250–310 km/h', dm.vmax > 250 && dm.vmax < 310, `${dm.vmax} km/h`);
ck('braking ≥ 0.9 g from speed', dm.brakeDecel > 8.8, `${dm.vBrake} km/h → 5 km/h in ${dm.brakeDist} m (${dm.brakeDecel} m/s²)`);
ck('hard cornering sheds speed', dm.cornerLoss > 16 && dm.cornerYawDeg > 45, `${dm.cornerEntry} → ${dm.cornerExit} km/h while turning ${dm.cornerYawDeg}°`);
ck('cornering hard cuts acceleration', dm.cornerGain < dm.straightGain * 0.6 && dm.cornerGain < dm.straightGain - 8,
  `straight +${dm.straightGain} vs full-lock +${dm.cornerGain} km/h over 4s (from ${dm.pwrEntry} km/h)`);
ck('grass is much draggier than road', dm.grassLoss - dm.roadLoss > 9 && dm.grassLoss > 18, `grass −${dm.grassLoss} vs road −${dm.roadLoss} km/h over 4s`);
ck('reverse works', dm.revSpeed < -1, `${dm.revSpeed} m/s`);
ck('standing start spins the rears (engine RPM decouples from road speed)',
  dm.launchMaxSlip > 0.05 && dm.launchMaxRpm > 5500,
  `peak ${dm.launchMaxRpm} rpm, driven-wheel slip up to ${dm.launchMaxSlip}`);
ck('flywheel re-couples when gripping — no phantom RPM drift at cruise',
  dm.cruiseSlip < 0.02 && dm.cruiseRpm > 1500,
  `slip ${dm.cruiseSlip}, ${dm.cruiseRpm} rpm`);
ck('weight transfers onto the nose under braking', dm.frontLoad > dm.rearLoad * 1.3,
  `front ${dm.frontLoad} vs rear ${dm.rearLoad} (∑ over 0.5 s)`);

// ---------- The fake contact shadow belongs to the road, not to the car ------
// The blob used to be seated from `mean(hub.y) - WHEEL_RADIUS`, which is exact
// while the tyres are down and meaningless once they are not: the suspension
// raycast reaches only ~5 cm past the settled ride height, and beyond that the
// wheels hang at full droop, so the "road" they imply climbs with the chassis.
// A launched car carried a hard black patch through the air with it, measured
// at world y 1.176 with the car 1.2 m up. See ROUTINE.md, 2026-08-12, and
// scripts/airshadow.mjs. Both gates measure the same lift-and-hold sweep.
const air = await page.evaluate(() => {
  const ctx = window.__ctx;
  const me = ctx.cars[0].car;
  const dt = 1 / 120;
  const sh = me.visual.shadow;
  me.reset({ x: 1500, y: 1.0, z: -1800 }, 0);
  for (let i = 0; i < 120; i++) {
    me.applyControls({ throttle: 0, brake: 0, steer: 0, handbrake: false }, dt, ['road', 'road', 'road', 'road']);
    ctx.world.step(dt); me.update();
  }
  const settledY = me.body.position.y;
  // Ground truth for the road the blob is supposed to lie on, taken from the
  // tyres while they are still down — not from anything the shadow code
  // computed. (Sampled here, because four steps later the car is 2.5 m up.)
  const groundY = +(me.vehicle.wheelInfos
    .reduce((a, w) => a + w.raycastResult.hitPointWorld.y, 0) / 4).toFixed(4);
  const rows = [];
  for (const h of [0, 0.15, 0.3, 0.6, 1.2, 2.5]) {
    // Hold the car at a fixed height and take one step, so the suspension
    // raycasts (and the wheel contacts they set) describe THIS pose.
    me.body.position.set(1500, settledY + h, -1800);
    me.body.velocity.setZero();
    me.body.angularVelocity.setZero();
    ctx.world.step(dt);
    me.update();
    me.visual.root.updateMatrixWorld(true);
    rows.push({
      h,
      shadowY: +sh.matrixWorld.elements[13].toFixed(4),
      // Tolerant of a missing uniform on purpose: a build without the fade
      // should FAIL this gate, not throw out of the evaluate and take the rest
      // of the suite with it (which is how the control run is read).
      fade: sh.material.userData.fade ? +sh.material.userData.fade.value.toFixed(3) : null,
      scale: +sh.scale.x.toFixed(3),
      visible: sh.visible,
    });
  }
  return { settledY: +settledY.toFixed(4), groundY, rows };
});
console.log('air-shadow:', JSON.stringify(air));
// Every height, including 2.5 m of air, has to leave the blob within a
// centimetre of the road — and clear of it, or the depth test buries it.
const onRoad = air.rows.filter((r) => r.shadowY - air.groundY > 0.005
  && r.shadowY - air.groundY < 0.05);
ck('the contact shadow stays on the road when the car is airborne',
  onRoad.length === air.rows.length,
  `road y ${air.groundY}; blob ${air.rows.map((r) => `${r.h}m→${r.shadowY}`).join(' ')}`);
// The other half: a shadow that stayed put but kept its size and its full
// strength would pass the gate above and still be a hard patch under a flying
// car. Requires a real mid-air step (0.3 m: partly faded, partly spread, still
// drawn) so a fade that only ever snapped 0→1 could not pass either.
const mid = air.rows.find((r) => r.h === 0.3);
ck('the contact shadow fades and spreads with airtime',
  air.rows[0].fade === 0 && air.rows[0].scale === 1 && air.rows[0].visible
  && mid.fade > 0.15 && mid.fade < 0.85 && mid.scale > 1.05 && mid.visible
  && air.rows.at(-1).fade === 1 && air.rows.at(-1).visible === false,
  `grounded fade ${air.rows[0].fade}/scale ${air.rows[0].scale}, `
  + `0.3 m ${mid.fade}/${mid.scale}, 2.5 m ${air.rows.at(-1).fade}`
  + ` (drawn: ${air.rows.at(-1).visible})`);

// ---------- The field is placed ON the grid, not dropped onto it ----------
// A car spawned above its settled ride height starts with the springs at full
// droop and falls; the whole field used to drop 36 cm and bounce through the
// first half-second of every race. Spawning at `STATIC_CHASSIS_HEIGHT`
// (src/stance.js) puts the suspension in equilibrium on step 1, so nothing
// should move at all. See ROUTINE.md, 2026-07-29.
await startMode('quick-race');
const spawn = await page.evaluate(() => {
  const ctx = window.__ctx;
  ctx.mode = null;                       // hand-step; no driver input anywhere
  const cars = ctx.cars.map((c) => c.car);
  const spawnY = cars.map((car, i) => {
    const sp = window.__gridSpawn(ctx.track, i);
    car.reset(sp.position, sp.yaw);
    return sp.position.y;
  });
  let worst = 0;
  for (let s = 0; s < 90; s++) {         // 0.75 s, undriven
    ctx.world.step(1 / 120);
    cars.forEach((car, i) => {
      const dy = Math.abs(car.body.position.y - spawnY[i]);
      if (dy > worst) worst = dy;
    });
  }
  const me = cars[0];
  // Read the wheel contacts BEFORE the visual sync: car.update() calls
  // cannon's updateWheelTransform, whose first act is
  // `wheel.isInContact = false` — it is only ever set true again by the
  // suspension raycast on the next world step. Sample it after update() and
  // every wheel reads as airborne no matter what the car is doing.
  const contacts = me.vehicle.wheelInfos.filter((w) => w.isInContact).length;
  me.update();
  const hubs = me.visual.wheels.map((w) => w.position.y);
  return {
    spawnY: +spawnY[0].toFixed(4),
    worstMoveCm: +(worst * 100).toFixed(1),
    contacts,
    tyreY: +(hubs.reduce((a, v) => a + v, 0) / hubs.length - 0.36).toFixed(4),
  };
});
console.log('grid-spawn:', JSON.stringify(spawn));
ck('the field is placed on the grid, not dropped onto it',
  spawn.worstMoveCm < 1.0 && spawn.contacts === 4,
  `moved ${spawn.worstMoveCm} cm from a spawn at y ${spawn.spawnY}; ` +
  `tyre contact ${spawn.tyreY}, ${spawn.contacts}/4 wheels down`);

// ---------- The field is held until the start lights go out ----------
// Physics used to start the instant a mode loaded, so the AI drove away before
// the player had seen the grid. Drive the REAL game loop through the __tick
// pump (not a hand-rolled step loop) so this exercises the actual gate.
await startMode('quick-race');
const lights = await page.evaluate(() => {
  const ctx = window.__ctx;
  const SEQ = window.__startSequenceS;
  ctx.cars.forEach((c, i) => {
    const sp = window.__gridSpawn(ctx.track, i);
    c.car.reset(sp.position, sp.yaw);
  });
  ctx.state.startT = 0;
  ctx.state.started = false;
  ctx.state.lightsLit = -1;
  ctx.mode = 'quick-race';
  // The sequence is ~4 s and __tick renders every frame; ~340 SwiftShader
  // composer passes take minutes. Nothing here is about pixels, so stub the
  // render out — the gate still drives the real tick, the real physics and the
  // real light state, just without the frame cost.
  const realRender = ctx.composer.render;
  ctx.composer.render = () => {};
  const at = () => ctx.cars.map((c) => ({
    x: c.car.body.position.x, z: c.car.body.position.z,
  }));
  const from = (p0) => at().map((p, i) => Math.hypot(p.x - p0[i].x, p.z - p0[i].z));
  const pump = (secs) => {
    const n = Math.round(secs * 60);
    for (let i = 0; i < n; i++) window.__tick(1 / 60);
  };
  // The race clock must read a hard zero while the field is held. It is
  // displayed as `now - lapStart`, and those used to be two SEPARATE
  // performance.now() readings taken at opposite ends of the same frame — the
  // stamp at the top of the tick, the read at the bottom — so the HUD counted
  // this frame's own physics and render as elapsed race time and the
  // hundredths place flickered on the grid. Captured at the source rather than
  // off the formatted text: formatMs floors to whole milliseconds, so a cheap
  // frame can round the bug away and score it as fixed.
  const clockMs = [];
  const realSetLapTime = ctx.hud.setLapTime;
  ctx.hud.setLapTime = (ms) => { clockMs.push(ms); return realSetLapTime(ms); };

  const p0 = at();
  pump(SEQ - 0.2);                       // all five columns lit, not yet green
  const held = {
    lit: ctx.track.startLights.litCount(),
    started: ctx.state.started,
    moveM: +Math.max(...from(p0)).toFixed(3),
    clockSamples: clockMs.length,
    clockMaxMs: clockMs.length ? +Math.max(...clockMs).toFixed(4) : null,
    clockDistinct: new Set(clockMs).size,
  };
  ctx.hud.setLapTime = realSetLapTime;
  pump(0.4 + 1.2);                       // through the green and 1.2 s of racing
  const ai = ctx.cars.map((c, i) => (c.isPlayer ? 0 : from(p0)[i]));
  ctx.composer.render = realRender;
  ctx.mode = null;
  return {
    ...held,
    seq: +SEQ.toFixed(2),
    startedAfter: ctx.state.started,
    litAfter: ctx.track.startLights.litCount(),
    aiMovedM: +Math.max(...ai).toFixed(2),
  };
});
console.log('start-lights:', JSON.stringify(lights));
ck('the field is held on the grid while the lights are on',
  lights.moveM < 0.10 && lights.started === false,
  `moved ${lights.moveM} m in the first ${lights.seq} s, started=${lights.started}`);
ck('all five columns are lit before the green', lights.lit === 5, `${lights.lit}/5 lit`);
ck('the race clock reads zero while the field is held',
  lights.clockSamples > 100 && lights.clockMaxMs === 0 && lights.clockDistinct === 1,
  `${lights.clockSamples} samples over the countdown, ${lights.clockDistinct} distinct`
  + ` value(s), worst ${lights.clockMaxMs} ms`);
ck('lights out releases the field', lights.startedAfter && lights.litAfter === 0
  && lights.aiMovedM > 1.0,
  `started=${lights.startedAfter}, ${lights.litAfter}/5 lit, AI ran ${lights.aiMovedM} m`);

// ---------- The lamps are fittings, not painted dots ----------
// The gates above are all about light STATE; none of them can tell a lamp from
// a decal, and for a while the rig's lamps were literally flat CircleGeometry
// discs on the panel face. Measure the two things that make one a fitting: the
// lens has depth across its own face, and it sits back inside a cowl. Both are
// read off the geometry, in the gantry group's frame, where +z is into the
// panel and −z is the face oncoming cars see. (See ROUTINE.md, 2026-08-05.)
const lamps = await page.evaluate(() => {
  const lens = [];
  let cowls = null, panel = null;
  window.__ctx.scene.traverse((o) => {
    if (o.name === 'startLampLens') lens.push(o);
    if (o.name === 'startLampCowls') cowls = o;
    if (o.name === 'startLightPanel') panel = o;
  });
  if (!lens.length || !cowls || !panel) {
    return { columns: lens.length, cowls: !!cowls, panel: !!panel };
  }
  const bb = (m) => { m.geometry.computeBoundingBox(); return m.geometry.boundingBox; };
  const cb = bb(cowls);
  const lb = lens.map(bb);
  // The panel's box geometry is centred on its own origin; the mesh carries
  // the placement. The lens and cowl geometries are pre-translated into the
  // gantry group's frame with their meshes left at the origin, so compare in
  // that frame.
  const pb = bb(panel);
  const halfW = (pb.max.x - pb.min.x) / 2;
  const halfH = (pb.max.y - pb.min.y) / 2;
  return {
    columns: lens.length,
    cowls: true,
    panel: true,
    // Sag across the lens face: a flat disc measures 0.
    lensDepthM: +Math.min(...lb.map((b) => b.max.z - b.min.z)).toFixed(4),
    // How far the proudest point of any lens sits behind the cowl mouth.
    recessM: +(Math.min(...lb.map((b) => b.min.z)) - cb.min.z).toFixed(4),
    // The whole assembly has to stay on the panel it is bolted to: positive
    // means a cowl hangs off an edge.
    overhangM: +Math.max(
      Math.abs(cb.max.x) - halfW,
      Math.abs(cb.min.x) - halfW,
      Math.abs(cb.max.y - panel.position.y) - halfH,
      Math.abs(cb.min.y - panel.position.y) - halfH,
    ).toFixed(4),
  };
});
console.log('start-lamps:', JSON.stringify(lamps));
ck('the start lamps are lenses in cowls, not discs on a panel',
  lamps.columns === 5 && lamps.cowls === true
  && lamps.lensDepthM > 0.02 && lamps.recessM > 0.05,
  `${lamps.columns} lens meshes, cowls=${lamps.cowls}, lens sag ${lamps.lensDepthM} m,`
  + ` recessed ${lamps.recessM} m behind the cowl mouth`);
ck('the lamp cowls stay on the light panel',
  lamps.overhangM !== undefined && lamps.overhangM < 0,
  `worst edge clearance ${(-lamps.overhangM).toFixed(4)} m`);

// ---------- The launch itself ----------
// Two things the previous section cannot see, because it measures unsigned
// distance from the grid slot:
//   1. DIRECTION. Polling `ai.update` through the 4.2 s hold used to wind up
//      its stuck-recovery (throttle-pinned and stationary is exactly what a
//      held car looks like from inside the driver), so the whole AI field came
//      off the line in REVERSE and ran ~4.3 m backwards before finding first.
//      A distance-from-grid check scores that as a healthy getaway.
//   2. STAGGER. Everyone used to be released on the same frame. Each driver
//      now has their own reaction to the green.
// See ROUTINE.md, 2026-07-31.
await startMode('quick-race');
const launch = await page.evaluate(() => {
  const ctx = window.__ctx;
  const SEQ = window.__startSequenceS;
  ctx.cars.forEach((c, i) => {
    const sp = window.__gridSpawn(ctx.track, i);
    c.car.reset(sp.position, sp.yaw);
  });
  ctx.state.startT = 0;
  ctx.state.started = false;
  ctx.state.lightsLit = -1;
  ctx.mode = 'quick-race';
  // Headless has no hands on the keys, so the player would sit parked on pole
  // and the field would pile into it. Give P1 a flat-out launch.
  for (const c of ctx.cars) {
    if (c.isPlayer) {
      c.input.update = () => ({ throttle: 1, brake: 0, steer: 0, handbrake: false });
    }
  }
  const realRender = ctx.composer.render;
  ctx.composer.render = () => {};

  // Displacement along each car's OWN heading, so "went backwards" is
  // unambiguous wherever on the map the grid happens to sit.
  const p0 = ctx.cars.map((c) => ({ x: c.car.body.position.x, z: c.car.body.position.z }));
  const fwdOf = (c, i) => {
    const q = c.car.body.quaternion;
    const fx = 2 * (q.x * q.z + q.w * q.y);
    const fz = 1 - 2 * (q.x * q.x + q.y * q.y);
    const len = Math.hypot(fx, fz) || 1;
    const p = c.car.body.position;
    return ((p.x - p0[i].x) * fx + (p.z - p0[i].z) * fz) / len;
  };

  const HZ = 60;
  const worstBack = ctx.cars.map(() => 0);   // most negative forward travel
  const releaseS = ctx.cars.map(() => null); // when each car first got going
  let sawReverse = false;
  // The green, plus 2 s of running — long enough for the slowest reaction to
  // have gone and for a reverse launch to be unmistakable, short enough that
  // nobody has reached a corner and started braking for it.
  const n = Math.round((SEQ + 2.0) * HZ);
  for (let i = 0; i < n; i++) {
    window.__tick(1 / HZ);
    ctx.cars.forEach((c, k) => {
      const f = fwdOf(c, k);
      if (f < worstBack[k]) worstBack[k] = f;
      if (releaseS[k] == null && f > 0.05) releaseS[k] = ctx.state.startT - SEQ;
      if (c.car.telemetry.gearLabel === 'R') sawReverse = true;
    });
  }
  ctx.composer.render = realRender;
  ctx.mode = null;
  const rel = releaseS.map((v) => (v == null ? null : +v.toFixed(3)));
  const got = rel.filter((v) => v != null);
  // Spread is measured across the AI only. The player is released on the green
  // itself, so including them would score a field of identically-programmed AI
  // as "staggered" purely because P1 is in it.
  const aiRel = rel.filter((v, i) => v != null && !ctx.cars[i].isPlayer);
  return {
    who: ctx.cars.map((c, i) => (c.isPlayer ? 'P1' : `AI${i}`)),
    reactions: ctx.cars.map((c) => +(c.reactionS ?? 0).toFixed(3)),
    releaseS: rel,
    allLaunched: got.length === ctx.cars.length,
    spreadS: aiRel.length > 1
      ? +(Math.max(...aiRel) - Math.min(...aiRel)).toFixed(3) : 0,
    worstBackM: +Math.min(...worstBack).toFixed(3),
    sawReverse,
    fwdM: ctx.cars.map((c, i) => +fwdOf(c, i).toFixed(2)),
  };
});
console.log('launch:', JSON.stringify(launch));
ck('nobody launches in reverse',
  !launch.sawReverse && launch.worstBackM > -0.05,
  `worst backward travel ${launch.worstBackM} m, reverse gear seen: ${launch.sawReverse}`);
ck('the whole field gets away from the grid',
  launch.allLaunched && Math.min(...launch.fwdM) > 5,
  `released at ${JSON.stringify(launch.releaseS)}, 2 s travel ${JSON.stringify(launch.fwdM)}`);
ck('the field does not launch on a single frame',
  launch.spreadS > 0.1,
  `reactions ${JSON.stringify(launch.reactions)} → getaway spread ${launch.spreadS} s`);

// ---------- AI sanity on the real circuit ----------
await startMode('quick-race');
const qr = await page.evaluate(() => {
  const ctx = window.__ctx;
  const world = ctx.world;
  const dt = 1 / 120;
  const frames = ctx.track.frames;
  const nearest = (p) => {
    let bi = 0, bd = Infinity;
    for (let i = 0; i < frames.length; i++) {
      const dx = frames[i].pos.x - p.x, dz = frames[i].pos.z - p.z;
      const d = dx * dx + dz * dz;
      if (d < bd) { bd = d; bi = i; }
    }
    return { i: bi, d: Math.sqrt(bd) };
  };
  const ROAD = ['road', 'road', 'road', 'road'];
  const ai = ctx.cars.filter((c) => !c.isPlayer);
  // Park the (undriven) player car far away so the AI aren't ramming a
  // stationary obstacle on the grid.
  const player = ctx.cars.find((c) => c.isPlayer);
  if (player) player.car.reset({ x: 1500, y: 1, z: -1500 }, 0);
  // Accumulate progress (handles full laps; nearest-frame alone is mod-lap).
  const lastIdx = ai.map((c) => nearest(c.car.body.position).i);
  const total = ai.map(() => 0);
  let maxDev = 0;
  const steps = 45 * 120;
  const aiCars = ai.map((c) => c.car);
  for (let s = 0; s < steps; s++) {
    for (const c of ai) {
      const cmd = c.ai.update(c.car, aiCars, dt);
      c.car.applyControls(cmd, dt, ROAD);
    }
    world.step(dt);
    if (s % 30 === 0) {
      for (let k = 0; k < ai.length; k++) {
        const { i, d } = nearest(ai[k].car.body.position);
        if (d > maxDev) maxDev = d;
        let adv = i - lastIdx[k];
        if (adv < -frames.length / 2) adv += frames.length;
        if (adv > frames.length / 2) adv -= frames.length;
        total[k] += adv;
        lastIdx[k] = i;
      }
    }
  }
  // Progress in METRES of lap, not a fraction: the F1-derived circuits are
  // 2.7 km, so a percentage gate tuned on the 1.3 km layouts would only be
  // testing lap length.
  const lapM = ctx.track.length;
  const progressed = total.map((t) => Math.round(t / frames.length * lapM));
  return { nCars: ctx.cars.length, progressed, lapM: Math.round(lapM), maxDev: +maxDev.toFixed(1) };
});
console.log('quick-race:', JSON.stringify(qr));
ck('quick-race spawns 4 cars', qr.nCars === 4, `${qr.nCars}`);
ck('AI covers ≥ 800 m of circuit in 45 s', qr.progressed.every((p) => p > 800), `progress=${qr.progressed.join(',')} m of a ${qr.lapM} m lap`);
ck('AI stays inside the circuit', qr.maxDev < 16, `max centreline deviation ${qr.maxDev} m`);

// ---------- AI stuck recovery ----------
// Standing still is not the same thing as being stuck, and the difference is
// only visible in what the driver COMMANDS — every gate above measures where a
// car ended up, which is exactly why a driver selecting reverse for the wrong
// reason survived so long. Three standstills that look identical from outside
// the car and must not be treated identically. See scripts/stuckprobe.mjs for
// the same scenarios with a full frame-by-frame trace.
await startMode('quick-race');
const stuck = await page.evaluate(() => {
  const ctx = window.__ctx;
  const world = ctx.world;
  const frames = ctx.track.frames;
  const wall = ctx.track.armcoOffset;
  const ROAD = ['road', 'road', 'road', 'road'];
  const IDLE = { throttle: 0, brake: 0, steer: 0, handbrake: true };
  const dt = 1 / 120, HZ = 120;
  const HOME = 200;
  const hf = frames[HOME];

  const ai = ctx.cars.filter((c) => !c.isPlayer);
  const me = ai[0];
  const spare = ai[1];
  const others = ai.map((c) => c.car);
  const latOf = () => {
    const p = me.car.body.position;
    return (p.x - hf.pos.x) * hf.left.x + (p.z - hf.pos.z) * hf.left.z;
  };
  // Distance to the nearest centreline frame. `latOf` is measured against ONE
  // fixed frame, which is what makes the runoff traces readable — but it stops
  // meaning anything once the car has driven a hundred metres past that frame,
  // so the "did it get back on the road" check needs this instead. A nearest-
  // frame flip can only inflate this, never shrink it, so a `< 6 m` assertion
  // cannot be passed spuriously by one.
  const offOf = () => {
    const p = me.car.body.position;
    let bd = Infinity;
    for (let i = 0; i < frames.length; i++) {
      const dx = frames[i].pos.x - p.x, dz = frames[i].pos.z - p.z;
      const d = dx * dx + dz * dz;
      if (d < bd) bd = d;
    }
    return Math.sqrt(bd);
  };

  // Fresh driver each scenario — the recovery timers are per-driver state and
  // would otherwise leak from one scenario into the next.
  const reset = () => {
    ctx.cars.forEach((c, k) => {
      if (c !== me) c.car.reset({ x: 2000 + k * 40, y: 1, z: -2000 }, 0);
    });
    me.ai = window.__createAIDriver(ctx.track, { skill: 0.85 });
  };
  // Place `lat` m left of the centreline, pointing `aim` of the way around from
  // the track direction toward the left-hand wall. Built from the frame's own
  // basis, so there is no sign convention to get wrong.
  const place = (lat, aim) => {
    const dx = hf.tan.x * (1 - Math.abs(aim)) + hf.left.x * aim;
    const dz = hf.tan.z * (1 - Math.abs(aim)) + hf.left.z * aim;
    me.car.reset({
      x: hf.pos.x + hf.left.x * lat, y: hf.pos.y + 0.70, z: hf.pos.z + hf.left.z * lat,
    }, Math.atan2(dx, dz));
    for (let i = 0; i < 30; i++) { me.car.applyControls(IDLE, dt, ROAD); world.step(dt); }
    me.car.update();
  };
  // `pin` freezes the car where it stands — a bogged start, a queue, a hold.
  const run = (secs, pin) => {
    const p = { ...me.car.body.position }, q = { ...me.car.body.quaternion };
    const log = {
      firstReverseS: null, reverseS: 0, endLat: 0, minReverseT: 9,
      armLat: 0, minLat: Infinity, endFwd: 0,
      // Rejoin metrics: how far back out toward the barrier the car tracks once
      // the recovery lets go, and how many separate recoveries it needed. A car
      // that arcs back into the armco it just escaped arms a second time.
      recoveries: 0, maxLatAfter: -Infinity, released: false,
    };
    let wasReversing = false;
    for (let s = 0; s < Math.round(secs * HZ); s++) {
      const cmd = me.ai.update(me.car, others, dt);
      const reversing = cmd.brake > 0.9 && cmd.throttle === 0;
      if (reversing && !wasReversing) log.recoveries++;
      if (!reversing && wasReversing) log.released = true;
      wasReversing = reversing;
      if (reversing) {
        log.reverseS += dt;
        if (log.firstReverseS === null) {
          log.firstReverseS = +(s / HZ).toFixed(3);
          log.armLat = +latOf().toFixed(2);   // how close to the wall it was pinned
        }
        // Smallest reverseT still on the clock while actually reversing: a
        // recovery that runs to term bottoms out near 0, one that is cut short
        // releases with time to spare.
        if (me.ai.recovery.reverseT < log.minReverseT) log.minReverseT = me.ai.recovery.reverseT;
      }
      me.car.applyControls(cmd, dt, ROAD);
      world.step(dt);
      me.car.update();
      if (pin) {
        me.car.body.position.set(p.x, p.y, p.z);
        me.car.body.quaternion.set(q.x, q.y, q.z, q.w);
        me.car.body.velocity.set(0, 0, 0);
        me.car.body.angularVelocity.set(0, 0, 0);
      }
      if (log.firstReverseS !== null) log.minLat = Math.min(log.minLat, latOf());
      if (log.released) log.maxLatAfter = Math.max(log.maxLatAfter, latOf());
    }
    log.endLat = +latOf().toFixed(2);
    log.endOff = +offOf().toFixed(2);
    log.minLat = Number.isFinite(log.minLat) ? +log.minLat.toFixed(2) : null;
    log.maxLatAfter = Number.isFinite(log.maxLatAfter) ? +log.maxLatAfter.toFixed(2) : null;
    log.endFwd = +me.car.telemetry.speedKmh.toFixed(1);
    log.endGear = me.car.telemetry.gearLabel;
    log.reverseS = +log.reverseS.toFixed(2);
    log.minReverseT = +log.minReverseT.toFixed(2);
    return log;
  };

  const out = {};
  // 1. Pinned on the racing line with clear road ahead — a bogged getaway, a
  //    queue, a car being held. Backing out of this is wrong.
  reset(); place(0, 0);
  out.held = run(5.0, true);
  // 2. Driven into the armco out in the runoff, nose-on. Backing out is right.
  reset(); place(wall - 3.2, 0.90);
  out.wedged = run(4.0, false);
  // 3. As 2, but with a car parked in the space it would reverse into.
  reset(); place(wall - 3.2, 0.90);
  {
    const q = me.car.body.quaternion, p = me.car.body.position;
    const fx = 2 * (q.x * q.z + q.w * q.y);
    const fz = 1 - 2 * (q.x * q.x + q.y * q.y);
    const L = Math.hypot(fx, fz) || 1;
    spare.car.reset(
      { x: p.x - (fx / L) * 5.2, y: p.y, z: p.z - (fz / L) * 5.2 }, Math.atan2(fx, fz));
  }
  out.behind = run(3.0, false);
  // 4. As 2, but watched long enough to see the car REJOIN. Backing out of the
  //    armco is only half a recovery: a driver then points the car at the road.
  //    Pure pursuit's κ = 2·sin(α)/Ld folds back past 90°, so a car released
  //    crossed up used to ask for two thirds of a turn, arc straight back into
  //    the barrier it had just escaped, and start the whole cycle again.
  reset(); place(wall - 3.2, 0.90);
  out.rejoin = run(8.0, false);
  out.wall = wall;
  return out;
});
console.log('stuck:', JSON.stringify(stuck));
ck('a car held at a standstill on the racing line does not select reverse',
  stuck.held.firstReverseS === null || stuck.held.firstReverseS > 3.5,
  `first reverse command at ${stuck.held.firstReverseS ?? 'never'}`);
ck('a car with no way out still recovers eventually',
  stuck.held.firstReverseS !== null && stuck.held.firstReverseS < 4.5,
  `blind fallback fired at ${stuck.held.firstReverseS ?? 'never'} s`);
ck('a car wedged into the armco backs itself out and drives away',
  stuck.wedged.firstReverseS !== null && stuck.wedged.firstReverseS < 2.5
    && stuck.wedged.minLat < stuck.wedged.armLat - 1.5
    && stuck.wedged.endGear !== 'R',
  `reverse at ${stuck.wedged.firstReverseS} s, pinned at ${stuck.wedged.armLat} m from the`
  + ` centreline → backed to ${stuck.wedged.minLat} m, driving off in gear`
  + ` ${stuck.wedged.endGear} at ${stuck.wedged.endFwd} km/h`);
ck('the recovery stops as soon as the car is free',
  stuck.wedged.minReverseT > 0.15 && stuck.wedged.reverseS < 1.4,
  `released with ${stuck.wedged.minReverseT} s still on the clock (${stuck.wedged.reverseS} s reversed)`);
ck('the AI does not reverse into a car right behind it',
  stuck.behind.firstReverseS === null,
  `first reverse command at ${stuck.behind.firstReverseS ?? 'never'}`);
// A recovery that has to run twice is a car bouncing off the same barrier: it
// backs out, arcs straight back in, wedges, and backs out again. One is a
// recovery; two is a loop.
ck('a recovered car does not drive back into the barrier',
  stuck.rejoin.recoveries === 1,
  `${stuck.rejoin.recoveries} recovery/ies in 8 s; tracked back out to`
  + ` ${stuck.rejoin.maxLatAfter} m after release, wedged at`
  + ` ${stuck.rejoin.armLat} m, armco at ${stuck.wall} m`);
ck('a recovered car rejoins the racing line',
  stuck.rejoin.endOff < 6 && stuck.rejoin.endFwd > 40 && stuck.rejoin.endGear !== 'R',
  `ended ${stuck.rejoin.endOff} m from the centreline at ${stuck.rejoin.endFwd} km/h`
  + ` in gear ${stuck.rejoin.endGear}`);

// ---------- Barrier containment ----------
// Launch the car at the armco from the centreline at ~275 km/h, at many spots
// around the lap, alternating sides and angles of attack. This is RAW wall
// containment — the game-loop out-of-bounds failsafe is not running here.
await startMode('time-trial');
const bar = await page.evaluate(() => {
  const ctx = window.__ctx;
  const world = ctx.world;
  const me = ctx.cars[0].car;
  const frames = ctx.track.frames;
  const dt = 1 / 120;
  const ROAD = ['road', 'road', 'road', 'road'];
  const latAt = (p) => {
    let bi = 0, bd = Infinity;
    for (let i = 0; i < frames.length; i++) {
      const dx = frames[i].pos.x - p.x, dz = frames[i].pos.z - p.z;
      const d = dx * dx + dz * dz;
      if (d < bd) { bd = d; bi = i; }
    }
    const f = frames[bi];
    return Math.abs((p.x - f.pos.x) * f.left.x + (p.z - f.pos.z) * f.left.z);
  };
  let maxLat = 0, minY = 1;
  const N = frames.length;
  const RUNS = 18;
  for (let s = 0; s < RUNS; s++) {
    const f = frames[Math.floor(s * N / RUNS)];
    const sign = s % 2 ? 1 : -1;
    const skew = ((s % 3) - 1) * 0.6;          // −0.6 / 0 / +0.6 rad off-normal
    const aim = Math.atan2(f.left.x, f.left.z) + (sign < 0 ? Math.PI : 0) + skew;
    me.reset({ x: f.pos.x, y: 0.7, z: f.pos.z }, aim);
    me.body.velocity.set(Math.sin(aim) * 76, 0, Math.cos(aim) * 76);
    for (let t = 0; t < 2.5 * 120; t++) {
      me.applyControls({ throttle: 1, brake: 0, steer: 0, handbrake: false }, dt, ROAD);
      world.step(dt);
      const lat = latAt(me.body.position);
      if (lat > maxLat) maxLat = lat;
      if (me.body.position.y < minY) minY = me.body.position.y;
    }
  }
  return { armco: ctx.track.armcoOffset, maxLat: +maxLat.toFixed(1), minY: +minY.toFixed(1) };
});
console.log('barriers:', JSON.stringify(bar));
ck('walls contain 275 km/h impacts at every angle', bar.maxLat < bar.armco + 2,
  `max lateral ${bar.maxLat} m vs armco at ${bar.armco} m`);
ck('car never falls through the world', bar.minY > -1, `minY=${bar.minY}`);

// ---------- Single-lap time trial + perfect-line aid ----------
// Headless Chrome throttles rAF, so drive the real game loop deterministically
// through the __tick pump instead of waiting on wall-clock time.
await startMode('time-trial');
const ttSetup = await page.evaluate(() => ({
  totalLaps: window.__ctx.state.totalLaps,
  lapTotalHud: document.getElementById('lap-total').textContent,
  lineVisible: window.__ctx.racingLine.mesh.visible,
}));
const tt = await page.evaluate(() => {
  const ctx = window.__ctx;
  ctx.mode = 'time-trial';
  const frames = ctx.track.frames;
  const car = ctx.cars[0].car;
  const pump = (steps) => { for (let i = 0; i < steps; i++) window.__tick(1 / 60); };
  // Touch the mid-lap sector checkpoint…
  const fm = frames[Math.floor(frames.length / 2)];
  car.reset({ x: fm.pos.x, y: 0.7, z: fm.pos.z }, Math.atan2(fm.tan.x, fm.tan.z));
  pump(20);
  // …then roll across the start/finish line.
  const f = frames[frames.length - 10];
  car.reset({ x: f.pos.x, y: 0.7, z: f.pos.z }, Math.atan2(f.tan.x, f.tan.z));
  car.body.velocity.set(f.tan.x * 22, 0, f.tan.z * 22);
  pump(3 * 60);
  const out = {
    finished: ctx.cars[0].state.finished,
    overlayShown: !document.getElementById('finish').classList.contains('hidden'),
    paceShown: !document.getElementById('pace-pill').classList.contains('hidden'),
  };
  ctx.mode = null;
  return out;
});
console.log('time-trial:', JSON.stringify({ ...ttSetup, ...tt }));
ck('time trial is a single lap', ttSetup.totalLaps === 1 && ttSetup.lapTotalHud === '1',
  `totalLaps=${ttSetup.totalLaps} hud=${ttSetup.lapTotalHud}`);
ck('crossing the line once finishes the time trial', tt.finished && tt.overlayShown,
  `finished=${tt.finished} overlay=${tt.overlayShown}`);
ck('racing line + pace aid active in time trial', ttSetup.lineVisible && tt.paceShown,
  `line=${ttSetup.lineVisible} pace=${tt.paceShown}`);

// ---------- Racing-line speed profile sanity ----------
const rl = await page.evaluate(() => {
  const p = window.__ctx.racingLine.profile;
  let mn = Infinity, mx = 0;
  for (let i = 0; i < p.length; i++) { if (p[i] < mn) mn = p[i]; if (p[i] > mx) mx = p[i]; }
  return { minKmh: +(mn * 3.6).toFixed(0), maxKmh: +(mx * 3.6).toFixed(0) };
});
console.log('racing-line:', JSON.stringify(rl));
ck('ideal-speed profile is sane', rl.minKmh > 40 && rl.minKmh < 140 && rl.maxKmh > 180 && rl.maxKmh <= 260,
  `corners down to ${rl.minKmh} km/h, straights up to ${rl.maxKmh} km/h`);

// ---------- Kerbs are solid ----------
// The world's ground is one flat Box, so every kerb, camber and hillside on
// every circuit used to be decoration: measured over 6 s of four-car racing,
// no wheel of any car ever left the ground, because there was nothing to leave
// it over. These three ask the opposite question of the same geometry — is the
// physics kerb the drawn kerb, does a wheel over the line actually climb it,
// and does any of it reach out onto the racing surface.
const kerb = await page.evaluate(() => {
  const THREE = window.__THREE;
  const ctx = window.__ctx;
  const t = ctx.track;
  const world = ctx.world;
  const me = ctx.cars[0].car;
  const Vec3 = world.gravity.constructor;
  const RaycastResult = me.vehicle.wheelInfos[0].raycastResult.constructor;
  const active = t.kerbActive || [];
  const n = t.frames.length;

  // Every lookup below is optional-by-construction. Against a build with no
  // kerb data, no named kerb meshes and no `__THREE` hook, this block has to
  // REPORT failures rather than throw out of the evaluate and take the rest of
  // the suite with it.
  const meshes = [];
  t.group.traverse((o) => { if (o.name === 'kerb') meshes.push(o); });
  const rc = THREE ? new THREE.Raycaster() : null;
  const down = THREE ? new THREE.Vector3(0, -1, 0) : null;
  const dropRay = (x, z) => {
    const res = new RaycastResult();
    world.rayTest(new Vec3(x, 3, z), new Vec3(x, -1, z), res);
    return res.hasHit ? res.hitPointWorld.y : null;
  };
  // Earlier scenarios leave cars parked on the circuit, and a ray dropped on
  // one reads its roof (0.96 m) as the road. Hide them the way RaycastVehicle
  // hides its own chassis — `Ray.checkCollisionResponse` is on by default.
  const carBodies = ctx.cars.map((c) => c.car.body);
  const wasResponsive = carBodies.map((b) => b.collisionResponse);
  carBodies.forEach((b) => { b.collisionResponse = false; });

  // ---- 1. the collision kerb is the drawn kerb ----
  // Sized from the CENTRELINE arc, a slab is too short for the kerb it stands
  // in for (which is 8 m further out, so longer round the outside of a
  // corner), and the joints open ~0.3 m holes a wheel drops straight through.
  // The signature of that is `below`: physics well under the drawn kerb.
  let sampled = 0, below = 0, worstBelow = 0, worstAbove = 0, meshMiss = 0;
  for (let i = 0; rc && meshes.length && i < n; i++) {
    if (!active[i]) continue;
    // Both builders ramp the kerb out at a run's ends, on different grids.
    if (!active[(i + 4) % n] || !active[(i - 4 + n) % n]) continue;
    const f = t.frames[i];
    for (const side of [+1, -1]) {
      for (const frac of [0.42, 0.66]) {
        const off = side * (t.width / 2 + t.kerbWidth * frac);
        const x = f.pos.x + f.left.x * off, z = f.pos.z + f.left.z * off;
        rc.set(new THREE.Vector3(x, 3, z), down);
        const hit = rc.intersectObjects(meshes, false);
        if (!hit.length) { meshMiss++; continue; }
        const d = dropRay(x, z) - hit[0].point.y;
        sampled++;
        if (d < -0.01) below++;
        worstBelow = Math.min(worstBelow, d);
        worstAbove = Math.max(worstAbove, d);
      }
    }
  }

  // ---- 3. nothing reaches out onto the road ----
  // The slabs start flush with the asphalt edge and are widened slightly to
  // cover the chord's dip on tight corners, so this is the check that the
  // widening never grows into a step in the middle of the racing surface.
  let roadSamples = 0, roadMaxY = 0;
  for (let i = 0; i < n; i += 2) {
    const f = t.frames[i];
    for (let u = -0.85; u <= 0.851; u += 0.17) {
      const off = u * (t.width / 2 - 0.15) / 0.85;
      const y = dropRay(f.pos.x + f.left.x * off, f.pos.z + f.left.z * off);
      roadSamples++;
      if (y > roadMaxY) roadMaxY = y;
    }
  }

  // ---- 2. what a wheel over the line feels ----
  carBodies.forEach((b, i) => { b.collisionResponse = wasResponsive[i]; });
  const dt = 1 / 120;
  let idx = -1;
  for (let i = 0; i < n; i++) {
    if (active[i] && active[(i + 10) % n] && active[(i - 10 + n) % n]) { idx = i; break; }
  }
  // Fall back to frame 0 rather than indexing off the end: against a build
  // with no kerb data at all these gates must REPORT a failure, not throw out
  // of the evaluate and take the rest of the suite with them.
  const f = t.frames[idx < 0 ? 0 : idx];
  const yaw = Math.atan2(f.tan.x, f.tan.z);
  const place = (lat) => {
    me.reset({ x: f.pos.x + f.left.x * lat, y: 1.2, z: f.pos.z + f.left.z * lat }, yaw);
    for (let i = 0; i < 240; i++) {
      me.applyControls({ throttle: 0, brake: 0, steer: 0, handbrake: false }, dt,
        ['road', 'road', 'road', 'road']);
      world.step(dt);
    }
    const ground = me.vehicle.wheelInfos.map(
      (w) => (w.raycastResult.body ? w.raycastResult.hitPointWorld.y : -1));
    // Roll off the car's own lateral axis: a yaw/pitch/roll formula reads the
    // yaw instead in a Y-up world.
    const right = new Vec3(1, 0, 0);
    me.body.quaternion.vmult(right, right);
    return {
      chassisY: +me.body.position.y.toFixed(4),
      rollDeg: +(Math.asin(Math.max(-1, Math.min(1, right.y))) * 180 / Math.PI).toFixed(2),
      lo: +Math.min(...ground).toFixed(3),
      hi: +Math.max(...ground).toFixed(3),
    };
  };
  const flat = place(0);                        // control: mid-road, same corner
  const onKerb = place(t.width / 2 - 0.2);      // outside wheels over the line

  return {
    sampled, below, meshMiss,
    worstBelow: +(worstBelow * 1000).toFixed(1),
    worstAbove: +(worstAbove * 1000).toFixed(1),
    roadSamples, roadMaxY: +(roadMaxY * 1000).toFixed(2),
    kerbShapes: t.kerbShapes, bodies: world.bodies.length,
    idx, flat, onKerb,
  };
});
console.log('kerbs:', JSON.stringify(kerb));
// A hole would show as `below`; the +15 mm ceiling is the flat-topped slab
// standing in for a drawn top that falls 13 mm outward and ripples 11 mm.
ck('the collision kerb is the kerb that is drawn',
  kerb.sampled > 150 && kerb.meshMiss === 0 && kerb.below === 0
  && kerb.worstBelow > -10 && kerb.worstAbove < 20,
  `${kerb.sampled} samples, ${kerb.below} below the mesh, `
  + `phys−mesh ${kerb.worstBelow}..${kerb.worstAbove} mm, ${kerb.kerbShapes} boxes`);
ck('a wheel put over the kerb line climbs it',
  kerb.flat.lo === 0 && kerb.flat.hi === 0 && Math.abs(kerb.flat.rollDeg) < 0.2
  && kerb.onKerb.lo === 0 && kerb.onKerb.hi > 0.06
  && Math.abs(kerb.onKerb.rollDeg) > 1.5
  && kerb.onKerb.chassisY - kerb.flat.chassisY > 0.02,
  `mid-road: ground ${kerb.flat.lo}/${kerb.flat.hi}, roll ${kerb.flat.rollDeg}° — `
  + `on the kerb: ground ${kerb.onKerb.lo}/${kerb.onKerb.hi}, roll ${kerb.onKerb.rollDeg}°, `
  + `chassis +${((kerb.onKerb.chassisY - kerb.flat.chassisY) * 1000).toFixed(0)} mm`);
ck('the racing surface stays flat', kerb.roadMaxY < 1 && kerb.roadSamples > 3000,
  `${kerb.roadSamples} samples across the road, highest ${kerb.roadMaxY} mm`);

// ---------- Sound ----------
// The sound is synthesised from the driving state (src/audio.js): the engine
// note is the crank's harmonic stack at the real flywheel RPM, the throttle
// opens a filter, tyres squeal from the physics' own slide, the surface under
// the car is heard, and the AI are placed around the listener. These gates
// read the computed parameters through `audio.debug` (no audio device is
// needed — a suspended context still schedules), and one renders the graph on
// an OfflineAudioContext and measures the note itself, so a disconnected node
// or a wave that never reaches the destination fails here rather than in the
// owner's headphones. All degrade to a reported failure rather than a throw if
// the sound system is absent (scripts/audioprobe.mjs has the full trace).
await startMode('time-trial');
const snd = await page.evaluate(() => {
  const ctx = window.__ctx;
  const world = ctx.world;
  const entry = ctx.cars[0];
  const me = entry.car;
  const a = ctx.audio;
  const out = { available: !!(a && a.available) };
  if (!out.available) return out;
  const dt = 1 / 120;
  const ROAD = ['road', 'road', 'road', 'road'];
  const N = { throttle: 0, brake: 0, steer: 0, handbrake: false };
  const speed = () => Math.hypot(me.body.velocity.x, me.body.velocity.z);
  let frame = 0;
  const run = (ctrl, secs, surf = ROAD) => {
    for (let i = 0; i < Math.round(secs * 120); i++) {
      me.applyControls(ctrl, dt, surf);
      world.step(dt);
      if (++frame % 2 === 0) {
        me.update();
        entry.chase.update(2 * dt, me.body, speed() * 3.6);
        a.update(2 * dt, { camera: ctx.camera });
      }
    }
  };
  const snap = () => {
    const d = a.debug.cars[0];
    return { rpm: d.rpm, fFire: d.fFire, cutoff: d.cutoff, gain: d.gain, gear: d.gear, load: d.load,
      squeal: d.squeal, fSq: d.fSq, rumble: d.rumble, rumbleHz: d.rumbleHz, grass: d.grass, gravel: d.gravel,
      wind: d.wind, roar: d.roar, pops: d.pops, bangs: d.bangs, clunks: d.clunks, speed: speed() };
  };
  const cyl = a.engines[me.archetype || 'gt'].cylinders;
  out.cylinders = cyl;
  me.reset({ x: 1500, y: 1.0, z: -1800 }, 0);
  run(N, 1.5);
  out.idle = snap();
  run({ ...N, throttle: 1 }, 6);
  out.wot = snap();
  run(N, 0.5);
  out.lift = snap();
  run({ ...N, throttle: 0.3 }, 2);
  out.cruise = snap();
  run({ ...N, steer: 1, handbrake: true }, 1.0);
  out.slide = snap();
  me.reset({ x: 1500, y: 1.0, z: 0 }, 0);
  run({ ...N, throttle: 1 }, 4);
  run({ ...N, throttle: 0.5 }, 1, ['kerb', 'kerb', 'road', 'road']);
  out.kerb = snap();
  run({ ...N, throttle: 0.5 }, 1, ['grass', 'grass', 'grass', 'grass']);
  out.grass = snap();
  me.reset({ x: -1500, y: 1.0, z: -1800 }, 0);
  run({ ...N, throttle: 1 }, 20);
  out.fast = snap();
  // Mute, and the remembered choice.
  const was = a.muted;
  a.setMuted(true);
  out.mutedOn = { flag: a.muted, dbg: a.debug.muted, stored: localStorage.getItem('racer2.sound') };
  a.setMuted(false);
  out.mutedOff = { flag: a.muted, stored: localStorage.getItem('racer2.sound') };
  a.setMuted(was);
  out.state = a.debug.state();
  return out;
});
console.log('sound:', JSON.stringify(snd));
const sndOk = snd.available;
const near = (x, y, tol) => Math.abs(x - y) <= tol;
ck('sound: the engine note is the flywheel\'s firing order',
  sndOk && near(snd.idle.fFire, snd.idle.rpm / 60 * snd.cylinders / 2, 0.5)
  && near(snd.wot.fFire, snd.wot.rpm / 60 * snd.cylinders / 2, snd.wot.fFire * 0.01)
  && snd.wot.rpm > 2 * snd.idle.rpm && snd.idle.rpm >= 1000,
  sndOk ? `idle ${snd.idle.rpm.toFixed(0)} rpm → ${snd.idle.fFire.toFixed(1)} Hz, WOT ${snd.wot.rpm.toFixed(0)} rpm → ${snd.wot.fFire.toFixed(1)} Hz (V${snd.cylinders})` : 'no audio');
ck('sound: the throttle opens the engine and a lift closes it, with the pops and the shift bang',
  sndOk && snd.wot.cutoff > 2 * snd.lift.cutoff && snd.wot.gain > 1.8 * snd.lift.gain
  && snd.lift.pops > 0 && snd.wot.bangs >= 1 && snd.wot.clunks >= 1 && snd.wot.gear >= 2,
  sndOk ? `cutoff ${snd.wot.cutoff.toFixed(0)} → ${snd.lift.cutoff.toFixed(0)} Hz, gain ${snd.wot.gain.toFixed(2)} → ${snd.lift.gain.toFixed(2)}, ${snd.lift.pops} pops on the lift, ${snd.wot.bangs} bangs / ${snd.wot.clunks} clunks through ${snd.wot.gear} gears` : 'no audio');
ck('sound: tyres squeal in a slide and not on a straight',
  sndOk && snd.slide.squeal > 0.6 && snd.cruise.squeal < 0.1 && snd.idle.squeal === 0 && snd.slide.fSq > 800,
  sndOk ? `handbrake slide ${snd.slide.squeal.toFixed(2)} at ${snd.slide.fSq.toFixed(0)} Hz, cruise ${snd.cruise.squeal.toFixed(3)}, idle ${snd.idle.squeal}` : 'no audio');
// Wind is quadratic in speed (below its 78 m/s clamp), so the ratio of the
// two readings must be the ratio of the speeds squared.
const windLaw = sndOk && snd.cruise.wind > 0
  ? (snd.fast.wind / snd.cruise.wind) / Math.pow(snd.fast.speed / snd.cruise.speed, 2) : 0;
ck('sound: the surface is heard — kerb ribs at their passing rate, grass, wind with speed²',
  sndOk && snd.kerb.rumble > 0.1 && near(snd.kerb.rumbleHz, snd.kerb.speed / 1.0, 0.5)
  && snd.grass.grass > 0.2 && snd.grass.roar === 0 && snd.kerb.roar > 0
  && snd.fast.wind > 0.4 && snd.fast.speed > snd.cruise.speed * 1.3 && near(windLaw, 1, 0.15)
  && snd.idle.wind === 0,
  sndOk ? `kerb rumble ${snd.kerb.rumble.toFixed(2)} at ${snd.kerb.rumbleHz.toFixed(1)} Hz for ${snd.kerb.speed.toFixed(1)} m/s, grass ${snd.grass.grass.toFixed(2)} (roar ${snd.grass.roar}), wind ${snd.fast.wind.toFixed(2)} at ${(snd.fast.speed * 3.6).toFixed(0)} km/h vs ${snd.cruise.wind.toFixed(3)} at ${(snd.cruise.speed * 3.6).toFixed(0)} (v² law ×${windLaw.toFixed(2)})` : 'no audio');
ck('sound: mute is remembered',
  sndOk && snd.mutedOn.flag === true && snd.mutedOn.dbg === true && snd.mutedOn.stored === 'off'
  && snd.mutedOff.flag === false && snd.mutedOff.stored === null,
  sndOk ? `on → ${snd.mutedOn.stored}, off → ${snd.mutedOff.stored}, context ${snd.state}` : 'no audio');

// The AI voices: placed at their cars, attenuated by distance, Doppler-shifted.
await startMode('quick-race');
const sndAI = await page.evaluate(() => {
  const ctx = window.__ctx;
  const a = ctx.audio;
  if (!a || !a.available) return null;
  const allCars = ctx.cars.map((c) => c.car);
  const dt = 1 / 120;
  const ROAD = ['road', 'road', 'road', 'road'];
  const player = ctx.cars.find((c) => c.isPlayer);
  // The player is parked far away (an undriven car on the grid blocks the AI
  // behind it — the quick-race gate above does the same); the listener stands
  // at the start line looking down the track while the AI drive off.
  player.car.reset({ x: 1500, y: 1, z: -1500 }, 0);
  const THREE = window.__THREE;
  const f0 = ctx.track.frames[0];
  const camera = { position: new THREE.Vector3(f0.pos.x, f0.pos.y + 2, f0.pos.z), quaternion: new THREE.Quaternion() };
  camera.quaternion.setFromRotationMatrix(new THREE.Matrix4().lookAt(
    camera.position, new THREE.Vector3().copy(f0.pos).addScaledVector(f0.tan, 50), new THREE.Vector3(0, 1, 0)));
  for (let s = 0; s < 6 * 120; s++) {
    for (const c of ctx.cars) {
      const cmd = c.isPlayer ? { throttle: 0, brake: 0, steer: 0, handbrake: true } : c.ai.update(c.car, allCars, dt);
      c.car.applyControls(cmd, dt, ROAD);
    }
    ctx.world.step(dt);
    if (s % 2 === 1) {
      for (const c of ctx.cars) c.car.update();
      a.update(2 * dt, { camera });
    }
  }
  return ctx.cars.map((c, i) => {
    const d = a.debug.cars[i];
    const p = c.car.body.position;
    return { label: d.label, ai: !c.isPlayer, atCar: d.x == null ? null : Math.hypot(d.x - p.x, d.y - p.y, d.z - p.z),
      distance: d.distance, doppler: d.doppler, rpm: d.rpm };
  });
});
console.log('sound AI:', JSON.stringify(sndAI));
const aiV = sndAI ? sndAI.filter((v) => v.ai) : [];
ck('sound: AI cars are heard from where they are',
  sndAI && aiV.length === 3 && aiV.every((v) => v.atCar < 0.01 && v.distance > 10 && v.doppler >= 0.75 && v.doppler <= 1.35)
  && aiV.some((v) => Math.abs(v.doppler - 1) > 0.01) && sndAI.find((v) => !v.ai).distance == null,
  sndAI ? aiV.map((v) => `${v.distance.toFixed(0)} m ×${v.doppler.toFixed(3)}`).join(', ') : 'no audio');

// Render the note offline and measure it.
const sndR = await page.evaluate(async () => {
  if (!window.__createAudio) return null;
  const THREE = window.__THREE;
  const SR = 48000;
  const fake = (rpm, load, z) => ({
    archetype: 'gt', spec: { idleRpm: 1100, redlineRpm: 7600 },
    telemetry: { engineRpm: rpm, rpm, throttle: load, slip: 0, gear: 3, surfaces: ['road', 'road', 'road', 'road'] },
    body: { position: { x: 0, y: 0.5, z }, velocity: { x: 0, y: 0, z: 0 }, quaternion: { x: 0, y: 0, z: 0, w: 1 },
      addEventListener() {}, removeEventListener() {} },
    vehicle: { wheelInfos: [0, 1, 2, 3].map(() => ({ skidInfo: 1, raycastResult: { body: true } })) },
  });
  const camera = { position: new THREE.Vector3(0, 1.5, 0), quaternion: new THREE.Quaternion() };
  async function render({ rpm, load, z = -3, isPlayer = true, muted = false, secs = 3 }) {
    const c = new OfflineAudioContext(2, SR * secs, SR);
    const au = window.__createAudio({ context: c, virtualClock: true });
    au.setMuted(muted);
    au.setCars([{ car: fake(rpm, load, z), isPlayer, label: 'X' }], false);
    for (let i = 0; i < secs * 60; i++) au.update(1 / 60, { camera });
    const buf = await c.startRendering();
    const L = buf.getChannelData(0), R = buf.getChannelData(1);
    const start = buf.length - SR;                 // last second
    const mono = new Float32Array(SR);
    for (let i = 0; i < SR; i++) mono[i] = 0.5 * (L[start + i] + R[start + i]);
    au.dispose();
    return mono;
  }
  const rms = (x) => { let s = 0; for (let i = 0; i < x.length; i++) s += x[i] * x[i]; return Math.sqrt(s / x.length); };
  function spectrum(x, n) {
    const re = new Float64Array(n), im = new Float64Array(n);
    for (let i = 0; i < n; i++) re[i] = (x[i] || 0) * (0.5 - 0.5 * Math.cos(2 * Math.PI * i / (n - 1)));
    for (let i = 1, j = 0; i < n; i++) {
      let bit = n >> 1; for (; j & bit; bit >>= 1) j ^= bit; j ^= bit;
      if (i < j) { [re[i], re[j]] = [re[j], re[i]]; [im[i], im[j]] = [im[j], im[i]]; }
    }
    for (let len = 2; len <= n; len <<= 1) {
      const wr = Math.cos(-2 * Math.PI / len), wi = Math.sin(-2 * Math.PI / len);
      for (let i = 0; i < n; i += len) {
        let cr = 1, ci = 0;
        for (let k = 0; k < len / 2; k++) {
          const p = i + k, q = i + k + len / 2;
          const br = re[q] * cr - im[q] * ci, bi = re[q] * ci + im[q] * cr;
          re[q] = re[p] - br; im[q] = im[p] - bi; re[p] += br; im[p] += bi;
          const nr = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = nr;
        }
      }
    }
    const mag = new Float64Array(n / 2);
    for (let i = 0; i < n / 2; i++) mag[i] = Math.hypot(re[i], im[i]);
    return mag;
  }
  function line(mag, f, n) {
    const c = f / (SR / n);
    let peak = 0, bin = 0;
    for (let k = Math.floor(c - 1.5); k <= Math.ceil(c + 1.5); k++) if (mag[k] > peak) { peak = mag[k]; bin = k; }
    const lo = Math.floor(c * 0.7), hi = Math.ceil(c * 1.4);
    const around = Array.from(mag.slice(lo, hi)).sort((p, q) => p - q);
    return { peakHz: bin * SR / n, db: 20 * Math.log10(peak / (around[around.length >> 1] || 1e-9)) };
  }
  const n = 16384;
  const wot = await render({ rpm: 4000, load: 1 });
  const lift = await render({ rpm: 4000, load: 0 });
  const mute = await render({ rpm: 4000, load: 1, muted: true });
  const nearAI = await render({ rpm: 4000, load: 1, isPlayer: false, z: -5 });
  const farAI = await render({ rpm: 4000, load: 1, isPlayer: false, z: -80 });
  return {
    fFire: 4000 / 60 * 4, wot: { rms: rms(wot), ...line(spectrum(wot, n), 4000 / 60 * 4, n) },
    liftRms: rms(lift), muteRms: rms(mute), nearRms: rms(nearAI), farRms: rms(farAI),
  };
});
console.log('sound render:', JSON.stringify(sndR));
ck('sound: the rendered note has its firing line at rpm/60 · cyl/2, and mute is silence',
  !!sndR && sndR.wot.rms > 0.05 && Math.abs(sndR.wot.peakHz - sndR.fFire) < 4 && sndR.wot.db > 20
  && sndR.liftRms < 0.5 * sndR.wot.rms && sndR.muteRms < 1e-4
  && sndR.nearRms > 5 * sndR.farRms && sndR.farRms > 0.001,
  sndR ? `4000 rpm WOT: rms ${sndR.wot.rms.toFixed(3)}, line ${sndR.wot.peakHz.toFixed(1)} Hz (${sndR.fFire.toFixed(1)} expected) ${sndR.wot.db.toFixed(1)} dB over median; overrun rms ${sndR.liftRms.toFixed(3)}; muted ${sndR.muteRms.toExponential(1)}; AI 5 m ${sndR.nearRms.toFixed(3)} vs 80 m ${sndR.farRms.toFixed(4)}` : 'no __createAudio');

// ---------- Scenery determinism ----------
// The scenery used to scatter from Math.random(), so a circuit was rebuilt
// differently every time it was loaded and two screenshots of identical code
// differed over most of the frame — which made before/after visual review
// worthless (ROUTINE.md, 2026-08-06). It now draws from seeded per-builder
// streams (src/scenery/rng.js). This gate builds the same circuit twice
// through the production path and compares every vertex of every mesh, so a
// stray Math.random() anywhere in track.js or scenery/* fails the suite
// instead of quietly re-randomising the world.
//
// Fingerprint: a 32-bit FNV-1a over each mesh's world transform, its material
// colour, and its entire position attribute. Rounded to 0.1 mm first —
// float noise is not the thing under test, a re-rolled scatter is.
const determinism = await page.evaluate(() => {
  function fingerprint(group) {
    let h = 0x811c9dc5, meshes = 0, verts = 0;
    const mix = (v) => { h ^= v | 0; h = Math.imul(h, 0x01000193); };
    group.updateMatrixWorld(true);
    const list = [];
    group.traverse((o) => { if (o.isMesh) list.push(o); });
    for (const m of list) {
      meshes++;
      for (const e of m.matrixWorld.elements) mix(Math.round(e * 1e4));
      if (m.material && m.material.color) mix(m.material.color.getHex());
      mix(m.count || 1);                       // instance count, if instanced
      const pos = m.geometry && m.geometry.attributes.position;
      if (!pos) continue;
      verts += pos.count;
      const a = pos.array;
      for (let i = 0; i < a.length; i++) mix(Math.round(a[i] * 1e4));
    }
    return { hash: (h >>> 0).toString(16), meshes, verts };
  }
  const build = (id) => {
    window.__rebuildTrackById(id);
    return fingerprint(window.__ctx.track.group);
  };
  // Two circuits, each built twice, interleaved — so a pass cannot come from
  // the builder simply caching the first result and handing it back.
  const gp1 = build('gp');
  const other = window.__trackIds.find((t) => t !== 'gp');
  const dt1 = build(other);
  const gp2 = build('gp');
  const dt2 = build(other);
  return { gp1, gp2, dt1, dt2, other };
});
console.log('determinism:', JSON.stringify(determinism));
ck('rebuilding a circuit reproduces it vertex for vertex',
  determinism.gp1.hash === determinism.gp2.hash
  && determinism.dt1.hash === determinism.dt2.hash
  && determinism.gp1.meshes > 50 && determinism.gp1.verts > 100000,
  `gp ${determinism.gp1.hash}/${determinism.gp2.hash} (${determinism.gp1.meshes} meshes,`
  + ` ${determinism.gp1.verts} verts), ${determinism.other} ${determinism.dt1.hash}/${determinism.dt2.hash}`);
// Guards the gate above: if the fingerprint were degenerate (hashing nothing,
// or the same constant for any input) the equality check would pass for the
// wrong reason. Two different circuits must not collide.
ck('the scenery fingerprint distinguishes two circuits',
  determinism.gp1.hash !== determinism.dt1.hash,
  `gp=${determinism.gp1.hash} ${determinism.other}=${determinism.dt1.hash}`);

// Put the default circuit back — later checks assume `gp`.
await page.evaluate(() => window.__rebuildTrackById('gp'));

// Quick race keeps 3 laps; split-screen hides the aid.
await startMode('quick-race');
const qrLaps = await page.evaluate(() => window.__ctx.state.totalLaps);
ck('quick race is still 3 laps', qrLaps === 3, `totalLaps=${qrLaps}`);
await startMode('two-player');
const tpLine = await page.evaluate(() => window.__ctx.racingLine.mesh.visible);
ck('racing line hidden in split-screen', tpLine === false, `visible=${tpLine}`);

ck('no console errors', errs.length === 0, errs.slice(0, 3).join(' | ') || 'clean');
console.log(`\n${pass} passed, ${fail} failed`);
await b.close();
process.exit(fail ? 1 : 0);
