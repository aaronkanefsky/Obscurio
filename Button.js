const ButtonStates ={
    UP: 'up',
    CLICKED: 'clicked',
    RELEASED: 'released',
}

class Button{
    constructor(x, y, height, width, bodyText, size, font, backgroundColor){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.bodyText = bodyText;
        this.size = size;
        this.font = font;
        this.backgroundColor = backgroundColor;
        this.clickedState = ButtonStates.UP;
    }

    drawButton(){
        push();

        // Button
        rectMode(CENTER);
        stroke(0);
        strokeWeight(3);
        fill(this.backgroundColor);
        rect(this.x, this.y, this.height, this.width);

        // Text in the button
        fill(0)
        strokeWeight(0);
        textSize(this.size)
        textFont(this.font)
        textAlign(CENTER, CENTER);
        text(this.bodyText, this.x, this.y)
        pop();
    }

}