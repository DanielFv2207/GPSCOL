/**
 * Implementación de un grafo para el algoritmo de Dijkstra.
 */
class Graph {
    constructor() {
        this.vertices = {}; // { 'ciudadId': { 'vecinoId': weight, ... } }
    }

    /**
     * Agrega un vértice (ciudad) al grafo.
     * @param {string} vertex - El ID del vértice.
     */
    addVertex(vertex) {
        if (!this.vertices[vertex]) {
            this.vertices[vertex] = {};
        }
    }

    /**
     * Agrega una arista (conexión de ruta) entre dos vértices.
     * @param {string} vertex1 - ID del primer vértice.
     * @param {string} vertex2 - ID del segundo vértice.
     * @param {number} weight - Peso de la arista (distancia).
     */
    addEdge(vertex1, vertex2, weight) {
        this.addVertex(vertex1);
        this.addVertex(vertex2);
        this.vertices[vertex1][vertex2] = weight;
        this.vertices[vertex2][vertex1] = weight; // Asume grafo no dirigido
    }

    /**
     * Implementa el algoritmo de Dijkstra para encontrar la ruta más corta.
     * @param {string} start - ID del vértice de inicio.
     * @param {string} end - ID del vértice final.
     * @returns {Object} - Objeto con la distancia total y el camino (array de IDs de vértices).
     */
    dijkstra(start, end) {
        const distances = {};
        const previous = {};
        const unvisited = new Set();

        // Inicializar distancias
        for (let vertex in this.vertices) {
            distances[vertex] = vertex === start ? 0 : Infinity;
            previous[vertex] = null;
            unvisited.add(vertex);
        }

        while (unvisited.size > 0) {
            // Encontrar el vértice no visitado con menor distancia
            let current = null;
            for (let vertex of unvisited) {
                if (current === null || distances[vertex] < distances[current]) {
                    current = vertex;
                }
            }

            if (current === end) break;
            if (distances[current] === Infinity) break; // No hay camino al resto de nodos

            unvisited.delete(current);

            // Actualizar distancias de vecinos
            for (let neighbor in this.vertices[current]) {
                if (unvisited.has(neighbor)) {
                    const alt = distances[current] + this.vertices[current][neighbor];
                    if (alt < distances[neighbor]) {
                        distances[neighbor] = alt;
                        previous[neighbor] = current;
                    }
                }
            }
        }

        // Reconstruir ruta
        const path = [];
        let current = end;
        while (current !== null) {
            path.unshift(current);
            current = previous[current];
        }

        // Si el camino no incluye el inicio, significa que no se encontró una ruta
        if (path[0] !== start) {
            return { distance: Infinity, path: [] };
        }

        return {
            distance: distances[end],
            path: path
        };
    }
}