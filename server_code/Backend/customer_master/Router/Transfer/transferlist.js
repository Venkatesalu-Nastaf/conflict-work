const express = require('express');
const router = express.Router();
const db = require('../../../db');

router.get('/payment-detail', (req, res) => {
  const { customer, fromDate, toDate, servicestation } = req.query;

  let query = 'SELECT * FROM billing WHERE 1=1';
  let params = [];

  if (customer) {
    const decodedCustomer = decodeURIComponent(customer);
    query += ' AND customer = ?';
    params.push(decodedCustomer);
  }

  if (fromDate && toDate) {
    query += ' AND Billingdate >= DATE_ADD(?, INTERVAL 0 DAY) AND Billingdate <= DATE_ADD(?, INTERVAL 1 DAY)';
    params.push(fromDate);
    params.push(toDate);
  }

  if (servicestation) {
    query += ' AND station = ?';
    params.push(servicestation);
  }

  db.query(query, params, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }
    return res.status(200).json(result);
  });
});
// newww one-----------------------------------------
router.get('/newtripsheetcustomertripid/:customer/:tripid', async (req, res) => {
  const customer = req.params.customer;
  const tripid = req.params.tripid.split(',');
  const decodedCustomer = decodeURIComponent(customer);
  // Query to get tripsheet details
  db.query('SELECT * FROM tripsheet WHERE customer = ? AND tripid IN (?)', [decodedCustomer, tripid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Tripsheet not found' });
    }

    let vehtypes = result.map(obj => obj.vehicleName);

    db.query('select vehicleName, fueltype ,segement from vehicleinfo where vehicleName IN (?)', [vehtypes], (err, result1) => {
      if (err) {

        return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
      }
      if (result1.length === 0) {
        return res.status(404).json({ error: 'Tripsheet not found' });
      }
      // console.log(result1,'result vehicle');
      const vehicleDataMap = {};
      result1.forEach(row => {
        vehicleDataMap[row.vehicleName] = { fueltype: row.fueltype, segement: row.segement };

      });

      db.query('select customer,gstTax,address1 from customers where customer=?', [customer], (err, result2) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
        }
        if (result2.length === 0) {

          return res.status(404).json({ error: 'customer not found' });
        }


        result2.forEach(row => {
          // vehicleDataMap[row.customer]={gsttax:row.gstTax}
          vehicleDataMap[row.customer] = { gsttax: row.gstTax, Customeraddress1: row.address1 };

        })

        // })

        // Add fueltype to each object in the result array
        result.forEach(obj => {

          const vehicleData = vehicleDataMap[obj.vehicleName];
          const customerdetails = vehicleDataMap[obj.customer];
          obj.fueltype = vehicleData ? vehicleData.fueltype : 'Unknown'; // Set default value if fueltype not found
          obj.segement = vehicleData ? vehicleData.segement : 'Unknown';
          // obj.Groups = vehicleData ? vehicleData.Groups : 'unknown';
          obj.driverBeta_amount = obj.driverBeta_amount === null ? 0 : obj.driverBeta_amount;
          obj.toll = !obj.toll ? 0 : obj.toll;
          obj.permit = !obj.permit ? 0 : obj.permit;
          obj.parking = !obj.parking ? 0 : obj.parking;
          obj.starttime1 = obj.starttime;
          obj.gstTax = customerdetails ? customerdetails.gsttax : 'unknown'
          obj.CustomerAddress1 = customerdetails ? customerdetails.Customeraddress1 : 'unknown';

        });


        return res.status(200).json(result);
      })
    })
  });
});
// ----------------------------newone-------------------------------------

router.get('/tripsheetcustomertripid/:customer/:tripid', async (req, res) => {
  const customer = req.params.customer;
  const tripid = req.params.tripid.split(',');
  const decodedCustomer = decodeURIComponent(customer);
  // Query to get tripsheet details
  db.query('SELECT * FROM tripsheet WHERE customer = ? AND tripid IN (?)', [decodedCustomer, tripid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Tripsheet not found' });
    }

    let vehtypes = result.map(obj => obj.vehicleName);

    db.query('select vehicleName, fueltype ,segement from vehicleinfo where vehicleName IN (?)', [vehtypes], (err, result1) => {
      if (err) {

        return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
      }
      if (result1.length === 0) {
        return res.status(404).json({ error: 'Tripsheet not found' });
      }
      // console.log(result1,'result vehicle');
      const vehicleDataMap = {};
      result1.forEach(row => {
        vehicleDataMap[row.vehicleName] = { fueltype: row.fueltype, segement: row.segement };

      });

      db.query('select customer,gstTax,address1 from customers where customer=?', [customer], (err, result2) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
        }
        if (result2.length === 0) {

          return res.status(404).json({ error: 'customer not found' });
        }


        result2.forEach(row => {
          // vehicleDataMap[row.customer]={gsttax:row.gstTax}
          vehicleDataMap[row.customer] = { gsttax: row.gstTax, Customeraddress1: row.address1 };

        })

        // })

        // Add fueltype to each object in the result array
        result.forEach(obj => {

          const vehicleData = vehicleDataMap[obj.vehicleName];
          const customerdetails = vehicleDataMap[obj.customer];
          obj.fueltype = vehicleData ? vehicleData.fueltype : 'Unknown'; // Set default value if fueltype not found
          obj.segement = vehicleData ? vehicleData.segement : 'Unknown';
          // obj.Groups = vehicleData ? vehicleData.Groups : 'unknown';

          obj.gstTax = customerdetails ? customerdetails.gsttax : 'unknown'
          obj.CustomerAddress1 = customerdetails ? customerdetails.Customeraddress1 : 'unknown';

        });



        return res.status(200).json(result);
      })
    })
  });
});





router.get('/tripsheetcustomer/:customer', (req, res) => {
  const customer = req.params.customer;
  db.query('SELECT * FROM tripsheet WHERE customer = ?', customer, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Tripsheet not found' });
    }
    return res.status(200).json(result);
  });
});

router.get('/tripsheetiddata/:id', (req, res) => {
  const { id } = req.params;
  const tripIds = id?.split(','); // Parse the JSON string to an array


  // Prepare the query with placeholders
  const query = 'SELECT * FROM tripsheet WHERE status = "Billed" AND  tripid IN (?)';

  // Execute the query with tripIds as parameters
  db.query(query, [tripIds], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    return res.status(200).json(result);
  });
});

//for status update
router.post('/updateStatus', (req, res) => {
  const { tripids, status } = req.body;

  const query = 'UPDATE tripsheet SET status = ? WHERE tripid IN (?)';

  db.query(query, [status, tripids], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.status(200).json({ message: 'Status updated successfully' });
  });
});

router.post('/updateStatusremove', (req, res) => {
  const { tripids, status } = req.body;
  const query = 'UPDATE tripsheet SET status = ? WHERE tripid IN (?)';
  db.query(query, [status, tripids], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.status(200).json({ message: 'Status updated successfully' });
  });
});

router.get('/normaltransferdata_trip/:customer', (req, res) => {
  const customer = req.params.customer;
  db.query('SELECT * FROM tripsheet WHERE customer = ?', customer, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Route data not found' });
    }
    const routeData = result;
    return res.status(200).json(routeData);
  });
});

router.get('/Get-Billing', (req, res) => {
  const { customer, fromDate, toDate, servicestation } = req.query;

  let query = 'SELECT * FROM billing WHERE 1';
  let params = [];

  if (customer) {
    const decodedCustomer = decodeURIComponent(customer);
    query += ' AND customer = ?';
    params.push(decodedCustomer);
  }

  if (fromDate) {
    query += ' AND fromdate = ?';
    params.push(fromDate);
  }

  if (toDate) {
    query += ' AND todate = ?';
    params.push(toDate);
  }

  if (servicestation) {
    query += ' AND station = ?';
    params.push(servicestation);
  }

  db.query(query, params, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }
    return res.status(200).json(result);
  });
});
// router.post('/transferlistdatatrip', (req, res) => {
//   const { Status, Billdate, Organization_name, FromDate, EndDate, Trips, Amount, Trip_id } = req.body;
//   const sqlquery = 'insert into Transfer_list(Status,Billdate,Organization_name,Trip_id,FromDate,EndDate,Trips,Amount) values(?,?,?,?,?,?,?,?)'

//   if (!Array.isArray(Trip_id)) {
//     return res.status(400).json({ error: 'id should be an array' });
//   }
//   const idString = Trip_id.join(',');
//   db.query(sqlquery, [Status, Billdate, Organization_name, idString, FromDate, EndDate, Trips, Amount], (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: 'Failed to retrieve  from MySQL' });
//     }
//     return res.status(200).json({ message: 'inserted successfully' });
//   });

// });

// update TransferList Particular Tripid
router.post('/updateParticularTransferList', (req, res) => {
  const { Billdate, Organization_name, FromDate, EndDate, Trips, Amount, Trip_id, grouptripid } = req.body;
  const tripIdString = Array.isArray(Trip_id) ? Trip_id.join(',') : Trip_id;

  if (!grouptripid) {
    return res.status(400).json({ error: 'grouptripid is required' });
  }

  // First query to update Transfer_list
  const updateQuery = `
    UPDATE Transfer_list 
    SET Billdate = ?, Organization_name = ?, FromDate = ?, EndDate = ?, Trips = ?, Amount = ?, Trip_id = ?
    WHERE Grouptrip_id = ?`;

  db.query(updateQuery, [Billdate, Organization_name, FromDate, EndDate, Trips, Amount, tripIdString, grouptripid], (error, result) => {
    if (error) {
      console.error('Database query error:', error);
      return res.status(500).json({ error: 'Database query failed' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'No record found with the provided grouptripid' });
    }

    // Second query to update tripsheet
    const updateTripSheetQuery = `UPDATE tripsheet SET status='Billed', Billed_Status = 'Transfer_Closed', GroupTripId=? WHERE tripid IN (?)`;

    db.query(updateTripSheetQuery, [grouptripid, Trip_id], (err, tripSheetResult) => {
      if (err) {
        console.error('Error updating tripsheet:', err);
        return res.status(500).json({ error: 'Failed to update tripsheet' });
      }

      // Success response after both queries execute successfully
      res.status(200).json({ message: 'Transfer list and tripsheet updated successfully' });
    });
  });
});


// get transferList Where GroupTripId
router.get('/getParticularTransferListDetails', (req, res) => {
  const { groupId } = req.query;

  if (!groupId) {
    return res.status(400).json({ error: 'groupId is required' });
  }

  db.query('SELECT * FROM Transfer_list WHERE Grouptrip_id = ?', [groupId], (error, result) => {
    if (error) {
      return res.status(500).json({ error: 'Database query failed' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'No transfer list found for the provided groupId' });
    }

    res.status(200).json(result);
  });
});

router.post('/insertTransferListTrip', (req, res) => {
  const { Status, Billdate, Organization_name, FromDate, EndDate, grouptripid, Trips, Amount, Trip_id } = req.body;

  const tripIdString = Array.isArray(Trip_id) ? Trip_id.join(',') : Trip_id;

  // Check if grouptripid exists
  const checkGroupTripIdQuery = 'SELECT Grouptrip_id FROM Transfer_list WHERE Grouptrip_id = ?';

  db.query(checkGroupTripIdQuery, [grouptripid], (checkError, checkResult) => {
    if (checkError) {
      console.log(checkError);
      return res.status(500).json({ error: 'Error checking Grouptrip_id.' });
    }

    if (checkResult.length > 0) {
      // If grouptripid exists, insert the new data
      const sqlQuery = `
        INSERT INTO Transfer_list 
        (Status, Billdate, Organization_name, FromDate, EndDate, Trips, Amount, Trip_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) WHERE Grouptrip_id=?`;

      db.query(
        sqlQuery,
        [Status, Billdate, Organization_name, FromDate, EndDate, grouptripid, Trips, Amount, tripIdString],
        (error, result) => {
          if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Failed to insert transfer list.' });
          }

          res.status(200).json({ message: 'Transfer list inserted successfully.', result });
        }
      );
    } else {
      // If grouptripid does not exist, return a not found message
      res.status(404).json({ message: 'Grouptrip_id not found, insert failed.' });
    }
  });
});
router.post('/transferlistdatatrip', (req, res) => {
  const { Status, Billdate, Organization_name, FromDate, EndDate, Trips, Amount, Trip_id } = req.body;

  if (!Array.isArray(Trip_id)) {
    return res.status(400).json({ error: 'Trip_id should be an array' });
  }

  const sqlquery = 'INSERT INTO Transfer_list(Status, Billdate, Organization_name, Trip_id, FromDate, EndDate, Trips, Amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const idString = Trip_id.join(',');

  // Insert into Transfer_list table
  db.query(sqlquery, [Status, Billdate, Organization_name, idString, FromDate, EndDate, Trips, Amount], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to insert data into MySQL' });
    }

    // Update tripsheet to set Billed_Status
    const updateQuery = "UPDATE tripsheet SET  status='Billed',Billed_Status = 'Transfer_Closed' WHERE tripid IN (?)";
    db.query(updateQuery, [Trip_id], (err, updateResult) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to update Billed_Status in MySQL' });
      }

      // Fetch Grouptrip_id from Transfer_list
      const groupidquery = `SELECT Grouptrip_id FROM Transfer_list WHERE Trip_id IN (?)`;
      db.query(groupidquery, [idString], (error, groupResult) => {
        if (error) {
          return res.status(500).json({ error: 'Failed to fetch Grouptrip_id from MySQL' });
        }

        if (groupResult.length > 0) {
          const groupTripId = groupResult[0].Grouptrip_id;

          // Update tripsheet with GroupTripId
          const tripsheetUpdateQuery = `UPDATE tripsheet SET GroupTripId = ? WHERE tripid IN (?)`;
          db.query(tripsheetUpdateQuery, [groupTripId, Trip_id], (updateError, finalResult) => {
            if (updateError) {
              return res.status(500).json({ error: 'Failed to update GroupTripId in tripsheet' });
            }

            return res.status(200).json({ message: 'Inserted and updated successfully', groupTripId });
          });
        } else {
          return res.status(404).json({ error: 'No Grouptrip_id found' });
        }
      });
    });
  });
});



// router.post('/transferlistdatatrip', (req, res) => {
//   const { Status, Billdate, Organization_name, FromDate, EndDate, Trips, Amount, Trip_id } = req.body;
//   const sqlquery = 'INSERT INTO Transfer_list(Status,Billdate,Organization_name,Trip_id,FromDate,EndDate,Trips,Amount) VALUES(?,?,?,?,?,?,?,?)';

//   if (!Array.isArray(Trip_id)) {
//     return res.status(400).json({ error: 'id should be an array' });
//   }

//   const idString = Trip_id.join(',');

//   db.query(sqlquery, [Status, Billdate, Organization_name, idString, FromDate, EndDate, Trips, Amount], (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: 'Failed to insert data into MySQL' });
//     }

//     const updateQuery = "UPDATE tripsheet SET Billed_Status = 'Transfer_Closed' WHERE tripid IN (?)";
//     db.query(updateQuery, [Trip_id], (err, updateResult) => {
//       if (err) {
//         return res.status(500).json({ error: 'Failed to update Billed_Status in MySQL' });
//       }
//       console.log(updateResult, 'updateresult');

//       return res.status(200).json({ message: 'Inserted and updated successfully' });
//     });
//   });
// });
router.get('/getparticulartransfer_list', (req, res) => {
  const { tripid } = req.query;  // tripid should be an array like ['1358', '1367']

  if (!tripid) {
    return res.status(400).json({ error: 'Trip ID is required' });
  }

  // If tripid is a single value, make it an array to handle both cases
  const tripidArray = Array.isArray(tripid) ? tripid : [tripid];

  // Create a SQL query using FIND_IN_SET for each trip ID
  const conditions = tripidArray.map(() => `FIND_IN_SET(?, Trip_id) > 0`).join(' OR ');

  // Build the final query
  const sqlquery = `SELECT Grouptrip_id FROM Transfer_list WHERE ${conditions}`;

  // Execute the query with tripidArray
  db.query(sqlquery, tripidArray, (err, result) => {
    if (err) {
      console.log(err, 'error');
      return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
    }

    return res.status(200).json(result);
  });
});

// getTripdetails from transferList Tripid
router.get('/getTripsheetDetailsFromTransferTripId', (req, res) => {
  const { transferTripId } = req.query;

  if (!transferTripId) {
    return res.status(400).json({ error: 'Transfer Trip ID is required' });
  }
  // Split the string into an array if it's a comma-separated string
  const tripIdArray = transferTripId.includes(',')
    ? transferTripId.split(',')  // Split the string by commas
    : [transferTripId];          // If it's already a single value, wrap it in an array

  const sqlquery = `SELECT * FROM tripsheet WHERE tripid IN (?)`;

  db.query(sqlquery, [tripIdArray], (error, result) => {
    if (error) {
      console.error(error, 'error');
      return res.status(500).json({ error: 'Failed to retrieve data from MySQL' });
    }

    return res.status(200).json(result);
  });
});




// get Tripid by GroupTripId
router.get('/getTripIdFromTransferList', (req, res) => {
  const { groupid } = req.query;

  if (!groupid) {
    return res.status(400).json({ error: 'Group ID is required' });
  }
  const sqlquery = `SELECT Trip_id,Organization_name,Trips,Invoice_no,Billdate,FromDate,EndDate FROM Transfer_list WHERE Grouptrip_id = ?`;

  db.query(sqlquery, [groupid], (error, result) => {
    if (error) {
      console.error(error, 'error');
      return res.status(500).json({ error: 'Failed to retrieve data from MySQL' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'No Trip IDs found for the given Group ID' });
    }

    return res.status(200).json(result);
  });
});


router.get('/gettransfer_list', (req, res) => {
  db.query('SELECT * FROM Transfer_list', (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
    }
    return res.status(200).json(result);

  });

})

// update remove list in Transferlist
router.get('/EmptyRowDelete', (req, res) => {
  // First query to get Grouptrip_id where Trip_id is empty
  db.query('SELECT Grouptrip_id FROM Transfer_list WHERE Trip_id IS NULL OR Trip_id = ""', (error, result) => {
    if (error) {
      console.error('Error fetching Grouptrip_id:', error);
      return res.status(500).json({ error: 'Database query error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'No Grouptrip_id found with empty Trip_id' });
    }

    const grouptripId = result[0].Grouptrip_id;

    db.query('DELETE FROM Transfer_list WHERE Grouptrip_id = ?', [grouptripId], (deleteError, deleteResult) => {
      if (deleteError) {
        console.error('Error deleting row:', deleteError);
        return res.status(500).json({ error: 'Error deleting row' });
      }

      if (deleteResult.affectedRows === 0) {
        return res.status(404).json({ error: 'No rows deleted' });
      }

      res.status(200).json({ message: 'Row deleted successfully', grouptripId });
    });
  });
});

router.put('/updateList', async (req, res) => {
  try {
    const { Trip_id, Trips, Amount } = req.body;

    // Ensure Trip_id is an array
    if (!Array.isArray(Trip_id)) {
      return res.status(400).json({ error: "Trip_id must be an array" });
    }

    let sqlUpdateTransferList;

    if (Trips === 0) {
      sqlUpdateTransferList = `
        UPDATE Transfer_list 
        SET Trips = ?, 
            Amount = ?, 
            Status = "notbilled", 
            Trip_id = TRIM(BOTH ',' FROM REPLACE(REPLACE(CONCAT(',', Trip_id, ','), CONCAT(',', ?, ','), ','), ',,', ',')) 
        WHERE FIND_IN_SET(?, Trip_id) > 0
      `;
    } else {
      sqlUpdateTransferList = `
        UPDATE Transfer_list 
        SET Trips = ?, 
            Amount = ?, 
            Trip_id = TRIM(BOTH ',' FROM REPLACE(REPLACE(CONCAT(',', Trip_id, ','), CONCAT(',', ?, ','), ','), ',,', ',')) 
        WHERE FIND_IN_SET(?, Trip_id) > 0
      `;
    }

    const updatePromises = Trip_id.map(tripId => {
      return new Promise((resolve, reject) => {
        db.query(sqlUpdateTransferList, [Trips, Amount, tripId, tripId], (err, updateGroupBillingResult) => {
          if (err) {
            return reject(err);
          }

          if (updateGroupBillingResult.affectedRows > 0) {
            // Second query to update `tripsheet` table
            const sqlUpdateTripsheet = `
              UPDATE tripsheet 
              SET status = 'Closed', 
                  Billed_Status = NULL, 
                  apps = 'Closed', 
                  GroupTripId = NULL 
              WHERE tripid IN (?)
            `;

            db.query(sqlUpdateTripsheet, [tripId], (err, updateTripsheetResult) => {
              if (err) {
                return reject(err);
              }

              resolve(updateTripsheetResult);
            });
          } else {
            reject(new Error("No rows affected in Transfer_list"));
          }
        });
      });
    });

    // Execute all promises and send the result once all are complete
    Promise.all(updatePromises)
      .then(results => {
        res.status(200).json({ message: "Update successful", results });
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


// router.put('/updateList', async (req, res) => {
//   try {
//     const { Trip_id, Trips, Amount } = req.body;
//     console.log(Trip_id,Trips, Amount,'update');
//     let sqlUpdateTransferList;
//  if(Trips==="0"){
//    sqlUpdateTransferList = `UPDATE Transfer_list 
//   SET Trips = ?, 
//       Amount = ?,
//       Status = "notbilled",
//       Trip_id = TRIM(BOTH ',' FROM REPLACE(REPLACE(CONCAT(',', Trip_id, ','), CONCAT(',', ?, ','), ','), ',,', ',')) 
//   WHERE FIND_IN_SET(?, Trip_id) > 0`;
//  }
//  else{
//   sqlUpdateTransferList = `UPDATE Transfer_list 
//   SET Trips = ?, 
//       Amount = ?, 
//       Trip_id = TRIM(BOTH ',' FROM REPLACE(REPLACE(CONCAT(',', Trip_id, ','), CONCAT(',', ?, ','), ','), ',,', ',')) 
//   WHERE FIND_IN_SET(?, Trip_id) > 0`;
//  }


//     const updatePromises = Trip_id.map(tripId => {
//       return new Promise((resolve, reject) => {
//         db.query(sqlUpdateTransferList, [Trips, Amount, tripId, tripId], (err, updateGroupBillingResult) => {
//           if (err) {
//             reject(err);
//           } else {
//             if (updateGroupBillingResult.affectedRows > 0) {
//               // Second query to update `tripsheet` table if the first update was successful
//               const sqlUpdateTripsheet = `UPDATE tripsheet 
//                                           SET status = 'Closed', 
//                                               Billed_Status = NULL, 
//                                               apps = 'Closed' ,
//                                               GroupTripId=NULL
//                                           WHERE tripid IN (?)`;

//               db.query(sqlUpdateTripsheet, [tripId], (err, updateTripsheetResult) => {
//                 if (err) {
//                   reject(err);
//                 } else {
//                   console.log(updateGroupBillingResult,'updatetripsheet');

//                   resolve(updateTripsheetResult);
//                 }
//               });
//             } else {
//               reject(new Error("No rows affected in Transfer_list"));
//             }
//           }
//         });
//       });
//     });

//     // Execute all promises and send the result once all are complete
//     Promise.all(updatePromises)
//       .then(results => {
//         res.status(200).json({ message: "Update successful", results });
//       })
//       .catch(error => {
//         res.status(500).json({ error: error.message });
//       });

//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });



// router.put('/updateList', async (req, res) => {
//   try {
//     const { Trip_id, Trips, Amount } = req.body;

//     const sqlUpdateTransferList = "UPDATE Transfer_list SET Trips = ?, Amount = ?, Trip_id = TRIM(BOTH ',' FROM REPLACE(REPLACE(CONCAT(',', Trip_id, ','), CONCAT(',', ?, ','), ','), ',,', ',')) WHERE FIND_IN_SET(?, Trip_id) > 0";

//     const updatePromises = Trip_id.map(tripId => {
//       return new Promise((resolve, reject) => {
//         db.query(sqlUpdateTransferList, [Trips, Amount, tripId, tripId], (err, updateGroupBillingResult) => {
//           if (err) {
//             // console.log(err, 'error');
//             reject(err);
//           } else {
//             if (updateGroupBillingResult.affectedRows > 0) {
//               db.query(`UPDATE tripsheet SET status=Closed,Billed_Status=NULL,apps=Closed WHERE tripid IN (?)`,[])
//               resolve(updateGroupBillingResult);
//             } else {
//               reject(new Error("No rows affected"));
//             }
//           }
//         });
//       });
//     });

//     // Wait for all update queries to finish
//     const updateResults = await Promise.all(updatePromises);
//     res.status(200).json(updateResults);
//   } catch (err) {
//     console.log(err, 'error');
//     res.status(500).json({ error: "An error occurred. Please try again later." });
//   }
// });


router.post('/tripsheetUpdate', (req, res) => {
  const { tripids, status } = req.body;
  const query = 'UPDATE tripsheet SET status = ? WHERE tripid IN (?)';
  db.query(query, [status, tripids], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.status(200).json({ message: 'Status updated successfully' });
  });
});

// update Remove details in tripsheet
router.post('/removeUpdateTripsheet', (req, res) => {
  const { tripid } = req.body;
  const tripIdsArray = Array.isArray(tripid) ? tripid : [tripid];

  const query = `UPDATE tripsheet SET Billed_Status = NULL,status = Closed WHERE tripid IN (?)`;

  db.query(query, [tripIdsArray], (err, result) => {
    if (err) {
      return res.status(500).send({ error: 'Database update failed' });
    }
    res.status(200).json(result);

    res.status(200).send({ message: 'Tripsheet updated successfully', result });
  });
});


// router.put('/updateList',(req,res)=>{
//   const {Trip_id,Trips,Amount}= req.body;
//   console.log(typeof(Trip_id),Trip_id,Trips,Amount,'response');
//   const sqlUpdateTransferList =  "UPDATE Transfer_list SET Trips = ?, Amount = ?, Trip_id = TRIM(BOTH ',' FROM REPLACE(REPLACE(CONCAT(',', Trip_id, ','), CONCAT(',', ?, ','), ','), ',,', ',')) WHERE FIND_IN_SET(?, Trip_id) > 0";
//   Trip_id.forEach(tripId => {
//     console.log(tripId, 'tttt');
//     db.query(sqlUpdateTransferList, [Trips, Amount, tripId, tripId], (err, updateGroupBillingResult) => {
//       console.log(Trips, Amount, tripId, 'wwwww');
//       if (err) {
//         console.log(err, 'error');
//         return res.status(500).json({ error: "Failed to update data in MySQL" });
//       }
//       console.log(updateGroupBillingResult, 'result');
//       if(updateGroupBillingResult.affectedRows>0){
//       res.status(200).json(updateGroupBillingResult)
//       }
//     });
//   });
// })

// router.put('/statusupdate', (req, res) => {
//   const { Trips, Amount, Trip_id } = req.body;
//   console.log(Trips,Amount,Trip_id,typeof(Trip_id),'reqqqqqqqq');
//   const sqlUpdate = "UPDATE tripsheet SET status = 'Covering_Closed', apps = 'Closed' WHERE tripid = ?";
//   const sqlUpdateGroupBilling = "UPDATE Group_billing SET Trips=?, Amount=?, Trip_id = TRIM(BOTH ',' FROM REPLACE(REPLACE(CONCAT(',', Trip_id, ','), CONCAT(',', ?, ','), ','), ',,', ',')) WHERE FIND_IN_SET(?, Trip_id) > 0 ";

//   db.query(sqlUpdate, [Trip_id], (err, updateResult) => {
//     if (err) {
//       return res.status(500).json({ error: "Failed to update data in MySQL" });
//     }

//     db.query(sqlUpdateGroupBilling, [Trips, Amount, Trip_id, Trip_id], (err, updateGroupBillingResult) => {
//       console.log(Trips, Amount, Trip_id,Trip_id,'wwwww');
//       if (err) {
//         return res.status(500).json({ error: "Failed to update data in MySQL" });
//       }
// console.log(updateGroupBillingResult,'result');
//       return res.status(200).json({ message: "Data updated successfully" });
//     });
//   });
// });



router.get('/updateTransferListdata/:groupId', (req, res) => {
  const groupId = req.params.groupId;
  const sqlquery = "SELECT * FROM Transfer_list where Grouptrip_id = ?";

  db.query(sqlquery, [groupId], (err, result) => {
    if (err) {
      console.log(err, 'error');
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(result);
  });
});

router.delete('/deleteTransfer/:groupid', (req, res) => {
  const groupid = req.params.groupid;
  const sql = "DELETE FROM Transfer_list WHERE Grouptrip_id = ?";

  db.query(sql, [groupid], (err, result) => {
    if (err) {
      console.log(err, 'error');
      return res.status(500).json({ error: "Failed to delete data from MySQL" });
    }
    return res.status(200).json({ message: "Data deleted successfully" });
  });
});





router.put('/statusChangeTransfer/:invoiceno', (req, res) => {
  const { invoiceno } = req.params;
  const sqlquery = 'update Transfer_list set Status="Billed" where Invoice_no = ? ';
  db.query(sqlquery, [invoiceno], (err, result) => {
    if (err) {
      console.log(err, 'error');
    }
    return res.status(200).json({ message: "Data updated successfully" });

  })
})

// router.put('/statusChangeTripsheet/:tripid', (req, res) => {
//   const { tripid } = req.params;
//   // console.log(tripid,'update');

//   // Check if tripid is defined
//   if (!tripid) {
//     return res.status(400).json({ error: "Trip ID is required" });
//   }

//   const tripIds = tripid.split(',');
//   const sqlquery = 'UPDATE tripsheet SET status="Billed", apps="Closed" WHERE tripid IN (?)';
//   const updateQuery = "UPDATE tripsheet SET Billed_Status = 'Transfer_Closed' WHERE tripid IN (?)";

//   db.query(sqlquery, [tripIds], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: "Internal server error" });
//     }
//     // console.log(result,'result tripsheet');
//     return res.status(200).json({ message: "Data updated successfully" });
//   });
// });

router.put('/statusChangeTripsheet/:tripid', (req, res) => {
  const { tripid } = req.params;

  // Check if tripid is defined
  if (!tripid) {
    return res.status(400).json({ error: "Trip ID is required" });
  }

  const tripIds = tripid.split(',');
  const sqlquery = 'UPDATE tripsheet SET status="Billed", apps="Closed" WHERE tripid IN (?)';
  const updateQuery = "UPDATE tripsheet SET Billed_Status = 'Transfer_Billed' WHERE tripid IN (?)";

  // Execute the first query
  db.query(sqlquery, [tripIds], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }

    // After the first query is successful, execute the second query
    db.query(updateQuery, [tripIds], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Send the response after both queries have been executed
      return res.status(200).json({ message: "Data updated successfully" });
    });
  });
});




router.get('/gettransfer_listdatas', (req, res) => {
  const { Status, Organization_name, FromDate, EndDate } = req.query;
  // console.log(Status,decodeURIComponent(Organization_name), FromDate, EndDate,"pppp")
  const orgName =decodeURIComponent(Organization_name)

 
  // const { Status  } = req.query;
  if (Status === "all") {
    db.query('SELECT * FROM Transfer_list where  Organization_name=?  AND FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 1 DAY)', [orgName, FromDate, EndDate], (err, result) => {
      // db.query('SELECT * FROM Transfer_list where Status=? ',[Status],(err, result) => {
      // 
      if (err) {
        return res.status(500).json({message: 'Failed to retrieve to data'});
      }
      return res.status(200).json(result);

    });
  }
  else if (Status === "billed") {
    db.query('SELECT * FROM Transfer_list where  Organization_name=?  AND FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 1 DAY) AND Status = ?', [orgName, FromDate, EndDate, Status], (err, result) => {

      if (err) {
        // return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
        return res.status(500).json({message: 'Failed to retrieve to data' });
      }
      return res.status(200).json(result);

    });
  }
  // else if (Status === "notbilled") {
  //   db.query('SELECT * FROM Transfer_list1 where  Organization_name=?  AND FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 1 DAY) AND Status = ?', [orgName, FromDate, EndDate, Status], (err, result) => {

  //     if (err) {
  //       // return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
  //       console.log(orgName, FromDate, EndDate, Status);
  //       return res.status(500).json({message: 'Failed to retrieve to data' });
       
  //     }
  //     //return res.status(200).json(result);
  //     return res.status(200).json({ result, message: 'Listed Sucessfully' });


  //   });
  // }
  else if (Status === "notbilled") {
    db.query('SELECT * FROM Transfer_list WHERE Organization_name=? AND FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 1 DAY) AND Status = ?', [orgName, FromDate, EndDate, Status], (err, result) => {
      
      if (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({ message: 'Failed to retrieve data' });
      }
      
      if (result.length === 0) {
        return res.status(404).json({ message: 'No data found' });
      }
      
      return res.status(200).json({ result, message: 'Listed Successfully' });
    });
  }
  

 

})




router.get('/pdfdatatransferreporttripid2/:customer/:tripid', async (req, res) => {
  const customer = req.params.customer;
  const tripids = req.params.tripid.split(',');

  const decodedCustomer = decodeURIComponent(customer);

  const promises = tripids.map(tripid => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        SELECT 
        ts.*, 
        vi.fueltype AS fueltype, 
        vi.segement AS segment, 
        c.gstTax AS gstTax,
        c.address1 AS Customeraddress1,
        JSON_ARRAYAGG(JSON_OBJECT('imagees',tri.path)) AS bookattachedimage,
        JSON_ARRAYAGG(JSON_OBJECT('attachedimageurl', us.path)) AS Attachedimage,
        JSON_ARRAYAGG(JSON_OBJECT('trip_type', gd.trip_type, 'place_name', gd.place_name)) AS gmapdata,
        JSON_OBJECT('signature_path', s.signature_path) AS signature_data,
        JSON_OBJECT('map_path', mi.path) AS map_data
    FROM 
        tripsheet AS ts
    LEFT JOIN 
        vehicleinfo AS vi ON ts.vehicleName = vi.vehicleName
    LEFT JOIN 
        customers AS c ON ts.customer = c.customer
    LEFT JOIN 
        gmapdata AS gd ON ts.tripid = gd.tripid
    LEFT JOIN 
        signatures AS s ON ts.tripid = s.tripid
    LEFT JOIN 
        mapimage AS mi ON ts.tripid = mi.tripid
    LEFT JOIN 
        tripsheetupload AS us ON ts.tripid = us.tripid
    LEFT JOIN 
        booking_doc AS tri ON ts.tripid = tri.booking_id
    WHERE 
        ts.customer = ? AND ts.tripid = ?
    GROUP BY 
        ts.tripid;
    
        `,
        [decodedCustomer, tripid],
        (err, result) => {
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

      return res.status(200).json(results);
    })
    .catch(error => {
      console.log(error)
      return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
    });
});

// to get particular Tripsheet details
router.get('/togetSelectTripsheetDetails', (req, res) => {
  const { Trip_id } = req.query;
  const tripIdsArray = Array.isArray(Trip_id) ? Trip_id : [Trip_id];

  const query = 'SELECT * FROM tripsheet WHERE tripid IN (?)';

  db.query(query, [tripIdsArray], (err, results) => {
    if (err) {
      return res.status(500).send({ error: 'Database query failed' });
    }
    res.status(200).send(results);
  });
});



module.exports = router;
