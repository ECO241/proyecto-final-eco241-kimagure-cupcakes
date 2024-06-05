const express = require('express');

const router = express.Router();
const authController = require('../controllers/authControl');

// Ruta para registrarse
router.post('/sign-up', authController.signUp);

module.exports = router;
