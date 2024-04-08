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

router.get('/tripsheetcustomertripid/:customer/:tripid', (req, res) => {
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
    return res.status(200).json(result);
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
  const query = 'SELECT * FROM tripsheet WHERE status = "Closed" AND  tripid IN (?)';

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
router.post('/transferlistdatatrip',(req,res)=>{
  const{ Status,Billdate,Organization_name,FromDate,EndDate,Trips,Amount,Trip_id}=req.body;
  const sqlquery='insert into Transfer_list(Status,Billdate,Organization_name,Trip_id,FromDate,EndDate,Trips,Amount) values(?,?,?,?,?,?,?,?)'

  if (!Array.isArray(Trip_id)) {
    return res.status(400).json({ error: 'id should be an array' });
  }
  const idString = Trip_id.join(',');
  db.query(sqlquery,[Status,Billdate,Organization_name,idString,FromDate,EndDate,Trips,Amount], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve  from MySQL' });
    }
    return res.status(200).json({ message: 'inserted successfully' });
  });

});

router.get('/gettransfer_list',(req,res)=>{
  db.query('SELECT * FROM Transfer_list',  (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
    }
    return res.status(200).json(result);

  });
  
})



router.get('/gettransfer_listdatas',(req,res)=>{
  const { Status,Organization_name,FromDate,EndDate  } = req.query;
  console.log(Status,"=========");
  // const { Status  } = req.query;
  if(Status==="all")
  {
  db.query('SELECT * FROM Transfer_list where  Organization_name=?  AND FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 1 DAY)',[Organization_name,FromDate,EndDate],(err, result) => {
    // db.query('SELECT * FROM Transfer_list where Status=? ',[Status],(err, result) => {
  // 
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
      }
      return res.status(200).json(result);
  
    });
  }

   else{
  db.query('SELECT * FROM Transfer_list where Status=? AND Organization_name=?  AND FromDate >= DATE_ADD(?, INTERVAL 0 DAY) AND FromDate <= DATE_ADD(?, INTERVAL 1 DAY)',[Status,Organization_name,FromDate,EndDate],(err, result) => {
  // db.query('SELECT * FROM Transfer_list where Status=? ',[Status],(err, result) => {
// 
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
    }
    return res.status(200).json(result);

  });
}
  
})



module.exports = router;
