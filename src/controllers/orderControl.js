const orderService = require('../services/orderService');
const socketIO = require('socket.io-client');

const socket = socketIO(); // Conectar al servidor de socket


const orderController = {
    getAllOrders: async (req, res) => {
        try {
            const order = await orderService.getAllOrders();
            socket.emit('newOrder', order); // Emitir el evento al worker
            res.json(order);
        } catch (error) {
            console.error("Error retrieving flavors from Supabase:", error.message);
            res.status(500).send(error.message);
        }
    },

    createOrder: async (req, res) => {
        try {
            const orderData = req.body;
            const newOrder = await orderService.createOrder(orderData);
            
            if (newOrder) {
                res.json(newOrder);
            } else {
                res.status(500).send("Error al crear la orden en Supabase");
            }
        } catch (error) {
            console.error("Error creando orden en Supabase:", error.message);
            res.status(500).send(error.message);
        }
    }
};

module.exports = orderController;
