class MecanicoController {
    constructor(mecanicoService, mecanicoView, sharedView, navegacionService, mapaObservador) {
        this.mecanicoService = mecanicoService;
        this.mecanicoView = mecanicoView;
        this.sharedView = sharedView;
        this.navegacionService = navegacionService; // Sujeto para notificar a observadores
        this.mapaObservador = mapaObservador; // Referencia directa solo para setMapView (acción específica)

        this.currentLocation = null; // Ubicación actual del usuario

        // Vincular eventos de la vista a los manejadores del controlador
        this.mecanicoView.bindBuscarMecanicos(this.handleBuscarMecanicos.bind(this));
        this.mecanicoView.bindAgregarMecanico(this.handleAgregarMecanico.bind(this));

        this.mecanicoView.showLoadingMecanicos(); // Mensaje inicial
    }

    /**
     * Establece la ubicación actual del usuario.
     * @param {Object} location - Objeto con lat y lng.
     */
    setCurrentLocation(location) {
        this.currentLocation = location;
    }

    /**
     * Maneja la búsqueda de mecánicos cercanos.
     */
    handleBuscarMecanicos() {
        if (!this.currentLocation) {
            this.mecanicoView.mecanicosListDiv.innerHTML = '<div class="loading">Primero obtén tu ubicación</div>';
            this.sharedView.showAlert("Por favor, obtén tu ubicación actual primero.");
            return;
        }

        this.sharedView.updateStatus("Buscando mecánicos...");
        const radio = this.mecanicoView.getRadioBusqueda();
        const mecanicosCercanos = this.mecanicoService.buscarMecanicosCercanos(this.currentLocation, radio);

        this.mecanicoView.renderMecanicosList(mecanicosCercanos);

        // Notificar al servicio de navegación, que actualizará a los observadores (ej. MapaObservador)
        this.navegacionService.mecanicosActualizados(mecanicosCercanos);
    }

    /**
     * Maneja la adición de un nuevo mecánico desde el formulario.
     */
    handleAgregarMecanico() {
        const { nombre, ciudad, especialidad, telefono } = this.mecanicoView.getNewMecanicoFormData();

        // Validaciones
        if (!nombre) {
            this.sharedView.showAlert('Por favor, ingresa el nombre del taller');
            return;
        }
        if (!ciudad) {
            this.sharedView.showAlert('Por favor, selecciona una ciudad');
            return;
        }
        if (!telefono) {
            this.sharedView.showAlert('Por favor, ingresa el número de teléfono');
            return;
        }
        const telefonoRegex = /^[0-9\-\s\+\$\$]+$/;
        if (!telefonoRegex.test(telefono)) {
            this.sharedView.showAlert('Por favor, ingresa un teléfono válido');
            return;
        }

        const nuevoMecanico = this.mecanicoService.addMecanico(nombre, ciudad, especialidad, telefono);

        if (nuevoMecanico) {
            this.mecanicoView.clearNewMecanicoForm();
            this.sharedView.updateStatus(`Mecánico "${nombre}" agregado exitosamente`);

            // Centrar el mapa en el nuevo mecánico (acción específica, usando referencia directa)
            this.mapaObservador.setMapView(nuevoMecanico.lat, nuevoMecanico.lng, 12);

            // Si hay una búsqueda activa, actualizar la lista de mecánicos
            if (this.currentLocation) {
                this.handleBuscarMecanicos();
            }
        } else {
            this.sharedView.showAlert('Error al agregar el mecánico. Verifica los datos.');
        }
    }
}