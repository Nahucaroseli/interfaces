class Celda extends Figura{

    constructor(posX,posY,width,height,fill,context){
        super(posX,posY,fill,context);
        this.width = width;
        this.urlimage = fill;
        this.height = height;
        this.image = new Image();
    }

    draw(){
        super.draw();
        if(this.image.src === ""){
            this.image.src = this.urlimage;
            let loadImg = function (){
                this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
            }
            this.image.onload = loadImg.bind(this);
        }else{
            this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
        }
    }

    getWidth(){
        return this.width;
    }

    getHeight(){
        return this.height;
    }





}