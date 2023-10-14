//Database connection for TAAF Appliction this file contain Add, Delete, Collect data from mysql, and Update functions:  
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const db = require('../db');
//connect using route
const customerRoutes = require('./Router/customer/Customer');
const accountinfoRoutes = require('./Router/supplier/accountinginfo');
const vehicleinfoRouter = require('./Router/vehicle Info/vehicleinfo');
const bookingRouter = require('./Router/Booking/booking');
const bookingcopyRouter = require('./Router/Booking/bookingcopy');
const bookingchartRouter = require('./Router/Booking/bookingchart');
const tripsheetRouter = require('./Router/tripsheet/tripsheet');
const pendingRouter = require('./Router/Recieved/pending');
const closedRouter = require('./Router/Dispatch/closed');
const dispatchRouter = require('./Router/Dispatch/dispatch');
const driverRouter = require('./Router/driver/driver');
const usercreationRouter = require('./Router/usercreation/usercreation');
const stationcreationRouter = require('./Router/stationcreation/stationcreation');
const packagerateRouter = require('./Router/Ratemanagement/packagerate');
const ratetypeRouter = require('./Router/Ratetype/ratetype');
const ratevalidityRouter = require('./Router/Ratetype/ratevalidity');
const divionRouter = require('./Router/Ratetype/division');
const driverbataRouter = require('./Router/Ratemanagement/driverbatarate');
// const employeeRouter = require('./Router/Employee/employee');
const billingRouter = require('./Router/Billing/billing');
const pettycashRouter = require('./Router/cashflow/pettycash');
const payrollRouter = require('./Router/cashflow/payroll');
const fueldetailsRouter = require('./Router/fueldetails/mileage');
const taxsettingRouter = require('./Router/mainsetting/taxsetting');
const drivercreationRouter = require('./Router/Driverapplogin/driverapplogin');
const assetsRouer = require('./Router/cashflow/assets');
const driveractiveRouter = require('./Router/tripsheet/appuserlist');


app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ message: "Hello from the backend side" });
});
// -----------------------------------------------------------------------------------------------------------
// // Customer Master Database
app.use('/', customerRoutes);
// // End Customer Master database
// -----------------------------------------------------------------------------------------------------------
// // Supplier Master Database:
// // account_info database:-
app.use('/', accountinfoRoutes);
// // End account_info database
// -----------------------------------------------------------------------------------------------------------
// vehicle_info database:-
// Add vehicle_info database
app.use('/', vehicleinfoRouter);
// end vehicle_info database
// -----------------------------------------------------------------------------------------------------------
// Booking database:
// Booking page database:-
// Add Booking page database
app.use('/', bookingRouter);
//end online-booking mail
//End booking page database 
// -----------------------------------------------------------------------------------------------------------
// booking copy data collect:
app.use('/', bookingcopyRouter);
// End booking copy page database
// -----------------------------------------------------------------------------------------------------------
// booking CHART data collect
app.use('/', bookingchartRouter);
// End booking CHART database
// -----------------------------------------------------------------------------------------------------------
// trip sheet database:
app.use('/', tripsheetRouter);
// End tripsheet database
// -----------------------------------------------------------------------------------------------------------
// order/Received/Pending data collect from database
app.use('/', pendingRouter);
// End 
// -----------------------------------------------------------------------------------------------------------
// order/Dispatch/closed data collect from database
app.use('/', closedRouter);
// End order/Dispatch/closed database
// -----------------------------------------------------------------------------------------------------------
// order/Dispatch/dispatch data collect from database
app.use('/', dispatchRouter);
// End order/Dispatch/dispatch database
// -----------------------------------------------------------------------------------------------------------
// driver master database
app.use('/', driverRouter);
// End driver master database
// -----------------------------------------------------------------------------------------------------------
// Settings page database:
app.use('/', usercreationRouter);
// End user creation database
// -----------------------------------------------------------------------------------------------------------
// login page databse fetch:
app.post('/login', (req, res) => {
  const { username, userpassword } = req.body;
  if (!username || !userpassword) {
    return res.status(400).json({ error: 'Username and userpassword are required.' });
  }
  db.query('SELECT * FROM usercreation WHERE username = ? AND userpassword = ?', [username, userpassword], (err, result) => {
    if (err) {
      console.error('Error retrieving user details from MySQL:', err);
      return res.status(500).json({ error: 'Failed to retrieve user details from MySQL' });
    }
    if (result.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials. Please check your username and userpassword.' });
    }
    return res.status(200).json({ message: 'Login successful', user: result[0] });
  });
});
// -----------------------------------------------------------------------------------------------------------
// Station Creation Database
// Add Station Creation database
app.use('/', stationcreationRouter);
// End  Station Creation database
// -----------------------------------------------------------------------------------------------------------
// Rate Management Database
app.use('/', packagerateRouter);
// End Rate Management database
// -----------------------------------------------------------------------------------------------------------
// Ratetype Database
app.use('/', ratetypeRouter);
// End Ratetype database
// -----------------------------------------------------------------------------------------------------------
// RateValidity Database
app.use('/', ratevalidityRouter);
// End RateValidity database
// -----------------------------------------------------------------------------------------------------------
// division Database
app.use('/', divionRouter);
// End RateValidity database
// -----------------------------------------------------------------------------------------------------------
// division Database
app.use('/', driveractiveRouter);
// End RateValidity database
// -----------------------------------------------------------------------------------------------------------
// driverbatarate Database
app.use('/', driverbataRouter);
// End RateValidity database
// -----------------------------------------------------------------------------------------------------------
// driverbatarate Database
app.use('/', drivercreationRouter);
// End RateValidity database
// -----------------------------------------------------------------------------------------------------------
// Employees Database
// app.use('/', employeeRouter);
// End Employees database
// -----------------------------------------------------------------------------------------------------------
// Billing Database
app.use('/', billingRouter);
// End Billing database
// -----------------------------------------------------------------------------------------------------------
// cashflow Database
app.use('/', pettycashRouter);
// End pettycash database
// -----------------------------------------------------------------------------------------------------------
// cashflow Database
app.use('/', assetsRouer);
// End pettycash database
// -----------------------------------------------------------------------------------------------------------
// Add payroll database
app.use('/', payrollRouter);
// End payroll database
// -----------------------------------------------------------------------------------------------------------
// Options/Fuel Details
app.use('/', fueldetailsRouter);
// End Fuel Details database
// -----------------------------------------------------------------------------------------------------------
// mainsettings Database
app.use('/', taxsettingRouter);
// End Customer Master database
// -----------------------------------------------------------------------------------------------------------
//signature database
app.use('/', taxsettingRouter);
//End signature database
// -----------------------------------------------------------------------------------------------------------
const port = 8081;
app.listen(port, () => {
  console.log(`Connected to backend on port ${port}`);
});
