const express = require('express');
const router = express.Router();
const db = require('../../../db');
const moment = require('moment');

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
// router.post('/particularGpsRecords', (req, res) => {
//     const { selectedDate, vehicleNumber } = req.body; 
//     console.log(selectedDate, "filterrrrrrrrrrrrrrrrrrrrr", vehicleNumber);
//     const sqlQuery = `SELECT * FROM  VehicleTripDetails WHERE Running_Date = ? AND Vehicle_No = ?`;
//     db.query(sqlQuery, [selectedDate, vehicleNumber], (error, result) => {
//         if (error) {
//             console.log(error, "error");
//         }
//         console.log(result, "particularrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");

//         res.status(200).json(result);

//     })

// })

// router.post('/particularGpsRecords', (req, res) => {
//     const { selectedDate, vehicleNumber } = req.body; 
//     console.log(selectedDate, "filterrrrrrrrrrrrrrrrrrrrr", vehicleNumber);
//     const sqlQuery = `SELECT * FROM   VehicleAccessLocation WHERE Runing_Date = ? AND Vehicle_No = ?`;
//     db.query(sqlQuery, [selectedDate, vehicleNumber], (error, result) => {
//         if (error) {
//             console.log(error, "error");
//         }
//         console.log(result, "particularrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");

//         res.status(200).json(result);

//     })

// })

router.post('/particularGpsRecords', (req, res) => {
    const { selectedDate, vehicleNumber, selectedTripiddata } = req.body;
    // console.log(selectedDate, "filterrrrrrrrrrrrrrrrrrrrr", vehicleNumber,selectedTripiddata);
    const formattedStartDate = moment(selectedDate).format('YYYY-MM-DD');
    console.log(selectedDate, "filterrrrrrrrrrrrrrrrrrrrr", vehicleNumber, selectedTripiddata, formattedStartDate);

    // const Trip_Status = ["Start", "Riding", "Reached_end"];
    // const sqlQuery = `SELECT * FROM VehicleAccessLocation 
    //                   WHERE Runing_Date = ? 
    //                   AND Vehicle_No = ? 
    //                   AND Trip_Status IN (?) order by veh_id`;
    const sqlQuery = `SELECT * FROM VehicleAccessLocation 
                      WHERE Runing_Date = ? 
                      AND Vehicle_No = ? 
                      ANd Trip_id = ?
                       AND Trip_Status IN ('Started','On_Going','Reached','waypoint') 
                      ORDER BY veh_id `;


    db.query(sqlQuery, [formattedStartDate, vehicleNumber, selectedTripiddata], (error, result) => {
        if (error) {
            console.log(error, "error");
            return res.status(500).json({ error: "Database error" });
        }
        console.log(result, "particularrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");

        res.status(200).json(result);
    });
});

router.post('/getAlladddateandtripid', (req, res) => {
    // const todayDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    // console.log("Today's Date:", todayDate);
    const { selectedDate, vehicleNumber } = req.body;
    const formattedStartDate = moment(selectedDate).format('YYYY-MM-DD');

    console.log("Today's Date:alllladtaaa", vehicleNumber, formattedStartDate);
    const sqlQuery = `SELECT Distinct Trip_id FROM VehicleAccessLocation WHERE Runing_Date =?  AND Vehicle_No = ?  AND Trip_Status  IN ('Reached')   `;
    db.query(sqlQuery, [formattedStartDate, vehicleNumber], (error, result) => {
        if (error) {
            console.log(error, "error");
        }
        console.log(result, "Today vehicle lists....");
        if (result.length > 0) {
            const formattedResult = result.map(row => ({
                Trip_id: String(row.Trip_id) // Convert to string
            }));
            return res.status(200).json(formattedResult);
        }

        res.status(200).json(result);
    })
})

// router.post('/getTodayVehiclePoints', (req, res) => {
router.post('/getAllVehicleCurrentLocation', (req, res) => {
    // const todayDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    // console.log("Today's Date:", todayDate);
    const today = new Date();

    const todayDate = today.toLocaleDateString('en-CA');
    console.log("Today's Date:", todayDate);
    const sqlQuery = `SELECT * FROM VehicleAccessLocation WHERE Runing_Date =?`;
    db.query(sqlQuery, [todayDate], (error, result) => {
        if (error) {
            console.log(error, "error");
        }
        console.log(result, "Today vehicle lists....");

        res.status(200).json(result);
    })
})

router.post('/getTodayVehiclePoints', (req, res) => {
    const today = new Date();
    const todayDate = today.toLocaleDateString('en-CA');
    console.log("Today's Date:", todayDate);

    // Query to get the full row with the latest created_at timestamp for each Vehicle_No
    const sqlQuery = `
        SELECT v.*
        FROM VehicleAccessLocation v
        INNER JOIN (
            SELECT Vehicle_No, MAX(created_at) AS max_time
            FROM VehicleAccessLocation
            WHERE Runing_Date = ?
            GROUP BY Vehicle_No
        ) latest 
        ON v.Vehicle_No = latest.Vehicle_No 
        AND v.created_at = latest.max_time
        WHERE v.Runing_Date = ?;
    `;

    db.query(sqlQuery, [todayDate, todayDate], (error, result) => {
        if (error) {
            console.log(error, "error");
            return res.status(500).json({ error: "Database query error" });
        }

        res.status(200).json(result);
    });
});


const axios = require('axios');

const GOOGLE_MAPS_API_KEY = 'AIzaSyCn47dR5-NLfhq0EqxlgaFw8IEaZO5LnRE'; // Replace with your API key

async function getAddressFromLatLng(lat, lng) {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
                latlng: `${lat},${lng}`,
                key: GOOGLE_MAPS_API_KEY
            }
        });

        if (response.data.status === 'OK' && response.data.results.length > 0) {
            return response.data.results[0].formatted_address;
        } else {
            return 'Address not found';
        }
    } catch (error) {
        console.error('Error fetching address:', error);
        return 'Address lookup failed';
    }
}

router.get('/getLatLongByTripId', async (req, res) => {
    const { gpsTripId } = req.query;

    if (!gpsTripId) {
        return res.status(400).json({ error: "gpsTripId is required" });
    }

    const sqlgmapdataQuery = `SELECT * FROM gmapdata WHERE tripid = ?`;
    const sqlQueryCheckReached = `SELECT COUNT(*) AS reachedCount FROM VehicleAccessLocation WHERE Trip_id = ? AND Trip_Status = 'Reached'`;
    const sqlQueryAllStatuses = `
    SELECT * FROM VehicleAccessLocation 
    WHERE Trip_id = ? 
    AND Trip_Status IN ('Started', 'Reached', 'On_Going','waypoint','waypoint_Started','waypoint_Reached') 
    ORDER BY veh_id ASC`;

    db.query(sqlgmapdataQuery, [gpsTripId], (error, gmapResult) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (gmapResult.length > 0) {
            return res.status(200).json(gmapResult);
        }

        db.query(sqlQueryCheckReached, [gpsTripId], (error, reachedResult) => {
            if (error) {
                console.log("Database query error:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            const reachedCount = reachedResult[0]?.reachedCount || 0;
            if (reachedCount > 0) {
                db.query(sqlQueryAllStatuses, [gpsTripId], async (error, allStatusesResult) => {
                    if (error) {
                        console.log("Database query error:", error);
                        return res.status(500).json({ error: "Internal Server Error" });
                    }

                    // Process data before inserting
                    const insertValues = await Promise.all(allStatusesResult.map(async row => {
                        let location_alpha = '';
                        let trip_type = '';
                        console.log(row, 'rrrrrrrrrrrrrrrrrrr=================');

                        if (row.Trip_Status === 'Started') {
                            location_alpha = 'A';
                            trip_type = 'start';
                        } else if (row.Trip_Status === 'On_Going') {
                            location_alpha = 'NULL';
                            trip_type = 'On_Going';
                        }
                        else if (row.Trip_Status === 'waypoint') {
                            location_alpha = 'NULL';
                            trip_type = 'On_Going';
                        }
                        else if (row.Trip_Status === 'waypoint_Started ')  {
                            console.log('rrrrrrrrrrrrrrrrrrrrrrr', row.Trip_Status);

                            location_alpha = 'B';
                            trip_type = 'waypoint';
                        } 
                        else if (row.Trip_Status === 'waypoint_Reached ')  {
                            console.log('rrrrrrrrrrrrrrrrrrrrrrr', row.Trip_Status);

                            location_alpha = 'B';
                            trip_type = 'waypoint';
                        } 
                        else if (row.Trip_Status === 'Reached') {
                            location_alpha = 'C';
                            trip_type = 'end';
                        }

                        const formattedTime = row.Tripstarttime ? row.Tripstarttime.substring(0, 5) : null;
                        const address = await getAddressFromLatLng(row.Latitude_loc, row.Longtitude_loc); // Get address

                        return [
                            row.Trip_id, location_alpha, row.Runing_Date, formattedTime,
                            trip_type, address, row.Latitude_loc, row.Longtitude_loc
                        ];
                    }));

                    console.log(insertValues, "insertvalues gmapdata");

                    const sqlInsertGmapdataQuery = `
                        INSERT INTO gmapdata (tripid, Location_Alpha, date, time, trip_type, place_name, Latitude, Longitude)
                        VALUES ?`;

                    db.query(sqlInsertGmapdataQuery, [insertValues], (error, insertResult) => {
                        if (error) {
                            console.log("Database insert error:", error);
                            return res.status(500).json({ error: "Internal Server Error" });
                        }
                        console.log("Inserted rows:", insertResult.affectedRows);
                        res.status(200).json({ message: "Data inserted successfully", insertedRows: insertResult.affectedRows });
                    });
                });
            } else {
                res.status(200).json([]);
            }
        });
    });
});

// get lat and long by Tripid
router.get('/appLatLongDetailsByTripId', (req, res) => {
    const { gpsTripId } = req.query;

    if (!gpsTripId) {
        return res.status(400).json({ error: "Trip ID is required" });
    }

    const sqlQuery = `SELECT * FROM VehicleAccessLocation 
                      WHERE Trip_Status IN ( "Started","On_Going", "waypoint","waypoint_Started","waypoint_Reached","Reached") 
                      AND Trip_id = ?`;

    db.query(sqlQuery, [gpsTripId], (error, result) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        console.log(result,"]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]");
        
        return res.status(200).json(result);
    });
});

router.get('/allLatLongDetailsByTripId', (req, res) => {
    const { gpsTripId } = req.query;

    if (!gpsTripId) {
        return res.status(400).json({ error: "Trip ID is required" });
    }

    const sqlQuery = `SELECT * FROM VehicleAccessLocation 
                      WHERE Trip_Status IN ( "Started","On_Going", "waypoint","Reached") 
                      AND Trip_id = ?`;

    db.query(sqlQuery, [gpsTripId], (error, result) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.status(200).json(result);
    });
});



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