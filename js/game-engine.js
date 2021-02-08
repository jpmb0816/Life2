class GameEngine {
	constructor() {
		this.canvas = document.getElementById('canvas');
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
		this.mouseManager = new MouseControlManager(window, canvas);

		this.buttons = [];

		this.initButtons();
		this.initButtonsListeners();
	}

	initButtons() {
		this.buttons.push(new Button('Start', 50, 50, 100, 50, new Color(255, 0, 0)));
		this.buttons.push(new Button('Restart', 200, 50, 100, 50, new Color(255, 100, 0)));
	}

	initButtonsListeners() {
		// this.buttons[0].addOnMouseDownListener(() => {
		// 	console.log('mousedown');
		// });
		// this.buttons[0].addOnMouseUpListener(() => {
		// 	console.log('mouseup');
		// });
		// this.buttons[0].addOnMouseClickListener(() => {
		// 	console.log('clicked');
		// });
		// this.buttons[0].addOnMouseHoverInListener(() => {
		// 	console.log('hoverin');
		// });
		// this.buttons[0].addOnMouseHoverOutListener(() => {
		// 	console.log('hoverout');
		// });

		this.buttons.forEach(button => {
			button.addOnMouseDownListener(() => {
				console.log(button.text + 'mousedown');
			});
			button.addOnMouseUpListener(() => {
				console.log(button.text + 'mouseup');
			});
			button.addOnMouseClickListener(() => {
				console.log(button.text + 'clicked');
			});
			button.addOnMouseHoverInListener(() => {
				console.log(button.text + 'hoverin');
			});
			button.addOnMouseHoverOutListener(() => {
				console.log(button.text + 'hoverout');
			});
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
	}
	
	render(ctx) {
		// Clear canvas
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		// Render Game
		this.buttons.forEach(button => {
			button.render(ctx);
		});

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