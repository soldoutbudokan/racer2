// Stance probe: where does the painted shell actually sit relative to the
// wheels and the road?
//
//   node scripts/rideheight.mjs [driveSecs]
//
// The visual body is a rigid child of the sprung chassis at a constant
// `BODY_DROP`, while the wheels are raycast and live at their own hub heights,
// so the body-to-wheel relationship is only correct at ONE suspension
// compression. This reports it in both poses that matter:
//   * grid   — the frame after a reset, suspension still at full droop
//   * settled — after the car has been driving, i.e. the pose it holds all race
// and prints, per car, the hub offset, the authored body ground plane, and the
// lowest painted geometry, all in world y (road surface sits at ~0.01).
//
// A body-frame ground plane far off 0 means the shell is sunk into (or floating
// over) the asphalt for the whole race — see the 2026-07-28 Changelog entry.
import { chromium } from 'playwright-core';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

function findChrome() {
  if (process.env.CHROME_EXE && existsSync(process.env.CHROME_EXE)) return process.env.CHROME_EXE;
  const out = execSync(
    'find /opt/pw-browsers ~/.cache/puppeteer/chrome -maxdepth 3 -name chrome -type f 2>/dev/null | head -1',
    { shell: '/bin/bash' }).toString().trim();
  if (out && existsSync(out)) return out;
  throw new Error('No Chrome binary found — set CHROME_EXE');
}

const driveSecs = parseFloat(process.argv[2] || '5');

const browser = await chromium.launch({
  executablePath: findChrome(), headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 900, height: 650 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
await page.goto('http://localhost:5173/', { waitUntil: 'load' });
await page.waitForSelector('button.mode[data-mode="quick-race"]', { timeout: 20000 });
await page.click('button.mode[data-mode="quick-race"]');
await page.waitForTimeout(1500);

// The probe itself. Runs in the page; `WHEEL_R` must match car.js.
const PROBE = `(() => {
  const WHEEL_R = 0.36;
  const ctx = window.__ctx;
  return ctx.cars.map((cc, i) => {
    const car = cc.car;
    const root = car.visual.root;
    const body = root.children.find((c) => c.type === 'Group');
    root.updateMatrixWorld(true);
    const hubs = car.visual.wheels.map((w) => w.position.y);
    const meanHub = hubs.reduce((a, b) => a + b, 0) / hubs.length;
    let low = Infinity, lowName = '';
    body.traverse((o) => {
      if (!o.isMesh || !o.geometry) return;
      if (!o.geometry.boundingBox) o.geometry.computeBoundingBox();
      const bb = o.geometry.boundingBox.clone().applyMatrix4(o.matrixWorld);
      if (bb.min.y < low) { low = bb.min.y; lowName = o.name || o.material?.name || 'mesh'; }
    });
    const r = (v) => Math.round(v * 1e4) / 1e4;
    return {
      car: i,
      chassisY: r(root.position.y),
      hubY: r(meanHub),
      hubLocalY: r(meanHub - root.position.y),   // == BODY_DROP when correct
      bodyDrop: r(body.position.y),
      tyreBottomY: r(meanHub - WHEEL_R),          // the real road plane
      // The body frame is authored with the wheel centre at y 0 and the ground
      // at -0.36, so this is where the author's ground plane ends up:
      authoredGroundY: r(root.position.y + body.position.y - WHEEL_R),
      lowestPaintedY: r(low),
      lowestPart: lowName,
    };
  });
})()`;

function table(rows) {
  const cols = Object.keys(rows[0]);
  const w = cols.map((c) => Math.max(c.length, ...rows.map((r) => String(r[c]).length)));
  const line = (vals) => vals.map((v, i) => String(v).padStart(w[i])).join('  ');
  console.log(line(cols));
  rows.forEach((r) => console.log(line(cols.map((c) => r[c]))));
}

const grid = await page.evaluate(PROBE);
console.log('--- on the grid (just spawned) ---');
table(grid);

await page.evaluate((secs) => {
  const ctx = window.__ctx;
  ctx.mode = null;
  const drv = window.__createAIDriver(ctx.track, { skill: 0.82 });
  const dt = 1 / 120;
  const aiCars = ctx.cars.map((c) => c.car);
  for (let s = 0; s < Math.floor(secs * 120); s++) {
    for (const c of ctx.cars) {
      const cmd = c.isPlayer ? drv.update(c.car, aiCars, dt) : c.ai.update(c.car, aiCars, dt);
      c.car.applyControls(cmd, dt, ['road', 'road', 'road', 'road']);
    }
    ctx.world.step(dt);
  }
  for (const c of ctx.cars) c.car.update();
}, driveSecs);

const settled = await page.evaluate(PROBE);
console.log(`\n--- settled (${driveSecs}s of driving; road surface y ~0.01) ---`);
table(settled);

const off = settled[0].authoredGroundY - settled[0].tyreBottomY;
console.log(`\nauthored ground vs tyre contact patch: ${(off * 100).toFixed(1)} cm ` +
  `(negative = shell sunk into the road)`);
if (errors.length) console.log('\nconsole errors:\n' + errors.join('\n'));
await browser.close();
