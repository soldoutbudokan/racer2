import * as THREE from 'three';
import * as CANNON from 'cannon-es';

import { createScene } from './scene.js';
import { createPhysicsWorld } from './physics.js';
import { createTrack } from './track.js';
import { createCar } from './car.js';
import { createInput } from './controls.js';
import { createChaseCamera } from './camera.js';
import { createHud } from './hud.js';

const TOTAL_LAPS = 3;
const MAX_KMH = 320;

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

  setProgress(0.7, 'Assembling vehicle');
  await frame();
  const car = createCar(world, materials);
  scene.add(car.visual.root);
  car.visual.wheels.forEach((w) => scene.add(w));
  car.reset(track.spawn.position, track.spawn.yaw);

  setProgress(0.88, 'Calibrating telemetry');
  await frame();
  const input = createInput();
  const chase = createChaseCamera(camera);
  const hud = createHud(MAX_KMH);
  hud.setLap(1, TOTAL_LAPS);

  setProgress(1.0, 'Ready');
  await frame();
  document.getElementById('loading').classList.add('fade');
  hud.show();

  // ---------- Game state ----------
  const state = {
    lap: 1,
    bestMs: null,
    lapStart: performance.now(),
    lastT: 0,
    sectorReached: false, // tracks half-lap wraparound
  };

  // ---------- Loop ----------
  const fixedDt = 1 / 120;
  let acc = 0;
  let last = performance.now();

  function loop(now) {
    requestAnimationFrame(loop);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    acc += dt;

    const ctrl = input.update(dt);
    if (input.consumeToggle()) chase.cycle();
    if (input.consumeReset()) {
      car.reset(track.spawn.position, track.spawn.yaw);
      state.lap = 1;
      state.lapStart = performance.now();
      hud.setLap(state.lap, TOTAL_LAPS);
    }

    // Drive the vehicle
    applyDriving(car, ctrl);

    // Step physics (fixed step accumulator, sub-stepped if behind)
    while (acc >= fixedDt) {
      world.step(fixedDt);
      acc -= fixedDt;
    }

    // Update visuals from physics
    car.update();

    // Speed (km/h)
    const v = car.body.velocity;
    const speedMs = Math.hypot(v.x, v.y, v.z);
    const speedKmh = speedMs * 3.6;

    // Camera + HUD
    chase.update(dt, car.body, speedKmh);
    hud.setSpeed(speedKmh, gearLabel(speedKmh, ctrl));
    updateLapTiming(car, track, state, hud);

    // Update post effect time uniform (grain animation)
    composer.passes.forEach((p) => {
      if (p.uniforms && p.uniforms.uTime) p.uniforms.uTime.value = now * 0.001;
    });

    composer.render();
  }

  requestAnimationFrame(loop);
}

function frame() {
  return new Promise((res) => requestAnimationFrame(() => res()));
}

// ---------- Driving model ----------
function applyDriving(car, ctrl) {
  const { vehicle, constants } = car;

  // Steering — speed-sensitive. Less steering authority at high speed for
  // composure; more at low speed for tight maneuvers. Front wheels (0,1).
  const speed = Math.hypot(car.body.velocity.x, car.body.velocity.z);
  const steerScale = 1 - Math.min(0.65, speed * 0.011);
  const steer = -ctrl.steer * constants.MAX_STEER * steerScale;
  vehicle.setSteeringValue(steer, 0);
  vehicle.setSteeringValue(steer, 1);

  // Engine + brakes. RWD (rear wheels are 2,3). S brakes while moving forward,
  // engages reverse when nearly stopped.
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
      // Stopped or rolling backwards — apply reverse engine torque.
      engineForce = -constants.MAX_ENGINE_FORCE * 0.5 * ctrl.brake;
    }
  }

  // Cannon's RaycastVehicle drives in -indexForwardAxis when engineForce > 0
  // (forwardWS = surfNormal × axle resolves to -z for our convention). Negate
  // so a positive throttle moves the car in +z, aligning with the visual front.
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

  // Brake light intensity
  const brakeLevel = Math.min(1, Math.max(ctrl.brake, ctrl.handbrake ? 0.8 : 0));
  car.setBrakeLight(brakeLevel * 1.6);
}

function forwardSpeed(car) {
  // Project velocity onto chassis forward (local +Z)
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

// ---------- Lap timing ----------
function updateLapTiming(car, track, state, hud) {
  // Find nearest sample on the centreline -> parametric t in [0..1)
  const cp = nearestCurveT(track, car.body.position);
  // Wrap detection: passing from t≈1 -> t≈0 across start/finish
  if (cp > 0.4 && cp < 0.6) state.sectorReached = true;
  if (state.sectorReached && state.lastT > 0.92 && cp < 0.08) {
    // Crossed start/finish, completed a lap
    const now = performance.now();
    const lapMs = now - state.lapStart;
    if (state.bestMs == null || lapMs < state.bestMs) {
      state.bestMs = lapMs;
      hud.setBest(state.bestMs);
    }
    state.lap += 1;
    state.lapStart = now;
    state.sectorReached = false;
    if (state.lap > 3) state.lap = 1; // loop indefinitely
    hud.setLap(state.lap, 3);
  }
  state.lastT = cp;
  hud.setLapTime(performance.now() - state.lapStart);
}

const _tmpV = new THREE.Vector3();
function nearestCurveT(track, position) {
  // Coarse search over the pre-sampled frames, then refine
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
