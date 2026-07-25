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
 *
 * Every circuit is hand-authored, and (owner direction, 2026-07-24) each
 * road circuit is modelled on a real F1 venue — the corner sequences below
 * name their inspirations. The one deliberate exception: SUNSET SPEEDWAY is
 * a literal perfect oval (owner-requested); its points lie on an exact
 * stadium (two straights + two semicircles) — keep it geometric, don't
 * "hand-wobble" it. Don't reintroduce procedural layout generators.
 * Verify new layouts with scripts/track-geometry.mjs: min corner radius
 * ≥ ~18 m (chicanes may pinch tighter), and non-adjacent road sections at
 * least 2 × (roadWidth/2 + runoff + 0.5) apart so barriers never overlap.
 */

export const TRACKS = [
  // -------------------------------------------------------------------------
  // Interlagos-inspired: anticlockwise, the Senna-S left-right into a long
  // left carousel, a back straight, a lake-side double-left, a twisty
  // infield, and the climbing sweep back onto the pit straight.
  // -------------------------------------------------------------------------
  {
    id: 'gp',
    name: 'AUTODROMO',
    subtitle: 'GRAND PRIX CIRCUIT',
    difficulty: 'MEDIUM',
    blurb: 'Interlagos in miniature: the Senna S, a long back straight, a twisty infield climb.',
    roadWidth: 14,
    kerbWidth: 2.0,
    runoffWidth: 5.5,
    closed: true,
    tension: 0.5,
    controlPoints: [
      [0, 0], [0, 100], [0, 160],           // pit straight, heading north
      [-14, 204], [-48, 214],               // T1/T2 — the Senna S: hard left...
      [-90, 206],                           // ...flick right at the bottom
      [-146, 186], [-184, 146], [-196, 98], // Curva do Sol — long left carousel
      [-198, 20], [-196, -64],              // Reta Oposta — back straight south
      [-186, -108], [-156, -130], [-116, -134], // Descida do Lago double-left
      [-76, -128],                          // short run east
      [-48, -130], [-28, -156], [-34, -190], [-62, -206], // Ferradura — right horseshoe
      [-88, -224], [-96, -252],             // Mergulho — left, dropping south
      [-80, -276], [-48, -282],             // Juncao — left onto the bottom run
      [-10, -272],                          // flat-out east
      [8, -248], [14, -206],                // the climb turns up the east edge
      [6, -150], [2, -100], [0, -44],       // Subida dos Boxes — onto the straight
    ],
    theme: {
      ground: 'grass',
      fog: [0xc8bba6, 900, 4200],
      barrier: 'armco',
      kerbs: true, gravel: true, skid: true,
      pit: true, catchFence: true, grandstands: true, sponsors: true,
      tireStacks: true, brakeMarkers: true,
      trees: { type: 'broadleaf', count: 700, band: [26, 430] },
      mountains: 'far',
      marshals: true,
      clouds: true,
    },
  },

  // -------------------------------------------------------------------------
  // EASY — a literal perfect oval (owner-requested): an exact stadium shape,
  // two 260 m straights joined by two 115 m-radius semicircles, raced
  // anticlockwise like a speedway. The points below lie ON that geometry
  // (30-degree arc steps) — do not hand-wobble them.
  // -------------------------------------------------------------------------
  {
    id: 'sprint',
    name: 'SUNSET SPEEDWAY',
    subtitle: 'SPEEDWAY OVAL',
    difficulty: 'EASY',
    blurb: 'A perfect oval: two long straights, two sweeping 115 m turns, flat-out forever.',
    roadWidth: 20,
    kerbWidth: 2.2,
    runoffWidth: 9,
    closed: true,
    tension: 0.5,
    controlPoints: [
      // front stretch, heading north
      [0, 0], [0, 70], [0, 100], [0, 130],
      // turn 1/2 — exact semicircle, centre [-115, 130], R 115, 15° steps
      [-3.9, 159.8], [-15.4, 187.5], [-33.7, 211.3], [-57.5, 229.6],
      [-85.2, 241.1], [-115, 245], [-144.8, 241.1], [-172.5, 229.6],
      [-196.3, 211.3], [-214.6, 187.5], [-226.1, 159.8], [-230, 130],
      // back stretch, heading south
      [-230, 100], [-230, 40], [-230, -40], [-230, -100], [-230, -130],
      // turn 3/4 — exact semicircle, centre [-115, -130]
      [-226.1, -159.8], [-214.6, -187.5], [-196.3, -211.3], [-172.5, -229.6],
      [-144.8, -241.1], [-115, -245], [-85.2, -241.1], [-57.5, -229.6],
      [-33.7, -211.3], [-15.4, -187.5], [-3.9, -159.8], [0, -130],
      // onto the front stretch
      [0, -100], [0, -70],
    ],
    theme: {
      ground: 'grass',
      fog: [0xc8bba6, 1000, 4400],
      barrier: 'armco',
      kerbs: true, gravel: false, skid: true,
      pit: true, catchFence: false, grandstands: true, sponsors: true,
      tireStacks: false, brakeMarkers: false,
      trees: { type: 'broadleaf', count: 520, band: [30, 440] },
      mountains: 'hills',
      farmland: true,
      marshals: true,
      clouds: true,
    },
  },

  // -------------------------------------------------------------------------
  // Marina Bay-inspired street circuit (mirrored): the T1-2-3 flick complex,
  // a boulevard straight, right-angle blocks stepping out to the water, a
  // long waterfront run, and the Singapore-Sling-style chicane on the way
  // home. Walls at the kerb the whole lap.
  // -------------------------------------------------------------------------
  {
    id: 'downtown',
    name: 'MARINA STREET',
    subtitle: 'CITY GRAND PRIX',
    difficulty: 'HARD',
    blurb: 'Marina Bay by night-race rules: a snap T1 complex, right-angle blocks, a waterfront run.',
    roadWidth: 12,
    kerbWidth: 1.1,
    runoffWidth: 1.3,
    closed: true,
    tension: 0.5,
    controlPoints: [
      [0, 0], [0, 90], [0, 150],      // pit straight, heading north
      [18, 194], [52, 206],           // T1 — right, opening the lap
      [88, 216], [118, 202],          // T2/T3 — left-right flick complex
      [156, 200], [216, 200],         // boulevard straight east
      [252, 188], [262, 152],         // T7 — 90 right, heading south
      [262, 110],                     // short block
      [278, 92], [306, 88],           // T8 — 90 left, stepping out to the water
      [326, 74], [330, 40],           // T9 — 90 right onto the waterfront
      [330, -40], [330, -110],        // waterfront straight along the marina
      [318, -152], [284, -166],       // T14 — 90 right off the water
      [220, -166], [150, -166],       // esplanade street west
      [112, -150], [80, -160],        // Sling-style chicane — lane jumps inland
      [40, -160],                     // short squirt west
      [8, -150], [-2, -116],          // T19 — right, sweeping up...
      [0, -60],                       // ...onto the pit straight
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
      sidewalks: true, streetlights: true, crosswalks: true,
      skyline: true,           // hazed towers behind the raced blocks
      marina: true,            // harbour on the open side of the sea-front run
      mountains: false,
      clouds: true,
    },
  },

  // -------------------------------------------------------------------------
  // Spa-inspired mountain pass: the Eau Rouge/Raidillon uphill flick into a
  // long Kemmel climb, Les Combes, the Pouhon double-left plunge, a Fagnes
  // chicane, Stavelot, and the La Source hairpin just before the line.
  // -------------------------------------------------------------------------
  {
    id: 'alpine',
    name: 'COL DU PIN',
    subtitle: 'MOUNTAIN PASS',
    difficulty: 'MEDIUM-HARD',
    blurb: 'Spa through the pines: an Eau Rouge flick, a long climb, Pouhon, one hairpin at home.',
    roadWidth: 13,
    kerbWidth: 1.6,
    runoffWidth: 3.0,
    closed: true,
    tension: 0.5,
    controlPoints: [
      [0, 0], [90, 0],                  // valley straight, heading east
      [148, -8], [192, 10], [218, 48],  // Eau Rouge/Raidillon — dip, flick, climb
      [232, 120],                       // Kemmel straight up the shoulder
      [224, 190], [192, 204], [162, 190], // Les Combes — right-left at the top
      [120, 178], [60, 184], [0, 176],  // ridge road west, rolling kinks
      [-62, 182],                       // last ridge crest
      [-104, 162], [-124, 128], [-118, 92], // Pouhon — long double-left plunge
      [-120, 44],                       // descending the west face
      [-132, 12], [-124, -14],          // Fagnes — soft left-right on the descent
      [-126, -40], [-112, -58], [-88, -52], // La Source — the one hairpin
      [-74, -24], [-64, -4],            // the climb crests...
      [-44, 4], [-20, 0],               // ...and settles onto the valley straight
    ],
    theme: {
      ground: 'alpine',
      fog: [0xccd6dd, 680, 3400],
      barrier: 'guardrail',
      kerbs: true, gravel: false, skid: true,
      pit: false, catchFence: false, grandstands: false, sponsors: false,
      tireStacks: false, brakeMarkers: true,
      trees: { type: 'pine', count: 900, nearMin: 22, band: [22, 360] },
      mountains: 'near',
      huts: true,
      clouds: true,
    },
  },

  // -------------------------------------------------------------------------
  // Bahrain-inspired desert circuit (clockwise): a long drag into the heavy
  // T1 right, a jink behind it, the T5-6-7 esses, a low-road left-right
  // complex, and the long climb up the west side back to the top.
  // -------------------------------------------------------------------------
  {
    id: 'dunes',
    name: 'RED MESA',
    subtitle: 'CANYON SPEEDWAY',
    difficulty: 'MEDIUM',
    blurb: 'Sakhir in the canyon: a 280 m drag into a hard stop, snaking esses, sand off-line.',
    roadWidth: 16,
    kerbWidth: 2.0,
    runoffWidth: 6.5,
    closed: true,
    tension: 0.5,
    controlPoints: [
      [0, 0], [60, 0], [155, 0],        // main straight, heading east
      [206, -12], [228, -46],           // T1 — the heavy stop, hard right
      [234, -86],                       // T2 — left jog
      [224, -124], [202, -160], [164, -174], // T3/T4 — right, rounding south-west
      [124, -162], [84, -178], [44, -166],   // T5/6/7 — the esses, heading west
      [8, -178], [-8, -214],            // T8 — left, dropping to the low road
      [-48, -232], [-84, -222],         // T9/T10 — right, back heading west
      [-124, -212],                     // low road west
      [-158, -196], [-172, -156],       // T11 — long right, turning north
      [-174, -100], [-172, -48],        // west straight north
      [-158, -8], [-122, 6],            // T13 — right at the top
      [-86, 0], [-60, -3],              // T14/15 — settles onto the main straight
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
      scrub: true,             // dry brush + saguaros so the flats aren't bare
      clouds: true,
    },
  },

  // -------------------------------------------------------------------------
  // Monza-inspired temple of speed (clockwise): the Rettifilo chicane off a
  // very long pit straight, Curva Grande, the Roggia chicane, both Lesmos,
  // the Ascari complex, and a Parabolica sweeping home. Flat horizon, trees.
  // -------------------------------------------------------------------------
  {
    id: 'parco',
    name: 'PARCO VELOCE',
    subtitle: 'TEMPLE OF SPEED',
    difficulty: 'MEDIUM',
    blurb: 'Monza in the park: the Rettifilo, Curva Grande, both Lesmos, Ascari, Parabolica.',
    roadWidth: 13,
    kerbWidth: 2.0,
    runoffWidth: 5.0,
    closed: true,
    tension: 0.5,
    controlPoints: [
      [0, 0], [0, 110], [0, 180],       // pit straight north (tail runs from Parabolica)
      [10, 224], [34, 238],             // Rettifilo chicane — right-left...
      [42, 264],                        // ...rejoining the original line offset east
      [76, 294], [130, 310], [184, 296], [218, 258], // Curva Grande — long right
      [236, 224], [220, 196],           // della Roggia — left-right chicane
      [212, 158], [190, 136],           // Lesmo one — right
      [150, 112], [118, 94],            // Lesmo two — right, heading south-west
      [92, 64], [86, 18],               // Serraglio — gentle left, running south
      [100, -20], [76, -48], [84, -84], // Ascari — left-right-left complex
      [102, -118], [110, -150],         // short run to the last corner
      [94, -189], [55, -205], [16, -189], // Parabolica — one long right...
      [0, -150], [0, -90],              // ...sweeping onto the pit straight
    ],
    theme: {
      ground: 'grass',
      fog: [0xbfc7b2, 800, 4000],
      barrier: 'armco',
      kerbs: true, gravel: true, skid: true,
      pit: true, catchFence: true, grandstands: true, sponsors: true,
      tireStacks: false, brakeMarkers: true,
      trees: { type: 'broadleaf', count: 1300, band: [24, 400] },
      mountains: false,
      marshals: true,
      clouds: true,
    },
  },
];

export const DEFAULT_TRACK_ID = 'gp';

export function getTrackById(id) {
  return TRACKS.find((t) => t.id === id) || TRACKS[0];
}
