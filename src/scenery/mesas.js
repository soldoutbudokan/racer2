/**
 * Desert rock formations: mesas, buttes and hoodoos.
 *
 * The old buttes were seven `CylinderGeometry` drums with a little noise on
 * the sides — round-planned, straight-walled, no apron — which is why they
 * read as flower pots stood on the sand. A real mesa is three things stacked:
 *
 *   1. a CAPROCK table: a hard flat bed, so the top is level and the rim is a
 *      crisp edge in plan that meanders (spurs, coves, a detached corner);
 *   2. a CLIFF through the softer strata below it, near-vertical, with the
 *      beds reading as horizontal bands that step in and out as ledges;
 *   3. a TALUS APRON of everything the cliff has shed, fanning out at ~32°
 *      until it disappears under the sand — the apron is what makes the
 *      formation sit IN the desert instead of on it.
 *
 * Each formation is a lathe around a noisy, elongated plan (no two share one),
 * and every formation merges into ONE mesh with a shared vertex-colour
 * material, so the whole set is one draw call. Strata are keyed off absolute
 * world y (as scenery/mountains.js does for the horizon mesas), so a butte
 * and the mesa behind it carry the same beds at the same heights — they read
 * as remnants of one plateau.
 */
import * as THREE from 'three';
import { fractalNoise, smoothstep } from './noise.js';
import { rand } from './rng.js';

const TAU = Math.PI * 2;

// Sedimentary palette, bottom bed first. Slightly warmer and lighter than the
// horizon mesas so the near formations separate from the haze behind them.
const STRATA = [0x9a5637, 0xb37048, 0x87482f, 0xc4916a, 0x9d5c3d, 0xb07d55];
// Lighter than the first pass (0x74483a): a dark table inside a lit rim read
// as a crater from any high camera.
const CAPROCK = 0xa36e4d;
// Matched to the sand material's rendered tone (the old 0xd8bf95 read as
// white fried eggs from any high camera).
const SCREE = 0xa08462;
const SAND = 0x8f7a58;
const STRATA_H = 9;          // metres per bed

// Vertical profile rows: [heightFraction, planRadiusMultiplier, roughness].
// Cliff rows step in and out with the beds; the apron flares to ~2.3x the
// rim radius. Kept as data so a butte (steeper) can borrow the same shape
// with its own cliff fraction.
const CLIFF_ROWS = [
  [1.000, 1.00, 0.00], [0.985, 1.02, 0.01], [0.94, 1.03, 0.04], [0.88, 1.01, 0.06],
  [0.82, 1.05, 0.05], [0.76, 1.03, 0.07], [0.70, 1.07, 0.06], [0.64, 1.05, 0.08],
  [0.58, 1.09, 0.07],
];
const APRON_ROWS = [
  [0.50, 1.14, 0.10], [0.40, 1.26, 0.12], [0.30, 1.40, 0.13], [0.20, 1.56, 0.14],
  [0.11, 1.74, 0.14], [0.04, 1.90, 0.12], [0.00, 2.02, 0.08],
];

function rnd(a, b) { return a + rand() * (b - a); }

/**
 * One formation into the shared buffers.
 * @param {object} F  {x, z, y0, R, H, elong, yaw, cliffFrac, seed, na}
 */
function buildFormation(F, pos, col, idx, colTmp) {
  const { x: cx, z: cz, y0, R, H, elong, yaw, seed, na } = F;
  const cy = Math.cos(yaw), sy = Math.sin(yaw);
  const base = pos.length / 3;

  // Plan radius multiplier around the rim: an ellipse for the overall
  // elongation, low-frequency lobes for spurs and coves, and a couple of
  // sharper notches where a gully has cut back into the table.
  const plan = new Float32Array(na);
  for (let i = 0; i < na; i++) {
    const a = (i / na) * TAU;
    const ex = Math.cos(a), ez = Math.sin(a) / elong;
    const ell = 1 / Math.hypot(ex, ez);
    const lobes = fractalNoise(Math.cos(a) * 1.6 + seed, Math.sin(a) * 1.6 + seed * 0.7, 3);
    const notch = Math.pow(fractalNoise(Math.cos(a) * 4.2 - seed, Math.sin(a) * 4.2 + seed, 2), 3);
    plan[i] = ell * (0.82 + lobes * 0.42 - notch * 0.22);
  }

  // Rows: cliff rows are scaled to the cliff fraction, apron rows fill the
  // rest. The cap centre and the rim get their own vertices so the table is
  // flat-lit and the rim edge stays crisp under smooth normals.
  const rows = [];
  // CLIFF_ROWS run 1.0 -> 0.58: remap that span onto [1, cliffFrac]. The
  // apron rows run 0.5 -> 0 and fill [cliffFrac, 0].
  for (const [hf, rm, rough] of CLIFF_ROWS) {
    rows.push([F.cliffFrac + (hf - 0.58) / 0.42 * (1 - F.cliffFrac), rm, rough]);
  }
  for (const [hf, rm, rough] of APRON_ROWS) rows.push([hf * F.cliffFrac / 0.5, rm, rough]);
  rows.push([-0.10, 2.15, 0.0]);          // skirt, buried

  // Cap: centre vertex + rim ring (own normals, up).
  const capRise = H * 0.03;
  pos.push(cx, y0 + H + capRise, cz);
  colTmp.set(CAPROCK).multiplyScalar(1.05);
  col.push(colTmp.r, colTmp.g, colTmp.b);
  const rimStart = pos.length / 3;
  for (let i = 0; i < na; i++) {
    const a = (i / na) * TAU;
    const r = R * plan[i];
    const lx = Math.cos(a) * r, lz = Math.sin(a) * r;
    const wx = cx + lx * cy - lz * sy, wz = cz + lx * sy + lz * cy;
    pos.push(wx, y0 + H, wz);
    const d = fractalNoise(wx * 0.08, wz * 0.08, 2);
    colTmp.set(CAPROCK).multiplyScalar(0.9 + d * 0.25);
    col.push(colTmp.r, colTmp.g, colTmp.b);
  }
  for (let i = 0; i < na; i++) {
    idx.push(base, rimStart + i, rimStart + (i + 1) % na);
  }

  // Wall: rows from the rim down to the skirt.
  const wallStart = pos.length / 3;
  const NR = rows.length;
  for (let j = 0; j < NR; j++) {
    const [hf, rm, rough] = rows[j];
    const y = y0 + H * hf;
    const apron = hf < F.cliffFrac;
    for (let i = 0; i < na; i++) {
      const a = (i / na) * TAU;
      // Ledges: per-bed in/out steps, so the beds read as geometry not paint.
      const bed = Math.floor(y / STRATA_H);
      const ledge = apron ? 0 : (fractalNoise(bed * 3.1 + seed, a * 0.9, 1) - 0.5) * 0.10;
      // Gully relief on the wall, fanning out on the apron.
      const g = fractalNoise(Math.cos(a) * 5.5 + seed * 2, Math.sin(a) * 5.5 + hf * 3.0, 3) - 0.5;
      const r = R * plan[i] * (rm + ledge + g * rough);
      const lx = Math.cos(a) * r, lz = Math.sin(a) * r;
      const wx = cx + lx * cy - lz * sy, wz = cz + lx * sy + lz * cy;
      const wy = apron ? y + g * H * 0.05 : y;
      pos.push(wx, wy, wz);

      // Colour: strata by absolute elevation on the cliff, scree/sand on the
      // apron, fake AO in the gullies, warm light on the sun-facing quadrant.
      if (apron) {
        const t = smoothstep(0, F.cliffFrac, hf);
        // Toe is plain sand so the apron dissolves into the ground; scree
        // and shed rock only up near the cliff foot.
        colTmp.set(SAND).lerp(new THREE.Color(SCREE), t * t * 0.9);
        const fan = fractalNoise(Math.cos(a) * 3 + seed, Math.sin(a) * 3, 2);
        colTmp.lerp(new THREE.Color(STRATA[bed % STRATA.length]), fan * 0.30 * t);
      } else {
        const sIdx = (y + g * 4) / STRATA_H;
        const k0 = Math.floor(sIdx);
        const frac = sIdx - k0;
        const n = STRATA.length;
        colTmp.set(STRATA[((k0 % n) + n) % n]);
        if (frac > 0.85) colTmp.lerp(new THREE.Color(STRATA[(((k0 + 1) % n) + n) % n]), (frac - 0.85) / 0.15 * 0.7);
        if (hf > 0.96) colTmp.lerp(new THREE.Color(CAPROCK), smoothstep(0.96, 1, hf));
        // Desert varnish: dark streaks running down from the rim.
        const varnish = Math.pow(fractalNoise(Math.cos(a) * 9 + seed, Math.sin(a) * 9, 2), 2.2);
        colTmp.multiplyScalar(1 - varnish * 0.35 * (1 - hf * 0.5));
      }
      colTmp.multiplyScalar(0.82 + (g + 0.5) * 0.30);
      col.push(colTmp.r, colTmp.g, colTmp.b);
    }
  }
  // Row -> row. The rim ring is duplicated: the cap fan owns one copy (normals
  // up) and wall row 0 sits at the same height (normals out), so the table
  // edge stays a crisp crease under smooth normals.
  const rowStart = (j) => wallStart + j * na;
  for (let j = 0; j < NR - 1; j++) {
    for (let i = 0; i < na; i++) {
      const i2 = (i + 1) % na;
      const a = rowStart(j) + i, b = rowStart(j) + i2;
      const c = rowStart(j + 1) + i, d = rowStart(j + 1) + i2;
      // Outward-facing: walking i -> i+1 is counter-clockwise in xz and
      // j -> j+1 descends, so (a, b, c) / (b, d, c) points outward.
      idx.push(a, b, c, b, d, c);
    }
  }
}

/**
 * @param {THREE.Object3D} scene  track group
 * @param {Array} frames          centreline frames
 * @param {object} D              circuit dimensions (armco, terrain)
 * @param {Function} distToTrack  (x, z) -> metres to the nearest centreline sample
 */
export function addMesas(scene, frames, D, distToTrack) {
  const groundAt = D.terrain ? (x, z) => D.terrain.height(x, z) : () => 0;
  const cx = D.terrain?.centre?.x ?? 0;
  const cz = D.terrain?.centre?.z ?? 0;
  let ext = 0;
  for (const f of frames) ext = Math.max(ext, Math.hypot(f.pos.x - cx, f.pos.z - cz));

  // Wish list: a few big mesas well back, buttes closer in, hoodoos at their
  // feet. Deliberately uneven — an evenly spaced ring reads as a stage set.
  const WANTS = [
    { kind: 'mesa', n: 4, R: [55, 95], H: [40, 62], cliff: [0.55, 0.62], near: [ext + 120, ext + 420] },
    { kind: 'butte', n: 7, R: [14, 30], H: [34, 58], cliff: [0.66, 0.74], near: [ext * 0.55 + 60, ext + 260] },
    { kind: 'hoodoo', n: 14, R: [3.5, 7], H: [9, 20], cliff: [0.72, 0.80], near: [ext * 0.5 + 40, ext + 200] },
  ];

  const placed = [];
  const formations = [];
  for (const W of WANTS) {
    let made = 0;
    for (let tries = 0; tries < 90 && made < W.n; tries++) {
      const a = rand() * TAU;
      const rr = rnd(W.near[0], W.near[1]);
      const x = cx + Math.cos(a) * rr, z = cz + Math.sin(a) * rr;
      const R = rnd(W.R[0], W.R[1]);
      const elong = W.kind === 'hoodoo' ? rnd(1.0, 1.3) : rnd(1.15, 1.9);
      const footprint = R * elong * 2.1;          // apron toe radius
      if (distToTrack(x, z) < footprint + D.armco + 10) continue;
      if (placed.some((p) => Math.hypot(p.x - x, p.z - z) < (p.foot + footprint) * 0.8)) continue;
      // Hoodoos cluster at the feet of the bigger formations.
      if (W.kind === 'hoodoo') {
        const host = placed.filter((p) => p.kind !== 'hoodoo');
        if (host.length && rand() < 0.7) {
          const h = host[(rand() * host.length) | 0];
          const ha = rand() * TAU;
          const hx = h.x + Math.cos(ha) * (h.foot + rnd(8, 40));
          const hz = h.z + Math.sin(ha) * (h.foot + rnd(8, 40));
          if (distToTrack(hx, hz) < footprint + D.armco + 8) continue;
          placed.push({ x: hx, z: hz, foot: footprint, kind: W.kind });
          formations.push({ x: hx, z: hz, R, H: rnd(W.H[0], W.H[1]), elong, yaw: rand() * TAU,
            cliffFrac: rnd(W.cliff[0], W.cliff[1]), seed: rand() * 40, na: 18, kind: W.kind });
          made++;
          continue;
        }
      }
      placed.push({ x, z, foot: footprint, kind: W.kind });
      formations.push({ x, z, R, H: rnd(W.H[0], W.H[1]), elong, yaw: rand() * TAU,
        cliffFrac: rnd(W.cliff[0], W.cliff[1]), seed: rand() * 40,
        na: W.kind === 'mesa' ? 56 : W.kind === 'butte' ? 34 : 18, kind: W.kind });
      made++;
    }
  }

  const pos = [], col = [], idx = [];
  const colTmp = new THREE.Color();
  for (const F of formations) {
    // Seat the base a few metres under the local ground so the apron toe is
    // always buried whatever the dunes do beneath it.
    F.y0 = groundAt(F.x, F.z) - 4;
    buildFormation(F, pos, col, idx, colTmp);
  }
  if (!pos.length) return null;

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  geo.setIndex(new THREE.Uint32BufferAttribute(idx, 1));
  geo.computeVertexNormals();
  geo.computeBoundingSphere();
  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true, roughness: 0.97, metalness: 0, envMapIntensity: 0.35,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.name = 'mesas';
  // Not a shadow caster: a 60 m butte under an 11-degree sun throws a 300 m
  // shadow, and the sun's 180 m shadow box that follows the car would paint
  // its own frustum footprint across the desert instead (see the old butte
  // note in track.js). Receives, so the apron picks up the car's shadow.
  mesh.castShadow = false;
  mesh.receiveShadow = true;
  scene.add(mesh);
  return { mesh, formations };
}
