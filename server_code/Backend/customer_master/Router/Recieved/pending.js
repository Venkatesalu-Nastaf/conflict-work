const express = require('express');
const router = express.Router();
const db = require('../../../db');


router.get('/pending-bookings', (req, res) => {
  const { servicestation, fromDate, toDate } = req.query;

  let query = 'SELECT * FROM booking WHERE status = "pending"';
  let params = [];

  if (servicestation) {
    query += ' AND servicestation = ?';
    params.push(servicestation);
  }

  if (fromDate && toDate) {
    query += ' AND bookingdate >= DATE_ADD(?, INTERVAL 0 DAY) AND bookingdate <= DATE_ADD(?, INTERVAL 1 DAY)';
    params.push(fromDate);
    params.push(toDate);
  }

  db.query(query, params, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }
    return res.status(200).json(result);
  });
});

// show all

module.exports = router;  