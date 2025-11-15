const mp = new MercadoPago("TEST-80915915-6bba-4cfa-bf06-2d2f5274df1e", {
  locale: "es-CO" // idioma/región de Colombia
}); // <-- coloca aquí tu Public Key

document.getElementById("btnSuscribirse").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje");

  if (!email) {
    mensaje.innerText = "Por favor, ingresa tu correo electrónico.";
    mensaje.style.color = "red";
    return;
  }

  mensaje.innerText = "Creando pago...";
  mensaje.style.color = "black";

  try {
    const response = await fetch("http://localhost:3001/crear-suscripcion", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email })
});

    const data = await response.json();
    if (data.init_point) {
      window.location.href = data.init_point;
    } else {
      mensaje.innerText = "Error al generar la preferencia.";
      mensaje.style.color = "red";
    }
  } catch (error) {
    mensaje.innerText = "Error de conexión con el servidor.";
    mensaje.style.color = "red";
  }
});
