const express = require('express');
const cors = require('cors');
const db = require('../db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: "Hello from the backend side" });
});

// customer database

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

// delete customer data
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

// update customer details

app.put('/customers/:customerId', (req, res) => {
  const customerId = req.params.customerId;
  const updatedCustomerData = req.body;
  console.log('Customer ID:', customerId); // Log the customer ID
  console.log('Updated customer data:', updatedCustomerData);

  // Update the customer data in the database
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

// collect data for custamer table

app.get('/customers', (req, res) => {
  db.query('SELECT * FROM customers', (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});


// supplier

// account_info database

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

// delete account info

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

// update customer details

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

// collect data for account Info

app.get('/accountinfo', (req, res) => {
  db.query('SELECT * FROM accountinfo', (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});

// vehicle_info database

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


// booking page database

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

// collect details from booking

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
// app.get('/booking', (req, res) => {
//   db.query('SELECT * FROM booking', (err, results) => {
//     if (err) {
//       console.error('Error fetching data from MySQL:', err);
//       return res.status(500).json({ error: "Failed to fetch data from MySQL" });
//     }
//     return res.status(200).json(results);
//   });
// });

const port = 8081;
app.listen(port, () => {
  console.log(`Connected to backend on port ${port}`);
});
