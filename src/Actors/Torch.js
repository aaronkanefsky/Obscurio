// https://thecodingtrain.com/challenges/78-simple-particle-system

let torch;

function setup() {
    createCanvas(600, 400);
    torch = new Torch();
}

function draw() {
    background(0);
    torch.update();
}

class Torch {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.smoke = [];
        this.fire = [];
    }

    update() {
        //fill smoke array
        //can generate more particles at once by adjusting the i< 
        for (let i = 0; i < 5; i++) {
            let s = new Smoke(this.x,this.y);
            this.smoke.push(s);

        }

        //for (let i = 0; i <particles.length; i++){
        //particles.length-1 starts from the end of the array when deleting particles at the end of their lifespace so they aren't skipped when the array shifts
        for (let i = this.smoke.length - 1; i >= 0; i--) {
            this.smoke[i].update();
            this.smoke[i].show();
            if (this.smoke[i].finished()) {

                //remove this smoke
                //splice function removes an element from the array at position i from just that one element
                this.smoke.splice(i, 1);
            }
        }

        //fill fire array
        //can generate more particles at once by adjusting the i< 
        for (let i = 0; i < 10; i++) {

            let f = new Fire(this.x,this.y);
            this.fire.push(f);

        }
        //doing the reverse count for this array puts the later particles on top so the visual is less pleasing
        for (let i = 0; i < this.fire.length; i++) {
            this.fire[i].update();
            push();
            blendMode(ADD);
            this.fire[i].show();
            pop();
            //remove this fire particle when it is no longer visible
            if (this.fire[i].finished()) {

                this.fire.splice(i, 1);
            }
        }

    }
}

class Fire {

    constructor(x,y) {
        this.fx = x + (random(-20, 20));
        this.fy = y;
        this.fvx = random(-1, 1);
        this.fvy = random(-3, -1);
        this.alpha = 155;
        //controls the starting color of R in RGB.
        this.rColor = 255;
        //controls the starting color of G in RGB. 
        this.gColor = 125;
        //controls the starting color of B in RBG
        this.bColor = 0;
        //controls the starting scale of the fire particle
        this.fScale = 25;

    }


    finished() {
        //this function returns true or false
        return this.alpha < 0;
    }

    update() {
        //connects the current x or y to the vector x or y
        this.fx += this.fvx;
        this.fy += this.fvy;
        //controls fade over time
        this.alpha -= 3;
        //the color changes as the fire goes up
        //controls the fire turning yellow to red
        this.gColor -= 2;
        this.fScale -= 0.5;
    }

    show() {
        noStroke();
        fill(this.rColor, this.gColor, this.bColor, this.alpha)
        ellipse(this.fx, this.fy, this.fScale);
    }
}
class Smoke {


    constructor(x,y) {
        //particles start at the bottom
        this.x = x;
        this.y = y;
        //change this to make particles go random left and right
        this.vx = random(-1, 1);
        //change this in the negative to make the particles go up randomly
        this.vy = random(-5, -1);
        this.alpha = 255;
        this.sScale = 25;
        this.sColor = 100;

    }

    finished() {
        //this function returns true or false
        //when the particle fades below zero the particle dies
        return this.alpha < 0;
    }

    //moves the particles x and y with the random from vx and vy
    update() {
        this.x += this.vx;
        this.y += this.vy;
        //controls fade over time
        //particle lifetime
        this.alpha -= 5;
        //change this to change how quickly the smoke size decreases over time
        this.sScale -= 1.5;
        this.sColor -= 2;
    }

    //controls what the particle looks like
    show() {
        noStroke();
        //stroke(255);
        fill(this.sColor, this.alpha);
        ellipse(this.x, this.y, this.sScale);
    }
}
