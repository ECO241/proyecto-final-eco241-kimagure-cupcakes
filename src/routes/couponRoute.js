const express = require('express');
const couponController = require('../controllers/couponControl');

const router = express.Router();

// Endpoint para generar el código QR
router.get('/generate-qr', couponController.generateQR);

module.exports = router;
