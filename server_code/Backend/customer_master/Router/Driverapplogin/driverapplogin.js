const express = require('express');
const router = express.Router();
const db = require('../../../db');
const moment = require('moment');
// user creation database
// add user creation database
router.post('/drivercreation', (req, res) => {
  const bookData = req.body;
  // const  username=bookData.username

  // console.log(bookData,"book")



       db.query('INSERT INTO drivercreation SET ?', bookData, (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Failed to insert data into MySQL" });
        
        }
        // console.log(result,"innsertdriver")
        return res.status(200).json({ message: "Data inserted successfully" });
      });
      
    
  
    
     
   
  
   
  });

  // })
//   db.query('INSERT INTO drivercreation SET ?', bookData, (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: "Failed to insert data into MySQL" });
//     }
//     return res.status(200).json({ message: "Data inserted successfully" });
//   });
// });
// delete user creation data
router.delete('/drivercreation/:driverid', (req, res) => {
  const userid = req.params.driverid;
  db.query('DELETE FROM drivercreation WHERE driverid = ?', userid, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete data from MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    return res.status(200).json({ message: "Data deleted successfully" });
  });
});
// update user creation details
router.put('/drivercreation/:driverid', (req, res) => {
  const userid = req.params.driverid;
  const updatedCustomerData = req.body;
  // console.log(userid,"userbbb",updatedCustomerData)
  db.query('UPDATE drivercreation SET ? WHERE driverid = ?', [updatedCustomerData, userid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update data in MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    // console.log(result,"updatedriver")
    return res.status(200).json({ message: "Data updated successfully" });
  });
  
});

router.get('/drivercreation', (req, res) => {
  const filterValue = req.query.filter; // Assuming you want to filter based on a query parameter 'filter'
  let query = 'SELECT * FROM drivercreation';

  if (filterValue) {
    // Add a WHERE clause to filter based on the query parameter
    query += ` WHERE driverid = '${filterValue}'`; // Replace 'column_name' with the actual column name you want to filter on
  }

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }
    return res.status(200).json(results);
  });
});

router.get('/searchfordriver', (req, res) => {
  const { searchText, fromDate, toDate } = req.query;
  // console.log(searchText,"ss",fromDate, toDate)
  let query = 'SELECT * FROM drivercreation WHERE 1=1';
  let params = [];
  

  if (searchText) {
      const columnsToSearch = [
          'drivername',
           'driverid',
            'city',
            'Mobileno',
            'stations',
            'username',
            'licenseno',
            'badgeno',
            'aadharno',
            'active',
            'address1',
            ];

      const likeConditions = columnsToSearch.map(column => `${column} LIKE ?`).join(' OR ');

      query += ` AND (${likeConditions})`;
      params = columnsToSearch.map(() => `${searchText}%`);
  }

  // if (fromDate && moment(fromDate, 'YYYY/MM/DD', true).isValid() && toDate && moment(toDate, 'YYYY/MM/DD', true).isValid())
  if (fromDate && toDate) {
      // const formattedFromDate = moment(fromDate, 'YYYY/MM/DD').format('YYYY-MM-DD');
      // const formattedToDate = moment(toDate, 'YYYY/MM/DD').format('YYYY-MM-DD');
      const formattedFromDate = moment(fromDate).format('YYYY-MM-DD');
      const formattedToDate = moment(toDate).format('YYYY-MM-DD');

      query += ' AND joiningdate >= DATE_ADD(?, INTERVAL 0 DAY) AND joiningdate <= DATE_ADD(?, INTERVAL 1 DAY)';
      params.push(formattedFromDate, formattedToDate);
  }
  console.log(params,query)
  db.query(query, params, (err, result) => {
      if (err) {
        // console.log(err,"y")
          return res.status(500).json({ error: 'Failed to retrieve vehicle details from MySQL' });
      }
      // console.log(result,"searef")
      return res.status(200).json(result);
  });
});

module.exports = router;