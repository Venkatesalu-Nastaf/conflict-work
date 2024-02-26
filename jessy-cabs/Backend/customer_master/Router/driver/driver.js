const express = require('express');
const router = express.Router();
const db = require('../../../db');
const multer = require('multer');
const path = require('path');

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

//for user permission
router.post('/save-permissions', async (req, res) => {
  const { userId, permissions } = req.body;

  try {
    // Clear existing permissions for the user
    await db.query('DELETE FROM user_permissions WHERE user_id = ?', [userId]);

    // Insert new permissions
    for (const permission of permissions) {
      await db.query(
        'INSERT INTO user_permissions (user_id, page_name, read_permission, new_permission, modify_permission, delete_permission) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, permission.name, permission.read, permission.new, permission.modify, permission.delete]
      );
    }

    res.status(200).json({ message: 'Permissions saved successfully' });
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
});

//for collect userid
router.get('/userdata/:username', (req, res) => {
  const username = req.params.username;

  db.query('SELECT * FROM usercreation WHERE username = ?', username, (err, result) => {
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

// collect data from billing database
router.get('/userdataid/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  db.query('SELECT * FROM user_permissions WHERE user_id = ?', user_id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve user permissions from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'User permissions not found' });
    }
    const userdetails = result;
    return res.status(200).json(userdetails);
  });
});
//collect permission database

router.get('/user-permissions/:user_id/:page_name', (req, res) => {
  const { user_id, page_name } = req.params;

  const query = `SELECT * FROM user_permissions WHERE user_id = ? AND page_name = ?`;

  db.query(query, [user_id, page_name], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results[0]);
    }
  });
});

/// ----------------------------------ayyanar---------------------------------------
// -------------------------------------------------driver  creation page--------------------------------------------------------------


router.use(express.static('public'));

// adthar --upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
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
  const sql = `insert into driver_proof(driverid,fileName,file_type	)values(${userId},'${fileName}','${fileType}')`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Status: "success" });
  })
})



//licence 

const storageLicence = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
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
  const sql = `insert into driver_proof(driverid,fileName,file_type)values(${userId},'${fileName}','${fileType}')`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Status: "success" });
  })
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
