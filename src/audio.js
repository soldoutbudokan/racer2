import * as THREE from 'three';
import { RIB_PITCH } from './scenery/roadwork.js';

/**
 * Sound. Engines, tyres, the surface under the wheels, wind and impacts —
 * synthesised live from the driving model with the Web Audio API.
 *
 * There are no samples: the game ships without asset downloads, so every sound
 * here is built from oscillators and one seeded noise buffer, and every
 * parameter is driven by the same state the tachometer shows. The engine note
 * is not a pitch-shifted loop; it is the harmonic stack of a crankshaft
 * turning at the flywheel's real RPM (`car.js` integrates that — it flares on
 * wheelspin and collapses through a shift cut, and the note does the same).
 *
 * Structure
 *   master ─ compressor ─ destination
 *   one CarVoice per car:
 *     engine   two detuned periodic-wave oscillators (all crank orders at
 *              once, firing orders emphasised) → load-driven waveshaper →
 *              lowpass that opens with throttle → gain; plus intake/exhaust
 *              noise, a faint transmission whine, overrun pops and a shift clunk
 *     tyres    squeal from cannon's per-wheel skidInfo, the body slip angle and
 *              the driven-axle slip ratio — tone + noise through a bandpass
 *              that falls in pitch as the slide grows
 *     impacts  a filtered noise thump on every chassis `collide` event, scaled
 *              by the impact speed
 *     players  also get the surface (grass hiss, gravel crunch, a kerb rumble
 *              pulsed at the rib rate the drawn kerb has) and wind/road roar
 *   AI voices go through a PannerNode positioned at the car and pitched by a
 *   Doppler factor from the closing speed; player voices are direct (stereo
 *   left/right in split-screen).
 *
 * Harness hooks: `debug` carries every computed parameter per car per frame so
 * a probe can assert on them without an audio device (physics-test.mjs), and
 * `createAudio({ context, virtualClock })` builds the same graph on an
 * OfflineAudioContext so the note can be rendered and measured
 * (scripts/audioprobe.mjs).
 */

const SPEED_OF_SOUND = 343;
const MASTER_VOLUME = 0.7;
const STORAGE_KEY = 'racer2.sound';

// Engine character per body archetype. `cylinders` sets the firing order
// (four-stroke: cylinders/2 firings per crank revolution) — the line the ear
// reads as the engine's pitch. `halfOrder` is how much energy sits between the
// integer orders: near zero for an even-firing flat-plane V8 or a V10, high
// for a cross-plane V8 whose banks fire unevenly — the muscle-car burble.
const ENGINES = {
  gt:           { cylinders: 8,  halfOrder: 0.12, brightness: 1.00, level: 1.00, whine: 0.012 },
  muscle:       { cylinders: 8,  halfOrder: 0.55, brightness: 0.72, level: 1.05, whine: 0.0 },
  'open-wheel': { cylinders: 10, halfOrder: 0.05, brightness: 1.30, level: 0.90, whine: 0.020 },
};

// Parameter smoothing (s). Every per-frame value goes through setTargetAtTime
// so a 60 Hz control rate never zippers into the audio rate.
const TC_GAIN = 0.02;
const TC_FREQ = 0.012;

export function createAudio(options = {}) {
  const virtualClock = !!options.virtualClock;
  let context = options.context || null;
  if (!context) {
    const AC = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext);
    if (!AC) return createStub();
    try {
      context = new AC({ latencyHint: 'interactive' });
    } catch {
      return createStub();
    }
  }

  let vt = 0;                       // virtual time for offline rendering
  const now = () => (virtualClock ? vt : context.currentTime);

  let muted = readMutedPreference();
  const master = context.createGain();
  master.gain.value = muted ? 0 : MASTER_VOLUME;
  const comp = context.createDynamicsCompressor();
  comp.threshold.value = -14;
  comp.knee.value = 12;
  comp.ratio.value = 4;
  comp.attack.value = 0.003;
  comp.release.value = 0.16;
  master.connect(comp);
  comp.connect(context.destination);

  const noise = makeNoiseBuffer(context);
  const shaperCurve = makeShaperCurve(2.6);
  const waves = new Map();          // archetype → PeriodicWave
  const rng = makeRng(0x5eed);      // pop timing — seeded so a run repeats
  const voices = [];
  let split = false;

  const listenerState = {
    pos: new THREE.Vector3(), vel: new THREE.Vector3(), primed: false,
  };

  const debug = {
    available: true,
    muted,
    state: () => context.state,
    cars: [],
    listener: { x: 0, y: 0, z: 0, fx: 0, fy: 0, fz: -1 },
  };

  // ---- Autoplay ----
  // A realtime context created outside a user gesture starts suspended. The
  // mode buttons are a gesture, so startMode's resume() normally lands; the
  // window listeners cover the browsers that need a second nudge.
  function resume() {
    if (virtualClock) return;
    if (context.state === 'suspended' && context.resume) {
      context.resume().catch(() => {});
    }
  }
  const onGesture = () => {
    resume();
    if (context.state === 'running') {
      window.removeEventListener('pointerdown', onGesture);
      window.removeEventListener('keydown', onGesture);
    }
  };
  if (!virtualClock && typeof window !== 'undefined') {
    window.addEventListener('pointerdown', onGesture);
    window.addEventListener('keydown', onGesture);
  }

  // ---- Building blocks ----

  function engineWave(archetype) {
    const key = ENGINES[archetype] ? archetype : 'gt';
    if (waves.has(key)) return waves.get(key);
    const w = buildEngineWave(context, ENGINES[key]);
    waves.set(key, w);
    return w;
  }

  function noiseSource() {
    const src = context.createBufferSource();
    src.buffer = noise;
    src.loop = true;
    src.start(now());
    return src;
  }

  function osc(type, freq) {
    const o = context.createOscillator();
    if (type) o.type = type;
    o.frequency.value = freq;
    o.start(now());
    return o;
  }

  function gain(v = 0) {
    const g = context.createGain();
    g.gain.value = v;
    return g;
  }

  function filter(type, freq, q) {
    const f = context.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    return f;
  }

  // A short percussive envelope on a gain node: near-instant attack, then an
  // exponential tail. Used for pops, clunks and impacts.
  function strike(g, amp, t, attack, decay) {
    const p = g.gain;
    p.cancelScheduledValues(t);
    p.setValueAtTime(Math.max(p.value, 0.0001), t);
    p.linearRampToValueAtTime(amp, t + attack);
    p.exponentialRampToValueAtTime(0.0005, t + attack + decay);
    p.setValueAtTime(0, t + attack + decay + 0.001);
  }

  // ---- Engine ----
  function makeEngine(archetype, out) {
    const profile = ENGINES[archetype] || ENGINES.gt;
    const wave = engineWave(archetype);

    const oscA = osc(null, 20);
    oscA.setPeriodicWave(wave);
    const oscB = osc(null, 20);
    oscB.setPeriodicWave(wave);
    oscB.detune.value = 7;            // cents — the two crank copies beat gently
    const drive = gain(0.35);
    const shaper = context.createWaveShaper();
    shaper.curve = shaperCurve;
    shaper.oversample = '2x';
    const lp = filter('lowpass', 800, 1.1);
    const body = gain(0);
    oscA.connect(drive);
    oscB.connect(drive);
    drive.connect(shaper);
    shaper.connect(lp);
    lp.connect(body);
    body.connect(out);

    // Intake roar / exhaust hiss — broadband, opens with throttle and revs.
    const nsrc = noiseSource();
    const nbp = filter('bandpass', 900, 0.8);
    const ngain = gain(0);
    nsrc.connect(nbp);
    nbp.connect(ngain);
    ngain.connect(out);

    // Straight-cut transmission whine: tracks road speed, only under load.
    const whine = osc('sine', 800);
    const whineGain = gain(0);
    whine.connect(whineGain);
    whineGain.connect(out);

    // Overrun pops (bandpassed noise bursts) and the shift clunk (a low thud).
    const pbp = filter('bandpass', 700, 1.2);
    const popGain = gain(0);
    nsrc.connect(pbp);
    pbp.connect(popGain);
    popGain.connect(out);
    const clp = filter('lowpass', 220, 0.7);
    const clunkGain = gain(0);
    nsrc.connect(clp);
    clp.connect(clunkGain);
    clunkGain.connect(out);

    let prevLoad = 0;
    let prevGear = 0;
    const st = { fWave: 0, fFire: 0, cutoff: 0, gain: 0, noise: 0, pops: 0, bangs: 0, clunks: 0 };

    function set(rpm, load, rpmFrac, speed, gear, doppler, t) {
      // The wave's fundamental is the HALF-order (rpm/120): its partials are
      // then every half-order and integer order of the crank at once.
      const fWave = (rpm / 120) * doppler;
      oscA.frequency.setTargetAtTime(fWave, t, TC_FREQ);
      oscB.frequency.setTargetAtTime(fWave, t, TC_FREQ);
      drive.gain.setTargetAtTime(0.35 + 1.5 * load, t, TC_GAIN);
      const cutoff = THREE.MathUtils.clamp(
        (420 + 4200 * Math.pow(load, 0.7) + 2600 * rpmFrac) * profile.brightness, 150, 14000);
      lp.frequency.setTargetAtTime(cutoff, t, TC_GAIN);
      const g = (0.16 + 0.52 * load + 0.22 * rpmFrac) * profile.level;
      body.gain.setTargetAtTime(g, t, TC_GAIN);
      nbp.frequency.setTargetAtTime(700 + 2800 * rpmFrac, t, TC_GAIN);
      const ng = (0.015 + 0.09 * load) * (0.35 + 0.65 * rpmFrac) * profile.level;
      ngain.gain.setTargetAtTime(ng, t, TC_GAIN);
      whine.frequency.setTargetAtTime((700 + speed * 14) * doppler, t, TC_FREQ);
      whineGain.gain.setTargetAtTime(
        profile.whine * load * Math.min(1, speed / 40), t, TC_GAIN);

      const shifted = gear !== prevGear && prevGear > 0 && gear > 0;
      if (shifted) {
        // The cut itself is audible in the revs; this is the dog-ring engaging,
        // and on an upshift the charge the ignition cut dumped into the hot
        // exhaust going off — one bang, not the lift-off crackle below (the
        // cut reads as a throttle lift, and without this branch every upshift
        // would fire a five-pop crackle).
        strike(clunkGain, 0.3 * profile.level, t, 0.004, 0.06);
        st.clunks++;
        if (gear > prevGear && rpmFrac > 0.45) {
          strike(popGain, 0.55 * profile.level, t + 0.03, 0.004, 0.07);
          st.bangs++;
        }
      } else if (prevLoad > 0.5 && load < 0.12 && rpmFrac > 0.45) {
        // Lifting off at high revs: unburnt fuel meets a hot exhaust.
        const n = 3 + Math.floor(rng() * 4);
        for (let i = 0; i < n; i++) {
          const at = t + 0.05 + i * 0.075 + rng() * 0.06;
          strike(popGain, (0.3 + rng() * 0.35) * profile.level, at, 0.004, 0.05);
        }
        st.pops += n;
      }
      prevLoad = load;
      prevGear = gear;

      st.fWave = fWave;
      st.fFire = fWave * profile.cylinders;   // firing order: rpm/60 · cyl/2
      st.cutoff = cutoff;
      st.gain = g;
      st.noise = ng;
    }

    function dispose() {
      for (const n of [oscA, oscB, nsrc, whine]) { try { n.stop(); } catch { /* already stopped */ } }
      for (const n of [oscA, oscB, drive, shaper, lp, body, nsrc, nbp, ngain,
        whine, whineGain, pbp, popGain, clp, clunkGain]) n.disconnect();
    }

    return { set, dispose, st, profile };
  }

  // ---- Tyres ----
  function makeTyres(out) {
    const nsrc = noiseSource();
    const sbp = filter('bandpass', 1400, 6);
    const sgain = gain(0);
    nsrc.connect(sbp);
    sbp.connect(sgain);
    sgain.connect(out);
    const tone = osc('sawtooth', 1400);
    const tbp = filter('bandpass', 1400, 10);
    const tgain = gain(0);
    tone.connect(tbp);
    tbp.connect(tgain);
    tgain.connect(out);
    // A slow wobble on the tone — a squeal is never a steady pitch.
    const lfo = osc('sine', 6);
    const lfoDepth = gain(30);
    lfo.connect(lfoDepth);
    lfoDepth.connect(tone.frequency);

    const st = { squeal: 0, fSq: 0 };
    function set(squeal, speed, doppler, t) {
      const fSq = THREE.MathUtils.clamp(1500 - 550 * squeal + speed * 4, 900, 2200) * doppler;
      sbp.frequency.setTargetAtTime(fSq, t, TC_FREQ);
      tbp.frequency.setTargetAtTime(fSq, t, TC_FREQ);
      tone.frequency.setTargetAtTime(fSq, t, TC_FREQ);
      // Steep curve: a tyre singing at the limit is a hint, a locked or spun
      // one is the loud thing.
      const a = Math.pow(squeal, 1.8);
      sgain.gain.setTargetAtTime(0.5 * a, t, TC_GAIN);
      tgain.gain.setTargetAtTime(0.25 * a, t, TC_GAIN);
      st.squeal = squeal;
      st.fSq = fSq;
    }
    function dispose() {
      for (const n of [nsrc, tone, lfo]) { try { n.stop(); } catch { /* noop */ } }
      for (const n of [nsrc, sbp, sgain, tone, tbp, tgain, lfo, lfoDepth]) n.disconnect();
    }
    return { set, dispose, st };
  }

  // ---- Surface + wind (player cars only) ----
  function makeSurface(out) {
    const nsrc = noiseSource();
    const glp = filter('lowpass', 600, 0.7);
    const ggain = gain(0);
    nsrc.connect(glp); glp.connect(ggain); ggain.connect(out);
    const vbp = filter('bandpass', 1500, 0.5);
    const vgain = gain(0);
    nsrc.connect(vbp); vbp.connect(vgain); vgain.connect(out);
    // Kerb: low rattle pulsed at the rate the ribs pass under the tyre.
    const rbp = filter('bandpass', 130, 1.2);
    const rgain = gain(0);
    nsrc.connect(rbp); rbp.connect(rgain); rgain.connect(out);
    const rlfo = osc('square', 20);
    const rdepth = gain(0);
    rlfo.connect(rdepth); rdepth.connect(rgain.gain);
    // Wind over the body, and the tyres' roar on asphalt.
    const wlp = filter('lowpass', 300, 0.5);
    const wgain = gain(0);
    nsrc.connect(wlp); wlp.connect(wgain); wgain.connect(out);
    const obp = filter('bandpass', 380, 0.7);
    const ogain = gain(0);
    nsrc.connect(obp); obp.connect(ogain); ogain.connect(out);

    const st = { grass: 0, gravel: 0, rumble: 0, rumbleHz: 0, wind: 0, roar: 0 };
    function set(frac, speed, t) {
      const roll = Math.min(1, speed / 25);
      const gg = 0.35 * frac.grass * roll;
      const vg = 0.45 * frac.gravel * roll;
      ggain.gain.setTargetAtTime(gg, t, TC_GAIN);
      vgain.gain.setTargetAtTime(vg, t, TC_GAIN);
      const rumbleHz = speed / RIB_PITCH;
      const rg = 0.35 * frac.kerb * Math.min(1, speed / 12);
      rlfo.frequency.setTargetAtTime(Math.max(1, rumbleHz), t, TC_FREQ);
      rgain.gain.setTargetAtTime(rg, t, TC_GAIN);
      rdepth.gain.setTargetAtTime(rg * 0.85, t, TC_GAIN);
      const wind = 0.7 * Math.min(1, Math.pow(speed / 78, 2));
      wlp.frequency.setTargetAtTime(200 + speed * 28, t, TC_GAIN);
      wgain.gain.setTargetAtTime(wind, t, TC_GAIN);
      const roar = 0.3 * Math.min(1, speed / 55) * (frac.road + 0.5 * frac.kerb);
      ogain.gain.setTargetAtTime(roar, t, TC_GAIN);
      st.grass = gg; st.gravel = vg; st.rumble = rg; st.rumbleHz = rumbleHz;
      st.wind = wind; st.roar = roar;
    }
    function dispose() {
      for (const n of [nsrc, rlfo]) { try { n.stop(); } catch { /* noop */ } }
      for (const n of [nsrc, glp, ggain, vbp, vgain, rbp, rgain, rlfo, rdepth,
        wlp, wgain, obp, ogain]) n.disconnect();
    }
    return { set, dispose, st };
  }

  // ---- Impacts ----
  function makeImpacts(body, out) {
    const nsrc = noiseSource();
    const lp = filter('lowpass', 380, 0.8);
    const g = gain(0);
    nsrc.connect(lp); lp.connect(g); g.connect(out);
    let last = -1;
    const st = { hits: 0, lastAmp: 0 };
    function onCollide(e) {
      let v = 0;
      try { v = Math.abs(e.contact.getImpactVelocityAlongNormal()); } catch { return; }
      const t = now();
      if (v < 1.5 || t - last < 0.08) return;
      last = t;
      const amp = THREE.MathUtils.clamp((v - 1) / 10, 0.08, 1) * 0.9;
      strike(g, amp, t, 0.005, 0.12 + 0.08 * amp);
      st.hits++;
      st.lastAmp = amp;
    }
    body.addEventListener('collide', onCollide);
    function dispose() {
      body.removeEventListener('collide', onCollide);
      try { nsrc.stop(); } catch { /* noop */ }
      for (const n of [nsrc, lp, g]) n.disconnect();
    }
    return { dispose, st };
  }

  // ---- One car ----
  function makeCarVoice(entry, slot) {
    const car = entry.car;
    const out = gain(1);
    let panner = null;
    let stereo = null;
    if (entry.isPlayer) {
      stereo = context.createStereoPanner ? context.createStereoPanner() : null;
      if (stereo) { out.connect(stereo); stereo.connect(master); }
      else out.connect(master);
    } else {
      panner = context.createPanner();
      panner.panningModel = 'equalpower';
      panner.distanceModel = 'inverse';
      panner.refDistance = 5;
      panner.maxDistance = 600;
      panner.rolloffFactor = 1.0;
      out.connect(panner);
      panner.connect(master);
    }
    const engine = makeEngine(car.archetype || 'gt', out);
    const tyres = makeTyres(out);
    const impacts = makeImpacts(car.body, out);
    const surface = entry.isPlayer ? makeSurface(out) : null;

    const v = {
      entry, car, slot, out, panner, stereo, engine, tyres, impacts, surface,
      squeal: 0,
      dbg: { label: entry.label || (entry.isPlayer ? 'P' : 'AI'), archetype: car.archetype || 'gt' },
    };
    return v;
  }

  function disposeVoice(v) {
    v.engine.dispose();
    v.tyres.dispose();
    v.impacts.dispose();
    if (v.surface) v.surface.dispose();
    v.out.disconnect();
    if (v.panner) v.panner.disconnect();
    if (v.stereo) v.stereo.disconnect();
  }

  // ---- Public: which cars are on track ----
  function setCars(entries, splitScreen = false) {
    for (const v of voices) disposeVoice(v);
    voices.length = 0;
    split = !!splitScreen;
    let slot = 0;
    for (const e of entries || []) {
      if (!e || !e.car) continue;
      voices.push(makeCarVoice(e, e.isPlayer ? slot++ : -1));
    }
    listenerState.primed = false;
    debug.cars = voices.map((v) => v.dbg);
    resume();
  }

  // ---- Per-frame update ----
  const _q = new THREE.Quaternion();
  const _fwd = new THREE.Vector3();
  const _up = new THREE.Vector3();
  const _p = new THREE.Vector3();
  const _dir = new THREE.Vector3();
  const _vs = new THREE.Vector3();
  const frac = { road: 0, kerb: 0, grass: 0, gravel: 0 };

  function updateListener(view, dt) {
    const cam = view && view.camera;
    if (!cam) return;
    _p.copy(cam.position);
    if (listenerState.primed && dt > 0) {
      _vs.copy(_p).sub(listenerState.pos).divideScalar(dt);
      // Camera cuts (a mode change, a reset) are not motion.
      if (_vs.length() < 120) listenerState.vel.lerp(_vs, 0.5);
      else listenerState.vel.set(0, 0, 0);
    }
    listenerState.pos.copy(_p);
    listenerState.primed = true;
    _q.copy(cam.quaternion);
    _fwd.set(0, 0, -1).applyQuaternion(_q).normalize();
    _up.set(0, 1, 0).applyQuaternion(_q).normalize();
    const L = context.listener;
    const t = now();
    if (L.positionX) {
      L.positionX.setTargetAtTime(_p.x, t, TC_GAIN);
      L.positionY.setTargetAtTime(_p.y, t, TC_GAIN);
      L.positionZ.setTargetAtTime(_p.z, t, TC_GAIN);
      L.forwardX.setTargetAtTime(_fwd.x, t, TC_GAIN);
      L.forwardY.setTargetAtTime(_fwd.y, t, TC_GAIN);
      L.forwardZ.setTargetAtTime(_fwd.z, t, TC_GAIN);
      L.upX.setTargetAtTime(_up.x, t, TC_GAIN);
      L.upY.setTargetAtTime(_up.y, t, TC_GAIN);
      L.upZ.setTargetAtTime(_up.z, t, TC_GAIN);
    } else if (L.setPosition) {
      L.setPosition(_p.x, _p.y, _p.z);
      L.setOrientation(_fwd.x, _fwd.y, _fwd.z, _up.x, _up.y, _up.z);
    }
    debug.listener = { x: _p.x, y: _p.y, z: _p.z, fx: _fwd.x, fy: _fwd.y, fz: _fwd.z };
  }

  function dopplerFor(body) {
    // Closing speed along the line from the listener to the source. A source
    // moving toward the listener (vs < 0) or a listener moving toward the
    // source (vl > 0) both raise the pitch.
    _dir.set(body.position.x - listenerState.pos.x,
      body.position.y - listenerState.pos.y,
      body.position.z - listenerState.pos.z);
    const d = _dir.length();
    if (d < 0.5) return 1;
    _dir.divideScalar(d);
    const vs = body.velocity.x * _dir.x + body.velocity.y * _dir.y + body.velocity.z * _dir.z;
    const vl = listenerState.vel.dot(_dir);
    return THREE.MathUtils.clamp(
      (SPEED_OF_SOUND + vl) / Math.max(1, SPEED_OF_SOUND + vs), 0.75, 1.35);
  }

  function update(dt, view) {
    const t = now();
    if (voices.length === 0) { if (virtualClock) vt += dt; return; }
    updateListener(view, dt);

    for (const v of voices) {
      const car = v.car;
      const tel = car.telemetry;
      const body = car.body;
      const spec = car.spec || { idleRpm: 1100, redlineRpm: 7600 };
      const rpm = tel.engineRpm ?? tel.rpm;
      const load = THREE.MathUtils.clamp(tel.throttle ?? 0, 0, 1);
      const rpmFrac = THREE.MathUtils.clamp(
        (rpm - spec.idleRpm) / (spec.redlineRpm - spec.idleRpm), 0, 1);
      const vel = body.velocity;
      const speed = Math.hypot(vel.x, vel.z);

      // Body slip angle from the chassis frame.
      const q = body.quaternion;
      const fx = 2 * (q.x * q.z + q.w * q.y);
      const fz = 1 - 2 * (q.x * q.x + q.y * q.y);
      const rx = 1 - 2 * (q.y * q.y + q.z * q.z);
      const rz = 2 * (q.x * q.z - q.w * q.y);
      const fwdSpd = vel.x * fx + vel.z * fz;
      const latSpd = vel.x * rx + vel.z * rz;
      const slipAngle = speed > 4 ? Math.atan2(Math.abs(latSpd), Math.abs(fwdSpd)) : 0;

      // Surfaces under the four wheels, and the hardest-sliding tyre on a
      // surface that can squeal (grass and gravel do not).
      const surfaces = tel.surfaces || null;
      frac.road = 0; frac.kerb = 0; frac.grass = 0; frac.gravel = 0;
      let slide = 0;
      const wis = car.vehicle ? car.vehicle.wheelInfos : null;
      for (let i = 0; i < 4; i++) {
        const s = surfaces ? surfaces[i] : 'road';
        frac[s] = (frac[s] || 0) + 0.25;
        if (wis && (s === 'road' || s === 'kerb')) {
          const w = wis[i];
          if (w.raycastResult && w.raycastResult.body) {
            slide = Math.max(slide, 1 - THREE.MathUtils.clamp(w.skidInfo ?? 1, 0, 1));
          }
        }
      }
      // Four ways a tyre can be asked for more than it has, each 0..1:
      //  corner — lateral acceleration against the grip available at this
      //           speed (μ·g plus downforce). A tyre sings before it lets go,
      //           so this starts at ~80 % of the limit and is full just past it.
      //  slide  — cannon's own verdict, but only a real deficit: skidInfo is
      //           the ratio of the impulse the tyre had to the one the solver
      //           asked for. Under braking the ask is bounded by the brake
      //           setting, so an unloaded rear at its limit reads ~0.5 on
      //           every hard stop — at the limit, not locked; a true slide
      //           (handbrake, full-lock understeer) is a constraint solve
      //           asking for ten times the grip and reads ~0.1. Taken raw it
      //           had the AI field squealing a third of the lap.
      //  alpha  — the body running at a slip angle (a slide or a spin).
      //  spin   — the driven axle's slip ratio (wheelspin off the line).
      const mu = (spec.mu && spec.mu.road) || 1.45;
      const df = spec.clA ? 0.5 * (spec.airDensity || 1.225) * spec.clA * speed * speed / (spec.massKg || 1350) : 0;
      const aAvail = mu * (9.82 + df);
      const av = body.angularVelocity;   // absent on a probe's stand-in body
      const aLat = av ? Math.abs(speed * av.y) : 0;
      const corner = THREE.MathUtils.clamp((aLat / aAvail - 0.80) / 0.25, 0, 1);
      const slideTerm = THREE.MathUtils.clamp((slide - 0.5) / 0.5, 0, 1);
      const alphaTerm = THREE.MathUtils.clamp((slipAngle - 0.06) / 0.25, 0, 1);
      const spin = THREE.MathUtils.clamp((Math.abs(tel.slip || 0) - 0.15) / 0.5, 0, 1);
      const hard = frac.road + frac.kerb;
      const raw = Math.max(corner, slideTerm, alphaTerm, spin)
        * THREE.MathUtils.clamp((speed - 2) / 6, 0, 1) * hard;
      // Attack fast, release slow — a squeal tails off, it does not cut.
      const k = raw > v.squeal ? Math.min(1, dt / 0.03) : Math.min(1, dt / 0.18);
      v.squeal += (raw - v.squeal) * k;

      let doppler = 1;
      if (v.panner) {
        doppler = dopplerFor(body);
        const P = v.panner;
        if (P.positionX) {
          P.positionX.setTargetAtTime(body.position.x, t, TC_GAIN);
          P.positionY.setTargetAtTime(body.position.y, t, TC_GAIN);
          P.positionZ.setTargetAtTime(body.position.z, t, TC_GAIN);
        } else if (P.setPosition) {
          P.setPosition(body.position.x, body.position.y, body.position.z);
        }
      } else if (v.stereo) {
        const pan = split ? (v.slot === 0 ? -0.55 : 0.55) : 0;
        v.stereo.pan.setTargetAtTime(pan, t, TC_GAIN);
      }

      const gear = tel.gear || 0;
      v.engine.set(rpm, load, rpmFrac, speed, gear, doppler, t);
      v.tyres.set(v.squeal, speed, doppler, t);
      if (v.surface) v.surface.set(frac, speed, t);

      const d = v.dbg;
      d.rpm = rpm; d.load = load; d.rpmFrac = rpmFrac; d.speed = speed;
      d.gear = gear; d.doppler = doppler;
      d.fWave = v.engine.st.fWave; d.fFire = v.engine.st.fFire;
      d.cutoff = v.engine.st.cutoff; d.gain = v.engine.st.gain; d.noise = v.engine.st.noise;
      d.pops = v.engine.st.pops; d.bangs = v.engine.st.bangs; d.clunks = v.engine.st.clunks;
      d.slide = slide; d.slipAngle = slipAngle; d.spin = spin; d.squeal = v.squeal;
      d.corner = corner; d.slideTerm = slideTerm; d.alphaTerm = alphaTerm; d.cornerUse = aLat / aAvail;
      d.fSq = v.tyres.st.fSq;
      d.hits = v.impacts.st.hits; d.lastHit = v.impacts.st.lastAmp;
      if (v.surface) Object.assign(d, v.surface.st);
      if (v.panner) {
        d.x = body.position.x; d.y = body.position.y; d.z = body.position.z;
        d.distance = Math.hypot(body.position.x - listenerState.pos.x,
          body.position.y - listenerState.pos.y, body.position.z - listenerState.pos.z);
      }
    }
    debug.muted = muted;
    if (virtualClock) vt += dt;
  }

  // ---- Mute ----
  function setMuted(m) {
    muted = !!m;
    master.gain.setTargetAtTime(muted ? 0 : MASTER_VOLUME, now(), 0.03);
    debug.muted = muted;
    writeMutedPreference(muted);
    if (!muted) resume();
    return muted;
  }
  function toggleMute() { return setMuted(!muted); }

  function dispose() {
    setCars([]);
    master.disconnect();
    comp.disconnect();
    if (!virtualClock && typeof window !== 'undefined') {
      window.removeEventListener('pointerdown', onGesture);
      window.removeEventListener('keydown', onGesture);
    }
    if (!virtualClock && context.close) context.close().catch(() => {});
  }

  return {
    available: true,
    context,
    setCars,
    update,
    resume,
    setMuted,
    toggleMute,
    get muted() { return muted; },
    dispose,
    debug,
    engines: ENGINES,
    masterVolume: MASTER_VOLUME,
  };
}

// Web Audio unavailable (old browser, or no window): the game runs silent and
// every call is a no-op, so nothing else has to check.
function createStub() {
  const debug = { available: false, muted: true, state: () => 'unavailable', cars: [], listener: null };
  return {
    available: false, context: null,
    setCars() {}, update() {}, resume() {},
    setMuted(m) { return !!m; }, toggleMute() { return true; },
    get muted() { return true; },
    dispose() {}, debug, engines: ENGINES, masterVolume: 0,
  };
}

// The crank's harmonic series as one PeriodicWave. The fundamental is the
// HALF-order (rpm/120), so partial k is order k/2: every half-order and integer
// order of the crank is in the same oscillator, in phase, and one frequency
// parameter moves the lot.
//
// Amplitudes are shaped relative to the FIRING order (cylinders/2 per rev),
// which is the line the ear reads as the engine's pitch: it and its multiples
// carry the energy and roll off from there; the other integer orders sit well
// under it (the V8's 2nd and 6th a little louder — the rumble), and the
// half-orders carry the archetype's roughness. A plain 1/k series put the
// crank's 1st and 2nd orders above the firing line and the V10 rendered with
// its loudest partial at order 1 — an octave-and-more below where it should
// scream (audioprobe.mjs measures this).
function buildEngineWave(context, profile) {
  const K = 96;
  const real = new Float32Array(K + 1);
  const imag = new Float32Array(K + 1);
  const firing = profile.cylinders / 2;
  for (let k = 1; k <= K; k++) {
    const order = k / 2;
    const rel = order / firing;                    // 1 at the firing order
    const roll = Math.min(1, 1 / Math.pow(rel, 0.9)); // flat below it, falling above
    let a;
    if (Number.isInteger(order)) {
      if (order % firing === 0) a = roll;
      else if (firing % 2 === 0 && order % (firing / 2) === 0) a = 0.40 * roll;
      else a = 0.20 * roll;
    } else {
      a = 0.35 * profile.halfOrder * roll;
    }
    imag[k] = a;
  }
  return context.createPeriodicWave(real, imag);
}

// Soft clip: the "load" on the engine — more drive into the curve is more
// harmonics, which is what a wide-open throttle sounds like next to overrun.
function makeShaperCurve(k) {
  const n = 2048;
  const c = new Float32Array(n);
  const norm = Math.tanh(k);
  for (let i = 0; i < n; i++) {
    const x = (i / (n - 1)) * 2 - 1;
    c[i] = Math.tanh(k * x) / norm;
  }
  return c;
}

// Two seconds of seeded white noise, shared by every consumer. Seeded so an
// offline render of the same drive is the same file.
function makeNoiseBuffer(context) {
  const sr = context.sampleRate;
  const len = Math.floor(sr * 2);
  const buf = context.createBuffer(1, len, sr);
  const data = buf.getChannelData(0);
  const r = makeRng(0xa0d10);
  for (let i = 0; i < len; i++) data[i] = r() * 2 - 1;
  return buf;
}

function makeRng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function readMutedPreference() {
  try {
    return typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY) === 'off';
  } catch {
    return false;
  }
}

function writeMutedPreference(muted) {
  try {
    if (typeof localStorage === 'undefined') return;
    if (muted) localStorage.setItem(STORAGE_KEY, 'off');
    else localStorage.removeItem(STORAGE_KEY);
  } catch { /* private mode, or storage blocked */ }
}
