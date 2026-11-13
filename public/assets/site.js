const root = document.documentElement;
const toggle = document.querySelector('.theme-toggle');
const media = matchMedia('(prefers-color-scheme: dark)');
const dark = () => root.dataset.theme ? root.dataset.theme === 'dark' : media.matches;
function updateThemeLabel() {
  toggle?.setAttribute('aria-label', `Switch to ${dark() ? 'light' : 'dark'} mode`);
  const color = document.querySelector('meta[name="theme-color"]');
  if (color) color.content = dark() ? '#10141e' : '#f8f7f3';
}
toggle?.addEventListener('click', () => {
  root.dataset.theme = dark() ? 'light' : 'dark';
  try { localStorage.setItem('as-theme', root.dataset.theme); } catch {}
  updateThemeLabel();
});
media.addEventListener('change', updateThemeLabel);
updateThemeLabel();

document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const status = button.closest('.install-block').querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      status.textContent = 'Install command copied.';
      button.textContent = 'Copied';
    } catch {
      status.textContent = 'Select the command above and copy it to your terminal.';
    }
  });
});

const search = document.querySelector('#product-search');
const platform = document.querySelector('#platform-filter');
if (search && platform) {
  const cards = [...document.querySelectorAll('.product-card')];
  const status = document.querySelector('.search-status');
  const empty = document.querySelector('.empty-results');
  function filter() {
    const query = search.value.trim().toLowerCase();
    let count = 0;
    cards.forEach(card => {
      card.hidden = !card.dataset.search.includes(query) || !card.dataset.platform.includes(platform.value);
      if (!card.hidden) count++;
    });
    status.textContent = `${count} ${count === 1 ? 'app' : 'apps'}`;
    empty.hidden = count > 0;
  }
  search.addEventListener('input', filter);
  platform.addEventListener('change', filter);
  // Restore browser-retained inputs after back navigation as well.
  window.addEventListener('pageshow', filter);
  filter();
}

const preview = document.querySelector('.image-preview');
if (preview && typeof preview.showModal === 'function') {
  let previousFocus;
  const close = () => preview.close();
  document.querySelectorAll('[data-preview]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      previousFocus = link;
      const source = link.querySelector('img');
      preview.querySelector('img').src = link.href;
      preview.querySelector('img').alt = source.alt;
      preview.querySelector('p').textContent = link.closest('figure').querySelector('figcaption').textContent;
      preview.showModal();
    });
  });
  preview.querySelector('.preview-close').addEventListener('click', close);
  preview.addEventListener('click', event => {
    const rect = preview.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
  });
  preview.addEventListener('close', () => previousFocus?.focus());
}
