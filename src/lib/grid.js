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

		this.config = {
			scale: 10,
			width: 570,
			height: 380,
			originX: 300,
			originY: 380
		};
		this.newCachedMap(this.config);
	}

	calculatePath(xStart, yStart, xEnd, yEnd) {
		let calculatedPath = new PF.BestFirstFinder({
			allowDiagonal: false,
    		dontCrossCorners: true,
    		heuristic: PF.Heuristic.manhattan
		}).findPath(xStart, yStart, xEnd, yEnd, this.pf);

		let comparablePath = this.path.map(p => p[0]+':'+p[1]);
		for(let point of calculatedPath) {
			if(!comparablePath.includes(point[0]+':'+point[1])) 
				this.path.push(point);
		}
	}

	newCachedMap(config) {
		let canvas = document.createElement('canvas');
		canvas.width = config.width;
		canvas.height = config.height;

		let iso = new Isomer(canvas, {
			scale: config.scale,
			originX: config.originX,
			originY: config.originY
		});

		let h = this.matrix.length;
		let w = this.matrix[0].length;

		//Draw map
		for(let y=0; y<h; y++) {
			for(let x=w-1; x>=0; x--) {
				if(this.matrix[y][x] == 1)
					iso.add(Isomer.Shape.Prism(new Isomer.Point(x, h-y, 0),1,1,.5));
			}
		}

		this.cachedMap = canvas;
	}

	getCanvas() {
		let canvas = document.createElement('canvas');
		let ctx = canvas.getContext('2d');

		canvas.width = this.config.width;
		canvas.height = this.config.height;

		canvas.initMap = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			//Draw walls
			ctx.drawImage(this.cachedMap, 0, 0);

			//Draw info
			ctx.font = "20px Arial";
			ctx.fillText(Number(this.level+1)+'F', 10, 20);
		}
		canvas.initMap();
	
		//Set animation callback
		canvas.startAnimation = () => {
			//console.table(this.path);
			if(this.path.length) {
				canvas.initMap();

				let iso = new Isomer(canvas, {
					scale: this.config.scale,
					originX: this.config.originX,
					originY: this.config.originY
				});

				let h = this.matrix.length;
				let w = this.matrix[0].length;

				for(let i=0; i<this.path.length; i++) {
					let pos = this.path[i];

					setTimeout(() => {
						//Draw path
						iso.add(Isomer.Shape.Prism(
							new Isomer.Point(pos[0],h-pos[1],0), 1, 1, 0),
							new Isomer.Color(50, 160, 60)
						);

						//Draw start
						if(i < 4) {
							iso.add(new Isomer.Shape.Pyramid(
								new Isomer.Point(this.path[0][0]-1, h-this.path[0][1]-1, 1)), 
								new Isomer.Color(160, 60, 50)
							);
						}

						//Draw finish
						if(i == this.path.length-1) {
							iso.add(new Isomer.Shape.Prism(
								new Isomer.Point(this.path[this.path.length-1][0]-1, h-this.path[this.path.length-1][1]-1, 1), 1, 1, 0), 
								new Isomer.Color(160, 60, 50)
							);
						}

						//Draw walls
						ctx.drawImage(this.cachedMap, 0, 0);
					}, 25*i);
				}
			}
		};

		return canvas;
	}
}