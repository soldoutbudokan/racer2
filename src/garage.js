import * as THREE from 'three';
import { buildVisualCar } from './carModels/index.js';
import { STATIC_CHASSIS_HEIGHT, WHEEL_RADIUS } from './stance.js';

// A canvas texture, drawn once with the 2D API.
function paintTexture(size, draw) {
  const c = document.createElement('canvas');
  c.width = size[0]; c.height = size[1];
  draw(c.getContext('2d'), c.width, c.height);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// One still frame using the game's existing renderer. The menu has no render
// loop, no second WebGL context, and no downloadable hero image.
//
// Lit like a showroom: a warm key from the front quarter, a cool rim from
// behind to pull the roofline off the backdrop, a pool of light on the floor
// that the car's own contact shadow sits in, and a backdrop that darkens
// upward so the car is the brightest thing in it.
export function createGarage(renderer, environment) {
  const scene = new THREE.Scene();
  // Backdrop and floor fade to the same slate, and fog carries the floor into
  // it, so the stage is an infinity cove with no horizon line. Neither is
  // tone-mapped (three leaves an sRGB background alone), so the two slates
  // stay the same colour.
  const SLATE = '#0f191e';
  scene.background = paintTexture([8, 256], (g, w, h) => {
    const grad = g.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#070c0f');
    grad.addColorStop(0.32, SLATE);
    grad.addColorStop(1, SLATE);
    g.fillStyle = grad; g.fillRect(0, 0, w, h);
  });
  scene.fog = new THREE.Fog(SLATE, 9, 19);
  scene.environment = environment;
  scene.add(new THREE.HemisphereLight(0xdbeaff, 0x1c2a30, 0.9));
  const key = new THREE.DirectionalLight(0xfff0dc, 2.4);
  key.position.set(4, 7, 5); scene.add(key);
  const rim = new THREE.DirectionalLight(0x9fd4ff, 1.6);
  rim.position.set(-5, 3.5, -5); scene.add(rim);
  const kicker = new THREE.DirectionalLight(0xe6ff9a, 0.5);
  kicker.position.set(-6, 1.2, 3); scene.add(kicker);

  const car = buildVisualCar('gt', 0xc8161d);
  car.root.position.y = STATIC_CHASSIS_HEIGHT;
  car.shadow.position.y = -STATIC_CHASSIS_HEIGHT + 0.012;
  car.root.rotation.y = -0.18;
  scene.add(car.root);
  for (let i = 0; i < 4; i++) {
    const w = car.wheels[i];
    w.position.set(i % 2 ? -0.88 : 0.88, WHEEL_RADIUS, i < 2 ? 1.45 : -1.45);
    w.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), car.root.rotation.y);
    w.rotation.y += car.root.rotation.y;
    scene.add(w);
  }

  // Floor: a soft pool of light under the car, falling to the backdrop's
  // slate well before its edge.
  const floorTex = paintTexture([512, 512], (g, w, h) => {
    const pool = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    pool.addColorStop(0, '#56676d');
    pool.addColorStop(0.1, '#34444a');
    pool.addColorStop(0.22, '#19262c');
    pool.addColorStop(0.4, SLATE);
    g.fillStyle = pool; g.fillRect(0, 0, w, h);
  });
  const floor = new THREE.Mesh(new THREE.CircleGeometry(30, 64),
    new THREE.MeshBasicMaterial({ map: floorTex, toneMapped: false }));
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60);
  const target = new THREE.Vector3(0, 0.62, 0.1);
  return function render() {
    const canvas = document.getElementById('garage');
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    camera.aspect = width / height;
    // Frame the car's length whatever the stage's shape: narrow stages
    // (phone) pull back and widen, wide ones close in.
    const narrow = camera.aspect < 1.4;
    camera.fov = narrow ? 34 : 24;
    camera.position.set(narrow ? 4.9 : 5.3, narrow ? 2.1 : 1.7, narrow ? 6.3 : 6.8);
    camera.lookAt(target);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    canvas.getContext('2d').drawImage(renderer.domElement, 0, 0, canvas.width, canvas.height);
  };
}
