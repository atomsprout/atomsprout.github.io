import {edges, frame} from './geometry.js';

const svg = document.querySelector('.math-wireframe');
const button = document.querySelector('.rotation-toggle');
if (svg && button) {
  const lines = [...svg.querySelectorAll('[data-edge]')];
  const dots = [...svg.querySelectorAll('[data-vertex]')];
  const rings = [...svg.querySelectorAll('.wire-orbits path')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = false;
  let visible = true;
  let phase = 0;
  let previous = 0;
  let painted = 0;
  let pending = 0;
  const shouldRun = () => !paused && !reduced.matches && visible && !document.hidden;

  function paint() {
    const data = frame(phase);
    lines.forEach((line, i) => {
      const [a, b] = edges[i].map(index => data.points[index]);
      line.setAttribute('x1', a[0].toFixed(2));
      line.setAttribute('y1', a[1].toFixed(2));
      line.setAttribute('x2', b[0].toFixed(2));
      line.setAttribute('y2', b[1].toFixed(2));
      const depth = (a[2] + b[2] + 3.5) / 7;
      line.setAttribute('opacity', (.24 + depth * .7).toFixed(2));
      line.setAttribute('stroke-width', (.8 + depth * .65).toFixed(2));
    });
    dots.forEach((dot, i) => {
      const p = data.points[i];
      dot.setAttribute('cx', p[0].toFixed(2));
      dot.setAttribute('cy', p[1].toFixed(2));
      dot.setAttribute('opacity', (.3 + (p[2] + 1.75) / 3.5 * .7).toFixed(2));
    });
    rings.forEach((ring, i) => ring.setAttribute('d', data.rings[i]));
  }
  function tick(time) {
    pending = 0;
    if (!shouldRun()) return;
    // One full turn takes 90 seconds. Cap elapsed time to avoid jumps after a pause.
    if (previous) phase += Math.min((time - previous) / 1000, .06) * Math.PI * 2 / 90;
    previous = time;
    if (time - painted >= 40) { paint(); painted = time; }
    pending = requestAnimationFrame(tick);
  }
  function sync() {
    button.hidden = reduced.matches;
    button.setAttribute('aria-label', paused ? 'Resume rotation' : 'Pause rotation');
    button.textContent = paused ? '▶' : 'Ⅱ';
    if (!shouldRun()) {
      cancelAnimationFrame(pending);
      pending = 0;
      previous = 0;
    } else if (!pending) {
      previous = 0;
      pending = requestAnimationFrame(tick);
    }
  }
  button.addEventListener('click', () => { paused = !paused; sync(); });
  button.hidden = false;
  reduced.addEventListener('change', sync);
  document.addEventListener('visibilitychange', sync);
  if ('IntersectionObserver' in window) new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  }).observe(svg);
  paint();
  sync();
}
