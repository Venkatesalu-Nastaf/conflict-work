const express = require('express');
const router = express.Router();
const db = require('../../../db');


router.get('/payment-details', (req, res) => {
    const { customer, fromDate, toDate } = req.query;

    // Your MySQL query
    const sql = `
      SELECT
        customer,
        COUNT(tripid) as trip_count,
        MAX(from_date) as startdate,
        MAX(to_date) as startdate
      FROM
        tripsheet
      WHERE
        customer = ?
        AND startdate BETWEEN ? AND ?
      GROUP BY
        customer;
    `;

    const values = [customer, fromDate, toDate];

    pool.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

module.exports = router;