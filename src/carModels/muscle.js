import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import {
  buildGreenhouseShell, buildPanelSeams, buildWindowSeals, profileFractions,
} from './loftBuilder.js';
import {
  makeGlass, makeTrim, makeCarbon, makeShutline, makeSatin,
  makeHeadlight, makeTaillight,
} from './carMaterials.js';
import {
  addOpening, buildMirrors, buildGrille, buildWing, buildExhaust,
  buildBadgesAndPlate, buildUnderbody, buildArchLiners, buildInterior,
  buildDoorFurniture, buildWipers, buildAerial,
} from './parts.js';

// Classic notchback: a short, upright cabin behind a long flat hood, a real
// trunk shelf, a broad vertical grille and four round lamps. The tall painted
// roof and hard deck/cowl corners distinguish it from the low GT even without
// paint or trim. The 14 stations keep the existing hull triangle budget.
// Axle-centred: hubs y 0, z +/-1.45; tyre outer face x 1.00. The lower flank
// stays inboard of the tyre, with the arch flare crest above its swept volume.
export const keys = [
  // z,      hw,     yb,     hip,   yt,    topW  + surface features
  { z: -2.30, hw: 0.945, yb: -0.100, hip: 0.485, yt: 0.640, topW: 0.86, hard: true },
  { z: -2.04, hw: 0.985, yb: -0.065, hip: 0.515, yt: 0.655, topW: 0.89,
    crease: 0.012, creaseY: 0.83 },
  { z: -1.74, hw: 0.985, yb: -0.030, hip: 0.520, yt: 0.655, topW: 0.90, hard: true,
    flare: 0.040, lipY: 0.72, crease: 0.012, creaseY: 0.84, sill: 0.010 },
  { z: -1.45, hw: 0.980, yb:  0.060, hip: 0.520, yt: 0.820, topW: 0.84,
    flare: 0.035, lipY: 0.78, crease: 0.010, creaseY: 0.86 },  // rear axle / backlight
  { z: -1.05, hw: 0.988, yb: -0.100, hip: 0.515, yt: 1.105, topW: 0.76, hard: true,
    sill: 0.024, crease: 0.012, creaseY: 0.82, tuck: 0.29 },   // C-pillar top
  { z: -0.35, hw: 0.980, yb: -0.185, hip: 0.505, yt: 1.125, topW: 0.75, hard: true,
    sill: 0.030, crease: 0.012, creaseY: 0.83, tuck: 0.30 },   // upright windshield header
  { z:  0.00, hw: 0.983, yb: -0.188, hip: 0.500, yt: 0.675, topW: 0.88, hard: true,
    sill: 0.030, crease: 0.012, creaseY: 0.83, tuck: 0.29 },   // rear-set cowl
  { z:  0.45, hw: 0.985, yb: -0.160, hip: 0.500, yt: 0.650, topW: 0.89,
    sill: 0.025, crease: 0.012, creaseY: 0.83 },
  { z:  1.10, hw: 0.985, yb: -0.060, hip: 0.505, yt: 0.640, topW: 0.90,
    flare: 0.040, lipY: 0.72, sill: 0.010, crease: 0.012, creaseY: 0.84 },
  { z:  1.45, hw: 0.980, yb:  0.060, hip: 0.510, yt: 0.635, topW: 0.90,
    flare: 0.035, lipY: 0.78, crease: 0.010, creaseY: 0.86 },  // front axle
  { z:  1.80, hw: 0.985, yb: -0.050, hip: 0.500, yt: 0.630, topW: 0.90,
    flare: 0.035, lipY: 0.73, crease: 0.012, creaseY: 0.84 },
  { z:  2.12, hw: 0.990, yb: -0.110, hip: 0.490, yt: 0.620, topW: 0.90,
    hard: true, crease: 0.010, creaseY: 0.84 },
  { z:  2.24, hw: 0.990, yb: -0.125, hip: 0.480, yt: 0.605, topW: 0.89 },
  { z:  2.32, hw: 0.975, yb: -0.135, hip: 0.470, yt: 0.585, topW: 0.87, hard: true },
];

export const wheelStyle = 'muscle';
const F = profileFractions(keys);

// Glazing ends at the roof rails: the short roof remains entirely painted.
// Each pane descends along z so its shell faces outward.
const PANES = [
  { zStart: -0.015, zEnd: -0.31, beltFrac: F.tumble, topFrac: 1.0, steps: 8 },
  { zStart: -0.41, zEnd: -0.78, beltFrac: F.beltTuck, topFrac: F.topCorner, steps: 8 },
  { zStart: -0.87, zEnd: -1.09, beltFrac: F.beltTuck, topFrac: F.topCorner, steps: 6 },
  { zStart: -1.18, zEnd: -1.66, beltFrac: F.tumble, topFrac: 1.0, steps: 10 },
];

const SHUT_LINES = [
  { path: [[0.10, F.topCorner], [0.10, 1.00], [0.10, -F.topCorner]] },
  { path: [[2.07, F.topCorner], [2.07, 1.00], [2.07, -F.topCorner]] },
  { path: [[0.10, F.topCorner], [2.07, F.topCorner]], mirror: true },
  {
    path: [[0.04, F.sillLip], [0.04, F.shoulder], [-1.00, F.shoulder],
      [-1.00, F.sillLip], [0.04, F.sillLip]],
    mirror: true,
  },
  { path: [[-1.78, F.topCorner], [-1.78, 1.00], [-1.78, -F.topCorner]] },
  { path: [[-2.20, F.topCorner], [-2.20, 1.00], [-2.20, -F.topCorner]] },
  { path: [[-1.78, F.topCorner], [-2.20, F.topCorner]], mirror: true },
];

function faceOutboard(group) {
  group.traverse((o) => {
    if (Math.abs(Math.abs(o.rotation.y) - Math.PI / 2) < 1e-6) o.rotation.y = -o.rotation.y;
  });
  return group;
}

function box(w, h, d, material, x, y, z) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  mesh.position.set(x, y, z);
  return mesh;
}

// Four full-size circular lamps, set into one flat grille. Shared materials
// let mergeByMaterial batch them with the other trim and lighting.
function buildRoundHeadlights() {
  const group = new THREE.Group();
  for (const x of [-0.74, -0.48, 0.48, 0.74]) {
    const recess = new THREE.CylinderGeometry(0.111, 0.111, 0.024, 16);
    recess.rotateX(Math.PI / 2);
    const housing = new THREE.Mesh(recess, makeTrim());
    housing.position.set(x, 0.355, 2.349);
    group.add(housing);
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.094, 0.009, 4, 16), makeSatin());
    rim.position.set(x, 0.355, 2.370);
    group.add(rim);
    const face = new THREE.Mesh(new THREE.CircleGeometry(0.082, 16), makeHeadlight());
    face.position.set(x, 0.355, 2.372);
    group.add(face);
  }
  return group;
}

// Three tall red lenses per side, separated by painted bodywork at the centre.
// Keep one unique brake material and mesh for car.js's per-frame brake pulse.
function buildMuscleTaillights() {
  const group = new THREE.Group();
  const lenses = [];
  for (const sx of [-1, 1]) {
    const cluster = new THREE.Group();
    cluster.position.set(sx * 0.61, 0.350, -2.304);
    cluster.rotation.y = Math.PI;
    addOpening(cluster, {
      w: 0.43, h: 0.27, depth: 0.034, wall: 0.010, lipT: 0.009,
      floorMat: makeTrim(), wallMat: makeTrim(), lipMat: makeSatin(),
    });
    group.add(cluster);
    for (const dx of [-0.13, 0, 0.13]) {
      const lens = new THREE.BoxGeometry(0.080, 0.225, 0.015);
      lens.translate(sx * 0.61 + dx, 0.350, -2.336);
      lenses.push(lens);
    }
  }
  const brakeMesh = new THREE.Mesh(mergeGeometries(lenses, false), makeTaillight());
  for (const geometry of lenses) geometry.dispose();
  brakeMesh.userData.noMerge = true;
  group.add(brakeMesh);
  return { group, brakeMesh };
}

export function decorate(body, ctx) {
  body.add(new THREE.Mesh(buildGreenhouseShell(keys, { panes: PANES }), makeGlass()));
  const seals = buildWindowSeals(keys, { panes: PANES });
  if (seals) {
    const mesh = new THREE.Mesh(seals, makeTrim());
    mesh.receiveShadow = true;
    body.add(mesh);
  }
  const shut = buildPanelSeams(keys, SHUT_LINES);
  if (shut) {
    const mesh = new THREE.Mesh(shut, makeShutline());
    mesh.receiveShadow = true;
    body.add(mesh);
  }

  // The intake rises out of the hood at the rear and widens toward its front
  // opening. A bevel keeps the raised cap from reading as a box on the bonnet.
  const scoopProfile = new THREE.Shape();
  scoopProfile.moveTo(-0.50, 0);
  scoopProfile.lineTo(0.12, 0.145);
  scoopProfile.lineTo(0.50, 0.145);
  scoopProfile.lineTo(0.50, 0);
  scoopProfile.closePath();
  const scoopGeometry = new THREE.ExtrudeGeometry(scoopProfile, {
    depth: 0.62, steps: 1, bevelEnabled: true,
    bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 1,
  });
  scoopGeometry.translate(0, 0, -0.31);
  scoopGeometry.rotateY(-Math.PI / 2);
  const scoopVertices = scoopGeometry.attributes.position;
  for (let i = 0; i < scoopVertices.count; i++) {
    const taper = 0.72 + 0.28 * THREE.MathUtils.clamp(scoopVertices.getZ(i) + 0.5, 0, 1);
    scoopVertices.setX(i, scoopVertices.getX(i) * taper);
  }
  scoopGeometry.computeVertexNormals();
  const scoop = new THREE.Mesh(scoopGeometry, makeTrim());
  scoop.position.set(0, 0.635, 1.04);
  scoop.castShadow = true;
  body.add(scoop);
  body.add(box(0.50, 0.09, 0.012, makeCarbon(), 0, 0.705, 1.567));

  body.add(buildGrille({
    z: 2.322, y: 0.355, w: 1.78, h: 0.265, depth: 0.029, bar: false, ducts: false,
  }));
  body.add(buildRoundHeadlights());
  body.add(box(0.68, 0.015, 0.018, makeSatin(), 0, 0.355, 2.360));
  // Plain bumpers and an air dam give the blunt nose a different outline from
  // the GT's splitter, canards and corner intakes.
  body.add(box(1.91, 0.065, 0.075, makeTrim(), 0, 0.100, 2.337));
  body.add(box(1.88, 0.022, 0.010, makeSatin(), 0, 0.114, 2.380));
  body.add(box(1.74, 0.110, 0.090, makeTrim(), 0, -0.115, 2.285));

  const tail = buildMuscleTaillights();
  body.add(tail.group);
  body.add(box(1.82, 0.060, 0.075, makeTrim(), 0, 0.010, -2.307));
  body.add(box(1.78, 0.021, 0.010, makeSatin(), 0, 0.025, -2.350));
  body.add(buildBadgesAndPlate({
    frontZ: 2.378, frontY: 0.355, rearZ: -2.313, rearY: 0.390, plateY: 0.115,
  }));
  body.add(buildExhaust({ z: -2.34, y: -0.060, x: 0.63, count: 2, r: 0.060 }));
  // Seat the pitched lip's leading edge into the flat trunk pressing.
  body.add(buildWing({ z: -2.23, deckY: 0.625, span: 1.63, style: 'ducktail' }));

  body.add(buildMirrors({
    z: -0.12, y: 0.570, x: 0.937, color: ctx.color, indicator: false,
  }));
  body.add(buildWipers({ z: 0.030, y: 0.677, x: 0.24, len: 0.49, tilt: 0.025, rake: 0.04 }));
  body.add(buildAerial({ z: -1.97, y: 0.655, style: 'whip' }));
  body.add(faceOutboard(buildDoorFurniture({
    x: 0.981, handleY: 0.43, handleZ: -0.74, handleW: 0.19,
    repeater: false, fuel: false,
  })));
  body.add(faceOutboard(buildDoorFurniture({
    handles: false, repeater: false,
    fuelX: 0.985, fuelY: 0.43, fuelZ: -1.95, fuelSide: -1, fuelR: 0.075,
    color: ctx.color,
  })));

  // Seats, dash and steering move with the rear-set cabin. The cage remains
  // contained by the upright glasshouse, while the dash sits below the cowl.
  body.add(buildInterior({
    floorY: 0.04, dashZ: -0.04, dashH: 0.17, seatZ: -0.86, bulkheadZ: -1.40,
    seatX: 0.35, seatBackH: 0.61, halfWidth: 0.63,
    wheelR: 0.16, wheelZ: -0.27, wheelY: 0.49, driverX: -0.34,
    seats: 2, cage: true, harness: true,
  }));
  body.add(buildUnderbody({ y: -0.245, w: 1.24, len: 3.7 }));
  body.add(buildArchLiners({ zF: 1.45, zR: -1.45, x: 0.850, r: 0.41, width: 0.27 }));
  return { brakeLights: tail.brakeMesh };
}
