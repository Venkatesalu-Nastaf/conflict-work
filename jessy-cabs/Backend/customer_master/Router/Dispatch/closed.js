const express = require('express');
const router = express.Router();
const db = require('../../../db');

// customers/Dispatch/closed data collect from database
// router.get('/closed-tripsheet', (req, res) => {
//   const { department, fromDate, toDate } = req.query;
//   let query = 'SELECT * FROM tripsheet WHERE 1=1';
//   let params = [];
//   if (department) {
//     query += ' AND department = ?';
//     params.push(department);
//   }
//   if (fromDate && toDate) {
//     // query += ' AND startdate BETWEEN ? AND ?';
//     query += ' AND startdate >= DATE_ADD(?, INTERVAL 1 DAY) AND startdate <= DATE_ADD(?, INTERVAL 1 DAY)';
//     params.push(fromDate);
//     params.push(toDate);
//   }
//   db.query(query, params, (err, result) => {
//     if (err) {
//       console.error('Error retrieving booking details from MySQL:', err);
//       return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
//     }
//     return res.status(200).json(result);
//   });
// });

router.get('/closed-tripsheet', (req, res) => {
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
// // End customers/Dispatch/closed database

module.exports = router;
