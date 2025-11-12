/**
 * @class ButteryflyMarker
 * 
 * @description Object class to contain butterfly markers and allow the player to change the angle and location of the butterfly markers
 */
class ButteryflyMarker {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.selected = false;
    this.marker = loadImage(ASSET_PATH + 'images/ButterflyMarker.png');
  }

  draw() {
    push();
    translate(this.x,this.y);
    rotate(this.angle);
    image(this.marker, 0, 0, 10, 10);
    pop();
  }

  update() {
    if(this.selected === true && keyIsDown(LEFT_ARROW)) {
      this.angle -= radians(1);
    }
    else if(this.selected === true && keyIsDown(RIGHT_ARROW)) {
      this.angle += radians(1);
    }
  }
}
