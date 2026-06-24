import * as THREE from 'three';

/**
 * "Perfect line" driving aid: a ribbon drawn along the ideal racing line (the
 * same groove the track bakes into the asphalt), recoloured every frame by
 * comparing the ideal speed at each point against the player's CURRENT speed:
 *   red    — the perfect lap is slower here than you are going (brake!)
 *   white  — you are on the ideal pace
 *   green  — the perfect lap carries more speed here (you could go faster)
 *
 * The ideal-speed profile mirrors the AI planner: corner-limited speed from
 * line curvature with anticipatory-braking back-passes, plus a forward
 * acceleration pass so the aid never demands speed the car cannot actually
 * build out of a corner.
 */

// Reference car performance, calibrated against the measured behaviour of the
// player car (SPEC in car.js, measured by scripts/physics-test.mjs):
// lateral grip μ·g ≈ 14.2 m/s² (planned at 13 to leave a working margin),
// straight-line braking measured ≈ 15 m/s² with downforce (planned at 10 so
// the brake warning comes comfortably early), top speed ≈ 256 km/h, and the
// wheel power that reproduces the measured acceleration curve.
const A_LAT = 13.0;            // m/s² usable lateral acceleration
const A_BRAKE = 10.0;          // m/s² planning deceleration
const A_ACCEL_CAP = 7.5;       // m/s² traction-limited launch cap
const V_MAX = 71;              // m/s drag-limited top speed
const P_WHEELS = 215e3;        // W effective at the wheels
const MASS = 1350;             // kg
const HALF_RHO_CDA = 0.5 * 1.225 * 0.92;
const ROLL_DRAG = 0.014 * MASS * 9.82;

const LINE_WIDTH = 0.55;
const LIFT = 0.045;            // above road (0.01) / edge lines (0.016) / skids (0.018)

const COL_RED = [1.0, 0.13, 0.10];
const COL_WHITE = [0.93, 0.95, 0.97];
const COL_GREEN = [0.10, 0.95, 0.32];

export function createRacingLine(scene, track) {
  const frames = track.frames;
  const offset = track.racingLineOffset;
  const n = frames.length;

  // Ideal-line points: centreline + groove offset.
  const pts = [];
  for (let i = 0; i < n; i++) {
    const f = frames[i];
    pts.push(new THREE.Vector3(
      f.pos.x + f.left.x * offset[i],
      f.pos.y,
      f.pos.z + f.left.z * offset[i],
    ));
  }

  const ds = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    ds[i] = Math.max(0.5, pts[i].distanceTo(pts[(i + 1) % n]));
  }

  // Curvature of the offset line from the turn angle between adjacent chords.
  const kappa = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const a = pts[(i - 1 + n) % n];
    const b = pts[i];
    const c = pts[(i + 1) % n];
    const v1x = b.x - a.x, v1z = b.z - a.z;
    const v2x = c.x - b.x, v2z = c.z - b.z;
    const l1 = Math.hypot(v1x, v1z);
    const l2 = Math.hypot(v2x, v2z);
    const dot = (v1x * v2x + v1z * v2z) / Math.max(1e-6, l1 * l2);
    const theta = Math.acos(Math.min(1, Math.max(-1, dot)));
    kappa[i] = theta / Math.max(0.5, (l1 + l2) / 2);
  }
  const kSmooth = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    let s = 0;
    for (let k = -2; k <= 2; k++) s += kappa[(i + k + n) % n];
    kSmooth[i] = s / 5;
  }

  // --- Ideal speed profile (m/s per frame) ---
  const profile = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    profile[i] = Math.min(V_MAX, Math.sqrt(A_LAT / Math.max(1e-4, kSmooth[i])));
  }
  // Anticipatory braking: vᵢ ≤ √(vᵢ₊₁² + 2·a·ds). Two passes handle the wrap.
  for (let pass = 0; pass < 2; pass++) {
    for (let i = n - 1; i >= 0; i--) {
      const next = profile[(i + 1) % n];
      const cap = Math.sqrt(next * next + 2 * A_BRAKE * ds[i]);
      if (profile[i] > cap) profile[i] = cap;
    }
  }
  // Reachability: vᵢ₊₁ ≤ √(vᵢ² + 2·a(v)·ds) with engine/drag-limited a(v).
  const accelAt = (v) => Math.min(A_ACCEL_CAP, Math.max(0,
    (P_WHEELS / Math.max(8, v) - HALF_RHO_CDA * v * v - ROLL_DRAG) / MASS));
  for (let pass = 0; pass < 2; pass++) {
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      const cap = Math.sqrt(profile[i] * profile[i] + 2 * accelAt(profile[i]) * ds[i]);
      if (profile[j] > cap) profile[j] = cap;
    }
  }

  // --- Ribbon mesh: two vertices per frame, closed loop, dynamic colours ---
  const positions = new Float32Array(n * 2 * 3);
  const colors = new Float32Array(n * 2 * 3);
  const half = LINE_WIDTH / 2;
  for (let i = 0; i < n; i++) {
    const f = frames[i];
    const p = pts[i];
    positions.set(
      [p.x + f.left.x * half, p.y + LIFT, p.z + f.left.z * half], i * 6);
    positions.set(
      [p.x - f.left.x * half, p.y + LIFT, p.z - f.left.z * half], i * 6 + 3);
    colors.set(COL_WHITE, i * 6);
    colors.set(COL_WHITE, i * 6 + 3);
  }
  const indices = [];
  for (let i = 0; i < n; i++) {
    const a = i * 2;
    const b = i * 2 + 1;
    const c = ((i + 1) % n) * 2;
    const d = ((i + 1) % n) * 2 + 1;
    indices.push(a, c, b, b, c, d);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const colorAttr = new THREE.BufferAttribute(colors, 3);
  colorAttr.setUsage(THREE.DynamicDrawUsage);
  geo.setAttribute('color', colorAttr);
  geo.setIndex(indices);

  const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -4,
    polygonOffsetUnits: -4,
  }));
  mesh.renderOrder = 3;
  mesh.visible = false;
  scene.add(mesh);

  // Recolour the whole loop against the player's current speed. Piecewise
  // blend: red below −1 m/s of margin, white on pace, green above +3 m/s.
  function update(speedMs) {
    const arr = colorAttr.array;
    for (let i = 0; i < n; i++) {
      const dv = profile[i] - speedMs;
      let from, to, t;
      if (dv <= 1) {
        from = COL_RED; to = COL_WHITE;
        t = Math.max(0, (dv + 1) / 2);
      } else {
        from = COL_WHITE; to = COL_GREEN;
        t = Math.min(1, (dv - 1) / 2);
      }
      const r = from[0] + (to[0] - from[0]) * t;
      const g = from[1] + (to[1] - from[1]) * t;
      const b = from[2] + (to[2] - from[2]) * t;
      const o = i * 6;
      arr[o] = r; arr[o + 1] = g; arr[o + 2] = b;
      arr[o + 3] = r; arr[o + 4] = g; arr[o + 5] = b;
    }
    colorAttr.needsUpdate = true;
  }

  function setVisible(v) {
    mesh.visible = v;
  }

  function dispose() {
    scene.remove(mesh);
    mesh.geometry.dispose();
    mesh.material.dispose();
  }

  return { profile, update, setVisible, mesh, dispose };
}
