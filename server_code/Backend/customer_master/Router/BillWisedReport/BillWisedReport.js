const express = require('express');
const router = express.Router();
const db = require('../../../db');

router.get('/customerBilledDetails', (req, res) => {
    const { customer } = req.query;

    const individualBillingPromise = new Promise((resolve, reject) => {
        db.query("SELECT * FROM Individual_Billing WHERE Customer = ?", [customer], (error, result) => {
            if (error) {
                return reject('Error fetching individual billing details');
            }
            resolve(result);
        });
    });

    const groupBillingPromise = new Promise((resolve, reject) => {
        db.query("SELECT * FROM Group_billing WHERE Customer = ?", [customer], (error, result) => {
            if (error) {
                return reject('Error fetching group billing details');
            }
            resolve(result);
        });
    });

    const transferListPromise = new Promise((resolve, reject) => {
        db.query("SELECT * FROM Transfer_list WHERE Organization_name = ?", [customer], (error, result) => {
            if (error) {
                return reject('Error fetching transfer list details');
            }
            resolve(result);
        });
    });

    Promise.all([individualBillingPromise, groupBillingPromise, transferListPromise])
        .then(([individualBilling, groupBilling, transferListBilling]) => {
            res.status(200).json({
                individualBilling,
                groupBilling,
                transferListBilling
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error });
        });
});

// get Trip Advance || Received Amount
router.get('/getTripAdvance', (req, res) => {
    const { Tripid } = req.query;
    const tripidArray = Array.isArray(Tripid) ? Tripid.map(Number) : [Number(Tripid)];
    db.query("SELECT tripid,customeradvance FROM tripsheet WHERE tripid IN (?)", [tripidArray], (error, result) => {
        if (error) {
            console.log(error, 'error');
            return res.status(500).json({ error: 'Database query error' });
        }
        return res.status(200).json(result);
    });

})

router.post('/addBillAmountReceived', (req, res) => {
    const totalBillReport = req.body;

    const timestamp = Date.now();
    const uniqueId = timestamp % 1000000;
    const formattedUniqueId = uniqueId.toString().padStart(6, '0');

    totalBillReport.uniqueid = formattedUniqueId;

    db.query("INSERT INTO BillWiseReceipt SET ?", [totalBillReport], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Failed to insert data into MySQL' });
        }
        return res.status(201).json({ message: 'Data inserted successfully', success: true });
    });
});

router.delete('/deleteBillWiseReport', (req, res) => {
    const { BillNo } = req.body; // Assumes BillNo is an array

    if (!Array.isArray(BillNo) || BillNo.length === 0) {
        return res.status(400).json({ error: 'BillNo must be a non-empty array' });
    }

    // Construct placeholders for the array
    const placeholders = BillNo.map(() => '?').join(',');

    // Perform delete operations for each table
    const deleteQueries = [
        "DELETE FROM Transfer_list WHERE Invoice_no IN (" + placeholders + ")",
        "DELETE FROM Group_billing WHERE InvoiceNo IN (" + placeholders + ")",
        "DELETE FROM Individual_Billing WHERE Invoice_No IN (" + placeholders + ")"
    ];

    const deletePromises = deleteQueries.map(query => {
        return new Promise((resolve, reject) => {
            db.query(query, BillNo, (err, result) => {
                if (err) {
                    return reject({ error: 'Failed to delete data from MySQL' });
                }
                if (result.affectedRows === 0) {
                    return resolve({ message: 'No records deleted' });
                }
                resolve({ message: 'Data deleted successfully' });
            });
        });
    });

    Promise.all(deletePromises)
        .then(results => res.status(200).json({ messages: results }))
        .catch(error => res.status(500).json(error));
});


module.exports = router;
