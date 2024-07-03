const express = require('express');
const router = express.Router();
const db = require('../../../db');

// Add Customer Master database
router.post('/customers', (req, res) => {
  const customerData = req.body;
  console.log(customerData,"kk")
  // const customerData = req.body;

  // Convert billingGroup array to a comma-separated string
  if (customerData.billingGroup && Array.isArray(customerData.billingGroup)) {
    customerData.billingGroup = customerData.billingGroup.join(', ');
  }

  console.log(customerData, "kk");
  db.query('INSERT INTO customers SET ?', customerData, (err, result) => {
    if (err) {
      console.log(err)
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
  if (updatedCustomerData.billingGroup && Array.isArray(updatedCustomerData.billingGroup)) {
    updatedCustomerData.billingGroup = updatedCustomerData.billingGroup.join(', ');
  }
  console.log(updatedCustomerData,"data",customerId)
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
// router.get('/customers', (req, res) => {
//   db.query('SELECT * FROM customers', (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
//     }
//      return res.status(200).json(results);
//   });
// });
router.get('/customers', (req, res) => {
  const query = `
     SELECT
      c.*,
      GROUP_CONCAT(co.orderedBy) AS orderedBy,
      GROUP_CONCAT(co.orderByEmail) AS orderByEmail,
      GROUP_CONCAT(co.orderByMobileNo) AS orderByMobileNo
    FROM
      customers c
    INNER JOIN
      customerOrderdata co ON c.customer = co.customer
    GROUP BY
      c.customer;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }
    // console.log(results)
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

router.post('/customerorderdbydata',(req,res)=>{
  const customerdata= req.body; 
  console.log(customerdata)// Assuming req.body is an array of objects

    // Check if req.body is an array
    if (!Array.isArray(customerdata)) {
        return res.status(400).json({ error: "Request body must be an array" });
    }

    // Insert each object in the array as a separate row in the database
    const insertQueries = customerdata.map(bookData => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO  customerOrderdata SET ?', bookData, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    });

    // Execute all insert queries concurrently
    Promise.all(insertQueries)
        .then(() => {
            return res.status(200).json({ message: "Data inserted successfully" });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ error: "Failed to insert data into MySQL" });
        });
})

router.get('/getcustomerorderdata/:customerdata',(req,res)=>{

  const customer=req.params.customerdata
  db.query("select * from  customerOrderdata where customer= ?",[customer],(err,result)=>{
    if(err){
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }
    return res.status(200).json(result)
  })

})
router.put('/updatecustomerorderdata',(req,res)=>{

  const customerdata= req.body; 
  console.log(customerdata)
  if (!Array.isArray(customerdata)) {
    return res.status(400).json({ error: "Request body must be an array" });
}

// Insert each object in the array as a separate row in the database
const insertQueries = customerdata.map(bookData => {

    return new Promise((resolve, reject) => {
        db.query('Update customerOrderdata SET customer=?,orderedBy=?,orderByEmail=?,orderByMobileNo=? where id=?'
          ,[bookData.customer,bookData.orderedBy,bookData.orderByEmail,bookData.orderByMobileNo,bookData.id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
});

// Execute all insert queries concurrently
Promise.all(insertQueries)
    .then(() => {
        return res.status(200).json({ message: "Data inserted successfully" });
        
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({ error: "Failed to insert data into MySQL" });
    });

})

router.delete("/deletecustomerorderdata/:customer",(req,res)=>{

  const customer=req.params.customer;
  db.query("delete from customerOrderdata where customer=?",[customer],(err,result)=>{
    if (err) {
      return res.status(500).json({ error: 'Failed to delete data from MySQL' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    return res.status(200).json({ message: 'Data deleted successfully' });
  })
})


module.exports = router;