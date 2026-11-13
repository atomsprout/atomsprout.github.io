// Deliberately manual: screenshots stay in place while the visitor reads.
const carousel = document.querySelector('.carousel');
if (carousel) {
  const slides = [...carousel.querySelectorAll('.slide')];
  const dots = carousel.querySelector('.carousel-dots');
  dots.setAttribute('role', 'group');
  let current = 0;
  const showSlide = index => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === current);
      slide.setAttribute('aria-hidden', String(i !== current));
    });
    [...dots.children].forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
      dot.setAttribute('aria-pressed', String(i === current));
    });
  };
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `${carousel.dataset.slideLabel} ${i + 1}`);
    dot.addEventListener('click', () => showSlide(i));
    dots.append(dot);
  });
  carousel.querySelector('[data-previous]').addEventListener('click', () => showSlide(current - 1));
  carousel.querySelector('[data-next]').addEventListener('click', () => showSlide(current + 1));
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showSlide(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  showSlide(0);
}
