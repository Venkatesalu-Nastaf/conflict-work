const express = require('express');
const router = express.Router();
const db = require('../../../db');


// vehicle_info database:-
// Add vehicle_info database
router.post('/vehicleinfo', (req, res) => {
    const bookData = req.body;
    db.query('INSERT INTO vehicleinfo SET ?', bookData, (err, result) => {
      if (err) {
        console.error('Error inserting data into MySQL:', err);
        return res.status(500).json({ error: "Failed to insert data into MySQL" });
      }
      console.log('Data inserted into MySQL');
      return res.status(200).json({ message: "Data inserted successfully" });
    });
  });
  
  // end vehicle_info database

  module.exports = router;