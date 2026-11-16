// Hero sequence: the code appears line by line, the widget it describes is
// assembled beside it, then the same widget lands on four platforms.
// Without this script every part is already visible.
(() => {
  const root = document.querySelector('[data-flow]');
  if (root) {
    const parts = [...document.querySelectorAll('[data-at]')];
    const lines = parts.filter(node => node.classList.contains('ln'));
    const last = Math.max(...parts.map(node => Number(node.dataset.at)));
    const toggle = document.querySelector('[data-flow-toggle]');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    const date = document.querySelector('[data-flow-date]');
    if (date) date.textContent = new Date().toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'});

    let step = 0;
    let timer = 0;
    let paused = false;
    let visible = false;

    const show = value => {
      step = value;
      for (const node of parts) node.classList.toggle('on', Number(node.dataset.at) <= step);
      for (const line of lines) line.classList.toggle('now', Number(line.dataset.at) === step && step < last);
    };
    const tick = () => {
      clearTimeout(timer);
      if (paused || !visible || still.matches) return;
      if (step >= last) {
        // Hold the finished picture, then start again.
        timer = setTimeout(() => { show(0); timer = setTimeout(tick, 700); }, 6000);
        return;
      }
      show(step + 1);
      timer = setTimeout(tick, step > 10 ? 380 : 520);
    };
    const label = () => {
      if (!toggle) return;
      toggle.textContent = paused ? 'Play' : 'Pause';
      toggle.setAttribute('aria-label', paused ? 'Play the animation' : 'Pause the animation');
    };

    document.documentElement.classList.add('flow-live');
    if (still.matches) {
      show(last);
      if (toggle) toggle.hidden = true;
    } else {
      show(0);
      label();
      let observed = false;
      new IntersectionObserver(entries => {
        observed = true;
        visible = entries.some(entry => entry.isIntersecting);
        if (visible) tick(); else clearTimeout(timer);
      }, {threshold: 0.25}).observe(root);
      // If the observer never reports (a background tab, an old browser), play anyway.
      setTimeout(() => { if (!observed) { visible = true; tick(); } }, 1500);
      toggle?.addEventListener('click', () => {
        paused = !paused;
        label();
        if (paused) { clearTimeout(timer); show(last); } else { show(0); tick(); }
      });
      still.addEventListener('change', () => { if (still.matches) { clearTimeout(timer); show(last); if (toggle) toggle.hidden = true; } });
    }
  }

  // Platform gallery: tabs over panels that are all visible without script.
  const gallery = document.querySelector('[data-pf]');
  if (gallery) {
    const tabs = [...gallery.querySelectorAll('[role=tab]')];
    const select = (tab, focus) => {
      for (const other of tabs) {
        const on = other === tab;
        other.setAttribute('aria-selected', String(on));
        other.tabIndex = on ? 0 : -1;
        document.getElementById(other.getAttribute('aria-controls')).hidden = !on;
      }
      if (focus) tab.focus();
    };
    gallery.querySelector('.pf-tabs').hidden = false;
    gallery.classList.add('pf-ready');
    for (const tab of tabs) {
      tab.addEventListener('click', () => select(tab, false));
      tab.addEventListener('keydown', event => {
        const move = {ArrowRight: 1, ArrowLeft: -1}[event.key];
        if (!move) return;
        event.preventDefault();
        select(tabs[(tabs.indexOf(tab) + move + tabs.length) % tabs.length], true);
      });
    }
    select(tabs[0], false);
    // Fetch the other panels' screenshots once the page has settled, so switching tabs is instant.
    const warm = () => { for (const image of gallery.querySelectorAll('img[loading=lazy]')) image.loading = 'eager'; };
    if (document.readyState === 'complete') setTimeout(warm, 1200); else window.addEventListener('load', () => setTimeout(warm, 1200), {once: true});
  }
})();
