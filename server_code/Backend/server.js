//Database connection for Nastaf Appliction this file contain Add, Delete, Collect data from mysql, and Update functions:  
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const app = express();
// const fs = require('fs');
// const db = require('./db');
// // const uuid = require('uuid');
// const multer = require('multer');
// const path = require('path');
// const imagePath = require('./imagepath')
//Database connection for Nastaf Appliction this file contain Add, Delete, Collect data from mysql, and Update functions:
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const db = require('./db');
// const uuid = require('uuid');
const multer = require('multer');
const path = require('path');
const imagePath = require('./imagepath')
const https = require('https');

//https open

// // Environment Variables for Port and Host
const HTTPS_PORT = process.env.HTTPS_PORT || 3131;
const HOST = process.env.HOST || '192.168.1.11';

let httpsOption;
try {
  httpsOption = {
    key: fs.readFileSync('/etc/letsencrypt/live/jessycabs.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/jessycabs.com/fullchain.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/jessycabs.com/chain.pem')
  };
  console.log("SSL configuration successfully loaded.");
} catch (error) {
  console.error("Error loading SSL configuration:", error.message);
  process.exit(1);
}

// HTTPS Server
const httpsServer = https.createServer(httpsOption, app);

httpsServer.listen(HTTPS_PORT, HOST, () => {
  console.log(`Backend running securely at https://${HOST}:${HTTPS_PORT}`);
});

httpsServer.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${HTTPS_PORT} is already in use.`);
  } else {
    console.error('Server error:', err.message);
  }
  process.exit(1);
});

//https close
// console.log(imagePath);

var CryptoJS = require("crypto-js");

// const jwt = require('jsonwebtoken')
require('dotenv').config()
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
// const upload = multer({ dest: 'uploads/' });
// app.use(express.static('customer_master'));
app.use(express.static('Imagefolder'));

// const storage1 = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './customer_master/public/map_images')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//   }
// })

// const upload2 = multer({
//   storage: storage1
// })

const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${imagePath}/map_images`)
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
const vendorinfoRoutes = require('./customer_master/Router/supplier/vendorinfo');
const vehicleinfoRouter = require('./customer_master/Router/vehicle Info/vehicleinfo');
const bookingRouter = require('./customer_master/Router/Booking/booking');

const bookingchartRouter = require('./customer_master/Router/Booking/bookingchart');
const tripsheetRouter = require('./customer_master/Router/tripsheet/tripsheet');
const pendingRouter = require('./customer_master/Router/Recieved/pending');
const closedRouter = require('./customer_master/Router/Dispatch/closed');
const dispatchRouter = require('./customer_master/Router/Dispatch/dispatch');
const overviewdrawerRouter = require('./customer_master/Router/OverviewDrawer/overviewdrawer');
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
const IndividualBill = require('./customer_master/Router/Individual_Billing/IndividualBill')
const GstReport = require('./customer_master/Router/GstReport/GstReport');
const billWiseReport = require('./customer_master/Router/BillWisedReport/BillWisedReport');
const pendingBill = require('./customer_master/Router/PendingBills/PendingBill')
const AggrementPage = require('./customer_master/Router/Aggrement/aggrement')
const DashBoardBillReport = require('./customer_master/Router/BillingDashboard/BillingDashboard');
const VehcileDetails = require('./customer_master/Router/VehicleDetails/vehicleDetails')
const gpsDeviceDatas = require('./customer_master/Router/GPSDeviceData/gpsDeviceData')
const googlemapApiKey = require('./customer_master/Router/GooglemapApiKey/googleMapApiKey')

// -----------------------------------------------------------------------------------------------------------
app.use('/', customerRoutes);// Customer Page Database
// -----------------------------------------------------------------------------------------------------------
app.use('/', vendorinfoRoutes); // account_info page database:-
// -----------------------------------------------------------------------------------------------------------
app.use('/', vehicleinfoRouter); // vehicle_info page database
// -----------------------------------------------------------------------------------------------------------
app.use('/', bookingRouter); // Booking page database:-
// -----------------------------------------------------------------------------------------------------------
app.use('/', AggrementPage); // Aggrement page database:-
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
app.use('/', overviewdrawerRouter);  //Tripsheet/Overview/database
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
app.use('/', IndividualBill);//Individual bill
//theme update in user creation
// -------------------------------------------------------------------------------------------
app.use('/', GstReport);//GstReport
// -------------------------------------------------------------------------------------------
app.use('/', billWiseReport);//billWiseReport
// -------------------------------------------------------------------------------------------
app.use('/', pendingBill);//PendingBill
// -------------------------------------------------------------------------------------------
app.use('/', DashBoardBillReport)
// --------------------------------------------------------------------------------------------
app.use('/', VehcileDetails)
// --------------------------------------------------------------------------------------------
app.use('/',gpsDeviceDatas);//gpsdevicedatas
// --------------------------------------------------------------------------------------------
app.use('/',googlemapApiKey);//googlemapapikey

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
app.post('/updateprofilename', (req, res) => {
  const { userid, profile_image } = req.body;
  const query = 'UPDATE usercreation SET profile_image = ? WHERE userid IN (?)';
  db.query(query, [profile_image, userid], (err, results) => {
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
    path: req.file.filename,
    tripid: req.body.tripid,
  };
  console.log(fileData, 'filed');

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
        console.log(results, 'resultimage');

        return res.status(200).json({ message: 'File uploaded and data inserted successfully.' });
      });
    }
  })
});


//get map image from the folder
//old code 
// const mapimageDirectory = path.join(__dirname, 'customer_master', 'public', 'map_images')
// app.use('/mapimages', express.static(mapimageDirectory));

//New code
const mapimageDirectory = path.join(__dirname, `${imagePath}/map_images`);
// console.log(mapimageDirectory,"fghjk")

app.use('/mapimagesnew', express.static(mapimageDirectory));


app.get('/getmapimages/:tripid', (req, res) => {
  const { tripid } = req.params;

  const query = 'SELECT path FROM mapimage WHERE tripid = ?';
  db.query(query, [tripid], (err, results) => {
    if (err) {
      console.log("err", err)
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

app.delete('/deleteMapImagesByTripId/:tripid', (req, res) => {
  const { tripid } = req.params;

  const query = `DELETE FROM mapimage WHERE tripid = ?`;

  db.query(query, [tripid], (err, result) => {
    if (err) {
      console.log("Error in map delete:", err);
      return res.status(500).json({ error: 'Database delete error' });
    }

    res.json({ message: 'Map images deleted successfully', affectedRows: result.affectedRows });
  });
});


app.get('/getmapimagesverfiy/:tripid', (req, res) => {
  const { tripid } = req.params;

  const query = 'SELECT path FROM mapimage WHERE tripid = ?';
  db.query(query, [tripid], (err, results) => {
    if (err) {
      console.log("err", err)
      return res.status(500).send('Internal Server Error');
    }
    // if (results.length === 0) {
    //   // No record found for the given tripid
    //   return res.status(404).send('Image not found');
    // }
    return res.status(200).json(results)


  });
});


app.delete('/api/mapimagedelete/:tripid', (req, res) => {
  const tripid = req.params.tripid;
  const sql = `SELECT path FROM mapimage WHERE tripid = ?`;
  db.query(sql, [tripid], (err1, results) => {
    if (err1) {
      return res.status(500).json({ message: "Error checking profile existence", error: err1 });
    }

    if (results.length >= 1) {
      db.query("DELETE FROM mapimage WHERE tripid = ?", [tripid], (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Failed to delete data from MySQL" });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "data not found" });
        }

        const mapimage = results[0].path

        if (mapimage) {


          const oldImagePath = path.join('Backend', 'customer_master', 'public', 'map_images');


          // Get the complete absolute path
          const oldImagePathDirectoryAbsolute = path.resolve(__dirname, '..', '..', '..', '..', oldImagePath, mapimage);

          // Check if the file exists
          if (fs.existsSync(oldImagePathDirectoryAbsolute)) {
            try {
              // Delete the file
              fs.unlinkSync(oldImagePathDirectoryAbsolute);
              console.log('File deleted successfully:', mapimage);
            } catch (error) {
              console.error('Error deleting file:', error);
            }
          } else {
            console.log('File does not exist:', mapimage);
          }
        }

      })

      return res.status(200).json({ message: "Data deleted successfully" });

    }
  })
})

//file upload in tripsheet
// app.post('/uploads', upload.single('file'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded.' });
//   }
//   const fileData = {
//     name: req.file.originalname,
//     mimetype: req.file.mimetype,
//     size: req.file.size,
//     path: req.file.path.replace(/\\/g, '/').replace(/^uploads\//, ''),
//     tripid: req.body.tripid,
//     bookingno: req.body.bookingno,
//     empid: req.body.empid,
//     organizationname: req.body.organizationname,
//     userid: req.body.userid,
//     vehicleId: req.body.vehicleId,
//   };
//   const query = 'INSERT INTO tripsheetupload SET ?';
//   db.query(query, fileData, (err, result) => {
//     if (err) {
//       return res.status(500).json({ error: 'Error storing file in the database.' });
//     }
//     return res.status(200).json({ message: 'File uploaded and data inserted successfully.' });
//   });
// });
//get image from the folder
// const imageDirectory = path.join(__dirname, 'customer_master', 'public', 'imagesUploads_doc');
// const basemapImagePath = path.join(__dirname, 'customer_master', 'public', 'map_images');


//This is for tripsheet upload document
const imageDirectory = path.join(__dirname, `${imagePath}/imagesUploads_doc`);
// console.log(imageDirectory);

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

// const storagetripsheet = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "_" + req.params.data + path.extname(file.originalname))
//   }

// })
// const storagetripsheet = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './customer_master/public/imagesUploads_doc')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "_" + req.params.data + path.extname(file.originalname))
//   }

// })

// const uploadtripsheet = multer({
//   storage: storagetripsheet
// })
const storagetripsheet = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${imagePath}/imagesUploads_doc`)
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + req.params.data + path.extname(file.originalname))
  }

})

const uploadtripsheet = multer({
  storage: storagetripsheet
})

app.put('/tripsheet_uploads/:id/:documentType/:data', uploadtripsheet.single('image'), (req, res) => {
  const userId = req.params.id;
  const fileName = req.file.filename;
  const documentType = req.params.documentType;
  const filename = req.file.originalname;

  // console.log(fileName , "1st code");
  
  if (userId, fileName, filename, documentType) {
    const insertQuery = `INSERT INTO tripsheetupload (tripid, path, name,documenttype) VALUES (?, ?, ?,?)`;
    db.query(insertQuery, [userId, fileName, filename, documentType], (err, result) => {
      if (err) {
        console.log(err, "tripupload")
        return res.status(500).json({ Message: "Error inserting profile picture", err });
      }
      console.log(result, "data of the tripsheet")
      return res.status(200).json({ Status: "success" });
    })

  } else {
    return res.status(500).json({ Message: "some data undefind" })
  }

});

const uploadstartkm = multer({
  storage: storagetripsheet
})

// app.put('/tripsheet_uploads/:id/:data', uploadstartkm.single('image'), (req, res) => {
//   const userId = req.params.id;
//   const fileName = req.file.filename;
//   const filename = req.file.originalname;

//   if (userId, fileName, filename) {
//     const insertQuery = `UPDATE tripsheetupload SET startkm_imgpath = ? WHERE tripid = ?`;
//     db.query(insertQuery, [userId, fileName, filename], (err, result) => {
//       if (err) {
//         return res.status(500).json({ Message: "Error inserting profile picture", err });
//       }
//       return res.status(200).json({ Status: "success" });
//     })

//   } else {
//     return res.status(500).json({ Message: "some data undefind" })
//   }

// });

app.put('/tripsheet_uploads/:id/:data', uploadstartkm.single('image'), (req, res) => {
  const tripId = req.params.id;
  const data = req.params.data;
  const fileName = req.file?.filename;
  const originalName = req.file?.originalname;

  // console.log(fileName , "2nd code");

  if (tripId && fileName && originalName) {
    const updateQuery = `UPDATE tripsheetupload SET startkm_imgpath = ? WHERE tripid = ?`;
    db.query(updateQuery, [fileName, tripId], (err, result) => {
      if (err) {
        // console.error(err);
        return res.status(500).json({ Message: "Error updating database", err });
      }
      return res.status(200).json({ Status: "success" });
    });
  } else {
    return res.status(400).json({ Message: "Required data is missing" });
  }
});

const uploadclosekm = multer({
  storage: storagetripsheet
})


app.put('/tripsheet_uploadsclosekm/:id/:data', uploadclosekm.single('image'), (req, res) => {
  const tripId = req.params.id;
  const data = req.params.data;
  const fileName = req.file?.filename;
  const originalName = req.file?.originalname;

 
  if (tripId && fileName && originalName) {
    const updateQuery = `UPDATE tripsheetupload SET closekm_imgpath = ? WHERE tripid = ?`;
    db.query(updateQuery, [fileName, tripId], (err, result) => {
      if (err) {
        return res.status(500).json({ Message: "Error updating database", err });
      }
      return res.status(200).json({ Status: "success" });
    });
  } else {
    return res.status(400).json({ Message: "Required data is missing" });
  }
});

app.put('/tripsheet-updatekm/:tripid', (req, res) => {
  const { startkm, closekm, Hcl, duty } = req.body;
  const tripid = req.params.tripid;
  // let sql = "UPDATE tripsheet SET startkm = ?, closekm = ? WHERE tripid = ?"

  let sql = "";
  let values = [];

  if (Hcl === 1 && duty === "Outstation") {
    // First condition
    sql = "UPDATE tripsheet SET startkm = ?, closekm = ? WHERE tripid = ?";
    values = [startkm, closekm, tripid];
  } else if (Hcl === 1 && duty !== "Outstation") {
    // Second condition
    sql = "UPDATE tripsheet SET startkm = ?,closekm = ?, vendorshedoutkm = ?,vendorshedinkm = ? WHERE tripid = ?";
    values = [startkm, closekm, startkm, closekm, tripid];
  } else {
    // Default case or other conditions
    sql = "UPDATE tripsheet SET startkm = ?, closekm = ? WHERE tripid = ?";
    values = [startkm, closekm, tripid];
  }

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating tripsheet:', err);
      return res.status(500).send('Failed to update');
    }
    // console.log(result, "data of the tripsheet")
    return res.status(200).send('Successfully updated');
  }
  );
});



// --------------------------driverappupdatedtoll and parking image----------------------
// const userattachedDirectory1 = path.join(__dirname, 'uploads');
// const storagetripsheet1 = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // cb(null, 'uploads')
//     cb(null, userattachedDirectory1)
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "_" + req.params.data + path.extname(file.originalname))
//   }

// })
// const uploadtripsheet1 = multer({
//   storage: storagetripsheet1
// })
// app.post('/tripsheetdatadriverappimage/:data', uploadtripsheet1.single('file'), (req, res) => {
//   console.log(req.params.data, "kk")
//   const fullPath = path.resolve(req.file.path);
//   const fileData = {
//     name: req.file.originalname,
//     mimetype: req.file.mimetype,
//     size: req.file.size,
//     path: req.file.path.replace(/\\/g, '/').replace(/^uploads\//, ''),
//     // tripid: req.body.tripid,
//     fullPath:fullPath,
//     date: req.body.datadate

//   };
//   console.log(fileData)
//   // res.send("datasend")
//   res.json({fileData})

// })




// --------------------------------------------------------



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
    const user = result[0];
    console.log(user.active);
    
    if(user.active !== 'yes' ){
      return res.status(403).json({error:"Account is inactive"})
    }
    // console.log(process.env.JSON_SECERETKEY)
    // const secretKey = process.env.JSON_SECERETKEY
    // const token = jwt.sign({ id: result[0].userid, username: result[0].username }, secretKey, { expiresIn: '2h' });
    // const secretKey = process.env.JSON_SECERETKEY
    // const token = jwt.sign({ id: result[0].userid, username: result[0].username }, secretKey, { expiresIn: '2h' });

    // const secretKey="NASTAF_APPLICATION_DATAKEY@123"

    return res.status(200).json({ message: 'Login successful', user: user });

    // return res.status(200).json({ message: 'Login successful', user: result[0] });
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

//this is for agreement image
const agreementDoc = path.join(__dirname, `${imagePath}/agreement_doc`);
app.use('/agreement_doc', express.static(agreementDoc))
// console.log(agreementDoc);

//this is for employeement image
const employeeDirect = path.join(__dirname,`${imagePath}/employee_doc`)
app.use('/employee_doc', express.static(employeeDirect))
// console.log(employeeDirect);

//TemplateImage 

const templateImage = path.join(__dirname, `${imagePath}/Templateimage`);
app.use('/template', express.static(templateImage))
// console.log(templateImage);

//Driverdocument in drivercreation 

const driverDoc = path.join(__dirname, `${imagePath}/driver_doc`);

app.use('/driver_doc', express.static(driverDoc))
// console.log(driverDoc);


//vehicledocument in vehicle info page 

const vehicleDoc = path.join(__dirname, `${imagePath}/vehicle_doc`);
app.use('/vehicle_doc', express.static(vehicleDoc))
// console.log(vehicleDoc);


//Booking page Attach image 

const bookingDoc = path.join(__dirname, `${imagePath}/imagesUploads_doc`)

app.use('/images', express.static(bookingDoc))
app.use('/pdf', express.static(bookingDoc));


//Tripsheet sign image 

const signatureDirectory = path.join(__dirname, `${imagePath}/signature_images`);
app.use('/signimages', express.static(signatureDirectory));
// console.log(signatureDirectory);


// const signatureDirectory = path.join(__dirname, 'customer_master', 'public', 'signature_images');
// app.use('/signimages', express.static(signatureDirectory));

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

// const attachedDirectory = path.join(__dirname, 'uploads');
// const attachedDirectory = path.join(__dirname, 'customer_master', 'public', 'imagesUploads_doc');
// // Serve static files from the imageDirectory
// console.log(attachedDirectory, "attachedDirectory2")
// app.use('/images', express.static(attachedDirectory));
// Example route to serve an image by its filename
app.get('/get-attachedimage/:tripid', (req, res) => {
  const { tripid } = req.params;
  // const query = 'SELECT path FROM tripsheetupload WHERE tripid = ? ';
  const query = 'SELECT path FROM tripsheetupload WHERE tripid = ? And documenttype Not IN ("StartingKm","ClosingKm") ';
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

app.get('/get-attachedimageforE-tripsheet/:tripid', (req, res) => {
  const { tripid } = req.params;
  const query = 'SELECT path FROM tripsheetupload WHERE tripid = ? And documenttype Not IN ("StartingKm","ClosingKm") ';
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
// const attachedmailDirectory = path.join(__dirname, 'uploads');
// const attachedmailDirectory = path.join(__dirname, 'customer_master', 'public', 'imagesUploads_doc');
// // const pdfDirectory = path.join(__dirname, 'uploads');
// const pdfDirectory = path.join(__dirname, 'customer_master', 'public', 'imagesUploads_doc');
// // Serve static files from the imageDirectory
// app.use('/images', express.static(attachedmailDirectory));
// app.use('/pdf', express.static(pdfDirectory));
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
// const companyattachedDirectory = path.join(__dirname, 'uploads');
// const companyattachedDirectory = path.join(__dirname, 'customer_master', 'public', 'imagesUploads_doc');
// console.log(companyattachedDirectory,"companyattach");

// // Serve static files from the imageDirectory
// app.use('/images', express.static(companyattachedDirectory));
// Example route to serve an image by its filename
app.get('/get-companyimage', (req, res) => {
  const { organizationname } = req.params;
  const query = 'SELECT * from organizationdetails';
  // const query = 'SELECT fileName FROM organisation_logo WHERE organisation_name = ?';

  db.query(query, (err, results) => {
    if (err) {
      console.log(err)
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
// const userattachedDirectory = path.join(__dirname, 'uploads');
// const userattachedDirectory = path.join(__dirname, 'customer_master', 'public', 'imagesUploads_doc');
// console.log(userattachedDirectory,"userattach");

// // Serve static files from the imageDirectory
// app.use('/images', express.static(userattachedDirectory));
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
  console.log("tripid", tripid)
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
        var ciphertext1 = CryptoJS.AES.encrypt(JSON.stringify(tripid), 'my-secret-key@123').toString();
        var cipherunique = CryptoJS.AES.encrypt(JSON.stringify(uniqueNumber), 'my-secret-key@123').toString();

        // const link = `${process.env.FRONTEND_APIURL}/onlinedigital/digitalsignature?tripid=${tripid}&uniqueNumber=${uniqueNumber}`;

        const link = `${process.env.FRONTEND_APIURL}/onlinedigital/digitalsignature?trip=${encodeURIComponent(ciphertext1)}&uniqueNumber=${encodeURIComponent(cipherunique)}`;

        res.status(200).json({ message: 'Status updated successfully', link });
      });
    } else {
      const uniqueNumber = generateUniqueNumber();
      db.query('INSERT INTO signatures (tripid, unique_number) VALUES (?, ?)', [tripid, uniqueNumber], (insertErr, insertResult) => {
        if (insertErr) {
          // console.log(insertErr,"ee")
          return res.status(500).json({ message: "Error inserting new tripid", error: insertErr });
        }
        // const dataencryt=encrypt(tripid)
        // console.log(dataencryt,"ll")
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(tripid), 'my-secret-key@123').toString();
        var cipherunique2 = CryptoJS.AES.encrypt(JSON.stringify(uniqueNumber), 'my-secret-key@123').toString();

        // const link = `${process.env.FRONTEND_APIURL}/onlinedigital/digitalsignature?tripid=${tripid}&uniqueNumber=${uniqueNumber}`;
        const link = `${process.env.FRONTEND_APIURL}/onlinedigital/digitalsignature?trip=${encodeURIComponent(ciphertext)}&uniqueNumber=${encodeURIComponent(cipherunique2)}`;
        // console.log(link,"ll")

        res.status(200).json({ link });
      });
    }
  });
});

function generateUniqueNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}


//company logo-------------------

// app.get('/log-imageview/:sharedData', (req, res) => {
//   const imageNAme = req.params.sharedData;
//   if (imageNAme !== "undefined") {

//     const sql = 'select * from organisation_logo where organisation_name=?';
//     db.query(sql, [imageNAme], (err, result) => {
//       if (err) return res.json({ Message: "error" })
//       return res.json(result);
//     })
//   }
// })


app.get('/use-permissions/:userid', (req, res) => {
  const userid = req.params.userid;

  const sql = `select * from user_permissions where user_id=?`;
  db.query(sql, [userid], (err, result) => {
    if (err) return res.json({ Message: "error" })
    return res.json(result);
  })
})


app.get('/get-vehicleNo', (req, res) => {
  const sql = `select vehRegNo from vehicleinfo`
  db.query(sql, (err, result) => {
    if (err) {
      console.log("vehicleno fetching error", err)
      return
    }
    if (result) {
      return res.json({ data: result, success: "true" })
    }
    return
  })
})


app.get(`/get-customer`, (req, res) => {
  // const sql = `select customer from customers`
  const sql = `select * from customers`
  db.query(sql, (err, result) => {
    if (err) {
      console.log("error fetching CUSTOMER ", err)
      return
    }
    if (result) {

      return res.json(result)
    }
    return
  })
})


app.get(`/name-orderby/:custmorName`, (req, res) => {
  const customer = req.params.custmorName

  // const sql = `select * from customerOrderdata where customer=?`
  const sql1 = `SELECT 
  co.*, 
  c.servicestation
FROM 
  customerOrderdata co
LEFT JOIN 
  customers c 
ON 
  co.customer = c.customer 
WHERE 
  co.customer = ?
  `
  db.query(sql1, [customer], (err, result) => {
    if (err) {

      console.log("error fetching CUSTOMER ", err)
      return
    }
    if (result) {
      return res.json({ data: result, success: true })
    }

    return res.json({ success: false })
  })
})




app.post("/signaturedatatimes/:tripid", (req, res) => {
  const tripid = req.params.tripid;
  const {
    status,
    datesignature,
    signtime,
    updateclosedate,
    updateclosetime } = req.body;
  console.log(tripid, status, datesignature, signtime, updateclosedate, updateclosetime, "jjjjjjj")
  const sql2 = " UPDATE tripsheet set closedate=? , closetime = ?,vendorshedInDate = ?, vendorshedintime = ? where  tripid = ?"

  db.query("insert into Signaturetimedetails(tripid,logdatetime,startsigntime,Signstatus) value(?,?,?,?)", [tripid, datesignature, signtime, status], (err, results) => {
    if (err) {
      // console.log(err,"errins")
      return res.status(400).json(err)
    }
    db.query(sql2, [updateclosedate, updateclosetime, updateclosedate, updateclosetime, tripid], (err, results1) => {
      if (err) {
        // console.log(err,"trip")
        return res.status(400).json(err)
      }
      console.log(results)
      return res.status(200).json("data insert successfully")
    })

  })
})

app.post("/dataclearsignaturedatatimes/:tripid", (req, res) => {
  const tripid = req.params.tripid;
  const {
    status,
    datesignature,
    signtime,
     } = req.body;



  db.query("insert into Signaturetimedetails(tripid,logdatetime,startsigntime,Signstatus) value(?,?,?,?)", [tripid, datesignature, signtime, status], (err, results) => {
    if (err) {
      // console.log(err,"errins")
      return res.status(400).json(err)
    }
   
      return res.status(200).json("data insert successfully")
 

  })
})
app.post("/Acceptsignaturedatatimes/:tripid", (req, res) => {
  const tripid = req.params.tripid;
  const {
    status,
    datesignature,
    signtime,
    } = req.body;
  

  db.query("insert into Signaturetimedetails(tripid,logdatetime,startsigntime,Signstatus) value(?,?,?,?)", [tripid, datesignature, signtime, status], (err, results) => {
    if (err) {
      // console.log(err,"errins")
      return res.status(400).json(err)
    }
 
      return res.status(200).json("data insert successfully")
  

  })
})


// app.get("/getFuelType/:fuelType", (req, res) => {
//   const vehicleName = req.params.fuelType; // Corrected to use req.params
//   const sql = `SELECT fueltype FROM vehicleinfo WHERE vehicleName=?`;

//   db.query(sql, [vehicleName], (err, result) => {
//     if (err) {
//       console.log("err", err);
//       return res.status(500).json("Something went wrong ..");
//     }
//     return res.status(200).json(result);
//   });
// });

app.get("/getFuelType/:fuelType", (req, res) => {
  const vehicleName = req.params.fuelType; // Corrected to use req.params
  const sql = `SELECT fueltype FROM vehicleinfo WHERE vehRegNo=?`;

  db.query(sql, [vehicleName], (err, result) => {
    if (err) {
      console.log("err", err);
      return res.status(500).json("Something went wrong ..");
    }
    return res.status(200).json(result);
  });
});





// app.get("/getvehicleInfo", (req, res) => {
//   try {
//     console.log("query", req.query)
//     const { hireTypes, startDate, endDate } = req.query;
//     // const sql = 'SELECT * FROM tripsheet WHERE hireTypes = ? AND startdate <= ? AND closedate >= ?  ';
//     const sql = 'SELECT * FROM tripsheet WHERE hireTypes = ? AND startdate <= ? AND closedate >= ?  ';

//     db.query(sql, [hireTypes, startDate, endDate], (err, result) => {
//       if (err) {
//         console.log("err", err)
//         return res.status(404).json({ message: "somthing went wrong", error: true })
//       }

//       // console.log("result", result)
//       return res.status(200).json(result)
//     })

//   } catch (err) {
//     console.log("err", err)
//     res.status(500).json({ message: "something went wrong" })
//   }

// })




app.get("/getvehicleInfostate", (req, res) => {
  try {
    // console.log("query", req.query);
    const { hireTypes, startDate, endDate, vehregvalue } = req.query;
    // const status = 'Closed'
    let sql = ''
    const paramsdata = []
    // console.log(hireTypes, "jj")
    if (hireTypes !== "All") {

      if (vehregvalue !== "All") {

        sql = ` SELECT *,(COALESCE(NULLIF(Vendor_totalAmountKms, ''), 0) 
+ COALESCE(NULLIF(Vendor_totalAmountHours, ''), 0) 
+ COALESCE(NULLIF(Vendor_NightbataTotalAmount, ''), 0) 
+ COALESCE(NULLIF(Vendor_BataTotalAmount, ''), 0) 
+ COALESCE(NULLIF(Vendor_rateAmount, ''), 0) 
+ COALESCE(NULLIF(vendortoll, ''), 0) 
+ COALESCE(NULLIF(vendorparking, ''), 0) 
+ COALESCE(NULLIF(vpermettovendor, ''), 0)) AS grandTotal FROM tripsheet  WHERE hireTypes = ? AND vehRegNo=? AND shedOutDate >= DATE_ADD(?, INTERVAL 0 DAY) AND shedOutDate <= DATE_ADD(?, INTERVAL 0 DAY) AND status NOT IN ('Cancelled')`
        paramsdata.push(hireTypes, vehregvalue, startDate, endDate)
      }
      else {
        sql = ` SELECT *,(COALESCE(NULLIF(Vendor_totalAmountKms, ''), 0) 
    + COALESCE(NULLIF(Vendor_totalAmountHours, ''), 0) 
    + COALESCE(NULLIF(Vendor_NightbataTotalAmount, ''), 0) 
    + COALESCE(NULLIF(Vendor_BataTotalAmount, ''), 0) 
    + COALESCE(NULLIF(Vendor_rateAmount, ''), 0) 
    + COALESCE(NULLIF(vendortoll, ''), 0) 
    + COALESCE(NULLIF(vendorparking, ''), 0) 
    + COALESCE(NULLIF(vpermettovendor, ''), 0)) AS grandTotal FROM tripsheet  WHERE hireTypes = ?  AND shedOutDate >= DATE_ADD(?, INTERVAL 0 DAY) AND shedOutDate <= DATE_ADD(?, INTERVAL 0 DAY) AND status NOT IN ('Cancelled')`
        paramsdata.push(hireTypes, startDate, endDate)
      }
    }
    else {

      if (vehregvalue !== "All") {
        // console.log("all and value")
        sql = ` SELECT *,(COALESCE(NULLIF(Vendor_totalAmountKms, ''), 0) 
  + COALESCE(NULLIF(Vendor_totalAmountHours, ''), 0) 
  + COALESCE(NULLIF(Vendor_NightbataTotalAmount, ''), 0) 
  + COALESCE(NULLIF(Vendor_BataTotalAmount, ''), 0) 
  + COALESCE(NULLIF(Vendor_rateAmount, ''), 0) 
  + COALESCE(NULLIF(vendortoll, ''), 0) 
  + COALESCE(NULLIF(vendorparking, ''), 0) 
  + COALESCE(NULLIF(vpermettovendor, ''), 0)) AS grandTotal FROM tripsheet  WHERE vehRegNo=? AND  shedOutDate >= DATE_ADD(?, INTERVAL 0 DAY) AND shedOutDate <= DATE_ADD(?, INTERVAL 0 DAY) AND status NOT IN ('Cancelled')`
        paramsdata.push(vehregvalue, startDate, endDate)
      }
      else {
        // console.log("all and all")
        sql = ` SELECT *,(COALESCE(NULLIF(Vendor_totalAmountKms, ''), 0) 
      + COALESCE(NULLIF(Vendor_totalAmountHours, ''), 0) 
      + COALESCE(NULLIF(Vendor_NightbataTotalAmount, ''), 0) 
      + COALESCE(NULLIF(Vendor_BataTotalAmount, ''), 0) 
      + COALESCE(NULLIF(Vendor_rateAmount, ''), 0) 
      + COALESCE(NULLIF(vendortoll, ''), 0) 
      + COALESCE(NULLIF(vendorparking, ''), 0) 
      + COALESCE(NULLIF(vpermettovendor, ''), 0)) AS grandTotal FROM tripsheet  WHERE  shedOutDate >= DATE_ADD(?, INTERVAL 0 DAY) AND shedOutDate <= DATE_ADD(?, INTERVAL 0 DAY) AND status NOT IN ('Cancelled')`
        paramsdata.push(startDate, endDate)
      }
    }


    // console.log(sql, paramsdata)

    // db.query(sql, [hireTypes, startDate, endDate, startDate, endDate, startDate, endDate], (err, result) => {
    db.query(sql, paramsdata, (err, result) => {
      if (err) {
        // console.error("Error executing query:", err);
        return res.status(500).json({ message: "Something went wrong", error: true });
      }
      // console.log(result)
      return res.status(200).json(result);
    });

  } catch (err) {
    // console.error("Server error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});


app.get("/hiretypebasedvehicle/:gethire", (req, res) => {
  try {
    // console.log("query", req.query);
    const { gethire } = req.params;
    let sql = ''
    const paramsdata = []
    if (gethire === "All") {

      sql = 'select vehRegNo from vehicleinfo'
    }
    else {
      sql = 'select vehRegNo from vehicleinfo where hiretypes=?'
      paramsdata.push(gethire)
    }
    // const sql = 'select vehRegNo from vehicleinfo where hiretypes=?'
    // console.log(paramsdata, sql)
    db.query(sql, paramsdata, (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ message: "Something went wrong", error: true });
      }
      console.log(result)
      return res.status(200).json(result);
    });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});




// const port = 8081;
// const port = process.env.PORT;

// app.listen(port, () => {
//   console.log(`Connected to backend on port ${port}`);
// });
