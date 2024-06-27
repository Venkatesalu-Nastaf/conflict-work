const mysql = require("mysql");
require('dotenv').config()

//--------------------------------------------------------

// const db = mysql.createConnection({
//   host: '162.214.81.14',
//   user: 'dzupsnmy_taaf_user',
//   password: 'taafapplicationusers',
//   database: 'dzupsnmy_taaf_application',
//   port: 3306
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected to BlueHost database');
// });

//---------------------------------------------------------------

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_User,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to BlueHost database");
});
module.exports = db;


// Hostingerr--------------------------------------------
// const db = mysql.createConnection({
//   host: '89.117.27.152',
//   user: 'u273842280_fahad',
//   password: 'Y1;fF8s@3F',
//   database: 'u273842280_nastaf_app',
//   port: 3306
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected Hostinger  database');
// });
// module.exports = db;

//------------------------------------------

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'dzupsnmy_taaf_application _2',
//   port: 3306
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected Local MySQL database');
// });

// module.exports = db;



//-----------------------------------------------------------------------------------
