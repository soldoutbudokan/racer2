# Racer2

A 3D racing game built with Three.js + Cannon-es, aiming for the most realistic
look and drive achievable in a browser without external asset downloads.
Inspired by the look of GT Racing 2: golden-hour light, rubbered-in racing
groove, kerbs and gravel traps, a pit complex and grandstands, glossy
clear-coated bodywork.

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
| `R`                     | Reset to start    |
| `B`                     | Back to track     |

## Driving model

The car is a ~480 hp GT racer simulated on top of a Cannon `RaycastVehicle`:

- **Engine & gearbox** — a real torque curve through a 6-speed automatic with
  shift cuts, engine braking and reverse. The tachometer shows actual RPM.
- **Aerodynamics** — quadratic drag (top speed is drag-limited around
  285 km/h) plus downforce that loads the tyres at speed.
- **Tyres** — finite grip (μ ≈ 1.45 on the racing surface) with a true
  combined-slip friction circle: cornering at the limit leaves nothing for
  throttle, hard cornering scrubs off speed, and the handbrake breaks the
  rears loose.
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
  physics.js    Cannon world & contact materials
  controls.js   keyboard input with smoothing
  camera.js     chase / hood / cinematic cameras
  hud.js        SVG tachometer + lap UI + minimap
  carModels/    procedural car bodies, wheels, materials
scripts/
  physics-test.mjs  deterministic driving-model assertions (12 checks)
  viewshot.mjs      deterministic drive + multi-angle screenshots
  smoke-car.mjs     car-builder geometry sanity
```

Headless scripts resolve Chrome from `$CHROME_EXE`, the Puppeteer cache, or
the local Playwright install, and need `npm run dev` running first.
