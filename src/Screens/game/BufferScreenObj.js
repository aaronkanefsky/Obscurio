class BufferScreen {
    constructor(text, gameLoop) {
        this.text = text;
        this.buttonColor = color(97, 64, 38);
        this.buttonFont = loadFont(ASSET_PATH + 'fonts/Firlest-Regular.otf')
        this.game = gameLoop;
        this.continueButton = new Button(300, 550, 200, 50, "Continue", 25, this.buttonFont, this.buttonColor)
    }

    draw() {
        background(0);
        push();
        stroke(255);
        fill(255);
        textSize(50);
        textFont(this.buttonFont)
        textAlign(CENTER, CENTER);
        text(this.text, 300, 300)
        pop();
        this.continueButton.updateButton();
        this.continueButton.drawButton();
    }


}