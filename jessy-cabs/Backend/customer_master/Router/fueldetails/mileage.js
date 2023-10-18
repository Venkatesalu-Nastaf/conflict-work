const express = require('express');
const router = express.Router();
const db = require('../../../db');

// Add Fuel Details database
router.post('/fueldetails', (req, res) => {
    const bookData = req.body;
    db.query('INSERT INTO fueldetails SET ?', bookData, (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        return res.status(500).json({ error: "Failed to insert data into MySQL" });
      }
      console.log('Data inserted into MySQL');
      return res.status(200).json({ message: "Data inserted successfully" });
    });
  });
  // delete Fuel Details data
  router.delete('/fueldetails/:VehicleNo', (req, res) => {
    const VehicleNo = req.params.VehicleNo;
    console.log('Customer ID:', VehicleNo); // Log the customer ID
    console.log('DELETE query:', 'DELETE FROM fueldetails WHERE VehicleNo = ?', customerId);
    db.query('DELETE FROM fueldetails WHERE VehicleNo = ?', VehicleNo, (err, result) => {
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
  // update Fuel Details
  router.put('/fueldetails/:VehicleNo', (req, res) => {
    const VehicleNo = req.params.VehicleNo;
    const updatedCustomerData = req.body;
    console.log('Customer ID:', VehicleNo); // Log the customer ID
    console.log('Updated customer data:', updatedCustomerData);
    db.query('UPDATE fueldetails SET ? WHERE VehicleNo = ?', [updatedCustomerData, VehicleNo], (err, result) => {
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
  // collect data for Fuel Details table
  router.get('/fueldetails', (req, res) => {
    db.query('SELECT * FROM fueldetails', (err, results) => {
      if (err) {
        console.error('Error fetching data from MySQL:', err);
        return res.status(500).json({ error: "Failed to fetch data from MySQL" });
      }
      return res.status(200).json(results);
    });
  });
  // End Fuel Details database

module.exports = router;