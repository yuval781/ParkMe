const parkings = require('../data/parkings');

// GET /api/parkings - all parking records (finished and active)
exports.getParkings = (req, res) => {
  res.json(parkings);
};

// GET /api/parkings/active - cars that are still in the lot (no exit time yet)
exports.getActiveParkings = (req, res) => {
  const active = parkings.filter((parking) => parking.exitTime === null);
  res.json(active);
};

// GET /api/parkings/search?plate=12-345-67&spotId=C-14
// plate finds the owner of a blocking car; spotId shows who parked in a spot.
exports.searchParkings = (req, res) => {
  const plate = req.query.plate;
  const spotId = req.query.spotId;

  let result = parkings;

  if (plate) {
    result = result.filter((parking) => parking.plate === plate);
  }
  if (spotId) {
    result = result.filter((parking) => parking.spotId === spotId);
  }

  res.json(result);
};

// GET /api/parkings/:id - one parking record, e.g. /api/parkings/4
// Number() is needed: URL params arrive as strings, but our parking ids are numbers.
exports.getParkingById = (req, res) => {
  const id = Number(req.params.id);
  const parking = parkings.find((p) => p.id === id);

  if (!parking) {
    return res.status(404).json({ error: 'Parking not found', id: req.params.id });
  }
  res.json(parking);
};

// POST /api/parkings - check-in (the 10-field form).
// Placeholder until POST and a database are taught: returns all records.
exports.addParking = (req, res) => {
  res.json(parkings);
};

// PUT /api/parkings/:id - check-out (fill exitTime) or extend expectedExit.
// Placeholder: returns all records.
exports.updateParking = (req, res) => {
  res.json(parkings);
};

// DELETE /api/parkings/:id - cancel a check-in made by mistake.
// Placeholder: returns all records.
exports.deleteParking = (req, res) => {
  res.json(parkings);
};
