import * as THREE from 'three';
import { buildVisualCar } from './carModels/index.js';
import { STATIC_CHASSIS_HEIGHT, WHEEL_RADIUS } from './stance.js';

// One still frame using the game's existing renderer. The menu has no render
// loop, no second WebGL context, and no downloadable hero image.
export function createGarage(renderer, environment) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x10191e);
  scene.environment = environment;
  scene.fog = new THREE.Fog(0x10191e, 8, 22);
  scene.add(new THREE.HemisphereLight(0xdbeaff, 0x25363e, 1.0));
  const key = new THREE.DirectionalLight(0xffe4c2, 1.8);
  key.position.set(3, 6, 5); scene.add(key);
  const rim = new THREE.DirectionalLight(0x91c8df, 1.0);
  rim.position.set(-4, 3, -4); scene.add(rim);
  const car = buildVisualCar('gt', 0xc8161d);
  car.root.position.y = STATIC_CHASSIS_HEIGHT;
  car.shadow.position.y = -STATIC_CHASSIS_HEIGHT + 0.012;
  scene.add(car.root);
  for (let i = 0; i < 4; i++) {
    car.wheels[i].position.set(i % 2 ? -0.88 : 0.88, WHEEL_RADIUS, i < 2 ? 1.45 : -1.45);
    scene.add(car.wheels[i]);
  }
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40),
    new THREE.MeshStandardMaterial({ color: 0x080f13, roughness: 1, envMapIntensity: 0.05 }));
  floor.rotation.x = -Math.PI / 2; scene.add(floor);
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
  camera.position.set(4.2, 1.9, 5.5); camera.lookAt(0, 0.6, 0);
  return function render() {
    const canvas = document.getElementById('garage');
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    camera.aspect = width / height;
    camera.fov = camera.aspect < 1.4 ? 44 : 34;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    canvas.getContext('2d').drawImage(renderer.domElement, 0, 0, canvas.width, canvas.height);
  };
}
