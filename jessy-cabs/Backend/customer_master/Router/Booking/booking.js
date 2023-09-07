const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const db = require('../../../db');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

// Booking database:
// Booking page database:-
// Add Booking page database
router.post('/booking', (req, res) => {
    const bookData = req.body;
    db.query('INSERT INTO booking SET ?', bookData, (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            return res.status(500).json({ error: "Failed to insert data into MySQL" });
        }
        console.log('Data inserted into MySQL');
        return res.status(200).json({ message: "Data inserted successfully" });
    });
});
// collect details from Booking
router.get('/booking/:bookingno', (req, res) => {
    const bookingno = req.params.bookingno;
    db.query('SELECT * FROM booking WHERE bookingno = ?', bookingno, (err, result) => {
        if (err) {
            console.error('Error retrieving booking details from MySQL:', err);
            return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        const bookingDetails = result[0]; // Assuming there is only one matching booking
        return res.status(200).json(bookingDetails);
    });
});
// delete booking details
router.delete('/booking/:bookingno', (req, res) => {
    const bookingno = req.params.bookingno;
    console.log('DELETE query:', 'DELETE FROM booking WHERE bookingno = ?', bookingno);
    db.query('DELETE FROM booking WHERE bookingno = ?', bookingno, (err, result) => {
        if (err) {
            console.error('Error deleting data from MySQL:', err);
            return res.status(500).json({ error: "Failed to delete data from MySQL" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Customer not found" });
        }
        console.log('Data deleted from MySQL');
        return res.status(200).json({ message: "Data deleted successfully" });
    });
});
// update booking details
router.put('/booking/:bookingno', (req, res) => {
    const bookingno = req.params.bookingno;
    const updatedCustomerData = req.body;
    db.query('UPDATE booking SET ? WHERE bookingno = ?', [updatedCustomerData, bookingno], (err, result) => {
        if (err) {
            console.error('Error updating data in MySQL:', err);
            return res.status(500).json({ error: "Failed to update data in MySQL" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Customer not found" });
        }
        console.log('Data updated in MySQL');
        return res.status(200).json({ message: "Data updated successfully" });
    });
});
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
router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    const fileData = {
        name: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
        bookingno: req.body.bookingno,
    };

    const query = 'INSERT INTO upload SET ?';
    db.query(query, fileData, (err, result) => {
        if (err) {
            console.error('Error storing file in the database:', err);
            return res.status(500).json({ error: 'Error storing file in the database.' });
        }
        return res.status(200).json({ message: 'File uploaded and data inserted successfully.' });
    });
});
// collect data from vehicleInfo database
router.get('/name-customers/:printName', (req, res) => {
    const printName = req.params.printName; // Access the parameter using req.params
    // Modify the query to use the LIKE operator for partial matching
    db.query('SELECT * FROM customers WHERE printName LIKE ?', [`%${printName}%`], (err, result) => {
        if (err) {
            console.error('Error retrieving customer details from MySQL:', err);
            return res.status(500).json({ error: 'Failed to retrieve customer details from MySQL' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        const customerDetails = result[0]; // Assuming there is only one matching customer
        return res.status(200).json(customerDetails);
    });
});
//send email  from booking page
router.post('/send-email', async (req, res) => {
    try {
        const { guestname, guestmobileno, email, useage, pickup } = req.body;

        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'akash02899@gmail.com',
                pass: 'zrbdlfwjxsgrjncr',
            },
        });

        // Email content for the owner
        const ownerMailOptions = {
            from: 'akash02899@gmail.com',
            to: 'akash02899@gmail.com', // Set the owner's email address
            // subject: ${name} 'sent you a feedback',
            subject: `${guestname} sent you a feedback`,
            text: `Guest Name: ${guestname}\nEmail: ${email}\nContact No: ${guestmobileno}\nPickup: ${pickup}\nUsage: ${useage}`,
        };

        // Send email to the owner
        await transporter.sendMail(ownerMailOptions);

        // Email content for the customer
        const customerMailOptions = {
            from: 'akash02899@gmail.com',
            to: email,
            subject: 'Greetings from Jessy Cabs',
            text: `Hello ${guestname},\n\nThank you for reaching out. Your booking is Placed successfully\n\nRegards,\nJessy Cabs`,
        };

        // Send greeting email to the customer
        await transporter.sendMail(customerMailOptions);

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);
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
                user: 'akash02899@gmail.com',
                pass: 'zrbdlfwjxsgrjncr',
            },
        });

        // Email content for the owner
        const ownerMailOptions = {
            from: 'akash02899@gmail.com',
            to: 'akash02899@gmail.com', // Set the owner's email address
            // subject: ${name} 'sent you a feedback',
            subject: `${guestname} sent you a feedback`,
            text: `Guest Name: ${guestname}\nEmail: ${email}\nGuest Mobile No: ${guestmobileno}\nStart Date: ${startdate}\nStart Time: ${starttime}\nPickup: ${pickup}\nUseage: ${useage}\nDuty: ${duty}\nVehicle Type: ${vehType}\nRemarks: ${remarks}`,
        };

        // Send email to the owner
        await transporter.sendMail(ownerMailOptions);

        // Email content for the customer
        const customerMailOptions = {
            from: 'akash02899@gmail.com',
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
        console.error(error);
        res.status(500).json({ message: 'An error occurred while sending the email' });
    }
});
  //end online-booking mail
//End booking page database 


module.exports = router;