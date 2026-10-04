// Complete, deterministic world checks without a browser or WebGL renderer.
// node scripts/world-audit.mjs; QA_DIR chooses the machine-readable report.
// --unit runs just the road topology/camber checks.
// Canvas paint is stubbed; the real scenery, buffers and physics are built.
// Rendered appearance remains the responsibility of audit-shots.mjs in CI.
import assert from 'node:assert/strict';
import { mkdirSync, writeFileSync } from 'node:fs';
import * as THREE from 'three';
import { TRACKS, segmentsForLength } from '../src/tracks.js';
import { buildRoadGeometry, buildEdgeLineGeometry, roadCrownY } from '../src/scenery/roadwork.js';
import { seedCircuit, beginStream } from '../src/scenery/rng.js';
import { roadMarkingGeometry } from '../src/scenery/roadMarkings.js';

function topFaces(geometry) {
  const p = geometry.attributes.position, index = geometry.index;
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  let up = 0, down = 0, degenerate = 0;
  for (let i = 0; i < (index?.count ?? p.count); i += 3) {
    a.fromBufferAttribute(p, index ? index.getX(i) : i);
    b.fromBufferAttribute(p, index ? index.getX(i + 1) : i + 1).sub(a);
    c.fromBufferAttribute(p, index ? index.getX(i + 2) : i + 2).sub(a);
    const normal = b.cross(c);
    if (normal.lengthSq() < 1e-14) degenerate++;
    else if (normal.y > 0) up++;
    else down++;
  }
  return { up, down, degenerate };
}

// Exact segment-to-rectangle distance, independently of the scenery builder's
// point-sampled placement test. Rotate the segment into the footprint frame.
function segmentRectangleDistance(ax, az, bx, bz, halfWidth, halfDepth) {
  const dx = bx - ax, dz = bz - az;
  let low = 0, high = 1;
  for (const [p, d, h] of [[ax, dx, halfWidth], [az, dz, halfDepth]]) {
    if (Math.abs(d) < 1e-12) { if (Math.abs(p) > h) { low = Infinity; break; } }
    else {
      const first = (-h - p) / d, second = (h - p) / d;
      low = Math.max(low, Math.min(first, second));
      high = Math.min(high, Math.max(first, second));
    }
  }
  if (low <= high) return 0;
  const toBox = (x, z) => Math.hypot(Math.max(0, Math.abs(x) - halfWidth), Math.max(0, Math.abs(z) - halfDepth));
  let distance = Math.min(toBox(ax, az), toBox(bx, bz));
  for (const x of [-halfWidth, halfWidth]) for (const z of [-halfDepth, halfDepth]) {
    const t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / Math.max(1e-20, dx * dx + dz * dz)));
    distance = Math.min(distance, Math.hypot(x - ax - t * dx, z - az - t * dz));
  }
  return distance;
}
assert.equal(segmentRectangleDistance(-10, 0, 10, 0, 1, 1), 0, 'a segment can cross a footprint with both endpoints outside');
assert.equal(segmentRectangleDistance(-10, 3, 10, 3, 1, 1), 2, 'parallel segment separation');
assert.equal(segmentRectangleDistance(4, 5, 4, 5, 1, 1), 5, 'corner and zero-length segment separation');

function venueClearance(frames, site) {
  const co = Math.cos(site.yaw), si = Math.sin(site.yaw);
  let closest = Infinity;
  const local = p => {
    const dx = p.x - site.x, dz = p.z - site.z;
    return [co * dx - si * dz, si * dx + co * dz];
  };
  for (let i = 0; i < frames.length; i++) {
    const a = local(frames[i].pos), b = local(frames[(i + 1) % frames.length].pos);
    closest = Math.min(closest, segmentRectangleDistance(...a, ...b, site.width / 2, site.depth / 2));
  }
  return closest;
}

for (const def of TRACKS) {
  seedCircuit(def.id); beginStream('asphalt');
  const curve = new THREE.CatmullRomCurve3(def.controlPoints.map(([x, z]) => new THREE.Vector3(x, 0, z)),
    def.closed !== false, def.curveType ?? 'catmullrom', def.tension ?? 0.5);
  const frames = new Array(segmentsForLength(curve.getLength()));
  for (let i = 0; i < frames.length; i++) {
    const t = i / frames.length, tan = curve.getTangentAt(t).normalize();
    frames[i] = { pos: curve.getPointAt(t), tan, left: new THREE.Vector3(-tan.z, 0, tan.x) };
  }
  const arcs = [0];
  for (let i = 1; i < frames.length; i++) arcs.push(arcs[i - 1] + frames[i].pos.distanceTo(frames[i - 1].pos));
  const width = def.roadWidth ?? 14;
  const road = buildRoadGeometry(frames, width, new Array(frames.length).fill(0), arcs);
  for (const [name, geo] of [['road', road], ...[-1, 1].map(side =>
    [`edge ${side}`, buildEdgeLineGeometry(frames, side * (width / 2 - 0.15), 0.2)])]) {
    const faces = topFaces(geo);
    assert(faces.up > 0 && faces.down === 0, `${def.id} ${name} must face upward: ${JSON.stringify(faces)}`);
    // Edge paint deliberately pinches to zero width where worn away; the
    // structural road must not. Most of the painted edge must remain drawn.
    if (name === 'road') assert.equal(faces.degenerate, 0, `${def.id} road has no collapsed triangles`);
    else assert(faces.degenerate < faces.up * 0.2, `${def.id} ${name} is excessively worn away`);
    for (const [name, attr] of Object.entries(geo.attributes))
      assert(attr.array.every(Number.isFinite), `${def.id} ${name} contains nonfinite data`);
    geo.dispose();
  }
  for (const lat of [0, width * 0.2, width * 0.4, width / 2]) {
    const y = roadCrownY(lat, width / 2) + 0.01;
    assert(y > -0.02 && y <= 0.011, `${def.id} asphalt clears the ground without lifting the tyres`);
    assert.equal(roadCrownY(lat, width / 2), roadCrownY(-lat, width / 2));
  }
  for (const index of [0, Math.floor(frames.length * 0.37), Math.floor(frames.length * 0.83)]) {
    const frame = frames[index], marking = roadMarkingGeometry(frame, width - 0.3, 1.6, width / 2);
    assert.equal(topFaces(marking).down, 0, `${def.id} crown-aligned paint faces up`);
    const p = marking.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const lat = (p.getX(i) - frame.pos.x) * frame.left.x + (p.getZ(i) - frame.pos.z) * frame.left.z;
      const expected = roadCrownY(lat, width / 2) + 0.013;
      assert(Math.abs(p.getY(i) - expected) < 0.00001, `${def.id} paint follows the crown within 0.01mm`);
    }
    marking.dispose();
  }
}
console.log('PASS: six tracks, upward road and edge triangles, finite road buffers and ground clearance');

if (!process.argv.includes('--unit')) await auditWorlds();

async function auditWorlds() {
  const out = process.env.QA_DIR || 'qa/world-audit';
  mkdirSync(out, { recursive: true });
  const originalDocument = globalThis.document;
  const context = new Proxy({}, {
    get(_target, key) {
      if (key === 'createImageData') return (w, h) => ({ data: new Uint8ClampedArray(w * h * 4) });
      if (key === 'getImageData') return (_x, _y, w, h) => ({ data: new Uint8ClampedArray(w * h * 4) });
      if (key === 'createLinearGradient' || key === 'createRadialGradient') return () => ({ addColorStop() {} });
      if (key === 'measureText') return () => ({ width: 10 });
      return () => {};
    },
    set() { return true; },
  });
  globalThis.document = { createElement: () => ({ width: 0, height: 0, getContext: () => context }) };
  const errors = [], reports = [];
  try {
    for (const def of TRACKS) {
      const report = await (async id => {
        const { createTrack } = await import('../src/track.js');
        const { createPhysicsWorld } = await import('../src/physics.js');
        const def = TRACKS.find(track => track.id === id);
        const scene = new THREE.Scene(), { world, materials } = createPhysicsWorld();
        const start = performance.now(), track = createTrack(scene, world, materials, def);
        scene.updateMatrixWorld(true);
        const failure = [], geos = new Set(), mats = new Set(), texs = new Set(), buffers = new Set();
        const result = { id, milliseconds: Math.round(performance.now() - start), meshes: 0, instances: 0,
          triangles: 0, instancedTriangles: 0, geometryBytes: 0, texturePixels: 0,
          cityBuildings: 0, publicSpaces: 0, venueFootprints: 0, roadMarkings: 0, brakeMarkers: 0,
          minBuildingClearance: null, minVenueClearance: null, names: {}, failure };
        const venues = [];
        const finite = (values, label) => {
          for (const value of values) if (!Number.isFinite(value)) { failure.push(`nonfinite ${label}`); break; }
        };
        const addBuffer = array => { if (array && !buffers.has(array.buffer)) { buffers.add(array.buffer); result.geometryBytes += array.buffer.byteLength; } };
        const clearance = (x, z, hw, hd, yaw = 0) => {
          let closest = Infinity;
          const co = Math.cos(yaw), si = Math.sin(yaw);
          // Sampling twice between each frame also tests the short chord, not
          // only its endpoints. At ~2.2 m/frame the remaining error is <0.55m.
          for (let i = 0; i < track.frames.length; i++) {
            const a = track.frames[i].pos, b = track.frames[(i + 1) % track.frames.length].pos;
            for (const t of [0, 0.5]) {
              const dx = a.x + (b.x - a.x) * t - x, dz = a.z + (b.z - a.z) * t - z;
              const lx = co * dx - si * dz, lz = si * dx + co * dz;
              closest = Math.min(closest, Math.hypot(Math.max(0, Math.abs(lx) - hw), Math.max(0, Math.abs(lz) - hd)));
            }
          }
          return closest - track.armcoOffset;
        };
        track.group.traverse(object => {
          finite(object.matrixWorld.elements, `${object.name} transform`);
          if (object.isMesh) result.meshes++;
          if (object.name) result.names[object.name] = (result.names[object.name] || 0) + 1;
          const geo = object.geometry;
          if (object.name.startsWith('road-marking-')) {
            result.roadMarkings++;
            const faces = topFaces(geo);
            if (!faces.up || faces.down || faces.degenerate) failure.push(`${object.name} has invalid paint winding`);
          }
          if (object.name === 'brake-marker-face') {
            result.brakeMarkers++;
            const tangent = new THREE.Vector3().fromArray(object.userData.approachTangent);
            const forward = new THREE.Vector3(0, 0, 1).transformDirection(object.matrixWorld);
            if (forward.dot(tangent) > -0.99) failure.push('brake board faces away from approaching cars');
          }
          if (geo) {
            const triangles = (geo.index?.count ?? geo.attributes.position?.count ?? 0) / 3;
            result.triangles += triangles;
            result.instancedTriangles += triangles * (object.isInstancedMesh ? object.count : 1);
            if (!geos.has(geo)) {
              geos.add(geo);
              for (const [name, attr] of Object.entries(geo.attributes)) {
                finite(attr.array, `${object.name || object.type}.${name}`); addBuffer(attr.array);
              }
              if (geo.index) {
                addBuffer(geo.index.array);
                for (const index of geo.index.array) if (index >= geo.attributes.position.count) {
                  failure.push(`out-of-range index in ${object.name || object.type}`); break;
                }
              }
              geo.computeBoundingBox(); geo.computeBoundingSphere();
              if (geo.attributes.position?.count) {
                finite([...geo.boundingBox.min.toArray(), ...geo.boundingBox.max.toArray(), geo.boundingSphere.radius], `${object.name} bounds`);
              }
            }
          }
          if (object.isInstancedMesh) {
            result.instances += object.count;
            finite(object.instanceMatrix.array, `${object.name} instances`); addBuffer(object.instanceMatrix.array);
            if (object.instanceColor) { finite(object.instanceColor.array, `${object.name} colors`); addBuffer(object.instanceColor.array); }
          }
          for (const material of object.material ? (Array.isArray(object.material) ? object.material : [object.material]) : []) {
            mats.add(material);
            for (const value of Object.values(material)) if (value?.isTexture) texs.add(value);
          }
          for (const building of object.userData.cityBuildings || []) {
            result.cityBuildings++;
            finite(Object.values(building).filter(value => typeof value === 'number'), 'city footprint');
            const gap = clearance(building.x, building.z, building.halfWidth, building.halfDepth);
            result.minBuildingClearance = Math.min(result.minBuildingClearance ?? Infinity, gap);
            if (gap < 0.5) failure.push(`city building intrudes into barrier clearance: ${gap.toFixed(2)}m at ${building.x},${building.z}`);
          }
          for (const space of object.userData.cityPublicSpaces || []) {
            result.publicSpaces++;
            const gap = clearance(space.x, space.z, space.halfWidth, space.halfDepth);
            if (gap < 0.5) failure.push(`city public space intrudes into barrier clearance: ${gap.toFixed(2)}m`);
          }
          for (const site of object.userData.venueFootprints || []) {
            venues.push(site); result.venueFootprints++;
            finite(Object.values(site), 'venue footprint');
            const actual = venueClearance(track.frames, site), gap = actual - track.armcoOffset;
            result.minVenueClearance = Math.min(result.minVenueClearance ?? Infinity, gap);
            if (gap < 5.4) failure.push(`venue footprint too close to circuit: ${gap.toFixed(2)}m beyond barriers`);
            if (actual > site.roadClearance + 0.01 || actual < site.roadClearance - 1.2)
              failure.push('venue clearance metadata disagrees with independent segment test');
          }
        });
        // Check every tree LOD, including spatial-batch transforms. Trunks
        // must stay outside the model footprint; canopy overlap is reviewed
        // in the rendered views because its silhouette is not a solid box.
        const instance = new THREE.Matrix4(), transform = new THREE.Matrix4();
        track.group.traverse(object => {
          if (!object.isInstancedMesh || !object.name.startsWith('trees-')) return;
          for (let i = 0; i < object.count; i++) {
            object.getMatrixAt(i, instance); transform.multiplyMatrices(object.matrixWorld, instance);
            for (const site of venues) {
              const dx = transform.elements[12] - site.x, dz = transform.elements[14] - site.z;
              const x = Math.cos(site.yaw) * dx - Math.sin(site.yaw) * dz;
              const z = Math.sin(site.yaw) * dx + Math.cos(site.yaw) * dz;
              if (Math.abs(x) < site.width / 2 + 1 && Math.abs(z) < site.depth / 2 + 1)
                failure.push(`tree instance intersects ${id} venue footprint`);
            }
          }
        });
        for (const texture of texs) {
          const image = texture.image;
          if (image?.width && image?.height) result.texturePixels += image.width * image.height;
        }
        if (result.roadMarkings < 3) failure.push('finish line or starting grid paint missing');
        if (def.theme.brakeMarkers && !result.brakeMarkers) failure.push('braking boards missing');
        if (id === 'downtown' && result.cityBuildings < 500) failure.push('city architecture missing');
        if (id !== 'downtown' && !result.venueFootprints) failure.push('circuit-specific venue architecture missing');
        for (const body of world.bodies) {
          finite([body.position.x, body.position.y, body.position.z, body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w], 'physics body');
          for (const offset of body.shapeOffsets) finite([offset.x, offset.y, offset.z], 'physics offset');
          for (const orientation of body.shapeOrientations) finite([orientation.x, orientation.y, orientation.z, orientation.w], 'physics shape rotation');
        }
        result.geometries = geos.size; result.materials = mats.size; result.textures = texs.size;
        result.bodies = world.bodies.length;
        result.shapes = world.bodies.reduce((n, body) => n + body.shapes.length, 0);
        // Track switching must dispatch disposal for every owned resource and
        // remove its physics bodies, not merely detach the old scene node.
        const disposed = { geometries: 0, materials: 0, textures: 0 };
        for (const [key, resources] of [['geometries', geos], ['materials', mats], ['textures', texs]])
          for (const resource of resources) resource.addEventListener('dispose', () => disposed[key]++);
        track.dispose();
        if (world.bodies.length || scene.children.length) failure.push('track disposal leaves scene or physics objects');
        for (const key of Object.keys(disposed)) if (disposed[key] !== result[key]) failure.push(`track disposal misses ${key}`);
        return result;
      })(def.id);
      reports.push(report);
      console.log(`${def.id}: ${report.meshes} meshes, ${report.geometries} geometries, ${(report.geometryBytes / 1048576).toFixed(1)} MiB buffers, ${report.textures} textures, ${report.failure.length} failures`);
    }
    writeFileSync(`${out}/world-audit.json`, JSON.stringify({ reports, errors }, null, 2) + '\n');
    for (const report of reports) {
      assert.deepEqual(report.failure, [], `${report.id} geometry, clearance and disposal`);
      // These cover complete worlds (including off-screen LOD levels). They
      // are intentionally distinct from per-frame draw calls / GPU timings.
      assert(report.geometryBytes < 96 * 1048576, `${report.id} static buffers exceed 96 MiB`);
      assert(report.meshes < 1000, `${report.id} mesh count exceeds 1000`);
      assert(report.materials < 256, `${report.id} material count exceeds 256`);
      assert(report.textures < 96, `${report.id} texture count exceeds 96`);
    }
    console.log('PASS: all worlds have finite geometry/transforms, valid indices, bounded resources and complete disposal');
    console.log(`Report: ${out}/world-audit.json`);
  } finally {
    if (originalDocument === undefined) delete globalThis.document;
    else globalThis.document = originalDocument;
  }
}
