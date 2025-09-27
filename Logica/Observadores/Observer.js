/**
 * Interfaz (clase abstracta) para los observadores.
 * Implementa el patrón Observer.
 */
class Observer {
    /**
     * Método llamado por el sujeto para notificar una actualización.
     * @param {*} data - Los datos de la actualización.
     * @throws {Error} - Si el método no es implementado por una subclase.
     */
    update(data) {
        throw new Error("Método abstracto. Implementar en subclase.");
    }
}