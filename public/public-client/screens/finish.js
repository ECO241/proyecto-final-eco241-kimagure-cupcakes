function renderFinish() {
    screenFinish.appendChild(cupcakeImg);

    socketFuntion.finishOrder(cupcake);

    setTimeout(() => {
        screenFinish.style.display = 'none';
        screenQr.style.display = 'block';
    }, 5000);
}
