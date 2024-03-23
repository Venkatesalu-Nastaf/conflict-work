const express = require('express');
const router = express.Router();
const db = require('../../../db');

// Supplier Master Database:
// account_info database:-
// Add account_info database
router.post('/accountinfo', (req, res) => {
    const bookData = req.body;
    db.query('INSERT INTO accountinfo SET ?', bookData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to insert data into MySQL" });
        }
        return res.status(200).json({ message: "Data inserted successfully" });
    });
});
// delete account_info database
router.delete('/accountinfo/:accountNo', (req, res) => {
    const accountNo = req.params.accountNo;
    db.query('DELETE FROM accountinfo WHERE accountNo = ?', accountNo, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to delete data from MySQL" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Customer not found" });
        }
        return res.status(200).json({ message: "Data deleted successfully" });
    });
});
// update account_info database
router.put('/accountinfo/:accountNo', (req, res) => {
    const accountNo = req.params.accountNo;
    const updatedCustomerData = req.body;
    // Update the customer data in the database
    db.query('UPDATE accountinfo SET ? WHERE accountNo = ?', [updatedCustomerData, accountNo], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to update data in MySQL" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Customer not found" });
        }
        return res.status(200).json({ message: "Data updated successfully" });
    });
});
// collect data for account_info
router.get('/accountinfo', (req, res) => {
    db.query('SELECT * FROM accountinfo', (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch data from MySQL" });
        }
        return res.status(200).json(results);
    });
});
// End account_info database

module.exports = router;