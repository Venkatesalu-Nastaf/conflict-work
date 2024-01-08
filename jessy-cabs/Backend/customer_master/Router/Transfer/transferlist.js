const express = require('express');
const router = express.Router();
const db = require('../../../db');

router.get('/payment-detail', (req, res) => {
  const { customer, fromDate, toDate, servicestation } = req.query;

  console.log('Received parameters:', customer, fromDate, toDate, servicestation);

  let query = 'SELECT customer, COUNT(tripid) as trip_count, SUM(toll) as total_toll, SUM(netamount) as total_Amount, department FROM tripsheet WHERE 1=1';
  let params = [];

  if (customer) {
    const decodedCustomer = decodeURIComponent(customer);
    query += ' AND customer = ?';
    params.push(decodedCustomer);
  }

  if (fromDate && toDate) {
    query += ' AND startdate BETWEEN ? AND ?';
    params.push(fromDate);
    params.push(toDate);
  }

  if (servicestation) {
    query += ' AND department = ?';
    params.push(servicestation);
  }

  console.log('Generated SQL query:', query);
  console.log('SQL query parameters:', params);

  db.query(query, params, (err, result) => {
    if (err) {
      console.error('Error executing database query', err);
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }
    return res.status(200).json(result);
  });
});

router.get('/tripsheetcustomertripid/:customer/:tripid', (req, res) => {
  const customer = req.params.customer;
  const tripid = req.params.tripid.split(',');
  const decodedCustomer = decodeURIComponent(customer);
  // Use placeholders in the query to prevent SQL injection
  db.query('SELECT * FROM tripsheet WHERE customer = ? AND tripid IN (?)', [decodedCustomer, tripid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Tripsheet not found' });
    }
    return res.status(200).json(result);
  });
});

router.get('/tripsheetcustomer/:customer', (req, res) => {
  const customer = req.params.customer;
  db.query('SELECT * FROM tripsheet WHERE customer = ?', customer, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Tripsheet not found' });
    }
    return res.status(200).json(result);
  });
});

//for status update
router.post('/updateStatus', (req, res) => {

  const { tripids, status } = req.body;

  // Update the database with the new status for multiple tripids
  const query = 'UPDATE tripsheet SET status = ? WHERE tripid IN (?)';

  db.query(query, [status, tripids], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.status(200).json({ message: 'Status updated successfully' });
  });
});

router.post('/updateStatusremove', (req, res) => {
  const { tripids, status } = req.body;
  const query = 'UPDATE tripsheet SET status = ? WHERE tripid IN (?)';
  db.query(query, [status, tripids], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.status(200).json({ message: 'Status updated successfully' });
  });
});

router.get('/normaltransferdata_trip/:customer', (req, res) => {
  const customer = req.params.customer;
  db.query('SELECT * FROM tripsheet WHERE customer = ?', customer, (err, result) => {
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

module.exports = router;