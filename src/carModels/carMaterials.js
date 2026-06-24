import * as THREE from 'three';
import {
  flakeNormal, orangePeelNormal, carbonNormal, treadNormal,
  paintRoughness, grilleNormal,
} from './texgen.js';

// ---------------------------------------------------------------------------
// Shared car materials. Everything except the per-car taillight is cached and
// reused across all cars so the five cars cost a handful of materials, not
// dozens. Paint is cached by colour int.
// ---------------------------------------------------------------------------

const paintCache = new Map();

// Slightly desaturate + darken toward realistic automotive paint, which is
// never a pure saturated screen colour.
function tunePaint(hex) {
  const c = new THREE.Color(hex);
  const hsl = {};
  c.getHSL(hsl);
  hsl.s = Math.min(1, hsl.s * 1.0);
  // Deep base so bright sun + ACES keeps it coloured, but not so dark the car
  // reads as a black blob in the shadowed three-quarter views.
  hsl.l = hsl.l * 0.60;
  c.setHSL(hsl.h, hsl.s, hsl.l);
  return c;
}

export function makePaint(colorHex) {
  if (paintCache.has(colorHex)) return paintCache.get(colorHex);
  const flake = flakeNormal();
  flake.repeat.set(10, 22);
  // Automotive paint = a coloured DIELECTRIC base (low metalness) under a
  // strong clear coat. The clearcoat carries the sky reflection and the sun
  // hot-spot; the base stays deep and saturated.
  const m = new THREE.MeshPhysicalMaterial({
    color: tunePaint(colorHex),
    // A touch more metal flake + a tighter base roughness gives the panels a
    // metallic sheen and brightness falloff instead of reading as flat plastic.
    metalness: 0.18,
    roughness: 0.40,
    roughnessMap: paintRoughness(),
    clearcoat: 1.0,
    clearcoatRoughness: 0.07,   // polished lacquer — sharp sky + sun reflections
    clearcoatNormalMap: orangePeelNormal(),
    clearcoatNormalScale: new THREE.Vector2(0.05, 0.05),
    normalMap: flake,
    normalScale: new THREE.Vector2(0.11, 0.11),   // more visible metallic sparkle
    envMapIntensity: 1.05,   // stronger sky reflection in the clear coat
  });
  paintCache.set(colorHex, m);
  return m;
}

let _trim = null;       // matte black plastic trim
export function makeTrim() {
  if (_trim) return _trim;
  _trim = new THREE.MeshPhysicalMaterial({
    color: 0x0c0d10, metalness: 0.3, roughness: 0.55, clearcoat: 0.4,
  });
  return _trim;
}

let _carbon = null;
export function makeCarbon() {
  if (_carbon) return _carbon;
  const n = carbonNormal();
  n.repeat.set(5, 5);
  _carbon = new THREE.MeshPhysicalMaterial({
    color: 0x11141a, metalness: 0.50, roughness: 0.38,
    clearcoat: 0.75, clearcoatRoughness: 0.14,
    normalMap: n, normalScale: new THREE.Vector2(0.70, 0.70),
    envMapIntensity: 1.1,
  });
  return _carbon;
}

let _glass = null;
export function makeGlass() {
  if (_glass) return _glass;
  _glass = new THREE.MeshPhysicalMaterial({
    color: 0x04080e,            // deep blue-black tint like smoked automotive glass
    metalness: 0.05,
    roughness: 0.04,
    transmission: 0.15,         // mostly opaque dark tint
    thickness: 0.35,
    ior: 1.52,
    envMapIntensity: 1.2,       // strong reflections on the glass surface
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    transparent: true,
    opacity: 0.92,
    side: THREE.DoubleSide,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
  });
  return _glass;
}

let _chrome = null;
export function makeChrome() {
  if (_chrome) return _chrome;
  _chrome = new THREE.MeshPhysicalMaterial({
    color: 0xf2f5f8, metalness: 1.0, roughness: 0.05, envMapIntensity: 1.8,
  });
  return _chrome;
}

let _satin = null;     // brushed/satin metal for window surrounds, mirror stalks
export function makeSatin() {
  if (_satin) return _satin;
  _satin = new THREE.MeshPhysicalMaterial({
    color: 0x6a6e74, metalness: 1.0, roughness: 0.42,
  });
  return _satin;
}

let _tire = null;
export function makeTire() {
  if (_tire) return _tire;
  const n = treadNormal();
  n.repeat.set(8, 1);
  _tire = new THREE.MeshPhysicalMaterial({
    color: 0x080809, roughness: 0.90, metalness: 0.0,
    sheen: 0.40, sheenRoughness: 0.45,  // rubber sheen gives the characteristic highlight
    normalMap: n, normalScale: new THREE.Vector2(0.75, 0.75),
  });
  return _tire;
}

let _sidewall = null;
export function makeSidewall() {
  if (_sidewall) return _sidewall;
  _sidewall = new THREE.MeshPhysicalMaterial({
    color: 0x0d0d0f, roughness: 0.78, metalness: 0.0, sheen: 0.3,
  });
  return _sidewall;
}

let _rim = null;
export function makeRim() {
  if (_rim) return _rim;
  _rim = new THREE.MeshPhysicalMaterial({
    color: 0xcdd2da, metalness: 1.0, roughness: 0.18, clearcoat: 0.65,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.5,
  });
  return _rim;
}

let _rimDark = null;
export function makeRimDark() {
  if (_rimDark) return _rimDark;
  _rimDark = new THREE.MeshPhysicalMaterial({
    color: 0x1a1c20, metalness: 0.9, roughness: 0.35,
  });
  return _rimDark;
}

let _disc = null;
export function makeDisc() {
  if (_disc) return _disc;
  _disc = new THREE.MeshStandardMaterial({
    color: 0x3a3e44, metalness: 1.0, roughness: 0.45,
  });
  return _disc;
}

let _caliper = null;
export function makeCaliper() {
  if (_caliper) return _caliper;
  _caliper = new THREE.MeshStandardMaterial({
    color: 0xc81e1e, metalness: 0.4, roughness: 0.35,
  });
  return _caliper;
}

// Headlight emitter (shared — emissive, no per-frame mutation).
let _head = null;
export function makeHeadlight() {
  if (_head) return _head;
  _head = new THREE.MeshStandardMaterial({
    color: 0xeeeae0, emissive: 0xfff8e8, emissiveIntensity: 1.1,
    roughness: 0.18, metalness: 0.0,
  });
  return _head;
}

// Clear lens cover over a light cluster.
let _lens = null;
export function makeLens() {
  if (_lens) return _lens;
  _lens = new THREE.MeshPhysicalMaterial({
    color: 0xffffff, metalness: 0.0, roughness: 0.06,
    transmission: 0.9, thickness: 0.05, ior: 1.45,
    transparent: true, opacity: 0.4, envMapIntensity: 1.2,
  });
  return _lens;
}

// Taillight emitter — MUST be unique per car (mutated each frame by car.js),
// so this one is NOT cached.
export function makeTaillight() {
  return new THREE.MeshStandardMaterial({
    color: 0x4a0a0c, emissive: 0xff1422, emissiveIntensity: 0.6,
    roughness: 0.3, metalness: 0.0, transparent: true, opacity: 0.7,
  });
}

let _grille = null;
export function makeGrille() {
  if (_grille) return _grille;
  const n = grilleNormal();
  n.repeat.set(2, 1);
  _grille = new THREE.MeshStandardMaterial({
    color: 0x101216, metalness: 0.8, roughness: 0.5,
    normalMap: n, normalScale: new THREE.Vector2(1.0, 1.0),
  });
  return _grille;
}
