const express = require('express');
const router = express.Router();
const db = require('../../../db');

// add driver master database
router.post('/drivermaster', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO drivermaster SET ?', bookData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});
// delete driver master data
router.delete('/drivermaster/:driverid', (req, res) => {
  const driverid = req.params.driverid;

  db.query('DELETE FROM drivermaster WHERE driverid = ?', driverid, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete data from MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    return res.status(200).json({ message: "Data deleted successfully" });
  });
});
// update driver master details
router.put('/drivermaster/:driverid', (req, res) => {
  const driverid = req.params.driverid;
  const updatedCustomerData = req.body;
  db.query('UPDATE drivermaster SET ? WHERE driverid = ?', [updatedCustomerData, driverid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update data in MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    return res.status(200).json({ message: "Data updated successfully" });
  });
});
// collect data for driver master table
router.get('/drivermaster', (req, res) => {
  db.query('SELECT * FROM drivermaster', (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});
// End driver master database

module.exports = router;
