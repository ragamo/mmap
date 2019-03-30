import * as PF from 'pathfinding';
import Isomer from 'isomer';

export default class Grid {
	
	constructor(id = null, level = 0, matrix = [[]]) {
		this.id = id;
		this.level = level;

		this.blockSize = 8;
		this.matrix = matrix;

		this.pf = new PF.Grid(matrix);
		this.path = [];
	}

	calculatePath(xStart, yStart, xEnd, yEnd) {
		let calculatedPath = new PF.BestFirstFinder({
			//allowDiagonal: true,
    		dontCrossCorners: true,
    		//heuristic: PF.Heuristic.chebyshev
		}).findPath(xStart, yStart, xEnd, yEnd, this.pf);

		this.path = Object.assign(this.path, calculatedPath);
	}

	getCanvas() {
		let canvas = document.createElement('canvas');
		canvas.width = 320;
		canvas.height = 200;

		let iso = new Isomer(canvas, {
			scale: 10,
			originX: 20,
			originY: 100
		});
	
		//Draw path
		console.log(this.path);
		for(let pos of this.path) {
			iso.add(Isomer.Shape.Prism(
				new Isomer.Point(pos[0],1-pos[1],0), 1, 1, 0),
				new Isomer.Color(50, 160, 60)
			);
		}

		//Draw map
		let h = this.matrix.length;
		let w = this.matrix[0].length;
		for(let y=0; y<h; y++) {
			for(let x=w-1; x>=0; x--) {
				if(this.matrix[y][x] == 1)
					iso.add(Isomer.Shape.Prism(new Isomer.Point(x, -y, 0)));
			}
		}

		//Draw location
		iso.add(new Isomer.Shape.Pyramid(
			new Isomer.Point(this.path[0][0]-1, -this.path[0][1], 1)), 
			new Isomer.Color(160, 60, 50)
		);

		

		return canvas;
	}
}