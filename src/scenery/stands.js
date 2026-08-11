/**
 * Spectator stands and the pit complex.
 *
 * These used to be a handful of plain boxes per structure: a stepped concrete
 * wedge with a crowd-speckle plane on it, and a 145 m extruded slab of pit
 * building. Under an 11 degree sun with ACES tone mapping, a big untextured
 * pale box has nothing to break it up, so both read as white slabs parked in
 * the middle of the frame on the main straight. The cure is not more colour,
 * it is more STRUCTURE: things a real stand has that catch the light at
 * different angles — a raked deck of individual seats, a truss you can see the
 * sky through, panel joints, soffits that go dark, painted ground.
 *
 * Everything here is merged or instanced down to a fixed, small number of
 * meshes, because draw calls (each drawn ~3x thanks to the GTAO prepass) are
 * the real budget, not triangles:
 *
 *   addGrandstands  -> 6 meshes  (concrete, steel, cladding, seats*, crowd, fascia)
 *   addPitComplex   -> 7 meshes  (lane paint, concrete, steel, doors*, glass,
 *                                 equipment, banner)                (* instanced)
 *
 * Placement contract: every structure sits on the flat corridor, so y = 0 is
 * the ground. `terrain.flatR` is the guaranteed-flat radius from the
 * centreline; both builders clamp their own footprint against it rather than
 * trusting the hand-authored depths to fit on the widest circuit (Sunset
 * Speedway's run-off is 9 m and pushed the old pit wall INSIDE the live track).
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { hashFn } from './noise.js';
import { rand } from './rng.js';

// ---------------------------------------------------------------------------
// Small geometry helpers. Everything is built as loose BufferGeometry in a
// per-material bucket and merged once at the end.
// ---------------------------------------------------------------------------

const _col = new THREE.Color();
const _a = new THREE.Vector3();
const _b = new THREE.Vector3();
const _dir = new THREE.Vector3();
const _q = new THREE.Quaternion();
const _m = new THREE.Matrix4();
const _one = new THREE.Vector3(1, 1, 1);
const UP = new THREE.Vector3(0, 1, 0);

// Decorrelates the per-vertex grime jitter between structures built from the
// same local template — without it every stand carries an identical stain
// pattern and the eye reads them as one stamped shape (which is exactly the
// "procedural-looking" failure the owner rejects).
let PAINT_SEED = 0;

/**
 * Bake tone into vertex colours. Two jobs:
 *  - Down-facing faces get pushed dark. With the sun at 11 degrees, soffits
 *    and undersides receive almost nothing but hemisphere ambient, and GTAO's
 *    0.6 m radius is far too tight to darken a 6 m roof underside. Without
 *    this the underside of a cantilever roof is the same tone as its sunlit
 *    top and the whole thing flattens into a slab.
 *  - A low-amplitude hash jitter so no two panels are exactly equal.
 */
function paint(geo, hex, jitter = 0.05) {
  const pos = geo.attributes.position;
  const nrm = geo.attributes.normal;
  const n = pos.count;
  const arr = new Float32Array(n * 3);
  _col.set(hex);
  for (let i = 0; i < n; i++) {
    const ny = nrm ? nrm.getY(i) : 0;
    let k = 1;
    if (ny < -0.45) k = 0.5;             // soffit / underside
    else if (ny < -0.05) k = 0.78;
    else if (ny > 0.6) k = 1.05;         // up-facing catches sky fill
    const h = hashFn(pos.getX(i) * 0.31 + PAINT_SEED, pos.getZ(i) * 0.37 - PAINT_SEED);
    k *= 1 - jitter * 0.5 + h * jitter;
    arr[i * 3] = _col.r * k;
    arr[i * 3 + 1] = _col.g * k;
    arr[i * 3 + 2] = _col.b * k;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(arr, 3));
  return geo;
}

/**
 * Re-project a box's UVs into world-ish metres so a merged pile of differently
 * sized boxes shares one continuous panel grid. BoxGeometry's own 0..1 per
 * face would stretch the cladding pattern differently on every part.
 */
function worldUV(geo, metresPerTile) {
  const pos = geo.attributes.position;
  const nrm = geo.attributes.normal;
  const uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    const nx = Math.abs(nrm.getX(i)), ny = Math.abs(nrm.getY(i)), nz = Math.abs(nrm.getZ(i));
    let u, v;
    if (ny > nx && ny > nz) { u = pos.getX(i); v = pos.getZ(i); }
    else if (nx >= nz) { u = pos.getZ(i); v = pos.getY(i); }
    else { u = pos.getX(i); v = pos.getY(i); }
    uv.setXY(i, u / metresPerTile, v / metresPerTile);
  }
  uv.needsUpdate = true;
  return geo;
}

function box(out, hex, w, h, d, x, y, z, opt = {}) {
  const g = new THREE.BoxGeometry(w, h, d);
  if (opt.rx) g.rotateX(opt.rx);
  if (opt.ry) g.rotateY(opt.ry);
  if (opt.rz) g.rotateZ(opt.rz);
  g.translate(x, y, z);
  paint(g, hex, opt.jitter ?? 0.05);
  if (opt.tile) worldUV(g, opt.tile);
  out.push(g);
  return g;
}

/** A box stretched between two points — truss chords, diagonals, tie rods. */
function strut(out, hex, ax, ay, az, bx, by, bz, t) {
  _a.set(ax, ay, az);
  _b.set(bx, by, bz);
  _dir.subVectors(_b, _a);
  const len = _dir.length();
  if (len < 1e-3) return;
  _dir.divideScalar(len);
  _q.setFromUnitVectors(UP, _dir);
  const g = new THREE.BoxGeometry(t, len, t);
  _m.compose(_a.clone().addScaledVector(_dir, len * 0.5), _q, _one);
  g.applyMatrix4(_m);
  paint(g, hex, 0.05);
  out.push(g);
}

function cyl(out, hex, rTop, rBot, h, x, y, z, seg = 10, opt = {}) {
  const g = new THREE.CylinderGeometry(rTop, rBot, h, seg, 1);
  if (opt.rx) g.rotateX(opt.rx);
  if (opt.ry) g.rotateY(opt.ry);
  if (opt.rz) g.rotateZ(opt.rz);
  g.translate(x, y, z);
  paint(g, hex, opt.jitter ?? 0.06);
  out.push(g);
  return g;
}

/** Flat quad facing +z, with an explicit UV window into an atlas row. */
function quadZ(out, w, h, x, y, z, u0, u1, v0, v1, hex = 0xffffff, jitter = 0.03) {
  const g = new THREE.PlaneGeometry(w, h);
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) {
    uv.setXY(i, u0 + uv.getX(i) * (u1 - u0), v0 + uv.getY(i) * (v1 - v0));
  }
  g.translate(x, y, z);
  paint(g, hex, jitter);
  out.push(g);
  return g;
}

function mergedMesh(list, material, opt = {}) {
  if (!list.length) return null;
  const geo = mergeGeometries(list, false);
  if (!geo) return null;
  for (const g of list) g.dispose();
  geo.computeBoundingSphere();
  const mesh = new THREE.Mesh(geo, material);
  mesh.castShadow = !!opt.cast;
  mesh.receiveShadow = opt.receive !== false;
  if (opt.name) mesh.name = opt.name;
  return mesh;
}

const rnd = (a, b) => a + rand() * (b - a);
const pick = (arr) => arr[(rand() * arr.length) | 0];

/**
 * v-range of row `r` (counted from the TOP of the canvas) in an n-row atlas.
 * Textures upload with flipY, so canvas row 0 lands at v = 1 — getting this
 * backwards silently swaps which atlas row a stand uses, which is invisible
 * until two stands that should differ come out identical.
 */
function atlasRow(r, n = 4, inset = 0.007) {
  return [1 - (r + 1) / n + inset, 1 - r / n - inset];
}

// ---------------------------------------------------------------------------
// Canvas textures (no external assets — everything is drawn at runtime)
// ---------------------------------------------------------------------------

function canvasTex(w, h, draw, repeat = false) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  if (repeat) { tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping; }
  else { tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.ClampToEdgeWrapping; }
  return tex;
}

/**
 * Crowd atlas: four rows at descending density, so one material can serve a
 * packed main stand and a half-empty back straight terrace. The figures only
 * occupy the upper ~0.85 m of each row — the bottom of the strip stays dark so
 * the instanced seat blocks in front of it read as seats, not as a painted
 * band. Repeats horizontally every 14 figures (8.7 m at 0.62 m seat pitch).
 */
function makeCrowdAtlas() {
  const W = 512, H = 256, BANDS = 4;
  const bh = H / BANDS;
  const dens = [0.94, 0.70, 0.44, 0.20];
  const shirt = ['#b8452f', '#2f56a0', '#d6d2c8', '#2a2d33', '#3d7048', '#c99a35',
    '#6f3a80', '#a8a294', '#82202a', '#28536b', '#8d8f95', '#5d4632'];
  const skin = ['#c99a72', '#a97a52', '#7a5537', '#e0b48c', '#5a3c26'];
  return canvasTex(W, H, (ctx) => {
    for (let b = 0; b < BANDS; b++) {
      const y0 = b * bh;
      // The bank behind the people: shadowed seat backs, not black.
      ctx.fillStyle = '#212429';
      ctx.fillRect(0, y0, W, bh);
      for (let i = 0; i < 26; i++) {
        ctx.fillStyle = `rgba(10,11,14,${0.1 + rand() * 0.2})`;
        ctx.fillRect(rand() * W, y0 + rand() * bh, 6 + rand() * 40, 3 + rand() * 8);
      }
      const N = 14;
      const pitch = W / N;
      for (let i = 0; i < N; i++) {
        if (rand() > dens[b]) continue;
        const x = i * pitch + pitch * 0.5 + (rand() - 0.5) * 6;
        const sh = shirt[(rand() * shirt.length) | 0];
        const sk = skin[(rand() * skin.length) | 0];
        const lean = (rand() - 0.5) * 4;
        const tall = rand() < 0.12 ? 8 : 0;   // a few standing up
        // Draw three times so figures straddling the seam still wrap.
        for (const ox of [-W, 0, W]) {
          const px = x + ox;
          ctx.fillStyle = sh;
          ctx.beginPath();
          const tw = 11 + rand() * 2;
          ctx.moveTo(px - tw, y0 + bh * 0.86);
          ctx.lineTo(px - tw * 0.82 + lean, y0 + bh * 0.34 - tall);
          ctx.lineTo(px + tw * 0.82 + lean, y0 + bh * 0.34 - tall);
          ctx.lineTo(px + tw, y0 + bh * 0.86);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = sk;
          ctx.beginPath();
          ctx.arc(px + lean, y0 + bh * 0.24 - tall, 5.4, 0, Math.PI * 2);
          ctx.fill();
          // hair / cap
          ctx.fillStyle = rand() < 0.35 ? '#d8d4cc' : '#2b241d';
          ctx.fillRect(px + lean - 5.4, y0 + bh * 0.24 - tall - 5.6, 10.8, 3.4);
        }
      }
      // A soft dark gradient into the row above hides the atlas seam under mips.
      const g = ctx.createLinearGradient(0, y0, 0, y0 + 6);
      g.addColorStop(0, 'rgba(16,17,20,0.9)');
      g.addColorStop(1, 'rgba(16,17,20,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, y0, W, 6);
    }
  });
}

/**
 * Profiled metal cladding, tiling exactly at 4 m: 0.25 m ribs, 1 m panel
 * joints, 2 m sheet laps, rivets, rain streaks. Everything is drawn on an
 * exact period so it needs no `makeTileable` cross-fade.
 */
function makeCladTexture() {
  const S = 256;                 // 256 px = 4 m
  return canvasTex(S, S, (ctx) => {
    ctx.fillStyle = '#8d9196';
    ctx.fillRect(0, 0, S, S);
    // Trapezoidal ribs every 16 px (0.25 m): a lit face and a shaded face.
    for (let x = 0; x < S; x += 16) {
      ctx.fillStyle = 'rgba(255,255,255,0.10)';
      ctx.fillRect(x + 2, 0, 4, S);
      ctx.fillStyle = 'rgba(24,27,31,0.22)';
      ctx.fillRect(x + 10, 0, 4, S);
    }
    // Panel joints every 64 px (1 m).
    for (let x = 0; x < S; x += 64) {
      ctx.fillStyle = 'rgba(18,20,24,0.6)';
      ctx.fillRect(x, 0, 2, S);
      ctx.fillStyle = 'rgba(255,255,255,0.14)';
      ctx.fillRect(x + 2, 0, 1, S);
    }
    // Sheet laps every 128 px (2 m) plus a rivet line.
    for (let y = 0; y < S; y += 128) {
      ctx.fillStyle = 'rgba(20,22,26,0.42)';
      ctx.fillRect(0, y, S, 2);
      ctx.fillStyle = 'rgba(255,255,255,0.10)';
      ctx.fillRect(0, y + 2, S, 1);
      for (let x = 4; x < S; x += 16) {
        ctx.fillStyle = 'rgba(40,44,50,0.5)';
        ctx.fillRect(x, y + 5, 2, 2);
      }
    }
    // Rain grime running down the sheets (vertical, so it tiles in y for free).
    for (let i = 0; i < 70; i++) {
      const x = rand() * S;
      ctx.fillStyle = `rgba(46,44,40,${0.03 + rand() * 0.07})`;
      ctx.fillRect(x, 0, 1 + rand() * 3, S);
    }
  }, true);
}

/**
 * Fascia name-band atlas: four rows, so every stand can carry a different
 * legend off one material. Row v is selected per stand.
 */
function makeFasciaAtlas(rows) {
  const W = 2048, H = 256, bh = H / 4;
  return canvasTex(W, H, (ctx) => {
    for (let r = 0; r < 4; r++) {
      const y0 = r * bh;
      ctx.fillStyle = '#181b21';
      ctx.fillRect(0, y0, W, bh);
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.fillRect(0, y0 + 2, W, 3);
      // Checker blocks at both ends.
      for (const x0 of [8, W - 120]) {
        for (let i = 0; i < 7; i++) {
          for (let j = 0; j < 4; j++) {
            ctx.fillStyle = (i + j) % 2 ? '#e6e6e4' : '#181b21';
            ctx.fillRect(x0 + i * 16, y0 + 6 + j * 12, 16, 12);
          }
        }
      }
      ctx.fillStyle = '#e9ebef';
      ctx.font = 'bold 38px Arial Black, Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.letterSpacing = '16px';
      ctx.fillText(rows[r % rows.length], W / 2, y0 + bh * 0.46);
      ctx.letterSpacing = '0px';
      ctx.fillStyle = ['#c4261e', '#1e5fb0', '#c4261e', '#c9a227'][r];
      ctx.fillRect(W / 2 - 420, y0 + bh - 12, 840, 5);
    }
  });
}

/** Ribbed roller-shutter door: mid steel with a curved-sheet sheen. */
function makeRollerDoor() {
  const w = 128, h = 128;
  return canvasTex(w, h, (ctx) => {
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0.0, '#2c2f35');
    grad.addColorStop(0.45, '#565b62');
    grad.addColorStop(1.0, '#33363c');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    const slats = 17;
    for (let i = 1; i < slats; i++) {
      const y = Math.round((i * h) / slats);
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, y - 1, w, 2);
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.fillRect(0, y + 1, w, 1);
    }
    // Guide rails down each edge and a pull band at the bottom.
    ctx.fillStyle = 'rgba(20,22,26,0.75)';
    ctx.fillRect(0, 0, 4, h);
    ctx.fillRect(w - 4, 0, 4, h);
    ctx.fillStyle = '#2a2c31';
    ctx.fillRect(0, h - 12, w, 8);
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `rgba(30,26,22,${0.03 + rand() * 0.07})`;
      ctx.fillRect(rand() * w, h - 40 * rand(), 2 + rand() * 5, 40);
    }
  });
}

/**
 * The pit-lane ground: one non-repeating sheet covering the working lane and
 * the fast lane. The old apron was a single flat concrete colour, which is why
 * a 150 m slab read as washed-out card. Everything that gives a pit lane its
 * character is paint and dirt, so it all lives here: slab joints, the white
 * fast-lane boundary, entry/exit hatching, per-box numbers, oil pools, tyre
 * scuffs pulling into each box.
 *
 * u runs along the lane (0 at the entry end), v across it: v=0 at the garage
 * threshold, v=1 at the pit wall.
 */
function makePitLaneTexture(bays) {
  const W = 4096, H = 384;
  const V_SILL = 0.055, V_LINE = 0.455, V_LINE2 = 0.50;
  return canvasTex(W, H, (ctx) => {
    // Working lane (garage side): pale concrete slabs.
    ctx.fillStyle = '#8e8f8a';
    ctx.fillRect(0, 0, W, H * V_LINE);
    // Threshold strip at the garage doors, kept slightly darker (always shaded).
    ctx.fillStyle = '#77786f';
    ctx.fillRect(0, 0, W, H * V_SILL);
    // Fast lane: asphalt, distinctly darker and warmer than the concrete so the
    // two halves of the lane never merge into one grey field.
    ctx.fillStyle = '#4c4b49';
    ctx.fillRect(0, H * V_LINE2, W, H);

    // --- concrete slab joints -------------------------------------------
    for (let i = 0; i <= 52; i++) {
      const x = (i / 52) * W + (rand() - 0.5) * 3;
      ctx.fillStyle = 'rgba(46,46,44,0.55)';
      ctx.fillRect(x, 0, 2.5, H * V_LINE);
      ctx.fillStyle = 'rgba(255,255,255,0.07)';
      ctx.fillRect(x + 2.5, 0, 1.5, H * V_LINE);
    }
    for (const v of [0.17, 0.30, 0.41]) {
      ctx.fillStyle = 'rgba(46,46,44,0.45)';
      ctx.fillRect(0, H * v, W, 2.5);
    }
    // Blotchy pour variation, or the slabs read as one printed sheet.
    for (let i = 0; i < 340; i++) {
      const x = rand() * W, y = rand() * H * V_LINE;
      const r = 20 + rand() * 130;
      ctx.fillStyle = `rgba(${120 + rand() * 40 | 0},${120 + rand() * 40 | 0},${115 + rand() * 40 | 0},0.09)`;
      ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.5, 0, 0, Math.PI * 2); ctx.fill();
    }
    // Asphalt aggregate speckle.
    for (let i = 0; i < 2600; i++) {
      const x = rand() * W, y = H * V_LINE2 + rand() * H * (1 - V_LINE2);
      ctx.fillStyle = `rgba(${140 + rand() * 70 | 0},${138 + rand() * 70 | 0},${132 + rand() * 70 | 0},0.12)`;
      ctx.fillRect(x, y, 2, 2);
    }

    // --- fast-lane boundary and wall edge line --------------------------
    ctx.fillStyle = '#dededa';
    ctx.fillRect(0, H * V_LINE, W, H * (V_LINE2 - V_LINE));
    ctx.fillRect(0, H * 0.955, W, H * 0.022);

    // --- entry / exit: hatched blend wedges at both ends -----------------
    for (const end of [0, 1]) {
      const dir = end === 0 ? 1 : -1;
      const x0 = end === 0 ? 0 : W;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x0, H * 0.98);
      ctx.lineTo(x0 + dir * W * 0.075, H * 0.98);
      ctx.lineTo(x0 + dir * W * 0.075, H * V_LINE2);
      ctx.lineTo(x0, H * V_LINE2);
      ctx.closePath();
      ctx.clip();
      ctx.strokeStyle = 'rgba(226,226,222,0.85)';
      ctx.lineWidth = 7;
      for (let i = -20; i < 40; i++) {
        ctx.beginPath();
        ctx.moveTo(x0 + dir * i * 26, H);
        ctx.lineTo(x0 + dir * (i * 26 + 90), H * V_LINE2);
        ctx.stroke();
      }
      ctx.restore();
      // Solid line closing the wedge off from the fast lane.
      ctx.fillStyle = '#dededa';
      ctx.fillRect(end === 0 ? 0 : W - W * 0.078, H * V_LINE2 - 3, W * 0.078, 6);
      ctx.save();
      ctx.translate(x0 + dir * W * 0.038, H * 0.72);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = 'rgba(232,232,228,0.9)';
      ctx.font = 'bold 46px Arial Black, Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(end === 0 ? 'PIT ENTRY' : 'PIT EXIT', 0, 0);
      ctx.restore();
    }

    // --- per-box markings ------------------------------------------------
    bays.forEach((bay, i) => {
      const cx = bay.u * W;
      const halfW = bay.hw * W;
      // Painted box outline in the working lane.
      ctx.strokeStyle = 'rgba(232,232,226,0.8)';
      ctx.lineWidth = 5;
      ctx.strokeRect(cx - halfW * 0.55, H * 0.10, halfW * 1.1, H * 0.24);
      // Stop line the car noses up to.
      ctx.fillStyle = 'rgba(226,226,220,0.85)';
      ctx.fillRect(cx - halfW * 0.55, H * 0.325, halfW * 1.1, 6);
      // Box number, rotated so it reads from the pit wall looking in.
      ctx.save();
      ctx.translate(cx + halfW * 0.72, H * 0.22);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = 'rgba(238,238,232,0.86)';
      ctx.font = 'bold 78px Arial Black, Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(i + 1), 0, 0);
      ctx.restore();
      // Oil / fuel staining, heaviest right where the car sits.
      for (let k = 0; k < 16; k++) {
        const x = cx + (rand() - 0.5) * halfW * 1.4;
        const y = H * (0.08 + rand() * 0.30);
        const r = 6 + rand() * 34;
        ctx.fillStyle = `rgba(28,26,24,${0.05 + rand() * 0.16})`;
        ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.62, rand(), 0, Math.PI * 2); ctx.fill();
      }
      // Tyre scuffs curving out of the box into the fast lane.
      ctx.strokeStyle = 'rgba(26,24,23,0.30)';
      for (let k = 0; k < 5; k++) {
        ctx.lineWidth = 5 + rand() * 7;
        ctx.beginPath();
        const sx = cx + (rand() - 0.5) * halfW * 0.7;
        ctx.moveTo(sx, H * 0.30);
        ctx.bezierCurveTo(sx + 60, H * 0.5, sx + 190, H * 0.62, sx + 340 + rand() * 200, H * 0.70);
        ctx.stroke();
      }
    });

    // Long rubber down the fast lane where every car accelerates away.
    ctx.strokeStyle = 'rgba(22,21,20,0.22)';
    for (let k = 0; k < 26; k++) {
      ctx.lineWidth = 6 + rand() * 10;
      const y = H * (0.60 + rand() * 0.32);
      ctx.beginPath();
      ctx.moveTo(rand() * W, y);
      ctx.lineTo(rand() * W, y + (rand() - 0.5) * 14);
      ctx.stroke();
    }
    // Grime creeping out from the wall edge.
    for (let i = 0; i < 200; i++) {
      ctx.fillStyle = `rgba(40,38,34,${0.03 + rand() * 0.08})`;
      ctx.fillRect(rand() * W, H * (0.90 + rand() * 0.1), 20 + rand() * 120, 4 + rand() * 10);
    }
  });
}

// ---------------------------------------------------------------------------
// Grandstands
// ---------------------------------------------------------------------------

const SEAT_PALETTES = [
  [0x2c4f86, 0x21396b, 0xb9bcbf, 0x8e2230],
  [0x9a3324, 0x7c2a1e, 0xd8d3c6, 0x33383f],
  [0x2f6a4f, 0x24523d, 0xc8c3b2, 0x1d4d78],
  [0x51565e, 0x9aa0a6, 0xc9a227, 0x33383f],
];

// Seat-block patterns. Real stands lay seats out in coloured blocks — bands,
// chequers or a diagonal sweep — never one flat colour and never noise.
const SEAT_PATTERNS = [
  (row, col, n) => ((row / 4) | 0) % n,
  (row, col, n) => (((col / 9) | 0) + ((row / 5) | 0)) % n,
  (row, col, n) => (((col + row * 2) / 11) | 0) % n,
  (row, col, n) => (row < 3 || col % 23 < 3) ? (n - 1) : ((col / 14) | 0) % (n - 1),
];

/**
 * Does a footprint `depth` metres behind the barrier at frame `idx` clear the
 * rest of the circuit? The wish-list indices below are only wishes; a stand
 * that lands across another leg of the track is the single worst artefact this
 * module can produce.
 */
function standClear(frames, idx, offset, halfLen, depth) {
  const f = frames[idx];
  const cx = f.pos.x - f.left.x * (offset + depth * 0.5);
  const cz = f.pos.z - f.left.z * (offset + depth * 0.5);
  const rad = Math.hypot(halfLen, depth * 0.5) + 7;
  const n = frames.length;
  for (let k = 0; k < n; k += 2) {
    const circ = Math.min(Math.abs(k - idx), n - Math.abs(k - idx));
    if (circ < 26) continue;
    const p = frames[k].pos;
    const dx = p.x - cx, dz = p.z - cz;
    if (dx * dx + dz * dz < rad * rad) return false;
  }
  return true;
}

export function addGrandstands(scene, frames, D) {
  const flatR = D?.terrain?.flatR ?? ((D?.armco ?? 13) + 46);
  const armco = D?.armco ?? 13;

  const concrete = [], steel = [], clad = [], crowd = [], fascia = [];
  const seatMat4 = [], seatCol = [];

  // Hand-authored wish list: four stands of deliberately different size,
  // height and construction. The main stand faces the pits across the start
  // straight; the rest are spread around the lap at uneven fractions.
  const WANTS = [
    { at: 0.983, kind: 'stadium', L: 46, tiers: 16, roof: true, fascia: 0, fill: 0, extStair: true },
    { at: 0.408, kind: 'stadium', L: 30, tiers: 12, roof: true, fascia: 1, fill: 1 },
    { at: 0.672, kind: 'terrace', L: 35, tiers: 10, roof: false, fascia: 2, fill: 2 },
    { at: 0.215, kind: 'scaffold', L: 21, tiers: 8, roof: false, fill: 3 },
  ];

  const n = frames.length;
  const placed = [];
  for (const want of WANTS) {
    const rise = want.kind === 'scaffold' ? 0.44 : rnd(0.44, 0.50);
    const depth = want.kind === 'scaffold' ? 0.86 : rnd(0.80, 0.90);
    let tiers = want.tiers;
    const offset = armco + rnd(4.2, 6.4);
    // Keep the whole footprint inside the guaranteed-flat corridor: past
    // `flatR` the ground rolls and the stand would hang in the air.
    const backRoom = flatR - 4 - offset;
    while (tiers > 5 && tiers * depth + (want.roof ? 5.4 : 2.0) > backRoom) tiers--;
    const deckDepth = tiers * depth;
    const total = deckDepth + (want.roof ? 5.4 : 2.0);
    if (total > backRoom) continue;

    let idx = -1;
    const wish = Math.round(want.at * n) % n;
    for (const off of [0, 8, -8, 16, -16, 26, -26, 38, -38, 52, -52, 68, -68]) {
      const t = (wish + off + n) % n;
      if (standClear(frames, t, offset, want.L / 2, total)) { idx = t; break; }
    }
    if (idx < 0) continue;
    placed.push({ ...want, idx, offset, rise, depth, tiers, deckDepth });
  }

  const palettes = SEAT_PALETTES.slice();
  placed.forEach((S, si) => {
    PAINT_SEED = 13.7 * (si + 1) + S.idx * 0.031;
    const local = { concrete: [], steel: [], clad: [], crowd: [], fascia: [] };
    const pal = palettes[(si + ((rand() * palettes.length) | 0)) % palettes.length];
    const pat = SEAT_PATTERNS[si % SEAT_PATTERNS.length];

    const seats = [];         // {x, y, z, colour, wide}
    if (S.kind === 'scaffold') buildScaffoldStand(local, seats, S, pal, pat);
    else buildStadiumStand(local, seats, S, pal, pat);

    // Local -> world. Local +z points at the track (the stand stands on the
    // -left side, so its front faces along +left); local +x runs with the
    // tangent.
    const f = frames[S.idx];
    const yaw = Math.atan2(f.left.x, f.left.z);
    _q.setFromEuler(new THREE.Euler(0, yaw, 0));
    _a.copy(f.pos).addScaledVector(f.left, -S.offset);
    _m.compose(_a, _q, _one);
    for (const key of Object.keys(local)) {
      for (const g of local[key]) { g.applyMatrix4(_m); }
      const bucket = key === 'concrete' ? concrete : key === 'steel' ? steel
        : key === 'clad' ? clad : key === 'crowd' ? crowd : fascia;
      for (const g of local[key]) bucket.push(g);
    }
    // Seats are instanced, so they carry their own world matrix rather than
    // riding the merged geometry: local placement, then the stand's transform.
    const sq = new THREE.Vector3();
    const iq = new THREE.Quaternion();
    for (const s of seats) {
      sq.set(s.wide || 1, s.tall || 1, 1);
      const sm = new THREE.Matrix4().compose(_b.set(s.x, s.y, s.z), iq, sq);
      sm.premultiply(_m);
      seatMat4.push(sm);
      seatCol.push(s.c);
    }
  });
  PAINT_SEED = 0;

  if (!concrete.length) return;

  const concreteMat = new THREE.MeshStandardMaterial({
    color: 0xffffff, vertexColors: true, roughness: 0.93, metalness: 0.03,
    envMapIntensity: 0.7,
  });
  const steelMat = new THREE.MeshStandardMaterial({
    color: 0xffffff, vertexColors: true, roughness: 0.44, metalness: 0.72,
    envMapIntensity: 0.9,
  });
  const cladTex = makeCladTexture();
  const cladMat = new THREE.MeshStandardMaterial({
    map: cladTex, color: 0xffffff, vertexColors: true,
    roughness: 0.62, metalness: 0.35, envMapIntensity: 0.85,
  });
  const crowdMat = new THREE.MeshStandardMaterial({
    map: makeCrowdAtlas(), color: 0xffffff, vertexColors: true,
    roughness: 0.95, metalness: 0,
  });
  const fasciaMat = new THREE.MeshStandardMaterial({
    map: makeFasciaAtlas(['RACER GRAND PRIX', 'TRIBUNE NORD', 'CURVA SUD', 'GRANDSTAND C']),
    color: 0xffffff, vertexColors: true, roughness: 0.55, metalness: 0.05,
  });

  const add = (m) => { if (m) scene.add(m); };
  add(mergedMesh(concrete, concreteMat, { cast: true, name: 'stand-concrete' }));
  add(mergedMesh(steel, steelMat, { cast: true, name: 'stand-steel' }));
  add(mergedMesh(clad, cladMat, { cast: true, name: 'stand-clad' }));
  add(mergedMesh(crowd, crowdMat, { cast: false, name: 'stand-crowd' }));
  add(mergedMesh(fascia, fasciaMat, { cast: false, name: 'stand-fascia' }));

  if (seatMat4.length) {
    // One seat back, 12 triangles. At 0.62 m pitch a full stand is ~1200 of
    // them, so this must be instanced — as individual meshes it would be more
    // draw calls than the entire rest of the circuit.
    const seatGeo = new THREE.BoxGeometry(0.46, 0.42, 0.10);
    seatGeo.translate(0, 0.21, 0);
    const seatMesh = new THREE.InstancedMesh(
      seatGeo,
      new THREE.MeshStandardMaterial({ roughness: 0.72, metalness: 0.02 }),
      seatMat4.length
    );
    for (let i = 0; i < seatMat4.length; i++) {
      seatMesh.setMatrixAt(i, seatMat4[i]);
      seatMesh.setColorAt(i, _col.set(seatCol[i]));
    }
    seatMesh.instanceMatrix.needsUpdate = true;
    if (seatMesh.instanceColor) seatMesh.instanceColor.needsUpdate = true;
    seatMesh.castShadow = false;
    seatMesh.receiveShadow = true;
    seatMesh.name = 'stand-seats';
    scene.add(seatMesh);
  }
}

const C_DECK = 0x8a8c86;
const C_DECK_D = 0x6f716c;
const C_UNDER = 0x5c5e5a;
const S_STEEL = 0x5b6169;
const S_GALV = 0x878d93;

/**
 * A permanent raked stand. Local origin sits on the ground at the FRONT of the
 * deck, track at +z, rows climbing away into -z.
 */
function buildStadiumStand(out, seats, S, pal, pat) {
  const { L, tiers, rise, depth, deckDepth } = S;
  const hw = L / 2;
  const baseH = rnd(1.7, 2.3);
  const deckTopY = baseH + (tiers - 1) * rise;

  // --- raked substructure: a solid stepped concrete raker ----------------
  for (let t = 0; t < tiers; t++) {
    const topY = baseH + t * rise;
    box(out.concrete, t === 0 ? C_DECK : C_DECK_D, L, topY, depth,
      0, topY / 2, -(t + 0.5) * depth, { jitter: 0.07 });
    // Nosing: a lighter lip on each tread edge. It is 4 cm of geometry but it
    // is what makes the rake read as steps rather than a smooth ramp when the
    // sun is behind the stand.
    box(out.concrete, 0xa2a49d, L, 0.07, 0.10, 0, topY + 0.035, -t * depth - 0.05,
      { jitter: 0.03 });
  }
  // Front fascia below the deck, clad rather than bare concrete.
  box(out.clad, 0x7f8388, L + 0.24, baseH - 0.12, 0.22, 0, (baseH - 0.12) / 2, 0.11,
    { tile: 4 });
  box(out.concrete, C_UNDER, L + 0.3, 0.26, 0.5, 0, 0.13, 0.2, { jitter: 0.04 });

  // --- aisles, stairs and a vomitory -------------------------------------
  const aisleN = L > 38 ? 4 : L > 26 ? 3 : 2;
  const aisles = [];
  for (let a = 0; a < aisleN; a++) {
    // Uneven block widths: real stands are split by structural bays, not by
    // dividing the length equally.
    const frac = (a + 1) / (aisleN + 1) + (hashFn(a * 3.1, L) - 0.5) * 0.09;
    aisles.push({ x: (frac - 0.5) * L, w: 1.35 });
  }
  const vomIdx = aisleN > 2 ? 1 + ((rand() * (aisleN - 1)) | 0) : 0;
  for (let a = 0; a < aisles.length; a++) {
    const ax = aisles[a].x;
    for (let t = 0; t < tiers; t++) {
      const topY = baseH + t * rise;
      // Two half-height steps per tier so the aisle climbs at a walkable pitch.
      box(out.concrete, 0x9a9c95, aisles[a].w, 0.06, depth * 0.5,
        ax, topY - rise * 0.5 + 0.03, -t * depth - depth * 0.25, { jitter: 0.03 });
      box(out.concrete, 0x9a9c95, aisles[a].w, 0.06, depth * 0.5,
        ax, topY + 0.03, -t * depth - depth * 0.75, { jitter: 0.03 });
    }
    // Aisle handrail up one side of the run.
    strut(out.steel, S_GALV, ax - aisles[a].w / 2, baseH + 0.95, -0.2,
      ax - aisles[a].w / 2, deckTopY + 0.95, -deckDepth + 0.4, 0.06);
    // Vomitory: a dark portal punched through the back wall at the head of one
    // aisle, with a lintel over it. This is the opening that makes a stand
    // look inhabited instead of sealed.
    if (a === vomIdx) {
      const w = 2.7;
      box(out.concrete, 0x232629, w, 2.5, 1.6, ax, deckTopY + 1.25, -deckDepth - 0.5,
        { jitter: 0.02 });
      box(out.concrete, C_DECK, w + 0.8, 0.45, 1.9, ax, deckTopY + 2.72, -deckDepth - 0.5);
      for (const sx of [-1, 1]) {
        box(out.concrete, C_DECK_D, 0.42, 2.6, 1.9, ax + sx * (w / 2 + 0.21),
          deckTopY + 1.3, -deckDepth - 0.5);
      }
    }
  }

  // --- seats + crowd -----------------------------------------------------
  layoutSeating(out, seats, S, pal, pat, aisles, baseH, hw);

  // --- front safety rail -------------------------------------------------
  // Sits ON the first tread (z < 0); out at z > 0 it would be cantilevered off
  // the front of the deck with nothing under it.
  const railY = baseH + 1.05, railZ = -0.17;
  box(out.steel, S_GALV, L, 0.07, 0.07, 0, railY, railZ);
  box(out.steel, S_GALV, L, 0.05, 0.05, 0, railY - 0.45, railZ);
  const posts = Math.max(4, Math.round(L / 2.4));
  for (let i = 0; i <= posts; i++) {
    box(out.steel, S_GALV, 0.07, 1.05, 0.07, -hw + (i / posts) * L, railY - 0.52, railZ);
  }

  // --- back and side cladding -------------------------------------------
  const backTopY = S.roof ? deckTopY + 4.9 : deckTopY + 1.9;
  box(out.clad, 0x82868b, L + 0.3, backTopY, 0.28, 0, backTopY / 2, -deckDepth - 0.42,
    { tile: 4, jitter: 0.06 });
  // Sides step down with the rake, so the stand keeps a raked profile from the
  // side instead of being boxed in by a rectangular slab.
  const groups = Math.max(2, Math.round(tiers / 3));
  for (const sx of [-1, 1]) {
    for (let gi = 0; gi < groups; gi++) {
      const t0 = Math.floor((gi / groups) * tiers);
      const t1 = Math.floor(((gi + 1) / groups) * tiers);
      const h = baseH + t1 * rise + (S.roof ? 1.0 : 1.3);
      box(out.clad, 0x7c8085, 0.26, h, (t1 - t0) * depth,
        sx * (hw + 0.13), h / 2, -(t0 + (t1 - t0) / 2) * depth, { tile: 4, jitter: 0.06 });
    }
  }

  // --- external stair tower on one flank (main stand only) ---------------
  if (S.extStair) {
    const sx = -(hw + 1.6);
    const runs = 3;
    for (let r = 0; r < runs; r++) {
      const y0 = (r / runs) * deckTopY;
      const y1 = ((r + 1) / runs) * deckTopY;
      const z0 = -deckDepth + 1.0 + (r % 2 ? 0 : -5.5);
      const z1 = z0 + (r % 2 ? -5.5 : 5.5);
      strut(out.concrete, C_DECK_D, sx, y0, z0, sx, y1, z1, 1.9);
      strut(out.steel, S_GALV, sx - 0.95, y0 + 1.05, z0, sx - 0.95, y1 + 1.05, z1, 0.07);
      box(out.concrete, C_DECK, 2.6, 0.24, 2.4, sx, y1, z1, { jitter: 0.04 });
    }
    box(out.steel, S_STEEL, 0.22, deckTopY, 0.22, sx - 1.0, deckTopY / 2, -deckDepth + 1.2);
  }

  // --- cantilever roof on a visible truss --------------------------------
  if (S.roof) buildRoof(out, S, hw, deckTopY, deckDepth);
}

/**
 * The roof is the silhouette. A solid slab on four masts reads as a floating
 * white plate, so this builds a real two-chord truss per frame — column, rafter
 * chords, web diagonals, back stay — and stops the roof DECK two metres short
 * of the rafter tips so the last bay is open sky between the members.
 */
function buildRoof(out, S, hw, deckTopY, deckDepth) {
  const colZ = -deckDepth - 1.15;
  const eaveZ = 2.6;
  const backY = deckTopY + 5.0;
  const frontY = backY - 1.45;
  const depthBack = 1.25, depthFront = 0.45;
  const trussN = Math.max(3, Math.round(S.L / 7.5) + 1);

  for (let i = 0; i <= trussN; i++) {
    const x = -hw + (i / trussN) * S.L;
    // Column and its rear rake strut.
    box(out.steel, S_STEEL, 0.34, backY, 0.34, x, backY / 2, colZ);
    strut(out.steel, S_STEEL, x, backY * 0.60, colZ, x, 0, colZ - 3.3, 0.20);
    strut(out.steel, S_STEEL, x, backY * 0.60, colZ, x, backY * 0.62, colZ + 1.0, 0.14);
    // Rafter chords.
    strut(out.steel, S_STEEL, x, backY, colZ, x, frontY, eaveZ, 0.20);
    strut(out.steel, S_STEEL, x, backY - depthBack, colZ + 0.3, x, frontY - depthFront, eaveZ, 0.16);
    // Web: alternating diagonals plus verticals. 8 panels is enough to read as
    // a truss at 40 m and costs 12 triangles a member.
    const panels = 8;
    for (let p = 0; p < panels; p++) {
      const t0 = p / panels, t1 = (p + 1) / panels;
      const zA = colZ + (eaveZ - colZ) * t0, zB = colZ + (eaveZ - colZ) * t1;
      const yTA = backY + (frontY - backY) * t0, yTB = backY + (frontY - backY) * t1;
      const dA = depthBack + (depthFront - depthBack) * t0;
      const dB = depthBack + (depthFront - depthBack) * t1;
      if (p % 2 === 0) strut(out.steel, S_GALV, x, yTA, zA, x, yTB - dB, zB, 0.10);
      else strut(out.steel, S_GALV, x, yTA - dA, zA, x, yTB, zB, 0.10);
      strut(out.steel, S_GALV, x, yTB, zB, x, yTB - dB, zB, 0.09);
    }
  }
  // Purlins along the top chord, and lateral bracing under the bottom chord.
  const purlins = 9;
  for (let p = 0; p <= purlins; p++) {
    const t = p / purlins;
    const z = colZ + (eaveZ - colZ) * t;
    const y = backY + (frontY - backY) * t;
    box(out.steel, S_GALV, S.L + 0.6, 0.12, 0.12, 0, y + 0.12, z);
  }
  for (let i = 0; i < trussN; i++) {
    const x0 = -hw + (i / trussN) * S.L, x1 = -hw + ((i + 1) / trussN) * S.L;
    strut(out.steel, S_GALV, x0, backY - depthBack, colZ + 0.3, x1, frontY - depthFront, eaveZ, 0.07);
  }

  // Roof deck: stops 2 m short of the tips (see the comment above).
  const dZ0 = colZ - 0.6, dZ1 = eaveZ - 2.0;
  const dy = (frontY + (backY - frontY) * ((eaveZ - dZ1) / (eaveZ - colZ))) - backY;
  const theta = -Math.atan2(dy, dZ1 - dZ0);
  const len = Math.hypot(dy, dZ1 - dZ0);
  box(out.clad, 0x969a9e, S.L + 1.4, 0.16, len, 0, backY + 0.24 + dy / 2, (dZ0 + dZ1) / 2,
    { rx: theta, tile: 4, jitter: 0.05 });
  // Ribs across the deck: cheap, and they break the specular sheet that made
  // the old roof blow out to white.
  const ribs = Math.round(len / 1.3);
  for (let r = 0; r <= ribs; r++) {
    const t = r / ribs;
    box(out.clad, 0x8d9195, S.L + 1.4, 0.09, 0.11,
      0, backY + 0.34 + dy * t, dZ0 + (dZ1 - dZ0) * t, { rx: theta, tile: 4 });
  }
  // Leading-edge fascia beam + the name band on its face.
  const fY = frontY - depthFront - 0.35;
  box(out.steel, 0x33383f, S.L + 1.4, 1.0, 0.30, 0, fY, eaveZ - 1.9);
  const [fv0, fv1] = atlasRow((S.fascia ?? 0) % 4);
  quadZ(out.fascia, S.L + 1.2, 0.82, 0, fY, eaveZ - 1.73, 0, 1, fv0, fv1, 0xffffff, 0.02);
}

/**
 * Seat rows plus the crowd behind them. The crowd is still a texture — a
 * hundred thousand modelled people is not on — but it stands as a strip BEHIND
 * each row of instanced seat backs, so the seat geometry is what you see at
 * the row edges and along the bottom of every strip. Density varies per stand
 * (four atlas rows) and per segment (whole blocks left empty).
 */
function layoutSeating(out, seats, S, pal, pat, aisles, baseH, hw) {
  const { tiers, rise, depth } = S;
  const pitch = 0.62;
  const band = (S.fill ?? 0) % 4;
  const [v0, v1] = atlasRow(band);
  const fill = [0.93, 0.78, 0.55, 0.30][band];
  const cols = Math.floor((S.L - 1.4) / pitch);
  const inAisle = (x) => aisles.some((a) => Math.abs(x - a.x) < a.w * 0.5 + 0.16);

  for (let t = 0; t < tiers; t++) {
    const y = baseH + t * rise;
    const z = -t * depth - depth * 0.62;
    let runStart = -1;
    const occupied = [];
    for (let c = 0; c < cols; c++) {
      const x = -hw + 0.7 + (c + 0.5) * pitch;
      if (inAisle(x)) { occupied.push(false); continue; }
      seats.push({ x, y: y + 0.02, z, c: pal[pat(t, c, pal.length) % pal.length] });
      occupied.push(true);
    }
    // Crowd strips over contiguous runs of seats, thinned to `fill`.
    const segLen = 6 + ((hashFn(t * 1.7, S.L) * 5) | 0);
    for (let c = 0; c <= cols; c++) {
      const ok = c < cols && occupied[c];
      if (ok && runStart < 0) runStart = c;
      const segBreak = ok && ((c - runStart) >= segLen);
      if ((!ok || segBreak) && runStart >= 0) {
        const c0 = runStart, c1 = c;
        runStart = segBreak ? c : -1;
        if (c1 - c0 < 2) continue;
        if (hashFn(t * 3.3 + c0 * 0.7, S.L + t) > fill) continue;
        const w = (c1 - c0) * pitch;
        const cx = -hw + 0.7 + (c0 + (c1 - c0) / 2) * pitch;
        const uRep = w / 8.68;                       // atlas repeats every 8.68 m
        const u0 = hashFn(c0 * 1.3, t * 2.1) * 3;
        quadZ(out.crowd, w, 1.07, cx, y + 0.60, z - 0.10,
          u0, u0 + uRep, v0, v1, 0xffffff, 0.05);
      }
    }
  }
}

/**
 * Temporary scaffold stand: no roof, no concrete. The whole point is that you
 * can see the tube frame under the deck, so the substructure is modelled and
 * the seating is benches rather than individual seats.
 */
function buildScaffoldStand(out, seats, S, pal, pat) {
  const { L, tiers, rise, depth } = S;
  const hw = L / 2;
  const baseH = 1.55;
  const deckDepth = tiers * depth;

  // Standards on a 2.4 m x 2 bay grid, ledgers every 2 m, braced on the faces.
  const bays = Math.max(3, Math.round(L / 2.4));
  const rows = Math.max(2, Math.round(tiers / 2));
  for (let i = 0; i <= bays; i++) {
    const x = -hw + (i / bays) * L;
    for (let r = 0; r <= rows; r++) {
      const z = -(r / rows) * deckDepth;
      const t = Math.min(tiers - 1, Math.round((r / rows) * tiers));
      const h = baseH + t * rise;
      box(out.steel, S_GALV, 0.09, h, 0.09, x, h / 2, z);
      for (let y = 1.0; y < h - 0.4; y += 1.9) {
        if (i < bays) box(out.steel, S_GALV, L / bays, 0.07, 0.07, x + L / bays / 2, y, z);
        if (r < rows) box(out.steel, S_GALV, 0.07, 0.07, deckDepth / rows, x, y, z - deckDepth / rows / 2);
      }
      // Face bracing on the outer bays only — enough to read, cheap to build.
      if (i < bays && (r === 0 || r === rows)) {
        strut(out.steel, S_GALV, x, 0.2, z, x + L / bays, Math.min(h, 3.0), z, 0.06);
      }
    }
  }
  // Ply decks and riser boards.
  for (let t = 0; t < tiers; t++) {
    const y = baseH + t * rise;
    box(out.clad, 0x8a8377, L, 0.10, depth, 0, y - 0.05, -(t + 0.5) * depth, { tile: 2 });
    box(out.clad, 0x6f6a61, L, rise, 0.06, 0, y - rise / 2, -t * depth - 0.03, { tile: 2 });
  }
  // Benches instead of seats: same instanced geometry, stretched.
  const benchW = 1.9;
  const per = Math.max(3, Math.floor((L - 1.0) / benchW));
  for (let t = 0; t < tiers; t++) {
    const y = baseH + t * rise;
    const z = -t * depth - depth * 0.6;
    for (let c = 0; c < per; c++) {
      const x = -L / 2 + 0.5 + (c + 0.5) * ((L - 1.0) / per);
      seats.push({
        x, y: y + 0.02, z, wide: benchW / 0.46, tall: 0.62,
        c: pal[pat(t, c * 3, pal.length) % pal.length],
      });
    }
  }
  // Crowd on the benches.
  const localAisles = [{ x: 0, w: 1.2 }];
  layoutSeating(out, [], S, pal, pat, localAisles, baseH, hw);
  // Rear and side handrails + a mesh back panel.
  const topY = baseH + (tiers - 1) * rise;
  box(out.steel, S_GALV, L, 0.07, 0.07, 0, topY + 1.1, -deckDepth + 0.1);
  box(out.clad, 0x6d7176, L, 1.15, 0.05, 0, topY + 0.6, -deckDepth + 0.05, { tile: 2 });
  for (const sx of [-1, 1]) {
    box(out.steel, S_GALV, 0.07, 0.07, deckDepth, sx * hw, topY + 1.1, -deckDepth / 2);
    box(out.clad, 0x6d7176, 0.05, 1.15, deckDepth, sx * hw, topY + 0.6, -deckDepth / 2, { tile: 2 });
  }
  box(out.steel, S_GALV, L, 0.06, 0.06, 0, baseH + 1.0, 0.1);
}

// ---------------------------------------------------------------------------
// Pit complex
// ---------------------------------------------------------------------------

/**
 * Local frame: +z runs along the start straight, and the pit side is -x
 * (local +x maps to -left). Distances below are quoted as positive OUTWARD
 * offsets `o` from the centreline and converted by X().
 */
export function addPitComplex(scene, startFrame, D) {
  const armco = D?.armco ?? 13;
  const flatR = D?.terrain?.flatR ?? (armco + 46);
  // The model was authored for the GP circuit (barrier at 13 m). On a wider
  // circuit the whole complex has to slide outward or the pit wall lands
  // INSIDE the live run-off — this bit us on Sunset Speedway.
  const shift = Math.max(0, armco + 1.6 - 14.6);
  const X = (o) => -(o + shift);

  const O_WALL = 14.6;
  const O_LANE_IN = 15.0;
  const O_FACE = 26.4;             // face of the garage pilasters
  const O_RECESS = 27.5;           // recessed bay wall carrying the doors
  let O_BACK = 37.2;               // back of the building
  // Never build past the guaranteed-flat corridor.
  const maxO = flatR - 3 - shift;
  if (O_BACK > maxO) O_BACK = Math.max(O_RECESS + 3.0, maxO);

  const Z0 = -45, Z1 = 100;
  const LEN = Z1 - Z0, ZC = (Z0 + Z1) / 2;
  const BAYS = 12;
  const pitch = LEN / BAYS;

  const concrete = [], steel = [], glass = [], kit = [], banner = [];
  const doorM = [];
  PAINT_SEED = 4.9;

  // --- pit lane ground --------------------------------------------------
  const zA = Z0 - 6, zB = Z1 + 6;
  const bays = [];
  for (let i = 0; i < BAYS; i++) {
    const z = Z0 + (i + 0.5) * pitch;
    bays.push({ z, u: (z - zA) / (zB - zA), hw: (pitch * 0.5) / (zB - zA) });
  }
  {
    const g = new THREE.BufferGeometry();
    const xL = X(26.6), xH = X(14.8), y = 0.03;
    const pos = new Float32Array([
      xL, y, zA, xL, y, zB, xH, y, zB, xH, y, zA,
    ]);
    // v = 1 on the garage side. The canvas is drawn with the working lane at
    // the TOP and textures upload flipped, so v=1 is the canvas top row —
    // v=0 there would swap the concrete apron and the asphalt fast lane.
    const uv = new Float32Array([0, 1, 1, 1, 1, 0, 0, 0]);
    const nrm = new Float32Array([0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0]);
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    g.setAttribute('normal', new THREE.BufferAttribute(nrm, 3));
    // Wound CCW seen from +y — a flipped quad here is an invisible pit lane.
    g.setIndex([0, 1, 2, 0, 2, 3]);
    const laneMesh = new THREE.Mesh(g, new THREE.MeshStandardMaterial({
      map: makePitLaneTexture(bays), roughness: 0.88, metalness: 0.04,
      envMapIntensity: 0.6,
    }));
    laneMesh.receiveShadow = true;
    laneMesh.name = 'pit-lane';
    laneMesh.position.copy(startFrame.pos);
    laneMesh.rotation.y = Math.atan2(startFrame.tan.x, startFrame.tan.z);
    scene.add(laneMesh);
  }

  // --- pit wall, pods, timing stand -------------------------------------
  box(concrete, 0x8e908a, 0.42, 1.02, LEN + 8, X(O_WALL), 0.51, ZC, { jitter: 0.06 });
  box(concrete, 0xb4b6b0, 0.62, 0.10, LEN + 8, X(O_WALL), 1.07, ZC, { jitter: 0.04 });
  // Kerb-side base — the wall foot is always filthy.
  box(concrete, 0x64665f, 0.56, 0.16, LEN + 8, X(O_WALL), 0.08, ZC, { jitter: 0.08 });

  const podZ = [];
  for (let i = 0; i < 6; i++) podZ.push(Z0 + 14 + i * (LEN - 26) / 5 + rnd(-2.5, 2.5));
  const teamCol = [0xb03a2a, 0x2b5fa8, 0x2f7a4e, 0xd8d2c4, 0x8f5fa8, 0xd6a12c];
  podZ.forEach((z, i) => {
    const tc = teamCol[i % teamCol.length];
    // Raised platform on the lane side of the wall.
    box(concrete, 0x83857f, 2.0, 0.14, 5.4, X(O_WALL + 1.05), 1.04, z, { jitter: 0.05 });
    for (const dz of [-2.2, 0, 2.2]) {
      box(steel, S_STEEL, 0.10, 1.0, 0.10, X(O_WALL + 1.9), 0.5, z + dz);
    }
    // Timing-stand bench: seat + back, facing the track.
    box(kit, 0x2b2e33, 0.55, 0.10, 4.6, X(O_WALL + 1.35), 1.55, z);
    box(kit, tc, 0.10, 0.62, 4.6, X(O_WALL + 1.62), 1.86, z);
    for (const dz of [-1.9, 0, 1.9]) {
      box(steel, S_STEEL, 0.5, 0.42, 0.08, X(O_WALL + 1.35), 1.29, z + dz);
    }
    // Monitor bank on a frame, screens facing the crew.
    box(steel, S_STEEL, 0.08, 1.25, 0.08, X(O_WALL + 0.35), 1.7, z - 2.0);
    box(steel, S_STEEL, 0.08, 1.25, 0.08, X(O_WALL + 0.35), 1.7, z + 2.0);
    box(kit, 0x1b1e23, 0.16, 0.60, 4.2, X(O_WALL + 0.36), 2.15, z, { rz: 0.16 });
    for (let m = 0; m < 4; m++) {
      box(kit, 0x2d4152, 0.05, 0.44, 0.86, X(O_WALL + 0.28), 2.15, z - 1.6 + m * 1.05,
        { rz: 0.16, jitter: 0.02 });
    }
    // Umbrella over the pod.
    box(steel, S_GALV, 0.07, 1.5, 0.07, X(O_WALL + 1.3), 2.6, z + 1.2);
    cyl(kit, tc, 1.75, 0.06, 0.42, X(O_WALL + 1.3), 3.42, z + 1.2, 10);
  });

  // --- garage building ---------------------------------------------------
  const H_BLDG = 7.9;
  const bldgW = O_BACK - O_RECESS;
  box(concrete, 0x86887f, bldgW, H_BLDG, LEN + 1.2,
    X(O_RECESS + bldgW / 2), H_BLDG / 2, ZC, { jitter: 0.06 });
  // Recess floor threshold.
  box(concrete, 0x74766e, O_RECESS - O_FACE, 0.10, LEN,
    X((O_FACE + O_RECESS) / 2), 0.05, ZC, { jitter: 0.05 });

  const doorW = 7.6, doorH = 4.05;
  for (let i = 0; i < BAYS; i++) {
    const z = Z0 + (i + 0.5) * pitch;
    // Pilaster between bays, standing proud of the recessed wall by 1.1 m so
    // GTAO has something to bite on and each bay gets real depth.
    box(concrete, 0x8f918a, O_RECESS - O_FACE, 4.6, pitch - doorW - 0.8,
      X((O_FACE + O_RECESS) / 2), 2.3, z - pitch / 2, { jitter: 0.05 });
    // Lintel across the whole bay.
    box(concrete, 0x7b7d76, O_RECESS - O_FACE + 0.25, 0.75, pitch,
      X((O_FACE + O_RECESS) / 2 - 0.1), 4.72, z, { jitter: 0.04 });
    // Door frame.
    box(steel, 0x2b2e33, 0.18, 0.28, doorW + 0.5, X(O_RECESS - 0.22), 4.20, z);
    for (const dz of [-1, 1]) {
      box(steel, 0x2b2e33, 0.18, 4.2, 0.24, X(O_RECESS - 0.22), 2.1, z + dz * (doorW / 2 + 0.13));
    }
    // Three bays in twelve stand open — the row of twelve identical closed
    // shutters was a big part of why the building read as an extrusion.
    const open = (i === 2 || i === 6 || i === 9);
    const k = open ? [0.42, 0.28, 0.60][[2, 6, 9].indexOf(i)] : 1;
    doorM.push({ z, k });
    if (open) {
      // Dark interior behind the raised shutter + a ceiling light strip. The
      // panel sits just INSIDE the building face so the opening is a void, not
      // a lit box: anything modelled deeper would be buried in solid geometry.
      box(concrete, 0x1d2024, 0.16, doorH, doorW, X(O_RECESS + 0.10), doorH / 2, z,
        { jitter: 0.02 });
      box(kit, 0xd8d6c8, 0.10, 0.10, doorW - 1.4, X(O_RECESS + 0.02), doorH - 0.35, z);
    }
    // Bay number plate on the pilaster face, kept clear of the awning chords.
    box(steel, 0x1f2227, 0.10, 0.62, 0.62, X(O_FACE - 0.06), 4.95, z);
  }

  // --- awning over the pit lane -----------------------------------------
  const awnO = 20.2;                          // outer edge of the cantilever
  const awnYBack = 6.4, awnYFront = 5.8;
  const awnFrames = BAYS + 1;
  for (let i = 0; i <= awnFrames; i++) {
    const z = Z0 + (i / awnFrames) * LEN;
    strut(steel, S_STEEL, X(O_FACE), awnYBack, z, X(awnO), awnYFront, z, 0.16);
    strut(steel, S_STEEL, X(O_FACE), awnYBack - 0.75, z, X(awnO + 0.5), awnYFront - 0.30, z, 0.12);
    for (let p = 0; p < 5; p++) {
      const t0 = p / 5, t1 = (p + 1) / 5;
      const o0 = O_FACE + (awnO - O_FACE) * t0, o1 = O_FACE + (awnO - O_FACE) * t1;
      const y0 = awnYBack + (awnYFront - awnYBack) * t0;
      const y1 = awnYBack + (awnYFront - awnYBack) * t1;
      const d0 = 0.75 - 0.45 * t0, d1 = 0.75 - 0.45 * t1;
      if (p % 2 === 0) strut(steel, S_GALV, X(o0), y0, z, X(o1), y1 - d1, z, 0.08);
      else strut(steel, S_GALV, X(o0), y0 - d0, z, X(o1), y1, z, 0.08);
    }
    // Tie rod up to a stanchion standing clear of the glazing behind it.
    strut(steel, S_GALV, X(awnO + 0.4), awnYFront, z, X(O_FACE - 0.5), awnYBack + 1.9, z, 0.06);
    box(steel, S_STEEL, 0.30, 2.0, 0.30, X(O_FACE - 0.5), awnYBack + 1.0, z);
  }
  // Awning deck + ribs. Ribs are 12 triangles each and stop the 145 m sheet
  // from blowing out as one specular plate.
  {
    const span = O_FACE - awnO;
    // X() negates, so walking +x (building -> outer edge) LOSES height: the
    // z-rotation that tilts the deck is therefore negative.
    const rzA = Math.atan2(awnYFront - awnYBack, span);
    box(steel, 0x9a9ea2, span + 0.6, 0.10, LEN + 1.0,
      X((O_FACE + awnO) / 2), (awnYBack + awnYFront) / 2 + 0.16, ZC,
      { rz: rzA, jitter: 0.04 });
    const ribs = Math.round(LEN / 1.25);
    for (let r = 0; r <= ribs; r++) {
      box(steel, 0x8b8f93, span + 0.6, 0.08, 0.10,
        X((O_FACE + awnO) / 2), (awnYBack + awnYFront) / 2 + 0.24, Z0 + (r / ribs) * LEN,
        { rz: rzA });
    }
    // Downlight strip under the leading edge.
    box(kit, 0xd8d4c6, 0.14, 0.10, LEN - 4, X(awnO + 0.35), awnYFront - 0.55, ZC);
  }

  // --- glazing above the awning -----------------------------------------
  box(glass, 0x2b3947, 0.22, 1.85, LEN - 5, X(O_FACE - 0.05), 7.05, ZC, { jitter: 0.02 });
  for (let z = Z0 + 2; z <= Z1 - 2; z += 3.0) {
    box(steel, 0x2a2d33, 0.30, 1.95, 0.16, X(O_FACE - 0.12), 7.05, z);
  }
  box(steel, 0x2a2d33, 0.34, 0.22, LEN - 4, X(O_FACE - 0.12), 6.05, ZC);
  box(steel, 0x2a2d33, 0.34, 0.22, LEN - 4, X(O_FACE - 0.12), 8.05, ZC);

  // --- roof: parapet, railing, rooftop suites ---------------------------
  box(concrete, 0x7c7e77, bldgW + 1.4, 0.34, LEN + 2.0,
    X(O_RECESS + bldgW / 2 - 0.6), H_BLDG + 0.17, ZC, { jitter: 0.05 });
  box(concrete, 0x8b8d86, 0.55, 1.15, LEN + 2.0, X(O_FACE + 0.1), H_BLDG + 0.75, ZC,
    { jitter: 0.05 });
  for (let z = Z0; z <= Z1; z += 3.4) {
    box(steel, S_GALV, 0.07, 1.0, 0.07, X(O_BACK - 0.4), H_BLDG + 0.84, z);
  }
  box(steel, S_GALV, 0.08, 0.08, LEN + 2, X(O_BACK - 0.4), H_BLDG + 1.32, ZC);

  for (const bz of [Z0 + 22, ZC + 4, Z1 - 22]) {
    const w = rnd(5.5, 7.0), l = rnd(8, 12);
    box(concrete, 0x83857e, w, 2.8, l, X(O_RECESS + 2.6 + w / 2), H_BLDG + 1.75, bz,
      { jitter: 0.05 });
    box(glass, 0x2b3947, 0.20, 1.35, l - 1.2, X(O_RECESS + 2.5), H_BLDG + 1.95, bz);
    box(concrete, 0x6f7169, w + 0.6, 0.22, l + 0.6, X(O_RECESS + 2.6 + w / 2), H_BLDG + 3.25, bz);
  }
  // Plant / ducts, so the roofline is not a straight edge against the sky.
  for (let i = 0; i < 7; i++) {
    const z = Z0 + 6 + rand() * (LEN - 12);
    cyl(steel, S_GALV, 0.35, 0.35, rnd(0.8, 1.8), X(O_RECESS + rnd(4, bldgW - 1)),
      H_BLDG + 0.9, z, 8);
  }

  // --- parapet branding --------------------------------------------------
  {
    const tex = makeFasciaAtlas(['RACER GRAND PRIX', 'PIT LANE', 'PADDOCK CLUB', 'RACER GRAND PRIX']);
    const g = new THREE.PlaneGeometry(LEN - 8, 1.05);
    const uv = g.attributes.uv;
    const [bv0, bv1] = atlasRow(0);
    for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i), bv0 + uv.getY(i) * (bv1 - bv0));
    // Faces the track: the pit side is local -x, so the parapet looks toward +x.
    g.rotateY(Math.PI / 2);
    g.translate(X(O_FACE - 0.22), H_BLDG + 0.6, ZC);
    paint(g, 0xffffff, 0.02);
    banner.push(g);
    const bm = mergedMesh(banner, new THREE.MeshStandardMaterial({
      map: tex, color: 0xffffff, vertexColors: true, roughness: 0.55, metalness: 0.05,
    }), { cast: false, name: 'pit-banner' });
    if (bm) attach(scene, bm, startFrame);
  }

  // --- equipment: tyres, fuel, trolleys, cones ---------------------------
  for (let i = 0; i < BAYS; i++) {
    const z = Z0 + (i + 0.5) * pitch;
    // Tyre stacks against the pilaster, in uneven columns.
    const stacks = 2 + ((rand() * 2) | 0);
    for (let s = 0; s < stacks; s++) {
      const sz = z - pitch / 2 + rnd(0.8, 2.6) * (s % 2 ? 1 : -1);
      const so = O_FACE - rnd(0.7, 1.6);
      const high = 3 + ((rand() * 3) | 0);
      for (let k = 0; k < high; k++) {
        cyl(kit, 0x24262a, 0.36, 0.36, 0.25, X(so), 0.13 + k * 0.26, sz, 10,
          { jitter: 0.10 });
        if (rand() < 0.5) {
          cyl(kit, 0xb8bcc0, 0.19, 0.19, 0.10, X(so), 0.13 + k * 0.26, sz, 8, { jitter: 0.05 });
        }
      }
    }
    // A wheel trolley and a tool chest in the working lane.
    if (rand() < 0.75) {
      const tz = z + rnd(-3, 3), to = O_FACE - rnd(2.2, 4.0);
      box(kit, pick([0xb03a2a, 0x2b5fa8, 0x2f7a4e, 0xd6a12c]), 1.5, 0.95, 0.75,
        X(to), 0.55, tz, { ry: rnd(-0.3, 0.3), jitter: 0.05 });
      box(kit, 0x35383d, 1.6, 0.10, 0.85, X(to), 1.05, tz, { ry: rnd(-0.3, 0.3) });
    }
    if (rand() < 0.5) {
      cyl(kit, pick([0x9a3324, 0x2f6a4f, 0xc9c4b6]), 0.29, 0.29, 0.9,
        X(O_FACE - rnd(1.0, 2.0)), 0.45, z + rnd(-4, 4), 10);
    }
  }
  // Fuel / tyre compound at the far end of the working lane. It stays inside
  // o = 23.5..26.4: any wider and the pad would stand in the live fast lane.
  {
    const cz = Z1 - 10;
    box(concrete, 0x76786f, 2.9, 0.10, 12, X(O_FACE - 1.5), 0.06, cz, { jitter: 0.05 });
    for (let i = 0; i < 14; i++) {
      cyl(kit, i % 3 === 0 ? 0x9a3324 : 0x3f6f8f, 0.30, 0.30, 0.9,
        X(O_FACE - 0.9 - (i % 3) * 0.68), 0.5, cz - 5 + ((i / 3) | 0) * 1.9 + rand() * 0.3, 10);
    }
    for (let i = 0; i <= 6; i++) {
      box(steel, S_GALV, 0.07, 1.3, 0.07, X(O_FACE - 2.9), 0.65, cz - 6 + i * 2);
    }
    box(steel, S_GALV, 0.07, 0.07, 12, X(O_FACE - 2.9), 1.28, cz);
  }
  // Cones standing on the painted fast-lane boundary at both ends.
  for (let i = 0; i < 14; i++) {
    const z = i < 7 ? Z0 - 4 + i * 1.9 : Z1 + 4 - (i - 7) * 1.9;
    cyl(kit, 0xd4562a, 0.035, 0.17, 0.56, X(O_WALL + rnd(5.9, 6.4)), 0.28, z, 7);
  }

  PAINT_SEED = 0;

  const concreteMat = new THREE.MeshStandardMaterial({
    color: 0xffffff, vertexColors: true, roughness: 0.93, metalness: 0.03,
    envMapIntensity: 0.7,
  });
  const steelMat = new THREE.MeshStandardMaterial({
    color: 0xffffff, vertexColors: true, roughness: 0.45, metalness: 0.7,
    envMapIntensity: 0.9,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, vertexColors: true, roughness: 0.14, metalness: 0.82,
    envMapIntensity: 1.2,
  });
  const kitMat = new THREE.MeshStandardMaterial({
    color: 0xffffff, vertexColors: true, roughness: 0.74, metalness: 0.08,
  });

  attach(scene, mergedMesh(concrete, concreteMat, { cast: true, name: 'pit-concrete' }), startFrame);
  attach(scene, mergedMesh(steel, steelMat, { cast: true, name: 'pit-steel' }), startFrame);
  attach(scene, mergedMesh(glass, glassMat, { cast: false, name: 'pit-glass' }), startFrame);
  attach(scene, mergedMesh(kit, kitMat, { cast: true, name: 'pit-kit' }), startFrame);

  // Roller doors: instanced, with three bays' shutters part-raised.
  {
    const geo = new THREE.PlaneGeometry(doorW, doorH);
    // The pit side is local -x, so the doors look back toward +x at the lane.
    // Backface-cull the wrong way here and the whole garage row goes invisible.
    geo.rotateY(Math.PI / 2);
    const mesh = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({
      map: makeRollerDoor(), roughness: 0.72, metalness: 0.22,
    }), doorM.length);
    const m = new THREE.Matrix4();
    for (let i = 0; i < doorM.length; i++) {
      const { z, k } = doorM[i];
      m.compose(
        new THREE.Vector3(X(O_RECESS - 0.06), doorH - (doorH * k) / 2, z),
        new THREE.Quaternion(),
        new THREE.Vector3(1, k, 1)
      );
      mesh.setMatrixAt(i, m);
    }
    mesh.instanceMatrix.needsUpdate = true;
    mesh.castShadow = false;
    mesh.receiveShadow = true;
    mesh.name = 'pit-doors';
    attach(scene, mesh, startFrame);
  }
}

/** Place a locally-built pit mesh onto whatever start straight this track has. */
function attach(scene, mesh, startFrame) {
  if (!mesh) return;
  mesh.position.copy(startFrame.pos);
  mesh.rotation.y = Math.atan2(startFrame.tan.x, startFrame.tan.z);
  scene.add(mesh);
}
