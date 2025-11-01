/* main.js
   - Control menú hamburguesa (accesible)
   - Lightbox modal (abrir/close/prev/next + cierre al hacer clic fuera)
   - Exposición de API lightbox en window.appLightbox
*/

document.addEventListener('DOMContentLoaded', () => {
  /* -------- MENU HAMBURGUESA -------- */
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.querySelector('.menu');

  if (menuToggle && menu) {
    // aria-expanded mejora la accesibilidad
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.addEventListener('click', () => {
      const isActive = menu.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', String(isActive));
      // Para evitar que el foco se pierda en mobile, forzamos foco en el primer enlace cuando se abre
      if (isActive) {
        const firstLink = menu.querySelector('a');
        if (firstLink) firstLink.focus();
      }
    });

    // cerrar menú al seleccionar un enlace (útil en mobile)
    menu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        menu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* -------- LIGHTBOX -------- */
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return; // si no hay lightbox en la página, terminamos aquí

  const lbImage = document.getElementById('lightbox-image');
  const lbCaption = document.getElementById('lightbox-caption');
  const lbClose = document.getElementById('lightbox-close');
  const lbPrev = document.getElementById('lightbox-prev');
  const lbNext = document.getElementById('lightbox-next');

  // tomamos todas las imágenes dentro del carrusel (si hay)
  const galleryImgs = Array.from(document.querySelectorAll('.carousel-track img'));
  let lbIndex = 0;

  function open(index) {
    if (!galleryImgs.length) return;
    lbIndex = (index + galleryImgs.length) % galleryImgs.length;
    const img = galleryImgs[lbIndex];
    lbImage.src = img.dataset.large || img.src; // si en el futuro agregas data-large
    lbImage.alt = img.alt || '';
    lbCaption.textContent = img.alt || '';
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // focus para accesibilidad
    lbClose.focus();
  }

  function close() {
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function prev() {
    open((lbIndex - 1 + galleryImgs.length) % galleryImgs.length);
  }
  function next() {
    open((lbIndex + 1) % galleryImgs.length);
  }

  // conectar botones (comprobando existencia para evitar errores)
  if (lbClose) lbClose.addEventListener('click', close);
  if (lbPrev) lbPrev.addEventListener('click', prev);
  if (lbNext) lbNext.addEventListener('click', next);

  // cerrar haciendo clic fuera del contenido
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  // navegación por teclado
  document.addEventListener('keydown', (e) => {
    if (lightbox.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    }
  });

  // abrir lightbox al hacer click en una imagen del carrusel (delegación si existen)
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.matches && target.matches('.carousel-track img')) {
      const idx = Number(target.dataset.index) || Array.from(document.querySelectorAll('.carousel-track img')).indexOf(target);
      open(idx);
    }
  });

  // Exponer API global para control externo
  window.appLightbox = { open, close, prev, next };
});
