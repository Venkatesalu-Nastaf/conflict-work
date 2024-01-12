const express = require('express');
const router = express.Router();
const axios = require('axios'); // Import the axios library

// // Send guest SMS from booking when the button is clicked
router.post('/send-sms', async (req, res) => {
    await sendSMS(req.body);
    res.send('SMS sent!');
});

// // Your sendSMS function
async function sendSMS(dataToSend) {
    const { guestname, guestmobileno, tripid, reporttime, startdate, address1, streetno, city } = dataToSend;
    const apiUrl = 'https://smsssl.dial4sms.com/api/v2/SendSMS';
    const params = {
        SenderId: 'JSYCAB',
        Message: `Trip details from JESSY CABS Guest Name ${guestname} contact no ${guestmobileno} T.S no ${tripid} Reporting Date: ${startdate} Reporting Time ${reporttime} Reporting Address ${address1}${streetno}${city}.JESSYC`,
        MobileNumbers: guestmobileno,
        TemplateId: '1107169000164228655',
        ApiKey: 'NxMzw4LY3K6d7KH0/6DKazua3Vga2LHipLkcQctUetk=',
        ClientId: 'a5b891d0-9e91-442b-921b-3f2547a96c8e',
    };

    try {
        const response = await axios.post(apiUrl, params);
        console.log('SMS sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending SMS:', error.message);
    }
}

// Send guest SMS from tripsheet when the button is clicked
router.post('/tripguest-send-sms', async (req, res) => {
    await tripguestsendSMS(req.body);
    res.send('SMS sent!');
});

// Your sendSMS function
async function tripguestsendSMS(dataToSend) {
    const { guestname, guestmobileno, vehRegNo, vehType, driverName, mobileNo, reporttime, startdate, ofclanno } = dataToSend;
    const apiUrl = 'https://smsssl.dial4sms.com/api/v2/SendSMS';
    const params = {
        SenderId: 'JSYCAB',
        Message: `Reporting to ${guestname} Vehicle Details - ${vehType} Vehicle Number - ${vehRegNo} Driver Name-${driverName} Mobile No ${mobileNo} Trip Date ${startdate} Reporting Time ${reporttime} from JESSY CABS ${ofclanno} -JESSYC`,
        MobileNumbers: `${guestmobileno}`,
        TemplateId: '1107169000156593966',
        ApiKey: 'NxMzw4LY3K6d7KH0/6DKazua3Vga2LHipLkcQctUetk=',
        ClientId: 'a5b891d0-9e91-442b-921b-3f2547a96c8e',
    };

    try {
        const response = await axios.post(apiUrl, params);
        console.log('SMS sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending SMS:', error.message);
    }
}

// Send driver SMS from tripsheet when the button is clicked
router.post('/tripdriver-send-sms', async (req, res) => {
    await tripdriversendSMS(req.body);
    res.send('SMS sent!');
});

// Your sendSMS function
async function tripdriversendSMS(dataSend) {
    const { guestname, vehRegNo, vehType, driverName, mobileNo, reporttime, startdate, ofclanno } = dataSend;
    const apiUrl = 'https://smsssl.dial4sms.com/api/v2/SendSMS';
    const params = {
        SenderId: 'JSYCAB',
        Message: `Reporting to ${guestname} Vehicle Details - ${vehType} Vehicle Number - ${vehRegNo} Driver Name-${driverName} Mobile No ${mobileNo} Trip Date ${startdate} Reporting Time ${reporttime} from JESSY CABS ${ofclanno} -JESSYC`,
        MobileNumbers: `${mobileNo}`,
        TemplateId: '1107169000156593966',
        ApiKey: 'NxMzw4LY3K6d7KH0/6DKazua3Vga2LHipLkcQctUetk=',
        ClientId: 'a5b891d0-9e91-442b-921b-3f2547a96c8e',
    };

    try {
        const response = await axios.post(apiUrl, params);
        console.log('SMS sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending SMS:', error.message);
    }
}

module.exports = router;