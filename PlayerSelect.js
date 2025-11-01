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
        this.selectedCard = null;

        // Images for the player to select from
        this.playerChoices = [];
        this.charWalk = [];
        this.charSpell = [];
    }

    /**
     * @description Behavior on state entry
     */
    enter() {

        // Init all buttons
        this.backButton = new Button(170, 570, 100, 40, 'Back', 20, this.menuFont, this.buttonColor);
        this.nextButton = new Button(430, 570, 100, 40, 'Next', 20, this.menuFont, this.buttonColor);

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
     * Handles the flipping of the card
     * 
     * @param {Number} charID ID for the card to be called from
     * @param {Number} x The x coordinate of the animation
     * @param {Number} y The y coordinate of the animation
     * @param {Number} w The width of the card animation
     * @param {Number} h The height of the card animation
     */
    flipAnimation(charID, x, y, w, h) {
        push();
        let char = this.game.characters[charID];
        let progress = char.flipProgress;

        // Start flipping
        if (char.isFlipping){
            // Flip direction check
            progress += char.flipped ? -0.05 : 0.05;
            char.flipProgress = constrain(progress, 0, 1);

            // When fully flipped open
            if (progress >= 1 && !char.flipped) {
                char.flipped = true;
                char.isFlipping = false;

                // Flip back any previously selected card
                if (this.selectedCard !== null && this.selectedCard !== charID) {
                    let prevChar = this.game.characters[this.selectedCard];
                    prevChar.isFlipping = true;
                    prevChar.flipped = true; // start flipping
                }
                this.selectedCard = charID;
            }

            // When fully flipped back
            if (progress <= 0 && char.flipped) {
                char.flipped = false;
                char.isFlipping = false;
                if (this.selectedCard === charID) this.selectedCard = null;
            }
        }

        // rotation calc
        let angle = progress * PI;
        translate(x + w / 2, y + h / 2);
        scale(cos(angle), 1);
        imageMode(CENTER);


        if (progress < 0.5) {
            // Frontside
            image(this.playerChoices[charID], 0, 0, w, h);
        } else {
            // Backside
            fill(30);
            rectMode(CENTER);
            rect(0, 0, w, h);
        }
        pop();

        if (char.flipped && !char.isFlipping){
            push();
            translate(x - w * 0.8, y - h * 0.5); // center above card
            char.walk(); // character draws itself relative to this position
            pop();
        }
    }


    /**
     * @description Behavior while in Main Menu state
     */
    updatePlayerSelScreen() {
        this.backButton.updateButton();
        this.nextButton.updateButton();
        if (this.nextButton.released && this.selectedCard !== null) {
            // Only advance if a card is flipped (character selected)
            let selectedChar = this.game.characters[this.selectedCard];

            selectedChar.characterTaken = true;
            this.game.players[this.num] = new Player(this.num, this.selectedCard);
            selectedChar.isFlipping = true;
            selectedChar.flipped = true; 


            this.num++; // Next

            this.selectedCard = null;
        }
        if (mouseIsPressed) {
            if (mouseX >= 85 && mouseX <= 185 && mouseY >= 65 && mouseY <= 205) {
                if (!this.game.characters[0].isFlipping && !this.game.characters[0].characterTaken) {
                    this.game.characters[0].isFlipping = true;
                }
                if (this.game.characters[0].characterTaken === false) {
                    this.game.players.push(new Player(this.num, 0));
                    this.game.characters[0].characterTaken = true;
                }
                else {
                    if (this.game.players.length === this.num + 1) {
                        this.game.players.pop();
                        this.game.characters[0].characterTaken = false;
                    }
                }
            }
            else if (mouseX >= 250 && mouseX <= 350 && mouseY >= 65 && mouseY <= 205) {
                if (!this.game.characters[1].isFlipping && !this.game.characters[1].characterTaken) {
                    this.game.characters[1].isFlipping = true;
                }
                if (this.game.characters[1].characterTaken === false) {
                    this.game.players.push(new Player(this.num, 1));
                    this.game.characters[1].characterTaken = true;
                }
                else {
                    if (this.game.players.length === this.num + 1) {
                        this.game.players.pop();
                        this.game.characters[1].characterTaken = false;
                    }
                }
            }
            else if (mouseX >= 415 && mouseX <= 515 && mouseY >= 65 && mouseY <= 205) {
                if (!this.game.characters[2].isFlipping && !this.game.characters[2].characterTaken) {
                    this.game.characters[2].isFlipping = true;
                }
                if (this.game.characters[2].characterTaken === false) {
                    this.game.players.push(new Player(this.num, 2));
                    this.game.characters[2].characterTaken = true;
                }
                else {
                    if (this.game.players.length === this.num + 1) {
                        this.game.players.pop();
                        this.game.characters[2].characterTaken = false;
                    }
                }
            }
            else if (mouseX >= 85 && mouseX <= 185 && mouseY >= 230 && mouseY <= 370) {
                if (!this.game.characters[3].isFlipping && !this.game.characters[3].characterTaken) {
                    this.game.characters[3].isFlipping = true;
                }
                if (this.game.characters[3].characterTaken === false) {
                    this.game.players.push(new Player(this.num, 3));
                    this.game.characters[3].characterTaken = true;
                }
                else {
                    if (this.game.players.length === this.num + 1) {
                        this.game.players.pop();
                        this.game.characters[0].characterTaken = false;
                    }
                }
            }
            else if (mouseX >= 250 && mouseX <= 350 && mouseY >= 230 && mouseY <= 370) {
                if (!this.game.characters[4].isFlipping && !this.game.characters[4].characterTaken) {
                    this.game.characters[4].isFlipping = true;
                }
                if (this.game.characters[4].characterTaken === false) {
                    this.game.players.push(new Player(this.num, 4));
                    this.game.characters[4].characterTaken = true;
                }
                else {
                    if (this.game.players.length === this.num + 1) {
                        this.game.players.pop();
                        this.game.characters[4].characterTaken = false;
                    }
                }
            }
            else if (mouseX >= 415 && mouseX <= 515 && mouseY >= 230 && mouseY <= 370) {
                if (!this.game.characters[5].isFlipping && !this.game.characters[5].characterTaken) {
                    this.game.characters[5].isFlipping = true;
                }
                if (this.game.characters[5].characterTaken === false) {
                    this.game.players.push(new Player(this.num, 5));
                    this.game.characters[5].characterTaken = true;
                }
                else {
                    if (this.game.players.length === this.num + 1) {
                        this.game.players.pop();
                        this.game.characters[5].characterTaken = false;
                    }
                }
            }
            else if (mouseX >= 250 && mouseX <= 350 && mouseY >= 395 && mouseY <= 535) {
                if (!this.game.characters[6].isFlipping && !this.game.characters[6].characterTaken) {
                    this.game.characters[6].isFlipping = true;
                }
                if (this.game.characters[6].characterTaken === false) {
                    this.game.players.push(new Player(this.num, 6));
                    this.game.characters[6].characterTaken = true;
                }
                else {
                    if (this.game.players.length === this.num + 1) {
                        this.game.players.pop();
                        this.game.characters[6].characterTaken = false;
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

        this.flipAnimation(0, 85, 65, 100, 140);
        this.flipAnimation(1, 250, 65, 100, 140);
        this.flipAnimation(2, 415, 65, 100, 140);
        this.flipAnimation(3, 85, 230, 100, 140);
        this.flipAnimation(4, 250, 230, 100, 140);
        this.flipAnimation(5, 415, 230, 100, 140);
        this.flipAnimation(6, 250, 395, 100, 140);

        fill(0);
        textSize(25);
        text(`Pick your character player ${this.num + 1}`, 150, 40);
    }
}
