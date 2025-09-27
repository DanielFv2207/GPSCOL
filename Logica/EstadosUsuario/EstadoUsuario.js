/**
 * Interfaz (clase abstracta) para los estados de usuario.
 * Implementa el patrón State.
 */
class EstadoUsuario {
    /**
     * Calcula el costo de una ruta para el estado actual del usuario.
     * @param {Object} ruta - Objeto que representa la ruta, con una propiedad 'costo'.
     * @returns {number} - El costo calculado de la ruta.
     * @throws {Error} - Si el método no es implementado por una subclase.
     */
    calcularCostoRuta(ruta) {
        throw new Error("Método abstracto. Implementar en subclase.");
    }

    /**
     * Determina si el usuario puede ver rutas personalizadas.
     * @returns {boolean} - True si puede ver rutas personalizadas, false en caso contrario.
     * @throws {Error} - Si el método no es implementado por una subclase.
     */
    puedeVerRutasPersonalizadas() {
        throw new Error("Método abstracto. Implementar en subclase.");
    }
}