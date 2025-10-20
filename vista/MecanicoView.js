class MecanicoView {
    constructor(sharedView) {
        this.sharedView = sharedView;
        this.radioMecanicosSelect = document.getElementById('radioMecanicos');
        this.buscarMecanicosBtn = document.querySelector('.section:nth-of-type(2) .btn'); // Botón "Buscar Mecánicos"
        this.mecanicosListDiv = document.getElementById('mecanicosList');

        this.nombreTallerInput = document.getElementById('nombreTaller');
        this.ciudadMecanicoSelect = document.getElementById('ciudadMecanico');
        this.especialidadMecanicoSelect = document.getElementById('especialidadMecanico');
        this.telefonoMecanicoInput = document.getElementById('telefonoMecanico');
        this.agregarMecanicoBtn = document.querySelector('.section:nth-of-type(6) .btn'); // Botón "Agregar Mecánico"
    }

    /**
     * Renderiza la lista de mecánicos en la interfaz de usuario.
     * @param {Array<Object>} mecanicos - Lista de objetos de mecánicos.
     */
    renderMecanicosList(mecanicos) {
        if (mecanicos.length > 0) {
            this.mecanicosListDiv.innerHTML = mecanicos
                .map(mecanico => `
                    <div class="mechanic-card">
                        <div class="mechanic-name">${mecanico.nombre}</div>
                        <div>Especialidad: ${mecanico.especialidad}</div>
                        <div>Teléfono: ${mecanico.telefono}</div>
                        <div class="mechanic-distance">📍 ${mecanico.distancia.toFixed(1)} km</div>
                    </div>
                `)
                .join('');
            this.sharedView.updateStatus(`${mecanicos.length} mecánicos encontrados`);
        } else {
            this.mecanicosListDiv.innerHTML = '<div class="loading">No hay mecánicos en el radio seleccionado</div>';
            this.sharedView.updateStatus("No se encontraron mecánicos");
        }
    }

    /**
     * Muestra un mensaje de carga en la lista de mecánicos.
     */
    showLoadingMecanicos() {
        this.mecanicosListDiv.innerHTML = '<div class="loading">Busca mecánicos cerca de tu ubicación</div>';
    }

    /**
     * Obtiene el radio de búsqueda de mecánicos seleccionado.
     * @returns {number} - El radio en kilómetros.
     */
    getRadioBusqueda() {
        return parseInt(this.radioMecanicosSelect.value);
    }

    /**
     * Obtiene los datos del formulario para agregar un nuevo mecánico.
     * @returns {Object} - Objeto con nombre, ciudad, especialidad y teléfono del nuevo mecánico.
     */
    getNewMecanicoFormData() {
        return {
            nombre: this.nombreTallerInput.value.trim(),
            ciudad: this.ciudadMecanicoSelect.value,
            especialidad: this.especialidadMecanicoSelect.value,
            telefono: this.telefonoMecanicoInput.value.trim()
        };
    }

    /**
     * Limpia el formulario de agregar nuevo mecánico.
     */
    clearNewMecanicoForm() {
        this.nombreTallerInput.value = '';
        this.ciudadMecanicoSelect.value = '';
        this.especialidadMecanicoSelect.value = 'Reparación General';
        this.telefonoMecanicoInput.value = '';
    }

    /**
     * Asigna un manejador de eventos al botón de buscar mecánicos.
     * @param {function} handler - La función a ejecutar cuando se haga clic en el botón.
     */
    bindBuscarMecanicos(handler) {
        this.buscarMecanicosBtn.addEventListener('click', handler);
    }

    /**
     * Asigna un manejador de eventos al botón de agregar mecánico.
     * @param {function} handler - La función a ejecutar cuando se haga clic en el botón.
     */
    bindAgregarMecanico(handler) {
        this.agregarMecanicoBtn.addEventListener('click', handler);
    }
}