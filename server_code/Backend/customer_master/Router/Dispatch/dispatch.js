const express = require('express');
const router = express.Router();
const db = require('../../../db');
const moment = require('moment');


// data fetching 
// router.get('/pending_tripsheet-show', (req, res) => {
//   const { department, fromDate, toDate, status } = req.query;
  
//   console.log("datas ", fromDate, toDate,department,status);

//   // let query;
//   // let params = [];
//   // if (status) {
//   //   query = 'SELECT * FROM tripsheet WHERE status = ?';
//   //   params.push(status);
//   // } else {
//   //   query = 'SELECT * FROM tripsheet WHERE status = "Opened" Or status = "Cancelled" OR status = "Closed" ';
//   //   params = [];
//   // }

//   // if (department) {
//   //   query += ' AND department = ?';
//   //   params.push(department);
//   // }

//   // if (fromDate && toDate) {
//   //   query += ' AND tripsheetdate >= DATE_ADD(?, INTERVAL 0 DAY) AND tripsheetdate <= DATE_ADD(?, INTERVAL 1 DAY)';
//   //   params.push(fromDate);
//   //   params.push(toDate);
//   // }
       
//   let query = 'SELECT * FROM tripsheet WHERE 1=1';
//   let params = [];

//   if (status) {

//     query += ' AND status = ?';
//     params.push(status);
//   } else {
//     query += ' AND (status = "Opened" OR status = "Cancelled" OR status = "Closed" OR status = "Billed" )';
//   }

//   if (department) {
//     query += ' AND department = ?';
//     params.push(department);
//   }

//   // if (fromDate && toDate) {
//   //   query += ' AND tripsheetdate >= ? AND tripsheetdate <= ?';
//   //   params.push(fromDate);
//   //   params.push(toDate);
//   // }

//   if (fromDate && toDate) {
//     query += ' AND tripsheetdate >= DATE_ADD(?, INTERVAL 0 DAY) AND tripsheetdate <= DATE_ADD(?, INTERVAL 1 DAY)';
//     params.push(fromDate);
//     params.push(toDate);
//   }

//   query += ' AND apps != "Be_Closed"'; // Exclude rows where "apps" is "Be_closed"
//   console.log(query,"qq",params)
  
//   db.query(query, params, (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
//     }
//     return res.status(200).json(result);
//   });
// });

// router.get('/pending_tripsheet-show', (req, res) => {
//   const { department, fromDate, toDate, status } = req.query;
  
//   console.log("datas ", fromDate, toDate, department, status);

//   let tripsheetQuery = 'SELECT * FROM tripsheet WHERE 1=1';
//   let bookingQuery = 'SELECT * FROM booking WHERE 1=1';
//   let tripsheetParams = [];
//   let bookingParams = [];

//   // Tripsheet query construction
//   if (status) {
//     tripsheetQuery += ' AND status = ?';
//     tripsheetParams.push(status);
//   } else {
//     tripsheetQuery += ' AND (status = "Opened" OR status = "Cancelled" OR status = "Closed" OR status = "Billed" )';
//   }

//   if (department) {
//     tripsheetQuery += ' AND department = ?';
//     tripsheetParams.push(department);
//   }

//   if (fromDate && toDate) {
//     tripsheetQuery += ' AND tripsheetdate >= DATE_ADD(?, INTERVAL 0 DAY) AND tripsheetdate <= DATE_ADD(?, INTERVAL 1 DAY)';
//     tripsheetParams.push(fromDate);
//     tripsheetParams.push(toDate);
//   }

//   tripsheetQuery += ' AND apps != "Be_Closed"'; // Exclude rows where "apps" is "Be_closed"

//   // Booking query construction
//   if (status) {
//     bookingQuery += ' AND status = ?';
//     bookingParams.push(status);
//   }
//   if (fromDate && toDate) {
//     bookingQuery += ' AND bookingdate >= DATE_ADD(?, INTERVAL 0 DAY) AND bookingdate <= DATE_ADD(?, INTERVAL 1 DAY)';
//     bookingParams.push(fromDate);
//     bookingParams.push(toDate);
//   }
//   if (department) {
//     bookingQuery  += ' AND servicestation = ?';
//     bookingParams.push(department);
//   }

//   // Merge queries
//   const mergedQuery = `${tripsheetQuery}; ${bookingQuery};`;
//   const mergedParams = tripsheetParams.concat(bookingParams);

//   console.log("Merged Query: ", mergedQuery);
//   console.log("Merged Params: ", mergedParams);

//   db.query(mergedQuery, mergedParams, (err, results) => {
//     if (err) {
//       console.log(err)
//       return res.status(500).json({ error: 'Failed to retrieve data from MySQL' });
//     }

//     // Extract results for tripsheet and booking separately
//     const tripsheetResult = results[0];
//     const bookingResult = results[1];
// console.log(tripsheetResult,'t',bookingResult)
//     // Combine results and send response
//     const combinedResult = {
//       tripsheet: tripsheetResult,
//       booking: bookingResult
//     };

//     console.log(combinedResult,"re")

//     return res.status(200).json(combinedResult);
//   });
// });



router.get('/pending_tripsheet-show', (req, res) => {
  const { department, fromDate, toDate, status } = req.query;

 
  const formattedFromDate = moment(fromDate).format('YYYY-MM-DD');
  const formattedToDate = moment(toDate).format('YYYY-MM-DD');
  

  let tripsheetQuery = 'SELECT * FROM tripsheet WHERE 1=1';
  let bookingQuery = 'SELECT * FROM booking WHERE 1=1';
  let tripsheetParams = [];
  let bookingParams = [];

  // Tripsheet query construction
  if (status) {
    tripsheetQuery += ' AND status = ?';
    bookingQuery += ' AND status = ?';
    bookingParams.push(status);
    tripsheetParams.push(status);
  } else {
    tripsheetQuery += ' AND (status = "Opened" OR status = "Cancelled" OR status = "Closed" OR status = "Billed" )';
  }

  if (department) {
    tripsheetQuery += ' AND department = ?';
    bookingQuery += ' AND servicestation = ?';
    tripsheetParams.push(department);
    bookingParams.push(department);
  }

  // if (fromDate && toDate) {
  //   tripsheetQuery += ' AND tripsheetdate >= DATE_ADD(?, INTERVAL 0 DAY) AND tripsheetdate <= DATE_ADD(?, INTERVAL 1 DAY)';
  //   bookingQuery += ' AND bookingdate >= DATE_ADD(?, INTERVAL 0 DAY) AND bookingdate <= DATE_ADD(?, INTERVAL 1 DAY)';
  //   bookingParams.push(fromDate);
  //   bookingParams.push(toDate);
  //   tripsheetParams.push(fromDate);
  //   tripsheetParams.push(toDate);
  // }
  if (formattedFromDate && formattedToDate) {
    tripsheetQuery += ' AND tripsheetdate >= DATE_ADD(?, INTERVAL 0 DAY) AND tripsheetdate <= DATE_ADD(?, INTERVAL 1 DAY)';
    bookingQuery += ' AND bookingdate >= DATE_ADD(?, INTERVAL 0 DAY) AND bookingdate <= DATE_ADD(?, INTERVAL 1 DAY)';
    bookingParams.push(formattedFromDate );
    bookingParams.push(formattedToDate);
    tripsheetParams.push(formattedFromDate );
    tripsheetParams.push(formattedToDate);
  }

  tripsheetQuery += ' AND apps != "Be_Closed"'; // Exclude rows where "apps" is "Be_closed"

  // Booking query construction
  // if (status) {
  //   bookingQuery += ' AND status = ?';
  //   bookingParams.push(status);
  // }

  // if (fromDate && toDate) {
  //   bookingQuery += ' AND bookingdate >= DATE_ADD(?, INTERVAL 0 DAY) AND bookingdate <= DATE_ADD(?, INTERVAL 1 DAY)';
  //   bookingParams.push(fromDate);
  //   bookingParams.push(toDate);
  // }



  db.query(tripsheetQuery, tripsheetParams, (err, tripsheetResult) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
    }

    db.query(bookingQuery, bookingParams, (err, bookingResult) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
      }

     

      const combinedResult = {
        tripsheet: tripsheetResult,
        booking: bookingResult
      };
     
   

      return res.status(200).json(combinedResult);
    });
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
  db.query("SELECT * FROM tripsheet WHERE apps != 'Be_Closed'", (err, tripsheetData) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch tripsheet data from MySQL" });
    }
    tripsheetResults = tripsheetData;

    // Query to fetch booking data with status 'pending'
    db.query("SELECT * FROM booking WHERE status = 'pending' or status='Cancelled' or status ='Opened' ", (err, bookingData) => {
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