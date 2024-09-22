function cambiarPantalla() {
    const pantallas = ["pantalla1", "pantalla2", "pantalla3", "pantalla4", "pantalla5"];
    const clases = ["oculto", "pantalla2" ,"pantalla3", "eleccionNucleo", "recopDatos"];

    for (let i = 0; i < pantallas.length; i++) {
        let pantalla = document.getElementById(pantallas[i]);

        if (i === 0) {
            pantalla.classList.add(clases[0]);  // Ocultar la primera pantalla
        } else {
            pantalla.classList.remove(clases[0]);  // Mostrar las otras pantallas
            pantalla.classList.add(clases[i]);     // Aplicar clase correspondiente
        }
    }
}

let myChart = document.getElementById('myChart').getContext('2d'); 

let chartData = {
    labels: ['Drama', 'Comedia', 'Terror', 'Romance', 'Acción'],
    datasets: [{
        label: 'Películas',
        data: [20, 20, 20, 20, 20],
        backgroundColor: ['green', 'red', 'blue', 'yellow', 'orange'],
        borderWidth: 4,
        borderColor: '#777',
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
                display: false // Desactivar la leyenda para que no se muestre
            }
        },
        scales: {
            y: {
                grid: {
                    display: false // Desactivar la grilla en el eje Y
                },
                ticks: {
                    display: false // Ocultar las etiquetas de los valores en el eje Y
                },
                border: {
                    display: false
                },
                beginAtZero: true // Comenzar el eje Y en 0
            },
            x: {
                grid: {
                    display: false // Desactivar la grilla en el eje X
                }, 
                // Ajustes para el espacio entre barras
                ticks: {
                    // Aquí puedes agregar más configuraciones si es necesario
                },
                border: {
                    display: false
                }
            }
        },
        // Ajustar el tamaño de las barras
        barThickness: 30, // Modifica este valor para cambiar el tamaño de las barras
        // Aumentar o reducir el espacio entre las barras
        barPercentage: 1, // Modifica este valor (0 a 1) para aumentar o reducir el espacio entre barras
        categoryPercentage: 1, // Modifica este valor (0 a 1) para aumentar o reducir el espacio entre categorías
        // Ajustar la posición general del gráfico
        layout: {
            padding: {
                left: 20, // Espaciado izquierdo
                right: 80, // Espaciado derecho
                top: 40, // Espaciado superior
                bottom: 10 // Espaciado inferior
            
            }
        }
    }
});

let genres = ['Terror', 'Comedia', 'Romance'];
let genreIndexes = [2, 1, 3];
let currentGenreIndex = 0;

const genreName = document.getElementById('genreName');
genreName.textContent = genres[currentGenreIndex];

const addBtn = document.getElementById('addBtn');
const subtractBtn = document.getElementById('subtractBtn');

function updateChart() {
    massPopChart.update();
}

function modifyOthers(currentIndex, amount) {
    for (let i = 0; i < chartData.datasets[0].data.length; i++) {
        if (i !== currentIndex) {
            chartData.datasets[0].data[i] = Math.min(100, chartData.datasets[0].data[i] + amount);
        }
    }
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
