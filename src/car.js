import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { buildVisualCar } from './carModels/index.js';
import { getCarSpec, getSteerCap, torqueAt } from './carSpecs.js';
import {
  WHEEL_RADIUS, SUSPENSION_REST, SUSPENSION_STIFFNESS, stanceFor,
} from './stance.js';

// Collision box of a car that declares none of its own. The specs size theirs
// to the body: a speedster is half a metre shorter than the muscle car and
// should snag half a metre less barrier.
const CHASSIS_HALF = { x: 0.92, y: 0.32, z: 2.18 };


// Load-sensitive grip: a tyre loaded above the car's average wheel load gives
// up some μ; a lightly loaded one gains a little. Referenced to the mean so a
// uniform load change (downforce) doesn't move μ — only redistribution does.
function loadMu(spec, baseMu, load, avgLoad) {
  if (avgLoad <= 1) return baseMu;
  const f = 1 - spec.loadSensitivity * (load / avgLoad - 1);
  const lo = 1 - spec.loadMuClamp;
  const hi = 1 + spec.loadMuClamp;
  return baseMu * Math.min(hi, Math.max(lo, f));
}

// The rev band the HUD tachometer is drawn against.
const defaultSpec = getCarSpec();
export const ENGINE_BAND = Object.freeze({
  idleRpm: defaultSpec.idleRpm, redlineRpm: defaultSpec.redlineRpm, shiftUpRpm: defaultSpec.shiftUpRpm,
});

/**
 * Builds a car with its own driving specification: lofted PBR visual and a
 * Cannon RaycastVehicle with engine, gearbox and aerodynamic simulation.
 */
export function createCar(world, materials, options = {}) {
  const bodyColor = options.color ?? 0xc8161d;
  // `options.spec` lets a tuning probe drive a variant of a package without
  // editing carSpecs.js; the game itself only ever passes an archetype id.
  const SPEC = options.spec ?? getCarSpec(options.archetype);
  const archetype = options.spec ? (options.archetype ?? SPEC.id) : SPEC.id;
  // Where this car's centre of mass sits over its wheels (stance.js). The
  // visual body is dropped to the same hub height so shell and wheels agree.
  const stance = stanceFor(SPEC.cgHeight);
  const visual = buildVisualCar(archetype, bodyColor, { hubLocalY: stance.hubLocalY });

  // Chassis body
  const half = { ...CHASSIS_HALF, ...(SPEC.chassisHalf ?? {}) };
  const chassisShape = new CANNON.Box(new CANNON.Vec3(half.x, half.y, half.z));
  const chassisBody = new CANNON.Body({
    mass: SPEC.massKg,
    material: materials.chassisMat,
  });
  // The box hangs with its underside 0.30 m above the road whatever height
  // the centre of mass (the body origin) sits at. It used to be fixed in body
  // space, which was fine while every car's origin was 0.68 m up; a car with
  // a lower centre of mass then carried its box 13 cm off the asphalt, where
  // it caught the kerbs at speed and vaulted the armco off them. (The shape
  // offset moves only the collision geometry — in cannon the origin IS the
  // centre of mass, so this never changed the handling.)
  const BOX_BOTTOM = 0.30;
  chassisBody.addShape(chassisShape,
    new CANNON.Vec3(0, BOX_BOTTOM + half.y - stance.chassisHeight, 0));
  chassisBody.angularDamping = SPEC.angularDamping ?? 0.25;
  // Yaw inertia. cannon derives it from the collision box, which says nothing
  // about where the mass sits: a mid-engined speedster with everything between
  // the axles turns in like a kart, a big-block coupe with the engine over
  // the nose has to be persuaded. The spec scales the box figure to say which.
  const yawInertia = SPEC.yawInertia ?? 1;
  if (yawInertia !== 1) {
    chassisBody.inertia.y *= yawInertia;
    chassisBody.invInertia.y = chassisBody.inertia.y > 0 ? 1 / chassisBody.inertia.y : 0;
    chassisBody.updateInertiaWorld(true);
  }
  // Torque share sent to the front axle. 0 is rear drive; a rally car runs
  // ~0.4 and gets four tyres' worth of traction out of every hairpin.
  const frontDrive = THREE.MathUtils.clamp(SPEC.frontDrive ?? 0, 0, 0.6);
  // Rear tyres' share of grip relative to the fronts. Below 1 the tail lets
  // go first (power oversteer); above 1 the nose washes wide (understeer).
  const gripBalance = SPEC.gripBalance ?? 1;

  const vehicle = new CANNON.RaycastVehicle({
    chassisBody,
    indexRightAxis: 0,   // x
    indexUpAxis: 1,      // y
    indexForwardAxis: 2, // z
  });

  const wheelOptions = {
    radius: WHEEL_RADIUS,
    directionLocal: new CANNON.Vec3(0, -1, 0),
    suspensionStiffness: SUSPENSION_STIFFNESS,
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

  const wb = SPEC.wheelbase / 2;        // wheelbase half
  const tw = (SPEC.trackWidth ?? 1.72) / 2;  // track half
  const wy = stance.anchorY;       // suspension anchor y in chassis space
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
    engineRpm: SPEC.idleRpm, // real flywheel speed (state, integrated each frame)
    wheelOmega: 0,           // driven-wheel angular speed (rad/s) — the spin state
    smoothedRpm: SPEC.idleRpm,
    steer: 0,
    surfaces: ['road', 'road', 'road', 'road'],
    throttle: 0,
    brakeLevel: 0,
    slip: 0,             // driven-wheel longitudinal slip ratio (>0 = wheelspin)
  };

  const telemetry = {
    rpm: SPEC.idleRpm,
    rpmFrac: 0,
    gearLabel: 'N',
    speedKmh: 0,
    slip: 0,             // exposed so the HUD/tests can see wheelspin
    // The sound reads the engine straight off the driving state, not the
    // smoothed tach: the raw flywheel speed, the throttle the engine is
    // actually being given (zero through a shift cut), the gear, and the
    // surface under each wheel (audio.js).
    engineRpm: SPEC.idleRpm,
    throttle: 0,
    brake: 0,
    gear: 0,
    shifting: false,
    surfaces: drive.surfaces,
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

    // Instantaneous vertical load on each tyre, from the suspension. Cannon
    // already transfers weight as the body pitches/rolls, so these capture
    // dive, squat and lateral load shift — the basis for load-sensitive grip.
    const loads = [0, 0, 0, 0];
    let loadSum = 0;
    let loadN = 0;
    for (let i = 0; i < 4; i++) {
      const f = vehicle.wheelInfos[i].suspensionForce || 0;
      loads[i] = f;
      if (f > 0) { loadSum += f; loadN += 1; }
    }
    const avgLoad = loadN > 0 ? loadSum / loadN : SPEC.massKg * 9.82 / 4;

    // --- Direction mode (simple automatic): brake at standstill → reverse;
    //     throttle at standstill while reversing → forward.
    if (drive.mode === 'D' && ctrl.brake > 0.1 && fwdSpd < 0.5 && speed < 1.0) {
      drive.mode = 'R';
      drive.gear = 1;
    } else if (drive.mode === 'R' && ctrl.throttle > 0.1 && fwdSpd > -0.5) {
      drive.mode = 'D';
      drive.gear = 1;
    }

    // --- Gearbox (auto). Shift on the RPM implied by *road speed*, not the
    //     flywheel — a wheelspin flare must not trigger a phantom upshift. ---
    const ratioFor = (g) => SPEC.gears[g - 1] * SPEC.finalDrive;
    if (drive.shiftT > 0) drive.shiftT -= dt;
    const driveRatio = drive.mode === 'D'
      ? ratioFor(drive.gear)
      : SPEC.reverseRatio * SPEC.finalDrive;
    const wheelRps = Math.abs(fwdSpd) / (2 * Math.PI * WHEEL_RADIUS); // rev/s
    const roadRpm = THREE.MathUtils.clamp(
      wheelRps * 60 * driveRatio, SPEC.idleRpm, SPEC.redlineRpm);
    if (drive.mode === 'D' && drive.shiftT <= 0) {
      if (roadRpm > SPEC.shiftUpRpm && drive.gear < SPEC.gears.length) {
        drive.gear += 1;
        drive.shiftT = SPEC.shiftTime;
      } else if (roadRpm < SPEC.shiftDownRpm && drive.gear > 1) {
        drive.gear -= 1;
        drive.shiftT = SPEC.shiftTime * 0.6;
      }
    }
    // Ratio after any shift this frame (the gear may have just changed).
    const ratio = drive.mode === 'D'
      ? ratioFor(drive.gear)
      : SPEC.reverseRatio * SPEC.finalDrive;

    const throttle = drive.mode === 'D' ? ctrl.throttle : ctrl.brake;
    const brakeIn = drive.mode === 'D' ? ctrl.brake : ctrl.throttle;
    const onThrottle = throttle > 0.02 && drive.shiftT <= 0;

    // --- Crank torque the engine is making right now, from its *own* RPM. ---
    // A soft rev limiter fades the torque out over the last 2 % below the
    // redline, judged on the RPM the road speed implies in the current gear.
    // Without it a car whose top gear runs out before its drag does (a
    // short-geared V8) would keep pulling at its redline torque with the
    // tach pinned, past any speed its gearing allows.
    const roadRpmRaw = wheelRps * 60 * ratio;
    const limiter = THREE.MathUtils.clamp(
      (SPEC.redlineRpm - roadRpmRaw) / (0.02 * SPEC.redlineRpm), 0, 1);
    let crankTq;
    if (onThrottle) {
      crankTq = torqueAt(SPEC, drive.engineRpm) * throttle * limiter;
    } else {
      // Off throttle (or during a shift cut) the engine is a brake.
      crankTq = -SPEC.engineBrakeNm * (drive.engineRpm / SPEC.redlineRpm)
              * (fwdSpd > 1 || drive.engineRpm > SPEC.idleRpm + 50 ? 1 : 0);
    }

    // Force the driveline *wants* at the contact patch (+ = forward).
    const dir = drive.mode === 'R' ? -1 : 1;
    const Fdesired = crankTq * ratio * SPEC.drivelineEff / WHEEL_RADIUS * dir;

    // --- Driven-axle traction budget: a friction circle on load-sensitive
    //     grip, eased toward the kinetic floor once the tyres are spinning.
    //     Cornering load eats into what's left for drive, so you can't both
    //     turn and power at the limit. Each driven axle has its own budget;
    //     a four-wheel-drive car adds the fronts' to the rears'. ---
    const yawRate = chassisBody.angularVelocity.y;
    const aLat = Math.abs(speed * yawRate);
    // 1.3 margin: v·yawRate understates true tyre demand while ploughing.
    const fLatAxle = SPEC.massKg * aLat * 0.5 * 1.3;
    const slipEase = drive.slip > 0.14
      ? THREE.MathUtils.lerp(1, SPEC.slipGripFloor,
        THREE.MathUtils.clamp((drive.slip - 0.14) / 0.5, 0, 1))
      : 1;
    const axleCap = (a, b, muScale) => {
      const nA = loads[a], nB = loads[b];
      const grip = muScale * (
        loadMu(SPEC, SPEC.mu[drive.surfaces[a]] ?? SPEC.mu.road, nA, avgLoad) * nA +
        loadMu(SPEC, SPEC.mu[drive.surfaces[b]] ?? SPEC.mu.road, nB, avgLoad) * nB);
      const cap = grip * grip - fLatAxle * fLatAxle;
      // Once the tyres are spinning, grip eases toward its kinetic floor. Uses
      // last frame's slip (persistent state) — it's recomputed below.
      return (cap > 0 ? Math.sqrt(cap) : 0) * slipEase;
    };
    const capRear = axleCap(2, 3, gripBalance);
    const capFront = frontDrive > 0 ? axleCap(0, 1, 1) : 0;
    const fCap = capRear + capFront;
    const drivenLoad = loads[2] + loads[3] + (frontDrive > 0 ? loads[0] + loads[1] : 0);

    // Traction-limit the force the tyres can actually lay down.
    let engineForce = Fdesired;
    if (drivenLoad > 100) {
      engineForce = Fdesired >= 0
        ? Math.min(Fdesired, fCap)
        : Math.max(Fdesired, -fCap);
    }
    if (drive.mode === 'R' && -fwdSpd > SPEC.maxReverseSpeed) engineForce = 0;
    // Split between the axles: the rears take their nominal share up to what
    // they can hold, and the centre coupling sends the rest forward — so a
    // rally car that lights up its rears on gravel still pulls on its fronts.
    // In the air (or on a crest with the driven tyres unloaded) there is no
    // traction budget to split against: each axle gets its nominal share, so
    // the driven wheels still spin up the way cannon draws them.
    const fMag = Math.abs(engineForce), fSign = Math.sign(engineForce);
    let fFront, fRear;
    if (drivenLoad > 100) {
      fFront = Math.min(fMag - Math.min(fMag * (1 - frontDrive), capRear), capFront);
      fRear = Math.min(fMag - fFront, capRear);
    } else {
      fFront = fMag * frontDrive;
      fRear = fMag - fFront;
    }

    // --- Driven-wheel flywheel. The clutch stays locked, so engine RPM follows
    //     the driven wheels through the gearing. When the tyres take all the
    //     torque the wheels simply roll (ω = v/r) and the tach reads road speed.
    //     When demand outruns grip the surplus torque spins the driven wheels —
    //     and the geared-up engine + flywheel — faster than the road: that's
    //     wheelspin, shown live on the tach and costing grip via the falloff
    //     above. Integrated at the wheel hub, with engine inertia referred there
    //     by ratio². ---
    const omegaRoad = Math.abs(fwdSpd) / WHEEL_RADIUS;             // rad/s rolling
    const omegaMax = (SPEC.redlineRpm / 60 * 2 * Math.PI) / ratio;  // rev limiter
    const spinning = onThrottle && drivenLoad > 100
                   && Math.abs(Fdesired) > fCap + 1;
    if (spinning) {
      const Ihub = SPEC.engineInertia * ratio * ratio
                 + (frontDrive > 0 ? 4 : 2) * SPEC.wheelInertia;
      const driveTq = Math.abs(crankTq) * ratio * SPEC.drivelineEff; // at the hub
      const tractionTq = Math.abs(engineForce) * WHEEL_RADIUS;       // resisting
      if (drive.wheelOmega < omegaRoad) drive.wheelOmega = omegaRoad;
      drive.wheelOmega += (driveTq - tractionTq) / Ihub * dt;
      drive.wheelOmega = THREE.MathUtils.clamp(drive.wheelOmega, omegaRoad, omegaMax);
    } else {
      drive.wheelOmega = omegaRoad;                  // gripping → rolls with road
    }
    drive.engineRpm = THREE.MathUtils.clamp(
      Math.max(drive.wheelOmega * ratio * 60 / (2 * Math.PI), SPEC.idleRpm),
      SPEC.idleRpm, SPEC.redlineRpm);
    drive.rpm = drive.engineRpm;
    // Longitudinal slip ratio (drives the grip falloff next frame + telemetry).
    const treadSpeed = drive.wheelOmega * WHEEL_RADIUS;
    drive.slip = (treadSpeed - Math.abs(fwdSpd)) / Math.max(2.5, Math.abs(fwdSpd));

    let brakeCmd = 0;
    if (brakeIn > 0.02) {
      if (drive.mode === 'D' && fwdSpd > 0.5) brakeCmd = brakeIn;
      else if (drive.mode === 'R' && fwdSpd < -0.5) brakeCmd = brakeIn;
    }

    // RaycastVehicle convention here: negative engine force drives forward.
    // engineForce is the TOTAL force at the contact patches; each axle's diff
    // splits its share across its two wheels.
    vehicle.applyEngineForce(-fSign * fRear / 2, 2);
    vehicle.applyEngineForce(-fSign * fRear / 2, 3);
    vehicle.applyEngineForce(-fSign * fFront / 2, 0);
    vehicle.applyEngineForce(-fSign * fFront / 2, 1);

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
    const steerCap = getSteerCap(SPEC, speed);
    const steerTarget = -ctrl.steer * steerCap;
    // Rate-limit the column so turn-in has realistic weight.
    const steerRate = SPEC.steerRate * Math.max(steerCap, 0.12);
    const dSteer = THREE.MathUtils.clamp(
      steerTarget - drive.steer, -steerRate * dt, steerRate * dt);
    drive.steer += dSteer;
    vehicle.setSteeringValue(drive.steer, 0);
    vehicle.setSteeringValue(drive.steer, 1);

    // --- Per-wheel grip: surface μ, scaled by how hard that corner is loaded
    //     (load sensitivity) so weight transfer redistributes grip the way it
    //     does on a real car. ---
    for (let i = 0; i < 4; i++) {
      let mu = loadMu(SPEC, SPEC.mu[drive.surfaces[i]] ?? SPEC.mu.road, loads[i], avgLoad);
      if (i >= 2) {
        mu *= gripBalance;
        // Handbrake breaks the rears loose.
        if (ctrl.handbrake) mu *= 0.55;
      }
      vehicle.wheelInfos[i].frictionSlip = mu;
    }

    // --- Telemetry / lights ---
    drive.smoothedRpm += (drive.rpm - drive.smoothedRpm) * Math.min(1, dt * 12);
    telemetry.rpm = drive.smoothedRpm;
    telemetry.rpmFrac = THREE.MathUtils.clamp(
      (drive.smoothedRpm - SPEC.idleRpm) / (SPEC.redlineRpm - SPEC.idleRpm), 0, 1);
    telemetry.speedKmh = speed * 3.6;
    telemetry.slip = drive.slip;
    telemetry.engineRpm = drive.engineRpm;
    telemetry.throttle = onThrottle ? throttle : 0;
    telemetry.brake = brakeCmd;
    telemetry.gear = drive.mode === 'D' ? drive.gear : 0;
    telemetry.shifting = drive.shiftT > 0;
    if (speed < 0.6 && throttle < 0.05) telemetry.gearLabel = 'N';
    else if (drive.mode === 'R') telemetry.gearLabel = 'R';
    else telemetry.gearLabel = String(drive.gear);

    const brakeLevel = Math.min(1, Math.max(brakeCmd, ctrl.handbrake ? 0.8 : 0));
    setBrakeLight(brakeLevel * 1.6);
  }

  // Visual wheel meshes paired to the physics info
  const wheelMeshes = visual.wheels;

  // ---- Render-state interpolation ----
  // The world steps at a fixed 120 Hz while frames arrive whenever the display
  // wants them, so a frame carries one, two or three steps of travel — and a
  // high-refresh display gets frames with none. Drawing the raw physics pose
  // made the car lurch against the spring-smoothed camera by up to a whole
  // step (half a metre at speed), which reads as the body smearing and
  // doubling whenever it moves. Each step is snapshotted here and the visual
  // is drawn between the last two snapshots at the accumulator's fraction, so
  // the rendered motion is continuous at any frame rate. The pose is at most
  // one step (8 ms) behind the simulation.
  const snap = () => ({
    position: new THREE.Vector3(), quaternion: new THREE.Quaternion(),
    wheels: [0, 1, 2, 3].map(() => ({ suspension: 0, steering: 0, rotation: 0 })),
  });
  const prev = snap(), curr = snap();
  function readState(into) {
    const p = chassisBody.position, q = chassisBody.quaternion;
    into.position.set(p.x, p.y, p.z);
    into.quaternion.set(q.x, q.y, q.z, q.w);
    for (let i = 0; i < 4; i++) {
      const w = vehicle.wheelInfos[i];
      const s = into.wheels[i];
      s.suspension = w.suspensionLength;
      s.steering = w.steering;
      s.rotation = w.rotation;
    }
  }
  function syncSnapshots() {
    readState(curr);
    prev.position.copy(curr.position);
    prev.quaternion.copy(curr.quaternion);
    for (let i = 0; i < 4; i++) Object.assign(prev.wheels[i], curr.wheels[i]);
  }
  function postStep() {
    prev.position.copy(curr.position);
    prev.quaternion.copy(curr.quaternion);
    for (let i = 0; i < 4; i++) Object.assign(prev.wheels[i], curr.wheels[i]);
    readState(curr);
  }
  world.addEventListener('postStep', postStep);
  syncSnapshots();

  // The pose the car is DRAWN at this frame. The chase camera and the shadow
  // frustum follow this, not the raw body, so they never disagree with what
  // is on screen.
  const pose = { position: visual.root.position, quaternion: visual.root.quaternion };

  // Wheel pose in chassis space, the same construction cannon's
  // updateWheelTransform uses: hub = anchor + direction * suspension length,
  // orientation = steer about the suspension axis, then spin about the axle.
  const _wUp = new THREE.Vector3(), _wAxle = new THREE.Vector3();
  const _wSteer = new THREE.Quaternion(), _wSpin = new THREE.Quaternion();
  const _wLocal = new THREE.Vector3();
  function placeWheel(i, chassisPos, chassisQ, suspension, steering, rotation) {
    const w = vehicle.wheelInfos[i];
    const m = wheelMeshes[i];
    _wUp.set(-w.directionLocal.x, -w.directionLocal.y, -w.directionLocal.z).normalize();
    _wAxle.set(w.axleLocal.x, w.axleLocal.y, w.axleLocal.z).normalize();
    _wSteer.setFromAxisAngle(_wUp, steering);
    _wSpin.setFromAxisAngle(_wAxle, rotation);
    m.quaternion.copy(chassisQ).multiply(_wSteer).multiply(_wSpin).normalize();
    _wLocal.set(
      w.chassisConnectionPointLocal.x + w.directionLocal.x * suspension,
      w.chassisConnectionPointLocal.y + w.directionLocal.y * suspension,
      w.chassisConnectionPointLocal.z + w.directionLocal.z * suspension,
    ).applyQuaternion(chassisQ);
    m.position.copy(chassisPos).add(_wLocal);
  }

  // Scratch objects for re-seating the contact shadow (see below).
  const _up = new THREE.Vector3(0, 1, 0);
  const _yawQ = new THREE.Quaternion();
  const _invQ = new THREE.Quaternion();
  const _off = new THREE.Vector3();
  const _lerpQ = new THREE.Quaternion();
  // Clear the asphalt (0.01) and its cambered crown, but stay well under the
  // 0.36 wheel radius so the blob can never ride up over a tyre.
  const SHADOW_LIFT = 0.03;
  // Airtime response. A caster that leaves the ground casts a shadow that stays
  // on the ground, spreads, and lightens as the penumbra opens up — so a
  // launched car's blob is not a hard black patch travelling with it.
  const AIR_SPAN = 0.8;       // gap (m) at which the blob has faded out entirely
  const AIR_SPREAD = 0.6;     // how much wider it has grown by then
  // Suspension rebound is not airtime: a car cresting a rise or unloading after
  // a stop lifts the chassis a centimetre or two with all four tyres still
  // down, and that must leave the shadow exactly as it was.
  const AIR_DEADBAND = 0.02;
  // Road height under the car, carried over from the last frame a tyre was on
  // it. An airborne car cannot measure the ground from its own wheels: the
  // suspension raycast reaches only ~5 cm past the settled ride height, and
  // past that the wheels hang at full droop, so the road they imply climbs with
  // the chassis and the blob flies along with the car. The physics ground is a
  // single flat plane (`track.js`), so the last reading stays true while the
  // car is in the air; if the circuit ever gains real elevation this wants a
  // downward raycast instead.
  let groundY = 0;

  /**
   * Sync the visual to the physics. `alpha` is the fraction of a physics step
   * the frame sits past the last completed step (main.js passes the
   * accumulator's remainder); 1, the default, draws the current physics state
   * exactly, which is what every probe and screenshot script expects.
   */
  function update(alpha = 1) {
    let hitSum = 0, contacts = 0;
    for (let i = 0; i < vehicle.wheelInfos.length; i++) {
      const w = vehicle.wheelInfos[i];
      // Sample contact BEFORE updateWheelTransform — its first line clears
      // `isInContact`. `raycastResult` survives the call, and on a wheel that
      // is down, its hit point IS the road under that wheel.
      if (w.raycastResult.body) { hitSum += w.raycastResult.hitPointWorld.y; contacts++; }
      // Keeps cannon's own worldTransform current for anything that reads it.
      vehicle.updateWheelTransform(i);
    }
    // Only wheels that are actually down get a vote: a lifted wheel hangs at
    // full droop, and averaging it in drags the estimated road up with it.
    if (contacts > 0) groundY = hitSum / contacts;

    if (alpha >= 1) {
      const p = chassisBody.position, q = chassisBody.quaternion;
      visual.root.position.set(p.x, p.y, p.z);
      visual.root.quaternion.set(q.x, q.y, q.z, q.w);
      for (let i = 0; i < 4; i++) {
        const w = vehicle.wheelInfos[i];
        placeWheel(i, visual.root.position, visual.root.quaternion,
          w.suspensionLength, w.steering, w.rotation);
      }
    } else {
      const t = Math.max(0, alpha);
      visual.root.position.lerpVectors(prev.position, curr.position, t);
      _lerpQ.slerpQuaternions(prev.quaternion, curr.quaternion, t);
      visual.root.quaternion.copy(_lerpQ);
      for (let i = 0; i < 4; i++) {
        const a = prev.wheels[i], b = curr.wheels[i];
        placeWheel(i, visual.root.position, visual.root.quaternion,
          a.suspension + (b.suspension - a.suspension) * t,
          a.steering + (b.steering - a.steering) * t,
          a.rotation + (b.rotation - a.rotation) * t);
      }
    }

    // Re-seat the fake contact shadow on the ROAD. It rides under `root`, so
    // it inherits the chassis pose — which is exactly wrong for it: the sprung
    // body pitches, rolls and moves ~28 cm in ride height between the grid
    // (suspension at full rest length) and a loaded corner, which used to
    // leave the blob hanging in mid-air on the grid and buried under the
    // asphalt while driving. Undo the chassis rotation, keep the heading only,
    // and drop it to the road plane inferred from the wheel hubs.
    const shadow = visual.shadow;
    if (shadow) {
      const q = visual.root.quaternion;
      const yaw = Math.atan2(2 * (q.x * q.z + q.w * q.y), 1 - 2 * (q.x * q.x + q.y * q.y));
      _yawQ.setFromAxisAngle(_up, yaw);
      _invQ.copy(q).invert();
      shadow.quaternion.copy(_invQ).multiply(_yawQ);
      _off.set(0, groundY + SHADOW_LIFT - visual.root.position.y, 0).applyQuaternion(_invQ);
      shadow.position.copy(_off);
      // Fade and spread with the gap between the settled ride height and where
      // the chassis actually is. Scaling the mesh also scales its 1.8 cm
      // centring offset, which moves the blob by under a centimetre at full
      // spread — far less than the spread itself.
      const air = Math.max(0,
        visual.root.position.y - stance.chassisHeight - groundY - AIR_DEADBAND);
      const t = Math.min(1, air / AIR_SPAN);
      shadow.material.userData.fade.value = t;
      const s = 1 + t * AIR_SPREAD;
      shadow.scale.set(s, 1, s);
      shadow.visible = t < 1;   // fully faded is a no-op multiply — skip the draw
    }
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
    chassisBody.aabbNeedsUpdate = true;
    world.broadphase.dirty = true;
    chassisBody.wakeUp();
    drive.gear = 1;
    drive.mode = 'D';
    drive.shiftT = 0;
    drive.steer = 0;
    drive.rpm = SPEC.idleRpm;
    drive.engineRpm = SPEC.idleRpm;
    drive.wheelOmega = 0;
    drive.smoothedRpm = SPEC.idleRpm;
    drive.slip = 0;
    telemetry.engineRpm = SPEC.idleRpm;
    telemetry.throttle = 0;
    telemetry.brake = 0;
    telemetry.gear = 0;
    telemetry.shifting = false;
    for (let i = 0; i < 4; i++) vehicle.applyEngineForce(0, i);
    vehicle.setSteeringValue(0, 0);
    vehicle.setSteeringValue(0, 1);
    for (let i = 0; i < 4; i++) vehicle.setBrake(0, i);
    // A teleport must not be interpolated: the next frame would otherwise
    // draw the car sliding across the circuit from where it was.
    syncSnapshots();
  }

  function dispose() {
    visual.dispose();
    world.removeEventListener('preStep', preStepForces);
    world.removeEventListener('postStep', postStep);
    vehicle.removeFromWorld(world);
    world.removeBody(chassisBody);
  }

  return {
    visual,
    body: chassisBody,
    vehicle,
    pose,
    update,
    setBrakeLight,
    reset,
    applyControls,
    dispose,
    telemetry,
    spec: SPEC,
    // Ride-height geometry: the chassis height to spawn this car at, and the
    // hub offset its shell hangs at (stance.js).
    stance,
    // Body shape, so the sound can pick an engine character to match it.
    archetype,
  };
}
