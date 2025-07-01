import React, { useEffect, useState } from "react";
import "./main.css";
const categories = [
  "🏠 Vivienda",
  "🛠️ Mantenimiento del hogar",
  "🍽️ Alimentación",
  "🍟 Salidas a comer",
  "🐜 Antojitos",
  "🚗 Transporte",
  "🩺 Salud",
  "🎾 Deporte y bienestar",
  '💆‍♀️ Cuidado personal',
  '🧴 Cosmética & skincare',
  "🐾 Mascotas",
  "🎁 Regalos y celebraciones",
  "📺 Suscripciones",
  "🎉 Entretenimiento",
  "💰 Ahorro",
  "⚡ Imprevistos",
  "🧾 Tributario",
  "🧾 Seguridad social",
  "👗 Vestuario y accesorios"
];

const paymentMethods = [
  "TC Gold",
  "TC Plata",
  "T. DEBITO",
  "Nequi",
  "Daviplata",
  "Efectivo",
];

const categoryDescriptions = {
  "🏠 Vivienda": "Arriendo, servicios públicos, administración, seguros del hogar.",
  "🛠️ Mantenimiento del hogar": "Reparaciones, decoración, mejoras o herramientas para la casa.",
  "🍽️ Alimentación": "Mercado, verduras, compras de comida o aseo para el hogar.",
  "🍟 Salidas a comer": "Restaurantes, cafés, domicilios o comidas fuera de casa.",
  "🐜 Antojitos": "Snacks, dulces, bebidas o caprichos pequeños del día a día.",
  "🚗 Transporte": "Uber, gasolina, TransMilenio, parqueaderos o taxis.",
  "🩺 Salud": "EPS, medicina prepagada, medicamentos, exámenes médicos o cirugías.",
  "🎾 Deporte y bienestar": "Clases de padel, gimnasio, yoga, masajes o actividades físicas.",
  "💆‍♀️ Cuidado personal": "Corte de cabello, uñas, barbería, depilación o servicios de estética.",
  "🧴 Cosmética & skincare": "Sérums, bloqueador solar, hidratantes, productos especializados de belleza.",
  "🐾 Mascotas": "Alimento, arena, veterinario, juguetes o accesorios para Jack 🐱.",
  "🎁 Regalos y celebraciones": "Cumpleaños, Navidad, aniversarios, pasteles o decoraciones festivas.",
  "📺 Suscripciones": "Netflix, Spotify, Canva, Amazon Prime y otros servicios digitales.",
  "🎉 Entretenimiento": "Cine, conciertos, hobbies, salidas, vacaciones o planes de ocio.",
  "💰 Ahorro": "Dinero destinado a metas como casa, viaje a la nieve o fondo de emergencia.",
  "⚡ Imprevistos": "Gastos inesperados como daños, multas, pérdidas o urgencias.",
  "🧾 Tributario": "Pagos a la DIAN, impuestos, retenciones, sanciones fiscales.",
  "🧾 Seguridad social": "Aportes a salud, pensión obligatoria y ARL para independientes.",
   "👗 Vestuario y accesorios":"Ropa diaria, zapatos, Ropa interior y deportiva",
};


const App = () => {
  const [modoOscuro, setModoOscuro] = useState(false);
  const today = new Date().toISOString().split("T")[0];


  //
  console.log("entramos :3");
  const cambiarModo = () => {
    setModoOscuro(!modoOscuro);
    console.log("click");
    console.log(modoOscuro);
  };

  const [form, setForm] = useState({
    date: today,
    amount: "",
    category: categories[0],
    description: "",
    paymentMethod: paymentMethods[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (form.amount <= 0) {
      alert("El monto debe ser mayor que cero.");
      return;
    }
    if (!form.description.trim()) {
      alert("La descripción es obligatoria.");
      return;
    }
    try {
      const isLocal =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";
      const url = isLocal
        ? "/api"
        : "https://script.google.com/macros/s/AKfycbxxT_DeTnt-IcUi78NCVGdnp0NRcbB-ixs7CRRn4VegQ38_0QQ4s_rIT_7XaNzJZWX0nw/exec";

      const formData = new URLSearchParams();
      formData.append("date", form.date);
      formData.append("amount", form.amount);
      formData.append("category", form.category);
      formData.append("description", form.description);
      formData.append("paymentMethod", form.paymentMethod);

      const response = await fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      // const response = await fetch(`${url}`, {
      //     method: 'POST',
      //     body: JSON.stringify(form),
      //     headers: { 'Content-Type': 'application/json' }

      // });
      const result = await response.json();
      if (result.success) {
        alert("Gasto registrado exitosamente.");
        setForm({
          date: today,
          amount: "",
          category: categories[0],
          description: "",
          paymentMethod: paymentMethods[0],
        });
      } else {
        alert("Error al registrar gasto.");
      }
    } catch (error) {
      console.log(error);
      alert("Error al conectar con el servidor.");
    }
  };

  return (
    <div className={modoOscuro ? "app dark" : "app"}>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
        <label>Fecha:</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />

        <label>Monto:</label>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <span style={{ fontWeight: "bold", marginRight: 6 }}>$</span>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            min="0"
            step="1"
            inputMode="numeric"
            style={{
              MozAppearance: "textfield",
              WebkitAppearance: "none",
              appearance: "textfield",
              width: "100%",
            }}
            // Quitar flechitas en Chrome, Safari, Edge, Opera
            onWheel={(e) => e.target.blur()}
          />
        </div>

        <label>Categoría:</label>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "12px",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setForm({ ...form, category: cat });
              }}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border:
                  form.category === cat
                    ? "2px solid #007bff"
                    : "1px solid #ccc",
                background: form.category === cat ? "#e6f0ff" : "#fff",
                fontWeight: form.category === cat ? "bold" : "normal",
                cursor: "pointer",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
        <p
          style={{
            fontStyle: "italic",
            fontSize: "14px",
            margin: "8px 0",
            color: "#444",
          }}
        >
          {categoryDescriptions[form.category]}
        </p>

        <label>Descripción:</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        ></textarea>

        <label>Medio de pago:</label>
        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
        >
          {paymentMethods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>

        <button type="submit">Enviar</button>
      </form>

      <button onClick={cambiarModo}>Cambiar Modo</button>
    </div>
  );
};

export default App;
