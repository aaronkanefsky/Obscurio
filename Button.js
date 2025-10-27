const ButtonStates = {
  UP: 'up',
  CLICKED: 'clicked',
  RELEASED: 'released',
};

class Button {
  constructor(x, y, width, height, bodyText, size, font, backgroundColor) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.bodyText = bodyText;
    this.size = size;
    this.font = font;
    this.backgroundColor = backgroundColor;
    this.clickedState = ButtonStates.UP;
  }

  isHovered() {
    // Check if mouse is inside the button boundaries
    return (
      mouseX > this.x - this.width / 2 &&
      mouseX < this.x + this.width / 2 &&
      mouseY > this.y - this.height / 2 &&
      mouseY < this.y + this.height / 2
    );
  }

  drawButton() {
    push();
    rectMode(CENTER);
    stroke(0);
    strokeWeight(3);
    fill(this.backgroundColor);
    rect(this.x, this.y, this.width, this.height);

    fill(0);
    noStroke();
    textSize(this.size);
    textFont(this.font);
    textAlign(CENTER, CENTER);
    text(this.bodyText, this.x, this.y);
    pop();

    // Change cursor if hovered
    if (this.isHovered()) {
      cursor('pointer');
    } else {
      cursor('default');
    }
  }
}
