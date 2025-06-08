const express = require('express');
const router = express.Router();
const db = require('../../../db');
const multer = require('multer');
const path = require('path');
const decryption = require('../dataDecrypt')
const imagePath = require('../../../imagepath')
// console.log(imagePath,"employee");

// Add Customer Master database
router.post('/employees', (req, res) => {
    const customerData = req.body;
    db.query('INSERT INTO employees SET ?', customerData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to insert data into MySQL' });
        }
        return res.status(200).json({ message: 'Data inserted successfully' });
    });
});

// Delete Customer Master data
router.delete('/employees/:empid', (req, res) => {
    const empid = req.params.empid;
    db.query('DELETE FROM employees WHERE empid = ?', empid, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete data from MySQL' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        return res.status(200).json({ message: 'Data deleted successfully' });
    });
});

// Update Customer Master details
router.put('/employees/:empid', (req, res) => {
    const empid = req.params.empid;

    // console.log(empid, "for checking");
    
    const updatedCustomerData = req.body;

    // console.log(updatedCustomerData," values of employess");
    
    db.query('UPDATE employees SET ? WHERE empid = ?', [updatedCustomerData, empid], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update data in MySQL' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        // console.log(result, "values");
       
        return res.status(200).json({ message: 'Data updated successfully' });
    });
});

// Collect data for Customer Master table
router.get('/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
        }
        return res.status(200).json(results);
    });
});

//for user profile information
router.get('/userdataforuserinfo/:userid', (req, res) => {
    // const userid = req.params.userid;
    const encryptId = req.params.userid;

    // console.log(encryptId,"id encryption");
    
    const decryptId = decryption(encryptId)
    // console.log(decryptId,"checking");
    
  
    db.query('SELECT * FROM usercreation WHERE userid = ?', decryptId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve route data from MySQL' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Route data not found' });
        }
        const routeData = result;
        // console.log(result,"rtyuio");
     
        return res.status(200).json(routeData);
    });
});

router.get('/table-for-employee', (req, res) => {
    const {searchText } = req.query;

    // console.log(searchText,"backend");

    const decryptSearch = decryption(searchText)

    // console.log(decryptSearch,"decrypt value");
    
    let query = 'SELECT * FROM employees WHERE 1=1';
    let params = [];

    if (decryptSearch) {
        const columnsToSearch = [
            'empid',
            'empname',
            'empemailid',
            'empmobile',
            'jobroll',
            'joiningdate',
            'gender',
            'bloodgroup',
            'address1',
            'aadharcard',
            'pancard',
            'guardian',
            'fixedsalary',
            'uanid',
            'esino',
            'licenceno',
        ];

        const likeConditions = columnsToSearch.map(column => `${column} LIKE ?`).join(' OR ');

        query += ` AND (${likeConditions})`;
        params = columnsToSearch.map(() => `%${decryptSearch}%`);
    }

    db.query(query, params, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve vehicle details from MySQL' });
        }
        return res.status(200).json(result);
    });
});


//---------------Rigister->employee-------------------

// its for make folder puclicc
// router.use(express.static('customer_master'));

// // its for multer file- 1
// const employee_storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './customer_master/public/employee_doc')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//     }
// })

// router.use(express.static('Imagefolder'));

// its for multer file- 1
const employee_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // cb(null, '../../../Imagefolder/employee_doc')
         cb(null, `${imagePath}/employee_doc`)
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const employee_uploadfile = multer({ storage: employee_storage });

router.post('/employee-pdf/:id', employee_uploadfile.single("file"), async (req, res) => {

    const emp_id = req.params.id;

    const fileName = req.file.filename;

    const fileType = req.file.mimetype;
   
  
    const sql = "INSERT INTO rigister_employee_doc (emp_id,fileName,file_type) VALUES (?,?,?)";

    db.query(sql,[emp_id, fileName, fileType],(err, result) => {
        if (err) return res.json({ Message: "Error" });
        // console.log(result,"full result");

        return res.json({ Status: "success" });
    })
})

//-----------------fetch ---------------
router.get('/employee-docView/:id', (req, res) => {
    const id = req.params.id
    const sql = 'select * from rigister_employee_doc where emp_id=?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "error" })
        return res.json(result);
    })
})

//--------------------------------------------------------------------------------------

router.get("/getuniqueusercreationdata/:Username",(req,res)=>{
    // const username=req.params.Username;
    const encryptedUsername = req.params.Username;

    // console.log(encryptedUsername,"encryptname");
   
    const username = decryption(encryptedUsername);

    // console.log(username,"decrypt username");
    
    if(!username){
        return res.status(400).json({error:"Failed to decrypt the username"})
    }
    // console.log(username,"params")
    db.query("select username from  usercreation where username=?",[username],(err,results)=>{
      if (err) {
        return res.status(500).json({ error: 'Failed to delete data from MySQL' });
      }
    //    console.log(results,"checking the username");
       
      return res.status(200).json(results);
    })
  })

module.exports = router;