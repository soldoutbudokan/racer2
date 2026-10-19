import * as THREE from 'three';
import { buildVisualCar, showroomStance } from './carModels/index.js';
import { getCarChoice } from './carSelection.js';
import { WHEEL_RADIUS } from './stance.js';

// The showroom is painted once; it shares the game's WebGL context.
function paintTexture(size, draw) {
  const canvas = document.createElement('canvas');
  canvas.width = size[0]; canvas.height = size[1];
  draw(canvas.getContext('2d'), canvas.width, canvas.height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function studioEnvironment(renderer) {
  const studio = new THREE.Scene();
  studio.background = new THREE.Color(0x25272b);
  const panels = [
    { size: [3.5, 8], position: [-3.5, 5, 1], color: 0xffeed8, strength: 5 },
    { size: [1.3, 7], position: [4, 3.5, -2], color: 0xe4edff, strength: 3.5 },
    { size: [5, 1.2], position: [0, 2.5, 6], color: 0xfff6e9, strength: 2.5 },
  ];
  for (const panel of panels) {
    const light = new THREE.Mesh(
      new THREE.PlaneGeometry(...panel.size),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(panel.color).multiplyScalar(panel.strength),
        side: THREE.DoubleSide,
      }),
    );
    light.position.set(...panel.position);
    light.lookAt(0, 0.5, 0);
    studio.add(light);
  }
  const pmrem = new THREE.PMREMGenerator(renderer);
  const reflection = pmrem.fromScene(studio, 0.035, 0.1, 40);
  pmrem.dispose();
  for (const panel of studio.children) {
    panel.geometry.dispose();
    panel.material.dispose();
  }
  return reflection.texture;
}

// One still frame on selection or resize: no animation loop, second renderer,
// or downloaded assets. Studio reflections never alter shared car materials.
export function createGarage(renderer, environment) {
  const scene = new THREE.Scene();
  const GRAPHITE = '#111315';
  scene.background = paintTexture([768, 512], (g, w, h) => {
    g.fillStyle = GRAPHITE; g.fillRect(0, 0, w, h);
    const glow = g.createRadialGradient(w * 0.48, h * 0.55, 0, w * 0.48, h * 0.55, w * 0.6);
    glow.addColorStop(0, '#2b2b2c');
    glow.addColorStop(0.48, '#1c1e20');
    glow.addColorStop(1, GRAPHITE);
    g.fillStyle = glow; g.fillRect(0, 0, w, h);
  });
  scene.fog = new THREE.Fog(GRAPHITE, 9, 23);
  scene.environment = renderer.capabilities.isWebGL2 ? studioEnvironment(renderer) : environment;
  scene.add(new THREE.HemisphereLight(0xf4efe7, 0x24262a, 0.75));
  const key = new THREE.DirectionalLight(0xffefd8, 3.2);
  key.position.set(-3, 7, 5); scene.add(key);
  const rim = new THREE.DirectionalLight(0xdce7ff, 2.4);
  rim.position.set(5, 3, -5); scene.add(rim);
  const fill = new THREE.DirectionalLight(0xffe1c3, 1.0);
  fill.position.set(5, 2, 4); scene.add(fill);

  let car = null;
  let currentChoice = getCarChoice();
  const bounds = new THREE.Box3();
  const framingPoints = [];
  const framingPoint = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);
  function selectCar(choice) {
    if (car && choice.id === currentChoice.id) return;
    if (car) {
      scene.remove(car.root, ...car.wheels);
      // Preserve the shared hull, wheel templates, paint and trim.
      car.dispose();
    }
    currentChoice = choice;
    // Each car sits over its wheels at its own height and wheelbase.
    const stance = showroomStance(choice.id);
    car = buildVisualCar(choice.id, choice.color, { hubLocalY: stance.hubLocalY });
    car.root.position.y = stance.chassisHeight;
    car.shadow.position.y = -stance.chassisHeight + 0.012;
    car.root.rotation.y = -0.12;
    scene.add(car.root);
    for (let i = 0; i < 4; i++) {
      const wheel = car.wheels[i];
      wheel.position.set((i % 2 ? -1 : 1) * (stance.halfTrack + 0.02), WHEEL_RADIUS,
        i < 2 ? stance.halfWheelbase : -stance.halfWheelbase);
      wheel.position.applyAxisAngle(up, car.root.rotation.y);
      wheel.rotation.y += car.root.rotation.y;
      scene.add(wheel);
    }
    bounds.makeEmpty();
    framingPoints.length = 0;
    for (const part of [car.root, ...car.wheels]) {
      part.updateMatrixWorld(true);
      part.traverse(object => {
        // The contact-shadow plane is larger than the body. Frame the actual
        // silhouette, not its shadow or imaginary corners above the bumpers.
        if (object === car.shadow) return;
        const positions = object.geometry?.attributes.position;
        if (!positions) return;
        for (let i = 0; i < positions.count; i++) {
          framingPoint.fromBufferAttribute(positions, i).applyMatrix4(object.matrixWorld);
          bounds.expandByPoint(framingPoint);
          framingPoints.push(framingPoint.x, framingPoint.y, framingPoint.z);
        }
      });
    }
  }

  const floorTexture = paintTexture([1024, 1024], (g, w, h) => {
    const pool = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    pool.addColorStop(0, '#383737');
    pool.addColorStop(0.15, '#242527');
    pool.addColorStop(0.35, '#181a1c');
    pool.addColorStop(0.7, GRAPHITE);
    g.fillStyle = pool; g.fillRect(0, 0, w, h);
  });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40),
    new THREE.MeshBasicMaterial({ map: floorTexture, toneMapped: false }));
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  // Flush markings suggest a studio turntable without hiding the contact shadow.
  for (const radius of [3.18, 3.24]) {
    const ring = new THREE.Mesh(new THREE.RingGeometry(radius, radius + 0.012, 128),
      new THREE.MeshBasicMaterial({ color: 0x888783, transparent: true, opacity: 0.18, toneMapped: false }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.003;
    scene.add(ring);
  }
  const marker = new THREE.Mesh(new THREE.RingGeometry(3.18, 3.24, 24, 1, Math.PI * 0.15, 0.22),
    new THREE.MeshBasicMaterial({ color: 0xff7448, transparent: true, opacity: 0.7, toneMapped: false }));
  marker.rotation.x = -Math.PI / 2;
  marker.position.y = 0.004;
  scene.add(marker);

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60);
  const direction = new THREE.Vector3(1.1, 0.32, 1).normalize();
  const right = new THREE.Vector3().crossVectors(up, direction).normalize();
  const cameraUp = new THREE.Vector3().crossVectors(direction, right).normalize();
  const target = new THREE.Vector3(0, 0.65, 0.1);
  const corner = new THREE.Vector3();
  const oldSize = new THREE.Vector2();
  const oldViewport = new THREE.Vector4();
  const oldScissor = new THREE.Vector4();
  return function render(choice = currentChoice) {
    const canvas = document.getElementById('garage');
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    selectCar(getCarChoice(choice?.id));
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    camera.aspect = width / height;
    bounds.getCenter(target);
    const vertical = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    let distance = 0;
    // Perspective moves the visual center below the body bounds. Recenter the
    // projected silhouette before its final fit so no car wastes the top half
    // of a wide stage. This only runs for a new still, never in the race loop.
    for (let pass = 0; pass < 4; pass++) {
      distance = 0;
      for (let i = 0; i < framingPoints.length; i += 3) {
        corner.fromArray(framingPoints, i).sub(target);
        distance = Math.max(distance,
          Math.abs(corner.dot(right)) / (vertical * camera.aspect * 0.87) + corner.dot(direction),
          Math.abs(corner.dot(cameraUp)) / (vertical * 0.79) + corner.dot(direction));
      }
      if (pass === 3) break;
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (let i = 0; i < framingPoints.length; i += 3) {
        corner.fromArray(framingPoints, i).sub(target);
        const depth = distance - corner.dot(direction);
        const x = corner.dot(right) / (vertical * camera.aspect * depth);
        const y = corner.dot(cameraUp) / (vertical * depth);
        minX = Math.min(minX, x); maxX = Math.max(maxX, x);
        minY = Math.min(minY, y); maxY = Math.max(maxY, y);
      }
      target.addScaledVector(right, (minX + maxX) * 0.5 * vertical * camera.aspect * distance);
      target.addScaledVector(cameraUp, (minY + maxY) * 0.5 * vertical * distance);
    }
    camera.position.copy(direction).multiplyScalar(distance).add(target);
    camera.lookAt(target);
    camera.updateProjectionMatrix();

    // The garage aspect differs from the full-screen race. Render at the actual
    // preview size before copying, then restore all shared framebuffer state.
    renderer.getSize(oldSize);
    renderer.getViewport(oldViewport);
    renderer.getScissor(oldScissor);
    const oldPixelRatio = renderer.getPixelRatio();
    const oldScissorTest = renderer.getScissorTest();
    const oldTarget = renderer.getRenderTarget();
    const oldCubeFace = renderer.getActiveCubeFace();
    const oldMipmapLevel = renderer.getActiveMipmapLevel();
    try {
      renderer.setRenderTarget(null);
      renderer.setPixelRatio(ratio);
      renderer.setSize(width, height, false);
      renderer.setViewport(0, 0, width, height);
      renderer.setScissorTest(false);
      renderer.render(scene, camera);
      canvas.getContext('2d').drawImage(renderer.domElement, 0, 0, canvas.width, canvas.height);
    } finally {
      renderer.setPixelRatio(oldPixelRatio);
      renderer.setSize(oldSize.x, oldSize.y, false);
      renderer.setRenderTarget(oldTarget, oldCubeFace, oldMipmapLevel);
      renderer.setViewport(oldViewport);
      renderer.setScissor(oldScissor);
      renderer.setScissorTest(oldScissorTest);
    }
  };
}
