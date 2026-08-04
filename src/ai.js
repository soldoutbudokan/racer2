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
  const skill = options.skill ?? 0.85;                  // 0..1
  const aLatMax = 9.82 * 1.45 * (0.62 + 0.3 * skill);   // usable lateral g
  const aBrake = 8.5;                                   // planning decel m/s²
  const vMax = (46 + 14 * skill);                       // m/s straight-line cap

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
  for (let i = 0; i < n; i++) {
    ds[i] = frames[i].pos.distanceTo(frames[(i + 1) % n].pos);
  }
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

    // Target speed: look slightly ahead in the profile so we brake in time
    // even between samples, and anticipate by current speed.
    const aheadFrames = 2 + Math.floor(speed / 18);
    let target = Infinity;
    for (let k = 0; k <= aheadFrames; k++) {
      target = Math.min(target, profile[(nearest + k) % n]);
    }

    // --- Pure-pursuit steering ---
    const lookM = Math.max(7, speed * 0.55);
    let lookI = nearest;
    let acc = 0;
    while (acc < lookM) {
      acc += ds[lookI % n];
      lookI++;
    }
    const tgt = frames[lookI % n].pos;

    const q = car.body.quaternion;
    const fx = 2 * (q.x * q.z + q.w * q.y);
    const fz = 1 - 2 * (q.x * q.x + q.y * q.y);
    tmpFwd.set(fx, 0, fz).normalize();
    tmpV.set(tgt.x - pos.x, 0, tgt.z - pos.z);
    const Ld = Math.max(2, tmpV.length());
    tmpV.normalize();

    const dot = THREE.MathUtils.clamp(tmpFwd.dot(tmpV), -1, 1);
    const ang = Math.acos(dot);
    // Sign chosen so the resulting ctrl.steer converges on the target through
    // applyControls' steering convention (verified empirically — the previous
    // AI had this inverted and steered away from its pursuit point).
    const cross = tmpFwd.x * tmpV.z - tmpFwd.z * tmpV.x;
    const signed = cross < 0 ? -ang : ang;

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
      const needK = 2 * Math.sin(signed) / Ld;
      ctrl.steer = THREE.MathUtils.clamp(needK * 2.9 / cap, -1, 1);
    }

    // --- Longitudinal ---
    if (speed < target - 0.5) {
      // ease the throttle while still turning hard
      const steerLoad = Math.min(1, Math.abs(ctrl.steer));
      ctrl.throttle = THREE.MathUtils.lerp(1.0, 0.55, steerLoad * 0.7);
      ctrl.brake = 0;
    } else if (speed > target + 1.0) {
      ctrl.throttle = 0;
      ctrl.brake = THREE.MathUtils.clamp((speed - target) / 6, 0.2, 1);
    } else {
      ctrl.throttle = 0.35;
      ctrl.brake = 0;
    }

    // --- Traffic awareness: don't pile into the car ahead ---
    let carBehind = false;
    if (others) {
      for (const other of others) {
        if (!other || other === car) continue;
        const dx = other.body.position.x - pos.x;
        const dz = other.body.position.z - pos.z;
        const ahead = dx * tmpFwd.x + dz * tmpFwd.z;          // along our heading
        const lateral = -dx * tmpFwd.z + dz * tmpFwd.x;       // signed side offset
        // Anyone sitting in the space this car would back into. Checked before
        // the forward filter below, which discards everything behind us.
        if (ahead < 0 && ahead > -BEHIND_M && Math.abs(lateral) < 3.0) {
          carBehind = true;
        }
        // look roughly one second up the road
        const range = Math.max(12, speed * 0.95);
        if (ahead < 1 || ahead > range || Math.abs(lateral) > 2.4) continue;
        const ov = other.body.velocity;
        const closing = speed - Math.hypot(ov.x, ov.z);
        if (ahead < 6.5) {
          ctrl.throttle = 0;
          ctrl.brake = Math.max(ctrl.brake, closing > 1 ? 1 : 0.5);
        } else if (closing > 0) {
          // brake proportionally to the decel needed to not hit them
          const needed = (closing * closing) / (2 * Math.max(1, ahead - 6));
          ctrl.brake = Math.max(ctrl.brake, THREE.MathUtils.clamp(needed / 6, 0, 1));
          if (ctrl.brake > 0.1 || ahead < speed * 0.45) {
            ctrl.throttle = Math.min(ctrl.throttle, 0.35);
          }
        }
        // Ease around the car ahead — but never while already cornering near
        // the limit, where any extra steering means running wide.
        if (Math.abs(ctrl.steer) < 0.5) {
          ctrl.steer = THREE.MathUtils.clamp(
            ctrl.steer + (lateral >= 0 ? -0.15 : 0.15), -1, 1);
        }
      }
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
