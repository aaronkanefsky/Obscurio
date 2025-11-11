/**
 * @class ScrollableTextBox
 * 
 * @description Text box that is able to move up and down for long strings of text
 */
class ScrollableTextBox {
    /**
     * 
     * @param {Number} x The x position of the text box
     * @param {Number} y The y position of the text box
     * @param {Number} w The width of the text box
     * @param {Number} h The height of the text box
     * @param {String} textContent Message to put into the text box
     * @param {Number} fontSize Size of the text
     * @param {Color} bgColor Background color of the text box
     * @param {Number} padding Space on the sides of the 
     */
    constructor(x, y, w, h, textContent, fontSize = 16, bgColor, padding = 10) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.textContent = textContent;
        this.fontSize = fontSize;
        this.bgColor = bgColor;
        this.textColor = color(0, 0, 0);
        this.padding = padding;

        this.scrollOffset = 0;
        this.scrollSpeed = 50;    // pixels per wheel "notch"
        this.isDragging = false;
        this.dragStartY = 0;
        this.startOffset = 0;

        this.textLines = [];
        this.lineHeight = this.fontSize * 1.25;
        this._buildLines();
    }

    // build wrapped lines according to box width
    _buildLines() {
        push();
        textSize(this.fontSize);
        this.textLines = [];

        const maxW = this.w - 2 * this.padding;

        // Split text into paragraphs based on line breaks
        const paragraphs = this.textContent.split(/\n+/);

        for (let p = 0; p < paragraphs.length; p++) {
            const words = paragraphs[p].trim().split(/\s+/);
            let line = '';

            for (let i = 0; i < words.length; i++) {
                const word = words[i];
                const test = line.length ? (line + ' ' + word) : word;

                if (textWidth(test) > maxW) {
                    // line too long — push and start new
                    if (line.length) {
                        this.textLines.push(line);
                        line = word;
                    } else {
                        // extremely long word (rare)
                        this.textLines.push(word);
                        line = '';
                    }
                } else {
                    line = test;
                }
            }

            if (line.length) this.textLines.push(line);

            // add an empty line between paragraphs
            if (p < paragraphs.length - 1) {
                this.textLines.push('');
            }
        }

        // compute max scroll (so bottom of text aligns with bottom of box)
        const contentH = this.textLines.length * this.lineHeight;
        this.maxScroll = max(0, contentH - (this.h - 2 * this.padding));
        this.scrollOffset = constrain(this.scrollOffset, 0, this.maxScroll);
        pop();
    }


    // call from sketch mouseWheel
    handleScroll(event) {
        this.scrollOffset += event.delta > 0 ? this.scrollSpeed : -this.scrollSpeed;
        this.scrollOffset = constrain(this.scrollOffset, 0, this.maxScroll);
        // prevent page scrolling in browsers (optional)
        return false;
    }

    // optional: call on mousePressed in sketch
    startDragIfOver() {
        if (this._isMouseOverBox()) {
            this.isDragging = true;
            this.dragStartY = mouseY;
            this.startOffset = this.scrollOffset;
            return true;
        }
        return false;
    }

    // optional: call on mouseReleased in sketch
    stopDrag() {
        this.isDragging = false;
    }

    // optional: call on mouseDragged in sketch
    doDrag() {
        if (!this.isDragging) return;
        const dy = mouseY - this.dragStartY;
        this.scrollOffset = this.startOffset - dy;
        this.scrollOffset = constrain(this.scrollOffset, 0, this.maxScroll);
    }

    _isMouseOverBox() {
        return mouseX >= this.x && mouseX <= this.x + this.w &&
            mouseY >= this.y && mouseY <= this.y + this.h;
    }

    draw() {
        push();
        rectMode(CORNER);
        noStroke();
        fill(this.bgColor);
        rect(this.x, this.y, this.w, this.h, 8);

        drawingContext.save();                    // save canvas state
        drawingContext.beginPath();
        drawingContext.rect(this.x + this.padding, this.y + this.padding, this.w - 2 * this.padding, this.h - 2 * this.padding);
        drawingContext.clip();

        // draw lines
        fill(this.textColor);
        textSize(this.fontSize);
        textAlign(LEFT, TOP);
        const startX = this.x + this.padding;
        const startY = this.y + this.padding - this.scrollOffset;

        let y = startY;
        for (let i = 0; i < this.textLines.length; i++) {
            if (y + this.lineHeight >= this.y + this.padding && y <= this.y + this.h - this.padding) {
                text(this.textLines[i], startX, y);
            }
            y += this.lineHeight;
        }

        // restore canvas (remove clip)
        drawingContext.restore();
        pop();
    }
}
