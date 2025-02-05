const express = require('express');
const router = express.Router();
const moment = require('moment'); // or import dayjs from 'dayjs';
const db = require('../../../db');

// Supplier Master Database:
// Add account_info database
router.post('/accountinfo', (req, res) => {
    const bookData = req.body;
    console.log(bookData, "kk");
    db.query('INSERT INTO accountinfo SET ?', bookData, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Failed to insert data into MySQL" });
        }
        return res.status(200).json({ message: "Data inserted successfully" });
    });
});

// Delete account_info database
router.delete('/accountinfo/:accountNo', (req, res) => {
    const accountNo = req.params.accountNo;
    db.query('DELETE FROM accountinfo WHERE accountNo = ?', [accountNo], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to delete data from MySQL" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Customer not found" });
        }
        return res.status(200).json({ message: "Data deleted successfully" });
    });
});

// Update account_info database
router.put('/accountinfo/:accountNo', (req, res) => {
    const accountNo = req.params.accountNo;
    const updatedCustomerData = req.body;
    console.log(accountNo, updatedCustomerData);
    db.query('UPDATE accountinfo SET ? WHERE accountNo = ?', [updatedCustomerData, accountNo], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Failed to update data in MySQL" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Customer not found" });
        }
        return res.status(200).json({ message: "Data updated successfully" });
    });
});

// Search vehicle info
router.get('/searchAccountinginfo', (req, res) => {
    const { searchText, fromDate, toDate } = req.query; // Extract searchText, fromDate, and toDate from the query
    let query = 'SELECT * FROM accountinfo WHERE 1=1'; // Base query
    let params = [];

    // Filter by search text
    if (searchText) {
        const columnsToSearch = [
            'Accdate',
            'travelsname',
            'address1',
            'cperson',
            'travelsemail',
            'phone',
            'rateType',
            'underGroup',
            'entity',
            'acType',
            'vehicleInfo',
            'vehRegno',
            'driverName',
            'TimeToggle'
        ];

        if (searchText.length === 4 && /^\d{4}$/.test(searchText)) {
            // If searchText is 4 digits, search for vehRegno ending with those 4 digits
            query += ' AND vehRegno LIKE ?';
            params.push(`%${searchText}`);
        } else {
            // Otherwise, search across all columns
            const likeConditions = columnsToSearch.map(column => `${column} LIKE ?`).join(' OR ');
            query += ` AND (${likeConditions})`;
            params = [...params, ...columnsToSearch.map(() => `${searchText}%`)];
        }
    }

    // Filter by date range (Accdate) if both fromDate and toDate are provided
    if (fromDate && toDate) {
        const formattedFromDate = moment(fromDate).format('YYYY-MM-DD');
        const formattedToDate = moment(toDate).format('YYYY-MM-DD');
        query += ' AND Accdate >= DATE_ADD(?, INTERVAL 0 DAY) AND Accdate <= DATE_ADD(?, INTERVAL 1 DAY)';
        params.push(formattedFromDate, formattedToDate);
    }

    // Execute the query
    db.query(query, params, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Database query failed" });
        }
        console.log(result, 'resultData'); // Debugging
        return res.json(result);
    });
});



// Collect data for account_info
router.get('/accountinfo', (req, res) => {
    db.query('SELECT * FROM accountinfo', (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch data from MySQL" });
        }
        return res.status(200).json(results);
    });
});


router.get('/AccountinfoTimetOOGLE/:travelsname', (req, res) => {
    const {travelsname}=req.params;
    // console.log(travelsname,"llllll")
    db.query('SELECT TimeToggle,rateType FROM accountinfo WHERE travelsname = ?',[travelsname], (err, results) => {
        if (err) {
            // console.log(err,"kk")
            return res.status(500).json({ error: "Failed to fetch data from MySQL" });
        }
        // console.log(results, "hhh");
        return res.status(200).json(results);
    });
});

router.get('/Accountinfosupplierdata/:travelsname', (req, res) => {
    const {travelsname}=req.params;
    // console.log(travelsname,"llllll")
    db.query('SELECT rateType FROM accountinfo WHERE travelsname = ?',[travelsname], (err, results) => {
        if (err) {
            // console.log(err,"kk")
            return res.status(500).json({ error: "Failed to fetch data from MySQL" });
        }
        // console.log(results, "hhh");
        return res.status(200).json(results);
    });
});



// Fetch rate management supplier data
router.get('/ratemanagmentSupplierdata', (req, res) => {
    db.query('SELECT ratename FROM ratetype WHERE ratetype="Supplier"', (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch data from MySQL" });
        }
        console.log(results, "hhh");
        return res.status(200).json(results);
    });
});

// Fetch vehicle info
router.get('/accountinfodatavehcile', (req, res) => {
    db.query('SELECT * FROM vehicleinfo', (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch data from MySQL" });
        }
        console.log(results, "hhh");
        return res.status(200).json(results);
    });
});

// Get unique account travel data by travels name
router.get('/getuniqueacccounttaveldata/:travelsname', (req, res) => {
    const customer = req.params.travelsname;
    console.log(customer, "params");
    db.query('SELECT travelsname FROM accountinfo WHERE travelsname = ?', [customer], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
        }
        console.log(results.length);
        return res.status(200).json(results);
    });
});

module.exports = router;
