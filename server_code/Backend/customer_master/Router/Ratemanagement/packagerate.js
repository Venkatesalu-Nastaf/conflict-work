const express = require('express');
const router = express.Router();
const db = require('../../../db');



// // Add Rate Management database--------------------------------------------------------

// router.post('/ratemanagement-add', (req, res) => {
//     const bookDataArray = req.body; // Assuming req.body is an array of objects
// console.log(bookDataArray,"bookarray");

//     // Check if req.body is an array
//     if (!Array.isArray(bookDataArray)) {
//         return res.status(400).json({ error: "Request body must be an array" });
//     }

//     // Insert each object in the array as a separate row in the database
//     const insertQueries = bookDataArray.map(bookData => {
//         return new Promise((resolve, reject) => {
//             db.query('INSERT INTO ratemanagement SET ?', bookData, (err, result) => {
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(result);
//                 }
//             });
//         });
//     });

//     // Execute all insert queries concurrently
//     Promise.all(insertQueries)
//         .then(() => {
//             return res.status(200).json({ message: "Data inserted successfully" });
//         })
//         .catch(err => {
//             console.error(err);
//             return res.status(500).json({ error: "Failed to insert data into MySQL" });
//         });
// });
router.post('/ratemanagement-add', async (req, res) => {
    const bookDataArray = req.body; 
    console.log(bookDataArray, "bookarray");

    // Validate input
    if (!Array.isArray(bookDataArray) || bookDataArray.length === 0) {
        return res.status(400).json({ error: "Request body must be a non-empty array" });
    }

    try {
        const insertResults = [];
        const insertErrors = [];

        for (const bookData of bookDataArray) {
            try {
                const result = await new Promise((resolve, reject) => {
                    db.query('INSERT INTO ratemanagement SET ?', bookData, (err, result) => {
                        if (err) reject(err);
                        else resolve(result);
                    });
                });
                insertResults.push(result);
            } catch (error) {
                console.error("Insert error:", error);
                insertErrors.push({ data: bookData, error: error.message });
            }
        }

        return res.status(200).json({
            message: "Data processed",
            successCount: insertResults.length,
            failureCount: insertErrors.length,
            errors: insertErrors,
        });

    } catch (err) {
        console.error("Unexpected server error:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});


// delete Rate Management data-------------------------------------------------------------
router.delete('/ratemanagement/:id', (req, res) => {
    const customerid = req.params.id;
    const data = customerid?.split(',').map(Number);
    // console.log(data,"data",typeof(data))
    // console.log(req.params.id,"kk",typeof(req.params.id))
    // db.query('DELETE FROM ratemanagement1 WHERE id = ?', customerid, (err, result) => {
        db.query('DELETE FROM ratemanagement WHERE id in (?)',[data], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to delete data from MySQL" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Customer not found" });
        }
        return res.status(200).json({ message: "Data deleted successfully" });
    });
});
// update Rate Management details
router.put('/ratemanagement-edit/:id', (req, res) => {
    const customerId = req.params.id;
    const updatedCustomerData = req.body;

    db.query('UPDATE ratemanagement SET ? WHERE id = ?', [updatedCustomerData, customerId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to update data in MySQL" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Customer not found" });
        }
        return res.status(200).json({ message: "Data updated successfully" });
    });
});
// collect data for Rate Management table
router.get('/ratemanagement', (req, res) => {
    db.query('SELECT * FROM ratemanagement', (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch data from MySQL" });
        }
        return res.status(200).json(results);
    });
});


router.get('/ratemanagementdatavalidityfromratetype/:customer/:ratetype', (req, res) => {
    const  customer=req.params.customer;
    const ratetype=req.params.ratetype;
    console.log(customer,ratetype,"ffff")
    db.query('SELECT starttime,closetime FROM ratetype where ratetype=? and ratename=?',[customer,ratetype],(err, results) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch data from MySQL" });
        }
        console.log(results,"ss")
        return res.status(200).json(results);
    });
});

// router.get('/ratemanagement-show', (req, res) => {
//     const { rateType, orgName, vehicleType,stations } = req.query
//     console.log("data", rateType, orgName, vehicleType)
//     let sql = 'SELECT * FROM ratemanagement where 1=1'
//     let params = []

//     if (rateType) {
//         sql += ' and ratetype=?'
//         params.push(rateType)
//     }

//     if (orgName) {
//         sql += ' and OrganizationName=?'
//         params.push(orgName)
//     }

//     if (vehicleType) {
//         sql += ' and vehicleName=?'
//         params.push(vehicleType)
//     }
//     if (stations) {
//         sql += ' and stations=?'
//         params.push(stations)
//     }

router.get('/ratemanagement-show', (req, res) => {
    const { rateType, orgName, vehicleType, stations } = req.query;
    console.log("data", rateType, orgName, vehicleType);

    let sql = 'SELECT * FROM ratemanagement WHERE 1=1';
    let params = [];

    if (rateType) {
        sql += ' AND ratetype=?';
        params.push(rateType);
    }

    if (orgName) {
        sql += ' AND OrganizationName=?';
        params.push(orgName);
    }

    if (vehicleType) {
        sql += ' AND vehicleName=?';
        params.push(vehicleType);
    }

    if (stations === 'All') {
    
        sql += ''; 
    } else if (stations) {
        // If specific stations are provided, filter by those stations
        sql += ' AND stations=?';
        params.push(stations);
    }
    db.query(sql, params, (err, results) => {
        if (err) {
            console.log("error", err)
            return res.status(500).json({ error: "Failed to fetch data from MySQL" });
        }
        // console.log("results", results)
        return res.status(200).json(results);
    });
});

module.exports = router;