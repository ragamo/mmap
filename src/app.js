import MapManager from './lib/mapManager';

let mapManager = window.mm = new MapManager();
let canvas = mapManager.findPath(1,2,3);
document.body.appendChild(canvas);	

/*mapManager.findPath(idNodeStart, idNodeEnd)
	.then(pathCanvas => {

	})

mapManager.getNextStep();
	*/