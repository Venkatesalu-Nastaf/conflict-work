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

router.post('/GroupBillingList', (req, res) => {
  const { status, InvoiceDate, Customer, FromDate, ToDate, Trips, Amount, Trip_id } = req.body;

  const sqlquery = "INSERT INTO Group_billing(Status, InvoiceDate, Customer, FromDate, ToDate, Trips, Amount, Trip_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const sqlquery1 = "UPDATE tripsheet SET status = 'Billed' WHERE tripid IN (?)";

  db.query(sqlquery, [status, InvoiceDate, Customer, FromDate, ToDate, Trips, Amount, Trip_id.join(',')], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to insert into MySQL' });
    }


    if (result.affectedRows >= 1) {
      db.query(sqlquery1, [Trip_id], (err, result1) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to update tripsheet status in MySQL' });
        }


        return res.status(200).json({ message: 'Inserted and updated successfully' });
      });
    }
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
  const sqlUpdateGroupBilling = "UPDATE Group_billing SET Trips = ?, Amount = ?, Trip_id = TRIM(BOTH ',' FROM REPLACE(REPLACE(CONCAT(',', Trip_id, ','), CONCAT(',', ?, ','), ','), ',,', ',')) WHERE FIND_IN_SET(?, Trip_id) > 0";

  // Iterate over the Trip_id array
  Trip_id.forEach(tripId => {
    db.query(sqlUpdateGroupBilling, [Trips, Amount, tripId, tripId], (err, updateGroupBillingResult) => {
      if (err) {
        console.log(err, 'error');
        return res.status(500).json({ error: "Failed to update data in MySQL" });
      }
      console.log(updateGroupBillingResult, 'result');
    });
  });

  return res.status(200).json({ message: "Data updated successfully" });
});

router.post('/tripsheetstatusupdate', (req, res) => {
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

  db.query('SELECT * FROM gmapdata WHERE tripid = ?', tripid, (err, result) => {
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


router.get('/ParticularLists/:tripno', (req, res) => {
  const tripno = req.params.tripno;

  const tripIds = tripno.split(',');
  const query = `SELECT * FROM tripsheet WHERE status="Billed" AND tripid IN (?)`;
  db.query(query, [tripIds], (err, result) => {
    if (err) {
      console.error(err);
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
      console.log(err, 'error');
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
      console.log(err, 'error');
      return res.status(500).json({ error: "Failed to delete data from MySQL" });
    }
    return res.status(200).json({ message: "Data deleted successfully" });
  });
});


//cover billing
router.get('/Transfer-Billing', (req, res) => {
  const { customer, fromDate, toDate } = req.query;

  let query = 'SELECT * FROM tripsheet WHERE  apps="Closed" and status="Transfer_Closed" and customer=?  AND startdate >= DATE_ADD(?, INTERVAL 0 DAY) AND startdate <= DATE_ADD(?, INTERVAL 1 DAY)';


  db.query(query, [customer, fromDate, toDate], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }
    return res.status(200).json(result);
  });
});


router.get('/Group-Billing', (req, res) => {
  const { customer, fromDate, toDate } = req.query;

  let query = 'SELECT * FROM tripsheet WHERE  apps="Closed" and status="Covering_Closed" and customer=?  AND startdate >= DATE_ADD(?, INTERVAL 0 DAY) AND startdate <= DATE_ADD(?, INTERVAL 1 DAY)';


  db.query(query, [customer, fromDate, toDate], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }
    return res.status(200).json(result);
  });
});


//-----------------------------------------------
router.get('/tripsheet-keydown/:tripid', async (req, res) => {
  const tripid = req.params.tripid;
  const username = req.query.loginUserName;
  console.log("heelloo", tripid, username)

  let data = '';

  if (!username) {
    return res.status(500).json({ error: "username is undefined" })
  }

  db.query("SELECT Stationname FROM usercreation WHERE username=?", [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: "there some issue ffetching station name " })
    }
    data = await results[0]?.Stationname;
    //------------------------------------------------------------

    if (data && data.toLowerCase() === "all") {
      console.log("llll")
      // its for fetch by All
      await db.query(`SELECT * FROM tripsheet WHERE tripid = ? AND status="Transfer_Closed"`, tripid, (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
        }
        if (result.length === 0) {
          return res.status(404).json({ error: 'Booking not found' });
        }
        const bookingDetails = result[0]; // Assuming there is only one matching booking
        return res.status(200).json(bookingDetails);
      });
    }
    else if (data) {
      // its for fetch by All
      await db.query(`SELECT * FROM tripsheet WHERE tripid = ? AND status ="Transfer_Closed" AND department=${data}`, tripid, (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
        }
        if (result.length === 0) {
          return res.status(404).json({ error: 'Booking not found' });
        }
        const bookingDetails = result[0]; // Assuming there is only one matching booking
        return res.status(200).json(bookingDetails);
      });
    } else {
      return res.status(500).json({ error: 'there is some ISSUE ' });
    }
    //----------------------------------------------------------
  })
});
//--------------------------------------------




module.exports = router;