import * as THREE from 'three';

import { createScene } from './scene.js';
import { createPhysicsWorld } from './physics.js';
import { createTrack } from './track.js';
import { TRACKS, DEFAULT_TRACK_ID, getTrackById } from './tracks.js';
import { createCar } from './car.js';
import {
  createInput,
  SINGLE_PLAYER_BINDINGS,
  WASD_BINDINGS,
  ARROW_BINDINGS,
} from './controls.js';
import { createChaseCamera } from './camera.js';
import { createHud } from './hud.js';
import { createAIDriver } from './ai.js';
import { createRacingLine } from './racingLine.js';

const RACE_LAPS = 3;
const MAX_KMH = 320;

// Time trial is a single flying lap; the other modes run a full race distance.
function lapsFor(mode) {
  return mode === 'time-trial' ? 1 : RACE_LAPS;
}

const PLAYER1_COLOR = 0xc8161d;
const PLAYER2_COLOR = 0x1f6cff;
const AI_COLORS = [0xfacc15, 0x059669, 0xea580c];

// Visually distinct body shapes across the grid.
const PLAYER1_ARCH = 'gt';
const PLAYER2_ARCH = 'muscle';
const AI_ARCHETYPES = ['open-wheel', 'gt', 'muscle'];

bootstrap();

async function bootstrap() {
  const status = document.getElementById('loading-status');
  const fill = document.getElementById('loading-fill');
  const setProgress = (p, label) => {
    fill.style.width = `${Math.round(p * 100)}%`;
    if (label) status.textContent = label;
  };

  setProgress(0.05, 'Booting renderer');
  await frame();

  const canvas = document.getElementById('game');
  const { renderer, scene, camera, composer, updateShadowTarget } = createScene(canvas);

  setProgress(0.25, 'Building physics world');
  await frame();
  const { world, materials } = createPhysicsWorld();

  setProgress(0.45, 'Laying asphalt');
  await frame();
  const track = createTrack(scene, world, materials, getTrackById(DEFAULT_TRACK_ID));

  setProgress(0.7, 'Calibrating telemetry');
  await frame();
  const hud = createHud(MAX_KMH);
  hud.buildMinimap(track);
  const racingLine = createRacingLine(scene, track);

  // Second camera lives in main.js (composer only knows about the primary).
  const camera2 = new THREE.PerspectiveCamera(
    62, window.innerWidth / window.innerHeight, 0.6, 3000,
  );
  scene.add(camera2);

  setProgress(1.0, 'Ready');
  await frame();
  document.getElementById('loading').classList.add('fade');

  // ---- Mode selection ----
  const ctx = {
    renderer, scene, camera, camera2, composer, world, materials, track, hud,
    racingLine,
    selectedTrackId: DEFAULT_TRACK_ID,
    lineAid: false,
    updateShadowTarget,
    cars: [],
    primaryPlayerIdx: 0,
    mode: null,
    state: null,
  };
  // Dev hooks for headless screenshot/test harnesses (harmless in production).
  if (typeof window !== 'undefined') {
    window.__ctx = ctx;
    window.__createAIDriver = createAIDriver;
    // Deterministic loop pump — headless Chrome throttles rAF, so tests
    // drive frames through this instead of waiting on wall-clock time.
    window.__tick = (dt) => tick(ctx, dt, performance.now());
  }

  document.querySelectorAll('button.mode').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      startMode(ctx, mode);
    });
  });

  // Finish-screen buttons.
  document.getElementById('finish-restart').addEventListener('click', () => {
    if (ctx.mode) startMode(ctx, ctx.mode);
  });
  document.getElementById('finish-menu').addEventListener('click', () => {
    stopMode(ctx);
  });

  // ESC returns to the menu.
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && ctx.mode) {
      stopMode(ctx);
    }
  });

  // ---- Circuit selection ----
  // Swapping circuits tears down the current track (meshes + physics bodies)
  // and the racing-line ribbon, then rebuilds both plus the minimap. Only ever
  // called from the menu, where no cars hold a reference to the old track.
  function rebuildTrack(def) {
    ctx.track.dispose();
    ctx.racingLine.dispose();
    ctx.track = createTrack(scene, world, materials, def);
    ctx.racingLine = createRacingLine(scene, ctx.track);
    ctx.racingLine.setVisible(false);
    ctx.hud.buildMinimap(ctx.track);
    ctx.selectedTrackId = def.id;
  }
  buildTrackSelector(document.getElementById('track-list'), ctx, rebuildTrack);

  showMenu();

  // Start the loop now — it idles until a mode is active.
  let last = performance.now();
  function loop(now) {
    requestAnimationFrame(loop);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (ctx.mode) tick(ctx, dt, now);
  }
  requestAnimationFrame(loop);
}

function showMenu() {
  document.getElementById('menu').classList.remove('hidden');
}
function hideMenu() {
  document.getElementById('menu').classList.add('hidden');
}

// Build the circuit picker cards in the menu. Selecting a card rebuilds the
// track immediately so the minimap (and the next race) use it.
function buildTrackSelector(container, ctx, rebuildTrack) {
  if (!container) return;
  container.innerHTML = '';
  const cards = [];
  for (const def of TRACKS) {
    const btn = document.createElement('button');
    btn.className = 'track-card' + (def.id === ctx.selectedTrackId ? ' selected' : '');
    btn.dataset.track = def.id;
    const diffClass = def.difficulty.toLowerCase().replace(/[^a-z]/g, '');
    btn.innerHTML =
      `<div class="track-head">` +
        `<span class="track-name">${def.name}</span>` +
        `<span class="track-diff diff-${diffClass}">${def.difficulty}</span>` +
      `</div>` +
      `<div class="track-sub">${def.subtitle}</div>` +
      `<div class="track-blurb">${def.blurb}</div>`;
    btn.addEventListener('click', () => {
      if (ctx.selectedTrackId === def.id) return;
      cards.forEach((c) => c.classList.remove('selected'));
      btn.classList.add('selected');
      rebuildTrack(def);
    });
    container.appendChild(btn);
    cards.push(btn);
  }
}

function startMode(ctx, mode) {
  // Tear down anything from a previous run.
  destroyCars(ctx);

  ctx.mode = mode;
  ctx.primaryPlayerIdx = 0;
  ctx.state = createGameState(mode);

  if (mode === 'time-trial') {
    addPlayerCar(ctx, SINGLE_PLAYER_BINDINGS, PLAYER1_COLOR, 0, PLAYER1_ARCH);
    ctx.hud.hidePosition();
  } else if (mode === 'quick-race') {
    addPlayerCar(ctx, SINGLE_PLAYER_BINDINGS, PLAYER1_COLOR, 0, PLAYER1_ARCH);
    for (let i = 0; i < 3; i++) {
      addAICar(ctx, AI_COLORS[i], i + 1, 0.78 + i * 0.04, AI_ARCHETYPES[i]);
    }
    ctx.hud.setPosition(1, ctx.cars.length);
  } else if (mode === 'two-player') {
    addPlayerCar(ctx, WASD_BINDINGS, PLAYER1_COLOR, 0, PLAYER1_ARCH);
    addPlayerCar(ctx, ARROW_BINDINGS, PLAYER2_COLOR, 1, PLAYER2_ARCH);
    ctx.hud.hidePosition();
  }

  // The perfect-line aid is for single-screen modes; in split-screen its
  // colours could only be right for one of the two players.
  ctx.lineAid = mode !== 'two-player';
  ctx.racingLine.setVisible(ctx.lineAid);
  if (!ctx.lineAid) ctx.hud.hidePace();

  ctx.hud.setLap(1, ctx.state.totalLaps);
  ctx.hud.setBest(null);
  ctx.hud.setLapTime(0);
  ctx.hud.clearAnnouncements();
  hideFinish();

  hideMenu();
  ctx.hud.show();
}

function stopMode(ctx) {
  destroyCars(ctx);
  ctx.mode = null;
  ctx.state = null;
  ctx.racingLine.setVisible(false);
  ctx.hud.hide();
  ctx.hud.hidePosition();
  ctx.hud.hidePace();
  ctx.hud.clearAnnouncements();
  hideFinish();
  showMenu();
}

// ---------- Finish screen ----------

function racePlace(ctx, car) {
  const sorted = [...ctx.cars].sort((a, b) => b.state.progress - a.state.progress);
  return sorted.indexOf(car) + 1;
}

function showFinish(ctx) {
  const primary = ctx.cars[ctx.primaryPlayerIdx];
  const st = primary.state;
  let title = 'FINISHED';
  let detail = '';
  if (ctx.mode === 'time-trial') {
    detail = `LAP TIME   ${formatTime(st.bestMs)}`;
  } else if (ctx.mode === 'quick-race') {
    const place = racePlace(ctx, primary);
    title = place === 1 ? 'YOU WIN' : `FINISHED  P${place}/${ctx.cars.length}`;
    detail = `RACE TIME   ${formatTime(st.finishMs)}`;
  } else if (ctx.mode === 'two-player') {
    const winner = ctx.state.finishOrder[0];
    title = winner && winner.label === 'P2' ? 'PLAYER 2 WINS' : 'PLAYER 1 WINS';
    detail = `TIME   ${formatTime(winner ? winner.state.finishMs : st.finishMs)}`;
  }
  document.getElementById('finish-title').textContent = title;
  document.getElementById('finish-detail').textContent = detail;
  document.getElementById('finish').classList.remove('hidden');
}

function hideFinish() {
  document.getElementById('finish').classList.add('hidden');
}

function formatTime(ms) {
  if (ms == null || !isFinite(ms)) return '--:--.---';
  const total = Math.max(0, Math.floor(ms));
  const m = Math.floor(total / 60000);
  const s = Math.floor((total % 60000) / 1000);
  const mss = total % 1000;
  const pad = (n, w) => n.toString().padStart(w, '0');
  return `${pad(m, 2)}:${pad(s, 2)}.${pad(mss, 3)}`;
}

function createGameState(mode) {
  return {
    mode,
    totalLaps: lapsFor(mode),
    finishOrder: [], // car entries in the order they crossed the final line
    finishShown: false,
    perCar: [], // populated as cars are added
  };
}

function carState() {
  const now = performance.now();
  return {
    lap: 1,
    bestMs: null,
    lapStart: now,
    raceStart: now, // total elapsed reference for the finish screen
    finishMs: null,
    lastT: 0,
    sectorReached: false,
    finished: false,
    progress: 0, // lap + parametric t — used to sort race positions
  };
}

function addPlayerCar(ctx, bindings, color, gridIdx, archetype = 'gt') {
  const car = createCar(ctx.world, ctx.materials, { color, archetype });
  ctx.scene.add(car.visual.root);
  car.visual.wheels.forEach((w) => ctx.scene.add(w));
  const spawn = gridSpawn(ctx.track, gridIdx);
  car.reset(spawn.position, spawn.yaw);
  const input = createInput(bindings);
  const chase = createChaseCamera(gridIdx === 0 ? ctx.camera : ctx.camera2);
  ctx.cars.push({
    car, color,
    isPlayer: true,
    input, chase,
    state: carState(),
    label: gridIdx === 0 ? 'P1' : 'P2',
  });
  ctx.state.perCar.push(ctx.cars[ctx.cars.length - 1]);
}

function addAICar(ctx, color, gridIdx, skill, archetype = 'gt') {
  const car = createCar(ctx.world, ctx.materials, { color, archetype });
  ctx.scene.add(car.visual.root);
  car.visual.wheels.forEach((w) => ctx.scene.add(w));
  const spawn = gridSpawn(ctx.track, gridIdx);
  car.reset(spawn.position, spawn.yaw);
  const ai = createAIDriver(ctx.track, { skill });
  ctx.cars.push({
    car, color,
    isPlayer: false,
    ai,
    state: carState(),
    label: 'AI',
  });
  ctx.state.perCar.push(ctx.cars[ctx.cars.length - 1]);
}

function gridSpawn(track, idx) {
  // Match the visual grid: alternating sides, 7 m apart, behind the line.
  const back = -2.8 - idx * 7.0;
  const lat = (idx % 2 === 0 ? 1 : -1) * 2.5;
  const f = track.frames[0];
  return {
    position: new THREE.Vector3()
      .copy(f.pos)
      .add(f.tan.clone().multiplyScalar(back))
      .add(f.left.clone().multiplyScalar(lat))
      .add(new THREE.Vector3(0, 1.0, 0)),
    yaw: Math.atan2(f.tan.x, f.tan.z),
  };
}

function destroyCars(ctx) {
  for (const c of ctx.cars) {
    c.car.dispose();
    ctx.scene.remove(c.car.visual.root);
    c.car.visual.wheels.forEach((w) => ctx.scene.remove(w));
  }
  ctx.cars = [];
}

// ---------- Loop ----------

const fixedDt = 1 / 120;
let acc = 0;

function tick(ctx, dt, now) {
  acc += dt;

  // Camera aspect — kept in sync with the active layout so switching modes
  // doesn't leave the projection stretched.
  const winW = window.innerWidth;
  const winH = window.innerHeight;
  if (ctx.mode === 'two-player') {
    const halfW = Math.floor(winW / 2);
    ctx.camera.aspect = halfW / winH;
    ctx.camera2.aspect = (winW - halfW) / winH;
  } else {
    ctx.camera.aspect = winW / winH;
  }

  // Drive each car
  const allCars = ctx.cars.map((c) => c.car);
  for (const c of ctx.cars) {
    let cmd;
    if (c.isPlayer) {
      cmd = c.input.update(dt);
      if (c.input.consumeToggle()) c.chase.cycle();
      if (c.input.consumeLineToggle() && ctx.mode !== 'two-player') {
        ctx.lineAid = !ctx.lineAid;
        ctx.racingLine.setVisible(ctx.lineAid);
        if (!ctx.lineAid) ctx.hud.hidePace();
      }
      if (c.input.consumeReset()) {
        for (const cc of ctx.cars) {
          const idx = ctx.cars.indexOf(cc);
          const sp = gridSpawn(ctx.track, idx);
          cc.car.reset(sp.position, sp.yaw);
          cc.state = carState();
        }
        ctx.state.finishOrder = [];
        ctx.state.finishShown = false;
        ctx.hud.setLap(1, ctx.state.totalLaps);
        ctx.hud.setBest(null);
        ctx.hud.setLapTime(0);
        ctx.hud.clearAnnouncements();
        hideFinish();
      }
      if (c.input.consumeRescue()) {
        rescueCar(ctx.track, c.car);
      }
    } else {
      cmd = c.ai.update(c.car, allCars, dt);
    }
    c.car.applyControls(cmd, dt, wheelSurfaces(ctx.track, c.car));
  }

  // Step physics
  while (acc >= fixedDt) {
    ctx.world.step(fixedDt);
    acc -= fixedDt;
  }

  // Update visuals from physics
  for (const c of ctx.cars) c.car.update();

  // Containment failsafe — the barrier walls should make this unreachable,
  // but if a car ever ends up beyond the armco line (or under the world),
  // put it back on the track rather than letting it drive off the map.
  for (const c of ctx.cars) enforceBounds(ctx.track, c.car);

  // Keep the tight shadow frustum centred on the primary car.
  const focusCar = ctx.cars[ctx.primaryPlayerIdx];
  if (focusCar) ctx.updateShadowTarget(focusCar.car.body.position);

  // Update each player's chase camera
  for (const c of ctx.cars) {
    if (!c.isPlayer) continue;
    const v = c.car.body.velocity;
    const speedKmh = Math.hypot(v.x, v.y, v.z) * 3.6;
    c.chase.update(dt, c.car.body, speedKmh);
  }

  // Update HUD with the primary player's stats.
  const primary = ctx.cars[ctx.primaryPlayerIdx];
  if (primary && primary.isPlayer) {
    const t = primary.car.telemetry;
    ctx.hud.setSpeed(t.speedKmh, t.gearLabel, t.rpmFrac);
    updateLapTiming(primary, ctx.track, ctx.hud, ctx.state);
    ctx.hud.setWrongWay(!primary.state.finished && isWrongWay(ctx.track, primary.car));

    // Perfect-line aid: recolour the line against the player's current speed
    // and show the ideal speed for where they are right now.
    if (ctx.lineAid) {
      const v = primary.car.body.velocity;
      const speedMs = Math.hypot(v.x, v.z);
      ctx.racingLine.update(speedMs);
      const target = ctx.racingLine.profile[
        nearestFrameIndex(ctx.track, primary.car.body.position)];
      ctx.hud.setPace(target * 3.6, (speedMs - target) * 3.6);
    }
  }

  // Update non-primary cars' lap timing too (for race position).
  for (const c of ctx.cars) {
    if (c === primary) continue;
    updateLapTimingSilently(c, ctx.track, ctx.state);
  }

  // Race positions
  if (ctx.mode === 'quick-race') {
    const sorted = [...ctx.cars].sort((a, b) => b.state.progress - a.state.progress);
    const playerPos = sorted.indexOf(primary) + 1;
    ctx.hud.setPosition(playerPos, ctx.cars.length);
  }

  // Finish — show the results overlay once the race is over. Two-player ends as
  // soon as anyone crosses the final line; solo modes end when the player does.
  const raceOver = ctx.mode === 'two-player'
    ? ctx.state.finishOrder.length >= 1
    : primary && primary.state.finished;
  if (raceOver && !ctx.state.finishShown) {
    ctx.state.finishShown = true;
    ctx.hud.setWrongWay(false);
    showFinish(ctx);
  }

  // Mini-map
  ctx.hud.drawMinimap(ctx.cars.map((c) => ({
    pos: c.car.body.position,
    color: c.color,
    isPlayer: c.isPlayer,
  })));

  // Post effect time uniform
  if (ctx.mode !== 'two-player') {
    ctx.composer.passes.forEach((p) => {
      if (p.uniforms && p.uniforms.uTime) p.uniforms.uTime.value = now * 0.001;
    });
  }

  // Render
  if (ctx.mode === 'two-player') {
    renderSplitScreen(ctx);
  } else {
    ctx.composer.render();
  }
}

function renderSplitScreen(ctx) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const halfW = Math.floor(w / 2);

  ctx.renderer.setScissorTest(true);

  // Left — player 1
  ctx.renderer.setViewport(0, 0, halfW, h);
  ctx.renderer.setScissor(0, 0, halfW, h);
  ctx.camera.aspect = halfW / h;
  ctx.camera.updateProjectionMatrix();
  ctx.renderer.render(ctx.scene, ctx.camera);

  // Right — player 2
  ctx.renderer.setViewport(halfW, 0, w - halfW, h);
  ctx.renderer.setScissor(halfW, 0, w - halfW, h);
  ctx.camera2.aspect = (w - halfW) / h;
  ctx.camera2.updateProjectionMatrix();
  ctx.renderer.render(ctx.scene, ctx.camera2);

  // Restore for any subsequent full-screen passes (the next 1P render).
  ctx.renderer.setScissorTest(false);
  ctx.renderer.setViewport(0, 0, w, h);
  ctx.renderer.setScissor(0, 0, w, h);
}

function frame() {
  return new Promise((res) => requestAnimationFrame(() => res()));
}

// ---------- Surface detection ----------
// Per-wheel surface lookup so half-on-grass actually behaves like it.
// Uses the car's nearest centreline frame as a hint, then refines per wheel
// in a small window — cheap enough to run for every car every frame.
const _surfScratch = ['road', 'road', 'road', 'road'];

function wheelSurfaces(track, car) {
  const frames = track.frames;
  const n = frames.length;
  const hint = nearestFrameIndex(track, car.body.position);
  for (let w = 0; w < 4; w++) {
    const wi = car.vehicle.wheelInfos[w];
    const p = wi.isInContact
      ? wi.raycastResult.hitPointWorld
      : wi.chassisConnectionPointWorld;
    // Refine nearest frame around the hint (frames are ~2.6 m apart).
    let bestI = hint;
    let bestD = Infinity;
    for (let k = -4; k <= 4; k++) {
      const i = (hint + k + n) % n;
      const dx = frames[i].pos.x - p.x;
      const dz = frames[i].pos.z - p.z;
      const d = dx * dx + dz * dz;
      if (d < bestD) { bestD = d; bestI = i; }
    }
    const f = frames[bestI];
    const lat = Math.abs(
      (p.x - f.pos.x) * f.left.x + (p.z - f.pos.z) * f.left.z);
    const halfRoad = track.width / 2;
    if (lat <= halfRoad) _surfScratch[w] = 'road';
    else if (lat <= halfRoad + track.kerbWidth) _surfScratch[w] = 'kerb';
    else _surfScratch[w] = track.isGravel && track.isGravel(bestI) ? 'gravel' : 'grass';
  }
  return _surfScratch;
}

// ---------- Rescue (back to track) ----------

function rescueCar(track, car) {
  const pos = car.body.position;
  const frames = track.frames;
  // Look ahead a few frames so we drop the car back onto the track facing
  // forward, not at the exact nearest point (which can be behind a barrier).
  let bestI = 0;
  let bestD = Infinity;
  for (let i = 0; i < frames.length; i++) {
    const dx = frames[i].pos.x - pos.x;
    const dz = frames[i].pos.z - pos.z;
    const d = dx * dx + dz * dz;
    if (d < bestD) { bestD = d; bestI = i; }
  }
  const aheadI = (bestI + 4) % frames.length;
  const f = frames[aheadI];
  const respawn = new THREE.Vector3(f.pos.x, f.pos.y + 1.0, f.pos.z);
  const yaw = Math.atan2(f.tan.x, f.tan.z);
  car.reset(respawn, yaw);
}

// Auto-rescue any car that escapes the playable area: laterally past the
// armco line (plus a margin so wall contact never triggers it) or fallen
// below the world.
function enforceBounds(track, car) {
  const pos = car.body.position;
  if (pos.y < -2) {
    rescueCar(track, car);
    return;
  }
  const f = track.frames[nearestFrameIndex(track, pos)];
  const lat = Math.abs(
    (pos.x - f.pos.x) * f.left.x + (pos.z - f.pos.z) * f.left.z);
  if (lat > track.armcoOffset + 2.5) rescueCar(track, car);
}

// ---------- Lap timing ----------

// Core lap bookkeeping shared by the HUD-driven player path and the silent
// (AI / 2nd-player) path. Returns the event that just occurred, one of:
//   null | 'lap' | 'final' | 'finish'
function advanceLap(carEntry, track, state, now) {
  const st = carEntry.state;
  if (st.finished) return null;
  const cp = nearestCurveT(track, carEntry.car.body.position);
  if (cp > 0.4 && cp < 0.6) st.sectorReached = true;
  let event = null;
  if (st.sectorReached && st.lastT > 0.92 && cp < 0.08) {
    const lapMs = now - st.lapStart;
    if (st.bestMs == null || lapMs < st.bestMs) st.bestMs = lapMs;
    st.sectorReached = false;
    if (st.lap >= state.totalLaps) {
      // Crossed the line on the final lap — the race is over for this car.
      st.finished = true;
      st.finishMs = now - st.raceStart;
      state.finishOrder.push(carEntry);
      st.lastT = cp;
      // Finished cars sort ahead of everyone, preserving finish order.
      st.progress = state.totalLaps + 100 - (state.finishOrder.length - 1);
      return 'finish';
    }
    st.lap += 1;
    st.lapStart = now;
    event = st.lap === state.totalLaps ? 'final' : 'lap';
  }
  st.lastT = cp;
  st.progress = (st.lap - 1) + cp;
  return event;
}

function updateLapTiming(carEntry, track, hud, state) {
  const st = carEntry.state;
  const prevBest = st.bestMs;
  const now = performance.now();
  const event = advanceLap(carEntry, track, state, now);
  if (st.bestMs !== prevBest) hud.setBest(st.bestMs);
  if (event === 'finish') {
    hud.setLap(state.totalLaps, state.totalLaps);
    hud.flashBanner('FINISH');
  } else if (event === 'final') {
    hud.setLap(st.lap, state.totalLaps);
    hud.flashBanner('FINAL LAP');
  } else if (event === 'lap') {
    hud.setLap(st.lap, state.totalLaps);
    hud.flashBanner(`LAP ${st.lap} / ${state.totalLaps}`);
  }
  if (!st.finished) hud.setLapTime(now - st.lapStart);
}

function updateLapTimingSilently(carEntry, track, state) {
  advanceLap(carEntry, track, state, performance.now());
}

function nearestFrameIndex(track, position) {
  const frames = track.frames;
  let bestI = 0;
  let bestD = Infinity;
  for (let i = 0; i < frames.length; i++) {
    const dx = frames[i].pos.x - position.x;
    const dz = frames[i].pos.z - position.z;
    const d = dx * dx + dz * dz;
    if (d < bestD) { bestD = d; bestI = i; }
  }
  return bestI;
}

function nearestCurveT(track, position) {
  return nearestFrameIndex(track, position) / track.frames.length;
}

// True when the car is driving against the track direction at speed.
function isWrongWay(track, car) {
  const v = car.body.velocity;
  const speed = Math.hypot(v.x, v.z);
  if (speed < 5) return false;
  const tan = track.frames[nearestFrameIndex(track, car.body.position)].tan;
  const align = (v.x * tan.x + v.z * tan.z) / speed;
  return align < -0.25;
}
