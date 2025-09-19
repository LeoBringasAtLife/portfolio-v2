document.addEventListener('DOMContentLoaded', function () {
    const hamburgerBtn = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const nav = document.querySelector('nav');
    const body = document.body;

    let lastScroll = 0;

    // Función para controlar la visibilidad del navbar al hacer scroll
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scroll hacia abajo y más allá de 100px
            nav.classList.add('nav-hidden');
        } else {
            // Scroll hacia arriba o en la parte superior
            nav.classList.remove('nav-hidden');
        }

        lastScroll = currentScroll;
    });

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

    // Función para actualizar el enlace activo basado en la sección visible
    function updateActiveLink() {
        const sections = document.querySelectorAll('section, header');
        const navLinks = document.querySelectorAll('.nav-menu a');

        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id') || 'acerca';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Actualizar enlace activo al hacer scroll
    window.addEventListener('scroll', updateActiveLink);

    // Scroll suave para los enlaces de navegación
    document.querySelectorAll('.nav-menu a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);

            if (target) {
                const offsetTop = target.offsetTop - 20;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Inicializar el enlace activo al cargar la página
    updateActiveLink();
});