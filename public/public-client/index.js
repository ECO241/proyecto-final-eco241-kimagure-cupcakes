const PORT = 3000;
// eslint-disable-next-line no-undef
const socket = io(`http://localhost:${PORT}`);

const screenDefault = document.getElementById('default');
const screenStart = document.getElementById('start');
const screenOptions = document.getElementById('options');
const screenSelected = document.getElementById('optionselected');
const screenIntructions = document.getElementById('instructions');
const screenFinish = document.getElementById('finish');
const screenQr = document.getElementById('qr');

socket.on('move', (move) => {
    const moveWithoutSpaces = move.replace(/\s/g, '');
    checkState(moveWithoutSpaces);
});

let state = 'default';

const cupcake = {
    name: 'Pending...',
    flavor: 'Pending...',
    icing: 'Pending...',
    topping: 'Pending...',
};

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
    checkState(event.key);
});

// load scripts *************

const scriptDir = './screens'; // Adjust the path if necessary

function loadScripts() {
    const scripts = [
        'default.js',
        'start.js',
        'options.js',
        'instructions.js',
        'finish.js',
    ];

    scripts.forEach((script) => {
        const scriptElement = document.createElement('script');
        scriptElement.src = `${scriptDir}/${script}`;
        document.body.appendChild(scriptElement);
    });
}

loadScripts();
