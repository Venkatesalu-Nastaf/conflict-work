const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const db = require('../../../db');
const moment = require('moment');
const { json } = require('body-parser');
// trip sheet database:


// add tripsheet database-------------------------------------------- 
router.post('/tripsheet-add', (req, res) => {


    const { tripid,
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
        Groups,
        driverName,
        mobileNo,
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
        starttime2,
        closetime2,
        totaltime,
        startkm1,
        closekm1,
        totalkm1,
        remark1,
        escort,
        transferreport,
        minHour,
        minKM,
        calcPackage,
        extraHR,
        extraKM,
        package_amount,
        extrakm_amount,
        extrahr_amount,
        ex_kmAmount,
        ex_hrAmount,
        nightBta,
        nightCount,
        night_totalAmount,
        driverBeta,
        driverbeta_Count,
        driverBeta_amount,
        totalcalcAmount,
        nightThrs,
        dtc,
        dtc2,
        nightThrs2,
        exkmTkm2,
        exHrsTHrs2,
        netamount,
        vehcommission,
        discount,
        selects,
        documenttype,
        on1,
        smsgust,
        travelsname,
        travelsemail,
        vehicleName,
        orderbyemail } = req.body


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
        Groups,
        driverName,
        mobileNo,
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
        starttime2,
        closetime2,
        totaltime,
        startkm1,
        closekm1,
        totalkm1,
        remark1,
        escort,
        transferreport,
        minHour,
        minKM,
        calcPackage,
        extraHR,
        extraKM,
        package_amount,
        extrakm_amount,
        extrahr_amount,
        ex_kmAmount,
        ex_hrAmount,
        nightBta,
        nightCount,
        night_totalAmount,
        driverBeta,
        driverbeta_Count,
        driverBeta_amount,
        totalcalcAmount,
        nightThrs,
        dtc,
        dtc2,
        nightThrs2,
        exkmTkm2,
        exHrsTHrs2,
        netamount,
        vehcommission,
        discount,
        selects,
        documenttype,
        on1,
        smsgust,
        travelsname,
        travelsemail,
        vehicleName,
        orderbyemail
    }

    // Assuming 'startdate' is in ISO 8601 format
    const formattedStartDate = moment(startdate).format('YYYY-MM-DD');
    const driverTripAssign = {
        driverName,
        startdate: formattedStartDate,
        vehRegNo,
        reporttime,
        shedintime
    }


    db.query('INSERT INTO tripsheet SET ?', addCustomerData, (err, result) => {

        if (err) {

            return res.status(500).json({ error: "Failed to insert data into MySQL" });
        }
        if (result.affectedRows > 0) {
            db.query('INSERT INTO driver_trip_assign SET ?', driverTripAssign, (err, result) => {
                if (err) {
                    console.log(err, "error")
                    return res.status(500).json({ error: "Failed to insert data into MySQL" });
                }
            })
            db.query(`UPDATE booking SET status = 'Opened' WHERE bookingno=${bookingno}; `, (err, result5) => {
                if (err) {
                    return res.status(500).json({ error: "Failed to insert data into MySQL" });
                }
                if (result.affectedRows > 0) {
                    return res.status(200).json({ message: "Data inserted successfully" });

                }

            })
        }
    });
});

// delete tripsheet data---------------------------------------------------
router.delete('/tripsheet/:tripid', (req, res) => {
    const tripid = req.params.tripid;
    const username = req.query;

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
    // const tripid = req.params.tripid;
    // const {

    //     bookingno,
    //     tripsheetdate,
    //     status,
    //     billingno,
    //     apps,
    //     customer,
    //     orderedby,
    //     mobile,
    //     guestname,
    //     guestmobileno,
    //     email,
    //     address1,
    //     streetno,
    //     city,
    //     hireTypes,
    //     department,
    //     vehRegNo,
    //     vehType,
    //     driverName,
    //     mobileNo,
    //     driversmsexbetta,
    //     gps,
    //     duty,
    //     pickup,
    //     useage,
    //     request,
    //     startdate,
    //     closedate,
    //     totaldays,
    //     employeeno,
    //     reporttime,
    //     starttime,
    //     closetime,
    //     additionaltime,
    //     advancepaidtovendor,
    //     customercode,
    //     startkm,
    //     closekm,
    //     shedkm,
    //     shedin,
    //     shedout,
    //     shedintime,
    //     permit,
    //     parking,
    //     toll,
    //     vpermettovendor,
    //     vendortoll,
    //     customeradvance,
    //     email1,
    //     remark,
    //     smsguest,
    //     documentnotes,
    //     VendorTripNo,
    //     vehicles,
    //     duty1,
    //     startdate1,
    //     closedate1,
    //     totaldays1,
    //     locks,
    //     starttime2,
    //     closetime2,
    //     totaltime,
    //     startkm1,
    //     closekm1,
    //     totalkm1,
    //     remark1, escort, minHour, minKM,
    //     calcPackage, extraHR, extraKM, package_amount, extrakm_amount, extrahr_amount, ex_kmAmount, ex_hrAmount, nightBta, nightCount, night_totalAmount, driverBeta, driverbeta_Count, driverBeta_amount, totalcalcAmount,
    //     nightThrs,
    //     dtc,
    //     dtc2,
    //     nightThrs2,
    //     exkmTkm2,
    //     exHrsTHrs2,
    //     netamount,
    //     vehcommission,
    //     caramount1,
    //     manualbills,
    //     pack,
    //     amount5,
    //     exkm1,
    //     amount6,
    //     exHrs1,
    //     amount7,
    //     night1,
    //     amount8,
    //     driverconvenience1,
    //     amount9,
    //     rud,
    //     netamount1,
    //     discount,
    //     ons,
    //     manualbills1,
    //     balance,
    //     fcdate,
    //     taxdate,
    //     insdate,
    //     stpermit,
    //     maintenancetype,
    //     kilometer,
    //     selects,
    //     documenttype,
    //     on1,
    //     smsgust,
    //     emailcheck,
    //     booker,
    //     reload,
    //     manualbillss, Groups, transferreport, travelsemail, travelsname, vehileName, orderbyemail } = req.body;

    // const updatedCustomerData = {
    //     bookingno,
    //     tripsheetdate,
    //     status,
    //     billingno,
    //     apps,
    //     customer,
    //     orderedby,
    //     mobile,
    //     guestname,
    //     guestmobileno,
    //     email,
    //     address1,
    //     streetno,
    //     city,
    //     hireTypes,
    //     department,
    //     vehRegNo,
    //     vehType,
    //     driverName,
    //     mobileNo,
    //     driversmsexbetta,
    //     gps,
    //     duty,
    //     pickup,
    //     useage,
    //     request,
    //     startdate,
    //     closedate,
    //     totaldays,
    //     employeeno,
    //     reporttime,
    //     starttime,
    //     closetime,
    //     additionaltime,
    //     advancepaidtovendor,
    //     customercode,
    //     startkm,
    //     closekm,
    //     shedkm,
    //     shedin,
    //     shedout,
    //     shedintime,
    //     permit,
    //     parking,
    //     toll,
    //     vpermettovendor,
    //     vendortoll,
    //     customeradvance,
    //     email1,
    //     remark,
    //     smsguest,
    //     documentnotes,
    //     VendorTripNo,
    //     vehicles,
    //     duty1,
    //     startdate1,
    //     closedate1,
    //     totaldays1,
    //     locks,
    //     starttime2,
    //     closetime2,
    //     totaltime,
    //     startkm1,
    //     closekm1,
    //     totalkm1,
    //     remark1, escort, minHour, minKM,
    //     calcPackage, extraHR, extraKM, package_amount, extrakm_amount, extrahr_amount, ex_kmAmount, ex_hrAmount, nightBta, nightCount, night_totalAmount, driverBeta, driverbeta_Count, driverBeta_amount, totalcalcAmount,
    //     nightThrs,
    //     dtc,
    //     dtc2,
    //     nightThrs2,
    //     exkmTkm2,
    //     exHrsTHrs2,
    //     netamount,
    //     vehcommission,
    //     caramount1,
    //     manualbills,
    //     pack,
    //     amount5,
    //     exkm1,
    //     amount6,
    //     exHrs1,
    //     amount7,
    //     night1,
    //     amount8,
    //     driverconvenience1,
    //     amount9,
    //     rud,
    //     netamount1,
    //     discount,
    //     ons,
    //     manualbills1,
    //     balance,
    //     fcdate,
    //     taxdate,
    //     insdate,
    //     stpermit,
    //     maintenancetype,
    //     kilometer,
    //     selects,
    //     documenttype,
    //     on1,
    //     smsgust,
    //     emailcheck,
    //     booker,
    //     reload,
    //     manualbillss,
    //     Groups,
    //     transferreport, travelsemail, travelsname, vehileName, orderbyemail
    // };


    const { tripid,
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
        Groups,
        driverName,
        mobileNo,
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
        starttime2,
        closetime2,
        totaltime,
        startkm1,
        closekm1,
        totalkm1,
        remark1,
        escort,
        transferreport,
        minHour,
        minKM,
        calcPackage,
        extraHR,
        extraKM,
        package_amount,
        extrakm_amount,
        extrahr_amount,
        ex_kmAmount,
        ex_hrAmount,
        nightBta,
        nightCount,
        night_totalAmount,
        driverBeta,
        driverbeta_Count,
        driverBeta_amount,
        totalcalcAmount,
        nightThrs,
        dtc,
        dtc2,
        nightThrs2,
        exkmTkm2,
        exHrsTHrs2,
        netamount,
        vehcommission,
        discount,
        selects,
        documenttype,
        on1,
        smsgust,
        travelsname,
        travelsemail,
        vehicleName,
        orderbyemail } = req.body


    const updatedCustomerData = {
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
        Groups,
        driverName,
        mobileNo,
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
        starttime2,
        closetime2,
        totaltime,
        startkm1,
        closekm1,
        totalkm1,
        remark1,
        escort,
        transferreport,
        minHour,
        minKM,
        calcPackage,
        extraHR,
        extraKM,
        package_amount,
        extrakm_amount,
        extrahr_amount,
        ex_kmAmount,
        ex_hrAmount,
        nightBta,
        nightCount,
        night_totalAmount,
        driverBeta,
        driverbeta_Count,
        driverBeta_amount,
        totalcalcAmount,
        nightThrs,
        dtc,
        dtc2,
        nightThrs2,
        exkmTkm2,
        exHrsTHrs2,
        netamount,
        vehcommission,
        discount,
        selects,
        documenttype,
        on1,
        smsgust,
        travelsname,
        travelsemail,
        vehicleName,
        orderbyemail
    }



    db.query('UPDATE tripsheet SET ? WHERE tripid = ?', [updatedCustomerData, tripid], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to update data in MySQL" });
        }
        if (result.affectedRows === 0) {

            return res.status(404).json({ error: "Customer not found" });
        }
        if (result.affectedRows > 0) {

            if (status === "Opened" || status === "Cancelled") {

                db.query(`UPDATE booking SET status = '${status}' WHERE bookingno=${bookingno};`)
            }


            return res.status(200).json({ message: "Data updated successfully" });
        }
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
        remark1, escort, minHour, minKM,
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
        manualbillss, Groups, transferreport, travelsemail, travelsname, vehileName, orderbyemail } = req.body;

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
        remark1, escort, minHour, minKM,
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
        Groups,
        transferreport, travelsemail, travelsname, vehileName, orderbyemail
    };


    db.query('UPDATE tripsheet SET ? WHERE tripid = ?', [updatedCustomerData, tripid], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to update data in MySQL" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Customer not found" });
        }
        // for BE_closed
        db.query(`UPDATE tripsheet SET apps='Closed' WHERE tripid=${tripid}`, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to update tripsheet details in MySQL' });
            }
            return res.status(200).json(result);
        });
        return res.status(200).json({ message: "Data updated successfully" });
    });
});

// collect data from tripsheet database------------------------------------
router.get('/tripsheet-enter/:tripid', async (req, res) => {
    const tripid = req.params.tripid;
    const username = req.query.loginUserName;

    let data = '';

    if (!username) {
        return res.status(500).json({ error: "username is undefined" })
    }

    db.query("SELECT Stationname FROM usercreation WHERE username=?", [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: "there some issue ffetching station name " })
        }

        data = await results[0]?.Stationname;
        //------------------------------------------------------------

        if (data && data.toLowerCase() === "all") {
            // its for fetch by All
            await db.query(`SELECT * FROM tripsheet WHERE tripid = ? AND status != "Transfer_Billed" AND status !="Covering_Billed"`, tripid, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
                }
                if (result.length === 0) {

                    return res.status(404).json({ error: 'Booking not found' });
                }
                const bookingDetails = result[0]; // Assuming there is only one matching booking
                return res.status(200).json(bookingDetails);
            });
        }
        else if (data) {
            // its for fetch by All
            await db.query(`SELECT * FROM tripsheet WHERE tripid = ? AND status != "Transfer_Billed" AND status !="Covering_Billed" AND department=${data}`, tripid, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
                }
                if (result.length === 0) {
                    return res.status(404).json({ error: 'Booking not found' });
                }
                const bookingDetails = result[0]; // Assuming there is only one matching booking
                return res.status(200).json(bookingDetails);
            });
        } else {
            return res.status(500).json({ error: 'there is some ISSUE ' });
        }
        //----------------------------------------------------------
    })
});

//--------------------------------------------------------

router.get('/tripsheet-maindash', (req, res) => {

    db.query('SELECT * FROM tripsheet ', (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        // const bookingDetails = result[0]; // Assuming there is only one matching booking
        return res.status(200).json(result);
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
        const { customeremail, guestname, guestmobileno, email, vehType, bookingno, starttime, startdate, vehRegNo, driverName, mobileNo, status, servicestation } = req.body;
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
                // Ignore SSL certificate errors
                rejectUnauthorized: false
            }
        });
        // Email content for the owner

        if (status === "Cancelled") {

            // Email content for the customer
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
                            <td style="padding: 8px;color: #000"">${driverName} / ${mobileNo}</td>
                        </tr>
                    </tbody>
                </table>
                <p>In case of any further queries or clarifications, kindly contact our Help Desk. Our team will be more than happy to assist you. Wish you a pleasant journey.</p>

        
          `,
            }
            // Send greeting email to the customer
            await transporter.sendMail(customerMailOptions);
            res.status(200).json({ message: 'Email sent successfully' });
        }
        else {
            const customerMailOptions1 = {
                from: 'foxfahad386@gmail.com',
                to: `${email},${customeremail}`,
                subject: `JESSY CABS CAR DETAILS FOR ${guestname} - Tripsheet No.${bookingno}  `,
                html: `
            <table border="1" bordercolor="#000000" style="border-collapse: collapse; width: 100%;">
                    <thead style="background-color: #9BB0C1; color: #FFFFFF;">
                        <tr>
                            <th colspan="2" style="padding: 8px; text-align: center;">Dear Sir/Madam, Your Cabs Details are below </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 8px;"><strong>Trip No</strong></td>
                            <td style="padding: 8px;">${bookingno}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Name of Guest</strong></td>
                            <td style="padding: 8px;">${guestname}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>Contact Number </strong></td>
                            <td style="padding: 8px;">${guestmobileno}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong> Date :</strong></td>
                            <td style="padding: 8px;">${startdate}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong> Time(24HR) </strong></td>
                            <td style="padding: 8px;">${starttime} Hrs</td>
                        </tr>
                       
                        <tr>
                       
                        <tr>
                        <td style="padding: 8px;"><strong>Car Sent</strong></td>
                        <td style="padding: 8px;color: #000"">${vehType}</td>
                    </tr>
                    <tr>
                            <td style="padding: 8px;"><strong>Vehicle RegNo:</strong></td>
                            <td style="padding: 8px;color: #000"">${vehRegNo}</td>
                        </tr>
                        <tr>
                        <td style="padding: 8px;"><strong>Driver Name / Phone:</strong></td>
                        <td style="padding: 8px;color: #000"">${driverName} / ${mobileNo}</td>
                    </tr>
                    </tbody>
                </table>
                <p>The Vehicle and Driver details will be sent to you before the pick-up time. Incase of any further queries or clarifications, kindly contact our Help Desk. Our team will be more than happy to assist you. Wish you a pleasant journey.</p>
        
          `,
            }
            // Send greeting email to the customer
            await transporter.sendMail(customerMailOptions1);
            res.status(200).json({ message: 'Email sent successfully' });

        }

        // res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'An error occurred while sending the email' });
    }
});



//end tripsheet mail
//collect data
// router.get('/tripuploadcollect/:tripid/:bookingno', (req, res) => {
//     const tripid = req.params.tripid;
//     const bookingno = req.params.bookingno;

//     let image1, image2;


//     db.query("SELECT * FROM tripsheetupload where tripid=? or bookingno=?", [tripid, bookingno], (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: "Failed to fetch data from MySQL" });
//         }
//         // console.log(results)
//         // return res.status(200).json(results);
//         image1 = results
//     });

//     const bookingImage = 'select * from booking_doc where booking_id=?';

//     db.query(bookingImage, [bookingno], (err, result) => {
//         image2 = result
//     })
//     console.log(image1, image2)

//     return res.status(200), json({ image1, image2 })
// });
// router.get('/tripuploadcollect/:tripid/:bookingno', (req, res) => {
//     const tripid = req.params.tripid;
//     const bookingno = req.params.bookingno;

//     let image1, image2;


//     db.query("SELECT * FROM tripsheetupload WHERE tripid=? OR bookingno=?", [tripid, bookingno], (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: "Failed to fetch data from MySQL" });
//         }
//         image1 = results;

//         const bookingImage = 'SELECT * FROM booking_doc WHERE booking_id=?';

//         db.query(bookingImage, [bookingno], (err, result) => {
//             if (err) {
//                 return res.status(500).json({ error: "Failed to fetch data from MySQL" });
//             }
//             image2 = result;

//             // console.log(image1, image2);
//             const combainedData = [...image1, ...image2]

//             return res.status(200).json(combainedData);
//         });
//     });
// });

router.get('/tripuploadcollect/:tripid/:bookingno', (req, res) => {
    const tripid = req.params.tripid;
    const bookingno = req.params.bookingno;

    db.query("SELECT * FROM tripsheetupload WHERE tripid=? ", [tripid], (err, tripResults) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch data from MySQL" });
        }
        const bookingImage = 'SELECT * FROM booking_doc WHERE booking_id=?';

        db.query(bookingImage, [bookingno], (err, bookingResults) => {
            if (err) {
                return res.status(500).json({ error: "Failed to fetch data from MySQL" });
            }

            // Combine the results into an array with separate keys
            const combinedResults = [
                { type: 'tripResults', data: tripResults },
                { type: 'bookingResults', data: bookingResults }
            ];
            return res.status(200).json(combinedResults);
        });
    });
});




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
    // const vehicletype = req.query.vehicletype;
    const VehicleName = req.query.vehicleName;
    const duty = req.query.duty;
    const totkm = req.query.totkm;
    const OrganizationName = req.query.organizationname;


    if (!totalHours || !VehicleName || !duty || !totkm || !OrganizationName) {
        res.status(400).json({ error: 'Missing required parameters' });
        return;
    }

    const sql = `SELECT * 
                    FROM ratemanagement
                    WHERE duty = ?
                        AND VehicleName = ?
                        AND OrganizationName =?
                        AND ((? <= UptoHours AND ? <= UptoKMS) OR UptoHours = (SELECT MAX(UptoHours) FROM ratemanagement WHERE duty = ? AND VehicleName = ? AND OrganizationName =?))
                    ORDER BY UptoHours 
                    LIMIT 1;`

    // Execute the query with dynamic parameters 
    db.query(sql, [duty, VehicleName, OrganizationName, totalHours, totkm, duty, VehicleName, OrganizationName], (error, results) => {
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