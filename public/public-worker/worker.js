const PORT = 'http://localhost:3000';
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
updateHistory();

socket.on('update', (cupcake) => {
    updateOptions(cupcake);
});

function updateOptions(cupcake) {
    order.innerHTML = `
        <div>
        <p><b>${cupcake.name}</b></p>
        <p>Flavor: ${cupcake.flavor}</p>
        <p>Icing: ${cupcake.icing}</p>
        <p>Topping: ${cupcake.topping}</p>
        </div>`;
}

async function updateHistory() {
    const data = await fetchFunctions.getOrders();
    const orders = data.slice(0, 5);
    history.innerHTML = '';
    orders.forEach((cup) => {
        const cupDiv = document.createElement('div');
        cupDiv.innerHTML = `
            <p><b>${cup.name}</b></p>
            <p>${cup.flavor} - ${cup.icing} - ${cup.topping}</p>`;
        history.appendChild(cupDiv);
    });
}

socket.on('finishorder', (cup) => {
    fetchFunctions.createOrder(cup);
    updateOptions(cupcake);
    updateHistory();
});
