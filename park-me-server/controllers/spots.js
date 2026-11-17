const spots = require('../data/spots');

// GET /api/spots - all 200 spots
exports.getSpots = (req, res) => {
  res.json(spots);
};

// GET /api/spots/summary - counts computed from the spots array,
// so the summary can never disagree with the list.
exports.getSummary = (req, res) => {
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
};

// GET /api/spots/search?status=free&type=ev&row=J
// Each filter is optional, so the map's filter chips can combine them.
exports.searchSpots = (req, res) => {
  const status = req.query.status;
  const type = req.query.type;
  const row = req.query.row;

  let result = spots;

  if (status) {
    result = result.filter((spot) => spot.status === status);
  }
  if (type) {
    result = result.filter((spot) => spot.type === type);
  }
  if (row) {
    result = result.filter((spot) => spot.row === row);
  }

  res.json(result);
};

// GET /api/spots/:id - one spot, e.g. /api/spots/C-14
// No Number() here: our spot ids are strings like "C-14".
exports.getSpotById = (req, res) => {
  const id = req.params.id;
  const spot = spots.find((s) => s.id === id);

  if (!spot) {
    return res.status(404).json({ error: 'Spot not found', id: id });
  }
  res.json(spot);
};

// POST /api/spots - add a spot (e.g. the lot is expanded).
// Placeholder until POST and a database are taught: returns all spots.
exports.addSpot = (req, res) => {
  res.json(spots);
};

// PUT /api/spots/:id - change a spot's status, e.g. mark it "reported".
// Placeholder: returns all spots.
exports.updateSpot = (req, res) => {
  res.json(spots);
};

// DELETE /api/spots/:id - remove a spot (e.g. closed for maintenance).
// Placeholder: returns all spots.
exports.deleteSpot = (req, res) => {
  res.json(spots);
};
