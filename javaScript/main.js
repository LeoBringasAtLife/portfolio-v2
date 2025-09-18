document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    // Crear overlay dinámicamente si no existe
    let overlay = document.querySelector('.overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);
    }

    // Función mejorada para alternar el menú
    function toggleMenu() {
        const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';

        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');

        hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
        hamburgerBtn.setAttribute('aria-label', isExpanded ? 'Abrir menú' : 'Cerrar menú');
    }

    // Función mejorada para cerrar el menú
    function closeMenu() {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        hamburgerBtn.setAttribute('aria-label', 'Abrir menú');
    }

    // Event listeners mejorados
    hamburgerBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);

    // Cerrar menú al hacer clic en enlaces
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Cerrar menú con Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Prevenir cierre al hacer clic dentro del menú
    navMenu.addEventListener('click', function (e) {
        e.stopPropagation();
    });
});