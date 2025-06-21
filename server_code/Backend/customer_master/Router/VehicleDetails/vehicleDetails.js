const express = require('express');
const router = express.Router();
const db = require('../../../db');
const multer = require('multer');
const path = require('path');
const imagePath = require('../../../imagepath')
// console.log(imagePath,"vehicleDetails.js");


router.get('/getAllVehicleDetailsList', (req, res) => {
  const vehicleQuery = "SELECT * FROM vehicleinfo";

  db.query(vehicleQuery, (error, result) => {
    if (error) {
      // console.log("mooError fetching vehicle details:", error);
      return res.status(500).json({
        error: "Failed to fetch vehicle details",
        details: error.message
      });
    }
    // console.log(result, "result vehicles all");

    return res.status(200).json(result);

  });
});

router.get('/getVehicle-Hcl-Customers/:todayDate/:hybrid', (req, res) => {

  const todayDate = req.params.todayDate;
  const hybrid = req.params.hybrid;

  // console.log(todayDate, "date hcl");
  // console.log(hybrid, "hybrid checking");


  // const vehicleQuery = "SELECT * FROM vehicleinfo";

  const vehicleQuery = `SELECT  TS.vehRegNo, TS.driverName, TS.tripid
                     FROM tripsheet TS
                     WHERE TS.tripid IN(
                     SELECT TS.tripid
                    FROM tripsheet TS
                    LEFT JOIN VehicleAccessLocation VA ON TS.tripid = VA.Trip_id
                    WHERE VA.Runing_Date = ? AND VA.Vehicle_No IS NOT NULL 
                    AND VA.Vehicle_No <> '' 
                    GROUP BY VA.Vehicle_No, VA.Trip_id
                    )`;

  const tripQuery = ` SELECT TS.vehRegNo, TS.driverName, TS.tripid
                     FROM tripsheet TS
                     WHERE TS.tripid IN(
                     SELECT TS.tripid
                    FROM tripsheet TS
                    LEFT JOIN VehicleAccessLocation VA ON TS.tripid = VA.Trip_id
                    WHERE VA.Runing_Date = ? AND TS.Hybriddata = 1 AND VA.Vehicle_No IS NOT NULL 
                    AND VA.Vehicle_No <> ''
                    GROUP BY VA.Vehicle_No, VA.Trip_id
                    )`;


  if (hybrid === "Hybrid_Customer") {
    db.query(tripQuery, [todayDate], (err, tripResult) => {

      if (err) {
        // console.log(err, "moott")
        return res.status(500).json(err)
      }
      if (tripResult.length > 0) {


        // const uniqueResult = [];

        // const seenVehRegNo = [];

        // tripResult.forEach(item => {

        //   if (!seenVehRegNo.includes(item.vehRegNo)) {
        //     seenVehRegNo.push(item.vehRegNo);
        //     uniqueResult.push(item);
        //   }
        // });
        // // console.log(uniqueResult, "result of this uniqueResult");
        // return res.status(200).json(uniqueResult);
         const groupedResult = {};   
       tripResult.forEach(({ vehRegNo, driverName, tripid }) => {
          if (!groupedResult[vehRegNo]) {
            groupedResult[vehRegNo] = {
              vehRegNo,
              driverName,
              tripids: [tripid]
            };
          } else {
            groupedResult[vehRegNo].tripids.push(tripid);
          }
        });

        const finalResult = Object.values(groupedResult);
        return res.status(200).json(finalResult)
      }
      else {
        // console.log(tripResult ,"tripresult");

        return res.status(200).json(tripResult);
      }

    });
  } else {

    db.query(vehicleQuery, [todayDate], (err, vehicleResult) => {

      if (err) {
        // console.log(err, "moottbb")
        return res.status(500).json(err)
      }
      if (vehicleResult.length > 0) {

        // const uniqueResult = [];
        // const seenVehRegNo = [];

        // vehicleResult.forEach(item =>{

        //   if(!seenVehRegNo.includes(item.vehRegNo)){
        //     seenVehRegNo.push(item.vehRegNo)
        //     uniqueResult.push(item)
        //   }
        // })

        // console.log(uniqueResult, "findddd");
        // return res.status(200).json(vehicleResult)
        const groupedResult = {};

        vehicleResult.forEach(({ vehRegNo, driverName, tripid }) => {
          if (!groupedResult[vehRegNo]) {
            groupedResult[vehRegNo] = {
              vehRegNo,
              driverName,
              tripids: [tripid]
            };
          } else {
            groupedResult[vehRegNo].tripids.push(tripid);
          }
        });

        const finalResult = Object.values(groupedResult);
        return res.status(200).json(finalResult)
       
      }
      else {
        // console.log(vehicleResult, "vehicle resultttt");

        return res.status(200).json(vehicleResult)
      }
    });

  }

});
router.get('/tripStatus/:tripId' , (req, res) =>{

  const tripId = req.params.tripId;

  const selectQuery =`
    SELECT Trip_Status
    FROM VehicleAccessLocation 
    WHERE Trip_id = ? 
    ORDER BY created_at DESC 
    LIMIT 1
  `;
  db.query(selectQuery, [tripId], (err, result)=>{
    if(err){
      return res.status(500).json(err)
    }
    if(result.length ===0){
      return res.status(404).json({message:"Trip Id Not found"})
    }
    else{
       return res.status(200).json({ status: result[0].Trip_Status});
    }
  })
})


// router.get('/gethybridvalue', (req, res) => {

//   // const today = new Date().toISOString().split('T')[0];
//   const fixdate = "2025-03-18"

//   // const selectQuery = `SELECT Vehicle_No, Trip_id from VehicleAccessLocation WHERE Runing_Date=?`;

//   const selectQuery = `
//   SELECT TS.tripid
//   FROM tripsheet TS
//   INNER JOIN VehicleAccessLocation VA ON TS.tripid = VA.Trip_id
//   WHERE VA.Runing_Date = ? and TS.Hybriddata = 1
//   GROUP BY VA.Trip_id`
//     ;

//   db.query(selectQuery, [fixdate], (err, result) => {
//     if (err) {
//       console.log(err, "errr");

//       return res.status(500).json({ error: "Database" })
//     }
//     console.log(result, "resulttttt");

//     return res.status(200).json(result);
//   });

// });

router.get('/getVehicleParticularInfo', (req, res) => {
  const { vehicleSearchDetails } = req.query; // Use req.query for GET requests
  // console.log(vehicleSearchDetails, "vehicle nooo");

  const sqlQuery = "SELECT * FROM vehicleinfo WHERE vehRegNo = ?";
  db.query(sqlQuery, [vehicleSearchDetails], (error, result) => {
    if (error) {
      // console.error(error, "DB Error");
      return res.status(500).json({ error: "Database query failed" });
    }
    return res.status(200).json(result);
  });
});

router.get('/getVehicleNamesList', (req, res) => {
  const sqlQuery = "SELECT id,VechicleNames FROM VehicleName";

  db.query(sqlQuery, (error, result) => {
    if (error) {
      // console.error("Database query failed:", error);
      return res.status(500).json({ error: "Database query failed" });
    }
    console.log(result,"vehicleresult");
    

    return res.status(200).json(result);
  });
});

router.post('/updateVehicleNamesList', (req, res) => {
  const { vehicleName, id } = req.body;
  // console.log(vehicleName, "vehiclenameeeeeeee", id);

  const sqlQuery = "UPDATE VehicleName SET VechicleNames = ? WHERE id = ?";

  db.query(sqlQuery, [vehicleName, id], (error, result) => {
    if (error) {
      console.log(error, "error");
    }
    // console.log(result,"checking updation"); 
    res.status(200).json({ message: 'Status updated successfully' });
  })
})

router.post('/deleteVehicleNamesList', (req, res) => {
  const { id } = req.body;
  // console.log(id, "delete vehicle id");

  const sqlquery = "DELETE FROM VehicleName WHERE id = ?";
  db.query(sqlquery, [id], (error, result) => {
    if (error) {
      // console.error(error, "error");
      return res.status(500).json({ error: "Database query failed" });
    }
    // console.log(result, "checking deleted result");

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No record found to delete" });
    }
    return res.status(200).json({ message: "Data deleted successfully" });
  });
});

router.post('/store-location', (req, res) => {
  const { latitude, longitude } = req.body;

  // Insert the latitude, longitude, and timestamp into MySQL
  const query = 'INSERT INTO gps_records (Latitude, Longitude) VALUES (?, ?)';
  db.execute(query, [latitude, longitude], (err, result) => {
    if (err) {
      // console.error('Error inserting data:', err);
      return res.status(500).send('Error storing location data');
    }
    res.send('Location data stored successfully');
  });
});

// Getting current point vehicle details by particular vehicle
// router.get('/gettingParticularVehcileDetails', (req, res) => {
//     // const { vehicleNumber } = req.body;



//     const sqlQuery = `
//         SELECT * FROM VehicleTripDetails 
//         WHERE DATE(created_at) = CURDATE()  -- Filter for today's date
//         ORDER BY created_at DESC  -- Get the latest time
//         LIMIT 1;  -- Only the latest row
//     `;

//     db.query(sqlQuery, (err, results) => {
//         if (err) {
//             console.error("Error fetching vehicle details:", err);
//             return res.status(500).json({ error: "Internal Server Error" });
//         }
//         console.log(results,"particularrrrrr---------------------------------");

//         if (results.length === 0) {
//             return res.status(404).json({ message: "No data found for the vehicle today" });
//         }

//         res.json(results[0]);  
//     });
// });

// const userattachedDirectory1 = path.join(__dirname, 'uploads');
// const storagetripsheet1 = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // cb(null, 'uploads')
//     cb(null, userattachedDirectory1)
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "_" + req.params.data + path.extname(file.originalname))
//   }

// })
// router.use(express.static('Backend'));
// router.use(express.static('customer_master'));

const storagetripsheet1 = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, './uploads')
    // cb(null, '../../../Imagefolder/imagesUploads_doc')
    cb(null, `${imagePath}/imagesUploads_doc`)

  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + req.params.data + path.extname(file.originalname))
  }

})
const uploadtripsheet1 = multer({
  storage: storagetripsheet1
})
router.post('/tripsheetdatadriverappimage/:data', uploadtripsheet1.single('file'), (req, res) => {
  // console.log(req.params.data, "kk")
  const fullPath = path.resolve(req.file.path);
  const fileData = {
    name: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    path: req.file.path.replace(/\\/g, '/').replace(/^uploads\//, ''),
    // tripid: req.body.tripid,
    fullPath: fullPath,
    date: req.body.datadate

  };
  // console.log(fileData)
  // res.send("datasend")
  res.json({ fileData })

})

module.exports = router