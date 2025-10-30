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
        this.nextButton;
        this.menuFont = loadFont('assets/fonts/Firlest-Regular.otf')
        this.buttonColor = color(143, 86, 59);
        this.num;

        // Images for the player to select from
        this.playerChoices = [];
    }

    /**
     * @description Behavior on state entry
     */
    enter() {

        // Init all buttons
        this.backButton = new Button(170, 570, 100, 40, 'Back', 20, this.menuFont, this.buttonColor);
        this.nextButton = new Button(230, 570, 100, 40, 'Next', 20, this.menuFont, this.buttonColor);

        // Images for the player to select from
        this.playerChoices[0] = loadImage('assets/images/character0.png');
        this.playerChoices[1] = loadImage('assets/images/character1.png');
        this.playerChoices[2] = loadImage('assets/images/character2.png');
        this.playerChoices[3] = loadImage('assets/images/character3.png');
        this.playerChoices[4] = loadImage('assets/images/character4.png');
        this.playerChoices[5] = loadImage('assets/images/character5.png');
        this.playerChoices[6] = loadImage('assets/images/character6.png');

        this.num = 0;
    }




    /**
     * @description Behavior while in Main Menu state
     */
    updatePlayerSelScreen() {
        this.backButton.updateButton();
        if(this.game.players.length === num) {
            this.nextButton.updateButton();
        }
        if (mouseIsPressed) {
            if (gameState === gameStates.PLAYER_SELECT) {
                if (mouseX >= 85 && mouseX <= 185 && mouseY >= 65 && mouseY <= 205) {
                    if(this.game.characters[0].characterTaken === false) {
                        this.game.players.push(new Player(this.num, 0));
                        this.game.characters[0].characterTaken = true;
                    }
                    else {
                        if(this.game.players.length === num) {
                            this.game.players.splice(num);
                            this.game.characters[0].characterTaken = false;
                        }
                    }
                }
                else if (mouseX >= 250 && mouseX <= 350 && mouseY >= 65 && mouseY <= 205) {
                    if(this.game.characters[1].characterTaken === false) {
                        this.game.players.push(new Player(this.num, 1));
                        this.game.characters[1].characterTaken = true;
                    }
                    else {
                        if(this.game.players.length === num) {
                            this.game.players.splice(num);
                            this.game.characters[1].characterTaken = false;
                        }
                    }
                }
                else if (mouseX >= 415 && mouseX <= 515 && mouseY >= 65 && mouseY <= 205) {
                    if(this.game.characters[2].characterTaken === false) {
                        this.game.players.push(new Player(this.num, 2));
                        this.game.characters[2].characterTaken = true;
                    }
                    else {
                        if(this.game.players.length === num) {
                            this.game.players.splice(num);
                            this.game.characters[2].characterTaken = false;
                        }
                    }
                }
                else if (mouseX >= 85 && mouseX <= 185 && mouseY >= 230 && mouseY <= 370) {
                    if(this.game.characters[3].characterTaken === false) {
                        this.game.players.push(new Player(this.num, 3));
                        this.game.characters[3].characterTaken = true;
                    }
                    else {
                        if(this.game.players.length === num) {
                            this.game.players.splice(num);
                            this.game.characters[0].characterTaken = false;
                        }
                    }
                }
                else if (mouseX >= 250 && mouseX <= 350 && mouseY >= 230 && mouseY <= 370) {
                    if(this.game.characters[4].characterTaken === false) {
                        this.game.players.push(new Player(this.num, 4));
                        this.game.characters[4].characterTaken = true;
                    }
                    else {
                        if(this.game.players.length === num) {
                            this.game.players.splice(num);
                            this.game.characters[4].characterTaken = false;
                        }
                    }
                }
                else if (mouseX >= 415 && mouseX <= 515 && mouseY >= 230 && mouseY <= 370) {
                    if(this.game.characters[5].characterTaken === false) {
                        this.game.players.push(new Player(this.num, 5));
                        this.game.characters[5].characterTaken = true;
                    }
                    else {
                        if(this.game.players.length === num) {
                            this.game.players.splice(num);
                            this.game.characters[5].characterTaken = false;
                        }
                    }
                }
                else if (mouseX >= 250 && mouseX <= 350 && mouseY >= 395 && mouseY <= 535) {
                    if(this.game.characters[6].characterTaken === false) {
                        this.game.players.push(new Player(this.num, 6));
                        this.game.characters[6].characterTaken = true;
                    }
                    else {
                        if(this.game.players.length === num) {
                            this.game.players.splice(num);
                            this.game.characters[6].characterTaken = false;
                        }
                    }
                }
            }
        }


    }

    /**
     * @description Behavior on state exit
     */
    exit() {
        // Turn all buttons to null to remove them from memory
        this.backButton = null;
        this.nextButton = null;
        this.playerChoices = [];

        // Reset all player choices
        for (let i = 0; i < 7; i++) {
            this.game.characters[i].characterTaken = false;
        }
    }

    /**
     * @description Draws the main menu to the screen
     */
    drawPlayerSelScreen() {
        image(this.backgroundImage, 0, 0, 600, 600)
        this.backButton.drawButton();
        this.nextButton.drawButton();
        push();
        fill(100, 100, 100, 150);
        noStroke();
        if (mouseX >= 85 && mouseX <= 185 && mouseY >= 65 && mouseY <= 205 && this.game.characters[0].characterTaken == false) {
            image(this.playerChoices[0], 75, 50, 120, 170);
        }
        else {
            image(this.playerChoices[0], 85, 65, 100, 140);
        }

        if (this.game.characters[0].characterTaken == true) {
            rect(85, 65, 100, 140, 15);
        }
        
        if (mouseX >= 250 && mouseX <= 350 && mouseY >= 65 && mouseY <= 205 && this.game.characters[1].characterTaken == false) {
            image(this.playerChoices[1], 240, 50, 120, 170);
        }
        else {
            image(this.playerChoices[1], 250, 65, 100, 140);
        }

        if (this.game.characters[1].characterTaken == true) {
            rect(250, 65, 100, 140, 15);
        }

        if (mouseX >= 415 && mouseX <= 515 && mouseY >= 65 && mouseY <= 205 && this.game.characters[2].characterTaken == false) {
            image(this.playerChoices[2], 405, 50, 120, 170);
        }
        else {
            image(this.playerChoices[2], 415, 65, 100, 140);
        }

        if (this.game.characters[2].characterTaken == true) {
            rect(415, 65, 100, 140, 15);
        }

        if (mouseX >= 85 && mouseX <= 185 && mouseY >= 230 && mouseY <= 375 && this.game.characters[3].characterTaken == false) {
            image(this.playerChoices[3], 75, 215, 120, 170);
        }
        else {
            image(this.playerChoices[3], 85, 230, 100, 140);
        }

        if (this.game.characters[3].characterTaken == true) {
            rect(85, 230, 100, 140, 15);
        }

        if (mouseX >= 250 && mouseX <= 350 && mouseY >= 230 && mouseY <= 375 && this.game.characters[4].characterTaken == false) {
            image(this.playerChoices[4], 240, 215, 120, 170);
        }
        else {
            image(this.playerChoices[4], 250, 230, 100, 140);
        }

        if (this.game.characters[4].characterTaken == true) {
            rect(250, 230, 100, 140, 15);
        }

        if (mouseX >= 415 && mouseX <= 515 && mouseY >= 230 && mouseY <= 375 && this.game.characters[5].characterTaken == false) {
            image(this.playerChoices[5], 405, 215, 120, 170);
        }
        else {
            image(this.playerChoices[5], 415, 230, 100, 140);
        }

        if (this.game.characters[5].characterTaken == true) {
            rect(415, 230, 100, 140, 15);
        }

        if (mouseX >= 250 && mouseX <= 350 && mouseY >= 395 && mouseY <= 535 && this.game.characters[6].characterTaken == false) {
            image(this.playerChoices[6], 240, 380, 120, 170);
        }
        else {
            image(this.playerChoices[6], 250, 395, 100, 140);
        }

        if (this.game.characters[6].characterTaken == true) {
            rect(250, 395, 100, 140, 15);
        }
        pop();
        fill(0);
        textSize(25);
        text(`Pick your character player ${this.num + 1}`, 150, 40);
    }
}
