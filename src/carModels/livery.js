import * as THREE from 'three';
import { buildPanelSeams, paneZRange, profileFractions } from './loftBuilder.js';

let ivory;
function stripeMaterial() {
  return ivory ||= new THREE.MeshStandardMaterial({ color: 0xeee8d5, roughness: 0.46,
    metalness: 0.12, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
}

// The z runs of a stripe at profile fraction `frac` from zMax back to zMin,
// broken wherever a pane cuts the skin at that fraction. Ribbons sample the
// uncut skin, so a run carried across a windscreen would float under the
// glass over the open cabin; `margin` keeps each end clear of the seal.
function runsAround(panes, frac, zMax, zMin, margin = 0.03) {
  const gaps = panes
    .filter(p => !p.side && frac >= p.beltFrac && frac <= (p.topFrac ?? 1))
    .map(p => paneZRange({ topFrac: 1, ...p }, frac))
    .map(([a, b]) => [Math.max(a, b) + margin, Math.min(a, b) - margin])
    .sort((a, b) => b[0] - a[0]);
  const runs = [];
  let z = zMax;
  for (const [front, back] of gaps) {
    if (back >= z || front <= zMin) continue;
    if (front < z) runs.push([z, front]);
    z = Math.min(z, back);
  }
  if (z > zMin) runs.push([z, zMin]);
  return runs.filter(([a, b]) => a - b > 0.05);
}

// Surface-following ribbons use the same sampled skin as panel seams. Each
// livery merges into one draw call, rather than floating decals or extra FX.
export function addLivery(body, keys, archetype, panes = []) {
  // Clean paint lets the new road-car surfaces read; the classic V8 keeps
  // its period twin-stripe treatment.
  if (!keys || archetype !== 'muscle') return;
  const f = profileFractions(keys);
  // Twin stripes nose to tail over bonnet, roof and deck, stopping at the
  // windscreen and backlight, and a thin rocker stripe along each door.
  const crown = 0.955;
  const stripes = buildPanelSeams(keys, [
    ...runsAround(panes, crown, 2.38, -2.38).map(([a, b]) => ({
      path: [[a, crown], [b, crown]], width: 0.10, proud: 0.007, mirror: true,
    })),
    { path: [[-0.66, f.sillLip + 0.03], [0.32, f.sillLip + 0.03]], width: 0.06, proud: 0.007, mirror: true },
  ]);
  if (stripes) {
    const mesh = new THREE.Mesh(stripes, stripeMaterial());
    mesh.name = 'endurance-stripes'; mesh.receiveShadow = true;
    body.add(mesh);
  }
}
