import * as THREE from 'three';
import {
  buildGreenhouseShell, buildPanelSeams, buildWindowSeals, profileFractions, sampleSkin,
} from './loftBuilder.js';
import {
  makeGlass, makeShutline, makeTrim, makeCarbon, makeSatin, makeHeadlight, makeCaliper,
} from './carMaterials.js';
import { buildApertureLamps } from './apertureLamps.js';
import {
  buildTaillights, buildMirrors, buildGrille, buildWing, buildExhaust,
  buildBadgesAndPlate, buildUnderbody, buildArchLiners, buildInterior, buildDoorFurniture,
  buildWipers, buildAerial,
} from './parts.js';

// ---------------------------------------------------------------------------
// Rally hatch — kept under the legacy `hatch` id for saved selections.
//
// A compact three-door on a 2.5 m wheelbase: short overhangs, a tall upright
// glasshouse, square-shouldered box arches, a roof vent, a tailgate wing, a
// four-lamp pod on the bonnet and mud flaps. It sits 4.5 cm higher over its
// wheels than the others (BODY_LIFT) with taller arch openings, which is
// what says "gravel" from the other side of the circuit.
//
// Axle-centred frame: wheel centre y 0, ground -0.36, axles z ±1.25, tyres'
// outer faces at x 1.00 (1.72 m track).
// ---------------------------------------------------------------------------

const CABIN = { beltIn: 0.12, beltY: 0.05, tumbleK: 0.58, tumbleY: 0.50, railIn: 0.045 };
const LINE = { crease: 0.010, creaseY: 0.84 };
const ARCH = { flare: 0.070, lipY: 0.90 };    // square box arch: wide right up to the shoulder

export const keys = [
  //   z,     hw,    yb,     hip,   yt,    topW
  { z: -1.95, hw: 0.890, yb: -0.160, hip: 0.430, yt: 0.620, topW: 0.70, hard: true, crown: 0.006, ...LINE, crease: 0.006, ...CABIN },
  { z: -1.68, hw: 0.950, yb: -0.170, hip: 0.450, yt: 0.860, topW: 0.70, crown: 0.010, ...LINE, ...CABIN, flare: 0.030, lipY: 0.88 },
  { z: -1.25, hw: 0.960, yb: -0.030, hip: 0.460, yt: 0.905, topW: 0.70, crown: 0.012, ...LINE, ...CABIN, ...ARCH },      // rear axle
  { z: -0.90, hw: 0.945, yb: -0.170, hip: 0.455, yt: 0.925, topW: 0.70, sill: 0.028, crown: 0.012, ...LINE, ...CABIN, flare: 0.030, lipY: 0.88 },
  { z: -0.40, hw: 0.940, yb: -0.180, hip: 0.450, yt: 0.930, topW: 0.70, sill: 0.030, crown: 0.012, ...LINE, ...CABIN },  // B-pillar
  { z:  0.15, hw: 0.940, yb: -0.180, hip: 0.450, yt: 0.920, topW: 0.70, sill: 0.030, crown: 0.012, ...LINE, ...CABIN },  // header
  { z:  0.58, hw: 0.945, yb: -0.175, hip: 0.450, yt: 0.540, topW: 0.78, sill: 0.028, crown: 0.016, ...LINE, beltIn: 0.07, hard: true },  // cowl
  { z:  0.90, hw: 0.950, yb: -0.165, hip: 0.445, yt: 0.515, topW: 0.80, crown: 0.018, ...LINE, flare: 0.030, lipY: 0.88 },
  { z:  1.25, hw: 0.960, yb: -0.030, hip: 0.440, yt: 0.490, topW: 0.80, crown: 0.018, ...LINE, ...ARCH },               // front axle
  { z:  1.60, hw: 0.945, yb: -0.165, hip: 0.420, yt: 0.455, topW: 0.80, crown: 0.016, ...LINE, flare: 0.030, lipY: 0.88 },
  { z:  1.85, hw: 0.910, yb: -0.180, hip: 0.360, yt: 0.410, topW: 0.78, crown: 0.010, ...LINE, hard: true },
  { z:  2.00, hw: 0.860, yb: -0.185, hip: 0.230, yt: 0.300, topW: 0.72, crown: 0.006, hard: true },
];
export const CAP_ROLL = { nose: { top: 0.10, bottom: 0.05 }, tail: { top: 0.07, bottom: 0.05 } };
export const wheelStyle = 'rally';
// Gravel stance: taller arch openings and the shell lifted over its wheels.
export const ARCHES = { r: 0.445 };
export const BODY_LIFT = 0.045;
const F = profileFractions(keys);

const GLASS = [
  { zStart: 0.56, zStartTop: 0.50, zEnd: 0.16, beltFrac: F.topCorner, topFrac: 1, steps: 12 },
  { zStart: 0.44, zStartTop: 0.06, zEnd: -0.50, beltFrac: F.beltTuck, topFrac: F.topCorner, steps: 14 },
  { zStart: -0.58, zEnd: -1.42, zEndTop: -1.36, beltFrac: F.beltTuck, topFrac: F.topCorner, steps: 12 },
  { zStart: -1.56, zEnd: -1.86, beltFrac: F.tumble, topFrac: 1, steps: 10 },   // steep tailgate glass
];
const TAILLAMPS = [-1, 1].map(side => ({
  zStart: -1.74, zEnd: -1.86, beltFrac: F.flankFoot, topFrac: F.crease, steps: 6, side,
}));
export const PANES = [...GLASS, ...TAILLAMPS];

const SHUT_LINES = [
  { path: [[1.80, F.topCorner], [1.80, 1.0], [1.80, -F.topCorner]] },
  { path: [[1.80, F.topCorner], [0.56, F.topCorner]], mirror: true },
  {
    path: [[0.50, F.sillLip], [0.50, F.shoulder], [-0.62, F.shoulder],
      [-0.62, F.sillLip], [0.50, F.sillLip]],
    mirror: true,
  },
  // Tailgate: round the tail glass and down the back panel.
  { path: [[-1.52, F.topCorner], [-1.52, 1.0], [-1.52, -F.topCorner]] },
];

let _plate = null;
function numberPanel() {
  if (_plate) return _plate;
  const c = document.createElement('canvas');
  c.width = 256; c.height = 192;
  const g = c.getContext('2d');
  g.fillStyle = '#f4f1e6'; g.fillRect(0, 0, 256, 192);
  g.fillStyle = '#17191c'; g.fillRect(0, 0, 256, 30);
  g.fillStyle = '#17191c';
  g.font = 'bold 128px Arial'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText('9', 128, 112);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  _plate = new THREE.MeshStandardMaterial({
    map: tex, roughness: 0.55, metalness: 0.05,
    polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
  });
  return _plate;
}

function box(w, h, d, material, x = 0, y = 0, z = 0) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  mesh.position.set(x, y, z); mesh.castShadow = true; mesh.receiveShadow = true;
  return mesh;
}
// parts.js yaws its side-facing recesses the wrong way (local +z inboard on
// both flanks); flip the quarter turns so the handles face out of the paint.
function faceOutboard(group) {
  group.traverse(o => {
    if (Math.abs(Math.abs(o.rotation.y) - Math.PI / 2) < 1e-6) o.rotation.y = -o.rotation.y;
  });
  return group;
}

// Four-lamp pod on the bonnet's leading edge: a black bar with four round
// projectors in satin bezels. On a rally car this is the face.
function buildLampPod() {
  const g = new THREE.Group();
  const { position, normal } = sampleSkin(keys, 1.74, 1);
  const pod = new THREE.Group();
  pod.position.copy(position).addScaledVector(normal, 0.06).add(new THREE.Vector3(0, 0.02, 0.06));
  pod.add(box(0.98, 0.17, 0.16, makeTrim()));
  for (const x of [-0.36, -0.12, 0.12, 0.36]) {
    const bezel = new THREE.Mesh(new THREE.TorusGeometry(0.066, 0.009, 6, 24), makeSatin());
    bezel.position.set(x, 0, 0.082); pod.add(bezel);
    const dish = new THREE.Mesh(new THREE.CylinderGeometry(0.060, 0.060, 0.012, 20), makeSatin());
    dish.geometry.rotateX(Math.PI / 2); dish.position.set(x, 0, 0.078); pod.add(dish);
    const lamp = new THREE.Mesh(new THREE.CircleGeometry(0.042, 20), makeHeadlight());
    lamp.position.set(x, 0, 0.086); pod.add(lamp);
  }
  // Straps over the pod onto the bonnet.
  for (const x of [-0.55, 0.55]) pod.add(box(0.03, 0.19, 0.17, makeSatin(), x, -0.005, 0));
  g.add(pod);
  return g;
}

// Mud flaps behind each wheel, hanging off the arch's trailing edge.
function buildMudFlaps() {
  const g = new THREE.Group();
  const rubber = new THREE.MeshStandardMaterial({ color: 0x0c0d10, roughness: 0.95, metalness: 0 });
  for (const z of [1.25, -1.25]) for (const side of [-1, 1]) {
    const flap = box(0.30, 0.26, 0.016, rubber, side * 0.90, -0.26, z - 0.44);
    flap.rotation.x = 0.08;
    g.add(flap);
    g.add(box(0.30, 0.025, 0.03, makeTrim(), side * 0.90, -0.14, z - 0.43));
  }
  return g;
}

export function decorate(body, ctx) {
  body.add(new THREE.Mesh(buildGreenhouseShell(keys, { panes: GLASS }), makeGlass()));
  const seals = buildWindowSeals(keys, { panes: GLASS, width: 0.026 });
  if (seals) body.add(new THREE.Mesh(seals, makeTrim()));
  const shut = buildPanelSeams(keys, SHUT_LINES);
  if (shut) body.add(new THREE.Mesh(shut, makeShutline()));

  const lamps = buildApertureLamps(keys, F, { tail: TAILLAMPS, depth: 0.028 });
  body.add(lamps.group);

  // Tail cap plane z -1.95; usable face y -0.11 .. 0.55.
  const tail = buildTaillights({
    z: -1.945, y: 0.40, width: 1.30, height: 0.14, depth: 0.040, barH: 0.028,
    segments: 5, fog: true, extraRed: [lamps.tailBlade],
  });
  body.add(tail.group);
  body.add(buildBadgesAndPlate({
    frontPose: sampleSkin(keys, 1.60, 1), rearZ: -1.958, rearY: 0.50, plateY: 0.20,
  }));
  body.add(buildExhaust({ z: -1.96, y: -0.04, x: 0.52, count: 1, r: 0.050 }));
  // A matte bumper bar wraps the lower tail, skid plate under it.
  body.add(box(1.72, 0.12, 0.10, makeTrim(), 0, -0.02, -1.93));
  body.add(box(0.80, 0.035, 0.18, makeSatin(), 0, -0.13, -1.90));
  // Tailgate wing: a hoop-mounted blade off the roof's trailing edge.
  body.add(buildWing({ z: -1.90, y: 1.04, span: 1.30, deckY: 0.80, style: 'gt', gurney: true }));

  // Nose cap plane z 2.00; face y -0.13 .. 0.20.
  body.add(buildGrille({ z: 2.003, y: 0.10, w: 0.74, h: 0.14, depth: 0.034, bar: true,
    ductW: 0.22, ductH: 0.12, ductX: 0.60, ductY: 0.02 }));
  body.add(box(1.68, 0.11, 0.10, makeTrim(), 0, -0.08, 1.985));
  body.add(box(0.72, 0.035, 0.20, makeSatin(), 0, -0.17, 1.96));
  for (const side of [-1, 1]) {
    const hook = new THREE.Mesh(new THREE.TorusGeometry(0.030, 0.008, 5, 16), makeCaliper());
    hook.position.set(side * 0.58, -0.07, 2.04); body.add(hook);
  }
  body.add(buildLampPod());

  // Roof vent and aerial, on the crowned roof.
  const roof = sampleSkin(keys, -0.30, 1);
  const vent = box(0.30, 0.055, 0.34, makeCarbon(), 0, roof.position.y + 0.026, -0.30);
  body.add(vent);
  body.add(box(0.26, 0.030, 0.012, makeTrim(), 0, roof.position.y + 0.040, -0.12));
  body.add(buildAerial({ z: -0.90, y: roof.position.y - 0.004, style: 'whip' }));

  body.add(buildWipers({ z: 0.58, y: 0.565, x: 0.24, len: 0.46, tilt: 0.06, rake: 0.55 }));
  body.add(buildMirrors({ z: 0.46, y: 0.52, x: 0.90, color: ctx.color, indicator: false }));
  body.add(faceOutboard(buildDoorFurniture({
    x: 0.935, handleY: 0.36, handleZ: -0.40, handleW: 0.15, repeater: false, fuel: false,
  })));
  // Door number panel, seated on the door skin.
  const forward = new THREE.Vector3(0, 0, 1);
  for (const side of [-1, 1]) {
    const { position, normal } = sampleSkin(keys, -0.05, side * (F.shoulder - 0.07));
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(0.40, 0.30), numberPanel());
    panel.quaternion.setFromUnitVectors(forward, normal);
    panel.position.copy(position).addScaledVector(normal, 0.004);
    body.add(panel);
  }
  body.add(buildMudFlaps());
  // Rocker protection: a satin sill guard along the floor edge.
  for (const side of [-1, 1]) body.add(box(0.06, 0.07, 1.70, makeTrim(), side * 0.905, -0.17, 0.0));

  body.add(buildInterior({
    floorY: -0.03, dashZ: 0.48, dashH: 0.17, seatZ: -0.40, bulkheadZ: -1.10,
    seatX: 0.33, seatBackH: 0.56, halfWidth: 0.60,
    wheelR: 0.16, wheelZ: 0.20, wheelY: 0.44, driverX: -0.33,
    seats: 2, cage: true, harness: true,
  }));

  body.add(buildUnderbody({ y: -0.24, w: 1.26, len: 3.40 }));
  body.add(buildArchLiners({ zF: 1.25, zR: -1.25, x: 0.84, r: 0.45, width: 0.28, lip: false }));
  return { brakeLights: tail.brakeMesh };
}
