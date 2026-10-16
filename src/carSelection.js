import { getCarSpec } from './carSpecs.js';

// Ratings compare the six club-racing setups, not real-world manufacturer specs.
// The balance probe exercises the same physics used in a race.
const choice = (data) => Object.freeze({ ...data, ratings: Object.freeze(data.ratings) });
export const CAR_CHOICES = Object.freeze([
  choice({ id: 'gt', name: 'GT Coupe', color: 0xc8161d, colorName: 'Rosso', role: 'All-rounder',
    strength: 'Composed through fast bends with dependable braking.',
    tradeoff: 'Gives away launch pace and outright speed to the specialists.',
    ratings: { acceleration: 8, speed: 7, handling: 7, braking: 8 } }),
  choice({ id: 'hatch', name: 'Rally Hatch', color: 0x2588d1, colorName: 'Glacier blue', role: 'Grip & recovery',
    strength: 'Quick off the line and forgiving over kerbs and loose surfaces.',
    tradeoff: 'Short gearing and drag limit its speed on long straights.',
    ratings: { acceleration: 10, speed: 5, handling: 8, braking: 8 } }),
  choice({ id: 'open-wheel', name: 'Open Wheel', color: 0xf0b82f, colorName: 'Sunburst', role: 'Fast-corner grip',
    strength: 'Downforce builds grip at speed and supports late braking.',
    tradeoff: 'Keep it on the asphalt: rough surfaces cost it dearly.',
    ratings: { acceleration: 9, speed: 6, handling: 9, braking: 10 } }),
  choice({ id: 'muscle', name: 'Classic V8', color: 0xd86632, colorName: 'Burnt copper', role: 'Rolling power',
    strength: 'Big V8 torque pulls hard when the road opens up.',
    tradeoff: 'Heavy steering and longer stops reward an early braking point.',
    ratings: { acceleration: 6, speed: 8, handling: 5, braking: 5 } }),
  choice({ id: 'roadster', name: 'Club Roadster', color: 0x248b76, colorName: 'Racing green', role: 'Quick direction changes',
    strength: 'Light and responsive, with the quickest steering in the field.',
    tradeoff: 'Modest power and little downforce cost time in fast sections.',
    ratings: { acceleration: 7, speed: 7, handling: 10, braking: 7 } }),
  choice({ id: 'supercar', name: 'Apex Supercar', color: 0x7462d9, colorName: 'Iris metallic', role: 'Straight-line speed',
    strength: 'A slippery body and tall gearing deliver the highest top speed.',
    tradeoff: 'Slower launches and longer braking zones hurt in tight sections.',
    ratings: { acceleration: 5, speed: 10, handling: 6, braking: 5 } }),
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
    const power = Math.max(...spec.torqueCurve.map(([rpm, torque]) => rpm * torque * Math.PI / 30 / 745.7));
    document.getElementById('car-spec-power').textContent = Math.round(power);
    document.getElementById('car-spec-mass').textContent = spec.massKg.toLocaleString('en');
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
