document.addEventListener('DOMContentLoaded', function () {
    // Inicialización del mapa de Leaflet
    const map = L.map('map').setView([4.7110, -74.0721], 6); // Colombia

    // Vistas
    const sharedView = new SharedView();
    const ciudadView = new CiudadView(sharedView);
    const mecanicoView = new MecanicoView(sharedView);
    const rutaView = new RutaView(sharedView);

    // Servicios
    const ciudadService = new CiudadService();
    const mecanicoService = new MecanicoService(ciudadService);
    const rutaService = new RutaService(ciudadService);

    // NavegacionService (Sujeto del patrón Observer)
    const navegacionService = new NavegacionService();

    // Observadores
    const mapaObservador = new MapaObservador(map);
    const panelNavegacionObservador = new PanelNavegacionObservador();

    // Registrar observadores en el servicio de navegación
    navegacionService.agregarObservador(mapaObservador);
    navegacionService.agregarObservador(panelNavegacionObservador);

    // Controladores
    const ciudadController = new CiudadController(ciudadService, ciudadView, sharedView);
    const rutaController = new RutaController(rutaService, ciudadService, rutaView, sharedView, navegacionService);
    const mecanicoController = new MecanicoController(mecanicoService, mecanicoView, sharedView, navegacionService, mapaObservador);

    // Conectar el controlador de mecánicos con la ubicación actual del controlador de rutas
    // Nota: El botón "Mi Ubicación" ya está vinculado en RutaView, pero para consistencia, manejamos el evento aquí si es necesario.
    // Usamos Geolocation para obtener la posición y notificar.
    rutaView.miUbicacionBtn.addEventListener('click', async () => {
        try {
            const location = await Geolocation.getCurrentPosition();
            rutaController.setCurrentLocation(location);
            mecanicoController.setCurrentLocation(location); // Actualizar ubicación en MecanicoController
            navegacionService.ubicacionActualizada(location); // Notificar a los observadores
            sharedView.updateStatus("Ubicación obtenida");
            mecanicoController.handleBuscarMecanicos(); // Buscar mecánicos automáticamente
        } catch (error) {
            sharedView.updateStatus("Error al obtener ubicación");
            sharedView.showAlert(error.message);
            console.error("Error de geolocalización:", error);
        }
    });

    // Configurar algunos valores por defecto en la vista
    ciudadView.ciudadOrigenSelect.value = 'bogota';
    ciudadView.ciudadDestinoSelect.value = 'medellin';
    mecanicoView.especialidadMecanicoSelect.value = 'Reparación General';

    // Inicializar selectores de ciudades en todas las vistas
    ciudadView.renderCitySelectors(ciudadService.getAllCiudades());
    // Nota: Las otras vistas (ruta, mecanico) usan los mismos selectores, por lo que se actualizan automáticamente

    sharedView.updateStatus("Listo para navegar");
});