import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { makeNormalTexture } from './noise.js';
import { rand } from './rng.js';

// The harbour sits entirely beyond the easternmost circuit wall. Geometry is
// merged by finish: adding a berth or a yacht never adds another draw call.
export function addMarina(scene, frames, D) {
  let maxX = -Infinity;
  for (const f of frames) maxX = Math.max(maxX, f.pos.x);
  const edge = maxX + D.armco + 9;
  let zMin = Infinity, zMax = -Infinity;
  for (const f of frames) {
    if (f.pos.x > maxX - 40) {
      zMin = Math.min(zMin, f.pos.z);
      zMax = Math.max(zMax, f.pos.z);
    }
  }
  zMin -= 60; zMax += 60;
  const span = zMax - zMin, midZ = (zMax + zMin) / 2;
  const harbour = new THREE.Group();
  harbour.name = 'marina';
  harbour.userData.shoreX = edge;
  scene.add(harbour);

  const finishes = {
    limestone: [0xb8b3a3, 0.92, 0],
    foundation: [0x6e736d, 0.94, 0],
    iron: [0x33434a, 0.47, 0.65],
    timber: [0x947653, 0.82, 0],
    rubber: [0x242e34, 0.94, 0],
    ivory: [0xe1e3df, 0.29, 0.12],
    navy: [0x173f53, 0.28, 0.22],
    glass: [0x244a5c, 0.16, 0.48],
    stainless: [0xaab7b8, 0.27, 0.8],
    canvas: [0xc4b48e, 0.86, 0],
    trunk: [0x786049, 0.97, 0],
    fronds: [0x496334, 0.9, 0],
    leaflets: [0x3b5730, 0.94, 0],
  };
  const buckets = Object.fromEntries(Object.keys(finishes).map(k => [k, []]));
  const add = (finish, geo, transform = null) => {
    // Normalise attributes so custom lofts, foliage, and standard primitives
    // can share a material batch without retaining discarded source buffers.
    if (geo.index) {
      const source = geo;
      geo = source.toNonIndexed();
      source.dispose();
    }
    geo.deleteAttribute('uv');
    if (transform) geo.applyMatrix4(transform);
    buckets[finish].push(geo);
  };
  const box = (finish, w, h, d, x, y, z, transform = null) => {
    const geo = new THREE.BoxGeometry(w, h, d);
    geo.translate(x, y, z);
    add(finish, geo, transform);
  };
  const rod = (finish, a, b, r, transform = null, sides = 5) => {
    const start = new THREE.Vector3(...a), end = new THREE.Vector3(...b);
    const delta = end.clone().sub(start);
    const geo = new THREE.CylinderGeometry(r, r, delta.length(), sides);
    geo.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0), delta.normalize()));
    geo.translate(...start.add(end).multiplyScalar(0.5).toArray());
    add(finish, geo, transform);
  };
  const panel = (finish, corners, transform = null) => {
    const positions = [];
    for (const i of (corners.length === 3 ? [0, 1, 2] : [0, 1, 2, 0, 2, 3])) positions.push(...corners[i]);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.computeVertexNormals();
    add(finish, geo, transform);
  };

  const ripple = makeNormalTexture(256, 1.4);
  ripple.wrapS = ripple.wrapT = THREE.RepeatWrapping;
  ripple.repeat.set(240, 190);
  const water = new THREE.Mesh(new THREE.PlaneGeometry(3800, 4200),
    new THREE.MeshStandardMaterial({
      color: 0x1d5362, roughness: 0.25, metalness: 0.18,
      normalMap: ripple, normalScale: new THREE.Vector2(0.7, 0.45),
      envMapIntensity: 1.15,
    }));
  water.name = 'marina-water';
  water.rotation.x = -Math.PI / 2;
  water.position.set(edge + 1900, 0.005, midZ);
  water.receiveShadow = true;
  harbour.add(water);

  // Slab joints, a darker retaining face and individual coping stones give
  // the waterfront a human scale at driving height as well as from above.
  box('limestone', 9, 0.1, span, edge - 4.5, 0.025, midZ);
  box('foundation', 0.8, 0.52, span, edge - 0.15, 0, midZ);
  for (let z = zMin; z < zMax; z += 2.5) {
    const length = Math.min(2.46, zMax - z);
    box('limestone', 1.12, 0.14, length, edge - 0.15, 0.32, z + length / 2);
    box('foundation', 7.7, 0.006, 0.024, edge - 4.7, 0.079, z);
  }
  box('foundation', 0.035, 0.006, span, edge - 3.25, 0.079, midZ);
  box('foundation', 0.035, 0.006, span, edge - 6.1, 0.079, midZ);

  const pierZs = [0.18, 0.5, 0.82].map(t => zMin + span * t);
  const atEntrance = z => pierZs.some(pz => Math.abs(z - pz) < 2.4);
  for (let z = zMin + 1; z < zMax - 1; z += 3) {
    if (atEntrance(z)) continue;
    rod('iron', [edge - 0.55, 0.37, z], [edge - 0.55, 1.38, z], 0.045);
    const next = Math.min(z + 3, zMax - 1);
    if (!atEntrance((z + next) / 2) && !atEntrance(next)) {
      rod('iron', [edge - 0.55, 1.35, z], [edge - 0.55, 1.35, next], 0.047);
      rod('iron', [edge - 0.55, 0.84, z], [edge - 0.55, 0.84, next], 0.029);
    }
  }

  // Floating pontoons form coherent berths, with fingers, rubber bump strips,
  // mooring cleats and power pedestals. The landward end meets a rail opening.
  for (const pz of pierZs) {
    box('rubber', 44, 0.23, 3.35, edge + 22, 0.15, pz);
    box('timber', 44, 0.16, 3.1, edge + 22, 0.33, pz);
    for (let x = edge + 1; x < edge + 44; x += 1.1)
      box('foundation', 0.025, 0.009, 3.04, x, 0.414, pz);
    for (let j = 0; j < 4; j++) {
      const px = edge + 9 + j * 10;
      box('rubber', 1.48, 0.22, 28, px, 0.13, pz);
      box('timber', 1.28, 0.15, 28, px, 0.31, pz);
      for (const side of [-1, 1]) {
        for (let k = 3; k <= 13; k += 1.1)
          box('foundation', 1.23, 0.008, 0.026, px, 0.39, pz + side * k);
        rod('iron', [px, 0.39, pz + side * 12.9], [px, 0.59, pz + side * 12.9], 0.065);
        rod('iron', [px - 0.2, 0.59, pz + side * 12.9], [px + 0.2, 0.59, pz + side * 12.9], 0.045);
        box('ivory', 0.3, 0.7, 0.25, px, 0.75, pz + side * 2.1);
        box('navy', 0.32, 0.08, 0.27, px, 1.09, pz + side * 2.1);
      }
    }
  }

  // A real hull cross-section: flared gunwales, chines, a V keel, broad
  // transom, and a rising pointed bow. Stations also define the rub rail.
  function yacht(px, pz, length, beam, yaw, sailing, blueHull) {
    const matrix = new THREE.Matrix4().makeRotationY(yaw);
    matrix.setPosition(px, 0, pz);
    const stations = [
      [-0.5, 0.77, 0.64], [-0.35, 0.96, 0.66], [-0.10, 1, 0.71],
      [0.18, 0.91, 0.76], [0.35, 0.60, 0.86], [0.48, 0.14, 1.01], [0.52, 0.015, 1.06],
    ];
    const rings = stations.map(([z, w, y]) => {
      const half = w * beam / 2;
      return [[-half, y, z * length], [-half * 0.84, 0.06, z * length],
        [0, -0.32 + Math.max(0, z) * 0.5, z * length], [half * 0.84, 0.06, z * length], [half, y, z * length]];
    });
    const positions = [];
    const tri = (a, b, c) => positions.push(...a, ...b, ...c);
    for (let s = 0; s < rings.length - 1; s++) {
      for (let v = 0; v < 5; v++) {
        const n = (v + 1) % 5;
        tri(rings[s][v], rings[s][n], rings[s + 1][n]);
        tri(rings[s][v], rings[s + 1][n], rings[s + 1][v]);
      }
      // Contrasting gunwale stripe follows the sheer rather than covering it
      // with a rectangular block; flat dark glazing has its own finish.
      for (const side of [0, 4]) {
        const a = rings[s][side], b = rings[s + 1][side];
        const sign = side === 0 ? -1 : 1;
        panel(blueHull ? 'ivory' : 'navy', [
          [a[0] + sign * 0.014, a[1] - 0.16, a[2]],
          [b[0] + sign * 0.014, b[1] - 0.16, b[2]],
          [b[0] + sign * 0.014, b[1] - 0.04, b[2]],
          [a[0] + sign * 0.014, a[1] - 0.04, a[2]],
        ], matrix);
      }
    }
    for (let v = 1; v < 4; v++) tri(rings[0][0], rings[0][v + 1], rings[0][v]);
    const hull = new THREE.BufferGeometry();
    hull.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    hull.computeVertexNormals();
    add(blueHull ? 'navy' : 'ivory', hull, matrix);

    box('timber', beam * 0.60, 0.055, length * 0.25, 0, 0.72, -length * 0.30, matrix);
    box('ivory', beam * 0.65, 0.14, 0.65, 0, 0.38, -length * 0.51, matrix); // swim platform
    if (sailing) {
      const coach = new THREE.BoxGeometry(beam * 0.59, 0.48, length * 0.36);
      const p = coach.getAttribute('position');
      for (let v = 0; v < p.count; v++) if (p.getY(v) > 0) p.setX(v, p.getX(v) * 0.79);
      coach.computeVertexNormals();
      coach.translate(0, 0.93, length * 0.015);
      add('ivory', coach, matrix);
      for (const sign of [-1, 1]) {
        for (let j = 0; j < 3; j++)
          box('glass', 0.03, 0.19, 0.56, sign * beam * 0.28, 1.0, length * (-0.11 + j * 0.095), matrix);
      }
      const mastZ = length * 0.10, mastH = length * 0.96;
      rod('stainless', [0, 1.15, mastZ], [0, mastH, mastZ], 0.055, matrix, 7);
      rod('stainless', [0, 2.12, mastZ], [0, 2.12, -length * 0.35], 0.05, matrix);
      rod('canvas', [0, 2.17, mastZ], [0, 2.17, -length * 0.35], 0.13, matrix, 7); // furled mainsail
      rod('stainless', [0, mastH - 0.3, mastZ], [0, 1.12, length * 0.46], 0.014, matrix);
      for (const sign of [-1, 1])
        rod('stainless', [0, mastH * 0.78, mastZ], [sign * beam * 0.44, 0.75, -length * 0.18], 0.011, matrix);
      rod('stainless', [-0.72, mastH * 0.6, mastZ], [0.72, mastH * 0.6, mastZ], 0.025, matrix);
    } else {
      // A raked coachroof with continuous side glazing, front windscreen,
      // flybridge and sheltered cockpit reads as a yacht at road distance.
      const half = beam * 0.36, front = length * 0.18, rear = -length * 0.22;
      for (const sign of [-1, 1]) panel('glass', [
        [sign * half, 0.82, rear], [sign * half, 0.86, front],
        [sign * half * 0.81, 1.65, front - 0.68], [sign * half * 0.86, 1.71, rear + 0.15],
      ], matrix);
      panel('glass', [[-half, 0.86, front], [half, 0.86, front],
        [half * 0.81, 1.65, front - 0.68], [-half * 0.81, 1.65, front - 0.68]], matrix);
      box('ivory', beam * 0.66, 0.13, length * 0.34, 0, 1.75, -length * 0.06, matrix);
      box('ivory', beam * 0.54, 0.18, length * 0.19, 0, 1.93, -length * 0.075, matrix);
      box('canvas', beam * 0.57, 0.1, length * 0.14, 0, 1.71, -length * 0.29, matrix);
      for (const sign of [-1, 1]) {
        rod('stainless', [sign * beam * 0.26, 0.73, -length * 0.35],
          [sign * beam * 0.26, 1.66, -length * 0.35], 0.025, matrix);
        box('ivory', 0.24, 0.24, length * 0.15, sign * beam * 0.24, 0.92, -length * 0.3, matrix);
        rod('ivory', [sign * half * 0.88, 1.67, rear + 0.15],
          [sign * half, 0.8, rear], 0.045, matrix);
      }
      rod('stainless', [0, 1.97, -length * 0.13], [0, 2.65, -length * 0.13], 0.035, matrix);
      box('ivory', 0.65, 0.1, 0.18, 0, 2.57, -length * 0.13, matrix);
    }
    // Bow pulpit, fenders and mooring lines survive close views. Fenders hang
    // off the hull, not at its centre; boats remain separated from pontoons.
    for (const sign of [-1, 1]) {
      const rail = [[sign * beam * 0.43, 1.24, length * 0.15],
        [sign * beam * 0.27, 1.35, length * 0.34], [sign * 0.05, 1.50, length * 0.49]];
      for (let k = 0; k < rail.length - 1; k++) rod('stainless', rail[k], rail[k + 1], 0.021, matrix);
      for (const pt of rail) rod('stainless', [pt[0], pt[1] - 0.44, pt[2]], pt, 0.018, matrix);
      for (const z of [-length * 0.27, length * 0.02]) {
        const fender = new THREE.CapsuleGeometry(0.12, 0.3, 3, 6);
        fender.translate(sign * (beam * 0.5 + 0.07), 0.45, z);
        add('ivory', fender, matrix);
      }
      rod('canvas', [sign * beam * 0.3, 0.74, -length * 0.45],
        [sign * 4.2, 0.48, -length * 0.51 - 0.5], 0.022, matrix);
    }
  }
  for (let p = 0; p < pierZs.length; p++) {
    for (let j = 0; j < 3; j++) {
      for (const side of [-1, 1]) {
        const length = 9.0 + rand() * 3.3;
        yacht(edge + 14 + j * 10, pierZs[p] + side * (2.35 + length / 2),
          length, 2.9 + rand() * 0.55, side > 0 ? 0 : Math.PI,
          (p + j + (side > 0 ? 1 : 0)) % 3 === 0, (p + j) % 3 === 1);
      }
    }
  }

  // Open, arched fronds with separated leaflets replace the old broad cards.
  // Their roots meet the crown, rather than rotating a plane about its centre.
  const palmCount = Math.max(6, Math.floor(span / 18));
  for (let i = 0; i < palmCount; i++) {
    const pz = zMin + 8 + i * (span - 16) / (palmCount - 1);
    if (atEntrance(pz)) continue;
    const px = edge - 4.8;
    const height = 5.2 + rand() * 1.3, sway = (rand() - 0.5) * 0.7;
    const transform = new THREE.Matrix4().makeTranslation(px, 0.08, pz);
    box('foundation', 1.9, 0.2, 1.9, px, 0.16, pz);
    box('trunk', 1.58, 0.025, 1.58, px, 0.275, pz);
    for (let n = 0; n < 6; n++) {
      const t = n / 6, u = (n + 1) / 6;
      const a = [sway * t * t, height * t, 0], b = [sway * u * u, height * u, 0];
      rod('trunk', a, b, 0.19 - t * 0.075, transform, 7);
    }
    const phase = rand() * Math.PI * 2;
    for (let f = 0; f < 10; f++) {
      const angle = phase + f * Math.PI * 2 / 10;
      const length = 2.45 + rand() * 0.65;
      const direction = new THREE.Vector3(Math.cos(angle), 0, Math.sin(angle));
      const across = new THREE.Vector3(-direction.z, 0, direction.x);
      const point = t => new THREE.Vector3(sway, height + 0.65 * Math.sin(t * Math.PI) - t * t * 0.74, 0)
        .addScaledVector(direction, length * t);
      for (let k = 0; k < 6; k++) rod('fronds', point(k / 6).toArray(), point((k + 1) / 6).toArray(), 0.028, transform, 4);
      for (let k = 1; k < 10; k++) {
        const t = k / 10, base = point(t);
        const width = Math.sin(Math.PI * t) * 0.49;
        for (const side of [-1, 1]) {
          const tip = base.clone().addScaledVector(across, side * width).addScaledVector(direction, 0.30);
          tip.y -= 0.18 + t * 0.16;
          const next = point(t + 0.065);
          panel((k + f) % 3 ? 'leaflets' : 'fronds', [base.toArray(), tip.toArray(), next.toArray()], transform);
        }
      }
    }
    if (i % 2 === 0) {
      const bz = pz + 4.3;
      box('timber', 0.54, 0.11, 2.0, edge - 3.4, 0.55, bz);
      box('timber', 0.11, 0.48, 2.0, edge - 3.67, 0.87, bz);
      for (const dz of [-0.72, 0.72]) box('iron', 0.52, 0.44, 0.09, edge - 3.4, 0.3, bz + dz);
    }
  }

  for (const [finish, geos] of Object.entries(buckets)) {
    if (!geos.length) continue;
    const [color, roughness, metalness] = finishes[finish];
    const material = new THREE.MeshStandardMaterial({ color, roughness, metalness,
      side: ['fronds', 'leaflets', 'glass', 'navy', 'ivory'].includes(finish) ? THREE.DoubleSide : THREE.FrontSide });
    const merged = mergeGeometries(geos);
    for (const geo of geos) geo.dispose();
    merged.computeBoundingSphere();
    const mesh = new THREE.Mesh(merged, material);
    mesh.name = `marina-${finish}`;
    mesh.castShadow = finish !== 'glass';
    mesh.receiveShadow = true;
    harbour.add(mesh);
  }
}
