import MapManager from './lib/mapManager';
import GridGenerator from './lib/gridGenerator';

//Print maps
let mapManager = new MapManager();
let canvas = mapManager.findPath(12,3);
for(let canva of canvas) {
	document.querySelector('#maps').appendChild(canva);	
}

//Print initial grid generator
let gridGenerator = new GridGenerator();
let canvasGenerator = gridGenerator.generate();
document.querySelector('#mapGenerator').appendChild(canvasGenerator)

//Get Matrix event
document.querySelector('#getMatrix').addEventListener('click', e => {
	let matrix = JSON.stringify(gridGenerator.getMatrix());
	document.querySelector('#output').textContent = matrix;
}, false);

//Load map event
document.querySelector('#loadMap').addEventListener('click', e => {
	let idMap = document.querySelector('#idMap').value;
	let map = mapManager.getMap(idMap);
	gridGenerator = new GridGenerator();
	let canvasGenerator = gridGenerator.generate(map.matrix);
	document.querySelector('#mapGenerator *').remove();
	document.querySelector('#mapGenerator').appendChild(canvasGenerator)
}, false);