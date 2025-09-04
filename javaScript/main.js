const hamburgerBtn = document.getElementById('hamburger-menu');
const navMenu = document.querySelector('.nav-menu');

const toggleMenu = () => {
    console.log('Hamburguesa clickeada'); // Para depuración
    const expanded = hamburgerBtn.getAttribute("aria-expanded") === "true";
    hamburgerBtn.setAttribute("aria-expanded", !expanded);
    navMenu.classList.toggle('active');
    hamburgerBtn.classList.toggle('active');
};

// Agrega soporte para click y touchstart
hamburgerBtn.addEventListener('click', toggleMenu);
hamburgerBtn.addEventListener('touchstart', toggleMenu);

// Ocultar el menú al hacer clic en los enlaces
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute("aria-expanded", "false");
    });
});