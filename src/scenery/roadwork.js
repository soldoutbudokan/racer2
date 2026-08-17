/**
 * The driving surface: asphalt, kerbs, verge, painted lines and rubber.
 *
 * This replaces the flat-ribbon road that shipped in track.js. Three things
 * drove the rebuild:
 *
 *  1. CAMBER. The old road was dead flat across its width, so the only thing
 *     separating it from a painted stripe on the grass was its colour. Every
 *     builder in here samples `roadCrownY()` for its height, so the asphalt,
 *     the white lines, the kerbs, the verge and the skid marks all lie on ONE
 *     surface. The orchestrator must use it for the start/finish plate and the
 *     starting grid too, or those decals will hover over the crown.
 *  2. AUTHORED SURFACE DETAIL. Real asphalt is a patchwork: sealed paving-lane
 *     joints wandering down the road, transverse cold joints where a paving
 *     day ended, resurfacing patches with cut edges, pothole repairs. None of
 *     that can live in a tiling texture (a 4 m tile would repeat a distinctive
 *     patch 300 times a lap). It lives in the mesh instead — the road is built
 *     as an arc-length walk, so a feature edge simply inserts a pair of
 *     sections at its exact arc position and the vertex colours step across
 *     them. Cost is ~4 sections per feature, and no feature ever repeats.
 *  3. WINDING. The old edge-line/verge/kerb strips were wound face-DOWN — the
 *     index order `(a, c, b)` with `b` on the +left side gives a face normal
 *     of (0,-1,0), which is back-facing from above under the default
 *     FrontSide culling. (Verified numerically against three r160.) Every
 *     strip in here is wound the same way as the road, which is the one
 *     pattern that was demonstrably visible.
 *
 * VERTICAL BUDGET — the tightest constraint in the file, read before changing
 * any height constant. Physics is a flat plane whose top is y=0; the terrain
 * sheet's top is y=-0.02; the road mesh is lifted to y=+0.010 by track.js and
 * the cars' contact shadows sit just above y=0. So the whole crown has to fit
 * in the 3 cm between the terrain and the tyre contact patch: the crown stays
 * where the old flat road was (+0.010) and the road EDGE drops to about
 * -0.012, still ~8 mm clear of the grass. That is a ~1.1% edge slope rather
 * than the 1.5-2.5% a real circuit runs, and it is as much as can be had
 * without either floating the cars (raise the crown) or burying the road edge
 * in the terrain (deepen the fall).
 */
import * as THREE from 'three';
import {
  smoothstep, fractalNoise, hashFn, makeNoiseTexture, makeTileable,
  hideFromOverridePasses,
} from './noise.js';
import { rand } from './rng.js';

// track.js lifts the road mesh by this much; kerbs and skid marks are built in
// absolute world y, so they add it back to stay welded to the asphalt. If the
// road's position.y ever changes, change this with it.
const ROAD_LIFT = 0.010;

// Crown fall from the centreline to the road edge, in metres. Grows with the
// road's width but caps out — the 20 m oval would otherwise push its edge
// below the terrain sheet.
const CROWN_PER_M = 0.0034;
const CROWN_MAX = 0.024;

// Metres of arc per repeat of the asphalt albedo tile (see buildRoadGeometry's
// UV convention; makeAsphaltMaterial's repeats are all relative to it).
const ASPHALT_TILE = 4.0;

// Kerb ribs: one cast rib per colour block, sampled twice per rib so the
// geometry carries the ripple and the normal map sharpens its edges.
const RIB_PITCH = 1.0;
const KERB_STEP = RIB_PITCH / 2;

// buildEdgeLineGeometry gets an offset but no road width, and the white lines
// have to sit on the same cambered surface as the asphalt. buildRoadGeometry
// always runs first (track.js builds the road before the lines, the kerbs and
// the verge), so it leaves the half-width here for them.
let roadHalfWidth = 7;

/**
 * Surface height offset for a lateral position, 0 at the crown and negative
 * toward the edges. Inside the carriageway it is a crown that is nearly flat
 * where the car actually drives and falls away over the outer third; outside
 * it there is a shallow swale under the kerb (the drainage gulley) and then
 * the shoulder grades back up toward the verge.
 *
 * @param {number} lat  lateral offset from the centreline, metres
 * @param {number} halfWidth  road half-width, metres
 */
export function roadCrownY(lat, halfWidth = roadHalfWidth) {
  const hw = Math.max(0.5, halfWidth);
  const H = Math.min(CROWN_MAX, CROWN_PER_M * hw);
  const a = Math.abs(lat);
  if (a <= hw) {
    const t = a / hw;
    // Weighted t^2 + t^4: keeps the middle 60% of the road within ~8 mm of
    // flat (so the car never looks like it is leaning) while the shoulder
    // break near the white line is steep enough to catch the low sun.
    return -H * (0.35 * t * t + 0.65 * t * t * t * t);
  }
  const u = a - hw;
  const swale = 0.006 * Math.exp(-(((u - 0.75) / 0.95) ** 2));
  const grade = 0.006 * smoothstep(1.4, 4.0, u);
  return -H - swale + grade;
}

// ---------------------------------------------------------------------------
// Arc-length sampling
// ---------------------------------------------------------------------------

/**
 * Lets a builder walk the centreline at any arc position instead of being
 * stuck on the 600 frame samples (~2 m apart on these circuits). Kerb ribs
 * need 0.5 m steps and joint edges need centimetre placement; both would be
 * impossible on the frame grid. Interpolation is linear, which introduces no
 * error at all — the meshes are piecewise linear between frames anyway.
 */
function arcSampler(frames, arcLens) {
  const n = frames.length;
  const closing = frames[0].pos.distanceTo(frames[n - 1].pos);
  const total = arcLens[n - 1] + closing;

  function locate(s) {
    let t = s % total;
    if (t < 0) t += total;
    if (t >= arcLens[n - 1]) {
      return { i: n - 1, j: 0, f: (t - arcLens[n - 1]) / Math.max(1e-6, closing) };
    }
    let lo = 0, hi = n - 1;
    while (lo < hi - 1) {
      const m = (lo + hi) >> 1;
      if (arcLens[m] <= t) lo = m; else hi = m;
    }
    return { i: lo, j: lo + 1, f: (t - arcLens[lo]) / Math.max(1e-6, arcLens[lo + 1] - arcLens[lo]) };
  }

  function at(s) {
    const { i, j, f } = locate(s);
    const A = frames[i], B = frames[j];
    return {
      pos: A.pos.clone().lerp(B.pos, f),
      left: A.left.clone().lerp(B.left, f).normalize(),
      tan: A.tan.clone().lerp(B.tan, f).normalize(),
      i, j, f,
    };
  }

  return { total, at, locate };
}

function lerpAt(arr, loc) {
  return arr[loc.i] + (arr[loc.j] - arr[loc.i]) * loc.f;
}

// ---------------------------------------------------------------------------
// Authored surface features
// ---------------------------------------------------------------------------

/**
 * Hand-authored (never stepped) positions for the things that make asphalt
 * look built rather than extruded. Lap fractions are irregular on purpose —
 * the owner has rejected evenly-spaced anything — and each entry is jittered a
 * little at load so two sessions are not pixel-identical.
 *
 * `breaks` collects every arc position that needs its own mesh section, so a
 * cut edge lands exactly on a vertex row instead of smearing over 2 m.
 */
function authorSurfaceFeatures(total, width) {
  const hw = width / 2;
  const breaks = [];
  const R = (a, b) => a + rand() * (b - a);

  // --- Transverse construction joints -------------------------------------
  // Cold joints where a paving shift ended. A few run the full width, most
  // stop short of one edge because the outer lane was laid separately.
  const jointF = [0.028, 0.117, 0.149, 0.271, 0.408, 0.497, 0.548, 0.663, 0.769, 0.812, 0.917];
  const joints = [];
  for (let k = 0; k < jointF.length; k++) {
    const s = ((jointF[k] + R(-0.006, 0.006)) * total + total) % total;
    const full = k % 3 !== 1;
    const halfW = R(0.022, 0.045);
    const latA = full ? -hw - 1 : (k % 2 ? -hw - 1 : -hw * R(0.05, 0.35));
    const latB = full ? hw + 1 : (k % 2 ? hw * R(0.05, 0.35) : hw + 1);
    joints.push({ s, halfW, latA, latB, depth: R(0.18, 0.34) });
    for (const d of [-halfW - 0.025, -halfW, halfW, halfW + 0.025]) breaks.push(s + d);
  }

  // --- Resurfacing patches -------------------------------------------------
  // Big differently-toned rectangles with a sealed cut edge all round. Lateral
  // extents are given as fractions of the half width; the mesh snaps them to
  // the nearest column, which is invisible at 1.2 m column spacing.
  const patchSpec = [
    { f: 0.061, len: 17.5, a: -1.05, b: -0.16, tone: -0.085, warm: -0.03 },
    { f: 0.204, len: 6.2, a: 0.24, b: 1.05, tone: 0.075, warm: 0.04 },
    { f: 0.335, len: 23.0, a: -1.05, b: 1.05, tone: -0.055, warm: -0.02 },
    { f: 0.451, len: 4.4, a: -0.62, b: 0.10, tone: 0.095, warm: 0.05 },
    { f: 0.588, len: 11.0, a: 0.05, b: 1.05, tone: -0.10, warm: -0.035 },
    { f: 0.706, len: 8.0, a: -1.05, b: -0.30, tone: 0.06, warm: 0.03 },
    { f: 0.845, len: 14.5, a: -0.45, b: 0.55, tone: -0.07, warm: -0.02 },
    { f: 0.958, len: 5.6, a: 0.40, b: 1.05, tone: 0.085, warm: 0.045 },
  ];
  const patches = [];
  for (const p of patchSpec) {
    const s0 = ((p.f + R(-0.004, 0.004)) * total + total) % total;
    const s1 = s0 + p.len * R(0.85, 1.2);
    const seal = 0.045;
    patches.push({
      s0, s1, seal,
      latA: p.a * hw, latB: p.b * hw,
      tone: p.tone, warm: p.warm,
    });
    for (const s of [s0, s1]) {
      for (const d of [-seal - 0.02, -seal, seal, seal + 0.02]) breaks.push(s + d);
    }
  }

  // --- Pothole / utility-cut repairs ---------------------------------------
  // Small black sealant squares, deliberately clustered rather than spread —
  // bad ground shows up in stretches.
  const repairF = [0.043, 0.048, 0.092, 0.238, 0.243, 0.256, 0.372, 0.517, 0.631,
                   0.639, 0.734, 0.881, 0.889, 0.972];
  const repairs = [];
  for (let k = 0; k < repairF.length; k++) {
    const s = ((repairF[k] + R(-0.003, 0.003)) * total + total) % total;
    const len = R(0.55, 2.1);
    const lat = R(-0.82, 0.82) * hw;
    repairs.push({ s0: s, s1: s + len, lat, wid: R(0.5, 1.6), depth: R(0.16, 0.30) });
    for (const d of [-0.03, 0.0, len, len + 0.03]) breaks.push(s + d);
  }

  return { breaks, joints, patches, repairs };
}

// ---------------------------------------------------------------------------
// Road
// ---------------------------------------------------------------------------

/**
 * The asphalt ribbon.
 *
 * Column layout is the interesting part. Most columns are evenly spaced across
 * the road, but three pairs are dedicated to the sealed paving-lane joints —
 * the two columns of a pair sit 6 cm apart and their lateral position WANDERS
 * slowly down the lap, which is what turns a straight seam into a tar snake.
 * A pair is clamped inside the gap between its even neighbours so the columns
 * can never cross and fold a quad.
 *
 * UVs are in tile units: u = lat / 4 m, v = arc / (an exact divisor of the lap
 * length) so the texture wraps cleanly at the start/finish seam instead of
 * compressing one whole tile into the closing 2 m section, which is what the
 * old `arc / 4` did.
 */
export function buildRoadGeometry(frames, width, lineOffset, arcLens) {
  const n = frames.length;
  const hw = width / 2;
  roadHalfWidth = hw;

  const S = arcSampler(frames, arcLens);
  const total = S.total;
  const F = authorSurfaceFeatures(total, width);

  // ---- section arcs: every frame, plus every authored feature edge ----
  const raw = [];
  for (let i = 0; i < n; i++) raw.push(arcLens[i]);
  for (const s of F.breaks) raw.push(((s % total) + total) % total);
  raw.sort((a, b) => a - b);
  const secArc = [];
  for (const a of raw) {
    if (!secArc.length || a - secArc[secArc.length - 1] > 0.004) secArc.push(a);
  }
  // Duplicate the first section at arc = total so the ring closes with a
  // continuous UV instead of snapping v back to 0 across the last quad.
  secArc.push(total);
  const M = secArc.length;

  // ---- column layout ----
  const evenCount = Math.max(9, Math.round(width / 1.25) + 1);
  const evenLat = [];
  for (let k = 0; k < evenCount; k++) evenLat.push(hw - (k / (evenCount - 1)) * width);

  const seamNominal = [width * 0.25, 0, -width * 0.25];
  const seams = seamNominal.map((L, si) => {
    let above = hw, below = -hw;
    for (const e of evenLat) {
      if (e > L && e < above) above = e;
      if (e < L && e > below) below = e;
    }
    const amp = Math.max(0, Math.min(0.30, Math.min(above - L, L - below) / 2 - 0.09));
    return { L, amp, seed: 11.3 + si * 37.7, half: 0.032 };
  });

  // Merge into one descending column list. `seam` indexes into `seams`,
  // `sub` is -1 for the inner-side column of the pair and +1 for the outer.
  const cols = evenLat.map((lat) => ({ lat, seam: -1, sub: 0 }));
  seams.forEach((sm, si) => {
    cols.push({ lat: sm.L + sm.half, seam: si, sub: +1 });
    cols.push({ lat: sm.L - sm.half, seam: si, sub: -1 });
  });
  cols.sort((a, b) => b.lat - a.lat);
  const C = cols.length;

  const positions = new Float32Array(M * C * 3);
  const uvs = new Float32Array(M * C * 2);
  const colors = new Float32Array(M * C * 3);

  const seamLat = new Float32Array(seams.length);
  const lats = new Float32Array(C);
  const tmp = new THREE.Vector3();
  const K = Math.max(1, Math.round(total / ASPHALT_TILE));
  const vPer = total / K;

  for (let m = 0; m < M; m++) {
    const arc = secArc[m];
    const loc = S.locate(arc);
    const A = frames[loc.i], B = frames[loc.j];
    const px = A.pos.x + (B.pos.x - A.pos.x) * loc.f;
    const pz = A.pos.z + (B.pos.z - A.pos.z) * loc.f;
    let lx = A.left.x + (B.left.x - A.left.x) * loc.f;
    let lz = A.left.z + (B.left.z - A.left.z) * loc.f;
    const ll = Math.hypot(lx, lz) || 1;
    lx /= ll; lz /= ll;
    const groove = lerpAt(lineOffset, loc);

    // Where the sealed joints run this section.
    for (let si = 0; si < seams.length; si++) {
      const sm = seams[si];
      const w = (fractalNoise(arc * 0.0085 + sm.seed, sm.seed * 0.31, 3) - 0.5) * 2;
      seamLat[si] = sm.L + w * sm.amp;
    }

    // Slow tone mottling of the whole surface so long straights are not one
    // flat grey under the chase camera.
    const macro = 0.945 + 0.09 * fractalNoise(arc * 0.011, 0.37, 3);

    for (let c = 0; c < C; c++) {
      const col = cols[c];
      lats[c] = col.seam < 0 ? col.lat : seamLat[col.seam] + col.sub * seams[col.seam].half;
    }
    // Belt and braces against a fold: columns must stay strictly ordered.
    for (let c = 1; c < C; c++) {
      if (lats[c] > lats[c - 1] - 0.012) lats[c] = lats[c - 1] - 0.012;
    }

    for (let c = 0; c < C; c++) {
      const col = cols[c];
      const lat = lats[c];
      const y = roadCrownY(lat, hw);
      tmp.set(px + lx * lat, y, pz + lz * lat);
      const vi = m * C + c;
      positions[vi * 3] = tmp.x;
      positions[vi * 3 + 1] = tmp.y;
      positions[vi * 3 + 2] = tmp.z;
      uvs[vi * 2] = lat / ASPHALT_TILE;
      uvs[vi * 2 + 1] = arc / vPer;

      // ---- vertex colour: everything the texture cannot carry ----
      let v = macro;

      // Rubbered groove: two tyre bands astride the racing line, plus a
      // broader wash of rubber between them.
      const d = Math.abs(lat - groove);
      const band = Math.exp(-((d - 0.88) ** 2) / 0.62) + Math.exp(-((d + 0.88) ** 2) / 0.62);
      const rubber = Math.min(1, band);
      v *= 1 - 0.235 * rubber - 0.075 * Math.exp(-d * d / 5.5);

      // Dusty marbles just inside the white lines — pale, dry, and dirtier
      // the further out you go.
      const edge = Math.max(0, Math.abs(lat) / hw - 0.78) / 0.22;
      v *= 1 + edge * 0.13;

      // Oil and coolant down the middle of the lane the field uses most.
      v *= 1 - 0.05 * Math.exp(-((lat - groove) ** 2) / 0.10);

      let warm = 0;

      // Sealed paving-lane joint: a near-black core with the stained margin
      // real sealant always leaves.
      for (let si = 0; si < seams.length; si++) {
        const dl = Math.abs(lat - seamLat[si]);
        const fat = 0.55 + 0.45 * fractalNoise(arc * 0.03 + si * 5.1, 2.2, 3);
        if (col.seam === si) v *= 1 - 0.42 * fat;
        else v *= 1 - 0.085 * fat * Math.exp(-(dl * dl) / 0.42);
      }

      // Transverse cold joints.
      for (const j of F.joints) {
        if (lat < j.latA || lat > j.latB) continue;
        const ds = Math.min(Math.abs(arc - j.s), total - Math.abs(arc - j.s));
        if (ds > j.halfW + 0.03) continue;
        const t = 1 - smoothstep(j.halfW, j.halfW + 0.025, ds);
        v *= 1 - j.depth * t;
      }

      // Resurfacing patches: a tone step inside a dark sealed cut edge.
      for (const p of F.patches) {
        if (lat < p.latA || lat > p.latB) continue;
        const rel = ((arc - p.s0) % total + total) % total;
        const span = p.s1 - p.s0;
        if (rel > span + p.seal + 0.02 && rel < total - p.seal - 0.02) continue;
        const inside = rel <= span;
        if (inside) { v *= 1 + p.tone; warm += p.warm; }
        const dEdge = Math.min(Math.abs(rel), Math.abs(rel - span), Math.abs(rel - total));
        const cut = 1 - smoothstep(p.seal, p.seal + 0.02, dEdge);
        v *= 1 - 0.30 * cut;
      }

      // Pothole and utility-cut repairs.
      for (const r of F.repairs) {
        if (Math.abs(lat - r.lat) > r.wid / 2) continue;
        const rel = ((arc - r.s0) % total + total) % total;
        const span = r.s1 - r.s0;
        if (rel > span + 0.04 && rel < total - 0.04) continue;
        const t = rel <= span ? 1 : 1 - smoothstep(0, 0.04, Math.min(rel - span, total - rel));
        v *= 1 - r.depth * t;
        warm -= 0.02 * t;
      }

      colors[vi * 3] = v * (1 + warm);
      colors[vi * 3 + 1] = v * (1 + warm * 0.55);
      colors[vi * 3 + 2] = v * (1 - warm * 0.35) * 1.008;
    }
  }

  const indices = [];
  for (let m = 0; m < M - 1; m++) {
    const a = m * C;
    const b = (m + 1) * C;
    for (let k = 0; k < C - 1; k++) {
      // Same winding as the road has always used: with columns running in the
      // -left direction this is the order whose faces point UP.
      indices.push(a + k, b + k, a + k + 1);
      indices.push(a + k + 1, b + k, b + k + 1);
    }
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  g.setIndex(indices.length > 65535 ? new THREE.Uint32BufferAttribute(indices, 1)
                                    : new THREE.Uint16BufferAttribute(indices, 1));
  g.computeVertexNormals();   // picks up the camber tilt; nothing else can
  g.computeBoundingSphere();
  return g;
}

// ---------------------------------------------------------------------------
// Flat strips: painted lines, verge, and the pit-lane paving track.js reuses
// ---------------------------------------------------------------------------

/**
 * A flat ribbon following the centreline at a lateral offset.
 *
 * Three things changed from the original:
 *  - it sits on the cambered surface (`roadCrownY`), so the white lines follow
 *    the shoulder break and the verge picks up the drainage swale;
 *  - strips wide enough to straddle that swale get 5 columns instead of 2, so
 *    the gulley is real geometry rather than a painted suggestion;
 *  - narrow strips (paint) are frayed and worn: the width is eaten away from
 *    the inner edge and can pinch to nothing where cars have scrubbed the line
 *    off entirely, which is what a real edge line looks like at a corner exit.
 *
 * u always starts at the edge nearest the centreline, on BOTH sides, so an
 * asymmetric cross-section texture (the verge) is not mirrored on one side.
 */
export function buildEdgeLineGeometry(frames, offset, width) {
  const n = frames.length;
  const sign = offset >= 0 ? 1 : -1;
  const mid = Math.abs(offset);
  const hw = roadHalfWidth;

  // Paint frays; a 3.4 m pit apron does not.
  const paint = smoothstep(0.65, 0.28, width);
  // Only strips close enough to the road to cross the drainage swale need the
  // extra columns — the city sidewalk sits 15 m out on dead-flat shoulder.
  const across = (width > 1.0 && mid < hw + 4.5) ? 5 : 2;

  const rows = n + 1;                       // duplicate the seam row (see road)
  const positions = new Float32Array(rows * across * 3);
  const uvs = new Float32Array(rows * across * 2);
  const normals = new Float32Array(rows * across * 3);
  const colors = new Float32Array(rows * across * 3);

  for (let i = 0; i < rows; i++) {
    const f = frames[i % n];
    const t = i / n;
    // Wear runs at two scales: metre-scale scuffing and long stretches that
    // are basically gone.
    const wear = fractalNoise(t * 46 + 3.1, 1.7, 4);
    const gone = smoothstep(0.62, 0.86, fractalNoise(t * 13 + 8.4, 5.2, 3));
    const w = width * Math.max(0, 1 - paint * (wear * 0.30 + gone * 0.95));
    const inner = mid - w / 2 + (width - w) / 2 * paint;   // paint wears off the road side
    const outer = inner + w;

    for (let k = 0; k < across; k++) {
      const u = k / (across - 1);
      const dist = inner + u * w;            // distance from the centreline
      const lat = sign * dist;
      const y = roadCrownY(lat, hw);
      // Columns must run in the -left direction for the winding below to face
      // up, so a strip on the -left side is emitted outer-first.
      const c = sign > 0 ? k : (across - 1 - k);
      const vi = i * across + c;
      positions[vi * 3] = f.pos.x + f.left.x * lat;
      positions[vi * 3 + 1] = y;
      positions[vi * 3 + 2] = f.pos.z + f.left.z * lat;
      uvs[vi * 2] = u;
      uvs[vi * 2 + 1] = t;
      normals[vi * 3] = 0; normals[vi * 3 + 1] = 1; normals[vi * 3 + 2] = 0;

      // Grime for the verge, patchy paint for the lines.
      const mottle = 0.88 + 0.22 * fractalNoise(t * 62 + u * 3.4, u * 7.7 + 2.1, 4);
      const scrub = 1 - paint * wear * 0.34;
      const v = mottle * scrub;
      colors[vi * 3] = v;
      colors[vi * 3 + 1] = v * (1 - paint * 0.012);
      colors[vi * 3 + 2] = v * (1 - paint * 0.02);
    }
  }

  // Wound so the face normal points UP. Measured, not reasoned about: with the
  // column remap above, the order `(a+k, b+k, a+k+1)` yields a face normal with
  // y = -0.16 on BOTH sides, i.e. every white line and verge strip was
  // back-facing and simply did not draw from a camera above the road. Reversing
  // each triangle is the whole fix. If a flat strip ever "disappears" here,
  // dump a face normal before touching anything else.
  const indices = [];
  for (let i = 0; i < rows - 1; i++) {
    const a = i * across;
    const b = (i + 1) * across;
    for (let k = 0; k < across - 1; k++) {
      indices.push(a + k, a + k + 1, b + k);
      indices.push(a + k + 1, b + k + 1, b + k);
    }
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  g.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  g.setIndex(indices);
  g.computeBoundingSphere();
  return g;
}

// ---------------------------------------------------------------------------
// Kerbs
// ---------------------------------------------------------------------------

// Cross-sections, given as bands so each one can keep its own normal — a kerb
// with smoothed normals across the profile reads as a soft speed bump. Each
// entry is [lateral offset from the road edge (m or fraction of the kerb
// width), height above the road edge (m), u along the texture atlas].
function kerbProfile(kind, width) {
  if (kind === 'apron') {
    // The flat blue/yellow exit apron: barely raised, wide, no ribs to speak
    // of — the thing drivers are allowed to run all four wheels over.
    return {
      rib: 0.004,
      pts: [
        { lat: 0.00, y: 0.002, u: 0.02, rib: 0 },
        { lat: 0.10, y: 0.022, u: 0.20, rib: 0 },
        { lat: 0.30, y: 0.036, u: 0.32, rib: 1 },
        { lat: width * 0.86, y: 0.030, u: 0.84, rib: 1 },
        { lat: width, y: 0.014, u: 0.94, rib: 0 },
        { lat: width + 0.30, y: null, u: 1.00, rib: 0 },
      ],
    };
  }
  return {
    rib: 0.011,
    pts: [
      { lat: 0.00, y: 0.002, u: 0.02, rib: 0 },   // flush at the asphalt
      { lat: 0.13, y: 0.055, u: 0.26, rib: 0 },   // chamfered face
      { lat: 0.34, y: 0.105, u: 0.34, rib: 1 },   // top inner edge
      { lat: width * 0.78, y: 0.092, u: 0.82, rib: 1 },  // top, falling outward
      { lat: width, y: 0.040, u: 0.94, rib: 0 },  // outer chamfer
      { lat: width + 0.30, y: null, u: 1.00, rib: 0 },   // foot, on the verge
    ],
  };
}

/**
 * The contiguous arc spans one side's kerbs occupy, with the profile each span
 * is laid in. Shared by the mesh builder and the collision builder below so the
 * two can never disagree about where a kerb is or how tall it is — the physics
 * kerb has to be the one that is drawn, or a car climbs an invisible step.
 *
 * Wrap-aware: a run that crosses the start/finish line is returned once, with
 * `s1` past `total`.
 */
function kerbRuns(frames, sideSign, active, arcLens, width, total) {
  const n = frames.length;
  const spans = [];
  let allOn = true;
  for (let i = 0; i < n; i++) if (!active[i]) { allOn = false; break; }
  if (allOn) {
    spans.push([0, total]);
  } else {
    for (let i = 0; i < n; i++) {
      if (!active[i] || active[(i - 1 + n) % n]) continue;
      let len = 0;
      while (len < n && active[(i + len) % n]) len++;
      const s0 = arcLens[i];
      const i1 = (i + len - 1) % n;
      let s1 = arcLens[i1];
      if (s1 < s0) s1 += total;
      if (s1 - s0 > 2) spans.push([s0, s1]);
    }
  }

  return spans.map(([s0, s1], r) => {
    // Scheme and profile per run, not per metre: a circuit does not change
    // kerb type halfway round a corner. Deterministic from the run's position
    // so a reload does not reshuffle them.
    const h = hashFn(Math.round(s0), sideSign * 7.3 + r);
    const kind = (h > 0.82 && s1 - s0 > 22) ? 'apron' : 'kerb';
    return {
      s0, s1, kind,
      scheme: (kind === 'apron' || h < 0.14) ? 0.5 : 0.0,   // atlas half
      prof: kerbProfile(kind, width),
    };
  });
}

/**
 * A real racing kerb: chamfered face at the road edge climbing to ~10.5 cm,
 * a ribbed top, and a drop-off to the verge.
 *
 * Built as an arc walk at half the rib pitch so the cast ribs are discrete
 * geometry, phase-locked to absolute arc length — which is also how the
 * texture is addressed, so the red/white blocks break exactly on the rib
 * grooves instead of sliding along them. Each band carries its own pair of
 * vertices (no sharing across the profile) so computeVertexNormals creases the
 * face against the top instead of rounding the whole thing off.
 *
 * The last vertex of the profile is dropped onto the shoulder's own height
 * (plus 4 mm) so the kerb foot lands on the verge rather than z-fighting it.
 */
export function buildKerb3DGeometry(frames, offsetIn, width, sideSign, active, arcLens) {
  const hw = Math.abs(offsetIn);
  const S = arcSampler(frames, arcLens);
  const total = S.total;
  const edgeY = roadCrownY(hw, hw);

  const runs = kerbRuns(frames, sideSign, active, arcLens, width, total);

  const positions = [];
  const uvs = [];
  const colors = [];
  const indices = [];

  for (let r = 0; r < runs.length; r++) {
    const { s0, s1, scheme, prof } = runs[r];
    const P = prof.pts.length;
    const bands = P - 1;

    // Snap to the global rib grid so ribs line up with the texture blocks.
    const start = Math.ceil(s0 / KERB_STEP) * KERB_STEP;
    const steps = Math.floor((s1 - start) / KERB_STEP);
    if (steps < 3) continue;

    const base0 = positions.length / 3;
    for (let k = 0; k <= steps; k++) {
      const arc = start + k * KERB_STEP;
      const fr = S.at(arc);
      // Kerbs ramp out of the asphalt at both ends; a kerb that starts at full
      // height mid-corner looks like a dropped brick.
      const taper = Math.min(
        smoothstep(0, 1.4, arc - s0),
        smoothstep(0, 1.4, s1 - arc)
      );
      const ribH = prof.rib * (0.5 - 0.5 * Math.cos((arc / RIB_PITCH) * Math.PI * 2));
      const grime = 0.86 + 0.20 * fractalNoise(arc * 0.7, sideSign * 3.1, 3);

      for (let p = 0; p < P; p++) {
        const pt = prof.pts[p];
        const lat = sideSign * (hw + pt.lat);
        let y;
        if (pt.y === null) {
          y = ROAD_LIFT + roadCrownY(lat, hw) + 0.004;
        } else {
          y = ROAD_LIFT + edgeY + (pt.y + ribH * pt.rib) * taper;
        }
        const px = fr.pos.x + fr.left.x * lat;
        const pz = fr.pos.z + fr.left.z * lat;
        // Each band owns its own vertices: emit the profile point twice,
        // once as the end of the previous band and once as the start of the
        // next, so normals crease between them.
        const reps = (p === 0 || p === P - 1) ? 1 : 2;
        for (let q = 0; q < reps; q++) {
          positions.push(px, y, pz);
          uvs.push(scheme + pt.u * 0.5, arc / (RIB_PITCH * 2));
          const g = grime * (pt.y === null ? 0.74 : 1) * (p >= 3 ? 0.94 : 1);
          colors.push(g, g * 0.995, g * 0.985);
        }
      }
    }

    const V = bands * 2;                      // vertices per section
    for (let k = 0; k < steps; k++) {
      const a = base0 + k * V;
      const b = base0 + (k + 1) * V;
      for (let bd = 0; bd < bands; bd++) {
        const a0 = a + bd * 2, a1 = a0 + 1;
        const b0 = b + bd * 2, b1 = b0 + 1;
        // Profile points run outward, i.e. along +left on the +side and
        // -left on the -side; only the -side matches the road's winding, so
        // the +side gets the mirrored order. (Both sides used to be wound
        // face-down, which is why the old kerbs were lit from underneath.)
        if (sideSign > 0) {
          indices.push(a0, a1, b0, a1, b1, b0);
        } else {
          indices.push(a0, b0, a1, a1, b0, b1);
        }
      }
    }
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
  g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
  g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
  g.setIndex(indices.length > 65535 ? new THREE.Uint32BufferAttribute(indices, 1)
                                    : new THREE.Uint16BufferAttribute(indices, 1));
  g.computeVertexNormals();
  g.computeBoundingSphere();
  return g;
}

// ---------------------------------------------------------------------------
// Kerb collision
// ---------------------------------------------------------------------------

const KERB_SEG_LEN = 3.0;       // m of arc per collision box
const KERB_SEG_PAD = 0.15;      // half-length padding: no gap where boxes meet
const KERB_CHUNK = 10;          // segments per body ≈ 30 m, so an AABB stays local
const KERB_FOOT_Y = -0.25;      // slab underside, below the flat physics ground

/**
 * The kerb profile reduced to a lateral staircase the physics can be built
 * from: one flat-topped band between each pair of authored profile points.
 *
 * The chamfer becomes two steps rather than a ramp, which is the one real
 * approximation here. It is a fair one, because a `RaycastVehicle` wheel is a
 * point ray with no contact patch: it cannot feel the difference between a
 * 21 cm ramp and two steps to the same height, only where the height changes.
 * The first step (~2.9 cm at the white line) is the lip that unsettles a car
 * putting a wheel over the edge, and that is the point of the whole thing.
 *
 * A band whose *both* ends are ribbed is modelled at the rib crest, not the
 * mean: a rolling tyre bridges the 1 m grooves and rides the crests. Modelling
 * the ribs themselves would be false precision — at 40 m/s a 1 m pitch is
 * 40 Hz against a 120 Hz step, so the ripple would alias into noise.
 */
function kerbCollisionBands(prof, width) {
  const pts = prof.pts.filter((p) => p.y !== null);
  const bands = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i], b = pts[i + 1];
    const lat0 = Math.min(a.lat, width), lat1 = Math.min(b.lat, width);
    if (lat1 - lat0 < 0.02) continue;
    bands.push({
      lat0, lat1,
      top: (a.y + b.y) / 2 + (a.rib && b.rib ? prof.rib : 0),
    });
  }
  return bands;
}

/**
 * Collision slabs for one side's kerbs, as chunks of boxes ready to hang off a
 * static body each (see `buildKerbPhysics` in track.js).
 *
 * Why this exists: the world's ground is a single flat `CANNON.Box`, so every
 * bit of relief on a circuit — the camber, the terrain, and these kerbs — was
 * decoration. A car could cut an apex across a 10.5 cm kerb with the
 * suspension none the wiser, and nothing anywhere on any circuit could put a
 * wheel in the air (ROUTINE.md, 2026-08-12). Riding a kerb is now a decision
 * with a cost instead of a free line.
 *
 * Heights are the *drawn* kerb's world y, not a height above the physics
 * ground. The two are not the same: the physics ground is flat at y=0 while
 * the road is drawn with a crown, so its edge sits ~1.4 cm lower. Seating the
 * slabs on the drawn kerb is what puts the tyre where the kerb is seen to be.
 *
 * Each slab is a chord between its own two end samples, taken at that band's
 * lateral offset — not a fixed-length box dropped on the mid-arc frame. That
 * matters more than it sounds: the arc the runs are cut in is CENTRELINE arc
 * length, and a kerb sits ~8 m to the side of it, so on the outside of a 50 m
 * corner 3 m of centreline is 3.5 m of kerb. Sizing boxes by the arc step left
 * a ~0.3 m gap at every joint round the outside of every corner — a ray (and a
 * wheel) dropped straight through onto the road below, roughly every third
 * metre of kerb. Chords share their endpoints exactly, so the only thing
 * `KERB_SEG_PAD` still has to cover is the wedge that opens at the outer
 * lateral edge where consecutive boxes yaw apart.
 */
export function buildKerbCollision(frames, offsetIn, width, sideSign, active, arcLens) {
  const hw = Math.abs(offsetIn);
  const S = arcSampler(frames, arcLens);
  const edgeY = roadCrownY(hw, hw);
  const baseY = ROAD_LIFT + edgeY;
  const chunks = [];

  for (const run of kerbRuns(frames, sideSign, active, arcLens, width, S.total)) {
    const bands = kerbCollisionBands(run.prof, width);
    const runLen = run.s1 - run.s0;
    const nSeg = Math.max(1, Math.round(runLen / KERB_SEG_LEN));
    const segLen = runLen / nSeg;
    let chunk = null;

    for (let k = 0; k < nSeg; k++) {
      const arc = run.s0 + (k + 0.5) * segLen;
      // Same ramp-in as the mesh: a kerb that starts at full height mid-corner
      // looks (and now feels) like a dropped brick.
      const taper = Math.min(
        smoothstep(0, 1.4, arc - run.s0),
        smoothstep(0, 1.4, run.s1 - arc)
      );
      if (taper < 0.02) continue;
      const fA = S.at(run.s0 + k * segLen);
      const fB = S.at(run.s0 + (k + 1) * segLen);
      const fM = S.at(arc);
      if (!chunk || k % KERB_CHUNK === 0) { chunk = []; chunks.push(chunk); }

      for (const band of bands) {
        const lat = sideSign * (hw + (band.lat0 + band.lat1) / 2);
        const ax = fA.pos.x + fA.left.x * lat, az = fA.pos.z + fA.left.z * lat;
        const bx = fB.pos.x + fB.left.x * lat, bz = fB.pos.z + fB.left.z * lat;
        const dx = bx - ax, dz = bz - az;
        const len = Math.hypot(dx, dz);
        if (len < 1e-3) continue;
        // A chord cuts the corner: its middle sits `sag` inside the kerb it is
        // standing in for (10 cm on a street hairpin, enough to hand a wheel
        // the next band down). Split the difference — centre the box halfway
        // between the chord and the real mid-point, and widen it by the other
        // half — so the band covers its lateral span everywhere.
        const cx = (ax + bx) / 2, cz = (az + bz) / 2;
        const mx = fM.pos.x + fM.left.x * lat, mz = fM.pos.z + fM.left.z * lat;
        const sag = Math.hypot(mx - cx, mz - cz);
        const top = baseY + band.top * taper;
        const halfY = (top - KERB_FOOT_Y) / 2;
        chunk.push({
          x: (cx + mx) / 2,
          y: top - halfY,
          z: (cz + mz) / 2,
          yaw: Math.atan2(dx, dz),
          hx: (band.lat1 - band.lat0) / 2 + sag / 2,
          hy: halfY,
          hz: len / 2 + KERB_SEG_PAD,
        });
      }
    }
  }
  return chunks;
}

// ---------------------------------------------------------------------------
// Skid marks
// ---------------------------------------------------------------------------

/**
 * Rubber laid down at the heavy corners. Several passes per corner at slightly
 * different lines (no two drivers brake in the same place), each fading in and
 * out along its length via per-vertex alpha, plus the occasional locked-front
 * mark that runs straight on while the racing line turns in.
 *
 * It rides the camber like everything else, and hides from the GTAO prepass —
 * a transparent decal has no business writing depth into the AO buffer.
 */
export function addSkidMarks(scene, frames, curvature, lineOffset, arcLens) {
  const n = frames.length;
  const hw = roadHalfWidth;

  const marks = [];
  let i = 0;
  while (i < n) {
    if (curvature[i] > 0.004) {
      let j = i;
      while (j < n && curvature[j] > 0.0016) j++;
      marks.push([Math.max(0, i - 12), Math.min(n - 1, j + 5)]);
      i = j + 12;
    } else i++;
  }
  if (!marks.length) return;

  const positions = [];
  const colors = [];
  const indices = [];

  const strip = (i0, i1, latAt, halfW, dark, taperIn) => {
    const base = positions.length / 3;
    const span = Math.max(1, i1 - i0);
    for (let k = i0; k <= i1; k++) {
      const f = frames[k];
      const u = (k - i0) / span;
      // Rubber is heaviest under the load and evaporates at both ends.
      const a = dark * smoothstep(0, taperIn, u) * (1 - smoothstep(0.72, 1, u));
      const lat = latAt(k, u);
      for (const s of [+1, -1]) {
        const l = lat + s * halfW;
        positions.push(
          f.pos.x + f.left.x * l,
          ROAD_LIFT + roadCrownY(l, hw) + 0.006,
          f.pos.z + f.left.z * l
        );
        colors.push(0.09, 0.09, 0.10, a);
      }
      if (k > i0) {
        const v = base + (k - i0) * 2;
        indices.push(v - 2, v, v - 1, v - 1, v, v + 1);
      }
    }
  };

  for (let mi = 0; mi < marks.length; mi++) {
    const [i0, i1] = marks[mi];
    const passes = 2 + (hashFn(i0, mi) > 0.5 ? 1 : 0);
    for (let p = 0; p < passes; p++) {
      const drift = (hashFn(i0 + p * 13, mi * 3.7) - 0.5) * 1.5;
      const dark = 0.16 + hashFn(p, i0) * 0.20;
      for (const tyre of [-0.86, 0.86]) {
        strip(i0, i1, (k) => lineOffset[k] + tyre + drift, 0.15 + hashFn(i0, p) * 0.02,
              dark, 0.18);
      }
    }
    // A locked front wheel: the mark keeps the entry line while the car turns.
    if (hashFn(i0, 91.7) > 0.55) {
      const l0 = lineOffset[i0];
      const len = Math.min(i1 - i0, 14);
      strip(i0, i0 + len, (k, u) => l0 * (1 - u * 0.35) + 0.9, 0.17, 0.30, 0.06);
    }
  }

  if (!positions.length) return;
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
  g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 4));
  g.setIndex(indices.length > 65535 ? new THREE.Uint32BufferAttribute(indices, 1)
                                    : new THREE.Uint16BufferAttribute(indices, 1));
  g.computeVertexNormals();
  g.computeBoundingSphere();

  const mat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    vertexColors: true,        // 4-component colour → per-vertex alpha
    transparent: true,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -3,
    polygonOffsetUnits: -3,
  });
  const mesh = new THREE.Mesh(g, mat);
  mesh.renderOrder = 2;
  hideFromOverridePasses(mesh);
  scene.add(mesh);
}

// ---------------------------------------------------------------------------
// Materials
// ---------------------------------------------------------------------------

/**
 * Aggregate: a height field of stamped stone chips, turned into a normal map
 * and a roughness map. One octave of generic fractal noise (what this used to
 * be) has no chips in it at all — it reads as crumpled paper. Stamping actual
 * ellipses gives each chip a facet that catches the low sun as a directional
 * highlight, and lets the size distribution be right (a lot of 5 mm fines,
 * a few 20 mm stones).
 */
function makeAggregateMaps(size = 512) {
  const h = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      h[y * size + x] = fractalNoise(x / size * 9, y / size * 9, 3) * 0.22;
    }
  }
  const chips = Math.round(size * size / 95);
  for (let c = 0; c < chips; c++) {
    const cx = rand() * size, cy = rand() * size;
    const r = 1.6 + Math.pow(rand(), 2.4) * 8;
    const ang = rand() * Math.PI;
    const ar = 0.5 + rand() * 0.7;
    const hgt = 0.30 + rand() * 0.70;
    const ca = Math.cos(ang), sa = Math.sin(ang);
    const R = Math.ceil(r * 1.35);
    for (let dy = -R; dy <= R; dy++) {
      for (let dx = -R; dx <= R; dx++) {
        const u = (dx * ca + dy * sa) / r;
        const v = (-dx * sa + dy * ca) / (r * ar);
        const d2 = u * u + v * v;
        if (d2 > 1) continue;
        // Shallow faceted dome — a chip is a broken stone, not a marble.
        const val = hgt * Math.pow(1 - Math.sqrt(d2), 0.5);
        const px = (((cx + dx) | 0) % size + size) % size;
        const py = (((cy + dy) | 0) % size + size) % size;
        const o = py * size + px;
        if (val > h[o]) h[o] = val;
      }
    }
  }

  const mk = (fn) => {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    const img = ctx.createImageData(size, size);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const px = fn(x, y);
        const i = (y * size + x) * 4;
        img.data[i] = px[0] * 255;
        img.data[i + 1] = px[1] * 255;
        img.data[i + 2] = px[2] * 255;
        img.data[i + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.needsUpdate = true;
    return t;
  };

  const at = (x, y) => h[((y % size) + size) % size * size + (((x % size) + size) % size)];
  const strength = 2.6;
  const normalTex = mk((x, y) => {
    const dx = (at(x + 1, y) - at(x - 1, y)) * strength;
    const dy = (at(x, y + 1) - at(x, y - 1)) * strength;
    const len = Math.hypot(-dx, -dy, 1);
    return [(-dx / len) * 0.5 + 0.5, (-dy / len) * 0.5 + 0.5, (1 / len) * 0.5 + 0.5];
  });
  const roughTex = mk((x, y) => {
    // Chip faces are polished by tyres; the bitumen matrix between them is
    // dead matt. Plus a slow macro sheen so the whole road is not one gloss.
    const chip = Math.min(1, at(x, y) * 1.3);
    const macro = fractalNoise(x / size * 2.5 + 4, y / size * 2.5 + 9, 3);
    const v = 0.97 - chip * 0.26 - macro * 0.10;
    return [v, v, v];
  });
  return { normalTex, roughTex };
}

export function makeAsphaltMaterial() {
  // Albedo carries grain, aggregate speckle and hairline crazing. Everything
  // larger than the 4 m tile (patches, joints, groove, marbles) is in the
  // road's vertex colours instead — a tiled texture repeats ~300 times a lap
  // and any recognisable feature in it becomes a stamped pattern.
  const colorTex = makeNoiseTexture(1024, makeTileable((x, y) => {
    const grain = fractalNoise(x * 26, y * 26, 5);
    const speck = fractalNoise(x * 118 + 11, y * 118 + 5, 2);
    const patch = fractalNoise(x * 6.5 + 4, y * 6.5 + 9, 3);
    // Crazing: the ridge of a mid-frequency noise field reads as the wandering
    // hairline cracks that cover any asphalt over a few years old.
    const cz = fractalNoise(x * 9 + 21, y * 9 + 13, 3);
    const crack = 1 - smoothstep(0.0, 0.022, Math.abs(cz - 0.5));
    let v = 0.116 + grain * 0.074 + patch * 0.030;
    if (speck > 0.70) v += 0.085;     // limestone chip catching light
    if (speck < 0.15) v -= 0.038;     // bitumen void
    v -= crack * 0.045;
    // Asphalt aggregate is slate — a touch blue, never neutral grey.
    return [v * 0.96, v * 0.98, v * 1.05];
  }, 0.12));
  colorTex.wrapS = colorTex.wrapT = THREE.RepeatWrapping;
  colorTex.anisotropy = 16;
  colorTex.colorSpace = THREE.SRGBColorSpace;

  // The road's UVs are in 4 m tile units, so these repeats are in tiles: the
  // aggregate wants a much tighter footprint than the albedo, and the gloss
  // variation a much looser one. (Per-map transforms; three has had separate
  // uv transforms per texture slot since r151 — makeGrassMaterial already
  // relies on it.)
  const { normalTex, roughTex } = makeAggregateMaps(512);
  normalTex.repeat.set(2.6, 2.6);
  normalTex.anisotropy = 8;
  roughTex.repeat.set(0.55, 0.55);

  return new THREE.MeshStandardMaterial({
    map: colorTex,
    vertexColors: true,
    normalMap: normalTex,
    normalScale: new THREE.Vector2(1.05, 1.05),
    roughnessMap: roughTex,
    roughness: 0.92,
    metalness: 0.0,
    envMapIntensity: 0.55,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
}

/**
 * Kerb atlas. The texture's v axis is addressed in units of two rib pitches
 * (see buildKerb3DGeometry), so one canvas height is exactly two colour blocks
 * and the block boundary always falls in a cast groove. u is split in half:
 * the left half is the red/white racing kerb, the right the blue/yellow exit
 * apron, and a whole kerb run picks one.
 */
export function makeKerbMaterial() {
  const SZ = 512;
  const HALF = SZ / 2;

  const c = document.createElement('canvas');
  c.width = c.height = SZ;
  const ctx = c.getContext('2d');

  // Band boundaries in u within one atlas half (must match kerbProfile's u).
  const FACE = [0.0, 0.30];
  const TOP = [0.30, 0.86];
  const FOOT = [0.86, 1.0];

  const paintSchemes = [
    { a: '#c8241d', b: '#f2f0ea' },   // racing red / white
    { a: '#1b4f9c', b: '#e8c93a' },   // blue / yellow apron
  ];

  for (let s = 0; s < 2; s++) {
    const x0 = s * HALF;
    const sc = paintSchemes[s];
    for (let blk = 0; blk < 2; blk++) {
      const y0 = blk * HALF;
      const col = blk === 0 ? sc.a : sc.b;
      // Face and top take the paint; the foot is bare concrete.
      ctx.fillStyle = col;
      ctx.fillRect(x0, y0, HALF, HALF);
      ctx.fillStyle = blk === 0 ? '#8c8880' : '#9a968d';
      ctx.fillRect(x0 + FOOT[0] * HALF, y0, (FOOT[1] - FOOT[0]) * HALF, HALF);

      // The vertical face is the part that gets ground down by tyres and
      // splashed with track dirt.
      ctx.fillStyle = 'rgba(40,34,28,0.20)';
      ctx.fillRect(x0, y0, (FACE[1] - FACE[0]) * HALF, HALF);

      // Cast grooves at the block boundary, with a lit lip on the near side.
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.fillRect(x0 + TOP[0] * HALF, y0, (TOP[1] - TOP[0]) * HALF, 7);
      ctx.fillStyle = 'rgba(255,255,255,0.16)';
      ctx.fillRect(x0 + TOP[0] * HALF, y0 + 7, (TOP[1] - TOP[0]) * HALF, 4);
      // A pair of finer anti-slip grooves inside each rib.
      ctx.fillStyle = 'rgba(0,0,0,0.22)';
      for (const fy of [0.36, 0.68]) {
        ctx.fillRect(x0 + TOP[0] * HALF, y0 + fy * HALF, (TOP[1] - TOP[0]) * HALF, 3);
      }

      // Paint chipped off the leading edge of the rib, concrete showing.
      for (let i = 0; i < 60; i++) {
        const px = x0 + (TOP[0] + rand() * (TOP[1] - TOP[0])) * HALF;
        const py = y0 + Math.pow(rand(), 1.8) * HALF;
        ctx.fillStyle = `rgba(150,146,138,${0.15 + rand() * 0.4})`;
        ctx.fillRect(px, py, 2 + rand() * 9, 1 + rand() * 4);
      }
      // Black rubber scuffed across the top by cars riding the kerb.
      for (let i = 0; i < 26; i++) {
        const py = y0 + rand() * HALF;
        ctx.fillStyle = `rgba(22,20,22,${0.06 + rand() * 0.16})`;
        ctx.fillRect(x0 + TOP[0] * HALF, py, (TOP[1] - TOP[0]) * HALF * (0.3 + rand() * 0.7),
                     1 + rand() * 3);
      }
      // Dirt piling up in the angle between kerb and verge.
      const grad = ctx.createLinearGradient(x0 + FOOT[0] * HALF, 0, x0 + HALF, 0);
      grad.addColorStop(0, 'rgba(60,48,32,0.15)');
      grad.addColorStop(1, 'rgba(48,38,24,0.62)');
      ctx.fillStyle = grad;
      ctx.fillRect(x0 + FOOT[0] * HALF, y0, (1 - FOOT[0]) * HALF, HALF);
      // Concrete pitting everywhere.
      for (let i = 0; i < 220; i++) {
        const px = x0 + rand() * HALF;
        const py = y0 + rand() * HALF;
        ctx.fillStyle = `rgba(0,0,0,${rand() * 0.09})`;
        ctx.fillRect(px, py, 1 + rand() * 2, 1 + rand() * 2);
      }
    }
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.ClampToEdgeWrapping;   // u is an atlas: never wrap it
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = 8;

  // Normal map: sharp rib flanks so the ribs read as discrete castings even
  // though the geometric ripple is only ~11 mm, plus concrete grain.
  const nrm = document.createElement('canvas');
  nrm.width = nrm.height = SZ;
  {
    const nctx = nrm.getContext('2d');
    const img = nctx.createImageData(SZ, SZ);
    const height = (x, y) => {
      const u = (x % HALF) / HALF;
      const vb = (y % HALF) / HALF;          // 0..1 within one rib
      let hgt = fractalNoise(x / SZ * 40, y / SZ * 40, 3) * 0.10;
      if (u > TOP[0] && u < TOP[1]) {
        // Groove at the rib boundary, flat crown between.
        hgt += smoothstep(0.0, 0.055, vb) * (1 - smoothstep(0.94, 1.0, vb)) * 0.8;
        for (const fy of [0.36, 0.68]) {
          hgt -= 0.25 * (1 - smoothstep(0, 0.02, Math.abs(vb - fy)));
        }
      } else if (u <= TOP[0]) {
        hgt += smoothstep(0.0, 0.055, vb) * (1 - smoothstep(0.94, 1.0, vb)) * 0.35;
      }
      return hgt;
    };
    for (let y = 0; y < SZ; y++) {
      for (let x = 0; x < SZ; x++) {
        const dx = (height(x + 1, y) - height(x - 1, y)) * 2.2;
        const dy = (height(x, y + 1) - height(x, y - 1)) * 2.2;
        const len = Math.hypot(-dx, -dy, 1);
        const i = (y * SZ + x) * 4;
        img.data[i] = ((-dx / len) * 0.5 + 0.5) * 255;
        img.data[i + 1] = ((-dy / len) * 0.5 + 0.5) * 255;
        img.data[i + 2] = ((1 / len) * 0.5 + 0.5) * 255;
        img.data[i + 3] = 255;
      }
    }
    nctx.putImageData(img, 0, 0);
  }
  const normalTex = new THREE.CanvasTexture(nrm);
  normalTex.wrapS = THREE.ClampToEdgeWrapping;
  normalTex.wrapT = THREE.RepeatWrapping;
  normalTex.anisotropy = 8;

  return new THREE.MeshStandardMaterial({
    map: tex,
    normalMap: normalTex,
    normalScale: new THREE.Vector2(0.9, 0.9),
    vertexColors: true,
    roughness: 0.55,          // painted concrete, polished on the ribs
    metalness: 0.0,
    envMapIntensity: 0.4,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });
}

/**
 * The verge: the strip of beaten earth between the kerb and the grass. u runs
 * from the road side outward (buildEdgeLineGeometry guarantees that on both
 * sides), so the cross-section can be asymmetric — silted drainage gulley
 * against the kerb, dry scuffed dirt in the middle, tyre-tracked mud where
 * cars run wide, grass creeping in at the outer edge.
 */
export function makeVergeMaterial(ground = 'grass') {
  const OUT = {
    grass: [0.17, 0.27, 0.13],
    alpine: [0.14, 0.24, 0.14],
    sand: [0.60, 0.49, 0.30],
    city: [0.30, 0.30, 0.29],
  }[ground] || [0.17, 0.27, 0.13];
  const DIRT = ground === 'sand' ? [0.58, 0.46, 0.28] : [0.34, 0.27, 0.17];
  const WET = ground === 'sand' ? [0.40, 0.32, 0.20] : [0.20, 0.17, 0.12];

  // Only v tiles (the strip repeats down the lap); u is the cross-section and
  // must not be folded, so this does the seam fix by hand instead of using
  // makeTileable.
  const raw = (x, y) => {
    const grit = fractalNoise(x * 18, y * 70, 4);
    const clods = fractalNoise(x * 5 + 4, y * 26 + 8, 3);
    // Ruts: a pair of wheel tracks that fade in and out down the strip, so the
    // mud pull-off only appears in stretches (where cars actually run wide).
    const rutMask = smoothstep(0.45, 0.75, fractalNoise(x * 0.7 + 2.2, y * 9 + 5.5, 3));
    const rut = rutMask * (Math.exp(-((x - 0.42) ** 2) / 0.004) + Math.exp(-((x - 0.62) ** 2) / 0.005));

    const out = [0, 0, 0];
    for (let ch = 0; ch < 3; ch++) {
      const dirt = DIRT[ch] + grit * 0.17 + clods * 0.06;
      const wet = WET[ch] + grit * 0.09;
      const grass = OUT[ch] + clods * 0.14;
      // 0.00-0.16 gulley (damp, silted), 0.16-0.72 dry dirt, 0.72-1 grass.
      const gully = 1 - smoothstep(0.05, 0.20, x);
      const green = smoothstep(0.70, 0.99, x);
      let v = dirt * (1 - gully) + wet * gully;
      v = v * (1 - green) + grass * green;
      v = v * (1 - rut * 0.45) + wet * rut * 0.45;
      out[ch] = v;
    }
    return out;
  };
  const band = 0.14;
  const tex = makeNoiseTexture(512, (x, y) => {
    if (y < 1 - band) return raw(x, y);
    const t = smoothstep(0, 1, (y - (1 - band)) / band);
    const a = raw(x, y), b = raw(x, y - 1);
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  });
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 60);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;

  return new THREE.MeshStandardMaterial({
    map: tex,
    vertexColors: true,
    roughness: 0.97,
    metalness: 0,
    envMapIntensity: 0.3,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
}
