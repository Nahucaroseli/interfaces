class Ficha extends Figura{

    constructor(posX, posY, fill, context, radius){
        super(posX,posY,fill,context);
        this.radius = radius;
        this.urlimage = fill;
        this.image = new Image();
    }


    draw(){
        super.draw();
        this.ctx.beginPath();
        this.ctx.arc(this.posX,this.posY,this.radius, 0,2 * Math.PI);
        this.ctx.fill();        
        if (this.image.src === "") {
            this.image.src = this.urlimage;
            let loadImg = function () {
                this.ctx.drawImage(this.image, this.posX - this.radius, this.posY - this.radius, SIZE_FIG / 2, SIZE_FIG / 2);
            }
            this.image.onload = loadImg.bind(this);
        } else {
            this.ctx.drawImage(this.image, this.posX - this.radius, this.posY - this.radius, SIZE_FIG / 2, SIZE_FIG / 2);
        }
        if(this.resaltado === true){
            this.ctx.strokeStyle = this.resaltadoEstilo;
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
        }
        
        this.ctx.closePath();
    }


    getRadius(){
        return this.radius;
    }


    isPointInside(x,y){
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.getRadius();
    }




}