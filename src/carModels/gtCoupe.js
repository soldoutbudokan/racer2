import * as THREE from 'three';
import {
  buildGreenhouseShell, buildPanelSeams, buildPaneWells, buildWindowSeals, profileFractions, sampleSkin,
} from './loftBuilder.js';
import { makeGlass, makeHeadlight, makeShutline, makeTrim, makeWell } from './carMaterials.js';
import { buildApertureLamps } from './apertureLamps.js';
import {
  buildTaillights, buildMirrors, buildGrille, buildDiffuser, buildExhaust,
  buildBadgesAndPlate, buildUnderbody, buildArchLiners, buildInterior,
  buildDoorFurniture, buildWipers,
} from './parts.js';

// A grand tourer inspired by British front-engine coupes: a long, crowned
// bonnet, rearward cabin and rounded rear haunches. The continuous roof and
// restrained trim leave the painted silhouette readable at racing distance.
// Axle-centred coordinates: hubs y=0, z=+/-1.45; tyre radius 0.36.
export const keys = [
  { z: -2.22, hw: 0.810, yb: -0.120, hip: 0.275, yt: 0.420, topW: 0.62, hard: true, crown: 0.010 },
  { z: -2.03, hw: 0.920, yb: -0.095, hip: 0.390, yt: 0.520, topW: 0.77, crown: 0.016 },
  { z: -1.77, hw: 0.966, yb: -0.040, hip: 0.460, yt: 0.590, topW: 0.85,
    flare: 0.045, lipY: 0.72, crease: 0.006, crown: 0.020 },
  { z: -1.45, hw: 0.975, yb: 0.045, hip: 0.495, yt: 0.660, topW: 0.85,
    flare: 0.055, lipY: 0.72, crease: 0.006, crown: 0.022 },
  { z: -1.12, hw: 0.964, yb: -0.090, hip: 0.490, yt: 0.845, topW: 0.75,
    flare: 0.042, lipY: 0.70, sill: 0.018, crease: 0.006, crown: 0.025 },
  { z: -0.73, hw: 0.948, yb: -0.185, hip: 0.475, yt: 1.005, topW: 0.68,
    sill: 0.026, crease: 0.006, tuck: 0.30, crown: 0.030 },
  { z: -0.15, hw: 0.940, yb: -0.190, hip: 0.470, yt: 1.030, topW: 0.67,
    sill: 0.026, crease: 0.006, tuck: 0.30, crown: 0.030 },
  { z: 0.21, hw: 0.943, yb: -0.185, hip: 0.467, yt: 0.960, topW: 0.70,
    sill: 0.025, crease: 0.006, tuck: 0.30, crown: 0.025 },
  { z: 0.60, hw: 0.952, yb: -0.155, hip: 0.460, yt: 0.645, topW: 0.80,
    sill: 0.023, crease: 0.006, crown: 0.022 },
  { z: 1.12, hw: 0.962, yb: -0.065, hip: 0.470, yt: 0.575, topW: 0.83,
    flare: 0.048, lipY: 0.69, sill: 0.010, crease: 0.006, crown: 0.026 },
  { z: 1.45, hw: 0.965, yb: 0.045, hip: 0.485, yt: 0.565, topW: 0.85,
    flare: 0.053, lipY: 0.72, crease: 0.006, crown: 0.028 },
  { z: 1.78, hw: 0.954, yb: -0.055, hip: 0.445, yt: 0.520, topW: 0.83,
    flare: 0.045, lipY: 0.70, crease: 0.005, crown: 0.025 },
  { z: 2.06, hw: 0.920, yb: -0.135, hip: 0.355, yt: 0.440, topW: 0.78, crown: 0.018 },
  { z: 2.24, hw: 0.860, yb: -0.145, hip: 0.245, yt: 0.320, topW: 0.70, crown: 0.012 },
  { z: 2.35, hw: 0.755, yb: -0.140, hip: 0.130, yt: 0.200, topW: 0.60, hard: true, crown: 0.005 },
];

export const CAP_ROLL = { nose: 0.055, tail: 0.065 };
export const wheelStyle = 'gt';
const F = profileFractions(keys);

const GLASS_PANES = [
  { zStart: 0.575, zEnd: 0.255, beltFrac: F.tumble, topFrac: 1, steps: 10 },
  { zStart: 0.140, zEnd: -0.965, beltFrac: F.beltTuck, topFrac: F.topCorner, steps: 18 },
  { zStart: -1.085, zEnd: -1.560, beltFrac: F.tumble, topFrac: 1, steps: 12 },
];
const HEADLAMP_PANES = [-1, 1].map(side => ({
  zStart: 2.235, zEnd: 2.145, beltFrac: F.beltTuck, topFrac: F.crownEdge, steps: 7, side,
}));
const TAILLAMP_PANES = [-1, 1].map(side => ({
  zStart: -1.995, zEnd: -2.155, beltFrac: F.beltTuck, topFrac: F.topCorner, steps: 6, side,
}));
export const PANES = [...GLASS_PANES, ...HEADLAMP_PANES, ...TAILLAMP_PANES];

const SHUT_LINES = [
  { path: [[0.665, F.topCorner], [0.665, 1], [0.665, -F.topCorner]] },
  { path: [[1.980, F.topCorner], [1.980, 1], [1.980, -F.topCorner]] },
  { path: [[0.665, F.topCorner], [1.980, F.topCorner]], mirror: true },
  { path: [[0.625, F.sillLip], [0.625, F.shoulder], [-0.850, F.shoulder],
    [-0.850, F.sillLip], [0.625, F.sillLip]], mirror: true },
  { path: [[-1.650, F.topCorner], [-1.650, 1], [-1.650, -F.topCorner]] },
  { path: [[-1.650, F.topCorner], [-2.020, F.topCorner]], mirror: true },
];

// The shared side recesses face inward; turn only their quarter-turn groups.
function faceOutboard(group) {
  group.traverse(o => {
    if (Math.abs(Math.abs(o.rotation.y) - Math.PI / 2) < 1e-6) o.rotation.y = -o.rotation.y;
  });
  return group;
}

let cabinGlass;
function makeCabinGlass() {
  if (!cabinGlass) {
    cabinGlass = makeGlass().clone();
    cabinGlass.opacity = 0.94;
    cabinGlass.roughness = 0.12;
    cabinGlass.envMapIntensity = 0.65;
  }
  return cabinGlass;
}

function buildSweptHeadlights() {
  const group = new THREE.Group();
  group.add(new THREE.Mesh(buildPaneWells(keys, { panes: HEADLAMP_PANES, depth: 0.022 }), makeWell()));
  group.add(new THREE.Mesh(buildWindowSeals(keys, { panes: HEADLAMP_PANES, width: 0.008, proud: 0.003 }), makeTrim()));
  // A transverse LED follows the fender curve inside a shallow, dark opening.
  // No full-area silver reflector or white lens to become a bright rectangle.
  const blade = buildPanelSeams(keys, [{
    path: [[2.207, F.beltTuck + 0.012], [2.207, F.crownEdge - 0.012]],
    mirror: true, width: 0.014, proud: -0.006,
  }]);
  group.add(new THREE.Mesh(blade, makeHeadlight()));
  return group;
}

export function decorate(body, ctx) {
  body.add(new THREE.Mesh(buildGreenhouseShell(keys, { panes: GLASS_PANES }), makeCabinGlass()));
  const seals = buildWindowSeals(keys, { panes: GLASS_PANES, width: 0.011 });
  if (seals) body.add(new THREE.Mesh(seals, makeTrim()));
  const shut = buildPanelSeams(keys, SHUT_LINES);
  if (shut) body.add(new THREE.Mesh(shut, makeShutline()));

  const lamps = buildApertureLamps(keys, F, { tail: TAILLAMP_PANES });
  body.add(lamps.group);
  body.add(buildSweptHeadlights());
  const tail = buildTaillights({
    z: -2.224, y: 0.255, width: 1.22, height: 0.095, depth: 0.030,
    barH: 0.028, extraRed: [lamps.tailBlade], fog: false, indicator: false,
  });
  body.add(tail.group);
  body.add(buildGrille({
    z: 2.353, y: 0.025, w: 0.84, h: 0.140, depth: 0.026,
    ductW: 0.125, ductH: 0.075, ductX: 0.565, ductY: 0.005,
  }));
  body.add(buildBadgesAndPlate({
    frontPose: sampleSkin(keys, 2.28, 1), rearZ: -2.232, rearY: 0.130, plateY: -0.015,
  }));
  body.add(buildDiffuser({ z: -2.02, y: -0.245, w: 1.24, strakes: 3, fences: false }));
  body.add(buildExhaust({ z: -2.255, y: -0.035, x: 0.52, count: 2, r: 0.043 }));

  body.add(buildMirrors({ z: 0.405, y: 0.445, x: 0.915, color: ctx.color }));
  const cowl = sampleSkin(keys, 0.595, 1).position;
  body.add(buildWipers({ z: 0.595, y: cowl.y + 0.006, x: 0.24, len: 0.42, tilt: 0.075, rake: 0.08 }));
  body.add(faceOutboard(buildDoorFurniture({
    x: 0.938, handleY: 0.417, handleZ: -0.53, handleW: 0.14, repeater: false, fuel: false,
  })));
  body.add(faceOutboard(buildDoorFurniture({
    handles: false, repeater: false, fuelX: 0.978, fuelY: 0.435,
    fuelZ: -1.48, fuelR: 0.060, color: ctx.color,
  })));

  body.add(buildInterior({
    floorY: -0.015, dashZ: 0.49, dashH: 0.16, seatZ: -0.44, bulkheadZ: -1.10,
    seatX: 0.34, seatBackH: 0.57, halfWidth: 0.62,
    wheelR: 0.15, wheelZ: 0.27, wheelY: 0.49, driverX: -0.32,
    seats: 2, cage: false, harness: false,
  }));
  body.add(buildUnderbody({ y: -0.250, w: 1.20, len: 3.60 }));
  body.add(buildArchLiners({ zF: 1.45, zR: -1.45, x: 0.840, r: 0.413, width: 0.26, lip: false }));
  return { brakeLights: tail.brakeMesh };
}
