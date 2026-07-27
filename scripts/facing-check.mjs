// Winding audit. Every near-horizontal, single-sided surface in the scene
// should face UP; every closed shell should face OUT. This project has shipped
// the same bug four times now — an invisible ribbon, a decal showing through
// from the far side, a gravel trap with its normals flipped — and every time it
// was triangle winding, not depth. So: measure it instead of reasoning about it.
//
//   node scripts/facing-check.mjs [trackId ...]
import { chromium } from 'playwright-core';

const EXE = process.env.CHROME_EXE || (process.env.HOME +
  '/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/' +
  'Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing');
const ONLY = process.argv.slice(2);

const browser = await chromium.launch({ executablePath: EXE, headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
await page.goto('http://localhost:5173/', { waitUntil: 'load' });
await page.waitForFunction(() => !!window.__ctx, { timeout: 60000 });
await page.waitForSelector('.track-card');
const ids = await page.evaluate(() =>
  [...document.querySelectorAll('.track-card')].map((b) => b.dataset.track));

let bad = 0;
for (const id of ids) {
  if (ONLY.length && !ONLY.includes(id)) continue;
  await page.evaluate(() => {
    const ctx = window.__ctx;
    if (ctx.mode) document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape' }));
    const ui = document.getElementById('ui'); if (ui) ui.style.display = '';
  });
  await page.waitForTimeout(250);
  await page.evaluate((t) =>
    document.querySelector(`.track-card[data-track="${t}"]`).click(), id);
  await page.waitForTimeout(2500);

  const rows = await page.evaluate(() => {
    const ctx = window.__ctx;
    const out = [];
    ctx.scene.traverse((o) => {
      if (!o.isMesh && !o.isInstancedMesh) return;
      const m = o.material;
      if (!m || m.side !== 0) return;              // DoubleSide can't be wrong
      const g = o.geometry;
      const p = g.attributes.position;
      const idx = g.index;
      if (!p || !idx) return;
      // Sample up to 400 triangles: area-weighted sum of face normals, and the
      // share of "flat" (near-horizontal) area that faces downward.
      const n = idx.count / 3;
      const step = Math.max(1, Math.floor(n / 400));
      let flatArea = 0, downArea = 0, sumY = 0, tot = 0;
      for (let t = 0; t < n; t += step) {
        const i0 = idx.getX(t * 3), i1 = idx.getX(t * 3 + 1), i2 = idx.getX(t * 3 + 2);
        const ax = p.getX(i0), ay = p.getY(i0), az = p.getZ(i0);
        const ux = p.getX(i1) - ax, uy = p.getY(i1) - ay, uz = p.getZ(i1) - az;
        const vx = p.getX(i2) - ax, vy = p.getY(i2) - ay, vz = p.getZ(i2) - az;
        const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
        const len = Math.hypot(nx, ny, nz);
        if (len < 1e-12) continue;
        const area = len / 2;
        tot += area; sumY += ny / 2;
        const horiz = Math.abs(ny / len);
        if (horiz > 0.85) { flatArea += area; if (ny < 0) downArea += area; }
      }
      if (tot <= 0) return;
      out.push({
        name: o.name || (o.material?.color ? '#' + o.material.color.getHexString() : o.type),
        tris: n,
        flatDownPct: flatArea > 0 ? Math.round((downArea / flatArea) * 100) : null,
        // How much of the mesh is horizontal at all. A sign panel is almost
        // entirely vertical; its one small down-facing cap is its underside and
        // is meant to be there.
        flatShare: flatArea / tot,
        netUp: sumY > 0,
      });
    });
    return out;
  });

  // Legitimately downward-facing surfaces: a cantilever roof soffit is seen
  // from below, and the tree canopies deliberately carry down-tilted skirt
  // cards. Exempt by name rather than by weakening the test.
  const EXEMPT = /^(stand-steel|pit-kit|trees-near-)/;
  // >90%, not >60%: a closed solid (a butte, a building) legitimately has more
  // down-facing flat area than up-facing, because its base cap is wider than
  // its top. The failure this catches is a one-sided strip with NO up-facing
  // area at all, which is what every real instance of the bug has looked like.
  const offenders = rows.filter((r) =>
    r.flatDownPct !== null && r.flatDownPct > 90 &&
    r.flatShare > 0.25 && !EXEMPT.test(r.name));
  console.log(`${id.padEnd(9)} ${rows.length} single-sided meshes, ${offenders.length} facing DOWN`);
  for (const o of offenders) {
    console.log(`   !! ${o.name}  tris=${o.tris}  ${o.flatDownPct}% of flat area faces down`);
    bad++;
  }
}
console.log(bad ? `\n${bad} suspect mesh(es) — flat geometry wound face-down draws as nothing from above.`
                : '\nAll flat single-sided surfaces face up.');
await browser.close();
process.exit(bad ? 1 : 0);
