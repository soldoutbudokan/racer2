import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { buildVisualCar } from './carModels/index.js';

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
  const archetype = options.archetype ?? 'gt';
  const visual = buildVisualCar(archetype, bodyColor);

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
