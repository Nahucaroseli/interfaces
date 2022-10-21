const MAX = 30;

const urlPlayer1 = "./img/personaje1.png"
const urlPlayer2 = "./img/personaje2.png"
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




let fichas = [];
let lastClickedFigure = null;
let isMouseDown = false;

function addFigure(){
    drawFigures();
    drawFigure();
}


function addFicha(_color,_posX, _posY){
    let posX = _posX;
    let posY = _posY;
    let color = _color;
    let ficha = new Ficha(posX, posY, color, ctx, (SIZE_FIG / 2) * .5);
    fichas.push(ficha);
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
    for(let i=0; i< fichas.length;i++){
        fichas[i].draw();
    }
}


function clearCanvas(){
    ctx.fillStyle = "#322755";
    ctx.fillRect(0,0, canvasWidth, canvasHeight);
}


function addFigures(){
    addFigure();
    if(fichas.length <MAX){
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
    for(let i=0; i< fichas.length;i++){
        const element = fichas[i];
        if(element.isPointInside(x,y)){
            return element;
        }
    }
}


canvas.addEventListener('mousedown',onMouseDown, false);
canvas.addEventListener('mouseup',onMouseUp, false);
canvas.addEventListener('mousemove',onMouseMove, false);