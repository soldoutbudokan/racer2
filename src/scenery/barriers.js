/**
 * Trackside barrier furniture: W-beam Armco, rural mountain guardrail, tyre
 * walls and modular concrete blocks.
 *
 * WHY THIS FILE EXISTS. The old barrier in track.js was a two-vertex-tall
 * double-sided strip with a *hand-faked constant normal* — every fragment of it
 * shaded identically, so at 11 degrees of sun it read as a strip of white tape
 * stapled round the circuit. Nothing about it changed with viewing angle, which
 * is exactly the cue the eye uses to decide "metal" vs "paper".
 *
 * The cure is not a texture, it is the CROSS-SECTION. A real W-beam is a
 * stamped 310 mm sheet with two crests, a bolted central rib and folded return
 * lips at top and bottom. Extruded with honest per-vertex normals it produces
 * four alternating bands — lit crest, shadowed trough, lit crest, shadowed
 * trough — that swim along the rail as you drive past. That single change is
 * worth more than every other detail here put together, and it costs ~11
 * vertices per station instead of 2.
 *
 * Everything else is there to stop the run reading as one extruded object:
 * sections that lap-splice at the posts, per-section weathering, painted
 * corner-entry panels, rubber scuffs, reflector studs, and posts sunk into a
 * small heap of disturbed soil.
 *
 * Conventions used throughout:
 *   `sign`   +1 / -1 — which side of the centreline this barrier run is on.
 *   `left`   frames[i].left, which sampleCurve() defines as (-tan.z, 0, tan.x)
 *            — i.e. tan x up, NOT up x tan. Getting this backwards flips every
 *            normal and every winding, so it is spelled out at each use.
 *   `d`      metres measured TOWARD THE ROAD from the barrier reference line.
 *            d = 0 is where the old flat strip sat, and the barrier physics
 *            wall (buildBarrierPhysics) stops cars at d = +0.25, so nothing
 *            here may stand proud of d = +0.25 or cars will clip into it.
 *   `y`      metres above the local ground.
 */
import * as THREE from 'three';
import { fractalNoise, smoothstep, makeNoiseTexture, makeTileable } from './noise.js';

// ---------------------------------------------------------------------------
// Geometry accumulator — one interleaved buffer per material, so a whole run of
// barrier (both sides of the circuit, every section, every paint panel) lands
// in a SINGLE draw call. Draw calls are the real budget here; triangles are not.
// ---------------------------------------------------------------------------

class GeoAcc {
  constructor() {
    this.pos = []; this.nor = []; this.uv = []; this.col = []; this.idx = [];
  }
  get count() { return this.pos.length / 3; }
  vert(px, py, pz, nx, ny, nz, u, v, r, g, b) {
    this.pos.push(px, py, pz);
    this.nor.push(nx, ny, nz);
    this.uv.push(u, v);
    this.col.push(r, g, b);
    return this.pos.length / 3 - 1;
  }
  tri(a, b, c) { this.idx.push(a, b, c); }
  build() {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.pos, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.nor, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(this.uv, 2));
    g.setAttribute('color', new THREE.Float32BufferAttribute(this.col, 3));
    g.setIndex(this.count > 65535
      ? new THREE.Uint32BufferAttribute(this.idx, 1)
      : new THREE.Uint16BufferAttribute(this.idx, 1));
    g.computeBoundingSphere();
    return g;
  }
}

// ---------------------------------------------------------------------------
// Arc-length path over the centreline frames.
//
// The frames are ~2.2 m apart on these circuits, which is fine for the road but
// useless for barrier work: W-beam sections are 4.3 m and posts stand every
// 4 m, and neither lines up with a frame index. Everything below is placed in
// METRES of arc so the barrier keeps real-world proportions on a 1.1 km alpine
// pass and a 1.35 km parkland GP alike.
// ---------------------------------------------------------------------------

function makePath(frames) {
  const n = frames.length;
  const cum = new Float64Array(n + 1);
  for (let i = 1; i <= n; i++) {
    cum[i] = cum[i - 1] + frames[i % n].pos.distanceTo(frames[i - 1].pos);
  }
  const total = cum[n];
  const segLen = (i) => cum[i + 1] - cum[i];

  // Signed curvature per frame (1/m). Positive = the same handedness the old
  // addTireStacks used for "crossY", so outside-of-corner is sign -1 there.
  const kappa = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    const a = frames[(i - 1 + n) % n].tan, b = frames[(i + 1) % n].tan;
    const cr = a.x * b.z - a.z * b.x;
    const dt = a.x * b.x + a.z * b.z;
    kappa[i] = Math.atan2(cr, dt) / Math.max(0.5, segLen((i - 1 + n) % n) + segLen(i));
  }

  function locate(s) {
    s = ((s % total) + total) % total;
    let lo = 0, hi = n;
    while (lo + 1 < hi) {
      const mid = (lo + hi) >> 1;
      if (cum[mid] <= s) lo = mid; else hi = mid;
    }
    return { i: lo, t: (s - cum[lo]) / Math.max(1e-6, cum[lo + 1] - cum[lo]) };
  }

  const out = { px: 0, pz: 0, tx: 0, tz: 0, lx: 0, lz: 0 };
  function at(s, o = out) {
    const { i, t } = locate(s);
    const a = frames[i], b = frames[(i + 1) % n];
    o.px = a.pos.x + (b.pos.x - a.pos.x) * t;
    o.pz = a.pos.z + (b.pos.z - a.pos.z) * t;
    let tx = a.tan.x + (b.tan.x - a.tan.x) * t;
    let tz = a.tan.z + (b.tan.z - a.tan.z) * t;
    let m = Math.hypot(tx, tz) || 1;
    o.tx = tx / m; o.tz = tz / m;
    // left is rebuilt from the interpolated tangent rather than lerped
    // separately: lerping two unit vectors and normalising each independently
    // lets them drift out of perpendicular on tight corners, which shears the
    // extruded profile.
    o.lx = -o.tz; o.lz = o.tx;
    return o;
  }

  function kappaAt(s) {
    const { i, t } = locate(s);
    return kappa[i] + (kappa[(i + 1) % n] - kappa[i]) * t;
  }

  return { total, at, kappaAt, frames };
}

/**
 * Contiguous stretches of real corner, in arc metres. Used to decide where the
 * painted panels, the rubber scuffs and the tyre walls go — all three belong to
 * corners, and scattering them evenly round the lap is exactly the
 * "procedural-looking" result the owner rejects.
 */
function findCorners(path, kThresh = 0.0080) {
  const STEP = 1.5;
  const N = Math.max(16, Math.round(path.total / STEP));
  const step = path.total / N;
  const k = new Float64Array(N);
  for (let i = 0; i < N; i++) k[i] = path.kappaAt(i * step);

  // Start scanning from a straight so a corner never gets cut at s = 0.
  let start = 0;
  for (let i = 0; i < N; i++) if (Math.abs(k[i]) <= kThresh) { start = i; break; }

  const corners = [];
  let run = null;
  for (let q = 0; q <= N; q++) {
    const i = (start + q) % N;
    const inside = q < N && Math.abs(k[i]) > kThresh;
    if (inside) {
      if (!run) run = { i0: q, peak: 0, peakQ: q, sum: 0 };
      const a = Math.abs(k[i]);
      run.sum += a;
      if (a > run.peak) { run.peak = a; run.peakQ = q; run.sgn = Math.sign(k[i]); }
    } else if (run) {
      const len = (q - run.i0) * step;
      if (len > 7) {
        // Entry is wrapped into [0, total); apex and exit are kept UNWRAPPED
        // relative to it, so `sExit - sApex` is always positive even for a
        // corner that straddles the start/finish line. Consumers wrap when
        // they sample.
        const sEntry = ((start + run.i0) % N) * step;
        corners.push({
          sEntry,
          sApex: sEntry + (run.peakQ - run.i0) * step,
          sExit: sEntry + len,
          len,
          peak: run.peak,
          // Outside of the corner, in the same handedness the legacy tyre-stack
          // placement used.
          outSign: run.sgn > 0 ? -1 : +1,
        });
      }
      run = null;
    }
  }
  corners.sort((a, b) => b.peak - a.peak);
  return corners;
}

/** Wrap an arc coordinate into [0, total). */
function wrapS(s, total) { return ((s % total) + total) % total; }

/** Shortest distance between two arc coordinates on a closed lap. */
function arcDist(a, b, total) {
  const d = Math.abs(wrapS(a, total) - wrapS(b, total));
  return Math.min(d, total - d);
}

/**
 * Zone lookup on a closed lap: zones are stored as (centre, half-length) so a
 * zone that straddles the start/finish line needs no special case. Storing
 * them as [s0, s1] and patching the wrap is where this kind of code always
 * goes wrong.
 */
function makeZoneLookup(zones, total) {
  return (sign, s) => {
    for (const z of zones) {
      if (z.sign !== sign) continue;
      if (arcDist(z.centre, s, total) <= z.half) return z;
    }
    return null;
  };
}

// ---------------------------------------------------------------------------
// Cross-section machinery.
//
// A profile is a polyline in (d, y). Its outward normal is (dy, -dd) — which
// works for both an open sheet (the W-beam) and a closed solid (the concrete
// block) as long as the points are listed so the material stays on the same
// hand. Points whose two edge normals differ by more than `smoothDeg` are
// SPLIT into two vertices, so the folded lips of a stamped sheet stay crisp
// while the pressed crest radii still shade smoothly. That mix is what makes it
// read as bent steel rather than as a chamfered extrusion.
// ---------------------------------------------------------------------------

function prepareProfile(pts, smoothDeg = 58) {
  const m = pts.length;
  const e = [];
  for (let k = 0; k < m - 1; k++) {
    const dd = pts[k + 1][0] - pts[k][0];
    const dy = pts[k + 1][1] - pts[k][1];
    const len = Math.hypot(dd, dy) || 1e-6;
    e.push([dy / len, -dd / len, len]);
  }
  // Cumulative length for the u coordinate.
  const cu = [0];
  for (let k = 0; k < m - 1; k++) cu.push(cu[k] + e[k][2]);
  const totalU = cu[m - 1] || 1;

  const cosLim = Math.cos(smoothDeg * Math.PI / 180);
  const smooth = new Array(m).fill(false);
  for (let k = 1; k < m - 1; k++) {
    smooth[k] = (e[k - 1][0] * e[k][0] + e[k - 1][1] * e[k][1]) > cosLim;
  }

  const V = { d: [], y: [], nd: [], ny: [], u: [], row: [] };
  const push = (k, nd, ny) => {
    const L = Math.hypot(nd, ny) || 1;
    V.d.push(pts[k][0]); V.y.push(pts[k][1]);
    V.nd.push(nd / L); V.ny.push(ny / L);
    V.u.push(cu[k] / totalU); V.row.push(k);
    return V.d.length - 1;
  };

  const vLow = [], vHigh = [];
  let carried = -1;
  for (let k = 0; k < m - 1; k++) {
    const lo = (k > 0 && smooth[k]) ? carried : push(k, e[k][0], e[k][1]);
    const hi = (k < m - 2 && smooth[k + 1])
      ? push(k + 1, e[k][0] + e[k + 1][0], e[k][1] + e[k + 1][1])
      : push(k + 1, e[k][0], e[k][1]);
    carried = hi;
    vLow.push(lo); vHigh.push(hi);
  }
  return { V, vLow, vHigh, nEdge: m - 1, pts };
}

/**
 * Extrude a prepared profile along a list of stations.
 *
 * station = { px, pz, ix, iz, gy, s, dOff }  — position, unit inward vector
 * (toward the road), local ground height, arc metres, and a lateral shift used
 * for the lap-splice step.
 *
 * WINDING (this is the trap ROUTINE.md keeps flagging): with left defined as
 * tan x up, d(pos)/d(along) x d(pos)/d(profile) = +left. The face must point
 * inward = -sign * left, so the winding is reversed for the sign = +1 side.
 */
function extrudeStrip(acc, prof, stations, sign, colourFn, vScale = 1) {
  const { V, vLow, vHigh, nEdge } = prof;
  const nv = V.d.length;
  const flip = sign > 0;
  const base = acc.count;
  const col = [0, 0, 0];

  for (let j = 0; j < stations.length; j++) {
    const st = stations[j];
    const dOff = st.dOff || 0;
    for (let v = 0; v < nv; v++) {
      const d = V.d[v] + dOff;
      const px = st.px + st.ix * d;
      const pz = st.pz + st.iz * d;
      const py = st.gy + V.y[v];
      const nd = V.nd[v], ny = V.ny[v];
      colourFn(st, V.row[v], V.d[v], V.y[v], col);
      acc.vert(px, py, pz, st.ix * nd, ny, st.iz * nd,
        V.u[v], st.s * vScale, col[0], col[1], col[2]);
    }
  }
  for (let j = 0; j < stations.length - 1; j++) {
    const r0 = base + j * nv, r1 = base + (j + 1) * nv;
    for (let k = 0; k < nEdge; k++) {
      const A = r0 + vLow[k], B = r0 + vHigh[k];
      const C = r1 + vLow[k], D = r1 + vHigh[k];
      if (flip) { acc.tri(A, B, C); acc.tri(C, B, D); }
      else { acc.tri(A, C, B); acc.tri(C, D, B); }
    }
  }
  return base;
}

/**
 * Flat end cap for a solid extrusion (the concrete blocks butt-joint every few
 * metres, so their ends are genuinely visible through the gap).
 * In (d, y) space a CCW triangle has world normal +sign * tangent.
 */
function capPolygon(acc, poly, tris, st, sign, facing, colourFn) {
  const nv = poly.length;
  const base = acc.count;
  const col = [0, 0, 0];
  const nx = st.tx * facing, nz = st.tz * facing;
  for (let v = 0; v < nv; v++) {
    const d = poly[v][0] + (st.dOff || 0);
    colourFn(st, -1, poly[v][0], poly[v][1], col);
    acc.vert(st.px + st.ix * d, st.gy + poly[v][1], st.pz + st.iz * d,
      nx, 0, nz, 0.5, st.s, col[0], col[1], col[2]);
  }
  // CCW gives +tangent when sign > 0; we want `facing` x tangent.
  const ccw = (sign > 0) === (facing > 0);
  for (const t of tris) {
    if (ccw) acc.tri(base + t[0], base + t[1], base + t[2]);
    else acc.tri(base + t[2], base + t[1], base + t[0]);
  }
}

function triangulateProfile(pts) {
  // Normalise to CCW (positive signed area) so capPolygon's winding rule holds.
  let A = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length];
    A += a[0] * b[1] - b[0] * a[1];
  }
  const poly = A < 0 ? pts.slice().reverse() : pts.slice();
  const contour = poly.map((p) => new THREE.Vector2(p[0], p[1]));
  const tris = THREE.ShapeUtils.triangulateShape(contour, []);
  return { poly, tris };
}

/**
 * Vertical prism from a closed (x, z) outline — posts, spacer blocks, plates.
 * Outward normal for an edge of a positive-area outline is (dz, 0, -dx).
 */
function prismInto(acc, outline, y0, y1, colour, capColour) {
  let A = 0;
  for (let i = 0; i < outline.length; i++) {
    const a = outline[i], b = outline[(i + 1) % outline.length];
    A += a[0] * b[1] - b[0] * a[1];
  }
  const o = A > 0 ? outline : outline.slice().reverse();
  const n = o.length;
  const base = acc.count;
  for (let i = 0; i < n; i++) {
    const p = o[i], q = o[(i + 1) % n];
    const dx = q[0] - p[0], dz = q[1] - p[1];
    const L = Math.hypot(dx, dz) || 1;
    const nx = dz / L, nz = -dx / L;
    const u0 = i / n, u1 = (i + 1) / n;
    const a = acc.vert(p[0], y0, p[1], nx, 0, nz, u0, 0, ...colour);
    const b = acc.vert(p[0], y1, p[1], nx, 0, nz, u0, 1, ...colour);
    const c = acc.vert(q[0], y0, q[1], nx, 0, nz, u1, 0, ...colour);
    const d = acc.vert(q[0], y1, q[1], nx, 0, nz, u1, 1, ...colour);
    acc.tri(a, b, c); acc.tri(c, b, d);
  }
  // Top cap: a fan from the centroid, wound for +Y.
  let cx = 0, cz = 0;
  for (const p of o) { cx += p[0]; cz += p[1]; }
  cx /= n; cz /= n;
  const cc = capColour || colour;
  const cIdx = acc.vert(cx, y1, cz, 0, 1, 0, 0.5, 0.5, ...cc);
  const ring = [];
  for (const p of o) ring.push(acc.vert(p[0], y1, p[1], 0, 1, 0, 0.5, 0.5, ...cc));
  for (let i = 0; i < n; i++) acc.tri(cIdx, ring[(i + 1) % n], ring[i]);
  return base;
}

/** Shallow domed fan — bolt bosses, tie-down pockets, soil heaps. */
function domeInto(acc, cx, cy, cz, radius, rise, seg, colour, rimColour, axis = 'y') {
  const rim = rimColour || colour;
  const centre = axis === 'y'
    ? acc.vert(cx, cy + rise, cz, 0, 1, 0, 0.5, 0.5, ...colour)
    : acc.vert(cx, cy, cz + rise, 0, 0, 1, 0.5, 0.5, ...colour);
  const ring = [];
  for (let i = 0; i < seg; i++) {
    const a = (i / seg) * Math.PI * 2;
    const ox = Math.cos(a) * radius, oy = Math.sin(a) * radius;
    if (axis === 'y') {
      const nl = Math.hypot(ox, rise * 2, oy) || 1;
      ring.push(acc.vert(cx + ox, cy, cz + oy, ox / nl, (rise * 2) / nl, oy / nl,
        0.5, 0.5, ...rim));
    } else {
      const nl = Math.hypot(ox, oy, rise * 2) || 1;
      ring.push(acc.vert(cx + ox, cy + oy, cz, ox / nl, oy / nl, (rise * 2) / nl,
        0.5, 0.5, ...rim));
    }
  }
  const up = axis === 'y';
  for (let i = 0; i < seg; i++) {
    const a = ring[i], b = ring[(i + 1) % seg];
    if (up) acc.tri(centre, b, a); else acc.tri(centre, a, b);
  }
}

// ---------------------------------------------------------------------------
// Textures
// ---------------------------------------------------------------------------

// NOTE: these are built fresh on every call, never cached in a module-level
// singleton. track.js's disposeObject3D() walks every material and disposes
// every texture it finds when the player switches circuits — a shared cached
// texture would come back disposed (and render black) on the second load.

function steelTexture() {
  // Hot-dip galvanised sheet: a spangle of crystal facets, faint roll marks
  // running the length of the rail (v), and a dirt gradient up from the bottom
  // edge (u = 0 is the bottom lip, u = 1 the top lip).
  const fn = makeTileable((u, v) => {
    const spangle = fractalNoise(u * 9.3, v * 9.3, 3);
    const crystal = Math.abs(fractalNoise(u * 22 + 4.2, v * 22 - 1.1, 2) - 0.5) * 2;
    const roll = fractalNoise(u * 26 + 11, v * 2.1, 2);
    let g = 0.62 + (spangle - 0.5) * 0.20 + (crystal - 0.5) * 0.10 + (roll - 0.5) * 0.07;
    // Road spray climbs the lower third and never quite washes off.
    const grime = smoothstep(0.34, 0.02, u) * (0.35 + fractalNoise(u * 7, v * 7, 3) * 0.5);
    const r = g * (1 - grime * 0.30) + grime * 0.055;
    const gg = g * (1 - grime * 0.32) + grime * 0.048;
    const b = g * (1 - grime * 0.36) + grime * 0.040;
    // A whisper of rust bloom where the sheet has been chipped.
    const rust = Math.max(0, fractalNoise(u * 5.5 - 3, v * 5.5 + 8, 3) - 0.70) * 2.2;
    return [r + rust * 0.20, gg + rust * 0.07, b - rust * 0.04];
  }, 0.18);
  const tex = makeNoiseTexture(128, fn);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function concreteTexture() {
  const fn = makeTileable((u, v) => {
    const agg = fractalNoise(u * 30, v * 30, 3);
    const blotch = fractalNoise(u * 4.4 + 7, v * 4.4 - 2, 4);
    const pour = fractalNoise(u * 2.1 - 5, v * 11 + 3, 2);   // form-board lines
    let g = 0.74 + (agg - 0.5) * 0.13 + (blotch - 0.5) * 0.14 + (pour - 0.5) * 0.05;
    // Pinhole voids from the shutter.
    const hole = Math.max(0, fractalNoise(u * 46 + 13, v * 46 - 6, 2) - 0.76) * 3.0;
    g -= hole * 0.22;
    return [g * 1.005, g * 0.995, g * 0.965];
  }, 0.16);
  const tex = makeNoiseTexture(128, fn);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ---------------------------------------------------------------------------
// Style tables
// ---------------------------------------------------------------------------

// Racing Armco: 310 mm W-beam, crest at d = 0 so the visible face sits exactly
// where the old flat strip did (and 0.25 m behind the physics wall).
const W_BEAM = [
  [-0.040, 0.440],   // bottom return lip, folded back
  [-0.008, 0.466],
  [0.000, 0.494],   // lower crest
  [0.000, 0.526],
  [-0.040, 0.562],
  [-0.075, 0.595],   // central rib — this is what bolts to the post
  [-0.040, 0.628],
  [0.000, 0.664],   // upper crest
  [0.000, 0.696],
  [-0.008, 0.724],
  [-0.040, 0.750],   // top return lip
];

const STYLES = {
  armco: {
    beam: W_BEAM,
    yLift: 0.0,
    sectionLen: 4.60,     // one W-beam panel between posts
    lap: 0.30,            // downstream panel laps over the upstream one
    sheet: 0.0034,        // sheet thickness — the step you see at the splice
    postTop: 0.795,
    postSink: 0.34,
    post: 'sigma',
    paint: true,
    scuff: true,
    reflectorEvery: 2,
    reflectorY: 0.815,
    railColour: [0.86, 0.88, 0.90],
    postColour: [0.40, 0.42, 0.45],
  },
  // Alpine pass: a rural crash barrier, not race furniture. Same pressed beam
  // (they really are the same stamping) but mounted higher on creosoted timber
  // posts with a spacer block, no race paint, and delineator studs on every
  // post because that is what a mountain road at dusk actually looks like.
  guardrail: {
    beam: W_BEAM,
    yLift: 0.115,
    sectionLen: 4.00,
    lap: 0.26,
    sheet: 0.0034,
    postTop: 0.955,
    postSink: 0.42,
    post: 'timber',
    paint: false,
    scuff: false,
    reflectorEvery: 1,
    reflectorY: 0.975,
    railColour: [0.92, 0.93, 0.93],
    postColour: [0.34, 0.26, 0.19],
  },
};

// Painted corner-entry panels. Real circuits use whatever the local federation
// mandates, so alternate two schemes round the lap rather than stamping one.
const PAINT_SCHEMES = [
  [[0.72, 0.09, 0.10], [0.90, 0.89, 0.86]],   // red / white
  [[0.10, 0.24, 0.62], [0.88, 0.78, 0.10]],   // blue / yellow
];

// ---------------------------------------------------------------------------
// ARMCO / GUARDRAIL
// ---------------------------------------------------------------------------

/**
 * @param {THREE.Object3D} scene  parent group
 * @param {Array} frames          centreline frames
 * @param {number} offset         lateral offset of the barrier line (m)
 * @param {object} opts           { style: 'armco'|'guardrail', terrain }
 */
export function addArmco(scene, frames, offset, opts = {}) {
  const S = STYLES[opts.style === 'guardrail' ? 'guardrail' : 'armco'];
  const terrain = opts.terrain || null;
  const groundAt = terrain
    ? (x, z) => terrain.height(x, z)
    : () => 0;

  const path = makePath(frames);
  const corners = findCorners(path);

  // ---- Where the special-case detail goes -------------------------------
  // Painted panels: the entry to the fastest few corners, on the OUTSIDE only,
  // starting well before turn-in. Deliberately not every corner.
  const paintZones = [];
  if (S.paint) {
    const wanted = Math.min(corners.length, 2 + Math.floor(corners.length * 0.35));
    for (let c = 0; c < wanted; c++) {
      const cn = corners[c];
      const before = 22 + Math.random() * 16;
      const after = 5 + Math.random() * 7;
      paintZones.push({
        sign: cn.outSign,
        centre: wrapS(cn.sEntry + (after - before) * 0.5, path.total),
        half: (before + after) * 0.5,
        scheme: PAINT_SCHEMES[c % PAINT_SCHEMES.length],
      });
    }
  }
  const zoneAt = makeZoneLookup(paintZones, path.total);
  const paintAt = (sign, s) => {
    const z = zoneAt(sign, s);
    return z ? z.scheme : null;
  };

  // Rubber and paint transfer: cars brush the rail on corner EXIT, and on the
  // odd straight where somebody got it wrong. Never uniform.
  const scuffs = [];
  if (S.scuff) {
    for (const cn of corners) {
      if (Math.random() > 0.62) continue;
      scuffs.push({
        sign: cn.outSign,
        centre: wrapS(cn.sApex + (cn.sExit - cn.sApex) * (0.3 + Math.random() * 0.8),
          path.total),
        half: 1.1 + Math.random() * 2.0,
        depth: 0.35 + Math.random() * 0.45,
      });
    }
    const strays = 1 + Math.floor(Math.random() * 3);
    for (let i = 0; i < strays; i++) {
      scuffs.push({
        sign: Math.random() < 0.5 ? 1 : -1,
        centre: Math.random() * path.total,
        half: 0.8 + Math.random() * 1.4,
        depth: 0.25 + Math.random() * 0.35,
      });
    }
  }
  const scuffAt = (sign, s) => {
    let m = 0;
    for (const k of scuffs) {
      if (k.sign !== sign) continue;
      const dd = arcDist(k.centre, s, path.total);
      if (dd < k.half) m = Math.max(m, k.depth * (1 - smoothstep(0, 1, dd / k.half)));
    }
    return m;
  };

  // ---- Rail ------------------------------------------------------------
  const beam = S.beam.map(([d, y]) => [d, y + S.yLift]);
  const prof = prepareProfile(beam);
  const rail = new GeoAcc();

  const nSec = Math.max(8, Math.round(path.total / S.sectionLen));
  const secLen = path.total / nSec;
  const postStations = [];   // {s, sign} — one post per splice

  const p = { px: 0, pz: 0, tx: 0, tz: 0, lx: 0, lz: 0 };
  const col = [0, 0, 0];

  for (const sign of [+1, -1]) {
    for (let k = 0; k < nSec; k++) {
      const s0 = k * secLen;
      const scheme = paintAt(sign, s0 + secLen * 0.5);
      // Alternate sections step out by one sheet thickness: that is what a lap
      // splice IS, and the 3.4 mm step throws a hard little shadow line at
      // every post under an 11-degree sun.
      const dOff = (k & 1) ? S.sheet : 0;
      // Per-section weathering. Panels are replaced piecemeal after shunts, so
      // no two neighbours have quite the same tone.
      const wash = 0.90 + fractalNoise(s0 * 0.031 + (sign > 0 ? 0 : 51.7), 3.3, 3) * 0.22;
      const chip = Math.max(0, fractalNoise(s0 * 0.17 + 9.1, sign * 2.7, 2) - 0.63) * 1.4;

      // A painted panel is split into three sub-runs so the colour alternates
      // roughly every 1.5 m — vertex colours can only be crisp at a run break.
      const subs = scheme ? 3 : 1;
      for (let sub = 0; sub < subs; sub++) {
        const a = s0 + (secLen * sub) / subs;
        const b = s0 + (secLen * (sub + 1)) / subs + (sub === subs - 1 ? S.lap : 0);
        const mid = (a + b) * 0.5;
        const tight = Math.abs(path.kappaAt(mid)) > 0.020;
        const nRing = Math.max(2, Math.round((b - a) / (tight ? 1.15 : 2.30)) + 1);
        const paintCol = scheme ? scheme[(k + sub) & 1] : null;

        const stations = [];
        for (let r = 0; r < nRing; r++) {
          const s = a + ((b - a) * r) / (nRing - 1);
          path.at(s, p);
          const bx = p.px + p.lx * offset * sign;
          const bz = p.pz + p.lz * offset * sign;
          stations.push({
            px: bx, pz: bz,
            ix: -sign * p.lx, iz: -sign * p.lz,
            tx: p.tx, tz: p.tz,
            gy: groundAt(bx, bz),
            s, dOff,
            wash, chip, paint: paintCol,
            scuff: scuffAt(sign, s),
          });
        }

        extrudeStrip(rail, prof, stations, sign, (st, row, d, y, out) => {
          let r, g, bl;
          if (st.paint) {
            r = st.paint[0]; g = st.paint[1]; bl = st.paint[2];
            // paint fades and chalks on the crests that catch the weather
            const chalk = 0.86 + 0.20 * (d + 0.075) / 0.075;
            r *= chalk; g *= chalk; bl *= chalk;
          } else {
            r = S.railColour[0]; g = S.railColour[1]; bl = S.railColour[2];
          }
          // Baked cavity shading across the corrugation. The GTAO pass's 0.6 m
          // radius cannot resolve a 75 mm trough, so the trough is darkened
          // here — this is half of why the profile reads at speed. The floor
          // stays at 0.66 because at 11 degrees of sun the shaded side of the
          // circuit is already living off ambient, and a darker albedo there
          // crushes the whole rail to black.
          const cav = 0.66 + 0.34 * ((d + 0.075) / 0.075);
          const f = st.wash * cav;
          r *= f; g *= f; bl *= f;
          // Chipped galvanising goes warm-brown, not grey.
          if (st.chip > 0) {
            const t = st.chip * (0.35 + 0.65 * (d + 0.075) / 0.075);
            r += t * 0.10; g -= t * 0.03; bl -= t * 0.06;
          }
          // Rubber only ever lands on the two crests that stand proud.
          if (st.scuff > 0 && d > -0.02) {
            const t = st.scuff;
            r *= 1 - t * 0.80; g *= 1 - t * 0.82; bl *= 1 - t * 0.80;
          }
          out[0] = r; out[1] = g; out[2] = bl;
        }, 1 / 2.4);
      }

      postStations.push({ s: s0, sign, k });
    }
  }

  const railTex = steelTexture();
  railTex.repeat.set(1, 1);
  const railMat = new THREE.MeshStandardMaterial({
    map: railTex,
    vertexColors: true,
    roughness: 0.55,
    metalness: 0.38,
    envMapIntensity: 0.85,
    // A W-beam is a 3 mm sheet: you genuinely see the back of it from the
    // outside of the circuit, and the analytic normals stay correct because
    // three flips them for back faces.
    side: THREE.DoubleSide,
  });
  const railMesh = new THREE.Mesh(rail.build(), railMat);
  railMesh.castShadow = true;
  railMesh.receiveShadow = true;
  railMesh.name = 'barrier-rail';
  scene.add(railMesh);

  // ---- Posts -----------------------------------------------------------
  const postGeo = S.post === 'timber'
    ? buildTimberPostGeometry(S)
    : buildSigmaPostGeometry(S);
  const postMat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: S.post === 'timber' ? 0.92 : 0.70,
    metalness: S.post === 'timber' ? 0.0 : 0.42,
    envMapIntensity: 0.6,
  });
  const posts = new THREE.InstancedMesh(postGeo, postMat, postStations.length);
  posts.castShadow = true;
  posts.receiveShadow = true;
  posts.name = 'barrier-posts';

  const m4 = new THREE.Matrix4();
  const quat = new THREE.Quaternion();
  const scl = new THREE.Vector3(1, 1, 1);
  const pos3 = new THREE.Vector3();
  const up3 = new THREE.Vector3(0, 1, 0);
  const tint = new THREE.Color();
  const soil = new GeoAcc();
  const studs = [];

  for (let i = 0; i < postStations.length; i++) {
    const { s, sign, k } = postStations[i];
    path.at(s, p);
    const ix = -sign * p.lx, iz = -sign * p.lz;
    // The post face stands 3 mm behind the rail rib so the two never coincide.
    const back = -(0.075 + 0.003);
    const bx = p.px + p.lx * offset * sign + ix * back;
    const bz = p.pz + p.lz * offset * sign + iz * back;
    const gy = groundAt(bx, bz);
    pos3.set(bx, gy, bz);
    // Local +z is inward (toward the road); yaw = atan2 of that vector.
    quat.setFromAxisAngle(up3, Math.atan2(ix, iz));
    // Posts are driven, not planted: a degree or two of lean and a few
    // millimetres of height either way kills the ruler-straight CG look.
    const lean = (Math.random() - 0.5) * 0.030;
    const leanQ = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(Math.cos(Math.random() * 6.28), 0, Math.sin(Math.random() * 6.28)), lean);
    quat.multiply(leanQ);
    scl.set(1, 0.985 + Math.random() * 0.035, 1);
    m4.compose(pos3, quat, scl);
    posts.setMatrixAt(i, m4);
    const v = 0.82 + Math.random() * 0.30;
    tint.setRGB(S.postColour[0] * v, S.postColour[1] * v, S.postColour[2] * v);
    posts.setColorAt(i, tint);

    // Disturbed ground round the foot — a small heap of spoil that never got
    // raked flat. Cheap (8 tris) and it stops the post looking pushed through
    // a sheet of paper.
    if (Math.random() < 0.55) {
      const rr = 0.20 + Math.random() * 0.14;
      const dark = 0.55 + Math.random() * 0.25;
      domeInto(soil, bx, gy + 0.008, bz, rr, 0.035 + Math.random() * 0.03, 7,
        [0.20 * dark, 0.16 * dark, 0.115 * dark],
        [0.34 * dark, 0.30 * dark, 0.22 * dark]);
    }

    if (k % S.reflectorEvery === 0) studs.push({ bx, bz, gy, ix, iz, sign });
  }
  posts.instanceMatrix.needsUpdate = true;
  if (posts.instanceColor) posts.instanceColor.needsUpdate = true;
  scene.add(posts);

  if (soil.count > 0) {
    const soilMat = new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 1.0, metalness: 0, envMapIntensity: 0.35,
    });
    const soilMesh = new THREE.Mesh(soil.build(), soilMat);
    soilMesh.receiveShadow = true;
    soilMesh.name = 'barrier-post-spoil';
    scene.add(soilMesh);
  }

  // ---- Reflector studs -------------------------------------------------
  if (studs.length) {
    const studGeo = new THREE.PlaneGeometry(0.058, 0.086);
    const studMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.20, metalness: 0.0,
      emissive: 0xffffff, emissiveIntensity: 0.16,
      envMapIntensity: 1.4,
    });
    const inst = new THREE.InstancedMesh(studGeo, studMat, studs.length);
    inst.name = 'barrier-reflectors';
    const c = new THREE.Color();
    for (let i = 0; i < studs.length; i++) {
      const st = studs[i];
      pos3.set(st.bx + st.ix * 0.012, st.gy + S.reflectorY, st.bz + st.iz * 0.012);
      quat.setFromAxisAngle(up3, Math.atan2(st.ix, st.iz));
      scl.set(1, 1, 1);
      m4.compose(pos3, quat, scl);
      inst.setMatrixAt(i, m4);
      // Right-hand side of the direction of travel reads white, left red —
      // the same convention every road in Europe uses.
      if (S.post === 'timber') c.setRGB(st.sign > 0 ? 0.95 : 0.85, st.sign > 0 ? 0.92 : 0.12, st.sign > 0 ? 0.78 : 0.10);
      else c.setRGB(0.95, 0.86, 0.35);
      inst.setColorAt(i, c);
    }
    inst.instanceMatrix.needsUpdate = true;
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
    scene.add(inst);
  }
}

/**
 * Sigma post: the 100 x 55 mm cold-rolled section every racing Armco stands on.
 * The step in the web is what tells you it is a rolled channel and not a box —
 * it puts a second shadow line down the post at low sun.
 */
function buildSigmaPostGeometry(S) {
  const acc = new GeoAcc();
  const c = [0.55, 0.57, 0.60];
  const outline = [
    [-0.055, 0.000], [0.055, 0.000],
    [0.055, -0.042], [0.027, -0.042],
    [0.027, -0.104], [-0.027, -0.104],
    [-0.027, -0.042], [-0.055, -0.042],
  ];
  prismInto(acc, outline, -S.postSink, S.postTop, c, [0.44, 0.46, 0.48]);
  // Bolt boss where the rail's central rib is through-bolted. The rib sits at
  // d = -0.075 and the post face at -0.078, so the head stands ~40 mm proud.
  domeInto(acc, 0, 0.595 + S.yLift, 0.043, 0.033, 0.016, 6,
    [0.72, 0.73, 0.74], [0.46, 0.47, 0.49], 'z');
  return acc.build();
}

/** Alpine timber post + spacer block: creosoted round stock, not a race part. */
function buildTimberPostGeometry(S) {
  const acc = new GeoAcc();
  const wood = [0.62, 0.50, 0.37];
  const ring = [];
  const SEG = 9;
  for (let i = 0; i < SEG; i++) {
    const a = (i / SEG) * Math.PI * 2 + 0.2;
    ring.push([Math.cos(a) * 0.078, Math.sin(a) * 0.078]);
  }
  prismInto(acc, ring, -S.postSink, S.postTop, wood, [0.74, 0.60, 0.44]);
  // Spacer block holding the beam off the post — the detail that makes a rural
  // guardrail read differently from race Armco at a glance.
  const rib = 0.595 + S.yLift;
  prismInto(acc, [
    [-0.052, 0.055], [0.052, 0.055], [0.052, 0.135], [-0.052, 0.135],
  ], rib - 0.085, rib + 0.085, [0.50, 0.40, 0.30], [0.56, 0.45, 0.34]);
  domeInto(acc, 0, rib, 0.146, 0.030, 0.014, 6,
    [0.70, 0.70, 0.70], [0.42, 0.42, 0.44], 'z');
  return acc.build();
}

// ---------------------------------------------------------------------------
// TYRE WALLS
// ---------------------------------------------------------------------------

/**
 * @param {THREE.Object3D} scene
 * @param {Array} frames
 * @param {Array<number>} curvature  per-frame 1 - dot(t_i, t_i+1), smoothed
 * @param {number} offset            lateral centre of the tyre wall (m)
 */
export function addTireStacks(scene, frames, curvature, offset) {
  const path = makePath(frames);
  const corners = findCorners(path, 0.0090);
  if (!corners.length) return;

  // Real circuits put a tyre wall where the run-off runs out, not at every
  // corner: take the handful of tightest ones and space them along the lap.
  const MAX_WALLS = 5;
  const chosen = [];
  for (const cn of corners) {
    if (chosen.length >= MAX_WALLS) break;
    let clash = false;
    for (const c of chosen) {
      let dd = Math.abs(c.sApex - cn.sApex);
      if (dd > path.total / 2) dd = path.total - dd;
      if (dd < 60) { clash = true; break; }
    }
    if (!clash) chosen.push(cn);
  }
  if (!chosen.length) return;

  const R_OUT = 0.350, R_BORE = 0.170, H = 0.255, PITCH = 0.243;
  const tyreGeo = buildTyreGeometry(R_OUT, R_BORE, H, 9);

  // Lay out every tyre first so the InstancedMesh is sized exactly.
  const tyres = [];
  const straps = new GeoAcc();
  const p = { px: 0, pz: 0, tx: 0, tz: 0, lx: 0, lz: 0 };

  for (let w = 0; w < chosen.length; w++) {
    const cn = chosen[w];
    const sign = cn.outSign;
    const cols = 6 + Math.floor(Math.random() * 5);          // stacks along the wall
    const pitchAlong = 0.76;
    const wallLen = (cols - 1) * pitchAlong;
    // Centre the wall a little past the apex — that is where cars actually
    // arrive — and vary which side of the apex, never dead centre.
    const sMid = cn.sApex + (Math.random() - 0.35) * Math.max(6, cn.len * 0.5);
    // Height profile: full height in the middle, tapering to two tyres at the
    // ends so the wall has a real silhouette instead of a rectangular block.
    const peak = 3 + (Math.random() < 0.45 ? 1 : 0);
    const heights = [];
    for (let c = 0; c < cols; c++) {
      const t = 1 - Math.abs((c - (cols - 1) / 2) / ((cols - 1) / 2 || 1));
      let h = Math.round(2 + (peak - 2) * smoothstep(0.05, 0.75, t));
      if (Math.random() < 0.18) h += (Math.random() < 0.5 ? -1 : 1);
      heights.push(Math.max(2, Math.min(peak + 1, h)));
    }
    // Depth: mostly one row deep, doubled over the middle third where it counts.
    const deepFrom = Math.floor(cols * 0.30), deepTo = Math.ceil(cols * 0.70);
    const twoDeep = Math.random() < 0.7;

    const topPts = [];
    for (let c = 0; c < cols; c++) {
      const along = -wallLen / 2 + c * pitchAlong;
      path.at(sMid + along, p);
      const bx = p.px + p.lx * offset * sign;
      const bz = p.pz + p.lz * offset * sign;
      const ix = -sign * p.lx, iz = -sign * p.lz;
      const rows = (twoDeep && c >= deepFrom && c < deepTo) ? 2 : 1;
      for (let row = 0; row < rows; row++) {
        // Row 0 faces the road; a second row backs it toward the barrier.
        const depth = rows === 1 ? 0 : (row === 0 ? 0.36 : -0.36);
        const jx = (Math.random() - 0.5) * 0.055;
        const jz = (Math.random() - 0.5) * 0.055;
        const stackH = Math.max(2, heights[c] - row);
        for (let h = 0; h < stackH; h++) {
          tyres.push({
            x: bx + ix * depth + jx,
            y: 0.02 + h * PITCH,
            z: bz + iz * depth + jz,
            yaw: Math.random() * Math.PI * 2,
            tilt: (Math.random() - 0.5) * 0.05,
            // Banded rows: whole tyres get painted, which is exactly how the
            // white stripes on a real tyre wall are made.
            paint: (h === 1 && ((c + w) % 3 === 0)) || (h === stackH - 1 && (c % 4 === 1)),
            grime: 0.80 + Math.random() * 0.30,
          });
        }
        if (row === 0) {
          topPts.push({
            x: bx + ix * depth, z: bz + iz * depth,
            ix, iz, tx: p.tx, tz: p.tz,
            top: 0.02 + (stackH - 1) * PITCH + H * 0.5,
            s: sMid + along,
          });
        }
      }
    }
    buildCoverStrap(straps, topPts, R_OUT);
  }

  if (!tyres.length) return;

  const tyreMat = new THREE.MeshStandardMaterial({
    vertexColors: true, roughness: 0.94, metalness: 0.0, envMapIntensity: 0.35,
  });
  const inst = new THREE.InstancedMesh(tyreGeo, tyreMat, tyres.length);
  inst.castShadow = true;
  inst.receiveShadow = true;
  inst.name = 'tyre-wall';
  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const q2 = new THREE.Quaternion();
  const pos = new THREE.Vector3();
  const scl = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);
  const col = new THREE.Color();
  for (let i = 0; i < tyres.length; i++) {
    const t = tyres[i];
    pos.set(t.x, t.y, t.z);
    q.setFromAxisAngle(up, t.yaw);
    q2.setFromAxisAngle(new THREE.Vector3(1, 0, 0), t.tilt);
    q.multiply(q2);
    // Tyres in a wall are squashed by the ones above and never all the same
    // size — a stack of identical cylinders is the giveaway.
    scl.set(0.96 + Math.random() * 0.09, 0.93 + Math.random() * 0.10, 0.96 + Math.random() * 0.09);
    m4.compose(pos, q, scl);
    inst.setMatrixAt(i, m4);
    if (t.paint) {
      const w = 0.72 + Math.random() * 0.16;
      col.setRGB(w, w * 0.99, w * 0.94);
    } else {
      const g = t.grime * 0.30;
      col.setRGB(g, g * 0.99, g * 1.0);
    }
    inst.setColorAt(i, col);
  }
  inst.instanceMatrix.needsUpdate = true;
  if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
  scene.add(inst);

  if (straps.count > 0) {
    const strapMat = new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0.88, metalness: 0.0,
      envMapIntensity: 0.4, side: THREE.DoubleSide,
    });
    const strapMesh = new THREE.Mesh(straps.build(), strapMat);
    strapMesh.castShadow = true;
    strapMesh.receiveShadow = true;
    strapMesh.name = 'tyre-wall-belt';
    scene.add(strapMesh);
  }
}

/**
 * One tyre, axis vertical (tyre walls are stacks of tyres lying FLAT, bolted
 * through — the old code stood them up like wheels). Three rings on the outer
 * surface so the sidewall bulges; a straight cylinder reads as a tin can.
 */
function buildTyreGeometry(rOut, rBore, h, seg) {
  const acc = new GeoAcc();
  const rEdge = rOut * 0.915;
  const y0 = -h / 2, y1 = h / 2;
  const dark = [0.55, 0.55, 0.56];       // multiplied by instanceColor
  const crown = [1.0, 1.0, 1.0];
  const bore = [0.24, 0.24, 0.25];

  const ang = (i) => (i / seg) * Math.PI * 2;
  const outer = [];
  for (let i = 0; i < seg; i++) {
    const a = ang(i), ca = Math.cos(a), sa = Math.sin(a);
    outer.push([ca, sa]);
  }

  // Outer sidewall: bottom edge -> crown -> top edge.
  const bands = [
    [y0, rEdge, 0, -0.55, dark],
    [0, rOut, 0, 0, crown],
    [y1, rEdge, 0, 0.55, dark],
  ];
  const rings = bands.map((b) => {
    const idx = [];
    for (let i = 0; i < seg; i++) {
      const [ca, sa] = outer[i];
      const nl = Math.hypot(ca, b[3], sa) || 1;
      idx.push(acc.vert(ca * b[1], b[0], sa * b[1],
        ca / nl, b[3] / nl, sa / nl, i / seg, (b[0] - y0) / h, ...b[4]));
    }
    return idx;
  });
  for (let k = 0; k < rings.length - 1; k++) {
    for (let i = 0; i < seg; i++) {
      const j = (i + 1) % seg;
      acc.tri(rings[k][i], rings[k + 1][i], rings[k][j]);
      acc.tri(rings[k][j], rings[k + 1][i], rings[k + 1][j]);
    }
  }
  // Bore (normals inward) and the two annular faces.
  const boreTop = [], boreBot = [], faceTop = [], faceBot = [];
  for (let i = 0; i < seg; i++) {
    const [ca, sa] = outer[i];
    boreBot.push(acc.vert(ca * rBore, y0, sa * rBore, -ca, 0, -sa, i / seg, 0, ...bore));
    boreTop.push(acc.vert(ca * rBore, y1, sa * rBore, -ca, 0, -sa, i / seg, 1, ...bore));
    faceBot.push(acc.vert(ca * rBore, y0, sa * rBore, 0, -1, 0, 0.5, 0, ...bore));
    faceTop.push(acc.vert(ca * rBore, y1, sa * rBore, 0, 1, 0, 0.5, 1, ...bore));
  }
  const edgeBot = [], edgeTop = [];
  for (let i = 0; i < seg; i++) {
    const [ca, sa] = outer[i];
    edgeBot.push(acc.vert(ca * rEdge, y0, sa * rEdge, 0, -1, 0, 0.5, 0, ...dark));
    edgeTop.push(acc.vert(ca * rEdge, y1, sa * rEdge, 0, 1, 0, 0.5, 1, ...dark));
  }
  for (let i = 0; i < seg; i++) {
    const j = (i + 1) % seg;
    acc.tri(boreBot[i], boreBot[j], boreTop[i]);
    acc.tri(boreTop[i], boreBot[j], boreTop[j]);
    acc.tri(faceTop[i], edgeTop[i], faceTop[j]);
    acc.tri(faceTop[j], edgeTop[i], edgeTop[j]);
    acc.tri(faceBot[j], edgeBot[i], faceBot[i]);
    acc.tri(edgeBot[j], edgeBot[i], faceBot[j]);
  }
  return acc.build();
}

/**
 * The conveyor-belt cover strap. Every FIA tyre wall is faced with belting
 * bolted over the front and lapped across the top; without it a tyre wall reads
 * as a pile of tyres rather than as a built barrier.
 */
function buildCoverStrap(acc, pts, rOut) {
  if (pts.length < 2) return;
  const nv = 5;
  const base = acc.count;
  for (let i = 0; i < pts.length; i++) {
    const q = pts[i];
    // (depth toward road, height relative to the stack top)
    const section = [
      [rOut + 0.035, -0.62, 0.10, 0.99],   // front skirt bottom
      [rOut + 0.045, -0.16, 0.55, 0.86],
      [rOut * 0.55, 0.075, 0.98, 1.0],     // over the crown
      [-rOut * 0.55, 0.070, 0.75, 0.90],
      [-rOut - 0.03, -0.30, 0.25, 0.78],   // back skirt
    ];
    for (let k = 0; k < nv; k++) {
      const [d, dy, ny, shade] = section[k];
      const nd = k === 0 ? 1 : (k === nv - 1 ? -1 : 0.25 * (2 - k));
      const nl = Math.hypot(nd, ny) || 1;
      const g = shade * 0.20;
      // A white-painted band on the belting, as used for the marshal sectors.
      const white = (Math.floor(q.s / 1.9) % 4 === 0) ? 0.68 : 0;
      acc.vert(q.x + q.ix * d, q.top + dy, q.z + q.iz * d,
        (q.ix * nd) / nl, ny / nl, (q.iz * nd) / nl,
        k / (nv - 1), q.s * 0.5,
        g + white, g + white * 0.99, g + white * 0.95);
    }
  }
  for (let i = 0; i < pts.length - 1; i++) {
    const r0 = base + i * nv, r1 = base + (i + 1) * nv;
    for (let k = 0; k < nv - 1; k++) {
      acc.tri(r0 + k, r1 + k, r0 + k + 1);
      acc.tri(r0 + k + 1, r1 + k, r1 + k + 1);
    }
  }
}

// ---------------------------------------------------------------------------
// CONCRETE BARRIER WALL (street circuits)
// ---------------------------------------------------------------------------

// F-shape barrier section. d = 0 is the vertical upper face — the part cars
// actually touch — with the toe standing 115 mm proud toward the road, still
// well behind the physics wall at d = +0.25.
const BLOCK_PROFILE = [
  [0.115, 0.000],
  [0.115, 0.080],
  [0.030, 0.330],
  [0.000, 0.560],
  [0.000, 0.980],
  [-0.030, 1.030],
  [-0.110, 1.062],
  [-0.320, 1.048],
  [-0.380, 0.990],
  [-0.400, 0.400],
  [-0.400, 0.000],
];

export function addConcreteWall(scene, frames, offset) {
  const path = makePath(frames);
  const corners = findCorners(path, 0.0090);
  const prof = prepareProfile(BLOCK_PROFILE, 52);
  const cap = triangulateProfile(BLOCK_PROFILE);

  const acc = new GeoAcc();
  const plates = [];
  const p = { px: 0, pz: 0, tx: 0, tz: 0, lx: 0, lz: 0 };

  // Rubber transfer: on a street circuit everybody kisses the wall, so scuffs
  // are common — but still clustered at the corners, not sprayed round the lap.
  const scuffs = [];
  for (const cn of corners) {
    const n = 1 + Math.floor(Math.random() * 3);
    for (let i = 0; i < n; i++) {
      scuffs.push({
        sign: cn.outSign,
        s: cn.sEntry + Math.random() * Math.max(4, cn.sExit - cn.sEntry),
        half: 0.7 + Math.random() * 1.8,
        depth: 0.3 + Math.random() * 0.5,
      });
    }
  }
  const scuffAt = (sign, s) => {
    let m = 0;
    for (const k of scuffs) {
      if (k.sign !== sign) continue;
      const dd = arcDist(k.centre, s, path.total);
      if (dd < k.half) m = Math.max(m, k.depth * (1 - smoothstep(0, 1, dd / k.half)));
    }
    return m;
  };

  // Paint. A street circuit's walls are mostly bare or whitewashed concrete;
  // the alternating red/white (or blue/yellow) panels only appear where the
  // wall matters — the braking zones and the outside of the corners. Because
  // each block is its own run of vertices, the panel change is crisp with no
  // extra geometry.
  const paintZones = [];
  for (let c = 0; c < corners.length; c++) {
    const cn = corners[c];
    const before = 16 + Math.random() * 14;
    const after = cn.len + 4 + Math.random() * 8;
    paintZones.push({
      sign: cn.outSign,
      centre: wrapS(cn.sEntry + (after - before) * 0.5, path.total),
      half: (before + after) * 0.5,
      scheme: PAINT_SCHEMES[c % PAINT_SCHEMES.length],
    });
  }
  const zoneAt = makeZoneLookup(paintZones, path.total);

  const GAP = 0.045;
  const stationOf = (s, sign, jitter, dOff) => {
    path.at(s, p);
    const bx = p.px + p.lx * (offset + jitter) * sign;
    const bz = p.pz + p.lz * (offset + jitter) * sign;
    return {
      px: bx, pz: bz,
      ix: -sign * p.lx, iz: -sign * p.lz,
      tx: p.tx, tz: p.tz,
      gy: 0, s, dOff: dOff || 0,
    };
  };

  for (const sign of [+1, -1]) {
    // Blocks are craned into place one at a time: lengths vary, joints never
    // land at the same arc on both sides, and one block in ~15 is pulled back
    // to leave a marshal access gap.
    let s = Math.random() * 3;
    let bi = 0;
    let sinceGap = 0;
    const guard = Math.ceil(path.total / 3.0) + 8;
    let steps = 0;
    while (s < path.total && steps++ < guard) {
      const len = 3.10 + Math.random() * 0.85;
      const s1 = Math.min(s + len, path.total);
      if (s1 - s < 0.9) break;
      // Every 40-70 m one block is pulled back to leave a marshal access gap.
      const access = sinceGap > 11 && Math.random() < 0.22;
      sinceGap = access ? 0 : sinceGap + 1;
      const setBack = access ? -0.42 : 0;
      const jitA = setBack + (Math.random() - 0.5) * 0.035;
      const jitB = setBack + (Math.random() - 0.5) * 0.035;

      const tone = 0.86 + fractalNoise(s * 0.21 + (sign > 0 ? 0 : 33.7), 5.5, 3) * 0.28;
      const zone = zoneAt(sign, (s + s1) * 0.5);
      const faceCol = zone ? zone.scheme[bi & 1] : null;
      const sc = scuffAt(sign, (s + s1) * 0.5);
      const stA = stationOf(s, sign, jitA);
      const stB = stationOf(s1 - GAP, sign, jitB);
      stA.tone = stB.tone = tone;
      stA.face = stB.face = faceCol;
      stA.sc = stB.sc = sc;

      const nMid = Math.abs(path.kappaAt((s + s1) * 0.5)) > 0.022 ? 1 : 0;
      const stations = [stA];
      for (let q = 1; q <= nMid; q++) {
        const sm = s + (s1 - GAP - s) * (q / (nMid + 1));
        const st = stationOf(sm, sign, (jitA + jitB) * 0.5);
        st.tone = tone; st.face = faceCol; st.sc = sc;
        stations.push(st);
      }
      stations.push(stB);

      const colourFn = (st, row, d, y, out) => {
        let r, g, b;
        // The road-facing flank (the battered toe and the vertical face above
        // it) is what gets painted; the crown and the outboard back stay bare
        // concrete, which is what stops a painted wall reading as a solid
        // coloured extrusion.
        if (st.face && d >= -0.031 && y < 1.02) {
          r = st.face[0]; g = st.face[1]; b = st.face[2];
        } else if (d >= -0.031 && y < 1.02) {
          r = 0.86; g = 0.855; b = 0.835;      // whitewash
        } else {
          r = 0.78; g = 0.775; b = 0.755;      // bare concrete
        }
        const f = st.tone;
        r *= f; g *= f; b *= f;
        // Road film wicks up the battered toe; the top slab bleaches.
        const grime = smoothstep(0.55, 0.02, y);
        r = r * (1 - grime * 0.42) + grime * 0.10;
        g = g * (1 - grime * 0.44) + grime * 0.095;
        b = b * (1 - grime * 0.45) + grime * 0.085;
        if (y > 1.02) { r *= 1.05; g *= 1.05; b *= 1.04; }
        if (st.sc > 0 && d > -0.05 && y > 0.30 && y < 1.00) {
          const t = st.sc * smoothstep(0.25, 0.55, y);
          r *= 1 - t * 0.72; g *= 1 - t * 0.74; b *= 1 - t * 0.72;
        }
        out[0] = r; out[1] = g; out[2] = b;
      };

      extrudeStrip(acc, prof, stations, sign, colourFn, 1 / 1.4);
      capPolygon(acc, cap.poly, cap.tris, stA, sign, -1, colourFn);
      capPolygon(acc, cap.poly, cap.tris, stB, sign, +1, colourFn);

      // Tie-down / lifting pocket in the top slab, mid-block.
      const mid = stationOf((s + s1 - GAP) * 0.5, sign, (jitA + jitB) * 0.5);
      const pd = -0.215;
      domeInto(acc,
        mid.px + mid.ix * pd, mid.gy + 1.053, mid.pz + mid.iz * pd,
        0.072, -0.058, 6,
        [0.14, 0.135, 0.13], [0.52 * tone, 0.51 * tone, 0.50 * tone]);

      // Debris-fence base plates sit on every third or fourth block joint.
      if (bi % 3 === (sign > 0 ? 0 : 2) && !access) {
        plates.push({ st: stB, sign });
      }

      s = s1;
      bi++;
    }
  }

  const tex = concreteTexture();
  tex.repeat.set(1, 1);
  const wallMat = new THREE.MeshStandardMaterial({
    map: tex,
    vertexColors: true,
    roughness: 0.92,
    metalness: 0.02,
    envMapIntensity: 0.35,
  });
  const wall = new THREE.Mesh(acc.build(), wallMat);
  wall.castShadow = true;
  wall.receiveShadow = true;
  wall.name = 'concrete-wall';
  scene.add(wall);

  if (plates.length) {
    const plateGeo = buildFenceBaseGeometry();
    const plateMat = new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0.66, metalness: 0.55, envMapIntensity: 0.7,
    });
    const inst = new THREE.InstancedMesh(plateGeo, plateMat, plates.length);
    inst.castShadow = true;
    inst.name = 'wall-fence-bases';
    const m4 = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const pos = new THREE.Vector3();
    const scl = new THREE.Vector3(1, 1, 1);
    const up = new THREE.Vector3(0, 1, 0);
    const c = new THREE.Color();
    for (let i = 0; i < plates.length; i++) {
      const { st } = plates[i];
      const pd = -0.215;
      pos.set(st.px + st.ix * pd, st.gy + 1.046, st.pz + st.iz * pd);
      q.setFromAxisAngle(up, Math.atan2(st.ix, st.iz));
      scl.set(1, 0.94 + Math.random() * 0.14, 1);
      m4.compose(pos, q, scl);
      inst.setMatrixAt(i, m4);
      const v = 0.78 + Math.random() * 0.3;
      c.setRGB(v, v, v * 1.02);
      inst.setColorAt(i, c);
    }
    inst.instanceMatrix.needsUpdate = true;
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
    scene.add(inst);
  }
}

/** Bolted base plate + stub upright for the debris fence. */
function buildFenceBaseGeometry() {
  const acc = new GeoAcc();
  const steel = [0.52, 0.53, 0.55];
  prismInto(acc, [
    [-0.17, -0.11], [0.17, -0.11], [0.17, 0.11], [-0.17, 0.11],
  ], 0, 0.026, steel, [0.60, 0.61, 0.63]);
  prismInto(acc, [
    [-0.045, -0.045], [0.045, -0.045], [0.045, 0.045], [-0.045, 0.045],
  ], 0.026, 0.42, [0.44, 0.45, 0.47], [0.50, 0.51, 0.53]);
  for (const bx of [-0.125, 0.125]) {
    domeInto(acc, bx, 0.026, 0, 0.022, 0.012, 5, [0.68, 0.68, 0.70], [0.44, 0.45, 0.46]);
  }
  return acc.build();
}
