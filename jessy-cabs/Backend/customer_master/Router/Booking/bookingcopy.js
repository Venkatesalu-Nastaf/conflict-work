const express = require('express');
const router = express.Router();
const db = require('../../../db');

// booking copy data collect:
router.get('/booking', (req, res) => {
    const { bookingno, servicestation, fromDate, toDate } = req.query;
    // Query and parameters for fetching booking details based on the query parameters
    let query = 'SELECT * FROM booking WHERE 1=1';
    let params = [];
    if (bookingno) {
      query += ' AND bookingno = ?';
      params.push(bookingno);
    }
    if (servicestation) {
      query += ' AND servicestation = ?';
      params.push(servicestation);
    }
    if (fromDate && toDate) {
      query += ' AND bookingdate BETWEEN ? AND ?';
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
  // End booking copy page database

module.exports = router;
