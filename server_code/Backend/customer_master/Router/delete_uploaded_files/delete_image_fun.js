const express = require('express');
const router = express.Router();
const db = require('../../../db');
const fs = require('fs');
const path = require('path');

router.use(express.static('customer_master'));



/////---image delete --for register ->employee- TO Delete
// TO Delete
router.delete('/image-delete/:filename', (req, res) => {
    const sql = "delete from rigister_employee_doc where fileName=?";
    const fileName = req.params.filename;
    const oldFileName = req.params.filename;
    if (oldFileName) {
        const oldImagePath = path.join("./customer_master/public/employee_doc", oldFileName);
        try {
            fs.unlinkSync(oldImagePath)
        } catch { }

    }
    db.query(sql, [fileName], (err, result) => {
        if (err) return res.json({ Message: "Error inside serevre" });
        return res.json(result);
    })
})

// ------------------------
/////---image delete --for register ->supplier-vehicle- TO Delete
// TO Delete
router.delete('/vehicle_documents/:filename', (req, res) => {
    const sql = "delete from vehicle_documents where fileName=?";
    const sqlselectcommand = "select * from vehicle_documents where fileName=?"
    const fileName = req.params.filename;
    const fileNames1 = fileName.split(',')


    fileNames1.forEach((fileName) => {
        const oldFileName = fileName;

        db.query(sqlselectcommand, [oldFileName], (err, results) => {
            if (err) {
                console.log(err, 'error');
            }
            if (results.length >= 1) {
                db.query(sql, [oldFileName], (err, result) => {
                    if (err) {
                        console.error("Error executing SQL query:", err);
                        return res.status(500).json({ Message: "Error inside server" });
                    }
                });
            }
            const oldImagePath = path.join("./customer_master/public/vehicle_doc", oldFileName);
            try {
                fs.unlinkSync(oldImagePath);
            } catch {
            }
        })
    });
})

router.delete('/driver_proof/:filename', (req, res) => {
    const sql = "delete from driver_proof where fileName=?";
    const sqlselectcommand = "select * from driver_proof where fileName=?"
    const fileNames = req.params.filename; // Assuming filenames are sent in the request body as an array

    const fileNames1 = fileNames.split(',')
    fileNames1.forEach((fileName) => {
        const oldFileName = fileName;
        db.query(sqlselectcommand, [oldFileName], (err, result) => {
            if (err) {
                console.log(err, 'error');
            }
            db.query(sql, [oldFileName], (err, result) => {
                if (err) {
                    console.error("Error executing SQL query:", err);
                    return res.status(500).json({ Message: "Error inside server" });
                }
            });

            if (oldFileName) {
                const oldImagePath = path.join("./customer_master/public/driver_doc", oldFileName);
                try {
                    fs.unlinkSync(oldImagePath);
                } catch (error) {
                    console.error("Error deleting file:", error);
                }
            }
        })
    });

    return res.status(200).json({ Message: "Files deleted successfully" });
});


/////---image delete --for register ->employee- TO Delete
// TO Delete
router.delete('/booking_doc/:filename', (req, res) => {
    const sql = "delete from booking_doc where fileName=?";
    const fileName = req.params.filename;
    const oldFileName = req.params.filename;

    if (oldFileName) {
        const oldImagePath = path.join("./customer_master/public/booking_doc", oldFileName);
        if (fs.existsSync(oldImagePath)) {
            try {
                // Delete the file
                fs.unlinkSync(oldImagePath);
            } catch (error) {
                console.error('Error deleting file:', error);
            }
        } else {
            console.log('File does not exist:', oldFileName);
        }
    }
    db.query(sql, [fileName], (err, result) => {
        if (err) return res.json({ Message: "Error inside serevre" });
        return res.json(result);
    })
})




router.delete('/tripsheet-imagedelete', (req, res) => {
    // const tripid = req.params.tripid
    const pathimage = req.query.path
    const sql = 'delete from tripsheetupload where path=?';
    const sql2 = 'delete from booking_doc where path=?'
    // const removeFromLocal = path.join("./uploads", pathimage)
    const removeFromLocal = path.join(__dirname, 'customer_master', 'public', 'imagesUploads_doc');
    // const removeFromLocal = path.join(__dirname, "uploads", pathimage)

    const removeFile = () => {
        if (fs.existsSync(removeFromLocal)) {
            try {
                fs.unlinkSync(removeFromLocal)
            } catch (err) {
                console.log("err", err)
            }
        } else {
            console.log("file dosent exist")
        }
    }



    db.query(sql, [pathimage], (err, result) => {
        if (err) return res.status(500).json({ message: err.message, success: false })

        if (result.affectedRows > 0) {
            removeFile()
            return res.json({ message: "file deleted sucess", success: true })
        }
        else {

            db.query(sql2, [pathimage], (err, result) => {
                if (err) return res.status(500).json({ message: err.message, success: false })

                if (result.affectedRows > 0) {
                    removeFile()
                    return res.json({ message: "file deleted sucess", success: true })
                }
            })
        }

    })

})


//delte attached doc  in BOOKING

// router.delete('/booking_doc-delete/:imagedata/:tripid', (req, res) => {
//     const image = req.params.imagedata
//     const deleteImage = image.split(',')
// const  tripid = req.params.tripid;
//     const sql = 'delete from booking_doc where path =? and booking_id'
//     // const findImage = 'select * from booking_doc where booking_id = ?'
// console.log("tripid",tripid,deleteImage)
//     deleteImage.forEach((img) => {
      
          
//                 db.query(sql, [img,tripid], (err, result) => {
//                     if (err) {
//                         console.log("err", err);
//                         res.status(500).json({ message: "error inside server when deleteing image ", success: false })
//                     }
                
            
//             const deleteImagePath = path.join('./uploads', img)
//             if (fs.existsSync(deleteImagePath)) {
//                 try {
//                     fs.unlinkSync(deleteImagePath)
//                 } catch (err) {
//                     console.log("err", err)
//                 }

//             } else {
//                 console.log("file dosent exist")
//             }

//             res.json({ success: true, message: "sucess" })
//         })
//     })
// })


// Replace with your actual database connection

router.delete('/booking_doc-delete/:imagedata/:tripid', async (req, res) => {
    const image = req.params.imagedata;
    const deleteImage = image.split(',');
    const tripid = req.params.tripid;

    const sql = 'DELETE FROM booking_doc WHERE path = ? AND booking_id = ?';

    try {
        // Create an array of promises for deletion
        const deletePromises = deleteImage.map((img) => {
            return new Promise((resolve, reject) => {
                db.query(sql, [img, tripid], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        // const deleteImagePath = path.join('./uploads', img);
                        const deleteImagePath = path.join(__dirname, 'customer_master', 'public', 'imagesUploads_doc');
                        if (fs.existsSync(deleteImagePath)) {
                            try {
                                fs.unlinkSync(deleteImagePath);
                                resolve({ success: true, message: `Deleted ${img}` });
                            } catch (err) {
                                reject(err);
                            }
                        } else {
                            console.log(`File ${img} does not exist`);
                            resolve({ success: true, message: `File ${img} does not exist` });
                        }
                    }
                });
            });
        });

        // Wait for all deletion promises to resolve
        const results = await Promise.all(deletePromises);
        res.json({ success: true, message: "All files processed", results });
    } catch (err) {
        console.error("Error deleting images or database records", err);
        res.status(500).json({ success: false, message: "Error processing request", error: err.message });
    }
});




// router.delete('/booking_doc-delete/:imagedata/:tripid', async (req, res) => {
//     const image = req.params.imagedata;
//     const  tripid = req.params.tripid;
//     const deleteImage = image.split(',');

//     const sql = 'DELETE FROM booking_doc WHERE path = ?';
//     const findImage = 'SELECT * FROM booking_doc WHERE booking_id = ?';

//     try {
//         for (const img of deleteImage) {
//             // Check if the image exists in the database
//             const rows = await db.query(findImage, [tripid]);
//             if (rows.length > 0) {
//                 // Delete the image from the database
//                 await db.query(sql, [img]);
//             }

//             // Delete the file from the file system
//             const deleteImagePath = path.join('./uploads', img);
//             if (fs.existsSync(deleteImagePath)) {
//                 try {
//                     fs.unlinkSync(deleteImagePath);
//                 } catch (err) {
//                     console.error(`Error deleting file: ${img}`, err);
//                 }
//             } else {
//                 console.log(`File does not exist: ${img}`);
//             }
//         }

//         res.json({ success: true, message: 'Success' });
//     } catch (err) {
//         console.error('Error processing request:', err);
//         res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// });





module.exports = router;