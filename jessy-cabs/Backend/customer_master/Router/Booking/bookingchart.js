const express = require('express');
const router = express.Router();
const db = require('../../../db');

// booking CHART data collect
router.get('/booking', (req, res) => {
    const { fromDate, toDate } = req.query;
    const query = `
      SELECT vehiclemodule, COUNT(*) AS count
      FROM booking
      WHERE bookingdate BETWEEN ? AND ?
      GROUP BY vehiclemodule
    `;
    const values = [fromDate, toDate];
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error establishing database connection:', err);
            res.status(500).json({ error: 'Failed to connect to the database' });
            return;
        }
        connection.query(query, values, (err, results) => {
            connection.release(); // Release the connection back to the pool
            if (err) {
                console.error('Error executing SQL query:', err);
                res.status(500).json({ error: 'Failed to retrieve booking data' });
                return;
            }
            res.json(results); // Send the booking data as JSON response
        });
    });
});
// End booking CHART database

module.exports = router;
