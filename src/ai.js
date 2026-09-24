import * as THREE from 'three';

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
  const aLatMax = 9.82 * 1.45 * (0.65 + 0.3 * skill);   // usable lateral g
  const aBrake = 8.5;                                   // planning decel m/s²
  const vMax = 52 + 18 * skill;                         // m/s straight-line cap

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
  for (let i = 0; i < n; i++) {
    profile[i] = Math.min(vMax, Math.sqrt(aLatMax / Math.max(1e-4, kSmooth[i])));
  }
  // Backward passes: vᵢ ≤ √(vᵢ₊₁² + 2·a·ds). Two loops handle the wrap.
  for (let pass = 0; pass < 2; pass++) {
    for (let i = n - 1; i >= 0; i--) {
      const next = profile[(i + 1) % n];
      const cap = Math.sqrt(next * next + 2 * aBrake * ds[i]);
      if (profile[i] > cap) profile[i] = cap;
    }
  }

  const tmpV = new THREE.Vector3();
  const tmpFwd = new THREE.Vector3();
  const roadLimit = Math.max(0, (track.width ?? 14) / 2 - 2);
  const PASS_CLEARANCE = 3.3;  // car width plus space between the mirrors
  let passCar = null, passOffset = 0, laneOffset = null;

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
  const BEHIND_M = 6.0;          // never reverse into a car this close behind

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
      traffic.push({ car: other, gap, lat: location.lat,
        speed: v.x * location.frame.tan.x + v.z * location.frame.tan.z });
    }

    // Target speed: look slightly ahead in the profile so we brake in time
    // even between samples, and anticipate by current speed.
    const aheadFrames = 2 + Math.floor(speed / 18);
    let target = Infinity;
    for (let k = 0; k <= aheadFrames; k++) {
      target = Math.min(target, profile[(nearest + k) % n]);
    }

    // Commit to a clear passing lane until the entire car is ahead. Repeated
    // steering nudges used to oscillate behind a slower car, or aim at grass.
    const laneClear = (offset, ignore) => traffic.every((t) => {
      if (t.car === ignore) return true;
      const rearRoom = 9 + Math.max(0, t.speed - speed) * 1.2;
      const frontRoom = 10 + Math.max(0, speed - t.speed) * 1.2;
      const inSweep = t.lat > Math.min(here.lat, offset) - 2.7
        && t.lat < Math.max(here.lat, offset) + 2.7;
      return t.gap < -rearRoom || t.gap > frontRoom || !inSweep;
    });
    const passing = traffic.find((t) => t.car === passCar);
    if (!passing || passing.gap < -9 || !laneClear(passOffset, passCar)) passCar = null;
    if (!passCar) {
      const leader = traffic.filter((t) => t.gap > 0
        && t.gap < Math.max(25, speed * 1.6)
        && Math.abs(t.lat - here.lat) < 2.7
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
        const lanes = [leader.lat + PASS_CLEARANCE, leader.lat - PASS_CLEARANCE]
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
    target *= Math.sqrt(Math.max(0.65, 1 - Math.abs(laneOffset) * kSmooth[nearest]));

    for (const t of traffic) {
      if (t.gap <= 0 || t.gap > Math.max(30, speed * 2)) continue;
      // Until the actual car has moved clear, it still needs braking room.
      if (Math.abs(t.lat - here.lat) >= 2.4 && Math.abs(t.lat - laneOffset) >= 2.4) continue;
      const leaderSpeed = Math.max(0, t.speed);
      // While pulling around a stopped car, leave enough forward travel to
      // finish steering into the open lane. Five metres still clears both
      // 4.36 m chassis; the normal following gap remains more generous.
      const standOff = t.car === passCar && leaderSpeed < 3 ? 5 : 6.5;
      const room = Math.max(0, t.gap - standOff - speed * 0.2);
      target = Math.min(target, Math.sqrt(leaderSpeed * leaderSpeed + 2 * aBrake * room));
      if (t.gap < standOff) target = Math.min(target, Math.max(0, leaderSpeed - 2));
    }

    // A spin or an excursion needs a controlled rejoin, not straight-line pace.
    if (tmpFwd.dot(here.frame.tan) < 0.7) target = Math.min(target, 8);
    if (Math.abs(here.lat) > roadLimit + 0.5) target = Math.min(target, 12);

    // --- Pure-pursuit steering ---
    const lookM = Math.max(7, speed * 0.55);
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
    // to what the front axle can actually do. (Mirrors SPEC in car.js.)
    const vv = Math.max(1, speed * speed);
    const cap = Math.min(0.62, 1.45 * 9.82 * 2.0 * 2.9 / vv + 0.02);
    if (ang > Math.PI / 2) {
      // The target is behind the front axle. sin(α) folds back past 90°, so
      // plain pure pursuit asks for *less* lock the more wrong the car is
      // pointing — a car that has just backed out of the armco crossed up
      // gets two thirds of a turn and arcs straight back into the barrier.
      // A driver facing away from where they need to go uses all of it.
      ctrl.steer = signed < 0 ? -1 : 1;
    } else {
      ctrl.steer = THREE.MathUtils.clamp(needK * 2.9 / cap, -1, 1);
    }

    // A passing line or a correction after contact can turn more sharply
    // than the centreline profile. Respect the grip needed by that path too.
    target = Math.min(target, Math.sqrt(aLatMax / Math.max(1e-4, Math.abs(needK))));

    // --- Longitudinal ---
    if (speed < target - 0.5) {
      // Use full power on exit; ease only as the requested lateral force
      // consumes the tyre budget, rather than penalising steering at any speed.
      const lateralLoad = speed * speed * 2 * Math.sin(ang) / Ld / aLatMax;
      ctrl.throttle = THREE.MathUtils.lerp(1, 0.82,
        THREE.MathUtils.clamp((lateralLoad - 0.6) / 0.4, 0, 1));
      ctrl.brake = 0;
    } else if (speed > target + 1.0) {
      ctrl.throttle = 0;
      ctrl.brake = THREE.MathUtils.clamp((speed - target) / 4, 0.2, 1);
    } else {
      ctrl.throttle = 0.35;
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
