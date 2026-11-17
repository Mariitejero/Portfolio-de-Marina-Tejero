// 1. Navegación dinámica entre secciones sin recargar
const botonesNav = document.querySelectorAll('.nav-btn');
const secciones = document.querySelectorAll('.seccion');

function cambiarSeccion(idSeccion) {
    // Ocultar todas las secciones y quitar clase activa de botones
    secciones.forEach(sec => sec.classList.remove('activa'));
    botonesNav.forEach(btn => btn.classList.remove('activo'));

    // Mostrar la sección elegida
    document.getElementById(idSeccion).classList.add('activa');
    
    // Marcar el botón correspondiente como activo
    const botonActivo = document.querySelector(`[data-seccion="${idSeccion}"]`);
    if (botonActivo) botonActivo.classList.add('activo');
}

botonesNav.forEach(boton => {
    boton.addEventListener('click', () => {
        const destino = boton.getAttribute('data-seccion');
        cambiarSeccion(destino);
    });
});

// 2. Interruptor de Modo Oscuro / Claro
const botonTema = document.getElementById('tema-btn');
botonTema.addEventListener('click', () => {
    document.body.classList.toggle('oscuro');
    const esOscuro = document.body.classList.contains('oscuro');
    botonTema.textContent = esOscuro ? '☀️' : '🌙';
});

// 3. Envío real del formulario mediante Formspree
const formulario = document.getElementById('formulario-contacto');
const confirmacion = document.getElementById('mensaje-confirmacion');
const botonEnviar = formulario.querySelector('button[type="submit"]');

formulario.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Cambiar texto del botón mientras se envía
    const textoOriginal = botonEnviar.textContent;
    botonEnviar.textContent = 'Enviando...';
    botonEnviar.disabled = true;

    const datos = new FormData(formulario);

    try {
        // PEGA AQUÍ TU URL DE FORMSPREE ENTRE LAS COMILLAS:
        const respuesta = await fetch('https://formspree.io/f/xdeggkzj', {
            method: 'POST',
            body: datos,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (respuesta.ok) {
            formulario.reset(); // Limpia los campos
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
        // Restaurar el botón y ocultar el aviso tras 4 segundos
        botonEnviar.textContent = textoOriginal;
        botonEnviar.disabled = false;

        setTimeout(() => {
            confirmacion.classList.add('oculto');
        }, 4000);
    }
});


// Al cargar la página, comprobar si había un tema guardado
if (localStorage.getItem('tema') === 'oscuro') {
    document.body.classList.add('oscuro');
    botonTema.textContent = '☀️';
}

// Dentro del evento click de botonTema, guardar la elección:
botonTema.addEventListener('click', () => {
    document.body.classList.toggle('oscuro');
    const esOscuro = document.body.classList.contains('oscuro');
    botonTema.textContent = esOscuro ? '☀️' : '🌙';
    localStorage.setItem('tema', esOscuro ? 'oscuro' : 'claro');
});