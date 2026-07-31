// Probe + shooter for the RACE START: what every car on the grid is actually
// commanded to do through the light sequence, and what the field does for the
// first seconds after the green.
//
// Every other shooter in scripts/ frames a car and hand-drives it, so none of
// them exercise the start gate at all (they set `ctx.mode = null` and step the
// world themselves). This one drives the REAL __tick pump — the real hold, the
// real lights, the real per-driver reaction — with the composer render stubbed
// out between shots, because ~400 SwiftShader passes take minutes and only the
// handful of frames we actually photograph need pixels.
//
// Cameras are anchored to the START LINE, not to a car: the point of these
// shots is the field's stagger relative to the grid, so the frame has to hold
// still while the cars move through it.
//
//   CHROME_EXE=... node scripts/launchshot.mjs [outPrefix]
import { chromium } from 'playwright-core';
import { existsSync } from 'node:fs';

const exe = process.env.CHROME_EXE;
if (!exe || !existsSync(exe)) throw new Error('set CHROME_EXE');
const out = process.argv[2] || '/tmp/launch';

const browser = await chromium.launch({
  executablePath: exe, headless: true,
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--no-sandbox'],
});
const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message));
await page.goto('http://localhost:5173/', { waitUntil: 'load' });
await page.waitForSelector('button.mode[data-mode="quick-race"]', { timeout: 20000 });
await page.click('button.mode[data-mode="quick-race"]');
await page.waitForTimeout(1500);

const seq = await page.evaluate(() => {
  const ctx = window.__ctx;
  ctx.cars.forEach((c, i) => {
    const sp = window.__gridSpawn(ctx.track, i);
    c.car.reset(sp.position, sp.yaw);
  });
  ctx.state.startT = 0;
  ctx.state.started = false;
  ctx.state.lightsLit = -1;
  // Idle the page's own rAF loop — `__tick` does not consult `ctx.mode`, so the
  // pumps below still drive the real game loop, but wall-clock time spent
  // rendering and saving a PNG no longer advances the race. (physics-test can
  // leave the mode set only because its whole run is one synchronous evaluate,
  // which rAF cannot interleave with. A shooter has to stop between shots.)
  ctx.mode = null;
  // Headless has no hands on the keys, so the player would sit parked on pole
  // and the whole field would pile into it a second after the green. Give P1 a
  // flat-out launch instead; the consume* toggles are left alone.
  for (const c of ctx.cars) {
    if (c.isPlayer) {
      c.input.update = () => ({ throttle: 1, brake: 0, steer: 0, handbrake: false });
    }
  }
  const ui = document.getElementById('ui');
  if (ui) ui.style.display = 'none';

  // Grid pose is the frame of reference for every measurement below.
  window.__lp = {
    realRender: ctx.composer.render,
    p0: ctx.cars.map((c) => ({ x: c.car.body.position.x, z: c.car.body.position.z })),
  };
  ctx.composer.render = () => {};
  return +window.__startSequenceS.toFixed(2);
});

async function pump(secs) {
  return page.evaluate((s) => {
    const ctx = window.__ctx;
    const n = Math.round(s * 60);
    for (let i = 0; i < n; i++) window.__tick(1 / 60);
    // Displacement along each car's OWN heading, so a car that reversed off
    // the line reads negative wherever on the map the grid happens to sit.
    const along = (c, i) => {
      const q = c.car.body.quaternion;
      const fx = 2 * (q.x * q.z + q.w * q.y);
      const fz = 1 - 2 * (q.x * q.x + q.y * q.y);
      const len = Math.hypot(fx, fz) || 1;
      const p = c.car.body.position;
      const p0 = window.__lp.p0[i];
      return ((p.x - p0.x) * fx + (p.z - p0.z) * fz) / len;
    };
    return {
      t: +ctx.state.startT.toFixed(2),
      lit: ctx.track.startLights.litCount(),
      cars: ctx.cars.map((c, i) => ({
        who: c.isPlayer ? 'P1' : `AI${i}`,
        react: +(c.reactionS ?? 0).toFixed(3),
        gear: c.car.telemetry.gearLabel,
        fwd: +along(c, i).toFixed(2),
        kmh: +c.car.telemetry.speedKmh.toFixed(1),
      })),
    };
  }, secs);
}

// [label, metres behind the line, height, lateral, fov, metres to look ahead]
// Lateral is along `frame.left`, which is the GRANDSTAND side here — positive
// lateral puts the camera in the pit lane, where the pit wall and the sponsor
// boards on top of it block the grid completely.
const VIEWS = [
  ['grid', 26, 5.0, 0, 45, 4],      // down the grid from behind the field
  // Low, on the racing surface behind the last row — the stagger reads as a
  // silhouette. Deliberately NOT a trackside camera: anywhere far enough to the
  // side to see the whole grid is either in the pit lane (blocked by the pit
  // wall and its sponsor boards) or inside the grandstand deck.
  ['low', 32, 0.9, 0, 40, 4],
  ['air', 30, 22.0, 10, 50, 6],     // the whole pack at once
];

async function shoot(tag) {
  for (const [label, back, h, latr, fov, ahead] of VIEWS) {
    await page.evaluate(({ back, h, latr, fov, ahead }) => {
      const ctx = window.__ctx;
      const f = ctx.track.frames[0];               // the start line itself
      const cam = ctx.camera;
      cam.aspect = window.innerWidth / window.innerHeight;
      cam.fov = fov;
      cam.updateProjectionMatrix();
      cam.position.set(
        f.pos.x - f.tan.x * back + f.left.x * latr,
        f.pos.y + h,
        f.pos.z - f.tan.z * back + f.left.z * latr,
      );
      cam.lookAt(
        f.pos.x + f.tan.x * ahead, f.pos.y + 0.6, f.pos.z + f.tan.z * ahead);
      window.__lp.realRender.call(ctx.composer);   // the one frame we want
    }, { back, h, latr, fov, ahead });
    await page.waitForTimeout(120);
    await page.screenshot({ path: `${out}-${tag}-${label}.png` });
  }
}

// Absolute seconds from mode start, so the shot times don't drift if the light
// sequence is ever retimed.
const marks = [
  ['grid', seq - 0.05],    // all five columns lit, still held
  ['green+0.4', seq + 0.4], // quick reactions away, slow ones still sitting
  ['green+1.0', seq + 1.0],
  ['green+2.0', seq + 2.0],
];
console.log(`start sequence ${seq}s`);
let elapsed = 0;
for (const [tag, at] of marks) {
  const s = await pump(Math.max(0, at - elapsed));
  elapsed = at;
  await shoot(tag);
  console.log(`\n${tag}  (t=${s.t}s, ${s.lit}/5 lit)`);
  for (const c of s.cars) {
    console.log(`   ${c.who}  react ${String(c.react).padStart(5)}s  ` +
      `gear ${String(c.gear).padEnd(2)}  fwd ${String(c.fwd).padStart(7)} m  ` +
      `${String(c.kmh).padStart(6)} km/h`);
  }
}

console.log('\nerrors:', errors.length ? errors.slice(0, 6) : 'none');
await browser.close();
