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

## Modes & driving aids

- **Time trial** — a single flying lap against the clock on an empty track.
- **Quick race** — you vs. three AI over 3 laps.
- **Two player** — split-screen, WASD vs. arrows.

Single-screen modes show the **perfect-line aid** (toggle with `L`): a ribbon
along the ideal racing line, recoloured live against your current speed —
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

The car is a ~480 hp GT racer simulated on top of a Cannon `RaycastVehicle`:

- **Engine & flywheel** — a real torque curve through a 6-speed automatic with
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
- **Brakes** — front-biased, ~1.4 g with aero (180 km/h stops in ~80 m).
- **Steering** — traction-limited and speed-sensitive with a rate-limited
  column, so turn-in has weight and full lock at speed means understeer, not
  a magic pivot.

The AI runs the same physics through a pre-computed lap speed profile
(corner speeds from curvature, anticipatory braking), pure-pursuit steering,
traffic awareness, and stuck-recovery.

## Sound

Everything you hear is synthesised live with the Web Audio API — there are no
samples to download. The engine note is the harmonic stack of a crankshaft
turning at the flywheel's real RPM, so it flares with wheelspin, collapses
through a shift cut and pops on the overrun; the throttle opens a filter the
way a throttle opens an exhaust. Each body shape has its own character (a
flat-plane V8 for the GT, a cross-plane burble for the muscle car, a V10 for
the open-wheeler). Tyres squeal from the physics' own per-wheel slide, the
surface under the car hisses (grass), crunches (gravel) or rumbles at the
rib rate (kerbs), wind builds with speed, and the chassis thumps on contact.
AI cars are positioned in 3D around the camera and Doppler-shifted as they
pass. `M` mutes; the choice is remembered.

## What's under the hood

- **Renderer**: adaptive resolution, ACES tone mapping, sRGB output and
  texel-snapped 1024/2048 shadow maps following the player.
- **Lighting**: a warm afternoon sky and PMREM environment reflections, cool
  fill light and per-circuit atmospheric fog.
- **Post-processing**: none in Performance; FXAA and output conversion in
  Balanced; optional half-resolution GTAO and restrained bloom in High.
- **Menu**: responsive circuit maps, a rendered GT showroom, clear race modes
  and saved graphics choices. No running 3D animation while choosing a race.
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
- **Cars**: procedurally lofted bodies (GT coupe, muscle, open-wheeler) with
  clear-coated paint, wheel-arch liners, smoked-lens light clusters and
  detailed alloy wheels — merged down to a handful of draw calls per car.

## Project layout

```
src/
  main.js       game loop, lap timing, per-wheel surface detection
  scene.js      renderer, sky, IBL, shadow-follow, post-processing
  car.js        visual + physics car: engine, gearbox, aero, tyres
  ai.js         lap speed profile, pure pursuit, traffic, recovery
  tracks.js     circuit catalogue: centrelines + per-circuit themes
  track.js      circuit geometry, groove, kerbs, gravel, themed scenery
  racingLine.js perfect-line aid: ideal line, speed profile, live colours
  physics.js    Cannon world & contact materials
  controls.js   keyboard input with smoothing
  camera.js     chase / hood / cinematic cameras
  hud.js        SVG tachometer + lap UI + pace pill + minimap
  audio.js      procedural engine / tyre / surface / wind / impact sound
  carModels/    procedural car bodies, wheels, materials
scripts/
  physics-test.mjs  deterministic driving-model assertions (23 checks)
  viewshot.mjs      deterministic drive + multi-angle screenshots
  trackshots.mjs    every circuit: chase / high / trackside / aerial / oblique
  track-geometry.mjs layout validator + SVG plots (svg2png.mjs rasterises them)
  realtrack.mjs     traces a real circuit centreline into game-scale control points
  smoke-car.mjs     car-builder geometry sanity
  audioprobe.mjs    renders the engine note offline and measures its pitch
```

Headless scripts resolve Chrome from `$CHROME_EXE`, the Puppeteer cache, or
the local Playwright install, and need `npm run dev` running first.

## Verification

`node scripts/graphics-test.mjs` checks render budgets, adaptation and tree
batch transforms. `scripts/browser-check.mjs` exercises all circuits, quality
presets, menu sizes, split-screen and restart memory in Chromium. Set
`BASELINE_URL` to another served revision to compare completed render time,
draw calls and triangles from an identical 1280×720 start-line camera. The
pass/fail budgets are absolute; the baseline comparison is logged for reference.
Timing uses software rendering in CI and is not a hardware FPS promise.

The **Verify game** pull-request workflow runs these checks, the driving-model
suite, car geometry checks and a production build. Screenshots and render
measurements are attached as a workflow artifact.
