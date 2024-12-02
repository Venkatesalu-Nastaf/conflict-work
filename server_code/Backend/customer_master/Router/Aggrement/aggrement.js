const express = require('express');
const router = express.Router();
const db = require('../../../db');
const multer = require('multer');
const path = require('path');
router.use(express.static('customer_master'));

// add Aggrement database

router.post('/agreementdatas', (req, res) => {
    const customerData = req.body;
    console.log(customerData,"dd")
    db.query('INSERT INTO Aggrement SET ?', customerData, (err, result) => {
        if (err) {
            console.log(err,'ghjjjj');
            
            return res.status(500).json({ error: 'Failed to insert data into MySQL' });
        }
        console.log(result,'yuiiiiiiiii');
        
        return res.status(200).json({ message: 'Data inserted successfully' });
    });
});
// router.get('/Customerdatasfetch', (req, res) => {
//     const sql = 'SELECT  customer,address1, gstnumber FROM customers';
//     db.query(sql, (err, result) => {
//         console.log(err);
        
//         if (err) {
//             return res.status(500).json({ error: "Failed to retrieve data from MySQL" });
//         }
//         console.log(result);
        
//         return res.status(200).json(result);
//     });
// }); 

router.get('/Customerdatasfetch', (req, res) => {
    const sql = `
        SELECT 
            customers.customer, 
            customers.address1, 
            customers.gstnumber, 
            customerOrderdata.orderByEmail,
            customerOrderdata.orderByMobileNo   
        FROM customers
        JOIN customerOrderdata
        ON customers.customer = customerOrderdata.customer
    `;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Failed to retrieve data from MySQL" });
        }
        console.log(result);
        return res.status(200).json(result);
    });
});


router.put('/agreementedit/:id', (req, res) => {
    const email= req.params.id
    const updatedCustomerData = req.body;
    console.log(email,"dddd",updatedCustomerData)
    db.query('UPDATE Aggrement SET ? WHERE id = ?', [updatedCustomerData,email], (err,  result) => {
        if (err) {
            console.log(err,"agg")
            return res.status(500).json({ error: 'Failed to update data in MySQL' });
        }
        console.log(result,"agg")
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        console.log(result,"agg")
        return res.status(200).json({ message: 'Data updated successfully' });
    });
});

// Delete Customer Master data
// Delete Customer Master data
router.delete('/aggreementdeleteid/:id', (req, res) => {
    const id = req.params.id; 

    db.query('DELETE FROM Aggrement WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to delete data from MySQL' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        return res.status(200).json({ message: 'Data deleted successfully' });
    });
});

router.get('/agreementdata', (req, res) => {
    db.query('SELECT * FROM Aggrement', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
        }
        return res.status(200).json(results);
    });
});

module.exports = router;    