/**
 * @class PlayerNumberScreen
 * 
 * @description Player number select screen to determine the number of players in the game
 */
class PlayerNumberScreen {
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
        this.playerNumSelection = 0;

        // New buttons for the number of players
        this.button2players;
        this.button3players;
        this.button4players;
        this.button5players;
        this.button6players;
        this.button7players;
        this.button8players;
    }

    /**
     * @description Behavior on state entry
     */
    enter() {

        // Init all buttons
        this.backButton = new Button(170, 570, 100, 40, 'Back', 20, this.menuFont, this.buttonColor);
        this.button2players = new Button(300, 100, 400, 40, '2 Players', 25, this.menuFont, buttonColor);
        this.button3players = new Button(300, 170, 400, 40, '3 Players', 25, this.menuFont, buttonColor);
        this.button4players = new Button(300, 240, 400, 40, '4 Players', 25, this.menuFont, buttonColor);
        this.button5players = new Button(300, 310, 400, 40, '5 Players', 25, this.menuFont, buttonColor);
        this.button6players = new Button(300, 380, 400, 40, '6 Players', 25, this.menuFont, buttonColor);
        this.button7players = new Button(300, 450, 400, 40, '7 Players', 25, this.menuFont, buttonColor);
        this.button8players = new Button(300, 520, 400, 40, '8 Players', 25, this.menuFont, buttonColor);
        this.playerNumSelection = 0;
    }

    /**
     * @description Behavior while in Main Menu state
     */
    updatePlayerNumberScreen() {
        this.backButton.updateButton();
        this.button2players.updateButton();
        this.button3players.updateButton();
        this.button4players.updateButton();
        this.button5players.updateButton();
        this.button6players.updateButton();
        this.button7players.updateButton();
        this.button8players.updateButton();

        this.playerNumSelection = this._checkNumberReleased();
    }

    _checkNumberReleased(){
        if (this.button2players.released) {
            return 2;
        }
        else if (this.button3players.released) {
            return 3;
        }
        else if (this.button4players.released) {
            return 4;
        }
        else if (this.button5players.released) {
            return 5;
        }
        else if (this.button6players.released) {
            return 6;
        }
        else if (this.button7players.released) {
            return 7;
        }
        else if (this.button8players.released) {
            return 8;
        }
        else return 0;
    }

    /**
     * @description Behavior on state exit
     */
    exit() {
        // Turn all buttons to null to remove them from memory
        this.backButton = null;
        this.button2players = null;
        this.button3players = null;
        this.button4players = null;
        this.button5players = null;
        this.button6players = null;
        this.button7players = null;
        this.button8players = null;
    }

    /**
     * @description Draws the main menu to the screen
     */
    drawPlayerNumberScreen() {
        push();
        image(this.backgroundImage, 0, 0, 600, 600)
        fill(0);
        textSize(30);
        text('How many players?', 170, 50);
        this.backButton.drawButton();
        this.button2players.drawButton();
        this.button3players.drawButton();
        this.button4players.drawButton();
        this.button5players.drawButton();
        this.button6players.drawButton();
        this.button7players.drawButton();
        this.button8players.drawButton();
        pop();
    }
}