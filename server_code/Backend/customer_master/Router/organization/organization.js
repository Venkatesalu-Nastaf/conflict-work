const express = require('express');
const router = express.Router();
const db = require('../../../db');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
const cors = require('cors'); // Import the cors middleware

router.use(cors());
// router.use(express.static('customer_master'));

// Add Customer Master database
router.post('/addcompany', (req, res) => {
    const organizationData = req.body;
    db.query('INSERT INTO organizationdetails SET ?', organizationData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to insert data into MySQL' });
        }
        return res.status(200).json({ message: 'Data inserted successfully' });
    });
});
//for get company details
router.get('/organizationdata', (req, res) => {

    db.query('SELECT * FROM organizationdetails', (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
        }
        
        if (result.length === 0) {
            return res.status(404).json({ error: 'Route data not found' });
        }
        const routeData = result;
        return res.status(200).json(routeData);
    });
});

router.get('/organisationdataforsendingemail', (req, res) => {
    db.query( 'SELECT EmailApp_Password as Email_Password, Sender_Mail as Sender_Email FROM usercreation WHERE EmailApp_Password IS NOT NULL AND EmailApp_Password != "" AND Sender_Mail IS NOT NULL AND Sender_Mail != ""', (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Route data not found' });
        }
        return res.status(200).json(result);
    });
})

router.get('/organisationpdfdata', (req, res) => {
    db.query('SELECT * FROM organizationdetails ', (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Route data not found' });
        }
        return res.status(200).json(result);
    });

})


router.put('/companyupdate/:id', (req, res) => {
    const id = req.params.id;
    // console.log(id, "checking this value");
    
    const updatedCustomerData = req.body;

    // console.log(updatedCustomerData,"checking updation");
    
    db.query('UPDATE organizationdetails SET ? WHERE id = ?', [updatedCustomerData, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to update data in MySQL" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Customer not found" });
        }
        return res.status(200).json({ message: "Data updated successfully" });
    });
});


// router.delete('/companydelete/:organizationname', (req, res) => {
//     const organizationname = req.params.organizationname;
//     db.query('DELETE FROM tripsheetupload WHERE organizationname = ?', organizationname, (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: "Failed to delete data from MySQL" });
//         }
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ error: "Customer not found" });
//         }
//         return res.status(200).json({ message: "Data deleted successfully" });
//     });
// });


//----------------------------------logo upload


// router.put('/logo-base64/:organizationname', (req, res) => {
//     const organizationN_Name = req.params.organizationname;
//     const { data } = req.body;

//     // Check if the user profile already exists
//     const checkIfExistsQuery = `SELECT * FROM organisation_logo WHERE organisation_name = ?`;
//     db.query(checkIfExistsQuery, [organizationN_Name], (err, rows) => {
//         if (err) {
//             return res.status(500).json({ Message: "Error checking profile existence", err });
//         }

//         // Profile already exists, update the record
//         if (rows.length > 0) {


//             const updateQuery = `UPDATE organisation_logo SET fileName = ? WHERE organisation_name = ?`;
//             db.query(updateQuery, [data, organizationN_Name], (err, result) => {
//                 if (err) {
//                     return res.status(500).json({ Message: "Error updating profile picture", err });
//                 }
//                 return res.status(200).json({ Status: "success" });
//             });
//         } else {
//             // Profile doesn't exist, insert a new record
//             const insertQuery = `INSERT INTO organisation_logo (organisation_name, fileName) VALUES (?, ?)`;
//             db.query(insertQuery, [organizationN_Name, data], (err, result) => {
//                 if (err) {
//                     return res.status(500).json({ Message: "Error inserting profile picture", err });
//                 }
//                 return res.status(200).json({ Status: "success" });
//             });
//         }
//     });
// });



//getting logo image

// router.get('/logo-view/:organizationname', (req, res) => {
//     const organization_Name = req.params.organizationname
//     const sql = 'select * from organisation_logo where organisation_name=?';
//     db.query(sql, [organization_Name], (err, result) => {
//         if (err) return res.json({ message: "error" })
//         return res.json(result);
//     })
// })

// fetching base64 image 
router.get("/fetchorg-logo", (req, res) => {
    const sql = 'select * from organizationdetails';
    db.query(sql, (err, result) => {
        if (err) return res.json({ message: "error fetching logo" })
        return res.json(result)
    })
})
//----------------------------------logo upload

module.exports = router;