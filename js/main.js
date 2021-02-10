
const engine = new GameEngine();

window.addEventListener('resize', () => {
	engine.isResize = true;
});

function preload() {
	init();
}

function init() {
	engine.start();
}

preload();