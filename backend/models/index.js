const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('task_manager', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

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
