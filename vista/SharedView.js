class SharedView {
    constructor() {
        this.statusIndicator = document.getElementById('statusIndicator');
    }

    /**
     * Actualiza el indicador de estado en la interfaz de usuario.
     * @param {string} message - El mensaje a mostrar.
     */
    updateStatus(message) {
        this.statusIndicator.textContent = message;
    }

    /**
     * Muestra una alerta al usuario.
     * @param {string} message - El mensaje de la alerta.
     */
    showAlert(message) {
        alert(message);
    }

    /**
     * Confirma una acción con el usuario.
     * @param {string} message - El mensaje de confirmación.
     * @returns {boolean} - True si el usuario confirma, false en caso contrario.
     */
    showConfirm(message) {
        return confirm(message);
    }
}