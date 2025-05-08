// Ejemplos de imágenes de comida para la demostración
const foodImages = [
    "/api/placeholder/400/320",
    "/api/placeholder/400/320",
    "/api/placeholder/400/320",
    "/api/placeholder/400/320",
    "/api/placeholder/400/320"
];

// Ejemplos de platos
const foodItems = [
    "Pizza Pepperoni",
    "Pizza Hawaiana",
    "Pizza Vegetariana",
    "Pasta Alfredo",
    "Lasaña de Carne",
    "Calzone Especial",
    "Ensalada César",
    "Pizza Margarita",
    "Ravioles de Queso",
    "Alitas Picantes"
];

// Posibles modificaciones
const modifications = [
    "Sin cambios",
    "Extra queso",
    "Sin cebolla",
    "Masa delgada",
    "Doble carne",
    "Sin gluten",
    "Poco picante",
    "Para llevar"
];

// Lista de pedidos en espera
let orders = [];

// Función para generar un pedido aleatorio
function generateRandomOrder() {
    const food = foodItems[Math.floor(Math.random() * foodItems.length)];
    const mod = modifications[Math.floor(Math.random() * modifications.length)];
    const img = foodImages[Math.floor(Math.random() * foodImages.length)];
    const id = 'order-' + Math.floor(Math.random() * 10000);
    
    return {
        id: id,
        name: food,
        modification: mod,
        image: img,
        time: new Date()
    };
}

// Función para añadir un nuevo pedido a la lista
function addOrder() {
    const newOrder = generateRandomOrder();
    orders.push(newOrder);
    renderOrders();
    
    // Actualizar contador
    $('#orders-count').text(orders.length);
    
    // Ocultar mensaje de no pedidos
    if (orders.length > 0) {
        $('#no-orders').hide();
    }
}

// Función para eliminar un pedido
function completeOrder(id) {
    // Animación para la eliminación
    $('#' + id).fadeOut('slow', function() {
        // Remover el pedido del array
        orders = orders.filter(order => order.id !== id);
        
        // Actualizar contador
        $('#orders-count').text(orders.length);
        
        // Mostrar mensaje si no hay pedidos
        if (orders.length === 0) {
            $('#no-orders').show();
        }
        
        renderOrders();
    });
}

// Función para mostrar todos los pedidos
function renderOrders() {
    // Limpiar el panel de pedidos
    $('#orders-panel').empty();
    
    if (orders.length === 0) {
        $('#orders-panel').html('<div class="col-12"><div class="no-orders" id="no-orders">No hay pedidos pendientes</div></div>');
        return;
    }
    
    // Crear una fila para cada pedido
    orders.forEach(order => {
        const timeStr = order.time.toLocaleTimeString();
        const orderHtml = `
            <div class="col-md-6 col-lg-4 mb-4" id="${order.id}">
                <div class="order-container">
                    <div class="row">
                        <div class="col-4">
                            <img src="${order.image}" alt="${order.name}" class="order-img">
                        </div>
                        <div class="col-8">
                            <h3 class="order-name">${order.name}</h3>
                            <p class="order-modifications">
                                ${order.modification}
                            </p>
                            <p class="order-time">Pedido: ${timeStr}</p>
                            <button class="complete-btn" onclick="completeOrder('${order.id}')">
                                Completado <i class="fas fa-check ms-1"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        $('#orders-panel').append(orderHtml);
    });
}

// Función para actualizar la hora actual
function updateCurrentTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString();
    $('#current-time').text(timeStr);
}

// Inicializar la aplicación
$(document).ready(function() {
    // Actualizar hora cada segundo
    setInterval(updateCurrentTime, 1000);
    updateCurrentTime();
    
    // Añadir pedidos de muestra
    for (let i = 0; i < 5; i++) {
        addOrder();
    }
    
    // Añadir un pedido nuevo cada 15 segundos
    setInterval(function() {
        if (orders.length < 12) {  // Máximo 12 pedidos
            addOrder();
        }
    }, 15000);
});

// Agregar pedido con botón en teclado
$(document).keydown(function(e) {
    // Tecla 'A' para añadir un pedido
    if (e.keyCode === 65) {
        addOrder();
    }
    // Tecla 'C' para completar el primer pedido
    if (e.keyCode === 67 && orders.length > 0) {
        completeOrder(orders[0].id);
    }
});