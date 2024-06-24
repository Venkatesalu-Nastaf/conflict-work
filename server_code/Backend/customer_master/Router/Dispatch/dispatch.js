const express = require('express');
const router = express.Router();
const db = require('../../../db');
const moment = require('moment');


router.get('/pending_tripsheet-show', (req, res) => {
  const { fromDate, toDate, status, department, VehNo, cutomerName } = req.query;
  const formattedFromDate = moment(fromDate).format('YYYY-MM-DD');
  const formattedToDate = moment(toDate).format('YYYY-MM-DD');

  console.log("VehNo", VehNo, "cutomerName", cutomerName)


  let sqlQuery = '';
  let queryParams = [];

  if (status === 'pending' || status === 'Cancelled') {
    // Query booking table

    sqlQuery = `
      SELECT *
      FROM booking
      WHERE bookingdate >= DATE_ADD(?, INTERVAL 0 DAY) AND bookingdate <= DATE_ADD(?, INTERVAL 1 DAY) AND status = ?
    `;

    queryParams = [formattedFromDate, formattedToDate, status];

    if (department && department !== "All") {
      sqlQuery += ' AND servicestation = ?';
      queryParams.push(department);
    }

    if (VehNo) {
      sqlQuery += 'AND vehRegNo=?';
      queryParams.push(VehNo)
    }

    if (cutomerName) {
      sqlQuery += 'AND customer=?';
      queryParams.push(cutomerName)
    }


  } else {

    sqlQuery = `
    SELECT 
        booking.*,
        tripsheet.*
    FROM 
        tripsheet
    LEFT JOIN 
        booking ON tripsheet.bookingno = booking.bookingno
    WHERE 
        tripsheet.tripsheetdate >= DATE_ADD(?, INTERVAL 0 DAY) 
        AND tripsheet.tripsheetdate <= DATE_ADD(?, INTERVAL 1 DAY) 
        
  `;
    queryParams = [formattedFromDate, formattedToDate];
    if (status === "Billed") {
      sqlQuery += ' AND (tripsheet.status = "Transfer_Billed" OR tripsheet.status = "Covering_Billed")';
      // queryParams.push(status);
    }
    else if (status === "Closed") {

      sqlQuery += ' AND (tripsheet.status = "Transfer_Closed" OR tripsheet.status = "Covering_Closed")';
    }

    else if (status && status !== 'All') {
      sqlQuery += ' AND tripsheet.status = ?';
      queryParams.push(status);
    }


    if (department && department !== 'All') {
      sqlQuery += ' AND tripsheet.department = ?';
      queryParams.push(department);
    }

    if (VehNo) {
      sqlQuery += 'AND tripsheet.vehRegNo=?';
      queryParams.push(VehNo)
    }

    if (cutomerName) {
      sqlQuery += 'AND tripsheet.customer=?';
      queryParams.push(cutomerName)
    }

  }

  // console.log(sqlQuery, queryParams)

  db.query(sqlQuery, queryParams, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve data from MySQL' });
    }

    return res.status(200).json(result);
  });
});









//get treipsheet to dispatch
// router.get('/tripsheet-showall', (req, res) => {
//   db.query("SELECT * FROM tripsheet where apps != 'Be_Closed'", (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: "Failed to fetch data from MySQL" });
//     }
//     console.log(results)
//     return res.status(200).json(results);
//   });
// });


router.get('/tripsheet-showall', (req, res) => {
  let tripsheetResults, bookingResults;

  // Query to fetch tripsheet data
  db.query("SELECT * FROM tripsheet where status != 'Cancelled'", (err, tripsheetData) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch tripsheet data from MySQL" });
    }
    tripsheetResults = tripsheetData;

    // Query to fetch booking data with status 'pending'
    db.query("SELECT * FROM booking WHERE status = 'pending' or status='Cancelled'", (err, bookingData) => {
      if (err) {
        return res.status(500).json({ error: "Failed to fetch booking data from MySQL" });
      }
      bookingResults = bookingData;


      // Combine both results and send response
      const combinedResults = {
        tripsheet: tripsheetResults,
        booking: bookingResults
      };


      return res.status(200).json(combinedResults);
    });
  });
});




module.exports = router;  