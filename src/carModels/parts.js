import * as THREE from 'three';
import {
  makeTrim, makeCarbon, makeChrome, makeSatin, makeHeadlight, makeLens,
  makeTaillight, makeGrille, makePaint,
} from './carMaterials.js';
import { plateTexture, badgeTexture } from './texgen.js';

// All parts authored in the same chassis-local frame as the hull
// (+Z forward, +Y up, +X right). Y values follow the proven placement from the
// original car so everything sits correctly on the wheels.

// ---- Headlight clusters: swept smoked lens over a dark housing with a
// projector + DRL blade. Tilted to lie along the nose, not stuck onto it. ----
export function buildHeadlights({ z = 1.92, y = 0.64, x = 0.60 } = {}) {
  const g = new THREE.Group();
  const housingMat = makeTrim();
  const lensMat = makeLens();
  const emit = makeHeadlight();
  for (const sx of [-1, 1]) {
    const cluster = new THREE.Group();
    // recessed housing, swept back at the outer end
    const housing = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.13, 0.12), housingMat);
    cluster.add(housing);
    // single projector
    const pod = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.05, 0.07, 16), emit);
    pod.rotation.x = Math.PI / 2;
    pod.position.set(-sx * 0.1, -0.005, 0.055);
    cluster.add(pod);
    const podRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.052, 0.012, 8, 18), housingMat);
    podRing.position.set(-sx * 0.1, -0.005, 0.088);
    cluster.add(podRing);
    // DRL blade along the top edge
    const drl = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.018, 0.02), emit);
    drl.position.set(0, 0.048, 0.055);
    drl.rotation.z = sx * 0.06;
    cluster.add(drl);
    // smoked lens cover
    const lens = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.15, 0.035), lensMat);
    lens.position.z = 0.075;
    cluster.add(lens);
    cluster.position.set(sx * x, y, z);
    cluster.rotation.y = sx > 0 ? -0.32 : 0.32;  // wrap around the nose
    cluster.rotation.x = -0.12;                  // follow the bonnet slope
    g.add(cluster);
  }
  return g;
}

// ---- Taillights. Returns { group, brakeMesh } — brakeMesh is the per-car
// emissive bar that car.js pulses on braking. ----
export function buildTaillights({ z = -2.04, y = 0.74, width = 1.5 } = {}) {
  const g = new THREE.Group();
  const housing = new THREE.Mesh(
    new THREE.BoxGeometry(width + 0.06, 0.16, 0.10), makeTrim());
  housing.position.set(0, y, z + 0.02);
  g.add(housing);

  const brakeMat = makeTaillight();
  const bar = new THREE.Mesh(
    new THREE.BoxGeometry(width, 0.09, 0.05), brakeMat);
  bar.position.set(0, y, z - 0.02);
  bar.userData.noMerge = true;   // pulsed per-frame; keep as its own mesh
  g.add(bar);

  // light-pipe accents at the ends
  for (const sx of [-1, 1]) {
    const pod = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 0.12, 16), brakeMat);
    pod.rotation.z = Math.PI / 2;
    pod.position.set(sx * (width / 2 - 0.02), y, z - 0.02);
    g.add(pod);
  }
  return { group: g, brakeMesh: bar };
}

// ---- Side mirrors on stalks ----
export function buildMirrors({ z = 0.5, y = 0.98, x = 0.95, color = 0xc8161d } = {}) {
  const g = new THREE.Group();
  const paint = makePaint(color);
  const mirrorFace = new THREE.MeshPhysicalMaterial({
    color: 0x8a9099, metalness: 1.0, roughness: 0.03,
  });
  for (const sx of [-1, 1]) {
    const m = new THREE.Group();
    const stalk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.018, 0.03, 0.16, 10), makeCarbon());
    stalk.rotation.z = sx * 0.9;
    stalk.position.set(sx * 0.08, 0.02, 0);
    m.add(stalk);
    const housing = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 14, 10), paint);
    housing.scale.set(1.1, 0.7, 0.7);
    housing.position.set(sx * 0.17, 0.05, 0);
    m.add(housing);
    const face = new THREE.Mesh(new THREE.CircleGeometry(0.06, 14), mirrorFace);
    face.position.set(sx * 0.18, 0.05, -0.06);
    face.rotation.y = Math.PI;
    m.add(face);
    m.position.set(sx * x, y, z);
    g.add(m);
  }
  return g;
}

// ---- Front grille / intake ----
export function buildGrille({ z = 2.02, y = 0.44, w = 0.9, h = 0.22 } = {}) {
  const g = new THREE.Group();
  const grille = new THREE.Mesh(new THREE.PlaneGeometry(w, h), makeGrille());
  grille.position.set(0, y, z);
  g.add(grille);
  // surround
  const surround = new THREE.Mesh(
    new THREE.BoxGeometry(w + 0.08, h + 0.06, 0.05), makeTrim());
  surround.position.set(0, y, z - 0.03);
  g.add(surround);
  return g;
}

// ---- Front splitter (carbon lip wrapping the nose) ----
export function buildSplitter({ z = 1.98, y = 0.28, w = 1.95 } = {}) {
  const g = new THREE.Group();
  const lip = new THREE.Mesh(new THREE.BoxGeometry(w, 0.05, 0.34), makeCarbon());
  lip.position.set(0, y, z);
  lip.castShadow = true;
  g.add(lip);
  // dive-plane canards
  for (const sx of [-1, 1]) {
    const c = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.02, 0.12), makeCarbon());
    c.position.set(sx * (w / 2 - 0.05), y + 0.08, z - 0.05);
    c.rotation.z = sx * 0.12;
    g.add(c);
  }
  return g;
}

// ---- Rear diffuser with vertical strakes ----
export function buildDiffuser({ z = -2.0, y = 0.30, w = 1.8 } = {}) {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.BoxGeometry(w, 0.16, 0.5), makeCarbon());
  base.position.set(0, y, z);
  base.castShadow = true;
  g.add(base);
  const n = 7;
  for (let i = 0; i < n; i++) {
    const strake = new THREE.Mesh(
      new THREE.BoxGeometry(0.03, 0.18, 0.5), makeCarbon());
    strake.position.set((i / (n - 1) - 0.5) * (w * 0.92), y + 0.02, z);
    g.add(strake);
  }
  return g;
}

// ---- Rear wing with a real airfoil section ----
export function buildWing({ z = -1.92, y = 1.06, span = 1.62, deckY = 0.82, style = 'gt' } = {}) {
  const g = new THREE.Group();
  if (style === 'ducktail') {
    // muscle: a lip spoiler off the rear deck instead of a wing
    const lip = new THREE.Mesh(new THREE.BoxGeometry(span, 0.06, 0.34), makePaint(0x111316));
    lip.position.set(0, deckY + 0.10, z + 0.18);
    lip.rotation.x = -0.18;
    g.add(lip);
    return g;
  }

  // airfoil cross-section (teardrop), extruded along its width then turned to X
  const af = new THREE.Shape();
  af.moveTo(-0.19, 0.0);
  af.quadraticCurveTo(-0.10, 0.05, 0.06, 0.032);
  af.quadraticCurveTo(0.15, 0.016, 0.19, 0.0);
  af.quadraticCurveTo(0.06, -0.03, -0.06, -0.028);
  af.quadraticCurveTo(-0.15, -0.02, -0.19, 0.0);
  const wingGeo = new THREE.ExtrudeGeometry(af, {
    depth: span, bevelEnabled: false, steps: 1,
  });
  wingGeo.translate(0, 0, -span / 2);
  wingGeo.rotateY(Math.PI / 2);     // span -> X
  const element = new THREE.Mesh(wingGeo, makeCarbon());
  element.rotation.x = -0.16;       // angle of attack
  element.position.set(0, y, z);
  element.castShadow = true;
  g.add(element);

  if (style === 'f1') {
    const e2 = element.clone();
    e2.position.y = y + 0.14;
    e2.rotation.x = -0.30;
    e2.scale.set(1, 0.7, 0.9);
    g.add(e2);
  }

  // endplates
  for (const sx of [-1, 1]) {
    const ep = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.22, 0.42), makeCarbon());
    ep.position.set(sx * span / 2, y, z);
    g.add(ep);
  }
  // swan-neck posts
  for (const sx of [-1, 1]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.04, y - deckY + 0.06, 0.10), makeChrome());
    post.position.set(sx * 0.55, (y + deckY) / 2, z + 0.02);
    g.add(post);
  }
  return g;
}

// ---- Exhaust tips ----
export function buildExhaust({ z = -2.07, y = 0.38, x = 0.45, count = 2 } = {}) {
  const g = new THREE.Group();
  const tipGeo = new THREE.CylinderGeometry(0.06, 0.07, 0.16, 18);
  tipGeo.rotateX(Math.PI / 2);
  const innerGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.17, 14);
  innerGeo.rotateX(Math.PI / 2);
  const xs = count === 4 ? [-x - 0.12, -x + 0.04, x - 0.04, x + 0.12] : [-x, x];
  for (const sx of xs) {
    const tip = new THREE.Mesh(tipGeo, makeChrome());
    tip.position.set(sx, y, z);
    g.add(tip);
    const inner = new THREE.Mesh(innerGeo, makeTrim());
    inner.position.set(sx, y, z - 0.01);
    g.add(inner);
  }
  return g;
}

// ---- Badges + license plate ----
export function buildBadgesAndPlate({ frontZ = 2.06, rearZ = -2.06, plateY = 0.42 } = {}) {
  const g = new THREE.Group();
  const badgeMat = new THREE.MeshStandardMaterial({
    map: badgeTexture(), metalness: 0.6, roughness: 0.3,
  });
  const badgeGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.012, 20);
  badgeGeo.rotateX(Math.PI / 2);
  const bF = new THREE.Mesh(badgeGeo, badgeMat);
  bF.position.set(0, 0.64, frontZ); g.add(bF);
  const bR = new THREE.Mesh(badgeGeo, badgeMat);
  bR.position.set(0, 0.84, rearZ); bR.rotation.y = Math.PI; g.add(bR);

  const plateMat = new THREE.MeshStandardMaterial({
    map: plateTexture(), roughness: 0.6, metalness: 0.0,
  });
  const plateGeo = new THREE.PlaneGeometry(0.42, 0.13);
  const pR = new THREE.Mesh(plateGeo, plateMat);
  pR.position.set(0, plateY, rearZ - 0.01);
  pR.rotation.y = Math.PI;
  g.add(pR);
  return g;
}

// ---- Flat underbody panel so you never see through the car ----
export function buildUnderbody({ y = 0.20, w = 1.7, len = 3.8 } = {}) {
  const u = new THREE.Mesh(new THREE.BoxGeometry(w, 0.04, len), makeTrim());
  u.position.set(0, y, 0);
  return u;
}

// ---- Wheel-arch liners: dark half-tubes over each wheel so the wheels sit
// inside real-looking housings instead of floating beside the hull. ----
let _archMat = null;
function archMaterial() {
  if (_archMat) return _archMat;
  _archMat = new THREE.MeshStandardMaterial({
    color: 0x0b0c0e, roughness: 0.94, metalness: 0.0, side: THREE.DoubleSide,
  });
  return _archMat;
}

export function buildArchLiners({
  zF = 1.45, zR = -1.45, x = 0.86, r = 0.47, width = 0.36,
} = {}) {
  const g = new THREE.Group();
  // Open half-cylinder spanning the top half (after rotateZ the θ∈[0,π]
  // half maps onto y ≥ 0), axis along X so it wraps the wheel.
  const geo = new THREE.CylinderGeometry(r, r, width, 22, 1, true, 0, Math.PI);
  geo.rotateZ(Math.PI / 2);
  for (const z of [zF, zR]) {
    for (const sx of [-1, 1]) {
      const liner = new THREE.Mesh(geo, archMaterial());
      liner.position.set(sx * x, 0, z);
      g.add(liner);
    }
  }
  return g;
}

// ---- Soft fake contact shadow blob under the car (works in 1P and 2P) ----
let _shadowTex = null;
function contactShadowTexture() {
  if (_shadowTex) return _shadowTex;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(64, 64, 8, 64, 64, 62);
  g.addColorStop(0, 'rgba(0,0,0,0.55)');
  g.addColorStop(0.6, 'rgba(0,0,0,0.28)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
  _shadowTex = new THREE.CanvasTexture(c);
  return _shadowTex;
}
export function buildContactShadow({ y = -0.355, w = 2.3, len = 4.8 } = {}) {
  const mat = new THREE.MeshBasicMaterial({
    map: contactShadowTexture(), transparent: true, depthWrite: false,
    opacity: 0.8,
  });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, len), mat);
  m.rotation.x = -Math.PI / 2;
  m.position.set(0, y, 0);
  m.renderOrder = -1;
  return m;
}
