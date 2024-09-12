const express = require('express');
const router = express.Router();
const db = require('../../../db');
const moment = require('moment');

// Add Customer Master database
router.post('/customers', (req, res) => {
  const customerData = req.body;
  // const customerData = req.body;
  console.log("customerData", customerData)

  // Convert billingGroup array to a comma-separated string
  if (customerData.billingGroup && Array.isArray(customerData.billingGroup)) {
    customerData.billingGroup = customerData.billingGroup.join(', ');
  }


  db.query("select * from customers where LOWER(customer) = LOWER(?)", [customerData.customer], (err, result) => {
    if (err) {
      console.log("err", err);
      return res.status(404).json({ message: "there is issu checking customer " })
    }

    console.log("result", result)

    if (result.length > 0) {
      return res.status(200).json({ message: "Customer Name Exist..", success: false })
    } else {
      db.query('INSERT INTO customers SET ?', customerData, (err, result) => {
        if (err) {
          console.log(err)
          return res.status(500).json({ error: 'Failed to insert data into MySQL' });
        }
        return res.status(201).json({ message: 'Data inserted successfully', success: true });
      });
    }

  })



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

router.get('/customers', (req, res) => {
  db.query('SELECT * FROM customers', (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});

// Update Customer Master details
router.put('/customers/:customerId', (req, res) => {
  const customerId = req.params.customerId;
  const updatedCustomerData = req.body;
  console.log(updatedCustomerData, "dddd")
  if (updatedCustomerData.billingGroup && Array.isArray(updatedCustomerData.billingGroup)) {
    updatedCustomerData.billingGroup = updatedCustomerData.billingGroup.join(', ');
  }
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

router.get('/searchCustomer', (req, res) => {
  const { searchText, fromDate, toDate } = req.query; // Extract searchText, fromDate, and toDate from the query
  let query = 'SELECT * FROM customers WHERE 1=1'; // Base query
  let params = [];

  // Filter by search text
  if (searchText) {
    const columnsToSearch = [
      'customerId',
      'name',
      'customer',
      'customerType',
      'date', // The date column
      'address1',
      'rateType',
      'opBalance',
      'underGroup',
      'selectOption',
      'entity',
      'state',
      'servicestation',
      'gstnumber',
      'SalesPerson',
      'SalesPercentage'
    ];

    // Construct the SQL 'LIKE' conditions for the searchText
    const likeConditions = columnsToSearch.map(column => `${column} LIKE ?`).join(' OR ');
    query += ` AND (${likeConditions})`;
    params = columnsToSearch.map(() => `${searchText}%`);
  }

  // Filter by date range if fromDate and toDate are provided
  if (fromDate && toDate) {
    const formattedFromDate = moment(fromDate).format('YYYY-MM-DD');
    const formattedToDate = moment(toDate).format('YYYY-MM-DD');
    query += ' AND date >= DATE_ADD(?, INTERVAL 0 DAY) AND date <= DATE_ADD(?, INTERVAL 1 DAY)';
    params.push(formattedFromDate, formattedToDate);
  }

  // Execute the query using your database connection
  db.query(query, params, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error retrieving data');
    }

    // Send the results back to the client
    res.json(results);
  });
});



router.get('/customeraddress/:customername', (req, res) => {
  const customername = req.params.customername;
  db.query('select address1,gstnumber from customers where customer = ?', [customername], (err, result) => {
    if (err) {
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
router.get('/customersgroup', (req, res) => {
  const query = `
     SELECT
      c.*,
      GROUP_CONCAT(co.orderedby) AS orderedby,
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

// get all customer details
router.get('/allCustomers', (req, res) => {
  db.query("SELECT customer FROM customers", (error, result) => {
    if (error) {
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }
    return res.status(200).json(result);
  })
})

router.get('/gstdetails/:customer', (req, res) => {

  const customer = req.params.customer;
  const sqlquery = "select gstTax from customers where customer=?";
  db.query(sqlquery, [customer], (err, result) => {
    if (err) {
      console.log(err, 'error');
    }
    return res.status(200).json(result);

  })
})

router.get('/getcustomer-address/:customer', (req, res) => {
  const customer = req.params.customer;
  const sqlquery = "select address1 from customers where customer=?";
  db.query(sqlquery, [customer], (err, result) => {
    if (err) {
      console.log(err, 'error');
    }
    return res.status(200).json(result);

  })
})


router.post('/customerorderdbydata', (req, res) => {
  const customerdata = req.body;

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

router.get('/getcustomerorderdata/:customerdata', (req, res) => {

  const customer = req.params.customerdata
  db.query("select * from  customerOrderdata where customer= ?", [customer], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }
    return res.status(200).json(result)
  })

})
// router.put('/updatecustomerorderdata', (req, res) => {

//   const customerdata = req.body;
//   if (!Array.isArray(customerdata)) {
//     return res.status(400).json({ error: "Request body must be an array" });
//   }

//   // Insert each object in the array as a separate row in the database
//   const insertQueries = customerdata.map(bookData => {

//     return new Promise((resolve, reject) => {
//       db.query('Update customerOrderdata SET customer=?,orderedby=?,orderByEmail=?,orderByMobileNo=? where id=?'
//         , [bookData.customer, bookData.orderedby, bookData.orderByEmail, bookData.orderByMobileNo, bookData.id], (err, result) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(result);
//           }
//         });
//     });
//   });

//   // Execute all insert queries concurrently
//   Promise.all(insertQueries)
//     .then(() => {
//       return res.status(200).json({ message: "Data inserted successfully" });

//     })
//     .catch(err => {
//       console.log(err);
//       return res.status(500).json({ error: "Failed to insert data into MySQL" });
//     });

// })

router.put('/updatecustomerorderdata', (req, res) => {
  const customerdata = req.body;

  if (!Array.isArray(customerdata)) {
    return res.status(400).json({ error: "Request body must be an array" });
  }

  // Prepare queries based on whether 'id' is present
  const queries = customerdata.map(data => {
    return new Promise((resolve, reject) => {
      if (data.id) {
        // Update existing record
        db.query(
          'UPDATE customerOrderdata SET customer=?, orderedby=?, orderByEmail=?, orderByMobileNo=? WHERE id=?',
          [data.customer, data.orderedby, data.orderByEmail, data.orderByMobileNo, data.id],
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      } else {
        // Insert new record
        db.query(
          'INSERT INTO customerOrderdata (customer, orderedby, orderByEmail, orderByMobileNo) VALUES (?, ?, ?, ?)',
          [data.customer, data.orderedby, data.orderByEmail, data.orderByMobileNo],
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      }
    });
  });


  // Execute all queries concurrently
  Promise.all(queries)
    .then(() => {
      return res.status(200).json({ message: "Data processed successfully" });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: "Failed to process data into MySQL" });
    });
});

router.delete("/deletecustomerorderdatasdata/:id", (req, res) => {
  const deleteid = req.params.id;

  db.query("delete from customerOrderdata where id=?", [deleteid], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }

    return res.status(200).json("data delete succesfuully")
  })

})

router.get('/ratemanagmentCustomerdata', (req, res) => {
  db.query(`SELECT ratename from ratetype where ratetype="Customer"`, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    console.log(results, "hhh")
    return res.status(200).json(results);
  });

})


router.delete("/deletecustomerorderdata/:customer", (req, res) => {

  const customer = req.params.customer;
  db.query("delete from customerOrderdata where customer=?", [customer], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete data from MySQL' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    return res.status(200).json({ message: 'Data deleted successfully' });
  })
})

router.get("/Monthilywisedatatrip", (req, res) => {
  const { customer, fromDate, toDate } = req.query;
  console.log(customer, fromDate, toDate)
  const formattedFromDate = moment(fromDate).format('YYYY-MM-DD');
  const formattedToDate = moment(toDate).format('YYYY-MM-DD');
  console.log(formattedFromDate, "f", formattedToDate)

  db.query('select * from customers where customerType=?', [customer], (err, results) => {
    if (err) {
      return res.status(400).json(err)
    }
    console.log(results)
    const datas = results?.map((data) => data.customer)
    console.log(datas, "dttd")


    //  db.query('select customername,totalcalcAmount  from tripsheet WHERE tripsheetdate >= DATE_ADD(?, INTERVAL 0 DAY) AND tripsheetdate <= DATE_ADD(?, INTERVAL 1 DAY) AND customer in (?)')
    //    const sql=`SELECT 
    //     customer, 
    //     SUM(totalcalcAmount) AS totalAmount
    // FROM 
    //     tripsheet
    // WHERE 
    //     tripsheetdate >= DATE_ADD(?, INTERVAL 0 DAY) 
    //     AND tripsheetdate <= DATE_ADD(?, INTERVAL 1 DAY)
    //     AND customer IN (?)
    // GROUP BY 
    //     customer `;
    const sql = `
  SELECT 
    customer,orderbyemail,billingno,
    SUM(totalcalcAmount) AS totalAmount
  FROM 
    tripsheet
  WHERE 
   tripsheetdate >= DATE_ADD(?, INTERVAL 0 DAY) 
   AND tripsheetdate <= DATE_ADD(?, INTERVAL 1 DAY)
    AND customer IN (?)
  GROUP BY 
    customer
`;

    db.query(sql, [fromDate, toDate, datas], (err, results1) => {
      if (err) {
        console.log(err)
      }

      const combinedResults = results1?.map(trip => {
        const customerDetail = results?.find(detail => detail.customer === trip.customer);
        return {
          ...trip,
          customerId: customerDetail ? customerDetail.customerId : null,
          customertype: customerDetail ? customerDetail.customerType : null,
          address: customerDetail ? customerDetail.address1 : null,
        };
      });
      //   const data= results1.forEach(row => {

      return res.status(200).json(combinedResults)
    })

    // return res.status(200).json(results)

  })


})


router.get('/montlywisedataall', (req, res) => {
  console.log("enter")
  db.query("select c.customerId,c.customerType as customertype,c.address1 as address,t.orderbyemail,t.billingno,sum(totalcalcAmount) as totalAmount,t.customer from customers c INNER JOIN  tripsheet t on c.customer = t.customer group by t.customer", (err, result) => {
    if (err) {
      console.log(err)
    }

    return res.status(200).json(result)
  })
})

router.get('/getCustomer-hybrid/:customer', (req, res) => {
  const customer = req.params.customer;
  console.log("customer", customer)
  db.query("select hybrid from customers where name=?", [customer], (err, result) => {
    if (err) {
      console.log("Error", err)
      return res.status(500).json({ message: "somthing went wrong..", error: true })
    }
    console.log("result", result)
    return res.status(200).json(result[0])
  })
})

router.get("/getuniqueCustomerdata/:customer", (req, res) => {
  const customer = req.params.customer;
  console.log(customer, "params")
  db.query("select customer from customers where customer=?", [customer], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete data from MySQL' });
    }
    console.log(results.length)
    return res.status(200).json(results);

  })
})


module.exports = router;