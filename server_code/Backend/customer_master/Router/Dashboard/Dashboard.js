// const express = require('express');
// const router = express.Router();
// const db = require('../../../db');

// const { subMonths, startOfMonth, endOfMonth, format } = require('date-fns');
// const validator = require('validator');

// const fetchDataFromDatabase = async (startDate, endDate) => {
//     const query = `
//         SELECT 
//         SUM(GrossAmount-DiscountAmount)  AS totalAmount,
//             SUM(paidamount) AS totalPaid,
//             SUM(pendingamount) AS totalPending
//         FROM billing
//         WHERE Billingdate >= ? AND Billingdate <= ?;
//     `;

//     return new Promise((resolve, reject) => {
//         db.query(query, [startDate, endDate], (err, result) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 const { totalAmount, totalPaid, totalPending } = result[0];
//                 resolve({ totalAmount, totalPaid, totalPending });
//             }
//         });
//     });
// };

// const calculatePercentageChange = (currentMonthData, lastMonthData) => {
//     const calculatePercentage = (current, last) => {
//         if (last === 0) {
//             return current !== 0 ? 100 : 0;
//         }
//         return ((current - last) / Math.abs(last)) * 100;
//     };

//     return {
//         totalAmount: calculatePercentage(currentMonthData.totalAmount, lastMonthData.totalAmount),
//         totalPaid: calculatePercentage(currentMonthData.totalPaid, lastMonthData.totalPaid),
//         totalPending: calculatePercentage(currentMonthData.totalPending, lastMonthData.totalPending),
//     };
// };

// const fetchDataForDateRange = async (startDate, endDate) => {
//     const query = `
//         SELECT 
//         SUM(GrossAmount-DiscountAmount)   AS totalAmount,
//             SUM(paidamount) AS totalPaid,
//             SUM(pendingamount) AS totalPending
//         FROM billing
//         WHERE Billingdate >= ? AND Billingdate <= ?;
//     `;

//     return new Promise((resolve, reject) => {
//         db.query(query, [startDate, endDate], (err, result) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 const { totalAmount, totalPaid, totalPending } = result[0];
//                 resolve({ totalAmount, totalPaid, totalPending });
//             }
//         });
//     });
// };

// router.get('/total_amounts_from_billing', async (req, res) => {
//     const currentDate = new Date();
//     const currentMonthStartDate = startOfMonth(new Date());
//     const currentMonthEndDate = endOfMonth(new Date());

//     const lastMonthStartDate = startOfMonth(subMonths(currentDate, 1));
//     const lastMonthEndDate = endOfMonth(subMonths(currentDate, 1));

//     const formatDateString = (date) => format(date, 'yyyy-MM-dd');

//     const currentMonthStartDateString = formatDateString(currentMonthStartDate);
//     const currentMonthEndDateString = formatDateString(currentMonthEndDate);

//     const lastMonthStartDateString = formatDateString(lastMonthStartDate);
//     const lastMonthEndDateString = formatDateString(lastMonthEndDate);

//     try {
//         const currentMonthData = await fetchDataFromDatabase(currentMonthStartDateString, currentMonthEndDateString);
//         const lastMonthData = await fetchDataForDateRange(lastMonthStartDateString, lastMonthEndDateString);
//         const result = {
//             current: currentMonthData,
//             lastMonth: lastMonthData,
//             percentageChange: calculatePercentageChange(currentMonthData, lastMonthData),
//         };
//         res.json(result);
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });
// // Endpoint to fetch sales data for a date range

// router.get('/monthly_data', (req, res) => {
//     const startDate = validator.toDate(req.query.startDate);
//     const endDate = validator.toDate(req.query.endDate);

//     if (!startDate || !endDate) {
//         return res.status(400).json({ error: 'Invalid date format' });
//     }

//     const query = 'SELECT * FROM billing WHERE Billingdate BETWEEN ? AND ?';

//     db.query(query, [startDate, endDate], (error, results) => {
//         if (error) {
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }

//         res.json(results);
//     });
// });


// module.exports = router;



const express = require('express');
const router = express.Router();
const db = require('../../../db');

const { subMonths, startOfMonth, endOfMonth, format, addMonths, addDays, getYear, getMonth } = require('date-fns');
const validator = require('validator');

const fetchDataForDateRange = async (startDate, endDate) => {
    // console.log(startDate, "data range", endDate)
    const query = `
        SELECT 
        
        SUM(Totalamount)   AS totalAmount,
            SUM(paidamount) AS totalPaid,
            SUM(pendingamount) AS totalPending
        FROM billing
        WHERE Billingdate >= ? AND Billingdate <= ?;
    `;

    return new Promise((resolve, reject) => {
        db.query(query, [startDate, endDate], (err, result) => {
            if (err) {
                reject(err);
            } else {
                // console.log(result, "fetch")
                const { totalAmount, totalPaid, totalPending } = result[0];
                resolve({ totalAmount, totalPaid, totalPending });
            }
        });
    });
};


router.get('/total_amounts_from_billing', async (req, res) => {
    const currentDate = new Date();

    const currentMonthNumber = getMonth(currentDate);

    const datemonth2 = req.query.month;
    // console.log(datemonth2, "datre")
    const datemonth1 = datemonth2 !== undefined ? datemonth2 : currentMonthNumber
    // console.log(datemonth1, "datetete")


    const currentYear = getYear(new Date());
    // const datemonth=2;// Get the current year


    let previousYear;
    let previousMonth;
    if (datemonth1 === 0) {
        previousYear = currentYear - 1; // For January, previous year
        previousMonth = 11; // December of previous year
    } else {
        previousYear = currentYear;
        previousMonth = datemonth1 - 1; // For other months, previous month
    }

    // Calculate start date of the previous month
    const startDate2 = startOfMonth(new Date(previousYear, previousMonth));

    // Calculate end date of the current month
    const endDate2 = endOfMonth(new Date(currentYear, datemonth1));
    // console.log(startDate2, typeof (startDate2), "ll", endDate2)
    // const startdatesplit = startDate2.split('T')[0];
    // const enddatesplit = endDate2.split('T')[0];
    const startDateString1 = format(startDate2, 'yyyy-MM-dd');
    const endDateString1 = format(endDate2, 'yyyy-MM-dd');


    // console.log(startDate2, "ll", endDate2)
    // console.log(startDateString1, "datefnsk", endDateString1)



    try {
        // const currentMonthData = await fetchDataFromDatabase(currentMonthStartDateString, currentMonthEndDateString);
        const lastMonthData = await fetchDataForDateRange(startDateString1, endDateString1);
        // console.log(lastMonthData, "total billing")
        const result1 = {
            // current: currentMonthData,
            lastMonth: lastMonthData,

        };

        // console.log(result1, "monthdata")
        return res.json(result1);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }

});

router.get('/monthly_data', (req, res) => {

    const startDate = validator.toDate(req.query.startDate);
    const endDate = validator.toDate(req.query.endDate);
    // console.log(startDate, "str", endDate)

    if (!startDate || !endDate) {
        return res.status(400).json({ error: 'Invalid date format' });
    }

    const query = 'SELECT * FROM billing WHERE Billingdate BETWEEN ? AND ?';

    db.query(query, [startDate, endDate], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        res.json(results);
    });
});

router.get('/monthly_data2', (req, res) => {

    const currentDate = new Date();

    const currentMonthNumber = getMonth(currentDate);

    const datemonth2 = req.query.month;
    // console.log(datemonth2, "datre bilkl ghraph")
    const datemonth1 = datemonth2 !== undefined ? datemonth2 : currentMonthNumber
    // console.log(datemonth1, "datetete bill graph")

    const currentYear = getYear(new Date());
    // const datemonth=2;// Get the current year


    let previousYear;
    let previousMonth;
    if (datemonth1 === 0) {
        previousYear = currentYear - 1; // For January, previous year
        previousMonth = 11; // December of previous year
    } else {
        previousYear = currentYear;
        previousMonth = datemonth1 - 1; // For other months, previous month
    }

    // console.log(previousYear, "llllllll", previousMonth)
    const startDate2 = startOfMonth(new Date(previousYear, previousMonth));


    // Calculate end date of the current month
    const endDate2 = endOfMonth(new Date(currentYear, datemonth1));

    // const startdatesplit = startDate2.split('T')[0];
    // const enddatesplit = endDate2.split('T')[0];
    // console.log(startdatesplit,"kkkkdate",enddatesplit); 
    const startDateString1 = format(startDate2, 'yyyy-MM-dd');
    const endDateString1 = format(endDate2, 'yyyy-MM-dd');


    // console.log(startDate2,";ll", endDate2)
    // console.log(startDateString1,"datefnsk",endDateString1)


    // if (!startDateString1|| !endDateString1) {
    //     return res.status(400).json({ error: 'Invalid date format' });
    // }

    const query = 'SELECT * FROM billing WHERE Billingdate BETWEEN ? AND ?';

    db.query(query, [startDateString1, endDateString1], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // console.log(results)
        res.json(results);

    });
});



module.exports = router;