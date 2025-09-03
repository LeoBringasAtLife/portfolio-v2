// Elementos para el menú de hamburguesa
const hamburgerBtn = document.getElementById('hamburger-menu');
const navMenu = document.querySelector('.nav-menu');

// Evento para mostrar/ocultar el menú
hamburgerBtn.addEventListener('click', () => {
    const expanded = hamburgerBtn.getAttribute("aria-expanded") === "true" || false;
    hamburgerBtn.setAttribute("aria-expanded", !expanded);
    navMenu.classList.toggle('active');
});

// Evento para ocultar el menú al hacer clic en un enlace
navMenu.addEventListener('click', () => {
    navMenu.classList.remove('active');
});