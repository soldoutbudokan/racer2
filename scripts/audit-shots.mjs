// Per-track audit screenshots: for each track, select it in the menu, start a
// time trial, freeze the loop, then capture (a) a top-down overview, (b)
// on-course chase views at several lap fractions, (c) an outward horizon shot.
//   node audit-shots.mjs <outDir> [trackId ...]
import { chromium } from 'playwright-core';
import { existsSync, mkdirSync } from 'node:fs';

// CHROME_EXE first, like every other shooter — this script had only the macOS
// path, so it could not run on the routine's Linux container at all.
const EXE = (process.env.CHROME_EXE && existsSync(process.env.CHROME_EXE))
  ? process.env.CHROME_EXE
  : process.env.HOME +
    '/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/' +
    'Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
if (!existsSync(EXE)) throw new Error('chromium not found: ' + EXE);

const OUT = process.argv[2] || '/tmp/audit';
mkdirSync(OUT, { recursive: true });
const ONLY = process.argv.slice(3);

const browser = await chromium.launch({ executablePath: EXE, headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
await page.goto('http://localhost:5173/', { waitUntil: 'load' });
await page.waitForSelector('.track-card');

const ids = await page.evaluate(() =>
  [...document.querySelectorAll('.track-card')].map((b) => b.dataset.track));

for (const id of ids) {
  if (ONLY.length && !ONLY.includes(id)) continue;
  // back to menu if in a mode (restore the UI we hid, click via DOM so the
  // canvas can't intercept the pointer)
  await page.evaluate(() => {
    const ctx = window.__ctx;
    if (ctx.mode) document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
    const ui = document.getElementById('ui');
    if (ui) ui.style.display = '';
  });
  await page.waitForTimeout(300);
  await page.evaluate((id) =>
    document.querySelector(`.track-card[data-track="${id}"]`).click(), id);
  await page.waitForTimeout(1200);            // rebuild track
  await page.evaluate(() =>
    document.querySelector('button.mode[data-mode="time-trial"]').click());
  await page.waitForTimeout(2000);
  await page.evaluate(() => {
    window.__ctx.mode = null;                 // freeze game loop
    const ui = document.getElementById('ui');
    if (ui) ui.style.display = 'none';
    const hud = document.getElementById('hud');
    if (hud) hud.style.display = 'none';
  });

  // (a) top-down overview of the whole circuit
  await page.evaluate(() => {
    const ctx = window.__ctx;
    const fr = ctx.track.frames;
    let minX = 1e9, maxX = -1e9, minZ = 1e9, maxZ = -1e9;
    for (const f of fr) {
      minX = Math.min(minX, f.pos.x); maxX = Math.max(maxX, f.pos.x);
      minZ = Math.min(minZ, f.pos.z); maxZ = Math.max(maxZ, f.pos.z);
    }
    const cx = (minX + maxX) / 2, cz = (minZ + maxZ) / 2;
    const span = Math.max(maxX - minX, maxZ - minZ);
    const cam = ctx.camera;
    cam.fov = 55; cam.aspect = innerWidth / innerHeight;
    cam.position.set(cx, span * 1.25, cz + 1);
    cam.lookAt(cx, 0, cz);
    cam.updateProjectionMatrix();
    ctx.composer.render();
  });
  await page.waitForTimeout(150);
  await page.screenshot({ path: `${OUT}/${id}-overview.png` });

  // (b) oblique three-quarter aerial (shows building/stand heights vs road)
  await page.evaluate(() => {
    const ctx = window.__ctx;
    const fr = ctx.track.frames;
    let minX = 1e9, maxX = -1e9, minZ = 1e9, maxZ = -1e9;
    for (const f of fr) {
      minX = Math.min(minX, f.pos.x); maxX = Math.max(maxX, f.pos.x);
      minZ = Math.min(minZ, f.pos.z); maxZ = Math.max(maxZ, f.pos.z);
    }
    const cx = (minX + maxX) / 2, cz = (minZ + maxZ) / 2;
    const span = Math.max(maxX - minX, maxZ - minZ);
    const cam = ctx.camera;
    cam.fov = 55;
    cam.position.set(cx + span * 0.9, span * 0.7, cz + span * 0.9);
    cam.lookAt(cx, 0, cz);
    cam.updateProjectionMatrix();
    ctx.composer.render();
  });
  await page.waitForTimeout(150);
  await page.screenshot({ path: `${OUT}/${id}-oblique.png` });

  // (c) on-course chase views at lap fractions
  for (const frac of [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9]) {
    await page.evaluate((frac) => {
      const ctx = window.__ctx;
      const fr = ctx.track.frames;
      const i = Math.floor(frac * fr.length) % fr.length;
      const f = fr[i];
      const cam = ctx.camera;
      cam.fov = 62;
      cam.position.set(f.pos.x - f.tan.x * 8, 3.0, f.pos.z - f.tan.z * 8);
      cam.lookAt(f.pos.x + f.tan.x * 18, 0.8, f.pos.z + f.tan.z * 18);
      cam.updateProjectionMatrix();
      ctx.composer.render();
    }, frac);
    await page.waitForTimeout(120);
    await page.screenshot({ path: `${OUT}/${id}-course${Math.round(frac * 100)}.png` });
  }
}
console.log('errors:', errors.length ? errors.slice(0, 8) : 'none');
await browser.close();
