const orderService = require('../services/orderService');

const orderController = {
    getAllOrders: async (req, res) => {
        try {
            // Aquí puedes implementar la lógica para obtener todas las órdenes si es necesario
        } catch (error) {
            console.error("Error obteniendo órdenes:", error.message);
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
