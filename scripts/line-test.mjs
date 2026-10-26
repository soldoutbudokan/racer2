// The ideal-line solver (src/idealLine.js) on every circuit and car, in Node.
// Run: node scripts/line-test.mjs [track-id]
//
// Checks that each car's line stays on the asphalt with its margin, bends no
// more sharply than the car can steer, is solved the same way twice, beats
// the centreline by a clear margin in the planner's own lap time, differs
// between cars (the line is the car's own), is paired with a speed profile
// the car can hold, and costs little enough to solve at a circuit's build
// and in the menu's idle time.
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { TRACKS, segmentsForLength } from '../src/tracks.js';
import { CAR_SPECS, getDrivingLimits, getSteerCap } from '../src/carSpecs.js';
import { solveIdealLine, idealLineFor, lineBound } from '../src/idealLine.js';

function framesFor(def) {
  const cps = def.controlPoints.map(([x, z]) => new THREE.Vector3(x, 0, z));
  const curve = new THREE.CatmullRomCurve3(cps, def.closed !== false, def.curveType ?? 'catmullrom', def.tension ?? 0.5);
  const segments = segmentsForLength(curve.getLength());
  const frames = [];
  for (let i = 0; i < segments; i++) {
    const t = i / segments;
    const tan = curve.getTangentAt(t).normalize();
    frames.push({ t, pos: curve.getPointAt(t), tan, left: new THREE.Vector3(-tan.z, 0, tan.x) });
  }
  return frames;
}

const ids = Object.keys(CAR_SPECS);
for (const def of TRACKS.filter((t) => !process.argv[2] || t.id === process.argv[2])) {
  const frames = framesFor(def);
  const n = frames.length;
  const track = { frames, width: def.roadWidth };
  const lines = {};
  let slowest = 0;
  for (const id of ids) {
    const spec = CAR_SPECS[id];
    const t0 = performance.now();
    const line = idealLineFor(track, spec);
    const ms = performance.now() - t0;
    slowest = Math.max(slowest, ms);
    lines[id] = line;
    const bound = lineBound(def.roadWidth, spec);
    let maxOffset = 0, maxSlope = 0, maxKappa = 0, lapLength = 0;
    for (let i = 0; i < n; i++) {
      maxOffset = Math.max(maxOffset, Math.abs(line.offset[i]));
      maxSlope = Math.max(maxSlope, Math.abs(line.offset[(i + 1) % n] - line.offset[i]) / line.ds[i]);
      maxKappa = Math.max(maxKappa, Math.abs(line.kappa[i]));
      lapLength += line.ds[i];
      assert.ok(Number.isFinite(line.offset[i]) && Number.isFinite(line.profile[i]) && line.profile[i] > 0,
        `${def.id}/${id}: finite line and profile`);
    }
    const gain = 1 - line.lapTime / line.centreTime;
    // The profile is the plan the car is asked to hold: at every frame the
    // lateral acceleration it implies is inside the car's full-skill budget
    // with the aero load at that speed.
    const limits = getDrivingLimits(spec, 1);
    let worstLateral = 0;
    for (let i = 0; i < n; i++) {
      const v = line.profile[i];
      worstLateral = Math.max(worstLateral, v * v * Math.abs(line.kappa[i]) / limits.lateralAt(v));
    }
    // Full lock at walking pace, as the AI's swerve maths sizes it.
    const minRadius = spec.wheelbase / Math.tan(getSteerCap(spec, 3));
    console.log(JSON.stringify({ track: def.id, car: id, ms: +ms.toFixed(0), bound: +bound.toFixed(2),
      maxOffset: +maxOffset.toFixed(2), maxSlope: +maxSlope.toFixed(3), minRadius: +(1 / maxKappa).toFixed(1),
      centre: +line.centreTime.toFixed(2), line: +line.lapTime.toFixed(2), gain: +(gain * 100).toFixed(1),
      worstLateral: +worstLateral.toFixed(3), lapLength: +lapLength.toFixed(0) }));
    assert.ok(maxOffset <= bound + 1e-3, `${def.id}/${id}: the line stays inside its edge margin`);
    assert.ok(maxSlope < 0.6, `${def.id}/${id}: the line crosses the road at under 31°`);
    assert.ok(1 / maxKappa > minRadius, `${def.id}/${id}: no bend tighter than full lock`);
    assert.ok(gain > 0.04, `${def.id}/${id}: the line beats the centreline by over 4 % (${(gain * 100).toFixed(1)} %)`);
    assert.ok(worstLateral <= 1.001, `${def.id}/${id}: the profile stays inside the car's grip`);
    assert.ok(line.profile.every((v) => v <= limits.vMax + 1e-3), `${def.id}/${id}: the profile stays under the car's top speed`);
    assert.equal(idealLineFor(track, spec), line, `${def.id}/${id}: the line is cached per circuit and car`);
    const again = solveIdealLine(frames, def.roadWidth, spec);
    assert.deepEqual(Array.from(again.offset), Array.from(line.offset), `${def.id}/${id}: the solve is deterministic`);
  }
  // Each car's line is its own: the formula car and the V8 part by metres.
  const rms = (a, b) => Math.sqrt(a.offset.reduce((s, v, i) => s + (v - b.offset[i]) ** 2, 0) / n);
  const apart = rms(lines['open-wheel'], lines.muscle);
  console.log(JSON.stringify({ track: def.id, formulaVsV8Rms: +apart.toFixed(2), slowestSolveMs: +slowest.toFixed(0) }));
  assert.ok(apart > 0.5, `${def.id}: the formula car and the V8 take different lines (${apart.toFixed(2)} m rms)`);
  assert.ok(slowest < 1500, `${def.id}: a line solves in under 1.5 s (${slowest.toFixed(0)} ms)`);
}
console.log('PASS: every car has its own ideal line on every circuit, on the road, drivable, deterministic and quick to solve');
