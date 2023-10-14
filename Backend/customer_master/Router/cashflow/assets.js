const express = require('express');
const router = express.Router();
const db = require('../../../db');

// Add pettycash database
router.post('/asset', (req, res) => {
    const bookData = req.body;
    db.query('INSERT INTO asset SET ?', bookData, (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        return res.status(500).json({ error: "Failed to insert data into MySQL" });
      }
      console.log('Data inserted into MySQL');
      return res.status(200).json({ message: "Data inserted successfully" });
    });
  });
  // delete Billing data
  router.delete('/asset/:assetno', (req, res) => {
    const voucherno = req.params.assetno;
    db.query('DELETE FROM asset WHERE assetno = ?', assetno, (err, result) => {
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
  // update pettycash details
  router.put('/asset/:assetno', (req, res) => {
    const assetno = req.params.assetno;
    const updatedCustomerData = req.body;
    console.log('assetno:', assetno); // Log the pettycash
    console.log('Updated asset data:', updatedCustomerData);
    db.query('UPDATE asset SET ? WHERE assetno = ?', [updatedCustomerData, assetno], (err, result) => {
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
  // collect data for pettycash table
  
  // filter data from pettycash database
  router.get('/asset', (req, res) => {
    const { fromDate, toDate } = req.query;
    let query = 'SELECT * FROM asset WHERE 1=1';
    let params = [];
    if (fromDate && toDate) {
      query += ' AND date BETWEEN ? AND ?';
      params.push(fromDate);
      params.push(toDate);
    }
    db.query(query, params, (err, result) => {
      if (err) {
        console.error('Error retrieving booking details from MySQL:', err);
        return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
      }
      return res.status(200).json(result);
    });
  });
  // End pettycash database

module.exports = router;