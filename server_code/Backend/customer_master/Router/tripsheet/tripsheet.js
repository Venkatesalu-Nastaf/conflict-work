const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const db = require('../../../db');
const moment = require('moment');
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
        vendorparking,
        fuelamount,
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
        Vendor_FULLTotalAmount,
        Vendor_BataTotalAmount,
        TotalTimeWithoutAddHours,
        Hybriddata,
        TimeToggleData,
        VendorTimeToggle,
        HclMaxConflctdata,
        Hcldatakmvalue

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
        totaldays: parseInt(totaldays) || 0,
        employeeno,
        reporttime,
        starttime: starttime || null,
        closetime: closetime || null,
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
        vendorparking,
        fuelamount,
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
        extraHR: parseInt(extraHR || 0) || 0,
        extraKM: parseInt(extraKM || 0) || 0,
        package_amount: parseInt(package_amount || 0) || 0,
        extrakm_amount: parseInt(extrakm_amount || 0) || 0,
        extrahr_amount: parseInt(extrahr_amount || 0) || 0,
        ex_kmAmount,
        ex_hrAmount,
        nightBta: parseInt(nightBta || 0) || 0,
        nightCount: parseInt(nightCount || 0) || 0,
        night_totalAmount,
        driverBeta: parseInt(driverBeta || 0) || 0,
        driverbeta_Count: parseInt(driverbeta_Count || 0) || 0,
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
        Vendor_rateAmount: parseInt(Vendor_rateAmount || 0) || 0,
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
        TotalTimeWithoutAddHours,
        Hybriddata,
        TimeToggleData, VendorTimeToggle, HclMaxConflctdata,
        Hcldatakmvalue
    }
    console.log(addCustomerData, 'tripsheetadddata');

    // Assuming 'startdate' is in ISO 8601 format
    // const formattedStartDate = moment(startdate).format('YYYY-MM-DD');
    const formattedStartDate = moment(startdate).format('DD-MM-YYYY');
    const driverTripAssign = {
        driverName,
        startdate: formattedStartDate,
        vehRegNo,
        reporttime,
        shedintime
    }

    db.query('INSERT INTO tripsheet SET ?', addCustomerData, (err, result) => {

        if (err) {
            console.log(err, 'error');

            return res.status(500).json({ error: "Failed to insert data into MySQL" });
        }
        if (result.affectedRows > 0) {
            db.query('INSERT INTO driver_trip_assign SET ?', driverTripAssign, (err, result) => {
                if (err) {
                    console.log(err, "error")
                    return res.status(500).json({ error: "Failed to insert data into MySQL" });
                }
            })
            db.query(`UPDATE booking SET status = 'Opened' WHERE bookingno=${tripid}; `, (err, result5) => {
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

// add vehicleHistorydata table
router.post('/addVehicleHistoryData', (req, res) => {
    const { tripid,
        VehicleNo,
        shedouttime,
        reporttime,
        closetime,
        shedintime,
        shedoutdate,
        reportdate,
        closedate,
        shedindate,
        shedoutkm,
        reportkm,
        closekm,
        shedinkm,
        totalkm,
        drivername,
    } = req.body;

    const vehcileHistoryData = {
        tripid,
        VehicleNo,
        shedouttime,
        reporttime,
        closetime,
        shedintime,
        shedoutdate,
        reportdate,
        closedate,
        shedindate,
        shedoutkm,
        reportkm,
        closekm,
        shedinkm,
        totalkm,
        drivername,
    }
    db.query('INSERT INTO Vehicle_History_Data SET ?', vehcileHistoryData, (err, result) => {
        if (err) {
            console.log(err, 'error');

            return res.status(500).json({ error: "Failed to insert data into MySQL" });
        }
        return res.status(200).json({ message: "Data inserted successfully" });
    })

})

router.delete('/deleteVehicleHistoryData/:tripid', (req, res) => {
    const tripid = req.params.tripid;
    db.query('DELETE FROM Vehicle_History_Data WHERE Tripid = ?', tripid, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to delete data from MySQL" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Data Not Deleted " });
        }
        return res.status(200).json({ message: "Data deleted successfully" });
    })
})


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

// delete tripsheet data---------------------------------------------------
router.delete('/tripsheet/:tripid', (req, res) => {
    const tripid = req.params.tripid;
    const username = req.query;

    db.query('DELETE FROM tripsheet WHERE tripid = ?', tripid, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to delete data from MySQL" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Data Not Deleted " });
        }
        return res.status(200).json({ message: "Data deleted successfully" });
    });
});

// get vehicleHistorydata by vehicleNo
// router.post('/getVehcileHistoryData',(req,res)=>{
//     const { vehicleNo } = req.body;
//     console.log(vehicleNo,"vehicleno");

//     db.query('SELECT * FROM Vehicle_History_Data WHERE VehicleNo = ?',[vehicleNo],(err,result)=>{
//         if(err){
//             console.log(err,"error");
//         }
//         console.log(result,"vehicle result");

//         res.status(200).json(result);
//     })
// })
router.post('/getVehcileHistoryData', (req, res) => {
    const { vehicleNo } = req.body;
    console.log(vehicleNo, "historyvehicle");

    //     const query = `
    //     SELECT shedoutdate, reportdate, closedate, shedindate,Tripid,
    //     GREATEST(
    //         IFNULL(STR_TO_DATE(shedoutdate, '%Y-%m-%d %H:%i:%s'), '1970-01-01'), 
    //         IFNULL(STR_TO_DATE(reportdate, '%Y-%m-%d %H:%i:%s'), '1970-01-01'), 
    //         IFNULL(STR_TO_DATE(closedate, '%Y-%m-%d'), '1970-01-01'), 
    //         IFNULL(STR_TO_DATE(shedindate, '%Y-%m-%d'), '1970-01-01')
    //     ) AS latestDate
    //     FROM Vehicle_History_Data
    //     WHERE VehicleNo = ?
    //     ORDER BY latestDate DESC
    //     LIMIT 1
    // `;
    const query = `
SELECT VehicleNo, shedoutdate, reportdate, closedate, shedindate,
       shedouttime, reporttime, closetime, shedintime, Tripid,
       DATE_FORMAT(
           GREATEST(
               IFNULL(STR_TO_DATE(CONCAT(shedoutdate, ' ', shedouttime), '%Y-%m-%d %H:%i:%s'), '1970-01-01 00:00:00'),
               IFNULL(STR_TO_DATE(CONCAT(reportdate, ' ', reporttime), '%Y-%m-%d %H:%i:%s'), '1970-01-01 00:00:00'),
               IFNULL(STR_TO_DATE(CONCAT(closedate, ' ', closetime), '%Y-%m-%d %H:%i:%s'), '1970-01-01 00:00:00'),
               IFNULL(STR_TO_DATE(CONCAT(shedindate, ' ', shedintime), '%Y-%m-%d %H:%i:%s'), '1970-01-01 00:00:00')
           ),
           '%Y-%m-%d'
       ) AS latestFormattedDate,
       GREATEST(
           IFNULL(STR_TO_DATE(CONCAT(shedoutdate, ' ', shedouttime), '%Y-%m-%d %H:%i:%s'), '1970-01-01 00:00:00'),
           IFNULL(STR_TO_DATE(CONCAT(reportdate, ' ', reporttime), '%Y-%m-%d %H:%i:%s'), '1970-01-01 00:00:00'),
           IFNULL(STR_TO_DATE(CONCAT(closedate, ' ', closetime), '%Y-%m-%d %H:%i:%s'), '1970-01-01 00:00:00'),
           IFNULL(STR_TO_DATE(CONCAT(shedindate, ' ', shedintime), '%Y-%m-%d %H:%i:%s'), '1970-01-01 00:00:00')
       ) AS latestDateTime,
       -- Logic to return the correct field based on the availability
       COALESCE(NULLIF(shedintime, ''), NULLIF(closetime, ''), reporttime) AS finalTime,
       -- Extract the time part from the latestDateTime
       TIME(
           GREATEST(
               IFNULL(STR_TO_DATE(CONCAT(shedoutdate, ' ', shedouttime), '%Y-%m-%d %H:%i:%s'), '1970-01-01 00:00:00'),
               IFNULL(STR_TO_DATE(CONCAT(reportdate, ' ', reporttime), '%Y-%m-%d %H:%i:%s'), '1970-01-01 00:00:00'),
               IFNULL(STR_TO_DATE(CONCAT(closedate, ' ', closetime), '%Y-%m-%d %H:%i:%s'), '1970-01-01 00:00:00'),
               IFNULL(STR_TO_DATE(CONCAT(shedindate, ' ', shedintime), '%Y-%m-%d %H:%i:%s'), '1970-01-01 00:00:00')
           )
       ) AS latestTime
FROM Vehicle_History_Data
WHERE VehicleNo = ?
ORDER BY latestDateTime DESC
LIMIT 1;



`;

    db.query(query, [vehicleNo], (err, result) => {
        if (err) {
            console.error(err, "error");
            res.status(500).json({ error: "Database query error" });
            return;
        }

        if (result.length > 0) {
            const row = result[0];

            console.log("Latest row for VehicleNo:", row);

            res.status(200).json({
                row,
                latestDateValue: row.latestDate,
            });
        } else {
            res.status(404).json({ message: "No data found" });
        }
    });
});




// update vehcile_history_data details
router.put('/vehicleHistory/:tripid', (req, res) => {
    const {
        tripid,
        VehicleNo,
        shedouttime,
        reporttime,
        closetime,
        shedintime,
        shedoutdate,
        reportdate,
        closedate,
        shedindate,
        shedoutkm,
        reportkm,
        closekm,
        shedinkm,
        totalkm,
        drivername,
    } = req.body;

    const updatevehicleHistory = {
        tripid,
        VehicleNo,
        shedouttime,
        reporttime,
        closetime,
        shedintime,
        shedoutdate,
        reportdate,
        closedate,
        shedindate,
        shedoutkm,
        reportkm,
        closekm,
        shedinkm,
        totalkm,
        drivername,
    }

    db.query('UPDATE Vehicle_History_Data SET ? WHERE tripid = ?', [updatevehicleHistory, tripid], (err, result) => {
        if (err) {
            console.log(err, "error");
        }
        return res.status(200).json({ message: "Data updated successfully" });
    })
})

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
        vendorparking,
        fuelamount,
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
        Vendor_FULLTotalAmount, TotalTimeWithoutAddHours, Hybriddata, TimeToggleData, VendorTimeToggle, HclMaxConflctdata,
        Hcldatakmvalue } = req.body


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
        vendorparking,
        vendortoll,
        fuelamount,
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
        TotalTimeWithoutAddHours, Hybriddata, TimeToggleData, VendorTimeToggle, HclMaxConflctdata,
        Hcldatakmvalue
    }
    // console.log(updatedCustomerData,"llll")

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

                db.query(`UPDATE booking SET status = '${status}' WHERE bookingno=${tripid};`)
            }
            return res.status(200).json({ message: "Data updated successfully" });
        }
    });
});

// confirm tripsheet details------------------------------------------------
// router.put('/tripsheet-confirm/:tripid', (req, res) => {
//     const tripid = req.params.tripid;
//     const {
//         bookingno,
//         tripsheetdate,
//         status,
//         billingno,
//         apps,
//         customer,
//         orderedby,
//         mobile,
//         guestname,
//         guestmobileno,
//         email,
//         address1,
//         streetno,
//         city,
//         hireTypes,
//         department,
//         vehRegNo,
//         vehType,
//         driverName,
//         mobileNo,
//         driversmsexbetta,
//         gps,
//         duty,
//         pickup,
//         useage,
//         request,
//         shedOutDate,
//         startdate,
//         closedate,
//         shedInDate,
//         totaldays,
//         employeeno,
//         reporttime,
//         starttime,
//         closetime,
//         additionaltime,
//         advancepaidtovendor,
//         customercode,
//         startkm,
//         closekm,
//         shedkm,
//         shedin,
//         shedout,
//         shedintime,
//         permit,
//         parking,
//         toll,
//         vpermettovendor,
//         vendortoll,
//         customeradvance,
//         email1,
//         remark,
//         smsguest,
//         documentnotes,
//         VendorTripNo,
//         vehicles,
//         duty1,
//         startdate1,
//         closedate1,
//         totaldays1,
//         locks,
//         starttime2,
//         closetime2,
//         totaltime,
//         startkm1,
//         closekm1,
//         totalkm1,
//         remark1, escort, minHour, minKM, vehicleName2,
//         calcPackage, extraHR, extraKM, package_amount, extrakm_amount, extrahr_amount, ex_kmAmount, ex_hrAmount, nightBta, nightCount, night_totalAmount, driverBeta, driverbeta_Count, driverBeta_amount, totalcalcAmount,
//         nightThrs,
//         dtc,
//         dtc2,
//         nightThrs2,
//         exkmTkm2,
//         exHrsTHrs2,
//         netamount,
//         vehcommission,
//         caramount1,
//         manualbills,
//         pack,
//         amount5,
//         exkm1,
//         amount6,
//         exHrs1,
//         amount7,
//         night1,
//         amount8,
//         driverconvenience1,
//         amount9,
//         rud,
//         netamount1,
//         discount,
//         ons,
//         manualbills1,
//         balance,
//         fcdate,
//         taxdate,
//         insdate,
//         stpermit,
//         maintenancetype,
//         kilometer,
//         selects,
//         documenttype,
//         on1,
//         smsgust,
//         emailcheck,
//         booker,
//         reload,
//         manualbillss, Groups, transferreport, travelsemail, travelsname, vehileName, orderbyemail } = req.body;

//     const updatedCustomerData = {
//         bookingno,
//         tripsheetdate,
//         status,
//         billingno,
//         apps,
//         customer,
//         orderedby,
//         mobile,
//         guestname,
//         guestmobileno,
//         email,
//         address1,
//         streetno,
//         city,
//         hireTypes,
//         department,
//         vehRegNo,
//         vehType,
//         driverName,
//         mobileNo,
//         driversmsexbetta,
//         gps,
//         duty,
//         pickup,
//         useage,
//         request,
//         shedOutDate,
//         startdate,
//         closedate,
//         shedInDate,
//         totaldays,
//         employeeno,
//         reporttime,
//         starttime,
//         closetime,
//         additionaltime,
//         advancepaidtovendor,
//         customercode,
//         startkm,
//         closekm,
//         shedkm,
//         shedin,
//         shedout,
//         shedintime,
//         permit,
//         parking,
//         toll,
//         vpermettovendor,
//         vendortoll,
//         customeradvance,
//         email1,
//         remark,
//         smsguest,
//         documentnotes,
//         VendorTripNo,
//         vehicles,
//         duty1,
//         startdate1,
//         closedate1,
//         totaldays1,
//         locks,
//         starttime2,
//         closetime2,
//         totaltime,
//         startkm1,
//         closekm1,
//         totalkm1,
//         remark1, escort, minHour, minKM, vehicleName2,
//         calcPackage, extraHR, extraKM, package_amount, extrakm_amount, extrahr_amount, ex_kmAmount, ex_hrAmount, nightBta, nightCount, night_totalAmount, driverBeta, driverbeta_Count, driverBeta_amount, totalcalcAmount,
//         nightThrs,
//         dtc,
//         dtc2,
//         nightThrs2,
//         exkmTkm2,
//         exHrsTHrs2,
//         netamount,
//         vehcommission,
//         caramount1,
//         manualbills,
//         pack,
//         amount5,
//         exkm1,
//         amount6,
//         exHrs1,
//         amount7,
//         night1,
//         amount8,
//         driverconvenience1,
//         amount9,
//         rud,
//         netamount1,
//         discount,
//         ons,
//         manualbills1,
//         balance,
//         fcdate,
//         taxdate,
//         insdate,
//         stpermit,
//         maintenancetype,
//         kilometer,
//         selects,
//         documenttype,
//         on1,
//         smsgust,
//         emailcheck,
//         booker,
//         reload,
//         manualbillss,
//         Groups,
//         transferreport, travelsemail, travelsname, vehileName, orderbyemail
//     };


//     db.query('UPDATE tripsheet SET ? WHERE tripid = ?', [updatedCustomerData, tripid], (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: "Failed to update data in MySQL" });
//         }
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ error: "Customer not found" });
//         }
//         // for BE_closed
//         db.query(`UPDATE tripsheet SET apps='Closed' WHERE tripid=${tripid}`, (err, result) => {
//             if (err) {
//                 return res.status(500).json({ error: 'Failed to update tripsheet details in MySQL' });
//             }
//             return res.status(200).json(result);
//         });
//         return res.status(200).json({ message: "Data updated successfully" });
//     });
// });

// ----chnage collect data-----------------------------------

router.get('/tripsheet-enter/:tripid', async (req, res) => {
    const tripid = req.params.tripid;
    const username = req.query.loginUserName;
    console.log("tripid", tripid, "username", username)

    let data = '';

    if (!username) {
        return res.status(500).json({ error: "username is undefined" })
    }

    let query = 'SELECT * FROM tripsheet WHERE tripid = ? ';

    db.query(query, [tripid], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch permission from MySQL' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Tripsheet not found" });
        }
        if (results.length > 0) {

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
                    await db.query(`SELECT * FROM tripsheet WHERE tripid = ? AND status != "Transfer_Billed" AND status !="Covering_Billed" `, tripid, (err, result) => {
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
                    await db.query(`SELECT * FROM tripsheet WHERE tripid = ? AND department IN (?)  `, [tripid, arryData], (err, result) => {
                        if (err) {
                            return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
                        }
                        if (result.length === 0) {

                            // return res.status(404).json({ error: 'u dont have accesss the page of stations' });
                            return res.status(404).json({ error: 'You Dont Have Accesss To This Tripsheet Based On Service Station' });
                        }
                        else if (result.length > 0) {
                            db.query(`SELECT * FROM tripsheet WHERE tripid = ? AND status != "Transfer_Billed" AND status !="Covering_Billed" AND department IN (?)`, [tripid, arryData], (err, result) => {
                                if (err) {
                                    return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
                                }
                                if (result.length === 0) {
                                    return res.status(404).json({ error: 'status is billed' });
                                }
                                const bookingDetails = result[0];
                                console.log(bookingDetails, "mmmm") // Assuming there is only one matching booking
                                return res.status(200).json(bookingDetails);
                            });
                        }

                    });
                }

            })

        }
    })
})

//   router.get('/tripsheet-enter11/:tripid', async (req, res) => {
//     const tripid = req.params.tripid;
//     const username = req.query.loginUserName;
//     console.log("tripid", tripid, "username", username)

//     let data = '';

//     if (!username) {
//         return res.status(500).json({ error: "username is undefined" })
//     }



//     let query = 'SELECT * FROM tripsheet WHERE tripid = ? ';

//     db.query(query, [userid], (err, results) => {
//       if (err) {
//         return res.status(500).json({ error: 'Failed to fetch permission from MySQL' });
//       }
//       if(results.length === 0){
//         return res.status(404).json({ error: "Tripsheet not found"});
//       }
//       else{
//         if(results.length > 0){

//             db.query("SELECT Stationname FROM usercreation WHERE username=?", [username], async (err, results) => {
//                 if (err) {
//                     return res.status(500).json({ error: "there some issue ffetching station name " })
//                 }

//                 data = await results[0]?.Stationname;

//                 console.log("data", data)
//                 const arryData = data.split(',');
//                 console.log("arryData", arryData)
//                 //------------------------------------------------------------

//                 if (data && data.toLowerCase() === "all" || arryData.includes("ALL")) {
//                     // its for fetch by All
//                     await db.query(`SELECT * FROM tripsheet WHERE tripid = ? `, tripid, (err, result) => {
//                         if (err) {
//                             return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
//                         }
//                         if (result.length === 0) {

//                             return res.status(404).json({ error: 'Booking not found' });
//                         }
//                         const bookingDetails = result[0]; // Assuming there is only one matching booking
//                         return res.status(200).json(bookingDetails);
//                     });
//                 }
//                 else if (arryData) {
//                     await db.query(`SELECT * FROM tripsheet WHERE tripid = ? AND department IN (?)  `, [tripid,arryData], (err, result) => {
//                         if (err) {
//                             return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
//                         }
//                         if (result.length === 0) {

//                             return res.status(404).json({ error: 'u dont have accesss the page of stations' });
//                         }
//                         else if(result.length > 0){
//                             await db.query(`SELECT * FROM tripsheet WHERE tripid = ? AND status != "Transfer_Billed" AND status !="Covering_Billed" AND department IN (?)`, [tripid, arryData], (err, result) => {
//                                 if (err) {
//                                     return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
//                                 }
//                                 if (result.length === 0) {
//                                     return res.status(404).json({ error: 'status is billed' });
//                                 }
//                                 const bookingDetails = result[0];
//                                 console.log(bookingDetails,"mmmm") // Assuming there is only one matching booking
//                                 return res.status(200).json(bookingDetails);
//                             });
//                         }

//                     });

//                 }

//         }
//       }
//     });


// });







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

//             // const placeholders = arryData?.map(() => '?').join(', ');
//             // console.log(placeholders,"place")
//             console.log(arryData)
//             // console.log(data,"adtata")
//             // const queryParams = [tripid, data]
//             // await db.query(`SELECT * FROM tripsheet WHERE tripid = ? AND status != "Transfer_Billed" AND status !="Covering_Billed" AND department IN (${placeholders})`, queryParams, (err, result) => {
//             await db.query(`SELECT * FROM tripsheet WHERE tripid = ? AND status != "Transfer_Billed" AND status !="Covering_Billed" AND department IN (?)`, [tripid, arryData], (err, result) => {
//                 if (err) {
//                     return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
//                 }
//                 if (result.length === 0) {
//                     return res.status(404).json({ error: 'Booking not found' });
//                 }
//                 const bookingDetails = result[0];
//                 console.log(bookingDetails,"mmmm") // Assuming there is only one matching booking
//                 return res.status(200).json(bookingDetails);
//             });
//         } else {
//             return res.status(500).json({ error: 'there is some ISSUE ' });
//         }
//     })
// });

// --------------------------------------------------------------
router.get('/tripsheet-maindash', (req, res) => {
    const { fromDate, toDate, Stations } = req.query;
    console.log(fromDate, "dd", toDate)
    const stationname = Stations?.split(',');
    console.log(stationname, "name")

    db.query(`SELECT * FROM tripsheet where department IN (?) AND tripsheetdate >= DATE_ADD(?, INTERVAL 0 DAY) 
        AND tripsheetdate <= DATE_ADD(?, INTERVAL 0 DAY)`, [stationname, fromDate, toDate], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        console.log(result.length, "len")
        return res.status(200).json(result);
    });
});

router.get('/tripsheet-maindashcuurentdate/:tripsheetdate/:Stations', (req, res) => {
    const tripsheet = req.params.tripsheetdate
    const stations = req.params.Stations
    const stationname = stations?.split(',');
    console.log(stationname, "name")


    db.query('SELECT * FROM tripsheet where department IN (?) AND tripsheetdate = ? ', [stationname, tripsheet], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
        }
        if (result.length === 0) {
            return res.status(200).json(result);
        }
        console.log(result, "cc")
        return res.status(200).json(result);
    });
});
router.get('/tripsheet-maindashcuurentdate', (req, res) => {
    const { toDate, fromDate, station } = req.query;
    const formattedFromDate = moment(fromDate).format('YYYY-MM-DD');
    const formattedToDate = moment(toDate).format('YYYY-MM-DD');
    const stationname = station?.split(',');
    console.log(formattedFromDate, "to", formattedToDate)

    db.query(`SELECT * FROM tripsheet  where department IN (?) AND tripsheetdate >= DATE_ADD(?, INTERVAL 0 DAY) 
        AND tripsheetdate <= DATE_ADD(?, INTERVAL 0 DAY) `, [stationname, formattedFromDate, formattedToDate], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Booking not found' });
        }
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
        // const formattedFromDate = moment(startdate).format('YYYY-MM-DD');
        const formattedFromDate = moment(startdate).format('DD-MM-YYYY');
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
                            <td style="padding: 8px;"><strong>Location </strong></td>
                            <td style="padding: 8px;">${servicestation}</td>
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
    console.log(bookingno, 'booking no');

    db.query("SELECT * FROM tripsheetupload WHERE tripid=? ", [tripid], (err, tripResults) => {
        if (err) {
            return res.status(500).json({ error: "Failed to fetch data from MySQL" });
        }
        const bookingImage = 'SELECT * FROM booking_doc WHERE booking_id=?';

        db.query(bookingImage, [tripid], (err, bookingResults) => {
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

// router.post('/gmappost-submitForm', (req, res) => {
//     const { date, time, tripType, placeName, tripid, latitude, longitude, alpha } = req.body;

//     console.log(latitude, longitude, tripType, placeName, tripid, alpha, 'latt');

//     // Query to check existing waypoints for the given tripid and tripType
//     const getquery = "SELECT * FROM gmapdata WHERE tripid = ? AND trip_type = ?";

//     db.query(getquery, [tripid, tripType], (error, results) => {
//         if (error) {
//             console.error('Database Error:', error);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }
//         console.log(results,'resultsss');

//         if(results.length===0){
//             const insertQuery = "INSERT INTO gmapdata (date, time,Location_Alpha,  trip_type, place_name, tripid,Latitude,Longitude) VALUES (?, ?, ?, ?, ?,?,?,?)";
//             db.query(insertQuery, [date, time, alpha,tripType, placeName, tripid,latitude,longitude], (err, insertResults) => {
//                 if (err) {
//                     return res.status(500).json({ error: 'Internal Server Error' });
//                 }
//                 res.status(200).json({ message: 'Form data submitted successfully' });
//             });
//         }

//         let newAlpha = alpha; // Initialize with the incoming alpha value for start or end

//         if (tripType === 'waypoint') {
//             // Get the existing Location_Alpha values for waypoints
//             const waypointAlphas = results?.map(row => row.Location_Alpha);
//             const latitudePoint = results?.map(row => row.Latitude);
//             const longitudePoint = results?.map(row => row.Longitude);
//             // Find the highest numbered alpha, e.g., "B1", "B2", etc.
//             let maxAlphaNumber = 0;
//             waypointAlphas.forEach(a => {
//                 const match = a.match(/^B(\d+)$/); // Match alphas like "B1", "B2", etc.
//                 if (match) {
//                     const num = parseInt(match[1], 10);
//                     if (num > maxAlphaNumber) {
//                         maxAlphaNumber = num;
//                     }
//                 }
//             });

//             // Increment the alpha number for the new waypoint
//             newAlpha = `B${maxAlphaNumber + 1}`;

//             // Insert the new waypoint record into gmapdata table
//             const insertQuery = `
//                 INSERT INTO gmapdata 
//                 (date, time, Location_Alpha, trip_type, place_name, tripid, Latitude, Longitude) 
//                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//             `;
//             const values = [date, time, newAlpha, tripType, placeName, tripid, latitude, longitude];

//             db.query(insertQuery, values, (err, insertResults) => {
//                 if (err) {
//                     console.error('Database Error:', err);
//                     return res.status(500).json({ error: 'Internal Server Error' });
//                 }

//                 res.status(200).json({ message: 'Waypoint submitted successfully', alpha: newAlpha });
//             });
//         }

//         // Handle the update logic for start or end tripType
//         if (tripType === 'start' || tripType === 'end') {
//             const updateQuery = `
//                 UPDATE gmapdata
//                 SET date = ?, time = ?, place_name = ?, Latitude = ?, Longitude = ?
//                 WHERE tripid = ? AND trip_type = ?
//             `;
//             const updateValues = [date, time, placeName, latitude, longitude, tripid, tripType];

//             db.query(updateQuery, updateValues, (err, updateResults) => {
//                 if (err) {
//                     console.error('Database Update Error:', err);
//                     return res.status(500).json({ error: 'Internal Server Error' });
//                 }

//                 res.status(200).json({ message: `${tripType} trip updated successfully` });
//             });
//         }
//     });
// });

// router.post('/gmappost-submitForm', (req, res) => {
//     const { date, time, tripType, placeName, tripid, latitude, longitude, alpha } = req.body;

//     console.log(latitude, longitude, tripType, placeName, tripid, alpha, 'latt');

//     // Query to check existing waypoints for the given tripid and tripType
//     const getquery = "SELECT * FROM gmapdata WHERE tripid = ? AND trip_type = ?";

//     db.query(getquery, [tripid, tripType], (error, results) => {
//         if (error) {
//             console.error('Database Error:', error);
//             return res.status(500).json({ error: 'Internal Server Error' });
//         }

//         console.log(results, 'resultsss');

//         if (results.length === 0) {
//             // Only insert if no results are found
//             const insertQuery = "INSERT INTO gmapdata (date, time, Location_Alpha, trip_type, place_name, tripid, Latitude, Longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
//             db.query(insertQuery, [date, time, alpha, tripType, placeName, tripid, latitude, longitude], (err, insertResults) => {
//                 if (err) {
//                     return res.status(500).json({ error: 'Internal Server Error' });
//                 }
//                 return res.status(200).json({ message: 'Form data submitted successfully' });
//             });
//         } else {
//             // Handle update logic or waypoint insertion if data exists

//             let newAlpha = alpha; // Initialize with the incoming alpha value for start or end

//             if (tripType === 'waypoint') {
//                 // Handle waypoint logic
//                 const waypointAlphas = results?.map(row => row.Location_Alpha);
//                 const latitudePoint = results?.map(row => row.Latitude);
//                 const longitudePoint = results?.map(row => row.Longitude);

//                 console.log(latitudePoint, longitudePoint, 'checking', latitude, longitude);

//                 // Convert latitude and longitude to strings
//                 const latitudeStr = latitude.toString();
//                 const longitudeStr = longitude.toString();

//                 // Check if the latitude and longitude exist in their respective arrays
//                 const latitudeExists = latitudePoint.some(lat => lat.toString() === latitudeStr);
//                 const longitudeExists = longitudePoint.some(lng => lng.toString() === longitudeStr);

//                 console.log(latitudeExists, longitudeExists, latitudeStr, longitudeStr, 'all values');

//                 // If the latitude and longitude exist, update and stop further execution
//                 if (latitudeExists && longitudeExists) {
//                     const updateQuery = `
//                         UPDATE gmapdata
//                         SET date = ?, time = ?, Latitude = ?, Longitude = ?
//                         WHERE tripid = ? AND Latitude = ? AND Longitude = ?
//                     `;

//                     const updateValues = [date, time, latitudeStr, longitudeStr, tripid, latitudeStr, longitudeStr];

//                     db.query(updateQuery, updateValues, (err, updateResults) => {
//                         if (err) {
//                             console.log('Database Update Error:', err);
//                             return res.status(500).json({ error: 'Internal Server Error' });
//                         }

//                         console.log(updateResults, 'urs');
//                         return res.status(200).json({ message: `${tripType} trip updated successfully` });
//                     });

//                     // Stop further execution since the update is done
//                     return;
//                 }

//                 // Logic for generating a new alpha for the waypoint
//                 let maxAlphaNumber = 0;
//                 waypointAlphas.forEach(a => {
//                     const match = a.match(/^B(\d+)$/); // Match alphas like "B1", "B2", etc.
//                     if (match) {
//                         const num = parseInt(match[1], 10);
//                         if (num > maxAlphaNumber) {
//                             maxAlphaNumber = num;
//                         }
//                     }
//                 });

//                 newAlpha = `B${maxAlphaNumber + 1}`;

//                 // Insert new waypoint if the latitude and longitude don't exist
//                 const insertQuery = `
//                     INSERT INTO gmapdata 
//                     (date, time, Location_Alpha, trip_type, place_name, tripid, Latitude, Longitude) 
//                     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//                 `;
//                 const values = [date, time, newAlpha, tripType, placeName, tripid, latitude, longitude];

//                 db.query(insertQuery, values, (err, insertResults) => {
//                     if (err) {
//                         console.error('Database Error:', err);
//                         return res.status(500).json({ error: 'Internal Server Error' });
//                     }

//                     return res.status(200).json({ message: 'Waypoint submitted successfully', alpha: newAlpha });
//                 });
//             } else if (tripType === 'start' || tripType === 'end') {
//                 // Handle start or end trip update logic
//                 const updateQuery = `
//                     UPDATE gmapdata
//                     SET date = ?, time = ?, place_name = ?, Latitude = ?, Longitude = ?
//                     WHERE tripid = ? AND trip_type = ?
//                 `;
//                 const updateValues = [date, time, placeName, latitude, longitude, tripid, tripType];

//                 db.query(updateQuery, updateValues, (err, updateResults) => {
//                     if (err) {
//                         console.error('Database Update Error:', err);
//                         return res.status(500).json({ error: 'Internal Server Error' });
//                     }

//                     return res.status(200).json({ message: `${tripType} trip updated successfully` });
//                 });
//             }
//         }
//     });
// });

// Delete marker Point by Latitude and Longitude
router.delete('/deleteMapPoint', (req, res) => {
    const { latitude, longitude, tripid } = req.body;
    console.log(latitude, longitude, tripid, 'deletedata');


    // Validate the inputs
    if (!latitude || !longitude || !tripid) {
        return res.status(400).json({ error: 'Invalid request parameters' });
    }

    const deleteQuery = "DELETE FROM gmapdata WHERE Latitude = ? AND Longitude = ? AND tripid = ?";
    const deleteValues = [latitude, longitude, tripid];

    db.query(deleteQuery, deleteValues, (err, deleteResults) => {
        if (err) {
            console.error('Database Delete Error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (deleteResults.affectedRows > 0) {
            return res.status(200).json({ message: 'Map point deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Map point not found' });
        }
    });
});

// get the gmapdata by tripid
router.get('/getGmapdataByTripId/:tripid', (req, res) => {
    const tripid = req.params.tripid;
    const sqlquery = `SELECT * FROM gmapdata WHERE tripid = ?`
    db.query(sqlquery, [tripid], (error, result) => {
        if (error) {
            console.log(error);
        }
        return res.status(200).json(result);

    })
})



router.post('/gmappost-submitForm', (req, res) => {
    const { date, time, Location_Alpha, tripType, placeName, tripid, latitude, longitude, } = req.body;

    console.log(date, time, tripType, placeName, tripid, latitude, longitude, Location_Alpha, 'latt');

    // Query to check existing waypoints for the given tripid and tripType
    const getquery = "SELECT * FROM gmapdata WHERE tripid = ? AND trip_type = ?";

    db.query(getquery, [tripid, tripType], (error, results) => {
        if (error) {
            console.error('Database Error:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        console.log(results, 'resultsss');

        if (results.length === 0) {
            const insertQuery = "INSERT INTO gmapdata (date, time, Location_Alpha, trip_type, place_name, tripid, Latitude, Longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            db.query(insertQuery, [date, time, Location_Alpha, tripType, placeName, tripid, latitude, longitude], (err, insertResults) => {
                if (err) {
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
                return res.status(200).json({ message: 'Form data submitted successfully' });
            });
        } else {

            let newAlpha = Location_Alpha;

            if (tripType === 'waypoint') {
                const waypointAlphas = results?.map(row => row.Location_Alpha);
                const latitudePoint = results?.map(row => row.Latitude);
                const longitudePoint = results?.map(row => row.Longitude);

                console.log(latitudePoint, longitudePoint, 'checking', latitude, longitude);

                // Convert latitude and longitude to strings
                const latitudeStr = latitude.toString();
                const longitudeStr = longitude.toString();

                // Check if the latitude and longitude exist in their respective arrays
                const latitudeExists = latitudePoint.some(lat => lat.toString() === latitudeStr);
                const longitudeExists = longitudePoint.some(lng => lng.toString() === longitudeStr);

                console.log(latitudeExists, longitudeExists, latitudeStr, longitudeStr, 'all values');

                // If the latitude and longitude exist, update and stop further execution
                if (latitudeExists && longitudeExists) {
                    const updateQuery = `
                        UPDATE gmapdata
                        SET date = ?, time = ?, Latitude = ?, Longitude = ?
                        WHERE tripid = ? AND Latitude = ? AND Longitude = ?
                    `;

                    const updateValues = [date, time, latitudeStr, longitudeStr, tripid, latitudeStr, longitudeStr];

                    db.query(updateQuery, updateValues, (err, updateResults) => {
                        if (err) {
                            console.log('Database Update Error:', err);
                            return res.status(500).json({ error: 'Internal Server Error' });
                        }

                        console.log(updateResults, 'urs');
                        return res.status(200).json({ message: `${tripType} trip updated successfully` });
                    });

                    // Stop further execution since the update is done
                    return;
                }

                // Logic for generating a new alpha for the waypoint
                let maxAlphaNumber = 0;
                waypointAlphas.forEach(a => {
                    const match = a.match(/^B(\d+)$/); // Match alphas like "B1", "B2", etc.
                    if (match) {
                        const num = parseInt(match[1], 10);
                        if (num > maxAlphaNumber) {
                            maxAlphaNumber = num;
                        }
                    }
                });

                newAlpha = `B${maxAlphaNumber + 1}`;

                // Insert new waypoint if the latitude and longitude don't exist
                const insertQuery = `
                    INSERT INTO gmapdata 
                    (date, time, Location_Alpha, trip_type, place_name, tripid, Latitude, Longitude) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                `;
                const values = [date, time, Location_Alpha, tripType, placeName, tripid, latitude, longitude];

                db.query(insertQuery, values, (err, insertResults) => {
                    if (err) {
                        console.error('Database Error:', err);
                        return res.status(500).json({ error: 'Internal Server Error' });
                    }

                    return res.status(200).json({ message: 'Waypoint submitted successfully', Location_Alpha: newAlpha });
                });
            } else if (tripType === 'start' || tripType === 'end') {

                const latitudePoint = results?.map(row => row.Latitude);
                const longitudePoint = results?.map(row => row.Longitude);

                console.log(latitudePoint, longitudePoint, 'checking', latitude, longitude);

                const latitudeStr = latitude.toString();
                const longitudeStr = longitude.toString();

                const latitudeExists = latitudePoint.map(lat => lat.toString() === latitudeStr);
                const longitudeExists = longitudePoint.some(lng => lng.toString() === longitudeStr);

                console.log(latitudeExists, longitudeExists, latitudeStr, longitudeStr, 'all values');
                if (latitudeStr !== "") {
                    console.log('Starting deletion and insertion process');

                    // First DELETE query: delete records matching latitude, longitude, and tripType
                    const deleteQuery1 = "DELETE FROM gmapdata WHERE Latitude = ? AND Longitude = ? ";
                    const deleteValues1 = [latitude, longitude];

                    db.query(deleteQuery1, deleteValues1, (err, deleteResults1) => {
                        if (err) {
                            console.error('Database Delete Error for first query:', err);
                            return res.status(500).json({ error: 'Internal Server Error' });
                        }
                        console.log('First deletion successful:', deleteResults1);

                        const deleteQuery2 = "DELETE FROM gmapdata WHERE tripid = ? AND trip_type = ?";
                        const deleteValues2 = [tripid, tripType]; // Replace "another_trip_type" with the specific type you want to delete

                        db.query(deleteQuery2, deleteValues2, (err, deleteResults2) => {
                            if (err) {
                                console.error('Database Delete Error for second query:', err);
                                return res.status(500).json({ error: 'Internal Server Error' });
                            }
                            console.log('Second deletion successful:', deleteResults2);

                            // Insert the new record after both deletions are complete
                            const insertQuery = `
                                INSERT INTO gmapdata (Location_Alpha, date, trip_type, time, place_name, tripid, Latitude, Longitude)
                                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                            `;
                            const insertValues = [Location_Alpha, date, tripType, time, placeName, tripid, latitude, longitude];

                            db.query(insertQuery, insertValues, (err, insertResults) => {
                                if (err) {
                                    console.error('Database Insert Error:', err);
                                    return res.status(500).json({ error: 'Internal Server Error' });
                                }
                                console.log('Insertion successful:', insertResults);

                                return res.status(200).json({ message: `${tripType} trip updated successfully with new data` });
                            });
                        });
                    });
                }



                const updateQuery = `
                    UPDATE gmapdata
                    SET date = ?, time = ?, place_name = ?, Latitude = ?, Longitude = ?
                    WHERE tripid = ? AND trip_type = ?
                `;
                const updateValues = [date, time, placeName, latitude, longitude, tripid, tripType];
                if (latitudeStr === "") {
                    db.query(updateQuery, updateValues, (err, updateResults) => {
                        if (err) {
                            console.error('Database Update Error:', err);
                            return res.status(500).json({ error: 'Internal Server Error' });
                        }

                        return res.status(200).json({ message: `${tripType} trip updated successfully` });
                    });
                }
            }
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

// Delete Map Query
router.post('/deleteMapByTripid/:tripid', (req, res) => {
    const tripid = req.params.tripid;

    // First delete query for mapimage
    const deleteQuery = `DELETE FROM mapimage WHERE tripid = ?`;
    db.query(deleteQuery, [tripid], (error, result) => {
        if (error) {
            console.log(error, 'error');
            return res.status(500).json({ message: 'Error deleting from mapimage', error });
        }

        // Second delete query for gmapdata
        const deleteMapDataQuery = `DELETE FROM gmapdata WHERE tripid = ?`;
        db.query(deleteMapDataQuery, [tripid], (error, result) => {
            if (error) {
                console.log(error, 'error');
                return res.status(500).json({ message: 'Error deleting from gmapdata', error });
            }

            return res.status(200).json({ message: 'Deletion successful', result });
        });
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
    const stations = req.query.stations;

    console.log(totalHours, VehicleName, duty, totkm, OrganizationName, stations, 'rate');

    if (!totalHours || !VehicleName || !duty || !totkm || !OrganizationName || !stations) {
        res.status(400).json({ error: 'Missing required parameters' });
        return;
    }



    // const sql = `SELECT * 
    //                 FROM ratemanagement
    //                 WHERE duty = ?
    //                     AND VehicleName = ?
    //                     AND OrganizationName =?
    //                     AND ((? <= UptoHours AND ? <= UptoKMS) OR UptoHours = (SELECT MAX(UptoHours) FROM ratemanagement WHERE duty = ? AND VehicleName = ? AND OrganizationName =? ))
    //                 ORDER BY UptoHours 
    //                 LIMIT 1;`

    const sql = `SELECT * 
                    FROM ratemanagement
                    WHERE duty = ?
                        AND VehicleName = ?
                        AND OrganizationName =?
                        AND stations = ?
                        AND ((? <= UptoHours AND ? <= UptoKMS) OR UptoHours = (SELECT MAX(UptoHours) FROM ratemanagement WHERE duty = ? AND VehicleName = ? AND OrganizationName =? AND stations = ? ))
                    ORDER BY UptoHours 
                    LIMIT 1;`

    // Execute the query with dynamic parameters 
    db.query(sql, [duty, VehicleName, OrganizationName, stations, totalHours, totkm, duty, VehicleName, OrganizationName, stations], (error, results) => {
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
    const stations = req.query.stations;

    console.log(totalHours, "tt", ratetype, "rate", VehicleName, "name", duty, "duty", totkm, "totkmm", OrganizationName, "organnan", stations)


    if (!totalHours || !VehicleName || !duty || !totkm || !OrganizationName || !ratetype || !stations) {
        res.status(400).json({ error: 'Missing required parameters' });
        return;
    }

    const sql = `SELECT * 
                    FROM ratemanagement
                    WHERE duty = ?
                        AND VehicleName = ?
                        AND OrganizationName =?
                        AND ratetype = ?
                        AND stations = ?
                        AND ((? <= UptoHours AND ? <= UptoKMS) OR UptoHours = (SELECT MAX(UptoHours) FROM ratemanagement WHERE duty = ? AND VehicleName = ? AND OrganizationName =? AND stations = ?))
                    ORDER BY UptoHours 
                    LIMIT 1;`

    // Execute the query with dynamic parameters 
    db.query(sql, [duty, VehicleName, OrganizationName, ratetype, stations, totalHours, totkm, duty, VehicleName, OrganizationName, stations], (error, results) => {

        // Check if any rows were returned
        if (results.length === 0) {
            return res.status(404).json({ error: 'No data found' });
        }

        // Send the fetched row in the response
        console.log(results[0], "supplier", results)
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
// router.get(`/get-CancelTripData/:VehicleNo`, (req, res) => {
//     const vehicleNo = req.params.VehicleNo
//     const status = 'Transfer_Closed';
//     // sql = `select * from tripsheet where vehRegNo=? and (status='Transfer_Closed' ||status='Covering_Closed' ||status='Closed')`

//     sql = `select * from tripsheet where vehRegNo=? and (status='Transfer_Closed' ||status='Covering_Closed' ||status='Closed')`
//     db.query(sql, [vehicleNo, status], (err, result) => {
//         if (err) {
//             console.log("err", err)
//             res.json({ message: "error fetching data", success: false })
//         }

//         if (result) {
//             res.status(200).json(result)
//         }
//     })

// })
router.get(`/get-CancelTripData/:VehicleNo`, (req, res) => {
    const vehicleNo = req.params.VehicleNo
    console.log(vehicleNo)
    // const status = 'Transfer_Closed';
    // sql = `select * from tripsheet where vehRegNo=? and (status='Transfer_Closed' ||status='Covering_Closed' ||status='Closed')`

    sql = `select * from tripsheet where vehRegNo=? and status != "Cancelled"`
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

router.get('/get-CancelTripDatanewdatatry/:VehicleNo', (req, res) => {
    const vehicleNo = req.params.VehicleNo
    console.log(vehicleNo, "nooo")
    // const status = 'Transfer_Closed';
    // sql = select * from tripsheet where vehRegNo=? and (status='Transfer_Closed' ||status='Covering_Closed' ||status='Closed')
    //  sql = `select * from tripsheet where vehRegNo=? and status !='Cancelled' `
    sql = `select * from tripsheet where vehRegNo=? and status !='Cancelled'  and Hybriddata = 0`
    db.query(sql, [vehicleNo], (err, result) => {
        if (err) {
            console.log("err", err)
            res.json({ message: "error fetching data", success: false })
        }
        //   console.log(result.length,"lemmmmmmmmm")
        if (result) {
            res.status(200).json(result)
        }
    })

})

router.get('/get-CancelTripDataforHcl/:VehicleNo', (req, res) => {
    const vehicleNo = req.params.VehicleNo
    console.log(vehicleNo, "nooo")
    // const status = 'Transfer_Closed';
    // sql = select * from tripsheet where vehRegNo=? and (status='Transfer_Closed' ||status='Covering_Closed' ||status='Closed')
    //  sql = `select * from tripsheet where vehRegNo=? and status !='Cancelled' `
    // sql = `SELECT  COALESCE(MAX(Hcldatakmvalue), 0)  AS totalCloseKm  from tripsheet where vehRegNo=? and status !='Cancelled' and  closekm is not null  and closekm != "" and Hybriddata = 1`
    sql = `SELECT tripid, MAX(CAST(Hcldatakmvalue AS UNSIGNED)) AS totalCloseKm
FROM tripsheet
WHERE vehRegNo = ? 
  AND status != 'Cancelled' 
  AND closekm IS NOT NULL 
  AND closekm != "" 
  AND Hybriddata = 1
GROUP BY tripid
ORDER BY totalCloseKm DESC
LIMIT 1`
    // sql = `SELECT  tripid, MAX(CAST(Hcldatakmvalue AS UNSIGNED))  AS totalCloseKm  from tripsheet where vehRegNo=? and status !='Cancelled' and  closekm is not null  and closekm != "" and Hybriddata = 1 GROUP BY tripid`
    db.query(sql, [vehicleNo], (err, result) => {
        if (err) {
            console.log("err", err)
            res.json({ message: "error fetching data", success: false })
        }

        if (result) {
            res.status(200).json(result)
        }
        // console.log(result,"pp","hcl")
    })

})



// Route handler
// router.get('/trip-data/:vehregno', async (req, res) => {
//   const vehregno = req.params.vehregno;

//   const sql1=`
//       SELECT tripid AS shedInDateTripid, shedInDate, shedintime 
//       FROM tripsheet 
//       WHERE vehregno = ? 
//         AND shedInDate IS NOT NULL 
//         AND shedInDate != '' 
//       ORDER BY shedInDate DESC, tripid DESC 
//       LIMIT 1
//     `
// const sq12=`
//       SELECT tripid AS closeDateTripid, closedate, closetime 
//       FROM tripsheet 
//       WHERE vehregno = ? 
//         AND closedate IS NOT NULL 
//         AND closedate != '' 
//       ORDER BY closedate DESC, tripid DESC 
//       LIMIT 1
//     `

//     // Fetch the latest closeda
//     db.query(sql1,[vehregno],(err,results1)=>{
//         if(err){
//             return res.status(404).json({ message: 'No data found for the given vehicle registration number.' });
//         }
//         db.query(sql1,[vehregno],(err,results2)=>{
//             if(err){
//                 console.log(err)
//                 return res.status(404).json({ message: 'No data found for the given vehicle registration number.' });
//             }
//             if(results1.length === 0 && results2.length === 0){
//                 return res.json([]);
//             }
//             else if(results2.length > 0 && results1.length === 0){
//                 return res.json(results2);
//             }
//             else if(results1.length > 0 && results2.length === 0){
//                 return res.json(results2)
//             }
//             else if(results1.length > 0 && results2.length > 0){
//                 if(results1[0].shedInDateTripid === results2[0].closeDateTripid){
//                     return res.json(results1)
//                 }
//                   if(results1[0].shedInDate > results2[0].closedate){
//                     return res.json(results1)
//                   }
//                   if(results2[0].closedate > results1[0].shedInDate){
//                     return res.json(results2)
//                   }
//             }


//         })

//     })




// });

router.get('/trip-data/:vehregno', async (req, res) => {
    const vehregno = req.params.vehregno;
    console.log(vehregno, "veh")

    const sql1 = `
      SELECT tripid AS shedInDateTripid, shedInDate, shedintime 
      FROM tripsheet 
      WHERE vehregno = ? 
        AND shedInDate IS NOT NULL 
        AND shedInDate != '' 
      ORDER BY shedInDate DESC, tripid DESC 
      LIMIT 1
    `;

    const sql2 = `
      SELECT tripid AS closeDateTripid, closedate, closetime 
      FROM tripsheet 
      WHERE vehregno = ? 
        AND closedate IS NOT NULL 
        AND closedate != '' 
      ORDER BY closedate DESC, tripid DESC 
      LIMIT 1
    `;

    try {
        // Execute both queries in parallel
        const [results1, results2] = await Promise.all([
            new Promise((resolve, reject) => db.query(sql1, [vehregno], (err, results) => err ? reject(err) : resolve(results))),
            new Promise((resolve, reject) => db.query(sql2, [vehregno], (err, results) => err ? reject(err) : resolve(results)))
        ]);
        console.log(results1, "shed")
        console.log(results2, "close")

        // If no results are found
        if (results1.length === 0 && results2.length === 0) {
            return res.json([]);
        }

        // If only results2 has data (closeDate)
        if (results1.length === 0 && results2.length > 0) {
            return res.json(results2);
        }

        // If only results1 has data (shedInDate)
        if (results1.length > 0 && results2.length === 0) {
            return res.json(results1);
        }

        // If both results1 and results2 have data
        if (results1.length > 0 && results2.length > 0) {
            // Check if the trip IDs are the same
            if (results1[0].shedInDateTripid === results2[0].closeDateTripid) {
                return res.json(results1);  // You can choose either, they are the same trip
            }

            // Compare dates to return the more recent one
            if (new Date(results1[0].shedInDate) > new Date(results2[0].closedate)) {
                return res.json(results1);
            } else {
                return res.json(results2);
            }
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error fetching trip data.' });
    }
});




router.get('/getvehciledateandtimeconflict/:VehicleNo', (req, res) => {
    const vehicleNo = req.params.VehicleNo
    console.log(vehicleNo, "nooo")
    // const status = 'Transfer_Closed';
    // sql = select * from tripsheet where vehRegNo=? and (status='Transfer_Closed' ||status='Covering_Closed' ||status='Closed')

    sql = `SELECT * FROM tripsheet WHERE vehRegNo = ? ORDER BY shedInDate DESC, tripid DESC LIMIT 1`
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
    const query = 'UPDATE tripsheet SET toll = ?, parking = ?, vendorparking = ?,vendortoll = ? WHERE tripid = ?';

    db.query(query, [toll, parking, toll, parking, tripid], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        res.status(200).json({ message: 'Status updated successfully' });
    });

})

router.get('/customerratenamedata/:customerdata', (req, res) => {
    const customer = req.params.customerdata;
    console.log(customer, "cusssssssssssssssssss")
    db.query('select rateType,TimeToggle,hybrid from customers where customer = ?', [customer], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        console.log(result, "mm")
        res.status(200).json(result);
    })
})

// router.get('/supplierratenamedatastations/:supplierdata', (req, res) => {
//     const supplier = req.params.supplierdata;
//     console.log(supplier, "cusssssssssssssssssss")
//     db.query('select stations from accountinfo where rateType = ?', [supplier], (err, result) => {
//         if (err) {
//             res.status(500).json({ message: 'Internal server error' });
//             return;
//         }
//         console.log(result, "mm")
//         res.status(200).json(result);
//     })
// })
router.get('/Checkstatusandappsclosed/:tripid', (req, res) => {
    const tripid = req.params.tripid;
    console.log(tripid, "cusssssssssssssssssss")
    db.query('select status,apps from tripsheet where tripid = ?', [tripid], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        console.log(result, "mm")
        res.status(200).json(result);
    })
})


// router.get('/regno/:vehino',(req,res)=>{
//     const customer = req.params.vehino;
//     console.log(customer)

//     const sql = `
//     SELECT 
//         GREATEST(
//             MAX(CAST(shedin AS UNSIGNED)),
//             MAX(CAST(shedout AS UNSIGNED)),
//             MAX(CAST(startkm AS UNSIGNED)),
//             MAX(CAST(closekm AS UNSIGNED))
//         ) AS highest_value
//     FROM 
//         tripsheet
//     WHERE 
//         vehRegNo = ?;
// `;


//     db.query(sql, [customer], (err, result) => {
//         if (err) {
//             res.status(500).json({ message: 'Internal server error' });
//             return;
//         }

//         res.status(200).json(result);
//     })

// })


router.post("/signaturelinkExpiredatas", (req, res) => {
    const { tripid, Expired, signExpired, UploadTollExpired, ExpiredUploadpage } = req.body;
    console.log(tripid, Expired, signExpired, UploadTollExpired, ExpiredUploadpage, "signaturlink")

    db.query('select  * from SigntureExpireLink where tripid = ?', [tripid], (err1, result) => {
        if (err1) {
            console.log(err1, "pp11")
            return res.status(500).json({ error: "Failed to insert data into MySQL" });
        }
        if (result.length > 0) {
            db.query('Update SigntureExpireLink set Expired = ? ,signExpired = ?, UploadTollExpired = ? , ExpiredUploadpage = ? where tripid = ? ', [Expired, signExpired, UploadTollExpired, ExpiredUploadpage, tripid], (err2, result) => {
                if (err2) {
                    console.log(err2, "pp222")
                    return res.status(500).json({ error: "Failed to insert data into MySQL" });
                }

                return res.status(200).json({ message: "Data Updated successfully" });
            });
        }
        else {
            db.query('INSERT INTO SigntureExpireLink (tripid,Expired,signExpired,UploadTollExpired,ExpiredUploadpage) values(?,?,?,?,?)', [tripid, Expired, signExpired, UploadTollExpired, ExpiredUploadpage], (err3, result) => {
                if (err3) {
                    console.log(err3, "pp333")
                    return res.status(500).json({ error: "Failed to insert data into MySQL" });
                }

                return res.status(200).json({ message: "Data inserted successfully" });
            });
        }

    });
})




router.get('/getlinkExpireddataExppp/:tripid', (req, res) => {
    const tripid = req.params.tripid;
    console.log(tripid, "cusssssssssssssssssss")
    db.query('select  * from SigntureExpireLink where tripid = ?', [tripid], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        console.log(result, "mm")
        res.status(200).json(result);
    })
})

// get userdetails for loginusers
router.post('/getParticularUserDetails', (req, res) => {
    const { username } = req.body; // Extract username from the request body
    console.log(username, "sqlusername");

    const usernamequery = `SELECT stationname FROM usercreation WHERE username = ?`;
    db.query(usernamequery, [username], (err, result) => {
        if (err) {
            console.log(err, "error");
            return res.status(500).json({ error: "Database error" });
        }
        return res.status(200).json(result);
    });
});


module.exports = router; 