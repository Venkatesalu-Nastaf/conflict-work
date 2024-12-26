const express = require('express');
const router = express.Router();
const db = require('../../../db');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
router.use(express.static('customer_master'));
const cron = require('node-cron');
const moment = require('moment'); 

// add Aggrement database

// router.post('/agreementdatas', (req, res) => {
//     const customerData = req.body;
//     console.log(customerData,"dd")
//     db.query('INSERT INTO Aggrement SET ?', customerData, (err, result) => {
//         if (err) {
//             console.log(err,'ghjjjj');
            
//             return res.status(500).json({ error: 'Failed to insert data into MySQL' });
//         }
//         console.log(result,'yuiiiiiiiii');
        
//         return res.status(200).json({ message: 'Data inserted successfully' });
//     });
// });
// router.get('/Customerdatasfetch', (req, res) => {
//     const sql = 'SELECT  customer,address1, gstnumber FROM customers';
//     db.query(sql, (err, result) => {
//         console.log(err);
        
//         if (err) {
//             return res.status(500).json({ error: "Failed to retrieve data from MySQL" });
//         }
//         console.log(result);
        
//         return res.status(200).json(result);
//     });
// }); 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './customer_master/public/agreement_doc');
    },
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}_${Date.now()}-${file.originalname}`);
    },
  });
  
  const uploadfile = multer({ storage: storage });
  
  // Endpoint to handle file upload and insert data
  router.post('/agreementdocumentimage', uploadfile.single('Agreement_Image'), (req, res) => {
    let Agreement_Image = null;
  
    if (!req.file) {
      Agreement_Image = null;
    } else {
      Agreement_Image = req.file.filename;
    }
    console.log(Agreement_Image, "Uploaded Image");
  
    const {
      customer,
      fromdate,
      todate,
      email,
      mobileno,
      address,
      gstno,
    } = req.body;
  
    console.log(
      customer,
      fromdate,
      todate,
      email,
      mobileno,
      address,
      gstno
    );
            const formattedFromDate1 = moment(fromdate).format('YYYY-MM-DD');
            const formattedFromDate2 = moment(todate).format('YYYY-MM-DD');
            
  
    // Check if an entry for the customer already exists in agreement_image
    const checkSql = `
      SELECT id FROM agreement_image WHERE customer = ?
    `;
  
    db.query(checkSql, [customer], (err, checkResult) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Failed to check existing data in agreement_image table" });
      }
  
      // Insert data into Aggrement table without the image
      const aggrementSql = `
        INSERT INTO Aggrement (customer, fromdate, todate, email, mobileno, address, gstno) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
  
      db.query(aggrementSql, [
        customer,
        formattedFromDate1,
        formattedFromDate2,
        email,
        mobileno,
        address,
        gstno
      ], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Failed to insert data into Aggrement table" });
        }
  
        // Get the inserted ID from Aggrement table
        const aggrementId = result.insertId;
  
        // Insert Agreement_Image into agreement_image table
        if (Agreement_Image) {
          const agreementImageSql = `
            INSERT INTO agreement_image (customer, Agreement_Image) 
            VALUES (?, ?)
          `;
  
          db.query(agreementImageSql, [customer, Agreement_Image], (err, imageResult) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ error: "Failed to insert Agreement_Image into agreement_image table" });
            }
  
            return res.status(200).json({ message: "Data and image inserted successfully" });
          });
        } else {
          return res.status(200).json({ message: "Data inserted successfully, no image uploaded" });
        }
      });
    });
  });

  const storageLicence = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './customer_master/public/agreement_doc')
    },
    filename: (req, file, cb) => {  
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }

  })
  
  const uploadfileLicence = multer({ storage: storageLicence });
  
  router.post('/Customer-Uploadpdf/:customer', uploadfileLicence.single("file"), async (req, res) => {
    const customer = req.params.customer
    const Agreement_Image = req.file.Agreement_Image;
    const fileType = req.file.mimetype;
    // const {created_at}=req.body;
    // console.log(created_at)
    if (Agreement_Image) {
      const sql = `insert into agreement_image(customer,Agreement_Image,file_type)values('${customer}','${Agreement_Image}','${fileType}')`;
      db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error" });
        console.log(result, "license")
        return res.json({ Status: "success" });
      })
    }
  })

  //searchbar in Agreement Page
router.get('/searchAgreementpage', (req, res) => {
  const { searchText } = req.query; // Get the searchText from the query params
  // console.log(searchText, "search")
  let query = 'SELECT * FROM  Aggrement WHERE 1=1'; // Ensure you query from the correct table
  let params = [];

  if (searchText) {
    const columnsToSearch = [
        'customer',
        'email',
        'mobileno',
        'address',
        'gstno'
    ];
    console.log(columnsToSearch, "columns")
    const likeConditions = columnsToSearch.map(column => `${column} LIKE ?`).join(' OR ');
    query += ` AND (${likeConditions})`;

    // Add searchText to params for each column
    params = columnsToSearch.map(() =>` ${searchText}%`);
  }
console.log(query,params, "fhjf");

  // Execute the query
  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Database query error:", err); // Log the error for debugging
      return res.status(500).json({ error: 'Error retrieving data' });
    }

    console.log("Search results:", results); // Log results to verify
    res.json(results); // Send back the results to the client
  });
});



// router.post('/send-emailagreementdata', async (req, res) => {
//     try {
//         const { customer, email, toDate, Sendmailauth, Mailauthpass } = req.body;
//             console.log(customer, email, toDate, Sendmailauth, Mailauthpass, 'hh')
//         // Create a Nodemailer transporter
//         const transporter = nodemailer.createTransport({
//             host: 'smtp.gmail.com',
//             port: 465,
//             secure: true,
//             auth: {
//                 user: Mailauthpass, // User's email address
//                 pass: Sendmailauth, // User's email app password
//             },
//             tls: {
//                 rejectUnauthorized: false
//             }
//         });

//         // Email content for the owner
//         const ownerMailOptions = {
//             from: Mailauthpass,
//             to: 'sharan1228s@gmail.com', // Set the owner's email address
//             subject: `${customer} sent you a booking request`,
//             html: `
//                 <p>
//                 Dear ${customer},
//                 <br>
//                 I hope this message finds you well. We greatly value your association with JESSYCABS and are committed to providing you with seamless and exceptional service for all your complete transport needs.
//                 <br><br>
//                 As per our records, your current agreement with us is set to expire on ${toDate}. To ensure uninterrupted service and maintain the benefits of your association with us, we kindly request you to renew your agreement at the earliest.
//                 <br><br>
//                 <strong>Here are the key details regarding your renewal:</strong>
//                 <ul>
//                     <li><strong>Agreement Expiry Date:</strong> ${toDate}</li>
//                     <li><strong>Renewal Benefits:</strong> [Mention specific benefits or perks, if applicable]</li>
//                     <li><strong>Action Required:</strong> Kindly confirm your intent to renew by [insert deadline, e.g., "December 15, 2024"].</li>
//                 </ul>
//                 <br>
//                 Should you have any questions, wish to make modifications to your agreement, or require further assistance, please feel free to contact us at [insert contact details].
//                 <br><br>
//                 We truly value your trust and look forward to continuing our association. Thank you for choosing <strong>JESSYCABS</strong>.
//                 </p>`,
//         };

//         // Send email to the owner
//         await transporter.sendMail(ownerMailOptions);

//         // Email content for the customer
//         const customerMailOptions = {
//             from: Mailauthpass,
//             to: email,
//             subject: 'Greetings from Jessy Cabs',
//             html: `
//                 <p>
//                 Dear ${customer},
//                 <br>
//                 I hope this message finds you well. We greatly value your association with JESSYCABS and are committed to providing you with seamless and exceptional service for all your complete transport needs.
//                 <br><br>
//                 As per our records, your current agreement with us is set to expire on ${toDate}. To ensure uninterrupted service and maintain the benefits of your association with us, we kindly request you to renew your agreement at the earliest.
//                 <br><br>
//                 <strong>Here are the key details regarding your renewal:</strong>
//                 <ul>
//                     <li><strong>Agreement Expiry Date:</strong> ${toDate}</li>
//                     <li><strong>Renewal Benefits:</strong> [Mention specific benefits or perks, if applicable]</li>
//                     <li><strong>Action Required:</strong> Kindly confirm your intent to renew by [insert deadline, e.g., "December 15, 2024"].</li>
//                 </ul>
//                 <br>
//                 Should you have any questions, wish to make modifications to your agreement, or require further assistance, please feel free to contact us at [insert contact details].
//                 <br><br>
//                 We truly value your trust and look forward to continuing our association. Thank you for choosing <strong>JESSYCABS</strong>.
//                 </p>`,
//         };

//         // Send greeting email to the customer
//         await transporter.sendMail(customerMailOptions);

//         res.status(200).json({ message: 'Email sent successfully' });
//     } catch (error) {
//         console.error('Error while sending email:', error);
//         res.status(500).json({ message: 'An error occurred while sending the email', error: error.message });
//     }
// });


// router.post('/send-emailagreementdata', async (req, res) => {
//   try {
//       const { customer, email, toDate, Sendmailauth, Mailauthpass } = req.body;

//       console.log(customer, email, toDate, Sendmailauth, Mailauthpass, 'debugging log');

//       // Create a Nodemailer transporter
//       const transporter = nodemailer.createTransport({
//           host: 'smtp.gmail.com',
//           port: 465,
//           secure: true,
//           auth: {
//               user: Mailauthpass, // User's email address
//               pass: Sendmailauth, // User's email app password
//           },
//           tls: {
//               rejectUnauthorized: false,
//           },
//       });

//       // Email content for the owner
//       const ownerMailOptions = {
//           from: Mailauthpass,
//           to: 'sharan1228s@gmail.com', // Set the owner's email address
//           subject: `${customer} sent you a booking request`,
//           html: `
//               <p>
//               Dear ${customer},
//               <br>
//               I hope this message finds you well. We greatly value your association with JESSYCABS and are committed to providing you with seamless and exceptional service for all your complete transport needs.
//               <br><br>
//               As per our records, your current agreement with us is set to expire on ${toDate}. To ensure uninterrupted service and maintain the benefits of your association with us, we kindly request you to renew your agreement at the earliest.
//               <br><br>
//               <strong>Here are the key details regarding your renewal:</strong>
//               <ul>
//                   <li><strong>Agreement Expiry Date:</strong> ${toDate}</li>
//                   <li><strong>Renewal Benefits:</strong> [Mention specific benefits or perks, if applicable]</li>
//                   <li><strong>Action Required:</strong> Kindly confirm your intent to renew by [insert deadline, e.g., "December 15, 2024"].</li>
//               </ul>
//               <br>
//               Should you have any questions, wish to make modifications to your agreement, or require further assistance, please feel free to contact us at [insert contact details].
//               <br><br>
//               We truly value your trust and look forward to continuing our association. Thank you for choosing <strong>JESSYCABS</strong>.
//               </p>`,
//       };

//       // Send email to the owner
//       await transporter.sendMail(ownerMailOptions);

//       // Email content for the customer
//       const customerMailOptions = {
//           from: Mailauthpass,
//           to: email,
//           subject: 'Greetings from Jessy Cabs',
//           html: `
//               <p>
//               Dear ${customer},
//               <br>
//               I hope this message finds you well. We greatly value your association with JESSYCABS and are committed to providing you with seamless and exceptional service for all your complete transport needs.
//               <br><br>
//               As per our records, your current agreement with us is set to expire on ${toDate}. To ensure uninterrupted service and maintain the benefits of your association with us, we kindly request you to renew your agreement at the earliest.
//               <br><br>
//               <strong>Here are the key details regarding your renewal:</strong>
//               <ul>
//                   <li><strong>Agreement Expiry Date:</strong> ${toDate}</li>
//                   <li><strong>Renewal Benefits:</strong> [Mention specific benefits or perks, if applicable]</li>
//                   <li><strong>Action Required:</strong> Kindly confirm your intent to renew by [insert deadline, e.g., "December 15, 2024"].</li>
//               </ul>
//               <br>
//               Should you have any questions, wish to make modifications to your agreement, or require further assistance, please feel free to contact us at [insert contact details].
//               <br><br>
//               We truly value your trust and look forward to continuing our association. Thank you for choosing <strong>JESSYCABS</strong>.
//               </p>`,
//       };

//       // Send greeting email to the customer
//       await transporter.sendMail(customerMailOptions);

//       res.status(200).json({ message: 'Email sent successfully' });
//   } catch (error) {
//       console.error('Error while sending email:', error);
//       res.status(500).json({ message: 'An error occurred while sending the email', error: error.message });
//   }
// });


// router.post('/send-emailagreementdata', async (req, res) => {
//   try {
//       const { customer, email } = req.body;

//       console.log('Received data:', { customer, email });

//       // Create a Nodemailer transporter
//       const transporter = nodemailer.createTransport({
//           host: 'smtp.gmail.com',
//           port: 465,
//           secure: true,
//           auth: {
//               user: 'sharan1228s@gmail.com', // Your email
//               pass: 'uqbh faoi ipum dhqb', // App-specific password
//           },
//           tls: {
//               rejectUnauthorized: false,
//           },
//       });

//       const sendEmails = async (customer, email, fromdate, toDate) => {
//           try {
//               // Email to owner
//               const ownerMailOptions = {
//                   from: 'sharan1228s@gmail.com',
//                   to: 'sharan@nastaf.com',
//                   subject: `${customer} sent you a booking request`,
//                   text: `Guest Name: ${customer}\nEmail: ${email}\nGuest Mobile No: ${fromdate}\nStart Date: ${toDate}`,
//               };
//               await transporter.sendMail(ownerMailOptions);

//               // Email to customer
//               const customerMailOptions = {
//                   from: 'sharan1228s@gmail.com',
//                   to: email,
//                   subject: 'Greetings from Jessy Cabs',
//                   html: `
//                       <p>
//                       Dear ${customer},
//                       <br>
//                       I hope this message finds you well. We greatly value your association with JESSYCABS and are committed to providing you with seamless and exceptional service for all your complete transport needs.
//                       <br><br>
//                       As per our records, your current agreement with us is set to expire on ${toDate}. To ensure uninterrupted service and maintain the benefits of your association with us, we kindly request you to renew your agreement at the earliest.
//                       <br><br>
//                       <strong>Here are the key details regarding your renewal:</strong>
//                       <ul>
//                           <li><strong>Agreement Expiry Date:</strong> ${toDate}</li>
//                           <li><strong>Renewal Benefits:</strong> [Mention specific benefits or perks, if applicable]</li>
//                           <li><strong>Action Required:</strong> Kindly confirm your intent to renew by [insert deadline, e.g., "December 15, 2024"].</li>
//                       </ul>
//                       <br>
//                       Should you have any questions, wish to make modifications to your agreement, or require further assistance, please feel free to contact us at [insert contact details].
//                       <br><br>
//                       We truly value your trust and look forward to continuing our association. Thank you for choosing <strong>JESSYCABS</strong>.
//                       </p>`,
//               };
//               await transporter.sendMail(customerMailOptions);

//               console.log('Emails sent successfully');
//           } catch (error) {
//               console.error('Error while sending email:', error);
//           }
//       };

//       // Schedule the email task
//       cron.schedule('0 9 * * *', async () => { // Runs daily at 9 AM
//           const today = new Date();
//           const fromDate = new Date('12/05/2025');
//           const toDate = new Date('12/06/2025');

//           if (today >= fromDate && today <= toDate) {
//               const customer = 'Customer Name';
//               const email = 'customer@example.com';
//               const startDate = '12/12/2024';
//               const endDate = '12/06/2025';
//               await sendEmails(customer, email, startDate, endDate);
//           }
//       });

//       res.status(200).send('Email scheduling task created successfully.');
//   } catch (error) {
//       console.error('Error in /send-emailagreementdata:', error);
//       res.status(500).send('An error occurred.');
//   }
// });


router.get('/TemplateForAgreementMail', async (req, res) => {
  const query = 'SELECT TemplateMessageData FROM TemplateMessage WHERE TemplateInfo = "AgreementMail"';
  db.query(query, (err, results) => {
      if (err) {
          console.log('Database error:', err);
          return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
      }
      console.log('Database results:', results);
      return res.status(200).json(results);
  });
});

router.get('/TemplateForAgreementOwnerMail', async (req, res) => {
  const query = 'SELECT TemplateMessageData FROM TemplateMessage WHERE TemplateInfo = "OwnerAgreementMail"';
  db.query(query, (err, results) => {
      if (err) {
          console.log('Database error:', err);
          return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
      }
      console.log('Database results:', results);
      return res.status(200).json(results);
  });
});

//  auto Email setup
// Utility function for async DB queries
const queryAsync = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};


const getEmailCredentials = async () => {
  const results = await queryAsync("SELECT EmailApp_Password, Sender_mail FROM usercreation LIMIT 1");
  if (results.length > 0) {
    // console.log(results)
    return results[0];
  } else {
    throw new Error('No credentials found in the table.');
  }
};

const TemplateMessageData = async () => {
  const results = await queryAsync('SELECT TemplateMessageData FROM TemplateMessage WHERE TemplateInfo = "AgreementMail"');
  if (results.length > 0) {
    return results[0];
    
  } else {
    throw new Error('No credentials found in the table.');
  }
};
const TemplateMessageDataOwner = async () => {
  const results = await queryAsync('SELECT TemplateMessageData FROM TemplateMessage WHERE TemplateInfo = "OwnerAgreementMail"');
  if (results.length > 0) {
    return results[0];
    
  } else {
    throw new Error('No credentials found in the table.');
  }
};

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'foxfahad386@gmail.com',
//     pass: 'vwmh mtxr qdnk tldd',
//   },
// });

// const credentials = getEmailCredentials();
// transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: credentials.Sender_mail,
//     pass: credentials.EmailApp_Password,
//   },
// });

const createTransporter = async () => {
  try {
    const credentials = await getEmailCredentials(); 
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: credentials.Sender_mail,
        pass: credentials.EmailApp_Password,
      },
    });
    return { transporter, from: credentials.Sender_mail }; 
    // console.log('Transporter created successfully');
    // return transporter;
  } catch (error) {
    console.error('Failed to create transporter:', error);
    throw error;
  }
};

// Function to parse and validate dates
const parseDate = (dateStr) => {
  console.log(`Attempting to parse: "${dateStr}"`);
  
  const validFormats = [
    "DD-MM-YYYY",
    "MM/DD/YYYY",
    "YYYY-MM-DD",
    "ddd, D MMM YYYY HH:mm:ss [GMT]",
    "YYYY-MM-DDTHH:mm:ssZ",
    "DD/MM/YYYY"
  ];

  for (const format of validFormats) {
    const parsedDate = moment(dateStr, format, true); 
    if (parsedDate.isValid()) {
      console.log(`Parsed successfully with format "${format}": ${parsedDate.format("DD-MM-YYYY")}`);
      return parsedDate;
    }
  }

  console.error(`Failed to parse: "${dateStr}"`);
  return null;
};

// Subscription reminders function
// const sendSubscriptionReminders = async () => {
//   const today = moment();

//   db.query("SELECT email, customer, toDate FROM Aggrement WHERE toDate IS NOT NULL AND toDate != ''", (err, results) => {
//     if (err) {
//       console.error("Error fetching subscriptions:", err);
//       return;
//     }

//     results.forEach(async (user) => {
//       if (!user.toDate) {
//         console.error(`Missing date for ${user.email}`);
//         return;
//       }

//       const subscriptionEnd = parseDate(user.toDate.trim());

//       if (!subscriptionEnd) {
//         console.error(`Invalid subscription end date for ${user.email} with date: ${user.toDate}`);
//         return;
//       }

//       const fifthMonthStart = subscriptionEnd.clone().subtract(1, "month").startOf("month");
//       const fifthMonthEnd = subscriptionEnd.clone().subtract(1, "month").endOf("month");
//       const previousDay = subscriptionEnd.clone().subtract(1, "day");

//       console.log(`Reminder period for ${user.email}: ${fifthMonthStart.format("DD-MM-YYYY")} to ${fifthMonthEnd.format("DD-MM-YYYY")}`);

//       if (today.isSameOrAfter(fifthMonthStart) && today.isSameOrBefore(fifthMonthEnd)) {
//         try {
//           // Send reminder email
//           // const transporter = await createTransporter();
//           const { transporter, from } = await createTransporter();
//           // console.log('Sending email...')
//           await transporter.sendMail({
//             from,
//             to: user.email,
//             subject: 'Subscription Reminder',
//             html: `
//               <p>Dear ${user.customer},</p>
//               <p>I hope this message finds you well. We greatly value your association with <strong>JESSYCABS</strong> and are committed to providing you with seamless and exceptional service for all your complete transport needs.</p>
//               <p>As per our records, your current agreement with us is set to expire on <strong style="color: red;">${subscriptionEnd.format("DD-MM-YYYY")}</strong>.</p>
//               <p>To ensure uninterrupted service and maintain the benefits of your association with us, we kindly request you to renew your agreement at the earliest.</p>
//               <p>Here are the key details regarding your renewal:</p>
//               <ul>
//                 <li><strong>Agreement Expiry Date:</strong> ${subscriptionEnd.format("DD-MM-YYYY")}</li>
//                 <li><strong>Renewal Benefits:</strong> [Mention specific benefits or perks, if applicable]</li>
//               </ul>
//               <p><strong>Action Required:</strong> Kindly confirm your intent to renew by <span style="color: red;">${previousDay.format("DD-MM-YYYY")}</span>.</p>
//               <p>Should you have any questions, wish to make modifications to your agreement, or require further assistance, please feel free to contact us at [insert contact details].</p>
//               <p>We truly value your trust and look forward to continuing our association. Thank you for choosing <strong>JESSYCABS</strong>.</p>
//             `,
//           });
//           console.log(`Reminder sent to ${user.email}`);

//           // Send notification to admin
//           await transporter.sendMail({
//             from,
//             to:from,
//             subject: 'Customer Subscription Reminder Sent',
//             text: `The subscription reminder email has been successfully sent to ${user.customer} (${user.email}) with an expiry date of ${subscriptionEnd.format("DD-MM-YYYY")}.`,
//           });
//           console.log(`Notification sent to admin for ${user.email}`);
//         } catch (error) {
//           console.error(`Failed to send email to ${user.email}:`, error);
//         }
//       } else {
//         console.log(`No reminder needed for ${user.email} today.`);
//       }
//     });
//   });
// };


const sendSubscriptionReminders = async () => {
  const today = moment();

  db.query("SELECT email, customer, toDate FROM Aggrement WHERE toDate IS NOT NULL AND toDate != ''", async (err, results) => {
    if (err) {
      console.error("Error fetching subscriptions:", err);
      return;
    }

    for (const user of results) {
      if (!user.toDate) {
        console.error(`Missing date for ${user.email}`);
        continue;
      }

      const subscriptionEnd = parseDate(user.toDate.trim());
      if (!subscriptionEnd) {
        console.error(`Invalid subscription end date for ${user.email} with date: ${user.toDate}`);
        continue;
      }

      const fifthMonthStart = subscriptionEnd.clone().subtract(1, "month").startOf("month");
      const fifthMonthEnd = subscriptionEnd.clone().subtract(1, "month").endOf("month");
      const previousDay = subscriptionEnd.clone().subtract(1, "day");

      console.log(`Reminder period for ${user.email}: ${fifthMonthStart.format("DD-MM-YYYY")} to ${fifthMonthEnd.format("DD-MM-YYYY")}`);

      if (today.isSameOrAfter(fifthMonthStart) && today.isSameOrBefore(fifthMonthEnd)) {
        try {
          // Fetch the customer email template
          const templateData = await TemplateMessageData();

          if (!templateData || !templateData.TemplateMessageData) {
            console.error('No customer email template data found.');
            continue;
          }

          // Prepare replacements for customer email
          const customerReplacements = {
            '${user.customer}': user.customer,
            '${subscriptionEnd.format("DD-MM-YYYY")}': subscriptionEnd.format("DD-MM-YYYY"),
            '${previousDay.format("DD-MM-YYYY")}': previousDay.format("DD-MM-YYYY"),
          };

          // Replace placeholders in the customer email template
          let customerEmailMessage = templateData.TemplateMessageData;
          for (const [placeholder, value] of Object.entries(customerReplacements)) {
            customerEmailMessage = customerEmailMessage.split(placeholder).join(value);
          }

          // Create transporter
          const { transporter, from } = await createTransporter();

          // Send customer reminder email
          await transporter.sendMail({
            from,
            to: user.email,
            subject: 'Subscription Reminder',
            html: customerEmailMessage,
          });

          console.log(`Reminder sent to ${user.email}`);

          // Fetch the admin notification template
          const adminTemplateData = await TemplateMessageDataOwner();

          if (!adminTemplateData || !adminTemplateData.TemplateMessageData) {
            console.error('No admin notification template data found.');
            continue;
          }

          // Prepare replacements for admin notification
          const adminReplacements = {
            '${user.customer}': user.customer,
            '${user.email}': user.email,
            '${subscriptionEnd.format("DD-MM-YYYY")}': subscriptionEnd.format("DD-MM-YYYY"),
          };

          // Replace placeholders in the admin notification template
          let adminEmailMessage = adminTemplateData.TemplateMessageData;
          for (const [placeholder, value] of Object.entries(adminReplacements)) {
            adminEmailMessage = adminEmailMessage.split(placeholder).join(value);
          }

          // Strip HTML tags for plain text version (if needed)
          const plainTextMessage = adminEmailMessage.replace(/<\/?[^>]+(>|$)/g, "");

          // Send admin notification email as plain text
          await transporter.sendMail({
            from,
            to: from,
            subject: 'Customer Subscription Reminder',
            text: plainTextMessage, // send as plain text
          });

          console.log(`Notification sent to admin for ${user.email}`);
        } catch (error) {
          console.error(`Failed to send email to ${user.email}:`, error);
        }
      } else {
        console.log(`No reminder needed for ${user.email} today.`);
      }
    }
  });
};


cron.schedule('00 09 * * *', () => {
  console.log('Running daily subscription reminder job...');
  sendSubscriptionReminders();
});


  router.get('/lastcustomergetimage', (req, res) => {
    db.query('SELECT customer  FROM  Aggrement ORDER BY customer DESC LIMIT  1', (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      const lastcustomer = result[0];
      return res.status(200).json(lastcustomer);
    });
  });
  

  router.post('/agreementpdf_Document/:id',uploadfile.single("file"), async (req, res) => {
    const customer = req.params.id;
    const fileType = req.file.mimetype;
    const sql = `insert into agreement_image(customer,Agreement_Image,file_type)values(${customer},'${fileType}')`;
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error" });
        return res.json({ Status: "success" });
    })
})

  router.get('/agreement_Docview/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT Agreement_Image FROM agreement_image WHERE customer = ?';
    
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error retrieving data from agreement_image table" });
      }
    //   console.log(result ,"uuuuuuuuuuuuuuuuu");
      
      return res.status(200).json(result);
      
    });
  });


  
  
// TO Delete
router.delete('/agreementimage-delete/:filename', (req, res) => {
    const sql = "delete from agreement_image where Agreement_Image=?";
    const fileName = req.params.filename;
    const oldFileName = req.params.filename;
    if (oldFileName) {
        const oldImagePath = path.join("./customer_master/public/agreement_doc", oldFileName);
        try {
            fs.unlinkSync(oldImagePath)
        } catch { }

    }
    db.query(sql, [fileName], (err, result) => {
        if (err) return res.json({ Message: "Error inside serevre" });
        return res.json(result);
    })
})


router.get('/Customerdatasfetch', (req, res) => {
    const sql = `
        SELECT 
            customers.customer, 
            customers.address1, 
            customers.gstnumber, 
            customerOrderdata.orderByEmail,
            customerOrderdata.orderByMobileNo   
        FROM customers
        JOIN customerOrderdata
        ON customers.customer = customerOrderdata.customer
    `;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Failed to retrieve data from MySQL" });
        }
        console.log(result);
        return res.status(200).json(result);
    });
});

router.put('/agreementedit/:id', (req, res) => {

    const email= req.params.id
    const updatedCustomerData = req.body;
    console.log(email,"dddd",updatedCustomerData)
    db.query('UPDATE Aggrement SET ? WHERE id = ?', [updatedCustomerData,email], (err,  result) => {
        if (err) {
            console.log(err,"agg")
            return res.status(500).json({ error: 'Failed to update data in MySQL' });
        }
        console.log(result,"agg")
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        console.log(result,"agg")
        return res.status(200).json({ message: 'Data updated successfully' });
    });
});

// Delete Customer Master data
    router.delete('/aggreementdeleteid/:id', (req, res) => {
        const id = req.params.id; 

        db.query('DELETE FROM Aggrement WHERE id = ?', [id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to delete data from MySQL' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Customer not found' });
            }
            return res.status(200).json({ message: 'Data deleted successfully' });
        });
    });

router.get('/agreementdata', (req, res) => {
    db.query('SELECT * FROM Aggrement', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
        }
        return res.status(200).json(results);
    });
});

module.exports = router;    