const socketFuntion = {
    updateCupcake: (cupcake) => {
        socket.emit('update', cupcake);
    },
    finishOrder: (order) => {
        console.log(order);
        socket.emit('finishorder', order);
    },
};
