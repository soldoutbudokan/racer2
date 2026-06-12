// Deterministic driving-model test: freeze the render loop and step the
// physics directly so render speed can't skew sim time. Verifies the
// realistic driving model: acceleration through the gears, a drag-limited
// top speed, braking distances, cornering that sheds speed, grass penalty,
// and that the AI can still lap the circuit.
//
// Chrome binary resolution: $CHROME_EXE, then puppeteer's cache, then the
// old mac playwright path.
import { chromium } from 'playwright-core';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

function findChrome() {
  if (process.env.CHROME_EXE && existsSync(process.env.CHROME_EXE)) return process.env.CHROME_EXE;
  try {
    const out = execSync(
      'find ~/.cache/puppeteer/chrome /root/.cache/puppeteer/chrome -maxdepth 3 -name chrome -type f 2>/dev/null | head -1',
      { shell: '/bin/bash' }).toString().trim();
    if (out && existsSync(out)) return out;
  } catch { /* fall through */ }
  const mac = process.env.HOME + '/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
  if (existsSync(mac)) return mac;
  throw new Error('No Chrome binary found — set CHROME_EXE');
}

const b = await chromium.launch({
  executablePath: findChrome(), headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'],
});
const page = await b.newPage({ viewport: { width: 640, height: 480 } });
const errs = [];
page.on('pageerror', (e) => errs.push(e.message));
page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
await page.goto('http://localhost:5173/', { waitUntil: 'load' });
await page.waitForFunction(() => !!window.__ctx, { timeout: 20000 });

let pass = 0, fail = 0;
const ck = (n, ok, d = '') => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${n}${d ? '  — ' + d : ''}`); ok ? pass++ : fail++; };

async function startMode(mode) {
  await page.waitForSelector(`button.mode[data-mode="${mode}"]`);
  await page.evaluate((m) => document.querySelector(`button.mode[data-mode="${m}"]`).click(), mode);
  await page.waitForTimeout(600);
  await page.evaluate(() => { window.__ctx.mode = null; }); // stop rAF from stepping
}

// ---------- Single-car driving model ----------
await startMode('time-trial');
const dm = await page.evaluate(() => {
  const ctx = window.__ctx;
  const world = ctx.world;
  const me = ctx.cars[0].car;
  const ROAD = ['road', 'road', 'road', 'road'];
  const GRASS = ['grass', 'grass', 'grass', 'grass'];
  const dt = 1 / 120;
  const speed = () => Math.hypot(me.body.velocity.x, me.body.velocity.z) * 3.6;
  const yawOf = () => { const q = me.body.quaternion; return Math.atan2(2 * (q.x * q.z + q.w * q.y), 1 - 2 * (q.x * q.x + q.y * q.y)); };
  const drive = (ctrl, steps, surf = ROAD) => {
    for (let i = 0; i < steps; i++) {
      me.applyControls(ctrl, dt, surf);
      world.step(dt);
    }
  };

  // Teleport to open ground so straight-line runs don't meet the armco.
  const tp = (x, z, yaw = 0) => {
    me.reset({ x, y: 1.0, z }, yaw);
    drive({ throttle: 0, brake: 0, steer: 0, handbrake: false }, 90);
  };

  // 1. settle
  tp(1500, -1800);
  const contacts = me.vehicle.wheelInfos.filter((w) => w.isInContact).length;
  const settleY = me.body.position.y;

  // 2. acceleration: 8 s flat out
  const p0 = { x: me.body.position.x, z: me.body.position.z };
  drive({ throttle: 1, brake: 0, steer: 0, handbrake: false }, 8 * 120);
  const accel8s = speed();
  const accelDist = Math.hypot(me.body.position.x - p0.x, me.body.position.z - p0.z);
  const gearAt8s = me.telemetry.gearLabel;

  // 3. top speed: keep going 32 more seconds
  drive({ throttle: 1, brake: 0, steer: 0, handbrake: false }, 32 * 120);
  const vmax = speed();

  // 4. braking from speed: full brake to <5 km/h
  tp(-1500, -1800);
  drive({ throttle: 1, brake: 0, steer: 0, handbrake: false }, 9 * 120);
  const vBrake = speed();
  const bp = { x: me.body.position.x, z: me.body.position.z };
  let brakeSteps = 0;
  while (speed() > 5 && brakeSteps < 12 * 120) {
    drive({ throttle: 0, brake: 1, steer: 0, handbrake: false }, 1);
    brakeSteps++;
  }
  const brakeDist = Math.hypot(me.body.position.x - bp.x, me.body.position.z - bp.z);
  const brakeDecel = (vBrake / 3.6) ** 2 / (2 * Math.max(1, brakeDist));

  // 5. cornering sheds speed: ~150 km/h, full lock, no throttle, 3 s
  tp(1500, 0);
  drive({ throttle: 1, brake: 0, steer: 0, handbrake: false }, 8 * 120);
  const cornerEntry = speed();
  const yaw0 = yawOf();
  drive({ throttle: 0, brake: 0, steer: 1, handbrake: false }, 3 * 120);
  const cornerExit = speed();
  let dyaw = Math.abs(yawOf() - yaw0); if (dyaw > Math.PI) dyaw = 2 * Math.PI - dyaw;
  const cornerLoss = cornerEntry - cornerExit;

  // 6. cornering hard cuts acceleration (friction circle): full throttle for
  // 4 s straight vs. 4 s at full lock, from the same entry speed.
  tp(-1500, -300);
  drive({ throttle: 1, brake: 0, steer: 0, handbrake: false }, 6 * 120);
  const sEntry = speed();
  drive({ throttle: 1, brake: 0, steer: 0, handbrake: false }, 4 * 120);
  const straightGain = speed() - sEntry;
  tp(-1500, 600);
  drive({ throttle: 1, brake: 0, steer: 0, handbrake: false }, 6 * 120);
  const pwrEntry = speed();
  drive({ throttle: 1, brake: 0, steer: 1, handbrake: false }, 4 * 120);
  const pwrExit = speed();
  const cornerGain = pwrExit - pwrEntry;

  // 7. grass penalty: coast from ~110 km/h on grass vs road
  const accelTo = (kmh) => {
    let guard = 0;
    while (speed() < kmh && guard++ < 20 * 120) {
      drive({ throttle: 1, brake: 0, steer: 0, handbrake: false }, 1);
    }
  };
  tp(0, -1800);
  accelTo(110);
  const g0 = speed();
  drive({ throttle: 0, brake: 0, steer: 0, handbrake: false }, 4 * 120, GRASS);
  const grassLoss = g0 - speed();
  tp(300, -1800);
  accelTo(110);
  const r0 = speed();
  drive({ throttle: 0, brake: 0, steer: 0, handbrake: false }, 4 * 120, ROAD);
  const roadLoss = r0 - speed();

  // 8. reverse works
  tp(600, -1800);
  drive({ throttle: 0, brake: 1, steer: 0, handbrake: false }, 3 * 120);
  const revSpeed = (() => { const q = me.body.quaternion; const fx = 2 * (q.x * q.z + q.w * q.y); const fz = 1 - 2 * (q.x * q.x + q.y * q.y); const v = me.body.velocity; return v.x * fx + v.z * fz; })();

  return {
    contacts, settleY: +settleY.toFixed(2),
    accel8s: +accel8s.toFixed(1), accelDist: +accelDist.toFixed(0), gearAt8s,
    vmax: +vmax.toFixed(1),
    vBrake: +vBrake.toFixed(1), brakeDist: +brakeDist.toFixed(1), brakeDecel: +brakeDecel.toFixed(2),
    cornerEntry: +cornerEntry.toFixed(1), cornerExit: +cornerExit.toFixed(1),
    cornerLoss: +cornerLoss.toFixed(1), cornerYawDeg: +(dyaw * 180 / Math.PI).toFixed(0),
    straightGain: +straightGain.toFixed(1), cornerGain: +cornerGain.toFixed(1),
    pwrEntry: +pwrEntry.toFixed(1), pwrExit: +pwrExit.toFixed(1),
    grassLoss: +grassLoss.toFixed(1), roadLoss: +roadLoss.toFixed(1),
    revSpeed: +revSpeed.toFixed(2),
  };
});
console.log('driving-model:', JSON.stringify(dm));
ck('car settles on its wheels', dm.contacts === 4 && dm.settleY > 0.3 && dm.settleY < 1.6, `contacts=${dm.contacts} y=${dm.settleY}`);
ck('accelerates hard through the gears', dm.accel8s > 140 && dm.accelDist > 180, `${dm.accel8s} km/h in 8s over ${dm.accelDist} m (gear ${dm.gearAt8s})`);
ck('drag-limited top speed 250–310 km/h', dm.vmax > 250 && dm.vmax < 310, `${dm.vmax} km/h`);
ck('braking ≥ 0.9 g from speed', dm.brakeDecel > 8.8, `${dm.vBrake} km/h → 5 km/h in ${dm.brakeDist} m (${dm.brakeDecel} m/s²)`);
ck('hard cornering sheds speed', dm.cornerLoss > 20 && dm.cornerYawDeg > 45, `${dm.cornerEntry} → ${dm.cornerExit} km/h while turning ${dm.cornerYawDeg}°`);
ck('cornering hard cuts acceleration', dm.cornerGain < dm.straightGain * 0.6 && dm.cornerGain < dm.straightGain - 8,
  `straight +${dm.straightGain} vs full-lock +${dm.cornerGain} km/h over 4s (from ${dm.pwrEntry} km/h)`);
ck('grass is much draggier than road', dm.grassLoss - dm.roadLoss > 9 && dm.grassLoss > 18, `grass −${dm.grassLoss} vs road −${dm.roadLoss} km/h over 4s`);
ck('reverse works', dm.revSpeed < -1, `${dm.revSpeed} m/s`);

// ---------- AI sanity on the real circuit ----------
await startMode('quick-race');
const qr = await page.evaluate(() => {
  const ctx = window.__ctx;
  const world = ctx.world;
  const dt = 1 / 120;
  const frames = ctx.track.frames;
  const nearest = (p) => {
    let bi = 0, bd = Infinity;
    for (let i = 0; i < frames.length; i++) {
      const dx = frames[i].pos.x - p.x, dz = frames[i].pos.z - p.z;
      const d = dx * dx + dz * dz;
      if (d < bd) { bd = d; bi = i; }
    }
    return { i: bi, d: Math.sqrt(bd) };
  };
  const ROAD = ['road', 'road', 'road', 'road'];
  const ai = ctx.cars.filter((c) => !c.isPlayer);
  // Park the (undriven) player car far away so the AI aren't ramming a
  // stationary obstacle on the grid.
  const player = ctx.cars.find((c) => c.isPlayer);
  if (player) player.car.reset({ x: 1500, y: 1, z: -1500 }, 0);
  // Accumulate progress (handles full laps; nearest-frame alone is mod-lap).
  const lastIdx = ai.map((c) => nearest(c.car.body.position).i);
  const total = ai.map(() => 0);
  let maxDev = 0;
  const steps = 45 * 120;
  const aiCars = ai.map((c) => c.car);
  for (let s = 0; s < steps; s++) {
    for (const c of ai) {
      const cmd = c.ai.update(c.car, aiCars, dt);
      c.car.applyControls(cmd, dt, ROAD);
    }
    world.step(dt);
    if (s % 30 === 0) {
      for (let k = 0; k < ai.length; k++) {
        const { i, d } = nearest(ai[k].car.body.position);
        if (d > maxDev) maxDev = d;
        let adv = i - lastIdx[k];
        if (adv < -frames.length / 2) adv += frames.length;
        if (adv > frames.length / 2) adv -= frames.length;
        total[k] += adv;
        lastIdx[k] = i;
      }
    }
  }
  const progressed = total.map((t) => Math.round(t / frames.length * 100)); // % of laps
  return { nCars: ctx.cars.length, progressed, maxDev: +maxDev.toFixed(1) };
});
console.log('quick-race:', JSON.stringify(qr));
ck('quick-race spawns 4 cars', qr.nCars === 4, `${qr.nCars}`);
ck('AI completes ≥ 60% of a lap in 45 s', qr.progressed.every((p) => p > 60), `progress=${qr.progressed.join(',')}%`);
ck('AI stays inside the circuit', qr.maxDev < 16, `max centreline deviation ${qr.maxDev} m`);

// ---------- Barrier containment ----------
// Launch the car at the armco from the centreline at ~275 km/h, at many spots
// around the lap, alternating sides and angles of attack. This is RAW wall
// containment — the game-loop out-of-bounds failsafe is not running here.
await startMode('time-trial');
const bar = await page.evaluate(() => {
  const ctx = window.__ctx;
  const world = ctx.world;
  const me = ctx.cars[0].car;
  const frames = ctx.track.frames;
  const dt = 1 / 120;
  const ROAD = ['road', 'road', 'road', 'road'];
  const latAt = (p) => {
    let bi = 0, bd = Infinity;
    for (let i = 0; i < frames.length; i++) {
      const dx = frames[i].pos.x - p.x, dz = frames[i].pos.z - p.z;
      const d = dx * dx + dz * dz;
      if (d < bd) { bd = d; bi = i; }
    }
    const f = frames[bi];
    return Math.abs((p.x - f.pos.x) * f.left.x + (p.z - f.pos.z) * f.left.z);
  };
  let maxLat = 0, minY = 1;
  const N = frames.length;
  const RUNS = 18;
  for (let s = 0; s < RUNS; s++) {
    const f = frames[Math.floor(s * N / RUNS)];
    const sign = s % 2 ? 1 : -1;
    const skew = ((s % 3) - 1) * 0.6;          // −0.6 / 0 / +0.6 rad off-normal
    const aim = Math.atan2(f.left.x, f.left.z) + (sign < 0 ? Math.PI : 0) + skew;
    me.reset({ x: f.pos.x, y: 0.7, z: f.pos.z }, aim);
    me.body.velocity.set(Math.sin(aim) * 76, 0, Math.cos(aim) * 76);
    for (let t = 0; t < 2.5 * 120; t++) {
      me.applyControls({ throttle: 1, brake: 0, steer: 0, handbrake: false }, dt, ROAD);
      world.step(dt);
      const lat = latAt(me.body.position);
      if (lat > maxLat) maxLat = lat;
      if (me.body.position.y < minY) minY = me.body.position.y;
    }
  }
  return { armco: ctx.track.armcoOffset, maxLat: +maxLat.toFixed(1), minY: +minY.toFixed(1) };
});
console.log('barriers:', JSON.stringify(bar));
ck('walls contain 275 km/h impacts at every angle', bar.maxLat < bar.armco + 2,
  `max lateral ${bar.maxLat} m vs armco at ${bar.armco} m`);
ck('car never falls through the world', bar.minY > -1, `minY=${bar.minY}`);

// ---------- Single-lap time trial + perfect-line aid ----------
// Headless Chrome throttles rAF, so drive the real game loop deterministically
// through the __tick pump instead of waiting on wall-clock time.
await startMode('time-trial');
const ttSetup = await page.evaluate(() => ({
  totalLaps: window.__ctx.state.totalLaps,
  lapTotalHud: document.getElementById('lap-total').textContent,
  lineVisible: window.__ctx.racingLine.mesh.visible,
}));
const tt = await page.evaluate(() => {
  const ctx = window.__ctx;
  ctx.mode = 'time-trial';
  const frames = ctx.track.frames;
  const car = ctx.cars[0].car;
  const pump = (steps) => { for (let i = 0; i < steps; i++) window.__tick(1 / 60); };
  // Touch the mid-lap sector checkpoint…
  const fm = frames[Math.floor(frames.length / 2)];
  car.reset({ x: fm.pos.x, y: 0.7, z: fm.pos.z }, Math.atan2(fm.tan.x, fm.tan.z));
  pump(20);
  // …then roll across the start/finish line.
  const f = frames[frames.length - 10];
  car.reset({ x: f.pos.x, y: 0.7, z: f.pos.z }, Math.atan2(f.tan.x, f.tan.z));
  car.body.velocity.set(f.tan.x * 22, 0, f.tan.z * 22);
  pump(3 * 60);
  const out = {
    finished: ctx.cars[0].state.finished,
    overlayShown: !document.getElementById('finish').classList.contains('hidden'),
    paceShown: !document.getElementById('pace-pill').classList.contains('hidden'),
  };
  ctx.mode = null;
  return out;
});
console.log('time-trial:', JSON.stringify({ ...ttSetup, ...tt }));
ck('time trial is a single lap', ttSetup.totalLaps === 1 && ttSetup.lapTotalHud === '1',
  `totalLaps=${ttSetup.totalLaps} hud=${ttSetup.lapTotalHud}`);
ck('crossing the line once finishes the time trial', tt.finished && tt.overlayShown,
  `finished=${tt.finished} overlay=${tt.overlayShown}`);
ck('racing line + pace aid active in time trial', ttSetup.lineVisible && tt.paceShown,
  `line=${ttSetup.lineVisible} pace=${tt.paceShown}`);

// ---------- Racing-line speed profile sanity ----------
const rl = await page.evaluate(() => {
  const p = window.__ctx.racingLine.profile;
  let mn = Infinity, mx = 0;
  for (let i = 0; i < p.length; i++) { if (p[i] < mn) mn = p[i]; if (p[i] > mx) mx = p[i]; }
  return { minKmh: +(mn * 3.6).toFixed(0), maxKmh: +(mx * 3.6).toFixed(0) };
});
console.log('racing-line:', JSON.stringify(rl));
ck('ideal-speed profile is sane', rl.minKmh > 40 && rl.minKmh < 140 && rl.maxKmh > 180 && rl.maxKmh <= 260,
  `corners down to ${rl.minKmh} km/h, straights up to ${rl.maxKmh} km/h`);

// Quick race keeps 3 laps; split-screen hides the aid.
await startMode('quick-race');
const qrLaps = await page.evaluate(() => window.__ctx.state.totalLaps);
ck('quick race is still 3 laps', qrLaps === 3, `totalLaps=${qrLaps}`);
await startMode('two-player');
const tpLine = await page.evaluate(() => window.__ctx.racingLine.mesh.visible);
ck('racing line hidden in split-screen', tpLine === false, `visible=${tpLine}`);

ck('no console errors', errs.length === 0, errs.slice(0, 3).join(' | ') || 'clean');
console.log(`\n${pass} passed, ${fail} failed`);
await b.close();
process.exit(fail ? 1 : 0);
