import * as THREE from 'three';
import { buildGreenhouseShell, buildPanelSeams } from './loftBuilder.js';
import { makeGlass, makePaint, makeShutline } from './carMaterials.js';
import {
  buildHeadlights, buildTaillights, buildMirrors, buildGrille, buildSplitter,
  buildDiffuser, buildWing, buildExhaust, buildBadgesAndPlate, buildUnderbody,
  buildArchLiners,
} from './parts.js';

// GT coupe — smooth fastback supercar silhouette.
//
// Authored in the AXLE-CENTRED frame: wheel centre = y 0, wheel radius 0.36
// (so ground = -0.36). yb is raised over the axles (z = +/-1.45) to arch the
// lower-body edge up over each wheel, and dips between them for a low rocker.

export const keys = [
  { z: -2.16, hw: 0.84, yb: -0.13, hip: 0.16, yt: 0.33, topW: 0.60 }, // tail fascia (kamm)
  { z: -1.90, hw: 0.98, yb: -0.06, hip: 0.14, yt: 0.40, topW: 0.76 }, // rear deck edge
  { z: -1.45, hw: 1.05, yb:  0.04, hip: 0.12, yt: 0.46, topW: 0.78 }, // rear axle (arch blister)
  { z: -1.10, hw: 0.97, yb: -0.19, hip: 0.15, yt: 0.66, topW: 0.58 }, // C-pillar / rocker
  { z: -0.72, hw: 0.95, yb: -0.20, hip: 0.16, yt: 0.83, topW: 0.50 }, // roof rear
  { z: -0.30, hw: 0.95, yb: -0.20, hip: 0.16, yt: 0.85, topW: 0.50 }, // roof front (flat panel)
  { z:  0.24, hw: 0.96, yb: -0.18, hip: 0.13, yt: 0.64, topW: 0.60 }, // cowl / A-pillar base
  { z:  0.80, hw: 0.98, yb: -0.16, hip: 0.08, yt: 0.44, topW: 0.80 }, // hood (flat plane)
  { z:  1.45, hw: 1.04, yb:  0.04, hip: 0.05, yt: 0.43, topW: 0.82 }, // front axle (arch blister)
  { z:  1.85, hw: 0.94, yb: -0.08, hip: 0.05, yt: 0.36, topW: 0.72 }, // front fender taper
  { z:  2.08, hw: 0.80, yb: -0.13, hip: 0.02, yt: 0.26, topW: 0.60 }, // nose / bumper
  { z:  2.20, hw: 0.68, yb: -0.14, hip: 0.00, yt: 0.18, topW: 0.52 }, // fascia (flat face cap)
];

export const wheelStyle = 'gt';

// Panel structure. Paths are (z, profile-fraction) waypoints on the skin; the
// fractions are read off the actual cross-section (N = 16, as built in
// index.js): 0.27 = rocker under-curve, 0.53 = beltline crease, 0.60 = glass sill,
// 0.80 = roof/deck top corner, 1.00 = crown centre line.
const SHUT_LINES = [
  // Hood: cowl edge, leading edge, and the fender seam down each flank.
  { path: [[0.34, 0.80], [0.34, 1.00], [0.34, -0.80]] },
  { path: [[1.94, 0.80], [1.94, 1.00], [1.94, -0.80]] },
  { path: [[0.36, 0.80], [1.94, 0.80]], mirror: true },
  // Door: front cut behind the front arch, up to the belt, back along the
  // glass sill, down the rear cut and forward along the sill — one closed
  // loop per side, so the flank stops being a single unbroken pressing.
  {
    // Top edge hugs the glass sill (0.60) and the bottom sits in the rocker's
    // under-curve, so the loop reads as a door under a window rather than a
    // rectangle floating in the middle of the flank.
    path: [[0.60, 0.27], [0.60, 0.59], [-0.88, 0.59], [-0.88, 0.27], [0.60, 0.27]],
    mirror: true,
  },
  // Boot lid, clear of the wing posts (which straddle z -1.93..-1.83).
  { path: [[-1.22, 0.80], [-1.22, 1.00], [-1.22, -0.80]] },
  { path: [[-1.78, 0.80], [-1.78, 1.00], [-1.78, -0.80]] },
  { path: [[-1.22, 0.80], [-1.78, 0.80]], mirror: true },
];

// Body-coloured window surround — A-pillar, roof-side rail and C-pillar in one
// ribbon per flank, standing proud of the glass canopy (which is itself 0.012
// proud of the paint). Without it the greenhouse is one unbroken tinted band
// from cowl to tail with no pillar to read the cabin by. Transverse header
// rails over the crown were tried too and dropped: from above they cut the
// roof into stripes, and they are invisible from every driving camera.
const SURROUND = [
  { path: [[0.28, 0.60], [0.10, 0.66], [-0.10, 0.74], [-0.28, 0.80],
    [-0.80, 0.80], [-1.00, 0.74], [-1.14, 0.62]], mirror: true,
  width: 0.050, proud: 0.022 },
];

export function decorate(body, ctx) {
  // tinted glass canopy over the cabin
  const glass = new THREE.Mesh(
    buildGreenhouseShell(keys, { zStart: 0.28, zEnd: -1.16, beltFrac: 0.60, steps: 26 }),
    makeGlass(),
  );
  body.add(glass);

  const shut = buildPanelSeams(keys, SHUT_LINES, { profilePoints: 16 });
  if (shut) {
    const m = new THREE.Mesh(shut, makeShutline());
    m.receiveShadow = true;      // no castShadow: 10 mm ribbons only self-shadow
    body.add(m);
  }
  const surround = buildPanelSeams(keys, SURROUND, { profilePoints: 16 });
  if (surround) {
    const m = new THREE.Mesh(surround, makePaint(ctx.color));
    m.castShadow = true;
    m.receiveShadow = true;
    body.add(m);
  }

  // All fascia parts are placed against the hull surface at their station:
  // nose cap face z 2.20 (spans y -0.14..0.18), tail cap face z -2.16
  // (spans y -0.13..0.33).
  body.add(buildHeadlights({ z: 1.98, y: 0.12, x: 0.56 }));
  const tail = buildTaillights({ z: -2.13, y: 0.16, width: 1.34 });
  body.add(tail.group);
  body.add(buildMirrors({ z: 0.34, y: 0.30, x: 0.95, color: ctx.color }));
  body.add(buildGrille({ z: 2.205, y: -0.05, w: 0.62, h: 0.13 }));
  body.add(buildSplitter({ z: 2.12, y: -0.18, w: 1.30 }));
  body.add(buildDiffuser({ z: -1.95, y: -0.27, w: 1.44 }));
  body.add(buildWing({ z: -1.9, y: 0.58, span: 1.5, deckY: 0.38, style: 'gt' }));
  body.add(buildExhaust({ z: -2.10, y: -0.16, x: 0.42, count: 2 }));
  body.add(buildBadgesAndPlate({
    frontZ: 2.21, frontY: 0.05, rearZ: -2.17, rearY: 0.27, plateY: -0.03,
  }));
  body.add(buildUnderbody({ y: -0.26, w: 1.42, len: 3.5 }));
  body.add(buildArchLiners({ zF: 1.45, zR: -1.45, x: 0.86 }));

  return { brakeLights: tail.brakeMesh };
}
