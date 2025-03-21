const express = require('express');
const router = express.Router();
const db = require('../../../db')

// router.post('/getPendingBills', (req, res) => {
//     const { customerData } = req.body;
//     const { fromDate, toDate, CustomerName } = customerData;
//     const AllpendingSQLQuery = `SELECT * FROM BillWiseReceipt WHERE BillDate BETWEEN ? AND ? AND TotalBalance != 0 `;
//     db.query(
//         "SELECT * FROM BillWiseReceipt WHERE CustomerName = ? AND BillDate BETWEEN ? AND ? AND TotalBalance != 0",
//         [CustomerName, fromDate, toDate],
//         (error, result) => {
//             if (error) {
//                 console.log(error, "error");
//                 return res.status(500).json({ error: 'Database query error' });
//             }
//             return res.status(200).json(result);
//         }
//     );
// });

router.post('/getPendingBills', (req, res) => {
    const { customerData } = req.body;
    const { fromDate, toDate, CustomerName } = customerData;

    let query;
    let params;

    if (CustomerName === "All") {
        // Fetch all records where TotalBalance is not 0 within the date range
        query = "SELECT * FROM BillWiseReceipt WHERE BillDate BETWEEN ? AND ? AND TotalBalance != 0";
        params = [fromDate, toDate];
    } else {
        // Filter by CustomerName where TotalBalance is not 0
        query = "SELECT * FROM BillWiseReceipt WHERE CustomerName = ? AND BillDate BETWEEN ? AND ? AND TotalBalance != 0";
        params = [CustomerName, fromDate, toDate];
    }

    db.query(query, params, (error, result) => {
        if (error) {
            console.log(error, "error");
            return res.status(500).json({ error: 'Database query error' });
        }
        return res.status(200).json(result);
    });
});


router.post('/getAllBills', (req, res) => {
    const { customerData } = req.body;
    const { fromDate, toDate, CustomerName } = customerData;

    let query;
    let params;

    if (CustomerName === "All") {
        // Fetch all records without filtering by CustomerName
        query = "SELECT * FROM BillWiseReceipt WHERE BillDate BETWEEN ? AND ?";
        params = [fromDate, toDate];
    } else {
        // Filter by CustomerName
        query = "SELECT * FROM BillWiseReceipt WHERE CustomerName = ? AND BillDate BETWEEN ? AND ?";
        params = [CustomerName, fromDate, toDate];
    }

    db.query(query, params, (error, result) => {
        if (error) {
            console.log(error, "error");
            return res.status(500).json({ error: 'Database query error' });
        }
        return res.status(200).json(result);
    });
});



// router.post('/getAllBills', (req, res) => {
//     const { customerData } = req.body;
//     const { fromDate, toDate, CustomerName } = customerData;
//     const AllSQLQuery = `SELECT * FROM BillWiseReceipt WHERE BillDate BETWEEN ? AND ?`;
//     db.query(
//         "SELECT * FROM BillWiseReceipt WHERE CustomerName = ? AND BillDate BETWEEN ? AND ?",
//         [CustomerName, fromDate, toDate],
//         (error, result) => {
//             if (error) {
//                 console.log(error, "error");
//                 return res.status(500).json({ error: 'Database query error' });
//             }
//             return res.status(200).json(result);
//         }
//     );
// })



module.exports = router;
