let actualOption = 0;
let array = [];
let fullarray;

const machineImg = document.querySelector('#machine');
const cupcakeImg = document.querySelector('#cupcakeImage');

organizeFlavors();

async function organizeFlavors() {
    const flavors = await fetch('http://localhost:3000/flavors').then((res) => res.json()).catch((err) => console.log(err));
    fullarray = {
        flavor: flavors.filter((f) => f.type === 'flavor'),
        icing: flavors.filter((f) => f.type === 'icing'),
        topping: flavors.filter((f) => f.type === 'topping'),
    };
    console.log(fullarray);
}

async function renderOptions(actualState) {
    switch (actualState) {
    case 'flavor':
        array = fullarray.flavor;
        break;
    case 'icing':
        array = fullarray.icing;
        break;
    case 'topping':
        array = fullarray.topping;
        break;

    default:
        break;
    }
    const divOptions = document.querySelector('.glaze');
    divOptions.innerHTML = '';

    for (let i = 0; i < array.length; i += 1) {
        const button = document.createElement('button');
        const img = document.createElement('img');
        img.src = array[i].img;
        button.appendChild(img);
        if (i !== actualOption) {
            button.classList.add('grayscale');
        }
        divOptions.appendChild(button);
    }
}

function optionsHandler(letter) {
    switch (letter) {
    case 'a':
        if (actualOption > 0) {
            actualOption -= 1;
        }
        renderOptions(array[actualOption].type);
        return array[actualOption].type;
    case 'd':
        if (actualOption < 2) {
            actualOption += 1;
        }
        renderOptions(array[actualOption].type);
        return array[actualOption].type;
    case 'z':
        return updateOption(array);
    default:
        return array[actualOption].type;
    }
}

function updateOption(array) {
    updateCupcakeImage(array);
    cupcake[array[actualOption].type] = array[actualOption].flavor;
    socketFuntion.updateCupcake(cupcake);

    renderIntructions(`${array[actualOption].type}Ins`);
    screenOptions.style.display = 'none';
    screenIntructions.style.display = 'block';

    return `${array[actualOption].type}Ins`;
}

function updateCupcakeImage(array) {
    machineImg.src = 'https://github.com/ECO241/proyecto-final-eco241-kimagure-cupcakes/blob/main/imagenes/machine2.png?raw=true';

    const cupImg = document.createElement('img');
    cupImg.src = array[actualOption].cupcake_img;
    cupcakeImg.appendChild(cupImg);
}
