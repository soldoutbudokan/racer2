import * as THREE from 'three';
import {
  getCarSpec, getCarPerformance, getSteerCap, getCornerSpeed, getLateralAcceleration,
  applyBrakingPasses,
} from './carSpecs.js';

/**
 * Racing-line AI built for the realistic driving model.
 *
 * Pre-computes a physics-based speed profile over the whole lap:
 *   1. corner-limited speed from centreline curvature (v = √(a_lat/κ)),
 *   2. a backward pass that caps each frame by what the brakes can shed
 *      before the next slow corner (anticipatory braking).
 * At runtime it pure-pursuits a speed-scaled lookahead point and converts
 * the needed path curvature into a steering command through the same
 * traction-limited steering map the player has.
 */
export function createAIDriver(track, options = {}) {
  const skill = THREE.MathUtils.clamp(options.skill ?? 0.85, 0, 1);
  let spec = options.spec ?? getCarSpec();
  let aLatMax, aBrake, vMax, pedalDecel, capability;

  const ctrl = {
    throttle: 0,
    brake: 0,
    steer: 0,
    handbrake: false,
  };

  const frames = track.frames;
  const n = frames.length;

  // --- arc length per frame and curvature κ (1/m) ---
  const ds = new Float32Array(n);
  const arc = new Float64Array(n + 1);
  for (let i = 0; i < n; i++) {
    ds[i] = frames[i].pos.distanceTo(frames[(i + 1) % n].pos);
    arc[i + 1] = arc[i] + ds[i];
  }
  const lapLength = arc[n];
  const kappa = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t1 = frames[i].tan;
    const t2 = frames[(i + 1) % n].tan;
    const c = Math.max(0, 1 - t1.dot(t2));              // ≈ θ²/2
    const theta = Math.sqrt(2 * c);
    kappa[i] = theta / Math.max(0.5, ds[i]);
  }
  // smooth κ a little so noise doesn't make the profile jumpy
  const kSmooth = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    let s = 0;
    for (let k = -2; k <= 2; k++) s += kappa[(i + k + n) % n];
    kSmooth[i] = s / 5;
  }

  // --- speed profile ---
  const profile = new Float32Array(n);
  const planDecel = new Float32Array(n);   // deceleration the plan asks for at each frame
  function planFor(nextSpec) {
    spec = nextSpec;
    capability = getCarPerformance(spec);
    aLatMax = spec.mu.road * 9.82 * (0.65 + 0.3 * skill);
    aBrake = capability.aBrake * 0.85;
    // A fraction of the car's own terminal speed: 0.95 at skill 0.85.
    vMax = capability.vMax * ((52 + 18 * skill) / 71);
    // Deceleration at full pedal from the car's own brake clamps (impulse
    // per 1/120 s step and wheel → force at the road), so the pedal can be
    // set to the deceleration the plan asks for.
    pedalDecel = (spec.brakeFront + spec.brakeRear) * 2 * 120 / spec.massKg;
    for (let i = 0; i < n; i++) {
      profile[i] = Math.min(vMax, getCornerSpeed(spec, kSmooth[i], aLatMax));
    }
    // Backward passes: each driver's braking distance follows their car,
    // inside the friction circle (see applyBrakingPasses).
    applyBrakingPasses(profile, kSmooth, ds, spec, aLatMax, aBrake);
    for (let i = 0; i < n; i++) {
      const next = profile[(i + 1) % n];
      planDecel[i] = Math.max(0, (profile[i] * profile[i] - next * next) / (2 * Math.max(0.1, ds[i])));
    }
  }
  planFor(spec);

  const tmpV = new THREE.Vector3();
  const tmpFwd = new THREE.Vector3();
  const roadLimit = Math.max(0, (track.width ?? 14) / 2 - 2);
  const PASS_CLEARANCE = 3.3;  // car width plus space between the mirrors
  const CREEP = 3;             // m/s past a stopped car, once the swerve fits
  // Forward room a swerve of `d` metres sideways needs at the curvature the
  // short pursuit lookahead asks for round a stopped car (R ~5 m, near full
  // lock), for a car already heading out at sin θ toward its lane: along an
  // arc, d = x·sin θ + x²/2R.
  const SWERVE_R = 5.1;
  const swerveRoom = (d, sinOut = 0) => {
    const s = THREE.MathUtils.clamp(sinOut, -1, 1);
    return SWERVE_R * (Math.sqrt(s * s + 2 * Math.max(0, d) / SWERVE_R) - s);
  };
  let passCar = null, passOffset = 0, laneOffset = null;
  // Backing straight out from behind a stopped car the swerve no longer
  // fits behind: metres still to go, seconds left, and where it started.
  const backOut = { metres: 0, t: 0, x: 0, z: 0, heldT: 0 };

  // Deceleration the car gets with no pedal at all: drag, rolling resistance,
  // the body's damping and engine braking in the gear it is in. The brake
  // feed-forward asks only for what is left of the plan's deceleration, or
  // the pedal out-brakes the plan (the formula car by 70 % at 55 m/s), falls
  // under it, throttles back up and pumps.
  function coastDecel(car, v) {
    const c = capability;
    const downforce = 0.5 * spec.airDensity * spec.clA * v * v;
    let f = c.halfRhoCdA * v * v + c.rollingDrag + spec.crr * downforce + c.bodyDamping * v;
    const gear = car.telemetry?.gear ?? 0;
    if (gear > 0) {
      const rpm = car.telemetry.engineRpm ?? 0;
      f += spec.engineBrakeNm * (rpm / spec.redlineRpm) * spec.gears[gear - 1] * spec.finalDrive *
        spec.drivelineEff / 0.36;
    }
    return f / spec.massKg;
  }

  // Continuous track coordinates keep traffic checks valid through corners
  // and across the start line, without confusing a neighbouring straight.
  function locate(pos, i = nearestFrameIndex(frames, pos)) {
    const f = frames[i], dx = pos.x - f.pos.x, dz = pos.z - f.pos.z;
    return {
      s: arc[i] + dx * f.tan.x + dz * f.tan.z,
      lat: dx * f.left.x + dz * f.left.z,
      frame: f,
    };
  }
  function gapTo(s, from) {
    return ((s - from + lapLength * 1.5) % lapLength) - lapLength / 2;
  }

  // ---- Stuck recovery -------------------------------------------------
  // Racing incidents happen: a car noses into the armco, or spins and beaches
  // itself in the runoff. A driver who never backs out is a parked obstacle
  // for the rest of the race, so the recovery has to exist.
  //
  // But "throttle pinned and not moving" on its own describes a lot of things
  // that are NOT stuck — bogging down off the line, queueing behind an
  // incident, crawling out of a slow hairpin — and selecting reverse in any of
  // them looks far worse than simply waiting. So the fast trigger also wants
  // *evidence* of something to be stuck ON (the armco within reach, or a nose
  // pointing well off the road) and a measured lack of forward *progress*
  // rather than just a low speedometer.
  //
  // A slower blind trigger still fires with no evidence at all, so a car
  // wedged on something this driver cannot see recovers eventually instead of
  // sitting at full throttle for the rest of the race.
  const STUCK_SPEED = 1.5;       // m/s — below this the car is "not moving"
  const STUCK_PROGRESS_M = 1.2;  // m from the anchor that counts as going somewhere
  const STUCK_EVIDENT_S = 1.2;   // s pinned *with* evidence before backing out
  const STUCK_BLIND_S = 4.0;     // s pinned *without* evidence before backing out
  const WALL_REACH_M = 3.0;      // armco this close is something to be stuck on
  const MISALIGN_DOT = 0.64;     // ≈50° off the track direction — spun, not driving
  const REVERSE_S = 1.5;         // cap on one recovery
  const FREE_BACK_M = 1.6;       // backed out this far and clear → drive again
  const BEHIND_M = 7.0;          // never reverse into a car this close behind (origin to origin: ~2.5 m of bumper gap)

  // Lateral distance from the centreline at which the barriers stand.
  const wallOffset = track.armcoOffset ?? (track.width ?? 14) / 2 + 6;

  // Live recovery state. Exposed on the driver so a test can assert on what
  // the driver *decided*, not just where the car ended up — the class of bug
  // this replaces was invisible to every position-based gate.
  const recovery = {
    stuckT: 0,        // s spent pinned and making no progress
    reverseT: 0,      // s of backing-out left (0 = driving normally)
    nearWall: false,  // the armco is within reach
    misaligned: false,// nose is pointing well off the track direction
    carBehind: false, // someone is close enough behind to be reversed into
    anchored: false,  // the progress anchor has been stamped at least once
    anchorX: 0, anchorZ: 0,   // where "no forward progress" is measured from
    stuckX: 0, stuckZ: 0,     // where this recovery started backing out from
  };

  /**
   * @param car      this driver's car
   * @param others   optional array of other cars (raw car objects) to avoid
   * @param dt       seconds since last update (for the stuck timers)
   */
  function update(car, others, dt = 1 / 60) {
    if (car.spec && car.spec !== spec) planFor(car.spec);
    const pos = car.body.position;
    const nearest = nearestFrameIndex(frames, pos);
    const speed = Math.hypot(car.body.velocity.x, car.body.velocity.z);
    const here = locate(pos, nearest);
    if (laneOffset === null) laneOffset = THREE.MathUtils.clamp(here.lat, -roadLimit, roadLimit);
    ctrl.handbrake = false;

    const q = car.body.quaternion;
    const fx = 2 * (q.x * q.z + q.w * q.y);
    const fz = 1 - 2 * (q.x * q.x + q.y * q.y);
    tmpFwd.set(fx, 0, fz).normalize();

    let carBehind = false;
    const traffic = [];
    for (const other of others ?? []) {
      if (!other || other === car) continue;
      const p = other.body.position;
      const dx = p.x - pos.x, dz = p.z - pos.z;
      const ahead = dx * tmpFwd.x + dz * tmpFwd.z;
      const lateral = -dx * tmpFwd.z + dz * tmpFwd.x;
      if (ahead < 0 && ahead > -BEHIND_M && Math.abs(lateral) < 3) carBehind = true;
      if (dx * dx + dz * dz > 140 * 140) continue;
      const location = locate(p);
      const gap = gapTo(location.s, here.s);
      if (Math.abs(gap) > 140) continue;
      const v = other.body.velocity;
      // A car stopped at an angle (a spin) reaches further across the road
      // and less far along it than its box suggests.
      const oq = other.body.quaternion;
      const ofx = 2 * (oq.x * oq.z + oq.w * oq.y), ofz = 1 - 2 * (oq.x * oq.x + oq.y * oq.y);
      const cosA = Math.min(1, Math.abs(ofx * location.frame.tan.x + ofz * location.frame.tan.z) / Math.max(1e-6, Math.hypot(ofx, ofz)));
      const sinA = Math.sqrt(1 - cosA * cosA);
      const half = other.spec?.chassisHalf ?? { x: 0.92, z: 2.18 };
      traffic.push({ car: other, gap, lat: location.lat,
        reach: half.x * cosA + half.z * sinA, along: half.z * cosA + half.x * sinA,
        speed: v.x * location.frame.tan.x + v.z * location.frame.tan.z });
    }

    // Target speed: look slightly ahead in the profile so we brake in time
    // even between samples, and anticipate by current speed.
    const aheadFrames = 2 + Math.floor(speed / 18);
    let target = Infinity;
    for (let k = 0; k <= aheadFrames; k++) {
      target = Math.min(target, profile[(nearest + k) % n]);
    }
    const planAhead = target;

    // Commit to a clear passing lane until the entire car is ahead. Repeated
    // steering nudges used to oscillate behind a slower car, or aim at grass.
    // Sideways clearance to another car: our half-width plus its reach across
    // the road (more for a car stopped at an angle) plus a margin.
    const myHalf = spec.chassisHalf ?? { x: 0.92, z: 2.18 };
    const clear = (t, margin, floor) => Math.max(floor, myHalf.x + t.reach + margin);
    const laneClear = (offset, ignore) => traffic.every((t) => {
      if (t.car === ignore) return true;
      const rearRoom = 9 + Math.max(0, t.speed - speed) * 1.2;
      const frontRoom = 10 + Math.max(0, speed - t.speed) * 1.2;
      const sweep = clear(t, 0.8, 2.7);
      const inSweep = t.lat > Math.min(here.lat, offset) - sweep
        && t.lat < Math.max(here.lat, offset) + sweep;
      return t.gap < -rearRoom || t.gap > frontRoom || !inSweep;
    });
    const passing = traffic.find((t) => t.car === passCar);
    if (!passing || passing.gap < -9 || !laneClear(passOffset, passCar)) passCar = null;
    if (!passCar) {
      const leader = traffic.filter((t) => t.gap > 0
        && t.gap < Math.max(25, speed * 1.6)
        && Math.abs(t.lat - here.lat) < clear(t, 0.8, 2.7)
        && t.speed < target - 2).sort((a, b) => a.gap - b.gap)[0];
      // Leave the available grip for the corner rather than start a lane
      // change at the limit. Slow queues can still be passed in a bend.
      let bend = 0, distance = 0;
      for (let k = 0; k < n && distance < Math.max(25, speed * 1.5); k++) {
        const i = (nearest + k) % n;
        bend = Math.max(bend, kSmooth[i]);
        distance += ds[i];
      }
      if (leader && speed * speed * bend < aLatMax * 0.7) {
        const side = clear(leader, 1.45, PASS_CLEARANCE);
        const lanes = [leader.lat + side, leader.lat - side]
          .filter((offset) => Math.abs(offset) <= roadLimit && laneClear(offset, leader.car))
          .sort((a, b) => Math.abs(a - here.lat) - Math.abs(b - here.lat));
        if (lanes.length) { passCar = leader.car; passOffset = lanes[0]; }
      }
    }
    // Keep a lane beside another car instead of cutting back across its nose.
    let desiredOffset = passCar ? passOffset : 0;
    if (!laneClear(desiredOffset, passCar)) desiredOffset = laneOffset;
    laneOffset += THREE.MathUtils.clamp(desiredOffset - laneOffset, -2.5 * dt, 2.5 * dt);
    laneOffset = THREE.MathUtils.clamp(laneOffset, -roadLimit, roadLimit);
    const laneFactor = Math.sqrt(Math.max(0.65, 1 - Math.abs(laneOffset) * kSmooth[nearest]));
    target *= laneFactor;

    let closePass = false, shortBy = 0;
    for (const t of traffic) {
      if (t.gap <= 0 || t.gap > Math.max(30, speed * 2)) continue;
      // Until the actual car has moved clear, it still needs braking room.
      const skip = clear(t, 0.5, 2.4);
      if (Math.abs(t.lat - here.lat) >= skip && Math.abs(t.lat - laneOffset) >= skip) continue;
      const leaderSpeed = Math.max(0, t.speed);
      // Gaps are origin to origin, so the stand-off is both cars' lengths
      // along the road plus the clearance: 2.14 m when following, and when
      // pulling round a stopped car 0.64 m plus the forward room the swerve
      // still needs. A car that braked to a fixed stand-off with the last
      // of its swerve undone could not finish it from there, and sat on its
      // handbrake for as long as the other car stayed put.
      const stoppedPass = t.car === passCar && leaderSpeed < 3;
      const lengths = myHalf.z + t.along;
      const lanes = Math.abs(t.lat - laneOffset) >= skip;
      const deficit = Math.max(0, clear(t, 0.2, 0) - Math.abs(t.lat - here.lat));
      const sinOut = Math.sign(laneOffset - t.lat) * (tmpFwd.x * here.frame.left.x + tmpFwd.z * here.frame.left.z);
      const swerve = swerveRoom(deficit, sinOut);
      const standOff = lengths + (stoppedPass ? 0.64 + swerve : 2.14);
      const room = Math.max(0, t.gap - standOff - speed * 0.2);
      let limit = Math.sqrt(leaderSpeed * leaderSpeed + 2 * aBrake * room);
      if (t.gap < standOff) limit = Math.min(limit, Math.max(0, leaderSpeed - 2));
      // With the lane chosen, roll on at a walking pace once the bodies
      // clear sideways, or while the room left still covers most of the
      // swerve: steering out, the deficit and the room it needs shrink
      // faster than the gap.
      const ahead = t.gap - lengths - 0.64;
      if (stoppedPass && lanes && (deficit === 0 || ahead >= 0.9 * swerve)) {
        limit = Math.max(limit, CREEP);
      }
      if (stoppedPass && ahead < 12) closePass = true;
      // Too close to swerve round it from here: how far to back out first.
      if (stoppedPass && lanes && deficit > 0 && ahead < 0.9 * swerve) {
        shortBy = Math.max(shortBy, swerveRoom(deficit) + 0.6 - ahead);
      }
      target = Math.min(target, limit);
    }

    // A spin or an excursion needs a controlled rejoin, not straight-line pace.
    if (tmpFwd.dot(here.frame.tan) < 0.7) target = Math.min(target, 8);
    if (Math.abs(here.lat) > roadLimit + 0.5) target = Math.min(target, 12);

    // --- Pure-pursuit steering ---
    // Round a stopped car close ahead, look nearer so the swerve uses the
    // lock it has instead of a lazy 7 m arc.
    const lookM = Math.max(closePass ? 4 : 7, speed * 0.55);
    let lookI = nearest;
    let acc = 0;
    while (acc < lookM && lookI < nearest + n) {
      acc += ds[lookI % n];
      lookI++;
    }
    const lookFrame = frames[lookI % n];
    const tgt = lookFrame.pos;
    tmpV.set(tgt.x + lookFrame.left.x * laneOffset - pos.x, 0,
      tgt.z + lookFrame.left.z * laneOffset - pos.z);
    const Ld = Math.max(2, tmpV.length());
    tmpV.normalize();

    const dot = THREE.MathUtils.clamp(tmpFwd.dot(tmpV), -1, 1);
    const ang = Math.acos(dot);
    // Sign chosen so the resulting ctrl.steer converges on the target through
    // applyControls' steering convention (verified empirically — the previous
    // AI had this inverted and steered away from its pursuit point).
    const cross = tmpFwd.x * tmpV.z - tmpFwd.z * tmpV.x;
    const signed = cross < 0 ? -ang : ang;
    const needK = 2 * Math.sin(signed) / Ld;

    // Pure pursuit: κ = 2·sin(α)/Ld → needed steer angle δ = κ·wheelbase.
    // Same traction-limited cap the car itself applies, so |ctrl.steer| maps
    // to what this particular front axle can actually do.
    const cap = getSteerCap(spec, speed);
    if (ang > Math.PI / 2) {
      // The target is behind the front axle. sin(α) folds back past 90°, so
      // plain pure pursuit asks for *less* lock the more wrong the car is
      // pointing — a car that has just backed out of the armco crossed up
      // gets two thirds of a turn and arcs straight back into the barrier.
      // A driver facing away from where they need to go uses all of it.
      ctrl.steer = signed < 0 ? -1 : 1;
    } else {
      ctrl.steer = THREE.MathUtils.clamp(needK * spec.wheelbase / cap, -1, 1);
    }

    // A passing line or a correction after contact can turn more sharply
    // than the centreline profile. Respect the grip needed by that path too.
    target = Math.min(target, getCornerSpeed(spec, Math.abs(needK), aLatMax));

    // --- Longitudinal ---
    // One brake law, continuous through the braking zone, against the plan
    // where the car is: the deceleration the plan asks here, plus 3 m/s² for
    // every m/s over the speed it wants here, less what the car sheds with no
    // pedal at all (coastDecel). It aims 0.3 m/s over the plan: aimed at the
    // plan itself, the car settled 0.2 m/s under it at the apexes and lost up
    // to a second a lap. When traffic or the path sets the target instead,
    // the law works on that target alone, with no margin over it. (Braking
    // toward the lowest speed anywhere in the look-ahead, at the steepest
    // deceleration in it, slowed every car 2.5-3.5 s a lap; a floor on the
    // pedal, or a band between braking and throttle, made the light cars
    // out-brake the plan, fall under it and brake again, ~20 times a second
    // through every braking zone.)
    const planBound = target >= planAhead * laneFactor - 1e-6;
    const vRef = planBound ? Math.max(target, profile[nearest] * laneFactor) + 0.3 : target;
    const aPlan = planBound ? planDecel[nearest] : 0;
    const pedal = (aPlan + 3 * (speed - vRef) - coastDecel(car, speed)) / pedalDecel;
    // How much of the tyre the corner is already using, 0..1.
    const lateralLoad = speed * speed * 2 * Math.sin(ang) / Ld /
      getLateralAcceleration(spec, speed, aLatMax);
    if (speed < target - 0.5) {
      // Use full power on exit; ease only as the requested lateral force
      // consumes the tyre budget, rather than penalising steering at any speed.
      ctrl.throttle = THREE.MathUtils.lerp(1, 0.82,
        THREE.MathUtils.clamp((lateralLoad - 0.6) / 0.4, 0, 1));
      ctrl.brake = 0;
    } else if (pedal > 0.02) {
      ctrl.throttle = 0;
      // Keep the pedal inside the friction circle: what the corner is taking
      // laterally is not available for braking, so the pedal tapers as the
      // lateral load comes on, the way a trail-braking foot does. Lateral
      // load from the pursuit path, or from the yaw the car already carries
      // if that is higher — a car rotating into a corner is loading its
      // tyres before the path asks it to.
      const turning = speed * Math.abs(car.body.angularVelocity.y) /
        getLateralAcceleration(spec, speed, aLatMax);
      const l = THREE.MathUtils.clamp(Math.max(lateralLoad, turning), 0, 1);
      // The circle is in tyre units; full pedal is the brake clamps' figure,
      // which on a light car with big brakes is well past what the tyres
      // hold at low speed.
      const tyreDecel = spec.mu.road * (9.82 +
        0.5 * spec.airDensity * spec.clA * speed * speed / spec.massKg);
      const room = Math.sqrt(Math.max(0.06, 1 - l * l)) * tyreDecel / pedalDecel;
      ctrl.brake = Math.min(pedal, room, 1);
    } else if (speed > vRef + 0.5 || aPlan > 0.1) {
      // Drag alone is shedding what the plan asks: coast.
      ctrl.throttle = 0;
      ctrl.brake = 0;
    } else {
      ctrl.throttle = 0.35;
      ctrl.brake = 0;
    }

    // Outside a recovery this driver never means to go backwards, and in
    // reverse the brake pedal is the throttle: a car still rolling back when
    // a recovery ends is stopped with the pedal that brakes in reverse.
    const forwardSpeed = car.body.velocity.x * tmpFwd.x + car.body.velocity.z * tmpFwd.z;
    if (recovery.reverseT <= 0 && backOut.metres <= 0 && forwardSpeed < -0.3) {
      ctrl.throttle = 1;
      ctrl.brake = 0;
    }

    // Brake is also the automatic gearbox's reverse pedal. Hold a stopped
    // queue with the handbrake; only the recovery state may request reverse.
    if (target < 0.5 && speed < 1.2) {
      ctrl.throttle = 0;
      ctrl.brake = 0;
      ctrl.handbrake = true;
    }

    // --- Stuck recovery (see the constants above for the reasoning) ---
    // Evidence that there is something to be stuck on, sampled every frame so
    // the recovery can also be cut short the moment it stops being true.
    const nf = frames[nearest];
    const lat = (pos.x - nf.pos.x) * nf.left.x + (pos.z - nf.pos.z) * nf.left.z;
    const nearWall = wallOffset - Math.abs(lat) < WALL_REACH_M;
    const misaligned = tmpFwd.x * nf.tan.x + tmpFwd.z * nf.tan.z < MISALIGN_DOT;
    recovery.nearWall = nearWall;
    recovery.misaligned = misaligned;
    recovery.carBehind = carBehind;
    if (!recovery.anchored) {
      recovery.anchorX = pos.x;
      recovery.anchorZ = pos.z;
      recovery.anchored = true;
    }

    // Held behind a stopped car with the lane chosen but no room left to
    // swerve round it: back out straight, wheel centred so the car keeps the
    // sideways offset it has already made, by just the room the swerve
    // needs, and never with a car close behind. (Reversing with the steering
    // inverted, as the wall recovery does, swung the car back onto the
    // stopped car's line and round again, indefinitely.)
    if (backOut.metres > 0) {
      backOut.t -= dt;
      if (backOut.t <= 0 || carBehind
        || Math.hypot(pos.x - backOut.x, pos.z - backOut.z) >= backOut.metres) {
        backOut.metres = 0;
      } else {
        ctrl.throttle = 0;
        ctrl.brake = 0.6;             // reverse (automatic box: brake at standstill)
        ctrl.handbrake = false;
        ctrl.steer = 0;
        return ctrl;
      }
    }
    backOut.heldT = shortBy > 0 && speed < 0.5 ? backOut.heldT + dt : 0;
    if (backOut.heldT > 1 && !carBehind && recovery.reverseT <= 0) {
      Object.assign(backOut, { metres: Math.min(4, shortBy + 1), t: 3, x: pos.x, z: pos.z, heldT: 0 });
    }

    if (recovery.reverseT > 0) {
      recovery.reverseT -= dt;
      const backed = Math.hypot(pos.x - recovery.stuckX, pos.z - recovery.stuckZ);
      // A driver who has backed out of trouble goes forward again — they don't
      // sit out a fixed 1.5 s of reverse with the road in front of them clear.
      // Abort outright if someone has arrived in the space behind.
      if ((backed > FREE_BACK_M && !nearWall) || carBehind) {
        recovery.reverseT = 0;
        recovery.stuckT = 0;
        recovery.anchorX = pos.x;
        recovery.anchorZ = pos.z;
      } else {
        ctrl.throttle = 0;
        ctrl.brake = 1;               // reverse (automatic box: brake at standstill)
        ctrl.handbrake = false;
        ctrl.steer = -ctrl.steer;     // rear-steer geometry points the nose back
      }
    } else {
      const pinned = speed < STUCK_SPEED && ctrl.throttle > 0.5;
      const progress = Math.hypot(
        pos.x - recovery.anchorX, pos.z - recovery.anchorZ);
      if (pinned && progress < STUCK_PROGRESS_M) {
        recovery.stuckT += dt;
      } else {
        recovery.stuckT = Math.max(0, recovery.stuckT - dt * 2);
        recovery.anchorX = pos.x;
        recovery.anchorZ = pos.z;
      }
      const limit = (nearWall || misaligned) ? STUCK_EVIDENT_S : STUCK_BLIND_S;
      if (recovery.stuckT > limit && !carBehind) {
        recovery.stuckT = 0;
        recovery.reverseT = REVERSE_S;
        recovery.stuckX = pos.x;
        recovery.stuckZ = pos.z;
      }
    }

    return ctrl;
  }

  return { update, recovery };
}

function nearestFrameIndex(frames, pos) {
  let best = 0;
  let bestD = Infinity;
  for (let i = 0; i < frames.length; i++) {
    const dx = frames[i].pos.x - pos.x;
    const dz = frames[i].pos.z - pos.z;
    const d = dx * dx + dz * dz;
    if (d < bestD) { bestD = d; best = i; }
  }
  return best;
}
