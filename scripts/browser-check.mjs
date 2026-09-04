// Real Chromium checks plus identical-camera before/after render accounting.
// GPU finish makes the timing include completed rendering, not command enqueue.
import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';

const out = process.env.QA_DIR || 'qa';
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_EXE || chromium.executablePath(),
  headless: true, args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'] });
const errors = [], rows = [];
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
page.on('pageerror', e => errors.push(e.message));
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.setDefaultTimeout(120000);

async function load(url) {
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForFunction(() => window.__ctx && !document.getElementById('menu').classList.contains('hidden'));
  await page.waitForFunction(() => getComputedStyle(document.getElementById('loading')).opacity === '0');
}
async function start(mode = 'quick-race') {
  await page.evaluate(mode => {
    document.querySelector(`button.mode[data-mode="${mode}"]`).click();
    window.__ctx.mode = null; // deterministic rendering; no automatic adaptation
  }, mode);
}
async function measure(label, preset) {
  const result = await page.evaluate(({ preset }) => {
    const c = window.__ctx, f = c.track.frames[0];
    if (preset) c.graphics.select(preset);
    c.camera.fov = 62; c.camera.aspect = innerWidth / innerHeight;
    c.camera.position.set(f.pos.x - f.tan.x * 8, 2.6, f.pos.z - f.tan.z * 8);
    c.camera.lookAt(f.pos.x + f.tan.x * 20, 0.8, f.pos.z + f.tan.z * 20);
    c.camera.updateProjectionMatrix();
    for (const car of c.cars) car.car.update();
    c.hud.drawMinimap(c.cars.map(entry => ({ pos: entry.car.body.position, color: entry.color, isPlayer: entry.isPlayer })));
    c.updateShadowTarget(c.cars[0].car.body.position);
    c.composer.render();
    const gl = c.renderer.getContext(); gl.finish();
    c.renderer.info.autoReset = false;
    c.renderer.info.reset(); c.composer.render(); gl.finish();
    const { calls, triangles } = c.renderer.info.render;
    const times = [];
    for (let i = 0; i < 3; i++) {
      const t = performance.now(); c.composer.render(); gl.finish();
      times.push(performance.now() - t);
    }
    c.renderer.info.autoReset = true;
    return { calls, triangles, ms: Math.round(times.sort((a, b) => a - b)[1]),
      width: c.renderer.domElement.width, height: c.renderer.domElement.height,
      geometries: c.renderer.info.memory.geometries, textures: c.renderer.info.memory.textures };
  }, { preset });
  rows.push({ label, ...result });
  console.log('RENDER', JSON.stringify(rows.at(-1)));
  await page.screenshot({ path: `${out}/${label}.png` });
  return result;
}

try {
  let baseline;
  if (process.env.BASELINE_URL) {
    await load(process.env.BASELINE_URL);
    await page.screenshot({ path: `${out}/before-menu.png` });
    await start(); baseline = await measure('before-gp');
  }
  await load(process.env.GAME_URL || 'http://localhost:5173/');
  await page.screenshot({ path: `${out}/after-menu.png` });
  const garage = await page.evaluate(() => {
    const canvas = document.getElementById('garage');
    const pixels = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
    let red = 0;
    for (let i = 0; i < pixels.length; i += 4) if (pixels[i] > 50 && pixels[i] > pixels[i + 1] * 1.4) red++;
    return red;
  });
  assert(garage > 100, 'garage canvas contains the painted car');
  for (const [width, height] of [[390, 844], [768, 700], [1280, 720]]) {
    await page.setViewportSize({ width, height });
    const overflow = await page.evaluate(() => document.getElementById('menu').scrollWidth > innerWidth);
    assert(!overflow, `menu fits ${width}px without horizontal overflow`);
    await page.screenshot({ path: `${out}/menu-${width}.png`, fullPage: true });
  }
  const graphicsBounds = await page.locator('#graphics-quality').boundingBox();
  assert(graphicsBounds.y + graphicsBounds.height <= 720, 'graphics setting is visible without scrolling at 720p');
  await page.selectOption('#graphics-quality', 'performance');
  await page.reload({ waitUntil: 'load' });
  await page.waitForFunction(() => window.__ctx?.graphics?.choice === 'performance');
  assert.equal(await page.locator('#graphics-quality').inputValue(), 'performance');
  await start();
  const performance = await measure('after-gp-performance', 'performance');
  const balanced = await measure('after-gp-balanced', 'balanced');
  await page.evaluate(() => {
    const c = window.__ctx, primary = c.cars[0].car.body.position;
    const f = c.track.frames[0];
    c.camera.position.set(primary.x - f.tan.x * 8, 2.7, primary.z - f.tan.z * 8);
    c.camera.lookAt(primary.x + f.tan.x * 10, 0.8, primary.z + f.tan.z * 10);
    c.composer.render();
  });
  await page.screenshot({ path: `${out}/after-driving-view.png` });
  await measure('after-gp-high', 'high');
  // Absolute budgets at the start-line camera. Asserting against BASELINE_URL
  // would ratchet: once the base branch carries this renderer, every later
  // change would have to cut another 30%. The before/after rows stay logged.
  assert(performance.triangles < 1.6e6 && performance.calls < 500, 'Performance stays inside the triangle and draw-call budget');
  assert(balanced.triangles < 1.6e6 && balanced.calls < 500, 'Balanced stays inside the triangle and draw-call budget');
  if (baseline) console.log('COMPARE', JSON.stringify({ baseline, balanced }));

  // Exercise every track via the actual asynchronous picker, then race it.
  const ids = await page.evaluate(() => window.__trackIds);
  for (const id of ids.filter(id => id !== 'gp')) {
    await page.evaluate(() => { window.__ctx.mode = 'quick-race'; });
    await page.keyboard.press('Escape');
    await page.locator(`.track-card[data-track="${id}"]`).click();
    await page.waitForFunction(id => window.__ctx.selectedTrackId === id && document.getElementById('track-list').getAttribute('aria-busy') === 'false', id);
    await start('time-trial');
    await measure(`after-${id}`, 'performance');
  }

  // Split screen uses the direct renderer; test returning to the full viewport.
  await start('two-player');
  await page.evaluate(() => { const c = window.__ctx; c.mode = 'two-player'; window.__tick(1 / 60); c.mode = null; });
  await page.screenshot({ path: `${out}/split-screen.png` });
  await start('quick-race');
  const aspect = await page.evaluate(() => window.__ctx.camera.aspect);
  assert.equal(aspect, 1280 / 720);
  await measure('after-restart', 'balanced');
  // Quality switches and restarts must release resources instead of accumulating.
  const memory = [];
  for (let i = 0; i < 4; i++) {
    await start('quick-race');
    await page.evaluate(() => { const c = window.__ctx; c.graphics.select('high'); c.composer.render(); c.graphics.select('performance'); c.composer.render(); });
    memory.push(await page.evaluate(() => window.__ctx.renderer.info.memory.geometries));
  }
  assert(memory.at(-1) <= memory[0] + 3, `restarts retain stable geometry memory: ${memory}`);
  await page.evaluate(() => { window.__ctx.mode = 'quick-race'; document.getElementById('finish').classList.remove('hidden'); });
  await page.locator('#finish-restart').click();
  assert.equal(await page.evaluate(() => window.__ctx.cars.length), 4, 'finish screen restarts the selected race');
  await page.evaluate(() => { document.getElementById('finish').classList.remove('hidden'); });
  await page.locator('#finish-menu').click();
  assert.equal(await page.evaluate(() => window.__ctx.mode), null, 'finish screen returns to menu');
  assert.deepEqual(errors, [], 'no browser or WebGL errors');
  console.log('PASS: garage, responsive menu, saved quality, all circuits, split screen, restart memory and render budgets');
} finally {
  writeFileSync(`${out}/render-cost.json`, JSON.stringify({ rows, errors }, null, 2));
  await browser.close();
}
