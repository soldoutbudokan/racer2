// Turn a real circuit centreline into game-scale Catmull-Rom control points —
// the offline tool that produced the five road circuits in src/tracks.js
// (2026-09-02). The game never runs this; its output is pasted in as data.
//
//   node scripts/realtrack.mjs <name> <csv|json> <scale> <minR> <minGap> [startShiftM] [flip]
//
// Input is either a TUMFTM racetrack-database CSV (x_m, y_m, ... per row;
// Spa, Monza, Sakhir, SaoPaulo were used at scales 0.415 / 0.50 / 0.52 /
// 0.63, minR 20, minGap 44 / 44 / 40 / 30) or a JSON array of [x, y] metres
// (Marina Bay was converted from the bacinger/f1-circuits GeoJSON, scale
// 0.55, minGap 36). Steps: scale and rotate so the start heads +z; resample
// at 3 m; open every corner tighter than minR (windowed Laplacian smoothing
// where curvature exceeds the limit); push non-adjacent sections apart to
// minGap (damped, spread over ±18 m of arc); pick control points densely on
// corners and sparsely on straights with the density ramping 25 % per point;
// leave the start straight collinear. Writes <name>.pts.js (paste into
// tracks.js, which must use curveType 'centripetal'), <name>.dense.json and
// an SVG preview. Then validate with scripts/track-geometry.mjs.
import { readFileSync, writeFileSync } from 'node:fs';

const [,, name, file, scaleS, minRS, minGapS, shiftS = '0', flipS = '0'] = process.argv;
const scale = +scaleS, minR = +minRS, minGap = +minGapS, rot = 0, startShift = +shiftS, flip = flipS === '1';

let raw;
if (file.endsWith('.csv')) {
  raw = readFileSync(file, 'utf8').split('\n').filter((l) => l && !l.startsWith('#'))
    .map((l) => l.split(',').map(Number)).map(([x, y]) => [x, y]);
} else {
  raw = JSON.parse(readFileSync(file, 'utf8'));
}
// Drop a duplicated closing point.
if (Math.hypot(raw[0][0] - raw[raw.length - 1][0], raw[0][1] - raw[raw.length - 1][1]) < 1) raw.pop();

// Scale, flip (mirror x → reverses handedness), rotate.
let pts = raw.map(([x, y]) => {
  let px = x * scale * (flip ? -1 : 1), pz = y * scale;
  const c = Math.cos(rot), s = Math.sin(rot);
  return [px * c - pz * s, px * s + pz * c];
});
if (flip) pts.reverse(); // keep the travel direction as driven (mirroring reverses the loop)

// Resample at even spacing.
function resample(p, step) {
  const n = p.length;
  const out = [];
  let acc = 0;
  out.push([p[0][0], p[0][1]]);
  for (let i = 0; i < n; i++) {
    const a = p[i], b = p[(i + 1) % n];
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]);
    let t = step - acc;
    while (t <= L) {
      out.push([a[0] + (b[0] - a[0]) * t / L, a[1] + (b[1] - a[1]) * t / L]);
      t += step;
    }
    acc = (acc + L) % step;
  }
  if (Math.hypot(out[0][0] - out[out.length - 1][0], out[0][1] - out[out.length - 1][1]) < step * 0.5) out.pop();
  return out;
}
const STEP = 3;
pts = resample(pts, STEP);
// Move the start/finish along the lap (metres) so it sits mid-straight.
if (startShift) {
  const k = Math.round(startShift / STEP);
  pts = pts.slice(k).concat(pts.slice(0, k));
}

// Rotate array so the start point is the first, then translate it to the
// origin and turn the initial heading to +z.
{
  const n = pts.length;
  const p0 = pts[0], p1 = pts[12], pm = pts[n - 12];
  const hx = p1[0] - pm[0], hz = p1[1] - pm[1];
  const ang = Math.atan2(hx, hz);     // current heading angle from +z
  const c = Math.cos(ang), s = Math.sin(ang);
  pts = pts.map(([x, z]) => {
    const dx = x - p0[0], dz = z - p0[1];
    return [dx * c - dz * s, dx * s + dz * c];
  });
}

function radiusAt(p, i) {
  const n = p.length;
  const a = p[(i - 1 + n) % n], b = p[i], c = p[(i + 1) % n];
  const v1x = b[0] - a[0], v1z = b[1] - a[1], v2x = c[0] - b[0], v2z = c[1] - b[1];
  const l1 = Math.hypot(v1x, v1z), l2 = Math.hypot(v2x, v2z);
  const dot = (v1x * v2x + v1z * v2z) / Math.max(1e-6, l1 * l2);
  const th = Math.acos(Math.min(1, Math.max(-1, dot)));
  return 1 / Math.max(1e-6, th / Math.max(0.5, (l1 + l2) / 2));
}

// Curvature limiter + separation, alternated.
function limitCurvature(p, rMin, iters) {
  const n = p.length;
  const pull = new Float64Array(n);
  for (let it = 0; it < iters; it++) {
    let worst = Infinity;
    pull.fill(0);
    for (let i = 0; i < n; i++) {
      const r = radiusAt(p, i);
      if (r < worst) worst = r;
      if (r < rMin) {
        const k = Math.min(0.5, 0.3 * (rMin / r));
        for (let w = -3; w <= 3; w++) {
          const j = (i + w + n) % n;
          pull[j] = Math.max(pull[j], k * (1 - Math.abs(w) / 4));
        }
      }
    }
    if (worst >= rMin) return worst;
    const q = p.map((v) => [v[0], v[1]]);
    for (let j = 0; j < n; j++) {
      if (!pull[j]) continue;
      const a = p[(j - 1 + n) % n], c = p[(j + 1) % n];
      q[j][0] += ((a[0] + c[0]) / 2 - p[j][0]) * pull[j];
      q[j][1] += ((a[1] + c[1]) / 2 - p[j][1]) * pull[j];
    }
    for (let i = 0; i < n; i++) { p[i][0] = q[i][0]; p[i][1] = q[i][1]; }
  }
  return -1;
}
function separate(p, dMin, span) {
  const n = p.length;
  let moved = 0;
  const push = p.map(() => [0, 0]);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const circ = Math.min(j - i, n - (j - i));
      if (circ < span) continue;
      const dx = p[j][0] - p[i][0], dz = p[j][1] - p[i][1];
      const d = Math.hypot(dx, dz);
      if (d >= dMin) continue;
      const need = Math.min(1.5, (dMin - d) / 2 * 0.35 + 0.1);
      const ux = d > 1e-3 ? dx / d : 1, uz = d > 1e-3 ? dz / d : 0;
      push[i][0] -= ux * need; push[i][1] -= uz * need;
      push[j][0] += ux * need; push[j][1] += uz * need;
      moved++;
    }
  }
  // Spread each push over neighbours so the road stays smooth.
  const sm = push.map(() => [0, 0]);
  for (let i = 0; i < n; i++) {
    for (let k = -6; k <= 6; k++) {
      const w = 1 - Math.abs(k) / 7;
      sm[(i + k + n) % n][0] += push[i][0] * w / 7;
      sm[(i + k + n) % n][1] += push[i][1] * w / 7;
    }
  }
  for (let i = 0; i < n; i++) { p[i][0] += sm[i][0]; p[i][1] += sm[i][1]; }
  return moved;
}
// Keep the start straight pinned: points within +-40 m of the start stay on x = 0.
function pinStart(p) {
  const n = p.length;
  for (let k = -10; k <= 10; k++) {
    const t = Math.abs(k) / 10;
    p[(k + n) % n][0] *= t * t * (3 - 2 * t);
  }
}
for (let round = 0; round < 8; round++) {
  limitCurvature(pts, minR, 300);
  pinStart(pts);
  const moved = minGap > 0 ? separate(pts, minGap, 25) : 0;
  pinStart(pts);
  if (!moved) { limitCurvature(pts, minR, 300); pinStart(pts); break; }
  console.log(`  round ${round}: ${moved} close pairs pushed`);
}
pts = resample(pts, STEP);
{ // re-pin after resample
  pinStart(pts);
  const p0 = pts[0]; pts = pts.map(([x, z]) => [x - p0[0], z - p0[1]]);
}

// Stats.
const n = pts.length;
let len = 0, worstR = Infinity, worstI = 0;
for (let i = 0; i < n; i++) {
  len += Math.hypot(pts[(i + 1) % n][0] - pts[i][0], pts[(i + 1) % n][1] - pts[i][1]);
  const r = radiusAt(pts, i); if (r < worstR) { worstR = r; worstI = i; }
}
let gap = Infinity;
for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
  const circ = Math.min(j - i, n - (j - i)); if (circ < 25) continue;
  const d = Math.hypot(pts[j][0] - pts[i][0], pts[j][1] - pts[i][1]); if (d < gap) gap = d;
}

// Adaptive control points: spacing from local radius (smoothed), gradual.
const rad = new Float64Array(n);
for (let i = 0; i < n; i++) rad[i] = radiusAt(pts, i);
const sm = new Float64Array(n);
for (let i = 0; i < n; i++) { let m = Infinity; for (let k = -4; k <= 4; k++) m = Math.min(m, rad[(i + k + n) % n]); sm[i] = m; }
const want = new Float64Array(n);
for (let i = 0; i < n; i++) {
  const r = sm[i];
  want[i] = r < 40 ? 6.5 : r < 80 ? 9 : r < 160 ? 13 : r < 400 ? 20 : 34;
}
// Density may only change by 25 % per control point in either direction, so
// a 34 m straight never lands next to a 6 m corner point (that step is what
// kinks a Catmull-Rom, centripetal or not).
for (let pass = 0; pass < 6; pass++) {
  for (let i = 0; i < n; i++) {
    const a = want[(i - 1 + n) % n], b = want[(i + 1) % n];
    want[i] = Math.min(want[i], a * 1.03, b * 1.03);   // per 3 m sample ≈ 25 % per point
  }
}
const spacingAt = (i) => want[i];
const cps = [];
// Force the start straight: points at -60, -30, 0, 30, 60 m along the start straight.
let acc = 0, s = 0;
const pos = [];  // arc position of each point
for (let i = 0; i < n; i++) { pos.push(s); s += Math.hypot(pts[(i + 1) % n][0] - pts[i][0], pts[(i + 1) % n][1] - pts[i][1]); }
let i = 0, nextAt = 0;
const chosen = [];
while (i < n) {
  if (pos[i] >= nextAt) {
    chosen.push(i);
    nextAt = pos[i] + spacingAt(i);
  }
  i++;
}
// Ensure closing spacing is not tiny.
if (chosen.length > 2 && (len - pos[chosen[chosen.length - 1]]) < 5) chosen.pop();
for (const k of chosen) cps.push(pts[k]);

let src = '';
for (const p of cps) src += `      [${p[0].toFixed(1)}, ${p[1].toFixed(1)}],\n`;
writeFileSync(`${name}.pts.js`, src);
writeFileSync(`${name}.dense.json`, JSON.stringify(pts.map(([x, z]) => [+x.toFixed(2), +z.toFixed(2)])));

// SVG preview.
{
  let minX = 1e9, maxX = -1e9, minZ = 1e9, maxZ = -1e9;
  for (const p of pts) { minX = Math.min(minX, p[0]); maxX = Math.max(maxX, p[0]); minZ = Math.min(minZ, p[1]); maxZ = Math.max(maxZ, p[1]); }
  const pad = 40, W = 900, sc = (W - 2 * pad) / Math.max(maxX - minX, maxZ - minZ);
  const H = (maxZ - minZ) * sc + 2 * pad;
  const px = (x) => pad + (x - minX) * sc, pz = (z) => H - (pad + (z - minZ) * sc);
  let d = '';
  pts.forEach((p, k) => { d += (k ? 'L' : 'M') + px(p[0]).toFixed(1) + ',' + pz(p[1]).toFixed(1); });
  let dots = '';
  for (const p of cps) dots += `<circle cx="${px(p[0]).toFixed(1)}" cy="${pz(p[1]).toFixed(1)}" r="2.2" fill="#fa0"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H.toFixed(0)}"><rect width="100%" height="100%" fill="#16261a"/>` +
    `<path d="${d}Z" fill="none" stroke="#3a3a3a" stroke-width="${(14 * sc).toFixed(1)}" stroke-linejoin="round"/>` +
    `<path d="${d}Z" fill="none" stroke="#eee" stroke-width="1"/>${dots}` +
    `<circle cx="${px(cps[0][0])}" cy="${pz(cps[0][1])}" r="6" fill="#ff0"/>` +
    `<line x1="${px(0)}" y1="${pz(0)}" x2="${px(0)}" y2="${pz(40)}" stroke="#ff0" stroke-width="3"/>` +
    `<text x="12" y="22" fill="#fff" font-size="16">${name} ${len.toFixed(0)} m, minR ${worstR.toFixed(0)} m, minGap ${gap.toFixed(0)} m, ${cps.length} cps</text></svg>`;
  writeFileSync(`${name}.svg`, svg);
}
console.log(`${name}: len ${len.toFixed(0)} m, minR ${worstR.toFixed(1)} m @${worstI}, minGap ${gap.toFixed(1)} m, ${cps.length} control points, bbox x[${Math.min(...pts.map(p=>p[0])).toFixed(0)},${Math.max(...pts.map(p=>p[0])).toFixed(0)}] z[${Math.min(...pts.map(p=>p[1])).toFixed(0)},${Math.max(...pts.map(p=>p[1])).toFixed(0)}]`);
