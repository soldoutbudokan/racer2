import * as THREE from 'three';
import {
  makeTire, makeSidewall, makeRim, makeRimDark, makeDisc, makeCaliper, makeChrome,
} from './carMaterials.js';
import { mergeByMaterial } from './merge.js';

// ---------------------------------------------------------------------------
// Detailed alloy wheel. The wheel group spins about its LOCAL X axis (the
// physics worldTransform is copied straight onto the group each frame, exactly
// as the old buildWheel did), so every cylinder is rotated Z+90deg to put its
// axis on X. Built symmetric so it reads correctly on both sides of the car.
// One template is built per style and cloned for each of the 20 wheels.
// ---------------------------------------------------------------------------

const RADIUS = 0.36;
const WIDTH = 0.28;
const RIM_R = 0.235;

const templates = new Map();

const STYLES = {
  gt:        { spokes: 5, twin: true,  spokeW: 0.045, rim: 'bright' },
  muscle:    { spokes: 5, twin: false, spokeW: 0.085, rim: 'bright' },
  openWheel: { spokes: 10, twin: false, spokeW: 0.030, rim: 'dark' },
};

function buildFace(style) {
  const face = new THREE.Group();
  const rimMat = style.rim === 'dark' ? makeRimDark() : makeRim();

  // Spokes radiate in the YZ plane (long axis Y, rotated about X).
  const spokeGeo = new THREE.BoxGeometry(style.spokeW, 0.175, 0.028);
  spokeGeo.translate(0, 0.145, 0);
  const n = style.spokes;
  for (let i = 0; i < n; i++) {
    const ang = (i / n) * Math.PI * 2;
    if (style.twin) {
      for (const off of [-0.05, 0.05]) {
        const s = new THREE.Mesh(spokeGeo, rimMat);
        s.rotation.x = ang;
        // splay the twin pair slightly
        s.position.set(0, 0, 0);
        s.rotation.z = 0;
        s.translateOnAxis(new THREE.Vector3(1, 0, 0), 0); // no-op, keep local
        // shift along the tangent by rotating a tiny extra angle
        s.rotation.x = ang + off;
        face.add(s);
      }
    } else {
      const s = new THREE.Mesh(spokeGeo, rimMat);
      s.rotation.x = ang;
      face.add(s);
    }
  }

  // Outer rim lip ring.
  const lip = new THREE.Mesh(
    new THREE.TorusGeometry(RIM_R - 0.005, 0.02, 10, 40),
    rimMat,
  );
  lip.rotation.y = Math.PI / 2;
  face.add(lip);

  // Hub + centre cap.
  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.07, 0.07, 0.04, 20),
    rimMat,
  );
  hub.rotation.z = Math.PI / 2;
  face.add(hub);
  const cap = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, 0.05, 18),
    makeChrome(),
  );
  cap.rotation.z = Math.PI / 2;
  face.add(cap);

  // Lug nuts.
  const lugGeo = new THREE.CylinderGeometry(0.014, 0.014, 0.03, 6);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    const lug = new THREE.Mesh(lugGeo, makeRimDark());
    lug.rotation.z = Math.PI / 2;
    lug.position.set(0, Math.cos(a) * 0.085, Math.sin(a) * 0.085);
    face.add(lug);
  }
  return face;
}

function buildTemplate(styleKey) {
  const style = STYLES[styleKey] ?? STYLES.gt;
  const group = buildTemplateRaw(styleKey, style);
  // Collapse ~42 sub-meshes per wheel into one mesh per material → cheap clones.
  return mergeByMaterial(group);
}

function buildTemplateRaw(styleKey, style) {
  const group = new THREE.Group();

  // Tyre — open cylinder with a slightly bulged sidewall look.
  const tireGeo = new THREE.CylinderGeometry(RADIUS, RADIUS, WIDTH, 30, 1, true);
  tireGeo.rotateZ(Math.PI / 2);
  const tire = new THREE.Mesh(tireGeo, makeTire());
  tire.castShadow = true;
  group.add(tire);

  // Sidewalls (close the tyre ends, rubber).
  for (const sx of [-WIDTH / 2, WIDTH / 2]) {
    const sw = new THREE.Mesh(
      new THREE.RingGeometry(RIM_R - 0.01, RADIUS - 0.005, 30),
      makeSidewall(),
    );
    sw.rotation.y = Math.PI / 2;
    sw.position.x = sx;
    sw.scale.x = sx < 0 ? -1 : 1; // face outward
    group.add(sw);
  }

  // Rim barrel (dark, seen between spokes).
  const barrel = new THREE.Mesh(
    new THREE.CylinderGeometry(RIM_R, RIM_R, WIDTH * 0.92, 24, 1, true),
    makeRimDark(),
  );
  barrel.rotateZ(Math.PI / 2);
  group.add(barrel);

  // Brake disc + caliper in the centre.
  const disc = new THREE.Mesh(
    new THREE.CylinderGeometry(0.205, 0.205, 0.028, 24),
    makeDisc(),
  );
  disc.rotateZ(Math.PI / 2);
  group.add(disc);
  const caliper = new THREE.Mesh(
    new THREE.BoxGeometry(0.07, 0.10, 0.13),
    makeCaliper(),
  );
  caliper.position.set(0, 0.17, 0.02);
  group.add(caliper);

  // Spoke faces on both outboard sides.
  const faceTemplate = buildFace(style);
  for (const fx of [-WIDTH / 2 + 0.02, WIDTH / 2 - 0.02]) {
    const f = faceTemplate.clone();
    f.position.x = fx;
    group.add(f);
  }

  return group;
}

export function buildWheel(styleKey = 'gt') {
  if (!templates.has(styleKey)) templates.set(styleKey, buildTemplate(styleKey));
  return templates.get(styleKey).clone();
}
