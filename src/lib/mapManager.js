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

	getNode(idNode) {
		return this.nodes.filter(node => node.id == idNode)[0] 
			|| new Error('Node ID: '+idNode+' do not exist.');
	}

	findPath(idNodeStart, idNodeEnd, otro) {
		let startNode = this.getNode(idNodeStart);
		let endNode = this.getNode(idNodeEnd);
		let otroNode = this.getNode(otro);

		//TODO: Verify same level nodes
		this.currentLevel.findPath(startNode.pos[0], startNode.pos[1], endNode.pos[0], endNode.pos[1]);
		this.currentLevel.findPath(endNode.pos[0], endNode.pos[1], otroNode.pos[0], otroNode.pos[1]);
		return this.currentLevel.getCanvas();

		/**
			0. Verificar conexion entre nodos
			1. Detectar por cuantos niveles pasa la ruta
			2. Por cada nivel, calcular la ruta entre los puntos
			3. Generar stack de pasos a seguir por nivel
			4. Crear metodo nextStep que retorne el proximo canvas
		*/

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
			},{
				id: 2,
				idMap: 1,
				pos: [6,13],
				parent: 1,
				type: 'beacon',
			},{
				id: 3,
				idMap: 1,
				pos: [15, 9],
				parent: 2,
				type: 'gate',
			},{
				id: 4,
				idMap: 1,
				pos: [15, 10],
				parent: 2,
				type: 'keypoint',
				meta: {
					name: 'Counter LATAM',
					icon: 'ico.png'
				},
			}]
		};

		/*return new Promise((resolve, reject) => {
			//TODO: Fetch API
			resolve(map);
		});*/

		this.processLoad(map);
	}
}