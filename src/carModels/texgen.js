import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Procedural texture generators for the car materials.
// Mirrors the CanvasTexture house-style used in track.js (no external image
// files). All maps are built once and cached at module scope so the five cars
// share them.
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

// Build a normal map from a height function h(u,v) in [0,1]^2 (tileable).
function normalFromHeight(size, hFn, strength) {
  const heights = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      heights[y * size + x] = hFn(x / size, y / size);
    }
  }
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const xl = heights[y * size + ((x - 1 + size) % size)];
      const xr = heights[y * size + ((x + 1) % size)];
      const yt = heights[((y - 1 + size) % size) * size + x];
      const yb = heights[((y + 1) % size) * size + x];
      let nx = (xl - xr) * strength;
      let ny = (yt - yb) * strength;
      let nz = 1.0;
      const len = Math.hypot(nx, ny, nz) || 1;
      nx /= len; ny /= len; nz /= len;
      const i = (y * size + x) * 4;
      img.data[i] = (nx * 0.5 + 0.5) * 255;
      img.data[i + 1] = (ny * 0.5 + 0.5) * 255;
      img.data[i + 2] = (nz * 0.5 + 0.5) * 255;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.needsUpdate = true;
  return tex;
}

let _flake = null;
// Dense, very high-frequency facet normals → metallic-flake sparkle that
// twinkles as the sun/IBL sweeps across the paint. The single biggest "real
// car paint" cue versus flat plastic.
export function flakeNormal() {
  if (_flake) return _flake;
  const size = 256;
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  const ctx = c.getContext('2d');
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
  _flake = new THREE.CanvasTexture(c);
  _flake.wrapS = _flake.wrapT = THREE.RepeatWrapping;
  _flake.needsUpdate = true;
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
// 2x2 twill carbon-fibre weave height → normal map.
export function carbonNormal() {
  if (_carbon) return _carbon;
  _carbon = normalFromHeight(128, (u, v) => {
    const n = 8;            // weave cells across the tile
    const fx = u * n, fy = v * n;
    const ix = Math.floor(fx), iy = Math.floor(fy);
    const cx = fx - ix, cy = fy - iy;
    // Twill: the "over" strand shifts by one each row → diagonal rib.
    const over = ((ix + iy) % 2) === 0;
    const ridge = over
      ? Math.sin(cx * Math.PI)
      : Math.sin(cy * Math.PI);
    return 0.35 + ridge * 0.65;
  }, 1.4);
  _carbon.repeat.set(1, 1);
  return _carbon;
}

let _tread = null;
// Tyre tread: lateral grooves + fine longitudinal sipes.
export function treadNormal() {
  if (_tread) return _tread;
  _tread = normalFromHeight(128, (u, v) => {
    const grooves = Math.sin(v * Math.PI * 26) > 0.4 ? 0.0 : 1.0; // chunky blocks
    const sipe = Math.sin(u * Math.PI * 8) * 0.15;
    return grooves * 0.8 + sipe + 0.1;
  }, 1.6);
  _tread.repeat.set(1, 1);
  return _tread;
}

// Subtle dark micro-variation map (used as a roughness map so reflections are
// not perfectly uniform across a panel).
let _paintRough = null;
export function paintRoughness() {
  if (_paintRough) return _paintRough;
  const size = 256;
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const n = fractalNoise(x / size * 18, y / size * 18, 3);
      const v = 0.20 + n * 0.16;            // roughness 0.20..0.36
      const i = (y * size + x) * 4;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v * 255;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  _paintRough = new THREE.CanvasTexture(c);
  _paintRough.wrapS = _paintRough.wrapT = THREE.RepeatWrapping;
  _paintRough.needsUpdate = true;
  return _paintRough;
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

// License plate — a small CanvasTexture with country band + plate text.
export function plateTexture(text = 'GT 0142') {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 80;
  const ctx = c.getContext('2d');
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
  const c = document.createElement('canvas');
  c.width = 128; c.height = 128;
  const ctx = c.getContext('2d');
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
