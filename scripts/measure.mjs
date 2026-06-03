import { chromium } from 'playwright-core';
const EXE = process.env.HOME +
  '/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/' +
  'Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const browser = await chromium.launch({ executablePath: EXE, headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
await page.goto('http://localhost:5173/', { waitUntil: 'load' });
await page.waitForSelector('button.mode[data-mode="time-trial"]');
await page.waitForTimeout(400);
await page.click('button.mode[data-mode="time-trial"]');
await page.waitForTimeout(2500);
const data = await page.evaluate(() => {
  const ctx = window.__ctx;
  const car = ctx.cars[0].car;
  const root = car.visual.root;
  const rp = root.position;
  const wheels = car.visual.wheels.map((w) => ({
    x: +w.position.x.toFixed(3), y: +w.position.y.toFixed(3), z: +w.position.z.toFixed(3),
    localY: +(w.position.y - rp.y).toFixed(3),
  }));
  return {
    rootPos: { x: +rp.x.toFixed(3), y: +rp.y.toFixed(3), z: +rp.z.toFixed(3) },
    wheels,
    groundLocalY: +(0 - rp.y).toFixed(3),  // world ground y=0 in root-local space
  };
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
