const express = require('express');
const router = express.Router();
const db = require('../../../db'); // Import your MySQL connection

// booking CHART data collect
router.get('/bookingchart', (req, res) => {
    const { fromDate, toDate } = req.query;
    const query = `
      SELECT vehType, COUNT(*) AS count
      FROM booking
      WHERE bookingdate BETWEEN ? AND ?
      GROUP BY vehType
    `;
    const values = [fromDate, toDate];

    db.query(query, values, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Failed to retrieve booking data' });
            return;
        }
        res.json(results);
    });
});


const getVehicleInfo = (req, res) => {
    const { vehicleDetail } = req.params;

    // Get column names from the table
    db.query('SHOW COLUMNS FROM vehicleinfo', (err, columns) => {
        if (err) {
            console.error('Error retrieving columns', err);
            return res.status(500).send('Error retrieving columns');
        }

        // Construct the WHERE clause dynamically
        const conditions = columns.map(column => `\`${column.Field}\` LIKE ?`).join(' OR ');
        const query = `SELECT * FROM vehicleinfo WHERE ${conditions}`;
        const queryParams = Array(columns.length).fill(`${vehicleDetail}%`);

        // Execute the dynamic query
        db.query(query, queryParams, (error, results) => {
            if (error) {
                console.error('Error executing the query', error);
                return res.status(500).send('Error executing the query');
            }
            res.send(results);
        });
    });
};

router.get('/getVehicleInfo/:vehicleDetail', getVehicleInfo);


router.get('/getDriverIdStatus/:driverNames', (req, res) => {
    const { driverNames } = req.params;
    const driverNamesArray = driverNames.split(',');

    db.query('SELECT drivername,driverApp FROM drivercreation WHERE drivername in (?)', [driverNamesArray], (err, result) => {
        if (err) {
            console.log(err, 'error');
        }
        return res.status(200).json(result);

    })
})

// getting OfflinevehicleDetails by vehNumber
router.get('/particularNotActiveVehicleDetails', (req, res) => {
    const { vehNumber } = req.query;
    // const vehNumberArray = vehNumber.split(',');

    if (!vehNumber) {
        return res.status(400).json({ error: 'vehNumber query parameter is required' });
    }
    db.query('SELECT * FROM vehicleinfo WHERE active="no" AND  vehRegNo in (?)', [vehNumber], (err, result) => {
        if (err) {
            console.log(err, 'error');
        }
        return res.status(200).json(result);
    })
})

// getting vehicleDetails by vehNumber
router.get('/particularVehicleDetails', (req, res) => {
    const { vehNumber } = req.query;
    const vehNumberArray = vehNumber?.split(',');

    if (!vehNumber) {
        return res.status(400).json({ error: 'vehNumber query parameter is required' });
    }
    db.query('SELECT * FROM vehicleinfo WHERE vehRegNo in (?)', [vehNumberArray], (err, result) => {
        if (err) {
            console.log(err, 'error');
        }
        return res.status(200).json(result);
    })
})
router.get('/ActiveVehicleDetail', (req, res) => {
    const { vehNumber } = req.query;

    if (!vehNumber) {
        return res.status(400).json({ error: 'vehNumber query parameter is required' });
    }
    const vehNumberArray = Array.isArray(vehNumber) ? vehNumber : [vehNumber];

    db.query('SELECT * FROM vehicleinfo WHERE vehRegNo in (?)', [vehNumberArray], (err, result) => {
        if (err) {
            console.log(err, 'error');
        }
        return res.status(200).json(result);
    })
})
module.exports = router;
