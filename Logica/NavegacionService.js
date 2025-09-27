class NavegacionService {
    constructor() {
        this.observadores = [];
    }

    /**
     * Agrega un observador a la lista.
     * @param {Observer} obs - El observador a agregar.
     */
    agregarObservador(obs) {
        if (obs instanceof Observer) {
            this.observadores.push(obs);
        } else {
            console.warn("El objeto agregado no es una instancia de Observer.");
        }
    }

    /**
     * Elimina un observador de la lista.
     * @param {Observer} obs - El observador a eliminar.
     */
    eliminarObservador(obs) {
        this.observadores = this.observadores.filter(o => o !== obs);
    }

    /**
     * Notifica a todos los observadores sobre un cambio.
     * @param {Object} data - Los datos del cambio a notificar.
     */
    notificar(data) {
        this.observadores.forEach(o => o.update(data));
    }

    /**
     * Simula el cálculo de una nueva ruta y notifica a los observadores.
     * @param {Object} rutaData - Datos de la ruta calculada.
     */
    nuevaRutaCalculada(rutaData) {
        console.log("NavegaciónService: Nueva ruta calculada ->", rutaData);
        this.notificar({ ruta: rutaData });
    }

    /**
     * Simula la actualización de mecánicos y notifica a los observadores.
     * @param {Array<Object>} mecanicosData - Datos de los mecánicos encontrados.
     */
    mecanicosActualizados(mecanicosData) {
        console.log("NavegacionService: Mecánicos actualizados ->", mecanicosData.length, "encontrados");
        this.notificar({ mecanicos: mecanicosData });
    }

    /**
     * Simula la actualización de la ubicación actual y notifica a los observadores.
     * @param {Object} locationData - Datos de la ubicación actual.
     */
    ubicacionActualizada(locationData) {
        console.log("NavegacionService: Ubicación actualizada ->", locationData);
        this.notificar({ ubicacionActual: locationData });
    }
}