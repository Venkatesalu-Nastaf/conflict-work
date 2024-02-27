const express = require('express');
const router = express.Router();
const db = require('../../../../db');

router.get('/organizationoptions', (req, res) => {
    db.query('SELECT DISTINCT customer FROM customers', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch bank names from MySQL' });
        }
        const organizations = rows.map((row) => row.customer);
        return res.status(200).json(organizations);
    });
});

router.get('/payment-details', (req, res) => {
    const { billingno, customer, fromDate, toDate } = req.query;
    let query = 'SELECT * FROM billing WHERE 1=1';
    let params = [];
    if (billingno) {
        query += ' AND billingno = ?';
        params.push(billingno);
    }
    if (customer) {
        query += ' AND customer = ?';
        params.push(customer);
    }
    if (fromDate && toDate) {
        query += ' AND Billingdate >= DATE_ADD(?, INTERVAL 0 DAY) AND Billingdate <= DATE_ADD(?, INTERVAL 1 DAY)';
        params.push(fromDate);
        params.push(toDate);
    }
    db.query(query, params, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
        }
        return res.status(200).json(result);
    });
});

//totalamount of billing
router.get('/totalAmount_from_billing', (req, res) => {
    const query = 'SELECT SUM(Totalamount) AS total FROM billing';

    db.query(query, (err, result) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            const totalAmount = result[0].total || 0;
            res.json({ totalAmount });
        }
    });
});

module.exports = router;