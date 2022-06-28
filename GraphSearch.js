
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


    DLS_node (src, target, depth_limit, path) {
        if (src == target) {
            path.push(src); 
            console.log(`
            Si el SRC y TARGE son iguales
                PATH: ${path}
                SCR: ${src}
                TARGET: ${target}
                LIMIT: ${depth_limit}
            `);
            return path;
        }
        if (depth_limit <= 0) {
            console.log(`
            Si el LIMIT es menos o igual a 0
                PATH: ${path}
                SCR: ${src}
                TARGET: ${target}
                LIMIT: ${depth_limit}
            `);
            return path;
        }
        for (let w of this.edges[src].map(n => n.node)) {
            let r = this.DLS_node(w, target, depth_limit-1, path)
            console.log(`
            ]]]]]] Entra en el for
                    PATH: ${path}
                    SCR: ${src}
                    TARGET: ${target}
                    LIMIT: ${depth_limit}
                    VERTICES ADYACENTES: ${this.edges[src].map(n => n.node)}
                    W: ${w}
                    R: ${r}
            `);
            if (r.length > 0) {
                path.push(src);
                console.log("Entro a if..")
                return path;
            }
        }
        return path;
    }

    IDDFS_node (src, dest) {
        let route = [];
        for (let depth = 0; depth <= this.nodes.length; depth++) {
            let msg = `
                PROFUNDIDAD: ${depth}
            `;
            console.log(msg);
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
        return path;
    }
}
