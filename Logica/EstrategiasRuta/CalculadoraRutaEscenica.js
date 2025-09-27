class CalculadoraRutaEscenica extends CalculadoraRuta {
    /**
     * Calcula la ruta más escénica entre dos ciudades.
     * Similar a la ruta segura, esta estrategia podría implicar un ajuste de pesos
     * en el grafo para favorecer rutas con atributos "escénicos".
     * @param {string} origenId - ID de la ciudad de origen.
     * @param {string} destinoId - ID de la ciudad de destino.
     * @param {Graph} graph - Instancia del grafo de ciudades.
     * @returns {Object} - Objeto con la distancia y el camino de la ruta.
     */
    calcular(origenId, destinoId, graph) {
        console.log("Calculando ruta más escénica de", origenId, "a", destinoId);
        // Podríamos ajustar los pesos del grafo para priorizar rutas "escénicas"
        // Por ahora, usa la misma lógica de distancia mínima
        return graph.dijkstra(origenId, destinoId);
    }
}