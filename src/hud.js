/**
 * SVG-driven HUD: speedometer arc, gear, lap timer.
 * Lap timing is driven from the game loop based on a parametric track position.
 */
export function createHud(maxSpeed = 320) {
  const arc = document.getElementById('rpm-arc');
  const speedNum = document.getElementById('speed-num');
  const gearNum = document.getElementById('gear-num');
  const lapCurrent = document.getElementById('lap-current');
  const lapTotal = document.getElementById('lap-total');
  const lapTime = document.getElementById('lap-time');
  const bestTime = document.getElementById('best-time');

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

  function setSpeed(speedKmh, gearLabel) {
    const t = Math.max(0, Math.min(1, speedKmh / maxSpeed));
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

  function show() {
    document.getElementById('ui').classList.remove('hidden');
  }

  return { setSpeed, setLap, setLapTime, setBest, show };
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
