const express = require('express');
const router = express.Router();
const db = require('../../../db');

router.post('/IndividualBill', (req, res) => {
    const IndividualBillData = req.body;
    const tripid = IndividualBillData.Trip_id;
   

    db.query('INSERT INTO Individual_Billing SET ?', IndividualBillData, (err, result) => {
        if (err) {
            console.log("Failed to insert data into MySQL:", err);
            return res.status(500).json({ error: "Failed to insert data into MySQL" });
        }
        if (result.affectedRows >= 1) {
            db.query("UPDATE tripsheet SET status = 'Billed',Billed_Status='Individual_Billed' WHERE tripid = ?", [tripid], (err, updateResult) => {
                if (err) {
                    console.log("Failed to update data into MySQL:", err);
                    return res.status(500).json({ error: "Failed to update data into MySQL" });
                }
                return res.status(200).json({ message: "Data inserted and updated successfully" });
            });
        }
        else {
            return res.status(500).json({ error: "Failed to insert data into MySQL" });
        }
    });
});

module.exports = router;
