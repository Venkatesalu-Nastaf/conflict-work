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

router.get('/tripsheetcustomertripid/:customer/:tripid', async (req, res) => {
  const customer = req.params.customer;
  const tripid = req.params.tripid.split(',');

  const decodedCustomer = decodeURIComponent(customer);
  db.query('SELECT * FROM tripsheet WHERE customer = ? AND tripid IN (?)', [decodedCustomer, tripid], (err, result) => {
    if (err) {

      return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Tripsheet not found' });
    }

    let vehtypes = result.map(obj => obj.vehType);
    db.query('select vehiclename, fueltype ,segement ,Groups from vehicleinfo where vehiclename IN (?)', [vehtypes], (err, result1) => {
      if (err) {

        return res.status(500).json({ error: 'Failed to retrieve tripsheet details from MySQL' });
      }
      if (result1.length === 0) {
        return res.status(404).json({ error: 'Tripsheet not found' });
      }
      const vehicleDataMap = {};
      result1.forEach(row => {
        vehicleDataMap[row.vehiclename] = { fueltype: row.fueltype, segement: row.segement, Groups: row.Groups };

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
          vehicleDataMap[row.customer] = { gsttax: row.gstTax,Customeraddress1:row.address1 };

        })

        // })

        // Add fueltype to each object in the result array
        result.forEach(obj => {
          const vehicleData = vehicleDataMap[obj.vehType];
          const customerdetails = vehicleDataMap[obj.customer];
          obj.fueltype = vehicleData ? vehicleData.fueltype : 'Unknown'; // Set default value if fueltype not found
          obj.segement = vehicleData ? vehicleData.segement : 'Unknown';
          obj.Groups = vehicleData ? vehicleData.Groups : 'unknown';
          obj.gstTax = customerdetails ? customerdetails.gsttax : 'unknown'
          obj.CustomerAddress1 = customerdetails ? customerdetails.Customeraddress1 : 'unknown'
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
// router.get('/tripsheetiddata/:id',(req,res)=>{
//   const{id}=req.params; 
//   const transferId = id.split(',')
//   console.log(id,"iii")
//   db.query(`select * from tripsheet where tripid =?`,[...transferId],(err,result)=>{
//     if(err){
//       return res.status(500).json(err)
//     }
//     console.log(result.length,"result.......")
//     return res.status(200).json(result)
//   })
// })

router.get('/tripsheetiddata/:id', (req, res) => {
  const { id } = req.params;
  const tripIds = id?.split(','); // Parse the JSON string to an array


  // Prepare the query with placeholders
  const query = 'SELECT * FROM tripsheet WHERE status = "Transfer_Closed" AND  tripid IN (?)';

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
router.post('/transferlistdatatrip', (req, res) => {
  const { Status, Billdate, Organization_name, FromDate, EndDate, Trips, Amount, Trip_id } = req.body;
  const sqlquery = 'insert into Transfer_list(Status,Billdate,Organization_name,Trip_id,FromDate,EndDate,Trips,Amount) values(?,?,?,?,?,?,?,?)'

  if (!Array.isArray(Trip_id)) {
    return res.status(400).json({ error: 'id should be an array' });
  }
  const idString = Trip_id.join(',');
  db.query(sqlquery, [Status, Billdate, Organization_name, idString, FromDate, EndDate, Trips, Amount], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve  from MySQL' });
    }
    return res.status(200).json({ message: 'inserted successfully' });
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
router.put('/updateList', async (req, res) => {
  try {
    const { Trip_id, Trips, Amount } = req.body;
    console.log(typeof(Trip_id), Trip_id, Trips, Amount, 'response');

    const sqlUpdateTransferList = "UPDATE Transfer_list SET Trips = ?, Amount = ?, Trip_id = TRIM(BOTH ',' FROM REPLACE(REPLACE(CONCAT(',', Trip_id, ','), CONCAT(',', ?, ','), ','), ',,', ',')) WHERE FIND_IN_SET(?, Trip_id) > 0";
    
    const updatePromises = Trip_id.map(tripId => {
      return new Promise((resolve, reject) => {
        db.query(sqlUpdateTransferList, [Trips, Amount, tripId, tripId], (err, updateGroupBillingResult) => {
          if (err) {
            console.log(err, 'error');
            reject(err);
          } else {
            console.log(updateGroupBillingResult, 'result');
            if (updateGroupBillingResult.affectedRows > 0) {
              resolve(updateGroupBillingResult);
            } else {
              reject(new Error("No rows affected"));
            }
          }
        });
      });
    });

    // Wait for all update queries to finish
    const updateResults = await Promise.all(updatePromises);
    res.status(200).json(updateResults);
  } catch (err) {
    console.log(err, 'error');
    res.status(500).json({ error: "An error occurred. Please try again later." });
  }
});


router.post('/tripsheetUpdate', (req, res) => {
  const { tripids, status } = req.body;
  console.log(tripids, status,'rrrrrrrrrr');
  const query = 'UPDATE tripsheet SET status = ? WHERE tripid IN (?)';
  db.query(query, [status, tripids], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.status(200).json({ message: 'Status updated successfully' });
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
  const groupId= req.params.groupId;
  console.log(groupId,'gid');
  const sqlquery = "SELECT * FROM Transfer_list where Grouptrip_id = ?";
  
  db.query(sqlquery,[groupId], (err, result) => {
    if (err) {
      console.log(err, 'error');
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    console.log(result,'getlist');
    return res.status(200).json(result);
  });
});

router.delete('/deleteTransfer/:groupid', (req, res) => {
  const groupid = req.params.groupid;
  console.log(groupid,'idddd');
  const sql = "DELETE FROM Transfer_list WHERE Grouptrip_id = ?";
  
  db.query(sql, [groupid], (err, result) => {
    if (err) {
      console.log(err, 'error');
      return res.status(500).json({ error: "Failed to delete data from MySQL" });
    }
    return res.status(200).json({ message: "Data deleted successfully" });
  });
});





router.put('/statusChangeTransfer/:invoiceno',(req,res)=>{
  const {invoiceno} = req.params;
  const sqlquery = 'update Transfer_list set Status="Billed" where Invoice_no = ? ';
  db.query(sqlquery,[invoiceno],(err,result)=>{
    if(err){
      console.log(err,'error');
    }
    return res.status(200).json({ message: "Data updated successfully" });

  })
})

router.put('/statusChangeTripsheet/:tripid', (req, res) => {
  const { tripid } = req.params;

  // Check if tripid is defined
  if (!tripid) {
    return res.status(400).json({ error: "Trip ID is required" });
  }

  const tripIds = tripid.split(',');

  const sqlquery = 'UPDATE tripsheet SET status="Transfer_Billed" AND apps="Closed" WHERE tripid IN (?)';

  db.query(sqlquery, [tripIds], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.status(200).json({ message: "Data updated successfully" });
  });
});




router.get('/gettransfer_listdatas', (req, res) => {
  const { Status, Organization_name, FromDate, EndDate } = req.query;
  // const { Status  } = req.query;
  if (Status === "all") {
    db.query('SELECT * FROM Transfer_list where  Organization_name=?  AND FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 1 DAY)', [Organization_name, FromDate, EndDate], (err, result) => {
      // db.query('SELECT * FROM Transfer_list where Status=? ',[Status],(err, result) => {
      // 
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
      }
      return res.status(200).json(result);

    });
  }

  else {
    db.query('SELECT * FROM Transfer_list where Status=? AND Organization_name=?  AND FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 1 DAY)', [Status, Organization_name, FromDate, EndDate], (err, result) => {
      // db.query('SELECT * FROM Transfer_list where Status=? ',[Status],(err, result) => {
      // 
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
      }
      return res.status(200).json(result);

    });
  }

})


 

router.get('/pdfdatatransferreporttripid2/:customer/:tripid', async (req, res) => {
  const customer = req.params.customer;
  const tripids = req.params.tripid.split(',');
  // console.log(customer, tripid)

  const decodedCustomer = decodeURIComponent(customer);

  const promises = tripids.map(tripid => {
    return new Promise((resolve, reject) => {
      db.query(
        `
        SELECT 
        ts.*, 
        vi.fueltype AS fueltype, 
        vi.segement AS segment, 
        vi.Groups AS Groups, 
        c.gstTax AS gstTax,
        c.address1 AS Customeraddress1,
        JSON_ARRAYAGG(JSON_OBJECT('imagees',tri.FileName)) AS bookattachedimage,
        JSON_ARRAYAGG(JSON_OBJECT('attachedimageurl', us.path)) AS Attachedimage,
        JSON_ARRAYAGG(JSON_OBJECT('trip_type', gd.trip_type, 'place_name', gd.place_name)) AS gmapdata,
        JSON_OBJECT('signature_path', s.signature_path) AS signature_data,
        JSON_OBJECT('map_path', mi.path) AS map_data
    FROM 
        tripsheet AS ts
    LEFT JOIN 
        vehicleinfo AS vi ON ts.vehType = vi.vehiclename
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
        booking_doc AS tri ON ts.tripid = tri.bookingno
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



 
module.exports = router;
