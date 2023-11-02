const express = require('express');
const router = express.Router();
const db = require('../../../../db');

router.post('/bankdetails', (req, res) => {
    const customerData = req.body;
    db.query('INSERT INTO bankaccountdetails SET ?', customerData, (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            return res.status(500).json({ error: 'Failed to insert data into MySQL' });
        }
        console.log('Data inserted into MySQL');
        return res.status(200).json({ message: 'Data inserted successfully' });
    });
});

router.get('/getbankdetails', (req, res) => {
    db.query('SELECT * FROM bankaccountdetails', (err, rows) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
        }
        console.log('Data fetched from MySQL');
        return res.status(200).json(rows);
    });
});

router.get('/bankoptions', (req, res) => {
    db.query('SELECT DISTINCT bankname FROM bankaccountdetails', (err, rows) => {
        if (err) {
            console.error('Error fetching bank names from MySQL:', err);
            return res.status(500).json({ error: 'Failed to fetch bank names from MySQL' });
        }
        const bankNames = rows.map((row) => row.bankname); // Corrected column name
        console.log(bankNames);
        return res.status(200).json(bankNames);
    });
});

module.exports = router;