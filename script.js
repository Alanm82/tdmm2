function cambiarPantalla() {
    // Ocultar la pantalla actual
    document.getElementById("pantalla1").classList.remove("mostrar");
    document.getElementById("pantalla1").classList.add("pantalla");

    // Mostrar la nueva pantalla
    document.getElementById("pantalla2").classList.remove("pantalla");
    document.getElementById("pantalla2").classList.add("mostrar");
}