// Close-ups of the perfect-line driving aid where it meets the car: low, tight
// angles at the footprint, which is the only place the ribbon and the bodywork
// can fight (depth bleed through the bumper, the aid glowing straight through
// the car's contact shadow). Drives deterministically like viewshot.mjs, then
// pins the camera near ground level around one car.
//
//   node scripts/lineshot.mjs [outPrefix] [carIndex] [driveSecs]
//
// Shot twice per angle: once with the aid forced GREEN (the loud case, player
// slower than the ideal line) and once forced RED.
import { chromium } from 'playwright-core';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

function findChrome() {
  if (process.env.CHROME_EXE && existsSync(process.env.CHROME_EXE)) return process.env.CHROME_EXE;
  const out = execSync(
    'find /opt/pw-browsers ~/.cache/puppeteer/chrome -maxdepth 3 -name chrome -type f 2>/dev/null | head -1',
    { shell: '/bin/bash' }).toString().trim();
  if (out && existsSync(out)) return out;
  throw new Error('No Chrome binary found — set CHROME_EXE');
}

const out = process.argv[2] || '/tmp/line';
const carIdx = parseInt(process.argv[3] || '0', 10);
const driveSecs = parseFloat(process.argv[4] || '6');

const browser = await chromium.launch({
  executablePath: findChrome(), headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1100, height: 800 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
await page.goto('http://localhost:5173/', { waitUntil: 'load' });
await page.waitForSelector('button.mode[data-mode="quick-race"]', { timeout: 20000 });
await page.click('button.mode[data-mode="quick-race"]');
await page.waitForTimeout(1500);

await page.evaluate((secs) => {
  const ctx = window.__ctx;
  ctx.mode = null;
  const drv = window.__createAIDriver(ctx.track, { skill: 0.82 });
  const dt = 1 / 120;
  const aiCars = ctx.cars.map((c) => c.car);
  for (let s = 0; s < Math.floor(secs * 120); s++) {
    for (const c of ctx.cars) {
      const cmd = c.isPlayer ? drv.update(c.car, aiCars, dt) : c.ai.update(c.car, aiCars, dt);
      c.car.applyControls(cmd, dt, ['road', 'road', 'road', 'road']);
    }
    ctx.world.step(dt);
  }
  for (const c of ctx.cars) c.car.update();
  if (ctx.updateShadowTarget) ctx.updateShadowTarget(ctx.cars[0].car.body.position);
  ctx.racingLine.setVisible(true);
}, driveSecs);

// [label, azimuth deg (0 = dead ahead of the car, 180 = behind it),
//  elevation deg, distance m, aim height above the body origin, fov]
const VIEWS = [
  ['rear-low', 180, 3, 4.2, -0.15, 42],
  ['rear-ground', 180, 1.2, 3.0, -0.30, 46],
  ['rear34-low', 145, 5, 4.4, -0.10, 42],
  ['side-low', 90, 3, 4.0, -0.25, 42],
  ['front-low', 8, 3, 5.0, -0.15, 42],
  ['over', 170, 30, 7.0, 0.0, 45],
];
// [suffix, speed handed to racingLine.update — the aid colours by ideal-minus-
//  actual, so 0 m/s is green everywhere and 120 m/s is red everywhere]
const STATES = [['green', 0], ['red', 120]];

for (const [label, az, el, dist, aimY, fov] of VIEWS) {
  for (const [suffix, speed] of STATES) {
    await page.evaluate(({ az, el, dist, aimY, fov, carIdx, speed }) => {
      const ctx = window.__ctx;
      ctx.racingLine.update(speed);
      const body = ctx.cars[Math.min(carIdx, ctx.cars.length - 1)].car.body;
      const q = body.quaternion;
      const fx = 2 * (q.x * q.z + q.w * q.y);
      const fz = 1 - 2 * (q.x * q.x + q.y * q.y);
      const len = Math.hypot(fx, fz) || 1;
      const f = { x: fx / len, z: fz / len };
      const left = { x: -f.z, z: f.x };
      const a = az * Math.PI / 180, e = el * Math.PI / 180;
      const horiz = dist * Math.cos(e);
      const cam = ctx.camera;
      cam.aspect = window.innerWidth / window.innerHeight;
      cam.fov = fov;
      cam.updateProjectionMatrix();
      cam.position.set(
        body.position.x + f.x * horiz * Math.cos(a) + left.x * horiz * Math.sin(a),
        body.position.y + dist * Math.sin(e),
        body.position.z + f.z * horiz * Math.cos(a) + left.z * horiz * Math.sin(a),
      );
      cam.lookAt(body.position.x, body.position.y + aimY, body.position.z);
      const ui = document.getElementById('ui');
      if (ui) ui.style.display = 'none';
      ctx.composer.render();
    }, { az, el, dist, aimY, fov, carIdx, speed });
    await page.waitForTimeout(150);
    await page.screenshot({ path: `${out}-${label}-${suffix}.png` });
  }
}

console.log('errors:', errors.length ? errors.slice(0, 6) : 'none');
await browser.close();
