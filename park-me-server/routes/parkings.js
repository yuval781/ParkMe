const express = require('express');
const parkingsController = require('../controllers/parkings');

const router = express.Router();

router.get('/', parkingsController.getParkings);
router.get('/active', parkingsController.getActiveParkings);
router.get('/search', parkingsController.searchParkings);
// Must stay last: ':id' matches any word, so it would catch "active" and "search".
router.get('/:id', parkingsController.getParkingById);

router.post('/', parkingsController.addParking);
router.put('/:id', parkingsController.updateParking);
router.delete('/:id', parkingsController.deleteParking);

module.exports = router;
