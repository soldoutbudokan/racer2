import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const TRACK_SEGMENTS = 600;
const ROAD_WIDTH_DEFAULT = 14;
const KERB_WIDTH_DEFAULT = 2.0;
const RUNOFF_WIDTH_DEFAULT = 5.5;

/**
 * Build one circuit from a track definition (see tracks.js): a Catmull-Rom
 * centreline the camera/AI sample, plus every visual + physics object the
 * theme calls for. All visuals are parented to a single Group and all physics
 * bodies are tracked, so dispose() can tear the whole circuit down when the
 * player switches tracks. Per-track dimensions and a `theme` flag-set drive
 * which scenery/material variant each piece uses.
 */
export function createTrack(scene, world, materials, def) {
  const ROAD_WIDTH = def.roadWidth ?? ROAD_WIDTH_DEFAULT;
  const KERB_WIDTH = def.kerbWidth ?? KERB_WIDTH_DEFAULT;
  const RUNOFF_WIDTH = def.runoffWidth ?? RUNOFF_WIDTH_DEFAULT;
  const ARMCO_OFFSET = ROAD_WIDTH / 2 + RUNOFF_WIDTH + 0.5;
  const theme = def.theme || {};
  // Bundle the dimensions so the scenery builders can size themselves to this
  // particular circuit (street circuits are narrow with the wall at the kerb,
  // the easy oval is wide with acres of run-off, etc.).
  const D = { road: ROAD_WIDTH, kerb: KERB_WIDTH, runoff: RUNOFF_WIDTH, armco: ARMCO_OFFSET };

  // Every visual object hangs off this one group, and every physics body is
  // recorded in `bodies`, so dispose() can remove the whole circuit cleanly
  // when the player picks another track.
  const group = new THREE.Group();
  scene.add(group);
  const bodies = [];

  const cps = def.controlPoints.map(([x, z]) => new THREE.Vector3(x, 0, z));
  const curve = new THREE.CatmullRomCurve3(
    cps, def.closed !== false, 'catmullrom', def.tension ?? 0.5);
  const frames = sampleCurve(curve, TRACK_SEGMENTS);
  const arcLens = computeArcLengths(frames);
  const curvature = computeCurvature(frames);
  // Frame indices where the run-off is a gravel trap (heavy-braking corners).
  const gravelFrames = new Set();

  // ---- Ground ----
  const groundMat = makeGroundMaterial(theme.ground || 'grass');
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(4000, 4000, 1, 1),
    groundMat
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.02;
  ground.receiveShadow = true;
  group.add(ground);

  const groundBody = new CANNON.Body({
    mass: 0,
    material: materials.groundMat,
  });
  groundBody.addShape(new CANNON.Box(new CANNON.Vec3(2000, 0.5, 2000)));
  groundBody.position.set(0, -0.5, 0);
  world.addBody(groundBody);
  bodies.push(groundBody);

  // ---- Racing-line lateral offset (out-in-out through corners) ----
  // Used to weave the rubbered groove across the road like real tracks.
  const lineOffset = computeRacingLineOffset(frames, curvature);

  // ---- Asphalt ribbon with a baked racing groove (vertex colours) ----
  const asphaltMat = makeAsphaltMaterial();
  const roadGeo = buildRoadGeometry(frames, ROAD_WIDTH, lineOffset, arcLens);
  const road = new THREE.Mesh(roadGeo, asphaltMat);
  road.position.y = 0.01;
  road.receiveShadow = true;
  group.add(road);

  // Skid marks at the heavy corners, following the groove.
  if (theme.skid !== false) addSkidMarks(group, frames, curvature, lineOffset, arcLens);

  // White edge lines flush with the actual road edge
  const lineMat = new THREE.MeshStandardMaterial({
    color: 0xdcdcd6,
    roughness: 0.7,
    metalness: 0,
    polygonOffset: true,
    polygonOffsetFactor: -3,
    polygonOffsetUnits: -3,
  });
  const lineWidth = 0.2;
  const lineEdgeOffset = ROAD_WIDTH / 2 - lineWidth / 2 - 0.05;
  const lineLeft = new THREE.Mesh(
    buildEdgeLineGeometry(frames, lineEdgeOffset, lineWidth),
    lineMat
  );
  lineLeft.position.y = 0.016;
  group.add(lineLeft);
  const lineRight = new THREE.Mesh(
    buildEdgeLineGeometry(frames, -lineEdgeOffset, lineWidth),
    lineMat
  );
  lineRight.position.y = 0.016;
  group.add(lineRight);

  // ---- Profiled 3D kerbs with rumble ripples at every corner ----
  if (theme.kerbs !== false) {
    const kerbMat = makeKerbMaterial();
    // Threshold ≈ corners tighter than ~150 m radius, padded a few frames out.
    const kerbActive = computeKerbActive(curvature, 0.00045, 8);
    for (const side of [+1, -1]) {
      const kerb = new THREE.Mesh(
        buildKerb3DGeometry(frames, side * ROAD_WIDTH / 2, KERB_WIDTH, side, kerbActive, arcLens),
        kerbMat
      );
      kerb.receiveShadow = true;
      kerb.castShadow = false;
      group.add(kerb);
    }
  }

  // ---- Dirt verge just outside the kerb line (natural-surface circuits) ----
  if ((theme.ground || 'grass') !== 'city') {
    const vergeMat = makeVergeMaterial(theme.ground || 'grass');
    const vergeCenter = ROAD_WIDTH / 2 + KERB_WIDTH + 0.7;
    for (const side of [+1, -1]) {
      const verge = new THREE.Mesh(
        buildEdgeLineGeometry(frames, side * vergeCenter, 1.6),
        vergeMat
      );
      verge.position.y = 0.004;
      verge.receiveShadow = true;
      group.add(verge);
    }
  }

  // ---- Gravel traps on the outside of the heavy-braking corners ----
  if (theme.gravel) addGravelTraps(group, frames, curvature, gravelFrames, D);

  // Start/finish line
  const sfTex = makeStartFinishTexture();
  const sfMat = new THREE.MeshStandardMaterial({
    map: sfTex, roughness: 0.6,
    polygonOffset: true, polygonOffsetFactor: -3, polygonOffsetUnits: -3,
  });
  const sf = new THREE.Mesh(new THREE.PlaneGeometry(ROAD_WIDTH, 1.6), sfMat);
  sf.rotation.x = -Math.PI / 2;
  sf.position.copy(frames[0].pos).add(new THREE.Vector3(0, 0.014, 0));
  const yawSF = Math.atan2(frames[0].tan.x, frames[0].tan.z);
  sf.rotation.z = -yawSF;
  group.add(sf);

  // Painted starting grid behind the line
  addStartingGrid(group, frames[0]);

  // Start/finish gantry
  addStartGantry(group, frames[0], ROAD_WIDTH);

  // ---- Outer barrier (visual) — style varies by circuit ----
  if (theme.barrier === 'wall') addConcreteWall(group, frames, ARMCO_OFFSET);
  else addArmco(group, frames, ARMCO_OFFSET); // armco / guardrail share the rail

  // Tire stacks at high-curvature corner exits
  if (theme.tireStacks) addTireStacks(group, frames, curvature, ARMCO_OFFSET - 1.4);

  // Sponsor boards behind the barrier
  if (theme.sponsors) addSponsorBoards(group, frames, ARMCO_OFFSET + 1.6);

  // Pit complex + debris fencing along the main straight
  if (theme.pit) addPitComplex(group, frames[0], D);
  if (theme.catchFence) addCatchFence(group, frames, D);

  // Brake-distance marker boards before the heavy corners
  if (theme.brakeMarkers) addBrakeMarkers(group, frames, curvature, D);

  // ---- Scenery (theme-selected) ----
  if (theme.trees) scatterTrees(group, frames, theme.trees);
  if (theme.buildings) addCityBuildings(group, frames, D);
  if (theme.mountains) addDistantMountains(group, theme.mountains);
  if (theme.grandstands) addGrandstands(group, frames, D);
  if (theme.rocks) addRocks(group, frames, D);
  if (theme.clouds !== false) addClouds(group);

  // Physics walls along the barrier line
  buildBarrierPhysics(world, frames, ARMCO_OFFSET, materials, bodies);

  // ---- Atmosphere: per-circuit fog tint/depth ----
  if (theme.fog) scene.fog = new THREE.Fog(theme.fog[0], theme.fog[1], theme.fog[2]);

  const spawn = {
    position: new THREE.Vector3()
      .copy(frames[0].pos)
      .add(frames[0].tan.clone().multiplyScalar(-6))
      .add(new THREE.Vector3(0, 1.0, 0)),
    yaw: Math.atan2(frames[0].tan.x, frames[0].tan.z),
  };

  function dispose() {
    scene.remove(group);
    disposeObject3D(group);
    for (const b of bodies) world.removeBody(b);
  }

  return {
    id: def.id,
    name: def.name,
    curve,
    frames,
    spawn,
    width: ROAD_WIDTH,
    kerbWidth: KERB_WIDTH,
    armcoOffset: ARMCO_OFFSET,
    // Lateral offset (m, +left) of the baked racing groove per frame — the
    // "perfect line" driving aid follows the same path the visuals rubber in.
    racingLineOffset: lineOffset,
    // Gravel traps will register frame ranges here (filled by scenery pass).
    isGravel: (frameIdx) => gravelFrames.has(frameIdx),
    length: curve.getLength(),
    dispose,
  };
}

// Tear down a track group: dispose every geometry, material and texture it
// owns so switching circuits doesn't leak GPU memory.
function disposeObject3D(root) {
  root.traverse((o) => {
    if (o.geometry) o.geometry.dispose();
    const mats = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : [];
    for (const m of mats) {
      for (const key in m) {
        const val = m[key];
        if (val && val.isTexture) val.dispose();
      }
      m.dispose();
    }
  });
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

// Racing-line lateral offset per frame: drifts toward the inside of corners
// and back to centre on straights. Smoothed so the groove sweeps naturally.
function computeRacingLineOffset(frames, curvature) {
  const n = frames.length;
  const raw = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t1 = frames[i].tan;
    const t2 = frames[(i + 1) % n].tan;
    const crossY = t1.x * t2.z - t1.z * t2.x; // >0 → turning right (toward -left)
    const mag = Math.min(3.2, curvature[i] * 900);
    raw[i] = (crossY > 0 ? -1 : 1) * mag * (curvature[i] > 0.0008 ? 1 : 0);
  }
  // heavy smoothing (≈60 m window) → flowing line
  let out = raw;
  for (let pass = 0; pass < 3; pass++) {
    const next = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      let s = 0;
      for (let k = -6; k <= 6; k++) s += out[(i + k + n) % n];
      next[i] = s / 13;
    }
    out = next;
  }
  return out;
}

// Road ribbon with several lateral vertices so the rubbered racing groove and
// edge dust can be baked into vertex colours (no texture tiling artefacts,
// and the groove follows the racing line through corners).
function buildRoadGeometry(frames, width, lineOffset, arcLens) {
  const n = frames.length;
  const ACROSS = 11;             // vertices across the road
  const positions = new Float32Array(n * ACROSS * 3);
  const uvs = new Float32Array(n * ACROSS * 2);
  const normals = new Float32Array(n * ACROSS * 3);
  const colors = new Float32Array(n * ACROSS * 3);

  for (let i = 0; i < n; i++) {
    const f = frames[i];
    const arc = arcLens[i];
    const grooveCenter = lineOffset[i];
    // slow mottling of the whole surface so long straights aren't uniform
    const patch = 0.93 + 0.10 * fractalNoise(arc * 0.013, 0.37, 3);
    for (let k = 0; k < ACROSS; k++) {
      const tAcross = k / (ACROSS - 1);          // 0..1 left→right
      const lat = (0.5 - tAcross) * width;       // +half..-half (left positive)
      const p = f.pos.clone().add(f.left.clone().multiplyScalar(lat));
      const vi = i * ACROSS + k;
      positions.set([p.x, p.y, p.z], vi * 3);
      uvs.set([tAcross, arc / 4], vi * 2);
      normals.set([0, 1, 0], vi * 3);

      // Rubbered groove: two tyre bands astride the racing line.
      const d = Math.abs(lat - grooveCenter);
      const band = Math.exp(-((d - 0.85) ** 2) / (2 * 0.55 * 0.55))
                 + Math.exp(-((d + 0.85) ** 2) / (2 * 0.55 * 0.55));
      const grooveDark = 1 - 0.24 * Math.min(1, band) - 0.08 * Math.exp(-d * d / 4);
      // dusty marbles just inside the white lines
      const edge = Math.max(0, (Math.abs(lat) / (width / 2)) - 0.82) / 0.18;
      const dust = 1 + edge * 0.10;
      const shade = patch * grooveDark * dust;
      colors.set([shade, shade, shade * 1.003], vi * 3);
    }
  }

  const indices = [];
  for (let i = 0; i < n; i++) {
    const a = i * ACROSS;
    const b = ((i + 1) % n) * ACROSS;
    for (let k = 0; k < ACROSS - 1; k++) {
      indices.push(a + k, b + k, a + k + 1);
      indices.push(a + k + 1, b + k, b + k + 1);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  g.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  g.setIndex(indices);
  return g;
}

// Profiled kerb: rises from the road edge to a peak then drops to the verge,
// with a sinusoidal rumble along its length. Three lateral vertices per
// cross-section; smooth normals come from computeVertexNormals.
function buildKerb3DGeometry(frames, offsetIn, width, sideSign, active, arcLens) {
  const n = frames.length;
  const positions = [];
  const uvs = [];
  const indices = [];
  const closingArc = arcLens[n - 1] + frames[0].pos.distanceTo(frames[n - 1].pos);
  const P = 3; // verts per cross-section
  let lastIndex = -1;
  let lastValid = false;
  for (let i = 0; i <= n; i++) {
    const idx = i % n;
    const f = frames[idx];
    if (active[idx]) {
      const arc = i === n ? closingArc : arcLens[idx];
      const ripple = 0.5 + 0.5 * Math.sin(arc * Math.PI * 2 / 1.0);
      const hPeak = 0.05 + 0.024 * ripple;
      const hOuter = 0.014 + 0.010 * ripple;
      const mk = (latOff, h) => {
        const p = f.pos.clone().add(f.left.clone().multiplyScalar(offsetIn + sideSign * latOff));
        positions.push(p.x, h, p.z);
      };
      mk(0.0, 0.012);   // flush with the road surface (road sits at +0.01)
      mk(width * 0.38, hPeak);
      mk(width, hOuter);
      uvs.push(0, arc, 0.45, arc, 1, arc);
      if (lastValid) {
        const a = lastIndex;
        const c = positions.length / 3 - P;
        for (let k = 0; k < P - 1; k++) {
          // winding flips with the side so faces point up on both edges
          if (sideSign > 0) {
            indices.push(a + k, c + k, a + k + 1, a + k + 1, c + k, c + k + 1);
          } else {
            indices.push(a + k, a + k + 1, c + k, a + k + 1, c + k + 1, c + k);
          }
        }
      }
      lastIndex = positions.length / 3 - P;
      lastValid = true;
    } else {
      lastValid = false;
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
  g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
  g.setIndex(indices);
  g.computeVertexNormals();
  return g;
}

// Dark tyre streaks through the quick corners, astride the racing groove.
function addSkidMarks(scene, frames, curvature, lineOffset, arcLens) {
  const n = frames.length;
  const mat = new THREE.MeshBasicMaterial({
    color: 0x16161a,
    transparent: true,
    opacity: 0.30,
    depthWrite: false,
    polygonOffset: true,
    polygonOffsetFactor: -3,
    polygonOffsetUnits: -3,
  });
  // find corner clusters
  const marks = [];
  let i = 0;
  while (i < n) {
    if (curvature[i] > 0.004) {
      let j = i;
      while (j < n && curvature[j] > 0.0016) j++;
      marks.push([Math.max(0, i - 10), Math.min(n - 1, j + 4)]);
      i = j + 12;
    } else i++;
  }
  const positions = [];
  const indices = [];
  let vBase = 0;
  for (const [i0, i1] of marks) {
    for (const tyre of [-0.85, 0.85]) {
      const jitter = (Math.random() - 0.5) * 0.3;
      for (let k = i0; k <= i1; k++) {
        const f = frames[k];
        const lat = lineOffset[k] + tyre + jitter;
        const halfW = 0.16;
        const a = f.pos.clone().add(f.left.clone().multiplyScalar(lat + halfW));
        const b = f.pos.clone().add(f.left.clone().multiplyScalar(lat - halfW));
        positions.push(a.x, 0.018, a.z, b.x, 0.018, b.z);
        if (k > i0) {
          const v = vBase + (k - i0) * 2;
          indices.push(v - 2, v, v - 1, v - 1, v, v + 1);
        }
      }
      vBase = positions.length / 3;
    }
  }
  if (!positions.length) return;
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
  g.setIndex(indices);
  g.computeVertexNormals();
  const mesh = new THREE.Mesh(g, mat);
  mesh.renderOrder = 2;
  scene.add(mesh);
}

// Sandy gravel traps on the outside of the heaviest corners. Registers the
// affected frame indices so the physics treats that run-off as gravel.
function addGravelTraps(scene, frames, curvature, gravelFrames, D) {
  const n = frames.length;
  // strongest corner clusters
  const zones = [];
  let i = 0;
  while (i < n) {
    if (curvature[i] > 0.0045) {
      let j = i;
      let peak = 0;
      while (j < n && curvature[j] > 0.002) {
        if (curvature[j] > peak) peak = curvature[j];
        j++;
      }
      if (j - i > 6) zones.push({ i0: Math.max(0, i - 14), i1: Math.min(n - 1, j + 8), peak });
      i = j + 10;
    } else i++;
  }
  zones.sort((a, b) => b.peak - a.peak);
  const picked = zones.slice(0, 4);

  const mat = makeGravelMaterial();
  for (const z of picked) {
    // outside of the corner = opposite to the turn direction
    const mid = Math.floor((z.i0 + z.i1) / 2);
    const t1 = frames[mid].tan;
    const t2 = frames[(mid + 1) % n].tan;
    const crossY = t1.x * t2.z - t1.z * t2.x;
    const sign = crossY > 0 ? +1 : -1;   // turning right → trap on the left side

    const inner = D.road / 2 + D.kerb + 0.3;
    const outer = D.armco - 0.6;
    const positions = [];
    const uvs = [];
    const indices = [];
    let vi = 0;
    for (let k = z.i0; k <= z.i1; k++) {
      const f = frames[k % n];
      gravelFrames.add(k % n);
      const a = f.pos.clone().add(f.left.clone().multiplyScalar(sign * inner));
      const b = f.pos.clone().add(f.left.clone().multiplyScalar(sign * outer));
      positions.push(a.x, 0.006, a.z, b.x, 0.006, b.z);
      uvs.push(0, k * 0.5, 3, k * 0.5);
      if (k > z.i0) {
        indices.push(vi - 2, vi, vi - 1, vi - 1, vi, vi + 1);
      }
      vi += 2;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
    g.setIndex(indices);
    g.computeVertexNormals();
    const mesh = new THREE.Mesh(g, mat);
    mesh.receiveShadow = true;
    scene.add(mesh);
  }
}

// ---------- Materials ----------

function makeAsphaltMaterial() {
  // Fine aggregate grain; the groove/patches/dust live in vertex colours.
  // Real asphalt is a blue-gray slate tone with scattered bright/dark chips.
  const colorTex = makeNoiseTexture(1024, (x, y) => {
    const grain = fractalNoise(x * 28, y * 28, 5);
    const speck = fractalNoise(x * 95 + 11, y * 95 + 5, 2);
    const patch = fractalNoise(x * 7 + 4, y * 7 + 9, 3);
    let v = 0.116 + grain * 0.076 + patch * 0.024;
    if (speck > 0.70) v += 0.075;   // more, brighter limestone chips catch light
    if (speck < 0.16) v -= 0.035;   // dark bitumen voids
    // slight blue-gray tint — asphalt stone aggregate is slate
    const r = v * 0.96;
    const g = v * 0.98;
    const b = v * 1.04;
    return [r, g, b];
  });
  colorTex.wrapS = colorTex.wrapT = THREE.RepeatWrapping;
  colorTex.repeat.set(3, 1);
  colorTex.anisotropy = 16;
  colorTex.colorSpace = THREE.SRGBColorSpace;

  const normalTex = makeNormalTexture(512, 2.4);
  normalTex.wrapS = normalTex.wrapT = THREE.RepeatWrapping;
  normalTex.repeat.set(3, 1);

  const roughTex = makeNoiseTexture(512, (x, y) => {
    const n = fractalNoise(x * 6 + 3, y * 6 + 7, 4) * 0.26 + 0.70;
    const worn = fractalNoise(x * 2 + 8, y * 2 + 2, 3) * 0.08;
    return [n - worn, n - worn, n - worn];
  });
  roughTex.wrapS = roughTex.wrapT = THREE.RepeatWrapping;
  roughTex.repeat.set(3, 1);

  return new THREE.MeshStandardMaterial({
    map: colorTex,
    vertexColors: true,
    normalMap: normalTex,
    normalScale: new THREE.Vector2(0.65, 0.65),
    roughnessMap: roughTex,
    roughness: 0.86,
    metalness: 0.0,
    envMapIntensity: 0.55,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
}

function makeGrassMaterial() {
  // Multi-scale grass: micro blade noise, macro patchiness, dry/wet variation,
  // subtle mowing bands. Richer saturation for a well-maintained circuit.
  const tex = makeNoiseTexture(1024, (x, y) => {
    const blades = fractalNoise(x * 65, y * 65, 5);
    const patch = fractalNoise(x * 5 + 9, y * 5 + 3, 4);
    const dry = fractalNoise(x * 11 + 31, y * 11 + 17, 3);
    const lush = fractalNoise(x * 3 + 2, y * 3 + 7, 3);   // large wet/dry patches
    // Soft mowing stripes (smooth, not hard-edged) — a groundskept circuit
    // infield reads as alternating light/dark bands of cut grass.
    const mow = 1 + 0.10 * Math.sin(x * Math.PI * 8);
    // Richer, slightly darker base with bigger wet/dry swings so the field
    // isn't a single flat green from the cockpit. Stronger dry-yellow patches
    // and more macro contrast break up the uniform "video-game green".
    let g = (0.205 + blades * 0.15 + patch * 0.15 + lush * 0.11 + dry * 0.05) * mow;
    let r = g * (0.52 + dry * 0.42);
    let b = g * (0.35 + lush * 0.11);
    return [r, g, b];
  });
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(38, 38);
  tex.anisotropy = 16;
  tex.colorSpace = THREE.SRGBColorSpace;

  // Normal map adds micro-terrain detail — blades catching light at grazing angles.
  const grassNormal = makeNormalTexture(256, 0.9);
  grassNormal.wrapS = grassNormal.wrapT = THREE.RepeatWrapping;
  grassNormal.repeat.set(80, 80);

  return new THREE.MeshStandardMaterial({
    map: tex,
    normalMap: grassNormal,
    normalScale: new THREE.Vector2(0.45, 0.45),
    roughness: 0.95,
    metalness: 0.0,
    envMapIntensity: 0.3,
    polygonOffset: true,
    polygonOffsetFactor: 2,
    polygonOffsetUnits: 2,
  });
}

// Worn earth strip between the kerbs and the surrounding terrain. Tints to the
// ground type so the verge blends out to grass / alpine meadow / desert sand.
function makeVergeMaterial(ground = 'grass') {
  const OUT = {
    grass: [0.17, 0.27, 0.13],
    alpine: [0.14, 0.24, 0.14],
    sand: [0.60, 0.49, 0.30],
  }[ground] || [0.17, 0.27, 0.13];
  const DIRT = ground === 'sand' ? [0.58, 0.46, 0.28] : [0.34, 0.27, 0.17];
  const tex = makeNoiseTexture(512, (x, y) => {
    const n = fractalNoise(x * 14, y * 60, 4);
    const g = fractalNoise(x * 6 + 4, y * 22 + 8, 3);
    // dirt blending toward the terrain colour at the tile edges (u: 0 and 1)
    const edge = Math.min(1, Math.abs(x - 0.5) * 2.6);
    const dirtR = DIRT[0] + n * 0.16;
    const dirtG = DIRT[1] + n * 0.13;
    const dirtB = DIRT[2] + n * 0.08;
    const grassR = OUT[0] + g * 0.12;
    const grassG = OUT[1] + g * 0.16;
    const grassB = OUT[2] + g * 0.07;
    const m = smoothstep(0.45, 1.0, edge);
    return [
      dirtR * (1 - m) + grassR * m,
      dirtG * (1 - m) + grassG * m,
      dirtB * (1 - m) + grassB * m,
    ];
  });
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 60);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.MeshStandardMaterial({
    map: tex,
    roughness: 0.97,
    metalness: 0,
    envMapIntensity: 0.3,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
}

function makeGravelMaterial() {
  const tex = makeNoiseTexture(512, (x, y) => {
    const n = fractalNoise(x * 40, y * 40, 4);
    const rake = 1 + 0.05 * Math.sin(y * Math.PI * 50);
    const v = (0.42 + n * 0.20) * rake;
    return [v * 1.02, v * 0.95, v * 0.78];
  });
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.MeshStandardMaterial({
    map: tex,
    roughness: 1.0,
    metalness: 0,
    envMapIntensity: 0.3,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
}

function makeKerbMaterial() {
  // Higher-res canvas for sharper stripe edges; LinearMipmapLinear avoids
  // the blocky NearestFilter look at distance.
  const c = document.createElement('canvas');
  c.width = 64; c.height = 64;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#e02020'; ctx.fillRect(0, 0, 64, 64);   // vivid racing red
  ctx.fillStyle = '#f9f9f9'; ctx.fillRect(0, 32, 64, 32);  // clean white
  // Subtle texture noise to look like painted concrete
  for (let i = 0; i < 180; i++) {
    const kx = Math.random() * 64, ky = Math.random() * 64;
    const alpha = Math.random() * 0.06;
    ctx.fillStyle = `rgba(0,0,0,${alpha})`;
    ctx.fillRect(kx, ky, 1 + Math.random() * 2, 1 + Math.random() * 2);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 1);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = 8;
  return new THREE.MeshStandardMaterial({
    map: tex,
    roughness: 0.48,  // painted concrete — a bit glossy
    metalness: 0.0,
    envMapIntensity: 0.4,
    polygonOffset: true,
    polygonOffsetFactor: -2,
    polygonOffsetUnits: -2,
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

// Leaf-cluster billboard — multi-layer for more depth: dark interior shadow,
// mid-tone foliage body, bright sun-catch on the upper face.
function makeFoliageTexture() {
  const size = 512;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, size, size);

  const blobs = [];
  for (let i = 0; i < 220; i++) {
    const a = Math.random() * Math.PI * 2;
    const rad = Math.pow(Math.random(), 0.60) * size * 0.44;
    blobs.push({
      x: size / 2 + Math.cos(a) * rad * 1.05,
      y: size / 2 + Math.sin(a) * rad * 0.88,
      r: 9 + Math.random() * 28,
      hue: 0.29 + (Math.random() - 0.5) * 0.08,   // green hue range
    });
  }
  // bottom-up: dark undersides first, bright tops last
  blobs.sort((a, b) => b.y - a.y);

  for (const bl of blobs) {
    const yFrac = bl.y / size;
    // 0=top (lit), 1=bottom (shadow)
    const lit = Math.pow(1 - yFrac * 0.9, 1.4);
    // warm golden-hour tint on the tops
    const gBase = 60 + lit * 115;
    const rBase = 18 + lit * 68 + lit * 20;   // warm bronze on the tips
    const bBase = 16 + lit * 22;
    const alpha = 0.88 + Math.random() * 0.10;

    const grad = ctx.createRadialGradient(
      bl.x, bl.y - bl.r * 0.40, bl.r * 0.06, bl.x, bl.y, bl.r * 1.05);
    grad.addColorStop(0, `rgba(${(rBase + 28)|0},${Math.min(255,(gBase + 32)|0)},${(bBase + 10)|0},${alpha})`);
    grad.addColorStop(0.55, `rgba(${rBase|0},${gBase|0},${bBase|0},${alpha * 0.9})`);
    grad.addColorStop(0.85, `rgba(${(rBase * 0.55)|0},${(gBase * 0.52)|0},${(bBase * 0.45)|0},${alpha * 0.5})`);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(bl.x, bl.y, bl.r * 1.05, 0, Math.PI * 2); ctx.fill();
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

// Long parapet branding strip.
function makeBannerTexture(text) {
  const w = 2048, h = 64;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#15181d'; ctx.fillRect(0, 0, w, h);
  // checker ends
  for (const x0 of [0, w - 96]) {
    for (let x = 0; x < 6; x++) {
      for (let y = 0; y < 4; y++) {
        ctx.fillStyle = (x + y) % 2 ? '#e8e8e8' : '#15181d';
        ctx.fillRect(x0 + x * 16, y * 16, 16, 16);
      }
    }
  }
  ctx.fillStyle = '#e8eaee';
  ctx.font = 'bold 40px Arial Black, Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '14px';
  ctx.fillText(text, w / 2, h / 2 + 2);
  ctx.fillStyle = '#c41e1e';
  ctx.fillRect(w / 2 - 460, h - 8, 920, 4);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

// Brake-distance board (white field, red number).
function makeMarkerTexture(label) {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 192;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#f2f3f5'; ctx.fillRect(0, 0, 256, 192);
  ctx.strokeStyle = '#c41e1e'; ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, 242, 178);
  ctx.fillStyle = '#c41e1e';
  ctx.font = 'bold 104px Arial Black, Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, 128, 102);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

// Puffy cumulus billboard — warm-lit tops, blue-gray shadowed underbellies.
function makeCloudTexture() {
  const w = 512, h = 256;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, w, h);

  // Layered approach: dark shadow base, bright puffs on top
  // Draw shadow core first
  for (let i = 0; i < 18; i++) {
    const x = w * 0.5 + (Math.random() - 0.5) * w * 0.65;
    const y = h * 0.72 + (Math.random() - 0.5) * h * 0.28;
    const r = 30 + Math.random() * 55;
    const grad = ctx.createRadialGradient(x, y, 2, x, y, r);
    const v = 165 + Math.random() * 20;
    grad.addColorStop(0, `rgba(${v - 15},${v - 10},${v + 12},0.38)`);
    grad.addColorStop(0.6, `rgba(${v - 20},${v - 15},${v + 8},0.18)`);
    grad.addColorStop(1, 'rgba(200,210,230,0)');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }

  // Bright upper puffs
  for (let i = 0; i < 60; i++) {
    const x = w * 0.5 + (Math.random() - 0.5) * w * 0.78;
    const y = h * 0.50 + (Math.random() - 0.5) * h * 0.46;
    const r = 14 + Math.random() * 38;
    const grad = ctx.createRadialGradient(x, y - r * 0.25, r * 0.05, x, y, r);
    // warm sunlit tops (slight warm tint from golden hour)
    const lum = 240 + Math.random() * 15;
    const warmR = Math.min(255, lum + 8);
    const warmG = Math.min(255, lum + 2);
    grad.addColorStop(0,   `rgba(${warmR},${warmG},${lum - 5},0.68)`);
    grad.addColorStop(0.55, `rgba(${lum},${lum},${lum + 3},0.42)`);
    grad.addColorStop(1,   'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
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

function scatterTrees(scene, frames, opts = {}) {
  const type = opts.type || 'broadleaf';
  const count = opts.count || 600;
  const nearMin = opts.nearMin || 35;
  const extent = opts.band ? opts.band[1] : 800;
  if (type === 'pine') { scatterPines(scene, frames, count, nearMin, extent); return; }

  const trunkMat = new THREE.MeshStandardMaterial({
    color: 0x3d2c18, roughness: 0.96, metalness: 0, envMapIntensity: 0.1,
  });
  // Crossed alpha-cutout foliage billboards read as full leafy canopies from
  // every angle yet stay cheap (instanced, alpha-tested → no sorting).
  const leavesMat = new THREE.MeshStandardMaterial({
    map: makeFoliageTexture(),
    alphaTest: 0.38,        // lower threshold to show more of the leaf blobs
    roughness: 0.88, metalness: 0,
    side: THREE.DoubleSide,
    envMapIntensity: 0.2,
  });

  const trunkGeo = new THREE.CylinderGeometry(0.20, 0.40, 3.2, 8);
  trunkGeo.translate(0, 1.6, 0);

  // three quads crossing through a common vertical axis
  const quad = new THREE.PlaneGeometry(7.2, 7.4);
  quad.translate(0, 3.7, 0);
  const q2 = quad.clone(); q2.rotateY(Math.PI / 3);
  const q3 = quad.clone(); q3.rotateY((2 * Math.PI) / 3);
  const leavesGeo = mergeGeometries([quad, q2, q3]);
  leavesGeo.translate(0, 2.4, 0); // sit on top of the trunk

  const N = count;
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
    const x = (Math.random() * 2 - 1) * extent;
    const z = (Math.random() * 2 - 1) * extent;
    const p = new THREE.Vector3(x, 0, z);
    let minD = Infinity;
    for (let k = 0; k < frames.length; k += 6) {
      const d = p.distanceToSquared(frames[k].pos);
      if (d < minD) minD = d;
    }
    if (minD < nearMin * nearMin) continue;
    const sc = 0.7 + Math.random() * 1.0;
    s.set(sc, 0.8 + Math.random() * 0.6, sc);
    q.setFromEuler(new THREE.Euler(0, Math.random() * Math.PI * 2, 0));
    m.compose(p, q, s);
    trunkInst.setMatrixAt(placed, m);
    leavesInst.setMatrixAt(placed, m);
    // per-tree hue variation: yellows, dark greens, olive tones for variety
    col.setHSL(0.25 + (Math.random() - 0.5) * 0.10, 0.42 + Math.random() * 0.22, 0.28 + Math.random() * 0.16);
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

// Conifers for the alpine circuit: stacked-cone firs, denser and closer to the
// road than the broadleaf scatter, thinning out toward the mountains.
function scatterPines(scene, frames, count, nearMin, extent) {
  const trunkMat = new THREE.MeshStandardMaterial({
    color: 0x4a3322, roughness: 0.95, metalness: 0, envMapIntensity: 0.1,
  });
  const foliageMat = new THREE.MeshStandardMaterial({
    color: 0xffffff, roughness: 0.92, metalness: 0, envMapIntensity: 0.16,
    flatShading: true,
  });

  const c1 = new THREE.ConeGeometry(1.7, 3.0, 9); c1.translate(0, 2.6, 0);
  const c2 = new THREE.ConeGeometry(1.3, 2.6, 9); c2.translate(0, 4.1, 0);
  const c3 = new THREE.ConeGeometry(0.8, 2.2, 9); c3.translate(0, 5.6, 0);
  const foliageGeo = mergeGeometries([c1, c2, c3]);
  const trunkGeo = new THREE.CylinderGeometry(0.16, 0.26, 1.8, 6);
  trunkGeo.translate(0, 0.9, 0);

  const N = count;
  const trunkInst = new THREE.InstancedMesh(trunkGeo, trunkMat, N);
  const foliageInst = new THREE.InstancedMesh(foliageGeo, foliageMat, N);
  trunkInst.castShadow = trunkInst.receiveShadow = true;
  foliageInst.castShadow = true;
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const s = new THREE.Vector3();
  const col = new THREE.Color();
  let placed = 0;
  for (let i = 0; i < N * 5 && placed < N; i++) {
    const x = (Math.random() * 2 - 1) * extent;
    const z = (Math.random() * 2 - 1) * extent;
    const p = new THREE.Vector3(x, 0, z);
    let minD = Infinity;
    for (let k = 0; k < frames.length; k += 6) {
      const d = p.distanceToSquared(frames[k].pos);
      if (d < minD) minD = d;
    }
    if (minD < nearMin * nearMin) continue;
    // thin the forest out with distance from the ribbon so it reads as a stand
    // hugging the road rather than a uniform field
    const dist = Math.sqrt(minD);
    if (dist > 110 && Math.random() < ((dist - 110) / Math.max(1, extent - 110)) * 0.75) continue;
    const sc = 0.8 + Math.random() * 1.5;
    s.set(sc * (0.7 + Math.random() * 0.3), sc, sc * (0.7 + Math.random() * 0.3));
    q.setFromEuler(new THREE.Euler(0, Math.random() * Math.PI * 2, 0));
    m.compose(p, q, s);
    trunkInst.setMatrixAt(placed, m);
    foliageInst.setMatrixAt(placed, m);
    col.setHSL(0.33 + (Math.random() - 0.5) * 0.05, 0.36 + Math.random() * 0.20, 0.17 + Math.random() * 0.12);
    foliageInst.setColorAt(placed, col);
    placed++;
  }
  trunkInst.count = placed;
  foliageInst.count = placed;
  trunkInst.instanceMatrix.needsUpdate = true;
  foliageInst.instanceMatrix.needsUpdate = true;
  if (foliageInst.instanceColor) foliageInst.instanceColor.needsUpdate = true;
  scene.add(trunkInst);
  scene.add(foliageInst);
}

function addDistantMountains(scene, kind = 'far') {
  // Mountains read fake when they're crisp, evenly-spaced, saturated cones.
  // Real distant ranges obey atmospheric perspective: the further the rock,
  // the more it desaturates and washes toward the haze colour, and overlapping
  // ridgelines stack into a soft silhouette rather than discrete teeth. We
  // build THREE concentric bands at increasing distance; each band is denser,
  // lower, hazier and lower-contrast than the one in front, and every vertex
  // is lerped toward the haze colour by its distance so the back range melts
  // into the sky exactly like the fog wants it to.
  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 1.0,
    metalness: 0,
    envMapIntensity: 0.25,
    fog: true,
  });
  // Palette + range layout vary by setting:
  //   far  — the GP/oval default: cool slate ranges far on the horizon.
  //   near — the alpine pass: taller peaks pulled in close so they loom.
  //   mesa — the desert: warm red rock buttes, no snow, mid distance.
  // [innerR, spanR, count, baseH, varH, baseHaze, hazePerFrac, snowy]
  const PRESETS = {
    far: {
      haze: 0xb9c2c6, rock: 0x6f7884, forest: 0x53604c, snow: 0xdfe6ee,
      bands: [
        [1450, 650, 15, 230, 300, 0.16, 0.30, true],
        [2350, 750, 21, 180, 230, 0.40, 0.34, true],
        [3300, 900, 27, 130, 170, 0.64, 0.28, false],
      ],
    },
    near: {
      haze: 0xc4d0d8, rock: 0x6b7480, forest: 0x4c5a46, snow: 0xeef3f8,
      bands: [
        [780, 420, 13, 340, 360, 0.10, 0.26, true],   // towering front wall
        [1450, 600, 19, 270, 300, 0.30, 0.30, true],
        [2500, 800, 25, 190, 220, 0.55, 0.30, false],
      ],
    },
    mesa: {
      haze: 0xd2b78c, rock: 0x9c5836, forest: 0x8a7048, snow: 0xe9d9b8,
      bands: [
        [1100, 520, 12, 190, 230, 0.14, 0.30, false],
        [1950, 700, 18, 150, 190, 0.40, 0.32, false],
        [2950, 900, 24, 120, 150, 0.62, 0.28, false],
      ],
    },
  };
  const preset = PRESETS[kind] || PRESETS.far;
  const haze = new THREE.Color(preset.haze);
  const rock = new THREE.Color(preset.rock);
  const forest = new THREE.Color(preset.forest);
  const snow = new THREE.Color(preset.snow);
  const tmp = new THREE.Color();
  const bands = preset.bands;

  for (let b = 0; b < bands.length; b++) {
    const [innerR, spanR, N, baseH, varH, baseHaze, hazePerFrac, snowy] = bands[b];
    for (let i = 0; i < N; i++) {
      const r = innerR + Math.random() * spanR;
      // jitter the angular position so peaks overlap into ridgelines
      const a = (i / N) * Math.PI * 2 + (Math.random() - 0.5) * (Math.PI / N) * 1.6;
      const x = Math.cos(a) * r;
      const z = Math.sin(a) * r;
      const h = baseH + Math.random() * varH;
      // Narrower, steeper cones so the eroded relief reads as alpine rock
      // rather than a low mound; finer mesh so ridges stay crisp.
      const w = (250 + Math.random() * 300) * (1 + b * 0.22);
      const geo = new THREE.ConeGeometry(w, h, 22, 14);
      const pos = geo.getAttribute('position');
      const colors = [];
      const seed = (b * 31.7) + i * 7.13;
      // Distance haze: front of band → its baseHaze, back → more. Clamp <1.
      const distFrac = Math.min(1, Math.max(0, (r - 700) / 2600));
      for (let v = 0; v < pos.count; v++) {
        const px = pos.getX(v), py = pos.getY(v), pz = pos.getZ(v);
        const ang = Math.atan2(pz, px);
        const yFrac = (py + h / 2) / h;             // 0 base .. 1 tip
        // Ridged noise (1-|2n-1|) gives sharp crests instead of smooth bumps;
        // a higher-frequency detail term breaks the faces, and a separate
        // gully term carves valleys that pull the silhouette inward.
        const ridge = fractalNoise(ang * 2.2 + seed, seed * 0.37, 5);
        const rid = 1 - Math.abs(ridge * 2 - 1);
        const detail = fractalNoise(ang * 6.5 + seed * 1.7, yFrac * 4 + seed, 4);
        const gully = fractalNoise(ang * 3.4 + seed * 2.3, yFrac * 2 + seed, 3);
        // Silhouette relief, strongest mid-height and tapering toward the tip;
        // crests push out, gullies pull in, base stays planted.
        const taper = 1 - yFrac * 0.35;
        const relief = rid * 0.85 + detail * 0.5 - gully * 0.35;
        const radial = (0.80 + relief * 0.62) * taper + 0.12;
        pos.setX(v, px * radial);
        pos.setZ(v, pz * radial);
        // Raise crests and drop gullies so the skyline itself is jagged.
        pos.setY(v, py + (rid - 0.45) * h * 0.24 + (detail - 0.5) * h * 0.10);
        // Snow follows the crests: ridges (high rid) hold snow lower down,
        // so caps streak along the ridgelines rather than sitting as a band.
        const snowLine = 0.60 + (1 - rid) * 0.22 + (detail - 0.5) * 0.08;
        if (snowy && yFrac > snowLine) tmp.copy(snow);
        else if (yFrac < 0.20) tmp.copy(forest).lerp(rock, detail * 0.5);
        else tmp.copy(rock).lerp(forest, Math.max(0, 0.34 - yFrac) * 1.3);
        // Shade gullies darker, catch light on crests — fakes self-shadowing.
        tmp.multiplyScalar(0.84 + relief * 0.20);
        // Atmospheric perspective: wash toward haze by band + per-vertex dist.
        const hazeAmt = Math.min(0.92, baseHaze + distFrac * hazePerFrac);
        tmp.lerp(haze, hazeAmt);
        colors.push(tmp.r, tmp.g, tmp.b);
      }
      geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      geo.computeVertexNormals();
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, h / 2 - 12, z);
      m.rotation.y = Math.random() * Math.PI;
      scene.add(m);
    }
  }
}

function addGrandstands(scene, frames, D) {
  const structMat = new THREE.MeshStandardMaterial({
    color: 0x9da1a6, roughness: 0.78, metalness: 0.12,
  });
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x3a3f47, roughness: 0.5, metalness: 0.6,
  });
  const roofMat = new THREE.MeshStandardMaterial({
    color: 0xc8cbce, roughness: 0.55, metalness: 0.25, side: THREE.DoubleSide,
  });
  const backMat = new THREE.MeshStandardMaterial({
    color: 0x4e535a, roughness: 0.85, metalness: 0.1,
  });

  // One shared instanced "crowd" — small boxes in shirt colours on the tiers.
  const TIERS = 9;
  const W = 30;
  const tierRise = 0.62;
  const tierDepth = 1.0;
  // Main stand opposite the pits, plus stands at the far corners.
  const places = [595, 245, 430];
  const standOffset = D.armco + 4.5;

  const seatGeo = new THREE.BoxGeometry(0.34, 0.5, 0.3);
  const perStand = TIERS * 44;
  const crowd = new THREE.InstancedMesh(
    seatGeo,
    new THREE.MeshStandardMaterial({ roughness: 0.9, metalness: 0 }),
    perStand * places.length
  );
  const m4 = new THREE.Matrix4();
  const q4 = new THREE.Quaternion();
  const s4 = new THREE.Vector3(1, 1, 1);
  const col = new THREE.Color();
  let ci = 0;

  for (const idxOff of places) {
    const f = frames[idxOff];
    const base = f.pos.clone().add(f.left.clone().multiplyScalar(-standOffset));
    // Local +z must point back AT the track (the stand sits on the -left
    // side, so its front faces along +left).
    const yaw = Math.atan2(f.left.x, f.left.z);
    const g = new THREE.Group();

    // Stepped tiers climbing AWAY from the track (track is at local +z).
    for (let t = 0; t < TIERS; t++) {
      const step = new THREE.Mesh(
        new THREE.BoxGeometry(W, tierRise, tierDepth), structMat);
      step.position.set(0, 1.2 + t * tierRise + tierRise / 2, -t * tierDepth);
      step.castShadow = step.receiveShadow = true;
      g.add(step);
    }
    // Base plinth + side walls + back wall
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(W, 1.2, TIERS * tierDepth + 1), structMat);
    plinth.position.set(0, 0.6, -(TIERS * tierDepth) / 2 + 0.5);
    plinth.castShadow = plinth.receiveShadow = true;
    g.add(plinth);
    const back = new THREE.Mesh(
      new THREE.BoxGeometry(W, 1.2 + TIERS * tierRise + 1.4, 0.3), backMat);
    back.position.set(0, (1.2 + TIERS * tierRise) / 2 + 0.5, -(TIERS - 0.5) * tierDepth - 0.3);
    back.castShadow = true;
    g.add(back);
    for (const sx of [-1, 1]) {
      const side = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 1.2 + TIERS * tierRise, TIERS * tierDepth + 1), backMat);
      side.position.set(sx * (W / 2 + 0.15), (1.2 + TIERS * tierRise) / 2,
        -(TIERS * tierDepth) / 2 + 0.5);
      g.add(side);
    }

    // Cantilever roof on raking masts
    const roof = new THREE.Mesh(new THREE.BoxGeometry(W + 1.5, 0.25, TIERS * tierDepth + 3), roofMat);
    roof.position.set(0, 1.2 + TIERS * tierRise + 2.6, -(TIERS * tierDepth) / 2 + 1.2);
    roof.rotation.x = 0.10;
    roof.castShadow = true;
    g.add(roof);
    for (const sx of [-W / 2 + 2, -W / 6, W / 6, W / 2 - 2]) {
      const mast = new THREE.Mesh(
        new THREE.BoxGeometry(0.35, TIERS * tierRise + 3.6, 0.35), frameMat);
      mast.position.set(sx, (TIERS * tierRise + 3.6) / 2 + 1.2, -(TIERS - 1) * tierDepth);
      mast.castShadow = true;
      g.add(mast);
    }

    g.position.copy(base);
    g.rotation.y = yaw;
    scene.add(g);

    // Crowd instances in this stand's frame
    q4.setFromEuler(new THREE.Euler(0, yaw, 0));
    for (let t = 0; t < TIERS; t++) {
      for (let s = 0; s < 44; s++) {
        if (Math.random() < 0.28) continue;     // empty seats
        const lx = (s / 43 - 0.5) * (W - 2);
        const ly = 1.2 + t * tierRise + tierRise + 0.25;
        const lz = -t * tierDepth + (Math.random() - 0.5) * 0.2;
        const local = new THREE.Vector3(lx, ly, lz).applyQuaternion(q4).add(base);
        m4.compose(local, q4, s4);
        crowd.setMatrixAt(ci, m4);
        col.setHSL(Math.random(), 0.30 + Math.random() * 0.3, 0.35 + Math.random() * 0.22);
        crowd.setColorAt(ci, col);
        ci++;
      }
    }
  }
  crowd.count = ci;
  crowd.instanceMatrix.needsUpdate = true;
  if (crowd.instanceColor) crowd.instanceColor.needsUpdate = true;
  crowd.castShadow = false;
  scene.add(crowd);
}

// ---------- Pit complex (axis-aligned along the main straight at x≈0) ----------

function addPitComplex(scene, startFrame) {
  // The complex is modelled in local space (local +z = the start-straight
  // direction, local −x = the pit side) exactly as the GP circuit needed it,
  // then placed/rotated onto whatever start straight this track has.
  const g = new THREE.Group();
  const concrete = new THREE.MeshStandardMaterial({
    color: 0x9b9da0, roughness: 0.85, metalness: 0.05,
  });
  const concreteDark = new THREE.MeshStandardMaterial({
    color: 0x55585c, roughness: 0.9, metalness: 0.05,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x2b3947, roughness: 0.15, metalness: 0.8, envMapIntensity: 1.2,
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: 0x23262b, roughness: 0.6, metalness: 0.4,
  });
  const openingMat = new THREE.MeshStandardMaterial({
    color: 0x0c0d10, roughness: 0.95, metalness: 0,
  });

  const Z0 = -45, Z1 = 100;                 // extent along the straight
  const LEN = Z1 - Z0;
  const ZC = (Z0 + Z1) / 2;

  // Pit-lane apron (concrete) between the wall and the garages.
  const apron = new THREE.Mesh(new THREE.PlaneGeometry(11.5, LEN + 10), concreteDark);
  apron.rotation.x = -Math.PI / 2;
  apron.position.set(-20.5, 0.012, ZC);
  apron.receiveShadow = true;
  g.add(apron);

  // Low pit wall beside the armco.
  const wall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.0, LEN), concrete);
  wall.position.set(-14.6, 0.5, ZC);
  wall.castShadow = wall.receiveShadow = true;
  g.add(wall);

  // Garage block: long building with recessed bays and a glazed first floor.
  const bldg = new THREE.Mesh(new THREE.BoxGeometry(10, 7.6, LEN), concrete);
  bldg.position.set(-31.5, 3.8, ZC);
  bldg.castShadow = bldg.receiveShadow = true;
  g.add(bldg);

  // Garage bays along the face (x = -26.5)
  const bayCount = 12;
  for (let i = 0; i < bayCount; i++) {
    const z = Z0 + 8 + i * ((LEN - 16) / (bayCount - 1));
    const bay = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 3.1), openingMat);
    bay.position.set(-26.44, 1.65, z);
    bay.rotation.y = Math.PI / 2;
    g.add(bay);
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.5, 5.2), trimMat);
    lintel.position.set(-26.5, 3.5, z);
    g.add(lintel);
  }

  // Glazed suite band above the garages.
  const band = new THREE.Mesh(new THREE.BoxGeometry(0.25, 1.9, LEN - 6), glassMat);
  band.position.set(-26.35, 5.6, ZC);
  g.add(band);
  // Mullions
  for (let z = Z0 + 6; z <= Z1 - 6; z += 6) {
    const mull = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.9, 0.16), trimMat);
    mull.position.set(-26.33, 5.6, z);
    g.add(mull);
  }

  // Roof slab + railing + rooftop boxes
  const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(11, 0.3, LEN + 2), trimMat);
  roofSlab.position.set(-31.5, 7.75, ZC);
  roofSlab.castShadow = true;
  g.add(roofSlab);
  for (let z = Z0; z <= Z1; z += 4) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.9, 0.08), trimMat);
    post.position.set(-26.6, 8.3, z);
    g.add(post);
  }
  const railTop = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, LEN), trimMat);
  railTop.position.set(-26.6, 8.72, ZC);
  g.add(railTop);
  for (const bz of [-20, 20, 60]) {
    const box = new THREE.Mesh(new THREE.BoxGeometry(6, 2.6, 9), concrete);
    box.position.set(-32.5, 9.2, bz);
    box.castShadow = true;
    g.add(box);
    const boxGlass = new THREE.Mesh(new THREE.BoxGeometry(0.2, 1.2, 8), glassMat);
    boxGlass.position.set(-29.45, 9.4, bz);
    g.add(boxGlass);
  }

  // Branding strip along the parapet.
  const banner = new THREE.Mesh(
    new THREE.PlaneGeometry(LEN - 10, 1.15),
    new THREE.MeshStandardMaterial({
      map: makeBannerTexture('RACER GRAND PRIX'), roughness: 0.55, metalness: 0,
    })
  );
  banner.position.set(-26.28, 7.1, ZC);
  banner.rotation.y = Math.PI / 2;
  g.add(banner);

  g.position.copy(startFrame.pos);
  g.rotation.y = Math.atan2(startFrame.tan.x, startFrame.tan.z);
  scene.add(g);
}

// Debris fencing: posts + translucent mesh along the main straight (both
// sides, where the pit wall and main grandstand face each other).
function addCatchFence(scene, frames, D) {
  const postMat = new THREE.MeshStandardMaterial({
    color: 0x4d5358, roughness: 0.6, metalness: 0.6,
  });
  const meshMat = new THREE.MeshStandardMaterial({
    color: 0x2c3034,
    roughness: 0.8,
    metalness: 0.3,
    transparent: true,
    opacity: 0.32,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  // collect frames on the start straight (x≈0, z in range)
  const idxs = [];
  for (let i = 0; i < frames.length; i++) {
    const p = frames[i].pos;
    if (Math.abs(p.x) < 6 && p.z > -55 && p.z < 135) idxs.push(i);
  }
  if (!idxs.length) return;

  const postGeo = new THREE.BoxGeometry(0.14, 3.1, 0.14);
  const posts = new THREE.InstancedMesh(postGeo, postMat, idxs.length * 2);
  const m4 = new THREE.Matrix4();
  const q4 = new THREE.Quaternion();
  const s4 = new THREE.Vector3(1, 1, 1);
  let pi = 0;

  for (const sign of [+1, -1]) {
    const positions = [];
    const indices = [];
    let vi = 0;
    for (let k = 0; k < idxs.length; k++) {
      const f = frames[idxs[k]];
      const p = f.pos.clone().add(f.left.clone().multiplyScalar(sign * (D.armco + 0.45)));
      if (k % 2 === 0) {
        q4.setFromEuler(new THREE.Euler(0, Math.atan2(f.tan.x, f.tan.z), 0));
        m4.compose(new THREE.Vector3(p.x, 1.55, p.z), q4, s4);
        posts.setMatrixAt(pi++, m4);
      }
      positions.push(p.x, 0.85, p.z, p.x, 3.05, p.z);
      if (k > 0) indices.push(vi - 2, vi, vi - 1, vi - 1, vi, vi + 1);
      vi += 2;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    g.setIndex(indices);
    g.computeVertexNormals();
    scene.add(new THREE.Mesh(g, meshMat));
  }
  posts.count = pi;
  posts.instanceMatrix.needsUpdate = true;
  scene.add(posts);
}

// 100 m / 50 m braking boards before the heaviest corners.
function addBrakeMarkers(scene, frames, curvature, D) {
  const n = frames.length;
  const zones = [];
  let i = 0;
  while (i < n) {
    if (curvature[i] > 0.0045) {
      let j = i, peak = 0;
      while (j < n && curvature[j] > 0.002) { peak = Math.max(peak, curvature[j]); j++; }
      if (j - i > 6) zones.push({ i0: i, peak });
      i = j + 10;
    } else i++;
  }
  zones.sort((a, b) => b.peak - a.peak);

  const postMat = new THREE.MeshStandardMaterial({ color: 0x5a5e63, roughness: 0.7, metalness: 0.4 });
  for (const z of zones.slice(0, 3)) {
    // outside of the corner
    const t1 = frames[z.i0].tan;
    const t2 = frames[(z.i0 + 4) % n].tan;
    const crossY = t1.x * t2.z - t1.z * t2.x;
    const sign = crossY > 0 ? +1 : -1;
    for (const dist of [100, 50]) {
      const stepBack = Math.round(dist / 3.2); // ≈3.2 m per frame
      const fi = (z.i0 - stepBack + n) % n;
      const f = frames[fi];
      const pos = f.pos.clone().add(f.left.clone().multiplyScalar(sign * (D.armco - 1.6)));
      const yaw = Math.atan2(f.tan.x, f.tan.z);
      const board = new THREE.Mesh(
        new THREE.PlaneGeometry(1.15, 0.85),
        new THREE.MeshStandardMaterial({
          map: makeMarkerTexture(String(dist)), roughness: 0.5, metalness: 0,
          side: THREE.DoubleSide,
        })
      );
      board.position.set(pos.x, 1.5, pos.z);
      board.rotation.y = yaw;
      board.castShadow = true;
      scene.add(board);
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.1, 0.08), postMat);
      post.position.set(pos.x, 0.55, pos.z);
      scene.add(post);
    }
  }
}

// Soft billboard clouds drifting above the haze.
function addClouds(scene) {
  const tex = makeCloudTexture();
  // More clouds, higher altitude, varied aspect ratios for a richer sky.
  for (let i = 0; i < 16; i++) {
    const mat = new THREE.SpriteMaterial({
      map: tex,
      transparent: true,
      opacity: 0.38 + Math.random() * 0.35,
      fog: false,
      depthWrite: false,
    });
    const sp = new THREE.Sprite(mat);
    const a = Math.random() * Math.PI * 2;
    const r = 900 + Math.random() * 1800;
    sp.position.set(
      Math.cos(a) * r,
      280 + Math.random() * 280,
      Math.sin(a) * r
    );
    // Wide, flat cumulus aspect ratio
    const sw = 450 + Math.random() * 550;
    const sh = sw * (0.28 + Math.random() * 0.14);
    sp.scale.set(sw, sh, 1);
    scene.add(sp);
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
    polygonOffset: true,
    polygonOffsetFactor: -3,
    polygonOffsetUnits: -3,
  });
  const stripeMat = new THREE.MeshStandardMaterial({
    color: 0xffd84a,
    roughness: 0.7,
    metalness: 0,
    transparent: true,
    opacity: 0.85,
    polygonOffset: true,
    polygonOffsetFactor: -3,
    polygonOffsetUnits: -3,
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

function addStartGantry(scene, startFrame, road) {
  const yaw = Math.atan2(startFrame.tan.x, startFrame.tan.z);
  const center = startFrame.pos.clone().add(startFrame.tan.clone().multiplyScalar(8));

  const group = new THREE.Group();

  const steel = new THREE.MeshStandardMaterial({
    color: 0x8e9399, roughness: 0.4, metalness: 0.85,
  });
  const dark = new THREE.MeshStandardMaterial({
    color: 0x23262b, roughness: 0.55, metalness: 0.6,
  });

  const H = 8.6;                              // height of the truss centre
  const pillarOffset = road / 2 + 2.6;
  const SPAN = pillarOffset * 2;

  // Lattice towers each side: 4 corner chords + cross braces.
  for (const sx of [-1, 1]) {
    for (const ox of [-0.35, 0.35]) {
      for (const oz of [-0.35, 0.35]) {
        const chord = new THREE.Mesh(new THREE.BoxGeometry(0.12, H, 0.12), steel);
        chord.position.set(sx * pillarOffset + ox, H / 2, oz);
        chord.castShadow = true;
        group.add(chord);
      }
    }
    for (let y = 1; y < H - 0.5; y += 1.4) {
      const brace = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.1, 0.08), steel);
      brace.position.set(sx * pillarOffset, y, 0.35);
      brace.rotation.z = 0.62;
      group.add(brace);
      const brace2 = brace.clone();
      brace2.rotation.z = -0.62;
      brace2.position.z = -0.35;
      group.add(brace2);
    }
  }

  // Horizontal truss box across the road: 4 chords + diagonals.
  for (const oy of [-0.4, 0.4]) {
    for (const oz of [-0.4, 0.4]) {
      const chord = new THREE.Mesh(new THREE.BoxGeometry(SPAN + 1, 0.12, 0.12), steel);
      chord.position.set(0, H + oy, oz);
      chord.castShadow = true;
      group.add(chord);
    }
  }
  const diagCount = 12;
  for (let i = 0; i < diagCount; i++) {
    const x = -SPAN / 2 + (i + 0.5) * (SPAN / diagCount);
    for (const oz of [-0.4, 0.4]) {
      const d = new THREE.Mesh(new THREE.BoxGeometry(0.07, 1.05, 0.07), steel);
      d.position.set(x, H, oz);
      d.rotation.z = (i % 2 ? 1 : -1) * 0.75;
      group.add(d);
    }
  }

  // Checkered banner hanging from the truss.
  const bannerTex = (() => {
    const c = document.createElement('canvas');
    c.width = 512; c.height = 64;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#101317'; ctx.fillRect(0, 0, 512, 64);
    for (let x = 0; x < 32; x++) {
      for (let y = 0; y < 2; y++) {
        if ((x + y) % 2 === 0) continue;
        ctx.fillStyle = '#e8e8e8';
        ctx.fillRect(x * 16, y * 16, 16, 16);
      }
    }
    ctx.fillStyle = '#e8eaee';
    ctx.font = 'bold 26px Arial Black, Arial';
    ctx.textAlign = 'center';
    ctx.fillText('RACER GRAND PRIX', 256, 54);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  })();
  const banner = new THREE.Mesh(
    new THREE.PlaneGeometry(SPAN - 2, 1.1),
    new THREE.MeshStandardMaterial({ map: bannerTex, side: THREE.DoubleSide, roughness: 0.6 })
  );
  banner.position.set(0, H - 1.0, 0);
  group.add(banner);

  // Start-light rig over the centreline: housing + 5 red lamps.
  const housing = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.7, 0.4), dark);
  housing.position.set(0, H - 2.0, 0);
  housing.castShadow = true;
  group.add(housing);
  const lampMat = new THREE.MeshStandardMaterial({
    color: 0x30090b, emissive: 0xff2330, emissiveIntensity: 1.4,
    roughness: 0.35,
  });
  for (let i = 0; i < 5; i++) {
    const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.1, 14), lampMat);
    lamp.rotation.x = Math.PI / 2;
    lamp.position.set(-0.88 + i * 0.44, H - 2.0, 0.22);
    group.add(lamp);
  }
  const drop = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.6, 0.14), dark);
  drop.position.set(0, H - 1.2, 0);
  group.add(drop);

  group.position.copy(center);
  group.rotation.y = yaw;
  scene.add(group);
}

function addArmco(scene, frames, offset) {
  // Galvanised steel — bright white rails read as floating painted lines.
  const railMat = new THREE.MeshStandardMaterial({
    color: 0xb4bac1,
    roughness: 0.45,
    metalness: 0.85,
    side: THREE.DoubleSide,
  });
  const postMat = new THREE.MeshStandardMaterial({
    color: 0x666c73,
    roughness: 0.7,
    metalness: 0.5,
  });

  for (const sign of [+1, -1]) {
    const rail = new THREE.Mesh(buildRailGeometry(frames, offset * sign), railMat);
    rail.castShadow = true;
    scene.add(rail);
  }

  const stride = 5;
  const postCount = Math.floor(frames.length / stride) * 2;
  const postGeo = new THREE.BoxGeometry(0.22, 0.85, 0.16);
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

function buildBarrierPhysics(world, frames, offset, materials, bodies) {
  const bodyMat = materials.barrierMat;
  // A continuous chord wall: each box spans exactly from this frame's offset
  // point to the next one's, so consecutive segments share endpoints and the
  // wall stays gap-free however the curve bends. (The previous wall used
  // fixed-length boxes aligned to the local TANGENT; on the outside of tight
  // corners adjacent boxes splayed apart and opened V-shaped gaps that cars
  // squeezed through at speed.) Boxes are thick and tall enough that neither
  // a 300 km/h head-on hit (≈0.75 m of travel per physics substep) nor a
  // kerb-launched car can pass them, and they overlap at the joints.
  const STRIDE = 2;
  const HALF_THICK = 0.6;
  const HALF_HEIGHT = 1.9;
  const OVERLAP = 0.7;        // extra half-length so angled joints stay sealed
  const n = frames.length;
  const q = new CANNON.Quaternion();
  const up = new CANNON.Vec3(0, 1, 0);
  for (const sign of [+1, -1]) {
    // Keep the contact face at the visual rail line: the box centre sits
    // slightly outside `offset` so its inner face lands on the armco.
    const centerOff = (offset + HALF_THICK - 0.25) * sign;
    for (let i = 0; i < n; i += STRIDE) {
      const fA = frames[i];
      const fB = frames[(i + STRIDE) % n];
      const ax = fA.pos.x + fA.left.x * centerOff;
      const az = fA.pos.z + fA.left.z * centerOff;
      const bx = fB.pos.x + fB.left.x * centerOff;
      const bz = fB.pos.z + fB.left.z * centerOff;
      const dx = bx - ax;
      const dz = bz - az;
      const len = Math.hypot(dx, dz);
      const body = new CANNON.Body({ mass: 0, material: bodyMat });
      body.addShape(new CANNON.Box(
        new CANNON.Vec3(HALF_THICK, HALF_HEIGHT, len / 2 + OVERLAP)));
      // Sunk slightly so there is no slit at ground level: spans y -0.3..3.5.
      body.position.set((ax + bx) / 2, HALF_HEIGHT - 0.3, (az + bz) / 2);
      q.setFromAxisAngle(up, Math.atan2(dx, dz));
      body.quaternion.copy(q);
      world.addBody(body);
      if (bodies) bodies.push(body);
    }
  }
}

// ---------- Ground materials (theme-selected) ----------

function makeGroundMaterial(kind) {
  if (kind === 'city') return makeCityGroundMaterial();
  if (kind === 'sand') return makeSandMaterial();
  const mat = makeGrassMaterial();
  // Alpine: same lush grass map, multiplied toward a cooler, deeper meadow.
  if (kind === 'alpine') mat.color = new THREE.Color(0xaec4a6);
  return mat;
}

// Broad expanse of city pavement/plaza concrete around a street circuit.
function makeCityGroundMaterial() {
  const tex = makeNoiseTexture(1024, (x, y) => {
    const grain = fractalNoise(x * 30, y * 30, 4);
    const patch = fractalNoise(x * 5 + 2, y * 5 + 9, 3);
    const stain = fractalNoise(x * 2 + 7, y * 2 + 1, 3);
    const v = 0.205 + grain * 0.05 + patch * 0.05 - stain * 0.04;
    return [v * 0.99, v, v * 1.04];
  });
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(60, 60);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  const normal = makeNormalTexture(256, 1.1);
  normal.wrapS = normal.wrapT = THREE.RepeatWrapping;
  normal.repeat.set(120, 120);
  return new THREE.MeshStandardMaterial({
    map: tex, normalMap: normal, normalScale: new THREE.Vector2(0.3, 0.3),
    roughness: 0.9, metalness: 0.0, envMapIntensity: 0.4,
    polygonOffset: true, polygonOffsetFactor: 2, polygonOffsetUnits: 2,
  });
}

// Warm desert sand with faint wind ripples.
function makeSandMaterial() {
  const tex = makeNoiseTexture(1024, (x, y) => {
    const grain = fractalNoise(x * 40, y * 40, 4);
    const dune = fractalNoise(x * 3 + 5, y * 3 + 2, 3);
    const ripple = 0.5 + 0.5 * Math.sin(y * Math.PI * 58 + dune * 6);
    let v = 0.52 + grain * 0.10 + dune * 0.10;
    v *= 0.97 + 0.05 * ripple;
    return [v * 1.08, v * 0.93, v * 0.66];
  });
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(50, 50);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  const normal = makeNormalTexture(256, 1.0);
  normal.wrapS = normal.wrapT = THREE.RepeatWrapping;
  normal.repeat.set(90, 90);
  return new THREE.MeshStandardMaterial({
    map: tex, normalMap: normal, normalScale: new THREE.Vector2(0.4, 0.4),
    roughness: 0.98, metalness: 0.0, envMapIntensity: 0.35,
    polygonOffset: true, polygonOffsetFactor: 2, polygonOffsetUnits: 2,
  });
}

// ---------- Concrete barrier wall (street circuits) ----------

function addConcreteWall(scene, frames, offset) {
  const concrete = new THREE.MeshStandardMaterial({
    color: 0xd8d8d2, roughness: 0.85, metalness: 0.02,
    side: THREE.DoubleSide, envMapIntensity: 0.3,
  });
  const stripe = new THREE.MeshStandardMaterial({
    color: 0xc0202a, roughness: 0.6, metalness: 0, side: THREE.DoubleSide,
  });
  for (const sign of [+1, -1]) {
    const wall = new THREE.Mesh(buildWallStrip(frames, offset * sign, 0.0, 1.05), concrete);
    wall.castShadow = true;
    wall.receiveShadow = true;
    scene.add(wall);
    const band = new THREE.Mesh(buildWallStrip(frames, offset * sign, 1.02, 1.2), stripe);
    scene.add(band);
  }
}

function buildWallStrip(frames, offset, yLow, yHigh) {
  const n = frames.length;
  const positions = [], normals = [], uvs = [], indices = [];
  const dirSign = offset > 0 ? -1 : 1;
  for (let i = 0; i < n; i++) {
    const f = frames[i];
    const p = f.pos.clone().add(f.left.clone().multiplyScalar(offset));
    positions.push(p.x, yLow, p.z, p.x, yHigh, p.z);
    uvs.push(0, i / 8, 1, i / 8);
    const nx = f.left.x * dirSign, nz = f.left.z * dirSign;
    normals.push(nx, 0, nz, nx, 0, nz);
  }
  for (let i = 0; i < n; i++) {
    const a = i * 2, b = i * 2 + 1, c = ((i + 1) % n) * 2, d = ((i + 1) % n) * 2 + 1;
    indices.push(a, c, b, b, c, d);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
  g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
  g.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), 3));
  g.setIndex(indices);
  return g;
}

// ---------- City skyline ----------

// A facade tile: grid of windows on a dark curtain wall, a mix lit warm (dusk),
// some cool sky-reflection, the rest dark. Used as both diffuse and emissive
// map so the lit windows glow.
function makeWindowTexture(cols, rows, baseHex) {
  const w = 128, h = 256;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.fillStyle = baseHex || '#2a2f38';
  ctx.fillRect(0, 0, w, h);
  const mx = w / cols, my = h / rows;
  for (let r = 0; r < rows; r++) {
    for (let q = 0; q < cols; q++) {
      const lit = Math.random();
      let col;
      if (lit > 0.6) col = `rgb(255,${(200 + Math.random() * 45) | 0},${(135 + Math.random() * 60) | 0})`;
      else if (lit > 0.46) col = `rgb(${(95 + Math.random() * 40) | 0},${(120 + Math.random() * 40) | 0},${(150 + Math.random() * 50) | 0})`;
      else col = 'rgb(16,20,26)';
      ctx.fillStyle = col;
      ctx.fillRect(q * mx + mx * 0.16, r * my + my * 0.16, mx * 0.68, my * 0.62);
    }
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}

function addCityBuildings(scene, frames, D) {
  // A handful of shared facade tiles; per-building UVs are scaled so each tower
  // tiles the right number of floors/bays without cloning the texture.
  const tints = ['#262b34', '#2e2a2a', '#222a30', '#30303a', '#283034', '#2b2622'];
  const texes = tints.map((t) => makeWindowTexture(6, 8, t));
  const roofMat = new THREE.MeshStandardMaterial({
    color: 0x1b1f25, roughness: 0.8, metalness: 0.25,
  });
  const n = frames.length;
  const step = Math.max(6, Math.floor(n / 50));
  for (let i = 0; i < n; i += step) {
    for (const sign of [+1, -1]) {
      if (Math.random() < 0.3) continue;
      const f = frames[i];
      const depth = 12 + Math.random() * 24;
      const width = 16 + Math.random() * 30;
      const height = 18 + Math.random() * 66;
      const setback = D.armco + 6 + Math.random() * 24 + depth / 2;
      const pos = f.pos.clone().add(f.left.clone().multiplyScalar(sign * setback));
      const yaw = Math.atan2(f.tan.x, f.tan.z);

      const geo = new THREE.BoxGeometry(width, height, depth);
      geo.translate(0, height / 2, 0);
      const uv = geo.getAttribute('uv');
      const fx = Math.max(2, Math.round(width / 6));
      const fy = Math.max(3, Math.round(height / 4));
      for (let v = 0; v < uv.count; v++) uv.setXY(v, uv.getX(v) * fx, uv.getY(v) * fy);

      const tex = texes[(Math.random() * texes.length) | 0];
      const mat = new THREE.MeshStandardMaterial({
        map: tex, emissive: 0xfff0d8, emissiveMap: tex, emissiveIntensity: 0.5,
        roughness: 0.55, metalness: 0.2, envMapIntensity: 0.6,
      });
      const g = new THREE.Group();
      const tower = new THREE.Mesh(geo, mat);
      tower.castShadow = true;
      tower.receiveShadow = true;
      g.add(tower);
      const roof = new THREE.Mesh(
        new THREE.BoxGeometry(width + 0.4, 1.3, depth + 0.4), roofMat);
      roof.position.y = height;
      roof.castShadow = true;
      g.add(roof);
      g.position.copy(pos);
      g.rotation.y = yaw;
      scene.add(g);
    }
  }
}

// ---------- Desert rock formations ----------

function addRocks(scene, frames, D) {
  // Craggy boulders: one deformed icosahedron, instanced with per-rock scale,
  // tilt and a reddish colour wash, scattered off the racing surface.
  const base = new THREE.IcosahedronGeometry(1, 0).toNonIndexed();
  const bp = base.getAttribute('position');
  for (let v = 0; v < bp.count; v++) {
    const dx = (fractalNoise(bp.getX(v) * 1.7 + 3, bp.getZ(v) * 1.7 + 1, 3) - 0.5) * 0.7;
    bp.setXYZ(v, bp.getX(v) * (1 + dx), bp.getY(v) * (1 + dx * 0.6), bp.getZ(v) * (1 + dx));
  }
  base.computeVertexNormals();
  const rockMat = new THREE.MeshStandardMaterial({
    roughness: 0.96, metalness: 0, flatShading: true, envMapIntensity: 0.3,
  });
  const N = 150;
  const inst = new THREE.InstancedMesh(base, rockMat, N);
  inst.castShadow = true;
  inst.receiveShadow = true;
  const m = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const s = new THREE.Vector3();
  const e = new THREE.Euler();
  const col = new THREE.Color();
  const extent = 440;
  let placed = 0;
  for (let i = 0; i < N * 5 && placed < N; i++) {
    const x = (Math.random() * 2 - 1) * extent;
    const z = (Math.random() * 2 - 1) * extent;
    const p = new THREE.Vector3(x, 0, z);
    let minD = Infinity;
    for (let k = 0; k < frames.length; k += 6) {
      const d = p.distanceToSquared(frames[k].pos);
      if (d < minD) minD = d;
    }
    if (minD < (D.armco + 5) * (D.armco + 5)) continue;
    const dist = Math.sqrt(minD);
    if (dist > 120 && Math.random() < ((dist - 120) / (extent - 120)) * 0.6) continue;
    const sc = 1.0 + Math.random() * 4.5;
    s.set(sc * (0.8 + Math.random() * 0.6), sc * (0.5 + Math.random() * 0.7), sc * (0.8 + Math.random() * 0.6));
    e.set((Math.random() - 0.5) * 0.5, Math.random() * Math.PI * 2, (Math.random() - 0.5) * 0.5);
    q.setFromEuler(e);
    p.y = -0.3 * sc;
    m.compose(p, q, s);
    inst.setMatrixAt(placed, m);
    col.setHSL(0.045 + Math.random() * 0.03, 0.45 + Math.random() * 0.18, 0.30 + Math.random() * 0.12);
    inst.setColorAt(placed, col);
    placed++;
  }
  inst.count = placed;
  inst.instanceMatrix.needsUpdate = true;
  if (inst.instanceColor) inst.instanceColor.needsUpdate = true;
  scene.add(inst);

  // A few larger flat-topped buttes for drama, set further back.
  const butteMat = new THREE.MeshStandardMaterial({
    vertexColors: true, roughness: 0.97, metalness: 0, envMapIntensity: 0.3,
  });
  const strata = [new THREE.Color(0x8a4a2c), new THREE.Color(0xa9663a), new THREE.Color(0xc08a55)];
  for (let i = 0; i < 7; i++) {
    const a = (i / 7) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
    const r = 240 + Math.random() * 260;
    const h = 60 + Math.random() * 90;
    const topR = 26 + Math.random() * 30;
    const geo = new THREE.CylinderGeometry(topR, topR * 1.5, h, 18, 6);
    const pos = geo.getAttribute('position');
    const colors = [];
    const tmp = new THREE.Color();
    for (let v = 0; v < pos.count; v++) {
      const yFrac = (pos.getY(v) + h / 2) / h;
      // erode the sides a little so the silhouette isn't a clean cylinder
      const ang = Math.atan2(pos.getZ(v), pos.getX(v));
      const er = 0.9 + fractalNoise(ang * 2.5 + i, yFrac * 3, 3) * 0.22;
      pos.setX(v, pos.getX(v) * er);
      pos.setZ(v, pos.getZ(v) * er);
      const bandIdx = Math.max(0, Math.min(strata.length - 1,
        Math.floor(yFrac * strata.length + fractalNoise(ang * 4, yFrac * 6, 2) * 0.6)));
      const band = strata[bandIdx];
      tmp.copy(band).multiplyScalar(0.85 + yFrac * 0.2);
      colors.push(tmp.r, tmp.g, tmp.b);
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    const butte = new THREE.Mesh(geo, butteMat);
    butte.position.set(Math.cos(a) * r, h / 2 - 4, Math.sin(a) * r);
    butte.castShadow = true;
    butte.receiveShadow = true;
    scene.add(butte);
  }
}
