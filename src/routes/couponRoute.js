const express = require('express');

const router = express.Router();
const couponController = require('../controllers/couponControl');

// Endpoint para generar el código QR
router.get('/generate-qr', couponController.generateQR);

// Endpoint para guardar el código del cupón
router.post('/save-coupon', couponController.saveCoupon);

// Endpoint para registrar un usuario
router.post('/sign-up', couponController.signUp);

// Endpoint para generar un código de descuento
router.get('/generate-discount-code', couponController.generateDiscountCode);

module.exports = router;
