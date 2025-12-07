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
    return s.replace(/[&<>"']/g, function (m) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": "&#39;" })[m]; });
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

    // Enviar a nuestra API de Google Apps Script
    const API_URL = 'https://script.google.com/macros/s/AKfycbzjLNSm0jF8PQVhMayX-hoZZLrzP3jGrqe-xzqJL1v_CaGCzxtiKZDOWz3kXOUSHd4/exec';

    // Preparar datos para la API
    const datosComentario = {
      nombre: nombre,
      correo: correo || 'no-proporcionado@interalumbrado.com',
      tipo: 'comentario',
      mensaje: `Calificación: ${calificacion} estrellas\n\nComentario: ${comentario}`,
      calificacion: calificacion,
      fecha: new Date().toISOString(),
      pagina: 'index-comentarios'
    };

    // Mostrar indicador de carga
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    // Enviar a la API
    fetch(API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosComentario)
    })
      .then(() => {
        // Generar número de ticket simulado
        const fecha = new Date();
        const ticketNum = 'COM-' + fecha.getFullYear() +
          (fecha.getMonth() + 1).toString().padStart(2, '0') +
          fecha.getDate().toString().padStart(2, '0') +
          '-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');

        // Restaurar botón
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Mostrar mensaje mejorado
        alert(`✅ Comentario guardado y enviado\n\nTicket: ${ticketNum}\n\n¡Gracias por tu opinión! Tu comentario ayuda a mejorar nuestro servicio.`);
        form.reset();
      })
      .catch(err => {
        console.error('Error envío API:', err);

        // Restaurar botón
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        alert('✅ Comentario guardado localmente\n\nHubo un problema al enviar la notificación, pero tu comentario está guardado en esta página.');
      });
  });
});
