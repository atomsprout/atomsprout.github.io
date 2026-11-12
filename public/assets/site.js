const root = document.documentElement;
const toggle = document.querySelector('.theme-toggle');
const media = matchMedia('(prefers-color-scheme: dark)');
const dark = () => root.dataset.theme ? root.dataset.theme === 'dark' : media.matches;
function updateThemeLabel() {
  toggle.setAttribute('aria-label', `Switch to ${dark() ? 'light' : 'dark'} mode`);
  document.querySelector('meta[name="theme-color"]').content = dark() ? '#10141e' : '#f8f7f3';
}
toggle.addEventListener('click', () => {
  root.dataset.theme = dark() ? 'light' : 'dark';
  try { localStorage.setItem('as-theme', root.dataset.theme); } catch {}
  updateThemeLabel();
});
media.addEventListener('change', updateThemeLabel);
updateThemeLabel();
const cards = [...document.querySelectorAll('[data-category]')];
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b => {
      b.classList.toggle('active', b === button);
      b.setAttribute('aria-pressed', String(b === button));
    });
    cards.forEach(card => {
      card.hidden = filter !== 'All' && (filter === 'Productivity'
        ? ['Developer tools', 'Games'].includes(card.dataset.category)
        : card.dataset.category !== filter);
    });
    const count = cards.filter(card => !card.hidden).length;
    document.querySelector('.result-count').textContent = `${count} ${count === 1 ? 'product' : 'products'}`;
  });
});
