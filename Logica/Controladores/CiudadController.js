class CiudadController {
    constructor(ciudadService, ciudadView, sharedView) {
        this.ciudadService = ciudadService;
        this.ciudadView = ciudadView;
        this.sharedView = sharedView;

        // Inicializar selectores de ciudad
        this.ciudadView.renderCitySelectors(this.ciudadService.getAllCiudades(), 'bogota', 'medellin');

        // Vincular eventos de la vista a los manejadores del controlador
        this.ciudadView.bindAgregarCiudad(this.handleAgregarCiudad.bind(this));
    }

    /**
     * Maneja la adición de una nueva ciudad desde el formulario.
     */
    handleAgregarCiudad() {
        const { id, nombre, lat, lng } = this.ciudadView.getNewCityFormData();

        // Validaciones
        if (!id || !nombre || isNaN(lat) || isNaN(lng)) {
            this.sharedView.showAlert('Por favor completa todos los campos correctamente');
            return;
        }
        if (this.ciudadService.getCiudadById(id)) {
            this.sharedView.showAlert('Ya existe una ciudad con ese ID');
            return;
        }
        if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
            this.sharedView.showAlert('Coordenadas inválidas. Latitud debe estar entre -90 y 90, Longitud entre -180 y 180');
            return;
        }

        const agregada = this.ciudadService.addCiudad(id, nombre, lat, lng);

        if (agregada) {
            this.ciudadView.clearNewCityForm();
            this.ciudadView.renderCitySelectors(this.ciudadService.getAllCiudades()); // Actualizar todos los selectores
            this.sharedView.updateStatus(`Ciudad "${nombre}" agregada exitosamente`);
        } else {
            this.sharedView.showAlert('Error al agregar la ciudad. Verifica los datos.');
        }
    }

    /**
     * Obtiene todas las ciudades.
     * @returns {Object.<string, Ciudad>}
     */
    getAllCiudades() {
        return this.ciudadService.getAllCiudades();
    }

    /**
     * Obtiene una ciudad por su ID.
     * @param {string} id
     * @returns {Ciudad|undefined}
     */
    getCiudadById(id) {
        return this.ciudadService.getCiudadById(id);
    }
}