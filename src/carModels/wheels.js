import * as THREE from 'three';
import {
  makeTire, makeSidewall, makeRimDark, makeDisc, makeCaliper,
} from './carMaterials.js';
import { mergeByMaterial } from './merge.js';

// Local wheel materials (carMaterials' shared rim was near-chrome and bloomed
// into a glowing white ring under the golden-hour sun, erasing the tyre).

let _alloy = null; // satin machined alloy — deliberately mid-grey so the face
export function makeAlloy() { // reads as metal spokes, not a blown-out halo
  if (_alloy) return _alloy;
  _alloy = new THREE.MeshPhysicalMaterial({
    color: 0x84898f, metalness: 1.0, roughness: 0.34,
    clearcoat: 0.3, clearcoatRoughness: 0.12,
    envMapIntensity: 0.65,
  });
  return _alloy;
}

let _well = null; // near-black barrel/well interior — DoubleSide so the wheel
function makeWell() { // stays dark from every angle instead of letting body
  if (_well) return _well; // paint show through between the spokes
  _well = new THREE.MeshStandardMaterial({
    color: 0x0a0b0d, metalness: 0.2, roughness: 0.9, side: THREE.DoubleSide,
  });
  return _well;
}

// ---------------------------------------------------------------------------
// Detailed alloy wheel. The wheel group spins about its LOCAL X axis (the
// physics worldTransform is copied straight onto the group each frame, exactly
// as the old buildWheel did), so every lathe/cylinder is rotated to put its
// axis on X. A full face is built on BOTH outboard sides so the wheel reads
// correctly on both sides of the car.
// One template is built per style and cloned for each of the 20 wheels.
// ---------------------------------------------------------------------------

const RADIUS = 0.36;  // tyre outer radius — physics stance depends on this
const WIDTH = 0.28;   // tyre max width    — physics stance depends on this
const RIM_R = 0.235;

// Axial layout of one wheel face (positive-x side; the other is mirrored).
const LIP_X = 0.096;       // rim lip centre, just inside the tyre bead
const DISH_OUT_R = RIM_R - 0.002; // dish outer edge, tucked under the lip
const DISH_IN_R = 0.216;   // dish inner edge, where the spokes land
const DISH_DEPTH = 0.048;  // lip → spoke plane recess → concave wheel face
const SPOKE_RIM_X = 0.043; // spoke outer end (at the dish inner edge)
const SPOKE_HUB_X = 0.016; // hub end sits deeper still — spokes lean inboard
const SPOKE_R0 = 0.075;    // spoke span: hub …
const SPOKE_R1 = 0.218;    // … to just past the dish inner edge

const templates = new Map();

const STYLES = {
  gt:        { spokes: 5, twin: true,  spokeW: 0.040, rim: 'bright', lock: 'lugs' },
  muscle:    { spokes: 5, twin: false, spokeW: 0.085, rim: 'bright', lock: 'lugs' },
  openWheel: { spokes: 10, twin: false, spokeW: 0.030, rim: 'dark', lock: 'center' },
};

// Lathe segments for everything that shows a round SILHOUETTE (tread,
// sidewalls, rim lip). 24 puts a 15 deg facet on a 0.36 m radius — about
// 3 mm of sagitta, i.e. a pixel at the distance a rival car is ever seen from —
// and it has to be the SAME number for the tread and the sidewalls or the
// shoulder seam they share splits open. Four wheels per car x five cars makes
// this the single most multiplied number in the whole model, which is why it is
// 24 and not 30.
const TYRE_SEG = 24;

// Tyre cross-section, positive-x half, ordered tread → bead (increasing axial
// keeps LatheGeometry normals outward): rounded shoulder, bulged sidewall
// peaking at exactly WIDTH/2, a raised moulding/lettering ring, and a slight
// concavity where the sidewall tucks into the bead. [radius, axial].
const SIDEWALL_PROFILE = [
  [0.3595, 0.0860],  // tread shoulder edge
  [0.3565, 0.1000],  // shoulder round-over
  [0.3490, 0.1130],
  [0.3340, 0.1270],  // upper sidewall
  [0.3235, 0.1315],  // moulding ring, outer base
  [0.3185, 0.1370],  //   raised lettering-ring peak
  [0.3135, 0.1330],  //   inner base
  [0.3060, 0.1400],  // bulge — max width, exactly WIDTH/2
  [0.2860, 0.1290],  // lower sidewall, pulled 2 mm in: this one point now
                     // carries the concavity above the bead that used to need
                     // a ring of its own, which on a lathe is 96 triangles per
                     // wheel for 3 mm of section.
  [0.2430, 0.1010],  // bead, tucked under the rim lip
];

// Tread band with a gentle crown; max radius exactly RADIUS.
const TREAD_PROFILE = [
  [0.3595, -0.086], [RADIUS, -0.045], [RADIUS, 0.045], [0.3595, 0.086],
];

// Revolve a [radius, axial] profile about the wheel spin axis (X).
function latheX(pts, segments) {
  const g = new THREE.LatheGeometry(pts.map((p) => new THREE.Vector2(p[0], p[1])), segments);
  g.rotateZ(-Math.PI / 2); // lathe axis Y → local X, +axial → +x
  return g;
}

// One spoke blade: local y radial, x axial, z tangential. Tapered toward the
// hub and leaning inboard so the assembled face reads as a concave dish.
function spokeGeo(style, dir) {
  const len = SPOKE_R1 - SPOKE_R0;
  const g = new THREE.BoxGeometry(0.030, len, style.spokeW);
  const pos = g.getAttribute('position');
  const lean = SPOKE_HUB_X - SPOKE_RIM_X; // negative → deeper at the hub
  for (let i = 0; i < pos.count; i++) {
    const t = (pos.getY(i) + len / 2) / len;    // 0 = hub end, 1 = rim end
    const k = THREE.MathUtils.lerp(0.60, 1, t); // taper toward the hub
    pos.setZ(i, pos.getZ(i) * k);
    pos.setX(i, pos.getX(i) * k + dir * (SPOKE_RIM_X + (1 - t) * lean));
  }
  g.translate(0, SPOKE_R0 + len / 2, 0);
  g.computeVertexNormals(); // re-flatten after the taper/lean shear
  return g;
}

// dir = +1 / -1: which outboard side this face sits on. Built per side (the
// dish is not mirror-symmetric — a negative-scale clone would flip winding).
function buildFace(style, dir) {
  const face = new THREE.Group();
  const rimMat = style.rim === 'dark' ? makeRimDark() : makeAlloy();

  // Outer rim lip — the bright ring that defines the wheel diameter.
  const lip = new THREE.Mesh(new THREE.TorusGeometry(0.238, 0.013, 4, TYRE_SEG), rimMat);
  lip.rotation.y = Math.PI / 2;
  lip.position.x = dir * LIP_X;
  face.add(lip);

  // Dish: conical band dropping from the lip back to the recessed spoke
  // plane. This is what gives the wheel its barrel depth.
  const dishGeo = new THREE.CylinderGeometry(DISH_OUT_R, DISH_IN_R, DISH_DEPTH, 22, 1, true);
  dishGeo.rotateZ(-dir * (Math.PI / 2)); // wide end toward the lip
  const dish = new THREE.Mesh(dishGeo, rimMat);
  dish.position.x = dir * (LIP_X - 0.002 - DISH_DEPTH / 2);
  face.add(dish);

  // Spokes radiate in the YZ plane, recessed behind the lip.
  const sGeo = spokeGeo(style, dir);
  const n = style.spokes;
  for (let i = 0; i < n; i++) {
    const ang = (i / n) * Math.PI * 2;
    if (style.twin) {
      // split twin blades that converge toward the hub
      for (const off of [-0.10, 0.10]) {
        const s = new THREE.Mesh(sGeo, rimMat);
        s.rotation.x = ang + off;
        face.add(s);
      }
    } else {
      const s = new THREE.Mesh(sGeo, rimMat);
      s.rotation.x = ang;
      face.add(s);
    }
  }

  // Hub, recessed with the spokes.
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.078, 0.078, 0.055, 12), rimMat);
  hub.rotation.z = Math.PI / 2;
  hub.position.x = dir * SPOKE_HUB_X;
  face.add(hub);

  if (style.lock === 'center') {
    // Single racing centre-lock nut instead of lugs.
    const nut = new THREE.Mesh(
      new THREE.CylinderGeometry(0.030, 0.030, 0.034, 6),
      makeCaliper(),
    );
    nut.rotation.z = Math.PI / 2;
    nut.position.x = dir * (SPOKE_HUB_X + 0.026);
    face.add(nut);
  } else {
    // Dark centre cap, slightly proud of the hub face.
    const cap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.032, 0.032, 0.020, 10),
      makeRimDark(),
    );
    cap.rotation.z = Math.PI / 2;
    cap.position.x = dir * (SPOKE_HUB_X + 0.024);
    face.add(cap);
    // Lug nuts on the hub face.
    const lugGeo = new THREE.CylinderGeometry(0.013, 0.013, 0.024, 6);
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const lug = new THREE.Mesh(lugGeo, makeRimDark());
      lug.rotation.z = Math.PI / 2;
      lug.position.set(dir * (SPOKE_HUB_X + 0.024), Math.cos(a) * 0.050, Math.sin(a) * 0.050);
      face.add(lug);
    }
  }
  return face;
}

function buildTemplate(styleKey) {
  const style = STYLES[styleKey] ?? STYLES.gt;
  const group = buildTemplateRaw(styleKey, style);
  // Collapse ~40 sub-meshes per wheel into one mesh per material → cheap clones.
  return mergeByMaterial(group);
}

function buildTemplateRaw(styleKey, style) {
  const group = new THREE.Group();

  // Tyre: lathed profile — crowned tread band + two bulged sidewalls.
  const tread = new THREE.Mesh(latheX(TREAD_PROFILE, TYRE_SEG), makeTire());
  tread.castShadow = true;
  group.add(tread);
  for (const dir of [1, -1]) {
    const pts = dir > 0
      ? SIDEWALL_PROFILE
      : [...SIDEWALL_PROFILE].reverse().map((p) => [p[0], -p[1]]);
    const sw = new THREE.Mesh(latheX(pts, TYRE_SEG), makeSidewall());
    sw.castShadow = true;
    group.add(sw);
  }

  // Rim well (dark, seen between the spokes behind the dish). Sized to fill the
  // whole tyre bore: radius reaches just inside the bead (0.243) and the barrel
  // spans nearly bead-to-bead, so from a side/oblique view the dark wall — not
  // daylight or bodywork — backs the wheel opening across its full width. The
  // old 0.208 × 0.10 well left an unbacked annular gap out to the bead and only
  // covered the middle 0.10 of the 0.28-wide tyre, so the upper opening read as
  // a hollow ring with body paint showing through.
  const barrel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.230, 0.230, 0.18, 20, 1, true),
    makeRimDark(),
  );
  barrel.rotateZ(Math.PI / 2);
  group.add(barrel);
  // Solid back wall at mid-well: seals every straight-through sightline (the
  // barrel wall alone is edge-on from a pure side view). Radius matches the
  // barrel so the annulus between the rotor edge and the bore is closed; the
  // thin disc tucks inside the rotor's axial span (±0.016) at small radii, so
  // it never z-fights the brake face and never hides the caliper/rotor detail
  // that sits proud of it.
  const plug = new THREE.Mesh(
    new THREE.CylinderGeometry(0.230, 0.230, 0.012, 20),
    makeRimDark(),
  );
  plug.rotateZ(Math.PI / 2);
  group.add(plug);

  // Brakes: dark hat + inset rotor, distinct radii/materials.
  const rotor = new THREE.Mesh(
    new THREE.CylinderGeometry(0.185, 0.185, 0.032, 22),
    makeDisc(),
  );
  rotor.rotateZ(Math.PI / 2);
  group.add(rotor);
  const hat = new THREE.Mesh(
    new THREE.CylinderGeometry(0.085, 0.085, 0.044, 12),
    makeRimDark(),
  );
  hat.rotateZ(Math.PI / 2);
  group.add(hat);

  // Caliper: a curved saddle astride the rotor, up behind the spokes.
  const calGeo = new THREE.TorusGeometry(0.190, 0.030, 4, 6, 1.0);
  calGeo.rotateY(Math.PI / 2); // ring around the X axis
  const caliper = new THREE.Mesh(calGeo, makeCaliper());
  caliper.rotation.x = 1.22; // arc apex to the upper front quadrant
  group.add(caliper);
  // caliper body block at the arc apex for bulk
  const calBody = new THREE.Mesh(new THREE.BoxGeometry(0.068, 0.045, 0.085), makeCaliper());
  calBody.position.set(0, 0.188, 0.028);
  group.add(calBody);

  // Spoke faces on both outboard sides.
  group.add(buildFace(style, 1));
  group.add(buildFace(style, -1));

  return group;
}

export function buildWheel(styleKey = 'gt') {
  if (!templates.has(styleKey)) templates.set(styleKey, buildTemplate(styleKey));
  return templates.get(styleKey).clone();
}
