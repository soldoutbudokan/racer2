import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';
import { GRAPHICS, renderPixelRatio, createGraphicsController } from './graphics.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { SimplexNoise } from 'three/addons/math/SimplexNoise.js';
import { makeRandom } from './scenery/rng.js';
import { createSky } from './sky.js';

/**
 * The 64x64 RGBA noise GTAO's poisson-denoise pass samples, built exactly the
 * way `GTAOPass.generateNoise` builds it — but from a seeded generator rather
 * than `Math.random`, so the pattern is the same on every load. Kept in step
 * with three's version: four simplex lookups per texel, offset by `size` on
 * each axis to decorrelate the channels.
 */
function makeDenoiseNoise(size = 64) {
  const simplex = new SimplexNoise({ random: makeRandom('gtao denoise') });
  const data = new Uint8Array(size * size * 4);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const o = (i * size + j) * 4;
      data[o] = (simplex.noise(i, j) * 0.5 + 0.5) * 255;
      data[o + 1] = (simplex.noise(i + size, j) * 0.5 + 0.5) * 255;
      data[o + 2] = (simplex.noise(i, j + size) * 0.5 + 0.5) * 255;
      data[o + 3] = (simplex.noise(i + size, j + size) * 0.5 + 0.5) * 255;
    }
  }
  const tex = new THREE.DataTexture(
    data, size, size, THREE.RGBAFormat, THREE.UnsignedByteType);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.needsUpdate = true;
  return tex;
}

/**
 * Colour grade, folded into the tone-mapping function so every path gets it
 * at no cost: Performance tone-maps in each material, Balanced and High in
 * the OutputPass, and both call ACESFilmicToneMapping. Applied after ACES, in
 * display-linear: a little saturation back (ACES greys out bright colour),
 * cool shadows and warm highlights for the afternoon light, and a gentle
 * S-curve so the frame has a black and a white in it.
 */
const GRADE_GLSL = /* glsl */`
vec3 ACESFilmicToneMapping( vec3 color ) {
  vec3 c = ACESFilmicToneMappingBase( color );
  float l = dot( c, vec3( 0.2126, 0.7152, 0.0722 ) );
  c = max( vec3( 0.0 ), mix( vec3( l ), c, 1.05 ) );
  c *= mix( vec3( 0.975, 1.0, 1.035 ), vec3( 1.025, 1.0, 0.965 ), smoothstep( 0.04, 0.55, l ) );
  vec3 s = c * c * ( 3.0 - 2.0 * c );
  c = mix( c, s, 0.14 );
  return clamp( c, 0.0, 1.0 );
}
`;
if (!THREE.ShaderChunk.tonemapping_pars_fragment.includes('ACESFilmicToneMappingBase')) {
  THREE.ShaderChunk.tonemapping_pars_fragment = THREE.ShaderChunk.tonemapping_pars_fragment
    .replace('vec3 ACESFilmicToneMapping( vec3 color ) {', 'vec3 ACESFilmicToneMappingBase( vec3 color ) {')
    + GRADE_GLSL;
}

/**
 * Build a high-fidelity scene: physically-based renderer, ACES tone mapping,
 * sky dome + sun, IBL from a PMREM of the sky, soft shadows, post FX.
 */
export function createScene(canvas) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    // MSAA on the default framebuffer serves the paths that render directly:
    // Performance and split-screen. Balanced and High draw into the composer's
    // own targets and only pay a resolve on the final blit.
    antialias: true,
    powerPreference: 'high-performance',
    stencil: false,
  });
  renderer.setPixelRatio(1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
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

  // Mid-afternoon sun: warm light, shadows long but not raking.
  const sunPos = new THREE.Vector3();
  const sunElev = THREE.MathUtils.degToRad(23);
  const sunAzim = THREE.MathUtils.degToRad(128);
  sunPos.setFromSphericalCoords(1, Math.PI / 2 - sunElev, sunAzim);
  const sky = createSky(sunPos);
  scene.add(sky.mesh);
  // track.js sets the horizon to each circuit's haze through this.
  scene.userData.sky = sky;

  // Sun — warm afternoon tint
  const sun = new THREE.DirectionalLight(0xffe4c4, 2.7);
  sun.position.copy(sunPos).multiplyScalar(800);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
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
  let shadowTexel = (2 * s) / 1024;
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
  const hemi = new THREE.HemisphereLight(0xb3c6da, 0x4a4632, 0.85);
  scene.add(hemi);

  // Subtle cool fill from the opposite azimuth — gives shaded car panels
  // a blue-gray kick that reads as sky bounce rather than pure black.
  const fill = new THREE.DirectionalLight(0x8cb4d4, 0.28);
  fill.position.set(-sunPos.x * 300, 200, -sunPos.z * 300);
  scene.add(fill);

  // IBL: the sky alone through PMREM, in its own scene so the capture never
  // depends on what else has been added. Captured brighter than the visible
  // dome, which keeps image-based fill near the level every material was
  // tuned under, and with a small sun disc so the blur has no hot spot.
  const envScene = new THREE.Scene();
  envScene.add(new THREE.Mesh(sky.mesh.geometry, sky.mesh.material).copy(sky.mesh));
  const ENV = { uIntensity: 3.2, uDisc: 6, uSaturation: 0.45, uGroundMix: 1 };
  const shown = {};
  for (const k in ENV) { shown[k] = sky.uniforms[k].value; sky.uniforms[k].value = ENV[k]; }
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileCubemapShader();
  const env = pmrem.fromScene(envScene, 0.04).texture;
  scene.environment = env;
  pmrem.dispose();
  for (const k in ENV) sky.uniforms[k].value = shown[k];

  // Atmospheric haze, pushed far back so the circuit itself stays crisp and
  // only the distant scenery melts into the horizon. Each circuit replaces
  // this with its own (track.js).
  scene.fog = new THREE.Fog(0xc9d3d6, 900, 4200);

  // Balanced uses only anti-aliasing and the output transform. AO and bloom
  // are allocated lazily for High, then released when leaving it.
  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  const fxaa = new ShaderPass(FXAAShader);
  const output = new OutputPass();
  composer.addPass(renderPass);
  composer.addPass(fxaa);
  composer.addPass(output);
  let gtao = null, bloom = null;
  let activePreset = 'balanced', activeScale = 1;

  function resize() {
    const w = Math.max(1, window.innerWidth), h = Math.max(1, window.innerHeight);
    const ratio = renderPixelRatio(w, h, window.devicePixelRatio || 1, activePreset, activeScale);
    renderer.setPixelRatio(ratio);
    renderer.setSize(w, h);
    // Performance renders directly; its unused composer stays tiny.
    composer.setPixelRatio(activePreset === 'performance' ? 1 : ratio);
    composer.setSize(activePreset === 'performance' ? 1 : w, activePreset === 'performance' ? 1 : h);
    if (gtao) gtao.setSize(Math.max(1, Math.round(w * ratio * 0.5)), Math.max(1, Math.round(h * ratio * 0.5)));
    fxaa.uniforms.resolution.value.set(1 / (w * ratio), 1 / (h * ratio));
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function applyGraphics(preset, scale) {
    activePreset = preset; activeScale = scale;
    if (preset === 'high' && !gtao) {
      gtao = new GTAOPass(scene, camera, 1, 1);
      gtao.blendIntensity = 0.65;
      gtao.updateGtaoMaterial({ radius: 0.6, distanceExponent: 1, thickness: 1, scale: 1, samples: 8 });
      gtao.pdNoiseTexture.dispose();
      gtao.pdNoiseTexture = makeDenoiseNoise();
      gtao.pdMaterial.uniforms.tNoise.value = gtao.pdNoiseTexture;
      bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.12, 0.5, 1.05);
      composer.insertPass(gtao, 1);
      composer.insertPass(bloom, 2);
    } else if (preset !== 'high' && gtao) {
      composer.removePass(gtao); composer.removePass(bloom);
      gtao.dispose(); bloom.dispose();
      gtao = null; bloom = null;
    }
    const shadowSize = GRAPHICS[preset].shadow;
    if (sun.shadow.mapSize.x !== shadowSize) {
      sun.shadow.map?.dispose(); sun.shadow.map = null;
      sun.shadow.mapSize.set(shadowSize, shadowSize);
      shadowTexel = (2 * s) / shadowSize;
    }
    resize();
  }
  let saved = 'auto';
  try { saved = localStorage.getItem('racer2.graphics') || 'auto'; } catch { /* Private browsing. */ }
  const graphics = createGraphicsController(applyGraphics, saved);
  const renderComposer = composer.render.bind(composer);
  composer.render = (dt) => {
    if (activePreset === 'performance') renderer.render(scene, camera);
    else renderComposer(dt);
  };
  window.addEventListener('resize', resize);

  return { renderer, scene, camera, composer, sun, updateShadowTarget, graphics };
}
