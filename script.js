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

// 3. Respuesta dinámica del formulario
const formulario = document.getElementById('formulario-contacto');
const confirmacion = document.getElementById('mensaje-confirmacion');

formulario.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que la página se recargue
    formulario.reset(); // Limpia los campos
    confirmacion.classList.remove('oculto'); // Muestra el aviso
    
    setTimeout(() => {
        confirmacion.classList.add('oculto');
    }, 4000);
});
