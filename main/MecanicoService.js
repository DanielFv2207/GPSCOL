class MecanicoService {
    constructor(ciudadService) {
        this.ciudadService = ciudadService;
        // Datos iniciales de mecánicos
        this.mecanicos = [
            new Mecanico(1, "Taller Moto Sport", 4.7110, -74.0721, "Reparación General", "321-555-0101", "bogota"),
            new Mecanico(2, "Mecánica Los Andes", 6.2442, -75.5812, "Motores", "304-555-0102", "medellin"),
            new Mecanico(3, "Servicio Técnico Bogotá", 4.6097, -74.0817, "Eléctrico", "315-555-0103", "bogota"),
            new Mecanico(4, "Taller Cali Motos", 3.4516, -76.5320, "Transmisión", "318-555-0104", "cali"),
            new Mecanico(5, "Mecánica Cartagena", 10.3910, -75.4794, "Frenos", "300-555-0105", "cartagena"),
            new Mecanico(6, "Taller Bucaramanga", 7.1193, -73.1227, "Suspensión", "312-555-0106", "bucaramanga"),
            new Mecanico(7, "Motos del Valle", 3.8703, -76.2900, "Reparación General", "317-555-0107", "cali"),
            new Mecanico(8, "Serviteca Paisa", 6.2518, -75.5636, "Llantas", "314-555-0108", "medellin")
        ];
        this.nextMecanicoId = this.mecanicos.length > 0 ? Math.max(...this.mecanicos.map(m => m.id)) + 1 : 1;
    }

    /**
     * Calcula la distancia entre dos puntos geográficos usando la fórmula de Haversine.
     * @param {number} lat1 - Latitud del primer punto.
     * @param {number} lng1 - Longitud del primer punto.
     * @param {number} lat2 - Latitud del segundo punto.
     * @param {number} lng2 - Longitud del segundo punto.
     * @returns {number} - Distancia en kilómetros.
     */
    _calcularDistancia(lat1, lng1, lat2, lng2) {
        const R = 6371; // Radio de la Tierra en km
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    /**
     * Busca mecánicos cercanos a una ubicación dada dentro de un radio específico.
     * @param {Object} currentLocation - Objeto con latitud y longitud de la ubicación actual.
     * @param {number} radio - Radio de búsqueda en kilómetros.
     * @returns {Array<Object>} - Lista de mecánicos cercanos con su distancia.
     */
    buscarMecanicosCercanos(currentLocation, radio) {
        if (!currentLocation || typeof currentLocation.lat !== 'number' || typeof currentLocation.lng !== 'number') {
            throw new Error("Ubicación actual inválida.");
        }
        if (typeof radio !== 'number' || radio <= 0) {
            throw new Error("Radio de búsqueda inválido.");
        }

        return this.mecanicos
            .map(mecanico => ({
                ...mecanico,
                distancia: this._calcularDistancia(currentLocation.lat, currentLocation.lng, mecanico.lat, mecanico.lng)
            }))
            .filter(mecanico => mecanico.distancia <= radio)
            .sort((a, b) => a.distancia - b.distancia);
    }

    /**
     * Agrega un nuevo mecánico a la lista.
     * @param {string} nombre - Nombre del taller.
     * @param {string} ciudadId - ID de la ciudad.
     * @param {string} especialidad - Especialidad.
     * @param {string} telefono - Teléfono.
     * @returns {Mecanico|null} - El nuevo objeto Mecanico si se agregó, o null si hubo un error.
     */
    addMecanico(nombre, ciudadId, especialidad, telefono) {
        const ciudad = this.ciudadService.getCiudadById(ciudadId);
        if (!ciudad) {
            console.error("Ciudad no encontrada para el mecánico.");
            return null;
        }

        // Generar variación pequeña en las coordenadas para simular ubicación exacta del taller
        const lat = ciudad.lat + (Math.random() - 0.5) * 0.1;
        const lng = ciudad.lng + (Math.random() - 0.5) * 0.1;

        try {
            const nuevoMecanico = new Mecanico(this.nextMecanicoId++, nombre, lat, lng, especialidad, telefono, ciudadId);
            this.mecanicos.push(nuevoMecanico);
            return nuevoMecanico;
        } catch (error) {
            console.error("Error al crear el mecánico:", error.message);
            return null;
        }
    }
}