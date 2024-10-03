
const { Sequelize } = require('sequelize');
require('dotenv').config();  


const sequelize = new Sequelize("testdb","root","", {
  host:"localhost",
  dialect: 'mysql',
  logging: console.log,
  pool: {
    max: 10, 
    min: 0,  
    acquire: 30000, 
    idle: 10000 
}
});


const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

     
        await sequelize.sync(); 
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};


module.exports = { sequelize,connectToDatabase };
