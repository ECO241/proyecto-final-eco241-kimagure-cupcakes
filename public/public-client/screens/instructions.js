function renderIntructions(stateIns) {
    const updownAn = animations.updown();
    const leftrightAn = animations.leftright();
    const clickAn = animations.click();

    const intructionDiv = document.querySelector('.instruction');

    switch (stateIns) {
    case 'flavorIns':
        intructionDiv.innerHTML = '<h1>Move the joystick up and down</h1> <h2>to add the batter</h2>';
        intructionDiv.appendChild(updownAn);
        break;
    case 'icingIns':
        intructionDiv.innerHTML = '<h1>Move the joystick left and right</h1> <h2>to add the icing</h2>';
        intructionDiv.appendChild(leftrightAn);
        break;
    case 'toppingIns':
        intructionDiv.innerHTML = '<h1>Press the joystick</h1> <h2>to add the topping</h2>';
        intructionDiv.appendChild(clickAn);
        break;

    default:
        break;
    }
}

let insCounter = 0;
let insDirection = '';

function instructionsHandler(letter, actualState) {
    switch (actualState) {
    case 'flavorIns':
        if (letter !== insDirection && (letter === 'w' || letter === 's')) {
            insDirection = letter;
            insCounter += 1;
            if (insCounter > 4) {
                insCounter = 0;
                instructionsDone('icing');
                return 'icing';
            }
        }
        return 'flavorIns';
    case 'icingIns':
        if (letter !== insDirection && (letter === 'a' || letter === 'd')) {
            insDirection = letter;
            insCounter += 1;
            if (insCounter > 4) {
                insCounter = 0;
                instructionsDone('topping');
                return 'topping';
            }
        }
        return 'icingIns';
    case 'toppingIns':
        if (letter === 'z') {
            insCounter += 1;
            if (insCounter > 3) {
                insCounter = 0;
                instructionsDone('finish');
                return 'finish';
            }
        }
        return 'toppingIns';
    default:
        return actualState;
    }
}

function instructionsDone(nextState) {
    const textOptions = ['Yummy!', 'Delicious!', 'Fantastic!'];
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
