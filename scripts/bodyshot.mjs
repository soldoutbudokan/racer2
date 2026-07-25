// Tight bodywork close-ups for judging panel structure (shut lines, pillars,
// glazing) on a chosen car. Drives deterministically like viewshot.mjs, then
// orbits the camera around one car at close range.
//
//   node scripts/bodyshot.mjs [outPrefix] [carIndex] [driveSecs]
//
// Car indices follow main.js's grid: 0 = player (gt), 1 = open-wheel,
// 2 = gt (AI), 3 = muscle.
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

const out = process.argv[2] || '/tmp/body';
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
}, driveSecs);

// [label, azimuth deg (0 = dead ahead of the car, 90 = its left flank),
//  elevation deg, distance m, aim height above the body origin]
const VIEWS = [
  ['side', 90, 4, 6.0, 0.15],
  ['flank', 90, 7, 3.4, 0.05],
  ['quarter', 55, 14, 3.6, 0.20],
  ['front34', 40, 8, 6.0, 0.15],
  ['rear34', 140, 10, 6.0, 0.15],
  ['cabin', 70, 26, 4.6, 0.35],
  ['hood', 25, 34, 4.6, 0.20],
  ['top', 90, 68, 6.4, 0.10],
];
for (const [label, az, el, dist, aimY] of VIEWS) {
  await page.evaluate(({ az, el, dist, aimY, carIdx }) => {
    const ctx = window.__ctx;
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
    cam.fov = 38;
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
  }, { az, el, dist, aimY, carIdx });
  await page.waitForTimeout(150);
  await page.screenshot({ path: `${out}-${label}.png` });
}

console.log('errors:', errors.length ? errors.slice(0, 6) : 'none');
await browser.close();
