import MapManager from './lib/mapManager';
import GridGenerator from './lib/gridGenerator';

//Print maps
let mapManager = new MapManager();
let canvas = mapManager.findPath(12,3);
let index = 0;

let loadStep = (index = 0) => {
	document.querySelector('#map').innerHTML = '';
	document.querySelector('#map').appendChild(canvas[index]);	
	setTimeout(() => {
		canvas[index].startAnimation();
	}, 250);
}
loadStep();

document.querySelector('#nextStep').addEventListener('click', e => {
	loadStep(++index%3);
});

//Print initial grid generator
let gridGenerator = new GridGenerator();
let canvasGenerator = gridGenerator.generate();
document.querySelector('#mapGenerator').appendChild(canvasGenerator)

//Get Matrix event
document.querySelector('#getMatrix').addEventListener('click', e => {
	let matrix = JSON.stringify(gridGenerator.getMatrix());
	document.querySelector('#output').textContent = matrix;
});

//Load map event
document.querySelector('#loadMap').addEventListener('click', e => {
	let idMap = document.querySelector('#idMap').value;
	let map = mapManager.getMap(idMap);
	gridGenerator = new GridGenerator();
	let canvasGenerator = gridGenerator.generate(map.matrix);
	document.querySelector('#mapGenerator *').remove();
	document.querySelector('#mapGenerator').appendChild(canvasGenerator)
});