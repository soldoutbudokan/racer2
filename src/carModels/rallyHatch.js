import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import {
  buildLoftHull, buildGreenhouseShell, buildPanelSeams, buildWindowSeals, profileFractions,
} from './loftBuilder.js';
import {
  makeTrim, makePaint, makeShutline, makeHeadlight, makeTaillight, makeSatin, makeCaliper,
} from './carMaterials.js';
import {
  addOpening, buildMirrors, buildGrille, buildBadgesAndPlate,
  buildUnderbody, buildArchLiners, buildDoorFurniture, buildWipers,
} from './parts.js';

// Rally pickup, kept under the legacy `hatch` ID for saved selections. This is
// a new body: square hood, separate upright single cab and an OPEN cargo box.
// The low body loft ends at the beltline; no roof joins the cab to the tail.
// Shared chassis contract: hub y=0, axles z=+/-1.45, tyre radius 0.36.
export const keys = [
  { z: -2.24, hw: 0.87, yb: -0.12, hip: 0.51, yt: 0.64, topW: 0.79, hard: true, crown: 0.004 },
  { z: -2.05, hw: 0.96, yb: -0.12, hip: 0.55, yt: 0.66, topW: 0.84, crown: 0.004, crease: 0.009 },
  { z: -1.78, hw: 0.975, yb: -0.07, hip: 0.55, yt: 0.66, topW: 0.85, flare: 0.055, lipY: 0.65, crown: 0.004 },
  { z: -1.45, hw: 0.975, yb: 0.035, hip: 0.55, yt: 0.66, topW: 0.85, flare: 0.065, lipY: 0.66, crown: 0.004 },
  { z: -1.12, hw: 0.975, yb: -0.09, hip: 0.55, yt: 0.66, topW: 0.85, flare: 0.055, lipY: 0.65, crown: 0.004 },
  { z: -0.76, hw: 0.94, yb: -0.17, hip: 0.53, yt: 0.65, topW: 0.84, sill: 0.025, crease: 0.012, crown: 0.004, hard: true },
  { z: 0.60, hw: 0.94, yb: -0.17, hip: 0.53, yt: 0.65, topW: 0.84, sill: 0.025, crease: 0.012, crown: 0.004 },
  { z: 1.12, hw: 0.97, yb: -0.09, hip: 0.53, yt: 0.65, topW: 0.86, flare: 0.055, lipY: 0.65, crown: 0.013 },
  { z: 1.45, hw: 0.975, yb: 0.035, hip: 0.53, yt: 0.65, topW: 0.86, flare: 0.065, lipY: 0.66, crown: 0.016 },
  { z: 1.78, hw: 0.975, yb: -0.07, hip: 0.53, yt: 0.64, topW: 0.86, flare: 0.055, lipY: 0.65, crown: 0.014 },
  { z: 2.08, hw: 0.95, yb: -0.12, hip: 0.52, yt: 0.62, topW: 0.85, crown: 0.010 },
  { z: 2.24, hw: 0.89, yb: -0.12, hip: 0.49, yt: 0.60, topW: 0.80, crown: 0.006, hard: true },
];
export const CAP_ROLL = { nose: 0.055, tail: 0.045 };
export const wheelStyle = 'rally';
const F = profileFractions(keys);
const BED = [{ zStart: -0.77, zEnd: -2.08, beltFrac: F.topCorner, topFrac: 1, steps: 22 }];
export const PANES = BED;

// A second, much smaller loft forms only the cab. The almost vertical rear
// wall is deliberate: it meets the empty cargo bed, never a sloping backlight.
const CAB = [
  { z: -0.67, hw: 0.84, yb: 0.56, hip: 0.67, yt: 1.18, topW: 0.71, crown: 0.010, hard: true },
  { z: -0.56, hw: 0.865, yb: 0.56, hip: 0.67, yt: 1.24, topW: 0.73, crown: 0.012, hard: true },
  { z: 0.29, hw: 0.865, yb: 0.56, hip: 0.67, yt: 1.24, topW: 0.73, crown: 0.012 },
  { z: 0.41, hw: 0.865, yb: 0.56, hip: 0.67, yt: 1.205, topW: 0.74, crown: 0.010, hard: true },
  { z: 0.89, hw: 0.87, yb: 0.56, hip: 0.65, yt: 0.69, topW: 0.82, crown: 0.008, hard: true },
];
const C = profileFractions(CAB);
const CAB_GLASS = [
  { zStart: 0.845, zEnd: 0.455, beltFrac: C.tumble, topFrac: 1, steps: 14 },
  { zStart: 0.325, zEnd: -0.505, beltFrac: C.beltTuck, topFrac: C.topCorner, steps: 18 },
];
let glass, bedMaterial, skidMaterial, amber;
function cabinGlass() {
  return glass ||= new THREE.MeshPhysicalMaterial({ color: 0x10212d, metalness: 0.12,
    roughness: 0.15, clearcoat: 1, clearcoatRoughness: 0.12, envMapIntensity: 0.65,
    side: THREE.DoubleSide });
}
function bedLiner() {
  return bedMaterial ||= new THREE.MeshStandardMaterial({ color: 0x101419,
    roughness: 0.94, metalness: 0.03, envMapIntensity: 0.20 });
}
function skidPlate() {
  return skidMaterial ||= new THREE.MeshStandardMaterial({ color: 0x3d464c,
    roughness: 0.62, metalness: 0.55, envMapIntensity: 0.45 });
}
function amberLamp() {
  return amber ||= new THREE.MeshStandardMaterial({ color: 0xd18d29,
    emissive: 0xef9d23, emissiveIntensity: 0.35, roughness: 0.4 });
}
function box(w, h, d, material, x = 0, y = 0, z = 0) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  mesh.position.set(x, y, z); mesh.castShadow = true; mesh.receiveShadow = true;
  return mesh;
}
function panel(points, material) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(points.flat(), 3));
  const indices = [];
  for (let i = 1; i < points.length - 1; i++) indices.push(0, i, i + 1);
  geometry.setIndex(indices); geometry.computeVertexNormals();
  return new THREE.Mesh(geometry, material);
}
function faceOutboard(group) {
  group.traverse(o => {
    if (Math.abs(Math.abs(o.rotation.y) - Math.PI / 2) < 1e-6) o.rotation.y = -o.rotation.y;
  });
  return group;
}

function buildCab(color) {
  const group = new THREE.Group();
  const shell = new THREE.Mesh(buildLoftHull(CAB, {
    panes: CAB_GLASS, ringsPerSegment: 12, capRoll: { nose: 0.015, tail: 0.025 },
  }), makePaint(color));
  shell.castShadow = true; shell.receiveShadow = true;
  group.add(shell);
  group.add(new THREE.Mesh(buildGreenhouseShell(CAB, { panes: CAB_GLASS }), cabinGlass()));
  const seals = buildWindowSeals(CAB, { panes: CAB_GLASS, width: 0.013, proud: 0.005 });
  if (seals) group.add(new THREE.Mesh(seals, makeTrim()));
  // A small upright rear window, with a thick painted surround, looks out
  // over the cargo bed. Opaque smoked glazing keeps the cab visually calm.
  group.add(box(1.20, 0.36, 0.018, makeTrim(), 0, 0.94, -0.677));
  group.add(box(1.14, 0.30, 0.008, cabinGlass(), 0, 0.94, -0.690));
  group.add(box(0.018, 0.30, 0.009, makeTrim(), 0.22, 0.94, -0.696));
  return group;
}

function buildCargoBed() {
  const group = new THREE.Group();
  const liner = bedLiner();
  // All five faces are below the painted bed rails. The recessed floor and
  // raised wheel tubs remain visible from behind and in the garage view.
  group.add(box(1.55, 0.035, 1.29, liner, 0, 0.145, -1.425));
  group.add(box(0.035, 0.48, 1.29, liner, -0.772, 0.39, -1.425));
  group.add(box(0.035, 0.48, 1.29, liner, 0.772, 0.39, -1.425));
  group.add(box(1.55, 0.48, 0.035, liner, 0, 0.39, -0.79));
  group.add(box(1.55, 0.48, 0.035, liner, 0, 0.39, -2.065));
  for (let i = -3; i <= 3; i++) {
    group.add(box(0.026, 0.015, 1.18, makeTrim(), i * 0.18, 0.17, -1.425));
  }
  for (const side of [-1, 1]) {
    // Raised wheel tubs are smaller than the bed width, so there is a
    // clear central load floor instead of a solid black tonneau cover.
    const tub = box(0.27, 0.27, 0.73, liner, side * 0.64, 0.29, -1.45);
    group.add(tub);
    group.add(box(0.075, 0.025, 1.28, makeTrim(), side * 0.805, 0.663, -1.425));
  }
  return group;
}

function buildPickupLamps() {
  const group = new THREE.Group();
  for (const side of [-1, 1]) {
    const housing = new THREE.Group();
    housing.position.set(side * 0.615, 0.415, 2.243);
    addOpening(housing, { w: 0.35, h: 0.17, depth: 0.025, wall: 0.010, lipT: 0.009,
      floorMat: makeTrim(), wallMat: makeTrim(), lipMat: makeTrim() });
    // A small round projector in a black rectangular pod, framed by a
    // narrow white eyebrow and an amber corner. No reflective lens panel.
    const bezel = new THREE.Mesh(new THREE.TorusGeometry(0.048, 0.008, 6, 20), makeSatin());
    bezel.position.set(-side * 0.060, -0.012, 0.027); housing.add(bezel);
    const lamp = new THREE.Mesh(new THREE.CircleGeometry(0.034, 20), makeHeadlight());
    lamp.position.set(-side * 0.060, -0.012, 0.027); housing.add(lamp);
    housing.add(box(0.27, 0.013, 0.008, makeHeadlight(), 0, 0.055, 0.028));
    housing.add(box(0.036, 0.07, 0.009, amberLamp(), side * 0.125, -0.012, 0.028));
    group.add(housing);
  }
  const red = [];
  for (const side of [-1, 1]) {
    group.add(box(0.13, 0.31, 0.035, makeTrim(), side * 0.725, 0.425, -2.245));
    for (const dy of [-0.09, 0.07]) {
      const geometry = new THREE.BoxGeometry(0.083, 0.095, 0.014);
      geometry.translate(side * 0.725, 0.425 + dy, -2.27); red.push(geometry);
    }
    group.add(box(0.083, 0.028, 0.014, makeHeadlight(), side * 0.725, 0.425, -2.27));
  }
  const high = new THREE.BoxGeometry(0.36, 0.022, 0.014);
  high.translate(0, 1.155, -0.690); red.push(high);
  const brakeMesh = new THREE.Mesh(mergeGeometries(red, false), makeTaillight());
  red.forEach(geometry => geometry.dispose());
  brakeMesh.userData.noMerge = true;
  group.add(brakeMesh);
  return { group, brakeMesh };
}

export function decorate(body, ctx) {
  body.add(buildCab(ctx.color), buildCargoBed());
  const lamps = buildPickupLamps();
  body.add(lamps.group);
  const seams = buildPanelSeams(keys, [
    { path: [[0.95, F.topCorner], [0.95, 1], [0.95, -F.topCorner]] },
    { path: [[0.95, F.topCorner], [2.02, F.topCorner]], mirror: true },
    { path: [[0.76, F.sillLip], [0.76, F.shoulder], [-0.66, F.shoulder],
      [-0.66, F.sillLip], [0.76, F.sillLip]], mirror: true },
    { path: [[-0.745, F.sillLip], [-0.745, F.topCorner]], mirror: true },
  ]);
  if (seams) body.add(new THREE.Mesh(seams, makeShutline()));

  body.add(buildGrille({ z: 2.245, y: 0.405, w: 0.68, h: 0.18, depth: 0.026,
    bar: false, ducts: false }));
  // Integrated matte bumper and a small brushed skid plate below the grille.
  // Their scale stays within the body footprint, rather than a bull bar.
  body.add(box(1.69, 0.13, 0.12, makeTrim(), 0, 0.035, 2.225));
  body.add(panel([[-0.58, 0.035, 2.293], [-0.49, -0.145, 2.25],
    [0.49, -0.145, 2.25], [0.58, 0.035, 2.293]], skidPlate()));
  for (const side of [-1, 1]) {
    const hook = new THREE.Mesh(new THREE.TorusGeometry(0.031, 0.008, 5, 16), makeCaliper());
    hook.position.set(side * 0.65, 0.055, 2.295); body.add(hook);
    body.add(box(0.055, 0.07, 1.32, makeTrim(), side * 0.95, -0.095, 0.02));
  }
  body.add(box(1.65, 0.095, 0.14, makeTrim(), 0, -0.035, -2.24));
  // Tailgate stamp and handle sit between the vertical light pods.
  body.add(box(1.13, 0.008, 0.012, makeShutline(), 0, 0.16, -2.244));
  body.add(box(0.21, 0.045, 0.022, makeTrim(), 0, 0.51, -2.252));
  body.add(buildBadgesAndPlate({ frontZ: 2.276, frontY: 0.405,
    rearZ: -2.258, rearY: 0.365, plateY: 0.165 }));
  body.add(buildMirrors({ z: 0.59, y: 0.68, x: 0.92, color: ctx.color, indicator: false }));
  body.add(buildWipers({ z: 0.84, y: 0.755, x: 0.25, len: 0.39, tilt: 0.025, rake: 0.13 }));
  body.add(faceOutboard(buildDoorFurniture({ x: 0.939, handleY: 0.49,
    handleZ: -0.44, handleW: 0.15, repeater: false, fuel: false })));
  body.add(buildUnderbody({ y: -0.245, w: 1.24, len: 3.60 }));
  body.add(buildArchLiners({ x: 0.845, r: 0.413, width: 0.26, lip: false }));
  for (const z of [1.02, -1.88]) for (const side of [-1, 1]) {
    body.add(box(0.22, 0.17, 0.025, makeTrim(), side * 0.875, -0.14, z));
  }
  return { brakeLights: lamps.brakeMesh };
}
