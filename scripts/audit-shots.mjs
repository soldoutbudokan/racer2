// Per-track audit screenshots: for each track, select it in the menu, start a
// time trial, freeze the loop, then capture (a) a top-down overview, (b)
// on-course chase views at several lap fractions, (c) an outward horizon shot.
//   node audit-shots.mjs <outDir> [trackId ...]
import { chromium } from 'playwright-core';
import { existsSync, mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';

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
page.setDefaultTimeout(120000);
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
await page.goto(process.env.GAME_URL || 'http://localhost:5173/', { waitUntil: 'load' });
await page.waitForFunction(() => window.__ctx?.track && document.querySelector('.track-card') &&
  getComputedStyle(document.getElementById('loading')).opacity === '0');
// Same fixed quality on both revisions; adaptive scaling would otherwise
// compare software-renderer load rather than the authored scene.
await page.evaluate(() => {
  const select = document.getElementById('graphics-quality');
  if (select) { select.value = 'high'; select.dispatchEvent(new Event('change', { bubbles: true })); }
});

const ids = await page.evaluate(() =>
  [...document.querySelectorAll('.track-card')].map((b) => b.dataset.track));

for (const id of ids) {
  if (ONLY.length && !ONLY.includes(id)) continue;
  // back to menu if in a mode (restore the UI we hid, click via DOM so the
  // canvas can't intercept the pointer)
  await page.evaluate(() => {
    const ctx = window.__ctx;
    // The loop is deliberately frozen with mode=null after each capture;
    // the finish-menu handler still performs the full car/track cleanup.
    if (ctx.cars.length) document.getElementById('finish-menu').click();
    const ui = document.getElementById('ui');
    if (ui) ui.style.display = '';
  });
  await page.evaluate((id) =>
    document.querySelector(`.track-card[data-track="${id}"]`).click(), id);
  await page.waitForFunction(id => {
    const card = document.querySelector(`.track-card[data-track="${id}"]`);
    return window.__ctx.track.id === id && card.classList.contains('selected') &&
      card.parentElement.getAttribute('aria-busy') !== 'true' &&
      !document.querySelector('button.mode[data-mode="time-trial"]').disabled;
  }, id);
  await page.evaluate(() =>
    document.querySelector('button.mode[data-mode="time-trial"]').click());
  await page.waitForFunction(() => window.__ctx.mode === 'time-trial' && window.__ctx.cars.length === 1);
  await page.evaluate(() => {
    const ctx = window.__ctx;
    ctx.mode = null;                          // freeze game loop
    const car = ctx.cars[0].car, spawn = window.__gridSpawn(ctx.track, 0);
    car.reset(spawn.position, spawn.yaw);
    for (let i = 0; i < 90; i++) {
      car.applyControls({ throttle: 0, brake: 1, steer: 0, handbrake: true }, 1 / 120);
      ctx.world.step(1 / 120);
    }
    car.update();
    ctx.updateShadowTarget?.(car.body.position);
    ctx.composer.passes.forEach(pass => { if (pass.uniforms?.uTime) pass.uniforms.uTime.value = 0; });
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
    await page.screenshot({ path: `${OUT}/${id}-course${Math.round(frac * 100)}.png` });
  }
  if (id === 'downtown') {
    for (const [label, position, target] of [
      ['harbour', [878, 45, 168], [818, 1, 43]],
      ['yacht', [835, 8, 10], [824, 1, 42]],
    ]) {
      await page.evaluate(({ position, target }) => {
        const ctx = window.__ctx;
        ctx.camera.fov = 55;
        ctx.camera.position.set(...position); ctx.camera.lookAt(...target);
        ctx.camera.updateProjectionMatrix(); ctx.composer.render();
      }, { position, target });
      await page.screenshot({ path: `${OUT}/${id}-${label}.png` });
    }
  }
  console.log('shot', id);
}
console.log('errors:', errors.length ? errors.slice(0, 8) : 'none');
await browser.close();
assert.deepEqual(errors, [], 'all circuits render without browser or WebGL errors');
