import * as THREE from 'three';
import { hideFromOverridePasses } from './noise.js';

// A forest-wide InstancedMesh has one enormous bounding sphere: every tree
// is submitted even when only one stand is on screen. Spatial batches let
// Three cull whole stands; nearby 3D trees also get a cheap distant canopy.
export function addTreeBatches(parent, source, farGeometry, farMaterial) {
  const size = farGeometry ? 100 : 220;
  const cells = new Map();
  const matrix = new THREE.Matrix4(), color = new THREE.Color();
  for (let i = 0; i < source.count; i++) {
    source.getMatrixAt(i, matrix);
    const x = Math.floor(matrix.elements[12] / size);
    const z = Math.floor(matrix.elements[14] / size);
    const key = `${x},${z}`;
    if (!cells.has(key)) cells.set(key, { x: (x + 0.5) * size, z: (z + 0.5) * size, ids: [] });
    cells.get(key).ids.push(i);
  }
  for (const cell of cells.values()) {
    const makeBatch = (geometry, material, far = false) => {
      const mesh = new THREE.InstancedMesh(geometry, material, cell.ids.length);
      mesh.name = `${source.name}-${far ? 'distant-' : ''}${cell.x},${cell.z}`;
      mesh.castShadow = !far && source.castShadow;
      mesh.receiveShadow = !far && source.receiveShadow;
      for (let k = 0; k < cell.ids.length; k++) {
        source.getMatrixAt(cell.ids[k], matrix);
        matrix.elements[12] -= cell.x;
        matrix.elements[14] -= cell.z;
        mesh.setMatrixAt(k, matrix);
        if (source.instanceColor) {
          source.getColorAt(cell.ids[k], color);
          mesh.setColorAt(k, color);
        }
      }
      mesh.computeBoundingSphere();
      if (material.alphaTest > 0) hideFromOverridePasses(mesh);
      return mesh;
    };
    const near = makeBatch(source.geometry, source.material);
    if (farGeometry) {
      const lod = new THREE.LOD();
      lod.position.set(cell.x, 0, cell.z);
      lod.addLevel(near, 0);
      lod.addLevel(makeBatch(farGeometry, farMaterial, true), 190, 0.12);
      parent.add(lod);
    } else {
      near.position.set(cell.x, 0, cell.z);
      parent.add(near);
    }
  }
  // The input was only a staging buffer and was never added to the scene.
  source.dispose();
}
