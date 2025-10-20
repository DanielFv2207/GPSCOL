class Mecanico {
    /**
     * @param {number} id - Identificador único del mecánico.
     * @param {string} nombre - Nombre del taller o mecánico.
     * @param {number} lat - Latitud del taller.
     * @param {number} lng - Longitud del taller.
     * @param {string} especialidad - Especialidad del mecánico.
     * @param {string} telefono - Número de teléfono del mecánico.
     * @param {string} ciudadId - ID de la ciudad donde se encuentra el mecánico.
     */
    constructor(id, nombre, lat, lng, especialidad, telefono, ciudadId) {
        if (!id || !nombre || typeof lat !== 'number' || typeof lng !== 'number' || !especialidad || !telefono || !ciudadId) {
            throw new Error("Datos de mecánico inválidos.");
        }
        this.id = id;
        this.nombre = nombre;
        this.lat = lat;
        this.lng = lng;
        this.especialidad = especialidad;
        this.telefono = telefono;
        this.ciudadId = ciudadId;
    }
}