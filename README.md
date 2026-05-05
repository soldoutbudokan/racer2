# Racer2

A 3D racing game built with Three.js + Cannon-es, aiming for the most realistic
visual quality achievable in a browser without external asset downloads. Inspired
by the look of GT Racing 2: glossy clear-coated bodywork, kerbs, distant scenery,
golden-hour atmospherics.

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

## What's under the hood

- **Renderer**: WebGL2, ACES Filmic tone mapping, sRGB output, PCF soft shadows.
- **Lighting**: Three.js `Sky` shader (Hosek-Wilkie atmosphere) used to
  generate a PMREM environment map for image-based lighting + reflections.
  Direct sun (`DirectionalLight`) with a tight 220m shadow frustum.
- **Post-processing**: `UnrealBloomPass`, custom cinematic shader (chromatic
  aberration + vignette + grain), `SMAAPass`, `OutputPass`.
- **Materials**: `MeshPhysicalMaterial` everywhere — clearcoat on the body,
  transmission on the glass, metallic rims, procedural normal/roughness maps
  for the asphalt.
- **Physics**: `cannon-es` with `RaycastVehicle` for stable arcade-realistic
  car dynamics: speed-sensitive steering, front-biased braking, handbrake
  locks the rears, RWD power.
- **Track**: a closed Catmull-Rom circuit with kerbs at high-curvature
  sections, painted edge lines, start/finish chequer, instanced trees,
  distant low-poly mountains, and grandstands.

## Project layout

```
src/
  main.js       game loop, lap timing, driving model
  scene.js      renderer, sky, IBL, post-processing
  car.js        visual + physics car (RaycastVehicle)
  track.js      circuit geometry, materials, scenery
  physics.js    Cannon world & contact materials
  controls.js   keyboard input with smoothing
  camera.js     chase / hood / cinematic cameras
  hud.js        SVG speedometer + lap UI
```
