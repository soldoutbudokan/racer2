import * as THREE from 'three';
import { hideFromOverridePasses } from './scenery/noise.js';
import { getCarSpec } from './carSpecs.js';
import { idealLineFor } from './idealLine.js';

/**
 * "Perfect line" driving aid: a ribbon drawn along the ideal racing line for
 * the car the player is in (idealLine.js: the lap-time optimum for its grip,
 * wing, brakes and gearing over the whole road; the asphalt's rubbered groove
 * is the GT3's), recoloured every frame by comparing the ideal speed at each
 * point against the player's CURRENT speed:
 *   red    — the perfect lap is slower here than you are going (brake!)
 *   white  — you are on the ideal pace
 *   green  — the perfect lap carries more speed here (you could go faster)
 *
 * The ideal-speed profile is the same plan the AI drives, at full skill:
 * corner-limited speed from the line's curvature with the aero load counted,
 * anticipatory braking inside the friction circle, and a forward pass so the
 * aid never demands speed the car cannot actually build out of a corner.
 * Switching cars moves the line as well as the speeds.
 */

const LINE_WIDTH = 0.8;
const LIFT = 0.045;            // above road (0.01) / edge lines (0.016) / skids (0.018)
const CHEVRON_M = 3.4;         // target chevron pitch along the line

// Linear, pre-tone-mapping. Kept below 1 so ACES does not bleach them to
// pastel (the old 0.95 green came out mint).
const COL_RED = [0.95, 0.07, 0.04];
const COL_WHITE = [0.62, 0.66, 0.72];
const COL_GREEN = [0.06, 0.62, 0.20];

// Painted chevrons pointing down the lap. Translucent, soft-edged, and
// faded out round the player's car so the part of the line under and just in
// front of the bonnet never paints over the car's own shadow, then faded again
// with distance so the far line does not read as a solid stroke.
const vertexShader = /* glsl */`
  attribute vec2 aLine;         // x: metres along the lap, y: -1..1 across
  attribute vec3 color;
  varying vec2 vLine;
  varying vec3 vColor;
  varying vec3 vWorld;
  void main() {
    vLine = aLine;
    vColor = color;
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;
const fragmentShader = /* glsl */`
  uniform vec3 uFocus;
  uniform vec2 uHeading;
  uniform float uPitch;
  uniform float uOpacity;
  varying vec2 vLine;
  varying vec3 vColor;
  varying vec3 vWorld;
  void main() {
    float across = abs(vLine.y);
    // Centre leads the edges, so each stripe is an arrowhead pointing forward.
    float phase = fract((vLine.x + across * 0.55) / uPitch);
    float aa = fwidth(phase) * 1.5;
    float chevron = smoothstep(0.0, aa + 0.02, phase) * (1.0 - smoothstep(0.46, 0.48 + aa, phase));
    float edge = 1.0 - smoothstep(0.62, 1.0, across);
    float body = mix(0.22, 1.0, chevron) * edge;

    vec2 rel = vWorld.xz - uFocus.xz;
    float d = length(rel);
    // Only the line ahead of the car: behind it, it would sit between the
    // chase camera and the car and paint over the whole foreground.
    float ahead = smoothstep(-2.0, 2.0, dot(rel, uHeading));
    float fade = mix(1.0, ahead, 1.0 - smoothstep(30.0, 45.0, d));
    fade *= smoothstep(4.0, 11.0, d) * mix(1.0, 0.45, smoothstep(60.0, 260.0, d));

    gl_FragColor = vec4(vColor, body * fade * uOpacity);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export function createRacingLine(scene, track) {
  const frames = track.frames;
  const n = frames.length;

  // The ideal speed per frame (m/s) for the current car; main.js reads it
  // for the pace readout, so it is one array refilled on every car change.
  const profile = new Float32Array(n);

  // --- Ribbon mesh: two vertices per frame, dynamic colours ---
  // The first frame is repeated at the end with the full lap length, so the
  // chevrons run straight through the start line instead of squeezing a whole
  // lap of pattern into the closing segment.
  const m = n + 1;
  const positions = new Float32Array(m * 2 * 3);
  const colors = new Float32Array(m * 2 * 3);
  const line = new Float32Array(m * 2 * 2);
  const half = LINE_WIDTH / 2;
  for (let k = 0; k < m; k++) {
    colors.set(COL_WHITE, k * 6);
    colors.set(COL_WHITE, k * 6 + 3);
  }
  const indices = [];
  for (let k = 0; k < n; k++) {
    const a = k * 2;
    const b = k * 2 + 1;
    const c = (k + 1) * 2;
    const d = (k + 1) * 2 + 1;
    indices.push(a, c, b, b, c, d);
  }
  const geo = new THREE.BufferGeometry();
  const posAttr = new THREE.BufferAttribute(positions, 3);
  geo.setAttribute('position', posAttr);
  const colorAttr = new THREE.BufferAttribute(colors, 3);
  colorAttr.setUsage(THREE.DynamicDrawUsage);
  geo.setAttribute('color', colorAttr);
  const lineAttr = new THREE.BufferAttribute(line, 2);
  geo.setAttribute('aLine', lineAttr);
  geo.setIndex(indices);

  const uniforms = {
    uFocus: { value: new THREE.Vector3(1e6, 0, 1e6) },
    uHeading: { value: new THREE.Vector2(0, 0) },
    uPitch: { value: CHEVRON_M },
    uOpacity: { value: 0.78 },
  };

  // Lay the ribbon along this car's line and take its speeds.
  let currentSpec;
  function setCarSpec(spec = getCarSpec()) {
    if (currentSpec === spec) return;
    currentSpec = spec;
    const ideal = idealLineFor(track, spec);
    profile.set(ideal.profile);
    let lapLength = 0;
    for (let i = 0; i < n; i++) lapLength += ideal.ds[i];
    uniforms.uPitch.value = lapLength / Math.max(1, Math.round(lapLength / CHEVRON_M));
    let along = 0;
    for (let k = 0; k < m; k++) {
      const i = k % n;
      const f = frames[i];
      const lat = ideal.offset[i];
      const x = f.pos.x + f.left.x * lat, z = f.pos.z + f.left.z * lat;
      positions.set([x + f.left.x * half, f.pos.y + LIFT, z + f.left.z * half], k * 6);
      positions.set([x - f.left.x * half, f.pos.y + LIFT, z - f.left.z * half], k * 6 + 3);
      line.set([along, 1, along, -1], k * 4);
      along += ideal.ds[i];
    }
    posAttr.needsUpdate = true;
    lineAttr.needsUpdate = true;
    geo.computeBoundingSphere();
  }
  setCarSpec();
  const mesh = new THREE.Mesh(geo, new THREE.ShaderMaterial({
    name: 'racing-line',
    uniforms, vertexShader, fragmentShader,
    transparent: true,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -4,
    polygonOffsetUnits: -4,
    extensions: { derivatives: true },
  }));
  mesh.renderOrder = 3;
  mesh.visible = false;
  mesh.frustumCulled = false;
  // A painted decal, not geometry: kept out of GTAO's depth prepass, which
  // would otherwise shade the lifted ribbon's edges as creases in the road.
  hideFromOverridePasses(mesh);
  scene.add(mesh);

  // Recolour the whole loop against the player's current speed. Piecewise
  // blend: red below −1 m/s of margin, white on pace, green above +3 m/s.
  // `focus` is the player's position, round which the line fades out, and
  // `heading` their forward direction in the ground plane.
  function update(speedMs, focus, heading) {
    if (focus) uniforms.uFocus.value.set(focus.x, focus.y, focus.z);
    if (heading) uniforms.uHeading.value.set(heading.x, heading.z);
    const arr = colorAttr.array;
    for (let k = 0; k < m; k++) {
      const dv = profile[k % n] - speedMs;
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
      const o = k * 6;
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

  return { profile, update, setVisible, setCarSpec, mesh, dispose };
}
