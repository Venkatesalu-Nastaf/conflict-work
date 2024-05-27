const express = require('express');
const router = express.Router();
const db = require('../../../db');
const multer = require('multer');
const path = require('path');
router.use(express.static('customer_master'));

// add driver master database
router.post('/drivermaster', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO drivermaster SET ?', bookData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});
// delete driver master data
router.delete('/drivermaster/:driverid', (req, res) => {
  const driverid = req.params.driverid;

  db.query('DELETE FROM drivermaster WHERE driverid = ?', driverid, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete data from MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    return res.status(200).json({ message: "Data deleted successfully" });
  });
});
// update driver master details
router.put('/drivermaster/:driverid', (req, res) => {
  const driverid = req.params.driverid;
  const updatedCustomerData = req.body;
  db.query('UPDATE drivermaster SET ? WHERE driverid = ?', [updatedCustomerData, driverid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update data in MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    return res.status(200).json({ message: "Data updated successfully" });
  });
});
// collect data for driver master table
router.get('/drivermaster', (req, res) => {
  db.query('SELECT * FROM drivermaster', (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});
// End driver master database

// -------------------------------------------------driver  creation page file upload--------------------------------------------------------------

// router.use(express.static('customer_master'));

// adthar --upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './customer_master/public/driver_doc')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }

})

const uploadfile = multer({ storage: storage });

router.post('/driver-pdf/:id', uploadfile.single("file"), async (req, res) => {
  const userId = req.params.id;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  console.log(fileName,"driver pdf",fileType,userId)
  if (fileName) {

    const sql = `insert into driver_proof(driverid,fileName,file_type	)values('${userId}','${fileName}','${fileType}')`;
    db.query(sql, (err, result) => {
      if (err) {

        return res.json({ Message: "Error" });
      }
      return res.json({ Status: "success" });
    })
  }
})

//licence 

const storageLicence = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './customer_master/public/driver_doc')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }

})

const uploadfileLicence = multer({ storage: storageLicence });

router.post('/driver-licencepdf/:id', uploadfileLicence.single("file"), async (req, res) => {
  const userId = req.params.id
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  if (fileName) {
    const sql = `insert into driver_proof(driverid,fileName,file_type)values('${userId}','${fileName}','${fileType}')`;
    db.query(sql, (err, result) => {
      if (err) return res.json({ Message: "Error" });
      console.log(result, "license")
      return res.json({ Status: "success" });
    })
  }
})

//pdf view -
router.get('/pdf-view/:id', (req, res) => {
  const id = req.params.id
  const sql = 'select * from driver_proof where driverid=?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "error" })
    return res.json(result);
  })
})


module.exports = router;
