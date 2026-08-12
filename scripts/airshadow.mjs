// Measures the fake contact shadow against airtime: where the blob actually
// sits, how dark it is and how big, at a series of chassis heights above the
// road. Run it after ANY change to the shadow seating in `car.js` or to the
// ride-height geometry in `stance.js`.
//
// Why it exists: the blob is ground furniture that car.js re-seats every frame,
// and the only ground it had to measure from was the car's own wheels
// (`mean(hub.y) - WHEEL_RADIUS`). That is exact while the tyres are down and
// meaningless once they are not — an airborne wheel hangs at full droop, so
// the "road" it implies climbs with the chassis and the shadow flies along with
// the car, at full strength. Nothing in the suite could see that, because every
// other probe measures a car that is on the ground.
//
// Usage:  CHROME_EXE=... node scripts/airshadow.mjs [heights,m,csv] [shotPrefix]
//
// With a shot prefix it also photographs a car on the racing surface held at
// three heights, from a low rear-3/4 angle where the road under the car is
// visible — the numbers say where the blob is, the shots say what it looks
// like. The prefix is a FILENAME prefix, not a directory; it will not create
// the parent. Film grain is pinned the way viewshot.mjs pins it, so two runs of
// identical code produce comparable PNGs.
import { chromium } from 'playwright-core';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

function findChrome() {
  if (process.env.CHROME_EXE && existsSync(process.env.CHROME_EXE)) return process.env.CHROME_EXE;
  try {
    const out = execSync(
      'find ~/.cache/puppeteer/chrome /root/.cache/puppeteer/chrome /opt/pw-browsers -maxdepth 3 -name chrome -type f 2>/dev/null | head -1',
      { shell: '/bin/bash' }).toString().trim();
    if (out && existsSync(out)) return out;
  } catch { /* fall through */ }
  throw new Error('No Chrome binary found — set CHROME_EXE');
}

const heights = (process.argv[2] || '0,0.05,0.15,0.3,0.6,1.2,2.5')
  .split(',').map(Number).filter((n) => Number.isFinite(n));
const shotPrefix = process.argv[3] || null;

const b = await chromium.launch({
  executablePath: findChrome(), headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'],
});
const page = await b.newPage({ viewport: { width: 640, height: 480 } });
page.on('pageerror', (e) => console.log('PAGEERROR', e.message));
await page.goto('http://localhost:5173/', { waitUntil: 'load' });
await page.waitForFunction(() => !!window.__ctx, { timeout: 20000 });
await page.waitForSelector('button.mode[data-mode="time-trial"]');
await page.evaluate(() => document.querySelector('button.mode[data-mode="time-trial"]').click());
await page.waitForTimeout(600);
await page.evaluate(() => { window.__ctx.mode = null; });

const out = await page.evaluate((hs) => {
  const ctx = window.__ctx;
  const world = ctx.world;
  const me = ctx.cars[0].car;
  const dt = 1 / 120;
  const step = (n) => { for (let i = 0; i < n; i++) { world.step(dt); me.update(); } };

  // Open ground, well clear of the armco, and let it settle on its springs.
  me.reset({ x: 1500, y: 1.0, z: -1800 }, 0);
  for (let i = 0; i < 120; i++) {
    me.applyControls({ throttle: 0, brake: 0, steer: 0, handbrake: false }, dt, ['road', 'road', 'road', 'road']);
    step(1);
  }
  const settledY = me.body.position.y;
  const sh = me.visual.shadow;
  const geoCentre = (() => {
    sh.geometry.computeBoundingBox();
    const bb = sh.geometry.boundingBox;
    return { x: (bb.max.x + bb.min.x) / 2, z: (bb.max.z + bb.min.z) / 2 };
  })();

  const rows = [];
  for (const h of hs) {
    // Hold the car at a fixed height: place it, kill its velocity, and take one
    // step so the suspension raycasts (and therefore the wheel contacts) are
    // computed for THIS pose rather than the previous one.
    me.body.position.set(1500, settledY + h, -1800);
    me.body.velocity.setZero();
    me.body.angularVelocity.setZero();
    world.step(dt);
    me.update();
    const contacts = me.vehicle.wheelInfos.filter((w) => w.raycastResult.body).length;
    me.visual.root.updateMatrixWorld(true);
    rows.push({
      askedH: h,
      chassisY: +me.body.position.y.toFixed(4),
      contacts,
      shadowY: +sh.matrixWorld.elements[13].toFixed(4),
      fade: sh.material.userData.fade ? +sh.material.userData.fade.value.toFixed(4) : null,
      scale: +sh.scale.x.toFixed(4),
      visible: sh.visible,
    });
  }
  return { settledY: +settledY.toFixed(4), geoCentre, rows };
}, heights);

console.log(`settled chassis y ${out.settledY}   blob geometry centre `
  + `x ${out.geoCentre.x.toFixed(3)} z ${out.geoCentre.z.toFixed(3)}`);
console.log('   air(m)  chassisY  contacts   shadowY     fade   scale  visible');
for (const r of out.rows) {
  console.log(
    `  ${String(r.askedH).padStart(6)}  ${String(r.chassisY).padStart(8)}  `
    + `${String(r.contacts).padStart(8)}  ${String(r.shadowY).padStart(8)}  `
    + `${String(r.fade).padStart(7)}  ${String(r.scale).padStart(6)}  ${r.visible}`);
}
if (shotPrefix) {
  // Shots need the car on the asphalt with the road visible under it, so this
  // is a second run-up: quick race, drive the field deterministically with the
  // AI logic (the viewshot.mjs recipe), then hold the player car at a height
  // and photograph it from low and behind.
  await page.setViewportSize({ width: 1100, height: 800 });
  await page.evaluate(() => document.querySelector('button.mode[data-mode="quick-race"]').click());
  await page.waitForTimeout(1500);
  await page.evaluate(() => {
    const ctx = window.__ctx;
    ctx.mode = null;
    const drv = window.__createAIDriver(ctx.track, { skill: 0.82 });
    const dt = 1 / 120;
    const cars = ctx.cars.map((c) => c.car);
    for (let s = 0; s < 6 * 120; s++) {
      for (const c of ctx.cars) {
        const cmd = c.isPlayer ? drv.update(c.car, cars, dt) : c.ai.update(c.car, cars, dt);
        c.car.applyControls(cmd, dt, ['road', 'road', 'road', 'road']);
      }
      ctx.world.step(dt);
    }
    for (const c of ctx.cars) c.car.update();
    if (ctx.updateShadowTarget) ctx.updateShadowTarget(ctx.cars[0].car.body.position);
    // Pin the film-grain phase (see viewshot.mjs) — the loop is frozen from
    // here, so one write holds for every shot below.
    ctx.composer.passes.forEach((p) => {
      if (p.uniforms && p.uniforms.uTime) p.uniforms.uTime.value = 0;
    });
  });

  const SHOTS = [['grounded', 0], ['hop', 0.35], ['launched', 1.0]];
  for (const [label, h] of SHOTS) {
    await page.evaluate(({ h }) => {
      const ctx = window.__ctx;
      const me = ctx.cars[0].car;
      if (me.__baseY === undefined) me.__baseY = me.body.position.y;
      me.body.position.y = me.__baseY + h;
      me.body.velocity.setZero();
      me.body.angularVelocity.setZero();
      ctx.world.step(1 / 120);
      me.update();
      // Low rear-3/4, aimed at the road just under the car.
      const b2 = me.body;
      const q = b2.quaternion;
      const fx = 2 * (q.x * q.z + q.w * q.y);
      const fz = 1 - 2 * (q.x * q.x + q.y * q.y);
      const len = Math.hypot(fx, fz) || 1;
      const f = { x: fx / len, z: fz / len };
      const left = { x: -f.z, z: f.x };
      const a = 150 * Math.PI / 180, dist = 7.5, el = 8 * Math.PI / 180;
      const horiz = dist * Math.cos(el);
      const cam = ctx.camera;
      cam.aspect = window.innerWidth / window.innerHeight;
      cam.fov = 40;
      cam.updateProjectionMatrix();
      cam.position.set(
        b2.position.x + f.x * horiz * Math.cos(a) + left.x * horiz * Math.sin(a),
        me.__baseY + dist * Math.sin(el),
        b2.position.z + f.z * horiz * Math.cos(a) + left.z * horiz * Math.sin(a),
      );
      cam.lookAt(b2.position.x, me.__baseY - 0.4, b2.position.z);
      const ui = document.getElementById('ui');
      if (ui) ui.style.display = 'none';
      ctx.composer.render();
    }, { h });
    await page.waitForTimeout(150);
    await page.screenshot({ path: `${shotPrefix}-${label}.png` });
    console.log(`shot ${shotPrefix}-${label}.png  (car held ${h} m up)`);
  }
}
await b.close();
