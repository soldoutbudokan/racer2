// Budgets are in physical pixels, so a 4K display cannot silently multiply
// the GPU workload. Automatic quality starts modestly and steps down only
// after sustained slow frames; a tab switch or shader compilation is ignored.
export const GRAPHICS = {
  performance: { label: 'Performance', pixelRatio: 0.85, pixels: 1280 * 720, shadow: 1024 },
  balanced: { label: 'Balanced', pixelRatio: 1, pixels: 1600 * 900, shadow: 1024 },
  high: { label: 'High', pixelRatio: 1.5, pixels: 1920 * 1080, shadow: 2048 },
};

export function renderPixelRatio(width, height, dpr, preset, scale = 1) {
  const budget = GRAPHICS[preset] || GRAPHICS.balanced;
  return Math.min(dpr, budget.pixelRatio, Math.sqrt(budget.pixels / (width * height))) * scale;
}

export function createGraphicsController(apply, saved = 'auto') {
  let choice, preset, scale, warmup, elapsed, samples;
  function resetSamples() { warmup = 1800; elapsed = 0; samples = 0; }
  function select(value) {
    choice = value === 'auto' || Object.hasOwn(GRAPHICS, value) ? value : 'auto';
    preset = choice === 'auto' ? 'balanced' : choice;
    scale = 1;
    resetSamples();
    apply(preset, scale);
  }
  function sample(ms) {
    if (choice !== 'auto' || !Number.isFinite(ms) || ms <= 0 || ms > 1000) return;
    if (warmup > 0) { warmup -= ms; return; }
    elapsed += ms; samples++;
    if (elapsed < 1800 || samples < 12) return;
    if (elapsed / samples > 23) {
      const previous = `${preset}:${scale}`;
      if (preset === 'balanced') preset = 'performance';
      else scale = Math.max(0.65, scale - 0.1);
      if (`${preset}:${scale}` !== previous) apply(preset, scale);
      resetSamples();
    } else { elapsed = 0; samples = 0; }
  }
  select(saved);
  return { select, sample, resetSamples,
    get choice() { return choice; }, get preset() { return preset; },
    get scale() { return scale; } };
}
