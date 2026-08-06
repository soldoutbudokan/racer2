// Deterministic view screenshots: starts a mode, freezes the rAF loop, steps
// the physics manually (so SwiftShader's render speed doesn't matter), drives
// the car a chosen distance along the lap, and renders from several angles.
//
//   node scripts/viewshot.mjs [secondsOfDriving] [outPrefix] [mode]
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

const driveSecs = parseFloat(process.argv[2] || '6');
const out = process.argv[3] || '/tmp/view';
const mode = process.argv[4] || 'quick-race';

const browser = await chromium.launch({
  executablePath: findChrome(), headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
await page.goto('http://localhost:5173/', { waitUntil: 'load' });
await page.waitForSelector(`button.mode[data-mode="${mode}"]`, { timeout: 20000 });
await page.click(`button.mode[data-mode="${mode}"]`);
await page.waitForTimeout(1500);

// Freeze the loop and drive the player deterministically with the AI logic.
await page.evaluate((secs) => {
  const ctx = window.__ctx;
  ctx.mode = null;
  const playerDriver = window.__createAIDriver(ctx.track, { skill: 0.82 });
  const dt = 1 / 120;
  const steps = Math.floor(secs * 120);
  const aiCars = ctx.cars.map((c) => c.car);
  // `0` means "shoot the starting grid". Re-seat the field first: by the time
  // this runs the page has already had a second or so of rAF, so without a
  // reset the grid shot shows wherever the cars happened to drift to, not the
  // pose a race actually starts in.
  if (steps === 0) {
    ctx.cars.forEach((c, i) => {
      const sp = window.__gridSpawn(ctx.track, i);
      c.car.reset(sp.position, sp.yaw);
    });
    ctx.world.step(dt);   // one step so the suspension raycast has run
  }
  for (let s = 0; s < steps; s++) {
    for (const c of ctx.cars) {
      const cmd = c.isPlayer
        ? playerDriver.update(c.car, aiCars, dt)
        : c.ai.update(c.car, aiCars, dt);
      c.car.applyControls(cmd, dt, ['road', 'road', 'road', 'road']);
    }
    ctx.world.step(dt);
  }
  for (const c of ctx.cars) c.car.update();
  if (ctx.updateShadowTarget) ctx.updateShadowTarget(ctx.cars[0].car.body.position);

  // The cinematic pass adds film grain whose phase is `uTime`, which the main
  // loop drives from the wall clock. It is a deliberate per-frame effect, but
  // it means two shooter runs of identical code differ over the WHOLE frame —
  // which is not what a before/after diff is trying to measure. The loop is
  // frozen from here on (ctx.mode is null, so tick() no longer runs), so
  // pinning the phase once holds for every view below.
  ctx.composer.passes.forEach((p) => {
    if (p.uniforms && p.uniforms.uTime) p.uniforms.uTime.value = 0;
  });
}, driveSecs);

// Views: [label, camOffsetBack, height, lateral, fov, lookAheadM]
const VIEWS = [
  ['chase', 7.5, 2.6, 0, 62, 6],
  ['low', 5.5, 1.1, 2.2, 55, 4],
  ['front34', -6.5, 1.6, 3.0, 50, 0],
  ['trackside', 2, 1.6, 12, 45, 0],
  ['high', 14, 9, 6, 55, 5],
];
for (const [label, back, h, latr, fov, lookAhead] of VIEWS) {
  await page.evaluate(({ back, h, latr, fov, lookAhead }) => {
    const ctx = window.__ctx;
    const body = ctx.cars[0].car.body;
    const q = body.quaternion;
    const fx = 2 * (q.x * q.z + q.w * q.y);
    const fz = 1 - 2 * (q.x * q.x + q.y * q.y);
    const len = Math.hypot(fx, fz) || 1;
    const f = { x: fx / len, z: fz / len };
    const left = { x: -f.z, z: f.x };
    const cam = ctx.camera;
    cam.aspect = window.innerWidth / window.innerHeight;
    cam.fov = fov;
    cam.updateProjectionMatrix();
    cam.position.set(
      body.position.x - f.x * back + left.x * latr,
      body.position.y + h,
      body.position.z - f.z * back + left.z * latr,
    );
    cam.lookAt(
      body.position.x + f.x * lookAhead,
      body.position.y + 0.5,
      body.position.z + f.z * lookAhead,
    );
    const ui = document.getElementById('ui');
    if (ui) ui.style.display = 'none';
    ctx.composer.render();
  }, { back, h, latr, fov, lookAhead });
  await page.waitForTimeout(150);
  await page.screenshot({ path: `${out}-${label}.png` });
}

console.log('errors:', errors.length ? errors.slice(0, 6) : 'none');
await browser.close();
