class DoorObj {
  constructor(gameLoop,x,y,dx,dy,tx,ty,e,img) {
    this.gameLoop = gameLoop;
    this.x = x;  
    this.y = y;
    this.tx = tx; // Target y
    this.ty = ty; // Target x
    this.dx = dx; // Speed of x
    this.dy = dy; // Speed of y
    this.xDir = x > tx ? 1 : 0;
    this.yDir = y > ty ? 1 : 0;

    if(e === -1)
      this.image = loadImage(ASSET_PATH + 'images/door_card_back.png');
    else
      this.image = img;
    
    // Do we need these?
    this.count = 0;
    this.exitCard = e;
  }

  

  set(x,y,dx,dy,tx,ty) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.tx = tx;
    this.ty = ty;
  }

  update(){
    if(this.xDir === 0 && this.x < this.tx){
      this.x += this.dx;
    }
    else if (this.x > this.tx){
      this.x -= this.dx;
    }

    if(this.yDir === 0 && this.y < this.ty){
      this.y += this.dy;
    }
    else if (this.y > this.ty){
      this.y -= this.dy;
    }

  }

  draw(){

    push();
    translate(this.x, this.y)
    if(this.x === this.tx && this.y === this.ty && this.exitCard !== 2) {
      drawingContext.shadowBlur = 80;
      if(this.exitCard === 0)
        drawingContext.shadowColor = color(59, 214, 235);
      else if(this.exitCard === 1)
        drawingContext.shadowColor = color(255, 219, 61);
      
    }
    if(this.gameLoop.gameLoopState === this.gameLoop.exitSelectScreen)
    {
      drawingContext.shadowColor = color(59, 214, 235);
      image(this.image, 0, 0, 160, 160);
    }
    else {
      image(this.image, 0, 0, 220, 220);
    }
    pop();
  }
}
