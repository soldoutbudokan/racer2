# Daily realism routine

This file is the durable memory for the scheduled "make it look more realistic"
routine. Each run starts with **no memory of previous runs**, so everything
needed lives here or in git. Read this first, then follow it.

## Goal

Make **one** focused, well-tested improvement per run to the realism of the
car, track, or environment models — small enough that a human can review it
over coffee. Rotate across the three areas; pick the highest-impact open item
from the **Backlog** below.

## Where things deploy

- **Preview (test) link:** https://soldoutbudokan.github.io/racer2/preview/
  Updated automatically by `.github/workflows/deploy-preview.yml` on any push to
  a `claude/**` branch (builds `dist/` → `gh-pages/preview/`). This is the link
  to send for the morning test. Pages CDN takes ~2–3 min to refresh.
  **ALWAYS include this preview link verbatim in your chat responses** — in the
  notification, in any status update, and whenever the owner asks what/where the
  change is. The owner should never have to ask for it or scroll to find it.
- **Production (live) link:** https://soldoutbudokan.github.io/racer2/
  Updated by `.github/workflows/deploy-prod.yml` on any push to `main`.

Both workflows already exist — do **not** recreate them. The default branch is
**`main`** (there is no `master`).

## The skip rule (read carefully — this is mechanical, not a judgement call)

The owner reviews each preview and either accepts or rejects it. Don't stack a
new update on top of one that's still being reviewed. Decide from git state:

1. `git fetch origin --prune` first — a fresh container clone can be stale about
   where `main` points.
2. **Pending** = a `claude/**` branch exists whose tip is **not** an ancestor of
   `main` (i.e. an un-merged, un-deleted preview). Check with:
   `git for-each-ref --format='%(refname:short)' refs/remotes/origin/claude | while read b; do git merge-base --is-ancestor "$b" origin/main || echo "OPEN: $b"; done`
   If anything prints `OPEN`, a preview is still under review → **skip the run**
   (make no changes, send no notification — the owner already knows it's theirs
   to action).
3. Otherwise → proceed and build one new improvement on the designated branch.

State mapping (so a memory-less run can tell them apart):
- **Accepted** → owner merges the preview branch into `main` (live site updates).
- **Rejected** → owner replies "no-go"; the run then **deletes that preview
  branch** (`git push origin --delete <branch>`) and adds a one-line "tried X,
  rejected because Y" note to the Backlog so it isn't retried.
- **Pending** → branch exists, not merged, not deleted → skip (step 2).

## How to build + verify (the harness already exists)

```bash
npm ci
npm run dev &                       # vite dev server on :5173
# Chromium ships in the web sandbox; the version dir can change, so locate it:
export CHROME_EXE=$(find /opt/pw-browsers -maxdepth 3 -name chrome -type f | head -1)

# Visual review — multi-angle driving shots + close-ups (read the PNGs back):
CHROME_EXE=$CHROME_EXE node scripts/viewshot.mjs 6 /tmp/shots/after
# Deterministic no-regression suite (must stay green; includes "no console errors"):
CHROME_EXE=$CHROME_EXE node scripts/physics-test.mjs
# Car geometry sanity (NaNs / winding):
node scripts/smoke-car.mjs
# Production build must be clean:
npm run build

# Measure a before/after pair instead of squinting at it:
node scripts/pngdiff.mjs before.png after.png [diff.png] [--box x0,y0,x1,y1]
```

The visuals render through SwiftShader here, which is representative of the
deployed build but not pixel-identical to a real GPU — judge gross issues
(blow-outs, black voids, z-fighting, floating geometry), not subtle tone.

**Whole-frame PNG comparison works now, but only for `viewshot.mjs`.** The
scenery seed was pinned on 2026-08-06 (`src/scenery/rng.js`, plus GTAO's noise
texture and the shooter's film-grain phase — see that Changelog entry), so two
`viewshot` runs of identical code are **byte-identical** where they used to
differ on 56–81 % of the frame. Diff those whole-frame and believe the answer.
**Every other shooter still carries the wall-clock film grain**
(`startlights`, `bodyshot`, `wheelshot`, `lineshot`, `launchshot`,
`audit-shots`, …): their scenery is stable but a `pngdiff` of two of their runs
reads a few percent of grain that means nothing, so keep using `pngdiff --box`
on the region you changed for those until the pin is lifted into a shared
helper. See the 2026-08-06 Backlog entry.

## Workflow each run

1. `git fetch`, apply the skip rule.
2. Capture a **baseline** screenshot set, then pick one Backlog item.
3. Make the change; keep the diff small (ideally 1–2 files).
4. Verify: screenshots before/after + `physics-test.mjs` green + build clean.
5. Commit, push to the designated `claude/**` branch, confirm the preview deploy
   **succeeds**, then notify the owner with the preview link and a go/no-go ask.
6. Only push to `main` after the owner replies "go".
7. Append what you did to the Changelog, and add/clear Backlog items.

## Changelog (accepted to `main`)

- **2026-08-17** (accepted → `main` 2026-08-22, owner replied "go"; was branch
  `claude/epic-franklin-mrmtk5`)
  — **The kerbs are solid now.** Took the top open *env* item, new on 2026-08-12
  and the newest substantive finding in the file: **nothing on any circuit
  could launch a car**. The physics ground is a single flat `CANNON.Box`
  (2000×0.5×2000, top at y=0), so the camber, `terrain.js`'s relief, the
  sausages and the 10.5 cm kerbs were all *decoration*: over 6 s of four-car
  racing every wheel of every car was in contact on every frame. A car could
  cut an apex straight through a kerb and the suspension never knew. That item
  proposed the smallest version of the fix — give the kerbs, and only the
  kerbs, collision geometry — and that is what this is.
  **The physics kerb is built from the same runs as the drawn one.** The run
  and profile decision (where a kerb is, and whether the run is a `kerb` or a
  flat `apron`, hashed per run) came out of `buildKerb3DGeometry` into a shared
  `kerbRuns()` in `roadwork.js`; the new `buildKerbCollision()` walks the same
  spans. Two builders picking kerb positions independently would drift, and a
  physics kerb that is not the drawn kerb is an invisible step.
  Each ~3 m of run becomes four flat-topped boxes across the profile — a
  lateral staircase between the authored profile points, since a
  `RaycastVehicle` wheel is a point ray with no contact patch and cannot tell a
  21 cm chamfer ramp from two steps to the same height. The first step, **2.9 cm
  at the white line**, is the lip that does the unsettling. Ribbed bands sit at
  the **rib crest** (a rolling tyre bridges the 1 m grooves); modelling the ribs
  themselves would be false precision — at 40 m/s a 1 m pitch is 40 Hz against a
  120 Hz step.
  **Heights are the drawn kerb's world y, not a height above the physics
  ground**, and those differ: the ground is flat at 0 while the road is drawn
  with a crown, so its edge is ~1.4 cm lower. Seating the slabs on the drawn
  kerb is what puts the tyre where the kerb is seen to be.
  **The bug worth remembering, because it is invisible in every other use of
  this code:** slabs were first sized by the arc step they were cut at. That
  arc is **centreline** arc length, and a kerb sits ~8 m to the side of it — so
  round the outside of a corner 3.0 m of centreline is **3.4–3.6 m** of kerb.
  Boxes cut for 3.0 m left a **0.08–0.30 m hole at every joint**, on the outside
  of every corner, about every third metre of kerb; `kerbprobe` read the
  physics **90 mm below** the drawn kerb at every fourth sampled frame. The mesh
  never showed it because a triangle strip stretches between its samples and
  boxes do not. Each slab is now a **chord between its own two end samples at
  that band's lateral offset**, so consecutive boxes share endpoints and cannot
  gap; then the box is re-centred half a sagitta out and widened by the other
  half, because a chord cuts the corner it stands for (10 cm on a street
  hairpin — which was the last −30 mm outlier, on `downtown`, a wheel handed
  the next band down).
  **Budget**: 1496–1944 boxes per circuit, but only **42–52 new bodies** (`gp`
  602 → 644). They are grouped ~10 segments (≈30 m of one corner) to a static
  body, which is the compromise the `NaiveBroadphase` forces: ~900 individual
  bodies would triple the pair count on a circuit that already carries 600
  barrier boxes, while one body for the lot would have an AABB the size of the
  circuit and narrowphase every car against every slab. Building them is free
  at the resolution anything here can measure — track rebuild (median of 3,
  SwiftShader) `gp` **6102 → 6086 ms**, `parco` **5878 → 6023 ms**, i.e. inside
  the run-to-run noise, so the standing "track rebuild is slow" item is no
  worse. Material is `groundMat`
  — a wheel meets a kerb the way it meets the road, and the vehicle does its own
  tyre friction. `main.js` already classified a wheel out there as the `kerb`
  surface, so grip was waiting for this.
  **What it does.** Settled with the outside wheels over the line: wheel ground
  heights **0.000 / 0.096**, chassis **+47 mm**, **3.35°** of roll. Running wide
  at 6° at 90 / 150 / 220 km/h: peak chassis rise ~6 cm, peak roll
  **1.1 / 3.1 / 3.3°**, and **37 / 44 / 70 frames of 300 with a wheel off the
  ground** (down to **two** wheels at 90 km/h) — the first airtime available
  anywhere in the game, and no NaN, no launch, no roll-over. Unsettling, not a
  ramp.
  Three new `physics-test` gates: **the collision kerb is the kerb that is
  drawn** (884 samples on `gp`, cannon ray vs a three ray at the drawn mesh —
  **0 below the mesh**, −1.1..+14.7 mm, which is exactly the flat band top
  against a drawn top that falls 13 mm outward and ripples 11 mm; this is the
  gate that catches the arc-length hole), **a wheel put over the kerb line
  climbs it** (with a mid-road control on the same corner that must read
  0/0 and 0° roll, so it cannot pass by lifting everything), and **the racing
  surface stays flat** (3300 rays across the road, highest **0.00 mm** — the
  guard on the sagitta widening ever growing into a step on the racing line).
  Two things that gate caught on the way, both worth keeping: it first read
  **962 mm** because earlier scenarios park cars on the circuit and a ray drops
  onto a roof — the rays now hide the cars the way `RaycastVehicle` hides its
  own chassis; and the whole block is written to degrade rather than throw when
  the kerb data is absent, after the first control run died on `__THREE` instead
  of reporting.
  New tool: **`scripts/kerbprobe.mjs`** — per circuit, the body/box budget and
  kerbed fraction of the lap, physics-vs-drawn agreement with the outliers
  named, a settle sweep across the kerb line, a 6° run-wide strike at three
  speeds, and (with `KERB_SHOTS=<prefix>`) a low rear-3/4 pair of the same car
  mid-road and on the kerb. One product hook: `window.__THREE`, so a probe can
  raycast the built scene (cannon's classes are all reachable from `ctx.world`).
  Verified: `physics-test` **48/48** incl. no console errors, control run
  against the pre-change `src/` fails exactly the two feature gates without
  crashing, smoke OK, build clean, `kerbprobe` on all six circuits (agreement
  −3.3..+14.8 mm, 0 mesh misses, 0 holes), and paired `viewshot 6`:
  **0 changed pixels, maxDelta 0 on all five angles** — which is two proofs at
  once, that the `kerbRuns` extraction leaves the drawn kerb bit-identical, and
  that the player's line over those 6 s never touches a kerb, so nothing else
  moved either.

- **2026-08-12** (accepted → `main` 2026-08-17, owner replied "go"; was branch
  `claude/epic-franklin-jlxl9v`)
  — **A car in the air took its shadow with it.** Top open *car* item in the
  Backlog ("the contact shadow does not react to airtime"), and the first
  product change since the seed pin, so a before/after diff finally means
  something. Measured with the new `scripts/airshadow.mjs`, holding a car at a
  series of heights above the road — blob world y **before**: 0.030 on the
  ground, then **0.126 / 0.276 / 0.576 / 1.176 / 2.476** at 0.15 / 0.3 / 0.6 /
  1.2 / 2.5 m of air. It climbed with the car, at full darkness and full size:
  a launched car carried a hard black patch through the sky with it.
  Cause is the seating, not the blob. `car.js` inferred the road from the car's
  own wheels (`mean(hub.y) − WHEEL_RADIUS`), which is exact while the tyres are
  down and meaningless the moment they are not — cannon's suspension raycast
  reaches only `rest + radius` from the anchor, i.e. about **5 cm past the
  settled ride height** (the probe shows contacts 4 → 0 between 0.05 and 0.15 m
  of air), and past that the wheels hang at full droop, so the "road" they
  imply is pinned to the chassis.
  Fix, in `src/car.js`: the road height is now sampled from
  `raycastResult.hitPointWorld` of the wheels that are **actually down** and
  **remembered** for the frames when none are. Two details worth keeping:
  contact must be read *before* `updateWheelTransform` (its first line clears
  `isInContact` — the 2026-07-29 trap; `raycastResult` survives it), and
  averaging all four wheels regardless of contact is what let one drooping
  wheel drag the estimate up. The physics ground is a single flat `Box`
  (`track.js`), so a remembered reading stays true while the car is airborne;
  if the circuit ever gains real elevation this wants a downward raycast.
  Then fade and spread it, which is the other half of the item: `AIR_SPAN`
  0.8 m to fade out completely, `AIR_SPREAD` 0.6 (1.6× by then), and an
  `AIR_DEADBAND` of 2 cm because **suspension rebound is not airtime** —
  measured over 6 s of four-car racing, the worst chassis rise above static is
  **0.25 cm**, so the fade stays exactly 0 for the whole of normal driving.
  **The fade had to be a shader uniform, and that is not a style choice.**
  MULTIPLY blending is `dst * src.rgb` and ignores alpha outright, so
  `material.opacity` cannot fade this blob at all, and `material.color` only
  ever multiplies it *darker*. The one direction that lightens a multiply is
  toward white (white is the no-op), so `parts.js` mixes the sampled texel
  toward 1.0 through one uniform injected after `<map_fragment>`. At fade 0
  that is `mix(x, 1.0, 0.0)` — exactly x — which is why a grounded car is
  bit-identical to before, and it is measured, not asserted: the grounded
  before/after shot is **0 changed pixels, maxDelta 0**.
  **After**: the blob sits at 0.030 at *every* height; fade
  0 / 0.161 / 0.349 / 0.724 / 1 / 1 and scale 1 → 1.6 across the same sweep;
  and past 0.8 m it drops out of the draw entirely (`visible = false`) since a
  fully faded multiply is a no-op.
  Two new `physics-test` gates on one lift-and-hold sweep: **the contact shadow
  stays on the road when the car is airborne** (every height within a
  centimetre of the tyre-measured road, and clear of it so the depth test
  cannot bury it) and **it fades and spreads with airtime** (grounded fade 0 /
  scale 1 / drawn; a real mid-air step at 0.3 m partly faded, partly spread and
  still drawn, so a fade that only snapped 0→1 could not pass; gone at 2.5 m).
  **Control run:** both **fail** against the pre-change `src/car.js` +
  `parts.js` — the first on the climbing blob (0.126 at 0.15 m against a road
  at 0), the second on the missing uniform. The gate's fade read is
  deliberately tolerant of a missing uniform so that control *reports a
  failure* instead of throwing out of the evaluate and taking the rest of the
  suite with it.
  New tool: **`scripts/airshadow.mjs`** — the height sweep above (blob y, fade,
  scale, drawn, wheel contacts) plus, with a prefix argument, three shots of a
  car on the racing surface held grounded / 0.35 m / 1.0 m up from a low
  rear-3/4 angle where the road under the car is visible. It carries
  `viewshot`'s film-grain pin, so its PNGs are comparable between runs (see the
  standing Backlog item about lifting that pin into a shared helper).
  Verified: `physics-test` **45/45** incl. no console errors — which also
  proves the injected shader compiles under SwiftShader — smoke OK (no NaN,
  outward winding, triangle budget unchanged at 24880/24228/21778), build
  clean, `airshadow` before/after (grounded **0 changed pixels**; the 0.35 m
  hop **6.03 %** with the bbox confined to the road under and behind the car,
  and the amplified diff showing *only* the blob — car, kerbs, grass, trees and
  sky all identical; the 1.0 m launch 1.02 %), and paired `viewshot` at 6 s:
  `chase` and `front34` **0 changed pixels**, `high` and `trackside` **5 pixels
  each** (maxDelta 20 and 39). Those five pixels are explained rather than
  waved at — over the same 6 s the old and new road estimates differ by at most
  **0.27 mm** (the hub sits along a suspension axis that tilts with body roll,
  so it is not exactly `hitPoint + radius`), and no car ever leaves the ground,
  so nothing fades. Worth recording that the `before` run reproduced the five
  md5s the 2026-08-11 entry wrote down, byte for byte, in a fresh container:
  the seed pin holds across machines and days.

- **2026-08-06** (accepted → `main` 2026-08-11, owner replied "You can push to
  main"; was branch `claude/epic-franklin-kx43xh`)
  — **Two screenshots of identical code differed on 56–81 % of the frame.**
  Took the item the last run flagged as "the highest-leverage open item in the
  file": **pin the scenery seed**. Re-measured the noise floor first, on
  unchanged code, with `viewshot 6` twice: **chase 63.8 %, front34 65.5 %,
  high 81.3 %, low 56.2 %, trackside 65.5 %** of pixels differing. Worse than
  the 44.7 % the 2026-08-05 note recorded. Every "verified: before/after
  viewshots on all five angles" line above this one was an eyeball comparison
  against a background re-randomising underneath it.
  **It was three causes, not one** — this matters, because pinning the seed
  alone gets you a third of the way and looks like a failure:
  (1) **the scatter.** 307 `Math.random()` calls across `track.js` and six
  `scenery/*` modules, so trees, crowd, rocks, buildings and the asphalt
  speckle were re-rolled per page load. Fixed properly, below.
  (2) **GTAO's denoise noise.** `GTAOPass` builds a 64×64 sample texture in its
  constructor from `new SimplexNoise()`, and three's `SimplexNoise` defaults to
  `Math.random` for its permutation table. That put a faint *full-frame*
  speckle over every render — on its own it left two shots differing over half
  the frame at meanDelta ~12 even after the scatter was pinned. `scene.js` now
  rebuilds that texture from a seeded stream (and reassigns
  `pdMaterial.uniforms.tNoise`, which the pass wires in its own constructor —
  replacing only `pdNoiseTexture` does nothing).
  (3) **the film grain.** `CinematicShader`'s `uGrain` term is phased on
  `uTime`, which `main.js` drives from the wall clock. A deliberate per-frame
  effect, and not something a before/after diff should be measuring — so the
  fix is in the shooter, not the product: `viewshot.mjs` pins the phase once
  after freezing the loop (`ctx.mode` is null by then, so `tick` no longer
  overwrites it). **Other shooters still need this** — see the Backlog.
  The scatter fix is `src/scenery/rng.js`: mulberry32 behind a `rand()` that is
  a drop-in for `Math.random()`. The design decision worth keeping is **named
  per-builder streams, not one sequence per circuit**. One sequence would be
  deterministic but useless: adding a draw to the tree scatter shifts every
  later draw, so a tree change would still move the grandstands and the diff
  would be the whole frame again. Each builder instead gets
  `hash(circuit id, stream name)`, so the streams are independent —
  `createTrack` calls `beginStream('trees')`, `beginStream('grandstands')` and
  so on before each builder, and builders just call `rand()` and inherit the
  current stream (sub-builders and canvas texture makers share their caller's,
  which is right — they are one visual feature).
  **Result: two runs of `viewshot 6` are now byte-identical.** 0 changed
  pixels, maxDelta 0, on all five angles. From 56–81 % to zero.
  **The isolation claim is measured, not asserted.** Control: added one
  throwaway `rand()` at the top of `scatterTrees` — i.e. perturbed exactly one
  stream — and re-shot. **3.3–5.1 %** of the frame changed, bbox confined to
  the treeline band, and the amplified diff shows *only trees and their
  shadows*: road, kerbs, armco, groundcover, mountains and the car are all
  pure black (identical). That is what the whole change is for.
  Two new `physics-test` gates. **Rebuilding a circuit reproduces it vertex for
  vertex** — builds `gp` and `sprint` twice each *interleaved* (so a pass can't
  come from the builder caching a result) through the production
  dispose+rebuild path, fingerprinting every mesh's world matrix, material
  colour and full position attribute at 0.1 mm. `gp` 223 meshes / 185 399
  verts, `sprint` 263 / 164 422. And **the fingerprint distinguishes two
  circuits**, which guards the first: a degenerate hash would pass the equality
  check for the wrong reason.
  **Control run:** with `rand()` reverted to `return Math.random()` — keeping
  every new name, hook and code path — the first gate **fails**
  (`gp f66205bf/7008920d`, and the mesh *count* moves 235→211), while the
  second correctly still passes. The numbers are load-bearing, not the plumbing.
  Two small product hooks: `track` now exposes its `group` (it always owned it;
  `dispose()` closes over the same node), and `main.js` exposes
  `__rebuildTrackById` / `__trackIds` alongside the existing dev hooks.
  Also fixed `scripts/audit-shots.mjs`, which had a hard-coded macOS Chrome
  path and ignored `CHROME_EXE`, so it could not run on this container at all.
  Verified: `physics-test` **43/43** incl. no console errors, smoke OK (no NaN,
  outward winding, triangle budget unchanged at 24880/24228/21778), build
  clean, paired `viewshot` runs byte-identical on all five angles, and
  `audit-shots` on **downtown, alpine and dunes** — the city, alpine and desert
  themes all still build correctly (buildings/storefronts/streetlights, pines/
  rocks/huts, mesas/cacti/gravel), no voids, nothing floating.

- **2026-08-05** (accepted → `main`, owner replied "go"; was branch
  `claude/epic-franklin-76ypbv`)
  — **The start lights were ten painted dots on a slab.** Top open *environment*
  item from the 2026-07-30 run, and the first non-driver-logic change in five
  runs (the rotation was overdue — 07-31, 08-03, 08-04 and 08-04b were all AI
  or HUD). The lamps were flat `CircleGeometry` discs sitting 12 mm proud of
  the housing face: nothing on the panel had any relief, so neither the sun nor
  GTAO had anything to shade, and an unlit lamp read as a dull maroon sticker
  rather than a dark lamp. The player stares at this rig for the whole 4.2 s
  countdown of every single race, which is what made it the pick.
  Fix, in `addStartGantry` (`src/track.js`), two parts:
  (1) a **cowl** around every lens — a short flared visor standing 0.10 m proud
  of the housing, which is what a gantry lamp carries in life and what gives
  the panel its relief. An unlit lens now sits in its own shade and reads
  black, which is what an unlit lamp looks like;
  (2) a **domed lens** (rim 0.20 m, 3 cm of sag, cut from a sphere of radius
  (r² + s²)/2s) instead of a flat circle, so an unlit lamp shades across its
  own face like glass.
  **The lit read at race distance is deliberately unchanged** — emissive
  ignores the surface normal, so a lit lamp is the same even red it always was.
  Confirmed on the `pole` shots: three-lit still reads as three-lit, and the
  two unlit columns are now *easier* to count because they went from dull
  maroon to genuinely dark.
  Cost, measured exactly rather than estimated (the gantry has no randomness,
  so this is a clean before/after): lamp geometry **10 meshes / 200 tris →
  6 meshes / 2020 tris**, i.e. **−4 draw calls** and +1820 triangles on scenes
  that run 191–429 k. The saving comes from merging: all ten cowls are one
  mesh, and a column's two lamps already shared a material so they merge in
  pairs. One material per column is untouched, so `startLights.set(n)` is still
  a single `emissiveIntensity` write per column.
  Two new `physics-test` gates. Every existing start-light gate is about light
  *state* — none of them can tell a lamp from a decal, which is how flat discs
  survived a full run's verification. The new ones measure the geometry, in the
  gantry group's frame where −z is the face oncoming cars see: **the start
  lamps are lenses in cowls, not discs on a panel** (5 lens meshes, lens sag
  **0.030 m**, lens recessed **0.066 m** behind the cowl mouth) and **the lamp
  cowls stay on the light panel** (worst edge clearance **0.080 m** — this one
  catches a future `COL_STEP` or radius change that would hang a cowl off the
  edge). Three meshes are `name`d for this (`startLightPanel`, `startLampLens`,
  `startLampCowls`); no new product API.
  **Both controls run.** Against the pre-change `src/track.js` the gate fails
  (`columns: 0`) — but that only proves the names are new, so a second control
  kept the new code path and names and flattened the geometry back to the old
  look (`SAG` 0.0004, `COWL_D` 0.001): the gate **still fails**, with the lens
  measuring `recessM` **−0.0034**, i.e. proud of the cowl, exactly the "disc on
  a panel" arrangement it is there to reject. The numbers are load-bearing, not
  the name lookup. The second gate correctly still passes in that control — it
  is an independent constraint.
  New tool: **`scripts/pngdiff.mjs`** — measures a before/after screenshot pair
  (changed-pixel %, bbox of what moved, an 8× amplified diff image, and
  `--box x0,y0,x1,y1` for mean RGB/luma of a region in *both* images). Built
  because this run needed to prove two things the eye cannot: see the two new
  Backlog findings below, both of which are measurements this tool produced.
  Verified: `physics-test` **41/41** incl. no console errors, smoke OK (no NaN,
  outward winding, triangle budget unchanged at 24880/24228/21778), build
  clean, `startlights` before/after on all seven stages × both cameras on `gp`
  **and** on `downtown` (different lighting entirely — the city rig reads
  correctly too), and `viewshot` before/after on all five angles at 6 s plus a
  grid set at 0 s. On the rig shot the housing between the lamps measures
  luma 61.00 → 61.04, so nothing on the panel moved but the lamps.

- **2026-08-04b** (accepted → `main`, owner-requested during review of the
  above; same branch `claude/epic-franklin-93ylem`)
  — **The race clock flickered in the hundredths on the grid.** Owner's report:
  "flickering at .007 and then resetting to zero and going back and forth until
  the race starts". Not a rounding or formatting problem — the HUD was
  displaying, quite literally, **how long the current frame took**.
  The hold re-stamps every car's `lapStart` each frame so the race time starts
  at zero on the green rather than at mode load. That stamp called
  `performance.now()` at the **top** of the tick; `updateLapTiming` then called
  `performance.now()` **again** at the bottom of the same tick and displayed
  `now − lapStart`. The gap between the two readings is the frame's own
  physics and render work, so the clock showed 2–8 ms on a fast machine,
  jittering frame to frame as the cost varied. Measured here under SwiftShader
  (slower frames, bigger number): **14 distinct readings over 40 frames,
  0.011–0.085 s**. It never actually "reset" — every frame was a fresh stamp.
  Fix, in `src/main.js`: `tick(ctx, dt, now)` already receives the frame's
  timestamp, so **thread it through** instead of re-reading the clock —
  `updateLapTiming` and `updateLapTimingSilently` now take `now` as a
  parameter. Three `performance.now()` calls inside the frame become one.
  Lap times are differences against stamps taken elsewhere in the same frame,
  and mixing two readings folds the frame's execution time into the answer;
  that was true of the lap timer generally, not just the countdown — the
  countdown is simply where the stamp and the read are one frame apart and the
  error is the whole displayed value.
  New `physics-test` gate: **the race clock reads zero while the field is
  held** — 240 samples over the countdown, all exactly 0 ms, 1 distinct value.
  It captures the argument to `hud.setLapTime` rather than scraping the
  formatted text **on purpose**: `formatMs` floors to whole milliseconds, so a
  cheap frame rounds the bug away and a text-based check would score it fixed.
  Verified to **fail** against the previous `src/main.js` (240 samples, **49
  distinct** values, worst **12.2 ms**) even with the render stubbed.
  Verified: `physics-test` **39/39** incl. no console errors, smoke OK, build
  clean, and a grid screenshot showing a steady `00:00.000` through the hold.

- **2026-08-04** (accepted → `main`, owner asked for it plus the clock fix
  below; was branch `claude/epic-franklin-93ylem`)
  — **A car that backed out of the armco drove straight back into it, forever.**
  Top open item from the 2026-08-03 run, which described it as a cosmetic
  rejoin ("it tracks further into the runoff before it turns in"). Extending
  the `stuckprobe` window from 4 s to 8 s showed it is not an excursion, it is
  a **loop**: reverse at 1.75 s → released at 2.63 s out at 8.06 m from the
  centreline → drove forward, arced back out, and **hit the armco again at
  4.38 s** (speed 6.1 → 1.69 m/s on contact) → second recovery at 5.63 s → and
  round again. The 4 s trace the last run worked from ended one second before
  the second impact, which is why it read as a cosmetic problem.
  Root cause is in the pure-pursuit steering, not the recovery. Pure pursuit
  asks for κ = 2·**sin**(α)/Ld, and sin folds back past 90° — so a car pointing
  *away* from where it needs to go asks for **less** lock the more wrong it is.
  Released from the recovery 81° crossed up, the driver commanded **0.72** of
  lock instead of all of it: a 6.5 m turn radius where full lock gives 4.1 m,
  and that extra radius is exactly the 2.5 m of runoff between the release
  point and the barrier. The driver was not confused about which way to turn —
  it steered the right way the whole time and still drove into the wall.
  Fix, in `src/ai.js`: past 90° the target is behind the front axle and there
  is only one answer — **full lock**, in the direction the sign already picks.
  Below 90° the pure-pursuit maths is untouched.
  Measured **before → after**, same wedge, 8 s:
  - separate recoveries: **2 → 1** (the loop is gone),
  - furthest back out after release: 10.75 m → **10.03 m**; it wedged at
    10.42 m, so before it got back *past* its own wedge point and after it
    stays inside it (armco at 13 m),
  - end state: **9.32 m from the centreline at 19.1 km/h**, still out in the
    runoff → **0.81 m from the centreline at 94.3 km/h in 2nd gear**,
  - the nose comes all the way round: `aim` (nose · track direction) 0.11 →
    **1.00** by 5.0 s, where before it stalled at 0.78 and re-wedged.
  **Normal racing is untouched** — the >90° branch cannot fire while the
  lookahead point is up the road in front of the car. `physics-test` reports AI
  lap progress **91/90/89 %** and max centreline deviation **2.8 m**, figures
  identical to the previous run.
  Two new `physics-test` gates on a 4th `stuck` scenario (the same wedge,
  watched for 8 s instead of 4): **a recovered car does not drive back into the
  barrier** (exactly one recovery arms in the window — a car bouncing off the
  same barrier arms twice) and **a recovered car rejoins the racing line**
  (ends within 6 m of the centreline, above 40 km/h, not in R). Both were run
  against the pre-change `src/ai.js` and **fail** there, and pass after.
  A trap worth keeping. The first cut of the rejoin gate reused the probe's
  `latOf`, which measures against **one fixed frame** — that is what makes the
  runoff traces readable, but by 8 s the car has driven ~120 m past that frame
  and the projection stops meaning anything: it scored a successful rejoin
  (0.81 m from the line) as **4.15 m** off it and failed. The gate now measures
  distance to the **nearest** centreline frame, chosen because a nearest-frame
  flip (the 2026-08-03 finding) can only *inflate* that number, never shrink
  it, so a `< 6 m` assertion cannot be passed spuriously by one.
  `scripts/stuckprobe.mjs`: the wedged run is now **8 s, not 4** — backing out
  of the armco is only half a recovery — and the trace carries two new columns,
  **`str`** (the steering command) and **`aim`** (nose vs track direction).
  Those two are what make the sine fold-back visible; the old trace had
  neither, which is why the last run could see the symptom and not the cause.
  Verified: `physics-test` **38/38** incl. no console errors, smoke OK (no NaN,
  outward winding, triangle budget unchanged at 24880/24228/21778), build
  clean, before/after `stuckprobe`, and before/after `viewshot` on all five
  angles. No visual change — driver logic only. Same caveat as the last run on
  reading those pairs: car pose, wheels, contact shadow, road, kerbs and racing
  line are identical frame for frame, but the **trees and billboards move
  between the two sets** because the scenery seed is still unpinned. That is
  not a regression and `src/ai.js` cannot place a tree.

- **2026-08-03** (accepted → `main`, owner replied "go"; was branch
  `claude/epic-franklin-lkmsog`)
  — **Any AI standing still selected reverse**, whatever the reason. Top open
  item from the 2026-07-31 run: that run stopped the *grid hold* from winding
  the stuck-recovery up, but left the underlying rule in `src/ai.js` alone —
  "throttle-pinned and under 1.5 m/s for 1.2 s → reverse for 1.5 s". That rule
  cannot tell a car wedged in the armco from one bogged off the line, queueing
  behind an incident, or crawling out of a slow hairpin, and it commits to the
  full 1.5 s of reverse with no exit once the road clears.
  Measured with the new `scripts/stuckprobe.mjs` (see below), three standstills
  that look identical from outside the car, **before → after**:
  - *held on the racing line with clear road ahead* (a bogged getaway, a queue,
    a car being held): reverse at **1.208 s** → **no reverse at all** until the
    blind safety valve at 4.008 s.
  - *driven nose-first into the armco*: reverse at 1.7 s and it ran the **whole
    1.5 s**, ending 5.2 m across the circuit still in R and travelling backwards
    at 5 m/s (lat 9.8 → 4.57) → same 1.7 s trigger, but **cut short after
    0.82 s** with 0.68 s still on the clock, back in first gear and driving away.
  - *wedged with another car 5.2 m behind*: reverse at 1.7 s **into the parked
    car** (its speed drops 2.61 → 1.48 m/s on contact in the before-trace) →
    **never** reverses while that car is there.
  The new rule keeps the fast 1.2 s trigger but wants **evidence** of something
  to be stuck ON — the armco within 3 m, or the nose more than ~50° off the
  track direction — plus a measured lack of forward **progress** (under 1.2 m
  from an anchor) rather than just a low speedometer. Without evidence a
  **blind 4.0 s fallback** still fires, so a car wedged on something the driver
  cannot see recovers eventually instead of sitting at full throttle for the
  rest of the race. That fallback is load-bearing: tightening the trigger
  without it would trade an occasional wrong reverse for a permanently parked
  car, which is worse.
  Two behaviours on top of the trigger. The recovery is **cut short the moment
  the car is free** (backed 1.6 m and no longer near the wall) — a driver who
  has backed out of trouble goes forward again. And it **never reverses into a
  car within 6 m behind**, which the old rule did blindly; that also gates the
  arming, so it will not start a recovery it would immediately have to abort.
  Worth knowing: normal racing never comes near the wall test — `physics-test`
  measures max centreline deviation at **2.8 m** over 45 s of AI running, with
  the armco at 13 m, so `nearWall` (|lat| > 10 m) is genuinely an incident
  signal and lap times are untouched (AI lap progress 91/90/89 %, unchanged).
  Recovery state is now **exposed on the driver as `ai.recovery`** rather than
  living in closure variables, precisely so a gate can assert on what the
  driver *decided*. That is the 2026-07-31 harness finding ("nothing measures
  what the AI is commanded") answered: every existing gate measures positions,
  which is why a driver reversing for the wrong reason was invisible.
  New tool: **`scripts/stuckprobe.mjs`** — the three scenarios above with a
  frame-by-frame command trace (throttle / brake / gear / lateral offset /
  speed / `reverseT`). Two traps it cost to build. The recovery timers are
  **per-driver state**, so a probe running scenarios back-to-back must build a
  **fresh driver** (`window.__createAIDriver`) between them or scenario 2 starts
  mid-reverse from scenario 1. And a car placed *at* the armco spawns inside the
  barrier body; Cannon's penetration resolution fires it across the circuit at
  20 m/s. Place it ~3 m short and let it drive into the wall.
  Five new `physics-test` gates covering all three scenarios plus the blind
  fallback and the cut-short. Note the wedged gate asserts the **minimum**
  lateral offset reached, not the final one: once recovered, the AI turns round
  and drives back out toward the wall it was stuck against, so an end-state
  check scores a successful recovery as a failure (it did, first time round).
  Verified: `physics-test` **36/36** incl. no console errors, smoke OK (no NaN,
  outward winding, triangle budget unchanged at 24880/24228/21778), build
  clean, before/after `stuckprobe` on all three scenarios, and before/after
  `viewshot` on all five angles. No visual change — this is driver logic only.
  **Read the `viewshot` pairs with care:** car pose, wheels, contact shadow,
  road, kerbs and racing line are identical frame for frame, but the *trees and
  billboards move between the two sets* because the scenery seed is still
  unpinned (same non-determinism the 2026-07-27 `facing-check` note describes).
  That is not a regression and `src/ai.js` cannot place a tree — but a future
  run comparing these shots should not read it as one.

- **2026-07-31** (accepted → `main`, owner replied "go"; was branch
  `claude/epic-franklin-hkaxen`)
  — **Every AI car launched in REVERSE at the green**, and the whole field was
  released on one frame. Went looking for the top open item from the 2026-07-30
  run ("the grid is a standing start with no jump-start rule… the AI all react
  on the exact same frame") and found a hard bug sitting underneath it — a
  regression introduced by the start-lights change itself.
  Root cause is a collision between two features that never met before. The
  hold hands each car `GRID_HOLD` but still **polled `c.ai.update()` every
  frame** and threw the answer away. `ai.update`'s stuck-recovery
  (`src/ai.js`) arms whenever a car is throttle-pinned and stationary — which
  is *exactly* what being held on the grid looks like from inside the driver —
  so over the 4.2 s countdown it wound all the way up: `stuckT` > 1.2 →
  `reverseT = 1.5` → `ctrl.brake = 1`, twice over. `applyControls` reads a
  brake input at a standstill as a request for reverse gear
  (`car.js:327`, the same trap the 2026-07-30 entry warns about for
  `GRID_HOLD`), so at lights-out the entire AI field selected **R** and drove
  **4.3 m backwards** over the next two seconds before finding first gear.
  Measured before: all three AI at −0.42 m at green+0.4, −2.44 m at green+1.0,
  −4.39 m at green+2.0, while the player was 16.3 m up the road. The player won
  every standing start by default.
  Fix, in `main.js`: **a held AI is not asked for a command at all.** That is
  load-bearing, not an optimisation — a driver waiting on the lights is not
  driving, and polling a driver you intend to ignore is what wound the recovery
  up. Cheaper too.
  On top of that, the realism item itself: each driver now has their **own
  reaction to the green** (`aiReactionS`), so the field no longer launches on a
  single frame. Reaction is `lerp(0.42 s, 0.18 s)` across skill 0.70→0.95, plus
  a per-grid-slot offset so the getaway is not in tidy skill order — 0.245 /
  0.296 / 0.433 s on the default grid, a 0.183 s spread. **Authored, not
  random**, so a grid always plays out the same way and the gate can assert it.
  Players are released on the green itself: their reaction is whatever their
  hands do, and adding one on top would just read as input lag.
  Two implementation notes worth keeping. `ctx.state.startT` now **keeps
  running past the green** — it is the clock reactions are measured against,
  not just the light sequence's own timer. And the per-car hold is evaluated
  *after* the player input block, because `consumeReset` rewinds `startT` and
  the whole field has to go back on the hold in the same frame.
  Three new `physics-test` gates, all in one block that pumps the real `__tick`
  with the render stubbed: **nobody launches in reverse** (displacement along
  each car's own heading, plus a check that no car ever shows gear R — the
  older "lights out releases the field" gate measures *unsigned* distance from
  the grid slot, so it scored a 4.2 m reverse as a healthy getaway and passed
  right through this bug), **the whole field gets away from the grid**, and
  **the field does not launch on a single frame**. That last one measures the
  spread across the **AI only** — the player is released on the green, so
  including them would score an identically-programmed field as staggered.
  New tool: **`scripts/launchshot.mjs`** — the start from three cameras
  anchored to the START LINE (not to a car: the subject is the field's stagger,
  so the frame has to hold still while the cars move through it) at four
  moments, with per-car reaction / gear / heading-relative travel / speed
  printed alongside. Every other shooter frames a car and hand-drives it with
  `ctx.mode = null`, so **none of them exercise the start gate at all** — which
  is why a reversing grid survived a full run's verification.
  **Harness trap found building it:** a shooter cannot leave `ctx.mode` set the
  way `physics-test` does. physics-test gets away with it because its whole run
  is one synchronous `evaluate` that rAF cannot interleave with; a shooter has
  to return to node between shots, and the page's own rAF loop kept stepping
  the race while SwiftShader rendered and Playwright saved the PNG — the shots
  came out 2 s late each. Leave `ctx.mode = null` and pump `__tick` by hand
  (it does not consult `ctx.mode`). Camera note: `frame.left` is **positive
  into the pit lane** at the start line, where the pit wall and its sponsor
  boards block the grid outright, and past about −20 the grandstand deck does
  the same from the other side — hence the low on-surface camera behind the
  pack.
  Verified: `physics-test` **31/31** incl. no console errors, smoke OK (no NaN,
  outward winding, triangle budget unchanged at 24880/24228/21778), build
  clean, before/after `launchshot` on all three angles × four moments (the
  reversing grid is unmistakable in `before-green+1.0-low` and
  `before-green+2.0-air`), and before/after `viewshot` on all five angles.
  Note the `viewshot` pairs are **not** pixel-identical and should not be: the
  AI's wound-up recovery state differed at the moment that shooter takes over,
  so the cars are at a slightly different point of the lap. No visual change.

- **2026-07-30** (accepted → `main`, owner replied "go"; was branch
  `claude/epic-franklin-wnn63z`)
  — **The race began before the player had seen the grid, and the gantry had no
  start lights.** Top open Backlog item from the 2026-07-29 run ("nothing gates
  the world step behind a countdown"). `tick()` started stepping the world the
  instant a mode loaded, so the AI simply drove away — and the settled spawn
  pose the 2026-07-28 and 2026-07-29 runs built was never actually on screen
  long enough to look at.
  Built as real **environment geometry**, not a HUD number: `addStartGantry`
  (`src/track.js`) now hangs a five-column F1 light rig off the truss, and
  `createTrack` returns it as **`track.startLights { set(n), litCount() }`**.
  Two lamps per column share ONE material, so a stage change is a single
  `emissiveIntensity` write per column — no per-frame material churn.
  Geometry notes worth keeping: the rig hangs at **z −0.42**, on the front
  chord, because the checkered banner is a plane at z 0 and a rig on the centre
  line would pass straight through it; and it sits at y 5.5–6.9, under the
  banner's 7.05–8.15 band. Both droppers are on the same z for the same reason.
  `main.js` runs the sequence in `tick()` *before* the driving loop so
  `started` is settled for the frame: 0.5 s dark → five columns at 0.6 s
  intervals → 0.7 s all-red → lights out, whole field released on the same
  frame (**4.2 s**, `START_SEQUENCE_S`, exposed as `window.__startSequenceS`).
  **Trap worth remembering:** the held command is `handbrake: true` and
  deliberately **not** `brake: 1`. `applyControls` reads a brake input at a
  standstill as a request for reverse (`drive.mode = 'R'`), so braking to hold
  the grid would put the entire field in reverse gear. The handbrake locks the
  rear axle without touching the direction logic — and it lights the brake
  lights, which is what a car actually held on the grid looks like.
  Lap and race clocks are re-stamped every held frame, so timing starts on the
  green rather than at mode load; lap *detection* is left running (a held car
  cannot reach the line, and gating it would only add a way for the timing to
  get stuck — and it would have broken the existing time-trial gate, which
  pumps 3 s and would then never see a lap).
  **Second trap, found by the new shooter:** the camera looks down +Z at the
  rig's −Z face, which mirrors local x — laying the columns out in +x order lit
  them right-to-left from the grid. Column 0 is now the driver's left.
  Three new `physics-test` gates: the field does not move while the lights are
  on, all five columns are lit before the green, and lights-out releases it.
  They drive the REAL `__tick` pump (not a hand-rolled step loop) with
  `ctx.composer.render` stubbed for the duration — the gate is about physics and
  light state, and ~340 SwiftShader composer passes took **minutes**. If a
  future gate needs to pump the game loop, stub the render the same way.
  New tool: **`scripts/startlights.mjs`** — the rig at all seven stages
  (dark → 1..5 → green) from the pole-sitter's view and as a telephoto
  close-up, on any circuit. Every other shooter frames the CAR, so none of them
  can judge the gantry.
  Verified: `physics-test` 28/28 incl. no console errors, smoke OK (no NaN,
  outward winding, car triangle budget unchanged at 24228/21778), build clean,
  before/after `viewshot` on all five angles at both 0 s (grid) and 6 s
  (driving), `startlights` on `gp` and on `downtown`.

- **2026-07-29** (accepted → `main`, owner replied "go"; was branch
  `claude/epic-franklin-kydyn7`)
  — **The whole field fell 36 cm onto the grid at the start of every race.**
  Top open Backlog item from the 2026-07-28 run, measured rather than eyeballed.
  Both spawn paths in `main.js` — `gridSpawn` and `rescueCar` — placed the
  chassis at `frames[i].pos.y + 1.0`. A settled chassis stands
  **0.6766** above the road (`STATIC_CHASSIS_HEIGHT`, derived from the spring in
  `src/stance.js`), so +1.0 is 32 cm high with the suspension hanging at full
  droop. New probe **`scripts/spawn-settle.mjs`** stepped the world by hand with
  no driver input at all and caught the transient: chassis 1.000 → worst 0.637
  (**−36.3 cm**, overshooting equilibrium), back up to 0.687, still ringing
  ±1 cm at 0.9 s. Nothing gates the world step behind a countdown, so the field
  visibly dropped and bounced on its springs for the first third of a second of
  every race, and a rescued car did the same mid-lap.
  Fix: one `chassisSpawnY(roadY)` helper used by both paths, returning
  `roadY + STATIC_CHASSIS_HEIGHT`. Deliberately **no clearance margin** — the
  suspension raycast measures its compression fresh every step, so placing the
  car at the derived static height means step 1 already computes exactly the
  compression that balances the weight. Measured after: worst movement **0.0 cm**
  on all four cars, tyre contact patch dead on 0.000, in equilibrium from the
  first step. A margin would only have reintroduced a smaller drop.
  New gate in `physics-test.mjs` — "the field is placed on the grid, not dropped
  onto it" — resets the field through the real `gridSpawn`, steps 0.75 s undriven
  and requires < 1 cm of movement with 4/4 wheels in contact.
  **Harness trap worth remembering** (it made that gate fail while the car was
  provably sitting still): `car.update()` — the visual sync — calls cannon's
  `updateWheelTransform`, whose *first line* is `wheel.isInContact = false`.
  Only the suspension raycast on the next `world.step` sets it true again. Read
  `isInContact` **before** any `update()` or every wheel reads as airborne no
  matter what the car is doing. The older "car settles on its wheels" check is
  correct only by luck of ordering.
  `viewshot.mjs` now re-seats the field through `gridSpawn` when asked for `0`
  seconds of driving — the page has already had a second of rAF by then, so a
  grid shot was previously of wherever the cars had drifted to, not of the pose a
  race starts in. `main.js` exposes `window.__gridSpawn` for this.
  Verified: `physics-test` 24/24 incl. no console errors, smoke OK (no NaN,
  outward winding, 21778 tris/car unchanged), build clean, `spawn-settle`
  before/after, and before/after `viewshot` grid shots on all five angles (the
  floating cars and their detached shadows are plainly visible in `before-grid-
  low` and `before-grid-trackside`) plus a 6 s driving set for regressions.

- **2026-07-28** (accepted → `main`, owner replied "go"; was branch
  `claude/epic-franklin-beii9b`)
  — **The cars spent every race 5.7 cm too low on their own wheels.** Top open
  Backlog item ("`BODY_DROP` is measured in the wrong pose"), confirmed with a
  runtime probe rather than by eye. `carModels/index.js` drops the painted shell
  a constant −0.37 below the chassis, and the shell is authored in an
  axle-centred frame (wheel centre y 0, ground −0.36) — so −0.37 has to be the
  hub's height in chassis space. It is not. −0.37 is the hub at **full droop**
  (anchor −0.05 minus the whole 0.32 spring), the pose a car holds only while it
  is falling onto the grid. Settled, the spring is 53 mm compressed and the hub
  sits at **−0.3166**. Measured on all four cars: the body-frame ground plane
  ended up at world y **−0.057** with the tyre contact patch at **0.000**, i.e.
  the rockers, splitter and undertray ran 5.7 cm *below the asphalt* for the
  whole race, and the arch liners (crest radius 0.41, authored 5 cm clear of a
  0.36 tyre) came down to 0.353 — **under** the tyre radius, which is why the
  front tyre visibly cut through the fender in `wheelshot`.
  Fix: new **`src/stance.js`**, one module owning the ride-height geometry that
  the physics vehicle (`car.js`) and the visual body placement
  (`carModels/index.js`) must agree on, with `HUB_LOCAL_Y` **derived** from the
  spring instead of eyeballed. Worth knowing for any future spring change:
  cannon-es scales its suspension force by the chassis mass
  (`force = stiffness · compression · mass`), so the static compression is
  **mass-independent** — g / (4 · stiffness), 9.82/184 = 53.4 mm here. `car.js`
  now takes `WHEEL_RADIUS`, `SUSPENSION_REST`, `SUSPENSION_STIFFNESS` and the
  anchor height from the same module, so the two halves cannot drift apart
  again. Deliberately anchored to the **static** height, not the driving one:
  the residual 4 mm at speed is real aero squat (`clA` 2.1) and the body
  *should* sink into it.
  New gate in `physics-test.mjs` — "painted shell sits at the settled ride
  height, not the droop pose" — measures the settled hub from
  `chassisConnectionPointLocal.y − suspensionLength` and compares it with where
  the body group was actually dropped (±1 cm). That is the check that would
  have caught this in 2026-07-02 when the ride height last moved.
  New tool: **`scripts/rideheight.mjs`** — prints, per car, hub offset, body
  drop, tyre contact plane, the authored ground plane and the lowest painted
  geometry, in both the grid and the settled pose. Use it after ANY change to
  the suspension or the body frame.
  Verified: `physics-test` 24/24 incl. no console errors, smoke OK (no NaN,
  outward winding, triangle budget unchanged), build clean, before/after
  `viewshot` (all five angles), `wheelshot` (both sides) and `lineshot`
  (six low angles × both aid colours) on the GT, plus low passes over the
  open-wheel and muscle cars.

- **2026-07-27** (accepted → `main`, owner replied "go"; was branch
  `claude/stoic-thompson-1zx3tr`) — **The cars had no contact shadow at all**,
  and that was the real cause of the top open Backlog item ("racing-line aid
  bleeds under the cars"). Chased it with a runtime probe rather than by eye:
  `buildContactShadow` parents the multiply blob to the *sprung body* group at
  local y −0.355, i.e. 5 mm over the body frame's authored ground plane. But
  the body frame is pinned to the chassis, and the chassis moves: measured
  world y of the blob is **+0.222 on the grid** (suspension hanging at full
  rest length, `chassisY` 0.947) and **−0.056 while driving** (`chassisY`
  0.669). So it floats 22 cm in the air before the start and is 5.6 cm *under*
  the asphalt for the whole race, where the depth test hides it outright. Every
  car has been sitting on the track with nothing grounding it since the ride
  height last moved.
  Fix, in three parts:
  (1) the blob is now **ground furniture** — still a child of `visual.root` so
  `main.js`'s existing add/remove carries it, but `car.js`'s `update()`
  re-seats it every frame: undo the chassis rotation (keep the *heading* only,
  so it stops pitching and rolling with the body), and drop it to the road
  plane inferred from the four wheel hubs (`mean(hub.y) − WHEEL_RADIUS`) plus a
  3 cm lift that clears the asphalt and its cambered crown. Verified at 0.030
  world y against a measured ground of 0.000 on all four cars.
  (2) `renderOrder −1 → 4`. The aid "glowing at the tyre contact patches" was
  an ordering bug: road decals (`roadwork`, 2) and the perfect-line aid
  (`racingLine`, 3) both draw with `depthWrite` off, so a multiply at −1 went
  FIRST and the unlit green ribbon painted straight back over it at full
  brightness. Drawn last, the shadow darkens the markings under the car too, so
  the aid now dims as it passes beneath the bodywork and brightens as it comes
  out — which is the whole of the Backlog item, with no change to
  `racingLine.js` and no change to the aid's colours.
  (3) the blob is sized and centred off the finished body bbox instead of one
  hard-coded 2.3 × 4.8 rectangle (measured 2.51 GT / 2.56 muscle / 1.98
  open-wheel), and `hideFromOverridePasses` keeps it out of GTAO's prepass.
  Ruled out on evidence, worth remembering: the reported "z-bleed beneath the
  rear bumper" is **not** a depth bug. An isolation run with the aid's
  `polygonOffset -4/-4` disabled at runtime was pixel-identical, so the offset
  is not pulling the ribbon through the bodywork — the green under the valance
  is the real ribbon seen through the real gap, and it read as bleed only
  because an unlit `MeshBasicMaterial` in an unshadowed gap is the brightest
  thing in frame. It stops reading that way once the shadow exists, so the
  offset is left alone.
  New tool: **`scripts/lineshot.mjs`** — low, tight shots at the car's
  footprint (rear / rear-ground / rear-3/4 / side / front / over), each taken
  twice with the aid forced fully green and fully red; the other shooters are
  all too far out to judge the road-to-car interface. Also fixed
  `scripts/perf.mjs`, which had a hard-coded mac Chrome path and so could not
  run in the routine's container at all; it now uses the same `CHROME_EXE`
  discovery as the other shooters.
  Verified: `physics-test` 23/23 incl. no console errors, smoke OK (no NaN,
  outward winding), build clean, `track-geometry` all OK, `facing-check` clean
  on all six, `perf` on `gp` 698 → 680 draw calls (no cost — the mesh already
  existed, it was just invisible), before/after `lineshot` on all six angles ×
  both colour states and all five `viewshot` angles.

- **2026-07-26** (accepted → `main`, owner replied "merge to main"; was
  branch `claude/scenery-and-car-detail`; owner-directed interactive
  session, multi-agent) — **Environment + car detail overhaul.** Owner asked for "the mountains, cars, track,
  barriers, trees, etc." to be significantly better detailed while keeping the
  game reasonably efficient. `src/track.js` went from a 3.5 k-line monolith to
  a ~2.3 k-line assembler over new modules in **`src/scenery/`**:
  - **`terrain.js` (new)** — the circuit no longer sits on a flat 4 km plane.
    A displaced sheet that is **dead flat inside the corridor** (`flatR` =
    armco + 46 m, ramping to full relief by +130 m) and rolls outside it, on a
    tensor-product grid with non-uniform axis spacing (fine over the track
    bbox, geometrically growing to the fog wall — no clipmap T-junction
    cracks). Exports `height(x, z)` / `slope(x, z)`; **every scenery placer
    must seat on it** or it floats. Split into a near shell that receives
    shadows and a far shell that does not — the sun's 180 m shadow box is
    ~1500 m deep along an 11° ray, so its footprint printed a hard grey band
    across the whole map on the coarse far cells.
  - **`mountains.js`** — ridgelines, not a cone scatter. Three concentric ring
    skirts, each ONE mesh, crest line from an authored massif table softly
    unioned and cut by authored cols, swept by a hand-authored down-slope
    profile. Only the inward face exists. 63 meshes → **1 draw call**, and
    50–75 % fewer triangles.
  - **`trees.js`** — 3-tier distance LOD: real branched geometry within 90 m,
    tilted multi-card canopies to 250 m, crossed cards beyond. Conifers are a
    bare spar with drooping tiers and a leader spire.
  - **`barriers.js`** — real corrugated **W-beam** Armco (the old rail was a
    flat 2-vertex strip with a faked normal — that is why it read as white
    tape), profiled posts, reflectors, tyre walls with cover straps, modular
    concrete blocks for the street circuit.
  - **`roadwork.js`** — the road has **camber** for the first time (see the
    vertical-budget note at the top of that file — the whole crown has to fit
    in 3 cm between the terrain and the tyre contact patch). Plus authored
    paving-lane joints, cold joints and resurfacing patches cut into the mesh
    as real sections, and proper ribbed racing kerbs (~11 cm, cast ribs, not a
    sine on a 5 cm lip).
  - **`groundcover.js` (new)** — the layer that did not exist: tufts, shrubs,
    flower drifts, hedgerows, post-and-wire fences, telegraph routes, farm
    tracks between the road edge and the treeline.
  - **`stands.js`** — grandstands as raked decks under a visible roof truss,
    and a pit complex with garage bays, awning, pit wall and marked lane.
  Cost: scene triangles 65–229 k → 190–427 k, but **draw calls DOWN** (gp
  1011 → 654, parco 1179 → 806, sprint 1065 → 759). Track rebuild 1.2 s →
  ~1.8 s (menu-time only).
  Bugs found and fixed while integrating, all worth remembering:
  (1) the new edge-line/verge strips were wound face-DOWN, so every white line
  was backface-culled and simply did not draw — same class as the 2026-07-24
  gravel-trap normals and the 2026-07-25 seam ribbons, so this run added
  **`scripts/facing-check.mjs`**, which measures the down-facing share of every
  single-sided mesh's flat area on all six circuits; it immediately found three
  of parco's four gravel traps still inverted, now fixed by `ensureFaceUp()`
  in track.js, which flips the index order if it measures the strip facing
  down instead of hand-authoring a per-side rule;
  (2) sponsor boards were yawed to the direction of travel, so an 8 m hoarding
  ran ACROSS the track and aimed its logo down the road at nobody;
  (3) the start gantry banner faced forward, i.e. every driver read
  "XIRP DNARG RECAR" through the back of the cloth;
  (4) desert buttes cast shadows: 60–150 m of rock under an 11° sun throws a
  300–760 m shadow, which the car-following shadow box clipped into a grey
  slab — they are backdrop, so `castShadow = false`.
  New tools: `scripts/perf.mjs` (per-track draw calls / triangles / programs)
  and `scripts/facing-check.mjs`. Verified: build clean, `physics-test` 23/23
  incl. no console errors, `track-geometry` all OK, facing-check clean on all
  six, audit + viewshots on all six circuits.

  **Cars, same session.** `loftBuilder.js`, `parts.js` and `texgen.js` were
  rebuilt and all three archetypes re-authored against them:
  - **The panoramic glass roof is gone** (top Backlog item). `halfProfile` is
    now a surfaced profile — key stations can declare a rocker **sill**, an
    arch **flare** and a character **crease**, each of which is also a TANGENT
    BREAK (the profile starts a new spline run there AND `buildLoftHull`
    duplicates the vertex column, so `computeVertexNormals` cannot smooth over
    the crease — with only the first half you get the shape and none of the
    read). `buildGreenhouseShell` takes a **`panes`** array with a `topFrac`,
    so the cars now have a windshield, a side window per flank and a backlight
    with a PAINTED crown between the roof rails, plus `buildWindowSeals`.
    Author seam paths against `profileFractions(keys)`, never against literal
    fractions — the landmark indices move when a car declares surface features.
  - **The drooping nose is gone** (the rest of that Backlog item): the forward
    stations end in a real fascia with a defined leading edge.
  - New parts: `buildInterior` (the cabin was empty glass over nothing),
    `buildDoorFurniture`, `buildBodyVents`, `buildWipers`, `buildTowEye`,
    `buildAerial`; every existing builder upgraded in place (recessed light
    clusters, a duct-mouth grille with depth, wheel wells with an arch lip).
  - `makePaint`: `clearcoatRoughness` 0.085 → **0.135** and `envMapIntensity`
    1.12 → **0.82**. The old values were tuned when the hood and roof were
    curved; against the re-authored FLAT hood/roof/deck planes a near-mirror
    clear coat aimed at the sky clipped to a solid white slab under ACES.
  - `buildMirrors` housing moved to `makeTrim`: a 16 cm convex box aimed
    up-and-outboard is the worst possible shape for a clear coat under this
    sky, and it clipped to a white sticker on the A-pillar. Both cars also had
    the pod ON the beltline crease (`hip` now runs y 0.44-0.50), poking into
    the glass line — a door mirror mounts on the door skin just BELOW the belt.
  - Cost: ~18 k → ~24-25 k triangles per car.
  Verified: smoke OK (no NaN, outward winding), physics-test 23/23, build
  clean, inspect + viewshots on all angles.

  Two harness notes for the next run: `scripts/smoke-car.mjs`'s `findHull` now
  requires an INDEXED geometry (mergeByMaterial's baked meshes are bigger than
  the hull but non-indexed, and the winding check crashed on them); and
  `physics-test.mjs` will die with "Execution context was destroyed" if the
  machine is loaded — that is the renderer being OOM-killed, not a product
  regression. Re-run it on a quiet machine before believing it.

- **2026-07-25** (accepted → `main`, owner replied "go"; was branch
  `claude/stoic-thompson-aw10sy`) —
  Panel structure on the GT and muscle cars: the *cutlines and pillar breaks*
  half of the top Backlog item ("GT body still soft in profile"). New
  `buildPanelSeams` in `src/carModels/loftBuilder.js` builds thin ribbons that
  ride the hull skin along authored `(z, profile-fraction)` paths — sampled off
  the SAME N-point polyline the hull mesh is built from, so they sit on the
  skin instead of sinking under the chords on convex sections, and offset a
  real distance along the surface normal (the standoff trick from the
  2026-07-22 canopy fix) rather than leaning on a depth bias. Each car authors
  two sets: near-black shut lines (`makeShutline`, new) around hood, doors and
  boot lid, and a body-coloured window surround (A-pillar → roof-side rail →
  C-pillar) standing proud of the glass canopy — previously the greenhouse was
  one unbroken tinted band from cowl to tail with nothing to read the cabin by.
  Three bugs found and fixed while building it, all worth remembering:
  (1) interpolating the signed side-fraction across the centre line dives
  through f=0 — down one flank to the FLOOR and back up the other — so paths
  now interpolate in a continuous ring coordinate c∈[0,2] that walks over the
  crown; (2) the ribbon quads were wound inward, so every seam was
  backface-culled and the only thing visible was the far-side seam showing
  THROUGH the glass (looked like a wide stripe on the roof — if a decal ever
  seems to render "on the wrong side", check winding before anything else);
  (3) at a corner the ribbon's width direction swings ~90° in one step and the
  band flares into a flag — fixed with a miter widen plus `roundCorners`, which
  chamfers path corners over 9 cm (also gives the door loop a realistic
  radius). New tool: `scripts/bodyshot.mjs` — tight orbit close-ups of one
  chosen car (side/flank/quarter/front34/rear34/cabin/hood/top); the routine's
  other shooters are all too far out to judge panel work. Verified:
  physics-test 23/23 incl. no console errors, smoke OK (no NaN, outward
  winding, +1.2k tris/car), build clean, before/after bodyshots on both cars +
  all five viewshot angles at race distance.
- **2026-07-24** (accepted → `main`, owner replied "go"; was branch
  `claude/f1-inspired-layouts`) —
  Owner-directed: every track's layout re-authored. Five circuits now model
  real F1 venues (owner: "inspired by actual F1 tracks"): `gp` → Interlagos
  (Senna S, Curva do Sol, back straight, infield horseshoe, climb to the
  line), `downtown` → Marina Bay (T1 flick complex, 90° blocks stepping to a
  waterfront run, Sling chicane), `alpine` → Spa (Eau Rouge/Raidillon,
  Kemmel, Les Combes, Pouhon, La Source), `dunes` → Bahrain (heavy T1 stop,
  esses, low-road complex, west climb), `parco` → Monza (Rettifilo, Curva
  Grande, Roggia, Lesmos, Ascari, Parabolica). `sprint` is now a LITERAL
  perfect oval (owner-requested exception to the no-generated-shapes rule):
  points lie on an exact stadium — two 260 m straights + two R115 semis at
  15° steps; do NOT hand-wobble it. Design lesson recorded: Catmull kinks
  come from uneven control-point spacing (keep neighbours comparable) and
  descents must not cross other legs at grade — `track-geometry.mjs` catches
  both (minGap FAIL / tiny minR). Verified: geometry all OK, physics-test
  23/23 on the new default layout, build clean, SVG plots + full
  audit-shots pass on all six.
- **2026-07-24** (accepted → `main`, owner replied "go") —
  Owner-directed interactive session: full detail/realism pass over all six
  circuits after a screenshot audit of each (new tool:
  `scripts/audit-shots.mjs` — per-track overview/oblique/on-course shots).
  Obstruction-class fixes: buttes and boulders on `dunes` were placed with no
  clearance against the circuit (one butte stood at the guardrail) — all
  scenery now uses `distToTrack`/`rectClearOfTrack` whole-circuit tests
  (buttes, rocks, buildings, grandstands, marshals, fields, huts); the pit
  complex was hard-coded for the GP circuit's dimensions and its pit wall sat
  INSIDE Sunset Speedway's wider run-off (now slides outward with `D.armco`);
  gravel-trap winding flipped normals down on one side (charcoal slabs).
  City overhaul (`downtown`): buildings rebuilt as axis-aligned merged blocks
  (podium + tower, 3 facade styles, real 3 m floor scale — the old UV mapping
  gave 0.5 m doll-house windows), storefront podiums, sidewalks + kerbs,
  instanced streetlights, zebra crossings, hazed skyline ring (sea sector
  open), and a marina: water plane, quay + railing, palm promenade, boats.
  De-mountaining: GP far ranges pushed out/lowered; sprint got warm golden
  hills + farmland (crop fields, barns, silos, hay bales); parco got a real
  forest (1300 trees banded near the circuit); dunes got scrub + saguaros and
  strata-banded buttes; alpine peaks narrower/craggier + timber chalets.
  Marshal posts at heavy corners on race circuits. Grass/sand/city ground
  noise now wrapped in `makeTileable` (kills the overhead plaid); mow bands
  softened; pit apron concrete lightened (read as a black slab); catch fence
  is arc-based (parco now gets one). Verified: track-geometry all OK,
  physics-test 23/23 incl. no console errors, build clean, before/after
  audit shots on all six tracks.

- **2026-07-22** (accepted → `main` 2026-07-24, owner replied "go"; was branch
  `claude/dazzling-albattani-ldg9cy`) — Killed the "pinched mesh fold in the
  roof just above the windshield" (a sub-item of the top Backlog entry, *GT
  body still soft in profile*). Root cause was NOT the loft geometry: hiding
  the greenhouse glass made the serrated welt vanish, proving it was the
  tinted glass canopy z-fighting THROUGH the painted roof. `buildGreenhouseShell`
  (`src/carModels/loftBuilder.js`) placed the glass *inset* 0.012 **below** the
  paint, then `makeGlass` (`src/carModels/carMaterials.js`) forced it forward
  with a strong `polygonOffset -4/-4`; on the near-flat roof crown that depth
  bias punched the inset canopy back through the paint in a zippered line. Fix:
  stand the glazing a real 0.012 **proud** of the paint along the surface
  normal (outboard in x, up over the crown) so it genuinely draws in front as a
  canopy, and drop the bias to a gentle `-1/-1` (just seals the beltline seam).
  Both directions now push the same way, so it is strictly more robust against
  the old "paint streaks bleed through the canopy" failure too. Bonus: the side
  greenhouse now reads as a distinct dark glazed volume instead of a faint tint.
  Applies to BOTH the GT and muscle cars (shared code) — verified both. The
  drooping nose and missing cutlines/pillar breaks are still open under that
  Backlog item. Verified: physics-test 23/23 (incl. no console errors), smoke OK
  (outward winding, no NaN), build clean; before/after multi-angle + glass-on/off
  isolation shots show the welt gone and a clean canopy on both cars.
- **2026-07-19** (accepted → `main`, owner replied "go ahead and push") —
  Interactive session, not a routine run: full track-catalogue overhaul.
  Every circuit is now hand-authored F1-style data (the stadium()/wavyLoop()
  generators are deleted — do not reintroduce them): the oval became a
  flowing national circuit, the street circuit a Baku-style layout, the
  sine-flower alpine loop a real pass with two switchback hairpins, the
  desert blob a Sakhir-style speedway, plus a NEW sixth track (`parco`,
  Monza-style parkland). Horizons diversified: new low `hills` preset in
  `addDistantMountains` (track.js); peaks only where thematic. New
  `scripts/track-geometry.mjs` validates layouts (corner radii, barrier
  gaps, start straightness) — run it after any tracks.js edit.
- **2026-07-16** (accepted → `main` 2026-07-19: adopted into the
  `claude/track-variety-audit` preview at the owner's direction and merged
  with it) — Tyres no longer read hollow in
  side/oblique views (top Backlog item). Root cause in `buildTemplateRaw`
  (`src/carModels/wheels.js`): the dark rim well (`barrel`) was only radius
  0.208 and 0.10 wide, so it covered just the middle 0.10 of the 0.28-wide
  tyre and stopped 0.035 short of the bead (0.243) — leaving an unbacked
  annular gap. From the `trackside`/`low` angles the upper wheel opening showed
  a thin bright rim hoop with daylight/body paint behind it instead of a
  shadowed well. Fix: widened the barrel to 0.230 × 0.18 (fills nearly
  bead-to-bead, radius tucked just inside the bead and behind the dish) and
  enlarged the mid-well back plug 0.209→0.230 to seal the annulus between the
  rotor edge and the bore. The plug's thin disc sits inside the rotor's axial
  span (±0.016) at small radii, so it never z-fights the brake face nor hides
  the caliper/rotor detail that stays proud of it. Physics stance untouched
  (`RADIUS`/`WIDTH` unchanged). Verified: smoke OK (no NaN, outward winding,
  6086→ unchanged tri budget), physics-test 23/23 (incl. "no console errors"),
  build clean, viewshots + new `scripts/wheelshot.mjs` before/after showed the
  hollow ring gone and interior solidly dark on BOTH sides with brakes still
  visible; no see-through at the front-3/4 oblique.
- **2026-07-15** (accepted → `main`, owner replied "go") —
  Wheel-arch liners no longer read as black crescents pasted on the fenders
  (top Backlog item). Root cause in `buildArchLiners` (`src/carModels/parts.js`):
  the dark half-tube's OUTER edge (x = `x` + `width`/2 = 0.86+0.18 = 1.04 for the
  GT, 0.88+0.18 = 1.06 for the muscle) landed exactly on the body skin, which
  flares to hw ~1.04–1.09 at the arches — so the near-black tube was drawn flush
  on the outer painted surface, reading as a horseshoe pasted onto the fender in
  the `trackside`/`front34`/`low` shots. Fix: narrowed `width` 0.36→0.30 so the
  outer rim sits ~1.01–1.03 — tucked a few cm INSIDE the fender lip, so the liner
  recedes into shadow as a proper wheel well; and trimmed `r` 0.42→0.41 to thin
  the crescent over the tyre while keeping 0.05 clearance over the 0.36 tyre for
  suspension travel (wheels bob relative to the body; `maxSuspensionTravel` 0.3,
  so the tread must not poke through the liner crest). Verified: physics-test
  23/23, smoke OK (no NaN, outward winding), build clean, viewshots zero console
  errors; crescents gone across all 5 angles with no see-through through the
  openings.
- **2026-07-02** (accepted → `main`, owner-directed interactive session) — Big
  model-realism overhaul across cars, wheels and environment (multi-agent).
  Cars (`src/carModels/*`): the bright-grey underbody tray/splitter/diffuser
  planks are now a chamfered near-black undertray tucked inside the rockers;
  badges/plate/grille/lights re-seated ON the fascia surfaces (they floated or
  were buried); mirrors rebuilt as angular pods (were blown-out spheres);
  loft profile gained a real shoulder crease, flat hood/roof/deck planes and
  arch blisters; paint bug fixed (base roughness 0.30 multiplied the roughness
  map into a near-mirror — now 0.85). Wheels (`wheels.js`): dished faces,
  profiled tires, rotor/caliper depth. Environment (`track.js`): black monolith
  was the catch-fence strip stitching one backwards quad across the lap seam
  (now contiguous runs + analytic normals); grey sky slabs were cloud sprites
  drawn un-billboarded by GTAO's override-material prepass (clouds are now
  static quads + `hideFromOverridePasses()` helper); treeline reworked into
  clustered copses with lumpy multi-lobe canopies + instanced pines; mountains
  got leaning summits, dithered snow lines, gullies; armco/fence/boards
  darkened to weathered steel. Verified: physics-test 23/23, smoke OK, build
  clean, viewshots at 6s/9s with zero console errors.
- **2026-07-01** (preview, pending review) — Fake contact shadow fixed: every
  car was sitting on a bright light-grey **rectangular tray** at ground level
  (glaring from low/side/front angles — the `trackside`, `low`, `front34`
  viewshots). Root cause in `buildContactShadow` (`src/carModels/parts.js`): the
  blob used a straight-alpha black canvas texture on a white `MeshBasicMaterial`
  with normal blending; the premultiplied-canvas-alpha path on this GL backend
  dropped the darkening, leaving the plane's opaque white base as a solid slab.
  Rebuilt it as a **MULTIPLY-blended** plane over an *opaque* grey→white radial
  texture (falloff encoded in RGB, not alpha): the rim is pure white (a multiply
  no-op, so the plane edges vanish into the road) and the core is dark grey (so
  it multiplies the asphalt down into a soft shadow). Verified: white tray gone
  and a subtle grounded shadow present across all 5 angles + a shadow-on/off
  isolation shot; `physics-test.mjs` 23/23, smoke OK, build clean.
- **2026-06-30** (accepted → `b67eeb3`) — Sky slabs fixed: the cloud
  billboards were `THREE.Sprite`s (already camera-facing) but the cloud texture
  never feathered to the quad edges, so densely-packed puffs filled most of the
  rectangle and a backlit cloud read as a hard grey slab over the mountains
  (`front34` viewshot). In `makeCloudTexture` (`src/track.js`): (1) lightened the
  shadow-base puffs (grey ~165 → pale ~208, lower alpha) so backlit clouds stay
  luminous, (2) added an elliptical smoothstep alpha feather over the whole
  texture so the quad edge can never show, and in `addClouds` (3) dropped sprite
  opacity, raised altitude (280→420 base) and slightly shrank/pushed clouds out
  so big ones don't clip the top of frame as a band. Verified across 3 random
  cloud layouts + all 5 angles; `physics-test.mjs` 23/23, smoke OK, build clean.
- **2026-06-29** (`1579f92`) — Car paint: tamed the clear-coat sky reflection
  (`envMapIntensity` 1.55→1.12, `clearcoatRoughness` 0.04→0.085 in
  `src/carModels/carMaterials.js`) so up-facing panels keep their colour instead
  of blowing out to a white cap. Pit garages: the 12 bays were flat near-black
  void planes; rebuilt as ribbed roller-shutter doors in proud frames
  (`src/track.js`, new `makeRollerDoorTexture`), fixing a coplanar z-fight with
  the building face.
- Earlier visual work up to `ee5fa2a` (themed circuits, GTAO, paint/glass,
  mountains, asphalt/foliage) was accepted before this routine started logging.

## Backlog (open realism items — pick the highest impact)

Open items below are the un-fixed findings from the 2026-07-02 overhaul's
critique panel (its fix round was cut short by session limits — these are
confirmed against the `after-*` shots, highest impact first):

- ~~**Arch liners read as black crescents pasted on the fenders**~~ (car,
  high) — DONE 2026-07-15, accepted → `main` (see Changelog): narrowed the liner
  width so its outer edge tucks inside the fender lip (was flush with the body
  skin) + a small radius trim.
- ~~**Tires read hollow in side views**~~ (wheels, high) — DONE 2026-07-16,
  accepted → `main` 2026-07-19 (see Changelog): widened the dark rim well to back the
  full tyre bore bead-to-bead + enlarged the mid-well back plug so nothing
  shows through the opening from either side. (No sign of far-side spokes
  poking past the tyre face in the after shots.)
- ~~**GT body still soft in profile**~~ (car, high) — DONE. Cutlines and
  pillar breaks 2026-07-25 via `buildPanelSeams`; the roof "fold" 2026-07-22
  (it was the glass canopy z-fighting through the paint); the **drooping nose**
  and the soft flank 2026-07-26, by giving `halfProfile` authored sill / flare
  / crease features that are also tangent breaks. See the Changelog.
- ~~**Open-wheel car flanks still read as white planks**~~ (car, medium) —
  DONE 2026-07-26: lofted sidepods with a real undercut, multi-element wings,
  bargeboards, and exposed suspension between the tub and the wheels.
- ~~**The GT/muscle roof is entirely glass**~~ (car) — DONE 2026-07-26:
  `buildGreenhouseShell` takes a `panes` array with `topFrac`, so the glazing
  stops at the roof rail and the crown between the rails stays painted.
- ~~**Racing-line aid bleeds under the cars**~~ (env/aid, medium) — DONE
  2026-07-27, accepted to `main` (see Changelog). Root cause was not the aid: the
  car's multiply contact shadow was parented to the sprung body and spent the
  whole race buried under the asphalt, so nothing was darkening the road (or
  the aid) beneath the car. Shadow re-seated on the ground and moved to
  `renderOrder` 4; the aid itself is untouched. The "z-bleed" half was
  disproved — see the Changelog note on `polygonOffset`.
- ~~**Trackside billboards**~~ (env, medium) — DONE 2026-07-26: the boards were
  yawed to the direction of travel, so an 8 m hoarding ran ACROSS the track and
  aimed its logo down the road at nobody. Now faces the racing surface.
- **Misc polish** (low): grass mow banding is still visible as diagonal stripes
  from high cameras; the `far`/`hills` mountain presets are deliberately modest
  (de-mountaining, 2026-07-24) but now read a little too soft — worth another
  look at the value contrast if the owner wants more horizon.
- **Track rebuild is ~1.8 s** (perf, low — new 2026-07-26): was ~1.2 s before
  the scenery overhaul. Menu-time only, no effect on frame rate (draw calls
  went DOWN), but a slow phone will feel it on a circuit switch. `perf.mjs`
  measures the frame side; nothing measures build time yet.
- **Cars cost 27-33 k triangles each** (perf, low — new 2026-07-26), up from
  ~18 k, and up to 5 are on screen. Fine on the current budget; revisit with an
  LOD if the car count ever rises.
- ~~**Distant trees look like cardboard**~~ / ~~**Mountains CGI-smooth**~~ /
  ~~**Wheels toy-like**~~ / ~~**Sky slabs**~~ / ~~**White tray under every
  car**~~ — all addressed by the 2026-07-02 overhaul (see Changelog).

New findings from the 2026-07-27 run (not acted on — one change per run):

- ~~**`BODY_DROP` is measured in the wrong pose**~~ (car, medium) — DONE
  2026-07-28, accepted → `main` (see Changelog): the shell now hangs at the
  derived settled hub height from `src/stance.js`, gated by a new
  `physics-test` check and measurable with `scripts/rideheight.mjs`.
- ~~**The contact shadow does not react to airtime**~~ (car, low) — DONE
  2026-08-12 (see Changelog), pending review. It was worse than the note: the
  blob did not merely stay hard, it **climbed with the car** (world y 1.176
  with the car 1.2 m up), because the wheels it was seated from lose contact
  5 cm past the settled ride height and then hang at full droop. Now seated
  from the wheels that are actually down, remembered while airborne, and faded
  and spread with the gap through a shader uniform (MULTIPLY blending ignores
  `opacity`).
  Original note:
  it is seated
  from `mean(hub.y) − WHEEL_RADIUS`, which follows the wheels off a kerb, so a
  car launching over a sausage keeps a hard shadow directly beneath it. Fade
  and spread it with the chassis-to-ground gap.
- **`facing-check.mjs` is not deterministic** (harness, medium): mesh counts
  swing ±30 per circuit between runs on an unchanged tree, and one run flagged
  a 3648-triangle `#24272c` mesh on `downtown` as 100 % face-down that three
  other runs did not see. It cannot be trusted as a gate until the scenery seed
  is pinned — chase that intermittent `downtown` mesh once it is reproducible.
- **The 2026-07-26 golden-hour cloudscape commit (`486cfa9`) is on `main` but
  is not in this Changelog** — it landed straight on the default branch, so a
  memory-less run has no record of `src/scenery/clouds.js` or why the sky is
  authored per circuit. Worth a retrospective entry from the commit message.

New findings from the 2026-07-28 run (not acted on — one change per run):

- ~~**Every car is dropped 21.7 cm onto the grid**~~ (car/env, medium) — DONE
  2026-07-29, accepted to `main` (see Changelog): both spawn paths now place the
  chassis at `STATIC_CHASSIS_HEIGHT`, gated by a new `physics-test` check and
  measurable with `scripts/spawn-settle.mjs`. The tyre figure in the note below
  was measured 1.5 s into the fall; from the spawn frame itself it is 27 cm of
  air and 36.3 cm of drop.
  Original note:
  `gridSpawn` in `main.js` places the chassis at `frames[0].pos.y + 1.0`, but a
  settled chassis stands only **0.677** above the road
  (`stance.js` now exports this as `STATIC_CHASSIS_HEIGHT`). Measured with
  `rideheight.mjs`: on the spawn frame the tyres are 0.217 above the asphalt and
  the suspension is at full droop, so the field visibly falls onto the circuit
  at the start of every race and bounces on its springs. Nothing gates the world
  step behind a countdown, so it takes about a third of a second — enough to
  see. Spawn at `STATIC_CHASSIS_HEIGHT` plus a couple of centimetres of margin.
- **The lowest painted geometry is authored ~3 mm below the body-frame ground
  plane** (car, low): with the ride height fixed, the GT's undertray sits at
  world y −0.007 against a tyre contact patch at 0.000, and the road has a
  cambered crown (~3 cm at the centreline, `roadwork.js`), so the undertray
  still runs a little inside the asphalt between the wheels. It is hidden by an
  opaque road and far too separated to z-fight, but the underbody is authored
  as if the ground were flat. Worth trimming the tray by a centimetre if the
  car is ever seen from below (kerb launches, replays).
- **`stance.js` duplicates gravity** (harness, low): the static compression is
  derived from a local `GRAVITY = 9.82` that must match `physics.js`, which
  builds the `CANNON.World` inline. Neither imports the other. Hoist the number
  if `physics.js` ever grows a constants export.

New findings from the 2026-07-29 run (not acted on — one change per run):

- **`track.js` still carries a dead `+1.0` spawn** (harness, low): `createTrack`
  returns a `spawn` field built the old way (`frames[0].pos + tan·−6 + y 1.0`).
  Nothing reads it — `main.js` uses its own `gridSpawn` — but it is the same
  magic number this run just removed from the two live paths, so it is a trap
  for whoever wires it up next. Delete it, or point it at
  `STATIC_CHASSIS_HEIGHT`; `track.js` does not import `stance.js` today.
- ~~**Nothing gates the world step behind a countdown**~~ (game, medium) — DONE
  2026-07-30, accepted → `main` (see Changelog): a real five-column start-light
  rig on the gantry plus a 4.2 s hold.
- **`isInContact` is cleared by the visual sync** (harness, medium): see the
  Changelog note. Any probe or gate that reads wheel contact must sample it
  before calling `car.update()`. `w.raycastResult.body` survives `update()` and
  is the safer thing to test if the ordering cannot be controlled.

New findings from the 2026-07-30 run (not acted on — one change per run):

- ~~**The AI all react on the exact same frame**~~ (game) — DONE 2026-07-31
  (see Changelog): per-driver reaction to the green, plus the reverse-launch bug
  that was hiding under this item. The note below about `ai.update()` running
  during the hold turned out to be the *cause* of that bug, not a convenience.
  **Still open, the other half of this item — no jump-start rule** (game, low):
  a player already on full throttle when the lights go out gets a 0.000 s
  launch, which no human achieves and which the AI (0.245–0.433 s) never can.
  A "JUMP START" banner or a penalty for loading the throttle before the green
  would close it. Note this needs more than a check: the field is *physically*
  held by `GRID_HOLD`, so nobody can currently jump the start at all — the
  player would have to be released and then penalised.
- ~~**The start lights have no bezel or lens depth**~~ (env, low — new
  2026-07-30) — DONE 2026-08-05 (see Changelog): a flared cowl per lamp with
  the lens domed and set 0.066 m back inside it, gated by two new
  `physics-test` checks that measure the geometry rather than the light state.
  The note's "cheap: 10 short cylinders" was right, and merging them made the
  panel four draw calls *cheaper* than the flat discs it replaced.
  Original note:
  the lamps are flat `CircleGeometry` discs sitting 12 mm proud of the housing
  face. They read correctly at race distance and in the telephoto shot, but
  they are painted dots, not lamps — a shallow recessed cowl per lamp would
  catch a shadow and give them some form. Cheap: 10 short cylinders.
- **`viewshot.mjs`'s driving shots start further back than they used to**
  (harness, low — new 2026-07-30): the shooter clicks a mode, lets rAF run
  1.5 s, then hand-drives N seconds. The cars are now held for the first part
  of that rAF window, so a `6` shot frames an earlier part of the lap than the
  same command did last week. Nothing is broken and before/after pairs taken in
  the same run are still comparable, but do NOT compare a fresh `after` shot
  against a `before` PNG captured before this change and read the different
  corner as a regression.
- **`physics-test.mjs` is slow enough to matter** (harness, medium — new
  2026-07-30): the full suite takes ~8-10 minutes under SwiftShader on the
  routine's container, and node block-buffers its stdout, so a run looks
  completely dead until it finishes. Nothing to fix in the product; just do not
  assume a silent run has hung. The expensive parts are the two `__tick` pumps
  that render — see the render-stub note in the Changelog.

New findings from the 2026-07-31 run (not acted on — one change per run):

- ~~**The AI's stuck-recovery is armed by any legitimate standstill**~~ (game,
  medium) — DONE 2026-08-03, accepted → `main` (see Changelog): the fast trigger
  now wants evidence (armco within 3 m or a nose >50° off the road) plus a
  measured lack of forward progress, a blind 4 s fallback keeps a genuinely
  wedged car recoverable, the recovery is cut short once the car is free, and
  it never reverses into a car within 6 m behind.
- ~~**Nothing measures what the AI is commanded during a hold**~~ (harness,
  low) — DONE 2026-08-03, accepted → `main`: `scripts/stuckprobe.mjs` traces the
  command stream frame by frame, `ai.recovery` exposes the driver's decision
  state, and five `physics-test` gates assert on commands rather than
  positions. Only the *standstill* half is covered — a command-level trace
  **through a start** (the original wording) is still worth adding, and
  `scripts/launchshot.mjs` is the natural place for it.
- **`ai.update()`'s cost is paid for every held car anyway** (perf, negligible
  — new 2026-07-31): now skipped during the hold, which is a small free saving
  on the 4.2 s countdown. Noted only so nobody "restores" the poll for symmetry.
- **The start-line cameras are hemmed in on both sides** (harness, low — new
  2026-07-31): see the Changelog camera note. If a future run wants a real
  trackside shot of the grid, it needs a gap in the pit wall or a camera above
  the grandstand — there is no clean eye-level lateral view of the start line.

New findings from the 2026-08-03 run (not acted on — one change per run):

- ~~**A recovered car rejoins by driving back out at the wall**~~ (game,
  medium) — DONE 2026-08-04, accepted → `main` (see Changelog). It was worse than
  this note: with an 8 s window the car hits the armco *again* at 4.38 s and
  loops. The cause was not the lookahead distance but pure pursuit's `sin(α)`
  folding back past 90°, which had a crossed-up driver asking for two thirds
  of a turn. Note for the record that this item's own diagnosis ("it does not
  re-arm") was an artefact of the 4 s trace — it re-arms at 5.63 s.
  Original note:
  once the stuck-recovery releases, the car is pointing
  outward and pure-pursuit takes a moment to swing it back, so it tracks
  *further into the runoff* before it turns in. In the `stuckprobe` after-trace
  it backed clear to 8.06 m from the centreline and was at 9.85 m a second
  later, heading back toward the barrier it had just escaped.
- **A car boxed in from behind never recovers at all** (game, low — new
  2026-08-03): `carBehind` gates *both* triggers, including the blind 4 s
  fallback, so a car wedged in the armco with a stationary car inside 6 m
  behind sits at full throttle indefinitely — `physics-test` scenario 3 shows
  exactly that for its whole 3 s. In a real race the car behind moves and the
  situation clears itself, but a permanent double-wedge has no exit. A "wait
  for a gap, then go" timer would close it without re-opening the reverse-into-
  traffic hole.
- **`nearestFrameIndex` flips to a distant part of the circuit off-track**
  (game/harness, low — new 2026-08-03): the new evidence test measures lateral
  offset and heading against the *nearest centreline frame*, and where a
  circuit doubles back on itself the nearest frame can belong to another
  straight — the lateral trace jumps by ~20 m in one step. Seen repeatedly
  while building `stuckprobe`, and it is why that probe measures against a
  fixed frame instead. It only bites well outside the barriers, where the
  containment failsafe already acts, but `nearWall` / `misaligned` are not
  trustworthy out there. Tracking the last known frame index and searching
  locally around it would fix this everywhere it is used.
- **`physics-test.mjs` runtime has grown again** (harness, medium — new
  2026-08-03): the 2026-07-30 note said ~8-10 min; the stuck-recovery block
  adds three more scenarios of stepped physics on top. Still the two rendering
  `__tick` pumps that dominate. Do not run a shooter at the same time as the
  suite on this container — two SwiftShader Chromiums contend badly enough that
  `viewshot` timed out at its 30 s navigation budget during this run.

(When an item is rejected, note "tried X — rejected: Y" here so it isn't retried.)

New findings from the 2026-08-04 run (not acted on — one change per run):

- **The rejoin still costs ~2 m of outward drift** (game, low — new
  2026-08-04): the car is released at 8.05 m and swings out to 10.03 m before
  the nose comes round. Some of that is unavoidable — you cannot turn without
  a radius — but the driver is on **0.69 throttle while still 60° crossed up**
  and reaches 7.3 m/s before it is pointing down the road, which widens the
  arc. A "get it pointed before you use the power" throttle trim would tighten
  it further. **Trap if you try it:** the stuck trigger tests
  `pinned = speed < STUCK_SPEED && ctrl.throttle > 0.5`, and the only reason a
  wedged car still arms today is that the existing steer-load easing bottoms
  out at 0.69. Any deeper trim has to be applied *after* the throttle figure
  `pinned` reads, or a car nose-first in the armco stops arming a recovery at
  all — which is a far worse bug than the one being fixed.
- **Full lock past 90° is not what a driver does in a high-speed spin** (game,
  low — new 2026-08-04): the new branch is right for a low-speed recovery, but
  a car spinning at 200 km/h has its target behind the front axle too, and it
  will now ask for full lock where a driver would be counter-steering. Nothing
  in the suite covers a spin at speed — the barrier-containment gate launches
  the car at the wall but never asks what the driver does on the way. Worth a
  scenario before anyone leans on this branch harder.
- **`physics-test.mjs` is now 38 gates and ~10-12 min** (harness, medium —
  running total): the rejoin scenario adds 8 s of stepped physics, which is
  cheap next to the two rendering `__tick` pumps that still dominate. The
  2026-08-03 warning stands — do not run a shooter at the same time as the
  suite on this container, and note that `viewshot.mjs`'s third argument is a
  file **prefix**, not a directory: it will not create the parent, and fails
  with a bare exit code 2 if it does not exist.
- **Two `performance.now()` readings per frame was a general pattern, not one
  bug** (harness/game, low — new 2026-08-04): the clock fix threaded the
  frame's timestamp into the lap timer, but `tick` still re-reads the wall
  clock in `window.__tick` (fine — once per tick) and mode setup takes its own
  reading (also fine). Worth a glance if any other subsystem grows a
  "difference between two stamps" measurement: take the frame's `now`, never a
  fresh one, or the answer silently includes however long the frame took.

New findings from the 2026-08-05 run (not acted on — one change per run):

- ~~**PIN THE SCENERY SEED**~~ (harness, **high**) — DONE 2026-08-06, accepted
  → `main` 2026-08-11 (see Changelog). It was three causes, not one: the scatter, GTAO's
  denoise noise texture, and the wall-clock-phased film grain. Paired
  `viewshot` runs are now byte-identical, and perturbing one builder's stream
  moves only that builder's pixels (3.3–5.1 %, trees only). The note below was
  right that it was the highest-leverage item and roughly right about the fix
  ("a one-line seeded PRNG threaded through `src/scenery/*`") — but a single
  global stream would NOT have delivered it; see the Changelog on why the
  streams are named per builder.
  Original note:
  **PIN THE SCENERY SEED** (harness, **high** — measured 2026-08-05). This has
  been carried as a soft caveat since 2026-07-27 ("the trees move between the
  two sets, read the pairs with care"). It is much worse than a caveat.
  Measured with the new `pngdiff.mjs`: two `startlights` runs of **byte-identical
  code** differ on **44.7 %** of the rig frame and **42.6 %** of the pole frame.
  The genuine before/after pair for this run's change differs on 45.3 % and
  43.4 % — i.e. **the noise floor is the same size as the signal**, and a
  whole-frame comparison of any two shooter runs currently carries no
  information at all. Every "verified: before/after viewshots on all five
  angles" line in this Changelog is an eyeball comparison against a background
  that re-randomised underneath it. Until the seed is pinned, judge a visual
  change only inside a `--box` on the thing that changed (the housing between
  the lamps measured luma 61.00 → 61.04 here, which is what let this run claim
  nothing else on the panel moved). Pinning it is probably a one-line seeded
  PRNG threaded through `src/scenery/*`, and it would make every future run's
  verification mean something. This is the highest-leverage open item in the
  file.
- **A car's shadow on the asphalt measures 21 % and is still invisible**
  (env/car, medium — new 2026-08-05). Chased because the `high` and `front34`
  viewshots look like the cars are not casting at all while every armco post
  and tree beside them throws a 6 m golden-hour shadow across the grass. They
  *are* casting: an isolation run with the fake contact blob hidden and the
  cars' `castShadow` toggled changes **2.57 %** of the frame, and the shadowed
  asphalt measures luma **29.8 → 23.6**, a 21 % darkening in the right place
  and the right shape (the amplified diff shows a clean car-shaped shadow
  stretching off to the side). It simply does not read, because asphalt is dark
  enough that removing a sun which strikes it at 11° costs almost nothing a
  viewer can see, while the same shadow on bright grass is unmistakable. So the
  net effect is that every car in the game carries a soft blob directly beneath
  it — a noon shadow — under a golden-hour sun. **Do not chase this by eye
  under SwiftShader** (the harness note at the top of this file is explicit
  that tone is not representative here); it needs either a real-GPU check or a
  deliberate decision about the sun/ambient balance on the road material. Worth
  knowing before touching it: `road.receiveShadow` is set and works, the sun's
  90 m shadow box follows the player, and all five car meshes that should cast,
  do. Nothing is broken — the question is only whether the balance is right.
- **`castShadow` is off on most of the car** (car, low — new 2026-08-05):
  of a GT's 20 meshes only 5 cast (11810 of 15072 triangles). The hull and one
  merged decoration batch cast; glass, lights, trim, the wing and the wheels do
  not. That is a defensible budget choice, but it means the shadow silhouette
  is missing the rear wing entirely — the most distinctive part of the
  car's outline. Cheap to reconsider if the shadow finding above ever gets
  acted on; pointless before then, since nothing reads on the road anyway.

New findings from the 2026-08-06 run (not acted on — one change per run):

- **Only `viewshot.mjs` pins the film grain** (harness, medium — new
  2026-08-06): the grain phase fix is four lines in the shooter's freeze block,
  and every other shooter that renders through the composer still has the
  wall-clock phase — `startlights.mjs`, `bodyshot.mjs`, `wheelshot.mjs`,
  `scene-shot.mjs`, `skyshot.mjs`, `lineshot.mjs`, `launchshot.mjs`,
  `shoot.mjs`, `audit-shots.mjs`. Their output is *scenery*-stable now, but
  still carries a full-frame grain difference between runs, so a `pngdiff` of
  two of their PNGs will read a few percent that means nothing. Lift the pin
  into a shared helper — which is overdue anyway, since `findChrome()` is
  copy-pasted into nine shooters with three different bodies (that is how
  `audit-shots.mjs` ended up macOS-only, fixed this run).
- **`facing-check.mjs` should be re-tested as a gate** (harness, medium —
  updated 2026-08-06): the 2026-07-27 note parked it because "mesh counts swing
  ±30 per circuit between runs on an unchanged tree" and blamed the unpinned
  seed. That is now fixed — `physics-test` measures `gp` at exactly 223 meshes
  across rebuilds — so the swing should be gone and the intermittent
  100 %-face-down `downtown` mesh should either reproduce every run or not at
  all. Worth 20 minutes to find out; it would give the suite a real
  winding/normals gate.
- **The scenery is now reproducible but still unauthored** (env, low — new
  2026-08-06): pinning the seed means each circuit's scatter is *a* fixed
  arrangement, not a *good* one — `gp`'s tree stand happens to sit further from
  the main straight than it did before, which is neither better nor worse. Now
  that a change to one builder provably moves only that builder's pixels, it is
  finally cheap to iterate on a scatter and see the result. Composing the
  treeline against the horizon on `gp` is a reasonable first target.
- **`strSeed` and `rng.js` are two seed systems** (harness, low — new
  2026-08-06): `track.js` keeps its own `strSeed(def.id)` for the terrain
  displacement, which predates `rng.js` and does not go through it. Harmless —
  both are deterministic per circuit — but there is no reason for two. Fold
  `strSeed` into `rng.js` next time either is touched.

New findings from the 2026-08-12 run (not acted on — one change per run):

- ~~**Nothing on any circuit can launch a car**~~ (game/env, medium) — DONE
  2026-08-17 (see Changelog), pending review: the kerbs, and only the kerbs,
  now have collision geometry, built from the same runs the mesh is. A car run
  wide over one at 90 km/h gets down to **two** wheels on the ground. The
  note's other half — the camber and `terrain.js` — is still true and is
  carried forward as its own item below.
  Original note:
  measured while checking the airtime fade, over 6 s of four-car
  racing on `gp`, **every wheel of every car is in contact on every single
  frame** (`minContacts` 4, zero frames with a wheel up). The physics ground is
  one flat `CANNON.Box` — kerbs, the road's camber, the sausages and all of
  `terrain.js`'s relief are **visual only** — so the only airtime in the game
  comes from car-to-car contact or a barrier hit. That is why this run's probe
  has to hold the car at a height by hand rather than jump it off something.
  It also means anything that models suspension travel, kerb strikes or airtime
  has almost no opportunity to show itself. Giving the kerbs (and only the
  kerbs) collision geometry would be the smallest version of this: ~11 cm of
  ribbed lip is enough to unsettle a car that runs wide, and it would make
  riding the kerb a decision instead of a free line.
- **The contact blob is still a noon shadow under an 11° golden-hour sun**
  (env/car, medium — new 2026-08-12): it now leaves the ground correctly, but
  while the car is *on* the ground the blob is centred directly beneath it,
  where the real sun would throw the shadow several metres to the side. This is
  the same balance question as the 2026-08-05 finding above (a car's real
  shadow measures a 21 % darkening on asphalt and still does not read), and the
  two should be decided together — the blob exists to stand in for a shadow
  that does not read. Now cheaper to experiment with than it was: the fade
  uniform and the ground seating are both in one place in `car.js`, and
  skewing/offsetting the blob along the sun direction is a couple of lines.
- **`raycastResult.hitPointWorld` is the ground, and nothing else used it**
  (harness, low — new 2026-08-12): every probe and gate in the suite infers the
  road from hub heights or from `frames[i].pos.y`. The suspension raycast has
  already measured it exactly, per wheel, and its result survives
  `updateWheelTransform` (unlike `isInContact`). Worth reaching for the next
  time something needs to know where the road is under a car.

New findings from the 2026-08-11 run (accept-and-merge only — no product change):

- **The routine skipped four consecutive days waiting on one review**
  (process, medium — new 2026-08-11): the 2026-08-06 preview sat un-merged
  until 2026-08-11, and the skip rule is deliberately silent, so the runs of
  08-07 through 08-10 each fetched, saw `OPEN: claude/epic-franklin-kx43xh`,
  and stopped without a word. That is the rule working as written — but the
  cost is four idle days that look identical to four healthy ones from the
  owner's side. Worth considering a **one-time** nudge (not a daily one) if a
  preview goes unreviewed for, say, three days: enough to distinguish "you have
  something waiting" from "nothing to report", without turning the skip into a
  daily nag. Do not make this a per-run notification.
- **Nothing in the harness verifies a merge** (harness, low — new 2026-08-11):
  this run re-ran the full suite on the branch tip before merging
  (physics-test 43/43, smoke, build, paired viewshot) because pushing to `main`
  is the one irreversible step, and none of that is scripted — it was assembled
  by hand from the notes at the top of this file. A `scripts/preflight.mjs`
  that runs build + smoke + physics-test + a paired-viewshot determinism check
  and prints one verdict would make the accept step a single command.
- **The paired-viewshot determinism check is now a two-line proof and should be
  used** (harness, low — new 2026-08-11): `viewshot 6 <prefix>` twice, then
  `md5sum` the pairs. Confirmed here independently of the run that built it —
  all five angles identical (`chase 9fbe73c8…`, `front34 970cff9f…`,
  `high 373cb9d3…`, `low 075d9e63…`, `trackside 7db2c822…`), `pngdiff` 0
  changed pixels on every one. Note the second argument to `viewshot.mjs` is a
  filename **prefix**, not a directory — `…/shots/a` writes `…/shots/a-chase.png`.

New findings from the 2026-08-17 run (accept-and-merge only — no product change):

- **The 2026-08-12 preview sat five days, and the run that built it never got
  to say so** (process, medium — new 2026-08-17): pushed 08-12, accepted 08-17.
  The runs of 08-13 through 08-16 each fetched, saw
  `OPEN: claude/epic-franklin-jlxl9v` and stopped silently — the same pattern
  the 2026-08-11 finding describes, second time in two reviews, so the
  **one-time nudge that finding proposed is no longer hypothetical and should
  be built**. Concretely: on a skip, if the open branch's tip commit is older
  than 3 days *and* no nudge has been sent for that branch, send exactly one
  notification naming the branch and the preview link, then record it (a line
  in this file under the Changelog entry is enough state — the branch name is
  the key, and it is already unique per preview). Still no daily nag: one
  notification per preview, ever.
- **`airshadow.mjs`'s first shot renders black** (harness, low — new
  2026-08-17): re-running the probe on the branch tip, `air-grounded.png` came
  out a uniform near-black frame while `air-hop` and `air-launched` — same run,
  same code — are both correct. It is the shooter warming up, not the product:
  the script calls `page.setViewportSize(1100×800)` and then renders
  immediately, so the first `composer.render()` goes through render targets
  that are still the old 640×480 size. The grounded case is independently
  proven fine by the physics-test gate (fade 0, scale 1, blob y 0.030, drawn)
  and by the paired viewshot against `main`, so nothing about the accept turns
  on it. Fix when next in that file: one `waitForTimeout` (or a throwaway
  render) after the resize, before the shot loop. Worth checking whether
  `bodyshot`/`lineshot`/`wheelshot` resize the same way — if they do, their
  first frame is suspect too, and that would explain any past "the first angle
  looked wrong" note.
- **`airshadow.mjs` silently does nothing if you pass the shot prefix first**
  (harness, low — new 2026-08-17): its signature is
  `airshadow.mjs [heights,csv] [shotPrefix]`, and `scripts/viewshot.mjs` takes
  `[seconds] [prefix]` — so the natural `airshadow.mjs <prefix>` parses the
  path as the heights CSV, `Number()`s it to NaN, filters it out, and prints a
  bare header with **no rows, no shots and exit 0**. It reads as a broken probe.
  Any script that filters its parsed arguments should fail loudly when the
  filter empties the list.

New findings from the 2026-08-17 kerb run (not acted on — one change per run):

- **Everything except the kerbs is still decoration** (env, medium — new
  2026-08-17): the kerbs are now the *only* relief the physics can feel. The
  road is still dead flat to a tyre while it is drawn with a 2.4 cm crown, and
  all of `terrain.js`'s rolling ground outside the circuit is still fiction — a
  car on the grass is on a billiard table. The 2026-08-12 note's headline ("the
  physics ground is one flat `CANNON.Box`") is only half-retired. The honest
  next step is a real ground surface: a per-frame road plane (the centreline
  frames already carry everything needed) or a cannon `Heightfield` for the
  terrain. Note the kerb slabs would then need to sit on the road's height
  rather than assuming y=0, which is one line in `buildKerbCollision`
  (`baseY`).
- **Nothing knows whether the AI ever uses a kerb** (game, medium — new
  2026-08-17): riding a kerb now has a cost, and the paired `viewshot` over 6 s
  came back 0 changed pixels, which means the *player's* line never touched
  one. Whether any AI does is unmeasured — it follows `racingLineOffset`, which
  may or may not reach the kerb at an apex. If it never does, this change only
  ever shows itself when a human runs wide, which is worth knowing before
  anyone builds on it. A `stuckprobe`-style trace of each car's lateral offset
  against `track.kerbActive` over a lap would settle it.
- **`sprint` has no kerbs at all** (env, low — new 2026-08-17): it is the one
  circuit with `theme.kerbs === false`, so it gained nothing here — 0 collision
  boxes, and no kerb drawn at any corner either. That is pre-existing and may
  well be deliberate, but it now also means `sprint` is the only circuit where
  running wide costs a driver nothing at all.
- **A dropped ray reads a parked car as ground** (harness, low — new
  2026-08-17): the new "racing surface stays flat" gate went red at **962 mm**
  on its first run — a car left on the circuit by an earlier scenario, measured
  at the roof. Any probe that drops a ray to find the road needs
  `body.collisionResponse = false` on the cars first; that is exactly how
  `RaycastVehicle` hides its own chassis from its own suspension ray. Same trap
  as the 2026-07-29 `isInContact` one: the suite's scenarios leave state behind.
- **The kerb is a step, not a rumble** (env/car, low — new 2026-08-17):
  deliberate — a 1 m rib pitch at 40 m/s is 40 Hz against a 120 Hz step, so
  simulating the ribs would alias into noise rather than model anything. But it
  does mean riding a kerb is felt as one smooth 10.5 cm platform where a driver
  feels the vibration first. The right home for that is probably not the
  collision at all: `main.js` already classifies the wheel as being on the
  `kerb` surface, so a rumble could be driven off that as a camera/audio
  effect, for free and at any frequency.

Re-verified on the branch tip before merging to `main` (nothing is scripted yet
— this is the `scripts/preflight.mjs` the 2026-08-11 finding asks for, still
assembled by hand): `physics-test` **45/45** incl. no console errors, smoke OK
(no NaN, outward winding, 24880/24228/21778), `npm run build` clean, two
`viewshot 6` runs **byte-identical** on all five angles (0 changed pixels,
maxDelta 0), `main` vs branch at 6 s `chase`/`front34`/`low` **0 changed
pixels** and `high`/`trackside` **5 pixels** (maxDelta 20 / 39) — reproducing
the branch's own figures exactly, in a fresh container, which is a second
independent confirmation of both the seed pin and that 0.27 mm explanation —
and `airshadow`'s sweep: blob world y **0.030 at every height from 0 to 2.5 m**,
contacts 4 → 0 between 0.05 and 0.15 m, fade 0 → 1, scale 1 → 1.6, drawn until
0.8 m.

New findings from the 2026-08-22 run (accept-and-merge only — no product change):

- **The preview link served *production*, not the branch under review, for four
  days** (process, HIGH — new 2026-08-22). This is why the kerbs preview sat
  unreviewed from 08-17 to 08-22, and it will happen again unless the workflow
  changes. `deploy-preview.yml` fires on a push to **any** `claude/**` branch
  and publishes every one of them to the **same** `preview/` directory. On
  2026-08-18 01:40 UTC a push to `claude/git-commit-author-config-opi6b7` — the
  owner's own git-identity commit, branched off `main`, with no product change
  in it — rebuilt `main` and overwrote the kerbs preview from 08-17 09:30.
  Measured on the `gh-pages` branch, which is literally what Pages serves:
  `preview/index.html` loaded `assets/index-Bgun-15k.js`, **the same entry
  chunk `index.html` at the repo root (production) loads**, while the kerbs
  build was `assets/index-CDSbzh1u.js`. Independently confirmed this run by
  building the branch tip: `npm run build` emits `index-CDSbzh1u.js`, so the
  chunk that was missing from the preview is provably this branch's.
  **The fix is one line and should be the next process item:** give the
  workflow `destination_dir: preview/${{ github.ref_name }}` (or a slug of it)
  so each preview branch owns its own URL, and have the run send *that* URL
  rather than the shared one. Until then, know the failure mode: **any push to
  any `claude/**` branch destroys the preview currently under review**, which
  also means a run that is skipping must not push anything at all — the skip
  run of 08-21 deliberately committed nothing for exactly this reason, and that
  is why its two findings had to wait for this entry to be written down.
  Worth noting the routine cannot repair this itself: re-running the older
  deploy needs `actions: write`, and the API returned
  **403 Resource not accessible by integration** to this session.
- **The one-time nudge was sent for `claude/epic-franklin-mrmtk5` on
  2026-08-21** (process — new 2026-08-22, closing the 2026-08-11 and 2026-08-17
  findings). This is the durable record those findings asked for, keyed by
  branch name: **no further nudge for that branch, ever.** The mechanism now
  has one run of evidence behind it and it worked — the nudge is what surfaced
  the clobbered preview above, four days into a stall that would otherwise have
  looked identical to a healthy day from the owner's side. But note the gap it
  exposed: **a skip run has nowhere to write this record.** It cannot push to a
  `claude/**` branch (that clobbers the preview, per the finding above) and it
  must not push to `main`, so the nudge state lived only in the notification
  until this accept run could commit it. If a second preview goes quiet before
  the next accept, the routine will have no way to tell whether it already
  nudged. Fixing the preview directory fixes this too, since a skip run could
  then commit a one-line record to its own branch harmlessly.
- **`pngdiff`'s "0 changed pixels" and "byte-identical" are NOT the same
  claim, and this file has been using them interchangeably** (harness, medium —
  new 2026-08-22). `pngdiff.mjs` counts a pixel as changed only when it differs
  by **more than 6 summed over RGB** (its own header says so, line 15). So a
  frame can read `changed: 0, pct: 0` and still have a different md5. Measured
  here: pre-airshadow `main` (`2d05525`) against current `main` reads
  **`chase` 0 changed pixels — but `maxDelta` 2**, and the two md5s differ
  (`9fbe73c8…` → `a0e0a598…`). Same for `front34`. The 2026-08-17 entry's
  "`chase`/`front34`/`low` **0 changed pixels**" reproduced exactly this run and
  was correct as written; what it was not is a byte-identity claim, and the
  2026-08-11 md5 method is the stricter of the two. **Read `maxDelta`, not just
  `changed`** — a maxDelta of 0 is the only real "nothing moved".
- **The seed pin holds across six weeks and three containers** (harness,
  positive — new 2026-08-22). All five md5s the 2026-08-11 entry wrote down
  reproduced **exactly** at `2d05525` in this container today —
  `chase 9fbe73c8… front34 970cff9f… high 373cb9d3… low 075d9e63…
  trackside 7db2c822…`. That is a third independent confirmation, and it means
  a recorded md5 in this file is a usable long-lived baseline, not just a
  within-run one. Worth re-shooting an old commit rather than assuming, though:
  it took one `viewshot` run to settle a question the md5s alone made look like
  a regression.
- **`viewshot` cannot see the kerb change at all, and that is the correct
  result** (harness — new 2026-08-22). `main` vs the branch tip at 6 s is **0
  changed pixels and maxDelta 0 on all five angles**, and the two sets of md5s
  are equal. Nothing is wrong: `physics-test` measures max centreline deviation
  at **2.8 m** over 45 s of AI running and the kerbs sit ~8 m out, so no car in
  a normal 6 s run gets within 5 m of a kerb. **A future run must not read this
  as "the change did nothing"** — the feature only appears when a car is put
  over the kerb line deliberately, which is what `kerbprobe.mjs` does. The
  general lesson for the rotation: a physics-only change has no `viewshot`
  evidence, so the routine's standing "verify with multi-angle screenshots"
  step needs a purpose-built shooter for those, exactly as `stuckprobe` and
  `airshadow` were built for theirs.
- **`sprint` reports `kerbBoxes 0` and that is correct, not a gap** (harness —
  new 2026-08-22). Checked because it looks alarming next to gp's 1504 and
  because all six themes carry `kerbs: true`. Measured drawn kerb vertices
  against collision shapes on every circuit: gp 22420/1504, **sprint 0/0**,
  downtown 25300/1680, alpine 22380/1496, dunes 22600/1504, parco 29280/1944.
  `sprint` draws **no kerbs at all** — `computeKerbActive(curvature, 0.00045, 8)`
  finds no corner tight enough — so drawn and collision agree there too. Every
  circuit that draws a kerb has collision for it.
  **The gap that is real: nothing in the suite checks that agreement anywhere
  but `gp`.** The "collision kerb is the kerb that is drawn" gate runs on one
  circuit (884 samples, idx 86). A cheap and worthwhile next gate is the
  drawn-verts-vs-`kerbShapes` pairing above across all six — it is one
  `traverse` and it would catch a theme or threshold change that silently
  leaves a circuit with kerbs you can see and drive through.

Re-verified on the branch tip before merging to `main` (still assembled by hand
— `scripts/preflight.mjs` remains unbuilt): `physics-test` **48/48** incl. no
console errors, `smoke-car` OK (no NaN, outward winding, 24880/24228/21778
unchanged), `npm run build` clean, two `viewshot 6` runs **byte-identical** on
all five angles, `main` vs branch **0 changed pixels / maxDelta 0** on all five,
and `kerbprobe` on **all six circuits**: agreement **−3.3 … +14.8 mm** with
**0 samples below the drawn mesh** anywhere (that is the fault that matters — a
hole a wheel drops through), 602–654 bodies, 42–57 % of the lap kerbed on the
five kerbed circuits. Running wide at 6°: 23–51 frames of 300 with a wheel off
the ground at 90/150/220 km/h, peak roll 3.0–3.5°, no launch and no roll-over.
