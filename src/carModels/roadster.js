import * as THREE from 'three';
import {
  buildPanelSeams, buildWindowSeals, profileFractions, sampleSkin,
} from './loftBuilder.js';
import { makeGlass, makePaint, makeSatin, makeShutline, makeTrim } from './carMaterials.js';
import { buildApertureLamps } from './apertureLamps.js';
import {
  buildTaillights, buildMirrors, buildGrille, buildSplitter, buildDiffuser,
  buildExhaust, buildBadgesAndPlate, buildUnderbody, buildArchLiners, buildInterior,
} from './parts.js';

// A compact, front-engined two-seater: rounded fenders, a low waist and a real
// open cockpit. All dimensions stay in the shared axle-centred frame, with
// axles at +/-1.45 and a 0.36 tyre radius. The short overhangs, separate screen
// and twin hoops distinguish it from every enclosed car even at race distance.
export const keys = [
  { z: -2.07, hw: 0.82, yb: -0.12, hip: 0.25, yt: 0.37, topW: 0.65, crown: 0.010, hard: true },
  { z: -1.88, hw: 0.93, yb: -0.12, hip: 0.36, yt: 0.45, topW: 0.79, crown: 0.014, flare: 0.035 },
  { z: -1.73, hw: 0.965, yb: -0.08, hip: 0.39, yt: 0.47, topW: 0.84, flare: 0.055, lipY: 0.70, crown: 0.015 },
  { z: -1.45, hw: 0.965, yb: 0.035, hip: 0.41, yt: 0.49, topW: 0.85, flare: 0.060, lipY: 0.72, crown: 0.016 },
  { z: -1.12, hw: 0.96, yb: -0.13, hip: 0.39, yt: 0.45, topW: 0.80, flare: 0.050, lipY: 0.68, crown: 0.012 },
  { z: -0.84, hw: 0.925, yb: -0.18, hip: 0.37, yt: 0.43, topW: 0.78, sill: 0.022, crown: 0.010 },
  { z: 0.30, hw: 0.92, yb: -0.18, hip: 0.365, yt: 0.44, topW: 0.78, sill: 0.022, crown: 0.014 },
  { z: 0.60, hw: 0.93, yb: -0.16, hip: 0.375, yt: 0.46, topW: 0.80, sill: 0.018, crown: 0.019 },
  { z: 1.12, hw: 0.96, yb: -0.10, hip: 0.40, yt: 0.47, topW: 0.83, flare: 0.050, lipY: 0.70, crown: 0.022 },
  { z: 1.45, hw: 0.96, yb: 0.035, hip: 0.41, yt: 0.48, topW: 0.85, flare: 0.060, lipY: 0.72, crown: 0.020 },
  { z: 1.77, hw: 0.955, yb: -0.09, hip: 0.365, yt: 0.425, topW: 0.81, flare: 0.045, lipY: 0.70, crown: 0.017 },
  { z: 1.99, hw: 0.91, yb: -0.14, hip: 0.235, yt: 0.30, topW: 0.73, crown: 0.013 },
  { z: 2.13, hw: 0.78, yb: -0.14, hip: 0.08, yt: 0.15, topW: 0.63, crown: 0.006, hard: true },
];
export const CAP_ROLL = { nose: 0.040, tail: 0.055 };
export const wheelStyle = 'rally';
const F = profileFractions(keys);

// Removing the crown, rather than hiding a roof with a black panel, leaves
// the two seats and dashboard visibly inside a deep, open passenger cell.
const COCKPIT = [{ zStart: 0.40, zEnd: -0.91, beltFrac: F.topCorner, topFrac: 1, steps: 18 }];
const HEADLAMPS = [-1, 1].map(side => ({
  zStart: 2.04, zEnd: 1.84, beltFrac: F.beltTuck, topFrac: F.topCorner, steps: 8, side,
}));
export const PANES = [...COCKPIT, ...HEADLAMPS];

function tube(points, radius, material, closed = false) {
  const curve = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p)), closed, 'centripetal');
  return new THREE.Mesh(new THREE.TubeGeometry(curve, closed ? 48 : 24, radius, 6, closed), material);
}

function buildWindscreen(color) {
  const group = new THREE.Group();
  // The screen is independent of the low body loft: a lightly bowed trapezoid
  // leans back from the cowl, leaving the rest of the passenger cell open.
  const positions = [], indices = [];
  const nx = 16, ny = 4;
  for (let row = 0; row <= ny; row++) {
    const t = row / ny;
    for (let col = 0; col <= nx; col++) {
      const u = col / nx * 2 - 1;
      positions.push(u * THREE.MathUtils.lerp(0.76, 0.655, t),
        THREE.MathUtils.lerp(0.445, 0.90, t) + (1 - u * u) * 0.018,
        THREE.MathUtils.lerp(0.46, 0.16, t) + (1 - u * u) * 0.045);
    }
  }
  for (let row = 0; row < ny; row++) for (let col = 0; col < nx; col++) {
    const a = row * (nx + 1) + col, b = a + nx + 1;
    indices.push(a, a + 1, b + 1, a, b + 1, b);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices); geometry.computeVertexNormals();
  const screen = new THREE.Mesh(geometry, makeGlass());
  screen.name = 'roadster-windscreen';
  group.add(screen);
  const surround = [
    [-0.76, 0.445, 0.46], [-0.655, 0.90, 0.16], [0, 0.918, 0.205],
    [0.655, 0.90, 0.16], [0.76, 0.445, 0.46], [0, 0.463, 0.505],
  ];
  group.add(tube(surround, 0.021, makeTrim(), true));
  for (const sx of [-1, 1]) {
    group.add(tube([[sx * 0.76, 0.435, 0.47], [sx * 0.71, 0.68, 0.315], [sx * 0.655, 0.90, 0.16]],
      0.025, makePaint(color)));
  }
  return group;
}

export function decorate(body, ctx) {
  body.add(buildWindscreen(ctx.color));
  const rim = buildWindowSeals(keys, { panes: COCKPIT, width: 0.020, proud: 0.006 });
  if (rim) body.add(new THREE.Mesh(rim, makeTrim()));
  const lamps = buildApertureLamps(keys, F, { head: HEADLAMPS, projectorZ: [1.94], depth: 0.026 });
  body.add(lamps.group);

  const seams = buildPanelSeams(keys, [
    { path: [[0.59, F.topCorner], [0.59, 1], [0.59, -F.topCorner]] },
    { path: [[0.59, F.topCorner], [1.82, F.topCorner]], mirror: true },
    { path: [[1.82, F.topCorner], [1.82, 1], [1.82, -F.topCorner]] },
    { path: [[0.59, F.sillLip], [0.59, F.shoulder], [-0.84, F.shoulder],
      [-0.84, F.sillLip], [0.59, F.sillLip]], mirror: true },
    { path: [[-1.10, F.topCorner], [-1.10, 1], [-1.10, -F.topCorner]] },
  ]);
  if (seams) body.add(new THREE.Mesh(seams, makeShutline()));

  body.add(buildInterior({
    floorY: -0.035, dashZ: 0.41, seatZ: -0.54, bulkheadZ: -0.90,
    seatBackH: 0.44, halfWidth: 0.62, seatX: 0.33,
    wheelY: 0.42, wheelZ: 0.15, wheelR: 0.135, harness: false,
  }));
  // Satin hoops emerge from the rear bulkhead behind each head restraint.
  for (const sx of [-1, 1]) {
    body.add(tube([
      [sx * 0.33 - 0.19, 0.41, -0.82], [sx * 0.33 - 0.18, 0.67, -0.82],
      [sx * 0.33, 0.75, -0.84], [sx * 0.33 + 0.18, 0.67, -0.82],
      [sx * 0.33 + 0.19, 0.41, -0.82],
    ], 0.027, makeSatin()));
  }
  const tail = buildTaillights({ z: -2.073, y: 0.22, width: 1.18, height: 0.10,
    depth: 0.034, barH: 0.025, segments: 3, fog: false });
  body.add(tail.group);
  body.add(buildMirrors({ z: 0.35, y: 0.47, x: 0.94, color: ctx.color, indicator: false }));
  body.add(buildGrille({ z: 2.135, y: -0.008, w: 0.72, h: 0.13, depth: 0.032, ducts: false, bar: false }));
  body.add(buildSplitter({ z: 2.035, y: -0.17, w: 1.26, canards: false, rods: false, fins: false }));
  body.add(buildDiffuser({ z: -1.94, y: -0.23, w: 1.20, tunnels: false, fences: false, strakes: 3 }));
  body.add(buildExhaust({ z: -2.09, y: -0.095, x: 0.54, r: 0.044, count: 2 }));
  body.add(buildBadgesAndPlate({ frontPose: sampleSkin(keys, 1.91, 1), rearZ: -2.084,
    rearY: 0.32, plateY: 0.025 }));
  body.add(buildUnderbody({ y: -0.25, w: 1.18, len: 3.45 }));
  body.add(buildArchLiners({ x: 0.845, width: 0.26, r: 0.413, lip: false }));
  return { brakeLights: tail.brakeMesh };
}
