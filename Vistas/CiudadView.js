class CiudadView {
    constructor(sharedView) {
        this.sharedView = sharedView;
        this.ciudadOrigenSelect = document.getElementById('ciudadOrigen');
        this.ciudadDestinoSelect = document.getElementById('ciudadDestino');
        this.ciudadMecanicoSelect = document.getElementById('ciudadMecanico');
        this.rutaCiudadOrigenSelect = document.getElementById('rutaCiudadOrigen');
        this.rutaCiudadDestinoSelect = document.getElementById('rutaCiudadDestino');

        this.nuevaCiudadIdInput = document.getElementById('nuevaCiudadId');
        this.nuevaCiudadNombreInput = document.getElementById('nuevaCiudadNombre');
        this.nuevaCiudadLatInput = document.getElementById('nuevaCiudadLat');
        this.nuevaCiudadLngInput = document.getElementById('nuevaCiudadLng');
        this.agregarCiudadBtn = document.querySelector('.section:nth-of-type(4) .btn'); // Botón "Agregar Ciudad"
    }

    /**
     * Rellena los selectores de ciudad con las ciudades disponibles.
     * @param {Object.<string, Object>} ciudades - Objeto de ciudades con sus IDs como claves.
     * @param {string} [selectedOrigenId=''] - ID de la ciudad de origen seleccionada por defecto.
     * @param {string} [selectedDestinoId=''] - ID de la ciudad de destino seleccionada por defecto.
     */
    renderCitySelectors(ciudades, selectedOrigenId = '', selectedDestinoId = '') {
        const selects = [
            this.ciudadOrigenSelect,
            this.ciudadDestinoSelect,
            this.ciudadMecanicoSelect,
            this.rutaCiudadOrigenSelect,
            this.rutaCiudadDestinoSelect
        ];

        selects.forEach(select => {
            if (!select) return;

            const currentSelectedValue = select.value;

            // Limpiar opciones (excepto la primera opción por defecto)
            while (select.options.length > 1) {
                select.remove(1);
            }

            // Agregar todas las ciudades
            for (const [id, ciudad] of Object.entries(ciudades)) {
                const option = document.createElement('option');
                option.value = id;
                option.textContent = ciudad.name;
                select.appendChild(option);
            }

            // Restaurar la selección anterior o establecer por defecto
            if (ciudades[currentSelectedValue]) {
                select.value = currentSelectedValue;
            } else if (select.id === 'ciudadOrigen' && ciudades[selectedOrigenId]) {
                select.value = selectedOrigenId;
            } else if (select.id === 'ciudadDestino' && ciudades[selectedDestinoId]) {
                select.value = selectedDestinoId;
            } else {
                select.value = ''; // Asegurarse de que la opción por defecto esté seleccionada si no hay valor válido
            }
        });
    }

    /**
     * Obtiene los datos del formulario para agregar una nueva ciudad.
     * @returns {Object} - Objeto con id, nombre, lat y lng de la nueva ciudad.
     */
    getNewCityFormData() {
        return {
            id: this.nuevaCiudadIdInput.value.trim(),
            nombre: this.nuevaCiudadNombreInput.value.trim(),
            lat: parseFloat(this.nuevaCiudadLatInput.value),
            lng: parseFloat(this.nuevaCiudadLngInput.value)
        };
    }

    /**
     * Limpia el formulario de agregar nueva ciudad.
     */
    clearNewCityForm() {
        this.nuevaCiudadIdInput.value = '';
        this.nuevaCiudadNombreInput.value = '';
        this.nuevaCiudadLatInput.value = '';
        this.nuevaCiudadLngInput.value = '';
    }

    /**
     * Asigna un manejador de eventos al botón de agregar ciudad.
     * @param {function} handler - La función a ejecutar cuando se haga clic en el botón.
     */
    bindAgregarCiudad(handler) {
        this.agregarCiudadBtn.addEventListener('click', handler);
    }

    /**
     * Obtiene el valor de la ciudad de origen seleccionada.
     * @returns {string} - El ID de la ciudad de origen.
     */
    getOrigenCiudad() {
        return this.ciudadOrigenSelect.value;
    }

    /**
     * Obtiene el valor de la ciudad de destino seleccionada.
     * @returns {string} - El ID de la ciudad de destino.
     */
    getDestinoCiudad() {
        return this.ciudadDestinoSelect.value;
    }

    /**
     * Obtiene el valor de la ciudad seleccionada para el mecánico.
     * @returns {string} - El ID de la ciudad del mecánico.
     */
    getMecanicoCiudad() {
        return this.ciudadMecanicoSelect.value;
    }

    /**
     * Obtiene el valor de la ciudad de origen seleccionada para agregar ruta.
     * @returns {string} - El ID de la ciudad de origen de la ruta.
     */
    getRutaOrigenCiudad() {
        return this.rutaCiudadOrigenSelect.value;
    }

    /**
     * Obtiene el valor de la ciudad de destino seleccionada para agregar ruta.
     * @returns {string} - El ID de la ciudad de destino de la ruta.
     */
    getRutaDestinoCiudad() {
        return this.rutaCiudadDestinoSelect.value;
    }
}