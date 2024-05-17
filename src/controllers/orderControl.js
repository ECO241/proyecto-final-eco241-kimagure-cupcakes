const orderService = require('../services/orderService');

const orderController = {
    getAllOrders: async (req, res) => {
        try {
            const orderData = req.body;
            const newOrder = await orderService.createUser(orderData);
            
            if (newOrder) {
                res.json(newOrder);
            } else {
                res.status(500).send("Error al crear el usuario en Supabase");
            }
        } catch (error) {
            console.error("Error registrando usuario en Supabase:", error.message);
            res.status(500).send(error.message);
        }
    }
};

module.exports = orderController;
