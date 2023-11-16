const express = require('express');
const router = express.Router();
const db = require('../../../../db');

router.post('/bankdetails', (req, res) => {
    const customerData = req.body;
    db.query('INSERT INTO bankaccountdetails SET ?', customerData, (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            return res.status(500).json({ error: 'Failed to insert data into MySQL' });
        }
        console.log('Data inserted into MySQL');
        return res.status(200).json({ message: 'Data inserted successfully' });
    });
});

router.get('/getbankdetails', (req, res) => {
    db.query('SELECT * FROM bankaccountdetails', (err, rows) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
        }
        console.log('Data fetched from MySQL');
        return res.status(200).json(rows);
    });
});

router.get('/bankoptions', (req, res) => {
    db.query('SELECT DISTINCT bankname2 FROM bankaccountdetails', (err, rows) => {
        if (err) {
            console.error('Error fetching bank names from MySQL:', err);
            return res.status(500).json({ error: 'Failed to fetch bank names from MySQL' });
        }
        const bankNames = rows.map((row) => row.bankname2); // Corrected column name
        console.log(bankNames);
        return res.status(200).json(bankNames);
    });
});


// Update Customer Master details
// router.put('/updatebankdetails', (req, res) => {
//     // const customerId = req.params.customerId;
//     const updatedCustomerData = req.body;
//     db.query('UPDATE bankaccountdetails SET ? ', updatedCustomerData, (err, result) => {
//         if (err) {
//             console.error('Error updating data in MySQL:', err);
//             return res.status(500).json({ error: 'Failed to update data in MySQL' });
//         }
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ error: 'Customer not found' });
//         }
//         console.log('Data updated in MySQL');
//         return res.status(200).json({ message: 'Data updated successfully' });
//     });
// });
// router.put('/updatebankdetails/:editingIndex', (req, res) => {
//     // const editingIndex = req.params.editingIndex;
//     const updatedBankData = req.body;
//     const updateBankQuery = "UPDATE bankaccountdetails SET `capital` = ?, `AccountType` = ?, `bankname2` = ?, `netbalance` = ?, `totalin` = ?, `totalout` = ? WHERE id = ?";

//     db.query(updateBankQuery, updatedBankData, (err, result) => {
//         if (err) {
//             console.error('Error updating data in MySQL:', err);
//             return res.status(500).json({ error: 'Failed to update data in MySQL' });
//         }
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ error: 'Bank account not found' });
//         }
//         console.log('Data updated in MySQL');
//         return res.status(200).json({ message: 'Data updated successfully' });
//     });
// });
//update bank details
// router.put('/updatebankdetails/:id', (req, res) => {
//     const driverid = req.params.id;
//     const { bankname2, netbalance, totalin, totalout } = req.body;

//     // console.log('Received update request for bankname2:', bankname2);
//     console.log('Received data for update: bankname2:', bankname2, 'netbalance:', netbalance, 'totalin:', totalin, 'totalout:', totalout, 'id:', id);

//     const query = ('UPDATE bankaccountdetails SET bankname2 = ?, netbalance = ?, totalin = ?, totalout = ? WHERE id = ?', driverid);
//     db.query(query, [bankname2, netbalance, totalin, totalout, id], (err, result) => {
//         if (err) {
//             res.status(500).json({ error: 'Error updating bank account' });
//         } else {
//             res.json({ message: 'Bank account updated successfully' });
//         }
//     });
// });

router.put('/updatebankdetails/:id', (req, res) => {
    const driverid = req.params.id;
    const { bankname2, netbalance, totalin, totalout } = req.body;

    // console.log('Received update request for bankname2:', bankname2);
    console.log('Received data for update: bankname2:', bankname2, 'netbalance:', netbalance, 'totalin:', totalin, 'totalout:', totalout, 'id:', driverid);

    const query = 'UPDATE bankaccountdetails SET bankname2 = ?, netbalance = ?, totalin = ?, totalout = ? WHERE id = ?';
    db.query(query, [bankname2, netbalance, totalin, totalout, driverid], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error updating bank account' });
        } else {
            res.json({ message: 'Bank account updated successfully' });
        }
    });
});


//delete bank account
router.delete('/deletebankdetails/:id', (req, res) => {
    const idToDelete = req.params.id;
    console.log(idToDelete);
    const query = 'DELETE FROM bankaccountdetails WHERE id = ?';
    db.query(query, [idToDelete], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error deleting bank account' });
        } else {
            res.json({ message: 'Bank account deleted successfully' });
        }
    });
});

module.exports = router;