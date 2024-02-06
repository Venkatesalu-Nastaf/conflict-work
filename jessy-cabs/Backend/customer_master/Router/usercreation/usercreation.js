const express = require('express');
const router = express.Router();
const db = require('../../../db');

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

module.exports = router;