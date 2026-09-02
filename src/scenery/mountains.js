/**
 * Distant mountain ranges.
 *
 * The old implementation scattered ~15 displaced `ConeGeometry` cones per band
 * around the circuit. That is why the horizon read as a row of separate
 * triangular teeth: a real range is not a line of cones, it is ONE continuous
 * ridgeline whose spurs advance and retreat, so nearer shoulders occlude
 * further summits and the skyline is a single unbroken line with notches and
 * saddles cut into it. Cones can never do that — each one owns its own
 * silhouette and they only ever stack, never merge.
 *
 * So each band here is a single closed RING SKIRT around the circuit:
 *
 *   - a crest line h(angle), r(angle) built from a hand-authored massif table
 *     (a few dominant massifs with subordinate spurs, deliberately uneven)
 *     modulated by ridged noise for peaks/saddles and cut by authored cols;
 *   - a hand-authored down-slope PROFILE (steep near the summit, flattening
 *     into a debris apron) swept inward from the crest toward the circuit;
 *   - fall-line spur/gully displacement on that face so the visible slopes
 *     have real relief instead of reading as smooth or faceted slabs;
 *   - a toe row seated on `terrain.height()` and a skirt row far below it, so
 *     no gap or floating edge can ever show against the rolling ground.
 *
 * Only the INWARD face exists — the camera is always inside the ring, so the
 * outward half of a mountain is geometry nobody can see. That plus the shared
 * material means all three bands merge into ONE mesh: one draw call for the
 * whole horizon, where the cone scatter cost ~45 meshes.
 *
 * Aerial perspective is what actually sells distance, and it is baked per
 * vertex: further bands wash toward the haze colour, and within a band the
 * wash gets stronger toward the base (haze pools in valleys). That second term
 * does double duty — it is physically right AND it dissolves the join where
 * the mountain foot meets the terrain.
 */
import * as THREE from 'three';
import { fractalNoise, ridgedNoise, smoothstep } from './noise.js';
import { rand } from './rng.js';

const TAU = Math.PI * 2;

/**
 * Noise sampled around a circle of radius `k`, so it is exactly periodic in
 * the ring angle. Sampling a 1-D noise on `a` directly would print a seam at
 * a = 0 — a vertical cliff in the skyline at one azimuth on every circuit.
 * `k` sets the feature count (~6.3k features per lap of the ring).
 */
function ringF(a, k, ox, oz, oct) {
  return fractalNoise(Math.cos(a) * k + ox, Math.sin(a) * k + oz, oct);
}
function ringR(a, k, ox, oz, oct) {
  return ridgedNoise(Math.cos(a) * k + ox, Math.sin(a) * k + oz, oct);
}

/** Shortest signed distance between two angles expressed in TURNS. */
function turnDelta(a, b) {
  const d = a - b;
  return d - Math.round(d);
}

/**
 * Large-scale structure. Each entry is [centre, halfWidth, amp, skew] in turns:
 * a massif with an asymmetric footprint (one steep flank, one long one — no
 * real massif is symmetric). Combined as a soft union `1 - prod(1 - f)` rather
 * than a sum, because summing two overlapping massifs produces one absurd
 * mega-peak, and `max` leaves a visible crease where they meet.
 *
 * These are hand-authored and deliberately unevenly spaced: the whole point of
 * the band is that the eye must not find a rhythm in the skyline. Each band
 * gets a different table plus a random rotation, so the three ranges never
 * line up their summits.
 */
const MASSIFS = [
  // Two dominant blocks, a long low shoulder, and a scatter of subordinate spurs.
  [[0.045, 0.105, 1.00, 0.34], [0.145, 0.048, 0.52, -0.20], [0.205, 0.036, 0.38, 0.10],
   [0.300, 0.132, 0.92, -0.28], [0.415, 0.055, 0.44, 0.24], [0.520, 0.088, 0.78, 0.06],
   [0.640, 0.150, 0.86, 0.30], [0.760, 0.042, 0.35, -0.16], [0.845, 0.075, 0.66, -0.32],
   [0.930, 0.058, 0.50, 0.18]],
  // One huge central massif, a wide gap opposite it (where the band behind shows through).
  [[0.030, 0.062, 0.58, -0.24], [0.115, 0.170, 1.00, 0.22], [0.255, 0.050, 0.40, 0.30],
   [0.330, 0.096, 0.74, -0.14], [0.470, 0.070, 0.62, 0.20], [0.560, 0.034, 0.30, -0.28],
   [0.700, 0.118, 0.88, -0.34], [0.820, 0.064, 0.55, 0.26], [0.895, 0.038, 0.36, 0.08]],
  // Three comparable ranges separated by broad cols.
  [[0.070, 0.140, 0.95, -0.30], [0.190, 0.044, 0.42, 0.22], [0.285, 0.078, 0.70, 0.32],
   [0.395, 0.122, 1.00, -0.18], [0.505, 0.036, 0.33, 0.12], [0.610, 0.092, 0.80, 0.28],
   [0.735, 0.056, 0.48, -0.26], [0.860, 0.128, 0.90, 0.16], [0.960, 0.040, 0.38, -0.10]],
];

/**
 * Butte clusters for the desert. Mesas are not a range — they are isolated
 * flat-topped remnants standing on a plain, and they come in CLUSTERS with
 * long empty stretches between them (that emptiness is what makes the desert
 * read as a desert). `amp` varies hard within a cluster so no two neighbours
 * share a skyline height.
 */
const BUTTES = [
  [[0.015, 0.030, 0.86], [0.062, 0.046, 1.00], [0.104, 0.022, 0.54],
   [0.285, 0.055, 0.92], [0.348, 0.028, 0.62],
   [0.520, 0.038, 0.70], [0.572, 0.064, 1.00], [0.640, 0.024, 0.46],
   [0.790, 0.050, 0.88], [0.856, 0.033, 0.58]],
  [[0.040, 0.042, 0.74], [0.096, 0.026, 0.48],
   [0.230, 0.060, 1.00], [0.300, 0.030, 0.66], [0.345, 0.020, 0.40],
   [0.545, 0.048, 0.84], [0.608, 0.036, 0.60],
   [0.735, 0.070, 1.00], [0.822, 0.026, 0.52], [0.905, 0.040, 0.72]],
  [[0.075, 0.058, 0.96], [0.148, 0.032, 0.62], [0.196, 0.022, 0.44],
   [0.380, 0.044, 0.78], [0.436, 0.062, 1.00],
   [0.630, 0.036, 0.58], [0.684, 0.028, 0.44], [0.726, 0.052, 0.86],
   [0.900, 0.046, 0.80]],
];

/**
 * Cols: narrow deep notches cut through the crest at authored azimuths, one
 * per band. Ridged noise alone gives saddles but never a proper pass — the
 * V-shaped gap that lets you see the range behind. [centre, width, depth] in
 * turns / fraction of local height.
 */
const COLS = [
  [[0.108, 0.013, 0.55], [0.372, 0.009, 0.42], [0.588, 0.016, 0.60], [0.812, 0.010, 0.38]],
  [[0.062, 0.011, 0.48], [0.298, 0.015, 0.58], [0.516, 0.008, 0.35], [0.766, 0.012, 0.52]],
  [[0.152, 0.014, 0.52], [0.418, 0.010, 0.40], [0.672, 0.012, 0.56], [0.928, 0.009, 0.36]],
];

/**
 * Down-slope profiles: [yFraction, runFraction] per row, crest (1, 0) to toe
 * (0, 1). Hand-authored rather than a power curve because the shape of the
 * fall line is the whole read of a mountain: steep bare rock at the summit,
 * a long concave flank, then a debris apron that flattens into the valley.
 * Row count is the band's vertical tessellation, so `near` gets more rows.
 */
const PROFILES = {
  // Alpine: near-vertical summit walls (~55 deg) easing to a 15 deg apron.
  alpine: [
    [1.000, 0.000], [0.955, 0.035], [0.900, 0.075], [0.830, 0.120], [0.748, 0.172],
    [0.660, 0.228], [0.570, 0.288], [0.480, 0.350], [0.393, 0.415], [0.312, 0.483],
    [0.236, 0.556], [0.166, 0.635], [0.104, 0.722], [0.050, 0.828], [0.000, 1.000],
  ],
  // Older, more eroded ranges: rounder shoulders, longer aprons.
  worn: [
    [1.000, 0.000], [0.940, 0.055], [0.855, 0.125], [0.750, 0.205], [0.630, 0.295],
    [0.505, 0.395], [0.378, 0.505], [0.256, 0.630], [0.140, 0.775], [0.052, 0.900],
    [0.000, 1.000],
  ],
  // Farmland ridges: no cliffs anywhere, gentle convex-to-concave swells.
  rolling: [
    [1.000, 0.000], [0.930, 0.075], [0.820, 0.165], [0.680, 0.275], [0.530, 0.400],
    [0.375, 0.540], [0.230, 0.690], [0.105, 0.845], [0.000, 1.000],
  ],
  // Mesa: flat caprock rim, a ~73 deg cliff through the hard strata, then a
  // 30 deg talus fan of the debris that cliff has been shedding.
  mesa: [
    [1.000, 0.000], [0.985, 0.022], [0.940, 0.048], [0.845, 0.082], [0.730, 0.118],
    [0.610, 0.152], [0.492, 0.190], [0.390, 0.245], [0.295, 0.345], [0.200, 0.480],
    [0.108, 0.660], [0.038, 0.845], [0.000, 1.000],
  ],
};

/**
 * Per-circuit presets. Bands go front to back; each is hazier, lower-contrast
 * and TALLER than the one in front, because a further range of the same height
 * would simply hide behind the nearer one — the back band has to out-reach the
 * front band's saddles to be seen at all.
 *
 * `maxY` is a hard ceiling on the tallest crest: the cloud layer starts at
 * y 580 and a ridge poking into it merges silhouettes with the cloud sprites
 * from any elevated camera. Crest heights are normalised to hit `maxY` exactly
 * at the highest summit, so the ceiling holds whatever the terrain does under
 * the range.
 */
const PRESETS = {
  // The GP default: parkland with forested foothills handing off to a cool
  // slate range on the horizon. Kept deliberately modest — this circuit is not
  // a mountain venue (see the 2026-07-24 "de-mountaining" changelog entry).
  far: {
    profile: 'worn', runK: 1.30, runMin: 90, maxY: 380,
    haze: 0xb9c2c6, rock: 0x6f7884, rock2: 0x828b95, forest: 0x53604c,
    snow: 0xdfe6ee, scree: 0x9aa0a4,
    snowY: 176, treeY: 128, treeBand: 44, snowy: true,
    bands: [
      { r: 1550, rVar: 190, H: 205, na: 300, floor: 0.30, haze: 0.05,
        crestK: 1.5, spurK: 3.4, spur: 0.17, gully: 0.13, rough: 0.065 },
      { r: 2010, rVar: 230, H: 300, na: 260, floor: 0.25, haze: 0.15,
        crestK: 1.8, spurK: 3.0, spur: 0.15, gully: 0.12, rough: 0.055 },
      { r: 2470, rVar: 260, H: 395, na: 220, floor: 0.20, haze: 0.28,
        crestK: 2.1, spurK: 2.6, spur: 0.13, gully: 0.10, rough: 0.040 },
    ],
  },
  // The alpine pass: the front wall is close enough to loom over the circuit,
  // so it carries the most vertical tessellation and the strongest fall-line
  // relief. Flat-shaded slabs at this range were the standing visible defect.
  near: {
    profile: 'alpine', runK: 1.15, runMin: 70, maxY: 485,
    haze: 0xc4d0d8, rock: 0x646d79, rock2: 0x7d8794, forest: 0x46543f,
    snow: 0xeef3f8, scree: 0x98a0a8,
    snowY: 306, treeY: 168, treeBand: 58, snowy: true,
    bands: [
      { r: 1150, rVar: 175, H: 300, na: 420, floor: 0.26, haze: 0.05,
        crestK: 1.3, spurK: 4.6, spur: 0.20, gully: 0.15, rough: 0.075 },
      { r: 1580, rVar: 220, H: 395, na: 340, floor: 0.22, haze: 0.16,
        crestK: 1.6, spurK: 3.8, spur: 0.17, gully: 0.13, rough: 0.060 },
      { r: 2080, rVar: 250, H: 470, na: 260, floor: 0.18, haze: 0.31,
        crestK: 1.9, spurK: 3.2, spur: 0.15, gully: 0.11, rough: 0.045 },
    ],
  },
  // Desert: horizontally stratified rock. Flat tops, hard cliffs, no snow,
  // no treeline — and a low plain between the clusters so they read as
  // isolated remnants rather than a continuous wall of red rock.
  mesa: {
    profile: 'mesa', runK: 0.85, runMin: 60, maxY: 340, mesaFlag: true,
    haze: 0xd2b78c, rock: 0x9c5836, rock2: 0xb07048, forest: 0x7a6a44,
    snow: 0xe9d9b8, scree: 0xbc9a70,
    strata: [0x8f4c2e, 0xa9663d, 0x7d4230, 0xbd8a5c, 0x93553a, 0xa5754c],
    caprock: 0x6f4632, strataH: 23,
    snowY: 9e9, treeY: -9e9, treeBand: 30, snowy: false,
    bands: [
      { r: 1250, rVar: 150, H: 165, na: 340, floor: 0.055, haze: 0.11,
        crestK: 2.4, spurK: 5.0, spur: 0.10, gully: 0.06, rough: 0.030 },
      { r: 1780, rVar: 190, H: 225, na: 290, floor: 0.050, haze: 0.20,
        crestK: 2.7, spurK: 4.2, spur: 0.09, gully: 0.05, rough: 0.025 },
      { r: 2320, rVar: 210, H: 290, na: 240, floor: 0.045, haze: 0.34,
        crestK: 3.0, spurK: 3.6, spur: 0.08, gully: 0.05, rough: 0.020 },
    ],
  },
  // Long low farmland ridges in warm late-summer golds and greens: no rock
  // faces, no snow, just pasture, crop patches and copses over the swells.
  hills: {
    profile: 'rolling', runK: 1.70, runMin: 90, maxY: 230, fields: true,
    haze: 0xdcc9a2, rock: 0x9a8f5c, rock2: 0xa89a5e, forest: 0x66743e,
    snow: 0xeee6cf, scree: 0xb5a878,
    snowY: 9e9, treeY: 400, treeBand: 120, snowy: false,
    bands: [
      { r: 1420, rVar: 200, H: 125, na: 260, floor: 0.34, haze: 0.12,
        crestK: 1.6, spurK: 3.0, spur: 0.18, gully: 0.12, rough: 0.06 },
      { r: 1900, rVar: 230, H: 175, na: 220, floor: 0.30, haze: 0.20,
        crestK: 1.9, spurK: 2.6, spur: 0.16, gully: 0.11, rough: 0.05 },
      { r: 2380, rVar: 250, H: 235, na: 190, floor: 0.26, haze: 0.34,
        crestK: 2.2, spurK: 2.2, spur: 0.14, gully: 0.09, rough: 0.04 },
    ],
  },
};

/** Asymmetric hump, 1 at the centre falling to 0 at |u| = 1. */
function hump(u, skew) {
  const s = u < 0 ? u / (1 - skew) : u / (1 + skew);
  if (s <= -1 || s >= 1) return 0;
  return 0.5 + 0.5 * Math.cos(Math.PI * s);
}

/** Flat-topped trapezoid — a butte's caprock, not a peak. */
function plateau(u) {
  const s = Math.abs(u);
  if (s >= 1) return 0;
  return s <= 0.7 ? 1 : (1 - s) / 0.3;
}

function envelope(turn, table, rot, flat) {
  let inv = 1;
  for (let k = 0; k < table.length; k++) {
    const e = table[k];
    const u = turnDelta(turn, e[0] + rot) / e[1];
    const f = flat ? e[2] * plateau(u) : e[2] * hump(u, e[3]);
    if (f > 0) inv *= (1 - f);
  }
  return 1 - inv;
}

/** Wrapping 3-tap smooth. */
function smoothRing(arr, passes) {
  const n = arr.length;
  const tmp = new Float32Array(n);
  for (let p = 0; p < passes; p++) {
    for (let i = 0; i < n; i++) {
      tmp[i] = arr[(i - 1 + n) % n] * 0.25 + arr[i] * 0.5 + arr[(i + 1) % n] * 0.25;
    }
    arr.set(tmp);
  }
}

/**
 * @param {THREE.Object3D} scene   group to add the range to
 * @param {string} kind            'far' | 'near' | 'mesa' | 'hills'
 * @param {object|null} terrain    the makeTerrain() result, for seating
 */
export function addDistantMountains(scene, kind = 'far', terrain = null) {
  const P = PRESETS[kind] || PRESETS.far;
  const rows = PROFILES[P.profile];
  const NR = rows.length + 1;              // + one skirt row below the toe

  // Ring centre: the circuit centroid, not the world origin. Several layouts
  // sit hundreds of metres off origin, and a range centred on (0,0) is
  // noticeably closer on one side of the lap than the other.
  const cx = terrain?.centre?.x ?? 0;
  const cz = terrain?.centre?.z ?? 0;
  const groundAt = terrain ? (x, z) => terrain.height(x, z) : () => 0;

  const haze = new THREE.Color(P.haze);
  const rockA = new THREE.Color(P.rock);
  const rockB = new THREE.Color(P.rock2);
  const forest = new THREE.Color(P.forest);
  const snow = new THREE.Color(P.snow);
  const scree = new THREE.Color(P.scree);
  const caprock = P.caprock ? new THREE.Color(P.caprock) : null;
  const strata = (P.strata || []).map((h) => new THREE.Color(h));
  const col = new THREE.Color();
  const mixC = new THREE.Color();

  // Per-row fall-line steepness, used to keep trees off cliffs and to fan
  // scree onto the aprons. Constant per row, which is all the accuracy a
  // vertex-colour zone needs.
  const rowSteep = new Float32Array(rows.length);
  for (let j = 0; j < rows.length; j++) {
    const a = rows[Math.max(0, j - 1)], b = rows[Math.min(rows.length - 1, j + 1)];
    const dy = a[0] - b[0], dr = Math.max(1e-4, (b[1] - a[1]) * P.runK);
    rowSteep[j] = Math.min(1, (dy / dr) / 1.6);
  }

  const positions = [];
  const colors = [];
  const indices = [];

  for (let b = 0; b < P.bands.length; b++) {
    const B = P.bands[b];
    const NA = B.na;
    const base = positions.length / 3;

    // Decorrelate every band's noise fields AND rotate its authored structure,
    // so the three ranges never stack their summits at the same azimuth.
    const rot = rand();
    const ox = rand() * 320 - 160, oz = rand() * 320 - 160;
    const sox = rand() * 320 - 160, soz = rand() * 320 - 160;
    const table = P.mesaFlag ? BUTTES[b] : MASSIFS[b];
    const cols = COLS[b];

    // ---- Crest line: the silhouette, which is what the eye actually judges ----
    const hC = new Float32Array(NA);
    const rC = new Float32Array(NA);
    for (let i = 0; i < NA; i++) {
      const turn = i / NA;
      const a = turn * TAU;
      const env = envelope(turn, table, rot, P.mesaFlag);
      // Ridged noise gives sharp crests and smooth saddles; on the mesas it is
      // held back hard so the caprock stays flat.
      const crest = ringR(a, B.crestK, ox, oz, 4);
      const fine = ringF(a, B.crestK * 2.7, ox + 11.3, oz - 7.9, 3);
      let h = P.mesaFlag
        ? (0.86 + 0.14 * crest)
        : (0.34 + 0.66 * crest) + (fine - 0.5) * 0.10;
      h *= B.floor + (1 - B.floor) * env;
      // Cut the authored passes.
      for (let k = 0; k < cols.length; k++) {
        const c = cols[k];
        const d = turnDelta(turn, c[0] + rot) / c[1];
        if (d > -3 && d < 3) h *= 1 - c[2] * Math.exp(-d * d);
      }
      hC[i] = Math.max(0.015, h);
      // The crest radius meanders so spurs advance and retreat: that is what
      // makes one shoulder of the band occlude another instead of the whole
      // range sitting on one clean circle.
      rC[i] = B.r + (ringF(a, 1.7, ox - 22.7, oz + 15.1, 3) - 0.5) * B.rVar;
    }
    // The angular sampling is ~20-30 m at these radii, so the top noise octave
    // is only a few samples wide; without this a lone high sample becomes a
    // 1-px needle spike on the skyline (a standing Backlog item on the old
    // cones). One wrapping smoothing pass kills the needles and leaves the
    // authored shape untouched.
    smoothRing(hC, P.mesaFlag ? 1 : 2);
    smoothRing(rC, 1);

    // Normalise so the tallest summit lands exactly on this band's H, then
    // seat the toes and re-scale if the terrain under them pushed the range
    // toward the cloud deck.
    let hMax = 0;
    for (let i = 0; i < NA; i++) if (hC[i] > hMax) hMax = hC[i];
    const norm = B.H / Math.max(1e-4, hMax);
    for (let i = 0; i < NA; i++) hC[i] *= norm;

    // Toe seating. The run scales with the LOCAL crest height (a low saddle
    // must not sit on a 500 m apron), so the toe line meanders in and out with
    // the massifs above it.
    const run = new Float32Array(NA);
    const toeY = new Float32Array(NA);
    let topY = -1e9;
    for (let i = 0; i < NA; i++) {
      const a = (i / NA) * TAU;
      run[i] = P.runK * hC[i] + P.runMin;
      const tr = Math.max(60, rC[i] - run[i]);
      // Sink the toe 25 m under the ground: seated flush it would z-fight
      // along the whole contact line, and the rolling terrain in front of it
      // then reads as foothills standing against the range.
      toeY[i] = groundAt(cx + Math.cos(a) * tr, cz + Math.sin(a) * tr) - 25;
      if (toeY[i] + hC[i] > topY) topY = toeY[i] + hC[i];
    }
    if (topY > P.maxY) {
      const s = P.maxY / topY;
      for (let i = 0; i < NA; i++) hC[i] *= s;
    }

    // ---- Sweep the profile ----
    for (let j = 0; j < NR; j++) {
      const skirt = j === rows.length;
      const row = rows[Math.min(j, rows.length - 1)];
      const yF = row[0], rF = row[1];
      const steep = rowSteep[Math.min(j, rows.length - 1)];
      // Fade the relief out at the toe so the seating stays exact, and at the
      // very summit so the displacement cannot grow needles off the skyline.
      const fadeToe = 1 - smoothstep(0.72, 1.0, rF);
      const fadeTip = smoothstep(0.0, 0.10, rF);

      for (let i = 0; i < NA; i++) {
        const a = (i / NA) * TAU;
        const h = hC[i];

        // Fall-line fields: periodic in the ring angle, drifting with depth
        // down the slope so spurs meander instead of running as straight
        // radial fins. `g` is the spur/gully ridge, `d2` the surface break-up.
        const g = ringR(a, B.spurK, sox + rF * 1.9, soz + rF * 1.9, 3);
        const d2 = ringF(a, B.spurK * 2.4, sox + 40.7 + rF * 3.4, soz - 31.3 + rF * 3.4, 3);

        // Spurs push toward the viewer (smaller radius), gullies cut back in.
        const dr = (g - 0.40) * B.spur * h * fadeToe;
        const dy = ((g - 0.40) * B.gully + (d2 - 0.5) * B.rough) *
                   h * fadeToe * fadeTip * (0.25 + 0.75 * yF);

        const r = Math.max(40, rC[i] - run[i] * rF - dr);
        const y = skirt ? toeY[i] - 260 : toeY[i] + h * yF + dy;
        positions.push(cx + Math.cos(a) * r, y, cz + Math.sin(a) * r);

        // ---- Vertex colour: zones by ABSOLUTE elevation, relief shading, haze ----
        if (P.mesaFlag) {
          // Strata are horizontal beds laid down before the mesas were carved
          // out of them, so the banding must key off world y, not off the
          // butte's own height — that is what makes separate buttes read as
          // remnants of ONE plateau.
          const sIdx = (y + (d2 - 0.5) * 13) / P.strataH;
          const k0 = Math.floor(sIdx);
          const frac = sIdx - k0;
          const n = strata.length;
          col.copy(strata[((k0 % n) + n) % n]);
          // Soften only the top sliver of each bed: hard edges everywhere read
          // as stripes on a beach ball, hard edges with soft tops read as rock.
          if (frac > 0.82) {
            mixC.copy(strata[(((k0 + 1) % n) + n) % n]);
            col.lerp(mixC, (frac - 0.82) / 0.18 * 0.8);
          }
          if (caprock && yF > 0.93) col.lerp(caprock, smoothstep(0.93, 0.995, yF) * 0.75);
          // Talus fan of shed debris at the cliff foot, lobed so it is a fan
          // and not a collar.
          const fan = smoothstep(0.45, 0.95, rF) *
                      smoothstep(0.30, 0.62, ringF(a, B.spurK * 0.6, sox + 5, soz - 9, 2));
          col.lerp(scree, fan * 0.72);
        } else {
          col.copy(rockA).lerp(rockB, d2 * 0.85);
          // Treeline: an absolute elevation, dithered by the surface noise so
          // it is a ragged edge of stragglers, and thinned off steep faces
          // where nothing can root.
          const tl = 1 - smoothstep(P.treeY - P.treeBand,
                                    P.treeY + P.treeBand * 0.6,
                                    y + (d2 - 0.5) * 55);
          col.lerp(forest, tl * (1 - steep * 0.72) * 0.88);
          if (P.fields) {
            // Farmland: broad crop/pasture patches instead of rock and forest.
            const patch = ringF(a, B.spurK * 1.4, sox - 60, soz + 44, 3);
            col.lerp(rockB, smoothstep(0.44, 0.72, patch + (yF - 0.5) * 0.2) * 0.55);
          }
          if (P.snowy) {
            // Snow follows the crests (a spur ridge holds it lower than the
            // gully beside it), the line itself is dithered by patchy melt,
            // and steep gully walls avalanche theirs off to bare rock.
            const line = P.snowY - g * 78 + (d2 - 0.5) * 95;
            let sf = smoothstep(line, line + 42, y);
            sf *= 1 - Math.min(0.85, Math.max(0, 0.40 - g) * 2.0 * steep);
            col.lerp(snow, sf);
          }
          // Scree fans spilling off the lower faces onto the apron.
          const fan = smoothstep(0.52, 0.92, rF) *
                      smoothstep(0.34, 0.66, ringF(a, B.spurK * 0.7, sox + 13, soz - 21, 2));
          col.lerp(scree, fan * 0.42 * (1 - steep * 0.4));
        }

        // Fake self-shadowing: crests catch the low sun, gullies sit in shade.
        col.multiplyScalar(0.66 + g * 0.52 + (d2 - 0.5) * 0.16);

        // Aerial perspective. Two terms: distance from the circuit (which is
        // just the ring radius) and altitude above the valley floor — haze
        // pools low, and washing out the foot is also what dissolves the join
        // with the terrain.
        // NOTE these stack on top of scene.fog, which already washes 18-45%
        // at these radii — the two together flattened the whole horizon to one
        // grey lump, so both terms are deliberately gentle.
        const dh = smoothstep(500, 2900, r) * 0.13;
        const vh = (1 - smoothstep(-30, 240, y)) * 0.24;
        col.lerp(haze, Math.min(0.94, B.haze + dh + vh));

        colors.push(col.r, col.g, col.b);
      }
    }

    // ---- Indices ----
    // Winding: the visible face points INWARD, toward the circuit. Walking
    // (i -> i+1) is counter-clockwise in xz and (j -> j+1) descends while the
    // radius shrinks, so the quad must be emitted (a, c, b) / (b, c, d) — the
    // other order faces the empty outside of the ring and the whole horizon
    // vanishes to backface culling.
    for (let j = 0; j < NR - 1; j++) {
      for (let i = 0; i < NA; i++) {
        const i2 = (i + 1) % NA;
        const p = base + j * NA;
        const a0 = p + i, b0 = p + i2, c0 = p + NA + i, d0 = p + NA + i2;
        indices.push(a0, c0, b0, b0, c0, d0);
      }
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.setIndex(new THREE.Uint32BufferAttribute(indices, 1));
  geo.computeVertexNormals();
  geo.computeBoundingSphere();

  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 1.0,
    metalness: 0,
    // Enough sky fill that the half of the ring facing away from the 11 deg
    // sun reads as hazy rock rather than a charcoal cut-out.
    envMapIntensity: 0.55,
    fog: true,
  });

  const mesh = new THREE.Mesh(geo, mat);
  mesh.name = 'mountains';
  // Never a shadow caster or receiver: the shadow camera does not reach these
  // radii, and asking for it only costs a second pass over 30 k triangles.
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  scene.add(mesh);
  return mesh;
}
