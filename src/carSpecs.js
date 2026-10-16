// The homologated club-racing field shares tyres/wheel placement with its visual
// chassis, but not a performance template. Each car has an engine, gearing,
// weight, aero, steering and brake package with a deliberate cost elsewhere.
// ---------------------------------------------------------------------------
// Vehicle specification — a ~480 hp GT racer. All the driving feel lives here:
// a real torque curve through a 6-speed box, aerodynamic drag + downforce,
// finite tyre grip per surface, and tyre-scrub losses. Top speed is drag-
// limited around 285 km/h; cornering hard genuinely bleeds speed.
// ---------------------------------------------------------------------------
const BASE_SPEC = {
  id: 'gt',
  wheelbase: 2.9,
  steerRate: 4.0,
  massKg: 1350,

  // Engine
  idleRpm: 1100,
  redlineRpm: 7600,
  shiftUpRpm: 7250,
  shiftDownRpm: 3300,
  shiftTime: 0.22,            // s of torque cut while the box swaps cogs
  torqueCurve: [              // [rpm, Nm]
    [1000, 320], [2200, 430], [3500, 505], [4900, 540],
    [5900, 525], [6800, 500], [7300, 472], [7600, 440],
  ],
  gears: [3.45, 2.28, 1.71, 1.34, 1.08, 0.90],
  reverseRatio: 3.3,
  finalDrive: 3.55,
  drivelineEff: 0.88,
  engineBrakeNm: 36,          // drag torque at redline when off throttle

  // Rotating inertia — gives the engine a real flywheel so RPM is a state, not
  // a readout of road speed. When the driven tyres can't take all the torque
  // the surplus spins the engine up: that's wheelspin, shown live on the tach.
  engineInertia: 0.15,        // kg·m² (crank + flywheel + clutch, crank-referred)
  wheelInertia: 0.9,          // kg·m² per driven wheel/tyre/brake assembly

  // Aerodynamics
  airDensity: 1.225,
  cdA: 0.92,                  // drag area (m²) → ~285 km/h terminal
  clA: 2.1,                   // downforce area (m²) → ~0.45 g extra grip @ 250
  downforcePos: -0.25,        // applied slightly aft of CoM (wing bias)

  // Rolling resistance
  crr: 0.014,

  // Tyres: frictionSlip in cannon's RaycastVehicle is effectively μ.
  mu: { road: 1.45, kerb: 1.22, grass: 0.55, gravel: 0.50 },
  // Extra longitudinal drag on soft surfaces, as a fraction of wheel load.
  surfaceDrag: { road: 0, kerb: 0, grass: 0.12, gravel: 0.20 },
  scrubCoef: 0.38,            // tyre scrub when the body runs at a slip angle
  // Load sensitivity: a tyre carrying more than its share of the load makes
  // less grip per newton. This is what makes weight transfer matter — diving
  // onto the fronts under braking, unloading the inside in a corner, squatting
  // the rears on power — so balance shifts the way a real car's does. It is
  // measured relative to the average wheel load, so pure downforce (which
  // loads all four evenly) still adds grip; only *transfer* trades it away.
  loadSensitivity: 0.14,     // μ change per unit of load above/below the mean
  loadMuClamp: 0.22,         // cap the swing to ±22%
  // Once a driven tyre is spinning, grip eases from its static peak toward this
  // kinetic fraction, so lighting up the rears genuinely costs you drive.
  slipGripFloor: 0.86,

  // Brakes — cannon brake values are impulse clamps (N·s per 1/120 s step).
  brakeFront: 50,
  brakeRear: 28,
  handbrake: 55,

  maxSteer: 0.62,             // rad at standstill
  steerSlipMargin: 2.0,       // allow this × the no-slip steady-state angle
  steerFloor: 0.02,           // rad of authority that always remains
  maxReverseSpeed: 8.5,       // m/s
};


function profile(id, overrides) {
  const spec = { ...BASE_SPEC, ...overrides, id,
    mu: { ...BASE_SPEC.mu, ...overrides.mu },
    surfaceDrag: { ...BASE_SPEC.surfaceDrag, ...overrides.surfaceDrag },
    torqueCurve: overrides.torqueCurve ?? BASE_SPEC.torqueCurve.map(([rpm, torque]) =>
      [rpm, torque * (overrides.torqueScale ?? 1)]),
    gears: [...(overrides.gears ?? BASE_SPEC.gears)],
  };
  delete spec.torqueScale;
  for (const point of spec.torqueCurve) Object.freeze(point);
  Object.freeze(spec.torqueCurve);
  Object.freeze(spec.gears);
  Object.freeze(spec.mu);
  Object.freeze(spec.surfaceDrag);
  return Object.freeze(spec);
}

export const CAR_SPECS = Object.freeze({
  gt: profile('gt', {}),
  // Short gears and strong mechanical grip: quick away, forgiving on kerbs,
  // but the lowest power and substantial drag run out of pace on straights.
  hatch: profile('hatch', {
    massKg: 1180, torqueScale: 0.80, finalDrive: 4.05, shiftTime: 0.18,
    cdA: 1.02, clA: 0.85, mu: { road: 1.64, kerb: 1.55, grass: 0.75, gravel: 0.68 },
    surfaceDrag: { grass: 0.09, gravel: 0.15 },
    brakeFront: 41, brakeRear: 25, maxSteer: 0.65, steerRate: 4.6,
    loadSensitivity: 0.10, slipGripFloor: 0.93, scrubCoef: 0.32,
  }),
  // Aero grip arrives with speed. A light single-seater can brake late and
  // hold fast bends, at the cost of straight-line drag and rough-surface grip.
  'open-wheel': profile('open-wheel', {
    massKg: 960, torqueScale: 0.73, finalDrive: 3.75, shiftTime: 0.15,
    cdA: 0.82, clA: 3.5, downforcePos: -0.12,
    mu: { road: 1.36, kerb: 1.02, grass: 0.36, gravel: 0.31 },
    surfaceDrag: { grass: 0.17, gravel: 0.26 },
    brakeFront: 47, brakeRear: 27, maxSteer: 0.57, steerRate: 4.8,
    loadSensitivity: 0.12, scrubCoef: 0.35,
  }),
  // Big low-end torque gives this heavyweight strong rolling acceleration.
  // Weight, relaxed steering, modest aero and long stops demand early braking.
  muscle: profile('muscle', {
    massKg: 1650, finalDrive: 3.35, shiftTime: 0.29,
    torqueCurve: [[1000, 620], [2200, 830], [3500, 900], [4900, 880],
      [5900, 770], [6800, 640], [7300, 565], [7600, 510]],
    cdA: 0.98, clA: 0.7, engineInertia: 0.23, engineBrakeNm: 48,
    mu: { road: 1.40, kerb: 1.10, grass: 0.57, gravel: 0.52 },
    brakeFront: 46, brakeRear: 25, maxSteer: 0.56, steerRate: 2.8,
    loadSensitivity: 0.19, slipGripFloor: 0.82, scrubCoef: 0.43,
  }),
  // Light, responsive and clean through tight turns; modest power and little
  // downforce mean it gives away both acceleration and fast-corner grip.
  roadster: profile('roadster', {
    massKg: 1080, torqueScale: 0.70, finalDrive: 3.75, shiftTime: 0.20,
    cdA: 0.67, clA: 0.5, engineInertia: 0.11,
    mu: { road: 1.68, kerb: 1.35, grass: 0.58, gravel: 0.52 },
    brakeFront: 35, brakeRear: 20, maxSteer: 0.72, steerRate: 6.0, steerSlipMargin: 2.25,
    loadSensitivity: 0.09, slipGripFloor: 0.91, scrubCoef: 0.27,
  }),
  // Tall gearing and a slippery body win long straights. The soft low-end
  // torque, heavier chassis and restricted brakes lose time in tight sections.
  supercar: profile('supercar', {
    massKg: 1500, finalDrive: 3.15, shiftTime: 0.20,
    torqueCurve: [[1000, 290], [2200, 370], [3500, 510], [4900, 660],
      [5900, 710], [6800, 725], [7300, 700], [7600, 670]],
    cdA: 0.75, clA: 1.55, mu: { road: 1.31, kerb: 1.10, grass: 0.44, gravel: 0.40 },
    brakeFront: 43, brakeRear: 24, maxSteer: 0.57, steerRate: 3.4,
    loadSensitivity: 0.17, scrubCoef: 0.39,
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

const peakPower = spec => Math.max(...spec.torqueCurve.map(([rpm, torque]) =>
  rpm * torque * Math.PI / 30)) * spec.drivelineEff;

// Conservative planning estimates, calibrated to the original GT. These derive
// from the same physical package as the car, so changing cars also changes the
// AI's braking points and the player's recommended pace.
export function getCarPerformance(spec = CAR_SPECS.gt) {
  const gt = CAR_SPECS.gt;
  const wheelPower = 215000 * peakPower(spec) / peakPower(gt);
  const gripRatio = spec.mu.road / gt.mu.road;
  const brakeRatio = ((spec.brakeFront + spec.brakeRear) / spec.massKg) /
    ((gt.brakeFront + gt.brakeRear) / gt.massKg);
  return {
    aLat: 13 * gripRatio,
    aBrake: 10 * Math.min(gripRatio, brakeRatio),
    aAccel: 7.5 * gripRatio,
    vMax: 71 * Math.cbrt(wheelPower / 215000 * gt.cdA / spec.cdA),
    wheelPower,
    mass: spec.massKg,
    halfRhoCdA: 0.5 * spec.airDensity * spec.cdA,
    rollingDrag: spec.crr * spec.massKg * 9.82,
  };
}

// Preserve the proven GT planning margin while accounting for the other
// packages' gain/loss in aerodynamic grip. The speed-squared term matters in
// fast bends; it cannot turn a low-grip aero car into a hairpin specialist.
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
