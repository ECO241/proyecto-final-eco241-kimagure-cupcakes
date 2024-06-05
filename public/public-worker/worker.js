const socket = io();

const order = document.querySelector('.order');
const history = document.querySelector('.history');

const cupcake = {
    name: 'Name pending...',
    flavor: '',
    icing: '',
    topping: '',
};

updateOptions(cupcake);

socket.on('update', (cupcake) => {
    updateOptions(cupcake);
});

function updateOptions(cupcake) {
    order.innerHTML = `
        <p><b>${cupcake.name}</b></p>
        <p>Flavor: ${cupcake.flavor}</p>
        <p>Icing: ${cupcake.icing}</p>
        <p>Topping: ${cupcake.topping}</p>`;
}

socket.on('finishorder', (cup) => {
    // ACÁ CÓDIGO DEL UTILS DEL SUPABASE PA ENVIAR ESA ORDEN
    updateOptions(cupcake);

    const cupDiv = document.createElement('div');
    cupDiv.innerHTML = `
        <p><b>${cup.name}</b></p>
        <p>${cup.flavor} - ${cup.icing} - ${cup.topping}</p>`;
    history.appendChild(cupDiv);
});
