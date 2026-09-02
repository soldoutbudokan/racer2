/**
 * Rolling ground terrain.
 *
 * The circuit used to sit on a single flat 4 km PlaneGeometry, which is what
 * made every horizon read as a green billiard table with cardboard mountains
 * standing on it. This builds a displaced mesh instead:
 *
 *   - It is DEAD FLAT inside the track corridor (out to `flatR` metres from
 *     the centreline) and ramps to full relief by `rampR`. Physics is still a
 *     flat plane, and every trackside structure — barriers, grandstands, the
 *     pit complex, marker boards — sits at y=0, so the flat zone is a hard
 *     contract, not a stylistic choice.
 *   - Outside that it rolls, with the amplitude growing with distance so the
 *     mid-field reads as gentle farmland and the far field as foothills that
 *     hand off to the distant ranges.
 *   - `height(x, z)` is exported so every scenery placer (trees, rocks, huts,
 *     farmland, mountains…) can sit its instances ON the ground instead of
 *     floating above a hollow or sinking into a rise.
 *
 * The mesh is a tensor-product grid with NON-UNIFORM axis spacing: fine cells
 * over the track's bounding box, then geometrically growing cells out to the
 * fog wall. That gives near-field detail at far-field cost without the
 * T-junction cracks a nested-ring clipmap would introduce.
 */
import * as THREE from 'three';
import { fractalNoise, ridgedNoise, smoothstep } from './noise.js';

// Metres of world per repeat of the ground colour texture. Terrain UVs are in
// metres, so materials divide by this (see makeGroundMaterial in track.js).
export const TERRAIN_UV_METRES = 1;

const PRESETS = {
  // Parkland / farmland circuits: long low swells with hedged fields.
  grass: {
    ampFar: 30, ampMid: 7.5, wl: 300, detailWl: 74, ridged: 0.22,
    crest: 0x8f9268, hollow: 0x35431f, dry: 0x9c8c52,
  },
  // Alpine pass: the ground itself climbs into the foothills that carry the
  // eye up to the peaks, so the relief is far stronger and more ridged.
  alpine: {
    ampFar: 78, ampMid: 16, wl: 340, detailWl: 68, ridged: 0.62,
    crest: 0x8d9a86, hollow: 0x2c3a26, dry: 0x7c7f55,
  },
  // Desert: broad dune swells, low frequency, warm crests.
  sand: {
    ampFar: 34, ampMid: 9, wl: 380, detailWl: 96, ridged: 0.30,
    crest: 0xd8c193, hollow: 0x8a7047, dry: 0xc7a877,
  },
  // Street circuit: the city is flat. Keep the mesh (for its vertex-colour
  // variation and denser UVs) but with no displacement at all.
  city: {
    ampFar: 0, ampMid: 0, wl: 300, detailWl: 70, ridged: 0,
    crest: 0xbdbdb8, hollow: 0x6e6e70, dry: 0xa8a498,
  },
};

/**
 * Distance-to-centreline field, rasterised once so `height()` is O(1).
 * Only covers the track bbox padded by `pad`; anything outside is by
 * construction further than `pad` from the road.
 */
function buildDistField(frames, pad, cell) {
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for (const f of frames) {
    if (f.pos.x < minX) minX = f.pos.x;
    if (f.pos.x > maxX) maxX = f.pos.x;
    if (f.pos.z < minZ) minZ = f.pos.z;
    if (f.pos.z > maxZ) maxZ = f.pos.z;
  }
  const x0 = minX - pad, z0 = minZ - pad;
  const nx = Math.ceil((maxX + pad - x0) / cell) + 1;
  const nz = Math.ceil((maxZ + pad - z0) / cell) + 1;
  const data = new Float32Array(nx * nz).fill(pad);

  // Splat: each centreline sample writes min-distance into the cells within
  // `pad` of it. Cheaper and more accurate near the road than a full
  // cell x frame sweep, and the step-2 subsample is well under a cell.
  const rad = Math.ceil(pad / cell);
  for (let k = 0; k < frames.length; k += 2) {
    const p = frames[k].pos;
    const ci = Math.round((p.x - x0) / cell);
    const cj = Math.round((p.z - z0) / cell);
    for (let j = Math.max(0, cj - rad); j <= Math.min(nz - 1, cj + rad); j++) {
      const dz = z0 + j * cell - p.z;
      for (let i = Math.max(0, ci - rad); i <= Math.min(nx - 1, ci + rad); i++) {
        const dx = x0 + i * cell - p.x;
        const d = Math.sqrt(dx * dx + dz * dz);
        const o = j * nx + i;
        if (d < data[o]) data[o] = d;
      }
    }
  }

  return function sample(x, z) {
    const fx = (x - x0) / cell, fz = (z - z0) / cell;
    if (fx < 0 || fz < 0 || fx >= nx - 1 || fz >= nz - 1) return pad;
    const i = fx | 0, j = fz | 0;
    const tx = fx - i, tz = fz - j;
    const o = j * nx + i;
    const a = data[o], b = data[o + 1], c = data[o + nx], d = data[o + nx + 1];
    return (a * (1 - tx) + b * tx) * (1 - tz) + (c * (1 - tx) + d * tx) * tz;
  };
}

/**
 * Non-uniform axis coordinates: uniform `fine` spacing across [lo, hi], then
 * cells growing by `growth` out to +/- `limit`.
 */
function axisCoords(lo, hi, fine, growth, limit) {
  const inner = [];
  const n = Math.max(1, Math.round((hi - lo) / fine));
  for (let i = 0; i <= n; i++) inner.push(lo + (i / n) * (hi - lo));
  const out = [];
  let step = fine, v = hi;
  while (v < limit) { step *= growth; v += step; out.push(Math.min(limit, v)); }
  const pre = [];
  step = fine; v = lo;
  while (v > -limit) { step *= growth; v -= step; pre.push(Math.max(-limit, v)); }
  pre.reverse();
  return pre.concat(inner, out);
}

/**
 * @param {Array} frames  centreline frames (pos/tan/left)
 * @param {object} opts
 *   ground   - 'grass' | 'alpine' | 'sand' | 'city'
 *   armco    - barrier offset from the centreline (m)
 *   seed     - decorrelates one circuit's hills from another's
 *   extent   - half-size of the terrain sheet (m)
 * @returns {{ height(x,z):number, slope(x,z):number, mesh:THREE.Mesh,
 *             flatR:number, rampR:number }}
 */
export function makeTerrain(frames, opts = {}) {
  const P = PRESETS[opts.ground] || PRESETS.grass;
  const seed = opts.seed ?? 0;
  const EXT = opts.extent ?? 2400;

  // Flat contract: everything the circuit builds — barrier, run-off, gravel,
  // grandstands, pit lane, marker boards — lives inside `flatR`. Relief
  // reaches full strength at `rampR`.
  const flatR = (opts.armco ?? 12) + 46;
  const rampR = flatR + 130;

  const distTo = buildDistField(frames, rampR + 30, 9);

  // Distance from the circuit's centre, used to grow the relief outward so
  // the near field stays gentle and the far field builds into foothills.
  let cx = 0, cz = 0;
  for (const f of frames) { cx += f.pos.x; cz += f.pos.z; }
  cx /= frames.length; cz /= frames.length;

  const S = seed * 137.31;

  function relief(x, z) {
    if (P.ampFar === 0) return 0;
    const u = (x + S) / P.wl, v = (z - S) / P.wl;
    // Rolling base in [-1, 1] with a ridged component for the alpine hills.
    const roll = fractalNoise(u, v, 4) * 2 - 1;
    const ridge = P.ridged > 0 ? ridgedNoise(u * 0.8 + 5.1, v * 0.8 - 3.7, 5) : 0;
    const base = roll * (1 - P.ridged) + (ridge * 2 - 0.55) * P.ridged;
    const det = (fractalNoise((x + S) / P.detailWl, (z - S) / P.detailWl, 4) - 0.5) * 0.46;
    // Amplitude grows from mid-field swells to far-field hills.
    const rc = Math.hypot(x - cx, z - cz);
    const amp = P.ampMid + (P.ampFar - P.ampMid) * smoothstep(260, 1500, rc);
    return (base + det) * amp;
  }

  function height(x, z) {
    const d = distTo(x, z);
    const t = smoothstep(flatR, rampR, d);
    if (t <= 0) return 0;
    return relief(x, z) * t;
  }

  function slope(x, z) {
    const e = 6;
    const dx = (height(x + e, z) - height(x - e, z)) / (2 * e);
    const dz = (height(x, z + e) - height(x, z - e)) / (2 * e);
    return Math.hypot(dx, dz);
  }

  // ---- Mesh ----
  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for (const f of frames) {
    if (f.pos.x < minX) minX = f.pos.x;
    if (f.pos.x > maxX) maxX = f.pos.x;
    if (f.pos.z < minZ) minZ = f.pos.z;
    if (f.pos.z > maxZ) maxZ = f.pos.z;
  }
  const FINE = 11;
  const xs = axisCoords(minX - 170, maxX + 170, FINE, 1.135, EXT);
  const zs = axisCoords(minZ - 170, maxZ + 170, FINE, 1.135, EXT);
  const NX = xs.length, NZ = zs.length;

  const positions = new Float32Array(NX * NZ * 3);
  const uvs = new Float32Array(NX * NZ * 2);
  const colors = new Float32Array(NX * NZ * 3);
  const heights = new Float32Array(NX * NZ);

  const crest = new THREE.Color(P.crest);
  const hollow = new THREE.Color(P.hollow);
  const dry = new THREE.Color(P.dry);
  const tmp = new THREE.Color();
  const base = new THREE.Color();

  for (let j = 0; j < NZ; j++) {
    const z = zs[j];
    for (let i = 0; i < NX; i++) {
      const x = xs[i];
      const o = j * NX + i;
      const h = height(x, z);
      heights[o] = h;
      positions[o * 3] = x;
      positions[o * 3 + 1] = h;
      positions[o * 3 + 2] = z;
      uvs[o * 2] = x / TERRAIN_UV_METRES;
      uvs[o * 2 + 1] = z / TERRAIN_UV_METRES;
    }
  }

  // Vertex colours: the single cheapest cure for "obviously tiled ground".
  // A very low-frequency wash (macro patches of dry/lush) plus height and
  // slope shading breaks the repeat long before the texture tile does.
  for (let j = 0; j < NZ; j++) {
    for (let i = 0; i < NX; i++) {
      const o = j * NX + i;
      const x = xs[i], z = zs[j], h = heights[o];
      const im = Math.max(0, i - 1), ip = Math.min(NX - 1, i + 1);
      const jm = Math.max(0, j - 1), jp = Math.min(NZ - 1, j + 1);
      const dhdx = (heights[j * NX + ip] - heights[j * NX + im]) /
                   Math.max(1e-3, xs[ip] - xs[im]);
      const dhdz = (heights[jp * NX + i] - heights[jm * NX + i]) /
                   Math.max(1e-3, zs[jp] - zs[jm]);
      const steep = Math.min(1, Math.hypot(dhdx, dhdz) * 1.7);

      // Macro wash — two decorrelated very-low-frequency fields.
      const macro = fractalNoise((x + S) / 620 + 3.3, (z - S) / 620 - 1.7, 3);
      const patch = fractalNoise((x - S) / 195 - 6.1, (z + S) / 195 + 2.4, 3);

      base.set(0xffffff);
      // Crests catch sun and dry out; hollows hold moisture and shade.
      const hn = Math.max(-1, Math.min(1, h / (P.ampFar || 1) * 1.6));
      tmp.copy(hn >= 0 ? crest : hollow);
      base.lerp(tmp, Math.abs(hn) * 0.34);
      base.lerp(dry, Math.max(0, macro - 0.44) * 0.95 + Math.max(0, patch - 0.56) * 0.7);
      // ...and the wet ground between the dry patches goes darker and
      // greener, so the field is a patchwork rather than one green with
      // some straw in it.
      base.lerp(hollow, Math.max(0, 0.42 - macro) * 0.9);
      // Steep faces shed soil to bare earth/rock.
      base.lerp(dry, steep * 0.5);
      // Small-scale brightness jitter so adjacent cells never match exactly.
      const j2 = 0.93 + fractalNoise((x + S) / 46, (z - S) / 46, 3) * 0.17;
      base.multiplyScalar(j2);

      colors[o * 3] = base.r;
      colors[o * 3 + 1] = base.g;
      colors[o * 3 + 2] = base.b;
    }
  }

  // Split the sheet into a near shell that RECEIVES shadows and a far shell
  // that does not. The sun's shadow camera is a 180 m box that follows the car
  // but is ~1500 m deep along the light ray, so its slab reaches far out across
  // the terrain — and out there the cells are 100-200 m wide, where no
  // depth/normal bias can stop shadow acne. That printed a ~150 m wide grey
  // band running along the sun azimuth clear across the map. Nothing can cast
  // a shadow more than 90 m from the car anyway, so the far shell simply opts
  // out. (Splitting also saves the far field's shadow-map sampling.)
  const nearMinX = minX - 240, nearMaxX = maxX + 240;
  const nearMinZ = minZ - 240, nearMaxZ = maxZ + 240;
  const nearIdx = [], farIdx = [];
  for (let j = 0; j < NZ - 1; j++) {
    const inZ = zs[j] >= nearMinZ && zs[j + 1] <= nearMaxZ;
    for (let i = 0; i < NX - 1; i++) {
      const a = j * NX + i, b = a + 1, c = a + NX, d = c + 1;
      const near = inZ && xs[i] >= nearMinX && xs[i + 1] <= nearMaxX;
      (near ? nearIdx : farIdx).push(a, c, b, b, c, d);
    }
  }

  // Normals are computed once over the WHOLE sheet and then shared by both
  // shells — computing them per-shell would see only that shell's triangles
  // and light the boundary row differently, printing a seam.
  const posAttr = new THREE.BufferAttribute(positions, 3);
  const uvAttr = new THREE.BufferAttribute(uvs, 2);
  const colAttr = new THREE.BufferAttribute(colors, 3);
  const full = new THREE.BufferGeometry();
  full.setAttribute('position', posAttr);
  full.setIndex(new THREE.Uint32BufferAttribute(nearIdx.concat(farIdx), 1));
  full.computeVertexNormals();
  const nrmAttr = full.getAttribute('normal');

  const shell = (idx) => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', posAttr);
    g.setAttribute('normal', nrmAttr);
    g.setAttribute('uv', uvAttr);
    g.setAttribute('color', colAttr);
    g.setIndex(new THREE.Uint32BufferAttribute(idx, 1));
    g.computeBoundingSphere();
    return g;
  };

  const mesh = new THREE.Group();
  mesh.position.y = -0.02;      // same seat the flat plane had under the road
  mesh.name = 'terrain';
  const near = new THREE.Mesh(shell(nearIdx), opts.material);
  near.receiveShadow = true;
  near.name = 'terrain-near';
  mesh.add(near);
  const far = new THREE.Mesh(shell(farIdx), opts.material);
  far.receiveShadow = false;
  far.name = 'terrain-far';
  mesh.add(far);

  return { height, slope, mesh, flatR, rampR, centre: { x: cx, z: cz } };
}
