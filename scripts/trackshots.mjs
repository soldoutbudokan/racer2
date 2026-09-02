// Per-track screenshot set: for each circuit, pick it, start time-trial, drive
// N seconds with the AI, then shoot chase / high / aerial / horizon views.
//   node trackshots.mjs <outPrefix> [driveSecs] [ids,comma,separated]
import { chromium } from 'playwright-core';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const CHROME = process.env.CHROME_EXE ||
  execSync('find /opt/pw-browsers -maxdepth 3 -name chrome -type f | head -1').toString().trim();
const out = process.argv[2] || '/tmp/ts';
const driveSecs = parseFloat(process.argv[3] || '8');
const onlyIds = process.argv[4] ? process.argv[4].split(',') : null;
const extraDrives = (process.env.DRIVES || '').split(',').filter(Boolean).map(Number);

const browser = await chromium.launch({
  executablePath: CHROME, headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
await page.goto('http://localhost:5173/', { waitUntil: 'load' });
await page.waitForFunction(() => window.__trackIds && window.__ctx, { timeout: 60000 });
const ids = await page.evaluate(() => window.__trackIds);

for (const id of ids) {
  if (onlyIds && !onlyIds.includes(id)) continue;
  // Go through the menu exactly like a player: ESC to the menu, pick the
  // circuit card, start a time trial (one car), then freeze the loop.
  await page.evaluate(() => {
    const ctx = window.__ctx;
    if (ctx.mode) document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
    const ui = document.getElementById('ui'); if (ui) ui.style.display = '';
  });
  await page.waitForTimeout(250);
  await page.evaluate((id) => document.querySelector(`.track-card[data-track="${id}"]`).click(), id);
  await page.waitForTimeout(400);
  await page.evaluate(() => document.querySelector('button.mode[data-mode="time-trial"]').click());
  await page.waitForFunction(() => window.__ctx.cars.length > 0, { timeout: 30000 });
  await page.waitForTimeout(800);
  await page.evaluate(() => {
    const ctx = window.__ctx;
    ctx.mode = null;
    const ui = document.getElementById('ui');
    if (ui) ui.style.display = 'none';
  });
  // Spawn a single player car on the grid and drive it.
  const drives = [driveSecs, ...extraDrives];
  for (const secs of drives) {
    await page.evaluate((secs) => {
      const ctx = window.__ctx;
      const c = ctx.cars[0];
      const sp = window.__gridSpawn(ctx.track, 0);
      c.car.reset(sp.position, sp.yaw);
      ctx.world.step(1 / 120);
      const drv = window.__createAIDriver(ctx.track, { skill: 0.82 });
      const dt = 1 / 120;
      const steps = Math.floor(secs * 120);
      for (let s = 0; s < steps; s++) {
        const cmd = drv.update(c.car, [], dt);
        c.car.applyControls(cmd, dt, ['road', 'road', 'road', 'road']);
        ctx.world.step(dt);
      }
      c.car.update();
      if (ctx.updateShadowTarget) ctx.updateShadowTarget(c.car.body.position);
      ctx.composer.passes.forEach((p) => { if (p.uniforms && p.uniforms.uTime) p.uniforms.uTime.value = 0; });
    }, secs);

    const VIEWS = [
      ['chase', 7.5, 2.6, 0, 62, 6],
      ['high', 14, 9, 6, 55, 5],
      ['trackside', 2, 1.6, 12, 45, 0],
    ];
    const tag = secs === driveSecs ? '' : `-t${secs}`;
    for (const [label, back, h, latr, fov, lookAhead] of VIEWS) {
      await page.evaluate(({ back, h, latr, fov, lookAhead }) => {
        const ctx = window.__ctx;
        const body = ctx.cars[0].car.body;
        const q = body.quaternion;
        const fx = 2 * (q.x * q.z + q.w * q.y);
        const fz = 1 - 2 * (q.x * q.x + q.y * q.y);
        const len = Math.hypot(fx, fz) || 1;
        const f = { x: fx / len, z: fz / len };
        const left = { x: -f.z, z: f.x };
        const cam = ctx.camera;
        cam.aspect = window.innerWidth / window.innerHeight;
        cam.fov = fov; cam.updateProjectionMatrix();
        cam.position.set(body.position.x - f.x * back + left.x * latr, body.position.y + h,
          body.position.z - f.z * back + left.z * latr);
        cam.lookAt(body.position.x + f.x * lookAhead, body.position.y + 0.5, body.position.z + f.z * lookAhead);
        ctx.composer.render();
      }, { back, h, latr, fov, lookAhead });
      await page.waitForTimeout(100);
      await page.screenshot({ path: `${out}-${id}${tag}-${label}.png`, timeout: 120000 });
    }
  }
  // Aerial: whole circuit from above, plus a low oblique panorama.
  const AER = [
    ['aerial', 0, 900, 0.001, 50],
    ['oblique', -500, 220, 500, 55],
  ];
  for (const [label, dx, dy, dz, fov] of AER) {
    await page.evaluate(({ dx, dy, dz, fov }) => {
      const ctx = window.__ctx;
      const fr = ctx.track.frames;
      let cx = 0, cz = 0;
      for (const f of fr) { cx += f.pos.x; cz += f.pos.z; }
      cx /= fr.length; cz /= fr.length;
      const cam = ctx.camera;
      cam.fov = fov; cam.updateProjectionMatrix();
      cam.position.set(cx + dx, dy, cz + dz);
      cam.lookAt(cx, 0, cz);
      ctx.composer.render();
    }, { dx, dy, dz, fov });
    await page.waitForTimeout(100);
    await page.screenshot({ path: `${out}-${id}-${label}.png`, timeout: 120000 });
  }
  console.log('shot', id);
}
console.log('errors:', errors.length ? errors.slice(0, 8) : 'none');
await browser.close();
