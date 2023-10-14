const express = require('express');
const router = express.Router();
const fs = require('fs'); // signature png
const db = require('../../../db');

router.post('/api/saveSignature', (req, res) => {
    const { signatureData } = req.body;

    const base64Data = signatureData.replace(/^data:image\/png;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    const imageName = `signature-${Date.now()}.png`; // Generate a unique image name
    const imagePath = path.join(__dirname, 'path_to_save_images', imageName);

    fs.writeFile(imagePath, imageBuffer, (error) => {
        if (error) {
            console.error('Error saving signature image:', error);
            res.status(500).json({ error: 'Failed to save signature' });
        } else {
            const sql = 'INSERT INTO signatures (signature_path) VALUES (?)';
            db.query(sql, [imagePath], (dbError, results) => {
                if (dbError) {
                    console.error('Error saving signature data:', dbError);
                    res.status(500).json({ error: 'Failed to save signature' });
                } else {
                    res.json({ message: 'Signature saved successfully' });
                }
            });
        }
    });
});

module.exports = router;
