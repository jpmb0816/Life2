
const engine = new GameEngine();
resizeCanvas();

window.addEventListener('resize', () => {
	resizeCanvas();
});

// ['', 'webkit', 'moz', 'ms'].forEach(prefix => window.addEventListener(prefix + 'fullscreenchange', fullScreenChange, false));

function resizeCanvas() {
	engine.canvas.width = window.innerWidth;
	engine.canvas.height = window.innerHeight;

	if (screen.width !== window.innerWidth){
		engine.isFullScreen = false;
		engine.bgm.pause();
	}
}

// function fullScreenChange() {
// 	if (engine.isFullScreen) {
// 		engine.bgm.pause();
// 	}
// }

function preload() {
	init();
}

function init() {
	engine.start();
}

preload();