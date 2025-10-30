/**
 * @class PlayerSelScreen
 * 
 * @description Blank screen with a single back button and the blurred image as the background
 */
class PlayerSelScreen {
    /**
     * 
     * @param {Game} game Reference to current game
     */
    constructor(game) {
        this.backgroundImage = loadImage('assets/images/backgroundBlurred.png')
        this.game = game;
        this.backButton;
        this.menuFont = loadFont('assets/fonts/Firlest-Regular.otf')
        this.buttonColor = color(143, 86, 59);

        // Images for the player to select from
        this.playerChoices = [];
    }

    /**
     * @description Behavior on state entry
     */
    enter() {

        // Init all buttons
        this.backButton = new Button(170, 570, 100, 40, 'Back', 20, this.menuFont, this.buttonColor);

        // Images for the player to select from
        this.playerChoices[0] = loadImage('assets/images/character0.png');
        this.playerChoices[1] = loadImage('assets/images/character1.png');
        this.playerChoices[2] = loadImage('assets/images/character2.png');
        this.playerChoices[3] = loadImage('assets/images/character3.png');
        this.playerChoices[4] = loadImage('assets/images/character4.png');
        this.playerChoices[5] = loadImage('assets/images/character5.png');
        this.playerChoices[6] = loadImage('assets/images/character6.png');
    }

    /**
     * @description Behavior while in Main Menu state
     */
    updatePlayerSelScreen() {
        this.backButton.updateButton();
    }

    /**
     * @description Behavior on state exit
     */
    exit() {
        // Turn all buttons to null to remove them from memory
        this.backButton = null;
        this.playerChoices = [];
    }

    /**
     * @description Draws the main menu to the screen
     */
    drawPlayerSelScreen() {
        image(this.backgroundImage, 0, 0, 600, 600)
        this.backButton.drawButton();
    }
}