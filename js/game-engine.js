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

		this.map = { width: 300, height: this.canvas.height };

		this.player = new GameObject(this.map, 150, 100, 32, 32, 'red');
		this.camera = new Camera(this.canvas, this.ctx, this.map);
		this.camera.bind(this.player);

		this.buttons = {};

		this.initButtons();
		this.initButtonsListeners();

		this.isSoundMuted = false;
		this.bgm = new Audio('sfx/bgm.mp3');
		this.bgm.loop = true;

		this.isMobile = false;

		if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
			|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
			this.isMobile = true;
		}

		this.keyManager = new KeyControlManager(window);
		this.mouseManager = new MouseControlManager(window, this.canvas, this.isMobile);

		this.isFullScreen = false;
	}

	fullscreen() {
		if (this.canvas.webkitRequestFullScreen) {
			this.canvas.webkitRequestFullScreen();
		}
		else {
			this.canvas.mozRequestFullScreen();
		}
	}

	initButtons() {
		this.buttons.fullscreen = new Button('Fullscreen', 0, 0, 100, 50, new Color(255, 0, 0));
		this.buttons.mute = new Button('Mute', 0, 50, 70, 50, new Color(255, 0, 0));

		this.buttons.up = new Button('U', 100, 0, 50, 50, new Color(255, 0, 0));
		this.buttons.down = new Button('D', 100, 0, 50, 50, new Color(255, 0, 0));
		this.buttons.left = new Button('L', 50, 0, 50, 50, new Color(255, 0, 0));
		this.buttons.right = new Button('R', 150, 0, 50, 50, new Color(255, 0, 0));

		this.buttons.a = new Button('A', 0, 0, 50, 50, new Color(255, 0, 0));
		this.buttons.b = new Button('B', 0, 0, 50, 50, new Color(255, 0, 0));
	}

	initButtonsListeners() {
		this.buttons.fullscreen.addOnMouseClickListener(() => {
			this.isFullScreen = true;
			this.fullscreen();
			this.bgm.play();
		});
		this.buttons.mute.addOnMouseClickListener(() => {
			if (this.isSoundMuted) {
				this.isSoundMuted = false;
				this.buttons.mute.text = 'Mute';
				this.bgm.play();
			}
			else {
				this.isSoundMuted = true;
				this.buttons.mute.text = 'Unmute';
				this.bgm.pause();
			}
		});

		this.buttons.up.addOnMouseDownListener(() => {
			this.player.move('up');
		});
		this.buttons.up.addOnMouseUpListener(() => {
			this.player.move('stop');
		});

		this.buttons.down.addOnMouseDownListener(() => {
			this.player.move('down');
		});
		this.buttons.down.addOnMouseUpListener(() => {
			this.player.move('stop');
		});

		this.buttons.left.addOnMouseDownListener(() => {
			this.player.move('left');
		});
		this.buttons.left.addOnMouseUpListener(() => {
			this.player.move('stop');
		});

		this.buttons.right.addOnMouseDownListener(() => {
			this.player.move('right');
		});
		this.buttons.right.addOnMouseUpListener(() => {
			this.player.move('stop');
		});

		this.buttons.a.addOnMouseClickListener(() => {
			console.log('A');
		});
		this.buttons.b.addOnMouseClickListener(() => {
			console.log('B')
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

		if (this.isFullScreen) {
			this.updateInGameDisplay(keyData, mouseData);
		}
		else {
			this.updateRequestFullScreenDisplay(keyData, mouseData);
		}
	}
	
	render(ctx) {
		const keyData = this.keyManager.getData();
		const mouseData = this.mouseManager.getData();

		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		if (this.isFullScreen) {
			this.renderInGameDisplay(this.ctx, keyData, mouseData);
		}
		else {
			this.renderRequestFullScreenDisplay(this.ctx, keyData, mouseData);
		}
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

	// Request fullscreen display
	updateRequestFullScreenDisplay(keyData, mouseData) {
		this.buttons.fullscreen.update(mouseData, this.mouseManager.events);
		this.buttons.fullscreen.x = (this.canvas.width / 2) - (this.buttons.fullscreen.width / 2);
		this.buttons.fullscreen.y = (this.canvas.height / 2) - (this.buttons.fullscreen.height / 2);
	}

	renderRequestFullScreenDisplay(ctx, keyData, mouseData) {
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.buttons.fullscreen.render(ctx);
	}

	// In game display
	updateInGameDisplay(keyData, mouseData) {
		this.buttons.mute.update(mouseData, this.mouseManager.events);
		this.buttons.up.update(mouseData, this.mouseManager.events);
		this.buttons.down.update(mouseData, this.mouseManager.events);
		this.buttons.left.update(mouseData, this.mouseManager.events);
		this.buttons.right.update(mouseData, this.mouseManager.events);

		this.buttons.a.update(mouseData, this.mouseManager.events);
		this.buttons.b.update(mouseData, this.mouseManager.events);

		// Update Game
		this.player.update();
	}

	renderInGameDisplay(ctx, keyData, mouseData) {
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		// Render Game
		this.camera.update();

		ctx.fillStyle = 'green';
		ctx.fillRect(0, 0, this.map.width, this.map.height);

		this.player.render(ctx);

		this.camera.stop();

		// Display in screen
		this.buttons.mute.render(ctx);
		this.buttons.up.render(ctx);
		this.buttons.down.render(ctx);
		this.buttons.left.render(ctx);
		this.buttons.right.render(ctx);

		this.buttons.a.render(ctx);
		this.buttons.b.render(ctx);

		ctx.font = '15px sans-serif';
		ctx.textAlign = "start";
		ctx.textBaseline = 'alphabetic';
		ctx.fillStyle = 'yellow';
		ctx.fillText('FPS: ' + this.FPS, 50, 50);
		ctx.fillText('UPS: ' + this.UPS, 50, 80);
	}

	// Adjust position based on canvas size
	updatePositionOfInGameButtons() {
		const width = this.canvas.width;
		const height = this.canvas.height;

		this.buttons.mute.x = width - this.buttons.mute.width - 50;

		this.buttons.up.y = height - (this.buttons.down.height * 3) - 50;
		this.buttons.down.y = height - this.buttons.down.height - 50;
		this.buttons.left.y = height - (this.buttons.down.height * 2) - 50;
		this.buttons.right.y = height - (this.buttons.down.height * 2) - 50;

		this.buttons.a.x = width - (this.buttons.down.width * 2.5) - 50;
		this.buttons.a.y = height - (this.buttons.down.height * 2) - 50;
		this.buttons.b.x = width - this.buttons.down.width - 50;
		this.buttons.b.y = height - (this.buttons.down.height * 2) - 50;
	}
}