import * as THREE from 'three';

import { createScene } from './scene.js';
import { createPhysicsWorld } from './physics.js';
import { createTrack } from './track.js';
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

const TOTAL_LAPS = 3;
const MAX_KMH = 320;

const PLAYER1_COLOR = 0xc8161d;
const PLAYER2_COLOR = 0x1f6cff;
const AI_COLORS = [0xfacc15, 0x059669, 0xea580c];

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
  const { renderer, scene, camera, composer } = createScene(canvas);

  setProgress(0.25, 'Building physics world');
  await frame();
  const { world, materials } = createPhysicsWorld();

  setProgress(0.45, 'Laying asphalt');
  await frame();
  const track = createTrack(scene, world, materials);

  setProgress(0.7, 'Calibrating telemetry');
  await frame();
  const hud = createHud(MAX_KMH);
  hud.buildMinimap(track);

  // Second camera lives in main.js (composer only knows about the primary).
  const camera2 = new THREE.PerspectiveCamera(
    62, window.innerWidth / window.innerHeight, 0.3, 3000,
  );
  scene.add(camera2);

  setProgress(1.0, 'Ready');
  await frame();
  document.getElementById('loading').classList.add('fade');

  // ---- Mode selection ----
  const ctx = {
    renderer, scene, camera, camera2, composer, world, materials, track, hud,
    cars: [],
    primaryPlayerIdx: 0,
    mode: null,
    state: null,
  };

  document.querySelectorAll('button.mode').forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      startMode(ctx, mode);
    });
  });

  // ESC returns to the menu.
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && ctx.mode) {
      stopMode(ctx);
    }
  });

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

function startMode(ctx, mode) {
  // Tear down anything from a previous run.
  destroyCars(ctx);

  ctx.mode = mode;
  ctx.primaryPlayerIdx = 0;
  ctx.state = createGameState(mode);

  if (mode === 'time-trial') {
    addPlayerCar(ctx, SINGLE_PLAYER_BINDINGS, PLAYER1_COLOR, 0);
    ctx.hud.hidePosition();
  } else if (mode === 'quick-race') {
    addPlayerCar(ctx, SINGLE_PLAYER_BINDINGS, PLAYER1_COLOR, 0);
    for (let i = 0; i < 3; i++) {
      addAICar(ctx, AI_COLORS[i], i + 1, 0.78 + i * 0.04);
    }
    ctx.hud.setPosition(1, ctx.cars.length);
  } else if (mode === 'two-player') {
    addPlayerCar(ctx, WASD_BINDINGS, PLAYER1_COLOR, 0);
    addPlayerCar(ctx, ARROW_BINDINGS, PLAYER2_COLOR, 1);
    ctx.hud.hidePosition();
  }

  ctx.hud.setLap(1, TOTAL_LAPS);
  ctx.hud.setBest(null);

  hideMenu();
  ctx.hud.show();
}

function stopMode(ctx) {
  destroyCars(ctx);
  ctx.mode = null;
  ctx.state = null;
  ctx.hud.hide();
  ctx.hud.hidePosition();
  showMenu();
}

function createGameState(mode) {
  return {
    mode,
    perCar: [], // populated as cars are added
  };
}

function carState() {
  return {
    lap: 1,
    bestMs: null,
    lapStart: performance.now(),
    lastT: 0,
    sectorReached: false,
    finished: false,
    progress: 0, // lap + parametric t — used to sort race positions
  };
}

function addPlayerCar(ctx, bindings, color, gridIdx) {
  const car = createCar(ctx.world, ctx.materials, { color });
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

function addAICar(ctx, color, gridIdx, skill) {
  const car = createCar(ctx.world, ctx.materials, { color });
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
    c.car.vehicle.removeFromWorld(ctx.world);
    ctx.world.removeBody(c.car.body);
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
  for (const c of ctx.cars) {
    let cmd;
    if (c.isPlayer) {
      cmd = c.input.update(dt);
      if (c.input.consumeToggle()) c.chase.cycle();
      if (c.input.consumeReset()) {
        for (const cc of ctx.cars) {
          const idx = ctx.cars.indexOf(cc);
          const sp = gridSpawn(ctx.track, idx);
          cc.car.reset(sp.position, sp.yaw);
          cc.state = carState();
        }
        ctx.hud.setLap(1, TOTAL_LAPS);
        ctx.hud.setBest(null);
      }
      if (c.input.consumeRescue()) {
        rescueCar(ctx.track, c.car);
      }
    } else {
      cmd = c.ai.update(c.car);
    }
    applyDriving(c.car, cmd);
  }

  // Step physics
  while (acc >= fixedDt) {
    ctx.world.step(fixedDt);
    acc -= fixedDt;
  }

  // Update visuals from physics
  for (const c of ctx.cars) c.car.update();

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
    const v = primary.car.body.velocity;
    const speedKmh = Math.hypot(v.x, v.y, v.z) * 3.6;
    ctx.hud.setSpeed(speedKmh, gearLabel(speedKmh, primary.input.state));
    updateLapTiming(primary, ctx.track, ctx.hud);
  }

  // Update non-primary cars' lap timing too (for race position).
  for (const c of ctx.cars) {
    if (c === primary) continue;
    updateLapTimingSilently(c, ctx.track);
  }

  // Race positions
  if (ctx.mode === 'quick-race') {
    const sorted = [...ctx.cars].sort((a, b) => b.state.progress - a.state.progress);
    const playerPos = sorted.indexOf(primary) + 1;
    ctx.hud.setPosition(playerPos, ctx.cars.length);
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

// ---------- Driving model ----------
function applyDriving(car, ctrl) {
  const { vehicle, constants } = car;

  const speed = Math.hypot(car.body.velocity.x, car.body.velocity.z);
  const steerScale = 1 - Math.min(0.65, speed * 0.011);
  const steer = -ctrl.steer * constants.MAX_STEER * steerScale;
  vehicle.setSteeringValue(steer, 0);
  vehicle.setSteeringValue(steer, 1);

  const fwdSpeed = forwardSpeed(car);
  let engineForce = 0;
  let brakeForce = 0;

  if (ctrl.throttle > 0.01) {
    const t = Math.max(0, 1 - speed / 95);
    engineForce = constants.MAX_ENGINE_FORCE * ctrl.throttle * (0.55 + 0.45 * t);
  } else if (ctrl.brake > 0.01) {
    if (fwdSpeed > 1.0) {
      brakeForce = constants.MAX_BRAKE_FORCE * ctrl.brake;
    } else {
      engineForce = -constants.MAX_ENGINE_FORCE * 0.5 * ctrl.brake;
    }
  }

  vehicle.applyEngineForce(-engineForce, 2);
  vehicle.applyEngineForce(-engineForce, 3);

  const ROLL_RESIST = 0.4;
  const brakeFront = brakeForce * 0.65 + ROLL_RESIST;
  let brakeRear = brakeForce * 0.35 + ROLL_RESIST;
  if (ctrl.handbrake) brakeRear = constants.MAX_BRAKE_FORCE * 1.4;
  vehicle.setBrake(brakeFront, 0);
  vehicle.setBrake(brakeFront, 1);
  vehicle.setBrake(brakeRear, 2);
  vehicle.setBrake(brakeRear, 3);

  const brakeLevel = Math.min(1, Math.max(ctrl.brake, ctrl.handbrake ? 0.8 : 0));
  car.setBrakeLight(brakeLevel * 1.6);
}

function forwardSpeed(car) {
  const q = car.body.quaternion;
  const fx = 2 * (q.x * q.z + q.w * q.y);
  const fz = 1 - 2 * (q.x * q.x + q.y * q.y);
  const v = car.body.velocity;
  return v.x * fx + v.z * fz;
}

function gearLabel(speedKmh, ctrl) {
  if (speedKmh < 1) return ctrl.brake > 0.05 ? 'R' : 'N';
  if (speedKmh < 30) return '1';
  if (speedKmh < 65) return '2';
  if (speedKmh < 100) return '3';
  if (speedKmh < 145) return '4';
  if (speedKmh < 200) return '5';
  return '6';
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

// ---------- Lap timing ----------

function updateLapTiming(carEntry, track, hud) {
  const cp = nearestCurveT(track, carEntry.car.body.position);
  const st = carEntry.state;
  if (cp > 0.4 && cp < 0.6) st.sectorReached = true;
  if (st.sectorReached && st.lastT > 0.92 && cp < 0.08) {
    const now = performance.now();
    const lapMs = now - st.lapStart;
    if (st.bestMs == null || lapMs < st.bestMs) {
      st.bestMs = lapMs;
      hud.setBest(st.bestMs);
    }
    st.lap += 1;
    st.lapStart = now;
    st.sectorReached = false;
    if (st.lap > TOTAL_LAPS) st.lap = 1;
    hud.setLap(st.lap, TOTAL_LAPS);
  }
  st.lastT = cp;
  st.progress = (st.lap - 1) + cp;
  hud.setLapTime(performance.now() - st.lapStart);
}

function updateLapTimingSilently(carEntry, track) {
  const cp = nearestCurveT(track, carEntry.car.body.position);
  const st = carEntry.state;
  if (cp > 0.4 && cp < 0.6) st.sectorReached = true;
  if (st.sectorReached && st.lastT > 0.92 && cp < 0.08) {
    st.lap += 1;
    st.lapStart = performance.now();
    st.sectorReached = false;
    if (st.lap > TOTAL_LAPS) st.lap = 1;
  }
  st.lastT = cp;
  st.progress = (st.lap - 1) + cp;
}

function nearestCurveT(track, position) {
  const frames = track.frames;
  let bestI = 0;
  let bestD = Infinity;
  for (let i = 0; i < frames.length; i++) {
    const dx = frames[i].pos.x - position.x;
    const dz = frames[i].pos.z - position.z;
    const d = dx * dx + dz * dz;
    if (d < bestD) { bestD = d; bestI = i; }
  }
  return bestI / frames.length;
}
