
const engine = new GameEngine();
resizeCanvas();

window.addEventListener('resize', () => {
	resizeCanvas();
});

function resizeCanvas() {
	engine.canvas.width = window.innerWidth;
	engine.canvas.height = window.innerHeight;
}

function preload() {
	init();
}

function init() {
	engine.start();
}

preload();