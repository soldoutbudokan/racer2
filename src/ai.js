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

  // Stuck-recovery state: racing incidents happen (walls, traffic); when the
  // car is throttle-pinned but not moving, back out and try again.
  let stuckT = 0;
  let reverseT = 0;

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
    const needK = 2 * Math.sin(signed) / Ld;
    const needSteer = needK * 2.9;
    // Same traction-limited cap the car itself applies, so |ctrl.steer| maps
    // to what the front axle can actually do. (Mirrors SPEC in car.js.)
    const vv = Math.max(1, speed * speed);
    const cap = Math.min(0.62, 1.45 * 9.82 * 2.0 * 2.9 / vv + 0.02);
    ctrl.steer = THREE.MathUtils.clamp(needSteer / cap, -1, 1);

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
    if (others) {
      for (const other of others) {
        if (!other || other === car) continue;
        const dx = other.body.position.x - pos.x;
        const dz = other.body.position.z - pos.z;
        const ahead = dx * tmpFwd.x + dz * tmpFwd.z;          // along our heading
        const lateral = -dx * tmpFwd.z + dz * tmpFwd.x;       // signed side offset
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

    // --- Stuck recovery: full throttle but parked → back out, nose toward
    // the racing line, then resume. ---
    if (reverseT > 0) {
      reverseT -= dt;
      ctrl.throttle = 0;
      ctrl.brake = 1;                 // reverse (automatic box: brake at standstill)
      ctrl.steer = -ctrl.steer;       // rear-steer geometry points the nose back
    } else {
      if (speed < 1.5 && ctrl.throttle > 0.5) stuckT += dt;
      else stuckT = Math.max(0, stuckT - dt * 2);
      if (stuckT > 1.2) {
        stuckT = 0;
        reverseT = 1.5;
      }
    }

    return ctrl;
  }

  return { update };
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
