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
        // console.log(result, "particularrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");

        res.status(200).json(result);
    });
});

// router.post('/getAlladddateandtripid', (req, res) => {

//     const { selectedDate, vehicleNumber } = req.body;
//     const formattedStartDate = moment(selectedDate).format('YYYY-MM-DD');

//     console.log("Today's Date:alllladtaaa", vehicleNumber, formattedStartDate);
//     const sqlQuery = `SELECT Distinct Trip_id FROM VehicleAccessLocation WHERE Runing_Date =?  AND Vehicle_No = ?  AND Trip_Status  IN ('Reached')   `;
//     db.query(sqlQuery, [formattedStartDate, vehicleNumber], (error, result) => {
//         if (error) {
//             console.log(error, "error");
//         }
//         console.log(result, "Today vehicle lists....");
//         if (result.length > 0) {
//             const formattedResult = result.map(row => ({
//                 Trip_id: String(row.Trip_id) // Convert to string
//             }));
//             return res.status(200).json(formattedResult);
//         }

//         res.status(200).json(result);
//     })
// })

router.post('/getAlladddateandtripid/:hybrid', (req, res) => {

    const hybrid = req.params.hybrid;
    // console.log(hybrid, "hybrid");

    const { selectedDate, vehicleNumber } = req.body;
    const formattedStartDate = moment(selectedDate).format('YYYY-MM-DD');
    // console.log(selectedDate,"selectded date");


    // console.log("pljToday's Date:alllladtaaa", vehicleNumber, formattedStartDate);
    const sqlHybridQuery = `SELECT  V.Trip_id FROM
                            VehicleAccessLocation V LEFT JOIN 
                            tripsheet T ON T.tripid = V.Trip_id WHERE V.Runing_Date =?
                            AND V.Vehicle_NO=? AND V.Trip_Status = 'Reached' AND T.Hybriddata = 1`;

    // const sqlQuery = `SELECT Trip_id FROM VehicleAccessLocation WHERE Runing_Date =?  AND Vehicle_No = ?  AND Trip_Status  IN ('Reached')   `;

    const sqlQuery = `SELECT DISTINCT V.Trip_id FROM
                            VehicleAccessLocation V LEFT JOIN 
                            tripsheet T ON T.tripid = V.Trip_id WHERE V.Runing_Date =?
                            AND V.Vehicle_NO=? AND V.Trip_Status = 'Reached' AND T.tripid IS NOT NULL`;

    if (hybrid === "Hybrid_Customer") {

        db.query(sqlHybridQuery, [formattedStartDate, vehicleNumber], (err, results) => {
            if (err) {
                // console.log(err, "errrrrrrrrr");

                return res.status(500).json({ error: "Database Error" })
            }
            // console.log(results,"filreee")
             
            if (results) {
                if (results.length > 0) {
                    const formattedResult = results.map(row => ({
                        Trip_id: String(row.Trip_id)
                    }));
                    // console.log(formattedResult,"fil")
                    // console.log(results,"filtertrip");
                    
                    return res.status(200).json(formattedResult)
                }
                else{
                    // console.log(results,"fillllllllllllllllllllll")
                    return res.status(200).json(results);
                }
            }
            else {
                // console.log(results,"filtripiddd");
            
                return res.status(200).json(results);
            }
        })
    }
    else {
        db.query(sqlQuery, [formattedStartDate, vehicleNumber], (error, result) => {
            if (error) {
                console.log(error, "error");
            }
            // console.log(result, "pljToday vehicle lists....");
            if (result) {
                if (result.length > 0) {
                    const formattedResult = result.map(row => ({
                        Trip_id: String(row.Trip_id) // Convert to string
                    }));
                    // console.log(formattedResult, "fiplj")
                    return res.status(200).json(formattedResult);
                }
                else {
                    // console.log(result,"checkinggggg");     
                  return res.status(200).json(result)
                }
            } else {
                // console.log(result, "trippppppp");
                
               return res.status(200).json(result);
            }
        });
    }

});

router.post('/gettripbasedmapdetails', (req, res) => {
    //   console.log(req.body,"ccccccccccc")
    const { tripid } = req.body;
    // console.log(tripid,"cc")
    // const formattedStartDate = moment(selectedDate).format('YYYY-MM-DD');

    // console.log("Today's Date:alllladtaaa", vehicleNumber, formattedStartDate);
    const sqlQuery = `SELECT tripid,Groups,vehRegNo,vehicleName FROM tripsheet WHERE tripid = ?   `;
    const sqlquery2 = `SELECT fueltype FROM vehicleinfo WHERE vehRegNo = ?   `;
    db.query(sqlQuery, [tripid], (error, result) => {
        if (error) {
            console.log(error, "error");
        }
        // console.log(result, "Today vehicle lists....");
        const vehdata = result[0]?.vehRegNo;
        db.query(sqlquery2, [vehdata], (error, result2) => {
            if (error) {
                console.log(error, "error");
            }
            if (result2.length > 0) {

                const mergedArray = result.map((obj, index) => {
                    return { ...obj, ...result2[index] };
                });
                return res.status(200).json(mergedArray);
            }
            console.log(result, "Today vehicle lists....");


            return res.status(200).json(result);




            // res.status(200).json(result);
        })
    })
})

// router.post('/getTodayVehiclePoints', (req, res) => {
router.post('/getAllVehicleCurrentLocation', (req, res) => {
    // const todayDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    // console.log("Today's Date:", todayDate);
    const today = new Date();

    const todayDate = today.toLocaleDateString('en-CA');
    const formattedStartDate = moment(todayDate).format('YYYY-MM-DD');
    console.log("Today's Date:", formattedStartDate, todayDate);
    const sqlQuery = `SELECT * FROM VehicleAccessLocation WHERE Runing_Date =?`;
    db.query(sqlQuery, [formattedStartDate], (error, result) => {
        if (error) {
            console.log(error, "error");
        }
        // console.log(result, "Today vehicle lists....");

        res.status(200).json(result);
    })
})

// router.post('/getTodayVehiclePoints', (req, res) => {
//     const today = new Date();
//     const todayDate = today.toLocaleDateString('en-CA');
//     const formattedStartDate = moment(todayDate).format('YYYY-MM-DD');
//     console.log("Today's Date:", formattedStartDate, todayDate);


//     // Query to get the full row with the latest created_at timestamp for each Vehicle_No
//     const sqlQuery = `
//         SELECT v.*
//         FROM VehicleAccessLocation v
//         INNER JOIN (
//             SELECT Vehicle_No, MAX(created_at) AS max_time
//             FROM VehicleAccessLocation
//             WHERE Runing_Date = ?
//             GROUP BY Vehicle_No
//         ) latest 
//         ON v.Vehicle_No = latest.Vehicle_No 
//         AND v.created_at = latest.max_time
//         WHERE v.Runing_Date = ?;
//     `;

//     db.query(sqlQuery, [formattedStartDate, formattedStartDate], (error, result) => {
//         if (error) {
//             console.log(error, "error");
//             return res.status(500).json({ error: "Database query error" });
//         }

//         res.status(200).json(result);
//     });
// });
router.post('/getTodayVehiclePoints', (req, res) => {
    const today = new Date();
    const todayDate = today.toLocaleDateString('en-CA');
    const formattedStartDate = moment(todayDate).format('YYYY-MM-DD');
    // console.log("Today's Dateee:", formattedStartDate, todayDate);

    const hybrid = req.body.hybrid;
    // console.log(hybrid, "hybrid getTodayVehiclePointss");

    // const formattedStartDate = '2025-03-18';
    // console.log("Hardcoded Test Date:", formattedStartDate);

    // Query to get the full row with the latest created_at timestamp for each Vehicle_No
    // const sqlQueryAll = `
    //     SELECT v.*
    //     FROM VehicleAccessLocation v
    //     INNER JOIN (
    //         SELECT Vehicle_No, MAX(created_at) AS max_time
    //         FROM VehicleAccessLocation
    //         WHERE Runing_Date = ? and Vehicle_No !== ""
    //         GROUP BY Vehicle_No
    //     ) latest 
    //     ON v.Vehicle_No = latest.Vehicle_No 
    //     AND v.created_at = latest.max_time
    //     WHERE v.Runing_Date = ?;
    // `;


    const sqlQueryAll = `
                            SELECT v.*
                    FROM VehicleAccessLocation v
                    INNER JOIN (
                        SELECT Vehicle_No, MAX(created_at) AS max_time
                        FROM VehicleAccessLocation
                        WHERE Runing_Date = ?
                        AND Vehicle_No IS NOT NULL
                        AND Vehicle_No <> ''
                        GROUP BY Vehicle_No
                    ) latest 
                    ON v.Vehicle_No = latest.Vehicle_No 
                    AND v.created_at = latest.max_time
                    WHERE v.Runing_Date = ?;`;

    const sqlQuery = 
                            `SELECT v.*
                            FROM VehicleAccessLocation v
                            INNER JOIN (
                                SELECT Vehicle_No, MAX(created_at) AS max_time
                                FROM VehicleAccessLocation
                                WHERE Runing_Date = ?
                                AND Vehicle_No IS NOT NULL
                                AND Vehicle_No <> ''
                                GROUP BY Vehicle_No
                            ) latest 
                            ON v.Vehicle_No = latest.Vehicle_No 
                            AND v.created_at = latest.max_time
                            INNER JOIN tripsheet t
                            ON v.trip_id = t.tripid
                            WHERE v.Runing_Date = ?
                            AND t.Hybriddata = 1;
                        `;
    if (hybrid === "Hybrid_Customer") {
        db.query(sqlQuery, [formattedStartDate, formattedStartDate], (error, result) => {
            if (error) {
                // console.log(error, "error for hybriddatasssss");
                return res.status(500).json({ error: "Database query error" });
            }
            // console.log(result, "valuess for backend hybrid");


            res.status(200).json(result);
        });
    } else {
        db.query(sqlQueryAll, [formattedStartDate, formattedStartDate], (err, results) => {
            if (err) {
                return res.status(500).json({ error: "Database Error" })
            }
            else {
                // console.log(results, "Non hybrid");

                return res.status(200).json(results)
            }
        })

    }

});


const axios = require('axios');

const GOOGLE_MAPS_API_KEY = 'AIzaSyCn47dR5-NLfhq0EqxlgaFw8IEaZO5LnRE';

let count = 0

async function getAddressFromLatLng(lat, lng) {
    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            // httpsAgent: agent,
            // params: {
            //   latlng: `${lat},${lng}`,
            //   key: GOOGLE_MAPS_API_KEY
            // },
            // timeout: 500000
            params: {
                latlng: `${lat},${lng}`,
                key: GOOGLE_MAPS_API_KEY
            }
        });

        if (response.data.status === 'OK' && response.data.results.length > 0) {
            // console.log(response.data.status, "formatteddddddddddddddddddddd", response.data.results.length)
            // console.log("formatteddddddddddddd", response.data.results[0], "formatteddddddddddd",);
            // console.log(response.data.results[0].formatted_address, "formattteddddddddddddddddddd");
            // console.log(count++,"pppppppppppppppppppppppppppppppppppp")
            return response.data.results[0].formatted_address;
        }
        if (response.data.status === 'OVER_QUERY_LIMIT') {
            console.warn("Reached Google Geocoding API rate limit.", response.data.status);
            return 'Address not found';
        } else {
            return 'Address not found';
        }
    } catch (error) {
        // console.error('Error fetching address:', error);
        return 'Address lookup failed';
    }
}


router.get('/getLatLongByTripId', async (req, res) => {
    const { gpsTripId } = req.query;
    console.log(gpsTripId, "gpsTripId");

    if (!gpsTripId) {
        return res.status(400).json({ error: "gpsTripId is required" });
    }
    const filterSqlCheckQuery = `SELECT * FROM gmapdata WHERE trip_type="start" AND tripid =?`;
    const sqlgmapdataQuery = `SELECT * FROM gmapdata WHERE tripid = ?`;
    // const sqlQueryCheckReached = `SELECT COUNT(*) AS reachedCount FROM VehicleAccessLocation WHERE Trip_id = ? AND Trip_Status = 'Reached' `;
    const sqlQueryCheckReached = `
    SELECT COUNT(*) AS reachedCount 
    FROM VehicleAccessLocation 
    WHERE Trip_id = ? AND Trip_Status = 'Reached' AND gps_status IS NULL
  `;
    // const sqlQueryAllStatuses = `
    // SELECT * FROM VehicleAccessLocation 
    // WHERE Trip_id = ? 
    // AND Trip_Status IN ('Started', 'Reached', 'On_Going','waypoint','waypoint_Started','waypoint_Reached') 
    // ORDER BY veh_id ASC`;
    const sqlQueryAllStatuses = `
    SELECT * FROM VehicleAccessLocation 
    WHERE Trip_id = ? 
    AND Trip_Status IN ('Started', 'Reached', 'On_Going') 
    ORDER BY veh_id ASC`;

    db.query(sqlgmapdataQuery, [gpsTripId], (error, gmapResult) => {
        if (error) {
            console.log("Database query error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // console.log("gmapresultttttttttttttttttttttttttttlengthhhhhhhhhhhhhhhhhhhhh", gmapResult.length);

        if (gmapResult.length > 0) {
            // console.log(gmapResult, "gmapresultttttttttttttttttttttttttttinnnnnnnnnnnnnnnnnnnnnnnnnnn");

            return res.status(200).json(gmapResult);
        }
        if (gmapResult.length === 0) {

            db.query(sqlQueryCheckReached, [gpsTripId], (error1, reachedResult) => {
                if (error1) {
                    // console.log("Database query error:", error);
                    return res.status(500).json({ error: "Internal Server Error" });
                }

                const reachedCount = reachedResult[0]?.reachedCount || 0;
                console.log(reachedCount, "reached counttttttttttttttttttttttttt", reachedResult);

                if (reachedCount > 0) {
                    db.query(sqlQueryAllStatuses, [gpsTripId], async (error2, allStatusesResult) => {
                        if (error2) {
                            // console.log("Database query error:", error);
                            return res.status(500).json({ error: "Internal Server Error" });
                        }

                        //     const totalOnGoing = allStatusesResult
                        //     .map((row, index) => ({ ...row, originalIndex: index })) 
                        //     .filter(row => row.Trip_Status === 'On_Going');

                        // const waypointsCount = 8;
                        // let selectedWaypointsIndexes = [];


                        // // if (totalOnGoing.length >= waypointsCount) {
                        // //     const step = Math.floor(totalOnGoing.length / waypointsCount);

                        // //     for (let i = 0; i < waypointsCount; i++) {
                        // //         selectedWaypointsIndexes.push(totalOnGoing[i * step].originalIndex);
                        // //     }
                        // // }
                        // if (totalOnGoing.length <= waypointsCount) {
                        //     // If 8 or less, pick all their indexes
                        //     selectedWaypointsIndexes = totalOnGoing.map(row => row.originalIndex);
                        //   } else {
                        //     // If more than 8, pick in steps
                        //     const step = Math.floor(totalOnGoing.length / waypointsCount);
                        //     console.log(step,"steppppppppppppppppppp",);

                        //     for (let i = 0; i < waypointsCount; i++) {
                        //       selectedWaypointsIndexes.push(totalOnGoing[i * step].originalIndex);
                        //     }
                        //   }

                        // const insertValues = await Promise.all(allStatusesResult.map(async (row, index) => {
                        //     let location_alpha = '';
                        //     let trip_type = '';
                        //     let address;
                        //     if (row.Trip_Status === 'Started') {
                        //         location_alpha = 'A';
                        //         trip_type = 'start';
                        //         address = await getAddressFromLatLng(row.Latitude_loc, row.Longtitude_loc);
                        //     } else if (row.Trip_Status === 'On_Going') {
                        //         if (selectedWaypointsIndexes.includes(index)) {
                        //             location_alpha = 'B';  // Mark as waypoint
                        //             trip_type = 'waypoint';
                        //             address = await getAddressFromLatLng(row.Latitude_loc, row.Longtitude_loc);
                        //         } else {
                        //             location_alpha = 'NULL';
                        //             trip_type = 'On_Going';
                        //         }
                        //     } else if (row.Trip_Status === 'Reached') {
                        //         location_alpha = 'C';
                        //         trip_type = 'end';
                        //       address = await getAddressFromLatLng(row.Latitude_loc, row.Longtitude_loc);

                        //     }

                        //     const formattedTime = row.Tripstarttime ? row.Tripstarttime.substring(0, 5) : null;
                        //     // const address = await getAddressFromLatLng(row.Latitude_loc, row.Longtitude_loc);
                        //     // const address = await safeGetAddress(row.Latitude_loc, row.Longtitude_loc);

                        //     return [
                        //         row.Trip_id, location_alpha, row.Runing_Date, formattedTime,
                        //         trip_type, address, row.Latitude_loc, row.Longtitude_loc
                        //     ];
                        // }));

                        //                 const totalOnGoing = allStatusesResult
                        //   .map((row, index) => ({ ...row, originalIndex: index }))
                        //   .filter(row => row.Trip_Status === 'On_Going')
                        //   .sort((a, b) => a.veh_id - b.veh_id);  // ensure ordered by veh_id

                        // const totalOngoingLength = totalOnGoing.length;
                        // const waypointsCount = 500;
                        // let selectedWaypointsIndexes = [];

                        // if (totalOngoingLength > 0) {
                        //   const firstIndex = totalOnGoing[0].originalIndex;
                        //   const lastIndex = totalOnGoing[totalOngoingLength - 1].originalIndex;
                        //   selectedWaypointsIndexes.push(firstIndex);

                        //   // How many middle points to pick
                        //   const middleCount = waypointsCount - 2; // excluding first and last
                        //   const step = Math.floor(totalOngoingLength / (middleCount + 1)); // +1 to avoid out of bounds

                        //   for (let i = 1; i <= middleCount; i++) {
                        //     const middleIndex = totalOnGoing[i * step]?.originalIndex;
                        //     if (middleIndex !== undefined) {
                        //       selectedWaypointsIndexes.push(middleIndex);
                        //     }
                        //   }

                        //   if (lastIndex !== firstIndex) {
                        //     selectedWaypointsIndexes.push(lastIndex);
                        //   }
                        // }

                        // const waypointLimit = 11;
                        // let waypointLimitIndexes = [];

                        // if (totalOngoingLength > 0) {
                        //   const firstIndex = totalOnGoing[0].originalIndex;
                        //   const lastIndex = totalOnGoing[totalOngoingLength - 1].originalIndex;
                        //   waypointLimitIndexes.push(firstIndex);

                        //   const middleCount = waypointLimit - 2;
                        //   const stepLimit = totalOngoingLength / (middleCount + 1);  // keep as float to avoid floor early

                        //   for (let i = 1; i <= middleCount; i++) {
                        //     const pos = Math.round(i * stepLimit);
                        //     if (pos >= totalOngoingLength) continue;  // avoid out of bounds

                        //     const middleIndex = totalOnGoing[pos]?.originalIndex;
                        //     if (
                        //       middleIndex !== undefined &&
                        //       !waypointLimitIndexes.includes(middleIndex)
                        //     ) {
                        //       waypointLimitIndexes.push(middleIndex);
                        //     }
                        //   }

                        //   if (!waypointLimitIndexes.includes(lastIndex)) {
                        //     waypointLimitIndexes.push(lastIndex);
                        //   }

                        //   // If somehow we still have less than 8, fill with next available points
                        //   if (waypointLimitIndexes.length < waypointLimit) {
                        //     for (let i = 0; i < totalOngoingLength; i++) {
                        //       const extraIndex = totalOnGoing[i].originalIndex;
                        //       if (!waypointLimitIndexes.includes(extraIndex)) {
                        //         waypointLimitIndexes.push(extraIndex);
                        //       }
                        //       if (waypointLimitIndexes.length === waypointLimit) break;
                        //     }
                        //   }
                        // }
                        const totalOnGoing = allStatusesResult
                            .map((row, index) => ({ ...row, originalIndex: index }))
                            .filter(row => row.Trip_Status === 'On_Going')
                            .sort((a, b) => a.veh_id - b.veh_id);  // ensure ordered by veh_id

                        const totalOngoingLength = totalOnGoing.length;
                        const waypointsCount = 500;
                        let selectedWaypointsIndexes = [];

                        if (totalOngoingLength > 500) {
                            const firstIndex = totalOnGoing[0].originalIndex;
                            const lastIndex = totalOnGoing[totalOngoingLength - 1].originalIndex;
                            selectedWaypointsIndexes.push(firstIndex);

                            // How many middle points to pick
                            const middleCount = waypointsCount - 2; // excluding first and last
                            const step = Math.floor(totalOngoingLength / (middleCount + 1)); // +1 to avoid out of bounds

                            for (let i = 1; i <= middleCount; i++) {
                                const middleIndex = totalOnGoing[i * step]?.originalIndex;
                                if (middleIndex !== undefined) {
                                    selectedWaypointsIndexes.push(middleIndex);
                                }
                            }

                            if (lastIndex !== firstIndex) {
                                selectedWaypointsIndexes.push(lastIndex);
                            }
                        }

                        // const waypointLimit = 11;
                        // let waypointLimitIndexes = [];

                        // if (totalOngoingLength > 0) {
                        //     const firstIndex = totalOnGoing[0].originalIndex;
                        //     const lastIndex = totalOnGoing[totalOngoingLength - 1].originalIndex;
                        //     waypointLimitIndexes.push(firstIndex);

                        //     const middleCount = waypointLimit - 2;
                        //     const stepLimit = totalOngoingLength / (middleCount + 1);  // keep as float to avoid floor early

                        //     for (let i = 1; i <= middleCount; i++) {
                        //         const pos = Math.round(i * stepLimit);
                        //         if (pos >= totalOngoingLength) continue;  // avoid out of bounds

                        //         const middleIndex = totalOnGoing[pos]?.originalIndex;
                        //         if (
                        //             middleIndex !== undefined &&
                        //             !waypointLimitIndexes.includes(middleIndex)
                        //         ) {
                        //             waypointLimitIndexes.push(middleIndex);
                        //         }
                        //     }

                        //     if (!waypointLimitIndexes.includes(lastIndex)) {
                        //         waypointLimitIndexes.push(lastIndex);
                        //     }

                        //     // If somehow we still have less than 8, fill with next available points
                        //     if (waypointLimitIndexes.length < waypointLimit) {
                        //         for (let i = 0; i < totalOngoingLength; i++) {
                        //             const extraIndex = totalOnGoing[i].originalIndex;
                        //             if (!waypointLimitIndexes.includes(extraIndex)) {
                        //                 waypointLimitIndexes.push(extraIndex);
                        //             }
                        //             if (waypointLimitIndexes.length === waypointLimit) break;
                        //         }
                        //     }
                        // }

                        const waypointLimit = 8;
                        let waypointLimitIndexes = [];

                        if (totalOngoingLength >= waypointLimit) {
                            // Exact 8 points evenly spread
                            const step = (totalOngoingLength - 1) / (waypointLimit - 1);

                            for (let i = 0; i < waypointLimit; i++) {
                                const pos = Math.round(i * step);
                                console.log(step, "steppppppppp", pos);

                                const index = totalOnGoing[pos]?.originalIndex;
                                if (index !== undefined) {
                                    waypointLimitIndexes.push(index);
                                }
                            }
                        } else {
                            // If less than 8 points available, just add all available points
                            for (let i = 0; i < totalOngoingLength; i++) {
                                waypointLimitIndexes.push(totalOnGoing[i].originalIndex);
                            }
                        }


                        // Now waypointLimitIndexes will always have up to 8 points (if possible)


                        console.log('selectedWaypointsIndexes:', selectedWaypointsIndexes);
                        console.log('waypointLimitIndexes:', waypointLimitIndexes);
                        console.log(totalOngoingLength, "totalongoinggggggggggggggggggggggg");




                        // const waypointLimit = 8;
                        // let waypointLimitIndexes = [];

                        // if (totalOngoingLength > 0) {
                        //   const firstIndex = totalOnGoing[0].originalIndex;
                        //   const lastIndex = totalOnGoing[totalOngoingLength - 1].originalIndex;
                        //   waypointLimitIndexes.push(firstIndex);

                        //   const middleCount = waypointLimit - 2;
                        //   const stepLimit = Math.floor(totalOngoingLength / (middleCount + 1));

                        //   for (let i = 1; i <= middleCount; i++) {
                        //     const middleIndex = totalOnGoing[i * stepLimit]?.originalIndex;
                        //     if (middleIndex !== undefined && !waypointLimitIndexes.includes(middleIndex)) {
                        //       waypointLimitIndexes.push(middleIndex);
                        //     }
                        //   }

                        //   if (lastIndex !== firstIndex) {
                        //     waypointLimitIndexes.push(lastIndex);
                        //   }
                        // }

                        // Remove duplicates and sort
                        // selectedWaypointsIndexes = [...new Set(selectedWaypointsIndexes)].sort((a, b) => a - b);



                        // Now loop through all statuses to build insertValues
                        // const insertValues = await Promise.all(allStatusesResult.map(async (row, index) => {
                        //     let location_alpha = '';
                        //     let trip_type = '';
                        //     let address;
                        //     if (index === 1 || index === 5844 || index === 836 || index === 1670 || index === 2505 || index === 3340 || index === 4175  || index === 5009) {
                        //         console.log(`Index ${index} →`, row);
                        //     }

                        //     if (row.Trip_Status === 'Started') {
                        //         location_alpha = 'A';
                        //         trip_type = 'start';
                        //         address = await getAddressFromLatLng(row.Latitude_loc, row.Longtitude_loc);

                        //     } else if (row.Trip_Status === 'On_Going') {
                        //         if (selectedWaypointsIndexes.includes(index) && totalOngoingLength > 500) {
                        //             location_alpha = 'B';
                        //             trip_type = 'wayLogpoint';
                        //             address = await getAddressFromLatLng(row.Latitude_loc, row.Longtitude_loc);
                        //             // console.log(row,"rowwwwwwwwwwwwwkkkkkkkkkkkkkkkkkkkkkkkkkuuuuuuuuuuuu");

                        //         } 
                        //         else if (totalOngoingLength < 500) {
                        //             location_alpha = 'NULL';
                        //             trip_type = 'On_Going';
                        //             // console.log(row,"rowwwwwwwwwwwwwkkkkkkkkkkkkkkkkkkkkkkkkkgggggggggggg");
                        //             address = await getAddressFromLatLng(row.Latitude_loc, row.Longtitude_loc);

                        //         } else if (totalOngoingLength > 500) {
                        //             location_alpha = 'NULL';
                        //             trip_type = 'On_Going';
                        //             console.log("rowwwwwwwwwwwwwkkkkkkkkkkkkkkkkkkkkkkkkkffffffffff");
                        //             // address = await getAddressFromLatLng(row.Latitude_loc, row.Longtitude_loc);
                        //         }
                        //         else if(row.Trip_Status === 'On_Going'){
                        //              if (waypointLimitIndexes.includes(index)) {

                        //                 location_alpha = 'B';
                        //                 trip_type = 'waypoint';
                        //                 // console.log(row,"rowwwwwwwwwwwwwkkkkkkkkkkkkkkkkkkkkkkkkk");

                        //                 address = await getAddressFromLatLng(row.Latitude_loc, row.Longtitude_loc);
                        //             }
                        //         }

                        //     } else if (row.Trip_Status === 'Reached') {
                        //         location_alpha = 'C';
                        //         trip_type = 'end';
                        //         address = await getAddressFromLatLng(row.Latitude_loc, row.Longtitude_loc);
                        //     }

                        //     const formattedTime = row.Tripstarttime ? row.Tripstarttime.substring(0, 5) : null;

                        //     return [
                        //         row.Trip_id, location_alpha, row.Runing_Date, formattedTime,
                        //         trip_type, address, row.Latitude_loc, row.Longtitude_loc
                        //     ];
                        // }));

                        const insertValues = await Promise.all(allStatusesResult.map(async (row, index) => {
                            let location_alpha = '';
                            let trip_type = '';
                            let address;


                            if (row.Trip_Status === 'Started') {
                                location_alpha = 'A';
                                trip_type = 'start';
                                address = await getAddressFromLatLng(row.Latitude_loc, row.Longtitude_loc);

                            } else if (row.Trip_Status === 'Reached') {
                                location_alpha = 'C';
                                trip_type = 'end';
                                address = await getAddressFromLatLng(row.Latitude_loc, row.Longtitude_loc);

                            } else if (row.Trip_Status === 'On_Going') {
                                if (totalOngoingLength > 500) {
                                    if (selectedWaypointsIndexes.includes(index)) {
                                        location_alpha = 'B';
                                        trip_type = 'wayLogpoint';
                                        address = await getAddressFromLatLng(row.Latitude_loc, row.Longtitude_loc);
                                    }
                                    if (waypointLimitIndexes.includes(index)) {
                                        location_alpha = 'B';
                                        trip_type = 'waypoint';
                                        address = await getAddressFromLatLng(row.Latitude_loc, row.Longtitude_loc);
                                    }
                                    if (!selectedWaypointsIndexes.includes(index) && !waypointLimitIndexes.includes(index)) {
                                        location_alpha = 'NULL';
                                        trip_type = 'On_Going';
                                        // address = await getAddressFromLatLng(row.Latitude_loc, row.Longtitude_loc);
                                    }

                                } else if (totalOngoingLength < 500) {

                                    if (waypointLimitIndexes.includes(index)) {
                                        console.log(waypointLimitIndexes, "ooo", waypointLimitIndexes.includes(index));

                                        location_alpha = 'B';
                                        trip_type = 'waypoint';
                                        address = await getAddressFromLatLng(row.Latitude_loc, row.Longtitude_loc);
                                    }
                                    if (!waypointLimitIndexes.includes(index)) {

                                        location_alpha = 'NULL';
                                        trip_type = 'On_Going';
                                        address = await getAddressFromLatLng(row.Latitude_loc, row.Longtitude_loc);
                                    }
                                }

                            }


                            const formattedTime = row.Tripstarttime ? row.Tripstarttime.substring(0, 5) : null;

                            return [
                                row.Trip_id, location_alpha, row.Runing_Date, formattedTime,
                                trip_type, address, row.Latitude_loc, row.Longtitude_loc
                            ];
                        }));

                        // console.log(insertValues.length, "insertvalues gmapdata",insertValues);

                        const sqlInsertGmapdataQuery = `
                        INSERT INTO gmapdata (tripid, Location_Alpha, date, time, trip_type, place_name, Latitude, Longitude)
                        VALUES ?`;

                        // db.query(sqlInsertGmapdataQuery, [insertValues], (error, insertResult) => {
                        //     if (error) {
                        //         console.log("Database insert error:", error);
                        //         return res.status(500).json({ error: "Internal Server Error" });
                        //     }
                        //     console.log("Inserted rows:", insertResult.affectedRows);
                        //     res.status(200).json({ message: "Data inserted successfully", insertedRows: insertResult.affectedRows });
                        // });

                        db.query(filterSqlCheckQuery, [gpsTripId], async (error3, checkStartResult) => {
                            if (error3) {
                                console.log("Error checking existing 'start' record:", error3);
                                return res.status(500).json({ error: "Internal Server Error" });
                            }
                            // console.log(checkStartResult, "ccccccccccccccccccccccccccccccccccccs");

                            if (checkStartResult.length > 0) {
                                console.log("Start trip already exists in gmapdata.");
                                return res.status(200).json({ message: "Start trip already inserted", existing: true });
                            }

                            // Proceed to insert the gmapdata (sqlInsertGmapdataQuery)
                            db.query(sqlInsertGmapdataQuery, [insertValues], (error, insertResult) => {
                                if (error) {
                                    console.log("Database insert error:", error);
                                    return res.status(500).json({ error: "Internal Server Error" });
                                }

                                console.log("Inserted rows:", insertResult.affectedRows);
                                res.status(200).json({ message: "Data inserted successfully", insertedRows: insertResult.affectedRows });
                            });
                        });

                    });

                } else {
                    res.status(200).json([]);
                }
            });
        }
    });
});

// get lat and long by Tripid
router.get('/appLatLongDetailsByTripId', (req, res) => {
    const { gpsTripId } = req.query;

    if (!gpsTripId) {
        return res.status(400).json({ error: "Trip ID is required" });
    }

    // const sqlQuery = `SELECT * FROM VehicleAccessLocation 
    //                   WHERE Trip_Status IN ( "Started","On_Going", "waypoint","waypoint_Started","waypoint_Reached","Reached") 
    //                   AND Trip_id = ?`;

    const sqlQuery = `SELECT * FROM VehicleAccessLocation 
    WHERE Trip_Status IN ( "Started","On_Going", "Reached") 
    AND Trip_id = ?`;

    db.query(sqlQuery, [gpsTripId], (error, result) => {
        if (error) {
            console.error("Database query error:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        // console.log(result, "]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]");

        return res.status(200).json(result);
    });
});

router.get('/allLatLongDetailsByTripId', (req, res) => {
    const { gpsTripId } = req.query;

    if (!gpsTripId) {
        return res.status(400).json({ error: "Trip ID is required" });
    }

    const sqlQuery = `SELECT * FROM VehicleAccessLocation 
                      WHERE Trip_Status IN ( "Started","On_Going","Reached") 
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

// suresh api 
router.get('/gpstripidgetongoingdata/:startdatevalue', (req, res) => {
    const { startdatevalue } = req.params;

    // console.log("tripiddddddddddddddddddd",startdatevalue);

    const sqlQuery = "SELECT count(*) as countdata FROM tripsheet WHERE startdate = ? and apps  IN ('On_Going')";
    db.query(sqlQuery, [startdatevalue], (error, result) => {
        if (error) {

            return res.status(500).json({ error: "Database query error" });
        }
        return res.status(200).json(result);
    })
})

module.exports = router;