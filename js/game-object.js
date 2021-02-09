class GameObject {
	constructor(map, x, y, width, height, color) {
		this.map = map;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		this.vx = 0;
		this.vy = 0;
		this.speed = 2;
	}

	update() {
		this.x = Tools.clamp(this.x + this.vx, 0, this.map.width - this.width);
		this.y = Tools.clamp(this.y + this.vy, 0, this.map.height - this.height);
	}

	render(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}