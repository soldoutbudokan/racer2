import * as THREE from 'three';
import {
  buildGreenhouseShell, buildPanelSeams, buildWindowSeals, profileFractions, sampleSkin,
  flankPoint,
} from './loftBuilder.js';
import { makeGlass, makeTrim, makeCarbon, makeSatin, makeShutline, makeHeadlight } from './carMaterials.js';
import {
  addOpening, buildTaillights, buildMirrors, buildGrille, buildSplitter, buildWing,
  buildBadgesAndPlate, buildUnderbody, buildArchLiners, buildInterior, buildDoorFurniture,
  buildWipers, buildAerial,
} from './parts.js';

// ---------------------------------------------------------------------------
// Classic V8 — a late-sixties fastback: a bonnet almost two metres long with
// a power bulge, the cabin pushed back over the rear axle, a long shallow
// fastback into a short deck with a ducktail, hips over the rear wheels, a
// full-width tail lamp, quad round headlamps in an upright grille and side
// pipes under the doors. Twin stripes nose to tail (livery.js).
//
// Axle-centred frame: wheel centre y 0, ground -0.36, axles z ±1.475 (2.95 m
// wheelbase), tyres' outer faces at x 1.03 (1.78 m track).
// ---------------------------------------------------------------------------

const CABIN = { beltIn: 0.14, beltY: 0.05, tumbleK: 0.60, tumbleY: 0.52, railIn: 0.040 };
// One hip line nose to tail. The loft lifts a crease to at least 4 % of the
// flank above an arch lip (loftBuilder halfProfileSurfaced), so the lips stay
// at or below 0.78 and the line runs straight, kicking out over the haunches.
const LINE = { crease: 0.020, creaseY: 0.82 };

export const keys = [
  //   z,     hw,    yb,     hip,   yt,    topW
  { z: -2.45, hw: 0.930, yb: -0.160, hip: 0.390, yt: 0.560, topW: 0.80, hard: true, crown: 0.006, ...LINE, crease: 0.008 },
  { z: -2.20, hw: 0.995, yb: -0.170, hip: 0.440, yt: 0.580, topW: 0.86, crown: 0.010, ...LINE },
  { z: -1.85, hw: 1.045, yb: -0.150, hip: 0.465, yt: 0.580, topW: 0.86, crown: 0.012, ...LINE, flare: 0.050, lipY: 0.76 },
  { z: -1.475, hw: 1.065, yb: -0.020, hip: 0.475, yt: 0.610, topW: 0.84, crown: 0.012, ...LINE, flare: 0.065, lipY: 0.78 },  // rear axle
  { z: -1.10, hw: 1.030, yb: -0.170, hip: 0.465, yt: 0.730, topW: 0.74, sill: 0.022, crown: 0.016, ...LINE, flare: 0.045, lipY: 0.76, ...CABIN, beltIn: 0.10 },
  { z: -0.60, hw: 0.980, yb: -0.190, hip: 0.465, yt: 0.930, topW: 0.68, sill: 0.030, crown: 0.020, ...LINE, ...CABIN },  // C-pillar
  { z: -0.15, hw: 0.975, yb: -0.190, hip: 0.460, yt: 0.985, topW: 0.66, sill: 0.030, crown: 0.020, ...LINE, ...CABIN },  // roof
  { z:  0.02, hw: 0.975, yb: -0.190, hip: 0.460, yt: 0.975, topW: 0.66, sill: 0.030, crown: 0.020, ...LINE, ...CABIN },  // header
  { z:  0.45, hw: 0.980, yb: -0.185, hip: 0.460, yt: 0.610, topW: 0.80, sill: 0.028, crown: 0.030, ...LINE, beltIn: 0.08, hard: true },  // cowl
  { z:  1.00, hw: 0.990, yb: -0.170, hip: 0.450, yt: 0.580, topW: 0.86, crown: 0.034, ...LINE, flare: 0.025, lipY: 0.76 },
  { z:  1.475, hw: 1.010, yb: -0.020, hip: 0.440, yt: 0.560, topW: 0.86, crown: 0.034, ...LINE, flare: 0.040, lipY: 0.78 },  // front axle
  { z:  1.85, hw: 0.995, yb: -0.160, hip: 0.420, yt: 0.540, topW: 0.86, crown: 0.030, ...LINE, flare: 0.025, lipY: 0.76 },
  { z:  2.20, hw: 0.975, yb: -0.165, hip: 0.390, yt: 0.515, topW: 0.86, crown: 0.020, ...LINE, hard: true },
  { z:  2.45, hw: 0.930, yb: -0.165, hip: 0.330, yt: 0.470, topW: 0.82, crown: 0.010, hard: true },
];
// Chrome-era edges: tight rolls front and rear; the bonnet just turns down.
export const CAP_ROLL = { nose: { top: 0.06, bottom: 0.04 }, tail: { top: 0.05, bottom: 0.04 } };
export const wheelStyle = 'muscle';
const F = profileFractions(keys);

const GLASS = [
  { zStart: 0.44, zStartTop: 0.38, zEnd: 0.03, beltFrac: F.topCorner, topFrac: 1, steps: 12 },
  { zStart: 0.33, zStartTop: -0.06, zEnd: -0.66, zEndTop: -0.62, beltFrac: F.beltTuck, topFrac: F.topCorner, steps: 14 },
  { zStart: -0.74, zEnd: -1.22, zEndTop: -0.96, beltFrac: F.beltTuck, topFrac: F.topCorner, steps: 10 },
  { zStart: -0.78, zEnd: -1.52, beltFrac: F.topCorner, topFrac: 1, steps: 14 },
];
export const PANES = GLASS;

const SHUT_LINES = [
  { path: [[2.14, F.topCorner], [2.14, 1.0], [2.14, -F.topCorner]] },
  { path: [[2.14, F.topCorner], [0.44, F.topCorner]], mirror: true },
  // Door: rear cut between the door glass (ends z -0.62 at the top) and the
  // quarter window (starts -0.74).
  {
    path: [[0.36, F.sillLip], [0.36, F.shoulder], [-0.70, F.shoulder],
      [-0.70, F.sillLip], [0.36, F.sillLip]],
    mirror: true,
  },
  { path: [[-1.56, F.topCorner], [-1.56, 1.0], [-1.56, -F.topCorner]] },
  { path: [[-1.56, F.topCorner], [-2.26, F.topCorner]], mirror: true },
];

function box(w, h, d, material, x = 0, y = 0, z = 0) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  mesh.position.set(x, y, z); mesh.castShadow = true; mesh.receiveShadow = true;
  return mesh;
}

// Quad round headlamps either side of the grille, in a black panel recessed
// into the upright nose face. Nose cap plane z 2.45; face y -0.125 .. 0.41.
function buildFace() {
  const g = new THREE.Group();
  const trim = makeTrim(), satin = makeSatin(), lamp = makeHeadlight();
  for (const side of [-1, 1]) {
    const panel = new THREE.Group();
    panel.position.set(side * 0.60, 0.20, 2.452);
    addOpening(panel, { w: 0.50, h: 0.24, depth: 0.030, wall: 0.010, lipT: 0.010,
      floorMat: trim, wallMat: trim, lipMat: satin });
    for (const x of [-0.125, 0.125]) {
      const bezel = new THREE.Mesh(new THREE.TorusGeometry(0.084, 0.010, 6, 28), satin);
      bezel.position.set(x, 0, 0.030); panel.add(bezel);
      const dish = new THREE.Mesh(new THREE.CylinderGeometry(0.078, 0.078, 0.014, 24), satin);
      dish.geometry.rotateX(Math.PI / 2); dish.position.set(x, 0, 0.024); panel.add(dish);
      const bulb = new THREE.Mesh(new THREE.CircleGeometry(0.052, 24), lamp);
      bulb.position.set(x, 0, 0.034); panel.add(bulb);
    }
    g.add(panel);
  }
  return g;
}

// Side pipes: a satin exhaust under each rocker with a slotted heat shield.
// The tip ends at z -1.12, 4 cm clear of the rear tyre with the wheel at
// full droop (axle -1.475, tyre radius 0.36, pipe 0.215 under the hub).
function buildSidePipes() {
  const g = new THREE.Group();
  const satin = makeSatin(), trim = makeTrim();
  for (const side of [-1, 1]) {
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.052, 1.42, 14, 1, true), satin);
    pipe.geometry.rotateX(Math.PI / 2);
    pipe.position.set(side * 0.99, -0.215, -0.25);
    g.add(pipe);
    const tip = new THREE.Mesh(new THREE.CylinderGeometry(0.056, 0.052, 0.16, 14, 1, true), satin);
    tip.geometry.rotateX(Math.PI / 2);
    tip.position.set(side * 0.99, -0.215, -1.04);
    g.add(tip);
    // heat shield with slots
    g.add(box(0.03, 0.12, 1.10, trim, side * 1.015, -0.18, -0.20));
    for (let i = 0; i < 6; i++) g.add(box(0.012, 0.07, 0.11, satin, side * 1.034, -0.18, -0.70 + i * 0.20));
    // header pipes rising into the sill
    g.add(box(0.06, 0.09, 0.30, trim, side * 0.96, -0.17, 0.60));
  }
  return g;
}

export function decorate(body, ctx) {
  body.add(new THREE.Mesh(buildGreenhouseShell(keys, { panes: GLASS }), makeGlass()));
  const seals = buildWindowSeals(keys, { panes: GLASS, width: 0.024 });
  if (seals) body.add(new THREE.Mesh(seals, makeTrim()));
  const shut = buildPanelSeams(keys, SHUT_LINES);
  if (shut) body.add(new THREE.Mesh(shut, makeShutline()));

  // Nose: grille between the lamp panels, satin bumper blade, chin spoiler.
  body.add(buildFace());
  body.add(buildGrille({ z: 2.452, y: 0.20, w: 0.62, h: 0.24, depth: 0.036, bar: true, ducts: false }));
  body.add(box(1.80, 0.07, 0.06, makeSatin(), 0, -0.02, 2.46));
  body.add(buildSplitter({ z: 2.37, y: -0.19, w: 1.70, canards: false, rods: false, fins: false }));
  // Bonnet pins and the power bulge's scoop mouth.
  const pin = sampleSkin(keys, 1.98, F.crownEdge);
  for (const side of [-1, 1]) {
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.030, 0.030, 0.008, 16), makeSatin());
    disc.position.set(side * pin.position.x, pin.position.y + 0.004, 1.98);
    body.add(disc);
  }
  const scoopAt = sampleSkin(keys, 1.20, 1);
  const scoop = box(0.64, 0.055, 0.96, makeTrim(), 0, scoopAt.position.y + 0.018, 1.10);
  body.add(scoop);
  body.add(box(0.56, 0.040, 0.02, makeCarbon(), 0, scoopAt.position.y + 0.024, 1.585));

  // Tail cap plane z -2.45; face y -0.12 .. 0.51: full-width lamp, plate,
  // ducktail on the deck, satin bumper blade below.
  const tail = buildTaillights({
    z: -2.445, y: 0.33, width: 1.62, height: 0.15, depth: 0.040, barH: 0.060,
    segments: 8, fog: false, reverse: true,
  });
  body.add(tail.group);
  body.add(buildBadgesAndPlate({
    frontPose: sampleSkin(keys, 2.30, 1), rearZ: -2.458, rearY: 0.47, plateY: 0.14,
  }));
  body.add(box(1.80, 0.07, 0.06, makeSatin(), 0, -0.03, -2.46));
  body.add(buildWing({ z: -2.10, deckY: 0.575, span: 1.60, style: 'ducktail' }));

  body.add(buildMirrors({ z: 0.34, y: 0.515, x: 0.925, color: ctx.color, indicator: false }));
  body.add(buildWipers({ z: 0.44, y: 0.635, x: 0.28, len: 0.50, tilt: 0.08, rake: 0.30 }));
  body.add(buildAerial({ z: -1.10, y: 0.748, style: 'whip' }));
  body.add(buildDoorFurniture({
    x: flankPoint(keys, -0.40, 0.40).position.x, handleY: 0.40, handleZ: -0.40, handleW: 0.17, repeater: false, fuel: false,
  }));
  body.add(buildSidePipes());

  body.add(buildInterior({
    floorY: -0.02, dashZ: 0.36, dashH: 0.17, seatZ: -0.50, bulkheadZ: -1.15,
    seatX: 0.36, seatBackH: 0.56, halfWidth: 0.64,
    wheelR: 0.17, wheelZ: 0.14, wheelY: 0.46, driverX: -0.35,
    seats: 2, cage: true, harness: true,
  }));

  body.add(buildUnderbody({ y: -0.245, w: 1.30, len: 4.20 }));
  body.add(buildArchLiners({ zF: ctx.arches.zF, zR: ctx.arches.zR, x: 0.87, r: 0.413, width: 0.28, lip: false }));
  return { brakeLights: tail.brakeMesh };
}
