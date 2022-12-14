"use strict";

class Check {
    // Esta clase solo va a ser utilizada para chequear si hay un ganador , los metodos son estaticos para poder llamarlos sin crear una instancia de la clase
    static chkLine(a, b, c, d,e=null,f=null,g=null,dimension){
        if(dimension=="7*6"){
            return ((a != 0) && (a == b) && (a == c) && (a == d)); // este metodo compara si los paramentros que le llegan son iguales y la primera condicion es que el parametro no sea igual a 0 , ya que si es 0 no hay ninguna ficha en ese lugar
        }
        if(dimension=="7*8"){
            return ((a != 0) && (a == b) && (a == c) && (a == d) && (a == e)); // este metodo compara si los paramentros que le llegan son iguales y la primera condicion es que el parametro no sea igual a 0 , ya que si es 0 no hay ninguna ficha en ese lugar
        }
        if(dimension == "8*9"){
            return ((a != 0) && (a == b) && (a == c) && (a == d) && (a == e) && (a == f)); // este metodo compara si los paramentros que le llegan son iguales y la primera condicion es que el parametro no sea igual a 0 , ya que si es 0 no hay ninguna ficha en ese lugar
        }
        if(dimension == "9*10"){
            return ((a != 0) && (a == b) && (a == c) && (a == d) && (a == e) && (a == f) && (a == g)); // este metodo compara si los paramentros que le llegan son iguales y la primera condicion es que el parametro no sea igual a 0 , ya que si es 0 no hay ninguna ficha en ese lugar
        }
            
    }

    static check(){
        let tope;  
        if (Juego.dimension == "7*6"){
            tope = 1 
        }else {
            tope = 2
        }
        let bd = Juego.matrix;// guardo la matrix del juego 
        if(Juego.dimension == "7*6"){
                //verifica en vertical , rrecorre cada columna que hay por fila  , por eso la suma va a aumentar en columna , la fila es la misma pero la columna va cambiando 
            for (let r = 0; r <= Juego.rows-1; r++){   // recorre cada fila 
                for (let c = 0; c <= Juego.Columns-1/2; c++){
                    if (Check.chkLine(bd[r][c], bd[r][c+1], bd[r][c+2], bd[r][c+3],null,null,null,Juego.dimension)){ // llama a la funcion que chekea si cuatro son iguales pasandole como parametro el valor que tiene la matriz en las 4 posiciones seguidas
                        Juego.winner = bd[r][c]; // si son iguales llama a la funcion winner 
                        return bd[r][c];
                    }
                }
            }
            //end verificacion en vertical

            //check verificacion en horizontal
            // verifica en horizontal , rrecorre cada fila por eso la suma se le  va haciendo a la fila , la columna es la misma pero la fila va cambiando  
            for (let r = 0; r <= tope; r++){
                for (let c = Juego.Columns - 1; c >= 0; c--){ 
                    if (Check.chkLine(bd[r][c], bd[r+1][c], bd[r+2][c], bd[r+3][c],null,null,null,Juego.dimension)){
                        Juego.winner = bd[r][c];
                        return bd[r][c];
                    }
                }
            }

            // verificacion diagonal 
            // verifica en diagonal , se le suma a la fila y se le resta a la columna para que valla de forma diagonal  , verifica de abajo para arriba 
            for (let r = 0; r <= tope; r++){
                for (let c =  Juego.Columns - 1; c >= 3; c--){
                    if (Check.chkLine(bd[r][c], bd[r+1][c-1], bd[r+2][c-2], bd[r+3][c-3],null,null,null,Juego.dimension)){
                        Juego.winner = bd[r][c];
                        return bd[r][c];
                    }
                }
            }
            // verifica en diagonal , se le suma a la fila y se le suma a la columna para que valla de forma diagonal  , verifica de arriba para abajo
            for (let r = 0; r <= tope; r++){
                for (let c = 0; c <= Juego.Columns-1/2; c++){
                    if (Check.chkLine(bd[r][c], bd[r+1][c+1], bd[r+2][c+2], bd[r+3][c+3],null,null,null,Juego.dimension)){
                        Juego.winner = bd[r][c];
                        return bd[r][c];
                    }
                }
            }
        }
        if(Juego.dimension == "7*8"){
                  //verifica en vertical , rrecorre cada columna que hay por fila  , por eso la suma va a aumentar en columna , la fila es la misma pero la columna va cambiando 
                  for (let r = 0; r <= Juego.rows-1; r++){   // recorre cada fila 
                    for (let c = 0; c <= Juego.Columns-1/2; c++){
                        if (Check.chkLine(bd[r][c], bd[r][c+1], bd[r][c+2], bd[r][c+3],bd[r][c+4],null,null,Juego.dimension)){ // llama a la funcion que chekea si cuatro son iguales pasandole como parametro el valor que tiene la matriz en las 4 posiciones seguidas
                            Juego.winner = bd[r][c]; // si son iguales llama a la funcion winner 
                            return bd[r][c];
                        }
                    }
                }
                //end verificacion en vertical
    
                //check verificacion en horizontal
                // verifica en horizontal , rrecorre cada fila por eso la suma se le  va haciendo a la fila , la columna es la misma pero la fila va cambiando  
                for (let r = 0; r <= tope; r++){
                    for (let c = Juego.Columns-1; c >= 0; c--){
                        if (Check.chkLine(bd[r][c], bd[r+1][c], bd[r+2][c], bd[r+3][c], bd[r+4][c] ,null,null,Juego.dimension)){
                            Juego.winner = bd[r][c];
                            return bd[r][c];
                        }
                    }
                }
    
                // verificacion diagonal 
                // verifica en diagonal , se le suma a la fila y se le resta a la columna para que valla de forma diagonal  , verifica de abajo para arriba 
                for (let r = 0; r <= tope; r++){
                    for (let c =  Juego.Columns - 1; c >= 3; c--){
                        if (Check.chkLine(bd[r][c], bd[r+1][c-1], bd[r+2][c-2], bd[r+3][c-3],bd[r+4][c-4],null,null,Juego.dimension)){
                            Juego.winner = bd[r][c];
                            return bd[r][c];
                        }
                    }
                }
                // verifica en diagonal , se le suma a la fila y se le suma a la columna para que vaya de forma diagonal  , verifica de arriba para abajo
                for (let r = 0; r <= tope; r++){
                    for (let c = 0; c <= Juego.Columns-1/2; c++){
                        if (Check.chkLine(bd[r][c], bd[r+1][c+1], bd[r+2][c+2], bd[r+3][c+3],bd[r+4][c+4],null,null,Juego.dimension)){
                            Juego.winner = bd[r][c];
                            return bd[r][c];
                        }
                    }
                }
        }
        if(Juego.dimension == "8*9"){
            //verifica en vertical , rrecorre cada columna que hay por fila  , por eso la suma va a aumentar en columna , la fila es la misma pero la columna va cambiando 
            for (let r = 0; r <= Juego.rows-1; r++){   // recorre cada fila 
                for (let c = 0; c <= Juego.Columns-1/2; c++){
                    if (Check.chkLine(bd[r][c], bd[r][c+1], bd[r][c+2], bd[r][c+3],bd[r][c+4],bd[r][c+5],null,Juego.dimension)){ // llama a la funcion que chekea si cuatro son iguales pasandole como parametro el valor que tiene la matriz en las 4 posiciones seguidas
                        Juego.winner = bd[r][c]; // si son iguales llama a la funcion winner 
                        return bd[r][c];
                    }
                }
            }
            //end verificacion en vertical

            //check verificacion en horizontal
            // verifica en horizontal , rrecorre cada fila por eso la suma se le  va haciendo a la fila , la columna es la misma pero la fila va cambiando  
            for (let r = 0; r <= tope; r++){
                for (let c = Juego.Columns - 1; c >= 0; c--){ 
                    if (Check.chkLine(bd[r][c], bd[r+1][c], bd[r+2][c], bd[r+3][c],bd[r+4][c],bd[r+5][c],null,Juego.dimension)){
                        Juego.winner = bd[r][c];
                        return bd[r][c];
                    }
                }
            }

            // verificacion diagonal 
            // verifica en diagonal , se le suma a la fila y se le resta a la columna para que valla de forma diagonal  , verifica de abajo para arriba 
            for (let r = 0; r <= tope; r++){
                for (let c =  Juego.Columns - 1; c >= 3; c--){
                    if (Check.chkLine(bd[r][c], bd[r+1][c-1], bd[r+2][c-2], bd[r+3][c-3],bd[r+4][c-4],bd[r+5][c-5],null,Juego.dimension)){
                        Juego.winner = bd[r][c];
                        return bd[r][c];
                    }
                }
            }
            // verifica en diagonal , se le suma a la fila y se le suma a la columna para que valla de forma diagonal  , verifica de arriba para abajo
            for (let r = 0; r <= tope; r++){
                for (let c = 0; c <= Juego.Columns-1/2; c++){
                    if (Check.chkLine(bd[r][c], bd[r+1][c+1], bd[r+2][c+2], bd[r+3][c+3],bd[r+4][c+4],bd[r+5][c+5],null,Juego.dimension)){
                        Juego.winner = bd[r][c];
                        return bd[r][c];
                    }
                }
            }
        }
        if(Juego.dimension== "9*10"){
            //verifica en vertical , rrecorre cada columna que hay por fila  , por eso la suma va a aumentar en columna , la fila es la misma pero la columna va cambiando 
            for (let r = 0; r <= Juego.rows-1; r++){   // recorre cada fila 
                for (let c = 0; c <= Juego.Columns-1/2; c++){
                    if (Check.chkLine(bd[r][c], bd[r][c+1], bd[r][c+2], bd[r][c+3],bd[r][c+4],bd[r][c+5],bd[r][c+6],Juego.dimension)){ // llama a la funcion que chekea si cuatro son iguales pasandole como parametro el valor que tiene la matriz en las 4 posiciones seguidas
                        Juego.winner = bd[r][c]; // si son iguales llama a la funcion winner 
                        return bd[r][c];
                    }
                }
            }
            //end verificacion en vertical

            //check verificacion en horizontal
            // verifica en horizontal , rrecorre cada fila por eso la suma se le  va haciendo a la fila , la columna es la misma pero la fila va cambiando  
            for (let r = 0; r <= tope; r++){
                for (let c = Juego.Columns - 1; c >= 0; c--){ 
                    if (Check.chkLine(bd[r][c], bd[r+1][c], bd[r+2][c], bd[r+3][c],bd[r+4][c],bd[r+5][c],bd[r+6][c],Juego.dimension)){
                        Juego.winner = bd[r][c];
                        return bd[r][c];
                    }
                }
            }

            // verificacion diagonal 
            // verifica en diagonal , se le suma a la fila y se le resta a la columna para que valla de forma diagonal  , verifica de abajo para arriba 
            for (let r = 0; r <= tope; r++){
                for (let c =  Juego.Columns - 1; c >= 3; c--){
                    if (Check.chkLine(bd[r][c], bd[r+1][c-1], bd[r+2][c-2], bd[r+3][c-3],bd[r+4][c-4],bd[r+5][c-5],bd[r+6][c-6],Juego.dimension)){
                        Juego.winner = bd[r][c];
                        return bd[r][c];
                    }
                }
            }
            // verifica en diagonal , se le suma a la fila y se le suma a la columna para que valla de forma diagonal  , verifica de arriba para abajo
            for (let r = 0; r <= tope; r++){
                for (let c = 0; c <= Juego.Columns-1/2; c++){
                    if (Check.chkLine(bd[r][c], bd[r+1][c+1], bd[r+2][c+2], bd[r+3][c+3],bd[r+4][c+4],bd[r+5][c+5],bd[r+6][c+6],Juego.dimension)){
                        Juego.winner = bd[r][c];
                        return bd[r][c];
                    }
                }
            }
        }
         
        if (player1.arrayTokensPlayer1.length === 0 && player2.arrayTokensPlayer2.length === 0 ) { // si ambos arreglos de fichas estan vacios quiere decir que el tablero esta lleno y ninguno de los jugadores gano
            Juego.winner = "Empate"; // entonces hay un empate 
            return   Juego.winner ;
        }      
    }
}