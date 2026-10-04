# Car and circuit modelling audit

This pass covers all four car bodies and all six circuits. It combines a source/geometry audit, deterministic full-world construction tests, and a CI capture workflow. The driving model and the authored circuit centrelines remain unchanged.

## Changes and findings

| Area | Finding | Change |
| --- | --- | --- |
| Road-car wheel arches | Body hulls overlapped the wheel openings. | Cut real cylindrical apertures into the GT, hatch and muscle shells and added painted arch returns. |
| Road-car glazing | Opaque hull geometry behind the glass hid the existing cabins. | Cut real window-pane apertures into the backing hull and set glass opacity to 72%, exposing the existing interiors. |
| Wheels and tyres | The rally and open-wheel cars needed distinct wheel/tyre detail. | Added eight-spoke rally wheels and a slick-tyre normal map for the single-seater. All four cars appear in the same controlled side/front/rear review. |
| City buildings | Most buildings used simple stacked cuboids, producing similar silhouettes across the city. | Three neighbourhood families: clipped office towers, stepped residential buildings with balconies, and masonry blocks with cornices. Added retail bases, plant rooms, roof detail and planted terraces. |
| City public space | Empty lots and the waterfront provided little sense of scale or a complete place. | Planted squares, more coherent district streets, and a modelled marina with waterfront structures and vessels. |
| Race markings | Starting grid, finish line and crossings used flat planes above the road crown. | Shared camber-following marking geometry; merged starting-grid paint. |
| Braking boards | Board fronts faced the direction of travel, showing their backs to approaching drivers. | Faces now point against the approach tangent. Tested on every circuit that uses them. |
| Dunes scenery | Mesa cap triangles faced downward. | Corrected cap winding so the top faces render from above. |
| Forest coverage | Fixed forest bounds ended before the far sections of Alpine and Parco. | Forest extent now covers the actual circuit bounds without increasing its configured population. |
| Pit/forest overlap | Rendered review found tree crowns intersecting the Speedway garage after the forest change. | Derive the pit exclusion volume from its actual geometry and remove vegetation whose complete transformed bounds overlap it, at every LOD. |
| Country-circuit identity | Five circuits relied heavily on the same generic race infrastructure. | Added small, batched venue buildings with independent footprint clearance checks. |

## Circuit-by-circuit scope

| Circuit | Modelling work | Layout audit |
| --- | --- | --- |
| Autodromo (`gp`) | Modern race-control building, observation terrace, glazed timing room and roof equipment. | 2,691 m lap; 31.4 m minimum nonadjacent centreline gap; 0.45° start heading drift. |
| Sunset Speedway (`sprint`) | Lattice observation/scoring tower with raised platform and structural bracing. | Preserved the authored stadium oval; 1,464 m lap; 54.8 m gap; 1.25° start drift. |
| Marina Street (`downtown`) | Rebuilt frontage and district architecture, squares and marina. | 2,630 m lap; 36.3 m gap; 0.38° start drift. |
| Alpine (`alpine`) | Timber lodges, roof construction and forest extent correction. | 2,862 m lap; 41.7 m gap; 0.09° start drift. |
| Dunes (`dunes`) | Tensile paddock pavilion, wind towers and corrected mesa tops. | 2,710 m lap; 40.8 m gap; 0.00° start drift. |
| Parco (`parco`) | Heritage pavilion, roof/cupola detail and forest extent correction. | 2,879 m lap; 48.1 m gap; 0.93° start drift. |

The gap test excludes neighbours within 25 centreline samples and compares the remaining gaps with twice the barrier offset. All six layouts pass. Five layouts have existing corners tighter than the approximate 18 m guidance in `tracks.js`: GP 16 m, downtown 14 m, Alpine 13 m, Dunes 15 m and Parco 13 m. This is recorded as an existing design constraint; widening those corners requires a separate driving/layout decision and validation.

## Automated geometry evidence

`node scripts/world-audit.mjs` constructs the real scenery, Three.js buffers and Cannon bodies for every track. Only canvas painting is stubbed, using the same approach as the existing AI suite. This allows geometry checks without pretending to test rendered pixels.

The audit checks:

- Finite position, normal, colour, UV and instance buffers; valid indices and bounding volumes; finite world and physics transforms.
- Upward road and edge triangles, road clearance over the terrain, and crown-following marking positions. Deliberately worn-away edge paint may collapse; structural asphalt may not.
- Upward finish/grid/crosswalk triangles and brake-board fronts facing approaching traffic.
- City footprint clearance against all sampled circuit segments, including midpoints.
- Independent exact segment-to-oriented-footprint clearance for all new country-circuit buildings; tree-instance origins kept outside those footprints at every LOD.
- Full transformed vegetation bounds against the pit complex at every LOD, including canopy width, instance scale and spatial-batch offsets.
- Complete disposal of owned geometry, materials and textures, and removal of scene nodes and physics bodies.
- Whole-world resource ceilings of 96 MiB geometry buffers, 1,000 meshes, 256 materials and 96 textures. These include all LOD levels and are not per-frame draw calls or GPU timings.

The complete-world run after the architecture and marina changes passed:

| Circuit | Meshes | Unique geometries | Buffer MiB | Materials | Textures |
| --- | ---: | ---: | ---: | ---: | ---: |
| GP | 537 | 169 | 16.6 | 84 | 46 |
| Speedway | 492 | 205 | 10.4 | 69 | 38 |
| Downtown | 301 | 149 | 28.6 | 91 | 48 |
| Alpine | 405 | 134 | 16.6 | 55 | 30 |
| Dunes | 257 | 109 | 11.2 | 59 | 36 |
| Parco | 600 | 150 | 15.7 | 79 | 44 |

All 48 braking boards faced correctly. All 23 road-marking meshes faced upward. The 905 city building footprints remained at least 2.73 m beyond the barrier envelope, and all 22 public squares cleared it. Exact segment tests on the seven new venue footprints found a minimum 6.77 m gap beyond the barrier envelope. No tree-instance origin intersected those footprints at any LOD. The generated JSON is the authoritative result for each later run; these figures describe this audit snapshot.

The pit follow-up passed all six worlds. Each of the three pit complexes enclosed all seven of its named meshes, including instanced garage doors. Full bounds checks found zero vegetation intersections across 34,455 GP, 18,196 Speedway and 42,500 Parco instances. The test first caught one remaining Speedway canopy after the initial trunk-margin fix, demonstrating why checking only tree origins was insufficient.

## Reproducing the review

```sh
node scripts/world-audit.mjs --unit
node scripts/world-audit.mjs
node scripts/track-geometry.mjs qa/track-layouts
node scripts/graphics-test.mjs
node scripts/car-selection-test.mjs --unit
```

For actual rendered comparison, start Vite and set `CHROME_EXE` to Chromium. `GAME_URL` selects the server and `QA_DIR` selects the car-sheet output:

```sh
GAME_URL=http://localhost:5174/ QA_DIR=qa/before/cars node scripts/car-shapes.mjs
QA_DIR=qa/after/cars node scripts/car-shapes.mjs
GAME_URL=http://localhost:5174/ node scripts/audit-shots.mjs qa/before/tracks
node scripts/audit-shots.mjs qa/after/tracks
```

The PR workflow checks out the base revision on port 5174 and the candidate on 5173. It captures all four cars in identical paint and lighting, plus nine fixed views per circuit: overview, oblique and seven positions around the lap. Two additional city views inspect the harbour and yacht at close range. Track captures wait for the selected circuit to finish rebuilding, park the car with deterministic physics, freeze the loop and use the same fixed graphics preset on both revisions. The workflow also runs the existing physics, AI, graphics, car selection and visual/performance suites. It uploads one matched before/after artifact per circuit and a separate cars/reports artifact, keeping downloads manageable.

## Rendered review

CI run `37173730270` passed both the physics and visual jobs. The review covered all four car sheets, all six circuit screenshot sets and the marina close-ups. The revised window apertures expose the existing interiors; the marina now has docks and recognisable hulls/cabins rather than floating white blocks; the corrected mesa tops render as solid surfaces. The controlled views also caught two issues: tree crowns intersecting the Speedway pit garage after the forest coverage change, and excessive repetition of pale office facades along the waterfront.

The follow-up adds pit exclusions derived from the actual building geometry and checks entire vegetation bounds, including canopy scale. It also preserves each facade's supplied tint, removes the sharp repeated gradient band and mixes restrained slate offices into the waterfront palette. These changes preserve the circuit layout and city building footprints. The follow-up needs its own rendered CI capture; the preceding run cannot establish the appearance of later edits.

The render report contained no browser errors. In the matched GP balanced-preset comparison, draw calls changed from 356 to 351 and triangles from 1,059,334 to 986,248. These figures do not establish an all-circuit performance ceiling: among the performance-preset circuit captures, Parco remains the heaviest at 528 calls and 1,315,127 triangles.

## Retained limitations

Broad asphalt aprons between some city buildings and the waterfront still look sparse from high views. The water retains visible highlight/tile seams that also appear in the baseline capture. Track elevations remain flat in physics, and the existing tight corner radii listed above are unchanged. Scenery hills and road camber are visual features.

Local Chromium could not start in the restricted execution environment; rendered review therefore used the CI artifacts. Geometry checks cover structure and clearance, while screenshots establish appearance at fixed cameras. Neither the software-renderer screenshots nor static draw counts establish frame rate on a player's device.
