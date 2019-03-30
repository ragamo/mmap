//https://stackoverflow.com/questions/45339893/find-the-path-between-two-nodes-in-javascript-on-custom-data-structure/49030709
//
//  A --* B
//      / | \
//     *  |  *
//    C   |   D --* E
//     \  |  /     *
//      * * *     /
//        F------/
/*
const graph = buildGraphFromEdges([
	{ source: 'A', target: 'B' },
	{ source: 'B', target: 'C' },
	{ source: 'B', target: 'D' },
	{ source: 'B', target: 'F' },
	{ source: 'C', target: 'F' },
	{ source: 'D', target: 'E' },
	{ source: 'D', target: 'F' },
	{ source: 'F', target: 'E' },
]);

console.log('A -> A', findPath('A', 'A', graph)); // []
console.log('A -> F', findPath('A', 'F', graph)); // [{source: 'A', target: 'B'}, {source: 'B', target: 'F'}]
console.log('A -> E', findPath('A', 'E', graph)); // [{source: 'A', target: 'B'}, {source: 'B', target: 'D'}, {source: 'D', target: 'E'}]
console.log('E -> A', findPath('E', 'A', graph)); // null
*/

export default class Graph {

	constructor(nodes) {
		let edges = [];
		for(let node of nodes) {
			edges.push({ source: node.id, target: node.parent });
			edges.push({ source: node.parent, target: node.id });
		}

		this.graph = this.buildGraphFromEdges(edges);
	}

	addNode(graph, node) {
		graph.set(node, {
			in: new Set(), 
			out: new Set()
		});
	}

	connectNodes(graph, source, target) {
		graph.get(source).out.add(target);
		graph.get(target).in.add(source);
	}

	buildGraphFromEdges(edges) { 
		return edges.reduce(
			(graph, {source, target}) => {
				if(!graph.has(source))
					this.addNode(graph, source);

				if(!graph.has(target))
					this.addNode(graph, target);

				this.connectNodes(graph, source, target);
				return graph;
			},
			new Map()
		);
	}

	buildPath(target, path) {
		const result = [];
		while(path.has(target)) {
			const source = path.get(target);
			result.push(target);
			target = source;
		}
		return result.reverse();
	}

	findPath(source, target) {
		if(!this.graph.has(source))
			throw new Error('Unknown source.');

		if(!this.graph.has(target))
			throw new Error('Unknown target.');

		const queue = [source];
		const visited = new Set();
		const path = new Map();

		while(queue.length > 0) {
			const start = queue.shift();

			if(start === target)
				//return this.buildPath(start, path);
				return [source].concat(this.buildPath(start, path));

			for(const next of this.graph.get(start).out) {
				if(visited.has(next))
					continue;

				if(!queue.includes(next)) {
					path.set(next, start);
					queue.push(next);
				}
			}
			visited.add(start);
		}
		return [];
	}
}