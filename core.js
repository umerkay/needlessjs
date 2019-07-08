const Sketches = {
    all: [],
    curr: null,
    paused: true,
    loopFunction: null,

    stopLoop() {
        this.paused = true;
    },

    doLoop(f) {
        this.loop(f);
    },

    loop(f) {
        this.paused = false;
        if (typeof f == "function") {
            this.loopFunction = f;
            f();
        }
        requestAnimationFrame(Sketches.update);
        return this;
    },

    update() {
        if (Sketches.paused) return;
        if (typeof Sketches.loopFunction == "function") Sketches.loopFunction();

        Sketches.forEach((sketch) => {
            if (!sketch._paused) {
                sketch._loop_main();
            }
        });
        clearGlobal();
        requestAnimationFrame(Sketches.update);
    },

    forEach(f) {
        this.all.forEach(f);
    },

    push(sketch) {
        this.all.push(sketch);
    },

    getSketch(name) {
        return this.all.filter(sketch => sketch.name === name)[0];
    },

    keyPressed(f) {
        if (typeof f == "function") {
            document.body.addEventListener("keydown", (evt) => {
                f(evt.key);
            });
        } else {
            throw new Error("Function required by method. Got " + typeof f);
        }
    },

    // on(event, f) {
    //     if (typeof f == "function") {
    //         document.body.addEventListener(event, () => {
    //             f();
    //         });
    //     } else {
    //         throw new Error("Function required by method. Got " + typeof f);
    //     }
    //     return this;
    // }
}

class Sketch {
    constructor({
        width = 400,
        height = width || 400,
        container,
        layers = 1,
        erasePrevFrame = true, //
        frameRate = 30,
        scaleX = 1,
        scaleY = scaleX,
        autoplay = true,
        push = true
    } = {}) {
        //own mouse object literal with values relative to self
        this.mouse = {
            pos: new Vector(0, 0),
            downPos: new Vector(0, 0),
            down: false,
            button: -1,
            isDown() {
                return this.button != -1;
            }
        };
        this.layers = 0;

        if (push != false) Sketches.push(this);
        this._paused = !autoplay;

        this.width = width; this.height = height;
        this.frameRate(frameRate);

        //#region
        //build canvases as required in the container
        this.canvases = [];
        this.ctxs = []; this.currentCtx = null;
        if (container) {
            if (container instanceof HTMLDivElement) this.container = container;
            else this.container = document.getElementById(container);
        } else {
            this.container = document.createElement('div');
            this.container.id = "sketch-" + (Sketches.all.length);
            document.body.appendChild(this.container);
        }
        this.container.style.display = "inline-block";
        this.container.style.width = this.width; this.container.style.height = this.height;
        //bind name for accessing
        this.name = this.container.id || "sketch-" + (Sketches.all.length);
        this.mouse.name = this.name;

        //mouse events for every sketch
        this.container.addEventListener("mousemove", (evt) => {
            let rect = this.container.getBoundingClientRect();
            this.mouse.pos.x = Math.floor((evt.clientX - rect.left));
            this.mouse.pos.y = Math.floor((evt.clientY - rect.top));
        });
        this.container.addEventListener("mousedown", (evt) => {
            this.mouse.button = evt.button;
            this.mouse.downPos.set(this.mouse.pos.x, this.mouse.pos.y);
        });
        this.container.addEventListener("mouseup", (evt) => {
            this.mouse.button = -1;
        });
        //#endregion

        //add canvases if not already full
        for (let i = this.canvases.length; i < layers; i++) this.addCanvas();
        //default rectangle draw mode
        this.rectMode("CENTER");
        this.ctxs.forEach(ctx => ctx.scale(scaleX, scaleY));

        this.entities = [];

    }

    init(f) {
        this._init = f || this._init;
        fetchIntoGlobal(this);
        f.bind(this)();
        clearGlobal();

        return this;
    }

    setLoop(f) {
        if(typeof f != "function") throw new Error("setLoop requires function as first parameter, got " + typeof f);
        return this._loop = f;
    }

    loop(f) {
        this._loop = f || this._loop;

        this._fpsInterval = 1000 / this.fps;
        this._then = Date.now();
        this._frameCount = 0;

        return this;
    }

    _loop_main() {
        const now = Date.now();
        this._elapsed = now - this._then;

        if (this._elapsed > this._fpsInterval) {

            this._frames++;
            if (this._t0 != Math.floor(performance.now() / 1000)) {
                this._frames_last = this._frames;
                this._frames = 0;
                this._t0 = Math.floor(performance.now() / 1000);
            }
            this._then = now - (this._elapsed % this._fpsInterval);
            this._frameCount++;

            fetchIntoGlobal(this);
            this.ctxs.forEach(ctx => ctx.save());
            this._loop();
            this.ctxs.forEach(ctx => ctx.restore());

        }
    }

    stopLoop(duration) {
        this._paused = true;
        if(typeof duration == "number") setTimeout(sketch => sketch.doLoop(), duration, this);
    }

    doLoop() {
        this._paused = false;
    }

    addCanvas(canvas) {
        if (!canvas) { //if canvas not passed, create new
            canvas = document.createElement('canvas');
            canvas.id = "db-" + (this.canvases.length + 1);
            this.container.appendChild(canvas);
        }
        //set width height
        canvas.width = this.width;
        canvas.height = this.height;
        //set canvas methods
        canvas.onselectstart = () => false;

        canvas.style.position = 'absolute';

        let ctx = canvas.getContext("2d");
        this.canvases.push(canvas);
        this.layers++;
        this.ctxs.push(ctx);
        this.currentCtx = ctx;
        return canvas;
    }

    //#region

    setLayer(layer) {
        this.currentCtx = this.ctxs[layer];
    }

    loopCount() {
        return this._frameCount;
    }

    frameRate(fps) {
        this.fps = fps;
    }

    clearAll() {
        this.ctxs.forEach(ctx => ctx.clearRect(0, 0, this.width, this.height));
    }

    clear() {
        this.currentCtx.clearRect(0, 0, this.width, this.height);
    }

    background(r, g, b, a) {
        if(r instanceof HTMLImageElement) {
            this.rectMode("CORNER");
            this.image(r, 0, 0, this.width, this.height);
            return;
        }
        this.save();
        this.fill(r, g, b, a);
        this.noStroke();
        this.rectMode("CENTER");
        this.rect(this.width / 2, this.height / 2, this.width, this.height);
        this.restore();
    }

    rect(x, y, w, h) {

        let ctx = this.currentCtx;
        if (this.currentCtx.doFill != false)
            ctx.fillRect(x - w * this.offset, y - h * this.offset, w, h);
        if (this.currentCtx.doStroke != false)
            ctx.strokeRect(x - w * this.offset, y - h * this.offset, w, h);
    }

    line(x1, y1, x2, y2) {
        this.currentCtx.beginPath();
        this.currentCtx.moveTo(x1, y1);
        this.currentCtx.lineTo(x2, y2);
        this.currentCtx.stroke();
    }

    rectMode(mode) {
        switch (mode) {
            case "CENTER":
                this.offset = 1 / 2;
                break;
            case "CORNER":
                this.offset = 0;
                break;
        }
    }

    stroke(r, g, b, a) {
        if(r === null || r === undefined) return this.noStroke();
        if (typeof r == 'string') {
            this.currentCtx.strokeStyle = r;
        } else if (typeof r == 'number' && b == undefined) {
            this.currentCtx.strokeStyle = "rgba(" + r + ',' + r + ',' + r + ',' + (g / 100 || "1") + ")";
        } else if (typeof r == 'number' && b != undefined) {
            this.currentCtx.strokeStyle = "rgba(" + r + ',' + g + ',' + b + ',' + (a / 100 || "1") + ")";
        } else if (typeof r == 'object') {
            this.currentCtx.strokeStyle = "rgba(" + r.r + ',' + r.g + ',' + r.b + ',' + r.a + ")";
        }
        this.currentCtx.doStroke = true;
    }

    strokeWeight(weight) {
        this.currentCtx.lineWidth = weight;
        this.currentCtx.doStroke = true;
    }

    noStroke() {
        this.currentCtx.doStroke = false;
    }

    fill(r, g, b, a) {
        if(r === null || r === undefined) return this.noFill();
        if (typeof r == 'string') {
            this.currentCtx.fillStyle = r;
        } else if (typeof r == 'number' && b == null) {
            this.currentCtx.fillStyle = "rgba(" + r + ',' + r + ',' + r + ',' + (g / 100 || "1") + ")";
        } else if (typeof r == 'number' && b != null) {
            this.currentCtx.fillStyle = "rgba(" + r + ',' + g + ',' + b + ',' + (a / 100 || "1") + ")";
        } else if (typeof r == 'object') {
            this.currentCtx.fillStyle = "rgba(" + r.r + ',' + r.g + ',' + r.b + ',' + r.a + ")";
        }
        this.currentCtx.doFill = true;
    }

    noFill() {
        this.currentCtx.doFill = false;
    }

    loadImage(src) {
        let img = new Image();
        img.onload = () => {

        };
        img.src = src;
        return img;
    }

    image(img, x, y, w, h) {
        if (w != null && h != null) {
            this.currentCtx.drawImage(img, x, y, w, h);
        } else {
            this.currentCtx.drawImage(img, x, y);
        }
    }

    ellipse(x, y, w, h = w) {
        this.currentCtx.beginPath();
        this.currentCtx.ellipse(x, y, w, h, 0, 0, TWO_PI);
        if (this.currentCtx.doFill != false) {
            this.currentCtx.fill();
        }
        if (this.currentCtx.doStroke != false) {
            this.currentCtx.stroke();
        }
        this.currentCtx.closePath();
    }

    circle(x, y, r) {
        this.currentCtx.beginPath();
        this.currentCtx.ellipse(x, y, r, r, 0, 0, TWO_PI);
        if (this.currentCtx.doFill != false) {
            this.currentCtx.fill();
        }
        if (this.currentCtx.doStroke != false) {
            this.currentCtx.stroke();
        }
        this.currentCtx.closePath();
    }

    arc(x, y, w, s, e) {
        this.currentCtx.beginPath();
        this.currentCtx.arc(x, y, w / 2, s, e);
        if (this.currentCtx.doFill != false) {
            this.currentCtx.fill();
        }
        if (this.currentCtx.doStroke != false) {
            this.currentCtx.stroke();
        }
        this.currentCtx.closePath();
    }

    text(string, x, y) {
        this.currentCtx.textAlign = "center";
        this.currentCtx.font = "bold 15px Arial";
        this.currentCtx.fillText(string, x, y + 15 / 3);
    }

    save() {
        this.currentCtx.save();
    }

    restore() {
        this.currentCtx.restore();
    }

    translate(x, y) {
        this.currentCtx.translate(x, y);
    }

    rotate(angle) {
        this.currentCtx.rotate(angle);
    }

    scale(x, y = x) {
        this.currentCtx.scale(x, y);
    }
    //#endregion

    on(event, f) {
        if (typeof f == "function") {
            this.container.addEventListener(event, () => {
                fetchIntoGlobal(this);
                f.bind(this)();
                clearGlobal();
            });
        } else {
            throw new Error("Function required by method. Got " + typeof f);
        }
        return this;
    }
}

const key = {
    states: [],
    isDown(key) {
        return !!this.states[key];
    }
};

document.body.addEventListener("keydown", evt => key.states[evt.key] = true);
document.body.addEventListener("keyup", evt => key.states[evt.key] = false);