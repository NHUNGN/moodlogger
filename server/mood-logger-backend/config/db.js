
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'Suwon1583.S3',
  database: 'moodLogger',
});


module.exports = sequelize;

