/**
 * City fabric for the street circuit: the districts BEHIND the raced blocks.
 *
 * track.js builds two tiers of buildings hugging the walls and a ring of
 * hazed silhouette towers 800-1600 m out. Between them there was nothing — a
 * flat grey plane — so from any camera above the walls the "city" was a
 * clump of towers standing in a car park. A city is continuous fabric: block
 * after block on a street grid, low where it is old, tall where it is new,
 * with the streets themselves visible as dark lines between the blocks.
 *
 * So this lays a street grid over everything inside `districtR` of the
 * circuit (minus the sea sector), fills every block that clears the track and
 * the trackside tiers with two to four lots of building, and paints the
 * streets as dark asphalt strips with kerb lines. Height falls off with
 * distance from the circuit — the race runs through the downtown core — with
 * a few landmark towers scattered through the mid-rise. Beyond the district a
 * coarser, haze-tinted ring of low-rise runs out to the skyline towers so the
 * ground plane never shows bare between them.
 *
 * Budget: every box is merged by material, so the whole fill is ~8 meshes.
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { fractalNoise } from './noise.js';
import { rand } from './rng.js';

const GRID = 6;          // must match addCityBuildings' lot grid in track.js
const BLOCK = 48;        // metres of block between streets (8 grid cells)
const STREET = 12;       // metres of street (2 grid cells)
const PITCH = BLOCK + STREET;

function rnd(a, b) { return a + rand() * (b - a); }

// Street asphalt with a centre line and kerb edges, tiled along the strip.
function makeStreetTexture() {
  const w = 64, h = 256;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const n = fractalNoise(x * 0.35, y * 0.35, 3);
      let v = 0.20 + n * 0.10;
      // pale kerb lines at both edges, a broken centre line
      if (x < 3 || x >= w - 3) v = 0.55 + n * 0.1;
      if (Math.abs(x - w / 2) < 1.2 && (y % 48) < 22) v = 0.72;
      const i = (y * w + x) * 4;
      img.data[i] = v * 255 * 0.98; img.data[i + 1] = v * 255; img.data[i + 2] = v * 255 * 1.04; img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}

/**
 * @param {THREE.Object3D} scene
 * @param {Array} frames
 * @param {object} D            circuit dimensions ({ armco, terrain })
 * @param {object} opts
 *   occupied      Set of "cx:cz" 6 m cells already used by the trackside tiers
 *   facadeMats    array of MeshStandardMaterial with facade maps (from track.js)
 *   podiumMat     storefront material
 *   darkMat       parapets / plant rooms
 *   clearOfTrack  (px, pz, hw, hd, margin) -> bool
 *   seaX          nothing east of this (the marina)
 */
export function addCityDistrict(scene, frames, D, opts) {
  const { occupied, facadeMats, podiumMat, darkMat, clearOfTrack, seaX } = opts;
  const cx = D.terrain?.centre?.x ?? 0;
  const cz = D.terrain?.centre?.z ?? 0;
  let ext = 0;
  for (const f of frames) ext = Math.max(ext, Math.hypot(f.pos.x - cx, f.pos.z - cz));
  const districtR = ext + 330;       // dense fabric
  const fringeR = ext + 780;         // low-rise out toward the skyline ring

  const cellKey = (x, z) => Math.floor(x / GRID) + ':' + Math.floor(z / GRID);
  const lotFree = (px, pz, hw, hd) => {
    for (let x = px - hw + 1; x < px + hw; x += GRID) {
      for (let z = pz - hd + 1; z < pz + hd; z += GRID) {
        if (occupied.has(cellKey(x, z))) return false;
      }
    }
    return true;
  };
  const claim = (px, pz, hw, hd) => {
    for (let x = px - hw + 1; x < px + hw; x += GRID) {
      for (let z = pz - hd + 1; z < pz + hd; z += GRID) occupied.add(cellKey(x, z));
    }
  };

  const buckets = facadeMats.map(() => []);
  const podium = [], dark = [], fringe = [], streets = [];
  const box = (bucket, w, h, d, px, py, pz, fx = 1, fy = 1, tint = null) => {
    const geo = new THREE.BoxGeometry(w, h, d);
    if (fx !== 1 || fy !== 1) {
      const uv = geo.getAttribute('uv');
      for (let v = 0; v < uv.count; v++) uv.setXY(v, uv.getX(v) * fx, uv.getY(v) * fy);
    }
    if (tint) {
      const count = geo.getAttribute('position').count;
      const col = new Float32Array(count * 3);
      for (let v = 0; v < count; v++) { col[v * 3] = tint[0]; col[v * 3 + 1] = tint[1]; col[v * 3 + 2] = tint[2]; }
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    }
    geo.translate(px, py, pz);
    bucket.push(geo);
  };

  // A building on a lot: podium + tower, optional setback, roof furniture.
  const building = (px, pz, w, d, h, matIdx, landmark) => {
    let base = 0;
    if (h > 14 && rand() < 0.6) {
      const ph = rand() < 0.5 ? 4.5 : 9;
      box(podium, w, ph, d, px, ph / 2, pz, Math.max(1, Math.round(w / 12)), Math.max(1, Math.round(ph / 4.5)));
      box(dark, w + 0.4, 0.4, d + 0.4, px, ph + 0.2, pz);
      base = ph + 0.4;
    }
    const tw = base ? Math.max(8, w - rnd(2, 5)) : w;
    const td = base ? Math.max(8, d - rnd(2, 5)) : d;
    box(buckets[matIdx], tw, h, td, px, base + h / 2, pz,
      Math.max(1, Math.round(tw / 13)), Math.max(1, Math.round(h / 24)));
    let topY = base + h;
    box(dark, tw + 0.4, 0.6, td + 0.4, px, topY + 0.3, pz);
    if (landmark || (h > 40 && rand() < 0.45)) {
      // setback crown
      const sw = tw * rnd(0.5, 0.75), sd = td * rnd(0.5, 0.75), sh = h * rnd(0.2, 0.45);
      box(buckets[matIdx], sw, sh, sd, px + (rand() - 0.5) * (tw - sw), topY + sh / 2, pz + (rand() - 0.5) * (td - sd),
        Math.max(1, Math.round(sw / 13)), Math.max(1, Math.round(sh / 24)));
      topY += sh;
      box(dark, sw + 0.4, 0.5, sd + 0.4, px, topY + 0.25, pz);
    }
    const acN = (rand() * 3) | 0;
    for (let a = 0; a < acN; a++) {
      box(dark, rnd(1.2, 2.4), rnd(0.8, 1.6), rnd(1.0, 2.0),
        px + (rand() - 0.5) * (tw - 4), topY + 0.9, pz + (rand() - 0.5) * (td - 4));
    }
    if (rand() < 0.25) box(dark, 0.22, rnd(4, 11), 0.22, px, topY + 3, pz);
  };

  // ---- Dense district on the block grid ----
  // Grid origin offset so the street pattern is not symmetric about the
  // circuit; blocks whose corner lands in the corridor are just skipped.
  const ox = -27, oz = 13;
  const bx0 = Math.floor((cx - districtR - ox) / PITCH), bx1 = Math.ceil((cx + districtR - ox) / PITCH);
  const bz0 = Math.floor((cz - districtR - oz) / PITCH), bz1 = Math.ceil((cz + districtR - oz) / PITCH);
  let lots = 0;
  for (let bi = bx0; bi <= bx1; bi++) {
    for (let bj = bz0; bj <= bz1; bj++) {
      const blockX = ox + bi * PITCH + BLOCK / 2;
      const blockZ = oz + bj * PITCH + BLOCK / 2;
      const rc = Math.hypot(blockX - cx, blockZ - cz);
      if (rc > districtR) continue;
      if (blockX + BLOCK / 2 > seaX) continue;
      // Streets around this block (its +x and +z edges), only where clear of
      // the race road — the corridor already has its own asphalt.
      for (const [sx, sz, sw, sd] of [
        [blockX + BLOCK / 2 + STREET / 2, blockZ, STREET, BLOCK + STREET],
        [blockX, blockZ + BLOCK / 2 + STREET / 2, BLOCK + STREET, STREET],
      ]) {
        if (sx + sw / 2 > seaX) continue;
        if (!clearOfTrack(sx, sz, sw / 2, sd / 2, D.armco + 2.5)) continue;
        const g = new THREE.PlaneGeometry(sw, sd);
        g.rotateX(-Math.PI / 2);
        const uv = g.getAttribute('uv');
        const along = sw > sd;
        for (let v = 0; v < uv.count; v++) {
          // u across the street, v along it: 16 m per texture repeat
          const u = along ? uv.getY(v) : uv.getX(v);
          const w2 = along ? uv.getX(v) * sw / 16 : uv.getY(v) * sd / 16;
          uv.setXY(v, u, w2);
        }
        g.translate(sx, 0.035, sz);
        streets.push(g);
      }
      // Split the block into lots: 1x1, 2x1, 1x2 or 2x2 along each axis.
      const nx = rand() < 0.5 ? 2 : (rand() < 0.5 ? 1 : 3);
      const nz = rand() < 0.5 ? 2 : (rand() < 0.5 ? 1 : 3);
      const lw = BLOCK / nx, ld = BLOCK / nz;
      // Downtown core is tall; the fabric steps down with distance.
      const core = 1 - Math.min(1, Math.max(0, (rc - ext * 0.7) / (districtR - ext * 0.7)));
      for (let li = 0; li < nx; li++) {
        for (let lj = 0; lj < nz; lj++) {
          if (rand() < 0.08) continue;                     // a car park, a plaza
          const px = blockX - BLOCK / 2 + lw * (li + 0.5);
          const pz = blockZ - BLOCK / 2 + ld * (lj + 0.5);
          const w = lw - rnd(2, 5), d = ld - rnd(2, 5);
          if (!clearOfTrack(px, pz, w / 2, d / 2, D.armco + 2.6)) continue;
          if (!lotFree(px, pz, w / 2, d / 2)) continue;
          claim(px, pz, w / 2, d / 2);
          const landmark = rand() < 0.035;
          const h = landmark
            ? rnd(70, 130)
            : 9 + Math.pow(rand(), 1.6) * (14 + core * 58);
          building(px, pz, w, d, h, (rand() * facadeMats.length) | 0, landmark);
          lots++;
        }
      }
    }
  }

  // ---- Low-rise fringe out toward the skyline ring ----
  // One or two long slabs per coarse cell, tinted toward the haze with
  // distance so they melt into the horizon rather than ending at a wall.
  const haze = new THREE.Color(0xb7bcc4);
  const tmp = new THREE.Color();
  const FP = 84;
  const fx0 = Math.floor((cx - fringeR) / FP), fx1 = Math.ceil((cx + fringeR) / FP);
  const fz0 = Math.floor((cz - fringeR) / FP), fz1 = Math.ceil((cz + fringeR) / FP);
  for (let fi = fx0; fi <= fx1; fi++) {
    for (let fj = fz0; fj <= fz1; fj++) {
      const px = fi * FP + 31, pz = fj * FP - 17;
      const rc = Math.hypot(px - cx, pz - cz);
      if (rc < districtR - 20 || rc > fringeR) continue;
      if (px > seaX - 40) continue;
      const t = (rc - districtR) / (fringeR - districtR);
      const nBox = rand() < 0.5 ? 2 : 1;
      for (let k = 0; k < nBox; k++) {
        const w = rnd(22, 58), d = rnd(18, 44), h = rnd(8, 26) + (rand() < 0.06 ? rnd(30, 70) : 0);
        const qx = px + (rand() - 0.5) * 30, qz = pz + (rand() - 0.5) * 30;
        tmp.setHSL(0.58 + (rand() - 0.5) * 0.05, 0.08 + rand() * 0.08, 0.30 + rand() * 0.12);
        tmp.lerp(haze, 0.15 + t * 0.55);
        box(fringe, w, h, d, qx, h / 2, qz, Math.max(1, Math.round(w / 13)), Math.max(1, Math.round(h / 24)), [tmp.r, tmp.g, tmp.b]);
      }
    }
  }

  const addMerged = (geos, mat, name, shadows) => {
    if (!geos.length) return;
    const mesh = new THREE.Mesh(mergeGeometries(geos), mat);
    mesh.castShadow = shadows;
    mesh.receiveShadow = true;
    mesh.name = name;
    scene.add(mesh);
    for (const g of geos) g.dispose();
  };
  buckets.forEach((geos, i) => addMerged(geos, facadeMats[i], `city-district-${i}`, true));
  addMerged(podium, podiumMat, 'city-district-podium', true);
  addMerged(dark, darkMat, 'city-district-roof', false);
  addMerged(fringe, new THREE.MeshStandardMaterial({
    map: facadeMats[0].map, vertexColors: true, roughness: 0.85, metalness: 0.05,
    envMapIntensity: 0.25, fog: true,
  }), 'city-fringe', false);

  if (streets.length) {
    const tex = makeStreetTexture();
    const mesh = new THREE.Mesh(mergeGeometries(streets), new THREE.MeshStandardMaterial({
      map: tex, roughness: 0.92, metalness: 0,
      polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1,
    }));
    mesh.receiveShadow = true;
    mesh.name = 'city-streets';
    scene.add(mesh);
    for (const g of streets) g.dispose();
  }
  return lots;
}
