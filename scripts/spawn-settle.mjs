// Spawn-transient probe: how far does the field fall onto the grid, and for
// how long?
//
//   node scripts/spawn-settle.mjs [secs]
//
// A car placed above its settled ride height starts with the springs at full
// droop, drops, and bounces — visible at the start of every race and after
// every rescue. This resets the field to the grid, then steps the physics
// world by hand (no driver input at all) and reports, per frame, how far the
// chassis has moved from where it was put down and where the tyre contact
// patch is relative to the road.
//
// A correct spawn is one where `drop` never exceeds a few millimetres: the
// suspension compression the raycast measures on step 1 is already the one
// that balances the car's weight, so nothing moves. See ROUTINE.md.
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

const secs = parseFloat(process.argv[2] || '1.5');

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

const out = await page.evaluate((n) => {
  const WHEEL_R = 0.36;
  const ctx = window.__ctx;
  ctx.mode = null;                       // stop the render loop driving anything
  const cars = ctx.cars.map((c) => c.car);
  // Put the field back on the grid exactly as a race start does.
  const spawns = cars.map((car, i) => {
    const sp = window.__gridSpawn(ctx.track, i);
    car.reset(sp.position, sp.yaw);
    return sp.position.y;
  });
  const dt = 1 / 120;
  const samples = [];
  const steps = Math.floor(n * 120);
  let worstDrop = 0, worstRise = 0, heldFrom = null;
  for (let s = 0; s <= steps; s++) {
    const car = cars[0];
    const dy = car.body.position.y - spawns[0];
    if (dy < worstDrop) worstDrop = dy;
    if (dy > worstRise) worstRise = dy;
    // First moment the car is holding the height it was PUT at (not merely
    // holding some height — a dropped car is also still after it stops
    // bouncing, 32 cm lower than where you placed it).
    if (heldFrom === null && s > 0 && Math.abs(car.body.velocity.y) < 0.01 &&
        Math.abs(dy) < 0.005) heldFrom = s / 120;
    if (s % 12 === 0 && s <= 120) {
      car.update();
      const hubs = car.visual.wheels.map((w) => w.position.y);
      const meanHub = hubs.reduce((a, b) => a + b, 0) / hubs.length;
      samples.push({
        t: Math.round((s / 120) * 1000) / 1000,
        chassisY: Math.round(car.body.position.y * 1e4) / 1e4,
        dropCm: Math.round(dy * 1e3) / 10,
        vy: Math.round(car.body.velocity.y * 1e3) / 1e3,
        tyreY: Math.round((meanHub - WHEEL_R) * 1e4) / 1e4,
      });
    }
    if (s < steps) ctx.world.step(dt);
  }
  // Where every car ended up, so a per-car regression can't hide behind car 0.
  const finals = cars.map((car, i) => Math.round((car.body.position.y - spawns[i]) * 1e3) / 10);
  return {
    spawnY: Math.round(spawns[0] * 1e4) / 1e4,
    worstDropCm: Math.round(worstDrop * 1e3) / 10,
    worstRiseCm: Math.round(worstRise * 1e3) / 10,
    heldFrom, samples, finals,
  };
}, secs);

console.log(`spawned chassis at y ${out.spawnY}`);
const cols = ['t', 'chassisY', 'dropCm', 'vy', 'tyreY'];
const w = cols.map((c) => Math.max(c.length, ...out.samples.map((r) => String(r[c]).length)));
const line = (v) => v.map((x, i) => String(x).padStart(w[i])).join('  ');
console.log(line(cols));
out.samples.forEach((r) => console.log(line(cols.map((c) => r[c]))));
console.log(`\nworst drop  ${out.worstDropCm} cm     worst rise ${out.worstRiseCm} cm`);
console.log(`held its spawn height from  ${out.heldFrom === null
  ? 'never — it did not stay where it was put' : out.heldFrom.toFixed(3) + ' s'}`);
console.log(`per-car net movement (cm): ${out.finals.join(', ')}`);
if (errors.length) console.log('\nconsole errors:\n' + errors.join('\n'));
await browser.close();
