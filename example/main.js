var pos = new Vector(80, 93);
var pos2 = new Vector(80, 93);

new Sketch(
	{
		frameRate: 60,
		layers: 2,
		width: width,
		height: height
	})
	.init(function () {
		setLayer(0);

		background(0, 0, 200);
		fill(84, 0, 34);
		circle(pos.x, pos.y, 30, 80);
	})
	.loop(function () {
		setLayer(1);
		
		background(frameCount());

		noFill();
		stroke(0, 0, 0);
		if (key.isDown('f'))
			scale(1.1);
		ellipse(pos.x, pos.y, 4);
	})
	.on("mousemove", function () {
		if (mouse.isDown())
			scale(1.01);
	});

new Sketch(
	{
		frameRate: 30,
		autoplay: false,
		layers: 2,
		push: false,
	})
	.init(function () {
		setLayer(0);

		background(0, 0, 200);
		fill(84, 0, 34);
		ellipse(pos.x, pos.y, 30, 35);
	})
	.loop(function () {
		setLayer(1);

		clear();
		pos2.add(1);
		fill(0, 0, 0);
		noStroke();
		ellipse(pos2.x, pos2.y, 4);
	})
	.on("mousemove", function () {
		if (mouse.isDown())
			pos2 = mouse.pos.copy();
	})
	.on("mousedown", function () {
		doLoop();
	});

Sketches.loop(function () {
	// pos.add(1);
});

Sketches.keyPressed((key) => {

});