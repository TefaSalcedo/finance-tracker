import React, {useEffect, useState } from 'react';
import "./main.css"
const categories = [
    '🏠 Vivienda',
    '🍽️ Alimentación',
    '🚗 Transporte',
    '🩺 Salud',
    '🍟 Salidas a comer',
    '🎉 Entretenimiento',
    '🐾 Mascotas',
    '📺 Suscripciones',
    '💰 Ahorro',
    '⚡ Imprevistos'
];

const paymentMethods = [
    'TC Gold', 
    'TC Plata', 
    'T. DEBITO',
    'Nequi', 
    'Daviplata',
    'Efectivo'];

const App = () => {
    const [modoOscuro, setModoOscuro] = useState(false);
    const today = new Date().toISOString().split('T')[0];


    // 
    console.log("entramos :3");
    const cambiarModo = () => {
        setModoOscuro(!modoOscuro);
        console.log("click")
        console.log(modoOscuro);
    }

      const [form, setForm] = useState({
        date: today,
        amount: '',
        category: categories[0],
        description: '',
        paymentMethod: paymentMethods[0]
    });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (form.amount <= 0) {
      alert('El monto debe ser mayor que cero.');
      return;
    }
    if (!form.description.trim()) {
      alert('La descripción es obligatoria.');
      return;
    }
        try {
            const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
            const url = isLocal
            ? '/api'
            : 'https://script.google.com/macros/s/AKfycby63ofUnFuIu33P9zioL38zwmwUL3SwQh9kX5WjzkME9SsyPUTxOLnTHSRm4zGs37Lxvg/exec';

        const response = await fetch(`${url}`, {
            method: 'POST',
            body: JSON.stringify(form),
            headers: { 'Content-Type': 'application/json' }
        });
      const result = await response.json();
      if (result.success) {
        alert('Gasto registrado exitosamente.');
        setForm({
          date: today,
          amount: '',
          category: categories[0],
          description: '',
          paymentMethod: paymentMethods[0]
        });
      } else {
        alert('Error al registrar gasto.');
      }
    } catch (error) {
      console.log(error);
      alert('Error al conectar con el servidor.');
    }
  };

    return(
        <div className={modoOscuro ? "app dark" : "app"}>
            <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
                <label>
                    Fecha:
                    </label>
                    <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    />
                

                <label>
                    Monto:
                </label>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{ fontWeight: 'bold', marginRight: 6 }}>$</span>
                        <input
                            type="number"
                            name="amount"
                            value={form.amount}
                            onChange={handleChange}
                            min="0"
                            step="1"
                            inputMode="numeric"
                            style={{
                                MozAppearance: 'textfield',
                                WebkitAppearance: 'none',
                                appearance: 'textfield',
                                width: '100%',
                            }}
                            // Quitar flechitas en Chrome, Safari, Edge, Opera
                            onWheel={e => e.target.blur()}
                        />
                    </div>
                

                <label>
                    Categoría:
                </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setForm({ ...form, category: cat })}
                                style={{
                                    padding: '6px 12px',
                                    borderRadius: '6px',
                                    border: form.category === cat ? '2px solid #007bff' : '1px solid #ccc',
                                    background: form.category === cat ? '#e6f0ff' : '#fff',
                                    fontWeight: form.category === cat ? 'bold' : 'normal',
                                    cursor: 'pointer'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
               

                <label>
                    Descripción:
                    </label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}>
                    </textarea>
            
                <label>
                    Medio de pago:
                    </label>
                    <select
                    name="paymentMethod"
                    value={form.paymentMethod}
                    onChange={handleChange}
                    >
                    {paymentMethods.map((method) => (
                        <option key={method} value={method}>{method}</option>
                    ))}
                    </select>
                

                <button type="submit">Enviar</button>
            </form>
        
  
            <button onClick={cambiarModo}>
                Cambiar Modo
            </button>

        </div>
    )
}

export default App