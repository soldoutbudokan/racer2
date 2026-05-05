import * as THREE from 'three';
import * as CANNON from 'cannon-es';

const ROAD_WIDTH = 14;
const KERB_WIDTH = 1.4;
const TRACK_SEGMENTS = 600;

/**
 * A closed-loop GT-style circuit. Returns a Catmull-Rom centreline that the
 * camera/AI can sample, plus all visual + physics meshes added to the world.
 */
export function createTrack(scene, world, materials) {
  // Hand-tuned control points for an interesting circuit:
  // long straight + sweeping right + chicane + hairpin + back straight + arc.
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

  // Sample the curve into a frame list (position + tangent + normal)
  const frames = sampleCurve(curve, TRACK_SEGMENTS);

  // ---- Ground (huge grass plane) ----
  const grassMat = makeGrassMaterial();
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(4000, 4000, 1, 1),
    grassMat
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.02;
  ground.receiveShadow = true;
  scene.add(ground);

  // Physics: ground as a thin huge box (SAP broadphase handles AABBs better than infinite planes)
  const groundBody = new CANNON.Body({
    mass: 0,
    material: materials.groundMat,
  });
  groundBody.addShape(new CANNON.Box(new CANNON.Vec3(2000, 0.5, 2000)));
  groundBody.position.set(0, -0.5, 0); // top surface at y = 0
  world.addBody(groundBody);

  // ---- Asphalt ribbon ----
  const asphaltMat = makeAsphaltMaterial();
  const roadGeo = buildRibbonGeometry(frames, ROAD_WIDTH, true);
  const road = new THREE.Mesh(roadGeo, asphaltMat);
  road.position.y = 0.01;
  road.receiveShadow = true;
  scene.add(road);

  // White edge lines
  const lineMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.7,
    metalness: 0,
    emissive: 0x111111,
  });
  const lineLeft = new THREE.Mesh(
    buildEdgeLineGeometry(frames, ROAD_WIDTH / 2 - 0.25, 0.18),
    lineMat
  );
  lineLeft.position.y = 0.012;
  scene.add(lineLeft);
  const lineRight = new THREE.Mesh(
    buildEdgeLineGeometry(frames, -ROAD_WIDTH / 2 + 0.25, 0.18),
    lineMat
  );
  lineRight.position.y = 0.012;
  scene.add(lineRight);

  // Red/white kerbs at corners (where curvature is high)
  const kerbMat = makeKerbMaterial();
  const kerbL = new THREE.Mesh(
    buildKerbGeometry(frames, ROAD_WIDTH / 2, KERB_WIDTH, +1),
    kerbMat
  );
  kerbL.position.y = 0.06;
  kerbL.receiveShadow = true;
  scene.add(kerbL);
  const kerbR = new THREE.Mesh(
    buildKerbGeometry(frames, -ROAD_WIDTH / 2, KERB_WIDTH, -1),
    kerbMat
  );
  kerbR.position.y = 0.06;
  kerbR.receiveShadow = true;
  scene.add(kerbR);

  // Start/finish line
  const sfGeo = new THREE.PlaneGeometry(ROAD_WIDTH, 1.4);
  const sfTex = makeStartFinishTexture();
  const sfMat = new THREE.MeshStandardMaterial({ map: sfTex, roughness: 0.7 });
  const sf = new THREE.Mesh(sfGeo, sfMat);
  sf.rotation.x = -Math.PI / 2;
  sf.position.copy(frames[0].pos).add(new THREE.Vector3(0, 0.013, 0));
  // Align with track tangent
  const yawSF = Math.atan2(frames[0].tan.x, frames[0].tan.z);
  sf.rotation.z = -yawSF;
  scene.add(sf);

  // ---- Side scenery: trees scattered, distant mountains, grandstands ----
  scatterTrees(scene, frames);
  addDistantMountains(scene);
  addGrandstands(scene, frames);

  // ---- Physics walls (low collision boxes lining the road) ----
  // Built as small static boxes outside the kerb on each side.
  buildBarrierPhysics(world, frames, ROAD_WIDTH / 2 + KERB_WIDTH + 0.4, materials);

  // Spawn pose (slightly behind start line, facing tangent)
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

// ---------- Geometry builders ----------

function sampleCurve(curve, segments) {
  const frames = [];
  for (let i = 0; i < segments; i++) {
    const t = i / segments;
    const pos = curve.getPointAt(t);
    const tan = curve.getTangentAt(t).normalize();
    // Side normal in horizontal plane (perpendicular to tangent, points to "left")
    const left = new THREE.Vector3(-tan.z, 0, tan.x).normalize();
    frames.push({ t, pos, tan, left });
  }
  return frames;
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
    const v = lengths[i] / 4; // tile every 4 units
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
  // Same as ribbon but a thin strip at given offset
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

function buildKerbGeometry(frames, offsetIn, width, sideSign) {
  // Only build kerb where curvature is significant
  const n = frames.length;
  const positions = [];
  const uvs = [];
  const normals = [];
  const indices = [];
  // pre-compute curvature via tangent change
  const curvature = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    const t1 = frames[i].tan;
    const t2 = frames[(i + 1) % n].tan;
    curvature[i] = 1.0 - t1.dot(t2);
  }
  // smooth curvature
  const smooth = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let s = 0;
    for (let k = -3; k <= 3; k++) s += curvature[(i + k + n) % n];
    smooth[i] = s / 7;
  }
  let vIndex = 0;
  let lastValid = false;
  let lastIndex = -1;
  for (let i = 0; i <= n; i++) {
    const idx = i % n;
    const f = frames[idx];
    const active = smooth[idx] > 0.0035; // threshold
    if (active) {
      const inner = f.pos.clone().add(f.left.clone().multiplyScalar(offsetIn));
      const outer = f.pos.clone().add(f.left.clone().multiplyScalar(offsetIn + sideSign * width));
      positions.push(inner.x, inner.y, inner.z, outer.x, outer.y, outer.z);
      uvs.push(0, i * 0.5, 1, i * 0.5);
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
    const n = fractalNoise(x * 7, y * 7, 4) * 0.4 + 0.5;
    const dark = 0.18 + n * 0.12;
    return [dark, dark, dark + 0.005];
  });
  colorTex.wrapS = colorTex.wrapT = THREE.RepeatWrapping;
  colorTex.repeat.set(1, 30);
  colorTex.anisotropy = 8;
  colorTex.colorSpace = THREE.SRGBColorSpace;

  const normalTex = makeNormalTexture(512, 1.0);
  normalTex.wrapS = normalTex.wrapT = THREE.RepeatWrapping;
  normalTex.repeat.set(1, 30);

  const roughTex = makeNoiseTexture(512, (x, y) => {
    const n = fractalNoise(x * 5 + 3, y * 5 + 7, 4) * 0.4 + 0.6;
    return [n, n, n];
  });
  roughTex.wrapS = roughTex.wrapT = THREE.RepeatWrapping;
  roughTex.repeat.set(1, 30);

  return new THREE.MeshStandardMaterial({
    map: colorTex,
    normalMap: normalTex,
    normalScale: new THREE.Vector2(0.7, 0.7),
    roughnessMap: roughTex,
    roughness: 0.85,
    metalness: 0.0,
    envMapIntensity: 0.6,
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

function makeKerbMaterial() {
  const c = document.createElement('canvas');
  c.width = 32; c.height = 32;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#cc1f1f'; ctx.fillRect(0, 0, 32, 32);
  ctx.fillStyle = '#f4f4f4'; ctx.fillRect(0, 16, 32, 16);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 60);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.magFilter = THREE.NearestFilter;
  return new THREE.MeshStandardMaterial({
    map: tex,
    roughness: 0.6,
    metalness: 0.0,
  });
}

function makeStartFinishTexture() {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 32;
  const ctx = c.getContext('2d');
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 2; y++) {
      ctx.fillStyle = (x + y) % 2 === 0 ? '#ffffff' : '#000000';
      ctx.fillRect(x * 32, y * 16, 32, 16);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
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
  const leavesMat = new THREE.MeshStandardMaterial({
    color: 0x2e6b2a, roughness: 0.9, metalness: 0,
  });

  // Build a low-poly conifer once, instance it many times
  const trunkGeo = new THREE.CylinderGeometry(0.25, 0.4, 2.4, 6);
  trunkGeo.translate(0, 1.2, 0);
  const leavesGeo = new THREE.ConeGeometry(2.0, 6.0, 8);
  leavesGeo.translate(0, 5.0, 0);

  const N = 600;
  const trunkInst = new THREE.InstancedMesh(trunkGeo, trunkMat, N);
  const leavesInst = new THREE.InstancedMesh(leavesGeo, leavesMat, N);
  trunkInst.castShadow = trunkInst.receiveShadow = true;
  leavesInst.castShadow = leavesInst.receiveShadow = true;
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const s = new THREE.Vector3();
  let placed = 0;
  for (let i = 0; i < N * 4 && placed < N; i++) {
    const x = (Math.random() * 2 - 1) * 800;
    const z = (Math.random() * 2 - 1) * 800;
    const p = new THREE.Vector3(x, 0, z);
    // reject if near road
    let minD = Infinity;
    for (let k = 0; k < frames.length; k += 6) {
      const d = p.distanceToSquared(frames[k].pos);
      if (d < minD) minD = d;
    }
    if (minD < 30 * 30) continue;
    const sc = 0.7 + Math.random() * 1.0;
    s.set(sc, 0.8 + Math.random() * 0.6, sc);
    q.setFromEuler(new THREE.Euler(0, Math.random() * Math.PI * 2, 0));
    m.compose(p, q, s);
    trunkInst.setMatrixAt(placed, m);
    leavesInst.setMatrixAt(placed, m);
    placed++;
  }
  trunkInst.count = placed;
  leavesInst.count = placed;
  trunkInst.instanceMatrix.needsUpdate = true;
  leavesInst.instanceMatrix.needsUpdate = true;
  scene.add(trunkInst);
  scene.add(leavesInst);
}

function addDistantMountains(scene) {
  const mat = new THREE.MeshStandardMaterial({
    color: 0x6c7a86,
    roughness: 1.0,
    metalness: 0,
    flatShading: true,
  });
  for (let i = 0; i < 28; i++) {
    const r = 1100 + Math.random() * 300;
    const a = (i / 28) * Math.PI * 2;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const h = 80 + Math.random() * 140;
    const w = 180 + Math.random() * 180;
    const geo = new THREE.ConeGeometry(w, h, 5 + Math.floor(Math.random() * 3));
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, h / 2 - 6, z);
    m.rotation.y = Math.random() * Math.PI;
    scene.add(m);
  }
}

function addGrandstands(scene, frames) {
  const standMat = new THREE.MeshStandardMaterial({
    color: 0xd9d9d9, roughness: 0.85, metalness: 0,
  });
  const seatMat = new THREE.MeshStandardMaterial({
    color: 0x1a4f8a, roughness: 0.7, metalness: 0,
  });
  // place a few near the start
  const places = [0, 8, 16];
  for (const idxOff of places) {
    const f = frames[idxOff];
    const base = f.pos.clone().add(f.left.clone().multiplyScalar(-(ROAD_WIDTH / 2 + 10)));
    const yaw = Math.atan2(f.tan.x, f.tan.z);
    const g = new THREE.Group();
    const struct = new THREE.Mesh(
      new THREE.BoxGeometry(20, 6, 6),
      standMat
    );
    struct.position.y = 3;
    struct.castShadow = struct.receiveShadow = true;
    g.add(struct);
    for (let s = 0; s < 4; s++) {
      const seat = new THREE.Mesh(
        new THREE.BoxGeometry(19, 0.4, 1.0),
        seatMat
      );
      seat.position.set(0, 1 + s * 1.2, 2.4 - s * 1.2);
      g.add(seat);
    }
    g.position.copy(base);
    g.rotation.y = yaw;
    scene.add(g);
  }
}

// ---------- Barrier physics ----------

function buildBarrierPhysics(world, frames, offset, materials) {
  const bodyMat = materials.barrierMat;
  // Place small static boxes every few frames on each side
  for (let i = 0; i < frames.length; i += 3) {
    const f = frames[i];
    const yaw = Math.atan2(f.tan.x, f.tan.z);
    for (const sign of [+1, -1]) {
      const p = f.pos.clone().add(f.left.clone().multiplyScalar(offset * sign));
      const body = new CANNON.Body({ mass: 0, material: bodyMat });
      body.addShape(new CANNON.Box(new CANNON.Vec3(2.5, 0.6, 0.3)));
      body.position.set(p.x, 0.6, p.z);
      const q = new CANNON.Quaternion();
      q.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), yaw);
      body.quaternion.copy(q);
      world.addBody(body);
    }
  }
}
