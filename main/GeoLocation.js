/**
 * Clase para manejar la geolocalización del navegador.
 */
class Geolocation {
    /**
     * Obtiene la ubicación actual del usuario.
     * @returns {Promise<Object>} - Una promesa que resuelve con un objeto { lat, lng } o rechaza con un error.
     */
    static getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error("Tu navegador no soporta geolocalización."));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    let errorMessage = "Error desconocido al obtener la ubicación.";
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = "Permiso denegado para acceder a la ubicación.";
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = "Información de ubicación no disponible.";
                            break;
                        case error.TIMEOUT:
                            errorMessage = "Tiempo de espera agotado al intentar obtener la ubicación.";
                            break;
                    }
                    reject(new Error(errorMessage));
                }
            );
        });
    }
}