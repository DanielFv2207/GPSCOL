class PanelNavegacionObservador extends Observer {
    constructor() {
        super();
        // No hay elementos específicos del DOM que este observador manipule directamente en este ejemplo,
        // pero podría actualizar un panel de navegación con instrucciones, etc.
    }

    /**
     * Actualiza el panel de navegación con la información de la ruta.
     * @param {Object} data - Datos de la actualización.
     */
    update(data) {
        if (data.ruta) {
            // CORRECCIÓN: Verificar si pathNombres existe y es un array antes de llamar a join
            // Esto previene el error si pathNombres es undefined o no es un array
            let rutaNombres;
            if (data.ruta.pathNombres && Array.isArray(data.ruta.pathNombres)) {
                rutaNombres = data.ruta.pathNombres.join(' → ');
            } else {
                rutaNombres = 'Ruta sin detalles de ciudades disponibles';
                console.warn('PanelNavegacionObservador: pathNombres no disponible o inválido:', data.ruta.pathNombres);
            }
            console.log("📌 Panel de navegación: Nueva ruta calculada:", rutaNombres);
            // Aquí se podría actualizar un elemento del DOM con instrucciones de navegación
            // Ejemplo: document.getElementById('panelNavegacion').innerHTML = `Instrucciones: ${rutaNombres}`;
        }
        if (data.mecanicos) {
            console.log("📌 Panel de navegación: Mecánicos actualizados:", data.mecanicos.length, "encontrados");
            // Aquí se podría actualizar un panel con resúmenes de mecánicos cercanos
        }
        if (data.ubicacionActual) {
            console.log("📌 Panel de navegación: Ubicación actualizada:", data.ubicacionActual);
            // Aquí se podría actualizar un panel con la ubicación actual
        }
        // Otros tipos de actualizaciones para el panel de navegación
    }
}