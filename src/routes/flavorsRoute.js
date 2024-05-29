const express = require('express');
<<<<<<< HEAD
=======

>>>>>>> 4474310 (QR)
const router = express.Router();
const flavorsController = require('../controllers/flavorsControl');

router.get('/', flavorsController.getAllFlavors);

router.get('/:id', flavorsController.getFlavorById);

router.post('/', flavorsController.createFlavor);

router.put('/:id', flavorsController.updateFlavor);

router.delete('/:id', flavorsController.deleteFlavor);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 4474310 (QR)
