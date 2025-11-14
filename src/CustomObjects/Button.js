const ButtonStates = {
  UP: 'up',
  HOVER: 'hover',
  CLICKED: 'clicked',
};

class Button {
  /**
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @param {string} bodyText
     * @param {number} size
     * @param {p5.Font} font
     * @param {p5.Color} backgroundColor
     */
  constructor(x, y, width, height, bodyText, size, font, backgroundColor) {
    // Button details
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.bodyText = bodyText;
    this.size = size;
    this.font = font;
    

    // Colors and background
    this.backgroundColor = backgroundColor;
    this.backgroundColorHovered = color(
      red(this.backgroundColor) * 0.8,
      green(this.backgroundColor) * 0.8,
      blue(this.backgroundColor) * 0.8
    );
    this.backgroundColorClicked = color(
      red(this.backgroundColor) * 0.6,
      green(this.backgroundColor) * 0.6,
      blue(this.backgroundColor) * 0.6
    );

    this.currentColor = this.backgroundColor;
    this.clickState = ButtonStates.UP;

    // Output states
    this.pressed = false;
    this.released = false;

    // Internal tracking
    this._wasPressed = false;
  }

  // Check if mouse is over the button
  isMouseOver() {
    return (
      mouseX > this.x - this.width / 2 &&
      mouseX < this.x + this.width / 2 &&
      mouseY > this.y - this.height / 2 &&
      mouseY < this.y + this.height / 2
    );
  }

  // Called every frame to update button logic
  updateButton() {
    // Reset one-frame outputs
    this.pressed = false;
    this.released = false;

    // Determine hover and click states
    if (this.isMouseOver()) {
      
      if (mouseIsPressed) {
        this.clickState = ButtonStates.CLICKED;

        // Fire pressed only on initial mouse down
        if (!this._wasPressed) {
          this.pressed = true;
          this._wasPressed = true;
        }
      } else {
        // Released happens only when mouse was pressed last frame
        if (this._wasPressed) {
          this.released = true;
          this._wasPressed = false;
        }
        this.clickState = ButtonStates.HOVER;
      }
    } else {
      // If mouse not over, reset state
      if (!mouseIsPressed) {
        this._wasPressed = false;
      }
      this.clickState = ButtonStates.UP;
  
    }

    // Visuals & cursor
    switch (this.clickState) {
      case ButtonStates.HOVER:
        this.currentColor = this.backgroundColorHovered;
        break;
      case ButtonStates.CLICKED:
        this.currentColor = this.backgroundColorClicked;
        break;
      default:
        this.currentColor = this.backgroundColor;
        break;
    }

    
  }

  // Draw the button
  drawButton() {
    push();
    rectMode(CENTER);
    stroke(0);
    strokeWeight(3);
    fill(this.currentColor);
    rect(this.x, this.y, this.width, this.height, 6);
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(this.size);
    textFont(this.font);
    text(this.bodyText, this.x, this.y);
    pop();
  }

  
}

