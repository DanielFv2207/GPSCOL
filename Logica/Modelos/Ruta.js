class Ruta {
    /**
     * @param {string} origenId - ID de la ciudad de origen.
     * @param {string} destinoId - ID de la ciudad de destino.
     * @param {number} distancia - Distancia de la ruta en km.
     * @param {string} [tipo='normal'] - Tipo de ruta (normal, scenic, safe, dangerous).
     */
    constructor(origenId, destinoId, distancia, tipo = 'normal') {
        if (!origenId || !destinoId || typeof distancia !== 'number' || distancia <= 0) {
            throw new Error("Datos de ruta inválidos.");
        }
        this.origenId = origenId;
        this.destinoId = destinoId;
        this.distancia = distancia;
        this.tipo = tipo;
    }
}