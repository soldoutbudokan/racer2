import * as THREE from 'three';
import * as CANNON from 'cannon-es';

const CHASSIS_HALF = { x: 0.92, y: 0.32, z: 2.18 };
const WHEEL_RADIUS = 0.36;
const WHEEL_WIDTH = 0.28;
const SUSPENSION_REST = 0.32;
const MAX_STEER = 0.55;
const MAX_ENGINE_FORCE = 2200;
const MAX_BRAKE_FORCE = 60;

/**
 * Builds a sleek GT-style car with PBR materials and a Cannon RaycastVehicle
 * for stable arcade-realistic physics.
 */
export function createCar(world, materials, options = {}) {
  const bodyColor = options.color ?? 0xc8161d;
  const visual = buildVisualCar(bodyColor);

  // Chassis body
  const chassisShape = new CANNON.Box(
    new CANNON.Vec3(CHASSIS_HALF.x, CHASSIS_HALF.y, CHASSIS_HALF.z)
  );
  const chassisBody = new CANNON.Body({
    mass: 1320,
    material: materials.chassisMat,
  });
  chassisBody.addShape(chassisShape, new CANNON.Vec3(0, 0.2, 0));
  // Lower the centre of gravity a touch — keeps it from rolling over
  chassisBody.shapeOffsets[0].y = -0.05;
  chassisBody.angularDamping = 0.4;

  const vehicle = new CANNON.RaycastVehicle({
    chassisBody,
    indexRightAxis: 0,   // x
    indexUpAxis: 1,      // y
    indexForwardAxis: 2, // z
  });

  const wheelOptions = {
    radius: WHEEL_RADIUS,
    directionLocal: new CANNON.Vec3(0, -1, 0),
    suspensionStiffness: 38,
    suspensionRestLength: SUSPENSION_REST,
    frictionSlip: 3.0,
    dampingRelaxation: 2.4,
    dampingCompression: 4.6,
    maxSuspensionForce: 100000,
    rollInfluence: 0.04,
    // axleLocal -X: forward = surfNormal × axle = (+y)×(-x) = +z (matches our convention).
    axleLocal: new CANNON.Vec3(-1, 0, 0),
    chassisConnectionPointLocal: new CANNON.Vec3(),
    maxSuspensionTravel: 0.3,
    customSlidingRotationalSpeed: -30,
    useCustomSlidingRotationalSpeed: true,
  };

  const wb = 1.45;  // wheelbase half
  const tw = 0.86;  // track half
  const wy = -0.05; // suspension anchor y in chassis space
  // Front-left, Front-right, Rear-left, Rear-right.
  // Pass a fresh Vec3 per wheel — cannon-es WheelInfo holds a reference to the
  // option's chassisConnectionPointLocal, so reusing one vector stacks all wheels.
  const positions = [
    new CANNON.Vec3( tw, wy,  wb),
    new CANNON.Vec3(-tw, wy,  wb),
    new CANNON.Vec3( tw, wy, -wb),
    new CANNON.Vec3(-tw, wy, -wb),
  ];
  positions.forEach((p) => {
    vehicle.addWheel({ ...wheelOptions, chassisConnectionPointLocal: p });
  });

  vehicle.addToWorld(world);

  // Visual wheel meshes paired to the physics info
  const wheelMeshes = visual.wheels;

  function update() {
    for (let i = 0; i < vehicle.wheelInfos.length; i++) {
      vehicle.updateWheelTransform(i);
      const t = vehicle.wheelInfos[i].worldTransform;
      const m = wheelMeshes[i];
      m.position.copy(t.position);
      m.quaternion.copy(t.quaternion);
    }
    visual.root.position.copy(chassisBody.position);
    visual.root.quaternion.copy(chassisBody.quaternion);
    // Brake lights — pulse with brake input
    visual.brakeLights.material.emissiveIntensity = visual._brakeLevel;
    visual.brakeLights.material.opacity = 0.5 + visual._brakeLevel * 0.5;
  }

  function setBrakeLight(level) {
    visual._brakeLevel = level;
  }

  function reset(position, yaw = 0) {
    chassisBody.position.set(position.x, position.y, position.z);
    chassisBody.velocity.setZero();
    chassisBody.angularVelocity.setZero();
    const q = new CANNON.Quaternion();
    q.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), yaw);
    chassisBody.quaternion.copy(q);
  }

  return {
    visual,
    body: chassisBody,
    vehicle,
    update,
    setBrakeLight,
    reset,
    constants: {
      MAX_STEER,
      MAX_ENGINE_FORCE,
      MAX_BRAKE_FORCE,
    },
  };
}

function buildVisualCar(bodyColor = 0xc8161d) {
  const root = new THREE.Group();

  // ---------- Body ----------
  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: bodyColor,
    metalness: 0.55,
    roughness: 0.28,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.2,
  });
  const blackTrim = new THREE.MeshPhysicalMaterial({
    color: 0x0a0a0c,
    metalness: 0.65,
    roughness: 0.35,
    clearcoat: 0.7,
    clearcoatRoughness: 0.2,
  });
  const carbonMat = new THREE.MeshPhysicalMaterial({
    color: 0x111418,
    metalness: 0.4,
    roughness: 0.55,
    sheen: 0.3,
    sheenRoughness: 0.4,
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x06080c,
    metalness: 0.0,
    roughness: 0.05,
    transmission: 0.55,
    thickness: 0.4,
    ior: 1.45,
    envMapIntensity: 1.4,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    transparent: true,
    opacity: 0.85,
  });
  const chromeMat = new THREE.MeshPhysicalMaterial({
    color: 0xeef0f3,
    metalness: 1.0,
    roughness: 0.12,
  });

  // Lower body — wide stance
  const lower = new THREE.Mesh(
    roundedBoxGeometry(1.92, 0.55, 4.2, 0.18, 4),
    bodyMat
  );
  lower.position.y = 0.5;
  lower.castShadow = lower.receiveShadow = true;
  root.add(lower);

  // Mid section (cabin base)
  const mid = new THREE.Mesh(
    roundedBoxGeometry(1.78, 0.32, 3.0, 0.16, 4),
    bodyMat
  );
  mid.position.set(0, 0.86, -0.05);
  mid.castShadow = mid.receiveShadow = true;
  root.add(mid);

  // Roof / canopy — slightly tapered
  const roof = new THREE.Mesh(
    roundedBoxGeometry(1.5, 0.32, 1.85, 0.18, 5),
    bodyMat
  );
  roof.position.set(0, 1.16, -0.15);
  roof.castShadow = true;
  root.add(roof);

  // Greenhouse / windows (single slab cut by roof+mid)
  const glass = new THREE.Mesh(
    roundedBoxGeometry(1.55, 0.36, 2.1, 0.18, 4),
    glassMat
  );
  glass.position.set(0, 1.04, -0.1);
  root.add(glass);

  // Hood scoop / bonnet line
  const hood = new THREE.Mesh(
    roundedBoxGeometry(1.7, 0.04, 1.4, 0.04, 2),
    blackTrim
  );
  hood.position.set(0, 0.79, 1.05);
  root.add(hood);

  // Front splitter
  const splitter = new THREE.Mesh(
    new THREE.BoxGeometry(1.95, 0.06, 0.3),
    carbonMat
  );
  splitter.position.set(0, 0.27, 1.95);
  splitter.castShadow = true;
  root.add(splitter);

  // Rear diffuser
  const diffuser = new THREE.Mesh(
    new THREE.BoxGeometry(1.85, 0.18, 0.6),
    carbonMat
  );
  diffuser.position.set(0, 0.32, -1.95);
  diffuser.castShadow = true;
  root.add(diffuser);

  // Rear wing
  const wingPostL = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.32, 0.12),
    blackTrim
  );
  wingPostL.position.set(-0.7, 0.95, -1.85);
  root.add(wingPostL);
  const wingPostR = wingPostL.clone();
  wingPostR.position.x = 0.7;
  root.add(wingPostR);
  const wing = new THREE.Mesh(
    new THREE.BoxGeometry(1.7, 0.05, 0.32),
    blackTrim
  );
  wing.position.set(0, 1.14, -1.85);
  wing.castShadow = true;
  root.add(wing);

  // Side mirrors
  const mirrorGeo = new THREE.BoxGeometry(0.18, 0.1, 0.18);
  const mirrorL = new THREE.Mesh(mirrorGeo, bodyMat);
  mirrorL.position.set(-0.95, 1.0, 0.55);
  root.add(mirrorL);
  const mirrorR = mirrorL.clone();
  mirrorR.position.x = 0.95;
  root.add(mirrorR);

  // Headlights
  const headLightMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    emissive: 0xfff0d0,
    emissiveIntensity: 1.6,
    roughness: 0.2,
    metalness: 0.0,
  });
  const hlGeo = new THREE.BoxGeometry(0.45, 0.1, 0.06);
  const hlL = new THREE.Mesh(hlGeo, headLightMat);
  hlL.position.set(-0.6, 0.7, 2.09);
  root.add(hlL);
  const hlR = hlL.clone();
  hlR.position.x = 0.6;
  root.add(hlR);

  // Brake / tail lights — start dim, brighten on brake
  const brakeMat = new THREE.MeshPhysicalMaterial({
    color: 0x551014,
    emissive: 0xff1018,
    emissiveIntensity: 0.6,
    transparent: true,
    opacity: 0.6,
    roughness: 0.3,
  });
  const brakeGeo = new THREE.BoxGeometry(1.45, 0.1, 0.06);
  const brakeLights = new THREE.Mesh(brakeGeo, brakeMat);
  brakeLights.position.set(0, 0.78, -2.09);
  root.add(brakeLights);

  // Exhaust tips
  const exhaustGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.18, 16);
  exhaustGeo.rotateX(Math.PI / 2);
  const exL = new THREE.Mesh(exhaustGeo, chromeMat);
  exL.position.set(-0.45, 0.4, -2.05);
  root.add(exL);
  const exR = exL.clone();
  exR.position.x = 0.45;
  root.add(exR);

  // ---------- Wheels ----------
  const wheels = [];
  const tireMat = new THREE.MeshPhysicalMaterial({
    color: 0x0a0a0a,
    roughness: 0.85,
    metalness: 0.05,
    sheen: 0.2,
  });
  const rimMat = new THREE.MeshPhysicalMaterial({
    color: 0x9aa0a8,
    metalness: 1.0,
    roughness: 0.18,
    clearcoat: 0.6,
  });
  const brakeDiscMat = new THREE.MeshPhysicalMaterial({
    color: 0x202428,
    metalness: 0.9,
    roughness: 0.35,
  });
  for (let i = 0; i < 4; i++) {
    const w = buildWheel(tireMat, rimMat, brakeDiscMat);
    wheels.push(w);
    // Wheels live in world space (driven by physics), not inside root
  }

  return {
    root,
    wheels,
    brakeLights,
    _brakeLevel: 0,
  };
}

function buildWheel(tireMat, rimMat, brakeDiscMat) {
  const group = new THREE.Group();

  const tireGeo = new THREE.CylinderGeometry(
    WHEEL_RADIUS,
    WHEEL_RADIUS,
    WHEEL_WIDTH,
    32,
    1
  );
  tireGeo.rotateZ(Math.PI / 2);
  const tire = new THREE.Mesh(tireGeo, tireMat);
  tire.castShadow = true;
  group.add(tire);

  // Rim — slightly inset
  const rimGeo = new THREE.CylinderGeometry(
    WHEEL_RADIUS * 0.7,
    WHEEL_RADIUS * 0.7,
    WHEEL_WIDTH * 0.95,
    24
  );
  rimGeo.rotateZ(Math.PI / 2);
  const rim = new THREE.Mesh(rimGeo, rimMat);
  rim.castShadow = true;
  group.add(rim);

  // Spokes
  const spokeGeo = new THREE.BoxGeometry(WHEEL_WIDTH * 0.6, 0.06, WHEEL_RADIUS * 1.2);
  for (let i = 0; i < 5; i++) {
    const spoke = new THREE.Mesh(spokeGeo, rimMat);
    spoke.rotation.x = (i / 5) * Math.PI * 2;
    spoke.position.x = 0;
    group.add(spoke);
  }

  // Brake disc behind the rim
  const discGeo = new THREE.CylinderGeometry(
    WHEEL_RADIUS * 0.6,
    WHEEL_RADIUS * 0.6,
    0.04,
    24
  );
  discGeo.rotateZ(Math.PI / 2);
  const disc = new THREE.Mesh(discGeo, brakeDiscMat);
  disc.position.x = -WHEEL_WIDTH * 0.45;
  group.add(disc);

  return group;
}

// ---- Rounded box helper (smooth body panels) ----
function roundedBoxGeometry(w, h, d, r, segments = 4) {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  shape.moveTo(x, y + r);
  shape.lineTo(x, y + h - r);
  shape.quadraticCurveTo(x, y + h, x + r, y + h);
  shape.lineTo(x + w - r, y + h);
  shape.quadraticCurveTo(x + w, y + h, x + w, y + h - r);
  shape.lineTo(x + w, y + r);
  shape.quadraticCurveTo(x + w, y, x + w - r, y);
  shape.lineTo(x + r, y);
  shape.quadraticCurveTo(x, y, x, y + r);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: d,
    bevelEnabled: true,
    bevelThickness: r * 0.6,
    bevelSize: r * 0.6,
    bevelSegments: segments,
    curveSegments: segments * 2,
  });
  geo.translate(0, 0, -d / 2);
  geo.computeVertexNormals();
  return geo;
}
