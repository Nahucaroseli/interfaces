const MAX = 20;

const urlPlayer1 = "./img/personaje1.png";
const urlPlayer2 = "./img/personaje2.png";
const urlBoardCell = "./img/celda.png";
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




let figuras = [];
let lastClickedFigure = null;
let isMouseDown = false;

function addFigure(){
  
    drawFigures();
    drawBoardCells();
    drawFigure();

}



function addCell(x,y){
    let color = urlBoardCell;
    let cell = new Celda(x,y-150,SIZE_FIG,SIZE_FIG,color,ctx);
    figuras.push(cell);
}


function addFicha(_color,_posX, _posY){
    let posX = _posX;
    let posY = _posY;
    let color = _color;
    let ficha = new Ficha(posX, posY, color, ctx, (SIZE_FIG / 2) * .5);
    figuras.push(ficha);
}

function drawBoardCells(){
    for (let x = 0; x < boardFil; x++) {
        for (let y = 0; y < boardCol; y++) {
            boardWidth += SIZE_FIG;
            addCell(boardWidth, boardHeight);
        }
        boardWidth -= SIZE_FIG * boardCol;
        boardHeight += SIZE_FIG;
    }
}

function drawFigures(){
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
}





function drawFigure(){
    clearCanvas();
    for(let i=0; i< figuras.length;i++){
        figuras[i].draw();
    }
}


function clearCanvas(){
    ctx.fillStyle = "#322755";
    ctx.fillRect(0,0, canvasWidth, canvasHeight);
}




function addFigures(){
    addFigure();
    if(figuras.length <MAX){
        setTimeout(addFigures,333);
    }
}


function onMouseUp(e){
        isMouseDown = false;
}


function onMouseMove(e){
    if(isMouseDown && lastClickedFigure != null){
        lastClickedFigure.setPosition(e.layerX,e.layerY);
        drawFigure();
    }
}

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

setTimeout(()=>{
    addFigures();
},1000);



function findClickedFigure(x,y){
    for(let i=0; i< figuras.length;i++){
        const element = figuras[i];
        if(element.isPointInside(x,y)){
            return element;
        }
    }
}


canvas.addEventListener('mousedown',onMouseDown, false);
canvas.addEventListener('mouseup',onMouseUp, false);
canvas.addEventListener('mousemove',onMouseMove, false);