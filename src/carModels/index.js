import * as THREE from 'three';
import { buildLoftHull } from './loftBuilder.js';
import { makePaint } from './carMaterials.js';
import { buildWheel } from './wheels.js';
import { buildContactShadow } from './parts.js';
import { mergeByMaterial } from './merge.js';

import * as gtCoupe from './gtCoupe.js';
import * as muscle from './muscle.js';
import * as openWheel from './openWheel.js';

const ARCHETYPES = {
  gt: gtCoupe,
  muscle,
  'open-wheel': openWheel,
};

// Body is authored in an axle-centred frame (wheel centre = y 0, ground = -0.36)
// then dropped so wheel centre lands at its physics-local height. Measured: the
// wheels sit at local y -0.37 relative to the chassis root.
const BODY_DROP = -0.37;

// Hull geometry is identical for every car of an archetype → build once.
const hullCache = new Map();
function getHull(key, def) {
  if (!hullCache.has(key)) {
    // ringsPerSegment 7, not 9: the surfaced profile pins 22 vertex COLUMNS
    // (~57 mm apart along the section), so 9 rings per segment sampled z at
    // ~38 mm — over half again as fine as the curve it is crossed with, and
    // the extra rings only restate curvature Catmull already draws. 7 puts the
    // two spacings within 15 % of each other and returns ~2.2 k triangles per
    // road car, which is a fifth of the whole overrun.
    // profilePoints is ignored once a car declares surface features.
    hullCache.set(key, def.keys ? buildLoftHull(def.keys, {
      ringsPerSegment: 7, profilePoints: 16,
    }) : null);
  }
  return hullCache.get(key);
}

/**
 * Build the full visual car. Preserves the contract expected by car.js:
 *   { root: THREE.Group, wheels: [4 THREE.Group], brakeLights: Mesh, _brakeLevel }
 */
export function buildVisualCar(archetypeKey = 'gt', bodyColor = 0xc8161d) {
  const def = ARCHETYPES[archetypeKey] || ARCHETYPES.gt;
  const root = new THREE.Group();
  // Everything except the physics-driven wheels lives in the dropped body group.
  const body = new THREE.Group();
  body.position.y = BODY_DROP;
  root.add(body);

  const paint = makePaint(bodyColor);
  const hullGeo = getHull(archetypeKey, def);
  if (hullGeo) {
    const hull = new THREE.Mesh(hullGeo, paint);
    hull.castShadow = true;
    hull.receiveShadow = true;
    hull.userData.noMerge = true;   // keep the shared hull geometry un-baked
    body.add(hull);
  }

  const deco = def.decorate(body, { color: bodyColor });

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
  };
}

export const ARCHETYPE_KEYS = Object.keys(ARCHETYPES);
