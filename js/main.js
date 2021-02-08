document.getElementById('water-music').play().then(() => {
	
}).catch(error => {
	
});

function play() {
	document.getElementById('water-music').play();
}

const engine = new GameEngine(this);
engine.start();