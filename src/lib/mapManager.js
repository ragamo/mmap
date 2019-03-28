import Grid from './grid';

export default class MapManager {

	constructor(endpoint = '') {
		this.stack = [];
		this.nodes = [];
		this.currentLevel = null;

		this.loadMap(endpoint);
	}

	getCurrentLevel() {
		return this.currentLevel;
	}

	findPath(idNodeStart, idNodeEnd) {
		//Verify if nodes exists
		let checker = this.nodes.reduce((curr, node) => {
			return node.id == idNodeStart || node.id == idNodeEnd
		}, false);
		
		if(!checker)
			return new Error('One or both selected nodes do not exist.');

		//TODO: Find path in the tree
	}

	processLoad(map) {
		//Process map layout
		for(let level of map.levels) {
			let gridLevel = new Grid(level.id, level.zLevel, level.map)
			this.stack.push(gridLevel);

			if(level.zLevel == 0) 
				this.currentLevel = gridLevel;
		}

		if(!this.currentLevel)
			this.currentLevel = this.stack[this.stack.length-1];

		//Process nodes
		this.nodes = Object.assign([], map.nodes);
	}

	loadMap(endpoint) {
		let map = {
			levels: [{
				id: 1,
				zLevel: 0,
				map: [
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0],
				]
			},{
				id: 2,
				zLevel: 1,
				map: [
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
					[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
					[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
				]
			}],
			nodes: [{
				id: 1,
				idMap: 1,
				pos: [1,1],
				parent: null,
				type: 'beacon',
				//macAddress: '00:00:00:00:00:00'
			},{
				id: 2,
				idMap: 1,
				pos: [15, 10],
				parent: 1,
				type: 'gate',
				//macAddress: '00:00:00:00:00:00'
			}]
		};

		/*return new Promise((resolve, reject) => {
			//TODO: Fetch API
			resolve(map);
		});*/

		this.processLoad(map);
	}
}