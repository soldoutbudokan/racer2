import * as THREE from 'three';

// Cut actual wheel openings into the painted shell. The old closed loft ran
// straight through the tyres: its width had to be kept artificially narrow to
// keep the wheel faces visible. A convex polygonal cylinder lets us trim each
// intersecting triangle exactly, preserving the loft's UVs and hard normals.
// This runs once per cached road-car hull, never during rendering or driving.
const ARCH_RADIUS = 0.408;
const ARCH_SEGMENTS = 40;
const INNER_X = 0.665;
const EPS = 1e-7;

function splitPolygon(polygon, plane) {
  const inside = [], outside = [];
  for (let i = 0; i < polygon.length; i++) {
    const a = polygon[i], b = polygon[(i + 1) % polygon.length];
    const da = plane.distance(a), db = plane.distance(b);
    (da <= EPS ? inside : outside).push(a);
    if ((da < -EPS && db > EPS) || (da > EPS && db < -EPS)) {
      const t = da / (da - db);
      const v = a.map((value, k) => value + (b[k] - value) * t);
      inside.push(v); outside.push(v);
    }
  }
  return { inside, outside };
}

export function cutWheelWells(source) {
  const position = source.getAttribute('position');
  const normal = source.getAttribute('normal');
  const uv = source.getAttribute('uv');
  const vertices = Array.from({ length: position.count }, (_, i) => [
    position.getX(i), position.getY(i), position.getZ(i),
    normal.getX(i), normal.getY(i), normal.getZ(i), uv.getX(i), uv.getY(i),
  ]);
  let triangles = [];
  const ids = source.index.array;
  for (let i = 0; i < ids.length; i += 3) triangles.push([vertices[ids[i]], vertices[ids[i + 1]], vertices[ids[i + 2]]]);
  const returns = [];

  for (const axleZ of [-1.45, 1.45]) {
    for (const side of [-1, 1]) {
      const planes = [{ distance: v => INNER_X - side * v[0] }];
      // Inscribed 40-gon: the largest radial approximation is only 1.3 mm.
      const limit = ARCH_RADIUS * Math.cos(Math.PI / ARCH_SEGMENTS);
      for (let i = 0; i < ARCH_SEGMENTS; i++) {
        const angle = (i + 0.5) * Math.PI * 2 / ARCH_SEGMENTS;
        const y = Math.cos(angle), z = Math.sin(angle);
        planes.push({ y, z, distance: v => y * v[1] + z * (v[2] - axleZ) - limit });
      }
      const kept = [];
      for (const triangle of triangles) {
        // Reject untouched faces before entering the plane clipper.
        if (triangle.every(v => side * v[0] < INNER_X) ||
            triangle.every(v => v[2] < axleZ - ARCH_RADIUS) ||
            triangle.every(v => v[2] > axleZ + ARCH_RADIUS) ||
            triangle.every(v => v[1] > ARCH_RADIUS) ||
            triangle.every(v => v[1] < -ARCH_RADIUS)) {
          kept.push(triangle); continue;
        }
        let remainder = triangle;
        for (const plane of planes) {
          const split = splitPolygon(remainder, plane);
          if (split.outside.length >= 3) kept.push(split.outside);
          remainder = split.inside;
          if (remainder.length < 3) break;
        }
        if (remainder.length < 3) continue;
        // Give the opening a 26 mm painted return. Boundary edges come from
        // the actual clipped triangles, so the lip follows every fender
        // blister precisely, with no floating torus or black decal crescent.
        for (let i = 0; i < remainder.length; i++) {
          const a = remainder[i], b = remainder[(i + 1) % remainder.length];
          const plane = planes.slice(1).find(p => Math.abs(p.distance(a)) < EPS * 4 && Math.abs(p.distance(b)) < EPS * 4);
          if (!plane || Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]) < EPS) continue;
          const vertex = (v, inset) => [v[0] - side * inset, v[1], v[2], 0, -plane.y, -plane.z, v[6], v[7]];
          const quad = [vertex(a, 0), vertex(b, 0), vertex(b, 0.026), vertex(a, 0.026)];
          const ab = new THREE.Vector3().fromArray(quad[1]).sub(new THREE.Vector3().fromArray(quad[0]));
          const ac = new THREE.Vector3().fromArray(quad[2]).sub(new THREE.Vector3().fromArray(quad[0]));
          if (ab.cross(ac).dot(new THREE.Vector3(0, -plane.y, -plane.z)) < 0) quad.reverse();
          returns.push(quad);
        }
      }
      triangles = kept;
    }
  }

  const positions = [], normals = [], uvs = [], indices = [];
  const vertexIds = new Map();
  function vertexId(v) {
    const n = Math.hypot(v[3], v[4], v[5]) || 1;
    const clean = [...v.slice(0, 3), v[3] / n, v[4] / n, v[5] / n, ...v.slice(6)];
    const key = clean.map(value => value.toFixed(7)).join(',');
    if (vertexIds.has(key)) return vertexIds.get(key);
    const id = positions.length / 3;
    positions.push(...clean.slice(0, 3)); normals.push(...clean.slice(3, 6)); uvs.push(...clean.slice(6));
    vertexIds.set(key, id); return id;
  }
  for (const polygon of [...triangles, ...returns]) {
    for (let i = 1; i < polygon.length - 1; i++) {
      const a = polygon[0], b = polygon[i], c = polygon[i + 1];
      const ab = new THREE.Vector3(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
      const ac = new THREE.Vector3(c[0] - a[0], c[1] - a[1], c[2] - a[2]);
      if (ab.cross(ac).lengthSq() < 1e-16) continue;
      indices.push(vertexId(a), vertexId(b), vertexId(c));
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeBoundingBox(); geometry.computeBoundingSphere();
  return geometry;
}
