function cambiarPantalla() {
    const pantallas = ["pantalla1", "pantalla2", "pantalla3"];
    const clases = ["oculto", "pantalla2" ,"pantalla3"];

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
