/* eslint-disable no-plusplus */
// INDEX *****************************************

const screenDefault = document.getElementById('default');
const screenStart = document.getElementById('start');
const screenOptions = document.getElementById('options');
const screenSelected = document.getElementById('optionselected');
const screenIntructions = document.getElementById('instructions');
const screenFinish = document.getElementById('finish');
const screenQr = document.getElementById('qr');

const cupcake = {
    name: 'Pending...',
    flavor: 'Pending...',
    icing: 'Pending...',
    topping: 'Pending...',
};

let state = 'default';

function checkState(letter) {
    if (letter === 'w' || letter === 'a' || letter === 's' || letter === 'd' || letter === 'z') {
        switch (state) {
        case 'default':
            state = defaultHandler(letter);
            break;
        case 'start':
            state = startHandler(letter);
            break;
        case 'flavor':
            state = optionsHandler(letter);
            break;
        case 'flavorIns':
            break;
        case 'icing':
            state = optionsHandler(letter);
            break;
        case 'icingIns':
            break;
        case 'topping':
            state = optionsHandler(letter);
            break;
        case 'toppingIns':
            break;
        case 'finish':
            break;
        case 'qr':
            break;
        default:
            break;
        }
    } else {
        console.log('Invalid key');
    }
}

window.addEventListener('keydown', (event) => {
    checkState(event.key);
    console.log(event.key);
    console.log(state);
});

// DEFAULT *****************************************

function defaultHandler(letter) {
    if (letter === 'z') {
        screenDefault.style.display = 'none';
        screenStart.style.display = 'block';
    }

    return 'start';
}

// START *****************************************

function startHandler(letter) {
    if (letter === 'z') {
        const nameInput = document.getElementById('name');
        const name = nameInput.value;
        cupcake.name = name;
        // EMIT SOCKET PAL WORKER
        renderOptions('flavor');
        screenStart.style.display = 'none';
        screenOptions.style.display = 'block';
    }

    return 'flavor';
}

// OPTIONS *****************************************

let actualOption = 0;
let array = [];

async function organizeFlavors() {
    const flavors = await fetch('http://localhost:3000/flavors').then((res) => res.json()).catch((err) => console.log(err));
    const organizedFlavors = {
        flavor: flavors.filter((f) => f.type === 'flavor'),
        icing: flavors.filter((f) => f.type === 'icing'),
        topping: flavors.filter((f) => f.type === 'topping'),
    };
    return organizedFlavors;
}

async function renderOptions(actualState) {
    const fullarray = await organizeFlavors();
    if (actualState === 'flavor') {
        array = fullarray.flavor;
    }
    const divOptions = document.querySelector('.glaze');
    divOptions.innerHTML = '';

    for (let i = 0; i < array.length; i++) {
        const button = document.createElement('button');
        const img = document.createElement('img');
        img.src = array[i].img;
        button.appendChild(img);
        console.log(button);
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
        return 'flavor';
    case 'd':
        if (actualOption < 3) {
            actualOption += 1;
        }
        renderOptions(array[actualOption].type);
        return 'flavor';
    case 'z':
        updateOption(array, actualOption);
        break;
    default:
        break;
    }
}

function updateOption(arrayOption) {
    cupcake[arrayOption[actualOption].type] = arrayOption[actualOption].name;
    // enviarse al worker con socket

    const img = document.createElement('img');
    img.src = arrayOption[actualOption].img;
    screenOptions.style.display = 'none';
    screenSelected.style.display = 'block';

    setTimeout(() => {
        
        screenSelected.style.display = 'none';
        screenOptions.style.display = 'block';
    }, 3000);
    // el wonderful
    // cambio de pantalla
}
