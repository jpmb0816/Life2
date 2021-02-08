class KeyControlManager {
	constructor(object) {
		this.data = { type: '', code: -1 };

		object.addEventListener('keydown', this.updateData.bind(this));
		object.addEventListener('keyup', this.updateData.bind(this));
	}

	updateData(event) {
		this.data.type = event.type;
		this.data.code = event.which;
	}

	resetData() {
		this.data.type = '';
		this.data.code = -1;
	}

	getData() {
		const data = JSON.parse(JSON.stringify(this.data));
		this.resetData();

		return data;
	}
}