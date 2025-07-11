
const express = require('express');
const router = express.Router();
const db = require('../../../db');
const moment = require('moment');
// const jwt=require('jsonwebtoken')
require('dotenv').config()


const { subMonths, startOfMonth, endOfMonth, format, addMonths, addDays, getYear, getMonth } = require('date-fns');
const validator = require('validator');

const fetchDataForDateRange = async (startDate, endDate) => {
  // console.log(startDate, "data range", endDate)
  const query = `
        SELECT 
        
        SUM(Totalamount)   AS totalAmount,
            SUM(paidamount) AS totalPaid,
            SUM(pendingamount) AS totalPending
        FROM billing
        WHERE Billingdate >= ? AND Billingdate <= ?;
    `;

  return new Promise((resolve, reject) => {
    db.query(query, [startDate, endDate], (err, result) => {
      if (err) {
        reject(err);
      } else {
        // console.log(result, "fetch")
        const { totalAmount, totalPaid, totalPending } = result[0];
        resolve({ totalAmount, totalPaid, totalPending });
      }
    });
  });
};


router.get('/total_amounts_from_billing', async (req, res) => {
  const currentDate = new Date();

  const currentMonthNumber = getMonth(currentDate);

  const datemonth2 = req.query.month;
  // console.log(datemonth2, "datre")
  const datemonth1 = datemonth2 !== undefined ? datemonth2 : currentMonthNumber
  // console.log(datemonth1, "datetete")


  const currentYear = getYear(new Date());
  // const datemonth=2;// Get the current year


  let previousYear;
  let previousMonth;
  if (datemonth1 === 0) {
    previousYear = currentYear - 1; // For January, previous year
    previousMonth = 11; // December of previous year
  } else {
    previousYear = currentYear;
    previousMonth = datemonth1 - 1; // For other months, previous month
  }

  // Calculate start date of the previous month
  const startDate2 = startOfMonth(new Date(previousYear, previousMonth));

  // Calculate end date of the current month
  const endDate2 = endOfMonth(new Date(currentYear, datemonth1));
  // console.log(startDate2, typeof (startDate2), "ll", endDate2)
  // const startdatesplit = startDate2.split('T')[0];
  // const enddatesplit = endDate2.split('T')[0];
  const startDateString1 = format(startDate2, 'yyyy-MM-dd');
  const endDateString1 = format(endDate2, 'yyyy-MM-dd');


  // console.log(startDate2, "ll", endDate2)
  // console.log(startDateString1, "datefnsk", endDateString1)



  try {
    // const currentMonthData = await fetchDataFromDatabase(currentMonthStartDateString, currentMonthEndDateString);
    const lastMonthData = await fetchDataForDateRange(startDateString1, endDateString1);
    // console.log(lastMonthData, "total billing")
    const result1 = {
      // current: currentMonthData,
      lastMonth: lastMonthData,

    };

    // console.log(result1, "monthdata")
    return res.json(result1);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }

});

router.get('/monthly_data', (req, res) => {

  const startDate = validator.toDate(req.query.startDate);
  const endDate = validator.toDate(req.query.endDate);
  // console.log(startDate, "str", endDate)

  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'Invalid date format' });
  }

  const query = 'SELECT * FROM billing WHERE Billingdate BETWEEN ? AND ?';

  db.query(query, [startDate, endDate], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json(results);
  });
});

router.get('/monthly_data2', (req, res) => {

  const currentDate = new Date();

  const currentMonthNumber = getMonth(currentDate);

  const datemonth2 = req.query.month;
  // console.log(datemonth2, "datre bilkl ghraph")
  const datemonth1 = datemonth2 !== undefined ? datemonth2 : currentMonthNumber
  // console.log(datemonth1, "datetete bill graph")

  const currentYear = getYear(new Date());
  // const datemonth=2;// Get the current year


  let previousYear;
  let previousMonth;
  if (datemonth1 === 0) {
    previousYear = currentYear - 1; // For January, previous year
    previousMonth = 11; // December of previous year
  } else {
    previousYear = currentYear;
    previousMonth = datemonth1 - 1; // For other months, previous month
  }

  // console.log(previousYear, "llllllll", previousMonth)
  const startDate2 = startOfMonth(new Date(previousYear, previousMonth));


  // Calculate end date of the current month
  const endDate2 = endOfMonth(new Date(currentYear, datemonth1));

  // const startdatesplit = startDate2.split('T')[0];
  // const enddatesplit = endDate2.split('T')[0];
  // console.log(startdatesplit,"kkkkdate",enddatesplit); 
  const startDateString1 = format(startDate2, 'yyyy-MM-dd');
  const endDateString1 = format(endDate2, 'yyyy-MM-dd');


  // console.log(startDate2,";ll", endDate2)
  // console.log(startDateString1,"datefnsk",endDateString1)


  // if (!startDateString1|| !endDateString1) {
  //     return res.status(400).json({ error: 'Invalid date format' });
  // }

  const query = 'SELECT * FROM billing WHERE Billingdate BETWEEN ? AND ?';

  db.query(query, [startDateString1, endDateString1], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    // console.log(results)
    res.json(results);

  });
});



// router.get("/customerreviewdataall/:station",(req,res)=>{
//     const station =req.params.station
//     // console.log(station,"hh")
//     db.query("select * from booking where status='Opened'",(err,result)=>{
//         if(err){
//             return res.status(500).json({ error: 'Internal Server Error' });

//         }
//         if(result.lenght>0){
//             return res.status(500).json({ error: 'result not found'});
//         }
//         // console.log(result)
//         return res.json(result)
//     })
// })

// router.get("/customerreviewdataall/:station", (req, res) => {
//     const station = req.params.station;

//     db.query("SELECT COUNT(*) AS count FROM booking WHERE status ='Opened' and servicestation=?", [station], (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }

//         if (result.length === 0) {
//             return res.status(404).json({ error: 'No data found' });
//         }
//         const data={station: station, count: result[0].count }
//     console.log(data)
//         return res.json({ station: station, count: result[0].count });
//     });
// });

// const authenticateJWT = (req, res, next) => {
//   const token = req.header('x-auth-token');
//   // console.log(token,"kk")
//   if (!token) return res.status(401).json({ message: 'Authentication failed' });

//   try {

//     //  const secretKey1="NASTAF_APPLICATION_DATAKEY@123"
//     const decoded = jwt.verify(token,process.env.JSON_SECERETKEY);
//     req.user = decoded;
//     // console.log(decoded,"dee")
//     next();
//   } catch (error) {
//     console.log(error)
//     res.status(400).json({ message: 'expired token' });
//   }
// };
// router.get('/checktokenexpire',authenticateJWT,(req,res)=>{
//   return res.json({message:"TOKEN NOT EXPIRED"})
// })

router.get("/customerreviewdataallmonth/:station/:fromdate/:todate", (req, res) => {
  const station = req.params.station;
  const fromtodate = req.params.fromdate;
  const endtodate = req.params.todate;
  // console.log(fromtodate, "ff", endtodate)

  const stationname = station?.split(',');
  // console.log(stationname, "name")

  const promises = stationname.map(data => {
    return new Promise((resolve, reject) => {



      db.query("SELECT COUNT(*) AS count ,servicestation FROM booking WHERE status ='pending' and servicestation = ?  AND bookingdate >= DATE_ADD(?, INTERVAL 0 DAY) AND bookingdate <= DATE_ADD(?, INTERVAL 0 DAY)", [data, fromtodate, endtodate], (err, result) => {
        if (err) {
          reject(err);
        } else {

          resolve(result[0]); // Assuming we expect only one result per tripid
        }
      }
      );
    });
  });

  Promise.all(promises)
    .then(results => {
      // console.log(results,"data")
      return res.status(200).json(results);
    })
    .catch(error => {
      //   console.log(error)
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    });
})
router.get("/customerreviewtoday/:station/:dateoftoday", (req, res) => {

  const dateoftoday = req.params.dateoftoday

  const station = req.params.station;
  const stationname = station.split(',');
  // console.log(stationname, "name")
  // console.log(dateoftoday, "of date")

  const promises = stationname.map(data => {
    return new Promise((resolve, reject) => {



      db.query("SELECT COUNT(*) AS count ,servicestation FROM booking WHERE status ='pending' and servicestation=? and  bookingdate = DATE_ADD(?, INTERVAL 0 DAY) ", [data, dateoftoday], (err, result) => {
        if (err) {
          reject(err);
        } else {

          resolve(result[0]); // Assuming we expect only one result per tripid
        }
      }
      );
    });
  });

  Promise.all(promises)
    .then(results => {
      //   console.log(results,"data")
      return res.status(200).json(results);
    })
    .catch(error => {
      //   console.log(error)
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    });
})

router.get("/customerreviecustomerdate", (req, res) => {

  const { station, fromDate, toDate } = req.query;
  const formattedFromDate = moment(fromDate).format('YYYY-MM-DD');
  const formattedToDate = moment(toDate).format('YYYY-MM-DD');
  // console.log(formattedFromDate,"for",formattedToDate)

  // const dateoftoday=req.params.dateoftoday
  //  console.log(station, fromDate, toDate,"dtae")
  // const station = req.params.station;
  const stationname = station?.split(',');
  // console.log(stationname,"name")


  const promises = stationname.map(data => {
    return new Promise((resolve, reject) => {



      db.query("SELECT COUNT(*) AS count ,servicestation FROM booking WHERE status ='pending' and servicestation=? and  bookingdate >= DATE_ADD(?, INTERVAL 0 DAY) and bookingdate <= DATE_ADD(?, INTERVAL 1 DAY);", [data, formattedFromDate, formattedToDate], (err, result) => {
        if (err) {
          reject(err);
        } else {

          resolve(result[0]); // Assuming we expect only one result per tripid
        }
      }
      );
    });
  });

  Promise.all(promises)
    .then(results => {
      //   console.log(results,"data")
      return res.status(200).json(results);
    })
    .catch(error => {
      //   console.log(error)
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    });
})

// get amount in tripsheet by bill_amount_update success by selected month
router.get('/getBilledAmountTripApi', (req, res) => {
  const { selectedMonth, selectedYear } = req.query; // expected format 'YYYY-MM'
  // console.log(selectedMonth, "selectedMonth--------------------------", selectedYear);

  const sqlQueryBilledAmount = `
  SELECT totalcalcAmount 
FROM tripsheet 
WHERE MONTH(startdate) = ? AND YEAR(startdate) = ? AND Bill_Amount_Update = 'Success'

  `;

  db.query(sqlQueryBilledAmount, [selectedMonth, selectedYear], (error, result) => {
    if (error) {
      // console.log(error, "error");
      return res.status(500).json({ error: "Database query error" });
    }
    // console.log(result, "billamountresultttttttttttttttttttttttttttttttttttttttttt");

    return res.status(200).json(result);
  });
});

// get amount in tripsheet by bill_amount_update success by All months and selectedyear
router.get('/getAllBilledAmountTripApi', (req, res) => {
  const { selectedYear } = req.query;
  const sqlBillAmountQuery = `SELECT totalcalcAmount FROM tripsheet WHERE YEAR(startdate) = ? AND Bill_Amount_Update = 'Success'`;

  db.query(sqlBillAmountQuery, [selectedYear], (error, result) => {
    if (error) {
      console.log(error, "error");
    }
    // console.log(result, "Allbillamount");
    return res.status(200).json(result);

  })

})


// vendor amount details filter by month and year
router.get('/getvendorAmountDetails', (req, res) => {
  const { selectedMonth, selectedYear } = req.query;

  // const year = new Date(selectedMonth).getFullYear();
  const month = new Date(selectedMonth).getMonth() + 1;
  const year = parseInt(selectedYear)
  // console.log(selectedMonth, "selectedDate", "Year:", year, "Month:", month, selectedYear, typeof (year), year);

  const sqlVendorAmountQuery = `
    SELECT 
      SUM(CASE WHEN Vendor_FULLTotalAmount > 0 THEN Vendor_FULLTotalAmount ELSE 0 END) AS totalVendorAmount,
      SUM(totalcalcAmount) AS totalCalcAmount,
      (SUM(totalcalcAmount) - SUM(CASE WHEN Vendor_FULLTotalAmount > 0 THEN Vendor_FULLTotalAmount ELSE 0 END)) AS profit
    FROM tripsheet
    WHERE MONTH(startdate) = ?
      AND YEAR(startdate) = ?
      AND Vendor_FULLTotalAmount IS NOT NULL
      AND Vendor_FULLTotalAmount != 0
  `;

  db.query(sqlVendorAmountQuery, [month, year], (err, result) => {
    if (err) {
      // console.error(err);
      return res.status(500).send("Database error");
    }

            const updatedResult = result.map(item => ({
    ...item,
    profit: item.profit < 0 ? 0 : item.profit
  }));
      // console.log(updatedResult, "vendorrrrrrrrrrresult", updatedResult.length);
    return res.status(200).json(updatedResult[0]);
  });
});



// vendor all amount details filter by year

router.get('/getVendorAmountAllDetails', (req, res) => {
  const { selectedYear } = req.query;
  // console.log(selectedYear, "selectedYearrrr");

  const sql = `
  SELECT 
  SUM(CASE WHEN Vendor_FULLTotalAmount > 0 THEN Vendor_FULLTotalAmount ELSE 0 END) AS totalVendorAmount,
  SUM(totalcalcAmount) AS totalCalcAmount,
  (SUM(totalcalcAmount) - SUM(CASE WHEN Vendor_FULLTotalAmount > 0 THEN Vendor_FULLTotalAmount ELSE 0 END)) AS profit
FROM tripsheet
WHERE YEAR(startdate) = ?
  AND Vendor_FULLTotalAmount IS NOT NULL
  AND Vendor_FULLTotalAmount != 0

  `;

  db.query(sql, [selectedYear], (error, result) => {
    if (error) {
      // console.log(error, "error");
      return res.status(500).json({ error });
    }

        const updatedResult = result.map(item => ({
    ...item,
    profit: item.profit < 0 ? 0 : item.profit
  }));
      // console.log(updatedResult, "AllVendorResult");

    return res.status(200).json(updatedResult[0]);
  });
});

// get start month to current month in this year All
router.get('/getAllSelectedMonthProfit', (req, res) => {
  let { selectedYear } = req.query;

  // if not passed, take current date values
  const currentDate = new Date();

  const compareyear = currentDate.getFullYear();
  const year = parseInt(selectedYear)
  const monthLimit = compareyear === year ? currentDate.getMonth() + 1 : 12;

  // console.log("Year:", year, "Selected Month:", monthLimit);

  const sqlQuery = `
    SELECT 
      MONTH(startdate) AS month,
      SUM(totalcalcAmount) AS totalCalcAmount,
      SUM(CASE WHEN Vendor_FULLTotalAmount > 0 THEN Vendor_FULLTotalAmount ELSE 0 END) AS totalVendorAmount,
      (SUM(totalcalcAmount) - SUM(CASE WHEN Vendor_FULLTotalAmount > 0 THEN Vendor_FULLTotalAmount ELSE 0 END)) AS profit
    FROM tripsheet
    WHERE YEAR(startdate) = ?
      AND MONTH(startdate) BETWEEN 1 AND ?
      AND Vendor_FULLTotalAmount IS NOT NULL
      AND Vendor_FULLTotalAmount != 0
    GROUP BY MONTH(startdate)
    ORDER BY MONTH(startdate)
  `;

  db.query(sqlQuery, [year, monthLimit], (err, result) => {
    if (err) {
      // console.error(err);
      return res.status(500).send("Database error");
    }

         const updatedResult = result.map(item => ({
    ...item,
    profit: item.profit < 0 ? 0 : item.profit
  }));
  // console.log(updatedResult,"result");
  
    return res.status(200).json(updatedResult);
  });
});

// get start month to current month selected year and selected month
// router.get('/getFromToSelectedMonthProfit', (req, res) => {
//   let { selectedMonth, selectedYear } = req.query;

//   if (!selectedMonth || !selectedYear) {
//     return res.status(400).send("selectedMonth and selectedYear are required");
//   }

//   const month = new Date(selectedMonth).getMonth() + 1;
//   const year = parseInt(selectedYear);

//   console.log("Selected Year:", year, "Selected Month:", month);

//   const sqlQuery = `
//     SELECT 
//       MONTH(startdate) AS month,
//       SUM(totalcalcAmount) AS totalCalcAmount,
//       SUM(CASE WHEN Vendor_FULLTotalAmount > 0 THEN Vendor_FULLTotalAmount ELSE 0 END) AS totalVendorAmount,
//       (SUM(totalcalcAmount) - SUM(CASE WHEN Vendor_FULLTotalAmount > 0 THEN Vendor_FULLTotalAmount ELSE 0 END)) AS profit
//     FROM tripsheet
//     WHERE YEAR(startdate) = ?
//       AND MONTH(startdate) = ?
//       AND Vendor_FULLTotalAmount IS NOT NULL
//       AND Vendor_FULLTotalAmount != 0
//     GROUP BY MONTH(startdate)
//   `;

//   db.query(sqlQuery, [year, month], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send("Database error");
//     }

//       const updatedResult = result.map(item => ({
//     ...item,
//     profit: item.profit < 0 ? 0 : item.profit
//   }));

//   console.log(updatedResult, "profit result for selected month");
//     return res.status(200).json(updatedResult);
//   });
// });

// get profit details to get from to end selected  year
router.get('/getAllCurrentAndPreviousYearReports', (req, res) => {
  let { fromSelectedYear, toSelectedYear } = req.query;

  fromSelectedYear = parseInt(fromSelectedYear);
  toSelectedYear = parseInt(toSelectedYear);

  if (isNaN(fromSelectedYear) || isNaN(toSelectedYear) || fromSelectedYear > toSelectedYear) {
    return res.status(400).json({ error: 'Invalid year range' });
  }

  const yearQueries = [];
  for (let year = fromSelectedYear; year <= toSelectedYear; year++) {
    yearQueries.push(`SELECT ${year} AS year`);
  }

  const yearsList = yearQueries.join(' UNION ALL ');

  // console.log(yearsList, "yearlist");

  const sqlQuery = `
    SELECT 
      y.year,
      IFNULL(SUM(t.totalcalcAmount), 0) AS totalCalcAmount,
      IFNULL(SUM(CASE WHEN t.Vendor_FULLTotalAmount > 0 THEN t.Vendor_FULLTotalAmount ELSE 0 END), 0) AS totalVendorAmount,
      (IFNULL(SUM(t.totalcalcAmount), 0) - IFNULL(SUM(CASE WHEN t.Vendor_FULLTotalAmount > 0 THEN t.Vendor_FULLTotalAmount ELSE 0 END), 0)) AS profit
    FROM (
      ${yearsList}
    ) y
    LEFT JOIN tripsheet t ON YEAR(t.startdate) = y.year
      AND t.Vendor_FULLTotalAmount IS NOT NULL
      AND t.Vendor_FULLTotalAmount != 0
    GROUP BY y.year
    ORDER BY y.year
  `;

  db.query(sqlQuery, (err, results) => {
    if (err) {
      // console.error("Error fetching year totals:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
         const updatedResult = results.map(item => ({
    ...item,
    profit: item.profit < 0 ? 0 : item.profit
  }));
    res.json(updatedResult);
  });
});


module.exports = router;