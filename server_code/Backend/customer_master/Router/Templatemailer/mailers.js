const express = require('express');
const router = express.Router();
const db = require('../../../db')
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const fs = require('fs');
const axios = require('axios');
const decryption = require('../dataDecrypt');
const imagePath = require('../../../imagepath')
// console.log(imagePath, "mailers");

// router.use(express.static('customer_master'));
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './customer_master/public/Templateimage')
//     },
//     filename: (req, file, cb) => {


//         cb(null, `${file.fieldname}_${Date.now()}-${file.originalname}`);
//     },

// })
// router.use(express.static('Imagefolder'));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, '../../../Imagefolder/Templateimage')
          cb(null, `${imagePath}/Templateimage`)
    },
    filename: (req, file, cb) => {


        cb(null, `${file.fieldname}_${Date.now()}-${file.originalname}`);
    },

})
const uploadattachement = multer({ storage: storage });
router.post('/templateattachmentimage/:templateid', uploadattachement.array('imagestemplate'), (req, res) => {
    const templateid = req.params.templateid
    // console.log(templateid,"post image");    
    const imagedata = req.files
    if (!imagedata || imagedata.length === 0) {
        return res.status(500).json("No images provided ");
    }
    const insertQuery = 'INSERT INTO Templateattachement (templateid,templateimage,mimetype) VALUES (?, ?, ?)';
    let insertCount = 0;

    imagedata?.forEach((image) => {
        const { filename, mimetype } = image;
        db.query(insertQuery, [templateid, filename, mimetype], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to insert data into MySQL' });
            }

            // Increment the insertCount after each successful insertion
            insertCount++;
            // Check if all images have been processed
            if (insertCount === imagedata.length) {
                // If all images have been processed, send the response
                res.status(200).json({ message: 'Data inserted successfully' });
            }
        });
    });
});

router.get('/lasttemplateid', (req, res) => {
    db.query('SELECT   Templateid  FROM  TemplateMessage ORDER BY  Templateid DESC LIMIT    1', (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve booking details from MySQL' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Template not found' });
        }
        const Templateid = result[0];
        return res.status(200).json(Templateid);
    });
});

router.post('/templatedatainsert', (req, res) => {
    const template = req.body;
    db.query('insert into TemplateMessage  SET ?', [template], (err, result) => {
        if (err) {
            // console.log(err)
            return res.status(500).json({ error: "Failed to insert data into MySQL" });

        }
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
        //  console.log(result)
        return res.status(200).json(result);
    });
});

router.put('/templatedataypdate/:templateid', (req, res) => {
    const templateid = req.params.templateid;
    const template = req.body;
    // console.log(template,templateid,"update")

    db.query('update TemplateMessage set  ? where templateid=?', [template, templateid], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to insert data into MySQL" });

        }
        // console.log(result)
        return res.status(200).json({ message: "Data update successfully" });

    })

})


router.delete('/templatedatadelete/:templateid', (req, res) => {
    const templateid = req.params.templateid;
    // console.log(templateid)

    db.query('Delete from  TemplateMessage where templateid=?', [templateid], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Failed to insert data into MySQL" });

        }
        // console.log(result)
        return res.status(200).json({ message: "Data delete successfully" });

    })

})
router.get('/gettemplateattachimage/:templateid', (req, res) => {
    const templateid = req.params.templateid;

    // console.log(templateid,"temp")
    const decryptId = decryption(templateid)
    // console.log(decryptId,"Dec");
    
    db.query('select templateimage from Templateattachement where templateid=?', [decryptId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Failed to insert data into MySQL" });
        }
        // if (results.length === 0) {
        //     return res.status(500).json({ error: "image not found" });
        // }
        // console.log(results,"templateeee")
        if (results.length === 0) {
            return res.status(200).json([]);
        }
        return res.status(200).json(results);

    })
})



router.post('/send-emailtemplate', async (req, res) => {
    try {
        const { templatemessage, emaildata, templateimagedata,Sendmailauth, Mailauthpass } = req.body;
        // console.log(templatemessage,emaildata,templateimagedata,Sendmailauth, Mailauthpass)


        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            // auth: {
            //     user: 'foxfahad386@gmail.com',
            //     pass: 'vwmh mtxr qdnk tldd',
            // },
            // auth: {
            //     user:process.env.MAIL_AUTH,
            //     pass: process.env.MAIL_PASS,
            // },
            auth: {
                user:Sendmailauth,
                pass:Mailauthpass,
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

            //Old code
            // const signatureDirectoryRelative = path.join('Backend', 'customer_master', 'public', 'Templateimage');

            
            // // Get the complete absolute path
            // const signatureDirectoryAbsolute = path.resolve(__dirname, '..', '..', '..', '..', signatureDirectoryRelative);

            //New code
            const signatureDirectoryRelative = path.join('Imagefolder', 'Templateimage');      
            // Get the complete absolute path
            const signatureDirectoryAbsolute = path.resolve(__dirname, '../../../../../../Imagefolder/Templateimage', signatureDirectoryRelative);

            // console.log(signatureDirectoryAbsolute);

            // const imagesHtml = templateimagedata.map(image => `<img src="cid:${image.templateimage}" alt="${image.alt}" />`).join('');

            const attachments = templateimagedata.map(image => ({
                filename: image.templateimage,
                content: fs.createReadStream(`${signatureDirectoryAbsolute}/${image.templateimage}`),

            }));
            // console.log(attachments)




            const finalMessage = `${personalizedMessage}`;
            // console.log(finalMessage,"mess")

            const customerMailOptions = {
                // from: 'foxfahad386@gmail.com',
                from:Sendmailauth,
                to: data.Email, // Ensure the correct key is used here
                subject: templatemessage.TemplateSubject,
                html: finalMessage,
                attachments: attachments
            };
            // attachments
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
        // console.log(error)
        res.status(500).json({ message: 'An error occurred while sending the email' });
    }
});

// router.get('/templategetimagedata/:templateid',(req,res)=>{
//     const templateid=req.params.templateid

//     db.query('select templateimage from Templateattachement where templateid=?',[templateid],(err,results)=>{
//         if(err){
//             return res.status(500).json({ error: "Failed to insert data into MySQL" });
//         }

//         if(results.length===0){
//             return res.status(500).json({ error: "templateid not found" });
//         }
//         console.log(results)
//         return res.status(200).json(results);

//     })

// })

// router.delete('/templatedeleteimageedata/:templateid', (req, res) => {
//     const templateid = req.params.templateid

//     db.query('select templateimage from Templateattachement where templateid=?', [templateid], (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: "Failed to insert data into MySQL" });
//         }

//         if (results.length === 0) {
//             return res.status(500).json({ error: "templateid not found" });
//         }
//         db.query('delete from Templateattachement where templateid=?', [templateid], (err, results1) => {

//             if (err) {
//                 return res.status(500).json({ error: "Failed to insert data into MySQL" });
//             }

//             results.forEach((row) => {
//                 const oldFileName = row.templateimage;

//                 if (oldFileName) {

//                     const oldImagePath = path.join('Backend', 'customer_master', 'public', 'Templateimage');

//                     // Get the complete absolute path
//                     const oldImagePathDirectoryAbsolute = path.resolve(__dirname, '..', '..', '..', '..', oldImagePath, oldFileName);



//                     // Check if the file exists
//                     if (fs.existsSync(oldImagePathDirectoryAbsolute)) {
//                         try {
//                             // Delete the file
//                             fs.unlinkSync(oldImagePathDirectoryAbsolute);
//                             // console.log('File deleted successfully:', oldFileName);
//                         } catch (error) {
//                             console.error('Error deleting file:', error);
//                         }
//                     } else {
//                         console.log('File does not exist:', oldFileName);
//                     }
//                 }
//             })

//             return res.status(200).json({ message: "Data delete successfully" });

//         })
//     })
// })
router.delete('/templatedeleteimageedata/:templateid', (req, res) => {
    const templateid = req.params.templateid

    db.query('select templateimage from Templateattachement where templateid=?', [templateid], (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Failed to insert data into MySQL" });
        }

        if (results.length === 0) {
            return res.status(500).json({ error: "templateid not found" });
        }
        db.query('delete from Templateattachement where templateid=?', [templateid], (err, results1) => {

            if (err) {
                return res.status(500).json({ error: "Failed to insert data into MySQL" });
            }

            results.forEach((row) => {
                const oldFileName = row.templateimage;

                if (oldFileName) {

                    const oldImagePath = path.join(`${imagePath}/Templateimage`,oldFileName);

                    // Check if the file exists
                   try{
                    fs.unlinkSync(oldImagePath)
                   }catch{
                    
                   }
                }
            })

            return res.status(200).json({ message: "Data delete successfully" });

        })
    })
})

// router.delete('/templatesingledataimage/:templateid/:templateimage', (req, res) => {
//     const templateid = req.params.templateid
//     const templateimage = req.params.templateimage
//     console.log(templateimage,"seletcted image dele");
    
//     db.query('delete from Templateattachement where templateid=? And templateimage=?', [templateid, templateimage], (err, results1) => {

//         if (err) {
//             return res.status(500).json({ error: "Failed to insert data into MySQL" });
//         }
//         if (templateimage) {
//             //old path
//             // const oldImagePath = path.join('Backend', 'customer_master', 'public', 'Templateimage');

//             //new path
//             const oldImagePath = path.join('../../../Imagefolder/Templateimage')

//             // Get the complete absolute path
//             const oldImagePathDirectoryAbsolute = path.resolve(__dirname, '..','..', '..', '..', '..', oldImagePath, templateimage);

//             // Check if the file exists
//             if (fs.existsSync(oldImagePathDirectoryAbsolute)) {
//                 try {
//                     // Delete the file
//                     fs.unlinkSync(oldImagePathDirectoryAbsolute);
//                     // console.log('File deleted successfully:', templateimage);
//                 } catch (error) {
//                     console.error('Error deleting file:', error);
//                 }
//             } else {
//                 console.log('File does not exist:', templateimage);
//             }
//         }
//         return res.status(200).json("image data delete siccessfully")
//     })
// })
router.delete('/templatesingledataimage/:templateid/:templateimage', (req, res) => {
    const templateid = req.params.templateid
    const templateimage = req.params.templateimage
    // console.log(templateimage,"seletcted image dele");
    
    db.query('delete from Templateattachement where templateid=? And templateimage=?', [templateid, templateimage], (err, results1) => {

        if (err) {
            return res.status(500).json({ error: "Failed to insert data into MySQL" });
        }
        if (templateimage) {
            //old path
            // const oldImagePath = path.join('Backend', 'customer_master', 'public', 'Templateimage');

            //new path
            const oldImagePath = path.join(`${imagePath}/Templateimage`, templateimage)

          try{
            fs.unlinkSync(oldImagePath)
          }catch{}
        }
        return res.status(200).json("image data delete siccessfully")
    })
})

router.get('/tabletemplateseatch', (req, res) => {
    const { searchText } = req.query;
    const decryptSearch = decryption(searchText);
    let query = 'SELECT * FROM TemplateMessage WHERE 1=1';
    let params = [];
    if (decryptSearch) {
        const columnsToSearch = [
            'Templateid',
            'TemplateName',
            'TemplateSubject',
            'TemplateMessageData',
        ]

        const likeConditions = columnsToSearch.map(column => `${column} LIKE ?`).join(' OR ');

        query += ` AND (${likeConditions})`;
        params = columnsToSearch.map(() => `${decryptSearch}%`);
    }
    db.query(query, params, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve vehicle details from MySQL' });
        }
        return res.status(200).json(result);
    });


})


router.get('/smsreportdata', async (req, res) => {
    const apiKey = process.env.SMS_ApiKey;
    const clientId = process.env.SMS_ClientId;

    try {
        db.query('SELECT * FROM SmsReport', async (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to retrieve SMS report details from MySQL' });
            }

            const promises = results.map(async (data) => {
                const statusApiUrl = `https://smsssl.dial4sms.com/api/v2/MessageStatus?ApiKey=${apiKey}&ClientId=${clientId}&MessageId=${data.SmsMessageid}`;

                try {
                    const response = await axios.get(statusApiUrl);
                    return {
                        ...data,
                        ...response.data.Data,
                    };
                } catch (apiError) {
                    // console.error(`Error fetching SMS status for MessageId ${data.SmsMessageid}:`, apiError.message);
                    return {
                        ...data,
                        smsStatus: null,
                        statusErrorCode: 'API_ERROR',
                        statusErrorDescription: apiError.message,
                    };
                }
            });

            const resultsWithStatus = await Promise.all(promises);
            res.json(resultsWithStatus);
        });
    } catch (error) {
        // console.error('Error handling SMS report data:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
    }
});




module.exports = router;