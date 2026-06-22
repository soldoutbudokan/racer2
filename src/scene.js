import * as THREE from 'three';
import { Sky } from 'three/addons/objects/Sky.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

/**
 * Build a high-fidelity scene: physically-based renderer, ACES tone mapping,
 * Sky + sun, IBL from a PMREM of the sky, soft shadows, post FX (bloom, SMAA).
 */
export function createScene(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: 'high-performance',
    stencil: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  // (fog set after PMREM so it doesn't tint the env map)

  // near 0.6 (not 0.3) doubles far-field depth precision — together with the
  // polygon offsets it keeps the road/ground layering stable at distance.
  const camera = new THREE.PerspectiveCamera(
    62,
    window.innerWidth / window.innerHeight,
    0.6,
    3000
  );

  // Sky shader (Preetham/Hosek-Wilkie style atmosphere)
  const sky = new Sky();
  sky.scale.setScalar(8000);
  scene.add(sky);
  const sunPos = new THREE.Vector3();
  const skyU = sky.material.uniforms;
  skyU.turbidity.value = 4.5;       // cleaner, more vivid sky
  skyU.rayleigh.value = 2.2;        // rich blue away from the sun
  skyU.mieCoefficient.value = 0.006; // slightly more haze near the horizon
  skyU.mieDirectionalG.value = 0.80; // broader sun glow
  // Low golden-hour sun — long dramatic shadows and warm light.
  const sunElev = THREE.MathUtils.degToRad(11);
  const sunAzim = THREE.MathUtils.degToRad(128);
  sunPos.setFromSphericalCoords(1, Math.PI / 2 - sunElev, sunAzim);
  skyU.sunPosition.value.copy(sunPos);

  // Sun — warm peach-orange at very low elevation
  const sun = new THREE.DirectionalLight(0xffd5a0, 3.4);
  sun.position.copy(sunPos).multiplyScalar(800);
  sun.castShadow = true;
  sun.shadow.mapSize.set(4096, 4096);
  sun.shadow.camera.near = 50;
  sun.shadow.camera.far = 1600;
  // Tight frustum for crisp contact shadows — it FOLLOWS the player car via
  // updateShadowTarget() each frame (it used to sit at the origin, so most of
  // the lap had no shadows at all).
  const s = 90;
  sun.shadow.camera.left = -s;
  sun.shadow.camera.right = s;
  sun.shadow.camera.top = s;
  sun.shadow.camera.bottom = -s;
  sun.shadow.bias = -0.0001;
  sun.shadow.normalBias = 0.04;
  sun.shadow.radius = 3;
  scene.add(sun);
  scene.add(sun.target);

  const sunDir = sunPos.clone().normalize();
  const shadowTexel = (2 * s) / 4096;
  function updateShadowTarget(focus) {
    // Quantise the target to shadow-texel-sized steps so the shadow edges
    // don't shimmer as the camera glides.
    const tx = Math.round(focus.x / shadowTexel) * shadowTexel;
    const tz = Math.round(focus.z / shadowTexel) * shadowTexel;
    sun.target.position.set(tx, 0, tz);
    sun.position.set(
      tx + sunDir.x * 800,
      sunDir.y * 800,
      tz + sunDir.z * 800,
    );
  }

  // Sky-tinted hemisphere fill — keeps shadows from being pure black
  const hemi = new THREE.HemisphereLight(0x92b8e0, 0x3e3520, 0.6);
  scene.add(hemi);

  // Subtle cool fill from the opposite azimuth — gives shaded car panels
  // a blue-gray kick that reads as sky bounce rather than pure black.
  const fill = new THREE.DirectionalLight(0x8cb4d4, 0.28);
  fill.position.set(-sunPos.x * 300, 200, -sunPos.z * 300);
  scene.add(fill);

  // IBL: render the (sky-only) scene through PMREM for crisp reflections.
  // We do this before adding any other geometry so the env captures the sky/sun.
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileCubemapShader();
  const env = pmrem.fromScene(scene, 0.04).texture;
  scene.environment = env;
  pmrem.dispose();

  // Now that the env map is captured, add atmospheric fog for depth. Warm
  // golden haze, pushed far back so the circuit itself stays crisp and only
  // the distant scenery melts into the light.
  // Warm atmospheric haze — pushed back so the circuit stays crisp.
  scene.fog = new THREE.Fog(0xc8bba6, 900, 4200);

  // ---- Post-processing ----
  const composer = new EffectComposer(renderer);
  composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  composer.setSize(window.innerWidth, window.innerHeight);

  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const bloom = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.22,  // strength — just enough for headlights/sun to pop
    0.65,  // radius
    0.91   // threshold (only bright highlights bloom)
  );
  composer.addPass(bloom);

  // Subtle vignette + chromatic aberration for cinematic feel
  const cinematicPass = new ShaderPass(CinematicShader);
  composer.addPass(cinematicPass);

  const smaa = new SMAAPass(
    window.innerWidth * renderer.getPixelRatio(),
    window.innerHeight * renderer.getPixelRatio()
  );
  composer.addPass(smaa);

  composer.addPass(new OutputPass());

  // Resize handling
  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h);
    composer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    bloom.resolution.set(w, h);
  });

  return { renderer, scene, camera, composer, sun, updateShadowTarget };
}

// --- Cinematic post shader: vignette + tiny chromatic aberration + grain ---
const CinematicShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uVignette: { value: 1.0 },
    uCA: { value: 0.0009 },
    uGrain: { value: 0.018 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    precision highp float;
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uVignette;
    uniform float uCA;
    uniform float uGrain;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;
      vec2 d = uv - 0.5;
      // Chromatic aberration scaled by distance from centre
      float r = texture2D(tDiffuse, uv + d * uCA).r;
      float g = texture2D(tDiffuse, uv).g;
      float b = texture2D(tDiffuse, uv - d * uCA).b;
      vec3 col = vec3(r, g, b);

      // Vignette
      float v = smoothstep(0.95, 0.35, length(d) * 1.25);
      col *= mix(1.0, v, uVignette * 0.55);

      // Grain
      float n = hash(uv * vec2(1920.0, 1080.0) + uTime) - 0.5;
      col += n * uGrain;

      gl_FragColor = vec4(col, 1.0);
    }
  `,
};

export { CinematicShader };
