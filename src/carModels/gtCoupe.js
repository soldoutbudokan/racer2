import * as THREE from 'three';
import {
  buildGreenhouseShell, buildPanelSeams, buildWindowSeals, profileFractions, sampleSkin,
  buildFlankDecal, flankPoint,
} from './loftBuilder.js';
import { makeGlass, makeShutline, makeTrim, makeCarbon } from './carMaterials.js';
import { buildApertureLamps } from './apertureLamps.js';
import {
  buildTaillights, buildMirrors, buildGrille, buildSplitter, buildDiffuser, buildWing,
  buildExhaust, buildBadgesAndPlate, buildUnderbody, buildArchLiners, buildInterior,
  buildBodyVents, buildWipers, buildAerial,
} from './parts.js';

// ---------------------------------------------------------------------------
// GT3 coupe — the default car and the reference package (carSpecs.js).
//
// A front-engined endurance racer: long bonnet, cabin set back over the rear
// axle, fastback into a short deck carrying a swan-neck wing, and a wide body
// — the flanks step out 7 cm at each axle over the door skins. Read from the
// chase camera it is the wing, the haunches and the low wide mouth.
//
// Axle-centred frame: wheel centre y 0, ground -0.36, +Z forward. The axles
// are at z ±1.375 (2.75 m wheelbase) and the tyres' outer faces at x 1.06
// (1.84 m track, 0.28 m tyres), so the arches are authored at hw 1.04 plus
// flare and the openings cut by carModels/index.js land on the blisters.
// ---------------------------------------------------------------------------

// Greenhouse fields shared by the cabin stations: the glass sill 17 % of the
// half-width inboard of the shoulder (a real ledge under the side glass),
// convex glass and a rounded roof rail. See loftBuilder SURFACE_DEFAULTS.
const CABIN = { beltIn: 0.17, beltY: 0.05, tumbleK: 0.62, tumbleY: 0.52, railIn: 0.035 };
// One shoulder line, nose to tail. The loft lifts a crease to at least 4 % of
// the flank above an arch lip (loftBuilder halfProfileSurfaced), so the arch
// lips stay at or below 0.82 to keep it straight.
const LINE = { crease: 0.012, creaseY: 0.86 };

export const keys = [
  //   z,     hw,    yb,     hip,   yt,    topW
  { z: -2.26, hw: 0.905, yb: -0.140, hip: 0.380, yt: 0.490, topW: 0.76, hard: true, crown: 0.006, ...LINE, crease: 0.008 },
  { z: -2.05, hw: 0.990, yb: -0.170, hip: 0.440, yt: 0.520, topW: 0.84, crown: 0.010, ...LINE },
  { z: -1.72, hw: 1.025, yb: -0.140, hip: 0.470, yt: 0.545, topW: 0.86, flare: 0.045, lipY: 0.80, crown: 0.012, ...LINE },
  { z: -1.375, hw: 1.045, yb: -0.020, hip: 0.490, yt: 0.560, topW: 0.86, flare: 0.060, lipY: 0.82, crown: 0.012, ...LINE },  // rear axle
  { z: -1.05, hw: 1.020, yb: -0.170, hip: 0.480, yt: 0.620, topW: 0.80, flare: 0.040, lipY: 0.78, sill: 0.020, crown: 0.014, ...LINE },
  { z: -0.68, hw: 0.985, yb: -0.200, hip: 0.465, yt: 0.780, topW: 0.66, sill: 0.030, crown: 0.016, ...LINE, ...CABIN },      // C-pillar
  { z: -0.30, hw: 0.975, yb: -0.200, hip: 0.460, yt: 0.860, topW: 0.62, sill: 0.030, crown: 0.016, ...LINE, ...CABIN, beltIn: 0.18 },  // roof
  { z:  0.12, hw: 0.975, yb: -0.200, hip: 0.460, yt: 0.855, topW: 0.62, sill: 0.030, crown: 0.016, ...LINE, ...CABIN, beltIn: 0.18 },  // header
  { z:  0.60, hw: 0.985, yb: -0.190, hip: 0.460, yt: 0.520, topW: 0.80, sill: 0.025, crown: 0.018, ...LINE, beltIn: 0.08, hard: true },  // cowl
  { z:  0.98, hw: 1.000, yb: -0.170, hip: 0.460, yt: 0.490, topW: 0.86, flare: 0.035, lipY: 0.78, crown: 0.020, ...LINE },
  { z:  1.375, hw: 1.040, yb: -0.020, hip: 0.460, yt: 0.470, topW: 0.88, flare: 0.060, lipY: 0.82, crown: 0.020, ...LINE },  // front axle
  { z:  1.72, hw: 1.000, yb: -0.160, hip: 0.420, yt: 0.430, topW: 0.86, flare: 0.040, lipY: 0.80, crown: 0.018, ...LINE },
  { z:  2.06, hw: 0.950, yb: -0.190, hip: 0.300, yt: 0.345, topW: 0.80, crown: 0.012, ...LINE, crease: 0.008, hard: true },
  { z:  2.32, hw: 0.860, yb: -0.200, hip: 0.090, yt: 0.165, topW: 0.70, crown: 0.006, hard: true },
];

// The bonnet rolls down into the mouth over 16 cm while the bumper lip below
// the shoulder turns in 5 cm: the nose has an overbite, not a wall. The deck
// rolls over the tail lamps the same way.
export const CAP_ROLL = { nose: { top: 0.16, bottom: 0.05 }, tail: { top: 0.10, bottom: 0.05 } };
export const wheelStyle = 'gt';
const F = profileFractions(keys);

// Glazing. The windshield and backlight are crown-only panes (beltFrac at the
// roof rail), so the pillars either side of them are painted skin; the side
// glass has RAKED front and rear edges — the A-pillar leans back with the
// screen and the C-pillar with the fastback. The belt corners sit forward of
// the top corners by the pillars' lean.
const GLASS = [
  { zStart: 0.58, zStartTop: 0.52, zEnd: 0.12, beltFrac: F.topCorner, topFrac: 1, steps: 12 },
  { zStart: 0.45, zStartTop: -0.04, zEnd: -0.40, zEndTop: -0.40, beltFrac: F.beltTuck, topFrac: F.topCorner, steps: 14 },
  { zStart: -0.48, zEnd: -1.02, zEndTop: -0.78, beltFrac: F.beltTuck, topFrac: F.topCorner, steps: 10 },
  { zStart: -0.64, zEnd: -1.24, beltFrac: F.topCorner, topFrac: 1, steps: 14 },
];
// Lamps are apertures cut through the fender corners, furnished by
// apertureLamps.js: a head lamp is a satin plate with a DRL blade and two
// projectors; the tail lamps are red blades baked into the one pulsed mesh.
const HEADLAMPS = [-1, 1].map(side => ({
  zStart: 2.14, zEnd: 1.80, beltFrac: F.beltTuck, topFrac: F.topCorner, steps: 12, side,
}));
const TAILLAMPS = [-1, 1].map(side => ({
  zStart: -2.00, zEnd: -2.15, beltFrac: F.beltTuck, topFrac: F.topCorner, steps: 6, side,
}));
export const PANES = [...GLASS, ...HEADLAMPS, ...TAILLAMPS];

// Panel structure in (z, profile fraction): bonnet, two doors, deck lid, and
// the rear quarter's split from the door.
const SHUT_LINES = [
  { path: [[2.00, F.topCorner], [2.00, 1.0], [2.00, -F.topCorner]] },
  { path: [[2.00, F.topCorner], [0.58, F.topCorner]], mirror: true },
  // Door: front cut ahead of the raked A-pillar's foot, rear cut between the
  // door glass (ends z -0.40) and the quarter light (starts -0.48).
  {
    path: [[0.50, F.sillLip], [0.50, F.shoulder], [-0.44, F.shoulder],
      [-0.44, F.sillLip], [0.50, F.sillLip]],
    mirror: true,
  },
  { path: [[-1.26, F.topCorner], [-1.26, 1.0], [-1.26, -F.topCorner]] },
  { path: [[-1.26, F.topCorner], [-2.04, F.topCorner]], mirror: true },
];

// Door-number roundel: the one livery element a GT3 car cannot be without.
// A canvas texture on a patch laid onto the door skin (buildFlankDecal), so
// it follows the door instead of standing off it as a flat disc.
let _roundel = null;
function roundelMaterial() {
  if (_roundel) return _roundel;
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#f4f1e6';
  g.beginPath(); g.arc(128, 128, 124, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#17191c';
  g.font = 'bold 150px Arial';
  g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillText('17', 128, 136);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  _roundel = new THREE.MeshStandardMaterial({
    map: tex, transparent: true, roughness: 0.55, metalness: 0.05,
    polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
  });
  return _roundel;
}
function buildRoundels() {
  const g = new THREE.Group();
  // 0.30 m across, centred on the door between the sill (y ~0) and the
  // shoulder (y 0.46); the canvas's corners are transparent.
  for (const side of [-1, 1]) {
    g.add(new THREE.Mesh(buildFlankDecal(keys, { z: 0.03, y: 0.21, w: 0.30, h: 0.30, side }),
      roundelMaterial()));
  }
  return g;
}

// Roof furniture: the NACA-style intake over the driver and the escape hatch
// outline. Both sit on the crowned roof, measured off the skin.
function buildRoof() {
  const g = new THREE.Group();
  const trim = makeTrim(), carbon = makeCarbon();
  const up = new THREE.Vector3(0, 1, 0);
  const seat = (mesh, z, f, lift) => {
    const { position, normal } = sampleSkin(keys, z, f);
    mesh.quaternion.setFromUnitVectors(up, normal);
    mesh.position.copy(position).addScaledVector(normal, lift);
    g.add(mesh);
  };
  // Hatch outline: a thin dark frame, flush.
  const frameShape = new THREE.Shape();
  frameShape.moveTo(-0.28, -0.26); frameShape.lineTo(0.28, -0.26);
  frameShape.lineTo(0.28, 0.26); frameShape.lineTo(-0.28, 0.26); frameShape.closePath();
  const hole = new THREE.Path();
  hole.moveTo(-0.265, -0.245); hole.lineTo(0.265, -0.245);
  hole.lineTo(0.265, 0.245); hole.lineTo(-0.265, 0.245); hole.closePath();
  frameShape.holes.push(hole);
  const frameGeo = new THREE.ShapeGeometry(frameShape);
  frameGeo.rotateX(-Math.PI / 2);
  seat(new THREE.Mesh(frameGeo, trim), -0.16, 1.0, 0.004);
  // Intake: a low carbon scoop with a dark mouth, facing forward on the roof.
  const scoop = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.032, 0.30), carbon);
  seat(scoop, -0.56, 1.0, 0.014);
  const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.022, 0.012), trim);
  seat(mouth, -0.41, 1.0, 0.020);
  return g;
}

export function decorate(body, ctx) {
  body.add(new THREE.Mesh(buildGreenhouseShell(keys, { panes: GLASS }), makeGlass()));
  const seals = buildWindowSeals(keys, { panes: GLASS, width: 0.024 });
  if (seals) body.add(new THREE.Mesh(seals, makeTrim()));

  const shut = buildPanelSeams(keys, SHUT_LINES);
  if (shut) {
    const m = new THREE.Mesh(shut, makeShutline());
    m.receiveShadow = true;
    body.add(m);
  }

  const lamps = buildApertureLamps(keys, F, {
    head: HEADLAMPS, tail: TAILLAMPS, depth: 0.032, projectorZ: [2.04, 1.90],
  });
  body.add(lamps.group);

  // Tail cap plane z -2.26. Its usable face after the rolls runs y -0.09 to
  // 0.39: lamp bar across the middle, badge above it, plate and the two
  // exhausts below, diffuser under the bumper lip.
  const tail = buildTaillights({
    z: -2.255, y: 0.255, width: 1.46, height: 0.10, depth: 0.040, barH: 0.030,
    segments: 6, fog: false, extraRed: [lamps.tailBlade],
  });
  body.add(tail.group);
  body.add(buildBadgesAndPlate({
    frontPose: sampleSkin(keys, 2.00, 1), rearZ: -2.268, rearY: 0.355, plateY: 0.105,
  }));
  body.add(buildExhaust({ z: -2.27, y: -0.03, x: 0.32, count: 2, r: 0.046 }));
  body.add(buildDiffuser({ z: -2.06, y: -0.255, w: 1.62, strakes: 5, roofRise: 0.11 }));
  body.add(buildWing({ z: -2.00, y: 0.86, span: 1.74, deckY: 0.540, style: 'gt' }));

  // Nose cap plane z 2.32, face y -0.15 to 0.0 after the rolls: a low, wide
  // mouth with brake ducts in its corners and a splitter under it. The lamps
  // live in the fenders above, so the face is all intake.
  body.add(buildGrille({
    z: 2.323, y: -0.072, w: 0.86, h: 0.13, depth: 0.040,
    ductW: 0.22, ductH: 0.11, ductX: 0.62, ductY: -0.075,
  }));
  body.add(buildSplitter({ z: 2.235, y: -0.195, w: 1.78, canardX: 0.90, canardY: -0.07, canardZ: 2.20, canardLen: 0.15 }));

  // Bonnet extractors, seated on the crowned bonnet behind the lamps, and
  // three gills behind each front arch, seated on the measured flank: the
  // fender falls away 9 mm over the stack, so each slot steps in to match.
  const vent = sampleSkin(keys, 1.52, F.crownEdge);
  const gill0 = flankPoint(keys, 0.92, 0.30).position.x;
  const gill2 = flankPoint(keys, 0.78, 0.30).position.x;
  body.add(buildBodyVents({
    bonnet: true, bonnetZ: 1.52, bonnetY: vent.position.y + 0.002, bonnetX: vent.position.x,
    bonnetW: 0.30, bonnetL: 0.34, bonnetLouvres: 4, bonnetTilt: -0.04,
    gills: true, gillZ: 0.92, gillY: 0.30, gillX: gill0 - 0.002,
    gillW: 0.050, gillH: 0.11, gillCount: 3, gillGap: 0.070, gillStep: (gill0 - gill2) / 2,
    intakes: false,
  }));
  body.add(buildWipers({ z: 0.60, y: 0.545, x: 0.26, len: 0.50, tilt: 0.08, rake: 0.42 }));
  body.add(buildMirrors({ z: 0.50, y: 0.535, x: 0.925, color: ctx.color, indicator: false }));
  body.add(buildRoof());
  body.add(buildAerial({ z: -0.95, y: 0.735, style: 'fin', color: ctx.color, len: 0.18, height: 0.07 }));
  body.add(buildRoundels());

  body.add(buildInterior({
    floorY: -0.04, dashZ: 0.50, dashH: 0.16, seatZ: -0.36, bulkheadZ: -0.95,
    seatX: 0.32, seatBackH: 0.52, halfWidth: 0.60,
    wheelR: 0.15, wheelZ: 0.22, wheelY: 0.40, driverX: -0.32,
    seats: 1, cage: true, harness: true,
  }));

  body.add(buildUnderbody({ y: -0.25, w: 1.34, len: 3.90 }));
  body.add(buildArchLiners({ zF: ctx.arches.zF, zR: ctx.arches.zR, x: 0.90, r: 0.413, width: 0.30, lip: false }));
  return { brakeLights: tail.brakeMesh };
}
