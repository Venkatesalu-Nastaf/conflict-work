const express = require('express');
const router = express.Router();
const db = require('../../../db');

// Add Billing database
router.post('/billing-add', (req, res) => {
  const { tripid, billingno, invoiceno, department, Billingdate, totalkm1, totaltime, customer, supplier, startdate, totaldays, guestname,
    rateType, vehRegNo, trips, vehType, duty, calcPackage, package_amount, extraKM, extrakm_amount, ex_kmAmount, extraHR, extrahr_amount,
    ex_hrAmount, nightBta, nightCount, nhamount, driverBeta, driverbeta_Count, driverBeta_amount, OtherCharges, OtherChargesamount, permit,
    parking, toll, vpermettovendor, vendortoll, minKM, minHour, GrossAmount, AfterTaxAmount, DiscountAmount, DiscountAmount2, customeradvance,
    BalanceReceivable, RoundedOff, NetAmount, Totalamount, paidamount, pendingamount, BankAccount } = req.body;

  const bookData = {
    tripid, billingno, invoiceno, department, Billingdate, totalkm1, totaltime, customer, supplier, startdate, totaldays, guestname,
    rateType, vehRegNo, trips, vehType, duty, calcPackage, package_amount, extraKM, extrakm_amount, ex_kmAmount, extraHR, extrahr_amount,
    ex_hrAmount, nightBta, nightCount, nhamount, driverBeta, driverbeta_Count, driverBeta_amount, OtherCharges, OtherChargesamount, permit,
    parking, toll, vpermettovendor, vendortoll, minKM, minHour, GrossAmount, AfterTaxAmount, DiscountAmount, DiscountAmount2, customeradvance,
    BalanceReceivable, RoundedOff, NetAmount, Totalamount, paidamount, pendingamount, BankAccount
  }


  db.query('INSERT INTO billing SET ?', bookData, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to insert data into MySQL" });
    }
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});

// delete Billing data
router.delete('/billing-delete/:tripid', (req, res) => {
  const tripid = req.params.tripid;
  db.query('DELETE FROM billing WHERE tripid = ?', tripid, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete data from MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    return res.status(200).json({ message: "Data deleted successfully" });
  });
});

// update Billing details
router.put('/billing-edit/:tripid', (req, res) => {
  const tripid = req.params.tripid;
  const { billingno, invoiceno, department, Billingdate, totalkm1, totaltime, customer, supplier, startdate, totaldays, guestname,
    rateType, vehRegNo, trips, vehType, duty, calcPackage, package_amount, extraKM, extrakm_amount, ex_kmAmount, extraHR, extrahr_amount,
    ex_hrAmount, nightBta, nightCount, nhamount, driverBeta, driverbeta_Count, driverBeta_amount, OtherCharges, OtherChargesamount, permit,
    parking, toll, vpermettovendor, vendortoll, minKM, minHour, GrossAmount, AfterTaxAmount, DiscountAmount, DiscountAmount2, customeradvance,
    BalanceReceivable, RoundedOff, NetAmount, Totalamount, paidamount, pendingamount, BankAccount } = req.body;

  const updateData = {
    billingno, invoiceno, department, Billingdate, totalkm1, totaltime, customer, supplier, startdate, totaldays, guestname,
    rateType, vehRegNo, trips, vehType, duty, calcPackage, package_amount, extraKM, extrakm_amount, ex_kmAmount, extraHR, extrahr_amount,
    ex_hrAmount, nightBta, nightCount, nhamount, driverBeta, driverbeta_Count, driverBeta_amount, OtherCharges, OtherChargesamount, permit,
    parking, toll, vpermettovendor, vendortoll, minKM, minHour, GrossAmount, AfterTaxAmount, DiscountAmount, DiscountAmount2, customeradvance,
    BalanceReceivable, RoundedOff, NetAmount, Totalamount, paidamount, pendingamount, BankAccount
  }


  db.query('UPDATE billing SET ? WHERE tripid = ?', [updateData, tripid], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to update data in MySQL" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }
    return res.status(200).json({ message: "Data updated successfully" });
  });
});

// collect data for Billing table
router.get('/billing', (req, res) => {
  db.query('SELECT * FROM billing', (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch data from MySQL" });
    }
    return res.status(200).json(results);
  });
});


router.get('//:')

// collect data from billing database
router.get('/billing-get/:billingno', (req, res) => {
  const billingno = req.params.billingno;

  db.query('SELECT * FROM billing WHERE billingno = ?', billingno, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    const billingDetails = result[0];
    return res.status(200).json(billingDetails);
  });
});

router.get('/billingdata/:invoiceno', (req, res) => {
  const invoiceno = req.params.invoiceno;

  db.query('SELECT * FROM billing WHERE invoiceno = ?', invoiceno, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve billing details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Billing not found' });
    }
    const billingDetails = result[0];
    return res.status(200).json(billingDetails);
  });
});


router.get('/customers/:customer', (req, res) => {
  const customer = req.params.customer;
  db.query('SELECT * FROM customers WHERE customer = ?', customer, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    const bookingDetails = result[0];
    return res.status(200).json(bookingDetails);
  });
});

// map information
router.get('/routedata-map/:tripid', (req, res) => {
  const tripid = req.params.tripid;

  db.query('SELECT * FROM gmapdata WHERE tripid = ?', tripid, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'Route data not found' });
    }

    const routeData = result;
    return res.status(200).json(routeData);
  });
});

//cover billing
router.get('/Group-Billing', (req, res) => {
  const { customer, fromDate, toDate } = req.query;

  let query = 'SELECT * FROM tripsheet WHERE  apps="Be_Closed" and status="Closed" and customer=?  AND startdate >= DATE_ADD(?, INTERVAL 0 DAY) AND startdate <= DATE_ADD(?, INTERVAL 1 DAY)';

  db.query(query, [customer, fromDate, toDate], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
    }
    return res.status(200).json(result);
  });
});

module.exports = router;