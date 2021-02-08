class Tools {
	static clamp(val, min, max) {
		if (val < min) {
			return min;
		}
		else if (val > max) {
			return max;
		}

		return val;
	}

	static isRectCollidedToRect(r1, r2) {
		return r1.x < r2.x + r2.width && r1.x + r1.width > r2.x && r1.y < r2.y + r2.height && r1.y + r1.height > r2.y;
	}

	static isPointCollidedToRect(p, r) {
		return p.x > r.x && p.x < r.x + r.width && p.y > r.y && p.y < r.y + r.height;
	}

	static getCurrentTimeMillis() {
		return new Date().getTime();
	}

	static random(min, max) {
		return Math.random() * (max - min) + min;
	}
}