// Sound probe. Two halves:
//
//   1. TRACE — drives the player car through a scripted sequence (idle,
//      launch through the gears, lift-off, a full-brake stop, a hard corner,
//      then kerb / grass / gravel with the surfaces forced) with the physics
//      stepped by hand and `audio.update` called every 60 Hz frame exactly as
//      the game loop does, and prints the computed sound parameters per
//      quarter second: firing frequency, filter cutoff, engine gain, squeal
//      (with its three sources), rumble rate, wind, surface gains, pops, clunks.
//   2. RENDER — builds the same graph on an OfflineAudioContext, holds a car at
//      a fixed RPM and throttle, renders a few seconds, and measures the
//      result: RMS level, and the spectral line at the firing frequency
//      (rpm/60 · cylinders/2) — the check that the engine really is at the
//      flywheel's pitch and not merely parameterised to be. Also renders an AI
//      voice near and far to prove the panner path attenuates, and a muted run.
//
//   node scripts/audioprobe.mjs                 # both halves
//   AUDIO_WAV=/tmp/aud node scripts/audioprobe.mjs   # also write the renders as WAVs to listen to
//
// Needs `npm run dev` on :5173. No audio device is needed: the trace reads
// parameters, the render is offline.
import { chromium } from 'playwright-core';
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';

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

const wavDir = process.env.AUDIO_WAV || '';
const b = await chromium.launch({
  executablePath: findChrome(), headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox',
    '--autoplay-policy=no-user-gesture-required'],
});
const page = await b.newPage({ viewport: { width: 640, height: 480 } });
const errs = [];
page.on('pageerror', (e) => errs.push(e.message));
page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
await page.goto('http://localhost:5173/', { waitUntil: 'load' });
await page.waitForFunction(() => !!window.__ctx, { timeout: 20000 });
await page.click('button.mode[data-mode="time-trial"]');
await page.waitForTimeout(600);
await page.evaluate(() => { window.__ctx.mode = null; });

// ---------------------------------------------------------------- 1. TRACE
const trace = await page.evaluate(() => {
  const ctx = window.__ctx;
  const world = ctx.world;
  const entry = ctx.cars[0];
  const me = entry.car;
  const audio = ctx.audio;
  const dt = 1 / 120;
  const ROAD = ['road', 'road', 'road', 'road'];
  const rows = [];
  let t = 0, frame = 0;
  const speed = () => Math.hypot(me.body.velocity.x, me.body.velocity.z);
  const run = (label, ctrl, secs, surf = ROAD) => {
    const steps = Math.round(secs * 120);
    for (let i = 0; i < steps; i++) {
      me.applyControls(ctrl, dt, surf);
      world.step(dt);
      t += dt;
      if (++frame % 2 === 0) {
        me.update();
        entry.chase.update(2 * dt, me.body, speed() * 3.6);
        audio.update(2 * dt, { camera: ctx.camera });
        if (frame % 30 === 0) {
          const d = audio.debug.cars[0];
          rows.push({
            t: +t.toFixed(2), label, kmh: +(speed() * 3.6).toFixed(0), gear: d.gear,
            rpm: Math.round(d.rpm), load: +d.load.toFixed(2), fFire: +d.fFire.toFixed(1),
            cutoff: Math.round(d.cutoff), gain: +d.gain.toFixed(2),
            squeal: +d.squeal.toFixed(2), slide: +d.slide.toFixed(2), corner: +d.corner.toFixed(2),
            alpha: +d.slipAngle.toFixed(2), spin: +d.spin.toFixed(2),
            rumble: +d.rumble.toFixed(2), rumbleHz: +d.rumbleHz.toFixed(1),
            grass: +d.grass.toFixed(2), gravel: +d.gravel.toFixed(2),
            wind: +d.wind.toFixed(2), roar: +d.roar.toFixed(2),
            pops: d.pops, bangs: d.bangs, clunks: d.clunks, hits: d.hits,
          });
        }
      }
    }
  };
  // Open ground, the same spot physics-test uses, so nothing meets the armco.
  me.reset({ x: 1500, y: 1.0, z: -1800 }, 0);
  run('settle', { throttle: 0, brake: 0, steer: 0, handbrake: false }, 0.75);
  run('idle', { throttle: 0, brake: 0, steer: 0, handbrake: false }, 1.0);
  run('launch', { throttle: 1, brake: 0, steer: 0, handbrake: false }, 8.0);
  run('lift', { throttle: 0, brake: 0, steer: 0, handbrake: false }, 1.5);
  run('brake', { throttle: 0, brake: 1, steer: 0, handbrake: false }, 4.0);
  me.reset({ x: 1500, y: 1.0, z: 0 }, 0);
  run('settle2', { throttle: 0, brake: 0, steer: 0, handbrake: false }, 0.5);
  run('build', { throttle: 1, brake: 0, steer: 0, handbrake: false }, 5.0);
  run('corner', { throttle: 0.3, brake: 0, steer: 1, handbrake: false }, 3.0);
  run('handbrake', { throttle: 0, brake: 0, steer: 1, handbrake: true }, 1.5);
  me.reset({ x: -1500, y: 1.0, z: -1800 }, 0);
  run('settle3', { throttle: 0, brake: 0, steer: 0, handbrake: false }, 0.5);
  run('build2', { throttle: 1, brake: 0, steer: 0, handbrake: false }, 4.0);
  run('kerb', { throttle: 0.5, brake: 0, steer: 0, handbrake: false }, 2.0, ['kerb', 'kerb', 'road', 'road']);
  run('grass', { throttle: 0.5, brake: 0, steer: 0, handbrake: false }, 2.0, ['grass', 'grass', 'grass', 'grass']);
  run('gravel', { throttle: 0.5, brake: 0, steer: 0, handbrake: false }, 2.0, ['gravel', 'gravel', 'gravel', 'gravel']);
  return { rows, state: audio.debug.state(), muted: audio.muted, available: audio.available };
});

console.log(`audio: available=${trace.available} state=${trace.state} muted=${trace.muted}`);
console.log('    t  phase      kmh g   rpm load  fFire cutoff gain | squeal corner slide alpha spin | rumble   Hz grass gravel wind roar | pops bangs clunks hits');
for (const r of trace.rows) {
  console.log(
    `${r.t.toFixed(2).padStart(5)}  ${r.label.padEnd(9)} ${String(r.kmh).padStart(4)} ${r.gear} ${String(r.rpm).padStart(5)} ${r.load.toFixed(2)} ${r.fFire.toFixed(1).padStart(6)} ${String(r.cutoff).padStart(6)} ${r.gain.toFixed(2)} | ${r.squeal.toFixed(2).padStart(6)} ${r.corner.toFixed(2).padStart(6)} ${r.slide.toFixed(2).padStart(5)} ${r.alpha.toFixed(2).padStart(5)} ${r.spin.toFixed(2).padStart(4)} | ${r.rumble.toFixed(2).padStart(6)} ${r.rumbleHz.toFixed(1).padStart(5)} ${r.grass.toFixed(2).padStart(5)} ${r.gravel.toFixed(2).padStart(6)} ${r.wind.toFixed(2)} ${r.roar.toFixed(2)} | ${String(r.pops).padStart(4)} ${String(r.bangs).padStart(5)} ${String(r.clunks).padStart(6)} ${String(r.hits).padStart(4)}`);
}

// ------------------------------------------------------- 1b. QUICK RACE
// The AI voices in a real four-car race: 45 s stepped the way viewshot does
// (AI + physics + chase camera + audio.update, no rendering — pumping __tick
// would render every frame through SwiftShader), the player driven by an AI
// driver so it is in the traffic. Then per car: how often its tyres were
// squealing, its shifts / bangs / hits, and the distance and Doppler range
// the listener saw it over. A field that squeals through most of a lap would
// be a bad signal mapping, not racing.
await page.evaluate(() => document.querySelector('button.mode[data-mode="quick-race"]').click());
await page.waitForTimeout(600);
const race = await page.evaluate(() => {
  const ctx = window.__ctx;
  ctx.mode = null;
  const a = ctx.audio;
  const n = ctx.cars.length;
  const acc = ctx.cars.map(() => ({ frames: 0, squealing: 0, loud: 0, loadSum: 0, minDist: 1e9, maxDist: 0, dopMin: 9, dopMax: 0, corner: 0, slide: 0, alpha: 0, spin: 0, useMax: 0 }));
  const playerDriver = window.__createAIDriver(ctx.track, { skill: 0.82 });
  const allCars = ctx.cars.map((c) => c.car);
  const dt = 1 / 120;
  const ROAD = ['road', 'road', 'road', 'road'];
  for (let s = 0; s < 45 * 120; s++) {
    for (const c of ctx.cars) {
      const cmd = c.isPlayer ? playerDriver.update(c.car, allCars, dt) : c.ai.update(c.car, allCars, dt);
      c.car.applyControls(cmd, dt, ROAD);
    }
    ctx.world.step(dt);
    if (s % 2) continue;
    for (const c of ctx.cars) c.car.update();
    const p = ctx.cars[0];
    p.chase.update(2 * dt, p.car.body, Math.hypot(p.car.body.velocity.x, p.car.body.velocity.z) * 3.6);
    a.update(2 * dt, { camera: ctx.camera });
    for (let i = 0; i < n; i++) {
      const d = a.debug.cars[i], q = acc[i];
      q.frames++;
      if (d.squeal > 0.3) q.squealing++;
      if (d.squeal > 0.7) q.loud++;
      if (d.corner > 0.3) q.corner++;
      if (d.slideTerm > 0.3) q.slide++;
      if (d.alphaTerm > 0.3) q.alpha++;
      if (d.spin > 0.3) q.spin++;
      q.useMax = Math.max(q.useMax, d.cornerUse);
      q.loadSum += d.load;
      if (d.distance != null) { q.minDist = Math.min(q.minDist, d.distance); q.maxDist = Math.max(q.maxDist, d.distance); }
      if (d.doppler != null) { q.dopMin = Math.min(q.dopMin, d.doppler); q.dopMax = Math.max(q.dopMax, d.doppler); }
    }
  }
  return acc.map((q, i) => {
    const d = a.debug.cars[i];
    return { label: d.label, arch: d.archetype, squealPct: +(100 * q.squealing / q.frames).toFixed(1), loudPct: +(100 * q.loud / q.frames).toFixed(1),
      terms: `corner ${(100 * q.corner / q.frames).toFixed(0)}% slide ${(100 * q.slide / q.frames).toFixed(0)}% alpha ${(100 * q.alpha / q.frames).toFixed(0)}% spin ${(100 * q.spin / q.frames).toFixed(0)}% (peak grip use ${q.useMax.toFixed(2)})`,
      meanLoad: +(q.loadSum / q.frames).toFixed(2), clunks: d.clunks, bangs: d.bangs, pops: d.pops, hits: d.hits,
      dist: d.distance == null ? null : `${q.minDist.toFixed(0)}–${q.maxDist.toFixed(0)} m`, doppler: d.doppler == null ? null : `${q.dopMin.toFixed(3)}–${q.dopMax.toFixed(3)}` };
  });
});
console.log('\nQuick race, 45 s under the game loop:');
for (const r of race) console.log(`  ${r.label.padEnd(3)} ${r.arch.padEnd(10)} squeal>0.3 ${String(r.squealPct).padStart(5)}%  >0.7 ${String(r.loudPct).padStart(5)}%  mean load ${r.meanLoad}  shifts ${r.clunks} bangs ${r.bangs} pops ${r.pops} hits ${r.hits}${r.dist ? `  dist ${r.dist}  doppler ${r.doppler}` : ''}\n      terms>0.3: ${r.terms}`);
await page.evaluate(() => document.querySelector('button.mode[data-mode="time-trial"]').click());
await page.waitForTimeout(600);
await page.evaluate(() => { window.__ctx.mode = null; });

// --------------------------------------------------------------- 2. RENDER
const render = await page.evaluate(async (wantWav) => {
  const THREE = window.__THREE;
  const SR = 48000;
  const fakeCar = (archetype, rpm, load, pos, vel) => ({
    archetype,
    spec: { idleRpm: 1100, redlineRpm: 7600 },
    telemetry: { engineRpm: rpm, rpm, throttle: load, slip: 0, gear: 3,
      surfaces: ['road', 'road', 'road', 'road'] },
    body: {
      position: { x: pos[0], y: pos[1], z: pos[2] },
      velocity: { x: vel[0], y: vel[1], z: vel[2] },
      quaternion: { x: 0, y: 0, z: 0, w: 1 },
      addEventListener() {}, removeEventListener() {},
    },
    vehicle: { wheelInfos: [0, 1, 2, 3].map(() => ({ skidInfo: 1, raycastResult: { body: true } })) },
  });
  const camera = { position: new THREE.Vector3(0, 1.5, 0), quaternion: new THREE.Quaternion() };

  // Render `secs` of one car (and optionally a second, AI, car) and return the
  // mono mix of the LAST `tail` seconds.
  async function renderCase({ archetype = 'gt', rpm, load, secs = 4, tail = 2, isPlayer = true,
    pos = [0, 0.5, -3], vel = [0, 0, 0], muted = false, dt = 1 / 60 }) {
    const ctx = new OfflineAudioContext(2, Math.round(SR * secs), SR);
    const audio = window.__createAudio({ context: ctx, virtualClock: true });
    if (muted) audio.setMuted(true); else audio.setMuted(false);
    const car = fakeCar(archetype, rpm, load, pos, vel);
    audio.setCars([{ car, isPlayer, label: isPlayer ? 'P1' : 'AI' }], false);
    const n = Math.round(secs / dt);
    for (let i = 0; i < n; i++) audio.update(dt, { camera });
    const buf = await ctx.startRendering();
    const L = buf.getChannelData(0), R = buf.getChannelData(1);
    const start = Math.max(0, buf.length - Math.round(SR * tail));
    const mono = new Float32Array(buf.length - start);
    for (let i = 0; i < mono.length; i++) mono[i] = 0.5 * (L[start + i] + R[start + i]);
    const dbg = JSON.parse(JSON.stringify(audio.debug.cars[0]));
    audio.dispose();
    return { mono, dbg, full: wantWav ? { L, R } : null };
  }

  function rms(x) { let s = 0; for (let i = 0; i < x.length; i++) s += x[i] * x[i]; return Math.sqrt(s / x.length); }

  // Radix-2 FFT, magnitude spectrum of a Hann-windowed block.
  function spectrum(x, N) {
    const re = new Float64Array(N), im = new Float64Array(N);
    for (let i = 0; i < N; i++) {
      const w = 0.5 - 0.5 * Math.cos(2 * Math.PI * i / (N - 1));
      re[i] = (x[i] || 0) * w;
    }
    for (let i = 1, j = 0; i < N; i++) {
      let bit = N >> 1;
      for (; j & bit; bit >>= 1) j ^= bit;
      j ^= bit;
      if (i < j) { [re[i], re[j]] = [re[j], re[i]]; [im[i], im[j]] = [im[j], im[i]]; }
    }
    for (let len = 2; len <= N; len <<= 1) {
      const ang = -2 * Math.PI / len;
      const wr = Math.cos(ang), wi = Math.sin(ang);
      for (let i = 0; i < N; i += len) {
        let cr = 1, ci = 0;
        for (let k = 0; k < len / 2; k++) {
          const ar = re[i + k], ai = im[i + k];
          const br = re[i + k + len / 2] * cr - im[i + k + len / 2] * ci;
          const bi = re[i + k + len / 2] * ci + im[i + k + len / 2] * cr;
          re[i + k] = ar + br; im[i + k] = ai + bi;
          re[i + k + len / 2] = ar - br; im[i + k + len / 2] = ai - bi;
          const nr = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = nr;
        }
      }
    }
    const mag = new Float64Array(N / 2);
    for (let i = 0; i < N / 2; i++) mag[i] = Math.hypot(re[i], im[i]);
    return mag;
  }

  // Is there a spectral line at `f`? Peak magnitude within ±1.5 bins of f,
  // against the median level of the surrounding octave.
  function lineAt(mag, f, N) {
    const binHz = SR / N;
    const c = f / binHz;
    let peak = 0, peakBin = 0;
    for (let k = Math.floor(c - 1.5); k <= Math.ceil(c + 1.5); k++) {
      if (k > 0 && k < mag.length && mag[k] > peak) { peak = mag[k]; peakBin = k; }
    }
    const lo = Math.max(1, Math.floor(c * 0.7)), hi = Math.min(mag.length - 1, Math.ceil(c * 1.4));
    const around = Array.from(mag.slice(lo, hi)).sort((a, b) => a - b);
    const median = around[Math.floor(around.length / 2)] || 1e-9;
    return { f, peakHz: +(peakBin * binHz).toFixed(1), dbAboveMedian: +(20 * Math.log10(peak / median)).toFixed(1) };
  }

  // Loudest bin overall (sanity: where the energy actually is).
  function loudest(mag, N) {
    let k = 1; for (let i = 2; i < mag.length; i++) if (mag[i] > mag[k]) k = i;
    return +(k * SR / N).toFixed(1);
  }

  const N = 16384;
  const out = { cases: [], wavs: {} };
  const cases = [
    { name: 'gt 4000 rpm WOT', archetype: 'gt', rpm: 4000, load: 1 },
    { name: 'gt 2000 rpm WOT', archetype: 'gt', rpm: 2000, load: 1 },
    { name: 'gt 4000 rpm overrun', archetype: 'gt', rpm: 4000, load: 0 },
    { name: 'muscle 3000 rpm WOT', archetype: 'muscle', rpm: 3000, load: 1 },
    { name: 'open-wheel 6000 rpm WOT', archetype: 'open-wheel', rpm: 6000, load: 1 },
    { name: 'gt 4000 rpm WOT muted', archetype: 'gt', rpm: 4000, load: 1, muted: true },
    { name: 'AI gt 4000 rpm at 5 m', archetype: 'gt', rpm: 4000, load: 1, isPlayer: false, pos: [0, 0.5, -5] },
    { name: 'AI gt 4000 rpm at 80 m', archetype: 'gt', rpm: 4000, load: 1, isPlayer: false, pos: [0, 0.5, -80] },
    { name: 'AI gt 4000 rpm closing at 40 m/s', archetype: 'gt', rpm: 4000, load: 1, isPlayer: false, pos: [0, 0.5, -30], vel: [0, 0, 40] },
  ];
  for (const c of cases) {
    const r = await renderCase(c);
    const mag = spectrum(r.mono, N);
    const cyl = { gt: 8, muscle: 8, 'open-wheel': 10 }[c.archetype];
    const fFire = (c.rpm / 60) * (cyl / 2) * (r.dbg.doppler || 1);
    const line = lineAt(mag, fFire, N);
    const crank = lineAt(mag, (c.rpm / 60) * (r.dbg.doppler || 1) * 2, N);   // 2nd order, for the comb
    out.cases.push({
      name: c.name, rms: +rms(r.mono).toFixed(4), fFireExpected: +fFire.toFixed(1),
      line, order2: crank, loudestHz: loudest(mag, N), doppler: +(r.dbg.doppler || 1).toFixed(3),
      cutoff: Math.round(r.dbg.cutoff), gain: +r.dbg.gain.toFixed(3),
    });
    if (r.full) {
      // 16-bit PCM stereo, base64 — small enough to hand back for a listen.
      const n = r.full.L.length;
      const pcm = new Int16Array(n * 2);
      for (let i = 0; i < n; i++) {
        pcm[2 * i] = Math.max(-32768, Math.min(32767, Math.round(r.full.L[i] * 32767)));
        pcm[2 * i + 1] = Math.max(-32768, Math.min(32767, Math.round(r.full.R[i] * 32767)));
      }
      const bytes = new Uint8Array(pcm.buffer);
      let s = ''; for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
      out.wavs[c.name] = btoa(s);
    }
  }
  // A sweep: the line must move with the flywheel. 1500 → 7000 rpm over 4 s.
  {
    const ctx = new OfflineAudioContext(2, SR * 4, SR);
    const audio = window.__createAudio({ context: ctx, virtualClock: true });
    audio.setMuted(false);
    const car = fakeCar('gt', 1500, 1, [0, 0.5, -3], [0, 0, 0]);
    audio.setCars([{ car, isPlayer: true, label: 'P1' }], false);
    const dt = 1 / 60, n = 240;
    for (let i = 0; i < n; i++) { car.telemetry.engineRpm = 1500 + 5500 * (i / n); audio.update(dt, { camera }); }
    const buf = await ctx.startRendering();
    const L = buf.getChannelData(0);
    const sweep = [];
    for (const at of [0.5, 1.5, 2.5, 3.5]) {
      const rpm = 1500 + 5500 * (at / 4);
      const blk = L.subarray(Math.round(at * SR), Math.round(at * SR) + 8192);
      const mag = spectrum(blk, 8192);
      sweep.push({ at, rpm: Math.round(rpm), ...lineAt(mag, rpm / 60 * 4, 8192) });
    }
    out.sweep = sweep;
    audio.dispose();
  }
  return out;
}, !!wavDir);

console.log('\nOffline renders (last 2 s of each; the "line" is the firing-order spectral line, order 2 is the crank comb):');
for (const c of render.cases) {
  console.log(`  ${c.name.padEnd(34)} rms ${c.rms.toFixed(4)}  fFire ${String(c.fFireExpected).padStart(6)} Hz → peak ${String(c.line.peakHz).padStart(6)} Hz, ${String(c.line.dbAboveMedian).padStart(5)} dB over octave median | order2 ${String(c.order2.peakHz).padStart(5)} Hz ${String(c.order2.dbAboveMedian).padStart(5)} dB | loudest ${c.loudestHz} Hz | cutoff ${c.cutoff} gain ${c.gain} doppler ${c.doppler}`);
}
console.log('Sweep 1500→7000 rpm over 4 s, firing line at:');
for (const s of render.sweep) {
  console.log(`  t=${s.at}s rpm ${s.rpm}: expected ${s.f.toFixed(1)} Hz → peak ${s.peakHz} Hz, ${s.dbAboveMedian} dB over median`);
}

if (wavDir) {
  mkdirSync(wavDir, { recursive: true });
  for (const [name, b64] of Object.entries(render.wavs)) {
    const pcm = Buffer.from(b64, 'base64');
    const header = Buffer.alloc(44);
    header.write('RIFF', 0); header.writeUInt32LE(36 + pcm.length, 4); header.write('WAVE', 8);
    header.write('fmt ', 12); header.writeUInt32LE(16, 16); header.writeUInt16LE(1, 20);
    header.writeUInt16LE(2, 22); header.writeUInt32LE(48000, 24); header.writeUInt32LE(48000 * 4, 28);
    header.writeUInt16LE(4, 32); header.writeUInt16LE(16, 34); header.write('data', 36);
    header.writeUInt32LE(pcm.length, 40);
    const file = `${wavDir}/${name.replace(/[^a-z0-9]+/gi, '_')}.wav`;
    writeFileSync(file, Buffer.concat([header, pcm]));
    console.log('wrote', file);
  }
}

console.log('\nerrors:', errs.length ? errs.slice(0, 6) : 'none');
await b.close();
process.exit(errs.length ? 1 : 0);
