// Headless smoke test for the procedural car builder.
// Stubs the canvas 2D context so the texture generators run, then builds each
// archetype and checks the geometry for NaNs and sane bounds.
import * as THREE from 'three';

// --- minimal DOM canvas stub ---
function ctxStub() {
  return new Proxy({}, {
    get(_t, prop) {
      if (prop === 'createImageData') {
        return (w, h) => ({ data: new Uint8ClampedArray(w * h * 4), width: w, height: h });
      }
      if (prop === 'getImageData') {
        return (x, y, w, h) => ({ data: new Uint8ClampedArray(w * h * 4), width: w, height: h });
      }
      if (prop === 'createRadialGradient' || prop === 'createLinearGradient') {
        return () => ({ addColorStop() {} });
      }
      if (prop === 'measureText') return () => ({ width: 10 });
      return () => {};
    },
    set() { return true; },
  });
}
globalThis.document = {
  createElement(tag) {
    if (tag === 'canvas') {
      return { width: 0, height: 0, getContext: () => ctxStub() };
    }
    return {};
  },
};

const { buildVisualCar, ARCHETYPE_KEYS } = await import('../src/carModels/index.js');

function checkGeom(label, geo) {
  const pos = geo.getAttribute('position');
  const nor = geo.getAttribute('normal');
  const uv = geo.getAttribute('uv');
  let nan = 0, badNormal = 0, badUv = 0;
  for (let i = 0; i < pos.count; i++) {
    if (!Number.isFinite(pos.getX(i)) || !Number.isFinite(pos.getY(i)) || !Number.isFinite(pos.getZ(i))) nan++;
    if (nor) {
      const nx = nor.getX(i), ny = nor.getY(i), nz = nor.getZ(i);
      const len = Math.hypot(nx, ny, nz);
      if (!Number.isFinite(len) || len < 0.5) badNormal++;
    }
    if (uv && (!Number.isFinite(uv.getX(i)) || !Number.isFinite(uv.getY(i)))) badUv++;
  }
  geo.computeBoundingBox();
  const b = geo.boundingBox;
  console.log(`  [${label}] verts=${pos.count} tris=${geo.index ? geo.index.count / 3 : '?'} nan=${nan} badNormal=${badNormal} badUv=${badUv}`);
  console.log(`     bbox x[${b.min.x.toFixed(2)},${b.max.x.toFixed(2)}] y[${b.min.y.toFixed(2)},${b.max.y.toFixed(2)}] z[${b.min.z.toFixed(2)},${b.max.z.toFixed(2)}]`);
  return nan === 0 && badNormal === 0 && badUv === 0;
}

function checkObjectGeometry(label, root) {
  let meshes = 0, invalid = 0;
  root.traverse((o) => {
    if (!o.isMesh || !o.geometry?.getAttribute('position')) return;
    meshes++;
    const pos = o.geometry.getAttribute('position');
    const nor = o.geometry.getAttribute('normal');
    const uv = o.geometry.getAttribute('uv');
    for (let i = 0; i < pos.count; i++) {
      const values = [pos.getX(i), pos.getY(i), pos.getZ(i)];
      if (nor) values.push(nor.getX(i), nor.getY(i), nor.getZ(i));
      if (uv) values.push(uv.getX(i), uv.getY(i));
      if (values.some((n) => !Number.isFinite(n))) invalid++;
    }
  });
  console.log(`  [${label}] meshes=${meshes} invalid attributes=${invalid}`);
  return invalid === 0;
}

function countMeshes(obj) {
  let n = 0, tris = 0;
  obj.traverse((o) => {
    if (o.isMesh) {
      n++;
      const g = o.geometry;
      if (g && g.index) tris += g.index.count / 3;
      else if (g && g.getAttribute('position')) tris += g.getAttribute('position').count / 3;
    }
  });
  return { n, tris: Math.round(tris) };
}

// the hull is the mesh with the most vertices
// The painted lofted shell, not just "the biggest mesh": index.js tags it
// `userData.noMerge` and leaves it un-baked, while mergeByMaterial() fuses all
// the bolt-on detail into merged, NON-INDEXED meshes that can be larger. The
// winding check below needs the indexed hull specifically.
function findHull(root) {
  let best = null, bestN = 0;
  root.traverse((o) => {
    if (!o.isMesh || !o.geometry?.getAttribute('position') || !o.geometry.index) return;
    const n = o.geometry.getAttribute('position').count;
    if (n > bestN) { bestN = n; best = o; }
  });
  return best;
}

let ok = true;
for (const key of ARCHETYPE_KEYS) {
  console.log(`\n=== archetype: ${key} ===`);
  const v = buildVisualCar(key, 0xc8161d);
  console.log(`  root children=${v.root.children.length} wheels=${v.wheels.length} brakeLights=${!!v.brakeLights}`);
  // hull is the first Mesh child
  const hull = findHull(v.root);
  if (hull) ok = checkGeom('hull', hull.geometry) && ok;
  const rootStats = countMeshes(v.root);
  const wheelStats = v.wheels.reduce((a, w) => {
    const s = countMeshes(w); return { n: a.n + s.n, tris: a.tris + s.tris };
  }, { n: 0, tris: 0 });
  ok = checkObjectGeometry('wheel geometry', v.wheels[0]) && ok;
  console.log(`  root meshes=${rootStats.n} tris=${rootStats.tris} | 4 wheels meshes=${wheelStats.n} tris=${wheelStats.tris}`);
  console.log(`  TOTAL tris/car ≈ ${rootStats.tris + wheelStats.tris}`);
  // contract check
  if (v.wheels.length !== 4) { console.log('  !! expected 4 wheels'); ok = false; }
  if (!v.brakeLights || !v.brakeLights.material) { console.log('  !! brakeLights missing/invalid'); ok = false; }
  else if (!('emissiveIntensity' in v.brakeLights.material)) { console.log('  !! brakeLights material has no emissiveIntensity'); ok = false; }
}

// --- winding check via signed volume (positive => outward CCW) ---
{
  const v = buildVisualCar('gt', 0xc8161d);
  const hull = findHull(v.root);
  if (!hull) { console.log('\n!! no indexed hull mesh found — cannot check winding'); ok = false; }
  const pos = hull && hull.geometry.getAttribute('position');
  const idx = hull && hull.geometry.index;
  if (idx) {
  let vol = 0;
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  for (let i = 0; i < idx.count; i += 3) {
    a.fromBufferAttribute(pos, idx.getX(i));
    b.fromBufferAttribute(pos, idx.getX(i + 1));
    c.fromBufferAttribute(pos, idx.getX(i + 2));
    vol += a.dot(b.clone().cross(c)) / 6;
  }
  console.log(`\nHULL signed volume = ${vol.toFixed(3)} (${vol > 0 ? 'OUTWARD ok' : 'INSIDE-OUT — flip winding'})`);
  if (vol <= 0) ok = false;
  }
}

console.log(ok ? '\nSMOKE OK' : '\nSMOKE FAILED');
process.exit(ok ? 0 : 1);
