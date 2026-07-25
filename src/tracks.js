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
 * Every circuit is hand-authored. Real circuits are asymmetric: straights of
 * unequal length, corner sequences that tighten or open, one signature
 * feature per track (a hairpin, a chicane, a carousel). Generated geometry
 * (ovals, sine-modulated loops) reads as a shape, not a place — don't add it
 * back. Verify new layouts with scratchpad geometry checks: min corner
 * radius ≥ ~30 m for open circuits (chicanes may pinch tighter), and
 * non-adjacent road sections at least 2 × (roadWidth/2 + runoff + 0.5)
 * apart so the barriers never overlap.
 */

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
      trees: { type: 'broadleaf', count: 700, band: [26, 430] },
      mountains: 'far',
      marshals: true,
      clouds: true,
    },
  },

  // -------------------------------------------------------------------------
  // EASY — a fast, flowing national circuit at golden hour. Wide road, huge
  // run-off, no gravel: every corner is a sweeper you can see all the way
  // through. One honest braking zone (the last double-apex) to learn on.
  // -------------------------------------------------------------------------
  {
    id: 'sprint',
    name: 'SUNSET SPEEDWAY',
    subtitle: 'NATIONAL CIRCUIT',
    difficulty: 'EASY',
    blurb: 'Fast and friendly: flowing sweepers, one easy ess, acres of run-off to learn on.',
    roadWidth: 20,
    kerbWidth: 2.2,
    runoffWidth: 9,
    closed: true,
    tension: 0.5,
    controlPoints: [
      [0, 0], [0, 110],           // front straight past the pits
      [26, 170], [86, 204],       // T1 — fast right sweeper
      [160, 212], [226, 186],     // T2 — gentle right kink
      [268, 128], [278, 58],      // T3 — long carousel right onto the east side
      [258, -8], [280, -72],      // T4/T5 — easy left-right ess
      [258, -148], [200, -192],   // T6 — wide right
      [120, -210],                // back run
      [46, -196], [8, -156],      // T7 — double-apex right, the one braking zone
      [0, -110],                  // settles onto the front straight
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
  // CITY F1 — a Baku-style street circuit: two long straights, unequal city
  // blocks, a flick chicane on the bottom street, walls right at the kerb.
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
      [0, 0], [0, 96], [0, 168],      // pit straight, heading +z (start at [0,0])
      [22, 204], [72, 216],           // T1 — 90° right
      [150, 216],                     // cross street
      [196, 200], [210, 152],         // T2 — 90° right, heading back south
      [210, 96],
      [224, 62], [268, 50],           // T3 — 90° left, short block east
      [304, 34], [316, -12],          // T4 — 90° right onto the sea-front run
      [316, -120],                    // long run south
      [302, -166], [258, -182],       // T5 — 90° right
      [160, -182], [118, -182],       // bottom straight, heading -x
      [78, -160], [42, -156],         // snap chicane — lane jumps toward the marina
      [8, -134], [0, -96],            // T6 — sweeps back onto the pit straight
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
  // MOUNTAINS — a proper pass road: a climbing sweep, esses along the ridge,
  // two genuine switchback hairpins and a carousel drop back to the valley.
  // Tall close peaks and dense pines; guardrail on the edges.
  // -------------------------------------------------------------------------
  {
    id: 'alpine',
    name: 'COL DU PIN',
    subtitle: 'MOUNTAIN PASS',
    difficulty: 'MEDIUM-HARD',
    blurb: 'A pass road through the pines: ridge-top esses, two switchback hairpins, a carousel drop.',
    roadWidth: 13,
    kerbWidth: 1.6,
    runoffWidth: 3.0,
    closed: true,
    tension: 0.5,
    controlPoints: [
      [0, -210], [90, -210],            // valley straight, heading +x
      [168, -198], [216, -158],         // T1 — left, the climb begins
      [240, -92],                       // east ramp heading north
      [218, -30], [246, 36],            // T2/T3 — flick left-right
      [226, 108], [164, 144],           // T4 — left onto the ridge
      [92, 138], [24, 158], [-48, 142], // ridge road, rolling kinks
      [-116, 166], [-182, 150],         // ridge esses
      [-240, 140], [-272, 104], [-252, 66], // T8 — switchback hairpin left
      [-188, 48], [-124, 34],           // shelf road heading back east
      [-66, 44], [-6, 20],              // gentle right-left flow
      [44, -8], [64, -52],              // T11 — right, turning down the face
      [44, -96], [-4, -110],            // T12 — switchback hairpin right
      [-92, -124], [-156, -112],        // lower shelf heading west
      [-224, -128], [-262, -166],       // T14 — carousel left begins
      [-244, -204], [-180, -214], [-90, -210], // sweeps down onto the valley straight
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
  // DESERT — a Sakhir-style speedway: one huge front straight into a heavy
  // braking left, a flick behind the dunes, a fast top ess and a long
  // west-side run. Sand traps at the big stops, mesas on the horizon.
  // -------------------------------------------------------------------------
  {
    id: 'dunes',
    name: 'RED MESA',
    subtitle: 'CANYON SPEEDWAY',
    difficulty: 'MEDIUM',
    blurb: 'Desert speedway: a 400 m drag into a heavy stop, fast esses, sand waiting off-line.',
    roadWidth: 16,
    kerbWidth: 2.0,
    runoffWidth: 6.5,
    closed: true,
    tension: 0.5,
    controlPoints: [
      [0, -200], [110, -200],           // front straight, heading +x
      [188, -192], [228, -166],         // T1 — heavy braking left, gravel outside
      [242, -126], [240, -88],          // rounds through and opens up
      [216, -32], [242, 30],            // T2/T3 — flick left-right
      [224, 96], [166, 134],            // T4 — left onto the top road
      [64, 142], [-22, 140],            // top straight
      [-88, 160], [-148, 124],          // T5/T6 — fast left-right ess
      [-206, 112], [-236, 68],          // T7 — left, carrying speed
      [-240, -10], [-238, -96],         // west straight, heading south
      [-232, -150], [-198, -184],       // T8 — sweeps through the last corner
      [-140, -198],                     // onto the front straight
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
  // PARKLAND — a temple of speed in a broadleaf forest: two chicanes chopped
  // into very long straights, a pair of medium rights, and one endless
  // parabolic sweeper home. Flat horizon, no mountains anywhere.
  // -------------------------------------------------------------------------
  {
    id: 'parco',
    name: 'PARCO VELOCE',
    subtitle: 'TEMPLE OF SPEED',
    difficulty: 'MEDIUM',
    blurb: 'Old-school parkland speed: two hard chicanes, twin right-handers, one endless sweeper.',
    roadWidth: 13,
    kerbWidth: 2.0,
    runoffWidth: 5.0,
    closed: true,
    tension: 0.5,
    controlPoints: [
      [-260, 0], [-260, 120],           // pit straight through the trees
      [-252, 178],
      [-228, 202],                      // T1 — chicane, hard right...
      [-208, 228], [-170, 240],         // ...flick left out
      [-100, 248], [-20, 230], [28, 192], // Curva Grande — one long right
      [56, 140],
      [50, 92], [76, 58],               // T4/T5 — fast right-left flick
      [104, 44], [122, 10],             // Lesmo-style right one
      [124, -34],
      [112, -82], [78, -116],           // right two, opening onto the back run
      [-8, -162], [-80, -196],          // long diagonal back straight
      [-96, -240],                      // T8/T9 — fast left flick...
      [-140, -262], [-176, -264],       // ...right out onto the bottom lane
      [-204, -262],                     // short kinked straight
      [-244, -244], [-262, -196],       // the parabolic sweeper begins
      [-264, -130], [-260, -40],        // and pulls flat-out onto the pit straight
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
