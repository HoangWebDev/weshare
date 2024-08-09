require("dotenv").config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql', // Chỉ định rằng chúng ta sử dụng MySQL
  pool: {
    max: 10, // Số lượng kết nối tối đa
    min: 0, // Số lượng kết nối tối thiểu
  },
  define: {
    freezeTableName: true
  }
});

module.exports =  sequelize ;
