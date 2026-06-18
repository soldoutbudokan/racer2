# Racer2

A 3D racing game built with Three.js + Cannon-es, aiming for the most realistic
look and drive achievable in a browser without external asset downloads.
Inspired by the look of GT Racing 2: golden-hour light, rubbered-in racing
groove, kerbs and gravel traps, a pit complex and grandstands, glossy
clear-coated bodywork.

**Play it:** <https://soldoutbudokan.github.io/racer2/>

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (defaults to <http://localhost:5173>).

## Controls

| Key                     | Action            |
| ----------------------- | ----------------- |
| `W` / `↑`               | Throttle          |
| `S` / `↓`               | Brake / reverse   |
| `A` `D` / `←` `→`       | Steer             |
| `Space`                 | Handbrake         |
| `C`                     | Cycle camera      |
| `L`                     | Racing-line aid   |
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

## What's under the hood

- **Renderer**: WebGL2, ACES Filmic tone mapping, sRGB output, PCF soft
  shadows from a texel-snapped 4096 shadow map that follows the player.
- **Lighting**: Three.js `Sky` (golden hour) feeding a PMREM environment map
  for image-based lighting + reflections; warm distance fog.
- **Post-processing**: restrained `UnrealBloomPass`, cinematic shader
  (chromatic aberration + vignette + grain), `SMAAPass`, `OutputPass`.
- **Track**: Catmull-Rom circuit with a vertex-coloured racing groove that
  weaves with the racing line, 3D profiled rumble kerbs, dirt verges, skid
  marks, gravel traps wired into the physics, armco with posts, debris
  fencing, a 12-bay pit complex, tiered grandstands with an instanced crowd,
  a lattice start gantry with light rig, brake markers, sponsor boards, tyre
  stacks, instanced trees, mountains and clouds.
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
  track.js      circuit geometry, groove, kerbs, gravel, scenery
  racingLine.js perfect-line aid: ideal line, speed profile, live colours
  physics.js    Cannon world & contact materials
  controls.js   keyboard input with smoothing
  camera.js     chase / hood / cinematic cameras
  hud.js        SVG tachometer + lap UI + pace pill + minimap
  carModels/    procedural car bodies, wheels, materials
scripts/
  physics-test.mjs  deterministic driving-model assertions (23 checks)
  viewshot.mjs      deterministic drive + multi-angle screenshots
  smoke-car.mjs     car-builder geometry sanity
```

Headless scripts resolve Chrome from `$CHROME_EXE`, the Puppeteer cache, or
the local Playwright install, and need `npm run dev` running first.
