require("dotenv").config();
var mysql = require("mysql");

var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true
})

db.connect(function (err) {
    if (err) {
      console.log("Lỗi kết nối database " + err);
      db.end();
    } else {
      console.log("Đã kết nối database");
    }
  });


module.exports = db;
  
