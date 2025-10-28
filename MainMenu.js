/**
 * @class MainMenu
 * 
 * @description Container for Obscurio's main menu, as well as handling
 * moving to different states
 */
class MainMenu{
    constructor(game){
        this.backgroundImage = loadImage('assets/images/background.png')
        this.game = game; // Reference to current game
        this.instructionsButton;
        this.optionsButton;
        this.playButton;
        this.menuFont = loadFont('assets/fonts/Firlest-Regular.otf')
        this.buttonColor = color(143, 86, 59);
    }

    /**
     * @description Behavior on state entry
     */
    enter(){
        
        // Init all buttons
        this.instructionsButton = new Button(250, 550, 100, 40, 'Instructions', 20, this.menuFont, this.buttonColor);
        this.optionsButton = new Button(100, 550, 100, 40, 'Options', 20, this.menuFont, this.buttonColor);
        this.playButton = new Button(300, 100, 100, 40, 'Play', 20, this.menuFont, this.buttonColor);

        // Set the background to be the correct image
    }

    /**
     * @description Behavior while in Main Menu state
     */
    updateMainMenu(){
        this.instructionsButton.updateButton();
        this.optionsButton.updateButton();
        this.playButton.updateButton();
    }

    /**
     * @description Behavior on state exit
     */
    exit(){
        // Turn all buttons to null to remove them from memory
        this.instructionsButton = null;
        this.optionsButton = null;
        this.playButton = null;

    }

    /**
     * @description Draws the main menu to the screen
     */
    drawMainMenu(){
        image(this.backgroundImage, 0, 0)
        this.instructionsButton.drawButton();
        this.optionsButton.drawButton();
        this.playButton.drawButton();
    }
}