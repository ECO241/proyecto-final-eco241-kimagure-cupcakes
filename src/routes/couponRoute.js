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

// Endpoint para obtener los datos del carrusel
router.get('/carousel', couponController.getCarouselData);

// Endpoint para obtener los datos del carrusel2
router.get('/carousel2', couponController.getCarouselData2);

// Endpoint para obtener los datos del carrusel3
router.get('/carousel3', couponController.getCarouselData3);

// Endpoint para obtener los datos del cupon
router.get('/getUserCoupon', couponController.getCouponCode);

module.exports = router;
