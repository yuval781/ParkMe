const express = require('express');
const parkings = require('../data/parkings');

const router = express.Router();

// GET /api/parkings - all parking records (finished and active)
router.get('/', (req, res) => {
  res.json(parkings);
});

// GET /api/parkings/active - cars that are still in the lot (no exit time yet)
router.get('/active', (req, res) => {
  const active = parkings.filter((parking) => parking.exitTime === null);
  res.json(active);
});

module.exports = router;
