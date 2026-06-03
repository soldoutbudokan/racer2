// Orbit-inspect the car headlessly. Starts a mode, freezes the loop, then
// renders the primary car from several angles up close.
//   node scripts/inspect.mjs <mode> <out-prefix> [carIndex]
import { chromium } from 'playwright-core';

const EXE = process.env.HOME +
  '/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/' +
  'Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';

const mode = process.argv[2] || 'time-trial';
const out = process.argv[3] || '/tmp/car';
const carIndex = parseInt(process.argv[4] || '0', 10);

const browser = await chromium.launch({
  executablePath: EXE, headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
    '--ignore-gpu-blocklist'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));

await page.goto('http://localhost:5173/', { waitUntil: 'load' });
await page.waitForSelector(`button.mode[data-mode="${mode}"]`, { timeout: 15000 });
await page.waitForTimeout(500);
await page.click(`button.mode[data-mode="${mode}"]`);
await page.waitForTimeout(2200);          // let physics settle the car onto its wheels

// Freeze the loop so our custom camera isn't overwritten, and hide HUD.
const noBloom = process.argv.includes('nobloom');
await page.evaluate((noBloom) => {
  window.__ctx.mode = null;
  const ui = document.getElementById('ui'); if (ui) ui.style.display = 'none';
  if (noBloom) {
    window.__ctx.composer.passes.forEach((p) => {
      if (p.constructor && p.constructor.name === 'UnrealBloomPass') p.enabled = false;
    });
  }
}, noBloom);

// angles: [label, azimuthDeg, elevationDeg, distance, fov]
const VIEWS = [
  ['frontq', 35, 12, 6.5, 38],
  ['rearq', 150, 14, 6.5, 38],
  ['side', 90, 6, 6.0, 36],
  ['front', 0, 8, 6.0, 36],
  ['top', 25, 55, 7.5, 40],
  ['low', 50, 2, 5.0, 40],
];

for (const [label, azDeg, elDeg, dist, fov] of VIEWS) {
  await page.evaluate(({ azDeg, elDeg, dist, fov, carIndex }) => {
    const ctx = window.__ctx;
    const car = ctx.cars[carIndex].car;
    const p = car.body.position;
    const cam = ctx.camera;
    const az = azDeg * Math.PI / 180, el = elDeg * Math.PI / 180;
    cam.aspect = window.innerWidth / window.innerHeight;
    cam.fov = fov; cam.updateProjectionMatrix();
    cam.position.set(
      p.x + dist * Math.cos(el) * Math.sin(az),
      p.y + dist * Math.sin(el) + 0.3,
      p.z + dist * Math.cos(el) * Math.cos(az),
    );
    cam.lookAt(p.x, p.y + 0.2, p.z);
    ctx.composer.render();
  }, { azDeg, elDeg, dist, fov, carIndex });
  await page.waitForTimeout(120);
  await page.screenshot({ path: `${out}-${label}.png` });
}

console.log('errors:', errors.length ? errors.slice(0, 8) : 'none');
await browser.close();
