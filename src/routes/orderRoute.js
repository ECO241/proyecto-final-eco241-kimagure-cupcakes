const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderControl');

// Endpoint para obtener todas las órdenes
router.get('/orders', orderController.getAllOrders);

// Endpoint para crear una nueva orden
router.post('/createOrder', orderController.createOrder); // Modifica la ruta aquí

module.exports = router;

