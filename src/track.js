import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import {
  smoothstep, fractalNoise, makeTileable, makeNoiseTexture, makeNormalTexture,
  hideFromOverridePasses,
} from './scenery/noise.js';
import { makeTerrain } from './scenery/terrain.js';
import { addDistantMountains } from './scenery/mountains.js';
import { addCloudscape } from './scenery/clouds.js';
import { scatterTrees } from './scenery/trees.js';
import { addArmco, addTireStacks, addConcreteWall } from './scenery/barriers.js';
import { addGrandstands, addPitComplex } from './scenery/stands.js';
import { addGroundCover } from './scenery/groundcover.js';
import {
  roadCrownY, buildRoadGeometry, buildEdgeLineGeometry, buildKerb3DGeometry,
  addSkidMarks, makeAsphaltMaterial, makeKerbMaterial, makeVergeMaterial,
} from './scenery/roadwork.js';

// Stable per-circuit seed so a track's hills are the same every reload.
function strSeed(s) {
  let h = 0;
  for (let i = 0; i < String(s).length; i++) h = (h * 31 + String(s).charCodeAt(i)) | 0;
  return (h >>> 0) % 9973;
}

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
  // Rolling displaced terrain, dead flat inside the circuit corridor (see
  // scenery/terrain.js). `terrain.height(x, z)` is the seat every scenery
  // builder must use so nothing floats over a hollow or sinks into a rise.
  const groundMat = makeGroundMaterial(theme.ground || 'grass');
  const terrain = makeTerrain(frames, {
    ground: theme.ground || 'grass',
    armco: ARMCO_OFFSET,
    seed: strSeed(def.id),
    material: groundMat,
  });
  group.add(terrain.mesh);
  D.terrain = terrain;

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

  // Start/finish gantry (carries the five-column start-light rig)
  const startLights = addStartGantry(group, frames[0], ROAD_WIDTH);

  // ---- Outer barrier (visual) — style varies by circuit ----
  if (theme.barrier === 'wall') addConcreteWall(group, frames, ARMCO_OFFSET);
  else addArmco(group, frames, ARMCO_OFFSET, { style: theme.barrier || 'armco', terrain });

  // Tire stacks at high-curvature corner exits
  if (theme.tireStacks) addTireStacks(group, frames, curvature, ARMCO_OFFSET - 1.4);

  // Sponsor boards behind the barrier
  if (theme.sponsors) addSponsorBoards(group, frames, ARMCO_OFFSET + 1.6);

  // Pit complex + debris fencing along the main straight
  if (theme.pit) addPitComplex(group, frames[0], D);   // D: complex slides out on wide circuits
  if (theme.catchFence) addCatchFence(group, frames, D);

  // Brake-distance marker boards before the heavy corners
  if (theme.brakeMarkers) addBrakeMarkers(group, frames, curvature, D);

  // ---- Scenery (theme-selected) ----
  if (theme.trees) scatterTrees(group, frames, { ...theme.trees, terrain });
  if (theme.sidewalks) addSidewalks(group, frames, D);
  if (theme.buildings) addCityBuildings(group, frames, D);
  if (theme.skyline) addCitySkyline(group, frames);
  if (theme.marina) addMarina(group, frames, D);
  if (theme.streetlights) addStreetlights(group, frames, D);
  if (theme.crosswalks) addCrosswalks(group, frames, curvature, ROAD_WIDTH);
  if (theme.mountains) addDistantMountains(group, theme.mountains, terrain);
  if (theme.grandstands) addGrandstands(group, frames, D);
  if (theme.rocks) addRocks(group, frames, D);
  if (theme.scrub) addScrub(group, frames, D);
  if (theme.farmland) addFarmland(group, frames, D);
  if (theme.huts) addAlpineHuts(group, frames, D);
  if (theme.marshals) addMarshalPosts(group, frames, curvature, D);
  addGroundCover(group, frames, D, { ground: theme.ground || 'grass', terrain });
  if (theme.clouds !== false) {
    addCloudscape(group, {
      id: def.id,
      haze: theme.fog ? theme.fog[0] : 0xc8bba6,
      center: terrain.centre,
    });
  }

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
    // The gantry's start-light rig: `set(n)` lights the first n of five red
    // columns (0 = all out = go). Driven by the race-start sequence in main.js.
    startLights,
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

// Force a flat strip's triangles to face UP, measured rather than reasoned
// about. Which index order points up depends on the handedness of `left` and
// on which side of the track the strip was mirrored onto, and this project has
// now shipped that bug three times (gravel traps as charcoal slabs, the white
// edge lines drawing as nothing, a seam ribbon visible only through the glass).
// Building the strip either way and flipping if the result faces down is
// immune to all of it.
function ensureFaceUp(geo) {
  const pos = geo.getAttribute('position');
  const idx = geo.getIndex();
  if (!pos || !idx) return geo;
  let sum = 0;
  for (let t = 0; t + 2 < idx.count; t += 3) {
    const i0 = idx.getX(t), i1 = idx.getX(t + 1), i2 = idx.getX(t + 2);
    const ax = pos.getX(i0), az = pos.getZ(i0);
    const ux = pos.getX(i1) - ax, uz = pos.getZ(i1) - az;
    const vx = pos.getX(i2) - ax, vz = pos.getZ(i2) - az;
    sum += uz * vx - ux * vz;          // y component of u x v
  }
  if (sum < 0) {
    const a = idx.array;
    for (let t = 0; t + 2 < a.length; t += 3) { const tmp = a[t + 1]; a[t + 1] = a[t + 2]; a[t + 2] = tmp; }
    idx.needsUpdate = true;
  }
  geo.computeVertexNormals();
  return geo;
}

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
      // Winding is fixed up after the fact by ensureFaceUp(): mirroring the
      // lateral offset mirrors the strip, and the hand-written per-side flip
      // that used to live here was wrong for one of the two branches — three
      // of parco's four traps rendered unlit as charcoal slabs on the grass.
      if (k > z.i0) indices.push(vi - 2, vi, vi - 1, vi - 1, vi, vi + 1);
      vi += 2;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), 2));
    g.setIndex(indices);
    ensureFaceUp(g);
    const mesh = new THREE.Mesh(g, mat);
    mesh.receiveShadow = true;
    scene.add(mesh);
  }
}

// ---------- Materials ----------

function makeGrassMaterial() {
  // Multi-scale grass: micro blade noise, macro patchiness, dry/wet variation,
  // subtle mowing bands. Richer saturation for a well-maintained circuit.
  // makeTileable folds the noise across the tile edges — the raw texture
  // repeats ~38× over the terrain and every seam printed a plaid grid on
  // overhead views.
  const tex = makeNoiseTexture(1024, makeTileable((x, y) => {
    const blades = fractalNoise(x * 65, y * 65, 5);
    const patch = fractalNoise(x * 5 + 9, y * 5 + 3, 4);
    const dry = fractalNoise(x * 11 + 31, y * 11 + 17, 3);
    const lush = fractalNoise(x * 3 + 2, y * 3 + 7, 3);   // large wet/dry patches
    // Soft mowing stripes (smooth, not hard-edged) — a groundskept circuit
    // infield reads as alternating light/dark bands of cut grass.
    const mow = 1 + 0.05 * Math.sin(x * Math.PI * 8);
    // Richer, slightly darker base with bigger wet/dry swings so the field
    // isn't a single flat green from the cockpit. Stronger dry-yellow patches
    // and more macro contrast break up the uniform "video-game green".
    let g = (0.205 + blades * 0.15 + patch * 0.15 + lush * 0.11 + dry * 0.05) * mow;
    let r = g * (0.52 + dry * 0.42);
    let b = g * (0.35 + lush * 0.11);
    return [r, g, b];
  }));
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

function makeGravelMaterial() {
  const tex = makeNoiseTexture(512, (x, y) => {
    const n = fractalNoise(x * 40, y * 40, 4);
    const rake = 1 + 0.05 * Math.sin(y * Math.PI * 50);
    // Pale limestone gravel: with the low sun, horizontal surfaces live off
    // ambient light, so the albedo must be bright for the trap to read sandy.
    const v = (0.62 + n * 0.24) * rake;
    return [v * 1.04, v * 0.96, v * 0.74];
  });
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.MeshStandardMaterial({
    map: tex,
    roughness: 1.0,
    metalness: 0,
    envMapIntensity: 0.55,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
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

// Back of a trackside hoarding: weathered galvanised sheet with panel seams
// and two horizontal support rails — what cameras behind the board see.
function makeBoardBackTexture() {
  const w = 512, h = 96;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#7e8288'; ctx.fillRect(0, 0, w, h);
  // vertical sheet panels with a dark seam between each
  for (let x = 0; x < w; x += 64) {
    ctx.fillStyle = (x / 64) % 2 ? '#787c82' : '#83878d';
    ctx.fillRect(x, 0, 64, h);
    ctx.fillStyle = 'rgba(30,32,36,0.45)';
    ctx.fillRect(x, 0, 2, h);
  }
  // rain-grime streaks running down the sheets
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * w;
    ctx.fillStyle = `rgba(40,44,48,${0.04 + Math.random() * 0.08})`;
    ctx.fillRect(x, 0, 1 + Math.random() * 3, h);
  }
  // two horizontal steel rails with a catch-light above and shadow below
  for (const y of [h * 0.26, h * 0.74]) {
    ctx.fillStyle = '#565a60'; ctx.fillRect(0, y - 4, w, 9);
    ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.fillRect(0, y - 4, w, 2);
    ctx.fillStyle = 'rgba(0,0,0,0.35)'; ctx.fillRect(0, y + 5, w, 2);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

// Ribbed roller-shutter door for the pit garages — light industrial steel with
// horizontal slats, a soft left-to-right sheen, and a small handle band.
function makeRollerDoorTexture() {
  const w = 96, h = 128;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  // A mid steel grey, clearly darker than the pale concrete wall, with a
  // left-to-right sheen so the door reads as curved sheet metal.
  const grad = ctx.createLinearGradient(0, 0, w, 0);
  grad.addColorStop(0.0, '#2b2e34');
  grad.addColorStop(0.5, '#565b62');
  grad.addColorStop(1.0, '#33363c');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
  // Horizontal slats with a strong groove shadow and a catch-light beneath, so
  // the ribbing still reads from across the track.
  const slats = 15;
  for (let i = 1; i < slats; i++) {
    const y = Math.round((i * h) / slats);
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, y - 1, w, 2);
    ctx.fillStyle = 'rgba(255,255,255,0.16)';
    ctx.fillRect(0, y + 1, w, 1);
  }
  // Pull handle band near the bottom.
  ctx.fillStyle = '#2c2e33';
  ctx.fillRect(0, h - 18, w, 6);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

// ---------- Scenery ----------

// Ground height at a world point, or 0 when the circuit has no terrain object
// (a few callers run before it is built). Every scenery builder that places
// anything beyond `terrain.flatR` from the centreline must go through this —
// the ground is no longer a flat plane, so a hard-coded y=0 floats or sinks.
function groundY(D, x, z) {
  return D && D.terrain ? D.terrain.height(x, z) : 0;
}

// A horizontal quad DRAPED over the terrain: a flat PlaneGeometry the size of a
// crop field would bury half of itself in a rise and hover over the next
// hollow, so the patch is subdivided and every vertex is dropped onto the
// ground. `lift` keeps it just clear of the terrain skin (z-fighting).
function drapeQuad(D, px, pz, w, d, rotY, lift = 0.05, cell = 9) {
  const nx = Math.max(1, Math.round(w / cell));
  const nz = Math.max(1, Math.round(d / cell));
  const geo = new THREE.PlaneGeometry(w, d, nx, nz);
  geo.rotateX(-Math.PI / 2);
  if (rotY) geo.rotateY(rotY);
  const pos = geo.getAttribute('position');
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i) + px, z = pos.getZ(i) + pz;
    pos.setY(i, groundY(D, x, z) + lift);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

// Distance from a ground point to the nearest sampled centreline frame.
// Every scenery builder must clear the WHOLE circuit with this (its own
// footprint radius + the barrier offset + a margin) — checking only the local
// frame is how buttes and buildings ended up standing on other road sections.
function distToTrack(frames, x, z) {
  let min = Infinity;
  for (let k = 0; k < frames.length; k += 2) {
    const p = frames[k].pos;
    const d = (p.x - x) * (p.x - x) + (p.z - z) * (p.z - z);
    if (d < min) min = d;
  }
  return Math.sqrt(min);
}

// ---------- City environment (street circuit) ----------

// One facade tile = 6 window bays × 8 floors. Buildings scale their UVs so a
// repeat spans ~13 m × 24 m (3 m floors) — the old mapping tiled a repeat
// every 4 m of height, which gave every tower doll's-house 0.5 m windows.
//   curtain — dark curtain wall, glass grid, a scatter of lit rooms
//   masonry — warm plaster, punched window rows, string courses
//   glass   — full-height mirrored glazing strips, no lit rooms
function makeFacadeTexture(kind, base, litFrac = 0.10) {
  const w = 128, h = 256;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);
  if (kind === 'glass') {
    // vertical glazing strips with a diagonal sky sheen
    for (let q = 0; q < 8; q++) {
      const x0 = q * 16;
      const g = ctx.createLinearGradient(x0, 0, x0 + 13, h);
      g.addColorStop(0, '#9db4c6');
      g.addColorStop(0.45, '#6e8496');
      g.addColorStop(0.55, '#b9cbd8');
      g.addColorStop(1, '#556878');
      ctx.fillStyle = g;
      ctx.fillRect(x0 + 2, 0, 12, h);
    }
    // floor shadow lines through the glazing
    ctx.fillStyle = 'rgba(20,26,32,0.5)';
    for (let r = 0; r < 8; r++) ctx.fillRect(0, r * 32, w, 2);
  } else {
    const mx = w / 6, my = h / 8;
    for (let r = 0; r < 8; r++) {
      for (let q = 0; q < 6; q++) {
        const roll = Math.random();
        let col;
        if (roll < litFrac) col = `rgb(255,${(208 + Math.random() * 35) | 0},${(150 + Math.random() * 55) | 0})`;
        else if (roll < litFrac + 0.30) col = `rgb(${(88 + Math.random() * 34) | 0},${(108 + Math.random() * 36) | 0},${(132 + Math.random() * 44) | 0})`;
        else col = `rgb(${(18 + Math.random() * 10) | 0},${(22 + Math.random() * 10) | 0},${(28 + Math.random() * 10) | 0})`;
        ctx.fillStyle = col;
        if (kind === 'masonry') {
          ctx.fillRect(q * mx + mx * 0.20, r * my + my * 0.22, mx * 0.60, my * 0.52);
          // sill under each window
          ctx.fillStyle = 'rgba(255,255,255,0.16)';
          ctx.fillRect(q * mx + mx * 0.16, r * my + my * 0.76, mx * 0.68, 2);
        } else {
          ctx.fillRect(q * mx + mx * 0.12, r * my + my * 0.14, mx * 0.76, my * 0.64);
        }
      }
      if (kind === 'masonry') {
        // string course between floors
        ctx.fillStyle = 'rgba(0,0,0,0.22)';
        ctx.fillRect(0, r * my, w, 2);
      }
    }
  }
  // weathering streaks
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * w;
    ctx.fillStyle = `rgba(10,12,14,${0.02 + Math.random() * 0.05})`;
    ctx.fillRect(x, 0, 1 + Math.random() * 2, h);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}

// Ground-floor retail band: glazed storefronts, doors, coloured awnings.
function makeStorefrontTexture() {
  const w = 256, h = 64;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#3a3d42'; ctx.fillRect(0, 0, w, h);
  const awnings = ['#8e3232', '#2f5d43', '#31517a', '#8a6a2c', '#54406e'];
  let x = 0;
  while (x < w - 8) {
    const shopW = 34 + (Math.random() * 30) | 0;
    // glazing
    ctx.fillStyle = '#1d2830';
    ctx.fillRect(x + 3, 16, shopW - 6, h - 22);
    ctx.fillStyle = 'rgba(150,180,200,0.25)';
    ctx.fillRect(x + 5, 18, (shopW - 10) * 0.4, h - 26);
    // door
    ctx.fillStyle = '#11181d';
    ctx.fillRect(x + shopW * 0.62, 20, 10, h - 26);
    // awning / fascia
    ctx.fillStyle = awnings[(Math.random() * awnings.length) | 0];
    ctx.fillRect(x + 1, 6, shopW - 2, 9);
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.fillRect(x + 4, 8, shopW * 0.4, 3);
    x += shopW;
  }
  // pavement shadow line at the very bottom
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.fillRect(0, h - 4, w, 4);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}


// True if an axis-aligned rectangle (grown by `margin` on every side) holds
// no sampled centreline point — the honest "does this footprint touch ANY
// part of the circuit corridor" test.
function rectClearOfTrack(frames, px, pz, hw, hd, margin) {
  for (let k = 0; k < frames.length; k += 2) {
    const p = frames[k].pos;
    if (Math.abs(p.x - px) < hw + margin && Math.abs(p.z - pz) < hd + margin) return false;
  }
  return true;
}

function addCatchFence(scene, frames, D) {
  // Galvanised posts + dark woven-wire mesh: real debris fencing reads as a
  // faint grey veil, not white plastic tape.
  const postMat = new THREE.MeshStandardMaterial({
    color: 0x3f4449, roughness: 0.55, metalness: 0.75,
  });
  const meshMat = new THREE.MeshStandardMaterial({
    color: 0x24272b,
    roughness: 0.8,
    metalness: 0.3,
    transparent: true,
    opacity: 0.22,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  // Collect frames on the start straight by arc distance from the line
  // (−55 m behind it to +135 m past it), whatever its world position — the
  // old world-coordinate test only matched circuits whose straight sat at x≈0.
  const arcs = computeArcLengths(frames);
  const total = arcs[frames.length - 1] +
    frames[0].pos.distanceTo(frames[frames.length - 1].pos);
  const idxs = [];
  for (let i = 0; i < frames.length; i++) {
    if (arcs[i] < 135 || arcs[i] > total - 55) idxs.push(i);
  }
  if (!idxs.length) return;

  // The straight crosses the lap seam, so the collected indices form up to
  // two contiguous runs. Stitch quads within a run only: a quad bridging the
  // gap spanned the whole straight with flipped winding, and the averaged
  // normals at the seam rendered as a solid black slab in the fence.
  const runs = [];
  let run = [idxs[0]];
  for (let k = 1; k < idxs.length; k++) {
    if (idxs[k] === idxs[k - 1] + 1) run.push(idxs[k]);
    else { runs.push(run); run = [idxs[k]]; }
  }
  runs.push(run);
  // If the runs meet across the frame-array seam, join them into one so the
  // fence has no gap at the start line.
  if (runs.length > 1) {
    const first = runs[0], last = runs[runs.length - 1];
    if (first[0] === 0 && last[last.length - 1] === frames.length - 1) {
      runs[0] = last.concat(first);
      runs.pop();
    }
  }

  const postGeo = new THREE.BoxGeometry(0.14, 3.1, 0.14);
  const posts = new THREE.InstancedMesh(postGeo, postMat, idxs.length * 2);
  posts.castShadow = true;
  const m4 = new THREE.Matrix4();
  const q4 = new THREE.Quaternion();
  const s4 = new THREE.Vector3(1, 1, 1);
  let pi = 0;

  for (const sign of [+1, -1]) {
    for (const runIdxs of runs) {
      const positions = [];
      const normals = [];
      const indices = [];
      let vi = 0;
      for (let k = 0; k < runIdxs.length; k++) {
        const f = frames[runIdxs[k]];
        const p = f.pos.clone().add(f.left.clone().multiplyScalar(sign * (D.armco + 0.45)));
        if (k % 2 === 0) {
          q4.setFromEuler(new THREE.Euler(0, Math.atan2(f.tan.x, f.tan.z), 0));
          m4.compose(new THREE.Vector3(p.x, 1.55, p.z), q4, s4);
          posts.setMatrixAt(pi++, m4);
        }
        positions.push(p.x, 0.85, p.z, p.x, 3.05, p.z);
        // Analytic normal facing back at the track — averaging face normals
        // is what let the seam quad zero them out.
        const nx = -sign * f.left.x, nz = -sign * f.left.z;
        normals.push(nx, 0, nz, nx, 0, nz);
        if (k > 0) indices.push(vi - 2, vi, vi - 1, vi - 1, vi, vi + 1);
        vi += 2;
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
      g.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), 3));
      g.setIndex(indices);
      const fence = new THREE.Mesh(g, meshMat);
      // Keep the translucent weave out of the GTAO prepass, where it would
      // land as an opaque wall and darken everything seen through it.
      hideFromOverridePasses(fence);
      scene.add(fence);
    }
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
  // Shared back panel — plain weathered white, so the board is finished from
  // behind instead of showing a mirrored unlit number.
  const backMat = new THREE.MeshStandardMaterial({ color: 0xc9cbcd, roughness: 0.75, metalness: 0 });
  const boardGeo = new THREE.PlaneGeometry(1.15, 0.85);
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
        boardGeo,
        new THREE.MeshStandardMaterial({
          map: makeMarkerTexture(String(dist)), roughness: 0.5, metalness: 0,
        })
      );
      board.position.set(pos.x, 1.5, pos.z);
      board.rotation.y = yaw;
      board.castShadow = true;
      scene.add(board);
      // Sit the back panel a couple of centimetres behind the face so the
      // two planes never z-fight.
      const back = new THREE.Mesh(boardGeo, backMat);
      back.position.set(pos.x - Math.sin(yaw) * 0.02, 1.5, pos.z - Math.cos(yaw) * 0.02);
      back.rotation.y = yaw + Math.PI;
      scene.add(back);
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.1, 0.08), postMat);
      post.position.set(pos.x, 0.55, pos.z);
      scene.add(post);
    }
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
  // A PlaneGeometry faces +Z, and the gantry group is yawed so +Z is the
  // track's DIRECTION OF TRAVEL — i.e. away from the cars approaching the
  // line. Un-rotated, every driver reads "XIRP DNARG RECAR" through the back
  // of the cloth. Turn it to face oncoming traffic.
  banner.rotation.y = Math.PI;
  group.add(banner);

  // Start-light rig, hung off the FRONT chord of the truss (z −0.42) so it
  // hangs clear of the banner plane at z 0 rather than through it. Five
  // columns of two red lamps, the F1 arrangement: the columns light one at a
  // time and then all go out together, which is the start signal.
  const lampMats = [];
  {
    const COLS = 5;
    const COL_STEP = 1.15;
    const rigY = 6.2;                 // below the banner (7.05–8.15), above the cars
    const rigZ = -0.42;               // the −Z face is the one oncoming cars see
    const rigH = 1.36;
    const boxW = COLS * COL_STEP - 0.45;
    const housing = new THREE.Mesh(
      new THREE.BoxGeometry(boxW, rigH, 0.34), dark);
    housing.position.set(0, rigY, rigZ);
    housing.castShadow = true;
    group.add(housing);

    // Two droppers back up to the truss's lower front chord (y = H − 0.4).
    for (const sx of [-1, 1]) {
      const top = H - 0.4;
      const bot = rigY + rigH / 2;
      const drop = new THREE.Mesh(
        new THREE.BoxGeometry(0.1, top - bot, 0.1), steel);
      drop.position.set(sx * 1.6, (top + bot) / 2, rigZ);
      group.add(drop);
    }

    // Lenses sit a hair proud of the housing's front face and are turned to
    // face −Z (a CircleGeometry faces +Z un-rotated, same trap as the banner).
    const lensGeo = new THREE.CircleGeometry(0.2, 20);
    const faceZ = rigZ - 0.34 / 2 - 0.012;
    for (let i = 0; i < COLS; i++) {
      // One material per column, shared by that column's two lamps, so the
      // sequence is a single emissiveIntensity write per column.
      const mat = new THREE.MeshStandardMaterial({
        color: 0x2b0a0b, emissive: 0xff1f14, emissiveIntensity: 0,
        roughness: 0.32, metalness: 0.0,
      });
      lampMats.push(mat);
      for (const oy of [0.33, -0.33]) {
        const lamp = new THREE.Mesh(lensGeo, mat);
        // Column 0 is the DRIVER'S LEFT, so the sequence reads left-to-right
        // from the grid. The camera looks down +Z at the rig's −Z face, which
        // mirrors local x: laying columns out in +x order lights them
        // right-to-left on screen, which is backwards.
        lamp.position.set(((COLS - 1) / 2 - i) * COL_STEP, rigY + oy, faceZ);
        lamp.rotation.y = Math.PI;
        group.add(lamp);
      }
    }
  }

  group.position.copy(center);
  group.rotation.y = yaw;
  scene.add(group);

  const LIT = 1.35;
  return {
    // n = how many of the five columns are lit, from the driver's left.
    set(n) {
      for (let i = 0; i < lampMats.length; i++) {
        lampMats[i].emissiveIntensity = i < n ? LIT : 0;
      }
    },
    litCount() {
      return lampMats.filter((m) => m.emissiveIntensity > 0).length;
    },
  };
}

function addSponsorBoards(scene, frames, offset) {
  const logos = makeSponsorTextures();
  const faceMats = logos.map((map) => new THREE.MeshStandardMaterial({
    map, roughness: 0.5, metalness: 0.1,
  }));
  // The frame doubles as the board's back panel — galvanised sheet with
  // visible support rails, so from behind it reads as a built hoarding
  // rather than a flat untextured slab.
  const frameMat = new THREE.MeshStandardMaterial({
    map: makeBoardBackTexture(), roughness: 0.78, metalness: 0.25,
  });
  const legMat = new THREE.MeshStandardMaterial({
    color: 0x4a4e54, roughness: 0.7, metalness: 0.4,
  });
  const boardGeo = new THREE.BoxGeometry(8, 1.2, 0.16);
  // Slightly oversized frame behind the face gives the hoarding a lip.
  const frameGeo = new THREE.BoxGeometry(8.4, 1.6, 0.12);
  // Chunky posts near the panel ends, sunk into the ground — the old 0.12 m
  // legs vanished at any distance and left the panel "floating" on the grass.
  const legGeo = new THREE.BoxGeometry(0.24, 2.1, 0.24);
  const N = 22;
  const step = Math.floor(frames.length / N);
  for (let i = 0; i < frames.length; i += step) {
    if (Math.random() < 0.35) continue;
    const f = frames[i];
    const sign = Math.random() < 0.5 ? +1 : -1;
    const pos = f.pos.clone().add(f.left.clone().multiplyScalar(sign * offset));
    // A hoarding is 8 m of panel running ALONG the track with its face turned
    // to the racing surface. `yaw` (the direction of travel) put the box's
    // 8 m X axis ACROSS the track — the boards stuck out of the barrier like
    // fins and aimed their logos down the road at nobody. Face inward instead:
    // the panel's +Z is the inward normal, so X ends up along the track.
    const yaw = Math.atan2(-sign * f.left.x, -sign * f.left.z);
    const mat = faceMats[Math.floor(Math.random() * faceMats.length)];
    const board = new THREE.Mesh(boardGeo, mat);
    board.position.set(pos.x, 1.45, pos.z);
    board.rotation.y = yaw;
    board.castShadow = true;
    board.receiveShadow = true;
    scene.add(board);
    const frame = new THREE.Mesh(frameGeo, frameMat);
    frame.position.set(pos.x, 1.45, pos.z);
    frame.rotation.y = yaw;
    frame.translateZ(-0.05);
    frame.castShadow = true;
    scene.add(frame);
    // Posts sit close to the panel ends so nothing overhangs unsupported.
    for (const sx of [-3.7, 3.7]) {
      const leg = new THREE.Mesh(legGeo, legMat);
      const sideOffset = new THREE.Vector3(
        f.tan.x * sx, 0, f.tan.z * sx
      );
      leg.position.set(pos.x + sideOffset.x, 0.9, pos.z + sideOffset.z);
      leg.rotation.y = yaw;
      leg.castShadow = true;
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
  let mat, colourTileM, normalTileM;
  if (kind === 'city') {
    mat = makeCityGroundMaterial(); colourTileM = 26; normalTileM = 5.5;
  } else if (kind === 'sand') {
    mat = makeSandMaterial(); colourTileM = 42; normalTileM = 9;
  } else {
    mat = makeGrassMaterial(); colourTileM = 34; normalTileM = 6.5;
    // Alpine: same lush grass map, multiplied toward a cooler, deeper meadow.
    if (kind === 'alpine') mat.color = new THREE.Color(0xaec4a6);
  }
  // The terrain mesh carries UVs in world METRES (see scenery/terrain.js), so
  // repeat is 1/tile-size rather than a count across a 0..1 plane. Tiles are
  // deliberately much tighter than the old 4 km plane allowed (105 m per grass
  // tile there — the reason the infield read as a smooth painted sheet).
  mat.map.repeat.set(1 / colourTileM, 1 / colourTileM);
  if (mat.normalMap) mat.normalMap.repeat.set(1 / normalTileM, 1 / normalTileM);
  if (mat.roughnessMap) mat.roughnessMap.repeat.set(1 / colourTileM, 1 / colourTileM);
  // The terrain bakes macro dry/lush patches, height and slope shading into
  // vertex colours — this is what stops the tighter tile from reading as a
  // repeating stamp.
  mat.vertexColors = true;
  return mat;
}

// Broad expanse of city pavement/plaza concrete around a street circuit.
function makeCityGroundMaterial() {
  const tex = makeNoiseTexture(1024, makeTileable((x, y) => {
    const grain = fractalNoise(x * 30, y * 30, 4);
    const patch = fractalNoise(x * 5 + 2, y * 5 + 9, 3);
    const stain = fractalNoise(x * 2 + 7, y * 2 + 1, 3);
    // Light urban concrete — the old 0.205 base rendered as a black void
    // around the whole circuit.
    const v = 0.315 + grain * 0.07 + patch * 0.06 - stain * 0.06;
    return [v * 0.99, v, v * 1.03];
  }));
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
  const tex = makeNoiseTexture(1024, makeTileable((x, y) => {
    const grain = fractalNoise(x * 40, y * 40, 4);
    const dune = fractalNoise(x * 3 + 5, y * 3 + 2, 3);
    const ripple = 0.5 + 0.5 * Math.sin(y * Math.PI * 58 + dune * 6);
    let v = 0.52 + grain * 0.10 + dune * 0.10;
    v *= 0.97 + 0.05 * ripple;
    return [v * 1.08, v * 0.93, v * 0.66];
  }));
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
function addCityBuildings(scene, frames, D) {
  // The street layout is axis-aligned (Baku-style 90° blocks), so buildings
  // snap to the same axes and to a 6 m grid: real city fabric, no random-yaw
  // towers clipping through each other, and an occupancy set plus a
  // whole-circuit footprint test keep every lot off every road section.
  const GRID = 6;
  const occupied = new Set();
  const cellsFor = (px, pz, hw, hd) => {
    const keys = [];
    for (let cx = Math.floor((px - hw) / GRID); cx <= Math.floor((px + hw) / GRID); cx++) {
      for (let cz = Math.floor((pz - hd) / GRID); cz <= Math.floor((pz + hd) / GRID); cz++) {
        keys.push(cx + ':' + cz);
      }
    }
    return keys;
  };

  // Shared materials; all building boxes merge into one mesh per material.
  const facadeMats = [
    ['curtain', '#262b33', 0.14], ['curtain', '#2d3038', 0.12], ['curtain', '#23282e', 0.16],
    ['masonry', '#8f8371', 0.06], ['masonry', '#96705a', 0.06], ['masonry', '#7f7f7c', 0.07],
    ['glass', '#5b6f80', 0], ['glass', '#4e6273', 0],
  ].map(([kind, base, lit]) => {
    const tex = makeFacadeTexture(kind, base, lit);
    if (kind === 'glass') {
      return new THREE.MeshStandardMaterial({
        map: tex, roughness: 0.24, metalness: 0.7, envMapIntensity: 1.0,
      });
    }
    return new THREE.MeshStandardMaterial({
      map: tex, emissive: 0xffe6c4, emissiveMap: tex, emissiveIntensity: 0.13,
      roughness: 0.62, metalness: 0.12, envMapIntensity: 0.5,
    });
  });
  const storefrontTex = makeStorefrontTexture();
  const podiumMat = new THREE.MeshStandardMaterial({
    map: storefrontTex, emissive: 0xd8e6f0,
    emissiveMap: storefrontTex, emissiveIntensity: 0.10,
    roughness: 0.6, metalness: 0.15, envMapIntensity: 0.5,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x24272c, roughness: 0.8, metalness: 0.25,
  });

  const buckets = facadeMats.map(() => []);
  const podiumBucket = [];
  const darkBucket = [];

  // Nothing gets built on the water side of the sea-front straight — that
  // strip belongs to the marina promenade.
  let seaX = -Infinity;
  for (const f of frames) seaX = Math.max(seaX, f.pos.x);
  seaX += D.armco + 2;

  const box = (bucket, w, h, d, px, py, pz, fx = 1, fy = 1) => {
    const geo = new THREE.BoxGeometry(w, h, d);
    if (fx !== 1 || fy !== 1) {
      const uv = geo.getAttribute('uv');
      for (let v = 0; v < uv.count; v++) uv.setXY(v, uv.getX(v) * fx, uv.getY(v) * fy);
    }
    geo.translate(px, py, pz);
    bucket.push(geo);
  };

  const n = frames.length;
  const step = 5;
  for (let i = 0; i < n; i += step) {
    const f = frames[i];
    for (const sign of [+1, -1]) {
      for (const tier of [0, 1]) {
        if (Math.random() < 0.18) continue;      // leave some gaps in the fabric
        const w = GRID * (2 + ((Math.random() * 3) | 0));   // 12/18/24 m
        const d = GRID * (2 + ((Math.random() * 3) | 0));
        const setback = D.armco + 3.6 + d / 2 + tier * (30 + Math.random() * 14);
        let px = f.pos.x + f.left.x * sign * setback;
        let pz = f.pos.z + f.left.z * sign * setback;
        px = Math.round(px / GRID) * GRID;
        pz = Math.round(pz / GRID) * GRID;
        const hw = w / 2, hd = d / 2;
        if (px + hw > seaX) continue;
        if (!rectClearOfTrack(frames, px, pz, hw, hd, D.armco + 2.6)) continue;
        const keys = cellsFor(px, pz, hw + 2, hd + 2);
        if (keys.some((k) => occupied.has(k))) continue;
        keys.forEach((k) => occupied.add(k));

        const matIdx = (Math.random() * facadeMats.length) | 0;
        const height = tier === 0
          ? 16 + Math.random() * 46
          : 22 + Math.random() * 60;
        const hasPodium = Math.random() < 0.7;
        let towerBase = 0;
        if (hasPodium) {
          const ph = Math.random() < 0.5 ? 4.5 : 9;
          // podium fills the lot; storefront texture repeats every ~12 m
          box(podiumBucket, w, ph, d, px, ph / 2, pz,
            Math.max(1, Math.round(w / 12)), Math.max(1, Math.round(ph / 4.5)));
          box(darkBucket, w + 0.5, 0.4, d + 0.5, px, ph + 0.2, pz);
          towerBase = ph + 0.4;
        }
        const tw = hasPodium ? Math.max(9, w - 3.5) : w;
        const td = hasPodium ? Math.max(9, d - 3.5) : d;
        const th = height;
        box(buckets[matIdx], tw, th, td, px, towerBase + th / 2, pz,
          Math.max(1, Math.round(tw / 13)), Math.max(1, Math.round(th / 24)));
        // parapet + rooftop plant
        const topY = towerBase + th;
        box(darkBucket, tw + 0.5, 0.6, td + 0.5, px, topY + 0.3, pz);
        const acN = (Math.random() * 3) | 0;
        for (let a = 0; a < acN; a++) {
          box(darkBucket, 1.6, 1.0, 1.2,
            px + (Math.random() - 0.5) * (tw - 3),
            topY + 1.1,
            pz + (Math.random() - 0.5) * (td - 3));
        }
        if (Math.random() < 0.22) {
          box(darkBucket, 0.22, 4 + Math.random() * 5, 0.22, px, topY + 2.5, pz);
        }
      }
    }
  }

  const addMerged = (geos, mat) => {
    if (!geos.length) return;
    const merged = mergeGeometries(geos);
    const mesh = new THREE.Mesh(merged, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    for (const g of geos) g.dispose();
  };
  buckets.forEach((geos, i) => addMerged(geos, facadeMats[i]));
  addMerged(podiumBucket, podiumMat);
  addMerged(darkBucket, darkMat);
}

// Hazed silhouette towers well beyond the raced blocks, so the skyline
// continues instead of stopping dead at the first row. Skips the sector the
// marina opens onto (+x = the sea).
function addCitySkyline(scene, frames) {
  const haze = new THREE.Color(0xb7bcc4);
  const tmp = new THREE.Color();
  // Modest haze lerp: the env lighting already lifts these — with the fog
  // colour mixed in too strongly the slabs bloomed into white monoliths.
  const bands = [
    [780, 340, 26, 55, 150, 0.28],
    [1180, 420, 30, 85, 210, 0.46],
    [1650, 500, 34, 110, 250, 0.62],
  ];
  const geos = [];
  for (const [innerR, span, N, hMin, hVar, hazeAmt] of bands) {
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2 + (Math.random() - 0.5) * 0.18;
      if (Math.cos(a) > 0.35) continue;          // open water to the east
      const r = innerR + Math.random() * span;
      const cx = Math.cos(a) * r;
      const cz = Math.sin(a) * r;
      const clusterN = 1 + ((Math.random() * 3) | 0);
      for (let cti = 0; cti < clusterN; cti++) {
        const w = 26 + Math.random() * 48;
        const dd = 26 + Math.random() * 48;
        const h = hMin + Math.random() * hVar;
        const px = cx + (Math.random() - 0.5) * 90;
        const pz = cz + (Math.random() - 0.5) * 90;
        const geo = new THREE.BoxGeometry(w, h, dd);
        geo.translate(px, h / 2, pz);
        // flat slab colour lerped toward the haze; faces darker on the sides
        tmp.setHSL(0.58 + (Math.random() - 0.5) * 0.04, 0.10 + Math.random() * 0.08,
          0.15 + Math.random() * 0.07);
        tmp.lerp(haze, hazeAmt);
        const count = geo.getAttribute('position').count;
        const colors = new Float32Array(count * 3);
        for (let v = 0; v < count; v++) {
          colors[v * 3] = tmp.r; colors[v * 3 + 1] = tmp.g; colors[v * 3 + 2] = tmp.b;
        }
        geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geos.push(geo);
      }
    }
  }
  if (!geos.length) return;
  const mesh = new THREE.Mesh(mergeGeometries(geos), new THREE.MeshStandardMaterial({
    vertexColors: true, roughness: 0.95, metalness: 0, envMapIntensity: 0.14, fog: true,
  }));
  for (const g of geos) g.dispose();
  scene.add(mesh);
}

// The harbour beyond the sea-front straight: open water, a stone quay with
// railings, a palm promenade and moored boats.
function addMarina(scene, frames, D) {
  // The sea lies past the circuit's greatest +x extent.
  let maxX = -Infinity;
  for (const f of frames) maxX = Math.max(maxX, f.pos.x);
  const edge = maxX + D.armco + 9;               // quay drop-off line
  // promenade span follows the frames that actually run along the sea front
  let zMin = Infinity, zMax = -Infinity;
  for (const f of frames) {
    if (f.pos.x > maxX - 40) { zMin = Math.min(zMin, f.pos.z); zMax = Math.max(zMax, f.pos.z); }
  }
  zMin -= 60; zMax += 60;

  // Water: opaque, deep blue-green, mirror-ish so it catches the sky.
  const ripple = makeNormalTexture(256, 0.55);
  ripple.wrapS = ripple.wrapT = THREE.RepeatWrapping;
  ripple.repeat.set(160, 160);
  const water = new THREE.Mesh(
    new THREE.PlaneGeometry(3800, 4200),
    new THREE.MeshStandardMaterial({
      color: 0x14384c, roughness: 0.16, metalness: 0.1,
      normalMap: ripple, normalScale: new THREE.Vector2(0.35, 0.35),
      envMapIntensity: 1.2,
    })
  );
  water.rotation.x = -Math.PI / 2;
  water.position.set(edge + 1900, 0.0, (zMin + zMax) / 2);
  water.receiveShadow = true;
  scene.add(water);

  // Concrete promenade from behind the wall out to the quay edge.
  const promenade = new THREE.Mesh(
    new THREE.PlaneGeometry(edge - (maxX + D.armco) + 2, zMax - zMin),
    new THREE.MeshStandardMaterial({
      color: 0xa9a49a, roughness: 0.9, metalness: 0,
      polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1,
    })
  );
  promenade.rotation.x = -Math.PI / 2;
  promenade.position.set((maxX + D.armco + edge) / 2 + 1, 0.02, (zMin + zMax) / 2);
  promenade.receiveShadow = true;
  scene.add(promenade);

  // Quay stone edge + railing posts and rail.
  const stone = new THREE.MeshStandardMaterial({ color: 0x8d8a80, roughness: 0.9 });
  const quay = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.5, zMax - zMin), stone);
  quay.position.set(edge, 0.25, (zMin + zMax) / 2);
  quay.castShadow = quay.receiveShadow = true;
  scene.add(quay);
  const railMat = new THREE.MeshStandardMaterial({ color: 0x3c4046, roughness: 0.5, metalness: 0.6 });
  const postGeo = new THREE.BoxGeometry(0.08, 1.0, 0.08);
  const postN = Math.floor((zMax - zMin) / 4);
  const posts = new THREE.InstancedMesh(postGeo, railMat, postN);
  const m4 = new THREE.Matrix4();
  for (let i = 0; i < postN; i++) {
    m4.makeTranslation(edge - 0.6, 0.95, zMin + 2 + i * 4);
    posts.setMatrixAt(i, m4);
  }
  posts.instanceMatrix.needsUpdate = true;
  scene.add(posts);
  const rail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.07, zMax - zMin), railMat);
  rail.position.set(edge - 0.6, 1.45, (zMin + zMax) / 2);
  scene.add(rail);

  // Palm promenade: instanced trunks + frond crowns.
  const palmN = Math.max(6, Math.floor((zMax - zMin) / 17));
  const trunkGeo = new THREE.CylinderGeometry(0.11, 0.18, 4.8, 6);
  trunkGeo.translate(0, 2.4, 0);
  const frondSingle = new THREE.PlaneGeometry(0.55, 2.8, 1, 4);
  {
    // droop each frond outward-down along its length
    const p = frondSingle.getAttribute('position');
    for (let v = 0; v < p.count; v++) {
      const t = (p.getY(v) + 1.4) / 2.8;
      p.setZ(v, -Math.pow(t, 1.7) * 1.3);
      p.setX(v, p.getX(v) * (1 - t * 0.55));
    }
  }
  const fronds = [];
  for (let k = 0; k < 8; k++) {
    const fr = frondSingle.clone();
    fr.rotateX(-Math.PI / 2 + 0.45);
    fr.rotateY((k / 8) * Math.PI * 2 + 0.2);
    fr.translate(0, 4.8, 0);
    fronds.push(fr);
  }
  const crownGeo = mergeGeometries(fronds);
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8a6b4a, roughness: 0.95 });
  const crownMat = new THREE.MeshStandardMaterial({
    color: 0x41682f, roughness: 0.9, side: THREE.DoubleSide,
  });
  const trunks = new THREE.InstancedMesh(trunkGeo, trunkMat, palmN);
  const crowns = new THREE.InstancedMesh(crownGeo, crownMat, palmN);
  trunks.castShadow = crowns.castShadow = true;
  const q4 = new THREE.Quaternion();
  const s4 = new THREE.Vector3();
  for (let i = 0; i < palmN; i++) {
    const pz = zMin + 10 + i * ((zMax - zMin - 20) / (palmN - 1)) + (Math.random() - 0.5) * 3;
    const px = edge - 3.6 + (Math.random() - 0.5) * 1.2;
    const sc = 0.85 + Math.random() * 0.4;
    q4.setFromEuler(new THREE.Euler(0, Math.random() * Math.PI * 2, (Math.random() - 0.5) * 0.08));
    s4.set(sc, sc, sc);
    m4.compose(new THREE.Vector3(px, 0, pz), q4, s4);
    trunks.setMatrixAt(i, m4);
    crowns.setMatrixAt(i, m4);
  }
  trunks.instanceMatrix.needsUpdate = true;
  crowns.instanceMatrix.needsUpdate = true;
  scene.add(trunks);
  scene.add(crowns);

  // Moored boats: simple hull + cabin (+ mast on the sailboats).
  const hullMat = new THREE.MeshStandardMaterial({ color: 0xe8e6e0, roughness: 0.35, metalness: 0.1 });
  const mastMat = new THREE.MeshStandardMaterial({ color: 0x53575d, roughness: 0.5, metalness: 0.5 });
  const hullGeos = [], mastGeos = [];
  const boatN = 9;
  for (let i = 0; i < boatN; i++) {
    const bx = edge + 10 + Math.random() * 45;
    const bz = zMin + 20 + (i + Math.random() * 0.6) * ((zMax - zMin - 40) / boatN);
    const yaw = (Math.random() - 0.5) * 0.5 + (Math.random() < 0.5 ? 0 : Math.PI);
    const sc = 0.8 + Math.random() * 0.7;
    const hull = new THREE.BoxGeometry(2.2 * sc, 0.9 * sc, 6.5 * sc);
    {
      // taper the bow so it isn't a shoebox
      const p = hull.getAttribute('position');
      for (let v = 0; v < p.count; v++) {
        const t = Math.max(0, p.getZ(v) / (3.25 * sc) - 0.35);
        p.setX(v, p.getX(v) * (1 - t * 0.75));
      }
    }
    const cabin = new THREE.BoxGeometry(1.5 * sc, 0.7 * sc, 2.2 * sc);
    cabin.translate(0, 0.8 * sc, -0.8 * sc);
    const boat = mergeGeometries([hull, cabin]);
    const rot = new THREE.Matrix4().makeRotationY(yaw);
    boat.applyMatrix4(rot);
    boat.translate(bx, 0.42 * sc, bz);
    hullGeos.push(boat);
    if (Math.random() < 0.55) {
      const mast = new THREE.CylinderGeometry(0.04, 0.05, 6 * sc, 6);
      mast.translate(0, 3.4 * sc, -0.4 * sc);
      mast.applyMatrix4(rot);
      mast.translate(bx, 0, bz);
      mastGeos.push(mast);
    }
  }
  const hulls = new THREE.Mesh(mergeGeometries(hullGeos), hullMat);
  hulls.castShadow = true;
  scene.add(hulls);
  if (mastGeos.length) {
    const masts = new THREE.Mesh(mergeGeometries(mastGeos), mastMat);
    scene.add(masts);
  }
}

// Paved sidewalks (with a kerb shadow line) hugging both walls — street
// level reads as a real city street rather than walls standing in a void.
function addSidewalks(scene, frames, D) {
  const paveTex = makeNoiseTexture(256, (x, y) => {
    const grain = fractalNoise(x * 22, y * 90, 3);
    // paving-slab joints across the walk
    const joint = (y * 34) % 1 < 0.06 ? -0.10 : 0;
    const v = 0.42 + grain * 0.10 + joint;
    return [v, v * 0.99, v * 0.96];
  });
  paveTex.wrapS = paveTex.wrapT = THREE.RepeatWrapping;
  paveTex.repeat.set(1, 200);
  const paveMat = new THREE.MeshStandardMaterial({
    map: paveTex, roughness: 0.92, metalness: 0,
    polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
  });
  const kerbMat = new THREE.MeshStandardMaterial({
    color: 0x3a3d40, roughness: 0.9,
    polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
  });
  for (const sign of [+1, -1]) {
    const walk = new THREE.Mesh(
      buildEdgeLineGeometry(frames, sign * (D.armco + 2.1), 3.4), paveMat);
    walk.position.y = 0.02;
    walk.receiveShadow = true;
    scene.add(walk);
    const kerb = new THREE.Mesh(
      buildEdgeLineGeometry(frames, sign * (D.armco + 0.28), 0.35), kerbMat);
    kerb.position.y = 0.022;
    scene.add(kerb);
  }
}

// Instanced street lights leaning over the walls on alternating sides.
function addStreetlights(scene, frames, D) {
  const poleGeo = (() => {
    const pole = new THREE.CylinderGeometry(0.07, 0.10, 6.6, 7);
    pole.translate(0, 3.3, 0);
    const arm = new THREE.BoxGeometry(0.09, 0.09, 2.1);
    arm.translate(0, 6.5, 1.0);
    return mergeGeometries([pole, arm]);
  })();
  const headGeo = new THREE.BoxGeometry(0.5, 0.14, 0.24);
  headGeo.translate(0, 6.44, 2.0);
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x43474d, roughness: 0.55, metalness: 0.6 });
  const headMat = new THREE.MeshStandardMaterial({
    color: 0x30322f, emissive: 0xffd9a0, emissiveIntensity: 1.4, roughness: 0.4,
  });
  const n = frames.length;
  const stride = 11;
  const cap = Math.ceil(n / stride);
  const poles = new THREE.InstancedMesh(poleGeo, poleMat, cap);
  const heads = new THREE.InstancedMesh(headGeo, headMat, cap);
  poles.castShadow = true;
  const m4 = new THREE.Matrix4();
  const q4 = new THREE.Quaternion();
  const s4 = new THREE.Vector3(1, 1, 1);
  let count = 0;
  for (let i = 0, alt = 0; i < n; i += stride, alt++) {
    const f = frames[i];
    const sign = alt % 2 ? +1 : -1;
    const px = f.pos.x + f.left.x * sign * (D.armco + 2.9);
    const pz = f.pos.z + f.left.z * sign * (D.armco + 2.9);
    // must not stand inside another street's corridor
    if (distToTrack(frames, px, pz) < D.armco + 1.6) continue;
    // arm (local +z) points back at the road
    const yaw = Math.atan2(-sign * f.left.x, -sign * f.left.z);
    q4.setFromEuler(new THREE.Euler(0, yaw, 0));
    m4.compose(new THREE.Vector3(px, 0, pz), q4, s4);
    poles.setMatrixAt(count, m4);
    heads.setMatrixAt(count, m4);
    count++;
  }
  poles.count = heads.count = count;
  poles.instanceMatrix.needsUpdate = true;
  heads.instanceMatrix.needsUpdate = true;
  scene.add(poles);
  scene.add(heads);
}

// Zebra crossings on the straights into the 90° corners — junction dressing
// that sells "these are closed public streets".
function addCrosswalks(scene, frames, curvature, road) {
  const tex = (() => {
    const c = document.createElement('canvas');
    c.width = 256; c.height = 64;
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, 256, 64);
    for (let x = 8; x < 256 - 8; x += 26) {
      ctx.fillStyle = 'rgba(235,235,230,0.92)';
      ctx.fillRect(x, 4, 15, 56);
    }
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  })();
  const mat = new THREE.MeshStandardMaterial({
    map: tex, transparent: true, alphaTest: 0.3, roughness: 0.7,
    polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4,
  });
  const n = frames.length;
  let placed = 0;
  let cooldown = 0;
  for (let i = 0; i < n && placed < 5; i++) {
    if (cooldown > 0) { cooldown--; continue; }
    if (curvature[i] > 0.005 && curvature[(i - 1 + n) % n] <= 0.005) {
      const ai = (i - 12 + n) % n;
      if (curvature[ai] > 0.0014) { cooldown = 30; continue; }
      const f = frames[ai];
      const cw = new THREE.Mesh(new THREE.PlaneGeometry(road - 1.4, 3.0), mat);
      cw.rotation.x = -Math.PI / 2;
      cw.position.set(f.pos.x, 0.018, f.pos.z);
      cw.rotation.z = -Math.atan2(f.tan.x, f.tan.z);
      scene.add(cw);
      placed++;
      cooldown = 40;
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
    // Clearance must grow with the boulder: a 5-scale rock spans ~8 m, and the
    // old fixed armco+5 test let the big ones lean through the barrier line.
    const sc = 1.0 + Math.random() * 4.5;
    const dist = distToTrack(frames, x, z);
    if (dist < D.armco + 4 + sc * 1.7) continue;
    if (dist > 120 && Math.random() < ((dist - 120) / (extent - 120)) * 0.6) continue;
    const p = new THREE.Vector3(x, 0, z);
    s.set(sc * (0.8 + Math.random() * 0.6), sc * (0.5 + Math.random() * 0.7), sc * (0.8 + Math.random() * 0.6));
    e.set((Math.random() - 0.5) * 0.5, Math.random() * Math.PI * 2, (Math.random() - 0.5) * 0.5);
    q.setFromEuler(e);
    p.y = groundY(D, x, z) - 0.3 * sc;
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
    // Buttes are big (base radius up to ~90 m) — sample positions until one
    // clears every road section. The old fixed ring around the origin planted
    // them straight on the circuit.
    const h = 60 + Math.random() * 90;
    const topR = 26 + Math.random() * 30;
    let x = 0, z = 0, ok = false;
    for (let t = 0; t < 50 && !ok; t++) {
      const a = Math.random() * Math.PI * 2;
      const r = 250 + Math.random() * 280;
      x = Math.cos(a) * r;
      z = Math.sin(a) * r;
      if (distToTrack(frames, x, z) > topR * 1.7 + D.armco + 12) ok = true;
    }
    if (!ok) continue;
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
      // Sedimentary striation: thin light/dark layers running around the rock
      // break the smooth "flower-pot" vertical gradient of the old shading.
      const strat = 0.90 + 0.11 * Math.sin(yFrac * 30 + fractalNoise(ang * 3, yFrac * 9, 2) * 4);
      tmp.multiplyScalar(strat);
      colors.push(tmp.r, tmp.g, tmp.b);
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    const butte = new THREE.Mesh(geo, butteMat);
    butte.position.set(x, groundY(D, x, z) + h / 2 - 4, z);
    // NOT a shadow caster. A 60-150 m butte under an 11-degrees sun throws a
    // 300-760 m shadow, and the sun's shadow camera is a 180 m box that FOLLOWS
    // the car — so instead of a butte-shaped shadow you get the frustum's own
    // footprint painted across the desert as a hard-edged grey band ~180 m wide
    // and ~950 m long (the box stretches by 1/sin(elevation) on the ground).
    // These are backdrop; nothing is close enough for their shadow to inform.
    butte.castShadow = false;
    butte.receiveShadow = true;
    scene.add(butte);
  }
}

// Dry desert brush + saguaros: ground cover so the sand flats read as living
// desert instead of an empty beige sheet.
function addScrub(scene, frames, D) {
  // brush: squashed icosahedra in olive/straw tones
  const bushGeo = new THREE.IcosahedronGeometry(1, 1);
  bushGeo.scale(1, 0.55, 1);
  const bushMat = new THREE.MeshStandardMaterial({
    roughness: 1.0, metalness: 0, flatShading: true, envMapIntensity: 0.25,
  });
  const BUSH_N = 260;
  const bushes = new THREE.InstancedMesh(bushGeo, bushMat, BUSH_N);
  bushes.castShadow = true;
  bushes.receiveShadow = true;
  const m4 = new THREE.Matrix4();
  const q4 = new THREE.Quaternion();
  const s4 = new THREE.Vector3();
  const col = new THREE.Color();
  const extent = 420;
  let placed = 0;
  for (let i = 0; i < BUSH_N * 5 && placed < BUSH_N; i++) {
    const x = (Math.random() * 2 - 1) * extent;
    const z = (Math.random() * 2 - 1) * extent;
    const dist = distToTrack(frames, x, z);
    if (dist < D.armco + 4) continue;
    if (dist > 150 && Math.random() < ((dist - 150) / (extent - 150)) * 0.6) continue;
    const sc = 0.5 + Math.random() * 1.3;
    s4.set(sc * (0.8 + Math.random() * 0.5), sc, sc * (0.8 + Math.random() * 0.5));
    q4.setFromEuler(new THREE.Euler(0, Math.random() * Math.PI * 2, 0));
    m4.compose(new THREE.Vector3(x, groundY(D, x, z) + sc * 0.30, z), q4, s4);
    bushes.setMatrixAt(placed, m4);
    col.setHSL(0.13 + Math.random() * 0.09, 0.28 + Math.random() * 0.22, 0.26 + Math.random() * 0.14);
    bushes.setColorAt(placed, col);
    placed++;
  }
  bushes.count = placed;
  bushes.instanceMatrix.needsUpdate = true;
  if (bushes.instanceColor) bushes.instanceColor.needsUpdate = true;
  scene.add(bushes);

  // saguaros: trunk + two raised arms
  const trunk = new THREE.CylinderGeometry(0.26, 0.32, 4.6, 7);
  trunk.translate(0, 2.3, 0);
  const armL = new THREE.CylinderGeometry(0.16, 0.18, 1.7, 6);
  armL.translate(0, 0.85, 0);
  armL.rotateZ(0.5);
  armL.translate(-0.55, 1.7, 0);
  const armL2 = new THREE.CylinderGeometry(0.16, 0.16, 1.3, 6);
  armL2.translate(-0.98, 3.1, 0);
  const armR = new THREE.CylinderGeometry(0.15, 0.17, 1.4, 6);
  armR.translate(0, 0.7, 0);
  armR.rotateZ(-0.55);
  armR.translate(0.5, 2.4, 0);
  const armR2 = new THREE.CylinderGeometry(0.15, 0.15, 1.1, 6);
  armR2.translate(0.92, 3.6, 0);
  const cactusGeo = mergeGeometries([trunk, armL, armL2, armR, armR2]);
  const cactusMat = new THREE.MeshStandardMaterial({
    roughness: 0.85, metalness: 0, envMapIntensity: 0.25,
  });
  const CACT_N = 46;
  const cacti = new THREE.InstancedMesh(cactusGeo, cactusMat, CACT_N);
  cacti.castShadow = true;
  placed = 0;
  for (let i = 0; i < CACT_N * 6 && placed < CACT_N; i++) {
    const x = (Math.random() * 2 - 1) * extent;
    const z = (Math.random() * 2 - 1) * extent;
    const dist = distToTrack(frames, x, z);
    if (dist < D.armco + 8 || dist > 380) continue;
    const sc = 0.7 + Math.random() * 0.9;
    s4.set(sc, sc * (0.85 + Math.random() * 0.4), sc);
    q4.setFromEuler(new THREE.Euler(0, Math.random() * Math.PI * 2, 0));
    m4.compose(new THREE.Vector3(x, groundY(D, x, z), z), q4, s4);
    cacti.setMatrixAt(placed, m4);
    col.setHSL(0.28 + Math.random() * 0.05, 0.22 + Math.random() * 0.15, 0.30 + Math.random() * 0.10);
    cacti.setColorAt(placed, col);
    placed++;
  }
  cacti.count = placed;
  cacti.instanceMatrix.needsUpdate = true;
  if (cacti.instanceColor) cacti.instanceColor.needsUpdate = true;
  scene.add(cacti);
}

// Working farmland around the national circuit: crop-field patches, barns
// with silos, and hay-bale clusters — countryside instead of infinite lawn.
function addFarmland(scene, frames, D) {
  const cropDefs = [
    { tint: [0.72, 0.58, 0.28], rows: 34 },   // ripe wheat stubble
    { tint: [0.30, 0.42, 0.18], rows: 26 },   // green crop rows
    { tint: [0.38, 0.30, 0.20], rows: 40 },   // ploughed earth
  ];
  const cropMats = cropDefs.map(({ tint, rows }) => {
    const tex = makeNoiseTexture(256, (x, y) => {
      const row = 0.88 + 0.16 * Math.sin(y * Math.PI * rows);
      const n = fractalNoise(x * 9 + 3, y * 9 + 7, 3);
      return [
        tint[0] * row * (0.85 + n * 0.3),
        tint[1] * row * (0.85 + n * 0.3),
        tint[2] * row * (0.85 + n * 0.3),
      ];
    });
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.anisotropy = 8;
    tex.colorSpace = THREE.SRGBColorSpace;
    return new THREE.MeshStandardMaterial({
      map: tex, roughness: 0.98, metalness: 0,
      polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1,
    });
  });

  const fields = [];
  for (let tries = 0; tries < 140 && fields.length < 18; tries++) {
    const w = 55 + Math.random() * 110;
    const d = 45 + Math.random() * 100;
    const px = Math.round(((Math.random() * 2 - 1) * 680) / 10) * 10;
    const pz = Math.round(((Math.random() * 2 - 1) * 680) / 10) * 10;
    if (!rectClearOfTrack(frames, px, pz, w / 2, d / 2, D.armco + 6)) continue;
    // keep fields from stacking on each other
    if (fields.some((fl) => Math.abs(fl.px - px) < (fl.w + w) / 2 - 8 &&
                            Math.abs(fl.pz - pz) < (fl.d + d) / 2 - 8)) continue;
    fields.push({ px, pz, w, d });
    const mat = cropMats[(Math.random() * cropMats.length) | 0];
    const rot = Math.random() < 0.5 ? 0 : Math.PI / 2;
    const field = new THREE.Mesh(drapeQuad(D, px, pz, w, d, rot, 0.06), mat);
    field.position.set(px, 0, pz);
    field.receiveShadow = true;
    scene.add(field);
  }

  // Barns + silos on a couple of the further fields.
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x8e2f24, roughness: 0.8 });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x4c4f54, roughness: 0.6, metalness: 0.3 });
  const siloMat = new THREE.MeshStandardMaterial({ color: 0xb8bcbe, roughness: 0.45, metalness: 0.5 });
  let barns = 0;
  for (const fl of fields) {
    if (barns >= 3) break;
    if (distToTrack(frames, fl.px, fl.pz) < 90) continue;
    const bx = fl.px + fl.w / 2 - 12, bz = fl.pz + fl.d / 2 - 10;
    if (!rectClearOfTrack(frames, bx, bz, 8, 6, D.armco + 6)) continue;
    const g = new THREE.Group();
    const walls = new THREE.Mesh(new THREE.BoxGeometry(9, 4.2, 6), wallMat);
    walls.position.y = 2.1;
    walls.castShadow = walls.receiveShadow = true;
    g.add(walls);
    for (const rs of [+1, -1]) {
      const slab = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.18, 3.8), roofMat);
      slab.position.set(0, 5.15, rs * 1.62);
      slab.rotation.x = rs * 0.55;
      slab.castShadow = true;
      g.add(slab);
    }
    const silo = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.7, 7, 12), siloMat);
    silo.position.set(6.6, 3.5, -1);
    silo.castShadow = true;
    g.add(silo);
    const cap = new THREE.Mesh(new THREE.SphereGeometry(1.7, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), siloMat);
    cap.position.set(6.6, 7, -1);
    g.add(cap);
    g.position.set(bx, groundY(D, bx, bz), bz);
    g.rotation.y = (Math.random() < 0.5 ? 0 : Math.PI / 2) + (Math.random() - 0.5) * 0.1;
    scene.add(g);
    barns++;
  }

  // Hay bales dotted through the nearer fields.
  const baleGeo = new THREE.CylinderGeometry(0.75, 0.75, 1.3, 10);
  baleGeo.rotateZ(Math.PI / 2);
  const baleMat = new THREE.MeshStandardMaterial({ color: 0xc9a95c, roughness: 0.95 });
  const BALE_N = 60;
  const bales = new THREE.InstancedMesh(baleGeo, baleMat, BALE_N);
  bales.castShadow = bales.receiveShadow = true;
  const m4 = new THREE.Matrix4();
  const q4 = new THREE.Quaternion();
  const s4 = new THREE.Vector3(1, 1, 1);
  let placed = 0;
  for (let i = 0; i < BALE_N * 4 && placed < BALE_N && fields.length; i++) {
    const fl = fields[(Math.random() * fields.length) | 0];
    const x = fl.px + (Math.random() - 0.5) * (fl.w - 10);
    const z = fl.pz + (Math.random() - 0.5) * (fl.d - 10);
    if (distToTrack(frames, x, z) < D.armco + 8) continue;
    q4.setFromEuler(new THREE.Euler(0, Math.random() * Math.PI, 0));
    m4.compose(new THREE.Vector3(x, groundY(D, x, z) + 0.75, z), q4, s4);
    bales.setMatrixAt(placed, m4);
    placed++;
  }
  bales.count = placed;
  bales.instanceMatrix.needsUpdate = true;
  scene.add(bales);
}

// A few timber chalets tucked against the treeline of the pass road.
function addAlpineHuts(scene, frames, D) {
  const timberMat = new THREE.MeshStandardMaterial({ color: 0x6b4f33, roughness: 0.9 });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x3f3833, roughness: 0.8 });
  const stoneMat = new THREE.MeshStandardMaterial({ color: 0x8a8a86, roughness: 0.95 });
  let built = 0;
  for (let tries = 0; tries < 80 && built < 4; tries++) {
    const i = (Math.random() * frames.length) | 0;
    const f = frames[i];
    const sign = Math.random() < 0.5 ? +1 : -1;
    const setback = 34 + Math.random() * 70;
    const px = f.pos.x + f.left.x * sign * setback;
    const pz = f.pos.z + f.left.z * sign * setback;
    if (!rectClearOfTrack(frames, px, pz, 4.5, 4, D.armco + 5)) continue;
    const g = new THREE.Group();
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.5, 4.5), stoneMat);
    plinth.position.y = 0.25;
    g.add(plinth);
    const body = new THREE.Mesh(new THREE.BoxGeometry(5.0, 2.5, 4.2), timberMat);
    body.position.y = 1.75;
    body.castShadow = body.receiveShadow = true;
    g.add(body);
    for (const rs of [+1, -1]) {
      const slab = new THREE.Mesh(new THREE.BoxGeometry(5.9, 0.16, 2.9), roofMat);
      slab.position.set(0, 3.75, rs * 1.18);
      slab.rotation.x = rs * 0.52;
      slab.castShadow = true;
      g.add(slab);
    }
    const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.2, 0.5), stoneMat);
    chimney.position.set(1.4, 4.1, 0);
    g.add(chimney);
    g.position.set(px, groundY(D, px, pz), pz);
    // gable end roughly faces the road
    g.rotation.y = Math.atan2(f.left.x, f.left.z) + (Math.random() - 0.5) * 0.4;
    scene.add(g);
    built++;
  }
}

// Marshal posts at the heavy corners: a white hut, an orange roof, a flag —
// the small human infrastructure a licensed circuit actually has.
function addMarshalPosts(scene, frames, curvature, D) {
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

  const hutMat = new THREE.MeshStandardMaterial({ color: 0xe4e2da, roughness: 0.85 });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0xd2622a, roughness: 0.7 });
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x53575d, roughness: 0.5, metalness: 0.5 });
  const flagMat = new THREE.MeshStandardMaterial({
    color: 0xe07020, emissive: 0x983c08, emissiveIntensity: 0.25,
    side: THREE.DoubleSide, roughness: 0.8,
  });
  let placedCount = 0;
  for (const z of zones) {
    if (placedCount >= 5) break;
    const idx = (z.i0 - 6 + n) % n;
    const f = frames[idx];
    const t1 = frames[(idx - 1 + n) % n].tan;
    const t2 = frames[(idx + 1) % n].tan;
    const crossY = t1.x * t2.z - t1.z * t2.x;
    const sign = crossY > 0 ? +1 : -1;      // outside of the corner
    const px = f.pos.x + f.left.x * sign * (D.armco + 3.4);
    const pz = f.pos.z + f.left.z * sign * (D.armco + 3.4);
    if (distToTrack(frames, px, pz) < D.armco + 2.4) continue;
    const g = new THREE.Group();
    const hut = new THREE.Mesh(new THREE.BoxGeometry(2.3, 2.2, 2.1), hutMat);
    hut.position.y = 1.1;
    hut.castShadow = hut.receiveShadow = true;
    g.add(hut);
    const roof = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.14, 2.4), roofMat);
    roof.position.y = 2.28;
    roof.castShadow = true;
    g.add(roof);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 3.6, 6), poleMat);
    pole.position.set(1.5, 1.8, 0);
    g.add(pole);
    const flag = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 0.55), flagMat);
    flag.position.set(1.95, 3.3, 0);
    g.add(flag);
    g.position.set(px, 0, pz);
    // door faces the racing surface
    g.rotation.y = Math.atan2(-sign * f.left.x, -sign * f.left.z);
    scene.add(g);
    placedCount++;
  }
}
