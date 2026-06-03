import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// Collapse the static meshes of a group into one merged mesh per material,
// massively cutting draw calls. Meshes flagged userData.noMerge (the pulsing
// brake light, transparent glass, the contact shadow) are left untouched.
//
// Geometry is baked into the group's local space and normalised to
// position/normal/uv so everything is mergeable.
function normalize(geo, matrix) {
  let g = geo.index ? geo.toNonIndexed() : geo.clone();
  g.applyMatrix4(matrix);
  if (!g.getAttribute('uv')) {
    const n = g.getAttribute('position').count;
    g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(n * 2), 2));
  }
  // keep only the common attributes
  for (const name of Object.keys(g.attributes)) {
    if (name !== 'position' && name !== 'normal' && name !== 'uv') g.deleteAttribute(name);
  }
  if (!g.getAttribute('normal')) g.computeVertexNormals();
  return g;
}

export function mergeByMaterial(group) {
  group.updateMatrixWorld(true);
  const groupInv = new THREE.Matrix4().copy(group.matrixWorld).invert();

  const buckets = new Map(); // material -> { geos, cast, receive }
  const keep = [];
  const toRemove = [];

  group.traverse((o) => {
    if (!o.isMesh) return;
    if (o.userData.noMerge || o.material.transparent) { keep.push(o); return; }
    const mat = o.material;
    if (!buckets.has(mat)) buckets.set(mat, { geos: [], cast: false, receive: false });
    const b = buckets.get(mat);
    const local = new THREE.Matrix4().multiplyMatrices(groupInv, o.matrixWorld);
    b.geos.push(normalize(o.geometry, local));
    b.cast = b.cast || o.castShadow;
    b.receive = b.receive || o.receiveShadow;
    toRemove.push(o);
  });

  // detach everything, re-add kept + merged
  for (const o of toRemove) o.parent && o.parent.remove(o);

  for (const [mat, b] of buckets) {
    if (!b.geos.length) continue;
    const merged = b.geos.length === 1 ? b.geos[0] : mergeGeometries(b.geos, false);
    if (!merged) { // fallback: re-add individually if merge failed
      continue;
    }
    const mesh = new THREE.Mesh(merged, mat);
    mesh.castShadow = b.cast;
    mesh.receiveShadow = b.receive;
    group.add(mesh);
  }
  return group;
}
