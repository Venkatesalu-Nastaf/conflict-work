const express = require('express');
const router = express.Router();
const db = require('../../../db');

// Add Billing database
router.post('/billing', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO billing SET ?', bookData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});
// delete Billing data
router.delete('/billing/:tripid', (req, res) => {
  const tripid = req.params.tripid;
  db.query('DELETE FROM billing WHERE tripid = ?', tripid, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete data from MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    return res.status(200).json({ message: "Data deleted successfully" });
  });
});
// update Billing details
router.put('/billing/:tripid', (req, res) => {
  const tripid = req.params.tripid;
  const updatedCustomerData = req.body;
  db.query('UPDATE billing SET ? WHERE tripid = ?', [updatedCustomerData, tripid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update data in MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    return res.status(200).json({ message: "Data updated successfully" });
  });
});
// collect data for Billing table
router.get('/billing', (req, res) => {
  db.query('SELECT * FROM billing', (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});
// collect data from billing database
router.get('/billing/:billingno', (req, res) => {
  const billingno = req.params.billingno;
  db.query('SELECT * FROM billing WHERE billingno = ?', billingno, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    const billingDetails = result[0];
    return res.status(200).json(billingDetails);
  });
});

router.get('/customers/:customer', (req, res) => {
  const customer = req.params.customer;
  db.query('SELECT * FROM customers WHERE customer = ?', customer, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    const bookingDetails = result[0]; // Assuming there is only one matching booking
    return res.status(200).json(bookingDetails);
  });
});
router.get('/routedata/:tripid', (req, res) => {
  const tripid = req.params.tripid;

  db.query('SELECT * FROM gmapdata WHERE tripid = ?', tripid, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'Route data not found' });
    }

    // Instead of returning a single object, return an array of all results
    const routeData = result;
    return res.status(200).json(routeData);
  });
});

module.exports = router;