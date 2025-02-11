const express = require('express');
const router = express.Router();
const db = require('../../../db');

// router.get('/getGpsDeviceDatas', (req, res) => {
//     const sqlQuery1 = `SELECT * FROM VehicleAccessLocation`;
//     const sqlQuery2 = `SELECT * FROM gpsdevice_datas`;

//     // Execute both queries concurrently
//     Promise.all([
//         new Promise((resolve, reject) => {
//             db.query(sqlQuery1, (error, result) => {
//                 if (error) reject(error);
//                 resolve(result);
//             });
//         }),
//         new Promise((resolve, reject) => {
//             db.query(sqlQuery2, (error, result) => {
//                 if (error) reject(error);
//                 resolve(result);
//             });
//         })
//     ])
//     .then(([vehicleAccessData, gpsDeviceData]) => {
//         console.log(vehicleAccessData,"vvvvvvvvvvvvvvvvvvvvvvvv",gpsDeviceData);

//         res.status(200).json({
//             VehicleAccessLocation: vehicleAccessData,
//             GpsDeviceDatas: gpsDeviceData
//         });
//     })
//     .catch(error => {
//         console.error("Database Query Error:", error);
//         res.status(500).json({ error: "Database query error" });
//     });
// });

router.get('/getGpsDeviceDatas', (req, res) => {
    const sqlQuery = `
        SELECT 
            lattitude, 
            longitude, 
            todayDate AS TripDate
        FROM gpsdevice_datas g
        WHERE EXISTS (
            SELECT 1 FROM VehicleTripDetails v 
            WHERE v.Running_Date = g.todayDate
        );
    `;

    db.query(sqlQuery, (error, result) => {
        if (error) {
            console.error("Database Query Error:", error);
            return res.status(500).json({ error: "Database query error" });
        }
console.log(result,"uuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");

        res.status(200).json(result);
    });
});



module.exports = router;