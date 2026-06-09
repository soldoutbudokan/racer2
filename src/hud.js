/**
 * SVG-driven HUD: speedometer arc, gear, lap timer, plus a top-down minimap
 * canvas that shows the track outline and every car's position.
 */
export function createHud(maxSpeed = 320) {
  const arc = document.getElementById('rpm-arc');
  const speedNum = document.getElementById('speed-num');
  const gearNum = document.getElementById('gear-num');
  const lapCurrent = document.getElementById('lap-current');
  const lapTotal = document.getElementById('lap-total');
  const lapTime = document.getElementById('lap-time');
  const bestTime = document.getElementById('best-time');
  const posBlock = document.getElementById('hud-position-block');
  const posCurrent = document.getElementById('pos-current');
  const posTotal = document.getElementById('pos-total');
  const raceBanner = document.getElementById('race-banner');
  const wrongWay = document.getElementById('wrong-way');
  let bannerTimer = null;

  // Build tick marks once
  const ticks = document.getElementById('ticks');
  const cx = 110, cy = 110, r = 96;
  const startA = Math.PI * 0.75;
  const endA = Math.PI * 0.25 + Math.PI * 2;
  for (let i = 0; i <= 16; i++) {
    const t = i / 16;
    const a = startA + (endA - startA) * t;
    const x1 = cx + Math.cos(a) * (r - 2);
    const y1 = cy + Math.sin(a) * (r - 2);
    const x2 = cx + Math.cos(a) * (r - (i % 4 === 0 ? 16 : 9));
    const y2 = cy + Math.sin(a) * (r - (i % 4 === 0 ? 16 : 9));
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1); line.setAttribute('y1', y1);
    line.setAttribute('x2', x2); line.setAttribute('y2', y2);
    line.setAttribute('stroke', i % 4 === 0 ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)');
    line.setAttribute('stroke-width', i % 4 === 0 ? '2' : '1');
    ticks.appendChild(line);
  }

  // Minimap canvas
  const minimap = document.getElementById('minimap');
  const mctx = minimap.getContext('2d');
  let trackBounds = null;     // { minX, maxX, minZ, maxZ }
  let trackPath = null;        // pre-built Path2D in canvas pixel coords
  let startMarker = null;      // { x, y } in canvas coords

  // Arc shows engine RPM when provided (it has the rev-band gradient);
  // falls back to speed fraction for older callers.
  function setSpeed(speedKmh, gearLabel, rpmFrac) {
    const t = rpmFrac != null
      ? Math.max(0, Math.min(1, rpmFrac))
      : Math.max(0, Math.min(1, speedKmh / maxSpeed));
    const a0 = startA;
    const a1 = startA + (endA - startA) * t;
    const x0 = cx + Math.cos(a0) * r;
    const y0 = cy + Math.sin(a0) * r;
    const x1 = cx + Math.cos(a1) * r;
    const y1 = cy + Math.sin(a1) * r;
    const large = (a1 - a0) > Math.PI ? 1 : 0;
    arc.setAttribute('d', `M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`);
    speedNum.textContent = Math.round(speedKmh);
    gearNum.textContent = gearLabel;
  }

  function setLap(curr, total) {
    lapCurrent.textContent = curr;
    lapTotal.textContent = total;
  }

  function setLapTime(ms) {
    lapTime.textContent = formatMs(ms);
  }
  function setBest(ms) {
    bestTime.textContent = ms == null ? '--:--.---' : formatMs(ms);
  }

  function setPosition(curr, total) {
    posBlock.classList.remove('hidden');
    posCurrent.textContent = curr;
    posTotal.textContent = total;
  }

  function hidePosition() {
    posBlock.classList.add('hidden');
  }

  // Big transient headline (lap changes, FINAL LAP, FINISH).
  function flashBanner(text, ms = 1800) {
    raceBanner.textContent = text;
    raceBanner.classList.remove('hidden');
    if (bannerTimer) clearTimeout(bannerTimer);
    bannerTimer = setTimeout(() => {
      raceBanner.classList.add('hidden');
      bannerTimer = null;
    }, ms);
  }

  function setWrongWay(on) {
    wrongWay.classList.toggle('hidden', !on);
  }

  // Clear any transient overlays (called on start / reset / stop).
  function clearAnnouncements() {
    if (bannerTimer) { clearTimeout(bannerTimer); bannerTimer = null; }
    raceBanner.classList.add('hidden');
    wrongWay.classList.add('hidden');
  }

  function show() {
    document.getElementById('ui').classList.remove('hidden');
  }
  function hide() {
    document.getElementById('ui').classList.add('hidden');
  }

  // ----- Minimap -----

  function buildMinimap(track) {
    const frames = track.frames;
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    for (const f of frames) {
      if (f.pos.x < minX) minX = f.pos.x;
      if (f.pos.x > maxX) maxX = f.pos.x;
      if (f.pos.z < minZ) minZ = f.pos.z;
      if (f.pos.z > maxZ) maxZ = f.pos.z;
    }
    const padding = 18;
    const w = minimap.width;
    const h = minimap.height;
    const trackWidth = maxX - minX;
    const trackHeight = maxZ - minZ;
    const sx = (w - padding * 2) / trackWidth;
    const sz = (h - padding * 2) / trackHeight;
    const scale = Math.min(sx, sz);
    const ox = (w - trackWidth * scale) / 2 - minX * scale;
    const oz = (h - trackHeight * scale) / 2 - minZ * scale;
    trackBounds = { minX, maxX, minZ, maxZ, scale, ox, oz };

    const path = new Path2D();
    for (let i = 0; i < frames.length; i++) {
      const cx = frames[i].pos.x * scale + ox;
      const cy = frames[i].pos.z * scale + oz;
      if (i === 0) path.moveTo(cx, cy);
      else path.lineTo(cx, cy);
    }
    path.closePath();
    trackPath = path;

    // Pre-compute the start position so we can draw a marker there each frame.
    const sf = frames[0];
    startMarker = {
      x: sf.pos.x * scale + ox,
      y: sf.pos.z * scale + oz,
    };
  }

  /**
   * Draw the track and a dot per car. cars: [{ pos, color, isPlayer }]
   */
  function drawMinimap(cars) {
    if (!trackPath) return;
    const w = minimap.width;
    const h = minimap.height;
    mctx.clearRect(0, 0, w, h);

    // Track outline — fat dark stroke for the surface, thin light stroke on top.
    mctx.lineWidth = 12;
    mctx.lineJoin = 'round';
    mctx.lineCap = 'round';
    mctx.strokeStyle = 'rgba(255, 255, 255, 0.10)';
    mctx.stroke(trackPath);
    mctx.lineWidth = 6;
    mctx.strokeStyle = 'rgba(220, 230, 240, 0.85)';
    mctx.stroke(trackPath);

    // Start/finish marker
    if (startMarker) {
      mctx.fillStyle = 'rgba(255, 215, 74, 0.9)';
      mctx.beginPath();
      mctx.arc(startMarker.x, startMarker.y, 4, 0, Math.PI * 2);
      mctx.fill();
      mctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
      mctx.lineWidth = 1;
      mctx.stroke();
    }

    // Cars — players drawn last so they sit on top.
    const sorted = [...cars].sort((a, b) => (a.isPlayer ? 1 : 0) - (b.isPlayer ? 1 : 0));
    for (const c of sorted) {
      const x = c.pos.x * trackBounds.scale + trackBounds.ox;
      const y = c.pos.z * trackBounds.scale + trackBounds.oz;
      const radius = c.isPlayer ? 5 : 4;
      mctx.beginPath();
      mctx.arc(x, y, radius + 2, 0, Math.PI * 2);
      mctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
      mctx.fill();
      mctx.beginPath();
      mctx.arc(x, y, radius, 0, Math.PI * 2);
      mctx.fillStyle = colorString(c.color);
      mctx.fill();
      if (c.isPlayer) {
        mctx.strokeStyle = '#fff';
        mctx.lineWidth = 1.4;
        mctx.stroke();
      }
    }
  }

  return {
    setSpeed, setLap, setLapTime, setBest,
    setPosition, hidePosition,
    flashBanner, setWrongWay, clearAnnouncements,
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

function formatMs(ms) {
  if (ms == null || !isFinite(ms)) return '--:--.---';
  const total = Math.max(0, Math.floor(ms));
  const m = Math.floor(total / 60000);
  const s = Math.floor((total % 60000) / 1000);
  const mss = total % 1000;
  return `${pad(m, 2)}:${pad(s, 2)}.${pad(mss, 3)}`;
}
function pad(n, w) { return n.toString().padStart(w, '0'); }
