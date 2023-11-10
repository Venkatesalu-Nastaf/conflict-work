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
const pettycashRouter = require('./Router/cashflow/pettycash');
const payrollRouter = require('./Router/cashflow/payroll');
const fueldetailsRouter = require('./Router/fueldetails/mileage');
const taxsettingRouter = require('./Router/mainsetting/taxsetting');
const drivercreationRouter = require('./Router/Driverapplogin/driverapplogin');
const assetsRouer = require('./Router/cashflow/assets');
const driveractiveRouter = require('./Router/tripsheet/appuserlist');
const sendsmsRouter = require('./Router/SMS/sms');
// const signatureRouter = require('./Router/signature/signature');


// -----------------------------------------------------------------------------------------------------------
// // Customer Master Database
app.use('/', customerRoutes);
// // End Customer Master database
// -----------------------------------------------------------------------------------------------------------
// // Supplier Master Database:
// // account_info database:-
app.use('/', accountinfoRoutes);
// // End account_info database
// -----------------------------------------------------------------------------------------------------------
// vehicle_info database:-
// Add vehicle_info database
app.use('/', vehicleinfoRouter);
// end vehicle_info database
// -----------------------------------------------------------------------------------------------------------
// Booking database:
// Booking page database:-
// Add Booking page database
app.use('/', bookingRouter);
//end online-booking mail
//End booking page database 
// -----------------------------------------------------------------------------------------------------------
// booking copy data collect:
app.use('/', bookingcopyRouter);
// End booking copy page database
// -----------------------------------------------------------------------------------------------------------
// booking CHART data collect
app.use('/', bookingchartRouter);
// End booking CHART database
// -----------------------------------------------------------------------------------------------------------
// trip sheet database:
app.use('/', tripsheetRouter);
// End tripsheet database

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
    // documenttype: req.body.documenttype, 
    vehicleId: req.body.vehicleId,
    // vehicleId: req.body.documenttype,
  };
  const query = 'INSERT INTO tripsheetupload SET ?';
  db.query(query, fileData, (err, result) => {
    if (err) {
      console.error('Error storing file in the database:', err);
      return res.status(500).json({ error: 'Error storing file in the database.' });
    }
    return res.status(200).json({ message: 'File uploaded and data inserted successfully.' });
  });
});
//space
const imageDirectory = path.join(__dirname, 'uploads');
// Serve static files from the imageDirectory
app.use('/images', express.static(imageDirectory));
// Example route to serve an image by its filename
app.get('/get-image/:filename', (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(imageDirectory, filename);
  fs.access(imagePath, fs.constants.R_OK, (err) => {
    if (err) {
      console.error('Error accessing image:', err);
      res.status(404).send('Image not found');
    } else {
      res.sendFile(imagePath, (err) => {
        if (err) {
          console.error('Error sending image:', err);
          res.status(404).send('Image not found');
        }
      });
    }
  });
});
//end tripsheet file upload
// -----------------------------------------------------------------------------------------------------------
// order/Received/Pending data collect from database
app.use('/', pendingRouter);
// End 
// -----------------------------------------------------------------------------------------------------------
// order/Received/Pending data collect from database
app.use('/', sendsmsRouter);
// End 
// -----------------------------------------------------------------------------------------------------------
// order/Dispatch/closed data collect from database
app.use('/', closedRouter);
// End order/Dispatch/closed database
// -----------------------------------------------------------------------------------------------------------
// order/Dispatch/closed data collect from database
app.use('/', dispatchRouter);
// End order/Dispatch/closed database
// -----------------------------------------------------------------------------------------------------------
// driver master database
app.use('/', driverRouter);
// End driver master database
// -----------------------------------------------------------------------------------------------------------
// Settings page database:
app.use('/', usercreationRouter);
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
app.use('/', stationcreationRouter);
// End  Station Creation database
// -----------------------------------------------------------------------------------------------------------
// Rate Management Database
app.use('/', packagerateRouter);
// End Rate Management database
// -----------------------------------------------------------------------------------------------------------
// Ratetype Database
app.use('/', ratetypeRouter);
// End Ratetype database
// -----------------------------------------------------------------------------------------------------------
// RateValidity Database
app.use('/', ratevalidityRouter);
// End RateValidity database
// -----------------------------------------------------------------------------------------------------------
// division Database
app.use('/', divionRouter);
// End RateValidity database
// -----------------------------------------------------------------------------------------------------------
// division Database
app.use('/', driveractiveRouter);
// End RateValidity database
// -----------------------------------------------------------------------------------------------------------
// driverbatarate Database
app.use('/', driverbataRouter);
// End RateValidity database
// -----------------------------------------------------------------------------------------------------------
// driverbatarate Database
app.use('/', drivercreationRouter);
// End RateValidity database
// -----------------------------------------------------------------------------------------------------------
// Employees Database
// app.use('/', employeeRouter);
// End Employees database
// -----------------------------------------------------------------------------------------------------------
// Billing Database
app.use('/', billingRouter);
// End Billing database
// -----------------------------------------------------------------------------------------------------------
// Billing Database
app.use('/', bankaccountRouter);
// End Billing database
// -----------------------------------------------------------------------------------------------------------
// Billing Database
app.use('/', paymentRouter);
// End Billing database
// -----------------------------------------------------------------------------------------------------------
// cashflow Database
app.use('/', pettycashRouter);
// End pettycash database
// -----------------------------------------------------------------------------------------------------------
// cashflow Database
app.use('/', assetsRouer);
// End pettycash database
// -----------------------------------------------------------------------------------------------------------
// Add payroll database
app.use('/', payrollRouter);
// End payroll database
// -----------------------------------------------------------------------------------------------------------
// Options/Fuel Details
app.use('/', fueldetailsRouter);
// End Fuel Details database
// -----------------------------------------------------------------------------------------------------------
// mainsettings Database
app.use('/', taxsettingRouter);
// End Customer Master database
// -----------------------------------------------------------------------------------------------------------
//signature database
app.use('/', taxsettingRouter);
//End signature database
// -----------------------------------------------------------------------------------------------------------
//signature database
// app.use('/', signatureRouter);

// const baseImagePath = path.join(__dirname, 'path_to_save_images');

// app.post('/api/saveSignature', (req, res) => {
//     const { tripid, signatureData } = req.body;

//     const base64Data = signatureData.replace(/^data:image\/png;base64,/, '');
//     const imageBuffer = Buffer.from(base64Data, 'base64');

//     const imageName = `signature-${Date.now()}.png`;
//     const imagePath = path.join(baseImagePath, imageName); // Use the base path

//     fs.writeFile(imagePath, imageBuffer, (error) => {
//         if (error) {
//             res.status(500).json({ error: 'Failed to save signature' });
//         } else {
//             const relativeImagePath = path.relative(baseImagePath, imagePath); // Calculate relative path
//             const sql = 'INSERT INTO signatures (tripid, signature_path) VALUES (?, ?)';
//             db.query(sql, [tripid, relativeImagePath], (dbError, results) => {
//                 if (dbError) {
//                     res.status(500).json({ error: 'Failed to save signature' });
//                 } else {
//                     res.json({ message: 'Signature saved successfully' });
//                 }
//             });
//         }
//     });
// });



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
// -----------------------------------------------------------------------------------------------------------

// Endpoint to generate a new link based on tripid
app.post('/generate-link/:tripid', (req, res) => {
  const tripid = req.params.tripid; // Use req.params to access route parameters
  const link = `http://localhost:3000/onlinedigital/digitalsignature?tripid=${tripid}`;
  res.json({ link });
});

// Endpoint to check if a link is still valid
// app.get('/check-link/:token', (req, res) => {
//   const token = req.params.token;
//   if (tripSheets[token]) {
//     res.json(tripSheets[token]);
//   } else {
//     res.status(404).json({ isSignatureSubmitted: false });
//   }
// });

// Endpoint to submit a signature for a trip
// app.post('/submit-signature', (req, res) => {
//   const tripid = req.body.tripid;
//   const token = Object.keys(tripSheets).find((t) => tripSheets[t].tripid === tripid);
//   if (token) {
//     tripSheets[token].isSignatureSubmitted = true;
//     res.json({ message: 'Signature submitted successfully' });
//   } else {
//     res.status(404).json({ error: 'Link not found or expired' });
//   }
// });

const port = 8081;
app.listen(port, () => {
  console.log(`Connected to backend on port ${port}`);
});
