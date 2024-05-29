const express = require('express');
<<<<<<< HEAD
=======

>>>>>>> 4474310 (QR)
const router = express.Router();
const usersController = require('../controllers/usersControl');

router.post('/register', usersController.registerUser);

module.exports = router;
