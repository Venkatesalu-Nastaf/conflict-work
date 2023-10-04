const express = require('express');
const router = express.Router();
const db = require('../../../db'); // Import your MySQL connection

// booking CHART data collect
router.get('/bookingchart', (req, res) => {
    const { fromDate, toDate } = req.query;
    const query = `
      SELECT vehType, COUNT(*) AS count
      FROM booking
      WHERE bookingdate BETWEEN ? AND ?
      GROUP BY vehType
    `;
    const values = [fromDate, toDate];

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error executing SQL query:', err);
            res.status(500).json({ error: 'Failed to retrieve booking data' });
            return;
        }
        res.json(results);
    });
});

module.exports = router;
