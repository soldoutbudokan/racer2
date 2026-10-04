/**
 * Shared, metre-scaled architecture for the street circuit. A building is a
 * podium, a habitable shaft and a roof, rather than a facade texture wrapped
 * over a single box. All detail remains inside the supplied footprint and
 * is merged by material: more architectural shape, no mesh per window.
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { rand } from './rng.js';

export function createCityArchitecture(scene, { facadeMats, podiumMat }, name) {
  const facades = facadeMats.map(() => []);
  const stone = [], roofs = [], glass = [], metal = [], planted = [];
  const footprints = [];
  const stoneMat = new THREE.MeshStandardMaterial({ color: 0xc1b9a9, roughness: 0.83, metalness: 0.02 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x71818a, roughness: 0.38, metalness: 0.58 });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x656a68, roughness: 0.96 });
  const plantMat = new THREE.MeshStandardMaterial({ color: 0x40583e, roughness: 0.95 });

  function box(bucket, w, h, d, x, y, z) {
    const g = new THREE.BoxGeometry(w, h, d);
    g.translate(x, y, z);
    bucket.push(g);
  }

  // An eight-sided shaft gives real corner highlights in the skyline. UVs
  // follow each face's width, including the short chamfers; a window bay
  // stays ~2.2 m wide and a floor stays 3 m tall on every building face.
  function shaft(bucket, x, z, w, d, base, h, chamfer = 0, tileHeight = 24) {
    const c = Math.min(chamfer, w * 0.15, d * 0.15);
    const outline = c > 0 ? [
      [-w / 2 + c, -d / 2], [w / 2 - c, -d / 2],
      [w / 2, -d / 2 + c], [w / 2, d / 2 - c],
      [w / 2 - c, d / 2], [-w / 2 + c, d / 2],
      [-w / 2, d / 2 - c], [-w / 2, -d / 2 + c],
    ] : [[-w / 2, -d / 2], [w / 2, -d / 2], [w / 2, d / 2], [-w / 2, d / 2]];
    const positions = [], uvs = [], indices = [];
    for (let i = 0; i < outline.length; i++) {
      const a = outline[i], b = outline[(i + 1) % outline.length];
      const s = positions.length / 3;
      const u = Math.hypot(a[0] - b[0], a[1] - b[1]) / 13;
      positions.push(x + a[0], base, z + a[1], x + a[0], base + h, z + a[1],
        x + b[0], base + h, z + b[1], x + b[0], base, z + b[1]);
      uvs.push(0, 0, 0, h / tileHeight, u, h / tileHeight, u, 0);
      indices.push(s, s + 1, s + 2, s, s + 2, s + 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    g.setIndex(indices);
    g.computeVertexNormals();
    bucket.push(g);
    // Close the roof with its own material, so windows never appear on it.
    const roofPositions = [x, base + h, z], roofUvs = [0.5, 0.5], roofIndices = [];
    for (const p of outline) {
      roofPositions.push(x + p[0], base + h, z + p[1]);
      roofUvs.push(p[0] / w + 0.5, p[1] / d + 0.5);
    }
    for (let i = 0; i < outline.length; i++) roofIndices.push(0, (i + 1) % outline.length + 1, i + 1);
    const roof = new THREE.BufferGeometry();
    roof.setAttribute('position', new THREE.Float32BufferAttribute(roofPositions, 3));
    roof.setAttribute('uv', new THREE.Float32BufferAttribute(roofUvs, 2));
    roof.setIndex(roofIndices);
    roof.computeVertexNormals();
    roofs.push(roof);
  }

  function parapet(x, z, w, d, y, bucket = stone, thickness = 0.22) {
    box(bucket, w, 0.5, thickness, x, y + 0.25, z - d / 2 + thickness / 2);
    box(bucket, w, 0.5, thickness, x, y + 0.25, z + d / 2 - thickness / 2);
    box(bucket, thickness, 0.5, d - thickness * 2, x - w / 2 + thickness / 2, y + 0.25, z);
    box(bucket, thickness, 0.5, d - thickness * 2, x + w / 2 - thickness / 2, y + 0.25, z);
  }

  function plantRoom(x, z, w, d, top, detail) {
    const pw = Math.max(2, w * 0.34), pd = Math.max(2, d * 0.28);
    box(metal, pw, 1.8, pd, x, top + 0.9, z);
    box(roofs, pw + 0.18, 0.14, pd + 0.18, x, top + 1.87, z);
    if (detail) {
      // Vent slots and a duct, seated on the actual crown, not the old shaft.
      for (let i = 0; i < 3; i++) box(roofs, pw - 0.3, 0.12, 0.08, x, top + 0.5 + i * 0.4, z + pd / 2 + 0.045);
      box(metal, Math.min(3, w * 0.25), 0.5, 0.75, x + w * 0.25, top + 0.25, z);
    }
  }

  function addBuilding({ x, z, width: w, depth: d, height, matIndex = 0, style = 'office', detail = false, landmark = false }) {
    // The outer lot includes columns, balconies and cornices. Nothing
    // projects beyond it, so the caller's whole-circuit clearance is exact.
    const pad = 0.18;
    box(stone, w, pad, d, x, pad / 2, z);
    const ph = style === 'masonry' ? 3.7 : 4.4;
    const pw = w - 0.65, pd = d - 0.65;
    shaft(glass, x, z, pw - 0.9, pd - 0.9, pad, ph, 0, ph);
    box(stone, pw, 0.34, pd, x, ph + pad, z);
    if (detail) {
      // Recessed shop glazing with actual supports and projecting canopies.
      for (const sign of [-1, 1]) {
        const bays = Math.max(2, Math.floor(pw / 4.3));
        for (let i = 0; i <= bays; i++) box(stone, 0.3, ph, 0.5,
          x - pw / 2 + 0.25 + i * (pw - 0.5) / bays, pad + ph / 2, z + sign * (pd / 2 - 0.24));
        box(metal, pw - 1, 0.12, 0.7, x, 3.15, z + sign * (pd / 2 - 0.35));
      }
      for (const sign of [-1, 1]) box(stone, 0.4, ph, 0.4, x + sign * (pw / 2 - 0.2), pad + ph / 2, z);
    }

    const base = ph + pad + 0.17;
    const tw = Math.max(7, w - (style === 'masonry' ? 1.5 : 3.4));
    const td = Math.max(7, d - (style === 'masonry' ? 1.5 : 3.4));
    const h = Math.max(6, Math.round((height - base) / 3) * 3);
    let roofX = x, roofZ = z, roofW = tw, roofD = td, roofY = base + h;
    if (style === 'office') {
      const stepped = landmark || h > 45;
      const lower = stepped ? Math.round(h * 0.76 / 3) * 3 : h;
      shaft(facades[matIndex], x, z, tw, td, base, lower, 1.35);
      // Slim corner mullions make the chamfer legible at driving distance.
      if (detail) for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
        box(metal, 0.24, lower, 0.24, x + sx * (tw / 2 - 1.3), base + lower / 2, z + sz * (td / 2 - 0.05));
      }
      if (stepped) {
        roofW = tw * 0.73; roofD = td * 0.76;
        roofX = x + (tw - roofW) * 0.16;
        roofZ = z - (td - roofD) * 0.12;
        shaft(facades[matIndex], roofX, roofZ, roofW, roofD, base + lower, h - lower, 1.1);
        box(metal, roofW - 2.2, 0.4, roofD, roofX, roofY + 0.2, roofZ);
      }
    } else if (style === 'residential') {
      const lower = Math.max(3, h - 6);
      shaft(facades[matIndex], x, z, tw, td, base, lower);
      roofW = tw * 0.78; roofD = td * 0.7;
      roofZ = z - (td - roofD) * 0.2;
      shaft(facades[matIndex], roofX, roofZ, roofW, roofD, base + lower, h - lower);
      parapet(x, z, tw, td, base + lower);
      // Continuous balconies are real floor slabs with a dark railing band;
      // only foreground buildings receive the small repetitive geometry.
      if (detail) for (let y = base + 3; y < base + lower; y += 6) {
        for (const s of [-1, 1]) {
          box(stone, tw + 0.7, 0.15, 0.92, x, y, z + s * (td / 2 + 0.33));
          box(metal, tw + 0.7, 0.1, 0.07, x, y + 0.93, z + s * (td / 2 + 0.74));
          for (const sx of [-1, 1]) box(metal, 0.07, 0.9, 0.07, x + sx * tw / 2, y + 0.46, z + s * (td / 2 + 0.74));
        }
      }
      box(planted, tw * 0.7, 0.5, 0.9, x, base + lower + 0.25, z + td / 2 - 0.8);
    } else {
      shaft(facades[matIndex], x, z, tw, td, base, h);
      // Strong cornice and two horizontal string courses distinguish older
      // masonry blocks from reflective towers without overscaling windows.
      for (const y of [base + 0.55, base + h - 0.35]) box(stone, tw + 0.55, 0.25, td + 0.55, x, y, z);
      if (detail) for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
        box(stone, 0.38, h, 0.38, x + sx * (tw / 2 - 0.14), base + h / 2, z + sz * (td / 2 - 0.14));
      }
    }
    // Rectangular parapets suit masonry; office crowns retain their clipped
    // silhouette and use a small central plant enclosure instead.
    if (style !== 'office') parapet(roofX, roofZ, roofW, roofD, roofY);
    plantRoom(roofX, roofZ, roofW, roofD, roofY, detail);
    if (landmark && Math.min(roofW, roofD) > 9) {
      box(metal, 0.15, 5, 0.15, roofX, roofY + 4.3, roofZ);
    }
    footprints.push({ x, z, halfWidth: w / 2, halfDepth: d / 2, height: roofY + (landmark ? 6.8 : 2), style });
  }

  function finish() {
    let tagged = false;
    const add = (geos, mat, suffix, shadow = true) => {
      if (!geos.length) return;
      const geo = mergeGeometries(geos);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.name = `${name}-${suffix}`;
      mesh.castShadow = shadow;
      mesh.receiveShadow = true;
      if (!tagged) { mesh.userData.cityBuildings = footprints; tagged = true; }
      scene.add(mesh);
      for (const g of geos) g.dispose();
    };
    facades.forEach((geos, i) => add(geos, facadeMats[i], `facade-${i}`));
    add(glass, podiumMat, 'retail');
    add(stone, stoneMat, 'stone');
    add(metal, metalMat, 'metal');
    add(roofs, roofMat, 'roofs', false);
    add(planted, plantMat, 'terraces', false);
    return { buildings: footprints.length };
  }
  return { addBuilding, finish };
}

/** Position-led neighbourhoods keep adjacent buildings visually related. */
export function cityBuildingStyle(x, z, centreX, centreZ, foreground = false) {
  const district = Math.sin((x - centreX) * 0.0044) + Math.cos((z - centreZ) * 0.0052);
  if (district < -0.05) return { style: 'masonry', matIndex: 3 + Math.floor(rand() * 3) };
  if (district < 0.94) return { style: 'residential', matIndex: 3 + Math.floor(rand() * 3) };
  return { style: 'office', matIndex: (foreground || rand() < 0.7) ? 6 + Math.floor(rand() * 2) : Math.floor(rand() * 3) };
}
