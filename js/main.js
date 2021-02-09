
const engine = new GameEngine();
resizeCanvas();

window.addEventListener('resize', () => {
	resizeCanvas();
});

function resizeCanvas() {
	engine.canvas.width = window.innerWidth;
	engine.canvas.height = window.innerHeight;

	engine.updatePositionOfInGameButtons();

	if (document.fullscreenElement === null) {
		engine.isFullScreen = false;
		engine.bgm.pause();
	}
}

function preload() {
	init();
}

function init() {
	engine.start();
}

preload();