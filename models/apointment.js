const { DataTypes } = require('sequelize');
const {sequelize} = require('../utils/mysql');


const Appointment = sequelize.define('Appointment', {
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  
  },
  name: {
    type: DataTypes.STRING,  
    allowNull: false,  
  },
  date: {
    type: DataTypes.DATEONLY,  
    allowNull: false,
  },
  Category: {
     type: DataTypes.STRING,
     allowNull: false,
  },
  ConsultationHours: {
    type: DataTypes.INTEGER,  
    allowNull: false,},

  timeSlot: {
    type: DataTypes.STRING,  
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Upcoming', 'Completed', 'Cancelled'),  
    allowNull: false,
    defaultValue: 'Upcoming',
  },
  Fees: {
    type: DataTypes.INTEGER,  
    allowNull: false,
  }
}, 
);

module.exports = Appointment;
