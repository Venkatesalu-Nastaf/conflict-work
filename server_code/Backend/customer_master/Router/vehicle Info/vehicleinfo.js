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

router.get('/TemplateforFCdate', async (req, res) => {
  const query = 'SELECT TemplateMessageData FROM TemplateMessage WHERE TemplateInfo = "FCdate"';
  db.query(query, (err, results) => {
      if (err) {
          console.log('Database error:', err);
          return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
      }
      console.log('Database results:', results);
      return res.status(200).json(results);
  });
});

router.get('/Templateforstatepermitdate', async (req, res) => {
  const query = 'SELECT TemplateMessageData FROM TemplateMessage WHERE TemplateInfo = "StatePermitDate"';
  db.query(query, (err, results) => {
      if (err) {
          console.log('Database error:', err);
          return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
      }
      console.log('Database results:', results);
      return res.status(200).json(results);
  });
});
router.get('/Templatefornationalpermitdate', async (req, res) => {
  const query = 'SELECT TemplateMessageData FROM TemplateMessage WHERE TemplateInfo = "NationalPermitDate"';
  db.query(query, (err, results) => {
      if (err) {
          console.log('Database error:', err);
          return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
      }
      console.log('Database results:', results);
      return res.status(200).json(results);
  });
});
router.get('/Templateforinsuranceduedate', async (req, res) => {
  const query = 'SELECT TemplateMessageData FROM TemplateMessage WHERE TemplateInfo = "InsuranceDueDate"';
  db.query(query, (err, results) => {
      if (err) {
          console.log('Database error:', err);
          return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
      }
      console.log('Database results:', results);
      return res.status(200).json(results);
  });
});


// FC DATE SCHEDULER-----------------------------------
const queryAsync = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Get email credentials from the database
const getEmailCredentials = async () => {
  const results = await queryAsync("SELECT EmailApp_Password, Sender_mail FROM usercreation LIMIT 1");
  if (results.length > 0) {
    return results[0];
  } else {
    throw new Error("No email credentials found in the table.");
  }
};

// Fetch email template for a given type
const TemplateMessageData = async (type) => {
  const results = await queryAsync(
    "SELECT TemplateMessageData FROM TemplateMessage WHERE TemplateInfo = ?",
    [type]
  );
  if (results.length > 0) {
    return results[0];
  } else {
    throw new Error(`No template message found for type: ${type}`);
  }
};

// Create email transporter
const createTransporter = async () => {
  const credentials = await getEmailCredentials();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: credentials.Sender_mail,
      pass: credentials.EmailApp_Password,
    },
  });
  return { transporter, from: credentials.Sender_mail };
};

// Parse and validate date
const parseDate = (dateStr) => {
  const validFormats = [
    "DD-MM-YYYY",
    "MM/DD/YYYY",
    "YYYY-MM-DD",
    "ddd, D MMM YYYY HH:mm:ss [GMT]",
    "YYYY-MM-DDTHH:mm:ssZ",
    "DD/MM/YYYY",
  ];

  for (const format of validFormats) {
    const parsedDate = moment(dateStr, format, true);
    if (parsedDate.isValid()) {
      return parsedDate;
    }
  }
  console.error(`Failed to parse date: "${dateStr}"`);
  return null;
};

// Send reminder email
const sendReminderEmail = async (today, endDate, user, subject, emailTemplate) => {
  const reminderStart = endDate.clone().subtract(45, "days");
  const reminderEnd = endDate;

  if (today.isBetween(reminderStart, reminderEnd, null, "[]")) {
    const { transporter, from } = await createTransporter();
    await transporter.sendMail({
      from,
      to: user.email,
      subject,
      html: emailTemplate,
    });
    console.log(`Reminder sent to ${user.email} with subject "${subject}"`);
  }
};

// Send subscription reminders
const sendSubscriptionReminders = async () => {
  const today = moment();

  db.query(
    `SELECT fcdate, insduedate, spdate, npdate, driverName, email FROM vehicleinfo 
     WHERE (fcdate IS NOT NULL AND fcdate != '') 
        OR (insduedate IS NOT NULL AND insduedate != '') 
        OR (spdate IS NOT NULL AND spdate != '') 
        OR (npdate IS NOT NULL AND npdate != '')`,
    async (err, results) => {
      if (err) {
        console.error("Error fetching subscriptions:", err);
        return;
      }

      for (const user of results) {
        if (user.fcdate) {
          const fcDate = parseDate(user.fcdate.trim());
          if (fcDate) {
            try {
              const templateData = await TemplateMessageData("FCdate");
              const emailMessage = templateData.TemplateMessageData.replace(
                "${driverName}",
                user.driverName || "Driver"
              ).replace("${date}", fcDate.format("DD-MM-YYYY"));

              await sendReminderEmail(today, fcDate, user, "FC Due Reminder", emailMessage);
            } catch (error) {
              console.error(`Failed to send FC Due Reminder to ${user.email}:`, error);
            }
          }
        }

        if (user.insduedate) {
          const insDueDate = parseDate(user.insduedate.trim());
          if (insDueDate) {
            try {
              const templateData = await TemplateMessageData("InsuranceDueDate");
              const emailMessage = templateData.TemplateMessageData.replace(
                "${driverName}",
                user.driverName || "Driver"
              ).replace("${date}", insDueDate.format("DD-MM-YYYY"));
        
              await sendReminderEmail(today, insDueDate, user, "Insurance Due Reminder", emailMessage);
            } catch (error) {
              console.error(`Failed to send Insurance Due Reminder to ${user.email}:`, error);
            }
          }
        }
        

        // if (user.spdate) {
        //   const spDueDate = parseDate(user.spdate.trim());
        //   if (spDueDate) {
        //     await sendReminderEmail(
        //       today,
        //       spDueDate,
        //       user,
        //       "State Permit Reminder",
        //       `<p>Dear ${user.driverName || "Driver"},</p>
        //        <p>Your state permit is nearing its expiration date.</p>
        //        <p>State Permit Expiry Date: ${spDueDate.format("DD-MM-YYYY")}</p>`
        //     );
        //   }
        // }

        if (user.spdate) {
          const spDueDate = parseDate(user.spdate.trim());
          if (spDueDate) {
            try {
              const templateData = await TemplateMessageData("StatePermitDate");
              const emailMessage = templateData.TemplateMessageData.replace(
                "${driverName}",
                user.driverName || "Driver"
              ).replace("${date}", spDueDate.format("DD-MM-YYYY"));

              await sendReminderEmail(today, spDueDate, user, "State Permit Due Reminder", emailMessage);
            } catch (error) {
              console.error(`Failed to send State Permit Due Reminder to ${user.email}:`, error);
            }
          }
        }

        if (user.npdate) {
          const npDueDate = parseDate(user.npdate.trim());
          if (npDueDate) {
            try {
              const templateData = await TemplateMessageData("NationalPermitDate");
              const emailMessage = templateData.TemplateMessageData.replace(
                "${driverName}",
                user.driverName || "Driver"
              ).replace("${date}", npDueDate.format("DD-MM-YYYY"));
      
              await sendReminderEmail(today, npDueDate, user, "National Permit Due Reminder", emailMessage);
            } catch (error) {
              console.error(`Failed to send National Permit Due Reminder to ${user.email}:`, error);
            }
          }
        }
      }
    }
  );
};

// Schedule the job
cron.schedule("00 09 * * *", () => {
  console.log("Running daily subscription reminder job...");
  sendSubscriptionReminders();
});


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
      // 'vehType',
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
