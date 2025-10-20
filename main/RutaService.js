class RutaService {
    constructor(ciudadService) {
        this.ciudadService = ciudadService;
        // Datos iniciales de rutas (conexiones)
        this.conexiones = [
            new Ruta('bogota', 'medellin', 415),
            new Ruta('bogota', 'cali', 462),
            new Ruta('bogota', 'bucaramanga', 384),
            new Ruta('bogota', 'ibague', 203),
            new Ruta('bogota', 'villavicencio', 117),
            new Ruta('bogota', 'neiva', 344),
            new Ruta('medellin', 'cali', 420),
            new Ruta('medellin', 'cartagena', 461),
            new Ruta('medellin', 'pereira', 166),
            new Ruta('medellin', 'manizales', 65),
            new Ruta('medellin', 'monteria', 275),
            new Ruta('cartagena', 'barranquilla', 106),
            new Ruta('cartagena', 'valledupar', 295),
            new Ruta('barranquilla', 'valledupar', 167),
            new Ruta('pereira', 'cali', 166),
            new Ruta('pereira', 'manizales', 52),
            new Ruta('manizales', 'ibague', 109),
            new Ruta('bucaramanga', 'cucuta', 195),
            new Ruta('cali', 'pasto', 285),
            new Ruta('cali', 'neiva', 269),
            new Ruta('cali', 'popayan', 120),
            new Ruta('popayan', 'pasto', 165),
            new Ruta('villavicencio', 'neiva', 242),
            new Ruta('ibague', 'neiva', 148)
        ];
    }

    /**
     * Obtiene todas las conexiones de rutas.
     * @returns {Array<Ruta>} - Un arreglo de objetos Ruta.
     */
    getAllConexiones() {
        return [...this.conexiones]; // Retorna una copia
    }

    /**
     * Agrega una nueva ruta o actualiza una existente.
     * @param {string} origenId - ID de la ciudad de origen.
     * @param {string} destinoId - ID de la ciudad de destino.
     * @param {number} distancia - Distancia de la ruta.
     * @param {string} tipo - Tipo de ruta.
     * @returns {boolean} - True si se agregó/actualizó, false si hubo un error.
     */
    addOrUpdateRuta(origenId, destinoId, distancia, tipo) {
        if (!this.ciudadService.getCiudadById(origenId) || !this.ciudadService.getCiudadById(destinoId)) {
            console.error("Una de las ciudades de la ruta no existe.");
            return false;
        }

        const rutaExistenteIndex = this.conexiones.findIndex(conexion =>
            (conexion.origenId === origenId && conexion.destinoId === destinoId) ||
            (conexion.origenId === destinoId && conexion.destinoId === origenId)
        );

        if (rutaExistenteIndex !== -1) {
            // Actualizar la distancia existente
            this.conexiones[rutaExistenteIndex].distancia = distancia;
            // También actualizar la ruta bidireccional si existe
            const rutaBidireccionalIndex = this.conexiones.findIndex(conexion =>
                (conexion.origenId === destinoId && conexion.destinoId === origenId)
            );
            if (rutaBidireccionalIndex !== -1) {
                this.conexiones[rutaBidireccionalIndex].distancia = distancia;
            }
            return true;
        } else {
            // Agregar nueva ruta (en ambos sentidos)
            try {
                this.conexiones.push(new Ruta(origenId, destinoId, distancia, tipo));
                this.conexiones.push(new Ruta(destinoId, origenId, distancia, tipo)); // Ruta bidireccional
                return true;
            } catch (error) {
                console.error("Error al crear la ruta:", error.message);
                return false;
            }
        }
    }
}