import * as THREE from 'three';
import { buildGreenhouseShell, buildPanelSeams } from './loftBuilder.js';
import { makeGlass, makeTrim, makeCarbon, makePaint, makeShutline } from './carMaterials.js';
import {
  buildHeadlights, buildTaillights, buildMirrors, buildGrille, buildSplitter,
  buildDiffuser, buildWing, buildExhaust, buildBadgesAndPlate, buildUnderbody,
  buildArchLiners,
} from './parts.js';

// Muscle car — long flat hood, fat rear haunches, upright fastback cabin set
// rearward, hood scoop, ducktail spoiler, quad exhaust. Wider stance than GT.
// Axle-centred frame (wheel centre y 0, ground -0.36).

export const keys = [
  { z: -2.18, hw: 0.90, yb: -0.10, hip: 0.20, yt: 0.44, topW: 0.66 }, // tail fascia (kamm)
  { z: -1.92, hw: 1.02, yb: -0.02, hip: 0.16, yt: 0.50, topW: 0.84 }, // rear deck
  { z: -1.45, hw: 1.09, yb:  0.05, hip: 0.13, yt: 0.54, topW: 0.84 }, // rear axle (haunch)
  { z: -1.08, hw: 1.00, yb: -0.17, hip: 0.17, yt: 0.78, topW: 0.62 }, // C-pillar (upright)
  { z: -0.72, hw: 0.98, yb: -0.18, hip: 0.18, yt: 0.89, topW: 0.58 }, // roof rear
  { z: -0.30, hw: 0.98, yb: -0.18, hip: 0.17, yt: 0.90, topW: 0.58 }, // roof front (flat)
  { z:  0.28, hw: 1.00, yb: -0.16, hip: 0.13, yt: 0.68, topW: 0.68 }, // A-pillar base / cowl
  { z:  0.62, hw: 1.02, yb: -0.15, hip: 0.08, yt: 0.50, topW: 0.84 }, // hood start
  { z:  1.45, hw: 1.06, yb:  0.05, hip: 0.05, yt: 0.47, topW: 0.84 }, // front axle (flat hood)
  { z:  1.98, hw: 0.94, yb: -0.10, hip: 0.06, yt: 0.42, topW: 0.74 }, // front fender / bumper
  { z:  2.22, hw: 0.78, yb: -0.12, hip: 0.02, yt: 0.30, topW: 0.60 }, // blunt fascia (flat cap)
];

export const wheelStyle = 'muscle';

// Panel structure — see gtCoupe.js for the (z, profile-fraction) convention.
// The long flat hood and the upright cabin make the shut lines matter more
// here than on the GT: without them the whole flank is one pressing.
const SHUT_LINES = [
  // Hood: cowl edge, leading edge (behind the headlights at z 2.10), and the
  // fender seam down each flank.
  { path: [[0.32, 0.80], [0.32, 1.00], [0.32, -0.80]] },
  { path: [[2.00, 0.80], [2.00, 1.00], [2.00, -0.80]] },
  { path: [[0.34, 0.80], [2.00, 0.80]], mirror: true },
  // Door — long, as a two-door coupe's is, top edge on the glass sill.
  {
    path: [[0.62, 0.27], [0.62, 0.59], [-1.00, 0.59], [-1.00, 0.27], [0.62, 0.27]],
    mirror: true,
  },
  // Boot lid, running under the ducktail lip (which sits on it, z -1.95..-1.65).
  { path: [[-1.18, 0.80], [-1.18, 1.00], [-1.18, -0.80]] },
  { path: [[-2.02, 0.80], [-2.02, 1.00], [-2.02, -0.80]] },
  { path: [[-1.18, 0.80], [-2.02, 0.80]], mirror: true },
];

// A-pillar / roof rail / C-pillar, upright to match the cabin.
const SURROUND = [
  { path: [[0.40, 0.60], [0.16, 0.70], [-0.04, 0.77], [-0.22, 0.80],
    [-0.78, 0.80], [-0.94, 0.74], [-1.08, 0.62]], mirror: true,
  width: 0.050, proud: 0.022 },
];

export function decorate(body, ctx) {
  const glass = new THREE.Mesh(
    buildGreenhouseShell(keys, { zStart: 0.40, zEnd: -1.10, beltFrac: 0.62, steps: 24 }),
    makeGlass(),
  );
  body.add(glass);

  const shut = buildPanelSeams(keys, SHUT_LINES, { profilePoints: 16 });
  if (shut) {
    const m = new THREE.Mesh(shut, makeShutline());
    m.receiveShadow = true;
    body.add(m);
  }
  const surround = buildPanelSeams(keys, SURROUND, { profilePoints: 16 });
  if (surround) {
    const m = new THREE.Mesh(surround, makePaint(ctx.color));
    m.castShadow = true;
    m.receiveShadow = true;
    body.add(m);
  }

  // power-bulge hood scoop, half-sunk into the flat hood plane (yt ~0.47)
  const scoop = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.10, 0.85), makeTrim());
  scoop.position.set(0, 0.49, 1.02);
  body.add(scoop);
  const scoopMouth = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.07, 0.10), makeCarbon());
  scoopMouth.position.set(0, 0.51, 1.46);
  body.add(scoopMouth);

  // Fascia parts placed against the hull: nose cap face z 2.22 (spans
  // y -0.12..0.30), tail cap face z -2.18 (spans y -0.10..0.44).
  body.add(buildHeadlights({ z: 2.10, y: 0.16, x: 0.58 }));
  const tail = buildTaillights({ z: -2.15, y: 0.22, width: 1.44 });
  body.add(tail.group);
  body.add(buildMirrors({ z: 0.44, y: 0.34, x: 0.99, color: ctx.color }));
  body.add(buildGrille({ z: 2.225, y: 0.10, w: 1.0, h: 0.22 }));
  body.add(buildSplitter({ z: 2.14, y: -0.17, w: 1.36 }));
  body.add(buildDiffuser({ z: -1.97, y: -0.26, w: 1.5 }));
  body.add(buildWing({ z: -1.96, deckY: 0.50, span: 1.6, style: 'ducktail' }));
  body.add(buildExhaust({ z: -2.14, y: -0.14, x: 0.48, count: 4 }));
  body.add(buildBadgesAndPlate({
    frontZ: 2.24, frontY: 0.10, rearZ: -2.19, rearY: 0.37, plateY: 0.02,
  }));
  body.add(buildUnderbody({ y: -0.26, w: 1.48, len: 3.7 }));
  body.add(buildArchLiners({ zF: 1.45, zR: -1.45, x: 0.88 }));

  return { brakeLights: tail.brakeMesh };
}
