import Grid from './grid';
import Graph from './graph';

export default class MapManager {

	constructor(endpoint = '') {
		this.stack = [];
		this.nodes = [];
		this.graph = null;
		this.currentLevel = null;

		this.loadMap(endpoint);
	}

	getCurrentLevel() {
		return this.currentLevel;
	}

	getNode(idNode) {
		return this.nodes.filter(node => node.id == idNode)[0] 
			|| new Error('Node #'+idNode+' not found.');
	}

	getMap(idMap) {
		return this.stack.filter(map => map.id == idMap)[0]
			|| new Error('Map #'+idMap+' not found.')
	}

	findPath(idNodeStart, idNodeEnd) {
		if(idNodeStart == idNodeEnd) 
			return new Error('No route.');

		/**
			0. ✓ Verificar conexion entre nodos 
			1. ✓ Detectar por cuantos niveles pasa la ruta
			2. ✓ Por cada nivel, calcular la ruta entre los puntos
			3. ✓ Generar stack de pasos a seguir por nivel
		*/

		let levels = [];
		let path = this.graph.findPath(idNodeStart, idNodeEnd).map(idNode => {
			return this.getNode(idNode);
		});

		if(!path.length)
			throw new Error('It was not possible to find a route.');

		for(let node of path) {
			let map = this.getMap(node.idMap)
			if(!levels.includes(map))
				levels.push(map);
		}

		let canvasStack = [];
		console.log('Path: ', path);
		for(let map of levels) {
			let nodes = path.filter(n => n.idMap == map.id);
			if(nodes.length >= 2) {
				for(let i=0; i<nodes.length-1; i++) {
					console.log(nodes[i].pos[0], nodes[i].pos[1], nodes[i+1].pos[0], nodes[i+1].pos[1]);
					map.calculatePath(nodes[i].pos[0], nodes[i].pos[1], nodes[i+1].pos[0], nodes[i+1].pos[1]);
				}
				canvasStack.push(map.getCanvas());
			}
		}

		return canvasStack;
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
		this.graph = new Graph(this.nodes);
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
				pos: [2,2],
				parent: null,
				type: 'beacon'
			},{
				id: 2,
				idMap: 1,
				pos: [4,16],
				parent: 1,
				type: 'beacon'
			},{
				id: 3,
				idMap: 1,
				pos: [15, 10],
				parent: 2,
				type: 'gate'
			},{
				id: 4,
				idMap: 2,
				pos: [5, 2],
				parent: 3,
				type: 'keypoint',
				meta: {
					name: 'Counter LATAM',
					icon: 'ico.png'
				}
			},{
				id: 5,
				idMap: 2,
				pos: [10, 10],
				parent: 4,
				type: 'keypoint',
				meta: {
					name: 'Counter LATAM',
					icon: 'ico.png'
				}
			}]
		};

		/*return new Promise((resolve, reject) => {
			//TODO: Fetch API
			resolve(map);
		});*/

		this.processLoad(map);
	}
}