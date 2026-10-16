import { CAR_CHOICES, getCarChoice } from './carSelection.js';

// Draw opponent cars independently of driver identity and starting position.
// Partial Fisher–Yates gives every ordered set the same probability, without
// duplicates or replacing the player's selected car.
export function createRaceRoster(playerId, count = 3, random = Math.random) {
  const player = getCarChoice(playerId);
  const eligible = CAR_CHOICES.filter(choice => choice.id !== player.id);
  if (!Number.isInteger(count) || count < 0 || count > eligible.length) {
    throw new RangeError('Opponent count must fit the available cars');
  }
  for (let i = 0; i < count; i++) {
    const j = i + Math.floor(random() * (eligible.length - i));
    [eligible[i], eligible[j]] = [eligible[j], eligible[i]];
  }
  return eligible.slice(0, count);
}
