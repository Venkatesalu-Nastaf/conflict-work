const express = require('express');
const router = express.Router();
const db = require('../../../db');

// Add Rate Management database
router.post('/ratemanagement', (req, res) => {
    const bookData = req.body;
    db.query('INSERT INTO ratemanagement SET ?', bookData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to insert data into MySQL" });
        }
        return res.status(200).json({ message: "Data inserted successfully" });
    });
});
// delete Rate Management data
router.delete('/ratemanagement/:id', (req, res) => {
    const customerid = req.params.id;
    db.query('DELETE FROM ratemanagement WHERE id = ?', customerid, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to delete data from MySQL" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Customer not found" });
        }
        return res.status(200).json({ message: "Data deleted successfully" });
    });
});
// update Rate Management details
router.put('/ratemanagement/:id', (req, res) => {
    const customerId = req.params.id;
    const updatedCustomerData = req.body;
    db.query('UPDATE ratemanagement SET ? WHERE id = ?', [updatedCustomerData, customerId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to update data in MySQL" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Customer not found" });
        }
        return res.status(200).json({ message: "Data updated successfully" });
    });
});
// collect data for Rate Management table
router.get('/ratemanagement', (req, res) => {
    db.query('SELECT * FROM ratemanagement', (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch data from MySQL" });
        }
        return res.status(200).json(results);
    });
});

module.exports = router;