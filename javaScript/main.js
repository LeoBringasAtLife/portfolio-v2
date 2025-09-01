const toggleBtn = document.getElementById('toggle-dark');
const iconDark = document.getElementById('icon-dark');
const iconLight = document.getElementById('icon-light');

// Elementos para el menú de hamburguesa
const hamburgerBtn = document.getElementById('hamburger-menu');
const navMenu = document.querySelector('.nav-menu');

// Evento para mostrar/ocultar el menú
hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Evento para ocultar el menú al hacer clic en un enlace
navMenu.addEventListener('click', () => {
    navMenu.classList.remove('active');
});

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    // Alternar íconos
    if (document.body.classList.contains('dark')) {
        iconDark.style.display = 'none';
        iconLight.style.display = 'inline';
    } else {
        iconDark.style.display = 'inline';
        iconLight.style.display = 'none';
    }
});