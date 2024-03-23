const express = require('express');
const router = express.Router();
const db = require('../../../db');

// collect data from vehicleInfo database
router.get('/tripsheet_driver_details', (req, res) => {
    const apps = req.query.apps; // Use 'apps' as the query parameter name

    // Validate the status parameter
    if (apps !== 'active' && apps !== 'not_active') {
        return res.status(400).json({ error: 'Invalid status parameter' });
    }

    let sqlQuery = 'SELECT id, driverName, vehType, startdate, mobileNo, apps FROM tripsheet';

    // Adjust the SQL query based on the selected status
    if (apps === 'active') {
        sqlQuery += ' WHERE apps = "On_Going"';
    } else if (apps === 'not_active') {
        sqlQuery += ' WHERE apps = "Closed"';
    }

    db.query(sqlQuery, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve driver details from MySQL' });
        }
        return res.status(200).json(result);
    });
});



module.exports = router;