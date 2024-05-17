const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderControl');

router.get('/orders', orderController.getAllOrders);

module.exports = router;