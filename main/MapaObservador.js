class MapaObservador extends Observer {
    constructor(mapInstance) {
        super();
        this.map = mapInstance;
        this.routeLayer = null;
        this.mechanicsLayer = L.layerGroup().addTo(this.map);
        this.currentLocationMarker = null;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
    }

    /**
     * Actualiza el mapa con la información recibida.
     * @param {Object} data - Datos de la actualización. Puede contener 'ruta', 'mecanicos', 'ubicacionActual'.
     */
    update(data) {
        if (data.ruta) {
            this._renderRoute(data.ruta.coordenadas, data.ruta.origen, data.ruta.destino);
        }
        if (data.mecanicos) {
            this._renderMecanicos(data.mecanicos);
        }
        if (data.ubicacionActual) {
            this._renderCurrentLocation(data.ubicacionActual);
        }
    }

    /**
     * Renderiza la ruta en el mapa.
     * @param {Array<Array<number>>} coordenadas - Array de [lat, lng] de la ruta.
     * @param {Object} origen - Objeto Ciudad de origen.
     * @param {Object} destino - Objeto Ciudad de destino.
     */
    _renderRoute(coordenadas, origen, destino) {
        if (this.routeLayer) {
            this.map.removeLayer(this.routeLayer);
        }

        this.routeLayer = L.polyline(coordenadas, {
            color: '#4f46e5',
            weight: 5,
            opacity: 0.8
        }).addTo(this.map);

        // Limpiar marcadores de origen/destino anteriores si existen
        this.map.eachLayer(layer => {
            if (layer instanceof L.Marker && (layer.options.icon.options.html === '🏁' || layer.options.icon.options.html === '🏆')) {
                this.map.removeLayer(layer);
            }
        });

        L.marker([origen.lat, origen.lng], {
            icon: L.divIcon({
                html: '🏁',
                className: 'custom-icon',
                iconSize: [25, 25]
            })
        }).addTo(this.map).bindPopup(`Origen: ${origen.name}`);

        L.marker([destino.lat, destino.lng], {
            icon: L.divIcon({
                html: '🏆',
                className: 'custom-icon',
                iconSize: [25, 25]
            })
        }).addTo(this.map).bindPopup(`Destino: ${destino.name}`);

        this.map.fitBounds(this.routeLayer.getBounds(), { padding: [20, 20] });
    }

    /**
     * Renderiza los mecánicos en el mapa.
     * @param {Array<Object>} mecanicos - Lista de objetos de mecánicos.
     */
    _renderMecanicos(mecanicos) {
        this.mechanicsLayer.clearLayers(); // Limpiar marcadores anteriores

        mecanicos.forEach(mecanico => {
            const marker = L.marker([mecanico.lat, mecanico.lng], {
                icon: L.divIcon({
                    html: '🔧',
                    className: 'custom-icon',
                    iconSize: [20, 20]
                })
            });

            marker.bindPopup(`
                <strong>${mecanico.nombre}</strong><br>
                Especialidad: ${mecanico.especialidad}<br>
                Teléfono: ${mecanico.telefono}<br>
                Distancia: ${mecanico.distancia.toFixed(1)} km
            `);

            this.mechanicsLayer.addLayer(marker);
        });
    }

    /**
     * Renderiza la ubicación actual del usuario en el mapa.
     * @param {Object} location - Objeto con lat y lng de la ubicación actual.
     */
    _renderCurrentLocation(location) {
        if (this.currentLocationMarker) {
            this.map.removeLayer(this.currentLocationMarker);
        }
        this.currentLocationMarker = L.marker([location.lat, location.lng])
            .addTo(this.map)
            .bindPopup("📍 Tu ubicación actual")
            .openPopup();
        this.map.setView([location.lat, location.lng], 13);
    }

    /**
     * Centra el mapa en una ubicación específica.
     * @param {number} lat - Latitud.
     * @param {number} lng - Longitud.
     * @param {number} zoom - Nivel de zoom.
     */
    setMapView(lat, lng, zoom) {
        this.map.setView([lat, lng], zoom);
    }
}