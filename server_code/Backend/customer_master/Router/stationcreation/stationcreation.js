const express = require('express');
const router = express.Router();
const db = require('../../../db');

// router.post('/stationcreation', (req, res) => {
//   const bookData = req.body;
//   db.query('INSERT INTO stationcreation SET ?', bookData, (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: "Failed to insert data into MySQL" });
//     }
//     return res.status(200).json({ message: "Data inserted successfully" });
//     console.log(result,'Station creation datas')
//   });

// });

// For creating the new station
// router.post('/stationcreation', (req, res) => {
//   const bookData = req.body;
//   db.query('INSERT INTO stationcreation SET ?', bookData, (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: "Failed to insert data into MySQL" });
//     }

//     console.log(result, 'Station creation datas'); // Log the result here

//     return res.status(200).json({ message: "Data inserted successfully" });
//   });
// });
router.post('/stationcreation', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO stationcreation SET ?', bookData, (err, result) => {
    if (err) {
      console.error("Database insertion error:", err); // Log full error details
      return res.status(500).json({ error: "Failed to insert data into MySQL", details: err.message });
    }

    console.log(result, 'Station creation data inserted successfully');
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
  console.log(stationid,'stationid');
  
  const updatedCustomerData = req.body;
  console.log(stationid,'stationid',updatedCustomerData);

  db.query('UPDATE stationcreation SET ? WHERE stationid = ?', [updatedCustomerData, stationid], (err, result) => {
    if (err) {
      console.log(err,'error from station')
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
      const stationArr = station.split(',')

      const data = stationArr.map(el => ({ Stationname: el }))

      if (station?.toLowerCase() === "all" || stationArr.includes("ALL")) {

        db.query('SELECT Stationname FROM stationcreation', (err, results) => {
          if (err) {
            return res.status(500).json({ error: "Failed to fetch data" });
          }
          // results.push({ Stationname: 'All' });

          console.log("results", results)
          return res.status(200).json(results);
        });
      }
      else {
        console.log("data", data)
        // data.push({ Stationname: 'All' });
        return res.status(200).json(data);
      }
    }
    else {
      return res.status(200).json([]);
    }
  });
});

router.get("/getcreduniquestationname/:stationname", (req, res) => {
  // const stationname = req.params.stationname;
  const Stationname = req.params;
  db.query("select Stationname  from stationcreation where Stationname=?", [Stationname], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    console.log(results)
    return res.status(200).json(results);
  })
})

// get station details 
router.get("/getAllStationDetails/:stateName", (req, res) => {
  const { stateName } = req.params;
  console.log(stateName, 'AllStations');

  db.query("SELECT * FROM stationcreation WHERE state = ?", [stateName], (error, result) => {
    if (error) {
      console.log(error, 'error'); // Log the error for debugging
      return res.status(500).json({ message: "Database query error", error });
    }

    res.status(200).json(result);
  });
});

router.get("/Statecreation", (req, res) => {
  


  db.query('SELECT DISTINCT state FROM stationcreation WHERE state is not null and  gstno IS NOT NULL AND gstno != ""',(error, result) => {
    if (error) {
      console.log(error, 'error'); // Log the error for debugging
      return res.status(500).json({ message: "Database query error", error });
    }

    res.status(200).json(result);
  });
});



module.exports = router;