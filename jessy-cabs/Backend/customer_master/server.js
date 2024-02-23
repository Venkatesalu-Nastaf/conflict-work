//Database connection for Nastaf Appliction this file contain Add, Delete, Collect data from mysql, and Update functions:  
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const db = require('../db');
const uuid = require('uuid');
const multer = require('multer');
const path = require('path');
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
const companyRoutes = require('./Router/organization/organization');
const taxsettingRoutes = require('./Router/taxsetting/taxsettings');

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
app.use('/', companyRoutes);//signature database
// -----------------------------------------------------------------------------------------------------------
app.use('/', taxsettingRoutes);//signature database
// -----------------------------------------------------------------------------------------------------------

//theme update in user creation
app.post('/updatethemename', (req, res) => {
  const { userid, theme } = req.body;
  const query = 'UPDATE usercreation SET theme = ? WHERE userid IN (?)';
  db.query(query, [theme, userid], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.status(200).json({ message: 'Status updated successfully' });
  });
});


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
app.get('/getmapimages/:tripid', (req, res) => {
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
    organizationname: req.body.organizationname,
    userid: req.body.userid,
    vehicleId: req.body.vehicleId,
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

//tripsheet  GPS Att fill upload

const storagetripsheet = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }

})

const uploadtripsheet = multer({
  storage: storagetripsheet
})

app.put('/tripsheet_uploads/:id', uploadtripsheet.single('image'), (req, res) => {
  const userId = req.params.id;
  const fileName = req.file.filename;
  const filename = req.file.originalname;

  const insertQuery = `INSERT INTO tripsheetupload (tripid, path, name) VALUES (?, ?, ?)`;
  db.query(insertQuery, [userId, fileName, filename], (err, result) => {
    if (err) {
      return res.status(500).json({ Message: "Error inserting profile picture", err });
    }
    return res.status(200).json({ Status: "success" });
  })
});

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
//for save signature image
// const baseImagetripidPath = path.join(__dirname, 'path_to_save_images');
// app.post('/api/saveSignaturewtid', (req, res) => {
//   const { signatureData, tripId, uniqueno } = req.body;
//   const base64Data = signatureData.replace(/^data:image\/png;base64,/, '');
//   const imageBuffer = Buffer.from(base64Data, 'base64');
//   const imageName = `signature-${Date.now()}.png`;
//   const imagePath = path.join(baseImagetripidPath, imageName); // Use the base path
//   fs.writeFile(imagePath, imageBuffer, (error) => {
//     if (error) {
//       res.status(500).json({ error: 'Failed to save signature' });
//     } else {
//       const relativeImagePath = path.relative(baseImagetripidPath, imagePath);
//       const sql = 'UPDATE signatures SET signature_path = ? WHERE tripid = ? AND unique_number = ?';
//       db.query(sql, [relativeImagePath, tripId, uniqueno], (dbError, results) => {
//         if (dbError) {
//           res.status(500).json({ error: 'Failed to save signature' });
//         } else {
//           res.json({ message: 'Signature saved successfully' });
//         }
//       });
//       const uniqueNumber = generateUniqueNumbers();
//       const sql2 = 'UPDATE signatures SET unique_number = ? WHERE tripid = ? ';
//       db.query(sql2, [uniqueNumber, tripId], (dbError, results) => {
//         if (dbError) {
//           res.status(500).json({ error: 'Failed to save signature' });
//         } else {
//           res.json({ message: 'Signature saved successfully' });
//         }
//       });
//     }
//   });
// });

const baseImagetripidPath = path.join(__dirname, 'path_to_save_images');
app.post('/api/saveSignaturewtid', (req, res) => {
  const { signatureData, tripId, uniqueno } = req.body;
  const base64Data = signatureData.replace(/^data:image\/png;base64,/, '');
  const imageBuffer = Buffer.from(base64Data, 'base64');
  const imageName = `signature-${Date.now()}.png`;
  const imagePath = path.join(baseImagetripidPath, imageName); // Use the base path
  fs.writeFile(imagePath, imageBuffer, (error) => {
    if (error) {
      res.status(500).json({ error: 'Failed to save signature' });
    } else {
      const relativeImagePath = path.relative(baseImagetripidPath, imagePath);
      const sql = 'UPDATE signatures SET signature_path = ? WHERE tripid = ? AND unique_number = ?';
      db.query(sql, [relativeImagePath, tripId, uniqueno], (dbError, results) => {
        if (dbError) {
          res.status(500).json({ error: 'Failed to save signature' });
        } else {
          const uniqueNumber = generateUniqueNumbers();
          const sql2 = 'UPDATE signatures SET unique_number = ? WHERE tripid = ? ';
          db.query(sql2, [uniqueNumber, tripId], (dbError, results) => {
            if (dbError) {
              res.status(500).json({ error: 'Failed to save unique number' });
            } else {
              res.json({ message: 'Signature and unique number saved successfully' });
            }
          });
        }
      });
    }
  });
});
function generateUniqueNumbers() {
  return Math.floor(10000 + Math.random() * 90000);
}
//End signature database
// //get signature 
// const signatureDirectory = path.join(__dirname, 'path_to_save_images');
// app.use('/signimages', express.static(signatureDirectory));
// app.get('/get-signimage/:tripid', (req, res) => {
//   const { tripid } = req.params;
//   // const query = 'SELECT signature_path FROM signatures WHERE tripid = ?';
//   const query = 'SELECT signature_path AS path FROM signatures WHERE tripid = ?';
//   db.query(query, [tripid], (err, results) => {
//     if (err) {
//       return res.status(500).send('Internal Server Error');
//     }
//     if (results.length === 0) {
//       // No record found for the given tripid
//       return res.status(404).send('Image not found');
//     }
//     if (!results[0].path) {
//       // Handle the case where the path is null or undefined
//       return res.status(500).send('Internal Server Error: Image path is missing');
//     }
//     const imagePath = path.join(signatureDirectory, results[0].path);

//     res.sendFile(imagePath, (err) => {
//       if (err) {
//         return res.status(500).send('Internal Server Error');
//       }
//     });
//   });
// });
// //get images from attacheed


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
    if (!results[0].path) {
      // Handle the case where the path is null or undefined
      return res.status(500).send('Internal Server Error: Image path is missing');
    }
    const imagePath = path.join(signatureDirectory, results[0].path);

    res.sendFile(imagePath, (err) => {
      if (err) {
        return res.status(500).send('Internal Server Error');
      }
    });
  });
});

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
      return res.status(404).send('Images not found');
    }

    const imagePaths = results.map(result => result.path);
    res.json({ imagePaths });
  });
});
//get a booking mail...
const attachedmailDirectory = path.join(__dirname, 'uploads');
const pdfDirectory = path.join(__dirname, 'uploads');
// Serve static files from the imageDirectory
app.use('/images', express.static(attachedmailDirectory));
app.use('/pdf', express.static(pdfDirectory));
// Example route to serve an image by its filename
app.get('/get-attachedmailimage/:bookingno', (req, res) => {
  const { bookingno } = req.params;
  const query = 'SELECT path FROM tripsheetupload WHERE bookingno = ?';

  db.query(query, [bookingno], (err, results) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }

    if (results.length === 0) {
      // No record found for the given tripid
      return res.status(404).send('Images not found');
    }

    const files = results.map(result => ({
      path: result.path,
      mimetype: result.mimetype // assuming 'type' indicates whether it's an image or PDF
    }));

    res.json({ files });
  });
});

//get image for organization

const companyattachedDirectory = path.join(__dirname, 'uploads');
// Serve static files from the imageDirectory
app.use('/images', express.static(companyattachedDirectory));
// Example route to serve an image by its filename
app.get('/get-companyimage/:tripid', (req, res) => {
  const { tripid } = req.params;
  const query = 'SELECT path FROM tripsheetupload WHERE organizationname = ?';

  db.query(query, [tripid], (err, results) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }

    if (results.length === 0) {
      // No record found for the given tripid
      return res.status(404).send('Images not found');
    }

    const imagePaths = results.map(result => result.path);
    res.json({ imagePaths });
  });
});

//get image for user profile

const userattachedDirectory = path.join(__dirname, 'uploads');
// Serve static files from the imageDirectory
app.use('/images', express.static(userattachedDirectory));
// Example route to serve an image by its filename
app.get('/get-profileimage/:tripid', (req, res) => {
  const { tripid } = req.params;
  const query = 'SELECT path FROM tripsheetupload WHERE userid = ?';

  db.query(query, [tripid], (err, results) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }

    if (results.length === 0) {
      // No record found for the given tripid
      return res.status(404).send('Images not found');
    }

    const imagePaths = results.map(result => result.path);
    res.json({ imagePaths });
  });
});
// -----------------------------------------------------------------------------------------------------------
// Endpoint to generate a new link based on tripid
// app.post('/generate-link/:tripid', (req, res) => {
//   const tripid = req.params.tripid;
//   const checkIfExistsQuery = `SELECT * FROM signatures WHERE tripid = ?`;
//   db.query(checkIfExistsQuery, [tripid], (err, rows) => {
//     if (err) {
//       return res.status(500).json({ Message: "Error checking profile existence", err });
//     }
//     if (rows.length > 0) {
//     } else {
//       db.query('INSERT INTO signatures SET tripid = ?', [tripid]);
//     }
//   });
//   const link = `http://localhost:3000/onlinedigital/digitalsignature?tripid=${tripid}`;
//   res.json({ link });
// });

// app.post('/generate-link/:tripid', (req, res) => {
//   const tripid = req.params.tripid;
//   const checkIfExistsQuery = `SELECT * FROM signatures WHERE tripid = ?`;
//   db.query(checkIfExistsQuery, [tripid], (err, rows) => {
//     if (err) {
//       return res.status(500).json({ Message: "Error checking profile existence", err });
//     }
//     if (rows.length > 0) {
//       const uniqueNumber = generateUniqueNumber();
//       const query = 'UPDATE signatures SET unique_number = ? WHERE tripid IN (?)';
//       db.query(query, [uniqueNumber, tripid], (err, results) => {
//         if (err) {
//           res.status(500).json({ message: 'Internal server error' });
//           return;
//         }
//         const link = `http://localhost:3000/onlinedigital/digitalsignature?tripid=${tripid}${uniqueNumber}`;
//         res.json({ link });
//         res.status(200).json({ message: 'Status updated successfully' });
//       });
//     } else {
//       const uniqueNumber = generateUniqueNumber();
//       db.query('INSERT INTO signatures (tripid, unique_number) VALUES (?, ?)', [tripid, uniqueNumber], (insertErr, insertResult) => {
//         if (insertErr) {
//           return res.status(500).json({ Message: "Error inserting new tripid", err: insertErr });
//         }
//         const link = `http://localhost:3000/onlinedigital/digitalsignature?tripid=${tripid}${uniqueNumber}`;
//         res.json({ link });
//       });
//     }
//   });
// });

app.post('/generate-link/:tripid', (req, res) => {
  const tripid = req.params.tripid;
  const checkIfExistsQuery = `SELECT * FROM signatures WHERE tripid = ?`;
  db.query(checkIfExistsQuery, [tripid], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Error checking profile existence", error: err });
    }
    if (rows.length > 0) {
      const uniqueNumber = generateUniqueNumber();
      const query = 'UPDATE signatures SET unique_number = ? WHERE tripid = ?';
      db.query(query, [uniqueNumber, tripid], (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Internal server error', error: err });
        }
        const link = `http://localhost:3000/onlinedigital/digitalsignature?tripid=${tripid}&uniqueNumber=${uniqueNumber}`;
        res.status(200).json({ message: 'Status updated successfully', link });
      });
    } else {
      const uniqueNumber = generateUniqueNumber();
      db.query('INSERT INTO signatures (tripid, unique_number) VALUES (?, ?)', [tripid, uniqueNumber], (insertErr, insertResult) => {
        if (insertErr) {
          return res.status(500).json({ message: "Error inserting new tripid", error: insertErr });
        }
        const link = `http://localhost:3000/onlinedigital/digitalsignature?tripid=${tripid}&uniqueNumber=${uniqueNumber}`;
        res.status(200).json({ link });
      });
    }
  });
});


function generateUniqueNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}


// ----------ayyanar----register->suplier->vehicle info -  docuemnt insert and view-------

// -----------------------insurence ---------------
const Insurance_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }

})

const Insurance_uploadfile = multer({ storage: Insurance_storage });
app.post('/insurance-pdf/:id', Insurance_uploadfile.single("file"), async (req, res) => {
  const vehicleId = req.params.id;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  const sql = `insert into vehicle_documents(vehicleId,fileName,file_type	)values(${vehicleId},'${fileName}','${fileType}')`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Status: "success" });
  })
})

// ----------------------Licence----------------------

const Licence_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }

})

const Licence_uploadfile = multer({ storage: Licence_storage });
app.post('/licence-pdf/:id', Licence_uploadfile.single("file"), async (req, res) => {
  const vehicleId = req.params.id;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  const sql = `insert into vehicle_documents(vehicleId,fileName,file_type	)values(${vehicleId},'${fileName}','${fileType}')`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Status: "success" });
  })
})


// ----------------------NationalPermit----------------------

const NationalPermit_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const NationalPermit_uploadfile = multer({ storage: NationalPermit_storage });
app.post('/nationalPermit-pdf/:id', NationalPermit_uploadfile.single("file"), async (req, res) => {
  const vehicleId = req.params.id;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  const sql = `insert into vehicle_documents(vehicleId,fileName,file_type	)values(${vehicleId},'${fileName}','${fileType}')`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Status: "success" });
  })
})


// ----------------------StatePermit----------------------

const StatePermit_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const StatePermit_uploadfile = multer({ storage: StatePermit_storage });
app.post('/statePermit-pdf/:id', StatePermit_uploadfile.single("file"), async (req, res) => {
  const vehicleId = req.params.id;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  const sql = `insert into vehicle_documents(vehicleId,fileName,file_type	)values(${vehicleId},'${fileName}','${fileType}')`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Status: "success" });
  })
})


// ----------------------Rcbook----------------------

const Rcbook_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const Rcbook_uploadfile = multer({ storage: Rcbook_storage });
app.post('/rcBook-pdf/:id', Rcbook_uploadfile.single("file"), async (req, res) => {
  const vehicleId = req.params.id;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  const sql = `insert into vehicle_documents(vehicleId,fileName,file_type	)values(${vehicleId},'${fileName}','${fileType}')`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Status: "success" });
  })
})



// ----------------------setFcCopy----------------------

const setFcCopy_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')

  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const setFcCopy_uploadfile = multer({ storage: setFcCopy_storage });
app.post('/fcCopy-pdf/:id', setFcCopy_uploadfile.single("file"), async (req, res) => {
  const vehicleId = req.params.id;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  const sql = `insert into vehicle_documents(vehicleId,fileName,file_type	)values(${vehicleId},'${fileName}','${fileType}')`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Status: "success" });
  })
})

//-----------------fetch ---------------
app.get('/vehicle-docView/:id', (req, res) => {
  const id = req.params.id
  const sql = 'select * from vehicle_documents where vehicleId=?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "error" })
    return res.json(result);
  })
})


///---------------------------------------------------------------------------------------------------------
//---------------Rigister->employee-------------------

// its for make folder puclicc
app.use(express.static('public'));

// its for multer file- 1
const employee_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const employee_uploadfile = multer({ storage: employee_storage });

app.post('/employee-pdf/:id', employee_uploadfile.single("file"), async (req, res) => {
  const emp_id = req.params.id;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  const sql = `insert into rigister_employee_doc(emp_id,fileName,file_type)values(${emp_id},'${fileName}','${fileType}')`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Status: "success" });
  })
})

//-----------------fetch ---------------
app.get('/employee-docView/:id', (req, res) => {
  const id = req.params.id
  const sql = 'select * from rigister_employee_doc where emp_id=?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "error" })
    return res.json(result);
  })
})


// -------------------------------------------------driver page--------------------------------------------------------------


app.use(express.static('public'));

// adthar --upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }

})


const uploadfile = multer({ storage: storage });

app.post('/driver-pdf/:id', uploadfile.single("file"), async (req, res) => {
  const userId = req.params.id;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  const sql = `insert into driver_proof(driverid,fileName,file_type	)values(${userId},'${fileName}','${fileType}')`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Status: "success" });
  })
})



//licence 

const storageLicence = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }

})


const uploadfileLicence = multer({ storage: storageLicence });

app.post('/driver-licencepdf/:id', uploadfileLicence.single("file"), async (req, res) => {
  const userId = req.params.id
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  const sql = `insert into driver_proof(driverid,fileName,file_type)values(${userId},'${fileName}','${fileType}')`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Status: "success" });
  })
})


//pdf view -
app.get('/pdf-view/:id', (req, res) => {
  const id = req.params.id
  const sql = 'select * from driver_proof where driverid=?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "error" })
    return res.json(result);
  })
})

//// booking ->booking----------------------------------------

// its for multer file- 1
const booking_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }

})


const booking_uploadfile = multer({ storage: booking_storage });

app.post('/bookingpdf/:id', booking_uploadfile.single("file"), async (req, res) => {
  const booking_id = req.params.id;

  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  const sql = `insert into booking_doc(booking_id, fileName, file_type)values(${booking_id}, '${fileName}', '${fileType}')`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error" });
    return res.json({ Status: "success" });
  })
})

// booking_id	fileName	file_type	

//-----------------fetch ---------------
app.get('/booking-docView/:id', (req, res) => {
  const id = req.params.id
  const sql = 'select * from booking_doc where booking_id=?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "error" })
    return res.json(result);
  })
})

///------

/////---image delete --for register ->employee- TO Delete
// TO Delete
app.delete('/image-delete/:filename', (req, res) => {
  const sql = "delete from rigister_employee_doc where fileName=?";
  const fileName = req.params.filename;
  console.log("delete file name :", fileName)
  db.query(sql, [fileName], (err, result) => {
    if (err) return res.json({ Message: "Error inside serevre" });
    return res.json(result);
  })
})
// ------------------------
/////---image delete --for register ->supplier-vehicle- TO Delete
// TO Delete
app.delete('/vehicle_documents/:filename', (req, res) => {
  const sql = "delete from vehicle_documents where fileName=?";
  const fileName = req.params.filename;
  console.log("delete file name :", fileName)
  db.query(sql, [fileName], (err, result) => {
    if (err) return res.json({ Message: "Error inside serevre" });
    return res.json(result);
  })
})

/////---image delete --for register ->employee- TO Delete
// TO Delete
app.delete('/driver_proof/:filename', (req, res) => {
  const sql = "delete from driver_proof where fileName=?";
  const fileName = req.params.filename;
  console.log("delete file name :", fileName)
  db.query(sql, [fileName], (err, result) => {
    if (err) return res.json({ Message: "Error inside serevre" });
    return res.json(result);
  })
})


const port = 8081;
app.listen(port, () => {
  console.log(`Connected to backend on port ${port}`);
});
