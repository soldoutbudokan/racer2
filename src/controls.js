/**
 * Keyboard input. A binding is either a key code or an array of key codes
 * (any of which trigger the action). This lets single-player accept WASD
 * AND arrow keys at the same time, while two-player splits them by hand.
 */
export function createInput(bindings) {
  const keys = new Set();
  const state = {
    throttle: 0,
    brake: 0,
    steer: 0,
    handbrake: false,
    cameraToggle: false,
    reset: false,
    rescue: false,
    lineToggle: false,
  };

  const allBound = collectAllCodes(bindings);

  const onDown = (e) => {
    keys.add(e.code);
    if (matches(e.code, bindings.cameraToggle)) state.cameraToggle = true;
    if (matches(e.code, bindings.reset)) state.reset = true;
    if (matches(e.code, bindings.rescue)) state.rescue = true;
    if (matches(e.code, bindings.lineToggle)) state.lineToggle = true;
    if (allBound.has(e.code)) e.preventDefault();
  };
  const onUp = (e) => keys.delete(e.code);
  const onBlur = () => keys.clear();

  window.addEventListener('keydown', onDown);
  window.addEventListener('keyup', onUp);
  window.addEventListener('blur', onBlur);

  function update(dt) {
    const fwd = isPressed(keys, bindings.throttle);
    const back = isPressed(keys, bindings.brake);
    const left = isPressed(keys, bindings.left);
    const right = isPressed(keys, bindings.right);
    state.handbrake = isPressed(keys, bindings.handbrake);

    state.throttle = approach(state.throttle, fwd ? 1 : 0, dt * (fwd ? 4 : 6));
    state.brake = approach(state.brake, back ? 1 : 0, dt * (back ? 6 : 8));

    let target = 0;
    if (left) target -= 1;
    if (right) target += 1;
    state.steer = approach(state.steer, target, dt * (target === 0 ? 6 : 3.2));
    return state;
  }

  function consumeToggle() { const v = state.cameraToggle; state.cameraToggle = false; return v; }
  function consumeReset()  { const v = state.reset;        state.reset = false;        return v; }
  function consumeRescue() { const v = state.rescue;       state.rescue = false;       return v; }
  function consumeLineToggle() { const v = state.lineToggle; state.lineToggle = false; return v; }

  return { update, consumeToggle, consumeReset, consumeRescue, consumeLineToggle, state };
}

// Single-player: WASD OR arrow keys, both work.
export const SINGLE_PLAYER_BINDINGS = {
  throttle: ['KeyW', 'ArrowUp'],
  brake:    ['KeyS', 'ArrowDown'],
  left:     ['KeyA', 'ArrowLeft'],
  right:    ['KeyD', 'ArrowRight'],
  handbrake: 'Space',
  cameraToggle: 'KeyC',
  reset: 'KeyR',
  rescue: 'KeyB',
  lineToggle: 'KeyL',
};

// Player 1 in 2P mode: WASD only, with the global camera/reset/rescue bindings.
export const WASD_BINDINGS = {
  throttle: 'KeyW',
  brake:    'KeyS',
  left:     'KeyA',
  right:    'KeyD',
  handbrake: 'ShiftLeft',
  cameraToggle: 'KeyC',
  reset: 'KeyR',
  rescue: 'KeyB',
  lineToggle: 'KeyL',
};

// Player 2 in 2P mode: arrows only. Numpad-0 as handbrake.
export const ARROW_BINDINGS = {
  throttle: 'ArrowUp',
  brake:    'ArrowDown',
  left:     'ArrowLeft',
  right:    'ArrowRight',
  handbrake: 'Numpad0',
  cameraToggle: null,
  reset: null,
  rescue: null,
  lineToggle: null,
};

function isPressed(keys, binding) {
  if (!binding) return false;
  if (Array.isArray(binding)) return binding.some((k) => keys.has(k));
  return keys.has(binding);
}

function matches(code, binding) {
  if (!binding) return false;
  if (Array.isArray(binding)) return binding.includes(code);
  return code === binding;
}

function collectAllCodes(bindings) {
  const set = new Set();
  for (const v of Object.values(bindings)) {
    if (!v) continue;
    if (Array.isArray(v)) v.forEach((k) => set.add(k));
    else set.add(v);
  }
  return set;
}

function approach(current, target, rate) {
  const t = 1 - Math.exp(-rate);
  return current + (target - current) * t;
}
