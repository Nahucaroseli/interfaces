"use strict";

class Token {
    constructor(token1, token2, colour, totalTokens, context){
        this.colour = colour; // contiene la imagen elegida para la ficha
        this.token1 = token1; // arreglo para guardar las fichas del primer jugador
        this.token2 = token2; // arreglo para guardar las fichas del segundo jugador
        this.totalTokens = totalTokens; // cantidad de fichas que va a tener cada jugador
        this.context = context; 
        
    }

    
    getToken1(){
        return this.token1; // retorna el arreglo con todas las fichas del jugador 1 de esa instacia con lo que se lo llame
    }

    getToken2(){
        return this.token2;
    }

    

    createToken(){
        switch(this.colour){  // el swicht seria como un if , si le parametro que le llega coincide con el caso 1 se ejecuta el codigo dentro del caso y si el parametro  es igual al caso 2 se ejecuta el codigo del caso 2
            case player1.colour: // el caso 1 funciona para las fichas del jugador 1
                let x = 95;
                let y = 110; 
                for(let i = 0; i < this.totalTokens; i++){  
                    // let texto = "Fichas jugador 1";
                    // this.context.font="10pt Verdana"; // tipo y tamaño de letra para el texto 
                    // this.context.fillText(texto,10,50); // filltext permite poner texto dentro del canvas , pasamos como parametro el texto que queremos poner y las posiciones
                    let token ; 
                    token = new Circle(x, y, 20, this.colour, this.context); // la ficha circular utlizando la clase circulo que recibe posiciones , tamaño y la imagen que se le va a colocar
                    this.token1.push(token);  // guardamos esa ficha ( "circulo") dentro del arreglo del jugador 1 ya que es el caso 1
                     y = y + 15; // le sumo a y para que se dibujen en fila 
                }
                break;
                
            case player2.colour: 
                let px = 800;
                let py = 110;
                for(let i = 0; i < this.totalTokens; i++){
                    // let texto = "Fichas jugador 2";
                    // this.context.font="10pt Verdana";
                    // this.context.fillText(texto,700,50);
                    let token                                 // en el caso 2 sucede lo mismo que en el caso 1 pero cambian los datos ya que es para crear las fichas del jugador 2
                    token = new Circle(px, py, 20, this.colour, this.context);
                    this.token2.push(token);
                    py = py + 15; 
                }
                break;
        }
    }
    
    drawToken(tokens){
        tokens.forEach(t => { // este metodo es llamado con cada arreglo de cada  jugador
            t.draw();   // se recorre ficha por ficha y se llama al meto draw que lo diduja
        });
    }

    static drawTokens(tokens1,tokens2){ // es un metodo statico para que se pueda ingresar sin una instancia creada de la clase 
        let canvas = document.querySelector("canvas");
        let context = canvas.getContext("2d"); 
        // let texto = "Fichas jugador 1";
        // context.fillStyle = "black"
        // context.font="10pt Verdana";
        // context.fillText(texto,10,50);
        tokens2.forEach(T => {
            T.draw()
        });
        // texto = "Fichas jugador 2";
        // context.fillStyle = "black"
        // context.font="10pt Verdana";
        // context.fillText(texto,700,50);
        tokens1.forEach(t => {
            t.draw();
        }); 
        
    } // la utilizamos para que se mueve una ficha y se dibujen las fichas nuevamente

    
    static drawInOldPosition (elemento, X ,Y ){  // a este metodo le llega una ficha y los posiciones viejas , que son las posiciones en las que estaba la ficha antes de moverla
        elemento.posX = X;  // se cambia las posiciones nuevas por las viejas
        elemento.posY = Y ;
       Help.redraw(); // llama a un metodo statico de la clase help para volver a dibujarlas en las posiciones viejas 
    }  // este metodo lo utilizamos para que cuando un jugador suelte la ficha en otro lugar que no sea el lugar donde debe soltarse , esta ficha se vuelva a dibujar en el lugar donde estaba 
} 