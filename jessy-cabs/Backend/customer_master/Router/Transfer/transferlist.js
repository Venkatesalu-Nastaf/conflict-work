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

  console.log('backend collected values', params);

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

//dataentry database
// router.get('/tripsheetcustomertripid/:customer/:tripid', (req, res) => {
//   const customer = req.params.customer;
//   const tripid = req.params.tripid;

//   // Use placeholders in the query to prevent SQL injection
//   db.query('SELECT * FROM tripsheet WHERE customer = ? AND tripid = ?', [customer, tripid], (err, result) => {
//     if (err) {
//       console.error('Error retrieving tripsheet details from MySQL:', err);
//       return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
//     }
//     if (result.length === 0) {
//       return res.status(404).json({ error: 'Tripsheet not found' });
//     }
//     return res.status(200).json(result);
//   });
// });
router.get('/tripsheetcustomertripid/:customer/:tripid', (req, res) => {
  const customer = req.params.customer;
  const tripid = req.params.tripid.split(',');

  // Use placeholders in the query to prevent SQL injection
  db.query('SELECT * FROM tripsheet WHERE customer = ? AND tripid IN (?)', [customer, tripid], (err, result) => {
    if (err) {
      console.error('Error retrieving tripsheet details from MySQL:', err);
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
      console.error('Error retrieving tripsheet details from MySQL:', err);
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
  console.log('Received request:', req.body);

  const { tripids, status } = req.body;
  console.log(tripids, status);

  // Update the database with the new status for multiple tripids
  const query = 'UPDATE tripsheet SET status = ? WHERE tripid IN (?)';

  db.query(query, [status, tripids], (err, results) => {
    if (err) {
      console.error('Error updating status:', err);
      res.status(500).json({ message: 'Internal server error' });
      console.log('updated tripsheet', results);
      return;
    }
    res.status(200).json({ message: 'Status updated successfully' });
  });
});

router.post('/updateStatusremove', (req, res) => {
  console.log('Received request:', req.body);
  const { tripids, status } = req.body;
  console.log(tripids, status);
  const query = 'UPDATE tripsheet SET status = ? WHERE tripid IN (?)';
  db.query(query, [status, tripids], (err, results) => {
    if (err) {
      console.error('Error updating status:', err);
      res.status(500).json({ message: 'Internal server error' });
      console.log('updated tripsheet', results);
      return;
    }
    res.status(200).json({ message: 'Status updated successfully' });
  });
});

router.get('/normaltransferdata_trip/:customer', (req, res) => {
  console.log('Received from invoice request:', req.params.customer);
  const customer = req.params.customer;
  db.query('SELECT * FROM tripsheet WHERE customer = ?', customer, (err, result) => {
    if (err) {
      console.error('Error retrieving route data from MySQL:', err);
      return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
    }
    console.log('Result from the database:', result);
    if (result.length === 0) {
      return res.status(404).json({ error: 'Route data not found' });
    }
    const routeData = result;
    return res.status(200).json(routeData);
  });
});


module.exports = router;