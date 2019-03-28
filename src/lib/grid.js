import * as PF from 'pathfinding';

export default class Grid {
	
	constructor(id = null, level = 0, matrix = [[]]) {
		this.id = id;
		this.level = level;

		this.blockSize = 8;
		this.matrix = matrix;

		this.pf = new PF.Grid(matrix);
		this.path = [];
	}

	getCanvas() {
		let canvas = document.createElement('canvas');
		let ctx = canvas.getContext('2d');
		let h = this.matrix.length;
		let w = this.matrix[0].length;		
		canvas.width = w*this.blockSize;
		canvas.height = h*this.blockSize;
		
		for(let y=0; y<h; y++) {
			for(let x=0; x<w; x++) {
				ctx.beginPath();
				ctx.rect(x*this.blockSize, y*this.blockSize, this.blockSize, this.blockSize);
				ctx.fillStyle = this.getFillStyle(this.matrix[y][x]);
				ctx.fill();
				//ctx.stroke();
			}
		}

		//this.drawPath(ctx);

		return canvas;
	}

	getFillStyle(type) {
		switch(type) {
			case 1: return '#ccc';
			case 2: return '#00f';
			default: return '#fff'
		}
	}

	findPath(xStart, yStart, xEnd, yEnd) {
		this.path = new PF.AStarFinder({
			allowDiagonal: true,
    		dontCrossCorners: true,
    		//heuristic: PF.Heuristic.octile
		}).findPath(xStart, yStart, xEnd, yEnd, this.pf);
	}

	drawPath(ctx) {
		let delta = this.blockSize;

		ctx.beginPath();
		ctx.moveTo(this.path[0][0]*delta +delta/2, this.path[0][1]*delta +delta/2);

		for(let i=1; i<this.path.length; i++) {
			console.log(this.path[i]);
			ctx.lineTo(this.path[i][0]*delta +delta/2, this.path[i][1]*delta +delta/2);
		}

		ctx.fillStyle = '#000';
		ctx.lineWidth = 4;
		ctx.stroke();
	}

}