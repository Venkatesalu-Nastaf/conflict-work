const express = require('express');
const router = express.Router();
const db = require('../../../db');



/////---image delete --for register ->employee- TO Delete
// TO Delete
router.delete('/image-delete/:filename', (req, res) => {
    const sql = "delete from rigister_employee_doc where fileName=?";
    const fileName = req.params.filename;
    db.query(sql, [fileName], (err, result) => {
        if (err) return res.json({ Message: "Error inside serevre" });
        return res.json(result);
    })
})
// ------------------------
/////---image delete --for register ->supplier-vehicle- TO Delete
// TO Delete
router.delete('/vehicle_documents/:filename', (req, res) => {
    const sql = "delete from vehicle_documents where fileName=?";
    const fileName = req.params.filename;
    db.query(sql, [fileName], (err, result) => {
        if (err) return res.json({ Message: "Error inside serevre" });
        return res.json(result);
    })
})

/////---image delete --for register ->employee- TO Delete
// TO Delete
router.delete('/driver_proof/:filename', (req, res) => {
    const sql = "delete from driver_proof where fileName=?";
    const fileName = req.params.filename;
    db.query(sql, [fileName], (err, result) => {
        if (err) return res.json({ Message: "Error inside serevre" });
        return res.json(result);
    })
})


/////---image delete --for register ->employee- TO Delete
// TO Delete
router.delete('/booking_doc/:filename', (req, res) => {
    const sql = "delete from booking_doc where fileName=?";
    const fileName = req.params.filename;
    db.query(sql, [fileName], (err, result) => {
        if (err) return res.json({ Message: "Error inside serevre" });
        return res.json(result);
    })
})











module.exports = router;