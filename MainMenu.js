/**
 * @class MainMenu
 * 
 * @description Container for Obscurio's main menu, as well as handling
 * moving to different states
 */
class MainMenu{
    constructor(game){
        this.backgroundImage = image('assets/images/title_screen.png')
        this.game = game; // Reference to current game
        this.instructionsButton;
        this.optionsButton;
        this.playButton;
    }

    /**
     * @description Behavior on state entry
     */
    enter(){
        // Init all buttons

        // Set the background to be the correct image
    }

    /**
     * @description Behavior while in Main Menu state
     */
    updateMainMenu(){

    }

    /**
     * @description Behavior on state exit
     */
    exit(){
        // Turn all buttons to null to remove them from memory

    }

    /**
     * @description Draws the main menu to the screen
     */
    drawMainMenu(){

    }
}