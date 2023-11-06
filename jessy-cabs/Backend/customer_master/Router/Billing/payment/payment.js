const express = require('express');
const router = express.Router();
const db = require('../../../../db');

router.get('/organizationoptions', (req, res) => {
    db.query('SELECT DISTINCT customer FROM customers', (err, rows) => {
        if (err) {
            console.error('Error fetching bank names from MySQL:', err);
            return res.status(500).json({ error: 'Failed to fetch bank names from MySQL' });
        }
        const organizations = rows.map((row) => row.customer);
        console.log('organization name', organizations);
        return res.status(200).json(organizations);
    });
});

router.get('/payment-details', (req, res) => {
    const { organization, fromDate, toDate } = req.query;

    let query = 'SELECT * FROM billing';
    let params = [];

    if (organization) {
        query += ' AND customer = ?';
        params.push(organization);
    }

    if (fromDate && toDate) {
        query += ' AND Billingdate >= ? AND Billingdate <= DATE_ADD(?, INTERVAL 1 DAY)';
        params.push(fromDate);
        params.push(toDate);
    }

    db.query(query, params, (err, result) => {
        if (err) {
            console.error('Error retrieving booking details from MySQL:', err);
            return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
        }
        return res.status(200).json(result);
    });
});

module.exports = router;