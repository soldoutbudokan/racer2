import * as THREE from 'three';
import {
  buildGreenhouseShell, buildPaneWells, buildPanelSeams, buildWindowSeals,
  profileFractions, sampleSkin,
} from './loftBuilder.js';
import { makeGlass, makeHeadlight, makeSatin, makeShutline, makeTrim, makeWell } from './carMaterials.js';
import { buildApertureLamps } from './apertureLamps.js';
import {
  buildTaillights, buildMirrors, buildGrille, buildSplitter, buildDiffuser,
  buildWing, buildExhaust, buildBadgesAndPlate, buildUnderbody,
  buildArchLiners, buildInterior, buildBodyVents,
} from './parts.js';

// Low mid-engine berlinetta. A narrow cab-forward roof, wide rear haunches,
// deep side scoops and a long louvred engine deck give this car its own
// silhouette. Axle positions and wheel clearances follow the shared chassis.
export const keys = [
  { z: -2.33, hw: 0.89, yb: -0.13, hip: 0.33, yt: 0.47, topW: 0.72, crown: 0.006, hard: true },
  { z: -2.10, hw: 0.99, yb: -0.12, hip: 0.43, yt: 0.55, topW: 0.82, crown: 0.010 },
  { z: -1.78, hw: 0.99, yb: -0.07, hip: 0.46, yt: 0.59, topW: 0.85, flare: 0.055, lipY: 0.68, crown: 0.015 },
  { z: -1.45, hw: 0.995, yb: 0.035, hip: 0.47, yt: 0.61, topW: 0.85, flare: 0.065, lipY: 0.70, crown: 0.016 },
  { z: -1.13, hw: 0.995, yb: -0.12, hip: 0.47, yt: 0.64, topW: 0.76, flare: 0.050, lipY: 0.67, sill: 0.022, crown: 0.014 },
  { z: -0.62, hw: 0.96, yb: -0.195, hip: 0.42, yt: 0.79, topW: 0.62, sill: 0.035, tuck: 0.32, crease: 0.012, crown: 0.018 },
  { z: 0.22, hw: 0.95, yb: -0.195, hip: 0.41, yt: 0.81, topW: 0.62, sill: 0.035, tuck: 0.32, crease: 0.012, crown: 0.018 },
  { z: 0.64, hw: 0.955, yb: -0.17, hip: 0.405, yt: 0.52, topW: 0.78, sill: 0.020, crease: 0.010, crown: 0.015 },
  { z: 1.12, hw: 0.965, yb: -0.09, hip: 0.41, yt: 0.46, topW: 0.84, flare: 0.055, lipY: 0.69, crown: 0.016 },
  { z: 1.45, hw: 0.965, yb: 0.035, hip: 0.42, yt: 0.47, topW: 0.86, flare: 0.065, lipY: 0.72, crown: 0.017 },
  { z: 1.78, hw: 0.96, yb: -0.09, hip: 0.39, yt: 0.435, topW: 0.84, flare: 0.050, lipY: 0.69, crown: 0.013 },
  { z: 2.09, hw: 0.93, yb: -0.155, hip: 0.27, yt: 0.33, topW: 0.77, crown: 0.010 },
  { z: 2.27, hw: 0.86, yb: -0.16, hip: 0.12, yt: 0.18, topW: 0.68, crown: 0.006 },
  { z: 2.37, hw: 0.77, yb: -0.15, hip: 0.02, yt: 0.075, topW: 0.60, crown: 0.003, hard: true },
];
export const CAP_ROLL = { nose: 0.038, tail: 0.055 };
export const wheelStyle = 'gt';
const F = profileFractions(keys);
const GLASS = [
  { zStart: 0.61, zEnd: 0.28, beltFrac: F.tumble, topFrac: 1, steps: 12 },
  { zStart: 0.18, zEnd: -0.72, beltFrac: F.beltTuck, topFrac: F.topCorner, steps: 18 },
  { zStart: -0.82, zEnd: -1.24, beltFrac: F.tumble, topFrac: 1, steps: 12 },
];
const HEADLAMPS = [-1, 1].map(side => ({
  zStart: 2.26, zEnd: 1.88, beltFrac: F.beltTuck, topFrac: F.topCorner, steps: 13, side,
}));
const TAILLAMPS = [-1, 1].map(side => ({
  zStart: -2.10, zEnd: -2.26, beltFrac: F.beltTuck, topFrac: F.topCorner, steps: 6, side,
}));
const INTAKES = [-1, 1].map(side => ({
  zStart: -0.55, zEnd: -1.01, beltFrac: F.flankFoot, topFrac: F.shoulder, steps: 14, side,
}));
export const PANES = [...GLASS, ...HEADLAMPS, ...TAILLAMPS, ...INTAKES];

function buildSweptHeadlamps() {
  const group = new THREE.Group();
  const wells = buildPaneWells(keys, { panes: HEADLAMPS, depth: 0.026 });
  if (wells) group.add(new THREE.Mesh(wells, makeWell()));
  const seals = buildWindowSeals(keys, { panes: HEADLAMPS, width: 0.009, proud: 0.003 });
  if (seals) group.add(new THREE.Mesh(seals, makeTrim()));

  // A narrow white blade follows each fender, then hooks toward the outside.
  // Keep the backing black: a broad satin plate reflected the studio sky and
  // erased the individual projectors, making the entire lamp look white.
  const drl = buildPanelSeams(keys, [{
    path: [[2.23, F.topCorner - 0.025], [2.04, F.topCorner - 0.025],
      [1.91, F.tumble + 0.010]],
    width: 0.012, proud: -0.006, mirror: true,
  }]);
  if (drl) group.add(new THREE.Mesh(drl, makeHeadlight()));
  const forward = new THREE.Vector3(0, 0, 1);
  for (const side of [-1, 1]) for (const z of [2.15, 2.04]) {
    const { position, normal } = sampleSkin(keys, z, side * (F.beltTuck + 0.055));
    const surround = new THREE.Mesh(new THREE.TorusGeometry(0.023, 0.005, 5, 16), makeSatin());
    surround.quaternion.setFromUnitVectors(forward, normal);
    surround.position.copy(position).addScaledVector(normal, -0.012);
    group.add(surround);
    const projector = new THREE.Mesh(new THREE.CircleGeometry(0.016, 16), makeHeadlight());
    projector.quaternion.copy(surround.quaternion);
    projector.position.copy(position).addScaledVector(normal, -0.011);
    group.add(projector);
  }
  return group;
}

export function decorate(body, ctx) {
  body.add(new THREE.Mesh(buildGreenhouseShell(keys, { panes: GLASS }), makeGlass()));
  const seals = buildWindowSeals(keys, { panes: GLASS });
  if (seals) body.add(new THREE.Mesh(seals, makeTrim()));

  // The scoops are holes through the shell with recessed floors and walls.
  // Surface-following seals keep their edges attached to the changing haunch.
  const wells = buildPaneWells(keys, { panes: INTAKES, depth: 0.095 });
  if (wells) body.add(new THREE.Mesh(wells, makeWell()));
  const scoopEdges = buildWindowSeals(keys, { panes: INTAKES, width: 0.018, proud: 0.004 });
  if (scoopEdges) body.add(new THREE.Mesh(scoopEdges, makeTrim()));
  const lamps = buildApertureLamps(keys, F, {
    tail: TAILLAMPS, depth: 0.030,
  });
  body.add(lamps.group, buildSweptHeadlamps());

  const seams = buildPanelSeams(keys, [
    { path: [[0.73, F.topCorner], [0.73, 1], [0.73, -F.topCorner]] },
    { path: [[0.73, F.topCorner], [1.87, F.topCorner]], mirror: true },
    { path: [[1.87, F.topCorner], [1.87, 1], [1.87, -F.topCorner]] },
    { path: [[0.73, F.sillLip], [0.73, F.shoulder], [-0.43, F.shoulder],
      [-0.43, F.sillLip], [0.73, F.sillLip]], mirror: true },
    { path: [[-1.33, F.topCorner], [-1.33, 1], [-1.33, -F.topCorner]] },
    { path: [[-1.33, F.topCorner], [-2.05, F.topCorner]], mirror: true },
  ]);
  if (seams) body.add(new THREE.Mesh(seams, makeShutline()));
  body.add(buildInterior({ floorY: -0.055, dashZ: 0.55, seatZ: -0.37, bulkheadZ: -0.88,
    seatBackH: 0.46, halfWidth: 0.58, seatX: 0.31, wheelY: 0.43, wheelZ: 0.33, wheelR: 0.135 }));

  const tail = buildTaillights({ z: -2.335, y: 0.29, width: 1.43, height: 0.085,
    depth: 0.042, barH: 0.025, segments: 4, extraRed: [lamps.tailBlade] });
  body.add(tail.group);
  body.add(buildMirrors({ z: 0.39, y: 0.49, x: 0.95, color: ctx.color, indicator: false }));
  body.add(buildGrille({ z: 2.375, y: -0.05, w: 0.60, h: 0.09, depth: 0.035,
    bar: false, ductW: 0.19, ductH: 0.075, ductX: 0.46, ductY: -0.05 }));
  body.add(buildSplitter({ z: 2.29, y: -0.185, w: 1.37, canardX: 0.88,
    canardLen: 0.14, rods: false }));
  body.add(buildDiffuser({ z: -2.15, y: -0.25, w: 1.54, strakes: 5, roofRise: 0.10 }));
  body.add(buildWing({ z: -2.20, span: 1.52, deckY: 0.53, style: 'ducktail', gurney: false }));
  body.add(buildExhaust({ z: -2.35, y: 0.025, x: 0.55, r: 0.054, count: 2 }));
  body.add(buildBodyVents({ bonnetZ: -1.68, bonnetY: 0.605, bonnetX: 0.32,
    bonnetW: 0.33, bonnetL: 0.46, bonnetLouvres: 5, bonnetTilt: -0.025,
    gills: false, intakes: false }));
  body.add(buildBadgesAndPlate({ frontPose: sampleSkin(keys, 2.02, 1), rearZ: -2.345,
    rearY: 0.41, plateY: 0.105 }));
  body.add(buildUnderbody({ y: -0.26, w: 1.22, len: 3.72 }));
  body.add(buildArchLiners({ x: 0.845, width: 0.26, r: 0.413, lip: false }));
  return { brakeLights: tail.brakeMesh };
}
