//Database connection for TAAF Appliction this file contain Add, Delete, Collect data from mysql, and Update functions:  
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const db = require('../db');
const multer = require('multer');
const fs = require('fs'); // signature png
const app = express();
const path = require('path');
const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: "Hello from the backend side" });
});

// -----------------------------------------------------------------------------------------------------------
// Login Page database
app.get('/usercreation', (req, res) => {
  const query = 'SELECT * FROM usercreation WHERE username = ?';
  db.query(query, [username], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Database error' });
    } else {
      if (results.length === 1 && results[0].userpassword === userpassword) {
        res.json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  });
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
//booking number change
app.get('booking', async (req, res) => {
  try {
    // Find the highest booking number in the database
    const highestBooking = await Booking.findOne().sort({ bookingno: -1 }).exec();

    // Calculate the next booking number
    const nextBookingNo = highestBooking ? highestBooking.bookingno + 1 : 1000;
    res.json({ bookingno: nextBookingNo });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching next booking number' });
  }
});
// bookingfile upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  const fileData = {
    name: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    path: req.file.path,
    bookingno: req.body.bookingno,
  };

  const query = 'INSERT INTO upload SET ?';
  db.query(query, fileData, (err, result) => {
    if (err) {
      console.error('Error storing file in the database:', err);
      return res.status(500).json({ error: 'Error storing file in the database.' });
    }
    return res.status(200).json({ message: 'File uploaded and data inserted successfully.' });
  });
});
// collect data from vehicleInfo database
app.get('/name-customers/:printName', (req, res) => {
  const printName = req.params.printName; // Access the parameter using req.params
  // Modify the query to use the LIKE operator for partial matching
  db.query('SELECT * FROM customers WHERE printName LIKE ?', [`%${printName}%`], (err, result) => {
    if (err) {
      console.error('Error retrieving customer details from MySQL:', err);
      return res.status(500).json({ error: 'Failed to retrieve customer details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    const customerDetails = result[0]; // Assuming there is only one matching customer
    return res.status(200).json(customerDetails);
  });
});
//send email  from booking page
app.post('/send-email', async (req, res) => {
  try {
    const { guestname, guestmobileno, email, useage, pickup } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'akash02899@gmail.com',
        pass: 'zrbdlfwjxsgrjncr',
      },
    });

    // Email content for the owner
    const ownerMailOptions = {
      from: 'akash02899@gmail.com',
      to: 'akash02899@gmail.com', // Set the owner's email address
      // subject: ${name} 'sent you a feedback',
      subject: `${guestname} sent you a feedback`,
      text: `Guest Name: ${guestname}\nEmail: ${email}\nContact No: ${guestmobileno}\nPickup: ${pickup}\nUsage: ${useage}`,
    };

    // Send email to the owner
    await transporter.sendMail(ownerMailOptions);

    // Email content for the customer
    const customerMailOptions = {
      from: 'akash02899@gmail.com',
      to: email,
      subject: 'Greetings from Jessy Cabs',
      text: `Hello ${guestname},\n\nThank you for reaching out. Your booking is Placed successfully\n\nRegards,\nJessy Cabs`,
    };

    // Send greeting email to the customer
    await transporter.sendMail(customerMailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while sending the email' });
  }
});
//end booking mail
//send email from online-booking page
app.post('/send-onbook-email', async (req, res) => {
  try {
    const { guestname, guestmobileno, email, startdate, starttime, pickup, useage, duty, vehType, remarks, } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'akash02899@gmail.com',
        pass: 'zrbdlfwjxsgrjncr',
      },
    });

    // Email content for the owner
    const ownerMailOptions = {
      from: 'akash02899@gmail.com',
      to: 'akash02899@gmail.com', // Set the owner's email address
      // subject: ${name} 'sent you a feedback',
      subject: `${guestname} sent you a feedback`,
      text: `Guest Name: ${guestname}\nEmail: ${email}\nGuest Mobile No: ${guestmobileno}\nStart Date: ${startdate}\nStart Time: ${starttime}\nPickup: ${pickup}\nUseage: ${useage}\nDuty: ${duty}\nVehicle Type: ${vehType}\nRemarks: ${remarks}`,
    };

    // Send email to the owner
    await transporter.sendMail(ownerMailOptions);

    // Email content for the customer
    const customerMailOptions = {
      from: 'akash02899@gmail.com',
      to: email,
      subject: 'Greetings from Jessy Cabs',
      html: `
      <p>Hello ${guestname},</p>
      <p>Thank you for reaching out. Your booking is Placed successfully</p>
      <p>Regards,<br>Jessy Cabs</p>
      <table>
        <tr><td>Guest Name:</td><td>${guestname}</td></tr>
        <tr><td>Email:</td><td>${email}</td></tr>
        <tr><td>Guest Mobile No:</td><td>${guestmobileno}</td></tr>
        <tr><td>Start Date:</td><td>${startdate}</td></tr>
        <tr><td>Start Time:</td><td>${starttime}</td></tr>
        <tr><td>Pickup:</td><td>${pickup}</td></tr>
        <tr><td>Useage:</td><td>${useage}</td></tr>
        <tr><td>Duty:</td><td>${duty}</td></tr>
        <tr><td>Vehicle Type:</td><td>${vehType}</td></tr>
        <tr><td>Remarks:</td><td>${remarks}</td></tr>
      </table>
        `,
    };

    // Send greeting email to the customer
    await transporter.sendMail(customerMailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while sending the email' });
  }
});
//end online-booking mail
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
app.delete('/tripsheet/:tripid', (req, res) => {
  const tripid = req.params.tripid;
  db.query('DELETE FROM tripsheet WHERE tripid = ?', tripid, (err, result) => {
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
app.put('/tripsheet/:tripid', (req, res) => {
  const tripid = req.params.tripid;
  const updatedCustomerData = req.body;
  console.log('Customer ID:', tripid); // Log the customer ID
  console.log('Updated customer data:', updatedCustomerData);
  db.query('UPDATE tripsheet SET ? WHERE tripid = ?', [updatedCustomerData, tripid], (err, result) => {
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
app.get('/tripsheet/:tripid', (req, res) => {
  const tripid = req.params.tripid;
  db.query('SELECT * FROM tripsheet WHERE tripid = ?', tripid, (err, result) => {
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
// collect data from vehicleInfo database
app.get('/vehicleinfo/:vehRegNo', (req, res) => {
  const vehRegNo = req.params.vehRegNo;
  // Modify the query to use the LIKE operator for partial matching
  db.query('SELECT * FROM vehicleinfo WHERE vehRegNo LIKE ? LIMIT 1', `%${vehRegNo}%`, (err, result) => {
    if (err) {
      console.error('Error retrieving vehicle details from MySQL:', err);
      return res.status(500).json({ error: 'Failed to retrieve vehicle details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    const vehicleDetails = result[0]; // Assuming there is only one matching vehicle
    return res.status(200).json(vehicleDetails);
  });
});
//send email  from booking page
app.post('/send-tripsheet-email', async (req, res) => {
  try {
    const { guestname, guestmobileno, email, hireTypes, department, vehType, vehRegNo, driverName, mobileNo, useage, pickup } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'akash02899@gmail.com',
        pass: 'zrbdlfwjxsgrjncr',
      },
    });

    // Email content for the owner
    const ownerMailOptions = {
      from: 'akash02899@gmail.com',
      to: 'akash02899@gmail.com', // Set the owner's email address
      // subject: ${name} 'sent you a feedback',
      subject: `${guestname} sent you a feedback`,
      text: `Guest Name: ${guestname}\nEmail: ${email}\nContact No: ${guestmobileno}\nHireTypes: ${hireTypes}\nDepartment: ${department}\nVehicle Type: ${vehType}\nVehicle RegNo: ${vehRegNo}\nDriver Name: ${driverName}\nDriver-MobileNo: ${mobileNo}\nPickup: ${pickup}\nUsage: ${useage}`,
    };

    // Send email to the owner
    await transporter.sendMail(ownerMailOptions);

    // Email content for the customer
    const customerMailOptions = {
      from: 'akash02899@gmail.com',
      to: email,
      subject: 'Greetings from Jessy Cabs',
      html: `
      <p>Hello ${guestname},</p>
      <p>Thank you for reaching out. Your booking is Placed successfully</p>
      <p>Regards,<br>Jessy Cabs</p>
      <table>
        <tr><td>Guest Name:</td><td>${guestname}</td></tr>
        <tr><td>Email:</td><td>${email}</td></tr>
        <tr><td>Contact No:</td><td>${guestmobileno}</td></tr>
        <tr><td>Hire Types:</td><td>${hireTypes}</td></tr>
        <tr><td>Department:</td><td>${department}</td></tr>
        <tr><td>Vehicle Type:</td><td>${vehType}</td></tr>
        <tr><td>Vehicle RegNo:</td><td>${vehRegNo}</td></tr>
        <tr><td>Driver Name:</td><td>${driverName}</td></tr>
        <tr><td>Driver-MobileNo:</td><td>${mobileNo}</td></tr>
        <tr><td>Pickup:</td><td>${pickup}</td></tr>
        <tr><td>Usage:</td><td>${useage}</td></tr>
      </table>
    `,
    };

    // Send greeting email to the customer
    await transporter.sendMail(customerMailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while sending the email' });
  }
});
//end booking mail
// End tripsheet database
// -----------------------------------------------------------------------------------------------------------
// customers/Received/Pending data collect from database
app.get('/pending-bookings', (req, res) => {
  const { servicestation, fromDate, toDate } = req.query;

  let query = 'SELECT * FROM booking WHERE status = "pending"';
  let params = [];

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
// End 
// -----------------------------------------------------------------------------------------------------------
// customers/Dispatch/closed data collect from database
app.get('/tripsheet', (req, res) => {
  const { department, fromDate, toDate } = req.query;
  let query = 'SELECT * FROM tripsheet WHERE status = "closed"';
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
// -----------------------------------------------------------------------------------------------------------
// Settings page database:
// user creation database
// add user creation database
app.post('/usercreation', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO usercreation SET ?', bookData, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    console.log('Data inserted into MySQL');
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});
// delete user creation data
app.delete('/usercreation/:userid', (req, res) => {
  const userid = req.params.userid;
  console.log('Customer ID:', userid); // Log the customer ID
  console.log('DELETE query:', 'DELETE FROM usercreation WHERE userid = ?', userid);
  db.query('DELETE FROM usercreation WHERE userid = ?', userid, (err, result) => {
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
// update user creation details
app.put('/usercreation/:userid', (req, res) => {
  const userid = req.params.userid;
  const updatedCustomerData = req.body;
  console.log('Customer ID:', userid); // Log the customer ID
  console.log('Updated customer data:', updatedCustomerData);
  db.query('UPDATE usercreation SET ? WHERE userid = ?', [updatedCustomerData, userid], (err, result) => {
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
// collect data for user creation table
app.get('/usercreation', (req, res) => {
  db.query('SELECT * FROM usercreation', (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});
// End user creation database
// -----------------------------------------------------------------------------------------------------------
// login page databse fetch:
app.post('/login', (req, res) => {
  const { username, userpassword } = req.body;
  if (!username || !userpassword) {
    return res.status(400).json({ error: 'Username and userpassword are required.' });
  }
  db.query('SELECT * FROM usercreation WHERE username = ? AND userpassword = ?', [username, userpassword], (err, result) => {
    if (err) {
      console.error('Error retrieving user details from MySQL:', err);
      return res.status(500).json({ error: 'Failed to retrieve user details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials. Please check your username and userpassword.' });
    }
    return res.status(200).json({ message: 'Login successful', user: result[0] });
  });
});
// -----------------------------------------------------------------------------------------------------------
// Station Creation Database
// Add Station Creation database
app.post('/stationcreation', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO stationcreation SET ?', bookData, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    console.log('Data inserted into MySQL');
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});
// delete Station Creation data
app.delete('/stationcreation/:stationid', (req, res) => {
  const stationid = req.params.stationid;
  db.query('DELETE FROM stationcreation WHERE customerId = ?', stationid, (err, result) => {
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
// update  Station Creation details
app.put('/stationcreation/:customerId', (req, res) => {
  const stationid = req.params.stationid;
  const updatedCustomerData = req.body;
  console.log('Customer ID:', stationid); // Log the customer ID
  console.log('Updated customer data:', updatedCustomerData);
  db.query('UPDATE stationcreation SET ? WHERE stationid = ?', [updatedCustomerData, stationid], (err, result) => {
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
// collect data for  Station Creation table
app.get('/stationcreation', (req, res) => {
  db.query('SELECT * FROM stationcreation', (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});
// End  Station Creation database
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
// -----------------------------------------------------------------------------------------------------------
// Settings page database:
// user creation database
// add user creation database
app.post('/usercreation', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO usercreation SET ?', bookData, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    console.log('Data inserted into MySQL');
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});
// delete user creation data
app.delete('/usercreation/:userid', (req, res) => {
  const userid = req.params.userid;
  console.log('Customer ID:', userid); // Log the customer ID
  console.log('DELETE query:', 'DELETE FROM usercreation WHERE userid = ?', userid);
  db.query('DELETE FROM usercreation WHERE userid = ?', userid, (err, result) => {
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
// update user creation details
app.put('/usercreation/:userid', (req, res) => {
  const userid = req.params.userid;
  const updatedCustomerData = req.body;
  console.log('Customer ID:', userid); // Log the customer ID
  console.log('Updated customer data:', updatedCustomerData);
  db.query('UPDATE usercreation SET ? WHERE userid = ?', [updatedCustomerData, userid], (err, result) => {
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
// collect data for user creation table
app.get('/usercreation', (req, res) => {
  db.query('SELECT * FROM usercreation', (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});
// End user creation database
// -----------------------------------------------------------------------------------------------------------
// Rate Management Database
// Add Rate Management database
app.post('/ratemanagement', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO ratemanagement SET ?', bookData, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    console.log('Data inserted into MySQL');
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});
// delete Rate Management data
app.delete('/ratemanagement/:id', (req, res) => {
  const customerId = req.params.id;
  console.log('Customer ID:', customerId); // Log the customer ID
  console.log('DELETE query:', 'DELETE FROM ratemanagement WHERE id = ?', customerId);
  db.query('DELETE FROM ratemanagement WHERE id = ?', customerId, (err, result) => {
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
// update Rate Management details
app.put('/ratemanagement/:id', (req, res) => {
  const customerId = req.params.id;
  const updatedCustomerData = req.body;
  console.log('Customer ID:', customerId); // Log the customer ID
  console.log('Updated customer data:', updatedCustomerData);
  db.query('UPDATE ratemanagement SET ? WHERE id = ?', [updatedCustomerData, customerId], (err, result) => {
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
// collect data for Rate Management table
app.get('/ratemanagement', (req, res) => {
  db.query('SELECT * FROM ratemanagement', (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});
// End Rate Management database
// -----------------------------------------------------------------------------------------------------------
// Ratetype Database
// Add Ratetype database
app.post('/ratetype', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO ratetype SET ?', bookData, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    console.log('Data inserted into MySQL');
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});
// delete Ratetype data
app.delete('/ratetype/:driverid', (req, res) => {
  const driverid = req.params.driverid;
  console.log('Customer ID:', driverid); // Log the customer ID
  console.log('DELETE query:', 'DELETE FROM ratetype WHERE driverid = ?', driverid);
  db.query('DELETE FROM ratetype WHERE driverid = ?', driverid, (err, result) => {
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
// update Ratetype details
app.put('/ratetype/:driverid', (req, res) => {
  const driverid = req.params.driverid;
  const updatedCustomerData = req.body;
  db.query('UPDATE ratetype SET ? WHERE driverid = ?', [updatedCustomerData, driverid], (err, result) => {
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
// collect data for Ratetype table
app.get('/ratetype', (req, res) => {
  db.query('SELECT * FROM ratetype', (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});
// End Ratetype database
// -----------------------------------------------------------------------------------------------------------
// RateValidity Database
// Add RateValidity database
app.post('/ratevalidity', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO ratevalidity SET ?', bookData, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    console.log('Data inserted into MySQL');
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});
// delete RateValidity data
app.delete('/ratevalidity/:driverid', (req, res) => {
  const driverid = req.params.driverid;
  console.log('Customer ID:', driverid); // Log the customer ID
  console.log('DELETE query:', 'DELETE FROM ratevalidity WHERE driverid = ?', driverid);
  db.query('DELETE FROM ratevalidity WHERE driverid = ?', driverid, (err, result) => {
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
// update RateValidity details
app.put('/ratevalidity/:driverid', (req, res) => {
  const driverid = req.params.driverid;
  const updatedCustomerData = req.body;
  db.query('UPDATE ratevalidity SET ? WHERE driverid = ?', [updatedCustomerData, driverid], (err, result) => {
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
// collect data for RateValidity table
app.get('/ratevalidity', (req, res) => {
  db.query('SELECT * FROM ratevalidity', (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});
// End RateValidity database
// -----------------------------------------------------------------------------------------------------------
// division Database
// Add division database
app.post('/division', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO division SET ?', bookData, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    console.log('Data inserted into MySQL');
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});
// delete division data
app.delete('/division/:driverid', (req, res) => {
  const driverid = req.params.driverid;
  console.log('Customer ID:', driverid); // Log the customer ID
  console.log('DELETE query:', 'DELETE FROM division WHERE driverid = ?', driverid);
  db.query('DELETE FROM division WHERE driverid = ?', driverid, (err, result) => {
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
// update RateValidity details
app.put('/division/:driverid', (req, res) => {
  const driverid = req.params.driverid;
  const updatedCustomerData = req.body;
  db.query('UPDATE division SET ? WHERE driverid = ?', [updatedCustomerData, driverid], (err, result) => {
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
// collect data for RateValidity table
app.get('/division', (req, res) => {
  db.query('SELECT * FROM division', (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});
// End RateValidity database
// -----------------------------------------------------------------------------------------------------------
// driverbatarate Database
// Add driverbatarate database
app.post('/driverbatarate', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO driverbatarate SET ?', bookData, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    console.log('Data inserted into MySQL');
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});
// delete division data
app.delete('/driverbatarate/:id', (req, res) => {
  const driverid = req.params.id;
  console.log('Customer ID:', driverid); // Log the customer ID
  console.log('DELETE query:', 'DELETE FROM driverbatarate WHERE id = ?', driverid);
  db.query('DELETE FROM driverbatarate WHERE id = ?', driverid, (err, result) => {
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
// update RateValidity details
app.put('/driverbatarate/:id', (req, res) => {
  const driverid = req.params.id;
  const updatedCustomerData = req.body;
  db.query('UPDATE driverbatarate SET ? WHERE id = ?', [updatedCustomerData, driverid], (err, result) => {
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
// collect data for RateValidity table
app.get('/driverbatarate', (req, res) => {
  db.query('SELECT * FROM driverbatarate', (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});
// End RateValidity database
// -----------------------------------------------------------------------------------------------------------
// Employees Database
// Add Employees database
app.post('/employees', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO employees SET ?', bookData, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    console.log('Data inserted into MySQL');
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});
// delete Employees data
app.delete('/employees/:empid', (req, res) => {
  const empid = req.params.empid;
  console.log('empid:', empid); // Log the customer ID
  console.log('DELETE query:', 'DELETE FROM employees WHERE empid = ?', empid);
  db.query('DELETE FROM employees WHERE empid = ?', empid, (err, result) => {
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
// update Employees details
app.put('/employees/:empid', (req, res) => {
  const empid = req.params.empid;
  const updatedCustomerData = req.body;
  console.log('empid:', empid); // Log the customer ID
  console.log('Updated customer data:', updatedCustomerData);
  db.query('UPDATE employees SET ? WHERE empid = ?', [updatedCustomerData, empid], (err, result) => {
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
// collect data for Employees table
app.get('/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});
// End Employees database
// -----------------------------------------------------------------------------------------------------------
// Billing Database
// Add Billing database
app.post('/billing', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO billing SET ?', bookData, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    console.log('Data inserted into MySQL');
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});
// delete Billing data
app.delete('/billing/:tripid', (req, res) => {
  const tripid = req.params.tripid;
  console.log('tripid:', tripid); // Log the Billing
  console.log('DELETE query:', 'DELETE FROM billing WHERE tripid = ?', tripid);
  db.query('DELETE FROM billing WHERE tripid = ?', tripid, (err, result) => {
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
// update Billing details
app.put('/billing/:tripid', (req, res) => {
  const tripid = req.params.tripid;
  const updatedCustomerData = req.body;
  console.log('tripid:', tripid); // Log the Billing
  console.log('Updated billing data:', updatedCustomerData);
  db.query('UPDATE billing SET ? WHERE tripid = ?', [updatedCustomerData, tripid], (err, result) => {
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
// collect data for Billing table
app.get('/billing', (req, res) => {
  db.query('SELECT * FROM billing', (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});
// End Billing database
// -----------------------------------------------------------------------------------------------------------
// cashflow Database
// Add pettycash database
app.post('/pettycash', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO pettycash SET ?', bookData, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    console.log('Data inserted into MySQL');
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});
// delete Billing data
app.delete('/pettycash/:voucherno', (req, res) => {
  const voucherno = req.params.voucherno;
  db.query('DELETE FROM pettycash WHERE voucherno = ?', voucherno, (err, result) => {
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
// update pettycash details
app.put('/pettycash/:voucherno', (req, res) => {
  const voucherno = req.params.voucherno;
  const updatedCustomerData = req.body;
  console.log('voucherno:', voucherno); // Log the pettycash
  console.log('Updated pettycash data:', updatedCustomerData);
  db.query('UPDATE pettycash SET ? WHERE voucherno = ?', [updatedCustomerData, voucherno], (err, result) => {
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
// collect data for pettycash table

// filter data from pettycash database
app.get('/pettycash', (req, res) => {
  const { fromDate, toDate } = req.query;
  let query = 'SELECT * FROM pettycash WHERE 1=1';
  let params = [];
  if (fromDate && toDate) {
    query += ' AND date BETWEEN ? AND ?';
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
// End pettycash database
// -----------------------------------------------------------------------------------------------------------
// Add payroll database
app.post('/payroll', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO payroll SET ?', bookData, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    console.log('Data inserted into MySQL');
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});
// delete payroll data
app.delete('/payroll/:empid', (req, res) => {
  const empid = req.params.empid;
  db.query('DELETE FROM payroll WHERE empid = ?', empid, (err, result) => {
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
// update payroll details
app.put('/payroll/:empid', (req, res) => {
  const empid = req.params.empid;
  const updatedCustomerData = req.body;
  console.log('empid:', empid); // Log the pettycash
  console.log('Updated payroll data:', updatedCustomerData);
  db.query('UPDATE payroll SET ? WHERE empid = ?', [updatedCustomerData, voucherno], (err, result) => {
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

// End payroll database
// -----------------------------------------------------------------------------------------------------------
// Employee pay slip data collect:

app.get('/payroll', (req, res) => {
  const { empid, fromDate, toDate } = req.query;
  // Query and parameters for fetching booking details based on the query parameters
  let query = 'SELECT * FROM payroll WHERE 1=1';
  let params = [];
  if (empid) {
    query += ' AND empid = ?';
    params.push(empid);
  }

  if (fromDate && toDate) {
    query += ' AND salarydate BETWEEN ? AND ?';
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
// End Employee pay slip page database
// -----------------------------------------------------------------------------------------------------------
// Options/Fuel Details
// Add Fuel Details database
app.post('/fueldetails', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO fueldetails SET ?', bookData, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    console.log('Data inserted into MySQL');
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});
// delete Fuel Details data
app.delete('/fueldetails/:VehicleNo', (req, res) => {
  const VehicleNo = req.params.VehicleNo;
  console.log('Customer ID:', VehicleNo); // Log the customer ID
  console.log('DELETE query:', 'DELETE FROM fueldetails WHERE VehicleNo = ?', customerId);
  db.query('DELETE FROM fueldetails WHERE VehicleNo = ?', VehicleNo, (err, result) => {
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
// update Fuel Details
app.put('/fueldetails/:VehicleNo', (req, res) => {
  const VehicleNo = req.params.VehicleNo;
  const updatedCustomerData = req.body;
  console.log('Customer ID:', VehicleNo); // Log the customer ID
  console.log('Updated customer data:', updatedCustomerData);
  db.query('UPDATE fueldetails SET ? WHERE VehicleNo = ?', [updatedCustomerData, VehicleNo], (err, result) => {
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
// collect data for Fuel Details table
app.get('/fueldetails', (req, res) => {
  db.query('SELECT * FROM fueldetails', (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});
// End Fuel Details database
// -----------------------------------------------------------------------------------------------------------
// mainsettings Database
// Add taxsettings database
app.post('/taxsettings', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO taxsettings SET ?', bookData, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    console.log('Data inserted into MySQL');
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});
// delete taxsettings data
app.delete('/taxsettings/:id', (req, res) => {
  const id = req.params.id;
  console.log('Customer ID:', id); // Log the customer ID
  console.log('DELETE query:', 'DELETE FROM taxsettings WHERE id = ?', id);
  db.query('DELETE FROM taxsettings WHERE id = ?', id, (err, result) => {
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
// update taxsettings details
app.put('/taxsettings/:id', (req, res) => {
  const id = req.params.id;
  const updatedCustomerData = req.body;
  console.log('Customer ID:', id); // Log the customer ID
  console.log('Updated customer data:', updatedCustomerData);
  db.query('UPDATE taxsettings SET ? WHERE id = ?', [updatedCustomerData, id], (err, result) => {
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
// collect data for taxsettings table
app.get('/taxsettings', (req, res) => {
  db.query('SELECT * FROM taxsettings', (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL:', err);
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});
// End Customer Master database
// -----------------------------------------------------------------------------------------------------------
//signature database
app.post('/api/saveSignature', (req, res) => {
  const { signatureData } = req.body;

  const base64Data = signatureData.replace(/^data:image\/png;base64,/, '');
  const imageBuffer = Buffer.from(base64Data, 'base64');

  const imageName = `signature-${Date.now()}.png`; // Generate a unique image name
  const imagePath = path.join(__dirname, 'path_to_save_images', imageName);

  fs.writeFile(imagePath, imageBuffer, (error) => {
    if (error) {
      console.error('Error saving signature image:', error);
      res.status(500).json({ error: 'Failed to save signature' });
    } else {
      const sql = 'INSERT INTO signatures (signature_path) VALUES (?)';
      db.query(sql, [imagePath], (dbError, results) => {
        if (dbError) {
          console.error('Error saving signature data:', dbError);
          res.status(500).json({ error: 'Failed to save signature' });
        } else {
          res.json({ message: 'Signature saved successfully' });
        }
      });
    }
  });
});
//End signature database
// -----------------------------------------------------------------------------------------------------------

const port = 8081;
app.listen(port, () => {
  console.log(`Connected to backend on port ${port}`);
});
