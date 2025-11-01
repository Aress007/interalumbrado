/* menu-activo.js
   Marca el enlace del menú como "active" según la URL actual.
   - Soporta index.html o "/" y quita querystrings para comparación robusta.
   - Protege si no hay .menu (páginas sin menú).
*/

document.addEventListener("DOMContentLoaded", () => {
  const enlaces = document.querySelectorAll(".menu a");
  if (!enlaces || enlaces.length === 0) return;

  // obtenemos la parte final de la ruta sin querystring
  const path = window.location.pathname;
  const page = path.split("/").pop().split("?")[0] || 'index.html';

  enlaces.forEach(link => {
    const hrefRaw = link.getAttribute("href") || '';
    const href = hrefRaw.split('?')[0];

    // dos comparaciones: exacta o coincidencia parcial (por ejemplo index.html vs '')
    if (href === page || (href === 'index.html' && (page === '' || page === '/'))) {
      link.classList.add("active");
    } else {
      // también soporta rutas relativas por si sueles usar "/" en algunas páginas
      const hrefName = href.split('/').pop();
      if (hrefName && hrefName === page) link.classList.add('active');
    }
  });
});
