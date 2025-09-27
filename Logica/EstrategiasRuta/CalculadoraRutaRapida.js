class CalculadoraRutaRapida extends CalculadoraRuta {
    /**
     * Calcula la ruta más rápida entre dos ciudades usando Dijkstra.
     * @param {string} origenId - ID de la ciudad de origen.
     * @param {string} destinoId - ID de la ciudad de destino.
     * @param {Graph} graph - Instancia del grafo de ciudades.
     * @returns {Object} - Objeto con la distancia y el camino de la ruta.
     */
    calcular(origenId, destinoId, graph) {
        console.log("Calculando ruta más rápida de", origenId, "a", destinoId);
        // La implementación de Dijkstra en Graph ya busca la ruta más corta (rápida)
        return graph.dijkstra(origenId, destinoId);
    }
}