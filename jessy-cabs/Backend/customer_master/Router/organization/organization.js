const express = require('express');
const router = express.Router();
const db = require('../../../db');


// Add Customer Master database
router.post('/addcompany', (req, res) => {
    const organizationData = req.body;
    db.query('INSERT INTO organizationdetails SET ?', organizationData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to insert data into MySQL' });
        }
        return res.status(200).json({ message: 'Data inserted successfully' });
    });
});
//for get company details
router.get('/organizationdata/:organizationname', (req, res) => {
    const organizationname = req.params.organizationname;

    db.query('SELECT * FROM organizationdetails WHERE organizationname = ?', organizationname, (err, result) => {
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


router.put('/companyupdate/:organizationname', (req, res) => {
    const organizationname = req.params.organizationname;
    const updatedCustomerData = req.body;
    db.query('UPDATE organizationdetails SET ? WHERE organizationname = ?', [updatedCustomerData, organizationname], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to update data in MySQL" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Customer not found" });
        }
        return res.status(200).json({ message: "Data updated successfully" });
    });
});


module.exports = router;