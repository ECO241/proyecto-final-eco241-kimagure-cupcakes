const express = require('express');
const authController = require('../controllers/authControl');

const router = express.Router();

// Endpoint para el registro de usuarios
router.post('/sign-up', authController.signUp);

// Endpoint para verificar si el correo electrónico ya está registrado
router.get('/check-email', authController.checkEmail);

module.exports = router;
