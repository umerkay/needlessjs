var angle = 0;
var length = 0;
var direction = 2;
var back = hueColor(0,0,0,0.1);

const fractal = new Sketch(
    {
        frameRate: 30,
        width: 'inherit',
		height: 400,
		container: 'sketch-1'
    })
    .init(function () {
        background(0);
    })
    .loop(function () {
        length += direction;
        if (length == 150 || length == 0) direction *= -1;

        angle = (angle + 0.02) % TWO_PI;

        background(back);

        colorMode(1);
        stroke(abs(loopCount() - 100) % 255, 100, 50);
        translate(width / 2, height);
        branch(length, 10);
        stroke((loopCount()) % 255, 100, 50);
        translate(0, -height);
        branch(-length * 2, 10);
    });

function branch(length, width) {
    strokeWeight(width);
    line(0, 0, 0, -length);
    translate(0, -length);
    if (width > 3) {
        save();
        rotate(angle);
        branch(length * 0.8, width * 0.8);
        restore();

        save();
        rotate(-angle);
        branch(length * 0.8, width * 0.8);
        restore();
    }
}