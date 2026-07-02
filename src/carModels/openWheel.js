import * as THREE from 'three';
import {
  makePaint, makeCarbon, makeTrim, makeTaillight, makeSatin,
} from './carMaterials.js';
import { buildExhaust, buildUnderbody } from './parts.js';

// Open-wheel (F1-ish) — slim central tub with a pointed nose, raised airbox /
// roll hoop, halo, sidepods, and big front + rear wings. Wheels are EXPOSED
// (no arches authored); they track physics automatically.
// Axle-centred frame (wheel centre y 0, ground -0.36).

export const keys = [
  { z: -2.10, hw: 0.24, yb: -0.10, hip: 0.00, yt: 0.16, topW: 0.14 }, // tail / diffuser
  { z: -1.55, hw: 0.36, yb: -0.12, hip: 0.00, yt: 0.36, topW: 0.18 }, // engine cover spine
  { z: -0.95, hw: 0.42, yb: -0.12, hip: 0.02, yt: 0.56, topW: 0.22 }, // airbox / roll hoop
  { z: -0.35, hw: 0.48, yb: -0.13, hip: 0.04, yt: 0.34, topW: 0.40 }, // cockpit (opening)
  { z:  0.35, hw: 0.44, yb: -0.13, hip: 0.02, yt: 0.26, topW: 0.36 }, // chassis
  { z:  1.05, hw: 0.32, yb: -0.10, hip: 0.00, yt: 0.18, topW: 0.24 }, // narrowing
  { z:  1.60, hw: 0.22, yb: -0.07, hip: 0.00, yt: 0.13, topW: 0.15 }, // nose
  { z:  2.05, hw: 0.11, yb: -0.03, hip: 0.00, yt: 0.08, topW: 0.07 }, // slender nose tip
];

export const wheelStyle = 'openWheel';

function wideWing({ z, y, span, chord = 0.32, mat, tilt = -0.12, elements = 1 }) {
  const g = new THREE.Group();
  const af = new THREE.Shape();
  af.moveTo(-chord / 2, 0);
  af.quadraticCurveTo(-chord * 0.25, 0.045, chord * 0.18, 0.028);
  af.quadraticCurveTo(chord * 0.42, 0.012, chord / 2, 0);
  af.quadraticCurveTo(chord * 0.18, -0.028, -chord * 0.18, -0.025);
  af.quadraticCurveTo(-chord * 0.4, -0.018, -chord / 2, 0);
  const geo = new THREE.ExtrudeGeometry(af, { depth: span, bevelEnabled: false });
  geo.translate(0, 0, -span / 2);
  geo.rotateY(Math.PI / 2);
  for (let e = 0; e < elements; e++) {
    const el = new THREE.Mesh(geo, mat);
    el.rotation.x = tilt - e * 0.18;
    el.position.set(0, y + e * 0.12, z + e * 0.05);
    el.castShadow = true;
    g.add(el);
  }
  // endplates
  for (const sx of [-1, 1]) {
    const ep = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.26, chord * 1.3), mat);
    ep.position.set(sx * span / 2, y + 0.05, z);
    g.add(ep);
  }
  return g;
}

export function decorate(body, ctx) {
  const paint = makePaint(ctx.color);
  const carbon = makeCarbon();

  // ---- airbox intake on the roll hoop ----
  const airbox = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.16, 0.22, 16, 1, false, 0, Math.PI),
    carbon);
  airbox.rotation.set(Math.PI / 2, 0, 0);
  airbox.position.set(0, 0.5, -0.78);
  body.add(airbox);

  // ---- halo over the cockpit ----
  const haloMat = makeTrim();
  const hoop = new THREE.Mesh(new THREE.TorusGeometry(0.30, 0.025, 10, 24, Math.PI), haloMat);
  hoop.rotation.set(0, Math.PI / 2, 0);
  hoop.position.set(0, 0.16, -0.30);
  body.add(hoop);
  const haloStrut = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.26, 8), haloMat);
  haloStrut.position.set(0, 0.12, 0.18);
  haloStrut.rotation.x = 0.2;
  body.add(haloStrut);

  // ---- driver headrest + helmet ----
  const headrest = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.18, 0.22), carbon);
  headrest.position.set(0, 0.26, -0.62);
  body.add(headrest);
  const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 12), paint);
  helmet.scale.set(1, 1.1, 1.15);
  helmet.position.set(0, 0.26, -0.42);
  body.add(helmet);
  const visor = new THREE.Mesh(new THREE.SphereGeometry(0.118, 16, 8, 0, Math.PI * 2, 0.7, 0.5),
    new THREE.MeshPhysicalMaterial({ color: 0x101418, roughness: 0.1, metalness: 0.2 }));
  visor.scale.set(1, 1.1, 1.15);
  visor.position.set(0, 0.27, -0.41);
  body.add(visor);

  // ---- sidepods ----
  for (const sx of [-1, 1]) {
    const pod = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.30, 1.2), paint);
    pod.geometry.translate(0, 0, 0);
    pod.position.set(sx * 0.52, -0.05, 0.05);
    pod.scale.set(1, 1, 1);
    pod.castShadow = true;
    body.add(pod);
    // intake mouth
    const mouth = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.24, 0.08), carbon);
    mouth.position.set(sx * 0.52, -0.04, 0.66);
    body.add(mouth);
  }
  // bargeboards
  for (const sx of [-1, 1]) {
    const bb = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.22, 0.5), carbon);
    bb.position.set(sx * 0.62, -0.12, 0.85);
    bb.rotation.y = sx * 0.2;
    body.add(bb);
  }

  // ---- front wing + nose pylons ----
  body.add(wideWing({ z: 1.95, y: -0.22, span: 1.75, chord: 0.42, mat: carbon, tilt: 0.06, elements: 2 }));
  // nose cone tip cap (paint) already part of loft; add front-wing pylons
  for (const sx of [-1, 1]) {
    const pylon = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.22, 0.1), carbon);
    pylon.position.set(sx * 0.12, -0.12, 1.9);
    body.add(pylon);
  }

  // ---- rear wing (tall, 2-element) ----
  body.add(wideWing({ z: -1.95, y: 0.5, span: 1.25, chord: 0.34, mat: carbon, tilt: -0.34, elements: 2 }));
  for (const sx of [-1, 1]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.7, 0.1), carbon);
    post.position.set(sx * 0.18, 0.2, -1.95);
    body.add(post);
  }

  // ---- rear light + single exhaust ----
  const rainMat = makeTaillight();
  const rain = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 0.05), rainMat);
  rain.position.set(0, 0.12, -2.06);
  rain.userData.noMerge = true;
  body.add(rain);
  const pipe = new THREE.Mesh(
    (() => { const g = new THREE.CylinderGeometry(0.06, 0.06, 0.2, 14); g.rotateX(Math.PI / 2); return g; })(),
    makeSatin());
  pipe.position.set(0, 0.06, -2.12);
  body.add(pipe);

  // ---- floor / plank — matte lightless pan, tucked under the tub ----
  const floor = buildUnderbody({ y: -0.28, w: 0.95, len: 3.2 });
  floor.position.z = -0.1;
  body.add(floor);

  return { brakeLights: rain };
}
