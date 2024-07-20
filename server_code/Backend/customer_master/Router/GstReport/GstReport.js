const express = require('express');
const router = express.Router();
const db = require('../../../db');

// get stationname from stationcreation
router.get('/allDepartment', (req, res) => {
    db.query("SELECT stationname FROM stationcreation", (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
        }
        return res.status(200).json(result);
    })
})


router.get('/getBilledDetails', async (req, res) => {
    const { customer, fromDate, toDate, department } = req.query;

    if (!customer || !fromDate || !toDate || !department) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    const statusValues = ['Covering_Billed', 'Transfer_Billed', 'Billed'];

    try {
        const queries = [
            new Promise((resolve, reject) => {
                let query = "SELECT * FROM tripsheet WHERE startdate >= DATE_ADD(?, INTERVAL 0 DAY) AND startdate <= DATE_ADD(?, INTERVAL 1 DAY) AND status IN (?)";
                let params = [fromDate, toDate, statusValues];

                if (customer !== "All") {
                    query += " AND customer = ?";
                    params.push(customer);
                }

                if (department !== "All") {
                    query += " AND department = ?";
                    params.push(department);
                }

                db.query(query, params, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            }),
            new Promise((resolve, reject) => {
                let query = "SELECT InvoiceDate,Customer FROM Group_billing WHERE FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 1 DAY)";
                let params = [fromDate, toDate];

                if (customer !== "All") {
                    query += " AND customer = ?";
                    params.push(customer);
                }

                db.query(query, params, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            }),
            new Promise((resolve, reject) => {
                let query = "SELECT Billdate,Organization_name FROM Transfer_list WHERE FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 1 DAY)";
                let params = [fromDate, toDate];

                if (customer !== "All") {
                    query += " AND Organization_name = ?";
                    params.push(customer);
                }

                db.query(query, params, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            }),
            new Promise((resolve, reject) => {
                let query = "SELECT gstTax, gstnumber, customer FROM customers";
                let params = [];

                if (customer !== "All") {
                    query += " WHERE customer = ?";
                    params.push(customer);
                }

                db.query(query, params, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            })
        ];

        const [tripsheetResults, coveringBilledResults, transferBilledResults, customerResults] = await Promise.all(queries);

        const combinedResults = [
            ...tripsheetResults,
            ...coveringBilledResults,
            ...transferBilledResults,
            ...customerResults
        ];

        // res.status(200).json(combinedResults);
        res.status(200).json({
            tripsheetResults,
            coveringBilledResults,
            transferBilledResults,
            customerResults
        });
    } catch (error) {
        console.error('Failed to fetch data from MySQL:', error);
        res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }
});





module.exports = router;