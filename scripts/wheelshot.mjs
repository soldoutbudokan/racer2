// Tight wheel close-ups for judging the "hollow tyre" issue. Positions the
// camera right beside the GT's front wheel, side-on and slightly oblique, on
// both sides. node scripts/wheelshot.mjs [outPrefix]
import { chromium } from 'playwright-core';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

function findChrome() {
  if (process.env.CHROME_EXE && existsSync(process.env.CHROME_EXE)) return process.env.CHROME_EXE;
  const out = execSync(
    'find /opt/pw-browsers -maxdepth 3 -name chrome -type f 2>/dev/null | head -1',
    { shell: '/bin/bash' }).toString().trim();
  if (out && existsSync(out)) return out;
  throw new Error('No Chrome binary found — set CHROME_EXE');
}

const out = process.argv[2] || '/tmp/wheel';

const browser = await chromium.launch({
  executablePath: findChrome(), headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1000, height: 800 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
await page.goto('http://localhost:5173/', { waitUntil: 'load' });
await page.waitForSelector('button.mode[data-mode="quick-race"]', { timeout: 20000 });
await page.click('button.mode[data-mode="quick-race"]');
await page.waitForTimeout(1500);

await page.evaluate(() => {
  const ctx = window.__ctx;
  ctx.mode = null;
  const drv = window.__createAIDriver(ctx.track, { skill: 0.82 });
  const dt = 1 / 120;
  const aiCars = ctx.cars.map((c) => c.car);
  for (let s = 0; s < 240; s++) {
    for (const c of ctx.cars) {
      const cmd = c.isPlayer ? drv.update(c.car, aiCars, dt) : c.ai.update(c.car, aiCars, dt);
      c.car.applyControls(cmd, dt, ['road', 'road', 'road', 'road']);
    }
    ctx.world.step(dt);
  }
  for (const c of ctx.cars) c.car.update();
});

// side: +1 looks from the car's left, -1 from the right. lat = camera lateral
// distance; fwd = along-car offset toward the front wheel.
const VIEWS = [
  ['left-side', 1, 3.4, 1.5, 0.2],
  ['left-oblique', 1, 3.2, 3.6, -0.2],
  ['right-side', -1, 3.4, 1.5, 0.2],
  ['right-oblique', -1, 3.2, 3.6, -0.2],
];
for (const [label, side, lat, fwd, look] of VIEWS) {
  await page.evaluate(({ side, lat, fwd, look }) => {
    const ctx = window.__ctx;
    const body = ctx.cars[0].car.body;
    const q = body.quaternion;
    const fx = 2 * (q.x * q.z + q.w * q.y);
    const fz = 1 - 2 * (q.x * q.x + q.y * q.y);
    const len = Math.hypot(fx, fz) || 1;
    const f = { x: fx / len, z: fz / len };
    const left = { x: -f.z, z: f.x };
    // Front axle is ~1.5m ahead of body centre; aim there.
    const wx = body.position.x + f.x * 1.5;
    const wz = body.position.z + f.z * 1.5;
    const cam = ctx.camera;
    cam.aspect = window.innerWidth / window.innerHeight;
    cam.fov = 34;
    cam.updateProjectionMatrix();
    cam.position.set(
      wx + left.x * lat * side + f.x * fwd,
      body.position.y - 0.15,
      wz + left.z * lat * side + f.z * fwd,
    );
    cam.lookAt(wx + f.x * look, body.position.y - 0.35, wz + f.z * look);
    const ui = document.getElementById('ui');
    if (ui) ui.style.display = 'none';
    ctx.composer.render();
  }, { side, lat, fwd, look });
  await page.waitForTimeout(150);
  await page.screenshot({ path: `${out}-${label}.png` });
}

console.log('errors:', errors.length ? errors.slice(0, 6) : 'none');
await browser.close();
