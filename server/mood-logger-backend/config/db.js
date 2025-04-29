// config/db.js
const { Sequelize } = require('sequelize');

// Initialize the Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'suwon1583',
  database: 'moodLogger',
});

// Export the sequelize instance
module.exports = sequelize;

