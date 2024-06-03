function renderFinish() {
    const img = screenFinish.querySelector('#cupcakefinsh');
    img.src = '';

    socketFuntion.finishOrder(cupcake);

    setTimeout(() => {
        screenFinish.style.display = 'none';
        screenQr.style.display = 'block';
    }, 5000);
}
