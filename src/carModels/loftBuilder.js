import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Station-loft skin builder.
//
// A car body is described by a small set of KEY STATIONS along the long axis
// (z), each a handful of scalar parameters (half-width, floor/hip/roof heights,
// top width...). We Catmull-interpolate those scalars into ~50 dense rings,
// turn each ring's parameters into a smooth cross-section profile, mirror it
// into a full closed ring, and stitch adjacent rings into a continuous quad
// skin with smooth normals. This is what makes the body read as sculpted
// bodywork instead of a stack of boxes.
//
// Coordinate frame (chassis-local, matches car.js): +Z forward, +Y up,
// +X right. Authored centered at the origin.
// ---------------------------------------------------------------------------

// Catmull-Rom through scalar control values (uniform), clamped endpoints.
function catmull(p0, p1, p2, p3, t) {
  const t2 = t * t, t3 = t2 * t;
  return 0.5 * (
    2 * p1 +
    (-p0 + p2) * t +
    (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
    (-p0 + 3 * p1 - 3 * p2 + p3) * t3
  );
}

// Sample one named scalar field of the key-station array at global param
// u in [0, n-1] (segment index + local t).
function sampleField(keys, field, u) {
  const n = keys.length;
  const i = Math.min(n - 2, Math.floor(u));
  const t = u - i;
  const p0 = keys[Math.max(0, i - 1)][field];
  const p1 = keys[i][field];
  const p2 = keys[i + 1][field];
  const p3 = keys[Math.min(n - 1, i + 2)][field];
  return catmull(p0, p1, p2, p3, t);
}

// Build the right-half cross-section (bottom-center -> up the side -> over the
// shoulder -> top-center) from a station's interpolated parameters, sampled to
// N points via a 2D Catmull spline through shape handles.
//   p.hw   max body half-width (at the hip)
//   p.yb   floor / sill height at centre
//   p.hip  height of the widest point
//   p.yt   top height at centre (roofline for the cabin, deck for hood/tail)
//   p.topW half-width at the top (greenhouse width / deck width -> tumblehome)
function halfProfile(p, N) {
  const hw = p.hw, yb = p.yb, hip = p.hip, yt = p.yt, topW = p.topW;
  // TWO splines meeting at the shoulder point with different tangents: the
  // tangent break is a crisp beltline crease (the strongest stamped-steel cue),
  // while a single spline through the same handles reads as melted soap.
  // Flat handles at the floor and crown keep the hood/roof/deck as planes.
  const nLow = Math.max(3, Math.round(N * 0.55));
  const nUp = N - nLow;
  const lower = new THREE.SplineCurve([
    new THREE.Vector2(0, yb),                                   // floor centre
    new THREE.Vector2(hw * 0.72, yb),                           // flat floor out to the rocker
    new THREE.Vector2(hw * 0.955, yb + (hip - yb) * 0.42),      // near-vertical body side
    new THREE.Vector2(hw, hip),                                 // shoulder / beltline crease
  ]);
  const upper = new THREE.SplineCurve([
    new THREE.Vector2(hw * 0.955, hip + (yt - hip) * 0.10),     // tuck in above the crease
    new THREE.Vector2(topW + (hw - topW) * 0.42, hip + (yt - hip) * 0.56), // tumblehome
    new THREE.Vector2(topW, yt - 0.006),                        // top corner
    new THREE.Vector2(topW * 0.52, yt),                         // flat crown / deck plane
    new THREE.Vector2(0, yt),                                   // top centre
  ]);
  const pts = lower.getPoints(nLow - 1)          // nLow points, crease included
    .concat(upper.getPoints(nUp - 1));           // nUp points above the crease
  // Clamp x>=0 so the centre line never crosses itself, and force the exact
  // centre verts to x=0 so the mirror shares them (no spine crease).
  for (const q of pts) if (q.x < 0) q.x = 0;
  pts[0].x = 0;
  pts[N - 1].x = 0;
  return pts;
}

/**
 * Build a smooth lofted body shell.
 * @param keys  ordered key stations (tail -> nose), each { z, hw, yb, hip, yt, topW }
 * @param opts  { ringsPerSegment=8, profilePoints=14, capEnds=true }
 * @returns THREE.BufferGeometry with position, normal, uv (and uv2 = uv).
 */
export function buildLoftHull(keys, opts = {}) {
  const ringsPerSeg = opts.ringsPerSegment ?? 8;
  const N = opts.profilePoints ?? 14;          // half-profile points
  const M = 2 * (N - 1);                        // full-ring points
  const capEnds = opts.capEnds ?? true;

  const segs = keys.length - 1;
  const R = segs * ringsPerSeg;                 // number of ring steps
  const ringCount = R + 1;

  const positions = [];
  const uvs = [];
  // rings[r] = array of M Vector3 (cached for cap centroids)
  const ringZ = [];

  for (let r = 0; r <= R; r++) {
    const u = (r / R) * segs;
    const p = {
      z: sampleField(keys, 'z', u),
      hw: sampleField(keys, 'hw', u),
      yb: sampleField(keys, 'yb', u),
      hip: sampleField(keys, 'hip', u),
      yt: sampleField(keys, 'yt', u),
      topW: sampleField(keys, 'topW', u),
    };
    ringZ.push(p.z);
    const half = halfProfile(p, N);            // N points, [0]=bottom ctr, [N-1]=top ctr
    // Full ring: bottom-centre, up the right side to top-centre, then down the
    // mirrored left side (skip the shared centre verts).
    const v = r / R;
    for (let k = 0; k < N; k++) {              // right side incl. both centres
      positions.push(half[k].x, half[k].y, p.z);
      uvs.push(k / M, v);
    }
    for (let k = N - 2; k >= 1; k--) {         // left side, mirrored
      positions.push(-half[k].x, half[k].y, p.z);
      uvs.push((2 * (N - 1) - k) / M, v);
    }
  }

  const indices = [];
  const ring = (r) => r * M;
  for (let r = 0; r < R; r++) {
    const a = ring(r), b = ring(r + 1);
    for (let j = 0; j < M; j++) {
      const j1 = (j + 1) % M;
      const v00 = a + j, v01 = a + j1, v10 = b + j, v11 = b + j1;
      // Winding chosen so faces point outward (verified via signed volume).
      indices.push(v00, v11, v10);
      indices.push(v00, v01, v11);
    }
  }

  // End caps — triangle-fan each end ring to its centroid.
  if (capEnds) {
    const addCap = (r, frontFacing) => {
      // centroid
      let cx = 0, cy = 0;
      for (let j = 0; j < M; j++) {
        cx += positions[(ring(r) + j) * 3];
        cy += positions[(ring(r) + j) * 3 + 1];
      }
      cx /= M; cy /= M;
      const cz = ringZ[r];
      const center = positions.length / 3;
      positions.push(cx, cy, cz);
      uvs.push(0.5, frontFacing ? 1 : 0);
      for (let j = 0; j < M; j++) {
        const j1 = (j + 1) % M;
        const a = ring(r) + j, b = ring(r) + j1;
        if (frontFacing) indices.push(center, a, b);
        else indices.push(center, b, a);
      }
    };
    addCap(0, false);   // tail
    addCap(R, true);    // nose
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  // aoMap / second channel reuse the same coords.
  geo.setAttribute('uv2', new THREE.Float32BufferAttribute(uvs, 2));
  geo.computeBoundingBox();
  geo.computeBoundingSphere();
  return geo;
}

// Station parameters interpolated at an arbitrary z (the loft is monotonic in
// z, so invert z(u) by bisection).
function paramsAtZ(keys, z) {
  const segs = keys.length - 1;
  let lo = 0, hi = segs;
  for (let it = 0; it < 36; it++) {
    const mid = (lo + hi) / 2;
    if (sampleField(keys, 'z', mid) < z) lo = mid; else hi = mid;
  }
  const u = (lo + hi) / 2;
  return {
    hw: sampleField(keys, 'hw', u), yb: sampleField(keys, 'yb', u),
    hip: sampleField(keys, 'hip', u), yt: sampleField(keys, 'yt', u),
    topW: sampleField(keys, 'topW', u),
  };
}

// Authored fraction f in [-1, 1] -> ring coordinate c in [0, 2], which walks
// CONTINUOUSLY up the right side (0 = floor centre, 1 = crown) and back down
// the left (2 = floor centre again). Paths are interpolated in c so a seam
// crossing the centre line goes over the roof; interpolating the signed f
// directly would dive through f = 0 — down the right flank to the floor and
// back up the left — and lay a duplicate ribbon over the half it retraced.
const toRing = (f) => (f < 0 ? 2 + f : f);

/**
 * Sample the hull SKIN at station z and ring coordinate c (see toRing). Points
 * are taken by linear interpolation along the same N-point polyline the hull
 * mesh is built from, so anything laid on them rides ON the skin instead of
 * sinking inside it on convex sections (a spline-exact sample would sit under
 * the chords).
 */
function skinPoint(keys, z, c, N, cache) {
  const key = z.toFixed(4);
  let half = cache.get(key);
  if (!half) { half = halfProfile(paramsAtZ(keys, z), N); cache.set(key, half); }
  const s = c > 1 ? -1 : 1;
  const a = Math.min(1, Math.max(0, c > 1 ? 2 - c : c)) * (N - 1);
  const i = Math.min(N - 2, Math.floor(a));
  const t = a - i;
  return new THREE.Vector3(
    s * (half[i].x + (half[i + 1].x - half[i].x) * t),
    half[i].y + (half[i + 1].y - half[i].y) * t,
    z,
  );
}

// One unit of ring coordinate is roughly this many metres of profile arc, so
// (z, c) waypoints can be measured in one consistent space.
const RING_M = 1.2;

// Chamfer the interior corners of a (z, ring) path. A ribbon's width runs
// perpendicular to its path ON the skin, so at a sharp corner — an A-pillar
// meeting the roof rail, a door's front cut meeting the sill — that direction
// swings through most of a right angle within one step and the band flares
// into a flag. Cutting each corner over `cut` metres turns one hard turn into
// two gentle ones, which is also how the real joints are radiused.
function roundCorners(ring, cut = 0.09) {
  if (ring.length < 3) return ring;
  const dist = (a, b) => Math.hypot(b[0] - a[0], (b[1] - a[1]) * RING_M);
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const out = [ring[0]];
  for (let i = 1; i < ring.length - 1; i++) {
    const dPrev = dist(ring[i - 1], ring[i]), dNext = dist(ring[i], ring[i + 1]);
    if (dPrev < 1e-6 || dNext < 1e-6) { out.push(ring[i]); continue; }
    const tIn = 1 - Math.min(cut, dPrev * 0.4) / dPrev;
    const tOut = Math.min(cut, dNext * 0.4) / dNext;
    out.push(lerp(ring[i - 1], ring[i], tIn), lerp(ring[i], ring[i + 1], tOut));
  }
  out.push(ring[ring.length - 1]);
  return out;
}

/**
 * Build panel seams: thin ribbons that follow the hull skin along an authored
 * path in (z, f) space. This is what stamps a lofted blob into bodywork —
 * shut lines around the hood/doors/deck read as separate pressed panels, and
 * a body-coloured ribbon over the glass canopy reads as an A-pillar.
 *
 * Each seam: {
 *   path:   [[z, f], ...]  waypoints on the skin. f in [-1, 1] walks the
 *           cross-section: 0 = floor centre, 1 = crown centre, sign = side.
 *   width:  ribbon width in metres
 *   proud:  standoff along the surface normal (a real offset, not a depth
 *           bias — the same trick that stopped the canopy z-fighting)
 *   mirror: also emit the path with every f negated (the other flank)
 * }
 * @returns THREE.BufferGeometry (position/normal/uv), or null if empty.
 */
export function buildPanelSeams(keys, seams, opts = {}) {
  const N = opts.profilePoints ?? 16;
  const cache = new Map();
  const positions = [], normals = [], uvs = [], indices = [];

  const emit = (path, width, proud) => {
    // Densify in (z, ring) space: keep steps comparable to the hull's own ring
    // spacing (~0.05 m) so a seam tracks arch blisters instead of chording
    // across them.
    const ring = roundCorners(path.map(([z, f]) => [z, toRing(f)]));
    const pts = [];
    for (let s = 0; s < ring.length - 1; s++) {
      const [z0, c0] = ring[s], [z1, c1] = ring[s + 1];
      // ~0.05 m steps either way: a full half-profile (c 0->1) is ~1.2 m of arc.
      const n = Math.max(2, Math.ceil(Math.abs(z1 - z0) / 0.05) + Math.ceil(Math.abs(c1 - c0) * 24));
      for (let i = 0; i < n; i++) {
        const t = i / n;
        pts.push([z0 + (z1 - z0) * t, c0 + (c1 - c0) * t]);
      }
    }
    pts.push(ring[ring.length - 1]);

    const P = [], Nr = [];
    for (const [z, c] of pts) {
      const p = skinPoint(keys, z, c, N, cache);
      // Surface normal from the two tangents (along the profile, along z).
      const dz = 0.008, dc = 0.03;
      const tf = skinPoint(keys, z, Math.min(2, c + dc), N, cache)
        .sub(skinPoint(keys, z, Math.max(0, c - dc), N, cache));
      const tz = skinPoint(keys, z + dz, c, N, cache).sub(skinPoint(keys, z - dz, c, N, cache));
      const nrm = tf.cross(tz);
      if (nrm.lengthSq() < 1e-12) nrm.set(0, 1, 0); else nrm.normalize();
      // Orient outward: away from the body's interior axis at this station.
      const q = paramsAtZ(keys, z);
      if (nrm.dot(new THREE.Vector3(p.x, p.y - (q.yb + q.yt) * 0.5, 0)) < 0) nrm.negate();
      P.push(p); Nr.push(nrm);
    }

    const base = positions.length / 3;
    let len = 0;
    for (let i = 0; i < P.length; i++) {
      const a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)];
      // Averaged tangent (smooth across corners) and the single-segment
      // tangent (used only to size the miter).
      const tan = b.clone().sub(a);
      if (tan.lengthSq() < 1e-12) tan.set(0, 0, 1); else tan.normalize();
      const seg = (i > 0 ? P[i].clone().sub(a) : b.clone().sub(P[i]));
      if (seg.lengthSq() < 1e-12) seg.copy(tan); else seg.normalize();
      const bin = tan.clone().cross(Nr[i]);
      if (bin.lengthSq() < 1e-12) bin.set(1, 0, 0); else bin.normalize();
      // Miter: at a corner the averaged tangent turns the ribbon edge inward
      // and pinches a notch out of it, which on a 50 mm pillar reads as a
      // step. Widen by 1/cos(half-angle) so the outer edges stay straight.
      const segBin = seg.clone().cross(Nr[i]);
      const miter = segBin.lengthSq() > 1e-12
        ? 1 / Math.max(0.62, Math.abs(bin.dot(segBin.normalize()))) : 1;
      if (i > 0) len += P[i].distanceTo(P[i - 1]);
      const c = P[i].clone().addScaledVector(Nr[i], proud);
      for (const sgn of [-1, 1]) {
        const v = c.clone().addScaledVector(bin, sgn * width * 0.5 * miter);
        positions.push(v.x, v.y, v.z);
        normals.push(Nr[i].x, Nr[i].y, Nr[i].z);
        uvs.push(sgn > 0 ? 1 : 0, len);
      }
    }
    for (let i = 0; i < P.length - 1; i++) {
      const v00 = base + i * 2, v01 = v00 + 1, v10 = v00 + 2, v11 = v00 + 3;
      // Wound so the face normal is the OUTWARD surface normal: the opposite
      // order leaves every ribbon back-facing, i.e. culled from outside and
      // visible only as the far-side seam showing through the glass.
      indices.push(v00, v11, v10, v00, v01, v11);
    }
  };

  for (const seam of seams) {
    const w = seam.width ?? 0.010, pr = seam.proud ?? 0.004;
    emit(seam.path, w, pr);
    if (seam.mirror) emit(seam.path.map(([z, f]) => [z, -f]), w, pr);
  }

  if (!indices.length) return null;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeBoundingBox();
  geo.computeBoundingSphere();
  return geo;
}

/**
 * Sample the greenhouse (upper cabin) outline at a set of z positions, used to
 * place inset glass panels that hug the body. Returns rings of the upper
 * profile only (from a given shoulder height to the top centre).
 */
export function sampleUpperRings(keys, zList, N = 14) {
  const segs = keys.length - 1;
  // invert z(u) by scanning u; bodies are monotonic in z per ring step.
  const zAt = (u) => sampleField(keys, 'z', u);
  const uForZ = (z) => {
    let lo = 0, hi = segs;
    for (let it = 0; it < 40; it++) {
      const mid = (lo + hi) / 2;
      if (zAt(mid) < z) lo = mid; else hi = mid;
    }
    return (lo + hi) / 2;
  };
  return zList.map((z) => {
    const u = uForZ(z);
    const p = {
      hw: sampleField(keys, 'hw', u), yb: sampleField(keys, 'yb', u),
      hip: sampleField(keys, 'hip', u), yt: sampleField(keys, 'yt', u),
      topW: sampleField(keys, 'topW', u),
    };
    return { z, half: halfProfile(p, N), p };
  });
}

/**
 * Build an open glass-canopy ribbon over the cabin: the upper band of the body
 * cross-section (from a beltline fraction up over the roof and back down the
 * other side), swept across [zStart, zEnd]. Sits coincident with the painted
 * upper body; the glass material uses polygonOffset to draw just in front.
 */
export function buildGreenhouseShell(keys, opts = {}) {
  const N = opts.profilePoints ?? 14;
  const beltFrac = opts.beltFrac ?? 0.60;
  const iBelt = Math.round(beltFrac * (N - 1));
  const zStart = opts.zStart, zEnd = opts.zEnd;
  const steps = opts.steps ?? 24;
  // Stand the glazing a hair PROUD of the paint (outward along the surface
  // normal) so it draws cleanly in front of the painted cabin as a canopy over
  // the shell. Sitting it *under* the paint and forcing it forward with a strong
  // depth bias made the two near-parallel roof surfaces z-fight into a serrated
  // welt along the crown ("pinched fold above the windshield").
  const proud = opts.proud ?? 0.012;

  const segs = keys.length - 1;
  const zAt = (u) => sampleField(keys, 'z', u);
  const uForZ = (z) => {
    let lo = 0, hi = segs;
    for (let it = 0; it < 36; it++) {
      const mid = (lo + hi) / 2;
      if (zAt(mid) < z) lo = mid; else hi = mid;
    }
    return (lo + hi) / 2;
  };

  const positions = [];
  const uvs = [];
  let P = 0;
  for (let s = 0; s <= steps; s++) {
    const z = zStart + (zEnd - zStart) * (s / steps);
    const u = uForZ(z);
    const p = {
      hw: sampleField(keys, 'hw', u), yb: sampleField(keys, 'yb', u),
      hip: sampleField(keys, 'hip', u), yt: sampleField(keys, 'yt', u),
      topW: sampleField(keys, 'topW', u),
    };
    const half = halfProfile(p, N);
    const cx = 0;
    const cyTop = p.yt;
    // arc: right beltline -> top centre -> left beltline
    const arc = [];
    for (let k = iBelt; k <= N - 1; k++) arc.push(half[k]);
    for (let k = N - 2; k >= iBelt; k--) arc.push(new THREE.Vector2(-half[k].x, half[k].y));
    P = arc.length;
    for (let a = 0; a < P; a++) {
      // push each point outward from the cabin axis and up over the crown so the
      // canopy sits just above the paint skin — a real standoff, not a depth
      // bias, which is what keeps the roof from z-fighting.
      const px = arc[a].x * (1 + proud * 0.7);
      const py = arc[a].y + proud;
      positions.push(px, py, z);
      uvs.push(a / (P - 1), s / steps);
    }
  }

  const indices = [];
  for (let s = 0; s < steps; s++) {
    for (let a = 0; a < P - 1; a++) {
      const v00 = s * P + a, v01 = s * P + a + 1;
      const v10 = (s + 1) * P + a, v11 = (s + 1) * P + a + 1;
      indices.push(v00, v10, v11, v00, v11, v01);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}
