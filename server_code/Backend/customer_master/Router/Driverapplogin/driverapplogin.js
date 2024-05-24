const express = require('express');
const router = express.Router();
const db = require('../../../db');
const moment = require('moment');
const multer = require('multer');
const path = require('path');
router.use(express.static('customer_master'));

// user creation database
// add user creation database


// router.post('/drivercreation', (req, res) => {
//   const bookData = req.body;

//   db.query('INSERT INTO drivercreation SET ?', bookData, (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: "Failed to insert data into MySQL" });

//     }
//     return res.status(200).json({ message: "Data inserted successfully" });
//   });
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './customer_master/public/driver_doc')
  },
  filename: (req, file, cb) => {

    
    cb(null, `${file.fieldname}_${Date.now()}-${file.originalname}`);
},
    
  

})

const uploadfile = multer({ storage: storage });

// Endpoint to handle file upload
router.post('/drivercreation', uploadfile.single('Profile_image'), (req, res) => {
  // const profile_image = req.file.filename;
  let profile_image=null
  if(!req.file){
    profile_image=null

  }
  else{
    profile_image = req.file.filename;
  }
  console.log(profile_image)
  const {
    drivername,
    username,
    stations,
    Mobileno,
    userpassword,
    joiningdate,
    active,
    address1,
    licenseno,
    licenseexpdate,
    badgeno,
    badgeexpdate,
    aadharno,
    Email
  } = req.body;
  console.log(drivername,
    username,
    stations,
    Mobileno,
    userpassword,
    joiningdate,
    active,
    address1,
    licenseno,
    licenseexpdate,
    badgeno,
    badgeexpdate,
    aadharno,
    Email)
 

  const sql = "INSERT INTO drivercreation (drivername, username, stations, Mobileno,joiningdate, licenseno,badgeno,aadharno,licenseexpdate,badgeexpdate,userpassword, active, address1, Email,Profile_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [drivername, username, stations, Mobileno,joiningdate,licenseno, badgeno,aadharno,licenseexpdate,badgeexpdate,userpassword, active, address1, Email,profile_image], (err, result) => {
    if (err) {
      console.log(err)
            return res.status(500).json({ error: "Failed to insert data into MySQL" });
      
          }
          
          return res.status(200).json({ message: "Data inserted successfully" });
  });
});



router.get('/lastdrivergetid', (req, res) => {
  db.query('SELECT   driverid  FROM  drivercreation ORDER BY  driverid DESC LIMIT    1', (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'driverid not found' });
    }
    const lastdriverid = result[0];
    return res.status(200).json(lastdriverid);
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
// router.put('/drivercreation/:driverid', (req, res) => {
//   const userid = req.params.driverid;
//   const updatedCustomerData = req.body;
//   db.query('UPDATE drivercreation SET ? WHERE driverid = ?', [updatedCustomerData, userid], (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: "Failed to update data in MySQL" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Customer not found" });
//     }
//     return res.status(200).json({ message: "Data updated successfully" });
//   });

// });

router.put('/drivercreation/:driverid',uploadfile.single('Profile_image'), (req, res) => {
  const userid = req.params.driverid;
  const updatedCustomerData = req.body;
  if (req.file) {
    console.log(req.file)
    updatedCustomerData.Profile_image = req.file.filename;
  }
 
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

// Getting all Driver Details
router.get('/getDriverDetails', (req, res) => {
  db.query('SELECT * FROM drivercreation', (err, result) => {
    if (err) {
      // console.log(err, 'error');
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });

    }
    return res.status(200).json(result);
  })
})

// Getting vehicle Details
router.get('/getVehicleDetails', (req, res) => {
  db.query('SELECT * FROM vehicleinfo WHERE active ="yes" ', (err, result) => {
    if (err) {
      // console.log(err, 'error');
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }
    return res.status(200).json(result);
  })
})

// Getting not active vehicles
router.get('/getNotVehicleDetails', (req, res) => {
  db.query('SELECT * FROM vehicleinfo WHERE active ="no" ', (err, result) => {
    if (err) {
      // console.log(err, 'error');
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }
    return res.status(200).json(result);
  })
})


router.get('/checkAssign', (req, res) => {
  db.query('SELECT * FROM driver_trip_assign', (err, result) => {
    if (err) {
      // console.log(err, 'error');
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }
    return res.status(200).json(result);
  })
})

router.post('/removeAssign', (req, res) => {
  const { driverName } = req.body;
  db.query('UPDATE drivercreation SET driverApp="online" WHERE drivername IN (?)', [driverName], (err, result) => {
    if (err) {
      // console.log(err, 'error');
      return res.status(500).json({ error: 'Failed to update status' });
    }
    return res.status(200).json({ message: 'update successful' });
  })
})

router.post('/driverAssign', (req, res) => {
  const { driverName } = req.body;
  console.log(driverName, 'drivername');

  db.query('UPDATE drivercreation SET driverApp="assigned" WHERE drivername IN (?)', [driverName], (err, result) => {
    if (err) {
      // console.log(err, 'error');
      return res.status(500).json({ error: 'Failed to update status' });
    }
    return res.status(200).json({ message: 'Update successful' });
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
  // console.log(params, query)
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