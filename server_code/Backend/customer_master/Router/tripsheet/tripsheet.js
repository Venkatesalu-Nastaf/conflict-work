const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const db = require('../../../db');
const moment = require('moment');
// const { json } = require('body-parser');
require('dotenv').config()
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
        shedOutDate,
        startdate,
        closedate,
        shedInDate,
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
        orderbyemail,
        vehicleName2,
        vendor_vehicle,
        vendor_duty,
        vendor_ratename,
        vendorshedOutDate,
        vendorshedInDate,
        vendortotaldays,
        vendorreporttime,
        vendorshedintime,
        vendorTotaltime,
        vendorshedoutkm,
        vendorshedinkm,
        vendortotalkm,
        vendorRemarks,
        Vendor_Calcpackage,
        Vendor_rateAmount,
        Vendor_ExtraKms,
        Vendor_ExtraAmountKms,
        Vendor_totalAmountKms,
        Vendor_ExtraHours,
        Vendor_ExtraAmountHours,
        Vendor_totalAmountHours,
        Vendor_NightHALT,
        Vendor_NightBataAmount,
        Vendor_NightbataTotalAmount,
        Vendor_Bata,
        Vendor_BataAmount,
        Vendor_BataTotalAmount,
        Vendor_FULLTotalAmount,

    } = req.body


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
        shedOutDate,
        startdate,
        closedate,
        shedInDate,
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
        orderbyemail,
        vendor_vehicle,
        vehicleName2,
        vendor_duty,
        vendor_ratename,
        vendorshedOutDate,
        vendorshedInDate,
        vendortotaldays,
        vendorreporttime,
        vendorshedintime,
        vendorTotaltime,
        vendorshedoutkm,
        vendorshedinkm,
        vendortotalkm,
        vendorRemarks,
        Vendor_Calcpackage,
        Vendor_rateAmount,
        Vendor_ExtraKms,
        Vendor_ExtraAmountKms,
        Vendor_totalAmountKms,
        Vendor_ExtraHours,
        Vendor_ExtraAmountHours,
        Vendor_totalAmountHours,
        Vendor_NightHALT,
        Vendor_NightBataAmount,
        Vendor_NightbataTotalAmount,
        Vendor_Bata,
        Vendor_BataAmount,
        Vendor_BataTotalAmount,
        Vendor_FULLTotalAmount,
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
        shedOutDate,
        startdate,
        closedate,
        shedInDate,
        totaldays,
        employeeno,
        reporttime,
        starttime,
        closetime,
        additionaltime,
        advancepaidtovendor,
        customercode,
        vehicleName2,
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
        orderbyemail,
        vendor_vehicle,
        vendor_duty,
        vendor_ratename,
        vendorshedOutDate,
        vendorshedInDate,
        vendortotaldays,
        vendorreporttime,
        vendorshedintime,
        vendorTotaltime,
        vendorshedoutkm,
        vendorshedinkm,
        vendortotalkm,
        vendorRemarks,
        Vendor_Calcpackage,
        Vendor_rateAmount,
        Vendor_ExtraKms,
        Vendor_ExtraAmountKms,
        Vendor_totalAmountKms,
        Vendor_ExtraHours,
        Vendor_ExtraAmountHours,
        Vendor_totalAmountHours,
        Vendor_NightHALT,
        Vendor_NightBataAmount,
        Vendor_NightbataTotalAmount,
        Vendor_Bata,
        Vendor_BataAmount,
        Vendor_BataTotalAmount,
        Vendor_FULLTotalAmount, } = req.body


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
        shedOutDate,
        startdate,
        closedate,
        shedInDate,
        totaldays,
        employeeno,
        reporttime,
        vehicleName2,
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
        orderbyemail,
        vendor_vehicle,
        vendor_duty,
        vendor_ratename,
        vendorshedOutDate,
        vendorshedInDate,
        vendortotaldays,
        vendorreporttime,
        vendorshedintime,
        vendorTotaltime,
        vendorshedoutkm,
        vendorshedinkm,
        vendortotalkm,
        vendorRemarks,
        Vendor_Calcpackage,
        Vendor_rateAmount,
        Vendor_ExtraKms,
        Vendor_ExtraAmountKms,
        Vendor_totalAmountKms,
        Vendor_ExtraHours,
        Vendor_ExtraAmountHours,
        Vendor_totalAmountHours,
        Vendor_NightHALT,
        Vendor_NightBataAmount,
        Vendor_NightbataTotalAmount,
        Vendor_Bata,
        Vendor_BataAmount,
        Vendor_BataTotalAmount,
        Vendor_FULLTotalAmount,
    }

    console.log(driverBeta,
        driverbeta_Count,
        driverBeta_amount, 'edited');



    db.query('UPDATE tripsheet SET ? WHERE tripid = ?', [updatedCustomerData, tripid], (err, result) => {
        if (err) {
            console.log(err, "edit")
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
        shedOutDate,
        startdate,
        closedate,
        shedInDate,
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
        remark1, escort, minHour, minKM, vehicleName2,
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
        shedOutDate,
        startdate,
        closedate,
        shedInDate,
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
        remark1, escort, minHour, minKM, vehicleName2,
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
// router.get('/tripsheet-enter/:tripid', async (req, res) => {
//     const tripid = req.params.tripid;
//     const username = req.query.loginUserName;
//     console.log("tripid", tripid, "username", username)

//     let data = '';

//     if (!username) {
//         return res.status(500).json({ error: "username is undefined" })
//     }

//     db.query("SELECT Stationname FROM usercreation WHERE username=?", [username], async (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: "there some issue ffetching station name " })
//         }

//         data = await results[0]?.Stationname;

//         console.log("data", data)
//         const arryData = data.split(',');
//         console.log("arryData", arryData)
//         //------------------------------------------------------------

//         if (data && data.toLowerCase() === "all" || arryData.includes("ALL")) {
//             // its for fetch by All
//             await db.query(`SELECT * FROM tripsheet WHERE tripid = ? AND status != "Transfer_Billed" AND status !="Covering_Billed"`, tripid, (err, result) => {
//                 if (err) {
//                     return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
//                 }
//                 if (result.length === 0) {

//                     return res.status(404).json({ error: 'Booking not found' });
//                 }
//                 const bookingDetails = result[0]; // Assuming there is only one matching booking
//                 return res.status(200).json(bookingDetails);
//             });
//         }
//         else if (arryData) {
//             // its for fetch by All

//             const placeholders = arryData?.map(() => '?').join(', ');
//             const queryParams = [tripid, data]
//             await db.query(`SELECT * FROM tripsheet WHERE tripid = ? AND status != "Transfer_Billed" AND status !="Covering_Billed" AND department IN (${placeholders})`, queryParams, (err, result) => {
//                 if (err) {
//                     return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
//                 }
//                 if (result.length === 0) {
//                     return res.status(404).json({ error: 'Booking not found' });
//                 }
//                 const bookingDetails = result[0]; // Assuming there is only one matching booking
//                 return res.status(200).json(bookingDetails);
//             });
//         } else {
//             return res.status(500).json({ error: 'there is some ISSUE ' });
//         }
//         //----------------------------------------------------------
//     })
// });

//--------------------------------------------------------

// ----chnage collect data-----------------------------------

router.get('/tripsheet-enter/:tripid', async (req, res) => {
    const tripid = req.params.tripid;
    const username = req.query.loginUserName;
    console.log("tripid", tripid, "username", username)

    let data = '';

    if (!username) {
        return res.status(500).json({ error: "username is undefined" })
    }

    db.query("SELECT Stationname FROM usercreation WHERE username=?", [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: "there some issue ffetching station name " })
        }

        data = await results[0]?.Stationname;

        console.log("data", data)
        const arryData = data.split(',');
        console.log("arryData", arryData)
        //------------------------------------------------------------

        if (data && data.toLowerCase() === "all" || arryData.includes("ALL")) {
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
        else if (arryData) {
            // its for fetch by All

            // const placeholders = arryData?.map(() => '?').join(', ');
            // console.log(placeholders,"place")
            console.log(arryData)
            // console.log(data,"adtata")
            // const queryParams = [tripid, data]
            // await db.query(`SELECT * FROM tripsheet WHERE tripid = ? AND status != "Transfer_Billed" AND status !="Covering_Billed" AND department IN (${placeholders})`, queryParams, (err, result) => {
            await db.query(`SELECT * FROM tripsheet WHERE tripid = ? AND status != "Transfer_Billed" AND status !="Covering_Billed" AND department IN (?)`, [tripid, arryData], (err, result) => {
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

// ===========================================================
router.get('/tripsheet-maindash', (req, res) => {
    const { fromDate, toDate } = req.query;
    console.log(fromDate, "dd", toDate)

    db.query(`SELECT * FROM tripsheet where  tripsheetdate >= DATE_ADD(?, INTERVAL 0 DAY) 
        AND tripsheetdate <= DATE_ADD(?, INTERVAL 1 DAY)`, [fromDate, toDate], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        // const bookingDetails = result[0]; // Assuming there is only one matching booking
        console.log(result.length, "len")
        return res.status(200).json(result);
    });
});

router.get('/tripsheet-maindashcuurentdate/:tripsheetdate', (req, res) => {
    const tripsheet = req.params.tripsheetdate


    db.query('SELECT * FROM tripsheet where tripsheetdate=? ', [tripsheet], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
        }
        if (result.length === 0) {
            return res.status(200).json(result);
        }
        // const bookingDetails = result[0]; // Assuming there is only one matching booking
        console.log(result, "cc")
        return res.status(200).json(result);
    });
});
router.get('/tripsheet-maindashcuurentdate', (req, res) => {
    const { toDate, fromDate } = req.query;
    const formattedFromDate = moment(fromDate).format('YYYY-MM-DD');
    const formattedToDate = moment(toDate).format('YYYY-MM-DD');
    console.log(formattedFromDate, "to", formattedToDate)

    db.query(`SELECT * FROM tripsheet  where tripsheetdate >= DATE_ADD(?, INTERVAL 0 DAY) 
        AND tripsheetdate <= DATE_ADD(?, INTERVAL 1 DAY) `, [formattedFromDate, formattedToDate], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        // const bookingDetails = result[0]; // Assuming there is only one matching booking
        console.log(result, "hh")
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
        const { customeremail, guestname, guestmobileno, email, vehType, bookingno, starttime, startdate, vehRegNo, driverName, mobileNo, status, servicestation, Sendmailauth, Mailauthpass, requestno } = req.body;
        const formattedFromDate = moment(startdate).format('YYYY-MM-DD');
        console.log(formattedFromDate, "date")

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
            //     user:process.env.MAIL_AUTH,
            //     pass:process.env.MAIL_PASS,
            // },
            auth: {
                user: Sendmailauth,
                pass: Mailauthpass,
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
                            <td style="padding: 8px;color: #000"">${formattedFromDate}</td>
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
                        ${requestno ? `
                            <tr>
                             <td style="padding: 8px;"><strong>Request Id:</strong></td>
                              <td style="padding: 8px; color: #000;">${requestno}</td>
                              </tr>
                               ` : ''}
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
                // from: 'foxfahad386@gmail.com',
                from: Sendmailauth,
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
                            <td style="padding: 8px;">${formattedFromDate}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong> Time(24HR) </strong></td>
                            <td style="padding: 8px;">${starttime} Hrs</td>
                        </tr>
                       
                        ${requestno ? `
                            <tr>
                             <td style="padding: 8px;"><strong>Request Id:</strong></td>
                              <td style="padding: 8px; color: #000;">${requestno}</td>
                              </tr>
                               ` : ''}
                       
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

    // Query to check if the tripid and trip_type exist
    const getquery = "SELECT * FROM gmapdata WHERE tripid = ? AND trip_type = ?";

    db.query(getquery, [tripid, tripType], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length > 0) {
            // Trip ID and trip type exist, delete the old row
            const deleteQuery = "DELETE FROM gmapdata WHERE tripid = ? AND trip_type = ?";
            db.query(deleteQuery, [tripid, tripType], (err, deleteResults) => {
                if (err) {
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                // Insert the new row
                const insertQuery = "INSERT INTO gmapdata (date, time, trip_type, place_name, tripid) VALUES (?, ?, ?, ?, ?)";
                db.query(insertQuery, [date, time, tripType, placeName, tripid], (err, insertResults) => {
                    if (err) {
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }
                    res.status(200).json({ message: 'Form data submitted successfully' });
                });
            });
        } else {
            // Trip ID and trip type do not exist, insert the new row directly
            const insertQuery = "INSERT INTO gmapdata (date, time, trip_type, place_name, tripid) VALUES (?, ?, ?, ?, ?)";
            db.query(insertQuery, [date, time, tripType, placeName, tripid], (err, insertResults) => {
                if (err) {
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                res.status(200).json({ message: 'Form data submitted successfully' });
            });
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
router.get('/getAllGmapdata', (req, res) => {
    db.query('SELECT * FROM gmapdata', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
        }
        return res.status(200).json(results);
    });
});


router.post('/updateGPS-LOG/:tripid', (req, res) => {
    const tripid = req.params.tripid; // Correctly accessing the tripid parameter from the URL
    const { time, date, trip_type } = req.body; // Extracting time and date from the request body

    if (!tripid || !time || !date) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    // SQL query to update the database
    const query = 'UPDATE gmapdata SET time = ?, date = ? WHERE tripid = ? AND trip_type = ?';

    // Execute the query with the provided parameters
    db.query(query, [time, date, tripid, trip_type], (err, result) => {
        if (err) {
            console.error('Error updating GPS log:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Trip not found' });
        }

        res.status(200).json({ message: 'GPS log updated successfully' });
    });
});


router.delete('/dlete-mapLocationPoint/:payload', (req, res) => {
    const id = req.params.payload;
    db.query('delete from gmapdata where id=?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'faild to fetch error' })
        }
        return res.status(200).json(result)
    })
})




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


    console.log(totalHours, VehicleName, duty, totkm, OrganizationName, 'rate');

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
        console.log(results, 'resultreate');

        res.json(results[0]);
    });
});

router.get(`/totalhrsuppiler-pack`, (req, res) => {
    // Extract dynamic inputs from query parameters
    const totalHours = req.query.totalHours;
    const ratetype = req.query.ratetype;
    // const vehicletype = req.query.vehicletype;
    const VehicleName = req.query.vehicleName;
    const duty = req.query.duty;
    const totkm = req.query.totkm;
    const OrganizationName = req.query.organizationname;

    console.log(totalHours, "tt", ratetype, "rate", VehicleName, "name", duty, "duty", totkm, "totkmm", OrganizationName, "organnan")


    if (!totalHours || !VehicleName || !duty || !totkm || !OrganizationName || !ratetype) {
        res.status(400).json({ error: 'Missing required parameters' });
        return;
    }

    const sql = `SELECT * 
                    FROM ratemanagement
                    WHERE duty = ?
                        AND VehicleName = ?
                        AND OrganizationName =?
                        AND ratetype = ?
                        AND ((? <= UptoHours AND ? <= UptoKMS) OR UptoHours = (SELECT MAX(UptoHours) FROM ratemanagement WHERE duty = ? AND VehicleName = ? AND OrganizationName =?))
                    ORDER BY UptoHours 
                    LIMIT 1;`

    // Execute the query with dynamic parameters 
    db.query(sql, [duty, VehicleName, OrganizationName, ratetype, totalHours, totkm, duty, VehicleName, OrganizationName], (error, results) => {
        // Check if any rows were returned
        if (results.length === 0) {
            return res.status(404).json({ error: 'No data found' });
        }

        // Send the fetched row in the response
        console.log(results[0])
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


// to fetch cancel tripsheet data
router.get(`/get-CancelTripData/:VehicleNo`, (req, res) => {
    const vehicleNo = req.params.VehicleNo
    const status = 'Transfer_Closed';
    // sql = `select * from tripsheet where vehRegNo=? and (status='Transfer_Closed' ||status='Covering_Closed' ||status='Closed')`

    sql = `select * from tripsheet where vehRegNo=? and (status='Transfer_Closed' ||status='Covering_Closed' ||status='Closed')`
    db.query(sql, [vehicleNo, status], (err, result) => {
        if (err) {
            console.log("err", err)
            res.json({ message: "error fetching data", success: false })
        }

        if (result) {
            res.status(200).json(result)
        }
    })

})

router.get('/get-CancelTripDatanewdatatry/:VehicleNo', (req, res) => {
    const vehicleNo = req.params.VehicleNo
    console.log(vehicleNo, "nooo")
    // const status = 'Transfer_Closed';
    // sql = select * from tripsheet where vehRegNo=? and (status='Transfer_Closed' ||status='Covering_Closed' ||status='Closed')

    sql = `select * from tripsheet where vehRegNo=? and status !='Cancelled' `
    db.query(sql, [vehicleNo], (err, result) => {
        if (err) {
            console.log("err", err)
            res.json({ message: "error fetching data", success: false })
        }

        if (result) {
            res.status(200).json(result)
        }
    })

})


// router.get('/tripshedin/:vehregno/:cvalue',(req, res) => {
//     // const { vehregno, cvalue } = req.params;
//     const vehregno =req.params.vehregno; // Get vehregno and cvalue from query parameters
//     const cvalue =req.params.cvalue;
//     console.log(vehregno,cvalue,"ff")

//       // SQL query
//       const sql = `
//         SELECT tripid, shedin, shedout, shedInDate, shedintime, startkm, closekm
//         FROM tripsheet
//         WHERE 
//         vehRegNo = ?
//         AND status != 'Cancelled'
//           AND (
//             (shedin IS NOT NULL AND ? <= shedin AND ? >= shedout)
//             OR (shedin IS NULL AND closekm IS NOT NULL AND ? <= closekm AND ? >= shedout)
//             OR (closekm IS NULL AND ? >= shedout AND ? <= startkm)
//             OR (startkm IS NULL AND ? = shedout)
//           );
//       `;

//       // Execute the query with parameters
//       db.query(sql, [vehregno, cvalue, cvalue, cvalue, cvalue, cvalue, cvalue, cvalue], (err, result) => {
//                     if (err) {
//                         console.log("err", err)
//                         res.json({ message: "error fetching data", success: false })
//                     }
//                             console.log(result)

//                            return res.status(200).json(result)
//                 })



//       // Send the results as a JSON response


//   });

router.get('/tripaccounttravelname', (req, res) => {
    db.query("select * from accountinfo", (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Internal Server Error" })
        }
        return res.status(200).json(results)
    })
})


router.get('/signaturetimedatadetails/:tripid', (req, res) => {
    const tripid = req.params.tripid;
    db.query("select * from Signaturetimedetails where tripid = ?", [tripid], (err, results) => {
        if (err) {
            return res.status(400).json(err)
        }
        // console.log(results)
        return res.status(200).json(results)

    })
})

router.get('/signaturedataurltrip/:tripid', (req, res) => {
    const tripid = req.params.tripid;
    console.log(tripid)
    db.query("select * from tripsheet where tripid = ?", [tripid], (err, results) => {
        if (err) {
            return res.status(400).json(err)
        }
        // console.log(results)
        return res.status(200).json(results)

    })

})
router.post("/uploadtollandparkinglink", (req, res) => {
    const { toll, parking, tripid } = req.body;
    const query = 'UPDATE tripsheet SET toll = ?, parking = ? WHERE tripid = ?';

    db.query(query, [toll, parking, tripid], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        res.status(200).json({ message: 'Status updated successfully' });
    });

})

router.get('/customerratenamedata/:customerdata', (req, res) => {
    const customer = req.params.customerdata;
    console.log(customer)
    db.query('select rateType from customers where customer = ?', [customer], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        res.status(200).json(result);
    })
})



module.exports = router; 