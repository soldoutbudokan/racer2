import * as THREE from 'three';
import {
  makeTrim, makeCarbon, makeSatin, makeHeadlight, makeLens,
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
    new THREE.BoxGeometry(width + 0.05, 0.12, 0.08), makeTrim());
  housing.position.set(0, y, z + 0.02);
  g.add(housing);

  const brakeMat = makeTaillight();
  const bar = new THREE.Mesh(
    new THREE.BoxGeometry(width, 0.07, 0.05), brakeMat);
  bar.position.set(0, y, z - 0.02);
  bar.userData.noMerge = true;   // pulsed per-frame; keep as its own mesh
  g.add(bar);

  // light-pipe accents at the ends
  for (const sx of [-1, 1]) {
    const pod = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.10, 16), brakeMat);
    pod.rotation.z = Math.PI / 2;
    pod.position.set(sx * (width / 2 - 0.02), y, z - 0.02);
    g.add(pod);
  }
  return { group: g, brakeMesh: bar };
}

// ---- Side mirrors: a small angular pod (boxy housing, flat smoked face) on
// a thin blade stalk. Sized like a real door mirror (~0.16 long); the old
// scaled-sphere version blew out into a floating white ball. ----
let _mirrorFaceMat = null;
function mirrorFaceMaterial() {
  if (_mirrorFaceMat) return _mirrorFaceMat;
  _mirrorFaceMat = new THREE.MeshStandardMaterial({
    color: 0x272c33, metalness: 1.0, roughness: 0.14, envMapIntensity: 0.7,
  });
  return _mirrorFaceMat;
}

export function buildMirrors({ z = 0.5, y = 0.98, x = 0.95, color = 0xc8161d } = {}) {
  const g = new THREE.Group();
  const paint = makePaint(color);
  for (const sx of [-1, 1]) {
    const m = new THREE.Group();
    // thin blade stalk leaning down-inward onto the door shoulder
    const stalk = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.022, 0.05), makeTrim());
    stalk.rotation.z = sx * 0.5;
    stalk.position.set(sx * 0.04, -0.03, 0);
    m.add(stalk);
    // angular painted housing
    const housing = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.068, 0.095), paint);
    housing.rotation.y = sx * 0.08;
    housing.position.set(sx * 0.12, 0.01, 0);
    m.add(housing);
    // flat smoked mirror face on the rear of the pod
    const face = new THREE.Mesh(new THREE.PlaneGeometry(0.125, 0.05), mirrorFaceMaterial());
    face.rotation.y = Math.PI + sx * 0.08;
    face.position.set(sx * 0.124, 0.01, -0.052);
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

// ---- Front splitter: a thin dark lip tucked under the bumper, barely proud
// of the fascia. Real splitters are near-invisible edge-on — not a stack of
// grey planks past the nose. Lightless undertray material: the carbon
// clearcoat mirrored the bright sky and read as a white plank from above.
// z is the lip centre; front edge ≈ z + 0.10. ----
export function buildSplitter({ z = 1.98, y = -0.19, w = 1.3 } = {}) {
  const g = new THREE.Group();
  const lip = new THREE.Mesh(new THREE.BoxGeometry(w, 0.024, 0.20), undertrayMaterial());
  lip.position.set(0, y, z);
  lip.castShadow = true;
  g.add(lip);
  return g;
}

// ---- Rear diffuser: a kicked-up dark ramp tucked under the tail (rear edge
// rises toward the bumper cut-out) with short strakes, all in the lightless
// undertray material so it reads as a shadowed cavity. ----
export function buildDiffuser({ z = -1.95, y = -0.27, w = 1.44 } = {}) {
  const g = new THREE.Group();
  const mat = undertrayMaterial();
  const base = new THREE.Mesh(new THREE.BoxGeometry(w, 0.035, 0.44), mat);
  base.rotation.x = 0.30;                     // kick up toward the tail
  base.position.set(0, y, z);
  g.add(base);
  const n = 5;
  for (let i = 0; i < n; i++) {
    const strake = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.09, 0.38), mat);
    strake.rotation.x = 0.30;
    strake.position.set((i / (n - 1) - 0.5) * (w * 0.88), y + 0.05, z);
    g.add(strake);
  }
  return g;
}

// ---- Rear wing with a real airfoil section ----
export function buildWing({ z = -1.92, y = 1.06, span = 1.62, deckY = 0.82, style = 'gt' } = {}) {
  const g = new THREE.Group();
  if (style === 'ducktail') {
    // muscle: a lip spoiler rising straight off the rear deck (not hovering)
    const lip = new THREE.Mesh(new THREE.BoxGeometry(span, 0.05, 0.30), makePaint(0x111316));
    lip.position.set(0, deckY + 0.03, z + 0.16);
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
  // swan-neck posts — satin, not chrome (chrome blew out to white sticks)
  for (const sx of [-1, 1]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.04, y - deckY + 0.06, 0.10), makeSatin());
    post.position.set(sx * 0.55, (y + deckY) / 2, z + 0.02);
    g.add(post);
  }
  return g;
}

// ---- Exhaust tips — satin steel, not chrome (chrome blew out to white
// donuts under the bright sky) ----
export function buildExhaust({ z = -2.07, y = 0.38, x = 0.45, count = 2 } = {}) {
  const g = new THREE.Group();
  const tipGeo = new THREE.CylinderGeometry(0.05, 0.058, 0.14, 18);
  tipGeo.rotateX(Math.PI / 2);
  const innerGeo = new THREE.CylinderGeometry(0.038, 0.038, 0.15, 14);
  innerGeo.rotateX(Math.PI / 2);
  const xs = count === 4 ? [-x - 0.1, -x + 0.04, x - 0.04, x + 0.1] : [-x, x];
  for (const sx of xs) {
    const tip = new THREE.Mesh(tipGeo, makeSatin());
    tip.position.set(sx, y, z);
    g.add(tip);
    const inner = new THREE.Mesh(innerGeo, makeTrim());
    inner.position.set(sx, y, z - 0.01);
    g.add(inner);
  }
  return g;
}

// ---- Badges + license plate. Callers pass the fascia-face positions so the
// thin badge discs sit flat ON the bodywork (the old hard-coded heights left
// them floating in mid-air above the hood/tail). ----
let _badgeMat = null, _plateMat = null;
export function buildBadgesAndPlate({
  frontZ = 2.06, frontY = 0.06, rearZ = -2.06, rearY = 0.22, plateY = -0.04,
} = {}) {
  const g = new THREE.Group();
  if (!_badgeMat) {
    _badgeMat = new THREE.MeshStandardMaterial({
      map: badgeTexture(), metalness: 0.4, roughness: 0.4,
    });
  }
  const badgeGeo = new THREE.CylinderGeometry(0.042, 0.042, 0.010, 18);
  badgeGeo.rotateX(Math.PI / 2);
  const bF = new THREE.Mesh(badgeGeo, _badgeMat);
  bF.position.set(0, frontY, frontZ); g.add(bF);
  const bR = new THREE.Mesh(badgeGeo, _badgeMat);
  bR.position.set(0, rearY, rearZ); bR.rotation.y = Math.PI; g.add(bR);

  if (!_plateMat) {
    _plateMat = new THREE.MeshStandardMaterial({
      map: plateTexture(), roughness: 0.6, metalness: 0.0,
    });
  }
  const plateGeo = new THREE.PlaneGeometry(0.42, 0.13);
  const pR = new THREE.Mesh(plateGeo, _plateMat);
  pR.position.set(0, plateY, rearZ - 0.005);
  pR.rotation.y = Math.PI;
  g.add(pR);
  return g;
}

// ---- Matte lightless underside material. A real underfloor is a shadowed
// void: zero env reflection + full roughness so it can never render as a
// bright grey tray no matter the sky. Shared by underbody/splitter/diffuser.
let _undertrayMat = null;
function undertrayMaterial() {
  if (_undertrayMat) return _undertrayMat;
  _undertrayMat = new THREE.MeshStandardMaterial({
    color: 0x060708, roughness: 1.0, metalness: 0.0, envMapIntensity: 0.0,
  });
  return _undertrayMat;
}

// ---- Underbody pan so you never see through the car. Chamfered corners and
// bevelled edges, tucked well inside the rocker line and raised so only a dark
// sliver shows below the sills instead of a protruding slab. ----
export function buildUnderbody({ y = -0.26, w = 1.42, len = 3.5 } = {}) {
  const hw = w / 2, hl = len / 2, c = 0.30;    // c = corner chamfer
  const s = new THREE.Shape();
  s.moveTo(-hw + c, -hl);
  s.lineTo(hw - c, -hl);
  s.lineTo(hw, -hl + c);
  s.lineTo(hw, hl - c);
  s.lineTo(hw - c, hl);
  s.lineTo(-hw + c, hl);
  s.lineTo(-hw, hl - c);
  s.lineTo(-hw, -hl + c);
  s.closePath();
  const geo = new THREE.ExtrudeGeometry(s, {
    depth: 0.03, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.04,
    bevelSegments: 1,
  });
  geo.rotateX(-Math.PI / 2);                   // footprint flat in XZ, thin in Y
  const u = new THREE.Mesh(geo, undertrayMaterial());
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
  zF = 1.45, zR = -1.45, x = 0.86, r = 0.42, width = 0.36,
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
// Rendered with MULTIPLY blending over an OPAQUE grey→white radial texture:
// the rim is pure white (a multiply no-op, so the plane's edges vanish into the
// road instead of showing as a bright slab) and the core is dark grey (which
// multiplies the asphalt down into a soft shadow). Encoding the falloff in RGB
// rather than the alpha channel sidesteps the premultiplied-canvas-alpha quirk
// that made the old straight-alpha version render as a solid white tray under
// the car on some GL backends.
let _shadowTex = null;
function contactShadowTexture() {
  if (_shadowTex) return _shadowTex;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, 128, 128);
  const g = ctx.createRadialGradient(64, 64, 6, 64, 64, 62);
  g.addColorStop(0, 'rgb(64,64,68)');       // darkest directly beneath the car
  g.addColorStop(0.5, 'rgb(150,150,156)');
  g.addColorStop(0.82, 'rgb(214,214,218)');
  g.addColorStop(1, 'rgb(255,255,255)');    // no-op white at the rim
  ctx.fillStyle = g; ctx.fillRect(0, 0, 128, 128);
  _shadowTex = new THREE.CanvasTexture(c);
  _shadowTex.colorSpace = THREE.SRGBColorSpace;
  return _shadowTex;
}
export function buildContactShadow({ y = -0.355, w = 2.3, len = 4.8 } = {}) {
  const mat = new THREE.MeshBasicMaterial({
    map: contactShadowTexture(), transparent: true, depthWrite: false,
    blending: THREE.MultiplyBlending, toneMapped: false,
  });
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, len), mat);
  m.rotation.x = -Math.PI / 2;
  m.position.set(0, y, 0);
  m.renderOrder = -1;
  return m;
}
