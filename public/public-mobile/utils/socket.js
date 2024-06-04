const socketFuntion = {
    updateCupcake: (cupcake) => {
        socket.emit('update', cupcake);
    },
    finishOrder: (order) => {
        socket.emit('finishorder', order);
    },
    nameFilled: (name) => {
        socket.emit('namefilled', name);
    },
};
