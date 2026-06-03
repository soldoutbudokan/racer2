import { chromium } from 'playwright-core';
const EXE = process.env.HOME +
  '/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/' +
  'Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const browser = await chromium.launch({ executablePath: EXE, headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
await page.goto('http://localhost:5173/', { waitUntil: 'load' });
await page.waitForSelector('button.mode[data-mode="quick-race"]');
await page.waitForTimeout(400);
await page.click('button.mode[data-mode="quick-race"]');
await page.waitForTimeout(2500);
await page.evaluate(() => { window.__ctx.mode = null; const u = document.getElementById('ui'); if (u) u.style.display = 'none'; });

// establishing views aimed outward at the scenery
const VIEWS = [
  ['trees', 70, 18, 8, 60, [40, 8, 40]],
  ['stand', 90, 10, 6, 55, [-30, 6, 0]],
  ['horizon', 0, 14, 6, 62, [0, 30, 200]],
];
for (const [label, ax, el, dist, fov, look] of VIEWS) {
  await page.evaluate(({ ax, el, dist, fov, look }) => {
    const ctx = window.__ctx;
    const p = ctx.cars[0].car.body.position;
    const cam = ctx.camera;
    const a = ax * Math.PI / 180, e = el * Math.PI / 180;
    cam.aspect = window.innerWidth / window.innerHeight;
    cam.fov = fov; cam.updateProjectionMatrix();
    cam.position.set(p.x, p.y + 12, p.z);
    cam.lookAt(p.x + look[0], look[1], p.z + look[2]);
    ctx.composer.render();
  }, { ax, el, dist, fov, look });
  await page.waitForTimeout(120);
  await page.screenshot({ path: `/tmp/scene-${label}.png` });
}
console.log('done');
await browser.close();
