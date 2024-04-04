const express = require('express');
const router = express.Router();
const db = require('../../../db');

router.get('/vehicletype_name', (req, res) => {
  const { vehicletypename}= req.query; // Access the parameter using req.params
  // Modify the query to use the LIKE operator for partial matching
  console.log(vehicletypename,"namevecile")
  db.query('SELECT * FROM vehicle_type WHERE vehiclename LIKE ?', [`%${vehicletypename}%`], (err, result) => {
      if (err) {
          return res.status(500).json({ error: 'Failed to retrieve customer details from MySQL' });
      }
      if (result.length === 0) {
          return res.status(404).json({ error: 'Customer not found' });
      }
      const vehicletypedetails = result; // Assuming there is only one matching customer
      console.log(vehicletypedetails,"type")
      return res.status(200).json(vehicletypedetails );
  });
});
  

router.post('/vehicletypeinsert', (req, res) => {
  const {vehiclename,Groups,vehicletype,Active, Luxzuryvehicle,Segment}=req.body // Access the parameter using req.params
  // Modify the query to use the LIKE operator for partial matching
  console.log(vehiclename,Groups,vehicletype,Active, Luxzuryvehicle,Segment,"inserrtnamevecile")
  db.query('insert into vehicle_type (vehiclename,Groups,vehicletype,Active, Luxzuryvehicle,Segment) values(?,?,?,?,?,?)', [vehiclename,Groups,vehicletype,Active, Luxzuryvehicle,Segment], (err, result) => {
      if (err) {
          return res.status(500).json({ error: 'Failed to retrieve customer details from MySQL' });
      }
      
       console.log(result)
      return res.status(200).json(result);
  });
});

router.put('/vechicletypeupdate',(req,res)=>{
  const {vehicleid,vehiclename,Groups,vehicletype,Active, Luxzuryvehicle,Segment}=req.body // Access the parameter using req.params
  db.query('update  vehicle_type set vehiclename=?,Groups=?,vehicletype=?,Active=?, Luxzuryvehicle=?,Segment=?  where vehicleid=?', [vehiclename,Groups,vehicletype,Active, Luxzuryvehicle,Segment,vehicleid], (err, result) => {
    if (err) {
        return res.status(500).json({ error: 'Failed to retrieve customer details from MySQL' });
    }
    
     console.log(result)
    return res.status(200).json(result);
});
});


  module.exports = router;