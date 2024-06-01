const express = require('express');
const router = express.Router();
const db = require('../../../db');
const fs=require('fs');
const path=require('path');

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
    // const oldFileName= req.params.filename;
    const fileNames1 = fileName.split(',')
    fileNames1.forEach((fileName) => {
        const oldFileName = fileName;
    
         db.query(sqlselectcommand,[oldFileName],(err,results)=>{
        if(err){
            console.log(err,'error');
        }
         if (results.length>=1)
        {
        db.query(sql, [oldFileName], (err, result) => {
            if (err) {
                console.error("Error executing SQL query:", err);
                return res.status(500).json({ Message: "Error inside server" });

                
            }
            console.log("File deleted:", oldFileName);
            
        });
    }
        const oldImagePath = path.join("./customer_master/public/vehicle_doc", oldFileName);
        try {
            fs.unlinkSync(oldImagePath);
        } catch  {
            // console.error("Error deleting file:", error);
        }
    
    })
  
});
})
  
   

/////---image delete --for register ->employee- TO Delete
// TO Delete
// router.delete('/driver_proof/:filename', (req, res) => {
//     const sql = "delete from driver_proof where fileName=?";
//     const fileName = req.params.filename;

//     const oldFileName = req.params.filename;
//        console.log(oldFileName,"gvhbjnkl")
     
//     if (oldFileName) {
//       const oldImagePath = path.join("./customer_master/public/driver_doc", oldFileName);
//       try {
//         fs.unlinkSync(oldImagePath)
//       } catch { }
//     }
//     db.query(sql, [fileName], (err, result) => {
//         if (err) return res.json({ Message: "Error inside serevre" });
//         return res.json(result);
//     })
// })

router.delete('/driver_proof/:filename', (req, res) => {
  const sql = "delete from driver_proof where fileName=?";
  const sqlselectcommand = "select * from driver_proof where fileName=?"
  const fileNames = req.params.filename; // Assuming filenames are sent in the request body as an array

  // if (!fileNames || !Array.isArray(fileNames) || fileNames.length === 0) {
  //     return res.status(400).json({ Message: "No filenames provided or invalid data format" });
  
  // }
  const fileNames1 = fileNames.split(',')

console.log(fileNames1,typeof(fileNames1),'ffffff');
  fileNames1.forEach((fileName) => {
      const oldFileName = fileName;
      


     
      db.query(sqlselectcommand,[oldFileName],(err,result)=>{
          if(err){
              console.log(err,'error');
          }
          console.log(result,'result');
          db.query(sql, [oldFileName], (err, result) => {
              if (err) {
                  console.error("Error executing SQL query:", err);
                  return res.status(500).json({ Message: "Error inside server" });

                  
              }
              console.log("File deleted:", oldFileName);
          });
          
      if (oldFileName) {
          // const oldImagePath = path.join("./public/images", oldFileName);
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
      console.log(oldImagePath)
    //   try {
    //     fs.unlinkSync(oldImagePath)
    //   } catch { }
    if (fs.existsSync(oldImagePath)) {
        try {
            // Delete the file
            fs.unlinkSync(oldImagePath );
            console.log('File deleted successfully:', oldFileName);
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    } else {
        console.log('File does not exist:', oldFileName);
    }
    }
    db.query(sql, [fileName], (err, result) => {
        if (err) return res.json({ Message: "Error inside serevre" });
        console.log(result)
        return res.json(result);
    })
})











module.exports = router;