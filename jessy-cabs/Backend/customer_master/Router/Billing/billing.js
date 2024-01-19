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

router.get('/billingdata/:invoiceno', (req, res) => {
  const invoiceno = req.params.invoiceno;

  db.query('SELECT * FROM billing WHERE invoiceno = ?', invoiceno, (err, result) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ error: 'Failed to retrieve billing details from MySQL' });
    }
    if (result.length === 0) {
      console.error('Billing not found for invoiceno:', invoiceno);
      return res.status(404).json({ error: 'Billing not found' });
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
    const bookingDetails = result[0];
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

    const routeData = result;
    return res.status(200).json(routeData);
  });
});

//cover billing
router.get('/Group-Billing', (req, res) => {
  const { invoiceno, customer, fromDate, toDate, servicestation } = req.query;

  let query = 'SELECT * FROM tripsheet WHERE  status IN ("Closed", "CBilled")';
  let params = [];

  if (invoiceno) {
    query += ' AND invoiceno = ?';
    params.push(invoiceno);
  }

  if (customer) {
    const decodedCustomer = decodeURIComponent(customer);
    query += ' AND customer = ?';
    params.push(decodedCustomer);
  }

  if (fromDate && toDate) {
    // query += ' AND startdate BETWEEN ? AND ?';
    query += ' AND startdate >= DATE_ADD(?, INTERVAL 0 DAY) AND startdate <= DATE_ADD(?, INTERVAL 1 DAY)';
    params.push(fromDate);
    params.push(toDate);
  }

  if (servicestation) {
    query += ' AND department = ?';
    params.push(servicestation);
  }

  db.query(query, params, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }
    return res.status(200).json(result);
  });
});

module.exports = router;