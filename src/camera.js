import * as THREE from 'three';

/**
 * Cinematic chase camera with two modes:
 *   0 - chase (behind & above, lag for speed feel)
 *   1 - hood (close-to-bumper view)
 *   2 - cinematic (wider, slightly orbital)
 *
 * Smoothing uses critically-damped springs for both position and look-at.
 */
export function createChaseCamera(camera) {
  let mode = 0;
  const targetPos = new THREE.Vector3();
  const targetLook = new THREE.Vector3();
  const currentPos = new THREE.Vector3();
  const currentLook = new THREE.Vector3();
  let initialised = false;

  const tmpQ = new THREE.Quaternion();
  const tmpV = new THREE.Vector3();
  const fwd = new THREE.Vector3();
  const right = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);

  const presets = [
    { dist: 7.2,  height: 2.7, lookHeight: 1.0, fov: 62, lag: 0.18 },
    { dist: 0.0,  height: 1.05, lookHeight: 1.05, fov: 72, lag: 0.04, hood: true },
    { dist: 10.0, height: 4.0, lookHeight: 1.2, fov: 56, lag: 0.32 },
  ];

  function update(dt, body, speed) {
    const p = presets[mode];
    camera.fov += (p.fov - camera.fov) * Math.min(1, dt * 6);
    camera.updateProjectionMatrix();

    // Build a local frame from the chassis orientation
    tmpQ.set(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w);
    fwd.set(0, 0, 1).applyQuaternion(tmpQ).normalize();
    right.crossVectors(up, fwd).normalize();

    if (p.hood) {
      // Hood: sit on the chassis, look forward
      targetPos.set(body.position.x, body.position.y + p.height, body.position.z)
        .add(fwd.clone().multiplyScalar(0.25));
      targetLook.copy(targetPos).add(fwd.clone().multiplyScalar(8));
    } else {
      // Chase: distance grows slightly with speed (cinematic dolly-zoom feel)
      const dynDist = p.dist + Math.min(2.5, speed * 0.04);
      const dynHeight = p.height + Math.min(0.8, speed * 0.012);
      targetPos.copy(body.position)
        .add(fwd.clone().multiplyScalar(-dynDist))
        .add(up.clone().multiplyScalar(dynHeight));
      targetLook.copy(body.position)
        .add(fwd.clone().multiplyScalar(2.0))
        .add(up.clone().multiplyScalar(p.lookHeight));
    }

    if (!initialised) {
      currentPos.copy(targetPos);
      currentLook.copy(targetLook);
      initialised = true;
    }
    // Critically damped spring (frame-rate independent)
    const a = 1 - Math.exp(-dt / Math.max(0.001, p.lag));
    currentPos.lerp(targetPos, a);
    currentLook.lerp(targetLook, Math.min(1, a * 1.4));

    camera.position.copy(currentPos);
    camera.lookAt(currentLook);
  }

  function cycle() {
    mode = (mode + 1) % presets.length;
    initialised = false;
  }

  return { update, cycle, getMode: () => mode };
}
