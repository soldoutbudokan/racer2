/**
 * Race HUD in the menu's programme style: paper tags for position, lap and
 * times, a paper strip for the running order, the programme's circuit card
 * for the map, and a paper speed dial with a red needle, the revs as a red
 * band and the gear in a red race-number hub.
 *
 * Everything that updates per frame writes only when the value it shows has
 * changed, so a 60 fps race does not rewrite the DOM 60 times a second.
 */
import { getTerminalSpeed } from './carSpecs.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
// The programme's ink and red (--ink, --spot in style.css).
const INK = '#1b1813';
const SPOT = '#cf3a1d';

// The dial in its 300-unit viewBox. Angles run clockwise from 12 o'clock.
const CX = 150, CY = 150, R = 140, A0 = -130, A1 = 130, BAND_R = R - 56;
function polar(r, a) {
  const t = a * Math.PI / 180;
  return [CX + r * Math.sin(t), CY - r * Math.cos(t)];
}
function arcPath(r, a0, a1) {
  const [x0, y0] = polar(r, a0), [x1, y1] = polar(r, a1);
  return `M${x0.toFixed(2)} ${y0.toFixed(2)}A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}
function svg(tag, attrs, parent) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  parent.appendChild(el);
  return el;
}

export function createHud(maxSpeed = 320, engine = null) {
  const dash = document.getElementById('dash');
  const dial = document.getElementById('dial');
  const lapCurrent = document.getElementById('lap-current');
  const lapTotal = document.getElementById('lap-total');
  const lapTime = document.getElementById('lap-time');
  const bestTime = document.getElementById('best-time');
  const bestBlock = document.getElementById('hud-best-block');
  const posBlock = document.getElementById('hud-position-block');
  const posCurrent = document.getElementById('pos-current');
  const posSuffix = document.getElementById('pos-suffix');
  const posTotal = document.getElementById('pos-total');
  const raceBanner = document.getElementById('race-banner');
  const raceBannerText = document.getElementById('race-banner-text');
  const wrongWay = document.getElementById('wrong-way');
  const startLights = document.getElementById('start-lights');
  const lamps = [...startLights.querySelectorAll('i')];
  const standings = document.getElementById('standings');
  const hint = document.getElementById('controls-hint');
  const ui = document.getElementById('ui');
  let bannerTimer = null;
  let bestTimer = null;
  let lightsTimer = null;

  // ---- Speed dial ----
  // Speed on the needle; the revs as a red band filling inside the numerals,
  // blinking at the change-up; the gear in the hub; the speed again in
  // figures in the window under it; and, with the racing-line aid on, a
  // notch on the rim at the ideal speed for this point of the lap.
  svg('circle', { cx: CX, cy: CY, r: R, class: 'dial-face' }, dial);
  const scale = svg('g', {}, dial);
  svg('path', { d: arcPath(BAND_R, A0, A1), class: 'dial-band-track' }, dial);
  const revs = svg('path', { d: '', class: 'dial-revs' }, dial);
  const pace = svg('g', { id: 'pace-pill', class: 'hidden' }, dial);
  svg('path', { d: `M${CX - 9} ${CY - R + 3}L${CX + 9} ${CY - R + 3}L${CX} ${CY - R + 21}Z` }, pace);
  svg('rect', { x: CX - 38, y: CY + 52, width: 76, height: 28, class: 'dial-window' }, dial);
  const speedNum = svg('text', { id: 'speed-num', x: CX, y: CY + 72, class: 'dial-speed' }, dial);
  svg('text', { x: CX, y: CY + 98, class: 'dial-unit' }, dial).textContent = 'KM/H';
  const needle = svg('path', {
    d: `M${CX - 4} ${CY + 26}L${CX - 1.4} ${CY - 124}L${CX + 1.4} ${CY - 124}L${CX + 4} ${CY + 26}Z`,
    class: 'dial-needle',
  }, dial);
  svg('circle', { cx: CX, cy: CY, r: 27, class: 'dial-hub' }, dial);
  const gearNum = svg('text', { id: 'gear-num', x: CX, y: CY + 1, class: 'dial-gear' }, dial);

  // A speedometer reads to just past the car's own top speed: the formula
  // car's stops at 240, the hypercar's runs to 360. The rev band is the
  // car's too: a formula car idles at 2,500 and shifts at 11,000, a big-block
  // at 800 and 5,800.
  let dialMax = 320, shiftFrac = 0.93;
  const angle = (kmh) => A0 + (A1 - A0) * Math.max(0, Math.min(1, kmh / dialMax));
  function setEngine(engine) {
    const idle = engine?.idleRpm ?? 1000;
    const redline = engine?.redlineRpm ?? 7600;
    shiftFrac = engine ? (engine.shiftUpRpm - idle) / (redline - idle) : 0.93;
    const top = engine?.massKg ? getTerminalSpeed(engine).speed * 3.6 : maxSpeed;
    dialMax = 40 * Math.ceil((top + 15) / 40);
    scale.replaceChildren();
    for (let v = 0; v <= dialMax; v += 10) {
      const major = v % 20 === 0, a = angle(v);
      const [x0, y0] = polar(R - 6, a), [x1, y1] = polar(R - (major ? 20 : 12), a);
      svg('line', { x1: x0, y1: y0, x2: x1, y2: y1, class: major ? 'dial-tick major' : 'dial-tick' }, scale);
      if (v % 40) continue;
      const [lx, ly] = polar(R - 41, a);
      svg('text', { x: lx, y: ly, class: 'dial-label', 'font-size': dialMax > 320 ? 21 : 24 }, scale).textContent = v;
    }
    needleShown = null; revsShown = -1; shiftShown = null; paceShown = '';
  }

  let needleShown = null, revsShown = -1, speedShown = null, gearShown = null, shiftShown = null;
  let paceShown = '';
  setEngine(engine);
  // The band shows engine revs when provided; falls back to speed.
  function setSpeed(speedKmh, gearLabel, rpmFrac) {
    const t = rpmFrac != null
      ? Math.max(0, Math.min(1, rpmFrac))
      : Math.max(0, Math.min(1, speedKmh / maxSpeed));
    const a = angle(speedKmh);
    if (needleShown === null || Math.abs(a - needleShown) > 0.1) {
      needle.setAttribute('transform', `rotate(${a.toFixed(2)} ${CX} ${CY})`);
      needleShown = a;
    }
    const band = Math.round(t * 200);
    if (band !== revsShown) {
      revs.setAttribute('d', band ? arcPath(BAND_R, A0, A0 + (A1 - A0) * band / 200) : '');
      revsShown = band;
    }
    const kmh = Math.round(speedKmh);
    if (kmh !== speedShown) { speedNum.textContent = kmh; speedShown = kmh; }
    if (gearLabel !== gearShown) { gearNum.textContent = gearLabel; gearShown = gearLabel; }
    const shift = t >= shiftFrac - 0.02;
    if (shift !== shiftShown) { dash.classList.toggle('shift', shift); shiftShown = shift; }
  }

  // Racing-line aid: the notch sits at the ideal speed, and turns red once
  // the car is more than 3 km/h over it.
  function setPace(targetKmh, deltaKmh) {
    pace.classList.remove('hidden');
    const a = angle(targetKmh), over = deltaKmh > 3;
    const key = `${a.toFixed(1)}|${over}`;
    if (key === paceShown) return;
    paceShown = key;
    pace.setAttribute('transform', `rotate(${a.toFixed(2)} ${CX} ${CY})`);
    pace.classList.toggle('over', over);
  }
  function hidePace() {
    pace.classList.add('hidden');
    paceShown = '';
  }

  function setLap(curr, total) {
    lapCurrent.textContent = curr;
    lapTotal.textContent = total;
  }

  let lapShown = '';
  function setLapTime(ms) {
    const text = formatMs(ms);
    if (text !== lapShown) { lapTime.textContent = text; lapShown = text; }
  }
  function setBest(ms) {
    bestTime.textContent = ms == null ? '--:--.---' : formatMs(ms);
    if (bestTimer) { clearTimeout(bestTimer); bestTimer = null; }
    bestBlock.classList.toggle('improved', ms != null);
    if (ms != null) bestTimer = setTimeout(() => bestBlock.classList.remove('improved'), 2600);
  }

  let posShown = '';
  function setPosition(curr, total) {
    posBlock.classList.remove('hidden');
    const key = `${curr}/${total}`;
    if (key === posShown) return;
    posCurrent.textContent = curr;
    posSuffix.textContent = ordinal(curr);
    posTotal.textContent = total;
    posShown = key;
  }
  function hidePosition() {
    posBlock.classList.add('hidden');
    posShown = '';
    standings.classList.add('hidden');
    standingsKey = '';
  }

  // Live race order, top-left. Rebuilt only when the order changes.
  let standingsKey = '';
  function setStandings(entries) {
    const key = entries.map((e) => e.name).join('|');
    standings.classList.remove('hidden');
    if (key === standingsKey) return;
    standingsKey = key;
    standings.replaceChildren(...entries.map((e, i) => {
      const li = document.createElement('li');
      if (e.isPlayer) li.className = 'me';
      li.innerHTML = `<b>${i + 1}</b><i style="background:${colorString(e.color)}"></i><span></span>`;
      li.querySelector('span').textContent = e.name;
      return li;
    }));
  }

  // Big transient headline (lap changes, FINAL LAP, FINISH).
  function flashBanner(text, ms = 1800) {
    raceBannerText.textContent = text;
    raceBanner.classList.remove('hidden');
    raceBanner.classList.toggle('go', text === 'GO');
    if (bannerTimer) clearTimeout(bannerTimer);
    bannerTimer = setTimeout(() => {
      raceBanner.classList.add('hidden');
      bannerTimer = null;
    }, ms);
  }

  function setWrongWay(on) {
    wrongWay.classList.toggle('hidden', !on);
  }

  // Mirrors the gantry: `lit` columns red, then all out on the green. The
  // panel lingers for a moment after lights-out so the release reads.
  let litLamps = -1;
  function setStartLights(lit, released = false) {
    if (lightsTimer) { clearTimeout(lightsTimer); lightsTimer = null; }
    if (lit < 0) {
      startLights.classList.add('hidden');
      ui.classList.remove('countdown');
      litLamps = -1;
      return;
    }
    startLights.classList.remove('hidden');
    ui.classList.toggle('countdown', !released);
    if (lit !== litLamps) {
      lamps.forEach((l, i) => l.classList.toggle('on', i < lit));
      litLamps = lit;
    }
    startLights.classList.toggle('out', released);
    if (released) {
      lightsTimer = setTimeout(() => {
        startLights.classList.add('hidden');
        lightsTimer = null;
      }, 900);
    }
  }

  // The key list is for the first seconds of a session; after that it is
  // just clutter over the scenery.
  let hintShown = null;
  function setHint(visible) {
    if (visible === hintShown) return;
    hint.classList.toggle('faded', !visible);
    hintShown = visible;
  }

  // Clear any transient overlays (called on start / reset / stop).
  function clearAnnouncements() {
    if (bannerTimer) { clearTimeout(bannerTimer); bannerTimer = null; }
    raceBanner.classList.add('hidden');
    wrongWay.classList.add('hidden');
    setStartLights(-1);
  }

  function show() {
    ui.classList.remove('hidden');
  }
  function hide() {
    ui.classList.add('hidden');
  }

  // ----- Minimap -----
  // Drawn in a 220-unit logical space on a canvas with twice the pixels, so
  // the circuit stays sharp on high-density screens. It is the menu's
  // programme map: ink on the paper card behind the canvas, red for the line.
  const minimap = document.getElementById('minimap');
  const mctx = minimap.getContext('2d');
  const LOGICAL = 220;
  let trackBounds = null;
  let trackPath = null;
  let startMarker = null;

  function buildMinimap(track) {
    const frames = track.frames;
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for (const f of frames) {
      if (f.pos.x < minX) minX = f.pos.x;
      if (f.pos.x > maxX) maxX = f.pos.x;
      if (f.pos.z < minZ) minZ = f.pos.z;
      if (f.pos.z > maxZ) maxZ = f.pos.z;
    }
    const padding = 24;
    const trackWidth = maxX - minX;
    const trackHeight = maxZ - minZ;
    const scale = Math.min((LOGICAL - padding * 2) / trackWidth, (LOGICAL - padding * 2) / trackHeight);
    const ox = (LOGICAL - trackWidth * scale) / 2 - minX * scale;
    const oz = (LOGICAL - trackHeight * scale) / 2 - minZ * scale + 6;
    trackBounds = { scale, ox, oz };

    const path = new Path2D();
    for (let i = 0; i < frames.length; i++) {
      const x = frames[i].pos.x * scale + ox;
      const y = frames[i].pos.z * scale + oz;
      if (i === 0) path.moveTo(x, y);
      else path.lineTo(x, y);
    }
    path.closePath();
    trackPath = path;

    // Start/finish: a short bar across the track at frame 0.
    const sf = frames[0];
    startMarker = {
      x: sf.pos.x * scale + ox,
      y: sf.pos.z * scale + oz,
      nx: sf.left.x, ny: sf.left.z,
    };
  }

  /**
   * Draw the track and a marker per car. cars: [{ pos, color, isPlayer, heading? }]
   * `heading` is the car's forward direction in the xz plane ({ x, z }).
   */
  function drawMinimap(cars) {
    if (!trackPath) return;
    const k = minimap.width / LOGICAL;
    mctx.setTransform(1, 0, 0, 1, 0, 0);
    mctx.clearRect(0, 0, minimap.width, minimap.height);
    mctx.setTransform(k, 0, 0, k, 0, 0);

    mctx.lineJoin = 'round';
    mctx.lineCap = 'round';
    mctx.lineWidth = 9;
    mctx.strokeStyle = 'rgba(27, 24, 19, 0.14)';
    mctx.stroke(trackPath);
    mctx.lineWidth = 2.4;
    mctx.strokeStyle = INK;
    mctx.stroke(trackPath);

    if (startMarker) {
      const { x, y, nx, ny } = startMarker;
      mctx.lineWidth = 3;
      mctx.lineCap = 'butt';
      mctx.strokeStyle = SPOT;
      mctx.beginPath();
      mctx.moveTo(x - nx * 7, y - ny * 7);
      mctx.lineTo(x + nx * 7, y + ny * 7);
      mctx.stroke();
      mctx.lineCap = 'round';
    }

    // Cars — players drawn last so they sit on top.
    const sorted = [...cars].sort((a, b) => (a.isPlayer ? 1 : 0) - (b.isPlayer ? 1 : 0));
    for (const c of sorted) {
      const x = c.pos.x * trackBounds.scale + trackBounds.ox;
      const y = c.pos.z * trackBounds.scale + trackBounds.oz;
      const fill = colorString(c.color);
      if (c.isPlayer && c.heading) {
        // An arrowhead along the car's heading, on a soft halo.
        const hx = c.heading.x, hy = c.heading.z;
        mctx.beginPath();
        mctx.arc(x, y, 10, 0, Math.PI * 2);
        mctx.fillStyle = 'rgba(207, 58, 29, 0.2)';
        mctx.fill();
        mctx.beginPath();
        mctx.moveTo(x + hx * 8, y + hy * 8);
        mctx.lineTo(x - hx * 5 + hy * 5.5, y - hy * 5 - hx * 5.5);
        mctx.lineTo(x - hx * 2.5, y - hy * 2.5);
        mctx.lineTo(x - hx * 5 - hy * 5.5, y - hy * 5 + hx * 5.5);
        mctx.closePath();
        mctx.fillStyle = fill;
        mctx.fill();
        mctx.lineWidth = 1.6;
        mctx.strokeStyle = INK;
        mctx.stroke();
      } else {
        mctx.beginPath();
        mctx.arc(x, y, c.isPlayer ? 5.5 : 4.2, 0, Math.PI * 2);
        mctx.fillStyle = fill;
        mctx.fill();
        mctx.lineWidth = c.isPlayer ? 1.6 : 1.2;
        mctx.strokeStyle = INK;
        mctx.stroke();
      }
    }
  }

  return {
    setEngine,
    setSpeed, setLap, setLapTime, setBest,
    setPosition, hidePosition, setStandings,
    setPace, hidePace,
    flashBanner, setWrongWay, setStartLights, setHint, clearAnnouncements,
    show, hide,
    buildMinimap, drawMinimap,
  };
}

// 1ST, 2ND, 3RD, 4TH.
function ordinal(n) {
  if (n % 100 >= 11 && n % 100 <= 13) return 'TH';
  return ['TH', 'ST', 'ND', 'RD'][n % 10] ?? 'TH';
}

function colorString(hex) {
  const r = (hex >> 16) & 0xff;
  const g = (hex >> 8) & 0xff;
  const b = hex & 0xff;
  return `rgb(${r}, ${g}, ${b})`;
}

export function formatMs(ms) {
  if (ms == null || !isFinite(ms)) return '--:--.---';
  const total = Math.max(0, Math.floor(ms));
  const m = Math.floor(total / 60000);
  const s = Math.floor((total % 60000) / 1000);
  const mss = total % 1000;
  return `${pad(m, 2)}:${pad(s, 2)}.${pad(mss, 3)}`;
}
function pad(n, w) { return n.toString().padStart(w, '0'); }
