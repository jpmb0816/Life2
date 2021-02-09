class MouseControlManager {
	constructor(object, canvas, isMobile) {
		this.canvas = canvas;
		this.data = { type: '', code: -1, x: -1, y: -1, cx: -1, cy: -1 };
		this.events = isMobile ? ['touchdown', 'touchup', 'touchmove'] : ['mousedown', 'mouseup', 'mousemove'];

		object.addEventListener(this.events[0], this.updateData.bind(this));
		object.addEventListener(this.events[1], this.updateData.bind(this));
		object.addEventListener(this.events[2], this.updateData.bind(this));
	}

	updateData(event) {
		const rect = this.canvas.getBoundingClientRect();
		const x = Math.round(event.clientX - rect.left);
		const y = Math.round(event.clientY - rect.top);

		this.data.code = event.which;

		if (event.type === this.events[2]) {
			this.data.cx = x;
			this.data.cy = y;
		}
		else {
			this.data.x = x;
			this.data.y = y;
			this.data.type = event.type;
		}
	}

	resetData() {
		if (this.data.type === this.events[1]) {
			this.data.type = '';
			this.data.code = -1;
		}
	}

	getData() {
		const data = JSON.parse(JSON.stringify(this.data));
		this.resetData();

		return data;
	}
}