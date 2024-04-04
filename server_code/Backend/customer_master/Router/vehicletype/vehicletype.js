const express = require('express');
const router = express.Router();
const db = require('../../../db');

router.get('/vehicletype_name', (req, res) => {
  const { vehicletypename}= req.query; // Access the parameter using req.params
  // Modify the query to use the LIKE operator for partial matching
  // console.log(vehicletypename,"namevecile")
  db.query('SELECT * FROM vehicle_type WHERE vehiclename LIKE ?', [`${vehicletypename}%`], (err, result) => {
      if (err) {
          return res.status(500).json({ error: 'Failed to retrieve customer details from MySQL' });
      }
      if (result.length === 0) {
          return res.status(404).json({ error: 'Customer not found' });
      }
      const vehicletypedetails = result; // Assuming there is only one matching customer
      return res.status(200).json(vehicletypedetails );
  });
});
  

router.post('/vehicletypeinsert',async (req, res) => {
  // const {vehiclename,Groups,vehicletype,Active, Luxzuryvehicle,Segment}=req.body 
  const update=req.body// Access the parameter using req.params
  // console.log(vehiclename,Groups,vehicletype,Active, Luxzuryvehicle,Segment,"inserrtnamevecile")
  // db.query('insert into vehicle_type (vehiclename,Groups,vehicletype,Active, Luxzuryvehicle,Segment) values(?,?,?,?,?,?)', [vehiclename,Groups,vehicletype,Active, Luxzuryvehicle,Segment], (err, result) => {

  // console.log(update,"upppp")
   db.query('insert into vehicle_type  SET ?', update, (err, result) => {
      if (err) {
          return res.status(500).json({ error: 'Failed to retrieve customer details from MySQL' });
      }
      
       console.log(result)
      return res.status(200).json(result);
  });
});

router.put('/vechupdate/:vechicleid',(req,res)=>{
  // const {vehiclename,Groups,vehicletype,Active, Luxzuryvehicle,Segment}=req.body 
  const vehicleid=req.params.vechicleid

  const {vehiclename,Groups,vehicletype,Active, Luxzuryvehicle,Segment}=req.body
  db.query('update  vehicle_type set vehiclename=?,Groups=?,vehicletype=?,Active=?, Luxzuryvehicle=?,Segment=?  where vehicleid=?', [vehiclename,Groups,vehicletype,Active, Luxzuryvehicle,Segment,vehicleid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update data in MySQL" });
  }
 
  return res.status(200).json({ message: "Data updated successfully" });
});


});

router.delete("/vechicletype/:vehicleid",(req,res)=>{
  const vechicleid=req.params.vehicleid
  // console.log(vechicleid,"datatata delete")

  db.query('delete from  vehicle_type where vehicleid=?',[vechicleid],(err,result)=>{
    if(err){
      return res.status(500).json({ error: "Failed to update data in MySQL" });
    }
    console.log(result,"vehicletypr")
    return res.status(200).json({ message: "Data delete successfully" });
  })
})



  module.exports = router;