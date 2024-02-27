const express = require('express');
const router = express.Router();
const db = require('../../../db');

const { subMonths, startOfMonth, endOfMonth, format } = require('date-fns');
const validator = require('validator');

const fetchDataFromDatabase = async (startDate, endDate) => {
    const query = `
        SELECT 
            SUM(Totalamount) AS totalAmount,
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
                const { totalAmount, totalPaid, totalPending } = result[0];
                resolve({ totalAmount, totalPaid, totalPending });
            }
        });
    });
};

const calculatePercentageChange = (currentMonthData, lastMonthData) => {
    const calculatePercentage = (current, last) => {
        if (last === 0) {
            return current !== 0 ? 100 : 0;
        }
        return ((current - last) / Math.abs(last)) * 100;
    };

    return {
        totalAmount: calculatePercentage(currentMonthData.totalAmount, lastMonthData.totalAmount),
        totalPaid: calculatePercentage(currentMonthData.totalPaid, lastMonthData.totalPaid),
        totalPending: calculatePercentage(currentMonthData.totalPending, lastMonthData.totalPending),
    };
};

const fetchDataForDateRange = async (startDate, endDate) => {
    const query = `
        SELECT 
            SUM(Totalamount) AS totalAmount,
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
                const { totalAmount, totalPaid, totalPending } = result[0];
                resolve({ totalAmount, totalPaid, totalPending });
            }
        });
    });
};

router.get('/total_amounts_from_billing', async (req, res) => {
    const currentDate = new Date();
    const currentMonthStartDate = startOfMonth(new Date());
    const currentMonthEndDate = endOfMonth(new Date());

    const lastMonthStartDate = startOfMonth(subMonths(currentDate, 1));
    const lastMonthEndDate = endOfMonth(subMonths(currentDate, 1));

    const formatDateString = (date) => format(date, 'yyyy-MM-dd');

    const currentMonthStartDateString = formatDateString(currentMonthStartDate);
    const currentMonthEndDateString = formatDateString(currentMonthEndDate);

    const lastMonthStartDateString = formatDateString(lastMonthStartDate);
    const lastMonthEndDateString = formatDateString(lastMonthEndDate);

    try {
        const currentMonthData = await fetchDataFromDatabase(currentMonthStartDateString, currentMonthEndDateString);
        const lastMonthData = await fetchDataForDateRange(lastMonthStartDateString, lastMonthEndDateString);
        const result = {
            current: currentMonthData,
            lastMonth: lastMonthData,
            percentageChange: calculatePercentageChange(currentMonthData, lastMonthData),
        };
        res.json(result);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
// Endpoint to fetch sales data for a date range

router.get('/monthly_data', (req, res) => {
    const startDate = validator.toDate(req.query.startDate);
    const endDate = validator.toDate(req.query.endDate);

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


module.exports = router;