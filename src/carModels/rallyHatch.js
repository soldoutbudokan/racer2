import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import {
  buildGreenhouseShell, buildPanelSeams, buildWindowSeals, profileFractions, sampleSkin,
} from './loftBuilder.js';
import { makeGlass, makeTrim, makePaint, makeShutline, makeHeadlight, makeTaillight } from './carMaterials.js';
import {
  addOpening, buildMirrors, buildGrille, buildExhaust, buildBadgesAndPlate,
  buildUnderbody, buildArchLiners, buildInterior, buildDoorFurniture, buildWipers,
} from './parts.js';
import { buildApertureLamps } from './apertureLamps.js';

// Three-door hot hatch: compact GR Yaris / Delta-inspired proportions, broad
// shoulders, a tapered dark roof and a short raked tail. The roof is 27 cm
// lower than the old tall hatch, and the pillars follow the sculpted body.
// Axle-centred coordinates: hubs y=0, z=+/-1.45; tyre radius 0.36.
export const keys = [
  { z: -2.035, hw: 0.850, yb: -0.125, hip: 0.475, yt: 0.660, topW: 0.71, hard: true, crown: 0.010 },
  { z: -1.880, hw: 0.938, yb: -0.080, hip: 0.550, yt: 0.860, topW: 0.72,
    flare: 0.025, lipY: 0.72, crease: 0.006, crown: 0.015 },
  { z: -1.650, hw: 0.966, yb: -0.015, hip: 0.590, yt: 1.080, topW: 0.70,
    flare: 0.040, lipY: 0.71, crease: 0.008, crown: 0.018 },
  { z: -1.450, hw: 0.966, yb: 0.045, hip: 0.600, yt: 1.125, topW: 0.69,
    flare: 0.045, lipY: 0.71, crease: 0.008, crown: 0.022 },
  { z: -1.120, hw: 0.955, yb: -0.085, hip: 0.595, yt: 1.150, topW: 0.69,
    flare: 0.035, lipY: 0.71, sill: 0.021, crease: 0.008, crown: 0.024 },
  { z: -0.350, hw: 0.935, yb: -0.185, hip: 0.575, yt: 1.165, topW: 0.69,
    sill: 0.029, crease: 0.008, tuck: 0.30, crown: 0.025 },
  { z: 0.390, hw: 0.935, yb: -0.185, hip: 0.565, yt: 1.105, topW: 0.70,
    sill: 0.029, crease: 0.008, tuck: 0.30, crown: 0.020 },
  { z: 0.905, hw: 0.945, yb: -0.120, hip: 0.555, yt: 0.710, topW: 0.79,
    sill: 0.021, crease: 0.008, crown: 0.017 },
  { z: 1.125, hw: 0.958, yb: -0.050, hip: 0.565, yt: 0.655, topW: 0.83,
    flare: 0.035, lipY: 0.72, crease: 0.008, crown: 0.022 },
  { z: 1.450, hw: 0.962, yb: 0.045, hip: 0.575, yt: 0.645, topW: 0.84,
    flare: 0.042, lipY: 0.73, crease: 0.008, crown: 0.022 },
  { z: 1.775, hw: 0.950, yb: -0.055, hip: 0.515, yt: 0.580, topW: 0.82,
    flare: 0.035, lipY: 0.73, crease: 0.007, crown: 0.020 },
  { z: 1.985, hw: 0.925, yb: -0.125, hip: 0.420, yt: 0.485, topW: 0.79, crown: 0.014 },
  { z: 2.145, hw: 0.860, yb: -0.145, hip: 0.285, yt: 0.350, topW: 0.72, crown: 0.009 },
  { z: 2.245, hw: 0.760, yb: -0.140, hip: 0.160, yt: 0.225, topW: 0.61, hard: true, crown: 0.004 },
];
export const CAP_ROLL = { nose: 0.055, tail: 0.065 };
export const wheelStyle = 'rally';
const F = profileFractions(keys);
const ROOF_COLOR = 0x20282f;

const GLASS_PANES = [
  { zStart: 0.865, zEnd: 0.435, beltFrac: F.tumble, topFrac: 1, steps: 12 },
  { zStart: 0.330, zEnd: -0.590, beltFrac: F.beltTuck, topFrac: F.topCorner, steps: 14 },
  { zStart: -0.705, zEnd: -1.490, beltFrac: F.beltTuck, topFrac: F.topCorner, steps: 12 },
  { zStart: -1.665, zEnd: -1.925, beltFrac: F.tumble, topFrac: 1, steps: 9 },
];
const HEADLAMP_PANES = [-1, 1].map(side => ({
  zStart: 2.185, zEnd: 1.965, beltFrac: F.beltTuck, topFrac: F.crownEdge, steps: 9, side,
}));
export const PANES = [...GLASS_PANES, ...HEADLAMP_PANES];
const SHUT_LINES = [
  { path: [[0.960, F.topCorner], [0.960, 1], [0.960, -F.topCorner]] },
  { path: [[1.905, F.topCorner], [1.905, 1], [1.905, -F.topCorner]] },
  { path: [[0.960, F.topCorner], [1.905, F.topCorner]], mirror: true },
  { path: [[0.710, F.sillLip], [0.710, F.shoulder], [-0.650, F.shoulder],
    [-0.650, F.sillLip], [0.710, F.sillLip]], mirror: true },
  { path: [[-1.610, F.tumble], [-1.985, F.tumble]], mirror: true },
  { path: [[-1.985, F.tumble], [-1.985, 1], [-1.985, -F.tumble]] },
];

function box(w, h, d, material, x, y, z) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  mesh.position.set(x, y, z);
  return mesh;
}
function faceOutboard(group) {
  group.traverse(o => {
    if (Math.abs(Math.abs(o.rotation.y) - Math.PI / 2) < 1e-6) o.rotation.y = -o.rotation.y;
  });
  return group;
}

// Slim horizontal lamps make the tail read wide rather than tall. All red
// pieces share the brake mesh so their brightness still follows braking.
function buildHatchTaillights() {
  const group = new THREE.Group();
  const lenses = [];
  for (const sx of [-1, 1]) {
    const housing = new THREE.Group();
    housing.position.set(sx * 0.535, 0.430, -2.040);
    housing.rotation.y = Math.PI;
    addOpening(housing, {
      w: 0.415, h: 0.115, depth: 0.025, wall: 0.007, lipT: 0.007,
      floorMat: makeTrim(), wallMat: makeTrim(), lipMat: makeTrim(),
    });
    group.add(housing);
    for (const dy of [-0.028, 0.028]) {
      const lens = new THREE.BoxGeometry(0.370, 0.023, 0.010);
      lens.translate(sx * 0.535, 0.430 + dy, -2.065);
      lenses.push(lens);
    }
    group.add(box(0.075, 0.021, 0.010, makeHeadlight(), sx * 0.405, 0.430, -2.066));
  }
  const high = new THREE.BoxGeometry(0.40, 0.018, 0.010);
  high.translate(0, 1.120, -1.805);
  lenses.push(high);
  const brakeMesh = new THREE.Mesh(mergeGeometries(lenses, false), makeTaillight());
  for (const geometry of lenses) geometry.dispose();
  brakeMesh.userData.noMerge = true;
  group.add(brakeMesh);
  return { group, brakeMesh };
}

export function decorate(body, ctx) {
  body.add(new THREE.Mesh(buildGreenhouseShell(keys, { panes: GLASS_PANES }), makeGlass()));
  const seals = buildWindowSeals(keys, { panes: GLASS_PANES, width: 0.012 });
  if (seals) body.add(new THREE.Mesh(seals, makeTrim()));
  body.add(buildApertureLamps(keys, F, { head: HEADLAMP_PANES, projectorZ: [2.115, 2.025] }).group);
  const shut = buildPanelSeams(keys, SHUT_LINES);
  if (shut) body.add(new THREE.Mesh(shut, makeShutline()));

  const roof = new THREE.Mesh(buildGreenhouseShell(keys, { panes: [{
    zStart: 0.385, zEnd: -1.615, beltFrac: F.topCorner, topFrac: 1,
    steps: 20, proud: 0.006,
  }] }), makePaint(ROOF_COLOR));
  roof.receiveShadow = true;
  body.add(roof);
  // A short roof lip meets the hatch, without a high freestanding wing.
  const spoiler = box(1.42, 0.042, 0.24, makePaint(ROOF_COLOR), 0, 1.132, -1.685);
  spoiler.rotation.x = -0.090;
  spoiler.castShadow = true;
  body.add(spoiler);

  body.add(buildGrille({
    z: 2.248, y: 0.040, w: 0.80, h: 0.165, depth: 0.026, bar: false,
    ductW: 0.13, ductH: 0.085, ductX: 0.555, ductY: 0.015,
  }));
  body.add(box(1.32, 0.030, 0.080, makeTrim(), 0, -0.106, 2.215));
  const tail = buildHatchTaillights();
  body.add(tail.group);
  body.add(box(1.44, 0.075, 0.055, makeTrim(), 0, -0.065, -2.035));
  body.add(buildBadgesAndPlate({
    frontPose: sampleSkin(keys, 2.175, 1), rearZ: -2.047, rearY: 0.565, plateY: 0.235,
  }));
  body.add(buildExhaust({ z: -2.075, y: -0.100, x: 0.58, count: 2, r: 0.038 }));

  body.add(buildMirrors({ z: 0.600, y: 0.540, x: 0.903, color: ROOF_COLOR, indicator: false }));
  const cowl = sampleSkin(keys, 0.880, 1).position;
  body.add(buildWipers({ z: 0.880, y: cowl.y + 0.005, x: 0.24, len: 0.42, tilt: 0.055, rake: 0.08 }));
  body.add(faceOutboard(buildDoorFurniture({
    x: 0.932, handleY: 0.505, handleZ: -0.430, handleW: 0.135, repeater: false, fuel: false,
  })));
  body.add(faceOutboard(buildDoorFurniture({
    handles: false, repeater: false, fuelX: 0.973, fuelY: 0.510,
    fuelZ: -1.48, fuelSide: -1, fuelR: 0.055, color: ctx.color,
  })));

  body.add(buildInterior({
    floorY: 0.015, dashZ: 0.79, dashH: 0.17, seatZ: -0.40, bulkheadZ: -1.48,
    seatX: 0.34, seatBackH: 0.60, halfWidth: 0.63,
    wheelR: 0.15, wheelZ: 0.52, wheelY: 0.54, driverX: -0.34,
    seats: 2, cage: true, harness: true,
  }));
  body.add(buildUnderbody({ y: -0.245, w: 1.20, len: 3.45 }));
  body.add(buildArchLiners({ zF: 1.45, zR: -1.45, x: 0.835, r: 0.413, width: 0.26, lip: false }));
  for (const z of [1.045, -1.855]) {
    for (const sx of [-1, 1]) body.add(box(0.215, 0.155, 0.018, makeTrim(), sx * 0.875, -0.135, z));
  }
  return { brakeLights: tail.brakeMesh };
}
