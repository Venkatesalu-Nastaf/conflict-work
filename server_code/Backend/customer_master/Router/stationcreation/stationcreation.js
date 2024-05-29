const express = require('express');
const router = express.Router();
const db = require('../../../db');

router.post('/stationcreation', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO stationcreation SET ?', bookData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});
// delete Station Creation data
router.delete('/stationcreation/:stationid', (req, res) => {
  const stationid = req.params.stationid;
  db.query('DELETE FROM stationcreation WHERE stationid = ?', stationid, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete data from MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    return res.status(200).json({ message: "Data deleted successfully" });
  });
});
// update  Station Creation details
router.put('/stationcreation/:stationid', (req, res) => {
  const stationid = req.params.stationid;
  const updatedCustomerData = req.body;
  db.query('UPDATE stationcreation SET ? WHERE stationid = ?', [updatedCustomerData, stationid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update data in MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    return res.status(200).json({ message: "Data updated successfully" });
  });
});
// collect data for  Station Creation table
router.get('/stationcreation', (req, res) => {
  db.query('SELECT * FROM stationcreation', (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});


// Fetch all station names
router.get('/getStation-name', (req, res) => {
  const { username } = req.query;

  db.query("SELECT Stationname FROM usercreation WHERE username=?", [username], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch data" });
    }

    if (result && result.length > 0) {

      const station = result[0]?.Stationname;

      if (station?.toLowerCase() === "all") {

        db.query('SELECT Stationname FROM stationcreation', (err, results) => {
          if (err) {
            return res.status(500).json({ error: "Failed to fetch data" });
          }

          return res.status(200).json(results);
        });
      }
      else {
        return res.status(200).json(result);
      }
    }
    else {
      return res.status(200).json([]);
    }
  });
});







module.exports = router;