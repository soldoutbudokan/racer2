import * as THREE from 'three';
import {
  buildGreenhouseShell, buildPanelSeams, buildWindowSeals, profileFractions,
} from './loftBuilder.js';
import { makeGlass, makeTrim, makeCarbon, makeShutline } from './carMaterials.js';
import {
  buildHeadlights, buildTaillights, buildMirrors, buildGrille, buildSplitter,
  buildDiffuser, buildWing, buildExhaust, buildBadgesAndPlate, buildUnderbody,
  buildArchLiners, buildInterior, buildDoorFurniture, buildBodyVents, buildWipers,
  buildTowEye, buildAerial,
} from './parts.js';

// Muscle car — long flat hood, cabin set well rearward, upright notchback with
// a distinct rear deck shelf, high shoulder haunches, hood scoop, ducktail,
// quad exhaust and a roll cage you can see through the big upright glass.
//
// Deliberately NOT the GT at a different scale. The two cars differ in the
// things the eye actually reads at race distance:
//   roofline   1.30 m tall upright notchback  vs the GT's 1.22 m fastback
//   hood       1.78 m from cowl to fascia     vs 1.52 m
//   cabin      centred at z -0.21             vs z -0.07 (cab-forward)
//   width cue  widest at the SHOULDER crease  vs widest at the ARCH lip
//   roof       fully painted (mandatory here) vs one inset glass panel
//
// Axle-centred frame (wheel centre y 0, ground -0.36, axles z +/-1.45, tyre
// outer face x 1.00). See gtCoupe.js for the shape rules this table obeys —
// they are the same, and the reasons are recorded there.
export const keys = [
  // z,      hw,     yb,     hip,   yt,    topW  + surface features
  { z: -2.24, hw: 0.900, yb: -0.085, hip: 0.360, yt: 0.560, topW: 0.70, hard: true },
  { z: -2.04, hw: 0.975, yb: -0.060, hip: 0.430, yt: 0.625, topW: 0.83,
    crease: 0.012, creaseY: 0.80 },
  { z: -1.78, hw: 1.000, yb: -0.030, hip: 0.480, yt: 0.650, topW: 0.88,
    flare: 0.040, lipY: 0.68, crease: 0.017, creaseY: 0.82, sill: 0.010 },
  { z: -1.45, hw: 1.005, yb:  0.060, hip: 0.500, yt: 0.660, topW: 0.90,
    flare: 0.030, lipY: 0.70, crease: 0.018, creaseY: 0.83 },    // rear axle
  { z: -1.16, hw: 1.000, yb: -0.085, hip: 0.495, yt: 0.760, topW: 0.82,
    flare: 0.040, lipY: 0.66, sill: 0.022, crease: 0.016, creaseY: 0.79 },
  // Roof authored at its two ends only — Catmull carries the crown to y ~0.940
  // between them (see gtCoupe.js).
  { z: -0.86, hw: 0.992, yb: -0.170, hip: 0.490, yt: 0.905, topW: 0.75,
    sill: 0.032, crease: 0.014, creaseY: 0.815, tuck: 0.30 },    // C-pillar
  { z:  0.00, hw: 0.988, yb: -0.188, hip: 0.480, yt: 0.930, topW: 0.74,
    sill: 0.034, crease: 0.013, creaseY: 0.830, tuck: 0.30 },    // header rail
  { z:  0.36, hw: 0.995, yb: -0.175, hip: 0.475, yt: 0.715, topW: 0.79,
    sill: 0.030, crease: 0.013, creaseY: 0.833 },                // cowl
  { z:  1.10, hw: 1.005, yb: -0.060, hip: 0.480, yt: 0.565, topW: 0.87,
    flare: 0.042, lipY: 0.66, sill: 0.012, crease: 0.012, creaseY: 0.84 },
  { z:  1.45, hw: 1.005, yb:  0.060, hip: 0.490, yt: 0.555, topW: 0.88,
    flare: 0.030, lipY: 0.70, crease: 0.014, creaseY: 0.83 },    // front axle
  { z:  1.80, hw: 1.002, yb: -0.050, hip: 0.470, yt: 0.550, topW: 0.87,
    flare: 0.038, lipY: 0.68, crease: 0.012, creaseY: 0.84 },
  { z:  2.14, hw: 0.985, yb: -0.125, hip: 0.395, yt: 0.535, topW: 0.85,
    hard: true, crease: 0.007, creaseY: 0.85 },                  // leading edge
  { z:  2.24, hw: 0.965, yb: -0.140, hip: 0.350, yt: 0.480, topW: 0.82 },
  { z:  2.32, hw: 0.900, yb: -0.145, hip: 0.300, yt: 0.420, topW: 0.74, hard: true },
];

export const wheelStyle = 'muscle';

// Landmark fractions of THIS car's cross-section — see gtCoupe.js.
const F = profileFractions(keys);

// Glazing: windshield, door glass, quarter light, backlight. Every side pane
// stops at F.topCorner (the roof rail), so THE ROOF CROWN STAYS PAINTED. That
// is mandatory on this car: a panoramic glass roof was defensible on a concept
// GT and plainly wrong here, and it was the single worst-looking thing on the
// model. There is no roof panel at all — the crown is one continuous pressing
// from header to backlight.
const PANES = [
  { zStart: 0.36, zEnd: 0.10, beltFrac: F.tumble, topFrac: 1.0, steps: 7 },   // windshield
  //                          z 0.10 -> 0.00 painted: A-pillar / header
  { zStart: 0.00, zEnd: -0.56, beltFrac: F.beltTuck, topFrac: F.topCorner, steps: 10 },
  //                          z -0.56 -> -0.64 painted: B-pillar
  { zStart: -0.64, zEnd: -0.94, beltFrac: F.beltTuck, topFrac: F.topCorner, steps: 6 },
  //                          z -0.94 -> -1.08 painted: C-pillar
  { zStart: -1.08, zEnd: -1.42, beltFrac: F.tumble, topFrac: 1.0, steps: 9 },  // backlight
];

// Panel structure — see gtCoupe.js for the (z, profile-fraction) convention.
// The long flat hood and the upright cabin make the shut lines matter more here
// than on the GT: without them the whole flank is one pressing.
const SHUT_LINES = [
  { path: [[0.46, F.topCorner], [0.46, 1.00], [0.46, -F.topCorner]] },
  { path: [[2.06, F.topCorner], [2.06, 1.00], [2.06, -F.topCorner]] },
  { path: [[0.48, F.topCorner], [2.06, F.topCorner]], mirror: true },
  // Door — long, as a two-door coupe's is; top edge on the shoulder crease,
  // bottom on the rocker step.
  {
    path: [[0.44, F.sillLip], [0.44, F.shoulder], [-0.86, F.shoulder],
      [-0.86, F.sillLip], [0.44, F.sillLip]],
    mirror: true,
  },
  // Boot lid, starting behind the backlight and running under the ducktail lip
  // (which sits on it, z -1.89..-1.59).
  { path: [[-1.48, F.topCorner], [-1.48, 1.00], [-1.48, -F.topCorner]] },
  { path: [[-2.08, F.topCorner], [-2.08, 1.00], [-2.08, -F.topCorner]] },
  { path: [[-1.48, F.topCorner], [-2.08, F.topCorner]], mirror: true },
];

// See the identical note in gtCoupe.js: parts.js yaws its side-facing recesses
// the wrong way (`-sx * PI/2` sends local +z inboard on BOTH flanks), so every
// door handle / gill / side intake would be buried inside the shell. Flip the
// quarter-turns until parts.js is fixed.
function faceOutboard(group) {
  group.traverse((o) => {
    if (Math.abs(Math.abs(o.rotation.y) - Math.PI / 2) < 1e-6) o.rotation.y = -o.rotation.y;
  });
  return group;
}

export function decorate(body, ctx) {
  const glass = new THREE.Mesh(buildGreenhouseShell(keys, { panes: PANES }), makeGlass());
  body.add(glass);

  const seals = buildWindowSeals(keys, { panes: PANES });
  if (seals) {
    const m = new THREE.Mesh(seals, makeTrim());
    m.receiveShadow = true;
    body.add(m);
  }

  const shut = buildPanelSeams(keys, SHUT_LINES);
  if (shut) {
    const m = new THREE.Mesh(shut, makeShutline());
    m.receiveShadow = true;
    body.add(m);
  }

  // Power-bulge hood scoop, half-sunk into the flat hood plane (yt ~0.55 there).
  // This car gets a scoop instead of the GT's bonnet extractors — the vents
  // would fight it for the same panel.
  const scoop = new THREE.Mesh(new THREE.BoxGeometry(0.60, 0.11, 0.90), makeTrim());
  scoop.position.set(0, 0.575, 1.10);
  scoop.castShadow = true;
  body.add(scoop);
  const scoopMouth = new THREE.Mesh(new THREE.BoxGeometry(0.50, 0.075, 0.10), makeCarbon());
  scoopMouth.position.set(0, 0.590, 1.56);
  body.add(scoopMouth);

  // ---- Fascia parts. Nose cap plane at z 2.32 spanning y -0.145..0.42
  // (half-width ~0.87 at grille height); tail cap plane at z -2.24 spanning
  // y -0.085..0.56. Group origins sit ON those planes — see gtCoupe.js.
  // See the long note in gtCoupe.js: the cap is a flat wall, so the cluster
  // origin sits ON it (2.320) and the housing is 36 mm deep instead of 72 —
  // otherwise the whole tub, 105 mm of it, hangs off the fascia as a box.
  // x 0.58 already keeps the bezel's top-outer corner (0.813) inside the cap
  // outline (0.822 at the lamp's top edge y 0.353), so it is unchanged.
  body.add(buildHeadlights({
    z: 2.320, y: 0.26, x: 0.58, width: 0.44, height: 0.16,
    depth: 0.036, yaw: 0.04, pitch: -0.04,
  }));
  const tail = buildTaillights({
    z: -2.235, y: 0.32, width: 1.44, height: 0.16, depth: 0.058, segments: 8,
  });
  body.add(tail.group);
  body.add(buildGrille({ z: 2.325, y: 0.06, w: 1.05, h: 0.20 }));
  body.add(buildTowEye({ z: 2.325, y: -0.095, x: 0.34, r: 0.042 }));
  body.add(buildSplitter({
    z: 2.26, y: -0.165, w: 1.36, canardX: 0.88, canardLen: 0.14,
  }));
  // rearZ sits 12 mm behind the tail cap plane (-2.240) — see the note in
  // gtCoupe.js. At the old -2.235 the plate quad and the badge disc both landed
  // exactly ON the cap and z-fought it.
  body.add(buildBadgesAndPlate({
    frontZ: 2.325, frontY: 0.30, rearZ: -2.252, rearY: 0.16, plateY: 0.02,
  }));
  body.add(buildDiffuser({ z: -2.00, y: -0.26, w: 1.46 }));
  body.add(buildExhaust({ z: -2.28, y: 0.06, x: 0.46, count: 4, r: 0.048 }));
  // deck top at z -1.74 is y ~0.650; the ducktail lip lands on it, not above it
  body.add(buildWing({ z: -1.90, deckY: 0.640, span: 1.56, style: 'ducktail' }));

  // ---- Body surface details, measured off the flank at each station.
  body.add(buildMirrors({ z: 0.32, y: 0.450, x: 0.938, color: ctx.color }));
  body.add(buildWipers({ z: 0.41, y: 0.700, x: 0.28, len: 0.50, tilt: 0.10, rake: 0.06 }));
  // Classic whip mast rather than the GT's shark fin.
  body.add(buildAerial({ z: -1.00, y: 0.865, style: 'whip' }));
  // Handle and repeater sit on different parts of the flank (door shoulder
  // 0.988, fender haunch 1.012), so they get a call each — see gtCoupe.js.
  body.add(faceOutboard(buildDoorFurniture({
    x: 0.986, handleY: 0.42, handleZ: -0.28, handleW: 0.17,
    repeater: false, fuel: false,
  })));
  body.add(faceOutboard(buildDoorFurniture({
    handles: false, x: 1.010, repeaterY: 0.36, repeaterZ: 0.90,
    fuelX: 1.018, fuelY: 0.42, fuelZ: -1.30, fuelSide: -1, fuelR: 0.075,
    color: ctx.color,
  })));
  body.add(faceOutboard(buildBodyVents({
    bonnet: false, intakes: false,          // scoop above; no mid-engine intakes
    // Flank falls 1.0025 -> 0.9929 across the stack, so 5 mm a slot (see the
    // gillStep note in parts.js); the default 4 left the last slot floating.
    gillZ: 0.80, gillY: 0.28, gillX: 1.000,
    gillW: 0.060, gillH: 0.13, gillCount: 3, gillGap: 0.080, gillStep: 0.005,
  })));

  // ---- Cabin, with a bolt-in cage: this is a street brawler, and the hoop is
  // the one thing that reads instantly through the big upright side glass.
  body.add(buildInterior({
    floorY: -0.01, dashZ: 0.28, dashH: 0.17, seatZ: -0.50, bulkheadZ: -1.05,
    seatX: 0.36, seatBackH: 0.56, halfWidth: 0.64,
    wheelR: 0.16, wheelZ: 0.10, wheelY: 0.46, driverX: -0.34,
    seats: 2, cage: true, harness: true,
  }));

  body.add(buildUnderbody({ y: -0.245, w: 1.24, len: 3.7 }));
  body.add(buildArchLiners({ zF: 1.45, zR: -1.45, x: 0.850, r: 0.41, width: 0.27 }));

  return { brakeLights: tail.brakeMesh };
}
