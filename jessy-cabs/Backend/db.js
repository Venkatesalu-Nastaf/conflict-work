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
  console.log('Connected to MySQL database');
});

module.exports = db;
