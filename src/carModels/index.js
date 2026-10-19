import * as THREE from 'three';
import { buildLoftHull } from './loftBuilder.js';
import { makePaint } from './carMaterials.js';
import { buildWheel } from './wheels.js';
import { buildContactShadow } from './parts.js';
import { mergeByMaterial } from './merge.js';
import { addLivery } from './livery.js';
import { HUB_LOCAL_Y, stanceFor } from '../stance.js';
import { getCarSpec } from '../carSpecs.js';
import { cutWheelWells } from './wheelWells.js';

import * as gtCoupe from './gtCoupe.js';
import * as muscle from './muscle.js';
import * as rallyHatch from './rallyHatch.js';
import * as openWheel from './openWheel.js';
import * as roadster from './roadster.js';
import * as supercar from './supercar.js';

const ARCHETYPES = {
  gt: gtCoupe,
  muscle,
  hatch: rallyHatch,
  'open-wheel': openWheel,
  roadster,
  supercar,
};

// Body is authored in an axle-centred frame (wheel centre = y 0, ground = -0.36)
// then dropped so the wheel centre lands at its physics-local height.
//
// That height is NOT a constant of the car: the shell is rigid on the sprung
// chassis while the wheels raycast independently, so it is right at exactly one
// suspension compression. Use the settled one — `stance.js` derives it from the
// spring rather than leaving it as a measured magic number. (It used to be
// -0.37, the full-droop offset, which is the pose a car holds only for the
// third of a second it spends falling onto the grid; every other frame of every
// race, the shell rode 5.7 cm too low.) Since 2026-10-18 it is also per car:
// car.js passes the hub offset for the spec's centre-of-mass height, and the
// default below is only for callers that build a body with no car in hand.
const BODY_DROP = HUB_LOCAL_Y;

// Where an archetype's wheel openings are cut. The axles follow the spec's
// wheelbase, so the physics wheels and the painted arches always agree; a
// body may widen the opening (`r`) or move its inboard limit (`innerX`).
function archesFor(key, def) {
  const half = getCarSpec(key).wheelbase / 2;
  return { zF: half, zR: -half, r: 0.408, innerX: 0.665, ...(def.ARCHES ?? {}) };
}

// Hull geometry is identical for every car of an archetype → build once.
const hullCache = new Map();
function getHull(key, def) {
  if (!hullCache.has(key)) {
    // The surfaced profile pins a vertex column every ~28 mm along the
    // section (loftBuilder RES), and 12 rings per segment samples z at
    // ~25 mm, so the two spacings match and a flared arch is as smooth along
    // the car as it is around it. That is ~9 k triangles per road-car hull:
    // one draw call, shared by every car of the archetype, and a small
    // fraction of a single forest batch. profilePoints is ignored once a car
    // declares surface features.
    let hull = def.keys ? buildLoftHull(def.keys, {
      ringsPerSegment: 12, profilePoints: 16, panes: def.PANES,
      capRoll: def.CAP_ROLL,
    }) : null;
    if (hull && key !== 'open-wheel') {
      const shell = cutWheelWells(hull, archesFor(key, def));
      hull.dispose();
      hull = shell;
    }
    hullCache.set(key, hull);
  }
  return hullCache.get(key);
}

/**
 * Build the full visual car. Preserves the contract expected by car.js:
 *   { root: THREE.Group, wheels: [4 THREE.Group], brakeLights: Mesh, _brakeLevel }
 */
export function buildVisualCar(archetypeKey = 'gt', bodyColor = 0xc8161d, { hubLocalY = BODY_DROP } = {}) {
  // Normalize before caching or adding details, so stale/invalid saved IDs
  // consistently use the GT (including keys inherited from Object.prototype).
  const key = Object.hasOwn(ARCHETYPES, archetypeKey) ? archetypeKey : 'gt';
  const def = ARCHETYPES[key];
  const root = new THREE.Group();
  // Everything except the physics-driven wheels lives in the dropped body group.
  // BODY_LIFT raises the shell over its wheels without touching the physics:
  // a rally car on gravel springs shows daylight above its tyres.
  const body = new THREE.Group();
  body.position.y = hubLocalY + (def.BODY_LIFT ?? 0);
  root.add(body);
  const arches = archesFor(key, def);

  const paint = makePaint(bodyColor);
  const hullGeo = getHull(key, def);
  if (hullGeo) {
    const hull = new THREE.Mesh(hullGeo, paint);
    hull.castShadow = true;
    hull.receiveShadow = true;
    hull.userData.noMerge = true;   // keep the shared hull geometry un-baked
    body.add(hull);
  }

  const deco = def.decorate(body, { color: bodyColor, arches });
  addLivery(body, def.keys, key, def.PANES);

  // Collapse the many small decoration meshes into one mesh per material.
  // Hull (shared geo), glass/lenses (transparent) and the brake light are
  // left as their own meshes.
  mergeByMaterial(body);

  const wheels = [];
  for (let i = 0; i < 4; i++) wheels.push(buildWheel(def.wheelStyle));

  // The contact shadow hangs off the ROOT, not the dropped body group: it is
  // ground furniture, so car.js re-seats it flat on the asphalt every frame
  // (see buildContactShadow). Keeping it under `root` means main.js's existing
  // add/remove of the root still carries it in and out of the scene.
  //
  // Size and centre it on the finished bodywork rather than one hard-coded
  // rectangle: the three archetypes measure 1.98–2.56 m across the shell.
  body.updateMatrixWorld(true);
  const bb = new THREE.Box3().setFromObject(body);
  const shadow = buildContactShadow({
    w: (bb.max.x - bb.min.x) * 1.12,
    len: (bb.max.z - bb.min.z) * 1.06,
  });
  shadow.geometry.translate((bb.max.x + bb.min.x) / 2, 0, (bb.max.z + bb.min.z) / 2);
  root.add(shadow);

  return {
    root,
    wheels,
    shadow,
    brakeLights: deco.brakeLights,
    _brakeLevel: 0,
    dispose() {
      // Hulls, wheel templates, paint and trim are cached across cars, as is
      // any geometry a body flags `sharedGeometry` (the speedster's humps).
      // Body decorations and the contact-shadow plane belong to this instance.
      const geometries = new Set();
      root.traverse(o => {
        if (o.geometry && o.geometry !== hullGeo && !o.userData.sharedGeometry) geometries.add(o.geometry);
      });
      for (const geometry of geometries) geometry.dispose();
      deco.brakeLights?.material.dispose();
      shadow.material.dispose();
    },
  };
}

export const ARCHETYPE_KEYS = Object.keys(ARCHETYPES);

// Showroom geometry for a car with no physics behind it: where its chassis
// origin sits over a flat floor and where its wheel hubs go.
export function showroomStance(archetypeKey = 'gt') {
  const key = Object.hasOwn(ARCHETYPES, archetypeKey) ? archetypeKey : 'gt';
  const spec = getCarSpec(key);
  const { chassisHeight, hubLocalY } = stanceFor(spec.cgHeight);
  return { chassisHeight, hubLocalY, halfWheelbase: spec.wheelbase / 2, halfTrack: (spec.trackWidth ?? 1.72) / 2 };
}
