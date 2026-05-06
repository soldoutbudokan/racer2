import * as THREE from 'three';

/**
 * Simple racing-line AI: picks a target point a bit ahead on the centreline,
 * steers toward it, and modulates throttle/brake based on upcoming curvature.
 *
 * This is intentionally very forgiving and not optimal — the goal is to give
 * the player something to race against, not a Vergne-on-pole hot lap.
 */
export function createAIDriver(track, options = {}) {
  const targetSpeed = options.targetSpeed ?? 38;       // m/s on straights (~137 km/h)
  const minSpeed = options.minSpeed ?? 14;             // m/s through tightest corners
  const lookAheadStraight = options.lookAheadStraight ?? 28;
  const lookAheadCorner = options.lookAheadCorner ?? 14;
  const skill = options.skill ?? 0.85;                 // 0..1 — affects target speed

  const ctrl = {
    throttle: 0,
    brake: 0,
    steer: 0,
    handbrake: false,
  };

  // Pre-compute curvature lookahead per centreline frame so steering feedback
  // can soften throttle through bends without a per-frame curve query.
  const frames = track.frames;
  const upcomingCurvature = new Float32Array(frames.length);
  for (let i = 0; i < frames.length; i++) {
    let max = 0;
    for (let k = 0; k < 18; k++) {
      const j = (i + k) % frames.length;
      const t1 = frames[j].tan;
      const t2 = frames[(j + 1) % frames.length].tan;
      const c = 1.0 - t1.dot(t2);
      if (c > max) max = c;
    }
    upcomingCurvature[i] = max;
  }

  const tmpV = new THREE.Vector3();
  const tmpFwd = new THREE.Vector3();

  function update(car) {
    const pos = car.body.position;
    const nearest = nearestFrameIndex(frames, pos);
    const corner = upcomingCurvature[nearest];
    // Sharper upcoming curvature → less throttle, earlier braking.
    const cornerNorm = Math.min(1, corner / 0.04);
    const desired = THREE.MathUtils.lerp(targetSpeed, minSpeed, cornerNorm) * skill;

    // Choose a lookahead frame proportional to current speed and corner severity.
    const speed = Math.hypot(car.body.velocity.x, car.body.velocity.z);
    const lookAheadM = THREE.MathUtils.lerp(lookAheadCorner, lookAheadStraight, 1 - cornerNorm);
    const stepEstimate = lookAheadM / 2.5; // ~2.5 m per frame for a 1.5 km / 600-frame track
    const lookI = (nearest + Math.max(2, Math.floor(stepEstimate))) % frames.length;
    const target = frames[lookI].pos;

    // Forward vector from chassis quaternion (local +Z).
    const q = car.body.quaternion;
    const fx = 2 * (q.x * q.z + q.w * q.y);
    const fz = 1 - 2 * (q.x * q.x + q.y * q.y);
    tmpFwd.set(fx, 0, fz).normalize();

    tmpV.set(target.x - pos.x, 0, target.z - pos.z).normalize();

    // Signed angle from forward to target (in horizontal plane). Cross-Y > 0
    // means the target is to the left of the chassis.
    const dot = THREE.MathUtils.clamp(tmpFwd.dot(tmpV), -1, 1);
    const ang = Math.acos(dot);
    const cross = tmpFwd.x * tmpV.z - tmpFwd.z * tmpV.x;
    const signed = cross < 0 ? ang : -ang;

    // Steering — proportional with mild gain so it doesn't oscillate.
    const steerCmd = THREE.MathUtils.clamp(signed * 1.6, -1, 1);
    ctrl.steer = steerCmd;

    // Throttle / brake based on speed delta to desired.
    if (speed < desired - 1) {
      ctrl.throttle = 1.0;
      ctrl.brake = 0;
    } else if (speed > desired + 3) {
      ctrl.throttle = 0;
      ctrl.brake = Math.min(1, (speed - desired) / 8);
    } else {
      ctrl.throttle = 0.5;
      ctrl.brake = 0;
    }

    return ctrl;
  }

  function spawnFor(track, gridIndex) {
    // Place AI cars one behind the next, alternating sides of the centreline.
    const back = -8 - gridIndex * 7;
    const lat = (gridIndex % 2 === 0 ? 1 : -1) * 2.5;
    const f0 = track.frames[0];
    const pos = new THREE.Vector3()
      .copy(f0.pos)
      .add(f0.tan.clone().multiplyScalar(back))
      .add(f0.left.clone().multiplyScalar(lat))
      .add(new THREE.Vector3(0, 1, 0));
    return { position: pos, yaw: Math.atan2(f0.tan.x, f0.tan.z) };
  }

  return { update, spawnFor };
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
