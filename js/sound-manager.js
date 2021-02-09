class SoundManager {
	constructor() {
		this.sounds = {};
	}

	add(name, path) {
		this.sounds[name] = path;
	}

	load() {
		for (const [key, value] of Object.entries(this.sounds)) {
			console.log(key, value);
		}
	}
}