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
  // Clean paint lets the new road-car surfaces read; the classic V8 keeps
  // its period twin-stripe treatment.
  if (!keys || archetype !== 'muscle') return;
  const f = profileFractions(keys);
  // Twin stripes the length of the car, over bonnet, roof and deck, and a
  // thin rocker stripe along each door.
  const stripes = buildPanelSeams(keys, [
    { path: [[-2.38, 0.955], [-1.60, 0.955], [-0.60, 0.955], [0.40, 0.955], [1.40, 0.955], [2.38, 0.955]],
      width: 0.10, proud: 0.007, mirror: true },
    { path: [[-0.84, f.sillLip + 0.03], [0.34, f.sillLip + 0.03]], width: 0.06, proud: 0.007, mirror: true },
  ]);
  if (stripes) {
    const mesh = new THREE.Mesh(stripes, stripeMaterial());
    mesh.name = 'endurance-stripes'; mesh.receiveShadow = true;
    body.add(mesh);
  }
}
