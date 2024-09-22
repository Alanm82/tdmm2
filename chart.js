let myChart = document.getElementById('myChart').getContext('2d');

let chartData = {
    labels: ['Drama', 'Comedia', 'Terror', 'Romance', 'Acción'],
    datasets: [{
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

// Llama a updateChart para renderizar el gráfico inicialmente
updateChart();

let genres = ['Terror', 'Comedia', 'Romance'];
let genreIndexes = [2, 1, 3];
let currentGenreIndex = 0;

const genreName = document.getElementById('genreName');
const addBtn = document.getElementById('addBtn');
const subtractBtn = document.getElementById('subtractBtn');

function updateChart() {
    massPopChart.update();
    updateValues();
}

function modifyOthers(currentIndex, amount) {
    for (let i = 0; i < chartData.datasets[0].data.length; i++) {
        if (i !== currentIndex) {
            chartData.datasets[0].data[i] = Math.min(100, chartData.datasets[0].data[i] + amount);
        }
    }
}

function updateValues() {
    document.getElementById('dramaValue').textContent = chartData.datasets[0].data[0];
    document.getElementById('comediaValue').textContent = chartData.datasets[0].data[1];
    document.getElementById('terrorValue').textContent = chartData.datasets[0].data[2];
    document.getElementById('romanceValue').textContent = chartData.datasets[0].data[3];
    document.getElementById('accionValue').textContent = chartData.datasets[0].data[4];
}

function nextGenre() {
    currentGenreIndex++;
    if (currentGenreIndex < genres.length) {
        genreName.textContent = genres[currentGenreIndex];
    } else {
        genreName.textContent = '¡Finalizado!';
        addBtn.disabled = true;
        subtractBtn.disabled = true;
    }
    updateChart();
}

addBtn.addEventListener('click', () => {
    let genreIndex = genreIndexes[currentGenreIndex];
    chartData.datasets[0].data[genreIndex] = Math.min(100, chartData.datasets[0].data[genreIndex] + 10);
    modifyOthers(genreIndex, -2.5);
    nextGenre();
});

subtractBtn.addEventListener('click', () => {
    let genreIndex = genreIndexes[currentGenreIndex];
    chartData.datasets[0].data[genreIndex] = Math.max(0, chartData.datasets[0].data[genreIndex] - 10);
    modifyOthers(genreIndex, 2.5);
    nextGenre();
});

// Inicializar valores al cargar
updateValues();