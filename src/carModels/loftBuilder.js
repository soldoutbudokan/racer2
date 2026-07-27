import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Station-loft skin builder.
//
// A car body is described by a small set of KEY STATIONS along the long axis
// (z), each a handful of scalar parameters (half-width, floor/hip/roof heights,
// top width...). We Catmull-interpolate those scalars into ~50 dense rings,
// turn each ring's parameters into a smooth cross-section profile, mirror it
// into a full closed ring, and stitch adjacent rings into a continuous quad
// skin with smooth normals. This is what makes the body read as sculpted
// bodywork instead of a stack of boxes.
//
// Coordinate frame (chassis-local, matches car.js): +Z forward, +Y up,
// +X right. Authored centered at the origin.
//
// TWO PROFILE GENERATIONS live here:
//
//   LEGACY (default) — 6 handles per station (hw/yb/hip/yt/topW), two splines
//   meeting at the hip. Reproduced bit-for-bit when no station declares a
//   surface feature, so archetypes that have not opted in never change shape.
//
//   SURFACED (opt-in) — the same 5 shape scalars plus authored surface
//   features per station: rocker sill, under-tuck, wheel-arch flare with a
//   lip, and a second character crease. A station only has to declare the
//   fields it uses; see SURFACE_DEFAULTS. Declaring ANY of them anywhere in
//   the key array switches the WHOLE car to the surfaced profile (the ring
//   topology has to be uniform along z, so it cannot be per-station), and
//   fixes the profile point count to PROFILE_N so the hull, the panel seams,
//   the glazing and the seals all sample the identical polyline.
// ---------------------------------------------------------------------------

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

// Catmull-Rom through scalar control values (uniform), clamped endpoints.
function catmull(p0, p1, p2, p3, t) {
  const t2 = t * t, t3 = t2 * t;
  return 0.5 * (
    2 * p1 +
    (-p0 + p2) * t +
    (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
    (-p0 + 3 * p1 - 3 * p2 + p3) * t3
  );
}

/**
 * Sample one named scalar field of the key-station array at global param
 * u in [0, n-1] (segment index + local t). `dflt` fills in for stations that
 * do not declare the field, so surface features can be authored on the two or
 * three stations that need them.
 *
 * A station flagged `hard: true` is a CORNER KNOT: the ghost control point on
 * each side is collapsed onto the station itself, so the segment before and
 * the segment after each take their own chord as the tangent there instead of
 * sharing the smoothed one. That is what lets an archetype run the hood plane
 * dead flat into the fascia and then turn down at a defined leading edge,
 * rather than letting Catmull round the last two stations into a drooping
 * bullet nose.
 */
function sampleField(keys, field, u, dflt = 0) {
  const n = keys.length;
  const i = Math.min(n - 2, Math.max(0, Math.floor(u)));
  const t = u - i;
  const g = (j) => {
    const v = keys[Math.min(n - 1, Math.max(0, j))][field];
    return v === undefined ? dflt : v;
  };
  const p1 = g(i), p2 = g(i + 1);
  const p0 = keys[i].hard ? p1 : g(i - 1);
  const p3 = keys[i + 1].hard ? p2 : g(i + 2);
  return catmull(p0, p1, p2, p3, t);
}

// ---------------------------------------------------------------------------
// Surface features
// ---------------------------------------------------------------------------

/**
 * Per-station surface-feature fields and their defaults. All are optional; a
 * station that declares none of them gets a shape close to the legacy profile.
 * Heights are fractions of the station's yb -> hip span ("ladder fractions"),
 * widths are metres of half-width unless noted.
 *
 *   tuck    0..0.9  how far the floor pan's outer edge sits INSIDE the flank,
 *                   as a fraction of the flank half-width. The default 0.245
 *                   reproduces the legacy 0.72*hw pan edge; raise it for a
 *                   deeper under-tuck so the rocker stops reading as a slab.
 *   tuckY           height of the pan/flank fillet (where the underside has
 *                   finished turning up).
 *   sill    m       ROCKER SILL: the flank below `sillY` is stepped IN by this
 *                   much, giving a flat inset rocker panel with an undercut
 *                   step at its top edge. 0 = no sill.
 *   sillY           height of that step (the door's lower edge).
 *   flare   m       ARCH FLARE: extra half-width blended into the lower flank,
 *                   peaking at `lipY` where it terminates in a hard tangent
 *                   break — the fender lip — and fading to nothing at the hip.
 *                   Author it on the axle stations only. It needs vertical
 *                   room to read as a lip rather than a flange: keep
 *                   (hip - yb) >= ~0.10 at a flared station.
 *   lipY            height of the flare's widest line / lip.
 *   crease  m       CHARACTER LINE: how far the flank kicks out at `creaseY`,
 *                   with a genuine tangent break above and below it (same
 *                   trick as the hip crease, one rung lower). Small values
 *                   read best — 0.008..0.020. Negative scoops instead.
 *   creaseY         height of that line.
 */
export const SURFACE_DEFAULTS = {
  tuck: 0.245, tuckY: 0.10,
  sill: 0, sillY: 0.26,
  flare: 0, lipY: 0.55,
  crease: 0, creaseY: 0.80,
};
const SURFACE_FIELDS = Object.keys(SURFACE_DEFAULTS);

// Profile point count of the surfaced profile. Every landmark below lands on
// an exact integer index at this count, so creases fall on vertex columns
// instead of being chorded away.
const PROFILE_N = 22;

// Profile point index of each landmark of the SURFACED profile (N = 22).
// Divide by PROFILE_N - 1 for the profile FRACTION an archetype authors seams
// against — or just call profileFractions(keys), which also answers correctly
// for legacy cars.
const IDX = {
  panCentre: 0,   // underside centre line
  panEdge: 2,     // outer edge of the flat floor pan (hard corner)
  underRoll: 3,   // fillet between the pan and the rocker
  sillFoot: 4,    // bottom of the rocker face
  sillLip: 6,     // top of the rocker / door's lower edge (undercut step)
  flankFoot: 7,   // flank proper, just above the sill step
  archLip: 9,     // wheel-arch flare lip (widest line of the fender)
  crease: 11,     // character / shoulder line
  shoulder: 13,   // hip = beltline crease, the widest point of the body
  beltTuck: 14,   // first point above the belt = glass sill
  tumble: 16,     // tumblehome mid-point
  topCorner: 18,  // roof / deck top corner
  crownEdge: 19,  // start of the flat crown plane
  crownCentre: 21,
};

// Legacy landmark fractions, for reference (N = 16 as index.js builds it):
// 0.27 rocker under-curve, 0.53 hip crease, 0.60 glass sill, 0.80 top corner.
const LEGACY_FRACTIONS = {
  panEdge: 0.13, sillLip: 0.27, flankFoot: 0.33, archLip: 0.40,
  crease: 0.47, shoulder: 8 / 15, beltTuck: 9 / 15, tumble: 10 / 15,
  topCorner: 12 / 15, crownEdge: 13 / 15, crownCentre: 1,
};

/**
 * Named profile fractions for these key stations — what an archetype should
 * author `buildPanelSeams` paths and glazing belt/top fractions against.
 * Surfaced cars get the exact landmark fractions; legacy cars get the old
 * approximate ones so existing seam paths keep their meaning.
 */
export function profileFractions(keys) {
  const feat = featureSet(keys);
  if (!feat) return { ...LEGACY_FRACTIONS };
  const out = {};
  for (const k of Object.keys(IDX)) out[k] = IDX[k] / (PROFILE_N - 1);
  return out;
}

// Which surface features this car actually uses. Returned once per key array
// (the answer drives the ring topology, so it must not vary station to
// station). null => legacy profile.
const featureCache = new WeakMap();
function featureSet(keys) {
  let f = featureCache.get(keys);
  if (f !== undefined) return f;
  let declared = false;
  let sill = false, flare = false, crease = false;
  for (const k of keys) {
    for (const name of SURFACE_FIELDS) if (k[name] !== undefined) declared = true;
    if (Math.abs(k.sill ?? 0) > 0.003) sill = true;
    if (Math.abs(k.flare ?? 0) > 0.003) flare = true;
    if (Math.abs(k.crease ?? 0) > 0.002) crease = true;
  }
  f = declared ? { sill, flare, crease } : null;
  featureCache.set(keys, f);
  return f;
}

// The interior profile indices that are TANGENT BREAKS for this car. They do
// double duty: halfProfileSurfaced starts a new spline run at each of them
// (so the surfaces meet at an angle instead of one melted curve), and
// buildLoftHull duplicates the vertex column there so computeVertexNormals
// averages only within a run. Without the second half the geometry has the
// crease but the shading smooths straight over it and the flank still reads
// soft.
function breakSet(feat) {
  const s = new Set([IDX.panEdge, IDX.shoulder]);
  if (feat.sill) { s.add(IDX.sillFoot); s.add(IDX.sillLip); s.add(IDX.flankFoot); }
  if (feat.flare) s.add(IDX.archLip);
  if (feat.crease) s.add(IDX.crease);
  return s;
}

// ---------------------------------------------------------------------------
// Cross-sections
// ---------------------------------------------------------------------------

/**
 * LEGACY right-half cross-section (bottom-center -> up the side -> over the
 * shoulder -> top-center) from a station's interpolated parameters, sampled to
 * N points via a 2D Catmull spline through shape handles.
 *   p.hw   max body half-width (at the hip)
 *   p.yb   floor / sill height at centre
 *   p.hip  height of the widest point
 *   p.yt   top height at centre (roofline for the cabin, deck for hood/tail)
 *   p.topW half-width at the top (greenhouse width / deck width -> tumblehome)
 */
function halfProfile(p, N) {
  const hw = p.hw, yb = p.yb, hip = p.hip, yt = p.yt, topW = p.topW;
  // TWO splines meeting at the shoulder point with different tangents: the
  // tangent break is a crisp beltline crease (the strongest stamped-steel cue),
  // while a single spline through the same handles reads as melted soap.
  // Flat handles at the floor and crown keep the hood/roof/deck as planes.
  const nLow = Math.max(3, Math.round(N * 0.55));
  const nUp = N - nLow;
  const lower = new THREE.SplineCurve([
    new THREE.Vector2(0, yb),                                   // floor centre
    new THREE.Vector2(hw * 0.72, yb),                           // flat floor out to the rocker
    new THREE.Vector2(hw * 0.955, yb + (hip - yb) * 0.42),      // near-vertical body side
    new THREE.Vector2(hw, hip),                                 // shoulder / beltline crease
  ]);
  const upper = new THREE.SplineCurve([
    new THREE.Vector2(hw * 0.955, hip + (yt - hip) * 0.10),     // tuck in above the crease
    new THREE.Vector2(topW + (hw - topW) * 0.42, hip + (yt - hip) * 0.56), // tumblehome
    new THREE.Vector2(topW, yt - 0.006),                        // top corner
    new THREE.Vector2(topW * 0.52, yt),                         // flat crown / deck plane
    new THREE.Vector2(0, yt),                                   // top centre
  ]);
  const pts = lower.getPoints(nLow - 1)          // nLow points, crease included
    .concat(upper.getPoints(nUp - 1));           // nUp points above the crease
  // Clamp x>=0 so the centre line never crosses itself, and force the exact
  // centre verts to x=0 so the mirror shares them (no spine crease).
  for (const q of pts) if (q.x < 0) q.x = 0;
  pts[0].x = 0;
  pts[N - 1].x = 0;
  return pts;
}

/**
 * Sample a node list into an N-point polyline. Nodes carry their target output
 * INDEX, so every landmark lands exactly on a vertex column. A node flagged
 * `hard` ends one spline run and begins the next, which is what produces a
 * real tangent break there (THREE.SplineCurve.getPoint passes exactly through
 * control point m at t = m/(k-1), so the index mapping below is exact).
 */
function sampleNodes(nodes, N) {
  const out = new Array(N);
  const v = new THREE.Vector2();
  let start = 0;
  for (let e = 1; e < nodes.length; e++) {
    if (!nodes[e].hard && e < nodes.length - 1) continue;
    const run = nodes.slice(start, e + 1);
    const k = run.length - 1;
    const curve = new THREE.SplineCurve(run.map((n) => new THREE.Vector2(n.x, n.y)));
    for (let m = 0; m < k; m++) {
      const iA = run[m].i, iB = run[m + 1].i;
      for (let idx = iA; idx <= iB; idx++) {
        const local = (idx - iA) / (iB - iA);
        out[idx] = curve.getPoint((m + local) / k, v.clone());
      }
    }
    start = e;
  }
  return out;
}

/**
 * SURFACED right-half cross-section. Same 5 shape scalars as the legacy
 * profile, plus the authored surface features (see SURFACE_DEFAULTS). Built
 * from an explicit node ladder so each feature edge is a named landmark at a
 * fixed index; `hardMask` decides which of those edges are tangent breaks and
 * must be identical for every station of the car.
 */
function halfProfileSurfaced(p, N, feat) {
  const hw = Math.max(0.02, p.hw);
  const yb = p.yb;
  const span = Math.max(0, p.hip - yb);          // Catmull can undershoot past hip
  const hipY = yb + span;
  const top = Math.max(hipY + 0.01, p.yt);
  const upSpan = top - hipY;
  const tw = clamp(p.topW, 0, hw);

  // Ladder heights, forced monotonic: authored values are interpolated between
  // stations and can cross over on the way.
  const tuckY = clamp(p.tuckY, 0.02, 0.5);
  const sillY = clamp(p.sillY, tuckY + 0.04, 0.7);
  const footY = Math.min(0.86, sillY + 0.10);
  const lipY = clamp(p.lipY, footY + 0.04, 0.92);
  const creaseY = clamp(p.creaseY, lipY + 0.04, 0.97);

  const sill = clamp(p.sill, 0, hw * 0.4);
  const flare = clamp(p.flare, 0, 0.5);
  const crease = clamp(p.crease, -0.06, 0.2);
  const tuck = clamp(p.tuck, 0, 0.9);

  const xFoot = hw * 0.955;
  // Base flank: vertical below the sill step, then leaning out to the hip —
  // the legacy profile's near-vertical body side, kept so a feature-free
  // surfaced station stays close to the shape it had before.
  const sideX = (t) => xFoot + (hw - xFoot) * clamp((t - footY) / Math.max(1e-4, 1 - footY), 0, 1);
  // Arch flare: swells in from the under-tuck to the lip, then dies away
  // quickly above it so the door surface above the crease is untouched. The
  // LIP itself is a hard node, so the swell below and the tuck above meet at
  // an angle — that edge is what stops the fender melting into the door.
  const fl = (t) => {
    if (flare <= 0) return 0;
    if (t <= lipY) {
      const a = clamp((t - tuckY) / Math.max(1e-4, lipY - tuckY), 0, 1);
      return flare * Math.pow(a, 0.8);
    }
    const a = clamp((t - lipY) / Math.max(1e-4, 1 - lipY), 0, 1);
    return flare * Math.pow(1 - a, 1.5);
  };

  const y = (t) => yb + span * t;
  const x4 = Math.max(0.02, xFoot - sill + fl(tuckY));
  const x6 = Math.max(0.02, xFoot - sill + fl(sillY));
  const xPan = Math.max(0.02, x4 * (1 - tuck));

  const hard = feat.breaks;
  const nodes = [
    { i: IDX.panCentre, x: 0, y: yb, hard: true },
    // Flat pan out to a hard outer edge: the underside is a plane, and the
    // corner is where the body stops being visible from above.
    { i: IDX.panEdge, x: xPan, y: yb, hard: true },
    { i: IDX.underRoll, x: xPan + (x4 - xPan) * 0.78, y: y(tuckY * 0.18) },
    { i: IDX.sillFoot, x: x4, y: y(tuckY), hard: hard.has(IDX.sillFoot) },
    { i: IDX.sillLip, x: x6, y: y(sillY), hard: hard.has(IDX.sillLip) },
    { i: IDX.flankFoot, x: sideX(footY) + fl(footY), y: y(footY), hard: hard.has(IDX.flankFoot) },
    { i: IDX.archLip, x: sideX(lipY) + fl(lipY), y: y(lipY), hard: hard.has(IDX.archLip) },
    { i: IDX.crease, x: sideX(creaseY) + fl(creaseY) + crease, y: y(creaseY), hard: hard.has(IDX.crease) },
    { i: IDX.shoulder, x: hw, y: hipY, hard: true },
    // Above the belt: unchanged legacy handles (tuck-in, tumblehome, top
    // corner, flat crown plane).
    { i: IDX.beltTuck, x: hw * 0.955, y: hipY + upSpan * 0.10 },
    { i: IDX.tumble, x: tw + (hw - tw) * 0.42, y: hipY + upSpan * 0.56 },
    { i: IDX.topCorner, x: tw, y: top - Math.min(0.006, upSpan * 0.08) },
    { i: IDX.crownEdge, x: tw * 0.52, y: top },
    { i: IDX.crownCentre, x: 0, y: top, hard: true },
  ];

  const pts = sampleNodes(nodes, N);
  for (const q of pts) if (q.x < 0) q.x = 0;
  pts[0].x = 0;
  pts[N - 1].x = 0;
  return pts;
}

// Profile layout for a key-station array: point count, break columns and the
// cross-section function. Cached per (keys, N) — profileFor is called once per
// ring and once per skin sample.
const layoutCache = new WeakMap();
function profileFor(keys, nOpt) {
  const feat = featureSet(keys);
  const N = feat ? PROFILE_N : (nOpt ?? 14);
  let byN = layoutCache.get(keys);
  if (!byN) { byN = new Map(); layoutCache.set(keys, byN); }
  let L = byN.get(N);
  if (!L) {
    if (feat) {
      const f = { ...feat, breaks: breakSet(feat) };
      L = { N, feat: f, breaks: f.breaks, half: (p) => halfProfileSurfaced(p, N, f) };
    } else {
      L = { N, feat: null, breaks: new Set(), half: (p) => halfProfile(p, N) };
    }
    byN.set(N, L);
  }
  return L;
}

// All station parameters (shape + surface features) at global param u.
function stationAt(keys, u, feat) {
  const p = {
    z: sampleField(keys, 'z', u),
    hw: sampleField(keys, 'hw', u),
    yb: sampleField(keys, 'yb', u),
    hip: sampleField(keys, 'hip', u),
    yt: sampleField(keys, 'yt', u),
    topW: sampleField(keys, 'topW', u),
  };
  if (feat) {
    for (const f of SURFACE_FIELDS) p[f] = sampleField(keys, f, u, SURFACE_DEFAULTS[f]);
  }
  return p;
}

/**
 * Build a smooth lofted body shell.
 * @param keys  ordered key stations (tail -> nose), each
 *              { z, hw, yb, hip, yt, topW } plus optional surface features
 *              (see SURFACE_DEFAULTS) and an optional `hard: true` corner flag.
 * @param opts  { ringsPerSegment=8, profilePoints=14, capEnds=true }
 *              profilePoints is IGNORED once any station declares a surface
 *              feature — the surfaced profile fixes it at PROFILE_N so every
 *              consumer (seams, glazing, seals) samples the same polyline.
 * @returns THREE.BufferGeometry with position, normal, uv (and uv2 = uv).
 */
export function buildLoftHull(keys, opts = {}) {
  const L = profileFor(keys, opts.profilePoints ?? 14);
  const N = L.N;
  const ringsPerSeg = opts.ringsPerSegment ?? 8;
  const capEnds = opts.capEnds ?? true;

  const segs = keys.length - 1;
  const R = segs * ringsPerSeg;                 // number of ring steps

  // Ring vertex COLUMNS. Normally one per profile point (right side up, then
  // the mirrored left side back down, sharing the two centre verts). At a
  // tangent break the column is emitted TWICE and the pair is not stitched to
  // itself: each copy is referenced only by the faces on its own side of the
  // crease, so computeVertexNormals gives the crease a real shading break
  // instead of averaging it away into a soft roll.
  const cols = [];      // { k: profile index, s: side sign }
  const bridge = [];    // stitch cols[j] -> cols[j+1]?
  const push = (k, s, br) => { cols.push({ k, s }); bridge.push(br); };
  const isBreak = (k) => L.breaks.has(k) && k > 0 && k < N - 1;
  for (let k = 0; k < N; k++) {
    push(k, 1, !isBreak(k));
    if (isBreak(k)) push(k, 1, true);
  }
  for (let k = N - 2; k >= 1; k--) {
    push(k, -1, !isBreak(k));
    if (isBreak(k)) push(k, -1, true);
  }
  const M = cols.length;

  const positions = [];
  const uvs = [];
  const rows = [];        // vertex base index of each emitted ring
  const rowBridge = [];   // stitch rows[i] -> rows[i+1]?
  const rowZ = [];

  for (let r = 0; r <= R; r++) {
    const u = (r / R) * segs;
    const p = stationAt(keys, u, L.feat);
    const half = L.half(p);
    // A `hard` interior station is a crease ACROSS the body (a fascia leading
    // edge, a deck break): emit its ring twice and do not stitch the copies,
    // for the same shading reason as the profile breaks above.
    const si = (r % ringsPerSeg === 0) ? r / ringsPerSeg : -1;
    const copies = (si > 0 && si < segs && keys[si].hard === true) ? 2 : 1;
    for (let c = 0; c < copies; c++) {
      rows.push(positions.length / 3);
      rowZ.push(p.z);
      rowBridge.push(!(c === 0 && copies === 2));
      for (let j = 0; j < M; j++) {
        const { k, s } = cols[j];
        positions.push(s * half[k].x, half[k].y, p.z);
        uvs.push(j / M, r / R);
      }
    }
  }

  const indices = [];
  for (let ri = 0; ri < rows.length - 1; ri++) {
    if (!rowBridge[ri]) continue;
    const a = rows[ri], b = rows[ri + 1];
    for (let j = 0; j < M; j++) {
      if (!bridge[j]) continue;
      const j1 = (j + 1) % M;
      const v00 = a + j, v01 = a + j1, v10 = b + j, v11 = b + j1;
      // Winding chosen so faces point outward (verified via signed volume).
      indices.push(v00, v11, v10);
      indices.push(v00, v01, v11);
    }
  }

  // End caps — triangle-fan each end ring to its centroid.
  if (capEnds) {
    const addCap = (rowIdx, frontFacing, hardCap) => {
      const base = rows[rowIdx];
      // A HARD end station gets its own copy of the ring verts, so the flat
      // fascia plane does not average its normal into the hood/fender skin.
      // That averaging is what rounds a kamm tail or a blunt nose into a
      // drooping bullet no matter how squarely the stations are authored.
      // Without the flag the cap shares the ring verts exactly as before.
      const ids = [];
      for (let j = 0; j < M; j++) {
        if (!hardCap) { ids.push(base + j); continue; }
        ids.push(positions.length / 3);
        positions.push(positions[(base + j) * 3], positions[(base + j) * 3 + 1], positions[(base + j) * 3 + 2]);
        uvs.push(uvs[(base + j) * 2], uvs[(base + j) * 2 + 1]);
      }
      let cx = 0, cy = 0, n = 0;
      for (let j = 0; j < M; j++) {
        if (!bridge[j]) continue;         // count each unique column once
        cx += positions[(base + j) * 3];
        cy += positions[(base + j) * 3 + 1];
        n++;
      }
      cx /= n; cy /= n;
      const center = positions.length / 3;
      positions.push(cx, cy, rowZ[rowIdx]);
      uvs.push(0.5, frontFacing ? 1 : 0);
      for (let j = 0; j < M; j++) {
        if (!bridge[j]) continue;         // skip the zero-width duplicate gaps
        const a = ids[j], b = ids[(j + 1) % M];
        if (frontFacing) indices.push(center, a, b);
        else indices.push(center, b, a);
      }
    };
    addCap(0, false, keys[0].hard === true);                       // tail
    addCap(rows.length - 1, true, keys[keys.length - 1].hard === true); // nose
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  // aoMap / second channel reuse the same coords.
  geo.setAttribute('uv2', new THREE.Float32BufferAttribute(uvs, 2));
  geo.computeBoundingBox();
  geo.computeBoundingSphere();
  return geo;
}

// Station parameters interpolated at an arbitrary z (the loft is monotonic in
// z, so invert z(u) by bisection).
function stationAtZ(keys, z, feat) {
  const segs = keys.length - 1;
  let lo = 0, hi = segs;
  for (let it = 0; it < 36; it++) {
    const mid = (lo + hi) / 2;
    if (sampleField(keys, 'z', mid) < z) lo = mid; else hi = mid;
  }
  return stationAt(keys, (lo + hi) / 2, feat);
}

// Authored fraction f in [-1, 1] -> ring coordinate c in [0, 2], which walks
// CONTINUOUSLY up the right side (0 = floor centre, 1 = crown) and back down
// the left (2 = floor centre again). Paths are interpolated in c so a seam
// crossing the centre line goes over the roof; interpolating the signed f
// directly would dive through f = 0 — down the right flank to the floor and
// back up the left — and lay a duplicate ribbon over the half it retraced.
const toRing = (f) => (f < 0 ? 2 + f : f);

/**
 * Sample the hull SKIN at station z and ring coordinate c (see toRing). Points
 * are taken by linear interpolation along the same N-point polyline the hull
 * mesh is built from, so anything laid on them rides ON the skin instead of
 * sinking inside it on convex sections (a spline-exact sample would sit under
 * the chords). This invariant is why the surfaced profile forces one point
 * count on every consumer.
 */
function skinPoint(keys, L, z, c, cache) {
  const key = z.toFixed(4);
  let half = cache.get(key);
  if (!half) { half = L.half(stationAtZ(keys, z, L.feat)); cache.set(key, half); }
  const N = L.N;
  const s = c > 1 ? -1 : 1;
  const a = clamp(c > 1 ? 2 - c : c, 0, 1) * (N - 1);
  const i = Math.min(N - 2, Math.floor(a));
  const t = a - i;
  return new THREE.Vector3(
    s * (half[i].x + (half[i + 1].x - half[i].x) * t),
    half[i].y + (half[i + 1].y - half[i].y) * t,
    z,
  );
}

// One unit of ring coordinate is roughly this many metres of profile arc, so
// (z, c) waypoints can be measured in one consistent space.
const RING_M = 1.2;

// Chamfer the interior corners of a (z, ring) path. A ribbon's width runs
// perpendicular to its path ON the skin, so at a sharp corner — an A-pillar
// meeting the roof rail, a door's front cut meeting the sill — that direction
// swings through most of a right angle within one step and the band flares
// into a flag. Cutting each corner over `cut` metres turns one hard turn into
// two gentle ones, which is also how the real joints are radiused.
function roundCorners(ring, cut = 0.09) {
  if (ring.length < 3) return ring;
  const dist = (a, b) => Math.hypot(b[0] - a[0], (b[1] - a[1]) * RING_M);
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const out = [ring[0]];
  for (let i = 1; i < ring.length - 1; i++) {
    const dPrev = dist(ring[i - 1], ring[i]), dNext = dist(ring[i], ring[i + 1]);
    if (dPrev < 1e-6 || dNext < 1e-6) { out.push(ring[i]); continue; }
    const tIn = 1 - Math.min(cut, dPrev * 0.4) / dPrev;
    const tOut = Math.min(cut, dNext * 0.4) / dNext;
    out.push(lerp(ring[i - 1], ring[i], tIn), lerp(ring[i], ring[i + 1], tOut));
  }
  out.push(ring[ring.length - 1]);
  return out;
}

// Sweep one ribbon along a (z, f) path on the skin into `out`. Shared by the
// panel seams and the window weatherstrips so both ride the same polyline.
function emitRibbon(out, keys, L, cache, path, width, proud, cut = 0.09) {
  const { positions, normals, uvs, indices } = out;
  // Densify in (z, ring) space: keep steps comparable to the hull's own ring
  // spacing (~0.05 m) so a seam tracks arch blisters instead of chording
  // across them.
  const ring = roundCorners(path.map(([z, f]) => [z, toRing(f)]), cut);
  const pts = [];
  for (let s = 0; s < ring.length - 1; s++) {
    const [z0, c0] = ring[s], [z1, c1] = ring[s + 1];
    // ~0.05 m steps either way: a full half-profile (c 0->1) is ~1.2 m of arc.
    const n = Math.max(2, Math.ceil(Math.abs(z1 - z0) / 0.05) + Math.ceil(Math.abs(c1 - c0) * 24));
    for (let i = 0; i < n; i++) {
      const t = i / n;
      pts.push([z0 + (z1 - z0) * t, c0 + (c1 - c0) * t]);
    }
  }
  pts.push(ring[ring.length - 1]);

  const P = [], Nr = [];
  for (const [z, c] of pts) {
    const p = skinPoint(keys, L, z, c, cache);
    // Surface normal from the two tangents (along the profile, along z).
    const dz = 0.008, dc = 0.03;
    const tf = skinPoint(keys, L, z, Math.min(2, c + dc), cache)
      .sub(skinPoint(keys, L, z, Math.max(0, c - dc), cache));
    const tz = skinPoint(keys, L, z + dz, c, cache).sub(skinPoint(keys, L, z - dz, c, cache));
    const nrm = tf.cross(tz);
    if (nrm.lengthSq() < 1e-12) nrm.set(0, 1, 0); else nrm.normalize();
    // Orient outward: away from the body's interior axis at this station.
    const q = stationAtZ(keys, z, L.feat);
    if (nrm.dot(new THREE.Vector3(p.x, p.y - (q.yb + q.yt) * 0.5, 0)) < 0) nrm.negate();
    P.push(p); Nr.push(nrm);
  }

  const base = positions.length / 3;
  let len = 0;
  for (let i = 0; i < P.length; i++) {
    const a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)];
    // Averaged tangent (smooth across corners) and the single-segment
    // tangent (used only to size the miter).
    const tan = b.clone().sub(a);
    if (tan.lengthSq() < 1e-12) tan.set(0, 0, 1); else tan.normalize();
    const seg = (i > 0 ? P[i].clone().sub(a) : b.clone().sub(P[i]));
    if (seg.lengthSq() < 1e-12) seg.copy(tan); else seg.normalize();
    const bin = tan.clone().cross(Nr[i]);
    if (bin.lengthSq() < 1e-12) bin.set(1, 0, 0); else bin.normalize();
    // Miter: at a corner the averaged tangent turns the ribbon edge inward
    // and pinches a notch out of it, which on a 50 mm pillar reads as a
    // step. Widen by 1/cos(half-angle) so the outer edges stay straight.
    const segBin = seg.clone().cross(Nr[i]);
    const miter = segBin.lengthSq() > 1e-12
      ? 1 / Math.max(0.62, Math.abs(bin.dot(segBin.normalize()))) : 1;
    if (i > 0) len += P[i].distanceTo(P[i - 1]);
    const c = P[i].clone().addScaledVector(Nr[i], proud);
    for (const sgn of [-1, 1]) {
      const v = c.clone().addScaledVector(bin, sgn * width * 0.5 * miter);
      positions.push(v.x, v.y, v.z);
      normals.push(Nr[i].x, Nr[i].y, Nr[i].z);
      uvs.push(sgn > 0 ? 1 : 0, len);
    }
  }
  for (let i = 0; i < P.length - 1; i++) {
    const v00 = base + i * 2, v01 = v00 + 1, v10 = v00 + 2, v11 = v00 + 3;
    // Wound so the face normal is the OUTWARD surface normal: the opposite
    // order leaves every ribbon back-facing, i.e. culled from outside and
    // visible only as the far-side seam showing through the glass.
    indices.push(v00, v11, v10, v00, v01, v11);
  }
}

function ribbonGeometry(out) {
  if (!out.indices.length) return null;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(out.positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(out.normals, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(out.uvs, 2));
  geo.setIndex(out.indices);
  geo.computeBoundingBox();
  geo.computeBoundingSphere();
  return geo;
}

/**
 * Build panel seams: thin ribbons that follow the hull skin along an authored
 * path in (z, f) space. This is what stamps a lofted blob into bodywork —
 * shut lines around the hood/doors/deck read as separate pressed panels, and
 * a body-coloured ribbon over the glass canopy reads as an A-pillar.
 *
 * Each seam: {
 *   path:   [[z, f], ...]  waypoints on the skin. f in [-1, 1] walks the
 *           cross-section: 0 = floor centre, 1 = crown centre, sign = side.
 *           Author f against profileFractions(keys).
 *   width:  ribbon width in metres
 *   proud:  standoff along the surface normal (a real offset, not a depth
 *           bias — the same trick that stopped the canopy z-fighting)
 *   mirror: also emit the path with every f negated (the other flank)
 * }
 * @returns THREE.BufferGeometry (position/normal/uv), or null if empty.
 */
export function buildPanelSeams(keys, seams, opts = {}) {
  const L = profileFor(keys, opts.profilePoints ?? 16);
  const cache = new Map();
  const out = { positions: [], normals: [], uvs: [], indices: [] };
  for (const seam of seams) {
    const w = seam.width ?? 0.010, pr = seam.proud ?? 0.004;
    emitRibbon(out, keys, L, cache, seam.path, w, pr);
    if (seam.mirror) emitRibbon(out, keys, L, cache, seam.path.map(([z, f]) => [z, -f]), w, pr);
  }
  return ribbonGeometry(out);
}

/**
 * Sample the greenhouse (upper cabin) outline at a set of z positions, used to
 * place inset glass panels that hug the body. Returns rings of the upper
 * profile only (from a given shoulder height to the top centre).
 */
export function sampleUpperRings(keys, zList, N = 14) {
  const L = profileFor(keys, N);
  return zList.map((z) => {
    const p = stationAtZ(keys, z, L.feat);
    return { z, half: L.half(p), p };
  });
}

// ---------------------------------------------------------------------------
// Glazing
// ---------------------------------------------------------------------------

// Normalise the pane list. Legacy call shape (a single zStart/zEnd/beltFrac
// sweep over the crown) is preserved exactly, including its offset formula.
function resolvePanes(opts) {
  if (opts.panes) {
    return opts.panes.map((q) => ({
      zStart: q.zStart, zEnd: q.zEnd,
      beltFrac: q.beltFrac ?? 0.60,
      topFrac: q.topFrac ?? 1.0,
      steps: q.steps ?? Math.max(6, Math.round(Math.abs(q.zEnd - q.zStart) / 0.06)),
      proud: q.proud ?? opts.proud ?? 0.012,
      side: q.side ?? 0,          // 0 = both flanks, +1 right only, -1 left only
      legacy: false,
    }));
  }
  return [{
    zStart: opts.zStart, zEnd: opts.zEnd,
    beltFrac: opts.beltFrac ?? 0.60,
    topFrac: opts.topFrac ?? 1.0,
    steps: opts.steps ?? 24,
    proud: opts.proud ?? 0.012,
    side: 0,
    // The legacy displacement only makes sense for a band that goes over the
    // crown; a legacy-shaped call that asks for topFrac < 1 gets the true
    // surface normal like any other side pane.
    legacy: (opts.topFrac ?? 1.0) >= 0.999,
  }];
}

// Outward 2D normal of the half-profile polyline at point k.
function profileNormal(half, k, N) {
  const a = half[Math.max(0, k - 1)], b = half[Math.min(N - 1, k + 1)];
  let tx = b.x - a.x, ty = b.y - a.y;
  const len = Math.hypot(tx, ty) || 1;
  tx /= len; ty /= len;
  return [ty, -tx];            // rotate -90deg: up the flank -> +x, over the crown -> +y
}

/**
 * Build the glazing shell. Each PANE is an independent surface swept over its
 * own z range between two profile fractions, so a car can have a real
 * glasshouse — separate windshield, side glass and backlight with painted
 * structure between them — instead of one tinted band from cowl to tail.
 *
 * opts:
 *   panes: [{ zStart, zEnd, beltFrac, topFrac, steps, proud, side }]
 *     beltFrac  lower edge of the pane as a profile fraction (see
 *               profileFractions) — the glass sill.
 *     topFrac   upper edge. < 1 emits the pane on each flank only and leaves
 *               the CROWN BETWEEN THE ROOF RAILS PAINTED (this is what stops
 *               the whole roof being glass). >= 1 sweeps belt-to-belt over the
 *               crown — correct for a windshield or a backlight, wrong for the
 *               side glass.
 *     side      0 both flanks (default), +1 / -1 one flank only.
 *   Legacy call shape (zStart/zEnd/beltFrac/steps/proud, no `panes`) is
 *   unchanged and still sweeps over the crown.
 *
 * The glazing sits a real `proud` distance along the surface normal IN FRONT
 * of the paint, never inset with a depth bias: an inset canopy forced forward
 * by polygonOffset z-fought through the near-flat roof crown as a serrated
 * welt. Do not "fix" this back into an inset (see ROUTINE.md 2026-07-22).
 *
 * @returns one merged THREE.BufferGeometry for all panes (or null if empty).
 */
export function buildGreenhouseShell(keys, opts = {}) {
  const L = profileFor(keys, opts.profilePoints ?? 14);
  const N = L.N;
  const positions = [], uvs = [], indices = [];

  const addStrip = (pane, sideSign, crossCrown) => {
    const iBelt = clamp(Math.round(pane.beltFrac * (N - 1)), 0, N - 2);
    const iTop = clamp(Math.round(pane.topFrac * (N - 1)), iBelt + 1, N - 1);
    const steps = pane.steps;
    const proud = pane.proud;
    // Column list as (profile index, side sign). Ordered so the quad winding
    // below yields OUTWARD normals: up the right flank, down the left.
    const colsK = [];
    if (crossCrown) {
      for (let k = iBelt; k <= N - 1; k++) colsK.push([k, 1]);
      for (let k = N - 2; k >= iBelt; k--) colsK.push([k, -1]);
    } else if (sideSign > 0) {
      for (let k = iBelt; k <= iTop; k++) colsK.push([k, 1]);
    } else {
      for (let k = iTop; k >= iBelt; k--) colsK.push([k, -1]);
    }
    const P = colsK.length;
    const base = positions.length / 3;
    for (let s = 0; s <= steps; s++) {
      const z = pane.zStart + (pane.zEnd - pane.zStart) * (s / steps);
      const half = L.half(stationAtZ(keys, z, L.feat));
      for (let a = 0; a < P; a++) {
        const [k, sg] = colsK[a];
        let px, py;
        if (pane.legacy) {
          // Preserved verbatim: the shipped over-the-crown canopy is tuned
          // against this displacement, and it is the fix that killed the
          // serrated roof welt. New panes use the true surface normal.
          px = half[k].x * (1 + proud * 0.7) * sg;
          py = half[k].y + proud;
        } else {
          const [nx, ny] = profileNormal(half, k, N);
          px = (half[k].x + nx * proud) * sg;
          py = half[k].y + ny * proud;
        }
        positions.push(px, py, z);
        uvs.push(a / Math.max(1, P - 1), s / steps);
      }
    }
    for (let s = 0; s < steps; s++) {
      for (let a = 0; a < P - 1; a++) {
        const v00 = base + s * P + a, v01 = v00 + 1;
        const v10 = base + (s + 1) * P + a, v11 = v10 + 1;
        indices.push(v00, v10, v11, v00, v11, v01);
      }
    }
  };

  for (const pane of resolvePanes(opts)) {
    if (pane.zStart === undefined || pane.zEnd === undefined) continue;
    if (pane.topFrac >= 0.999) { addStrip(pane, 1, true); continue; }
    if (pane.side >= 0) addStrip(pane, 1, false);
    if (pane.side <= 0) addStrip(pane, -1, false);
  }

  if (!indices.length) return null;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  geo.computeBoundingBox();
  geo.computeBoundingSphere();
  return geo;
}

/**
 * Rubber weatherstrip around every pane of the same `panes` list. A black seal
 * band framing each opening is a large part of why real glazing reads as
 * glazing rather than a tinted patch of paint: it gives the pane a hard,
 * shadowed border and hides the belt/rail edge where glass meets body.
 *
 * The seal rides the SKIN (same polyline as everything else) and stands a
 * little PROUD of the glass, as a real seal does — so it also guarantees the
 * pane edge can never z-fight the paint it lands on.
 *
 * opts: { panes, width=0.022, proud (per pane: pane.proud + 0.006) }
 * @returns THREE.BufferGeometry for one mesh (use makeTrim()), or null.
 */
export function buildWindowSeals(keys, opts = {}) {
  const L = profileFor(keys, opts.profilePoints ?? 16);
  const N = L.N;
  const cache = new Map();
  const out = { positions: [], normals: [], uvs: [], indices: [] };
  const width = opts.width ?? 0.022;

  for (const pane of resolvePanes(opts)) {
    if (pane.zStart === undefined || pane.zEnd === undefined) continue;
    // Round to the same vertex columns the glass snapped to, so the seal is
    // centred exactly on the pane edge.
    const iBelt = clamp(Math.round(pane.beltFrac * (N - 1)), 0, N - 2);
    const fB = iBelt / (N - 1);
    const pr = opts.proud ?? (pane.proud + 0.006);
    const zA = pane.zStart, zB = pane.zEnd;
    if (pane.topFrac >= 0.999) {
      // Crown-crossing pane (windshield / backlight): the frame is the two
      // end arcs plus the belt run down each flank. Interpolating from +fB to
      // -fB goes OVER the crown in ring coordinates (see toRing).
      emitRibbon(out, keys, L, cache,
        [[zA, fB], [zA, -fB], [zB, -fB], [zB, fB], [zA, fB]], width, pr);
    } else {
      const iTop = clamp(Math.round(pane.topFrac * (N - 1)), iBelt + 1, N - 1);
      const fT = iTop / (N - 1);
      for (const sg of [1, -1]) {
        if (pane.side !== 0 && pane.side !== sg) continue;
        emitRibbon(out, keys, L, cache,
          [[zA, sg * fB], [zA, sg * fT], [zB, sg * fT], [zB, sg * fB], [zA, sg * fB]],
          width, pr);
      }
    }
  }
  return ribbonGeometry(out);
}
