const express = require('express');
const router = express.Router();
const db = require('../../../db');

router.get('/customerBilledDetails', (req, res) => {
    const { customer } = req.query;

    const individualBillingPromise = new Promise((resolve, reject) => {
        db.query("SELECT * FROM Individual_Billing WHERE Customer = ? AND Status='Billed' AND BillReportStatus is null", [customer], (error, result) => {
            if (error) {
                return reject('Error fetching individual billing details');
            }
            resolve(result);

        });
    });

    const groupBillingPromise = new Promise((resolve, reject) => {
        db.query("SELECT * FROM Group_billing WHERE Customer = ? AND Status='Billed' AND BillReportStatus  is null", [customer], (error, result) => {
            if (error) {
                return reject('Error fetching group billing details');
            }
            resolve(result);
            console.log(result, 'result groupbilling');
        });
    });

    const transferListPromise = new Promise((resolve, reject) => {
        db.query("SELECT * FROM Transfer_list WHERE Organization_name = ? AND Status='Billed' AND BillReportStatus is null", [customer], (error, result) => {
            if (error) {
                return reject('Error fetching transfer list details');
            }
            resolve(result);
        });
    });

    Promise.all([individualBillingPromise, groupBillingPromise, transferListPromise])
        .then(([individualBilling, groupBilling, transferListBilling]) => {
            res.status(200).json({
                individualBilling,
                groupBilling,
                transferListBilling
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error });
        });
});

// get Trip Advance || Received Amount
router.get('/getTripAdvance', (req, res) => {
    const { Tripid } = req.query;
    console.log(Tripid, 'tripidadvance');

    const tripidArray = Array.isArray(Tripid) ? Tripid.map(Number) : [Number(Tripid)];
    db.query("SELECT tripid,customeradvance FROM tripsheet WHERE tripid IN (?)", [tripidArray], (error, result) => {
        if (error) {
            console.log(error, 'error');
            return res.status(500).json({ error: 'Database query error' });
        }
        return res.status(200).json(result);
    });

})

router.post('/addBillAmountReceived', (req, res) => {
    const totalBillReport = req.body;
    const timestamp = Date.now();
    const uniqueId = timestamp % 1000000;
    const formattedUniqueId = uniqueId.toString().padStart(6, '0');

    totalBillReport.uniqueid = formattedUniqueId;
    console.log(totalBillReport, 'billwiseeee');

    db.query("INSERT INTO BillWiseReceipt SET ?", [totalBillReport], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Failed to insert data into MySQL' });
        }
        return res.status(201).json({ message: 'Data inserted successfully', success: true });
    });
});

router.post('/updateInvoiceStatus', async (req, res) => {
    const { invoiceNo } = req.body; // Expecting an array of invoice numbers
    console.log(invoiceNo, 'iiiiiiiiii');
    // Validate input
    if (!Array.isArray(invoiceNo) || invoiceNo.length === 0) {
        return res.status(400).json({ error: 'Invalid input: Invoice number(s) are required' });
    }

    // Prepare the queries
    const updateTransferTable = `UPDATE Transfer_list SET BillReportStatus = "Success" WHERE Grouptrip_id IN (?)`;
    const updateGroupTable = `UPDATE Group_billing SET BillReportStatus = "Success" WHERE ReferenceNo IN (?)`;
    const updateIndividualTable = `UPDATE Individual_Billing SET BillReportStatus = "Success" WHERE Invoice_No IN (?)`;

    try {
        // Use a transaction to ensure all updates are done together
        await db.beginTransaction();

        // Execute the three update queries for the same set of invoiceNos
        await new Promise((resolve, reject) => {
            db.query(updateTransferTable, [invoiceNo], (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });

        // await new Promise((resolve, reject) => {
        //     db.query(updateGroupTable, [invoiceNo], (error, result) => {
        //         if (error) {
        //             return reject(error);
        //         }
        //         resolve(result);
        //     });
        // });
        await new Promise((resolve, reject) => {
            // Convert `invoiceNo` array to a stringified format for SQL `IN` clause
            const formattedInvoiceNos = invoiceNo?.map(num => `'${num}'`).join(',');
            const query = `UPDATE Group_billing SET BillReportStatus = "Success" WHERE ReferenceNo IN (${formattedInvoiceNos})`;

            db.query(query, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });

        await new Promise((resolve, reject) => {
            db.query(updateIndividualTable, [invoiceNo], (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            });
        });

        // Commit transaction
        await db.commit();
        res.status(200).json({ message: 'Invoice status updated successfully' });
    } catch (error) {
        // Rollback transaction in case of an error
        await db.rollback();
        res.status(500).json({ error: 'Failed to update invoice status', details: error.message });
    }
});



router.post('/addCollect', (req, res) => {
    const { collectedAmount, bankname } = req.body;
    if (!bankname || !collectedAmount) {
        return res.status(400).json({ message: 'Bank name and collected amount are required' });
    }

    // First, fetch the current totalin value from the database
    db.query('SELECT totalin,capital FROM bankaccountdetails WHERE bankname = ?', [bankname], (err, results) => {
        if (err) {
            console.log('Error fetching totalin:', err);
            return res.status(500).json({ message: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Bank account not found' });
        }

        // const currentTotalin = results[0].totalin;
        // const updatedTotalin = parseInt(currentTotalin) + parseInt(collectedAmount); // Add the collected amount to the current totalin
        // const totalcapital = parseInt(collectedAmount) + parseInt(results[0].capital)
        const currentTotalin = results[0].totalin || 0;
        const capitalAmount = results[0].capital || 0;
        const updatedTotalin = parseInt(currentTotalin) + parseInt(collectedAmount); // Add the collected amount to the current totalin
        const totalcapital = parseInt(collectedAmount) + parseInt(capitalAmount)

        // Now, update the totalin value in the database
        const updateQuery = "UPDATE bankaccountdetails SET totalin = ?,capital=? WHERE bankname = ?";
        db.query(updateQuery, [updatedTotalin, totalcapital, bankname], (err, result) => {
            if (err) {
                console.error('Error updating totalin:', err);
                return res.status(500).json({ message: 'Database error' });
            }
            res.status(200).json({ message: 'Totalin value updated successfully', result });
        });
    });
});


// get pending amount in BillWiseReceipt
router.post('/getBalanceAmount', (req, res) => {
    const { organization } = req.body; // Extracting from the request body

    // Convert TotalBalance to a numeric type before comparing
    const query = `
        SELECT * 
        FROM BillWiseReceipt 
        WHERE CustomerName = ? 
        AND CAST(TotalBalance AS DECIMAL(10, 2)) != 0
    `;

    db.query(query, [organization], (error, result) => {
        if (error) {
            console.log(error, 'error');
            return res.status(500).json({ error: 'Database query error' });
        }
        return res.status(200).json(result);
    });
});

// update BillwiseReport to get balance amount
router.put('/updateBalanceAmount', async (req, res) => {
    const { uniqueVoucherId, finalTotalColletedAmount,
        finalTotalBalanceAmount, finalTdsPlusCollected } = req.body;
    const updateQuery = `
        UPDATE BillWiseReceipt
        SET Collected = ?, TotalBalance = ?,TotalCollected = ?
        WHERE voucherID IN (?);
    `;
    db.query(
        updateQuery,
        [finalTotalColletedAmount, finalTotalBalanceAmount, finalTdsPlusCollected, uniqueVoucherId],
        (error, result) => {
            if (error) {
                console.error('Error updating balance:', error);
                return res.status(500).json({ error: 'Database update failed' });
            }

            console.log('Update successful:', result);
            res.status(200).json({ message: 'Balance updated successfully', result });
        }
    );


    // Validate input
    // if (!Array.isArray(uniqueVoucherId) || !Array.isArray(TotalCollectAmount) || uniqueVoucherId.length !== TotalCollectAmount.length) {
    //     return res.status(400).json({ error: 'Invalid input data' });
    // }

    // // Prepare the query
    // const updateQuery = `
    //     UPDATE BillWiseReceipt
    //     SET Collected = ?, TotalBalance = ?
    //     WHERE voucherID = ?;
    // `;

    // try {
    //     // Use a transaction to ensure all updates are done together
    //     await db.beginTransaction();

    //     for (let i = 0; i < uniqueVoucherId.length; i++) {
    //         const voucherId = uniqueVoucherId[i];
    //         const collectedAmount = TotalCollectAmount[i];

    //         const totalBalance = '0';

    //         await new Promise((resolve, reject) => {
    //             db.query(updateQuery, [collectedAmount, totalBalance, voucherId], (error, result) => {
    //                 if (error) {
    //                     return reject(error);
    //                 }
    //                 resolve(result);
    //             });
    //         });
    //     }

    //     // Commit transaction
    //     await db.commit();
    //     res.status(200).json({ message: 'Balance amounts updated successfully' });
    // } catch (error) {
    //     // Rollback transaction in case of an error
    //     await db.rollback();
    //     res.status(500).json({ error: 'Failed to update balance amounts', details: error.message });
    // }
});

// router.put('/updateBalanceAmount',(req,res)=>{
//     const { uniqueVoucherId,TotalCollectAmount } = req.body;
//     console.log(uniqueVoucherId,TotalCollectAmount,'ajay');
//     const TotalBalance = '0';
//     // db.query("UPDATE BillWiseReceipt SET  Collected,TotalBalance  WHERE voucherID = ?",[uniqueVoucherId],(error,result)=>{
//     //     if(error){
//     //         console.log(error,'error');

//     //     }
//     // })

// })


router.delete('/deleteBillWiseReport', (req, res) => {
    const { BillNo } = req.body; // Assumes BillNo is an array

    if (!Array.isArray(BillNo) || BillNo.length === 0) {
        return res.status(400).json({ error: 'BillNo must be a non-empty array' });
    }

    // Construct placeholders for the array
    const placeholders = BillNo.map(() => '?').join(',');

    // Perform delete operations for each table
    const deleteQueries = [
        "DELETE FROM Transfer_list WHERE Invoice_no IN (" + placeholders + ")",
        "DELETE FROM Group_billing WHERE InvoiceNo IN (" + placeholders + ")",
        "DELETE FROM Individual_Billing WHERE Invoice_No IN (" + placeholders + ")"
    ];

    const deletePromises = deleteQueries.map(query => {
        return new Promise((resolve, reject) => {
            db.query(query, BillNo, (err, result) => {
                if (err) {
                    return reject({ error: 'Failed to delete data from MySQL' });
                }
                if (result.affectedRows === 0) {
                    return resolve({ message: 'No records deleted' });
                }
                resolve({ message: 'Data deleted successfully' });
            });
        });
    });

    Promise.all(deletePromises)
        .then(results => res.status(200).json({ messages: results }))
        .catch(error => res.status(500).json(error));
});


module.exports = router;
