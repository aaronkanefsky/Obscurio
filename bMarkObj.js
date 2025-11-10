class bMarkObj {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.marker = loadImage('assets/butterflymarker.png');
  }

  draw() {
    push();
    translate(this.x,this.y);
    rotate(this.angle);
    image(this.marker, 0, 0, 10, 10);
    pop();
  }

  update() {
    if(keyIsDown(LEFT_ARROW)) {
      this.angle -= radians(1);
    }
    else if(keyIsDown(RIGHT_ARROW)) {
      this.angle += radians(1);
    }
  }
}
