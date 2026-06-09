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
  { z: -2.18, hw: 0.92, yb: -0.12, hip: 0.14, yt: 0.40, topW: 0.80 }, // tail (kammback)
  { z: -1.80, hw: 1.05, yb:  0.02, hip: 0.10, yt: 0.52, topW: 0.88 }, // rear haunch (fat)
  { z: -1.45, hw: 1.06, yb:  0.06, hip: 0.10, yt: 0.56, topW: 0.86 }, // rear axle (arch)
  { z: -1.05, hw: 1.00, yb: -0.16, hip: 0.16, yt: 0.86, topW: 0.66 }, // C-pillar (upright)
  { z: -0.55, hw: 0.98, yb: -0.18, hip: 0.18, yt: 0.92, topW: 0.62 }, // roof (flat)
  { z:  0.05, hw: 0.99, yb: -0.16, hip: 0.15, yt: 0.82, topW: 0.70 }, // A-pillar (rearward)
  { z:  0.55, hw: 1.02, yb: -0.14, hip: 0.06, yt: 0.48, topW: 0.86 }, // cowl / hood start
  { z:  1.45, hw: 1.05, yb:  0.06, hip: 0.04, yt: 0.46, topW: 0.84 }, // front axle (flat hood, arch)
  { z:  1.95, hw: 0.94, yb: -0.02, hip: 0.06, yt: 0.44, topW: 0.72 }, // front
  { z:  2.22, hw: 0.62, yb:  0.04, hip: 0.08, yt: 0.34, topW: 0.46 }, // blunt nose
];

export const wheelStyle = 'muscle';

export function decorate(body, ctx) {
  const glass = new THREE.Mesh(
    buildGreenhouseShell(keys, { zStart: 0.45, zEnd: -1.12, beltFrac: 0.62, steps: 24 }),
    makeGlass(),
  );
  body.add(glass);

  // power-bulge hood scoop
  const scoop = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.12, 0.9), makeTrim());
  scoop.position.set(0, 0.52, 1.05);
  body.add(scoop);
  const scoopMouth = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.08, 0.12), makeCarbon());
  scoopMouth.position.set(0, 0.55, 1.5);
  body.add(scoopMouth);

  body.add(buildHeadlights({ z: 1.96, y: 0.22, x: 0.62 }));
  const tail = buildTaillights({ z: -2.08, y: 0.24, width: 1.6 });
  body.add(tail.group);
  body.add(buildMirrors({ z: 0.55, y: 0.36, x: 1.0, color: ctx.color }));
  body.add(buildGrille({ z: 2.06, y: 0.0, w: 1.1, h: 0.26 }));
  body.add(buildSplitter({ z: 2.0, y: -0.30, w: 2.0 }));
  body.add(buildDiffuser({ z: -2.05, y: -0.24, w: 1.9 }));
  body.add(buildWing({ z: -1.95, deckY: 0.5, span: 1.7, style: 'ducktail' }));
  body.add(buildExhaust({ z: -2.12, y: -0.16, x: 0.5, count: 4 }));
  body.add(buildBadgesAndPlate({ frontZ: 2.1, rearZ: -2.1, plateY: 0.0 }));
  body.add(buildUnderbody({ y: -0.30, w: 1.7, len: 4.0 }));
  body.add(buildArchLiners({ zF: 1.45, zR: -1.45, x: 0.88 }));

  return { brakeLights: tail.brakeMesh };
}
