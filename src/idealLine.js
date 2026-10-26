import { getCarSpec, getDrivingLimits, planSpeedProfile } from './carSpecs.js';

/**
 * The ideal racing line for one car on one circuit: a lateral offset from the
 * centreline at every frame, chosen to minimise the lap time of the same
 * point-mass model the AI and the perfect-line aid plan with
 * (planSpeedProfile), using the whole road. The line is the car's own: the
 * model carries its grip, its wing, its brakes and its gearing, so the formula
 * car's fast-corner speed, the V8's long braking and slow exits and the
 * speedster's mechanical grip each shape where their driver turns in, how
 * deep the apex sits and how early the exit straightens. On the oval the GT3
 * runs the outside of the turns for radius while the formula car, flat out
 * on its wing, takes the shortest way round.
 *
 * The solver is coordinate descent with raised-cosine bumps, coarse to fine:
 * a bump the length of a corner first moves the whole corner out (a wider
 * arc) or dips its apex in (a flatter one: the bend is spread onto the
 * straights either side, where the tyres had nothing to do), then narrower
 * bumps set the entry, apex and exit. Every move is kept only if the lap time
 * falls, so the result is never worse than the centreline it starts from, and
 * the greedy accept never trades a slower corner for a shorter one. The
 * descent runs on every second frame (4.4 m) and the result is interpolated
 * back; the predicted lap on the GP circuit comes out within 0.2 s of a
 * full-resolution solve at a quarter of the cost, ~150 ms in V8. Results are
 * cached per circuit and car.
 */

// Tyre centres stay this far inside the road edge at the apex: a tyre's half
// width plus the tracking error the driver is allowed, which under braking
// at 100 km/h, where the line arrives at the outer edge for the turn-in, is
// most of a metre. The kerb beyond is a real step with less grip.
const EDGE_MARGIN = 1.1;
// Curvature at a frame is the circle through the line's points 4.4 m either
// side (±2 frames at the circuits' 2.2 m spacing), kept in metres so the
// solve frames agree with it. It is the same reading the AI steers by
// (ai.js pathCurvature), so the plan's speed at a sharp apex is for the
// curvature the wheel is actually given there: an average of finer readings
// came out 25 % lower at one GP apex, the speedster arrived 8 km/h too fast
// for the real bend and slid off the inside.
const CHORD_M = 4.4;
// [bump half-width in metres, step in metres, sweeps].
const LEVELS = [[176, 2.0, 2], [88, 1.5, 3], [44, 1.0, 3], [22, 0.5, 3], [11, 0.25, 1]];
// Frames under this spacing are solved at every second one.
const SOLVE_SPACING = 3.5;

const cache = new WeakMap();   // frames → Map(spec.id → line)

/** The furthest the body origin may sit from the centreline on this road. */
export function lineBound(roadWidth, spec) {
  return Math.max(0, roadWidth / 2 - spec.trackWidth / 2 - EDGE_MARGIN);
}

/** The solved line for `spec` on `track`, solved once and kept. */
export function idealLineFor(track, spec = getCarSpec()) {
  let byCar = cache.get(track.frames);
  if (!byCar) cache.set(track.frames, byCar = new Map());
  let line = byCar.get(spec.id);
  if (!line) byCar.set(spec.id, line = solveIdealLine(track.frames, track.width, spec));
  return line;
}

// Line geometry over a set of frames for an offset array: points, chords and
// the signed Menger curvature (the circle through each point and the points
// `reach` frames either side), rebuilt over any window.
function makeGeometry(frames, offset, reach) {
  const n = frames.length;
  const px = new Float64Array(n), pz = new Float64Array(n);
  const ds = new Float32Array(n);
  const kappa = new Float32Array(n), kAbs = new Float32Array(n);
  const wrap = (i) => ((i % n) + n) % n;
  function place(i) {
    const f = frames[i];
    px[i] = f.pos.x + f.left.x * offset[i];
    pz[i] = f.pos.z + f.left.z * offset[i];
  }
  function chord(i) {
    const j = i === n - 1 ? 0 : i + 1;
    ds[i] = Math.max(0.3, Math.hypot(px[j] - px[i], pz[j] - pz[i]));
  }
  function curve(i) {
    const a = wrap(i - reach), c = wrap(i + reach);
    const ux = px[i] - px[a], uz = pz[i] - pz[a];
    const vx = px[c] - px[i], vz = pz[c] - pz[i];
    const wx = px[c] - px[a], wz = pz[c] - pz[a];
    const cross = ux * vz - uz * vx;
    const denom = Math.hypot(ux, uz) * Math.hypot(vx, vz) * Math.hypot(wx, wz);
    kappa[i] = denom > 1e-9 ? 2 * cross / denom : 0;
    kAbs[i] = Math.abs(kappa[i]);
  }
  // Rebuild everything that frames lo..hi (unwrapped) of `offset` touch.
  function geometry(lo, hi) {
    if (hi - lo + 1 >= n) { lo = 0; hi = n - 1; }
    for (let k = lo; k <= hi; k++) place(wrap(k));
    for (let k = lo - 1; k <= hi; k++) chord(wrap(k));
    for (let k = lo - reach; k <= hi + reach; k++) curve(wrap(k));
  }
  function tangents() {
    const tanX = new Float32Array(n), tanZ = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const a = i === 0 ? n - 1 : i - 1, c = i === n - 1 ? 0 : i + 1;
      const dx = px[c] - px[a], dz = pz[c] - pz[a];
      const l = Math.hypot(dx, dz) || 1;
      tanX[i] = dx / l; tanZ[i] = dz / l;
    }
    return { tanX, tanZ };
  }
  return { n, px, pz, ds, kappa, kAbs, wrap, geometry, tangents };
}

/**
 * @param frames    centreline frames ({pos, tan, left}), closed
 * @param roadWidth metres of asphalt
 * @param spec      the car
 * @returns {{offset: Float32Array, kappa: Float32Array, ds: Float32Array,
 *   tanX: Float32Array, tanZ: Float32Array, profile: Float32Array,
 *   lapTime: number, centreTime: number, bound: number}}
 *   offset   metres toward `left` per frame
 *   kappa    signed curvature of the line per frame (1/m), read over ±4.4 m;
 *            positive where the heading turns toward `left`, the sign ai.js
 *            gives its pursuit curvature (cross = t.x·u.z − t.z·u.x > 0)
 *   ds       arc from each frame's line point to the next
 *   tanX/Z   unit tangent of the line at each frame
 *   profile  the perfect lap's speed per frame (skill 1)
 *   lapTime  that lap's time; centreTime the same car's time down the middle
 */
export function solveIdealLine(frames, roadWidth, spec = getCarSpec(), options = {}) {
  const n = frames.length;
  const bound = options.bound ?? lineBound(roadWidth, spec);
  const limits = getDrivingLimits(spec, 1);
  const trace = options.trace;

  // --- descent on the solve frames ---
  let spacing = 0;
  for (let i = 0; i < n; i++) spacing += frames[i].pos.distanceTo(frames[i === n - 1 ? 0 : i + 1].pos);
  spacing /= n;
  const reachFull = Math.max(1, Math.round(CHORD_M / spacing));
  const full = makeGeometry(frames, new Float32Array(n), reachFull);
  full.geometry(0, n - 1);
  const stride = spacing < SOLVE_SPACING ? 2 : 1;
  const solveFrames = stride === 1 ? frames : frames.filter((_, i) => i % stride === 0);
  const m = solveFrames.length;
  const coarse = new Float32Array(m);
  const g = makeGeometry(solveFrames, coarse, Math.max(1, Math.round(CHORD_M / (spacing * stride))));
  g.geometry(0, m - 1);
  const profile = new Float32Array(m);
  const centreTime = planSpeedProfile(limits, g.kAbs, g.ds, profile);
  let best = centreTime;
  const saved = new Float32Array(m);
  for (const [metres, step, sweeps] of LEVELS) {
    const W = Math.max(2, Math.round(metres / (spacing * stride)));
    const stride_ = Math.max(1, W >> 1);
    const t0 = trace && performance.now();
    let evals = 0;
    for (let sweep = 0; sweep < sweeps; sweep++) {
      let improved = false;
      // Stagger the centres between sweeps so the seams of one sweep are the
      // middles of the next.
      for (let c = Math.floor(sweep * stride_ / sweeps); c < m; c += stride_) {
        const lo = c - W + 1, hi = c + W - 1;
        for (const sign of [1, -1]) {
          for (let k = lo; k <= hi; k++) {
            const i = g.wrap(k);
            saved[i] = coarse[i];
            const bump = sign * step * 0.5 * (1 + Math.cos(Math.PI * (k - c) / W));
            coarse[i] = Math.min(bound, Math.max(-bound, coarse[i] + bump));
          }
          g.geometry(lo, hi);
          evals++;
          const t = planSpeedProfile(limits, g.kAbs, g.ds, profile);
          if (t < best - 1e-4) { best = t; improved = true; break; }
          for (let k = lo; k <= hi; k++) coarse[g.wrap(k)] = saved[g.wrap(k)];
          g.geometry(lo, hi);
        }
      }
      if (!improved) break;
    }
    if (trace) trace({ W, step, evals, ms: performance.now() - t0, lapTime: best });
  }

  // --- back to every frame: interpolate, smooth the quarter-metre steps the
  //     greedy accepts leave, and plan the finished line ---
  const offset = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const x = i / stride, a = Math.floor(x), b = a + 1 === m ? 0 : a + 1;
    offset[i] = coarse[a] + (coarse[b] - coarse[a]) * (x - a);
  }
  const tmp = new Float32Array(n);
  for (let pass = 0; pass < 2; pass++) {
    tmp.set(offset);
    for (let i = 0; i < n; i++) {
      offset[i] = (tmp[full.wrap(i - 2)] + 2 * tmp[full.wrap(i - 1)] + 3 * tmp[i]
        + 2 * tmp[full.wrap(i + 1)] + tmp[full.wrap(i + 2)]) / 9;
    }
  }
  const line = makeGeometry(frames, offset, reachFull);
  line.geometry(0, n - 1);
  const final = new Float32Array(n);
  const lapTime = planSpeedProfile(limits, line.kAbs, line.ds, final, 2);
  const centreFull = new Float32Array(n);
  const centreTimeFull = planSpeedProfile(limits, full.kAbs, full.ds, centreFull, 2);
  return {
    offset, kappa: line.kappa, ds: line.ds, ...line.tangents(),
    profile: final, lapTime, centreTime: centreTimeFull, bound, limits,
  };
}
