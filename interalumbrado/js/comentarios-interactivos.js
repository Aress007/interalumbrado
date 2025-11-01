/* comentarios-interactivos.js
   - Guarda comentarios en localStorage
   - Muestra comentarios en la página (más recientes arriba)
   - Envía formulario a Formspree (siempre guarda local primero)
   - Evita inyección HTML con escapeHtml
   - Resetea formulario al envío exitoso
*/

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('comentariosForm');
  const lista = document.getElementById('comentariosGuardados');

  if (!form || !lista) return;

  // cargar comentarios existentes
  let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

  function escapeHtml(s) {
    if (!s) return '';
    return s.replace(/[&<>"']/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[m]; });
  }

  function render() {
    lista.innerHTML = '';
    if (comentarios.length === 0) {
      lista.innerHTML = '<p>No hay comentarios aún. Sé el primero en opinar.</p>';
      return;
    }
    // mostramos más recientes primero
    comentarios.slice().reverse().forEach(c => {
      const div = document.createElement('div');
      div.className = 'comentario';
      // fecha legible
      const fecha = new Date(c.fecha).toLocaleString();
      div.innerHTML = `<strong>${escapeHtml(c.nombre)}</strong> — <span aria-hidden="true">${c.calificacion}⭐</span>
                       <small class="fecha-comentario">${fecha}</small>
                       <p>${escapeHtml(c.comentario)}</p>`;
      lista.appendChild(div);
    });
  }

  render();

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = form.nombre.value.trim();
    const correo = form.correo ? form.correo.value.trim() : '';
    const comentario = form.comentario.value.trim();
    const calificacion = form.calificacion ? form.calificacion.value : '5';

    if (!nombre || !comentario) {
      alert('Por favor completa nombre y comentario.');
      // foco en el primer campo incompleto
      if (!nombre) form.nombre.focus(); else form.comentario.focus();
      return;
    }

    // Guardar localmente primero
    const nuevo = { nombre, correo, comentario, calificacion, fecha: new Date().toISOString() };
    comentarios.push(nuevo);
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
    render();

    // Enviar a Formspree (no bloquea guardado local)
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    }).then(res => {
      if (res.ok) {
        alert('Comentario enviado y guardado. Gracias.');
        form.reset(); // limpia el formulario
      } else {
        alert('El comentario fue guardado localmente, pero hubo un problema al enviar al correo.');
      }
    }).catch(err => {
      console.error('Error envío Formspree:', err);
      alert('Error de conexión. Comentario guardado localmente.');
    });
  });
});
