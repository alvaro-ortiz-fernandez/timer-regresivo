/* ########################################################### */
/* #######################  Variables  ####################### */
/* ########################################################### */

/* ########################################################### */
/* ###################  Métodos de p5.js  #################### */
/* ########################################################### */

/**
 * Método invocado por setup() para cargar información necesaria
 * de forma asíncrona (en segundo plano)
 * */
function preload() {
}

/**
 * Método invocado una única vez por p5.js al iniciar el programa
 * para establecer la información necesaria para su funcionamiento
 * */
function setup() {
    // Establecemos el tamaño del marco sobre el que trabajará p5.js
    var canvas = createCanvas(700, 360);

    // Indicamos que el canvas lo pinte en el div html con el siguiente id
    canvas.parent("canvas-p5");

    // Establecemos las invocaciones por segundo al método draw()
    frameRate(5);
}

/**
 * Método invocado consecutivamente por p5.js
 * para mostrar en pantalla la información del programa
 * */
function draw() {
    // Limpiamos el canvas
    clear();
}

/* ########################################################### */
/* ####################  Métodos propios  #################### */
/* ########################################################### */

