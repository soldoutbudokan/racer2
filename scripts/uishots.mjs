// Menu, HUD and finish-screen screenshots, through the UI like a player.
//   node scripts/uishots.mjs <outPrefix> [trackId]
// Needs `vite preview` (or dev) on :5173. Pumps the game with window.__tick and
// skips rendering while it does, so a SwiftShader run takes seconds, not minutes.
import { chromium } from 'playwright-core';
import { execSync } from 'node:child_process';

const CHROME = process.env.CHROME_EXE ||
  execSync('find /opt/pw-browsers -maxdepth 3 -name chrome -type f | head -1').toString().trim();
const out = process.argv[2] || '/tmp/ui';
const trackId = process.argv[3] || null;
const URL = process.env.GAME_URL || 'http://localhost:5173/';

const browser = await chromium.launch({
  executablePath: CHROME, headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'],
});
const errors = [];
async function openPage(width, height) {
  const page = await browser.newPage({ viewport: { width, height } });
  page.setDefaultTimeout(120000);
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
  await page.goto(URL, { waitUntil: 'load' });
  await page.waitForFunction(() => window.__ctx && !document.getElementById('menu').classList.contains('hidden'));
  await page.waitForFunction(() => getComputedStyle(document.getElementById('loading')).opacity === '0');
  if (trackId) {
    await page.evaluate((id) => document.querySelector(`.track-card[data-track="${id}"]`).click(), trackId);
    await page.waitForFunction((id) => window.__ctx.selectedTrackId === id, trackId);
    await page.waitForTimeout(300);
  }
  return page;
}

// Pump the simulation without rendering, then render one frame.
async function pump(page, secs, keys = []) {
  for (const k of keys) await page.keyboard.down(k);
  await page.evaluate((secs) => {
    const ctx = window.__ctx;
    const render = ctx.composer.render, direct = ctx.renderer.render;
    ctx.composer.render = () => {};
    ctx.renderer.render = () => {};
    const dt = 1 / 60;
    for (let i = 0; i < Math.round(secs * 60); i++) window.__tick(dt);
    ctx.composer.render = render;
    ctx.renderer.render = direct;
  }, secs);
  for (const k of keys) await page.keyboard.up(k);
}
async function freezeAndRender(page) {
  await page.evaluate(() => {
    const ctx = window.__ctx;
    window.__tick(1 / 60);
    ctx.__savedMode = ctx.mode; // keep HUD, stop rAF loop from advancing
    ctx.mode = null;
    ctx.composer.render();
  });
}
async function thaw(page) {
  await page.evaluate(() => { const ctx = window.__ctx; ctx.mode = ctx.__savedMode; });
}

// ---- Menus at three sizes ----
for (const [w, h, tag] of [[1366, 768, 'laptop'], [1920, 1080, 'desktop'], [390, 844, 'phone']]) {
  const page = await openPage(w, h);
  await page.screenshot({ path: `${out}-menu-${tag}.png` });
  if (tag === 'phone') await page.screenshot({ path: `${out}-menu-${tag}-full.png`, fullPage: true });
  await page.close();
}

// ---- Race HUD ----
{
  const page = await openPage(1366, 768);
  await page.evaluate(() => document.querySelector('button.mode[data-mode="quick-race"]').click());
  await page.waitForFunction(() => window.__ctx.cars.length > 0);
  // Lights: three columns lit.
  await pump(page, 2.3);
  await freezeAndRender(page);
  await page.screenshot({ path: `${out}-race-lights.png` });
  await thaw(page);
  await pump(page, 2.2);
  await pump(page, 5.5, ['KeyW']);
  await freezeAndRender(page);
  await page.screenshot({ path: `${out}-race-chase.png` });
  await thaw(page);
  // Hood + cinematic cameras.
  await page.keyboard.press('KeyC');
  await pump(page, 1.0, ['KeyW']);
  await freezeAndRender(page);
  await page.screenshot({ path: `${out}-race-cam2.png` });
  await thaw(page);
  await page.keyboard.press('KeyC');
  await pump(page, 1.5, ['KeyW']);
  await freezeAndRender(page);
  await page.screenshot({ path: `${out}-race-cam3.png` });
  // Finish: one rival has already taken the flag, then the player crosses
  // the line on the final lap and the game raises its own results screen.
  await thaw(page);
  await page.evaluate(() => {
    const ctx = window.__ctx, fr = ctx.track.frames;
    const rival = ctx.cars[1];
    Object.assign(rival.state, { finished: true, finishMs: 221840, bestMs: 71204 });
    ctx.state.finishOrder.push(rival);
    rival.state.progress = ctx.state.totalLaps + 100;
    const me = ctx.cars[0];
    Object.assign(me.state, { lap: ctx.state.totalLaps, sectorReached: true, lastT: 0.95, bestMs: 71866 });
    me.state.raceStart = performance.now() - 223512;
    const f = fr[fr.length - 6];
    me.car.reset({ x: f.pos.x, y: 0.7, z: f.pos.z }, Math.atan2(f.tan.x, f.tan.z));
    me.car.body.velocity.set(f.tan.x * 30, 0, f.tan.z * 30);
  });
  await pump(page, 1.2, ['KeyW']);
  await freezeAndRender(page);
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${out}-finish.png` });
  await page.close();
}

// ---- Phone HUD ----
{
  const page = await openPage(844, 390);
  await page.evaluate(() => document.querySelector('button.mode[data-mode="time-trial"]').click());
  await page.waitForFunction(() => window.__ctx.cars.length > 0);
  await pump(page, 4.4);
  await pump(page, 4, ['KeyW']);
  await freezeAndRender(page);
  await page.screenshot({ path: `${out}-race-phone-landscape.png` });
  await page.close();
}

// ---- Split screen ----
{
  const page = await openPage(1366, 768);
  await page.evaluate(() => document.querySelector('button.mode[data-mode="two-player"]').click());
  await page.waitForFunction(() => window.__ctx.cars.length > 0);
  await pump(page, 4.4);
  await pump(page, 3, ['KeyW', 'ArrowUp']);
  await page.evaluate(() => { window.__tick(1 / 60); window.__ctx.mode = null; });
  await page.screenshot({ path: `${out}-race-split.png` });
  await page.close();
}

console.log('errors:', errors.length ? errors.slice(0, 8) : 'none');
await browser.close();
