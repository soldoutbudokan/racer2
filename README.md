# Racer2

A 3D racing game built with Three.js + Cannon-es, aiming for the most realistic
look and drive achievable in a browser without external asset downloads.
Inspired by the look of GT Racing 2: warm afternoon light, rubbered-in racing
groove, kerbs and gravel traps, a pit complex and grandstands, glossy
clear-coated bodywork.

Pick from **six circuits** — five of them the real layouts of F1 venues
(Interlagos, Marina Bay, Spa-Francorchamps, Sakhir and Monza) brought down to a
scale the GT car laps in about 70-80 s, plus a near-circular speedway oval —
then choose a mode. Each circuit has its own layout, surfaces and scenery.

**Play it:** <https://soldoutbudokan.github.io/racer2/>

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (defaults to <http://localhost:5173>).

## Graphics

**Auto** is the default. It starts with Balanced detail, then lowers rendering
quality after sustained slow frames. Performance, Balanced and High can also
be selected in the menu; the choice is remembered. All modes retain the same
cars, track layouts, collision surfaces and driving physics.

Performance skips post-processing and caps the scene at 0.92 million pixels;
it and split-screen rely on the canvas's hardware MSAA for edges.
Balanced adds FXAA and caps at 1.44 million; High adds half-resolution ambient
occlusion and subtle bloom, with a 2.07 million pixel budget. Shadow maps are
1024 pixels (Performance/Balanced) or 2048 (High). These are physical-pixel
budgets, including on Retina and 4K displays.

Forests are split into spatial batches with distance-based detail, reflective
car glass avoids the extra full-scene refraction render, and static menu
previews render only when needed. Race restarts release their geometry and
keyboard listeners. Hidden tabs stop advancing the simulation.

## Controls

| Key                     | Action            |
| ----------------------- | ----------------- |
| `W` / `↑`               | Throttle          |
| `S` / `↓`               | Brake / reverse   |
| `A` `D` / `←` `→`       | Steer             |
| `Space`                 | Handbrake         |
| `C`                     | Cycle camera      |
| `L`                     | Racing-line aid   |
| `M`                     | Sound on / off    |
| `R`                     | Reset to start    |
| `B`                     | Back to track     |
| `F`                     | Full screen       |
| `P`                     | Pause / resume    |
| `Esc`                   | Main menu         |

`P` holds the whole race: physics, rivals, start lights and the lap clock all
wait, and the sound goes quiet. The time spent paused is not counted against
the lap.

## Modes & driving aids

Choose from **six cars**, each with its own body, colour, sound and driving
setup. The showroom compares acceleration, top speed, handling and braking,
and explains both the strength and the cost of each choice. Your selection is
remembered and used in time trials, races, restarts and Player 1 in split screen.
Player 2 uses the rally hatch. Saved choices still work: the ids are stable, so
an old "gt" or "hatch" preference selects the GT3 Coupe or the Rally Hatch.

| Car | Package | Best at | Trade-off |
| --- | --- | --- | --- |
| **GT3 Coupe** | 555 hp V8, 1,300 kg, slicks, real wing, 2.75 m wheelbase | Dependable everywhere; strong brakes and downforce | Neither the best launch nor the highest top speed |
| **Rally Hatch** | 365 hp turbo four, four-wheel drive, 1,230 kg, 2.5 m wheelbase, gravel tyres | The best launch in the field, darts into corners, barely slowed by grass | 230 km/h ceiling, small brakes, pushes when hurried |
| **Formula** | 520 hp V10 to 11,500 rpm, 800 kg, the most wing | Corner speeds and braking nothing else can touch | A brick through the air; helpless off the asphalt |
| **Classic V8** | 7-litre big block, 1,600 kg, four long gears, 2.95 m wheelbase | Monstrous mid-range, second-highest top speed | Slow steering, little grip, the tail steps out under power |
| **Speedster** | 265 hp flat four, 820 kg, no roof, 2.4 m wheelbase | The quickest steering and the most mechanical grip in slow corners | No wing and no power to spare on straights |
| **Hypercar** | 780 hp twin-turbo V12, 1,480 kg, seven-speed, slipperiest body | Past 250 km/h it is alone | Wheelspin in the low gears; mass tells on brakes and direction changes |

The six are original designs and game-balanced setups, not manufacturer
replicas. They were redrawn from the ground up on 2026-10-18: the previous
touring sedan, rally pickup, club roadster and classic V8 bodies are gone, and
the packages now differ in wheelbase, track, centre-of-mass height, drive
layout and grip balance as well as power, weight, aero, tyres and brakes.
`node scripts/car-balance-test.mjs` prints the measured differences.

- **Time trial** — a single flying lap against the clock on an empty track.
- **Quick race** — you vs. three AI over 3 laps. Each new race and finish-screen
  restart draws three different opponent cars from the other five models, each
  in its garage color. The
  starting grid is shuffled independently, giving you an equal chance of P1,
  P2, P3 or P4. Pressing R resets the current field and reshuffles its positions.
- **Two player** — split-screen, WASD vs. arrows.

Single-screen modes show the **perfect-line aid** (toggle with `L`): painted
chevrons along the ideal racing line, drawn only ahead of your car and
recoloured live against your current speed —
red where the ideal lap is slower than you're going (brake!), white where
you're on pace, green where it carries more speed than you have (push on).
The HUD pill shows the ideal speed for where you are plus a verdict
(`TOO FAST` / `ON PACE` / `COULD GO FASTER`). The ideal-speed profile uses
the same physics planning as the AI — corner speeds from line curvature,
anticipatory braking — plus an acceleration-reachability pass so it never
demands speed the car can't actually build.

## Circuits

Choose a circuit from the menu before picking a mode. Switching circuits rebuilds
the track, scenery and minimap on the fly.

| Circuit | Layout | Difficulty | Notes |
| ------- | ------ | ---------- | ----- |
| **Autodromo** | Interlagos, 2.7 km | Medium | The Senna S, Curva do Sol, the back straight, the twisting infield climb; grandstands, gravel traps, a pit complex. |
| **Sunset Speedway** | Oval, 1.5 km | Easy | A near-circular stadium oval — two 200 m turns, two short chutes — in a patchwork of farmland. |
| **Marina Street** | Marina Bay, 2.6 km | Hard | 23 corners of street circuit: the T1-2-3 flick, the Sling, the hairpin, walls at the kerb, a city of blocks and towers around it. |
| **Col du Pin** | Spa-Francorchamps, 2.9 km | Medium-Hard | La Source, Eau Rouge, Kemmel, Pouhon, Blanchimont and the Bus Stop, through dense pine forest under near peaks. |
| **Red Mesa** | Sakhir, 2.7 km | Medium | The T1 hard stop, the esses, the double-left and long straights, among mesas, buttes and hoodoos. |
| **Parco Veloce** | Monza, 2.9 km | Medium | The Rettifilo, Curva Grande, both Lesmos, Ascari and the Parabolica, in a park of dense woodland. |

Each circuit is pure data in `src/tracks.js` — a centreline plus a `theme` that
selects the surface, barrier style and scenery — so new tracks are easy to add.
The five road circuits were traced from the real centrelines (scaled, with any
corner tighter than 20 m opened out for the car's steering lock, and sections
eased apart where barriers would otherwise overlap); `scripts/track-geometry.mjs`
validates a layout's corner radii, section gaps and start straight.

## Driving model

Each car uses a Cannon `RaycastVehicle` with its own immutable specification in
`src/carSpecs.js`. The GT3 is the reference setup; the other five change
weight, wheelbase, track, centre-of-mass height, drive layout, torque, gearing,
drag, downforce, tyre grip, grip balance, yaw inertia, steering response and
brakes:

- **Engine & flywheel** — a real torque curve through an automatic gearbox
  (four speeds in the V8, seven in the formula car and the hypercar) with
  shift cuts, engine braking and reverse. The engine has rotating inertia, so
  RPM is a genuine state, not a readout of road speed: when the driven tyres
  can't put all the torque down the surplus spins them up and the tach flares —
  wheelspin — and when grip is in hand the wheels just roll and RPM tracks the
  road. The tachometer shows that real flywheel speed.
- **Aerodynamics** — quadratic drag (top speed is drag-limited around
  285 km/h) plus downforce that loads the tyres at speed.
- **Tyres** — finite grip (μ ≈ 1.45 on the racing surface) with a true
  combined-slip friction circle: cornering at the limit leaves nothing for
  throttle, hard cornering scrubs off speed, and the handbrake breaks the
  rears loose. Grip is **load-sensitive** — a tyre carrying more than its
  share makes less grip per newton — so weight transfer matters: braking dives
  onto (and works) the fronts, power squats and hooks up the rears, and an
  overloaded outside tyre gives up grip mid-corner. Once a driven tyre is
  spinning, grip eases toward a kinetic floor, so lighting up the rears out of
  a slow corner actually costs you drive.
- **Surfaces** — per-wheel detection of road / kerb / grass / gravel. Grass
  is slippery and draggy; the gravel traps at the heavy corners will genuinely
  ruin your lap.
- **Brakes** — front-biased, ~1.5 g with aero in the GT3 (100 km/h stops in
  ~24 m; the formula car in 16, the rally hatch in 30). Rear shares are sized
  to what the rear axle still carries under full dive, so a stamped pedal
  understeers rather than spins.
- **Weight transfer** — each car's centre of mass sits at its own height over
  the same wheels (`cgHeight`, 0.40 m in the formula car to 0.58 m in the V8),
  which sets how hard it dives, squats and rolls onto its outside tyre.
- **Drive layout and balance** — the rally hatch sends 40 % of its torque to
  the front axle and gets four tyres' worth of traction out of a hairpin; the
  V8's rears hold 6 % less than its fronts, so it oversteers on power.
- **Steering** — traction-limited and speed-sensitive with a rate-limited
  column, so turn-in has weight and full lock at speed means understeer, not
  a magic pivot.

The AI runs the same per-car physics through a pre-computed lap speed profile
(corner speeds from curvature and the selected car’s grip/aero, anticipatory
braking from its brakes inside a friction circle, so a braking zone that would
fall inside a bend is pushed back before it), pure-pursuit steering and
stuck-recovery. Its pedal starts at the planned deceleration for its own
brakes and tapers as the corner takes the tyre. In traffic a driver picks a clear lane past a slower car,
checks it for cars alongside or closing from behind, and holds it until it is
clear ahead. Gaps are measured along the track, so a car just over the start
line is not mistaken for one a lap behind. The driver brakes for the path it
is about to take, not only the centreline, and waits behind stopped traffic
on the handbrake: the automatic gearbox reads the brake at a standstill as a
request for reverse.

## Sound

Everything you hear is synthesised live with the Web Audio API — there are no
samples to download. The engine note is the harmonic stack of a crankshaft
turning at the flywheel's real RPM, so it flares with wheelspin, collapses
through a shift cut and pops on the overrun; the throttle opens a filter the
way a throttle opens an exhaust. Each body shape has its own character (a
flat-plane V8 for the GT3, a turbo four for the rally hatch, a cross-plane
burble for the classic V8, a V10 for the formula car, a flat four for the
speedster and a smooth V12 for the hypercar), and the HUD's rev band is
drawn for the car on the grid. Tyres squeal from
the physics' own per-wheel slide, the
surface under the car hisses (grass), crunches (gravel) or rumbles at the
rib rate (kerbs), wind builds with speed, and the chassis thumps on contact.
AI cars are positioned in 3D around the camera and Doppler-shifted as they
pass. `M` mutes; the choice is remembered.

## What's under the hood

- **Renderer**: adaptive resolution, ACES tone mapping with a light colour
  grade folded into it (so every quality preset gets it for free), sRGB
  output and texel-snapped 1024/2048 shadow maps following the player.
- **Lighting**: a clear afternoon sky dome whose horizon is each circuit's
  haze colour, PMREM environment reflections with a ground horizon for the
  car paint to pick up, cool fill light and per-circuit atmospheric fog.
- **Post-processing**: none in Performance; FXAA and output conversion in
  Balanced; optional half-resolution GTAO and restrained bloom in High.
- **Menu**: graphite panels with warm orange accents, responsive circuit maps
  with location labels, start markers and difficulty ratings, clear race modes
  and saved graphics choices. The selected car is framed in a studio with
  softbox reflections and subtle turntable markings; the preview keeps correct
  proportions at every screen size. No running 3D animation while choosing a race.
- **HUD**: segmented tachometer with a shift light, timing bar, live race
  order, start lights mirroring the gantry, pace readout, a sharp minimap
  with a heading arrow, and a results card with the full classification.
- **Tracks**: Catmull-Rom circuits with a vertex-coloured racing groove that
  weaves with the racing line, 3D profiled rumble kerbs, dirt verges, skid
  marks, gravel traps wired into the physics, armco with posts, debris
  fencing, a 12-bay pit complex, tiered grandstands with an instanced crowd,
  a lattice start gantry with light rig, brake markers, sponsor boards, tyre
  stacks, instanced forests (thousands of trees in stands, three LOD tiers),
  rolling terrain, mountains and clouds — plus per-theme scenery: a city of
  street-grid blocks, lit towers and concrete walls, alpine pine forests under
  near peaks, farmland patchwork, and desert sand with stratified mesas, buttes
  and hoodoos. Each circuit is a data
  definition; everything is parented to a disposable group so switching
  circuits tears down and rebuilds cleanly.
- **Cars**: six procedural bodies with distinct silhouettes: a wide-body GT3
  coupe with a swan-neck wing and door roundels, a rally hatch with box arches,
  a four-lamp pod, mud flaps and a tailgate wing on a raised stance, a formula
  single-seater, a long-bonnet V8 fastback with quad lamps, side pipes and
  stripes, a roofless speedster with deck humps and a wraparound screen, and a
  mid-engine hypercar. The road cars are lofted on `carModels/loftBuilder.js`,
  which gives them a real shoulder ledge under the glass, convex side glass,
  leaning A- and C-pillars (raked pane edges), bonnets and decks that curl down
  into their fascias (asymmetric bumper rolls) and lamps cut into the fenders.
  Each has clear-coated paint, cut-out wheel arches on its own wheelbase and
  track, and its own wheels: centre-lock slicks, six-spoke gravel wheels, deep
  five-spokes, a fine mesh. Detailed tyres and alloy wheels are shared
  efficiently, with body details merged into material batches per car.
- **Frame pacing**: the simulation steps at a fixed 120 Hz; every car is drawn
  interpolated between its last two steps, and the chase camera and shadow
  frustum follow that drawn pose, so a 60, 120 or 144 Hz display all see
  continuous motion instead of a car that lurches against the camera.
- **City**: chamfered office towers, terraced apartments and masonry blocks,
  recessed shops and arcades, planted squares and sidewalks, plus a harbour
  of moored yachts, finger docks and a palm promenade.
- **Circuit identity**: race-control buildings, a speedway timing tower,
  a historic park pavilion, timber alpine lodges and desert shade structures.
  Forest coverage follows the entire circuit, including the ends of the
  Alpine and Parco layouts. Brake boards face approaching drivers; grid,
  finish-line and crossing paint follow the road crown.

## Project layout

```
src/
  main.js       game loop, lap timing, race state
  surfaces.js   per-wheel road / kerb / grass / gravel detection
  scene.js      renderer, colour grade, IBL, shadow-follow, post-processing
  sky.js        sky dome: gradient, sun glow, per-circuit horizon
  garage.js     menu showroom render
  car.js        visual + physics car: engine, gearbox, aero, tyres, render interpolation
  ai.js         lap speed profile, pure pursuit, traffic, recovery
  tracks.js     circuit catalogue: centrelines + per-circuit themes
  track.js      circuit geometry, groove, kerbs, gravel, themed scenery
  racingLine.js perfect-line aid: ideal line, speed profile, live colours
  physics.js    Cannon world & contact materials
  controls.js   keyboard input with smoothing
  camera.js     chase / hood / cinematic cameras
  hud.js        tachometer, timing, race order, start lights, pace, minimap
  audio.js      procedural engine / tyre / surface / wind / impact sound
  carModels/    procedural car bodies (loft, bumper rolls, lamp apertures), wheels, materials
scripts/
  physics-test.mjs  deterministic driving-model assertions (23 checks)
  ai-test.mjs       AI laps on every circuit plus traffic scenarios, in Node
  viewshot.mjs      deterministic drive + multi-angle screenshots
  trackshots.mjs    every circuit: chase / high / trackside / aerial / oblique
  uishots.mjs       menu, HUD, cameras, split screen and results screen
  track-geometry.mjs layout validator + SVG plots (svg2png.mjs rasterises them)
  realtrack.mjs     traces a real circuit centreline into game-scale control points
  smoke-car.mjs     car-builder geometry sanity
  audioprobe.mjs    renders the engine note offline and measures its pitch
```

Headless scripts resolve Chrome from `$CHROME_EXE`, the Puppeteer cache, or
the local Playwright install, and need `npm run dev` running first.

## Verification

`node scripts/world-audit.mjs` builds all six worlds and checks road winding,
finite geometry, scenery clearance, resource budgets and complete disposal.
The visual CI job captures every circuit before and after the change, plus
all six car bodies from matching cameras. See `docs/VISUAL_AUDIT.md` for
the per-circuit findings and remaining limitations.

`node scripts/graphics-test.mjs` checks render budgets, adaptation and tree
batch transforms. `scripts/browser-check.mjs` exercises all circuits, quality
presets, menu sizes, split-screen and restart memory in Chromium. Set
`BASELINE_URL` to another served revision to compare completed render time,
draw calls and triangles from an identical 1280×720 start-line camera. The
pass/fail budgets are absolute; the baseline comparison is logged for reference.
Timing uses software rendering in CI and is not a hardware FPS promise.

`node scripts/car-selection-test.mjs` checks car previews, saved choices,
keyboard selection, all race modes and restarts in Chromium. Use `--unit`
to check choice validation and storage fallbacks without a browser.
`node scripts/race-roster-test.mjs` exhaustively checks equally likely rival
lineups, distinct opponent models and independence from the starting grid.
`node scripts/car-shapes.mjs` renders all registered cars in identical paint
from the side, front and rear so shape differences can be reviewed directly.

`node scripts/ai-test.mjs` laps every circuit and runs the passing, queueing
and four-car scenarios through the real car, tracks, surfaces and barriers in
Node. Nothing is rendered; only canvas drawing is stubbed. Pass a circuit ID
to run one, for example `node scripts/ai-test.mjs gp`.

The **Verify game** pull-request workflow runs these checks, the driving-model
suite, the AI traffic suite, car geometry checks and a production build.
Screenshots and render measurements are attached as a workflow artifact.

## Car balance checks

Run `node scripts/car-balance-test.mjs` (or add `--all-tracks` to cover every
circuit) to measure the actual simulation on
a flat road: 0–100 km/h, 80–160 km/h, terminal speed, 100–0 km/h stopping
distance, turn-in response, fast-corner grip and rough-surface recovery. The
suite checks meaningful differences and rejects a car that beats another in
every measured discipline. It also exercises each setup on a full circuit and
checks that the driving aid changes its recommendations with the selected car.
The comparison ratings describe relative strengths within this field; they are
not manufacturer performance claims.
