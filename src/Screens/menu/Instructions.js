/**
 * @class Instructions
 * 
 * @description Container for Obscurio's main menu, as well as handling
 * moving to different states
 */
class Instructions {
    /**
     * 
     * @param {Game} game Reference to current game
     */
    constructor(game) {
        this.backgroundImage = loadImage(ASSET_PATH +'images/backgroundBlurred.png')
        this.game = game;
        this.backButton;
        this.menuFont = loadFont(ASSET_PATH + 'fonts/Firlest-Regular.otf')
        this.bodyTextFont = loadFont(ASSET_PATH + 'fonts/MountainKingRegular-woBYn.ttf')
        this.buttonColor = color(143, 86, 59);
        this.textBackgroundColor = color(230);
        this.textbox;
        this.torches = [];
    }

    /**
     * @description Behavior on state entry
     */
    enter() {

        // Init all buttons
        this.backButton = new Button(170, 570, 100, 40, 'Back', 20, this.menuFont, this.buttonColor);

        // Join preloaded text lines and make textbox
        const fullText = instructionText.join('\n');

        // Init the textbox
        this.textbox = new ScrollableTextBox(
            80, 30, 440, 500, fullText, 16, this.textBackgroundColor, 10
        );

        this.torches = [new Torch(40,300), new Torch(560,300)];
    }

    /**
     * @description Behavior while in Main Menu state
     */
    updateInstructions() {
        this.backButton.updateButton();
        this.textbox.doDrag();
    }

    /**
     * @description Behavior on state exit
     */
    exit() {
        // Turn all buttons to null to remove them from memory
        this.backButton = null;
        this.torches = [];
        this.textbox = null;
    }

    /**
     * @description Draws the main menu to the screen
     */
    drawInstructions() {
        let torch1X = 40;
        let torch2X = 560;
        let torchHeight = 300;
        image(this.backgroundImage, 0, 0, 600, 600);

        //draw first torch
        stroke(82, 27, 0);
        fill(94, 42, 16);
        beginShape();
        vertex(torch1X-21,torchHeight+10);
        vertex(torch1X-10,torchHeight+60);
        vertex(torch1X+13,torchHeight+60);
        vertex(torch1X+21,torchHeight+10);
        endShape(CLOSE);
        
        // draw second torch
        stroke(82, 27, 0);
        fill(94, 42, 16);
        beginShape();
        vertex(torch2X-21,torchHeight+10);
        vertex(torch2X-10,torchHeight+60);
        vertex(torch2X+13,torchHeight+60);
        vertex(torch2X+21,torchHeight+10);
        endShape(CLOSE);
        
        //torch2.update();
        for(let t of this.torches) {
            t.update();
        }

        stroke(70);
        strokeWeight(12);
        
        fill(0,0,0,0);
        arc(torch1X, torchHeight+5, 50, 15, 0.1, 3);
        
        strokeWeight(7);
        stroke(92);

        arc(torch1X-2, torchHeight-10, 60, 15, 0, 3);
        
        stroke(70);
        line(torch1X-26, torchHeight+6, torch1X-30, torchHeight-10);
        line(torch1X+28, torchHeight+6, torch1X+29, torchHeight-12);
        line(torch1X-13, torchHeight+6, torch1X-15, torchHeight-8);
        line(torch1X+14, torchHeight+6, torch1X+15, torchHeight-8);

        stroke(70);
        strokeWeight(12);
        
        fill(0,0,0,0);
        arc(torch2X, torchHeight+5, 50, 15, 0.1, 3);
        
        strokeWeight(7);
        stroke(92);

        arc(torch2X-2, torchHeight-10, 60, 15, 0, 3);
        
        stroke(70);
        line(torch2X-26, torchHeight+6, torch2X-30, torchHeight-10);
        line(torch2X+28, torchHeight+6, torch2X+29, torchHeight-12);
        line(torch2X-13, torchHeight+6, torch2X-15, torchHeight-8);
        line(torch2X+14, torchHeight+6, torch2X+15, torchHeight-8);

        this.backButton.drawButton();
        this.textbox.draw();
    }
}

