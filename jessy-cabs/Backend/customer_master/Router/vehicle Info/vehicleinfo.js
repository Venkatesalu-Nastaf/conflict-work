const express = require('express');
const router = express.Router();
const db = require('../../../db');
const moment = require('moment'); // or import dayjs from 'dayjs';


// vehicle_info database:-
// Add vehicle_info database
router.post('/vehicleinfo', (req, res) => {
  const bookData = req.body;
  db.query('INSERT INTO vehicleinfo SET ?', bookData, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    console.log('Data inserted into MySQL');
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});

router.get('/searchvehicleinfo', (req, res) => {
  const { searchText, fromDate, toDate } = req.query;
  console.log(searchText, fromDate, toDate);

  let query = 'SELECT * FROM vehicleinfo WHERE 1=1';
  let params = [];

  if (searchText) {
    const columnsToSearch = [
      'vehicleId',
      'doadate',
      'vehRegNo',
      'costCenter',
      'vehType',
      'owner',
      'mobileNo',
      'email',
      'yearModel',
      'insuranceno',
      'insduedate',
      'licenseno',
      'licensebatchno',
      'licduedate',
      'nationalpermito',
      'npdate',
      'avgmileage',
      'statepermito',
      'spdate',
      'financer',
      'rcbookno',
      'fcdate',
      'driverName',
      'tankCap',
      'routeno',
      'remarks',
      'OwnerType',
      'active',
    ];

    const likeConditions = columnsToSearch.map(column => `${column} LIKE ?`).join(' OR ');

    query += ` AND (${likeConditions})`; 
    params = columnsToSearch.map(() => `%${searchText}%`);
  }

  if (fromDate && moment(fromDate, 'DD/MM/YYYY', true).isValid() && toDate && moment(toDate, 'DD/MM/YYYY', true).isValid()) {
    const formattedFromDate = moment(fromDate, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
    const formattedToDate = moment(toDate, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

    query += ' AND doadate >= ? AND doadate <= DATE_ADD(?, INTERVAL 1 DAY)';
    params.push(formattedFromDate, formattedToDate);
  }

  db.query(query, params, (err, result) => {
    if (err) {
      console.error('Error retrieving vehicle details from MySQL:', err);
      return res.status(500).json({ error: 'Failed to retrieve vehicle details from MySQL' });
    }
    console.log('collected data', result);
    console.log('Query:', query);
    console.log('Params:', params);
    return res.status(200).json(result);
  });
});


// end vehicle_info database

module.exports = router;