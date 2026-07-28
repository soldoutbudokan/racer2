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
```

The visuals render through SwiftShader here, which is representative of the
deployed build but not pixel-identical to a real GPU — judge gross issues
(blow-outs, black voids, z-fighting, floating geometry), not subtle tone.

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

- **`BODY_DROP` is measured in the wrong pose** (car, medium): `index.js` drops
  the body shell a constant 0.37 below the chassis, but that number was taken
  on the grid with the suspension at full rest length. Loaded, the hub sits
  only ~0.31 below the chassis, so the painted shell rides ~6 cm lower over its
  wheels than intended for the whole race — the arches sit closer to the tyres
  than the author saw. Re-measure at the settled ride height (`physics-test`
  reports `settleY` 0.68) and re-author, checking the arch/tyre clearance
  against `maxSuspensionTravel`.
- **The contact shadow does not react to airtime** (car, low): it is seated
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

(When an item is rejected, note "tried X — rejected: Y" here so it isn't retried.)
