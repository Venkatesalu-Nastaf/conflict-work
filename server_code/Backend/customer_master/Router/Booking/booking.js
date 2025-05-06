const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const db = require('../../../db');
const multer = require('multer');
const moment = require('moment');
const path = require('path');

//its for to use aysn/await 
const util = require('util');
const { error } = require('console');
const query = util.promisify(db.query).bind(db)

// const attachedmailDirectory = path.join(__dirname, 'uploads');
// console.log(attachedmailDirectory, "attachedmailDirectory")
// router.use('/images', express.static(attachedmailDirectory));
// router.use(express.static('customer_master'));
// const upload = multer({ dest: 'uploads/' });

router.post('/booking', async (req, res) => {
    const bookData = req.body;

    db.query('INSERT INTO booking SET ?', bookData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to insert data " });
        }

        // Check if the insertion was successful (affectedRows > 0)

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Data inserted successfully", data: result });
        } else {
            return res.status(404).json({ error: "Failed to Add Booking Details" });
        }
    });

});
router.post('/bookinglogDetails', async (req, res) => {
    const bookData = req.body;

    db.query('INSERT INTO BookingLogDetails SET ?', bookData, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: "Failed to insert data into MySQL" });
        }

        // Check if the insertion was successful (affectedRows > 0)
        if (result.affectedRows === 0) {
            return res.status(400).json("data not inserted succefully")
        }
        return res.status(200).json("data  inserted succefully")

    });
})

// collect details from Booking
// router.get('/booking/:bookingno', (req, res) => {
//     const bookingno = req.params.bookingno;
//     db.query('SELECT * FROM booking WHERE bookingno = ?', bookingno, (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
//         }
//         if (result.length === 0) {
//             return res.status(404).json({ error: 'Booking not found' });
//         }
//         const bookingDetails = result[0]; // Assuming there is only one matching booking
//         return res.status(200).json(bookingDetails);
//     });
// });


router.get('/booking/:bookingno', (req, res) => {
    const bookingno = req.params.bookingno;
    const username = req.query.loginUserName;

    let data = '';

    if (!username) {
        return res.status(500).json({ error: "username is undefined" })
    }
    db.query('SELECT * FROM booking WHERE bookingno = ?', bookingno, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        if (result.length > 0) {


            db.query("SELECT Stationname FROM usercreation WHERE username=?", [username], async (err, results) => {
                if (err) {
                    return res.status(500).json({ error: "there some issue ffetching station name " })
                }

                data = await results[0]?.Stationname;

                console.log("data", data)
                const arryData = data.split(',');
                console.log("arryData", arryData)
                if (data && data.toLowerCase() === "all" || arryData.includes("ALL")) {
                    // its for fetch by All
                    await db.query(`SELECT * FROM booking WHERE bookingno = ? `, bookingno, (err, result) => {
                        if (err) {
                            return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
                        }
                        if (result.length === 0) {

                            return res.status(404).json({ error: 'status is billed all' });
                        }
                        const bookingDetails = result[0]; // Assuming there is only one matching booking
                        return res.status(200).json(bookingDetails);
                    });
                }

                else if (arryData) {
                    await db.query(`SELECT * FROM booking WHERE bookingno = ? AND servicestation IN (?)  `, [bookingno, arryData], (err, result) => {
                        if (err) {
                            return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
                        }
                        if (result.length === 0) {

                            // return res.status(404).json({ error: 'u dont have accesss the page of stations' });
                            return res.status(404).json({ error: "you don't have access to this trip sheet based on service station" });
                        }

                        const bookingDetails = result[0]; // Assuming there is only one matching booking
                        return res.status(200).json(bookingDetails);

                    });
                }

            });
        }
    })
});

router.get('/drivernamedrivercreation', (req, res) => {
    const sql = 'SELECT drivername,Mobileno FROM drivercreation';
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to retrieve data from MySQL" });
        }
        // Assuming your `result` contains a field `drivername` and `Mobileno`
        return res.status(200).json(result);
    });
});

router.get('/vehicleinfodatavehcile', (req, res) => {
    db.query('SELECT * FROM vehicleinfo', (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch data from MySQL" });
        }
        return res.status(200).json(results);
    });
});


router.get('/last-booking-no', (req, res) => {
    db.query('SELECT * FROM booking ORDER BY bookingno DESC LIMIT 1', (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        const lastBooking = result[0];
        return res.status(200).json(lastBooking);
    });
});

// delete booking details
router.delete('/booking/:bookingno', async (req, res) => {
    const bookingno = req.params.bookingno;

    try {
        //check this booking added tripsheet or not
        const checkBookingId = await query('select bookingno from tripsheet where bookingno=?', [bookingno])
        if (checkBookingId.length > 0) return res.json({ message: "This Booking dosen't allowed to delete", error: false, success: true })

        const response = await query('DELETE FROM booking WHERE bookingno = ?', bookingno)
        if (response.affectedRows > 0) return res.status(201).json({ message: "Successfully deleted ", success: true, error: false })

        // return res.json({ message: "check Booking Id", error: false, success: true })

    } catch (err) {
        res.status(500).json({
            message: err.message,
            success: false,
            error: true
        })
    }

    // db.query('DELETE FROM booking WHERE bookingno = ?', bookingno, (err, result) => {
    //     if (err) {
    //         return res.status(500).json({ error: "Failed to delete data from MySQL" });
    //     }
    //     if (result.affectedRows === 0) {
    //         return res.status(404).json({ error: "Customer not found" });
    //     }
    //     return res.status(200).json({ message: "Data deleted successfully" });
    // });

});


router.delete('/bookingDLETEUPLOAD/:bookingno', async (req, res) => {
    const bookingno = req.params.bookingno;
  
    // Check if this booking added tripsheet or not
    db.query('SELECT * FROM booking_doc WHERE booking_id = ?', [bookingno], (err1, result1) => {
      if (err1) {
        console.log(err1,"bb")
        return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
      }
  
      if (result1.length > 0) {
        // If booking exists, delete it
        db.query('DELETE FROM booking_doc WHERE booking_id = ?', [bookingno], (err, result2) => {
          if (err) {
            console.log(err,"aa")
            return res.status(500).json({ error: 'Failed to delete booking details from MySQL' });
          }
          return res.status(200).json("Successfully deleted");
        });
      } else {
        // Booking not found
        return res.status(200).json("Data not found");
      }
    });
  });
  


// update booking details
router.put('/booking/:bookingno/:dataadmin', async (req, res) => {
    const bookingno = req.params.bookingno;
    const datasuperADMIN = req.params.dataadmin;
    const dd = datasuperADMIN === "true" ? "yes":"no"
  
    const updatedCustomerData = req.body;
    try {
        //check this booking added tripsheet or not
        if(dd === "no"){
        const checkBookingId = await query('select bookingno from tripsheet where bookingno=?', [bookingno])
        if (checkBookingId.length > 0) return res.json({ message: "This Booking dosen't allowed to edit", error: false, success: true })
        }

        // Update the booking
       
        const updateResult = await query('UPDATE booking SET ? WHERE bookingno = ?', [updatedCustomerData, bookingno])
        if (updateResult.affectedRows === 0) return res.json({ message: "Booking Id not found", error: false, success: true });
        

        return res.status(201).json({ message: "Updated successfully", success: true, error: false });

    } catch (err) {
        return res.status(500).json({
            message: err.message,
            error: true,
            success: false
        })
    }


    //--------------------------------------------------------------------------------------------------
    // db.query('UPDATE booking SET ? WHERE bookingno = ?', [updatedCustomerData, bookingno], (err, result) => {
    //     // if (err) return res.status(500).json({ message: "Failed to update data in MySQL", error: true, success: false });

    //     // if (result.affectedRows === 0) return res.status(404).json({ message: "Customer not found", error: true, success: false });

    //     if (updatedCustomerData.status === "Cancelled") {
    //         db.query('select * from tripsheet WHERE bookingno = ?', [bookingno], (err, result1) => {
    //             // if (err) return res.status(500).json({ message: "Failed to update data in MySQL", error: true, success: false });

    //             if (result1.length > 0) {
    //                 db.query('UPDATE tripsheet SET status = ? WHERE bookingno = ?', [updatedCustomerData.status, bookingno], (err, result2) => {
    //                     if (err) return res.status(500).json({ message: "Failed to update data in MySQL", error: true, success: false });

    //                     if (result2.affectedRows > 0) {
    //                         return res.status(200).json({ message: "Data updated successfully", error: false, success: true });
    //                     }
    //                 });
    //             }
    //             else {
    //                 return res.status(200).json({ message: "Data updated successfully", error: false, success: true });
    //             }
    //         })
    //     } else {
    //         // If the status is not "Cancelled", simply send the response here
    //         return res.status(200).json({ message: "Data updated successfully", error: false, success: true });
    //     }
    // });'
    //-------------------------------------------------------------------------------------------------
}
);


//booking number change
router.get('booking', async (req, res) => {
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
// router.post('/upload', upload.single('file'), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: 'No file uploaded.' });
//     }

//     const fileData = {
//         name: req.file.originalname,
//         mimetype: req.file.mimetype,
//         size: req.file.size,
//         path: req.file.path,
//         bookingno: req.body.bookingno,
//     };

//     const query = 'INSERT INTO upload SET ?';
//     db.query(query, fileData, (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: 'Error storing file in the database.' });
//         }
//         return res.status(200).json({ message: 'File uploaded and data inserted successfully.' });
//     });
// });

// collect data from vehicleInfo database
router.get('/name-customers/:customer', (req, res) => {
    const customer = req.params.customer; // Access the parameter using req.params
    // Modify the query to use the LIKE operator for partial matching
    db.query('SELECT * FROM customers WHERE customer LIKE ?', [`%${customer}%`], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve customer details from MySQL' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        const customerDetails = result[0]; // Assuming there is only one matching customer
        return res.status(200).json(customerDetails);
    });
});


router.get('/drivername-details/:driver', (req, res) => {
    const customer = req.params.driver;
    console.log("customer", customer)
    // Modify the query to use the LIKE operator for partial matching
    // db.query('SELECT * FROM  vehicleinfo WHERE driverName OR  vehRegNo LIKE ? ', [`${customer}%`], (err, result) => {
    db.query('SELECT * FROM  vehicleinfo WHERE driverName LIKE ? OR vehRegNo LIKE ?', [`%${customer}%`, `%${customer}%`], (err, result) => {
        console.log("result", result)
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve customer details from MySQL' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        // Assuming there is only one matching customer


        let vehderivername = result.map(obj => obj.driverName);

        db.query('select Mobileno,driverName from drivercreation where driverName in (?)', [vehderivername], (err, result1) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to retrieve customer details from MySQL' });
            }
            if (result1.length === 0) {
                return res.status(404).json({ error: 'Customer not found' });
            }
            const vehicleDataname = {};

            result1.forEach(row => {
                vehicleDataname[row.driverName] = { MobileNo: row.Mobileno };

            });

            result.forEach(obj => {
                const vehicle = vehicleDataname[obj.driverName];

                obj.driverno = vehicle ? vehicle.MobileNo : 'Unknown'; // Set default value if fueltype not found

            });
            return res.status(200).json(result);
        })

    });
});

// ----------------------------------tripsheest travelname code api-----------------------
router.get('/drivername-detailsaccount/:driver', (req, res) => {
    const customer = req.params.driver;
    console.log("customer", customer);

    // Query to perform left joins
    // const query = `
    //     SELECT 
    //         ai.*,
    //         vi.Groups, vi.hiretypes, vi.vehicleName As vehicleName2, vi.vehType, 
    //         dc.Mobileno As mobileNo
    //     FROM accountinfo ai
    //     LEFT JOIN vehicleinfo vi ON ai.vehRegNo = vi.vehRegNo
    //     LEFT JOIN drivercreation dc ON ai.driverName = dc.driverName
    //     WHERE ai.driverName LIKE ? OR ai.vehRegNo LIKE ?
    // `;
    const query = `
    SELECT 
        ai.travelsname,ai.travelsemail,ai.rateType,vehicleInfo as hiretypes,ai.vehRegNo,ai.driverName,
        vi.Groups,vi.vehicleName As vehicleName2,
        dc.Mobileno As mobileNo
    FROM accountinfo ai
    LEFT JOIN vehicleinfo vi ON ai.vehRegNo = vi.vehRegNo
    LEFT JOIN drivercreation dc ON ai.driverName = dc.driverName
    WHERE ai.driverName LIKE ? OR ai.vehRegNo LIKE ?
`;

    db.query(query, [`%${customer}%`, `%${customer}%`], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'Failed to retrieve customer details from MySQL' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        return res.status(200).json(result);
    });
});



router.get('/travelsnamedetailfetch/:travelname', (req, res) => {
    const travelname = req.params.travelname;
    console.log("customer", travelname);

    // Query to perform left joins
    // const query = `
    //     SELECT 
    //         ai.*,
    //         vi.Groups, vi.hiretypes, vi.vehicleName As vehicleName2, vi.vehType, 
    //         dc.Mobileno As mobileNo
    //     FROM accountinfo ai
    //     LEFT JOIN vehicleinfo vi ON ai.vehRegNo = vi.vehRegNo
    //     LEFT JOIN drivercreation dc ON ai.driverName = dc.driverName
    //     WHERE ai.travelsname=?
    // `;
    const query = `
        SELECT 
             ai.travelsname,ai.travelsemail,ai.rateType,vehicleInfo as hiretypes,ai.vehRegNo,ai.driverName,
            vi.Groups, vi.vehicleName As vehicleName2,
            dc.Mobileno As mobileNo
        FROM accountinfo ai
        LEFT JOIN vehicleinfo vi ON ai.vehRegNo = vi.vehRegNo
        LEFT JOIN drivercreation dc ON ai.driverName = dc.driverName
        WHERE ai.travelsname=?
    `;

    db.query(query, [travelname], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'Failed to retrieve customer details from MySQL' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        return res.status(200).json(result);
    });
});

// -------------------------------------------------------------end of tripsheet code api travrls name-------------------------



// --------------------------------this for booking travelsname------------------------------------------------------------

// router.get('/travelsnamedetailfetchbooking/:travelname', (req, res) => {
//     const travelname = req.params.travelname;
//     console.log("customer", travelname);

//     // Query to perform left joins
//     const query = `
//         SELECT 
//             ai.*,
//             vi.Groups, vi.hiretypes as hireTypes, vi.vehicleName, vi.vehType as vehiclemodule, 
//             dc.Mobileno As mobileNo
//         FROM accountinfo ai
//         LEFT JOIN vehicleinfo vi ON ai.vehRegNo = vi.vehRegNo
//         LEFT JOIN drivercreation dc ON ai.driverName = dc.driverName
//         WHERE ai.travelsname=?
//     `;

//     db.query(query, [travelname], (err, result) => {
//         if (err) {
//             console.log(err)
//             return res.status(500).json({ error: 'Failed to retrieve customer details from MySQL' });
//         }
//         if (result.length === 0) {
//             return res.status(404).json({ error: 'Customer not found' });
//         }

//         return res.status(200).json(result);
//     });
// });

router.get('/travelsnamedetailfetchbooking/:travelname', (req, res) => {
    const travelname = req.params.travelname;
    console.log("customer", travelname);

    // Query to perform left joins
    // const query = `
    //     SELECT 
    //         ai.travelsname,ai.travelsemail,ai.rateType,vehicleInfo as hireTypes,ai.vehRegNo,ai.driverName,
    //         vi.Groups,vi.vehicleName, vi.vehType as vehiclemodule, 
    //         dc.Mobileno As mobileNo
    //     FROM accountinfo ai
    //     LEFT JOIN vehicleinfo vi ON ai.vehRegNo = vi.vehRegNo
    //     LEFT JOIN drivercreation dc ON ai.driverName = dc.driverName
    //     WHERE ai.travelsname=?
    // `;

    const query = `
    SELECT 
        ai.travelsname,ai.travelsemail,ai.rateType,vehicleInfo as hireTypes,ai.vehRegNo,ai.driverName,
        vi.Groups,vi.vehicleName as vehicleTyped,
        dc.Mobileno As mobileNo
    FROM accountinfo ai
    LEFT JOIN vehicleinfo vi ON ai.vehRegNo = vi.vehRegNo
    LEFT JOIN drivercreation dc ON ai.driverName = dc.driverName
    WHERE ai.travelsname=?
`;

    db.query(query, [travelname], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve customer details' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Travels Data not found' });
        }
        return res.status(200).json(result);
    });
});



// router.get('/drivername-detailsaccountbooking/:driver', (req, res) => {
//     const customer = req.params.driver;
//     console.log("customer", customer);

//     // Query to perform left joins
//     // const query = `
//     //     SELECT 
//     //         ai.*,
//     //         vi.Groups,vi.hiretypes as hireTypes,vi.vehicleName, vi.vehType as vehiclemodule, 
//     //         dc.Mobileno As mobileNo
//     //     FROM accountinfo ai
//     //     LEFT JOIN vehicleinfo vi ON ai.vehRegNo = vi.vehRegNo
//     //     LEFT JOIN drivercreation dc ON ai.driverName = dc.driverName
//     //     WHERE ai.driverName LIKE ? OR ai.vehRegNo LIKE ?
//     // `;
//     const query = `
//     SELECT 
//          ai.travelsname,ai.travelsemail,ai.rateType,vehicleInfo as hireTypes,ai.vehRegNo,ai.driverName,
//         vi.Groups,vi.vehicleName,vi.vehType as vehiclemodule, 
//         dc.Mobileno As mobileNo
//     FROM accountinfo ai
//     LEFT JOIN vehicleinfo vi ON ai.vehRegNo = vi.vehRegNo
//     LEFT JOIN drivercreation dc ON ai.driverName = dc.driverName
//     WHERE ai.driverName LIKE ? OR ai.vehRegNo LIKE ?
// `;

//     db.query(query, [`%${customer}%`, `%${customer}%`], (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to retrieve customer details ' });
//         }
//         if (result.length === 0) {
//             return res.status(404).json({ error: 'Data not found' });
//         }
//         return res.status(200).json(result);
//     });
// });
//send email from booking page
// router.post('/send-email', async (req, res) => {
//     try {
//         const { guestname, guestmobileno, email, useage, pickup } = req.body;
//         const transporter = nodemailer.createTransport({
//             host: 'smtp.gmail.com',
//             port: 465,
//             secure: true,
//             auth: {
//                 user: 'foxfahad386@gmail.com', // Your email address
//                 pass: 'vwmh mtxr qdnk tldd' // Your email password
//             },
//             tls: {
//                 // Ignore SSL certificate errors
//                 rejectUnauthorized: false
//             }
//         });

//         // Email content for the owner
//         const ownerMailOptions = {
//             from: 'foxfahad386@gmail.com',
//             to: 'foxfahad386@gmail.com', // Set the owner's email address
//             subject: `${guestname} sent you a feedback`,
//             text: `Guest Name: ${guestname}\nEmail: ${email}\nContact No: ${guestmobileno}\nPickup: ${pickup}\nUsage: ${useage}`,
//         };

//         // Send email to the owner
//         await transporter.sendMail(ownerMailOptions);

//         // Email content for the customer
//         const customerMailOptions = {
//             from: 'foxfahad386@gmail.com',
//             to: email,
//             subject: 'Greetings from Jessy Cabs',
//             text: `Hello ${guestname},\n\nThank you for reaching out. Your booking is Placed successfully\n\nRegards,\nJessy Cabs`,
//         };

//         // Send greeting email to the customer
//         await transporter.sendMail(customerMailOptions);

//         res.status(200).json({ message: 'Email sent successfully' });
//     } catch {
//         res.status(500).json({ message: 'An error occurred while sending the email' });
//     }
// });

router.post('/send-email', async (req, res) => {
    try {
        const { Address, guestname, guestmobileno, customeremail, email, startdate, starttime, driverName, useage, vehicleName, mobileNo, vehRegNo, servicestation, status, requestno, bookingno, duty, username, Sendmailauth, Mailauthpass } = req.body;
        console.log(Address, guestname, guestmobileno, customeremail, email, startdate, starttime, driverName, useage, vehicleName, mobileNo, vehRegNo, servicestation, status, requestno, bookingno, duty, username, Sendmailauth, Mailauthpass, "mailto")
        const formattedFromDate = moment(startdate).format('DD-MM-YYYY');
      
        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            // auth: {
            //     user: 'foxfahad386@gmail.com',
            //     pass: 'vwmh mtxr qdnk tldd',
            // },
            // auth: {
            //     user: process.env.MAIL_AUTH,
            //     pass:process.env.MAIL_PASS,
            // },
            auth: {
                user: Sendmailauth,
                pass: Mailauthpass,
            },
            tls: {
                rejectUnauthorized: false
            }
        });


        if (status === "Cancelled") {

            const customerMailOptions = {
                // from: 'foxfahad386@gmail.com',
                from: Sendmailauth,
                to: `${email},${customeremail}`,
                subject: `JESSY CABS CONFIRMS CANCELLATION OF BOOKING For ${guestname}-Tripsheet No.${bookingno}`,
                html: `
            <table border="1" bordercolor="#000000" style="border-collapse: collapse; width: 100%;">
                    <thead style="background-color: #9BB0C1 ; color: #FFFFFF;">
                        <tr>
                            <th colspan="2" style="padding: 8px; text-align: center;">JESSY CABS BOOKING CANCELLATION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 8px;"><strong>Booking No:</strong></td>
                            <td style="padding: 8px; color: #000">${bookingno || ""}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Name of Guest:</strong></td>
                            <td style="padding: 8px;color: #000"">${guestname || ""}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Location:</strong></td>
                            <td style="padding: 8px;color: #000"">${servicestation || ""}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Date:</strong></td>
                            <td style="padding: 8px;color: #000"">${formattedFromDate || ""}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Time (24):</strong></td>
                            <td style="padding: 8px;color: #000"">${starttime || ""} Hrs</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Car Sent:</strong></td>
                            <td style="padding: 8px;color: #000"">${vehicleName || ""}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Vehicle RegNo:</strong></td>
                            <td style="padding: 8px;color: #000"">${vehRegNo || ""}</td>
                        </tr>
                          ${requestno ? `
                    <tr>
                     <td style="padding: 8px;"><strong>Request Id:</strong></td>
                      <td style="padding: 8px; color: #000;">${requestno || ""}</td>
                      </tr>
                       ` : ''}
                        <tr>
                            <td style="padding: 8px;"><strong>Driver Name / Phone:</strong></td>
                            <td style="padding: 8px;color: #000"">${driverName || ""}</td>
                        </tr>
                    </tbody>
                </table>
                <p>In case of any further queries or clarifications, kindly contact our Help Desk. Our team will be more than happy to assist you. Wish you a pleasant journey.</p>
 <br>
                  <br>
                   <p>
                Warm Regards,<br><br>
                 JESSY CABS PVT LTD | PAN INDIA SERVICES<br>
                 Head Office : Flat No 2, II Floor, Swathi Complex, Nandanam Chennai - 600017<br>
                24x7 Help Desk : booking@jessycabs.in / 04449105959 / 8754515959<br>
              www.jessycabs.in
              </p>
        
          `,
            };


            await transporter.sendMail(customerMailOptions);
            // await transporter.sendMail(ownerMailOptions);
            res.status(200).json({ message: 'Email sent successfully' });
        }
        else {

            const customerMailOptions1 = {
                // from: 'foxfahad386@gmail.com',
                from: Sendmailauth,
                to: `${email},${customeremail}`,
                subject: `JESSY CABS PVT LTD BOOKING CONFIRMATION FOR ${guestname} - Travel Request No. ${bookingno} `,
                html: `
            <p>Dear Sir/Madam,</p>
            <p>Greetings from JESSY CABS PVT LTD !!!</p>
             <p>Thank you for booking with us! Your booking has been confirmed. Please find the details below:</p>
            <table border="1" bordercolor="#000000" style="border-collapse: collapse; width: 100%;">
                    <thead style="background-color: #9BB0C1; color: #FFFFFF;">
                        <tr>
                            <th colspan="2" style="padding: 8px; text-align: center;">JESSY CABS PVT LTD Booking Confirmation </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 8px;"><strong>Booking No:</strong></td>
                            <td style="padding: 8px;">${bookingno}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Name of Guest:</strong></td>
                            <td style="padding: 8px;">${guestname}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Contact Number :</strong></td>
                            <td style="padding: 8px;">${guestmobileno}</td>
                        </tr>

                         </tr>
                        <tr>
                        <td style="padding: 8px;"><strong>Location :</strong></td>
                        <td style="padding: 8px;color: #000"">${servicestation}</td>
                    </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Reporting Date :</strong></td>
                            <td style="padding: 8px;">${formattedFromDate}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Reporting Time(24HR) :</strong></td>
                            <td style="padding: 8px;">${starttime} Hrs</td>
                        </tr>
                       
                        <tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Reporting Address:</strong></td>
                            <td style="padding: 8px;">${Address}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Drop Address :</strong></td>
                            <td style="padding: 8px;">${useage}</td>
                        </tr>
                       
                        <tr>
                        <td style="padding: 8px;"><strong>Type of Car Required:</strong></td>
                        <td style="padding: 8px;color: #000"">${vehicleName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;"><strong>Duty Type</strong></td>
                        <td style="padding: 8px;color: #000"">${duty}</td>
                    </tr>
                     ${requestno ? `
                    <tr>
                     <td style="padding: 8px;"><strong>Request Id:</strong></td>
                      <td style="padding: 8px; color: #000;">${requestno}</td>
                      </tr>
                       ` : ''}
                    <tr>
                        <td style="padding: 8px;"><strong>Confirmed By:</strong></td>
                        <td style="padding: 8px;color: #000"">${username}</td>
                    </tr>
                    </tbody>
                </table>
                <p>The Vehicle and Driver details will be sent to you before the pick-up time. Incase of any further queries or clarifications, kindly contact our Help Desk. Our team will be more than happy to assist you. Wish you a pleasant journey.</p>
                  <br>
        <br>
        <p>
                Warm Regards,<br><br>
JESSY CABS PVT LTD | PAN INDIA SERVICES<br>
Head Office : Flat No 2, II Floor, Swathi Complex, Nandanam Chennai - 600017<br>
24x7 Help Desk : booking@jessycabs.in / 04449105959 / 8754515959<br>
www.jessycabs.in
</p>
          `,
            }
            // await transporter.sendMail(ownerMailOptions1);


            await transporter.sendMail(customerMailOptions1);
            res.status(200).json({ message: 'Email sent successfully' });

        }

    } catch (error) {
        res.status(500).json({ message: 'An error occurred while sending the email' });
    }
});
//end booking mail
//send email from online-booking page
router.post('/send-onbook-email', async (req, res) => {
    try {
        const { guestname, guestmobileno, email, startdate, starttime, pickup, useage, duty, vehType, remarks, } = req.body;

        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'foxfahad386@gmail.com',
                pass: 'vwmh mtxr qdnk tldd',
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Email content for the owner
        const ownerMailOptions = {
            from: 'foxfahad386@gmail.com',
            to: 'foxfahad386@gmail.com.com', // Set the owner's email address
            subject: `${guestname} sent you a booking request`,
            text: `Guest Name: ${guestname}\nEmail: ${email}\nGuest Mobile No: ${guestmobileno}\nStart Date: ${startdate}\nStart Time: ${starttime}\nPickup: ${pickup}\nUseage: ${useage}\nDuty: ${duty}\nVehicle Type: ${vehType}\nRemarks: ${remarks}`,
        };

        // Send email to the owner
        await transporter.sendMail(ownerMailOptions);

        // Email content for the customer
        const customerMailOptions = {
            from: 'foxfahad386@gmail.com',
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
        res.status(500).json({ message: 'An error occurred while sending the email' });
    }
});
//end online-booking mail
//End booking page database 
//search function for booking page
// router.get('/table-for-booking', (req, res) => {
//     const { searchText, fromDate, toDate } = req.query;
//     let query = 'SELECT * FROM booking WHERE 1=1';
//     let params = [];

//     if (searchText) {
//         const columnsToSearch = [
//             'bookingno',
//             'bookingdate',
//             'bookingtime',
//             'status',
//             'tripid',
//             'customer',
//             'orderedby',
//             'mobile',
//             'guestname',
//             'guestmobileno',
//             'email',
//             'employeeno',
//             'address1',
//             // 'streetno',
//             // 'city',
//             'report',
//             'vehType',
//             'paymenttype',
//             'startdate',
//             'starttime',
//             'reporttime',
//             'duty',
//             'pickup',
//             'customercode',
//             'registerno',
//             'flightno',
//             'orderbyemail',
//             'remarks',
//             'servicestation',
//             'advance',
//             // 'nameupdate',
//             // 'address3',
//             // 'address4',
//             // 'cityupdate',
//             'useage',
//             'username',
//             'emaildoggle',
//             'hireTypes',
//             'travelsname',
//             'vehRegNo',
//             'vehiclemodule',
//             'driverName',
//             'mobileNo',
//             'travelsemail',
//             // 'triptime',
//             // 'tripdate',
//             'Groups'
//         ];

//         const likeConditions = columnsToSearch.map(column => `${column} LIKE ?`).join(' OR ');

//         query += ` AND (${likeConditions})`;
//         params = columnsToSearch.map(() => `${searchText}%`);
//     }

//     // if (fromDate && moment(fromDate, 'YYYY/MM/DD', true).isValid() && toDate && moment(toDate, 'YYYY/MM/DD', true).isValid())
//     if (fromDate && toDate) {
//         // const formattedFromDate = moment(fromDate, 'YYYY/MM/DD').format('YYYY-MM-DD');
//         // const formattedToDate = moment(toDate, 'YYYY/MM/DD').format('YYYY-MM-DD');
//         const formattedFromDate = moment(fromDate).format('YYYY-MM-DD');
//         const formattedToDate = moment(toDate).format('YYYY-MM-DD');

//         query += ' AND bookingdate >= DATE_ADD(?, INTERVAL 0 DAY) AND bookingdate <= DATE_ADD(?, INTERVAL 1 DAY)';
//         params.push(formattedFromDate, formattedToDate);
//     }

//     db.query(query, params, (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to retrieve vehicle details from MySQL' });
//         }
//         return res.status(200).json(result);
//     });
// });
// image or pdf upload 
// const booking_storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//     }
// })
router.use(express.static('customer_master'));
const booking_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './customer_master/public/imagesUploads_doc')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const booking_uploadfile = multer({ storage: booking_storage });

//-----------------post ---------------

router.post('/bookingdatapdf/:id', booking_uploadfile.single("file"), async (req, res) => {
    const booking_id = req.params.id;
    const fileType = req.file.mimetype;
    const fileName = req.file.filename;
    const { created_at } = req.body;
    const dynamicfileType = fileType.replace(/^[^/]+\//, "Booking Attachment/");
    console.log(booking_id, "ll", fileName, "ll", fileType, path,dynamicfileType)

    console.log("booking_id", booking_id, fileType, fileName, created_at)
    console.log("id", booking_id)

    const sql = `INSERT INTO booking_doc (booking_id, path, documenttype,created_at) VALUES (?, ?, ?,?)`;
    db.query(sql, [booking_id, fileName, dynamicfileType, created_at], (err, result) => {
        if (err) {
            return res.json({ Message: "Error" });
        }
        return res.json("success upload");
    });
});


router.post('/upload-booking-image', booking_uploadfile.single("file"), async (req, res) => {
    const booking_id = req.body.bookingId;
    const fileType = req.file.mimetype;
    const fileName = req.file.filename;
    const path = req.file.path;
    const { created_at } = req.body;
    const dynamicfileType = fileType.replace(/^[^/]+\//, "Booking Attachment/");
    console.log(booking_id, "ll", fileName, "ll", fileType, path,dynamicfileType)


    const sql = `INSERT INTO booking_doc (booking_id, path, documenttype,created_at) VALUES (?, ?, ?,?)`;
    db.query(sql, [booking_id, fileName, dynamicfileType, created_at], (err, result) => {
        if (err) {
            return res.json({ Message: "Error" });
        }
        return res.json("success upload");
    });
});
//-------------------------------------------------------

router.get('/booking-docView/:id', (req, res) => {
    const id = req.params.id
    const sql = 'select * from booking_doc where booking_id=?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "error" })
        return res.json(result);
    })
})

router.get('/booking-docPDFView/:bookingno', (req, res) => {
    const bookingno = req.params.bookingno;
    const query = 'select * from booking_doc where booking_id=?';

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

router.get('/bookinglogdetailsget', (req, res) => {
    const { selectType, selectbookingId, fromDate, toDate, userName } = req.query;

    // console.log(selectType, selectbookingId, fromDate, toDate, userName, 'checking booking values');
    // console.log(selectbookingId,"checking")

    const AllDataQuery = `
        SELECT * FROM BookingLogDetails 
        WHERE bookingno = ? 
        AND username = ?  
        AND bookingdate >= ? 
        AND bookingdate < DATE_ADD(?, INTERVAL 1 DAY)
    `;
    const withoutBookingNoQuery = `
        SELECT * FROM BookingLogDetails 
        WHERE username = ?  
        AND bookingdate >= ? 
        AND bookingdate < DATE_ADD(?, INTERVAL 1 DAY)
    `;

    const query = selectbookingId ? AllDataQuery : withoutBookingNoQuery;
    const params = selectbookingId
        ? [selectbookingId, userName, fromDate, toDate]
        : [userName, fromDate, toDate];

    db.query(query, params, (err, result) => {
        if (err) {
            console.error(err, 'Database Error');
            return res.status(500).json({ error: 'Database query failed' });
        }
        // console.log(result,'log resultsss');
        
        return res.json(result);
    });
});


// navigate booking to tripsheet to chack status
router.get('/getBookingStatusByTripId', (req, res) => {
    const { tripid } = req.query;
    console.log(tripid, " <-- received tripid in query");
  
    if (!tripid) {
      return res.status(400).json({ error: "Trip ID is required" });
    }
  
    const sqlQuery = `SELECT status FROM booking WHERE bookingno = ?`;
    db.query(sqlQuery, [tripid], (error, result) => {
      if (error) {
        console.error(error, "SQL query error");
        return res.status(500).json({ error: "Internal server error" });
      }
  
      console.log(result, " <-- result from booking table");
  
      return res.json(result);
    });
  });
  







///--------------------------------------------------------------------------------

module.exports = router;