const ButtonStates = {
    UP: 'up',
    HOVER: 'hover',
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
        this.backgroundColorHovered = color(
            red(this.backgroundColor) * 0.8,
            green(this.backgroundColor) * 0.8,
            blue(this.backgroundColor) * 0.8);
        this.backgroundColorClicked = color(
            red(this.backgroundColor) * 0.6,
            green(this.backgroundColor) * 0.6,
            blue(this.backgroundColor) * 0.6);
        this.currentColor = this.backgroundColor;
        this.clickedState = ButtonStates.UP;
    }

    mouseHover() {
        if (
            mouseX > this.x - this.width / 2 &&
            mouseX < this.x + this.width / 2 &&
            mouseY > this.y - this.height / 2 &&
            mouseY < this.y + this.height / 2
        ) {
            this.clickedState = ButtonStates.HOVER;
        }
        else{
            this.clickedState = ButtonStates.UP;
        }
    }

    handleClick() {

    }

    updateButton() {
        // If hovered, darken the button and change cursor
        this.mouseHover();
        switch (this.clickedState) {
            case ButtonStates.HOVER:
                this.currentColor = this.backgroundColorHovered;
                cursor('pointer');
                break;

            default:
                this.currentColor = this.backgroundColor;
                cursor('default');
                break;
        }
    }

    drawButton() {
        push();
        rectMode(CENTER);
        stroke(0);
        strokeWeight(3);


        fill(this.currentColor);
        rect(this.x, this.y, this.width, this.height);

        fill(0);
        noStroke();
        textSize(this.size);
        textFont(this.font);
        textAlign(CENTER, CENTER);
        text(this.bodyText, this.x, this.y);
        pop();
    }
}
