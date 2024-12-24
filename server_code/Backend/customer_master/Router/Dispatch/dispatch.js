const express = require('express');
const router = express.Router();
const db = require('../../../db');
const moment = require('moment');
//old code 
// router.get('/pending_tripsheet-show', (req, res) => {
//   const { fromDate, toDate, status, department, VehNo, cutomerName } = req.query;
//   const formattedFromDate = moment(fromDate).format('YYYY-MM-DD');
//   const formattedToDate = moment(toDate).format('YYYY-MM-DD');
//   const datadepartment = department ? department.split(',').map(name => name.trim()).filter(name => name) : [];
//   const datacustomer = cutomerName ? cutomerName.split(',').map(name => name.trim()).filter(name => name) : [];
//   // console.log(fromDate, toDate, status, department, VehNo, cutomerName)


//   let sqlQuery = '';
//   let queryParams = [];

//   if (status === 'pending' || status === 'Cancelled') {
//     // Query booking table

//     sqlQuery = `
//       SELECT *
//       FROM booking
//       WHERE bookingdate >= DATE_ADD(?, INTERVAL 0 DAY) AND bookingdate <= DATE_ADD(?, INTERVAL 1 DAY) AND status = ?
//     `;

//     queryParams = [formattedFromDate, formattedToDate, status];

//     if (datadepartment.length >= 1 && !datadepartment.includes('All')) {
//       // sqlQuery += ' AND servicestation = ?';
//       sqlQuery += ' AND servicestation  IN  (?)';
//       queryParams.push(datadepartment);
//     }

//     if (VehNo) {
//       sqlQuery += 'AND vehRegNo=?';
//       queryParams.push(VehNo)
//     }

//     if (datacustomer.length >= 1 && !datacustomer.includes('All')) {
//       sqlQuery += 'AND customer IN (?)';
//       queryParams.push(datacustomer)
//     }


//   } else {

//     sqlQuery = `
//     SELECT 
//         booking.*,
//         tripsheet.*
//     FROM 
//         tripsheet
//     LEFT JOIN 
//         booking ON tripsheet.bookingno = booking.bookingno
//     WHERE 
//         tripsheet.tripsheetdate >= DATE_ADD(?, INTERVAL 0 DAY) 
//         AND tripsheet.tripsheetdate <= DATE_ADD(?, INTERVAL 1 DAY) 
        
//   `;
//     queryParams = [formattedFromDate, formattedToDate];
//     if (status === "Billed") {
//       sqlQuery += ' AND (tripsheet.status = "Transfer_Billed" OR tripsheet.status = "Covering_Billed")';
//       // queryParams.push(status);
//     }
//     // ----old
//     // else if (status === "Closed") {

//     //   sqlQuery += ' AND (tripsheet.status = "Transfer_Closed" OR tripsheet.status = "Covering_Closed")';
//     // }
//     // ---new
//     else if (status === "Closed") {

//       sqlQuery += ' AND (tripsheet.status = "Transfer_Closed" OR tripsheet.status = "Covering_Closed" OR tripsheet.status = "Closed")';
//     }

//     else if (status && status !== 'All') {
//       sqlQuery += ' AND tripsheet.status = ?';
//       queryParams.push(status);
//     }


//     if (datadepartment.length >= 1 && !datadepartment.includes('All')) {
//       sqlQuery += ' AND tripsheet.department IN (?)';
//       queryParams.push(datadepartment);
//     }

//     if (VehNo) {
//       sqlQuery += 'AND tripsheet.vehRegNo=?';
//       queryParams.push(VehNo)
//     }

//     if (datacustomer.length >= 1 && !datacustomer.includes('All')) {
//       sqlQuery += 'AND tripsheet.customer iN (?)';
//       queryParams.push(datacustomer)
//     }
//   }

//   console.log(sqlQuery, queryParams)

//   db.query(sqlQuery, queryParams, (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Failed to retrieve data from MySQL' });
//     }

//     return res.status(200).json(result);
//   });
// });

// new  working code 
router.get('/pending_tripsheet-show', (req, res) => {
  const { fromDate, toDate, status, department, VehNo, cutomerName, isStations} = req.query;
  const formattedFromDate = moment(fromDate).format('YYYY-MM-DD');
  const formattedToDate = moment(toDate).format('YYYY-MM-DD');
  const datadepartment = department ? department.split(',').map(name => name.trim()).filter(name => name) : [];
  const datacustomer = cutomerName ? cutomerName.split(',').map(name => name.trim()).filter(name => name) : [];
  // console.log(isStations,"ll")
  const isStation = isStations ? isStations.split(',').map(name => name.trim()).filter(name => name) : [];
  console.log('Is Stations departs:', datadepartment,"kkkkk",isStation,datacustomer);
  
  let sqlQuery = '';
  let Tripquery = '';
  let queryParams = [];
  //  'All' status
  // if (status === 'All') {
  //   sqlQuery = `
  //     SELECT * FROM booking
  //     WHERE bookingdate >= DATE_ADD(?, INTERVAL 0 DAY) AND bookingdate <= DATE_ADD(?, INTERVAL 1 DAY)
  //   `;
  //   Tripquery = `
  //     SELECT * FROM tripsheet
  //     WHERE tripsheetdate BETWEEN DATE_ADD(?, INTERVAL 0 DAY) AND DATE_ADD(?, INTERVAL 1 DAY)
  //   `;
    
  //   queryParams = [formattedFromDate, formattedToDate];

  //   if (datadepartment.length >= 1 && !datadepartment.includes('All')) {
  //     sqlQuery += ' AND servicestation IN (?)';
  //     queryParams.push(datadepartment);
  //   }

  //   if (VehNo) {
  //     sqlQuery += ' AND vehRegNo = ?';
  //     queryParams.push(VehNo);
  //   }

  //   if (datacustomer.length >= 1 && !datacustomer.includes('All')) {
  //     sqlQuery += ' AND customer IN (?)';
  //     queryParams.push(datacustomer);
  //   }

  //   // Fetch bookings
  //   db.query(sqlQuery, queryParams, (err, bookingResults) => {
  //     if (err) {
  //       console.error('Error fetching bookings:', err.message);
  //       return res.status(500).json({ error: 'Database error on fetching booking' });
  //     }

  //     // Fetch tripsheets
  //     db.query(Tripquery, queryParams, (err, tripsheetResults) => {
  //       if (err) {
  //         console.error('Error fetching tripsheets:', err.message);
  //         return res.status(500).json({ error: 'Database error on fetching trip sheet' });
  //       }

  //       // Send response 
  //       return res.status(200).json({
  //         booking: bookingResults,
  //         tripsheet: tripsheetResults
  //       });
  //     });
  //   });
  //   return;
  // }

// changes with customer filtering 
if (status === 'All') {
  sqlQuery = `
    SELECT * FROM booking
    WHERE bookingdate >= DATE_ADD(?, INTERVAL 0 DAY) 
      AND bookingdate <= DATE_ADD(?, INTERVAL 0 DAY)
      AND (status = 'pending' OR status = 'Cancelled')
  `;
  Tripquery = `
    SELECT * FROM tripsheet
    WHERE tripsheetdate BETWEEN DATE_ADD(?, INTERVAL 0 DAY) 
      AND DATE_ADD(?, INTERVAL 0 DAY) AND  status != 'Cancelled'
  `;

  queryParams = [formattedFromDate, formattedToDate];
 


// if (datadepartment.length === 0 || datadepartment.includes('All')) {
  if (datadepartment.length === 0) {
  // if (isStation.length > 0) {
  // Ensure we filter only by servicestation
  // sqlQuery += ' AND servicestation IN (?)';
  sqlQuery += ' AND servicestation IN (?)';
  Tripquery += ' AND department IN (?)'; 
  //  sqlQuery += ' AND tripsheet.department IN (?)'
  queryParams.push(isStation);
} 
else {
  // If specific departments are provided, use them as a filter
  // sqlQuery += ' AND tripsheet.department IN (?)';
  sqlQuery += ' AND servicestation IN (?)';
  Tripquery += ' AND department IN (?)'; 
  queryParams.push(datadepartment);
}

if (VehNo) {
  sqlQuery += ' AND vehRegNo = ?';
  Tripquery += ' AND vehRegNo = ?';
  queryParams.push(VehNo); 
}

if (datacustomer.length === 1 && !datacustomer.includes('All')) {
  sqlQuery += ' AND customer = ?'; 
  Tripquery += ' AND customer = ?'; 
  queryParams.push(datacustomer[0]); 
} else if (datacustomer.length > 1) {
  sqlQuery += ' AND customer IN (?)';
  Tripquery += ' AND customer IN (?)';
  queryParams.push(datacustomer); 
}

// console.log("SQL Query:", sqlQuery);
// console.log("Query Params:", queryParams,);
// console.log("SQL Query:", Tripquery);
// console.log("Query Params:", queryParams);

db.query(sqlQuery, queryParams, (err, bookingResults) => {
  if (err) {
      console.error('Error fetching bookings:', err.message);
      return res.status(500).json({ error: 'Database error on fetching booking' });
  }
  // console.log(bookingResults,"kkk")

  db.query(Tripquery, queryParams, (err, tripsheetResults) => {
      if (err) {
          console.error('Error fetching tripsheets:', err.message);
          return res.status(500).json({ error: 'Database error on fetching trip sheet' });
      }
      if (bookingResults.length === 0 && tripsheetResults.length === 0) {
          return res.status(200).json({ message: 'No data found' });
      }
      return res.status(200).json({
          booking: bookingResults,
          tripsheet: tripsheetResults
      });
  });
});

  return;
}

  // Handle 'pending' and 'Cancelled' statuses
  if (status === 'pending' || status === 'Cancelled') {

      sqlQuery = `
        SELECT *
        FROM booking
        WHERE bookingdate >= DATE_ADD(?, INTERVAL 0 DAY) AND bookingdate <= DATE_ADD(?, INTERVAL 0 DAY) AND status = ?   
      `;
      queryParams = [formattedFromDate, formattedToDate, status];
  
    if (datadepartment.length >= 1 && !datadepartment.includes('All')) {
      sqlQuery += ' AND servicestation IN (?)';
      queryParams.push(datadepartment);
    }

    if (isStation.length > 0  && datadepartment.length === 0) {
      sqlQuery += ' AND servicestation IN (?)';
      queryParams.push(isStation);
    }
    if (VehNo) {
      sqlQuery += ' AND vehRegNo = ?';
      queryParams.push(VehNo);
    }
    if (datacustomer.length >= 1 && !datacustomer.includes('All')) {
      sqlQuery += ' AND customer IN (?)';
      queryParams.push(datacustomer);
    }
  } else {
    // Handle other statuses
  //   sqlQuery = `
  //     SELECT booking.*, tripsheet.*
  //     FROM tripsheet
  //     LEFT JOIN booking ON tripsheet.bookingno = booking.bookingno
  //     WHERE tripsheet.tripsheetdate >= DATE_ADD(?, INTERVAL 0 DAY) 
  //     AND tripsheet.tripsheetdate <= DATE_ADD(?, INTERVAL 1 DAY)
  //     AND tripsheet.department IN (?)
  //   `;
  //   queryParams = [formattedFromDate, formattedToDate,status];
  //   if (datadepartment.length === 0  || datadepartment.includes('All')) {
  //     sqlQuery += ' AND servicestation IN (?)';
  //     queryParams.push(isStation);
  // } else {
  //     sqlQuery += ' AND servicestation IN (?)';
  //     queryParams.push(isStation);
  // }
  sqlQuery = `
  SELECT booking.*, tripsheet.*
  FROM tripsheet
  LEFT JOIN booking ON tripsheet.bookingno = booking.bookingno
  WHERE tripsheet.tripsheetdate >= DATE_ADD(?, INTERVAL 0 DAY) 
  AND tripsheet.tripsheetdate <= DATE_ADD(?, INTERVAL 0 DAY)
`;

// Initialize query parameters
queryParams = [formattedFromDate, formattedToDate];

// If the department is 'All' or not specified, we skip the department filter
if (datadepartment.length === 0 || datadepartment.includes('All')) {
  // if (isStation.length > 0) {
  // Ensure we filter only by servicestation
  // sqlQuery += ' AND servicestation IN (?)';
   sqlQuery += ' AND tripsheet.department IN (?)'
  queryParams.push(isStation);
} 
else {
  // If specific departments are provided, use them as a filter
  sqlQuery += ' AND tripsheet.department IN (?)';
  queryParams.push(datadepartment);
}


    // if (status === "Billed") {
    //   sqlQuery += ' AND (tripsheet.status = "Transfer_Billed" OR tripsheet.status = "Covering_Billed")';
    // } else if (status === "Closed") {
    //   sqlQuery += ' AND (tripsheet.status = "Transfer_Closed" OR tripsheet.status = "Covering_Closed" OR tripsheet.status = "Closed")';
    // } else if (status && status !== 'All') {
    //   sqlQuery += ' AND tripsheet.status = ?';
    //   queryParams.push(status);
    // }
    // changes for billed 
    if (status === "Billed") {
      sqlQuery += ' AND (tripsheet.status = "Billed" OR tripsheet.status = "Transfer_Billed" OR tripsheet.status = "Covering_Billed")';
  } else if (status === "Closed") {
      sqlQuery += ' AND (tripsheet.status = "Closed" OR tripsheet.status = "Transfer_Closed" OR tripsheet.status = "Covering_Closed")';
  } else if (status && status !== 'All') {
      sqlQuery += ' AND tripsheet.status = ?';
      queryParams.push(status);
  }
    // if (datadepartment.length >= 1 && !datadepartment.includes('All')) {
    //   sqlQuery += ' AND tripsheet.department IN (?)';
    //   queryParams.push(datadepartment);
    // }
    if (VehNo) {
      sqlQuery += ' AND tripsheet.vehRegNo = ?';
      queryParams.push(VehNo);
    }
    if (datacustomer.length >= 1 && !datacustomer.includes('All')) {
      sqlQuery += ' AND tripsheet.customer IN (?)';
      queryParams.push(datacustomer);
    }
  }
  // console.log(sqlQuery,"dd",queryParams)
  db.query(sqlQuery, queryParams, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve data from MySQL' });
    }
    // console.log(result,"oo")
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

// router.get('/tripsheet-showall', (req, res) => {

//   let tripsheetResults, bookingResults;
//   // Query to fetch tripsheet data
//   db.query("SELECT * FROM tripsheet where status != 'Cancelled'", (err, tripsheetData) => {
//     if (err) {
//       return res.status(500).json({ error: "Failed to fetch tripsheet data from MySQL" });
//     }
//     tripsheetResults = tripsheetData;
//     // Query to fetch booking data with status 'pending'
//     db.query("SELECT * FROM booking WHERE status = 'pending' or status='Cancelled'", (err, bookingData) => {
//       if (err) {
//         return res.status(500).json({ error: "Failed to fetch booking data from MySQL" });
//       }
//       bookingResults = bookingData;
//       // Combine both results and send response
//       const combinedResults = {
//         tripsheet: tripsheetResults,
//         booking: bookingResults
//       };
//       return res.status(200).json(combinedResults);
//     });
//   });
// });

// my code
// router.get('/tripsheet-showall', (req, res) => {
//   const { isStation} = req.query;

//   let tripsheetResults, bookingResults;
//   // Query to fetch tripsheet data
//   db.query("SELECT * FROM tripsheet where status != 'Cancelled' AND department IN  ",[isStation] ,(err, tripsheetData) => {
//     if (err) {
//       return res.status(500).json({ error: "Failed to fetch tripsheet data from MySQL" });
//     }
//     tripsheetResults = tripsheetData;
//     // Query to fetch booking data with status 'pending'
//     db.query("SELECT * FROM booking WHERE status = 'pending' or status='Cancelled' AND servicestation IN (?) ",[isStation] ,(err, bookingData) => {
//       if (err) {
//         return res.status(500).json({ error: "Failed to fetch booking data from MySQL" });
//       }
//       bookingResults = bookingData;
//       // Combine both results and send response
//       const combinedResults = {
//         tripsheet: tripsheetResults,
//         booking: bookingResults
//       };
//       return res.status(200).json(combinedResults);
//     });
//   });
// });
// router.get('/tripsheet-showall', (req, res) => {
//   const { isStation } = req.query;

//   // Validate isStation input
//   if (!isStation) {
//     return res.status(400).json({ error: "isStation parameter is required" });
//   }

//   // Convert isStation to an array
//   const stationsArray = isStation.split(',').map(station => station.trim());
//   console.log(stationsArray,"saeee")

//   let tripsheetResults, bookingResults;

//   // Query to fetch tripsheet data
//   db.query(
//     "SELECT * FROM tripsheet WHERE status != 'Cancelled' AND department IN (?)",
//     [stationsArray],
//     (err, tripsheetData) => {
//       if (err) {
//         return res.status(500).json({ error: "Failed to fetch tripsheet data from MySQL" });
//       }
//       tripsheetResults = tripsheetData;

//       // Query to fetch booking data with status 'pending' or 'Cancelled'
//       db.query(
//         "SELECT * FROM booking WHERE (status = 'pending' OR status = 'Cancelled') AND servicestation IN (?)",
//         [stationsArray],
//         (err, bookingData) => {
//           if (err) {
//             return res.status(500).json({ error: "Failed to fetch booking data from MySQL" });
//           }
//           bookingResults = bookingData;

//           // Combine both results and send response
//           const combinedResults = {
//             tripsheet: tripsheetResults,
//             booking: bookingResults
//           };
          
//           // console.log(combinedResults,"opp")
//           return res.status(200).json(combinedResults);
//         }
//       );
//     }
//   );
// });




router.get('/getdatafromboookingvalue/:bookingno',(req,res)=>{
  const bookingno = req.params.bookingno;
  db.query("select * from booking where bookingno=?",[bookingno],(err,results)=>{
    if (err) {
      return res.status(500).json({ error: "Failed to fetch booking data from MySQL" });
    }
    return res.status(200).json(results)
  })
})
router.get('/VehicleStatement-bookings', (req, res) => {
  const { Travelsname, fromDate, toDate } = req.query;
  // const formattedFromDate = moment(fromDate).format('YYYY-MM-DD');
  // const formattedToDate = moment(toDate).format('YYYY-MM-DD');
  // db.query("select *,Vendor_FULLTotalAmount - CAST(advancepaidtovendor AS DECIMAL) As totalvendoramount from tripsheet where travelsname=? AND tripsheetdate >= DATE_ADD(?, INTERVAL 0 DAY) AND tripsheetdate <= DATE_ADD(?, INTERVAL 0 DAY)",
  db.query(`select *,COALESCE(NULLIF(advancepaidtovendor, ''), 0) AS totalvendoramount,
          COALESCE(NULLIF(fuelamount, ''), 0) AS totalfuelamount,
    (COALESCE(NULLIF(Vendor_totalAmountKms, ''), 0) 
 + COALESCE(NULLIF(Vendor_totalAmountHours, ''), 0) 
 + COALESCE(NULLIF(Vendor_NightbataTotalAmount, ''), 0) 
 + COALESCE(NULLIF(Vendor_BataTotalAmount, ''), 0) 
 + COALESCE(NULLIF(Vendor_rateAmount, ''), 0) 
 + COALESCE(NULLIF(vendortoll, ''), 0) 
 + COALESCE(NULLIF(vendorparking, ''), 0) 
 + COALESCE(NULLIF(vpermettovendor, ''), 0)) AS grandtotal
    from tripsheet where travelsname=? AND tripsheetdate >= DATE_ADD(?, INTERVAL 0 DAY) AND tripsheetdate <= DATE_ADD(?, INTERVAL 0 DAY)`,
    [Travelsname, fromDate, toDate], (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Failed to fetch booking data from MySQL" });
      }
      const resultsdata = results.map(result => ({
        ...result, // Spread the existing properties
        vpermettovendor: result.vpermettovendor || 0, // Default to 0 if null or undefined
        vendortoll: result.vendortoll || 0, // Add default for another field if needed
        advancepaidtovendor: result.advancepaidtovendor || 0
      }));
      // return res.status(200).json(results)
      return res.status(200).json(resultsdata)
    }
  )
})

router.get('/tripsheetvendordata', (req, res) => {

  const sql = `select *,COALESCE(NULLIF(advancepaidtovendor, ''), 0) AS totalvendoramount,
    COALESCE(NULLIF(fuelamount, ''), 0) AS totalfuelamount,
(COALESCE(NULLIF(Vendor_totalAmountKms, ''), 0) 
+ COALESCE(NULLIF(Vendor_totalAmountHours, ''), 0) 
+ COALESCE(NULLIF(Vendor_NightbataTotalAmount, ''), 0) 
+ COALESCE(NULLIF(Vendor_BataTotalAmount, ''), 0) 
+ COALESCE(NULLIF(Vendor_rateAmount, ''), 0) 
+ COALESCE(NULLIF(vendortoll, ''), 0) 
+ COALESCE(NULLIF(vendorparking, ''), 0) 
+ COALESCE(NULLIF(vpermettovendor, ''), 0)) AS grandtotal
from tripsheet`
  // db.query("SELECT *, Vendor_FULLTotalAmount - CAST(advancepaidtovendor AS DECIMAL) AS totalvendoramount FROM tripsheet", (err, results) => {
    db.query(sql, (err, results) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: "Failed to fetch booking data from MySQL" });
    }
    if (results.length === 0) {
      return res.status(400).json({ error: "Data not Found" });
    }
    
    return res.status(200).json(results)
  }
  )
})

module.exports = router;  