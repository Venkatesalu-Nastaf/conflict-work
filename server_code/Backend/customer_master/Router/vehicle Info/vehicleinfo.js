const express = require('express');
const router = express.Router();
const db = require('../../../db');
const moment = require('moment'); // or import dayjs from 'dayjs';
const multer = require('multer');
const path = require('path');


router.use(express.static('customer_master'));

// vehicle_info database:-
// Add vehicle_info database
router.get('/drivernamevechicleinfo', (req, res) => {
  const sql = 'select * from drivercreation'
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }

    return res.status(200).json(result);
  })
})

router.get('/lastvechileinfogetid', (req, res) => {
  db.query('SELECT   vehicleId  FROM  vehicleinfo ORDER BY  vehicleId DESC LIMIT    1', (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'vehicleid not found' });
    }
    const lastdriverid = result[0];
    return res.status(200).json(lastdriverid);
  });
});
router.get('/vechileinfogetdata', (req, res) => {
  db.query('SELECT * FROM  vehicleinfo ', (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'vehicleid not found' });
    }
   
    
    return res.status(200).json(result);
  });
});

router.get('/vechiclenameinfo', (req, res) => {
  const { vehicletypename } = req.query; // Access the parameter using req.params
  // Modify the query to use the LIKE operator for partial matching
  // console.log(vehicletypename,"namevecile")

  db.query('SELECT * FROM vehicleinfo WHERE vehiclename LIKE ?', [`${vehicletypename}%`], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve customer details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    const vehicletypedetails = result;
    // Assuming there is only one matching customer
    return res.status(200).json(vehicletypedetails);
  });
});
router.post('/vehicleinfo', (req, res) => {
  const bookData = req.body;

  db.query('INSERT INTO vehicleinfo SET ?', bookData, (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    console.log(result)
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});

// Delete Customer Master data
router.delete('/vehicleinfo/:vehicleId', (req, res) => {
  const vehicleId = req.params.vehicleId;
  db.query('DELETE FROM vehicleinfo WHERE vehicleId = ?', vehicleId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete data from MySQL' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    return res.status(200).json({ message: 'Data deleted successfully' });
  });
});

// Update Customer Master details
router.put('/vehicleinfo/:vehicleId', (req, res) => {
  const vehicleId = req.params.vehicleId;
  const updatedCustomerData = req.body;

  db.query('UPDATE vehicleinfo SET ? WHERE vehicleId = ?', [updatedCustomerData, vehicleId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update data in MySQL' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    return res.status(200).json({ message: 'Data updated successfully' });
  });
});


router.get('/searchvehicleinfo', (req, res) => {
  const { searchText, fromDate, toDate } = req.query;
console.log(searchText,fromDate,toDate,"dateeeee")


  let query = 'SELECT * FROM vehicleinfo WHERE 1=1';
  let params = [];

  if (searchText) {
    const columnsToSearch = [
      'vehicleId',
      'vehiclename',
      'hiretypes',
      'vechtype',
      'fueltype',
      'Groups',
      'doadate',
      'vehRegNo',
      'owner',
      'mobileNo',
      'email',
      'yearModel',
      'insuranceno',
      'insduedate',
      'nationalpermito',
      'npdate',
      'avgmileage',
      'statepermito',
      'spdate',
      'financer',
      'rcbookno',
      'fcdate',
      'driverName',
      'tankCap',
      'active',
      'stations'
    ];

    const likeConditions = columnsToSearch.map(column => `${column} LIKE ?`).join(' OR ');

    query += ` AND (${likeConditions})`;
    params = columnsToSearch.map(() => `${searchText}%`);
  }


  // if (fromDate && moment(fromDate, 'DD/MM/YYYY', true).isValid() && toDate && moment(toDate, 'DD/MM/YYYY', true).isValid()) {
  //   const formattedFromDate = moment(fromDate, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
  //   const formattedToDate = moment(toDate, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
  //   console.log(formattedToDate,fromDate,"enter condition")
    if (fromDate && toDate) {
      // const formattedFromDate = moment(fromDate, 'YYYY/MM/DD').format('YYYY-MM-DD');
      // const formattedToDate = moment(toDate, 'YYYY/MM/DD').format('YYYY-MM-DD');
      const formattedFromDate = moment(fromDate).format('YYYY-MM-DD');
      const formattedToDate = moment(toDate).format('YYYY-MM-DD');

    query += ' AND doadate >= DATE_ADD(?, INTERVAL 0 DAY) AND doadate <= DATE_ADD(?, INTERVAL 1 DAY)';
    params.push(formattedFromDate, formattedToDate);
  }
    
  db.query(query, params, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve vehicle details from MySQL' });
    }
    return res.status(200).json(result);
  });
});

// -----------------------insurence ---------------
const Insurance_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './customer_master/public/vehicle_doc')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }

})

const Insurance_uploadfile = multer({ storage: Insurance_storage });
// router.post('/insurance-pdf/:id', Insurance_uploadfile.single("file"), async (req, res) => {
router.post('/insurance-pdf/:vehicleId', Insurance_uploadfile.single("file"), async (req, res) => {
  const vehicleId = req.params.vehicleId;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;

  if (fileName && vehicleId) {
    const sql = `insert into vehicle_documents(vehicleId,fileName,file_type	)values('${vehicleId}','${fileName}','${fileType}')`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
        return res.json({ Message: "Error" });
      }
      return res.json({ Status: "success" });
    })
  }
})

// ----------------------Licence----------------------

const Licence_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './customer_master/public/vehicle_doc')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }

})

const Licence_uploadfile = multer({ storage: Licence_storage });
router.post('/licence-pdf/:vehicleId', Licence_uploadfile.single("file"), async (req, res) => {
  const vehicleId = req.params.vehicleId;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  if (fileName && vehicleId) {

    const sql = `insert into vehicle_documents(vehicleId,fileName,file_type	)values('${vehicleId}','${fileName}','${fileType}')`;
    db.query(sql, (err, result) => {
      if (err) return res.json({ Message: "Error" });
      return res.json({ Status: "success" });
    })
  }
})


// ----------------------NationalPermit----------------------

const NationalPermit_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './customer_master/public/vehicle_doc')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const NationalPermit_uploadfile = multer({ storage: NationalPermit_storage });
router.post('/nationalPermit-pdf/:vehicleId', NationalPermit_uploadfile.single("file"), async (req, res) => {
  const vehicleId = req.params.vehicleId;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;

  if (fileName && vehicleId) {
    const sql = `insert into vehicle_documents(vehicleId,fileName,file_type	)values('${vehicleId}','${fileName}','${fileType}')`;
    db.query(sql, (err, result) => {
      if (err) return res.json({ Message: "Error" });
      return res.json({ Status: "success" });
    })
  }
})

// ----------------------StatePermit----------------------

const StatePermit_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './customer_master/public/vehicle_doc')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const StatePermit_uploadfile = multer({ storage: StatePermit_storage });
router.post('/statePermit-pdf/:vehicleId', StatePermit_uploadfile.single("file"), async (req, res) => {
  const vehicleId = req.params.vehicleId;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;

  if (fileName && vehicleId) {
    const sql = `insert into vehicle_documents(vehicleId,fileName,file_type)values('${vehicleId}','${fileName}','${fileType}')`;
    db.query(sql, (err, result) => {
      if (err) return res.json({ Message: "Error" });
      return res.json({ Status: "success" });
    })
  }
})

// ----------------------Rcbook----------------------

const Rcbook_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './customer_master/public/vehicle_doc')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const Rcbook_uploadfile = multer({ storage: Rcbook_storage });
router.post('/rcBook-pdf/:vehicleId', Rcbook_uploadfile.single("file"), async (req, res) => {
  const vehicleId = req.params.vehicleId;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;

  if (fileName && vehicleId) {
    const sql = `insert into vehicle_documents(vehicleId,fileName,file_type	)values('${vehicleId}','${fileName}','${fileType}')`;
    db.query(sql, (err, result) => {
      if (err) return res.json({ Message: "Error" });
      return res.json({ Status: "success" });
    })
  }
})

// ----------------------setFcCopy----------------------

const setFcCopy_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './customer_master/public/vehicle_doc')

  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const setFcCopy_uploadfile = multer({ storage: setFcCopy_storage });
router.post('/fcCopy-pdf/:vehicleId', setFcCopy_uploadfile.single("file"), async (req, res) => {
  const vehicleId = req.params.vehicleId;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  if (fileName && vehicleId) {
    const sql = `insert into vehicle_documents(vehicleId,fileName,file_type	)values('${vehicleId}','${fileName}','${fileType}')`;
    db.query(sql, (err, result) => {
      if (err) return res.json({ Message: "Error" });
      return res.json({ Status: "success" });
    })
  }
})

//-----------------fetch ---------------
router.get('/vehicle-docView/:vechicleId', (req, res) => {
  const id = req.params.vechicleId

  const sql = 'select * from vehicle_documents where vehicleId=?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "error" })
    return res.json(result);
  })
})



module.exports = router;
