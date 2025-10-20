import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";

const app = express();
app.use(cors());
app.use(express.json());


const client = new MercadoPagoConfig({
  accessToken: "TEST-3744892682630809-101721-43db17501ffe28bcfe15dad58d93d2bd-2932147937",
});

const preference = new Preference(client);

app.post("/crear-suscripcion", async (req, res) => {
  const { email } = req.body;

  try {
    // cuerpo del pago con formato correcto para el SDK moderno
    const response = await preference.create({
      body: {
        items: [
          {
            id: "premium-monthly",
            title: "Suscripción Premium Mensual",
            description: "Acceso completo a contenido Premium",
            quantity: 1,
            currency_id: "COP",
            unit_price: 15000.0,
          },
        ],
        payer: {
          email: email || "test_user@example.com",
        },
        back_urls: {
          success: "https://www.mercadopago.com.co",
          failure: "https://www.mercadopago.com.co",
          pending: "https://www.mercadopago.com.co",
        },
        auto_return: "approved",
        statement_descriptor: "Suscripción Premium",
      },
    });

    console.log(" Preferencia creada correctamente:", response.id);
    res.json({ init_point: response.init_point });
  } catch (error) {
    console.error("❌ Error al crear preferencia:");
    console.error(JSON.stringify(error, null, 2)); // muestra todo el detalle
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => console.log("Servidor corriendo en http://localhost:3001"));

