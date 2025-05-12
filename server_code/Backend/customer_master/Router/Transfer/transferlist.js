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

// router.get('/statedetails',(req,res)=>{
//   const { state } = req.query;
//   db.query('SELECT * FROM stationcreation WHERE state = ? ', [state], (err, result) => {
//     if(err){
//       return res.status(500).json({ error: 'Failed to retrieve state from MySQL' });
//     }

//       console.log(result, 'results fromn the state')
//       return res.status(200).json(result);

//   })
// })
router.get('/statedetails', (req, res) => {
  const { state } = req.query; // Get the state from the query parameters
  db.query('SELECT * FROM stationcreation ', (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve state from MySQL' });
    }
    if (result.length === 0) {
      // If no results were found for the given state
      return res.status(404).json({ error: 'No records found for this state' });
    }

    return res.status(200).json(result); // Send back the results if found
  });
});

// newww one-----------------------------------------
// router.get('/newtripsheetcustomertripid/:customer/:tripid', async (req, res) => {
//   const customer = req.params.customer;
//   const tripid = req.params.tripid.split(',');
//   const decodedCustomer = decodeURIComponent(customer);
//   // Query to get tripsheet details
//   db.query('SELECT * FROM tripsheet WHERE customer = ? AND tripid IN (?) ORDER BY startdate', [decodedCustomer, tripid], (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
//     }
//     if (result.length === 0) {
//       return res.status(404).json({ error: 'Tripsheet not found' });
//     }

//     // let vehtypes = result.map(obj => obj.vehicleName);
//     let vehtypes = result.map(obj => obj.vehRegNo);


//     db.query('select vehRegNo, fueltype ,segement from vehicleinfo where  vehRegNo IN (?)', [vehtypes], (err, result1) => {
//       if (err) {

//         return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
//       }
//       if (result1.length === 0) {
//         return res.status(404).json({ error: 'Tripsheet not found' });
//       }
//       // console.log(result1,'result vehicle');
//       // const vehicleDataMap = {};
//       // result1.forEach(row => {
//       //   vehicleDataMap[row.vehicleName] = { fueltype: row.fueltype, segement: row.segement };

//       // });

//       const vehicleDataMap = {};
//       result1.forEach(row => {
//         vehicleDataMap[row.vehRegNo] = { fueltype: row.fueltype, segement: row.segement };

//       });


//       db.query('select customer,gstTax,address1 from customers where customer=?', [customer], (err, result2) => {
//         if (err) {
//           return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
//         }
//         if (result2.length === 0) {

//           return res.status(404).json({ error: 'customer not found' });
//         }


//         result2.forEach(row => {
//           // vehicleDataMap[row.customer]={gsttax:row.gstTax}
//           vehicleDataMap[row.customer] = { gsttax: row.gstTax, Customeraddress1: row.address1 };

//         })

//         // })

//         // Add fueltype to each object in the result array
//         result.forEach(obj => {

//           // const vehicleData = vehicleDataMap[obj.vehicleName];
//           const vehicleData = vehicleDataMap[obj.vehRegNo];
//           const customerdetails = vehicleDataMap[obj.customer];
//           obj.fueltype = vehicleData ? vehicleData.fueltype : 'Unknown'; // Set default value if fueltype not found
//           obj.segement = vehicleData ? vehicleData.segement : 'Unknown';
//           // obj.Groups = vehicleData ? vehicleData.Groups : 'unknown';
//           obj.driverBeta_amount = obj.driverBeta_amount === null ? 0 : obj.driverBeta_amount;
//           obj.toll = !obj.toll ? 0 : obj.toll;
//           obj.permit = !obj.permit ? 0 : obj.permit;
//           obj.parking = !obj.parking ? 0 : obj.parking;
//           obj.starttime1 = obj.starttime;
//           obj.gstTax = customerdetails ? customerdetails.gsttax : 'unknown'
//           obj.CustomerAddress1 = customerdetails ? customerdetails.Customeraddress1 : 'unknown';

//         });


//         return res.status(200).json(result);
//       })
//     })
//   });
// });

// new modify for vehregno-----------------
router.get('/newtripsheetcustomertripid/:customer/:tripid', async (req, res) => {
  const customer = req.params.customer;
  const tripid = req.params.tripid.split(',');
  const decodedCustomer = decodeURIComponent(customer);
  // Query to get tripsheet details
  db.query('SELECT * FROM tripsheet WHERE customer = ? AND tripid IN (?) ORDER BY startdate', [decodedCustomer, tripid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Tripsheet not found' });
    }

    // let vehtypes = result.map(obj => obj.vehicleName);
    let vehtypes = result.map(obj => obj.vehRegNo);


    db.query('select vehRegNo, fueltype ,segement from vehicleinfo where  vehRegNo IN (?)', [vehtypes], (err, result1) => {
      if (err) {

        return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
      }
      // if (result1.length === 0) {
      //   return res.status(404).json({ error: 'Tripsheet not found' });
      // }
      // console.log(result1,'result vehicle');
      // const vehicleDataMap = {};
      // result1.forEach(row => {
      //   vehicleDataMap[row.vehicleName] = { fueltype: row.fueltype, segement: row.segement };

      // });

      const vehicleDataMap = {};
      if (result1.length > 0) {
        result1.forEach(row => {
          vehicleDataMap[row.vehRegNo] = { fueltype: row.fueltype, segement: row.segement };

        });
      }


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

          // const vehicleData = vehicleDataMap[obj.vehicleName];
          const vehicleData = vehicleDataMap[obj.vehRegNo];
          const customerdetails = vehicleDataMap[obj.customer];
          obj.fueltype = vehicleData ? vehicleData.fueltype : '-'; // Set default value if fueltype not found
          obj.segement = vehicleData ? vehicleData.segement : '-';
          // obj.Groups = vehicleData ? vehicleData.Groups : 'unknown';
          obj.driverBeta_amount = obj.driverBeta_amount === null ? 0 : obj.driverBeta_amount;
          obj.toll = !obj.toll ? 0 : obj.toll;
          obj.permit = !obj.permit ? 0 : obj.permit;
          obj.parking = !obj.parking ? 0 : obj.parking;
          obj.starttime1 = obj.starttime;
          obj.totalkmdata = obj.totalkm1;
          obj.gstTax = customerdetails ? customerdetails.gsttax : 'unknown'
          obj.CustomerAddress1 = customerdetails ? customerdetails.Customeraddress1 : 'unknown';

        });
        // console.log(result,"re")


        return res.status(200).json(result);
      })
    })
  });
});
// ----------------------------newone-------------------------------------

// router.get('/tripsheetcustomertripid/:customer/:tripid', async (req, res) => {
//   const customer = req.params.customer;
//   const tripid = req.params.tripid.split(',');
//   const decodedCustomer = decodeURIComponent(customer);
//   // Query to get tripsheet details
//   db.query('SELECT * FROM tripsheet WHERE customer = ? AND tripid IN (?)', [decodedCustomer, tripid], (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
//     }
//     if (result.length === 0) {
//       return res.status(404).json({ error: 'Tripsheet not found' });
//     }

//     // let vehtypes = result.map(obj => obj.vehicleName);
//     let vehtypes = result.map(obj => obj.vehRegNo);

//     db.query('select  vehRegNo, fueltype ,segement from vehicleinfo where  vehRegNo IN (?)', [vehtypes], (err, result1) => {
//       if (err) {

//         return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
//       }
//       if (result1.length === 0) {
//         return res.status(404).json({ error: 'Tripsheet not found' });
//       }
//       // console.log(result1,'result vehicle');
//       const vehicleDataMap = {};
//       result1.forEach(row => {
//         vehicleDataMap[row.vehRegNo] = { fueltype: row.fueltype, segement: row.segement };

//       });

//       db.query('select customer,gstTax,address1 from customers where customer=?', [customer], (err, result2) => {
//         if (err) {
//           return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
//         }
//         if (result2.length === 0) {

//           return res.status(404).json({ error: 'customer not found' });
//         }


//         result2.forEach(row => {
//           // vehicleDataMap[row.customer]={gsttax:row.gstTax}
//           vehicleDataMap[row.customer] = { gsttax: row.gstTax, Customeraddress1: row.address1 };

//         })

//         // })

//         // Add fueltype to each object in the result array
//         result.forEach(obj => {

//           const vehicleData = vehicleDataMap[obj.vehRegNo];
//           const customerdetails = vehicleDataMap[obj.customer];
//           obj.fueltype = vehicleData ? vehicleData.fueltype : 'Unknown'; // Set default value if fueltype not found
//           obj.segement = vehicleData ? vehicleData.segement : 'Unknown';
//           // obj.Groups = vehicleData ? vehicleData.Groups : 'unknown';

//           obj.gstTax = customerdetails ? customerdetails.gsttax : 'unknown'
//           obj.CustomerAddress1 = customerdetails ? customerdetails.Customeraddress1 : 'unknown';

//         });



//         return res.status(200).json(result);
//       })
//     })
//   });
// });


// this code modified for vehregno--------------------------------
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

    // let vehtypes = result.map(obj => obj.vehicleName);
    let vehtypes = result.map(obj => obj.vehRegNo);

    db.query('select  vehRegNo, fueltype ,segement from vehicleinfo where  vehRegNo IN (?)', [vehtypes], (err, result1) => {
      if (err) {

        return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
      }
      // if (result1.length === 0) {
      //   return res.status(404).json({ error: 'Tripsheet not found' });
      // }
      // console.log(result1,'result vehicle');
      const vehicleDataMap = {};
      if (result.length > 0) {
        result1.forEach(row => {
          vehicleDataMap[row.vehRegNo] = { fueltype: row.fueltype, segement: row.segement };

        });
      }

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

          const vehicleData = vehicleDataMap[obj.vehRegNo];
          const customerdetails = vehicleDataMap[obj.customer];
          obj.fueltype = vehicleData ? vehicleData.fueltype : '-'; // Set default value if fueltype not found
          obj.segement = vehicleData ? vehicleData.segement : '-';
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
  const { Billdate, Organization_name, FromDate, EndDate, Trips, Amount, Trip_id, grouptripid, Status } = req.body;
  const tripIdString = Array.isArray(Trip_id) ? Trip_id.join(',') : Trip_id;

  if (!grouptripid) {
    return res.status(400).json({ error: 'grouptripid is required' });
  }

  // First query to update Transfer_list
  const updateQuery = `
    UPDATE Transfer_list 
    SET Billdate = ?, Organization_name = ?, FromDate = ?, EndDate = ?, Trips = ?, Amount = ?, Trip_id = ?,Status=?
    WHERE Grouptrip_id = ?`;

  db.query(updateQuery, [Billdate, Organization_name, FromDate, EndDate, Trips, Amount, tripIdString, Status, grouptripid], (error, result) => {
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
  const { Status, Billdate, Organization_name, FromDate, EndDate, Trips, Amount, Trip_id, Stations, State } = req.body;

  if (!Array.isArray(Trip_id)) {
    return res.status(400).json({ error: 'Trip_id should be an array' });
  }

  const sqlquery = 'INSERT INTO Transfer_list(Status, Billdate, Organization_name, Trip_id, FromDate, EndDate, Trips, Amount,Stations,State) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)';
  const idString = Trip_id.join(',');

  // Insert into Transfer_list table
  db.query(sqlquery, [Status, Billdate, Organization_name, idString, FromDate, EndDate, Trips, Amount, Stations, State], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to insert data into MySQL' });
    }

    // Update tripsheet to set Billed_Status
    const updateQuery = "UPDATE tripsheet SET  status='Billed',Billed_Status = 'Transfer_Closed' WHERE tripid IN (?) ";
    db.query(updateQuery, [Trip_id], (err, updateResult) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to update Billed_Status in MySQL' });
      }

      // Fetch Grouptrip_id from Transfer_list
      const groupidquery = `SELECT Grouptrip_id FROM Transfer_list WHERE Trip_id IN (?) AND Stations = ?`;
      db.query(groupidquery, [idString, Stations], (error, groupResult) => {
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
  const sqlquery = `SELECT Trip_id,Organization_name,Trips,Invoice_no,Billdate,FromDate,EndDate,State FROM Transfer_list WHERE Grouptrip_id = ?`;

  db.query(sqlquery, [groupid], (error, result) => {
    if (error) {
      console.error(error, 'error');
      return res.status(500).json({ error: 'Failed to retrieve data from MySQL' });
    }

    // if (result.length === 0) {
    //   return res.status(404).json({ message: 'No Trip IDs found for the given Group ID' });
    // }

    return res.status(200).json(result);
  });
});


router.get('/getTripIdFromTransferListforinvoiceno', (req, res) => {
  const { invoicno, State } = req.query;

  if (!invoicno) {
    return res.status(400).json({ error: 'Group ID is required' });
  }
  const sqlquery = `SELECT Grouptrip_id,Trip_id,Organization_name,Trips,Invoice_no,Billdate,FromDate,EndDate,State FROM Transfer_list WHERE Invoice_no = ? AND  State = ?`;

  db.query(sqlquery, [invoicno, State], (error, result) => {
    if (error) {
      console.error(error, 'error');
      return res.status(500).json({ error: 'Failed to retrieve data from MySQL' });
    }

    // if (result.length === 0) {
    //   return res.status(404).json({ message: 'No Trip IDs found for the given Group ID' });
    // }

    return res.status(200).json(result);
  });
});



router.get('/gettransfer_list/:userdata', (req, res) => {
  const { userdata } = req.params;
  //  console.log(filteredStationNames,"jjj")

  db.query("SELECT Stationname FROM usercreation WHERE username = ?", [userdata], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch data" });
    }

    if (result && result.length > 0) {

      const station = result[0]?.Stationname;
      const stationArr = station.split(',')

      const data = stationArr.map(el => ({ Stationname: el }))

      if (station?.toLowerCase() === "all" || stationArr.includes("All")) {
        db.query('SELECT * FROM Transfer_list ', (err, result) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
          }
          return res.status(200).json(result);

        })
      }
      else {

        db.query('SELECT * FROM Transfer_list where Stations IN (?)', [stationArr], (err, result) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
          }
          return res.status(200).json(result);

        });

      }
    }
    else {
      return res.status(200).json([]);
    }

    // db.query('SELECT * FROM Transfer_list', (err, result) => {
    //   if (err) {
    //     return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
    //   }
    //   return res.status(200).json(result);

    // });

  })
});

// router.get('/gettransfer_list', (req, res) => {
//   db.query('SELECT * FROM Transfer_list', (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
//     }
//     return res.status(200).json(result);

//   });

// })

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





// router.put('/statusChangeTransfer/:invoiceno', (req, res) => {
//   const { invoiceno } = req.params;
//   const sqlquery = 'update Transfer_list set Status="Billed" where Invoice_no = ? ';
//   db.query(sqlquery, [invoiceno], (err, result) => {
//     if (err) {
//       console.log(err, 'error');
//     }
//     return res.status(200).json({ message: "Data updated successfully" });

//   })
// })

// const getNextInvoiceNo1 = (state) => {
//   const query = `
//     SELECT CASE
//       WHEN GREATEST(
//           COALESCE((SELECT MAX(CAST(SUBSTRING(Invoice_no, 3) AS UNSIGNED)) FROM Transfer_list WHERE State = ?), 0),
//           COALESCE((SELECT MAX(CAST(SUBSTRING(Invoice_No, 3) AS UNSIGNED)) FROM Individual_Billing WHERE State = ?), 0),
//           COALESCE((SELECT MAX(CAST(SUBSTRING(Invoice_No, 3) AS UNSIGNED)) FROM GroupBillinginvoice_no WHERE State = ?), 0)
//       ) + 1 < 10 
//       THEN 
//       LPAD(
//       GREATEST(
//               COALESCE((SELECT MAX(CAST(SUBSTRING(Invoice_no, 3) AS UNSIGNED)) FROM Transfer_list WHERE State = ?), 0),
//               COALESCE((SELECT MAX(CAST(SUBSTRING(Invoice_No, 3) AS UNSIGNED)) FROM Individual_Billing WHERE State = ?), 0),
//               COALESCE((SELECT MAX(CAST(SUBSTRING(Invoice_No, 3) AS UNSIGNED)) FROM GroupBillinginvoice_no WHERE State = ?), 0)
//           ) + 1, 
//           2, '0')
//       ELSE 
//         GREATEST(
//               COALESCE((SELECT MAX(CAST(SUBSTRING(Invoice_no, 3) AS UNSIGNED)) FROM Transfer_list WHERE State = ?), 0),
//               COALESCE((SELECT MAX(CAST(SUBSTRING(Invoice_No, 3) AS UNSIGNED)) FROM Individual_Billing WHERE State = ?), 0),
//               COALESCE((SELECT MAX(CAST(SUBSTRING(Invoice_No, 3) AS UNSIGNED)) FROM GroupBillinginvoice_no WHERE State = ?), 0)
//           ) + 1
//     END AS max_invoiceno;
//   `;

//   // Run the query to find the maximum invoice number
//   return new Promise((resolve, reject) => {
//     db.query(
//       query,
//       [state, state, state, state, state, state,state, state, state], // Pass the correct number of parameters
//       (err, result) => {
//         if (err) {
//           reject(err); // Reject on error
//         } else if (result.length > 0) {
//           const nextInvoiceNo = `IV${result[0].max_invoiceno}`; // Prefix 'IV' to the invoice number
//           resolve(nextInvoiceNo); // Resolve with the next invoice number
//         } else {
//           resolve(null); // Handle case where no result is found
//         }
//       }
//     );
//   });
// };


const getNextInvoiceNo = (state) => {
  // const query = `
  //   SELECT GREATEST(
  //       COALESCE((SELECT MAX(CAST(SUBSTRING(Invoice_no, 3) AS UNSIGNED)) FROM Transfer_list WHERE State = ?), 0),
  //       COALESCE((SELECT MAX(CAST(SUBSTRING(Invoice_No, 3) AS UNSIGNED)) FROM Individual_Billing WHERE State = ?), 0),
  //       COALESCE((SELECT MAX(CAST(SUBSTRING(Invoice_No, 3) AS UNSIGNED)) FROM GroupBillinginvoice_no WHERE State = ?), 0)
  //   ) + 1 AS max_invoiceno;
  // `;

  const query = `
  SELECT GREATEST(
      COALESCE((SELECT MAX(CAST(Invoice_no AS UNSIGNED)) FROM Transfer_list WHERE State = ?), 0),
      COALESCE((SELECT MAX(CAST(Invoice_No AS UNSIGNED)) FROM Individual_Billing WHERE State = ?), 0),
      COALESCE((SELECT MAX(CAST(Invoice_No AS UNSIGNED)) FROM GroupBillinginvoice_no WHERE State = ?), 0)
  ) + 1 AS max_invoiceno;
`;

  // Run the query to find the maximum invoice number
  return new Promise((resolve, reject) => {
    db.query(query, [state, state, state], (err, result) => {
      if (err) {
        reject(err); // Reject on error
      } else if (result.length > 0) {

        // const nextInvoiceNo = `IV${result[0].max_invoiceno}`;
        const nextInvoiceNo1 = result[0].max_invoiceno;
        const newInvoiceNo2 = parseInt(nextInvoiceNo1, 10).toString().padStart(3, '0');
        // const formattedInvoiceNo = String(nextInvoiceNo).padStart(3, '0');
        // const nextInvoiceNo = result[0].max_invoiceno
        // const nextInvoiceNo = `IV${newInvoiceNo2}`;
        const nextInvoiceNo = newInvoiceNo2
        resolve(nextInvoiceNo); // Resolve with the next invoice number
      } else {
        resolve(null); // Handle case where no result is found
      }
    });
  });
};



router.put('/statusChangeTransfer/:invoiceno/:State', async (req, res) => {
  const { invoiceno, State } = req.params;
  const nextInvoiceNo = await getNextInvoiceNo(State);
  const sqlquery = 'update Transfer_list set Status="Billed",Invoice_no = ? where Grouptrip_id = ? ';
  db.query(sqlquery, [nextInvoiceNo, invoiceno], (err, result) => {
    if (err) {
      console.log(err, 'error');
    }
    return res.status(200).json({ message: "Data updated successfully" });

  })
})

router.get('/Transferlistgetinvoicenolast/:Grouptrip', async (req, res) => {
  const { Grouptrip } = req.params;
  const sqlquery = 'select Invoice_no  from  Transfer_list where Grouptrip_id = ? ';
  db.query(sqlquery, [Grouptrip], (err, result) => {
    if (err) {
      console.log(err, 'error');
    }
    console.log(result)
    return res.status(200).json(result);

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
  const { Status, Organization_name, FromDate, EndDate, Station, } = req.query;
  console.log(Status, decodeURIComponent(Organization_name), FromDate, EndDate, "pppp", Station)
  const orgName = decodeURIComponent(Organization_name)

  // console.log(data,"ll")

  if (Station) {  // const { Status  } = req.query;
    console.log(Station, "SSALLLL")
    if (Status === "all") {
      db.query('SELECT * FROM Transfer_list where  Organization_name=?  AND FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 1 DAY) AND State = ?', [orgName, FromDate, EndDate, Station], (err, result) => {
        // db.query('SELECT * FROM Transfer_list where Status=? ',[Status],(err, result) => {
        // 
        if (err) {
          return res.status(500).json({ message: 'Failed to retrieve to data' });
        }
        return res.status(200).json(result);

      });
    }
    else if (Status === "billed") {
      db.query('SELECT * FROM Transfer_list where  Organization_name=?  AND FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 1 DAY) AND Status = ? AND State = ?', [orgName, FromDate, EndDate, Status, Station], (err, result) => {

        if (err) {
          // return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
          return res.status(500).json({ message: 'Failed to retrieve to data' });
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
      db.query('SELECT * FROM Transfer_list WHERE Organization_name=? AND FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 1 DAY) AND  Status = ? AND State = ?', [orgName, FromDate, EndDate, Status, Station], (err, result) => {

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
  }
  else {

    if (Status === "all") {
      db.query('SELECT * FROM Transfer_list where  Organization_name=?  AND FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 1 DAY) ', [orgName, FromDate, EndDate], (err, result) => {
        // db.query('SELECT * FROM Transfer_list where Status=? ',[Status],(err, result) => {
        // 
        if (err) {
          return res.status(500).json({ message: 'Failed to retrieve to data' });
        }
        return res.status(200).json(result);

      });
    }
    else if (Status === "billed") {
      db.query('SELECT * FROM Transfer_list where  Organization_name=?  AND FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 1 DAY) AND Status = ? ', [orgName, FromDate, EndDate, Status], (err, result) => {

        if (err) {
          // return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
          return res.status(500).json({ message: 'Failed to retrieve to data' });
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
      db.query('SELECT * FROM Transfer_list WHERE Organization_name=? AND FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 1 DAY) AND Status = ? ', [orgName, FromDate, EndDate, Status], (err, result) => {

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

  }



})



// router.get('/gettransfer_listdatas', (req, res) => {
//   const { Status, Organization_name, FromDate, EndDate } = req.query;
//   // console.log(Status,decodeURIComponent(Organization_name), FromDate, EndDate,"pppp")
//   const orgName =decodeURIComponent(Organization_name)


//   // const { Status  } = req.query;
//   if (Status === "all") {
//     db.query('SELECT * FROM Transfer_list where  Organization_name=?  AND FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 1 DAY)', [orgName, FromDate, EndDate], (err, result) => {
//       // db.query('SELECT * FROM Transfer_list where Status=? ',[Status],(err, result) => {
//       // 
//       if (err) {
//         return res.status(500).json({message: 'Failed to retrieve to data'});
//       }
//       return res.status(200).json(result);

//     });
//   }
//   else if (Status === "billed") {
//     db.query('SELECT * FROM Transfer_list where  Organization_name=?  AND FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 1 DAY) AND Status = ?', [orgName, FromDate, EndDate, Status], (err, result) => {

//       if (err) {
//         // return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
//         return res.status(500).json({message: 'Failed to retrieve to data' });
//       }
//       return res.status(200).json(result);

//     });
//   }
//   // else if (Status === "notbilled") {
//   //   db.query('SELECT * FROM Transfer_list1 where  Organization_name=?  AND FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 1 DAY) AND Status = ?', [orgName, FromDate, EndDate, Status], (err, result) => {

//   //     if (err) {
//   //       // return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
//   //       console.log(orgName, FromDate, EndDate, Status);
//   //       return res.status(500).json({message: 'Failed to retrieve to data' });

//   //     }
//   //     //return res.status(200).json(result);
//   //     return res.status(200).json({ result, message: 'Listed Sucessfully' });


//   //   });
//   // }
//   else if (Status === "notbilled") {
//     db.query('SELECT * FROM Transfer_list WHERE Organization_name=? AND FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 1 DAY) AND Status = ?', [orgName, FromDate, EndDate, Status], (err, result) => {

//       if (err) {
//         console.error(err); // Log the error for debugging
//         return res.status(500).json({ message: 'Failed to retrieve data' });
//       }

//       if (result.length === 0) {
//         return res.status(404).json({ message: 'No data found' });
//       }

//       return res.status(200).json({ result, message: 'Listed Successfully' });
//     });
//   }




// })




// router.get('/pdfdatatransferreporttripid2/:customer/:tripid', async (req, res) => {
//   const customer = req.params.customer;
//   const tripids = req.params.tripid.split(',');

//   const decodedCustomer = decodeURIComponent(customer);

//   const promises = tripids.map(tripid => {
//     return new Promise((resolve, reject) => {
//       db.query(
//         `
//         SELECT 
//         ts.*, 
//         vi.fueltype AS fueltype, 
//         vi.segement AS segment, 
//         c.gstTax AS gstTax,
//         c.address1 AS Customeraddress1,
//         JSON_ARRAYAGG(JSON_OBJECT('imagees',tri.path)) AS bookattachedimage,
//         JSON_ARRAYAGG(JSON_OBJECT('attachedimageurl', us.path)) AS Attachedimage,
//         JSON_ARRAYAGG(JSON_OBJECT('trip_type', gd.trip_type, 'place_name', gd.place_name)) AS gmapdata,
//         JSON_OBJECT('signature_path', s.signature_path) AS signature_data,
//         JSON_OBJECT('map_path', mi.path) AS map_data
//     FROM 
//         tripsheet AS ts
//     LEFT JOIN 
//         vehicleinfo AS vi ON ts.vehRegNo = vi.vehRegNo
//     LEFT JOIN 
//         customers AS c ON ts.customer = c.customer
//     LEFT JOIN 
//         gmapdata AS gd ON ts.tripid = gd.tripid AND gd.trip_type IN ("start","waypoint","end")
//     LEFT JOIN 
//         signatures AS s ON ts.tripid = s.tripid
//     LEFT JOIN 
//         mapimage AS mi ON ts.tripid = mi.tripid
//   LEFT JOIN 
//         tripsheetupload AS us ON ts.tripid = us.tripid AND us.documenttype NOT IN ('StartingKm', 'ClosingKm')
//     LEFT JOIN 
//         booking_doc AS tri ON ts.tripid = tri.booking_id
//     WHERE 
//         ts.customer = ? AND ts.tripid = ?
//     GROUP BY 
//         ts.id,vi.fueltype,vi.segement,c.gstTax,c.address1,s.signature_path,mi.path
    
//         `,
//         [decodedCustomer, tripid],
//         (err, result) => {
//           if (err) {
//             console.log(err, 'error');

//             reject(err);
//           } else {
//             // console.log(result,'pdfzippppppppppppppppppppp');

//             resolve(result); // Assuming we expect only one result per tripid
//           }
//         }
//       );
//     });
//   });

//   Promise.all(promises)
//     .then(results => {
//       //  console.log(results,'pdfzippppppppppppppppppppp');
//       return res.status(200).json(results);
//     })
//     .catch(error => {
//       console.log(error)
//       return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
//     });
// });
router.get('/pdfdatatransferreporttripid2/:customer/:tripid', async (req, res) => {
  const customer = req.params.customer;
  const tripids = req.params.tripid.split(',');
  const decodedCustomer = decodeURIComponent(customer);

  let clientDisconnected = false;

  req.on('close', () => {
    console.log('Client disconnected before request completed.');
    clientDisconnected = true;
  });

  const results = [];

  try {
    for (const tripid of tripids) {
      if (clientDisconnected) {
        console.log('Aborting further DB calls after client disconnect.');
        break;
      }

      const result = await new Promise((resolve, reject) => {
        db.query(
          `
          SELECT 
            ts.*, 
            vi.fueltype AS fueltype, 
            vi.segement AS segment, 
            c.gstTax AS gstTax,
            c.address1 AS Customeraddress1,
            JSON_ARRAYAGG(JSON_OBJECT('imagees', tri.path)) AS bookattachedimage,
            JSON_ARRAYAGG(JSON_OBJECT('attachedimageurl', us.path)) AS Attachedimage,
            JSON_ARRAYAGG(JSON_OBJECT('trip_type', gd.trip_type, 'place_name', gd.place_name)) AS gmapdata,
            JSON_OBJECT('signature_path', s.signature_path) AS signature_data,
            JSON_OBJECT('map_path', mi.path) AS map_data
          FROM 
            tripsheet AS ts
          LEFT JOIN 
            vehicleinfo AS vi ON ts.vehRegNo = vi.vehRegNo
          LEFT JOIN 
            customers AS c ON ts.customer = c.customer
          LEFT JOIN 
            gmapdata AS gd ON ts.tripid = gd.tripid AND gd.trip_type IN ("start","waypoint","end")
          LEFT JOIN 
            signatures AS s ON ts.tripid = s.tripid
          LEFT JOIN 
            mapimage AS mi ON ts.tripid = mi.tripid
          LEFT JOIN 
            tripsheetupload AS us ON ts.tripid = us.tripid AND us.documenttype NOT IN ('StartingKm', 'ClosingKm')
          LEFT JOIN 
            booking_doc AS tri ON ts.tripid = tri.booking_id
          WHERE 
            ts.customer = ? AND ts.tripid = ?
          GROUP BY 
            ts.id, vi.fueltype, vi.segement, c.gstTax, c.address1, s.signature_path, mi.path
          `,
          [decodedCustomer, tripid],
          (err, result) => {
            if (clientDisconnected) {
              console.log(`Skipping result for tripid ${tripid} due to disconnection`);
              return resolve(null);
            }
            if (err) {
              console.error(`Error retrieving data for tripid ${tripid}:`, err);
              return reject(err);
            }
            resolve(result);
          }
        );
      });

      results.push(result);
    }
   console.log(results,"lll")
    if (!clientDisconnected) {

      return res.status(200).json(results);
    } else {
      console.log('Not sending response — client already disconnected.');
    }
  } catch (error) {
    console.error('Query processing failed:', error);
    if (!clientDisconnected) {
      return res.status(500).json({ error: 'Failed to retrieve tripsheet details' });
    }
  }
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
router.get('/customerdatamothergroup/:customers', (req, res) => {
  const { customers } = req.params;


  const query = 'SELECT * FROM customers where customer = ?';
  const sql1 = 'SELECT state FROM customers where customer = ?';

  db.query(query, [customers], (err, results) => {
    if (err) {
      console.log(err)
      return res.status(500).send({ error: 'Database query failed' });
    }

    if (results.length > 0) {
      const data = results[0].billingGroup || null;
      if (data === null) {
        const datas = results[0].state || null;
        return res.status(200).json(datas);
      }
      else {
        db.query(sql1, [data], (err, results1) => {
          if (err) {
            console.log(err, "sql1")
            return res.status(500).send({ error: 'Database query failed' });
          }
          const datas = results1[0].state || null;
          return res.status(200).json(datas);
        })
      }
    }
    else {
      return res.status(500).json([]);
    }

    // res.status(200).send(results);
  });
});

// router.get('/customerDetailsAndGroupBillingDetails/:customer', (req, res) => {
//   const { customer } = req.params;
//   console.log(customer, 'params customer');

//   const customerQuery = 'SELECT * FROM customers WHERE customer = ?';
//   const stationQuery = 'SELECT * FROM stationcreation WHERE state = ? AND gstno IS NOT NULL AND gstno != ""';
//   const billingGroupstationQuery = 'SELECT * FROM stationcreation WHERE state = ? AND gstno IS NOT NULL AND gstno != ""';

//   db.query(customerQuery, [customer], (err, customerResult) => {
//     if (err) {
//       console.log(err, 'error');
//       return res.status(500).json({ error: 'Database error' });
//     }

//     if (customerResult.length === 0) {
//       return res.status(404).json({ error: 'Customer not found' });
//     }

//     const groupBilling = customerResult[0].billingGroup;
//     console.log(customerResult, 'customer result', groupBilling);

//     if (groupBilling) {
//       const groupBillingQuery = 'SELECT * FROM customers WHERE customer = ?';

//       db.query(groupBillingQuery, [groupBilling], (err, billingResult) => {
//         if (err) {
//           console.log(err, 'error');
//           return res.status(500).json({ error: 'Database error' });
//         }

//         console.log(billingResult, 'billing result');

//         res.status(200).json(
//            billingResult,
//         );
//       });
//     } else {
//       res.status(200).json(
//          customerResult,
//       );
//     }
//   });
// });

// router.get('/customerDetailsAndGroupBillingDetails/:customer', (req, res) => {
//   const { customer } = req.params;
//   console.log(customer, 'params customer');

//   const customerQuery = 'SELECT * FROM customers WHERE customer = ?';

//   db.query(customerQuery, [customer], (err, customerResult) => {
//     if (err) {
//       console.log(err, 'error');
//       return res.status(500).json({ error: 'Database error' });
//     }

//     if (customerResult.length === 0) {
//       return res.status(404).json({ error: 'Customer not found' });
//     }

//     const groupBilling = customerResult[0]?.billingGroup;
//     const state = customerResult[0]?.state;
//     console.log(customerResult, 'customer result', groupBilling, state);

//     const stationQuery = 'SELECT * FROM stationcreation WHERE state = ? AND gstno IS NOT NULL AND gstno != ""';
//     const billingGroupstationQuery = 'SELECT * FROM stationcreation WHERE state = ? AND gstno IS NOT NULL AND gstno != ""';

//     // First, fetch stations related to the customer's state
//     db.query(stationQuery, [state], (err, stationResult) => {
//       if (err) {
//         console.log(err, 'error');
//         return res.status(500).json({ error: 'Database error' });
//       }

//       // If groupBilling is defined, fetch billing group details and stations
//       if (groupBilling) {
//         const groupBillingQuery = 'SELECT * FROM customers WHERE customer = ?';

//         db.query(groupBillingQuery, [groupBilling], (err, billingResult) => {
//           if (err) {
//             console.log(err, 'error');
//             return res.status(500).json({ error: 'Database error' });
//           }

//           // Fetch stations related to the billing group's state
//           db.query(billingGroupstationQuery, [state], (err, billingGroupStationResult) => {
//             if (err) {
//               console.log(err, 'error');
//               return res.status(500).json({ error: 'Database error' });
//             }

//             // Send all results in the response
//             res.status(200).json({
//               // customerDetails: customerResult,
//               groupBillingDetails: billingResult,
//               // customerStations: stationResult,
//               groupBillingStations: billingGroupStationResult,
//             });
//           });
//         });
//       } else {
//         // If no billing group, send only customer details and station results
//         res.status(200).json({
//           customerDetails: customerResult,
//           customerStations: stationResult,
//           groupBillingDetails: [],
//           groupBillingStations: [],
//         });
//       }
//     });
//   });
// });

router.post('/gettingCustomerList', (req, res) => {
  const { fromDate, toDate } = req.body;

  if (!fromDate || !toDate) {
    return res.status(400).json({ error: 'Missing fromDate or toDate' });
  }

  const sqlQuery = `
  SELECT DISTINCT Organization_name 
  FROM Transfer_list 
  WHERE Billdate BETWEEN ? AND ?`;


  db.query(sqlQuery, [fromDate, toDate], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch data', details: err });
    }
    console.log(result, "orggggggggggg");

    return res.status(200).json(result);
  });
});

// getting multiple customer gst details
router.post('/multipleCustomerGSTDetails', (req, res) => {
  const { customer } = req.body;
  console.log(customer, 'params customer');

  if (!Array.isArray(customer) || customer.length === 0) {
    return res.status(400).json({ error: 'Invalid customer input' });
  }

  const customerQuery = `SELECT * FROM customers WHERE customer IN (?)`;

  db.query(customerQuery, [customer], (err, customerResults) => {
    if (err) {
      console.error(err, 'error');
      return res.status(500).json({ error: 'Database error while fetching customers' });
    }

    if (customerResults.length === 0) {
      return res.status(404).json({ error: 'Customers not found' });
    }

    let stationPromises = [];

    const fetchStations = (state, stationName) => {
      return new Promise((resolve, reject) => {
        const stationQuery = `
          SELECT * FROM stationcreation 
          WHERE state = ? 
          AND Stationname = ? 
          AND gstno IS NOT NULL 
          AND gstno != ""
        `;

        const defaultStationQuery = `
          SELECT * FROM stationcreation 
          WHERE state = "Tamil Nadu" 
          AND Stationname = "Chennai" 
          AND gstno IS NOT NULL 
          AND gstno != ""
        `;

        db.query(stationQuery, [state, stationName], (err, stationResult) => {
          if (err) {
            console.error(err, 'error');
            return reject({ error: 'Database error while fetching stations' });
          }

          const allGstEmpty = stationResult.every(station => !station.gstno || station.gstno.trim() === '');

          if (allGstEmpty) {
            db.query(defaultStationQuery, (err, defaultStations) => {
              if (err) {
                console.error(err, 'error');
                return reject({ error: 'Database error while fetching default stations' });
              }
              resolve(defaultStations);
            });
          } else {
            resolve(stationResult);
          }
        });
      });
    };

    customerResults.forEach(customer => {
      const groupBilling = customer.billingGroup;
      const state = customer.state;
      const stationName = customer.servicestation;
      console.log(groupBilling, "Processing customer:", state, stationName);

      if (!groupBilling) {
        stationPromises.push(
          fetchStations(state, stationName).then(stationResult => ({
            customerDetails: customer,
            customerStations: stationResult,
          }))
        );
      } else {
        const groupBillingQuery = `SELECT * FROM customers WHERE customer = ?`;

        stationPromises.push(
          new Promise((resolve, reject) => {
            db.query(groupBillingQuery, [groupBilling], (err, billingResults) => {
              if (err) {
                console.error(err, 'error');
                return reject({ error: 'Database error while fetching group billing details' });
              }

              if (billingResults.length === 0) {
                return reject({ error: 'Group billing customer not found' });
              }

              // Handle multiple group billing customers
              let groupBillingPromises = billingResults.map(billingCustomer =>
                fetchStations(billingCustomer.state, billingCustomer.servicestation).then(
                  billingGroupStationResult => ({
                    customerDetails: billingCustomer,
                    customerStations: billingGroupStationResult,
                  })
                )
              );

              Promise.all(groupBillingPromises)
                .then(resolve)
                .catch(reject);
            });
          })
        );
      }
    });

    Promise.all(stationPromises)
      .then(results => res.status(200).json(results.flat())) // Flatten the array to avoid nested arrays
      .catch(error => res.status(500).json(error));
  });
});





router.get('/customerDetailsAndGroupBillingDetails/:customer', (req, res) => {
  const { customer } = req.params;
  console.log(customer, 'params customer');

  const customerQuery = 'SELECT * FROM customers WHERE customer = ?';

  db.query(customerQuery, [customer], (err, customerResult) => {
    if (err) {
      console.error(err, 'error');
      return res.status(500).json({ error: 'Database error while fetching customer' });
    }

    if (customerResult.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const groupBilling = customerResult[0]?.billingGroup;
    const state = customerResult[0]?.state;
    const stationName = customerResult[0]?.servicestation;
    console.log(customerResult, 'customer result', groupBilling, state, stationName);

    // Query to fetch stations with state and stationName dependencies
    const stationQuery = `
      SELECT * 
      FROM stationcreation 
      WHERE state = ? 
      AND Stationname = ? 
      AND gstno IS NOT NULL 
      AND gstno != ""
    `;

    // Query to fetch default stations if no GST is found for the specified station
    const defaultStationQuery = `
      SELECT * 
      FROM stationcreation 
      WHERE state = "Tamil Nadu" 
      AND Stationname = "Chennai" 
      AND gstno IS NOT NULL 
      AND gstno != ""
    `;

    const fetchStations = (state, stationName, callback) => {
      db.query(stationQuery, [state, stationName], (err, stationResult) => {
        if (err) {
          console.error(err, 'error');
          return res.status(500).json({ error: 'Database error while fetching stations' });
        }

        const allGstEmpty = stationResult.every(station => !station.gstno || station.gstno.trim() === '');

        if (allGstEmpty) {
          db.query(defaultStationQuery, (err, defaultStations) => {
            if (err) {
              console.error(err, 'error');
              return res.status(500).json({ error: 'Database error while fetching default stations' });
            }
            callback(defaultStations);
          });
        } else {
          callback(stationResult);
        }
      });
    };

    if (groupBilling === null || groupBilling === '') {
      console.log(groupBilling, 'No group billing, fetching stations for customer state');

      fetchStations(state, stationName, stationResult => {
        console.log(stationResult, 'Station results for customer state');
        res.status(200).json({
          customerDetails: customerResult,
          customerStations: stationResult,
        });
      });
    } else {
      const groupBillingQuery = 'SELECT * FROM customers WHERE customer = ?';

      db.query(groupBillingQuery, [groupBilling], (err, billingResult) => {
        if (err) {
          console.error(err, 'error');
          return res.status(500).json({ error: 'Database error while fetching group billing details' });
        }

        console.log(billingResult, 'Group billing result');
        const groupBillingState = billingResult[0]?.state;
        const groupBillingStationName = billingResult[0]?.servicestation;

        console.log('Fetching stations for group billing state and station');
        fetchStations(groupBillingState, groupBillingStationName, billingGroupStationResult => {
          console.log(billingGroupStationResult, 'Station results for group billing state and station');
          res.status(200).json({
            customerDetails: billingResult,
            customerStations: billingGroupStationResult,
          });
        });
      });
    }
  });
});


// router.get('/customerDetailsAndGroupBillingDetails/:customer', (req, res) => {
//   const { customer } = req.params;
//   console.log(customer, 'params customer');

//   const customerQuery = 'SELECT * FROM customers WHERE customer = ?';

//   db.query(customerQuery, [customer], (err, customerResult) => {
//     if (err) {
//       console.error(err, 'error');
//       return res.status(500).json({ error: 'Database error while fetching customer' });
//     }

//     if (customerResult.length === 0) {
//       return res.status(404).json({ error: 'Customer not found' });
//     }

//     const groupBilling = customerResult[0]?.billingGroup;
//     const state = customerResult[0]?.state;
//     const stationName = customerResult[0]?.servicestation
//     console.log(customerResult, 'customer result', groupBilling, state);

//     const stationQuery = 'SELECT * FROM stationcreation WHERE state = ?,Stationname = ? AND gstno IS NOT NULL AND gstno != ""';
//     const defaultStationQuery = 'SELECT * FROM stationcreation WHERE state = "Tamil Nadu",Stationname = "Chennai" AND gstno IS NOT NULL AND gstno != ""';

//     const fetchStations = (state,stationName, callback) => {
//       db.query(stationQuery, [state,stationName], (err, stationResult) => { 
//         if (err) {
//           console.error(err, 'error');
//           return res.status(500).json({ error: 'Database error while fetching stations' });
//         }

//         const allGstEmpty = stationResult.every(station => !station.gstno || station.gstno.trim() === '');

//         if (allGstEmpty) {
//           db.query(defaultStationQuery, (err, defaultStations) => {
//             if (err) {
//               console.error(err, 'error');
//               return res.status(500).json({ error: 'Database error while fetching default stations' });
//             }
//             callback(defaultStations);
//           });
//         } else {
//           callback(stationResult);
//         }
//       });
//     };

//     if (groupBilling === null || groupBilling === '') {
//       console.log(groupBilling, 'yyyyyyyyyyyyyyyyyy');

//       console.log('Fetching stations for customer state');
//       fetchStations(state, stationResult => {
//         console.log(stationResult, 'Station results for customer state');
//         res.status(200).json({
//           customerDetails: customerResult,
//           customerStations: stationResult,

//         });
//       });
//     } else {
//       const groupBillingQuery = 'SELECT * FROM customers WHERE customer = ?';
//       db.query(groupBillingQuery, [groupBilling], (err, billingResult) => {
//         if (err) {
//           console.error(err, 'error');
//           return res.status(500).json({ error: 'Database error while fetching group billing details' });
//         }
//         console.log(billingResult, 'ppppppppppppp');

//         const groupbillingstate = billingResult[0]?.state
//         console.log('Fetching stations for group billing state');
//         fetchStations(groupbillingstate, billingGroupStationResult => {
//           console.log(billingGroupStationResult, 'Station results for group billing state');
//           res.status(200).json({

//             customerDetails: billingResult,
//             customerStations: billingGroupStationResult,
//           });
//         });
//       });
//     }
//   });
// });



router.get('/customerdatgst/:customers', (req, res) => {
  const { customers } = req.params;


  const query = 'SELECT * FROM customers where customer = ?';
  const sql1 = 'SELECT state,gstTax,address1,gstnumber FROM customers where customer = ?';
  // const sql2 = 'SELECT * FROM stationcreation WHERE state = ? AND gstno IS NOT NULL AND gstno != ""';
  const sql2 = 'SELECT * FROM stationcreation WHERE state = ? AND  Stationname = ? AND gstno IS NOT NULL AND gstno != ""';

  // const sql3 = 'SELECT organizationname,addressLine1,contactPhoneNumber,gstnumber from organizationdetails';

  db.query(query, [customers], (err, results) => {
    if (err) {
      console.log(err)
      return res.status(500).send({ error: 'Database query failed' });
    }

    if (results.length > 0) {
      const data = results[0].billingGroup || null;
      if (data === null) {
        const datas = results[0].state || null;
        const datas2 = results[0].servicestation || null;
        db.query(sql2, [datas, datas2], (err, results3) => {
          if (err) {
            console.log(err, "sql1")
            return res.status(500).send({ error: 'Database query failed' });
          }
          if (results3.length > 0) {
            const resultgst = results[0].gstTax || 0
            const resultaddress = results[0].address1 || null
            const resultgstnumber = results[0].gstnumber || null
            const resultstationaddress = results3[0].address || null
            const resultstationgst = results3[0].gstno
            return res.status(200).json({ data: resultgst, data2: resultaddress, data3: resultgstnumber, data5: resultstationaddress, data6: resultstationgst, otherdata: "InStations" });
            // return res.status(200).json({ data: resultgst, data2: resultaddress, data3: resultgstnumber, otherdata: "InStations" });
          }
          else {

            const resultgst1 = results[0].gstTax || 0
            const resultaddress = results[0].address1 || null
            const resultgstnumber = results[0].gstnumber || null
            const resultstationaddress = null
            const resultstationgst = null
            return res.status(200).json({ data: resultgst1, data2: resultaddress, data3: resultgstnumber, data5: resultstationaddress, data6: resultstationgst, otherdata: "OutStations" });
            // return res.status(200).json({ data: resultgst1, data2: resultaddress, data3: resultgstnumber, otherdata: "OutStations" });


          }
        })

      }
      else {
        db.query(sql1, [data], (err, results1) => {
          if (err) {
            console.log(err, "sql1")
            return res.status(500).send({ error: 'Database query failed' });
          }
          const datas = results1[0].state || null;
          const datas2 = results[0].servicestation || null;
          console.log(results1, "lll")
          console.log(datas)
          if (results1.length > 0) {
            db.query(sql2, [datas, datas2], (err, result5) => {
              if (err) {
                console.log(err, "sql1")
                return res.status(500).send({ error: 'Database query failed' });
              }
              if (result5.length > 0) {
                const resultgst = results1[0].gstTax || 0
                const resultaddress = results1[0].address1 || null
                const resultgstnumber = results1[0].gstnumber || null
                const resultstationaddress = result5[0].address || null
                const resultstationgst = result5[0].gstno
                return res.status(200).json({ data: resultgst, data2: resultaddress, data3: resultgstnumber, data5: resultstationaddress, data6: resultstationgst, otherdata: "InStations" });
                // return res.status(200).json({ data: resultgst, data2: resultaddress, data3: resultgstnumber, otherdata: "InStations" });
              }
              else {
                const resultgst1 = results1[0].gstTax || 0
                const resultaddress = results1[0].address1 || null
                const resultgstnumber = results1[0].gstnumber || null
                const resultstationaddress = null
                const resultstationgst = null
                return res.status(200).json({ data: resultgst1, data2: resultaddress, data3: resultgstnumber, data5: resultstationaddress, data6: resultstationgst, otherdata: "OutStations" });
                // return res.status(200).json({ data: resultgst1, data2: resultaddress, data3: resultgstnumber, otherdata: "OutStations" });
              }
            })
          }
          // return  res.status(200).json(datas);
        })
      }
    }
    else {
      return res.status(500).json([]);
    }

    // res.status(200).send(results);
  });
});



router.get('/customerinvoicecreate/:customers', (req, res) => {
  const { customers } = req.params;


  const query = 'SELECT * FROM customers where customer = ?';
  const sql1 = 'SELECT state FROM customers where customer = ?';
  // const sql2='SELECT * FROM stationcreation where state = ? and  gstno is not null'
  const sql2 = 'SELECT * FROM stationcreation WHERE state = ? AND gstno IS NOT NULL AND gstno != ""';

  // const sql3 = 'SELECT organizationname,addressLine1,contactPhoneNumber,gstnumber from organizationdetails';

  db.query(query, [customers], (err, results) => {
    if (err) {
      console.log(err)
      return res.status(500).send({ error: 'Database query failed' });
    }

    if (results.length > 0) {
      const data = results[0].billingGroup || null;
      if (data === null) {
        const datas = results[0].state || null;
        db.query(sql2, [datas], (err, results3) => {
          if (err) {
            console.log(err, "sql1")
            return res.status(500).send({ error: 'Database query failed' });
          }
          if (results3.length > 0) {
            const resultstate = results[0]?.state

            return res.status(200).json(resultstate);
            // return res.status(200).json({ data: resultgst, data2: resultaddress, data3: resultgstnumber, otherdata: "InStations" });
          }
          else {
            const resultstate = "Tamil Nadu"
            return res.status(200).json(resultstate);
            // return res.status(200).json({ data: resultgst1, data2: resultaddress, data3: resultgstnumber, otherdata: "OutStations" });


          }
        })

      }
      else {
        db.query(sql1, [data], (err, results1) => {
          if (err) {
            console.log(err, "sql1")
            return res.status(500).send({ error: 'Database query failed' });
          }
          const datas = results1[0].state || null;
          console.log(results1, "lll")
          console.log(datas)
          if (results1.length > 0) {
            db.query(sql2, [datas], (err, result5) => {
              if (err) {
                console.log(err, "sql1")
                return res.status(500).send({ error: 'Database query failed' });
              }
              if (result5.length > 0) {
                const resultgst = results1[0].state

                return res.status(200).json(resultgst);
                // return res.status(200).json({ data: resultgst, data2: resultaddress, data3: resultgstnumber, otherdata: "InStations" });
              }
              else {
                const resultstate = "Tamil Nadu"
                return res.status(200).json(resultstate);
                // return res.status(200).json({ data: resultgst1, data2: resultaddress, data3: resultgstnumber, otherdata: "OutStations" });
              }
            })
          }
          // return  res.status(200).json(datas);
        })
      }
    }
    else {
      return res.status(500).json([]);
    }

    // res.status(200).send(results);
  });
});



module.exports = router;
