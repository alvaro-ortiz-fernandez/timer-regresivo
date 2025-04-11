/* ########################################################### */
/* #######################  Variables  ####################### */
/* ########################################################### */
// Tamaño de la ventana
let ventana = {
    ancho: window.innerWidth,
    alto: window.innerHeight
};

// Imagen de fondo
let backgroundImage;

// Música de fondo
let backgroundSound;

// Control de tiempo
let pausa = true;
let contador;

/* ########################################################### */
/* ###################  Métodos de p5.js  #################### */
/* ########################################################### */

/**
 * Método invocado por setup() para cargar información necesaria
 * de forma asíncrona (en segundo plano)
 * */
function preload() {
    // Cargamos la imagen de fondo
    backgroundImage = loadImage('assets/images/hospital.jfif');

    // Cargamos el sonido de fondo
    backgroundSound = loadSound('assets/sound/background.mp3');
}

/**
 * Método invocado una única vez por p5.js al iniciar el programa
 * para establecer la información necesaria para su funcionamiento
 * */
function setup() {
    // Establecemos el tamaño del marco sobre el que trabajará p5.js
    var canvas = createCanvas(ventana.ancho, ventana.alto);

    // Indicamos que el canvas lo pinte en el div html con el siguiente id
    canvas.parent("canvas-p5");

    // Establecemos las invocaciones por segundo al método draw()
    frameRate(30);

    // Inicializamos los contoles de tiempo
    reiniciar();
}

/**
 * Método invocado consecutivamente por p5.js
 * para mostrar en pantalla la información del programa
 * */
function draw() {
    // Limpiamos el canvas
    clear();

    // Cubrimos el canvas completo con la imagen de fondo.
    // Añadimos también un efecto de templor alterando
    // la posición de ésta en base a un número aleatorio,
    // que varía con el nivel de los efectos
    if (!(getMinuto() === 0 && getSegundo() === 0 && pausa === false))
        image(backgroundImage,
            random((getNivel(10) * -1), getNivel(10)),
            random((getNivel(10) * -1), getNivel(10)),
            width, height);

    // Mostramos los efectos visuales
    parpadeo(getNivel(40));
    ruidoVisual(getNivel(30));
    interferencias(get(), getNivel(20));
}

/* ########################################################### */
/* ####################  Métodos propios  #################### */
/* ########################################################### */
/**
 * Método que muestra un parpadeo de blanco a negro en la imagen de fondo.
 * El color del parpadeo dependerá del nivel indicado (de 0 a 10).
 * */
function parpadeo(nivel) {
    let transparencia = 255 - (nivel * 10);

    // Modificamos en cada frame el color de la imagen de fondo,
    // con un rango de colores aleatorio. A mayor nivel, más amplio
    // es el rango por lo que se producirán cambios más bruscos en la imagen
    tint(transparencia, random(transparencia, 255));
}

/**
 * Método que muestra unos puntos de intereferencia en la imagen de fondo.
 * El Nº de puntos dependerá del nivel indicado (de 0 a 10).
 * */
function ruidoVisual(nivel) {
    noStroke();
    for (let i = 0; i < (nivel * 100); i++) {
        fill(255, random(50, 150));
        ellipse(random(width), random(height), 2, 2);
    }
}

/**
 * Método que muestra unas líneas divisorias en la imagen de fondo.
 * El Nº de líneas dependerá del nivel indicado (de 0 a 10).
 * */
function interferencias(img, nivel) {
    for (let i = 0; i < nivel; i++) {
        let y = int(random(img.height));
        let h = int(random(1, 5));
        let xOffset = int(random(-20, 20));
        copy(img, 0, y, img.width, h, xOffset, y, img.width, h);
    }
}

/**
 * Método que definimos para obtener el minuto actual,
 * en base al temporizador modificable por el usuario.
 * */
function getMinuto() {
    var minuto = document.getElementById("minuto").value;

    // Si el control tienen un valor inválido, devolvemos 1 minuto
    if (isNaN(minuto) || parseInt(minuto) > 60 || minuto.length > 2) {
        return 1;
    } else {
        return parseInt(minuto);
    }
}

/**
 * Método que definimos para obtener el segundo actual,
 * en base al temporizador modificable por el usuario.
 * */
function getSegundo() {
    var segundo = document.getElementById("segundo").value;

    // Si el control tienen un valor inválido, devolvemos 59 segundos
    if (isNaN(segundo) || parseInt(segundo) > 60 || segundo.length > 2) {
        return 59;
    } else {
        return parseInt(segundo);
    }
}

/* ########################################################### */
/* ###################  Eventos de botones  ################## */
/* ########################################################### */
function iniciar() {
    pausa = false;

    // Si la música no está activa, la iniciamos
    if (backgroundSound._playing === false)
        backgroundSound.play();

    // Establecemos una ejecución cada 1 segundo
    // para bajar 1 segundo al tiempo restante
    clearInterval(contador);
    contador = setInterval(() => {
        var minuto = getMinuto();
        var segundo = getSegundo();

        // Reducimos 1 minuto cuando el segundo llegue a 0 y no sea el último minuto
        if (minuto !== 0 && segundo === 0) {
            minuto -= 1;
            segundo = 60;
        }

        document.getElementById("minuto").value =
            ('0' + minuto).slice(-2);
        document.getElementById("segundo").value =
            ('0' + Math.max(0, (segundo - 1))).slice(-2);
    }, 1000);
}

function detener() {
    clearInterval(contador);
    pausa = true;
    
    // Si la música está activa, la detenemos
    if (backgroundSound._playing === true)
        backgroundSound.stop();
}

function reiniciar() {
    detener();
    
    document.getElementById("minuto").value = '01';
    document.getElementById("segundo").value = '00';
}

/**
 * Método que obtiene el nivel (de 0 a 10)
 * en base al segundo especificado.
 * */
function getNivel(segundoInicial) {
    if (pausa === true || getMinuto() > 0 || getSegundo() > segundoInicial)
        return 0;
    
    if (getMinuto() === 0 && getSegundo() === 0)
        return 0;

    return 10 - ((10 / segundoInicial) * getSegundo())
}