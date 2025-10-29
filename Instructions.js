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
    }

    /**
     * @description Behavior on state entry
     */
    enter(){
        
        // Init all buttons
        this.backButton = new Button(170, 570, 100, 40, 'Back', 20, this.menuFont, this.buttonColor);
    }

    /**
     * @description Behavior while in Main Menu state
     */
    updateInstructions(){
        this.backButton.updateButton();
    }

    /**
     * @description Behavior on state exit
     */
    exit(){
        // Turn all buttons to null to remove them from memory
        this.backButton = null;

    }

    /**
     * @description Draws the main menu to the screen
     */
    drawInstructions(){
        image(this.backgroundImage, 0, 0, 600, 600)
        this.backButton.drawButton();
    }
}