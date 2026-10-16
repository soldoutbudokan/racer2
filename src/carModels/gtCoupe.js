import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { makePaint, makeGlass, makeTrim, makeSatin, makeHeadlight, makeTaillight, makeShutline } from './carMaterials.js';
import { buildMirrors, buildExhaust, buildBadgesAndPlate, buildUnderbody, buildArchLiners } from './parts.js';
import { cutWheelWells } from './wheelWells.js';

// The saved "gt" id now builds a touring sedan. This is a separate body and
// cabin construction, not the former coupe loft: four doors, a long upright
// glasshouse, a short trunk and a curved front fascia with small twin grilles.
// The shared wheel/chassis frame remains hubs y=0, z=+/-1.45, radius=0.36.
export const keys = null;
export const wheelStyle = 'gt';

const BODY = [
  // z, half width, shoulder height, deck height, lower edge
  [-2.36, 0.820, 0.450, 0.595, -0.125],
  [-2.15, 0.935, 0.575, 0.650, -0.165],
  [-1.80, 0.970, 0.610, 0.675, -0.170],
  [-1.45, 0.980, 0.620, 0.680, -0.170],
  [-1.02, 0.958, 0.610, 0.675, -0.180],
  [-0.30, 0.945, 0.600, 0.655, -0.185],
  [0.60, 0.948, 0.590, 0.645, -0.185],
  [1.12, 0.970, 0.605, 0.660, -0.170],
  [1.45, 0.982, 0.610, 0.660, -0.170],
  [1.80, 0.970, 0.560, 0.625, -0.165],
  [2.15, 0.935, 0.475, 0.565, -0.145],
  [2.40, 0.830, 0.365, 0.490, -0.125],
];
const CABIN = [
  // z, roof edge height, roof half width
  [-1.44, 0.655, 0.925], [-1.23, 0.850, 0.835],
  [-0.98, 1.085, 0.745], [-0.82, 1.125, 0.720],
  [-0.30, 1.145, 0.715], [0.15, 1.140, 0.720],
  [0.40, 1.100, 0.735], [0.94, 0.650, 0.925],
];
const CABIN_BASE_Y = 0.595;
const CABIN_BASE_X = 0.928;
const FRONT = 2.40;
const REAR = -2.36;

function sample(table, z, smooth = false) {
  let i = 0;
  while (i < table.length - 2 && table[i + 1][0] < z) i++;
  const a = table[i], b = table[i + 1];
  const t = THREE.MathUtils.clamp((z - a[0]) / (b[0] - a[0]), 0, 1);
  return a.map((v, j) => {
    if (!j) return z;
    if (!smooth) return THREE.MathUtils.lerp(v, b[j], t);
    const p0 = table[Math.max(0, i - 1)][j];
    const p3 = table[Math.min(table.length - 1, i + 2)][j];
    return 0.5 * (2 * v + (-p0 + b[j]) * t
      + (2 * p0 - 5 * v + 4 * b[j] - p3) * t * t
      + (-p0 + 3 * v - 3 * b[j] + p3) * t * t * t);
  });
}
function halfProfile(p) {
  const [, w, shoulder, top, bottom] = p;
  return [[0, bottom], [w * 0.67, bottom], [w * 0.88, bottom + 0.040],
    [w * 0.965, bottom + 0.135], [w * 0.995, shoulder - 0.175],
    [w, shoulder], [w * 0.955, top - 0.025], [w * 0.800, top],
    [w * 0.400, top + 0.018], [0, top + 0.024]];
}
function halfWidthAt(p, y) {
  const profile = halfProfile(p);
  let x = 0;
  for (let i = 0; i < profile.length - 1; i++) {
    const a = profile[i], b = profile[i + 1];
    if (y >= a[1] - 1e-7 && y <= b[1] + 1e-7) {
      const t = b[1] === a[1] ? 1 : (y - a[1]) / (b[1] - a[1]);
      x = Math.max(x, THREE.MathUtils.lerp(a[0], b[0], t));
    }
  }
  return x;
}
function noseZ(x, y) {
  return FRONT - 0.135 * (x / 0.83) ** 2 - 0.030 * ((y - 0.20) / 0.34) ** 2;
}
function tailZ(x, y) {
  return REAR + 0.100 * (x / 0.82) ** 2 + 0.020 * ((y - 0.23) / 0.36) ** 2;
}
function bodySide(z, y, side, proud = 0) {
  return new THREE.Vector3(side * (halfWidthAt(sample(BODY, z, true), y) + proud), y, z);
}
function makeMesh(positions, indices, material) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const uv = [];
  for (let i = 0; i < positions.length; i += 3) {
    uv.push((positions[i] + 1) * 0.5, (positions[i + 2] + 2.4) / 4.8 + positions[i + 1] * 0.5);
  }
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function buildSedanBody(color) {
  const positions = [], indices = [], rings = [];
  for (let i = 0; i < BODY.length - 1; i++) {
    const steps = Math.ceil((BODY[i + 1][0] - BODY[i][0]) / 0.085);
    for (let step = 0; step < steps; step++) {
      rings.push(sample(BODY, THREE.MathUtils.lerp(BODY[i][0], BODY[i + 1][0], step / steps), true));
    }
  }
  rings.push(BODY.at(-1));
  let columns = 0;
  for (const p of rings) {
    const half = halfProfile(p);
    const ring = [...half, ...half.slice(1, -1).reverse().map(([x, y]) => [-x, y])];
    columns = ring.length;
    for (const [x, y] of ring) {
      let z = p[0];
      const noseBlend = THREE.MathUtils.clamp((z - 2.15) / 0.25, 0, 1);
      const tailBlend = THREE.MathUtils.clamp((-2.15 - z) / 0.21, 0, 1);
      z += noseBlend * (noseZ(x, y) - FRONT) + tailBlend * (tailZ(x, y) - REAR);
      positions.push(x, y, z);
    }
  }
  for (let r = 0; r < rings.length - 1; r++) {
    for (let j = 0; j < columns; j++) {
      const a = r * columns + j, b = r * columns + (j + 1) % columns;
      const c = a + columns, d = b + columns;
      indices.push(a, b, c, b, d, c);
    }
  }
  // Curved caps have their own vertices, keeping the bumper edge crisp while
  // the fascia itself bends around the corners instead of being a flat wall.
  for (const front of [false, true]) {
    const p = front ? BODY.at(-1) : BODY[0];
    const start = positions.length / 3, rows = 18, cols = 20;
    const surfaceZ = front ? noseZ : tailZ;
    for (let r = 0; r <= rows; r++) {
      const y = THREE.MathUtils.lerp(p[4], p[3] + 0.024, r / rows);
      const width = halfWidthAt(p, y);
      for (let c = 0; c <= cols; c++) {
        const x = THREE.MathUtils.lerp(-width, width, c / cols);
        positions.push(x, y, surfaceZ(x, y));
      }
    }
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const a = start + r * (cols + 1) + c, b = a + 1, d = a + cols + 1;
        if (front) indices.push(a, b, d, b, d + 1, d);
        else indices.push(a, d, b, b, d, d + 1);
      }
    }
  }
  const mesh = makeMesh(positions, indices, makePaint(color));
  const cut = cutWheelWells(mesh.geometry);
  mesh.geometry.dispose();
  mesh.geometry = cut;
  mesh.name = 'touring-sedan-shell';
  mesh.userData.noMerge = true;
  return mesh;
}

function roofY(z, x) {
  const [, height, width] = sample(CABIN, z);
  return height + 0.036 * Math.max(0, 1 - (x / width) ** 2);
}
function cabinSide(z, y, side, proud = 0) {
  const [, height, width] = sample(CABIN, z);
  const t = THREE.MathUtils.clamp((y - CABIN_BASE_Y) / Math.max(0.01, height - CABIN_BASE_Y), 0, 1);
  return new THREE.Vector3(side * (THREE.MathUtils.lerp(CABIN_BASE_X, width, t) + proud), y, z);
}
function buildCabin(color) {
  const positions = [], indices = [];
  const steps = 50, columns = 11;
  for (let r = 0; r <= steps; r++) {
    const z = THREE.MathUtils.lerp(CABIN[0][0], CABIN.at(-1)[0], r / steps);
    const [, height, width] = sample(CABIN, z);
    positions.push(CABIN_BASE_X, CABIN_BASE_Y, z);
    for (let c = 0; c < columns - 2; c++) {
      const x = THREE.MathUtils.lerp(width, -width, c / (columns - 3));
      positions.push(x, roofY(z, x), z);
    }
    positions.push(-CABIN_BASE_X, CABIN_BASE_Y, z);
    if (r) {
      for (let c = 0; c < columns - 1; c++) {
        const a = (r - 1) * columns + c, b = a + 1, d = a + columns;
        indices.push(a, b, d, b, d + 1, d);
      }
    }
  }
  const mesh = makeMesh(positions, indices, makePaint(color));
  mesh.name = 'touring-sedan-cabin';
  return mesh;
}
let smokedGlass;
function glazingMaterial() {
  if (!smokedGlass) {
    smokedGlass = makeGlass().clone();
    smokedGlass.transparent = false;
    smokedGlass.opacity = 1;
    smokedGlass.roughness = 0.18;
    smokedGlass.envMapIntensity = 0.58;
  }
  return smokedGlass;
}
function tube(points, radius, material) {
  return new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), Math.max(8, points.length * 4), radius, 5, false), material);
}
function buildSideWindow(side, points) {
  const positions = [], indices = [], top = [], bottom = [];
  // points contain z, lower sill, upper glass edge. Subdivision seats every
  // vertex against the cabin; the black B-pillar remains between the panes.
  let row = 0;
  for (let segment = 0; segment < points.length - 1; segment++) {
    for (let step = 0; step <= 8; step++) {
      if (segment && !step) continue;
      const t = step / 8;
      const [z, low, high] = points[segment].map((v, i) => THREE.MathUtils.lerp(v, points[segment + 1][i], t));
      const lower = cabinSide(z, low, side, 0.007), upper = cabinSide(z, high, side, 0.007);
      positions.push(...lower.toArray(), ...upper.toArray());
      bottom.push(lower); top.push(upper);
      if (row) { const a = (row - 1) * 2; indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
      row++;
    }
  }
  const group = new THREE.Group();
  group.add(makeMesh(positions, indices, glazingMaterial()));
  group.add(tube([...top, ...bottom.reverse(), top[0]], 0.0045, makeTrim()));
  return group;
}
function buildScreen(z0, z1) {
  const positions = [], indices = [];
  const rows = 12, cols = 12;
  for (let r = 0; r <= rows; r++) {
    const z = THREE.MathUtils.lerp(z0, z1, r / rows);
    const width = sample(CABIN, z)[2] * 0.91;
    for (let c = 0; c <= cols; c++) {
      const x = THREE.MathUtils.lerp(-width, width, c / cols);
      positions.push(x, roofY(z, x) + 0.007, z);
    }
  }
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const a = r * (cols + 1) + c, b = a + 1, d = a + cols + 1;
    indices.push(a, b, d, b, d + 1, d);
  }
  return makeMesh(positions, indices, glazingMaterial());
}

function fasciaPatch(points, front, material, proud = 0.008) {
  const contour = points.map(([x, y]) => new THREE.Vector2(x, y));
  const triangles = THREE.ShapeUtils.triangulateShape(contour, []);
  const positions = [], indices = [];
  // A contour-only polygon chords through the convex bumper and disappears
  // in the middle. Subdivide in XY first, then seat every interior vertex on
  // the fascia; the same surface contract applies to the rear lamp housings.
  for (const triangle of triangles) {
    const [a, b, c] = triangle.map(index => contour[index]);
    const steps = Math.max(1, Math.ceil(Math.max(a.distanceTo(b), b.distanceTo(c), c.distanceTo(a)) / 0.045));
    const base = positions.length / 3;
    const rowStart = row => row * (steps + 1) - row * (row - 1) / 2;
    for (let row = 0; row <= steps; row++) {
      for (let column = 0; column <= steps - row; column++) {
        const u = row / steps, v = column / steps;
        const x = a.x + (b.x - a.x) * u + (c.x - a.x) * v;
        const y = a.y + (b.y - a.y) * u + (c.y - a.y) * v;
        positions.push(x, y, front ? noseZ(x, y) + proud : tailZ(x, y) - proud);
      }
    }
    const addTriangle = (a, b, c) => indices.push(...(front ? [a, b, c] : [a, c, b]));
    for (let row = 0; row < steps; row++) {
      for (let column = 0; column < steps - row; column++) {
        const a = base + rowStart(row) + column, b = base + rowStart(row + 1) + column;
        addTriangle(a, b, a + 1);
        if (column < steps - row - 1) addTriangle(b, b + 1, a + 1);
      }
    }
  }
  return makeMesh(positions, indices, material);
}
function fasciaLine(points, front, radius, material, proud = 0.012) {
  return tube(points.map(([x, y]) => new THREE.Vector3(x, y,
    front ? noseZ(x, y) + proud : tailZ(x, y) - proud)), radius, material);
}
function buildFront() {
  const group = new THREE.Group();
  group.name = 'touring-sedan-front';
  for (const side of [-1, 1]) {
    group.add(fasciaPatch([[0.36, 0.425], [0.74, 0.445], [0.82, 0.405], [0.78, 0.357], [0.38, 0.370]].map(([x, y]) => [side * x, y]), true, makeTrim()));
    group.add(fasciaLine([[0.395, 0.413], [0.735, 0.431], [0.787, 0.402]].map(([x, y]) => [side * x, y]), true, 0.008, makeHeadlight()));
    // Two quiet, narrow grille openings; no oversized mouth or race aero.
    group.add(fasciaPatch([[0.035, 0.355], [0.290, 0.350], [0.305, 0.145], [0.070, 0.125]].map(([x, y]) => [side * x, y]), true, makeTrim()));
    for (const x of [0.095, 0.150, 0.205, 0.260]) {
      group.add(fasciaLine([[side * x, 0.165], [side * x, 0.325]], true, 0.004, makeSatin()));
    }
  }
  group.add(fasciaPatch([[-0.57, 0.090], [0.57, 0.090], [0.51, -0.020], [-0.51, -0.020]], true, makeTrim()));
  return group;
}
function buildRear() {
  const group = new THREE.Group(), red = [];
  group.name = 'touring-sedan-rear';
  const brakeMaterial = makeTaillight();
  for (const side of [-1, 1]) {
    group.add(fasciaPatch([[0.31, 0.495], [0.72, 0.505], [0.80, 0.447], [0.77, 0.375], [0.33, 0.410]].map(([x, y]) => [side * x, y]), false, makeTrim()));
    for (const path of [[[0.34, 0.474], [0.71, 0.480], [0.77, 0.440]], [[0.755, 0.409], [0.55, 0.425]]]) {
      const strip = fasciaLine(path.map(([x, y]) => [side * x, y]), false, 0.010, brakeMaterial);
      red.push(strip.geometry);
    }
  }
  const brakeMesh = new THREE.Mesh(mergeGeometries(red, false), brakeMaterial);
  red.forEach(geometry => geometry.dispose());
  brakeMesh.userData.noMerge = true;
  group.add(brakeMesh);
  return { group, brakeMesh };
}

function hoodBadgePose(z) {
  const point = at => {
    const y = sample(BODY, at, true)[3] + 0.024;
    const blend = THREE.MathUtils.clamp((at - 2.15) / 0.25, 0, 1);
    return new THREE.Vector3(0, y, at + blend * (noseZ(0, y) - FRONT));
  };
  const tangent = point(z + 0.001).sub(point(z - 0.001));
  return { position: point(z), normal: new THREE.Vector3(0, tangent.z, -tangent.y).normalize() };
}

export function decorate(body, ctx) {
  body.add(buildSedanBody(ctx.color), buildCabin(ctx.color));
  for (const side of [-1, 1]) {
    body.add(buildSideWindow(side, [[0.82, 0.692, 0.728], [0.37, 0.692, 1.067], [-0.145, 0.692, 1.100]]));
    body.add(buildSideWindow(side, [[-0.255, 0.692, 1.101], [-0.755, 0.704, 1.100], [-0.96, 0.714, 1.025], [-1.28, 0.758, 0.780]]));
    // Four doors, with the rear door's trailing edge rising over the arch.
    for (const path of [
      [[0.91, 0.61], [0.88, 0.11], [0.74, -0.035], [-0.14, -0.035], [-0.18, 0.62]],
      [[-0.18, 0.62], [-0.14, -0.035], [-0.86, -0.035], [-1.065, 0.22], [-1.27, 0.625]],
    ]) body.add(tube(path.map(([z, y]) => bodySide(z, y, side, 0.003)), 0.0025, makeShutline()));
    for (const z of [0.01, -0.94]) {
      body.add(tube([bodySide(z - 0.065, 0.566, side, 0.006), bodySide(z + 0.065, 0.566, side, 0.006)], 0.010, makeTrim()));
    }
  }
  body.add(buildScreen(0.880, 0.455), buildScreen(-1.365, -1.045));
  body.add(buildFront());
  const rear = buildRear();
  body.add(rear.group);
  body.add(buildMirrors({ z: 0.68, y: 0.665, x: 0.900, color: ctx.color, indicator: false }));
  body.add(buildBadgesAndPlate({
    frontPose: hoodBadgePose(2.20),
    rearZ: -2.372, rearY: 0.355, plateY: 0.175,
  }));
  body.add(buildExhaust({ z: -2.365, y: -0.055, x: 0.57, count: 2, r: 0.037 }));
  body.add(buildUnderbody({ y: -0.245, w: 1.23, len: 3.75 }));
  body.add(buildArchLiners({ zF: 1.45, zR: -1.45, x: 0.84, r: 0.413, width: 0.26, lip: false }));
  return { brakeLights: rear.brakeMesh };
}
