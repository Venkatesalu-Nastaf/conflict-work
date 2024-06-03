const express = require('express');
const router = express.Router();
const axios = require('axios'); // Import the axios library
const db = require('../../../db');

// // Send guest SMS from booking when the button is clicked
// router.post('/send-sms', async (req, res) => {
// //    const response= await sendSMS(req.body);
//    try {
//     const sendResponse = await sendSMS(req.body);
//     if (sendResponse.error) {
//         res.status(500).send(`Failed to send SMS: ${sendResponse.error.message}`);
//         return;
//     }

//     const messageId = sendResponse.messageId;
//     const tripid=sendResponse.tripid
//     // db.query("insert into")
//     if(messageId && tripid){
//     // console.log(messageId,tripid,"tt")
//     db.query("insert into SmsReport(tripid,SmsMessageid) values(?,?)",[tripid,messageId],(err,results)=>{
//         if(err){
//             return res.status(500).json({ error: "Internal server error" });
//         }
        
//         res.send('SMS sent!');
//     })
// }
// else{
//     res.send('Messageid && tripid not found');
// }
   
   
// }catch(err){
//     console.log(err)
// }
// });

// // Your sendSMS function
// async function sendSMS(dataToSend) {
//     // const { guestname, guestmobileno, tripid, reporttime, startdate, address1, streetno, city } = dataToSend;
//     const { guestname, guestmobileno, tripid, reporttime, startdate, address1 } = dataToSend;
//     console.log(guestname, guestmobileno, tripid, reporttime, startdate, address1,"sms......");
//     // var d = " ";
//     const apiUrl = 'https://smsssl.dial4sms.com/api/v2/SendSMS';
//     const params = {
//         SenderId: 'JSYCAB',
//         // Message: `Trip details from JESSY CABS Guest Name ${guestname} contact no ${guestmobileno} T.S no ${tripid} Reporting Date: ${startdate} Reporting Time ${reporttime} Reporting Address ${address1}${d}${streetno}${d}${city}.JESSYC`,
//         Message: `Trip details from JESSY CABS Guest Name ${guestname} contact no ${guestmobileno} T.S no ${tripid} Reporting Date: ${startdate} Reporting Time ${reporttime} Reporting Address ${address1}.JESSYC`,
//         MobileNumbers: `${guestmobileno}`,
//         TemplateId: '1107169000164228655',
//         ApiKey: 'NxMzw4LY3K6d7KH0/6DKazua3Vga2LHipLkcQctUetk=',
//         ClientId: 'a5b891d0-9e91-442b-921b-3f2547a96c8e',
//     };

//     try {
//        const response= await axios.post(apiUrl, params);
//         const data = response.data.Data[0];
//         console.log(data)
//         const messageErrorCode = data.MessageErrorCode;
//         const messageErrorDescription = data.MessageErrorDescription;
//         const messageId = data.MessageId;

//         if (messageErrorCode !== 0) {
//             return { error: { message: messageErrorDescription, code: messageErrorCode } };
//         }

//         return { messageId,tripid};
//     } catch (error) {
//         console.error('Error sending SMS:', error);
//         return { error: { message: error.message, code: error.response?.status || 'Unknown' } };
//     }
//     } 
    


// Send guest SMS from tripsheet when the button is clicked
router.post('/tripguest-send-sms', async (req, res) => {

    try{

    
   const response= await tripguestsendSMS(req.body);

    const messageId = response.messageId;
    const tripid=response.tripid
    // db.query("insert into")
    if(messageId && tripid){
    console.log(messageId,tripid,"guestsms")
    db.query("insert into SmsReport(tripid,SmsMessageid) values(?,?)",[tripid,messageId],(err,results)=>{
        if(err){
            return res.status(500).json({ error: "Internal server error" });
        }
        
        res.send('SMS sent!');
    })
}
else{
    res.send('Messageid && tripid not found');
}
    // res.send('SMS sent!');
    }
    catch(err){
        console.log(err)
    }
});

// Your sendSMS function
async function tripguestsendSMS(dataToSend) {
    const { guestname, guestmobileno, vehRegNo, vehType, driverName,tripid, mobileNo, reporttime, startdate, ofclanno } = dataToSend;
    console.log(guestname, guestmobileno, vehRegNo, vehType, driverName,tripid, mobileNo, reporttime, startdate, ofclanno,"guestsms")

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
        const response=await axios.post(apiUrl, params);
        const data = response.data.Data[0];
        // console.log(data)
        const messageErrorCode = data.MessageErrorCode;
        const messageErrorDescription = data.MessageErrorDescription;
        const messageId = data.MessageId;

        if (messageErrorCode !== 0) {
            return { error: { message: messageErrorDescription, code: messageErrorCode } };
        }

        return { messageId,tripid};
    }
    catch (error) {
        console.error('Error sending SMS:', error);
        return { error: { message: error.message, code: error.response?.status || 'Unknown' } };
    }
}

// Send driver SMS from tripsheet when the button is clicked
router.post('/tripdriver-send-sms', async (req, res) => {
    try{
  const response=  await tripdriversendSMS(req.body);
    // res.send('SMS sent!');
    const messageId = response.messageId;
    const tripid=response.tripid
    // db.query("insert into")
    if(messageId && tripid){
    console.log(messageId,tripid,"driversms")
    db.query("insert into SmsReport(tripid,SmsMessageid) values(?,?)",[tripid,messageId],(err,results)=>{
        if(err){
            return res.status(500).json({ error: "Internal server error" });
        }
        
        res.send('SMS sent!');
    })
}
else{
    res.send('Messageid && tripid not found');
}
    // res.send('SMS sent!');
    }
    catch(err){
        
        console.log(err)

    }
});
//  Message: `Reporting to ${guestname} Vehicle Details - ${vehType} Vehicle Number - ${vehRegNo} Driver Name-${driverName} Mobile No ${mobileNo} Trip Date ${startdate} Reporting Time ${reporttime} from JESSY CABS ${ofclanno} -JESSYC`,
// Your sendSMS function
async function tripdriversendSMS(dataSend) {
    const {tripid, guestname,guestmobileno ,mobileNo, reporttime, startdate, address1} = dataSend;
    console.log(tripid, guestname,guestmobileno, mobileNo, reporttime, startdate,address1,"driversms")
    const apiUrl = 'https://smsssl.dial4sms.com/api/v2/SendSMS';
    const params = {
        SenderId: 'JSYCAB',
        Message: `Trip details from JESSY CABS Guest Name ${guestname} contact no ${guestmobileno} T.S no ${tripid} Reporting Date: ${startdate} Reporting Time ${reporttime} Reporting Address ${address1}.JESSYC`,
        MobileNumbers: `${mobileNo}`,
        // TemplateId: '1107169000156593966',
        TemplateId: '1107169000164228655',
        ApiKey: 'NxMzw4LY3K6d7KH0/6DKazua3Vga2LHipLkcQctUetk=',
        ClientId: 'a5b891d0-9e91-442b-921b-3f2547a96c8e',
    };

    try {
        const response = await axios.post(apiUrl, params);
        const data = response.data.Data[0];
        // console.log(data)
        // const messageErrorCode = data.MessageErrorCode;
        // const messageErrorDescription = data.MessageErrorDescription;
        const messageId = data.MessageId;

        // if (messageErrorCode !== 0) {
        //     return { error: { message: messageErrorDescription, code: messageErrorCode } };
        // }

        return { messageId,tripid};
    }
    catch (error) {
        console.error('Error sending SMS:', error);
        return { error: { message: error.message, code: error.response?.status || 'Unknown' } };
    }
}

module.exports = router;