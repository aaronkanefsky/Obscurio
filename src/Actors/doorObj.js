class DoorObj {
  constructor(x, y, dx, dy, tx, ty, i,e,d) {
    this.index = i;
    this.tx = tx; // Target y
    this.ty = ty; // Target x
    this.dx = dx; // Speed of x
    this.dy = dy; // Speed of y
    this.x = x;  
    this.y = y;
    
    this.image = loadImage(ASSET_PATH + 'images/door' + this.index + '.png');
    
    // Do we need these?
    this.count = 0;
    this.exitCard = e;
    this.door = d;
  }


  update(){
    if(this.x < this.tx){
      this.x += this.dx;
    }

    if(this.y < this.ty){
      this.y += this.dy;
    }

  }

  draw(){

    push();
    translate(this.x, this.y)
    if(this.x === this.tx && this.y === this.ty) {
      drawingContext.shadowBlur = 80;
      if(this.door === 0)
        drawingContext.shadowColor = color(59, 214, 235)
      else if(this.door === 1)
        drawingContext.shadowColor = color(255, 219, 61)
      
    }
    
    image(this.image, 0, 0, 220, 220)
    pop();
  }
}
