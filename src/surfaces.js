// ---------- Surface detection ----------
// Per-wheel surface lookup so half-on-grass actually behaves like it.
// Uses the car's nearest centreline frame as a hint, then refines per wheel
// in a small window — cheap enough to run for every car every frame.
//
// Shared by the game loop and the Node AI suite (scripts/ai-test.mjs), so a
// headless lap runs on the same surface rules as the game.
const _surfScratch = ['road', 'road', 'road', 'road'];

export function nearestFrameIndex(track, position) {
  const frames = track.frames;
  let bestI = 0;
  let bestD = Infinity;
  for (let i = 0; i < frames.length; i++) {
    const dx = frames[i].pos.x - position.x;
    const dz = frames[i].pos.z - position.z;
    const d = dx * dx + dz * dz;
    if (d < bestD) { bestD = d; bestI = i; }
  }
  return bestI;
}

// Returns a shared scratch array; callers copy it before the next call.
export function wheelSurfaces(track, car) {
  const frames = track.frames;
  const n = frames.length;
  const hint = nearestFrameIndex(track, car.body.position);
  for (let w = 0; w < 4; w++) {
    const wi = car.vehicle.wheelInfos[w];
    const p = wi.isInContact
      ? wi.raycastResult.hitPointWorld
      : wi.chassisConnectionPointWorld;
    // Refine nearest frame around the hint (frames are ~2.6 m apart).
    let bestI = hint;
    let bestD = Infinity;
    for (let k = -4; k <= 4; k++) {
      const i = (hint + k + n) % n;
      const dx = frames[i].pos.x - p.x;
      const dz = frames[i].pos.z - p.z;
      const d = dx * dx + dz * dz;
      if (d < bestD) { bestD = d; bestI = i; }
    }
    const f = frames[bestI];
    const lat = Math.abs(
      (p.x - f.pos.x) * f.left.x + (p.z - f.pos.z) * f.left.z);
    const halfRoad = track.width / 2;
    if (lat <= halfRoad) _surfScratch[w] = 'road';
    else if (lat <= halfRoad + track.kerbWidth) _surfScratch[w] = 'kerb';
    else _surfScratch[w] = track.isGravel && track.isGravel(bestI) ? 'gravel' : 'grass';
  }
  return _surfScratch;
}
