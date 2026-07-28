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

export const WHEEL_RADIUS = 0.36;         // m, tyre outer radius
export const SUSPENSION_REST = 0.32;      // m, spring length with the wheel hanging
export const SUSPENSION_STIFFNESS = 46;   // cannon-es RaycastVehicle units
export const SUSPENSION_ANCHOR_Y = -0.05; // hub attachment height in chassis space
const GRAVITY = 9.82;                     // must match physics.js

// cannon-es scales its spring force by the chassis mass
// (`suspensionForce = stiffness * compression * mass`), so the compression that
// balances mass·g/4 at one corner is MASS-INDEPENDENT: g / (4 · stiffness).
// 9.82 / 184 = 53.4 mm here. Aero load squats it further at speed, which is
// exactly what should happen — the design ride height is the static one.
export const STATIC_COMPRESSION = GRAVITY / (4 * SUSPENSION_STIFFNESS);

// Hub height in chassis space at design (static) ride height. The bodywork is
// authored in an axle-centred frame (wheel centre y 0, ground -WHEEL_RADIUS),
// so this is exactly where the body group belongs on the chassis.
export const HUB_LOCAL_Y = SUSPENSION_ANCHOR_Y - (SUSPENSION_REST - STATIC_COMPRESSION);

// Chassis height above a flat road once settled — the height to spawn at if a
// car is to be placed on the ground rather than dropped onto it.
export const STATIC_CHASSIS_HEIGHT = WHEEL_RADIUS - HUB_LOCAL_Y;
