import MapManager from './lib/mapManager';

let mapManager = window.mm = new MapManager();
let canvas = mapManager.findPath(1,5);
for(let canva of canvas) {
	document.body.appendChild(canva);		
}


/*mapManager.findPath(idNodeStart, idNodeEnd)
	.then(pathCanvas => {

	})

mapManager.getNextStep();
	*/