/**
 * Shared procedural-noise and canvas-texture helpers.
 *
 * These were inlined in track.js until the scenery grew into its own modules
 * (terrain, mountains, trees, barriers) — they are pure functions of their
 * arguments with no track state, so they live here and every scenery builder
 * imports the same implementations. Do not fork copies: the tile-seam and
 * override-pass fixes below were each found the hard way.
 */
import * as THREE from 'three';

export function hashFn(x, y) {
  const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return s - Math.floor(s);
}

export function smoothstep(a, b, t) {
  t = Math.max(0, Math.min(1, (t - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

export function valueNoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const a = hashFn(xi, yi);
  const b = hashFn(xi + 1, yi);
  const c = hashFn(xi, yi + 1);
  const d = hashFn(xi + 1, yi + 1);
  const u = smoothstep(0, 1, xf);
  const v = smoothstep(0, 1, yf);
  return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
}

export function fractalNoise(x, y, oct) {
  let amp = 0.5, freq = 1, sum = 0, max = 0;
  for (let i = 0; i < oct; i++) {
    sum += amp * valueNoise(x * freq, y * freq);
    max += amp;
    amp *= 0.5; freq *= 2;
  }
  return sum / max;
}

/**
 * Ridged multifractal: 1-|2n-1| per octave, each octave weighted by the
 * previous one's value. Gives sharp crests and smooth valleys — the signature
 * of eroded rock — where plain fBm only ever gives rounded lumps.
 */
export function ridgedNoise(x, y, oct = 5, lac = 2.03, gain = 0.5) {
  let amp = 0.5, freq = 1, sum = 0, max = 0, prev = 1;
  for (let i = 0; i < oct; i++) {
    let n = valueNoise(x * freq, y * freq);
    n = 1 - Math.abs(n * 2 - 1);
    n *= n;                       // sharpen the crest
    sum += amp * n * prev;
    max += amp;
    prev = 0.4 + n * 0.6;         // crests feed the next octave, valleys damp it
    amp *= gain; freq *= lac;
  }
  return sum / max;
}

/**
 * Wrap a texel-space colour function so the resulting tile repeats without
 * seams: pixels in the last ~15% of each axis cross-fade toward the sample
 * folded back from the opposite edge. Ground textures repeat dozens of times
 * across the terrain, and the raw value-noise doesn't wrap — every tile
 * boundary rendered as a bright straight seam line across the grass.
 */
export function makeTileable(fn, band = 0.15) {
  const mix = (a, b, t) => [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
  const foldX = (x, y) => {
    if (x < 1 - band) return fn(x, y);
    const t = smoothstep(0, 1, (x - (1 - band)) / band);
    return mix(fn(x, y), fn(x - 1, y), t);
  };
  return (x, y) => {
    if (y < 1 - band) return foldX(x, y);
    const t = smoothstep(0, 1, (y - (1 - band)) / band);
    return mix(foldX(x, y), foldX(x, y - 1), t);
  };
}

export function makeNoiseTexture(size, fn) {
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const [r, g, b] = fn(x / size, y / size);
      const i = (y * size + x) * 4;
      img.data[i] = Math.min(255, Math.max(0, r * 255));
      img.data[i + 1] = Math.min(255, Math.max(0, g * 255));
      img.data[i + 2] = Math.min(255, Math.max(0, b * 255));
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

export function makeNormalTexture(size, strength) {
  const heights = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      heights[y * size + x] = fractalNoise(x / size * 8, y / size * 8, 4);
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
      const yl = heights[((y - 1 + size) % size) * size + x];
      const yr = heights[((y + 1) % size) * size + x];
      const dx = (xr - xl) * strength;
      const dy = (yr - yl) * strength;
      const nx = -dx;
      const ny = -dy;
      const nz = 1.0;
      const len = Math.hypot(nx, ny, nz);
      const i = (y * size + x) * 4;
      img.data[i] = ((nx / len) * 0.5 + 0.5) * 255;
      img.data[i + 1] = ((ny / len) * 0.5 + 0.5) * 255;
      img.data[i + 2] = ((nz / len) * 0.5 + 0.5) * 255;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Skip a mesh during the GTAO pass's depth/normal prepasses.
 *
 * That prepass swaps in `scene.overrideMaterial`, which ignores alphaTest and
 * per-mesh billboarding — so alpha-cutout foliage cards became grey AO
 * rectangles on the grass and cloud quads burned slabs into the sky.
 */
export function hideFromOverridePasses(mesh) {
  const geo = mesh.geometry;
  mesh.onBeforeRender = (renderer, scene) => {
    if (scene.overrideMaterial) geo.setDrawRange(0, 0);
  };
  mesh.onAfterRender = (renderer, scene) => {
    if (scene.overrideMaterial) geo.setDrawRange(0, Infinity);
  };
}
