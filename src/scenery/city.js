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
 * Architecture follows the same grammar as the foreground buildings, while
 * streets, planted squares and low-rise neighbourhoods give the city a scale
 * beyond a field of towers. Geometry is merged by material, not by object.
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { fractalNoise } from './noise.js';
import { rand } from './rng.js';
import { createCityArchitecture, cityBuildingStyle } from './cityArchitecture.js';

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
 *   clearOfTrack  (px, pz, hw, hd, margin) -> bool
 *   seaX          nothing east of this (the marina)
 */
export function addCityDistrict(scene, frames, D, opts) {
  const { occupied, facadeMats, clearOfTrack, seaX } = opts;
  const cx = D.terrain?.centre?.x ?? 0;
  const cz = D.terrain?.centre?.z ?? 0;
  let ext = 0;
  for (const f of frames) ext = Math.max(ext, Math.hypot(f.pos.x - cx, f.pos.z - cz));
  const districtR = ext + 330;       // dense fabric
  const fringeR = ext + 780;         // low-rise out toward the skyline ring

  // Test every touched cell, including a partial cell at the far edge. The
  // former stepping loop missed those cells and could overlap a nearby lot.
  const cellKeys = (px, pz, hw, hd) => {
    const keys = [];
    for (let x = Math.floor((px - hw) / GRID); x <= Math.floor((px + hw) / GRID); x++) {
      for (let z = Math.floor((pz - hd) / GRID); z <= Math.floor((pz + hd) / GRID); z++) keys.push(`${x}:${z}`);
    }
    return keys;
  };
  const lotFree = (px, pz, hw, hd) => {
    return !cellKeys(px, pz, hw, hd).some((key) => occupied.has(key));
  };
  const claim = (px, pz, hw, hd) => {
    for (const key of cellKeys(px, pz, hw, hd)) occupied.add(key);
  };

  const architecture = createCityArchitecture(scene, opts, 'city-district');
  const fringe = [], streets = [], paving = [], lawn = [], foliage = [], furniture = [];
  const publicSpaces = [];
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

  const square = (x, z) => {
    const w = BLOCK - 3;
    box(paving, w, 0.18, w, x, 0.09, z);
    // Four planted quarters separated by a generous pair of walking paths.
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
      const tx = x + sx * 11, tz = z + sz * 11;
      box(lawn, 16, 0.1, 16, tx, 0.22, tz);
      box(furniture, 0.45, 4.4, 0.45, tx, 2.4, tz);
      const crown = new THREE.IcosahedronGeometry(1, 2);
      const pos = crown.getAttribute('position');
      for (let i = 0; i < pos.count; i++) {
        const px = pos.getX(i), py = pos.getY(i), pz = pos.getZ(i);
        // A continuous deformation avoids cracks between unshared ico faces.
        const n = 1 + 0.12 * Math.sin(px * 8 + pz * 5) * Math.cos(py * 9 - pz * 3);
        pos.setXYZ(i, tx + px * 4.8 * n, 5.2 + py * 3.0 * n, tz + pz * 4.8 * n);
      }
      crown.computeVertexNormals();
      foliage.push(crown);
      box(furniture, 3.0, 0.12, 0.65, tx - sx * 6, 0.65, tz);
      box(furniture, 0.12, 0.55, 0.55, tx - sx * 6 - 1.1, 0.35, tz);
      box(furniture, 0.12, 0.55, 0.55, tx - sx * 6 + 1.1, 0.35, tz);
    }
    // A low, stone-edged central planter anchors the junction of the paths.
    box(paving, 5, 0.65, 5, x, 0.43, z);
    box(lawn, 4.5, 0.15, 4.5, x, 0.81, z);
    publicSpaces.push({ x, z, halfWidth: w / 2, halfDepth: w / 2, height: 8.6, style: 'planted-square' });
  };

  // ---- Dense district on the block grid ----
  // Grid origin offset so the street pattern is not symmetric about the
  // circuit; blocks whose corner lands in the corridor are just skipped.
  const ox = -27, oz = 13;
  const bx0 = Math.floor((cx - districtR - ox) / PITCH), bx1 = Math.ceil((cx + districtR - ox) / PITCH);
  const bz0 = Math.floor((cz - districtR - oz) / PITCH), bz1 = Math.ceil((cz + districtR - oz) / PITCH);
  let lots = 0, squares = 0, streetSegments = 0;
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
        if (!lotFree(sx, sz, sw / 2, sd / 2)) continue;
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
        // Separate raised sidewalks keep streets from looking like paint on
        // the same car-park plane. Junction openings remain at either end.
        for (const sign of [-1, 1]) {
          if (sw < sd) box(paving, 1.6, 0.18, BLOCK, sx + sign * (sw / 2 - 0.8), 0.09, sz);
          else box(paving, BLOCK, 0.18, 1.6, sx, 0.09, sz + sign * (sd / 2 - 0.8));
        }
        streetSegments++;
      }
      const wholeBlockFree = clearOfTrack(blockX, blockZ, BLOCK / 2, BLOCK / 2, D.armco + 2.6)
        && lotFree(blockX, blockZ, BLOCK / 2, BLOCK / 2);
      if (wholeBlockFree && rand() < 0.07) {
        square(blockX, blockZ);
        claim(blockX, blockZ, BLOCK / 2, BLOCK / 2);
        squares++;
        continue;
      }
      if (wholeBlockFree) box(paving, BLOCK, 0.12, BLOCK, blockX, 0.06, blockZ);
      // Split the block into lots: 1x1, 2x1, 1x2 or 2x2 along each axis.
      const nx = rand() < 0.5 ? 2 : (rand() < 0.5 ? 1 : 3);
      const nz = rand() < 0.5 ? 2 : (rand() < 0.5 ? 1 : 3);
      const lw = BLOCK / nx, ld = BLOCK / nz;
      // Downtown core is tall; the fabric steps down with distance.
      const core = 1 - Math.min(1, Math.max(0, (rc - ext * 0.7) / (districtR - ext * 0.7)));
      for (let li = 0; li < nx; li++) {
        for (let lj = 0; lj < nz; lj++) {
          const px = blockX - BLOCK / 2 + lw * (li + 0.5);
          const pz = blockZ - BLOCK / 2 + ld * (lj + 0.5);
          const w = lw - rnd(2, 5), d = ld - rnd(2, 5);
          if (!clearOfTrack(px, pz, w / 2, d / 2, D.armco + 2.6)) continue;
          if (!lotFree(px, pz, w / 2, d / 2)) continue;
          claim(px, pz, w / 2, d / 2);
          const identity = cityBuildingStyle(px, pz, cx, cz);
          const landmark = identity.style === 'office' && core > 0.45 && rand() < 0.075;
          const h = landmark ? rnd(84, 126)
            : identity.style === 'masonry' ? rnd(12, 24)
            : identity.style === 'residential' ? rnd(18, 30 + core * 18)
            : 18 + Math.pow(rand(), 1.5) * (20 + core * 62);
          architecture.addBuilding({ x: px, z: pz, width: w, depth: d,
            height: h, ...identity, detail: false, landmark });
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
  architecture.finish();
  addMerged(paving, new THREE.MeshStandardMaterial({ color: 0x99998e, roughness: 0.96 }), 'city-public-paving', false);
  addMerged(lawn, new THREE.MeshStandardMaterial({ color: 0x586044, roughness: 1 }), 'city-public-gardens', false);
  addMerged(foliage, new THREE.MeshStandardMaterial({ color: 0x38513b, roughness: 0.94 }), 'city-square-trees', true);
  addMerged(furniture, new THREE.MeshStandardMaterial({ color: 0x615b4d, roughness: 0.88 }), 'city-square-furniture', true);
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
  scene.userData.cityPublicSpaces = publicSpaces;
  scene.userData.cityDistrict = { buildings: lots, squares, streetSegments };
  return lots;
}
