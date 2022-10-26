class Game {
    constructor ( rows, columns, matrixGame){
        this.rows = rows;
        this.columns = columns;
        this.matrixGame = matrixGame;
    }

    //Crea una matriz vacia con las filas y las columnas que hay en el tablero.
    createMatrix (){
        for(let f = 0; f <= this.rows-1; f++){
        this.matrixGame[f] = [];
            for (let c = 0 ; c <= this.columns-1; c++){
                this.matrixGame[f][c]=0
            }
        }
    }

    getMatrix(){
        return this.matrixGame;
    }
    
    //Toma cada fila del tablero, y las marca como vacias, esto quiere decir que hay casilleros para poner fichas.
    static emptyFile (){
        for (let i = 0 ; i  <= Juego.rows-1 ; i++){
            Rows.empty[i]= "no";
        }
        return Rows.empty
    }

    //Toma la fila en la que el jugador inserta la ficha, y checkea este vacia.
    static getRows (conteiner, jugadorActual){
        let NombreJugador;
        for (let file= 0 ; file <Juego.rows ; file++){
            if (conteiner == file ){
                if (jugadorActual == 2){
                    jugadorActual = player2.colour;
                    NombreJugador = player2.name;
                    Game.checkEmpty(file,jugadorActual,NombreJugador)
                }else{
                    jugadorActual = player1.colour;
                    NombreJugador = player1.name;
                    Game.checkEmpty(file,jugadorActual,NombreJugador)
                }
            }
        }
    }

    //De la fila que eligio, busca el casillero que este vacio para poder insertar la ficha.
    static checkEmpty(file, jugadorActual, NombreJugador){
        let position = Juego.Columns-1;
        let p = position;
        do{
            if (Juego.matrix[file][p] == 0 ){
                Juego.matrix[file][position] = NombreJugador;
                MatrixLockers.matrix[file][position].fill= jugadorActual;
                Help.redraw()
                position = 0;
                p= p-1
            }else{
                position = position-1;  
                if (position == 0){
                    Game.lastPosition(position, file, p, NombreJugador, jugadorActual);
                }
                p = position
            }
        } while (position != 0)
        Check.check();
        //Si la fila esta llena, la marca como llena.
        if (position == 0 && Juego.matrix[file][p] != 0){
            Rows.empty[file] = "si";
        }
    }
    
    //Si la fila esta vacia , osea tiene una posicion libre para dibujar la ficha , en la matriz de la logica pone el nombre del jugador y le cambia el fill al circulo por la imagen que le corresponde a ese jugador y vuelve a dibujar , esto hace que la ficha se dibuje en el tablero. 
    static lastPosition (position, file, p, NombreJugador, jugadorActual){
        if (Juego.matrix[file][p-1] == 0 ){
            Juego.matrix[file][position] = NombreJugador;
            MatrixLockers.matrix[file][position].fill= jugadorActual;
            Help.redraw()
        }   
    }

    //Checkea si la fila esta llena, y si lo esta, dibuja la ficha en su posicion inicial , sino elimina la ficha del arreglo de ficha correspondiente .
    static fullRows (numberElement,selected, X ,Y){
        if ( Rows.empty[numberElement] == "si"){
            Token.drawInOldPosition(selected, X ,Y );
            }else{
            Help.deleteElement(oldPositions.array,oldPositions.positionInArray);
        }
    }
}