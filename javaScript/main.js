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


// Selecciona el botón de descarga por su ID
const descargarCvBtn = document.getElementById('descargar-cv');

// Agrega un "escuchador de eventos" para el clic
descargarCvBtn.addEventListener('click', (event) => {
    // Evita que el enlace # se ejecute por defecto
    event.preventDefault();

    // Inicia la descarga del archivo PDF
    // Es importante que la ruta sea correcta
    const link = document.createElement('a');
    link.href = 'pdf/CV_de_LEONARDO_ISAIAS_BRINGAS_MONTERO.pdf';
    link.download = 'CV_de_LEONARDO_ISAIAS_BRINGAS_MONTERO.pdf'; // El nombre del archivo a descargar
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Redirige a la página de agradecimiento después de un breve retraso
    // El "setTimeout" es para darle tiempo al navegador de iniciar la descarga
    setTimeout(() => {
        window.location.href = 'gracias.html';
    }, 500); // 500 milisegundos (medio segundo)
});