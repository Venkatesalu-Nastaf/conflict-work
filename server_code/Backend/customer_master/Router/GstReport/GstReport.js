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

router.get('/getAllBilledDetails', async (req, res) => {
    const { customer, fromDate, toDate } = req.query;

    if (!customer || !fromDate || !toDate) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    const statusValues = ['Covering_Billed', 'Transfer_Billed', 'Billed'];

    try {
        const queries = [
            new Promise((resolve, reject) => {
                let query = "SELECT * FROM tripsheet WHERE tripsheetdate BETWEEN ? AND ? AND status IN (?)";
                let params = [fromDate, toDate, statusValues];

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
                let query = "SELECT ReferenceNo,InvoiceDate, Customer FROM Group_billing WHERE FromDate BETWEEN ? AND ?";
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
                let query = "SELECT Billdate, Organization_name FROM Transfer_list WHERE FromDate BETWEEN ? AND ?";
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
                let query = "SELECT Bill_Date, Customer FROM Individual_Billing WHERE Bill_Date BETWEEN ? AND ?";
                let params = [fromDate, toDate];

                if (customer !== "All") {
                    query += " AND Customer = ?";
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

        const [tripsheetResults, coveringBilledResults, transferBilledResults, individualBilledResults, customerResults] = await Promise.all(queries);

        res.status(200).json({
            tripsheetResults,
            coveringBilledResults,
            transferBilledResults,
            individualBilledResults,
            customerResults
        });
    } catch (error) {
        console.error('Failed to fetch data from MySQL:', error);
        res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }
});

// final gst report query for all details
router.get('/getAllStateBilledDetails', async (req, res) => {
    const { customer, fromDate, toDate, department } = req.query;


    if (!customer || !fromDate || !toDate) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    try {
        // Execute TransferListQuery
        const transferListResults = await new Promise((resolve, reject) => {
            const query = `
                SELECT Invoice_no, Billdate, Organization_name, Trip_id
                FROM Transfer_list 
                WHERE Billdate BETWEEN ? AND ? 
                AND  Organization_name = ?`;
            const params = [fromDate, toDate, customer];

            db.query(query, params, (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });

        // Execute GroupBillingQuery
        const groupBillingResults = await new Promise((resolve, reject) => {
            const query = `
                SELECT ReferenceNo, InvoiceDate, Customer, Trip_id
                FROM Group_billing 
                WHERE InvoiceDate BETWEEN ? AND ? 
                AND Customer = ?`;
            const params = [fromDate, toDate, customer];

            db.query(query, params, (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });

        // Fetch Invoice_No for each ReferenceNo from GroupBillingResults
        const groupBillingInvoices = await Promise.all(
            groupBillingResults.map((row) =>
                new Promise((resolve, reject) => {
                    const query = "SELECT Invoice_No FROM GroupBillinginvoice_no WHERE ReferenceNo = ?";
                    const params = [row.ReferenceNo];

                    db.query(query, params, (error, results) => {
                        if (error) return reject(error);
                        resolve({ ...row, invoices: results });
                    });
                })
            )
        );

        // Execute IndividualBillingQuery
        const individualBillingResults = await new Promise((resolve, reject) => {
            const query = `
                SELECT Invoice_No, Bill_Date, Customer, Trip_id
                FROM Individual_Billing 
                WHERE Bill_Date BETWEEN ? AND ? 
                AND Customer = ?`;
            const params = [fromDate, toDate, customer];

            db.query(query, params, (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });

        // Consolidate the results
        const combinedResults = {
            transferListResults,
            groupBillingResults: groupBillingInvoices,
            individualBillingResults,
        };

        // Extract all Trip IDs
        const allTripIds = [
            ...combinedResults.transferListResults?.flatMap(item =>
                item.Trip_id ? item.Trip_id.split(',') : []
            ),
            ...combinedResults.groupBillingResults?.flatMap(item =>
                item.Trip_id ? item.Trip_id.split(',') : []
            ),
            ...combinedResults.individualBillingResults?.flatMap(item =>
                item.Trip_id ? item.Trip_id.split(',') : []
            ),
        ];


        if (allTripIds.length === 0) {
            // If no trip IDs are found, return an empty response
            return res.status(200).json({
                message: 'No trip IDs found',
                combinedResults,
                allTripIds: [],
                allTripDetails: [],
                tripsheetResults: [],
            });
        }


        const allTripDetails = [
            // Process transferListResults
            ...combinedResults.transferListResults?.flatMap(item =>
                item.Trip_id
                    ? item.Trip_id.split(',').map(tripId => ({
                        tripId: tripId.trim(),
                        invoiceNo: item.Invoice_no,
                        invoiceDate: item.Billdate
                    }))
                    : []
            ),

            // Process groupBillingResults
            ...combinedResults.groupBillingResults?.flatMap(item => {
                const tripIds = item.Trip_id ? item.Trip_id.split(',').map(tripId => tripId.trim()) : [];
                const invoices = item.invoices || [];
                return tripIds.map((tripId, index) => ({
                    tripId,
                    invoiceNo: invoices[index]?.Invoice_No || null, // Match invoice by index or set to null
                    invoiceDate: item.InvoiceDate, // Add InvoiceDate from groupBillingResults
                }));
            }),

            // Process individualBillingResults
            ...combinedResults.individualBillingResults?.flatMap(item =>
                item.Trip_id
                    ? item.Trip_id.split(',').map(tripId => ({
                        tripId: tripId.trim(),
                        invoiceNo: item.Invoice_no,
                        invoiceDate: item.Bill_Date
                    }))
                    : []
            ),
        ];


        // Query the tripsheet table for all Trip IDs
        if (allTripIds.length > 0) {
            db.query("SELECT * FROM tripsheet WHERE tripid IN (?)", [allTripIds], (error, tripsheetResults) => {
                if (error) {
                    console.error('Error querying tripsheet:', error);
                    return res.status(500).json({ error: 'Error fetching tripsheet data' });
                }

                // Response with combined results, all Trip IDs, and tripsheet results
                res.status(200).json({
                    combinedResults,
                    allTripIds,
                    allTripDetails,
                    tripsheetResults,
                });
            });
        }
    } catch (error) {
        console.error('Error fetching particular state billed details:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});


// final gst report query for show

// router.get('/getParticularStateBilledDetails', async (req, res) => {
//     const { customer, fromDate, toDate, department } = req.query;

//     if (!customer || !fromDate || !toDate || !department) {
//         return res.status(400).json({ error: 'Missing required parameters' });
//     }

//     try {
//         // Execute TransferListQuery
//         const transferListResults = await new Promise((resolve, reject) => {
//             const query = `
//                 SELECT Invoice_no, Billdate, Organization_name, Trip_id
//                 FROM Transfer_list 
//                 WHERE Billdate BETWEEN ? AND ? 
//                 AND State = ? 
//                 AND Organization_name = ?`;
//             const params = [fromDate, toDate, department, customer];

//             db.query(query, params, (error, results) => {
//                 if (error) return reject(error);
//                 resolve(results);
//             });
//         });

//         // Execute GroupBillingQuery
//         const groupBillingResults = await new Promise((resolve, reject) => {
//             const query = `
//                 SELECT ReferenceNo, InvoiceDate, Customer, Trip_id
//                 FROM Group_billing 
//                 WHERE InvoiceDate BETWEEN ? AND ? 
//                 AND State = ? 
//                 AND Customer = ?`;
//             const params = [fromDate, toDate, department, customer];

//             db.query(query, params, (error, results) => {
//                 if (error) return reject(error);
//                 resolve(results);
//             });
//         });

//         // Fetch Invoice_No for each ReferenceNo from GroupBillingResults
//         const groupBillingInvoices = await Promise.all(
//             groupBillingResults.map((row) =>
//                 new Promise((resolve, reject) => {
//                     const query = "SELECT Invoice_No FROM GroupBillinginvoice_no WHERE ReferenceNo = ?";
//                     const params = [row.ReferenceNo];

//                     db.query(query, params, (error, results) => {
//                         if (error) return reject(error);
//                         resolve({ ...row, invoices: results });
//                     });
//                 })
//             )
//         );

//         // Execute IndividualBillingQuery
//         const individualBillingResults = await new Promise((resolve, reject) => {
//             const query = `
//                 SELECT Invoice_No, Bill_Date, Customer, Trip_id
//                 FROM Individual_Billing 
//                 WHERE Bill_Date BETWEEN ? AND ? 
//                 AND State = ? 
//                 AND Customer = ?`;
//             const params = [fromDate, toDate, department, customer];

//             db.query(query, params, (error, results) => {
//                 if (error) return reject(error);
//                 resolve(results);
//             });
//         });

//         // Consolidate the results
//         const combinedResults = {
//             transferListResults,
//             groupBillingResults: groupBillingInvoices,
//             individualBillingResults,
//         };

//         // Extract all Trip IDs
//         const allTripIds = [
//             ...combinedResults.transferListResults?.flatMap(item =>
//                 item.Trip_id ? item.Trip_id.split(',') : []
//             ),
//             ...combinedResults.groupBillingResults?.flatMap(item =>
//                 item.Trip_id ? item.Trip_id.split(',') : []
//             ),
//             ...combinedResults.individualBillingResults?.flatMap(item =>
//                 item.Trip_id ? item.Trip_id.split(',') : []
//             ),
//         ];


//         if (allTripIds.length === 0) {
//             // If no trip IDs are found, return an empty response
//             return res.status(200).json({
//                 message: 'No trip IDs found',
//                 combinedResults,
//                 allTripIds: [],
//                 allTripDetails: [],
//                 tripsheetResults: [],
//             });
//         }

//         const allTripDetails = [
//             // Process transferListResults
//             ...combinedResults.transferListResults?.flatMap(item =>
//                 item.Trip_id
//                     ? item.Trip_id.split(',').map(tripId => ({
//                         tripId: tripId.trim(),
//                         invoiceNo: item.Invoice_no,
//                         invoiceDate: item.Billdate,
//                     }))
//                     : []
//             ),

//             // Process groupBillingResults
//             ...combinedResults.groupBillingResults?.flatMap(item => {
//                 const tripIds = item.Trip_id ? item.Trip_id.split(',').map(tripId => tripId.trim()) : [];
//                 const invoices = item.invoices || [];
//                 return tripIds.map((tripId, index) => ({
//                     tripId,
//                     invoiceNo: invoices[index]?.Invoice_No || null, // Match invoice by index or set to null
//                     invoiceDate: item.InvoiceDate, // Add InvoiceDate from groupBillingResults
//                 }));
//             }),

//             // Process individualBillingResults
//             ...combinedResults.individualBillingResults?.flatMap(item =>
//                 item.Trip_id
//                     ? item.Trip_id.split(',').map(tripId => ({
//                         tripId: tripId.trim(),
//                         invoiceNo: item.Invoice_no,
//                         invoiceDate: item.Bill_Date,
//                     }))
//                     : []
//             ),
//         ];


//         // Query the tripsheet table for all Trip IDs
//         db.query("SELECT * FROM tripsheet WHERE tripid IN (?)", [allTripIds], (error, tripsheetResults) => {
//             if (error) {
//                 console.error('Error querying tripsheet:', error);
//                 return res.status(500).json({ error: 'Error fetching tripsheet data' });
//             }

//             // Response with combined results, all Trip IDs, and tripsheet results
//             res.status(200).json({
//                 combinedResults,
//                 allTripIds,
//                 allTripDetails,
//                 tripsheetResults,
//             });
//         });
//     } catch (error) {
//         console.error('Error fetching particular state billed details:', error);
//         res.status(500).json({ error: 'Failed to fetch data' });
//     }
// });

// checking gstreport data
router.get('/getFromToBetweenParticularStateBilledDetails', async (req, res) => {
    const { customer, fromDate, toDate, department } = req.query;

    if (!fromDate || !toDate || !department) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    try {
        const customerCondition = customer !== 'All' ? 'AND Organization_name = ?' : '';
        const customerParams = customer !== 'All' ? [customer] : [];

        // Execute TransferListQuery
        const transferListQuery = `
            SELECT Grouptrip_id ,Invoice_no, Billdate, Organization_name, Trip_id,	Amount,FromDate,EndDate
            FROM Transfer_list 
            WHERE Billdate BETWEEN ? AND ? 
            AND State = ? 
            ${customerCondition}`;

        const transferListResults = await new Promise((resolve, reject) => {
            db.query(transferListQuery, [fromDate, toDate, department, ...customerParams], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });

        // Execute GroupBillingQuery
        const groupBillingQuery = `
        SELECT 
            ReferenceNo AS Grouptrip_id, 
            InvoiceDate AS Billdate, 
            Customer AS Organization_name, 
            FromDate,
            ToDate AS EndDate,
            Amount,
            Trip_id
        FROM Group_billing 
        WHERE InvoiceDate BETWEEN ? AND ? 
        AND State = ?
        ${customerCondition.replace('Organization_name', 'Customer')}
    `;

        const groupBillingResults = await new Promise((resolve, reject) => {
            db.query(groupBillingQuery, [fromDate, toDate, department, ...customerParams], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });

        // Fetch Invoice_No for each ReferenceNo from GroupBillingResults
        const groupBillingInvoices = await Promise.all(
            groupBillingResults.map((row) =>
                new Promise((resolve, reject) => {
                    const query = "SELECT Invoice_No FROM GroupBillinginvoice_no WHERE ReferenceNo = ?";
                    db.query(query, [row.ReferenceNo], (error, results) => {
                        if (error) return reject(error);
                        resolve({ ...row, invoices: results });
                    });
                })
            )
        );

        // Execute IndividualBillingQuery
        const individualBillingQuery = `
        SELECT 
            Invoice_No AS Invoice_no, 
            Bill_Date AS Billdate, 
            Customer AS Organization_name, 
            Amount,
            Trip_id,
            TripStartDate AS FromDate
        FROM Individual_Billing 
        WHERE Bill_Date BETWEEN ? AND ? 
        AND State = ?
        ${customerCondition.replace('Organization_name', 'Customer')}`;


        const individualBillingResults = await new Promise((resolve, reject) => {
            db.query(individualBillingQuery, [fromDate, toDate, department, ...customerParams], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });

        // Consolidate results
        const combinedResults = {
            transferListResults,
            groupBillingResults: groupBillingInvoices,
            individualBillingResults,
        };

        // Extract all Trip IDs
        const allTripIds = [
            ...transferListResults.flatMap(item => item.Trip_id ? item.Trip_id.split(',') : []),
            ...groupBillingInvoices.flatMap(item => item.Trip_id ? item.Trip_id.split(',') : []),
            ...individualBillingResults.flatMap(item => item.Trip_id ? item.Trip_id.split(',') : []),
        ];

        const allTripIds1 = [
            ...transferListResults.map(item => [
                item.Grouptrip_id,
                item.Trip_id ? item.Trip_id.split(',').map(tripId => tripId.trim()) : []
            ]),
            ...groupBillingInvoices.map(item => [
                item.ReferenceNo,
                item.Trip_id ? item.Trip_id.split(',').map(tripId => tripId.trim()) : []
            ]),
            ...individualBillingResults.map(item => [
                item.Invoice_No,
                item.Trip_id ? item.Trip_id.split(',').map(tripId => tripId.trim()) : []
            ]),
        ].map(([groupid, tripIds]) => ({ groupid, tripIds }));

        // console.log(allTripIds);


        if (allTripIds.length === 0) {
            return res.status(200).json({
                message: 'No trip IDs found',
                combinedResults,
                allTripIds: [],
                allTripDetails: [],
                tripsheetResults: [],
            });
        }

        const allTripDetails = [
            ...transferListResults.flatMap(item => item.Trip_id ? item.Trip_id.split(',').map(tripId => ({
                tripId: tripId.trim(),
                invoiceNo: item.Invoice_no,
                invoiceDate: item.Billdate,
            })) : []),

            ...groupBillingInvoices.flatMap(item => {
                const tripIds = item.Trip_id ? item.Trip_id.split(',').map(tripId => tripId.trim()) : [];
                return tripIds.map((tripId, index) => ({
                    tripId,
                    invoiceNo: item.invoices[index]?.Invoice_No || null,
                    invoiceDate: item.InvoiceDate,
                }));
            }),

            ...individualBillingResults.flatMap(item => item.Trip_id ? item.Trip_id.split(',').map(tripId => ({
                tripId: tripId.trim(),
                invoiceNo: item.Invoice_no,
                invoiceDate: item.Bill_Date,
            })) : []),
        ];

        // // Query tripsheet table
        // db.query("SELECT * FROM tripsheet WHERE tripid IN (?)", [allTripIds], (error, tripsheetResults) => {
        //     if (error) {
        //         console.error('Error querying tripsheet:', error);
        //         return res.status(500).json({ error: 'Error fetching tripsheet data' });
        //     }
        const tripIdToGroupMap = {};
        allTripIds1.forEach(({ groupid, tripIds }) => {
            tripIds.forEach(tripId => {
                if (tripId) tripIdToGroupMap[tripId] = groupid;
            });
        });
        
        // Query tripsheet table
        db.query("SELECT * FROM tripsheet WHERE tripid IN (?)", [allTripIds], (error, tripsheetResults) => {
            if (error) {
                console.error('Error querying tripsheet:', error);
                return res.status(500).json({ error: 'Error fetching tripsheet data' });
            }
        
            // Add groupid to tripsheetResults
            const updatedTripsheetResults = tripsheetResults.map(trip => ({
                ...trip,
                groupid: tripIdToGroupMap[trip.tripid] || null
            }));
            console.log(updatedTripsheetResults);
            
            res.status(200).json({
                combinedResults,
                allTripIds,
                allTripDetails,
                tripsheetResults:updatedTripsheetResults,
            });
        });
    } catch (error) {
        console.error('Error fetching particular state billed details:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

router.get('/getParticularStateBilledDetails', async (req, res) => {
    const { customer, fromDate, toDate, department } = req.query;

    if (!fromDate || !toDate || !department) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    try {
        const customerCondition = customer !== 'All' ? 'AND Organization_name = ?' : '';
        const customerParams = customer !== 'All' ? [customer] : [];

        // Execute TransferListQuery
        const transferListQuery = `
            SELECT Invoice_no, Billdate, Organization_name, Trip_id
            FROM Transfer_list 
            WHERE Billdate BETWEEN ? AND ? 
            AND State = ? 
            ${customerCondition}`;

        const transferListResults = await new Promise((resolve, reject) => {
            db.query(transferListQuery, [fromDate, toDate, department, ...customerParams], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });

        // Execute GroupBillingQuery
        const groupBillingQuery = `
            SELECT ReferenceNo, InvoiceDate, Customer, Trip_id
            FROM Group_billing 
            WHERE InvoiceDate BETWEEN ? AND ? 
            AND State = ?
            ${customerCondition.replace('Organization_name', 'Customer')}`;

        const groupBillingResults = await new Promise((resolve, reject) => {
            db.query(groupBillingQuery, [fromDate, toDate, department, ...customerParams], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });

        // Fetch Invoice_No for each ReferenceNo from GroupBillingResults
        const groupBillingInvoices = await Promise.all(
            groupBillingResults.map((row) =>
                new Promise((resolve, reject) => {
                    const query = "SELECT Invoice_No FROM GroupBillinginvoice_no WHERE ReferenceNo = ?";
                    db.query(query, [row.ReferenceNo], (error, results) => {
                        if (error) return reject(error);
                        resolve({ ...row, invoices: results });
                    });
                })
            )
        );

        // Execute IndividualBillingQuery
        const individualBillingQuery = `
            SELECT Invoice_No, Bill_Date, Customer, Trip_id
            FROM Individual_Billing 
            WHERE Bill_Date BETWEEN ? AND ? 
            AND State = ?
            ${customerCondition.replace('Organization_name', 'Customer')}`;

        const individualBillingResults = await new Promise((resolve, reject) => {
            db.query(individualBillingQuery, [fromDate, toDate, department, ...customerParams], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });

        // Consolidate results
        const combinedResults = {
            transferListResults,
            groupBillingResults: groupBillingInvoices,
            individualBillingResults,
        };

        // Extract all Trip IDs
        const allTripIds = [
            ...transferListResults.flatMap(item => item.Trip_id ? item.Trip_id.split(',') : []),
            ...groupBillingInvoices.flatMap(item => item.Trip_id ? item.Trip_id.split(',') : []),
            ...individualBillingResults.flatMap(item => item.Trip_id ? item.Trip_id.split(',') : []),
        ];

        if (allTripIds.length === 0) {
            return res.status(200).json({
                message: 'No trip IDs found',
                combinedResults,
                allTripIds: [],
                allTripDetails: [],
                tripsheetResults: [],
            });
        }

        const allTripDetails = [
            ...transferListResults.flatMap(item => item.Trip_id ? item.Trip_id.split(',').map(tripId => ({
                tripId: tripId.trim(),
                invoiceNo: item.Invoice_no,
                invoiceDate: item.Billdate,
            })) : []),

            ...groupBillingInvoices.flatMap(item => {
                const tripIds = item.Trip_id ? item.Trip_id.split(',').map(tripId => tripId.trim()) : [];
                return tripIds.map((tripId, index) => ({
                    tripId,
                    invoiceNo: item.invoices[index]?.Invoice_No || null,
                    invoiceDate: item.InvoiceDate,
                }));
            }),

            ...individualBillingResults.flatMap(item => item.Trip_id ? item.Trip_id.split(',').map(tripId => ({
                tripId: tripId.trim(),
                invoiceNo: item.Invoice_no,
                invoiceDate: item.Bill_Date,
            })) : []),
        ];

        // Query tripsheet table
        db.query("SELECT * FROM tripsheet WHERE tripid IN (?)", [allTripIds], (error, tripsheetResults) => {
            if (error) {
                console.error('Error querying tripsheet:', error);
                return res.status(500).json({ error: 'Error fetching tripsheet data' });
            }
            console.log(combinedResults, "cccccccccccccccccccccccccccccc");

            res.status(200).json({
                combinedResults,
                allTripIds,
                allTripDetails,
                tripsheetResults,
            });
        });
    } catch (error) {
        console.error('Error fetching particular state billed details:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});



router.get('/getBilledDetails', async (req, res) => {
    const { customer, fromDate, toDate, department } = req.query;

    if (!customer || !fromDate || !toDate || !department) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    const statusValues = ['Covering_Billed', 'Transfer_Billed', 'Billed'];

    try {
        const queries = [
            // Tripsheet query (Removed department condition)
            new Promise((resolve, reject) => {
                let query = "SELECT * FROM tripsheet WHERE tripsheetdate >= DATE_ADD(?, INTERVAL 0 DAY) AND tripsheetdate <= DATE_ADD(?, INTERVAL 1 DAY) AND customer = ? AND Billed_Status IN (?)";
                let params = [fromDate, toDate, customer, statusValues];

                // if (customer !== "All") {
                //     query += " AND customer = ?";
                //     params.push(customer);
                // }

                db.query(query, params, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            }),
            // Group_billing query (Added WHERE State = ? condition)
            new Promise((resolve, reject) => {
                // let query = "SELECT ReferenceNo,InvoiceDate, Customer FROM Group_billing WHERE FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 1 DAY) AND State = ? AND Customer = ? ";
                let query = "SELECT ReferenceNo,InvoiceDate, Customer FROM Group_billing WHERE FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 1 DAY) AND State = ? AND Customer = ? ";

                let params = [fromDate, toDate, department, customer];


                // if (customer !== "All") {
                //     query += " AND customer = ?";
                //     params.push(customer);
                // }

                db.query(query, params, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    console.log(result, 'groupbillresult');

                    resolve(result);
                });
            }),
            // Transfer_list query (Added WHERE State = ? condition)
            new Promise((resolve, reject) => {
                let query = "SELECT Invoice_no,Billdate, Organization_name FROM Transfer_list WHERE FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 1 DAY) AND State = ? AND Organization_name=?";
                let params = [fromDate, toDate, department, customer];

                // if (customer !== "All") {
                //     query += " AND Organization_name = ?";
                //     params.push(customer);
                // }

                db.query(query, params, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            }),
            // Individual_Billing query (Added WHERE State = ? condition)
            new Promise((resolve, reject) => {
                let query = "SELECT Bill_Date, Customer FROM Individual_Billing WHERE Bill_Date BETWEEN ? AND ? AND State = ? AND Customer = ?";
                let params = [fromDate, toDate, department, customer];

                if (customer !== "All") {
                    query += " AND Customer = ?";
                    params.push(customer);
                }

                db.query(query, params, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(result);
                });
            }),
            // Customers query (No changes needed)
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

        const [tripsheetResults, coveringBilledResults, transferBilledResults, individualBilledResults, customerResults] = await Promise.all(queries);

        const combinedResults = [
            ...tripsheetResults,
            ...coveringBilledResults,
            ...transferBilledResults,
            ...individualBilledResults,
            ...customerResults
        ];

        res.status(200).json({
            tripsheetResults,
            coveringBilledResults,
            transferBilledResults,
            individualBilledResults,
            customerResults
        });
    } catch (error) {
        console.error('Failed to fetch data from MySQL:', error);
        res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }
});


// router.get('/getBilledDetails', async (req, res) => {
//     const { customer, fromDate, toDate, department } = req.query;

//     if (!customer || !fromDate || !toDate || !department) {
//         return res.status(400).json({ error: 'Missing required parameters' });
//     }

//     const statusValues = ['Covering_Billed', 'Transfer_Billed', 'Billed'];

//     try {
//         const queries = [
//             new Promise((resolve, reject) => {
//                 let query = "SELECT * FROM tripsheet WHERE tripsheetdate >= DATE_ADD(?, INTERVAL 0 DAY) AND tripsheetdate <= DATE_ADD(?, INTERVAL 1 DAY) AND status IN (?)";
//                 let params = [fromDate, toDate, statusValues];

//                 if (customer !== "All") {
//                     query += " AND customer = ?";
//                     params.push(customer);
//                 }

//                 if (department !== "All") {
//                     query += " AND department = ?";
//                     params.push(department);
//                 }

//                 db.query(query, params, (error, result) => {
//                     if (error) {
//                         return reject(error);
//                     }
//                     resolve(result);
//                 });
//             }),
//             new Promise((resolve, reject) => {
//                 let query = "SELECT InvoiceDate,Customer FROM Group_billing WHERE FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 1 DAY)";
//                 let params = [fromDate, toDate];

//                 if (customer !== "All") {
//                     query += " AND customer = ?";
//                     params.push(customer);
//                 }

//                 db.query(query, params, (error, result) => {
//                     if (error) {
//                         return reject(error);
//                     }
//                     resolve(result);

//                 });
//             }),
//             new Promise((resolve, reject) => {
//                 let query = "SELECT Billdate,Organization_name FROM Transfer_list WHERE FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 1 DAY)";
//                 let params = [fromDate, toDate];

//                 if (customer !== "All") {
//                     query += " AND Organization_name = ?";
//                     params.push(customer);
//                 }

//                 db.query(query, params, (error, result) => {
//                     if (error) {
//                         return reject(error);
//                     }
//                     resolve(result);
//                 });
//             }),
//             new Promise((resolve, reject) => {
//                 let query = "SELECT Bill_Date, Customer FROM Individual_Billing WHERE Bill_Date BETWEEN ? AND ?";
//                 let params = [fromDate, toDate];

//                 if (customer !== "All") {
//                     query += " AND Customer = ?";
//                     params.push(customer);
//                 }

//                 db.query(query, params, (error, result) => {
//                     if (error) {
//                         return reject(error);
//                     }
//                     resolve(result);
//                 });
//             }),
//             new Promise((resolve, reject) => {
//                 let query = "SELECT gstTax, gstnumber, customer FROM customers";
//                 let params = [];

//                 if (customer !== "All") {
//                     query += " WHERE customer = ?";
//                     params.push(customer);
//                 }

//                 db.query(query, params, (error, result) => {
//                     if (error) {
//                         return reject(error);
//                     }
//                     resolve(result);
//                 });
//             })
//         ];

//         const [tripsheetResults, coveringBilledResults, transferBilledResults, individualBilledResults, customerResults] = await Promise.all(queries);

//         const combinedResults = [
//             ...tripsheetResults,
//             ...coveringBilledResults,
//             ...transferBilledResults,
//             ...individualBilledResults,
//             ...customerResults
//         ];

//         // res.status(200).json(combinedResults);
//         res.status(200).json({
//             tripsheetResults,
//             coveringBilledResults,
//             transferBilledResults,
//             individualBilledResults,
//             customerResults
//         });
//     } catch (error) {
//         console.error('Failed to fetch data from MySQL:', error);
//         res.status(500).json({ error: 'Failed to fetch data from MySQL' });
//     }
// });


module.exports = router;