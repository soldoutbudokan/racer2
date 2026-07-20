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

- **2026-07-16** (adopted into the `claude/track-variety-audit` preview on
  2026-07-19 at the owner's direction; original preview branch deleted) —
  Tyres no longer read hollow in
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
  riding the `claude/track-variety-audit` preview (see Changelog): widened the dark rim well to back the
  full tyre bore bead-to-bead + enlarged the mid-well back plug so nothing
  shows through the opening from either side. (No sign of far-side spokes
  poking past the tyre face in the after shots.)
- **GT body still soft in profile** (car, high): no hood/door cutlines or
  pillar breaks, nose droops to a rounded point, and there is a pinched mesh
  fold in the roof just above the windshield.
- **Open-wheel car flanks still read as white planks** (car, medium): the
  side-pod/chassis construction predates the overhaul standards.
- **Racing-line aid bleeds under the cars** (env/aid, medium): the green
  stripe z-bleeds beneath the rear bumper and glows at tire contact patches
  under the multiply contact shadow. Keep the aid + its colours (it is a
  control); just raise its lift/mask it under car footprints.
- **Trackside billboards** (env, medium): the dying fix agent DID land edits
  here (sponsor faces, weathered backs) but never verified them — spot-check
  boards from both sides on the next run; one panel may still float above its
  stub posts.
- **Misc polish** (low): grass banding seams at high angles; 1-2px needle
  spikes on two mountain summits; distant sponsor banners render as magenta
  confetti dashes at the horizon. (Grandstand back-wall gap and noise-texture
  tile seams got unverified fixes on 2026-07-02 — re-verify rather than redo.)
- ~~**Distant trees look like cardboard**~~ / ~~**Mountains CGI-smooth**~~ /
  ~~**Wheels toy-like**~~ / ~~**Sky slabs**~~ / ~~**White tray under every
  car**~~ — all addressed by the 2026-07-02 overhaul (see Changelog).

(When an item is rejected, note "tried X — rejected: Y" here so it isn't retried.)
