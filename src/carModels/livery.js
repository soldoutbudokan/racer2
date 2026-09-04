import * as THREE from 'three';
import { buildPanelSeams, profileFractions } from './loftBuilder.js';

let ivory;
function stripeMaterial() {
  return ivory ||= new THREE.MeshStandardMaterial({ color: 0xeee8d5, roughness: 0.46,
    metalness: 0.12, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
}

// Surface-following ribbons use the same sampled skin as panel seams. Each
// livery merges into one draw call, rather than floating decals or extra FX.
export function addLivery(body, keys, archetype) {
  if (!keys) return;
  const f = profileFractions(keys);
  const gt = archetype === 'gt';
  const stripes = buildPanelSeams(keys, [
    { path: [[0.68, 0.965], [gt ? 2.04 : 2.0, 0.965]], width: 0.09, proud: 0.007, mirror: true },
    { path: [[-0.65, f.sillLip + 0.025], [0.64, f.sillLip + 0.025]], width: 0.075, proud: 0.007, mirror: true },
  ]);
  if (stripes) {
    const mesh = new THREE.Mesh(stripes, stripeMaterial());
    mesh.name = 'endurance-stripes'; mesh.receiveShadow = true;
    body.add(mesh);
  }
}
