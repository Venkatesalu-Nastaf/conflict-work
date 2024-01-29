const express = require('express');
const router = express.Router();
const db = require('../../../db');

// Add Customer Master database
router.post('/employees', (req, res) => {
    const customerData = req.body;
    db.query('INSERT INTO employees SET ?', customerData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to insert data into MySQL' });
        }
        return res.status(200).json({ message: 'Data inserted successfully' });
    });
});

// Delete Customer Master data
router.delete('/employees/:empid', (req, res) => {
    const empid = req.params.empid;
    db.query('DELETE FROM employees WHERE empid = ?', empid, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete data from MySQL' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        return res.status(200).json({ message: 'Data deleted successfully' });
    });
});

// Update Customer Master details
router.put('/employees/:empid', (req, res) => {
    const empid = req.params.empid;
    const updatedCustomerData = req.body;
    db.query('UPDATE employees SET ? WHERE empid = ?', [updatedCustomerData, empid], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update data in MySQL' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        return res.status(200).json({ message: 'Data updated successfully' });
    });
});

// Collect data for Customer Master table
router.get('/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
        }
        return res.status(200).json(results);
    });
});

//for user profile information
router.get('/userdataforuserinfo/:userid', (req, res) => {
    const userid = req.params.userid;

    db.query('SELECT * FROM usercreation WHERE userid = ?', userid, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Route data not found' });
        }

        const routeData = result;
        return res.status(200).json(routeData);
    });
});

router.get('/table-for-employee', (req, res) => {
    const { searchText } = req.query;
    let query = 'SELECT * FROM employees WHERE 1=1';
    let params = [];

    if (searchText) {
        const columnsToSearch = [
            'empid',
            'empname',
            'empemailid',
            'empmobile',
            'jobroll',
            'joiningdate',
            'gender',
            'bloodgroup',
            'address1',
            'aadharcard',
            'pancard',
            'address2',
            'guardian',
            'fixedsalary',
            'uanid',
            'esino',
            'licenceno',

        ];

        const likeConditions = columnsToSearch.map(column => `${column} LIKE ?`).join(' OR ');

        query += ` AND (${likeConditions})`;
        params = columnsToSearch.map(() => `%${searchText}%`);
    }

    db.query(query, params, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve vehicle details from MySQL' });
        }
        return res.status(200).json(result);
    });
});

module.exports = router;