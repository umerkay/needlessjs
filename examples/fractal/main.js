var angle = 0;
var length = 0;

const fractal = new Sketch(
	{
		container: "sketch-1",
		frameRate: 30,
		width: "inherit",
		height: "250"
	})
	.init(function () {
		background(0);
	})
	.loop(function () {
		length = (length + 1) % 150;
		angle = (angle + 0.02) % TWO_PI;
		if (length == 0) background(0);
		colorMode(1);
		stroke(loopCount() % 255, 25, 150);
		translate(width / 2, height);
		branch(length, 10);
		stroke((loopCount() - 100) % 255, 25, 150);
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