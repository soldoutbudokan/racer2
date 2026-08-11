/**
 * Ground cover — the mid-detail layer between the barrier and the tree line.
 *
 * Before this module the strip from the run-off edge out to the treeline was
 * bare terrain: one flat green sheet with trees standing on it. That single
 * empty band is what made every trackside shot read as a diorama, because at
 * cockpit height it is most of the frame.
 *
 * What goes where is banded by TRUE distance to the circuit (not by the local
 * frame's lateral offset — a point 15 m left of one frame can be sitting on
 * the road three corners later, which is the bug that once put buttes on the
 * guardrail):
 *
 *   0-40 m   unmown rough: grass tufts (alpha-cutout cards), densest right at
 *            the run-off edge, thinning outward. This is the eye-level cue.
 *   3-80 m   wildflower / dry-grass colour drifts, in patches of one colour.
 *   8-150 m  low shrubs and bramble clumps, in irregular drifts.
 *   24 m+    field structure: hedgerows and post-and-wire fences on authored
 *            meandering lines, with gateways and five-bar gates; telegraph
 *            poles with sagging wires; a farm track or two.
 *
 * The field structure is what makes the rolling terrain legible. A bare
 * displaced mesh has no scale reference, so it reads as a smooth bedsheet; a
 * hedge line rising and dipping over the same ground reads as hills. Every
 * hedge segment is therefore seated AND pitched on `terrain.height`.
 *
 * Budget discipline: six meshes total (five on alpine), all instanced or
 * merged. Draw calls, not triangles, are this project's constraint.
 *
 *   tufts | flowers | shrubs | hedges-or-boulders | merged timber/wire | tracks
 *
 * 'sand' returns early (addScrub already owns the desert) and 'city' returns
 * early (there is no rough on a street circuit).
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { fractalNoise, smoothstep, hideFromOverridePasses } from './noise.js';
import { rand } from './rng.js';

// ---------------------------------------------------------------------------
// Authored layout data
//
// These are hand-drawn lines, not generated ones. They live in a normalised
// [-1,1] frame that is stretched onto whatever circuit is being built, so a
// long thin venue gets long thin fields and a square one gets square fields,
// while the character of each line — where it kinks, where it doglegs round a
// corner of a field, how it meanders — is authored. Point spacing is
// deliberately uneven: evenly spaced control points are exactly what makes a
// boundary look machine-made.
// ---------------------------------------------------------------------------

// style: 'hedge'  mostly hedgerow with the odd fenced stretch (enclosure land)
//        'fence'  mostly post-and-wire with hedge stubs (pasture / open land)
const FIELD_LINES = [
  // West boundary, stepping out at every field corner as it runs north.
  { style: 'hedge', pts: [[-0.95, -0.82], [-0.88, -0.55], [-0.90, -0.34], [-0.79, -0.13],
                          [-0.81, 0.11], [-0.70, 0.33], [-0.73, 0.58], [-0.62, 0.79], [-0.58, 0.95]] },
  // Long headland across the north, sagging in the middle where the ground falls.
  { style: 'hedge', pts: [[-0.86, 0.72], [-0.55, 0.80], [-0.22, 0.74], [0.09, 0.83],
                          [0.41, 0.78], [0.68, 0.86], [0.92, 0.80]] },
  // Diagonal drove splitting two big fields on the east side.
  { style: 'fence', pts: [[0.96, 0.52], [0.74, 0.36], [0.63, 0.12], [0.66, -0.14], [0.52, -0.38]] },
  // East boundary with a pronounced dogleg round a wet corner.
  { style: 'hedge', pts: [[0.88, -0.90], [0.83, -0.62], [0.90, -0.41], [0.79, -0.22],
                          [0.85, 0.02], [0.77, 0.27], [0.83, 0.49]] },
  // South boundary — the oldest line here, wandering the way a stream does.
  { style: 'hedge', pts: [[-0.74, -0.88], [-0.47, -0.79], [-0.30, -0.89], [-0.02, -0.81],
                          [0.19, -0.90], [0.46, -0.80], [0.71, -0.87]] },
  // Short spur running inland off the south boundary to a copse.
  { style: 'fence', pts: [[-0.30, -0.86], [-0.34, -0.66], [-0.26, -0.50], [-0.31, -0.36]] },
  // Three sides of a stock paddock tucked behind the west boundary.
  { style: 'fence', pts: [[-0.66, 0.16], [-0.44, 0.20], [-0.40, 0.42], [-0.61, 0.45], [-0.66, 0.30]] },
  // A ridge fence: nearly straight, because someone fenced along a contour.
  { style: 'fence', pts: [[-0.14, 0.94], [-0.10, 0.70], [-0.13, 0.47], [-0.06, 0.26]] },
  // Far south-west boundary, mostly out at the fog line.
  { style: 'hedge', pts: [[-0.97, -0.30], [-0.92, -0.52], [-0.96, -0.74], [-0.83, -0.93]] },
];

// Telegraph routes follow a lane, so they are straighter than a field boundary
// and bend only at junctions.
const POLE_ROUTES = [
  [[-0.98, -0.20], [-0.72, -0.15], [-0.44, -0.18], [-0.16, -0.12], [0.16, -0.16], [0.48, -0.10], [0.80, -0.14], [0.99, -0.08]],
  [[0.20, 0.98], [0.26, 0.68], [0.31, 0.36], [0.29, 0.04], [0.36, -0.30], [0.33, -0.62], [0.40, -0.95]],
  [[-0.95, 0.62], [-0.66, 0.55], [-0.38, 0.60], [-0.20, 0.42], [-0.22, 0.12], [-0.12, -0.16], [-0.16, -0.48]],
];

// Farm tracks: a rutted lane to a gateway, and a headland track along a field.
const TRACK_ROUTES = [
  [[-0.99, 0.34], [-0.78, 0.31], [-0.60, 0.38], [-0.44, 0.30], [-0.34, 0.36]],
  [[0.99, -0.56], [0.80, -0.50], [0.62, -0.57], [0.46, -0.49]],
  [[-0.52, -0.98], [-0.50, -0.76], [-0.58, -0.60], [-0.49, -0.44]],
];

// ---------------------------------------------------------------------------
// Per-ground palettes. Under an 11-degree sun with ACES tone mapping, dark
// albedos crush to black on anything facing up, so every "dark" green here is
// deliberately lighter than the colour it is meant to read as.
// ---------------------------------------------------------------------------
const PALETTES = {
  grass: {
    tuftHue: [0.20, 0.30], tuftSat: [0.24, 0.46], tuftLum: [0.21, 0.34],
    strawFrac: 0.20,
    shrub: [0.24, 0.32], shrubSat: [0.26, 0.46], shrubLum: [0.12, 0.21],
    hedge: 0x4a5a2c,
    flowers: [0xe6c848, 0xe4e2d4, 0xb2452e, 0x8d7bbc, 0xd8c98e],
    dry: 0xc7ac6c,
  },
  alpine: {
    // High pasture: shorter, bluer, more olive than lowland grass.
    tuftHue: [0.18, 0.27], tuftSat: [0.16, 0.34], tuftLum: [0.19, 0.31],
    strawFrac: 0.30,
    shrub: [0.26, 0.34], shrubSat: [0.20, 0.38], shrubLum: [0.10, 0.18],
    hedge: 0x3f4d2e,
    flowers: [0x8f92cc, 0xe0e4dc, 0xd9c65a, 0xb2733f, 0xc8b6a0],
    dry: 0xbfae87,
  },
};

// ---------------------------------------------------------------------------
// Textures
// ---------------------------------------------------------------------------

/**
 * 2x2 atlas of four different grass tufts. Four silhouettes is the cheapest
 * cure for "the same card stamped 5000 times": the crossed pair in one tuft
 * samples two DIFFERENT cells, so no two faces of an instance match and the
 * clump reads as a tussock rather than an X of identical cards.
 *
 * Blades are filled opaque so alphaTest gets a crisp edge; the only partial
 * alpha is the antialiased rim, which erodes gracefully in the mip chain (and
 * that erosion is what fades distant tufts out — free LOD).
 */
function makeTuftTexture(pal) {
  const size = 256, half = size / 2;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, size, size);

  for (let cell = 0; cell < 4; cell++) {
    const ox = (cell % 2) * half;
    const oy = ((cell / 2) | 0) * half;
    const blades = 15 + Math.floor(rand() * 11);
    // One cell is deliberately sparse and one deliberately dense.
    const bias = [1.0, 0.65, 1.35, 0.9][cell];
    for (let b = 0; b < blades * bias; b++) {
      const bx = ox + half * (0.5 + (rand() - 0.5) * 0.42);
      const by = oy + half * 0.975;
      const lean = (rand() - 0.5) * 1.05;
      const len = half * (0.32 + rand() * 0.56) * bias;
      const tipX = Math.min(ox + half - 5, Math.max(ox + 5, bx + lean * len));
      const tipY = Math.max(oy + 5, by - len);
      const cx = bx + lean * len * 0.30;
      const cy = by - len * 0.60;
      const w = half * (0.019 + rand() * 0.020);

      const straw = rand() < pal.strawFrac;
      const g = ctx.createLinearGradient(bx, by, tipX, tipY);
      if (straw) {
        g.addColorStop(0, 'rgb(74,62,32)');
        g.addColorStop(0.5, 'rgb(140,122,66)');
        g.addColorStop(1, 'rgb(196,178,110)');
      } else {
        const hj = Math.floor(rand() * 22);
        g.addColorStop(0, `rgb(${34 + hj},${44 + hj},${18})`);
        g.addColorStop(0.55, `rgb(${64 + hj},${92 + hj},${34})`);
        g.addColorStop(1, `rgb(${118 + hj},${146 + hj},${62})`);
      }
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(bx - w, by);
      ctx.quadraticCurveTo(cx - w * 0.6, cy, tipX, tipY);
      ctx.quadraticCurveTo(cx + w * 0.6, cy, bx + w, by);
      ctx.closePath();
      ctx.fill();
    }
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/**
 * Flower / seedhead spray on near-white so the per-instance colour does all
 * the tinting: one texture serves buttercup drifts, ox-eye drifts and dry
 * seedhead patches.
 */
function makeFlowerTexture() {
  const size = 128;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, size, size);

  // stems first, so the heads sit on top of them
  ctx.strokeStyle = 'rgb(96,110,58)';
  ctx.lineWidth = 1.6;
  const heads = [];
  for (let i = 0; i < 26; i++) {
    const bx = size * (0.5 + (rand() - 0.5) * 0.7);
    const by = size * 0.99;
    const hx = Math.min(size - 6, Math.max(6, bx + (rand() - 0.5) * size * 0.42));
    const hy = size * (0.12 + rand() * 0.62);
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.quadraticCurveTo((bx + hx) / 2 + (rand() - 0.5) * 8, (by + hy) / 2, hx, hy);
    ctx.stroke();
    heads.push({ x: hx, y: hy, r: 2.6 + rand() * 3.4 });
  }
  for (const h of heads) {
    const g = ctx.createRadialGradient(h.x, h.y, 0.4, h.x, h.y, h.r);
    g.addColorStop(0, 'rgba(255,255,250,1)');
    g.addColorStop(0.6, 'rgba(238,236,222,1)');
    g.addColorStop(1, 'rgba(214,212,196,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(h.x, h.y, h.r, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Two worn wheel ruts with a grassy strip up the middle. */
function makeFarmTrackTexture(ground) {
  const w = 64, h = 256;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const dirt = ground === 'alpine' ? [128, 124, 112] : [122, 104, 76];
  const img = ctx.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const u = x / w;
      // ruts at u = 0.26 and 0.74; grass crown between them and at the edges
      const rut = Math.max(
        Math.exp(-((u - 0.26) * (u - 0.26)) / 0.006),
        Math.exp(-((u - 0.74) * (u - 0.74)) / 0.006));
      const edge = smoothstep(0.34, 0.06, Math.min(u, 1 - u));
      const crown = Math.exp(-((u - 0.5) * (u - 0.5)) / 0.004);
      const grass = Math.max(edge, crown * 0.75) * (1 - rut * 0.8);
      const n = fractalNoise(x / w * 7, y / h * 26, 4);
      const shade = 0.72 + n * 0.5;
      const r = (dirt[0] * (1 - grass) + 78 * grass) * shade;
      const g = (dirt[1] * (1 - grass) + 92 * grass) * shade;
      const b = (dirt[2] * (1 - grass) + 44 * grass) * shade;
      const i = (y * w + x) * 4;
      img.data[i] = Math.min(255, r);
      img.data[i + 1] = Math.min(255, g);
      img.data[i + 2] = Math.min(255, b);
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}

// ---------------------------------------------------------------------------
// Placement helpers
// ---------------------------------------------------------------------------

// Distance from a ground point to the nearest sampled centreline frame. Same
// contract as track.js's own copy: this is the WHOLE-circuit clearance test,
// and every placement in this file goes through it.
function distToTrack(frames, x, z) {
  let min = Infinity;
  for (let k = 0; k < frames.length; k += 2) {
    const p = frames[k].pos;
    const d = (p.x - x) * (p.x - x) + (p.z - z) * (p.z - z);
    if (d < min) min = d;
  }
  return Math.sqrt(min);
}

// Even-odd crossing test against the closed centreline polygon. Farmland in a
// circuit's infield reads wrong — the infield of a real venue is mown grass,
// service roads and gravel — so hedges, fences, poles and farm tracks are
// pushed outside the lap while the rough (tufts, shrubs, flowers) is not.
function insideCircuit(frames, x, z) {
  let inside = false;
  const n = frames.length;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = frames[i].pos.x, zi = frames[i].pos.z;
    const xj = frames[j].pos.x, zj = frames[j].pos.z;
    if ((zi > z) !== (zj > z) &&
        x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) inside = !inside;
  }
  return inside;
}

/**
 * Keep-out for the start-straight infrastructure. addPitComplex builds its
 * model with local +z along the start tangent and local -x on the pit side,
 * and `g.rotation.y = atan2(tan.x, tan.z)` maps local -x onto +left — so the
 * apron, pit wall and garages occupy the +left side of frames[0] from ~60 m
 * before the line to ~120 m after it. Grass growing through a 150 m concrete
 * apron would be the most obvious error this module could make.
 */
function makeKeepOut(frames, D) {
  const f0 = frames[0];
  const ox = f0.pos.x, oz = f0.pos.z;
  const tx = f0.tan.x, tz = f0.tan.z;
  const lx = f0.left.x, lz = f0.left.z;
  const latMax = D.armco + 44;
  return function keepOut(x, z) {
    const rx = x - ox, rz = z - oz;
    const along = rx * tx + rz * tz;
    if (along < -66 || along > 126) return false;
    const lat = rx * lx + rz * lz;
    return lat > -2 && lat < latMax;
  };
}

/**
 * Conservative seating height.
 *
 * `terrain.height()` is a smooth field, but the terrain MESH is a grid (11 m
 * cells over the track bbox, growing geometrically outward) whose triangles
 * CHORD across that field. On a crest the rendered ground therefore sits up to
 * ~0.4 m BELOW the field, and anything seated exactly on `height()` floats
 * with daylight under it — which is precisely how a hedge line stops reading
 * as part of the ground.
 *
 * The correction is CURVATURE, not slope: on a plain slope the mesh chord IS
 * the field and nothing should move, so comparing against the mean of a small
 * stencil (not its minimum) is what gives a drop on a crest, zero on a planar
 * slope, and zero in a hollow — where the mesh already stands above the field
 * and the object is buried rather than floating. A naive stencil-min instead
 * sinks everything on steep ground by slope x E, which on the alpine relief
 * buried the farm track two metres under the hillside.
 */
function makeSeat(terrain) {
  const E = 5.5;      // half a fine terrain cell
  return function seat(x, z) {
    const h = terrain.height(x, z);
    const mean = (terrain.height(x + E, z) + terrain.height(x - E, z) +
                  terrain.height(x, z + E) + terrain.height(x, z - E)) * 0.25;
    return Math.min(h, mean);
  };
}

function circuitStats(frames) {
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity, len = 0;
  for (let i = 0; i < frames.length; i++) {
    const p = frames[i].pos;
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.z < minZ) minZ = p.z;
    if (p.z > maxZ) maxZ = p.z;
    const q = frames[(i + 1) % frames.length].pos;
    len += p.distanceTo(q);
  }
  return {
    minX, maxX, minZ, maxZ, lap: len,
    cx: (minX + maxX) / 2, cz: (minZ + maxZ) / 2,
    hx: (maxX - minX) / 2 + 300,
    hz: (maxZ - minZ) / 2 + 300,
  };
}

function shuffled(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = (rand() * (i + 1)) | 0;
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

/**
 * Clumped scatter through a distance band around the whole circuit.
 *
 * Two rules the owner has already rejected output for: nothing evenly spaced,
 * and nothing at one uniform scale. So placements come in clumps of varying
 * radius with a minority of loners, and the caller varies scale per instance.
 * `bias` > 1 pulls clumps toward the inner edge of the band — for the tufts
 * that is what puts the density at the run-off edge where the mower stops.
 */
function clumpedBand(frames, keepOut, count, cfg) {
  const n = frames.length;
  const clumps = [];
  const want = Math.max(6, Math.round(count / cfg.per));
  for (let i = 0; i < want * 4 && clumps.length < want; i++) {
    const f = frames[(rand() * n) | 0];
    const side = rand() < 0.5 ? 1 : -1;
    const off = cfg.inner + Math.pow(rand(), cfg.bias) * (cfg.outer - cfg.inner);
    const x = f.pos.x + f.left.x * side * off;
    const z = f.pos.z + f.left.z * side * off;
    if (keepOut(x, z)) continue;
    if (distToTrack(frames, x, z) < cfg.inner) continue;
    clumps.push({ x, z, r: cfg.rad[0] + rand() * (cfg.rad[1] - cfg.rad[0]) });
  }
  if (!clumps.length) return [];

  const out = [];
  for (let i = 0; i < count * 5 && out.length < count; i++) {
    let x, z;
    if (rand() < cfg.clumped) {
      const cl = clumps[(rand() * clumps.length) | 0];
      const a = rand() * Math.PI * 2;
      // sum of two uniforms => soft-edged clump instead of a hard disc
      const rad = (rand() + rand()) * 0.5 * cl.r;
      x = cl.x + Math.cos(a) * rad;
      z = cl.z + Math.sin(a) * rad;
    } else {
      const f = frames[(rand() * n) | 0];
      const side = rand() < 0.5 ? 1 : -1;
      const off = cfg.inner + Math.pow(rand(), cfg.bias) * (cfg.outer - cfg.inner);
      x = f.pos.x + f.left.x * side * off;
      z = f.pos.z + f.left.z * side * off;
    }
    if (keepOut(x, z)) continue;
    const d = distToTrack(frames, x, z);
    if (d < cfg.inner || d > cfg.outer * 1.25) continue;
    // Thin with distance so most of the budget lands where the driver is.
    if (rand() > 1 - smoothstep(cfg.inner + cfg.solid, cfg.outer, d) * cfg.fade) continue;
    out.push({ x, z, d });
  }
  return out;
}

// ---------------------------------------------------------------------------
// Small geometry helpers for the merged timber/wire mesh
// ---------------------------------------------------------------------------

function paint(geo, color) {
  const n = geo.getAttribute('position').count;
  const arr = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    // per-vertex grain jitter: free variation on a single-material mesh
    const j = 0.86 + rand() * 0.28;
    arr[i * 3] = color.r * j;
    arr[i * 3 + 1] = color.g * j;
    arr[i * 3 + 2] = color.b * j;
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(arr, 3));
  return geo;
}

/**
 * A wire span as one vertical ribbon: local X along the run, local Y world-up
 * made perpendicular to it, so the quad's normal is horizontal and the ribbon
 * is seen edge-on only from directly above (never from a car). Two triangles
 * instead of the twelve a box would cost, and the shared material is
 * DoubleSide so winding cannot make it disappear.
 */
function wireQuad(p1, p2, thick, color) {
  const dir = new THREE.Vector3().subVectors(p2, p1);
  const len = dir.length();
  if (len < 0.05) return null;
  dir.divideScalar(len);
  const y = new THREE.Vector3(0, 1, 0).addScaledVector(dir, -dir.y);
  if (y.lengthSq() < 1e-6) y.set(1, 0, 0);
  y.normalize();
  const z = new THREE.Vector3().crossVectors(dir, y);
  const m = new THREE.Matrix4().makeBasis(dir, y, z);
  m.setPosition((p1.x + p2.x) / 2, (p1.y + p2.y) / 2, (p1.z + p2.z) / 2);
  const g = new THREE.PlaneGeometry(len, thick);
  g.applyMatrix4(m);
  return paint(g, color);
}

function boxPart(w, h, d, mat4, color) {
  const g = new THREE.BoxGeometry(w, h, d);
  g.applyMatrix4(mat4);
  return paint(g, color);
}

function localMat(base, lx, ly, lz, rotZ = 0) {
  const m = new THREE.Matrix4();
  if (rotZ) m.makeRotationZ(rotZ);
  m.setPosition(lx, ly, lz);
  return new THREE.Matrix4().multiplyMatrices(base, m);
}

/** Resample an authored polyline to roughly-even world spacing. */
function resample(worldPts, spacing) {
  if (worldPts.length < 2) return worldPts;
  const curve = new THREE.CatmullRomCurve3(worldPts, false, 'catmullrom', 0.5);
  const len = curve.getLength();
  const n = Math.max(2, Math.round(len / spacing));
  return curve.getSpacedPoints(n);
}

// ---------------------------------------------------------------------------
// Layer: grass tufts
// ---------------------------------------------------------------------------

function buildTuftGeometry() {
  // Crossed pair, pivot at the base, each quad on a different atlas cell.
  const parts = [];
  const cells = [0, 3];
  for (let k = 0; k < 2; k++) {
    const q = new THREE.PlaneGeometry(1.2, 1.0);
    q.translate(0, 0.5, 0);
    const uv = q.getAttribute('uv');
    const col = cells[k] % 2, row = (cells[k] / 2) | 0;
    // flipY on a CanvasTexture puts canvas row 0 in the UPPER half of v.
    const uOff = col * 0.5, vOff = row === 0 ? 0.5 : 0.0;
    const INSET = 0.006;
    for (let i = 0; i < uv.count; i++) {
      uv.setXY(i,
        uOff + INSET + uv.getX(i) * (0.5 - INSET * 2),
        vOff + INSET + uv.getY(i) * (0.5 - INSET * 2));
    }
    q.rotateY(k * (Math.PI / 2) + 0.24);
    parts.push(q);
  }
  const geo = mergeGeometries(parts);
  // Tilt the card normals up toward the sky. Pure plane normals make one card
  // of the cross flare in the low sun while its partner goes black (the same
  // striping the tree canopies had); pure +Y kills the golden rim entirely.
  // The blend keeps a rim on the sunward faces without the strobe.
  const nAttr = geo.getAttribute('normal');
  for (let v = 0; v < nAttr.count; v++) {
    const nx = nAttr.getX(v) * 0.55, ny = nAttr.getY(v) * 0.55 + 0.85, nz = nAttr.getZ(v) * 0.55;
    const l = Math.hypot(nx, ny, nz) || 1;
    nAttr.setXYZ(v, nx / l, ny / l, nz / l);
  }
  nAttr.needsUpdate = true;
  return geo;
}

function addTufts(scene, frames, D, pal, ground, keepOut, terrain, count) {
  const spots = clumpedBand(frames, keepOut, count, {
    inner: D.armco + 1.0, outer: D.armco + 40,
    bias: 2.4, per: 26, rad: [2.5, 11], clumped: 0.84, solid: 5, fade: 0.86,
  });
  // An InstancedMesh allocated with count 1 and no matrix written leaves an
  // identity instance sitting at the world origin — a lone tuft in the middle
  // of the map. Bail instead.
  if (!spots.length) return;

  const geo = buildTuftGeometry();
  const mat = new THREE.MeshStandardMaterial({
    map: makeTuftTexture(pal),
    alphaTest: 0.44,
    side: THREE.DoubleSide,
    roughness: 0.96,
    metalness: 0,
    envMapIntensity: 0.45,
  });
  const inst = new THREE.InstancedMesh(geo, mat, spots.length);
  inst.name = 'grassTufts';
  inst.castShadow = false;      // 5k alpha cards in the shadow map is not worth it
  inst.receiveShadow = true;
  hideFromOverridePasses(inst);

  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const s = new THREE.Vector3();
  const p = new THREE.Vector3();
  const col = new THREE.Color();
  const [h0, h1] = pal.tuftHue, [s0, s1] = pal.tuftSat, [l0, l1] = pal.tuftLum;
  for (let i = 0; i < spots.length; i++) {
    const sp = spots[i];
    // Rough is tallest where nothing mows it — right against the barrier —
    // and gets shorter and patchier out toward the fields.
    const near = 1 - smoothstep(D.armco + 2, D.armco + 34, sp.d);
    // Capped at ~1.0 m: the 1.2 x 1.0 m card scaled past 1.3 stopped reading
    // as a tussock and started reading as a pale tent pitched in the field.
    const sc = (ground === 'alpine' ? 0.26 : 0.32) + rand() * (0.34 + near * 0.42);
    s.set(sc * (0.8 + rand() * 0.7), sc * (0.7 + rand() * 0.9), sc);
    e.set((rand() - 0.5) * 0.22, rand() * Math.PI * 2, (rand() - 0.5) * 0.22);
    q.setFromEuler(e);
    p.set(sp.x, terrain.height(sp.x, sp.z) - 0.06, sp.z);
    m.compose(p, q, s);
    inst.setMatrixAt(i, m);
    col.setHSL(h0 + rand() * (h1 - h0),
               s0 + rand() * (s1 - s0),
               l0 + rand() * (l1 - l0));
    inst.setColorAt(i, col);
  }
  inst.instanceMatrix.needsUpdate = true;
  if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
  scene.add(inst);
}

// ---------------------------------------------------------------------------
// Layer: wildflower / dry-grass colour drifts
// ---------------------------------------------------------------------------

function addFlowerDrifts(scene, frames, D, pal, keepOut, terrain, count) {
  // Drifts are the point: a real meadow shows patches of ONE colour, twenty
  // metres across, not a confetti mix. So the colour is chosen per drift.
  const n = frames.length;
  const drifts = [];
  const dry = new THREE.Color(pal.dry);
  for (let i = 0; i < 90 && drifts.length < 34; i++) {
    const f = frames[(rand() * n) | 0];
    const side = rand() < 0.5 ? 1 : -1;
    const off = D.armco + 3 + Math.pow(rand(), 1.5) * 70;
    const x = f.pos.x + f.left.x * side * off;
    const z = f.pos.z + f.left.z * side * off;
    if (keepOut(x, z)) continue;
    if (distToTrack(frames, x, z) < D.armco + 2.5) continue;
    const isDry = rand() < 0.34;
    drifts.push({
      x, z,
      r: isDry ? 9 + rand() * 16 : 4 + rand() * 11,
      col: isDry ? dry : new THREE.Color(pal.flowers[(rand() * pal.flowers.length) | 0]),
      dry: isDry,
    });
  }
  if (!drifts.length) return;

  const placed = [];
  const cols = [];
  for (let i = 0; i < count * 4 && placed.length < count; i++) {
    const dr = drifts[(rand() * drifts.length) | 0];
    const a = rand() * Math.PI * 2;
    const rad = (rand() + rand()) * 0.5 * dr.r;
    const x = dr.x + Math.cos(a) * rad;
    const z = dr.z + Math.sin(a) * rad;
    if (keepOut(x, z)) continue;
    if (distToTrack(frames, x, z) < D.armco + 2.0) continue;
    placed.push({ x, z, dry: dr.dry });
    cols.push(dr.col);
  }
  if (!placed.length) return;

  const geo = new THREE.PlaneGeometry(1, 1);
  geo.translate(0, 0.5, 0);
  {
    // Same normal treatment as the tufts: mostly skyward so a card cannot
    // strobe between blown-out and black as the low sun swings past it.
    const nAttr = geo.getAttribute('normal');
    for (let v = 0; v < nAttr.count; v++) {
      const nx = nAttr.getX(v) * 0.5, ny = 0.85, nz = nAttr.getZ(v) * 0.5;
      const l = Math.hypot(nx, ny, nz) || 1;
      nAttr.setXYZ(v, nx / l, ny / l, nz / l);
    }
    nAttr.needsUpdate = true;
  }
  const mat = new THREE.MeshStandardMaterial({
    map: makeFlowerTexture(),
    alphaTest: 0.40,
    side: THREE.DoubleSide,
    roughness: 0.95,
    metalness: 0,
    envMapIntensity: 0.55,
  });

  const inst = new THREE.InstancedMesh(geo, mat, placed.length);
  inst.name = 'flowerDrifts';
  inst.castShadow = false;
  inst.receiveShadow = true;
  hideFromOverridePasses(inst);
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const s = new THREE.Vector3();
  const p = new THREE.Vector3();
  const col = new THREE.Color();
  for (let i = 0; i < placed.length; i++) {
    const sp = placed[i];
    const sc = (sp.dry ? 0.42 : 0.34) + rand() * 0.34;
    s.set(sc * (0.8 + rand() * 0.5), sc * (0.85 + rand() * 0.6), sc);
    e.set(0, rand() * Math.PI * 2, (rand() - 0.5) * 0.3);
    q.setFromEuler(e);
    p.set(sp.x, terrain.height(sp.x, sp.z) - 0.04, sp.z);
    m.compose(p, q, s);
    inst.setMatrixAt(i, m);
    // brightness jitter inside the drift so the patch isn't a flat colour blob
    col.copy(cols[i]).multiplyScalar(0.78 + rand() * 0.36);
    inst.setColorAt(i, col);
  }
  inst.instanceMatrix.needsUpdate = true;
  if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
  scene.add(inst);
}

// ---------------------------------------------------------------------------
// Layer: low shrubs and bramble clumps
// ---------------------------------------------------------------------------

function buildShrubGeometry() {
  // Three squashed lobes at different heights: a bramble is a mound of
  // overlapping domes, and one dome at one scale is the "stamped shape" the
  // owner has rejected before. Detail 0 keeps it at 20 tris a lobe.
  const lobes = [
    { r: 1.0, x: 0, y: 0.0, z: 0, sy: 0.52 },
    { r: 0.72, x: 0.78, y: -0.10, z: 0.34, sy: 0.44 },
    { r: 0.62, x: -0.55, y: -0.06, z: -0.52, sy: 0.50 },
  ];
  const parts = [];
  for (const lo of lobes) {
    const g = new THREE.IcosahedronGeometry(lo.r, 0);
    const pos = g.getAttribute('position');
    for (let v = 0; v < pos.count; v++) {
      const d = 1 + (fractalNoise(pos.getX(v) * 2.1 + 7, pos.getZ(v) * 2.1 - 3, 3) - 0.5) * 0.55;
      pos.setXYZ(v, pos.getX(v) * d, pos.getY(v) * d, pos.getZ(v) * d);
    }
    g.scale(1, lo.sy, 1);
    g.translate(lo.x, lo.y + lo.r * lo.sy * 0.75, lo.z);
    parts.push(g);
  }
  const geo = mergeGeometries(parts);
  // Vertex colours: dark, damp undersides and sunlit crowns, so a single
  // instanced material still shades like a real bush.
  const pos = geo.getAttribute('position');
  const cols = new Float32Array(pos.count * 3);
  for (let v = 0; v < pos.count; v++) {
    const t = smoothstep(-0.1, 0.9, pos.getY(v));
    const k = 0.50 + t * 0.55;
    cols[v * 3] = k * (0.92 + rand() * 0.14);
    cols[v * 3 + 1] = k * (0.98 + rand() * 0.10);
    cols[v * 3 + 2] = k * 0.82;
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  geo.computeVertexNormals();
  return geo;
}

function addShrubs(scene, frames, D, pal, keepOut, terrain, count) {
  const spots = clumpedBand(frames, keepOut, count, {
    inner: D.armco + 8, outer: D.armco + 150,
    bias: 1.5, per: 9, rad: [6, 26], clumped: 0.8, solid: 20, fade: 0.7,
  });
  if (!spots.length) return;

  const geo = buildShrubGeometry();
  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.99,
    metalness: 0,
    flatShading: true,      // a faceted read is right for a low-poly bramble
    envMapIntensity: 0.28,
  });
  const inst = new THREE.InstancedMesh(geo, mat, spots.length);
  inst.name = 'shrubs';
  inst.castShadow = true;
  inst.receiveShadow = true;
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const s = new THREE.Vector3();
  const p = new THREE.Vector3();
  const col = new THREE.Color();
  const [h0, h1] = pal.shrub, [s0, s1] = pal.shrubSat, [l0, l1] = pal.shrubLum;
  for (let i = 0; i < spots.length; i++) {
    const sp = spots[i];
    const sc = 0.42 + Math.pow(rand(), 1.8) * 1.05;
    s.set(sc * (0.75 + rand() * 0.6), sc * (0.55 + rand() * 0.75), sc * (0.75 + rand() * 0.6));
    e.set((rand() - 0.5) * 0.16, rand() * Math.PI * 2, (rand() - 0.5) * 0.16);
    q.setFromEuler(e);
    // Sunk a little so the base never shows a hovering rim on rolling ground.
    p.set(sp.x, terrain.height(sp.x, sp.z) - 0.16 * sc, sp.z);
    m.compose(p, q, s);
    inst.setMatrixAt(i, m);
    col.setHSL(h0 + rand() * (h1 - h0),
               s0 + rand() * (s1 - s0),
               l0 + rand() * (l1 - l0));
    inst.setColorAt(i, col);
  }
  inst.instanceMatrix.needsUpdate = true;
  if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
  scene.add(inst);
}

// ---------------------------------------------------------------------------
// Layer: hedgerows, fences, gates, telegraph routes
// ---------------------------------------------------------------------------

function buildHedgeGeometry(step) {
  // Segments overlap their neighbours by ~20% so a change of heading or a
  // lumpy displacement can never open daylight at a joint.
  const geo = new THREE.BoxGeometry(step * 1.22, 1.0, 1.35, 3, 2, 1);
  const pos = geo.getAttribute('position');
  for (let v = 0; v < pos.count; v++) {
    const x = pos.getX(v), y = pos.getY(v), z = pos.getZ(v);
    const grow = 1 + (fractalNoise(x * 1.4 + 11, z * 1.4 + y * 2.2 - 5, 4) - 0.5) * 0.55;
    // ends stay put (they butt into the neighbouring segment), sides and top
    // get the browsed, uneven profile of a real hedge
    const keepX = Math.abs(x) > step * 0.5 ? 1 : grow;
    pos.setXYZ(v, x * keepX, y > 0 ? y * grow : y, z * grow);
  }
  geo.computeVertexNormals();
  const cols = new Float32Array(pos.count * 3);
  for (let v = 0; v < pos.count; v++) {
    // Bottom of a hedge is bare twiggy shade, top is sunlit leaf.
    const t = smoothstep(-0.5, 0.5, pos.getY(v));
    const k = 0.44 + t * 0.86;
    cols[v * 3] = k * 0.92;
    cols[v * 3 + 1] = k;
    cols[v * 3 + 2] = k * 0.72;
  }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  // Sit the box so its top is at y=0.78 and its base at y=-0.22: the instance
  // Y-scale is then (near enough) the hedge's height in metres, and the base
  // is buried proportionally. The skirt matters — the terrain MESH chords
  // across 11 m cells under terrain.height()'s smooth curve, so a hedge seated
  // exactly on the height field would show daylight beneath it on a crest.
  geo.translate(0, 0.5 - 0.22, 0);
  return geo;
}

/**
 * Walk the authored field lines, emitting hedge instances and merged
 * timber/wire geometry. The run-length state machine is what stops the result
 * looking generated: a boundary is hedge for 40-120 m, then post-and-wire for
 * a while, then a gateway with a five-bar gate, and it simply stops wherever
 * it would foul the circuit.
 */
function buildFieldLines(frames, D, ctx, cfg) {
  const { stats, keepOut, terrain, allowHedge } = cfg;
  const STEP = 3.6;
  const clearance = D.armco + 24;

  const lines = shuffled(FIELD_LINES).slice(0, cfg.lineCount);
  const mirrorU = rand() < 0.5 ? 1 : -1;
  const mirrorV = rand() < 0.5 ? 1 : -1;
  const swap = rand() < 0.4;

  for (const line of lines) {
    const world = line.pts.map(([u, v]) => {
      const uu = swap ? v : u, vv = swap ? u : v;
      return new THREE.Vector3(
        stats.cx + uu * mirrorU * stats.hx, 0, stats.cz + vv * mirrorV * stats.hz);
    });
    const pts = resample(world, STEP);

    let runLeft = 0;
    let runType = line.style === 'hedge' ? 'hedge' : 'fence';
    let gateArmed = false;

    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i], b = pts[i + 1];
      const mx = (a.x + b.x) / 2, mz = (a.z + b.z) / 2;

      // Clearance first: a rejected stretch reads as a natural break, which
      // is exactly what a boundary does where it meets a road.
      if (keepOut(mx, mz) || insideCircuit(frames, mx, mz) ||
          distToTrack(frames, mx, mz) < clearance) {
        runLeft = 0;
        continue;
      }

      if (runLeft <= 0) {
        // Choose the next run. Hedge-style lines are mostly hedge with fenced
        // stretches where the hedge was grubbed out; fence-style lines invert
        // that. Every run change is a chance for a gateway.
        const r = rand();
        if (!allowHedge) runType = 'fence';
        else if (line.style === 'hedge') runType = r < 0.66 ? 'hedge' : (r < 0.9 ? 'fence' : 'gap');
        else runType = r < 0.66 ? 'fence' : (r < 0.88 ? 'hedge' : 'gap');
        runLeft = runType === 'gap' ? 4 + rand() * 5 : 26 + rand() * 96;
        gateArmed = runType === 'gap' && rand() < 0.55;
      }
      runLeft -= STEP;

      const ya = terrain.height(a.x, a.z);
      const yb = terrain.height(b.x, b.z);
      const dx = b.x - a.x, dz = b.z - a.z;
      const len = Math.hypot(dx, dz) || 1;
      const yaw = Math.atan2(-dz, dx);

      if (runType === 'gap') {
        if (gateArmed) {
          buildGate(ctx, (a.x + b.x) / 2, (ya + yb) / 2, (a.z + b.z) / 2, yaw, len);
          gateArmed = false;
        }
        continue;
      }

      // Out of hedge budget: build the stretch as post-and-wire rather than
      // dropping it, so a boundary never just evaporates halfway along.
      if (runType === 'hedge' && ctx.hedges.length >= cfg.hedgeCap) runType = 'fence';

      if (runType === 'hedge') {
        const pitch = Math.asin(Math.max(-0.7, Math.min(0.7, (yb - ya) / len)));
        ctx.hedges.push({
          x: mx, y: (ya + yb) / 2, z: mz, yaw, pitch,
          h: 2.0 + rand() * 1.1,     // ~1.3-2.8 m of hedge above ground
          w: 0.85 + rand() * 0.55,
        });
      } else {
        if (ctx.posts >= cfg.postCap) continue;
        buildFencePost(ctx, a.x, ya, a.z, b.x, yb, b.z);
      }
    }
  }
}

function buildFencePost(ctx, x1, y1, z1, x2, y2, z2) {
  const H = 1.18 + rand() * 0.22;
  const lean = (rand() - 0.5) * 0.06;
  const m = new THREE.Matrix4().makeRotationZ(lean);
  m.setPosition(x1, y1 + H / 2 - 0.32, z1);
  const post = new THREE.CylinderGeometry(0.055, 0.075, H + 0.64, 5);
  post.applyMatrix4(m);
  ctx.geos.push(paint(post, ctx.timber));
  ctx.posts++;

  // Three strands running post to post. No sag geometry here: over a 3.6 m
  // span the real droop is ~3 cm, invisible, and splitting every strand in
  // two would double the merge list for nothing. The strands still follow the
  // ground because each end sits on its own post's terrain height.
  for (const t of [0.36, 0.63, 0.92]) {
    const q = wireQuad(
      new THREE.Vector3(x1, y1 + H * t, z1),
      new THREE.Vector3(x2, y2 + H * t, z2), 0.045, ctx.wire);
    if (q) ctx.geos.push(q);
  }
}

function buildGate(ctx, x, y, z, yaw, span) {
  const W = Math.max(3.0, Math.min(4.6, span * 1.05));
  const H = 1.25;
  const base = new THREE.Matrix4().makeRotationY(yaw);
  base.setPosition(x, y, z);

  for (const sx of [-1, 1]) {
    ctx.geos.push(boxPart(0.16, H + 0.9, 0.16,
      localMat(base, sx * W / 2, (H + 0.9) / 2 - 0.58, 0), ctx.timber));
  }
  // five bars, closer together at the bottom the way stock gates are
  for (let i = 0; i < 5; i++) {
    const t = Math.pow(i / 4, 0.85);
    ctx.geos.push(boxPart(W - 0.18, 0.085, 0.06,
      localMat(base, 0, 0.24 + t * (H - 0.28), 0), ctx.gateWood));
  }
  // diagonal brace
  const bl = Math.hypot(W - 0.3, H - 0.3);
  ctx.geos.push(boxPart(bl, 0.075, 0.055,
    localMat(base, 0, 0.24 + (H - 0.28) / 2, 0.01, Math.atan2(H - 0.3, W - 0.3)), ctx.gateWood));
}

function buildPoleRoutes(frames, D, ctx, cfg) {
  const { stats, keepOut, terrain } = cfg;
  const routes = shuffled(POLE_ROUTES).slice(0, cfg.routeCount);
  const mirror = rand() < 0.5 ? 1 : -1;
  const clearance = D.armco + 30;

  for (const route of routes) {
    const world = route.map(([u, v]) => new THREE.Vector3(
      stats.cx + u * mirror * stats.hx, 0, stats.cz + v * stats.hz));
    // Poles are never evenly spaced on a real route; resample fine, then walk
    // forward by an irregular number of steps.
    const pts = resample(world, 6);
    const poles = [];
    let i = 0;
    while (i < pts.length) {
      const p = pts[i];
      const ok = !keepOut(p.x, p.z) && !insideCircuit(frames, p.x, p.z) &&
                 distToTrack(frames, p.x, p.z) > clearance;
      const nxt = pts[Math.min(pts.length - 1, i + 1)];
      const yaw = Math.atan2(nxt.x - p.x, nxt.z - p.z);
      poles.push(ok ? { x: p.x, y: terrain.height(p.x, p.z), z: p.z, yaw } : null);
      i += 7 + ((rand() * 3) | 0);
    }

    for (const pole of poles) if (pole) buildPole(ctx, pole);
    for (let k = 0; k < poles.length - 1; k++) {
      const a = poles[k], b = poles[k + 1];
      if (!a || !b) continue;      // a dropped pole leaves a gap, not a floating wire
      buildCatenary(ctx, a, b);
    }
  }
}

// Attachment points in pole-local space: two crossarms, four conductors.
const ARM_Y = [7.55, 6.85];
const ARM_X = [0.98, 0.42];

function poleAttach(pole, k) {
  const arm = k < 2 ? 0 : 1;
  const side = k % 2 === 0 ? 1 : -1;
  const lx = ARM_X[arm] * side;
  // local x rotated by the pole's yaw (local +z = route heading)
  const cx = Math.cos(pole.yaw), sy = Math.sin(pole.yaw);
  return new THREE.Vector3(pole.x + lx * cx, pole.y + ARM_Y[arm], pole.z - lx * sy);
}

function buildPole(ctx, pole) {
  const H = 8.6;
  const base = new THREE.Matrix4().makeRotationY(pole.yaw);
  base.setPosition(pole.x, pole.y, pole.z);
  const shaft = new THREE.CylinderGeometry(0.11, 0.17, H + 1.0, 6);
  shaft.applyMatrix4(localMat(base, 0, (H + 1.0) / 2 - 0.7, 0));
  ctx.geos.push(paint(shaft, ctx.pole));
  for (let arm = 0; arm < 2; arm++) {
    ctx.geos.push(boxPart(ARM_X[arm] * 2 + 0.3, 0.10, 0.13,
      localMat(base, 0, ARM_Y[arm], 0), ctx.pole));
    for (const side of [-1, 1]) {
      // insulator caps — tiny, but they are what makes a stick read as a
      // telegraph pole rather than a dead tree
      ctx.geos.push(boxPart(0.10, 0.14, 0.10,
        localMat(base, ARM_X[arm] * side, ARM_Y[arm] + 0.12, 0), ctx.insulator));
    }
  }
}

function buildCatenary(ctx, a, b) {
  const SEGS = 7;
  const span = Math.hypot(b.x - a.x, b.z - a.z);
  const sag = Math.min(1.6, span / 42);
  for (let k = 0; k < 4; k++) {
    const p1 = poleAttach(a, k);
    const p2 = poleAttach(b, k);
    let prev = p1;
    for (let s = 1; s <= SEGS; s++) {
      const t = s / SEGS;
      const p = new THREE.Vector3().lerpVectors(p1, p2, t);
      p.y -= sag * 4 * t * (1 - t);      // parabola is indistinguishable from a catenary here
      const q = wireQuad(prev, p, 0.055, ctx.wire);
      if (q) ctx.geos.push(q);
      prev = p;
    }
  }
}

/** Stacked timber, for the alpine pass where hedgerows would be wrong. */
function buildLogPiles(frames, D, ctx, cfg, count) {
  const { stats, keepOut, terrain } = cfg;
  let built = 0;
  for (let tries = 0; tries < count * 12 && built < count; tries++) {
    const x = stats.cx + (rand() * 2 - 1) * stats.hx * 0.85;
    const z = stats.cz + (rand() * 2 - 1) * stats.hz * 0.85;
    if (keepOut(x, z) || insideCircuit(frames, x, z)) continue;
    if (distToTrack(frames, x, z) < D.armco + 26) continue;
    const y = terrain.height(x, z);
    const yaw = rand() * Math.PI * 2;
    const base = new THREE.Matrix4().makeRotationY(yaw);
    base.setPosition(x, y, z);
    const L = 3.2 + rand() * 1.4;
    const rows = 2 + ((rand() * 2) | 0);
    for (let r = 0; r < rows; r++) {
      const nInRow = 4 - r;
      for (let i = 0; i < nInRow; i++) {
        const rad = 0.16 + rand() * 0.07;
        const log = new THREE.CylinderGeometry(rad, rad * 0.92, L, 6);
        log.rotateZ(Math.PI / 2);
        log.applyMatrix4(localMat(base,
          (i - (nInRow - 1) / 2) * 0.42 + (rand() - 0.5) * 0.06,
          0.18 + r * 0.36, (rand() - 0.5) * 0.25));
        ctx.geos.push(paint(log, ctx.logs));
      }
    }
    built++;
  }
}

// ---------------------------------------------------------------------------
// Layer: alpine boulders and scree
// ---------------------------------------------------------------------------

function addAlpineRocks(scene, frames, D, keepOut, terrain, count) {
  // Boulders sit anywhere; scree collects where the ground is steep, which is
  // what makes it read as fallen rock rather than sprinkled pebbles.
  const spots = clumpedBand(frames, keepOut, count, {
    inner: D.armco + 6, outer: D.armco + 190,
    bias: 1.3, per: 11, rad: [5, 24], clumped: 0.86, solid: 24, fade: 0.6,
  });
  if (!spots.length) return;

  const geo = new THREE.IcosahedronGeometry(1, 0);   // already non-indexed
  const pos = geo.getAttribute('position');
  for (let v = 0; v < pos.count; v++) {
    const d = (fractalNoise(pos.getX(v) * 1.9 + 2, pos.getZ(v) * 1.9 - 4, 3) - 0.5) * 0.8;
    pos.setXYZ(v, pos.getX(v) * (1 + d), pos.getY(v) * (1 + d * 0.55), pos.getZ(v) * (1 + d));
  }
  geo.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({
    roughness: 0.97, metalness: 0, flatShading: true, envMapIntensity: 0.35,
  });

  const inst = new THREE.InstancedMesh(geo, mat, spots.length);
  inst.name = 'alpineRock';
  inst.castShadow = true;
  inst.receiveShadow = true;
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const s = new THREE.Vector3();
  const p = new THREE.Vector3();
  const col = new THREE.Color();
  for (let i = 0; i < spots.length; i++) {
    const sp = spots[i];
    const steep = Math.min(1, (terrain.slope ? terrain.slope(sp.x, sp.z) : 0) * 3.2);
    // steep ground => lots of small scree; flat ground => the odd big boulder
    const scree = rand() < 0.35 + steep * 0.5;
    const sc = scree ? 0.16 + rand() * 0.34 : 0.7 + Math.pow(rand(), 1.8) * 2.1;
    s.set(sc * (0.8 + rand() * 0.6), sc * (0.5 + rand() * 0.7), sc * (0.8 + rand() * 0.6));
    e.set((rand() - 0.5) * 0.7, rand() * Math.PI * 2, (rand() - 0.5) * 0.7);
    q.setFromEuler(e);
    p.set(sp.x, terrain.height(sp.x, sp.z) - sc * 0.3, sp.z);
    m.compose(p, q, s);
    inst.setMatrixAt(i, m);
    col.setHSL(0.08 + rand() * 0.05, 0.06 + rand() * 0.10, 0.34 + rand() * 0.16);
    inst.setColorAt(i, col);
  }
  inst.instanceMatrix.needsUpdate = true;
  if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
  scene.add(inst);
}

// ---------------------------------------------------------------------------
// Layer: farm tracks
// ---------------------------------------------------------------------------

function addFarmTracks(scene, frames, D, ground, cfg) {
  const { stats, keepOut, terrain } = cfg;
  const routes = shuffled(TRACK_ROUTES).slice(0, cfg.trackCount);
  const mirror = rand() < 0.5 ? 1 : -1;
  const clearance = D.armco + 26;
  const HW = 1.75;
  const parts = [];

  for (const route of routes) {
    const world = route.map(([u, v]) => new THREE.Vector3(
      stats.cx + u * mirror * stats.hx, 0, stats.cz + v * stats.hz));
    const pts = resample(world, 5);

    // Split into runs of consecutive valid samples; a run needs 3+ points to
    // be worth building.
    let run = [];
    const runs = [];
    for (const p of pts) {
      const ok = !keepOut(p.x, p.z) && !insideCircuit(frames, p.x, p.z) &&
                 distToTrack(frames, p.x, p.z) > clearance;
      if (ok) run.push(p);
      else { if (run.length > 3) runs.push(run); run = []; }
    }
    if (run.length > 3) runs.push(run);

    for (const r of runs) {
      const positions = [];
      const uvs = [];
      const indices = [];
      let along = 0;
      for (let i = 0; i < r.length; i++) {
        const p = r[i];
        const a = r[Math.max(0, i - 1)], b = r[Math.min(r.length - 1, i + 1)];
        const dx = b.x - a.x, dz = b.z - a.z;
        const l = Math.hypot(dx, dz) || 1;
        // right = up x dir
        const rx = dz / l, rz = -dx / l;
        if (i > 0) along += r[i].distanceTo(r[i - 1]);
        const y = terrain.height(p.x, p.z);
        // Crowned cross-section: the outer lip is dropped well below the
        // ground so the terrain MESH (11 m cells, chording under the smooth
        // height field) can never cut a floating edge out of the ribbon.
        const cols = [
          [-HW, -0.34], [-HW * 0.72, 0.045], [HW * 0.72, 0.045], [HW, -0.34],
        ];
        for (let k = 0; k < 4; k++) {
          positions.push(p.x + rx * cols[k][0], y + cols[k][1], p.z + rz * cols[k][0]);
          uvs.push((cols[k][0] / HW) * 0.5 + 0.5, along / 9);
        }
      }
      for (let i = 0; i < r.length - 1; i++) {
        for (let k = 0; k < 3; k++) {
          const a = i * 4 + k, b = a + 1, c = a + 4, d = c + 1;
          // (a, c, b) / (b, c, d) — the winding terrain.js uses for an
          // up-facing tensor grid. Get this backwards and the track is
          // invisible from above, which reads as "it didn't build".
          indices.push(a, c, b, b, c, d);
        }
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      g.setIndex(indices);
      g.computeVertexNormals();
      parts.push(g);
    }
  }

  if (!parts.length) return;
  const merged = parts.length === 1 ? parts[0] : mergeGeometries(parts);
  if (!merged) return;
  const mesh = new THREE.Mesh(merged, new THREE.MeshStandardMaterial({
    map: makeFarmTrackTexture(ground),
    roughness: 0.99, metalness: 0, envMapIntensity: 0.3,
  }));
  mesh.receiveShadow = true;
  mesh.castShadow = false;
  mesh.name = 'farmTracks';
  scene.add(mesh);
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

/**
 * @param {THREE.Object3D} scene  the track group
 * @param {Array} frames          centreline frames (pos/tan/left)
 * @param {object} D              { road, kerb, runoff, armco, terrain }
 * @param {object} opts           { ground, density, terrain }
 */
export function addGroundCover(scene, frames, D, opts = {}) {
  const ground = opts.ground || 'grass';
  // The desert already has addScrub (brush + saguaros) and a street circuit
  // has no rough at all — doubling up would just cost draw calls.
  if (ground === 'sand' || ground === 'city') return;
  if (!frames || frames.length < 8) return;

  const density = opts.density ?? 1;
  const pal = PALETTES[ground] || PALETTES.grass;
  const src = opts.terrain || D.terrain || { height: () => 0, slope: () => 0 };
  // Everything downstream seats on this, never on the raw field (see makeSeat).
  const terrain = {
    height: makeSeat(src),
    slope: (x, z) => (src.slope ? src.slope(x, z) : 0),
  };
  const keepOut = makeKeepOut(frames, D);
  const stats = circuitStats(frames);
  // Counts follow lap length: a 1.6 km circuit needs more rough than a 1.1 km
  // one to look equally dressed.
  const lapScale = Math.max(0.65, Math.min(1.35, stats.lap / 1400)) * density;

  const cfg = {
    stats, keepOut, terrain,
    allowHedge: ground !== 'alpine',
    lineCount: 4,
    routeCount: 1,
    trackCount: ground === 'alpine' ? 1 : 2,
    hedgeCap: Math.round(340 * density),
    postCap: Math.round(340 * density),
  };

  // --- field structure (one merged mesh for all of it) ---
  const ctx = {
    geos: [],
    hedges: [],
    posts: 0,
    timber: new THREE.Color(0x6d5a41),
    gateWood: new THREE.Color(0x8b7a5e),
    wire: new THREE.Color(0x4a4640),
    pole: new THREE.Color(0x5c4c38),
    insulator: new THREE.Color(0x8f9aa0),
    logs: new THREE.Color(0x8a6a45),
  };
  buildFieldLines(frames, D, ctx, cfg);
  buildPoleRoutes(frames, D, ctx, cfg);
  if (ground === 'alpine') buildLogPiles(frames, D, ctx, cfg, 9);

  if (ctx.geos.length) {
    const merged = mergeGeometries(ctx.geos);
    if (merged) {
      const mesh = new THREE.Mesh(merged, new THREE.MeshStandardMaterial({
        vertexColors: true,
        roughness: 0.9,
        metalness: 0.05,
        // The wire ribbons are single quads; DoubleSide makes their winding a
        // non-issue and costs the closed timber parts nothing visible.
        side: THREE.DoubleSide,
        envMapIntensity: 0.35,
      }));
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.name = 'fieldStructure';
      scene.add(mesh);
    }
  }

  // --- hedgerows ---
  if (ctx.hedges.length) {
    const geo = buildHedgeGeometry(3.6);
    const mat = new THREE.MeshStandardMaterial({
      color: pal.hedge, vertexColors: true,
      roughness: 0.98, metalness: 0, envMapIntensity: 0.25,
    });
    const inst = new THREE.InstancedMesh(geo, mat, ctx.hedges.length);
    inst.name = 'hedgerows';
    inst.castShadow = true;      // long hedge shadows across the fields at 11 degrees
    inst.receiveShadow = true;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const s = new THREE.Vector3();
    const p = new THREE.Vector3();
    const col = new THREE.Color();
    for (let i = 0; i < ctx.hedges.length; i++) {
      const h = ctx.hedges[i];
      // Ry(yaw) * Rz(pitch): the segment's long axis is local +X, so pitching
      // about local Z rides the slope and the hedge line traces the ground's
      // roll — which is the whole reason the mid-field reads as hills.
      q.setFromEuler(new THREE.Euler(0, h.yaw, h.pitch, 'YZX'));
      s.set(1, h.h, h.w);
      p.set(h.x, h.y, h.z);
      m.compose(p, q, s);
      inst.setMatrixAt(i, m);
      col.setHSL(0.235 + rand() * 0.055, 0.24 + rand() * 0.2, 0.42 + rand() * 0.16);
      inst.setColorAt(i, col);
    }
    inst.instanceMatrix.needsUpdate = true;
    if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
    scene.add(inst);
  }

  // --- alpine rock instead of hedgerows ---
  if (ground === 'alpine') {
    addAlpineRocks(scene, frames, D, keepOut, terrain, Math.round(460 * lapScale));
  }

  // --- rough, drifts and scrub ---
  addTufts(scene, frames, D, pal, ground, keepOut, terrain, Math.round(5000 * lapScale));
  addFlowerDrifts(scene, frames, D, pal, keepOut, terrain, Math.round(2200 * lapScale));
  addShrubs(scene, frames, D, pal, keepOut, terrain, Math.round(340 * lapScale));

  // --- farm tracks ---
  addFarmTracks(scene, frames, D, ground, cfg);
}
