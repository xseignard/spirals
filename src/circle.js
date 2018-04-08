class Circle {
	constructor(cx, cy, r, speed) {
		this.cx = cx;
		this.cy = cy;
		this.r = r;
		this.speed = speed;
		this.angle = 0;
		this.size = 5;
		this.x = this.cx + this.r * Math.cos(this.angle);
		this.y = this.cy + this.r * Math.sin(this.angle);
	}

	update() {
		this.angle += this.speed;
		this.x = this.cx + this.r * Math.cos(this.angle);
		this.y = this.cy + this.r * Math.sin(this.angle);
	}

	draw(ctx) {
		ctx.save();
		ctx.strokeStyle = '#666';
		ctx.fillStyle = '#666';
		ctx.beginPath();
		ctx.arc(this.cx, this.cy, this.r, 0, Math.PI * 2);
		ctx.stroke();
		ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
		ctx.restore();
	}

	getDelayedCoords(delay) {
		const x = this.cx + this.r * Math.cos(this.angle - delay);
		const y = this.cy + this.r * Math.sin(this.angle - delay);
		return { x, y };
	}
}

export default Circle;
