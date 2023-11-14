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

// router.get('/payment-details', (req, res) => {
//     const { organization, fromDate, toDate } = req.query;

//     let query = 'SELECT * FROM billing';
//     let params = [];

//     if (organization) {
//         query += ' AND customer = ?';
//         params.push(organization);
//     }

//     if (fromDate && toDate) {
//         query += ' AND Billingdate >= ? AND Billingdate <= DATE_ADD(?, INTERVAL 1 DAY)';
//         params.push(fromDate);
//         params.push(toDate);
//     }

//     db.query(query, params, (err, result) => {
//         if (err) {
//             console.error('Error retrieving booking details from MySQL:', err);
//             return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
//         }
//         return res.status(200).json(result);
//     });
// });

// router.get('/payment-details', (req, res) => {
//     const { billingno, customer, fromDate, toDate } = req.query;
//     console.log('Query parameters:', billingno, customer, fromDate, toDate);
//     // const query = `SELECT * FROM billing WHERE billingno=? AND customer = ? AND Billingdate >= ? AND Billingdate <= ? AND Billingdate = ?`;
//     const query = `
//     SELECT *
//     FROM billing
//     WHERE billingno = ? 
//     AND customer = ? 
//     AND Billingdate >= ? 
//     AND Billingdate <= ?;
// `;
//     db.query(query, [billingno, customer, fromDate, toDate], (err, results) => {
//         if (err) {
//             console.error('Database query error: ', err);
//             res.status(500).json({ error: 'Error fetching data' });
//             return;
//         }
//         console.log('collected billing', results);
//         res.json(results);
//     }
//     );
// });

router.get('/payment-details', (req, res) => {
    const { billingno, customer, fromDate, toDate } = req.query;
    // Query and parameters for fetching booking details based on the query parameters
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
        query += ' AND Billingdate BETWEEN ? AND ?';
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


router.get('/totalAmount_from_billing', (req, res) => {
    const query = 'SELECT SUM(Totalamount) AS total FROM billing';
    // console.log('query from payment', query);

    db.query(query, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
        } else {
            const totalAmount = result[0].total || 0;
            console.log('total amount', totalAmount);
            res.json({ totalAmount });
        }
    });
});

module.exports = router;