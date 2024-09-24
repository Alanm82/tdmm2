
let myChart = document.getElementById('myChart').getContext('2d');

let chartData = {
    labels: ['Drama', 'Comedia', 'Terror', 'Romance', 'Acción'],
    datasets: [{
        responsive: true, // Asegura que el gráfico sea responsivo
        maintainAspectRatio: false, // Desactiva la relación de aspecto para un ajuste completo
        label: '',
        data: [20, 20, 20, 20, 20],
        backgroundColor: ['#1A1A1A', '#1A1A1A', '#1A1A1A', '#1A1A1A', '#1A1A1A'],
        borderWidth: 4,
        borderColor: '#D9D9D9',
        hoverBorderWidth: 3,
        hoverBorderColor: 'black'
    }]
};

let massPopChart = new Chart(myChart, {
    type: 'bar',
    data: chartData,
    options: {
        plugins: {
            legend: {
                display: false // Esto oculta la leyenda
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    display: false
                },
                grid: {
                    display: false // Oculta las líneas de la cuadrícula del eje Y
                }
            },
            x: {
                grid: {
                    display: false // Opcional: oculta la cuadrícula en el eje X
                },
                ticks: {
                    color: 'white', // Cambia el color de los nombres a blanco
                    font: {
                        size: 20,// Cambia el tamaño de la fuente (ajusta según lo que necesites)
                    }
                }
            }
        },
        barThickness: 90, // Cambia este valor para ajustar el ancho de las barras
        barPercentage: 1.0,
        categoryPercentage: 1.0,
        layout: {
            padding: {
                left: 150, // Espaciado izquierdo
                right: 50,
                top: 200,
                bottom: 0
            }
        }
    }
});

function updateChart() {
    massPopChart.update();
    updateValues();
}

function updateValues() {
    document.getElementById('dramaValue').textContent = chartData.datasets[0].data[0];
    document.getElementById('comediaValue').textContent = chartData.datasets[0].data[1];
    document.getElementById('terrorValue').textContent = chartData.datasets[0].data[2];
    document.getElementById('romanceValue').textContent = chartData.datasets[0].data[3];
    document.getElementById('accionValue').textContent = chartData.datasets[0].data[4];
}

// Llama a updateChart para renderizar el gráfico inicialmente
updateChart();
let movies = [
    { title: 'El lobo de Wall Street (2013)', genre: 'Drama' },
    { title: 'Vuelo Nocturno (2010)', genre: 'Terror' },
    { title: 'Una Esposa de Mentira (2011)', genre: 'Comedia' },
    { title: 'Titanic (1997)', genre: 'Romance' },
    { title: 'Barbie (2023)', genre: 'Drama' },
    { title: 'Hubie Halloween (2020)', genre: 'Terror' },
    { title: 'La La Land (2016)', genre: 'Romance' },
    { title: 'Damsel (2024)', genre: 'Acción' },
    { title: 'Los Angeles de Charlie (2000)', genre: 'Acción' },
    { title: 'La mascara (1994)', genre: 'Comedia' }
];

let currentMovieIndex = 0;
const addBtn = document.getElementById('addBtn');
const subtractBtn = document.getElementById('subtractBtn');
let genres = ['Drama', 'Comedia', 'Terror', 'Romance', 'Acción'];
let genreVotes = [20, 20, 20, 20, 20]; // Inicializamos el gráfico con valores iguales

// Mostrar la película actual
function showMovie() {
    // Verificar si currentMovieIndex está dentro del rango
    if (currentMovieIndex < movies.length) {
        let currentMovie = movies[currentMovieIndex];
        document.getElementById('movieTitle').textContent = currentMovie.title;
        let moviePoster = document.getElementById('moviePoster');
        moviePoster.src = './img/' + currentMovie.title.replace(/ /g, '_') + '.png';
    } else {
        // Si se ha finalizado, mostrar el mensaje de finalización
        document.getElementById('movieTitle').textContent = '¡Finalizado!';
        moviePoster.src = './img/fin.png'; // Cambia esto por la imagen que quieras mostrar al finalizar
    }
}

// Lógica de votación
function voteMovie(isPositive) {
    // Verificar si currentMovieIndex está dentro del rango antes de proceder
    if (currentMovieIndex < movies.length) {
        let currentMovie = movies[currentMovieIndex];
        let genreIndex = genres.indexOf(currentMovie.genre);

        // Verificar si el género de la película está en el arreglo genres
        if (genreIndex !== -1) {
            // Actualizamos el valor en el gráfico según el voto
            if (isPositive) {
                chartData.datasets[0].data[genreIndex] = Math.min(100, chartData.datasets[0].data[genreIndex] + 10);
            } else {
                chartData.datasets[0].data[genreIndex] = Math.max(0, chartData.datasets[0].data[genreIndex] - 10);
            }
        } else {
            console.log(`El género ${currentMovie.genre} no está en el arreglo genres.`);
        }

        if (currentMovieIndex < movies.length - 1) {
            currentMovieIndex++;
        } else {
            currentMovieIndex = movies.length; // Asegúrate de que el índice esté fuera de rango
            currentMovie.title = '¡Finalizado!';
            addBtn.disabled = true;
            subtractBtn.disabled = true;
            var pantalla5 = document.getElementById("pantalla5");
            var pantallaResultado = document.getElementById("pantallaResultado");
            pantalla5.classList.add("oculto");
            pantallaResultado.classList.remove("oculto");
        }

        // Mostramos la nueva película
        showMovie();
        updateChart(); // Actualizar gráfico
    }
}

// Asignar eventos a los botones
document.getElementById('addBtn').addEventListener('click', () => voteMovie(true));
document.getElementById('subtractBtn').addEventListener('click', () => voteMovie(false));


showMovie();

updateValues();

window.addEventListener('resize', () => {
    massPopChart.resize();
});

function inicializarGrafico() {
    massPopChart.resize();
    console.log("Gráfico inicializado correctamente");
}