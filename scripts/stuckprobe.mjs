// What does an AI driver actually *command* when it is standing still?
//
// Every existing gate and shooter measures positions, which is why a driver
// that selects reverse for the wrong reason is so easy to miss: the car ends
// up roughly where you expected it and nothing looks wrong in a screenshot.
// This probe reads the commands frame by frame through three standstills that
// look identical from outside the car and should NOT be treated identically:
//
//   held    — pinned on the racing line with clear road ahead (a bogged start,
//             a queue, a car being held). Backing out of this is wrong.
//   wedged  — nose into the armco out in the runoff. Backing out is right, and
//             it should stop backing out once it is free.
//   behind  — wedged, but with another car parked in the space it would
//             reverse into. Backing out is wrong until that car moves.
//
//   node scripts/stuckprobe.mjs [outJson]
import { chromium } from 'playwright-core';
import { execSync } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';

function findChrome() {
  if (process.env.CHROME_EXE && existsSync(process.env.CHROME_EXE)) return process.env.CHROME_EXE;
  try {
    const out = execSync(
      'find ~/.cache/puppeteer/chrome /root/.cache/puppeteer/chrome -maxdepth 3 -name chrome -type f 2>/dev/null | head -1',
      { shell: '/bin/bash' }).toString().trim();
    if (out && existsSync(out)) return out;
  } catch { /* fall through */ }
  throw new Error('No Chrome binary found — set CHROME_EXE');
}

const outJson = process.argv[2] || '';

const browser = await chromium.launch({
  executablePath: findChrome(), headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 640, height: 480 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
await page.goto('http://localhost:5173/', { waitUntil: 'load' });
await page.waitForSelector('button.mode[data-mode="quick-race"]', { timeout: 20000 });
await page.click('button.mode[data-mode="quick-race"]');
await page.waitForTimeout(1200);
await page.evaluate(() => { window.__ctx.mode = null; });  // stop rAF stepping the race

const res = await page.evaluate(() => {
  const ctx = window.__ctx;
  const world = ctx.world;
  const frames = ctx.track.frames;
  const wall = ctx.track.armcoOffset;
  const ROAD = ['road', 'road', 'road', 'road'];
  const GRAVEL = ['gravel', 'gravel', 'gravel', 'gravel'];
  const dt = 1 / 120;
  const HZ = 120;

  const ai = ctx.cars.filter((c) => !c.isPlayer);
  const me = ai[0];
  const spare = ai[1];
  const others = ai.map((c) => c.car);

  // Park everything that is not part of the scenario a long way away, and give
  // the subject a FRESH driver — the recovery timers are per-driver state and
  // would otherwise leak from one scenario into the next.
  const stow = (c, k) => c.car.reset({ x: 2000 + k * 40, y: 1, z: -2000 }, 0);
  const IDLE = { throttle: 0, brake: 0, steer: 0, handbrake: true };
  const reset = () => {
    ctx.cars.forEach((c, k) => { if (c !== me) stow(c, k); });
    me.ai = window.__createAIDriver(ctx.track, { skill: 0.85 });
  };
  // Let the suspension settle without the driver touching anything.
  const settle = () => {
    for (let i = 0; i < 30; i++) { me.car.applyControls(IDLE, dt, ROAD); world.step(dt); }
    me.car.update();
  };

  // The scenarios all sit at one frame; measure lateral offset against THAT
  // frame rather than the nearest one, which flips to a different part of the
  // circuit as soon as the car is out in the runoff and makes the trace jump.
  const HOME = 200;
  const hf = frames[HOME];

  // Place a car `lat` metres left of the centreline at frame `fi`, pointing
  // either along the track (`aim` 0) or `aim` of the way around toward the
  // left-hand wall (`aim` −1 = the right-hand wall). Built from the frame's
  // own basis so there is no sign convention to get wrong.
  const place = (car, fi, lat, aim) => {
    const f = frames[fi % frames.length];
    const dx = f.tan.x * (1 - Math.abs(aim)) + f.left.x * aim;
    const dz = f.tan.z * (1 - Math.abs(aim)) + f.left.z * aim;
    car.reset({
      x: f.pos.x + f.left.x * lat,
      y: f.pos.y + 0.70,
      z: f.pos.z + f.left.z * lat,
    }, Math.atan2(dx, dz));
  };
  const latOf = (car) => {
    const p = car.body.position;
    return (p.x - hf.pos.x) * hf.left.x + (p.z - hf.pos.z) * hf.left.z;
  };

  // Run `secs` of driver + physics, recording the command stream.
  // `pin` freezes the car in place each step (a bogged/held standstill).
  const run = (secs, { pin = false, surf = ROAD } = {}) => {
    const home = {
      p: { ...me.car.body.position },
      q: { ...me.car.body.quaternion },
    };
    const log = { firstReverseS: null, maxBrake: 0, everGearR: false, samples: [] };
    const steps = Math.round(secs * HZ);
    for (let s = 0; s < steps; s++) {
      const cmd = me.ai.update(me.car, others, dt);
      if (cmd.brake > log.maxBrake) log.maxBrake = cmd.brake;
      if (cmd.brake > 0.9 && cmd.throttle === 0 && log.firstReverseS === null) {
        log.firstReverseS = +(s / HZ).toFixed(3);
      }
      me.car.applyControls(cmd, dt, surf);
      world.step(dt);
      me.car.update();
      if (me.car.telemetry.gearLabel === 'R') log.everGearR = true;
      if (pin) {
        me.car.body.position.set(home.p.x, home.p.y, home.p.z);
        me.car.body.quaternion.set(home.q.x, home.q.y, home.q.z, home.q.w);
        me.car.body.velocity.set(0, 0, 0);
        me.car.body.angularVelocity.set(0, 0, 0);
      }
      if (s % 30 === 0) {
        log.samples.push({
          t: +(s / HZ).toFixed(2),
          thr: +cmd.throttle.toFixed(2),
          brk: +cmd.brake.toFixed(2),
          gear: me.car.telemetry.gearLabel,
          lat: +latOf(me.car).toFixed(2),
          spd: +Math.hypot(me.car.body.velocity.x, me.car.body.velocity.z).toFixed(2),
          rev: +(me.ai.recovery ? me.ai.recovery.reverseT : -1).toFixed(2),
        });
      }
    }
    return log;
  };

  const out = {};

  // --- 1. held on the racing line, clear road ahead ---------------------
  reset();
  place(me.car, HOME, 0, 0);
  settle();
  out.held = run(5.0, { pin: true });

  // --- 2. wedged nose-first into the armco ------------------------------
  reset();
  place(me.car, HOME, wall - 3.2, 0.90);       // out in the runoff, aimed at the wall
  settle();
  out.wedgedLatStart = +latOf(me.car).toFixed(2);
  out.wedged = run(4.0, { surf: ROAD });
  out.wedgedLatEnd = +latOf(me.car).toFixed(2);

  // --- 3. wedged, with a car parked in the space behind ------------------
  reset();
  place(me.car, HOME, wall - 3.2, 0.90);
  settle();
  // 5.2 m directly behind (just clear of the bodywork), along this car’s heading.
  {
    const q = me.car.body.quaternion;
    const fx = 2 * (q.x * q.z + q.w * q.y);
    const fz = 1 - 2 * (q.x * q.x + q.y * q.y);
    const L = Math.hypot(fx, fz) || 1;
    const p = me.car.body.position;
    spare.car.reset(
      { x: p.x - (fx / L) * 5.2, y: p.y, z: p.z - (fz / L) * 5.2 },
      Math.atan2(fx, fz));
  }
  out.behind = run(3.0, { surf: ROAD });

  out.armcoOffset = +wall.toFixed(2);
  return out;
});

const fmt = (k, r) => {
  console.log(`\n[${k}]  first reverse command: ${r.firstReverseS === null ? 'never' : r.firstReverseS + ' s'}`
    + `   max brake ${r.maxBrake.toFixed(2)}   ever in gear R: ${r.everGearR}`);
  for (const s of r.samples) {
    console.log(`   t=${String(s.t).padStart(5)}  thr=${String(s.thr).padStart(4)}`
      + `  brk=${String(s.brk).padStart(4)}  gear=${String(s.gear).padStart(2)}`
      + `  lat=${String(s.lat).padStart(7)}  spd=${String(s.spd).padStart(6)}  reverseT=${s.rev}`);
  }
};

console.log(`armco at ±${res.armcoOffset} m from the centreline`);
fmt('held on the racing line', res.held);
fmt('wedged into the armco', res.wedged);
console.log(`   lateral offset ${res.wedgedLatStart} → ${res.wedgedLatEnd} m`);
fmt('wedged with a car behind', res.behind);
console.log('\nerrors:', errors.length ? errors.slice(0, 3).join(' | ') : 'none');

if (outJson) {
  writeFileSync(outJson, JSON.stringify(res, null, 2));
  console.log('wrote', outJson);
}
await browser.close();
