/**
 * @class FolioObj
 * 
 * @description Object class to contain doors stored in folio for traitor to pick trick doors from
 */
class FolioObj {
  constructor(x,y,d) {
    this.x = x;
    this.y = y;
    this.door = d;
    this.selected = false;
  }

  draw(){
    push();
    translate(this.x, this.y)
    if(this.selected === true) {
      drawingContext.shadowBlur = 80;
      drawingContext.shadowColor = color(255, 0, 0);
    }
    imageMode(CENTER);
    image(this.door, 0, 0, 150, 150);
    pop();
  }
}
