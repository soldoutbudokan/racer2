// Ride-height geometry, shared by the physics vehicle (`car.js`) and the visual
// body placement (`carModels/index.js`). It lives in its own module so the two
// can never drift apart: the painted shell is a rigid child of the sprung
// chassis, so it only lines up with the wheels at ONE suspension compression,
// and that compression is a property of the spring, not something to eyeball.
//
// History: the body was authored against the hub offset measured at full droop
// (-0.37, the pose a car holds only while it is falling onto the grid). Loaded,
// the hub sits ~5.7 cm higher in chassis space, so the shell spent every race
// that much lower over its wheels than authored — the rockers ran below the
// asphalt and the tyres poked through the arch liners. See ROUTINE.md,
// 2026-07-28.
//
// 2026-10-18: the chassis body's height above the road is now PER CAR. In
// cannon the body origin is the centre of mass, and every car's sat 0.677 m
// up — 0.32 m above the hubs, where no racing car carries its weight. Brake
// and drive impulses act at the contact patch with that full lever arm, so
// every car dived onto its nose under braking hard enough to unload the rear
// axle and spin (the side forces are already scaled down by `rollInfluence`).
// `stanceFor(cgHeight)` gives the hub offset and suspension anchor that put
// the origin at the spec's centre-of-mass height; the exported constants are
// the default car's, for code that has no car in hand.

export const WHEEL_RADIUS = 0.36;         // m, tyre outer radius
export const SUSPENSION_REST = 0.32;      // m, spring length with the wheel hanging
export const SUSPENSION_STIFFNESS = 46;   // cannon-es RaycastVehicle units
const GRAVITY = 9.82;                     // must match physics.js

// cannon-es scales its spring force by the chassis mass
// (`suspensionForce = stiffness * compression * mass`), so the compression that
// balances mass·g/4 at one corner is MASS-INDEPENDENT: g / (4 · stiffness).
// 9.82 / 184 = 53.4 mm here. Aero load squats it further at speed, which is
// exactly what should happen — the design ride height is the static one.
export const STATIC_COMPRESSION = GRAVITY / (4 * SUSPENSION_STIFFNESS);

// Centre-of-mass height above a flat road for a car whose spec names none.
// The GT3 coupe uses this value, so the constants below describe it.
export const DEFAULT_CG_HEIGHT = 0.50;

/**
 * Ride-height geometry for a car whose centre of mass sits `cgHeight` above
 * the road at design (static) ride height.
 *   hubLocalY      hub height in chassis space when settled. The bodywork is
 *                  authored in an axle-centred frame (wheel centre y 0, ground
 *                  -WHEEL_RADIUS), so this is where the body group belongs.
 *   anchorY        suspension anchor height in chassis space that puts the
 *                  settled hub there.
 *   chassisHeight  the chassis origin's height above a flat road once
 *                  settled — the height to spawn at if a car is to be placed
 *                  on the ground rather than dropped onto it.
 */
export function stanceFor(cgHeight = DEFAULT_CG_HEIGHT) {
  const hubLocalY = WHEEL_RADIUS - cgHeight;
  return {
    hubLocalY,
    anchorY: hubLocalY + (SUSPENSION_REST - STATIC_COMPRESSION),
    chassisHeight: cgHeight,
  };
}

const DEFAULT = stanceFor();
export const SUSPENSION_ANCHOR_Y = DEFAULT.anchorY;
export const HUB_LOCAL_Y = DEFAULT.hubLocalY;
export const STATIC_CHASSIS_HEIGHT = DEFAULT.chassisHeight;
