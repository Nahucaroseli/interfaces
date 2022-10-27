"use strict";

class Helper {
    //cuando se hace click en el mause se activa este metodo 
    static onMouseDown(e){
        isMouseDown = true; // marca que se hizo click
        if(lastClickedFigure != null){ //pregunta si en la variable donde se guarda algun objeto clickeado es null
            lastClickedFigure = null; // si es ditinta de null se vuelve null
        }
        let clickFigure = Helper.findClickedFigure(e.layerX, e.layerY); // se llama al medoto con las posiciones x y del mause
        if(clickFigure != null){ // clickFigure se llena con una figura en caso de que se haga click en una , si es distinta de null se guarda en lastClickedFigure
            lastClickedFigure = clickFigure;
        }
        Helper.redraw(); // se vuelve a dibujar las fichas y el tablero 
    }
    //cuando el mause se mueve se activa este metodo 
    static onMouseMove(e){
        if(isMouseDown && lastClickedFigure != null){ // si se hizo click y hay una figura seleccionada 
            lastClickedFigure.setPosition(e.layerX, e.layerY);//le cambia a la figura las posiciones del mause 
            Helper.redraw(); // vuelve a dibujar
        }
    }
    // cuando se levanta el click se actiiva este metodo 
    static onMouseUp(e){
        isMouseDown = false; // la variable q dice si se esta haciendo click pasa a falsa 
        let rectan = allConteiners.array // guardo cada fleca que esta sobre el tablero 
        for (let i= 0 ; i <rectan.length; i++ ){  // las recorro 
            const elemento = rectan[i]; // voy guardando en la constante elemento 
            if (elemento.isPointInside(e.layerX,e.layerY) &&  lastClickedFigure != null){ // preguntamos si el mouse esta en las mismas posiciones que la flecha y si tengo una figura seleccionada 
                 Game.fullRows (elemento.e,oldPositions.selected, oldPositions.X ,oldPositions.Y ) // llama al metodo que se fija que la fila en la que se quiera insertar no este llena 
                    if (Rows.empty[elemento.e] =="no" ){ // si la fila en la que se va a insertar no esta llena
                        // if (Rows.number == null || Rows.number == elemento.e){ 
                            Game.getRows(elemento.e,currentPlayer.actual); // llama a la funcion que lo dibuja en el ultimo casillero vacio 
                            Helper.selectPlayer(currentPlayer.actual) // se cambia de jugador
                        // }
                    }
            }
            // si la figura no se suelta sobre ninguna flecha este if da true y se vuelve a dinbujar en la posicon vieja
            if (lastClickedFigure != null) { 
                Token.drawInOldPosition(oldPositions.selected, oldPositions.X ,oldPositions.Y );}
            } 
    }
    
    static findClickedFigure(x, y){
        let array;
        if(currentPlayer.actual == 1){ // si el jugador que tiene que jugar es el 1 
            array = player1.arrayTokensPlayer1; // el array que se va a recorrer va a ser el de las fichas del jugador 1
            for(let i = 0; i < array.length; i++){
                const element = array[i]; // se guarda en element la ficha clickeada 
                if(element.isPointInside(x, y)){ // se pregunta si la poscion del mause esta dentro de la ficha
                        oldPositions.selected = element;
                        oldPositions.X = element.posX;
                        oldPositions.Y = element.posY;
                        oldPositions.positionInArray = i;
                        oldPositions.array =player1.arrayTokensPlayer1;
                        // se guardan las posiciones viejas de la ficha , y la posicion donde esta dentro del arreglo 
                        return element;
                }  
            }
        }else{
            // sucede lo mismo pero con el jugador 2 
            array = player2.arrayTokensPlayer2;
            for(let i = 0; i < array.length; i++){
                const element = array[i];
                if(element.isPointInside(x, y,element)){
                    oldPositions.selected = element;
                    oldPositions.X = element.posX;
                    oldPositions.Y = element.posY;
                    oldPositions.positionInArray = i;
                    oldPositions.array =player2.arrayTokensPlayer2;
                    return element;
                }   
            }
        } 
    }
    

    // Este metodo hace el cambio de jugador 
    static selectPlayer(current){
        if(current == 1){
            currentPlayer.actual = player2.name;
        }else{
            currentPlayer.actual = player1.name;
        }
    }
    // Este metodo sirve para cargar todas las imagen que se utilizan 
    static uploadImage(path){
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = path;
            img.onload = () => resolve(img);
            img.onerror = reject;
            
        });
    }
    //Este metodo elimina del arreglo de fichas la ficha que fue ubicada en el tablero 
    static deleteElement(array,i){
        array.splice(i, 1);
        Helper.redraw();
    }
    // dibuja todo el ambito del juego , fichas , tablero y las flechas
    static redraw(){
        canvas = document.querySelector("canvas");
        context = canvas.getContext("2d");   
        context.fillStyle = '#322755';
        context.fillRect(0, 0, canvas.width, canvas.height); 
        Board.drawcontainer(allConteiners.array);
        Token.drawTokens(player1.arrayTokensPlayer1,player2.arrayTokensPlayer2);
        Board.drawBackgroundS(context, imageBoard.img);
        let ctx = canvas.getContext("2d");
        Board.drawLockers(alllockers.array , ctx);
    }

}