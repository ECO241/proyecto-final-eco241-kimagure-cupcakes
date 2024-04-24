const express = require('express');
const router = express.Router();
const flavorsController = require('../controllers/flavorsController');

router.get('/', flavorsController.getAllFlavors);

router.get('/:id', flavorsController.getFlavorById);

router.post('/', flavorsController.createFlavor);

router.put('/:id', flavorsController.updateFlavor);

router.delete('/:id', flavorsController.deleteFlavor);

module.exports = router;