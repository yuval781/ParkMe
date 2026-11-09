const express = require('express');
const spots = require('../data/spots');

const router = express.Router();

// GET /api/spots - all 200 spots
router.get('/', (req, res) => {
  res.json(spots);
});

// GET /api/spots/summary - counts computed from the spots array,
// so the summary can never disagree with the list.
router.get('/summary', (req, res) => {
  const summary = {
    total: spots.length,
    free: 0,
    occupied: 0,
    reserved: 0,
    reported: 0,
    freeByRow: { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0, H: 0, I: 0, J: 0 },
    freeByType: { regular: 0, accessible: 0, staff: 0, ev: 0 },
  };

  for (const spot of spots) {
    summary[spot.status]++;

    if (spot.status === 'free') {
      summary.freeByRow[spot.row]++;
      summary.freeByType[spot.type]++;
    }
  }

  res.json(summary);
});

module.exports = router;
