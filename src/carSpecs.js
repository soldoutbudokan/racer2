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
// and steering response within about a fifth across the whole field. This
// set widens the power-to-weight spread by half (300–550 hp/t), the steering
// rates (2.6–7.0) and the downforce (0.45–3.4 m²), keeps grip at μ 1.40–1.68,
// and adds the things that were missing:
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
// Every car still runs the same 0.36 m tyres, so the wheel and suspension
// contract (car.js, stance.js) holds; where the tyres sit — wheelbase and
// track — and where the mass sits over them is each car's own.
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
// The rear shares look small next to the fronts because they are sized to
// what the rear axle can hold under full dive: braking at a transfers
// m·a·h/L onto the front axle, h being the car's cgHeight and L its
// wheelbase, which on the 2.4 m speedster (h 0.46 m) at 1.5 g leaves the
// rears under a third of the car's weight. A rear share above that locks the
// rears before the fronts, and a car with locked rears and gripping fronts
// spins — which is exactly what the AI did on the first draft of this file,
// back when every car's centre of mass sat 0.68 m up.
export const CAR_SPECS = Object.freeze({
  // GT3 coupe — the reference car and the default. A front-engined 5.5 litre
  // V8 on slicks with a real wing: 555 hp, 1300 kg, strong aero and the best
  // brakes of the road cars. Nothing about it is extreme; everything about it
  // is dependable, and it is what the other five are measured against. Sixth
  // is an overdrive: it tops out in fifth.
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

  // Rally hatch — a two-litre turbo four, 367 hp through all four wheels on
  // gravel-spec tyres, 2.5 m between the axles. It is the quickest car here
  // to 100 km/h, leaves slow corners hard and barely notices the grass; the
  // price is a 230 km/h ceiling, the longest stops in the field and a nose
  // that pushes when it is hurried.
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
    mu: { road: 1.54, kerb: 1.46, grass: 0.95, gravel: 0.90 },
    surfaceDrag: { road: 0, kerb: 0, grass: 0.05, gravel: 0.08 },
    scrubCoef: 0.30, loadSensitivity: 0.09, slipGripFloor: 0.94,
    brakeFront: 50, brakeRear: 10,
    maxSteer: 0.70, steerRate: 5.8, steerSlipMargin: 2.4,
    gripBalance: 1.05, yawInertia: 0.85, angularDamping: 0.22,
  }),

  // Formula single-seater — 800 kg with the driver, a 440 hp V10 that lives
  // above 9,500 rpm through seven close ratios, and the most downforce in the
  // field. Corner speeds and braking points nothing else can touch. But it is
  // a brick through the air with that wing stack, so it tops out lowest and
  // the straights belong to others, and off the asphalt it is helpless.
  'open-wheel': profile('open-wheel', {
    wheelbase: 2.90, massKg: 800, cgHeight: 0.40, trackWidth: 1.72, hoodForward: 0.10,
    chassisHalf: { x: 0.92, y: 0.22, z: 2.18 },
    idleRpm: 2500, redlineRpm: 11500, shiftUpRpm: 11000, shiftDownRpm: 5000, shiftTime: 0.07,
    torqueCurve: [[2500, 183], [5000, 247], [7500, 285], [9500, 296],
      [10500, 291], [11000, 285], [11500, 264]],
    gears: [4.57, 4.02, 3.53, 3.10, 2.72, 2.39, 2.10], finalDrive: 3.10,
    drivelineEff: 0.92,
    engineInertia: 0.06, engineBrakeNm: 55,
    cdA: 1.75, clA: 3.40, downforcePos: -0.12,
    mu: { road: 1.48, kerb: 1.10, grass: 0.30, gravel: 0.26 },
    surfaceDrag: { road: 0, kerb: 0, grass: 0.20, gravel: 0.30 },
    scrubCoef: 0.34, loadSensitivity: 0.16, slipGripFloor: 0.80,
    brakeFront: 54, brakeRear: 20,
    maxSteer: 0.48, steerRate: 6.5, steerSlipMargin: 1.9,
    gripBalance: 0.98, yawInertia: 0.90,
  }),

  // Classic V8 — a 7 litre big block in a 1600 kg fastback on street-compound
  // tyres, four long gears, little aero. 980 Nm and a tall top gear make it
  // the second-fastest car on a long straight, but it lights up its rears off
  // the line and is the slowest to 100. It rolls onto its outside tyre,
  // steers slowly, and the rears let go before the fronts do. The hard car.
  muscle: profile('muscle', {
    wheelbase: 2.95, massKg: 1600, cgHeight: 0.58, trackWidth: 1.78, hoodForward: 0.40,
    chassisHalf: { x: 0.95, y: 0.34, z: 2.42 },
    idleRpm: 800, redlineRpm: 6200, shiftUpRpm: 5800, shiftDownRpm: 2200, shiftTime: 0.38,
    torqueCurve: [[800, 600], [1800, 820], [2800, 940], [3800, 980],
      [4800, 960], [5600, 860], [6200, 720]],
    gears: [2.45, 1.70, 1.25, 0.90], finalDrive: 3.25,
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

  // Speedster — 820 kg, a 2.0 flat-four that makes 265 hp at 8,000 rpm, no
  // roof, no wing and the shortest wheelbase here. It carries speed through
  // slow and medium corners on mechanical grip alone and has the quickest
  // steering in the field, but it has nothing to lean on in fast bends and
  // nothing in reserve on the straights.
  roadster: profile('roadster', {
    wheelbase: 2.40, massKg: 820, cgHeight: 0.46, trackWidth: 1.68, hoodForward: 0.40,
    chassisHalf: { x: 0.90, y: 0.28, z: 1.95 },
    idleRpm: 1100, redlineRpm: 8800, shiftUpRpm: 8400, shiftDownRpm: 3800, shiftTime: 0.20,
    torqueCurve: [[1200, 200], [3000, 255], [5000, 272], [6800, 264],
      [8000, 236], [8800, 210]],
    gears: [3.20, 2.65, 2.19, 1.81, 1.50, 1.24], finalDrive: 3.90,
    drivelineEff: 0.90,
    engineInertia: 0.10, engineBrakeNm: 26,
    cdA: 0.86, clA: 0.45, downforcePos: -0.15,
    mu: { road: 1.68, kerb: 1.49, grass: 0.60, gravel: 0.52 },
    surfaceDrag: { road: 0, kerb: 0, grass: 0.10, gravel: 0.18 },
    scrubCoef: 0.27, loadSensitivity: 0.08, slipGripFloor: 0.92,
    brakeFront: 44, brakeRear: 6, handbrake: 42,
    maxSteer: 0.74, steerRate: 7.0, steerSlipMargin: 2.3,
    gripBalance: 0.97, yawInertia: 0.80, angularDamping: 0.20,
  }),

  // Hypercar — 1480 kg, a twin-turbo V12 near 780 hp through a seven-speed
  // twin-clutch box and the slipperiest body in the field: the only car that
  // clears 300 km/h. It needs a careful right foot in the low gears, its mass
  // tells on the brakes and in direction changes, and its tyres are a road
  // compound, so the GT3 and the formula car hold more mid-corner. Seventh is
  // an overdrive.
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
    mu: { road: 1.44, kerb: 1.14, grass: 0.42, gravel: 0.38 },
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

// Crank torque at an engine speed, linear between the curve's points. car.js
// drives the engine with this; the planning maths below reads it too.
export function torqueAt(spec, rpm) {
  const c = spec.torqueCurve;
  if (rpm <= c[0][0]) return c[0][1];
  for (let i = 1; i < c.length; i++) {
    if (rpm <= c[i][0]) {
      const t = (rpm - c[i - 1][0]) / (c[i][0] - c[i - 1][0]);
      return c[i - 1][1] + (c[i][1] - c[i - 1][1]) * t;
    }
  }
  return c[c.length - 1][1];
}

const WHEEL_R = 0.36;   // stance.js WHEEL_RADIUS; kept local to avoid a cycle

/**
 * Flat-road terminal speed (m/s) and the gear it is reached in, from the same
 * force balance car.js integrates: the tractive force in the gear the
 * automatic box holds (with the soft rev limiter) against aerodynamic drag,
 * rolling resistance charged on weight plus downforce, and cannon's body
 * damping. It replaced a
 * power-to-drag cube-root estimate that assumed peak power at top speed,
 * which overstated every car and the formula car by 8 % — its drag stops it
 * well below its power peak.
 */
// The gear car.js's automatic box holds at road speed v: it upshifts once
// the road RPM passes shiftUpRpm, so the gear in use is the lowest one still
// under it (or top gear). Then the force at the road in that gear, with the
// soft rev limiter over the last 2 % of the band.
function boxGear(spec, v) {
  const rpmIn = (i) => v / (2 * Math.PI * WHEEL_R) * 60 * spec.gears[i] * spec.finalDrive;
  let i = 0;
  while (i < spec.gears.length - 1 && rpmIn(i) > spec.shiftUpRpm) i++;
  const overall = spec.gears[i] * spec.finalDrive;
  // Below idle the clutch slips and the engine sits at idle torque.
  const rpm = Math.max(spec.idleRpm, rpmIn(i));
  const limiter = Math.min(1, Math.max(0, (spec.redlineRpm - rpm) / (0.02 * spec.redlineRpm)));
  return {
    force: torqueAt(spec, rpm) * limiter * overall * spec.drivelineEff / WHEEL_R,
    gear: i + 1,
  };
}
const tractiveForceAt = (spec, v) => boxGear(spec, v).force;

// cannon damps every body's velocity by (1 - linearDamping)^dt, 0.01 by
// default and left there by car.js: a drag of m·v·−ln(0.99) on top of the
// aerodynamic one, ~1 kN on a GT3 at 270 km/h. The force balance has to
// carry it or it overstates every car's top speed by 5–9 %.
const BODY_DAMPING = -Math.log(1 - 0.01);

export function getTerminalSpeed(spec) {
  const mg = spec.massKg * 9.82;
  const q = 0.5 * spec.airDensity;
  const resist = (v) => q * spec.cdA * v * v + spec.crr * (mg + q * spec.clA * v * v)
    + BODY_DAMPING * spec.massKg * v;
  let v = 5;
  while (v < 150 && boxGear(spec, v).force > resist(v)) v += 0.05;
  return { speed: v, gear: boxGear(spec, Math.max(5, v - 0.5)).gear };
}

const wheelPowerW = spec => peakPowerW(spec) * spec.drivelineEff;

// Planning estimates for the AI and the perfect-line aid. Grip and braking
// are calibrated against the GT3 (the reference car) and scale from its
// package to the others; the top speed is each car's own force balance. So
// changing cars changes the AI's braking points and the player's
// recommended pace.
export function getCarPerformance(spec = CAR_SPECS.gt) {
  const gt = CAR_SPECS.gt;
  const wheelPower = wheelPowerW(spec);
  const gripRatio = spec.mu.road / gt.mu.road;
  const brakeRatio = ((spec.brakeFront + spec.brakeRear) / spec.massKg) /
    ((gt.brakeFront + gt.brakeRear) / gt.massKg);
  // Four driven tyres put more of the engine down out of a slow corner.
  const traction = spec.frontDrive > 0 ? 1.25 : 1;
  return {
    aLat: 13 * gripRatio,
    aBrake: 10 * Math.min(gripRatio, brakeRatio),
    aAccel: 7.5 * gripRatio * traction,
    // Half a percent under the force balance: the physics loses a little to
    // shift cuts and suspension that the balance does not model.
    vMax: 0.995 * getTerminalSpeed(spec).speed,
    // Best-gear force at the road at speed v (N), 8 % under the ideal for
    // shift cuts: what an exit can actually build.
    tractiveForce: (v) => 0.92 * tractiveForceAt(spec, v),
    wheelPower,
    mass: spec.massKg,
    halfRhoCdA: 0.5 * spec.airDensity * spec.cdA,
    rollingDrag: spec.crr * spec.massKg * 9.82,
    bodyDamping: BODY_DAMPING * spec.massKg,   // N per m/s (see above)
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

/**
 * Anticipatory braking over a lap's speed profile, in place: each frame is
 * capped by what the brakes can shed before the next one. The braking
 * available at a frame is what the tyres have left after the cornering
 * there (a friction circle), judged at the speed the car arrives with —
 * the next frame's — so a braking zone that falls inside a bend is
 * stretched rather than asking for full braking at the cornering limit.
 * Shared by the AI planner and the perfect-line aid so the two agree.
 *   profile  corner-limited speeds (m/s), modified in place
 *   kappa    curvature per frame (1/m), ds  arc length to the next frame (m)
 *   aLat     the lateral budget the corner speeds were planned against
 */
export function applyBrakingPasses(profile, kappa, ds, spec, aLat, aBrake, passes = 3) {
  const n = profile.length;
  for (let pass = 0; pass < passes; pass++) {
    for (let i = n - 1; i >= 0; i--) {
      const next = profile[(i + 1) % n];
      const lateral = Math.min(1, next * next * kappa[i] / getLateralAcceleration(spec, next, aLat));
      const room = Math.sqrt(Math.max(0.15, 1 - lateral * lateral));
      profile[i] = Math.min(profile[i], Math.sqrt(next * next + 2 * aBrake * room * ds[i]));
    }
  }
}
