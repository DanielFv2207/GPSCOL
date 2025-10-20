class RutaView {
    constructor(sharedView) {
        this.sharedView = sharedView;
        this.ciudadOrigenSelect = document.getElementById('ciudadOrigen');
        this.ciudadDestinoSelect = document.getElementById('ciudadDestino');
        this.tipoRutaSelect = document.getElementById('tipoRuta');
        this.calcularRutaBtn = document.querySelector('.section:nth-of-type(1) .btn:nth-of-type(1)'); // Botón "Calcular Ruta"
        this.miUbicacionBtn = document.querySelector('.section:nth-of-type(1) .btn-secondary'); // Botón "Mi Ubicación"

        this.routeInfoSection = document.getElementById('routeInfo');
        this.routeDetailsDiv = document.getElementById('routeDetails');

        this.rutaCiudadOrigenSelect = document.getElementById('rutaCiudadOrigen');
        this.rutaCiudadDestinoSelect = document.getElementById('rutaCiudadDestino');
        this.rutaDistanciaInput = document.getElementById('rutaDistancia');
        this.rutaTipoSelect = document.getElementById('rutaTipo');
        this.agregarRutaBtn = document.querySelector('.section:nth-of-type(5) .btn'); // Botón "Agregar Ruta"
    }

    /**
     * Obtiene los datos del formulario de planificación de ruta.
     * @returns {Object} - Objeto con ciudadOrigen, ciudadDestino y tipoRuta.
     */
    getPlanRutaFormData() {
        return {
            ciudadOrigen: this.ciudadOrigenSelect.value,
            ciudadDestino: this.ciudadDestinoSelect.value,
            tipoRuta: this.tipoRutaSelect.value
        };
    }

    /**
     * Renderiza la información detallada de la ruta.
     * @param {Object} routeDetails - Objeto con los detalles de la ruta.
     */
    renderRouteDetails(routeDetails) {
        this.routeDetailsDiv.innerHTML = `
            <strong>🏁 Origen:</strong> ${routeDetails.origenNombre}<br>
            <strong>🏆 Destino:</strong> ${routeDetails.destinoNombre}<br>
            <strong>🛣️ Distancia:</strong> ${Math.round(routeDetails.distancia)} km<br>
            <strong>⏱️ Tiempo estimado:</strong> ${routeDetails.tiempoEstimado} horas${routeDetails.descripcionTipo}<br>
            <strong>🛤️ Ruta:</strong> ${routeDetails.pathNombres.join(' → ')}<br>
            <strong>⛽ Combustible aprox:</strong> ${routeDetails.combustibleEstimadoLitros.toFixed(2)} litros<br>
            <strong>💰 Costo combustible:</strong> ${Math.round(routeDetails.costoCombustibleEstimado).toLocaleString()} COP
        `;
        this.routeInfoSection.style.display = 'block';
        this.sharedView.updateStatus("Ruta calculada exitosamente");
    }

    /**
     * Oculta la sección de información de ruta.
     */
    hideRouteDetails() {
        this.routeInfoSection.style.display = 'none';
    }

    /**
     * Obtiene los datos del formulario para agregar una nueva ruta.
     * @returns {Object} - Objeto con ciudadOrigen, ciudadDestino, distancia y tipo de ruta.
     */
    getNewRutaFormData() {
        return {
            ciudadOrigen: this.rutaCiudadOrigenSelect.value,
            ciudadDestino: this.rutaCiudadDestinoSelect.value,
            distancia: parseFloat(this.rutaDistanciaInput.value),
            tipo: this.rutaTipoSelect.value
        };
    }

    /**
     * Limpia el formulario de agregar nueva ruta.
     */
    clearNewRutaForm() {
        this.rutaDistanciaInput.value = '';
    }

    /**
     * Asigna un manejador de eventos al botón de calcular ruta.
     * @param {function} handler - La función a ejecutar cuando se haga clic en el botón.
     */
    bindCalcularRuta(handler) {
        this.calcularRutaBtn.addEventListener('click', handler);
    }

    /**
     * Asigna un manejador de eventos al botón de "Mi Ubicación".
     * @param {function} handler - La función a ejecutar cuando se haga clic en el botón.
     */
    bindObtenerUbicacion(handler) {
        this.miUbicacionBtn.addEventListener('click', handler);
    }

    /**
     * Asigna un manejador de eventos al botón de agregar ruta.
     * @param {function} handler - La función a ejecutar cuando se haga clic en el botón.
     */
    bindAgregarRuta(handler) {
        this.agregarRutaBtn.addEventListener('click', handler);
    }
}