/**
 * @class Instructions
 * 
 * @description Container for Obscurio's main menu, as well as handling
 * moving to different states
 */
class Instructions{
    /**
     * 
     * @param {Game} game Reference to current game
     */
    constructor(game){
        this.backgroundImage = loadImage('assets/images/backgroundBlurred.png')
        this.game = game;
        this.backButton;
        this.menuFont = loadFont('assets/fonts/Firlest-Regular.otf')
        this.bodyTextFont = loadFont('assets/fonts/MountainKingRegular-woBYn.ttf')
        this.buttonColor = color(143, 86, 59);
        this.textBackgroundColor = color(230);
        this.textbox;
    }

    /**
     * @description Behavior on state entry
     */
    enter(){
        let bigText = "Long text here...".repeat(1000);
        // Init all buttons
        this.backButton = new Button(170, 570, 100, 40, 'Back', 20, this.menuFont, this.buttonColor);
    
        // Init the textbox
        this.textbox = new ScrollableTextBox(30, 30, 540, 500, bigText, 16, this.textBackgroundColor, 10)
    }

    /**
     * @description Behavior while in Main Menu state
     */
    updateInstructions(){
        this.backButton.updateButton();
        this.textbox.doDrag();
    }

    /**
     * @description Behavior on state exit
     */
    exit(){
        // Turn all buttons to null to remove them from memory
        this.backButton = null;
        this.textbox = null;

    }

    /**
     * @description Draws the main menu to the screen
     */
    drawInstructions(){
        image(this.backgroundImage, 0, 0, 600, 600)
        this.backButton.drawButton();
        this.textbox.draw();
    }
}

// Instruction text:

