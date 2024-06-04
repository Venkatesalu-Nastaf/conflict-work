
const express = require('express');
const router = express.Router();
const db = require('../../../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Import the cors middleware

router.use(cors());
router.use(express.static('customer_master'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './customer_master/public/user_profile')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})



router.post('/usercreation-add', async (req, res) => {
  const { book, permissionsData } = req.body;
  const { username, stationname, designation, organizationname, userpassword, active } = book;

  try {
    await db.query(`INSERT INTO usercreation ( username, stationname, designation,organizationname, userpassword, active)
VALUES (?,?,?,?,?,?)`, [username, stationname, designation, organizationname, userpassword, active]);

    db.query(
      'SELECT userid FROM usercreation WHERE username = ?', [username], (err, result) => {

        const userid = result[0]?.userid

        if (userid) {
          for (const permission of permissionsData) {
            db.query(
              'INSERT INTO user_permissions(user_id, name, `read`, `new`, `modify`, `delete`) VALUES (?, ?, ?, ?, ?, ?)',
              [userid, permission.name, permission.read, permission.new, permission.modify, permission.delete]
            );
          }

          res.status(200).json({ message: 'Permissions saved successfully' });

        }
      });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// user Deletion
router.delete('/usercreation-delete/:userid', (req, res) => {

  const userid = req.params.userid;

  // Delete from user_permissions table
  db.query('DELETE FROM user_permissions WHERE user_id = ?', userid, (err, permissionResult) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete permissions data from MySQL" });
    }

    // Delete from usercreation table------
    db.query('DELETE FROM usercreation WHERE userid = ?', userid, (err, userResult) => {
      if (err) {
        return res.status(500).json({ error: "Failed to delete user data from MySQL" });
      }

      // Check if any rows were affected
      if (userResult.affectedRows === 0 && permissionResult.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      // Send success response
      return res.status(200).json({ message: "Data deleted successfully" });
    });
  });
});



// update user creation ---------------------------------------------------

router.put('/usercreation-edit/:userid', async (req, res) => {

  const { updatedCustomer, permissionsData } = req.body;
  const { userid, username, stationname, designation, organizationname, userpassword, active,mobileno,email } = updatedCustomer;
  

  try {
    // Clear existing permissions for the user
    await db.query('DELETE FROM user_permissions WHERE user_id = ?', [userid]);

    // Insert new permissions
    for (const permission of permissionsData) {
      await db.query(
        'INSERT INTO user_permissions(user_id, name, `read`, `new`, `modify`, `delete`) VALUES (?, ?, ?, ?, ?, ?)',
        [userid, permission.name, permission.read, permission.new, permission.modify, permission.delete]
      );
    }



    
    // Update user details
   await db.query(
      'UPDATE usercreation SET  username=?, stationname=?, designation=?, organizationname=?, userpassword=?,active=?,mobileno=?,email=? WHERE userid = ?',
      [username, stationname, designation, organizationname, userpassword, active,mobileno,email,userid]
    ); 

    res.status(200).json({ message: 'Permissions saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//---------------------------------------------

router.get('/user-permissionget/:userid', (req, res) => {
  const userid = req.params.userid;
  console.log("per userid ", userid)

  try {
    let query = 'SELECT * FROM user_permissions where user_id=?';

    db.query(query, [userid], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch permission from MySQL' });
      }
      return res.status(200).json(results);
    });

  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch permission from MySQL' });

  }

});


//  -----------------------------------------------

router.get('/usercreation', (req, res) => {
  const filterValue = req.query.filter; // Assuming you want to filter based on a query parameter 'filter'
  let query = 'SELECT * FROM usercreation';

  if (filterValue) {
    // Add a WHERE clause to filter based on the query parameter
    query += ` WHERE userid = '${filterValue}'`; // Replace 'column_name' with the actual column name you want to filter on
  }

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }
    return res.status(200).json(results);
  });
});

//------------------------------

router.get('/usercreationgetdata/:value', (req, res) => {
  const { value } = req.query;
  let query = 'SELECT * FROM usercreation WHERE 1=1';
  let params = [];

  if (value) {
    const columnsToSearch = [
      'userid',
      'username',
      'stationname',
      'designation',
      'organizationname',
      'ufirstname',
      'ulastname',
      'mobileno',
      'email',
    ];

    const likeConditions = columnsToSearch.map(column => `${column} LIKE ?`).join(' OR ');

    query += ` AND (${likeConditions})`;
    params = columnsToSearch.map(() => `%${searchText}%`);
  }

  db.query(query, params, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve vehicle details from MySQL' });
    }
    return res.status(200).json(result);
  });
});




router.put('/userprofileupload/:id', upload.single('image'), (req, res) => {
  const userId = req.params.id;
  const fileName = req.file.filename;


  // Check if the user profile already exists
  const checkIfExistsQuery = `SELECT * FROM user_profile WHERE userid = ?`;
  db.query(checkIfExistsQuery, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ Message: "Error checking profile existence", err });
    }

    if (rows.length > 0) {

      // to unlink image file
      const oldFileName = rows[0].filename;

      if (oldFileName) {
        const oldImagePath = path.join("./customer_master/public/user_profile", oldFileName);
        try {
          fs.unlinkSync(oldImagePath)
        } catch { }
      }

      // Profile already exists, update the record
      const updateQuery = `UPDATE user_profile SET filename = ? WHERE userid = ?`;
      db.query(updateQuery, [fileName, userId], (err, result) => {
        if (err) {
          return res.status(500).json({ Message: "Error updating profile picture", err });
        }
        return res.status(200).json({ Status: "success" });
      });
    }
    else {
      // Profile doesn't exist, insert a new record
      const insertQuery = `INSERT INTO user_profile (userid, filename) VALUES (?, ?)`;
      db.query(insertQuery, [userId, fileName], (err, result) => {
        if (err) {
          return res.status(500).json({ Message: "Error inserting profile picture", err });
        }
        return res.status(200).json({ Status: "success" });
      });
    }
  });
});

//getting user profile

router.get('/userprofileview/:id', (req, res) => {
  const userid = req.params.id
  const sql = 'select * from user_profile where userid=?';
  db.query(sql, [userid], (err, result) => {
    if (err) return res.json({ Message: "error" })

    return res.json(result);
  })
})


router.put("/usercreationdataupdate/:editid",(req,res)=>{
  const editid=req.params.editid
  const updatedata=req.body

  const {username,designation,userpassword,email,mobileno}=updatedata

  db.query("update usercreation set username=?,designation=?,userpassword=?,email=?,mobileno=? where userid=?",[username,designation,userpassword,email,mobileno,editid],(err,results)=>
  {
    if(err){
      return res.status(500).json({ Message: "Error updating data", err });
    }

    return res.status(200).json(results)
  })
  
})



module.exports = router;