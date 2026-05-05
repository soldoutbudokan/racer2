import * as CANNON from 'cannon-es';

export function createPhysicsWorld() {
  const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.82, 0),
  });
  // NaiveBroadphase O(n²) but reliable for raycasts; we have <1k bodies so it's fine.
  world.broadphase = new CANNON.NaiveBroadphase();
  world.allowSleep = true;
  world.defaultContactMaterial.friction = 0.4;

  // Materials & contact tuning (Cannon's internal contact graph)
  const groundMat = new CANNON.Material('ground');
  const wheelMat = new CANNON.Material('wheel');
  const chassisMat = new CANNON.Material('chassis');
  const barrierMat = new CANNON.Material('barrier');

  world.addContactMaterial(new CANNON.ContactMaterial(groundMat, wheelMat, {
    friction: 0.0,        // RaycastVehicle handles tyre friction itself
    restitution: 0.0,
    contactEquationStiffness: 1000,
  }));
  world.addContactMaterial(new CANNON.ContactMaterial(chassisMat, barrierMat, {
    friction: 0.2,
    restitution: 0.15,
  }));
  world.addContactMaterial(new CANNON.ContactMaterial(chassisMat, groundMat, {
    friction: 0.2,
    restitution: 0.05,
  }));

  return {
    world,
    materials: { groundMat, wheelMat, chassisMat, barrierMat },
  };
}
