import * as THREE from 'three';

/**
 * Art-directed clear-afternoon sky.
 *
 * three's Preetham `Sky` is tuned for a tone-mapping exposure near 0.5; the
 * game's lights are tuned for 1.0, and at 1.0 that sky rendered almost white
 * from the horizon to the zenith on every circuit. This dome is a gradient
 * with the parts that make a clear sky read as one:
 *
 *   - a deep blue zenith that pales to a bright band only in the last ~15°
 *     above the horizon,
 *   - a horizon colour taken from the circuit's fog, so distant terrain
 *     melts into the sky instead of meeting it at an edge,
 *   - forward scattering round the sun (two lobes and a disc) and a warm
 *     wash along the horizon under it,
 *   - a dark ground hemisphere below the horizon, in the PMREM environment
 *     only, so car paint reflects a horizon line instead of bright sky on its
 *     flanks.
 *
 * Colours are linear and scene-referred: they go through the same ACES
 * transform as everything else.
 */
const vertexShader = /* glsl */`
  varying vec3 vWorldPosition;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPosition = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
    gl_Position.z = gl_Position.w; // on the far plane
  }
`;

const fragmentShader = /* glsl */`
  uniform vec3 uZenith;
  uniform vec3 uMid;
  uniform vec3 uHorizon;
  uniform vec3 uGround;
  uniform vec3 uSunColor;
  uniform vec3 uSunDir;
  uniform float uIntensity;
  uniform float uDisc;
  uniform float uSaturation;
  uniform float uGroundMix;
  varying vec3 vWorldPosition;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec3 dir = normalize(vWorldPosition - cameraPosition);
    float up = dir.y;
    float t = max(up, 0.0);

    vec3 col = mix(uHorizon, uMid, smoothstep(0.0, 0.26, t));
    col = mix(col, uZenith, smoothstep(0.10, 0.95, t));

    // Away from the sun the sky deepens a touch (Rayleigh phase).
    float cosT = dot(dir, uSunDir);
    col *= 0.92 + 0.08 * (1.0 - cosT) * 0.5 + 0.08 * cosT * cosT;

    // Horizon warmth under the sun.
    vec2 flatDir = normalize(dir.xz + 1e-5);
    vec2 flatSun = normalize(uSunDir.xz + 1e-5);
    float az = max(dot(flatDir, flatSun), 0.0);
    float low = pow(1.0 - t, 6.0);
    col = mix(col, col * uSunColor * 1.25, low * az * az * 0.55);

    // Forward scattering: a broad glow and a tight aureole.
    float c = max(cosT, 0.0);
    col += uSunColor * (pow(c, 7.0) * 0.20 + pow(c, 60.0) * 0.55 + pow(c, 900.0) * 2.2);
    col += uSunColor * smoothstep(0.99955, 0.99975, cosT) * uDisc;

    // Below the horizon: ground bounce, reached quickly so reflections get a
    // crisp horizon line. Only the environment capture uses it; the visible
    // dome keeps the haze colour there, because from a high camera the edge
    // of the world is below the horizon and would show a dark band.
    col = mix(col, uGround, smoothstep(0.0, -0.06, up) * uGroundMix);

    col = mix(vec3(dot(col, vec3(0.2126, 0.7152, 0.0722))), col, uSaturation);
    col *= uIntensity;
    // Break up 8-bit banding in the long gradients.
    col *= 1.0 + (hash(gl_FragCoord.xy) - 0.5) * 0.012;

    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export const SKY_DEFAULTS = {
  zenith: 0x2d64b8,
  mid: 0x6d9fd8,
  horizon: 0xc9d3d6,
  ground: 0x6f7060,
  sun: 0xffe2bd,
};

export function createSky(sunDir) {
  const col = (hex) => new THREE.Color(hex);
  const uniforms = {
    uZenith: { value: col(SKY_DEFAULTS.zenith) },
    uMid: { value: col(SKY_DEFAULTS.mid) },
    uHorizon: { value: col(SKY_DEFAULTS.horizon) },
    uGround: { value: col(SKY_DEFAULTS.ground) },
    uSunColor: { value: col(SKY_DEFAULTS.sun) },
    uSunDir: { value: sunDir.clone().normalize() },
    uIntensity: { value: 1 },
    uDisc: { value: 26 },
    uSaturation: { value: 1 },
    uGroundMix: { value: 0 },
  };
  const material = new THREE.ShaderMaterial({
    name: 'sky',
    uniforms, vertexShader, fragmentShader,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
  });
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 24), material);
  mesh.name = 'sky';
  mesh.scale.setScalar(5000);
  mesh.frustumCulled = false;
  mesh.renderOrder = -10;

  // Per-circuit look: the horizon follows the fog so the two always match,
  // and a theme can shift the blue overhead (dustier desert, crisper alps).
  function setAtmosphere({ horizon, zenith, mid } = {}) {
    uniforms.uHorizon.value.set(horizon ?? SKY_DEFAULTS.horizon);
    uniforms.uZenith.value.set(zenith ?? SKY_DEFAULTS.zenith);
    uniforms.uMid.value.set(mid ?? SKY_DEFAULTS.mid);
  }

  return { mesh, uniforms, setAtmosphere };
}
