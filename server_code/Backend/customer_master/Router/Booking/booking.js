const express = require('express');
const router = express.Router();
const util = require('util')
const nodemailer = require('nodemailer');
const db = require('../../../db');
const multer = require('multer');
const moment = require('moment');
const path = require('path');

const query = util.promisify(db.query).bind(db)

router.use(express.static('customer_master'));
// const upload = multer({ dest: 'uploads/' });

router.post('/booking', (req, res) => {
    const bookData = req.body;

    db.query('INSERT INTO booking SET ?', bookData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to insert data into MySQL" });
        }

        // Check if the insertion was successful (affectedRows > 0)
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: "Data inserted successfully" });
        } else {
            return res.status(500).json({ error: "Failed to insert data into MySQL" });
        }
    });
});

// collect details from Booking
router.get('/booking/:bookingno', (req, res) => {
    const bookingno = req.params.bookingno;
    db.query('SELECT * FROM booking WHERE bookingno = ?', bookingno, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        const bookingDetails = result[0]; // Assuming there is only one matching booking
        return res.status(200).json(bookingDetails);
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


// update booking details
router.put('/booking/:bookingno', async (req, res) => {
    const bookingno = req.params.bookingno;
    const updatedCustomerData = req.body;

    try {
        //check this booking added tripsheet or not
        const checkBookingId = await query('select bookingno from tripsheet where bookingno=?', [bookingno])
        if (checkBookingId.length > 0) return res.json({ message: "This Booking dosen't allowed to edit", error: false, success: true })

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
    // Modify the query to use the LIKE operator for partial matching
    // db.query('SELECT * FROM  vehicleinfo WHERE driverName OR  vehRegNo LIKE ? ', [`${customer}%`], (err, result) => {
    db.query('SELECT * FROM  vehicleinfo WHERE driverName LIKE ? OR vehRegNo LIKE ?', [`${customer}%`, `${customer}%`], (err, result) => {

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
        const { Address, guestname, guestmobileno, customeremail, email, startdate, starttime, driverName, useage, vehType, mobileNo, vehRegNo, servicestation, status, requestno, bookingno, duty, username } = req.body;

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


        if (status === "Cancelled") {

            const customerMailOptions = {
                from: 'foxfahad386@gmail.com',
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
                            <td style="padding: 8px;"><strong>Trip No:</strong></td>
                            <td style="padding: 8px; color: #000">${bookingno}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Name of Guest:</strong></td>
                            <td style="padding: 8px;color: #000"">${guestname}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Location:</strong></td>
                            <td style="padding: 8px;color: #000"">${servicestation}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Date:</strong></td>
                            <td style="padding: 8px;color: #000"">${startdate}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Time (24):</strong></td>
                            <td style="padding: 8px;color: #000"">${starttime} Hrs</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Car Sent:</strong></td>
                            <td style="padding: 8px;color: #000"">${vehType}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Vehicle RegNo:</strong></td>
                            <td style="padding: 8px;color: #000"">${vehRegNo}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Driver Name / Phone:</strong></td>
                            <td style="padding: 8px;color: #000"">${driverName}</td>
                        </tr>
                    </tbody>
                </table>
                <p>In case of any further queries or clarifications, kindly contact our Help Desk. Our team will be more than happy to assist you. Wish you a pleasant journey.</p>

        
          `,
            };
            await transporter.sendMail(customerMailOptions);
            // await transporter.sendMail(ownerMailOptions);
            res.status(200).json({ message: 'Email sent successfully' });
        }
        else {


            const customerMailOptions1 = {
                from: 'foxfahad386@gmail.com',
                to: `${email},${customeremail}`,
                subject: `JESSY CABS Booking Confirmation For ${guestname} - Travel Request No. ${bookingno} `,
                html: `
            <p>Dear Sir/Madam,</p>
             <p>Thank you for booking with us!!! Your booking has been confirmed. Please find the details below:</p>
            <table border="1" bordercolor="#000000" style="border-collapse: collapse; width: 100%;">
                    <thead style="background-color: #9BB0C1; color: #FFFFFF;">
                        <tr>
                            <th colspan="2" style="padding: 8px; text-align: center;">JESSY CABS Booking Confirmation </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 8px;"><strong>Trip No:</strong></td>
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
                        <tr>
                            <td style="padding: 8px;"><strong>Reporting Date :</strong></td>
                            <td style="padding: 8px;">${startdate}</td>
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
                        <td style="padding: 8px;"><strong>Type of Car Requiredt:</strong></td>
                        <td style="padding: 8px;color: #000"">${vehType}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;"><strong>Duty Type</strong></td>
                        <td style="padding: 8px;color: #000"">${duty}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;"><strong>Confirmed By:</strong></td>
                        <td style="padding: 8px;color: #000"">${username}</td>
                    </tr>
                    </tbody>
                </table>
                <p>The Vehicle and Driver details will be sent to you before the pick-up time. Incase of any further queries or clarifications, kindly contact our Help Desk. Our team will be more than happy to assist you. Wish you a pleasant journey.</p>
        
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
router.get('/table-for-booking', (req, res) => {
    const { searchText, fromDate, toDate } = req.query;
    let query = 'SELECT * FROM booking WHERE 1=1';
    let params = [];

    if (searchText) {
        const columnsToSearch = [
            'bookingno',
            'bookingdate',
            'bookingtime',
            'status',
            'tripid',
            'customer',
            'orderedby',
            'mobile',
            'guestname',
            'guestmobileno',
            'email',
            'employeeno',
            'address1',
            // 'streetno',
            // 'city',
            'report',
            'vehType',
            'paymenttype',
            'startdate',
            'starttime',
            'reporttime',
            'duty',
            'pickup',
            'customercode',
            'registerno',
            'flightno',
            'orderbyemail',
            'remarks',
            'servicestation',
            'advance',
            // 'nameupdate',
            // 'address3',
            // 'address4',
            // 'cityupdate',
            'useage',
            'username',
            'emaildoggle',
            'hireTypes',
            'travelsname',
            'vehRegNo',
            'vehiclemodule',
            'driverName',
            'mobileNo',
            'travelsemail',
            // 'triptime',
            // 'tripdate',
            'Groups'
        ];

        const likeConditions = columnsToSearch.map(column => `${column} LIKE ?`).join(' OR ');

        query += ` AND (${likeConditions})`;
        params = columnsToSearch.map(() => `${searchText}%`);
    }

    // if (fromDate && moment(fromDate, 'YYYY/MM/DD', true).isValid() && toDate && moment(toDate, 'YYYY/MM/DD', true).isValid())
    if (fromDate && toDate) {
        // const formattedFromDate = moment(fromDate, 'YYYY/MM/DD').format('YYYY-MM-DD');
        // const formattedToDate = moment(toDate, 'YYYY/MM/DD').format('YYYY-MM-DD');
        const formattedFromDate = moment(fromDate).format('YYYY-MM-DD');
        const formattedToDate = moment(toDate).format('YYYY-MM-DD');

        query += ' AND bookingdate >= DATE_ADD(?, INTERVAL 0 DAY) AND bookingdate <= DATE_ADD(?, INTERVAL 1 DAY)';
        params.push(formattedFromDate, formattedToDate);
    }

    db.query(query, params, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve vehicle details from MySQL' });
        }
        return res.status(200).json(result);
    });
});


/// booking ->booking----------------------------------------

// its for multer file- 1
// const booking_storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './customer_master/public/booking_doc')
//         // cb(null, './uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//     }

// })


const booking_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }

})

const booking_uploadfile = multer({ storage: booking_storage });

router.post('/bookingdatapdf/:id', booking_uploadfile.single("file"), async (req, res) => {
    const booking_id = req.params.id;
    // const path = req.file.filename;
    const fileType = req.file.mimetype;
    const fileName = req.file.filename;
    console.log(req.query)
    // const documenttype = "mail"
    const sql = `insert into booking_doc(booking_id, path, file_type)values(${booking_id}, '${fileName}', '${fileType}')`;
    // const sql = `insert into tripsheetupload(bookingno, path, mimetype,name,documenttype)values(${booking_id}, '${path}', '${fileType}','${fileName}','${documenttype}')`;
    db.query(sql, (err, result) => {
        if (err) {
            return res.json({ Message: "Error" });
        }
        return res.json("successs upload");
    })

})

// booking_id	fileName	file_type	

//-----------------fetch ---------------
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





///--------------------------------------------------------------------------------

module.exports = router;