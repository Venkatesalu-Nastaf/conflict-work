const express = require('express');
const router = express.Router();
const db = require('../../../db');

router.get('/payment-details', (req, res) => {
  const { customer, fromDate, toDate } = req.query;

  // Your MySQL query
  let sql = `
      SELECT
          customer,
          status,
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

module.exports = router;