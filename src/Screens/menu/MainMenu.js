/**
 * @class MainMenu
 * 
 * @description Container for Obscurio's main menu, as well as handling
 * moving to different states
 */
class MainMenu{
    /**
     * 
     * @param {Game} game Reference to current game
     */
    constructor(game){
        this.backgroundImage = loadImage(ASSET_PATH + 'images/title_screen.png')
        this.game = game;
        this.instructionsButton;
        this.optionsButton;
        this.playButton;
        this.menuFont = loadFont(ASSET_PATH + 'fonts/Firlest-Regular.otf')
        this.buttonColor = color(143, 86, 59);
    }

    /**
     * @description Behavior on state entry
     */
    enter(){
        
        // Init all buttons
        this.instructionsButton = new Button(350, 570, 160, 40, 'Instructions', 20, this.menuFont, this.buttonColor);
        this.optionsButton = new Button(170, 570, 100, 40, 'Options', 20, this.menuFont, this.buttonColor);
        this.playButton = new Button(300, 240, 100, 40, 'Play', 20, this.menuFont, this.buttonColor);

        
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
        image(this.backgroundImage, 0, 0, 600, 600)
        this.instructionsButton.drawButton();
        this.optionsButton.drawButton();
        this.playButton.drawButton();

        
        // Credits
        push();
        rectMode(CENTER, CENTER);
        strokeWeight(3);
        fill(this.buttonColor);
        rect(510, 440, 120, 150, 15)
        pop();

        push();
        textAlign(CENTER);
        textFont(this.menuFont);
        
        textSize(20);
        
        text('Created By: Emma Wallace & Aaron Kanefsky', 460, 400, 100, 200)
        pop();
    }
}