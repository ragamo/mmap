import MapManager from './lib/mapManager';
import GridGenerator from './lib/gridGenerator';

let mapManager = new MapManager();
let canvas = mapManager.findPath(1,6);
for(let canva of canvas) {
	document.querySelector('#maps').appendChild(canva);	
}

let button = document.createElement('button');
button.innerText = 'Matrix';
button.addEventListener('click', e => {
	let matrix = JSON.stringify(gridGenerator.getMatrix());
	document.querySelector('#output').textContent = matrix;
}, false);
document.querySelector('#mapActions').appendChild(button);

let gridGenerator = new GridGenerator();
let canvasGenerator = gridGenerator.generate();
document.querySelector('#mapGenerator').appendChild(canvasGenerator)