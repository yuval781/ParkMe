const express = require('express');
const spotsController = require('../controllers/spots');

const router = express.Router();

router.get('/', spotsController.getSpots);
router.get('/summary', spotsController.getSummary);
router.get('/search', spotsController.searchSpots);
// Must stay last: ':id' matches any word, so it would catch "summary" and "search".
router.get('/:id', spotsController.getSpotById);

router.post('/', spotsController.addSpot);
router.put('/:id', spotsController.updateSpot);
router.delete('/:id', spotsController.deleteSpot);

module.exports = router;
