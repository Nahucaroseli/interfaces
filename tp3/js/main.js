"use strict";

let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");
let play = document.getElementById("frontGame");
let timeOut = document.getElementById("timeOut");
let mainMenu = document.getElementById("menu_4linea");
let timerDiv = document.getElementById("timer");
let player = document.getElementById("jugador");
let botonJugar = document.getElementById("g");
let finishGame = document.getElementById("finishGame");
let playerRed , playerGreen;
let arrayLockers = [] ,arrayConteiners = [], matrixArray = [], token1 = [], token2 = [], m =[];
let countSeconds, countMinutes, seconds, minutes;
let isMouseDown = false;
let lastClickedFigure = null;
let hiddenMainMenu = false;
let img;

document.querySelectorAll("div.chooseToken2 > button").forEach(function(element){
    element.addEventListener("click", selectedToken2, false)
});
document.querySelectorAll("div.chooseBoard > button").forEach(function(element){
    element.addEventListener("click", selectedchooseBoard, false)
});

const Rows ={
    empty:[]
};

const Juego ={
    matrix : null ,
    winner : 0,
    rows:0,
    Columns:0,
    Tokens:0,// cantidad de fichas por jugador 
    dimension:null
};

const oldPositions = {
    X: null ,
    Y : null,
    selected : null ,
    positionInArray: null,
    array : null
};

const imageBoard = {
    img: null
};

const alllockers = {
    array: null
};

const MatrixLockers={
    matrix:null
};

const allConteiners = {
    array: null
};

const player1 = { // esta constante tiene los datos y el arreglo de las fichas del jugador 1
    name: 1,
    arrayTokensPlayer1: 0,
    colour:null
};

const player2 = {// esta constante tiene los datos y el arreglo de las fichas del jugador 2
    name: 2,
    arrayTokensPlayer2: 0,
    colour: null
};

const currentPlayer = {
    actual: player1.name 
};

//Al cargar el DOM, se llama a esta funcion, que lo que hace es ocultar divs, y desoculta a medida que se valla solicitando.
function hiddenGame(){
    if(hiddenMainMenu == false){
        canvas.style.display = 'none';
        mainMenu.style.visibility = 'hidden';
        timerDiv.style.display = 'none';
        finishGame.style.display = 'none';
        botonJugar.style.visibility = 'hidden';
    }else{
        timerDiv.style.display = 'none'
        canvas.style.display = 'none';
        mainMenu.style.visibility = 'visible';
        player.style.display = 'none';
        finishGame.style.display = 'block';
    }
}
// cuando el jugador termina de legir las fichas y el tablero y clickea jugar se activa esta funcion 
function initGame(){
    canvas.style.display = 'block';  
    play.style.display = 'none'; 
    timerDiv.style.display = 'block';
    tokenANDboard(); // llama a la funcion que crea todas las fichas y el tablero
    game(); // llama la a funcion que crea la matriz para la logica del juego 
    timer(10); // llama al timer con la cantidad de minutos que va a durar el juego   
    document.addEventListener("mousedown", Help.onMouseDown, false);
    document.addEventListener("mouseup", Help.onMouseUp, false);
    document.addEventListener("mousemove", Help.onMouseMove, false);
    // addEventListener para el movimiento de las fichas , cada funcion a las que se dirige son metodos estaticos que estan dentro d ela clase help 
}

async function tokenANDboard(){
    img = await Help.uploadImage(player1.colour); // carga la imagen selecionada por el jugador 1 , se llama a un metodo statico que carga la imagen 
    player1.colour = img; // se guarda en la constante la imagen cargada 
    playerRed = new Token(token1, token2, player1.colour, Juego.Tokens, context); //se crea una instancia de la clase token  
    playerRed.createToken(); // se llama al metodo que las crea 
    player1.arrayTokensPlayer1 = playerRed.getToken1(); // se guarda en el arreglo de la constante que le pertenece a dicho jugador , todo el arreglo que contiene todas las fichas
    playerRed.drawToken(player1.arrayTokensPlayer1);// se llama al metodo que las dibuja
    
    img = await Help.uploadImage(player2.colour);
    player2.colour = img;
    playerGreen = new Token(token1, token2, player2.colour,Juego.Tokens, context);
    playerGreen.createToken();
    player2.arrayTokensPlayer2 = playerRed.getToken2();
    playerGreen.drawToken(player2.arrayTokensPlayer2);
    board(); // se llama a la funcion que crea el tablero
}

async function board(){
    img = await Help.uploadImage("./img/table.jpeg"); //Carga la imagen.
    let imagen = await Help.uploadImage("./img/Flecha.jpg"); //Carga la imangen de la flecha que estan por encima del tablero.
    let  board = new Board(canvas, context, img,Juego.rows , Juego.Columns, arrayLockers,arrayConteiners,m,Juego.forma, imagen);
    board.drawBackground(); //Dibuja el tablero.
    board.createLockers();  //Dibuja los circulos dentro del tablero.
    board.drawcontainers(); //Dibuja la flecha que esta por encima del tablero. 
    alllockers.array = board.getArrayLockers(); //Guarda en la constante el arreglo de los circulos.
    allConteiners.array = board.getArrayConteiners(); ///Guarda en la constante el arreglo de las flechas de arriba del tablero.
    imageBoard.img = img ; //Guarda en la constante la imagen.
    MatrixLockers.matrix=board.getMatrix() //Guarda en la constante la matriz del tablero.
    }

function game (){
    let g = new Game (Juego.rows,Juego.Columns,matrixArray) // se crea una instancia de la clase game 
    g.createMatrix(); // retorna una matrix con las filas y columnas del tablero 
    Juego.matrix = g.getMatrix();// guarda la matriz en la constante para despues utilizarla en otras clases 
    Rows.empty = Game.emptyFile(); // guarda el estado de las filas (si estan llenas o vacias)
}
document.querySelectorAll("div.chooseToken1 > button").forEach(function(element){
    element.addEventListener("click", selectedToken1, false) // cuando se clickea un boton para elegir las fichas del jugador 1 se  hace un foreach para saber cual es el id del clikeado y se llama  una funcion 
});

function selectedToken1(){
    let idButton = this.id; // se guarda el id de el botton q se clickeo
    player1.colour = idButton; // ese ide corresponde a la imagen elegida entonces se guarda en la constante del jugador 1 
    document.querySelectorAll("div.chooseToken1 > button").forEach(function(element){ //se hace un foreach de todos los botones para ocultar los q no estan clickeados 
        if(idButton != element.id){ // si el id no es igual al que fue elegido entra al if 
            element.style.display = 'none';
        }
    });
    document.querySelectorAll("div.chooseToken2 > button").forEach(function(element){ // se vuelve a hacer un foreach pero esta vez de los botones que elige el jugador vos y se oculta el boton que tiene el mismo id , esto es para evitar que ambos jugadores elijan el mismo tipo de ficha 
        if(idButton == element.id){
            element.style.display = 'none';
        }
    });

    if (player1.colour != null &&  player2.colour != null &&  Juego.dimension != null){
        botonJugar.style.visibility = 'visible'
    }
}
// lo mismo que el selectdToken1
function selectedToken2(){
    let idButton = this.id;
    player2.colour = idButton;
    document.querySelectorAll("div.chooseToken2 > button").forEach(function(element){
        if(idButton != element.id){
            element.style.display = 'none';
        }
    });
    document.querySelectorAll("div.chooseToken1 > button").forEach(function(element){
        if(idButton == element.id){
            element.style.display = 'none';
        }
    });
    if (player1.colour != null &&  player2.colour != null &&  Juego.dimension != null){
        botonJugar.style.visibility = 'visible'
    }
}
// foreach opara ocultar los que no fueron seleccionados y guardar en la constante las medidas elegidas
function selectedchooseBoard (){
    let idButton = this.id;
    document.querySelectorAll("div.chooseBoard  > button").forEach(function(element){
        if( idButton != element.id){
            element.style.display = 'none';
        }
    });
    Juego.dimension = idButton ;
    Juego.Tokens = idButton /2;
    if (Juego.dimension == "5*6"){
        Juego.Columns = 6;
        Juego.rows= 5;
        Juego.Tokens = 5*6/2;
    }
    if (Juego.dimension == "7*6"){
        Juego.Columns= 6;
        Juego.rows=7
        Juego.Tokens = 7*6/2;
    }
    if(Juego.dimension == "7*8"){
        Juego.Columns = 8;
        Juego.rows = 7;
        Juego.Tokens = 7*8/2;
    }
    if (player1.colour != null &&  player2.colour != null &&  Juego.dimension != null){
        botonJugar.style.visibility = 'visible'
    }
}

//La funcion timer lo que haces es que, se carga un ID por los segundos y minutos
//Luego esas variables se van llenando cada un segundo. hasta llegar la minuto que esta especifica en el stop
//Se muestra en pantalla el jugador con el turno actual, y se se acaba el tiempo se cierra el juego y avisa que el tiempo termino.
function timer(stop){
    countSeconds = 0;
    countMinutes = 0;
    seconds = document.getElementById("segundos");
    minutes = document.getElementById("minutos");

    window.setInterval( () => {
        if(stop != countMinutes){
            if (countSeconds == 60){
                countSeconds = 0;
                countMinutes++;
                minutes.innerHTML = countMinutes;
                if(countMinutes == 0){
                    countMinutes = 0;
                }
            }
            player.innerHTML = 'Turno de Jugador: ' + currentPlayer.actual;
            Winner();
        seconds.innerHTML = countSeconds;
        countSeconds++;
        }else{
            timeOut.innerHTML = 'Uups, se acabo el tiempo!';
            hiddenMainMenu = true,
            hiddenGame();
        }
    }, 1000)
}

function Winner (){
    if (Juego.winner != 0 && Juego.winner != "Empate"){// este if chequea si,  no hay un ganador 
        countSeconds = 0;// deja el timer en 0 para que corte el tiempo
        countMinutes = 0;
        timerDiv.style.display = 'none' // oculta el timer
        canvas.style.display = 'none'; // oculta el canvas
        mainMenu.style.visibility = 'visible'; // muestra el boton para volver a jugar
        player.style.display = 'none' // oculta el texto donde dice a q jugador le toca
        timeOut.innerHTML = 'El jugador '+  Juego.winner  +  ' gano'; //  texto diciendo quien fue el ganador 
        finishGame.style.display = 'block'; // muestra el texto 
    }else if (Juego.winner =="Empate"){ // si no hubo un ganador preguntapor un empate  
        countSeconds = 0;
        countMinutes = 0;
        timerDiv.style.display = 'none'
        canvas.style.display = 'none';
        mainMenu.style.visibility = 'visible';
        timeOut.innerHTML = ' Nadie a ganado esto es un Empate!'; // texto diciendo que fue un empate
        player.style.display = 'none'
        finishGame.style.display = 'block';
    }
}

document.addEventListener("DOMContentLoaded", hiddenGame());