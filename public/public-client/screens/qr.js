async function renderQR() {
    const qrImg = await fetchFunctions.generateQR();
    document.querySelector('#qrImg').src = qrImg;
}

function startHandler(letter) {
}

socket.on('namefilled', (cupName) => {
    cupcake.name = cupName;
    renderOptions('flavor');
    screenQr.style.display = 'none';
    screenOptions.style.display = 'block';

    state = 'flavor';
});
