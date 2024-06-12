const mysql = require('mysql');

const db = mysql.createConnection({
  host: '162.214.81.14',
  user: 'dzupsnmy_taaf_user',
  password: 'taafapplicationusers',
  database: 'dzupsnmy_taaf_application',
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to BlueHost database');
});

module.exports = db;



// Hostingerr-------------------------
// const mysql = require('mysql');

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


// const mysql = require('mysql');

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'dzupsnmy_taaf_application _1',
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


