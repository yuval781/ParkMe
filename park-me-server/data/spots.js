// All 200 parking spots, as they look at 08:15.
// Built with a loop from fixed lists (no Math.random), so the data is the same on every run
// and matches the numbers in our wireframes.

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const SPOTS_PER_ROW = 20;

// The 23 free spots at 08:15 (per row: A1 B0 C3 D2 E4 F1 G3 H2 I4 J3).
const FREE_SPOTS = [
  'A-06',
  'C-03', 'C-11', 'C-17',
  'D-06', 'D-19',
  'E-02', 'E-08', 'E-13', 'E-20',
  'F-10',
  'G-04', 'G-09', 'G-16',
  'H-07', 'H-18',
  'I-01', 'I-05', 'I-12', 'I-15',
  'J-03', 'J-05', 'J-07',
];

// Spots that students reported as a problem (for example, a car blocking the spot).
const REPORTED_SPOTS = ['D-15', 'H-03'];

function getType(row, number) {
  if (row === 'A' && number <= 8) return 'accessible';
  if (row === 'B' && number <= 10) return 'staff';
  if (row === 'J' && number <= 10) return 'ev';
  return 'regular';
}

function getStatus(id, type) {
  // Staff spots are always reserved, whoever is parked there.
  if (type === 'staff') return 'reserved';
  if (FREE_SPOTS.includes(id)) return 'free';
  if (REPORTED_SPOTS.includes(id)) return 'reported';
  return 'occupied';
}

const spots = [];

for (const row of ROWS) {
  for (let number = 1; number <= SPOTS_PER_ROW; number++) {
    // padStart turns 7 into "07", so ids look like "C-07".
    const id = row + '-' + String(number).padStart(2, '0');
    const type = getType(row, number);
    spots.push({ id, row, number, type, status: getStatus(id, type) });
  }
}

module.exports = spots;
