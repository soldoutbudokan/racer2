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
  // Slight saturation push + a deeper base so bright sun + ACES keeps the
  // paint coloured (the lighter base drifted bubble-gum pink under the
  // golden-hour sky), but not so dark the car reads as a black blob in the
  // shadowed three-quarter views.
  hsl.s = Math.min(1, hsl.s * 1.12);
  hsl.l = hsl.l * 0.44;
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
    // A touch of metal flake gives the panels a metallic sheen and brightness
    // falloff instead of reading as flat plastic. NOTE: roughness MULTIPLIES
    // the map (values ~0.2..0.36), so the scalar stays high — 0.30 here made
    // the effective base a 0.06 near-mirror that washed sunlit panels to
    // pale pink under the bright sky.
    metalness: 0.16,
    roughness: 0.85,            // × map → effective ~0.17..0.31 base highlight
    roughnessMap: paintRoughness(),
    clearcoat: 1.0,
    // Real clear coat is glossy but not a perfect mirror: a touch of roughness
    // spreads the sky reflection into a soft gradient that wraps the panel,
    // instead of a razor-sharp mirror band that clips the bright sky straight
    // to white across the hood and roof.
    // 0.085 was tuned when the hood and roof were curved; the re-authored
    // bodies have genuinely FLAT hood, roof and deck planes, and a near-mirror
    // clear coat turns a flat panel aimed at the sky into a solid white slab
    // under ACES. Spreading the reflection keeps the sky gradient without the
    // clip — check the hood from the front-3/4 and the deck from trackside
    // after touching either this or envMapIntensity below.
    clearcoatRoughness: 0.135,
    clearcoatNormalMap: orangePeelNormal(),
    clearcoatNormalScale: new THREE.Vector2(0.05, 0.05),
    normalMap: flake,
    normalScale: new THREE.Vector2(0.11, 0.11),   // more visible metallic sparkle
    // The sky reflection in the clear coat still sweeps from bright (up-facing
    // panels) to dark (the flanks) so the bodywork reads as curved metal rather
    // than a flat tone — but pulled back from 1.55 so the up-facing panels keep
    // the car's colour under the bright golden-hour sky + ACES instead of
    // blowing out to a white cap that erases the paint entirely.
    envMapIntensity: 0.82,
  });
  paintCache.set(colorHex, m);
  return m;
}

let _trim = null;       // matte black plastic trim
export function makeTrim() {
  if (_trim) return _trim;
  // Low metalness + weak clearcoat: real black trim stays dark under a bright
  // sky instead of mirroring it into a mid-grey sheen.
  _trim = new THREE.MeshPhysicalMaterial({
    color: 0x0b0c0f, metalness: 0.12, roughness: 0.62, clearcoat: 0.18,
    envMapIntensity: 0.6,
  });
  return _trim;
}

// Panel shut line — the dark slot between two pressed panels. Near-black and
// matte so it reads as a shadowed gap rather than a painted stripe; a light
// depth bias (the ribbon already sits physically proud of the skin) keeps it
// off the paint it lies on without punching through from the far side.
let _shutline = null;
export function makeShutline() {
  if (_shutline) return _shutline;
  _shutline = new THREE.MeshStandardMaterial({
    color: 0x0d1013, metalness: 0.0, roughness: 0.95, envMapIntensity: 0.35,
    polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1,
  });
  return _shutline;
}

let _carbon = null;
export function makeCarbon() {
  if (_carbon) return _carbon;
  const n = carbonNormal();
  n.repeat.set(5, 5);
  // Kept dark: carbon aero reads near-black at a distance, only the weave
  // highlight betrays it. High metalness + env made it blow out light grey.
  _carbon = new THREE.MeshPhysicalMaterial({
    color: 0x0e1116, metalness: 0.35, roughness: 0.42,
    clearcoat: 0.55, clearcoatRoughness: 0.16,
    normalMap: n, normalScale: new THREE.Vector2(0.70, 0.70),
    envMapIntensity: 0.8,
  });
  return _carbon;
}

let _glass = null;
export function makeGlass() {
  if (_glass) return _glass;
  _glass = new THREE.MeshPhysicalMaterial({
    color: 0x0a1622,            // cool blue-grey smoked tint — reads as glass, not a void
    metalness: 0.0,
    roughness: 0.03,
    transmission: 0.25,         // dark tint, but enough to read as a glazed surface
    thickness: 0.35,
    ior: 1.52,
    // A strong, crisp sky reflection on the glazing is what separates the cabin
    // from the bodywork: the canopy catches the bright sky and sun streak while
    // the painted shell below carries the car's colour, so the greenhouse reads
    // as a distinct glassy volume instead of melting into one red mass.
    envMapIntensity: 1.6,
    clearcoat: 1.0,
    clearcoatRoughness: 0.02,
    transparent: true,
    opacity: 0.86,
    side: THREE.DoubleSide,
    polygonOffset: true,
    // Light offset only: the greenhouse geometry now sits physically proud of
    // the paint (see buildGreenhouseShell), so it already draws in front. A
    // gentle bias just seals the beltline seam; the old strong -4 forced an
    // inset canopy forward and made it z-fight through the roof as a serrated welt.
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
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
