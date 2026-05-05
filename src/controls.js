/**
 * Keyboard input — WASD or arrow keys. Returns smoothed analog values to
 * avoid the bang-bang feel of raw key states.
 */
export function createInput() {
  const keys = new Set();
  const state = {
    throttle: 0,   // 0..1
    brake: 0,      // 0..1
    steer: 0,      // -1..1 (left negative)
    handbrake: false,
    cameraToggle: false,
    reset: false,
  };

  const onDown = (e) => {
    keys.add(e.code);
    if (e.code === 'KeyC') state.cameraToggle = true;
    if (e.code === 'KeyR') state.reset = true;
    // Stop arrow keys from scrolling the page
    if (
      e.code === 'ArrowUp' || e.code === 'ArrowDown' ||
      e.code === 'ArrowLeft' || e.code === 'ArrowRight' ||
      e.code === 'Space'
    ) e.preventDefault();
  };
  const onUp = (e) => keys.delete(e.code);
  const onBlur = () => keys.clear();

  window.addEventListener('keydown', onDown);
  window.addEventListener('keyup', onUp);
  window.addEventListener('blur', onBlur);

  function update(dt) {
    const fwd = keys.has('KeyW') || keys.has('ArrowUp');
    const back = keys.has('KeyS') || keys.has('ArrowDown');
    const left = keys.has('KeyA') || keys.has('ArrowLeft');
    const right = keys.has('KeyD') || keys.has('ArrowRight');
    state.handbrake = keys.has('Space');

    // Throttle / brake — independent so you can trail-brake in
    state.throttle = approach(state.throttle, fwd ? 1 : 0, dt * (fwd ? 4 : 6));
    state.brake = approach(state.brake, back ? 1 : 0, dt * (back ? 6 : 8));

    // Steering — slower so high-speed inputs aren't jerky
    let target = 0;
    if (left) target -= 1;
    if (right) target += 1;
    state.steer = approach(state.steer, target, dt * (target === 0 ? 6 : 3.2));
    return state;
  }

  function consumeToggle() {
    const v = state.cameraToggle;
    state.cameraToggle = false;
    return v;
  }
  function consumeReset() {
    const v = state.reset;
    state.reset = false;
    return v;
  }

  return { update, consumeToggle, consumeReset, state };
}

function approach(current, target, rate) {
  // Frame-rate-independent exponential smoothing.
  const t = 1 - Math.exp(-rate);
  return current + (target - current) * t;
}
