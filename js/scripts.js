const pedidos = {
    2: {
        hora: "12:05 pm",
        estado: "Pendiente",
        items: [
            { nombre: "1 Coctel de camarón", tiempo: null, entregado: false },
            { nombre: "1 Coctel campechano", tiempo: null, entregado: false },
            { nombre: "1 Jarra de agua", tiempo: null, entregado: false }
        ]
    },
    6: {
        hora: "12:25 pm",
        estado: "Pendiente",
        items: [
            { nombre: "1 Tostada de ceviche", tiempo: null, entregado: false },
            { nombre: "1 Limonada", tiempo: null, entregado: false }
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

    let html = `
        <h4>PEDIDO MESA ${mesa}</h4>
        <p><strong>Hora:</strong> ${pedido.hora}</p>
        <ul>
    `;

    pedido.items.forEach((item, index) => {
        const color = item.tiempo === 0 ? "style='color: green; font-weight: bold'" : "";
        html += `
            <li ${color}>
                ${item.nombre} - 
                ${item.tiempo !== null ? (item.tiempo > 0 ? `${item.tiempo} min` : "¡Listo!") : "⏱ Sin tiempo"}
                <button onclick="asignarTiempo(${mesa}, ${index})">
    <img src="images/reloj.png" alt="Tiempo"> Asignar Tiempo
</button>

            </li>
        `;
    });

    html += `</ul>`;
    contenedor.innerHTML = html;
}

function asignarTiempo(mesa, index) {
    const minutos = parseInt(prompt("¿Cuántos minutos faltan para el platillo?"));
    if (!isNaN(minutos) && minutos > 0) {
        pedidos[mesa].items[index].tiempo = minutos;
        mostrarPedido(mesa);
    }
}

// Temporizador que disminuye 1 min cada 10 segundos (simulado)
setInterval(() => {
    for (const mesa in pedidos) {
        pedidos[mesa].items.forEach(item => {
            if (item.tiempo !== null && item.tiempo > 0) {
                item.tiempo--;
                if (item.tiempo === 0) {
                    reproducirAlerta();
                }
            }
        });
    }

    if (mesaActual !== null) {
        mostrarPedido(mesaActual);
    }
}, 10000);

// 🔔 Sonido de alerta (opcional)
function reproducirAlerta() {
    const audio = new Audio("https://www.soundjay.com/buttons/sounds/beep-07.mp3");
    audio.play();
}

function verPlatillosListos() {
    const contenedor = document.getElementById("pedido-info");
    let resultado = "<h4>Platillos Listos</h4><ul>";

    let hayListos = false;

    for (const mesa in pedidos) {
        pedidos[mesa].items.forEach((item, index) => {
            if (item.tiempo === 0 && !item.entregado) {
                resultado += `
                    <li>
                        <strong>${item.nombre}</strong> - Mesa ${mesa} - ¡Listo!
                        <button onclick="marcarEntregado(${mesa}, ${index})">
    <img src="images/check.png" alt="Entregado"> Entregado
</button>

                    </li>`;
                hayListos = true;
            }
        });
    }

    resultado += "</ul>";
    if (!hayListos) resultado = "<p>⏳ Aún no hay platillos listos.</p>";

    contenedor.innerHTML = resultado;
}

function marcarEntregado(mesa, index) {
    pedidos[mesa].items[index].entregado = true;
    verPlatillosListos(); // Recarga la lista
}

