
export class Graph {
    constructor () {
        this.edges = {};
        this.nodes = [];
        this.path = [];
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
        let graph = "\t\tLista de adyacencia para el grafo establecido: \n";
        this.nodes.forEach(node => {
            let adjacents_nodes = this.edges[node].map(n => n.node).join(", ");
            if (adjacents_nodes.length > 0)
                graph += node + " -> " + adjacents_nodes + "\n";
            else
                graph += node + " (no tiene aristas adyacentes)" + "\n";
        });
        console.log(graph);
    }

    // IDDFS implementation with boolean values
    DLS (src, target, depth_limit) {
        if (src == target)
            return true;
        if (depth_limit <= 0)
            return false;
        for (let w of this.edges[src].map(n => n.node)) {
            if (this.DLS(w, target, depth_limit-1) == true)
                return true;
        }
        return false;
    }

    IDDFS (initial_node, goal_node) {
        for (let depth = 0; depth <= this.nodes.length; depth++) {
            if (this.DLS(initial_node, goal_node, depth) == true)
                return true;
        }
        return false;
    }

    // iDDFS implementation with nodes
    DLS_node (src, target, depth_limit, path) {
        if (src == target) {
            path.push(src); 
            return path;
        }
        if (depth_limit <= 0)
            return path;
        for (let w of this.edges[src].map(n => n.node)) {
            let r = this.DLS_node(w, target, depth_limit-1, path)
            if (r.length > 0) {
                path.push(src);
                return path;
            }
        }
        return path;
    }

    IDDFS_node (src, dest) {
        let route = [];
        for (let depth = 0; depth <= this.nodes.length; depth++) {
            let res = this.DLS_node(src, dest, depth, route);
            if (res.length > 0) {
                return res;
            }
        }
        return route;
    }

    shortest_path (init_node, goal_node) {
        // encontrar el nodo
        // retornar el nodo
        let path = this.IDDFS_node(init_node, goal_node);
        return path.reverse().join(" -> ");
    }
}
