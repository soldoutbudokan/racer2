// Measure a before/after screenshot pair instead of squinting at it.
//
//   node scripts/pngdiff.mjs before.png after.png [diff-out.png]
//   node scripts/pngdiff.mjs before.png after.png --box x0,y0,x1,y1 [--box ...]
//
// Every run of this routine compares shooter output by eye, and that has been
// fooled more than once — the scenery seed is unpinned, so trees and billboards
// move between two runs of the SAME code (ROUTINE.md, 2026-08-03), and a real
// change buried in a dark part of the frame can be invisible at a glance and
// still measure 20 % (see the car-shadow note, 2026-08-05). This says how much
// moved and WHERE, so "no visual change" and "confined to the thing I edited"
// become claims with numbers behind them.
//
// Reports:
//   changed / pct   pixels differing by more than 6 (summed over RGB)
//   bbox            the region those pixels fall in — the useful part: a
//                   geometry change should be boxed around the geometry
//   meanDelta       average difference over the whole frame
//   maxDelta        the single worst pixel
//   --box           mean RGB + luma of a region in BOTH images, for measuring
//                   something too subtle to see (a shadow on dark asphalt)
//
// The optional third argument writes an 8x-amplified diff image, which is
// usually the fastest way to see what actually moved.
//
// PNG decoding happens in a headless Chromium canvas — no image library, and
// the routine already depends on playwright-core.
import { chromium } from 'playwright-core';
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

function findChrome() {
  if (process.env.CHROME_EXE && existsSync(process.env.CHROME_EXE)) return process.env.CHROME_EXE;
  try {
    const out = execSync(
      'find /opt/pw-browsers ~/.cache/puppeteer/chrome /root/.cache/puppeteer/chrome'
      + ' -maxdepth 3 -name chrome -type f 2>/dev/null | head -1',
      { shell: '/bin/bash' }).toString().trim();
    if (out && existsSync(out)) return out;
  } catch { /* fall through */ }
  const mac = process.env.HOME + '/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
  if (existsSync(mac)) return mac;
  throw new Error('No Chrome binary found — set CHROME_EXE');
}

const argv = process.argv.slice(2);
const boxes = [];
const positional = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--box') boxes.push(argv[++i].split(',').map(Number));
  else positional.push(argv[i]);
}
const [before, after, diffOut] = positional;
if (!before || !after) {
  console.error('usage: pngdiff.mjs before.png after.png [diff-out.png] [--box x0,y0,x1,y1]');
  process.exit(2);
}

const browser = await chromium.launch({
  executablePath: findChrome(), headless: true, args: ['--no-sandbox'],
});
const page = await browser.newPage();
const enc = (p) => 'data:image/png;base64,' + readFileSync(p).toString('base64');

const res = await page.evaluate(async ([da, db, bs, wantImage]) => {
  const load = (src) => new Promise((r, j) => {
    const i = new Image();
    i.onload = () => r(i);
    i.onerror = () => j(new Error('decode failed'));
    i.src = src;
  });
  const [ia, ib] = await Promise.all([load(da), load(db)]);
  if (ia.width !== ib.width || ia.height !== ib.height) {
    return { error: `size mismatch ${ia.width}x${ia.height} vs ${ib.width}x${ib.height}` };
  }
  const cv = document.createElement('canvas');
  cv.width = ia.width; cv.height = ia.height;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  cx.drawImage(ia, 0, 0);
  const pa = cx.getImageData(0, 0, cv.width, cv.height).data;
  cx.clearRect(0, 0, cv.width, cv.height);
  cx.drawImage(ib, 0, 0);
  const pb = cx.getImageData(0, 0, cv.width, cv.height).data;

  let changed = 0, sum = 0, maxd = 0;
  let minX = Infinity, minY = Infinity, maxX = -1, maxY = -1;
  const out = wantImage ? cx.createImageData(cv.width, cv.height) : null;
  for (let i = 0; i < pa.length; i += 4) {
    const d = Math.abs(pa[i] - pb[i])
            + Math.abs(pa[i + 1] - pb[i + 1])
            + Math.abs(pa[i + 2] - pb[i + 2]);
    sum += d;
    if (d > maxd) maxd = d;
    if (d > 6) {
      changed++;
      const p = i / 4, x = p % cv.width, y = (p - x) / cv.width;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
    if (out) {
      const v = Math.min(255, d * 8);
      out.data[i] = out.data[i + 1] = out.data[i + 2] = v;
      out.data[i + 3] = 255;
    }
  }
  let url = null;
  if (out) { cx.putImageData(out, 0, 0); url = cv.toDataURL('image/png'); }

  const region = (p, [x0, y0, x1, y1]) => {
    let r = 0, g = 0, b = 0, n = 0;
    for (let y = Math.max(0, y0); y <= Math.min(cv.height - 1, y1); y++) {
      for (let x = Math.max(0, x0); x <= Math.min(cv.width - 1, x1); x++) {
        const i = (y * cv.width + x) * 4;
        r += p[i]; g += p[i + 1]; b += p[i + 2]; n++;
      }
    }
    return { r: +(r / n).toFixed(2), g: +(g / n).toFixed(2), b: +(b / n).toFixed(2),
             lum: +((0.2126 * r + 0.7152 * g + 0.0722 * b) / n).toFixed(2) };
  };

  return {
    url,
    size: `${cv.width}x${cv.height}`,
    changed,
    pct: +(100 * changed / (cv.width * cv.height)).toFixed(3),
    meanDelta: +(sum / (pa.length / 4)).toFixed(3),
    maxDelta: maxd,
    bbox: maxX < 0 ? null : { minX, minY, maxX, maxY },
    boxes: bs.map((b) => ({ box: b, before: region(pa, b), after: region(pb, b) })),
  };
}, [enc(before), enc(after), boxes, !!diffOut]);

await browser.close();
if (res.error) { console.error(res.error); process.exit(1); }
if (diffOut) writeFileSync(diffOut, Buffer.from(res.url.split(',')[1], 'base64'));
delete res.url;
console.log(JSON.stringify(res, null, 1));
