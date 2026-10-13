// Enumerate the complete four-car draw space instead of using a flaky
// statistical check. Equal-probability draw paths must cover each grid once.
import assert from 'node:assert/strict';
import { createStartingGrid } from '../src/grid.js';

const noRandom = () => { throw new Error('This mode must not draw a grid'); };
for (const [mode, count] of [['time-trial', 1], ['two-player', 2], ['time-trial', 4]]) {
  assert.deepEqual(createStartingGrid(mode, count, noRandom), Array.from({ length: count }, (_, i) => i),
    `${mode} keeps its ordered starting slots`);
}
for (const count of [0, 1]) {
  assert.deepEqual(createStartingGrid('quick-race', count, noRandom), Array.from({ length: count }, (_, i) => i),
    `${count} cars need no random draw`);
}

const permutations = new Map();
const playerSlots = [0, 0, 0, 0];
for (let j3 = 0; j3 < 4; j3++) {
  for (let j2 = 0; j2 < 3; j2++) {
    for (let j1 = 0; j1 < 2; j1++) {
      const draws = [(j3 + 0.5) / 4, (j2 + 0.5) / 3, (j1 + 0.5) / 2];
      let consumed = 0;
      const grid = createStartingGrid('quick-race', 4, () => {
        assert(consumed < draws.length, 'four-car grid uses only three draws');
        return draws[consumed++];
      });
      assert.equal(consumed, 3, 'every Quick Race draws a fresh complete grid');
      assert.deepEqual([...grid].sort((a, b) => a - b), [0, 1, 2, 3], 'every car gets one unique valid slot');
      const key = grid.join(',');
      permutations.set(key, (permutations.get(key) ?? 0) + 1);
      playerSlots[grid[0]]++;
    }
  }
}
assert.equal(permutations.size, 24, 'all 24 starting orders are reachable');
assert([...permutations.values()].every(count => count === 1), 'each starting order has exactly one equal-probability draw path');
assert.deepEqual(playerSlots, [6, 6, 6, 6], 'the player has equal probability of every starting slot');

console.log('PASS: ordered solo/split grids, unique slots, all 24 Quick Race orders and uniform player positions');
