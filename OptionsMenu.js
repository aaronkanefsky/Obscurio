/**
 * @class OptionsMenu
 * 
 * @description Container for Obscurio's main menu, as well as handling
 * moving to different states
 */
class OptionsMenu{
    /**
     * 
     * @param {Game} game Reference to current game
     */
    constructor(game){
        this.backgroundImage = loadImage('assets/images/background.png')
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
    updateOptionsMenu(){
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
    drawOptionsMenu(){
        image(this.backgroundImage, 0, 0, 600, 600)
        filter(BLUR) // Blur the background
        this.backButton.drawButton();
    }
}