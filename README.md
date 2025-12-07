# 🌐 Sitio Web — Consorcio Interalumbrado de Cúcuta v2.0

Proyecto web informativo desarrollado como evidencia de etapa productiva SENA.  
Sitio web completo con sistema de gestión de solicitudes integrado.

🔗 **Sitio en línea:** https://consorcio-interalumbrado.netlify.app/  
🔗 **API de formularios:** Google Apps Script + Google Sheets  
🔗 **Panel de administración:** /admin.html (acceso restringido)

---

## 🚀 **NOVEDADES v2.0**

### **Sistema de Gestión de Solicitudes:**
- ✅ **API personalizada** con Google Apps Script
- ✅ **Sistema de tickets automático** (INT-20241206-001)
- ✅ **Correos HTML profesionales** a empresa y usuarios
- ✅ **Backup en Google Sheets** en tiempo real
- ✅ **Panel de administración** básico
- ✅ **Validación mejorada** y feedback visual

### **Características Técnicas:**
- 📧 **Envío dual:** Correo + Google Sheets
- 🎫 **Tickets únicos** con seguimiento
- 📊 **Dashboard admin** con estadísticas
- 🔐 **Acceso seguro** con contraseña
- 💾 **Backup local** en localStorage

---

## 🧩 **Tecnologías utilizadas**

| Tecnología | Uso en el proyecto |
|------------|-------------------|
| **HTML5** | Estructura semántica del sitio |
| **CSS3** | Estilos y diseño adaptable (responsive) |
| **JavaScript ES6+** | Interactividad y gestión de formularios |
| **Google Apps Script** | API para procesamiento de formularios |
| **Google Sheets** | Base de datos y registro de solicitudes |
| **GitHub** | Control de versiones y repositorio |
| **Netlify** | Publicación del sitio en línea |

---

## 🗂️ **Estructura del proyecto v2.0**
INTERALUMBRADO/
├── index.html # Página principal (carrusel + comentarios)
├── noticias.html # Sección de noticias
├── proyectos.html # Sección de proyectos
├── contacto.html # Formulario de contacto con tickets
├── admin.html # Panel de administración (nuevo)
├── style/
│ └── style.css # Estilos globales
├── js/
│ ├── galeria-carousel.js # Carrusel automático
│ ├── comentarios-interactivos.js # Sistema de comentarios + API
│ ├── main.js # Menú hamburguesa + Lightbox
│ └── menu-activo.js # Detección de página activa
├── img/ # Imágenes y recursos
└── README.md # Esta documentación

---

## 🔧 **Configuración para producción**

### **API de Google Apps Script:**
1. **Cambiar correo de destino:** En el script, modificar `to: "consorcio.cucuta@gmail.com"`
2. **Cambiar modo prueba a producción:** `MODO_PRUEBA: false`
3. **Verificar permisos:** Asegurar que el script tenga acceso a Gmail y Google Sheets

### **Credenciales de administración:**
- **URL del panel:** `/admin.html`
- **Contraseña actual:** `Interalumbrado2025` (cambiar antes de entregar)

### **Enlaces importantes:**
- 📊 **Google Sheets:** https://docs.google.com/spreadsheets/d/1xfq-c7OGWUhAZGR4KFbqSiBlRm1Epos7oLpWJ2dpPKs/edit
- 📧 **Correo empresa:** consorcio.cucuta@gmail.com
- 📱 **WhatsApp:** +57 316 488 3530

---

## 📋 **Manual rápido de uso**

### **Para usuarios:**
1. **Contacto general:** Usar formulario en `/contacto.html`
2. **Reportes técnicos:** Contactar directamente al operador
3. **Comentarios:** Sección inferior de la página principal

### **Para administradores:**
1. **Acceder al panel:** `/admin.html` (contraseña requerida)
2. **Ver solicitudes:** Google Sheets enlace en el panel
3. **Responder:** Usar correo recibido con número de ticket

---

## 🧾 **Créditos y autoría**

**Proyecto desarrollado por:** [Tu Nombre]  
**Para:** Consorcio Interalumbrado de Cúcuta  
**Como evidencia de:** Etapa Productiva SENA  
**Tecnologías:** HTML5, CSS3, JavaScript, Google Apps Script

**Empresa:** Consorcio Interalumbrado de Cúcuta  
**Ubicación:** Cúcuta, Norte de Santander, Colombia  
**Rol:** Interventoría del servicio de alumbrado público

---

## 📦 **Licencia y derechos**

Este proyecto se entrega bajo licencia educativa, con fines formativos y demostrativos del proceso de desarrollo web.  
No se permite su reproducción o uso comercial sin autorización previa.

---

## 🧩 **Versión actual**
- **Versión:** 2.0.0 (con sistema de gestión integrado)
- **Última actualización:** Diciembre 2024
- **Estado:** Listo para producción

---

## 🔐 **Notas de seguridad**
- Cambiar contraseña del panel admin antes de entregar
- Revisar permisos de Google Apps Script
- No exponer credenciales en el código público.