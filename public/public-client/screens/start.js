function startHandler(letter) {
    if (letter === 'z') {
        const nameInput = document.getElementById('name');
        const name = nameInput.value;
        cupcake.name = name;
        socketFunctions.updateCupcake(cupcake);
        renderOptions('flavor');
        screenStart.style.display = 'none';
        screenOptions.style.display = 'block';
        return 'flavor';
    }

    return 'start';
}
