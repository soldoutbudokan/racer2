/**
 * Golden-hour cloudscape.
 *
 * The old sky was 16 copies of ONE faint sprite at opacity 0.22-0.44 — in
 * practice an empty gradient, and an empty gradient is the single loudest
 * "computer graphics" tell the game had: every real golden-hour photograph is
 * half cloud. This module replaces it with a hand-authored sky per circuit:
 *
 *   - CUMULUS with the two signatures that make a cloud read as a cloud:
 *     a FLAT shadowed base (the condensation level — every cumulus in a scene
 *     shares one base altitude, exactly like a real sky) and a cauliflower
 *     top that is lit on the sun side and blue-grey on the other. The lit
 *     side is baked into the texture with the sun on the LEFT; at placement
 *     the quad's U axis is mirrored when the sun actually appears to the
 *     RIGHT of that cloud from inside the circuit, so every cloud on the ring
 *     shades correctly against the real sun azimuth.
 *   - CIRRUS streaks high up — thin, fibrous, translucent.
 *   - Long low HORIZON BANKS that sit just above the ridgelines and knit the
 *     mountain haze into the sky (distant weather always pools low).
 *
 * Sun-aware tinting per instance: clouds near the sun azimuth are backlit —
 * luminous, warm, silver-lined; clouds opposite catch the low light front-on
 * and stay neutral; low-elevation clouds wash toward the circuit's haze
 * colour so they sink INTO the atmosphere instead of pasting onto it.
 *
 * Batching: every quad of one texture is merged into a single mesh with
 * RGBA vertex colours carrying tint and opacity — 5 draw calls for the whole
 * sky (3 cumulus variants + cirrus + banks) where the old scatter paid 16.
 * All meshes render with depthWrite OFF and negative renderOrder so they draw
 * FIRST among transparents: the sky is the farthest translucent thing in the
 * scene, so painting it before fences/glass is always depth-correct.
 *
 * Scenes are hand-authored per circuit (cluster azimuths deliberately uneven,
 * a different weather story per venue) — see SCENES below.
 */
import * as THREE from 'three';
import { hideFromOverridePasses } from './noise.js';

// Must match the sun placed in scene.js (azimuth 128 deg, elevation 11 deg).
const SUN_AZIM = THREE.MathUtils.degToRad(128);

// Deterministic RNG — the same circuit builds the same sky every session, and
// texture tuning stays reproducible across screenshot iterations.
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------------------------------------------------------------------
// Textures
// ---------------------------------------------------------------------------

function canvasTex(c) {
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/**
 * One cumulus, sun on the LEFT.
 *
 * The first cut of this drew the cloud as loose radial-gradient puffs and it
 * read as a string of popcorn beads — the soft gradients never merged into a
 * mass, so the bright caps were all the eye could find. A cumulus is the
 * opposite: ONE cohesive opaque body whose silhouette is scalloped. So the
 * body is now a single union FILL of many overlapping circles (bumps, their
 * cauliflower florets, and a base slab joining them), and every bit of
 * shading happens 'source-atop' INSIDE that silhouette: a vertical ambient
 * ramp, a warm sun-side wash, a cool far-side wash, then per-bump caps and
 * shadow pockets for the billowing interior. The flat base is CUT
 * (destination-out) so it stays dead level however the bumps landed.
 */
function makeCumulusTexture(rng) {
  const w = 512, h = 256;
  const yB = h * 0.84;                       // condensation level
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');

  // Scalloped silhouette: bumps along the base under a dome envelope, larger
  // and taller mid-cloud, squat at the ends. Two or three of them tower into
  // proper heads.
  const nBump = 9 + ((rng() * 5) | 0);
  const x0 = w * 0.10, x1 = w * 0.90;
  const heads = new Set();
  while (heads.size < 2 + (rng() * 2 | 0)) {
    heads.add(1 + ((rng() * (nBump - 2)) | 0));
  }
  const bumps = [];
  for (let i = 0; i < nBump; i++) {
    const f = i / (nBump - 1);
    const x = x0 + (x1 - x0) * f + (rng() - 0.5) * (w * 0.5 / nBump);
    const dome = 0.30 + 0.70 * Math.sin(Math.PI * f);
    const tower = heads.has(i) ? 1.55 + rng() * 0.5 : 1;
    const r = h * (0.10 + 0.13 * dome) * (0.8 + rng() * 0.4);
    const y = yB - r * (0.55 + 0.75 * dome * tower * (0.8 + rng() * 0.4));
    bumps.push({ x, y: Math.max(y, r * 0.55 + 2), r });
  }
  // Florets: small circles hugging each bump's upper arc — part of the union
  // fill, so they scallop the silhouette instead of floating as beads.
  const florets = [];
  for (const b of bumps) {
    const n = 3 + ((rng() * 4) | 0);
    for (let k = 0; k < n; k++) {
      const a = Math.PI * (0.15 + rng() * 0.8);           // upper arc
      const f = {
        x: b.x + Math.cos(a) * b.r * 0.92,
        y: b.y - Math.sin(a) * b.r * 0.88,
        r: b.r * (0.18 + rng() * 0.2),
      };
      florets.push(f);
      // Second octave: tiny florets on the florets. This is what keeps the
      // silhouette from reading as clip-art-smooth arcs.
      const m = 1 + ((rng() * 3) | 0);
      for (let j = 0; j < m; j++) {
        const a2 = Math.PI * (0.1 + rng() * 0.85);
        florets.push({
          x: f.x + Math.cos(a2) * f.r * 0.9,
          y: f.y - Math.sin(a2) * f.r * 0.85,
          r: f.r * (0.35 + rng() * 0.3),
        });
      }
    }
  }

  // Union fill of the whole body, opaque, softly blurred so the silhouette
  // has a 1-2 px translucent rim instead of an aliased cut.
  ctx.filter = 'blur(1.5px)';
  ctx.fillStyle = 'rgb(214,217,228)';
  ctx.beginPath();
  for (const p of [...bumps, ...florets]) {
    ctx.moveTo(p.x + p.r, p.y);
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
  }
  // Base slab knitting the bumps together down at the condensation level.
  ctx.rect(x0 - w * 0.02, yB - h * 0.13, (x1 - x0) + w * 0.04, h * 0.13 + 4);
  ctx.fill();
  ctx.filter = 'none';

  // ---- All shading below lands only on the body ----
  ctx.globalCompositeOperation = 'source-atop';

  // Ambient ramp: bright crowns, dimmer flanks toward the base.
  const amb = ctx.createLinearGradient(0, 0, 0, yB);
  amb.addColorStop(0, 'rgba(255,251,242,0.42)');
  amb.addColorStop(0.55, 'rgba(214,217,228,0)');
  amb.addColorStop(1, 'rgba(126,138,164,0.52)');
  ctx.fillStyle = amb;
  ctx.fillRect(0, 0, w, h);

  // Sun-side wash (left) and shade-side wash (right).
  const lit = ctx.createLinearGradient(x0, 0, x1, 0);
  lit.addColorStop(0, 'rgba(255,244,222,0.5)');
  lit.addColorStop(0.55, 'rgba(255,244,222,0)');
  ctx.fillStyle = lit;
  ctx.fillRect(0, 0, w, h);
  const shd = ctx.createLinearGradient(x0, 0, x1, 0);
  shd.addColorStop(0.5, 'rgba(112,126,158,0)');
  shd.addColorStop(1, 'rgba(112,126,158,0.42)');
  ctx.fillStyle = shd;
  ctx.fillRect(0, 0, w, h);

  // Per-bump relief: a warm cap on the upper-left of every bump, a cool
  // pocket under its lower-right — the billowing interior structure.
  for (const b of bumps) {
    const lx = b.x - b.r * 0.34, ly = b.y - b.r * 0.42;
    let g = ctx.createRadialGradient(lx, ly, b.r * 0.06, lx, ly, b.r * 0.85);
    g.addColorStop(0, 'rgba(255,247,230,0.55)');
    g.addColorStop(1, 'rgba(255,247,230,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(lx, ly, b.r * 0.85, 0, Math.PI * 2); ctx.fill();
    const sx = b.x + b.r * 0.38, sy = b.y + b.r * 0.30;
    g = ctx.createRadialGradient(sx, sy, b.r * 0.08, sx, sy, b.r * 0.9);
    g.addColorStop(0, 'rgba(118,132,162,0.34)');
    g.addColorStop(1, 'rgba(118,132,162,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(sx, sy, b.r * 0.9, 0, Math.PI * 2); ctx.fill();
  }

  // Dark underbelly just above the base — that face sees no sky and no sun.
  const belly = ctx.createLinearGradient(0, yB - h * 0.15, 0, yB);
  belly.addColorStop(0, 'rgba(108,120,150,0)');
  belly.addColorStop(1, 'rgba(104,116,148,0.55)');
  ctx.fillStyle = belly;
  ctx.fillRect(0, yB - h * 0.15, w, h * 0.15);
  ctx.globalCompositeOperation = 'source-over';

  // Flat base: erase everything below the condensation level, with a few soft
  // bites straddling the line so it is level but not ruled.
  ctx.globalCompositeOperation = 'destination-out';
  const cut = ctx.createLinearGradient(0, yB - 3, 0, yB + 8);
  cut.addColorStop(0, 'rgba(0,0,0,0)');
  cut.addColorStop(1, 'rgba(0,0,0,1)');
  ctx.fillStyle = cut;
  ctx.fillRect(0, yB - 3, w, h - yB + 3);
  ctx.fillStyle = 'rgba(0,0,0,1)';
  ctx.fillRect(0, yB + 6, w, h - yB);
  for (let i = 0; i < 5; i++) {
    const bx = w * (0.1 + rng() * 0.8), br = 8 + rng() * 16;
    const g = ctx.createRadialGradient(bx, yB + br * 0.3, 1, bx, yB + br * 0.3, br);
    g.addColorStop(0, 'rgba(0,0,0,0.45)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(bx, yB + br * 0.3, br, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';

  // Feather the sides and top so the quad edge can never print. The base is
  // already the hardest edge in the image and must stay that way.
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let y = 0; y < h; y++) {
    const fy = Math.min(1, y / (h * 0.08));
    for (let x = 0; x < w; x++) {
      const fx = Math.min(1, Math.min(x, w - 1 - x) / (w * 0.07));
      const f = fx * fx * (3 - 2 * fx) * (fy * fy * (3 - 2 * fy));
      d[(y * w + x) * 4 + 3] *= f;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvasTex(c);
}

/**
 * Long low stratocumulus bank for the horizon: a single row of flattened
 * lumps, hazier and flatter-lit than the cumulus because at that distance
 * aerial perspective has eaten most of the contrast.
 */
function makeBankTexture(rng) {
  const w = 1024, h = 192;
  const yB = h * 0.80;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');

  // Union fill (same reasoning as the cumulus): one cohesive row of flattened
  // lumps, then all shading inside the silhouette.
  const lumps = [];
  const n = 12 + ((rng() * 5) | 0);
  for (let i = 0; i < n; i++) {
    const x = w * (0.05 + 0.90 * (i / (n - 1))) + (rng() - 0.5) * w * 0.05;
    const r = h * (0.24 + rng() * 0.26);
    lumps.push({ x, y: yB - r * (0.30 + rng() * 0.45), r });
  }
  ctx.filter = 'blur(1.5px)';
  ctx.fillStyle = 'rgb(206,210,222)';
  ctx.beginPath();
  for (const p of lumps) {
    ctx.moveTo(p.x + p.r, p.y);
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
  }
  ctx.rect(w * 0.04, yB - h * 0.12, w * 0.92, h * 0.12 + 3);
  ctx.fill();
  ctx.filter = 'none';

  ctx.globalCompositeOperation = 'source-atop';
  const amb = ctx.createLinearGradient(0, h * 0.15, 0, yB);
  amb.addColorStop(0, 'rgba(250,246,238,0.40)');
  amb.addColorStop(0.5, 'rgba(206,210,222,0)');
  amb.addColorStop(1, 'rgba(128,140,164,0.5)');
  ctx.fillStyle = amb;
  ctx.fillRect(0, 0, w, h);
  const lit = ctx.createLinearGradient(0, 0, w, 0);
  lit.addColorStop(0, 'rgba(252,242,224,0.34)');
  lit.addColorStop(0.5, 'rgba(252,242,224,0)');
  lit.addColorStop(1, 'rgba(118,132,160,0.30)');
  ctx.fillStyle = lit;
  ctx.fillRect(0, 0, w, h);
  for (const p of lumps) {
    const lx = p.x - p.r * 0.3, ly = p.y - p.r * 0.5;
    const g = ctx.createRadialGradient(lx, ly, p.r * 0.05, lx, ly, p.r * 0.7);
    g.addColorStop(0, 'rgba(250,243,229,0.4)');
    g.addColorStop(1, 'rgba(247,240,226,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(lx, ly, p.r * 0.7, 0, Math.PI * 2); ctx.fill();
    const sx = p.x + p.r * 0.3, sy = p.y + p.r * 0.4;
    const g2 = ctx.createRadialGradient(sx, sy, p.r * 0.08, sx, sy, p.r * 0.8);
    g2.addColorStop(0, 'rgba(126,138,162,0.28)');
    g2.addColorStop(1, 'rgba(132,144,166,0)');
    ctx.fillStyle = g2;
    ctx.beginPath(); ctx.arc(sx, sy, p.r * 0.8, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalCompositeOperation = 'source-over';

  ctx.globalCompositeOperation = 'destination-out';
  const cut = ctx.createLinearGradient(0, yB - 3, 0, yB + 8);
  cut.addColorStop(0, 'rgba(0,0,0,0)');
  cut.addColorStop(1, 'rgba(0,0,0,1)');
  ctx.fillStyle = cut;
  ctx.fillRect(0, yB - 3, w, h - yB + 3);
  ctx.fillStyle = 'rgba(0,0,0,1)';
  ctx.fillRect(0, yB + 6, w, h - yB);
  ctx.globalCompositeOperation = 'source-over';

  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let y = 0; y < h; y++) {
    const fy = Math.min(1, y / (h * 0.10));
    for (let x = 0; x < w; x++) {
      const fx = Math.min(1, Math.min(x, w - 1 - x) / (w * 0.12));
      const f = fx * fx * (3 - 2 * fx) * (fy * fy * (3 - 2 * fy));
      d[(y * w + x) * 4 + 3] *= f;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvasTex(c);
}

/** Fibrous cirrus streaks — chains of faint dabs along drooping arcs. */
function makeCirrusTexture(rng) {
  const w = 1024, h = 384;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');

  // Few, distinct wisps rather than many merged ones: a sheet of overlapping
  // faint streaks fuses into one grey smear that prints the quad's rectangle.
  const nStreak = 5 + ((rng() * 3) | 0);
  for (let i = 0; i < nStreak; i++) {
    const y0 = h * (0.10 + 0.75 * rng());
    const x0 = w * rng() * 0.5;
    const len = w * (0.22 + rng() * 0.5);
    const droop = (rng() - 0.35) * h * 0.3;
    const amp = 0.14 + rng() * 0.18;             // peak alpha of this streak
    // Each streak is a bundle of fine sub-strands a few px apart — cirrus is
    // fibrous, and fat soft dabs read as an airbrush smear.
    const strands = 3 + ((rng() * 3) | 0);
    for (let s = 0; s < strands; s++) {
      const oy = (rng() - 0.5) * 10;
      const olen = len * (0.55 + rng() * 0.5);
      const steps = 70;
      for (let t = 0; t <= steps; t++) {
        const f = t / steps;
        const x = x0 + olen * f;
        if (x > w) break;
        const y = y0 + oy + droop * f * f + Math.sin(f * 11 + i + s * 2.2) * 2.5;
        // Alpha swells mid-streak and tails off both ends (virga-like wisp).
        const a = amp * Math.sin(Math.PI * Math.min(1, f * 1.1)) * (0.4 + rng() * 0.6);
        const r = 1.4 + 2.6 * Math.sin(Math.PI * f) + rng() * 1.2;
        const g = ctx.createRadialGradient(x, y, 0.3, x, y, r);
        g.addColorStop(0, `rgba(255,250,240,${a.toFixed(3)})`);
        g.addColorStop(1, 'rgba(255,250,240,0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
    }
  }

  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let y = 0; y < h; y++) {
    const fy = Math.min(1, Math.min(y, h - 1 - y) / (h * 0.12));
    for (let x = 0; x < w; x++) {
      const fx = Math.min(1, Math.min(x, w - 1 - x) / (w * 0.10));
      const f = fx * fx * (3 - 2 * fx) * (fy * fy * (3 - 2 * fy));
      d[(y * w + x) * 4 + 3] *= f;
    }
  }
  ctx.putImageData(img, 0, 0);
  return canvasTex(c);
}

// ---------------------------------------------------------------------------
// Hand-authored weather scenes
// ---------------------------------------------------------------------------
// az is in TURNS (0..1, 0 = +z, increasing toward +x — same convention the
// spherical sun uses, so the sun sits at az 128/360 = 0.356). Cluster spacing
// is deliberately uneven: the eye must not find a rhythm around the ring.
//
//   cumulus: { az, r, n, size, spread }  n quads scattered about az
//   banks:   { az, r, w }                one long low quad on the horizon
//   cirrus:  { az, r, y, w }             one high translucent streak sheet
//
// Every cumulus in a scene shares `base` (the condensation level) — one flat
// base line across the whole sky is the strongest single realism cue the sky
// can give — while banks sit lower and cirrus far higher.

const SCENES = {
  // GP parkland: classic fair-weather afternoon. A broken bank in the north,
  // scattered singles elsewhere, one backlit puff riding near the sun.
  gp: {
    base: 570, bankY: 420, seed: 11,
    cumulus: [
      { az: 0.60, r: 1750, n: 4, size: 430, spread: 0.075 },
      { az: 0.71, r: 1950, n: 3, size: 360, spread: 0.05 },
      { az: 0.055, r: 1850, n: 2, size: 390, spread: 0.045 },
      { az: 0.175, r: 2050, n: 2, size: 340, spread: 0.04 },
      { az: 0.44, r: 2150, n: 1, size: 300, spread: 0.02 },
      { az: 0.335, r: 2250, n: 1, size: 330, spread: 0.02 },   // backlit, near sun
      { az: 0.875, r: 1800, n: 2, size: 410, spread: 0.05 },
      // Near ring — bigger, riding higher in the frame, so the sky above the
      // circuit itself is never a bare gradient.
      { az: 0.005, r: 1250, n: 2, size: 620, spread: 0.05 },
      { az: 0.255, r: 1350, n: 1, size: 560, spread: 0.02 },
      { az: 0.50, r: 1300, n: 1, size: 580, spread: 0.02 },
      { az: 0.665, r: 1200, n: 1, size: 640, spread: 0.02 },
      { az: 0.80, r: 1400, n: 1, size: 540, spread: 0.02 },
    ],
    banks: [
      { az: 0.14, r: 2350, w: 1250 },
      { az: 0.52, r: 2400, w: 1100 },
      { az: 0.79, r: 2350, w: 1350 },
    ],
    cirrus: [
      { az: 0.30, r: 1700, y: 1010, w: 950 },
      { az: 0.41, r: 1850, y: 1120, w: 820 },
      { az: 0.66, r: 1800, y: 1060, w: 900 },
      { az: 0.93, r: 1900, y: 980, w: 780 },
    ],
  },
  // Sunset speedway, farmland: the big-sky venue. A long broken cumulus
  // street marches away to the north-east, and the sunward sky is streaked
  // with high cirrus catching the light.
  sprint: {
    base: 560, bankY: 400, seed: 23,
    cumulus: [
      { az: 0.575, r: 1500, n: 3, size: 470, spread: 0.055 },
      { az: 0.645, r: 1800, n: 3, size: 400, spread: 0.045 },
      { az: 0.705, r: 2150, n: 3, size: 330, spread: 0.035 },  // the street recedes
      { az: 0.10, r: 1900, n: 2, size: 380, spread: 0.05 },
      { az: 0.235, r: 2100, n: 1, size: 320, spread: 0.02 },
      { az: 0.385, r: 2200, n: 1, size: 340, spread: 0.02 },
      { az: 0.86, r: 1750, n: 2, size: 430, spread: 0.055 },
      { az: 0.03, r: 1300, n: 1, size: 600, spread: 0.02 },
      { az: 0.175, r: 1250, n: 1, size: 620, spread: 0.02 },
      { az: 0.46, r: 1350, n: 1, size: 560, spread: 0.02 },
      { az: 0.775, r: 1250, n: 2, size: 590, spread: 0.05 },
      { az: 0.935, r: 1400, n: 1, size: 540, spread: 0.02 },
    ],
    banks: [
      { az: 0.30, r: 2400, w: 1400 },
      { az: 0.475, r: 2350, w: 1150 },
      { az: 0.93, r: 2400, w: 1300 },
    ],
    cirrus: [
      { az: 0.27, r: 1650, y: 1050, w: 1050 },
      { az: 0.36, r: 1800, y: 1160, w: 900 },
      { az: 0.445, r: 1750, y: 1010, w: 960 },
      { az: 0.75, r: 1900, y: 1080, w: 800 },
    ],
  },
  // Street circuit: an urban evening — the cumulus is mostly out over the
  // water (the marina side), high thin cirrus elsewhere, haze everywhere.
  downtown: {
    base: 620, bankY: 500, seed: 37,
    cumulus: [
      { az: 0.48, r: 1900, n: 3, size: 400, spread: 0.06 },
      { az: 0.585, r: 2100, n: 2, size: 350, spread: 0.04 },
      { az: 0.13, r: 2050, n: 2, size: 360, spread: 0.045 },
      { az: 0.82, r: 2200, n: 1, size: 310, spread: 0.02 },
      { az: 0.29, r: 1350, n: 1, size: 560, spread: 0.02 },
      { az: 0.69, r: 1300, n: 1, size: 580, spread: 0.02 },
    ],
    banks: [
      { az: 0.245, r: 2350, w: 1300 },
      { az: 0.70, r: 2400, w: 1200 },
    ],
    cirrus: [
      { az: 0.33, r: 1750, y: 1080, w: 1000 },
      { az: 0.52, r: 1850, y: 1150, w: 850 },
      { az: 0.90, r: 1800, y: 1020, w: 900 },
    ],
  },
  // Alpine pass: the dramatic sky. Big convective towers crowding the peaks
  // down-sun, banks of valley cloud low in the cols.
  alpine: {
    base: 640, bankY: 470, seed: 41,
    cumulus: [
      { az: 0.535, r: 1550, n: 4, size: 500, spread: 0.07 },
      { az: 0.655, r: 1750, n: 3, size: 430, spread: 0.05 },
      { az: 0.055, r: 1800, n: 3, size: 460, spread: 0.06 },
      { az: 0.20, r: 2050, n: 2, size: 370, spread: 0.04 },
      { az: 0.345, r: 2250, n: 1, size: 340, spread: 0.02 },
      { az: 0.875, r: 1900, n: 2, size: 400, spread: 0.045 },
      { az: 0.125, r: 1300, n: 1, size: 600, spread: 0.02 },
      { az: 0.44, r: 1350, n: 1, size: 560, spread: 0.02 },
      { az: 0.755, r: 1250, n: 1, size: 620, spread: 0.02 },
    ],
    banks: [
      { az: 0.115, r: 2300, w: 1250 },
      { az: 0.44, r: 2350, w: 1100 },
      { az: 0.76, r: 2300, w: 1400 },
    ],
    cirrus: [
      { az: 0.29, r: 1700, y: 1100, w: 900 },
      { az: 0.60, r: 1800, y: 1180, w: 850 },
    ],
  },
  // Desert: an almost-empty sky — that emptiness IS the desert — with one
  // fair-weather cluster, one remote bank, and big sweeping cirrus.
  dunes: {
    base: 620, bankY: 430, seed: 53,
    cumulus: [
      { az: 0.615, r: 2000, n: 2, size: 330, spread: 0.045 },
      { az: 0.10, r: 2150, n: 1, size: 300, spread: 0.02 },
      { az: 0.78, r: 2250, n: 1, size: 290, spread: 0.02 },
      { az: 0.475, r: 1400, n: 1, size: 520, spread: 0.02 },
    ],
    banks: [
      { az: 0.47, r: 2400, w: 1200 },
    ],
    cirrus: [
      { az: 0.28, r: 1650, y: 1060, w: 1100 },
      { az: 0.40, r: 1800, y: 1170, w: 950 },
      { az: 0.68, r: 1750, y: 1090, w: 1000 },
      { az: 0.92, r: 1850, y: 1000, w: 850 },
    ],
  },
  // Parco: broken parkland cloud on a soft green evening — the busiest
  // cumulus sky of the set, no mountains to carry the horizon so the clouds
  // must do it.
  parco: {
    base: 555, bankY: 400, seed: 67,
    cumulus: [
      { az: 0.52, r: 1650, n: 3, size: 440, spread: 0.06 },
      { az: 0.615, r: 1900, n: 3, size: 380, spread: 0.05 },
      { az: 0.06, r: 1750, n: 3, size: 420, spread: 0.06 },
      { az: 0.18, r: 2000, n: 2, size: 350, spread: 0.04 },
      { az: 0.30, r: 2200, n: 1, size: 320, spread: 0.02 },
      { az: 0.415, r: 2150, n: 1, size: 330, spread: 0.02 },
      { az: 0.755, r: 1800, n: 2, size: 400, spread: 0.05 },
      { az: 0.90, r: 2050, n: 2, size: 350, spread: 0.045 },
      { az: 0.115, r: 1300, n: 1, size: 590, spread: 0.02 },
      { az: 0.35, r: 1250, n: 1, size: 610, spread: 0.02 },
      { az: 0.575, r: 1350, n: 1, size: 570, spread: 0.02 },
      { az: 0.845, r: 1300, n: 1, size: 580, spread: 0.02 },
    ],
    banks: [
      { az: 0.24, r: 2350, w: 1300 },
      { az: 0.475, r: 2400, w: 1150 },
      { az: 0.685, r: 2350, w: 1250 },
      { az: 0.945, r: 2400, w: 1200 },
    ],
    cirrus: [
      { az: 0.35, r: 1750, y: 1040, w: 900 },
      { az: 0.80, r: 1850, y: 1100, w: 850 },
    ],
  },
};

// ---------------------------------------------------------------------------
// Batching
// ---------------------------------------------------------------------------

const UP = new THREE.Vector3(0, 1, 0);

/**
 * Merge a list of quads into one mesh.
 * Each quad: { pos (base-centre), w, h, mirror, tint: Color, alpha, hazeMix,
 * haze: Color } — the bottom edge leans an extra step toward the haze so every
 * cloud sinks into the atmosphere at its base.
 */
function buildBatch(quads, texture, center, renderOrder) {
  // Farthest-first inside the mesh so overlapping neighbours blend correctly.
  quads.sort((a, b) =>
    (b.pos.x - center.x) ** 2 + (b.pos.z - center.z) ** 2 -
    ((a.pos.x - center.x) ** 2 + (a.pos.z - center.z) ** 2));

  const positions = new Float32Array(quads.length * 12);
  const uvs = new Float32Array(quads.length * 8);
  const colors = new Float32Array(quads.length * 16);
  const index = [];

  const n = new THREE.Vector3(), r = new THREE.Vector3(), u = new THREE.Vector3();
  const aim = new THREE.Vector3(), v = new THREE.Vector3();
  const cb = new THREE.Color(), ct = new THREE.Color();

  quads.forEach((q, qi) => {
    // Billboard basis fixed at build time: the camera never leaves the circuit
    // corridor, so facing the circuit centre (tilted to the typical sightline)
    // is indistinguishable from live billboarding — same trick the old clouds
    // and the mountains rely on.
    aim.set(center.x, q.pos.y * 0.35, center.z);
    n.copy(aim).sub(q.pos).normalize();
    r.crossVectors(UP, n).normalize();
    u.crossVectors(n, r);
    if (u.y < 0) { u.negate(); r.negate(); }

    const hw = q.w / 2;
    const corners = [
      v.copy(q.pos).addScaledVector(r, -hw),                       // bottom-left
      new THREE.Vector3().copy(q.pos).addScaledVector(r, hw),      // bottom-right
      new THREE.Vector3().copy(q.pos).addScaledVector(r, -hw).addScaledVector(u, q.h),
      new THREE.Vector3().copy(q.pos).addScaledVector(r, hw).addScaledVector(u, q.h),
    ];
    for (let k = 0; k < 4; k++) {
      positions[qi * 12 + k * 3] = corners[k].x;
      positions[qi * 12 + k * 3 + 1] = corners[k].y;
      positions[qi * 12 + k * 3 + 2] = corners[k].z;
    }
    const u0 = q.mirror ? 1 : 0, u1 = q.mirror ? 0 : 1;
    uvs.set([u0, 0, u1, 0, u0, 1, u1, 1], qi * 8);

    // Bottom verts wash harder toward the haze than the top — aerial
    // perspective pools low, and it is what dissolves the base into the sky.
    cb.copy(q.tint).lerp(q.haze, Math.min(1, q.hazeMix * 1.45));
    ct.copy(q.tint).lerp(q.haze, q.hazeMix * 0.55);
    const ab = q.alpha, at = q.alpha;
    colors.set([cb.r, cb.g, cb.b, ab, cb.r, cb.g, cb.b, ab,
                ct.r, ct.g, ct.b, at, ct.r, ct.g, ct.b, at], qi * 16);

    const b = qi * 4;
    index.push(b, b + 1, b + 2, b + 2, b + 1, b + 3);
  });

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 4));
  geo.setIndex(index);
  geo.computeBoundingSphere();

  const mat = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    vertexColors: true,
    depthWrite: false,
    fog: false,                 // haze is baked per-vertex with more control
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.renderOrder = renderOrder;
  mesh.matrixAutoUpdate = false;
  hideFromOverridePasses(mesh);
  return mesh;
}

// ---------------------------------------------------------------------------

/**
 * @param {THREE.Object3D} scene  group to add the sky to
 * @param {object} opts
 *   id      - circuit id, selects the authored scene (falls back to 'gp')
 *   haze    - the circuit's fog colour (clouds sink toward it low down)
 *   center  - {x, z} circuit centroid (ring centre + billboard aim point)
 */
export function addCloudscape(scene, opts = {}) {
  const S = SCENES[opts.id] || SCENES.gp;
  const rng = mulberry32(S.seed * 9973 + 17);
  const haze = new THREE.Color(opts.haze ?? 0xc8bba6);
  const center = { x: opts.center?.x ?? 0, z: opts.center?.z ?? 0 };
  const sunTurn = SUN_AZIM / (Math.PI * 2);

  // Sun geometry per cloud azimuth. From inside the ring, the sun appears to
  // the RIGHT of a cloud at azimuth `a` when sin(a - sun) > 0 (derivation:
  // viewer right is (-cos a, 0, sin a), sun dir is (sin s, 0, cos s), dot =
  // sin(a - s)); the textures bake the sun on the LEFT, so that is the mirror
  // case. cos(a - s) grades backlit (near sun) to front-lit (opposite).
  const sunSide = (turn) => Math.sin((turn - sunTurn) * Math.PI * 2) > 0;
  const sunCos = (turn) => Math.cos((turn - sunTurn) * Math.PI * 2);

  const tint = new THREE.Color();
  function grade(turn, y, r, alpha) {
    const k = Math.max(0, sunCos(turn));
    const backlit = k * k * k;
    // Backlit clouds go luminous and warm (forward scattering); the rest stay
    // near-neutral and pick up only a whisper of the golden air.
    tint.setRGB(1 + 0.16 * backlit + 0.03,
                1 + 0.08 * backlit + 0.015,
                1 - 0.04 * backlit);
    // Low clouds sink into the haze; high overhead ones stay clean.
    const elev = Math.atan2(y, r);                      // radians
    const hazeMix = Math.max(0, 1 - elev / 0.42) * 0.5 +
                    Math.max(0, (r - 1400) / 1000) * 0.12;
    return { tint: tint.clone(), alpha, hazeMix: Math.min(0.85, hazeMix) };
  }

  const cumulusQuads = [[], [], []];
  let ci = 0;
  for (const cl of S.cumulus) {
    for (let i = 0; i < cl.n; i++) {
      const turn = cl.az + (rng() - 0.5) * cl.spread * 2;
      const a = turn * Math.PI * 2;
      const r = cl.r * (0.94 + rng() * 0.12);
      const w = cl.size * (0.78 + rng() * 0.5);
      const y = S.base + (rng() - 0.5) * 30;
      const g = grade(turn, y, r, 0.88);
      // Cycle the three texture variants so neighbours in a cluster never
      // stamp the same silhouette side by side; jitter the aspect a whisker.
      cumulusQuads[ci++ % 3].push({
        pos: new THREE.Vector3(center.x + Math.sin(a) * r, y, center.z + Math.cos(a) * r),
        w, h: w * 0.5 * (0.9 + rng() * 0.18),           // texture is ~2:1
        mirror: sunSide(turn),
        haze, ...g,
      });
    }
  }

  const bankQuads = [];
  for (const bk of S.banks) {
    const a = bk.az * Math.PI * 2;
    const g = grade(bk.az, S.bankY, bk.r, 0.62);
    bankQuads.push({
      pos: new THREE.Vector3(center.x + Math.sin(a) * bk.r, S.bankY,
                             center.z + Math.cos(a) * bk.r),
      w: bk.w, h: bk.w * (192 / 1024),
      mirror: sunSide(bk.az),
      haze, ...g,
    });
  }

  const cirrusQuads = [];
  for (const ci of S.cirrus) {
    const a = ci.az * Math.PI * 2;
    const g = grade(ci.az, ci.y, ci.r, 0.45);
    cirrusQuads.push({
      pos: new THREE.Vector3(center.x + Math.sin(a) * ci.r, ci.y,
                             center.z + Math.cos(a) * ci.r),
      w: ci.w, h: ci.w * (384 / 1024),
      mirror: sunSide(ci.az),
      haze, ...g,
    });
  }

  // Negative renderOrder: first among transparents (see header). Cirrus and
  // banks sit behind the cumulus wherever they overlap in a sightline.
  scene.add(buildBatch(cirrusQuads, makeCirrusTexture(rng), center, -4));
  scene.add(buildBatch(bankQuads, makeBankTexture(rng), center, -3));
  for (let v = 0; v < 3; v++) {
    if (!cumulusQuads[v].length) continue;
    scene.add(buildBatch(cumulusQuads[v], makeCumulusTexture(rng), center, -2 + v * 0.1));
  }
}
