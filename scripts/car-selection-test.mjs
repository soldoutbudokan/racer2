// Car preferences plus the actual menu -> race -> restart flow.
// Run with --unit for storage checks only, or start Vite for the full suite.
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright-core';
import { CAR_CHOICES, getCarChoice, loadCarChoice, saveCarChoice } from '../src/carSelection.js';

const expectedChoices = [
  { id: 'gt', color: 0xc8161d },
  { id: 'hatch', color: 0x2588d1 },
  { id: 'open-wheel', color: 0xf0b82f },
  { id: 'muscle', color: 0xd86632 },
  { id: 'roadster', color: 0x248b76 },
  { id: 'supercar', color: 0x7462d9 },
];
assert.deepEqual(CAR_CHOICES.map(({ id, color }) => ({ id, color })), expectedChoices);
const storageDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
try {
  delete globalThis.localStorage;
  assert.equal(loadCarChoice().id, 'gt', 'missing storage keeps the default car');
  assert.doesNotThrow(() => saveCarChoice('hatch'), 'selection works without storage');

  const values = new Map();
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
  } });
  assert.equal(loadCarChoice().id, 'gt', 'a new player starts with the red GT3 coupe');
  assert.equal(getCarChoice('muscle').id, 'muscle', 'the muscle car is its own selectable choice');
  values.set('racer2.car', 'muscle');
  assert.equal(loadCarChoice().id, 'muscle', 'a saved muscle preference restores the muscle car');
  saveCarChoice('muscle');
  assert.equal(values.get('racer2.car'), 'muscle', 'saving the muscle car preserves its own id');
  for (const id of [undefined, null, '', 'unknown-car', '__proto__']) {
    assert.equal(getCarChoice(id).id, 'gt', `unknown choice ${String(id)} falls back to the default car`);
    values.set('racer2.car', id);
    assert.equal(loadCarChoice().id, 'gt', `invalid saved choice ${String(id)} falls back to the default car`);
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
console.log('PASS: six car choices, invalid preferences, persistence and unavailable storage');

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
  const physicsSignatures = new Map();

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
    assert.equal(await page.locator('#car-performance meter').count(), 4, 'four performance ratings are visible');
    for (const [key, label] of [
      ['acceleration', 'Acceleration'], ['speed', 'Top speed'], ['handling', 'Handling'], ['braking', 'Braking'],
    ]) {
      const meter = page.getByRole('meter', { name: label, exact: true });
      assert.equal(await meter.evaluate(element => element.value), choice.ratings[key], `${choice.name} shows its ${label} rating`);
    }
    const note = await page.locator('#car-selection-note').innerText();
    assert(note.includes(choice.strength), `${choice.name} explains its strength`);
    assert(note.includes(choice.tradeoff), `${choice.name} explains its trade-off`);
  }

  async function checkRace(choice, mode) {
    const state = await page.evaluate(() => ({
      mode: window.__ctx.mode,
      cars: window.__ctx.cars.map(entry => ({
        id: entry.car.body.id,
        archetype: entry.car.archetype,
        color: entry.color,
        isPlayer: entry.isPlayer,
        gridIdx: entry.gridIdx,
        code: entry.code,
        name: entry.name,
        skill: entry.skill,
        reactionS: entry.reactionS,
        mass: entry.car.body.mass,
        spec: {
          id: entry.car.spec.id,
          massKg: entry.car.spec.massKg,
          peakTorque: Math.max(...entry.car.spec.torqueCurve.map(([, torque]) => torque)),
          finalDrive: entry.car.spec.finalDrive,
          dragArea: entry.car.spec.cdA,
          downforceArea: entry.car.spec.clA,
          maxSteer: entry.car.spec.maxSteer,
          steerRate: entry.car.spec.steerRate,
          brakeFront: entry.car.spec.brakeFront,
          brakeRear: entry.car.spec.brakeRear,
          roadGrip: entry.car.spec.mu.road,
        },
      })),
    }));
    assert.equal(state.mode, mode);
    assert.equal(state.cars.length, { 'time-trial': 1, 'quick-race': 4, 'two-player': 2 }[mode]);
    assert.equal(state.cars[0].archetype, choice.id, `${mode} uses the selected body`);
    assert.equal(state.cars[0].color, choice.color, `${mode} uses the selected paint`);
    for (const entry of state.cars) {
      assert.equal(entry.spec.id, entry.archetype, `${mode} uses the ${entry.archetype} physics package`);
      assert.equal(entry.mass, entry.spec.massKg, `${mode} applies the ${entry.archetype} chassis mass`);
    }
    const { id: specId, ...physicalValues } = state.cars[0].spec;
    const signature = JSON.stringify(physicalValues);
    if (physicsSignatures.has(choice.id)) {
      assert.equal(signature, physicsSignatures.get(choice.id), `${mode} preserves the physics package after restart`);
    } else physicsSignatures.set(specId, signature);
    assert.equal(state.cars[0].isPlayer, true);
    const grid = state.cars.map(entry => entry.gridIdx);
    assert.deepEqual([...grid].sort((a, b) => a - b), state.cars.map((_, index) => index),
      `${mode} assigns one unique slot per car`);
    if (mode !== 'quick-race') assert.deepEqual(grid, state.cars.map((_, index) => index),
      `${mode} preserves its established starting order`);
    const otherCars = state.cars.slice(1).map(({ archetype, color, isPlayer }) => ({ archetype, color, isPlayer }));
    if (mode === 'quick-race') {
      const rivals = state.cars.slice(1);
      assert.equal(new Set(rivals.map(entry => entry.archetype)).size, 3, 'the three rivals use different car types');
      assert(rivals.every(entry => entry.archetype !== choice.id &&
        expectedChoices.some(choice => choice.id === entry.archetype)), 'rivals draw from the other five cars');
      assert(rivals.every(entry => !entry.isPlayer), 'each rival remains AI controlled');
      assert.deepEqual(rivals.map(entry => entry.color), rivals.map(entry => getCarChoice(entry.archetype).color),
        'each rival uses its car model\'s paint');
      assert.equal(new Set(state.cars.map(entry => entry.color)).size, 4, 'the player and rivals have distinct paints');
      assert.deepEqual(rivals.map(({ code, name }) => ({ code, name })), [
        { code: 'MOR', name: 'R. Moreau' }, { code: 'OKA', name: 'T. Okafor' }, { code: 'LIN', name: 'S. Lindqvist' },
      ], 'random cars preserve driver identities');
      for (const [index, rival] of rivals.entries()) {
        assert(Math.abs(rival.skill - [0.78, 0.82, 0.86][index]) < 1e-12, 'skill stays with the driver');
        assert(Math.abs(rival.reactionS - [0.4332, 0.2448, 0.2964][index]) < 1e-12, 'reaction time stays with the driver');
      }
    }
    if (mode === 'two-player') assert.deepEqual(otherCars, [
      { archetype: 'hatch', color: 0x1f6cff, isPlayer: true },
    ], 'Player 2 uses the blue rally hatch');
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
    await checkSelection('hatch');
    assert.equal(await page.evaluate(() => localStorage.getItem('racer2.car')), 'hatch');
    await page.reload({ waitUntil: 'load' });
    await ready();
    await checkSelection('hatch');
    await page.evaluate(() => localStorage.setItem('racer2.car', 'muscle'));
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
      const pixels = await page.evaluate(paint => {
        const canvas = document.getElementById('garage');
        const data = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
        function hue(r, g, b) {
          const max = Math.max(r, g, b), min = Math.min(r, g, b), delta = max - min;
          if (!delta) return 0;
          const h = max === r ? (g - b) / delta : max === g ? 2 + (b - r) / delta : 4 + (r - g) / delta;
          return ((h / 6) + 1) % 1;
        }
        const targetHue = hue((paint >> 16) & 255, (paint >> 8) & 255, paint & 255);
        let hash = 2166136261, paintPixels = 0;
        for (let i = 0; i < data.length; i += 4) {
          const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
          hash = Math.imul(hash ^ r, 16777619);
          hash = Math.imul(hash ^ g, 16777619);
          hash = Math.imul(hash ^ b, 16777619);
          const max = Math.max(r, g, b), min = Math.min(r, g, b);
          const hueDistance = Math.abs(hue(r, g, b) - targetHue);
          if (max > 40 && (max - min) / max > 0.3 && Math.min(hueDistance, 1 - hueDistance) < 0.08) paintPixels++;
        }
        return { hash, paintPixels };
      }, choice.color);
      assert(pixels.paintPixels > 100, `${choice.name} preview contains its selected paint`);
      previews.push(pixels.hash);
      await page.locator('#garage').screenshot({ path: `${out}/car-${choice.id}.png` });
    }
    assert.equal(new Set(previews).size, CAR_CHOICES.length, 'every selected car changes the showroom image');

    // Regression: the showroom used to project for its own aspect into a
    // full-window framebuffer, stretching the car when copied to the preview.
    for (const [width, height] of [[1280, 720], [390, 844]]) {
      await page.setViewportSize({ width, height });
      const projection = await page.evaluate(() => {
        const ctx = window.__ctx, renderer = ctx.renderer, THREE = window.__THREE;
        const state = () => ({
          size: renderer.getSize(new THREE.Vector2()).toArray(),
          ratio: renderer.getPixelRatio(),
          viewport: renderer.getViewport(new THREE.Vector4()).toArray(),
          scissor: renderer.getScissor(new THREE.Vector4()).toArray(),
          scissorTest: renderer.getScissorTest(),
        });
        const before = state(), render = renderer.render;
        let aspectError = Infinity;
        renderer.render = function (scene, camera) {
          aspectError = Math.abs(camera.aspect - this.domElement.width / this.domElement.height);
          return render.call(this, scene, camera);
        };
        try { ctx.renderGarage(); } finally { renderer.render = render; }
        return { before, after: state(), aspectError };
      });
      assert(projection.aspectError < 0.01, `showroom preserves car proportions at ${width}px`);
      assert.deepEqual(projection.after, projection.before, 'showroom restores race renderer state');
    }
    await page.setViewportSize({ width: 1280, height: 720 });

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
        if (choice.id === 'hatch' && mode === 'time-trial') {
          const hoodForward = await page.evaluate(() => {
            const entry = window.__ctx.cars[0];
            const { body } = entry.car;
            entry.chase.cycle();
            entry.chase.update(1 / 60, body, 0);
            const THREE = window.__THREE;
            const orientation = new THREE.Quaternion(
              body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w);
            const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(orientation).normalize();
            const offset = window.__ctx.camera.position.clone().sub(
              new THREE.Vector3(body.position.x, body.position.y, body.position.z));
            return { mode: entry.chase.getMode(), forward: offset.dot(forward) };
          });
          assert.equal(hoodForward.mode, 1, 'the hatch camera switches from chase to hood');
          assert(hoodForward.forward > 0.4, 'the hatch hood camera sits at its cowl, ahead of the chassis origin');
          await page.screenshot({ path: `${out}/car-hatch-hood.png` });
        }
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
    assert.equal(physicsSignatures.size, 6, 'all six physics packages were exercised in the actual race');
    assert.equal(new Set(physicsSignatures.values()).size, 6, 'all six cars have different physical values');

    // Force known grid and roster draws through the real menu, finish button,
    // and R-key reset. Fresh races draw three grid values then three roster
    // values before building cars. Geometry UUIDs still use the native RNG.
    await select('gt');
    const gridRuns = await page.evaluate(() => {
      const ctx = window.__ctx;
      const nativeRandom = Math.random;
      const nativeRender = ctx.composer.render;
      function draw(gridValues, rosterValues, action) {
        const values = [...gridValues, ...rosterValues];
        let next = 0;
        Math.random = () => next < values.length ? values[next++] : nativeRandom();
        try { action(); } finally { Math.random = nativeRandom; }
        if (next !== values.length) throw new Error('Race did not draw its complete grid and roster');
      }
      function snapshot() {
        // A player in a rear slot must still drive the primary camera.
        const primary = ctx.cars[0];
        ctx.camera.position.set(50000, 50000, 50000);
        const secondaryBefore = ctx.camera2.position.clone();
        primary.chase.update(1 / 60, primary.car.body, 0);
        return {
          mode: ctx.mode,
          primaryPlayerIdx: ctx.primaryPlayerIdx,
          primaryCameraMoved: ctx.camera.position.distanceTo({ x: 50000, y: 50000, z: 50000 }) > 1,
          secondaryCameraMoved: ctx.camera2.position.distanceTo(secondaryBefore),
          position: Number(document.getElementById('pos-current').textContent),
          standing: [...document.querySelectorAll('#standings li')].findIndex(li => li.classList.contains('me')) + 1,
          cars: ctx.cars.map(entry => {
            const spawn = window.__gridSpawn(ctx.track, entry.gridIdx, entry.car.stance);
            const position = entry.car.body.position;
            return {
              id: entry.car.body.id, gridIdx: entry.gridIdx, isPlayer: entry.isPlayer,
              archetype: entry.car.archetype, specId: entry.car.spec.id,
              color: entry.color, label: entry.label, code: entry.code, name: entry.name, reactionS: entry.reactionS,
              skill: entry.skill, reverseT: entry.ai?.recovery.reverseT ?? 0,
              spawnError: Math.hypot(position.x - spawn.position.x, position.y - spawn.position.y, position.z - spawn.position.z),
            };
          }),
        };
      }
      try {
        // No rendered frames are needed to verify the real reset and HUD path.
        ctx.composer.render = () => {};
        draw([0, 0, 0], [0, 0, 0], () => document.querySelector('button.mode[data-mode="quick-race"]').click());
        const started = snapshot();
        window.__tick(0);
        const countdown = snapshot();

        document.getElementById('finish').classList.remove('hidden');
        draw([0.99, 0.99, 0.99], [0.99, 0.99, 0.99], () => document.getElementById('finish-restart').click());
        const restarted = snapshot();
        const previousAI = ctx.cars.slice(1).map(entry => entry.ai);
        for (const ai of previousAI) ai.recovery.reverseT = 1;
        draw([0.625, 0.5, 0.25], [], () => {
          window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyR' }));
          window.dispatchEvent(new KeyboardEvent('keyup', { code: 'KeyR' }));
          window.__tick(0);
        });
        const reset = snapshot();
        const resetFreshAI = ctx.cars.slice(1).every((entry, index) => entry.ai !== previousAI[index]);
        const resetStarted = ctx.state.started;
        document.getElementById('finish').classList.remove('hidden');
        document.getElementById('finish-menu').click();
        draw([0, 0, 0], [0.4, 0.4, 0.4], () => document.querySelector('button.mode[data-mode="quick-race"]').click());
        return { started, countdown, restarted, reset, fresh: snapshot(), resetFreshAI, resetStarted };
      } finally {
        Math.random = nativeRandom;
        ctx.composer.render = nativeRender;
      }
    });
    for (const [name, expected] of [
      ['started', [1, 2, 3, 0]], ['countdown', [1, 2, 3, 0]],
      ['restarted', [0, 1, 2, 3]], ['reset', [3, 0, 1, 2]], ['fresh', [1, 2, 3, 0]],
    ]) {
      const run = gridRuns[name];
      assert.equal(run.mode, 'quick-race');
      assert.equal(run.primaryPlayerIdx, 0);
      assert.deepEqual(run.cars.map(entry => entry.gridIdx), expected, `${name} applies its fresh starting-grid draw`);
      assert(run.cars.every(entry => entry.spawnError < 0.01), `${name} places every car at its assigned grid slot`);
      assert.equal(run.cars[0].isPlayer, true);
      assert.equal(run.cars[0].label, 'P1', `${name} preserves player identity independently of grid slot`);
      assert.deepEqual(run.cars.map(entry => entry.code), ['YOU', 'MOR', 'OKA', 'LIN']);
      assert.deepEqual(run.cars.map(entry => entry.name), ['You', 'R. Moreau', 'T. Okafor', 'S. Lindqvist']);
      assert(run.cars.every(entry => entry.specId === entry.archetype), `${name} gives every rival its matching physics`);
      assert.deepEqual(run.cars.map(entry => entry.color), run.cars.map(entry => getCarChoice(entry.archetype).color),
        `${name} gives every car its model's paint`);
      assert.equal(run.position, expected[0] + 1, `${name} shows the actual starting position`);
      assert.equal(run.standing, expected[0] + 1, `${name} standings match the starting grid`);
      assert.equal(run.primaryCameraMoved, true, `${name} follows the player with the primary camera`);
      assert.equal(run.secondaryCameraMoved, 0, `${name} leaves the split-screen camera untouched`);
    }
    const roster = run => run.cars.slice(1).map(entry => entry.archetype);
    assert.deepEqual(roster(gridRuns.started), ['hatch', 'open-wheel', 'muscle'], 'the first roster follows its own random draw');
    assert.deepEqual(roster(gridRuns.countdown), roster(gridRuns.started), 'countdown preserves the drawn roster');
    assert.deepEqual(roster(gridRuns.restarted), ['supercar', 'hatch', 'open-wheel'], 'finish restart draws fresh opponents');
    assert.deepEqual(roster(gridRuns.reset), roster(gridRuns.restarted), 'R preserves the participants while shuffling their grid');
    assert.deepEqual(roster(gridRuns.fresh), ['muscle', 'hatch', 'roadster'], 'a new race from the menu draws fresh opponents');
    assert.notDeepEqual([...roster(gridRuns.started)].sort(), [...roster(gridRuns.restarted)].sort(),
      'controlled restart draws change the opponent types, not just their order');
    assert.notDeepEqual([...roster(gridRuns.restarted)].sort(), [...roster(gridRuns.fresh)].sort(),
      'controlled menu-start draws change the opponent types');
    assert.notEqual(gridRuns.restarted.cars[0].id, gridRuns.started.cars[0].id, 'finish restart rebuilds the field');
    assert.notEqual(gridRuns.fresh.cars[0].id, gridRuns.reset.cars[0].id, 'a new menu start rebuilds the field');
    assert.deepEqual(gridRuns.reset.cars.map(entry => entry.id), gridRuns.restarted.cars.map(entry => entry.id),
      'R assigns new slots to the existing cars');
    assert.deepEqual(gridRuns.reset.cars.map(entry => entry.reactionS), gridRuns.restarted.cars.map(entry => entry.reactionS),
      'reaction times stay with each driver across a new grid');
    assert.deepEqual(gridRuns.reset.cars.map(entry => entry.skill), gridRuns.restarted.cars.map(entry => entry.skill));
    assert.deepEqual(gridRuns.reset.cars.map(entry => entry.color), gridRuns.restarted.cars.map(entry => entry.color),
      'R preserves each participant\'s paint');
    for (const name of ['restarted', 'reset', 'fresh']) {
      assert.deepEqual(gridRuns[name].cars.map(({ code, name, skill, reactionS }) => ({ code, name, skill, reactionS })),
        gridRuns.started.cars.map(({ code, name, skill, reactionS }) => ({ code, name, skill, reactionS })),
        `${name} preserves each driver's identity, skill and reaction time`);
    }
    assert.equal(gridRuns.resetFreshAI, true, 'R clears the AI lane and recovery state');
    assert(gridRuns.reset.cars.every(entry => entry.reverseT === 0), 'the reset grid has no inherited reversing state');
    assert.equal(gridRuns.resetStarted, false, 'R starts a fresh countdown');
    await page.keyboard.press('Escape');
    await ready();
    assert.deepEqual(errors, [], 'no browser or WebGL errors');
    console.log('PASS: keyboard selection, saved choice, previews, all modes, randomized rivals and grids, cameras, HUD and both restart paths');
  } finally {
    await browser.close();
  }
}
