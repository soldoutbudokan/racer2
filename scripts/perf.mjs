// Render-cost baseline: draw calls, triangles, programs, and a timed
// composer.render() loop, per track.
//   node perf.mjs [trackId ...]
import { chromium } from 'playwright-core';
const EXE = process.env.HOME +
  '/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/' +
  'Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const ONLY = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: EXE, headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
await page.goto('http://localhost:5173/', { waitUntil: 'load' });
await page.waitForSelector('.track-card');
const ids = await page.evaluate(() =>
  [...document.querySelectorAll('.track-card')].map((b) => b.dataset.track));

const rows = [];
for (const id of ids) {
  if (ONLY.length && !ONLY.includes(id)) continue;
  await page.evaluate(() => {
    const ctx = window.__ctx;
    if (ctx.mode) document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
    const ui = document.getElementById('ui'); if (ui) ui.style.display = '';
  });
  await page.waitForTimeout(250);
  await page.evaluate((id) =>
    document.querySelector(`.track-card[data-track="${id}"]`).click(), id);
  await page.waitForTimeout(1200);
  await page.evaluate(() =>
    document.querySelector('button.mode[data-mode="time-trial"]').click());
  await page.waitForTimeout(2000);
  const r = await page.evaluate(() => {
    const ctx = window.__ctx;
    ctx.mode = null;
    const ui = document.getElementById('ui'); if (ui) ui.style.display = 'none';
    // scene-graph totals (independent of frustum culling)
    let objs = 0, tris = 0, verts = 0, meshes = 0, insts = 0;
    ctx.scene.traverse((o) => {
      objs++;
      if (!o.isMesh && !o.isInstancedMesh) return;
      meshes++;
      const g = o.geometry;
      const n = g.index ? g.index.count / 3 : g.attributes.position.count / 3;
      const c = o.isInstancedMesh ? o.count : 1;
      if (o.isInstancedMesh) insts++;
      tris += n * c;
      verts += g.attributes.position.count;
    });
    // frustum cost from the chase camera at the start line
    const f = ctx.track.frames[0];
    const cam = ctx.camera;
    cam.fov = 62; cam.aspect = innerWidth / innerHeight;
    cam.position.set(f.pos.x - f.tan.x * 8, 2.6, f.pos.z - f.tan.z * 8);
    cam.lookAt(f.pos.x + f.tan.x * 20, 0.8, f.pos.z + f.tan.z * 20);
    cam.updateProjectionMatrix();
    ctx.composer.render();          // warm: compile programs, upload buffers
    ctx.renderer.info.autoReset = false;
    ctx.renderer.info.reset();
    ctx.composer.render();
    const info = ctx.renderer.info;
    const drawn = { calls: info.render.calls, tris: info.render.triangles,
                    programs: info.programs.length, textures: info.memory.textures,
                    geometries: info.memory.geometries };
    const t0 = performance.now();
    const N = 12;
    for (let i = 0; i < N; i++) ctx.composer.render();
    const ms = (performance.now() - t0) / N;
    return { scene: { objs, meshes, insts, tris: Math.round(tris), verts }, drawn, ms: +ms.toFixed(1) };
  });
  rows.push({ id, ...r });
  console.log(id.padEnd(9),
    'sceneTris', String(r.scene.tris).padStart(8),
    '| drawn calls', String(r.drawn.calls).padStart(4),
    'tris', String(r.drawn.tris).padStart(8),
    '| progs', String(r.drawn.programs).padStart(3),
    'tex', String(r.drawn.textures).padStart(3),
    'geo', String(r.drawn.geometries).padStart(4),
    '| swiftshader ms/frame', r.ms);
}
console.log('errors:', errors.length ? errors.slice(0, 8) : 'none');
await browser.close();
