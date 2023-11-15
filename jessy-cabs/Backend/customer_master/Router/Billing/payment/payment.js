const express = require('express');
const router = express.Router();
const db = require('../../../../db');

const { subMonths, startOfMonth, endOfMonth, format } = require('date-fns');


router.get('/organizationoptions', (req, res) => {
    db.query('SELECT DISTINCT customer FROM customers', (err, rows) => {
        if (err) {
            console.error('Error fetching bank names from MySQL:', err);
            return res.status(500).json({ error: 'Failed to fetch bank names from MySQL' });
        }
        const organizations = rows.map((row) => row.customer);
        console.log('organization name', organizations);
        return res.status(200).json(organizations);
    });
});

router.get('/payment-details', (req, res) => {
    const { billingno, customer, fromDate, toDate } = req.query;
    // Query and parameters for fetching booking details based on the query parameters
    let query = 'SELECT * FROM billing WHERE 1=1';
    let params = [];
    if (billingno) {
        query += ' AND billingno = ?';
        params.push(billingno);
    }
    if (customer) {
        query += ' AND customer = ?';
        params.push(customer);
    }
    if (fromDate && toDate) {
        query += ' AND Billingdate BETWEEN ? AND ?';
        params.push(fromDate);
        params.push(toDate);
    }
    db.query(query, params, (err, result) => {
        if (err) {
            console.error('Error retrieving booking details from MySQL:', err);
            return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
        }
        return res.status(200).json(result);
    });
});

//totalamount of billing
router.get('/totalAmount_from_billing', (req, res) => {
    const query = 'SELECT SUM(Totalamount) AS total FROM billing';
    // console.log('query from payment', query);

    db.query(query, (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
        } else {
            const totalAmount = result[0].total || 0;
            console.log('total amount', totalAmount);
            res.json({ totalAmount });
        }
    });
});

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
                console.error('Error executing query:', err);
                reject(err);
            } else {
                const { totalAmount, totalPaid, totalPending } = result[0];
                console.log(`Data for ${startDate} to ${endDate}:`, { totalAmount, totalPaid, totalPending });
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
                console.error('Error executing query:', err);
                reject(err);
            } else {
                const { totalAmount, totalPaid, totalPending } = result[0];
                console.log(`Data for ${startDate} to ${endDate}:`, { totalAmount, totalPaid, totalPending });
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

    // const currentDateString = formatDateString(currentDate);

    const currentMonthStartDateString = formatDateString(currentMonthStartDate);
    const currentMonthEndDateString = formatDateString(currentMonthEndDate);


    const lastMonthStartDateString = formatDateString(lastMonthStartDate);
    const lastMonthEndDateString = formatDateString(lastMonthEndDate);

    // console.log('Current Date:', currentDateString);

    console.log('Last Month Start Date:', currentMonthStartDateString);
    console.log('Last Month End Date:', currentMonthEndDateString);

    console.log('Last Month Start Date:', lastMonthStartDateString);
    console.log('Last Month End Date:', lastMonthEndDateString);

    try {
        // const currentData = await fetchDataFromDatabase(currentDateString);

        const currentMonthData = await fetchDataFromDatabase(currentMonthStartDateString, currentMonthEndDateString);


        const lastMonthData = await fetchDataForDateRange(lastMonthStartDateString, lastMonthEndDateString);

        const result = {
            current: currentMonthData,
            lastMonth: lastMonthData,
            percentageChange: calculatePercentageChange(currentMonthData, lastMonthData),
        };

        res.json(result);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;