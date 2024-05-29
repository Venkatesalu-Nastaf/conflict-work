const express = require('express');
const router = express.Router();
const db = require('../../../../db');

router.post('/bankdetails', (req, res) => {
    const customerData = req.body;
    db.query('INSERT INTO bankaccountdetails SET ?', customerData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to insert data into MySQL' });
        }
        return res.status(200).json({ message: 'Data inserted successfully' });
    });
});

router.get('/getbankdetails', (req, res) => {
    db.query('SELECT * FROM bankaccountdetails', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
        }
        return res.status(200).json(rows);
    });
});

router.get('/bankoptions', (req, res) => {
    db.query('SELECT DISTINCT bankname2 FROM bankaccountdetails', (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch bank names from MySQL' });
        }
        const bankNames = rows.map((row) => row.bankname2); // Corrected column name
        return res.status(200).json(bankNames);
    });
});

router.put('/updatebankdetails/:id', (req, res) => {
    const driverid = req.params.id;
    const { bankname2, netbalance, totalin, totalout } = req.body;

    const query = 'UPDATE bankaccountdetails SET bankname2 = ?, netbalance = ?, totalin = ?, totalout = ? WHERE id = ?';
    db.query(query, [bankname2, netbalance, totalin, totalout, driverid], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error updating bank account' });
        } else {
            res.json({ message: 'Bank account updated successfully' });
        }
    });
});

//delete bank account
router.delete('/deletebankdetails/:id', (req, res) => {
    const idToDelete = req.params.id;
    console.log(idToDelete,"dd")
    const query = 'DELETE FROM bankaccountdetails WHERE id = ?';
    db.query(query, [idToDelete], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error deleting bank account' });
        } else {
            res.json({ message: 'Bank account deleted successfully' });
        }
    });
});

router.get('/totalCapital_from_billing', (req, res) => {
    const query = 'SELECT SUM(netbalance) AS total FROM bankaccountdetails';

    db.query(query, (err, result) => {
        if (err) {
            res.status(500).send('Internal Server Error');
        } else {
            console.log(result,"totalamount")
            const totalAmount = result[0].total || 0;
            res.json({ totalAmount });
        }
    });
});

module.exports = router;