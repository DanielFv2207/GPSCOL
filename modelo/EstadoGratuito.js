class EstadoGratuito extends EstadoUsuario {
    /**
     * Calcula el costo de una ruta para un usuario gratuito (con recargo del 10%).
     * @param {Object} ruta - Objeto que representa la ruta, con una propiedad 'costo'.
     * @returns {number} - El costo de la ruta con el recargo.
     */
    calcularCostoRuta(ruta) {
        // Recargo del 10%
        return ruta.costo * 1.10;
    }

    /**
     * Un usuario gratuito no puede ver rutas personalizadas.
     * @returns {boolean} - Siempre false.
     */
    puedeVerRutasPersonalizadas() {
        return false;
    }
}