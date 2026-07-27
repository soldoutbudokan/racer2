import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Procedural texture generators for the car materials.
// Mirrors the CanvasTexture house-style used in track.js (no external image
// files). All maps are built once and cached at module scope so the five cars
// share them.
//
// UV CONTRACTS for the wheel maps. wheels.js builds every wheel surface itself
// (see revolveX / bladeGeo), so these are contracts the geometry honours, not
// guesses about whatever UVs a primitive happened to have:
//   tyre tread    u = around the circumference, v = across the tread band.
//                 v 0..0.90 is the grooved road pattern; v 0.94..1.0 is a plain
//                 SLICK band, so the open-wheel car's slick can share the one
//                 tyre material instead of paying for a second one.
//   tyre sidewall u = around, v = 0 at the tread shoulder .. 1 at the bead.
//   brake disc    u = around, v = radius (0 at the hat .. 1 at the outer edge),
//                 so both disc faces sample the same heat/drilling pattern.
//   alloy         v = radius (0 at the hub .. 1 at the rim flange); u is only
//                 used for streak noise, so any part can set u freely.
// Every map is authored so that uv (0,0) is a neutral, sane texel — a stray
// mesh with no UVs (merge.js zero-fills those) gets plain material, not a
// drill hole or a groove floor.
// ---------------------------------------------------------------------------

function hashFn(x, y) {
  const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return s - Math.floor(s);
}
function smoothstep(t) {
  t = Math.max(0, Math.min(1, t));
  return t * t * (3 - 2 * t);
}
function valueNoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const a = hashFn(xi, yi);
  const b = hashFn(xi + 1, yi);
  const c = hashFn(xi, yi + 1);
  const d = hashFn(xi + 1, yi + 1);
  const u = smoothstep(xf);
  const v = smoothstep(yf);
  return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
}
export function fractalNoise(x, y, oct = 4) {
  let amp = 0.5, freq = 1, sum = 0, max = 0;
  for (let i = 0; i < oct; i++) {
    sum += amp * valueNoise(x * freq, y * freq);
    max += amp;
    amp *= 0.5; freq *= 2;
  }
  return sum / max;
}

const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = (t) => (t < 0 ? 0 : t > 1 ? 1 : t);

function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return { c, ctx: c.getContext('2d') };
}

// Wrap a finished canvas as a texture. Band maps (tread, sidewall, disc) must
// CLAMP in v: they are authored edge-to-edge, and RepeatWrapping lets the
// mip/aniso filter pull the opposite edge in as a bright seam at the shoulder.
function texFrom(c, { srgb = false, clampV = false, repeat = null, aniso = 8 } = {}) {
  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.RepeatWrapping;
  t.wrapT = clampV ? THREE.ClampToEdgeWrapping : THREE.RepeatWrapping;
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) t.repeat.set(repeat[0], repeat[1]);
  t.anisotropy = aniso;
  t.needsUpdate = true;
  return t;
}

// Height field -> tangent-space normal map. `sx`/`sy` scale the two gradients
// independently: the wheel band maps are strongly anisotropic (a sidewall tile
// is ~1.9 mm per texel around and ~0.9 mm per texel radially), and using one
// strength for both smears the lettering into a diagonal ridge.
function gradientToNormal(heights, w, h, { sx = 1, sy = 1, wrapV = true } = {}) {
  const { c, ctx } = makeCanvas(w, h);
  const img = ctx.createImageData(w, h);
  const at = (x, y) => {
    const xx = (x + w) % w;
    const yy = wrapV ? (y + h) % h : Math.max(0, Math.min(h - 1, y));
    return heights[yy * w + xx];
  };
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let nx = (at(x - 1, y) - at(x + 1, y)) * sx;
      let ny = (at(x, y - 1) - at(x, y + 1)) * sy;
      let nz = 1.0;
      const len = Math.hypot(nx, ny, nz) || 1;
      nx /= len; ny /= len; nz /= len;
      const i = (y * w + x) * 4;
      img.data[i] = (nx * 0.5 + 0.5) * 255;
      img.data[i + 1] = (ny * 0.5 + 0.5) * 255;
      img.data[i + 2] = (nz * 0.5 + 0.5) * 255;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

// Build a normal map from a height function h(u,v) in [0,1]^2 (tileable).
function normalFromHeight(size, hFn, strength, h = size, opts = {}) {
  const w = size;
  const heights = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) heights[y * w + x] = hFn(x / w, y / h);
  }
  return texFrom(gradientToNormal(heights, w, h, {
    sx: strength, sy: strength, ...opts,
  }), opts.texOpts);
}

// Same, but the height field is the red channel of an already-drawn canvas —
// the only practical way to emboss real TEXT (sidewall lettering) without
// shipping an image file.
function normalFromCanvas(src, { sx = 1, sy = 1, wrapV = true, texOpts } = {}) {
  const w = src.width, h = src.height;
  const data = src.getContext('2d').getImageData(0, 0, w, h).data;
  const heights = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) heights[i] = data[i * 4] / 255;
  return texFrom(gradientToNormal(heights, w, h, { sx, sy, wrapV }), texOpts);
}

// Straight pixel writer for colour / roughness maps: fn(u,v) -> [r,g,b] 0..255.
function pixelTexture(w, h, fn, opts = {}) {
  const { c, ctx } = makeCanvas(w, h);
  const img = ctx.createImageData(w, h);
  const out = [0, 0, 0];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      fn((x + 0.5) / w, (y + 0.5) / h, out);
      const i = (y * w + x) * 4;
      img.data[i] = out[0]; img.data[i + 1] = out[1]; img.data[i + 2] = out[2];
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return texFrom(c, opts);
}

let _flake = null;
// Dense, very high-frequency facet normals → metallic-flake sparkle that
// twinkles as the sun/IBL sweeps across the paint. The single biggest "real
// car paint" cue versus flat plastic.
export function flakeNormal() {
  if (_flake) return _flake;
  const size = 256;
  const { c, ctx } = makeCanvas(size, size);
  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // Each texel gets a tiny random tilt; faint and per-pixel = flake.
      const a = hashFn(x * 1.0, y * 1.0) * Math.PI * 2;
      const r = hashFn(x * 1.7 + 4.2, y * 2.3 + 1.1) * 0.5;
      const nx = Math.cos(a) * r * 0.35;
      const ny = Math.sin(a) * r * 0.35;
      const nz = Math.sqrt(Math.max(0.0001, 1 - nx * nx - ny * ny));
      const i = (y * size + x) * 4;
      img.data[i] = (nx * 0.5 + 0.5) * 255;
      img.data[i + 1] = (ny * 0.5 + 0.5) * 255;
      img.data[i + 2] = (nz * 0.5 + 0.5) * 255;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  _flake = texFrom(c);
  return _flake;
}

let _orangePeel = null;
// Soft low-frequency undulation for the clear coat — the slightly imperfect
// wet-lacquer look that smears reflections just a touch.
export function orangePeelNormal() {
  if (_orangePeel) return _orangePeel;
  _orangePeel = normalFromHeight(128, (u, v) =>
    fractalNoise(u * 14, v * 14, 3), 0.6);
  return _orangePeel;
}

let _carbon = null;
// 2x2 twill carbon weave. Real 2x2 twill floats each tow over two and under
// two with a one-tow shift per row, which is what makes the diagonal rib; the
// old version alternated single cells and read as a plain basket weave. Fine
// filament lines inside each tow give the tow its own sheen direction.
export function carbonNormal() {
  if (_carbon) return _carbon;
  _carbon = normalFromHeight(256, (u, v) => {
    const n = 10;                       // tows across the tile
    const fx = u * n, fy = v * n;
    const ix = Math.floor(fx), iy = Math.floor(fy);
    const cx = fx - ix, cy = fy - iy;
    // 2x2 twill: warp is on top where ((ix - iy) mod 4) < 2.
    const warpOver = (((ix - iy) % 4) + 4) % 4 < 2;
    const along = warpOver ? cy : cx;   // along the floating tow
    const across = warpOver ? cx : cy;  // across it — this is the rib
    const bundle = Math.sin(across * Math.PI);            // tow cross-section
    const filament = 0.06 * Math.sin(along * Math.PI * 6); // filaments in the tow
    return 0.30 + bundle * 0.62 + filament;
  }, 1.5);
  _carbon.repeat.set(1, 1);
  return _carbon;
}

// Subtle dark micro-variation map (used as a roughness map so reflections are
// not perfectly uniform across a panel).
let _paintRough = null;
export function paintRoughness() {
  if (_paintRough) return _paintRough;
  return (_paintRough = pixelTexture(256, 256, (u, v, out) => {
    const n = fractalNoise(u * 18, v * 18, 3);
    const g = (0.20 + n * 0.16) * 255;            // roughness 0.20..0.36
    out[0] = out[1] = out[2] = g;
  }));
}

// Honeycomb mesh grille normal (for intakes / radiator opening).
let _grille = null;
export function grilleNormal() {
  if (_grille) return _grille;
  _grille = normalFromHeight(128, (u, v) => {
    const n = 9;
    const row = Math.floor(v * n);
    const off = (row % 2) * 0.5;
    const cx = (u * n + off) % 1 - 0.5;
    const cy = (v * n) % 1 - 0.5;
    const d = Math.hypot(cx, cy);
    return d < 0.34 ? 0.0 : 1.0;   // recessed cells with raised walls
  }, 1.8);
  return _grille;
}

// ---------------------------------------------------------------------------
// TYRE TREAD. The circumferential grooves are real geometry now (wheels.js
// lathes them into the tread band), so the map carries what geometry cannot
// afford: the LATERAL groove pitch, the sipes inside each block, and the
// rubber/dust colouring. Chevron-shaped, because a straight lateral groove
// across the whole width reads as a stack of hoops at speed.
// ---------------------------------------------------------------------------

const TREAD_SLICK_V = 0.94;   // v above this is the plain slick band

// s = 0 at the tread centre line, 1 at the shoulder.
function treadShoulder(v) { return clamp01(Math.abs(v - 0.45) / 0.45); }

function treadHeight(u, v) {
  if (v > TREAD_SLICK_V) {
    // Slick band: no pattern, just faint scuffing so it is not glassy.
    return 0.62 + fractalNoise(u * 40, v * 40, 2) * 0.08;
  }
  const s = treadShoulder(v);
  const blocks = 3;                       // lateral grooves per texture tile
  const phase = u + (v - 0.45) * 0.30;    // chevron sweep
  let g = (phase * blocks) % 1; if (g < 0) g += 1;
  // Groove: 15% of the pitch, with a slightly softened wall so the normal map
  // does not fight the real geometry grooves crossing it.
  const lat = smoothstep((Math.min(g, 1 - g) - 0.055) / 0.055);
  // Sipes: fine slits inside each block, more of them toward the shoulder.
  const sp = (phase * blocks * 5) % 1;
  const sipe = 1 - 0.42 * (1 - smoothstep((Math.min(sp, 1 - sp) - 0.02) / 0.05));
  const wear = fractalNoise(u * 60, v * 24, 3) * 0.10;
  return (0.18 + lat * 0.82 * sipe) * (1 - 0.12 * s) + wear;
}

let _treadMaps = null;
export function treadMaps() {
  if (_treadMaps) return _treadMaps;
  const W = 256, H = 256;
  const normalMap = normalFromHeight(W, treadHeight, 1.35, H, {
    wrapV: false, texOpts: { clampV: true },
  });
  // Rubber is NOT black: photographed tread sits around 4% albedo, and the
  // near-black 0x080809 this replaces crushed to a silhouette the moment the
  // sun was off it. Dust and picked-up track rubber lighten the shoulders.
  const map = pixelTexture(W, H, (u, v, out) => {
    const h = treadHeight(u, v);
    const s = treadShoulder(v);
    const grime = clamp01(fractalNoise(u * 9 + 3, v * 5, 3) * 0.7 + s * 0.75 - 0.25);
    const base = 0.10 + h * 0.055;               // groove floors sit darker
    const r = lerp(base, 0.24, grime * 0.55);
    const g = lerp(base, 0.215, grime * 0.55);
    const b = lerp(base * 1.04, 0.18, grime * 0.55);
    out[0] = r * 255; out[1] = g * 255; out[2] = b * 255;
  }, { srgb: true, clampV: true });
  const roughnessMap = pixelTexture(128, 128, (u, v, out) => {
    const s = treadShoulder(v);
    const dust = fractalNoise(u * 9 + 3, v * 5, 3) * 0.6 + s * 0.5;
    const g = clamp01(0.74 + dust * 0.26) * 255;  // dusty rubber = rougher
    out[0] = out[1] = out[2] = g;
  }, { clampV: true });
  _treadMaps = { map, normalMap, roughnessMap };
  return _treadMaps;
}

// Back-compat: this used to be the tyre's only map.
export function treadNormal() { return treadMaps().normalMap; }

// ---------------------------------------------------------------------------
// TYRE SIDEWALL. Raised lettering, a knurled band over the rim-protector rib
// and fine circumferential moulding ribs — all embossed through a height
// canvas, which is the only way to get real letterforms with no image files.
// Text is drawn horizontally compressed: u spans ~1.95 m of circumference over
// the canvas width while v spans ~0.12 m of sidewall over its height, so an
// uncompressed glyph would come out four times too wide on the tyre.
// ---------------------------------------------------------------------------

const SW_W = 1024, SW_H = 128;

function drawSidewall(ctx, mode) {
  const H = SW_H, W = SW_W;
  const height = mode === 'height';
  ctx.fillStyle = height ? '#808080' : '#26292c';
  ctx.fillRect(0, 0, W, H);

  // Fine circumferential moulding ribs (constant radius = horizontal here).
  for (let y = 0; y < H; y++) {
    const v = y / H;
    const rib = Math.sin(v * 240) * 0.5 + 0.5;
    let a = 0;
    if (v > 0.10 && v < 0.30) a = 0.16;          // upper sidewall ribbing
    if (v > 0.72 && v < 0.95) a = 0.30;          // bead-area ribbing
    if (a === 0) continue;
    ctx.fillStyle = height
      ? `rgba(255,255,255,${a * rib * 0.5})`
      : `rgba(70,74,78,${a * rib * 0.35})`;
    ctx.fillRect(0, y, W, 1);
  }

  // Knurled band over the rim-protector rib.
  for (let i = 0; i < 220; i++) {
    const x = (i / 220) * W;
    ctx.fillStyle = height ? 'rgba(255,255,255,0.55)' : 'rgba(64,68,72,0.5)';
    ctx.fillRect(x, 0.62 * H, W / 480, 0.08 * H);
  }

  // Lettering. Three instances around the tyre, each centred in its third so
  // nothing straddles the u seam.
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 0; i < 3; i++) {
    const cx = W * (i + 0.5) / 3;
    ctx.save();
    ctx.translate(cx, 0);
    ctx.scale(0.30, 1);                          // undo the u/v aspect stretch
    ctx.fillStyle = height ? '#e8e8e8' : '#3b4045';
    ctx.font = 'bold 30px Arial';
    ctx.fillText('RACER', 0, 0.40 * H);
    ctx.font = 'bold 15px Arial';
    ctx.fillText('SPORT CONTACT', 0, 0.53 * H);
    ctx.fillStyle = height ? '#5a5a5a' : '#202225';   // recessed size stamp
    ctx.font = 'bold 13px Arial';
    ctx.fillText('245/35 ZR19', 0, 0.83 * H);
    ctx.restore();
  }

  // Dust and rubber pickup: heaviest at the bead (brake dust) and at the
  // shoulder (track rubber). Colour map only — grime is not a height feature.
  if (!height) {
    const img = ctx.getImageData(0, 0, W, H);
    const d = img.data;
    for (let y = 0; y < H; y++) {
      const v = (y + 0.5) / H;
      const bead = clamp01((v - 0.60) / 0.40);
      const shoulder = clamp01((0.14 - v) / 0.14);
      for (let x = 0; x < W; x++) {
        const u = (x + 0.5) / W;
        const n = fractalNoise(u * 11, v * 6 + 2, 3);
        const g = clamp01((bead * 0.85 + shoulder * 0.6) * (0.35 + n * 0.85));
        const i = (y * W + x) * 4;
        d[i] = lerp(d[i], 74, g * 0.55);
        d[i + 1] = lerp(d[i + 1], 68, g * 0.55);
        d[i + 2] = lerp(d[i + 2], 57, g * 0.55);
      }
    }
    ctx.putImageData(img, 0, 0);
  }
}

let _sidewallMaps = null;
export function sidewallMaps() {
  if (_sidewallMaps) return _sidewallMaps;
  const hgt = makeCanvas(SW_W, SW_H);
  drawSidewall(hgt.ctx, 'height');
  const col = makeCanvas(SW_W, SW_H);
  drawSidewall(col.ctx, 'color');
  _sidewallMaps = {
    map: texFrom(col.c, { srgb: true, clampV: true }),
    // sx is halved against sy for the u/v aspect (see the block comment above).
    normalMap: normalFromCanvas(hgt.c, {
      sx: 0.55, sy: 1.5, wrapV: false, texOpts: { clampV: true },
    }),
  };
  return _sidewallMaps;
}

// ---------------------------------------------------------------------------
// BRAKE DISC. Drilled holes, curved slots, the polished pad sweep and the heat
// colouring a hard-worked iron rotor picks up (straw at the outer band where it
// runs hottest, a blued zone just inboard of it).
// ---------------------------------------------------------------------------

const DISC_W = 1024, DISC_H = 128;
const DISC_HOLES = [0.40, 0.62, 0.84];   // hole rows, by radius fraction
const DISC_SLOTS = 7;

// Distance-ish field: 0 outside features, 1 in the middle of one.
function discCut(u, v) {
  let cut = 0;
  if (v > 0.22) {
    for (let i = 0; i < DISC_HOLES.length; i++) {
      const rowV = DISC_HOLES[i];
      const n = 16;
      const off = (i % 2) * 0.5 / n;
      let du = (u + off) * n % 1; if (du < 0) du += 1;
      du = Math.min(du, 1 - du) * 2;                    // 0 at a hole centre
      const dv = Math.abs(v - rowV) / 0.075;
      const d = Math.hypot(du * 1.6, dv);
      cut = Math.max(cut, 1 - smoothstep((d - 0.55) / 0.45));
    }
    // Curved slots: a slot leans in u as it runs out in v.
    let su = (u + v * 0.06) * DISC_SLOTS % 1; if (su < 0) su += 1;
    const sd = Math.min(su, 1 - su) * 2;
    const band = smoothstep((v - 0.26) / 0.12) * (1 - smoothstep((v - 0.96) / 0.06));
    cut = Math.max(cut, band * (1 - smoothstep((sd - 0.045) / 0.03)));
  }
  return cut;
}

let _discMaps = null;
export function discMaps() {
  if (_discMaps) return _discMaps;
  const normalMap = normalFromHeight(DISC_W, (u, v) => {
    const turn = Math.sin(v * 900) * 0.06;    // lathe turning lines
    return 1 - discCut(u, v) * 0.9 + turn;
  }, 1.1, DISC_H, { wrapV: false, texOpts: { clampV: true } });

  const map = pixelTexture(DISC_W, DISC_H, (u, v, out) => {
    // Cast iron, with the pad sweep polished bright and the hub end dull.
    const sweep = smoothstep((v - 0.20) / 0.14) * (1 - smoothstep((v - 0.94) / 0.06));
    let r = lerp(0.30, 0.52, sweep);
    let g = lerp(0.30, 0.53, sweep);
    let b = lerp(0.31, 0.55, sweep);
    // Heat: blued band inboard, straw/bronze at the hot outer edge.
    const blue = Math.exp(-(((v - 0.55) / 0.16) ** 2)) * 0.5 * sweep;
    const straw = clamp01((v - 0.72) / 0.28) * 0.6 * sweep;
    r = lerp(r, 0.34, blue); g = lerp(g, 0.40, blue); b = lerp(b, 0.58, blue);
    r = lerp(r, 0.62, straw); g = lerp(g, 0.47, straw); b = lerp(b, 0.26, straw);
    // Rust bloom on the unswept edges + turning grain.
    const rust = clamp01((1 - sweep) * fractalNoise(u * 20, v * 8, 3) * 1.6 - 0.2);
    r = lerp(r, 0.34, rust); g = lerp(g, 0.24, rust); b = lerp(b, 0.17, rust);
    const cut = discCut(u, v);
    r = lerp(r, 0.06, cut); g = lerp(g, 0.06, cut); b = lerp(b, 0.07, cut);
    out[0] = r * 255; out[1] = g * 255; out[2] = b * 255;
  }, { srgb: true, clampV: true });

  const roughnessMap = pixelTexture(512, 64, (u, v, out) => {
    const sweep = smoothstep((v - 0.20) / 0.14) * (1 - smoothstep((v - 0.94) / 0.06));
    const cut = discCut(u, v);
    const g = clamp01(lerp(0.85, 0.34, sweep) + cut * 0.5) * 255;
    out[0] = out[1] = out[2] = g;
  }, { clampV: true });

  _discMaps = { map, normalMap, roughnessMap };
  return _discMaps;
}

// ---------------------------------------------------------------------------
// ALLOY WHEEL FINISH. v = radius, so one map gives the whole rim its brake-dust
// gradient: filthy in the spoke roots and around the hub where the dust is
// thrown, progressively cleaner outboard, and a bright machined band at the
// flange. Multiplies the alloy's own colour, so it stays under the blow-out
// ceiling that killed the old near-chrome rim.
// ---------------------------------------------------------------------------

function alloyDust(u, v) {
  const near = clamp01((0.55 - v) / 0.55);            // hub end
  const n = fractalNoise(u * 7, v * 9 + 5, 4);
  const streak = fractalNoise(u * 3, v * 26, 2);      // thrown radially
  return clamp01(near * (0.35 + n * 0.9) * 1.05 + streak * 0.18 * near);
}

let _alloyMaps = null;
export function alloyMaps() {
  if (_alloyMaps) return _alloyMaps;
  const map = pixelTexture(256, 256, (u, v, out) => {
    const turn = 0.94 + 0.06 * (Math.sin(v * 620) * 0.5 + 0.5);  // turned finish
    const lip = smoothstep((v - 0.90) / 0.08);                    // machined lip
    let r = turn * lerp(0.93, 1.0, lip);
    let g = turn * lerp(0.93, 1.0, lip);
    let b = turn * lerp(0.94, 1.0, lip);
    const d = alloyDust(u, v) * (1 - lip * 0.8);
    r = lerp(r, 0.44, d * 0.8); g = lerp(g, 0.40, d * 0.8); b = lerp(b, 0.35, d * 0.8);
    out[0] = r * 255; out[1] = g * 255; out[2] = b * 255;
  }, { srgb: true });
  const roughnessMap = pixelTexture(256, 256, (u, v, out) => {
    const lip = smoothstep((v - 0.90) / 0.08);
    const d = alloyDust(u, v) * (1 - lip * 0.8);
    // Multiplies the material scalar — dust kills the polish, the lip keeps it.
    const g = clamp01(lerp(0.42, 0.86, d) * lerp(1.0, 0.62, lip)) * 255;
    out[0] = out[1] = out[2] = g;
  });
  _alloyMaps = { map, roughnessMap };
  return _alloyMaps;
}

// ---------------------------------------------------------------------------
// Interior fabrics (for parts.js: seats, door cards, dash tops).
// ---------------------------------------------------------------------------

let _seatFabric = null;
// Technical seat cloth: a fine warp/weft weave with perforation dimples in a
// grid, which is what stops a seat facing from reading as painted plastic.
export function seatFabricNormal() {
  if (_seatFabric) return _seatFabric;
  _seatFabric = normalFromHeight(256, (u, v) => {
    const n = 34;
    const warp = Math.sin(u * n * Math.PI * 2) * 0.5 + 0.5;
    const weft = Math.sin(v * n * Math.PI * 2) * 0.5 + 0.5;
    const weave = Math.max(warp, weft) * 0.5 + warp * weft * 0.5;
    // Perforations, 8 x 8 per tile.
    const p = 8;
    const cx = (u * p) % 1 - 0.5, cy = (v * p) % 1 - 0.5;
    const hole = Math.hypot(cx, cy) < 0.14 ? 0 : 1;
    return weave * 0.55 * hole + 0.25 * hole;
  }, 1.2);
  return _seatFabric;
}

let _leather = null;
// Pebble-grain leather: irregular cells with creased boundaries.
export function leatherNormal() {
  if (_leather) return _leather;
  _leather = normalFromHeight(256, (u, v) => {
    const cells = fractalNoise(u * 26, v * 26, 2);
    const grain = fractalNoise(u * 70 + 9, v * 70 + 3, 2);
    // Ridges where the cell field crosses its midpoint = the crease network.
    const crease = 1 - smoothstep(Math.abs(cells - 0.5) / 0.12);
    return 0.72 - crease * 0.45 + grain * 0.12;
  }, 0.9);
  return _leather;
}

// License plate — a small CanvasTexture with country band + plate text.
export function plateTexture(text = 'GT 0142') {
  const { c, ctx } = makeCanvas(256, 80);
  ctx.fillStyle = '#f2f3ea'; ctx.fillRect(0, 0, 256, 80);
  ctx.fillStyle = '#1d3a8a'; ctx.fillRect(0, 0, 30, 80);   // euro band
  ctx.fillStyle = '#ffcb05';
  ctx.beginPath(); ctx.arc(15, 22, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#111417';
  ctx.font = 'bold 52px Arial';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 44, 44);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

// Round chrome badge with a simple emblem.
let _badge = null;
export function badgeTexture() {
  if (_badge) return _badge;
  const { c, ctx } = makeCanvas(128, 128);
  const g = ctx.createRadialGradient(64, 50, 8, 64, 64, 64);
  g.addColorStop(0, '#fdfdff'); g.addColorStop(1, '#8b9099');
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(64, 64, 60, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#3a3f47'; ctx.lineWidth = 5;
  ctx.beginPath(); ctx.arc(64, 64, 60, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = '#1b1e24';
  ctx.font = 'bold 56px Arial';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('R', 64, 66);
  _badge = new THREE.CanvasTexture(c);
  _badge.colorSpace = THREE.SRGBColorSpace;
  return _badge;
}
