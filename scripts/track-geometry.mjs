// Track layout validator + plotter. Samples each track's centreline exactly
// like src/track.js (CatmullRomCurve3, 600 arc-spaced frames), reports
// geometry stats, and writes one SVG per track for visual review.
//   node scripts/track-geometry.mjs [outDir]     (run from repo root)
// Checks worth acting on:
//   - tight: every corner under 60 m radius. gp's tightest is ~10 m and it
//     drives fine, but new layouts should stay >= ~18 m (Catmull-Rom kinks
//     below that read as glitches, not corners).
//   - minGap FAIL: two non-adjacent road sections closer than 2 x armco —
//     the barriers would overlap between them.
//   - startDrift: heading wobble around the start line; keep < ~2 deg so the
//     painted grid sits on a straight.
import * as THREE from 'three';
import { TRACKS } from '../src/tracks.js';
import { writeFileSync, mkdirSync } from 'node:fs';

const OUT = process.argv[2] || '/tmp/track-layouts';
mkdirSync(OUT, { recursive: true });
const SEGS = 600;

function sample(def) {
  const cps = def.controlPoints.map(([x, z]) => new THREE.Vector3(x, 0, z));
  const curve = new THREE.CatmullRomCurve3(cps, def.closed !== false, 'catmullrom', def.tension ?? 0.5);
  const frames = [];
  for (let i = 0; i < SEGS; i++) {
    const t = i / SEGS;
    frames.push({ pos: curve.getPointAt(t), tan: curve.getTangentAt(t).normalize() });
  }
  return frames;
}

function stats(def, frames) {
  const n = frames.length;
  let len = 0;
  for (let i = 0; i < n; i++) len += frames[i].pos.distanceTo(frames[(i + 1) % n].pos);

  // Turn radius from adjacent chords (same maths as racingLine.js kappa).
  let minR = Infinity, minRi = 0;
  const radii = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const a = frames[(i - 1 + n) % n].pos, b = frames[i].pos, c = frames[(i + 1) % n].pos;
    const v1x = b.x - a.x, v1z = b.z - a.z, v2x = c.x - b.x, v2z = c.z - b.z;
    const l1 = Math.hypot(v1x, v1z), l2 = Math.hypot(v2x, v2z);
    const dot = (v1x * v2x + v1z * v2z) / Math.max(1e-6, l1 * l2);
    const theta = Math.acos(Math.min(1, Math.max(-1, dot)));
    const kappa = theta / Math.max(0.5, (l1 + l2) / 2);
    radii[i] = 1 / Math.max(1e-6, kappa);
    if (radii[i] < minR) { minR = radii[i]; minRi = i; }
  }

  // Barrier-overlap check: min distance between frames that are non-adjacent
  // along the arc (>= 25 frames apart, wrap included) vs 2 x ARMCO_OFFSET.
  const armco = (def.roadWidth ?? 14) / 2 + (def.runoffWidth ?? 5.5) + 0.5;
  let minGap = Infinity, gi = 0, gj = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const circ = Math.min(j - i, n - (j - i));
      if (circ < 25) continue;
      const d = frames[i].pos.distanceTo(frames[j].pos);
      if (d < minGap) { minGap = d; gi = i; gj = j; }
    }
  }

  // Start-straight check: heading drift over frames [-8..+8] around the line.
  let maxDrift = 0;
  const t0 = frames[0].tan;
  for (let k = -8; k <= 8; k++) {
    const t = frames[(k + n) % n].tan;
    const ang = Math.acos(Math.min(1, Math.max(-1, t0.dot(t)))) * 180 / Math.PI;
    maxDrift = Math.max(maxDrift, ang);
  }

  let minX = 1e9, maxX = -1e9, minZ = 1e9, maxZ = -1e9;
  for (const f of frames) {
    minX = Math.min(minX, f.pos.x); maxX = Math.max(maxX, f.pos.x);
    minZ = Math.min(minZ, f.pos.z); maxZ = Math.max(maxZ, f.pos.z);
  }
  return { len, minR, minRi, minGap, gi, gj, armco, maxDrift, box: [minX, maxX, minZ, maxZ], radii };
}

function localMinima(radii, frames) {
  // Local minima of radius below 60 m, suppressed within +/-15 frames.
  const n = radii.length;
  const mins = [];
  for (let i = 0; i < n; i++) {
    let isMin = radii[i] < 60;
    for (let k = -15; k <= 15 && isMin; k++) {
      if (radii[(i + k + n) % n] < radii[i]) isMin = false;
    }
    if (isMin) {
      const p = frames[i].pos;
      mins.push(`R${radii[i].toFixed(0)}@(${p.x.toFixed(0)},${p.z.toFixed(0)})`);
    }
  }
  return mins;
}

let report = '';
for (const def of TRACKS) {
  const frames = sample(def);
  const s = stats(def, frames);
  const need = 2 * s.armco;
  const gapOK = s.minGap >= need ? 'OK' : `FAIL (need ${need.toFixed(1)})`;
  report +=
    `${def.id.padEnd(10)} len=${s.len.toFixed(0)}m  minR=${s.minR.toFixed(0)}m@f${s.minRi}` +
    `  minGap=${s.minGap.toFixed(1)}m ${gapOK} (f${s.gi}<->f${s.gj})` +
    `  startDrift=${s.maxDrift.toFixed(2)}deg` +
    `  box x[${s.box[0].toFixed(0)},${s.box[1].toFixed(0)}] z[${s.box[2].toFixed(0)},${s.box[3].toFixed(0)}]\n` +
    `           tight: ${localMinima(s.radii, frames).join('  ') || '(none < 60m)'}\n`;

  // ---- SVG: road ribbon + centreline coloured by radius + start marker ----
  const [minX, maxX, minZ, maxZ] = s.box;
  const pad = 40, W = 900;
  const scale = (W - 2 * pad) / Math.max(maxX - minX, maxZ - minZ);
  const H = (maxZ - minZ) * scale + 2 * pad;
  const px = (x) => pad + (x - minX) * scale;
  const pz = (z) => H - (pad + (z - minZ) * scale); // +z up
  const half = (def.roadWidth ?? 14) / 2;

  const left = [], right = [];
  for (const f of frames) {
    const lx = -f.tan.z, lz = f.tan.x;
    left.push(`${px(f.pos.x + lx * half).toFixed(1)},${pz(f.pos.z + lz * half).toFixed(1)}`);
    right.push(`${px(f.pos.x - lx * half).toFixed(1)},${pz(f.pos.z - lz * half).toFixed(1)}`);
  }
  const road = `<polygon points="${left.join(' ')} ${right.reverse().join(' ')}" fill="#444" stroke="none"/>`;

  let segsSvg = '';
  for (let i = 0; i < SEGS; i++) {
    const f = frames[i], g = frames[(i + 1) % SEGS];
    const r = s.radii[i];
    const col = r < 40 ? '#ff2222' : r < 80 ? '#ff9922' : r < 200 ? '#ffee22' : '#22cc44';
    segsSvg += `<line x1="${px(f.pos.x).toFixed(1)}" y1="${pz(f.pos.z).toFixed(1)}" x2="${px(g.pos.x).toFixed(1)}" y2="${pz(g.pos.z).toFixed(1)}" stroke="${col}" stroke-width="2"/>`;
  }
  const f0 = frames[0];
  const arrow = `<circle cx="${px(f0.pos.x)}" cy="${pz(f0.pos.z)}" r="7" fill="#fff"/>` +
    `<line x1="${px(f0.pos.x)}" y1="${pz(f0.pos.z)}" x2="${px(f0.pos.x + f0.tan.x * 30)}" y2="${pz(f0.pos.z + f0.tan.z * 30)}" stroke="#fff" stroke-width="3"/>`;
  let cpsSvg = '';
  def.controlPoints.forEach(([x, z], i) => {
    cpsSvg += `<circle cx="${px(x)}" cy="${pz(z)}" r="3" fill="#3af"/>` +
      `<text x="${px(x) + 5}" y="${pz(z) - 4}" fill="#8cf" font-size="10">${i}</text>`;
  });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H.toFixed(0)}">` +
    `<rect width="100%" height="100%" fill="#111"/>${road}${segsSvg}${cpsSvg}${arrow}` +
    `<text x="12" y="22" fill="#fff" font-size="16">${def.id} — ${def.name} (${s.len.toFixed(0)} m, minR ${s.minR.toFixed(0)} m)</text></svg>`;
  writeFileSync(`${OUT}/layout-${def.id}.svg`, svg);
}
console.log(report);
console.log(`SVGs written to ${OUT} (render: qlmanage -t -s 900 -o ${OUT} ${OUT}/layout-*.svg)`);
