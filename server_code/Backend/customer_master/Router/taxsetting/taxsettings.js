const express = require('express');
const router = express.Router();
const db = require('../../../db');

// Add Billing database
router.post('/taxsetting', (req, res) => {
    const customerData = req.body;
    db.query('INSERT INTO taxsettings SET ?', customerData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to insert data into MySQL' });
        }
        return res.status(200).json({ message: 'Data inserted successfully' });
    });
});

router.delete('/taxsetting/:STax', (req, res) => {
    const STax = req.params.STax;
    db.query('DELETE FROM taxsettings WHERE STax = ?', STax, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete data from MySQL' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        return res.status(200).json({ message: 'Data deleted successfully' });
    });
});

// update Billing details

router.put('/taxsetting/:STax', (req, res) => {
    const STax = req.params.STax;
    const updatedCustomerData = req.body;
    db.query('UPDATE taxsettings SET ? WHERE STax = ?', [updatedCustomerData, STax], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update data in MySQL' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        return res.status(200).json({ message: 'Data updated successfully' });
    });
});

// collect data for Billing table
router.get('/taxsetting', (req, res) => {
    db.query('SELECT * FROM taxsettings', (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch data from MySQL" });
        }
        return res.status(200).json(results);
    });
});


module.exports = router;