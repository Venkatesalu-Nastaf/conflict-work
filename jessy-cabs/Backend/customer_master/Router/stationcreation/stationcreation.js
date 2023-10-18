const express = require('express');
const router = express.Router();
const db = require('../../../db');

router.post('/stationcreation', (req, res) => {
    const bookData = req.body;
    db.query('INSERT INTO stationcreation SET ?', bookData, (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        return res.status(500).json({ error: "Failed to insert data into MySQL" });
      }
      console.log('Data inserted into MySQL');
      return res.status(200).json({ message: "Data inserted successfully" });
    });
  });
  // delete Station Creation data
  router.delete('/stationcreation/:stationid', (req, res) => {
    const stationid = req.params.stationid;
    db.query('DELETE FROM stationcreation WHERE customerId = ?', stationid, (err, result) => {
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
  // update  Station Creation details
  router.put('/stationcreation/:customerId', (req, res) => {
    const stationid = req.params.stationid;
    const updatedCustomerData = req.body;
    console.log('Customer ID:', stationid); // Log the customer ID
    console.log('Updated customer data:', updatedCustomerData);
    db.query('UPDATE stationcreation SET ? WHERE stationid = ?', [updatedCustomerData, stationid], (err, result) => {
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
  // collect data for  Station Creation table
  router.get('/stationcreation', (req, res) => {
    db.query('SELECT * FROM stationcreation', (err, results) => {
      if (err) {
        console.error('Error fetching data from MySQL:', err);
        return res.status(500).json({ error: "Failed to fetch data from MySQL" });
      }
      return res.status(200).json(results);
    });
  });

module.exports = router;