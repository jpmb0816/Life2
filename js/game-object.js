class GameObject {
	constructor(x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		this.vx = 1;
		this.vy = 1;
	}

	update() {
		this.x = Tools.clamp(this.x + this.vx, 0, canvas.width - this.width);
		this.y = Tools.clamp(this.y + this.vy, 0, canvas.height - this.height);
	}

	render(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}