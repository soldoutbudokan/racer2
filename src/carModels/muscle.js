import * as THREE from 'three';
import { buildGreenhouseShell } from './loftBuilder.js';
import { makeGlass, makeTrim, makeCarbon } from './carMaterials.js';
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

export function decorate(body, ctx) {
  const glass = new THREE.Mesh(
    buildGreenhouseShell(keys, { zStart: 0.40, zEnd: -1.10, beltFrac: 0.62, steps: 24 }),
    makeGlass(),
  );
  body.add(glass);

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
