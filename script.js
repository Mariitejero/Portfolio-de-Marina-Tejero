// 1. Navegación dinámica entre secciones sin recargar
const botonesNav = document.querySelectorAll('.nav-btn');
const secciones = document.querySelectorAll('.seccion');

function cambiarSeccion(idSeccion) {
    secciones.forEach(sec => sec.classList.remove('activa'));
    botonesNav.forEach(btn => btn.classList.remove('activo'));

    const seccionDestino = document.getElementById(idSeccion);
    if (seccionDestino) seccionDestino.classList.add('activa');
    
    const botonActivo = document.querySelector(`[data-seccion="${idSeccion}"]`);
    if (botonActivo) botonActivo.classList.add('activo');
}

botonesNav.forEach(boton => {
    boton.addEventListener('click', () => {
        const destino = boton.getAttribute('data-seccion');
        cambiarSeccion(destino);
    });
});

// 2. Interruptor de Modo Oscuro / Claro (con guardado automático)
const botonTema = document.getElementById('tema-btn');

if (botonTema) {
    if (localStorage.getItem('tema') === 'oscuro') {
        document.body.classList.add('oscuro');
        botonTema.textContent = '☀️';
    }

    botonTema.addEventListener('click', () => {
        document.body.classList.toggle('oscuro');
        const esOscuro = document.body.classList.contains('oscuro');
        botonTema.textContent = esOscuro ? '☀️' : '🌙';
        localStorage.setItem('tema', esOscuro ? 'oscuro' : 'claro');
    });
}

// 3. Envío real del formulario mediante Formspree
const formulario = document.getElementById('formulario-contacto');

if (formulario) {
    const confirmacion = document.getElementById('mensaje-confirmacion');
    const botonEnviar = formulario.querySelector('button[type="submit"]');

    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();

        const textoOriginal = botonEnviar.textContent;
        botonEnviar.textContent = 'Enviando...';
        botonEnviar.disabled = true;

        const datos = new FormData(formulario);

        try {
            // RECUERDA MANTENER AQUÍ TU URL DE FORMSPREE:
            const respuesta = await fetch('https://formspree.io/f/xdeggkzj', {
                method: 'POST',
                body: datos,
                headers: { 'Accept': 'application/json' }
            });

            if (respuesta.ok) {
                formulario.reset();
                confirmacion.textContent = '¡Gracias! Tu mensaje ha sido enviado.';
                confirmacion.classList.remove('oculto');
            } else {
                confirmacion.textContent = 'Hubo un error al enviar el mensaje. Inténtalo de nuevo.';
                confirmacion.classList.remove('oculto');
            }
        } catch (error) {
            confirmacion.textContent = 'Error de conexión. Revisa tu internet.';
            confirmacion.classList.remove('oculto');
        } finally {
            botonEnviar.textContent = textoOriginal;
            botonEnviar.disabled = false;

            setTimeout(() => {
                confirmacion.classList.add('oculto');
            }, 4000);
        }
    });
}

const modal = document.getElementById('modal-tarjeta');
const modalTitulo = document.getElementById('modal-titulo');
const modalTexto = document.getElementById('modal-texto');
const cerrarModal = document.getElementById('cerrar-modal');

document.querySelectorAll('.tarjeta').forEach(tarjeta => {
    tarjeta.addEventListener('click', () => {
        modalTitulo.textContent = tarjeta.querySelector('h3').textContent;
        modalTexto.textContent = tarjeta.getAttribute('data-detalle') || 'Más información próximamente.';
        modal.classList.remove('oculto');
    });
});

if (cerrarModal) {
    cerrarModal.addEventListener('click', () => modal.classList.add('oculto'));
}

// 4. Carrusel de fotos (para páginas de destino)
const imagenes = document.querySelectorAll('.carrusel-img');
const btnPrev = document.querySelector('.carrusel-btn.prev');
const btnNext = document.querySelector('.carrusel-btn.next');

if (imagenes.length > 0 && btnPrev && btnNext) {
    let indiceActual = 0;

    function mostrarImagen(indice) {
        imagenes.forEach(img => img.classList.remove('activa'));
        imagenes[indice].classList.add('activa');
    }

    btnNext.addEventListener('click', () => {
        indiceActual = (indiceActual + 1) % imagenes.length;
        mostrarImagen(indiceActual);
    });

    btnPrev.addEventListener('click', () => {
        indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
        mostrarImagen(indiceActual);
    });
}

// 4. Visor de fotos a pantalla completa (Lightbox)
const fotosGaleria = document.querySelectorAll('.galeria-editorial img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxPie = document.getElementById('lightbox-pie');
const cerrarLightbox = document.getElementById('cerrar-lightbox');

if (fotosGaleria.length > 0 && lightbox) {
    fotosGaleria.forEach(foto => {
        foto.addEventListener('click', () => {
            lightboxImg.src = foto.src;
            lightboxImg.alt = foto.alt;
            
            // Busca el texto del <figcaption> si existe
            const pie = foto.parentElement.querySelector('figcaption');
            lightboxPie.textContent = pie ? pie.textContent : foto.alt;
            
            lightbox.classList.remove('oculto');
        });
    });

    // Cerrar al pulsar la X
    cerrarLightbox.addEventListener('click', () => {
        lightbox.classList.add('oculto');
    });

    // Cerrar al hacer clic en el fondo oscuro fuera de la foto
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.add('oculto');
        }
    });

    // Cerrar al pulsar la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightbox.classList.contains('oculto')) {
            lightbox.classList.add('oculto');
        }
    });
}

