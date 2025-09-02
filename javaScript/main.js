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

// --- DESCARGAR PDF --- //

// Selecciona el botón de descarga por su ID
const descargarCvBtn = document.getElementById('descargar-cv');

// Agrega un "escuchador de eventos" para el clic
descargarCvBtn.addEventListener('click', (event) => {
    // Evita que el enlace con '#' en el href se ejecute por defecto
    event.preventDefault();

    if (!confirm('¿Estás seguro de que quieres descargar mi CV?')) {
        return;
    }

    // Inicia la descarga del archivo PDF
    const link = document.createElement('a');

    link.href = 'pdf/CV_LEONARDO_ISAIAS_BRINGAS_MONTERO.pdf';

    // Nombre del archivo que se descargará
    link.download = 'CV_LEONARDO_ISAIAS_BRINGAS_MONTERO.pdf';

    // Oculta el enlace para que el usuario no lo vea
    link.style.display = 'none';

    // Agrega el enlace al cuerpo del documento.
    document.body.appendChild(link);

    // Simula un clic en el enlace para iniciar la descarga.
    link.click();

    // Elimina el enlace del documento después de la descarga
    document.body.removeChild(link);

    // setTimeout(() => {
    //     window.location.href = 'gracias.html';
    // }, 2000);
});