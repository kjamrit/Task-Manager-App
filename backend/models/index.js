const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
  host: process.env.DB_HOST,
  dialect: 'mysql'
  }
);

//Task model
const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.TEXT,
  is_completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true, 
  createdAt: 'created_at',
  updatedAt: false
});

module.exports = { sequelize, Task };
