function cambiarPantalla() {
  const pantallas = ["pantalla1", "pantalla2", "pantalla3", "pantalla4"];
  const clases = ["oculto", "pantalla2", "pantalla3", "eleccionNucleo"];

  for (let i = 0; i < pantallas.length; i++) {
    let pantalla = document.getElementById(pantallas[i]);

    // Agregar logs para verificar las pantallas y las clases
    console.log(`Pantalla: ${pantallas[i]}`);

    if (i === 0) {
      pantalla.classList.add(clases[0]);  // Ocultar la primera pantalla
      console.log(`Ocultando pantalla: ${pantallas[i]}`);
    } else {
      pantalla.classList.remove(clases[0]);  // Mostrar las otras pantallas
      pantalla.classList.add(clases[i]);     // Aplicar clase correspondiente
      console.log(`Mostrando pantalla: ${pantallas[i]} con clase: ${clases[i]}`);
    }

    // Verificar si es pantalla5 y tiene la clase "eleccionNucleo"
    if (pantallas[i] === "pantalla5" && pantalla.classList.contains("recopDatos")) {
      console.log("Entrando a pantalla5 con clase recopDatos, inicializando gráfico...");
      inicializarGrafico();  // Llamar a la función que inicializa el gráfico
    } else {
      console.log("pantalla5 no tiene la clase recopDatos.");
    }
  }
}


// A R T W O R K  C O D E
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

// A R T W O R K  C O D E  F I N

function destello() {
  const div = document.getElementById('miDiv');
  div.classList.add('destello');

  // Remover la clase después de 1 segundo para poder aplicar el destello nuevamente
  setTimeout(() => {
    div.classList.remove('destello');
  }, 1000);
}

function mostrarPantalla(idPantalla) {
  // Oculta todas las pantallas (añade la clase 'noAparece')
  const pantallas = document.querySelectorAll('[id^="pantalla"]');
  pantallas.forEach(pantalla => {
    if (pantalla.id !== idPantalla) {
      pantalla.classList.add('noAparece'); // Oculta las pantallas que no son la seleccionada
      pantalla.classList.remove('clase5', 'clase6', 'clase7'); // Elimina clases específicas
    }
  });

  // Muestra la pantalla seleccionada (quita la clase 'noAparece')
  const pantallaSeleccionada = document.getElementById(idPantalla);
  pantallaSeleccionada.classList.remove('noAparece'); // Solo la seleccionada se muestra

  // Asigna una clase específica según el id de la pantalla
  switch (idPantalla) {
    case 'pantalla5':
      pantallaSeleccionada.classList.add('recopDatos');
      inicializarGrafico();
      break;
    case 'pantalla6':
      pantallaSeleccionada.classList.add('funAlgoritmo');
      break;
    case 'pantalla7':
      pantallaSeleccionada.classList.add('artWork');
      break;
    default:
      break; // No hace nada si el id no coincide
  }
}



document.querySelectorAll('.buttonCerrar').forEach(button => {
  button.addEventListener('click', ocultarPantalla);
});

function ocultarPantalla() {
  // Oculta la pantalla actual
  const pantallas = document.querySelectorAll('[id^="pantalla"]');
  pantallas.forEach(pantalla => {
    pantalla.classList.add('noAparece'); // Oculta todas las pantallas
  });

  // Muestra las pantallas 2, 3 y 4
  const pantallasMostrar = ['pantalla2', 'pantalla3', 'pantalla4'];
  pantallasMostrar.forEach(id => {
    const pantalla = document.getElementById(id);
    pantalla.classList.remove('noAparece'); // Muestra las pantallas seleccionadas
  });
}



// F I L T R A C I O N   C O D E

// Selecciona todos los elementos con la clase 'perfil'
const perfiles = document.querySelectorAll('.perfil');

const perfilInfo = {
  perfil1: {
    imgSrc: './img/perfiles/perfil1/perfil1.png',
    conclusion: 'CONTINUAR BUSCANDO USUARIOS CON GUSTOS MAS PARECIDOS',
    similitud: 'PERFILES NO  SIMILARES',
    imgResultado: './img/perfiles/x.png',
  },
  perfil2: {
    imgSrc: './img/perfiles/perfil2/perfil2.png',
    conclusion: 'CONTINUAR BUSCANDO USUARIOS CON GUSTOS MAS PARECIDOS',
    similitud: 'PERFILES NO  SIMILARES',
    imgResultado: './img/perfiles/x.png',
  },
  perfil3: {
    imgSrc: './img/perfiles/perfil3/perfil3.png',
    conclusion: 'TE RECOMENDAMOS CONTENIDO QUE EL OTRO USUARIO YA VIO',
    similitud: 'PERFILES SIMILARES!',
    imgResultado: './img/perfiles/=.png',
  }
};

const imgComparar = document.getElementById('perfilComparar');
const h3Similitud = document.getElementById('perfilesSimilitud');
const h3Conclusion = document.getElementById('conclusion');
const imgResultado = document.getElementById('imgResultado');


// Función para seleccionar y deseleccionar perfiles
function seleccionarPerfil(perfilSeleccionado) {
  perfiles.forEach(perfil => {
    if (perfil === perfilSeleccionado) {
      perfil.classList.remove('deseleccionado');
      perfil.classList.add('seleccionado');
    } else {
      perfil.classList.remove('seleccionado');
      perfil.classList.add('deseleccionado');
    }
  });

  // Obtener el ID del perfil seleccionado
  const perfilSeleccionadoId = perfilSeleccionado.id;

  // Actualizar la imagen y el contenido basado en el perfil seleccionado
  actualizarResultado(perfilSeleccionadoId);

  return perfilSeleccionadoId;
}

// Función para actualizar la imagen, similitud y conclusión según el perfil
function actualizarResultado(perfilId) {
  const perfil = perfilInfo[perfilId];

  // Cambiar la imagen de comparación
  imgComparar.src = perfil.imgSrc;

  // Cambiar el texto de similitud
  h3Similitud.textContent = perfil.similitud;

  // Cambiar la conclusión
  h3Conclusion.textContent = perfil.conclusion;

  imgResultado.src = perfil.imgResultado;
}

// Agregar el evento de click a cada perfil
perfiles.forEach(perfil => {
  perfil.addEventListener('click', function () {
    seleccionarPerfil(perfil);
  });
});

// Seleccionar el perfil por defecto (perfil1)
seleccionarPerfil(document.getElementById('perfil1'));



// F I L T R A C I O N    C O D E   F I N