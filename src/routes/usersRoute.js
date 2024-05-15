const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersControl');

router.post('/register', usersController.registerUser);

module.exports = router;
