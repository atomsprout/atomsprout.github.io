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
