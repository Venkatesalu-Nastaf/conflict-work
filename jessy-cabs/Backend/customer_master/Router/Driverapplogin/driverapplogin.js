const express = require('express');
const router = express.Router();
const db = require('../../../db');

// user creation database
// add user creation database
router.post('/drivercreation', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO drivercreation SET ?', bookData, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    console.log('Data inserted into MySQL');
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});
// delete user creation data
router.delete('/drivercreation/:userid', (req, res) => {
  const userid = req.params.userid;
  console.log('Customer ID:', userid); // Log the customer ID
  console.log('DELETE query:', 'DELETE FROM drivercreation WHERE userid = ?', userid);
  db.query('DELETE FROM drivercreation WHERE userid = ?', userid, (err, result) => {
    if (err) {
      console.error('Error deleting data from MySQL:', err);
      return res.status(500).json({ error: "Failed to delete data from MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    console.log('Data deleted from MySQL');
    return res.status(200).json({ message: "Data deleted successfully" });
  });
});
// update user creation details
router.put('/drivercreation/:userid', (req, res) => {
  const userid = req.params.userid;
  const updatedCustomerData = req.body;
  console.log('Customer ID:', userid); // Log the customer ID
  console.log('Updated customer data:', updatedCustomerData);
  db.query('UPDATE drivercreation SET ? WHERE userid = ?', [updatedCustomerData, userid], (err, result) => {
    if (err) {
      console.error('Error updating data in MySQL:', err);
      return res.status(500).json({ error: "Failed to update data in MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    console.log('Data updated in MySQL');
    return res.status(200).json({ message: "Data updated successfully" });
  });
});

router.get('/drivercreation', (req, res) => {
  const filterValue = req.query.filter; // Assuming you want to filter based on a query parameter 'filter'
  let query = 'SELECT * FROM drivercreation';

  if (filterValue) {
    // Add a WHERE clause to filter based on the query parameter
    query += ` WHERE userid = '${filterValue}'`; // Replace 'column_name' with the actual column name you want to filter on
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }
    return res.status(200).json(results);
  });
});


module.exports = router;