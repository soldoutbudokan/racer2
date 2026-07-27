import * as THREE from 'three';
import {
  buildGreenhouseShell, buildPanelSeams, buildWindowSeals, profileFractions,
} from './loftBuilder.js';
import { makeGlass, makeShutline, makeTrim } from './carMaterials.js';
import {
  buildHeadlights, buildTaillights, buildMirrors, buildGrille, buildSplitter,
  buildDiffuser, buildWing, buildExhaust, buildBadgesAndPlate, buildUnderbody,
  buildArchLiners, buildInterior, buildDoorFurniture, buildBodyVents, buildWipers,
  buildTowEye, buildAerial,
} from './parts.js';

// GT coupe — mid-engined supercar: cab-forward fastback, blistered wheel
// arches, a deep inset rocker and a blunt bumper-height fascia.
//
// Authored in the AXLE-CENTRED frame: wheel centre = y 0, wheel radius 0.36
// (so ground = -0.36), axles at z +/-1.45, tyre outer face at x 1.00.
//
// SHAPE RULES THIS TABLE OBEYS (they are not style choices — breaking one
// produces a specific artefact that has bitten this car before):
//
//  * `hip` is the BELTLINE, not a low rubbing strip. It is the widest point of
//    the section and IDX.shoulder is always a tangent break, so hip is where
//    the shoulder crease runs. It used to sit at y 0.05-0.16, which put the
//    body's widest line at ankle height and left the whole flank above it as
//    one melted tumblehome — the "soap bar" read — and it also meant the
//    greenhouse's belt fraction landed halfway down the door, which is why the
//    old canopy swallowed the entire upper body.
//  * At the axle stations the flank must stay INBOARD of the tyre face (1.00)
//    up to about y 0.30, and only the arch lip may cross it. The hull is a
//    closed loft with no cut-out, so anything outboard of 1.00 in the tyre's
//    swept volume is paint drawn in FRONT of the wheel: flare too low and the
//    fender simply eats the tyre.
//  * The arch blister has to span the whole arch mouth (z +/-0.33 either side
//    of the axle), not just the axle station, or the arch liner's rolled lip
//    pokes outboard of the body and reads as a black crescent painted on the
//    fender (the 2026-07-15 regression).
//  * Nose: the last stations used to shrink to a small rounded cap, so Catmull
//    rolled the hood straight into a whale nose. Now the hood plane runs into a
//    `hard` leading-edge station at z 2.08 (a real crease right around the
//    body, which doubles as the bumper parting line) and the fascia below it is
//    a near-vertical panel ending in a `hard` cap at z 2.27.
export const keys = [
  // z,      hw,     yb,     hip,   yt,    topW  + surface features
  { z: -2.20, hw: 0.840, yb: -0.100, hip: 0.300, yt: 0.455, topW: 0.62, hard: true },
  { z: -2.00, hw: 0.930, yb: -0.075, hip: 0.375, yt: 0.505, topW: 0.76,
    crease: 0.007, creaseY: 0.78 },
  { z: -1.76, hw: 0.960, yb: -0.040, hip: 0.445, yt: 0.545, topW: 0.85,
    flare: 0.060, lipY: 0.70, crease: 0.011, creaseY: 0.80, sill: 0.010 },
  { z: -1.45, hw: 0.965, yb:  0.050, hip: 0.465, yt: 0.585, topW: 0.86,
    flare: 0.075, lipY: 0.715, crease: 0.010, creaseY: 0.79 },   // rear axle
  { z: -1.14, hw: 0.970, yb: -0.095, hip: 0.465, yt: 0.720, topW: 0.80,
    flare: 0.062, lipY: 0.66, sill: 0.022, crease: 0.011, creaseY: 0.755 },
  // Roof: only its two ENDS are authored. Catmull carries the crown between
  // them to y ~0.865 at z -0.32 on its own, so a third mid-roof station would
  // cost 756 triangles to restate a curve the loft already draws.
  { z: -0.80, hw: 0.962, yb: -0.180, hip: 0.455, yt: 0.840, topW: 0.72,
    sill: 0.032, crease: 0.011, creaseY: 0.795, tuck: 0.30 },    // C-pillar top
  { z:  0.16, hw: 0.958, yb: -0.195, hip: 0.445, yt: 0.850, topW: 0.70,
    sill: 0.034, crease: 0.011, creaseY: 0.818, tuck: 0.31 },    // header rail
  { z:  0.50, hw: 0.965, yb: -0.175, hip: 0.438, yt: 0.650, topW: 0.75,
    sill: 0.030, crease: 0.011, creaseY: 0.823, tuck: 0.30 },    // cowl
  { z:  1.12, hw: 0.968, yb: -0.070, hip: 0.440, yt: 0.520, topW: 0.83,
    flare: 0.060, lipY: 0.66, sill: 0.012, crease: 0.010, creaseY: 0.82 },
  { z:  1.45, hw: 0.960, yb:  0.050, hip: 0.450, yt: 0.505, topW: 0.85,
    flare: 0.068, lipY: 0.72, crease: 0.009, creaseY: 0.80 },    // front axle
  { z:  1.78, hw: 0.955, yb: -0.055, hip: 0.430, yt: 0.500, topW: 0.84,
    flare: 0.055, lipY: 0.68, crease: 0.009, creaseY: 0.81 },
  { z:  2.08, hw: 0.945, yb: -0.140, hip: 0.355, yt: 0.470, topW: 0.80,
    hard: true, crease: 0.005, creaseY: 0.83 },                  // leading edge
  { z:  2.19, hw: 0.925, yb: -0.155, hip: 0.310, yt: 0.400, topW: 0.76 },
  { z:  2.27, hw: 0.845, yb: -0.160, hip: 0.255, yt: 0.325, topW: 0.68, hard: true },
];

export const wheelStyle = 'gt';

// Named landmark fractions of THIS car's cross-section. Every seam path,
// glazing edge and seal below is authored against these — the old hard-coded
// 0.27/0.53/0.60/0.80 were the LEGACY 16-point profile's landmarks and are
// meaningless now that the surfaced profile has its own 22-point ladder. Stale
// numbers here put a door cut through the middle of a window.
const F = profileFractions(keys);

// ---------------------------------------------------------------------------
// Glazing. A real glasshouse, not a canopy: separate windshield, side glass
// and backlight, each its own pane, with PAINTED structure between them.
//
// The side pane stops at F.topCorner (the roof rail), which is what leaves the
// crown between the rails painted — the fix for the panoramic-glass-roof
// Backlog item. The GT keeps one modest glass roof PANEL inboard of the rails
// (F.crownEdge -> over the crown), which is a panel with a rubber surround, not
// a bubble canopy.
//
// The windshield and backlight start at F.tumble rather than the glass sill:
// a crown-crossing pane holds one fraction for its whole z range, so taking it
// down to the sill would wrap the windshield back along the beltline and leave
// no A-pillar to speak of. F.tumble puts their lower corners partway down the
// tumblehome, exactly where a wrapped screen ends.
const PANES = [
  { zStart: 0.50, zEnd: 0.20, beltFrac: F.tumble, topFrac: 1.0, steps: 8 },   // windshield
  //                          z 0.20 -> 0.10 stays painted: the A-pillar/header
  { zStart: 0.10, zEnd: -1.00, beltFrac: F.beltTuck, topFrac: F.topCorner, steps: 18 },
  //                          z -1.00 -> -1.12 stays painted: the C-pillar
  { zStart: -1.12, zEnd: -1.48, beltFrac: F.tumble, topFrac: 1.0, steps: 9 },  // backlight
  { zStart: -0.70, zEnd: -0.14, beltFrac: F.crownEdge, topFrac: 1.0, steps: 9 }, // roof panel
];

// Panel structure. Paths are (z, profile-fraction) waypoints on the skin.
const SHUT_LINES = [
  // Hood: cowl edge, leading edge just behind the z 2.08 fascia crease, and
  // the fender seam down each flank at the top corner of the section.
  { path: [[0.60, F.topCorner], [0.60, 1.00], [0.60, -F.topCorner]] },
  { path: [[2.02, F.topCorner], [2.02, 1.00], [2.02, -F.topCorner]] },
  { path: [[0.62, F.topCorner], [2.02, F.topCorner]], mirror: true },
  // Door: one closed loop per side. Top edge on the shoulder crease (the belt),
  // bottom edge on the rocker step, so the loop reads as a door under a window
  // rather than a rectangle floating in the middle of the flank. Kept one
  // profile index below F.beltTuck so it cannot collide with the window seal,
  // which is centred exactly on the glass sill.
  {
    path: [[0.62, F.sillLip], [0.62, F.shoulder], [-0.78, F.shoulder],
      [-0.78, F.sillLip], [0.62, F.sillLip]],
    mirror: true,
  },
  // Engine/boot deck, behind the backlight and clear of the wing posts
  // (which straddle z -1.89..-1.79).
  { path: [[-1.56, F.topCorner], [-1.56, 1.00], [-1.56, -F.topCorner]] },
  { path: [[-2.02, F.topCorner], [-2.02, 1.00], [-2.02, -F.topCorner]] },
  { path: [[-1.56, F.topCorner], [-2.02, F.topCorner]], mirror: true },
];

// parts.js builds every side-facing recess (door handles, fender gills, side
// intakes) as a group yawed by `-sx * PI/2`. Three.js maps local +z to
// (sin(theta), 0, cos(theta)), so that yaw points the opening's mouth INBOARD
// on both flanks and the whole recess ends up buried inside the shell. Flip the
// quarter-turns back until parts.js is fixed; every other rotation in those
// builders is a half-turn or a small yaw and is left alone. (Cylindrical parts
// that legitimately use a quarter-turn — the fuel flap ring — are symmetric
// about their own axis, so flipping them is a no-op.)
function faceOutboard(group) {
  group.traverse((o) => {
    if (Math.abs(Math.abs(o.rotation.y) - Math.PI / 2) < 1e-6) o.rotation.y = -o.rotation.y;
  });
  return group;
}

export function decorate(body, ctx) {
  const glass = new THREE.Mesh(buildGreenhouseShell(keys, { panes: PANES }), makeGlass());
  body.add(glass);

  // Rubber weatherstrip around every pane. This is what makes the glazing read
  // as glazing: a hard shadowed border, and it hides the belt/rail edge where
  // glass meets paint. It also replaces the old body-coloured pillar ribbon,
  // which — laid on top of a canopy that covered the whole cabin — was the
  // "red spider web over a bubble" read.
  const seals = buildWindowSeals(keys, { panes: PANES });
  if (seals) {
    const m = new THREE.Mesh(seals, makeTrim());
    m.receiveShadow = true;
    body.add(m);
  }

  const shut = buildPanelSeams(keys, SHUT_LINES);
  if (shut) {
    const m = new THREE.Mesh(shut, makeShutline());
    m.receiveShadow = true;      // no castShadow: 10 mm ribbons only self-shadow
    body.add(m);
  }

  // ---- Fascia parts. The hull's nose cap is a plane at z 2.27 spanning
  // y -0.16..0.325 (half-width ~0.81 at bumper height), the tail cap a plane at
  // z -2.20 spanning y -0.10..0.455. Recessed parts are placed ON those planes:
  // addOpening builds its floor 10 mm out and its rim `depth` out, so the group
  // origin belongs on the skin, never behind it (behind it the opaque cap plane
  // occludes the whole recess).
  //
  // THE CAP IS A WALL, NOT A CURVE. Every number here follows from that:
  //  * `z` is the cap plane exactly (2.270), not 5 mm in front of it. The
  //    housing then stands `depth` proud and nothing more.
  //  * `depth` is 35 mm, not 70. The old 70 mm housing plus yaw reached z 2.372
  //    — a full 100 mm of tub hanging off a flat slab, which is the
  //    "bolted-on box" read this file's own risk note anticipated. It was
  //    survivable while the nose still curved forward past the lamp; it is not
  //    now that the nose terminates in a wall.
  //  * `x` is 0.550, so the top-outer corner of the bezel (0.550 + width/2 +
  //    lipT = 0.773) stays inside the cap outline, which has already pulled in
  //    to 0.789 by the lamp's top edge at y 0.273. At the old 0.575 the bezel
  //    overhung the fascia silhouette into open space.
  //  * `yaw` is nearly nothing. Wrapping a lamp around the nose needs a nose to
  //    wrap around; on a plane it only levers the outer end further forward.
  body.add(buildHeadlights({
    z: 2.270, y: 0.19, x: 0.550, width: 0.42, height: 0.14,
    depth: 0.035, yaw: 0.04, pitch: -0.06,
  }));
  const tail = buildTaillights({
    z: -2.195, y: 0.245, width: 1.30, height: 0.145, depth: 0.056,
  });
  body.add(tail.group);
  body.add(buildGrille({ z: 2.275, y: 0.03, w: 0.78, h: 0.15 }));
  body.add(buildTowEye({ z: 2.275, y: -0.105, x: 0.30, r: 0.040 }));
  body.add(buildSplitter({
    z: 2.20, y: -0.175, w: 1.28, canardX: 0.86, canardLen: 0.14,
  }));
  // rearZ is 12 mm BEHIND the tail cap plane (-2.200), not 5 mm in front of it.
  // buildBadgesAndPlate hangs the plate at rearZ-0.005 and the recess tub's lip
  // face at rearZ-0.006, so at the old -2.195 the plate landed at exactly
  // z -2.200 — a 0.42 x 0.13 textured quad sharing a depth value with the flat
  // opaque cap, i.e. stipple across the number plate that swims with the
  // camera. The badge disc (rearZ .. rearZ+0.010) was buried in the same plane.
  // Front badge needs no such shift: frontZ 2.275 already stands 5 mm off the
  // nose cap and the disc runs forward from there.
  body.add(buildBadgesAndPlate({
    frontZ: 2.275, frontY: 0.155, rearZ: -2.212, rearY: 0.135, plateY: -0.005,
  }));
  body.add(buildDiffuser({ z: -1.98, y: -0.27, w: 1.38 }));
  body.add(buildExhaust({ z: -2.24, y: 0.02, x: 0.40, count: 2, r: 0.050 }));
  // deck top at z -1.86 is y ~0.530, so the posts have something to stand on
  body.add(buildWing({ z: -1.86, y: 0.79, span: 1.48, deckY: 0.530, style: 'gt' }));

  // ---- Body surface details, each placed against the actual flank at its
  // station (the flank is no longer a constant radius, so these numbers come
  // off the profile at that z, not off `hw`).
  // y 0.48 sat the pod ON the beltline crease (hip runs 0.44-0.50 here), so it
  // poked up into the glass line at the A-pillar base. A door mirror mounts on
  // the door skin just BELOW the belt.
  body.add(buildMirrors({ z: 0.30, y: 0.415, x: 0.918, color: ctx.color }));
  body.add(buildWipers({ z: 0.56, y: 0.631, x: 0.24, len: 0.44, tilt: 0.10, rake: 0.06 }));
  body.add(buildAerial({ z: -0.86, y: 0.832, style: 'fin', color: ctx.color, len: 0.22 }));
  // buildDoorFurniture presses handle AND repeater against the same `x`, but
  // the flank is no longer a cylinder: at the door shoulder it is 0.957 and out
  // on the front fender blister it is 0.984. One x for both would leave one of
  // them 27 mm proud or 27 mm buried, so they get a call each.
  body.add(faceOutboard(buildDoorFurniture({
    x: 0.957, handleY: 0.40, handleZ: -0.28, handleW: 0.16,
    repeater: false, fuel: false,
  })));
  body.add(faceOutboard(buildDoorFurniture({
    handles: false, x: 0.984, repeaterY: 0.32, repeaterZ: 0.98,
    fuelX: 0.978, fuelY: 0.44, fuelZ: -1.25, fuelSide: -1, fuelR: 0.068,
    color: ctx.color,
  })));
  body.add(faceOutboard(buildBodyVents({
    bonnetZ: 1.20, bonnetY: 0.510, bonnetX: 0.27, bonnetW: 0.26, bonnetL: 0.24,
    // Measured: the flank at gill height falls from 0.980 at z 0.90 to 0.967
    // at z 0.75, so the stack steps in 7 mm a slot, not the default 4.
    gillZ: 0.90, gillY: 0.26, gillX: 0.980, gillCount: 3, gillGap: 0.075,
    gillStep: 0.007,
    // Engine intake high on the quarter, not down on the door: at door height
    // the flank ramps 49 mm across this z span as the rear arch blister comes
    // in, which would leave one end of the recess buried in paint. Just under
    // the shoulder it only moves 11 mm. Top edge stops below the glass sill
    // (y 0.494) and below the belt, where the tumblehome starts pulling in.
    intakeZ: -0.95, intakeY: 0.385, intakeX: 0.968, intakeW: 0.18, intakeH: 0.11,
  })));

  // ---- Cabin. Two seats, a wheel and a dash behind 86 %-opaque glazing: the
  // greenhouse used to be glass over an empty shell, which is most of why the
  // cabin read as a void. Head restraints deliberately clear the beltline
  // (y ~0.49) so something is visible through the side glass at eye level.
  body.add(buildInterior({
    floorY: -0.02, dashZ: 0.40, dashH: 0.16, seatZ: -0.44, bulkheadZ: -1.05,
    seatX: 0.34, seatBackH: 0.52, halfWidth: 0.62,
    wheelR: 0.15, wheelZ: 0.22, wheelY: 0.46, driverX: -0.32,
    seats: 2, cage: false, harness: true,
  }));

  body.add(buildUnderbody({ y: -0.255, w: 1.20, len: 3.6 }));
  // Liner width/x chosen so its rolled lip (outer extent ~0.978) stays inboard
  // of the flank at the arch mouths (~0.984 front, ~0.99 rear). A lip outboard
  // of the body is the black-crescent-on-the-fender failure.
  body.add(buildArchLiners({ zF: 1.45, zR: -1.45, x: 0.845, r: 0.41, width: 0.26 }));

  return { brakeLights: tail.brakeMesh };
}
