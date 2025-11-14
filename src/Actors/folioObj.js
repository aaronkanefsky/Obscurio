/**
 * @class FolioObj
 * 
 * @description Object class to contain doors stored in folio for traitor to pick trick doors from
 */
class FolioObj {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.door = d;
    this.selected = false; // To track if it was pressed
    this.focus = false;
    this.image = loadImage(ASSET_PATH + 'images/door' + d + '.png');
  }

  update() {
    if (sq(this.x - mouseX) + sq(this.y - mouseY) < sq(80)) 
      this.focus = true;
    else
      this.focus = false;

  }

  draw() {
    
    push();
    imageMode(CENTER);
    translate(this.x, this.y)
    // Check if mouse is in range to hover
    if(this.focus === true){
      // If so, make the image bigger
      drawingContext.shadowBlur = 80;
      drawingContext.shadowColor = color(59, 214, 235)
      image(this.image, 0, 0, 160, 160)
    }
    else
      image(this.image, 0, 0, 140, 140)
    pop();
  }
}
