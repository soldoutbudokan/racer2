// Assign slots independently of car identity. Each Quick Race is a fresh draw;
// time trials and split-screen keep their established starting positions.
export function createStartingGrid(mode, count, random = Math.random) {
  const slots = Array.from({ length: count }, (_, index) => index);
  if (mode === 'quick-race') {
    for (let i = slots.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [slots[i], slots[j]] = [slots[j], slots[i]];
    }
  }
  return slots;
}
