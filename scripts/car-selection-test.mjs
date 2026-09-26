// Car preferences plus the actual menu -> race -> restart flow.
// Run with --unit for storage checks only, or start Vite for the full suite.
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright-core';
import { CAR_CHOICES, getCarChoice, loadCarChoice, saveCarChoice } from '../src/carSelection.js';

const expectedChoices = [
  { id: 'gt', color: 0xc8161d },
  { id: 'muscle', color: 0x2588d1 },
  { id: 'open-wheel', color: 0xf0b82f },
];
assert.deepEqual(CAR_CHOICES.map(({ id, color }) => ({ id, color })), expectedChoices);
const storageDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
try {
  delete globalThis.localStorage;
  assert.equal(loadCarChoice().id, 'gt', 'missing storage keeps the default car');
  assert.doesNotThrow(() => saveCarChoice('muscle'), 'selection works without storage');

  const values = new Map();
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
  } });
  assert.equal(loadCarChoice().id, 'gt', 'a new player starts with the red GT');
  for (const id of [undefined, null, '', 'unknown-car', '__proto__']) {
    assert.equal(getCarChoice(id).id, 'gt', `unknown choice ${String(id)} falls back to GT`);
    values.set('racer2.car', id);
    assert.equal(loadCarChoice().id, 'gt', `invalid saved choice ${String(id)} falls back to GT`);
  }
  for (const choice of CAR_CHOICES) {
    saveCarChoice(choice.id);
    assert.equal(values.get('racer2.car'), choice.id, 'selection saves the stable car id');
    assert.equal(loadCarChoice(), choice, 'saved selection restores its appearance');
  }
  saveCarChoice('removed-car');
  assert.equal(values.get('racer2.car'), 'gt', 'an unknown saved id is normalized');

  Object.defineProperty(globalThis, 'localStorage', { configurable: true, get() {
    throw new Error('Storage is blocked');
  } });
  assert.equal(loadCarChoice().id, 'gt', 'blocked storage keeps the default car');
  assert.doesNotThrow(() => saveCarChoice('open-wheel'), 'blocked storage does not prevent selection');
} finally {
  if (storageDescriptor) Object.defineProperty(globalThis, 'localStorage', storageDescriptor);
  else delete globalThis.localStorage;
}
console.log('PASS: car defaults, invalid preferences, persistence and unavailable storage');

if (!process.argv.includes('--unit')) await checkBrowser();

async function checkBrowser() {
  const out = process.env.QA_DIR || 'qa';
  mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_EXE || chromium.executablePath(),
    headless: true,
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'],
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.setDefaultTimeout(120000);

  async function ready() {
    await page.waitForFunction(() => window.__ctx?.selectedCar &&
      !document.getElementById('menu').classList.contains('hidden') &&
      getComputedStyle(document.getElementById('loading')).opacity === '0');
  }

  async function select(id) {
    await page.locator(`input[name="car"][value="${id}"]`).check();
    await page.waitForFunction(id => window.__ctx.selectedCar.id === id, id);
  }

  async function checkSelection(id) {
    assert.equal(await page.locator('input[name="car"]:checked').inputValue(), id);
    assert.equal(await page.evaluate(() => window.__ctx.selectedCar.id), id);
    const choice = getCarChoice(id);
    assert.match(await page.locator('#garage').getAttribute('aria-label'), new RegExp(choice.name, 'i'));
    assert.match(await page.locator('#garage-caption').innerText(), new RegExp(choice.name, 'i'));
  }

  async function checkRace(choice, mode) {
    const state = await page.evaluate(() => ({
      mode: window.__ctx.mode,
      cars: window.__ctx.cars.map(entry => ({
        id: entry.car.body.id,
        archetype: entry.car.archetype,
        color: entry.color,
        isPlayer: entry.isPlayer,
      })),
    }));
    assert.equal(state.mode, mode);
    assert.equal(state.cars.length, { 'time-trial': 1, 'quick-race': 4, 'two-player': 2 }[mode]);
    assert.equal(state.cars[0].archetype, choice.id, `${mode} uses the selected body`);
    assert.equal(state.cars[0].color, choice.color, `${mode} uses the selected paint`);
    assert.equal(state.cars[0].isPlayer, true);
    const otherCars = state.cars.slice(1).map(({ archetype, color, isPlayer }) => ({ archetype, color, isPlayer }));
    if (mode === 'quick-race') assert.deepEqual(otherCars, [
      { archetype: 'open-wheel', color: 0xfacc15, isPlayer: false },
      { archetype: 'gt', color: 0x059669, isPlayer: false },
      { archetype: 'muscle', color: 0xea580c, isPlayer: false },
    ], 'selecting a car preserves the rival grid');
    if (mode === 'two-player') assert.deepEqual(otherCars, [
      { archetype: 'muscle', color: 0x1f6cff, isPlayer: true },
    ], 'Player 2 keeps their blue muscle car');
    return state.cars[0].id;
  }

  try {
    await page.goto(process.env.GAME_URL || 'http://localhost:5173/', { waitUntil: 'load' });
    await ready();
    assert.deepEqual(await page.locator('input[name="car"]').evaluateAll(inputs => inputs.map(input => input.value)),
      expectedChoices.map(choice => choice.id));
    await checkSelection('gt');

    // Exercise the native radio keyboard behavior, then reload its preference.
    await page.locator('input[name="car"][value="gt"]').focus();
    await page.keyboard.press('ArrowRight');
    await checkSelection('muscle');
    assert.equal(await page.evaluate(() => localStorage.getItem('racer2.car')), 'muscle');
    await page.reload({ waitUntil: 'load' });
    await ready();
    await checkSelection('muscle');
    await page.evaluate(() => localStorage.setItem('racer2.car', 'removed-car'));
    await page.reload({ waitUntil: 'load' });
    await ready();
    await checkSelection('gt');

    const previews = [];
    for (const choice of CAR_CHOICES) {
      await select(choice.id);
      await checkSelection(choice.id);
      const pixels = await page.evaluate(() => {
        const canvas = document.getElementById('garage');
        const data = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
        let hash = 2166136261, red = 0, blue = 0, yellow = 0;
        for (let i = 0; i < data.length; i += 4) {
          const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
          hash = Math.imul(hash ^ r, 16777619);
          hash = Math.imul(hash ^ g, 16777619);
          hash = Math.imul(hash ^ b, 16777619);
          if (r > 50 && r > g * 1.4 && r > b * 1.2) red++;
          if (b > 50 && b > r * 1.25 && b > g * 1.05) blue++;
          if (r > 75 && g > 60 && r > b * 1.4 && g > b * 1.4) yellow++;
        }
        return { hash, red, blue, yellow };
      });
      const channel = { gt: 'red', muscle: 'blue', 'open-wheel': 'yellow' }[choice.id];
      assert(pixels[channel] > 100, `${choice.name} preview contains its selected paint`);
      previews.push(pixels.hash);
      await page.locator('#garage').screenshot({ path: `${out}/car-${choice.id}.png` });
    }
    assert.equal(new Set(previews).size, CAR_CHOICES.length, 'every selected car changes the showroom image');

    // Compare the same warmed-up car after each cycle, allowing shared caches
    // to populate once without mistaking them for unreleased preview meshes.
    const memory = [];
    for (let cycle = 0; cycle < 4; cycle++) {
      for (const choice of CAR_CHOICES) await select(choice.id);
      await select('gt');
      memory.push(await page.evaluate(() => ({ ...window.__ctx.renderer.info.memory })));
    }
    assert(memory.at(-1).geometries <= memory[0].geometries + 3,
      `preview switching releases old geometry: ${JSON.stringify(memory)}`);
    assert(memory.at(-1).textures <= memory[0].textures + 1,
      `preview switching retains stable textures: ${JSON.stringify(memory)}`);

    for (const choice of CAR_CHOICES) {
      await select(choice.id);
      for (const mode of ['time-trial', 'quick-race', 'two-player']) {
        await page.locator(`button.mode[data-mode="${mode}"]`).click();
        const firstId = await checkRace(choice, mode);
        await page.evaluate(() => document.getElementById('finish').classList.remove('hidden'));
        await page.locator('#finish-restart').click();
        assert.notEqual(await checkRace(choice, mode), firstId, 'restart builds a new selected car');
        if (mode === 'quick-race') {
          await page.evaluate(() => document.getElementById('finish').classList.remove('hidden'));
          await page.locator('#finish-menu').click();
        } else {
          await page.keyboard.press('Escape');
        }
        await ready();
        assert.equal(await page.evaluate(() => window.__ctx.cars.length), 0, 'returning to menu removes race cars');
        await checkSelection(choice.id);
      }
    }
    assert.deepEqual(errors, [], 'no browser or WebGL errors');
    console.log('PASS: keyboard selection, saved choice, distinct previews, preview memory, all cars in every mode, restart and menu');
  } finally {
    await browser.close();
  }
}
