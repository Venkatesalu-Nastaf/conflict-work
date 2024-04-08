const express = require('express');
const router = express.Router();
const db = require('../../../db');

router.get('/closed-tripsheet', (req, res) => {
  const { department, fromDate, toDate } = req.query;
  let query = 'SELECT * FROM tripsheet WHERE status = "Closed"';
  let params = [];

  if (department) {
    query += ' AND department = ?';
    params.push(department);
  }

  if (fromDate && toDate) {
    query += ' AND tripsheetdate >= DATE_ADD(?, INTERVAL 0 DAY) AND tripsheetdate <= DATE_ADD(?, INTERVAL 1 DAY)';
    params.push(fromDate);
    params.push(toDate);
  }

  db.query(query, params, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
    }
    return res.status(200).json(result);
  });
});
// // End customers/Dispatch/closed database

module.exports = router;