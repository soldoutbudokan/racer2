import assert from 'node:assert/strict';
import * as THREE from 'three';
import { GRAPHICS, createGraphicsController, renderPixelRatio } from '../src/graphics.js';
import { addTreeBatches } from '../src/scenery/treeBatches.js';

for (const preset of Object.keys(GRAPHICS)) {
  for (const [w, h, dpr] of [[3840, 2160, 2], [1920, 1080, 1.25], [390, 844, 3]]) {
    const r = renderPixelRatio(w, h, dpr, preset);
    assert(w * h * r * r <= GRAPHICS[preset].pixels + 1);
    assert(r <= dpr);
  }
}
const applied = [];
const controller = createGraphicsController((preset, scale) => applied.push([preset, scale]));
for (let i = 0; i < 500; i++) controller.sample(16.7);
assert.equal(controller.preset, 'balanced', 'healthy frames preserve quality');
controller.sample(5000);
assert.equal(controller.preset, 'balanced', 'a suspended tab cannot lower quality');
for (let i = 0; i < 120; i++) controller.sample(16.7);
controller.sample(900);
for (let i = 0; i < 120; i++) controller.sample(16.7);
assert.equal(controller.preset, 'balanced', 'one long hitch between smooth frames cannot lower quality');
for (let i = 0; i < 300; i++) controller.sample(40);
assert.equal(controller.preset, 'performance', 'sustained slow frames lower quality');
for (let i = 0; i < 1500; i++) controller.sample(80);
assert.equal(controller.scale, 0.65, 'resolution has a readable floor');
controller.select('high');
for (let i = 0; i < 300; i++) controller.sample(80);
assert.equal(controller.preset, 'high', 'manual choice is respected');
controller.select('corrupt-setting');
assert.equal(controller.choice, 'auto');

// Validate spatial partitioning preserves every transform and instance tint.
const source = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial(), 4);
const positions = [[-150, 0, -80], [10, 2, 20], [220, 0, 350], [240, 0, 370]];
positions.forEach(([x, y, z], i) => {
  source.setMatrixAt(i, new THREE.Matrix4().makeTranslation(x, y, z));
  source.setColorAt(i, new THREE.Color().setRGB((i + 1) / 4, 0.5, 0.2));
});
const parent = new THREE.Group();
addTreeBatches(parent, source, new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial());
parent.updateMatrixWorld(true);
const recovered = [], matrix = new THREE.Matrix4(), color = new THREE.Color();
for (const lod of parent.children) {
  assert.equal(lod.levels.length, 2);
  const mesh = lod.levels[0].object;
  for (let i = 0; i < mesh.count; i++) {
    mesh.getMatrixAt(i, matrix); matrix.premultiply(mesh.matrixWorld);
    mesh.getColorAt(i, color);
    recovered.push([...matrix.elements.slice(12, 15), color.r]);
  }
}
assert.deepEqual(recovered.sort((a, b) => a[0] - b[0]), positions.map((p, i) => [...p, (i + 1) / 4]));
console.log('PASS: pixel budgets, adaptive quality, manual settings, spatial batches and LOD transforms');
