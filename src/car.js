import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { buildVisualCar } from './carModels/index.js';

const CHASSIS_HALF = { x: 0.92, y: 0.32, z: 2.18 };
const WHEEL_RADIUS = 0.36;
const SUSPENSION_REST = 0.32;
const WHEELBASE = 2.9;

// ---------------------------------------------------------------------------
// Vehicle specification — a ~480 hp GT racer. All the driving feel lives here:
// a real torque curve through a 6-speed box, aerodynamic drag + downforce,
// finite tyre grip per surface, and tyre-scrub losses. Top speed is drag-
// limited around 285 km/h; cornering hard genuinely bleeds speed.
// ---------------------------------------------------------------------------
const SPEC = {
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

  // Brakes — cannon brake values are impulse clamps (N·s per 1/120 s step).
  brakeFront: 50,
  brakeRear: 28,
  handbrake: 55,

  maxSteer: 0.62,             // rad at standstill
  steerSlipMargin: 2.0,       // allow this × the no-slip steady-state angle
  steerFloor: 0.02,           // rad of authority that always remains
  maxReverseSpeed: 8.5,       // m/s
};

function torqueAt(rpm) {
  const c = SPEC.torqueCurve;
  if (rpm <= c[0][0]) return c[0][1];
  for (let i = 1; i < c.length; i++) {
    if (rpm <= c[i][0]) {
      const t = (rpm - c[i - 1][0]) / (c[i][0] - c[i - 1][0]);
      return c[i - 1][1] + (c[i][1] - c[i - 1][1]) * t;
    }
  }
  return c[c.length - 1][1];
}

/**
 * Builds a GT car: lofted PBR visual + Cannon RaycastVehicle, with a
 * realistic longitudinal model (engine/gears/aero) layered on top.
 */
export function createCar(world, materials, options = {}) {
  const bodyColor = options.color ?? 0xc8161d;
  const archetype = options.archetype ?? 'gt';
  const visual = buildVisualCar(archetype, bodyColor);

  // Chassis body
  const chassisShape = new CANNON.Box(
    new CANNON.Vec3(CHASSIS_HALF.x, CHASSIS_HALF.y, CHASSIS_HALF.z)
  );
  const chassisBody = new CANNON.Body({
    mass: SPEC.massKg,
    material: materials.chassisMat,
  });
  chassisBody.addShape(chassisShape, new CANNON.Vec3(0, 0.2, 0));
  // Lower the centre of gravity a touch — keeps it from rolling over
  chassisBody.shapeOffsets[0].y = -0.05;
  chassisBody.angularDamping = 0.25;

  const vehicle = new CANNON.RaycastVehicle({
    chassisBody,
    indexRightAxis: 0,   // x
    indexUpAxis: 1,      // y
    indexForwardAxis: 2, // z
  });

  const wheelOptions = {
    radius: WHEEL_RADIUS,
    directionLocal: new CANNON.Vec3(0, -1, 0),
    suspensionStiffness: 46,
    suspensionRestLength: SUSPENSION_REST,
    frictionSlip: SPEC.mu.road,
    dampingRelaxation: 2.6,
    dampingCompression: 4.8,
    maxSuspensionForce: 100000,
    rollInfluence: 0.05,
    // axleLocal -X: forward = surfNormal × axle = (+y)×(-x) = +z (matches our convention).
    axleLocal: new CANNON.Vec3(-1, 0, 0),
    chassisConnectionPointLocal: new CANNON.Vec3(),
    maxSuspensionTravel: 0.3,
    customSlidingRotationalSpeed: -30,
    useCustomSlidingRotationalSpeed: true,
    // cannon weights forward friction at half in its combined-slip ellipse
    // (fwdFactor 0.5); raising this back to ~1 gives a true friction circle,
    // so flooring it mid-corner overdrives the tyre instead of being free.
    forwardAcceleration: 0.55,
  };

  const wb = WHEELBASE / 2; // wheelbase half
  const tw = 0.86;          // track half
  const wy = -0.05;         // suspension anchor y in chassis space
  // Front-left, Front-right, Rear-left, Rear-right.
  // Pass a fresh Vec3 per wheel — cannon-es WheelInfo holds a reference to the
  // option's chassisConnectionPointLocal, so reusing one vector stacks all wheels.
  const positions = [
    new CANNON.Vec3( tw, wy,  wb),
    new CANNON.Vec3(-tw, wy,  wb),
    new CANNON.Vec3( tw, wy, -wb),
    new CANNON.Vec3(-tw, wy, -wb),
  ];
  positions.forEach((p) => {
    vehicle.addWheel({ ...wheelOptions, chassisConnectionPointLocal: p });
  });

  vehicle.addToWorld(world);

  // ---- Driving state ----
  const drive = {
    gear: 1,              // 1-based index into SPEC.gears
    mode: 'D',            // 'D' | 'R'
    shiftT: 0,            // >0 while a shift is in progress
    rpm: SPEC.idleRpm,
    smoothedRpm: SPEC.idleRpm,
    steer: 0,
    surfaces: ['road', 'road', 'road', 'road'],
    throttle: 0,
    brakeLevel: 0,
  };

  const telemetry = {
    rpm: SPEC.idleRpm,
    rpmFrac: 0,
    gearLabel: 'N',
    speedKmh: 0,
  };

  // Scratch vectors for the per-substep force pass.
  const vWorld = new CANNON.Vec3();
  const fTmp = new CANNON.Vec3();
  const pTmp = new CANNON.Vec3();
  const upWorld = new CANNON.Vec3();

  function forwardSpeed() {
    const q = chassisBody.quaternion;
    const fx = 2 * (q.x * q.z + q.w * q.y);
    const fz = 1 - 2 * (q.x * q.x + q.y * q.y);
    const v = chassisBody.velocity;
    return v.x * fx + v.z * fz;
  }

  function lateralSpeed() {
    const q = chassisBody.quaternion;
    // local +X axis in world (right vector)
    const rx = 1 - 2 * (q.y * q.y + q.z * q.z);
    const rz = 2 * (q.x * q.z - q.w * q.y);
    const v = chassisBody.velocity;
    return v.x * rx + v.z * rz;
  }

  // ------------------------------------------------------------------
  // Aero + scrub + surface drag, applied EVERY physics substep so the
  // forces don't depend on render rate. Registered as a world preStep
  // listener (same mechanism RaycastVehicle itself uses).
  // ------------------------------------------------------------------
  function preStepForces() {
    const v = chassisBody.velocity;
    const speedSq = v.x * v.x + v.y * v.y + v.z * v.z;
    const speed = Math.sqrt(speedSq);

    // Aerodynamic drag (opposes velocity)
    if (speed > 0.5) {
      const fd = 0.5 * SPEC.airDensity * SPEC.cdA * speedSq;
      fTmp.set(-v.x / speed * fd, -v.y / speed * fd, -v.z / speed * fd);
      chassisBody.applyForce(fTmp, CANNON.Vec3.ZERO);
    }

    // Downforce — along the car's -up axis, applied slightly aft of CoM.
    const planarSq = v.x * v.x + v.z * v.z;
    const df = 0.5 * SPEC.airDensity * SPEC.clA * planarSq;
    if (df > 1) {
      const q = chassisBody.quaternion;
      // local up (0,1,0) → world
      upWorld.set(
        2 * (q.x * q.y - q.w * q.z),
        1 - 2 * (q.x * q.x + q.z * q.z),
        2 * (q.y * q.z + q.w * q.x),
      );
      fTmp.set(-upWorld.x * df, -upWorld.y * df, -upWorld.z * df);
      // application point offset (world-oriented) behind the CoM
      const fz = SPEC.downforcePos;
      pTmp.set(
        (2 * (q.x * q.z + q.w * q.y)) * fz,
        (2 * (q.y * q.z - q.w * q.x)) * fz,
        (1 - 2 * (q.x * q.x + q.y * q.y)) * fz,
      );
      chassisBody.applyForce(fTmp, pTmp);
    }

    // Rolling resistance + load-based grip & drag bookkeeping
    let totalLoad = 0;
    for (let i = 0; i < 4; i++) {
      const w = vehicle.wheelInfos[i];
      if (!w.isInContact) continue;
      totalLoad += w.suspensionForce;
      // Soft-surface drag (grass/gravel) applied at the contact point so a
      // car half on the grass gets pulled toward it — just like real life.
      const sd = SPEC.surfaceDrag[drive.surfaces[i]] || 0;
      if (sd > 0 && speed > 0.5) {
        const f = sd * w.suspensionForce;
        fTmp.set(-v.x / speed * f, 0, -v.z / speed * f);
        pTmp.set(
          w.raycastResult.hitPointWorld.x - chassisBody.position.x,
          0, // keep the drag in the ground plane: no roll moment
          w.raycastResult.hitPointWorld.z - chassisBody.position.z,
        );
        chassisBody.applyForce(fTmp, pTmp);
      }
    }
    if (speed > 0.5 && totalLoad > 0) {
      const frr = SPEC.crr * totalLoad;
      fTmp.set(-v.x / speed * frr, 0, -v.z / speed * frr);
      chassisBody.applyForce(fTmp, CANNON.Vec3.ZERO);
    }

    // Tyre scrub: running at a body slip angle dissipates energy. The raycast
    // solver handles the lateral impulse; this adds the longitudinal loss so
    // sliding (or just cornering hard) visibly burns speed.
    const fwd = forwardSpeed();
    const lat = lateralSpeed();
    const planar = Math.hypot(fwd, lat);
    if (planar > 4) {
      const slip = Math.atan2(Math.abs(lat), Math.abs(fwd));
      if (slip > 0.035) {
        const fs = SPEC.scrubCoef * Math.sin(slip) * Math.max(totalLoad, 1);
        fTmp.set(-v.x / speed * fs, 0, -v.z / speed * fs);
        chassisBody.applyForce(fTmp, CANNON.Vec3.ZERO);
      }
    }
  }
  world.addEventListener('preStep', preStepForces);

  // ------------------------------------------------------------------
  // Control application — engine, gearbox, brakes, steering, grip.
  // Called once per render frame from the game loop.
  //   ctrl: { throttle, brake, steer, handbrake }
  //   surfaces: per-wheel ['road'|'kerb'|'grass'|'gravel'] (optional)
  // ------------------------------------------------------------------
  function applyControls(ctrl, dt, surfaces) {
    // Copy (callers may reuse a scratch array between cars).
    if (surfaces) for (let i = 0; i < 4; i++) drive.surfaces[i] = surfaces[i];
    const fwdSpd = forwardSpeed();
    const speed = Math.hypot(chassisBody.velocity.x, chassisBody.velocity.z);

    // --- Direction mode (simple automatic): brake at standstill → reverse;
    //     throttle at standstill while reversing → forward.
    if (drive.mode === 'D' && ctrl.brake > 0.1 && fwdSpd < 0.5 && speed < 1.0) {
      drive.mode = 'R';
      drive.gear = 1;
    } else if (drive.mode === 'R' && ctrl.throttle > 0.1 && fwdSpd > -0.5) {
      drive.mode = 'D';
      drive.gear = 1;
    }

    // --- Gearbox (auto) ---
    const ratioFor = (g) => SPEC.gears[g - 1] * SPEC.finalDrive;
    if (drive.shiftT > 0) drive.shiftT -= dt;
    if (drive.mode === 'D') {
      const wheelRpm = Math.max(0, fwdSpd) / (2 * Math.PI * WHEEL_RADIUS) * 60;
      drive.rpm = Math.max(SPEC.idleRpm, wheelRpm * ratioFor(drive.gear));
      if (drive.shiftT <= 0) {
        if (drive.rpm > SPEC.shiftUpRpm && drive.gear < SPEC.gears.length) {
          drive.gear += 1;
          drive.shiftT = SPEC.shiftTime;
        } else if (drive.rpm < SPEC.shiftDownRpm && drive.gear > 1) {
          drive.gear -= 1;
          drive.shiftT = SPEC.shiftTime * 0.6;
        }
      }
      drive.rpm = Math.min(SPEC.redlineRpm, Math.max(SPEC.idleRpm,
        wheelRpm * ratioFor(drive.gear)));
    } else {
      const wheelRpm = Math.abs(Math.min(0, fwdSpd)) / (2 * Math.PI * WHEEL_RADIUS) * 60;
      drive.rpm = Math.min(SPEC.redlineRpm, Math.max(SPEC.idleRpm,
        wheelRpm * SPEC.reverseRatio * SPEC.finalDrive));
    }

    // --- Engine force at the driven (rear) wheels ---
    let engineForce = 0;
    let brakeCmd = 0;

    const throttle = drive.mode === 'D' ? ctrl.throttle : ctrl.brake;
    const brakeIn = drive.mode === 'D' ? ctrl.brake : ctrl.throttle;

    if (throttle > 0.02 && drive.shiftT <= 0) {
      const ratio = drive.mode === 'D'
        ? ratioFor(drive.gear)
        : SPEC.reverseRatio * SPEC.finalDrive;
      const tq = torqueAt(drive.rpm) * throttle;
      engineForce = tq * ratio * SPEC.drivelineEff / WHEEL_RADIUS;
      // Friction circle on the driven axle: cornering load eats into the
      // traction available for drive. Powering out of a corner is therefore
      // grip-limited — you cannot gain speed while the rear tyres are
      // already working sideways.
      const yawRate = chassisBody.angularVelocity.y;
      const aLat = Math.abs(speed * yawRate);
      const nRear = (vehicle.wheelInfos[2].suspensionForce || 0)
                  + (vehicle.wheelInfos[3].suspensionForce || 0);
      const muRear = ((SPEC.mu[drive.surfaces[2]] ?? SPEC.mu.road)
                    + (SPEC.mu[drive.surfaces[3]] ?? SPEC.mu.road)) / 2;
      // 1.3 margin: v·yawRate understates true tyre demand while the car is
      // ploughing/sliding, so without it power-on mid-corner is too cheap.
      const fLatRear = SPEC.massKg * aLat * 0.5 * 1.3;
      const budget = (muRear * nRear) ** 2 - fLatRear ** 2;
      const fCap = budget > 0 ? Math.sqrt(budget) : 0;
      if (nRear > 100) engineForce = Math.min(engineForce, fCap);
      if (drive.mode === 'R') {
        engineForce = -engineForce;
        if (-fwdSpd > SPEC.maxReverseSpeed) engineForce = 0;
      }
    } else if (throttle <= 0.02 && drive.mode === 'D' && fwdSpd > 1) {
      // Engine braking — proportional to revs, through the gearing.
      const ebTq = SPEC.engineBrakeNm * (drive.rpm / SPEC.redlineRpm);
      engineForce = -ebTq * ratioFor(drive.gear) * SPEC.drivelineEff / WHEEL_RADIUS;
    }

    if (brakeIn > 0.02) {
      if (drive.mode === 'D' && fwdSpd > 0.5) brakeCmd = brakeIn;
      else if (drive.mode === 'R' && fwdSpd < -0.5) brakeCmd = brakeIn;
    }

    // RaycastVehicle convention here: negative engine force drives forward.
    // engineForce is the TOTAL force at the contact patches; the diff splits
    // it across both driven wheels.
    vehicle.applyEngineForce(-engineForce / 2, 2);
    vehicle.applyEngineForce(-engineForce / 2, 3);

    // --- Brakes (front-biased) ---
    const bf = SPEC.brakeFront * brakeCmd;
    let br = SPEC.brakeRear * brakeCmd;
    if (ctrl.handbrake) br = Math.max(br, SPEC.handbrake);
    vehicle.setBrake(bf, 0);
    vehicle.setBrake(bf, 1);
    vehicle.setBrake(br, 2);
    vehicle.setBrake(br, 3);

    // --- Steering: traction-limited. The cap follows the steady-state
    // no-slip angle for the tyres' lateral capacity (δ ≈ a_lat·L/v²) with a
    // margin so you can still provoke the car; at low speed it opens up to
    // full lock. This is why a flat-out corner now washes wide instead of
    // pivoting on rails.
    const aLatMax = SPEC.mu.road * 9.82 * SPEC.steerSlipMargin;
    const vv = Math.max(1, speed * speed);
    const steerCap = Math.min(SPEC.maxSteer,
      aLatMax * WHEELBASE / vv + SPEC.steerFloor);
    const steerTarget = -ctrl.steer * steerCap;
    // Rate-limit the column so turn-in has realistic weight.
    const steerRate = 4.0 * Math.max(steerCap, 0.12);
    const dSteer = THREE.MathUtils.clamp(
      steerTarget - drive.steer, -steerRate * dt, steerRate * dt);
    drive.steer += dSteer;
    vehicle.setSteeringValue(drive.steer, 0);
    vehicle.setSteeringValue(drive.steer, 1);

    // --- Per-wheel grip from the surface it is on ---
    for (let i = 0; i < 4; i++) {
      let mu = SPEC.mu[drive.surfaces[i]] ?? SPEC.mu.road;
      // Handbrake breaks the rears loose.
      if (ctrl.handbrake && i >= 2) mu *= 0.55;
      vehicle.wheelInfos[i].frictionSlip = mu;
    }

    // --- Telemetry / lights ---
    drive.smoothedRpm += (drive.rpm - drive.smoothedRpm) * Math.min(1, dt * 12);
    telemetry.rpm = drive.smoothedRpm;
    telemetry.rpmFrac = THREE.MathUtils.clamp(
      (drive.smoothedRpm - SPEC.idleRpm) / (SPEC.redlineRpm - SPEC.idleRpm), 0, 1);
    telemetry.speedKmh = speed * 3.6;
    if (speed < 0.6 && throttle < 0.05) telemetry.gearLabel = 'N';
    else if (drive.mode === 'R') telemetry.gearLabel = 'R';
    else telemetry.gearLabel = String(drive.gear);

    const brakeLevel = Math.min(1, Math.max(brakeCmd, ctrl.handbrake ? 0.8 : 0));
    setBrakeLight(brakeLevel * 1.6);
  }

  // Visual wheel meshes paired to the physics info
  const wheelMeshes = visual.wheels;

  function update() {
    for (let i = 0; i < vehicle.wheelInfos.length; i++) {
      vehicle.updateWheelTransform(i);
      const t = vehicle.wheelInfos[i].worldTransform;
      const m = wheelMeshes[i];
      m.position.copy(t.position);
      m.quaternion.copy(t.quaternion);
    }
    visual.root.position.copy(chassisBody.position);
    visual.root.quaternion.copy(chassisBody.quaternion);
    // Brake lights — pulse with brake input
    visual.brakeLights.material.emissiveIntensity = visual._brakeLevel;
    visual.brakeLights.material.opacity = 0.5 + visual._brakeLevel * 0.5;
  }

  function setBrakeLight(level) {
    visual._brakeLevel = level;
  }

  function reset(position, yaw = 0) {
    chassisBody.position.set(position.x, position.y, position.z);
    chassisBody.velocity.setZero();
    chassisBody.angularVelocity.setZero();
    const q = new CANNON.Quaternion();
    q.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), yaw);
    chassisBody.quaternion.copy(q);
    drive.gear = 1;
    drive.mode = 'D';
    drive.shiftT = 0;
    drive.steer = 0;
    drive.rpm = SPEC.idleRpm;
    vehicle.applyEngineForce(0, 2);
    vehicle.applyEngineForce(0, 3);
    vehicle.setSteeringValue(0, 0);
    vehicle.setSteeringValue(0, 1);
    for (let i = 0; i < 4; i++) vehicle.setBrake(0, i);
  }

  function dispose() {
    world.removeEventListener('preStep', preStepForces);
    vehicle.removeFromWorld(world);
    world.removeBody(chassisBody);
  }

  return {
    visual,
    body: chassisBody,
    vehicle,
    update,
    setBrakeLight,
    reset,
    applyControls,
    dispose,
    telemetry,
    spec: SPEC,
  };
}
