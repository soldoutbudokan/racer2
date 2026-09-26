// Compare the road-car shapes in identical paint, lighting and camera views.
// Start Vite first. The contact sheet joins the other CI visual artifacts.
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import assert from 'node:assert/strict';

const out = process.env.QA_DIR || 'qa';
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROME_EXE || chromium.executablePath(),
  headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'],
});
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 1200 } });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(process.env.GAME_URL || 'http://localhost:5173/');
  await page.waitForFunction(() => window.__ctx?.selectedCar, null, { timeout: 120000 });
  await page.evaluate(async () => {
    const THREE = window.__THREE;
    const { buildVisualCar } = await import('/src/carModels/index.js');
    const { STATIC_CHASSIS_HEIGHT, WHEEL_RADIUS } = await import('/src/stance.js');
    const { renderer, scene: gameScene } = window.__ctx;
    renderer.setPixelRatio(1);
    renderer.setSize(640, 360, false);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x101a20);
    scene.environment = gameScene.environment;
    scene.add(new THREE.HemisphereLight(0xdbeaff, 0x1c2a30, 1.1));
    const key = new THREE.DirectionalLight(0xfff0dc, 2.4);
    key.position.set(4, 7, 5); scene.add(key);
    const rim = new THREE.DirectionalLight(0x9fd4ff, 1.6);
    rim.position.set(-5, 3.5, -5); scene.add(rim);
    const camera = new THREE.OrthographicCamera(-3.2, 3.2, 1.8, -1.8, 0.1, 40);
    const sheet = document.createElement('div');
    sheet.id = 'car-shape-review';
    sheet.style.cssText = 'position:absolute;inset:0 auto auto 0;z-index:1000;width:1280px;display:grid;grid-template-columns:1fr 1fr;background:#101a20;color:#eef3f1;font:16px system-ui';
    document.body.appendChild(sheet);
    const views = [['Side', [9, 1.0, 0]], ['Front quarter', [6, 2.8, 7]], ['Rear quarter', [6, 2.8, -7]]];
    const cars = ['gt', 'muscle'].map(id => buildVisualCar(id, 0x71828b));
    for (const [label, position] of views) {
      for (const [index, car] of cars.entries()) {
        car.root.position.y = STATIC_CHASSIS_HEIGHT;
        car.shadow.position.y = -STATIC_CHASSIS_HEIGHT + 0.012;
        scene.add(car.root, ...car.wheels);
        car.wheels.forEach((wheel, i) => wheel.position.set(i % 2 ? -0.88 : 0.88, WHEEL_RADIUS, i < 2 ? 1.45 : -1.45));
        camera.position.set(...position);
        camera.lookAt(0, 0.85, 0);
        renderer.render(scene, camera);
        const cell = document.createElement('div');
        const title = document.createElement('div');
        title.textContent = `${index ? 'MUSCLE' : 'GT COUPE'} · ${label} · Same paint`;
        title.style.cssText = 'padding:12px 20px 0';
        const canvas = document.createElement('canvas');
        canvas.width = 640; canvas.height = 360;
        canvas.getContext('2d').drawImage(renderer.domElement, 0, 0);
        cell.append(title, canvas); sheet.appendChild(cell);
        scene.remove(car.root, ...car.wheels);
      }
    }
    cars.forEach(car => car.dispose());
  });
  await page.locator('#car-shape-review').screenshot({ path: `${out}/car-shapes-same-paint.png` });
  assert.deepEqual(errors, [], 'shape comparison renders without browser errors');
  console.log('PASS: same-paint car comparison rendered from side, front and rear');
} finally {
  await browser.close();
}
