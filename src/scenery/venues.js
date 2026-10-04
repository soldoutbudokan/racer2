/**
 * Circuit-specific architecture, built in three material batches per venue.
 * A footprint is accepted only when its complete oriented rectangle clears
 * every road segment and lies on the terrain's guaranteed-flat corridor.
 * These landmarks give the five country circuits different silhouettes without
 * changing their road, barriers, surface rules or physics.
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const UP = new THREE.Vector3(0, 1, 0);
const ONE = new THREE.Vector3(1, 1, 1);
const COLOURS = { stone: 0x918b7c, trim: 0xc4bca7, steel: 0x444b4d, glass: 0x325464 };

function colourGeometry(g, hex) {
  // Extruded gables are non-indexed; normalise boxes and cylinders too so
  // every material batch has the same attribute/index contract.
  if (g.index) { const indexed = g; g = indexed.toNonIndexed(); indexed.dispose(); }
  const c = new THREE.Color(hex);
  const p = g.attributes.position, n = g.attributes.normal;
  const colours = new Float32Array(p.count * 3);
  for (let i = 0; i < p.count; i++) {
    // Recesses and the undersides of broad eaves need material occlusion at
    // medium range, where the screen-space contact AO no longer resolves them.
    const k = n.getY(i) < -0.4 ? 0.58 : n.getY(i) > 0.4 ? 1.04 : 0.91;
    colours.set([c.r * k, c.g * k, c.b * k], i * 3);
  }
  g.setAttribute('color', new THREE.BufferAttribute(colours, 3));
  return g;
}

function box(out, mat, hex, w, h, d, x, y, z, rz = 0, rx = 0) {
  const g = new THREE.BoxGeometry(w, h, d);
  if (rz) g.rotateZ(rz);
  if (rx) g.rotateX(rx);
  g.translate(x, y, z);
  out[mat].push(colourGeometry(g, hex));
}

function beam(out, hex, a, b, width = 0.12) {
  const p = new THREE.Vector3(...a), q = new THREE.Vector3(...b);
  const dir = q.clone().sub(p), length = dir.length();
  if (length < 0.001) return;
  const g = new THREE.BoxGeometry(width, length, width);
  const rotation = new THREE.Quaternion().setFromUnitVectors(UP, dir.divideScalar(length));
  g.applyMatrix4(new THREE.Matrix4().compose(p.add(q).multiplyScalar(0.5), rotation, ONE));
  out.metal.push(colourGeometry(g, hex));
}

function windows(out, width, y, z, height, count, trim = COLOURS.steel) {
  box(out, 'glass', COLOURS.glass, width, height, 0.10, 0, y, z);
  for (let i = 0; i <= count; i++) {
    box(out, 'metal', trim, 0.12, height + 0.16, 0.16, -width / 2 + i * width / count, y, z + 0.08);
  }
  for (const s of [-1, 1]) box(out, 'metal', trim, width + 0.18, 0.12, 0.20, 0, y + s * height / 2, z + 0.08);
}

function rail(out, w, z, y, hex = 0x62696a) {
  beam(out, hex, [-w / 2, y + 1.05, z], [w / 2, y + 1.05, z], 0.075);
  beam(out, hex, [-w / 2, y + 0.48, z], [w / 2, y + 0.48, z], 0.055);
  const n = Math.ceil(w / 1.8);
  for (let i = 0; i <= n; i++) beam(out, hex, [-w / 2 + w * i / n, y, z], [-w / 2 + w * i / n, y + 1.1, z], 0.07);
}

function gableRoof(out, w, d, y, rise, colour, offsetX = 0, offsetZ = 0) {
  const starts = Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.length]));
  // Ridge follows local X, gable ends are actual triangular walls (no open
  // black wedge below a pair of floating roof slabs).
  const shape = new THREE.Shape();
  shape.moveTo(-d / 2, 0); shape.lineTo(d / 2, 0); shape.lineTo(0, rise); shape.closePath();
  const g = new THREE.ExtrudeGeometry(shape, { depth: w, bevelEnabled: false, steps: 1 });
  g.rotateY(Math.PI / 2); g.translate(-w / 2, y, 0);
  out.solid.push(colourGeometry(g, 0x765a41));
  const span = Math.hypot(d / 2 + 0.7, rise + 0.3);
  const angle = Math.atan2(rise + 0.3, d / 2 + 0.7);
  for (const s of [-1, 1]) {
    box(out, 'solid', colour, w + 1.4, 0.18, span, 0, y + rise / 2 + 0.12, s * (d / 4 + 0.35), 0, s * angle);
    beam(out, 0x373d3d, [-w / 2 - 0.65, y - 0.1, s * (d / 2 + 0.65)], [w / 2 + 0.65, y - 0.1, s * (d / 2 + 0.65)], 0.13);
    // Standing seams make the roof a built object, even from the aerial view.
    for (let x = -w / 2; x <= w / 2; x += 1.1) {
      beam(out, colour, [x, y + rise + 0.25, 0], [x, y - 0.04, s * (d / 2 + 0.6)], 0.04);
    }
  }
  for (const key of Object.keys(out)) for (let i = starts[key]; i < out[key].length; i++) out[key][i].translate(offsetX, 0, offsetZ);
}

function raceControl(out, id) {
  const historic = id === 'parco';
  const trim = historic ? 0x557163 : 0x286d75;
  const wall = historic ? 0xb9aa8f : 0x929b99;
  box(out, 'solid', 0x716f63, 22, 0.6, 12, 0, 0.25, 0);
  box(out, 'solid', wall, 20, 5.8, 9.5, 0, 3.2, -0.6);
  box(out, 'solid', 0x555b56, 19.3, 0.24, 10.2, 0, 6.16, -0.4);
  // Recessed lower arcade, with real columns in front of dark shopfronts.
  windows(out, 17.4, 2.7, 4.19, 3.0, historic ? 8 : 6, trim);
  for (let x = -9; x <= 9; x += 3) {
    box(out, 'solid', historic ? 0xccbfa6 : 0xafb6ae, 0.48, 4.5, 1.1, x, 2.55, 4.65);
    box(out, 'solid', wall, 0.78, 0.23, 1.35, x, 4.68, 4.65);
  }
  box(out, 'solid', trim, 21.4, 0.25, 2.0, 0, 5.2, 4.6);
  // A set-back glazed timing room and wraparound observation terrace.
  box(out, 'solid', wall, 9.8, 3.0, 7.8, -2.8, 7.6, -0.8);
  windows(out, 8.7, 7.65, 3.16, 1.8, 4, trim);
  for (const side of [-1, 1]) box(out, 'glass', COLOURS.glass, 0.12, 1.8, 5.7, -2.8 + side * 4.95, 7.65, -0.4);
  rail(out, 20, 4.7, 6.3, trim);
  if (historic) {
    gableRoof(out, 10.6, 8.5, 9.2, 2.1, 0x855a43, -2.8, -0.8);
    // Centre clock cupola: octagonal crown and four dark clock panels.
    const drum = new THREE.CylinderGeometry(1.65, 1.65, 2.7, 8);
    drum.translate(-2.8, 11.6, -0.7); out.solid.push(colourGeometry(drum, 0xc7b99d));
    box(out, 'solid', 0x343c3c, 1.45, 1.45, 0.12, -2.8, 11.8, 0.9);
    box(out, 'solid', 0xe3d6b8, 0.11, 0.56, 0.04, -2.8, 11.97, 0.98, -0.4);
    box(out, 'solid', 0xe3d6b8, 0.44, 0.09, 0.04, -2.63, 11.8, 0.99);
    const cap = new THREE.ConeGeometry(2.1, 1.6, 8);
    cap.translate(-2.8, 13.75, -0.7); out.solid.push(colourGeometry(cap, 0x536356));
  } else {
    box(out, 'solid', 0xb3b9b2, 12.2, 0.32, 10.2, -2.8, 9.32, -0.8);
    // Angled outrigger sunshade and roof plant are visible against the sky.
    for (let x = -8; x <= 3; x += 1.3) beam(out, 0xa7b7b4, [x, 9.1, 3.9], [x, 9.6, 5.6], 0.16);
    for (let i = 0; i < 4; i++) box(out, 'metal', 0x6d7a77, 1.2, 0.85, 1.8, 4.4 + (i % 2) * 2, 6.85, -2.5 + Math.floor(i / 2) * 2.5);
    beam(out, 0x707c78, [4.4, 6.5, -3.4], [4.4, 14, -3.4], 0.12);
    for (const y of [11.2, 12.3, 13.4]) beam(out, 0x768381, [3.6, y, -3.4], [5.2, y, -3.4], 0.065);
  }
  // Flag masts use folded solid pennants, not alpha planes that darken in AO.
  for (let i = 0; i < 3; i++) {
    const x = 5.7 + i * 1.4;
    beam(out, 0xa6ada6, [x, 6.3, 3.8], [x, 10.5, 3.8], 0.055);
    box(out, 'solid', [trim, 0xd1c39e, 0x9b5646][i], 0.9, 0.58, 0.07, x + 0.4, 10.05, 3.8, -0.1);
  }
}

function speedwayTower(out) {
  const red = 0xa44b3b;
  box(out, 'solid', 0x7e8075, 13, 0.5, 10, 0, 0.2, 0);
  box(out, 'solid', 0x9f9b86, 11, 3.4, 8, 0, 1.95, 0);
  windows(out, 9.5, 2.2, 4.06, 1.5, 5, red);
  for (const x of [-4.5, 4.5]) for (const z of [-2.6, 2.6]) beam(out, 0x565f5c, [x, 3.6, z], [x * 0.65, 16, z * 0.65], 0.3);
  for (let y = 4; y < 15; y += 3.5) {
    beam(out, 0x6e7874, [-4, y, 2.5], [4, y + 3, 2.0], 0.15);
    beam(out, 0x6e7874, [4, y, 2.5], [-4, y + 3, 2.0], 0.15);
  }
  box(out, 'solid', red, 12.5, 0.65, 8.5, 0, 16.1, 0);
  box(out, 'solid', 0x686f64, 10.8, 3.3, 6.4, 0, 18.0, 0);
  windows(out, 10.4, 18.2, 3.28, 2.15, 5);
  for (const s of [-1, 1]) box(out, 'glass', COLOURS.glass, 0.12, 2.1, 5.9, s * 5.45, 18.2, 0);
  box(out, 'solid', 0xc0b99d, 14, 0.3, 9.4, 0, 19.8, 0);
  rail(out, 12.2, 4.25, 16.4);
  // Scoring-board face: physical louvers, warm status bars and lap columns.
  box(out, 'solid', 0x273432, 5.2, 7.6, 0.35, 0, 10.4, 2.7);
  for (let i = 0; i < 6; i++) {
    box(out, 'solid', 0x69817a, 4.8, 0.06, 0.12, 0, 7.5 + i * 1.12, 2.93);
    for (let j = 0; j < 3; j++) box(out, 'solid', j === 0 ? 0xd5ad55 : 0xb7c7b1, j === 0 ? 0.5 : 1.0, 0.15, 0.1, -1.6 + j * 1.5, 8 + i * 1.05, 2.95);
  }
}

function alpineLodge(out) {
  const wood = 0x76563b, timber = 0x574330;
  box(out, 'solid', 0x747c75, 14.2, 1.2, 10.6, 0, 0.5, 0);
  box(out, 'solid', 0xa59e8c, 12.8, 3.1, 9.2, 0, 2.45, 0);
  box(out, 'solid', wood, 12.8, 2.4, 9.2, 0, 5.15, 0);
  // Individual horizontal timber courses carry the scale of the building.
  for (let y = 4.05; y < 6.4; y += 0.31) box(out, 'solid', y % 0.62 < 0.31 ? 0x715139 : 0x836046, 12.9, 0.08, 9.3, 0, y, 0);
  for (const y of [2.65, 5.25]) {
    for (let x = -4.65; x <= 4.7; x += 3.1) {
      box(out, 'glass', 0x294955, 1.55, 1.48, 0.10, x, y, 4.68);
      for (const s of [-1, 1]) box(out, 'solid', 0x476051, 0.52, 1.6, 0.20, x + s * 1.09, y, 4.76);
      box(out, 'solid', 0xc1b598, 1.8, 0.13, 0.34, x, y - 0.8, 4.82);
      box(out, 'solid', timber, 0.1, 1.53, 0.14, x, y, 4.8);
    }
  }
  box(out, 'solid', 0x5f4934, 14, 0.3, 2.0, 0, 3.95, 5.2);
  rail(out, 13.5, 6.2, 4.12, timber);
  for (let x = -6.2; x <= 6.3; x += 3.1) {
    beam(out, timber, [x, 0.9, 6], [x, 6.35, 6], 0.22);
    beam(out, timber, [x, 5.35, 6], [x + 0.65, 6.3, 6], 0.12);
  }
  gableRoof(out, 14.8, 12, 6.35, 3.0, 0x515857);
  box(out, 'solid', 0x7c8177, 1.0, 3.0, 1.0, -4.1, 8.4, -1.8);
  box(out, 'metal', 0x393f3c, 1.28, 0.14, 1.28, -4.1, 9.94, -1.8);
  for (let i = 0; i < 4; i++) box(out, 'solid', 0x898779, 3.6, 0.24, 0.55, 0, 0.13 + i * 0.23, 6.8 - i * 0.45);
}

function desertPavilion(out) {
  const clay = 0xaa8060, shade = 0xd1bc91;
  box(out, 'solid', 0x927756, 23.4, 0.45, 15, 0, 0.18, 0);
  // A low desert race station: thick walls, deeply recessed openings and
  // perforated sun screens; the roof spans are tensile, not solid box slabs.
  box(out, 'solid', clay, 19.8, 4.2, 6.7, 0, 2.5, -3.0);
  windows(out, 17.4, 2.6, 0.42, 2.25, 7, 0x715d46);
  for (const x of [-10, -5, 0, 5, 10]) {
    box(out, 'solid', 0xb38d68, 0.65, 4.5, 7.4, x, 2.55, -2.7);
    beam(out, 0x777264, [x, 0.45, 6.0], [x, 6.5, 6.0], 0.14);
  }
  box(out, 'solid', 0xc1a07a, 21.2, 0.32, 8.0, 0, 4.77, -2.6);
  for (let x = -8.5; x < 9; x += 1.1) box(out, 'solid', 0x8f7151, 0.16, 2.2, 0.22, x, 2.75, 0.7);
  for (let k = 0; k < 4; k++) {
    const x = -7.5 + k * 5;
    const positions = [x - 2.45, 5.05, -0.3, x + 2.45, 5.05, -0.3, x - 2.45, 5.15, 6.05, x + 2.45, 5.15, 6.05, x, 7.4, 2.85];
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    g.setIndex([0, 4, 1, 1, 4, 3, 3, 4, 2, 2, 4, 0]);
    g.computeVertexNormals();
    // Include UVs so all the other box/extrusion geometry merges cleanly.
    g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(10), 2));
    out.solid.push(colourGeometry(g, shade));
    beam(out, 0x7e7868, [x, 0.45, 2.85], [x, 7.5, 2.85], 0.13);
  }
  // Stepped wind tower marks the station at driving height.
  box(out, 'solid', 0xaa835d, 3.5, 8.0, 3.8, -8.2, 4.45, -3.0);
  box(out, 'solid', 0x665c49, 2.9, 1.7, 4.05, -8.2, 8.2, -3.0);
  for (const x of [-9.75, -6.65]) box(out, 'solid', 0xbc9970, 0.4, 2.0, 4.2, x, 8.3, -3.0);
  box(out, 'solid', 0xc2a67c, 4.2, 0.28, 4.5, -8.2, 9.4, -3.0);
}

const PLANS = {
  gp: [{ at: 0.082, side: -1, w: 23, d: 14, build: (o) => raceControl(o, 'gp') }],
  sprint: [{ at: 0.075, side: -1, w: 15, d: 11, build: speedwayTower }],
  parco: [{ at: 0.105, side: 1, w: 23, d: 14, build: (o) => raceControl(o, 'parco') }],
  alpine: [{ at: 0.055, side: -1, w: 17, d: 15, build: alpineLodge }, { at: 0.475, side: 1, w: 17, d: 15, build: alpineLodge }],
  dunes: [{ at: 0.065, side: -1, w: 25, d: 17, build: desertPavilion }, { at: 0.625, side: 1, w: 25, d: 17, build: desertPavilion }],
};

function chooseSite(frames, D, plan) {
  const n = frames.length;
  const desired = Math.round(plan.at * n) % n;
  for (const shift of [0, 10, -10, 22, -22, 38, -38, 58, -58]) {
    const frame = frames[(desired + shift + n) % n];
    for (const side of [plan.side, -plan.side]) {
      const offset = D.armco + 25;
      const x = frame.pos.x + frame.left.x * side * offset;
      const z = frame.pos.z + frame.left.z * side * offset;
      const yaw = Math.atan2(-frame.left.x * side, -frame.left.z * side);
      const cos = Math.cos(yaw), sin = Math.sin(yaw);
      let clearance = Infinity;
      for (const f of frames) {
        const dx = f.pos.x - x, dz = f.pos.z - z;
        const lx = cos * dx - sin * dz, lz = sin * dx + cos * dz;
        const distance = Math.hypot(Math.max(0, Math.abs(lx) - plan.w / 2), Math.max(0, Math.abs(lz) - plan.d / 2));
        clearance = Math.min(clearance, distance);
      }
      if (clearance < D.armco + 6) continue;
      let flat = true;
      for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
        const lx = sx * plan.w / 2, lz = sz * plan.d / 2;
        if (Math.abs(D.terrain?.height(x + cos * lx + sin * lz, z - sin * lx + cos * lz) || 0) > 0.08) flat = false;
      }
      if (!flat) continue;
      return { x, z, yaw, width: plan.w, depth: plan.d, roadClearance: clearance, frameIndex: frames.indexOf(frame) };
    }
  }
  return null;
}

// Trees are spatially batched and some carry local cell offsets. Remove only
// instances inside the accepted building clearing, updating both LOD levels,
// so roofs cannot sprout tree trunks after the forest bounds correction.
function clearVegetation(scene, footprints) {
  scene.updateMatrixWorld(true);
  const local = new THREE.Matrix4(), world = new THREE.Matrix4(), colour = new THREE.Color();
  let removed = 0;
  scene.traverse((mesh) => {
    if (!mesh.isInstancedMesh) return;
    const isTree = mesh.name.startsWith('trees-');
    if (!isTree && !['grassTufts', 'flowerDrifts', 'shrubs', 'alpineRock', 'hedgerows'].includes(mesh.name)) return;
    const margin = isTree ? 6.5 : mesh.name === 'shrubs' || mesh.name === 'alpineRock' ? 2.5 : 0.8;
    let kept = 0;
    for (let i = 0; i < mesh.count; i++) {
      mesh.getMatrixAt(i, local); world.multiplyMatrices(mesh.matrixWorld, local);
      const x = world.elements[12], z = world.elements[14];
      const excluded = footprints.some((site) => {
        const dx = x - site.x, dz = z - site.z;
        const cos = Math.cos(site.yaw), sin = Math.sin(site.yaw);
        return Math.abs(cos * dx - sin * dz) < site.width / 2 + margin && Math.abs(sin * dx + cos * dz) < site.depth / 2 + margin;
      });
      if (excluded) { removed++; continue; }
      if (kept !== i) {
        mesh.setMatrixAt(kept, local);
        if (mesh.instanceColor) { mesh.getColorAt(i, colour); mesh.setColorAt(kept, colour); }
      }
      kept++;
    }
    mesh.count = kept; mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
  });
  return removed;
}

export function addVenueScenery(scene, frames, D) {
  const plans = PLANS[D.id];
  if (!plans) return;
  const all = { solid: [], metal: [], glass: [] }, footprints = [];
  for (const plan of plans) {
    const site = chooseSite(frames, D, plan);
    if (!site) continue;
    const parts = { solid: [], metal: [], glass: [] };
    plan.build(parts);
    const transform = new THREE.Matrix4().makeRotationY(site.yaw);
    transform.setPosition(site.x, 0, site.z);
    for (const key of Object.keys(parts)) for (const g of parts[key]) {
      g.applyMatrix4(transform); all[key].push(g);
    }
    footprints.push(site);
  }
  if (!footprints.length) return;
  const group = new THREE.Group();
  group.name = `venue-${D.id}`;
  group.userData.venueFootprints = footprints;
  group.userData.removedVegetationInstances = clearVegetation(scene, footprints);
  const materials = {
    solid: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.88, metalness: 0.02, side: THREE.DoubleSide }),
    metal: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.48, metalness: 0.55 }),
    glass: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.15, metalness: 0.72, envMapIntensity: 1.1 }),
  };
  for (const key of Object.keys(all)) {
    if (!all[key].length) { materials[key].dispose(); continue; }
    const geo = mergeGeometries(all[key], false);
    for (const g of all[key]) g.dispose();
    geo.computeBoundingSphere();
    const mesh = new THREE.Mesh(geo, materials[key]);
    mesh.name = `venue-${key}`;
    mesh.castShadow = key !== 'glass'; mesh.receiveShadow = true;
    group.add(mesh);
  }
  scene.add(group);
}
