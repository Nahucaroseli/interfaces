class Board {
    constructor (canvas, contexto, image, rows, columns, arrayLockers,arrayContainers,matrizGame,forma,img){
        this.canvas = canvas;
        this.contexto = contexto;
        this.image = image;
        this.rows = rows;
        this.columns = columns;
        this.arrayLockers = arrayLockers;
        this.arrayContainers = arrayContainers
        this.matrizGame = matrizGame;
        this.forma = forma ;
        this.img = img;
    }

    //Este metodo crea una matriz y en cada posicion guardamos el casillero correspondiente.
    getMatrix(){
        let i = 0;
        for(let f = 0; f <= this.rows-1; f++){
            this.matrizGame[f] = [];
            for (let c = 0 ; c <= this.columns-1; c++){
                this.matrizGame[f][c]=alllockers.array[i];
                i = i + 1;
            }
            if (i <= alllockers.array.length ){
                i = i ;
            }
        }
        return this.matrizGame;
    }

    //Este metodo crea los circulos arriba de la imagen del board.
    createLockers(){
        let ctx = this.canvas.getContext("2d");
        let posX = 290;
        let posY = 140;
        for(let f = 0; f < this.rows; f++){
            let locker
            locker = new Circle (posX,posY,20,"#ffffff", ctx);
            this.arrayLockers.push(locker );
            locker.draw();
            for (let c = 0 ; c < this.columns -1; c++){
                posY += 50; 
                locker = new Circle (posX,posY,20,"#ffffff", ctx);
                this.arrayLockers.push(locker );
                locker.draw();
            }
        posX += 50;
        posY = 140;
        }
    }

    //Hacemos le draw de la imagen del tablero, los if son para el tamaño del tablero que se haya elegido.
    drawBackground(){
        if (Juego.dimension === "7*6"){
            this.contexto.drawImage(this.image, 240, 110, 400, 320)
        }
        if (Juego.dimension === "5*6"){
            this.contexto.drawImage(this.image, 240, 110, 300, 320) 
        }
        if (Juego.dimension === "7*8"){
            this.contexto.drawImage(this.image, 240, 110, 400, 410) 
        }
    }

    getArrayLockers(){
        return this.arrayLockers;
    }

    getArrayContainers(){
        return this.arrayContainers;
    }

    //Estos dibujan las flechas que estan por encima del tablero, que es donde se tiene que soltar la ficha.
    //Es un cuadrado con una imagen adentro.
    drawcontainers(){
        let ctx = this.canvas.getContext("2d");
        let posx = 280;
        let posy= 70;
        for (let e = 0 ; e < this.rows; e++){
            let container = new Rectangle (posx, posy, 30, 30,this.img,ctx,e);
            container.draw();
            this.arrayContainers.push(container)
            posx += 50 ;
        }
        
    }

    //Este metodo es estatico para poder accederlo desde otra clase, y cuando se mueve una ficha se vuelve a dibujar la imagen del tablero. 
    static drawBackgroundS(contexto, i){
        if (Juego.dimension === "7*6"){
            contexto.drawImage(i, 240, 110, 400, 320)
        }
        if (Juego.dimension === "5*6"){
            contexto.drawImage(i, 240, 110, 300, 320) 
        }
        if (Juego.dimension === "7*8"){
            contexto.drawImage(i, 240, 110, 400, 410) 
        }
    }
    // Este metodo tambien es estatico y dibuja los lockers
    static drawLockers (array , contexto){
        array.forEach(l => {
            l.ctx = contexto;
            l.draw();
        });
    }
    //Este metodo dibuja los containers
    static drawcontainer(arrayContainers){
        arrayContainers.forEach(t => {
            t.draw();
        });
    }
}