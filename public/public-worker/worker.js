const socket = io();

const order = document.querySelector('.order');

const cupcake = {
    name: 'Pending...',
    flavor: 'Pending...',
    icing: 'Pending...',
    topping: 'Pending...',
};

updateOptions(cupcake);

function updateOptions(upOptions) {
    // Limpia el contenido del elemento 'order'
    order.innerHTML = '';
    // crea un texto para el nombre, glaseado, etc
    const text = document.createElement('p');
    text.textContent = `Name: ${upOptions.name}, Flavor: ${upOptions.flavor}, Icing: ${upOptions.icing}, Topping: ${upOptions.topping}`;
    // Actualiza la interface
    order.appendChild(text);
}

// función 'updateOptions' para actualizar la interfaz con el estado inicial del cupcake

// Escucha eventos de 'update' del servidor y actualiza la interfaz con el nuevo estado del cupcake
socket.on('update', (cupcakeUpdate) => {
    console.log('New cupcake update:', cupcakeUpdate);
    updateOptions(cupcakeUpdate);
});

// Escucha eventos de 'finishorder' del servidor y muestra una alerta cuando se completa el pedido
socket.on('finishorder', (orderFinish) => {
    console.log('Order finished:', orderFinish);
    alert('Pedido realizado');
});
