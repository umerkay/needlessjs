var mouse = null;
var width = window.innerWidth; var height = window.innerHeight;

function Color(r, g, b, a) {
    if (typeof r == 'number' && b == null) {
        return { r, g: r, b: r, a: g / 100 || "1" };
    } else if (typeof r == 'number' && b != null) {
        return { r, g, b, a: a / 100 || "1" }
    }
}

function loadImage(src, f) {
    var img = new Image();
    img.onload = f;
    img.src = src;
    return img;
}

function fetchIntoGlobal(sketch) {
    Sketches.curr = sketch;
    mouse = Sketches.curr.mouse;
    width = Sketches.curr.width;
    height = Sketches.curr.height;
}

function clearGlobal() {
    mouse = null;
    width = window.innerWidth;
    height = window.innerHeight;
    Sketches.curr = null;
}

const fnames = Object.getOwnPropertyNames(Sketch.prototype).slice(4);
for(let i = 0; i < fnames.length; i++) {
    const f = fnames[i];
    eval("function " + f + "(...args) { return Sketches.curr." + f + "(...args); }");
}

const PI = Math.PI;
const HALF_PI = Math.PI / 2;
const TWO_PI = Math.PI * 2;

min = Math.min;
max = Math.max;
abs = Math.abs;
sqrt = Math.sqrt;
sin = Math.sin;
cos = Math.cos;
tan = Math.tan;
asin = Math.asin;
acos = Math.acos;
atan = Math.atan;

aliceblue = '#f0f8ff';
antiquewhite = '#faebd7';
aqua = '#00ffff';
aquamarine = '#7fffd4';
azure = '#f0ffff';
beige = '#f5f5dc';
bisque = '#ffe4c4';
black = '#000000';
blanchedalmond = '#ffebcd';
blue = '#0000ff';
blueviolet = '#8a2be2';
brown = '#6b3500';
burlywood = '#deb887';
cadetblue = '#5f9ea0';
chartreuse = '#7fff00';
chocolate = '#d2691e';
coral = '#ff7f50';
cornflowerblue = '#6495ed';
cornsilk = '#fff8dc';
crimson = '#dc143c';
cyan = '#00ffff';
darkblue = '#00008b';
darkcyan = '#008b8b';
darkgoldenrod = '#b8860b';
darkgray = '#a9a9a9';
darkgreen = '#006400';
darkgrey = '#a9a9a9';
darkkhaki = '#bdb76b';
darkmagenta = '#8b008b';
darkolivegreen = '#556b2f';
darkorange = '#ff8c00';
darkorchid = '#9932cc';
darkred = '#8b0000';
darksalmon = '#e9967a';
darkseagreen = '#8fbc8f';
darkslateblue = '#483d8b';
darkslategray = '#2f4f4f';
darkslategrey = '#2f4f4f';
darkturquoise = '#00ced1';
darkviolet = '#9400d3';
deeppink = '#ff1493';
deepskyblue = '#00bfff';
dimgray = '#696969';
dimgrey = '#696969';
dodgerblue = '#1e90ff';
firebrick = '#b22222';
floralwhite = '#fffaf0';
forestgreen = '#228b22';
fuchsia = '#ff00ff';
gainsboro = '#dcdcdc';
ghostwhite = '#f8f8ff';
gold = '#ffd700';
goldenrod = '#daa520';
gray = '#808080';
green = '#008000';
greenyellow = '#adff2f';
grey = '#808080';
honeydew = '#f0fff0';
hotpink = '#ff69b4';
indianred = '#cd5c5c';
indigo = '#4b0082';
ivory = '#fffff0';
khaki = '#f0e68c';
lavender = '#e6e6fa';
lavenderblush = '#fff0f5';
lawngreen = '#7cfc00';
lemonchiffon = '#fffacd';
lightblue = '#add8e6';
lightcoral = '#f08080';
lightcyan = '#e0ffff';
lightgoldenrodyellow = '#fafad2';
lightgray = '#d3d3d3';
lightgreen = '#90ee90';
lightgrey = '#d3d3d3';
lightpink = '#ffb6c1';
lightsalmon = '#ffa07a';
lightseagreen = '#20b2aa';
lightskyblue = '#87cefa';
lightslategray = '#778899';
lightslategrey = '#778899';
lightsteelblue = '#b0c4de';
lightyellow = '#ffffe0';
lime = '#00ff00';
limegreen = '#32cd32';
linen = '#faf0e6';
magenta = '#ff00ff';
maroon = '#800000';
mediumaquamarine = '#66cdaa';
mediumblue = '#0000cd';
mediumorchid = '#ba55d3';
mediumpurple = '#9370db';
mediumseagreen = '#3cb371';
mediumslateblue = '#7b68ee';
mediumspringgreen = '#00fa9a';
mediumturquoise = '#48d1cc';
mediumvioletred = '#c71585';
midnightblue = '#191970';
mintcream = '#f5fffa';
mistyrose = '#ffe4e1';
moccasin = '#ffe4b5';
navajowhite = '#ffdead';
navy = '#000080';
oldlace = '#fdf5e6';
olive = '#808000';
olivedrab = '#6b8e23';
orange = '#ffa500';
orangered = '#ff4500';
orchid = '#da70d6';
palegoldenrod = '#eee8aa';
palegreen = '#98fb98';
paleturquoise = '#afeeee';
palevioletred = '#db7093';
papayawhip = '#ffefd5';
peachpuff = '#ffdab9';
peru = '#cd853f';
pink = '#ffc0cb';
plum = '#dda0dd';
powderblue = '#b0e0e6';
purple = '#800080';
red = '#ff0000';
rosybrown = '#bc8f8f';
royalblue = '#4169e1';
saddlebrown = '#8b4513';
salmon = '#fa8072';
sandybrown = '#f4a460';
seagreen = '#2e8b57';
seashell = '#fff5ee';
sienna = '#a0522d';
silver = '#c0c0c0';
skyblue = '#87ceeb';
slateblue = '#6a5acd';
slategray = '#708090';
slategrey = '#708090';
snow = '#fffafa';
springgreen = '#00ff7f';
steelblue = '#4682b4';
tan = '#d2b48c';
teal = '#008080';
thistle = '#d8bfd8';
tomato = '#ff6347';
turquoise = '#40e0d0';
violet = '#ee82ee';
wheat = '#f5deb3';
white = '#ffffff';
whitesmoke = '#f5f5f5';
yellow = '#ffff00';
yellowgreen = '#9acd32';

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        if (vector instanceof Vector) {
            this.x += vector.x;
            this.y += vector.y;
        } else {
            this.x += vector;
            this.y += vector;
        }
        return this;
    }

    sub(vector) {
        if (vector instanceof Vector) {
            this.x -= vector.x;
            this.y -= vector.y;
        } else {
            this.x -= vector;
            this.y -= vector;
        }
        return this;
    }

    mult(vector) {
        if (vector instanceof Vector) {
            this.x *= vector.x;
            this.y *= vector.y;
        } else {
            this.x *= vector;
            this.y *= vector;
        }
        return this
    }

    div(vector) {
        if (vector instanceof Vector) {
            this.x /= vector.x;
            this.y /= vector.y;
        } else {
            this.x /= vector;
            this.y /= vector;
        }
        return this;
    }

    mag() {
        return sqrt(this.x * this.x + this.y * this.y);
    }

    magSq() {
        return this.x * this.x + this.y * this.y;
    }

    copy() {
        return new Vector(this.x, this.y);
    }

    normalize() {
        this.div(this.mag());
        return this;
    }

    setMag(num) {
        this.normalize().mult(num);
        return this;
    }

    limit(num) {
        const mag = this.mag();
        if (mag > num) {
            this.div(mag).mult(num);
        }
        return this;
    }

    angle() {
        return atan(this.y / this.x);
    }

    dot(v2) {
        return this.x * v2.x + this.y * v2.y;
    }

    getPerp() {
        return new Vector(-this.y, this.x);
    }

    set(x,y) {
        this.x = x; this.y = y;
    }

    rotate(angle) {
        const COS = cos(angle);
        const SIN = sin(angle);
        this.x = (this.x * COS - this.y * SIN);
        this.y = (this.x * SIN + this.y * COS);
        return this;
    }

    static random2D() {
        const vector = new Vector(random(), random());
        vector.normalize();
        return vector;
    }
    static add(v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }
    static sub(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }
    static mult(v1, n) {
        return new Vector(v1.x * n, v1.y * n);
    }
    static div(v1, n) {
        return new Vector(v1.x / n, v1.y / n);
    }
    static normalize(v1) {
        return v1.copy().normalize();
    }
    static div(v1, n) {
        return v1.copy().setMag(n);
    }
    static dist(v1, v2) {
        return sqrt((v2.x - v1.x) * (v2.x - v1.x) + (v2.y - v1.y) * (v2.y - v1.y));
    }
    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }
    static areEqual(v1, v2) {
        return v1.x == v2.x && v1.y == v2.y;
    }
}

function dist(x1, y1, x2, y2) {
    return sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

function distSq(x1, y1, x2, y2) {
    return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
}

const floor = Math.floor;

function random(to, from, int) {
    if(to instanceof Array) return to[floor(random(to.length))]
    if (from != null) {
        if (int) {
            return floor(Math.random() * (to - from)) + (from);
        } else {
            return Math.random() * (to - from) + (from);
        }
    } else if (to != null) {
        if (int) {
            return floor(Math.random() * (to));
        } else {
            return random() * (to);
        }
    } else {
        return Math.random();
    }
}