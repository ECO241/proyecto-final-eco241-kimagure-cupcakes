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
