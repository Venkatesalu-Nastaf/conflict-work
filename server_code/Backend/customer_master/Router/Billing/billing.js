const express = require('express');
const router = express.Router();
const db = require('../../../db');


// Add Billing database
router.post('/billing', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO billing SET ?', bookData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});

// Update GroupBilling
// router.post('/updateGroupBilling', (req, res) => {
//   const { status, InvoiceDate, Customer, FromDate, ToDate, Trips, Amount, Trip_id, station, ReferenceNo } = req.body;

//   // Ensure that a ReferenceNo is provided to identify the row to update
//   if (!ReferenceNo) {
//     return res.status(400).json({ error: 'ReferenceNo is required to update the record' });
//   }

//   const updateQuery = `
//       UPDATE Group_billing 
//       SET status = ?, InvoiceDate = ?, Customer = ?, FromDate = ?, ToDate = ?, 
//           Trips = ?, Amount = ?, Trip_id = ?, station = ?
//       WHERE ReferenceNo = ?`;

//   db.query(updateQuery, [status, InvoiceDate, Customer, FromDate, ToDate, Trips, Amount, Trip_id.join(','), station, ReferenceNo], (err, result) => {
//     if (err) {
//       console.log(err, 'error');
//       return res.status(500).json({ error: 'Failed to update the record in MySQL' });
//     }

//     console.log(result, 'result');
//     const updateQuery = "UPDATE tripsheet SET  status='Billed',Billed_Status = 'Transfer_Closed' WHERE tripid IN (?)";

//     if (result.affectedRows > 0) {
//       return res.status(200).json({ message: 'Record updated successfully' });
//     } else {
//       return res.status(404).json({ error: 'No record found with the given ReferenceNo' });
//     }
//   });
// });
// router.post('/updateGroupBilling', (req, res) => {
//   const { status, InvoiceDate, Customer, FromDate, ToDate, Trips, Amount, Trip_id, station, ReferenceNo } = req.body;

//   // Ensure that a ReferenceNo is provided to identify the row to update
//   if (!ReferenceNo) {
//     return res.status(400).json({ error: 'ReferenceNo is required to update the record' });
//   }

//   const updateGroupBillingQuery = `
//       UPDATE Group_billing 
//       SET status = ?, InvoiceDate = ?, Customer = ?, FromDate = ?, ToDate = ?, 
//           Trips = ?, Amount = ?, Trip_id = ?, station = ?
//       WHERE ReferenceNo = ?`;

//   const selectGroupTripIdQuery = `
//       SELECT ReferenceNo AS Grouptrip_id FROM Group_billing WHERE Trip_id IN (?)`;
//   const updateGroupTripIdInTripsheetQuery = `
//     UPDATE tripsheet SET GroupTripId = ? WHERE tripid IN (?)`;
//   db.query(updateGroupBillingQuery, [status, InvoiceDate, Customer, FromDate, ToDate, Trips, Amount, Trip_id.join(','), station, ReferenceNo], (err, result) => {
//     if (err) {
//       console.log(err, 'error');
//       return res.status(500).json({ error: 'Failed to update the record in MySQL' });
//     }

//     if (result.affectedRows > 0) {
//       // Proceed to the second query to update `tripsheet`
//       const updateTripsheetQuery = "UPDATE tripsheet SET status='Billed', Billed_Status = 'Covering_Billed' WHERE tripid IN (?)";

//       db.query(updateTripsheetQuery, [Trip_id], (err, result) => {
//         if (err) {
//           console.log(err, 'error');
//           return res.status(500).json({ error: 'Failed to update the tripsheet records in MySQL' });
//         }

//         return res.status(200).json({ message: 'Record updated successfully in both Group_billing and tripsheet tables' });
//       });
//     } else {
//       return res.status(404).json({ error: 'No record found with the given ReferenceNo' });
//     }
//   });
// });

router.post('/updateGroupBilling', (req, res) => {
  const { status, InvoiceDate, Customer, FromDate, ToDate,Amount, Trip_id, State, ReferenceNo } = req.body;
  // console.log(status, InvoiceDate, Customer, FromDate, ToDate, Amount, Trip_id, State, ReferenceNo, 'updateGroup');

  // Ensure that a ReferenceNo is provided to identify the row to update
  if (!ReferenceNo) {
    return res.status(400).json({ error: 'ReferenceNo is required to update the record' });
  }

  // const updateGroupBillingQuery = `
  //     UPDATE Group_billing 
  //     SET status = ?, InvoiceDate = ?, Customer = ?, FromDate = ?, ToDate = ?, 
  //         Trips = ?, Amount = ?, Trip_id = ?, station = ?
  //     WHERE ReferenceNo = ?`;
  // const updateGroupBillingQuery = `
  // UPDATE Group_billing 
  // SET status = ?, InvoiceDate = ?, Customer = ?, FromDate = ?, ToDate = ?, 
  //     Trips = ?, Amount = ?, Trip_id = ?, State = ?
  // WHERE ReferenceNo = ?`;
    const updateGroupBillingQuery = `
  UPDATE Group_billing 
  SET status = ?, InvoiceDate = ?, Customer = ?, FromDate = ?, ToDate = ?, 
       Amount = ?, Trip_id = ?, State = ?
  WHERE ReferenceNo = ?`;

  const selectGroupTripIdQuery = `
      SELECT ReferenceNo AS Grouptrip_id FROM Group_billing WHERE Trip_id IN (?)`;

  const updateTripsheetStatusQuery = `
      UPDATE tripsheet SET status = 'Billed', Billed_Status = 'Covering_Billed' WHERE tripid IN (?)`;

  const updateGroupTripIdInTripsheetQuery = `
      UPDATE tripsheet SET GroupTripId = ? WHERE tripid IN (?)`;

  // Step 1: Update Group_billing
  db.query(updateGroupBillingQuery, [status, InvoiceDate, Customer, FromDate, ToDate,Amount, Trip_id.join(','), State, ReferenceNo], (err, result) => {
    if (err) {
      // console.log(err, 'error');
      return res.status(500).json({ error: 'Failed to update the record in MySQL' });
    }
    // console.log(result, 'result');

    if (result.affectedRows > 0) {
      // console.log('1111111111', Trip_id);

      // Step 2: Fetch Grouptrip_id after updating Group_billing
      db.query(selectGroupTripIdQuery, [Trip_id.join(',')], (error, groupResult) => {
        if (error) {
          // console.log(error, 'error');
          return res.status(500).json({ error: 'Failed to fetch Grouptrip_id from MySQL' });
        }
        // console.log(groupResult, 'groupResultt');

        if (groupResult.length > 0) {
          const groupTripId = groupResult[0].Grouptrip_id;

          // Step 3: Update tripsheet status
          db.query(updateTripsheetStatusQuery, [Trip_id], (err, result1) => {
            if (err) {
              // console.log(err, 'error');
              return res.status(500).json({ error: 'Failed to update tripsheet status in MySQL' });
            }
            // console.log(result1, 'resultupdate');

            // Step 4: Update GroupTripId in tripsheet with fetched Grouptrip_id
            db.query(updateGroupTripIdInTripsheetQuery, [groupTripId, Trip_id], (updateError, finalResult) => {
              if (updateError) {
                // console.log(updateError, 'error');
                return res.status(500).json({ error: 'Failed to update GroupTripId in tripsheet' });
              }
              console.log(finalResult, 'finalResult');


              // All operations succeeded
              return res.status(200).json({ message: 'Record updated successfully in both Group_billing and tripsheet tables', groupTripId });
            });
          });
        } else {
          return res.status(404).json({ error: 'No Grouptrip_id found' });
        }
      });
    } else {
      return res.status(404).json({ error: 'No record found with the given ReferenceNo' });
    }
  });
});


router.post('/GroupBillingList', (req, res) => {
  const { status, InvoiceDate, Customer, FromDate, ToDate,Amount,Trip_id, State } = req.body;
  // console.log(status, InvoiceDate, Customer, FromDate, ToDate,Amount,Trip_id, 'groupbill');

  const insertBillingQuery = `
    INSERT INTO Group_billing(Status, InvoiceDate, Customer, FromDate, ToDate,Amount, Trip_id,State)
    VALUES (?,?,?,?,?,?,?,?)`;

  const selectGroupTripIdQuery = `
    SELECT ReferenceNo AS Grouptrip_id FROM Group_billing WHERE Trip_id IN (?)`;

  const updateTripsheetStatusQuery = `
    UPDATE tripsheet SET status = 'Billed', Billed_Status = 'Covering_Billed' WHERE tripid IN (?)`;

  const updateGroupTripIdInTripsheetQuery = `
    UPDATE tripsheet SET GroupTripId = ? WHERE tripid IN (?)`;


  // Step 1: Insert into Group_billing
  db.query(insertBillingQuery, [status, InvoiceDate, Customer, FromDate, ToDate,Amount, Trip_id.join(','), State], (err, result) => {
    if (err) {
      // console.log(err)
      return res.status(500).json({ error: 'Failed to insert into MySQL' });
    }

    if (result.affectedRows >= 1) {
      // Step 2: Fetch the Grouptrip_id after successful insert
      db.query(selectGroupTripIdQuery, [Trip_id], (error, groupResult) => {
        if (error) {
          return res.status(500).json({ error: 'Failed to fetch Grouptrip_id from MySQL' });
        }

        if (groupResult.length > 0) {
          const groupTripId = groupResult[0].Grouptrip_id;

          // Step 3: Update tripsheet status
          db.query(updateTripsheetStatusQuery, [Trip_id], (err, result1) => {
            if (err) {
              return res.status(500).json({ error: 'Failed to update tripsheet status in MySQL' });
            }

            // Step 4: Update GroupTripId in tripsheet with fetched Grouptrip_id
            db.query(updateGroupTripIdInTripsheetQuery, [groupTripId, Trip_id], (updateError, finalResult) => {
              if (updateError) {
                return res.status(500).json({ error: 'Failed to update GroupTripId in tripsheet' });
              }
              // console.log(finalResult, 'finalResult', Trip_id, "kk");



              return res.status(200).json({ message: 'Inserted and updated successfully', groupTripId });
            });
          });
        } else {
          return res.status(404).json({ error: 'No Grouptrip_id found' });
        }
      });
    }
  });
});


// router.get('/max-invoiceno/:datas', (req, res) => {
//   const state = req.params.datas;  // Get the 'state' parameter from the request query

//   const query = `
//     SELECT GREATEST(
//         COALESCE((SELECT MAX(CAST(SUBSTRING(Invoice_no, 3) AS UNSIGNED)) FROM Transfer_list WHERE State = ?), 0),
//         COALESCE((SELECT MAX(CAST(SUBSTRING(Invoice_No, 3) AS UNSIGNED)) FROM Individual_Billing WHERE State = ?), 0),
//         COALESCE((SELECT MAX(CAST(SUBSTRING(Invoice_No, 3) AS UNSIGNED)) FROM GroupBillinginvoice_no WHERE State = ?), 0)
//     ) + 1 AS max_invoiceno;
//   `;

//   // Pass the state value three times as parameters for each subquery
//   db.query(query, [state, state, state], (err, result) => {
//     if (err) {
//       return res.status(500).json({
//         error: 'Failed to retrieve the maximum invoice number',
//         details: err,
//       });
//     }

//     if (result.length > 0) {
//       return res.status(200).json({
//         message: 'Maximum InvoiceNo retrieved successfully',
//         maxInvoiceno: result[0].max_invoiceno,
//       });
//     } else {
//       return res.status(404).json({
//         message: 'No invoice numbers found for the specified state',
//       });
//     }
//   });
// });


const getNextInvoiceNo1 = (state) => {
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
        const nextInvoiceNo = result[0].max_invoiceno
        resolve(nextInvoiceNo); // Resolve with the next invoice number
      } else {
        resolve(null); // Handle case where no result is found
      }
    });
  });
};

// router.post('/dummyinvoice', async (req, res) => {

//   const {Trip_id,State} = req.body;
//   console.log(Trip_id,State, 'groupbill');
//   Trip_id.map(async (tripId, index) => {
//     // const nextInvoiceNo = await getNextInvoiceNo1(State);

 

//       const nextInvoiceNo = await getNextInvoiceNo1(State);
//       console.log((parseInt(1, 10) + index).toString().padStart(3, '0'),"index")
//       const newInvoiceNo = (parseInt(nextInvoiceNo, 10) + index).toString().padStart(3, '0');
//       console.log(  newInvoiceNo,"pp",typeof(index),index,typeof(newInvoiceNo),nextInvoiceNo,nextInvoiceNo + index)
      
    
//     });
  
// })


router.post('/billgeneratecoveringbill', async (req, res) => {
  const { InvoiceDate, Trip_id, ReferenceNo, State, Invoiceno } = req.body;
  // console.log(InvoiceDate, Trip_id, ReferenceNo, State, Invoiceno, 'groupbill');


  const insertBillingQuery = `
  INSERT INTO GroupBillinginvoice_no(Referenceno,Invoice_No,Tripid,State)
  VALUES (?, ?, ?,?)`;

  const updateGroupTripIdInTripsheetQuery = `
  UPDATE  Group_billing SET InvoiceDate = ?,InvoiceNo = ? WHERE ReferenceNo= ?`;

  const invoiceQueries = Trip_id.map(async (tripId, index) => {
    // const nextInvoiceNo = await getNextInvoiceNo1(State);

    return new Promise(async (resolve, reject) => {

      const nextInvoiceNo = await getNextInvoiceNo1(State);
      // console.log(`IV${nextInvoiceNo + index}`, "pp")
      const newInvoiceNo = (parseInt(nextInvoiceNo, 10) + index).toString().padStart(3, '0');
      // console.log(`IV${nextInvoiceNo + index}`, "pp",typeof(index),index,typeof(nextInvoiceNo),nextInvoiceNo,newInvoiceNo)

      db.query(insertBillingQuery, [ReferenceNo, newInvoiceNo, tripId, State], (invoiceErr, invoiceResult) => {
        if (invoiceErr) {
          reject(invoiceErr);
        } else {
          resolve(invoiceResult);
        }
      });
    });
  });

  Promise.all(invoiceQueries)
    .then(() => {
      db.query(updateGroupTripIdInTripsheetQuery, [InvoiceDate, Invoiceno, ReferenceNo], (updateErr, updateResult) => {
        if (updateErr) {
          return res.status(500).json({ error: 'Failed to update Group_billing', details: updateErr });
        }
        return res.status(200).json({ message: 'Inserted and updated successfully' });
      });
    })
    .catch((invoiceErr) => {
      return res.status(500).json({ error: 'Failed to insert into GroupBillinginvoice_no', details: invoiceErr });
    });

})



// router.post('/GroupBillingList', (req, res) => {
//   const { status, InvoiceDate, Customer, FromDate, ToDate, Trips, Amount, Trip_id, station } = req.body;


//   const sqlquery = "INSERT INTO Group_billing(Status, InvoiceDate, Customer, FromDate, ToDate, Trips, Amount, Trip_id,station) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)";
//   const sqlquery1 = "UPDATE tripsheet SET status = 'Billed',Billed_Status='Covering_Billed' WHERE tripid IN (?)";
//   const groupidquery = `SELECT ReferenceNo FROM Group_billing WHERE Trip_id IN (?)`;
//   const tripsheetUpdateQuery = `UPDATE tripsheet SET GroupTripId = ? WHERE tripid IN (?)`;

//   db.query(sqlquery, [status, InvoiceDate, Customer, FromDate, ToDate, Trips, Amount, Trip_id.join(','), station], (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: 'Failed to insert into MySQL' });
//     }


//     if (result.affectedRows >= 1) {

//       db.query(sqlquery1, [Trip_id], (err, result1) => {
//         if (err) {
//           return res.status(500).json({ error: 'Failed to update tripsheet status in MySQL' });
//         }


//         return res.status(200).json({ message: 'Inserted and updated successfully' });
//       });
//     }
//   });
// });

router.get('/ListDetailsWithStation', (req, res) => {
  const { Customer, FromDate, ToDate, station } = req.query;

  const sqlquery = "SELECT * FROM Group_billing WHERE Customer=? AND State=? AND FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 0 DAY)";

  db.query(sqlquery, [Customer, station, FromDate, ToDate], (err, result) => {
    if (err) {
      // console.log(err, 'error');
      return res.status(500).json({ error: 'Database query error' });
    }
    return res.status(200).json(result);
  });
});


router.get('/ListDetails', (req, res) => {
  const { Customer, FromDate, ToDate } = req.query;
  const sqlquery = "SELECT * FROM Group_billing WHERE Customer=? AND FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND  FromDate <= DATE_ADD(?, INTERVAL 0 DAY)"
  db.query(sqlquery, [Customer, FromDate, ToDate], (err, result) => {
    if (err) {
      console.log(err, 'error');
    }
    return res.status(200).json(result)

  })

})


router.get('/ReferenceNo', (req, res) => {
  const sqlquery = "select ReferenceNo from Group_billing";
  db.query(sqlquery, (err, result) => {
    if (err) {
      console.log(err, 'error');
    }
    return res.status(200).json(result)
  })
})

router.get('/GroupReference/:ReferenceNo', (req, res) => {
  const ReferenceNo = req.params.ReferenceNo;
  const sqlquery = "select * from Group_billing where ReferenceNo = ?";
  db.query(sqlquery, [ReferenceNo], (err, result) => {
    if (err) {
      console.log(err, 'error');
    }
    return res.status(200).json(result)
  })
})

router.get('/GroupReferenceforinvoiceno/:ReferenceNo', (req, res) => {
  const ReferenceNo = req.params.ReferenceNo;
  const sqlquery = "select * from GroupBillinginvoice_no where ReferenceNo = ?";
  db.query(sqlquery, [ReferenceNo], (err, result) => {
    if (err) {
      console.log(err, 'error');
    }
    return res.status(200).json(result)
  })
})


// delete Billing data
router.delete('/billing/:tripid', (req, res) => {
  const tripid = req.params.tripid;
  db.query('DELETE FROM billing WHERE tripid = ?', tripid, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete data from MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    return res.status(200).json({ message: "Data deleted successfully" });
  });
});

// update Billing details
router.put('/billing/:tripid', (req, res) => {
  const tripid = req.params.tripid;
  const updatedCustomerData = req.body;

  db.query('UPDATE billing SET ? WHERE tripid = ?', [updatedCustomerData, tripid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update data in MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    return res.status(200).json({ message: "Data updated successfully" });
  });
});

router.put('/statusupdate', (req, res) => {
  const { Trips, Amount, Trip_id } = req.body;

  // Check if Trip_id is an array
  if (!Array.isArray(Trip_id)) {
    return res.status(400).json({ error: "Trip_id must be an array" });
  }
  const sqlUpdateGroupBilling = "UPDATE Group_billing SET  Amount = ?, Trip_id = TRIM(BOTH ',' FROM REPLACE(REPLACE(CONCAT(',', Trip_id, ','), CONCAT(',', ?, ','), ','), ',,', ',')) WHERE FIND_IN_SET(?, Trip_id) > 0";

  // Iterate over the Trip_id array
  Trip_id.forEach(tripId => {
    db.query(sqlUpdateGroupBilling, [Amount, tripId, tripId], (err, updateGroupBillingResult) => {
      if (err) {
        console.log(err, 'error');
        return res.status(500).json({ error: "Failed to update data in MySQL" });
      }
    });
  });

  return res.status(200).json({ message: "Data updated successfully" });
});

router.post('/tripsheetstatusupdate', (req, res) => {
  const { tripids, status } = req.body;
  const query = 'UPDATE tripsheet SET status = ?,Billed_Status=NULL,GroupTripId=NULL WHERE tripid IN (?)';
  db.query(query, [status, tripids], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.status(200).json({ message: 'Status updated successfully' });
  });
});



router.get('/billing', (req, res) => {
  db.query('SELECT * FROM billing', (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});

// collect data from billing database
router.get('/billing/:billingno', (req, res) => {
  const billingno = req.params.billingno;
  db.query('SELECT * FROM billing WHERE billingno = ?', billingno, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    const billingDetails = result[0];
    return res.status(200).json(billingDetails);
  });
});

router.get('/billingdata/:invoiceno', (req, res) => {
  const invoiceno = req.params.invoiceno;

  db.query('SELECT * FROM billing WHERE invoiceno = ?', invoiceno, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve billing details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Billing not found' });
    }
    const billingDetails = result[0];
    return res.status(200).json(billingDetails);
  });
});

router.get('/customers/:customer', (req, res) => {
  const customer = req.params.customer;
  db.query('SELECT * FROM customers WHERE customer = ?', customer, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    const bookingDetails = result[0];
    return res.status(200).json(bookingDetails);
  });
});

router.get('/routedata/:tripid', (req, res) => {
  const tripid = req.params.tripid;
  // const tripType = ["start", "waypoint", "end"];
const sqlQuery = `SELECT * FROM gmapdata WHERE tripid = ? AND trip_type IN ("start", "waypoint", "end")`;
db.query(sqlQuery,[tripid],(err,result)=>{
  if (err) {
            return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
          }
    // console.log(result.length,"rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    
          if (result.length === 0) {
            return res.status(404).json({ error: 'Route data not found' });
          }
    
          return res.status(200).json(result);
        
})
})


router.get('/ParticularLists/:tripno', (req, res) => {
  const tripno = req.params.tripno;

  const tripIds = tripno.split(',');
  const query = `SELECT * FROM tripsheet WHERE Billed_Status="Covering_Billed" AND tripid IN (?)`;
  db.query(query, [tripIds], (err, result) => {
    if (err) {
      // console.error(err);
      return res.status(500).json(err);
    }
    return res.status(200).json(result);
  });

})


router.get('/getGroupList/:groupid', (req, res) => {
  const groupid = req.params.groupid;
  const sqlquery = "SELECT * FROM Group_billing where ReferenceNo = ?";

  db.query(sqlquery, [groupid], (err, result) => {
    if (err) {
      // console.log(err, 'error');
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(result);
  });
});

router.delete('/deleteGroup/:groupid', (req, res) => {
  const groupid = req.params.groupid;
  const sql = "DELETE FROM Group_billing WHERE id = ?";

  db.query(sql, [groupid], (err, result) => {
    if (err) {
      // console.log(err, 'error');
      return res.status(500).json({ error: "Failed to delete data from MySQL" });
    }
    return res.status(200).json({ message: "Data deleted successfully" });
  });
});

// get particularTripsheetDatas
router.get('/getParticularTripsheet', (req, res) => {
  const { tripID } = req.query;

  if (!tripID) {
    return res.status(400).json({ error: 'TripID is required' });
  }

  const tripIDs = Array.isArray(tripID)
    ? tripID
    : tripID.includes(',')
      ? tripID.split(',')
      : [tripID];



  const query = `SELECT * FROM tripsheet WHERE tripid IN (?)`;
  db.query(query, [tripIDs], (error, result) => {
    if (error) {
      // console.error('Failed to retrieve tripsheet data:', error);
      return res.status(500).json({ error: 'Failed to retrieve tripsheet data' });
    }

    return res.status(200).json(result);
  });
});

router.get('/getParticularInvoiceDetails', (req, res) => {
  const { InvoiceNo,State} = req.query;
  const query = `SELECT * FROM Transfer_list WHERE Invoice_no = ? and State = ?`;

  db.query(query, [InvoiceNo,State], (err, result) => {
    if (err) {
      // console.error('Failed to retrieve booking details from MySQL:', err);
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }

    return res.status(200).json(result);
  });
});

router.get('/getParticularInvoiceDetailsbyGroupTripId', (req, res) => {
  const { GroupTripId } = req.query;
  const query = `SELECT * FROM Transfer_list WHERE Grouptrip_id = ? `;

  db.query(query, [GroupTripId], (err, result) => {
    if (err) {
      // console.error('Failed to retrieve booking details from MySQL:', err);
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }

    return res.status(200).json(result);
  });
});

// router.get('/getParticularInvoiceDetails', (req, res) => {
//   const { InvoiceNo } = req.query;
//   const query = `SELECT * FROM Transfer_list WHERE Invoice_no = ? AND Status = "Billed" `;

//   db.query(query, [InvoiceNo], (err, result) => {
//     if (err) {
//       console.error('Failed to retrieve booking details from MySQL:', err);
//       return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
//     }
//     console.log(result, 'Billed Result'); 

//     return res.status(200).json(result);
//   });
// });



router.get('/All-Transfer-Billing', (req, res) => {
  const { customer, fromDate, toDate } = req.query;

  // Decode the URL-encoded query parameters
  const decodedCustomer = decodeURIComponent(customer);


  // Validate required parameters
  if (!decodedCustomer || !fromDate || !toDate) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  // SQL query
  const query = `
    SELECT * 
    FROM tripsheet 
    WHERE apps = "Closed" 
      AND status = "Closed" 
      AND customer = ? 
      AND tripsheetdate >= ? 
      AND (Billed_Status IS NULL OR Billed_Status NOT IN ("Covering_Closed", "Covering_Billed", "Transfer_Closed", "Transfer_Billed","Individual_Billed"))
      AND tripsheetdate <= DATE_ADD(?, INTERVAL 1 DAY)
  `;

  // Execute query with parameterized values
  db.query(query, [decodedCustomer, fromDate, toDate], (err, result) => {
    if (err) {
      // console.log('Failed to retrieve booking details from MySQL:', err);
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }
    return res.status(200).json(result);
  });
});


//cover billing
router.get('/Transfer-Billing', (req, res) => {
  // const { customer, fromDate, toDate, servicestation } = req.query;
  const { customer, fromDate, toDate } = req.query;

  // Decode the URL-encoded query parameters
  const decodedCustomer = decodeURIComponent(customer);
  // const decodedServiceStation = decodeURIComponent(servicestation);

  // Validate required parameters
  // if (!decodedCustomer || !fromDate || !toDate || !decodedServiceStation) {
  //   return res.status(400).json({ error: 'Missing required query parameters' });
  // }

  if (!decodedCustomer || !fromDate || !toDate) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }
  // console.log(decodedCustomer, fromDate, toDate, 'dataentrydatas');

  // SQL query
  // const query = `
  //   SELECT * 
  //   FROM tripsheet 
  //   WHERE apps = "Closed" 
  //     AND status = "Closed" 
  //     AND customer = ? 
  //     AND department = ? 
  //     AND tripsheetdate >= ? 
  //     AND (Billed_Status IS NULL OR Billed_Status NOT IN ("Covering_Closed", "Covering_Billed", "Transfer_Closed", "Transfer_Billed","Individual_Billed"))
  //     AND tripsheetdate <= DATE_ADD(?, INTERVAL 1 DAY)
  // `;
  const query = `
SELECT * 
FROM tripsheet 
WHERE apps = "Closed" 
  AND status = "Closed" 
  AND customer = ? 
  AND startdate >= ? 
  AND startdate < DATE_ADD(?, INTERVAL 1 DAY)
  AND (Billed_Status IS NULL OR Billed_Status NOT IN ("Covering_Closed", "Covering_Billed", "Transfer_Closed", "Transfer_Billed", "Individual_Billed"))


`;

  // Execute query with parameterized values
  db.query(query, [decodedCustomer, fromDate, toDate], (err, result) => {

    if (err) {
      // console.log('Failed to retrieve booking details from MySQL:', err);
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }

    return res.status(200).json(result);
  });
});

// get all groupbilling values
router.get('/allGroup-Billing', (req, res) => {
  const { customer, fromDate, toDate } = req.query;

  // Decode the URL-encoded query parameters
  const decodedCustomer = decodeURIComponent(customer);
  // const decodedServiceStation = decodeURIComponent(servicestation);

  // Validate required parameters
  if (!decodedCustomer || !fromDate || !toDate) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  // SQL query
  const query = `
    SELECT * 
    FROM tripsheet 
    WHERE apps = "Closed" 
    AND status = "Closed" 
    AND (Billed_Status IS NULL OR Billed_Status NOT IN ("Covering_Closed", "Covering_Billed", "Transfer_Closed", "Transfer_Billed","Individual_Billed"))
    AND customer = ? 
    AND startdate >= ? 
    AND startdate <= DATE_ADD(?, INTERVAL 1 DAY)
  `;

  // Execute query with parameterized values
  db.query(query, [decodedCustomer, fromDate, toDate], (err, result) => {
    if (err) {
      // console.error('Failed to retrieve booking details from MySQL:', err);
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }

    return res.status(200).json(result);
  });
})

// get chennai address
// router.get('/getChennaiAddress', (req, res) => {
//   const chennaiQuery = `SELECT * FROM stationcreation WHERE Stationname = 'chennai'`;

//   db.query(chennaiQuery, (error, results) => {
//     if (error) {
//       console.error('Error executing query:', error);
//       res.status(500).json({ error: 'Database query failed' });
//     } else {
//       res.json(results);
//     }
//   });
// });

router.get('/Group-Billing', (req, res) => {
  const { customer, fromDate, toDate, servicestation } = req.query;

  // Decode the URL-encoded query parameters
  const decodedCustomer = decodeURIComponent(customer);
  const decodedServiceStation = decodeURIComponent(servicestation);

  // Validate required parameters
  if (!decodedCustomer || !fromDate || !toDate || !decodedServiceStation) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  // SQL query
  const query = `
    SELECT * 
    FROM tripsheet 
    WHERE apps = "Closed" 
    AND status = "Closed" 
    AND (Billed_Status IS NULL OR Billed_Status NOT IN ("Covering_Closed", "Covering_Billed", "Transfer_Closed", "Transfer_Billed","Individual_Billed"))
    AND customer = ? 
    AND department = ? 
    AND tripsheetdate >= ? 
    AND tripsheetdate <= DATE_ADD(?, INTERVAL 1 DAY)
  `;

  // Execute query with parameterized values
  db.query(query, [decodedCustomer, decodedServiceStation, fromDate, toDate], (err, result) => {
    if (err) {
      // console.error('Failed to retrieve booking details from MySQL:', err);
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }
    return res.status(200).json(result);
  });
});

router.get('/tripsheet-keydown/:tripid', async (req, res) => {
  const tripid = req.params.tripid;


  const query = `
    SELECT * FROM tripsheet 
    WHERE tripid = ? 
    AND apps = "Closed"  
    AND status = "Closed" 
    AND (Billed_Status IS NULL 
    OR Billed_Status NOT IN ("Covering_Closed", "Covering_Billed", "Transfer_Closed", "Transfer_Billed"))
  `;

  db.query(query, [tripid], (error, result) => {
    if (error) {
      // console.log(error);
      return res.status(500).json({ error: 'Database query failed' });
    }
    // console.log(result)
    return res.status(200).json(result);
  });
});



//-----------------------------------------------
// router.get('/tripsheet-keydown/:tripid', async (req, res) => {
//   const tripid = req.params.tripid;
//   const username = req.query.loginUserName;

//   let data = '';

//   if (!username) {
//     return res.status(500).json({ error: "username is undefined" })
//   }

//   db.query("SELECT Stationname FROM usercreation WHERE username=?", [username], async (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: "there some issue ffetching station name " })
//     }
//     data = await results[0]?.Stationname;
//     //------------------------------------------------------------
//     if (data && data.toLowerCase() === "all") {
//       // Fetch by All
//       await db.query(
//         `SELECT * FROM tripsheet 
//          WHERE tripid = ? 
//          AND status = "Closed" 
//          AND (Billed_Status IS NULL OR Billed_Status NOT IN ("Covering_Closed", "Covering_Billed", "Transfer_Closed", "Transfer_Billed","Individual_Billed"))`,
//         [tripid],
//         (err, result) => {
//           if (err) {
//             return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
//           }
//           if (result.length === 0) {
//             return res.status(404).json({ error: 'Booking not found' });
//           }

//           const bookingDetails = result[0];
//           return res.status(200).json(bookingDetails);
//         }
//       );
//     }

//     if (data && data.toLowerCase() === "all") {
//       // its for fetch by All
//       await db.query(`SELECT * FROM tripsheet WHERE tripid = ? AND status="Closed" AND (Billed_Status IS NULL OR Billed_Status != "Covering_Closed" OR Billed_Status!="Covering_Billed OR Billed_Status != "Transfer_Closed" OR Billed_Status!="Transfer_Billed")`, tripid, (err, result) => {
//         if (err) {
//           return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
//         }
//         if (result.length === 0) {
//           return res.status(404).json({ error: 'Booking not found' });
//         }
//         console.log(result,'india');

//         const bookingDetails = result[0]; // Assuming there is only one matching booking
//         return res.status(200).json(bookingDetails);
//       });
//     }
//     else if (data) {
//       // its for fetch by All
//       // await db.query(`SELECT * FROM tripsheet WHERE tripid = ? AND status ="Transfer_Closed" AND department=${data}`, tripid, (err, result) => {
//       await db.query(`SELECT * FROM tripsheet WHERE tripid = ? AND status ="Closed" AND (Billed_Status IS NULL OR Billed_Status != "Covering_Closed" OR Billed_Status!="Covering_Billed OR Billed_Status != "Transfer_Closed" OR Billed_Status!="Transfer_Billed" OR Billed_Status!="Individual_Billed") `, tripid, (err, result) => {
//         if (err) {
//           return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
//         }
//         if (result.length === 0) {
//           return res.status(404).json({ error: 'Booking not found' });
//         }
//         const bookingDetails = result[0]; // Assuming there is only one matching booking
//         return res.status(200).json(bookingDetails);
//       });
//     } else {
//       return res.status(500).json({ error: 'there is some ISSUE ' });
//     }
//     //----------------------------------------------------------
//   })
// });
//--------------------------------------------
router.get("/trpisheetlogdetailst", (req, res) => {
  const { selectType, selectbookingId, fromDate, toDate, userName } = req.query;
  // console.log(req.query);
  

  // SQL queries
  const sqlWithIdQuery = `
    SELECT 
      TripsheetLog_Details.*, 
      booking.customer, 
      booking.guestname, 
      booking.guestmobileno, 
      booking.address1, 
      booking.duty, 
      booking.useage
    FROM
      booking
    LEFT JOIN 
      TripsheetLog_Details 
    ON 
      TripsheetLog_Details.tripsheet_no = booking.bookingno
    WHERE 
      TripsheetLog_Details.tripsheet_no = ? AND 
      TripsheetLog_Details.username = ? AND 
      TripsheetLog_Details.tripsheet_date >= ? AND 
      TripsheetLog_Details.tripsheet_date < DATE_ADD(?, INTERVAL 1 DAY)
  `;

  const sqlWithoutIdQuery = `
    SELECT 
      TripsheetLog_Details.*, 
      booking.customer, 
      booking.guestname, 
      booking.guestmobileno, 
      booking.address1, 
      booking.duty, 
      booking.useage
    FROM
      booking
    LEFT JOIN 
      TripsheetLog_Details 
    ON 
      TripsheetLog_Details.tripsheet_no = booking.bookingno
    WHERE 
      TripsheetLog_Details.username = ? AND 
      TripsheetLog_Details.tripsheet_date >= ? AND 
      TripsheetLog_Details.tripsheet_date < DATE_ADD(?, INTERVAL 1 DAY)
  `;

  // Choose query and parameters
  const query = selectbookingId ? sqlWithIdQuery : sqlWithoutIdQuery;
  const params = selectbookingId
    ? [selectbookingId,userName, fromDate, toDate]
    : [userName, fromDate, toDate];

  // Execute the query
  db.query(query, params, (err, result) => {
    if (err) {
      // console.error(err, 'Database Error');
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }

    return res.status(200).json(result);
  });
});


router.get("/handlelogdetails/:selectedid/:selectype", (req, res) => {
  const { selectedid, selectype } = req.params;


  // SQL queries
  const sqlWithIdQuery = `
    SELECT 
      TripsheetLog_Details.*, 
      booking.customer, 
      booking.guestname, 
      booking.guestmobileno, 
      booking.address1, 
      booking.duty, 
      booking.useage
    FROM
      booking
    LEFT JOIN 
      TripsheetLog_Details 
    ON 
      TripsheetLog_Details.tripsheet_no = booking.bookingno
    WHERE 
      TripsheetLog_Details.tripsheet_no = ? 
  `;
  const AllDataQuery = `
  SELECT * FROM BookingLogDetails 
  WHERE bookingno = ? 
`;

  

  // Choose query and parameters
  const query = selectype === "Booking" ? AllDataQuery : sqlWithIdQuery;
 

  // Execute the query
  // console.log(query, selectedid, 'query',selectype)
  db.query(query,[selectedid], (err, result) => {
    if (err) {
      // console.error(err, 'Database Error');
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }

    return res.status(200).json(result);
  });
});


router.post("/TripsheetlogDetailslogged", (req, res) => {
  const bookData = req.body;
  // console.log(bookData)

  db.query('INSERT INTO TripsheetLog_Details SET ?', bookData, (err, result) => {
    if (err) {
      // console.log(err)
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }

    // Check if the insertion was successful (affectedRows > 0)
    if (result.affectedRows === 0) {
      return res.status(400).json("data not inserted succefully")
    }
    // console.log(result,"log")

    return res.status(200).json("data inserted succefully")

  });
})



module.exports = router;