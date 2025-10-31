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

    // flipAnimation(charID, x, y, w, h) {
    //     push();
    //     // translate(x, y);

    //     if (this.game.characters[charID].isFlipping) {
    //         if (!this.game.characters[charID].flipped) {
    //             this.game.characters[charID].flipProgress += 0.05;
    //         }
    //         else {
    //             this.game.characters[charID].flipProgress -= 0.05;
    //         }



    //         let scaleX = cos(this.game.characters[charID].flipProgress * PI) - x / 20;


    //         if (this.game.characters[charID].flipProgress < 0.5) {
    //             scale(scaleX, 1);
    //             imageMode(CORNER);
    //             image(this.playerChoices[charID], x, y, w, h);
    //         }
    //         else if (this.game.characters[charID].flipProgress >= 0.5) {
    //             scale(scaleX, 1);
    //             rect(x, y, w, h);
    //             imageMode(CORNER);
    //             image(charSpell[charID].get(64, 64, 64, 64), x, y, w, h);
    //         }


    //         if ((this.game.characters[charID].flipProgress >= 1 && !this.game.characters[charID].flipped) || (this.game.characters[charID].flipProgress <= 0 && this.game.characters[charID].flipped)) {
    //             this.game.characters[charID].isFlipping = false;
    //             this.game.characters[charID].flipped = !this.game.characters[charID].flipped;
    //         }
    //     }
    //     else {

    //         imageMode(CORNER);
    //         if (this.game.characters[charID].flipped) {
    //             rect(x, y, w, h);
    //             this.game.characters[charID].spell();
    //         }
    //         else {
    //             image(this.playerChoices[charID], x, y, w, h);
    //         }
    //     }
    //     pop();
    // }
    flipAnimation(charID, x, y, w, h) {
        push();
        let char = this.game.characters[charID];
        let progress = char.flipProgress;

        // Update flip progress
        if (char.isFlipping) {
            progress += char.flipped ? -0.05 : 0.05;
            char.flipProgress = constrain(progress, 0, 1);

            if (progress === 1 && !char.flipped) {
                char.flipped = true;
                char.isFlipping = false;
            } else if (progress === 0 && char.flipped) {
                char.flipped = false;
                char.isFlipping = false;
            }
        }
        let angle = progress * PI;

        // Center the transform on the card
        translate(x + w / 2, y + h / 2);
        let scaleX = cos(angle);
        scale(scaleX, 1);

        // Decide which side to draw
        imageMode(CENTER);
        if (progress < 0.5) {
            image(this.playerChoices[charID], 0, 0, w, h);
        } else {
            // Draw flipped side
            fill(50);
            rectMode(CENTER);
            rect(0, 0, w, h);
            if (this.charSpell && this.charSpell[charID])
                image(this.charSpell[charID].get(64, 64, 64, 64), 0, 0, w, h);
        }

        pop();
    }


    /**
     * @description Behavior while in Main Menu state
     */
    updatePlayerSelScreen() {
        this.backButton.updateButton();
        if (this.game.players.length === this.num) {
            this.nextButton.updateButton();
        }
        if (mouseIsPressed) {
            // for (var i = 0; i < this.game.characters.length; i++) {
            //     if (this.game.characters[i].isFlipping === false) {
            //         this.game.characters[i].isFlipping = true;
            //     }
            // }

            if (mouseX >= 85 && mouseX <= 185 && mouseY >= 65 && mouseY <= 205) {
                if (!this.game.characters[0].isFlipping) {
                    this.game.characters[0].isFlipping = true;
                }
                if (this.game.characters[0].characterTaken === false) {
                    this.game.players.push(new Player(this.num, 0));
                    this.game.characters[0].characterTaken = true;
                    this.num++;
                }
                else {
                    if (this.game.players.length === this.num) {
                        this.game.players.splice(this.num);
                        this.game.characters[0].characterTaken = false;
                    }
                }
            }
            else if (mouseX >= 250 && mouseX <= 350 && mouseY >= 65 && mouseY <= 205) {

                if (this.game.characters[1].characterTaken === false) {
                    this.game.players.push(new Player(this.num, 1));
                    this.game.characters[1].characterTaken = true;
                    this.num++;
                }
                else {
                    if (this.game.players.length === this.num) {
                        this.game.players.splice(this.num);
                        this.game.characters[1].characterTaken = false;
                    }
                }
            }
            else if (mouseX >= 415 && mouseX <= 515 && mouseY >= 65 && mouseY <= 205) {

                if (this.game.characters[2].characterTaken === false) {
                    this.game.players.push(new Player(this.num, 2));
                    this.game.characters[2].characterTaken = true;
                    this.num++;
                }
                else {
                    if (this.game.players.length === this.num) {
                        this.game.players.splice(this.num);
                        this.game.characters[2].characterTaken = false;
                    }
                }
            }
            else if (mouseX >= 85 && mouseX <= 185 && mouseY >= 230 && mouseY <= 370) {

                if (this.game.characters[3].characterTaken === false) {
                    this.game.players.push(new Player(this.num, 3));
                    this.game.characters[3].characterTaken = true;
                    this.num++;
                }
                else {
                    if (this.game.players.length === this.num) {
                        this.game.players.splice(this.num);
                        this.game.characters[0].characterTaken = false;
                    }
                }
            }
            else if (mouseX >= 250 && mouseX <= 350 && mouseY >= 230 && mouseY <= 370) {

                if (this.game.characters[4].characterTaken === false) {
                    this.game.players.push(new Player(this.num, 4));
                    this.game.characters[4].characterTaken = true;
                    this.num++;
                }
                else {
                    if (this.game.players.length === this.num) {
                        this.game.players.splice(this.num);
                        this.game.characters[4].characterTaken = false;
                    }
                }
            }
            else if (mouseX >= 415 && mouseX <= 515 && mouseY >= 230 && mouseY <= 370) {

                if (this.game.characters[5].characterTaken === false) {
                    this.game.players.push(new Player(this.num, 5));
                    this.game.characters[5].characterTaken = true;
                    this.num++;
                }
                else {
                    if (this.game.players.length === this.num) {
                        this.game.players.splice(this.num);
                        this.game.characters[5].characterTaken = false;
                    }
                }
            }
            else if (mouseX >= 250 && mouseX <= 350 && mouseY >= 395 && mouseY <= 535) {

                if (this.game.characters[6].characterTaken === false) {
                    this.game.players.push(new Player(this.num, 6));
                    this.game.characters[6].characterTaken = true;
                    this.num++;
                }
                else {
                    if (this.game.players.length === this.num) {
                        this.game.players.splice(this.num);
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
        // /*
        this.flipAnimation(0, 85, 65, 100, 140);
        this.flipAnimation(1, 250, 65, 100, 140);
        this.flipAnimation(2, 415, 65, 100, 140);
        this.flipAnimation(3, 85, 230, 100, 140);
        this.flipAnimation(4, 250, 230, 100, 140);
        this.flipAnimation(5, 415, 230, 100, 140);
        this.flipAnimation(6, 250, 395, 100, 140);
        // */


        /*
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
        */
        fill(0);
        textSize(25);
        text(`Pick your character player ${this.num + 1}`, 150, 40);
    }
}
