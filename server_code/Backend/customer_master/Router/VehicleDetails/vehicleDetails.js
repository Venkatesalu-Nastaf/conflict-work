const express = require('express');
const router = express.Router();
const db = require('../../../db');

router.get('/getAllVehicleDetailsList', (req, res) => {
    const vehicleQuery = "SELECT * FROM vehicleinfo";

    db.query(vehicleQuery, (error, result) => {
        if (error) {
            console.error("Error fetching vehicle details:", error);
            return res.status(500).json({
                error: "Failed to fetch vehicle details",
                details: error.message
            });
        }

        // console.log("Vehicle result:", result);
        return res.status(200).json(result);
    });
});

router.get('/getVehicleParticularInfo', (req, res) => {
    const { vehicleSearchDetails } = req.query; // Use req.query for GET requests
    console.log(vehicleSearchDetails, "vehicle nooo");

    const sqlQuery = "SELECT * FROM vehicleinfo WHERE vehRegNo = ?";
    db.query(sqlQuery, [vehicleSearchDetails], (error, result) => {
        if (error) {
            console.error(error, "DB Error");
            return res.status(500).json({ error: "Database query failed" });
        }
        return res.status(200).json(result);
    });
});

router.get('/getVehicleNamesList', (req, res) => {
    const sqlQuery = "SELECT id,VechicleNames FROM VehicleName";

    db.query(sqlQuery, (error, result) => {
        if (error) {
            console.error("Database query failed:", error);
            return res.status(500).json({ error: "Database query failed" });
        }

        return res.status(200).json(result);
    });
});

router.post('/updateVehicleNamesList', (req, res) => {
    const { vehicleName, id } = req.body;
    console.log(vehicleName, "vehiclenameeeeeeee", id);

    const sqlQuery = "UPDATE VehicleName SET VechicleNames = ? WHERE id = ?";

    db.query(sqlQuery, [vehicleName, id], (error, result) => {
        if (error) {
            console.log(error, "error");
        }
        res.status(200).json({ message: 'Status updated successfully' });
    })
})

router.post('/deleteVehicleNamesList', (req, res) => {
    const { id } = req.body; 
    console.log(id, "delete vehicle id");

    const sqlquery = "DELETE FROM VehicleName WHERE id = ?"; 
    db.query(sqlquery, [id], (error, result) => {
        if (error) {
            console.error(error, "error");
            return res.status(500).json({ error: "Database query failed" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No record found to delete" });
        }
        return res.status(200).json({ message: "Data deleted successfully" });
    });
});




module.exports = router