const express = require('express');
const router = express.Router();
const db = require('../../../db');
const moment = require('moment'); // or import dayjs from 'dayjs';
const multer = require('multer');
const path = require('path');

// vehicle_info database:-
// Add vehicle_info database
router.post('/vehicleinfo', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO vehicleinfo SET ?', bookData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
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

  let query = 'SELECT * FROM vehicleinfo WHERE 1=1';
  let params = [];

  if (searchText) {
    const columnsToSearch = [
      'vehicleId',
      'doadate',
      'vehRegNo',
      'costCenter',
      'vehType',
      'owner',
      'mobileNo',
      'email',
      'yearModel',
      'insuranceno',
      'insduedate',
      'licenseno',
      'licensebatchno',
      'licduedate',
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
      'routeno',
      'remarks',
      'OwnerType',
      'active',
    ];

    const likeConditions = columnsToSearch.map(column => `${column} LIKE ?`).join(' OR ');

    query += ` AND (${likeConditions})`;
    params = columnsToSearch.map(() => `%${searchText}%`);
  }

  if (fromDate && moment(fromDate, 'DD/MM/YYYY', true).isValid() && toDate && moment(toDate, 'DD/MM/YYYY', true).isValid()) {
    const formattedFromDate = moment(fromDate, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
    const formattedToDate = moment(toDate, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

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


// ayyanar----------------------
// -----------------------insurence ---------------
const Insurance_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }

})

const Insurance_uploadfile = multer({ storage: Insurance_storage });
router.post('/insurance-pdf/:id', Insurance_uploadfile.single("file"), async (req, res) => {
  const vehicleId = req.params.id;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  const sql = `insert into vehicle_documents(vehicleId,fileName,file_type	)values(${vehicleId},'${fileName}','${fileType}')`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Status: "success" });
  })
})

// ----------------------Licence----------------------

const Licence_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }

})

const Licence_uploadfile = multer({ storage: Licence_storage });
router.post('/licence-pdf/:id', Licence_uploadfile.single("file"), async (req, res) => {
  const vehicleId = req.params.id;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  const sql = `insert into vehicle_documents(vehicleId,fileName,file_type	)values(${vehicleId},'${fileName}','${fileType}')`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Status: "success" });
  })
})


// ----------------------NationalPermit----------------------

const NationalPermit_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const NationalPermit_uploadfile = multer({ storage: NationalPermit_storage });
router.post('/nationalPermit-pdf/:id', NationalPermit_uploadfile.single("file"), async (req, res) => {
  const vehicleId = req.params.id;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  const sql = `insert into vehicle_documents(vehicleId,fileName,file_type	)values(${vehicleId},'${fileName}','${fileType}')`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Status: "success" });
  })
})


// ----------------------StatePermit----------------------

const StatePermit_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const StatePermit_uploadfile = multer({ storage: StatePermit_storage });
router.post('/statePermit-pdf/:id', StatePermit_uploadfile.single("file"), async (req, res) => {
  const vehicleId = req.params.id;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  const sql = `insert into vehicle_documents(vehicleId,fileName,file_type	)values(${vehicleId},'${fileName}','${fileType}')`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Status: "success" });
  })
})


// ----------------------Rcbook----------------------

const Rcbook_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const Rcbook_uploadfile = multer({ storage: Rcbook_storage });
router.post('/rcBook-pdf/:id', Rcbook_uploadfile.single("file"), async (req, res) => {
  const vehicleId = req.params.id;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  const sql = `insert into vehicle_documents(vehicleId,fileName,file_type	)values(${vehicleId},'${fileName}','${fileType}')`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Status: "success" });
  })
})



// ----------------------setFcCopy----------------------

const setFcCopy_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')

  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const setFcCopy_uploadfile = multer({ storage: setFcCopy_storage });
router.post('/fcCopy-pdf/:id', setFcCopy_uploadfile.single("file"), async (req, res) => {
  const vehicleId = req.params.id;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  const sql = `insert into vehicle_documents(vehicleId,fileName,file_type	)values(${vehicleId},'${fileName}','${fileType}')`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Status: "success" });
  })
})

//-----------------fetch ---------------
router.get('/vehicle-docView/:id', (req, res) => {
  const id = req.params.id
  const sql = 'select * from vehicle_documents where vehicleId=?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "error" })
    return res.json(result);
  })
})

///---------------------ayyanar end-----------------------------


module.exports = router;