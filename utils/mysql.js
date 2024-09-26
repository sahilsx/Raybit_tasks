// const { Sequelize } = require('sequelize');


// const sequelize = new Sequelize('testdb', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql',
//     logging: console.log,
// });


// const connectToDatabase = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');

     
//         await sequelize.sync(); 
//         console.log('Database synchronized successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// };





// module.exports = { sequelize,connectToDatabase };












const { Sequelize } = require('sequelize');
require('dotenv').config();  


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  logging: console.log,
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
