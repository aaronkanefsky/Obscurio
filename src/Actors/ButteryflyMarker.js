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
    this.selected = true;
    this.marker = loadImage(ASSET_PATH + 'images/ButterflyMarker.png');
    this.placed = false;
  }

  draw() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    image(this.marker, -3, -3)
    pop();
  }

  update() {
    if (this.placed === false) {
      if (this.selected === true && (keyIsDown(LEFT_ARROW) || keyIsDown(65))) {
        this.angle += radians(1);
      }
      else if (this.selected === true && (keyIsDown(RIGHT_ARROW) || keyIsDown(68))) {
        this.angle -= radians(1);
      }

      this.x = mouseX;
      this.y = mouseY;

      // Check if the marker should be placed
      const mouseJustReleased = !mouseIsPressed && this.mouseWasPressed;

      if (mouseJustReleased) {
        this.placed = true;
      }

      // Store current state for next frame
      this.mouseWasPressed = mouseIsPressed;
    }
  }
}
