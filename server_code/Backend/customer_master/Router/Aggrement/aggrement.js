const express = require('express');
const router = express.Router();
const db = require('../../../db');
const multer = require('multer');
const path = require('path');
router.use(express.static('customer_master'));

// add Aggrement database

// router.post('/agreementdatas', (req, res) => {
//     const customerData = req.body;
//     console.log(customerData,"dd")
//     db.query('INSERT INTO Aggrement SET ?', customerData, (err, result) => {
//         if (err) {
//             console.log(err,'ghjjjj');
            
//             return res.status(500).json({ error: 'Failed to insert data into MySQL' });
//         }
//         console.log(result,'yuiiiiiiiii');
        
//         return res.status(200).json({ message: 'Data inserted successfully' });
//     });
// });
// router.get('/Customerdatasfetch', (req, res) => {
//     const sql = 'SELECT  customer,address1, gstnumber FROM customers';
//     db.query(sql, (err, result) => {
//         console.log(err);
        
//         if (err) {
//             return res.status(500).json({ error: "Failed to retrieve data from MySQL" });
//         }
//         console.log(result);
        
//         return res.status(200).json(result);
//     });
// }); 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './customer_master/public/agreement_doc');
    },
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}_${Date.now()}-${file.originalname}`);
    },
  });
  
  const uploadfile = multer({ storage: storage });
  
  // Endpoint to handle file upload and insert data
  router.post('/agreementdocumentimage', uploadfile.single('Agreement_Image'), (req, res) => {
    let Agreement_Image = null;
  
    if (!req.file) {
      Agreement_Image = null;
    } else {
      Agreement_Image = req.file.filename;
    }
    console.log(Agreement_Image, "Uploaded Image");
  
    const {
      customer,
      fromdate,
      toDate,
      email,
      mobileno,
      address,
      gstno,
    } = req.body;
  
    console.log(
      customer,
      fromdate,
      toDate,
      email,
      mobileno,
      address,
      gstno
    );
  
    // Check if an entry for the customer already exists in agreement_image
    const checkSql = `
      SELECT id FROM agreement_image WHERE customer = ?
    `;
  
    db.query(checkSql, [customer], (err, checkResult) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Failed to check existing data in agreement_image table" });
      }
  
      // Insert data into Aggrement table without the image
      const aggrementSql = `
        INSERT INTO Aggrement (customer, fromdate, todate, email, mobileno, address, gstno) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
  
      db.query(aggrementSql, [
        customer,
        fromdate,
        toDate,
        email,
        mobileno,
        address,
        gstno
      ], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Failed to insert data into Aggrement table" });
        }
  
        // Get the inserted ID from Aggrement table
        const aggrementId = result.insertId;
  
        // Insert Agreement_Image into agreement_image table
        if (Agreement_Image) {
          const agreementImageSql = `
            INSERT INTO agreement_image (customer, Agreement_Image) 
            VALUES (?, ?)
          `;
  
          db.query(agreementImageSql, [customer, Agreement_Image], (err, imageResult) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ error: "Failed to insert Agreement_Image into agreement_image table" });
            }
  
            return res.status(200).json({ message: "Data and image inserted successfully" });
          });
        } else {
          return res.status(200).json({ message: "Data inserted successfully, no image uploaded" });
        }
      });
    });
  });

//   router.post('/agreementpdf_Document/:id',uploadfile.single("file"), async (req, res) => {
//     const customer = req.params.id;
//     const fileType = req.file.mimetype;
//     const sql = `insert into agreement_image(customer,Agreement_,file_type)values(${customer},'${fileType}')`;
//     db.query(sql, (err, result) => {
//         if (err) return res.json({ Message: "Error" });
//         return res.json({ Status: "success" });
//     })
// })

  router.get('/agreement_Docview/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT Agreement_Image FROM agreement_image WHERE customer = ?';
    
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Error retrieving data from agreement_image table" });
      }
    //   console.log(result ,"uuuuuuuuuuuuuuuuu");
      
      return res.status(200).json(result);
      
    });
  });


// TO Delete
router.delete('/agreementimage-delete/:filename', (req, res) => {
    const sql = "delete from agreement_image where Agreement_Image=?";
    const fileName = req.params.filename;
    const oldFileName = req.params.filename;
    if (oldFileName) {
        const oldImagePath = path.join("./customer_master/public/agreement_doc", oldFileName);
        try {
            fs.unlinkSync(oldImagePath)
        } catch { }

    }
    db.query(sql, [fileName], (err, result) => {
        if (err) return res.json({ Message: "Error inside serevre" });
        return res.json(result);
    })
})


router.get('/Customerdatasfetch', (req, res) => {
    const sql = `
        SELECT 
            customers.customer, 
            customers.address1, 
            customers.gstnumber, 
            customerOrderdata.orderByEmail,
            customerOrderdata.orderByMobileNo   
        FROM customers
        JOIN customerOrderdata
        ON customers.customer = customerOrderdata.customer
    `;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Failed to retrieve data from MySQL" });
        }
        console.log(result);
        return res.status(200).json(result);
    });
});


router.put('/agreementedit/:id', (req, res) => {
    const email= req.params.id
    const updatedCustomerData = req.body;
    console.log(email,"dddd",updatedCustomerData)
    db.query('UPDATE Aggrement SET ? WHERE id = ?', [updatedCustomerData,email], (err,  result) => {
        if (err) {
            console.log(err,"agg")
            return res.status(500).json({ error: 'Failed to update data in MySQL' });
        }
        console.log(result,"agg")
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        console.log(result,"agg")
        return res.status(200).json({ message: 'Data updated successfully' });
    });
});

// Delete Customer Master data
// Delete Customer Master data
    router.delete('/aggreementdeleteid/:id', (req, res) => {
        const id = req.params.id; 

        db.query('DELETE FROM Aggrement WHERE id = ?', [id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to delete data from MySQL' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Customer not found' });
            }
            return res.status(200).json({ message: 'Data deleted successfully' });
        });
    });

router.get('/agreementdata', (req, res) => {
    db.query('SELECT * FROM Aggrement', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
        }
        return res.status(200).json(results);
    });
});

module.exports = router;    