const pedidos = {
    2: {
        hora: "12:05 pm",
        estado: "En preparación",
        tiempo: 15,
        items: [
            "1 Coctel de camarón",
            "1 Coctel campechano",
            "1 Jarra de agua",
            "* Sin cilantro"
        ]
    },
    6: {
        hora: "12:25 pm",
        estado: "En preparación",
        tiempo: 10,
        items: [
            "1 Tostada de ceviche",
            "1 Limonada"
        ]
    }
};

let mesaActual = null;

function verPedido(mesa) {
    mesaActual = mesa;
    mostrarPedido(mesa);
}

function mostrarPedido(mesa) {
    const pedido = pedidos[mesa];
    const contenedor = document.getElementById("pedido-info");

    if (pedido) {
        let estado = pedido.estado;
        if (pedido.tiempo <= 0) {
            estado = "Terminado";
        }

        contenedor.innerHTML = `
            <h4>PEDIDO MESA ${mesa}</h4>
            <p><strong>Hora:</strong> ${pedido.hora}</p>
            <p><strong>Estado:</strong> ${estado}</p>
            <ul>
                ${pedido.items.map(item => `<li>${item}</li>`).join("")}
            </ul>
            <p><strong>Est.:</strong> ${pedido.tiempo > 0 ? pedido.tiempo + " min" : "Listo para servir"}</p>
        `;
    }
}

function actualizarEstado(mesa) {
    alert("Estado del pedido de Mesa " + mesa + " actualizado manualmente.");
}

// ⏰ Este bloque actualiza automáticamente el pedido visible cada 10 segundos
setInterval(() => {
    // Simula que pasa 1 minuto real cada 10 segundos (para pruebas rápidas)
    for (const mesa in pedidos) {
        if (pedidos[mesa].tiempo > 0) {
            pedidos[mesa].tiempo--;
        }
    }
    if (mesaActual !== null) {
        mostrarPedido(mesaActual);
    }
}, 10000);
