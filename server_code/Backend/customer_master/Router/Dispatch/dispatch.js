const express = require('express');
const router = express.Router();
const db = require('../../../db');


// data fetching 
router.get('/pending_tripsheet-show', (req, res) => {
  const { department, fromDate, toDate, status } = req.query;
  // console.log("datas ", fromDate, toDate);

  // let query;
  // let params = [];
  // if (status) {
  //   query = 'SELECT * FROM tripsheet WHERE status = ?';
  //   params.push(status);
  // } else {
  //   query = 'SELECT * FROM tripsheet WHERE status = "Opened" Or status = "Cancelled" OR status = "Closed" ';
  //   params = [];
  // }

  // if (department) {
  //   query += ' AND department = ?';
  //   params.push(department);
  // }

  // if (fromDate && toDate) {
  //   query += ' AND tripsheetdate >= DATE_ADD(?, INTERVAL 0 DAY) AND tripsheetdate <= DATE_ADD(?, INTERVAL 1 DAY)';
  //   params.push(fromDate);
  //   params.push(toDate);
  // }

  let query = 'SELECT * FROM tripsheet WHERE 1=1';
  let params = [];

  if (status) {

    query += ' AND status = ?';
    params.push(status);
  } else {
    query += ' AND (status = "Opened" OR status = "Cancelled" OR status = "Closed" OR status = "Billed" )';
  }

  if (department) {
    query += ' AND department = ?';
    params.push(department);
  }

  if (fromDate && toDate) {
    query += ' AND tripsheetdate >= ? AND tripsheetdate <= ?';
    params.push(fromDate);
    params.push(toDate);
  }

  if (fromDate && toDate) {
    query += ' AND tripsheetdate >= DATE_ADD(?, INTERVAL 0 DAY) AND tripsheetdate <= DATE_ADD(?, INTERVAL 1 DAY)';
    params.push(fromDate);
    params.push(toDate);
  }

  query += ' AND apps != "Be_Closed"'; // Exclude rows where "apps" is "Be_closed"

  db.query(query, params, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
    }
    return res.status(200).json(result);
  });
});



//get treipsheet to dispatch
router.get('/tripsheet-showall', (req, res) => {
  db.query("SELECT * FROM tripsheet where apps != 'Be_Closed'", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});

module.exports = router;  