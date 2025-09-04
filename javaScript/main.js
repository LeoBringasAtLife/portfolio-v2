// Elementos para el menú de hamburguesa
const hamburgerBtn = document.getElementById('hamburger-menu');
const navMenu = document.querySelector('.nav-menu');

// Evento para mostrar/ocultar el menú
hamburgerBtn.addEventListener('click', () => {
    console.log('Hamburguesa clickeada'); // Para depuración
    const expanded = hamburgerBtn.getAttribute("aria-expanded") === "true" || false;
    hamburgerBtn.setAttribute("aria-expanded", !expanded);
    navMenu.classList.toggle('active');
    hamburgerBtn.classList.toggle('active');
});

// Evento para ocultar el menú solo al hacer clic en los enlaces
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        hamburgerBtn.setAttribute("aria-expanded", "false");
    });
});