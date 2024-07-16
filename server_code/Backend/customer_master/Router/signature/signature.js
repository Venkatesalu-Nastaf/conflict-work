const express = require('express');
const router = express.Router();
const fs = require('fs'); // signature png
const db = require('../../../db');
const path = require('path'); // Import the path module
const multer = require('multer');

// router.post('/api/saveSignature', (req, res) => {
//     const { signatureData } = req.body;

//     const base64Data = signatureData.replace(/^data:image\/png;base64,/, '');
//     const imageBuffer = Buffer.from(base64Data, 'base64');

//     const imageName = `signature-${Date.now()}.png`; // Generate a unique image name
//     const imagePath = path.join(__dirname, 'path_to_save_images', imageName);

//     fs.writeFile(imagePath, imageBuffer, (error) => {
//         if (error) {
//             res.status(500).json({ error: 'Failed to save signature' });
//         } else {
//             const sql = 'INSERT INTO signatures (signature_path) VALUES (?)';
//             db.query(sql, [imagePath], (dbError, results) => {
//                 if (dbError) {
//                     res.status(500).json({ error: 'Failed to save signature' });
//                 } else {
//                     res.json({ message: 'Signature saved successfully' });
//                 }
//             });
//         }
//     });
// });



// const baseImagetripidPath = path.join(__dirname, 'path_to_save_images');
// const baseImagetripidPath = path.join('./','public', 'signature_images');
// console.log(baseImagetripidPath,"BASE")
// router.post('/api/saveSignaturewtid', (req, res) => {
//   const { signatureData, tripId, uniqueno } = req.body;
//   console.log(signatureData,"hhhhh")
//   const base64Data = signatureData.replace(/^data:image\/png;base64,/, '');
//   const imageBuffer = Buffer.from(base64Data, 'base64');
//   const imageName = `signature-${Date.now()}.png`;
//   const imagePath = path.join(baseImagetripidPath, imageName); // Use the base path
//   fs.writeFile(imagePath, imageBuffer,(error) => {
//     console.log(imagePath,"image")
//     if (error) {
//       res.status(500).json({ error: 'Failed to save signature' });
//     } else {
//       const relativeImagePath = path.relative(baseImagetripidPath, imagePath);
//       console.log(relativeImagePath,"relative")
//       const sql = 'UPDATE signatures SET signature_path = ? WHERE tripid = ? AND unique_number = ?';
//       db.query(sql, [relativeImagePath, tripId, uniqueno], (dbError, results) => {
//         if (dbError) {
//           res.status(500).json({ error: 'Failed to save signature' });
//         } else {
//           const uniqueNumber = generateUniqueNumbers();
//           const sql2 = 'UPDATE signatures SET unique_number = ? WHERE tripid = ? ';
//           db.query(sql2, [uniqueNumber, tripId], (dbError, results) => {
//             if (dbError) {
//               res.status(500).json({ error: 'Failed to save unique number' });
//             } else {
//               res.json({ message: 'Signature and unique number saved successfully' });
//             }
//           });
//         }
//       });
//     }
//   });
// });

router.use(express.static('customer_master'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './customer_master/public/signature_images')
  },
  filename: (req, file, cb) => {


    cb(null, `signature-${Date.now()}.png`);
  },



})


const uploadfile = multer({ storage: storage });

const baseImagetripidPath = 'customer_master/public/signature_images'; // Relative path to the base directory

router.post('/api/saveSignaturewtid', (req, res) => {
  const { signatureData, tripId, uniqueno } = req.body;
  const base64Data = signatureData.replace(/^data:image\/png;base64,/, '');
  const imageBuffer = Buffer.from(base64Data, 'base64');
  const imageName = `signature-${Date.now()}.png`;
  const imagePath = path.join(baseImagetripidPath, imageName); // Use the base path
  fs.writeFile(imagePath, imageBuffer, (error) => {
    if (error) {
      console.error('Error saving signature:', error);
      res.status(500).json({ error: 'Failed to save signature' });
    } else {
      const relativeImagePath = path.relative(baseImagetripidPath, imagePath);
      const sql = 'UPDATE signatures SET signature_path = ? WHERE tripid = ? AND unique_number = ?';
      db.query(sql, [relativeImagePath, tripId, uniqueno], (dbError, results) => {
        if (dbError) {
          console.error('Error updating database:', dbError);
          res.status(500).json({ error: 'Failed to update database' });
        } else {
          const uniqueNumber = generateUniqueNumbers();
          const sql2 = 'UPDATE signatures SET unique_number = ? WHERE tripid = ? ';
          const sql3='update tripsheet set apps="Closed" where tripid = ? ';
          db.query(sql2, [uniqueNumber, tripId], (dbError, results) => {
            if (dbError) {
              console.error('Error updating unique number:', dbError);
              res.status(500).json({ error: 'Failed to update unique number' });
            } else {
              db.query(sql3,[tripId],(err,results2)=>{
                if(err){
                  res.status(500).json({ error: 'Failed to update app status in tripsheet' });
                }
                if(results2.affectedRows>=1){

            
              res.json({ message: 'Signature and unique number saved successfully' });
                }
            })
            }
          });
        }
      });
    }
  });
});
function generateUniqueNumbers() {
  return Math.floor(10000 + Math.random() * 90000);
}
router.post('/api/uploadsignaturedata/:tripid', uploadfile.single('signature_image'), (req, res) => {

  const tripid = req.params.tripid;

  console.log(tripid)

  const signature_image = req.file.filename;

  if (signature_image !== null) {

    const uniqueNumber = generateUniqueNumbers();
    const checkIfExistsQuery = `SELECT * FROM signatures WHERE tripid = ?`;
    db.query(checkIfExistsQuery, [tripid], (err1, results) => {
      if (err1) {
        return res.status(500).json({ message: "Error checking profile existence", error: err1 });
      }
      if (results.length >= 1) {
        const sql = 'UPDATE signatures SET signature_path = ? WHERE tripid = ? ';
        db.query(sql, [signature_image, tripid], (dbError, results) => {
          if (dbError) {

            res.status(500).json({ error: 'Failed to update database' });
          }
        })
      }
      else {
        db.query('INSERT INTO signatures (tripid,signature_path,unique_number) VALUES (?, ?,?)', [tripid, signature_image, uniqueNumber], (err2, result) => {
          if (err2) {
            return res.status(500).json({ message: "err" });
          }
          console.log(result)
          return res.status(200).json({ message: "signature upload successfully" });
          // Use the base path
        })
      }
    })
  }
  else {
    return res.json("data are undefined")
  }


});

router.delete('/api/signatureimagedelete/:tripid', (req, res) => {
  const tripid = req.params.tripid;
  const sql = `SELECT signature_path FROM signatures WHERE tripid = ?`;
  db.query(sql, [tripid], (err1, results) => {
    if (err1) {
      return res.status(500).json({ message: "Error checking profile existence", error: err1 });
    }


    if (results.length >= 1) {
      db.query("DELETE FROM signatures WHERE tripid = ?", [tripid], (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Failed to delete data from MySQL" });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "data not found" });
        }
        const signimage = results[0].signature_path

        if (signimage) {

          const oldImagePath = path.join('Backend', 'customer_master', 'public', 'signature_images');


          // Get the complete absolute path
          const oldImagePathDirectoryAbsolute = path.resolve(__dirname, '..', '..', '..', '..', oldImagePath, signimage);



          // Check if the file exists
          if (fs.existsSync(oldImagePathDirectoryAbsolute)) {
            try {
              // Delete the file
              fs.unlinkSync(oldImagePathDirectoryAbsolute);
              console.log('File deleted successfully:', signimage);
            } catch (error) {
              console.error('Error deleting file:', error);
            }
          } else {
            console.log('File does not exist:', signimage);
          }
        }

      })
      return res.status(200).json({ message: "Data deleted successfully" });

    }
  })
})

// function generateUniqueNumbers() {
//   return Math.floor(10000 + Math.random() * 90000);
// }


module.exports = router;