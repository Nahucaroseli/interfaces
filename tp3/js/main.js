
//Declaracion de Variables
let btn1 = document.querySelector("#btn-1");
let btn2 = document.querySelector("#btn-2");
let btn3 = document.querySelector("#btn-3");
const MAX = 20;
const urlPlayer1 = "./img/personaje1.png";
const urlPlayer2 = "./img/personaje2.png";
const urlBoardCell = "./img/celda.png";
const urlBackground = "./img/fondoCanvas.jpg";
const SIZE_FIG=75;
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext('2d');

let boardCol = 5;
let boardFil = 4;
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let boardWidth = (canvasWidth / 2) - (boardCol / 2) * SIZE_FIG - SIZE_FIG; //formula para que quede SIEMPRE centrado el canvas
let boardHeight = canvasHeight - (SIZE_FIG * (boardFil + 1.5));
let NUM_FIG = boardCol * boardFil;
let circlesWidth = boardWidth;
let circlesHeight = canvasHeight / 2;

let canvasBackground = new Image();



let figuras = [];
let lastClickedFigure = null;
let isMouseDown = false;



init();


function init(){

let boardWidth = (canvasWidth / 2) - (boardCol / 2) * SIZE_FIG - SIZE_FIG; //formula para que quede SIEMPRE centrado el canvas
let boardHeight = canvasHeight - (SIZE_FIG * (boardFil + 1.5));
let NUM_FIG = boardCol * boardFil;
let circlesWidth = boardWidth;
let circlesHeight = canvasHeight / 2;

//Dibuja las celdas del Tablero

    for (let x = 0; x < boardFil; x++) {
        for (let y = 0; y < boardCol; y++) {
            boardWidth += SIZE_FIG;
            addCell(boardWidth, boardHeight);
        }
        boardWidth -= SIZE_FIG * boardCol;
        boardHeight += SIZE_FIG;
    }


//Dibuja las fichas de los 2 jugadores
    for (let index = 0; index < NUM_FIG / 2; index++) {
        let _posX = SIZE_FIG / 2 + Math.round(Math.random() * circlesWidth);
        let _posY = canvasHeight - SIZE_FIG / 2 - Math.round(Math.random() * circlesHeight);
        let _color = urlPlayer1;
        addFicha(_color, _posX, _posY);

        _posX = canvasWidth - SIZE_FIG / 2 - Math.round(Math.random() * circlesWidth);
        _posY = canvasHeight - SIZE_FIG / 2 - Math.round(Math.random() * circlesHeight);
        _color = urlPlayer2;
        addFicha(_color, _posX, _posY);
    }

    drawFigure();

//addEventsListeners
canvas.addEventListener('mousedown',onMouseDown, false);
canvas.addEventListener('mouseup',onMouseUp, false);
canvas.addEventListener('mousemove',onMouseMove, false);
btn1.addEventListener("click", ()=>{
    boardCol = 5;
    boardFil = 4;
    figuras = [];
    init();
    clearCanvas();
});
btn2.addEventListener("click",()=>{
    boardCol = 6;
    boardFil = 5;
    figuras = [];
    init();
});
btn3.addEventListener("click",()=>{
    boardCol = 7;
    boardFil = 5;
    figuras = [];
    init();
});
}


//Limpia el canvas
function clearCanvas(){
    if (canvasBackground.src === "") {
        canvasBackground.src = urlBackground;
        let cargarImg = function () {
            ctx.drawImage(canvasBackground, 0, 0, canvasWidth, canvasHeight);
        }
        canvasBackground.onload = cargarImg.bind(this);
    } else {
        ctx.drawImage(canvasBackground, 0, 0, canvasWidth, canvasHeight);
    }
}


//Setea en falso cuando levanta el click
function onMouseUp(e){
        isMouseDown = false;
}


//Cambia la posicion de la figura al mover el mouse
function onMouseMove(e){
    if(isMouseDown && lastClickedFigure != null){
        lastClickedFigure.setPosition(e.layerX,e.layerY);
        drawFigure();
    }
}


//Resalta las figuras al hacer click
function onMouseDown(e){
    isMouseDown = true;

    if(lastClickedFigure != null){
        lastClickedFigure.setResaltado(false);
        lastClickedFigure = null;
    }
    let clickFig = findClickedFigure(e.layerX,e.layerY);
    if(clickFig != null){
        clickFig.setResaltado(true);
        lastClickedFigure = clickFig;
    }

    drawFigure();
}
//Funcion para encontrar la ultima figura clickeada
function findClickedFigure(x,y){
    for(let i=0; i< figuras.length;i++){
        const element = figuras[i];
        if(element.isPointInside(x,y)){
            return element;
        }
    }
}

//Añade Celdas 
function addCell(x,y){
    let color = urlBoardCell;
    let cell = new Celda(x,y-150,SIZE_FIG,SIZE_FIG,color,ctx);
    figuras.push(cell);
}

//Añade Fichas
function addFicha(_color,_posX, _posY){
    let posX = _posX;
    let posY = _posY;
    let color = _color;
    let ficha = new Ficha(posX, posY, color, ctx, (SIZE_FIG / 2) * .5);
    figuras.push(ficha);
}


function drawFigure(){
    clearCanvas();
    for(let i=0; i< figuras.length;i++){
            figuras[i].draw();
    }
}



