import { Graph } from './GraphSearch.js';

// instance a graph
let G = new Graph();

// Add nodes
G.addNode("Tito");
G.addNode("Leo");
G.addNode("Barcia");
G.addNode("Stefano")
G.addNode("Luis");
G.addNode("Lulu");
G.addNode("Ginger");
G.addNode("Anibal");

// Add edges
G.addEdge("Tito", "Leo");
G.addEdge("Leo", "Barcia");
G.addEdge("Tito", "Luis");
G.addEdge("Luis", "Ginger");
G.addEdge("Luis", "Anibal");
G.addEdge("Ginger", "Stefano");
G.addEdge("Ginger", "Lulu");
G.addEdge("Anibal", "Ginger");
G.addEdge("Anibal", "Stefano");

// View the graph for this expample
G.display();

// run IDDFS algorithm to search "Stefano" from "Leo"
// G.search("Stefano", "Leo")
let src = "Barcia", goal = "Stefano";
let result = G.IDDFS(src, goal);
console.log(`Existe o no camino de ${src} a ${goal} ->  ${result}`);

console.log(`******* CAMINO MAS CORTO ENTRE ${src} Y ${goal} ********`);
let ruta = G.shortest_path(src, goal);
console.log(ruta);
