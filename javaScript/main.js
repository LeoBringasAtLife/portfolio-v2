document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    // Crear overlay dinámicamente
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    console.log('Script cargado correctamente');

    // Función para alternar el menú
    function toggleMenu() {
        console.log('Botón de menú clickeado');
        const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';

        // Alternar clases activas
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');

        // Actualizar atributo de accesibilidad
        hamburgerBtn.setAttribute('aria-expanded', !isExpanded);

        // Cambiar el texto del label según el estado
        hamburgerBtn.setAttribute('aria-label', isExpanded ? 'Abrir menú' : 'Cerrar menú');
    }

    // Cerrar menú
    function closeMenu() {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.setAttribute('aria-label', 'Abrir menú');
    }

    // Event listeners mejorados
    hamburgerBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleMenu();
    });

    overlay.addEventListener('click', closeMenu);

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Cerrar menú al presionar la tecla Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    // Prevenir el cierre accidental al hacer clic dentro del menú
    navMenu.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    // Mejorar la detección de eventos táctiles
    hamburgerBtn.addEventListener('touchstart', function (e) {
        e.preventDefault();
        toggleMenu();
    }, { passive: false });
});