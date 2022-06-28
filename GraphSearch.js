
export class Graph {
    constructor () {
        this.edges = {};
        this.nodes = [];
    }

    addNode(node) {
        this.nodes.push(node);
        this.edges[node] = [];
    }

    addEdge(src, dest) {
        this.edges[src].push({ node: dest });
        this.edges[dest].push({ node: src });
    }

    addDirectedEdge(src, dest) {
        this.edges[src].push({ node: dest});
    }

    display() {
        let graph = "Lista de adyacencia para el grafo establecido: \n";
        this.nodes.forEach(node => {
            let adjacents_nodes = this.edges[node].map(n => n.node).join(", ");
            if (adjacents_nodes.length > 0)
                graph += node + " -> " + adjacents_nodes + "\n";
            else
                graph += node + " (no tiene aristas adyacentes)" + "\n";
        });
        console.log(graph);
    }

    DLS (src, target, depth_limit) {
        if (src == target)
            return true;
        if (depth_limit <= 0)
            return false;
        // for all neighbours w of node
        for (let node of this.nodes) {
            for (let w of this.edges[node].map(n => n.node)) {
                if (this.DLS(w, target, depth_limit-1) == true)
                    return true;
            }
        }
        return false;
    }

    IDDFS (initial_node, goal_node) {
        for (let depth = 0; depth <= this.nodes.length; depth++) 
            if (this.DLS(initial_node, goal_node, depth) == true)
                return true;
        
        return false;
    }
}
