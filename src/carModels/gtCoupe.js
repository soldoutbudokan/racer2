import * as THREE from 'three';
import { buildGreenhouseShell } from './loftBuilder.js';
import { makeGlass } from './carMaterials.js';
import {
  buildHeadlights, buildTaillights, buildMirrors, buildGrille, buildSplitter,
  buildDiffuser, buildWing, buildExhaust, buildBadgesAndPlate, buildUnderbody,
} from './parts.js';

// GT coupe — smooth fastback supercar silhouette.
//
// Authored in the AXLE-CENTRED frame: wheel centre = y 0, wheel radius 0.36
// (so ground = -0.36). yb is raised over the axles (z = +/-1.45) to arch the
// lower-body edge up over each wheel, and dips between them for a low rocker.

export const keys = [
  { z: -2.16, hw: 0.86, yb: -0.14, hip: 0.12, yt: 0.30, topW: 0.74 }, // tail
  { z: -1.78, hw: 1.00, yb:  0.00, hip: 0.10, yt: 0.42, topW: 0.82 }, // rear fender
  { z: -1.45, hw: 1.01, yb:  0.05, hip: 0.09, yt: 0.46, topW: 0.80 }, // rear axle (arch)
  { z: -1.05, hw: 0.97, yb: -0.18, hip: 0.14, yt: 0.72, topW: 0.56 }, // C-pillar / rocker
  { z: -0.45, hw: 0.95, yb: -0.20, hip: 0.16, yt: 0.88, topW: 0.52 }, // roof peak
  { z:  0.20, hw: 0.96, yb: -0.18, hip: 0.13, yt: 0.70, topW: 0.62 }, // cowl / A-pillar
  { z:  0.80, hw: 0.99, yb: -0.16, hip: 0.06, yt: 0.40, topW: 0.82 }, // hood (low, flat)
  { z:  1.45, hw: 1.01, yb:  0.05, hip: 0.04, yt: 0.42, topW: 0.80 }, // front axle (arch)
  { z:  1.80, hw: 0.98, yb:  0.00, hip: 0.06, yt: 0.38, topW: 0.74 }, // front fender
  { z:  2.04, hw: 0.82, yb: -0.06, hip: 0.08, yt: 0.30, topW: 0.58 }, // nose
  { z:  2.20, hw: 0.46, yb:  0.02, hip: 0.08, yt: 0.22, topW: 0.34 }, // nose tip
];

export const wheelStyle = 'gt';

export function decorate(body, ctx) {
  // tinted glass canopy over the cabin
  const glass = new THREE.Mesh(
    buildGreenhouseShell(keys, { zStart: 0.28, zEnd: -1.16, beltFrac: 0.60, steps: 26 }),
    makeGlass(),
  );
  body.add(glass);

  body.add(buildHeadlights({ z: 1.92, y: 0.16, x: 0.60 }));
  const tail = buildTaillights({ z: -2.06, y: 0.16, width: 1.46 });
  body.add(tail.group);
  body.add(buildMirrors({ z: 0.30, y: 0.30, x: 0.96, color: ctx.color }));
  body.add(buildGrille({ z: 2.04, y: -0.08, w: 0.86, h: 0.2 }));
  body.add(buildSplitter({ z: 1.99, y: -0.30, w: 1.96 }));
  body.add(buildDiffuser({ z: -2.0, y: -0.26, w: 1.8 }));
  body.add(buildWing({ z: -1.9, y: 0.60, span: 1.6, deckY: 0.40, style: 'gt' }));
  body.add(buildExhaust({ z: -2.08, y: -0.18, x: 0.45, count: 2 }));
  body.add(buildBadgesAndPlate({ frontZ: 2.07, rearZ: -2.08, plateY: -0.04 }));
  body.add(buildUnderbody({ y: -0.30, w: 1.64, len: 3.8 }));

  return { brakeLights: tail.brakeMesh };
}
