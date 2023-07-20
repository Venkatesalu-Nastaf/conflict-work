//Database connection for TAAF Appliction this file contain Add, Delete, Collect data from mysql, and Update functions:  

const express = require('express');
const cors = require('cors');
const db = require('../db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: "Hello from the backend side" });
});
// -----------------------------------------------------------------------------------------------------------

// Customer Master Database

// Add Customer Master database

app.post('/customers', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO customers SET ?', bookData, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    console.log('Data inserted into MySQL');
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});

// delete Customer Master data

app.delete('/customers/:customerId', (req, res) => {
  const customerId = req.params.customerId;
  console.log('Customer ID:', customerId); // Log the customer ID
  console.log('DELETE query:', 'DELETE FROM customers WHERE customerId = ?', customerId);
  db.query('DELETE FROM customers WHERE customerId = ?', customerId, (err, result) => {
    if (err) {
      console.error('Error deleting data from MySQL:', err);
      return res.status(500).json({ error: "Failed to delete data from MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    console.log('Data deleted from MySQL');
    return res.status(200).json({ message: "Data deleted successfully" });
  });
});

// update Customer Master details

app.put('/customers/:customerId', (req, res) => {
  const customerId = req.params.customerId;
  const updatedCustomerData = req.body;
  console.log('Customer ID:', customerId); // Log the customer ID
  console.log('Updated customer data:', updatedCustomerData);

  db.query('UPDATE customers SET ? WHERE customerId = ?', [updatedCustomerData, customerId], (err, result) => {
    if (err) {
      console.error('Error updating data in MySQL:', err);
      return res.status(500).json({ error: "Failed to update data in MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    console.log('Data updated in MySQL');
    return res.status(200).json({ message: "Data updated successfully" });
  });
});

// collect data for Customer Master table

app.get('/customers', (req, res) => {
  db.query('SELECT * FROM customers', (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});

// End Customer Master database

// -----------------------------------------------------------------------------------------------------------

// Supplier Master Database:

// account_info database:-
// Add account_info database

app.post('/accountinfo', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO accountinfo SET ?', bookData, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    console.log('Data inserted into MySQL');
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});

// delete account_info database

app.delete('/accountinfo/:accountNo', (req, res) => {
  const accountNo = req.params.accountNo;
  // console.log('Customer ID:', accountNo); // Log the customer ID
  console.log('DELETE query:', 'DELETE FROM accountinfo WHERE accountNo = ?', accountNo);
  db.query('DELETE FROM accountinfo WHERE accountNo = ?', accountNo, (err, result) => {
    if (err) {
      console.error('Error deleting data from MySQL:', err);
      return res.status(500).json({ error: "Failed to delete data from MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    console.log('Data deleted from MySQL');
    return res.status(200).json({ message: "Data deleted successfully" });
  });
});

// update account_info database

app.put('/accountinfo/:accountNo', (req, res) => {
  const accountNo = req.params.accountNo;
  const updatedCustomerData = req.body;
  console.log('Customer ID:', accountNo); // Log the customer ID
  console.log('Updated customer data:', updatedCustomerData);

  // Update the customer data in the database
  db.query('UPDATE accountinfo SET ? WHERE accountNo = ?', [updatedCustomerData, accountNo], (err, result) => {
    if (err) {
      console.error('Error updating data in MySQL:', err);
      return res.status(500).json({ error: "Failed to update data in MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    console.log('Data updated in MySQL');
    return res.status(200).json({ message: "Data updated successfully" });
  });
});

// collect data for account_info

app.get('/accountinfo', (req, res) => {
  db.query('SELECT * FROM accountinfo', (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});

// End account_info database

// -----------------------------------------------------------------------------------------------------------

// vehicle_info database:-
// Add vehicle_info database

app.post('/vehicleinfo', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO vehicleinfo SET ?', bookData, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    console.log('Data inserted into MySQL');
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});

// end vehicle_info database

// -----------------------------------------------------------------------------------------------------------

// Booking database:

// Booking page database:-
// Add Booking page database

app.post('/booking', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO booking SET ?', bookData, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    console.log('Data inserted into MySQL');
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});

// collect details from Booking

app.get('/booking/:bookingno', (req, res) => {
  const bookingno = req.params.bookingno;

  db.query('SELECT * FROM booking WHERE bookingno = ?', bookingno, (err, result) => {
    if (err) {
      console.error('Error retrieving booking details from MySQL:', err);
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    const bookingDetails = result[0]; // Assuming there is only one matching booking
    return res.status(200).json(bookingDetails);
  });
});

// delete booking details

app.delete('/booking/:bookingno', (req, res) => {
  const bookingno = req.params.bookingno;
  console.log('DELETE query:', 'DELETE FROM booking WHERE bookingno = ?', bookingno);
  db.query('DELETE FROM booking WHERE bookingno = ?', bookingno, (err, result) => {
    if (err) {
      console.error('Error deleting data from MySQL:', err);
      return res.status(500).json({ error: "Failed to delete data from MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    console.log('Data deleted from MySQL');
    return res.status(200).json({ message: "Data deleted successfully" });
  });
});

// update booking details

app.put('/booking/:bookingno', (req, res) => {
  const bookingno = req.params.bookingno;
  const updatedCustomerData = req.body;

  db.query('UPDATE booking SET ? WHERE bookingno = ?', [updatedCustomerData, bookingno], (err, result) => {
    if (err) {
      console.error('Error updating data in MySQL:', err);
      return res.status(500).json({ error: "Failed to update data in MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    console.log('Data updated in MySQL');
    return res.status(200).json({ message: "Data updated successfully" });
  });
});

//End booking page database 

// -----------------------------------------------------------------------------------------------------------

// booking copy data collect:

app.get('/booking', (req, res) => {
  const { bookingno, servicestation, fromDate, toDate } = req.query;

  // Query and parameters for fetching booking details based on the query parameters
  let query = 'SELECT * FROM booking WHERE 1=1';
  let params = [];

  if (bookingno) {
    query += ' AND bookingno = ?';
    params.push(bookingno);
  }

  if (servicestation) {
    query += ' AND servicestation = ?';
    params.push(servicestation);
  }

  if (fromDate && toDate) {
    query += ' AND bookingdate BETWEEN ? AND ?';
    params.push(fromDate);
    params.push(toDate);
  }

  db.query(query, params, (err, result) => {
    if (err) {
      console.error('Error retrieving booking details from MySQL:', err);
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }
    return res.status(200).json(result);
  });
});

// End booking copy page database

// -----------------------------------------------------------------------------------------------------------

// booking CHART data collect

app.get('/booking', (req, res) => {
  const { fromDate, toDate } = req.query;

  const query = `
    SELECT vehiclemodule, COUNT(*) AS count
    FROM booking
    WHERE bookingdate BETWEEN ? AND ?
    GROUP BY vehiclemodule
  `;
  const values = [fromDate, toDate];

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error establishing database connection:', err);
      res.status(500).json({ error: 'Failed to connect to the database' });
      return;
    }
    connection.query(query, values, (err, results) => {
      connection.release(); // Release the connection back to the pool
      if (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'Failed to retrieve booking data' });
        return;
      }

      res.json(results); // Send the booking data as JSON response
    });
  });
});

// End booking CHART database

// -----------------------------------------------------------------------------------------------------------

// trip sheet database:

// add tripsheet database

app.post('/tripsheet', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO tripsheet SET ?', bookData, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    console.log('Data inserted into MySQL');
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});

// delete tripsheet data

app.delete('/tripsheet/:tripsheetno', (req, res) => {
  const tripsheetno = req.params.tripsheetno;

  db.query('DELETE FROM tripsheet WHERE tripsheetno = ?', tripsheetno, (err, result) => {
    if (err) {
      console.error('Error deleting data from MySQL:', err);
      return res.status(500).json({ error: "Failed to delete data from MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    console.log('Data deleted from MySQL');
    return res.status(200).json({ message: "Data deleted successfully" });
  });
});

// update tripsheet details

app.put('/tripsheet/:tripsheetno', (req, res) => {
  const tripsheetno = req.params.tripsheetno;
  const updatedCustomerData = req.body;
  console.log('Customer ID:', tripsheetno); // Log the customer ID
  console.log('Updated customer data:', updatedCustomerData);

  db.query('UPDATE tripsheet SET ? WHERE tripsheetno = ?', [updatedCustomerData, tripsheetno], (err, result) => {
    if (err) {
      console.error('Error updating data in MySQL:', err);
      return res.status(500).json({ error: "Failed to update data in MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    console.log('Data updated in MySQL');
    return res.status(200).json({ message: "Data updated successfully" });
  });
});

// collect data from tripsheet database

app.get('/tripsheet/:tripsheetno', (req, res) => {
  const tripsheetno = req.params.tripsheetno;

  db.query('SELECT * FROM tripsheet WHERE tripsheetno = ?', tripsheetno, (err, result) => {
    if (err) {
      console.error('Error retrieving booking details from MySQL:', err);
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    const bookingDetails = result[0]; // Assuming there is only one matching booking
    return res.status(200).json(bookingDetails);
  });
});

// End tripsheet database

// -----------------------------------------------------------------------------------------------------------

// customers/Dispatch/closed data collect from database

app.get('/tripsheet', (req, res) => {
  const { department, fromDate, toDate } = req.query;

  let query = 'SELECT * FROM tripsheet WHERE 1=1';
  let params = [];

  if (department) {
    query += ' AND department = ?';
    params.push(department);
  }

  if (fromDate && toDate) {
    query += ' AND startdate BETWEEN ? AND ?';
    params.push(fromDate);
    params.push(toDate);
  }

  db.query(query, params, (err, result) => {
    if (err) {
      console.error('Error retrieving booking details from MySQL:', err);
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }
    return res.status(200).json(result);
  });
});

// End customers/Dispatch/closed database

// -----------------------------------------------------------------------------------------------------------

// driver master database

// add driver master database

app.post('/drivermaster', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO drivermaster SET ?', bookData, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    console.log('Data inserted into MySQL');
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});

// delete driver master data

app.delete('/drivermaster/:driverid', (req, res) => {
  const driverid = req.params.driverid;
  console.log('Customer ID:', driverid); // Log the customer ID
  console.log('DELETE query:', 'DELETE FROM drivermaster WHERE driverid = ?', driverid);
  db.query('DELETE FROM drivermaster WHERE driverid = ?', driverid, (err, result) => {
    if (err) {
      console.error('Error deleting data from MySQL:', err);
      return res.status(500).json({ error: "Failed to delete data from MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    console.log('Data deleted from MySQL');
    return res.status(200).json({ message: "Data deleted successfully" });
  });
});

// update driver master details

app.put('/drivermaster/:driverid', (req, res) => {
  const driverid = req.params.driverid;
  const updatedCustomerData = req.body;
  console.log('Customer ID:', driverid); // Log the customer ID
  console.log('Updated customer data:', updatedCustomerData);

  db.query('UPDATE drivermaster SET ? WHERE driverid = ?', [updatedCustomerData, driverid], (err, result) => {
    if (err) {
      console.error('Error updating data in MySQL:', err);
      return res.status(500).json({ error: "Failed to update data in MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    console.log('Data updated in MySQL');
    return res.status(200).json({ message: "Data updated successfully" });
  });
});

// collect data for driver master table

app.get('/drivermaster', (req, res) => {
  db.query('SELECT * FROM drivermaster', (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});

// End driver master database



const port = 8081;
app.listen(port, () => {
  console.log(`Connected to backend on port ${port}`);
});
