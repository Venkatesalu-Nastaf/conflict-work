const express = require('express');
const router = express.Router();
const db = require('../../../db');

router.get('/pending_tripsheet', (req, res) => {
  const { department, fromDate, toDate } = req.query;


  let query = 'SELECT * FROM tripsheet WHERE status = "Opened"';
  let params = [];

  if (department) {
    query += ' AND department = ?';
    params.push(department);
  }

  if (fromDate && toDate) {
    query += ' AND startdate >= ? AND startdate <= ?';
    params.push(fromDate);
    params.push(toDate);
  }

  db.query(query, params, (err, result) => {
    if (err) {
      console.error('Error retrieving tripsheet details from MySQL:', err);
      return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
    }
    return res.status(200).json(result);
  });
});
//get treipsheet to dispatch
router.get('/tripsheet', (req, res) => {
  db.query("SELECT * FROM tripsheet", (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});

module.exports = router;  