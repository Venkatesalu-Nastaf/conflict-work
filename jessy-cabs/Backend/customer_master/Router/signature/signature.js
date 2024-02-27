const express = require('express');
const router = express.Router();
const fs = require('fs'); // signature png
const db = require('../../../db');
const path = require('path'); // Import the path module

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



const baseImagetripidPath = path.join(__dirname, 'path_to_save_images');
router.post('/api/saveSignaturewtid', (req, res) => {
  const { signatureData, tripId, uniqueno } = req.body;
  const base64Data = signatureData.replace(/^data:image\/png;base64,/, '');
  const imageBuffer = Buffer.from(base64Data, 'base64');
  const imageName = `signature-${Date.now()}.png`;
  const imagePath = path.join(baseImagetripidPath, imageName); // Use the base path
  fs.writeFile(imagePath, imageBuffer, (error) => {
    if (error) {
      res.status(500).json({ error: 'Failed to save signature' });
    } else {
      const relativeImagePath = path.relative(baseImagetripidPath, imagePath);
      const sql = 'UPDATE signatures SET signature_path = ? WHERE tripid = ? AND unique_number = ?';
      db.query(sql, [relativeImagePath, tripId, uniqueno], (dbError, results) => {
        if (dbError) {
          res.status(500).json({ error: 'Failed to save signature' });
        } else {
          const uniqueNumber = generateUniqueNumbers();
          const sql2 = 'UPDATE signatures SET unique_number = ? WHERE tripid = ? ';
          db.query(sql2, [uniqueNumber, tripId], (dbError, results) => {
            if (dbError) {
              res.status(500).json({ error: 'Failed to save unique number' });
            } else {
              res.json({ message: 'Signature and unique number saved successfully' });
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


module.exports = router;