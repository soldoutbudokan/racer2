import * as THREE from 'three';
import { roadCrownY } from './roadwork.js';

// Paint follows the same camber as the carriageway. A flat plane across a
// crowned road floats at the edges, especially in low trackside cameras.
export function roadMarkingGeometry(frame, width, length, halfRoad, lateral = 0, along = 0) {
  const columns = Math.max(1, Math.ceil(width / 0.5));
  const positions = [], uvs = [], indices = [];
  for (let i = 0; i <= columns; i++) {
    const lat = lateral + (i / columns - 0.5) * width;
    for (const direction of [-1, 1]) {
      const distance = along + direction * length / 2;
      positions.push(frame.pos.x + frame.left.x * lat + frame.tan.x * distance,
        0.013 + roadCrownY(lat, halfRoad),
        frame.pos.z + frame.left.z * lat + frame.tan.z * distance);
      uvs.push(i / columns, (direction + 1) / 2);
    }
    if (i) {
      const a = (i - 1) * 2, b = i * 2;
      indices.push(a, b, b + 1, a, b + 1, a + 1);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}
