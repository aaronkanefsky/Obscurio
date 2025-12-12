/**
 * @class CreditsMenu
 * 
 * @description Container for Obscurio's image credits
 */
class CreditsMenu{
    /**
     * 
     * @param {Game} game Reference to current game
     */
    constructor(game){
        this.backgroundImage = loadImage(ASSET_PATH + 'images/backgroundBlurred.png')
        this.game = game;
        this.backButton;
        this.menuFont = loadFont(ASSET_PATH + 'fonts/Firlest-Regular.otf');
        this.bodyTextFont = loadFont(ASSET_PATH + 'fonts/MountainKingRegular-woBYn.ttf')
        this.buttonColor = color(143, 86, 59);
        this.textBackgroundColor = color(230);
        this.textbox;
    }

    /**
     * @description Behavior on state entry
     */
    enter(){
        
        // Init all buttons
        this.backButton = new Button(170, 570, 100, 40, 'Back', 20, this.menuFont, this.buttonColor);

        // Join preloaded text lines and make textbox
        const fullText = creditsText.join('\n');

        // Init the textbox
        this.textbox = new ScrollableTextBox(
            80, 30, 440, 500, fullText, 16, this.textBackgroundColor, 10
        );
    }

    /**
     * @description Behavior while in Main Menu state
     */
    updateCreditsMenu(){
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
    drawCreditsMenu(){
        image(this.backgroundImage, 0, 0, 600, 600)
        this.backButton.drawButton();
        this.textbox.draw();
    }
}
