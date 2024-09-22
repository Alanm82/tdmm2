function drawChart() {
  // Define the chart to be drawn.
  var data = google.visualization.arrayToDataTable([
         ['Genero', 'Porcentaje', { role: 'style' }, { role: 'annotation' } ],
         ['Drama', 20, '#B7D9E1', '20' ],
         ['Comedia', 20, '#B7D9E1', '20' ],
         ['Terror', 20, '#C2E0C6', '20' ],
         ['Romance', 20, '#E1B7D9', '20' ],
         ['Acción', 20, '#F2C2B7', '20' ]
      ]);

  // Opciones del gráfico
  var options = {
    title: '',
    tooltip: {isHtml: false},
    backgroundColor: 'transparent',  // Fondo negro
    width: 1000,
    height: 200,
    hAxis: {
      textStyle: { color: '#fff' },  // Color de los textos en el eje X
      gridlines: { color: 'transparent' }  // Sin líneas de fondo en X
    },
    vAxis: {
      textPosition: 'none',
      gridlines: { color: 'transparent' },  // Sin líneas de fondo en Y
      minValue: 0,
      maxValue: 100
    },
    legend: { position: 'none' },  // Sin leyenda
    bar: { groupWidth: '80%' },  // Ancho del grupo de barras
    annotations: {
      textStyle: {
        color: "#D9D9D9", // Color del texto de las anotaciones
        position: 'top', // Centramos el texto dentro de la barra
        pattern: '{value}%',
        fontSize: 14,
        // Ajustamos el espaciado para que el texto quede dentro de la barra
        baseline: 'bottom'
      }
    },

  };

  

  // Instantiate and draw the chart.
  var chart = new google.visualization.ColumnChart(document.getElementById('columnChart'));
  chart.draw(data, options);
}