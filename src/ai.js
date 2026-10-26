import * as THREE from 'three';
import { getCarSpec, getSteerCap, getDrivingLimits, planSpeedProfile } from './carSpecs.js';
import { idealLineFor } from './idealLine.js';

/**
 * Racing-line AI built for the realistic driving model.
 *
 * Each driver plans on their own car's ideal line (idealLine.js: the lap-time
 * optimum for that car's grip, wing, brakes and gearing, using the whole
 * road) with a speed profile over it from the car's own limits scaled by the
 * driver's skill:
 *   1. corner-limited speed from the line's curvature, aero load included,
 *   2. a backward pass that caps each frame by what the brakes can shed
 *      before the next slow corner (anticipatory braking), inside the
 *      friction circle,
 *   3. a forward pass for what the engine can build out of each corner.
 * At runtime it steers with the line's own curvature as feed-forward and a
 * pure-pursuit term for the error only, and converts the needed path
 * curvature into a steering command through the same traction-limited
 * steering map the player has. Traffic is handled as a deviation from the
 * line: a passing lane is held beside the slower car until it is clear.
 */
export function createAIDriver(track, options = {}) {
  const skill = THREE.MathUtils.clamp(options.skill ?? 0.85, 0, 1);
  let spec = options.spec ?? getCarSpec();
  let limits, line, pedalDecel, swerveR, roadLimit, laneLimit, previewS;

  const ctrl = {
    throttle: 0,
    brake: 0,
    steer: 0,
    handbrake: false,
  };

  const frames = track.frames;
  const n = frames.length;

  // --- centreline arc length: the track coordinate traffic is measured in ---
  const arc = new Float64Array(n + 1);
  for (let i = 0; i < n; i++) {
    arc[i + 1] = arc[i] + frames[i].pos.distanceTo(frames[(i + 1) % n].pos);
  }
  const lapLength = arc[n];

  // --- the plan: this car's line and the speed over it ---
  let lineLat, kLine, kAbs, dsLine;
  const profile = new Float32Array(n);
  const planDecel = new Float32Array(n);   // deceleration the plan asks for at each frame
  function planFor(nextSpec) {
    spec = nextSpec;
    limits = getDrivingLimits(spec, skill);
    line = idealLineFor(track, spec);
    ({ offset: lineLat, kappa: kLine, ds: dsLine } = line);
    kAbs = new Float32Array(n);
    for (let i = 0; i < n; i++) kAbs[i] = Math.abs(kLine[i]);
    planSpeedProfile(limits, kAbs, dsLine, profile, 2);
    for (let i = 0; i < n; i++) {
      const next = profile[(i + 1) % n];
      planDecel[i] = Math.max(0, (profile[i] * profile[i] - next * next) / (2 * Math.max(0.1, dsLine[i])));
    }
    // Deceleration at full pedal from the car's own brake clamps (impulse
    // per 1/120 s step and wheel → force at the road), so the pedal can be
    // set to the deceleration the plan asks for.
    pedalDecel = limits.pedalDecel;
    // Full-lock turning radius of the body origin, 30 % over the geometric
    // figure: the tyres' slip at walking pace puts the measured circles
    // 8-24 % wider (formula car 6.2 m, V8 5.7, hypercar 5.4, GT3 5.0,
    // hatch 3.9, speedster 3.6).
    swerveR = 1.3 * Math.hypot(spec.wheelbase / Math.tan(spec.maxSteer), spec.wheelbase / 2);
    // A passing lane stays two and a half metres inside the road edge (a
    // car braking hard for traffic at the edge of a bend ran 1.3 m wide of
    // its lane); the car's own line may reach further, to its edge margin.
    laneLimit = Math.max(0, (track.width ?? 14) / 2 - 2.5);
    roadLimit = Math.max(laneLimit, line.bound);
    // The wheel is read this far ahead along the path, in seconds of travel:
    // the time this column takes to move a typical correction (the V8's
    // turns at 2.6 rad/s per radian of cap, the speedster's at 7). Any more
    // and a quick car turns in before its line does and overshoots it on a
    // fast change of direction.
    previewS = 0.25 / spec.steerRate;
  }
  planFor(spec);

  const tmpV = new THREE.Vector3();
  const tmpFwd = new THREE.Vector3();
  const PASS_CLEARANCE = 3.3;  // car width plus space between the mirrors
  const CREEP = 3;             // m/s past a stopped car, once the swerve fits
  // Forward room a swerve of `d` metres sideways needs on full lock, for a
  // car already heading out at sin θ toward its lane: along an arc,
  // d = x·sin θ + x²/2R. R is the car's own turning circle at walking pace
  // (planFor): from 3.8 m on the speedster to 7.5 m on the formula car,
  // which a fixed 5.1 m had called a swerve it could not make.
  const swerveRoom = (d, sinOut = 0) => {
    const s = THREE.MathUtils.clamp(sinOut, -1, 1);
    return swerveR * (Math.sqrt(s * s + 2 * Math.max(0, d) / swerveR) - s);
  };
  // `dev` is where the car means to run relative to its line, metres toward
  // `left`: zero on a clear track, a passing lane beside a slower car in
  // traffic, eased at lane-change pace. `laneOffset` is that lane as an
  // absolute offset from the centreline where the car is, which is what the
  // traffic checks compare with the other cars.
  let passCar = null, passOffset = 0, dev = null, laneOffset = 0;
  // Traction control: the throttle the driven wheels' slip allows, 0.3..1.
  let tcCap = 1;
  // Last update's direction of travel, for the rate the path is turning,
  // and that rate's lateral load filtered over a tenth of a second: read
  // raw, the body's jitter between updates at 170 km/h looked like a 0.36
  // rad/s turn and took the pedal away on a near-straight.
  let prevVx = 0, prevVz = 0, prevValid = false, turnLoad = 0;
  // The steering terms of the last update, for probes and tests.
  const debug = {};
  // The planned path at frame i: the line, moved over by the traffic
  // deviation and kept on the road.
  const pathLat = (i) => THREE.MathUtils.clamp(lineLat[i] + dev, -roadLimit, roadLimit);
  const pathX = (i) => frames[i].pos.x + frames[i].left.x * pathLat(i);
  const pathZ = (i) => frames[i].pos.z + frames[i].left.z * pathLat(i);
  // Signed curvature of the planned path at frame i (the circle through the
  // path two frames either side), in the pursuit's sign.
  function pathCurvature(i) {
    const a = (i + n - 2) % n, c = (i + 2) % n;
    const ax = pathX(a), az = pathZ(a), bx = pathX(i), bz = pathZ(i), cx = pathX(c), cz = pathZ(c);
    const ux = bx - ax, uz = bz - az, vx = cx - bx, vz = cz - bz, wx = cx - ax, wz = cz - az;
    const denom = Math.hypot(ux, uz) * Math.hypot(vx, vz) * Math.hypot(wx, wz);
    return denom > 1e-9 ? 2 * (ux * vz - uz * vx) / denom : 0;
  }
  // Backing straight out from behind a stopped car the swerve no longer
  // fits behind: metres still to go, seconds left, and where it started.
  const backOut = { metres: 0, t: 0, x: 0, z: 0, heldT: 0 };

  // Deceleration the car gets with no pedal at all: drag, rolling resistance,
  // the body's damping and engine braking in the gear it is in. The brake
  // feed-forward asks only for what is left of the plan's deceleration, or
  // the pedal out-brakes the plan (the formula car by 70 % at 55 m/s), falls
  // under it, throttles back up and pumps.
  function coastDecel(car, v) {
    let f = limits.dragDecel(v) * spec.massKg;
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
    const lineHere = lineLat[nearest];
    if (dev === null) dev = THREE.MathUtils.clamp(here.lat, -roadLimit, roadLimit) - lineHere;
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
        bend = Math.max(bend, kAbs[i]);
        distance += dsLine[i];
      }
      if (leader && speed * speed * bend < limits.lateralAt(speed) * 0.7) {
        const side = clear(leader, 1.45, PASS_CLEARANCE);
        const lanes = [leader.lat + side, leader.lat - side]
          .filter((offset) => Math.abs(offset) <= laneLimit && laneClear(offset, leader.car))
          .sort((a, b) => Math.abs(a - here.lat) - Math.abs(b - here.lat));
        if (lanes.length) { passCar = leader.car; passOffset = lanes[0]; }
      }
    }
    // Keep a lane beside another car instead of cutting back across its nose.
    // The line itself is followed without delay; only the deviation from it
    // eases at lane-change pace, so a car rejoining its line after a pass
    // drifts back rather than darting.
    // With the wanted lane blocked, hold where the car is across the road
    // rather than its offset from the line: the line sweeps across the road
    // through the corners, and a path that swept with it carried the car
    // into the one beside it.
    let desiredDev = passCar ? passOffset - lineHere : 0;
    if (!laneClear(lineHere + desiredDev, passCar)) desiredDev = laneOffset - lineHere;
    // A lane change asks the tyres for curvature on top of the bend they are
    // in, so it slows as the bend takes the grip and stops once the bend has
    // most of it: a car at its limit mid-corner eased back toward its line
    // at 2.5 m/s and ran wide instead, and one moved over for a pass at an
    // apex while braking for the car ahead went straight on.
    const bendLoad = speed * speed * Math.abs(pathCurvature(nearest)) / limits.gripAt(speed);
    const laneRate = 2.5 * THREE.MathUtils.clamp((1 - bendLoad) / 0.4, 0, 1);
    dev += THREE.MathUtils.clamp(desiredDev - dev, -laneRate * dt, laneRate * dt);
    laneOffset = THREE.MathUtils.clamp(lineHere + dev, -roadLimit, roadLimit);
    dev = laneOffset - lineHere;
    // Off the line, the lane bends differently from it (a lane at the outer
    // edge through a corner the line straightens is a tighter arc), so look
    // along the path itself with this car's brakes rather than trust the
    // line's profile there.
    if (Math.abs(dev) > 0.3) {
      let d = 0;
      for (let k = 0; k < n && d < Math.max(25, speed * 1.5); k++) {
        const i = (nearest + k) % n;
        const vk = limits.cornerSpeed(Math.abs(pathCurvature(i)));
        const allowed = Math.sqrt(vk * vk + 2 * 0.8 * limits.brakeAt(vk) * d);
        if (allowed < target) target = allowed;
        d += dsLine[i];
      }
    }

    let closePass = false, shortBy = 0, swerveK = 0, swerveSide = 0, trafficBound = false;
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
      let limit = Math.sqrt(leaderSpeed * leaderSpeed + 2 * limits.brakeAt(speed) * room);
      if (t.gap < standOff) limit = Math.min(limit, Math.max(0, leaderSpeed - 2));
      // With the lane chosen, roll on at a walking pace once the bodies
      // clear sideways, or while the room left still covers most of the
      // swerve. Otherwise back out by what the swerve lacks. The two tests
      // are exact complements on the same heading: with a gap between them
      // (the back-out judged the swerve as if the car pointed straight down
      // the road) a car whose nose had swung away from its lane could
      // neither creep nor back out, and sat on its handbrake for good.
      const ahead = t.gap - lengths - 0.64;
      const fits = deficit === 0 || ahead >= 0.9 * swerve;
      if (stoppedPass && lanes && fits) {
        limit = Math.max(limit, CREEP);
        // The curvature that swerve needs from here (d = x·sin θ + κx²/2),
        // for the steering below to hold the car to at least.
        if (deficit > 0) {
          const x = Math.max(0.3, ahead);
          const k = THREE.MathUtils.clamp(2 * (deficit - x * sinOut) / (x * x), 0, 1 / swerveR);
          if (k > swerveK) {
            swerveK = k;
            const toward = Math.sign(laneOffset - t.lat);
            swerveSide = Math.sign(tmpFwd.x * here.frame.left.z - tmpFwd.z * here.frame.left.x) * toward;
          }
        }
      }
      if (stoppedPass && ahead < 12) closePass = true;
      if (stoppedPass && lanes && !fits) shortBy = Math.max(shortBy, swerve + 0.6 - ahead);
      // A car alongside is not braked for at the traffic floor: it is not
      // rear-ended by speed, and the pedal at that floor took the wheel off a
      // car on the kerb trying to steer clear of the one beside it.
      if (limit < target) { target = limit; if (t.gap > lengths) trafficBound = true; }
    }

    // A spin or an excursion needs a controlled rejoin, not straight-line pace.
    if (tmpFwd.dot(here.frame.tan) < 0.7) target = Math.min(target, 8);
    if (Math.abs(here.lat) > roadLimit + 0.5) target = Math.min(target, 12);

    // --- Steering: the path's curvature, plus pure pursuit for the error ---
    // Round a stopped car close ahead, look nearer so the swerve uses the
    // lock it has instead of a lazy 7 m arc.
    // 0.45 s of travel: the error correction's stiffness goes as the inverse
    // square of this. At 0.55 s a V8 that had turned in with its heavy nose
    // still rotating ran a metre and a half inside its line at the apex
    // before the correction caught it.
    const lookM = Math.max(closePass ? 4 : 7, speed * 0.45);
    let lookI = nearest;
    let acc = 0;
    while (acc < lookM && lookI < nearest + n) {
      acc += dsLine[lookI % n];
      lookI++;
    }
    lookI %= n;
    const tx = pathX(lookI), tz = pathZ(lookI);
    tmpV.set(tx - pos.x, 0, tz - pos.z);
    const Ld = Math.max(2, tmpV.length());
    tmpV.normalize();

    const dot = THREE.MathUtils.clamp(tmpFwd.dot(tmpV), -1, 1);
    const ang = Math.acos(dot);
    // Sign chosen so the resulting ctrl.steer converges on the target through
    // applyControls' steering convention (verified empirically — the previous
    // AI had this inverted and steered away from its pursuit point).
    const cross = tmpFwd.x * tmpV.z - tmpFwd.z * tmpV.x;
    const signed = cross < 0 ? -ang : ang;
    // The pursuit chord is measured from the direction the car is travelling,
    // not the way its nose points: at the limit the nose sits a few degrees
    // inside the path (the rear tyres' slip angle), and measured from the
    // nose a car running a metre inside its line read as already pointing at
    // the target, so nothing pulled it back out. Below walking pace, or
    // rolling backwards out of a recovery, the velocity points nowhere the
    // wheel should follow and the nose is used.
    const travel = car.body.velocity.x * tmpFwd.x + car.body.velocity.z * tmpFwd.z;
    let needK;
    if (travel > 4) {
      const vx = car.body.velocity.x / speed, vz = car.body.velocity.z / speed;
      needK = 2 * (vx * tmpV.z - vz * tmpV.x) / Ld;
    } else {
      needK = 2 * Math.sin(signed) / Ld;
    }
    // Pure pursuit reads the path's curvature as an average over the whole
    // chord to its target, so it turns in before the corner and runs inside
    // the line through the apex — on a line that already uses the width of
    // the road, that is the kerb. It is kept for the error only: the
    // curvature it would ask of a car sitting on the path here and pointing
    // along it is taken out, and the path's own curvature the column's lag
    // ahead is put in. The path is the line moved over by any traffic
    // deviation, so a car holding a lane through an S gets the lane's bends,
    // not the line's (which may run straight across the road there).
    const p0x = pathX(nearest), p0z = pathZ(nearest);
    const ia = (nearest + n - 1) % n, ic = (nearest + 1) % n;
    let tX = pathX(ic) - pathX(ia), tZ = pathZ(ic) - pathZ(ia);
    const tl = Math.hypot(tX, tZ) || 1;
    tX /= tl; tZ /= tl;
    const cx = tx - p0x, cz = tz - p0z;
    const L0 = Math.max(2, Math.hypot(cx, cz));
    const kIdeal = 2 * (tX * cz - tZ * cx) / (L0 * L0);
    const preview = (nearest + Math.round(speed * previewS / Math.max(0.5, dsLine[nearest]))) % n;
    const kFF = pathCurvature(preview);
    const kCorr = needK - kIdeal;
    // Yaw damping: the body's own rotation read as a curvature (about +y a
    // positive rate turns the nose toward −left, so the sign flips), less
    // the path's. A body rotating faster than its path bends is over-
    // rotating (the V8's inertia carries its nose on after the wheel is
    // straightened) and is given a little less lock.
    const kBody = -car.body.angularVelocity.y / Math.max(4, speed);
    const kCmd = kFF + kCorr - 0.5 * (kBody - kFF);
    debug.needK = needK; debug.kIdeal = kIdeal; debug.kFF = kFF; debug.kCmd = kCmd;
    debug.err = here.lat - lineHere; debug.Ld = Ld; debug.dev = dev;
    debug.target = target; debug.planAhead = planAhead; debug.passCar = passCar;

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
      ctrl.steer = THREE.MathUtils.clamp(kCmd * spec.wheelbase / cap, -1, 1);
    }
    // Creeping round a stopped car, steer at least as hard as the swerve the
    // creep was allowed on. Pure pursuit straightens the wheel as soon as the
    // nose points at its lookahead point, and the car then ran straight into
    // the other car's corner, stopped, backed out and did it again.
    if (swerveK > 0 && ctrl.steer * swerveSide < swerveK * swerveR) {
      ctrl.steer = swerveSide * Math.min(1, swerveK * swerveR);
    }

    // A passing lane can bend more sharply than the line's profile, and a
    // correction after contact more sharply still. Respect the grip the
    // path needs, and half of the correction's: all of it braked a car 30
    // km/h under its plan to close a metre of error that was gone before
    // the speed came back.
    const pathK = Math.abs(kCmd);
    target = Math.min(target, limits.cornerSpeed(Math.abs(kFF) + 0.5 * Math.abs(kCorr)));

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
    // Inside a braking zone it aims 2.5 % under the plan instead: the plan
    // trail-brakes at the edge of the friction circle, where any excess
    // speed costs braking room (the lateral demand grows with v²) and the
    // excess then grows, so the car has to arrive with a little in hand.
    const planBound = target >= planAhead - 1e-6;
    const aPlan = planBound ? planDecel[nearest] : 0;
    const vRef = !planBound ? target
      : aPlan > 0.1 ? Math.max(target, profile[nearest]) * 0.975
        : Math.max(target, profile[nearest]) + 0.3;
    const pedal = (aPlan + 3 * (speed - vRef) - coastDecel(car, speed)) / pedalDecel;
    // How much of the tyre the corner is using here, 0..1: the line's
    // curvature at this frame (the preview is for the wheel), with the
    // pursuit's correction, against the grip the tyres actually have rather
    // than the share the plan allows itself, so the pedal keeps authority
    // over a car running a little over its plan.
    const loadK = Math.abs(pathCurvature(nearest) + kCorr);
    const lateralLoad = speed * speed * loadK / limits.gripAt(speed);
    // Traction control: the driven wheels' slip (tread over road speed, from
    // the car's own telemetry) eases the throttle from 6 % slip and takes
    // most of it by 20 %, where the tyres' grip falls toward its kinetic
    // floor; it comes back at half a pedal a second. Without it the V8 lit
    // its rears at full throttle out of every bend and swung round into the
    // inside kerb.
    if (travel > 4) {
      const vx = car.body.velocity.x / speed, vz = car.body.velocity.z / speed;
      const raw = prevValid ? speed * Math.abs(vx * prevVz - vz * prevVx) / dt / limits.gripAt(speed) : 0;
      turnLoad += (raw - turnLoad) * Math.min(1, dt / 0.1);
      prevVx = vx; prevVz = vz; prevValid = true;
    } else {
      prevValid = false;
      turnLoad = 0;
    }
    const turning = turnLoad;
    const slip = car.telemetry?.slip ?? 0;
    const tcWant = THREE.MathUtils.clamp(1 - 4 * (slip - 0.06), 0.3, 1);
    tcCap = tcWant < tcCap ? tcWant : Math.min(1, tcCap + 0.5 * dt);
    let throttleIntent = 0;
    if (speed < target - 0.5) {
      // Use full power on exit; ease as the requested lateral force consumes
      // the tyre budget (the combined-grip share the plan uses, smaller on a
      // load-sensitive tyre) rather than penalising steering at any speed.
      throttleIntent = THREE.MathUtils.lerp(1, 0.82,
        THREE.MathUtils.clamp((lateralLoad / limits.combined - 0.6) / 0.4, 0, 1));
      ctrl.throttle = Math.min(tcCap, throttleIntent);
      ctrl.brake = 0;
    } else if (pedal > 0.02) {
      ctrl.throttle = 0;
      // Keep the pedal inside the friction circle: what the corner is taking
      // laterally is not available for braking, so the pedal tapers as the
      // lateral load comes on, the way a trail-braking foot does. Lateral
      // load from the path, or from the turn the car's travel already
      // carries if that is higher — a car rotating into a corner is loading
      // its tyres before the path asks it to. The turn is read from the
      // direction of travel, not the body's yaw: a V8 sliding through a fast
      // bend yaws faster than it turns, and read from its yaw it looked
      // saturated at 85 % of its grip, lost its pedal and ran wide.
      const l = THREE.MathUtils.clamp(Math.max(lateralLoad, turning), 0, 1);
      // The circle is in tyre units; full pedal is the brake clamps' figure,
      // which on a light car with big brakes is well past what the tyres
      // hold at low speed.
      // A quarter of the tyre is always left to the pedal; when a car ahead
      // sets the speed, 45 %: a car closing on another while a metre off its
      // line asked for more lock than it had, read its tyres as all spent,
      // kept a quarter pedal and pushed the car ahead off the road. Slowing
      // is what gives the wheel back. (A floor of 55 % took the wheel away
      // from a car braking for traffic at an apex, and it ploughed off; the
      // 45 % applied to a car slowed by its own correction kept it braking
      // at full lock on the kerb it was trying to leave.)
      const tyreDecel = spec.mu.road * (9.82 +
        0.5 * spec.airDensity * spec.clA * speed * speed / spec.massKg);
      const floor = trafficBound ? 0.2 : 0.06;
      const room = Math.sqrt(Math.max(floor, 1 - l * l)) * tyreDecel / pedalDecel;
      ctrl.brake = Math.min(pedal, room, 1);
    } else if (speed > vRef + 0.5 || aPlan > 0.1) {
      // Drag alone is shedding what the plan asks: coast.
      ctrl.throttle = 0;
      ctrl.brake = 0;
    } else {
      ctrl.throttle = Math.min(0.35, tcCap);
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
    // Walking pace only: at full reverse throttle the car reached 6-7 m/s
    // and rolled on to twice the distance asked for.
    const forwardSpeed = car.body.velocity.x * tmpFwd.x + car.body.velocity.z * tmpFwd.z;
    if (backOut.metres > 0) {
      backOut.t -= dt;
      if (backOut.t <= 0 || carBehind
        || Math.hypot(pos.x - backOut.x, pos.z - backOut.z) >= backOut.metres) {
        backOut.metres = 0;
      } else {
        ctrl.throttle = 0;
        ctrl.brake = -forwardSpeed < 2 ? 0.6 : 0;   // reverse (automatic box: brake at standstill)
        ctrl.handbrake = false;
        ctrl.steer = 0;
        return ctrl;
      }
    }
    // Outside a recovery or a back-out this driver never means to go
    // backwards. In reverse gear the throttle is the brake, so a car still
    // rolling back when one ends is stopped with it, wheel centred: left on
    // the pursuit lock it swung its nose away from its lane. In a forward
    // gear the throttle is power, and a car sliding backwards after a spin
    // is left to coast round; full throttle there spun its tyres and put it
    // in the barrier.
    if (recovery.reverseT <= 0 && backOut.metres <= 0
      && car.telemetry?.gear === 0 && forwardSpeed < -0.3) {
      ctrl.throttle = 1;
      ctrl.brake = 0;
      ctrl.steer = 0;
      ctrl.handbrake = false;
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
      // Pinned is judged on the throttle the driver wants, before traction
      // control: a car against the armco spins its wheels, the control
      // flickers the pedal about the threshold, and the timer never fills.
      const pinned = speed < STUCK_SPEED && throttleIntent > 0.5;
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

  return { update, recovery, debug, get profile() { return profile; }, get line() { return line; } };
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
