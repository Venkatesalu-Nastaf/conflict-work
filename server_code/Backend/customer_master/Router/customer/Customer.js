const express = require('express');
const router = express.Router();
const db = require('../../../db');

// Add Customer Master database
router.post('/customers', (req, res) => {
  const customerData = req.body;
  db.query('INSERT INTO customers SET ?', customerData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to insert data into MySQL' });
    }
    return res.status(200).json({ message: 'Data inserted successfully' });
  });
});

// Delete Customer Master data
router.delete('/customers/:customerId', (req, res) => {
  const customerId = req.params.customerId;
  db.query('DELETE FROM customers WHERE customerId = ?', customerId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete data from MySQL' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    return res.status(200).json({ message: 'Data deleted successfully' });
  });
});

// Update Customer Master details
router.put('/customers/:customerId', (req, res) => {
  const customerId = req.params.customerId;
  const updatedCustomerData = req.body;
  db.query('UPDATE customers SET ? WHERE customerId = ?', [updatedCustomerData, customerId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update data in MySQL' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    return res.status(200).json({ message: 'Data updated successfully' });
  });
});

router.get('/customeraddress/:customername',(req,res)=>{
  const customername = req.params.customername;
  db.query('select address1,gstnumber from customers where customer = ?',[customername],(err,result)=>{
    if(err){
      return res.status(500).json({ error: 'Failed to get data in MySQL' });
    }
     return res.status(200).json(result)
     
  })
})

// Collect data for Customer Master table
router.get('/customers', (req, res) => {
  db.query('SELECT * FROM customers', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }
    return res.status(200).json(results);
  });
});


router.get('/gstdetails/:customer',(req,res)=>{
  const customer = req.params.customer;
  const sqlquery = "select gstTax from customers where customer=?";
  db.query(sqlquery,[customer],(err,result)=>{
    if(err){
      console.log(err,'error');
    }
    return res.status(200).json(result);

  })
})


module.exports = router;