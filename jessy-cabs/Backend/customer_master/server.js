//Database connection for TAAF Appliction this file contain Add, Delete, Collect data from mysql, and Update functions:  
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs'); // Import the fs module
const db = require('../db');
const uuid = require('uuid');
const multer = require('multer');
const path = require('path'); // Import the path module
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
  return res.json({ message: "Hello from the backend side" });
});

//connect using route
const customerRoutes = require('./Router/customer/Customer');
const accountinfoRoutes = require('./Router/supplier/accountinginfo');
const vehicleinfoRouter = require('./Router/vehicle Info/vehicleinfo');
const bookingRouter = require('./Router/Booking/booking');
const bookingcopyRouter = require('./Router/Booking/bookingcopy');
const bookingchartRouter = require('./Router/Booking/bookingchart');
const tripsheetRouter = require('./Router/tripsheet/tripsheet');
const pendingRouter = require('./Router/Recieved/pending');
const closedRouter = require('./Router/Dispatch/closed');
const dispatchRouter = require('./Router/Dispatch/dispatch');
const driverRouter = require('./Router/driver/driver');
const usercreationRouter = require('./Router/usercreation/usercreation');
const stationcreationRouter = require('./Router/stationcreation/stationcreation');
const packagerateRouter = require('./Router/Ratemanagement/packagerate');
const ratetypeRouter = require('./Router/Ratetype/ratetype');
const ratevalidityRouter = require('./Router/Ratetype/ratevalidity');
const divionRouter = require('./Router/Ratetype/division');
const driverbataRouter = require('./Router/Ratemanagement/driverbatarate');
const billingRouter = require('./Router/Billing/billing');
const bankaccountRouter = require('./Router/Billing/bankaccountdetails/backaccountddetails');
const paymentRouter = require('./Router/Billing/payment/payment');
const triplistRouter = require('./Router/Transfer/transferlist');
const pettycashRouter = require('./Router/cashflow/pettycash');
const payrollRouter = require('./Router/cashflow/payroll');
const fueldetailsRouter = require('./Router/fueldetails/mileage');
const taxsettingRouter = require('./Router/mainsetting/taxsetting');
const drivercreationRouter = require('./Router/Driverapplogin/driverapplogin');
const assetsRouer = require('./Router/cashflow/assets');
const driveractiveRouter = require('./Router/tripsheet/appuserlist');
const sendsmsRouter = require('./Router/SMS/sms');
const employeeRouter = require('./Router/Employee/employee');

// -----------------------------------------------------------------------------------------------------------
app.use('/', customerRoutes);// // Customer Master Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', accountinfoRoutes); // // account_info database:-
// -----------------------------------------------------------------------------------------------------------
app.use('/', vehicleinfoRouter); // Add vehicle_info database
// -----------------------------------------------------------------------------------------------------------
app.use('/', bookingRouter); // Booking page database:-
// -----------------------------------------------------------------------------------------------------------
app.use('/', bookingcopyRouter); // booking copy data collect: 
// -----------------------------------------------------------------------------------------------------------
app.use('/', triplistRouter); // booking copy data collect:
// -----------------------------------------------------------------------------------------------------------
app.use('/', bookingchartRouter); // booking CHART data collect
// -----------------------------------------------------------------------------------------------------------
app.use('/', tripsheetRouter); // trip sheet database:
// -----------------------------------------------------------------------------------------------------------
app.use('/', pendingRouter); // order/Received/Pending data collect from database
// -----------------------------------------------------------------------------------------------------------
app.use('/', sendsmsRouter); // order/Received/Pending data collect from database
// -----------------------------------------------------------------------------------------------------------
app.use('/', closedRouter); // order/Dispatch/closed data collect from database
// -----------------------------------------------------------------------------------------------------------
app.use('/', dispatchRouter); // order/Dispatch/closed data collect from database
// -----------------------------------------------------------------------------------------------------------
app.use('/', driverRouter); // driver master database
// -----------------------------------------------------------------------------------------------------------
app.use('/', usercreationRouter); // Settings page database:
// -----------------------------------------------------------------------------------------------------------
app.use('/', stationcreationRouter); // Station Creation Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', packagerateRouter); // Rate Management Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', ratetypeRouter); // Ratetype Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', ratevalidityRouter); // RateValidity Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', divionRouter); // division Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', driveractiveRouter); // division Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', driverbataRouter); // driverbatarate Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', drivercreationRouter); // driverbatarate Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', employeeRouter); // Employees Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', billingRouter); // Billing Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', bankaccountRouter); // Billing Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', paymentRouter); // Billing Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', pettycashRouter); // cashflow Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', assetsRouer); // cashflow Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', payrollRouter); // Add payroll database
// -----------------------------------------------------------------------------------------------------------
app.use('/', fueldetailsRouter); // Options/Fuel Details
// -----------------------------------------------------------------------------------------------------------
app.use('/', taxsettingRouter); // mainsettings Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', taxsettingRouter);//signature database
// -----------------------------------------------------------------------------------------------------------
//map image upload
app.post('/mapuploads', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  const fileData = {
    path: req.file.path.replace(/\\/g, '/').replace(/^uploads\//, ''),
    tripid: req.body.tripid,
  };
  const query = 'INSERT INTO mapimage SET ?';
  db.query(query, fileData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error storing file in the database.' });
    }
    return res.status(200).json({ message: 'File uploaded and data inserted successfully.' });
  });
});
//get map image from the folder
const mapimageDirectory = path.join(__dirname, 'uploads');
app.use('/mapimages', express.static(mapimageDirectory));
app.get('/get-mapimage/:tripid', (req, res) => {
  const { tripid } = req.params;
  const query = 'SELECT path FROM mapimage WHERE tripid = ?';
  db.query(query, [tripid], (err, results) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }
    if (results.length === 0) {
      // No record found for the given tripid
      return res.status(404).send('Image not found');
    }
    const imagePath = path.join(mapimageDirectory, results[0].path);
    res.sendFile(imagePath, (err) => {
      if (err) {
        return res.status(500).send('Internal Server Error');
      }
    });
  });
});
//file upload in tripsheet
app.post('/uploads', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  const fileData = {
    name: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    path: req.file.path.replace(/\\/g, '/').replace(/^uploads\//, ''),
    tripid: req.body.tripid,
    bookingno: req.body.bookingno,
    empid: req.body.empid,
    // documenttype: req.body.documenttype, 
    vehicleId: req.body.vehicleId,
    // vehicleId: req.body.documenttype,
  };
  const query = 'INSERT INTO tripsheetupload SET ?';
  db.query(query, fileData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error storing file in the database.' });
    }
    return res.status(200).json({ message: 'File uploaded and data inserted successfully.' });
  });
});
//get image from the folder
const imageDirectory = path.join(__dirname, 'uploads');
// Serve static files from the imageDirectory
app.use('/images', express.static(imageDirectory));
// Example route to serve an image by its filename
app.get('/get-image/:filename', (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(imageDirectory, filename);
  fs.access(imagePath, fs.constants.R_OK, (err) => {
    if (err) {
      res.status(404).send('Image not found');
    } else {
      res.sendFile(imagePath, (err) => {
        if (err) {
          res.status(404).send('Image not found');
        }
      });
    }
  });
});
//end tripsheet file upload
// login page databse fetch:
app.post('/login', (req, res) => {
  const { username, userpassword } = req.body;
  if (!username || !userpassword) {
    return res.status(400).json({ error: 'Username and userpassword are required.' });
  }
  db.query('SELECT * FROM usercreation WHERE username = ? AND userpassword = ?', [username, userpassword], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve user details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials. Please check your username and userpassword.' });
    }
    return res.status(200).json({ message: 'Login successful', user: result[0] });
  });
});
// for save map image
const basemapImagePath = path.join(__dirname, 'path_to_save_mapimages');
app.post('/api/savemapimage', (req, res) => {
  const { mapData } = req.body;
  const base64Data = mapData.replace(/^data:image\/png;base64,/, '');
  const imageBuffer = Buffer.from(base64Data, 'base64');
  const imageName = `map-${Date.now()}.png`;
  const imagePath = path.join(basemapImagePath, imageName); // Use the base path
  fs.writeFile(imagePath, imageBuffer, (error) => {
    if (error) {
      res.status(500).json({ error: 'Failed to save map image' });
    } else {
      const relativeImagePath = path.relative(basemapImagePath, imagePath); // Calculate relative path
      const sql = 'INSERT INTO mapimage (mapimage_path) VALUES (?)';
      db.query(sql, [relativeImagePath], (dbError, results) => {
        if (dbError) {
          res.status(500).json({ error: 'Failed to save map image path to database' });
        } else {
          res.json({ message: 'Map image saved successfully' });
        }
      });
    }
  });
});
//for save signature image
const baseImagePath = path.join(__dirname, 'path_to_save_images');
app.post('/api/saveSignature', (req, res) => {
  const { signatureData } = req.body;
  const base64Data = signatureData.replace(/^data:image\/png;base64,/, '');
  const imageBuffer = Buffer.from(base64Data, 'base64');
  const imageName = `signature-${Date.now()}.png`;
  const imagePath = path.join(baseImagePath, imageName); // Use the base path
  fs.writeFile(imagePath, imageBuffer, (error) => {
    if (error) {
      res.status(500).json({ error: 'Failed to save signature' });
    } else {
      const relativeImagePath = path.relative(baseImagePath, imagePath); // Calculate relative path
      const sql = 'INSERT INTO signatures (signature_path) VALUES (?)';
      db.query(sql, [relativeImagePath], (dbError, results) => {
        if (dbError) {
          res.status(500).json({ error: 'Failed to save signature' });
        } else {
          res.json({ message: 'Signature saved successfully' });
        }
      });
    }
  });
});
//End signature database
//get signature 
const signatureDirectory = path.join(__dirname, 'path_to_save_images');
app.use('/signimages', express.static(signatureDirectory));
app.get('/get-signimage/:tripid', (req, res) => {
  const { tripid } = req.params;
  // const query = 'SELECT signature_path FROM signatures WHERE tripid = ?';
  const query = 'SELECT signature_path AS path FROM signatures WHERE tripid = ?';
  db.query(query, [tripid], (err, results) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }
    if (results.length === 0) {
      // No record found for the given tripid
      return res.status(404).send('Image not found');
    }
    const imagePath = path.join(signatureDirectory, results[0].path);
    res.sendFile(imagePath, (err) => {
      if (err) {
        return res.status(500).send('Internal Server Error');
      }
    });
  });
});
//get images from attacheed

const attachedDirectory = path.join(__dirname, 'uploads');
// Serve static files from the imageDirectory
app.use('/images', express.static(attachedDirectory));
// Example route to serve an image by its filename
app.get('/get-attachedimage/:tripid', (req, res) => {
  const { tripid } = req.params;
  const query = 'SELECT path FROM tripsheetupload WHERE tripid = ?';
  db.query(query, [tripid], (err, results) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }
    if (results.length === 0) {
      // No record found for the given tripid
      return res.status(404).send('Image not found');
    }
    const imagePath = path.join(attachedDirectory, results[0].path);
    res.sendFile(imagePath, (err) => {
      if (err) {
        return res.status(500).send('Internal Server Error');
      }
    });
  });
});
// -----------------------------------------------------------------------------------------------------------
// Endpoint to generate a new link based on tripid
app.post('/generate-link/:tripid', (req, res) => {
  const tripid = req.params.tripid; // Use req.params to access route parameters
  const link = `http://localhost:3000/onlinedigital/digitalsignature?tripid=${tripid}`;
  res.json({ link });
});

const port = 8081;
app.listen(port, () => {
  console.log(`Connected to backend on port ${port}`);
});