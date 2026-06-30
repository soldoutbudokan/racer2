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

- **2026-06-30** (preview, pending review) — Sky slabs fixed: the cloud
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

- ~~**Sky slabs when facing the sun**~~ — addressed 2026-06-30 (cloud-texture
  alpha feather + lighter shadow base + higher placement). A faint feathered
  cloud rim can still clip the very top edge of frame in some toward-sun views,
  but it now reads as a soft puff, not a hard slab. Re-open only if review finds
  it still distracting.
- **Distant trees look like cardboard** (env): the far treeline is single flat
  billboards in near-straight rows. Vary spacing/scale/yaw and use crossed
  planes (already used for near foliage) so they read as 3D canopies.
- **Mountains a touch CGI-smooth** (env): recently improved but the snow/rock
  transition and silhouette could use more erosion/texture variation.
- **Car wheels/rims read slightly toy-like** (car): rim depth, tyre sidewall
  lettering, and brake-disc/caliper visibility could be richer.

(When an item is rejected, note "tried X — rejected: Y" here so it isn't retried.)
