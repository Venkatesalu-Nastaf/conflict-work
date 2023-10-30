const express = require('express');
const router = express.Router();
const db = require('../../../db');


router.get('/pending-tripsheet', (req, res) => {
  const { department, fromDate, toDate } = req.query;

  let query = 'SELECT * FROM tripsheet WHERE status = "Opened"';
  let params = [];

  if (department) {
    query += ' AND department = ?';
    params.push(department);
  }
  if (fromDate && toDate) {
    query += ' AND startdate BETWEEN ? AND ?';
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

module.exports = router;  