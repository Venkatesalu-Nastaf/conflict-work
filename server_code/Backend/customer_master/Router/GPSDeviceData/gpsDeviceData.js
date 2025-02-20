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

// router.get('/getGpsDeviceDatas', (req, res) => {
//     const {selectedDate} = req.body;
//     const sqlQuery = `
//         SELECT 
//             lattitude, 
//             longitude, 
//             todayDate AS TripDate
//         FROM gpsdevice_datas g
//         WHERE EXISTS (
//             SELECT 1 FROM VehicleTripDetails v 
//             WHERE v.Running_Date = g.todayDate
//         );
//     `;

//     db.query(sqlQuery, (error, result) => {
//         if (error) {
//             console.error("Database Query Error:", error);
//             return res.status(500).json({ error: "Database query error" });
//         }
// console.log(result,"uuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");

//         res.status(200).json(result);
//     });
// });

// get all gpsDatas from gpsdevice_datas
router.post('/particularGpsRecords', (req, res) => {
    const { selectedDate, vehicleNumber } = req.body; // If coming from query parameters, use req.query. Otherwise, use req.body.
    console.log(selectedDate, "filterrrrrrrrrrrrrrrrrrrrr", vehicleNumber);
    const sqlQuery = `SELECT * FROM  VehicleTripDetails WHERE Running_Date = ? AND Vehicle_No = ?`;
    db.query(sqlQuery, [selectedDate, vehicleNumber], (error, result) => {
        if (error) {
            console.log(error, "error");
        }
        console.log(result, "particularrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");

        res.status(200).json(result);

    })

})

router.post('/getAllVehicleCurrentLocation', (req, res) => {
    // const todayDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    // console.log("Today's Date:", todayDate);
    const today = new Date();

    const todayDate = today.toLocaleDateString('en-CA'); // 'en-CA' ensures YYYY-MM-DD format
    console.log("Today's Date:", todayDate);
    const sqlQuery = `SELECT * FROM VehicleTripDetails WHERE Running_Date =?`;
    db.query(sqlQuery, [todayDate], (error, result) => {
        if (error) {
            console.log(error, "error");
        }
        // console.log(result,"all vehicle lists....");

        res.status(200).json(result);
    })
})

// router.post('/getGpsDeviceDatas', (req, res) => {
//     const { selectedDate } = req.body; // If coming from query parameters, use req.query. Otherwise, use req.body.
//     console.log(selectedDate, "filterrrrrrrrrrrrrrrrrrrrr");

//     if (!selectedDate) {
//         return res.status(400).json({ error: "selectedDate is required" });
//     }

//     const sqlQuery = `
//     SELECT 
//         g.lattitude, 
//         g.longitude, 
//         g.todayDate AS TripDate,
//         COALESCE(v.Trip_Status, 'Unknown') AS Trip_Status
//     FROM gpsdevice_datas g
//     LEFT JOIN VehicleTripDetails v 
//         ON v.Running_Date = g.todayDate
//         AND v.Lattitude_loc = g.lattitude
//     WHERE g.todayDate = ?;
// `;



//     db.query(sqlQuery, [selectedDate], (error, result) => {
//         if (error) {
//             console.error("Database Query Error:", error);
//             return res.status(500).json({ error: "Database query error" });
//         }

//         console.log(result, "uuuuuuuuuuuuuuuuuuuuuuuuuuuuuu");

//         res.status(200).json(result);
//     });
// });


module.exports = router;