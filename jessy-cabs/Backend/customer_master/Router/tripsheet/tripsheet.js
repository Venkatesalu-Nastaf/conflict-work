const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const db = require('../../../db');
const multer = require('multer');
const path = require('path');

const upload = multer({ dest: 'uploads/' });

// trip sheet database:
// add tripsheet database
router.post('/tripsheet', (req, res) => {
    const bookData = req.body;
    db.query('INSERT INTO tripsheet SET ?', bookData, (err, result) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            return res.status(500).json({ error: "Failed to insert data into MySQL" });
        }
        console.log('Data inserted into MySQL');
        return res.status(200).json({ message: "Data inserted successfully" });
    });
});
// delete tripsheet data
router.delete('/tripsheet/:tripid', (req, res) => {
    const tripid = req.params.tripid;
    db.query('DELETE FROM tripsheet WHERE tripid = ?', tripid, (err, result) => {
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
// update tripsheet details
router.put('/tripsheet/:tripid', (req, res) => {
    const tripid = req.params.tripid;
    const updatedCustomerData = req.body;
    console.log('Customer ID:', tripid); // Log the customer ID
    console.log('Updated customer data:', updatedCustomerData);
    db.query('UPDATE tripsheet SET ? WHERE tripid = ?', [updatedCustomerData, tripid], (err, result) => {
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
// collect data from tripsheet database
router.get('/tripsheet/:tripid', (req, res) => {
    const tripid = req.params.tripid;
    db.query('SELECT * FROM tripsheet WHERE tripid = ?', tripid, (err, result) => {
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
// collect data from vehicleInfo database
router.get('/vehicleinfo/:vehRegNo', (req, res) => {
    const vehRegNo = req.params.vehRegNo;
    // Modify the query to use the LIKE operator for partial matching
    db.query('SELECT * FROM vehicleinfo WHERE vehRegNo LIKE ? LIMIT 1', `%${vehRegNo}%`, (err, result) => {
        if (err) {
            console.error('Error retrieving vehicle details from MySQL:', err);
            return res.status(500).json({ error: 'Failed to retrieve vehicle details from MySQL' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
        const vehicleDetails = result[0]; // Assuming there is only one matching vehicle
        return res.status(200).json(vehicleDetails);
    });
});
//send email from tripsheet page
router.post('/send-tripsheet-email', async (req, res) => {
    try {
        const { guestname, guestmobileno, email, hireTypes, department, vehType, vehRegNo, driverName, mobileNo, useage, pickup } = req.body;
        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'akash02899@gmail.com',
                pass: 'yocakaoeoajdaawj',
            },
        });
        // Email content for the owner
        const ownerMailOptions = {
            from: 'akash02899@gmail.com',
            to: 'akash02899@gmail.com', // Set the owner's email address
            subject: `${guestname} sent you a feedback`,
            text: `Guest Name: ${guestname}\nEmail: ${email}\nContact No: ${guestmobileno}\nHireTypes: ${hireTypes}\nDepartment: ${department}\nVehicle Type: ${vehType}\nVehicle RegNo: ${vehRegNo}\nDriver Name: ${driverName}\nDriver-MobileNo: ${mobileNo}\nPickup: ${pickup}\nUsage: ${useage}`,
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
          <tr><td>Contact No:</td><td>${guestmobileno}</td></tr>
          <tr><td>Hire Types:</td><td>${hireTypes}</td></tr>
          <tr><td>Department:</td><td>${department}</td></tr>
          <tr><td>Vehicle Type:</td><td>${vehType}</td></tr>
          <tr><td>Vehicle RegNo:</td><td>${vehRegNo}</td></tr>
          <tr><td>Driver Name:</td><td>${driverName}</td></tr>
          <tr><td>Driver-MobileNo:</td><td>${mobileNo}</td></tr>
          <tr><td>Pickup:</td><td>${pickup}</td></tr>
          <tr><td>Usage:</td><td>${useage}</td></tr>
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
//end tripsheet mail
//collect data
router.get('/tripuploadcollect', (req, res) => {
    db.query('SELECT * FROM tripsheetupload', (err, results) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            return res.status(500).json({ error: "Failed to fetch data from MySQL" });
        }
        return res.status(200).json(results);
    });
});
//end collect data
//file upload in tripsheet
router.post('/uploads', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }
    const fileData = {
        name: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        path: req.file.path.replace(/\\/g, '/').replace(/^uploads\//, ''),
        tripid: req.body.tripid,
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
const imageDirectory = path.join(__dirname, 'uploads'); // Adjust the path as needed
// Serve static files from the imageDirectory
router.use('/images', express.static(imageDirectory));
// Example route to serve an image by its filename
router.get('/get-image/:filename', (req, res) => {
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
// End tripsheet database

module.exports = router;
