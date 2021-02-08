class Color {
	constructor(r, g, b, a) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a === undefined ? 1 : a;
	}

	toString() {
		return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.a + ')';
	}
}