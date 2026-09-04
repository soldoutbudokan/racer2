import * as CANNON from 'cannon-es';

export function createPhysicsWorld() {
  const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.82, 0),
  });
  // Sweep-and-prune rejects separated bodies before pair testing. Cannon's
  // SAP also supports the wheel raycasts through its AABB query.
  world.broadphase = new CANNON.SAPBroadphase(world);
  world.broadphase.axisIndex = 0;
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
    // Lower friction + lower restitution so a glancing wall hit slides along
    // rather than snagging or bouncing the car into a spin.
    friction: 0.08,
    restitution: 0.04,
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
