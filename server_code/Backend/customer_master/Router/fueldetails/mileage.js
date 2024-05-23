const express = require('express');
const router = express.Router();
const db = require('../../../db');

// Add Fuel Details database
router.post('/fueldetails', (req, res) => {
    const bookData = req.body;
    db.query('INSERT INTO fueldetails SET ?', bookData, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Failed to insert data into MySQL" });
      }
      return res.status(200).json({ message: "Data inserted successfully" });
    });
  });
  // delete Fuel Details data
  router.delete('/fueldetails/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM fueldetails WHERE id = ?', id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Failed to delete data from MySQL" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Customer not found" });
      }
      return res.status(200).json({ message: "Data deleted successfully" });
    });
  });
  // update Fuel Details
  router.put('/fueldetails/:id', (req, res) => {
    const id = req.params.id;
    const updatedCustomerData = req.body;
    db.query('UPDATE fueldetails SET ? WHERE id = ?', [updatedCustomerData, id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Failed to update data in MySQL" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Customer not found" });
      }
      return res.status(200).json({ message: "Data updated successfully" });
    });
  });
  // collect data for Fuel Details table
  router.get('/fueldetails', (req, res) => {
    db.query('SELECT * FROM fueldetails', (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Failed to fetch data from MySQL" });
      }
      return res.status(200).json(results);
    });
  });
  // End Fuel Details database

  

module.exports = router;