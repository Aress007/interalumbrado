/* galeria-carousel.js
   Carrusel con:
   - navegación por flechas y dots
   - auto deslizamiento con pausa al hover
   - reinicio limpio del intervalo al interactuar
   - protección si no existe carrusel en la página
*/

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.carousel-track');
  if (!track) return; // nothing to do on pages without carousel

  const slides = Array.from(track.children);
  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');
  const dotsContainer = document.getElementById('carousel-dots');

  if (!slides.length || !dotsContainer) return;

  let currentIndex = 0;
  let autoSlide = null;
  const intervalMs = 4000;

  // Crear puntos (dots)
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.setAttribute('role', 'button');
    dot.setAttribute('aria-label', `Ir al slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  // Mover al slide indicado
  function goToSlide(index) {
    // reiniciar intervalo al interactuar para que no se acumulen
    stopAutoSlide();
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${slideWidth * index}px)`;
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
    currentIndex = index;
    // reiniciamos el auto slide
    startAutoSlide();
  }

  // Botones de navegación
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      goToSlide(currentIndex);
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      goToSlide(currentIndex);
    });
  }

  // Auto deslizamiento
  function startAutoSlide() {
    stopAutoSlide();
    autoSlide = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      // use goToSlide to keep dots in sync and reset timer
      const slideWidth = slides[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[currentIndex]) dots[currentIndex].classList.add('active');
    }, intervalMs);
  }

  function stopAutoSlide() {
    if (autoSlide) {
      clearInterval(autoSlide);
      autoSlide = null;
    }
  }

  // Pausar al pasar el cursor (mejor experiencia)
  track.addEventListener('mouseenter', stopAutoSlide);
  track.addEventListener('mouseleave', startAutoSlide);

  // Soportar redimensionado (recalcula transform)
  window.addEventListener('resize', () => {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
  });

  // Iniciar
  startAutoSlide();

  // Exponer control si otro módulo quiere detener/reiniciar
  window.carouselControls = {
    start: startAutoSlide,
    stop: stopAutoSlide,
    goTo: goToSlide
  };
});
