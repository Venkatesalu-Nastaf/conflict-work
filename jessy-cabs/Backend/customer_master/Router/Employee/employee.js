const express = require('express');
const router = express.Router();
const db = require('../../../db');


// Add Employees database
router.post('/employees', (req, res) => {
    const bookData = req.body;
    db.query('INSERT INTO employees SET ?', bookData, (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            return res.status(500).json({ error: "Failed to insert data into MySQL" });
        }
        console.log('Data inserted into MySQL');
        return res.status(200).json({ message: "Data inserted successfully" });
    });
});
// delete Employees data
router.delete('/employees/:empid', (req, res) => {
    const empid = req.params.empid;
    console.log('empid:', empid); // Log the customer ID
    console.log('DELETE query:', 'DELETE FROM employees WHERE empid = ?', empid);
    db.query('DELETE FROM employees WHERE empid = ?', empid, (err, result) => {
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
// update Employees details
router.put('/employees/:empid', (req, res) => {
    const empid = req.params.empid;
    const updatedCustomerData = req.body;
    console.log('empid:', empid); // Log the customer ID
    console.log('Updated customer data:', updatedCustomerData);
    db.query('UPDATE employees SET ? WHERE empid = ?', [updatedCustomerData, empid], (err, result) => {
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
// collect data for Employees table
router.get('/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            return res.status(500).json({ error: "Failed to fetch data from MySQL" });
        }
        return res.status(200).json(results);
    });
});

module.exports = router;