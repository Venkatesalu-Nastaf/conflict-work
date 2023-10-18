const express = require('express');
const router = express.Router();
const db = require('../../../db');

// Add Billing database
router.post('/billing', (req, res) => {
    const bookData = req.body;
    db.query('INSERT INTO billing SET ?', bookData, (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        return res.status(500).json({ error: "Failed to insert data into MySQL" });
      }
      console.log('Data inserted into MySQL');
      return res.status(200).json({ message: "Data inserted successfully" });
    });
  });
  // delete Billing data
  router.delete('/billing/:tripid', (req, res) => {
    const tripid = req.params.tripid;
    console.log('tripid:', tripid); // Log the Billing
    console.log('DELETE query:', 'DELETE FROM billing WHERE tripid = ?', tripid);
    db.query('DELETE FROM billing WHERE tripid = ?', tripid, (err, result) => {
      if (err) {
        console.error('Error deleting data from MySQL:', err);
        return res.status(500).json({ error: "Failed to delete data from MySQL" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Customer not found" });
      }
      console.log('Data deleted from MySQL');
      return res.status(200).json({ message: "Data deleted successfully" });
    });
  });
  // update Billing details
  router.put('/billing/:tripid', (req, res) => {
    const tripid = req.params.tripid;
    const updatedCustomerData = req.body;
    console.log('tripid:', tripid); // Log the Billing
    console.log('Updated billing data:', updatedCustomerData);
    db.query('UPDATE billing SET ? WHERE tripid = ?', [updatedCustomerData, tripid], (err, result) => {
      if (err) {
        console.error('Error updating data in MySQL:', err);
        return res.status(500).json({ error: "Failed to update data in MySQL" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Customer not found" });
      }
      console.log('Data updated in MySQL');
      return res.status(200).json({ message: "Data updated successfully" });
    });
  });
  // collect data for Billing table
  router.get('/billing', (req, res) => {
    db.query('SELECT * FROM billing', (err, results) => {
      if (err) {
        console.error('Error fetching data from MySQL:', err);
        return res.status(500).json({ error: "Failed to fetch data from MySQL" });
      }
      return res.status(200).json(results);
    });
  });

module.exports = router;