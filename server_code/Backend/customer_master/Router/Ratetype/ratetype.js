const express = require('express');
const router = express.Router();
const db = require('../../../db');
const decryption = require('../dataDecrypt')

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
  const { stations,ratetype, ratename,active, starttime, closetime } = req.body

  // console.log(req.body, "checking");
  
  db.query('INSERT INTO ratetype(ratetype,ratename,active,starttime,closetime)  values(?,?,?,?,?)', [ratetype,ratename, active, starttime, closetime], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    //  console.log(result, "checking the post values");
     
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});
// delete Ratetype data
router.delete('/ratetype/:driverid', (req, res) => {
  const driverid = req.params.driverid;
  // console.log(driverid,"delete values");
  
  db.query('DELETE FROM ratetype WHERE driverid = ?', driverid, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete data from MySQL" });
    }
    // console.log(result,"checking the delete value ");
    
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
  // console.log(driverid,"checking the driverid");
  
  const {ratetype, ratename,active, starttime, closetime } = req.body
// console.log(req.body,"checking the all values ");

  db.query('UPDATE ratetype SET ratetype=?,ratename=?,active=?,starttime=?,closetime=? WHERE driverid = ?', [ratetype,ratename,active, starttime, closetime, driverid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update data in MySQL" });
    }
    // console.log(result,"checking the result");
    
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
//searchbar in Rate Type
router.get('/searchRatetype', (req, res) => {
  const { searchText } = req.query; // Get the searchText from the query params
  // console.log(searchText, "search")
  // console.log(searchText,"search");
  const decryptSearch = decryption(searchText)
  // console.log(decryptSearch,"decryption");
  
  let query = 'SELECT * FROM ratetype WHERE 1=1'; // Ensure you query from the correct table
  let params = [];

  if (decryptSearch) {
    const columnsToSearch = [
      'driverid',
      'ratetype',
      'ratename',
      'active',
      'starttime',
      'closetime'
    ];
    // console.log(columnsToSearch, "columns")
    const likeConditions = columnsToSearch.map(column => `${column} LIKE ?`).join(' OR ');
    query += ` AND (${likeConditions})`;

    // Add searchText to params for each column
    params = columnsToSearch.map(() => `${decryptSearch}%`);
  }
// console.log(query,params, "fhjf");

  // Execute the query
  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Database query error:", err); // Log the error for debugging
      return res.status(500).json({ error: 'Error retrieving data' });
    }

    // console.log("Search results:", results); // Log results to verify
    res.json(results); // Send back the results to the client
  });
});



router.get('/ratetypevendor/:ratetype', (req, res) => {
  const ratetype=req.params.ratetype;
  const decryptRatetype = decryption(ratetype)
  db.query('SELECT ratename FROM ratetype where ratetype=?',[decryptRatetype],(err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});
router.get('/getcustomeruniqueratetype/:ratetype/:ratename',(req,res)=>{
  const ratetype=req.params.ratetype;
  const ratename=req.params.ratename;
  // console.log(ratetype,ratename,"jjjj")
  const decryptRatetype = decryption(ratetype);
  const decryptName = decryption(ratename)
  // console.log(decryptName,"name");
  

  db.query("select ratename from ratetype where ratetype=? and ratename=?",[decryptRatetype,decryptName],(err,results)=>{
    if (err) {
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    // console.log(results)
    return res.status(200).json(results);
  })
})
// End Ratetype database

module.exports = router;
