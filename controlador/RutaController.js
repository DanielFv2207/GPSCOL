class RutaController {
    constructor(rutaService, ciudadService, rutaView, sharedView, navegacionService) {
        this.rutaService = rutaService;
        this.ciudadService = ciudadService;
        this.rutaView = rutaView;
        this.sharedView = sharedView;
        this.navegacionService = navegacionService; // Sujeto para notificar a observadores

        this.currentLocation = null; // Ubicación actual del usuario

        // Estrategias de cálculo de ruta
        this.calculadorasRuta = {
            'fastest': new CalculadoraRutaRapida(),
            'scenic': new CalculadoraRutaEscenica(),
            'safe': new CalculadoraRutaSegura()
        };

        // Vincular eventos de la vista a los manejadores del controlador
        this.rutaView.bindCalcularRuta(this.handleCalcularRuta.bind(this));
        this.rutaView.bindObtenerUbicacion(this.handleObtenerUbicacion.bind(this));
        this.rutaView.bindAgregarRuta(this.handleAgregarRuta.bind(this));
    }

    /**
     * Establece la ubicación actual del usuario.
     * @param {Object} location - Objeto con lat y lng.
     */
    setCurrentLocation(location) {
        this.currentLocation = location;
    }

    /**
     * Maneja el cálculo de una ruta.
     */
    async handleCalcularRuta() {
        const { ciudadOrigen, ciudadDestino, tipoRuta } = this.rutaView.getPlanRutaFormData();

        if (!ciudadOrigen || !ciudadDestino) {
            this.sharedView.showAlert('Por favor, selecciona ciudad de origen y destino');
            return;
        }
        if (ciudadOrigen === ciudadDestino) {
            this.sharedView.showAlert('La ciudad de origen y destino no pueden ser la misma');
            return;
        }

        this.sharedView.updateStatus("Calculando ruta óptima...");

        try {
            // Crear grafo con todas las ciudades y conexiones
            const graph = new Graph();
            const ciudades = this.ciudadService.getAllCiudades();
            const conexiones = this.rutaService.getAllConexiones();

            for (const ciudadId in ciudades) {
                graph.addVertex(ciudadId);
            }
            conexiones.forEach(conexion => {
                graph.addEdge(conexion.origenId, conexion.destinoId, conexion.distancia);
            });

            // Seleccionar la estrategia de cálculo de ruta
            const calculadora = this.calculadorasRuta[tipoRuta];
            if (!calculadora) {
                throw new Error("Tipo de ruta no soportado.");
            }

            const resultado = calculadora.calcular(ciudadOrigen, ciudadDestino, graph);

            if (resultado.distance === Infinity) {
                this.sharedView.showAlert('No se encontró una ruta entre las ciudades seleccionadas');
                this.sharedView.updateStatus("No se pudo calcular la ruta");
                this.rutaView.hideRouteDetails();
                return;
            }

            // Preparar datos para la vista y el mapa
            const origen = this.ciudadService.getCiudadById(ciudadOrigen);
            const destino = this.ciudadService.getCiudadById(ciudadDestino);
            const coordenadas = resultado.path.map(ciudadId => {
                const c = this.ciudadService.getCiudadById(ciudadId);
                return [c.lat, c.lng];
            });
            const pathNombres = resultado.path.map(ciudadId => this.ciudadService.getCiudadById(ciudadId).name);

            let tiempoEstimado = Math.round(resultado.distance / 60); // Asumiendo 60 km/h promedio
            let factorTipo = 1;
            let descripcionTipo = '';

            switch (tipoRuta) {
                case 'scenic':
                    factorTipo = 1.2;
                    descripcionTipo = ' (ruta escénica)';
                    break;
                case 'safe':
                    factorTipo = 1.1;
                    descripcionTipo = ' (ruta segura)';
                    break;
                default:
                    descripcionTipo = ' (ruta rápida)';
            }
            tiempoEstimado = Math.round(tiempoEstimado * factorTipo);

            const precioGasolinaPorLitro = 15827 / 3.78541; // COP por litro
            const consumoCombustibleLPorKm = 0.05; // 20 km/L
            const combustibleEstimadoLitros = resultado.distance * consumoCombustibleLPorKm;
            const costoCombustibleEstimado = combustibleEstimadoLitros * precioGasolinaPorLitro;

            const routeDetails = {
                origenNombre: origen.name,
                destinoNombre: destino.name,
                distancia: resultado.distance,
                tiempoEstimado: tiempoEstimado,
                descripcionTipo: descripcionTipo,
                pathNombres: pathNombres,
                combustibleEstimadoLitros: combustibleEstimadoLitros,
                costoCombustibleEstimado: costoCombustibleEstimado
            };

            this.rutaView.renderRouteDetails(routeDetails);

            // Notificar al servicio de navegación, que actualizará a los observadores (ej. MapaObservador)
            // CORRECCIÓN PRINCIPAL: Incluir pathNombres en el objeto ruta para que los observadores lo usen
            this.navegacionService.nuevaRutaCalculada({
                coordenadas: coordenadas,
                origen: origen,
                destino: destino,
                pathNombres: pathNombres  // <-- ESTO ES CLAVE: Ahora se pasa pathNombres (array de strings)
            });

            this.sharedView.updateStatus("Ruta calculada exitosamente");

        } catch (error) {
            this.sharedView.updateStatus("Error al calcular ruta");
            console.error('Error al calcular ruta:', error);
            this.sharedView.showAlert('Error al calcular la ruta. Por favor, intenta nuevamente.');
            this.rutaView.hideRouteDetails();
        }
    }

    /**
     * Maneja la obtención de la ubicación actual del usuario.
     */
    handleObtenerUbicacion() {
        this.sharedView.updateStatus("Obteniendo ubicación...");

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    this.setCurrentLocation(location);

                    // Notificar al servicio de navegación, que actualizará a los observadores
                    this.navegacionService.ubicacionActualizada(location);

                    this.sharedView.updateStatus("Ubicación obtenida");
                },
                (error) => {
                    this.sharedView.updateStatus("Error al obtener ubicación");
                    this.sharedView.showAlert("No se pudo obtener tu ubicación. Por favor, ingresa manualmente el origen.");
                    console.error("Error al obtener geolocalización:", error);
                }
            );
        } else {
            this.sharedView.showAlert("Tu navegador no soporta geolocalización.");
            this.sharedView.updateStatus("Geolocalización no soportada");
        }
    }

    /**
     * Maneja la adición de una nueva ruta desde el formulario.
     */
    handleAgregarRuta() {
        const { ciudadOrigen, ciudadDestino, distancia, tipo } = this.rutaView.getNewRutaFormData();

        // Validaciones
        if (!ciudadOrigen || !ciudadDestino) {
            this.sharedView.showAlert('Por favor selecciona ciudades de origen y destino');
            return;
        }
        if (ciudadOrigen === ciudadDestino) {
            this.sharedView.showAlert('La ciudad de origen y destino no pueden ser la misma');
            return;
        }
        if (isNaN(distancia) || distancia <= 0) {
            this.sharedView.showAlert('Por favor ingresa una distancia válida');
            return;
        }

        const rutaExistente = this.rutaService.getAllConexiones().find(conexion =>
            (conexion.origenId === ciudadOrigen && conexion.destinoId === ciudadDestino) ||
            (conexion.origenId === ciudadDestino && conexion.destinoId === ciudadOrigen)
        );

        let confirmacion = true;
        if (rutaExistente) {
            confirmacion = this.sharedView.showConfirm('Esta ruta ya existe. ¿Deseas actualizar la distancia?');
        }

        if (confirmacion) {
            const agregada = this.rutaService.addOrUpdateRuta(ciudadOrigen, ciudadDestino, distancia, tipo);
            if (agregada) {
                this.rutaView.clearNewRutaForm();
                this.sharedView.updateStatus(`Ruta entre ${this.ciudadService.getCiudadById(ciudadOrigen).name} y ${this.ciudadService.getCiudadById(ciudadDestino).name} agregada (${distancia} km)`);
                // Si hay una ruta mostrada, recalcular para ver cambios
                if (this.rutaView.routeInfoSection.style.display !== 'none') {
                    this.handleCalcularRuta();
                }
            } else {
                this.sharedView.showAlert('Error al agregar/actualizar la ruta.');
            }
        }
    }
}