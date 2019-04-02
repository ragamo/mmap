import MapManager from './lib/mapManager';
import GridGenerator from './lib/gridGenerator';

/**
 * LOAD MAP
 */
let from = 12;
let to = 1;
let mapManager = window.mm = new MapManager();
let canvas = mapManager.findPath(from, to);
let index = 0;

//Next step
let loadStep = (index = 0) => {
	document.querySelector('#map').innerHTML = '';
	document.querySelector('#map').appendChild(canvas[index]);	
	setTimeout(() => {
		canvas[index].startAnimation();
	}, 250);
}
loadStep();

//Next step event listener
document.querySelector('#nextStep').addEventListener('click', e => {
	loadStep(++index % canvas.length);
});

let goFromDOM = document.querySelector('#goFrom');
let goToDOM = document.querySelector('#goTo');
let availableNodes = mapManager.nodes.map(n => ({id: n.id, name: n.name }));
for(let node of availableNodes) {
	let option = document.createElement('option');
	option.value = node.id;
	option.innerText = node.name;
	goFromDOM.appendChild(option.cloneNode(true));
	goToDOM.appendChild(option.cloneNode(true));
}
//Go to event listener
goToDOM.addEventListener('change', e => {
	to = Number(goToDOM.value);
	document.querySelector('#nextStep').style.display = 'none';
});
goFromDOM.addEventListener('change', e => {
	from = Number(goFromDOM.value);
	document.querySelector('#nextStep').style.display = 'none';
})
document.querySelector('#findRoute').addEventListener('click', function() {
	document.querySelector('#nextStep').style.display = 'inline-block';
	mapManager = new MapManager();
	canvas = mapManager.findPath(from, to);
	index = 0;	
	loadStep();
})

/**
 * MAP GENERATOR
 */
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