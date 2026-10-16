// Exhaust the equally likely draw paths instead of relying on random samples.
import assert from 'node:assert/strict';
import { CAR_CHOICES } from '../src/carSelection.js';
import { createStartingGrid } from '../src/grid.js';
import { createRaceRoster } from '../src/raceRoster.js';

const allIds = CAR_CHOICES.map(choice => choice.id);
const originalChoices = [...CAR_CHOICES];
const reachable = new Set();
const noRandom = () => { throw new Error('An empty roster must not draw'); };
assert.deepEqual(createRaceRoster('gt', 0, noRandom), []);
for (const count of [-1, 6, 1.5, NaN]) {
  assert.throws(() => createRaceRoster('gt', count), RangeError);
}

for (const player of CAR_CHOICES) {
  const eligible = allIds.filter(id => id !== player.id);
  const rosters = new Map();
  const appearances = [new Map(), new Map(), new Map()];
  for (let first = 0; first < 5; first++) {
    for (let second = 0; second < 4; second++) {
      for (let third = 0; third < 3; third++) {
        const draws = [(first + 0.5) / 5, (second + 0.5) / 4, (third + 0.5) / 3];
        let consumed = 0;
        const roster = createRaceRoster(player.id, 3, () => {
          assert.ok(consumed < draws.length, 'three opponents need only three draws');
          return draws[consumed++];
        });
        assert.equal(consumed, 3, 'every fresh race draws a complete opponent roster');
        assert.equal(new Set(roster.map(choice => choice.id)).size, 3, 'opponents have distinct cars');
        assert.ok(roster.every(choice => choice.id !== player.id), 'opponents exclude the player car');
        assert.ok(roster.every(choice => CAR_CHOICES.includes(choice)), 'every draw is a real garage choice');
        assert.equal(CAR_CHOICES.find(choice => choice.id === player.id), player,
          'drawing rivals preserves the selected player object');
        const key = roster.map(choice => choice.id).join(',');
        rosters.set(key, (rosters.get(key) ?? 0) + 1);
        roster.forEach((choice, i) => {
          reachable.add(choice.id);
          appearances[i].set(choice.id, (appearances[i].get(choice.id) ?? 0) + 1);
        });
      }
    }
  }
  assert.equal(rosters.size, 60, `${player.id}: every ordered three-car roster is reachable`);
  assert.ok([...rosters.values()].every(count => count === 1), 'all roster draw paths have equal probability');
  for (const driver of appearances) {
    assert.deepEqual([...driver.keys()].sort(), [...eligible].sort(), 'every driver can receive every eligible car');
    assert.ok([...driver.values()].every(count => count === 12), 'driver assignments do not favor a car');
  }
}
assert.deepEqual([...reachable].sort(), [...allIds].sort(), 'all six cars can appear as opponents');
assert.deepEqual(CAR_CHOICES, originalChoices, 'drawing rosters never reorders the garage');
assert.deepEqual(createRaceRoster('unknown', 3, () => 0), createRaceRoster('gt', 3, () => 0),
  'an invalid player selection follows the existing GT fallback');

// Grid and roster consume separate draws in the same order as race startup.
// Changing the roster must not change the player's slot or bias the grid.
const gridCounts = new Map();
for (let j3 = 0; j3 < 4; j3++) for (let j2 = 0; j2 < 3; j2++) for (let j1 = 0; j1 < 2; j1++) {
  for (let first = 0; first < 5; first++) for (let second = 0; second < 4; second++) for (let third = 0; third < 3; third++) {
    const draws = [(j3 + 0.5) / 4, (j2 + 0.5) / 3, (j1 + 0.5) / 2,
      (first + 0.5) / 5, (second + 0.5) / 4, (third + 0.5) / 3];
    let consumed = 0;
    const random = () => draws[consumed++];
    const grid = createStartingGrid('quick-race', 4, random);
    const roster = createRaceRoster('gt', 3, random);
    assert.equal(consumed, 6, 'startup draws the grid and roster before constructing cars');
    assert.equal(roster.length, 3);
    const key = grid.join(',');
    gridCounts.set(key, (gridCounts.get(key) ?? 0) + 1);
  }
}
assert.equal(gridCounts.size, 24, 'roster randomization leaves every starting order reachable');
assert.ok([...gridCounts.values()].every(count => count === 60), 'every grid remains equally likely');
console.log('PASS: all six cars eligible, 60 uniform rosters per player, distinct rivals, preserved selection and independent grids');
