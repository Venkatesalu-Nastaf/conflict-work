const express = require('express');
const router = express.Router();
const db = require('../../../db')

router.post('/getPendingBills', (req, res) => {
    const { customerData } = req.body;
    const { fromDate, toDate, CustomerName } = customerData;
    db.query(
        "SELECT * FROM BillWiseReceipt WHERE CustomerName = ? AND BillDate BETWEEN ? AND ? AND TotalBalance != 0",
        [CustomerName, fromDate, toDate],
        (error, result) => {
            if (error) {
                console.log(error, "error");
                return res.status(500).json({ error: 'Database query error' });
            }
            return res.status(200).json(result);
        }
    );
});


router.post('/getAllBills', (req, res) => {
    const { customerData } = req.body;
    const { fromDate, toDate, CustomerName } = customerData;
    db.query(
        "SELECT * FROM BillWiseReceipt WHERE CustomerName = ? AND BillDate BETWEEN ? AND ?",
        [CustomerName, fromDate, toDate],
        (error, result) => {
            if (error) {
                console.log(error, "error");
                return res.status(500).json({ error: 'Database query error' });
            }
            return res.status(200).json(result);
        }
    );
})



module.exports = router;
