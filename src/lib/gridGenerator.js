
export default class GridGenerator {
	
	constructor(w = 40, h = 40, blockSize = 10) {
		this.matrix = [[0]];
		this.w = w;
		this.h = h;
		this.blockSize = blockSize;
		this.mouseState = false;
		this.elements = [];
		this.canvas = null;
	}

	generate(matrix = null) {
		this.canvas = document.createElement('canvas');
		let ctx = this.canvas.getContext('2d');

		if(!matrix) {
			this.w = 40;
			this.h = 40;
			this.matrix = this.newMatrix();
		} else {
			this.w = matrix[0].length;
			this.h = matrix.length;
			this.matrix = matrix;
		}

		this.canvas.width = this.w * this.blockSize;
		this.canvas.height = this.h * this.blockSize;
		this.elements = this.buildVisualElements();
		
		this.canvas.addEventListener('mousedown', e => {
			this.mouseState = true;
		}, false);

		this.canvas.addEventListener('mouseup', e => {
			this.mouseState = false;
			this.drawGrid(ctx);
		}, false)

		let coords = document.querySelector('#coords');
		this.canvas.addEventListener('mousemove', e => {
			let pos = this.getMatrixPos(e);
			coords.innerHTML = '('+pos.x+','+pos.y+')';
			this.drawGrid(ctx);

			ctx.beginPath();
			ctx.rect(pos.x*this.blockSize, pos.y*this.blockSize, this.blockSize, this.blockSize);
			ctx.fillStyle = this.getFillStyle(1);
			ctx.fill();

			if(this.mouseState)
				this.matrix[pos.y][pos.x] = 1;
		}, false)

		this.drawGrid(ctx);
		return this.canvas;
	}

	getMatrixPos(e) {
		let x = e.pageX - this.canvas.offsetLeft;
		let y = e.pageY - this.canvas.offsetTop;

		// Collision detection between clicked offset and element.
		for(let element of this.elements) {
			if (y >= element.y && y <= element.y + element.h && x >= element.x && x <= element.x + element.w) {
				return {x: element.mx, y: element.my};
			}
		};
	}

	buildVisualElements() {
		let elements = [];
		for(let y=0; y<this.h; y++) {
			for(let x=0; x<this.w; x++) {
				elements.push({
					mx: x,
					my: y,
					x: x*this.blockSize,
					y: y*this.blockSize,
					w: this.blockSize,
					h: this.blockSize
				})
			}
		}
		return elements;
	}

	newMatrix() {
		let matrix = [];
		for(let y=0; y<this.h; y++) {
			let rows = [];
			for(let x=0; x<this.w; x++) {
				rows.push(0);
			}
			matrix.push(rows);
		}
		return matrix;
	}

	drawGrid(ctx) {
		for(let y=0; y<this.h; y++) {
			for(let x=0; x<this.w; x++) {
				ctx.beginPath();
				ctx.clearRect(x*this.blockSize, y*this.blockSize, this.blockSize, this.blockSize);
				ctx.rect(x*this.blockSize, y*this.blockSize, this.blockSize, this.blockSize);
				ctx.fillStyle = this.getFillStyle(this.matrix[y][x]);
				ctx.fill();
			}
		}
	}

	getFillStyle(type) {
		switch(type) {
			case 1: return '#ccc';
			case 2: return '#00f';
			default: return 'rgba(255, 255, 255, 0)';
		}
	}

	getMatrix() {
		return this.matrix;
	}
}