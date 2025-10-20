/**
 * Interfaz (clase abstracta) para las estrategias de cálculo de ruta.
 * Implementa el patrón Strategy.
 */
class CalculadoraRuta {
    /**
     * Calcula una ruta entre un origen y un destino.
     * @param {string} origenId - ID de la ciudad de origen.
     * @param {string} destinoId - ID de la ciudad de destino.
     * @param {Graph} graph - Instancia del grafo de ciudades.
     * @returns {Object} - Objeto con la distancia y el camino de la ruta.
     * @throws {Error} - Si el método no es implementado por una subclase.
     */
    calcular(origenId, destinoId, graph) {
        throw new Error("Este método debe implementarse en las subclases");
    }
}