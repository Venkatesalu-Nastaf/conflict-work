//Database connection for Nastaf Appliction this file contain Add, Delete, Collect data from mysql, and Update functions:  
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const db = require('./db');
const uuid = require('uuid');
const multer = require('multer');
const path = require('path');
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });
app.use(express.static('customer_master'));

const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './customer_master/public/map_images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload2 = multer({
  storage: storage1
})

app.get('/', (req, res) => {
  return res.json({ message: "Hello from the bac  nd side" });
});

//connect using route
const customerRoutes = require('./customer_master/Router/customer/Customer');
const accountinfoRoutes = require('./customer_master/Router/supplier/accountinginfo');
const vehicleinfoRouter = require('./customer_master/Router/vehicle Info/vehicleinfo');
const vehicletypeRouter = require('./customer_master/Router/vehicletype/vehicletype')
const bookingRouter = require('./customer_master/Router/Booking/booking');

const bookingchartRouter = require('./customer_master/Router/Booking/bookingchart');
const tripsheetRouter = require('./customer_master/Router/tripsheet/tripsheet');
const pendingRouter = require('./customer_master/Router/Recieved/pending');
const closedRouter = require('./customer_master/Router/Dispatch/closed');
const dispatchRouter = require('./customer_master/Router/Dispatch/dispatch');
const driverRouter = require('./customer_master/Router/driver/driver');
const usercreationRouter = require('./customer_master/Router/usercreation/usercreation');
const stationcreationRouter = require('./customer_master/Router/stationcreation/stationcreation');
const packagerateRouter = require('./customer_master/Router/Ratemanagement/packagerate');
const ratetypeRouter = require('./customer_master/Router/Ratetype/ratetype');
const ratevalidityRouter = require('./customer_master/Router/Ratetype/ratevalidity');
const divionRouter = require('./customer_master/Router/Ratetype/division');
const driverbataRouter = require('./customer_master/Router/Ratemanagement/driverbatarate');
const billingRouter = require('./customer_master/Router/Billing/billing');
const bankaccountRouter = require('./customer_master/Router/Billing/bankaccountdetails/backaccountddetails');
const paymentRouter = require('./customer_master/Router/Billing/payment/payment');
const transferlistRouter = require('./customer_master/Router/Transfer/transferlist');
const pettycashRouter = require('./customer_master/Router/cashflow/pettycash');
const payrollRouter = require('./customer_master/Router/cashflow/payroll');
const fueldetailsRouter = require('./customer_master/Router/fueldetails/mileage');
const taxsettingRouter = require('./customer_master/Router/mainsetting/taxsetting');
const drivercreationRouter = require('./customer_master/Router/Driverapplogin/driverapplogin');
const assetsRouer = require('./customer_master/Router/cashflow/assets');
const driveractiveRouter = require('./customer_master/Router/tripsheet/appuserlist');
const sendsmsRouter = require('./customer_master/Router/SMS/sms');
const employeeRouter = require('./customer_master/Router/Employee/employee');
const companyRoutes = require('./customer_master/Router/organization/organization');
const taxsettingRoutes = require('./customer_master/Router/taxsetting/taxsettings');
const image_delete = require('./customer_master/Router/delete_uploaded_files/delete_image_fun');
const DashboardRouter = require('./customer_master/Router/Dashboard/Dashboard');
const User_Permission = require('./customer_master/Router/userpermission/userermissionpage');
const SignatureRouter = require('./customer_master/Router/signature/signature');
const Templatemailer = require('./customer_master/Router/Templatemailer/mailers');


// -----------------------------------------------------------------------------------------------------------
app.use('/', customerRoutes);// Customer Page Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', accountinfoRoutes); // account_info page database:-
// -----------------------------------------------------------------------------------------------------------
app.use('/', vehicleinfoRouter); // vehicle_info page database
// -----------------------------------------------------------------------------------------------------------
app.use('/', vehicletypeRouter); // vehicle_info page database
// -----------------------------------------------------------------------------------------------------------
app.use('/', bookingRouter); // Booking page database:-
// -----------------------------------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------
app.use('/', transferlistRouter); // Transfer lsit Database:
// -----------------------------------------------------------------------------------------------------------
app.use('/', bookingchartRouter); // booking CHART database
// -----------------------------------------------------------------------------------------------------------
app.use('/', tripsheetRouter); // tripsheet page database:
// -----------------------------------------------------------------------------------------------------------
app.use('/', pendingRouter); // Booking/Received/Pending page database
// -----------------------------------------------------------------------------------------------------------
app.use('/', sendsmsRouter); // send sms fron booking and tripsheet database
// -----------------------------------------------------------------------------------------------------------
app.use('/', closedRouter); // Booking/Dispatch/closed page database
// -----------------------------------------------------------------------------------------------------------
app.use('/', dispatchRouter); // Booking/Dispatch/Dispatch page database
// -----------------------------------------------------------------------------------------------------------
app.use('/', driverRouter); // driver page database
// -----------------------------------------------------------------------------------------------------------
app.use('/', usercreationRouter); // usercreation page database:
// -----------------------------------------------------------------------------------------------------------
app.use('/', stationcreationRouter); // StationCreation page Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', packagerateRouter); // Rate Management page Database
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
app.use('/', drivercreationRouter); // driver creation page Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', employeeRouter); // Employees page Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', billingRouter); // Billing Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', bankaccountRouter); // Bank accounts page Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', paymentRouter); // payment page Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', pettycashRouter); // petty cash page Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', assetsRouer); // assets page Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', payrollRouter); // payroll page database
// -----------------------------------------------------------------------------------------------------------
app.use('/', fueldetailsRouter); // info/Fuel Details page database
// -----------------------------------------------------------------------------------------------------------
app.use('/', taxsettingRouter); // taxsetting page Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', SignatureRouter);//signature database
// -----------------------------------------------------------------------------------------------------------
app.use('/', companyRoutes);//signature database
// -----------------------------------------------------------------------------------------------------------
app.use('/', taxsettingRoutes);//signature database
// -----------------------------------------------------------------------------------------------------------
app.use('/', image_delete);// image delete 
//------------------------------------------------------------------------------------------------------------
app.use('/', DashboardRouter);// image delete 
//------------------------------------------------------------------------------------------------------------
app.use('/', User_Permission);// image delete 
//------------------------------------------------------------------------------------------------------------
app.use('/', Templatemailer);// Customer Page Database
// -------------------------------------------------------------------------------------------
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
app.post('/mapuploads', upload2.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  const fileData = {
    path: req.file.path.split('\\').pop(),
    tripid: req.body.tripid,
  };
  const query = 'SELECT path FROM mapimage WHERE tripid = ?';
  const query2 = 'INSERT INTO mapimage SET ?';
  const updatequery = 'update mapimage set path=? where tripid = ?'
  db.query(query, [fileData.tripid], (err, results) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }
    if (results.length === 0) {

      db.query(query2, fileData, (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Error storing file in the database.' });
        }
        return res.status(200).json({ message: 'File uploaded and data inserted successfully.' });
      });
    }

    else {
      db.query(updatequery, [fileData.path, fileData.tripid], (err, results) => {
        if (err) {
          return res.status(500).json({ error: 'Error storing file in the database.' });
        }
        return res.status(200).json({ message: 'File uploaded and data inserted successfully.' });
      });
    }
  })
});


//get map image from the folder
const mapimageDirectory = path.join(__dirname, 'customer_master', 'public', 'map_images')

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

app.put('/tripsheet_uploads/:id/:documentType', uploadtripsheet.single('image'), (req, res) => {
  const userId = req.params.id;
  const fileName = req.file.filename;
  const documentType = req.params.documentType;
  const filename = req.file.originalname;


  if (userId, fileName, filename, documentType) {
    const insertQuery = `INSERT INTO tripsheetupload (tripid, path, name,documenttype) VALUES (?, ?, ?,?)`;
    db.query(insertQuery, [userId, fileName, filename, documentType], (err, result) => {
      if (err) {
        return res.status(500).json({ Message: "Error inserting profile picture", err });
      }
      return res.status(200).json({ Status: "success" });
    })

  } else {
    return res.status(500).json({ Message: "some data undefind" })
  }

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
const basemapImagePath = path.join(__dirname, 'customer_master', 'public', 'map_images');


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



const signatureDirectory = path.join(__dirname, 'customer_master', 'public', 'signature_images');
app.use('/signimages', express.static(signatureDirectory));
// app.use('/signimages', express.static('customer_master'));
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


    // res.sendFile(imagePath, (err) => {
    //   if (err) {
    //     return res.status(500).send('Internal Server Error');
    //   }

    fs.access(imagePath, fs.constants.F_OK, (err) => {
      if (err) {

        return res.status(404).send('File not found');
      }

      // Send the file
      res.sendFile(imagePath);

    });
  });
});


// app.use('/signimages', express.static('customer_master'));
app.get('/get-signimageforpdfrendered/:tripid', (req, res) => {
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
    // const imagePath = path.join(signatureDirectory, results[0].path);
    const data = results[0].path
    res.json(data);


    // res.sendFile(imagePath, (err) => {
    //   if (err) {
    //     return res.status(500).send('Internal Server Error');
    //   }

    // fs.access(imagePath, fs.constants.F_OK, (err) => {
    //   if (err) {

    //     return res.status(404).send('File not found');
    //   }

    //   // Send the file
    //   res.sendFile(imagePath);

    // });
  });
});

const attachedDirectory = path.join(__dirname, 'uploads');
// Serve static files from the imageDirectory
app.use('/images', express.static(attachedDirectory));
// Example route to serve an image by its filename
app.get('/get-attachedimage/:tripid', (req, res) => {
  const { tripid } = req.params;
  const query = 'SELECT path FROM tripsheetupload WHERE tripid = ? ';
  // const query = `SELECT path FROM tripsheetupload WHERE tripid = ? AND documenttype IN ('TripSheet', 'Parking', 'Toll', 'Permit', 'Sign')`;
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
// -----------------its bookingpdf image data  i chnage folder of image i mnot use this api -------------------------------
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
      mimetype: result.path.split('.').pop()// assuming 'type' indicates whether it's an image or PDF
    }));


    res.json({ files });
  });
});
// -------------------------------------------------------------------------------------------------------------------------------

//get image for organization

const companyattachedDirectory = path.join(__dirname, 'uploads');
// Serve static files from the imageDirectory
app.use('/images', express.static(companyattachedDirectory));
// Example route to serve an image by its filename
app.get('/get-companyimage/:organizationname', (req, res) => {
  const { organizationname } = req.params;
  const query = 'SELECT * FROM organisation_logo WHERE organisation_name = ?';
  // const query = 'SELECT fileName FROM organisation_logo WHERE organisation_name = ?';

  db.query(query, [organizationname], (err, results) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }

    if (results.length === 0) {
      // No record found for the given tripid
      return res.status(404).send('Images not found');
    }
    const imagePaths = results.map(result => result.fileName);
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

// ///------

//company logo-------------------

app.get('/log-imageview/:sharedData', (req, res) => {
  const imageNAme = req.params.sharedData;
  if (imageNAme !== "undefined") {

    const sql = 'select * from organisation_logo where organisation_name=?';
    db.query(sql, [imageNAme], (err, result) => {
      if (err) return res.json({ Message: "error" })
      return res.json(result);
    })
  }
})



// Permission 

app.get('/use-permissions/:userid', (req, res) => {
  const userid = req.params.userid;

  const sql = `select * from user_permissions where user_id=?`;
  db.query(sql, [userid], (err, result) => {
    if (err) return res.json({ Message: "error" })
    return res.json(result);
  })
})







const port = 8081;
app.listen(port, () => {
  console.log(`Connected to backend on port ${port}`);
});
