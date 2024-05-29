const socket = io();

const start = document.querySelector('.start');
const namediv = document.querySelector('.name');
const options = document.querySelector('.options');
const qr = document.querySelector('.qr');

const startbtn = document.querySelector('.startbtn');
const nameinput = document.querySelector('.nameinput');
const namebtn = document.querySelector('.namebtn');

<<<<<<< HEAD
//opciones
const optionsList = [
    ['Cake','vanilla', 'chocolate', 'strawberry', 'banana'],
    ['Icing', 'apple', 'banana', 'orange', 'grape'],
    ['Toppings', 'sprinkles', 'chocolate syrup', 'whipped cream', 'cherry']
];

let cupcake = {
    name: 'Pending...',
    flavor: 'Pending...',
    icing: 'Pending...',
    topping: 'Pending...'
}
=======
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
>>>>>>> 4474310 (QR)

startbtn.addEventListener('click', () => {
    start.style.display = 'none';
    namediv.style.display = 'block';
<<<<<<< HEAD
})

namebtn.addEventListener('click', () => {    
=======
});

namebtn.addEventListener('click', () => {
>>>>>>> 4474310 (QR)
    cupcake.name = nameinput.value;
    socket.emit('update', cupcake);

    namediv.style.display = 'none';
    options.style.display = 'block';
    displayOptions();
<<<<<<< HEAD
})

function displayOptions() {
     // Agrega las opciones a cada elemento 
=======
});

function displayOptions() {
    // Agrega las opciones a cada elemento
>>>>>>> 4474310 (QR)
    optionsList.forEach((list, i) => {
        const option = document.createElement('select');
        option.classList.add('option');
        option.addEventListener('change', () => {
            // Cuando se selecciona una opción, actualiza la propiedad correspondiente de cupcake
<<<<<<< HEAD
            cupcake[Object.keys(cupcake)[i+1]] = option.value;
            //Emite un evento de la actualizacion del cucake
            socket.emit('update', cupcake);
        })
=======
            cupcake[Object.keys(cupcake)[i + 1]] = option.value;
            // Emite un evento de la actualizacion del cucake
            socket.emit('update', cupcake);
        });
>>>>>>> 4474310 (QR)
        list.forEach((item) => {
            const opt = document.createElement('option');
            opt.value = item;
            opt.textContent = item;
            option.appendChild(opt);
<<<<<<< HEAD
        })
        options.appendChild(option);
    })
    const finishbtn = document.createElement('button');
    finishbtn.textContent = 'Finish';
    options.appendChild(finishbtn);
    finishbtn.addEventListener('click', () => {
        options.style.display = 'none';
        // Cuando se hace clic en el botón, oculta las opciones y muestra el código QR
        qr.style.display = 'block';
        // Emite un evento de "finalizar pedido" al servidor a través del socket junto con la información del cupcake
        socket.emit('finishorder', cupcake);
    })
}
 

=======
        });
        options.appendChild(option);
    });

    const finishbtn = document.createElement('button');
    finishbtn.textContent = 'Finish';
    options.appendChild(finishbtn);

    finishbtn.addEventListener('click', () => {
        options.style.display = 'none';
        qr.style.display = 'block';
        const order = {
            name: cupcake.name,
            flavor: cupcake.flavor,
            icing: cupcake.icing,
            topping: cupcake.topping,
        };

        socket.emit('finishorder', order);
    });
}
>>>>>>> 4474310 (QR)
