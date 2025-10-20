class Ciudad {
    /**
     * @param {string} id - Identificador único de la ciudad (ej. 'bogota').
     * @param {string} name - Nombre legible de la ciudad (ej. 'Bogotá').
     * @param {number} lat - Latitud de la ciudad.
     * @param {number} lng - Longitud de la ciudad.
     */
    constructor(id, name, lat, lng) {
        if (!id || !name || typeof lat !== 'number' || typeof lng !== 'number') {
            throw new Error("Datos de ciudad inválidos.");
        }
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.lng = lng;
    }
}