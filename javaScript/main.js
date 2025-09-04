const hamburgerBtn = document.getElementById('hamburger-menu');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

const toggleMenu = () => {
    const expanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
    hamburgerBtn.setAttribute("aria-expanded", !expanded);
    navMenu.classList.toggle('active');
    hamburgerBtn.classList.toggle('active');

    // Prevenir scroll cuando el menú está abierto
    if (!expanded) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
};

// Agrega soporte para click y touchstart
hamburgerBtn.addEventListener('click', toggleMenu);
hamburgerBtn.addEventListener('touchstart', function (e) {
    e.preventDefault(); // Prevenir comportamiento por defecto en móviles
    toggleMenu();
}, { passive: false });

// Ocultar el menú al hacer clic en los enlaces
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute("aria-expanded", "false");
        body.style.overflow = ''; // Restaurar scroll
    });
});

// Cerrar menú al hacer clic fuera de él
document.addEventListener('click', (e) => {
    const isClickInsideNav = navMenu.contains(e.target) || hamburgerBtn.contains(e.target);

    if (!isClickInsideNav && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute("aria-expanded", "false");
        body.style.overflow = '';
    }
});

// Cerrar menú al presionar la tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute("aria-expanded", "false");
        body.style.overflow = '';
    }
});