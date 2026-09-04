import * as THREE from 'three';
import {
  makeTire, makeSidewall, makeRimDark, makeDisc, makeCaliper,
} from './carMaterials.js';
import { alloyMaps } from './texgen.js';
import { mergeByMaterial } from './merge.js';

// Local wheel materials (carMaterials' shared rim was near-chrome and bloomed
// into a glowing white ring under the golden-hour sun, erasing the tyre).

let _alloy = null; // satin machined alloy — deliberately mid-grey so the face
export function makeAlloy() { // reads as metal spokes, not a blown-out halo
  if (_alloy) return _alloy;
  const maps = alloyMaps();
  _alloy = new THREE.MeshPhysicalMaterial({
    color: 0xb8bdc5,
    map: maps.map,
    metalness: 1.0,
    roughness: 0.78,
    roughnessMap: maps.roughnessMap,
    clearcoat: 0.3, clearcoatRoughness: 0.12,
    envMapIntensity: 0.68,
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
// sidewalls, rim lip). 32 puts an 11.25 deg facet on a 0.36 m radius — about
// 1.7 mm of sagitta, i.e. below a pixel at normal chase-camera distance —
// and it has to be the SAME number for the tread and the sidewalls or the
// shoulder seam they share splits open. Four wheels per car x five cars makes
// this the single most multiplied number in the whole model, which is why it is
// 32 rather than an automotive-visualiser count such as 64.
const TYRE_SEG = 32;

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

// Slick tread band with a gentle crown; max radius exactly RADIUS.
const SLICK_TREAD_PROFILE = [
  [0.3595, -0.086], [RADIUS, -0.045], [RADIUS, 0.045], [0.3595, 0.086],
];

// Road tread with four 6 mm-deep circumferential channels. These grooves
// affect the silhouette and shade themselves; the normal map supplies the
// smaller chevron cuts and sipes between them.
const ROAD_TREAD_PROFILE = [
  [0.3595, -0.086], [RADIUS, -0.074],
  [RADIUS, -0.063], [0.3540, -0.059], [0.3540, -0.054], [RADIUS, -0.050],
  [RADIUS, -0.027], [0.3535, -0.023], [0.3535, -0.018], [RADIUS, -0.014],
  [RADIUS, 0.014], [0.3535, 0.018], [0.3535, 0.023], [RADIUS, 0.027],
  [RADIUS, 0.050], [0.3540, 0.054], [0.3540, 0.059], [RADIUS, 0.063],
  [RADIUS, 0.074], [0.3595, 0.086],
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
  const hubHalf = style.spokeW * 0.30;
  const rimHalf = style.spokeW * 0.50;
  const outline = new THREE.Shape();
  outline.moveTo(-hubHalf, 0);
  outline.lineTo(hubHalf, 0);
  outline.lineTo(rimHalf, len);
  outline.lineTo(-rimHalf, len);
  outline.closePath();
  // A bevel catches a narrow highlight along the spoke edge. The old sheared
  // box had perfectly sharp 90-degree edges, which reads as low-poly even when
  // the wheel silhouette itself is round.
  const g = new THREE.ExtrudeGeometry(outline, {
    depth: 0.024,
    steps: 1,
    curveSegments: 1,
    bevelEnabled: true,
    bevelSegments: 1,
    bevelSize: 0.004,
    bevelThickness: 0.003,
  });
  g.translate(0, 0, -0.012);
  g.rotateY(Math.PI / 2); // extrude Z → wheel X; outline X → wheel tangent Z
  const pos = g.getAttribute('position');
  const lean = SPOKE_HUB_X - SPOKE_RIM_X; // negative → deeper at the hub
  for (let i = 0; i < pos.count; i++) {
    const t = THREE.MathUtils.clamp(pos.getY(i) / len, 0, 1);
    pos.setX(i, pos.getX(i) + dir * (SPOKE_HUB_X + t * -lean));
  }
  g.translate(0, SPOKE_R0, 0);
  g.computeVertexNormals();
  return g;
}

// The alloy textures are authored radially: v=0 at the hub and v=1 at the
// flange. Preserve each primitive's useful circumferential u coordinate while
// replacing v, so lips, dishes and spokes all share one continuous dust falloff.
function setRadialV(g, maxRadius = RIM_R) {
  const pos = g.getAttribute('position');
  const uv = g.getAttribute('uv');
  if (!pos || !uv) return g;
  for (let i = 0; i < pos.count; i++) {
    uv.setY(i, THREE.MathUtils.clamp(Math.hypot(pos.getY(i), pos.getZ(i)) / maxRadius, 0, 1));
  }
  uv.needsUpdate = true;
  return g;
}

// Ventilated rotor shell with UVs that match discMaps: u around the disc and
// v from the hat to the swept outer edge. A true annulus also stops the brake
// disc reading as a solid silver coin behind the wheel.
function brakeRotorGeo(innerR = 0.087, outerR = 0.185, thickness = 0.032,
  segments = 40, rings = 3) {
  const positions = [], normals = [], uvs = [], indices = [];
  const half = thickness / 2;

  for (const side of [-1, 1]) {
    const base = positions.length / 3;
    for (let j = 0; j <= rings; j++) {
      const v = j / rings;
      const r = THREE.MathUtils.lerp(innerR, outerR, v);
      for (let i = 0; i <= segments; i++) {
        const u = i / segments;
        const a = u * Math.PI * 2;
        positions.push(side * half, Math.cos(a) * r, Math.sin(a) * r);
        normals.push(side, 0, 0);
        uvs.push(u, v);
      }
    }
    const row = segments + 1;
    for (let j = 0; j < rings; j++) {
      for (let i = 0; i < segments; i++) {
        const a = base + j * row + i;
        const b = a + row;
        if (side > 0) indices.push(a, b, b + 1, a, b + 1, a + 1);
        else indices.push(a, b + 1, b, a, a + 1, b + 1);
      }
    }
  }

  for (const edge of [
    { r: innerR, v: 0, normalSign: -1 },
    { r: outerR, v: 1, normalSign: 1 },
  ]) {
    const base = positions.length / 3;
    for (let i = 0; i <= segments; i++) {
      const u = i / segments;
      const a = u * Math.PI * 2;
      const cy = Math.cos(a), sz = Math.sin(a);
      for (const side of [-1, 1]) {
        positions.push(side * half, cy * edge.r, sz * edge.r);
        normals.push(0, cy * edge.normalSign, sz * edge.normalSign);
        uvs.push(u, edge.v);
      }
    }
    for (let i = 0; i < segments; i++) {
      const a = base + i * 2;
      if (edge.normalSign > 0) indices.push(a, a + 2, a + 3, a, a + 3, a + 1);
      else indices.push(a, a + 3, a + 2, a, a + 1, a + 3);
    }
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  g.setIndex(indices);
  g.computeBoundingSphere();
  return g;
}

// dir = +1 / -1: which outboard side this face sits on. Built per side (the
// dish is not mirror-symmetric — a negative-scale clone would flip winding).
function buildFace(style, dir) {
  const face = new THREE.Group();
  const rimMat = style.rim === 'dark' ? makeRimDark() : makeAlloy();

  // Outer rim lip — the bright ring that defines the wheel diameter.
  const lipGeo = setRadialV(new THREE.TorusGeometry(0.238, 0.013, 6, TYRE_SEG));
  const lip = new THREE.Mesh(lipGeo, rimMat);
  lip.rotation.y = Math.PI / 2;
  lip.position.x = dir * LIP_X;
  face.add(lip);

  // Dish: conical band dropping from the lip back to the recessed spoke
  // plane. This is what gives the wheel its barrel depth.
  const dishGeo = new THREE.CylinderGeometry(DISH_OUT_R, DISH_IN_R, DISH_DEPTH, 28, 1, true);
  dishGeo.rotateZ(-dir * (Math.PI / 2)); // wide end toward the lip
  setRadialV(dishGeo);
  const dish = new THREE.Mesh(dishGeo, rimMat);
  dish.position.x = dir * (LIP_X - 0.002 - DISH_DEPTH / 2);
  face.add(dish);

  // Spokes radiate in the YZ plane, recessed behind the lip.
  const sGeo = setRadialV(spokeGeo(style, dir));
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
  const hubGeo = new THREE.CylinderGeometry(0.078, 0.078, 0.055, 18);
  hubGeo.rotateZ(Math.PI / 2);
  setRadialV(hubGeo);
  const hub = new THREE.Mesh(hubGeo, rimMat);
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
  const slick = styleKey === 'openWheel';
  const treadProfile = slick ? SLICK_TREAD_PROFILE : ROAD_TREAD_PROFILE;
  const tread = new THREE.Mesh(latheX(treadProfile, TYRE_SEG), makeTire(slick));
  tread.castShadow = true;
  group.add(tread);
  for (const dir of [1, -1]) {
    const pts = dir > 0
      ? SIDEWALL_PROFILE
      : [...SIDEWALL_PROFILE].reverse().map((p) => [p[0], -p[1]]);
    const swGeo = latheX(pts, TYRE_SEG);
    // Reversing the profile fixes the inner face's winding but also reverses
    // its v coordinate; flip v back so shoulder lettering and bead dust remain
    // in the same physical place on both sides.
    if (dir < 0) {
      const uv = swGeo.getAttribute('uv');
      for (let i = 0; i < uv.count; i++) uv.setY(i, 1 - uv.getY(i));
      uv.needsUpdate = true;
    }
    const sw = new THREE.Mesh(swGeo, makeSidewall());
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
  const rotor = new THREE.Mesh(brakeRotorGeo(), makeDisc());
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
