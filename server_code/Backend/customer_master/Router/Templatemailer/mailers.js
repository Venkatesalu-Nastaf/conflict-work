const express = require('express');
const router = express.Router();
const db = require('../../../db')
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');

router.use(express.static('customer_master'));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './customer_master/public/Templateimage')
    },
    filename: (req, file, cb) => {
  
      
      cb(null, `${file.fieldname}_${Date.now()}-${file.originalname}`);
  },
      
    
  
  })
  const uploadattachement = multer({ storage: storage });
router.post('/templateattachmentimage',uploadattachement.single('attach'),(req,res)=>{
    db.query('Insert into Templateattachment set ?',[],(err,result)=>{
        if(err){
            console.log(err)
            return res.status(500).json({ error: "Failed to insert data into MySQL" });
        }
    })
})
  

router.post('/templatedatainsert',(req,res)=>{
    const template=req.body;
    console.log(template)
    db.query('insert into TemplateMessage  SET ?',[template],(err,result)=>{
        if(err){
            console.log(err)
            return res.status(500).json({ error: "Failed to insert data into MySQL" });

        }
        console.log(result)
        return res.status(200).json({ message: "Data inserted successfully" });

    })

})

router.get('/templatedataall', (req, res) => {

    db.query('SELECT * FROM TemplateMessage', (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Template datanot found' });
        }
         // Assuming there is only one matching booking
         console.log(result)
        return res.status(200).json(result);
    });
});


router.put('/templatedataypdate/:templateid',(req,res)=>{
    const templateid=req.params.templateid;
    const template=req.body;
    console.log(template,templateid,"update")
    db.query('update TemplateMessage set  ? where templateid=?',[template,templateid],(err,result)=>{
        if(err){
            return res.status(500).json({ error: "Failed to insert data into MySQL" });

        }
        console.log(result)
        return res.status(200).json({ message: "Data update successfully" });

    })

})

router.delete('/templatedataypdate/:templateid',(req,res)=>{
    const templateid=req.params.templateid;
    console.log(templateid)
   
    db.query('Delete from  TemplateMessage where templateid=?',[templateid],(err,result)=>{
        if(err){
            return res.status(500).json({ error: "Failed to insert data into MySQL" });

        }
        console.log(result)
        return res.status(200).json({ message: "Data delete successfully" });

    })

})



router.post('/send-emailtemplate', async (req, res) => {
    try {
        const {templatemessage,emaildata} = req.body;
    

        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'foxfahad386@gmail.com',
                pass: 'vwmh mtxr qdnk tldd',
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Email content for the owner
        // const ownerMailOptions = {
        //     from: 'foxfahad386@gmail.com',
        //     to: 'foxfahad386@gmail.com.com', // Set the owner's email address
        //     subject: `${guestname} sent you a booking request`,
        //     text: `Guest Name: ${guestname}\nEmail: ${email}\nGuest Mobile No: ${guestmobileno}\nStart Date: ${startdate}\nStart Time: ${starttime}\nUseage: ${useage}\nVehicle Type: ${vehType}`,
        // };

        // // Send email to the owner
        // // await transporter.sendMail(ownerMailOptions);

        // // Email content for the customer

        const emailPromises = emaildata.map(async (data) => {
            const personalizedMessage = templatemessage.TemplateMessageData.replace(
                '</p>',
                `${data.CustomerName}`
            );
            
           
            const customerMailOptions = {
                from: 'foxfahad386@gmail.com',
                to: data.Email, // Ensure the correct key is used here
                subject: templatemessage.TemplateSubject,
                html: personalizedMessage
            };

            // console.log(`Sending email to: ${data.EMAIL}`); // Log email addresses

            return transporter.sendMail(customerMailOptions);
        });

        await Promise.all(emailPromises); // Await all email sending promises

   
   
        // const customerMailOptions = {
        //     from: 'foxfahad386@gmail.com',
        //     to: email,
        //     subject: `${sub}`,
        //     html: `${paragrah} `
        // }
   
    
    
           

        // // Send greeting email to the customer
        // await transporter.sendMail(customerMailOptions);

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'An error occurred while sending the email' });
    }
});




module.exports = router;