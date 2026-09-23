/**
 * Race HUD: segmented tachometer with speed and gear, lap/time bar, pace
 * readout, start lights, race order, and a top-down minimap canvas that shows
 * the circuit and every car's position and heading.
 *
 * Everything that updates per frame writes only when the value it shows has
 * changed, so a 60 fps race does not rewrite the DOM 60 times a second.
 */
const SVG_NS = 'http://www.w3.org/2000/svg';

export function createHud(maxSpeed = 320, engine = null) {
  const speedo = document.getElementById('speedo');
  const speedNum = document.getElementById('speed-num');
  const gearNum = document.getElementById('gear-num');
  const lapCurrent = document.getElementById('lap-current');
  const lapTotal = document.getElementById('lap-total');
  const lapTime = document.getElementById('lap-time');
  const bestTime = document.getElementById('best-time');
  const bestBlock = document.getElementById('hud-best-block');
  const posBlock = document.getElementById('hud-position-block');
  const posCurrent = document.getElementById('pos-current');
  const posTotal = document.getElementById('pos-total');
  const raceBanner = document.getElementById('race-banner');
  const wrongWay = document.getElementById('wrong-way');
  const pacePill = document.getElementById('pace-pill');
  const paceTarget = document.getElementById('pace-target');
  const paceDelta = document.getElementById('pace-delta');
  const startLights = document.getElementById('start-lights');
  const lamps = [...startLights.querySelectorAll('i')];
  const standings = document.getElementById('standings');
  const hint = document.getElementById('controls-hint');
  const ui = document.getElementById('ui');
  let bannerTimer = null;
  let bestTimer = null;
  let lightsTimer = null;

  // ---- Tachometer ----
  // A 270° sweep of LED segments. Each segment is its own path so the lit
  // count can change without rebuilding geometry, and each is coloured by its
  // place in the rev band: lime through the pull, amber as it nears the
  // change-up point, red past it.
  const cx = 120, cy = 120, rOuter = 106, rInner = 92;
  const startA = Math.PI * 0.75;
  const sweep = Math.PI * 1.5;
  const SEGMENTS = 44;
  const idle = engine?.idleRpm ?? 1000;
  const redline = engine?.redlineRpm ?? 7600;
  const shiftFrac = engine ? (engine.shiftUpRpm - idle) / (redline - idle) : 0.93;
  const segGroup = document.getElementById('rpm-segments');
  const segs = [];
  const polar = (a, r) => `${(cx + Math.cos(a) * r).toFixed(2)} ${(cy + Math.sin(a) * r).toFixed(2)}`;
  for (let i = 0; i < SEGMENTS; i++) {
    const gap = 0.012;
    const a0 = startA + (sweep * i) / SEGMENTS + gap;
    const a1 = startA + (sweep * (i + 1)) / SEGMENTS - gap;
    const p = document.createElementNS(SVG_NS, 'path');
    p.setAttribute('d', `M ${polar(a0, rOuter)} A ${rOuter} ${rOuter} 0 0 1 ${polar(a1, rOuter)}`
      + ` L ${polar(a1, rInner)} A ${rInner} ${rInner} 0 0 0 ${polar(a0, rInner)} Z`);
    const t = (i + 0.5) / SEGMENTS;
    p.setAttribute('class', t >= shiftFrac ? 'seg seg-red' : t >= shiftFrac - 0.2 ? 'seg seg-amber' : 'seg');
    segGroup.appendChild(p);
    segs.push(p);
  }
  // Numerals every 1000 rpm inside the band.
  const ticks = document.getElementById('ticks');
  for (let k = Math.ceil(idle / 1000); k * 1000 <= redline; k++) {
    const t = (k * 1000 - idle) / (redline - idle);
    const a = startA + sweep * t;
    const tick = document.createElementNS(SVG_NS, 'line');
    const [x1, y1] = polar(a, rInner - 3).split(' ');
    const [x2, y2] = polar(a, rInner - 9).split(' ');
    tick.setAttribute('x1', x1); tick.setAttribute('y1', y1);
    tick.setAttribute('x2', x2); tick.setAttribute('y2', y2);
    tick.setAttribute('class', t >= shiftFrac ? 'tick tick-red' : 'tick');
    ticks.appendChild(tick);
    const label = document.createElementNS(SVG_NS, 'text');
    const [lx, ly] = polar(a, rInner - 19).split(' ');
    label.setAttribute('x', lx); label.setAttribute('y', (+ly + 3.5).toFixed(2));
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('class', t >= shiftFrac ? 'tick-label tick-red' : 'tick-label');
    label.textContent = k;
    ticks.appendChild(label);
  }

  let litShown = -1, speedShown = null, gearShown = null, shiftShown = null;
  // The tach shows engine RPM when provided; falls back to speed fraction.
  function setSpeed(speedKmh, gearLabel, rpmFrac) {
    const t = rpmFrac != null
      ? Math.max(0, Math.min(1, rpmFrac))
      : Math.max(0, Math.min(1, speedKmh / maxSpeed));
    const lit = Math.round(t * SEGMENTS);
    if (lit !== litShown) {
      for (let i = 0; i < SEGMENTS; i++) segs[i].classList.toggle('on', i < lit);
      litShown = lit;
    }
    const kmh = Math.round(speedKmh);
    if (kmh !== speedShown) { speedNum.textContent = kmh; speedShown = kmh; }
    if (gearLabel !== gearShown) { gearNum.textContent = gearLabel; gearShown = gearLabel; }
    const shift = t >= shiftFrac - 0.02;
    if (shift !== shiftShown) { speedo.classList.toggle('shift', shift); shiftShown = shift; }
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
    raceBanner.textContent = text;
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

  // Perfect-line pace readout: ideal speed at the player's position plus a
  // colour-coded verdict against their actual speed.
  let paceShown = '';
  function setPace(targetKmh, deltaKmh) {
    pacePill.classList.remove('hidden');
    let cls, text;
    if (deltaKmh > 3) {
      cls = 'pace-over';
      text = `+${Math.round(deltaKmh)} TOO FAST`;
    } else if (deltaKmh < -8) {
      cls = 'pace-under';
      text = `−${Math.round(-deltaKmh)} COULD GO FASTER`;
    } else {
      cls = 'pace-on';
      text = 'ON PACE';
    }
    const target = Math.round(targetKmh);
    const key = `${target}|${text}`;
    if (key === paceShown) return;
    paceShown = key;
    paceTarget.textContent = target;
    paceDelta.textContent = text;
    paceDelta.className = cls;
    pacePill.dataset.state = cls;
  }

  function hidePace() {
    pacePill.classList.add('hidden');
    paceShown = '';
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
  // the circuit stays sharp on high-density screens.
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
    mctx.lineWidth = 11;
    mctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
    mctx.stroke(trackPath);
    mctx.lineWidth = 7;
    mctx.strokeStyle = 'rgba(120, 140, 150, 0.55)';
    mctx.stroke(trackPath);
    mctx.lineWidth = 2.2;
    mctx.strokeStyle = 'rgba(236, 242, 244, 0.92)';
    mctx.stroke(trackPath);

    if (startMarker) {
      const { x, y, nx, ny } = startMarker;
      mctx.lineWidth = 3;
      mctx.lineCap = 'butt';
      mctx.strokeStyle = '#e6ff76';
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
        mctx.fillStyle = 'rgba(230, 255, 118, 0.18)';
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
        mctx.strokeStyle = '#fff';
        mctx.stroke();
      } else {
        mctx.beginPath();
        mctx.arc(x, y, c.isPlayer ? 5.5 : 4.2, 0, Math.PI * 2);
        mctx.fillStyle = fill;
        mctx.fill();
        mctx.lineWidth = c.isPlayer ? 1.6 : 1.2;
        mctx.strokeStyle = c.isPlayer ? '#fff' : 'rgba(5, 10, 14, 0.85)';
        mctx.stroke();
      }
    }
  }

  return {
    setSpeed, setLap, setLapTime, setBest,
    setPosition, hidePosition, setStandings,
    setPace, hidePace,
    flashBanner, setWrongWay, setStartLights, setHint, clearAnnouncements,
    show, hide,
    buildMinimap, drawMinimap,
  };
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
