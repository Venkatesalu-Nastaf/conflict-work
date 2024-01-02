const express = require('express');
const router = express.Router();
const db = require('../../../db');

router.get('/payment-detail', (req, res) => {
  const { customer, fromDate, toDate } = req.query;

  // Your MySQL query
  let sql = `
      SELECT
          customer,
          COUNT(tripid) as trip_count,
          SUM(toll) as total_toll,
          SUM(netamount) as total_Amount
      FROM
          tripsheet
  `;
  let params = [];

  // If the customer parameter is provided, add it to the query
  if (customer) {
    sql += ' WHERE customer = ?';
    params.push(customer);
  }

  if (fromDate && toDate) {
    sql += (customer ? ' AND' : ' WHERE') + ' startdate >= ? AND startdate <= DATE_ADD(?, INTERVAL 1 DAY)';
    params.push(fromDate);
    params.push(toDate);
  }

  sql += ' GROUP BY customer'; // Group by customer to get unique customer names

  db.query(sql, params, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

router.get('/tripsheetcustomertripid/:customer/:tripid', (req, res) => {
  const customer = req.params.customer;
  const tripid = req.params.tripid.split(',');
  // Use placeholders in the query to prevent SQL injection
  db.query('SELECT * FROM tripsheet WHERE customer = ? AND tripid IN (?)', [customer, tripid], (err, result) => {
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
    return res.status(200).json(result); // Return all rows for the specified customer
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