const express = require('express');
const router = express.Router();
const db = require('../../../db');

router.get('/getFullBillWisedReport', (req, res) => {
    db.query("SELECT TotalAmount,TotalCollected,TotalBalance FROM  BillWiseReceipt", (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Database query error' });

        }
        return res.status(200).json(result);

    })
})

// get all data for dashboard cards 
router.get('/getFullBillWisedReportcards', (req, res) => {
    db.query("SELECT TotalAmount,TotalCollected,TotalBalance,CustomerName,BillDate FROM  BillWiseReceipt", (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Database query error' });

        }
        console.log(result,'results')
        return res.status(200).json(result);
        

    })
})

router.post('/getmonthwisedatas', (req, res) => {
    const { selectMonth } = req.body;
    console.log(selectMonth, 'selectmonthsbyme');

    db.query("SELECT TotalAmount, TotalCollected, TotalBalance, CustomerName, BillDate  FROM BillWiseReceipt WHERE MONTH(BillDate) = ?", [selectMonth], (error, result) => {
        if (error) {
            console.log(error, 'error');
            return res.status(500).json({ error: 'Database query error' });
        }
        console.log(result, 'selectmonthresults');

        return res.status(200).json(result);
    });
});


// get Month wise Total Amount
router.post('/getMonthWiseTotal', (req, res) => {
    const { selectMonth } = req.body;
    console.log(selectMonth, 'selectmonth');

    db.query("SELECT TotalAmount, TotalCollected, TotalBalance FROM BillWiseReceipt WHERE MONTH(BillDate) = ?", [selectMonth], (error, result) => {
        if (error) {
            console.log(error, 'error');
            return res.status(500).json({ error: 'Database query error' });
        }
        console.log(result, 'selectmonthresult');

        return res.status(200).json(result);
    });
});


module.exports = router;
