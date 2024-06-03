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
    console.log(lastKeys.slice(-5).join(''));

    switch (actualState) {
    case 'flavorIns':
        if (lastKeys.slice(-3).join('') === 'wsw') {
            renderOptions('icing');
            screenIntructions.style.display = 'none';
            screenOptions.style.display = 'block';
            return 'icing';
        }
        return 'flavorIns';
    case 'icingIns':
        console.log(lastKeys.slice(-5).join(''));
        if (lastKeys.slice(-3).join('') === 'ada') {
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
