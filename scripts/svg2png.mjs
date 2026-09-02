// Rasterise SVG files with the sandbox's Chromium so layout plots can be read
// back as images.   node scripts/svg2png.mjs a.svg [b.svg ...]
import { chromium } from 'playwright-core';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const CHROME = process.env.CHROME_EXE ||
  execSync('find /opt/pw-browsers -maxdepth 3 -name chrome -type f | head -1').toString().trim();
const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 900, height: 900 } });
for (const f of process.argv.slice(2)) {
  const s = readFileSync(f, 'utf8');
  const m = s.match(/width="(\d+)" height="(\d+)"/);
  await page.setViewportSize({ width: +m[1], height: +m[2] });
  await page.setContent(`<body style="margin:0">${s}</body>`);
  await page.screenshot({ path: f.replace(/\.svg$/, '.png') });
}
await browser.close();
