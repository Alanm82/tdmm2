function cambiarPantalla() {
    // Ocultar la pantalla actual

    document.getElementById("pantalla1").classList.add("oculto");

    // Mostrar la nueva pantalla
    document.getElementById("pantalla2").classList.remove("oculto");


    document.getElementById("pantalla3").classList.remove("oculto");
    document.getElementById("pantalla3").classList.add("pantalla3");
}