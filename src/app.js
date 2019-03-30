import MapManager from './lib/mapManager';
import GridGenerator from './lib/gridGenerator';

let mapManager = new MapManager();
let canvas = mapManager.findPath(1,5);
for(let canva of canvas) {
	document.body.appendChild(canva);		
}

let gridGenerator = new GridGenerator();
let canvasGenerator = gridGenerator.generate();
document.body.appendChild(canvasGenerator);

let button = document.createElement('button');
button.innerText = 'Matrix';
button.addEventListener('click', e => {
	console.log(JSON.stringify(gridGenerator.getMatrix()));
}, false);
document.body.appendChild(button);