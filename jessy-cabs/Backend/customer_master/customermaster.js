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


// booking page database\

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

const port = 8081;
app.listen(port, () => {
  console.log(`Connected to backend on port ${port}`);
});
