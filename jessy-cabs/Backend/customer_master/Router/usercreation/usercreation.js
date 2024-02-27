const express = require('express');
const router = express.Router();
const db = require('../../../db');
const multer = require('multer');
const path = require('path');

router.use(express.static('images'));
router.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }

})

const upload = multer({
  storage: storage
})

// user creation database
// add user creation database
router.post('/usercreation', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO usercreation SET ?', bookData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});
// delete user creation data
router.delete('/usercreation/:userid', (req, res) => {
  const userid = req.params.userid;
  db.query('DELETE FROM usercreation WHERE userid = ?', userid, (err, result) => {
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
router.put('/usercreation/:userid', (req, res) => {
  const userid = req.params.userid;
  const updatedCustomerData = req.body;
  db.query('UPDATE usercreation SET ? WHERE userid = ?', [updatedCustomerData, userid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update data in MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    return res.status(200).json({ message: "Data updated successfully" });
  });
});

router.get('/usercreation', (req, res) => {
  const filterValue = req.query.filter; // Assuming you want to filter based on a query parameter 'filter'
  let query = 'SELECT * FROM usercreation';

  if (filterValue) {
    // Add a WHERE clause to filter based on the query parameter
    query += ` WHERE userid = '${filterValue}'`; // Replace 'column_name' with the actual column name you want to filter on
  }

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }
    return res.status(200).json(results);
  });
});

router.get('/usercreationgetdata/:value', (req, res) => {
  const { value } = req.query;
  let query = 'SELECT * FROM usercreation WHERE 1=1';
  let params = [];

  if (value) {
    const columnsToSearch = [
      'userid',
      'username',
      'stationname',
      'designation',
      'organizationname',
      'ufirstname',
      'ulastname',
      'mobileno',
      'email',
    ];

    const likeConditions = columnsToSearch.map(column => `${column} LIKE ?`).join(' OR ');

    query += ` AND (${likeConditions})`;
    params = columnsToSearch.map(() => `%${searchText}%`);
  }

  db.query(query, params, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve vehicle details from MySQL' });
    }
    return res.status(200).json(result);
  });
});


router.put('/userprofileupload/:id', upload.single('image'), (req, res) => {
  const userId = req.params.id;
  const fileName = req.file.filename;

  // Check if the user profile already exists
  const checkIfExistsQuery = `SELECT * FROM user_profile WHERE userid = ?`;
  db.query(checkIfExistsQuery, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ Message: "Error checking profile existence", err });
    }

    if (rows.length > 0) {
      // Profile already exists, update the record
      const updateQuery = `UPDATE user_profile SET filename = ? WHERE userid = ?`;
      db.query(updateQuery, [fileName, userId], (err, result) => {
        if (err) {
          return res.status(500).json({ Message: "Error updating profile picture", err });
        }
        return res.status(200).json({ Status: "success" });
      });
    } else {
      // Profile doesn't exist, insert a new record
      const insertQuery = `INSERT INTO user_profile (userid, filename) VALUES (?, ?)`;
      db.query(insertQuery, [userId, fileName], (err, result) => {
        if (err) {
          return res.status(500).json({ Message: "Error inserting profile picture", err });
        }
        return res.status(200).json({ Status: "success" });
      });
    }
  });
});

//getting user profile

router.get('/userprofileview/:id', (req, res) => {
  const userid = req.params.id
  const sql = 'select * from user_profile where userid=?';
  db.query(sql, [userid], (err, result) => {
    if (err) return res.json({ Message: "error" })
    return res.json(result);
  })
})


module.exports = router;