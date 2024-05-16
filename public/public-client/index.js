/* eslint-disable no-plusplus */
// INDEX *****************************************

const PORT = 3000;
// eslint-disable-next-line no-undef
const socket = io(`http://localhost:${PORT}`);

socket.on('move', (move) => {
    const moveWithoutSpaces = move.replace(/\s/g, '');
    console.log(moveWithoutSpaces);
    checkState(moveWithoutSpaces);
});

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
            state = instructionsHandler(letter, state);
            break;
        case 'icing':
            state = optionsHandler(letter);
            break;
        case 'icingIns':
            state = instructionsHandler(letter, state);
            break;
        case 'topping':
            state = optionsHandler(letter);
            break;
        case 'toppingIns':
            state = instructionsHandler(letter, state);
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
    console.log(state);
    checkState(event.key);
    console.log(event.key);
    console.log(state);
});

// DEFAULT *****************************************

function defaultHandler(letter) {
    if (letter === 'z') {
        screenDefault.style.display = 'none';
        screenStart.style.display = 'block';
        return 'start';
    }
    return 'default';
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

    for (let i = 0; i < array.length; i++) {
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

function updateOption(arrayOption) {
    cupcake[arrayOption[actualOption].type] = arrayOption[actualOption].name;
    // enviarse al worker con socket

    const textOptions = ['Yummy!', 'Delicioso!', 'Genial!'];
    screenSelected.innerHTML = '';
    const img = document.createElement('img');
    img.src = arrayOption[actualOption].img;
    const h1 = document.createElement('h1');
    h1.textContent = textOptions[actualOption];
    screenSelected.appendChild(h1);
    screenSelected.appendChild(img);
    screenOptions.style.display = 'none';
    screenSelected.style.display = 'block';

    setTimeout(() => {
        renderIntructions(`${arrayOption[actualOption].type}Ins`);
        screenSelected.style.display = 'none';
        screenIntructions.style.display = 'block';
    }, 5000);

    return `${arrayOption[actualOption].type}Ins`;
}

// INSTRUCTIONS *****************************************

function renderIntructions(stateIns) {
    const intructionDiv = document.querySelector('.instruction');
    switch (stateIns) {
    case 'flavorIns':
        intructionDiv.innerHTML = '<h1>Mueve el joystick de arriba a abajo</h1> <h2>Para añadir la masa</h2>';
        break;
    case 'icingIns':
        intructionDiv.innerHTML = '<h1>Mueve el joystick de izquierda a derecha</h1> <h2>Para añadir el glaseado</h2>';
        break;
    case 'toppingIns':
        intructionDiv.innerHTML = '<h1>Presiona el joystick varias veces</h1> <h2>Para añadir el topping</h2>';
        break;

    default:
        break;
    }
}

const lastKeys = [];

function instructionsHandler(letter, actualState) {
    lastKeys.push(letter);
    console.log(lastKeys);
    console.log(actualState);

    switch (actualState) {
    case 'flavorIns':
        if (lastKeys.slice(-5).join('') === 'wswsw') {
            renderOptions('icing');
            screenIntructions.style.display = 'none';
            screenOptions.style.display = 'block';
            return 'icing';
        }
        return 'flavorIns';
    case 'icingIns':
        console.log(lastKeys.slice(-5).join(''));
        if (lastKeys.slice(-5).join('') === 'adada') {
            renderOptions('topping');
            screenIntructions.style.display = 'none';
            screenOptions.style.display = 'block';
            return 'topping';
        }
        return 'icingIns';
    case 'toppingIns':
        if (lastKeys.slice(-5).join('') === 'zzzzz') {
            renderFinish();
            screenIntructions.style.display = 'none';
            screenFinish.style.display = 'block';
            return 'finish';
        }
        return 'toppingIns';
    default:
        return actualState;
    }
}

// FINISH *****************************************

function renderFinish() {
    const img = screenFinish.querySelector('#cupcakefinsh');
    img.src = '';

    setTimeout(() => {
        screenFinish.style.display = 'none';
        screenQr.style.display = 'block';
    }, 10000);
}
