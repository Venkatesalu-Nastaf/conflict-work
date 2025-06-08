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

    // console.log(customerData, fromDate, toDate, "Received filter data");

    const individualBillingPromise = new Promise((resolve, reject) => {
        const Individual_BillingQuery = `
            SELECT * FROM Individual_Billing 
            WHERE Customer = ? AND 
            BillReportStatus IS NULL
            AND Bill_Date BETWEEN ? AND ?
        `;
        db.query(Individual_BillingQuery, [CustomerName, fromDate, toDate], (err, result) => {
            if (err) return reject('Error fetching individual billing details');
            // console.log(result,"iiiiiiiiiiiiiiiiiiiiiiiiii");
            
            resolve(result);
        });
    });

    const groupBillingPromise = new Promise((resolve, reject) => {
        const Group_BillingQuery = `
            SELECT * FROM Group_billing 
            WHERE Customer = ? AND
            BillReportStatus IS NULL
            AND InvoiceDate BETWEEN ? AND ?
        `;
        db.query(Group_BillingQuery, [CustomerName, fromDate, toDate], async (error, result) => {
            if (error){
                // console.log(error,"error billing groupdetailssssssssssssssssssss");
                
                return reject('Error fetching group billing details');
                

            }

            try {
                const updatedResult = (
                    await Promise.all(
                        result.map(async ({ id, ...item }) => {
                            const tripIds = item.Trip_id.split(',').map(id => id.trim());

                            const invoiceRows = await new Promise((res, rej) => {
                                db.query(
                                    "SELECT Invoice_No FROM GroupBillinginvoice_no WHERE Referenceno = ?",
                                    [item.ReferenceNo],
                                    (err, rows) => (err ? rej(err) : res(rows))
                                );
                            });

                            const amountResult = await new Promise((res, rej) => {
                                db.query(
                                    "SELECT tripid, totalcalcAmount AS totalAmount FROM tripsheet WHERE tripid IN (?)",
                                    [tripIds],
                                    (err, rows) => (err ? rej(err) : res(rows))
                                );
                            });

                            const repeatedResults = [];
                            for (let i = 0; i < amountResult.length; i++) {
                                repeatedResults.push({
                                    ...item,
                                    Trip_id: amountResult[i].tripid.toString(),
                                    Amount: amountResult[i].totalAmount || 0,
                                    Invoice_no: invoiceRows[i] ? invoiceRows[i].Invoice_No : null,
                                });
                            }

                            return repeatedResults;
                        })
                    )
                ).flat();
// console.log(updatedResult,"ttttttttttttttttttttttttttttttttttttttttttttttttttt");

                resolve(updatedResult);
            } catch (err) {
                // console.error(err);
                reject('Error processing group billing result');
            }
        });
    });

    const transferListPromise = new Promise((resolve, reject) => {
        const TransferlistQuery = `
            SELECT * FROM Transfer_list 
            WHERE Organization_name = ? AND 
            BillReportStatus IS NULL
            AND Billdate BETWEEN ? AND ?
        `;
        db.query(TransferlistQuery, [CustomerName, fromDate, toDate], (err, result) => {
            if (err) return reject('Error fetching transfer list details');
            // console.log(result,"rrrrrrrrrrrrrrrrrrr");
            
            resolve(result);
        });
    });

    Promise.all([individualBillingPromise, groupBillingPromise, transferListPromise])
    .then(([individualBilling, groupBilling, transferListBilling]) => {
        // Normalize individual billing
        const normalizedIndividual = individualBilling.map(item => ({
            ...item,
            Invoice_no: item.Invoice_no || item.Invoice_No || null,
            Customer: item.Customer,
            InvoiceDate: item.Bill_Date,
        }));

        // Normalize group billing
        const normalizedGroup = groupBilling.map(item => ({
            ...item,
            Invoice_no: item.Invoice_no || item.Invoice_No || null,
            Customer: item.Customer,
            InvoiceDate: item.InvoivceDate,
        }));

        // Normalize transfer list
        const normalizedTransfer = transferListBilling.map(item => ({
            ...item,
            Invoice_no: item.Invoice_no || item.Invoice_No || null,
            Customer: item.Organization_name,
            InvoiceDate: item.Billdate,
        }));

        // Combine into one array
        const allBills = [
            ...normalizedIndividual,
            ...normalizedGroup,
            ...normalizedTransfer
        ];

        // Add incrementing ID starting from 1
        const allBillsWithId = allBills.map((item, index) => ({
            id: index + 1,
            ...item
        }));

        res.status(200).json(allBillsWithId); // ✅ returns [{ id: 1, ... }]
    })
    .catch((error) => {
        // console.error(error);
        res.status(500).json({ error });
    });
});


router.post('/getAllBills', (req, res) => {
    const { customerData } = req.body;
    const { fromDate, toDate, CustomerName } = customerData;

    // console.log(customerData, fromDate, toDate, "Received filter data");
    const AccountQuery = `SELECT Account FROM BillWiseReceipt WHERE CustomerName = ?`;
    const individualBillingPromise = new Promise((resolve, reject) => {
        const Individual_BillingQuery = `
            SELECT * FROM Individual_Billing 
            WHERE Customer = ? 
            AND Bill_Date BETWEEN ? AND ?
        `;
        db.query(Individual_BillingQuery, [CustomerName, fromDate, toDate], (err, result) => {
            if (err) return reject('Error fetching individual billing details');
            // console.log(result,"iiiiiiiiiiiiiiiiiiiiiiiiii");
            
            resolve(result);
        });
    });

    const groupBillingPromise = new Promise((resolve, reject) => {
        const Group_BillingQuery = `
            SELECT * FROM Group_billing 
            WHERE Customer = ? 
            AND InvoiceDate BETWEEN ? AND ?
        `;
        db.query(Group_BillingQuery, [CustomerName, fromDate, toDate], async (error, result) => {
            if (error){
                // console.log(error,"error billing groupdetailssssssssssssssssssss");
                
                return reject('Error fetching group billing details');
                

            }

            try {
                const updatedResult = (
                    await Promise.all(
                        result.map(async ({ id, ...item }) => {
                            const tripIds = item.Trip_id.split(',').map(id => id.trim());

                            const invoiceRows = await new Promise((res, rej) => {
                                db.query(
                                    "SELECT Invoice_No FROM GroupBillinginvoice_no WHERE Referenceno = ?",
                                    [item.ReferenceNo],
                                    (err, rows) => (err ? rej(err) : res(rows))
                                );
                            });

                            const amountResult = await new Promise((res, rej) => {
                                db.query(
                                    "SELECT tripid, totalcalcAmount AS totalAmount FROM tripsheet WHERE tripid IN (?)",
                                    [tripIds],
                                    (err, rows) => (err ? rej(err) : res(rows))
                                );
                            });

                            const repeatedResults = [];
                            for (let i = 0; i < amountResult.length; i++) {
                                repeatedResults.push({
                                    ...item,
                                    Trip_id: amountResult[i].tripid.toString(),
                                    Amount: amountResult[i].totalAmount || 0,
                                    Invoice_no: invoiceRows[i] ? invoiceRows[i].Invoice_No : null,
                                });
                            }

                            return repeatedResults;
                        })
                    )
                ).flat();

                resolve(updatedResult);
            } catch (err) {
                // console.error(err);
                reject('Error processing group billing result');
            }
        });
    });

    const transferListPromise = new Promise((resolve, reject) => {
        const TransferlistQuery = `
            SELECT * FROM Transfer_list 
            WHERE Organization_name = ? 
            AND Billdate BETWEEN ? AND ?
        `;
        db.query(TransferlistQuery, [CustomerName, fromDate, toDate], (err, result) => {
            if (err) return reject('Error fetching transfer list details');
            // console.log(result,"rrrrrrrrrrrrrrrrrrr");
            
            resolve(result);
        });
    });
    const accountPromise = new Promise((resolve, reject) => {
        db.query(AccountQuery, [CustomerName], (err, result) => {
            if (err) {
                console.log(err, "error fetching accounts");
                return reject('Error fetching account details');
            }
            resolve(result);
        });
    });

    Promise.all([individualBillingPromise, groupBillingPromise, transferListPromise,accountPromise])
    .then(([individualBilling, groupBilling, transferListBilling,accountDetails]) => {
        // Normalize individual billing

        const normalizedIndividual = individualBilling.map(item => ({
            ...item,
            Invoice_no: item.Invoice_no || item.Invoice_No || null,
            Customer: item.Customer,
            InvoiceDate: item.Bill_Date,
        }));

        // Normalize group billing
        const normalizedGroup = groupBilling.map(item => ({
            ...item,
            Invoice_no: item.Invoice_no || item.Invoice_No || null,
            Customer: item.Customer,
            InvoiceDate: item.InvoiceDate,
        }));

        // Normalize transfer list
        const normalizedTransfer = transferListBilling.map(item => ({
            ...item,
            Invoice_no: item.Invoice_no || item.Invoice_No || null,
            Customer: item.Organization_name,
            InvoiceDate: item.Billdate,
        }));
        const AccountDetails = accountDetails.map(item =>({
            Account : item.Account
        }))

        // Combine into one array
        const allBills = [
            ...normalizedIndividual,
            ...normalizedGroup,
            ...normalizedTransfer,
        ];        
        const accountValue = accountDetails.length > 0 ? accountDetails[0].Account : null;

        // Add incrementing ID starting from 1
        const allBillsWithId = allBills.map((item, index) => ({
            id: index + 1,
            Account: accountValue,
            ...item,
        }));
        res.status(200).json(allBillsWithId); // ✅ returns [{ id: 1, ... }]
    })
    .catch((error) => {
        // console.error(error);
        res.status(500).json({ error });
    });



    // Promise.all([individualBillingPromise, groupBillingPromise, transferListPromise])
    //     .then(([individualBilling, groupBilling, transferListBilling]) => {
    //         res.status(200).json({
    //             individualBilling,
    //             groupBilling,
    //             transferListBilling
    //         });
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //         res.status(500).json({ error });
    //     });
});



// router.post('/getAllBills', (req, res) => {
//     const { customerData } = req.body;
//     const { fromDate, toDate, CustomerName } = customerData;

//     let query;
//     let params;

//     if (CustomerName === "All") {
//         // Fetch all records without filtering by CustomerName
//         query = "SELECT * FROM BillWiseReceipt WHERE BillDate BETWEEN ? AND ?";
//         params = [fromDate, toDate];
//     } else {
//         // Filter by CustomerName
//         query = "SELECT * FROM BillWiseReceipt WHERE CustomerName = ? AND BillDate BETWEEN ? AND ?";
//         params = [CustomerName, fromDate, toDate];
//     }

//     db.query(query, params, (error, result) => {
//         if (error) {
//             console.log(error, "error");
//             return res.status(500).json({ error: 'Database query error' });
//         }
//         return res.status(200).json(result);
//     });
// });



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
