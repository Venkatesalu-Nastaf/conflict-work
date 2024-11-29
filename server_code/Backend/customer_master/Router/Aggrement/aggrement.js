const express = require('express');
const router = express.Router();
const db = require('../../../db');
const multer = require('multer');
const path = require('path');
router.use(express.static('customer_master'));

// add Aggrement database

router.post('/agreementdatas', (req, res) => {
    const customerData = req.body;
    db.query('INSERT INTO Aggrement SET ?', customerData, (err, result) => {
        if (err) {
            console.log(err,'ghjjjj');
            
            return res.status(500).json({ error: 'Failed to insert data into MySQL' });
        }
        console.log(result,'yuiiiiiiiii');
        
        return res.status(200).json({ message: 'Data inserted successfully' });
    });
});

router.put('/agreementedit', (req, res) => {
    const empid = req.params.empid;
    const updatedCustomerData = req.body;
    db.query('UPDATE Aggrement SET ? WHERE empid = ?', [updatedCustomerData, empid], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update data in MySQL' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        return res.status(200).json({ message: 'Data updated successfully' });
    });
});

router.get('/agreementdata', (req, res) => {
    db.query('SELECT * FROM Aggrement', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
        }
        return res.status(200).json(results);
    });
});

module.exports = router;    