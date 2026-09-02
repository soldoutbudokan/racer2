/**
 * Vegetation scatter — a 3-tier, distance-bucketed forest.
 *
 * Replaces the old `scatterTrees` / `scatterPines` / `makeFoliageTexture` in
 * track.js, which put THREE crossed alpha cards on a straight cylinder for
 * every tree at every range. Three separate failures came out of that, and the
 * whole design here exists to fix them:
 *
 * 1. NEAR TREES WERE A BLOB ON A STICK. A 3.2 m untapered cylinder and one
 *    7 m card cluster has no branch structure to read at 20 m. Trees inside
 *    ~90 m are now real geometry: a swept, tapered, wobbling trunk that forks
 *    into limbs, with foliage clumps seated on the limb ENDS so the crown
 *    hangs off visible wood.
 *
 * 2. DISTANT TREES WERE PALE TAN CARDBOARD. Diagnosis, because it is not
 *    obvious and it will come back if the numbers are re-tuned carelessly:
 *      - The albedo was multiplied down TWICE. `makeFoliageTexture` painted a
 *        dark green canvas (mean ~rgb(47,108,27)), and then every instance
 *        multiplied it again by `Color.setHSL(h, ~0.5, ~0.43)`. setHSL takes
 *        sRGB and stores linear, so "lightness 0.43" is a ~0.15 LINEAR
 *        multiplier. The product albedo was essentially black.
 *      - A black dielectric under a bright sky does not render black: what
 *        survives is the view-independent 4% specular — sun (0xffd5a0 at 3.4)
 *        plus the PMREM sky IBL scaled by `envMapIntensity`. At golden hour
 *        that sheen is warm and desaturated. A flat card covered in a uniform
 *        warm sheen with no diffuse colour under it IS pale tan cardboard, and
 *        ACES + bloom(0.91) push it further toward white.
 *      - The old cards made that worse on purpose: their normals were
 *        spherised with a hard `+0.55` upward bias, so every card faced the
 *        bright sky and caught the maximum sheen, and `side: DoubleSide` made
 *        three flip the normal on backfaces so the far cards of each pair went
 *        black — a flat two-tone slab with no shape shading anywhere.
 *    The fixes, all of them needed together:
 *      - Canopy albedo is carried by the ATLAS in believable mid greens, and
 *        the per-instance tint is built with `Color.setRGB` (which is already
 *        in the linear working space) at 0.8–1.2 — a real tint, not a 0.15
 *        crush. Same for the baked vertex colours.
 *      - `roughness: 1.0` so the specular lobe is as broad and weak as a
 *        dielectric gets, and a modest `envMapIntensity` that buys ambient
 *        fill without buying sheen.
 *      - Cards are `FrontSide` mirrored quad PAIRS (same 4 vertices, both
 *        windings, one shared normal) instead of DoubleSide. Exactly one
 *        winding survives the cull from any viewpoint, so there is no
 *        z-fighting, no backface normal flip, and both faces shade with the
 *        same canopy-outward normal.
 *      - Fake self-shadowing is BAKED into vertex colours (down-tilted skirt
 *        cards ~0.6x, sunlit crown cards ~1.1x, plus a vertical gradient
 *        inside every card). Foliage cards are excluded from GTAO, so nothing
 *        else was ever going to darken the canopy interior.
 *
 * 3. EVERY TREE WAS ONE STAMPED SHAPE. There are now five hand-authored
 *    species per theme, stands share a dominant species and a colour so a
 *    copse reads as one wood, and instances vary in yaw, lean, and separate
 *    width/height scale.
 *
 * Bucketing is by distance to the CENTRELINE, computed once at build time.
 * The camera never leaves the ribbon, so a build-time bucket is as good as a
 * per-frame LOD switch and costs nothing per frame.
 *
 * Draw calls: 5 near species + 1 mid trunk + 1 mid card set + 1 far card set
 * = 8 instanced meshes per call.
 */
import * as THREE from 'three';
import { hashFn, hideFromOverridePasses } from './noise.js';
import { rand } from './rng.js';

// Distance from the centreline at which each tier takes over.
const NEAR_D = 90;
const MID_D = 250;
// Real geometry is the whole triangle budget, so the near tier is capped and
// overflow falls back to cards. It only binds on the densest circuits (parco).
const NEAR_CAP = 300;

const rnd = (a, b) => a + rand() * (b - a);
const pick = (arr) => arr[(rand() * arr.length) | 0];

// Species are NOT equally likely. Uniform picking gave one stand in five a
// dominant dead snag (a whole copse of dead wood) and made the rare shapes as
// common as the workhorse ones — the fastest way back to "procedural-looking".
function weightedPick(weights) {
  let total = 0;
  for (const w of weights) total += w;
  let r = rand() * total;
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i];
    if (r <= 0) return i;
  }
  return weights.length - 1;
}

// ---------------------------------------------------------------------------
// Geometry buffers
// ---------------------------------------------------------------------------

function newBuf(withUV) {
  return { pos: [], nor: [], col: [], uv: withUV ? [] : null, idx: [] };
}

function toGeometry(b) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(b.pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(b.nor, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(b.col, 3));
  if (b.uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(b.uv, 2));
  g.setIndex(b.pos.length / 3 > 65535
    ? new THREE.Uint32BufferAttribute(b.idx, 1)
    : new THREE.Uint16BufferAttribute(b.idx, 1));
  g.computeBoundingSphere();
  return g;
}

/**
 * Swept tapered tube along a polyline — trunks and limbs.
 *
 * The ring frame is carried forward (Gram-Schmidt against the previous frame's
 * u axis) rather than rebuilt from world up: a limb that swings past vertical
 * would otherwise snap 90 degrees and pinch the tube into a bowtie.
 *
 * Winding is (a, b, c) / (b, d, c) with rings advancing counter-clockwise about
 * the sweep direction; that is the combination that puts the normal OUTWARD.
 * Get it backwards and the tree is invisible from outside, which reads as a
 * depth bug and is not.
 */
function addTube(buf, pts, radii, radial, colorAt, wobble = 0.22) {
  const N = pts.length;
  const base = buf.pos.length / 3;
  const up = new THREE.Vector3(0, 0, 1);
  const dir = new THREE.Vector3(), u = new THREE.Vector3(), v = new THREE.Vector3();
  for (let i = 0; i < N; i++) {
    if (i < N - 1) dir.subVectors(pts[i + 1], pts[i]);
    else dir.subVectors(pts[i], pts[i - 1]);
    if (dir.lengthSq() < 1e-9) dir.set(0, 1, 0);
    dir.normalize();
    u.copy(up).addScaledVector(dir, -up.dot(dir));
    if (u.lengthSq() < 1e-6) {
      u.set(1, 0, 0).addScaledVector(dir, -dir.x);
      if (u.lengthSq() < 1e-6) u.set(0, 0, 1).addScaledVector(dir, -dir.z);
    }
    u.normalize();
    v.crossVectors(dir, u).normalize();
    up.copy(u);
    const t = N > 1 ? i / (N - 1) : 0;
    for (let k = 0; k < radial; k++) {
      const a = (k / radial) * Math.PI * 2;
      const ca = Math.cos(a), sa = Math.sin(a);
      const nx = u.x * ca + v.x * sa;
      const ny = u.y * ca + v.y * sa;
      const nz = u.z * ca + v.z * sa;
      // Per-ring, per-angle radius wobble: a perfectly round trunk is the
      // single loudest "this is a cylinder" cue at 20 m.
      const w = 1 + (hashFn(k * 3.17 + i * 7.71, i * 2.33 + 0.5) - 0.5) * wobble;
      const r = radii[i] * w;
      buf.pos.push(pts[i].x + nx * r, pts[i].y + ny * r, pts[i].z + nz * r);
      buf.nor.push(nx, ny, nz);
      const c = colorAt(t, k / radial);
      buf.col.push(c[0], c[1], c[2]);
    }
  }
  for (let i = 0; i < N - 1; i++) {
    for (let k = 0; k < radial; k++) {
      const k2 = (k + 1) % radial;
      const a = base + i * radial + k;
      const b = base + i * radial + k2;
      const c = base + (i + 1) * radial + k;
      const d = base + (i + 1) * radial + k2;
      buf.idx.push(a, b, c, b, d, c);
    }
  }
}

/**
 * Lumpy spheroid — one foliage clump. Indexed (so normals are smooth, not
 * faceted) with the radius jittered by a hash of the DIRECTION, so the seam
 * column and the poles displace identically and the hull stays closed.
 */
function addBlob(buf, cx, cy, cz, rx, ry, rz, lon, lat, seed, colTop, colBot, lump) {
  // The species tables were authored at 7x3 / 5x3 rings, which at 20 m read
  // as faceted green boulders — the single loudest "low-poly" cue in the
  // trackside shots. Floor the tessellation here so every clump has enough
  // vertices to carry a leafy silhouette, whatever the caller asked for.
  lon = Math.max(lon, 9);
  lat = Math.max(lat, 4);
  const base = buf.pos.length / 3;
  const n = new THREE.Vector3();
  for (let j = 0; j <= lat; j++) {
    const phi = (j / lat) * Math.PI;
    const sp = Math.sin(phi), cp = Math.cos(phi);
    for (let i = 0; i <= lon; i++) {
      const th = (i / lon) * Math.PI * 2;
      const dx = sp * Math.sin(th), dy = cp, dz = sp * Math.cos(th);
      const h = hashFn((i % lon) * 1.93 + seed, j * 4.11 + seed * 0.7);
      // Two scales of displacement: the coarse lump gives the clump its
      // lobes, the fine one frays the silhouette into leaf clusters.
      const h2 = hashFn((i % lon) * 7.31 + seed * 1.7, j * 5.93 - seed);
      const rr = 1 + (h - 0.5) * lump + (h2 - 0.5) * lump * 0.55;
      buf.pos.push(cx + dx * rx * rr, cy + dy * ry * rr, cz + dz * rz * rr);
      n.set(dx / (rx * rx), dy / (ry * ry), dz / (rz * rz)).normalize();
      buf.nor.push(n.x, n.y, n.z);
      // Vertical gradient inside the clump: this is what stops a low-poly
      // spheroid reading as a plastic ball of broccoli. The per-vertex
      // brightness jitter is the leaf-scale variation a solid hull lacks.
      const t = (dy * 0.5 + 0.5) * 0.85 + h * 0.15;
      const k = 0.86 + h2 * 0.28;
      buf.col.push(
        (colBot[0] + (colTop[0] - colBot[0]) * t) * k,
        (colBot[1] + (colTop[1] - colBot[1]) * t) * k,
        (colBot[2] + (colTop[2] - colBot[2]) * t) * k);
    }
  }
  const row = lon + 1;
  for (let j = 0; j < lat; j++) {
    for (let i = 0; i < lon; i++) {
      const a = base + j * row + i, b = a + 1;
      const c = a + row, d = c + 1;
      if (j > 0) buf.idx.push(a, c, b);        // degenerate at the top pole
      if (j < lat - 1) buf.idx.push(b, c, d);  // degenerate at the bottom pole
    }
  }
}

/**
 * One drooping conifer branch tier: a fan of spiky, unevenly long branch tips
 * around the trunk, sagging away from the centre. Emitted twice with opposite
 * winding and opposite normals so it is lit correctly from above AND below —
 * the tiers overlap, and a single-sided skirt shows daylight through the tree
 * from a low camera.
 */
function addTier(buf, cy, r, droop, n, seed, colTop, colTip, colUnder) {
  for (const under of [false, true]) {
    const base = buf.pos.length / 3;
    const s = under ? -1 : 1;
    buf.pos.push(0, cy, 0);
    buf.nor.push(0, s, 0);
    const cc = under ? colUnder : colTop;
    buf.col.push(cc[0], cc[1], cc[2]);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed;
      // Alternating long/short tips: a smooth ring reads as a lampshade, a
      // ragged one reads as branches.
      const h = hashFn(i * 5.7 + seed * 11, seed * 3.1);
      const rr = r * (0.58 + h * 0.55);
      const dy = -droop * (0.6 + h * 0.8);
      buf.pos.push(Math.cos(a) * rr, cy + dy, Math.sin(a) * rr);
      const nl = Math.hypot(Math.cos(a) * 0.42, 1, Math.sin(a) * 0.42);
      buf.nor.push(s * Math.cos(a) * 0.42 / nl, s / nl, s * Math.sin(a) * 0.42 / nl);
      const ct = under ? colUnder : colTip;
      buf.col.push(ct[0], ct[1], ct[2]);
    }
    for (let i = 0; i < n; i++) {
      const a = base, b = base + 1 + i, c = base + 1 + ((i + 1) % n);
      if (under) buf.idx.push(a, c, b);
      else buf.idx.push(a, b, c);
    }
  }
}

/**
 * One foliage card as a MIRRORED QUAD PAIR: four vertices, four triangles
 * (both windings), one shared canopy-outward normal per vertex. See the header
 * — this is the replacement for `side: DoubleSide`, whose backface normal flip
 * is half of why the old canopies read as flat two-tone slabs.
 */
function addCard(buf, opt) {
  const { cx, cy, cz, w, h, yaw, tilt, cell, tint, exposure, centreY, span } = opt;
  const base = buf.pos.length / 3;
  const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(tilt, yaw, 0, 'YXZ'));
  const p = new THREE.Vector3();
  const nrm = new THREE.Vector3();
  const corners = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
  const uvc = [[cell.u0, cell.v0], [cell.u1, cell.v0], [cell.u1, cell.v1], [cell.u0, cell.v1]];
  for (let i = 0; i < 4; i++) {
    p.set(corners[i][0] * w * 0.5, corners[i][1] * h * 0.5, 0).applyQuaternion(q);
    p.x += cx; p.y += cy; p.z += cz;
    buf.pos.push(p.x, p.y, p.z);
    // Canopy-outward with a MILD up bias (0.22). The old code used 0.55, which
    // aimed every card at the sky and maximised the warm specular sheen that
    // turned distant trees tan.
    nrm.set(p.x, p.y - centreY, p.z);
    if (nrm.lengthSq() < 1e-4) nrm.set(0, 1, 0);
    nrm.normalize();
    nrm.y += 0.22;
    nrm.normalize();
    buf.nor.push(nrm.x, nrm.y, nrm.z);
    // Baked self-shadow: vertical gradient through the crown plus the card's
    // own exposure (skirt cards dark, crown cards bright).
    const t = Math.max(0, Math.min(1, (p.y - (centreY - span)) / (2 * span)));
    const k = exposure * (0.58 + 0.52 * t);
    buf.col.push(tint[0] * k, tint[1] * k, tint[2] * k);
    buf.uv.push(uvc[i][0], uvc[i][1]);
  }
  const a = base, b = base + 1, c = base + 2, d = base + 3;
  buf.idx.push(a, b, c, a, c, d, a, c, b, a, d, c);
}

// ---------------------------------------------------------------------------
// Canopy texture atlas
// ---------------------------------------------------------------------------

// Late-summer foliage ramps: dark interior -> body -> sunlit edge. Written in
// sRGB bytes because that is what the canvas takes; the map is tagged sRGB so
// three converts once on upload.
const TONES = {
  mid:    [[34, 52, 26], [70, 98, 42], [114, 132, 60], [158, 168, 88]],
  olive:  [[44, 50, 22], [92, 98, 36], [132, 132, 54], [176, 168, 82]],
  blue:   [[26, 48, 40], [50, 86, 66], [86, 120, 86], [128, 156, 114]],
  deep:   [[20, 38, 22], [44, 70, 32], [76, 100, 44], [110, 130, 60]],
  larch:  [[40, 52, 20], [84, 102, 34], [126, 138, 56], [164, 168, 80]],
  spruce: [[18, 34, 22], [38, 62, 34], [64, 90, 50], [98, 122, 68]],
};

function mixByte(a, b, t) {
  return `rgb(${(a[0] + (b[0] - a[0]) * t) | 0},${(a[1] + (b[1] - a[1]) * t) | 0},${(a[2] + (b[2] - a[2]) * t) | 0})`;
}

function dab(ctx, x, y, r, ang, aspect, fill) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(ang);
  ctx.scale(1, aspect);
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

/**
 * Paint one atlas cell.
 *
 * Alpha is kept at ~1 inside every dab and the openness comes from the SHAPE
 * of the dab cloud plus punched holes, never from partial alpha. Mip levels
 * average alpha, so a canopy built from 0.5-alpha leaves falls below alphaTest
 * and dissolves at exactly the range where the far tier lives.
 */
function paintCell(ctx, X, Y, S, o) {
  const tone = TONES[o.tone] || TONES.mid;
  const lobes = [];
  const nL = o.lobes;
  for (let i = 0; i < nL; i++) {
    const t = nL > 1 ? i / (nL - 1) : 0.5;
    let lx, ly, lr;
    if (o.shape === 'conic') {
      // Triangle envelope: wide at the base, pinched to a spire.
      ly = 0.90 - t * 0.80 + rnd(-0.03, 0.03);
      const wprof = 0.42 * (1 - t) + 0.05;
      lx = 0.5 + rnd(-wprof, wprof) * 0.55;
      lr = 0.10 + wprof * 0.32;
    } else if (o.shape === 'flat') {
      // Stone-pine umbrella: broad, shallow, sitting high in the cell.
      const a = (i / nL) * Math.PI * 2 + rnd(0, 1.2);
      lx = 0.5 + Math.cos(a) * rnd(0.10, 0.36);
      ly = 0.34 + Math.sin(a) * rnd(0.03, 0.11);
      lr = rnd(0.11, 0.18);
    } else if (o.shape === 'skirt') {
      lx = 0.5 + rnd(-0.42, 0.42);
      ly = 0.40 + Math.abs(lx - 0.5) * 0.9 + rnd(-0.05, 0.08);
      lr = rnd(0.09, 0.15);
    } else if (o.shape === 'column') {
      lx = 0.5 + rnd(-0.16, 0.16);
      ly = 0.90 - t * 0.78 + rnd(-0.04, 0.04);
      lr = rnd(0.11, 0.17);
    } else {
      const a = (i / nL) * Math.PI * 2 + rnd(0, 1.4);
      const rad = rnd(0.07, 0.21);
      lx = 0.5 + Math.cos(a) * rad * 1.15;
      ly = 0.50 + Math.sin(a) * rad * 0.85;
      lr = rnd(0.13, 0.22);
    }
    lobes.push({ x: lx, y: ly, r: lr });
  }

  // 1. Solid interior mass, so mip levels keep coverage.
  for (const l of lobes) {
    const g = ctx.createRadialGradient(
      X + l.x * S, Y + l.y * S, l.r * S * 0.15,
      X + l.x * S, Y + l.y * S, l.r * S * (o.soft ? 1.15 : 0.92));
    const lit = 1 - l.y;
    g.addColorStop(0, mixByte(tone[1], tone[2], lit * 0.5));
    g.addColorStop(0.7, mixByte(tone[0], tone[1], 0.6));
    g.addColorStop(1, `rgba(${tone[0][0]},${tone[0][1]},${tone[0][2]},0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(X + l.x * S, Y + l.y * S, l.r * S * (o.soft ? 1.15 : 0.92), 0, Math.PI * 2);
    ctx.fill();
  }

  // 2. Leaf dabs, painted dark-to-light so the lit tops land last.
  const dabs = [];
  for (let i = 0; i < o.dabs; i++) {
    const l = lobes[(rand() * lobes.length) | 0];
    const a = rand() * Math.PI * 2;
    const rad = Math.pow(rand(), 0.55) * l.r * 1.28;
    dabs.push({
      x: Math.min(0.965, Math.max(0.035, l.x + Math.cos(a) * rad)),
      y: Math.min(0.975, Math.max(0.025, l.y + Math.sin(a) * rad * (o.shape === 'flat' || o.shape === 'skirt' ? 0.55 : 0.92))),
      r: (o.dabR[0] + rand() * (o.dabR[1] - o.dabR[0])),
      a: rand() * Math.PI,
      asp: o.needle ? 0.30 : rnd(0.55, 0.95),
    });
  }
  dabs.sort((p, q) => q.y - p.y);
  for (const d of dabs) {
    // Height in the cell drives the ramp: canopy tops catch the sun, the
    // underside sits in its own shade.
    const lit = Math.pow(1 - d.y, 1.25) + rnd(-0.10, 0.10);
    const t = Math.max(0, Math.min(1, lit));
    const fill = t < 0.5
      ? mixByte(tone[0], tone[2], t * 2)
      : mixByte(tone[2], tone[3], (t - 0.5) * 2);
    dab(ctx, X + d.x * S, Y + d.y * S, d.r * S, d.a, d.asp, fill);
  }

  // 3. Sky gaps. Real canopies are see-through; the far cell skips this so it
  // survives mip-down.
  if (o.holes > 0) {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    for (let i = 0; i < o.holes; i++) {
      const l = lobes[(rand() * lobes.length) | 0];
      const a = rand() * Math.PI * 2;
      const rad = rand() * l.r * 0.9;
      ctx.beginPath();
      ctx.arc(X + (l.x + Math.cos(a) * rad) * S,
              Y + (l.y + Math.sin(a) * rad) * S,
              S * rnd(0.014, 0.040), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

/**
 * 4x2 atlas of canopy images on one 1024x512 canvas — several distinct
 * canopies without several materials. All content is kept inside ~95% of its
 * cell and UVs are inset a texel and a half, because mip levels blend across
 * cell borders and a leaf touching the edge prints into its neighbour.
 */
function makeCanopyAtlas(type) {
  const W = 1024, H = 512, S = 256;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  const recipes = type === 'pine' ? [
    { shape: 'conic', tone: 'spruce', lobes: 9, dabs: 260, dabR: [0.012, 0.030], holes: 7, needle: true },
    { shape: 'conic', tone: 'blue', lobes: 8, dabs: 230, dabR: [0.014, 0.034], holes: 5, needle: true },
    { shape: 'conic', tone: 'larch', lobes: 10, dabs: 200, dabR: [0.011, 0.028], holes: 12, needle: true },
    { shape: 'column', tone: 'deep', lobes: 7, dabs: 240, dabR: [0.014, 0.032], holes: 6, needle: true },
    { shape: 'skirt', tone: 'spruce', lobes: 6, dabs: 190, dabR: [0.012, 0.030], holes: 9, needle: true },
    { shape: 'skirt', tone: 'blue', lobes: 5, dabs: 150, dabR: [0.012, 0.028], holes: 8, needle: true },
    { shape: 'round', tone: 'olive', lobes: 5, dabs: 240, dabR: [0.016, 0.036], holes: 8 },
    { shape: 'conic', tone: 'spruce', lobes: 11, dabs: 300, dabR: [0.020, 0.044], holes: 0, soft: true },
  ] : [
    { shape: 'round', tone: 'mid', lobes: 5, dabs: 280, dabR: [0.016, 0.038], holes: 8 },
    { shape: 'round', tone: 'olive', lobes: 6, dabs: 250, dabR: [0.015, 0.034], holes: 11 },
    { shape: 'round', tone: 'blue', lobes: 4, dabs: 300, dabR: [0.018, 0.042], holes: 5 },
    { shape: 'round', tone: 'larch', lobes: 7, dabs: 200, dabR: [0.013, 0.030], holes: 15 },
    { shape: 'flat', tone: 'deep', lobes: 7, dabs: 250, dabR: [0.015, 0.034], holes: 9 },
    { shape: 'conic', tone: 'deep', lobes: 9, dabs: 230, dabR: [0.013, 0.030], holes: 7, needle: true },
    { shape: 'skirt', tone: 'deep', lobes: 5, dabs: 170, dabR: [0.014, 0.032], holes: 6 },
    { shape: 'round', tone: 'mid', lobes: 4, dabs: 320, dabR: [0.022, 0.048], holes: 0, soft: true },
  ];

  const cells = [];
  const inset = 1.5;
  for (let i = 0; i < 8; i++) {
    const cx = (i % 4) * S, cy = ((i / 4) | 0) * S;
    paintCell(ctx, cx, cy, S, recipes[i]);
    cells.push({
      u0: (cx + inset) / W,
      u1: (cx + S - inset) / W,
      // Canvas y runs down and CanvasTexture flips Y, so the cell's TOP row of
      // pixels is the HIGH v.
      v1: 1 - (cy + inset) / H,
      v0: 1 - (cy + S - inset) / H,
    });
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return { tex, cells };
}

// ---------------------------------------------------------------------------
// Species — hand-authored, five per theme
// ---------------------------------------------------------------------------

const lin = (hex) => {
  const c = new THREE.Color(hex);   // hex is sRGB; Color stores linear
  return [c.r, c.g, c.b];
};

function barkRamp(lo, hi) {
  const a = lin(lo), b = lin(hi);
  return (t, ang) => {
    // Cheap bark relief: a circumferential ripple plus a slow vertical fade to
    // the paler, thinner wood up top.
    const k = 0.62 + 0.38 * t + Math.sin(ang * Math.PI * 2 * 3) * 0.10;
    return [
      (a[0] + (b[0] - a[0]) * t) * k,
      (a[1] + (b[1] - a[1]) * t) * k,
      (a[2] + (b[2] - a[2]) * t) * k,
    ];
  };
}

function sway(x0, y0, x1, y1, n, amp) {
  const pts = [];
  const ax = rnd(-amp, amp), az = rnd(-amp, amp);
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    pts.push(new THREE.Vector3(
      x0 + (x1 - x0) * t + Math.sin(t * 2.1) * ax,
      y0 + (y1 - y0) * t,
      Math.sin(t * 1.7) * az));
  }
  return pts;
}

/**
 * Foliage clump at a limb tip: the main blob plus one or two smaller
 * satellites hung off its flank, so a crown is a mass of overlapping lobes
 * rather than five balloons on sticks.
 */
function clump(buf, x, y, z, rx, ry, rz, seed, fol, folLo, lump) {
  addBlob(buf, x, y, z, rx, ry, rz, 9, 4, seed, fol, folLo, lump);
  const nSat = 1 + (hashFn(seed * 3.3, 1.7) < 0.55 ? 1 : 0);
  for (let k = 0; k < nSat; k++) {
    const a = hashFn(seed + k * 9.1, 4.2) * Math.PI * 2;
    const f = 0.55 + hashFn(seed * 1.3 + k, 8.8) * 0.2;
    addBlob(buf,
      x + Math.cos(a) * rx * 0.72, y - ry * (0.15 + k * 0.25), z + Math.sin(a) * rz * 0.72,
      rx * f, ry * f, rz * f, 9, 4, seed * 2.1 + k * 5.7, fol, folLo, lump * 1.15);
  }
}

/** Limb: from a point on the trunk out to a tip, sagging under its own weight. */
function limb(buf, from, azim, elev, len, r0, colorAt) {
  const pts = [from.clone()];
  const radii = [r0];
  const segs = 2;
  let dir = new THREE.Vector3(
    Math.cos(azim) * Math.cos(elev), Math.sin(elev), Math.sin(azim) * Math.cos(elev));
  const p = from.clone();
  for (let i = 1; i <= segs; i++) {
    p.addScaledVector(dir, len / segs);
    // Sag: each segment loses some rise, so limbs curve instead of spoking.
    dir.y -= 0.16 + rand() * 0.13;
    dir.normalize();
    pts.push(p.clone());
    radii.push(r0 * (1 - 0.62 * (i / segs)));
  }
  addTube(buf, pts, radii, 5, colorAt, 0.18);
  return pts[pts.length - 1];
}

/**
 * Five broadleaf-theme species. The set deliberately includes the Monza
 * signature (a bare-trunked stone pine umbrella) and a conifer-ish silhouette,
 * so a parkland circuit does not need a second scatter pass to look mixed.
 */
function broadleafSpecies() {
  const oak = (buf) => {
    const bark = barkRamp(0x3f3122, 0x574434);
    const fol = lin(0x53702f), folLo = lin(0x25381a);
    const t = sway(0, 0, 0.25, 4.3, 4, 0.35);
    addTube(buf, t, [0.66, 0.56, 0.47, 0.40, 0.35], 7, bark, 0.26);
    const top = t[t.length - 1];
    const nL = 5;
    for (let i = 0; i < nL; i++) {
      const az = (i / nL) * Math.PI * 2 + rnd(0, 0.9);
      const tip = limb(buf, top.clone().setY(top.y - rnd(0, 0.9)),
        az, rnd(0.55, 0.95), rnd(3.6, 5.0), 0.26, bark);
      clump(buf, tip.x, tip.y + 0.5, tip.z,
        rnd(2.1, 2.9), rnd(1.5, 2.0), rnd(2.1, 2.9), i * 3.3, fol, folLo, 0.42);
    }
    addBlob(buf, rnd(-0.6, 0.6), 7.4, rnd(-0.6, 0.6), 2.6, 1.9, 2.6, 7, 3, 9.1, fol, folLo, 0.44);
    return { w: 9.5, h: 9.2 };
  };

  const poplar = (buf) => {
    const bark = barkRamp(0x554d3e, 0x6d6656);
    const fol = lin(0x6b7a34), folLo = lin(0x2f3a18);
    const t = sway(0, 0, rnd(-0.4, 0.4), 11.4, 5, 0.30);
    addTube(buf, t, [0.44, 0.37, 0.30, 0.24, 0.18, 0.13], 6, bark, 0.20);
    for (let i = 0; i < 5; i++) {
      const y = 4.6 + i * 1.6;
      const az = i * 2.31 + rnd(0, 0.6);
      const from = new THREE.Vector3(0, y, 0);
      const tip = limb(buf, from, az, rnd(1.0, 1.25), rnd(1.5, 2.2), 0.11, bark);
      clump(buf, tip.x, tip.y + 0.3, tip.z,
        rnd(1.3, 1.9), rnd(1.6, 2.3), rnd(1.3, 1.9), i * 2.7, fol, folLo, 0.5);
    }
    addBlob(buf, 0, 12.2, 0, 1.4, 1.9, 1.4, 5, 3, 4.4, fol, folLo, 0.5);
    return { w: 4.4, h: 13.6 };
  };

  const plane = (buf) => {
    const bark = barkRamp(0x6a6151, 0x8a8172);
    const fol = lin(0x4d6a33), folLo = lin(0x213216);
    const t = sway(0, 0, 0.1, 3.7, 3, 0.22);
    addTube(buf, t, [0.58, 0.51, 0.45, 0.41], 7, bark, 0.22);
    const fork = t[t.length - 1];
    for (let i = 0; i < 3; i++) {
      const az = (i / 3) * Math.PI * 2 + 0.5;
      const mid = limb(buf, fork.clone(), az, rnd(1.05, 1.30), rnd(4.0, 5.0), 0.30, bark);
      for (let k = 0; k < 2; k++) {
        const tip = limb(buf, mid.clone(), az + rnd(-1.2, 1.2), rnd(0.5, 0.95), rnd(1.6, 2.4), 0.13, bark);
        clump(buf, tip.x, tip.y + 0.4, tip.z,
        rnd(1.9, 2.5), rnd(1.5, 2.0), rnd(1.9, 2.5), i * 5 + k, fol, folLo, 0.44);
      }
    }
    return { w: 8.4, h: 11.4 };
  };

  // Stone pine: bare curving trunk, everything happening in a flat umbrella at
  // the very top. The strongest silhouette in the set — it is what a parkland
  // circuit's treeline is supposed to look like against the sky.
  const stonePine = (buf) => {
    const bark = barkRamp(0x5a4029, 0x74553a);
    const fol = lin(0x3f5c30), folLo = lin(0x1b2b16);
    const t = sway(0, 0, rnd(-0.9, 0.9), 8.4, 5, 0.75);
    addTube(buf, t, [0.60, 0.52, 0.46, 0.40, 0.35, 0.30], 7, bark, 0.24);
    const top = t[t.length - 1];
    const nL = 6;
    for (let i = 0; i < nL; i++) {
      const az = (i / nL) * Math.PI * 2 + rnd(0, 0.7);
      const tip = limb(buf, top.clone().setY(top.y - rnd(0, 0.5)),
        az, rnd(0.30, 0.55), rnd(3.2, 4.4), 0.20, bark);
      clump(buf, tip.x, tip.y + 0.55, tip.z,
        rnd(2.3, 3.0), rnd(0.75, 1.05), rnd(2.3, 3.0), i * 4.7, fol, folLo, 0.36);
    }
    return { w: 9.8, h: 10.6 };
  };

  const birch = (buf) => {
    const bark = barkRamp(0x9d978a, 0xc4bfb2);
    const fol = lin(0x76853e), folLo = lin(0x34401c);
    const lean = rnd(-1.1, 1.1);
    const t = sway(0, 0, lean, 7.0, 4, 0.45);
    addTube(buf, t, [0.28, 0.24, 0.20, 0.16, 0.12], 6, bark, 0.16);
    const top = t[t.length - 1];
    for (let i = 0; i < 4; i++) {
      const az = (i / 4) * Math.PI * 2 + rnd(0, 1.1);
      const tip = limb(buf, top.clone().setY(top.y - rnd(0.4, 1.8)),
        az, rnd(0.75, 1.15), rnd(1.8, 2.6), 0.09, bark);
      clump(buf, tip.x, tip.y + 0.35, tip.z,
        rnd(1.4, 1.9), rnd(1.3, 1.8), rnd(1.4, 1.9), i * 6.1, fol, folLo, 0.5);
    }
    return { w: 4.8, h: 8.6 };
  };

  return [oak, poplar, plane, stonePine, birch];
}

/**
 * Five alpine-theme conifers. The old version was three stacked smooth
 * ConeGeometries, which is a Christmas-tree decoration, not a spruce: real
 * ones are a bare spar carrying ragged DROOPING tiers with sky between them,
 * pinched into a thin spire at the top.
 */
function coniferSpecies() {
  const tiered = (cfg) => (buf) => {
    const bark = barkRamp(cfg.barkLo, cfg.barkHi);
    const fol = lin(cfg.fol);
    const mul = (k) => [fol[0] * k, fol[1] * k, fol[2] * k];
    // `und` was 0.34: an alpine camera sits BELOW most of these tiers, so it
    // sees mostly undersides, and at 0.34 of an already-dark spruce green they
    // crushed to near-black spikes. Real shaded needles still catch sky bounce.
    const top = mul(1.20), tip = mul(0.92), und = mul(0.62);
    const H = cfg.h, r0 = cfg.r0;
    const t = sway(0, 0, rnd(-0.3, 0.3), H, 5, 0.22);
    addTube(buf, t, [r0, r0 * 0.78, r0 * 0.58, r0 * 0.42, r0 * 0.28, cfg.r1], 6, bark, 0.22);
    // Tiers start well above the ground (a spruce is bare for its first few
    // metres) and their radius falls on a CONVEX curve — a linear taper is
    // just a cone again, which is what the old stacked-cone pines were.
    const y0 = H * cfg.gap;
    for (let i = 0; i < cfg.tiers; i++) {
      const f = i / (cfg.tiers - 1);
      const y = y0 + (H * 0.94 - y0) * f;
      const r = cfg.tipR + (cfg.maxR - cfg.tipR) * Math.pow(1 - f, 1.25);
      addTier(buf, y, r, cfg.droop * (0.5 + (1 - f) * 0.9), cfg.n,
        i * 1.37 + 0.4, top, tip, und);
    }
    // The leader spire above the top tier is what actually makes a conifer
    // read as a conifer on a horizon.
    addTier(buf, H * 0.985, cfg.tipR * 0.55, 0.35, 9, 3.1, top, tip, und);
    return { w: cfg.maxR * 2.1, h: H * 1.02 };
  };

  const spruce = tiered({ h: 15.0, r0: 0.52, r1: 0.08, tiers: 14, maxR: 2.9, tipR: 0.34, droop: 0.78, n: 17, fol: 0x3f5f33, barkLo: 0x4a3428, barkHi: 0x60483a, gap: 0.16 });
  const fir = tiered({ h: 11.2, r0: 0.58, r1: 0.10, tiers: 12, maxR: 3.4, tipR: 0.40, droop: 0.46, n: 19, fol: 0x36552f, barkLo: 0x4e3b2c, barkHi: 0x655041, gap: 0.12 });
  const young = tiered({ h: 5.6, r0: 0.26, r1: 0.06, tiers: 9, maxR: 1.7, tipR: 0.26, droop: 0.34, n: 15, fol: 0x41633f, barkLo: 0x53402f, barkHi: 0x6a563f, gap: 0.10 });
  const larch = tiered({ h: 13.4, r0: 0.44, r1: 0.08, tiers: 10, maxR: 2.3, tipR: 0.30, droop: 0.62, n: 15, fol: 0x6a7a37, barkLo: 0x5b4a35, barkHi: 0x7a6a52, gap: 0.30 });

  // A standing dead snag. Some fraction of any real timberline stand is dead
  // wood, and it is the cheapest possible break in a wall of green.
  const snag = (buf) => {
    const bark = barkRamp(0x776d5e, 0x9a9184);
    const h = rnd(7.5, 10.5);
    const t = sway(0, 0, rnd(-0.5, 0.5), h, 5, 0.30);
    addTube(buf, t, [0.42, 0.35, 0.28, 0.22, 0.15, 0.06], 6, bark, 0.30);
    for (let i = 0; i < 4; i++) {
      limb(buf, new THREE.Vector3(0, 2.4 + i * 1.7, 0), i * 1.9 + rnd(0, 0.8),
        rnd(-0.15, 0.45), rnd(0.9, 1.9), 0.11, bark);
    }
    return { w: 3.0, h };
  };

  return [spruce, fir, young, larch, snag];
}

// ---------------------------------------------------------------------------
// Card tiers
// ---------------------------------------------------------------------------

// (yaw°, tilt°, x, y, z, w, h, atlas cell, exposure). Positive tilt aims the
// card's normal DOWN — those are the skirt cards under the crown and they are
// deliberately dark. Negative tilt aims it at the sky. Four of the nine are
// tilted so the canopy still reads as a volume from a camera above it.
const MID_BROAD = [
  [10, 0, 0, 8.0, 0, 8.0, 7.6, 0, 1.00],
  [68, 0, 0, 7.6, 0, 7.4, 7.2, 1, 0.92],
  [128, 0, 0, 8.3, 0, 7.0, 6.8, 2, 0.96],
  [35, -55, 0.9, 10.2, -0.6, 6.0, 5.2, 3, 1.14],
  [150, -40, -1.1, 9.7, 0.8, 5.4, 4.6, 0, 1.06],
  [95, 48, 1.3, 6.4, 1.0, 5.6, 4.4, 6, 0.60],
  [20, 52, -1.4, 6.1, -1.2, 5.2, 4.2, 6, 0.56],
  [110, 18, 1.6, 8.6, -1.4, 4.6, 4.2, 1, 0.86],
  [165, -20, -1.7, 8.9, 1.3, 4.4, 4.0, 3, 0.98],
];

const MID_CONIC = [
  [5, 0, 0, 8.0, 0, 6.4, 12.0, 0, 1.00],
  [62, 0, 0, 7.6, 0, 6.0, 11.4, 1, 0.94],
  [124, 0, 0, 8.2, 0, 5.6, 11.0, 3, 0.90],
  [30, 62, 0.8, 4.2, 0.6, 5.4, 2.6, 4, 0.58],
  [140, 58, -0.9, 5.7, -0.7, 4.6, 2.3, 4, 0.64],
  [85, 55, 0.7, 7.6, -0.8, 3.8, 2.0, 5, 0.72],
  [200, 52, -0.6, 9.6, 0.6, 3.0, 1.7, 4, 0.80],
  [15, 48, 0.4, 11.4, 0.4, 2.2, 1.4, 5, 0.90],
  [100, -25, 0, 13.0, 0, 1.8, 2.4, 0, 1.08],
];

function buildCardTier(cells, layout, tint, centreY, span) {
  const buf = newBuf(true);
  for (const c of layout) {
    addCard(buf, {
      cx: c[2], cy: c[3], cz: c[4],
      w: c[5], h: c[6],
      yaw: c[0] * Math.PI / 180, tilt: c[1] * Math.PI / 180,
      cell: cells[c[7]], tint, exposure: c[8],
      centreY, span,
    });
  }
  return toGeometry(buf);
}

/**
 * Far tier: a CROSSED pair of cards, not a single one. A lone static card is
 * a zero-width sliver when the camera lines up with its plane, and half the
 * horizon would blink out through a corner; billboarding it would mean
 * per-frame work for 500 instances.
 */
function buildFarGeometry(cells, tint, cellIdx) {
  const buf = newBuf(true);
  for (const yaw of [0.35, 0.35 + Math.PI / 2]) {
    addCard(buf, {
      cx: 0, cy: 5.4, cz: 0, w: 7.2, h: 10.0,
      yaw, tilt: 0, cell: cells[cellIdx], tint, exposure: 1.0,
      centreY: 5.4, span: 5.0,
    });
  }
  return toGeometry(buf);
}

function buildMidTrunk(h, r0, r1) {
  const buf = newBuf(false);
  const bark = barkRamp(0x40311f, 0x574432);
  addTube(buf, [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.06, h * 0.5, 0.04),
    new THREE.Vector3(0, h, 0),
  ], [r0, (r0 + r1) * 0.5, r1], 5, bark, 0.2);
  return toGeometry(buf);
}

// ---------------------------------------------------------------------------
// Placement
// ---------------------------------------------------------------------------

/**
 * Stands, not a field. Each stand is an ELLIPSE with its own orientation (a
 * circle of trees repeated across the map is its own kind of tell), carries a
 * dominant plus a secondary species, and shares one colour tint so the copse
 * reads as a single wood with meadow between it and the next.
 */
function makeStands(count, extent, weights) {
  const nSpecies = weights.length;
  const stands = [];
  // Fewer, bigger stands than the old count/26 at 15-58 m: the F1-derived
  // circuits sit in real woodland (Monza's park, the Ardennes round Spa), so
  // most of the sites have to land in a few large blocks of forest with
  // meadow between them, not in copses scattered over a lawn.
  const n = Math.max(7, Math.round(count / 200));
  for (let i = 0; i < n; i++) {
    const rot = rand() * Math.PI;
    const rx = rnd(28, 110);
    const dom = weightedPick(weights);
    let sec = weightedPick(weights);
    if (sec === dom) sec = (dom + 1 + ((rand() * (nSpecies - 1)) | 0)) % nSpecies;
    stands.push({
      x: rnd(-extent, extent), z: rnd(-extent, extent),
      rx, rz: rx * rnd(0.42, 1.0), cos: Math.cos(rot), sin: Math.sin(rot),
      dom, sec,
      // Stand tint as a LINEAR multiplier around 1 — see the header note on
      // why setHSL lightness values are not usable as tints here.
      tint: standTint(),
    });
  }
  return stands;
}

// Late-summer variation: olive, yellow-green, deep and blue-green, kept as a
// gentle multiplier so the atlas keeps carrying the actual leaf colour.
// These multiply the canopy atlas, which is already a fairly light summer
// green so that the alpha-cutout edges do not go black. Multiplying by ~1.0
// left whole stands reading as pale yellow umbrellas against the grass, so the
// families sit UNDER 1 and the "turning" family is pulled back from its
// near-chartreuse 1.10/1.02/0.72.
const TINT_FAMILIES = [
  [0.90, 0.94, 0.84],   // neutral green
  [1.00, 0.92, 0.60],   // yellow / turning
  [0.82, 0.92, 0.66],   // olive
  [0.70, 0.88, 0.82],   // blue-green
  [0.72, 0.80, 0.66],   // deep shade
];

function standTint() {
  const f = pick(TINT_FAMILIES);
  const b = rnd(0.86, 1.14);
  return [f[0] * b, f[1] * b, f[2] * b];
}

// ---------------------------------------------------------------------------

/**
 * @param {THREE.Object3D} scene   track group to add the meshes to
 * @param {Array} frames           centreline frames (pos/tan/left)
 * @param {object} opts
 *   type    - 'broadleaf' | 'pine'
 *   count   - trees to place
 *   band    - [nearMin, extent] in metres
 *   nearMin - minimum distance from the centreline (overrides band[0])
 *   terrain - terrain object from scenery/terrain.js, or null
 */
export function scatterTrees(scene, frames, opts = {}) {
  const type = opts.type === 'pine' ? 'pine' : 'broadleaf';
  const count = opts.count || 600;
  const band = opts.band || [35, 800];
  const nearMin = opts.nearMin ?? band[0] ?? 35;
  const extent = band[1] ?? 800;
  const terrain = opts.terrain || null;
  // Slope rejection: broadleaf woodland does not grow on a scree face,
  // conifers happily do. Without this the stands walk up the new rolling
  // ground and lean out of the hillside.
  const maxSlope = type === 'pine' ? 0.95 : 0.5;
  // Aerial perspective for the far tier. The circuit's fog colour is not set
  // on the scene until after the scenery is built, so it is keyed off the
  // theme here: warm haze for parkland, cold for the alpine pass.
  const haze = type === 'pine' ? [1.02, 1.06, 1.12] : [1.12, 1.06, 0.92];

  const { tex, cells } = makeCanopyAtlas(type);

  const woodMat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.94, metalness: 0,
    // Low: bark and clump interiors should live off the sun and the hemisphere
    // fill. Cranking this is how wood turns into wet plastic under a PMREM sky.
    envMapIntensity: 0.22,
  });
  const leafMat = new THREE.MeshStandardMaterial({
    map: tex,
    vertexColors: true,
    alphaTest: 0.28,
    // FrontSide, NOT DoubleSide: every card is emitted as a mirrored quad pair
    // sharing one canopy-outward normal, so there is no backface normal flip.
    side: THREE.FrontSide,
    // roughness 1.0 is load-bearing. The dielectric specular is the only thing
    // that survives on a dark albedo, and at golden hour it is warm and
    // desaturated — the "pale tan cardboard" in the baseline shots.
    roughness: 1.0, metalness: 0,
    envMapIntensity: 0.30,
  });

  // ---- Species ----
  const builders = type === 'pine' ? coniferSpecies() : broadleafSpecies();
  // The card tiers are authored at one nominal size, so each species' own
  // canopy dimensions become the width/height factors its card trees inherit.
  // That is what keeps a poplar tall and thin and a stone pine wide and squat
  // once they cross into the card LODs, instead of every distant tree being
  // the same proportioned blob at a different scale.
  const NOM_W = type === 'pine' ? 6.4 : 8.5;
  const NOM_H = type === 'pine' ? 14.0 : 11.5;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const species = builders.map((build) => {
    const buf = newBuf(false);
    const info = build(buf) || {};
    return {
      geo: toGeometry(buf),
      wf: clamp((info.w || NOM_W) / NOM_W, 0.5, 1.35),
      hf: clamp((info.h || NOM_H) / NOM_H, 0.5, 1.35),
      weight: info.weight ?? 1,
    };
  });
  const weights = species.map((s) => s.weight);

  // ---- Sites ----
  // Distance to the centreline, rasterised once on a 6 m grid so the site
  // search is O(1) per candidate. With ten thousand trees and eight tries
  // each, the old per-candidate sweep over 650 frames was the whole build.
  const distToTrack = (() => {
    const CELL = 6;
    const half = extent + 40;
    const N = Math.ceil((2 * half) / CELL) + 1;
    const grid = new Float32Array(N * N).fill(1e9);
    const rad = Math.ceil(160 / CELL);
    for (let k = 0; k < frames.length; k += 2) {
      const p = frames[k].pos;
      const ci = Math.round((p.x + half) / CELL), cj = Math.round((p.z + half) / CELL);
      for (let j = Math.max(0, cj - rad); j <= Math.min(N - 1, cj + rad); j++) {
        const dz = j * CELL - half - p.z;
        for (let i = Math.max(0, ci - rad); i <= Math.min(N - 1, ci + rad); i++) {
          const dx = i * CELL - half - p.x;
          const d = dx * dx + dz * dz;
          const o = j * N + i;
          if (d < grid[o]) grid[o] = d;
        }
      }
    }
    return (x, z) => {
      const i = Math.round((x + half) / CELL), j = Math.round((z + half) / CELL);
      if (i < 0 || j < 0 || i >= N || j >= N) return 1e4;
      const d = grid[j * N + i];
      return d >= 1e9 ? 161 : Math.sqrt(d);   // beyond the raster radius: far enough
    };
  })();

  const stands = makeStands(count, extent, weights);
  const sites = [];
  const maxTries = count * 8;
  for (let i = 0; i < maxTries && sites.length < count; i++) {
    let x, z, st = null;
    if (rand() < 0.84) {
      st = stands[(rand() * stands.length) | 0];
      // Gaussian-ish radius so the stand has a dense heart and a ragged edge.
      const a = rand() * Math.PI * 2;
      const rad = (rand() + rand() + rand()) / 3;
      const lx = Math.cos(a) * rad * st.rx, lz = Math.sin(a) * rad * st.rz;
      x = st.x + lx * st.cos - lz * st.sin;
      z = st.z + lx * st.sin + lz * st.cos;
    } else {
      x = rnd(-extent, extent);
      z = rnd(-extent, extent);
    }
    if (Math.abs(x) > extent || Math.abs(z) > extent) continue;

    const d = distToTrack(x, z);
    if (d < nearMin) continue;
    // Thin gently with distance so the wood hands off to the horizon rather
    // than stopping at a wall; the far tier is cheap, so the taper is mild.
    if (d > 160 && rand() < ((d - 160) / Math.max(1, extent - 160)) * 0.35) continue;

    let y = 0;
    if (terrain) {
      if (terrain.slope(x, z) > maxSlope) continue;
      y = terrain.height(x, z);
    }

    // Two-thirds of a stand is its dominant species and most of the rest its
    // secondary, so a copse reads as one wood rather than an arboretum.
    const spIdx = st
      ? (rand() < 0.66 ? st.dom : (rand() < 0.82 ? st.sec : weightedPick(weights)))
      : weightedPick(weights);
    const tint = st ? st.tint : standTint();
    sites.push({ x, y, z, d, sp: spIdx, tint });
  }

  // Nearest first, so the near-geometry budget is spent where the camera is.
  sites.sort((a, b) => a.d - b.d);

  const nearOf = [];
  for (let i = 0; i < species.length; i++) nearOf.push([]);
  const mid = [], far = [];
  let nearUsed = 0;
  for (const s of sites) {
    if (s.d < NEAR_D && nearUsed < NEAR_CAP) { nearOf[s.sp].push(s); nearUsed++; }
    else if (s.d < MID_D) mid.push(s);
    else far.push(s);
  }

  const m4 = new THREE.Matrix4();
  const quat = new THREE.Quaternion();
  const eul = new THREE.Euler();
  const scl = new THREE.Vector3();
  const pos = new THREE.Vector3();
  const col = new THREE.Color();

  // ---- NEAR: real geometry, one instanced mesh per species ----
  for (let i = 0; i < species.length; i++) {
    const list = nearOf[i];
    if (!list.length) continue;
    const inst = new THREE.InstancedMesh(species[i].geo, woodMat, list.length);
    inst.castShadow = true;
    inst.receiveShadow = true;
    inst.name = `trees-near-${i}`;
    for (let k = 0; k < list.length; k++) {
      const s = list[k];
      // Separate width and height scale plus a real lean: three parameters is
      // enough that no two of the ~60 instances of a species read as the same
      // tree at a different size.
      const g = rnd(0.74, 1.32);
      const lean = rnd(0.02, 0.075);
      eul.set(Math.sin(rand() * 6.28) * lean, rand() * Math.PI * 2,
              Math.cos(rand() * 6.28) * lean, 'YXZ');
      quat.setFromEuler(eul);
      scl.set(g * rnd(0.84, 1.18), g * rnd(0.88, 1.20), g * rnd(0.84, 1.18));
      pos.set(s.x, s.y - 0.18, s.z);
      m4.compose(pos, quat, scl);
      inst.setMatrixAt(k, m4);
      // setRGB writes the LINEAR working space directly, so these really are
      // ~1.0 multipliers. setHSL would have silently applied an sRGB decode
      // and crushed the albedo — that bug is the whole reason for this module.
      // The stand tint is damped to 85% here because a near tree's instance
      // colour also multiplies its BARK, and the foliage hue belongs to the
      // leaves; the five species already carry distinct baked greens.
      const b = rnd(0.88, 1.10);
      col.setRGB((1 + (s.tint[0] - 1) * 0.85) * b,
                 (1 + (s.tint[1] - 1) * 0.85) * b,
                 (1 + (s.tint[2] - 1) * 0.85) * b);
      inst.setColorAt(k, col);
    }
    inst.instanceMatrix.needsUpdate = true;
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
    inst.computeBoundingSphere();
    scene.add(inst);
  }

  // ---- MID: crossed/tilted cards over a simple trunk ----
  if (mid.length) {
    const layout = type === 'pine' ? MID_CONIC : MID_BROAD;
    const centreY = type === 'pine' ? 8.2 : 8.4;
    const cardGeo = buildCardTier(cells, layout, [1, 1, 1], centreY, type === 'pine' ? 5.4 : 3.6);
    const trunkGeo = buildMidTrunk(type === 'pine' ? 6.0 : 4.4, 0.34, 0.19);

    const cardInst = new THREE.InstancedMesh(cardGeo, leafMat, mid.length);
    const trunkInst = new THREE.InstancedMesh(trunkGeo, woodMat, mid.length);
    cardInst.name = 'trees-mid-cards';
    trunkInst.name = 'trees-mid-trunks';
    // Beyond ~90 m nothing is inside the sun's ±90 m shadow frustum, so making
    // these cast is pure shadow-map cost for zero pixels. (The old scatter had
    // castShadow on all 1300 trees.)
    cardInst.castShadow = false;
    trunkInst.castShadow = false;
    trunkInst.receiveShadow = true;
    // alphaTest cards MUST skip the GTAO prepass: its override material
    // ignores alphaTest and each card would draw as an opaque grey rectangle
    // into the AO buffer.
    hideFromOverridePasses(cardInst);

    for (let k = 0; k < mid.length; k++) {
      const s = mid[k];
      const sp = species[s.sp];
      const g = rnd(0.58, 1.22);
      const wf = sp.wf, hf = sp.hf;
      // Mirroring in x flips the sampled canopy image for free. The normal
      // matrix is unaffected by a single-axis mirror on an axis-aligned card
      // pair, and both windings already exist, so nothing about the shading or
      // the culling changes.
      const mir = rand() < 0.5 ? -1 : 1;
      quat.setFromEuler(eul.set(0, rand() * Math.PI * 2, 0, 'YXZ'));
      scl.set(mir * g * wf * rnd(0.86, 1.16), g * hf * rnd(0.88, 1.16), g * wf * rnd(0.86, 1.16));
      pos.set(s.x, s.y - 0.1, s.z);
      m4.compose(pos, quat, scl);
      cardInst.setMatrixAt(k, m4);
      trunkInst.setMatrixAt(k, m4);
      const b = rnd(0.86, 1.12);
      col.setRGB(s.tint[0] * b, s.tint[1] * b, s.tint[2] * b);
      cardInst.setColorAt(k, col);
      col.setRGB(0.92 * b, 0.92 * b, 0.92 * b);
      trunkInst.setColorAt(k, col);
    }
    cardInst.instanceMatrix.needsUpdate = true;
    trunkInst.instanceMatrix.needsUpdate = true;
    if (cardInst.instanceColor) cardInst.instanceColor.needsUpdate = true;
    if (trunkInst.instanceColor) trunkInst.instanceColor.needsUpdate = true;
    cardInst.computeBoundingSphere();
    trunkInst.computeBoundingSphere();
    scene.add(trunkInst);
    scene.add(cardInst);
  }

  // ---- FAR: one crossed card pair, graded into the haze ----
  if (far.length) {
    const geo = buildFarGeometry(cells, [1, 1, 1], 7);
    const inst = new THREE.InstancedMesh(geo, leafMat, far.length);
    inst.name = 'trees-far';
    inst.castShadow = false;
    hideFromOverridePasses(inst);
    const span = Math.max(1, extent - MID_D);
    for (let k = 0; k < far.length; k++) {
      const s = far[k];
      const sp = species[s.sp];
      const g = rnd(0.62, 1.20);
      const wf = sp.wf, hf = sp.hf;
      const mir = rand() < 0.5 ? -1 : 1;
      quat.setFromEuler(eul.set(0, rand() * Math.PI * 2, 0, 'YXZ'));
      scl.set(mir * g * wf * rnd(0.85, 1.18), g * hf * rnd(0.85, 1.20), g * wf * rnd(0.85, 1.18));
      pos.set(s.x, s.y - 0.2, s.z);
      m4.compose(pos, quat, scl);
      inst.setMatrixAt(k, m4);
      // Aerial perspective: lerp the stand tint toward the haze with distance.
      // Capped at 0.4 on purpose — pushing it further is exactly how the
      // baseline ended up with tan rectangles on the horizon.
      const t = Math.min(0.4, 0.12 + 0.28 * ((s.d - MID_D) / span));
      const b = rnd(0.90, 1.14);
      col.setRGB(
        (s.tint[0] + (haze[0] - s.tint[0]) * t) * b,
        (s.tint[1] + (haze[1] - s.tint[1]) * t) * b,
        (s.tint[2] + (haze[2] - s.tint[2]) * t) * b);
      inst.setColorAt(k, col);
    }
    inst.instanceMatrix.needsUpdate = true;
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
    inst.computeBoundingSphere();
    scene.add(inst);
  }

  // Unused species geometries would leak on a track switch — dispose() only
  // walks what is in the group.
  for (let i = 0; i < species.length; i++) {
    if (!nearOf[i].length) species[i].geo.dispose();
  }
}
