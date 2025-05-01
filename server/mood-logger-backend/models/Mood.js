const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Mood = sequelize.define('Mood', {
  mood: {
    type: DataTypes.STRING,
    allowNull: false
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  date: {
    type: DataTypes.DATEONLY, // stores date only, e.g., "2025-05-01"
    allowNull: false
  }
});

module.exports = Mood;
