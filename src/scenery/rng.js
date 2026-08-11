/**
 * The scenery's random number generator.
 *
 * Every scatter in `track.js` and `scenery/*` used to draw from `Math.random()`,
 * which meant a circuit was rebuilt differently on every page load: the trees,
 * the crowd, the rocks, the aggregate speckle in the asphalt texture — all of
 * it re-rolled. That is invisible while playing, but it made before/after
 * screenshot comparison worthless. Two shooter runs of *byte-identical* code
 * differed on 56-81 % of a driving frame (measured with `scripts/pngdiff.mjs`,
 * 2026-08-06), so the noise floor was larger than any change a run could make.
 *
 * So the scenery draws from here instead. `rand()` is a drop-in for
 * `Math.random()`; `beginStream()` points it at a fresh, named, reproducible
 * sequence.
 *
 * ## Named streams, not one global sequence
 *
 * A single stream seeded once per circuit would be deterministic, but brittle
 * in the way that matters here: adding one draw to the tree scatter shifts
 * every draw made after it, so a change to the trees would also move the
 * grandstands, the rocks and the crowd. The diff would be the whole frame
 * again and we would be back where we started.
 *
 * Instead each builder gets its own stream, seeded from
 * `hash(circuit id, stream name)`. The streams are independent: editing the
 * tree scatter changes the trees and nothing else, because the grandstand
 * stream's seed never depended on how many numbers the trees consumed. That is
 * what makes a screenshot diff mean something — the pixels that moved are the
 * pixels you changed.
 *
 * Streams are per *circuit*, so two circuits sharing a builder still get
 * different scenery; and they are stable across reloads, so `monaco` looks the
 * same every time you load it.
 *
 * ## Using it
 *
 *   beginStream('trees');     // in createTrack, before the builder runs
 *   ...
 *   rand()                    // inside the builder, exactly like Math.random()
 *
 * Builders don't take a stream argument — they call `rand()` and inherit
 * whichever stream is current. A builder called from inside another builder
 * (the ground-cover sub-scatters, the canvas texture makers) shares its
 * caller's stream, which is what you want: they are one visual feature.
 *
 * Do not reach for `Math.random()` in scenery code. There is a `physics-test`
 * gate that builds the same circuit twice and compares every vertex, so a
 * stray one will fail the suite rather than quietly re-randomise the world.
 */

// mulberry32: one multiply-xorshift round over a 32-bit counter. Chosen for
// being four lines and holding no state beyond a single int — the whole point
// here is reproducibility, and a tree scatter does not need a better
// distribution than this.
function mulberry32(seed) {
  let state = seed | 0;
  return function next() {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * FNV-1a over a string. Turns ('monaco', 'trees') into a seed; any cheap
 * avalanching hash would do, this one is short.
 */
function hashString(s) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/**
 * An independent generator keyed by a string. Use this when a caller wants its
 * own sequence rather than the current stream — `scene.js` takes one for the
 * AO denoise pattern, which is built once at startup, long before any circuit
 * exists.
 */
export function makeRandom(key) {
  const next = mulberry32(hashString(String(key)));
  // mulberry32's first output is a weak function of a low-entropy seed: two
  // seeds one apart give two very close first draws. Discard a few rounds so
  // adjacent stream names don't start with near-identical numbers.
  for (let i = 0; i < 4; i++) next();
  return next;
}

// The stream `rand()` currently draws from, and the circuit half of every
// stream seed. Both are set by seedCircuit()/beginStream() below.
let current = makeRandom('unseeded');
let circuitKey = '';

/** Next float in [0, 1). Drop-in replacement for `Math.random()`. */
export function rand() {
  return current();
}

/**
 * Bind the RNG to a circuit. Call once at the top of `createTrack`, before any
 * builder runs — everything scattered after this point is reproducible for
 * this circuit id.
 */
export function seedCircuit(id) {
  circuitKey = String(id ?? '');
  beginStream('circuit');
}

/**
 * Start the named stream. Every call with the same (circuit, name) pair
 * restarts the identical sequence, independently of what any other stream has
 * consumed.
 */
export function beginStream(name) {
  // Mixing the two parts through one hash (rather than combining two hashes)
  // keeps 'grand' + 'stands' from colliding with 'grands' + 'tands'.
  current = makeRandom(circuitKey + ' ' + name);
}
