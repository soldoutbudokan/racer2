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
    hullCache.set(key, def.keys ? buildLoftHull(def.keys, {
      ringsPerSegment: 9, profilePoints: 16,
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

  body.add(buildContactShadow());

  return {
    root,
    wheels,
    brakeLights: deco.brakeLights,
    _brakeLevel: 0,
  };
}

export const ARCHETYPE_KEYS = Object.keys(ARCHETYPES);
