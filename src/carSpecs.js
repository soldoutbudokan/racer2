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
// set widens the power-to-weight spread by half (300–550 hp/t), moves the
// grip up the scale with about the same spread (μ 1.40–1.78), stretches
// downforce at the low end (0.1–3.4 m², from 0.5–3.5), and adds the things
// that were missing:
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
  // field. Fast-corner speeds and braking points nothing else can touch;
  // slow corners belong to the speedster's grip. It is a brick through the
  // air with that wing stack, so it tops out lowest and the straights belong
  // to others, and off the asphalt it is helpless.
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
  // steers slowly, and the rears let go before the fronts do. Its treaded
  // street tyres ride the grass better than anything but the rally car. The
  // hard car.
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
    mu: { road: 1.40, kerb: 1.10, grass: 0.62, gravel: 0.54 },
    surfaceDrag: { road: 0, kerb: 0, grass: 0.06, gravel: 0.12 },
    scrubCoef: 0.44, loadSensitivity: 0.20, slipGripFloor: 0.78,
    brakeFront: 60, brakeRear: 30, handbrake: 62,
    maxSteer: 0.55, steerRate: 2.6, steerSlipMargin: 2.2,
    gripBalance: 0.94, yawInertia: 1.25, angularDamping: 0.30,
  }),

  // Speedster — 820 kg, a 2.0 flat-four that makes 265 hp at 8,000 rpm, no
  // roof, no wing and the shortest wheelbase here. It carries speed through
  // slow corners on mechanical grip alone and answers the wheel quickest in
  // the field, but with no downforce the GT3 and the formula car out-corner
  // it in fast bends, and it has nothing in reserve on the straights. With no
  // aero load on the tail, the rears carry a little more grip than the
  // fronts (gripBalance 1.03): at 0.97 it swung round 19 deg when it lifted
  // in a 160 km/h bend.
  roadster: profile('roadster', {
    wheelbase: 2.40, massKg: 820, cgHeight: 0.46, trackWidth: 1.68, hoodForward: 0.40,
    chassisHalf: { x: 0.90, y: 0.28, z: 1.95 },
    idleRpm: 1100, redlineRpm: 8800, shiftUpRpm: 8400, shiftDownRpm: 3800, shiftTime: 0.20,
    torqueCurve: [[1200, 200], [3000, 255], [5000, 272], [6800, 264],
      [8000, 236], [8800, 210]],
    gears: [3.20, 2.65, 2.19, 1.81, 1.50, 1.24], finalDrive: 3.90,
    drivelineEff: 0.90,
    engineInertia: 0.10, engineBrakeNm: 26,
    cdA: 0.86, clA: 0.10, downforcePos: -0.15,
    mu: { road: 1.78, kerb: 1.58, grass: 0.60, gravel: 0.52 },
    surfaceDrag: { road: 0, kerb: 0, grass: 0.10, gravel: 0.18 },
    scrubCoef: 0.27, loadSensitivity: 0.08, slipGripFloor: 0.92,
    brakeFront: 44, brakeRear: 6, handbrake: 42,
    maxSteer: 0.74, steerRate: 7.0, steerSlipMargin: 2.3,
    gripBalance: 1.03, yawInertia: 0.80, angularDamping: 0.20,
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
// carry it: left out, the solved top speed comes out 4–9 % high on the cars
// drag holds back, and the V8 runs on into its fourth-gear limiter.
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

const G = 9.82;

/**
 * What a driver can plan against in this car, from the car's own physics:
 * the tyres' grip with the aerodynamic load on top, the brakes against those
 * tyres (whichever gives up first), the force at the road in the gear the
 * automatic box holds, drag, and the terminal speed. Every figure follows
 * speed where the physics does, so a winged car brakes and corners harder
 * from 200 km/h than from 80. It replaced a set of ratios to the GT3 (13 m/s²
 * of grip, 10 m/s² of braking, scaled by μ and brake clamps) that planned
 * every car at little more than half of what it measured under braking.
 *
 * `skill` is how much of each limit the driver uses: 1 is the perfect lap the
 * aid shows; the rivals drive at 0.78-0.86. The lateral budget is referenced
 * to what the car holds in a steady corner (car-balance-test's slowGrip reads
 * 0.96-0.99 of μg across the field, the V8 lowest because its tyres are the
 * most load-sensitive); braking to the lesser of the brake clamps and that
 * grip, with the downforce counted; acceleration to the gear the box holds,
 * 8 % under for shift cuts, inside the driven axle's share of the grip.
 */
export function getDrivingLimits(spec = CAR_SPECS.gt, skill = 1) {
  const s = Math.min(1, Math.max(0, skill));
  const m = spec.massKg;
  // Steady-state grip: the outside tyre carries more than its share and
  // gives up μ for it (loadMu in car.js); the loss measures ~0.2 × the
  // sensitivity at the limit. A car whose rear tyres hold less than its
  // fronts (gripBalance under 1: the V8, the formula car) is limited by the
  // rear, and lets go from the back when it is asked for more.
  const mu = spec.mu.road * (1 - 0.2 * spec.loadSensitivity) * Math.min(1, spec.gripBalance ?? 1);
  const q = 0.5 * spec.airDensity * spec.clA / m;      // downforce per (m/s)², as m/s²
  const latUse = 0.80 + 0.15 * s;                        // 0.95 at the top, 0.92 at 0.78
  const brakeUse = 0.72 + 0.20 * s;                      // 0.92 at the top, 0.88 at 0.78
  const terminal = getTerminalSpeed(spec).speed;
  const vMax = terminal * (0.955 + 0.04 * s);           // 0.995 at the top
  // Full-pedal deceleration from the brake clamps (impulse per 1/120 s step
  // and wheel, to force at the road).
  const pedalDecel = (spec.brakeFront + spec.brakeRear) * 2 * 120 / m;
  const halfRhoCdA = 0.5 * spec.airDensity * spec.cdA;
  const rollingDrag = spec.crr * m * G;
  const bodyDamping = BODY_DAMPING * m;
  // The driven axle's share of the grip under squat: measured 0-100 km/h
  // runs put the rear-drive cars at 0.52-0.55 μg and the four-wheel-drive
  // hatch at 0.6.
  const tractionAccel = mu * G * (spec.frontDrive > 0 ? 0.62 : 0.52);
  // Braking or driving while cornering loads one tyre with most of the
  // work, and the tyres give up more of their grip for it than a point-mass
  // friction circle allows: the plan's cornering budget inside a braking or
  // acceleration zone is cut by the tyre's load sensitivity (the V8, at
  // 0.20, trail-braked at the circle's edge, arrived over its plan and
  // understeered off), and again where the brakes sit mostly on the front
  // axle, whose tyres then brake and turn at once (the speedster, 88 %
  // front, trail-braking at 60 % pedal through a 77 % bend at 180 km/h, let
  // go at the back and spun). The hard braking is done in a straight line
  // and the pedal eases as the wheel turns.
  const frontShare = spec.brakeFront / (spec.brakeFront + spec.brakeRear);
  const combined = (1 - spec.loadSensitivity) * (1 - 2.5 * Math.max(0, frontShare - 0.8));
  // Engine force at the road per unit mass, in the gear the box holds, with
  // 8 % off for shift cuts, tabulated every half metre per second.
  const STEP = 0.5;
  const engine = new Float32Array(Math.ceil(terminal / STEP) + 3);
  for (let i = 0; i < engine.length; i++) engine[i] = 0.92 * tractiveForceAt(spec, i * STEP) / m;
  const muLat = latUse * mu;
  const limits = {
    spec, skill: s, vMax, pedalDecel, mass: m, tractionAccel,
    halfRhoCdA, rollingDrag, bodyDamping,
    aLat: muLat * G,                                      // on a flat road at rest, no aero
    aBrake: brakeUse * Math.min(pedalDecel, mu * G),
    // Scalars for planSpeedProfile's inner loops.
    muLatG: muLat * G, muLatQ: muLat * q, combined,
    brakeMax: brakeUse * pedalDecel, brakeMuG: brakeUse * mu * G, brakeMuQ: brakeUse * mu * q,
    dragA: halfRhoCdA / m, dragB: bodyDamping / m, dragC: rollingDrag / m,
    engine, engineStep: STEP,
  };
  // Lateral acceleration the plan budgets at speed v.
  limits.lateralAt = (v) => limits.muLatG + limits.muLatQ * v * v;
  // Lateral acceleration the tyres hold at speed v, before the driver's
  // margin: what a live friction-circle check should judge the car against,
  // so a car a little over its plan can still brake for it.
  limits.gripAt = (v) => mu * (G + q * v * v);
  // Steady speed through curvature κ (1/m): v²κ = μ(g + q v²). Past the
  // speed where the wing alone keeps up with the bend, the straight limit.
  limits.cornerSpeed = (kappa) => {
    const d = kappa - limits.muLatQ;
    return d <= 1e-7 ? vMax : Math.min(vMax, Math.sqrt(limits.muLatG / d));
  };
  // Deceleration the brakes give at speed v, before drag.
  limits.brakeAt = (v) => Math.min(limits.brakeMax, limits.brakeMuG + limits.brakeMuQ * v * v);
  // Deceleration with no pedal: aerodynamic drag, rolling resistance and
  // cannon's body damping (engine braking depends on the gear; ai.js adds it).
  limits.dragDecel = (v) => (limits.dragA * v + limits.dragB) * v + limits.dragC;
  // Engine force per unit mass at speed v, before drag and traction.
  limits.engineAccel = (v) => {
    const x = v / STEP, i = Math.floor(x);
    if (i + 1 >= engine.length) return 0;
    return engine[i] + (engine[i + 1] - engine[i]) * (x - i);
  };
  return limits;
}

/**
 * Speed profile over a closed path, written into `out` (m/s per sample):
 *   1. the steady speed each sample's curvature allows,
 *   2. a backward pass capping each sample by what the brakes can shed before
 *      the next one, inside the friction circle: the cornering the tyres are
 *      doing at the next sample (judged at its speed) leaves less for braking,
 *      so a braking zone that falls inside a bend is stretched rather than
 *      asking for full braking at the cornering limit,
 *   3. a forward pass capping each sample by what the engine can build from
 *      the one before, inside the same circle: nothing is gained through an
 *      apex taken at the limit; the exit opens as the curvature falls.
 * Inside both, the cornering budget is the car's combined-grip share
 * (getDrivingLimits), smaller on a load-sensitive tyre. Both passes start at
 * the slowest corner, which neither can lower, so one of each settles the
 * whole loop without a seam. Shared by the line solver,
 * the AI planner and the perfect-line aid so the three agree. `kappa` is the
 * unsigned curvature per sample (1/m) and `ds` the arc to the next sample
 * (m). Returns the lap time (s).
 */
export function planSpeedProfile(limits, kappa, ds, out, passes = 1) {
  const n = kappa.length;
  const { vMax, muLatG, muLatQ, combined, brakeMax, brakeMuG, brakeMuQ, dragA, dragB, dragC,
    engine, engineStep, tractionAccel } = limits;
  const latG = muLatG * combined, latQ = muLatQ * combined;
  const last = engine.length - 1;
  let slowest = 0;
  for (let i = 0; i < n; i++) {
    const d = kappa[i] - muLatQ;
    out[i] = d <= 1e-7 ? vMax : Math.min(vMax, Math.sqrt(muLatG / d));
    if (out[i] < out[slowest]) slowest = i;
  }
  for (let pass = 0; pass < passes; pass++) {
    let i = slowest === 0 ? n - 1 : slowest - 1;
    for (let k = 1; k < n; k++) {
      const next = out[i === n - 1 ? 0 : i + 1], v2 = next * next;
      const lateral = Math.min(1, v2 * kappa[i] / (latG + latQ * v2));
      // A fifth of the brakes is always planned on: a braking zone that falls
      // inside a bend is stretched back onto the straight before it rather
      // than planned at full pedal through the bend. (A floor of 39 % had the
      // V8 planned at half its pedal through the oval's turns at 89 % of its
      // grip, and it swapped ends.)
      const room = Math.sqrt(Math.max(0.04, 1 - lateral * lateral));
      const brake = Math.min(brakeMax, brakeMuG + brakeMuQ * v2) * room
        + (dragA * next + dragB) * next + dragC;
      const v = Math.sqrt(v2 + 2 * ds[i] * brake);
      if (v < out[i]) out[i] = v;
      i = i === 0 ? n - 1 : i - 1;
    }
    i = slowest;
    for (let k = 1; k < n; k++) {
      const j = i === n - 1 ? 0 : i + 1, v = out[i], v2 = v * v;
      const lateral = Math.min(1, v2 * kappa[i] / (latG + latQ * v2));
      const room = Math.sqrt(Math.max(0, 1 - lateral * lateral));
      const x = v / engineStep, t = Math.min(last - 1, Math.floor(x));
      const thrust = engine[t] + (engine[t + 1] - engine[t]) * Math.min(1, x - t);
      const a = Math.min(thrust, tractionAccel * room) - ((dragA * v + dragB) * v + dragC);
      const w = a <= 0 ? v : Math.sqrt(v2 + 2 * a * ds[i]);
      if (w < out[j]) out[j] = w;
      i = j;
    }
  }
  let t = 0;
  for (let i = 0; i < n; i++) t += 2 * ds[i] / (out[i] + out[i === n - 1 ? 0 : i + 1]);
  return t;
}
