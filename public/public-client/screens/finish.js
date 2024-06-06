function renderFinish() {
    screenFinish.appendChild(cupcakeImg);

    socketFuntion.finishOrder(cupcake);
}

socket.on('restart', () => {
    window.location.reload();
});
