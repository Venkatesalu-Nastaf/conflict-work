const express = require('express');
const router = express.Router();
const db = require('../../../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Import the cors middleware
const nodemailer = require('nodemailer');
const decryption = require('../dataDecrypt');


router.use(cors());
// router.use(express.static('customer_master'));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './customer_master/public/user_profile')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//   }
// })

// const upload = multer({
//   storage: storage
// })

router.get('/TemplateUser--Creation', async (req, res) => {
  const query = 'SELECT TemplateMessageData FROM TemplateMessage WHERE TemplateInfo = "UserCreation"'
  db.query(query, (err, results) => {
    if (err) {
      // console.log(err, 'errorrrr')
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }
    // console.log(results,"reesss")
    return res.status(200).json(results);
  })
})

router.post('/usercreation-add', async (req, res) => {
  const { book, permissionsData, organistaionsendmail, created_at, templateMessageData } = req.body;
  const { username, stationname, designation, organizationname, employeeid, EmailApp_Password, Sender_Mail, userpassword, active, email, mobileno,RoleUser } = book;
  const { Sender_Email, Email_Password } = organistaionsendmail;
  const themesdata = "theme1";

  // console.log(templateMessageData, 'ghjk', `${templateMessageData}`);
  // console.log(Sender_Email, Email_Password, 'emilllllllllll');

  // console.log(username, stationname, designation, organizationname, employeeid, userpassword, active, email, mobileno,RoleUser,created_at,RoleUser);
  const idString = stationname.join(',');
  // console.log(idString, "ff");
  const datarole = RoleUser || "None" ;

  try {
    await db.query(`INSERT INTO usercreation ( username, stationname, designation,organizationname,employeeid,userpassword,EmailApp_Password,Sender_Mail,active,email,mobileno,theme,created_at,RoleUser)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [username, idString, designation, organizationname, employeeid, userpassword, EmailApp_Password, Sender_Mail, active, email, mobileno, themesdata, created_at,datarole]);

    // Set up the mail transporter
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: Sender_Email,
        pass: Email_Password
      }
    });

    // If templateMessageData exists, replace both username and userpassword placeholders
    const emailContent = templateMessageData
      ? templateMessageData.replace(/\${username}/g, username).replace(/\${userpassword}/g, userpassword) // Global replacement
      : `<p>Hi ${username},<br>UserName: ${username}<br>Password: ${userpassword}</p>`;

    const mailOptions = {
      from: Sender_Email,
      to: email,
      subject: 'Credential Details',
      html: emailContent // Use the modified emailContent
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    db.query('SELECT userid FROM usercreation WHERE username = ?', [username], (err, result) => {
      const userid = result[0]?.userid;

      if (userid) {
        for (const permission of permissionsData) {
          db.query(
            'INSERT INTO user_permissions(user_id, name, `read`, `new`, `modify`, `delete`, `created_at`) VALUES (?, ?, ?, ?, ?, ?,?)',
            [userid, permission.name, permission.read, permission.new, permission.modify, permission.delete, created_at]
          );
        }

        res.status(200).json({ message: 'Permissions saved successfully' });
      }
    });

  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// router.post('/usercreation-add', async (req, res) => {
//   const { book, permissionsData, organistaionsendmail, created_at, templateMessageData } = req.body;
//   const { username, stationname, designation, organizationname, userpassword, active, email, mobileno, superAdmin } = book;
//   const { Sender_Mail, EmailApp_Password } = organistaionsendmail;
//   const themesdata = "theme1";

//   try {
//     await db.query(
//       `INSERT INTO usercreation (username, stationname, designation, organizationname, userpassword, active, email, mobileno, theme, created_at, superAdmin)
//        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//       [username, stationname.join(','), designation, organizationname, userpassword, active, email, mobileno, themesdata, created_at, superAdmin]
//     );

//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: Sender_Mail,
//         pass: EmailApp_Password
//       }
//     });

//     // Ensure that templateMessageData and email are valid
//     const messageContent = (templateMessageData || `<p>Hi ${username},<br>UserName: ${username}<br>Password: ${userpassword}</p>`)
//       .replace('${username}', username)
//       .replace('${userpassword}', userpassword);

//     if (email) {  // Only send email if email is defined
//       const mailOptions = {
//         from: Sender_Mail,
//         to: email,
//         subject: 'Credential Details',
//         html: messageContent
//       };

//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.log(error);
//         } else {
//           console.log('Email sent: ' + info.response);
//         }
//       });
//     } else {
//       console.log('No recipient email defined');
//     }

//     // Insert permissions if permissionsData is an array
//     const [result] = await db.query('SELECT userid FROM usercreation WHERE username = ?', [username]);
//     const userid = result[0]?.userid;

//     if (userid && Array.isArray(permissionsData)) {  // Check if permissionsData is an array
//       for (const permission of permissionsData) {
//         await db.query(
//           'INSERT INTO user_permissions (user_id, name, `read`, `new`, `modify`, `delete`, `created_at`) VALUES (?, ?, ?, ?, ?, ?, ?)',
//           [userid, permission.name, permission.read, permission.new, permission.modify, permission.delete, created_at]
//         );
//       }
//       res.status(200).json({ message: 'Permissions saved successfully' });
//     } else {
//       console.log('No permissions to insert or permissionsData is not an array');
//     }

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });




// user Deletion
router.delete('/usercreation-delete/:userid', (req, res) => {

  const userid = req.params.userid;
// console.log(userid, "Deleted id ");

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

        // console.log(userResult,"checking delete")
      // Send success response
      return res.status(200).json({ message: "Data deleted successfully" });
    });
  });
});



// update user creation ---------------------------------------------------

router.put('/usercreation-edit/:userid', async (req, res) => {

  const { updatedCustomer, permissionsData } = req.body;

  const { userid, username, stationname, designation, organizationname, employeeid, userpassword, active, mobileno, email, created_at } = updatedCustomer;
  

  if (updatedCustomer.stationname && Array.isArray(updatedCustomer.stationname)) {
    updatedCustomer.stationname = updatedCustomer.stationname.join(',')
  }
  updatedCustomer.RoleUser =  updatedCustomer.RoleUser || "None"

  try {
    // Clear existing permissions for the user
    await db.query('DELETE FROM user_permissions WHERE user_id = ?', [userid]);

    // Insert new permissions
    for (const permission of permissionsData) {
      await db.query(
        'INSERT INTO user_permissions(user_id, name, `read`, `new`, `modify`, `delete`,`created_at`) VALUES (?, ?, ?, ?, ?, ?,?)',
        [userid, permission.name, permission.read, permission.new, permission.modify, permission.delete, created_at]
      );
    }




    // Update user details
    // await db.query(
    //   'UPDATE usercreation SET  username=?, stationname=?, designation=?, organizationname=?, userpassword=?,active=?,mobileno=?,email=? WHERE userid = ?',
    //   [username, stationname, designation, organizationname, userpassword, active, mobileno, email, userid]
    // );

    await db.query('UPDATE usercreation SET ? WHERE userid = ?', [updatedCustomer, userid]);

    res.status(200).json({ message: 'Permissions saved successfully' });
  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//---------------------------------------------

router.get('/user-permissionget/:userid', (req, res) => {
  const userid = req.params.userid;
  // console.log("per userid ", userid)
  const decryptId = decryption(userid)
  // console.log(decryptId,"original id");
  
  try {
    let query = 'SELECT * FROM user_permissions where user_id=?';

    db.query(query, [decryptId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch permission from MySQL' });
      }
      // console.log(results,"check");
  
      return res.status(200).json(results);
    });

  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch permission from MySQL' });

  }

});

//  -----------------------------------------------

router.get('/usercreation', (req, res) => {
  // const filterValue = req.query.filter; // Assuming you want to filter based on a query parameter 'filter'
  const query = 'SELECT * FROM usercreation';


  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch data from MySQL' });
    }
    // console.log(results,"ree")
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
      'employeeid',
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

// router.put('/userprofileupload/:id', upload.single('image'), (req, res) => {
//   const userId = req.params.id;
//   const fileName = req.file.filename;


//   // Check if the user profile already exists
//   const checkIfExistsQuery = `SELECT * FROM user_profile WHERE userid = ?`;
//   db.query(checkIfExistsQuery, [userId], (err, rows) => {
//     if (err) {
//       return res.status(500).json({ Message: "Error checking profile existence", err });
//     }

//     if (rows.length > 0) {

//       // to unlink image file
//       const oldFileName = rows[0].filename;

//       if (oldFileName) {
//         const oldImagePath = path.join("./customer_master/public/user_profile", oldFileName);
//         try {
//           fs.unlinkSync(oldImagePath)
//         } catch { }
//       }

//       // Profile already exists, update the record
//       const updateQuery = `UPDATE user_profile SET filename = ? WHERE userid = ?`;
//       db.query(updateQuery, [fileName, userId], (err, result) => {
//         if (err) {
//           return res.status(500).json({ Message: "Error updating profile picture", err });
//         }
//         return res.status(200).json({ Status: "success" });
//       });
//     }
//     else {
//       // Profile doesn't exist, insert a new record
//       const insertQuery = `INSERT INTO user_profile (userid, filename) VALUES (?, ?)`;
//       db.query(insertQuery, [userId, fileName], (err, result) => {
//         if (err) {
//           return res.status(500).json({ Message: "Error inserting profile picture", err });
//         }
//         return res.status(200).json({ Status: "success" });
//       });
//     }
//   });
// });

//getting user profile

// router.get('/userprofileview/:id', (req, res) => {
//   const userid = req.params.id
//   const sql = 'select * from user_profile where userid=?';
//   db.query(sql, [userid], (err, result) => {
//     if (err) return res.json({ Message: "error" })

//     return res.json(result);
//   })
// })

// get All usernames
router.get("/getAllUserNames", (req, res) => {
  db.query("SELECT username FROM usercreation", (error, result) => {
    if (error) {
      console.log(error);
    }
    return res.status(200).json(result)
  })
})

router.get("/getAllrolefield", (req, res) => {
  db.query("SELECT userRole_name FROM  Role_fielddata", (error, result) => {
    if (error) {
      console.log(error);
    }
    return res.status(200).json(result)
  })
})


router.get("/getAllrolefieldunique/:rolename", (req, res) => {
  const rolename= req.params.rolename;
  // console.log(rolename,"rolename checking")
  db.query("SELECT * FROM  Role_fielddata where  userRole_name = ? ",[rolename], (error, result) => {
    if (error) {
      console.log(error);
    }
    return res.status(200).json(result)
  })
})


router.put("/usercreationdataupdate/:editid", (req, res) => {
  const editid = req.params.editid
  const updatedata = req.body
  // console.log(updatedata,"checking");
  

  const { username, designation, employeeid, userpassword, email, mobileno } = updatedata;

  // console.log(updatedata,"checking")
  db.query("update usercreation set username=?,designation=?,employeeid=?,userpassword=?,email=?,mobileno=? where userid=?", [username, designation, employeeid, userpassword, email, mobileno, editid], (err, results) => {
    // db.query("update usercreation set username=?,designation=?,employeeid=?,userpassword=?,EmailApp_Password=?,Sender_Mail=?,email=?,mobileno=? where userid=?", [username, designation, employeeid, userpassword, email, mobileno, editid], (err, results) => {
    if (err) {
      // console.log(err,'user error');
      
      return res.status(500).json({ Message: "Error updating data", err });
    }
    // console.log(results ,"updatation");
   
    return res.status(200).json(results)
  })

})

// user role apiiii--------------------------------------------------------------------------------------

router.post('/userroledata-addfield', async (req, res) => {
  const {rolefielddropdown1, permissionsData1,created_at } = req.body;


// console.log(permissionsData1,"daats")

  try {
    await db.query(`INSERT INTO  Role_fielddata (userRole_name) VALUES (?)`, [rolefielddropdown1]);

    // Set up the mail transporter
  

    db.query('SELECT userRole_id FROM Role_fielddata WHERE userRole_name = ?', [rolefielddropdown1], (err, result) => {
      const userid = result[0]?.userRole_id;

      if (userid) {
        for (const permission of permissionsData1) {
          db.query(
            'INSERT INTO Rolefielduser_permissions(user_id, name, `read`, `new`, `modify`, `delete`, `created_at`) VALUES (?, ?, ?, ?, ?, ?,?)',
            [userid, permission.name, permission.read, permission.new, permission.modify, permission.delete, created_at]
          );
        }

        res.status(200).json({ message: 'Permissions saved successfully' });
      }
    });

  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.put('/userroledatacreation-edit/:userid', async (req, res) => {
  const {userid}=req.params

  const { rolename, permissionsData1 ,created_at} = req.body;
  // console.log(rolename,permissionsData1,created_at)

try {
    // Clear existing permissions for the user
    await db.query('DELETE FROM Rolefielduser_permissions WHERE user_id = ?', [userid]);

    // Insert new permissions
    for (const permission of permissionsData1) {
      await db.query(
        'INSERT INTO Rolefielduser_permissions(user_id, name, `read`, `new`, `modify`, `delete`,`created_at`) VALUES (?, ?, ?, ?, ?, ?,?)',
        [userid, permission.name, permission.read, permission.new, permission.modify, permission.delete, created_at]
      );
    }




    // Update user details
    // await db.query(
    //   'UPDATE usercreation SET  username=?, stationname=?, designation=?, organizationname=?, userpassword=?,active=?,mobileno=?,email=? WHERE userid = ?',
    //   [username, stationname, designation, organizationname, userpassword, active, mobileno, email, userid]
    // );

    await db.query('UPDATE Role_fielddata SET userRole_name = ? WHERE userRole_id = ?', [rolename, userid]);

    res.status(200).json({ message: 'Permissions saved successfully' });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




router.get('/userrole-permissiongetroless/:userid', (req, res) => {
  const userid = req.params.userid;
  // console.log("per userid ", userid)

  try {
    let query = 'SELECT * FROM Rolefielduser_permissions where user_id=?';

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


router.delete('/userrolefield-delete/:userid', (req, res) => {

  const userid = req.params.userid;

  // Delete from user_permissions table
  db.query('DELETE FROM  Rolefielduser_permissions WHERE user_id = ?', userid, (err, permissionResult) => {
    if (err) {
      return res.status(500).json({ error: "Failed to delete permissions data from MySQL" });
    }

    // Delete from usercreation table------
    db.query('DELETE FROM Role_fielddata WHERE userRole_id = ?', userid, (err, userResult) => {
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


module.exports = router;