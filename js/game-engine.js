class GameEngine {
	constructor() {
		this.canvas = document.getElementById('screen-canvas');
		this.ctx = this.canvas.getContext('2d');

		this.lastTime = Tools.getCurrentTimeMillis();
		this.timer = Tools.getCurrentTimeMillis();
		this.updateDeltaTime = 0;

		this.targetUPS = 60;
		this.targetFPS = 60;

		this.updates = 0;
		this.frames = 0;

		this.UPS = 0;
		this.FPS = 0;

		this.updateTime = 1000 / this.targetUPS;

		this.interval = undefined;
		this.keyState = [];

		this.keyManager = new KeyControlManager(window);
		this.mouseManager = new MouseControlManager(window, this.canvas);

		this.object = new GameObject({ width: this.canvas.width * 2, height: this.canvas.height }, 1000, 100, 32, 32, 'red');
		this.camera = new Camera(this.ctx, this.canvas.width, this.canvas.height);
		this.camera.setMapSize(1200, 600);
		this.camera.bind(this.object);

		this.buttons = [];

		this.initButtons();
		this.initButtonsListeners();

		this.bgm = document.getElementById('bg-music');
		this.isSoundMuted = true;

		this.bgm.play().then(() => {
			this.isSoundMuted = false;
			this.buttons[0].text = 'Mute';
		}).catch(error => {
			
		});

		// this.soundManager = new SoundManager();
		// this.soundManager.add('bgm', 'sfx/bgm.mp3');
	}

	initButtons() {
		this.buttons.push(new Button('Unmute', 150, 50, 70, 50, new Color(255, 0, 0)));
	}

	initButtonsListeners() {
		this.buttons[0].addOnMouseClickListener(() => {
			if (this.isSoundMuted) {
				this.isSoundMuted = false;
				this.buttons[0].text = 'Mute';
				this.bgm.play();
			}
			else {
				this.isSoundMuted = true;
				this.buttons[0].text = 'Unmute';
				this.bgm.pause();
			}
		});
	}

	start() {
		if (!this.interval) {
			this.interval = setInterval(() => this.tick(), 1000 / this.targetFPS);
		}
	}

	stop() {
		if (this.interval) {
			clearInterval(this.interval);
			this.interval = undefined;
		}
	}

	update() {
		const keyData = this.keyManager.getData();
		const mouseData = this.mouseManager.getData();

		this.buttons.forEach(button => {
			button.update(mouseData);
		});

		// Update Game
		this.object.update();
	}
	
	render(ctx) {
		// Clear canvas
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.buttons.forEach(button => {
			button.render(ctx);
		});

		// Render Game
		this.camera.update();

		ctx.fillStyle = 'green';
		ctx.fillRect(0, 0, this.canvas.width * 2, this.canvas.height);

		this.object.render(ctx);

		this.camera.stop();

		// Display UPS and FPS
		ctx.font = '15px sans-serif';

		ctx.textAlign = "start";
		ctx.textBaseline = 'alphabetic';

		ctx.fillStyle = 'green';
		ctx.fillText('FPS: ' + this.FPS, 20, 30);
		ctx.fillText('UPS: ' + this.UPS, 20, 50);
	}

	getInput() {

	}

	tick() {
		const currentTime = Tools.getCurrentTimeMillis();
		this.updateDeltaTime += (currentTime - this.lastTime) / this.updateTime;
		this.lastTime = currentTime;

		// Update the game based on how many delta time passed
		while (this.updateDeltaTime >= 1) {
			this.getInput();
			this.update();
			this.updateDeltaTime--;
			this.updates++;
		}

		// Render the game
		this.render(this.ctx);
		this.frames++;

		// Show UPS and FPS
		while (Tools.getCurrentTimeMillis() - this.timer >= 1000) {
			this.FPS = this.frames;
			this.UPS = this.updates;
			this.timer += 1000;
			this.frames = 0;
			this.updates = 0;
		}
 	}

	setUPS(targetUPS) {
		this.targetUPS = targetUPS;
		this.updateTime = 1000 / this.targetUPS;
	}

	setFPS(targetFPS) {
		this.targetFPS = targetFPS;
		this.stop();
		this.start();
	}
}