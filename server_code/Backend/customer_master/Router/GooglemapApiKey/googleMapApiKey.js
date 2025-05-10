const express = require('express');
const router = express.Router();
const db = require('../../../db');
const cron = require('node-cron');

// insert new api key
router.post('/newApiKeyGoogleMap', (req, res) => {
    const { ApiKey,status,ApiKeyOrder} = req.body;
   console.log(ApiKey, "apikeyvaluessss");
   
   const sqlQuery = 'INSERT INTO Googlemap_Api_Keys (`ApiKey`,`status`,`ApiKeyOrder`) VALUES (?,?,?)';

  
  
    db.query(sqlQuery, [ApiKey,status,ApiKeyOrder], (err, result) => {
      if (err) {
        console.error("Error inserting API key:", err);
        return res.status(500).json({ message: "Failed to insert API key" });
      }
      console.log(result,"googlemaooo")
      res.json({ message: "API key inserted successfully", result });
    });
  });
  
//   get all apikey 
router.get('/getAllApiKeyData',(req,res)=>{
    const sqlQuery = `SELECT * FROM Googlemap_Api_Keys`;
    db.query(sqlQuery,(error,result)=>{
        if(error){
            console.log(error,"error");
        }
        res.status(200).json(result);
    })
})

// updated status for selected api
router.post('/selectedApiKeyUpdate', (req, res) => {
  const { selected_date,ApiKey } = req.body;

  const allStatusUpdateQuery = `UPDATE Googlemap_Api_Keys SET status = NULL , selected_date = NULL `;
  const sqlUpdateQuery = `UPDATE Googlemap_Api_Keys SET status = 'selected',selected_date = ? WHERE ApiKey = ?`;

  db.query(allStatusUpdateQuery, (err, result) => {
    if (err) {
      console.error("Error resetting API Key statuses:", err);
      return res.status(500).json({ error: 'Failed to reset API key statuses' });
    }

    db.query(sqlUpdateQuery, [selected_date,ApiKey], (err, result) => {
      if (err) {
        console.error("Error updating selected API Key status:", err);
        return res.status(500).json({ error: 'Failed to update selected API key status' });
      }

      res.json({ message: 'API key status updated successfully', result });
    });
  });
});

// selected api query for google map

router.get('/selectedApiData',(req,res)=>{
  const sqlSelectedQuery = `SELECT * FROM Googlemap_Api_Keys WHERE status = "selected"`;
  db.query(sqlSelectedQuery,(error,result)=>{
    if(error){
      console.log(error,"error");
    }
    res.status(200).json(result);
  })
})



cron.schedule('43 19 * * *', () => {
  console.log('Running API key rotation cron job...');
  handleApiKeyRotation()
});



const handleApiKeyRotation = async () => {
  const getSelectedKeyQuery = `SELECT * FROM Googlemap_Api_Keys WHERE status = 'selected' LIMIT 1`;

  db.query(getSelectedKeyQuery, (err, results) => {
    if (err) {
      console.error("Error fetching selected API key:", err);
      return;
    }

    if (results.length === 0) {
      console.log("No selected API key found.");
      return;
    }

    const selectedKey = results[0];
    const selectedDate = new Date(selectedKey.selected_date);
    const now = new Date();
    const diffTime = now - selectedDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays >= 3) {
      // Time to rotate — find the next available API key (status IS NULL)
      const getNextKeyQuery = `SELECT * FROM Googlemap_Api_Keys WHERE status IS NULL ORDER BY id ASC LIMIT 1`;

      db.query(getNextKeyQuery, (err, nextResults) => {
        if (err) {
          console.error("Error fetching next API key:", err);
          return;
        }

        if (nextResults.length === 0) {
          console.log("No available API key to rotate to.");
          return;
        }

        const nextKey = nextResults[0];
        const today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'

        // Update next key to 'selected' and set its selected_date
        const updateNextKeyQuery = `UPDATE Googlemap_Api_Keys SET status = 'selected', selected_date = ? WHERE id = ?`;
        db.query(updateNextKeyQuery, [today, nextKey.id], (err, updateResult) => {
          if (err) {
            console.error("Error updating next API key:", err);
            return;
          }

          // Reset the old selected key status and selected_date
          const resetOldKeyQuery = `UPDATE Googlemap_Api_Keys SET status = NULL, selected_date = NULL WHERE id = ?`;
          db.query(resetOldKeyQuery, [selectedKey.id], (err, resetResult) => {
            if (err) {
              console.error("Error resetting old API key:", err);
              return;
            }

            console.log(`Rotated API key. New selected key: ${nextKey.ApiKey}`);
          });
        });
      });
    } else {
      console.log("Selected API key is still within valid period.");
    }
  });
};




  

module.exports = router;