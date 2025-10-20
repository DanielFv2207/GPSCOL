class EstadoPremium extends EstadoUsuario {
    /**
     * Calcula el costo de una ruta para un usuario premium (sin recargo).
     * @param {Object} ruta - Objeto que representa la ruta, con una propiedad 'costo'.
     * @returns {number} - El costo de la ruta sin recargo.
     */
    calcularCostoRuta(ruta) {
        // Sin recargo
        return ruta.costo;
    }

    /**
     * Un usuario premium puede ver rutas personalizadas.
     * @returns {boolean} - Siempre true.
     */
    puedeVerRutasPersonalizadas() {
        return true;
    }
}