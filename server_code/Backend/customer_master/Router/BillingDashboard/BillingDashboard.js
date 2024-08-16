const express = require('express');
const router = express.Router();
const db = require('../../../db');

router.get('/getFullBillWisedReport', (req, res) => {
    db.query("SELECT TotalAmount,Collected,TotalBalance FROM  BillWiseReceipt", (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Database query error' });

        }
        return res.status(200).json(result);

    })
})


module.exports = router;
