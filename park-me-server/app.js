const express = require('express');
const spotsRouter = require('./routes/spots');
const parkingsRouter = require('./routes/parkings');

const app = express();
const PORT = process.env.PORT || 3000;

// Don't tell attackers which framework we run (removes the "X-Powered-By: Express" header).
app.disable('x-powered-by');

// GET / - welcome message and a list of the routes
app.get('/', (req, res) => {
  res.json({
    project: 'PARK ME - חונים במכללה',
    description: 'Shows students which spots in the college parking lot are free, so they can park quickly and get to class on time.',
    routes: [
      'GET /api/spots',
      'GET /api/spots/summary',
      'GET /api/parkings',
      'GET /api/parkings/active',
    ],
  });
});

app.use('/api/spots', spotsRouter);
app.use('/api/parkings', parkingsRouter);

// Registered last: it only runs when no route above matched the URL.
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.path });
});

app.listen(PORT, () => {
  console.log(`PARK ME server is running on http://localhost:${PORT}`);
});
