import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import {
  buildGreenhouseShell, buildPanelSeams, buildWindowSeals, profileFractions, sampleSkin,
} from './loftBuilder.js';
import {
  makeGlass, makeTrim, makePaint, makeShutline, makeHeadlight, makeTaillight,
} from './carMaterials.js';
import {
  addOpening, buildMirrors, buildGrille, buildExhaust,
  buildBadgesAndPlate, buildUnderbody, buildArchLiners, buildInterior,
  buildDoorFurniture, buildWipers, buildAerial,
} from './parts.js';
import { buildApertureLamps } from './apertureLamps.js';

// Compact rally hatch: a short bonnet, tall forward cabin, full-length roof
// and a steep rear hatch. The rear roof ends above the rear axle; there is no
// separate boot deck. All dimensions are axle-centred, as in the shared cars:
// hubs at y 0, z +/-1.45, tyre radius .36 and outer face at x 1.02.
//
// The short bonnet falls continuously into a low, rolled bumper (the cap at
// z 2.25 is 30 cm tall) with the lamps cut into the fender corners above it,
// rather than ending in the 62 cm vertical wall with the lamps bolted on that
// made the car read as a box from the front quarter.
export const keys = [
  { z: -1.97, hw: 0.885, yb: -0.115, hip: 0.550, yt: 0.750, topW: 0.750, hard: true },
  { z: -1.82, hw: 0.945, yb: -0.065, hip: 0.625, yt: 1.080, topW: 0.735,
    flare: 0.025, lipY: 0.69, crease: 0.008, creaseY: 0.83 },
  { z: -1.60, hw: 0.950, yb: 0.010, hip: 0.640, yt: 1.350, topW: 0.715, hard: true,
    flare: 0.032, lipY: 0.68, crease: 0.009, creaseY: 0.84, crown: 0.004 },
  { z: -1.45, hw: 0.950, yb: 0.045, hip: 0.645, yt: 1.380, topW: 0.715,
    flare: 0.035, lipY: 0.68, crease: 0.009, creaseY: 0.84, crown: 0.010 },
  { z: -1.10, hw: 0.950, yb: -0.090, hip: 0.645, yt: 1.405, topW: 0.710,
    flare: 0.025, lipY: 0.70, sill: 0.020, crease: 0.009, creaseY: 0.84, crown: 0.018 },
  { z: -0.25, hw: 0.940, yb: -0.190, hip: 0.640, yt: 1.420, topW: 0.710,
    sill: 0.032, crease: 0.009, creaseY: 0.84, tuck: 0.30, crown: 0.020 },
  { z: 0.60, hw: 0.940, yb: -0.190, hip: 0.630, yt: 1.375, topW: 0.710, hard: true,
    sill: 0.032, crease: 0.009, creaseY: 0.84, tuck: 0.30, crown: 0.016 },
  { z: 1.00, hw: 0.945, yb: -0.105, hip: 0.620, yt: 0.780, topW: 0.805, hard: true,
    sill: 0.020, crease: 0.009, creaseY: 0.84, crown: 0.010 },
  { z: 1.13, hw: 0.950, yb: -0.050, hip: 0.615, yt: 0.730, topW: 0.815,
    flare: 0.026, lipY: 0.71, crease: 0.009, creaseY: 0.84, crown: 0.010 },
  { z: 1.45, hw: 0.945, yb: 0.045, hip: 0.610, yt: 0.680, topW: 0.825,
    flare: 0.035, lipY: 0.70, crease: 0.009, creaseY: 0.85, crown: 0.012 },
  { z: 1.77, hw: 0.945, yb: -0.055, hip: 0.555, yt: 0.605, topW: 0.825,
    flare: 0.027, lipY: 0.73, crease: 0.008, creaseY: 0.86, crown: 0.012 },
  { z: 1.98, hw: 0.925, yb: -0.120, hip: 0.470, yt: 0.525, topW: 0.800,
    crease: 0.006, creaseY: 0.86, crown: 0.008 },
  { z: 2.12, hw: 0.880, yb: -0.145, hip: 0.345, yt: 0.400, topW: 0.740, crown: 0.005 },
  { z: 2.20, hw: 0.820, yb: -0.145, hip: 0.235, yt: 0.280, topW: 0.660, crown: 0.004 },
  { z: 2.25, hw: 0.740, yb: -0.140, hip: 0.120, yt: 0.165, topW: 0.580, hard: true,
    crown: 0.003 },                                                            // bumper face
];

// Bumper edge radii — see gtCoupe.js. The upright tailgate carries the
// larger roll of the two.
export const CAP_ROLL = { nose: 0.050, tail: 0.060 };

export const wheelStyle = 'rally';
const F = profileFractions(keys);

// A long rectangular greenhouse is the main silhouette cue. A wide painted
// B-pillar divides the front and rear side panes. The backlight spans the
// steep hatch itself, below the white roof and its roof-edge spoiler.
const GLASS_PANES = [
  { zStart: 0.985, zEnd: 0.650, beltFrac: F.tumble, topFrac: 1.0, steps: 8 },
  { zStart: 0.550, zEnd: -0.300, beltFrac: F.beltTuck, topFrac: F.topCorner, steps: 12 },
  { zStart: -0.400, zEnd: -1.505, beltFrac: F.beltTuck, topFrac: F.topCorner, steps: 15 },
  { zStart: -1.650, zEnd: -1.910, beltFrac: F.tumble, topFrac: 1.0, steps: 9 },
];
// Headlamp apertures wrapped over each fender corner of the falling bonnet,
// from the character line up to the top corner — a taller unit than the
// GT's slit, as a hatchback's are. They stop short of the bumper roll.
const HEADLAMP_PANES = [
  { zStart: 2.19, zEnd: 1.99, beltFrac: F.crease, topFrac: F.topCorner, steps: 7, side: 1 },
  { zStart: 2.19, zEnd: 1.99, beltFrac: F.crease, topFrac: F.topCorner, steps: 7, side: -1 },
];
export const PANES = [...GLASS_PANES, ...HEADLAMP_PANES];

const SHUT_LINES = [
  // Short bonnet, confined to the area ahead of the forward-set windscreen.
  { path: [[1.045, F.topCorner], [1.045, 1], [1.045, -F.topCorner]] },
  { path: [[1.945, F.topCorner], [1.945, 1], [1.945, -F.topCorner]] },
  { path: [[1.045, F.topCorner], [1.945, F.topCorner]], mirror: true },
  {
    path: [[0.76, F.sillLip], [0.76, F.shoulder], [-0.35, F.shoulder],
      [-0.35, F.sillLip], [0.76, F.sillLip]],
    mirror: true,
  },
  {
    path: [[-0.35, F.sillLip], [-0.35, F.shoulder], [-1.19, F.shoulder],
      [-1.19, F.sillLip], [-0.35, F.sillLip]],
    mirror: true,
  },
  // Hatch perimeter follows the sloping rear panel, with no trunk seam.
  { path: [[-1.62, F.tumble], [-1.94, F.tumble]], mirror: true },
  { path: [[-1.94, F.tumble], [-1.94, 1], [-1.94, -F.tumble]] },
];

function box(w, h, d, material, x, y, z) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  mesh.position.set(x, y, z);
  return mesh;
}

function faceOutboard(group) {
  group.traverse((o) => {
    if (Math.abs(Math.abs(o.rotation.y) - Math.PI / 2) < 1e-6) o.rotation.y = -o.rotation.y;
  });
  return group;
}

// Tall narrow lamps, one at each corner of the upright rear. All red lenses
// share one per-car material/mesh for the physics-driven brake-light pulse.
function buildHatchTaillights() {
  const group = new THREE.Group();
  const lenses = [];
  for (const sx of [-1, 1]) {
    const housing = new THREE.Group();
    housing.position.set(sx * 0.735, 0.395, -1.974);
    housing.rotation.y = Math.PI;
    addOpening(housing, {
      w: 0.145, h: 0.385, depth: 0.026, wall: 0.008, lipT: 0.007,
      floorMat: makeTrim(), wallMat: makeTrim(), lipMat: makeTrim(),
    });
    group.add(housing);
    for (const dy of [-0.105, 0.105]) {
      const lens = new THREE.BoxGeometry(0.111, 0.145, 0.010);
      lens.translate(sx * 0.735, 0.395 + dy, -1.999);
      lenses.push(lens);
    }
    group.add(box(0.102, 0.033, 0.010, makeHeadlight(), sx * 0.735, 0.395, -2.000));
  }
  // High stop lamp lives in the rear edge of the roof spoiler.
  const high = new THREE.BoxGeometry(0.44, 0.022, 0.012);
  high.translate(0, 1.372, -1.860);
  lenses.push(high);
  const brakeMesh = new THREE.Mesh(mergeGeometries(lenses, false), makeTaillight());
  for (const geometry of lenses) geometry.dispose();
  brakeMesh.userData.noMerge = true;
  group.add(brakeMesh);
  return { group, brakeMesh };
}

export function decorate(body, ctx) {
  body.add(new THREE.Mesh(buildGreenhouseShell(keys, { panes: GLASS_PANES }), makeGlass()));
  const seals = buildWindowSeals(keys, { panes: GLASS_PANES });
  if (seals) body.add(new THREE.Mesh(seals, makeTrim()));
  body.add(buildApertureLamps(keys, F, { head: HEADLAMP_PANES, projectorZ: [2.12, 2.04] }).group);
  const shut = buildPanelSeams(keys, SHUT_LINES);
  if (shut) body.add(new THREE.Mesh(shut, makeShutline()));

  // A solid white roof exaggerates the long cabin in both the garage and
  // chase view. This is a surface-following skin, so it cannot float above it.
  const roof = new THREE.Mesh(buildGreenhouseShell(keys, { panes: [{
    zStart: 0.595, zEnd: -1.605, beltFrac: F.topCorner, topFrac: 1,
    steps: 20, proud: 0.006,
  }] }), makePaint(0xf1eee5));
  roof.receiveShadow = true;
  body.add(roof);

  // Spoiler attached directly to the rear roof edge, without GT wing posts.
  const spoiler = box(1.56, 0.055, 0.32, makeTrim(), 0, 1.383, -1.705);
  spoiler.rotation.x = -0.045;
  spoiler.castShadow = true;
  body.add(spoiler);
  for (const sx of [-1, 1]) {
    body.add(box(0.027, 0.090, 0.28, makeTrim(), sx * 0.765, 1.378, -1.705));
  }

  // The bumper face is the z 2.25 cap: 30 cm tall (y -0.14..0.165) before
  // its 50 mm roll, so the flat is y -0.09..0.115 and ~0.69 wide at the
  // intake. A wide shallow rally intake with brake ducts either side; the
  // short nose has neither the GT's canards nor the muscle car's scoop.
  body.add(buildGrille({
    z: 2.252, y: 0.015, w: 0.78, h: 0.115, depth: 0.026,
    bar: false, ducts: true, ductW: 0.15, ductH: 0.085, ductX: 0.565, ductY: 0.005,
  }));
  // Chin bar across the bottom of the cap, emerging from the bumper roll.
  body.add(box(1.40, 0.045, 0.095, makeTrim(), 0, -0.100, 2.215));
  const tail = buildHatchTaillights();
  body.add(tail.group);
  body.add(box(1.58, 0.095, 0.070, makeTrim(), 0, -0.045, -1.976));
  body.add(buildBadgesAndPlate({
    frontPose: sampleSkin(keys, 2.16, 1.0), rearZ: -1.985, rearY: 0.550, plateY: 0.265,
  }));
  body.add(buildExhaust({ z: -2.014, y: -0.095, x: 0.58, count: 1, r: 0.045 }));

  body.add(buildMirrors({ z: 0.740, y: 0.605, x: 0.909, color: 0xf1eee5, indicator: false }));
  // Both sit on crowned panels (cowl 10 mm, roof 18 mm).
  body.add(buildWipers({ z: 0.995, y: 0.803, x: 0.24, len: 0.44, tilt: 0.035, rake: 0.07 }));
  body.add(buildAerial({ z: -1.03, y: 1.428, style: 'fin', color: 0xf1eee5, len: 0.15, height: 0.065 }));
  // Rear wiper rests across the lower edge of the large hatch glass.
  body.add(box(0.44, 0.018, 0.020, makeTrim(), 0.13, 0.926, -1.904));
  body.add(faceOutboard(buildDoorFurniture({
    x: 0.928, handleY: 0.555, handleZ: -0.135, handleW: 0.135,
    repeater: false, fuel: false,
  })));
  body.add(faceOutboard(buildDoorFurniture({
    x: 0.942, handleY: 0.568, handleZ: -1.015, handleW: 0.125,
    repeater: false, fuel: false,
  })));
  body.add(faceOutboard(buildDoorFurniture({
    handles: false, repeater: false, fuelX: 0.949, fuelY: 0.590,
    fuelZ: -1.60, fuelSide: -1, fuelR: 0.058, color: ctx.color,
  })));

  // Long, tall cabin with two bucket seats and a visible rally cage. The
  // interior stays below the roof and above the beltline where glass reveals it.
  body.add(buildInterior({
    floorY: 0.12, dashZ: 0.89, dashH: 0.18, seatZ: -0.40, bulkheadZ: -1.52,
    seatX: 0.34, seatBackH: 0.72, halfWidth: 0.64,
    wheelR: 0.15, wheelZ: 0.60, wheelY: 0.57, driverX: -0.34,
    seats: 2, cage: true, harness: true,
  }));
  body.add(buildUnderbody({ y: -0.245, w: 1.20, len: 3.45 }));
  body.add(buildArchLiners({ zF: 1.45, zR: -1.45, x: 0.825, r: 0.413, width: 0.26, lip: false }));

  // Short mud flaps sit behind the wheels and clear the .36-radius tyre.
  for (const z of [1.045, -1.855]) {
    for (const sx of [-1, 1]) {
      body.add(box(0.235, 0.205, 0.018, makeTrim(), sx * 0.875, -0.16, z));
    }
  }
  return { brakeLights: tail.brakeMesh };
}
