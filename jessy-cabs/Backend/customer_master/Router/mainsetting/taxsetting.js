const express = require('express');
const router = express.Router();
const db = require('../../../db');

// Add taxsettings database
router.post('/taxsettings', (req, res) => {
    const bookData = req.body;
    db.query('INSERT INTO taxsettings SET ?', bookData, (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            return res.status(500).json({ error: "Failed to insert data into MySQL" });
        }
        console.log('Data inserted into MySQL');
        return res.status(200).json({ message: "Data inserted successfully" });
    });
});
// delete taxsettings data
router.delete('/taxsettings/:id', (req, res) => {
    const id = req.params.id;
    console.log('Customer ID:', id); // Log the customer ID
    console.log('DELETE query:', 'DELETE FROM taxsettings WHERE id = ?', id);
    db.query('DELETE FROM taxsettings WHERE id = ?', id, (err, result) => {
        if (err) {
            console.error('Error deleting data from MySQL:', err);
            return res.status(500).json({ error: "Failed to delete data from MySQL" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Customer not found" });
        }
        console.log('Data deleted from MySQL');
        return res.status(200).json({ message: "Data deleted successfully" });
    });
});
// update taxsettings details
router.put('/taxsettings/:id', (req, res) => {
    const id = req.params.id;
    const updatedCustomerData = req.body;
    console.log('Customer ID:', id); // Log the customer ID
    console.log('Updated customer data:', updatedCustomerData);
    db.query('UPDATE taxsettings SET ? WHERE id = ?', [updatedCustomerData, id], (err, result) => {
        if (err) {
            console.error('Error updating data in MySQL:', err);
            return res.status(500).json({ error: "Failed to update data in MySQL" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Customer not found" });
        }
        console.log('Data updated in MySQL');
        return res.status(200).json({ message: "Data updated successfully" });
    });
});
// collect data for taxsettings table
router.get('/taxsettings', (req, res) => {
    db.query('SELECT * FROM taxsettings', (err, results) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            return res.status(500).json({ error: "Failed to fetch data from MySQL" });
        }
        return res.status(200).json(results);
    });
});
// End Customer Master database

module.exports = router;
