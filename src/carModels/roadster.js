import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import {
  buildLoftHull, buildPanelSeams, buildWindowSeals, profileFractions, sampleSkin,
} from './loftBuilder.js';
import { makeGlass, makePaint, makeSatin, makeShutline, makeTrim, makeTaillight } from './carMaterials.js';
import { buildApertureLamps } from './apertureLamps.js';
import {
  buildMirrors, buildGrille, buildSplitter, buildDiffuser, buildExhaust,
  buildBadgesAndPlate, buildUnderbody, buildArchLiners, buildInterior, buildWing,
} from './parts.js';

// ---------------------------------------------------------------------------
// Speedster — kept under the legacy `roadster` id.
//
// A low two-seater with no roof at all: a wraparound screen barely higher
// than the belt, two humps on the rear deck behind the seats, a nose that
// drops to a slim mouth, round tail lamps and a lip spoiler. 3.9 m long on a
// 2.4 m wheelbase, so the wheels sit at the corners.
//
// Axle-centred frame: wheel centre y 0, ground -0.36, axles z ±1.20, tyres'
// outer faces at x 0.98 (1.68 m track).
// ---------------------------------------------------------------------------

const LINE = { crease: 0.010, creaseY: 0.80 };
export const keys = [
  //   z,     hw,    yb,     hip,   yt,    topW
  { z: -1.85, hw: 0.860, yb: -0.140, hip: 0.300, yt: 0.420, topW: 0.70, hard: true, crown: 0.010, ...LINE, crease: 0.006 },
  { z: -1.62, hw: 0.955, yb: -0.150, hip: 0.365, yt: 0.455, topW: 0.80, crown: 0.014, ...LINE, flare: 0.030, lipY: 0.80 },
  { z: -1.20, hw: 0.990, yb: -0.030, hip: 0.405, yt: 0.470, topW: 0.84, crown: 0.016, ...LINE, flare: 0.055, lipY: 0.84 },   // rear axle
  { z: -0.85, hw: 0.960, yb: -0.170, hip: 0.395, yt: 0.470, topW: 0.80, crown: 0.012, ...LINE, flare: 0.030, lipY: 0.80, sill: 0.020 },
  { z: -0.20, hw: 0.940, yb: -0.180, hip: 0.385, yt: 0.455, topW: 0.78, crown: 0.010, ...LINE, sill: 0.024 },
  { z:  0.45, hw: 0.945, yb: -0.175, hip: 0.390, yt: 0.470, topW: 0.80, crown: 0.016, ...LINE, sill: 0.020, hard: true },   // cowl
  { z:  0.85, hw: 0.960, yb: -0.160, hip: 0.400, yt: 0.455, topW: 0.82, crown: 0.020, ...LINE, flare: 0.030, lipY: 0.80 },
  { z:  1.20, hw: 0.990, yb: -0.030, hip: 0.410, yt: 0.455, topW: 0.84, crown: 0.022, ...LINE, flare: 0.055, lipY: 0.84 },   // front axle
  { z:  1.55, hw: 0.960, yb: -0.160, hip: 0.370, yt: 0.410, topW: 0.82, crown: 0.018, ...LINE, flare: 0.030, lipY: 0.80 },
  { z:  1.85, hw: 0.900, yb: -0.175, hip: 0.250, yt: 0.300, topW: 0.76, crown: 0.012, ...LINE, hard: true },
  { z:  2.05, hw: 0.820, yb: -0.180, hip: 0.070, yt: 0.130, topW: 0.66, crown: 0.006, hard: true },
];
export const CAP_ROLL = { nose: { top: 0.14, bottom: 0.045 }, tail: { top: 0.09, bottom: 0.05 } };
export const wheelStyle = 'speedster';
const F = profileFractions(keys);

// The cockpit is a hole in the deck: everything between the top corners from
// the cowl to the humps comes out of the painted shell.
const COCKPIT = [{ zStart: 0.40, zEnd: -0.88, beltFrac: F.topCorner, topFrac: 1, steps: 18 }];
const HEADLAMPS = [-1, 1].map(side => ({
  zStart: 1.92, zEnd: 1.60, beltFrac: F.beltTuck, topFrac: F.topCorner, steps: 10, side,
}));
export const PANES = [...COCKPIT, ...HEADLAMPS];

const SHUT_LINES = [
  { path: [[1.74, F.topCorner], [1.74, 1.0], [1.74, -F.topCorner]] },
  { path: [[1.74, F.topCorner], [0.44, F.topCorner]], mirror: true },
  {
    path: [[0.40, F.sillLip], [0.40, F.shoulder], [-0.84, F.shoulder],
      [-0.84, F.sillLip], [0.40, F.sillLip]],
    mirror: true,
  },
  { path: [[-1.00, F.topCorner], [-1.00, -F.topCorner]] },
];

// A speedster hump: a small loft of its own, sunk into the rear deck behind
// each seat, tapering back to nothing at the deck lid.
const HUMP = [
  { z: -1.66, hw: 0.17, yb: 0.36, hip: 0.43, yt: 0.465, topW: 0.11, crown: 0.004 },
  { z: -1.38, hw: 0.27, yb: 0.36, hip: 0.45, yt: 0.530, topW: 0.18, crown: 0.010 },
  { z: -1.10, hw: 0.31, yb: 0.36, hip: 0.46, yt: 0.600, topW: 0.21, crown: 0.014 },
  { z: -0.94, hw: 0.31, yb: 0.36, hip: 0.46, yt: 0.630, topW: 0.21, crown: 0.014 },
  { z: -0.82, hw: 0.29, yb: 0.36, hip: 0.45, yt: 0.610, topW: 0.19, crown: 0.010, hard: true },
];
let humpGeo = null;
function buildHumps(color) {
  const g = new THREE.Group();
  humpGeo ||= buildLoftHull(HUMP, { ringsPerSegment: 8, profilePoints: 14, capRoll: { nose: 0.05, tail: 0.02 } });
  for (const side of [-1, 1]) {
    const hump = new THREE.Mesh(humpGeo, makePaint(color));
    hump.position.x = side * 0.34;
    hump.castShadow = true; hump.receiveShadow = true;
    hump.userData.noMerge = true;
    g.add(hump);
    // Roll hoop just proud of each hump's crown.
    const hoop = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.022, 8, 20, Math.PI), makeSatin());
    hoop.position.set(side * 0.34, 0.50, -0.88);
    g.add(hoop);
  }
  return g;
}

// Wraparound screen: a low bowed strip of glass on a satin surround.
function buildScreen(color) {
  const g = new THREE.Group();
  const positions = [], indices = [];
  const nx = 20, ny = 4;
  for (let row = 0; row <= ny; row++) {
    const t = row / ny;
    for (let col = 0; col <= nx; col++) {
      const u = col / nx * 2 - 1;
      positions.push(u * THREE.MathUtils.lerp(0.80, 0.70, t),
        THREE.MathUtils.lerp(0.465, 0.73, t) + (1 - u * u) * 0.010,
        THREE.MathUtils.lerp(0.42, 0.22, t) + (1 - u * u) * 0.17 - Math.abs(u) ** 3 * 0.10);
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
  screen.name = 'speedster-screen';
  g.add(screen);
  // Top rail and the two end posts.
  const rail = [];
  for (let col = 0; col <= nx; col++) {
    const u = col / nx * 2 - 1;
    rail.push(new THREE.Vector3(u * 0.70, 0.74 + (1 - u * u) * 0.010, 0.22 + (1 - u * u) * 0.17 - Math.abs(u) ** 3 * 0.10));
  }
  g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(rail), 32, 0.016, 6, false), makeSatin()));
  for (const side of [-1, 1]) {
    const post = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.80, 0.455, 0.42), new THREE.Vector3(side * 0.70, 0.74, 0.22),
    ]), 4, 0.018, 6, false), makePaint(color));
    g.add(post);
  }
  return g;
}

// Round tail lamps in satin bezels on the tail face, baked into one red mesh.
function buildTailLamps() {
  const g = new THREE.Group();
  const red = [];
  for (const side of [-1, 1]) for (const x of [0.46, 0.66]) {
    const bezel = new THREE.Mesh(new THREE.TorusGeometry(0.062, 0.009, 6, 24), makeSatin());
    bezel.position.set(side * x, 0.26, -1.858); g.add(bezel);
    const well = new THREE.Mesh(new THREE.CylinderGeometry(0.056, 0.056, 0.02, 24), makeTrim());
    well.geometry.rotateX(Math.PI / 2); well.position.set(side * x, 0.26, -1.848); g.add(well);
    const lens = new THREE.CircleGeometry(0.048, 24);
    lens.rotateY(Math.PI); lens.translate(side * x, 0.26, -1.862);
    red.push(lens);
  }
  const brakeMesh = new THREE.Mesh(mergeGeometries(red, false), makeTaillight());
  red.forEach(geometry => geometry.dispose());
  brakeMesh.userData.noMerge = true;
  g.add(brakeMesh);
  return { group: g, brakeMesh };
}

export function decorate(body, ctx) {
  const rim = buildWindowSeals(keys, { panes: COCKPIT, width: 0.022, proud: 0.006 });
  if (rim) body.add(new THREE.Mesh(rim, makeTrim()));
  const shut = buildPanelSeams(keys, SHUT_LINES);
  if (shut) body.add(new THREE.Mesh(shut, makeShutline()));
  const lamps = buildApertureLamps(keys, F, { head: HEADLAMPS, depth: 0.026, projectorZ: [1.82, 1.70] });
  body.add(lamps.group);

  body.add(buildScreen(ctx.color));
  body.add(buildHumps(ctx.color));
  body.add(buildInterior({
    floorY: -0.05, dashZ: 0.42, dashH: 0.14, seatZ: -0.58, bulkheadZ: -0.90,
    seatBackH: 0.42, halfWidth: 0.62, seatX: 0.34,
    wheelY: 0.40, wheelZ: 0.16, wheelR: 0.135, harness: true, seats: 2,
  }));

  // Tail cap plane z -1.85; face y -0.09 .. 0.33.
  const tail = buildTailLamps();
  body.add(tail.group);
  body.add(buildBadgesAndPlate({ frontPose: sampleSkin(keys, 1.70, 1), rearZ: -1.862, rearY: 0.26, plateY: 0.08 }));
  body.add(buildExhaust({ z: -1.87, y: -0.03, x: 0.14, count: 2, r: 0.042 }));
  body.add(buildDiffuser({ z: -1.72, y: -0.24, w: 1.30, tunnels: false, fences: false, strakes: 3 }));
  body.add(buildWing({ z: -1.62, deckY: 0.455, span: 1.40, style: 'ducktail', gurney: false }));

  // Nose cap plane z 2.05; face y -0.135 .. -0.01: a slim mouth and splitter.
  body.add(buildGrille({ z: 2.053, y: -0.07, w: 0.70, h: 0.10, depth: 0.030, ducts: false, bar: true }));
  body.add(buildSplitter({ z: 1.96, y: -0.19, w: 1.56, canards: false, rods: false }));
  body.add(buildMirrors({ z: 0.42, y: 0.48, x: 0.92, color: ctx.color, indicator: false, fairing: true }));

  body.add(buildUnderbody({ y: -0.25, w: 1.22, len: 3.40 }));
  body.add(buildArchLiners({ zF: 1.20, zR: -1.20, x: 0.84, r: 0.413, width: 0.26, lip: false }));
  return { brakeLights: tail.brakeMesh };
}
