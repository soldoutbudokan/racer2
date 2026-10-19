import { getCarSpec, peakPowerW } from './carSpecs.js';

// The six cars. Ratings compare the packages with each other on the game's
// own measurements (scripts/car-balance-test.mjs runs the real physics and
// checks the orderings below against it); they are not manufacturer claims.
// The ids are stable so saved selections keep working.
const choice = (data) => Object.freeze({ ...data, ratings: Object.freeze(data.ratings) });
export const CAR_CHOICES = Object.freeze([
  choice({ id: 'gt', name: 'GT3 Coupe', color: 0xc8161d, colorName: 'Rosso', role: 'All-rounder',
    strength: 'Strong brakes, real downforce and 555 hp through slicks: dependable everywhere.',
    tradeoff: 'Not the quickest launch, nor the fastest on a long straight.',
    ratings: { acceleration: 9, speed: 8, handling: 8, braking: 8 } }),
  choice({ id: 'hatch', name: 'Rally Hatch', color: 0x2588d1, colorName: 'Glacier blue', role: 'Grip & recovery',
    strength: 'Four-wheel drive and a 2.5 m wheelbase: the best launch in the field, darts into corners and barely notices the grass.',
    tradeoff: 'A 230 km/h ceiling, small brakes and a nose that pushes when hurried.',
    ratings: { acceleration: 8, speed: 5, handling: 8, braking: 5 } }),
  choice({ id: 'open-wheel', name: 'Formula', color: 0xf0b82f, colorName: 'Sunburst', role: 'Downforce',
    strength: '800 kg, a 440 hp V10 to 11,500 rpm and the most wing here: fast-corner speeds and braking nothing else can touch.',
    tradeoff: 'A brick through the air, so the straights belong to others, and helpless off the asphalt.',
    ratings: { acceleration: 9, speed: 4, handling: 9, braking: 10 } }),
  choice({ id: 'muscle', name: 'Classic V8', color: 0xd86632, colorName: 'Burnt copper', role: 'Big-block torque',
    strength: 'A seven-litre V8 in a 1,600 kg fastback: the second-highest top speed, on tall tyres that shrug off the grass.',
    tradeoff: 'Slow steering, little grip, a tail that steps out under power, and four long gears to light up.',
    ratings: { acceleration: 5, speed: 8, handling: 4, braking: 6 } }),
  choice({ id: 'roadster', name: 'Speedster', color: 0x248b76, colorName: 'Racing green', role: 'Lightweight',
    strength: '820 kg with no roof: the quickest steering here and the most grip in slow corners.',
    tradeoff: 'Only 265 hp and no wing: nothing in reserve on the straights, and the GT3 and the formula car out-corner it in fast bends.',
    ratings: { acceleration: 7, speed: 5, handling: 10, braking: 8 } }),
  choice({ id: 'supercar', name: 'Hypercar', color: 0x7462d9, colorName: 'Iris metallic', role: 'Straight-line speed',
    strength: 'A twin-turbo V12 near 780 hp and the slipperiest body: the only car that clears 300 km/h.',
    tradeoff: 'Lights up its rears in the low gears, and its mass tells on the brakes and in direction changes.',
    ratings: { acceleration: 10, speed: 10, handling: 6, braking: 7 } }),
]);

const STORAGE_KEY = 'racer2.car';

export function getCarChoice(id) {
  return CAR_CHOICES.find(choice => choice.id === id) || CAR_CHOICES[0];
}

export function loadCarChoice() {
  try {
    return getCarChoice(localStorage.getItem(STORAGE_KEY));
  } catch {
    return getCarChoice();
  }
}

export function saveCarChoice(id) {
  const choice = getCarChoice(id);
  try {
    localStorage.setItem(STORAGE_KEY, choice.id);
  } catch {
    // Car selection still works when browser storage is unavailable.
  }
  return choice;
}

// Native radios provide Tab, arrow-key and screen-reader support. The caller
// receives the saved initial choice and handles rendering only on changes.
export function initCarSelector(onChange) {
  const options = document.querySelector('.car-options');
  options.replaceChildren(...CAR_CHOICES.map(choice => {
    const label = document.createElement('label');
    label.className = 'car-option';
    const input = document.createElement('input');
    input.type = 'radio'; input.name = 'car'; input.value = choice.id;
    const content = document.createElement('span');
    content.className = 'car-option-content';
    const swatch = document.createElement('i');
    swatch.className = 'car-swatch';
    swatch.style.backgroundColor = `#${choice.color.toString(16).padStart(6, '0')}`;
    swatch.setAttribute('aria-hidden', 'true');
    const name = document.createElement('span');
    name.className = 'car-option-name'; name.textContent = choice.name;
    const role = document.createElement('span');
    role.className = 'car-option-color'; role.textContent = choice.role;
    content.append(swatch, name, role);
    label.append(input, content);
    return label;
  }));
  const inputs = [...options.querySelectorAll('input')];
  const performance = document.getElementById('car-performance');
  const metrics = [
    ['acceleration', 'Acceleration'], ['speed', 'Top speed'],
    ['handling', 'Handling'], ['braking', 'Braking'],
  ];
  const meters = metrics.map(([key, title]) => {
    const row = document.createElement('label');
    row.className = 'car-rating';
    const text = document.createElement('span'); text.textContent = title;
    const meter = document.createElement('meter');
    meter.min = 0; meter.max = 10;
    meter.setAttribute('aria-label', title);
    const value = document.createElement('strong');
    row.append(text, meter, value); performance.append(row);
    return { key, meter, value };
  });
  const caption = document.getElementById('garage-caption');
  const canvas = document.getElementById('garage');
  let selected = loadCarChoice();

  function update(choice) {
    selected = choice;
    for (const input of inputs) input.checked = input.value === choice.id;
    const number = String(CAR_CHOICES.indexOf(choice) + 1).padStart(2, '0');
    caption.textContent = `${number} / ${choice.name.toUpperCase()}`;
    canvas.setAttribute('aria-label', `${choice.colorName} ${choice.name} racing car`);
    document.getElementById('car-selection-note').textContent = `${choice.strength} ${choice.tradeoff}`;
    for (const { key, meter, value } of meters) {
      meter.value = choice.ratings[key];
      value.textContent = `${choice.ratings[key]}/10`;
    }
    const spec = getCarSpec(choice.id);
    document.getElementById('car-spec-power').textContent = Math.round(peakPowerW(spec) / 745.7);
    document.getElementById('car-spec-mass').textContent = spec.massKg.toLocaleString('en');
    const gears = document.getElementById('car-spec-gears');
    if (gears) gears.textContent = spec.gears.length;
  }

  update(selected);
  for (const input of inputs) {
    input.addEventListener('change', () => {
      if (!input.checked || input.value === selected.id) return;
      const choice = saveCarChoice(input.value);
      update(choice);
      onChange(choice);
    });
  }
  return selected;
}
