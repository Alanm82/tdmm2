const sliderInner = document.querySelector('.SliderInner')
const controlNext = document.querySelector('#Control-next')
const controlPrev = document.querySelector('#Control-prev')
let currentTranslateX = 0;
controlNext.addEventListener('click', () => {
    if (currentTranslateX > -45) {
        currentTranslateX -= 16.66;
    } else {
        currentTranslateX += 0;
    }
    sliderInner.style.transform = `translateX(${currentTranslateX}%)`;
});

controlPrev.addEventListener('click', () => {
    if (currentTranslateX <= -16.66) {
        currentTranslateX += 16.66;
    } else {
        currentTranslateX += 0;
    }
    sliderInner.style.transform = `translateX(${currentTranslateX}%)`;
});

let isDown = false;
let startX;
let scrollLeft;

sliderInner.addEventListener('mousedown', (e) => {
    isDown = true;
    sliderInner.classList.add('active');
    startX = e.pageX - sliderInner.offsetLeft;
    scrollLeft = sliderInner.scrollLeft;
});

sliderInner.addEventListener('mouseleave', () => {
    isDown = false;
    sliderInner.classList.remove('active');
});

sliderInner.addEventListener('mouseup', () => {
    isDown = false;
    sliderInner.classList.remove('active');
});

sliderInner.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderInner.offsetLeft;
    const walk = (x - startX);
    sliderInner.scrollLeft = scrollLeft - walk;
});

sliderInner.addEventListener('touchstart', (event) => {
    isDown = true;
    sliderInner.classList.add('active');
    startX = event.touches[0].pageX - sliderInner.offsetLeft;
    scrollLeft = sliderInner.scrollLeft;
});

sliderInner.addEventListener('touchend', () => {
    isDown = false;
    sliderInner.classList.remove('active');
});

sliderInner.addEventListener('touchmove', (event) => {
    if (!isDown) return;
    event.preventDefault(); // Evita el desplazamiento predeterminado
    const touchX = event.touches[0].pageX;
    const offsetX = touchX - startX;
    const walk = offsetX; // Calcula la diferencia entre startX y la posición actual del toque
    sliderInner.scrollLeft = scrollLeft - walk; // Aplica el desplazamiento a sliderInner.scrollLeft
});










document.addEventListener('DOMContentLoaded', function () {
    const radios = document.querySelectorAll('input[name="Indicador"]');
    const cards = document.querySelectorAll('.cardBanner');
    const delay = 2500;
    let autoChangeInterval;
    let userInteracted = false;
    const resetDelay = 4000;
    let currentIndex = 0;

    function updateCards() {
        const checkedRadio = document.querySelector('input[name="Indicador"]:checked');
        const checkedIndex = Array.from(radios).indexOf(checkedRadio);

        cards.forEach((card, index) => {
            card.classList.remove('center', 'left', 'right');
            if (index === checkedIndex) {
                card.classList.add('center');
            } else if (index === (checkedIndex + 1) % cards.length) {
                card.classList.add('right');
            } else if (index === (checkedIndex + cards.length - 1) % cards.length) {
                card.classList.add('left');
            }
        });
    }

    function changeRadio() {
        if (userInteracted) {
            // Si el usuario ha interactuado, esperamos antes de reanudar el cambio automático
            setTimeout(() => {
                userInteracted = false; // Resetea la bandera para permitir el cambio automático
                autoChangeInterval = setInterval(changeRadio, delay); // Reinicia el intervalo de cambio automático
            }, resetDelay);
            clearInterval(autoChangeInterval); // Detiene el intervalo de cambio automático actual
            return; // Sale de la función para no ejecutar el cambio automático ahora
        }

        radios[currentIndex].checked = false; // Desmarca el radio actual
        currentIndex = (currentIndex + 1) % radios.length; // Avanza al siguiente índice
        radios[currentIndex].checked = true; // Marca el nuevo radio
        updateCards(); // Actualiza las tarjetas

        // Actualiza las clases active
        updateActiveClass();
    }

    function updateActiveClass() {
        document.querySelectorAll('.ContRadio').forEach(contRadio => {
            contRadio.classList.remove('active');
        });

        radios.forEach(input => {
            if (input.checked) {
                input.parentElement.classList.add('active');
            }
        });
    }

    radios.forEach((radio, index) => {
        radio.addEventListener('change', () => {
            userInteracted = true; // Marca que el usuario ha interactuado
            currentIndex = index; // Actualiza el índice actual
            updateCards(); // Actualiza las tarjetas

            // Actualiza las clases active
            updateActiveClass();
        });

        // Inicializa la clase active en el contenedor del input marcado al cargar la página
        if (radio.checked) {
            radio.parentElement.classList.add('active');
        }
    });

    // Inicializar el estado inicial de los radios y tarjetas
    updateCards();
    // Iniciar el intervalo de cambio automático
    autoChangeInterval = setInterval(changeRadio, delay);
});



function toggleDropdown() {
    var content = document.getElementById("dropdownContent");
    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "flex";
    } else {
        content.style.display = "none";
    }
}

function selectOption(option) {
    document.getElementById("selectedOption").value = option;
    var dropdownButton = document.getElementById("dropdownButton");
    dropdownButton.innerHTML = '<span style="color: #BBFE03;">' + option + ' <img src="./Images/Iconos/ArrowDown.png" alt="">';
    toggleDropdown();
}

document.getElementById("myForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var selectedOption = document.getElementById("selectedOption").value;
    var nombre = document.getElementById("Nombre").value;
    var email = document.getElementById("Mail").value;
    if (!selectedOption) {
        alert("Por favor, selecciona un programa.");
        return;
    }
    updatePopUpContent(nombre, selectedOption);
    showPopUp();
});

function showPopUp() {
    var popUp = document.querySelector('.popUp');
    var overlay = document.querySelector('.overlay');
    popUp.classList.add('active');
    overlay.classList.add('active');
}

function updatePopUpContent(nombre, selectedOption) {
    var thanksMessage = document.getElementById("thanksMessage");
    var contentMessage = document.getElementById("contentMessage");

    thanksMessage.textContent = nombre + ", gracias por completar el formulario.";
    contentMessage.textContent = "Todo el contenido exclusivo de " + selectedOption + " va a llegar a tu correo a partir de hoy.";
}
document.getElementById("continueButton").addEventListener("click", function () {
    var popUp = document.querySelector('.popUp');
    var overlay = document.querySelector('.overlay');
    popUp.classList.remove('active');
    overlay.classList.remove('active');
});

// Opcional: cerrar el dropdown si se hace clic fuera de él
window.onclick = function (event) {
    if (!event.target.matches('.dropButton')) {
        var dropdowns = document.getElementsByClassName("content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.style.display === "flex") {
                openDropdown.style.display = "none";
            }
        }
    }
}

let camposRellenables = document.querySelectorAll('.CampoRellenable');

camposRellenables.forEach(campo => {
    const input = campo.querySelector('input');

    input.addEventListener('focus', function () {
        input.classList.add('active');
    });

    input.addEventListener('blur', function () {
        if (input.value.trim() !== '') {
            input.classList.add('completado');
        } else {
            input.classList.remove('active');
            input.classList.remove('completado');
        }
    });

    input.addEventListener('input', function () {
        if (input.value.trim() !== '') {
            input.classList.add('completado');
        } else {
            input.classList.remove('completado');
        }
    });
});

function adjustHeight() {
    const elements = document.querySelectorAll('.sliderImages');
    elements.forEach(element => {
        if (element) {
            const width = element.offsetWidth;
            console.log(width);
            const height = width * .8; 
            element.style.height = height + 'px';
        }
    });
}


window.addEventListener('load', adjustHeight);
window.addEventListener('resize', adjustHeight);

document.getElementById('ShowButton').addEventListener('click', () => {
    const container = document.getElementById('PSeccion');
    container.classList.toggle('show-all');
    const buttonText = container.classList.contains('show-all') ? 'Ver menos' : 'Ver mas';
    document.getElementById('ShowButton').textContent = buttonText;
});

document.getElementById('CtaButton').addEventListener('click', () => {
    document.getElementById('Header').scrollIntoView({ behavior: 'smooth' });
});




