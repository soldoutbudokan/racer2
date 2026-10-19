// Deterministic checks of the real vehicle dynamics, with drawing alone stubbed.
// Run: node scripts/car-balance-test.mjs [--all-tracks] (no browser or dev server).
import assert from 'node:assert/strict';
import * as CANNON from 'cannon-es';
import { createPhysicsWorld } from '../src/physics.js';
import { CAR_SPECS, getCarSpec } from '../src/carSpecs.js';
import { CAR_CHOICES } from '../src/carSelection.js';

const canvasContext = new Proxy({}, {
  get(_target, key) {
    if (key === 'createImageData') return (w, h) => ({ data: new Uint8ClampedArray(w * h * 4) });
    if (key === 'getImageData') return (_x, _y, w, h) => ({ data: new Uint8ClampedArray(w * h * 4) });
    if (key === 'createLinearGradient' || key === 'createRadialGradient') return () => ({ addColorStop() {} });
    if (key === 'measureText') return () => ({ width: 10 });
    return () => {};
  },
  set() { return true; },
});
globalThis.document = { createElement: () => ({ width: 0, height: 0, getContext: () => canvasContext }) };
const { createCar } = await import('../src/car.js');
const DT = 1 / 120;
const ROAD = ['road', 'road', 'road', 'road'];
const GRASS = ['grass', 'grass', 'grass', 'grass'];
const COAST = { throttle: 0, brake: 0, steer: 0, handbrake: false };
const POWER = { ...COAST, throttle: 1 };
const BRAKE = { ...COAST, brake: 1 };
const ids = ['gt', 'hatch', 'open-wheel', 'muscle', 'roadster', 'supercar'];
assert.deepEqual(Object.keys(CAR_SPECS), ids);
assert.equal(getCarSpec('__proto__'), CAR_SPECS.gt);
assert.equal(getCarSpec('unknown'), CAR_SPECS.gt);

function measure(id) {
  const { world, materials } = createPhysicsWorld();
  const ground = new CANNON.Body({ mass: 0, material: materials.groundMat });
  ground.addShape(new CANNON.Plane());
  ground.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
  world.addBody(ground);
  const car = createCar(world, materials, { archetype: id });
  assert.equal(car.spec, CAR_SPECS[id]);
  assert.equal(car.body.mass, car.spec.massKg);
  const step = (ctrl, surface = ROAD) => {
    car.applyControls(ctrl, DT, surface);
    world.step(DT);
  };
  const speed = () => Math.hypot(car.body.velocity.x, car.body.velocity.z) * 3.6;
  function reset(kmh = 0) {
    car.reset({ x: 0, y: 0.8, z: 0 });
    for (let i = 0; i < 120; i++) step(COAST);
    assert.equal(car.vehicle.wheelInfos.filter(w => w.isInContact).length, 4);
    car.body.velocity.z = kmh / 3.6;
  }
  reset();
  let zero100 = null, zero160 = null, start80 = null, rolling = null;
  for (let i = 1; i <= 70 / DT; i++) {
    step(POWER);
    const kmh = speed();
    if (zero100 === null && kmh >= 100) zero100 = i * DT;
    if (zero160 === null && kmh >= 160) zero160 = i * DT;
    if (start80 === null && kmh >= 80) start80 = i * DT;
    if (rolling === null && kmh >= 160) rolling = i * DT - start80;
  }
  const topSpeed = speed();
  reset(100);
  const start = car.body.position.clone();
  for (let i = 0; i < 10 / DT && speed() > 1; i++) step(BRAKE);
  const stopping = car.body.position.distanceTo(start);
  assert.ok(speed() <= 1, `${id}: brakes stop the car`);
  reset(80);
  for (let i = 0; i < 0.5 / DT; i++) step({ ...COAST, steer: 1 });
  const turnIn = Math.abs(car.body.angularVelocity.y);
  reset(180);
  let fastGrip = 0;
  for (let i = 0; i < 1.2 / DT; i++) {
    step({ ...COAST, steer: 0.6 });
    fastGrip = Math.max(fastGrip, speed() / 3.6 * Math.abs(car.body.angularVelocity.y));
  }
  reset(100);
  for (let i = 0; i < 3 / DT; i++) step(POWER, GRASS);
  const grassSpeed = speed();
  car.dispose();
  return { id, zero100, zero160, rolling, topSpeed, stopping, turnIn, fastGrip, grassSpeed };
}

const results = ids.map(measure);
console.table(results.map(result => Object.fromEntries(Object.entries(result).map(([key, value]) =>
  [key, typeof value === 'number' ? +value.toFixed(2) : value]))));
const byId = Object.fromEntries(results.map(result => [result.id, result]));
for (const result of results) {
  assert.ok(Object.entries(result).every(([key, value]) => key === 'id' || Number.isFinite(value)),
    `${result.id}: all physical measurements are finite`);
  assert.ok(result.zero100 > 2.5 && result.zero100 < 9, `${result.id}: competitive launch`);
  assert.ok(result.topSpeed > 200 && result.topSpeed < 360, `${result.id}: competitive terminal speed`);
  assert.ok(result.stopping > 12 && result.stopping < 60, `${result.id}: usable but finite stopping distance`);
}
// The field has to be spread, not merely ordered. These are the gaps the
// 2026-10-18 redraw was asked for: the old six sat within a second to 100,
// within 20 % on turn-in and within 10 m from 100 km/h.
const span = key => Math.max(...results.map(r => r[key])) - Math.min(...results.map(r => r[key]));
assert.ok(span('zero100') > 1.2, `0-100 km/h spreads over a second (${span('zero100').toFixed(2)} s)`);
assert.ok(span('topSpeed') > 70, `terminal speed spreads over 70 km/h (${span('topSpeed').toFixed(0)})`);
assert.ok(span('stopping') > 10, `100-0 km/h spreads over 10 m (${span('stopping').toFixed(1)})`);
assert.ok(span('grassSpeed') > 40, `rough-surface pace spreads over 40 km/h (${span('grassSpeed').toFixed(0)})`);
// A car must lose at least one measured discipline to every other car: no
// universal winner on launch, top speed, brakes, turn-in, aero grip and runoff.
const scores = r => [-r.zero100, r.topSpeed, -r.stopping, r.turnIn, r.fastGrip, r.grassSpeed];
for (const a of results) for (const b of results) {
  if (a === b) continue;
  assert.ok(scores(a).some((value, i) => value < scores(b)[i] - Math.abs(scores(b)[i]) * 0.005),
    `${a.id} must give up a measurable capability to ${b.id}`);
}
// The menu's ratings must continue to describe the measured cars after tuning.
// Acceleration is judged on the launch and the pull to 160 together, so a
// four-wheel-drive launch and a 780 hp top end both count. Handling combines
// turn-in and fast-corner grip, so its two distinct strengths are checked
// below rather than reduced to a single misleading physical unit.
const ratings = Object.fromEntries(CAR_CHOICES.map(choice => [choice.id, choice.ratings]));
const pull = r => r.zero100 + r.zero160;
for (const a of results) for (const b of results) {
  if (pull(a) < pull(b) - 0.15) assert.ok(ratings[a.id].acceleration >= ratings[b.id].acceleration,
    `${a.id}/${b.id}: acceleration ratings agree with the pull to 160`);
  if (a.topSpeed > b.topSpeed + 3) assert.ok(ratings[a.id].speed >= ratings[b.id].speed,
    `${a.id}/${b.id}: speed ratings agree with terminal speed`);
  if (a.stopping < b.stopping - 1) assert.ok(ratings[a.id].braking >= ratings[b.id].braking,
    `${a.id}/${b.id}: brake ratings agree with stopping distance`);
}
assert.ok(byId.supercar.topSpeed > byId.hatch.topSpeed + 60, 'long straights reward the hypercar');
assert.ok(byId.hatch.zero100 < byId.supercar.zero100 - 0.3, 'the four-wheel-drive hatch launches best');
assert.ok(byId['open-wheel'].stopping < byId.gt.stopping - 5, 'late braking rewards the formula car');
assert.ok(byId.roadster.turnIn > byId.muscle.turnIn * 1.12, 'tight direction changes reward the speedster');
assert.ok(byId.hatch.grassSpeed > byId['open-wheel'].grassSpeed + 40, 'rough surfaces reward the rally car');
assert.ok(byId.muscle.zero100 > byId.gt.zero100 + 0.8, 'the big block spins its tyres off the line');
console.log('PASS: six physical driving profiles, meaningful strengths and weaknesses, and no universal winner');

// A real circuit confirms the packages remain driveable by the same driver;
// its planner must read each instance's tyres, brakes and steering map.
const THREE = await import('three');
const { createTrack } = await import('../src/track.js');
const { createAIDriver } = await import('../src/ai.js');
const { createRacingLine } = await import('../src/racingLine.js');
const { TRACKS } = await import('../src/tracks.js');
const { wheelSurfaces, nearestFrameIndex } = await import('../src/surfaces.js');
const circuitIds = process.argv.includes('--all-tracks')
  ? TRACKS.map(track => track.id) : ['gp', 'sprint'];
for (const circuitId of circuitIds) {
  const { world, materials } = createPhysicsWorld();
  const scene = new THREE.Scene();
  const track = createTrack(scene, world, materials, TRACKS.find(t => t.id === circuitId));
  const line = createRacingLine(scene, track);
  const gtProfile = Array.from(line.profile);
  line.setCarSpec(CAR_SPECS.muscle);
  assert.ok(line.profile.some((v, i) => Math.abs(v - gtProfile[i]) > 1),
    'the driving aid changes its speed and braking advice for a different car');
  line.setCarSpec(CAR_SPECS.gt);
  assert.deepEqual(Array.from(line.profile), gtProfile, 'changing back restores the GT advice');
  line.dispose();
  const laps = [];
  for (const id of ids) {
    const car = createCar(world, materials, { archetype: id });
    const f = track.frames[0], n = track.frames.length;
    car.reset({ x: f.pos.x, y: f.pos.y + 0.7, z: f.pos.z }, Math.atan2(f.tan.x, f.tan.z));
    for (let i = 0; i < 90; i++) { car.applyControls(COAST, DT); world.step(DT); }
    const driver = createAIDriver(track, { skill: 0.85 });
    let previous = nearestFrameIndex(track, car.body.position), progress = 0;
    let lapTime = null, offRoad = 0, reverse = 0;
    for (let i = 0; i < 140 / DT; i++) {
      car.applyControls(driver.update(car, [], DT), DT, wheelSurfaces(track, car));
      world.step(DT);
      if (car.telemetry.gearLabel === 'R') reverse += DT;
      if (i % 12 !== 0) continue;
      const index = nearestFrameIndex(track, car.body.position), f = track.frames[index], p = car.body.position;
      let advance = index - previous;
      if (advance < -n / 2) advance += n;
      if (advance > n / 2) advance -= n;
      progress += advance;
      previous = index;
      const offset = Math.abs((p.x - f.pos.x) * f.left.x + (p.z - f.pos.z) * f.left.z);
      if (offset > track.width / 2 - 1) offRoad += DT * 12;
      if (progress >= n) { lapTime = i * DT; break; }
    }
    laps.push({ track: circuitId, id, lapTime, offRoad: +offRoad.toFixed(2), reverse: +reverse.toFixed(2) });
    console.log(JSON.stringify(laps.at(-1)));
    assert.ok(lapTime !== null, `${circuitId}/${id}: completes a lap`);
    assert.equal(offRoad, 0, `${circuitId}/${id}: keeps all four wheels on road`);
    assert.equal(reverse, 0, `${circuitId}/${id}: no recovery needed on a clear lap`);
    car.dispose();
  }
  const times = laps.map(lap => lap.lapTime);
  // Six genuinely different cars cannot lap within a few percent everywhere:
  // the oval is all fast corners and rewards wing alone. The bound is what
  // keeps a race winnable from any seat, not what makes the cars alike.
  const bound = circuitId === 'sprint' ? 1.26 : 1.14;
  assert.ok(Math.max(...times) / Math.min(...times) < bound,
    `${circuitId}: no package is uncompetitive: complete lap times stay within ${Math.round((bound - 1) * 100)}%`);
  track.dispose?.();
}
console.log('PASS: every package laps cleanly, remains competitive, and changes the driving aid');
