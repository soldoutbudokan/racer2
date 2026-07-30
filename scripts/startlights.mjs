// Start-light rig shots: the gantry's five red columns at every stage of the
// race-start sequence, from the pole-sitter's view and as a telephoto close-up
// of the rig itself. The other shooters all frame the CAR, so none of them can
// judge the light rig — this one points the camera at the gantry.
//
//   node scripts/startlights.mjs [outPrefix] [trackId]
//
// Sets the lights directly through `track.startLights.set(n)` with the game
// loop frozen, so each stage is captured deterministically instead of racing
// the real 4.2 s sequence.
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

const out = process.argv[2] || '/tmp/startlights';
const trackId = process.argv[3] || null;

const browser = await chromium.launch({
  executablePath: findChrome(), headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
await page.goto('http://localhost:5173/', { waitUntil: 'load' });
await page.waitForSelector('button.mode[data-mode="quick-race"]', { timeout: 20000 });
if (trackId) {
  await page.click(`button.track-card[data-track="${trackId}"]`);
  await page.waitForTimeout(2500);
}
await page.click('button.mode[data-mode="quick-race"]');
await page.waitForTimeout(1500);

// Freeze the loop and put the field back on the grid — by now the page has had
// a second of rAF, so the sequence has already run part-way and the cars have
// been released. Same re-seat viewshot.mjs does for its `0` grid shot.
await page.evaluate(() => {
  const ctx = window.__ctx;
  ctx.mode = null;
  ctx.cars.forEach((c, i) => {
    const sp = window.__gridSpawn(ctx.track, i);
    c.car.reset(sp.position, sp.yaw);
  });
  ctx.world.step(1 / 120);
  for (const c of ctx.cars) c.car.update();
  if (ctx.updateShadowTarget) ctx.updateShadowTarget(ctx.cars[0].car.body.position);
  const ui = document.getElementById('ui');
  if (ui) ui.style.display = 'none';
});

// [label, metres before the start line, camera height, fov, aim height]
const VIEWS = [
  ['pole', -10, 1.9, 55, 4.2],   // roughly what the pole-sitter is looking at
  ['rig', -4, 3.4, 22, 6.2],     // telephoto straight at the light rig
];

// 0 lit = the lead-in AND the green — the whole point is that they look the
// same on the rig, so shoot the sequence 0..5 and label the trailing 0 `green`.
const STAGES = [
  ['0-dark', 0], ['1', 1], ['2', 2], ['3', 3], ['4', 4], ['5-all-red', 5],
  ['6-green', 0],
];

for (const [label, back, h, fov, aimY] of VIEWS) {
  for (const [stage, lit] of STAGES) {
    await page.evaluate(({ back, h, fov, aimY, lit }) => {
      const ctx = window.__ctx;
      ctx.track.startLights.set(lit);
      const f = ctx.track.frames[0];
      const cam = ctx.camera;
      cam.aspect = window.innerWidth / window.innerHeight;
      cam.fov = fov;
      cam.updateProjectionMatrix();
      cam.position.set(
        f.pos.x + f.tan.x * back,
        f.pos.y + h,
        f.pos.z + f.tan.z * back,
      );
      // The gantry sits 8 m down the road from the start frame.
      cam.lookAt(
        f.pos.x + f.tan.x * 8,
        f.pos.y + aimY,
        f.pos.z + f.tan.z * 8,
      );
      ctx.composer.render();
    }, { back, h, fov, aimY, lit });
    await page.waitForTimeout(120);
    await page.screenshot({ path: `${out}-${label}-${stage}.png` });
  }
}

console.log('errors:', errors.length ? errors.slice(0, 6) : 'none');
await browser.close();
