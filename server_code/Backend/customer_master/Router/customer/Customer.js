const express = require('express');
const router = express.Router();
const db = require('../../../db');
const moment = require('moment');
const decryption = require('../dataDecrypt');

// Add Customer Master database
router.post('/customers', (req, res) => {
  const customerData = req.body;
  // const customerData = req.body;
  // console.log("customerData", customerData)
  // Convert billingGroup array to a comma-separated string
  // if (customerData.billingGroup && Array.isArray(customerData.billingGroup)) {
  //   customerData.billingGroup = customerData.billingGroup.join(', ');
  // }
  db.query("select * from customers where LOWER(customer) = LOWER(?)", [customerData.customer], (err, result) => {
    if (err) {
      // console.log("err", err);
      return res.status(404).json({ message: "there is issu checking customer " })
    }
    // console.log("result", result)
    if (result.length > 0) {
      return res.status(200).json({ message: "Customer Name Exist..", success: false })
    } else {
      db.query('INSERT INTO customers SET ?', customerData, (err, result) => {
        if (err) {
          // console.log(err)
          return res.status(500).json({ error: 'Failed to insert data into MySQL' });
        }
        // console.log(result,"checking add");

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
      // console.log(err, "oo")
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

  // if (updatedCustomerData.billingGroup && Array.isArray(updatedCustomerData.billingGroup)) {
  //   updatedCustomerData.billingGroup = updatedCustomerData.billingGroup.join(', ');
  // }
  db.query('UPDATE customers SET ? WHERE customerId = ?', [updatedCustomerData, customerId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update data in MySQL' });
    }
    // console.log(result,"updated resultt");

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    return res.status(200).json({ message: 'Data updated successfully' });
  });
});

router.get('/searchCustomer', (req, res) => {
  const { searchText, fromDate, toDate } = req.query;
  // Extract searchText, fromDate, and toDate from the query
  const decryptSearch = decryption(searchText);
  // console.log(decryptSearch,"che king");


  let query = 'SELECT * FROM customers WHERE 1=1'; // Base query
  let params = [];

  // Filter by search text
  if (decryptSearch) {
    const columnsToSearch = [
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
    params = columnsToSearch.map(() => `${decryptSearch}%`);
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
      // console.error(err);
      return res.status(500).send('Error retrieving data');
    }

    // Send the results back to the client
    res.json(results);
  });
});

router.get('/customeraddress/:customername', (req, res) => {
  const customername = req.params.customername;
  db.query('select address1,gstnumber,state,billingGroup,customer from customers where customer = ?', [customername], (err, result) => {
    if (err) {
      // console.log(err, 'cust eror');

      return res.status(500).json({ error: 'Failed to get data in MySQL' });
    }
    // console.log(result, 'customer result');


    return res.status(200).json(result)
  })
})

router.get('/customersgroup', (req, res) => {
  // const query = `
  //    SELECT
  //     c.*,
  //     GROUP_CONCAT(co.orderedby) AS orderedby,
  //     GROUP_CONCAT(co.orderByEmail) AS orderByEmail,
  //     GROUP_CONCAT(co.orderByMobileNo) AS orderByMobileNo
  //   FROM
  //     customers c
  //   INNER JOIN
  //     customerOrderdata co ON c.customer = co.customer
  //   GROUP BY
  //     c.customer;
  // `;
  //   const query = `
  //  SELECT
  //   c.*,
  //   GROUP_CONCAT(co.orderedby) AS orderedby,
  //   GROUP_CONCAT(co.orderByEmail) AS orderByEmail,
  //   GROUP_CONCAT(co.orderByMobileNo) AS orderByMobileNo
  // FROM
  //   customers c
  // INNER JOIN
  //   customerOrderdata co ON c.customer = co.customer
  // GROUP BY
  //   c.customerId, c.customer
  // `;

  const query = `
SELECT
 c.*,
 GROUP_CONCAT(co.orderedby) AS orderedby,
 GROUP_CONCAT(co.orderByEmail) AS orderByEmail,
 GROUP_CONCAT(co.orderByMobileNo) AS orderByMobileNo
FROM
 customers c
LEFT JOIN
 customerOrderdata co ON c.customer = co.customer
GROUP BY
 c.customerId, c.customer
`;

  db.query(query, (err, results) => {
    if (err) {
      // console.log(err)
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }
    // console.log(results, "kk")
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

// router.get('/gstdetails/:customer', (req, res) => {

//   const customer = req.params.customer;
//   const sqlquery = "select gstTax from customers where customer=?";
//   db.query(sqlquery, [customer], (err, result) => {
//     if (err) {
//       console.log(err, 'error');
//     }
//     return res.status(200).json(result);

//   })
// })

router.get('/gstdetails/:customer', (req, res) => {

  const customer = req.params.customer;
  const sqlquery = "select gstTax,state,address1,gstnumber,servicestation,billingGroup,customer from customers where customer=?";
  db.query(sqlquery, [customer], (err, result) => {
    if (err) {
      console.log(err, 'error');
    }
    // console.log(result, 'Results')
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
          // console.log(result,"checking");       
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
      // console.error(err);
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    });
})

router.get('/getcustomerorderdata/:customerdata', (req, res) => {

  const customer = req.params.customerdata;
  // console.log(customer,"checking");

  const decryptCustomer = decryption(customer);
  // console.log(decryptCustomer,"decryption value");

  db.query("select * from  customerOrderdata where customer= ?", [decryptCustomer], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }
    return res.status(200).json(result)
  })

})

router.put('/updatecustomerorderdata', (req, res) => {
  const customerdata = req.body;
  // console.log(customerdata,"checking upd");


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
              // console.log(result,"updated");

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
      // console.log(err);
      return res.status(500).json({ error: "Failed to process data into MySQL" });
    });
});

router.delete("/deletecustomerorderdatasdata/:id", (req, res) => {
  const deleteid = req.params.id;

  // console.log(deleteid,"deleteid");


  db.query("delete from customerOrderdata where id=?", [deleteid], (err, results) => {
    if (err) {
      // console.log("ordercustomer", err)
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }

    // console.log(results,"delete res");


    return res.status(200).json("data delete succesfuully")
  })

})

router.get('/ratemanagmentCustomerdata', (req, res) => {
  db.query(`SELECT ratename from ratetype where ratetype="Customer"`, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
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

// getting customer details by customertype and getting group by billing tables

router.post("/monthlyWiseBillingDataReport", (req, res) => {
  const { customerType, fromDate, toDate } = req.body;
  const formattedFromDate = moment(fromDate).format("YYYY-MM-DD");
  const formattedToDate = moment(toDate).format("YYYY-MM-DD");

  // Prepare query and params based on customerType
  const customerSqlQuery = customerType === "All"
    ? `SELECT Customer, customerType,address1 FROM customers`
    : `SELECT Customer, customerType,address1 FROM customers WHERE customerType = ?`;

  const queryParams = customerType === "All" ? [] : [customerType];

  // Step 1: Fetch customers based on customerType
  db.query(customerSqlQuery, queryParams, (err, customers) => {
    if (err) {
      // console.log(err, "error");
      return res.status(500).json({ error: "Database error in customer query" });
    }
    //  console.log(customers,"checking the monthly wise values");
    //  console.log(customers,"result");

    if (customers.length === 0) {
      return res.json({
        customerDetails: [],
        transferList: [],
        groupBilling: [],
        individualBilling: []
      });
    }

    const customerNames = customers.map((c) => c.Customer);
    const customerAddressMap = {};

    customers.forEach((c) => {
      customerAddressMap[c.Customer] = c.address1;
    });

    // Step 2: Fetch customer details (orderByEmail)
    const customerDetailsQuery = `SELECT customer, orderByEmail FROM customerOrderdata WHERE customer IN (?)`;

    db.query(customerDetailsQuery, [customerNames], (err, customerDetails) => {
      if (err) {
        // console.log(err, "error");
        return res.status(500).json({ error: "Database error in customer details query" });
      }

      const uniqueCustomerDetailsMap = new Map();
      customerDetails.forEach((c) => {
        if (!uniqueCustomerDetailsMap.has(c.customer)) {
          uniqueCustomerDetailsMap.set(c.customer, {
            ...c,
            address: customerAddressMap[c.customer] || null,
            customerType: customers?.find(cust => cust.Customer === c.customer)?.customerType || null
          });
        }
      });

      const enrichedCustomerDetails = Array.from(uniqueCustomerDetailsMap.values());
      // console.log(formattedFromDate,"fffffff",formattedToDate,"fffffffffff",customerNames,customerNames.length);
      
const tripsheetResultsQuery = `
  SELECT customer, SUM(totalcalcAmount) AS totalAmount
  FROM tripsheet 
  WHERE shedOutDate BETWEEN ? AND ? 
  AND status IN ('Billed') 
  AND customer IN (?)
  GROUP BY customer
`;

db.query(tripsheetResultsQuery, [formattedFromDate, formattedToDate,customerNames], (err, result) => {
  if (err) {
    console.log(err,"error");
    
  } else {
    const tripsheetMap = {};
result.forEach(r => {
  tripsheetMap[r.customer] = r.totalAmount;
});
const finalCustomerDetails = enrichedCustomerDetails
  .filter(c => tripsheetMap[c.customer] !== undefined)
  .map(c => ({
    ...c,
    totalAmount: tripsheetMap[c.customer]
  }));

    
    res.json(
             finalCustomerDetails
    )
  }
});

        
    });
  });
});

// router.post("/monthlyWiseBillingDataReport", (req, res) => {
//   const { customerType, fromDate, toDate } = req.body;
//   const formattedFromDate = moment(fromDate).format("YYYY-MM-DD");
//   const formattedToDate = moment(toDate).format("YYYY-MM-DD");
//   // console.log(req.body,"checking the values");

// // console.log(formattedFromDate,"from date");
// // console.log(formattedToDate,"todate");



//   // console.log(formattedFromDate, "formatted Dates", formattedToDate, customerType);

//   // Prepare query and params based on customerType
//   const customerSqlQuery = customerType === "All"
//     ? `SELECT Customer, customerType,address1 FROM customers`
//     : `SELECT Customer, customerType,address1 FROM customers WHERE customerType = ?`;

//   const queryParams = customerType === "All" ? [] : [customerType];

//   // Step 1: Fetch customers based on customerType
//   db.query(customerSqlQuery, queryParams, (err, customers) => {
//     if (err) {
//       // console.log(err, "error");
//       return res.status(500).json({ error: "Database error in customer query" });
//     }
//     //  console.log(customers,"checking the monthly wise values");
//     //  console.log(customers,"result");

//     if (customers.length === 0) {
//       return res.json({
//         customerDetails: [],
//         transferList: [],
//         groupBilling: [],
//         individualBilling: []
//       });
//     }

//     const customerNames = customers.map((c) => c.Customer);
//     const customerAddressMap = {};

//     customers.forEach((c) => {
//       customerAddressMap[c.Customer] = c.address1;
//     });

//     // Step 2: Fetch customer details (orderByEmail)
//     const customerDetailsQuery = `SELECT customer, orderByEmail FROM customerOrderdata WHERE customer IN (?)`;

//     db.query(customerDetailsQuery, [customerNames], (err, customerDetails) => {
//       if (err) {
//         // console.log(err, "error");
//         return res.status(500).json({ error: "Database error in customer details query" });
//       }

//       // const enrichedCustomerDetails = customerDetails.map((c) => ({
//       //   ...c,
//       //   address: customerAddressMap[c.customer] || null,
//       //   customerType: customers?.find(cust => cust.Customer === c.customer)?.customerType || null
//       // }));
//       const uniqueCustomerDetailsMap = new Map();
//       customerDetails.forEach((c) => {
//         if (!uniqueCustomerDetailsMap.has(c.customer)) {
//           uniqueCustomerDetailsMap.set(c.customer, {
//             ...c,
//             address: customerAddressMap[c.customer] || null,
//             customerType: customers?.find(cust => cust.Customer === c.customer)?.customerType || null
//           });
//         }
//       });

//       const enrichedCustomerDetails = Array.from(uniqueCustomerDetailsMap.values());

//       // Step 3: Fetch data from Transfer_list
//       const transferListQuery = `
//         SELECT Grouptrip_id, Invoice_no, Billdate, Organization_name, Amount, FromDate, EndDate 
//         FROM Transfer_list  
//         WHERE Billdate BETWEEN ? AND ? AND Organization_name IN (?)`;

//       db.query(transferListQuery, [formattedFromDate, formattedToDate, customerNames], (err, transferData) => {
//         if (err) {
//           // console.log(err, "error");
//           return res.status(500).json({ error: "Database error in transfer list query" });
//         }

//         // Step 4: Fetch data from Group_billing
//         const GroupBillingQuery = `
//           SELECT ReferenceNo AS Grouptrip_id, InvoiceDate AS Billdate, Customer AS Organization_name, FromDate, ToDate AS EndDate, Amount
//           FROM Group_billing 
//           WHERE InvoiceDate BETWEEN ? AND ? AND Customer IN (?)`;

//         db.query(GroupBillingQuery, [formattedFromDate, formattedToDate, customerNames], (err, groupData) => {
//           if (err) {
//             // console.log(err, "error");
//             return res.status(500).json({ error: "Database error in group billing query" });
//           }

//           // Step 5: Fetch data from Individual_Billing
//           const IndividualBillingQuery = `
//             SELECT Invoice_No AS Invoice_no, Bill_Date AS Billdate, Customer AS Organization_name, Amount, TripStartDate AS FromDate
//             FROM Individual_Billing 
//             WHERE Bill_Date BETWEEN ? AND ? AND Customer IN (?)`;

//           db.query(IndividualBillingQuery, [formattedFromDate, formattedToDate, customerNames], (err, individualData) => {
//             if (err) {
//               // console.log(err, "errorindi");
//               return res.status(500).json({ error: "Database error in individual billing query" });
//             }

//             res.json({
//               customerDetails: enrichedCustomerDetails,
//               transferList: transferData,
//               groupBilling: groupData,
//               individualBilling: individualData,
//             });
//           });
//         });
//       });
//     });
//   });
// });


//doubt
router.get("/Monthilywisedatatrip", (req, res) => {
  const { customer, fromDate, toDate } = req.query;
  // console.log(req.query, "checking full values");

  const formattedFromDate = moment(fromDate).format('YYYY-MM-DD');
  // console.log(formattedFromDate,"from date");

  const formattedToDate = moment(toDate).format('YYYY-MM-DD');
  // console.log(formattedToDate,"todate");



  let query = 'SELECT * FROM customers';
  let params = [];

  if (customer !== "All") {
    query += ' WHERE customerType = ?';
    params.push(customer);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      return res.status(400).json(err)
    }

    const datas = results?.map((data) => data.customer)
    const sql = `
  SELECT 
    customer,orderbyemail,billingno,
    SUM(IFNULL(totalcalcAmount, 0))  AS totalAmount
  FROM 
    tripsheet
  WHERE 
   tripsheetdate >= DATE_ADD(?, INTERVAL 0 DAY) 
   AND tripsheetdate <= DATE_ADD(?, INTERVAL 1 DAY)
    AND customer IN (?)
  GROUP BY 
    customer,orderbyemail,billingno
`;

    // const sql = `
    // SELECT 
    //   customer,
    //   SUM(IFNULL(totalcalcAmount, 0))  AS totalAmount
    // FROM 
    //   tripsheet
    // WHERE 
    //  tripsheetdate >= DATE_ADD(?, INTERVAL 0 DAY) 
    //  AND tripsheetdate <= DATE_ADD(?, INTERVAL 1 DAY)
    //   AND customer IN (?)
    // GROUP BY 
    //   customer
    // `;

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

      return res.status(200).json(combinedResults)
    })
  })
})

router.get('/montlywisedataall', (req, res) => {
  db.query("select c.customerId,c.customerType as customertype,c.address1 as address,t.orderbyemail,t.billingno,sum(totalcalcAmount) as totalAmount,t.customer from customers c INNER JOIN  tripsheet t on c.customer = t.customer group by t.customer,c.customerId,t.orderbyemail,t.billingno", (err, result) => {
    if (err) {
      console.log(err)
    }

    return res.status(200).json(result)
  })
})

// router.get('/getCustomer-hybrid/:customer', (req, res) => {
//   const customer = req.params.customer;
//   console.log("customer", customer)
//   db.query("select hybrid from customers where name=?", [customer], (err, result) => {
//     if (err) {
//       console.log("Error", err)
//       return res.status(500).json({ message: "somthing went wrong..", error: true })
//     }
//     console.log("result", result)
//     return res.status(200).json(result[0])
//   })
// })

router.get("/getuniqueCustomerdata/:customer", (req, res) => {
  const customer = req.params.customer;
  // console.log(customer, "params")
  db.query("select customer from customers where customer=?", [customer], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete data from MySQL' });
    }
    // console.log(results.length)
    return res.status(200).json(results);

  })
})
// router.get("/getratetypemanagentCustomerdatastations/:ratetype/:ratename/:stations", (req, res) => {
//   const ratetype = req.params.ratetype;
//   const stations = req.params.stations;
//   const ratename = req.params.ratename;
//   console.log(ratetype, "params", stations, ratename)
//   db.query("select stations from ratemanagement where ratetype = ? and  OrganizationName=? and stations =?", [ratetype, ratename, stations], (err, results) => {
//     if (err) {
//       return res.status(500).json({ error: 'Failed to delete data from MySQL' });
//     }
//     console.log(results.length, "dddd")
//     return res.status(200).json(results);
//   })
// })

module.exports = router;