class CalculadoraRutaSegura extends CalculadoraRuta {
    /**
     * Calcula la ruta más segura entre dos ciudades.
     * Por simplicidad, se asume que la ruta segura podría ser ligeramente más larga
     * o tener un factor de tiempo diferente. Aquí se usa la misma lógica de Dijkstra
     * pero se podría modificar el peso de los bordes en el grafo para reflejar la seguridad.
     * @param {string} origenId - ID de la ciudad de origen.
     * @param {string} destinoId - ID de la ciudad de destino.
     * @param {Graph} graph - Instancia del grafo de ciudades.
     * @returns {Object} - Objeto con la distancia y el camino de la ruta.
     */
    calcular(origenId, destinoId, graph) {
        console.log("Calculando ruta más segura de", origenId, "a", destinoId);
        // Podríamos ajustar los pesos del grafo para priorizar rutas "seguras"
        // Por ahora, usa la misma lógica de distancia mínima
        return graph.dijkstra(origenId, destinoId);
    }
}