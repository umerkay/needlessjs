var pos = new Vector(80, 93);
var pos2 = new Vector(80, 93);

new Sketch(
	{
		frameRate: 60,
		width: width,
		height: height
	})
	.init(function () {
		Entity.add(new Entity(random(width), random(height), {
			render() {
				fill(255,0,0);
				circle(this.position.x, this.position.y, this.radius)
			},
			radius: 30
		}));
	})
	.loop(function () {
		clear();
		Entity.get().forEach(entity => {
			entity.update();
			entity.render();
		});
	})
	.on("mousemove", function () {
		circle(mouse.position.x, mouse.position.y, 5);
	});

Sketches.loop(function () {

});

Sketches.keyPressed((key) => {

});