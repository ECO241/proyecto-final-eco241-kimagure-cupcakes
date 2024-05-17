const socket = io();

const namediv = document.querySelector('.name');
const options = document.querySelector('.options');
const qr = document.querySelector('.qr');

const startbtn = document.querySelector('.startbtn');
const nameinput = document.querySelector('.nameinput');
const namebtn = document.querySelector('.namebtn');

// opciones
const optionsList = [
    ['Cake', 'vanilla', 'chocolate', 'strawberry', 'banana'],
    ['Icing', 'apple', 'banana', 'orange', 'grape'],
    ['Toppings', 'sprinkles', 'chocolate syrup', 'whipped cream', 'cherry'],
];

const cupcake = {
    name: 'Pending...',
    flavor: 'Pending...',
    icing: 'Pending...',
    topping: 'Pending...',
};

function displayOptions() {
    // Agrega las opciones a cada elemento
    optionsList.forEach((list, i) => {
        const option = document.createElement('select');
        option.classList.add('option');
        option.addEventListener('change', () => {
            // Cuando se selecciona una opción, actualiza la propiedad correspondiente de cupcake
            cupcake[Object.keys(cupcake)[i + 1]] = option.value;
            // Emite un evento de la actualizacion del cucake
            socket.emit('update', cupcake);
        });
        list.forEach((item) => {
            const opt = document.createElement('option');
            opt.value = item;
            opt.textContent = item;
            option.appendChild(opt);
        });
        options.appendChild(option);
    });
    const finishbtn = document.createElement('button');
    finishbtn.textContent = 'Finish';
    options.appendChild(finishbtn);
    finishbtn.addEventListener('click', () => {
        options.style.display = 'none';
        // Cuando se hace clic en el botón, oculta las opciones y muestra el código QR
        qr.style.display = 'block';
        socket.emit('finishorder', cupcake);
    });
}

startbtn.addEventListener('click', () => {
    start.style.display = 'none';
    namediv.style.display = 'block';
});

namebtn.addEventListener('click', () => {
    cupcake.name = nameinput.value;
    socket.emit('update', cupcake);

    namediv.style.display = 'none';
    options.style.display = 'block';
    displayOptions();
});
