import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import {
  makeTrim, makeCarbon, makeSatin, makeHeadlight, makeLens,
  makeTaillight, makeGrille, makePaint, makeCaliper,
} from './carMaterials.js';
import { plateTexture, badgeTexture } from './texgen.js';

// All parts authored in the same chassis-local frame as the hull
// (+Z forward, +Y up, +X right). Y values follow the proven placement from the
// original car so everything sits correctly on the wheels.
//
// NOTE ON MATERIALS: chrome is deliberately absent from this file. Bright
// metal has blown out to featureless white under the golden-hour sun three
// times now (exhaust tips, wing posts, rim), so every "bright" accent here is
// makeSatin (roughness 0.42) at worst. Do not "upgrade" a bezel to makeChrome.

// ---------------------------------------------------------------------------
// Small construction helpers. Everything below is boxes/cylinders so that
// mergeByMaterial can collapse it all into one mesh per material — a hundred
// tiny meshes sharing makeTrim cost exactly one draw call.
// ---------------------------------------------------------------------------

function box(w, h, d, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  return m;
}

// Cylinder with its axis along +Z (the direction every fascia part faces).
function tubeZ(rTop, rBot, len, mat, seg = 12, open = false) {
  const g = new THREE.CylinderGeometry(rTop, rBot, len, seg, 1, open);
  g.rotateX(Math.PI / 2);
  return new THREE.Mesh(g, mat);
}

// Transparent materials are never touched by mergeByMaterial (they have to keep
// their own draw order), so lens geometry is merged HERE by hand: one mesh for
// both headlight lenses, one for the whole red taillight cluster. Left alone,
// every lamp element would be its own draw call on each of the five cars in
// each of the three render passes.
function mergedMesh(geos, mat) {
  const usable = geos.filter(Boolean);
  if (!usable.length) return null;
  const merged = usable.length === 1 ? usable[0] : mergeGeometries(usable, false);
  return new THREE.Mesh(merged || usable[0], mat);
}

// A slightly bowed panel — used for lenses that have to follow the fender
// curve instead of sitting on the nose as a flat playing card. bowX/bowY are
// how far the edges fall back from the centre along -Z.
function curvedPanelGeo(w, h, bowX = 0.03, bowY = 0.01, segs = 6) {
  const g = new THREE.PlaneGeometry(w, h, segs, 2);
  const pos = g.getAttribute('position');
  for (let i = 0; i < pos.count; i++) {
    const u = pos.getX(i) / (w * 0.5);
    const v = pos.getY(i) / (h * 0.5);
    pos.setZ(i, -bowX * u * u - bowY * v * v);
  }
  pos.needsUpdate = true;
  g.computeVertexNormals();
  return g;
}

// ---- Recess shell primitives ----------------------------------------------
// A recess used to be nine BoxGeometries (floor + 4 walls + 4 lip bars) = 108
// triangles, of which ~60 were interior faces no camera can ever reach: the
// backs of the wall boxes, the ends of the lip bars, the underside of the
// floor. There are 18-22 recesses on a road car, so that was ~1.3 k triangles
// per car spent on geometry inside solid material. These build the SAME
// silhouette as an open shell of rectangular bands — 50 triangles, every one
// of them a face you can see.
//
// Winding is the trap here (see the "wrong side" note in loftBuilder): the ring
// order below is CCW seen from +Z, and a band stitched from a LOW ring to a
// HIGH one then faces outward. Normals are written per quad rather than left to
// computeVertexNormals, which would average the four corners into a soft bevel
// and lose the hard catch-light edge that is the whole point of the lip.
const rectRing = (rx, ry) => [[rx, ry], [-rx, ry], [-rx, -ry], [rx, -ry]];
// outward normal of side i of that ring: top, left, bottom, right
const RING_N = [[0, 1, 0], [-1, 0, 0], [0, -1, 0], [1, 0, 0]];

function pushQuad(o, verts, n) {
  const base = o.p.length / 3;
  for (const v of verts) {
    o.p.push(v[0], v[1], v[2]);
    o.n.push(n[0], n[1], n[2]);
    o.uv.push(0, 0);
  }
  o.i.push(base, base + 1, base + 2, base, base + 2, base + 3);
}

// Four-sided band between two rectangular rings at zA and zB (zB > zA).
function pushBand(o, ring, zA, zB, inward) {
  for (let i = 0; i < 4; i++) {
    const j = (i + 1) % 4;
    const a = [ring[i][0], ring[i][1], zA], b = [ring[j][0], ring[j][1], zA];
    const c = [ring[j][0], ring[j][1], zB], d = [ring[i][0], ring[i][1], zB];
    const n = RING_N[i];
    if (inward) pushQuad(o, [d, c, b, a], [-n[0], -n[1], -n[2]]);
    else pushQuad(o, [a, b, c, d], n);
  }
}

// Flat frame at constant z between an inner and an outer rectangular ring.
function pushFrame(o, inner, outer, z, back) {
  for (let i = 0; i < 4; i++) {
    const j = (i + 1) % 4;
    const a = [inner[i][0], inner[i][1], z], b = [inner[j][0], inner[j][1], z];
    const c = [outer[j][0], outer[j][1], z], d = [outer[i][0], outer[i][1], z];
    // inner_i -> outer_i -> outer_j -> inner_j is the front-facing order; the
    // obvious inner_i -> inner_j -> outer_j -> outer_i is inside-out.
    if (back) pushQuad(o, [b, c, d, a], [0, 0, -1]);
    else pushQuad(o, [a, d, c, b], [0, 0, 1]);
  }
}

function shellGeometry(build) {
  const o = { p: [], n: [], uv: [], i: [] };
  build(o);
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(o.p, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(o.n, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(o.uv, 2));
  g.setIndex(o.i);
  return g;
}

/**
 * A recessed rectangular opening facing +Z, added into `g`.
 *
 * The hull is a CLOSED loft — we cannot cut a hole in it — so a recess has to
 * be built the other way up: the rim stands proud of the skin and the floor
 * sits ON it. Visually that is the same read (a dark interior framed by a
 * catch-light edge) from every angle a driving camera ever sees, and it can
 * never expose the hollow inside of the body the way a real cut-out would.
 * This one helper is what gives the headlights, taillights, grille, brake
 * ducts and body vents their depth.
 *
 * Outer dimensions are unchanged from the nine-box version it replaces: the
 * cavity is (w - 2*wall) x (h - 2*wall), the mouth stands `depth` proud of the
 * skin, and the lip is a `lipT` bead running directly outboard of the wall
 * faces (no overhanging flange, which would float visibly above the skin at
 * grazing angles).
 */
export function addOpening(g, {
  w, h, depth = 0.055, wall = 0.012, lipT = 0.013, zi = 0.010,
  x = 0, y = 0, z = 0,
  floorMat, wallMat, lipMat, floor = true,
}) {
  const hw = w / 2, hh = h / 2;
  const wi = Math.max(0.002, hw - wall), hi = Math.max(0.002, hh - wall);
  const lipZ = Math.max(zi + 0.002, depth - lipT);
  const inner = rectRing(wi, hi);
  const mouth = rectRing(hw, hh);
  const outer = rectRing(hw + lipT, hh + lipT);
  const push = (m) => { m.position.set(m.position.x + x, m.position.y + y, m.position.z + z); g.add(m); };

  if (floor) {
    // Cavity floor, a single quad standing just off the skin.
    const f = shellGeometry((o) => pushQuad(o, [
      [-wi, -hi, zi], [wi, -hi, zi], [wi, hi, zi], [-wi, hi, zi],
    ], [0, 0, 1]));
    push(new THREE.Mesh(f, floorMat));
  }
  // Walls: the cavity face, its rim, and the outer flank of the tub below the
  // lip — near-black, so the mouth reads as a shadowed cavity.
  push(new THREE.Mesh(shellGeometry((o) => {
    pushBand(o, inner, 0, depth, true);
    pushFrame(o, inner, mouth, depth, false);
    pushBand(o, mouth, 0, lipZ, false);
  }), wallMat));
  // Lip bead.
  push(new THREE.Mesh(shellGeometry((o) => {
    pushFrame(o, mouth, outer, lipZ, true);
    pushBand(o, outer, lipZ, depth, false);
    pushFrame(o, mouth, outer, depth, false);
  }), lipMat));
  return g;
}

// Indicator amber. ONE shared material for every turn signal on the car (front
// cluster, rear cluster, side repeaters, mirror strips) — an emissive this
// small earns its bucket because it is the only warm accent on an otherwise
// monochrome fascia and it is what makes a lamp cluster read as a cluster
// rather than a dark rectangle. Intensity stays under the 0.91 bloom
// threshold: an indicator that blooms reads as a lit lamp, not a parked car.
let _amberMat = null;
function amberMaterial() {
  if (_amberMat) return _amberMat;
  _amberMat = new THREE.MeshStandardMaterial({
    color: 0x8a4406, emissive: 0xff8c14, emissiveIntensity: 0.85,
    roughness: 0.32, metalness: 0.0, envMapIntensity: 0.5,
  });
  return _amberMat;
}

// ---- Headlight clusters ---------------------------------------------------
// A real cluster, not a slit: a recessed housing tub with a visible opening
// lip, projector barrels sitting in reflector dishes, an LED DRL signature
// shaped like a hook (that is the element that reads at 8 m — a bright,
// recognisable SHAPE, not brightness), an indicator segment along the lower
// edge, and a lens bowed back at the ends so it follows the fender instead of
// standing off the nose like a card.
//
// EVERY internal z below is a fraction of `depth`, not an absolute. It used to
// be absolute, tuned for depth 0.076 — so asking for a shallow cluster (which
// is what a car with a flat fascia cap needs, or the whole housing stands out
// of the bodywork as a bolted-on box) left the projector bulbs poking straight
// through the lens and the lens bowed back behind the housing floor. DEPTH_REF
// is the depth those numbers were tuned at, so a 0.076 call reproduces them.
const DEPTH_REF = 0.076;

export function buildHeadlights({
  z = 1.92, y = 0.64, x = 0.60,
  width = 0.46, height = 0.16, depth = 0.076,
  yaw = 0.32, pitch = -0.12,
  projectors = 2, drl = true, indicator = true, brow = true, lens = true,
} = {}) {
  const g = new THREE.Group();
  const housingMat = makeTrim();
  const emit = makeHeadlight();
  const amber = amberMaterial();
  const lensGeos = [];
  const k = Math.min(1, depth / DEPTH_REF);   // shrink z-extents on a shallow lamp

  for (const sx of [-1, 1]) {
    const cluster = new THREE.Group();
    cluster.position.set(sx * x, y, z);
    cluster.rotation.y = -sx * yaw;   // wrap around the nose
    cluster.rotation.x = pitch;       // follow the bonnet slope
    const o = sx;                     // local +x*o points OUTBOARD on this side
    const hw = width / 2, hh = height / 2;

    addOpening(cluster, {
      w: width, h: height, depth, wall: 0.011, lipT: 0.013,
      floorMat: housingMat, wallMat: housingMat,
      lipMat: brow ? makeSatin() : housingMat,
    });

    // Projector barrels: a satin reflector dish with a bright lens button
    // sunk into it and a dark bezel ring. Two of them across the cluster is
    // what stops the lamp reading as one undifferentiated slot.
    for (let i = 0; i < projectors; i++) {
      const t = projectors === 1 ? 0.5 : i / (projectors - 1);
      const px = o * THREE.MathUtils.lerp(-hw + 0.085, hw - 0.105, t);
      const py = -hh + height * 0.42;
      const dish = tubeZ(0.056, 0.026, 0.030 * k, makeSatin(), 8);
      dish.position.set(px, py, depth * 0.368);
      cluster.add(dish);
      const bulb = tubeZ(0.034, 0.034, 0.022 * k, emit, 8);
      bulb.position.set(px, py, depth * 0.632);
      cluster.add(bulb);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.009 * k, 3, 10), housingMat);
      ring.position.set(px, py, depth * 0.605);
      cluster.add(ring);
    }

    if (drl) {
      // Hook signature: a blade along the top edge dropping down at the outer
      // end. Two boxes, and it is the single most legible thing on the fascia.
      const blade = box(width * 0.84, 0.020, 0.014 * k, emit, 0, hh - 0.032, depth * 0.658);
      blade.rotation.z = o * 0.05;
      cluster.add(blade);
      const drop = box(0.019, height * 0.48, 0.014 * k, emit,
        o * (hw - 0.030), hh - 0.032 - height * 0.26, depth * 0.658);
      drop.rotation.z = o * 0.12;
      cluster.add(drop);
    }

    if (indicator) {
      const ind = box(width * 0.46, 0.017, 0.013 * k, amber,
        o * (hw - width * 0.27), -hh + 0.026, depth * 0.632);
      ind.rotation.z = o * 0.04;
      cluster.add(ind);
    }

    if (lens) {
      const lg = curvedPanelGeo(width + 0.020, height + 0.016, 0.030 * k, 0.008 * k, 6);
      lg.translate(0, 0, depth - 0.012 * k);
      cluster.updateMatrix();
      lg.applyMatrix4(cluster.matrix);
      lensGeos.push(lg);
    }
    g.add(cluster);
  }

  const lensMesh = lens ? mergedMesh(lensGeos, makeLens()) : null;
  if (lensMesh) g.add(lensMesh);
  return g;
}

// ---- Taillights -----------------------------------------------------------
// Full-width lamp: two tall outboard clusters joined by a shallow centre bar,
// all recessed behind a satin bezel. The waist in the middle is not styling —
// it keeps the lamp clear of the rear badge, which sits at x 0 just above it.
//
// Returns { group, brakeMesh }. brakeMesh is ONE mesh carrying ALL the red
// geometry (bar + end panels + light pipes + fog), pre-merged by hand, because
// car.js mutates its material's emissiveIntensity/opacity every frame — so it
// must stay a single mesh with a single non-shared material.
export function buildTaillights({
  z = -2.04, y = 0.74, width = 1.5,
  height = 0.15, depth = 0.058, barH = 0.055,
  segments = 6, reverse = true, fog = true, indicator = true, lens = true,
} = {}) {
  const g = new THREE.Group();
  const trim = makeTrim();
  const emit = makeHeadlight();
  const amber = amberMaterial();

  const clusterW = width * 0.30;
  const xc = width / 2 - clusterW / 2;      // outboard cluster centres
  const xInner = width / 2 - clusterW;      // where the centre bar section ends
  const zFloor = z - 0.006;                 // recess floor (just proud of the tail)
  const zMouth = z - depth;                 // bezel plane
  const zRed = z - depth + 0.022;           // red elements, sunk inside the tub

  // Recesses. The two cluster tubs and the centre bar tub are separate
  // openings so the lamp has a real silhouette instead of one long slab.
  for (const sx of [-1, 1]) {
    const tub = new THREE.Group();
    tub.position.set(sx * xc, y, z);
    tub.rotation.y = Math.PI;               // openings face -Z (rearward)
    addOpening(tub, {
      w: clusterW, h: height, depth, wall: 0.012, lipT: 0.013,
      floorMat: trim, wallMat: trim, lipMat: makeSatin(),
    });
    g.add(tub);
  }
  const mid = new THREE.Group();
  mid.position.set(0, y, z);
  mid.rotation.y = Math.PI;
  addOpening(mid, {
    w: xInner * 2, h: barH + 0.028, depth: depth - 0.010, wall: 0.010, lipT: 0.012,
    floorMat: trim, wallMat: trim, lipMat: makeSatin(),
  });
  g.add(mid);

  // ---- red (pulsed) geometry, all baked into one buffer ----
  const red = [];
  const addRed = (geo, px, py, pz) => { geo.translate(px, py, pz); red.push(geo); };
  addRed(new THREE.BoxGeometry(width - 0.026, barH, 0.022), 0, y, zRed);
  for (const sx of [-1, 1]) {
    addRed(new THREE.BoxGeometry(clusterW * 0.72, height * 0.50, 0.022),
      sx * xc, y + height * 0.20, zRed);
    // light-pipe cap wrapping the outer corner
    const pipe = new THREE.CylinderGeometry(0.030, 0.030, 0.085, 12);
    pipe.rotateZ(Math.PI / 2);
    addRed(pipe, sx * (width / 2 - 0.045), y, zRed);
    if (fog) {
      addRed(new THREE.BoxGeometry(0.085, 0.038, 0.020),
        sx * (xc + clusterW * 0.24), y - height * 0.34, zRed);
    }
  }
  const brakeMat = makeTaillight();
  const brakeMesh = mergedMesh(red, brakeMat)
    || new THREE.Mesh(new THREE.BoxGeometry(width, barH, 0.022), brakeMat);
  brakeMesh.userData.noMerge = true;   // pulsed per-frame; keep as its own mesh
  g.add(brakeMesh);

  // Internal segment dividers across the centre bar — thin dark fins standing
  // just proud of the red, so the bar reads as a row of LED elements.
  for (let i = 1; i < segments; i++) {
    const fx = (i / segments - 0.5) * (xInner * 2 - 0.04);
    g.add(box(0.011, barH + 0.006, 0.028, trim, fx, y, zRed - 0.004));
  }

  for (const sx of [-1, 1]) {
    if (reverse) {
      g.add(box(0.075, 0.034, 0.020, emit,
        sx * (xc - clusterW * 0.26), y - height * 0.34, zRed));
    }
    if (indicator) {
      g.add(box(clusterW * 0.60, 0.024, 0.020, amber,
        sx * xc, y - height * 0.06, zRed + 0.001));
    }
  }

  if (lens) {
    const geos = [];
    for (const sx of [-1, 1]) {
      const lg = curvedPanelGeo(clusterW + 0.014, height + 0.012, 0.014, 0.006, 4);
      lg.rotateY(Math.PI);
      lg.translate(sx * xc, y, zMouth + 0.006);
      geos.push(lg);
    }
    const cg = curvedPanelGeo(xInner * 2, barH + 0.024, 0.010, 0.004, 4);
    cg.rotateY(Math.PI);
    cg.translate(0, y, zMouth + 0.016);
    geos.push(cg);
    const lm = mergedMesh(geos, makeLens());
    if (lm) g.add(lm);
  }

  return { group: g, brakeMesh };
}

// ---- Side mirrors: a small angular pod (boxy housing, flat smoked face) on
// a thin blade stalk. Sized like a real door mirror (~0.16 long); the old
// scaled-sphere version blew out into a floating white ball. Now with a
// faired stalk (a tapered aerofoil rather than a plank), an indicator strip
// down the outboard flank and a bezel around the glass. ----
let _mirrorFaceMat = null;
function mirrorFaceMaterial() {
  if (_mirrorFaceMat) return _mirrorFaceMat;
  _mirrorFaceMat = new THREE.MeshStandardMaterial({
    color: 0x272c33, metalness: 1.0, roughness: 0.14, envMapIntensity: 0.7,
  });
  return _mirrorFaceMat;
}

export function buildMirrors({
  z = 0.5, y = 0.98, x = 0.95, color = 0xc8161d,
  indicator = true, fairing = true,
} = {}) {
  const g = new THREE.Group();
  const trim = makeTrim();
  for (const sx of [-1, 1]) {
    const m = new THREE.Group();
    // thin blade stalk leaning down-inward onto the door shoulder
    const stalk = box(0.11, 0.022, 0.05, trim, sx * 0.04, -0.03, 0);
    stalk.rotation.z = sx * 0.5;
    m.add(stalk);
    if (fairing) {
      // teardrop fairing over the stalk root: a tapered cylinder laid along
      // the stalk. Without it the mirror looks stuck on with a matchstick.
      const f = tubeZ(0.030, 0.016, 0.075, trim, 8);
      f.rotation.y = Math.PI / 2;
      f.rotation.z = sx * 0.5;
      f.position.set(sx * 0.055, -0.022, 0);
      m.add(f);
    }
    // Angular housing. Deliberately in TRIM, not paint: a 16 cm convex box
    // aimed up-and-outboard is the worst possible shape for a clear coat under
    // this sky — it mirrors it and clips to a white sticker stuck on the
    // A-pillar. Black mirror caps are common on real cars and are immune.
    const housing = box(0.16, 0.068, 0.095, trim, sx * 0.12, 0.01, 0);
    housing.rotation.y = sx * 0.08;
    housing.castShadow = true;
    m.add(housing);
    // dark bezel behind the glass so the mirror face has a rim to read against
    const bezel = box(0.145, 0.058, 0.012, trim, sx * 0.122, 0.01, -0.047);
    bezel.rotation.y = sx * 0.08;
    m.add(bezel);
    // flat smoked mirror face on the rear of the pod
    const face = new THREE.Mesh(new THREE.PlaneGeometry(0.125, 0.05), mirrorFaceMaterial());
    face.rotation.y = Math.PI + sx * 0.08;
    face.position.set(sx * 0.124, 0.01, -0.052);
    m.add(face);
    if (indicator) {
      // repeater strip along the outboard shoulder of the pod
      const ind = box(0.11, 0.014, 0.020, amberMaterial(), sx * 0.135, 0.040, 0.005);
      ind.rotation.y = sx * 0.08;
      m.add(ind);
    }
    m.position.set(sx * x, y, z);
    g.add(m);
  }
  return g;
}

// ---- Front grille / intake ------------------------------------------------
// A real intake: a recessed duct mouth (so it reads black inside), a mesh
// insert set at the bottom of the duct, a surround bezel, and lower corner
// intakes doubling as brake ducts. The old version was a single flat plane,
// which at any distance was indistinguishable from a dark decal.
export function buildGrille({
  z = 2.02, y = 0.44, w = 0.9, h = 0.22,
  depth = 0.052, bar = true, ducts = true, color = null,
  ductW = null, ductH = null, ductX = null, ductY = null,
} = {}) {
  const g = new THREE.Group();
  const trim = makeTrim();
  const bezelMat = color === null ? trim : makePaint(color);

  const mouth = new THREE.Group();
  mouth.position.set(0, y, z);
  addOpening(mouth, {
    w, h, depth, wall: 0.012, lipT: 0.014,
    floorMat: makeGrille(), wallMat: trim, lipMat: bezelMat,
  });
  // Horizontal blade across the mouth — one satin element is all it takes for
  // the opening to read as a designed grille rather than a hole.
  if (bar) {
    const blade = box(w - 0.02, 0.022, 0.026, makeSatin(), 0, 0, depth - 0.024);
    mouth.add(blade);
    // vertical mesh dividers, standing proud of the honeycomb floor
    const n = Math.max(2, Math.round(w / 0.16));
    for (let i = 1; i < n; i++) {
      mouth.add(box(0.010, h - 0.026, 0.018, trim, (i / n - 0.5) * (w - 0.024), 0, 0.018));
    }
  }
  g.add(mouth);

  if (ducts) {
    // Lower corner intakes / brake ducts. Pure undertray black inside: a brake
    // duct is a hole to nowhere, and any env reflection in there turns it into
    // a grey patch stuck on the bumper.
    const dw = ductW ?? Math.min(0.24, Math.max(0.14, w * 0.32));
    const dh = ductH ?? Math.max(0.085, h * 0.66);
    const dx = ductX ?? (w / 2 + dw / 2 + 0.035);
    const dy = ductY ?? (y - h * 0.16);
    for (const sx of [-1, 1]) {
      const d = new THREE.Group();
      d.position.set(sx * dx, dy, z);
      addOpening(d, {
        w: dw, h: dh, depth: depth * 0.9, wall: 0.010, lipT: 0.011,
        floorMat: undertrayMaterial(), wallMat: undertrayMaterial(), lipMat: trim,
      });
      // a single splitter vane, angled — reads as ducting, costs 12 triangles
      const vane = box(dw - 0.016, 0.009, 0.024, trim, 0, 0, depth * 0.9 - 0.020);
      vane.rotation.x = 0.25;
      d.add(vane);
      g.add(d);
    }
  }
  return g;
}

// ---- Front splitter: a thin dark lip tucked under the bumper, barely proud
// of the fascia. Real splitters are near-invisible edge-on — not a stack of
// grey planks past the nose. Lightless undertray material: the carbon
// clearcoat mirrored the bright sky and read as a white plank from above.
// z is the lip centre; front edge ≈ z + 0.10.
// Now also carries the two things that make a splitter read as a made object:
// dive planes on the bumper corners and short support rods at the leading
// edge. Both are deliberately small — this is the part of the car closest to
// the ground and the easiest to turn into floating scenery. ----
export function buildSplitter({
  z = 1.98, y = -0.19, w = 1.3,
  fins = true, canards = true, rods = true,
  canardX = null, canardY = null, canardZ = null, canardLen = 0.13,
} = {}) {
  const g = new THREE.Group();
  const under = undertrayMaterial();
  const lip = box(w, 0.024, 0.20, under, 0, y, z);
  lip.castShadow = true;
  g.add(lip);
  // chamfered leading edge — a thinner strip ahead of the lip so the splitter
  // has a knife edge instead of a square 24 mm plank end
  g.add(box(w * 0.96, 0.012, 0.045, under, 0, y - 0.004, z + 0.118));

  if (fins) {
    // end fins turn the outer corners up; the strongest read from head-on
    for (const sx of [-1, 1]) {
      const fin = box(0.016, 0.055, 0.17, under, sx * (w / 2 - 0.012), y + 0.028, z - 0.005);
      fin.rotation.z = -sx * 0.10;
      g.add(fin);
    }
  }
  if (rods) {
    // short struts from the lip up into the bumper face
    for (const sx of [-1, 1]) {
      const rod = tubeZ(0.009, 0.009, 0.10, makeSatin(), 8);
      rod.rotation.x = Math.PI / 2 - 0.35;
      rod.position.set(sx * w * 0.29, y + 0.045, z + 0.075);
      g.add(rod);
    }
  }
  if (canards) {
    // Dive planes on the bumper corners. Half-buried in the fascia by design:
    // the inboard end disappears into the bodywork exactly as a bonded canard
    // does, which is what stops it looking like a shelf stuck on the side.
    const cx = canardX ?? (w / 2 - 0.02);
    const cy = canardY ?? (y + 0.09);
    const cz = canardZ ?? (z - 0.06);
    const carbon = makeCarbon();
    for (const sx of [-1, 1]) {
      for (let i = 0; i < 2; i++) {
        const plane = box(canardLen, 0.011, 0.085 - i * 0.020, carbon,
          sx * (cx + canardLen * 0.42), cy + i * 0.062, cz - i * 0.012);
        plane.rotation.z = sx * 0.28;
        plane.rotation.y = -sx * 0.16;
        g.add(plane);
      }
    }
  }
  return g;
}

// ---- Rear diffuser: a kicked-up dark ramp tucked under the tail (rear edge
// rises toward the bumper cut-out) with short strakes, all in the lightless
// undertray material so it reads as a shadowed cavity.
// The strakes alone read as fins on a flat plate; a TUNNEL ROOF over them
// closes each channel so the rear view is a row of dark mouths — which is the
// whole point of a diffuser and the reason it reads as a cavity at all. ----
export function buildDiffuser({
  z = -1.95, y = -0.27, w = 1.44,
  tunnels = true, roofRise = 0.105, fences = true, strakes = 5,
} = {}) {
  const g = new THREE.Group();
  const mat = undertrayMaterial();
  const base = box(w, 0.035, 0.44, mat, 0, y, z);
  base.rotation.x = 0.30;                     // kick up toward the tail
  g.add(base);
  const n = strakes;
  for (let i = 0; i < n; i++) {
    const st = box(0.022, 0.09, 0.38, mat, (i / (n - 1) - 0.5) * (w * 0.88), y + 0.05, z);
    st.rotation.x = 0.30;
    g.add(st);
  }
  if (tunnels) {
    // Roof plate: shorter than the base and shifted rearward so its leading
    // edge stays clear of the underbody pan (which ends at ±len/2 and sits at
    // about y -0.21 on top). Same 0.30 kick so the tunnels stay parallel.
    const roof = box(w, 0.022, 0.32, mat, 0, y + roofRise, z - 0.045);
    roof.rotation.x = 0.30;
    g.add(roof);
    for (const sx of [-1, 1]) {
      const wall = box(0.020, roofRise, 0.36, mat, sx * (w / 2 - 0.010), y + roofRise / 2, z - 0.02);
      wall.rotation.x = 0.30;
      g.add(wall);
    }
  }
  if (fences) {
    // outer vertical fences past the tunnel mouths
    for (const sx of [-1, 1]) {
      const f = box(0.018, 0.13, 0.16, mat, sx * (w / 2 + 0.006), y + 0.045, z - 0.14);
      g.add(f);
    }
  }
  return g;
}

// ---- Rear wing with a real airfoil section --------------------------------
// Gains a Gurney flap on the trailing edge and endplates built as a frame with
// real cut-outs + louvres instead of one solid slab. Endplate cut-outs are
// cheap (a few boxes) and they are what separates "aero part" from "plank".
export function buildWing({
  z = -1.92, y = 1.06, span = 1.62, deckY = 0.82, style = 'gt',
  gurney = true, cutouts = true,
} = {}) {
  const g = new THREE.Group();
  const carbon = makeCarbon();
  if (style === 'ducktail') {
    // muscle: a lip spoiler rising straight off the rear deck (not hovering)
    const lipMat = makePaint(0x111316);
    const lip = box(span, 0.05, 0.30, lipMat, 0, deckY + 0.03, z + 0.16);
    lip.rotation.x = -0.18;
    g.add(lip);
    // The Gurney and the end fences are CHILDREN of the lip, exactly as the
    // GT wing's Gurney is a child of its element. They used to be siblings
    // positioned in world terms and rotated about their own origins, which put
    // the Gurney 28 mm ABOVE the lip's trailing edge — a full-width black bar
    // hovering over the spoiler with sky visible under it, dead centre of the
    // view the player has of every AI car. Parenting makes the offset
    // structural: the flap's foot sinks 3 mm INTO the lip's top face (which is
    // at local y 0.025) rather than resting on it, because a coplanar contact
    // over 1.56 m is the one thing worse than a gap.
    if (gurney) {
      // upturned trailing edge — the ducktail's whole purpose
      lip.add(box(span, 0.032, 0.010, lipMat, 0, 0.038, -0.145));
    }
    // small side fences closing the ends of the lip
    for (const sx of [-1, 1]) {
      lip.add(box(0.014, 0.055, 0.24, lipMat, sx * (span / 2 - 0.007), 0.020, -0.010));
    }
    return g;
  }

  // airfoil cross-section (teardrop), extruded along its width then turned to X
  const af = new THREE.Shape();
  af.moveTo(-0.19, 0.0);
  af.quadraticCurveTo(-0.10, 0.05, 0.06, 0.032);
  af.quadraticCurveTo(0.15, 0.016, 0.19, 0.0);
  af.quadraticCurveTo(0.06, -0.03, -0.06, -0.028);
  af.quadraticCurveTo(-0.15, -0.02, -0.19, 0.0);
  const wingGeo = new THREE.ExtrudeGeometry(af, {
    depth: span, bevelEnabled: false, steps: 1,
  });
  wingGeo.translate(0, 0, -span / 2);
  wingGeo.rotateY(Math.PI / 2);     // span -> X
  const element = new THREE.Mesh(wingGeo, carbon);
  element.rotation.x = -0.16;       // angle of attack
  element.position.set(0, y, z);
  element.castShadow = true;
  // Gurney flap as a CHILD so it inherits the angle of attack (and so the f1
  // clone below gets its own automatically). Shape x +0.19 maps to car z -0.19
  // after the rotateY, i.e. the trailing edge is at local z -0.19.
  if (gurney) element.add(box(span, 0.028, 0.007, carbon, 0, 0.014, -0.192));
  g.add(element);

  if (style === 'f1') {
    const e2 = element.clone();
    e2.position.y = y + 0.14;
    e2.rotation.x = -0.30;
    e2.scale.set(1, 0.7, 0.9);
    g.add(e2);
  }

  // endplates
  for (const sx of [-1, 1]) {
    if (!cutouts) {
      g.add(box(0.02, 0.22, 0.42, carbon, sx * span / 2, y, z));
      continue;
    }
    // frame + louvres: a rectangular hole through the middle and two slats
    const px = sx * span / 2;
    g.add(box(0.02, 0.045, 0.42, carbon, px, y + 0.0875, z));   // top rail
    g.add(box(0.02, 0.045, 0.42, carbon, px, y - 0.0875, z));   // bottom rail
    g.add(box(0.02, 0.22, 0.055, carbon, px, y, z + 0.1825));   // leading post
    g.add(box(0.02, 0.22, 0.055, carbon, px, y, z - 0.1825));   // trailing post
    for (let i = 0; i < 2; i++) {
      const lo = box(0.026, 0.016, 0.10, carbon, px, y + 0.035 - i * 0.070, z + 0.055);
      lo.rotation.x = 0.35;
      g.add(lo);
    }
  }
  // swan-neck posts — satin, not chrome (chrome blew out to white sticks)
  for (const sx of [-1, 1]) {
    const post = box(0.04, y - deckY + 0.06, 0.10, makeSatin(), sx * 0.55, (y + deckY) / 2, z + 0.02);
    g.add(post);
    // the swan neck itself: a short arm from the post top forward onto the
    // element's upper surface, so the wing is carried, not levitating
    g.add(box(0.036, 0.030, 0.14, makeSatin(), sx * 0.55, y - 0.012, z + 0.075));
  }
  return g;
}

// ---- Exhaust tips — satin steel, not chrome (chrome blew out to white
// donuts under the bright sky). Each tip is now a rolled-lip sleeve with a
// genuinely hollow bore: the inner sleeve and its end cap are the LIGHTLESS
// undertray material, so the bore is a true black hole from every angle
// instead of a grey disc, and a soot collar behind the mouth stands in for
// heat discolouration without costing a new material. ----
export function buildExhaust({
  z = -2.07, y = 0.38, x = 0.45, count = 2,
  r = 0.052, bore = true, shroud = true,
} = {}) {
  const g = new THREE.Group();
  const satin = makeSatin();
  const trim = makeTrim();
  const black = undertrayMaterial();
  const xs = count === 4 ? [-x - 0.1, -x + 0.04, x - 0.04, x + 0.1] : [-x, x];
  // Segment counts are split by what the part actually has to hold: the satin
  // sleeve and its shroud are the only round silhouettes you read from behind,
  // so they keep 12; everything inside the bore is unlit black and gets 10.
  for (const sx of xs) {
    // outer sleeve, open-ended so you look straight down the pipe
    const tip = tubeZ(r, r * 1.10, 0.15, satin, 12, true);
    tip.position.set(sx, y, z);
    g.add(tip);
    // rolled lip at the mouth — the detail that says "tip", not "tube"
    const roll = new THREE.Mesh(new THREE.TorusGeometry(r - 0.006, 0.008, 3, 12), satin);
    roll.position.set(sx, y, z - 0.073);
    g.add(roll);
    if (bore) {
      // black bore + end cap, recessed so the pipe has visible internal depth
      const inner = tubeZ(r - 0.013, r - 0.013, 0.15, black, 10, true);
      inner.position.set(sx, y, z + 0.005);
      g.add(inner);
      const cap = tubeZ(r - 0.013, r - 0.013, 0.008, black, 10);
      cap.position.set(sx, y, z + 0.052);
      g.add(cap);
      // soot / heat-stained collar just inside the mouth
      const soot = tubeZ(r - 0.008, r - 0.008, 0.030, trim, 10, true);
      soot.position.set(sx, y, z - 0.055);
      g.add(soot);
    }
    if (shroud) {
      // dark surround where the tip passes through the bumper cut-out; without
      // it the tip appears to sprout from painted bodywork
      const sh = tubeZ(r * 1.28, r * 1.34, 0.05, trim, 12);
      sh.position.set(sx, y, z + 0.062);
      g.add(sh);
    }
  }
  return g;
}

// ---- Badges + license plate. Callers pass the fascia-face positions so the
// thin badge discs sit flat ON the bodywork (the old hard-coded heights left
// them floating in mid-air above the hood/tail). ----
let _badgeMat = null, _plateMat = null;
export function buildBadgesAndPlate({
  frontZ = 2.06, frontY = 0.06, rearZ = -2.06, rearY = 0.22, plateY = -0.04,
  plateRecess = true,
} = {}) {
  const g = new THREE.Group();
  if (!_badgeMat) {
    _badgeMat = new THREE.MeshStandardMaterial({
      map: badgeTexture(), metalness: 0.4, roughness: 0.4,
    });
  }
  const badgeGeo = new THREE.CylinderGeometry(0.042, 0.042, 0.010, 18);
  badgeGeo.rotateX(Math.PI / 2);
  const bF = new THREE.Mesh(badgeGeo, _badgeMat);
  bF.position.set(0, frontY, frontZ); g.add(bF);
  const bR = new THREE.Mesh(badgeGeo, _badgeMat);
  bR.position.set(0, rearY, rearZ); bR.rotation.y = Math.PI; g.add(bR);

  if (!_plateMat) {
    _plateMat = new THREE.MeshStandardMaterial({
      map: plateTexture(), roughness: 0.6, metalness: 0.0,
    });
  }
  const plateGeo = new THREE.PlaneGeometry(0.42, 0.13);
  const pR = new THREE.Mesh(plateGeo, _plateMat);
  pR.position.set(0, plateY, rearZ - 0.005);
  pR.rotation.y = Math.PI;
  g.add(pR);
  if (plateRecess) {
    // shallow plate tub: a dark frame around the plate so it sits in a recess
    // rather than being printed onto the bumper
    const tub = new THREE.Group();
    tub.position.set(0, plateY, rearZ + 0.030);
    tub.rotation.y = Math.PI;
    addOpening(tub, {
      w: 0.46, h: 0.165, depth: 0.036, wall: 0.010, lipT: 0.011, floor: false,
      wallMat: makeTrim(), lipMat: makeTrim(),
    });
    g.add(tub);
  }
  return g;
}

// ---- Matte lightless underside material. A real underfloor is a shadowed
// void: zero env reflection + full roughness so it can never render as a
// bright grey tray no matter the sky. Shared by underbody/splitter/diffuser.
let _undertrayMat = null;
function undertrayMaterial() {
  if (_undertrayMat) return _undertrayMat;
  _undertrayMat = new THREE.MeshStandardMaterial({
    color: 0x060708, roughness: 1.0, metalness: 0.0, envMapIntensity: 0.0,
  });
  return _undertrayMat;
}

// ---- Underbody pan so you never see through the car. Chamfered corners and
// bevelled edges, tucked well inside the rocker line and raised so only a dark
// sliver shows below the sills instead of a protruding slab. ----
export function buildUnderbody({ y = -0.26, w = 1.42, len = 3.5 } = {}) {
  const hw = w / 2, hl = len / 2, c = 0.30;    // c = corner chamfer
  const s = new THREE.Shape();
  s.moveTo(-hw + c, -hl);
  s.lineTo(hw - c, -hl);
  s.lineTo(hw, -hl + c);
  s.lineTo(hw, hl - c);
  s.lineTo(hw - c, hl);
  s.lineTo(-hw + c, hl);
  s.lineTo(-hw, hl - c);
  s.lineTo(-hw, -hl + c);
  s.closePath();
  const geo = new THREE.ExtrudeGeometry(s, {
    depth: 0.03, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.04,
    bevelSegments: 1,
  });
  geo.rotateX(-Math.PI / 2);                   // footprint flat in XZ, thin in Y
  const u = new THREE.Mesh(geo, undertrayMaterial());
  u.position.set(0, y, 0);
  return u;
}

// ---- Wheel-arch liners: dark half-tubes over each wheel so the wheels sit
// inside real-looking housings instead of floating beside the hull. ----
let _archMat = null;
function archMaterial() {
  if (_archMat) return _archMat;
  _archMat = new THREE.MeshStandardMaterial({
    color: 0x0b0c0e, roughness: 0.94, metalness: 0.0, side: THREE.DoubleSide,
  });
  return _archMat;
}

export function buildArchLiners({
  zF = 1.45, zR = -1.45, x = 0.86, r = 0.41, width = 0.30,
  innerWall = true, lip = true, suspension = true,
} = {}) {
  const g = new THREE.Group();
  const arch = archMaterial();
  // Open half-cylinder spanning the top half (after rotateZ the θ∈[0,π]
  // half maps onto y ≥ 0), axis along X so it wraps the wheel.
  //
  // `width` (X extent) is kept just narrow enough to back the tyre barrel
  // (tyre width 0.28) without the liner's OUTER edge reaching the body skin:
  // the bodies flare to hw ~1.04–1.09 at the arches, so with x≈0.86–0.88 the
  // 0.30 width keeps the outer rim at ~1.01–1.03 — tucked a few cm INSIDE the
  // fender lip so the dark half-tube reads as a recessed wheel well in shadow
  // instead of a black crescent painted onto the outer fender surface (which
  // is what a body-flush edge produced in profile / 3-4 views). `r` clears the
  // 0.36 tyre by 0.05 — enough for suspension travel without the tread poking
  // through the liner crest.
  //
  // EVERYTHING added below obeys those same two constraints: nothing may reach
  // outboard of x + width/2, and nothing may come within 0.36 of the axle
  // where the tyre sweeps. That is why the damper/wishbone stubs sit at
  // |z - centre| ≥ 0.33, where the tyre's cross-section has shrunk away.
  // 16 segments over the half-arch is ~11 deg per facet on a surface that is
  // matte black and permanently in shadow — its silhouette is the fender lip,
  // not the liner, so extra segments here buy nothing at 4 liners per car.
  const geo = new THREE.CylinderGeometry(r, r, width, 16, 1, true, 0, Math.PI);
  geo.rotateZ(Math.PI / 2);
  const innerX = width / 2 - 0.002;    // inboard edge of the liner, as an offset
  for (const z of [zF, zR]) {
    // stubs point toward the middle of the car, as the real links do
    const zs = z > 0 ? -1 : 1;
    for (const sx of [-1, 1]) {
      const liner = new THREE.Mesh(geo, arch);
      liner.position.set(sx * x, 0, z);
      g.add(liner);

      if (innerWall) {
        // Inner fender wall — closes the inboard end of the well. Without it
        // the half-tube is an open pipe and low three-quarter angles look
        // straight through the arch into the hollow body.
        const wallGeo = new THREE.CircleGeometry(r, 10, 0, Math.PI);
        wallGeo.rotateY(Math.PI / 2);
        const wall = new THREE.Mesh(wallGeo, arch);
        wall.position.set(sx * (x - innerX), 0, z);
        g.add(wall);
        // pressed ribs on the wall — 12 mm proud, so they stay well inboard of
        // the tyre's inner sidewall face
        for (const a of [0.5, 1.05, 1.6, 2.15, 2.64]) {
          const rib = box(0.012, 0.020, r * 0.78, arch,
            sx * (x - innerX + 0.008), Math.sin(a) * r * 0.55, z + Math.cos(a) * r * 0.55);
          rib.rotation.x = -a + Math.PI / 2;
          g.add(rib);
        }
      }

      if (lip) {
        // Arch lip: the rolled edge of the fender opening. Slightly glossier
        // (makeTrim, not the matte liner) so it catches a rim light and the
        // opening reads as an EDGE instead of the paint just going dark.
        const lipGeo = new THREE.TorusGeometry(r - 0.008, 0.013, 3, 12, Math.PI);
        lipGeo.rotateY(Math.PI / 2);
        const lipMesh = new THREE.Mesh(lipGeo, makeTrim());
        // outer extent = x + width/2 - 0.010 + 0.013 → still inside the lip
        lipMesh.position.set(sx * (x + width / 2 - 0.010), 0, z);
        g.add(lipMesh);
      }

      if (suspension) {
        // Damper + lower link stubs, parked in the sliver of the well the tyre
        // never reaches. Small, but a wheel arch with nothing behind the wheel
        // is the tell that the car is a shell.
        const dz = z + zs * 0.325;
        const damper = tubeZ(0.026, 0.030, 0.115, makeTrim(), 8);
        damper.rotation.x = Math.PI / 2;
        damper.rotation.z = sx * 0.22;
        damper.position.set(sx * (x - 0.055), 0.215, dz);
        g.add(damper);
        const spring = tubeZ(0.036, 0.036, 0.055, makeSatin(), 8, true);
        spring.rotation.x = Math.PI / 2;
        spring.rotation.z = sx * 0.22;
        spring.position.set(sx * (x - 0.048), 0.155, dz);
        g.add(spring);
        // lower wishbone stub, right at the mouth of the arch where the tyre
        // has run out entirely (|Δz| 0.375 > tyre reach at that height)
        const arm = box(width * 0.72, 0.030, 0.028, makeTrim(),
          sx * (x - 0.028), 0.055, z + zs * 0.375);
        arm.rotation.z = -sx * 0.14;
        g.add(arm);
      }
    }
  }
  return g;
}

// ---- Cabin interior -------------------------------------------------------
// The greenhouse used to be tinted glass over NOTHING, which is why the cabin
// read as a void. This only has to survive being seen through 86 %-opaque
// smoked glazing, so it is deliberately cheap and dark — but a steering wheel
// and two seat backs behind the side glass is one of the biggest realism wins
// per triangle on the whole car.
//
// Defaults are sized for the GT cabin (floor ≈ y -0.06, roof ≈ y 0.85 in the
// axle-centred frame). Callers should pass their own cabin extents.
export function buildInterior({
  floorY = -0.06,
  dashZ = 0.22,          // dash face, just behind the windshield base
  dashH = 0.15,
  seatZ = -0.42,         // seat-back centre
  bulkheadZ = -0.90,
  seatX = 0.34,
  seatBackH = 0.44,
  halfWidth = 0.60,
  wheelR = 0.145,
  wheelZ = 0.10,
  wheelY = 0.26,         // relative to floorY
  driverX = -0.34,       // left-hand drive by default
  cage = false,
  harness = true,
  seats = 2,
} = {}) {
  const g = new THREE.Group();
  const trim = makeTrim();
  const carbon = makeCarbon();
  const satin = makeSatin();

  // Floor pan — also stops the cabin glazing looking straight down into the
  // hollow shell on high camera angles.
  g.add(box(halfWidth * 2, 0.02, dashZ - bulkheadZ, trim, 0, floorY, (dashZ + bulkheadZ) / 2));

  // Dashboard: a raked slab with a screen face and a binnacle hood over the
  // instruments. The binnacle is what reads through the windshield.
  const dash = box(halfWidth * 1.92, dashH, 0.20, trim, 0, floorY + 0.30, dashZ - 0.09);
  dash.rotation.x = 0.22;
  g.add(dash);
  g.add(box(halfWidth * 1.80, 0.030, 0.16, carbon, 0, floorY + 0.375, dashZ - 0.155));
  const binnacle = box(0.30, 0.10, 0.15, trim, driverX, floorY + 0.40, dashZ - 0.19);
  binnacle.rotation.x = 0.30;
  g.add(binnacle);
  // centre console running back between the seats
  g.add(box(0.17, 0.13, Math.max(0.20, seatZ - bulkheadZ + 0.55), trim,
    0, floorY + 0.075, (dashZ + seatZ) / 2 - 0.10));

  // Steering wheel: rim + two spokes + boss. Satin spokes so there is one
  // catch-light inside an otherwise black cabin.
  const wheel = new THREE.Group();
  wheel.position.set(driverX, floorY + wheelY, wheelZ);
  wheel.rotation.x = -0.62;                     // raked toward the driver
  const rim = new THREE.Mesh(new THREE.TorusGeometry(wheelR, 0.016, 4, 16), trim);
  wheel.add(rim);
  for (const a of [-1, 1]) {
    const spoke = box(wheelR * 1.7, 0.026, 0.012, satin, 0, a * 0.02, 0);
    spoke.rotation.z = a * 0.30;
    wheel.add(spoke);
  }
  const boss = tubeZ(0.045, 0.045, 0.032, satin, 10);
  wheel.add(boss);
  g.add(wheel);
  // column
  const col = box(0.05, 0.05, 0.20, trim, driverX, floorY + wheelY + 0.05, wheelZ + 0.10);
  col.rotation.x = -0.62;
  g.add(col);

  // Bucket seats. Backs in carbon (its clearcoat gives them a highlight the
  // matte trim does not have, so the shape survives the tint).
  for (let i = 0; i < seats; i++) {
    const sx = seats === 1 ? Math.sign(driverX) || 1 : (i === 0 ? -1 : 1);
    const px = sx * seatX;
    g.add(box(0.40, 0.10, 0.44, trim, px, floorY + 0.07, seatZ + 0.26));
    const back = box(0.40, seatBackH, 0.10, carbon, px, floorY + seatBackH / 2 + 0.09, seatZ);
    back.rotation.x = 0.20;
    g.add(back);
    // bolsters make the back read as a bucket rather than a plank
    for (const bx of [-1, 1]) {
      const bol = box(0.055, seatBackH * 0.86, 0.075, carbon,
        px + bx * 0.175, floorY + seatBackH / 2 + 0.09, seatZ + 0.045);
      bol.rotation.x = 0.20;
      g.add(bol);
    }
    const head = box(0.19, 0.13, 0.085, trim, px, floorY + seatBackH + 0.17, seatZ - 0.055);
    head.rotation.x = 0.20;
    g.add(head);
    if (harness) {
      // Shoulder straps in the shared caliper red — the only saturated thing
      // in the cabin, and the reason a seat reads as a RACE seat through tint.
      for (const bx of [-1, 1]) {
        const strap = box(0.045, seatBackH * 0.78, 0.014, makeCaliper(),
          px + bx * 0.085, floorY + seatBackH * 0.52 + 0.09, seatZ + 0.062);
        strap.rotation.x = 0.20;
        strap.rotation.z = bx * 0.12;
        g.add(strap);
      }
    }
  }

  // Rear bulkhead — closes the cabin off so the backlight has something behind
  // it instead of a view down the length of the empty shell.
  g.add(box(halfWidth * 1.86, 0.36, 0.03, trim, 0, floorY + 0.20, bulkheadZ));

  if (cage) {
    // Main hoop + rear stays, satin so they catch a line of light behind the
    // side glass. Optional: a road GT should not have one.
    const hoopY = floorY + 0.62;
    for (const sx of [-1, 1]) {
      const leg = tubeZ(0.024, 0.024, 0.72, satin, 8);
      leg.rotation.x = Math.PI / 2;
      leg.rotation.z = sx * 0.10;
      leg.position.set(sx * (halfWidth * 0.86), floorY + 0.36, seatZ - 0.06);
      g.add(leg);
      const stay = tubeZ(0.020, 0.020, 0.55, satin, 8);
      stay.rotation.x = 0.85;
      stay.position.set(sx * (halfWidth * 0.80), hoopY - 0.18, bulkheadZ + 0.22);
      g.add(stay);
    }
    g.add(box(halfWidth * 1.72, 0.046, 0.046, satin, 0, hoopY, seatZ - 0.06));
    g.add(box(halfWidth * 1.4, 0.038, 0.038, satin, 0, floorY + 0.30, seatZ - 0.06));
  }
  return g;
}

// ---- Door furniture: handles, fuel filler, side repeaters -----------------
// x/y/z are the point ON THE FLANK the part is pressed against. If x is a
// touch small the part sinks into the paint and disappears (harmless); if it
// is too large it floats, so the defaults err inboard.
export function buildDoorFurniture({
  x = 0.94, handleY = 0.22, handleZ = -0.10,
  handleW = 0.15, handleTilt = 0.0,
  repeaterY = 0.20, repeaterZ = 0.86, repeater = true,
  fuelX = null, fuelY = 0.26, fuelZ = -1.05, fuelSide = -1, fuel = true,
  fuelR = 0.072, color = 0xc8161d, handles = true,
} = {}) {
  const g = new THREE.Group();
  const trim = makeTrim();
  const satin = makeSatin();

  if (handles) {
    for (const sx of [-1, 1]) {
      const h = new THREE.Group();
      h.position.set(sx * x, handleY, handleZ);
      h.rotation.y = -sx * Math.PI / 2;   // local +z now points outboard
      h.rotation.z = handleTilt;
      // recessed trough behind the handle: this is the shadow that makes a
      // handle read at distance, far more than the bar itself
      addOpening(h, {
        w: handleW, h: 0.052, depth: 0.028, wall: 0.008, lipT: 0.009,
        floorMat: trim, wallMat: trim, lipMat: trim,
      });
      // the pull bar, proud of the trough
      h.add(box(handleW - 0.026, 0.024, 0.020, satin, 0, 0.006, 0.030));
      g.add(h);
    }
  }

  if (repeater) {
    for (const sx of [-1, 1]) {
      const r = box(0.095, 0.020, 0.016, amberMaterial(), sx * x, repeaterY, repeaterZ);
      r.rotation.y = -sx * 0.12;
      g.add(r);
      // dark surround so the amber sliver has an edge
      g.add(box(0.115, 0.032, 0.010, trim, sx * (x - 0.006), repeaterY, repeaterZ));
    }
  }

  if (fuel) {
    // Filler flap: a body-coloured disc standing 6 mm proud inside a dark ring.
    // The ring IS the shut line — a painted circle with no gap around it just
    // looks like a sticker.
    const fx = (fuelX ?? x) * fuelSide;
    const ring = tubeZ(fuelR + 0.012, fuelR + 0.012, 0.010, trim);
    ring.rotation.y = fuelSide * Math.PI / 2;
    ring.position.set(fx, fuelY, fuelZ);
    g.add(ring);
    const flap = tubeZ(fuelR, fuelR, 0.012, makePaint(color));
    flap.rotation.y = fuelSide * Math.PI / 2;
    flap.position.set(fx + fuelSide * 0.008, fuelY, fuelZ);
    g.add(flap);
    // hinge pip
    const pip = box(0.020, 0.012, 0.010, trim, fx + fuelSide * 0.012, fuelY, fuelZ - fuelR * 0.8);
    g.add(pip);
  }
  return g;
}

// ---- Body vents: bonnet extractors, fender gills, rear side intakes -------
// All three are REAL openings (recessed floor, walls, lip) rather than dark
// decals: a black rectangle painted on a bonnet reads as a smudge from any
// angle where the sun is on the panel, whereas a 25 mm recess still reads.
export function buildBodyVents({
  bonnet = true, bonnetZ = 1.05, bonnetY = 0.45, bonnetX = 0.30,
  bonnetW = 0.30, bonnetL = 0.26, bonnetTilt = 0.0, bonnetLouvres = 3,
  gills = true, gillZ = 1.02, gillY = 0.22, gillX = 0.96,
  gillW = 0.055, gillH = 0.12, gillCount = 3, gillGap = 0.075, gillStep = 0.004,
  intakes = true, intakeZ = -0.95, intakeY = 0.14, intakeX = 0.99,
  intakeW = 0.28, intakeH = 0.17, intakeMesh = true,
} = {}) {
  const g = new THREE.Group();
  const trim = makeTrim();
  const black = undertrayMaterial();

  if (bonnet) {
    // Extractor vents either side of the bonnet centreline, facing UP.
    for (const sx of [-1, 1]) {
      const v = new THREE.Group();
      v.position.set(sx * bonnetX, bonnetY, bonnetZ);
      v.rotation.x = -Math.PI / 2 + bonnetTilt;   // local +z now points up
      addOpening(v, {
        w: bonnetW, h: bonnetL, depth: 0.030, wall: 0.010, lipT: 0.011,
        floorMat: black, wallMat: black, lipMat: trim,
      });
      // louvre blades across the opening, raked so the sun cannot flood it
      for (let i = 0; i < bonnetLouvres; i++) {
        const t = (i + 0.5) / bonnetLouvres - 0.5;
        const bl = box(bonnetW - 0.014, 0.010, bonnetL / bonnetLouvres * 0.72, trim,
          0, t * 0, 0.020);
        bl.position.y = t * bonnetL * 0.92;
        bl.rotation.x = 0.55;
        v.add(bl);
      }
      g.add(v);
    }
  }

  if (gills) {
    // Fender gills behind the front arch: a stack of narrow slots. `gillStep`
    // is how far each successive slot pulls IN, and it has to be measured off
    // the flank the stack sits on: behind the front arch the body falls away
    // several mm per slot, so a step that is too small leaves the rearmost slot
    // standing off the paint with daylight under its lip.
    for (const sx of [-1, 1]) {
      for (let i = 0; i < gillCount; i++) {
        const s = new THREE.Group();
        s.position.set(sx * (gillX - i * gillStep), gillY + i * 0.004, gillZ - i * gillGap);
        s.rotation.y = -sx * Math.PI / 2;
        s.rotation.z = 0.16;                     // rake the slots back
        addOpening(s, {
          w: gillW, h: gillH, depth: 0.026, wall: 0.008, lipT: 0.009,
          floorMat: black, wallMat: black, lipMat: trim,
        });
        s.add(box(gillW - 0.012, 0.010, 0.016, trim, 0, 0, 0.020));
        g.add(s);
      }
    }
  }

  if (intakes) {
    // Side intakes ahead of the rear arches — the classic mid-engine cue.
    for (const sx of [-1, 1]) {
      const s = new THREE.Group();
      s.position.set(sx * intakeX, intakeY, intakeZ);
      s.rotation.y = -sx * Math.PI / 2;
      addOpening(s, {
        w: intakeW, h: intakeH, depth: 0.052, wall: 0.011, lipT: 0.012,
        floorMat: intakeMesh ? makeGrille() : black, wallMat: black, lipMat: trim,
      });
      // leading-edge scoop lip, so the intake looks like it swallows air
      const scoop = box(0.014, intakeH + 0.024, 0.055, trim, -intakeW / 2 - 0.014, 0, 0.030);
      scoop.rotation.y = -0.30;
      s.add(scoop);
      s.add(box(intakeW - 0.02, 0.012, 0.024, trim, 0, 0, 0.030));
      g.add(s);
    }
  }
  return g;
}

// ---- Wipers, parked at the cowl ------------------------------------------
// Two arms lying almost flat across the base of the windshield. `tilt` drops
// the outer end: the cowl crown falls away toward the fenders, so a level arm
// would float off the panel at its outboard tip.
export function buildWipers({
  z = 0.30, y = 0.60, x = 0.26, len = 0.46, count = 2,
  tilt = 0.26, rake = 0.10, pivot = true,
} = {}) {
  const g = new THREE.Group();
  const trim = makeTrim();
  const satin = makeSatin();
  const xs = count === 1 ? [0] : [-1, 1];
  for (const sx of xs) {
    const w = new THREE.Group();
    w.position.set(sx * x, y, z);
    w.rotation.z = -sx * tilt;
    w.rotation.x = rake;
    // arm: a tapered blade running outboard from the pivot
    const arm = box(len, 0.016, 0.012, trim, sx * len * 0.5, 0.016, 0);
    w.add(arm);
    // blade: thinner, sitting on the glass just below the arm
    const blade = box(len * 0.88, 0.010, 0.020, trim, sx * len * 0.54, 0.002, 0.004);
    w.add(blade);
    // rubber edge
    w.add(box(len * 0.88, 0.006, 0.008, trim, sx * len * 0.54, -0.008, 0.006));
    if (pivot) {
      const p = tubeZ(0.020, 0.024, 0.030, satin, 8);
      p.rotation.x = Math.PI / 2;
      p.position.set(0, 0.008, 0);
      w.add(p);
    }
    g.add(w);
  }
  return g;
}

// ---- Tow eye -------------------------------------------------------------
// Tiny, but a loop breaking the bumper's outline is one of those details the
// eye scores as "modelled" without ever consciously noticing it.
export function buildTowEye({
  z = 2.10, y = -0.05, x = 0.42, style = 'hook', side = 1, r = 0.042,
} = {}) {
  const g = new THREE.Group();
  const trim = makeTrim();
  // recessed cup in the bumper
  const cup = new THREE.Group();
  cup.position.set(side * x, y, z);
  addOpening(cup, {
    w: r * 2.3, h: r * 2.3, depth: 0.026, wall: 0.008, lipT: 0.009,
    floorMat: undertrayMaterial(), wallMat: undertrayMaterial(), lipMat: trim,
  });
  g.add(cup);
  if (style === 'hook') {
    // a satin loop standing out of the cup — satin, never chrome
    const loop = new THREE.Mesh(new THREE.TorusGeometry(r * 0.62, 0.011, 3, 10), makeSatin());
    loop.rotation.y = Math.PI / 2;
    loop.position.set(side * x, y, z + 0.045);
    g.add(loop);
    const shaft = tubeZ(0.013, 0.013, 0.05, makeSatin(), 8);
    shaft.position.set(side * x, y, z + 0.026);
    g.add(shaft);
  } else {
    // blanking cover sitting flush in the cup
    const cap = tubeZ(r * 0.95, r * 0.95, 0.010, trim, 12);
    cap.position.set(side * x, y, z + 0.024);
    g.add(cap);
  }
  return g;
}

// ---- Roof aerial ---------------------------------------------------------
// Breaks the roofline silhouette, which is otherwise a single unmodulated
// curve from windshield header to deck. 'fin' is a body-coloured shark fin,
// 'whip' a thin mast (cheaper, more visible against the sky).
export function buildAerial({
  z = -0.95, y = 0.90, style = 'fin', color = 0xc8161d, len = 0.22, height = 0.085,
} = {}) {
  const g = new THREE.Group();
  const trim = makeTrim();
  if (style === 'whip') {
    const mast = tubeZ(0.007, 0.010, 0.34, trim, 6);
    mast.rotation.x = Math.PI / 2 - 0.30;
    mast.position.set(0, y + 0.16, z - 0.045);
    g.add(mast);
    const base = tubeZ(0.024, 0.028, 0.018, trim, 10);
    base.rotation.x = Math.PI / 2;
    base.position.set(0, y + 0.008, z);
    g.add(base);
    return g;
  }
  // Shark fin: a swept profile in the YZ plane, extruded across a narrow x.
  const s = new THREE.Shape();
  s.moveTo(-len * 0.5, 0);
  s.lineTo(len * 0.5, 0);
  s.lineTo(len * 0.34, height * 0.72);
  s.quadraticCurveTo(len * 0.05, height, -len * 0.34, height * 0.30);
  s.closePath();
  const geo = new THREE.ExtrudeGeometry(s, { depth: 0.030, bevelEnabled: false, steps: 1 });
  geo.translate(0, 0, -0.015);
  geo.rotateY(Math.PI / 2);     // profile into the YZ plane, thickness across x
  const fin = new THREE.Mesh(geo, makePaint(color));
  fin.position.set(0, y, z);
  fin.castShadow = true;
  g.add(fin);
  // dark gasket pad under the fin so it does not look welded to the paint
  g.add(box(0.046, 0.010, len * 1.04, trim, 0, y + 0.002, z));
  return g;
}

// ---- Soft fake contact shadow blob under the car (works in 1P and 2P) ----
// Rendered with MULTIPLY blending over an OPAQUE grey→white radial texture:
// the rim is pure white (a multiply no-op, so the plane's edges vanish into the
// road instead of showing as a bright slab) and the core is dark grey (which
// multiplies the asphalt down into a soft shadow). Encoding the falloff in RGB
// rather than the alpha channel sidesteps the premultiplied-canvas-alpha quirk
// that made the old straight-alpha version render as a solid white tray under
// the car on some GL backends.
let _shadowTex = null;
function contactShadowTexture() {
  if (_shadowTex) return _shadowTex;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 128, 128);
  const g = ctx.createRadialGradient(64, 64, 6, 64, 64, 62);
  g.addColorStop(0, 'rgb(64,64,68)');       // darkest directly beneath the car
  g.addColorStop(0.5, 'rgb(150,150,156)');
  g.addColorStop(0.82, 'rgb(214,214,218)');
  g.addColorStop(1, 'rgb(255,255,255)');    // no-op white at the rim
  ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
  _shadowTex = new THREE.CanvasTexture(c);
  _shadowTex.colorSpace = THREE.SRGBColorSpace;
  return _shadowTex;
}
export function buildContactShadow({ y = -0.355, w = 2.3, len = 4.8 } = {}) {
  const mat = new THREE.MeshBasicMaterial({
    map: contactShadowTexture(), transparent: true, depthWrite: false,
    blending: THREE.MultiplyBlending, toneMapped: false,
  });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, len), mat);
  m.rotation.x = -Math.PI / 2;
  m.position.set(0, y, 0);
  m.renderOrder = -1;
  return m;
}
