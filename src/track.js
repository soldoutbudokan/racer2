import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const ROAD_WIDTH = 14;
const KERB_WIDTH = 2.0;
const RUNOFF_WIDTH = 5.5;
const TRACK_SEGMENTS = 600;
const ARMCO_OFFSET = ROAD_WIDTH / 2 + RUNOFF_WIDTH + 0.5;

/**
 * A closed-loop GT-style circuit. Returns a Catmull-Rom centreline that the
 * camera/AI can sample, plus all visual + physics meshes added to the world.
 */
export function createTrack(scene, world, materials) {
  const cps = [
    new THREE.Vector3(   0, 0,    0),
    new THREE.Vector3(   0, 0,  140),
    new THREE.Vector3(  10, 0,  240),
    new THREE.Vector3(  90, 0,  290),
    new THREE.Vector3( 200, 0,  290),
    new THREE.Vector3( 280, 0,  240),
    new THREE.Vector3( 300, 0,  150),
    new THREE.Vector3( 240, 0,   90),
    new THREE.Vector3( 180, 0,   60),
    new THREE.Vector3( 200, 0,  -20),
    new THREE.Vector3( 280, 0,  -80),
    new THREE.Vector3( 300, 0, -160),
    new THREE.Vector3( 240, 0, -220),
    new THREE.Vector3( 120, 0, -240),
    new THREE.Vector3(   0, 0, -220),
    new THREE.Vector3( -90, 0, -180),
    new THREE.Vector3(-130, 0, -120),
    new THREE.Vector3(-130, 0,  -40),
    new THREE.Vector3( -80, 0,   30),
    new THREE.Vector3(  -8, 0,   60),
  ];
  const curve = new THREE.CatmullRomCurve3(cps, true, 'catmullrom', 0.5);
  const frames = sampleCurve(curve, TRACK_SEGMENTS);
  const arcLens = computeArcLengths(frames);
  const curvature = computeCurvature(frames);

  // ---- Ground ----
  const grassMat = makeGrassMaterial();
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(4000, 4000, 1, 1),
    grassMat
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.02;
  ground.receiveShadow = true;
  scene.add(ground);

  const groundBody = new CANNON.Body({
    mass: 0,
    material: materials.groundMat,
  });
  groundBody.addShape(new CANNON.Box(new CANNON.Vec3(2000, 0.5, 2000)));
  groundBody.position.set(0, -0.5, 0);
  world.addBody(groundBody);

  // ---- Run-off apron (paved gravel-tan strip outside the road) ----
  const runoffMat = makeRunoffMaterial();
  const runoffCenter = ROAD_WIDTH / 2 + RUNOFF_WIDTH / 2;
  const runoffL = new THREE.Mesh(
    buildEdgeLineGeometry(frames, runoffCenter, RUNOFF_WIDTH),
    runoffMat
  );
  runoffL.position.y = 0.005;
  runoffL.receiveShadow = true;
  scene.add(runoffL);
  const runoffR = new THREE.Mesh(
    buildEdgeLineGeometry(frames, -runoffCenter, RUNOFF_WIDTH),
    runoffMat
  );
  runoffR.position.y = 0.005;
  runoffR.receiveShadow = true;
  scene.add(runoffR);

  // ---- Asphalt ribbon ----
  const asphaltMat = makeAsphaltMaterial();
  const roadGeo = buildRibbonGeometry(frames, ROAD_WIDTH, true);
  const road = new THREE.Mesh(roadGeo, asphaltMat);
  road.position.y = 0.01;
  road.receiveShadow = true;
  scene.add(road);

  // White edge lines flush with the actual road edge
  const lineMat = new THREE.MeshStandardMaterial({
    color: 0xeeeeee,
    roughness: 0.6,
    metalness: 0,
  });
  const lineWidth = 0.2;
  const lineEdgeOffset = ROAD_WIDTH / 2 - lineWidth / 2 - 0.05;
  const lineLeft = new THREE.Mesh(
    buildEdgeLineGeometry(frames, lineEdgeOffset, lineWidth),
    lineMat
  );
  lineLeft.position.y = 0.013;
  scene.add(lineLeft);
  const lineRight = new THREE.Mesh(
    buildEdgeLineGeometry(frames, -lineEdgeOffset, lineWidth),
    lineMat
  );
  lineRight.position.y = 0.013;
  scene.add(lineRight);

  // Red/white kerbs covering all corners (arc-length-correct stripes)
  const kerbMat = makeKerbMaterial();
  const kerbActive = computeKerbActive(curvature, 0.0012, 6);
  const kerbL = new THREE.Mesh(
    buildKerbGeometry(frames, ROAD_WIDTH / 2, KERB_WIDTH, +1, kerbActive, arcLens),
    kerbMat
  );
  kerbL.position.y = 0.045;
  kerbL.receiveShadow = true;
  scene.add(kerbL);
  const kerbR = new THREE.Mesh(
    buildKerbGeometry(frames, -ROAD_WIDTH / 2, KERB_WIDTH, -1, kerbActive, arcLens),
    kerbMat
  );
  kerbR.position.y = 0.045;
  kerbR.receiveShadow = true;
  scene.add(kerbR);

  // Start/finish line
  const sfTex = makeStartFinishTexture();
  const sfMat = new THREE.MeshStandardMaterial({ map: sfTex, roughness: 0.6 });
  const sf = new THREE.Mesh(new THREE.PlaneGeometry(ROAD_WIDTH, 1.6), sfMat);
  sf.rotation.x = -Math.PI / 2;
  sf.position.copy(frames[0].pos).add(new THREE.Vector3(0, 0.014, 0));
  const yawSF = Math.atan2(frames[0].tan.x, frames[0].tan.z);
  sf.rotation.z = -yawSF;
  scene.add(sf);

  // Painted starting grid behind the line
  addStartingGrid(scene, frames[0]);

  // Start/finish gantry
  addStartGantry(scene, frames[0]);

  // Armco guardrail running along outer edge of run-off
  addArmco(scene, frames, ARMCO_OFFSET);

  // Tire stacks at high-curvature corner exits
  addTireStacks(scene, frames, curvature, ARMCO_OFFSET - 1.4);

  // Sponsor boards behind the armco
  addSponsorBoards(scene, frames, ARMCO_OFFSET + 1.6);

  // Scenery
  scatterTrees(scene, frames);
  addDistantMountains(scene);
  addGrandstands(scene, frames);

  // Physics walls along the armco line
  buildBarrierPhysics(world, frames, ARMCO_OFFSET, materials);

  const spawn = {
    position: new THREE.Vector3()
      .copy(frames[0].pos)
      .add(frames[0].tan.clone().multiplyScalar(-6))
      .add(new THREE.Vector3(0, 1.0, 0)),
    yaw: Math.atan2(frames[0].tan.x, frames[0].tan.z),
  };

  return {
    curve,
    frames,
    spawn,
    width: ROAD_WIDTH,
    length: curve.getLength(),
  };
}

// ---------- Geometry utilities ----------

function sampleCurve(curve, segments) {
  const frames = [];
  for (let i = 0; i < segments; i++) {
    const t = i / segments;
    const pos = curve.getPointAt(t);
    const tan = curve.getTangentAt(t).normalize();
    const left = new THREE.Vector3(-tan.z, 0, tan.x).normalize();
    frames.push({ t, pos, tan, left });
  }
  return frames;
}

function computeArcLengths(frames) {
  const lens = [0];
  for (let i = 1; i < frames.length; i++) {
    lens.push(lens[i - 1] + frames[i].pos.distanceTo(frames[i - 1].pos));
  }
  return lens;
}

function computeCurvature(frames) {
  const n = frames.length;
  const c = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    const t1 = frames[i].tan;
    const t2 = frames[(i + 1) % n].tan;
    c[i] = 1.0 - t1.dot(t2);
  }
  const smoothed = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let s = 0;
    for (let k = -3; k <= 3; k++) s += c[(i + k + n) % n];
    smoothed[i] = s / 7;
  }
  return smoothed;
}

function computeKerbActive(curvature, threshold, dilate) {
  const n = curvature.length;
  const seed = new Array(n).fill(false);
  for (let i = 0; i < n; i++) seed[i] = curvature[i] > threshold;
  const out = new Array(n).fill(false);
  for (let i = 0; i < n; i++) {
    for (let k = -dilate; k <= dilate; k++) {
      if (seed[(i + k + n) % n]) { out[i] = true; break; }
    }
  }
  return out;
}

function buildRibbonGeometry(frames, width, closed) {
  const n = frames.length;
  const positions = new Float32Array(n * 2 * 3);
  const uvs = new Float32Array(n * 2 * 2);
  const normals = new Float32Array(n * 2 * 3);
  let totalLen = 0;
  const lengths = [0];
  for (let i = 1; i < n; i++) {
    totalLen += frames[i].pos.distanceTo(frames[i - 1].pos);
    lengths.push(totalLen);
  }
  for (let i = 0; i < n; i++) {
    const f = frames[i];
    const l = f.pos.clone().add(f.left.clone().multiplyScalar(width / 2));
    const r = f.pos.clone().add(f.left.clone().multiplyScalar(-width / 2));
    positions.set([l.x, l.y, l.z], (i * 2) * 3);
    positions.set([r.x, r.y, r.z], (i * 2 + 1) * 3);
    const v = lengths[i] / 4;
    uvs.set([0, v], (i * 2) * 2);
    uvs.set([1, v], (i * 2 + 1) * 2);
    normals.set([0, 1, 0], (i * 2) * 3);
    normals.set([0, 1, 0], (i * 2 + 1) * 3);
  }
  const indices = [];
  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i++) {
    const a = i * 2;
    const b = i * 2 + 1;
    const c = ((i + 1) % n) * 2;
    const d = ((i + 1) % n) * 2 + 1;
    indices.push(a, c, b, b, c, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  g.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  g.setIndex(indices);
  return g;
}

function buildEdgeLineGeometry(frames, offset, width) {
  const n = frames.length;
  const positions = new Float32Array(n * 2 * 3);
  const uvs = new Float32Array(n * 2 * 2);
  const normals = new Float32Array(n * 2 * 3);
  for (let i = 0; i < n; i++) {
    const f = frames[i];
    const inner = f.pos.clone().add(f.left.clone().multiplyScalar(offset - width / 2));
    const outer = f.pos.clone().add(f.left.clone().multiplyScalar(offset + width / 2));
    positions.set([inner.x, inner.y, inner.z], (i * 2) * 3);
    positions.set([outer.x, outer.y, outer.z], (i * 2 + 1) * 3);
    uvs.set([0, i / n], (i * 2) * 2);
    uvs.set([1, i / n], (i * 2 + 1) * 2);
    normals.set([0, 1, 0], (i * 2) * 3);
    normals.set([0, 1, 0], (i * 2 + 1) * 3);
  }
  const indices = [];
  for (let i = 0; i < n; i++) {
    const a = i * 2;
    const b = i * 2 + 1;
    const c = ((i + 1) % n) * 2;
    const d = ((i + 1) % n) * 2 + 1;
    indices.push(a, c, b, b, c, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  g.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  g.setIndex(indices);
  return g;
}

function buildKerbGeometry(frames, offsetIn, width, sideSign, active, arcLens) {
  const n = frames.length;
  const positions = [];
  const uvs = [];
  const normals = [];
  const indices = [];
  const closingArc = arcLens[n - 1] + frames[0].pos.distanceTo(frames[n - 1].pos);
  let vIndex = 0;
  let lastValid = false;
  let lastIndex = -1;
  for (let i = 0; i <= n; i++) {
    const idx = i % n;
    const f = frames[idx];
    if (active[idx]) {
      const inner = f.pos.clone().add(f.left.clone().multiplyScalar(offsetIn));
      const outer = f.pos.clone().add(f.left.clone().multiplyScalar(offsetIn + sideSign * width));
      positions.push(inner.x, inner.y, inner.z, outer.x, outer.y, outer.z);
      const arc = i === n ? closingArc : arcLens[idx];
      // 1 v-unit per metre of track length → one red+white stripe pair every 1 m
      const v = arc;
      uvs.push(0, v, 1, v);
      normals.push(0, 1, 0, 0, 1, 0);
      if (lastValid) {
        const a = lastIndex;
        const b = lastIndex + 1;
        const c = vIndex;
        const d = vIndex + 1;
        indices.push(a, c, b, b, c, d);
      }
      lastIndex = vIndex;
      vIndex += 2;
      lastValid = true;
    } else {
      lastValid = false;
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
  g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
  g.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), 3));
  g.setIndex(indices);
  return g;
}

// ---------- Materials ----------

function makeAsphaltMaterial() {
  const colorTex = makeNoiseTexture(512, (x, y) => {
    const n = fractalNoise(x * 8, y * 8, 5) * 0.5 + 0.5;
    const v = 0.13 + n * 0.10;
    return [v, v, v + 0.005];
  });
  colorTex.wrapS = colorTex.wrapT = THREE.RepeatWrapping;
  // Asphalt UVs use arc-length / 4m on V; keep V repeat at 1 to avoid the
  // ridiculous tiling the previous build had. U repeats a few times across the
  // road so the grain reads at close range.
  colorTex.repeat.set(3, 1);
  colorTex.anisotropy = 8;
  colorTex.colorSpace = THREE.SRGBColorSpace;

  const normalTex = makeNormalTexture(512, 1.5);
  normalTex.wrapS = normalTex.wrapT = THREE.RepeatWrapping;
  normalTex.repeat.set(3, 1);

  const roughTex = makeNoiseTexture(512, (x, y) => {
    const n = fractalNoise(x * 6 + 3, y * 6 + 7, 4) * 0.4 + 0.6;
    return [n, n, n];
  });
  roughTex.wrapS = roughTex.wrapT = THREE.RepeatWrapping;
  roughTex.repeat.set(3, 1);

  return new THREE.MeshStandardMaterial({
    map: colorTex,
    normalMap: normalTex,
    normalScale: new THREE.Vector2(0.55, 0.55),
    roughnessMap: roughTex,
    roughness: 0.82,
    metalness: 0.0,
    envMapIntensity: 0.55,
  });
}

function makeGrassMaterial() {
  const tex = makeNoiseTexture(512, (x, y) => {
    const n = fractalNoise(x * 4, y * 4, 5);
    const v = 0.18 + n * 0.18;
    return [v * 0.55, v * 1.0, v * 0.5];
  });
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(220, 220);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.MeshStandardMaterial({
    map: tex,
    roughness: 0.95,
    metalness: 0.0,
    envMapIntensity: 0.4,
  });
}

function makeRunoffMaterial() {
  const tex = makeNoiseTexture(512, (x, y) => {
    const n = fractalNoise(x * 9, y * 9, 5);
    const v = 0.30 + n * 0.18;
    return [v * 1.05, v * 0.94, v * 0.68];
  });
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 80);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.MeshStandardMaterial({
    map: tex,
    roughness: 0.97,
    metalness: 0.0,
    envMapIntensity: 0.35,
  });
}

function makeKerbMaterial() {
  const c = document.createElement('canvas');
  c.width = 32; c.height = 32;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#cf2222'; ctx.fillRect(0, 0, 32, 32);
  ctx.fillStyle = '#f4f4f4'; ctx.fillRect(0, 16, 32, 16);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  // Kerb UVs are in metres → repeat = 1 gives 1 m red + 1 m white stripes.
  // Set to 2 so each stripe pair is 0.5 m, the typical kerb cadence.
  tex.repeat.set(1, 2);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.magFilter = THREE.NearestFilter;
  return new THREE.MeshStandardMaterial({
    map: tex,
    roughness: 0.55,
    metalness: 0.0,
  });
}

function makeStartFinishTexture() {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 32;
  const ctx = c.getContext('2d');
  for (let x = 0; x < 16; x++) {
    for (let y = 0; y < 2; y++) {
      ctx.fillStyle = (x + y) % 2 === 0 ? '#ffffff' : '#000000';
      ctx.fillRect(x * 16, y * 16, 16, 16);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ---------- Scenery textures ----------

// Soft leaf-cluster billboard with a transparent surround (alpha-tested).
function makeFoliageTexture() {
  const size = 128;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, size, size);
  for (let i = 0; i < 90; i++) {
    const a = Math.random() * Math.PI * 2;
    const rad = Math.pow(Math.random(), 0.7) * size * 0.42;
    const x = size / 2 + Math.cos(a) * rad;
    const y = size / 2 + Math.sin(a) * rad * 0.95;
    const r = 6 + Math.random() * 15;
    const g = 80 + Math.random() * 80;
    ctx.fillStyle = `rgba(${(28 + Math.random() * 34) | 0},${g | 0},${(30 + Math.random() * 26) | 0},0.9)`;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Stadium crowd — speckled colour on a dark bank.
function makeCrowdTexture() {
  const w = 256, h = 64;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#23262b'; ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 1400; i++) {
    const x = Math.random() * w, y = Math.random() * h;
    const hue = Math.floor(Math.random() * 360);
    ctx.fillStyle = `hsl(${hue},${40 + Math.random() * 40}%,${45 + Math.random() * 30}%)`;
    ctx.fillRect(x, y, 2, 2);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// A handful of faux sponsor logos (geometric mark + wordmark).
function makeSponsorTextures() {
  const words = ['VELOCE', 'APEX', 'NITRO', 'AERO', 'TORQUE', 'VORTEX', 'RACE1', 'FLUX'];
  const bg = ['#e8e8ea', '#101418', '#c41e1e', '#1e40af', '#059669', '#f5b301', '#0891b2', '#7c3aed'];
  return words.map((word, i) => {
    const w = 512, h = 80;
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    ctx.fillStyle = bg[i % bg.length]; ctx.fillRect(0, 0, w, h);
    const fg = (i % bg.length) === 0 || (i % bg.length) === 5 ? '#16181d' : '#f4f6f8';
    // geometric mark
    ctx.fillStyle = fg;
    ctx.beginPath();
    ctx.moveTo(20, 60); ctx.lineTo(50, 18); ctx.lineTo(70, 18); ctx.lineTo(40, 60);
    ctx.closePath(); ctx.fill();
    ctx.fillRect(58, 18, 14, 42);
    ctx.font = 'bold 50px Arial Black, Arial';
    ctx.textBaseline = 'middle';
    ctx.fillText(word, 100, 44);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  });
}

// ---------- Procedural noise ----------

function hashFn(x, y) {
  const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return s - Math.floor(s);
}
function smoothstep(a, b, t) {
  t = Math.max(0, Math.min(1, (t - a) / (b - a)));
  return t * t * (3 - 2 * t);
}
function valueNoise(x, y) {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = x - xi, yf = y - yi;
  const a = hashFn(xi, yi);
  const b = hashFn(xi + 1, yi);
  const c = hashFn(xi, yi + 1);
  const d = hashFn(xi + 1, yi + 1);
  const u = smoothstep(0, 1, xf);
  const v = smoothstep(0, 1, yf);
  return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
}
function fractalNoise(x, y, oct) {
  let amp = 0.5, freq = 1, sum = 0, max = 0;
  for (let i = 0; i < oct; i++) {
    sum += amp * valueNoise(x * freq, y * freq);
    max += amp;
    amp *= 0.5; freq *= 2;
  }
  return sum / max;
}
function makeNoiseTexture(size, fn) {
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const [r, g, b] = fn(x / size, y / size);
      const i = (y * size + x) * 4;
      img.data[i] = Math.min(255, Math.max(0, r * 255));
      img.data[i + 1] = Math.min(255, Math.max(0, g * 255));
      img.data[i + 2] = Math.min(255, Math.max(0, b * 255));
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}
function makeNormalTexture(size, strength) {
  const heights = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      heights[y * size + x] = fractalNoise(x / size * 8, y / size * 8, 4);
    }
  }
  const c = document.createElement('canvas');
  c.width = size; c.height = size;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const xl = heights[y * size + ((x - 1 + size) % size)];
      const xr = heights[y * size + ((x + 1) % size)];
      const yl = heights[((y - 1 + size) % size) * size + x];
      const yr = heights[((y + 1) % size) * size + x];
      const dx = (xr - xl) * strength;
      const dy = (yr - yl) * strength;
      const nx = -dx;
      const ny = -dy;
      const nz = 1.0;
      const len = Math.hypot(nx, ny, nz);
      const i = (y * size + x) * 4;
      img.data[i] = ((nx / len) * 0.5 + 0.5) * 255;
      img.data[i + 1] = ((ny / len) * 0.5 + 0.5) * 255;
      img.data[i + 2] = ((nz / len) * 0.5 + 0.5) * 255;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

// ---------- Scenery ----------

function scatterTrees(scene, frames) {
  const trunkMat = new THREE.MeshStandardMaterial({
    color: 0x4a3520, roughness: 0.95, metalness: 0,
  });
  // Crossed alpha-cutout foliage billboards read as full leafy canopies from
  // every angle yet stay cheap (instanced, alpha-tested → no sorting).
  const leavesMat = new THREE.MeshStandardMaterial({
    map: makeFoliageTexture(),
    alphaTest: 0.45,
    roughness: 0.9, metalness: 0,
    side: THREE.DoubleSide,
  });

  const trunkGeo = new THREE.CylinderGeometry(0.22, 0.42, 2.6, 7);
  trunkGeo.translate(0, 1.3, 0);

  // three quads crossing through a common vertical axis
  const quad = new THREE.PlaneGeometry(7.2, 7.4);
  quad.translate(0, 3.7, 0);
  const q2 = quad.clone(); q2.rotateY(Math.PI / 3);
  const q3 = quad.clone(); q3.rotateY((2 * Math.PI) / 3);
  const leavesGeo = mergeGeometries([quad, q2, q3]);
  leavesGeo.translate(0, 2.4, 0); // sit on top of the trunk

  const N = 600;
  const trunkInst = new THREE.InstancedMesh(trunkGeo, trunkMat, N);
  const leavesInst = new THREE.InstancedMesh(leavesGeo, leavesMat, N);
  trunkInst.castShadow = trunkInst.receiveShadow = true;
  leavesInst.castShadow = true;
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const s = new THREE.Vector3();
  const col = new THREE.Color();
  let placed = 0;
  for (let i = 0; i < N * 4 && placed < N; i++) {
    const x = (Math.random() * 2 - 1) * 800;
    const z = (Math.random() * 2 - 1) * 800;
    const p = new THREE.Vector3(x, 0, z);
    let minD = Infinity;
    for (let k = 0; k < frames.length; k += 6) {
      const d = p.distanceToSquared(frames[k].pos);
      if (d < minD) minD = d;
    }
    if (minD < 35 * 35) continue;
    const sc = 0.7 + Math.random() * 1.0;
    s.set(sc, 0.8 + Math.random() * 0.6, sc);
    q.setFromEuler(new THREE.Euler(0, Math.random() * Math.PI * 2, 0));
    m.compose(p, q, s);
    trunkInst.setMatrixAt(placed, m);
    leavesInst.setMatrixAt(placed, m);
    // per-tree hue variation so the canopy isn't a flat green wall
    col.setHSL(0.26 + (Math.random() - 0.5) * 0.06, 0.5, 0.32 + Math.random() * 0.12);
    leavesInst.setColorAt(placed, col);
    placed++;
  }
  trunkInst.count = placed;
  leavesInst.count = placed;
  trunkInst.instanceMatrix.needsUpdate = true;
  leavesInst.instanceMatrix.needsUpdate = true;
  if (leavesInst.instanceColor) leavesInst.instanceColor.needsUpdate = true;
  scene.add(trunkInst);
  scene.add(leavesInst);
}

function addDistantMountains(scene) {
  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 1.0,
    metalness: 0,
  });
  const rock = new THREE.Color(0x5c6672);
  const grass = new THREE.Color(0x44503f);
  const snow = new THREE.Color(0xe8edf2);
  const tmp = new THREE.Color();
  for (let i = 0; i < 28; i++) {
    const r = 1100 + Math.random() * 300;
    const a = (i / 28) * Math.PI * 2;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const h = 100 + Math.random() * 180;
    const w = 200 + Math.random() * 200;
    const geo = new THREE.ConeGeometry(w, h, 14, 7);
    // Displace radially with noise → ridged, eroded silhouette (no flatShading).
    const pos = geo.getAttribute('position');
    const colors = [];
    const seed = i * 7.13;
    for (let v = 0; v < pos.count; v++) {
      const px = pos.getX(v), py = pos.getY(v), pz = pos.getZ(v);
      const ang = Math.atan2(pz, px);
      const yFrac = (py + h / 2) / h;             // 0 base .. 1 tip
      const n = fractalNoise(ang * 2.2 + seed, yFrac * 3 + seed, 4);
      const push = (0.6 + n * 0.8) * (1 - yFrac * 0.5);
      pos.setX(v, px * (0.7 + push * 0.5));
      pos.setZ(v, pz * (0.7 + push * 0.5));
      pos.setY(v, py + (n - 0.5) * h * 0.12);
      // colour by altitude with a noisy snow line
      const snowLine = 0.62 + (n - 0.5) * 0.18;
      if (yFrac > snowLine) tmp.copy(snow);
      else if (yFrac < 0.18) tmp.copy(grass);
      else tmp.copy(rock).lerp(snow, (yFrac - 0.18) / (snowLine - 0.18) * 0.4);
      colors.push(tmp.r, tmp.g, tmp.b);
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, h / 2 - 8, z);
    m.rotation.y = Math.random() * Math.PI;
    scene.add(m);
  }
}

function addGrandstands(scene, frames) {
  const standMat = new THREE.MeshStandardMaterial({
    color: 0xc9ccd0, roughness: 0.8, metalness: 0.1,
  });
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x3a3f47, roughness: 0.5, metalness: 0.6,
  });
  const roofMat = new THREE.MeshStandardMaterial({
    color: 0xe6e8ea, roughness: 0.6, metalness: 0.2, side: THREE.DoubleSide,
  });
  const crowdMat = new THREE.MeshStandardMaterial({
    map: makeCrowdTexture(), roughness: 0.85, metalness: 0,
  });
  const places = [0, 8, 16];
  const standOffset = ARMCO_OFFSET + 4;
  for (const idxOff of places) {
    const f = frames[idxOff];
    const base = f.pos.clone().add(f.left.clone().multiplyScalar(-standOffset));
    const yaw = Math.atan2(f.tan.x, f.tan.z);
    const g = new THREE.Group();
    // sloped seating bank with a crowd texture facing the track
    const bank = new THREE.Mesh(new THREE.BoxGeometry(22, 7, 7), standMat);
    bank.position.y = 3.5;
    bank.castShadow = bank.receiveShadow = true;
    g.add(bank);
    const crowd = new THREE.Mesh(new THREE.PlaneGeometry(21, 7.6), crowdMat);
    crowd.position.set(0, 3.7, 3.6);
    crowd.rotation.x = -0.55;
    g.add(crowd);
    // support columns
    for (const cx of [-9.5, -3, 3, 9.5]) {
      const col = new THREE.Mesh(new THREE.BoxGeometry(0.5, 7, 0.5), frameMat);
      col.position.set(cx, 3.5, -2.6);
      col.castShadow = true;
      g.add(col);
    }
    // cantilever roof canopy
    const roof = new THREE.Mesh(new THREE.BoxGeometry(23, 0.3, 8), roofMat);
    roof.position.set(0, 7.6, 1.2);
    roof.rotation.x = 0.12;
    roof.castShadow = true;
    g.add(roof);
    for (const cx of [-10, 10]) {
      const brace = new THREE.Mesh(new THREE.BoxGeometry(0.3, 4.5, 0.3), frameMat);
      brace.position.set(cx, 6, -1.5);
      brace.rotation.x = -0.5;
      g.add(brace);
    }
    g.position.copy(base);
    g.rotation.y = yaw;
    scene.add(g);
  }
}

// ---------- Track features ----------

function addStartingGrid(scene, startFrame) {
  // Eight grid slots painted on the asphalt behind the start line — makes it
  // unmistakable where laps begin and where the cars line up.
  const yaw = Math.atan2(startFrame.tan.x, startFrame.tan.z);
  const tan = startFrame.tan.clone().normalize();
  const left = startFrame.left.clone().normalize();
  const slotW = 2.0;
  const slotL = 4.6;
  const rowSpacing = 7.0;
  const lateralOffset = 2.5;
  const rows = 4;

  const slotMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.7,
    metalness: 0,
    transparent: true,
    opacity: 0.7,
  });
  const stripeMat = new THREE.MeshStandardMaterial({
    color: 0xffd84a,
    roughness: 0.7,
    metalness: 0,
    transparent: true,
    opacity: 0.85,
  });

  for (let r = 0; r < rows; r++) {
    for (const sign of [+1, -1]) {
      const back = -2.8 - r * rowSpacing;
      const lat = lateralOffset * sign;
      const center = startFrame.pos.clone()
        .add(tan.clone().multiplyScalar(back))
        .add(left.clone().multiplyScalar(lat));
      const outline = makeFlatRectOutline(slotW, slotL, 0.14, slotMat);
      outline.position.set(center.x, 0.0135, center.z);
      outline.rotation.y = -yaw;
      scene.add(outline);

      // Front bar — thicker yellow stripe at the front of each slot for the
      // "this is where the nose of your car goes" feel.
      const front = new THREE.Mesh(
        new THREE.PlaneGeometry(slotW - 0.4, 0.22),
        stripeMat
      );
      front.rotation.x = -Math.PI / 2;
      const frontPos = center.clone()
        .add(tan.clone().multiplyScalar(slotL / 2 - 0.4));
      front.position.set(frontPos.x, 0.014, frontPos.z);
      front.rotation.z = -yaw;
      scene.add(front);
    }
  }
}

function makeFlatRectOutline(w, l, thick, material) {
  // A flat rectangular outline lying in the XZ plane (normal +Y) — four thin
  // strips parented to a single Group.
  const g = new THREE.Group();
  for (const sz of [-1, +1]) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, thick), material);
    m.rotation.x = -Math.PI / 2;
    m.position.z = sz * (l / 2 - thick / 2);
    g.add(m);
  }
  for (const sx of [-1, +1]) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(thick, l), material);
    m.rotation.x = -Math.PI / 2;
    m.position.x = sx * (w / 2 - thick / 2);
    g.add(m);
  }
  return g;
}

function addStartGantry(scene, startFrame) {
  const yaw = Math.atan2(startFrame.tan.x, startFrame.tan.z);
  const center = startFrame.pos.clone().add(startFrame.tan.clone().multiplyScalar(8));

  const group = new THREE.Group();

  const pillarMat = new THREE.MeshStandardMaterial({
    color: 0x3a3a3a, roughness: 0.55, metalness: 0.7,
  });
  const beamMat = new THREE.MeshStandardMaterial({
    color: 0x222222, roughness: 0.55, metalness: 0.7,
  });
  const bannerRedMat = new THREE.MeshStandardMaterial({
    color: 0xc41e1e, roughness: 0.5, metalness: 0,
  });
  const bannerWhiteMat = new THREE.MeshStandardMaterial({
    color: 0xeeeeee, roughness: 0.5, metalness: 0,
  });

  const pillarHeight = 8.5;
  const pillarOffset = ROAD_WIDTH / 2 + 1.8;

  const pillarGeo = new THREE.BoxGeometry(0.55, pillarHeight, 0.55);
  const lp = new THREE.Mesh(pillarGeo, pillarMat);
  lp.position.set(pillarOffset, pillarHeight / 2, 0);
  lp.castShadow = true;
  group.add(lp);
  const rp = new THREE.Mesh(pillarGeo, pillarMat);
  rp.position.set(-pillarOffset, pillarHeight / 2, 0);
  rp.castShadow = true;
  group.add(rp);

  // Top truss beam
  const beam = new THREE.Mesh(
    new THREE.BoxGeometry(pillarOffset * 2 + 0.55, 0.5, 0.8),
    beamMat
  );
  beam.position.set(0, pillarHeight + 0.25, 0);
  beam.castShadow = true;
  group.add(beam);

  // Banner: red field with central white stripe
  const bannerWidth = pillarOffset * 2 - 1.2;
  const banner = new THREE.Mesh(
    new THREE.BoxGeometry(bannerWidth, 1.7, 0.18),
    bannerRedMat
  );
  banner.position.set(0, pillarHeight - 0.7, 0);
  banner.castShadow = true;
  group.add(banner);
  const stripe = new THREE.Mesh(
    new THREE.BoxGeometry(bannerWidth, 0.32, 0.2),
    bannerWhiteMat
  );
  stripe.position.set(0, pillarHeight - 0.7, 0.01);
  group.add(stripe);

  // Vertical truss diagonals — quick stylised cross-bracing
  const braceMat = new THREE.MeshStandardMaterial({
    color: 0x444444, roughness: 0.6, metalness: 0.6,
  });
  for (const sx of [-1, 1]) {
    const brace = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, pillarHeight * 0.9, 0.18),
      braceMat
    );
    brace.position.set(sx * (pillarOffset - 0.3), pillarHeight / 2, 0);
    brace.rotation.z = sx * 0.18;
    group.add(brace);
  }

  group.position.copy(center);
  group.rotation.y = yaw;
  scene.add(group);
}

function addArmco(scene, frames, offset) {
  const railMat = new THREE.MeshStandardMaterial({
    color: 0xeeeeee,
    roughness: 0.4,
    metalness: 0.65,
    side: THREE.DoubleSide,
  });
  const postMat = new THREE.MeshStandardMaterial({
    color: 0x707070,
    roughness: 0.7,
    metalness: 0.4,
  });

  for (const sign of [+1, -1]) {
    const rail = new THREE.Mesh(buildRailGeometry(frames, offset * sign), railMat);
    scene.add(rail);
  }

  const stride = 5;
  const postCount = Math.floor(frames.length / stride) * 2;
  const postGeo = new THREE.BoxGeometry(0.18, 0.85, 0.18);
  const posts = new THREE.InstancedMesh(postGeo, postMat, postCount);
  posts.castShadow = true;
  posts.receiveShadow = true;
  let idx = 0;
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const s = new THREE.Vector3(1, 1, 1);
  const up = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < frames.length; i += stride) {
    const f = frames[i];
    const yaw = Math.atan2(f.tan.x, f.tan.z);
    q.setFromAxisAngle(up, yaw);
    for (const sign of [+1, -1]) {
      const p = f.pos.clone().add(f.left.clone().multiplyScalar(offset * sign));
      p.y = 0.425;
      m.compose(p, q, s);
      posts.setMatrixAt(idx++, m);
    }
  }
  posts.count = idx;
  posts.instanceMatrix.needsUpdate = true;
  scene.add(posts);
}

function buildRailGeometry(frames, offset) {
  // A double-sided vertical strip along the curve, the height of an Armco.
  const n = frames.length;
  const positions = [];
  const normals = [];
  const uvs = [];
  const indices = [];
  const railLow = 0.4;
  const railHigh = 0.78;
  const dirSign = offset > 0 ? -1 : 1;
  for (let i = 0; i < n; i++) {
    const f = frames[i];
    const p = f.pos.clone().add(f.left.clone().multiplyScalar(offset));
    positions.push(p.x, railLow, p.z);
    positions.push(p.x, railHigh, p.z);
    uvs.push(0, i / 8, 1, i / 8);
    const nx = f.left.x * dirSign;
    const nz = f.left.z * dirSign;
    normals.push(nx, 0, nz, nx, 0, nz);
  }
  for (let i = 0; i < n; i++) {
    const a = i * 2;
    const b = i * 2 + 1;
    const c = ((i + 1) % n) * 2;
    const d = ((i + 1) % n) * 2 + 1;
    indices.push(a, c, b, b, c, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
  g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
  g.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), 3));
  g.setIndex(indices);
  return g;
}

function addTireStacks(scene, frames, curvature, offset) {
  const tireMat = new THREE.MeshStandardMaterial({
    color: 0x101010, roughness: 0.95, metalness: 0,
  });
  const tireGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.32, 14);
  // Lay the cylinder on its side (axis along left/right of the stack) by
  // rotating the geometry once up front.
  tireGeo.rotateX(Math.PI / 2);

  const placements = [];
  let arc = 0;
  let lastPlacedArc = -50; // allow first eligible spot
  for (let i = 0; i < frames.length; i++) {
    if (i > 0) arc += frames[i].pos.distanceTo(frames[i - 1].pos);
    if (curvature[i] < 0.0055) continue;
    if (arc - lastPlacedArc < 30) continue;
    const t1 = frames[(i - 1 + frames.length) % frames.length].tan;
    const t2 = frames[(i + 1) % frames.length].tan;
    const crossY = t1.x * t2.z - t1.z * t2.x;
    // Outside of the corner: opposite direction to where the curve turns.
    const sign = crossY > 0 ? -1 : +1;
    placements.push({ frameIdx: i, sign });
    lastPlacedArc = arc;
  }

  const stackLength = 6; // tires along the track direction
  const stackHeight = 3; // tires stacked vertically
  const tireSpacing = 0.86;
  const totalTires = placements.length * stackLength * stackHeight;
  if (totalTires === 0) return;

  const inst = new THREE.InstancedMesh(tireGeo, tireMat, totalTires);
  inst.castShadow = true;
  inst.receiveShadow = true;
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const sc = new THREE.Vector3(1, 1, 1);
  const up = new THREE.Vector3(0, 1, 0);
  let p = 0;
  for (const place of placements) {
    const f = frames[place.frameIdx];
    const yaw = Math.atan2(f.tan.x, f.tan.z);
    q.setFromAxisAngle(up, yaw);
    const base = f.pos.clone().add(f.left.clone().multiplyScalar(place.sign * offset));
    for (let s = 0; s < stackLength; s++) {
      // Step along the tangent so the stack lines the corner exit.
      const along = (s - (stackLength - 1) / 2) * tireSpacing;
      const center = base.clone().add(f.tan.clone().multiplyScalar(along));
      for (let h = 0; h < stackHeight; h++) {
        const pos = new THREE.Vector3(center.x, 0.21 + h * 0.34, center.z);
        m.compose(pos, q, sc);
        inst.setMatrixAt(p++, m);
      }
    }
  }
  inst.count = p;
  inst.instanceMatrix.needsUpdate = true;
  scene.add(inst);
}

function addSponsorBoards(scene, frames, offset) {
  const logos = makeSponsorTextures();
  const faceMats = logos.map((map) => new THREE.MeshStandardMaterial({
    map, roughness: 0.5, metalness: 0.1,
  }));
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x1b1d22, roughness: 0.6, metalness: 0.4,
  });
  const boardGeo = new THREE.BoxGeometry(8, 1.2, 0.16);
  const frameGeo = new THREE.BoxGeometry(8.3, 1.5, 0.1);
  const N = 22;
  const step = Math.floor(frames.length / N);
  for (let i = 0; i < frames.length; i += step) {
    if (Math.random() < 0.35) continue;
    const f = frames[i];
    const sign = Math.random() < 0.5 ? +1 : -1;
    const pos = f.pos.clone().add(f.left.clone().multiplyScalar(sign * offset));
    const yaw = Math.atan2(f.tan.x, f.tan.z);
    const mat = faceMats[Math.floor(Math.random() * faceMats.length)];
    const board = new THREE.Mesh(boardGeo, mat);
    board.position.set(pos.x, 1.55, pos.z);
    board.rotation.y = yaw;
    board.castShadow = true;
    board.receiveShadow = true;
    scene.add(board);
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.set(pos.x, 1.55, pos.z);
    frame.rotation.y = yaw;
    frame.translateZ(-0.05);
    scene.add(frame);
    // Small stand legs
    const legMat = new THREE.MeshStandardMaterial({
      color: 0x444444, roughness: 0.7, metalness: 0.4,
    });
    for (const sx of [-3, 3]) {
      const leg = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 1.55, 0.12),
        legMat
      );
      const sideOffset = new THREE.Vector3(
        f.tan.x * sx, 0, f.tan.z * sx
      );
      leg.position.set(pos.x + sideOffset.x, 0.75, pos.z + sideOffset.z);
      leg.rotation.y = Math.atan2(f.tan.x, f.tan.z);
      scene.add(leg);
    }
  }
}

// ---------- Barrier physics ----------

function buildBarrierPhysics(world, frames, offset, materials) {
  const bodyMat = materials.barrierMat;
  // Stride 2 (≈5 m apart) with 5 m-long boxes → continuous wall, no gaps
  // for the car to squeeze through onto the grass beyond.
  for (let i = 0; i < frames.length; i += 2) {
    const f = frames[i];
    const yaw = Math.atan2(f.tan.x, f.tan.z);
    for (const sign of [+1, -1]) {
      const p = f.pos.clone().add(f.left.clone().multiplyScalar(offset * sign));
      const body = new CANNON.Body({ mass: 0, material: bodyMat });
      body.addShape(new CANNON.Box(new CANNON.Vec3(2.7, 0.6, 0.25)));
      body.position.set(p.x, 0.6, p.z);
      const q = new CANNON.Quaternion();
      q.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), yaw);
      body.quaternion.copy(q);
      world.addBody(body);
    }
  }
}
