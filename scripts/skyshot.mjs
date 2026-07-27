// Sky-focused screenshots on every circuit: pick track, start time-trial,
// aim the camera outward/upward from the car, save one PNG per circuit.
import { chromium } from 'playwright-core';
const EXE = process.env.HOME +
  '/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/' +
  'Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';

const TRACKS = process.argv[2] ? process.argv[2].split(',') :
  ['gp', 'sprint', 'downtown', 'alpine', 'dunes', 'parco'];
const OUT = process.argv[3] || '/tmp/sky';

const browser = await chromium.launch({
  executablePath: EXE, headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
await page.goto('http://localhost:5173/', { waitUntil: 'load' });
// The mode buttons are static HTML, but the track cards are injected only
// after init() finishes building the default circuit — wait for THEM.
await page.waitForSelector('button.track-card', { timeout: 30000 });

for (const id of TRACKS) {
  const card = await page.$(`button.track-card[data-track="${id}"]`);
  if (!card) throw new Error(`no track card for ${id}`);
  await card.click();
  await page.waitForTimeout(1500);
  await page.click('button.mode[data-mode="time-trial"]');
  await page.waitForTimeout(2200);

  // Freeze the sim, hide UI, and take 3 outward views with plenty of sky.
  await page.evaluate(() => {
    window.__ctx.mode = null;
    const u = document.getElementById('ui'); if (u) u.style.display = 'none';
  });
  for (const [label, az, elevDeg] of [['a', 0, 16], ['b', 120, 18], ['c', 240, 14]]) {
    await page.evaluate(({ az, elevDeg }) => {
      const ctx = window.__ctx;
      const p = ctx.cars[0].car.body.position;
      const cam = ctx.camera;
      const a = az * Math.PI / 180;
      cam.fov = 58; cam.aspect = innerWidth / innerHeight;
      cam.updateProjectionMatrix();
      cam.position.set(p.x, p.y + 6, p.z);
      const e = elevDeg * Math.PI / 180;
      cam.lookAt(p.x + Math.sin(a) * 100, p.y + 6 + Math.tan(e) * 100,
                 p.z + Math.cos(a) * 100);
      ctx.composer.render();
    }, { az, elevDeg });
    await page.waitForTimeout(150);
    await page.screenshot({ path: `${OUT}-${id}-${label}.png` });
  }
  // back to menu for the next circuit
  await page.evaluate(() => {
    const m = document.getElementById('menu'); if (m) m.classList.remove('hidden');
    const u = document.getElementById('ui'); if (u) u.style.display = '';
  });
  await page.waitForTimeout(300);
}
console.log('errors:', errors.length ? errors.slice(0, 6) : 'none');
await browser.close();
