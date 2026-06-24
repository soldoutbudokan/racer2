/**
 * Track catalogue. Each entry is pure data: a centreline (control points the
 * Catmull-Rom curve passes through), the road dimensions, and a `theme` that
 * tells track.js which scenery/material set to build. createTrack() consumes
 * one of these — see track.js.
 *
 * Coordinates are metres in the XZ plane (y is always 0; the car drives on a
 * flat physics plane, so "mountains" etc. are scenery, not real elevation).
 * controlPoints[0] is the start/finish; lay 2–3 collinear points around it so
 * the Catmull tangents settle onto a straight where the grid is painted.
 */

// ---- Layout helpers (kept tiny; complex circuits are hand-authored) ----

// A stadium / D-oval: two straights of half-length L up the x = ±R sides,
// joined by semicircular ends. Travel runs +z up the right side, so the start
// (first point) sits mid-right-straight heading +z — a dead-straight grid.
function stadium(R, L, capPts = 3) {
  const pts = [];
  // Start mid-right-straight so the grid lands on a dead-straight section.
  pts.push([R, 0], [R, L]);
  // top semicircle, east→west over the top (centre 0,L)
  for (let k = 1; k <= capPts; k++) {
    const a = (k / (capPts + 1)) * Math.PI;
    pts.push([Math.cos(a) * R, L + Math.sin(a) * R]);
  }
  // left straight, top→bottom (heading -z)
  pts.push([-R, L], [-R, 0], [-R, -L]);
  // bottom semicircle, west→east under the bottom (centre 0,-L)
  for (let k = 1; k <= capPts; k++) {
    const a = Math.PI + (k / (capPts + 1)) * Math.PI;
    pts.push([Math.cos(a) * R, -L + Math.sin(a) * R]);
  }
  // back up the right straight, stopping short of the start point
  pts.push([R, -L]);
  return pts;
}

// A smooth closed "flower" loop: radius modulated by sin(lobes·θ). Star-convex
// (r > 0 everywhere) so it never self-intersects. Rotated so the start lands on
// a low-curvature stretch, then the first few points are nudged collinear to
// give a short start straight.
function wavyLoop(baseR, amp, lobes, n, phase = 0, cx = 0, cz = 0) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const a = t * Math.PI * 2 + phase;
    const r = baseR + amp * Math.sin(lobes * a);
    pts.push([cx + Math.cos(a) * r, cz + Math.sin(a) * r]);
  }
  return pts;
}

// ---------------------------------------------------------------------------

export const TRACKS = [
  // -------------------------------------------------------------------------
  // The original showcase circuit — kept exactly as it was.
  // -------------------------------------------------------------------------
  {
    id: 'gp',
    name: 'AUTODROMO',
    subtitle: 'GRAND PRIX CIRCUIT',
    difficulty: 'MEDIUM',
    blurb: 'The full GT circuit: fast sweeps, heavy braking zones, gravel and grandstands.',
    roadWidth: 14,
    kerbWidth: 2.0,
    runoffWidth: 5.5,
    closed: true,
    tension: 0.5,
    controlPoints: [
      [0, 0], [0, 140], [10, 240], [90, 290], [200, 290], [280, 240],
      [300, 150], [240, 90], [180, 60], [200, -20], [280, -80], [300, -160],
      [240, -220], [120, -240], [0, -220], [-90, -180],
      [-160, -115], [-115, -85], [-50, -105], [0, -110], [0, -55],
    ],
    theme: {
      ground: 'grass',
      fog: [0xc8bba6, 900, 4200],
      barrier: 'armco',
      kerbs: true, gravel: true, skid: true,
      pit: true, catchFence: true, grandstands: true, sponsors: true,
      tireStacks: true, brakeMarkers: true,
      trees: { type: 'broadleaf', count: 600 },
      mountains: 'far',
      clouds: true,
    },
  },

  // -------------------------------------------------------------------------
  // EASY — a wide, fast, forgiving club oval. Two big sweepers, huge run-off,
  // no gravel to punish a wide line. Perfect first track.
  // -------------------------------------------------------------------------
  {
    id: 'sprint',
    name: 'SUNSET SPEEDWAY',
    subtitle: 'CLUB OVAL',
    difficulty: 'EASY',
    blurb: 'Wide open D-oval. Two gentle sweepers, acres of run-off — flat out and friendly.',
    roadWidth: 20,
    kerbWidth: 2.2,
    runoffWidth: 9,
    closed: true,
    tension: 0.5,
    controlPoints: stadium(135, 120, 3),
    theme: {
      ground: 'grass',
      fog: [0xc8bba6, 1000, 4400],
      barrier: 'armco',
      kerbs: true, gravel: false, skid: true,
      pit: true, catchFence: false, grandstands: true, sponsors: true,
      tireStacks: false, brakeMarkers: false,
      trees: { type: 'broadleaf', count: 420 },
      mountains: 'far',
      clouds: true,
    },
  },

  // -------------------------------------------------------------------------
  // CITY F1 — a tight street circuit: long pit straight, 90° corners, a flick
  // chicane, walls right at the kerb, skyscrapers and ad-boards all around.
  // -------------------------------------------------------------------------
  {
    id: 'downtown',
    name: 'MARINA STREET',
    subtitle: 'CITY GRAND PRIX',
    difficulty: 'HARD',
    blurb: 'A street fight between the barriers: square corners, a snap chicane, zero room for error.',
    roadWidth: 12,
    kerbWidth: 1.1,
    runoffWidth: 1.3,
    closed: true,
    tension: 0.5,
    controlPoints: [
      [0, 0], [0, 60], [0, 150],      // pit straight, heading +z
      [18, 184], [70, 198],           // Turn 1 — 90° right
      [170, 198], [202, 180],         // Turn 2 — 90° right, onto the back run
      [214, 130], [214, 44],
      [196, 10], [216, -24], [214, -54], // snap chicane (left-right)
      [214, -118], [196, -150],       // Turn 3 — 90° right
      [150, -166], [40, -166],        // bottom straight, heading -x
      [4, -150], [0, -108], [0, -60], // Turn 4 — sweeps back onto the pit straight
    ],
    theme: {
      ground: 'city',
      fog: [0xb7bcc4, 650, 3200],
      barrier: 'wall',
      kerbs: true, gravel: false, skid: true,
      pit: false, catchFence: false, grandstands: false, sponsors: true,
      tireStacks: true, brakeMarkers: true,
      trees: false,
      buildings: true,
      mountains: false,
      clouds: true,
    },
  },

  // -------------------------------------------------------------------------
  // MOUNTAINS — a flowing alpine ribbon ringed by tall, close peaks and dense
  // pine forest, with steel guardrail on the edges. No straights to speak of.
  // -------------------------------------------------------------------------
  {
    id: 'alpine',
    name: 'COL DU PIN',
    subtitle: 'MOUNTAIN PASS',
    difficulty: 'MEDIUM-HARD',
    blurb: 'A flowing pass through the pines: linked esses, blind crests of rock, guardrail close.',
    roadWidth: 13,
    kerbWidth: 1.6,
    runoffWidth: 3.0,
    closed: true,
    tension: 0.5,
    // tri-lobe flower → three big linked sweeps (min radius ≈ 44 m); the phase
    // is tuned so the start/finish lands on the gentlest stretch (≈200 m
    // radius), giving a clean grid without a dead-straight.
    controlPoints: wavyLoop(180, 48, 3, 22, 2.09),
    theme: {
      ground: 'alpine',
      fog: [0xccd6dd, 680, 3400],
      barrier: 'guardrail',
      kerbs: true, gravel: false, skid: true,
      pit: false, catchFence: false, grandstands: false, sponsors: false,
      tireStacks: false, brakeMarkers: true,
      trees: { type: 'pine', count: 900, nearMin: 22, band: [22, 360] },
      mountains: 'near',
      clouds: true,
    },
  },

  // -------------------------------------------------------------------------
  // DESERT (bonus) — a fast canyon speedway: three long straights, big
  // sweepers, sand traps, and red-rock mesas rising out of the dust.
  // -------------------------------------------------------------------------
  {
    id: 'dunes',
    name: 'RED MESA',
    subtitle: 'CANYON SPEEDWAY',
    difficulty: 'MEDIUM',
    blurb: 'Wide desert speedway: long flat-out straights, one sandy ess, mesas on the horizon.',
    roadWidth: 16,
    kerbWidth: 2.0,
    runoffWidth: 6.5,
    closed: true,
    tension: 0.5,
    controlPoints: [
      [0, -168], [70, -166], [120, -158],   // bottom straight, heading +x
      [165, -120], [180, -55],              // sweep up the right
      [168, 35], [128, 110],                // toward the top
      [60, 178], [-20, 196], [-95, 168],    // long top sweeper
      [-160, 110], [-176, 35],              // down the left
      [-150, -20], [-182, -70], [-150, -118], // sandy ess on the left
      [-120, -150], [-60, -168],            // back onto the bottom straight
    ],
    theme: {
      ground: 'sand',
      fog: [0xd9c49b, 850, 4400],
      barrier: 'armco',
      kerbs: true, gravel: true, skid: true,
      pit: false, catchFence: false, grandstands: false, sponsors: true,
      tireStacks: false, brakeMarkers: true,
      trees: false,
      mountains: 'mesa',
      rocks: true,
      clouds: true,
    },
  },
];

export const DEFAULT_TRACK_ID = 'gp';

export function getTrackById(id) {
  return TRACKS.find((t) => t.id === id) || TRACKS[0];
}
