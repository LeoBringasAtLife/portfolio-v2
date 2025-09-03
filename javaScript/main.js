// Elementos para el menú de hamburguesa
const hamburgerBtn = document.getElementById('hamburger-menu');
const navMenu = document.querySelector('.nav-menu');

// Evento para mostrar/ocultar el menú
hamburgerBtn.addEventListener('click', () => {
    const expanded = hamburgerBtn.getAttribute("aria-expanded") === "true" || false;
    hamburgerBtn.setAttribute("aria-expanded", !expanded);
    navMenu.classList.toggle('active');
    hamburgerBtn.classList.toggle('active'); // Agrega o quita la clase 'active' del botón
});

// Evento para ocultar el menú al hacer clic en un enlace
navMenu.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburgerBtn.classList.remove('active'); // Restablece el ícono del botón
    hamburgerBtn.setAttribute("aria-expanded", "false"); // Restablece el atributo de accesibilidad
});