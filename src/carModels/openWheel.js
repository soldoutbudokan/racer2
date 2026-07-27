import * as THREE from 'three';
import { buildPanelSeams, profileFractions } from './loftBuilder.js';
import {
  makePaint, makeCarbon, makeTrim, makeSatin, makeTaillight, makeShutline,
  makeGrille, makeCaliper,
} from './carMaterials.js';
import { buildDiffuser, buildUnderbody, addOpening } from './parts.js';

// ---------------------------------------------------------------------------
// Open-wheel (F1-ish) single-seater.
//
// Axle-centred frame: wheel centre y = 0, tyre radius 0.36 (ground = -0.36),
// +Z forward. Wheel centres sit at z ±1.45, x ±0.86 (car.js `tw`), and the
// wheels are EXPOSED — there is no bodywork over them and nothing here may
// enter their swept volume.
//
// THE WHEEL KEEP-OUT, because it constrains almost every number below:
// a straight-ahead tyre occupies x ∈ [0.72, 1.00] within 0.36 m of its axle
// line. So every appendage obeys one of two rules —
//   * stay inboard of x 0.70 (suspension, floor, sidepods, bargeboards), or
//   * stay clear in z: nothing between z 1.09..1.81 or -1.81..-1.09 may reach
//     out past x 0.70 (front-wing endplates start at z 1.87, the diffuser and
//     rear wing at z < -1.83).
// The front wheels also STEER (car.js maxSteer 0.62 rad at standstill), which
// sweeps the inner sidewall inboard of 0.72 at large lock; the front outboard
// suspension pickups are therefore pulled in to x 0.655 rather than sitting at
// the 0.70 limit like the rear ones.
//
// The bodywork is one lofted tub (see `keys`) plus separately lofted sidepods
// and airbox — the pods cannot be part of the hull loft because they are two
// detached volumes flanking it, and they were boxes before, which is what the
// Backlog meant by "flanks read as white planks".
// ---------------------------------------------------------------------------

// Surfaced profile (see loftBuilder SURFACE_DEFAULTS): `tuck` is deliberately
// tiny so the underside stays a WIDE FLAT PLANE ending in a hard corner —
// that crisp floor edge is the single most characteristic line on a modern
// single-seater, and the legacy 0.245 tuck rounded it away. `crease` puts a
// second tangent break part-way up the tub side (the chassis edge line) so the
// flank has something to catch the low sun other than its own silhouette.
export const keys = [
  // z,      hw,    yb,     hip,    yt,    topW    surface
  { z: -2.06, hw: 0.115, yb: -0.130, hip: -0.050, yt: 0.075, topW: 0.075, tuck: 0.06, crease: 0.004, creaseY: 0.70, hard: true }, // crash structure (flat cap)
  { z: -1.70, hw: 0.165, yb: -0.165, hip: -0.030, yt: 0.150, topW: 0.105, tuck: 0.06, crease: 0.005, creaseY: 0.70 }, // gearbox
  { z: -1.25, hw: 0.235, yb: -0.200, hip:  0.000, yt: 0.245, topW: 0.150, tuck: 0.06, crease: 0.007, creaseY: 0.70 }, // engine cover
  { z: -0.72, hw: 0.300, yb: -0.220, hip:  0.020, yt: 0.360, topW: 0.175, tuck: 0.06, crease: 0.008, creaseY: 0.70 }, // roll-hoop root
  { z: -0.30, hw: 0.345, yb: -0.220, hip:  0.030, yt: 0.235, topW: 0.250, tuck: 0.06, crease: 0.009, creaseY: 0.70 }, // headrest deck
  { z:  0.14, hw: 0.365, yb: -0.220, hip:  0.030, yt: 0.100, topW: 0.270, tuck: 0.06, crease: 0.010, creaseY: 0.70 }, // cockpit trough
  { z:  0.60, hw: 0.355, yb: -0.220, hip:  0.025, yt: 0.190, topW: 0.255, tuck: 0.06, crease: 0.010, creaseY: 0.70 }, // dash bulkhead
  { z:  1.05, hw: 0.295, yb: -0.205, hip:  0.005, yt: 0.185, topW: 0.205, tuck: 0.06, crease: 0.009, creaseY: 0.70 }, // chassis waist
  { z:  1.50, hw: 0.205, yb: -0.130, hip: -0.020, yt: 0.130, topW: 0.145, tuck: 0.06, crease: 0.006, creaseY: 0.70 }, // front bulkhead
  { z:  1.88, hw: 0.135, yb: -0.065, hip: -0.025, yt: 0.065, topW: 0.100, tuck: 0.06, crease: 0.003, creaseY: 0.70 }, // nose
  { z:  2.16, hw: 0.085, yb: -0.030, hip: -0.015, yt: 0.035, topW: 0.060, tuck: 0.06, crease: 0.002, creaseY: 0.70, hard: true }, // nose tip (flat cap)
];

export const wheelStyle = 'openWheel';

// Named landmark fractions of THIS car's cross-section. Every seam path and
// cockpit-opening edge below is authored against these, never against the old
// hard-coded 0.27/0.53/0.60/0.80 (which were the LEGACY profile's landmarks
// and mean nothing on a surfaced hull).
const F = profileFractions(keys);

// ---------------------------------------------------------------------------
// Construction helpers
// ---------------------------------------------------------------------------

function box(w, h, d, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  return m;
}

function tubeZ(rTop, rBot, len, mat, seg = 12, open = false) {
  const g = new THREE.CylinderGeometry(rTop, rBot, len, seg, 1, open);
  g.rotateX(Math.PI / 2);
  return new THREE.Mesh(g, mat);
}

const _up = new THREE.Vector3(0, 1, 0);
const _dir = new THREE.Vector3();

/**
 * A thin structural link between two points — the whole suspension is built
 * from these. Real wishbones are aerofoil sections, so the cylinder is
 * squashed on its LOCAL X before orientation: setFromUnitVectors(+Y, dir)
 * takes local +X onto the horizontal normal of the link, so `flat` thins the
 * member vertically and leaves it chord-wide. Round rods at this scale read as
 * plumbing, not as aero-profiled links.
 */
function strut(mat, a, b, r = 0.016, flat = 0.5) {
  _dir.set(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
  const len = _dir.length();
  const g = new THREE.CylinderGeometry(r, r, len, 7, 1);
  g.scale(flat, 1, 1);
  const m = new THREE.Mesh(g, mat);
  m.quaternion.setFromUnitVectors(_up, _dir.clone().normalize());
  m.position.set((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
  return m;
}

/**
 * Stitch a stack of closed cross-sections into a tube along +z. Sections must
 * be ordered by increasing z, hold the same number of points, and run
 * counter-clockwise in XY as seen from +Z — that winding is what makes the
 * quads below face outward (the same "if a surface renders on the wrong side,
 * check winding first" trap the panel seams hit).
 *
 * `hard` lists section-point indices that are EDGES rather than curvature: the
 * column is emitted twice and the pair is not stitched to itself, so each copy
 * is referenced only by the faces on its own side and computeVertexNormals
 * cannot average the crease away. Without it a sidepod's floor edge and
 * shoulder shade as one soft roll, which is exactly how a lofted pod ends up
 * looking like a bar of soap instead of an aero surface.
 */
function loftTube(sections, { hard = [], capStart = true, capEnd = true } = {}) {
  const hardSet = hard instanceof Set ? hard : new Set(hard);
  const K = sections[0].pts.length;
  const cols = [], bridge = [];
  for (let k = 0; k < K; k++) {
    const br = !hardSet.has(k);
    cols.push(k); bridge.push(br);
    if (!br) { cols.push(k); bridge.push(true); }
  }
  const M = cols.length;
  const S = sections.length;
  const positions = [], uvs = [], indices = [];
  for (let s = 0; s < S; s++) {
    for (let j = 0; j < M; j++) {
      const p = sections[s].pts[cols[j]];
      positions.push(p[0], p[1], sections[s].z);
      uvs.push(j / M, s / (S - 1));
    }
  }
  for (let s = 0; s < S - 1; s++) {
    const a = s * M, b = (s + 1) * M;
    for (let j = 0; j < M; j++) {
      if (!bridge[j]) continue;
      const j1 = (j + 1) % M;
      indices.push(a + j, a + j1, b + j);
      indices.push(a + j1, b + j1, b + j);
    }
  }
  const cap = (s, front) => {
    const base = s * M;
    let cx = 0, cy = 0, n = 0;
    for (let j = 0; j < M; j++) {
      if (!bridge[j]) continue;                 // count each unique column once
      cx += positions[(base + j) * 3];
      cy += positions[(base + j) * 3 + 1];
      n++;
    }
    const c = positions.length / 3;
    positions.push(cx / n, cy / n, sections[s].z);
    uvs.push(0.5, front ? 1 : 0);
    for (let j = 0; j < M; j++) {
      if (!bridge[j]) continue;
      const p = base + j, q = base + (j + 1) % M;
      if (front) indices.push(c, p, q); else indices.push(c, q, p);
    }
  };
  if (capStart) cap(0, false);
  if (capEnd) cap(S - 1, true);

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  geo.computeBoundingBox();
  geo.computeBoundingSphere();
  return geo;
}

// Mirror a geometry across x = 0. The scale flips the handedness, so the index
// winding has to be reversed as well or the whole mirrored part renders
// inside-out (back-facing from outside, visible only through the far side).
function mirrorX(geo) {
  const g = geo.clone();
  g.deleteAttribute('normal');
  g.scale(-1, 1, 1);
  const a = g.getIndex().array;
  for (let i = 0; i < a.length; i += 3) { const t = a[i]; a[i] = a[i + 2]; a[i + 2] = t; }
  g.getIndex().needsUpdate = true;
  g.computeVertexNormals();
  return g;
}

/**
 * A recessed rectangular mouth facing +Z, added into `g`. Built inside-out for
 * the same reason the road cars' fascia openings are: nothing can be CUT from
 * a closed loft, so the lip stands proud and the dark floor sits ON the skin.
 * From every angle a driving camera sees, that reads as a duct — and it can
 * never expose the hollow inside of the bodywork the way a real hole would.
 *
 * This is now the road cars' own `addOpening` (parts.js) with this car's
 * thinner floor and lip — it used to be a duplicate nine-box copy of it, and
 * the shared one builds the same silhouette as an open shell for less than half
 * the triangles.
 */
function mouth(g, {
  w, h, depth = 0.06, wall = 0.011, lip = 0.011,
  x = 0, y = 0, z = 0, floorMat, wallMat, lipMat,
}) {
  addOpening(g, {
    w, h, depth, wall, lipT: lip, zi: 0.008, x, y, z,
    floorMat, wallMat, lipMat,
  });
}

/**
 * Extrude a (z, y) outline across x. Every aero appendage on this car — wing
 * endplates, bargeboards, the engine-cover fin — is drawn in that plane.
 * The authored z is negated into the shape because rotateY(90°) maps a shape
 * point (sx, sy) to (·, sy, -sx); writing -z here lands each point back on the
 * z it was authored for.
 */
function bladeGeo(outline, thick) {
  const s = new THREE.Shape();
  s.moveTo(-outline[0][0], outline[0][1]);
  for (let i = 1; i < outline.length; i++) s.lineTo(-outline[i][0], outline[i][1]);
  s.closePath();
  const g = new THREE.ExtrudeGeometry(s, { depth: thick, bevelEnabled: false, steps: 1 });
  g.translate(0, 0, -thick / 2);
  g.rotateY(Math.PI / 2);
  return g;
}

// Teardrop aerofoil section in the chord/thickness plane.
function airfoilShape(chord, thick = 0.17) {
  const c = chord, t = chord * thick;
  const s = new THREE.Shape();
  s.moveTo(-c * 0.5, 0);
  s.quadraticCurveTo(-c * 0.26, t * 0.98, c * 0.06, t * 0.60);
  s.quadraticCurveTo(c * 0.32, t * 0.28, c * 0.5, 0);
  s.quadraticCurveTo(c * 0.20, -t * 0.34, -c * 0.10, -t * 0.46);
  s.quadraticCurveTo(-c * 0.34, -t * 0.52, -c * 0.5, 0);
  return s;
}

/**
 * One wing element: an aerofoil extruded across the span, then ARCHED — the
 * tips lift toward the endplate, and the arch is held flat across the middle
 * (a real front wing's central section is regulated flat). A dead-straight
 * extrusion is what makes a wing read as a plank.
 * Positive `tilt` raises the TRAILING edge, i.e. the inverted-aerofoil
 * attitude that every wing on a racing car actually runs.
 */
function wingElement({
  span, chord, thick = 0.17, arch = 0, flat = 0.18, mat, tilt = 0, y = 0, z = 0, x = 0,
}) {
  const g = new THREE.ExtrudeGeometry(airfoilShape(chord, thick), {
    depth: span, bevelEnabled: false, steps: 1,
  });
  g.translate(0, 0, -span / 2);
  g.rotateY(Math.PI / 2);                       // chord -> z, span -> x
  if (arch !== 0) {
    const half = span / 2;
    const pos = g.getAttribute('position');
    for (let i = 0; i < pos.count; i++) {
      const t = Math.max(0, (Math.abs(pos.getX(i)) - flat) / Math.max(1e-4, half - flat));
      pos.setY(i, pos.getY(i) + arch * t * t);
    }
    pos.needsUpdate = true;
  }
  g.computeVertexNormals();
  const m = new THREE.Mesh(g, mat);
  m.rotation.x = tilt;
  m.position.set(x, y, z);
  m.castShadow = true;
  return m;
}

// ---------------------------------------------------------------------------
// Sidepods
// ---------------------------------------------------------------------------

// Pod stations, rear -> front (loftTube needs increasing z). The pod is NOT a
// tapered box: `undercut` pulls the bottom outer edge inboard so the floor is
// overhung by a real shadowed cavity, `topDrop` rolls the top surface down and
// inward toward the tail, and xOut collapses from 0.675 to 0.20 over the last
// half metre — that is the Coke-bottle waist. The rear stations sit INSIDE the
// tub loft on purpose, so the pod dies into the engine cover with no seam.
const POD = [
  { z: -1.24, xIn: 0.100, xOut: 0.200, yBot: -0.170, yTop: 0.020, undercut: 0.020, topDrop: 0.010 },
  { z: -1.00, xIn: 0.140, xOut: 0.280, yBot: -0.200, yTop: 0.060, undercut: 0.040, topDrop: 0.020 },
  { z: -0.72, xIn: 0.190, xOut: 0.400, yBot: -0.220, yTop: 0.090, undercut: 0.080, topDrop: 0.040 },
  { z: -0.38, xIn: 0.240, xOut: 0.530, yBot: -0.235, yTop: 0.100, undercut: 0.130, topDrop: 0.060 },
  { z: -0.02, xIn: 0.270, xOut: 0.620, yBot: -0.245, yTop: 0.095, undercut: 0.170, topDrop: 0.065 },
  { z:  0.30, xIn: 0.280, xOut: 0.665, yBot: -0.250, yTop: 0.075, undercut: 0.190, topDrop: 0.050 },
  { z:  0.54, xIn: 0.280, xOut: 0.675, yBot: -0.250, yTop: 0.045, undercut: 0.190, topDrop: 0.030 },
  { z:  0.70, xIn: 0.280, xOut: 0.655, yBot: -0.245, yTop: 0.015, undercut: 0.175, topDrop: 0.015 },
];

// Right-hand pod cross-section, CCW in XY from the floor edge: out along the
// floor, up the undercut, over the shoulder, in across the top, down the inner
// face, back along the floor. Index 0 (floor edge) and index 4 (shoulder) are
// the two hard edges.
const POD_HARD = [0, 4];
function podSection(q) {
  const { xIn, xOut, yBot, yTop, undercut, topDrop } = q;
  const h = yTop - yBot, w = xOut - xIn;
  return [
    [xOut - undercut, yBot + 0.010],              // 0 floor edge / undercut apex (hard)
    [xOut - undercut * 0.42, yBot + h * 0.26],
    [xOut - undercut * 0.10, yBot + h * 0.55],
    [xOut, yTop - topDrop - h * 0.20],            // 3 max width
    [xOut - w * 0.05, yTop - topDrop],            // 4 shoulder (hard)
    [xIn + w * 0.62, yTop - topDrop * 0.42],
    [xIn + w * 0.30, yTop - 0.004],
    [xIn + w * 0.08, yTop],
    [xIn, yTop - h * 0.22],
    [xIn, yBot + h * 0.40],
    [xIn + w * 0.06, yBot + 0.012],
    [xIn + w * 0.48, yBot],                       // 11 floor
  ];
}

// Linear-interpolated pod geometry at z — used to sit the louvres and the
// cooling exit ON the sloping top surface rather than floating over it.
function podAt(z) {
  let i = 0;
  while (i < POD.length - 2 && POD[i + 1].z < z) i++;
  const a = POD[i], b = POD[i + 1];
  const t = THREE.MathUtils.clamp((z - a.z) / (b.z - a.z), 0, 1);
  const L = (k) => a[k] + (b[k] - a[k]) * t;
  return { xIn: L('xIn'), xOut: L('xOut'), yTop: L('yTop'), topDrop: L('topDrop') };
}

function buildSidepods(paint, carbon, trim) {
  const g = new THREE.Group();
  const sections = POD.map((q) => ({ z: q.z, pts: podSection(q) }));
  const shell = loftTube(sections, { hard: POD_HARD });
  for (const geo of [shell, mirrorX(shell)]) {
    const m = new THREE.Mesh(geo, paint);
    m.castShadow = true;
    m.receiveShadow = true;
    g.add(m);
  }

  const front = POD[POD.length - 1];
  for (const sx of [-1, 1]) {
    // Radiator inlet in the pod's front face. Wide letterbox with a horizontal
    // splitter vane; the floor is the honeycomb grille material so the duct
    // has a texture behind the shadow instead of being a flat black patch.
    const inlet = new THREE.Group();
    inlet.position.set(sx * (front.xIn + front.xOut) * 0.5, -0.105, front.z);
    // The 0.115 inset is not cosmetic: the pod's shoulder has already rolled
    // in to y ≈ 0 by x 0.62 at this station, so a wider mouth pushes its lip
    // out through the top-outer corner of the bodywork it is set into.
    mouth(inlet, {
      w: (front.xOut - front.xIn) - 0.115, h: 0.155, depth: 0.075,
      floorMat: makeGrille(), wallMat: trim, lipMat: carbon,
    });
    inlet.add(box((front.xOut - front.xIn) - 0.135, 0.014, 0.030, carbon, 0, 0.006, 0.048));
    g.add(inlet);

    // Undercut fence: a short vertical vane hanging off the floor edge at the
    // mouth, which is what makes the undercut read as an undercut in a
    // three-quarter view rather than as a shadow.
    const fence = new THREE.Mesh(bladeGeo([
      [0.70, -0.235], [0.70, -0.300], [0.36, -0.300], [0.30, -0.250], [0.42, -0.230],
    ], 0.014), carbon);
    fence.position.x = sx * (front.xOut - front.undercut - 0.01);
    g.add(fence);

    // Cooling louvres on the pod's rear shoulder, each blade raked so the low
    // sun cannot flood the recess and flatten it back out.
    for (let i = 0; i < 5; i++) {
      const z = -0.54 - i * 0.088;
      const p = podAt(z);
      const bl = box((p.xOut - p.xIn) * 0.62, 0.010, 0.040, carbon,
        sx * (p.xIn + (p.xOut - p.xIn) * 0.42), p.yTop - 0.004, z);
      bl.rotation.x = 0.52;
      bl.rotation.z = -sx * 0.10;
      g.add(bl);
      // shadow slot under each blade
      g.add(box((p.xOut - p.xIn) * 0.60, 0.006, 0.030, trim,
        sx * (p.xIn + (p.xOut - p.xIn) * 0.42), p.yTop - 0.020, z - 0.012));
    }

    // Rear cooling exit where the pod dies into the engine cover.
    const exit = podAt(-1.02);
    g.add(box((exit.xOut - exit.xIn) * 0.9, 0.075, 0.020, trim,
      sx * (exit.xIn + (exit.xOut - exit.xIn) * 0.5), exit.yTop - 0.055, -1.03));
  }
  return g;
}

// ---------------------------------------------------------------------------
// Airbox / roll hoop
// ---------------------------------------------------------------------------

// Rounded-triangle section, symmetric about x = 0, CCW from bottom-right.
function spineSection(hw, yBot, yTop) {
  const h = yTop - yBot;
  return [
    [hw * 0.86, yBot],
    [hw, yBot + h * 0.32],
    [hw * 0.96, yBot + h * 0.64],
    [hw * 0.70, yTop - h * 0.11],
    [hw * 0.29, yTop],
    [0, yTop + h * 0.02],
    [-hw * 0.29, yTop],
    [-hw * 0.70, yTop - h * 0.11],
    [-hw * 0.96, yBot + h * 0.64],
    [-hw, yBot + h * 0.32],
    [-hw * 0.86, yBot],
    [0, yBot - h * 0.02],
  ];
}

function buildAirbox(paint, carbon, trim, satin) {
  const g = new THREE.Group();
  const stations = [
    [-1.10, 0.115, 0.14, 0.280],
    [-0.88, 0.150, 0.20, 0.420],
    [-0.70, 0.165, 0.26, 0.510],
    [-0.56, 0.160, 0.28, 0.545],
    [-0.46, 0.145, 0.27, 0.535],
  ];
  const shell = loftTube(stations.map(([z, hw, yb, yt]) => ({ z, pts: spineSection(hw, yb, yt) })));
  const m = new THREE.Mesh(shell, paint);
  m.castShadow = true;
  g.add(m);

  // Intake mouth in the front face of the hoop, with the central splitter a
  // real airbox has. depth 0.055 puts the lip forward of the shell face, which
  // is how the roll-hoop structure sits in front of the duct on the real car.
  const inlet = new THREE.Group();
  inlet.position.set(0, 0.415, -0.455);
  mouth(inlet, {
    w: 0.185, h: 0.155, depth: 0.055,
    floorMat: trim, wallMat: trim, lipMat: carbon,
  });
  inlet.add(box(0.016, 0.135, 0.036, carbon, 0, 0, 0.030));
  g.add(inlet);

  // Roll-hoop legs: the load path down the sides of the airbox onto the tub.
  for (const sx of [-1, 1]) {
    g.add(strut(satin, [sx * 0.130, 0.500, -0.520], [sx * 0.235, 0.230, -0.700], 0.022, 0.6));
  }
  // Accident-data / camera pod on the hoop crown.
  g.add(box(0.055, 0.038, 0.090, carbon, 0, 0.560, -0.590));

  // Engine-cover fin. Modern single-seaters all carry one and it is the
  // cheapest way to stop the rear half being an unbroken taper in silhouette.
  const fin = new THREE.Mesh(bladeGeo([
    [-0.95, 0.245], [-1.25, 0.200], [-1.60, 0.110], [-1.86, 0.055],
    [-1.86, 0.140], [-1.55, 0.215], [-1.20, 0.300], [-0.98, 0.400],
  ], 0.026), paint);
  fin.castShadow = true;
  g.add(fin);
  // dark leading edge so the fin has an edge to read against the sky
  g.add(box(0.030, 0.010, 0.10, carbon, 0, 0.395, -1.00));
  return g;
}

// ---------------------------------------------------------------------------
// Cockpit, halo and driver
// ---------------------------------------------------------------------------

// The opening rides the crown as a wide ribbon rather than a flat plate: the
// deck climbs 0.17 m from the dash to the headrest, so anything planar would
// bury itself at one end and float at the other.
const COCKPIT_Z0 = 0.34, COCKPIT_Z1 = -0.40;
const COCKPIT_TRAY = [{
  path: [[COCKPIT_Z0, 1.0], [COCKPIT_Z1, 1.0]], width: 0.38, proud: 0.012,
}];
// 0.880 is not a landmark — it is where the tray's 0.19 m half-width actually
// lands on this deck. The profile fractions are NOT uniform in arc length
// (crown -> crownEdge is 0.095 of f for 0.14 m, crownEdge -> topCorner another
// 0.048 for 0.13 m), so a rim authored at the topCorner landmark would sit a
// full 70 mm outboard of the tray edge it is meant to cap.
const COCKPIT_RIM = [{
  path: [
    [COCKPIT_Z0, 0.880], [COCKPIT_Z1, 0.880],
    [COCKPIT_Z1, -0.880], [COCKPIT_Z0, -0.880], [COCKPIT_Z0, 0.880],
  ],
  width: 0.048, proud: 0.026,
}];

// Halo ring, left rear mount round the front to the right rear mount. The two
// END points are the only ones that touch the car — they land on the deck's
// top corner at z -0.40 (skin y ≈ 0.25 there); everything between them is
// deliberately in mid-air, carried by the central pylon.
const HALO_PTS = [
  [-0.235, 0.250, -0.400], [-0.300, 0.300, -0.130], [-0.302, 0.352, 0.130],
  [-0.235, 0.412, 0.315], [-0.100, 0.452, 0.412], [0.000, 0.460, 0.432],
  [0.100, 0.452, 0.412], [0.235, 0.412, 0.315], [0.302, 0.352, 0.130],
  [0.300, 0.300, -0.130], [0.235, 0.250, -0.400],
];

function buildHalo(carbon, satin) {
  const g = new THREE.Group();
  const curve = new THREE.CatmullRomCurve3(HALO_PTS.map((p) => new THREE.Vector3(...p)));
  const hoop = new THREE.Mesh(new THREE.TubeGeometry(curve, 30, 0.027, 6, false), carbon);
  hoop.castShadow = true;
  g.add(hoop);
  // Central pylon. Without it the halo reads as a floating arch — this single
  // strut down to the tub in front of the driver is the halo's signature.
  const pylon = box(0.050, 0.320, 0.080, carbon, 0, 0.305, 0.420);
  pylon.rotation.x = -0.10;
  g.add(pylon);
  g.add(box(0.075, 0.016, 0.100, satin, 0, 0.162, 0.408));   // pylon foot plate
  // rear mount feet, planted on the deck's top corner
  for (const sx of [-1, 1]) g.add(box(0.050, 0.040, 0.070, satin, sx * 0.235, 0.240, -0.400));
  return g;
}

function buildDriver(paint, carbon, trim, satin) {
  const g = new THREE.Group();
  // Shoulders + seat back, sunk into the cockpit trough.
  const shoulders = box(0.360, 0.140, 0.130, carbon, 0, 0.185, -0.300);
  shoulders.rotation.x = 0.16;
  g.add(shoulders);
  g.add(box(0.300, 0.180, 0.070, trim, 0, 0.230, -0.372));    // headrest padding
  for (const sx of [-1, 1]) {
    g.add(box(0.075, 0.130, 0.120, trim, sx * 0.190, 0.215, -0.335));  // side head protection
  }
  // HANS collar: two arms over the shoulders, the detail that says "driver in
  // a seat" rather than "ball on a box".
  for (const sx of [-1, 1]) {
    const arm = box(0.070, 0.036, 0.140, trim, sx * 0.115, 0.245, -0.245);
    arm.rotation.z = sx * 0.22;
    g.add(arm);
  }
  // Helmet in the car's own colour, with a mirrored visor band across the
  // front only (a full band round the helmet reads as a stripe, not a visor).
  const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.115, 16, 12), paint);
  helmet.scale.set(1, 1.08, 1.14);
  helmet.position.set(0, 0.300, -0.205);
  helmet.castShadow = true;
  g.add(helmet);
  const visor = new THREE.Mesh(
    new THREE.SphereGeometry(0.118, 14, 8, Math.PI / 2 - 1.15, 2.30, 0.78, 0.46), satin);
  visor.scale.set(1, 1.08, 1.14);
  visor.position.set(0, 0.300, -0.205);
  g.add(visor);
  g.add(box(0.180, 0.014, 0.030, carbon, 0, 0.372, -0.170));  // visor peak

  // Steering wheel: a flat-bottomed rectangle with a display face. Seen edge-on
  // through the halo, but its absence is loud.
  const w = new THREE.Group();
  w.position.set(0, 0.205, 0.130);
  w.rotation.x = -0.75;
  w.add(box(0.220, 0.130, 0.028, trim));
  w.add(box(0.150, 0.075, 0.012, satin, 0, 0.010, 0.020));
  g.add(w);
  g.add(box(0.045, 0.045, 0.150, trim, 0, 0.175, 0.215));     // column
  return g;
}

// ---------------------------------------------------------------------------
// Front wing + nose
// ---------------------------------------------------------------------------

function buildFrontWing(carbon, satin) {
  const g = new THREE.Group();
  // Four elements, each shorter in chord, higher, further back and at a
  // steeper angle than the one below — the stack that makes a front wing read
  // as a front wing. Trailing edges all stay at z >= 1.87, clear of the front
  // tyre's forward reach at z 1.81.
  const els = [
    { span: 1.62, chord: 0.300, y: -0.270, z: 2.060, tilt: 0.10, arch: 0.018 },
    { span: 1.62, chord: 0.160, y: -0.208, z: 2.000, tilt: 0.34, arch: 0.038 },
    { span: 1.60, chord: 0.140, y: -0.152, z: 1.972, tilt: 0.48, arch: 0.044 },
    { span: 1.56, chord: 0.130, y: -0.098, z: 1.948, tilt: 0.60, arch: 0.048 },
  ];
  for (const e of els) g.add(wingElement({ ...e, mat: carbon }));

  // Endplates: a shaped plate, not a rectangle — swept top edge, cut-away rear
  // and a flared footplate at the bottom.
  const epGeo = bladeGeo([
    [1.870, -0.300], [1.870, -0.130], [1.980, -0.075], [2.170, -0.100],
    [2.190, -0.260], [2.060, -0.325], [1.950, -0.325],
  ], 0.018);
  for (const sx of [-1, 1]) {
    const ep = new THREE.Mesh(epGeo, carbon);
    ep.position.x = sx * 0.795;
    ep.castShadow = true;
    g.add(ep);
    // footplate turning out under the endplate
    const fp = box(0.090, 0.014, 0.220, carbon, sx * 0.838, -0.322, 2.000);
    fp.rotation.z = -sx * 0.22;
    g.add(fp);
    // upper flick off the outboard face
    const flick = box(0.075, 0.010, 0.090, carbon, sx * 0.828, -0.092, 2.090);
    flick.rotation.z = -sx * 0.30;
    g.add(flick);
    // cascade winglet inboard of the endplate
    g.add(wingElement({
      span: 0.240, chord: 0.090, mat: carbon, tilt: 0.42,
      x: sx * 0.620, y: -0.048, z: 2.030,
    }));
    g.add(strut(carbon, [sx * 0.740, -0.060, 2.030], [sx * 0.788, -0.100, 2.030], 0.010, 0.5));
  }

  // Nose pylons: two blades from the underside of the nose down onto the main
  // plane. They land ON the element, so the wing is carried rather than
  // levitating in front of the car.
  for (const sx of [-1, 1]) {
    g.add(strut(carbon, [sx * 0.070, -0.052, 1.985], [sx * 0.090, -0.250, 2.055], 0.030, 0.42));
  }
  // Wing-mounted brake-duct feed vanes, inboard of the endplate.
  for (const sx of [-1, 1]) {
    const v = new THREE.Mesh(bladeGeo([
      [1.900, -0.230], [1.900, -0.300], [2.010, -0.310], [2.020, -0.235],
    ], 0.012), carbon);
    v.position.x = sx * 0.660;
    g.add(v);
  }
  // Tow eye / jack point at the nose tip — satin, never chrome. Its shaft has
  // to reach back past z 2.16 (the nose cap plane) or the loop floats.
  const loop = new THREE.Mesh(new THREE.TorusGeometry(0.028, 0.009, 4, 12), satin);
  loop.rotation.y = Math.PI / 2;
  loop.position.set(0, -0.016, 2.196);
  g.add(loop);
  const shaft = tubeZ(0.011, 0.011, 0.060, satin, 8);
  shaft.position.set(0, -0.016, 2.168);
  g.add(shaft);
  return g;
}

// ---------------------------------------------------------------------------
// Rear wing + beam wing
// ---------------------------------------------------------------------------

function buildRearWing(carbon, satin) {
  const g = new THREE.Group();
  g.add(wingElement({ span: 1.06, chord: 0.260, mat: carbon, tilt: 0.30, y: 0.600, z: -1.980, arch: 0.010, flat: 0.30 }));
  g.add(wingElement({ span: 1.06, chord: 0.150, mat: carbon, tilt: 0.66, y: 0.712, z: -2.052 })); // DRS flap
  // Beam wing, low in the diffuser exit where a real one lives — squeezed
  // between the diffuser roof (top ≈ y -0.10 at this z) and the rain light.
  g.add(wingElement({ span: 0.920, chord: 0.155, mat: carbon, tilt: 0.34, y: -0.015, z: -2.050 }));
  for (const sx of [-1, 1]) {
    g.add(strut(carbon, [sx * 0.085, 0.045, -1.990], [sx * 0.085, -0.020, -2.045], 0.014, 0.6));
  }

  const epGeo = bladeGeo([
    [-1.840, 0.440], [-1.840, 0.800], [-2.160, 0.815], [-2.190, 0.560],
    [-2.140, 0.310], [-2.010, 0.285], [-1.930, 0.370], [-1.895, 0.430],
  ], 0.020);
  for (const sx of [-1, 1]) {
    const ep = new THREE.Mesh(epGeo, carbon);
    ep.position.x = sx * 0.530;
    ep.castShadow = true;
    g.add(ep);
    // Louvre slats on the outboard face — three boxes, and they are what
    // separates "aero part" from "plank" at any distance.
    for (let i = 0; i < 3; i++) {
      const l = box(0.028, 0.014, 0.100, carbon, sx * 0.545, 0.520 + i * 0.070, -1.905 - i * 0.015);
      l.rotation.x = 0.38;
      g.add(l);
    }
    // Swan-neck support: post off the engine cover, then a short arm forward
    // onto the TOP of the main plane, as the real mounting does.
    //
    // THE ROOT IS MEASURED AT THE POST'S OWN x, NOT ON THE CENTRE LINE. The
    // crown at z -1.790 is y 0.131, but by x 0.135 the section has already
    // tumbled to y 0.012 (topW is only ~0.097 there), and by z -1.85 it is
    // -0.016. A root planted at x 0.135 / y 0.095 therefore stood 83 mm clear
    // of the skin: two satin posts carrying the whole rear wing with daylight
    // under them, straight-on in every chase-camera frame. So the posts splay —
    // feet inboard at x 0.055 where the deck really is (skin y 0.131), heads
    // out at x 0.135 under the wing — and y 0.115 buries the foot ~16 mm into
    // the engine cover so no cap edge can peek out of the paint.
    g.add(strut(satin, [sx * 0.055, 0.115, -1.790], [sx * 0.135, 0.585, -1.930], 0.024, 0.55));
    g.add(box(0.036, 0.028, 0.130, satin, sx * 0.135, 0.596, -1.960));
  }
  return g;
}

// ---------------------------------------------------------------------------
// Bargeboards, floor edge, brake ducts, suspension
// ---------------------------------------------------------------------------

function buildTurningVanes(carbon) {
  const g = new THREE.Group();
  // Main bargeboard between the front wheel and the sidepod mouth. Everything
  // here stays inboard of x 0.68 — the tyre owns x >= 0.72 through this whole
  // z band.
  const mainGeo = bladeGeo([
    [1.160, -0.030], [1.160, -0.250], [0.880, -0.278], [0.830, -0.120],
    [0.905, 0.010], [1.060, 0.030],
  ], 0.016);
  const innerGeo = bladeGeo([
    [1.230, -0.080], [1.230, -0.250], [1.010, -0.268], [0.980, -0.110], [1.080, -0.050],
  ], 0.014);
  for (const sx of [-1, 1]) {
    const v = new THREE.Mesh(mainGeo, carbon);
    v.position.x = sx * 0.615;
    v.rotation.y = -sx * 0.13;
    v.castShadow = true;
    g.add(v);
    const iv = new THREE.Mesh(innerGeo, carbon);
    iv.position.x = sx * 0.455;
    iv.rotation.y = -sx * 0.20;
    g.add(iv);
    // horizontal footplate tying the vanes into the floor edge. y -0.240 sits
    // just ABOVE the underbody pan's top face (-0.255); any lower and it is
    // swallowed whole by the pan.
    const fp = box(0.190, 0.012, 0.260, carbon, sx * 0.540, -0.240, 1.010);
    fp.rotation.z = sx * 0.06;
    g.add(fp);
    // small deflector off the side of the tub, aimed at the pod mouth
    const d = new THREE.Mesh(bladeGeo([
      [0.900, 0.010], [0.900, -0.120], [0.760, -0.135], [0.760, 0.000],
    ], 0.012), carbon);
    d.position.x = sx * 0.330;
    d.rotation.y = -sx * 0.28;
    g.add(d);
  }
  return g;
}

function buildFloorEdge(carbon) {
  const g = new THREE.Group();
  for (const sx of [-1, 1]) {
    // Edge wing: a thin blade riding just above the floor edge, forming the
    // slot that a modern floor works through.
    const ew = box(0.095, 0.012, 1.900, carbon, sx * 0.595, -0.222, -0.070);
    ew.rotation.z = sx * 0.10;
    g.add(ew);
    // vertical fences STANDING ON the floor edge, not hanging below it
    for (const z of [0.640, 0.170, -0.320, -0.810]) {
      const f = box(0.014, 0.070, 0.150, carbon, sx * 0.640, -0.245, z);
      f.rotation.y = -sx * 0.08;
      g.add(f);
    }
    // diffuser inlet fence where the floor turns up into the tunnels
    g.add(box(0.016, 0.090, 0.220, carbon, sx * 0.520, -0.250, -1.320));
  }
  return g;
}

/**
 * One suspension corner. Exposed wishbones, a pushrod (front) or pullrod
 * (rear), a steering track rod or toe link, plus an upright and brake-duct
 * hint — an open-wheel car with nothing between the tub and the wheel is the
 * single biggest tell that it is a shell.
 *
 * Authored at the STATIC ride position; the wheels are placed by physics
 * separately, so these do not articulate. Outboard ends stop at x 0.655
 * (front) / 0.690 (rear): the straight-ahead tyre starts at x 0.72, and the
 * front wheels steer, which sweeps their inner sidewall further inboard still.
 */
function buildCorner(sx, front, carbon, satin, trim) {
  const g = new THREE.Group();
  const zc = front ? 1.45 : -1.45;
  const xo = front ? 0.655 : 0.690;
  const s = front ? 1 : -1;             // +1 = toward the nose

  // Upright: a thin blade standing in the plane of the wheel, with the top and
  // bottom ball-joint bosses.
  g.add(box(0.024, 0.235, 0.150, carbon, sx * (xo + 0.008), 0.000, zc));
  g.add(box(0.040, 0.036, 0.048, satin, sx * (xo + 0.004), 0.112, zc));
  g.add(box(0.040, 0.036, 0.048, satin, sx * (xo + 0.004), -0.118, zc));
  // Inboard brake-duct drum. Sits at x < 0.70 so it never enters the tyre.
  const duct = tubeZ(0.150, 0.150, 0.055, carbon, 16, true);
  duct.rotation.y = Math.PI / 2;
  duct.position.set(sx * (xo - 0.055), 0, zc);
  g.add(duct);
  g.add(box(0.048, 0.100, 0.060, makeCaliper(), sx * (xo - 0.030), 0.135, zc - s * 0.020));

  // Wishbones: two legs each, splayed fore and aft along the tub.
  const lowOut = [sx * xo, -0.120, zc];
  const upOut = [sx * xo, 0.115, zc];
  g.add(strut(carbon, [sx * 0.270, -0.145, zc - s * 0.330], lowOut, 0.017));
  g.add(strut(carbon, [sx * 0.150, -0.095, zc + s * 0.270], lowOut, 0.017));
  g.add(strut(carbon, [sx * 0.250, 0.020, zc - s * 0.300], upOut, 0.015));
  g.add(strut(carbon, [sx * 0.145, 0.040, zc + s * 0.290], upOut, 0.015));

  if (front) {
    // Track rod behind the axle line, and the pushrod running up into the
    // chassis side — a real pushrod disappears into the tub, where the rocker
    // lives, so only the rocker's cover blister shows on the deck.
    g.add(strut(satin, [sx * 0.200, -0.035, zc - s * 0.210], [sx * (xo - 0.010), -0.015, zc - s * 0.085], 0.012, 0.7));
    g.add(strut(carbon, [sx * xo, -0.095, zc], [sx * 0.200, 0.105, zc - s * 0.290], 0.017, 0.6));
    g.add(box(0.090, 0.045, 0.130, satin, sx * 0.140, 0.190, zc - s * 0.310));   // rocker blister
  } else {
    // Toe link, pullrod down to the gearbox, and a driveshaft.
    g.add(strut(satin, [sx * 0.135, -0.055, zc + s * 0.300], [sx * (xo - 0.010), -0.032, zc + s * 0.115], 0.012, 0.7));
    g.add(strut(carbon, [sx * (xo - 0.010), 0.100, zc - s * 0.030], [sx * 0.160, -0.090, zc + s * 0.270], 0.017, 0.6));
    g.add(strut(trim, [sx * 0.130, -0.010, zc], [sx * (xo - 0.020), -0.010, zc], 0.024, 1.0));
  }
  return g;
}

// ---------------------------------------------------------------------------
// Panel structure on the tub
// ---------------------------------------------------------------------------

// Authored against F (profileFractions) — 1.0 is the crown centre line, and
// F.shoulder / F.tumble / F.crease / F.panEdge are this profile's real
// landmark columns, so a seam lands on a vertex column instead of being
// chorded across one.
const SHUT_LINES = [
  // Engine-cover parting line: down the flank rather than over the crown,
  // because the crown is occupied by the airbox and the fin.
  {
    path: [[-0.55, F.shoulder], [-0.63, F.tumble], [-1.70, F.tumble], [-1.78, F.shoulder]],
    mirror: true,
  },
  // Nose / chassis joint — a full transverse ring at the front bulkhead.
  {
    path: [[1.22, F.panEdge], [1.22, F.shoulder], [1.22, 1.0],
      [1.22, -F.shoulder], [1.22, -F.panEdge]],
  },
  // Tub / floor joint along the chassis waist.
  { path: [[1.15, F.flankFoot], [0.30, F.flankFoot], [-0.60, F.flankFoot]], mirror: true },
];

// Dark accent panels. A modern single-seater is never one flat colour; these
// carbon ribbons put a hard-edged tonal break on the nose spine and along the
// tub's character line without costing a material or a draw call.
const ACCENTS = [
  { path: [[2.12, 1.0], [1.60, 1.0], [1.10, 1.0]], width: 0.080, proud: 0.006 },
  { path: [[1.18, F.crease], [0.40, F.crease], [-0.40, F.crease], [-1.00, F.crease]],
    mirror: true, width: 0.055, proud: 0.006 },
];

// ---------------------------------------------------------------------------

export function decorate(body, ctx) {
  const paint = makePaint(ctx.color);
  const carbon = makeCarbon();
  const trim = makeTrim();
  const satin = makeSatin();

  // ---- panel structure ----
  const shut = buildPanelSeams(keys, SHUT_LINES);
  if (shut) {
    const m = new THREE.Mesh(shut, makeShutline());
    m.receiveShadow = true;
    body.add(m);
  }
  const accent = buildPanelSeams(keys, ACCENTS);
  if (accent) body.add(new THREE.Mesh(accent, carbon));

  // ---- cockpit opening ----
  // Tray first (dark, 12 mm proud of the deck), then the rim ribbon 26 mm
  // proud on top of its edge, so the opening has a real raised lip instead of
  // reading as a black decal painted on the deck.
  const tray = buildPanelSeams(keys, COCKPIT_TRAY);
  if (tray) body.add(new THREE.Mesh(tray, trim));
  const rim = buildPanelSeams(keys, COCKPIT_RIM);
  if (rim) {
    const m = new THREE.Mesh(rim, carbon);
    m.castShadow = true;
    body.add(m);
  }
  body.add(buildDriver(paint, carbon, trim, satin));
  body.add(buildHalo(carbon, satin));

  // Mirrors, held out over the tub sides on stalks. The stalk root has to
  // start ON the cockpit rim (skin ≈ y 0.107 at x 0.20, rim crown ≈ 0.133) —
  // rooted at cockpit-rail height it hangs in the air with a visible gap.
  for (const sx of [-1, 1]) {
    body.add(strut(carbon, [sx * 0.200, 0.128, 0.195], [sx * 0.320, 0.180, 0.240], 0.013, 0.6));
    const pod = box(0.090, 0.052, 0.048, paint, sx * 0.352, 0.188, 0.240);
    pod.rotation.y = -sx * 0.16;
    body.add(pod);
    const face = new THREE.Mesh(new THREE.PlaneGeometry(0.072, 0.038), satin);
    face.rotation.y = Math.PI - sx * 0.16;
    face.position.set(sx * 0.352, 0.188, 0.214);
    body.add(face);
  }

  // ---- bodywork ----
  body.add(buildAirbox(paint, carbon, trim, satin));
  body.add(buildSidepods(paint, carbon, trim));

  // Onboard camera pods on the nose.
  for (const sx of [-1, 1]) {
    body.add(strut(carbon, [sx * 0.055, 0.055, 1.620], [sx * 0.090, 0.145, 1.620], 0.011, 0.6));
    body.add(box(0.046, 0.036, 0.095, carbon, sx * 0.090, 0.168, 1.620));
  }

  // ---- floor, aero, wings ----
  // Floor/plank. buildUnderbody's bevelled extrusion spans y-0.03 .. y+0.06,
  // so -0.315 puts its TOP face at -0.255: below the sidepods' floor edge
  // (-0.250) and 35 mm below the tub's own underside (-0.220). Both clearances
  // are deliberate — at y -0.280 the pan's top face landed exactly on the tub
  // floor plane and the two coplanar sheets z-fought the length of the car.
  body.add(buildUnderbody({ y: -0.315, w: 1.240, len: 3.300 }));
  body.add(buildFloorEdge(carbon));
  body.add(buildTurningVanes(carbon));
  body.add(buildDiffuser({ z: -1.940, y: -0.255, w: 1.060, roofRise: 0.120, strakes: 5 }));
  body.add(buildFrontWing(carbon, satin));
  body.add(buildRearWing(carbon, satin));

  // ---- suspension ----
  for (const sx of [-1, 1]) {
    body.add(buildCorner(sx, true, carbon, satin, trim));
    body.add(buildCorner(sx, false, carbon, satin, trim));
  }

  // ---- rain light + exhaust ----
  // The tail is crowded: the diffuser roof tops out at y ≈ -0.10 here and the
  // beam wing bottoms at ≈ -0.03, so the rain light lives in the 40 mm band
  // between them and the exhaust exits above the crash structure's crown.
  // The rain light is the pulsed brake mesh: it must stay its OWN mesh with
  // its own (uncached) material, because car.js mutates the emissive every
  // frame — hence noMerge.
  const rain = box(0.085, 0.042, 0.036, makeTaillight(), 0, -0.072, -2.078);
  rain.userData.noMerge = true;
  body.add(rain);
  body.add(box(0.113, 0.070, 0.022, trim, 0, -0.072, -2.066));   // surround

  const pipe = tubeZ(0.042, 0.042, 0.160, satin, 14, true);
  pipe.position.set(0, 0.098, -2.095);
  body.add(pipe);
  const bore = tubeZ(0.030, 0.030, 0.150, trim, 12);
  bore.position.set(0, 0.098, -2.082);
  body.add(bore);
  const shroud = tubeZ(0.056, 0.060, 0.045, trim, 14);
  shroud.position.set(0, 0.096, -2.036);
  body.add(shroud);

  return { brakeLights: rain };
}
