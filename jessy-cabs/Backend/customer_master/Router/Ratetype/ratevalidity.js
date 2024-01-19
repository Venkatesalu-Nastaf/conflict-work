const express = require('express');
const router = express.Router();
const db = require('../../../db');

// Add RateValidity database
router.post('/ratevalidity', (req, res) => {
    const bookData = req.body;
    db.query('INSERT INTO ratevalidity SET ?', bookData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to insert data into MySQL" });
        }
        return res.status(200).json({ message: "Data inserted successfully" });
    });
});
// delete RateValidity data
router.delete('/ratevalidity/:driverid', (req, res) => {
    const driverid = req.params.driverid;
    db.query('DELETE FROM ratevalidity WHERE driverid = ?', driverid, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to delete data from MySQL" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Customer not found" });
        }
        return res.status(200).json({ message: "Data deleted successfully" });
    });
});
// update RateValidity details
router.put('/ratevalidity/:driverid', (req, res) => {
    const driverid = req.params.driverid;
    const updatedCustomerData = req.body;
    db.query('UPDATE ratevalidity SET ? WHERE driverid = ?', [updatedCustomerData, driverid], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to update data in MySQL" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Customer not found" });
        }
        return res.status(200).json({ message: "Data updated successfully" });
    });
});
// collect data for RateValidity table
router.get('/ratevalidity', (req, res) => {
    db.query('SELECT * FROM ratevalidity', (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch data from MySQL" });
        }
        return res.status(200).json(results);
    });
});
// End RateValidity database

module.exports = router;