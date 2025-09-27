class CiudadService {
    constructor() {
        // Datos iniciales de ciudades
        this.ciudades = {
            'bogota': new Ciudad('bogota', 'Bogotá', 4.7110, -74.0721),
            'medellin': new Ciudad('medellin', 'Medellín', 6.2442, -75.5812),
            'cali': new Ciudad('cali', 'Cali', 3.4516, -76.5320),
            'cartagena': new Ciudad('cartagena', 'Cartagena', 10.3910, -75.4794),
            'barranquilla': new Ciudad('barranquilla', 'Barranquilla', 10.9639, -74.7964),
            'bucaramanga': new Ciudad('bucaramanga', 'Bucaramanga', 7.1193, -73.1227),
            'pereira': new Ciudad('pereira', 'Pereira', 4.8133, -75.6961),
            'manizales': new Ciudad('manizales', 'Manizales', 5.0670, -75.5174),
            'ibague': new Ciudad('ibague', 'Ibagué', 4.4389, -75.2322),
            'cucuta': new Ciudad('cucuta', 'Cúcuta', 7.8939, -72.5078),
            'villavicencio': new Ciudad('villavicencio', 'Villavicencio', 4.1420, -73.6266),
            'neiva': new Ciudad('neiva', 'Neiva', 2.9273, -75.2819),
            'pasto': new Ciudad('pasto', 'Pasto', 1.2136, -77.2811),
            'monteria': new Ciudad('monteria', 'Montería', 8.7479, -75.8814),
            'valledupar': new Ciudad('valledupar', 'Valledupar', 10.4631, -73.2532),
            'popayan': new Ciudad('popayan', 'Popayán', 2.4448, -76.6147)
        };
    }

    /**
     * Obtiene todas las ciudades disponibles.
     * @returns {Object.<string, Ciudad>} - Un objeto con todas las ciudades.
     */
    getAllCiudades() {
        return { ...this.ciudades }; // Retorna una copia para evitar modificaciones externas directas
    }

    /**
     * Obtiene una ciudad por su ID.
     * @param {string} id - El ID de la ciudad.
     * @returns {Ciudad|undefined} - La ciudad encontrada o undefined si no existe.
     */
    getCiudadById(id) {
        return this.ciudades[id];
    }

    /**
     * Agrega una nueva ciudad.
     * @param {string} id - ID único de la ciudad.
     * @param {string} nombre - Nombre de la ciudad.
     * @param {number} lat - Latitud.
     * @param {number} lng - Longitud.
     * @returns {boolean} - True si se agregó la ciudad, false si ya existía o los datos son inválidos.
     */
    addCiudad(id, nombre, lat, lng) {
        if (this.ciudades[id]) {
            console.warn(`La ciudad con ID ${id} ya existe.`);
            return false;
        }
        try {
            const nuevaCiudad = new Ciudad(id, nombre, lat, lng);
            this.ciudades[id] = nuevaCiudad;
            return true;
        } catch (error) {
            console.error("Error al crear la ciudad:", error.message);
            return false;
        }
    }
}