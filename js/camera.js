class Camera {
	constructor(canvas, ctx, map) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.map = map;
		this.x = 0;
		this.y = 0;
		this.bindedTo = null;
	}

	// Update camera based on x and y
	update() {
		const entity = this.bindedTo;
		const x = entity.x + entity.width / 2;
		const y = entity.y + entity.height / 2;

		// Camera x and y
		const vx = -x + this.canvas.width / 2;
		const vy = -y + this.canvas.height / 2;

		// Clamping camera x and y so it prevents going out of map
		// this.x = Tools.clamp(vx, -(this.mw - this.cw), 0);
		// this.y = Tools.clamp(vy, -(this.mh - this.ch), 0);
		this.x = vx;
		this.y = vy;

		// Translate canvas base on camera x and y
		this.ctx.translate(this.x, this.y);

		// Update camera x and y and make it absolute value
		// this.x = Math.abs(this.x);
		// this.y = Math.abs(this.y);
	}

	bind(entity) {
		this.bindedTo = entity;
	}

	stop() {
		this.ctx.setTransform(1, 0, 0, 1, 0, 0);
	}
}