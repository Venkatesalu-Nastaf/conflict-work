const express = require('express');
const router = express.Router();
const db = require('../../../db');

// Add driverbatarate database
router.post('/driverbatarate', (req, res) => {
    const bookData = req.body;
    db.query('INSERT INTO driverbatarate SET ?', bookData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to insert data into MySQL" });
        }
        return res.status(200).json({ message: "Data inserted successfully" });
    });
});
// delete division data
router.delete('/driverbatarate/:id', (req, res) => {
    const driverid = req.params.id;
    db.query('DELETE FROM driverbatarate WHERE id = ?', driverid, (err, result) => {
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
router.put('/driverbatarate/:id', (req, res) => {
    const driverid = req.params.id;
    const updatedCustomerData = req.body;
    db.query('UPDATE driverbatarate SET ? WHERE id = ?', [updatedCustomerData, driverid], (err, result) => {
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
router.get('/driverbatarate', (req, res) => {
    db.query('SELECT * FROM driverbatarate', (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch data from MySQL" });
        }
        return res.status(200).json(results);
    });
});

module.exports = router;