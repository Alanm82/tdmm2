function changeImages(option) {
    // Definir las nuevas imágenes según la opción seleccionada
    let imagesSet = {
        1: ['./img/PopUp3/ST1.jpg', './img/PopUp3/ST2.jpg', './img/PopUp3/ST3.jpg', './img/PopUp3/ST4.jpg'],
        2: ['./img/PopUp3/W1.png', './img/PopUp3/W2.png', './img/PopUp3/W3.png', './img/PopUp3/W4.png'],
        3: ['./img/PopUp3/O1.png', './img/PopUp3/O2.png', './img/PopUp3/O3.png', './img/PopUp3/O4.png'],
        4: ['./img/PopUp3/BB1.png', './img/PopUp3/BB2.png', './img/PopUp3/BB3.png', './img/PopUp3/BB4.png']
    };

    // Seleccionamos el contenedor de las imágenes
    const container = document.getElementById('image-container');

    // Añadir la clase "pop-effect" temporalmente para la animación
    container.classList.add('pop-effect');  // Agregamos la clase de animación

    // Seleccionamos las imágenes de los perfiles
    const images = [
        document.getElementById('image1'),
        document.getElementById('image2'),
        document.getElementById('image3'),
        document.getElementById('image4')
    ];

    // Cambiar las imágenes
    images.forEach((img, index) => {
        img.src = imagesSet[option][index];
    });

    // Remover la clase de animación después de la transición
    setTimeout(() => {
        container.classList.remove('pop-effect');
    }, 300);  // Elimina la clase después de 300ms (duración de la animación)
}

function openPopup(popupId) {
    document.getElementById(popupId).classList.remove('hidden');
}

function closePopup(popupId) {
    document.getElementById(popupId).classList.add('hidden');
}

// Opcional: Cerrar el pop-up al hacer clic en el overlay
document.querySelectorAll('.popup-overlay').forEach(overlay => {
    overlay.addEventListener('click', function () {
        closePopup(this.parentElement.id);
    });
});


