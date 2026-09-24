// Deterministic AI laps through the actual car, track, tyre surfaces and barriers.
// Only canvas drawing is stubbed; physics runs unchanged without a browser.
// Run: node scripts/ai-test.mjs [track-id]
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createPhysicsWorld } from '../src/physics.js';
import { createAIDriver } from '../src/ai.js';
import { TRACKS } from '../src/tracks.js';

const context = new Proxy({}, {
  get(_target, key) {
    if (key === 'createImageData') return (w, h) => ({ data: new Uint8ClampedArray(w * h * 4) });
    if (key === 'getImageData') return (_x, _y, w, h) => ({ data: new Uint8ClampedArray(w * h * 4) });
    if (key === 'createLinearGradient' || key === 'createRadialGradient') return () => ({ addColorStop() {} });
    if (key === 'measureText') return () => ({ width: 10 });
    return () => {};
  },
  set() { return true; },
});
globalThis.document = { createElement: () => ({ width: 0, height: 0, getContext: () => context }) };
const { createCar } = await import('../src/car.js');
const { createTrack } = await import('../src/track.js');
const DT = 1 / 120;
const HOLD = { throttle: 0, brake: 0, steer: 0, handbrake: true };

function nearest(track, p) {
  let index = 0, distance = Infinity;
  track.frames.forEach((f, i) => {
    const d = (p.x - f.pos.x) ** 2 + (p.z - f.pos.z) ** 2;
    if (d < distance) { distance = d; index = i; }
  });
  return index;
}

function surfaces(track, car) {
  const hint = nearest(track, car.body.position), n = track.frames.length;
  return car.vehicle.wheelInfos.map((w) => {
    const p = w.isInContact ? w.raycastResult.hitPointWorld : w.chassisConnectionPointWorld;
    let index = hint, distance = Infinity;
    for (let k = -4; k <= 4; k++) {
      const i = (hint + k + n) % n, f = track.frames[i];
      const d = (p.x - f.pos.x) ** 2 + (p.z - f.pos.z) ** 2;
      if (d < distance) { distance = d; index = i; }
    }
    const f = track.frames[index];
    const lat = Math.abs((p.x - f.pos.x) * f.left.x + (p.z - f.pos.z) * f.left.z);
    if (lat <= track.width / 2) return 'road';
    if (lat <= track.width / 2 + track.kerbWidth) return 'kerb';
    return track.isGravel(index) ? 'gravel' : 'grass';
  });
}

for (const def of TRACKS.filter((t) => !process.argv[2] || t.id === process.argv[2])) {
  const { world, materials } = createPhysicsWorld();
  const track = createTrack(new THREE.Scene(), world, materials, def);
  const car = createCar(world, materials);
  const f = track.frames[0], n = track.frames.length;
  car.reset({ x: f.pos.x, y: f.pos.y + 0.7, z: f.pos.z }, Math.atan2(f.tan.x, f.tan.z));
  for (let i = 0; i < 90; i++) { car.applyControls(HOLD, DT); world.step(DT); }
  const driver = createAIDriver(track, { skill: 0.85 });
  let last = nearest(track, car.body.position), progress = 0, maxOffset = 0, offRoad = 0;
  let lapTime = null, reverseTime = 0;
  for (let i = 0; i < 180 / DT; i++) {
    car.applyControls(driver.update(car, [], DT), DT, surfaces(track, car));
    world.step(DT);
    if (car.telemetry.gearLabel === 'R') reverseTime += DT;
    if (i % 12 !== 0) continue;
    const index = nearest(track, car.body.position), f = track.frames[index], p = car.body.position;
    let advance = index - last;
    if (advance < -n / 2) advance += n;
    if (advance > n / 2) advance -= n;
    progress += advance;
    last = index;
    const offset = Math.abs((p.x - f.pos.x) * f.left.x + (p.z - f.pos.z) * f.left.z);
    maxOffset = Math.max(maxOffset, offset);
    if (offset > track.width / 2 - 1) offRoad += DT * 12;
    if (progress >= n) { lapTime = i * DT; break; }
  }
  const result = { track: def.id, lapTime, maxOffset: +maxOffset.toFixed(2), offRoad: +offRoad.toFixed(2), reverseTime: +reverseTime.toFixed(2) };
  console.log(JSON.stringify(result));
  assert.ok(lapTime !== null, `${def.id}: complete a lap within 180 s`);
  assert.equal(reverseTime, 0, `${def.id}: no recovery needed on a clear lap`);
  assert.equal(offRoad, 0, `${def.id}: keep all four wheels within the road`);
  if (def.id === 'gp') {
    const blockers = Array.from({ length: 3 }, () => createCar(world, materials));
    let contacts = 0;
    car.body.addEventListener('collide', (event) => {
      if (blockers.some((c) => c.body === event.body)) contacts++;
    });
    function place(c, x, z) { c.reset({ x, y: 0.7, z }, 0); }
    function settle() {
      for (let i = 0; i < 90; i++) {
        for (const c of [car, ...blockers]) c.applyControls(HOLD, DT);
        world.step(DT);
      }
    }
    function trafficRun(seconds, driver, active) {
      let reverse = 0, maxLat = 0, firstSide = 0;
      for (let i = 0; i < seconds / DT; i++) {
        const ctrl = driver.update(car, active, DT);
        car.applyControls(ctrl, DT, surfaces(track, car));
        for (const c of blockers) c.applyControls(HOLD, DT);
        world.step(DT);
        if (car.telemetry.gearLabel === 'R') reverse += DT;
        const p = car.body.position, f = track.frames[nearest(track, p)];
        maxLat = Math.max(maxLat, Math.abs((p.x - f.pos.x) * f.left.x + (p.z - f.pos.z) * f.left.z));
        if (!firstSide && Math.abs(car.body.position.x) > 0.5) firstSide = Math.sign(car.body.position.x);
      }
      return { z: +car.body.position.z.toFixed(2), maxLat: +maxLat.toFixed(2), reverse, contacts, firstSide };
    }
    // A stopped car with a clear passing lane must not stop the entire field.
    place(car, 0, 0);
    blockers.forEach((c, i) => place(c, i ? 1000 + i * 20 : 0, i ? 1000 : 65));
    settle();
    car.body.velocity.z = 20;
    contacts = 0;
    const pass = trafficRun(9, createAIDriver(track), [blockers[0]]);
    console.log('pass stopped car', JSON.stringify(pass));
    assert.ok(pass.z > 85 && pass.maxLat < track.width / 2 - 1 && pass.contacts === 0 && pass.reverse === 0,
      'pass a stopped car without contact, leaving the road or selecting reverse');

    // Both adjacent lanes occupied: wait in drive, then move when it clears.
    place(car, 0, 59.5);
    place(blockers[0], 0, 65);
    place(blockers[1], -3.3, 59.5);
    place(blockers[2], 3.3, 59.5);
    settle(); contacts = 0;
    const queueDriver = createAIDriver(track);
    const queue = trafficRun(6, queueDriver, blockers);
    console.log('blocked queue', JSON.stringify(queue));
    assert.ok(queue.reverse === 0 && queue.contacts === 0 && Math.abs(queue.z - 59.5) < 1,
      'hold behind blocked traffic without reversing or contact');
    blockers.forEach((c, i) => place(c, 1000 + i * 20, 1000));
    const released = trafficRun(3, queueDriver, []);
    assert.ok(released.z > queue.z + 8 && released.reverse === 0, 'resume driving when the queue clears');

    // A car alongside blocks that passing side. Use the open side, without
    // changing the decision when the caller supplies traffic in another order.
    for (const order of [false, true]) {
      place(car, 0, 0); place(blockers[0], 0, 30);
      place(blockers[1], -3.3, 0); place(blockers[2], 1000, 1000);
      settle(); contacts = 0; car.body.velocity.z = 20;
      const cars = [blockers[0], blockers[1]];
      const flank = trafficRun(6, createAIDriver(track), order ? cars.reverse() : cars);
      console.log('pass with occupied side', JSON.stringify(flank));
      assert.ok(flank.z > 50 && flank.contacts === 0 && flank.reverse === 0 && flank.maxLat < 6 && flank.firstSide === 1,
        'pass on the clear side without hitting the car alongside');
    }

    // The car ahead is just across the lap seam, not a whole lap behind.
    place(car, 0, -30); place(blockers[0], 0, 0);
    place(blockers[1], 1000, 1000); place(blockers[2], 1020, 1000);
    settle(); contacts = 0; car.body.velocity.z = 20;
    const seam = trafficRun(6, createAIDriver(track), [blockers[0]]);
    console.log('pass across start line', JSON.stringify(seam));
    assert.ok(seam.z > 20 && seam.contacts === 0 && seam.reverse === 0 && seam.maxLat < 6,
      'recognise and pass traffic across the start/finish seam');

    // Four drivers share the physical circuit for a complete lap. Update at
    // 60 Hz while physics runs at 120 Hz, as it does during normal gameplay.
    const field = [car, ...blockers];
    field.forEach((c, i) => place(c, i % 2 ? 2.8 : -2.8, -6 - Math.floor(i / 2) * 8));
    settle(); contacts = 0;
    const drivers = field.map((_, i) => createAIDriver(track, { skill: 0.74 + i * 0.04 }));
    const totals = field.map(() => 0), previous = field.map((c) => nearest(track, c.body.position));
    const commands = field.map(() => HOLD);
    let fieldOffRoad = 0, fieldReverse = 0;
    const maxOffsets = field.map(() => 0);
    for (let i = 0; i < 110 / DT; i++) {
      field.forEach((c, k) => {
        if (i % 2 === 0) commands[k] = { ...drivers[k].update(c, field, DT * 2) };
        c.applyControls(commands[k], DT, surfaces(track, c));
      });
      world.step(DT);
      if (i % 12) continue;
      field.forEach((c, k) => {
        const idx = nearest(track, c.body.position), f = track.frames[idx], p = c.body.position;
        let advance = idx - previous[k];
        if (advance < -n / 2) advance += n;
        if (advance > n / 2) advance -= n;
        totals[k] += advance; previous[k] = idx;
        const off = Math.abs((p.x - f.pos.x) * f.left.x + (p.z - f.pos.z) * f.left.z);
        maxOffsets[k] = Math.max(maxOffsets[k], off);
        if (off > track.width / 2 - 1) fieldOffRoad += 0.1;
        if (c.telemetry.gearLabel === 'R') fieldReverse += 0.1;
      });
    }
    console.log('race field', JSON.stringify({ laps: totals.map((t) => +(t / n).toFixed(2)), fieldOffRoad, fieldReverse, contacts, maxOffsets }));
    assert.ok(totals.every((t) => t >= n), 'every driver completes a lap in traffic');
    assert.equal(fieldReverse, 0, 'race field does not get stuck or select reverse');
    assert.equal(fieldOffRoad, 0, 'race field stays on the road');
    assert.equal(contacts, 0, 'the lead car finishes its race without contact');
    blockers.forEach((c) => c.dispose());
  }
  car.dispose();
  track.dispose();
}
