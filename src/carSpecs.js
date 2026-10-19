// ---------------------------------------------------------------------------
// The six driving packages. Every number here is read by car.js each physics
// step, by the AI planner (corner speeds, braking points) and by the perfect-
// line aid, so a car's character on the road and the advice it is given come
// from the same place.
//
// The field was redrawn on 2026-10-18 after the owner's complaint that the six
// cars "have little difference in handling, acceleration, etc." The previous
// set spread power-to-weight over 310–480 hp/t, grip over μ 1.31–1.68 and
// steering rate over 2.8–6.0, and shared one wheelbase, one collision box and
// one drive layout — so the balance probe measured 0–100 km/h within a second
// and turn-in within 20 % across the whole field. This set spreads the same
// quantities two to three times as far and adds the things that were missing:
//
//   wheelbase      2.40 m (speedster) … 2.95 m (classic V8)
//   trackWidth     1.68 m (speedster) … 1.86 m (hypercar)
//   cgHeight       centre of mass 0.40 m (formula) … 0.58 m (classic V8)
//                  above the road, which sets how hard the car dives and
//                  squats; it was 0.68 m for everyone before
//   frontDrive     the rally hatch is four-wheel drive
//   gripBalance    rear grip relative to front: the V8 oversteers, the hatch
//                  pushes
//   yawInertia     how willing the body is to rotate about its wheelbase
//   chassisHalf    a collision box the size of the car
//
// Every car is still a "homologated" club racer on the same 0.36 m tyres and
// 1.72 m track, so the shared chassis contract (car.js, stance.js) holds.
// ---------------------------------------------------------------------------

import { DEFAULT_CG_HEIGHT } from './stance.js';

const SHARED = {
  cgHeight: DEFAULT_CG_HEIGHT,   // centre of mass above the road, m (stance.js)
  trackWidth: 1.72,              // m between the tyre centres
  hoodForward: 0.25,             // hood camera's seat ahead of the chassis origin, m
  reverseRatio: 3.3,
  drivelineEff: 0.88,
  airDensity: 1.225,
  crr: 0.014,
  wheelInertia: 0.9,          // kg·m² per driven wheel/tyre/brake assembly
  loadMuClamp: 0.22,          // cap the load-sensitivity swing to ±22 %
  steerFloor: 0.02,           // rad of authority that always remains
  maxReverseSpeed: 8.5,       // m/s
  handbrake: 55,
  downforcePos: -0.25,        // applied slightly aft of CoM (wing bias)
  angularDamping: 0.25,
  yawInertia: 1,
  frontDrive: 0,
  gripBalance: 1,
};

function profile(id, spec) {
  const out = { ...SHARED, ...spec, id };
  for (const point of out.torqueCurve) Object.freeze(point);
  Object.freeze(out.torqueCurve);
  Object.freeze(out.gears);
  Object.freeze(out.mu);
  Object.freeze(out.surfaceDrag);
  Object.freeze(out.chassisHalf);
  return Object.freeze(out);
}

// Brake figures are cannon impulse clamps per 1/120 s step and wheel (N·s).
// The rear shares look tiny next to the fronts because they are sized to
// what the rear axle can hold under full dive: the chassis centre of mass
// sits 0.68 m up (stance.js) and transfers m·a·h/L forward, which on a 2.4 m
// speedster leaves the rears a few hundred newtons each. A rear share above
// that locks the rears before the fronts, and a car with locked rears and
// gripping fronts spins — which is exactly what the AI did on the first
// draft of this file.
export const CAR_SPECS = Object.freeze({
  // GT3 coupe — the reference car and the default. A front-engined 5.5 litre
  // V8 on slicks with a real wing: ~555 hp, 1300 kg, strong aero, the best
  // brakes in the field by stopping distance. Nothing about it is extreme;
  // everything about it is dependable, and it is what the other five are
  // measured against.
  gt: profile('gt', {
    wheelbase: 2.75, massKg: 1300, cgHeight: 0.50, trackWidth: 1.84, hoodForward: 0.55,
    chassisHalf: { x: 0.94, y: 0.32, z: 2.28 },
    idleRpm: 1200, redlineRpm: 8200, shiftUpRpm: 7900, shiftDownRpm: 3600, shiftTime: 0.14,
    torqueCurve: [[1200, 420], [2500, 520], [4000, 545], [5800, 565],
      [6800, 548], [7600, 520], [8200, 475]],
    gears: [3.40, 2.20, 1.62, 1.30, 1.08, 0.93], finalDrive: 3.60,
    engineInertia: 0.13, engineBrakeNm: 40,
    cdA: 1.00, clA: 2.40,
    mu: { road: 1.50, kerb: 1.25, grass: 0.50, gravel: 0.45 },
    surfaceDrag: { road: 0, kerb: 0, grass: 0.12, gravel: 0.20 },
    scrubCoef: 0.36, loadSensitivity: 0.13, slipGripFloor: 0.86,
    brakeFront: 68, brakeRear: 16,
    maxSteer: 0.60, steerRate: 4.4, steerSlipMargin: 2.0,
    yawInertia: 1.0,
  }),

  // Rally hatch — a two-litre turbo four, 300 hp through all four wheels on
  // gravel-spec tyres, 2.5 m between the axles. It leaves every slow corner
  // harder than anything here, barely notices the grass, and changes
  // direction like a go-kart; the price is a 230 km/h ceiling, modest brakes
  // and a nose that pushes when it is hurried.
  hatch: profile('hatch', {
    wheelbase: 2.50, massKg: 1230, cgHeight: 0.58, trackWidth: 1.72, hoodForward: 0.55,
    chassisHalf: { x: 0.88, y: 0.34, z: 1.95 },
    idleRpm: 1000, redlineRpm: 6800, shiftUpRpm: 6400, shiftDownRpm: 3000, shiftTime: 0.12,
    torqueCurve: [[1000, 310], [2200, 520], [2800, 580], [4500, 580],
      [5400, 480], [6200, 415], [6800, 360]],
    gears: [3.00, 2.10, 1.60, 1.28, 1.06, 0.90], finalDrive: 4.10,
    engineInertia: 0.16, engineBrakeNm: 30,
    frontDrive: 0.40,
    cdA: 1.12, clA: 1.20,
    mu: { road: 1.50, kerb: 1.42, grass: 0.95, gravel: 0.90 },
    surfaceDrag: { road: 0, kerb: 0, grass: 0.05, gravel: 0.08 },
    scrubCoef: 0.30, loadSensitivity: 0.09, slipGripFloor: 0.94,
    brakeFront: 50, brakeRear: 10,
    maxSteer: 0.70, steerRate: 5.8, steerSlipMargin: 2.4,
    gripBalance: 1.05, yawInertia: 0.85, angularDamping: 0.22,
  }),

  // Formula single-seater — 800 kg with the driver, a V10 that lives above
  // 9,000 rpm, and more downforce than the other five put together. Corner
  // speeds and braking points nothing else can touch, and it steers like a
  // scalpel. But it is a brick through the air with that wing stack, so the
  // straights belong to others, and off the asphalt it is helpless.
  'open-wheel': profile('open-wheel', {
    wheelbase: 2.90, massKg: 800, cgHeight: 0.40, trackWidth: 1.72, hoodForward: 0.10,
    chassisHalf: { x: 0.92, y: 0.22, z: 2.18 },
    idleRpm: 2500, redlineRpm: 11500, shiftUpRpm: 11000, shiftDownRpm: 5000, shiftTime: 0.07,
    torqueCurve: [[2500, 215], [5000, 290], [7500, 335], [9500, 348],
      [10500, 342], [11000, 335], [11500, 310]],
    gears: [3.60, 2.60, 2.00, 1.62, 1.35, 1.15, 1.00], finalDrive: 3.10,
    drivelineEff: 0.92,
    engineInertia: 0.06, engineBrakeNm: 55,
    cdA: 1.60, clA: 2.60, downforcePos: -0.12,
    mu: { road: 1.48, kerb: 1.10, grass: 0.30, gravel: 0.26 },
    surfaceDrag: { road: 0, kerb: 0, grass: 0.20, gravel: 0.30 },
    scrubCoef: 0.34, loadSensitivity: 0.16, slipGripFloor: 0.80,
    brakeFront: 54, brakeRear: 20,
    maxSteer: 0.48, steerRate: 6.5, steerSlipMargin: 1.9,
    gripBalance: 0.98, yawInertia: 0.90,
  }),

  // Classic V8 — a 7 litre big block in a 1720 kg coupe on street-compound
  // tyres, four long gears, no aero to speak of. Monstrous mid-range: it
  // out-pulls everything but the hypercar from 80 to 200. It also takes
  // 40 m to stop from 100, rolls onto its outside tyre, steers slowly, and
  // the rears let go before the fronts do. The hard car.
  muscle: profile('muscle', {
    wheelbase: 2.95, massKg: 1600, cgHeight: 0.58, trackWidth: 1.78, hoodForward: 0.40,
    chassisHalf: { x: 0.95, y: 0.34, z: 2.42 },
    idleRpm: 800, redlineRpm: 6200, shiftUpRpm: 5800, shiftDownRpm: 2200, shiftTime: 0.38,
    torqueCurve: [[800, 600], [1800, 820], [2800, 940], [3800, 980],
      [4800, 960], [5600, 860], [6200, 720]],
    gears: [2.45, 1.75, 1.30, 1.00], finalDrive: 3.25,
    drivelineEff: 0.86,
    engineInertia: 0.32, engineBrakeNm: 45,
    cdA: 1.05, clA: 0.90, downforcePos: -0.10,
    mu: { road: 1.40, kerb: 1.10, grass: 0.55, gravel: 0.48 },
    surfaceDrag: { road: 0, kerb: 0, grass: 0.12, gravel: 0.20 },
    scrubCoef: 0.44, loadSensitivity: 0.20, slipGripFloor: 0.78,
    brakeFront: 60, brakeRear: 30, handbrake: 62,
    maxSteer: 0.55, steerRate: 2.6, steerSlipMargin: 2.2,
    gripBalance: 0.94, yawInertia: 1.25, angularDamping: 0.30,
  }),

  // Speedster — 820 kg, a 2.0 flat-four that makes 240 hp at 8,000 rpm, no
  // roof, no wing and the shortest wheelbase here. It carries speed through
  // slow and medium corners on mechanical grip alone and turns in faster
  // than anything with a roof, but it has nothing to lean on in fast bends
  // and nothing in reserve on the straights.
  roadster: profile('roadster', {
    wheelbase: 2.40, massKg: 820, cgHeight: 0.46, trackWidth: 1.68, hoodForward: 0.40,
    chassisHalf: { x: 0.90, y: 0.28, z: 1.95 },
    idleRpm: 1100, redlineRpm: 8800, shiftUpRpm: 8400, shiftDownRpm: 3800, shiftTime: 0.20,
    torqueCurve: [[1200, 200], [3000, 255], [5000, 272], [6800, 264],
      [8000, 236], [8800, 210]],
    gears: [3.20, 2.10, 1.55, 1.24, 1.03, 0.88], finalDrive: 3.90,
    drivelineEff: 0.90,
    engineInertia: 0.10, engineBrakeNm: 26,
    cdA: 0.86, clA: 0.45, downforcePos: -0.15,
    mu: { road: 1.56, kerb: 1.38, grass: 0.60, gravel: 0.52 },
    surfaceDrag: { road: 0, kerb: 0, grass: 0.10, gravel: 0.18 },
    scrubCoef: 0.27, loadSensitivity: 0.08, slipGripFloor: 0.92,
    brakeFront: 44, brakeRear: 6, handbrake: 42,
    maxSteer: 0.74, steerRate: 7.0, steerSlipMargin: 2.3,
    gripBalance: 0.97, yawInertia: 0.80, angularDamping: 0.20,
  }),

  // Hypercar — 1480 kg, a twin-turbo V12 near 780 hp through a seven-speed
  // twin-clutch box and the slipperiest body in the field. Past 250 km/h it
  // is alone. It needs a careful right foot in the low gears, its mass tells
  // on the brakes and in direction changes, and its tyres are a road
  // compound, so the GT3 and the formula car hold more mid-corner.
  supercar: profile('supercar', {
    wheelbase: 2.80, massKg: 1480, cgHeight: 0.50, trackWidth: 1.86, hoodForward: 0.60,
    chassisHalf: { x: 0.96, y: 0.30, z: 2.30 },
    idleRpm: 1000, redlineRpm: 8800, shiftUpRpm: 8400, shiftDownRpm: 3400, shiftTime: 0.10,
    torqueCurve: [[1000, 460], [2500, 820], [4500, 900], [6500, 850],
      [7800, 700], [8800, 600]],
    gears: [3.40, 2.40, 1.80, 1.42, 1.15, 0.95, 0.80], finalDrive: 3.20,
    drivelineEff: 0.90,
    engineInertia: 0.17, engineBrakeNm: 50,
    cdA: 0.84, clA: 1.60, downforcePos: -0.20,
    mu: { road: 1.46, kerb: 1.16, grass: 0.42, gravel: 0.38 },
    surfaceDrag: { road: 0, kerb: 0, grass: 0.14, gravel: 0.22 },
    scrubCoef: 0.38, loadSensitivity: 0.15, slipGripFloor: 0.84,
    brakeFront: 72, brakeRear: 14,
    maxSteer: 0.56, steerRate: 3.8, steerSlipMargin: 2.0,
    gripBalance: 1.02, yawInertia: 1.05,
  }),
});

export function getCarSpec(id = 'gt') {
  return Object.hasOwn(CAR_SPECS, id) ? CAR_SPECS[id] : CAR_SPECS.gt;
}

export function getSteerCap(spec, speed) {
  return Math.min(spec.maxSteer,
    spec.mu.road * 9.82 * spec.steerSlipMargin * spec.wheelbase /
    Math.max(1, speed * speed) + spec.steerFloor);
}

export const peakPowerW = spec => Math.max(...spec.torqueCurve.map(([rpm, torque]) =>
  rpm * torque * Math.PI / 30));

const wheelPowerW = spec => peakPowerW(spec) * spec.drivelineEff;

// Conservative planning estimates for the AI and the perfect-line aid. They
// were calibrated against the GT3 (the reference car) and scale from its
// package to the others, so changing cars also changes the AI's braking
// points and the player's recommended pace.
export function getCarPerformance(spec = CAR_SPECS.gt) {
  const gt = CAR_SPECS.gt;
  const wheelPower = 250000 * wheelPowerW(spec) / wheelPowerW(gt);
  const gripRatio = spec.mu.road / gt.mu.road;
  const brakeRatio = ((spec.brakeFront + spec.brakeRear) / spec.massKg) /
    ((gt.brakeFront + gt.brakeRear) / gt.massKg);
  // Four driven tyres put more of the engine down out of a slow corner.
  const traction = spec.frontDrive > 0 ? 1.25 : 1;
  return {
    aLat: 13 * gripRatio,
    aBrake: 10 * Math.min(gripRatio, brakeRatio),
    aAccel: 7.5 * gripRatio * traction,
    vMax: 78 * Math.cbrt(wheelPower / 250000 * gt.cdA / spec.cdA),
    wheelPower,
    mass: spec.massKg,
    halfRhoCdA: 0.5 * spec.airDensity * spec.cdA,
    rollingDrag: spec.crr * spec.massKg * 9.82,
  };
}

// Preserve the proven planning margin while accounting for each package's
// gain or loss in aerodynamic grip. The speed-squared term matters in fast
// bends; it cannot turn a low-grip aero car into a hairpin specialist.
function aeroGripDelta(spec) {
  const gt = CAR_SPECS.gt;
  return 0.5 * spec.airDensity *
    (spec.mu.road * spec.clA / spec.massKg - gt.mu.road * gt.clA / gt.massKg);
}

export function getCornerSpeed(spec, curvature, baseAcceleration) {
  return Math.sqrt(baseAcceleration / Math.max(1e-4, curvature - aeroGripDelta(spec)));
}

export function getLateralAcceleration(spec, speed, baseAcceleration) {
  return Math.max(baseAcceleration * 0.65, baseAcceleration + aeroGripDelta(spec) * speed * speed);
}
