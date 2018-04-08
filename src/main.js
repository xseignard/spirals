import Stats from 'stats.js';
import Circle from './circle';
import './style/main.css';

// stats
const stats = new Stats();
document.body.appendChild(stats.domElement);

// canvas stuff
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
let W = (canvas.width = window.innerWidth);
let H = (canvas.height = window.innerHeight);

// origin and targets points
let origin;
let targets = [];

// tweaking
const pointsOnLine = 300;
const factor = 5;
const numberOfTargets = 30;
const minRadius = 5;
const maxRadius = 100;
const minSpeed = 0.01;
const maxSpeed = 0.05;
const debug = false;

// helpers
const lerp = (a, b, t) => (1 - t) * a + t * b;
const between = (a, b) => a + Math.random() * (b - a);

// initialize our scene
const setup = () => {
	ctx.fillStyle = '#fff';
	ctx.strokeStyle = '#fff';
	origin = new Circle(W / 2, 9 * H / 10, 1, 0);
	for (let i = 0; i < numberOfTargets; i++) {
		const cx = W / 2 + between(-0.1, 0.1) * W / 2;
		const cy = 2 * H / 10 + Math.random() * H / 2;
		const r = between(minRadius, maxRadius);
		const speed = between(minSpeed, maxSpeed);
		const c = new Circle(cx, cy, r, speed);
		targets.push(c);
	}
};

// draw our scene
let raf;
const draw = dt => {
	stats.begin();

	ctx.clearRect(0, 0, W, H);
	// update circles
	origin.update();
	targets.forEach(t => t.update());
	// draw them
	if (debug) {
		origin.draw(ctx, true);
		targets.forEach(t => t.draw(ctx));
	}

	// draw points on line between origin and each targets
	const size = 1;
	for (let i = 0; i < pointsOnLine; i++) {
		targets.forEach(t => {
			const current = i / pointsOnLine;
			// delayed origin
			const dOrigin = origin.getDelayedCoords(factor * current);
			// delayed taget
			const dt = t.getDelayedCoords(factor * current);
			// lerped point between delayed origin and delayed target
			const x = lerp(dOrigin.x, dt.x, current);
			const y = lerp(dOrigin.y, dt.y, current);
			ctx.fillStyle = `rgba(255, 255, 255, ${1 - current})`;
			ctx.fillRect(x - size / 2, y - size / 2, size, size);
		});
	}

	stats.end();
	raf = requestAnimationFrame(draw);
};

setup();
requestAnimationFrame(draw);

// resize handler
const handleResize = () => {
	W = canvas.width = window.innerWidth;
	H = canvas.height = window.innerHeight;
	console.log(W, H);
	cancelAnimationFrame(raf);
	setup();
	draw();
};
window.addEventListener('resize', handleResize, false);
