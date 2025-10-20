class Usuario {
    /**
     * @param {string} nombre - Nombre del usuario.
     * @param {string} email - Correo electrónico del usuario.
     * @param {EstadoUsuario} estadoSubscripcion - El estado inicial de suscripción del usuario.
     */
    constructor(nombre, email, estadoSubscripcion = new EstadoGratuito()) {
        this.nombre = nombre;
        this.email = email;
        this.estadoSubscripcion = estadoSubscripcion;
    }

    /**
     * Cambia el estado de suscripción del usuario a Premium.
     */
    upgradePremium() {
        this.estadoSubscripcion = new EstadoPremium();
        console.log(`${this.nombre} ha actualizado a Premium.`);
    }

    /**
     * Cambia el estado de suscripción del usuario a Gratuito.
     */
    downgradeGratuito() {
        this.estadoSubscripcion = new EstadoGratuito();
        console.log(`${this.nombre} ha cambiado a Gratuito.`);
    }

    /**
     * Calcula el costo de una ruta utilizando el estado de suscripción actual.
     * @param {Object} ruta - Objeto que representa la ruta, con una propiedad 'costo'.
     * @returns {number} - El costo calculado de la ruta.
     */
    calcularCostoRuta(ruta) {
        return this.estadoSubscripcion.calcularCostoRuta(ruta);
    }

    /**
     * Verifica si el usuario puede ver rutas personalizadas según su estado de suscripción.
     * @returns {boolean} - True si puede ver rutas personalizadas, false en caso contrario.
     */
    puedeVerRutasPersonalizadas() {
        return this.estadoSubscripcion.puedeVerRutasPersonalizadas();
    }
}