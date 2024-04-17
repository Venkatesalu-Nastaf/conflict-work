const express = require('express');
const router = express.Router();
const db = require('../../../db');

// Add Ratetype database
// router.post('/ratetype', (req, res) => {
//   const bookData = req.body;
//   db.query('INSERT INTO ratetype SET ?', bookData, (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: "Failed to insert data into MySQL" });
//     }
//     return res.status(200).json({ message: "Data inserted successfully" });
//   });
// });

router.post('/ratetype', (req, res) => {
  // const bookData = req.body;
  const { stations, ratename, validity, active, starttime, closetime } = req.body

  db.query('INSERT INTO ratetype(stations,ratename,validity,active,starttime,closetime)  values(?,?,?,?,?,?)', [stations, ratename, validity, active, starttime, closetime], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }

    return res.status(200).json({ message: "Data inserted successfully" });
  });
});
// delete Ratetype data
router.delete('/ratetype/:driverid', (req, res) => {
  const driverid = req.params.driverid;
  db.query('DELETE FROM ratetype WHERE driverid = ?', driverid, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete data from MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    return res.status(200).json({ message: "Data deleted successfully" });
  });
});
// update Ratetype details
// router.put('/ratetype/:driverid', (req, res) => {
//   const driverid = req.params.driverid;
//   const updatedCustomerData = req.body;
//   db.query('UPDATE ratetype SET ? WHERE driverid = ?', [updatedCustomerData, driverid], (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: "Failed to update data in MySQL" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Customer not found" });
//     }
//     return res.status(200).json({ message: "Data updated successfully" });
//   });
// });

router.put('/ratetype/:driverid', (req, res) => {
  const driverid = req.params.driverid;
  // const updatedCustomerData = req.body;
  const { stations, ratename, validity, active, starttime, closetime } = req.body

  db.query('UPDATE ratetype SET stations=?,ratename=?,validity=?,active=?,starttime=?,closetime=? WHERE driverid = ?', [stations, ratename, validity, active, starttime, closetime, driverid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update data in MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    return res.status(200).json({ message: "Data updated successfully" });
  });
});
// collect data for Ratetype table
router.get('/ratetype', (req, res) => {
  db.query('SELECT * FROM ratetype', (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});
// End Ratetype database

module.exports = router;
