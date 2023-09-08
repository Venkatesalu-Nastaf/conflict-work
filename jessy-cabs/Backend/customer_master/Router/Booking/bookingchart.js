const express = require('express');
const router = express.Router();
const db = require('../../../db');

// booking CHART data collect
router.get('/booking', (req, res) => {
    const { fromDate, toDate } = req.query;
    const query = `
      SELECT vehType, COUNT(*) AS count
      FROM booking
      WHERE bookingdate BETWEEN ? AND ?
      GROUP BY vehType
    `;
    const values = [fromDate, toDate];
    db.getConnection((err, connection) => {
        if (err) {
            console.error('Error establishing database connection:', err);
            res.status(500).json({ error: 'Failed to connect to the database' });
            return;
        }
        console.log('Database connection established.');

        connection.query(query, values, (err, results) => {
            console.log('Query executed.');

            connection.release();
            if (err) {
                console.error('Error executing SQL query:', err);
                res.status(500).json({ error: 'Failed to retrieve booking data' });
                return;
            }
            res.json(results);
        });
    });
});

// End booking CHART database
module.exports = router; // Place module.exports here
