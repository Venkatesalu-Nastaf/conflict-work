const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const db = require('../../../db');


// trip sheet database:

// add tripsheet database-------------------------------------------- 
router.post('/tripsheet-add', (req, res) => {

    const {
        tripid,
        bookingno,
        tripsheetdate,
        status,
        billingno,
        apps,
        customer,
        orderedby,
        mobile,
        guestname,
        guestmobileno,
        email,
        address1,
        streetno,
        city,
        hireTypes,
        department,
        vehRegNo,
        vehType,
        driverName,
        mobileNo,
        driversmsexbetta,
        gps,
        duty,
        pickup,
        useage,
        request,
        startdate,
        closedate,
        totaldays,
        employeeno,
        reporttime,
        starttime,
        closetime,
        additionaltime,
        advancepaidtovendor,
        customercode,
        startkm,
        closekm,
        shedkm,
        shedin,
        shedout,
        shedintime,
        permit,
        parking,
        toll,
        vpermettovendor,
        vendortoll,
        customeradvance,
        email1,
        remark,
        smsguest,
        documentnotes,
        VendorTripNo,
        vehicles,
        duty1,
        startdate1,
        closedate1,
        totaldays1,
        locks,
        starttime2,
        closetime2,
        totaltime,
        startkm1,
        closekm1,
        totalkm1,
        remark1, escort,

        calcPackage, extraHR, extraKM, package_amount, extrakm_amount, extrahr_amount, ex_kmAmount, ex_hrAmount, nightBta, nightCount, night_totalAmount, driverBeta, driverbeta_Count, driverBeta_amount, totalcalcAmount,
        nightThrs,
        dtc,
        dtc2,
        nightThrs2,
        exkmTkm2,
        exHrsTHrs2,
        netamount,
        vehcommission,
        caramount1,
        manualbills,
        pack,
        amount5,
        exkm1,
        amount6,
        exHrs1,
        amount7,
        night1,
        amount8,
        driverconvenience1,
        amount9,
        rud,
        netamount1,
        discount,
        ons,
        manualbills1,
        balance,
        fcdate,
        taxdate,
        insdate,
        stpermit,
        maintenancetype,
        kilometer,
        selects,
        documenttype,
        on1,
        smsgust,
        emailcheck,
        booker,
        reload,
        manualbillss, } = req.body;



    const addCustomerData = {
        tripid,
        bookingno,
        tripsheetdate,
        status,
        billingno,
        apps,
        customer,
        orderedby,
        mobile,
        guestname,
        guestmobileno,
        email,
        address1,
        streetno,
        city,
        hireTypes,
        department,
        vehRegNo,
        vehType,
        driverName,
        mobileNo,
        driversmsexbetta,
        gps,
        duty,
        pickup,
        useage,
        request,
        startdate,
        closedate,
        totaldays,
        employeeno,
        reporttime,
        starttime,
        closetime,
        additionaltime,
        advancepaidtovendor,
        customercode,
        startkm,
        closekm,
        shedkm,
        shedin,
        shedout,
        shedintime,
        permit,
        parking,
        toll,
        vpermettovendor,
        vendortoll,
        customeradvance,
        email1,
        remark,
        smsguest,
        documentnotes,
        VendorTripNo,
        vehicles,
        duty1,
        startdate1,
        closedate1,
        totaldays1,
        locks,
        starttime2,
        closetime2,
        totaltime,
        startkm1,
        closekm1,
        totalkm1,
        remark1, escort,
        calcPackage, extraHR, extraKM, package_amount, extrakm_amount, extrahr_amount, ex_kmAmount, ex_hrAmount, nightBta, nightCount, night_totalAmount, driverBeta, driverbeta_Count, driverBeta_amount, totalcalcAmount,
        nightThrs,
        dtc,
        dtc2,
        nightThrs2,
        exkmTkm2,
        exHrsTHrs2,
        netamount,
        vehcommission,
        caramount1,
        manualbills,
        pack,
        amount5,
        exkm1,
        amount6,
        exHrs1,
        amount7,
        night1,
        amount8,
        driverconvenience1,
        amount9,
        rud,
        netamount1,
        discount,
        ons,
        manualbills1,
        balance,
        fcdate,
        taxdate,
        insdate,
        stpermit,
        maintenancetype,
        kilometer,
        selects,
        documenttype,
        on1,
        smsgust,
        emailcheck,
        booker,
        reload,
        manualbillss,
    };


    db.query('INSERT INTO tripsheet SET ?', addCustomerData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to insert data into MySQL" });
        }

        if (result.affectedRows > 0) {
            db.query(`UPDATE booking SET status = "Opened" WHERE bookingno=${bookingno}; `)
        }
        return res.status(200).json({ message: "Data inserted successfully" });
    });
});

// delete tripsheet data---------------------------------------------------
router.delete('/tripsheet/:tripid', (req, res) => {
    const tripid = req.params.tripid;
    db.query('DELETE FROM tripsheet WHERE tripid = ?', tripid, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to delete data from MySQL" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Customer not found" });
        }
        return res.status(200).json({ message: "Data deleted successfully" });
    });
});

// update tripsheet details------------------------------------------------
router.put('/tripsheet-edit/:tripid', (req, res) => {
    const tripid = req.params.tripid;
    const {

        bookingno,
        tripsheetdate,
        status,
        billingno,
        apps,
        customer,
        orderedby,
        mobile,
        guestname,
        guestmobileno,
        email,
        address1,
        streetno,
        city,
        hireTypes,
        department,
        vehRegNo,
        vehType,
        driverName,
        mobileNo,
        driversmsexbetta,
        gps,
        duty,
        pickup,
        useage,
        request,
        startdate,
        closedate,
        totaldays,
        employeeno,
        reporttime,
        starttime,
        closetime,
        additionaltime,
        advancepaidtovendor,
        customercode,
        startkm,
        closekm,
        shedkm,
        shedin,
        shedout,
        shedintime,
        permit,
        parking,
        toll,
        vpermettovendor,
        vendortoll,
        customeradvance,
        email1,
        remark,
        smsguest,
        documentnotes,
        VendorTripNo,
        vehicles,
        duty1,
        startdate1,
        closedate1,
        totaldays1,
        locks,
        starttime2,
        closetime2,
        totaltime,
        startkm1,
        closekm1,
        totalkm1,
        remark1, escort,
        calcPackage, extraHR, extraKM, package_amount, extrakm_amount, extrahr_amount, ex_kmAmount, ex_hrAmount, nightBta, nightCount, night_totalAmount, driverBeta, driverbeta_Count, driverBeta_amount, totalcalcAmount,
        nightThrs,
        dtc,
        dtc2,
        nightThrs2,
        exkmTkm2,
        exHrsTHrs2,
        netamount,
        vehcommission,
        caramount1,
        manualbills,
        pack,
        amount5,
        exkm1,
        amount6,
        exHrs1,
        amount7,
        night1,
        amount8,
        driverconvenience1,
        amount9,
        rud,
        netamount1,
        discount,
        ons,
        manualbills1,
        balance,
        fcdate,
        taxdate,
        insdate,
        stpermit,
        maintenancetype,
        kilometer,
        selects,
        documenttype,
        on1,
        smsgust,
        emailcheck,
        booker,
        reload,
        manualbillss, } = req.body;

    const updatedCustomerData = {
        bookingno,
        tripsheetdate,
        status,
        billingno,
        apps,
        customer,
        orderedby,
        mobile,
        guestname,
        guestmobileno,
        email,
        address1,
        streetno,
        city,
        hireTypes,
        department,
        vehRegNo,
        vehType,
        driverName,
        mobileNo,
        driversmsexbetta,
        gps,
        duty,
        pickup,
        useage,
        request,
        startdate,
        closedate,
        totaldays,
        employeeno,
        reporttime,
        starttime,
        closetime,
        additionaltime,
        advancepaidtovendor,
        customercode,
        startkm,
        closekm,
        shedkm,
        shedin,
        shedout,
        shedintime,
        permit,
        parking,
        toll,
        vpermettovendor,
        vendortoll,
        customeradvance,
        email1,
        remark,
        smsguest,
        documentnotes,
        VendorTripNo,
        vehicles,
        duty1,
        startdate1,
        closedate1,
        totaldays1,
        locks,
        starttime2,
        closetime2,
        totaltime,
        startkm1,
        closekm1,
        totalkm1,
        remark1, escort,
        calcPackage, extraHR, extraKM, package_amount, extrakm_amount, extrahr_amount, ex_kmAmount, ex_hrAmount, nightBta, nightCount, night_totalAmount, driverBeta, driverbeta_Count, driverBeta_amount, totalcalcAmount,
        nightThrs,
        dtc,
        dtc2,
        nightThrs2,
        exkmTkm2,
        exHrsTHrs2,
        netamount,
        vehcommission,
        caramount1,
        manualbills,
        pack,
        amount5,
        exkm1,
        amount6,
        exHrs1,
        amount7,
        night1,
        amount8,
        driverconvenience1,
        amount9,
        rud,
        netamount1,
        discount,
        ons,
        manualbills1,
        balance,
        fcdate,
        taxdate,
        insdate,
        stpermit,
        maintenancetype,
        kilometer,
        selects,
        documenttype,
        on1,
        smsgust,
        emailcheck,
        booker,
        reload,
        manualbillss,
    };


    db.query('UPDATE tripsheet SET ? WHERE tripid = ?', [updatedCustomerData, tripid], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to update data in MySQL" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Customer not found" });
        }
        return res.status(200).json({ message: "Data updated successfully" });
    });
});

// confirm tripsheet details------------------------------------------------
router.put('/tripsheet-confirm/:tripid', (req, res) => {
    // const tripid = req.params.tripid;
    // const updatedCustomerData = req.body;
    const tripid = req.params.tripid;
    const {

        bookingno,
        tripsheetdate,
        status,
        billingno,
        apps,
        customer,
        orderedby,
        mobile,
        guestname,
        guestmobileno,
        email,
        address1,
        streetno,
        city,
        hireTypes,
        department,
        vehRegNo,
        vehType,
        driverName,
        mobileNo,
        driversmsexbetta,
        gps,
        duty,
        pickup,
        useage,
        request,
        startdate,
        closedate,
        totaldays,
        employeeno,
        reporttime,
        starttime,
        closetime,
        additionaltime,
        advancepaidtovendor,
        customercode,
        startkm,
        closekm,
        shedkm,
        shedin,
        shedout,
        shedintime,
        permit,
        parking,
        toll,
        vpermettovendor,
        vendortoll,
        customeradvance,
        email1,
        remark,
        smsguest,
        documentnotes,
        VendorTripNo,
        vehicles,
        duty1,
        startdate1,
        closedate1,
        totaldays1,
        locks,
        starttime2,
        closetime2,
        totaltime,
        startkm1,
        closekm1,
        totalkm1,
        remark1,
        calcPackage, extraHR, extraKM, package_amount, extrakm_amount, extrahr_amount, ex_kmAmount, ex_hrAmount, nightBta, nightCount, night_totalAmount, driverBeta, driverbeta_Count, driverBeta_amount, totalcalcAmount,
        nightThrs,
        dtc,
        dtc2,
        nightThrs2,
        exkmTkm2,
        exHrsTHrs2,
        netamount,
        vehcommission,
        caramount1,
        manualbills,
        pack,
        amount5,
        exkm1,
        amount6,
        exHrs1,
        amount7,
        night1,
        amount8,
        driverconvenience1,
        amount9,
        rud,
        netamount1,
        discount,
        ons,
        manualbills1,
        balance,
        fcdate,
        taxdate,
        insdate,
        stpermit,
        maintenancetype,
        kilometer,
        selects,
        documenttype,
        on1,
        smsgust,
        emailcheck,
        booker,
        reload,
        manualbillss, } = req.body;

    const updatedCustomerData = {
        bookingno,
        tripsheetdate,
        status,
        billingno,
        apps,
        customer,
        orderedby,
        mobile,
        guestname,
        guestmobileno,
        email,
        address1,
        streetno,
        city,
        hireTypes,
        department,
        vehRegNo,
        vehType,
        driverName,
        mobileNo,
        driversmsexbetta,
        gps,
        duty,
        pickup,
        useage,
        request,
        startdate,
        closedate,
        totaldays,
        employeeno,
        reporttime,
        starttime,
        closetime,
        additionaltime,
        advancepaidtovendor,
        customercode,
        startkm,
        closekm,
        shedkm,
        shedin,
        shedout,
        shedintime,
        permit,
        parking,
        toll,
        vpermettovendor,
        vendortoll,
        customeradvance,
        email1,
        remark,
        smsguest,
        documentnotes,
        VendorTripNo,
        vehicles,
        duty1,
        startdate1,
        closedate1,
        totaldays1,
        locks,
        starttime2,
        closetime2,
        totaltime,
        startkm1,
        closekm1,
        totalkm1,
        remark1,
        calcPackage, extraHR, extraKM, package_amount, extrakm_amount, extrahr_amount, ex_kmAmount, ex_hrAmount, nightBta, nightCount, night_totalAmount, driverBeta, driverbeta_Count, driverBeta_amount, totalcalcAmount,
        nightThrs,
        dtc,
        dtc2,
        nightThrs2,
        exkmTkm2,
        exHrsTHrs2,
        netamount,
        vehcommission,
        caramount1,
        manualbills,
        pack,
        amount5,
        exkm1,
        amount6,
        exHrs1,
        amount7,
        night1,
        amount8,
        driverconvenience1,
        amount9,
        rud,
        netamount1,
        discount,
        ons,
        manualbills1,
        balance,
        fcdate,
        taxdate,
        insdate,
        stpermit,
        maintenancetype,
        kilometer,
        selects,
        documenttype,
        on1,
        smsgust,
        emailcheck,
        booker,
        reload,
        manualbillss,
    };

    db.query('UPDATE tripsheet SET ? WHERE tripid = ?', [updatedCustomerData, tripid], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to update data in MySQL" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Customer not found" });
        }
        // for BE_closed
        db.query(`UPDATE tripsheet SET apps='Be_Closed' WHERE tripid=${tripid}`, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to update tripsheet details in MySQL' });
            }
            return res.status(200).json(result);
        });
        return res.status(200).json({ message: "Data updated successfully" });
    });
});

// collect data from tripsheet database------------------------------------
router.get('/tripsheet/:tripid', (req, res) => {
    const tripid = req.params.tripid;
    db.query('SELECT * FROM tripsheet WHERE tripid = ? AND status != "CBilled"', tripid, (err, result) => {
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

// collect data from vehicleInfo database------------------------------------
router.get('/vehicleinfo/:vehRegNo', (req, res) => {
    const vehRegNo = req.params.vehRegNo;
    // Modify the query to use the LIKE operator for partial matching
    db.query('SELECT * FROM vehicleinfo WHERE vehRegNo LIKE ? LIMIT 1', `%${vehRegNo}%`, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve vehicle details from MySQL' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
        const vehicleDetails = result[0]; // Assuming there is only one matching vehicle
        return res.status(200).json(vehicleDetails);
    });
});

//send email from tripsheet page-----------------------------------
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
                pass: 'jojgadyyolbuxlyo',
            },
            tls: {
                // Ignore SSL certificate errors
                rejectUnauthorized: false
            }
        });
        // Email content for the owner
        const ownerMailOptions = {
            from: 'akash02899@gmail.com',
            to: 'akash02899@gmail.com',
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
        res.status(500).json({ message: 'An error occurred while sending the email' });
    }
});
//end tripsheet mail
//collect data
router.get('/tripuploadcollect/:tripid', (req, res) => {
    const tripid = req.params.tripid;
    db.query("SELECT * FROM tripsheetupload where tripid=?", [tripid], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch data from MySQL" });
        }
        return res.status(200).json(results);
    });
});
//end collect data
// End tripsheet database
//get data from ratemanagement for package database
router.get('/getPackageDetails', (req, res) => {
    const { vehType, customer, duty, totaltime, totalkm1 } = req.query;
    const query = `SELECT * FROM ratemanagement WHERE vehicleType = ? AND pricetag = ? AND duty = ? ORDER BY ABS(Hours - ?), ABS(KMS - ?) LIMIT 1;`;
    const params = [vehType, customer, duty, totaltime, totalkm1];

    db.query(query, params, (err, result) => {
        if (err) {
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
//end package database
//for map database
router.post('/gmap-submitForm', (req, res) => {
    const date = req.body.date;
    const time = req.body.time;
    const tripType = req.body.tripType;
    const placeName = req.body.placeName;
    const tripid = req.body.tripid;

    // Insert data into MySQL
    const query = `INSERT INTO gmapdata (date, time, trip_type, place_name, tripid ) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [date, time, tripType, placeName, tripid], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json({ message: 'Form data submitted successfully' });
        }
    });
});

// Collect maplogdata for gmapdata table
router.get('/get-gmapdata/:tripid', (req, res) => {
    const tripid = req.params.tripid;
    db.query('SELECT * FROM gmapdata WHERE tripid = ?', [tripid], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
        }
        return res.status(200).json(results);
    });
});


//ayyanar 4hr and 8hr pack fetch

//------------------------------------

router.get(`/t4hr-pack`, (req, res) => {
    // Extract dynamic inputs from query parameters
    const totalHours = req.query.totalHours;
    const vehicletype = req.query.vehicletype;
    const duty = req.query.duty;
    const totkm = req.query.totkm;
    const OrganizationName = req.query.organizationname;

    if (!totalHours || !vehicletype || !duty || !totkm || !OrganizationName) {
        res.status(400).json({ error: 'Missing required parameters' });
        return;
    }

    const sql = `SELECT * 
                    FROM ratemanagement
                    WHERE duty = ?
                        AND vehicleType = ?
                        AND OrganizationName =?
                        AND ((? <= UptoHours AND ? <= UptoKMS) OR UptoHours = (SELECT MAX(UptoHours) FROM ratemanagement WHERE duty = ? AND vehicleType = ? AND OrganizationName =?))
                    ORDER BY UptoHours 
                    LIMIT 1;`

    // Execute the query with dynamic parameters 
    db.query(sql, [duty, vehicletype, OrganizationName, totalHours, totkm, duty, vehicletype, OrganizationName], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Check if any rows were returned
        if (results.length === 0) {
            return res.status(404).json({ error: 'No data found' });
        }

        // Send the fetched row in the response
        res.json(results[0]);
    });
});


router.get(`/ge-tVehicleName`, (req, res) => {
    const sql = `select * from vehicleinfo `;
    db.query(sql, (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Internal Server Error" })
        }
        return res.status(200).json(result)

    })

})




module.exports = router; 