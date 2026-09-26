export const CAR_CHOICES = Object.freeze([
  Object.freeze({ id: 'gt', name: 'GT Coupe', color: 0xc8161d, colorName: 'Red' }),
  Object.freeze({ id: 'muscle', name: 'Muscle', color: 0x2588d1, colorName: 'Blue' }),
  Object.freeze({ id: 'open-wheel', name: 'Open Wheel', color: 0xf0b82f, colorName: 'Yellow' }),
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
  const inputs = [...document.querySelectorAll('input[name="car"]')];
  const caption = document.getElementById('garage-caption');
  const canvas = document.getElementById('garage');
  let selected = loadCarChoice();

  function update(choice) {
    selected = choice;
    for (const input of inputs) input.checked = input.value === choice.id;
    const number = String(CAR_CHOICES.indexOf(choice) + 1).padStart(2, '0');
    caption.textContent = `${number} / ${choice.name.toUpperCase()}`;
    canvas.setAttribute('aria-label', `${choice.colorName} ${choice.name} racing car`);
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
