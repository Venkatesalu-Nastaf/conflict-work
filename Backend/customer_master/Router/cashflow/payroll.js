const express = require('express');
const router = express.Router();
const db = require('../../../db');

router.post('/payroll', (req, res) => {
    const bookData = req.body;
    db.query('INSERT INTO payroll SET ?', bookData, (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            return res.status(500).json({ error: "Failed to insert data into MySQL" });
        }
        console.log('Data inserted into MySQL');
        return res.status(200).json({ message: "Data inserted successfully" });
    });
});
// delete payroll data
router.delete('/payroll/:empid', (req, res) => {
    const empid = req.params.empid;
    db.query('DELETE FROM payroll WHERE empid = ?', empid, (err, result) => {
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
// update payroll details
router.put('/payroll/:empid', (req, res) => {
    const empid = req.params.empid;
    const updatedCustomerData = req.body;
    console.log('empid:', empid); // Log the pettycash
    console.log('Updated payroll data:', updatedCustomerData);
    db.query('UPDATE payroll SET ? WHERE empid = ?', [updatedCustomerData, voucherno], (err, result) => {
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
// Employee pay slip data collect:
router.get('/payroll', (req, res) => {
    const { empid, fromDate, toDate } = req.query;
    // Query and parameters for fetching booking details based on the query parameters
    let query = 'SELECT * FROM payroll WHERE 1=1';
    let params = [];
    if (empid) {
        query += ' AND empid = ?';
        params.push(empid);
    }

    if (fromDate && toDate) {
        query += ' AND salarydate BETWEEN ? AND ?';
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

module.exports = router;