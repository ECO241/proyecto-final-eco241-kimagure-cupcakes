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
    console.log(actualState);

    switch (actualState) {
    case 'flavorIns':
        if (lastKeys.slice(-3).join('') === 'wsw') {
            instructionsDone('icing');
            return 'icing';
        }
        return 'flavorIns';
    case 'icingIns':
        if (lastKeys.slice(-3).join('') === 'ada') {
            instructionsDone('topping');
            return 'topping';
        }
        return 'icingIns';
    case 'toppingIns':
        if (lastKeys.slice(-5).join('') === 'zzzzz') {
            instructionsDone('finish');
            return 'finish';
        }
        return 'toppingIns';
    default:
        return actualState;
    }
}

function instructionsDone(nextState) {
    console.log(array);
    const textOptions = ['Yummy!', 'Delicioso!', 'Genial!'];
    screenSelected.innerHTML = '';
    const img = document.createElement('img');
    img.src = array[actualOption].img;
    const h1 = document.createElement('h1');
    h1.textContent = textOptions[actualOption];
    screenSelected.appendChild(h1);
    screenSelected.appendChild(img);
    screenIntructions.style.display = 'none';
    screenSelected.style.display = 'block';

    setTimeout(() => {
        if (nextState === 'finish') {
            renderFinish();
            screenSelected.style.display = 'none';
            screenFinish.style.display = 'block';
            return;
        }
        renderOptions(nextState);
        screenSelected.style.display = 'none';
        screenOptions.style.display = 'block';
    }, 2000);
}
