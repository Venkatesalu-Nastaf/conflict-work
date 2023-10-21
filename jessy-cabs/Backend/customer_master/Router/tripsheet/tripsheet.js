const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const db = require('../../../db');

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
// End tripsheet database
//get data from ratemanagement for package database
// router.get('/getPackageDetails', (req, res) => {
//     const { totalkm1, totaltime, vehType, customerName } = req.query;

//     db.query('SELECT * FROM ratemanagement WHERE minKm <= ? AND maxKm >= ? AND minHrs <= ? AND maxHrs >= ? AND vehicleType = ? AND customerName = ?',
//         [totalKm, totalTime, totalTime, vehicleType, customerName],
//         (err, result) => {
//             if (err) {
//                 console.error('Error retrieving package details:', err);
//                 return res.status(500).json({ error: 'Failed to retrieve package details' });
//             }
//             const packageDetails = result[0]; // Assuming it's a single row
//             return res.status(200).json(packageDetails);
//         }
//     );
// });

// router.get('/getPackageDetails', (req, res) => {
//     const { totalkm1, totaltime, vehType, customer, duty } = req.query;

//     // Use these parameters to query your database and retrieve package details
//     // const query = `SELECT * FROM ratemanagement WHERE (KMS <= ?) AND (KMS >= ?) AND (Hours <= ?) AND (Hours >= ?) AND (vehicleType = ?) AND (pricetag = ?) AND (duty = ?)`;
//     const query = `
//     SELECT * FROM ratemanagement 
//     WHERE (KMS <= ?) AND (KMS >= ?) 
//     AND (Hours <= ?) AND (Hours >= ?) 
//     AND (vehicleType = ?) AND (pricetag = ?) 
//     AND (duty = ?)
// `;
//     db.query(query, [totalkm1, totaltime, vehType, customer, duty], (err, result) => {
//         if (err) {
//             console.log('Error retrieving package details:', err);
//             return res.status(500).json({ error: 'Failed to retrieve package details' });
//         }
//         const packageDetails = result[0]; // Assuming it's a single row
//         return res.status(200).json(packageDetails);
//     }
//     );
// });



// router.get('/getPackageDetails', (req, res) => {
//     const { totalkm1, totaltime, vehType, customer, duty } = req.query;

//     let query = 'SELECT * FROM ratemanagement WHERE 1=1';
//     let params = [];

//     if (totalkm1) {
//         query += ' AND KMS <= ?';
//         params.push(totalkm1);
//     }
//     if (totaltime) {
//         query += ' AND Hours <= ?';
//         params.push(totaltime);
//     }
//     if (vehType) {
//         query += ' AND vehicleType = ?';
//         params.push(vehType);
//     }
//     if (customer) {
//         query += ' AND pricetag = ?';
//         params.push(customer);
//     }
//     if (duty) {
//         query += ' AND duty = ?';
//         params.push(duty);
//     }

//     db.query(query, params, (err, result) => {
//         if (err) {
//             console.error('Error retrieving package details from MySQL:', err);
//             return res.status(500).json({ error: 'Failed to retrieve package details from MySQL' });
//         }
//         return res.status(200).json(result);
//     });
// });

router.get('/getPackageDetails', (req, res) => {
    const { totalkm1, totaltime, vehType, customer, duty } = req.query;
    console.log('backend console result', req.query);
    const query = `
    SELECT * 
    FROM ratemanagement 
    WHERE 
      (KMS >= ? OR KMS <= ?) AND 
      (Hours >= ? OR Hours <= ?) AND 
      vehicleType = ? AND 
      pricetag = ? AND 
      duty = ?;
    `;

    const params = [totalkm1, totalkm1, totaltime, totaltime, vehType, customer, duty];
    console.log('collected query data from package', query);
    console.log('collected data from package', params);

    db.query(query, params, (err, result) => {
        console.log('collected result data', result);
        if (err) {
            console.error('Error retrieving package details from MySQL:', err);
            return res.status(500).json({ error: 'Failed to retrieve package details from MySQL' });
        }

        // Check if there are matching records
        if (result.length > 0) {
            // Send the matching records as a response
            return res.status(200).json(result);
        } else {
            // No matching records found
            return res.status(404).json({ message: 'No matching records found' });
        }
    });
});


module.exports = router;
