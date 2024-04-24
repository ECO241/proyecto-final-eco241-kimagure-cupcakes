const socket = io();

const order = document.querySelector('.order');

let cupcake = {
    name: 'Pending...',
    flavor: 'Pending...',
    icing: 'Pending...',
    topping: 'Pending...'
}


// función 'updateOptions' para actualizar la interfaz con el estado inicial del cupcake
updateOptions(cupcake);


// Escucha eventos de 'update' del servidor y actualiza la interfaz con el nuevo estado del cupcake
socket.on('update', (cupcake) => {
    console.log('New cupcake update:', cupcake);
    updateOptions(cupcake);
})  


function updateOptions(cupcake) { 
     // Limpia el contenido del elemento 'order' 
    order.innerHTML = '';
    // crea un texto para el nombre, glaseado, etc
    const text = document.createElement('p');
    text.textContent = `Name: ${cupcake.name}, Flavor: ${cupcake.flavor}, Icing: ${cupcake.icing}, Topping: ${cupcake.topping}`;
    //Actualiza la interface
    order.appendChild(text);
}


// Escucha eventos de 'finishorder' del servidor y muestra una alerta cuando se completa el pedido
socket.on('finishorder', (cupcake) => {
    console.log('Order finished:', cupcake);
    alert('Pedido realizado')
})

