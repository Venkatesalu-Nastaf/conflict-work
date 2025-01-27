const express = require('express');
const router = express.Router();
const db = require('../../../db');
const moment = require('moment'); // or import dayjs from 'dayjs';
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const cron = require('node-cron');


router.use(express.static('customer_master'));

// vehicle_info database:-
// Add vehicle_info database
router.get('/drivernamevechicleinfo', (req, res) => {
  const sql = 'select * from drivercreation'
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }

    return res.status(200).json(result);
  })
})

router.get('/lastvechileinfogetid', (req, res) => {
  db.query('SELECT   vehicleId  FROM  vehicleinfo ORDER BY  vehicleId DESC LIMIT    1', (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'vehicleid not found' });
    }
    const lastdriverid = result[0];
    return res.status(200).json(lastdriverid);
  });
});
router.get('/vechileinfogetdata', (req, res) => {
  db.query('SELECT * FROM  vehicleinfo ', (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'vehicleid not found' });
    }
   
    
    return res.status(200).json(result);
  });
});

router.get('/vechiclenameinfo', (req, res) => {
  const { vehicletypename } = req.query; // Access the parameter using req.params
  // Modify the query to use the LIKE operator for partial matching
  // console.log(vehicletypename,"namevecile")

  db.query('SELECT * FROM vehicleinfo WHERE vehicleName LIKE ?', [`${vehicletypename}%`], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve vehicle details ' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Vehicle Not Found' });
    }
    const vehicletypedetails = result;
    // Assuming there is only one matching customer
    return res.status(200).json(vehicletypedetails);
  });
});
router.post('/vehicleinfo', (req, res) => {
  const bookData = req.body;

  db.query('INSERT INTO vehicleinfo SET ?', bookData, (err, result) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: "Failed to insert data" });
    }
    console.log(result)
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});

// Delete Customer Master data
router.delete('/vehicleinfo/:vehicleId', (req, res) => {
  const vehicleId = req.params.vehicleId;
  db.query('DELETE FROM vehicleinfo WHERE vehicleId = ?', vehicleId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete data from MySQL' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    return res.status(200).json({ message: 'Data deleted successfully' });
  });
});

// Update Customer Master details
router.put('/vehicleinfo/:vehicleId', (req, res) => {
  const vehicleId = req.params.vehicleId;
  const updatedCustomerData = req.body;

  db.query('UPDATE vehicleinfo SET ? WHERE vehicleId = ?', [updatedCustomerData, vehicleId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update data in MySQL' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    return res.status(200).json({ message: 'Data updated successfully' });
  });
});


// FC DATE SCHEDULER-----------------------------------
// const queryAsync = (query, params = []) => {
//   return new Promise((resolve, reject) => {
//     db.query(query, params, (err, results) => {
//       if (err) return reject(err);
//       resolve(results);
//     });
//   });
// }; 

// const getEmailCredentials = async () => {
//   const results = await queryAsync("SELECT EmailApp_Password, Sender_mail FROM usercreation LIMIT 1");
//   if (results.length > 0) {
//     // console.log(results)
//     return results[0];
//   } else {
//     throw new Error('No credentials found in the table.');
//   }
// };

// const createTransporter = async () => {
//   try {
//     const credentials = await getEmailCredentials(); 
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: credentials.Sender_mail,
//         pass: credentials.EmailApp_Password,
//       },
//     });
//     return { transporter, from: credentials.Sender_mail }; 
//     // console.log('Transporter created successfully');
//     // return transporter;
//   } catch (error) {
//     console.error('Failed to create transporter:', error);
//     throw error;
//   }
// };

// // Function to parse and validate dates
// const parseDate = (dateStr) => {
//   console.log(`Attempting to parse: "${dateStr}"`);
  
//   const validFormats = [
//     "DD-MM-YYYY",
//     "MM/DD/YYYY",
//     "YYYY-MM-DD",
//     "ddd, D MMM YYYY HH:mm:ss [GMT]",
//     "YYYY-MM-DDTHH:mm:ssZ",
//     "DD/MM/YYYY"
//   ];

//   for (const format of validFormats) {
//     const parsedDate = moment(dateStr, format, true); 
//     if (parsedDate.isValid()) {
//       console.log(`Parsed successfully with format "${format}": ${parsedDate.format("DD-MM-YYYY")}`);
//       return parsedDate;
//     }
//   }

//   console.error(`Failed to parse: "${dateStr}"`);
//   return null;
// };
// --------------------------------------------------------------------------
// const sendSubscriptionReminders = async () => {
//   const today = moment();

//   db.query("SELECT fcdate, email FROM vehicleinfo WHERE fcdate IS NOT NULL AND fcdate != ''", async (err, results) => {
//     if (err) {
//       console.error("Error fetching subscriptions:", err);
//       return; 
//     }

//     for (const user of results) {
//       if (!user.fcdate) {
//         console.error(`Missing date for ${user.email}`);
//         continue;
//       }

//       const subscriptionEnd = parseDate(user.fcdate.trim());

//       if (!subscriptionEnd) {
//         console.error(`Invalid subscription end date for ${user.email} with date: ${user.fcdate}`);
//         continue;
//       }

//       // Calculate the reminder period for the last 45 days
//       const reminderStart = subscriptionEnd.clone().subtract(45, "days");
//       const reminderEnd = subscriptionEnd;

//       console.log(`Reminder period for ${user.email}: ${reminderStart.format("DD-MM-YYYY")} to ${reminderEnd.format("DD-MM-YYYY")}`);

//       if (today.isSameOrAfter(reminderStart) && today.isSameOrBefore(reminderEnd)) {
//         try {
//           // Create the transporter
//           const { transporter, from } = await createTransporter();

//           // Send reminder email to customer
//           await transporter.sendMail({
//             from,
//             to: user.email,
//             subject: 'Subscription Reminder',
//             html: `
//               <p>Dear ${user.customer},</p>
//               <p>This is a friendly reminder that your subscription is approaching its expiration date.</p>
//               <p>Expiry Date: ${subscriptionEnd.format("DD-MM-YYYY")}</p>
//               <p>Thank you for your continued support!</p>
//             `,
//           });

//           console.log(`Reminder sent to ${user.email}`);
//         } catch (error) {
//           console.error(`Failed to send email to ${user.email}:`, error);
//         }
//       } else {
//         console.log(`No reminder needed for ${user.email} today.`);
//       }
//     }
//   });
// };

// // Schedule the job to run daily
// cron.schedule('17 10 * * *', () => {
//   console.log('Running daily subscription reminder job...');
//   sendSubscriptionReminders();
// });


// --------------------------------------------------------------------

// const sendSubscriptionReminders = async () => {
//   const today = moment();

//   // Fetch both fcdate and insduedate
//   db.query(
//     "SELECT fcdate, insduedate, email FROM vehicleinfo WHERE (fcdate IS NOT NULL AND fcdate != '') OR (insduedate IS NOT NULL AND insduedate != '')",
//     async (err, results) => {
//       if (err) {
//         console.error("Error fetching subscriptions:", err);
//         return;
//       }

//       for (const user of results) {
//         if (!user.fcdate && !user.insduedate) {
//           console.error(`Missing dates for ${user.email}`);
//           continue;
//         }

//         // Process `fcdate`
//         if (user.fcdate) {
//           const subscriptionEnd = parseDate(user.fcdate.trim());

//           if (!subscriptionEnd) {
//             console.error(`Invalid fcdate for ${user.email}: ${user.fcdate}`);
//           } else {
//             await sendReminderEmail(
//               today,
//               subscriptionEnd,
//               user,
//               "Subscription Reminder",
//               `
//                 <p>Dear ${user.customer},</p>
//                 <p>This is a friendly reminder that your subscription is approaching its expiration date.</p>
//                 <p>FC Expiry Date: ${subscriptionEnd.format("DD-MM-YYYY")}</p>
//                 <p>Thank you for your continued support!</p>
//               `
//             );
//           }
//         }

//         // Process `insduedate`
//         if (user.insduedate) {
//           const insuranceDueDate = parseDate(user.insduedate.trim());

//           if (!insuranceDueDate) {
//             console.error(`Invalid insduedate for ${user.email}: ${user.insduedate}`);
//           } else {
//             await sendReminderEmail(
//               today,
//               insuranceDueDate,
//               user,
//               "Insurance Due Reminder",
//               `
//                 <p>Dear ${user.customer},</p>
//                 <p>This is a friendly reminder that your vehicle insurance is approaching its due date.</p>
//                 <p>Insurance Due Date: ${insuranceDueDate.format("DD-MM-YYYY")}</p>
//                 <p>Kindly renew your insurance at the earliest.</p>
//               `
//             );
//           }
//         }
//       }
//     }
//   );
// };

// // Helper function to send reminder email
// const sendReminderEmail = async (today, endDate, user, subject, emailTemplate) => {
//   const reminderStart = endDate.clone().subtract(45, "days");
//   const reminderEnd = endDate;

//   console.log(`Reminder period for ${user.email}: ${reminderStart.format("DD-MM-YYYY")} to ${reminderEnd.format("DD-MM-YYYY")}`);

//   if (today.isSameOrAfter(reminderStart) && today.isSameOrBefore(reminderEnd)) {
//     try {
//       // Create the transporter
//       const { transporter, from } = await createTransporter();

//       // Send email
//       await transporter.sendMail({
//         from,
//         to: user.email,
//         subject,
//         html: emailTemplate,
//       });

//       console.log(`Reminder sent to ${user.email} with subject "${subject}"`);
//     } catch (error) {
//       console.error(`Failed to send email to ${user.email}:`, error);
//     }
//   } else {
//     console.log(`No reminder needed for ${user.email} today for subject "${subject}".`);
//   }
// };

// // Schedule the job to run daily
// cron.schedule("30 10 * * *", () => {
//   console.log("Running daily subscription reminder job...");
//   sendSubscriptionReminders();
// });

//--------------X---------------------X-------------------------X---------


router.get('/searchvehicleinfo', (req, res) => {
  const { searchText, fromDate, toDate } = req.query;
  console.log(searchText, fromDate, toDate, "dateeeee");

  let query = 'SELECT * FROM vehicleinfo WHERE 1=1';
  let params = [];

  if (searchText) {
    const columnsToSearch = [
      'vehicleId',
      'vehicleName',
      'hiretypes',
      'vehType',
      'fueltype',
      'Groups',
      'doadate',
      'vehRegNo',
      'owner',
      'mobileNo',
      'email',
      'yearModel',
      'insuranceno',
      'insduedate',
      'nationalpermito',
      'npdate',
      'avgmileage',
      'statepermito',
      'spdate',
      'financer',
      'rcbookno',
      'fcdate',
      'driverName',
      'tankCap',
      'active',
      'stations'
    ];

    // If searchText is exactly 4 digits, search for vehRegNo ending with those digits
    if (searchText.length === 4 && /^\d{4}$/.test(searchText)) {
      query += ' AND vehRegNo LIKE ?';
      params.push(`%${searchText}`);
    } else {
      // Otherwise, search across all columns
      const likeConditions = columnsToSearch.map(column => `${column} LIKE ?`).join(' OR ');
      query += ` AND (${likeConditions})`;
      params = columnsToSearch.map(() => `${searchText}%`);
    }
  }

  if (fromDate && toDate) {
    const formattedFromDate = moment(fromDate).format('YYYY-MM-DD');
    const formattedToDate = moment(toDate).format('YYYY-MM-DD');
    query += ' AND doadate >= DATE_ADD(?, INTERVAL 0 DAY) AND doadate <= DATE_ADD(?, INTERVAL 1 DAY)';
    params.push(formattedFromDate, formattedToDate);
  }

  db.query(query, params, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve vehicle details from MySQL' });
    }
    return res.status(200).json(result);
  });
});

// -----------------------insurence ---------------
const Insurance_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './customer_master/public/vehicle_doc')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }

})

const Insurance_uploadfile = multer({ storage: Insurance_storage });
// router.post('/insurance-pdf/:id', Insurance_uploadfile.single("file"), async (req, res) => {
router.post('/insurance-pdf/:vehicleId', Insurance_uploadfile.single("file"), async (req, res) => {
  const vehicleId = req.params.vehicleId;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  const {created_at}=req.body;

  if (fileName && vehicleId) {
    const sql = `insert into vehicle_documents(vehicleId,fileName,file_type,created_at)values('${vehicleId}','${fileName}','${fileType}','${created_at}')`;
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve vehicle details ' });
      }
      return res.json({ Status: "success" });
    })
  }
})

// ----------------------Licence----------------------

const Licence_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './customer_master/public/vehicle_doc')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }

})

const Licence_uploadfile = multer({ storage: Licence_storage });
router.post('/licence-pdf/:vehicleId', Licence_uploadfile.single("file"), async (req, res) => {
  const vehicleId = req.params.vehicleId;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  const {created_at}=req.body;
  if (fileName && vehicleId) {

    const sql = `insert into vehicle_documents(vehicleId,fileName,file_type,created_at)values('${vehicleId}','${fileName}','${fileType}','${created_at}')`;
    db.query(sql, (err, result) => {
      if (err) return res.json({ Message: "Error" });
      return res.json({ Status: "success" });
    })
  }
})


// ----------------------NationalPermit----------------------

const NationalPermit_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './customer_master/public/vehicle_doc')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const NationalPermit_uploadfile = multer({ storage: NationalPermit_storage });
router.post('/nationalPermit-pdf/:vehicleId', NationalPermit_uploadfile.single("file"), async (req, res) => {
  const vehicleId = req.params.vehicleId;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  const {created_at}=req.body;

  if (fileName && vehicleId) {
    const sql = `insert into vehicle_documents(vehicleId,fileName,file_type,created_at)values('${vehicleId}','${fileName}','${fileType}','${created_at}')`;
    db.query(sql, (err, result) => {
      if (err) return res.json({ Message: "Error" });
      return res.json({ Status: "success" });
    })
  }
})

// ----------------------StatePermit----------------------

const StatePermit_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './customer_master/public/vehicle_doc')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const StatePermit_uploadfile = multer({ storage: StatePermit_storage });
router.post('/statePermit-pdf/:vehicleId', StatePermit_uploadfile.single("file"), async (req, res) => {
  const vehicleId = req.params.vehicleId;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  const {created_at}=req.body;

  if (fileName && vehicleId) {
    const sql = `insert into vehicle_documents(vehicleId,fileName,file_type,created_at)values('${vehicleId}','${fileName}','${fileType}','${created_at}')`;
    db.query(sql, (err, result) => {
      if (err) return res.json({ Message: "Error" });
      return res.json({ Status: "success" });
    })
  }
})

// ----------------------Rcbook----------------------

const Rcbook_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './customer_master/public/vehicle_doc')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const Rcbook_uploadfile = multer({ storage: Rcbook_storage });
router.post('/rcBook-pdf/:vehicleId', Rcbook_uploadfile.single("file"), async (req, res) => {
  const vehicleId = req.params.vehicleId;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  const {created_at}=req.body;

  if (fileName && vehicleId) {
    const sql = `insert into vehicle_documents(vehicleId,fileName,file_type,created_at)values('${vehicleId}','${fileName}','${fileType}','${created_at}')`;
    db.query(sql, (err, result) => {
      if (err) return res.json({ Message: "Error" });
      return res.json({ Status: "success" });
    })
  }
})

// ----------------------setFcCopy----------------------

const setFcCopy_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './customer_master/public/vehicle_doc')

  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const setFcCopy_uploadfile = multer({ storage: setFcCopy_storage });
router.post('/fcCopy-pdf/:vehicleId', setFcCopy_uploadfile.single("file"), async (req, res) => {
  const vehicleId = req.params.vehicleId;
  const fileName = req.file.filename;
  const fileType = req.file.mimetype;
  const {created_at}=req.body;
  
  if (fileName && vehicleId) {
    const sql = `insert into vehicle_documents(vehicleId,fileName,file_type,created_at)values('${vehicleId}','${fileName}','${fileType}','${created_at}')`;
    db.query(sql, (err, result) => {
      if (err) return res.json({ Message: "Error" });
      return res.json({ Status: "success" });
    })
  }
})

//-----------------fetch ---------------
router.get('/vehicle-docView/:vechicleId', (req, res) => {
  const id = req.params.vechicleId

  const sql = 'select * from vehicle_documents where vehicleId=?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "error" })
    return res.json(result);
  })
})

router.get('/uniquevechregnodata/:vehregno',(req,res)=>{
  const vehregno=req.params.vehregno;
  db.query("select vehRegNo from vehicleinfo where vehRegNo=?",[vehregno],(err,results)=>{
    if (err) {
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    console.log(results)
    return res.status(200).json(results);
  })
})

// =========================================addvehcile

router.post("/getvehciledatauniquevehilcle",(req,res)=>{
  const {vechiclevalue,created_at}=req.body;
  console.log(vechiclevalue,created_at,"vehhh")
  db.query("insert into VehicleName(VechicleNames,created_at) values(?,?)",[vechiclevalue,created_at],(err,result)=>{
    if (err) {
      return res.status(500).json({message: 'Failed to retrieve to data'});
      // return res.status(500).json({error:err});
    }
   
    return res.status(200).json({message:"inserted succesfully"});

  })
})

router.get('/getvehicledatauniquevehicleNames',(req,res)=>{
 
  db.query("select * from  VehicleName ",(err,results)=>{
    if (err) {
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    // console.log(results,"jjjj")
    return res.status(200).json(results);
  })
})





module.exports = router;
