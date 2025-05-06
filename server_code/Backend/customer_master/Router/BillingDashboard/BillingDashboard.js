const express = require('express');
const router = express.Router();
const db = require('../../../db');

// router.get('/getFullBillWisedReport', (req, res) => {
//     db.query("SELECT TotalAmount,TotalCollected,TotalBalance FROM  BillWiseReceipt", (error, result) => {
//         if (error) {
//             console.log(error);
//             return res.status(500).json({ error: 'Database query error' });

//         }
//         return res.status(200).json(result);

//     })
// })

router.get('/getFullBillWisedReport', (req, res) => {
    const { selectYear } = req.query; // Use req.query for GET request parameters

    const sqlQuery = `
        SELECT TotalAmount, TotalCollected, TotalBalance 
        FROM BillWiseReceipt 
        WHERE YEAR(BillDate) = ?
    `;

    db.query(sqlQuery, [selectYear], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Database query error' });
        }
        return res.status(200).json(result);
    });
});


// get all data for dashboard cards 
// router.get('/getFullBillWisedReportcards', (req, res) => {
//     db.query("SELECT TotalAmount,TotalCollected,TotalBalance,CustomerName,BillDate FROM  BillWiseReceipt", (error, result) => {
//         if (error) {
//             console.log(error);
//             return res.status(500).json({ error: 'Database query error' });

//         }
//         console.log(result,'results')
//         return res.status(200).json(result);


//     })
// })

router.get('/getFullBillWisedReportcards', (req, res) => {
    const { selectYear } = req.query; // Use query parameters for GET request


    const sqlQuery = `
        SELECT TotalAmount, TotalCollected, TotalBalance, CustomerName, BillDate 
        FROM BillWiseReceipt 
        WHERE YEAR(BillDate) = ?
    `;

    db.query(sqlQuery, [selectYear], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Database query error' });
        }

        console.log(result, 'Filtered Results');
        return res.status(200).json(result);
    });
});


// router.post('/getmonthwisedatas', (req, res) => {
//     const { selectMonth,selectYear } = req.body;
//     console.log(selectMonth,selectYear, 'selectmonthsbyme');

//     db.query("SELECT TotalAmount, TotalCollected, TotalBalance, CustomerName, BillDate  FROM BillWiseReceipt WHERE MONTH(BillDate) = ?", [selectMonth], (error, result) => {
//         if (error) {
//             console.log(error, 'error');
//             return res.status(500).json({ error: 'Database query error' });
//         }
//         console.log(result, 'selectmonthresults');

//         return res.status(200).json(result);
//     });
// });

router.post('/getmonthwisedatas', (req, res) => {
    const { selectMonth, selectYear } = req.body;

    const query = `
        SELECT TotalAmount, TotalCollected, TotalBalance, CustomerName, BillDate  
        FROM BillWiseReceipt 
        WHERE MONTH(BillDate) = ? AND YEAR(BillDate) = ?
    `;

    db.query(query, [selectMonth, selectYear], (error, result) => {
        if (error) {
            console.log(error, 'error');
            return res.status(500).json({ error: 'Database query error' });
        }
        console.log(result, 'selectmonthresults');

        return res.status(200).json(result);
    });
});


// get Month wise Total Amount
// router.post('/getMonthWiseTotal', (req, res) => {
//     const { selectMonth } = req.body;
//     console.log(selectMonth, 'selectmonth');

//     db.query("SELECT TotalAmount, TotalCollected, TotalBalance FROM BillWiseReceipt WHERE MONTH(BillDate) = ?", [selectMonth], (error, result) => {
//         if (error) {
//             console.log(error, 'error');
//             return res.status(500).json({ error: 'Database query error' });
//         }
//         console.log(result, 'selectmonthresult');

//         return res.status(200).json(result);
//     });
// });

router.post('/getMonthWiseTotal', (req, res) => {
    const { selectMonth, selectYear } = req.body;
    console.log(selectMonth, selectYear, 'selectmonth');

    const query = `
        SELECT TotalAmount, TotalCollected, TotalBalance 
        FROM BillWiseReceipt 
        WHERE MONTH(BillDate) = ? AND YEAR(BillDate) = ?
    `;

    db.query(query, [selectMonth, selectYear], (error, result) => {
        if (error) {
            console.log(error, 'error');
            return res.status(500).json({ error: 'Database query error' });
        }
        console.log(result, 'selectmonthresult');

        return res.status(200).json(result);
    });
});

// get tripsheet billed amount details in tripsheet table
router.get('/BilledSuccessAmountTripsheetAPI',(req,res)=>{
    const { selectedMonth, selectYear} = req.query;
    const sqlBilledTripsheetQuery = `SELECT customer,startdate,totalcalcAmount FROM tripsheet WHERE MONTH(startdate) = ? AND YEAR(startdate) =? AND Bill_Amount_Update	= "Success"`;
    db.query(sqlBilledTripsheetQuery,[selectedMonth,selectYear],(error,result)=>{
        if(error){
            console.log(error,"error");
        }
        return res.status(200).json(result);
    })
})

// get Tripsheet all  billed amount details in tripsheet table
router.get('/AllBilledSuccessAmountTripsheetAPI',(req,res)=>{
    const {selectYear} = req.query;
    const sqlBilledTripsheetQuery = `SELECT customer,startdate,totalcalcAmount,Balance_Amount FROM tripsheet WHERE YEAR(startdate) = ? AND Bill_Amount_Update	= "Success"`;
    db.query(sqlBilledTripsheetQuery,[selectYear],(error,result)=>{
        if(error){
            console.log(error);
            
        }
        return res.status(200).json(result);
    })
})

module.exports = router;
