/**
 * @class BlankScreen
 * 
 * @description Blank screen with a single back button and the blurred image as the background
 */
class BlankScreen{
    /**
     * 
     * @param {Game} game Reference to current game
     */
    constructor(game){
        this.backgroundImage = loadImage('assets/images/backgroundBlurred.png')
        this.game = game;
        this.backButton;
        this.menuFont = loadFont('assets/fonts/Firlest-Regular.otf')
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
    updateBlankScreen(){
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
    drawBlankScreen(){
        image(this.backgroundImage, 0, 0, 600, 600)
        this.backButton.drawButton();
    }
}