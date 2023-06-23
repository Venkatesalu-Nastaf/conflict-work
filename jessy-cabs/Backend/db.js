const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: 'root',
  password: '',
  database: 'taaf_application',
  port: 3306
});
// const db = mysql.createConnection({
//   host: "124.123.70.27",
//   user: 'dzupsnmy_taafuser',
//   password: 'taafappicationuser',
//   database: 'dzupsnmy_taaf_application',
//   port: 3306
// });

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = db;
