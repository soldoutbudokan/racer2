// Headless screenshot harness: launches the running dev server, starts a mode,
// optionally cycles the camera, waits for the WebGL scene to settle, and saves
// PNGs so we can actually see the car. Usage:
//   node scripts/shoot.mjs <mode> <out-prefix> [camCycles] [waitMs]
import { chromium } from 'playwright-core';

const EXE = process.env.HOME +
  '/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/' +
  'Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';

const mode = process.argv[2] || 'time-trial';
const out = process.argv[3] || '/tmp/racer';
const camCycles = parseInt(process.argv[4] || '0', 10);
const waitMs = parseInt(process.argv[5] || '2500', 10);

const browser = await chromium.launch({
  executablePath: EXE,
  headless: true,
  args: [
    '--use-gl=angle', '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist',
    '--enable-webgl', '--enable-accelerated-2d-canvas',
  ],
});
const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));

await page.goto('http://localhost:5173/', { waitUntil: 'load' });
// wait for menu button
await page.waitForSelector(`button.mode[data-mode="${mode}"]`, { timeout: 15000 });
await page.waitForTimeout(600);
await page.click(`button.mode[data-mode="${mode}"]`);
await page.waitForTimeout(waitMs);

for (let i = 0; i < camCycles; i++) {
  await page.keyboard.press('c');
  await page.waitForTimeout(1200);
}

await page.screenshot({ path: `${out}.png` });

// Also grab a WebGL sanity readout from the page.
const gl = await page.evaluate(() => {
  const c = document.getElementById('game');
  const ctx = c && (c.getContext('webgl2') || c.getContext('webgl'));
  if (!ctx) return 'NO-GL';
  const dbg = ctx.getExtension('WEBGL_debug_renderer_info');
  return dbg ? ctx.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : 'gl-ok';
});

console.log('renderer:', gl);
console.log('errors:', errors.length ? errors.slice(0, 8) : 'none');
await browser.close();
