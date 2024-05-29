const socket = io();

const order = document.querySelector('.order');

<<<<<<< HEAD
let cupcake = {
    name: 'Pending...',
    flavor: 'Pending...',
    icing: 'Pending...',
    topping: 'Pending...'
}

=======
const cupcake = {
    name: 'Pending...',
    flavor: 'Pending...',
    icing: 'Pending...',
    topping: 'Pending...',
};
>>>>>>> 4474310 (QR)

// función 'updateOptions' para actualizar la interfaz con el estado inicial del cupcake
updateOptions(cupcake);

<<<<<<< HEAD

=======
>>>>>>> 4474310 (QR)
// Escucha eventos de 'update' del servidor y actualiza la interfaz con el nuevo estado del cupcake
socket.on('update', (cupcake) => {
    console.log('New cupcake update:', cupcake);
    updateOptions(cupcake);
<<<<<<< HEAD
})  


function updateOptions(cupcake) { 
     // Limpia el contenido del elemento 'order' 
=======
});

function updateOptions(cupcake) {
    // Limpia el contenido del elemento 'order'
>>>>>>> 4474310 (QR)
    order.innerHTML = '';
    // crea un texto para el nombre, glaseado, etc
    const text = document.createElement('p');
    text.textContent = `Name: ${cupcake.name}, Flavor: ${cupcake.flavor}, Icing: ${cupcake.icing}, Topping: ${cupcake.topping}`;
<<<<<<< HEAD
    //Actualiza la interface
    order.appendChild(text);
}


// Escucha eventos de 'finishorder' del servidor y muestra una alerta cuando se completa el pedido
socket.on('finishorder', (cupcake) => {
    console.log('Order finished:', cupcake);
    alert('Pedido realizado')
})

=======
    // Actualiza la interface
    order.appendChild(text);
}

// Escucha eventos de 'finishorder' del servidor y muestra una alerta cuando se completa el pedido
socket.on('finishorder', (cupcake) => {
    console.log('Order finished:', cupcake);
    alert('Pedido realizado');
});
>>>>>>> 4474310 (QR)
