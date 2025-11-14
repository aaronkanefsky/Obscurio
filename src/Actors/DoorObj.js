class DoorObj {
  constructor(x,y,dx,dy,tx,ty,e,d) {
   this.tx = tx; // Target y
    this.ty = ty; // Target x
    this.dx = dx; // Speed of x
    this.dy = dy; // Speed of y
    this.x = x;  
    this.y = y;
    this.xDir = x > tx ? 1 : 0;
    this.yDir = y > ty ? 1 : 0;

    /*if(i < 0)
      this.image = loadImage(ASSET_PATH + 'images/door_card_back.png');
    else
      this.image = loadImage(ASSET_PATH + 'images/door' + i + '.png');*/
    
    // Do we need these?
    this.count = 0;
    this.exitCard = e;
    this.door = d;
  }


  update(){
    if(this.xDir === 0 && this.x < this.tx){
      this.x += this.dx;
    }
    else if (this.x > this.tx){
      this.x -= this.dx;
    }

    if(this.yDir === 0 && this.y < this.ty){
      this.y += dy;
    }
    else if (this.y > this.ty){
      this.y -= this.dy;
    }

  }

  draw(){

    push();
    translate(this.x, this.y)
    if(this.x === this.tx && this.y === this.ty && this.door !== 2) {
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
