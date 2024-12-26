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
        
        console.log("Vehicle result:", result);
        return res.status(200).json(result);
    });
});


module.exports = router